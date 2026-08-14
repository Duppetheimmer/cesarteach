import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserProfile, UserProgress, StudentRecord, UserRole } from '../types';

const LOCAL_STORAGE_SUPABASE_URL_KEY = 'lingostep_supabase_url_custom';
const LOCAL_STORAGE_SUPABASE_KEY_KEY = 'lingostep_supabase_anon_key_custom';

export function getSupabaseCredentials(): { url: string; anonKey: string; isCustom: boolean } {
  try {
    const customUrl = localStorage.getItem(LOCAL_STORAGE_SUPABASE_URL_KEY);
    const customKey = localStorage.getItem(LOCAL_STORAGE_SUPABASE_KEY_KEY);
    if (customUrl && customKey) {
      return { url: customUrl.trim(), anonKey: customKey.trim(), isCustom: true };
    }
  } catch (e) {}

  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  return { url: envUrl, anonKey: envKey, isCustom: false };
}

export function saveCustomSupabaseCredentials(url: string, anonKey: string) {
  try {
    if (url && anonKey) {
      localStorage.setItem(LOCAL_STORAGE_SUPABASE_URL_KEY, url.trim());
      localStorage.setItem(LOCAL_STORAGE_SUPABASE_KEY_KEY, anonKey.trim());
    } else {
      localStorage.removeItem(LOCAL_STORAGE_SUPABASE_URL_KEY);
      localStorage.removeItem(LOCAL_STORAGE_SUPABASE_KEY_KEY);
    }
  } catch (e) {
    console.error('Error saving custom supabase credentials:', e);
  }
}

const currentCreds = getSupabaseCredentials();

export const isSupabaseConfigured = Boolean(
  currentCreds.url && 
  currentCreds.anonKey && 
  currentCreds.url !== 'https://your-project-id.supabase.co' &&
  !currentCreds.url.includes('your-project-id')
);

export function getSupabaseClient(): SupabaseClient | null {
  const creds = getSupabaseCredentials();
  const isConfigured = Boolean(
    creds.url && 
    creds.anonKey && 
    creds.url !== 'https://your-project-id.supabase.co' &&
    !creds.url.includes('your-project-id')
  );
  if (!isConfigured) return null;
  try {
    return createClient(creds.url, creds.anonKey);
  } catch (e) {
    console.error('Failed to create Supabase client:', e);
    return null;
  }
}

export const supabase: SupabaseClient | null = getSupabaseClient();

// Test live Supabase connection
export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  status: 'connected' | 'not_configured' | 'error';
  message: string;
  url?: string;
  latencyMs?: number;
}> {
  const creds = getSupabaseCredentials();
  if (!creds.url || !creds.anonKey || creds.url.includes('your-project-id')) {
    return {
      connected: false,
      status: 'not_configured',
      message: 'Supabase no tiene URL o Anon Key configurados en .env o ajustes.',
      url: creds.url || undefined
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      connected: false,
      status: 'error',
      message: 'No se pudo inicializar el cliente de Supabase.',
      url: creds.url
    };
  }

  const start = performance.now();
  try {
    const { error } = await client.from('profiles').select('id').limit(1);
    const latencyMs = Math.round(performance.now() - start);

    if (error) {
      if (error.code === '42P01' || error.message?.toLowerCase().includes('does not exist') || error.message?.toLowerCase().includes('relation')) {
        return {
          connected: true,
          status: 'connected',
          message: 'Conexión a Supabase exitosa (requiere ejecutar el script SQL para crear las tablas).',
          url: creds.url,
          latencyMs
        };
      }
      return {
        connected: false,
        status: 'error',
        message: `Error al consultar Supabase: ${error.message}`,
        url: creds.url,
        latencyMs
      };
    }

    return {
      connected: true,
      status: 'connected',
      message: `¡Conexión a Supabase activa y verificada! (${latencyMs}ms)`,
      url: creds.url,
      latencyMs
    };
  } catch (err: any) {
    return {
      connected: false,
      status: 'error',
      message: `Error de red al conectar a Supabase: ${err.message || err}`,
      url: creds.url
    };
  }
}

