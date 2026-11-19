import React, { useState } from 'react';
import { UserProfile } from '../types';
import {
  getLocalStudents,
  setStoredCurrentUser,
  fetchStudentProgressFromDatabase,
  fetchStudentProfileFromDatabase,
  syncStudentProgressToDatabase,
  signInWithGoogleFirebase
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
  X
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
  initialMode = 'signin'
}: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'teacher'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [targetLanguage, setTargetLanguage] = useState<'en' | 'es'>('en');
  const [teacherEmail, setTeacherEmail] = useState(MASTER_TEACHER_EMAIL);
  const [teacherPin, setTeacherPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTeacherPin, setShowTeacherPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async (attemptingTeacherLogin: boolean = false) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsLoading(true);
    try {
      const { profile, courseLanguage } = await signInWithGoogleFirebase(
        targetLanguage,
        attemptingTeacherLogin
      );
      setSuccessMsg(`¡Bienvenido(a), ${profile.fullName}!`);
      setTimeout(() => {
        onLoginSuccess(profile, courseLanguage);
        onClose();
      }, 350);
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setErrorMsg(err.message || 'No se pudo iniciar sesión con Google.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Open Student Registration
  const handleSignUpStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Completa todos los campos obligatorios.');
      return;
    }

    if (password.length < 4) {
      setErrorMsg('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    if (isMasterTeacherEmail(cleanEmail)) {
      setErrorMsg(`El correo ${MASTER_TEACHER_EMAIL} es del Profesor Titular.`);
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
      setSuccessMsg('¡Cuenta de alumno creada!');
      setTimeout(() => {
        onLoginSuccess(newProfile, targetLanguage);
        onClose();
      }, 400);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error al crear la cuenta.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('Introduce tu correo/matrícula y tu contraseña.');
      return;
    }

    setIsLoading(true);

    try {
      const cleanEmail = email.trim().toLowerCase();

      const remoteProfile = await fetchStudentProfileFromDatabase(cleanEmail);
      if (remoteProfile) {
        if (remoteProfile.accessPin && remoteProfile.accessPin !== password.trim()) {
          throw new Error('Contraseña incorrecta.');
        }

        const userLang = remoteProfile.targetLanguage || 'en';
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
        setSuccessMsg(`¡Bienvenido(a), ${remoteProfile.fullName}!`);
        setTimeout(() => {
          onLoginSuccess(remoteProfile, userLang);
          onClose();
        }, 350);
        return;
      }

      const localStudents = getLocalStudents();
      const matched = localStudents.find(
        s =>
          s.profile.email.toLowerCase() === cleanEmail ||
          (s.profile.studentIdNumber &&
            s.profile.studentIdNumber.toLowerCase() === cleanEmail)
      );

      if (matched) {
        const userLang = matched.courseLanguage || matched.profile.targetLanguage || 'en';
        const updated = {
          ...matched.profile,
          lastActiveAt: new Date().toISOString()
        };
        await syncStudentProgressToDatabase(updated, matched.progress, userLang);
        setStoredCurrentUser(updated);
        setSuccessMsg(`¡Bienvenido(a), ${updated.fullName}!`);
        setTimeout(() => {
          onLoginSuccess(updated, userLang);
          onClose();
        }, 350);
      } else {
        throw new Error('Cuenta no encontrada.');
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
      const cleanTeacherEmail = teacherEmail.trim().toLowerCase();

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
          createdAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString()
        };

        setStoredCurrentUser(teacherProfile);
        setSuccessMsg('Acceso de Profesor Titular concedido.');
        setTimeout(() => {
          onLoginSuccess(teacherProfile);
          onClose();
        }, 350);
        return;
      }

      const existingTeacher = await fetchStudentProfileFromDatabase(cleanTeacherEmail);
      if (
        !existingTeacher ||
        existingTeacher.role !== 'teacher' ||
        !existingTeacher.authorizedTeacherByMaster
      ) {
        setErrorMsg(
          `Ningún profesor puede acceder o registrarse sin autorización de ${MASTER_TEACHER_EMAIL}.`
        );
        setIsLoading(false);
        return;
      }

      if (existingTeacher.accessPin && existingTeacher.accessPin !== teacherPin.trim()) {
        setErrorMsg('Clave de profesor incorrecta.');
        setIsLoading(false);
        return;
      }

      setStoredCurrentUser(existingTeacher);
      setSuccessMsg('Acceso de Profesor Autorizado concedido.');
      setTimeout(() => {
        onLoginSuccess(existingTeacher);
        onClose();
      }, 350);
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
        className="bg-white dark:bg-zinc-900 rounded-3xl max-w-lg w-full shadow-2xl border-2 border-slate-900 dark:border-zinc-700 overflow-hidden"
      >
        <div className="p-6 bg-indigo-600 text-white relative border-b-2 border-slate-900">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black">Portal de Alumnos y Profesores</h2>
              <p className="text-xs text-indigo-100 font-semibold">
                Alumnos: registro libre · Profesores: solo con autorización
              </p>
            </div>
          </div>

          <div className="flex bg-slate-900/30 p-1 rounded-xl mt-4 gap-1">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-white text-slate-950'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Entrar Alumno
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-emerald-400 text-slate-950'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Crear Alumno
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('teacher');
                setErrorMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-black rounded-lg transition-all ${
                mode === 'teacher'
                  ? 'bg-yellow-300 text-slate-950'
                  : 'text-yellow-200 hover:text-white'
              }`}
            >
              Profesor
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-rose-100 border-2 border-slate-900 text-slate-950 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-2xl bg-emerald-200 border-2 border-slate-900 text-slate-950 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-700" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'signin' && (
            <form onSubmit={handleSignInStudent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-zinc-300 mb-1.5">
                  Correo o Matrícula de Alumno
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="alumno@correo.com o EST-1001"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 text-sm font-bold text-slate-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-zinc-300 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 text-sm font-bold text-slate-900 dark:text-zinc-100 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Ingresar</span>
                  </>
                )}
              </button>
            </form>
          )}

          {mode === 'signup' && (
            <form onSubmit={handleSignUpStudent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-zinc-300 mb-1">
                  Nombre Completo del Alumno *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Ej. María Fernanda Morales"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-zinc-300 mb-1">
                  Correo o Usuario *
                </label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="maria@alumno.edu"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-zinc-300 mb-1">
                  Contraseña *
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Mínimo 4 caracteres"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 text-xs font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Crear Cuenta de Alumno</span>
              </button>
            </form>
          )}

          {mode === 'teacher' && (
            <form onSubmit={handleTeacherAccess} className="space-y-3.5">
              <div className="p-3.5 rounded-2xl bg-yellow-200 border-2 border-slate-900 text-slate-950 text-xs font-bold">
                Ningún profesor puede registrarse sin autorización de{' '}
                <strong>{MASTER_TEACHER_EMAIL}</strong>.
              </div>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleGoogleSignIn(true)}
                className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-yellow-300" />
                <span>Entrar con Google (Profesor Titular o Autorizado)</span>
              </button>

              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-zinc-300 mb-1">
                  Correo del Profesor Autorizado
                </label>
                <input
                  type="email"
                  required
                  value={teacherEmail}
                  onChange={e => setTeacherEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-zinc-100"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-800 dark:text-zinc-300 mb-1">
                  Clave de Profesor
                </label>
                <div className="relative">
                  <input
                    type={showTeacherPin ? 'text' : 'password'}
                    required
                    value={teacherPin}
                    onChange={e => setTeacherPin(e.target.value)}
                    placeholder="Introduce tu clave"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-zinc-100 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowTeacherPin(!showTeacherPin)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showTeacherPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Validar Acceso de Profesor</span>
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
