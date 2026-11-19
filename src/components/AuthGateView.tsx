import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  getLocalStudents,
  setStoredCurrentUser,
  fetchStudentProgressFromDatabase,
  fetchStudentProfileFromDatabase,
  syncStudentProgressToDatabase,
  signInWithGoogleFirebase,
  requestTeacherRegistration
} from '../lib/supabase';
import {
  MASTER_TEACHER_EMAIL,
  isMasterTeacherEmail,
  verifyTeacherCredentials
} from '../lib/security';
import { motion } from 'motion/react';
import {
  GraduationCap,
  ShieldCheck,
  LogIn,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  RefreshCw,
  ArrowRight,
  Lock
} from 'lucide-react';

interface AuthGateViewProps {
  onLoginSuccess: (user: UserProfile, targetLanguage?: 'en' | 'es') => void;
}

export function AuthGateView({ onLoginSuccess }: AuthGateViewProps) {
  const [activeTab, setActiveTab] = useState<'signup' | 'signin' | 'teacher'>('signup');
  const [teacherSubMode, setTeacherSubMode] = useState<'login' | 'request'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'es'>(() => {
    return (localStorage.getItem('lingostep_active_course') as 'en' | 'es') || 'en';
  });

  // Teacher fields
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPin, setTeacherPin] = useState('');
  const [reqTeacherName, setReqTeacherName] = useState('');
  const [reqTeacherEmail, setReqTeacherEmail] = useState('');
  const [reqTeacherPin, setReqTeacherPin] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showTeacherPin, setShowTeacherPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [unauthorizedDomainHost, setUnauthorizedDomainHost] = useState<string | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const isSpanishCourse = targetLanguage === 'es'; // Native English speaker learning Spanish

  // Google Sign-In (Open for students; protected for teachers)
  const handleGoogleSignIn = async (attemptingTeacherLogin: boolean = false) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setUnauthorizedDomainHost(null);
    setIsLoading(true);
    try {
      const { profile, courseLanguage } = await signInWithGoogleFirebase(
        targetLanguage,
        attemptingTeacherLogin
      );
      setSuccessMsg(
        profile.role === 'teacher'
          ? `¡Bienvenido Profesor(a) ${profile.fullName}!`
          : isSpanishCourse
            ? `Welcome to your Spanish learning path, ${profile.fullName}!`
            : `¡Bienvenido(a) a tu ruta de estudio, ${profile.fullName}!`
      );
      setTimeout(() => {
        onLoginSuccess(profile, courseLanguage);
      }, 350);
    } catch (err: any) {
      const code = err?.code || '';
      const msg = String(err?.message || '');
      if (code === 'auth/unauthorized-domain' || msg.includes('auth/unauthorized-domain')) {
        const currentHost =
          typeof window !== 'undefined' && window.location?.hostname
            ? window.location.hostname
            : 'ais-pre-4dxpe7lvb4rbufwf77nug4-241148874324.us-east1.run.app';
        setUnauthorizedDomainHost(currentHost);
        setErrorMsg(
          isSpanishCourse
            ? `Google Popup blocked on domain "${currentHost}" (auth/unauthorized-domain). Your Firebase Firestore database IS connected—use the direct Student or Teacher form right here to enter immediately, or add this domain in Firebase Console > Authentication > Settings > Authorized domains.`
            : `La ventana de Google pide autorizar el dominio "${currentHost}" (auth/unauthorized-domain). Tu base de datos Firebase Firestore SÍ está conectada y guardando datos: entra AHORA MISMO usando el formulario directo de Alumno o Profesor aquí abajo, o agrega este dominio en Firebase Console > Authentication > Settings > Dominios autorizados.`
        );
      } else if (code !== 'auth/popup-closed-by-user') {
        setErrorMsg(
          err.message ||
            (isSpanishCourse
              ? 'Could not complete Google Sign-In.'
              : 'No se pudo completar el inicio de sesión con Google.')
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // OPEN STUDENT REGISTRATION: Any student can register freely and start learning immediately
  const handleSignUpStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg(
        isSpanishCourse
          ? 'Please enter your Full Name, Email/Username, and Password.'
          : 'Por favor completa tu Nombre Completo, Correo/Usuario y Contraseña.'
      );
      return;
    }

    if (password.trim().length < 4) {
      setErrorMsg(
        isSpanishCourse
          ? 'Password must be at least 4 characters long.'
          : 'La contraseña debe tener al menos 4 caracteres.'
      );
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (isMasterTeacherEmail(cleanEmail)) {
      setErrorMsg(
        isSpanishCourse
          ? 'This email belongs to the Head Teacher. Please sign in from the "Teacher" tab.'
          : 'Este correo pertenece al Profesor Titular. Ingresa desde la pestaña "Profesor".'
      );
      return;
    }

    setIsLoading(true);

    try {
      const generatedId = `std_${Date.now().toString(36)}_${Math.random()
        .toString(36)
        .substring(2, 6)}`;
      const cleanName = fullName.trim();
      const cleanStudentId = (
        studentId.trim() || `EST-${Math.floor(1000 + Math.random() * 9000)}`
      ).toUpperCase();

      const newProfile: UserProfile = {
        id: generatedId,
        email: cleanEmail,
        fullName: cleanName,
        role: 'student',
        studentIdNumber: cleanStudentId,
        targetLanguage,
        enrollmentStatus: 'approved',
        approvedByTeacher: true,
        accessPin: password.trim(),
        createdAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
          cleanName
        )}`
      };

      const initialProgress = {
        completedLessons: [],
        masteredWords: [],
        examScore: undefined,
        examPassed: false,
        levelScores: {},
        xp: 0,
        streakDays: 1,
        lastStudyDate: new Date().toISOString().split('T')[0],
        unlockedBadges: ['b_first_step'],
        wordSRSStatus: {},
        lessonDates: {},
        examHistory: [],
        totalExercisesDone: 0,
        timeSpentMinutes: 0
      };

      await syncStudentProgressToDatabase(newProfile, initialProgress, targetLanguage);
      setStoredCurrentUser(newProfile);
      setSuccessMsg(
        isSpanishCourse
          ? 'Student account created! Entering your Spanish Lesson Path...'
          : '¡Cuenta de estudiante creada! Ingresando a tu Camino de Lecciones...'
      );
      setTimeout(() => {
        onLoginSuccess(newProfile, targetLanguage);
      }, 400);
    } catch (err: any) {
      setErrorMsg(
        err.message ||
          (isSpanishCourse
            ? 'Error creating student account.'
            : 'Error al crear la cuenta de estudiante.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in existing Student
  const handleSignInStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg(
        isSpanishCourse
          ? 'Please enter your username/email and password.'
          : 'Introduce tu usuario/correo y tu contraseña.'
      );
      return;
    }

    setIsLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      // 1. Query Firebase Firestore users collection
      const remoteProfile = await fetchStudentProfileFromDatabase(cleanEmail);
      if (remoteProfile) {
        if (remoteProfile.accessPin && remoteProfile.accessPin !== password.trim()) {
          throw new Error(
            isSpanishCourse
              ? 'The password entered is incorrect.'
              : 'La contraseña ingresada es incorrecta.'
          );
        }

        const userLang = remoteProfile.targetLanguage || targetLanguage || 'en';
        const remoteProgress = await fetchStudentProgressFromDatabase(remoteProfile.id);
        if (remoteProgress) {
          try {
            localStorage.setItem(
              `lingostep_progress_${remoteProfile.id}`,
              JSON.stringify(remoteProgress)
            );
          } catch (e) {}
        }
        setStoredCurrentUser(remoteProfile);
        setSuccessMsg(
          isSpanishCourse
            ? `Welcome back, ${remoteProfile.fullName}!`
            : `¡Bienvenido(a) de nuevo, ${remoteProfile.fullName}!`
        );
        setTimeout(() => onLoginSuccess(remoteProfile, userLang), 350);
        return;
      }

      // 2. Check local registered students
      const localStudents = getLocalStudents();
      const matched = localStudents.find(
        s =>
          s.profile.email.toLowerCase() === cleanEmail ||
          s.profile.email.toLowerCase().replace(/@.*$/, '') === cleanEmail ||
          s.profile.fullName.toLowerCase() === cleanEmail ||
          (s.profile.studentIdNumber &&
            s.profile.studentIdNumber.toLowerCase() === cleanEmail)
      );

      if (matched) {
        const userLang =
          matched.courseLanguage || matched.profile.targetLanguage || targetLanguage || 'en';
        const updated: UserProfile = {
          ...matched.profile,
          lastActiveAt: new Date().toISOString()
        };
        await syncStudentProgressToDatabase(updated, matched.progress, userLang);
        setStoredCurrentUser(updated);
        setSuccessMsg(
          isSpanishCourse
            ? `Welcome back, ${updated.fullName}!`
            : `¡Bienvenido(a), ${updated.fullName}!`
        );
        setTimeout(() => onLoginSuccess(updated, userLang), 350);
        return;
      }

      throw new Error(
        isSpanishCourse
          ? 'Student account not found. If you are a new student, register for free in the "Student Sign Up" tab.'
          : 'No encontramos ese usuario. Si eres nuevo alumno, regístrate gratis en la pestaña "Registro Alumno".'
      );
    } catch (err: any) {
      setErrorMsg(
        err.message || (isSpanishCourse ? 'Error signing in.' : 'Error al iniciar sesión.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in as Teacher: ONLY spacio.n.blnco@gmail.com OR a Teacher explicitly authorized by spacio.n.blnco@gmail.com
  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);

    try {
      const cleanTeacherEmail = teacherEmail.trim().toLowerCase();

      // Case 1: Master Teacher (spacio.n.blnco@gmail.com)
      if (isMasterTeacherEmail(cleanTeacherEmail)) {
        const isValid = await verifyTeacherCredentials(cleanTeacherEmail, teacherPin);
        if (!isValid) {
          setErrorMsg('Clave maestra de Profesor Titular incorrecta.');
          setIsLoading(false);
          return;
        }

        const teacherProfile: UserProfile = {
          id: 'teacher_master_01',
          email: MASTER_TEACHER_EMAIL,
          fullName: 'Profesor César (Titular)',
          role: 'teacher',
          authorizedTeacherByMaster: true,
          enrollmentStatus: 'approved',
          approvedByTeacher: true,
          targetLanguage,
          createdAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString()
        };

        setStoredCurrentUser(teacherProfile);
        setSuccessMsg('Acceso de Profesor Titular verificado.');
        setTimeout(() => {
          onLoginSuccess(teacherProfile, targetLanguage);
        }, 350);
        return;
      }

      // Case 2: Another teacher checking if they were authorized by the Head Teacher
      const existingTeacher = await fetchStudentProfileFromDatabase(cleanTeacherEmail);
      if (!existingTeacher) {
        throw new Error(
          'Ningún profesor puede registrarse sin autorización del Profesor Titular. Si deseas ser profesor, usa el botón "Pedir Autorización".'
        );
      }

      if (
        existingTeacher.requestedRole === 'teacher' &&
        !existingTeacher.authorizedTeacherByMaster
      ) {
        throw new Error(
          'Tu solicitud para ser Profesor sigue PENDIENTE de autorización por el Profesor Titular.'
        );
      }

      if (existingTeacher.role !== 'teacher' || !existingTeacher.authorizedTeacherByMaster) {
        throw new Error(
          'Esta cuenta no tiene autorización de Profesor. Solo el Profesor Titular puede autorizar nuevos profesores.'
        );
      }

      if (existingTeacher.accessPin && existingTeacher.accessPin !== teacherPin.trim()) {
        throw new Error('La clave de acceso del profesor invitado es incorrecta.');
      }

      setStoredCurrentUser(existingTeacher);
      setSuccessMsg(`Acceso de Profesor Autorizado concedido: ${existingTeacher.fullName}`);
      setTimeout(() => {
        onLoginSuccess(existingTeacher, targetLanguage);
      }, 350);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al verificar acceso de profesor.');
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Teacher Registration Request (Requires Head Teacher approval!)
  const handleTeacherRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!reqTeacherName.trim() || !reqTeacherEmail.trim() || !reqTeacherPin.trim()) {
      setErrorMsg('Completa tu nombre, correo y la clave que deseas usar.');
      return;
    }

    setIsLoading(true);
    try {
      await requestTeacherRegistration({
        fullName: reqTeacherName,
        email: reqTeacherEmail,
        accessPin: reqTeacherPin
      });
      setSuccessMsg(
        'Solicitud enviada. Ningún profesor puede registrarse sin permiso del Profesor Titular. Cuando te autorice en su Panel Docente, podrás iniciar sesión como profesor.'
      );
      setReqTeacherName('');
      setReqTeacherEmail('');
      setReqTeacherPin('');
      setTeacherSubMode('login');
    } catch (err: any) {
      setErrorMsg(err.message || 'No se pudo enviar la solicitud de profesor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between px-4 py-6">
      {/* Top Bar */}
      <header className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-2xl px-5 py-3.5 shadow-[4px_4px_0px_0px_#0f172a]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-yellow-300 border-2 border-slate-900 flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
            <GraduationCap className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-slate-950 dark:text-white font-display">
                CesarTeach
              </h1>
              <span className="px-2.5 py-0.5 rounded-lg bg-emerald-300 text-slate-950 border border-slate-900 text-[10px] font-black uppercase">
                {isSpanishCourse ? 'CEFR A1–B2 Curriculum' : 'Currículo MCER A1–B2'}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
              {isSpanishCourse
                ? 'Open Registration for Students · Teachers Require Head Teacher Approval'
                : 'Registro libre para Alumnos · Profesores requieren autorización del Titular'}
            </p>
          </div>
        </div>

        {/* Course Selector */}
        <div className="bg-slate-100 dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 p-1 rounded-xl flex items-center gap-1">
          <button
            type="button"
            onClick={() => {
              setTargetLanguage('en');
              localStorage.setItem('lingostep_active_course', 'en');
              setErrorMsg(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg font-black text-xs transition-all ${
              targetLanguage === 'en'
                ? 'bg-yellow-300 text-slate-950 border border-slate-900'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950'
            }`}
          >
            🇬🇧 Aprender Inglés (A1–B2)
          </button>
          <button
            type="button"
            onClick={() => {
              setTargetLanguage('es');
              localStorage.setItem('lingostep_active_course', 'es');
              setErrorMsg(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg font-black text-xs transition-all ${
              targetLanguage === 'es'
                ? 'bg-yellow-300 text-slate-950 border border-slate-900'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950'
            }`}
          >
            🇪🇸 Learn Spanish (A1–B2)
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Learning Priority Presentation */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 text-xs font-black shadow-[2px_2px_0px_0px_#0f172a]">
            <span>
              {isSpanishCourse
                ? 'Priority-Ordered Spanish Learning · NoDeck Style'
                : 'Aprendizaje Ordenado por Prioridades · Estilo NoDeck'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-950 dark:text-white leading-[1.08] font-display">
            {isSpanishCourse
              ? 'Sign up as a student and master Spanish step by step from A1 to B2.'
              : 'Regístrate como alumno y avanza en inglés paso a paso desde A1 hasta B2.'}
          </h2>

          <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 font-semibold leading-relaxed">
            {isSpanishCourse ? (
              <>
                Everything is explained in clear English and organized by your learning priorities:
                first follow your <strong>Sequential Lesson Path (Priority #1)</strong>, then
                practice on the <strong>NoDeck Interactive Card Table (Priority #2)</strong>, and
                finally earn your official CEFR certificates.
              </>
            ) : (
              <>
                Todo está explicado en español claro y organizado según tus prioridades: primero
                sigues tu <strong>Camino Secuencial de Lecciones (Prioridad #1)</strong>, luego
                practicas en la <strong>Mesa de Cartas Interactivas NoDeck (Prioridad #2)</strong>{' '}
                y finalmente obtienes tus certificados oficiales MCER.
              </>
            )}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 font-black text-xs">
                01
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-950 dark:text-white">
                  {isSpanishCourse ? '1st: Sequential Lesson Path' : '1º Camino de Lecciones'}
                </h4>
                <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">
                  {isSpanishCourse
                    ? 'Priority #1: Follow structured lessons from A1 to B2 explained in English.'
                    : 'Prioridad #1: Sigue tus clases en orden de A1 a B2 explicadas en español.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-300 text-slate-950 border-2 border-slate-900 font-black text-xs">
                02
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-950 dark:text-white">
                  {isSpanishCourse ? '2nd: NoDeck Card Table' : '2º Mesa de Cartas NoDeck'}
                </h4>
                <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">
                  {isSpanishCourse
                    ? 'Separate practice room with neon highlighter, sentence magnets, and pairs.'
                    : 'Sala separada con subrayador fluorescente, imanes y pares.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-sky-300 text-slate-950 border-2 border-slate-900 font-black text-xs">
                03
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-950 dark:text-white">
                  {isSpanishCourse ? '3rd: Open Student Sign-Up' : '3º Alumnos: Registro Libre'}
                </h4>
                <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">
                  {isSpanishCourse
                    ? 'Create your student account immediately and save your progress in Firebase.'
                    : 'Crea tu cuenta de estudiante al instante y guarda tu avance en Firebase.'}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-rose-300 text-slate-950 border-2 border-slate-900 font-black text-xs">
                04
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-950 dark:text-white">
                  {isSpanishCourse ? 'Protected Teacher Access' : 'Docentes Protegidos'}
                </h4>
                <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">
                  {isSpanishCourse
                    ? 'No teacher can register without direct permission from the Head Teacher.'
                    : 'Ningún profesor puede registrarse sin autorización del Profesor Titular.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Auth Card */}
        <div className="lg:col-span-6">
          <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 sm:p-8 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a]">
            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 gap-1.5 rounded-2xl bg-slate-100 dark:bg-zinc-950 p-1.5 mb-6 border-2 border-slate-900 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('signup');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'signup'
                    ? 'bg-emerald-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                    : 'text-slate-700 dark:text-zinc-400 hover:text-slate-950'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5 shrink-0" />
                <span>{isSpanishCourse ? 'Student Sign Up' : 'Registro Alumno'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('signin');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'signin'
                    ? 'bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                    : 'text-slate-700 dark:text-zinc-400 hover:text-slate-950'
                }`}
              >
                <LogIn className="w-3.5 h-3.5 shrink-0" />
                <span>{isSpanishCourse ? 'Student Log In' : 'Entrar Alumno'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('teacher');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'teacher'
                    ? 'bg-yellow-300 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                    : 'text-amber-700 dark:text-amber-400 hover:text-slate-950'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>{isSpanishCourse ? 'Teacher' : 'Profesor'}</span>
              </button>
            </div>

            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 mb-5 rounded-2xl bg-rose-100 dark:bg-rose-950/80 border-2 border-slate-900 text-slate-950 dark:text-rose-200 text-xs font-bold space-y-2.5"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>

                {unauthorizedDomainHost && (
                  <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border-2 border-slate-900 text-slate-900 dark:text-zinc-100 space-y-2">
                    <p className="text-[11px] font-black text-emerald-700 dark:text-emerald-400">
                      {isSpanishCourse
                        ? '✓ Solution 1 (Immediate): Use the form below — it saves directly to Firebase Cloud Firestore without Google popup!'
                        : '✓ Solución 1 (Inmediata): Usa el formulario directo aquí abajo — ¡sí guarda todo en Firebase Cloud Firestore sin ventana emergente!'}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-zinc-300">
                      {isSpanishCourse
                        ? 'Solution 2 (Enable Google Popup): Copy this domain and paste it in Firebase Console → Authentication → Settings → Authorized domains:'
                        : 'Solución 2 (Activar botón de Google): Copia este dominio y agrégalo en Firebase Console → Authentication → Settings → Dominios autorizados:'}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <code className="px-2.5 py-1.5 rounded-lg bg-yellow-200 text-slate-950 border border-slate-900 font-mono text-[11px] font-black break-all">
                        {unauthorizedDomainHost}
                      </code>
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator?.clipboard) {
                            navigator.clipboard.writeText(unauthorizedDomainHost);
                            setCopiedDomain(true);
                            setTimeout(() => setCopiedDomain(false), 2500);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-black hover:bg-slate-800 transition-all"
                      >
                        {copiedDomain
                          ? isSpanishCourse
                            ? '✓ Copied!'
                            : '✓ ¡Dominio copiado!'
                          : isSpanishCourse
                            ? 'Copy Domain'
                            : 'Copiar Dominio'}
                      </button>
                      <a
                        href="https://console.firebase.google.com/project/arcane-benefit-gkhlb/authentication/settings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-300 text-slate-950 border border-slate-900 text-[11px] font-black hover:bg-emerald-400 transition-all"
                      >
                        {isSpanishCourse
                          ? 'Open Firebase Authorized Domains ↗'
                          : 'Abrir Firebase Dominios Autorizados ↗'}
                      </a>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 mb-5 rounded-2xl bg-emerald-200 dark:bg-emerald-950/80 border-2 border-slate-900 text-slate-950 dark:text-emerald-200 text-xs font-bold flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700 mt-0.5" />
                <span>{successMsg}</span>
              </motion.div>
            )}

            {/* TAB 1: OPEN STUDENT SIGN UP */}
            {activeTab === 'signup' && (
              <form onSubmit={handleSignUpStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1.5">
                    {isSpanishCourse
                      ? 'Student Full Name *'
                      : 'Nombre Completo del Estudiante *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder={
                      isSpanishCourse ? 'e.g. Alex Johnson' : 'Ej. María Fernanda Morales'
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1.5">
                      {isSpanishCourse ? 'Email or Username *' : 'Correo o Usuario *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder={
                        isSpanishCourse
                          ? 'e.g. alex24 or alex@email.com'
                          : 'Ej. maria24 o maria@correo.com'
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white text-xs font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1.5">
                      {isSpanishCourse ? 'Student ID (Optional)' : 'Matrícula / ID (Opcional)'}
                    </label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={e => setStudentId(e.target.value)}
                      placeholder={isSpanishCourse ? 'e.g. STD-2026-01' : 'Ej. EST-2026-01'}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white text-xs font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1.5">
                    {isSpanishCourse ? 'Password *' : 'Contraseña *'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder={
                        isSpanishCourse ? 'At least 4 characters' : 'Mínimo 4 caracteres'
                      }
                      className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 border-2 border-slate-900 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>
                        {isSpanishCourse
                          ? 'Create Student Account & Start Spanish'
                          : 'Crear Cuenta de Alumno y Comenzar'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleGoogleSignIn(false)}
                  className="w-full py-3 px-4 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <span>
                    {isSpanishCourse
                      ? 'Sign Up or Log In with Google (Students)'
                      : 'Registrarse o Entrar con Google (Alumnos)'}
                  </span>
                </button>
              </form>
            )}

            {/* TAB 2: STUDENT SIGN IN */}
            {activeTab === 'signin' && (
              <form onSubmit={handleSignInStudent} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1.5">
                    {isSpanishCourse
                      ? 'Email, Username, or Student ID'
                      : 'Correo Electrónico, Usuario o Matrícula'}
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder={isSpanishCourse ? 'e.g. alex24 or STD-1234' : 'Ej. maria24 o EST-1234'}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1.5">
                    {isSpanishCourse ? 'Password' : 'Contraseña'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder={
                        isSpanishCourse ? 'Enter your password' : 'Introduce tu contraseña'
                      }
                      className="w-full px-4 py-3 pr-10 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white text-sm font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>{isSpanishCourse ? 'Enter Course' : 'Ingresar al Curso'}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleGoogleSignIn(false)}
                  className="w-full py-3 px-4 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                >
                  <span>{isSpanishCourse ? 'Continue with Google' : 'Continuar con Google'}</span>
                </button>
              </form>
            )}

            {/* TAB 3: TEACHER ACCESS (NO TEACHER CAN REGISTER WITHOUT MASTER TEACHER AUTHORIZATION) */}
            {activeTab === 'teacher' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-yellow-200 dark:bg-amber-950/60 border-2 border-slate-900 space-y-1">
                  <div className="flex items-center gap-2 text-slate-950 dark:text-amber-300 text-xs font-black">
                    <Lock className="w-4 h-4 shrink-0" />
                    <span>Registro de Profesores Restringido</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-zinc-300 leading-relaxed">
                    Ningún profesor puede registrarse sin la autorización directa del Profesor
                    Titular.
                  </p>
                </div>

                {/* Sub-switcher: Entrar como Profesor Autorizado vs Solicitar Autorización al Titular */}
                <div className="grid grid-cols-2 gap-1.5 bg-slate-100 dark:bg-zinc-950 p-1 rounded-xl border-2 border-slate-900">
                  <button
                    type="button"
                    onClick={() => {
                      setTeacherSubMode('login');
                      setErrorMsg(null);
                    }}
                    className={`py-2 rounded-lg text-xs font-black transition-all ${
                      teacherSubMode === 'login'
                        ? 'bg-white text-slate-950 border border-slate-900'
                        : 'text-slate-600 dark:text-zinc-400'
                    }`}
                  >
                    Profesor Autorizado
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTeacherSubMode('request');
                      setErrorMsg(null);
                    }}
                    className={`py-2 rounded-lg text-xs font-black transition-all ${
                      teacherSubMode === 'request'
                        ? 'bg-white text-slate-950 border border-slate-900'
                        : 'text-slate-600 dark:text-zinc-400'
                    }`}
                  >
                    Pedir Autorización
                  </button>
                </div>

                {teacherSubMode === 'login' ? (
                  <div className="space-y-3.5">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleGoogleSignIn(true)}
                      className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 font-black text-xs shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-yellow-300" />
                      <span>Entrar con Google (Profesor Titular o Autorizados)</span>
                    </button>

                    <form onSubmit={handleTeacherLogin} className="space-y-3">
                      <div>
                        <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1">
                          Correo del Profesor Autorizado
                        </label>
                        <input
                          type="email"
                          required
                          value={teacherEmail}
                          onChange={e => setTeacherEmail(e.target.value)}
                          placeholder="Introduce tu correo de profesor"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1">
                          Clave de Seguridad de Profesor
                        </label>
                        <div className="relative">
                          <input
                            type={showTeacherPin ? 'text' : 'password'}
                            required
                            value={teacherPin}
                            onChange={e => setTeacherPin(e.target.value)}
                            placeholder="Introduce tu clave de profesor"
                            className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white text-xs font-bold"
                          />
                          <button
                            type="button"
                            onClick={() => setShowTeacherPin(!showTeacherPin)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                          >
                            {showTeacherPin ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            <span>Ingresar al Panel Docente</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <form onSubmit={handleTeacherRequestSubmit} className="space-y-3">
                    <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                      Envía tus datos al Profesor Titular. No tendrás acceso de docente hasta que
                      apruebe tu solicitud en su panel.
                    </p>

                    <div>
                      <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1">
                        Nombre Completo del Profesor Solicitante *
                      </label>
                      <input
                        type="text"
                        required
                        value={reqTeacherName}
                        onChange={e => setReqTeacherName(e.target.value)}
                        placeholder="Ej. Prof. Laura Gómez"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        value={reqTeacherEmail}
                        onChange={e => setReqTeacherEmail(e.target.value)}
                        placeholder="profesor@institucion.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-900 dark:text-zinc-200 mb-1">
                        Clave deseada (para cuando seas aprobado) *
                      </label>
                      <input
                        type="password"
                        required
                        value={reqTeacherPin}
                        onChange={e => setReqTeacherPin(e.target.value)}
                        placeholder="Mínimo 4 caracteres"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border-2 border-slate-900 text-xs font-bold"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 rounded-xl bg-amber-300 hover:bg-amber-400 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[4px_4px_0px_0px_#0f172a]"
                    >
                      Enviar Solicitud de Profesor al Titular
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full text-xs font-bold text-slate-600 dark:text-zinc-400 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t-2 border-slate-900/15 dark:border-zinc-800">
        <p>
          {isSpanishCourse
            ? '© 2026 CesarTeach · CEFR A1–B2 Language Platform'
            : '© 2026 CesarTeach · Plataforma Curricular MCER A1–B2'}
        </p>
        <p className="flex items-center gap-1.5 text-slate-800 dark:text-zinc-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>
            {isSpanishCourse
              ? 'Academic Direction · CesarTeach'
              : 'Dirección Académica · CesarTeach'}
          </span>
        </p>
      </footer>
    </div>
  );
}
