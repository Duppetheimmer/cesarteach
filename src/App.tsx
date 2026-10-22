import React, { useState } from 'react';
import {
  BookOpen,
  Zap,
  Layers,
  Home as HomeIcon,
  Award,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Flame,
  Star,
  Bookmark,
  Compass,
  Bot,
  Wand2,
  Globe,
  ShieldCheck,
  LogOut,
  GraduationCap,
  Database,
  Lock
} from 'lucide-react';
import { a1InicialLessons, a1IntermedioLessons, fluencyLessons, fastTrackVocab, finalExamQuestions } from './data';
import {
  spanishA1InicialLessons,
  spanishA1IntermedioLessons,
  spanishFluencyLessons,
  spanishFastTrackVocab,
  spanishFinalExamQuestions
} from './data/spanishData';
import {
  a2EnglishLessons,
  spanishA2Lessons,
  a2EnglishVocab,
  spanishA2Vocab,
  a2FinalExamQuestions,
  spanishA2FinalExamQuestions
} from './data/a2Data';
import {
  b1EnglishLessons,
  spanishB1Lessons,
  b2EnglishLessons,
  spanishB2Lessons,
  b1EnglishVocab,
  b2EnglishVocab,
  spanishB1Vocab,
  spanishB2Vocab,
  b1FinalExamQuestions,
  b2FinalExamQuestions,
  spanishB1FinalExamQuestions,
  spanishB2FinalExamQuestions
} from './data/b1b2Data';
import { useProgress } from './hooks/useProgress';
import { StepPath } from './components/StepPath';
import { FastVocabView } from './components/FastVocabView';
import { FinalExamView } from './components/FinalExamView';
import { NotebookModal } from './components/NotebookModal';
import { DailyChallengeModal } from './components/DailyChallengeModal';
import { VerbTrainerModal } from './components/VerbTrainerModal';
import { QuickPracticeModal } from './components/QuickPracticeModal';
import { AiTutorView } from './components/AiTutorView';
import { AiToolsView } from './components/AiToolsView';
import { AuthModal } from './components/AuthModal';
import { AuthGateView } from './components/AuthGateView';
import { TeacherDashboardView } from './components/TeacherDashboardView';
import { LearningStrategyPanel } from './components/LearningStrategyPanel';
import { SectionTab, UserProfile } from './types';
import { getStoredCurrentUser, setStoredCurrentUser } from './lib/supabase';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<SectionTab>('home');
  const [courseLanguage, setCourseLanguage] = useState<'en' | 'es'>(() => {
    return (localStorage.getItem('lingostep_active_course') as 'en' | 'es') || 'es';
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getStoredCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup' | 'teacher'>('signin');

  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);
  const [isVerbTrainerOpen, setIsVerbTrainerOpen] = useState(false);
  const [isQuickPracticeOpen, setIsQuickPracticeOpen] = useState(false);

  const handleToggleLanguage = (lang: 'en' | 'es') => {
    setCourseLanguage(lang);
    localStorage.setItem('lingostep_active_course', lang);
  };

  const {
    progress,
    isLoaded,
    isSyncing,
    syncStatus,
    addXP,
    markLessonComplete,
    markWordMastered,
    updateWordSRS,
    recordExamResult
  } = useProgress(currentUser, courseLanguage);

  const handleLoginSuccess = (user: UserProfile, selectedLanguage?: 'en' | 'es') => {
    setCurrentUser(user);
    if (selectedLanguage) {
      setCourseLanguage(selectedLanguage);
      localStorage.setItem('lingostep_active_course', selectedLanguage);
    } else if (user.targetLanguage) {
      setCourseLanguage(user.targetLanguage);
      localStorage.setItem('lingostep_active_course', user.targetLanguage);
    }
    if (user.role === 'teacher') {
      setActiveTab('teacher-dashboard');
    }
  };

  const handleLogout = () => {
    setStoredCurrentUser(null);
    setCurrentUser(null);
    setIsAuthModalOpen(false);
    if (activeTab === 'teacher-dashboard') {
      setActiveTab('home');
    }
  };

  const handleOpenTeacherPortal = () => {
    if (currentUser?.role === 'teacher') {
      setActiveTab('teacher-dashboard');
    } else {
      setAuthModalMode('teacher');
      setIsAuthModalOpen(true);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-950 text-indigo-600 font-bold">
        <p className="text-lg">Cargando programa curricular CEFR A1 – B2...</p>
      </div>
    );
  }

  // STRICT AUTH GATE: User MUST sign up or log in before accessing lessons and courses
  if (!currentUser) {
    return <AuthGateView onLoginSuccess={handleLoginSuccess} />;
  }

  const currentA1Inicial = courseLanguage === 'es' ? spanishA1InicialLessons : a1InicialLessons;
  const currentA1Intermedio = courseLanguage === 'es' ? spanishA1IntermedioLessons : a1IntermedioLessons;
  const currentA2Lessons = courseLanguage === 'es' ? spanishA2Lessons : a2EnglishLessons;
  const currentB1Lessons = courseLanguage === 'es' ? spanishB1Lessons : b1EnglishLessons;
  const currentB2Lessons = courseLanguage === 'es' ? spanishB2Lessons : b2EnglishLessons;
  const currentFluency = courseLanguage === 'es' ? spanishFluencyLessons : fluencyLessons;

  const currentFastTrackVocab =
    courseLanguage === 'es'
      ? [...spanishFastTrackVocab, ...spanishA2Vocab, ...spanishB1Vocab, ...spanishB2Vocab]
      : [...fastTrackVocab, ...a2EnglishVocab, ...b1EnglishVocab, ...b2EnglishVocab];

  const currentFinalExamQuestions = courseLanguage === 'es' ? spanishFinalExamQuestions : finalExamQuestions;
  const currentA2ExamQuestions = courseLanguage === 'es' ? spanishA2FinalExamQuestions : a2FinalExamQuestions;
  const currentB1ExamQuestions = courseLanguage === 'es' ? spanishB1FinalExamQuestions : b1FinalExamQuestions;
  const currentB2ExamQuestions = courseLanguage === 'es' ? spanishB2FinalExamQuestions : b2FinalExamQuestions;

  const a1Lessons = [...currentA1Inicial, ...currentA1Intermedio, ...currentFluency];
  const allLessons = [...a1Lessons, ...currentA2Lessons, ...currentB1Lessons, ...currentB2Lessons];

  const a1RequiredIds = a1Lessons.map(l => l.id);
  const a2RequiredIds = currentA2Lessons.map(l => l.id);
  const b1RequiredIds = currentB1Lessons.map(l => l.id);
  const b2RequiredIds = currentB2Lessons.map(l => l.id);

  const a1CompletedCount = a1RequiredIds.filter(id => progress.completedLessons.includes(id)).length;
  const a2CompletedCount = a2RequiredIds.filter(id => progress.completedLessons.includes(id)).length;
  const b1CompletedCount = b1RequiredIds.filter(id => progress.completedLessons.includes(id)).length;
  const b2CompletedCount = b2RequiredIds.filter(id => progress.completedLessons.includes(id)).length;

  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = progress.completedLessons.length;

  const badges = progress.unlockedBadges || [];
  const isA1Certified = Boolean(progress.examPassed || badges.includes('b_cert_a1'));
  const isA2Certified = Boolean(badges.includes('b_cert_a2'));
  const isB1Certified = Boolean(badges.includes('b_cert_b1'));
  const isB2Certified = Boolean(badges.includes('b_cert_b2'));

  const isExamUnlocked = a1RequiredIds.every(id => progress.completedLessons.includes(id)) || isA1Certified;

  // Dynamic Rank Level based on CEFR certifications & XP
  const userXP = progress.xp || 0;
  let userRank = courseLanguage === 'es' ? 'CEFR A1 Beginner' : 'Nivel A1 Inicial';
  if (isB2Certified) {
    userRank = courseLanguage === 'es' ? 'CEFR B2 Certified · Advanced Bilingual' : 'Certificado B2 · Dominio Avanzado';
  } else if (isB1Certified) {
    userRank = courseLanguage === 'es' ? 'CEFR B1 Certified · B2 Active' : 'Certificado B1 · Nivel B2 Activo';
  } else if (isA2Certified) {
    userRank = courseLanguage === 'es' ? 'CEFR A2 Certified · B1 Active' : 'Certificado A2 · Nivel B1 Activo';
  } else if (isA1Certified) {
    userRank = courseLanguage === 'es' ? 'CEFR A1 Certified · A2 Active' : 'Certificado A1 · Nivel A2 Activo';
  } else if (userXP >= 250) {
    userRank = courseLanguage === 'es' ? 'CEFR A1 Consolidated' : 'A1 Consolidado';
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'teacher-dashboard':
        return (
          <div className="px-4 pt-6">
            <TeacherDashboardView
              currentUser={currentUser}
              onNavigateToStudentView={() => setActiveTab('home')}
              totalCourseLessonsCount={totalLessonsCount}
            />
          </div>
        );

      case 'home':
        return (
          <div className="max-w-5xl mx-auto pt-6 pb-28 px-4">
            {/* Top User Bar & Teacher Portal Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
              <div className="flex items-center gap-2">
                {currentUser && (
                  <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm text-xs font-medium">
                    <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-black text-xs flex items-center justify-center">
                      {currentUser.fullName.charAt(0)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-slate-900 dark:text-zinc-100 leading-tight">
                        {currentUser.fullName}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono leading-tight">
                        {currentUser.studentIdNumber || currentUser.email}
                      </span>
                    </div>
                    <span aria-hidden="true" className="text-slate-300 dark:text-zinc-700">·</span>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                      {currentUser.role === 'teacher'
                        ? courseLanguage === 'es'
                          ? 'Teacher'
                          : 'Profesor'
                        : courseLanguage === 'es'
                          ? 'Student'
                          : 'Alumno'}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="ml-1 p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title={courseLanguage === 'es' ? 'Log Out' : 'Cerrar Sesión'}
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Teacher Portal Trigger Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleOpenTeacherPortal}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>
                    {courseLanguage === 'es' ? 'Teacher Dashboard' : 'Panel del Profesor'}
                  </span>
                </button>
              </div>
            </div>

            {/* Top Stats & Course Language Switcher Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-4 md:p-5 shadow-sm mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-base">
                  {courseLanguage === 'es' ? 'ES' : 'EN'}
                </div>
                <div>
                  <h2 className="font-black text-lg text-slate-900 dark:text-zinc-100 leading-tight">
                    CesarTeach Academy
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 dark:text-zinc-400">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{userRank}</span>
                    <span aria-hidden="true">·</span>
                    {isSyncing || syncStatus === 'syncing' ? (
                      <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                        <Database className="w-3 h-3 animate-spin" />
                        {courseLanguage === 'es' ? 'Saving to DB...' : 'Guardando en BD...'}
                      </span>
                    ) : syncStatus === 'synced' ? (
                      <span
                        className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1"
                        title="Progreso guardado en la base de datos Supabase"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-500" />
                        {courseLanguage === 'es' ? 'DB Synced' : 'Progreso en BD'}
                      </span>
                    ) : (
                      <span className="font-semibold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        {courseLanguage === 'es' ? 'Saved' : 'Guardado'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Selector & Stats */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Language Switcher Toggle */}
                <div className="bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl flex items-center gap-1 border border-slate-200 dark:border-zinc-700">
                  <button
                    onClick={() => handleToggleLanguage('es')}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors whitespace-nowrap shrink-0 ${
                      courseLanguage === 'es'
                        ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                    }`}
                  >
                    {courseLanguage === 'es' ? 'Spanish (A1–B2)' : 'Español (A1–B2)'}
                  </button>
                  <button
                    onClick={() => handleToggleLanguage('en')}
                    className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-colors whitespace-nowrap shrink-0 ${
                      courseLanguage === 'en'
                        ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                    }`}
                  >
                    {courseLanguage === 'es' ? 'English (A1–B2)' : 'Inglés (A1–B2)'}
                  </button>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 tabular-nums">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>
                    {progress.streakDays || 1} {courseLanguage === 'es' ? 'days' : 'días'}
                  </span>
                  <span aria-hidden="true" className="text-slate-300 dark:text-zinc-600">·</span>
                  <Star className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>{userXP} XP</span>
                </div>

                <button
                  onClick={() => setIsNotebookOpen(true)}
                  className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs shadow-sm transition-colors whitespace-nowrap shrink-0"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{courseLanguage === 'es' ? 'Notebook' : 'Mi Cuaderno'}</span>
                </button>
              </div>
            </div>

            {/* Hero Welcome Banner */}
            <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 rounded-3xl p-8 md:p-10 text-white shadow-lg mb-8">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-200 mb-2 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>
                    {courseLanguage === 'es'
                      ? 'Complete CEFR A1 → A2 → B1 → B2 Curriculum · Spanish for English Speakers'
                      : 'Currículo Completo MCER A1 → A2 → B1 → B2 · Inglés para Hispanohablantes'}
                  </span>
                </p>
                <h1
                  className="text-3xl md:text-4xl font-black tracking-tight mb-3 leading-tight"
                  style={{ textWrap: 'balance' } as React.CSSProperties}
                >
                  {courseLanguage === 'es'
                    ? 'Master Spanish from A1 Foundations to B2 Advanced Mastery.'
                    : 'Domina el Inglés desde los Cimientos A1 hasta el Perfeccionamiento B2.'}
                </h1>
                <p className="text-indigo-100 text-sm md:text-base font-medium mb-6 leading-relaxed max-w-2xl">
                  {courseLanguage === 'es'
                    ? 'Progressive certification system (≥80% exam mastery required per level) combining comprehensible input, contrastive grammar warnings, spaced active recall, and acoustic shadowing.'
                    : 'Sistema de certificación progresiva (requiere ≥80% en el examen de cada nivel) con input comprensible, alertas de contraste gramatical, recuperación activa espaciada y práctica oral.'}
                </p>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveTab('a1-inicial')}
                    className="px-4 py-2.5 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-black text-xs shadow-md flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>{courseLanguage === 'es' ? 'Level A1 Path' : 'Ruta Nivel A1'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={!isA1Certified}
                    onClick={() => {
                      if (!isA1Certified) return;
                      setActiveTab('a2-plataforma');
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                      isA1Certified
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md'
                        : 'bg-indigo-900/50 text-indigo-200/70 border border-indigo-400/20 cursor-not-allowed opacity-75'
                    }`}
                  >
                    {isA1Certified ? <GraduationCap className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>
                      {isA1Certified
                        ? courseLanguage === 'es'
                          ? 'Level A2 (Unlocked)'
                          : 'Nivel A2 (Desbloqueado)'
                        : courseLanguage === 'es'
                          ? 'Level A2 (Requires A1 Cert)'
                          : 'Nivel A2 (Requiere Cert. A1)'}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={!isA2Certified}
                    onClick={() => {
                      if (!isA2Certified) return;
                      setActiveTab('b1-umbral');
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                      isA2Certified
                        ? 'bg-teal-500 hover:bg-teal-600 text-white shadow-md'
                        : 'bg-indigo-900/50 text-indigo-200/70 border border-indigo-400/20 cursor-not-allowed opacity-75'
                    }`}
                  >
                    {isA2Certified ? <GraduationCap className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>
                      {isA2Certified
                        ? courseLanguage === 'es'
                          ? 'Level B1 (Unlocked)'
                          : 'Nivel B1 (Desbloqueado)'
                        : courseLanguage === 'es'
                          ? 'Level B1 (Requires A2 Cert)'
                          : 'Nivel B1 (Requiere Cert. A2)'}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={!isB1Certified}
                    onClick={() => {
                      if (!isB1Certified) return;
                      setActiveTab('b2-avanzado');
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                      isB1Certified
                        ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md'
                        : 'bg-indigo-900/50 text-indigo-200/70 border border-indigo-400/20 cursor-not-allowed opacity-75'
                    }`}
                  >
                    {isB1Certified ? <Award className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>
                      {isB1Certified
                        ? courseLanguage === 'es'
                          ? 'Level B2 (Unlocked)'
                          : 'Nivel B2 (Desbloqueado)'
                        : courseLanguage === 'es'
                          ? 'Level B2 (Requires B1 Cert)'
                          : 'Nivel B2 (Requiere Cert. B1)'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Neuro-Cognitive Learning Strategy & Progress Optimizer */}
            <LearningStrategyPanel
              progress={progress}
              courseLanguage={courseLanguage}
              a1CompletedCount={a1CompletedCount}
              a1TotalCount={a1RequiredIds.length}
              a2CompletedCount={a2CompletedCount}
              a2TotalCount={a2RequiredIds.length}
              b1CompletedCount={b1CompletedCount}
              b1TotalCount={b1RequiredIds.length}
              b2CompletedCount={b2CompletedCount}
              b2TotalCount={b2RequiredIds.length}
              onNavigate={setActiveTab}
              onOpenQuickPractice={() => setIsQuickPracticeOpen(true)}
            />

            {/* Primary Curricular Modules Grid (A1 Inicial, A1 Intermedio, A2 Plataforma, B1 Umbral, B2 Avanzado, Fluidez, Vocabulario, Certificación) */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-zinc-100">
                  {courseLanguage === 'es'
                    ? 'CEFR Curricular Modules (A1 · A2 · B1 · B2)'
                    : 'Módulos Curriculares Oficiales (A1 · A2 · B1 · B2)'}
                </h2>
                <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 tabular-nums">
                  {completedLessonsCount} / {totalLessonsCount}{' '}
                  {courseLanguage === 'es' ? 'lessons completed' : 'lecciones completadas'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Module 1: A1 Inicial */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab('a1-inicial')}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveTab('a1-inicial');
                  }}
                  className="cursor-pointer flex flex-col text-left p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-sky-500 transition-all shadow-sm group"
                >
                  <div className="w-11 h-11 bg-sky-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-sky-600 dark:text-sky-400 mb-1">
                    {courseLanguage === 'es' ? '01. CEFR A1 · Foundations' : '01. Nivel A1 · Fundamentos'}
                  </p>
                  <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-zinc-100">
                    {courseLanguage === 'es' ? 'A1 Beginner Spanish' : 'A1 Inicial'}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Greetings, numbers, pronouns, SER vs ESTAR, question words, family, and gender articles.'
                      : 'Saludos, números, pronombres, verbo To Be, preguntas W/H, familia y artículos.'}
                  </p>
                  <div className="flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-400 pt-3 border-t border-slate-100 dark:border-zinc-800 tabular-nums">
                    <span>
                      {currentA1Inicial.length} {courseLanguage === 'es' ? 'Lessons' : 'Lecciones'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Module 2: A1 Intermedio */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab('a1-intermedio')}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveTab('a1-intermedio');
                  }}
                  className="cursor-pointer flex flex-col text-left p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-purple-500 transition-all shadow-sm group"
                >
                  <div className="w-11 h-11 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <Layers className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-purple-600 dark:text-purple-400 mb-1">
                    {courseLanguage === 'es' ? '02. CEFR A1 · Consolidation' : '02. Nivel A1 · Consolidación'}
                  </p>
                  <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-zinc-100">
                    {courseLanguage === 'es' ? 'A1 Intermediate Spanish' : 'A1 Intermedio'}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Present tense -AR/-ER/-IR conjugations, GUSTAR, house vocabulary, PODER/QUERER, dining.'
                      : 'Presente simple, adverbios de frecuencia, gustos, la casa, CAN/CAN\'T, comida y compras.'}
                  </p>
                  <div className="flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 pt-3 border-t border-slate-100 dark:border-zinc-800 tabular-nums">
                    <span>
                      {currentA1Intermedio.length} {courseLanguage === 'es' ? 'Lessons' : 'Lecciones'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Module 3: CEFR A2 Plataforma (Strictly Gated Behind A1 Certificate) */}
                <div
                  className={`flex flex-col text-left p-6 rounded-3xl transition-all ${
                    isA1Certified
                      ? 'cursor-pointer bg-white dark:bg-zinc-900 border-2 border-indigo-500/80 dark:border-indigo-500 hover:border-indigo-600 shadow-md group'
                      : 'bg-slate-100/90 dark:bg-zinc-900/60 border border-slate-300 dark:border-zinc-800 opacity-85'
                  }`}
                  onClick={() => {
                    if (isA1Certified) {
                      setActiveTab('a2-plataforma');
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm text-white ${
                        isA1Certified ? 'bg-indigo-600' : 'bg-slate-400 dark:bg-zinc-700'
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    {!isA1Certified && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-bold border border-amber-300/60 dark:border-amber-800">
                        {courseLanguage === 'es' ? 'Requires A1 Certificate' : 'Requiere Certificado A1'}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs font-bold mb-1 ${
                      isA1Certified ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-zinc-500'
                    }`}
                  >
                    {courseLanguage === 'es' ? '03. CEFR A2 · Waystage' : '03. Nivel A2 · Plataforma'}
                  </p>
                  <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-zinc-100">
                    {courseLanguage === 'es' ? 'A2 Elementary Spanish' : 'A2 Plataforma Intermedia'}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Pretérito Indefinido vs. Imperfecto, Object Pronouns (Lo/La), Future, Pretérito Perfecto, Health & Por vs. Para.'
                      : 'Past Simple vs. Continuous, Comparativos, Futuro (Going to / Will), Present Perfect, Modales, Salud y First Conditional.'}
                  </p>
                  <div className="pt-3 border-t border-slate-200/80 dark:border-zinc-800 flex items-center justify-between gap-2">
                    {isA1Certified ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab('a2-plataforma')}
                        className="w-full flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums"
                      >
                        <span>
                          {a2CompletedCount}/{currentA2Lessons.length}{' '}
                          {courseLanguage === 'es' ? 'A2 Lessons' : 'Lecciones A2'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between gap-2">
                        <button
                          type="button"
                          disabled
                          className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500 text-xs font-bold cursor-not-allowed flex-1 text-left"
                        >
                          {courseLanguage === 'es' ? 'Locked until A1 Exam ≥80%' : 'Bloqueado hasta aprobar A1 (≥80%)'}
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setActiveTab('exam');
                          }}
                          className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                        >
                          {courseLanguage === 'es' ? 'Go to A1 Exam' : 'Ir a Examen A1'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Module 4: CEFR B1 Umbral (Strictly Gated Behind A2 Certificate) */}
                <div
                  className={`flex flex-col text-left p-6 rounded-3xl transition-all ${
                    isA2Certified
                      ? 'cursor-pointer bg-white dark:bg-zinc-900 border-2 border-teal-500/80 dark:border-teal-500 hover:border-teal-600 shadow-md group'
                      : 'bg-slate-100/90 dark:bg-zinc-900/60 border border-slate-300 dark:border-zinc-800 opacity-85'
                  }`}
                  onClick={() => {
                    if (isA2Certified) {
                      setActiveTab('b1-umbral');
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm text-white ${
                        isA2Certified ? 'bg-teal-600' : 'bg-slate-400 dark:bg-zinc-700'
                      }`}
                    >
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    {!isA2Certified && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-bold border border-amber-300/60 dark:border-amber-800">
                        {courseLanguage === 'es' ? 'Requires A2 Certificate' : 'Requiere Certificado A2'}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs font-bold mb-1 ${
                      isA2Certified ? 'text-teal-600 dark:text-teal-400' : 'text-slate-500 dark:text-zinc-500'
                    }`}
                  >
                    {courseLanguage === 'es' ? '04. CEFR B1 · Threshold' : '04. Nivel B1 · Umbral Independiente'}
                  </p>
                  <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-zinc-100">
                    {courseLanguage === 'es' ? 'B1 Independent Spanish' : 'B1 Umbral Independiente'}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Present Subjunctive (WEIRDO), Imperative Commands, Conditional, Double Pronouns (Se lo), Passive Voice & Discourse Connectors.'
                      : 'Present Perfect Continuous, Second Conditional, Voz Pasiva, Reported Speech, Relative Clauses, Past Perfect y Phrasal Verbs.'}
                  </p>
                  <div className="pt-3 border-t border-slate-200/80 dark:border-zinc-800 flex items-center justify-between gap-2">
                    {isA2Certified ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab('b1-umbral')}
                        className="w-full flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400 tabular-nums"
                      >
                        <span>
                          {b1CompletedCount}/{currentB1Lessons.length}{' '}
                          {courseLanguage === 'es' ? 'B1 Lessons' : 'Lecciones B1'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between gap-2">
                        <button
                          type="button"
                          disabled
                          className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500 text-xs font-bold cursor-not-allowed flex-1 text-left"
                        >
                          {courseLanguage === 'es' ? 'Locked until A2 Exam ≥80%' : 'Bloqueado hasta aprobar A2 (≥80%)'}
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setActiveTab('exam');
                          }}
                          className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                        >
                          {courseLanguage === 'es' ? 'Go to A2 Exam' : 'Ir a Examen A2'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Module 5: CEFR B2 Avanzado (Strictly Gated Behind B1 Certificate) */}
                <div
                  className={`flex flex-col text-left p-6 rounded-3xl transition-all ${
                    isB1Certified
                      ? 'cursor-pointer bg-white dark:bg-zinc-900 border-2 border-rose-500/80 dark:border-rose-500 hover:border-rose-600 shadow-md group'
                      : 'bg-slate-100/90 dark:bg-zinc-900/60 border border-slate-300 dark:border-zinc-800 opacity-85'
                  }`}
                  onClick={() => {
                    if (isB1Certified) {
                      setActiveTab('b2-avanzado');
                    }
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm text-white ${
                        isB1Certified ? 'bg-rose-600' : 'bg-slate-400 dark:bg-zinc-700'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    {!isB1Certified && (
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-bold border border-amber-300/60 dark:border-amber-800">
                        {courseLanguage === 'es' ? 'Requires B1 Certificate' : 'Requiere Certificado B1'}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs font-bold mb-1 ${
                      isB1Certified ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-zinc-500'
                    }`}
                  >
                    {courseLanguage === 'es' ? '05. CEFR B2 · Vantage Mastery' : '05. Nivel B2 · Avanzado y Perfeccionamiento'}
                  </p>
                  <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-zinc-100">
                    {courseLanguage === 'es' ? 'B2 Upper-Intermediate Spanish' : 'B2 Dominio y Perfeccionamiento'}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Imperfect Subjunctive (-ra/-se), Si Clauses, Pluperfect Subjunctive, Concessive Clauses (A pesar de que), Verbs of Change & Academic Register.'
                      : 'Third & Mixed Conditionals, Modales de Deducción en Pasado, Inversión Estilística, Causativos (Have something done), Futuro Perfecto e Inglés Ejecutivo.'}
                  </p>
                  <div className="pt-3 border-t border-slate-200/80 dark:border-zinc-800 flex items-center justify-between gap-2">
                    {isB1Certified ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab('b2-avanzado')}
                        className="w-full flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 tabular-nums"
                      >
                        <span>
                          {b2CompletedCount}/{currentB2Lessons.length}{' '}
                          {courseLanguage === 'es' ? 'B2 Lessons' : 'Lecciones B2'}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between gap-2">
                        <button
                          type="button"
                          disabled
                          className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-500 text-xs font-bold cursor-not-allowed flex-1 text-left"
                        >
                          {courseLanguage === 'es' ? 'Locked until B1 Exam ≥80%' : 'Bloqueado hasta aprobar B1 (≥80%)'}
                        </button>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            setActiveTab('exam');
                          }}
                          className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                        >
                          {courseLanguage === 'es' ? 'Go to B1 Exam' : 'Ir a Examen B1'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Module 6: Fluidez Conversacional */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab('fluency')}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveTab('fluency');
                  }}
                  className="cursor-pointer flex flex-col text-left p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 transition-all shadow-sm group"
                >
                  <div className="w-11 h-11 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    {courseLanguage === 'es' ? '06. Real-Life Dialogues' : '06. Práctica Situacional'}
                  </p>
                  <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-zinc-100">
                    {courseLanguage === 'es' ? 'Conversational Fluency' : 'Fluidez Conversacional'}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Real dialogues in cafes, restaurants, hotels, asking for directions, and meeting friends.'
                      : 'Diálogos en restaurantes, hoteles, pedir direcciones y situaciones cotidianas.'}
                  </p>
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 pt-3 border-t border-slate-100 dark:border-zinc-800 tabular-nums">
                    <span>
                      {currentFluency.length} {courseLanguage === 'es' ? 'Scenarios' : 'Escenarios'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Module 7: Flashcards / Vocabulario A1–B2 */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab('flashcards')}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveTab('flashcards');
                  }}
                  className="cursor-pointer flex flex-col text-left p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500 transition-all shadow-sm group"
                >
                  <div className="w-11 h-11 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <Zap className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                    {courseLanguage === 'es' ? '07. Spaced Repetition (SRS)' : '07. Repetición Espaciada (SRS)'}
                  </p>
                  <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-zinc-100">
                    {courseLanguage === 'es' ? 'A1–B2 Core Vocabulary' : 'Vocabulario Clave A1–B2'}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
                    {courseLanguage === 'es'
                      ? '3D flashcards, memory matching, and speech recognition for high-frequency A1, A2, B1, and B2 words.'
                      : 'Tarjetas 3D, asociación de memoria y pronunciación para las palabras más frecuentes desde A1 hasta B2.'}
                  </p>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 pt-3 border-t border-slate-100 dark:border-zinc-800 tabular-nums">
                    <span>
                      {currentFastTrackVocab.length} {courseLanguage === 'es' ? 'Interactive Cards' : 'Tarjetas Interactivas'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Module 8: Exámenes Oficiales A1, A2, B1 y B2 */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveTab('exam')}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveTab('exam');
                  }}
                  className="cursor-pointer flex flex-col text-left p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-rose-500 transition-all shadow-sm group md:col-span-2 lg:col-span-2"
                >
                  <div className="w-11 h-11 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-400 mb-1">
                    {courseLanguage === 'es' ? '08. Official CEFR Diplomas (A1 · A2 · B1 · B2)' : '08. Certificación Oficial MCER (A1 · A2 · B1 · B2)'}
                  </p>
                  <h3 className="text-xl font-black mb-2 text-slate-900 dark:text-zinc-100">
                    {courseLanguage === 'es'
                      ? 'Official CEFR Certification Center (A1 to B2)'
                      : 'Centro Oficial de Certificación por Niveles (A1 a B2)'}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Take the official proficiency exams for CEFR Levels A1, A2, B1, and B2. Passing each level with ≥80% unlocks the next level and issues your printable certificate.'
                      : 'Rinde los exámenes integrales para los niveles A1, A2, B1 y B2. Aprobar cada nivel con ≥80% desbloquea el siguiente módulo y emite tu certificado oficial imprimible.'}
                  </p>
                  <div className="flex items-center justify-between text-xs font-bold text-rose-600 dark:text-rose-400 pt-3 border-t border-slate-100 dark:border-zinc-800">
                    <span>
                      {isB2Certified
                        ? courseLanguage === 'es'
                          ? 'All 4 Levels Certified (A1–B2)'
                          : 'Los 4 Niveles Certificados (A1–B2)'
                        : isB1Certified
                          ? courseLanguage === 'es'
                            ? 'B1 Certified · B2 Exam Available'
                            : 'Certificado B1 · Examen B2 Disponible'
                          : isA2Certified
                            ? courseLanguage === 'es'
                              ? 'A2 Certified · B1 Exam Available'
                              : 'Certificado A2 · Examen B1 Disponible'
                            : isA1Certified
                              ? courseLanguage === 'es'
                                ? 'A1 Certified · A2 Exam Available'
                                : 'Certificado A1 · Examen A2 Disponible'
                              : isExamUnlocked
                                ? courseLanguage === 'es'
                                  ? 'A1 Exam Unlocked'
                                  : 'Examen A1 Desbloqueado'
                                : courseLanguage === 'es'
                                  ? 'View Certification Requirements'
                                  : 'Ver Requisitos de Certificación'}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Practice & AI Tools Secondary Section */}
            <div>
              <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-zinc-100 mb-4 px-1">
                {courseLanguage === 'es' ? 'Interactive Skill Boosters & AI Labs' : 'Entrenadores de Habilidad y Laboratorios IA'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('ai-tutor')}
                  className="text-left p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-500 transition-colors shadow-sm"
                >
                  <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mb-2.5" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100 mb-1">
                    {courseLanguage === 'es' ? 'Virtual Tutor Aria' : 'Tutoría Conversacional IA'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Practice open conversations with live grammar corrections.'
                      : 'Practica conversación libre con correcciones en tiempo real.'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('ai-tools')}
                  className="text-left p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-teal-500 transition-colors shadow-sm"
                >
                  <Wand2 className="w-5 h-5 text-teal-600 dark:text-teal-400 mb-2.5" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100 mb-1">
                    {courseLanguage === 'es' ? 'Sentence Analyzer' : 'Analizador de Frases IA'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Break down any sentence word-by-word and generate custom decks.'
                      : 'Desglosa cualquier oración palabra por palabra y crea tarjetas.'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setIsVerbTrainerOpen(true)}
                  className="text-left p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-purple-500 transition-colors shadow-sm"
                >
                  <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400 mb-2.5" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100 mb-1">
                    {courseLanguage === 'es' ? 'Key Verb Trainer' : 'Entrenador de Verbos'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {courseLanguage === 'es'
                      ? 'Master essential verb conjugations with audio drills.'
                      : 'Domina conjugaciones esenciales con audio y práctica.'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setIsDailyChallengeOpen(true)}
                  className="text-left p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-amber-500 transition-colors shadow-sm"
                >
                  <Compass className="w-5 h-5 text-amber-600 dark:text-amber-400 mb-2.5" />
                  <h3 className="font-bold text-sm text-slate-900 dark:text-zinc-100 mb-1">
                    {courseLanguage === 'es' ? 'Daily Challenge (+110 XP)' : 'Desafío Diario (+110 XP)'}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {courseLanguage === 'es'
                      ? '3 rapid active recall exercises to keep your streak alive.'
                      : '3 ejercicios rápidos de retención para mantener tu racha.'}
                  </p>
                </button>
              </div>
            </div>
          </div>
        );

      case 'a1-inicial':
        return (
          <div className="px-4 pt-6">
            <StepPath
              lessons={currentA1Inicial}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={courseLanguage === 'es' ? 'A1 Beginner: Spanish Foundations' : 'A1 Inicial: Fundamentos'}
              description={
                courseLanguage === 'es'
                  ? 'Learn greetings, pronouns, SER vs ESTAR, numbers, family, and essential phrases in Spanish.'
                  : 'Aprende saludos, números, verbo To Be, pronombres, familia y estructuras de inicio.'
              }
              levelBadge={courseLanguage === 'es' ? 'Module 1 · CEFR A1 Foundations' : 'Módulo 1 · Fundamentos A1'}
              themeGradient="from-sky-600 via-blue-600 to-indigo-700"
              accentColor="sky"
            />
          </div>
        );

      case 'a1-intermedio':
        return (
          <div className="px-4 pt-6">
            <StepPath
              lessons={currentA1Intermedio}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={courseLanguage === 'es' ? 'A1 Intermediate: Spanish Consolidation' : 'A1 Intermedio: Consolidación'}
              description={
                courseLanguage === 'es'
                  ? 'Master present tense, verb GUSTAR, house vocabulary, PODER/QUERER, and shopping in Spanish.'
                  : 'Domina presente simple, adverbios, gustos, la casa, CAN/CAN\'T, comida y compras.'
              }
              levelBadge={courseLanguage === 'es' ? 'Module 2 · CEFR A1 Consolidation' : 'Módulo 2 · Consolidación A1'}
              themeGradient="from-purple-600 via-violet-600 to-indigo-700"
              accentColor="purple"
            />
          </div>
        );

      case 'a2-plataforma':
        if (!isA1Certified) {
          const a1ProgressPercent =
            a1RequiredIds.length > 0 ? Math.round((a1CompletedCount / a1RequiredIds.length) * 100) : 0;
          return (
            <div className="max-w-3xl mx-auto px-4 pt-10 pb-24">
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-lg text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mx-auto mb-5 shadow-md">
                  <Award className="w-8 h-8" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                  {courseLanguage === 'es'
                    ? 'Mandatory Academic Prerequisite · CEFR A2'
                    : 'Requisito Académico Obligatorio · Nivel A2'}
                </p>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-zinc-100 mb-3">
                  {courseLanguage === 'es'
                    ? 'Complete Your CEFR A1 Certificate First'
                    : 'Debes Obtener Primero el Certificado Nivel A1'}
                </h1>
                <p className="text-sm md:text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
                  {courseLanguage === 'es'
                    ? 'To unlock the CEFR A2 module (Past Tenses, Future Plans, Object Pronouns, and Por vs. Para), you must first pass the official CEFR A1 Certification Exam with a score of 80% or higher.'
                    : 'Para desbloquear el Módulo Nivel A2 (Pasado, Experiencias, Futuro y Condicionales), es requisito aprobar primero el Examen Oficial de Certificación A1 con 80% o más.'}
                </p>

                <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 mb-8 text-left max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-zinc-200 mb-2 tabular-nums">
                    <span>
                      {courseLanguage === 'es' ? 'Your CEFR A1 Progress' : 'Tu Progreso Actual en Nivel A1'}
                    </span>
                    <span>
                      {a1CompletedCount} / {a1RequiredIds.length}{' '}
                      {courseLanguage === 'es' ? 'lessons' : 'lecciones'} ({a1ProgressPercent}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${a1ProgressPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    {progress.examScore !== undefined
                      ? courseLanguage === 'es'
                        ? `Last A1 Exam score: ${progress.examScore}% (80% required to pass).`
                        : `Último puntaje en el Examen A1: ${progress.examScore}% (se requiere 80% para aprobar).`
                      : courseLanguage === 'es'
                        ? 'You have not passed the CEFR A1 Certification Exam yet.'
                        : 'Aún no has aprobado el Examen de Certificación Nivel A1.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('exam')}
                    className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>
                      {courseLanguage === 'es'
                        ? 'Go Directly to A1 Certification Exam'
                        : 'Ir al Examen de Certificación A1'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('a1-inicial')}
                    className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-sm transition-colors"
                  >
                    {courseLanguage === 'es' ? 'Review A1 Lessons' : 'Repasar Lecciones A1'}
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="px-4 pt-6">
            <StepPath
              lessons={currentA2Lessons}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={
                courseLanguage === 'es'
                  ? 'CEFR A2: Past Tenses, Future Plans & Real Life'
                  : 'Nivel A2: Pasado, Experiencias, Futuro y Vida Real'
              }
              description={
                courseLanguage === 'es'
                  ? 'Conquer Pretérito Indefinido vs. Imperfecto, Direct Object Pronouns, Future Plans, Health, and Por vs. Para.'
                  : 'Domina Past Simple vs. Continuous, Comparativos, Going to vs. Will, Present Perfect, Modales, Salud y First Conditional.'
              }
              levelBadge={courseLanguage === 'es' ? 'Module 3 · Official CEFR A2 Curriculum' : 'Módulo 3 · Currículo Oficial Nivel A2'}
              themeGradient="from-indigo-600 via-blue-700 to-violet-700"
              accentColor="indigo"
            />
          </div>
        );

      case 'b1-umbral':
        if (!isA2Certified) {
          const a2ProgressPercent =
            a2RequiredIds.length > 0 ? Math.round((a2CompletedCount / a2RequiredIds.length) * 100) : 0;
          return (
            <div className="max-w-3xl mx-auto px-4 pt-10 pb-24">
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-lg text-center">
                <div className="w-16 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center mx-auto mb-5 shadow-md">
                  <Award className="w-8 h-8" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2">
                  {courseLanguage === 'es'
                    ? 'Mandatory Academic Prerequisite · CEFR B1'
                    : 'Requisito Académico Obligatorio · Nivel B1'}
                </p>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-zinc-100 mb-3">
                  {courseLanguage === 'es'
                    ? 'Complete Your CEFR A2 Certificate First'
                    : 'Debes Obtener Primero el Certificado Nivel A2'}
                </h1>
                <p className="text-sm md:text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
                  {courseLanguage === 'es'
                    ? 'To unlock the CEFR B1 Independent Threshold module (Subjunctive Mood, Conditional, Double Pronouns, and Discourse Argumentation), you must pass the CEFR A2 Certification Exam with 80% or higher.'
                    : 'Para desbloquear el Módulo Nivel B1 Umbral Independiente (Second Conditional, Voz Pasiva, Reported Speech y Phrasal Verbs), debes aprobar primero el Examen Oficial de Certificación A2 con 80% o más.'}
                </p>

                <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 mb-8 text-left max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-zinc-200 mb-2 tabular-nums">
                    <span>
                      {courseLanguage === 'es' ? 'Your CEFR A2 Progress' : 'Tu Progreso Actual en Nivel A2'}
                    </span>
                    <span>
                      {a2CompletedCount} / {a2RequiredIds.length}{' '}
                      {courseLanguage === 'es' ? 'lessons' : 'lecciones'} ({a2ProgressPercent}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-teal-600 rounded-full transition-all duration-500"
                      style={{ width: `${a2ProgressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('exam')}
                    className="px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>
                      {courseLanguage === 'es'
                        ? 'Go Directly to A2 Certification Exam'
                        : 'Ir al Examen de Certificación A2'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {isA1Certified && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('a2-plataforma')}
                      className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-sm transition-colors"
                    >
                      {courseLanguage === 'es' ? 'Review A2 Lessons' : 'Repasar Lecciones A2'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="px-4 pt-6">
            <StepPath
              lessons={currentB1Lessons}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={
                courseLanguage === 'es'
                  ? 'CEFR B1: Subjunctive, Hypotheticals & Independent Fluency'
                  : 'Nivel B1: Hipótesis, Voz Pasiva, Estilo Indirecto y Autonomía'
              }
              description={
                courseLanguage === 'es'
                  ? 'Master the Present Subjunctive (WEIRDO), Imperative Commands, Conditional Mood, Double Object Pronouns, and Discourse Argumentation.'
                  : 'Domina Present Perfect Continuous, Second Conditional, Voz Pasiva, Reported Speech, Relative Clauses, Past Perfect y Phrasal Verbs.'
              }
              levelBadge={courseLanguage === 'es' ? 'Module 4 · Official CEFR B1 Curriculum' : 'Módulo 4 · Currículo Oficial Nivel B1'}
              themeGradient="from-teal-600 via-emerald-600 to-cyan-700"
              accentColor="emerald"
            />
          </div>
        );

      case 'b2-avanzado':
        if (!isB1Certified) {
          const b1ProgressPercent =
            b1RequiredIds.length > 0 ? Math.round((b1CompletedCount / b1RequiredIds.length) * 100) : 0;
          return (
            <div className="max-w-3xl mx-auto px-4 pt-10 pb-24">
              <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-8 md:p-10 shadow-lg text-center">
                <div className="w-16 h-16 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto mb-5 shadow-md">
                  <Award className="w-8 h-8" />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-2">
                  {courseLanguage === 'es'
                    ? 'Mandatory Academic Prerequisite · CEFR B2'
                    : 'Requisito Académico Obligatorio · Nivel B2'}
                </p>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-zinc-100 mb-3">
                  {courseLanguage === 'es'
                    ? 'Complete Your CEFR B1 Certificate First'
                    : 'Debes Obtener Primero el Certificado Nivel B1'}
                </h1>
                <p className="text-sm md:text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 leading-relaxed">
                  {courseLanguage === 'es'
                    ? 'To unlock the CEFR B2 Vantage Mastery module (Imperfect Subjunctive, Pluperfect Subjunctive, Concessive Debate Structures, and Executive Register), you must pass the CEFR B1 Certification Exam with 80% or higher.'
                    : 'Para desbloquear el Módulo Nivel B2 Avanzado y Perfeccionamiento (Third & Mixed Conditionals, Modales en Pasado, Inversión Estilística e Inglés Ejecutivo), debes aprobar primero el Examen Oficial de Certificación B1 con 80% o más.'}
                </p>

                <div className="bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 mb-8 text-left max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-zinc-200 mb-2 tabular-nums">
                    <span>
                      {courseLanguage === 'es' ? 'Your CEFR B1 Progress' : 'Tu Progreso Actual en Nivel B1'}
                    </span>
                    <span>
                      {b1CompletedCount} / {b1RequiredIds.length}{' '}
                      {courseLanguage === 'es' ? 'lessons' : 'lecciones'} ({b1ProgressPercent}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full bg-rose-600 rounded-full transition-all duration-500"
                      style={{ width: `${b1ProgressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('exam')}
                    className="px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md flex items-center gap-2 transition-colors"
                  >
                    <Award className="w-4 h-4" />
                    <span>
                      {courseLanguage === 'es'
                        ? 'Go Directly to B1 Certification Exam'
                        : 'Ir al Examen de Certificación B1'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {isA2Certified && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('b1-umbral')}
                      className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-sm transition-colors"
                    >
                      {courseLanguage === 'es' ? 'Review B1 Lessons' : 'Repasar Lecciones B1'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="px-4 pt-6">
            <StepPath
              lessons={currentB2Lessons}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={
                courseLanguage === 'es'
                  ? 'CEFR B2: Advanced Subjunctive, Nuance & Executive Spanish'
                  : 'Nivel B2: Perfeccionamiento, Matices Académicos e Inglés Ejecutivo'
              }
              description={
                courseLanguage === 'es'
                  ? 'Master Imperfect & Pluperfect Subjunctive, Hypothetical Si Clauses, Concessive Connectors, Verbs of Change, and Executive Register.'
                  : 'Domina Third & Mixed Conditionals, Modales de Deducción en Pasado, Inversión Estilística, Causativos, Futuro Perfecto y Argumentación C1-ready.'
              }
              levelBadge={courseLanguage === 'es' ? 'Module 5 · Official CEFR B2 Vantage' : 'Módulo 5 · Currículo Oficial Nivel B2'}
              themeGradient="from-rose-600 via-pink-600 to-indigo-700"
              accentColor="indigo"
            />
          </div>
        );

      case 'fluency':
        return (
          <div className="px-4 pt-6">
            <StepPath
              lessons={currentFluency}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={courseLanguage === 'es' ? 'Conversational Fluency Scenarios' : 'Fluidez: Práctica Conversacional'}
              description={
                courseLanguage === 'es'
                  ? 'Real dialogue scenarios in cafes, hotels, asking directions, and making friends in Spanish-speaking countries.'
                  : 'Escenarios de diálogo real en cafeterías, hoteles, calles y situaciones cotidianas.'
              }
              levelBadge={courseLanguage === 'es' ? 'Module 6 · Real-Life Practice' : 'Módulo 6 · Conversación Real'}
              themeGradient="from-emerald-600 via-teal-600 to-cyan-700"
              accentColor="emerald"
            />
          </div>
        );

      case 'flashcards':
        return (
          <div className="px-4 pt-6">
            <FastVocabView
              words={currentFastTrackVocab}
              progress={progress}
              onWordMastered={markWordMastered}
              onSRSUpdate={updateWordSRS}
              onAddXP={addXP}
              courseLanguage={courseLanguage}
            />
          </div>
        );

      case 'exam':
        return (
          <div className="px-4 pt-6">
            <FinalExamView
              questions={currentFinalExamQuestions}
              a2Questions={currentA2ExamQuestions}
              b1Questions={currentB1ExamQuestions}
              b2Questions={currentB2ExamQuestions}
              requiredLessonIds={a1RequiredIds}
              a2RequiredLessonIds={a2RequiredIds}
              b1RequiredLessonIds={b1RequiredIds}
              b2RequiredLessonIds={b2RequiredIds}
              progress={progress}
              onExamComplete={recordExamResult}
              onNavigate={setActiveTab}
              courseLanguage={courseLanguage}
              currentUser={currentUser}
            />
          </div>
        );

      case 'ai-tutor':
        return (
          <div className="px-4 pt-6">
            <AiTutorView onEarnXp={addXP} courseLanguage={courseLanguage} />
          </div>
        );

      case 'ai-tools':
        return (
          <div className="px-4 pt-6">
            <AiToolsView courseLanguage={courseLanguage} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans selection:bg-indigo-500 selection:text-white transition-colors">
      <main className="pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + courseLanguage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
        initialMode={authModalMode}
      />

      {/* Notebook Modal */}
      <NotebookModal
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        progress={progress}
        courseLanguage={courseLanguage}
      />

      {/* Daily Challenge Modal */}
      <DailyChallengeModal
        isOpen={isDailyChallengeOpen}
        onClose={() => setIsDailyChallengeOpen(false)}
        progress={progress}
        onCompleteChallenge={earnedXp => addXP(earnedXp)}
        courseLanguage={courseLanguage}
      />

      {/* Verb Trainer Modal */}
      <VerbTrainerModal
        isOpen={isVerbTrainerOpen}
        onClose={() => setIsVerbTrainerOpen(false)}
        onAddXP={earnedXp => addXP(earnedXp)}
        courseLanguage={courseLanguage}
      />

      {/* Quick Practice Modal */}
      <QuickPracticeModal
        isOpen={isQuickPracticeOpen}
        onClose={() => setIsQuickPracticeOpen(false)}
        onAddXP={earnedXp => addXP(earnedXp)}
        courseLanguage={courseLanguage}
      />

      {/* Bottom Floating Navigation Bar */}
      <nav className="fixed bottom-3 left-3 right-3 max-w-4xl mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-slate-200 dark:border-zinc-800 rounded-2xl p-1.5 shadow-lg z-40">
        <div className="flex justify-around items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'home'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-500 hover:text-indigo-600 dark:hover:text-zinc-200'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="text-[10px] font-bold">{courseLanguage === 'es' ? 'Home' : 'Inicio'}</span>
          </button>

          <button
            onClick={() => setActiveTab('a1-inicial')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'a1-inicial'
                ? 'bg-sky-600 text-white font-bold'
                : 'text-slate-500 hover:text-sky-600 dark:hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] font-bold">A1.1</span>
          </button>

          <button
            onClick={() => setActiveTab('a1-intermedio')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'a1-intermedio'
                ? 'bg-purple-600 text-white font-bold'
                : 'text-slate-500 hover:text-purple-600 dark:hover:text-zinc-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[10px] font-bold">A1.2</span>
          </button>

          <button
            type="button"
            disabled={!isA1Certified}
            onClick={() => {
              if (!isA1Certified) return;
              setActiveTab('a2-plataforma');
            }}
            title={
              !isA1Certified
                ? courseLanguage === 'es'
                  ? 'Requires CEFR A1 Certificate (≥80%)'
                  : 'Bloqueado: Requiere Certificado A1 (≥80%)'
                : undefined
            }
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              !isA1Certified
                ? 'text-slate-300 dark:text-zinc-600 cursor-not-allowed opacity-60'
                : activeTab === 'a2-plataforma'
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-zinc-800 font-bold'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-[10px] font-bold">{courseLanguage === 'es' ? 'Level A2' : 'Nivel A2'}</span>
          </button>

          <button
            type="button"
            disabled={!isA2Certified}
            onClick={() => {
              if (!isA2Certified) return;
              setActiveTab('b1-umbral');
            }}
            title={
              !isA2Certified
                ? courseLanguage === 'es'
                  ? 'Requires CEFR A2 Certificate (≥80%)'
                  : 'Bloqueado: Requiere Certificado A2 (≥80%)'
                : undefined
            }
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              !isA2Certified
                ? 'text-slate-300 dark:text-zinc-600 cursor-not-allowed opacity-60'
                : activeTab === 'b1-umbral'
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-zinc-800 font-bold'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-[10px] font-bold">{courseLanguage === 'es' ? 'Level B1' : 'Nivel B1'}</span>
          </button>

          <button
            type="button"
            disabled={!isB1Certified}
            onClick={() => {
              if (!isB1Certified) return;
              setActiveTab('b2-avanzado');
            }}
            title={
              !isB1Certified
                ? courseLanguage === 'es'
                  ? 'Requires CEFR B1 Certificate (≥80%)'
                  : 'Bloqueado: Requiere Certificado B1 (≥80%)'
                : undefined
            }
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              !isB1Certified
                ? 'text-slate-300 dark:text-zinc-600 cursor-not-allowed opacity-60'
                : activeTab === 'b2-avanzado'
                  ? 'bg-rose-600 text-white font-bold'
                  : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-zinc-800 font-bold'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="text-[10px] font-bold">{courseLanguage === 'es' ? 'Level B2' : 'Nivel B2'}</span>
          </button>

          <button
            onClick={() => setActiveTab('fluency')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'fluency'
                ? 'bg-emerald-600 text-white font-bold'
                : 'text-slate-500 hover:text-emerald-600 dark:hover:text-zinc-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[10px] font-bold">{courseLanguage === 'es' ? 'Fluency' : 'Fluidez'}</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'flashcards'
                ? 'bg-amber-500 text-white font-bold'
                : 'text-slate-500 hover:text-amber-600 dark:hover:text-zinc-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-bold">{courseLanguage === 'es' ? 'Vocab' : 'Vocab'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-tutor')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'ai-tutor'
                ? 'bg-indigo-600 text-white font-bold'
                : 'text-slate-500 hover:text-indigo-600 dark:hover:text-zinc-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="text-[10px] font-bold">{courseLanguage === 'es' ? 'AI Tutor' : 'Tutor IA'}</span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'exam'
                ? 'bg-rose-600 text-white font-bold'
                : 'text-slate-500 hover:text-rose-600 dark:hover:text-zinc-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="text-[10px] font-bold">{courseLanguage === 'es' ? 'Exams' : 'Examen'}</span>
          </button>

          <button
            onClick={handleOpenTeacherPortal}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'teacher-dashboard'
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'text-amber-600 dark:text-amber-400 hover:text-amber-700'
            }`}
            title="Panel de Profesor"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[10px] font-bold">{courseLanguage === 'es' ? 'Teacher' : 'Docente'}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