// Clean local registry without hardcoded demo accounts
const LOCAL_STORAGE_STUDENTS_KEY = 'lingostep_students_records_v2';
const LOCAL_STORAGE_CURRENT_USER_KEY = 'lingostep_current_user_v2';

// Get local students store
export function getLocalStudents(): StudentRecord[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_STUDENTS_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveLocalStudents(students: StudentRecord[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_STUDENTS_KEY, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving local students:', e);
  }
}

// Current logged in user
export function getStoredCurrentUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function setStoredCurrentUser(user: UserProfile | null) {
  try {
    if (user) {
      localStorage.setItem(LOCAL_STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Error updating current stored user:', e);
  }
}

// Sync progress to cloud (Supabase) and local store
export async function syncStudentProgressToDatabase(
  user: UserProfile,
  progress: UserProgress,
  courseLanguage: 'en' | 'es'
): Promise<{ success: boolean; message?: string }> {
  // 1. Update local database
  const students = getLocalStudents();
  const index = students.findIndex(s => s.profile.id === user.id || s.profile.email.toLowerCase() === user.email.toLowerCase());

  const updatedProfile: UserProfile = {
    ...user,
    targetLanguage: courseLanguage,
    lastActiveAt: new Date().toISOString()
  };

  const studentRecord: StudentRecord = {
    profile: updatedProfile,
    progress,
    courseLanguage
  };

  if (index >= 0) {
    students[index] = {
      ...students[index],
      profile: updatedProfile,
      progress,
      courseLanguage
    };
  } else {
    students.unshift(studentRecord);
  }

  saveLocalStudents(students);
  setStoredCurrentUser(updatedProfile);

  // 2. If Supabase is connected, sync to remote tables
  const client = getSupabaseClient();
  if (client) {
    try {
      // Upsert profile
      await client.from('profiles').upsert({
        id: user.id,
        email: user.email,
        full_name: user.fullName,
        role: user.role,
        avatar_url: user.avatarUrl,
        last_active_at: new Date().toISOString(),
        student_id_number: user.studentIdNumber,
        notes_from_teacher: user.notesFromTeacher
      });

      // Upsert student progress
      await client.from('student_progress').upsert({
        user_id: user.id,
        completed_lessons: progress.completedLessons,
        mastered_words: progress.masteredWords,
        exam_score: progress.examScore,
        exam_passed: progress.examPassed,
        exam_passed_date: progress.examPassedDate,
        xp: progress.xp,
        streak_days: progress.streakDays,
        last_study_date: progress.lastStudyDate,
        unlocked_badges: progress.unlockedBadges,
        word_srs_status: progress.wordSRSStatus,
        lesson_dates: progress.lessonDates,
        course_language: courseLanguage,
        total_exercises_done: progress.totalExercisesDone,
        time_spent_minutes: progress.timeSpentMinutes,
        updated_at: new Date().toISOString()
      });

      return { success: true, message: 'Progreso sincronizado en Supabase y localmente.' };
    } catch (err: any) {
      console.warn('Supabase sync warning (saved locally):', err.message);
      return { success: true, message: 'Guardado localmente. Supabase sync pendiente.' };
    }
  }

  return { success: true, message: 'Progreso guardado con éxito.' };
}

// Fetch all students for the Teacher Dashboard
export async function fetchAllStudentsForTeacher(): Promise<StudentRecord[]> {
  const localList = getLocalStudents();
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data: profiles, error: profileError } = await client
        .from('profiles')
        .select('*')
        .eq('role', 'student');

      if (!profileError && profiles && profiles.length > 0) {
        const { data: progressList } = await client
          .from('student_progress')
          .select('*');

        const merged: StudentRecord[] = profiles.map((p: any) => {
          const prog = progressList?.find((pr: any) => pr.user_id === p.id);
          return {
            profile: {
              id: p.id,
              email: p.email,
              fullName: p.full_name || p.email.split('@')[0],
              role: p.role || 'student',
              avatarUrl: p.avatar_url,
              createdAt: p.created_at || new Date().toISOString(),
              lastActiveAt: p.last_active_at || new Date().toISOString(),
              studentIdNumber: p.student_id_number,
              notesFromTeacher: p.notes_from_teacher
            },
            progress: {
              completedLessons: prog?.completed_lessons || [],
              masteredWords: prog?.mastered_words || [],
              examScore: prog?.exam_score,
              examPassed: prog?.exam_passed || false,
              examPassedDate: prog?.exam_passed_date,
              xp: prog?.xp || 0,
              streakDays: prog?.streak_days || 0,
              lastStudyDate: prog?.last_study_date,
              unlockedBadges: prog?.unlocked_badges || [],
              wordSRSStatus: prog?.word_srs_status || {},
              lessonDates: prog?.lesson_dates || {},
              totalExercisesDone: prog?.total_exercises_done || 0,
              timeSpentMinutes: prog?.time_spent_minutes || 0
            },
            courseLanguage: prog?.course_language || 'en'
          };
        });

        // Merge with local records
        const map = new Map<string, StudentRecord>();
        localList.forEach(s => map.set(s.profile.id, s));
        merged.forEach(s => map.set(s.profile.id, s));
        return Array.from(map.values());
      }
    } catch (e) {
      console.warn('Error querying Supabase students, returning local list:', e);
    }
  }

  return localList;
}

