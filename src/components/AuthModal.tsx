import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { 
  getSupabaseClient, 
  getLocalStudents, 
  setStoredCurrentUser,
  fetchStudentProgressFromDatabase,
  fetchStudentProfileFromDatabase
} from '../lib/supabase';
import { verifyTeacherPin } from '../lib/security';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  KeyRound, 
  RefreshCw, 
  X,
  ArrowRight,
  Languages
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile, targetLanguage?: 'en' | 'es') => void;
  currentUser: UserProfile | null;
  onLogout: () => void;
  initialMode?: 'signin' | 'signup' | 'teacher';
}

export function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
  onLogout,
  initialMode = 'signin'
}: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'teacher'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'es'>('es');
  const [teacherPin, setTeacherPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTeacherPin, setShowTeacherPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isSpanishTarget = targetLanguage === 'es';

  const t = {
    modalTitle: isSpanishTarget ? 'Student & Teacher Portal' : 'Portal de Estudiantes y Profesores',
    modalSub: isSpanishTarget ? 'Save your lesson progress, streak, and grade records' : 'Guarda tu progreso de lecciones, racha y notas',
    tabSignIn: isSpanishTarget ? 'Sign In' : 'Iniciar Sesión',
    tabSignUp: isSpanishTarget ? 'Create Account' : 'Crear Cuenta',
    tabTeacher: isSpanishTarget ? 'Teacher' : 'Docente',
    labelTargetLang: isSpanishTarget ? 'Which course do you want to learn?' : '¿Qué idioma quieres aprender?',
    cardOptSpanishTitle: isSpanishTarget ? 'Learn Spanish' : 'Aprender Español',
    cardOptSpanishSub: isSpanishTarget ? 'Spanish A1 for English Speakers' : 'Español A1 (para angloparlantes)',
    cardOptEnglishTitle: isSpanishTarget ? 'Learn English' : 'Aprender Inglés',
    cardOptEnglishSub: isSpanishTarget ? 'English A1 for Spanish Speakers' : 'Inglés A1 (para hispanohablantes)',
    labelFullName: isSpanishTarget ? 'Student Full Name' : 'Nombre Completo del Estudiante',
    placeholderFullName: isSpanishTarget ? 'e.g. John Alexander Smith' : 'Ej. María Fernanda Morales',
    labelEmail: isSpanishTarget ? 'Email Address' : 'Correo Electrónico',
    placeholderEmail: isSpanishTarget ? 'student@university.edu' : 'tu.correo@estudiante.edu',
    labelStudentId: isSpanishTarget ? 'Student ID / Enrollment (Optional)' : 'Matrícula / ID (Opcional)',
    placeholderStudentId: isSpanishTarget ? 'e.g. STD-2026-01' : 'Ej. EST-2026-99',
    labelPassword: isSpanishTarget ? 'Password' : 'Contraseña',
    placeholderPassword: isSpanishTarget ? 'Min 4 characters' : 'Mínimo 4 caracteres',
    btnCreateAccount: isSpanishTarget ? 'Create Account & Start' : 'Crear Cuenta y Comenzar',
    btnSignIn: isSpanishTarget ? 'Log In to Course' : 'Ingresar al Curso',
    teacherBannerTitle: isSpanishTarget ? 'Teacher Control Panel Access' : 'Acceso al Panel de Control del Docente',
    teacherBannerDesc: isSpanishTarget 
      ? 'Enter your teacher security PIN to review student records, academic progress, and official grades.' 
      : 'Ingresa con la clave de seguridad del docente para revisar el registro académico y calificaciones de los estudiantes.',
    labelTeacherPin: isSpanishTarget ? 'Teacher Security PIN' : 'Clave de Seguridad del Docente',
    placeholderTeacherPin: isSpanishTarget ? 'Enter teacher security PIN' : 'Introduce la clave del docente',
    btnValidateTeacher: isSpanishTarget ? 'Validate Teacher Access' : 'Validar Acceso de Docente',
    errFillAll: isSpanishTarget ? 'Please fill in all required fields.' : 'Por favor completa todos los campos obligatorios.',
    errPasswordLength: isSpanishTarget ? 'Password must be at least 4 characters.' : 'La contraseña debe tener al menos 4 caracteres.',
    errEmailPass: isSpanishTarget ? 'Enter your email and password.' : 'Introduce tu correo electrónico y tu contraseña.',
    errTeacherPin: isSpanishTarget ? 'Incorrect teacher security PIN. Access denied.' : 'Clave de docente incorrecta. Acceso denegado.',
    successCreated: isSpanishTarget ? 'Account created successfully!' : '¡Cuenta creada con éxito!',
    successWelcome: isSpanishTarget ? 'Welcome back!' : '¡Bienvenido de nuevo!'
  };

  const handleSignUpStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg(t.errFillAll);
      return;
    }

    if (password.length < 4) {
      setErrorMsg(t.errPasswordLength);
      return;
    }

    setIsLoading(true);

    try {
      const generatedId = `std_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`;
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = fullName.trim();
      const cleanStudentId = studentId.trim() || `EST-${Math.floor(1000 + Math.random() * 9000)}`;

      const newProfile: UserProfile = {
        id: generatedId,
        email: cleanEmail,
        fullName: cleanName,
        role: 'student',
        studentIdNumber: cleanStudentId,
        targetLanguage: targetLanguage,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanName)}`
      };

      const client = getSupabaseClient();
      if (client) {
        try {
          const authEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@student.cesarteach.edu`;
          const { data, error } = await client.auth.signUp({
            email: authEmail,
            password: password,
            options: {
              data: {
                full_name: cleanName,
                role: 'student',
                student_id_number: cleanStudentId,
                target_language: targetLanguage
              }
            }
          });

          if (!error && data?.user) {
            newProfile.id = data.user.id;
          }

          await client.from('profiles').upsert({
            id: newProfile.id,
            email: newProfile.email,
            full_name: newProfile.fullName,
            role: 'student',
            student_id_number: newProfile.studentIdNumber || null,
            avatar_url: newProfile.avatarUrl,
            created_at: newProfile.createdAt,
            last_active_at: newProfile.lastActiveAt
          });

          // Initialize student progress in Supabase
          await client.from('student_progress').upsert({
            user_id: newProfile.id,
            completed_lessons: [],
            mastered_words: [],
            exam_score: null,
            exam_passed: false,
            xp: 0,
            streak_days: 1,
            last_study_date: new Date().toISOString().split('T')[0],
            unlocked_badges: ['b_first_step'],
            word_srs_status: {},
            lesson_dates: {},
            course_language: targetLanguage,
            total_exercises_done: 0,
            time_spent_minutes: 0,
            updated_at: new Date().toISOString()
          });
        } catch (supaErr) {
          console.warn('Notice from Supabase sign up:', supaErr);
        }
      }

      const initialProgress = {
        completedLessons: [],
        masteredWords: [],
        examScore: undefined,
        examPassed: false,
        xp: 0,
        streakDays: 1,
        lastStudyDate: new Date().toISOString().split('T')[0],
        unlockedBadges: ['b_first_step'],
        wordSRSStatus: {},
        lessonDates: {},
        totalExercisesDone: 0,
        timeSpentMinutes: 0
      };

      try {
        localStorage.setItem(`lingostep_progress_${newProfile.id}`, JSON.stringify(initialProgress));
      } catch (e) {}

      const localStudents = getLocalStudents();
      const existingIdx = localStudents.findIndex(s => s.profile.email.toLowerCase() === cleanEmail || s.profile.id === newProfile.id);
      if (existingIdx >= 0) {
        localStudents[existingIdx].profile = newProfile;
        localStudents[existingIdx].progress = initialProgress;
        localStudents[existingIdx].courseLanguage = targetLanguage;
      } else {
        localStudents.unshift({
          profile: newProfile,
          progress: initialProgress,
          courseLanguage: targetLanguage
        });
      }
      localStorage.setItem('lingostep_students_records_v2', JSON.stringify(localStudents));

      setStoredCurrentUser(newProfile);
      setSuccessMsg(t.successCreated);
      setTimeout(() => {
        onLoginSuccess(newProfile, targetLanguage);
        onClose();
      }, 500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al crear la cuenta de estudiante.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg(t.errEmailPass);
      return;
    }

    setIsLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const client = getSupabaseClient();

      if (client) {
        try {
          const authEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@student.cesarteach.edu`;
          const { data, error } = await client.auth.signInWithPassword({
            email: authEmail,
            password: password
          });

          if (!error && data.user) {
            const userLang = (data.user.user_metadata?.target_language as 'en' | 'es') || targetLanguage || 'es';
            const profile: UserProfile = {
              id: data.user.id,
              email: data.user.email || cleanEmail,
              fullName: data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
              role: (data.user.user_metadata?.role as UserRole) || 'student',
              studentIdNumber: data.user.user_metadata?.student_id_number,
              targetLanguage: userLang,
              createdAt: data.user.created_at || new Date().toISOString(),
              lastActiveAt: new Date().toISOString(),
              avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.user.email || 'user')}`
            };

            const remoteProgress = await fetchStudentProgressFromDatabase(profile.id);
            if (remoteProgress) {
              try {
                localStorage.setItem(`lingostep_progress_${profile.id}`, JSON.stringify(remoteProgress));
              } catch (e) {}
            }

            setStoredCurrentUser(profile);
            setSuccessMsg(`${t.successWelcome} ${profile.fullName}!`);
            setTimeout(() => {
              onLoginSuccess(profile, userLang);
              onClose();
            }, 400);
            return;
          }
        } catch (supaErr) {
          console.warn('Supabase sign-in warning:', supaErr);
        }

        // Check profiles table directly in Supabase
        try {
          const remoteProfile = await fetchStudentProfileFromDatabase(cleanEmail);
          if (remoteProfile) {
            const userLang = remoteProfile.targetLanguage || targetLanguage || 'es';
            const remoteProgress = await fetchStudentProgressFromDatabase(remoteProfile.id);
            if (remoteProgress) {
              try {
                localStorage.setItem(`lingostep_progress_${remoteProfile.id}`, JSON.stringify(remoteProgress));
              } catch (e) {}
            }
            setStoredCurrentUser(remoteProfile);
            setSuccessMsg(`${t.successWelcome} ${remoteProfile.fullName}!`);
            setTimeout(() => {
              onLoginSuccess(remoteProfile, userLang);
              onClose();
            }, 400);
            return;
          }
        } catch (supaProfileErr) {
          console.warn('Supabase profile query warning in modal:', supaProfileErr);
        }
      }

      const localStudents = getLocalStudents();
      const matched = localStudents.find(s => 
        s.profile.email.toLowerCase() === cleanEmail ||
        s.profile.email.toLowerCase().replace(/@.*$/, '') === cleanEmail ||
        s.profile.fullName.toLowerCase() === cleanEmail ||
        (s.profile.studentIdNumber && s.profile.studentIdNumber.toLowerCase() === cleanEmail)
      );

      if (matched) {
        const userLang = matched.courseLanguage || matched.profile.targetLanguage || targetLanguage || 'es';
        const updated = {
          ...matched.profile,
          lastActiveAt: new Date().toISOString()
        };
        setStoredCurrentUser(updated);
        setSuccessMsg(`${t.successWelcome} ${updated.fullName}!`);
        setTimeout(() => {
          onLoginSuccess(updated, userLang);
          onClose();
        }, 400);
      } else {
        throw new Error(isSpanishTarget ? 'Credenciales incorrectas o el usuario no existe.' : 'Incorrect credentials or user does not exist.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeacherAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);

    try {
      const isValid = await verifyTeacherPin(teacherPin);
      if (!isValid) {
        setErrorMsg(t.errTeacherPin);
        setIsLoading(false);
        return;
      }

      const teacherProfile: UserProfile = {
        id: 'teacher_master_01',
        email: email.trim() || 'docente@cesarteach.edu',
        fullName: isSpanishTarget ? 'Head Teacher / Professor' : 'Profesor(a) CesarTeach',
        role: 'teacher',
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString()
      };

      setStoredCurrentUser(teacherProfile);
      setSuccessMsg(isSpanishTarget ? 'Teacher access authorized.' : 'Acceso de Docente concedido.');
      setTimeout(() => {
        onLoginSuccess(teacherProfile);
        onClose();
      }, 400);
    } catch (err) {
      setErrorMsg('Error al verificar la clave de seguridad.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-600 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-2xl bg-white/20 backdrop-blur-md">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black">{t.modalTitle}</h2>
              <p className="text-xs text-white/80 font-medium">{t.modalSub}</p>
            </div>
          </div>

          {/* Mode Switch Tabs */}
          <div className="flex bg-black/20 p-1 rounded-2xl mt-4 gap-1">
            <button
              onClick={() => { setMode('signin'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                mode === 'signin' ? 'bg-white text-zinc-900 shadow-md' : 'text-white/80 hover:text-white'
              }`}
            >
              {t.tabSignIn}
            </button>
            <button
              onClick={() => { setMode('signup'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                mode === 'signup' ? 'bg-white text-zinc-900 shadow-md' : 'text-white/80 hover:text-white'
              }`}
            >
              {t.tabSignUp}
            </button>
            <button
              onClick={() => { setMode('teacher'); setErrorMsg(null); }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                mode === 'teacher' ? 'bg-amber-400 text-zinc-950 shadow-md' : 'text-amber-200 hover:text-white'
              }`}
            >
              {t.tabTeacher}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Feedback messages */}
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {/* Form 1: SIGN IN */}
          {mode === 'signin' && (
            <form onSubmit={handleSignInStudent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  {t.labelEmail}
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.placeholderEmail}
                  className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  {t.labelPassword}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-zinc-900 dark:text-zinc-100 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>{t.btnSignIn}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Form 2: SIGN UP */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUpStudent} className="space-y-3.5">
              {/* Language target picker */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{t.labelTargetLang}</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetLanguage('es')}
                    className={`p-2.5 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                      targetLanguage === 'es'
                        ? 'bg-amber-500/15 border-amber-500 ring-2 ring-amber-500/30 text-zinc-900 dark:text-white'
                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500'
                    }`}
                  >
                    <span className="text-xl">🇪🇸</span>
                    <div>
                      <div className="text-xs font-bold">{t.cardOptSpanishTitle}</div>
                      <div className="text-[10px] text-zinc-400">{t.cardOptSpanishSub}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTargetLanguage('en')}
                    className={`p-2.5 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                      targetLanguage === 'en'
                        ? 'bg-indigo-500/15 border-indigo-500 ring-2 ring-indigo-500/30 text-zinc-900 dark:text-white'
                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500'
                    }`}
                  >
                    <span className="text-xl">🇺🇸</span>
                    <div>
                      <div className="text-xs font-bold">{t.cardOptEnglishTitle}</div>
                      <div className="text-[10px] text-zinc-400">{t.cardOptEnglishSub}</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  {t.labelFullName}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t.placeholderFullName}
                  className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                    {t.labelEmail}
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholderEmail}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                    {t.labelStudentId}
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder={t.placeholderStudentId}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  {t.labelPassword}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t.placeholderPassword}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium text-zinc-900 dark:text-zinc-100 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-700 hover:to-emerald-700 text-white font-extrabold text-sm shadow-md shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>{t.btnCreateAccount}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Form 3: TEACHER ACCESS */}
          {mode === 'teacher' && (
            <form onSubmit={handleTeacherAccess} className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>{t.teacherBannerTitle}</span>
                </div>
                <p className="text-[11px] opacity-90">
                  {t.teacherBannerDesc}
                </p>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-1.5">
                  {t.labelTeacherPin}
                </label>
                <div className="relative">
                  <input
                    type={showTeacherPin ? 'text' : 'password'}
                    required
                    value={teacherPin}
                    onChange={(e) => setTeacherPin(e.target.value)}
                    placeholder={t.placeholderTeacherPin}
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-medium text-zinc-900 dark:text-zinc-100 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowTeacherPin(!showTeacherPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                    title={showTeacherPin ? 'Ocultar PIN' : 'Ver PIN'}
                  >
                    {showTeacherPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-zinc-950 font-black text-sm shadow-md shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" /> : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t.btnValidateTeacher}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
