import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { 
  getSupabaseClient, 
  isSupabaseConfigured, 
  getLocalStudents, 
  setStoredCurrentUser
} from '../lib/supabase';
import { verifyTeacherPin } from '../lib/security';
import { motion } from 'motion/react';
import { 
  GraduationCap, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  BookOpen, 
  Trophy, 
  KeyRound, 
  RefreshCw, 
  ArrowRight,
  Languages,
  Award,
  Layers
} from 'lucide-react';

interface AuthGateViewProps {
  onLoginSuccess: (user: UserProfile, targetLanguage?: 'en' | 'es') => void;
}

export function AuthGateView({ onLoginSuccess }: AuthGateViewProps) {
  const [activeTab, setActiveTab] = useState<'signup' | 'signin' | 'teacher'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  
  // Default to 'es' (Learn Spanish from English, with English UI by default)
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'es'>('es');
  const [teacherPin, setTeacherPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTeacherPin, setShowTeacherPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Translations dictionary for dynamic language flip
  const isSpanishTarget = targetLanguage === 'es'; // Learning Spanish -> English UI

  const t = {
    portalBadge: isSpanishTarget ? 'Language Learning Portal' : 'Portal Educativo',
    portalSub: isSpanishTarget ? 'Comprehensive Spanish & English A1 Platform' : 'Plataforma Integral de Inglés y Español A1',
    supabaseConnected: isSpanishTarget ? 'Supabase Connected' : 'Supabase Conectado',
    supabaseChecking: isSpanishTarget ? 'Checking Supabase...' : 'Verificando Supabase...',
    supabaseLocal: isSpanishTarget ? 'Supabase Local Mode' : 'Supabase en Modo Local',
    
    // Switcher
    activeMode: isSpanishTarget ? 'Target: Spanish A1 (English UI)' : 'Objetivo: Inglés A1 (Interfaz en Español)',
    btnLearnSpanish: isSpanishTarget ? '🇪🇸 Learn Spanish' : '🇪🇸 Aprender Español',
    btnLearnEnglish: isSpanishTarget ? '🇬🇧 Learn English' : '🇬🇧 Aprender Inglés',

    // Hero left
    badgeObligatory: isSpanishTarget ? 'Student Account Required to Save Progress' : 'Acceso Obligatorio con Cuenta para Guardar tu Progreso',
    heroTitlePrefix: isSpanishTarget ? 'Learn to speak Spanish with confidence from ' : 'Aprende a hablar inglés con confianza desde ',
    heroTitleHighlight: isSpanishTarget ? 'day one' : 'el primer día',
    heroTitleSuffix: '.',
    heroDesc: isSpanishTarget 
      ? 'Sign up or log in with your student account to access all 30 A1 lessons, interactive exercises, flashcards, AI Tutor, and the official certification exam.'
      : 'Regístrate o inicia sesión con tu cuenta de estudiante para acceder a todas las lecciones, ejercicios interactivos, tarjetas de memoria y el examen final de certificación A1.',

    // Features
    feat1Title: isSpanishTarget ? '30 A1 Lessons' : '30 Lecciones A1',
    feat1Sub: isSpanishTarget ? 'Structured Spanish & English' : 'Inglés y Español estructurado',
    feat2Title: isSpanishTarget ? 'Exam & Certificate' : 'Examen y Certificado',
    feat2Sub: isSpanishTarget ? 'Official verified report card' : 'Validación con acta de notas',
    feat3Title: isSpanishTarget ? 'Teacher Dashboard' : 'Panel de Profesor',
    feat3Sub: isSpanishTarget ? 'Real-time supervision & grading' : 'Supervisión en tiempo real',
    feat4Title: isSpanishTarget ? 'Multiplatform' : 'Multiplataforma',
    feat4Sub: isSpanishTarget ? 'Cloud sync & offline ready' : 'Sincronización y progreso continuo',

    // Card Tabs
    tabSignUp: isSpanishTarget ? 'Create Account' : 'Crear Cuenta',
    tabSignIn: isSpanishTarget ? 'Sign In' : 'Iniciar Sesión',
    tabTeacher: isSpanishTarget ? 'Teacher Portal' : 'Docente',

    // Form fields
    labelFullName: isSpanishTarget ? 'Student Full Name' : 'Nombre Completo del Estudiante',
    placeholderFullName: isSpanishTarget ? 'e.g. John Alexander Smith' : 'Ej. María Fernanda Morales',
    labelTargetLang: isSpanishTarget ? 'Which course do you want to start?' : '¿Qué idioma quieres aprender?',
    cardOptSpanishTitle: isSpanishTarget ? 'Learn Spanish' : 'Aprender Español',
    cardOptSpanishSub: isSpanishTarget ? 'Spanish A1 for English Speakers' : 'Español A1 (para angloparlantes)',
    cardOptEnglishTitle: isSpanishTarget ? 'Learn English' : 'Aprender Inglés',
    cardOptEnglishSub: isSpanishTarget ? 'English A1 for Spanish Speakers' : 'Inglés A1 (para hispanohablantes)',
    labelEmail: isSpanishTarget ? 'Username or Email' : 'Usuario o Correo',
    placeholderEmail: isSpanishTarget ? 'e.g. alex24 or student@email.com' : 'Ej. maria24 o maria@estudiante.edu',
    labelStudentId: isSpanishTarget ? 'Student ID / Enrollment (Optional)' : 'Matrícula / ID (Opcional)',
    placeholderStudentId: isSpanishTarget ? 'e.g. STD-2026-01' : 'Ej. EST-2026-99',
    labelPassword: isSpanishTarget ? 'Password' : 'Contraseña',
    placeholderPassword: isSpanishTarget ? 'At least 4 characters' : 'Mínimo 4 caracteres',
    placeholderPasswordSignIn: isSpanishTarget ? 'Enter your password' : 'Introduce tu contraseña',
    btnCreateAccount: isSpanishTarget ? 'Create Account & Start Learning' : 'Crear Cuenta y Comenzar',
    btnSignIn: isSpanishTarget ? 'Log In to Course' : 'Ingresar al Curso',

    // Teacher Tab
    teacherBoxTitle: isSpanishTarget ? 'Teacher Control Panel Access' : 'Acceso al Panel de Control del Docente',
    teacherBoxDesc: isSpanishTarget 
      ? 'Enter your teacher security PIN to review student records, academic progress, and official grades.'
      : 'Ingresa con la clave de seguridad del docente para revisar el registro académico y calificaciones de los estudiantes.',
    labelTeacherPin: isSpanishTarget ? 'Teacher Security PIN' : 'Clave de Seguridad del Docente',
    placeholderTeacherPin: isSpanishTarget ? 'Enter teacher security PIN' : 'Introduce la clave del docente',
    btnValidateTeacher: isSpanishTarget ? 'Validate Teacher Access' : 'Validar Acceso de Docente',

    // Footer
    footerSystem: isSpanishTarget ? '© 2026 CesarTeach. Accredited Language Learning System.' : '© 2026 CesarTeach. Sistema de Aprendizaje Acreditado.',
    footerCloud: isSpanishTarget ? 'Secure academic records and certified learning.' : 'Registro académico seguro y aprendizaje certificado.',

    // Errors
    errFillAll: isSpanishTarget ? 'Please fill in all required fields (Name, Username, and Password).' : 'Por favor completa todos los campos requeridos (Nombre, Usuario y Contraseña).',
    errPasswordLength: isSpanishTarget ? 'Password must be at least 4 characters.' : 'La contraseña debe tener al menos 4 caracteres.',
    errEmailPass: isSpanishTarget ? 'Enter your username or email and password.' : 'Introduce tu usuario o correo y tu contraseña.',
    errTeacherPin: isSpanishTarget ? 'Incorrect teacher PIN. Access denied.' : 'PIN de profesor incorrecto. Acceso denegado.',
    successCreated: isSpanishTarget ? 'Account created successfully! Entering virtual classroom...' : '¡Cuenta creada con éxito! Ingresando a tu aula virtual...',
    successWelcome: isSpanishTarget ? 'Welcome back to CesarTeach!' : '¡Bienvenido de nuevo a CesarTeach!',
    successTeacher: isSpanishTarget ? 'Teacher access authorized.' : 'Acceso de Docente autorizado.'
  };

  // Sign up new student with language choice
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
          const { data, error } = await client.auth.signUp({
            email: cleanEmail,
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

          // Save into profiles table
          await client.from('profiles').upsert({
            id: newProfile.id,
            email: newProfile.email,
            full_name: newProfile.fullName,
            role: 'student',
            student_id_number: newProfile.studentIdNumber,
            avatar_url: newProfile.avatarUrl,
            created_at: newProfile.createdAt,
            last_active_at: newProfile.lastActiveAt
          });
        } catch (supaErr) {
          console.warn('Notice from Supabase sign up:', supaErr);
        }
      }

      // Save to local student registry
      const localStudents = getLocalStudents();
      const existingIdx = localStudents.findIndex(s => s.profile.email.toLowerCase() === cleanEmail);
      if (existingIdx >= 0) {
        localStudents[existingIdx].profile = newProfile;
        localStudents[existingIdx].courseLanguage = targetLanguage;
      } else {
        localStudents.unshift({
          profile: newProfile,
          progress: {
            completedLessons: [],
            masteredWords: [],
            examScore: undefined,
            examPassed: false,
            xp: 0,
            streakDays: 1,
            lastStudyDate: new Date().toISOString().split('T')[0],
            unlockedBadges: ['first_login']
          },
          courseLanguage: targetLanguage
        });
      }
      localStorage.setItem('lingostep_students_records_v2', JSON.stringify(localStudents));

      setStoredCurrentUser(newProfile);
      setSuccessMsg(t.successCreated);
      setTimeout(() => {
        onLoginSuccess(newProfile, targetLanguage);
      }, 500);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al crear la cuenta de estudiante.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in existing student
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

      // 1. Try Supabase Auth
      if (client) {
        try {
          const { data, error } = await client.auth.signInWithPassword({
            email: cleanEmail,
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
            setStoredCurrentUser(profile);
            setSuccessMsg(t.successWelcome);
            setTimeout(() => onLoginSuccess(profile, userLang), 400);
            return;
          }
        } catch (supaErr) {
          console.warn('Supabase sign-in warning:', supaErr);
        }
      }

      // 2. Check local registered students
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
        setSuccessMsg(t.successWelcome);
        setTimeout(() => onLoginSuccess(updated, userLang), 400);
        return;
      }

      // 3. If account not found, provision fresh student profile with current targetLanguage
      const autoProfile: UserProfile = {
        id: `std_${Date.now().toString(36)}`,
        email: cleanEmail,
        fullName: cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role: 'student',
        targetLanguage: targetLanguage,
        studentIdNumber: `EST-${Math.floor(1000 + Math.random() * 9000)}`,
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString()
      };
      
      localStudents.unshift({
        profile: autoProfile,
        progress: {
          completedLessons: [],
          masteredWords: [],
          examScore: undefined,
          examPassed: false,
          xp: 0,
          streakDays: 1,
          lastStudyDate: new Date().toISOString().split('T')[0],
          unlockedBadges: ['first_login']
        },
        courseLanguage: targetLanguage
      });
      localStorage.setItem('lingostep_students_records_v2', JSON.stringify(localStudents));

      setStoredCurrentUser(autoProfile);
      setSuccessMsg(t.successWelcome);
      setTimeout(() => onLoginSuccess(autoProfile, targetLanguage), 400);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in as Teacher with encrypted hash validation (PIN: 159487123456)
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
        email: 'docente@lingostep.edu',
        fullName: isSpanishTarget ? 'Head Teacher / Professor' : 'Profesor Titular / Docente',
        role: 'teacher',
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString()
      };

      setStoredCurrentUser(teacherProfile);
      setSuccessMsg(t.successTeacher);
      setTimeout(() => {
        onLoginSuccess(teacherProfile);
      }, 400);
    } catch (err) {
      setErrorMsg('Error al verificar la clave de seguridad del docente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-zinc-950 text-white flex flex-col justify-between relative overflow-hidden px-4 py-8">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Brand, Course Language Switcher & Supabase Status Pill */}
      <header className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-white">CesarTeach</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-black uppercase tracking-wider">
                {t.portalBadge}
              </span>
            </div>
            <p className="text-xs text-zinc-400">{t.portalSub}</p>
          </div>
        </div>

        {/* Course Mode Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Main Target Language Switcher on Top */}
          <div className="bg-zinc-900/90 border border-zinc-700/80 p-1 rounded-2xl flex items-center gap-1 shadow-lg backdrop-blur-md">
            <button
              type="button"
              onClick={() => { setTargetLanguage('es'); setErrorMsg(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                targetLanguage === 'es'
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30 ring-2 ring-amber-400/50'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🇪🇸</span>
              <span>{t.btnLearnSpanish}</span>
            </button>

            <button
              type="button"
              onClick={() => { setTargetLanguage('en'); setErrorMsg(null); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs transition-all ${
                targetLanguage === 'en'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/50'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🇬🇧</span>
              <span>{t.btnLearnEnglish}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full my-auto py-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: Features Presentation */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.badgeObligatory}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            {t.heroTitlePrefix}
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              {t.heroTitleHighlight}
            </span>
            {t.heroTitleSuffix}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
            {t.heroDesc}
          </p>

          {/* Key Feature Badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 flex items-start gap-3 backdrop-blur-sm">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">{t.feat1Title}</h4>
                <p className="text-[11px] text-zinc-400">{t.feat1Sub}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 flex items-start gap-3 backdrop-blur-sm">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Trophy className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">{t.feat2Title}</h4>
                <p className="text-[11px] text-zinc-400">{t.feat2Sub}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 flex items-start gap-3 backdrop-blur-sm">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">{t.feat3Title}</h4>
                <p className="text-[11px] text-zinc-400">{t.feat3Sub}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 flex items-start gap-3 backdrop-blur-sm">
              <div className="p-2 rounded-xl bg-sky-500/20 text-sky-400">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white">{t.feat4Title}</h4>
                <p className="text-[11px] text-zinc-400">{t.feat4Sub}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Card Form */}
        <div className="lg:col-span-6">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative">
            
            {/* Mode Switcher Tabs */}
            <div className="flex rounded-2xl bg-zinc-950 p-1 mb-6 border border-zinc-800">
              <button
                type="button"
                onClick={() => { setActiveTab('signup'); setErrorMsg(null); setSuccessMsg(null); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'signup'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{t.tabSignUp}</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('signin'); setErrorMsg(null); setSuccessMsg(null); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'signin'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t.tabSignIn}</span>
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('teacher'); setErrorMsg(null); setSuccessMsg(null); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'teacher'
                    ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30'
                    : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t.tabTeacher}</span>
              </button>
            </div>

            {/* Error & Success Feedback Alerts */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 mb-5 rounded-2xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 mb-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </motion.div>
            )}

            {/* TAB 1: SIGN UP */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUpStudent} className="space-y-4">
                {/* Idioma a Aprender Selector */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Languages className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{t.labelTargetLang}</span> <span className="text-rose-400">*</span>
                    </span>
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setTargetLanguage('es')}
                      className={`p-3 rounded-2xl border flex items-center gap-3 transition-all text-left ${
                        targetLanguage === 'es'
                          ? 'bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/40 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-2xl">🇪🇸</span>
                      <div>
                        <div className="text-xs font-black text-white">{t.cardOptSpanishTitle}</div>
                        <div className="text-[10px] text-zinc-400">{t.cardOptSpanishSub}</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTargetLanguage('en')}
                      className={`p-3 rounded-2xl border flex items-center gap-3 transition-all text-left ${
                        targetLanguage === 'en'
                          ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/40 text-white'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-2xl">🇺🇸</span>
                      <div>
                        <div className="text-xs font-black text-white">{t.cardOptEnglishTitle}</div>
                        <div className="text-[10px] text-zinc-400">{t.cardOptEnglishSub}</div>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    {t.labelFullName} <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.placeholderFullName}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-zinc-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      {t.labelEmail} <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.placeholderEmail}
                      className="w-full px-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-zinc-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                      {t.labelStudentId}
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder={t.placeholderStudentId}
                      className="w-full px-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-zinc-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    {t.labelPassword} <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.placeholderPassword}
                      className="w-full px-4 py-2.5 pr-10 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-zinc-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-sky-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 transform active:scale-[0.99]"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>{t.btnCreateAccount}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 2: SIGN IN */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignInStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    {t.labelEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholderEmail}
                    className="w-full px-4 py-2.5 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-zinc-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    {t.labelPassword}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t.placeholderPasswordSignIn}
                      className="w-full px-4 py-2.5 pr-10 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-zinc-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>{t.btnSignIn}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* TAB 3: TEACHER ACCESS */}
            {activeTab === 'teacher' && (
              <form onSubmit={handleTeacherAccess} className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-black">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t.teacherBoxTitle}</span>
                  </div>
                  <p className="text-[11px] text-zinc-300">
                    {t.teacherBoxDesc}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 mb-1.5">
                    {t.labelTeacherPin}
                  </label>
                  <div className="relative">
                    <input
                      type={showTeacherPin ? 'text' : 'password'}
                      required
                      value={teacherPin}
                      onChange={(e) => setTeacherPin(e.target.value)}
                      placeholder={t.placeholderTeacherPin}
                      className="w-full px-4 py-2.5 pr-10 rounded-2xl bg-zinc-950 border border-zinc-800 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 placeholder-zinc-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowTeacherPin(!showTeacherPin)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                      title={showTeacherPin ? 'Ocultar PIN' : 'Ver PIN'}
                    >
                      {showTeacherPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-zinc-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t.btnValidateTeacher}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-center text-xs text-zinc-500 py-4 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-zinc-800/60">
        <p>{t.footerSystem}</p>
        <p className="flex items-center gap-1.5 text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>{t.footerCloud}</span>
        </p>
      </footer>
    </div>
  );
}