// Teacher updates teacher notes / feedback for a student
export async function updateStudentTeacherNotes(
  studentId: string,
  notes: string
): Promise<boolean> {
  const students = getLocalStudents();
  const target = students.find(s => s.profile.id === studentId);
  if (target) {
    target.profile.notesFromTeacher = notes;
    saveLocalStudents(students);
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('profiles').update({ notes_from_teacher: notes }).eq('id', studentId);
    } catch (e) {
      console.error('Error updating notes in Supabase:', e);
    }
  }
  return true;
}

// Copy-pasteable SQL setup script for teacher
export const SUPABASE_SQL_SETUP_SCRIPT = `-- ========================================================
-- TABLAS PARA LINGOSTEP (ESCUELA DE IDIOMAS & ESTUDIANTES)
-- Ejecuta este script en el SQL Editor de tu proyecto Supabase
-- ========================================================

-- 1. Tabla de Perfiles de Usuarios (Estudiantes y Profesores)
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student', -- 'student' | 'teacher'
  avatar_url TEXT,
  student_id_number TEXT,
  notes_from_teacher TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  last_active_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Tabla de Progreso Académico de Estudiantes
CREATE TABLE IF NOT EXISTS public.student_progress (
  user_id TEXT PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  completed_lessons JSONB DEFAULT '[]'::jsonb,
  mastered_words JSONB DEFAULT '[]'::jsonb,
  exam_score NUMERIC,
  exam_passed BOOLEAN DEFAULT FALSE,
  exam_passed_date TIMESTAMP WITH TIME ZONE,
  xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_study_date TEXT,
  unlocked_badges JSONB DEFAULT '[]'::jsonb,
  word_srs_status JSONB DEFAULT '{}'::jsonb,
  lesson_dates JSONB DEFAULT '{}'::jsonb,
  course_language TEXT DEFAULT 'en',
  total_exercises_done INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Habilitar seguridad de nivel de fila (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- 4. Políticas de lectura y escritura públicas/autenticadas
CREATE POLICY "Permitir lectura para todos" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Permitir insercion y actualizacion" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Permitir lectura de progreso" ON public.student_progress FOR SELECT USING (true);
CREATE POLICY "Permitir insercion y actualizacion de progreso" ON public.student_progress FOR ALL USING (true);
`;
