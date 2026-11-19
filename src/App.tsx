import React, { useState } from 'react';
import {
  BookOpen,
  Zap,
  Home as HomeIcon,
  Award,
  CheckCircle,
  ArrowRight,
  Bot,
  Wand2,
  ShieldCheck,
  LogOut,
  Mic,
  MicOff,
  RefreshCw,
  Sun,
  Moon,
  Play,
  Volume2,
  VolumeX,
  Sparkles,
  Lock
} from 'lucide-react';
import {
  a1InicialLessons,
  a1IntermedioLessons,
  fluencyLessons,
  fastTrackVocab,
  finalExamQuestions
} from './data';
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
import { HeroInteractiveCard, OnePageBentoExplorer } from './components/OnePagePlayground';
import { LessonPlayer } from './components/LessonPlayer';
import { isSoundEnabled, setSoundEnabled, playTactileSound } from './utils/soundEffects';
import { SectionTab, UserProfile, LessonStep } from './types';
import { getStoredCurrentUser, setStoredCurrentUser } from './lib/supabase';
import { isMasterTeacherEmail, MASTER_TEACHER_EMAIL } from './lib/security';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<SectionTab>('home');
  const [priorityViewFilter, setPriorityViewFilter] = useState<
    'all' | 'priority-1-lessons' | 'priority-2-practice' | 'priority-3-mastery'
  >('all');

  const [courseLanguage, setCourseLanguage] = useState<'en' | 'es'>(() => {
    return (localStorage.getItem('lingostep_active_course') as 'en' | 'es') || 'en';
  });

  // When courseLanguage === 'es', the user is an English speaker learning Spanish (UI in English, target in Spanish).
  // When courseLanguage === 'en', the user is a Spanish speaker learning English (UI in Spanish, target in English).
  const isSpanishCourse = courseLanguage === 'es';

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() =>
    getStoredCurrentUser()
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode] = useState<'signin' | 'signup' | 'teacher'>('signin');

  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isDailyChallengeOpen, setIsDailyChallengeOpen] = useState(false);
  const [isVerbTrainerOpen, setIsVerbTrainerOpen] = useState(false);
  const [isQuickPracticeOpen, setIsQuickPracticeOpen] = useState(false);
  const [directLessonModal, setDirectLessonModal] = useState<LessonStep | null>(null);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('lingostep_theme') === 'dark';
    } catch {
      return false;
    }
  });

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      localStorage.setItem('lingostep_theme', isDarkMode ? 'dark' : 'light');
    } catch {}
  }, [isDarkMode]);

  const handleToggleLanguage = (lang: 'en' | 'es') => {
    setCourseLanguage(lang);
    localStorage.setItem('lingostep_active_course', lang);
  };

  const [silentMicMode, setSilentMicMode] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('lingostep_silent_mic_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [sfxActive, setSfxActive] = useState<boolean>(() => isSoundEnabled());

  const handleToggleSfx = () => {
    const next = !sfxActive;
    setSfxActive(next);
    setSoundEnabled(next);
    if (next) playTactileSound('pop');
  };

  const handleToggleSilentMicMode = () => {
    const next = !silentMicMode;
    setSilentMicMode(next);
    playTactileSound('pop');
    try {
      if (next) {
        sessionStorage.setItem('lingostep_silent_mic_mode', 'true');
      } else {
        sessionStorage.removeItem('lingostep_silent_mic_mode');
      }
    } catch {}
  };

  const {
    progress,
    isLoaded,
    isSyncing,
    syncStatus,
    lastSyncedAt,
    addXP,
    markLessonComplete,
    markWordMastered,
    updateWordSRS,
    recordExamResult,
    forceSyncToCloud
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
    if (user.role === 'teacher' && isMasterTeacherEmail(user.email)) {
      setActiveTab('teacher-dashboard');
    } else {
      setActiveTab('home');
    }
  };

  const handleLogout = () => {
    setStoredCurrentUser(null);
    setCurrentUser(null);
    setIsAuthModalOpen(false);
    setActiveTab('home');
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] dark:bg-zinc-950 text-indigo-600 font-black">
        <p className="text-lg">
          {isSpanishCourse
            ? 'Loading CEFR A1 – B2 Spanish Curriculum...'
            : 'Cargando ruta curricular MCER A1 – B2...'}
        </p>
      </div>
    );
  }

  // STRICT AUTH GATE: User must sign up or log in as a student or authorized teacher
  if (!currentUser) {
    return <AuthGateView onLoginSuccess={handleLoginSuccess} />;
  }

  // Enforce that only spacio.n.blnco@gmail.com or teachers explicitly authorized by him have teacher access
  const isSoleTeacher =
    currentUser.role === 'teacher' &&
    (isMasterTeacherEmail(currentUser.email) ||
      currentUser.authorizedTeacherByMaster === true);

  const currentA1Inicial = isSpanishCourse ? spanishA1InicialLessons : a1InicialLessons;
  const currentA1Intermedio = isSpanishCourse
    ? spanishA1IntermedioLessons
    : a1IntermedioLessons;
  const currentA2Lessons = isSpanishCourse ? spanishA2Lessons : a2EnglishLessons;
  const currentB1Lessons = isSpanishCourse ? spanishB1Lessons : b1EnglishLessons;
  const currentB2Lessons = isSpanishCourse ? spanishB2Lessons : b2EnglishLessons;
  const currentFluency = isSpanishCourse ? spanishFluencyLessons : fluencyLessons;

  const currentFastTrackVocab = isSpanishCourse
    ? [...spanishFastTrackVocab, ...spanishA2Vocab, ...spanishB1Vocab, ...spanishB2Vocab]
    : [...fastTrackVocab, ...a2EnglishVocab, ...b1EnglishVocab, ...b2EnglishVocab];

  const currentFinalExamQuestions = isSpanishCourse
    ? spanishFinalExamQuestions
    : finalExamQuestions;
  const currentA2ExamQuestions = isSpanishCourse
    ? spanishA2FinalExamQuestions
    : a2FinalExamQuestions;
  const currentB1ExamQuestions = isSpanishCourse
    ? spanishB1FinalExamQuestions
    : b1FinalExamQuestions;
  const currentB2ExamQuestions = isSpanishCourse
    ? spanishB2FinalExamQuestions
    : b2FinalExamQuestions;

  const a1Lessons = [...currentA1Inicial, ...currentA1Intermedio, ...currentFluency];
  const allLessons = [
    ...a1Lessons,
    ...currentA2Lessons,
    ...currentB1Lessons,
    ...currentB2Lessons
  ];

  const a1RequiredIds = a1Lessons.map(l => l.id);
  const a2RequiredIds = currentA2Lessons.map(l => l.id);
  const b1RequiredIds = currentB1Lessons.map(l => l.id);
  const b2RequiredIds = currentB2Lessons.map(l => l.id);

  const a1InicialCompletedCount = currentA1Inicial.filter(l =>
    progress.completedLessons.includes(l.id)
  ).length;
  const a1IntermedioCompletedCount = currentA1Intermedio.filter(l =>
    progress.completedLessons.includes(l.id)
  ).length;
  const fluencyCompletedCount = currentFluency.filter(l =>
    progress.completedLessons.includes(l.id)
  ).length;

  const a1CompletedCount = a1RequiredIds.filter(id =>
    progress.completedLessons.includes(id)
  ).length;
  const a2CompletedCount = a2RequiredIds.filter(id =>
    progress.completedLessons.includes(id)
  ).length;
  const b1CompletedCount = b1RequiredIds.filter(id =>
    progress.completedLessons.includes(id)
  ).length;
  const b2CompletedCount = b2RequiredIds.filter(id =>
    progress.completedLessons.includes(id)
  ).length;

  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = progress.completedLessons.length;

  const badges = progress.unlockedBadges || [];
  const isA1Certified = Boolean(progress.examPassed || badges.includes('b_cert_a1'));
  const isA2Certified = Boolean(badges.includes('b_cert_a2'));
  const isB1Certified = Boolean(badges.includes('b_cert_b1'));
  const isB2Certified = Boolean(badges.includes('b_cert_b2'));

  const userXP = progress.xp || 0;
  let userRank = isSpanishCourse ? 'Level A1 Foundations' : 'Nivel A1 Inicial';
  if (isB2Certified) {
    userRank = isSpanishCourse
      ? 'B2 Certified · Advanced Mastery'
      : 'Certificado B2 · Dominio Avanzado';
  } else if (isB1Certified) {
    userRank = isSpanishCourse
      ? 'B1 Certified · Level B2 Active'
      : 'Certificado B1 · Nivel B2 Activo';
  } else if (isA2Certified) {
    userRank = isSpanishCourse
      ? 'A2 Certified · Level B1 Active'
      : 'Certificado A2 · Nivel B1 Activo';
  } else if (isA1Certified) {
    userRank = isSpanishCourse
      ? 'A1 Certified · Level A2 Active'
      : 'Certificado A1 · Nivel A2 Activo';
  } else if (userXP >= 250) {
    userRank = isSpanishCourse ? 'A1 Consolidated' : 'A1 Consolidado';
  }

  // Compute the student's current active curriculum module and next sequential lesson
  const unlockedPool = [
    ...a1Lessons,
    ...(isA1Certified ? currentA2Lessons : []),
    ...(isA2Certified ? currentB1Lessons : []),
    ...(isB1Certified ? currentB2Lessons : [])
  ];
  const nextUpLesson =
    unlockedPool.find(l => !progress.completedLessons.includes(l.id)) || a1Lessons[0];

  // Determine which curriculum tab corresponds to the student's current sequential step
  let currentRecommendedModuleTab: SectionTab = 'a1-inicial';
  let currentRecommendedStageLabel = isSpanishCourse
    ? 'Stage 1 · A1 Foundations'
    : 'Etapa 1 · A1 Inicial (Fundamentos)';

  if (a1InicialCompletedCount < currentA1Inicial.length) {
    currentRecommendedModuleTab = 'a1-inicial';
    currentRecommendedStageLabel = isSpanishCourse
      ? 'Stage 1 · A1 Foundations'
      : 'Etapa 1 · A1 Inicial (Fundamentos)';
  } else if (a1IntermedioCompletedCount < currentA1Intermedio.length) {
    currentRecommendedModuleTab = 'a1-intermedio';
    currentRecommendedStageLabel = isSpanishCourse
      ? 'Stage 2 · A1 Consolidation'
      : 'Etapa 2 · A1 Intermedio (Consolidación)';
  } else if (fluencyCompletedCount < currentFluency.length) {
    currentRecommendedModuleTab = 'fluency';
    currentRecommendedStageLabel = isSpanishCourse
      ? 'Stage 3 · Real-World Fluency Dialogues'
      : 'Etapa 3 · Diálogos de Fluidez Real';
  } else if (!isA1Certified) {
    currentRecommendedModuleTab = 'exam';
    currentRecommendedStageLabel = isSpanishCourse
      ? 'Stage 4 · Official A1 Exam (Unlocks A2)'
      : 'Etapa 4 · Examen Oficial A1 (Desbloquea A2)';
  } else if (a2CompletedCount < currentA2Lessons.length || !isA2Certified) {
    currentRecommendedModuleTab = 'a2-plataforma';
    currentRecommendedStageLabel = isSpanishCourse
      ? 'Stage 5 · Level A2 Intermediate'
      : 'Etapa 5 · Nivel A2 Plataforma';
  } else if (b1CompletedCount < currentB1Lessons.length || !isB1Certified) {
    currentRecommendedModuleTab = 'b1-umbral';
    currentRecommendedStageLabel = isSpanishCourse
      ? 'Stage 6 · Level B1 Independent'
      : 'Etapa 6 · Nivel B1 Umbral Independiente';
  } else {
    currentRecommendedModuleTab = 'b2-avanzado';
    currentRecommendedStageLabel = isSpanishCourse
      ? 'Stage 7 · Level B2 Advanced Mastery'
      : 'Etapa 7 · Nivel B2 Dominio Avanzado';
  }

  // Reusable Sub-Header for Lesson Path views so the student can navigate steps in strict order
  const renderLessonPathSwitcher = () => (
    <div className="max-w-5xl mx-auto mb-4 px-2">
      <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-2xl p-3 shadow-[4px_4px_0px_0px_#0f172a] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-black text-slate-800 dark:text-zinc-200">
          <span className="px-2.5 py-1 rounded-lg bg-yellow-300 text-slate-950 border border-slate-900">
            {isSpanishCourse ? 'PRIORITY #1' : 'PRIORIDAD #1'}
          </span>
          <span>
            {isSpanishCourse ? 'Lesson Path Order:' : 'Orden del Camino de Lecciones:'}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('a1-inicial')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
              activeTab === 'a1-inicial'
                ? 'bg-sky-400 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-transparent hover:border-slate-900'
            }`}
          >
            {isSpanishCourse ? '1st A1 Foundations' : '1º A1 Inicial'} ({a1InicialCompletedCount}/
            {currentA1Inicial.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('a1-intermedio')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
              activeTab === 'a1-intermedio'
                ? 'bg-purple-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-transparent hover:border-slate-900'
            }`}
          >
            {isSpanishCourse ? '2nd A1 Consolidation' : '2º A1 Intermedio'} (
            {a1IntermedioCompletedCount}/{currentA1Intermedio.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fluency')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all ${
              activeTab === 'fluency'
                ? 'bg-emerald-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-transparent hover:border-slate-900'
            }`}
          >
            {isSpanishCourse ? '3rd Fluency' : '3º Fluidez'} ({fluencyCompletedCount}/
            {currentFluency.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('a2-plataforma')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all flex items-center gap-1 ${
              activeTab === 'a2-plataforma'
                ? 'bg-indigo-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-transparent hover:border-slate-900'
            }`}
          >
            {!isA1Certified && <Lock className="w-3 h-3" />}
            <span>
              {isSpanishCourse ? '4th Level A2' : '4º Nivel A2'} ({a2CompletedCount}/
              {currentA2Lessons.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('b1-umbral')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all flex items-center gap-1 ${
              activeTab === 'b1-umbral'
                ? 'bg-teal-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-transparent hover:border-slate-900'
            }`}
          >
            {!isA2Certified && <Lock className="w-3 h-3" />}
            <span>
              {isSpanishCourse ? '5th Level B1' : '5º Nivel B1'} ({b1CompletedCount}/
              {currentB1Lessons.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('b2-avanzado')}
            className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 transition-all flex items-center gap-1 ${
              activeTab === 'b2-avanzado'
                ? 'bg-rose-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-transparent hover:border-slate-900'
            }`}
          >
            {!isB1Certified && <Lock className="w-3 h-3" />}
            <span>
              {isSpanishCourse ? '6th Level B2' : '6º Nivel B2'} ({b2CompletedCount}/
              {currentB2Lessons.length})
            </span>
          </button>
        </div>
      </div>
    </div>
  );

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

      case 'playground':
        // SEPARATED VIEW FOR THE NODECK INTERACTIVE CARD TABLE & GAMES (PRIORITY #2)
        return (
          <div className="max-w-6xl mx-auto pt-6 pb-28 px-4 sm:px-6 space-y-8">
            {/* Pedagogical Context Banner */}
            <div className="bg-emerald-300 dark:bg-zinc-900 text-slate-950 dark:text-white border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 shadow-[6px_6px_0px_0px_#0f172a] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white text-slate-950 border-2 border-slate-900 text-xs font-black">
                  <span>
                    {isSpanishCourse
                      ? 'STAGE 2 · «NODECK» INTERACTIVE PRACTICE ROOM'
                      : 'ETAPA 2 · LABORATORIO DE REFUERZO PRÁCTICO «NODECK»'}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black font-display">
                  {isSpanishCourse
                    ? 'Interactive Spanish Card Table, Neon Highlighter & Memory Games'
                    : 'Mesa de Cartas Interactivas, Subrayador y Juegos de Memoria'}
                </h1>
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-zinc-300 max-w-2xl">
                  {isSpanishCourse
                    ? 'Use this practice room after advancing on your Lesson Path. Highlight Spanish words with the neon marker to hear individual pronunciation, build sentences with magnets, and train your memory.'
                    : 'Usa esta sala después de avanzar en tu Camino de Lecciones. Subraya palabras con marcador fluorescente para escuchar su pronunciación individual, arma frases con imanes y entrena tu agilidad mental.'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  playTactileSound('pop');
                  setActiveTab(currentRecommendedModuleTab);
                }}
                className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] whitespace-nowrap shrink-0 flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {isSpanishCourse ? 'Back to Lesson Path' : 'Volver al Camino de Lecciones'}
                </span>
              </button>
            </div>

            {/* Main NoDeck 3-in-1 Interactive Card Table + 4 Rapid Practice Decks */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7">
                <HeroInteractiveCard courseLanguage={courseLanguage} onEarnXP={addXP} />
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-5 shadow-[4px_4px_0px_0px_#0f172a]">
                  <h3 className="text-base font-black text-slate-950 dark:text-white mb-1">
                    {isSpanishCourse
                      ? 'Quick Trainers by Learning Need'
                      : 'Entrenadores Rápidos por Necesidad'}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-4">
                    {isSpanishCourse
                      ? 'Pick the specific Spanish skill you want to reinforce today in 1–3 minute sessions:'
                      : 'Elige qué habilidad específica necesitas reforzar hoy en sesiones de 1 a 3 minutos:'}
                  </p>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => {
                        playTactileSound('pop');
                        setIsDailyChallengeOpen(true);
                      }}
                      className="w-full text-left p-4 rounded-2xl bg-yellow-200 hover:bg-yellow-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] transition-all flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[11px] font-black uppercase text-slate-700 block">
                          {isSpanishCourse
                            ? 'Need: Quick Reflexes (60 sec)'
                            : 'Necesidad: Agilidad Mental (60 seg)'}
                        </span>
                        <span className="text-sm font-black block">
                          {isSpanishCourse
                            ? '01. 3-Card Lightning Challenge (+110 XP)'
                            : '01. Reto Relámpago de 3 Cartas (+110 XP)'}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playTactileSound('pop');
                        setIsQuickPracticeOpen(true);
                      }}
                      className="w-full text-left p-4 rounded-2xl bg-sky-200 hover:bg-sky-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] transition-all flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[11px] font-black uppercase text-slate-700 block">
                          {isSpanishCourse
                            ? 'Need: Everyday Phrases (3 min)'
                            : 'Necesidad: Frases Cotidianas (3 min)'}
                        </span>
                        <span className="text-sm font-black block">
                          {isSpanishCourse
                            ? '02. Express Round with Clear Audio (+45 XP)'
                            : '02. Ronda Express con Audio Claro (+45 XP)'}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playTactileSound('pop');
                        setIsVerbTrainerOpen(true);
                      }}
                      className="w-full text-left p-4 rounded-2xl bg-emerald-200 hover:bg-emerald-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] transition-all flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[11px] font-black uppercase text-slate-700 block">
                          {isSpanishCourse
                            ? 'Need: Spanish Verb Conjugations'
                            : 'Necesidad: Conjugación y Tiempos Verbales'}
                        </span>
                        <span className="text-sm font-black block">
                          {isSpanishCourse
                            ? '03. Interactive Verb Trainer with Audio'
                            : '03. Entrenador de Verbos con Audio'}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        playTactileSound('pop');
                        setActiveTab('ai-tools');
                      }}
                      className="w-full text-left p-4 rounded-2xl bg-rose-200 hover:bg-rose-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] transition-all flex items-center justify-between gap-3"
                    >
                      <div>
                        <span className="text-[11px] font-black uppercase text-slate-700 block">
                          {isSpanishCourse
                            ? 'Need: Understand Complex Sentences'
                            : 'Necesidad: Entender Oraciones Difíciles'}
                        </span>
                        <span className="text-sm font-black block">
                          {isSpanishCourse
                            ? '04. Word-by-Word Sentence Analyzer'
                            : '04. Desglosador de Frases Palabra por Palabra'}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'home': {
        const globalCompletionPct =
          totalLessonsCount > 0
            ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
            : 0;

        return (
          <div className="max-w-6xl mx-auto pt-4 pb-28 px-4 sm:px-6 space-y-8">
            {/* Workspace Control Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-2xl px-4 py-3 shadow-[4px_4px_0px_0px_#0f172a] dark:shadow-[4px_4px_0px_0px_#27272a]">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 font-black text-xs flex items-center justify-center shrink-0">
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <span className="font-extrabold text-sm text-slate-900 dark:text-zinc-100">
                    {currentUser.fullName}
                  </span>
                  {isSoleTeacher ? (
                    <span className="px-2 py-0.5 rounded-lg bg-yellow-300 text-slate-950 border border-slate-900 font-black text-[10px]">
                      {isSpanishCourse ? 'Head Teacher' : 'Profesor Titular'}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-200 text-slate-950 border border-slate-900 font-black text-[10px]">
                      {isSpanishCourse ? 'Enrolled Student' : 'Alumno Autorizado'}
                    </span>
                  )}
                </div>

                <span
                  aria-hidden="true"
                  className="hidden sm:inline text-slate-300 dark:text-zinc-700"
                >
                  ·
                </span>

                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    forceSyncToCloud();
                  }}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 font-extrabold hover:underline cursor-pointer"
                >
                  {isSyncing || syncStatus === 'syncing' ? (
                    <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>{isSpanishCourse ? 'Saving...' : 'Guardando...'}</span>
                    </span>
                  ) : (
                    <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>
                        {isSpanishCourse ? 'Progress Saved' : 'Progreso Guardado'}
                      </span>
                      {lastSyncedAt && (
                        <span className="text-[11px] text-slate-500 font-mono tabular-nums">
                          (
                          {lastSyncedAt.toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                          )
                        </span>
                      )}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="bg-slate-100 dark:bg-zinc-800 p-1 rounded-xl flex items-center gap-1 border-2 border-slate-900 dark:border-zinc-700">
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      handleToggleLanguage('en');
                    }}
                    className={`px-3 py-1 rounded-lg font-extrabold text-xs transition-colors whitespace-nowrap shrink-0 ${
                      courseLanguage === 'en'
                        ? 'bg-yellow-300 text-slate-950 border border-slate-900'
                        : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
                    }`}
                  >
                    🇬🇧 Aprender Inglés
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      handleToggleLanguage('es');
                    }}
                    className={`px-3 py-1 rounded-lg font-extrabold text-xs transition-colors whitespace-nowrap shrink-0 ${
                      courseLanguage === 'es'
                        ? 'bg-yellow-300 text-slate-950 border border-slate-900'
                        : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
                    }`}
                  >
                    🇪🇸 Learn Spanish
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleToggleSilentMicMode}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs border-2 border-slate-900 dark:border-zinc-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    silentMicMode
                      ? 'bg-amber-300 text-slate-950'
                      : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-slate-100'
                  }`}
                >
                  {silentMicMode ? (
                    <>
                      <MicOff className="w-3.5 h-3.5" />
                      <span>
                        {isSpanishCourse ? 'No-Mic Mode: Active' : 'Sin Micrófono: Activo'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      <span>
                        {isSpanishCourse ? 'Microphone: Optional' : 'Micrófono: Opcional'}
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleToggleSfx}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-xs border-2 border-slate-900 dark:border-zinc-700 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    sfxActive
                      ? 'bg-emerald-300 text-slate-950'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-500'
                  }`}
                >
                  {sfxActive ? (
                    <Volume2 className="w-3.5 h-3.5" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {sfxActive
                      ? isSpanishCourse
                        ? 'Sounds: ON'
                        : 'Sonidos: ON'
                      : isSpanishCourse
                        ? 'Sounds: OFF'
                        : 'Sonidos: OFF'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    setIsDarkMode(prev => !prev);
                  }}
                  className="p-2 rounded-xl bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-200 border-2 border-slate-900 dark:border-zinc-700 hover:bg-yellow-200 transition-colors"
                >
                  {isDarkMode ? (
                    <Sun className="w-4 h-4 text-amber-400" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 rounded-xl bg-white dark:bg-zinc-800 text-slate-600 hover:bg-rose-200 hover:text-slate-950 border-2 border-slate-900 dark:border-zinc-700 transition-colors"
                  title={isSpanishCourse ? 'Log out' : 'Cerrar sesión'}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Teacher Personalized Priority Note (if assigned by Professor César) */}
            {currentUser.notesFromTeacher && (
              <div className="p-4 rounded-2xl bg-yellow-200 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex items-start gap-3 text-slate-950">
                <div className="p-2 rounded-xl bg-white border-2 border-slate-900 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-indigo-700" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-900 block">
                    {isSpanishCourse
                      ? 'Priority Note from Your Teacher'
                      : 'Indicación de Prioridad de tu Profesor'}
                  </span>
                  <p className="text-sm font-extrabold mt-0.5">{currentUser.notesFromTeacher}</p>
                </div>
              </div>
            )}

            {/* STUDENT NEEDS & LEARNING PRIORITY FILTER BAR */}
            <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#0f172a]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                    {isSpanishCourse
                      ? 'ORGANIZED BY STUDENT LEARNING PRIORITIES'
                      : 'ORGANIZACIÓN POR NECESIDADES Y PRIORIDADES DEL ALUMNO'}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white">
                    {isSpanishCourse
                      ? 'Which learning stage do you want to focus on today?'
                      : '¿Qué etapa necesitas trabajar hoy?'}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setPriorityViewFilter('all');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all ${
                      priorityViewFilter === 'all'
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-yellow-300 dark:text-slate-950'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-900/20'
                    }`}
                  >
                    {isSpanishCourse
                      ? 'View Full Ordered Path (1st → 2nd → 3rd)'
                      : 'Ver Ruta Completa en Orden (1º → 2º → 3º)'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setPriorityViewFilter('priority-1-lessons');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all ${
                      priorityViewFilter === 'priority-1-lessons'
                        ? 'bg-yellow-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-900/20'
                    }`}
                  >
                    {isSpanishCourse
                      ? '1st Priority #1: Lesson Path'
                      : '1º Prioridad #1: Camino de Lecciones'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setPriorityViewFilter('priority-2-practice');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all ${
                      priorityViewFilter === 'priority-2-practice'
                        ? 'bg-emerald-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-900/20'
                    }`}
                  >
                    {isSpanishCourse
                      ? '2nd Priority #2: NoDeck Cards & Vocab'
                      : '2º Prioridad #2: Cartas NoDeck y Vocabulario'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setPriorityViewFilter('priority-3-mastery');
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black border-2 transition-all ${
                      priorityViewFilter === 'priority-3-mastery'
                        ? 'bg-rose-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-900/20'
                    }`}
                  >
                    {isSpanishCourse
                      ? '3rd Priority #3: Exams & AI Tutor'
                      : '3º Prioridad #3: Exámenes y Tutor IA'}
                  </button>
                </div>
              </div>
            </div>

            {/* ===================================================================== */}
            {/* PRIORIDAD #1 (OBLIGATORIA PRIMERO): EL CAMINO ESTRUCTURADO DE LECCIONES */}
            {/* ===================================================================== */}
            {(priorityViewFilter === 'all' ||
              priorityViewFilter === 'priority-1-lessons') && (
              <section className="space-y-6">
                {/* Section Header Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[2px_2px_0px_0px_#0f172a]">
                      {isSpanishCourse ? 'PRIORITY #1 · START HERE' : 'PRIORIDAD #1 · EMPIEZA AQUÍ'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-display">
                      {isSpanishCourse
                        ? 'Sequential Spanish Lesson Path (Step by Step)'
                        : 'Camino Secuencial de Lecciones (Paso a Paso)'}
                    </h2>
                  </div>
                  <span className="text-xs font-extrabold text-slate-600 dark:text-zinc-400 tabular-nums">
                    {isSpanishCourse ? 'Overall progress:' : 'Avance global:'}{' '}
                    {completedLessonsCount} / {totalLessonsCount}{' '}
                    {isSpanishCourse ? 'lessons' : 'lecciones'} ({globalCompletionPct}%)
                  </span>
                </div>

                {/* Primary Hero Card: Active Lesson Path & Next Step Launcher */}
                <div className="bg-indigo-600 dark:bg-indigo-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-slate-900 dark:border-zinc-700 shadow-[6px_6px_0px_0px_#0f172a] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 text-xs font-black tabular-nums">
                      <span>{userRank}</span>
                      <span>·</span>
                      <span>
                        🔥 {progress.streakDays || 1}{' '}
                        {isSpanishCourse ? 'day streak' : 'días de racha'}
                      </span>
                      <span>·</span>
                      <span>⭐ {userXP} XP</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight font-display">
                      {isSpanishCourse
                        ? 'Complete your next Spanish lesson in order first. Then reinforce with card games.'
                        : 'Primero completa tu lección del día en orden. Después refuerza jugando.'}
                    </h1>

                    <p className="text-indigo-100 text-sm sm:text-base font-semibold leading-relaxed">
                      {isSpanishCourse
                        ? 'Your Spanish curriculum is explained in clear English so you advance without gaps: first learn grammar and real phrases in your guided lesson, then practice with NoDeck cards, and finally certify each CEFR level (A1 → A2 → B1 → B2).'
                        : 'El camino curricular está explicado en español claro para que avances en inglés sin lagunas: primero comprendes la estructura en tu lección guiada, luego practicas con cartas y finalmente certificas cada nivel MCER (A1 → A2 → B1 → B2).'}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          playTactileSound('pop');
                          setDirectLessonModal(nextUpLesson);
                        }}
                        className="px-6 py-3.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center gap-2 transition-all"
                      >
                        <Play className="w-4 h-4 fill-slate-950" />
                        <span>
                          {isSpanishCourse
                            ? `Start My Current Lesson (Step ${nextUpLesson.day})`
                            : `Iniciar Mi Lección Actual (Paso ${nextUpLesson.day})`}
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playTactileSound('pop');
                          setActiveTab(currentRecommendedModuleTab);
                        }}
                        className="px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border-2 border-white/40 font-black text-xs transition-all flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>
                          {isSpanishCourse
                            ? `Open ${currentRecommendedStageLabel} Map`
                            : `Abrir Mapa de ${currentRecommendedStageLabel}`}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Right (5 cols): Current Step Focus Card */}
                  <div className="lg:col-span-5 bg-white text-slate-950 border-2 border-slate-900 rounded-2xl p-5 shadow-[4px_4px_0px_0px_#0f172a] space-y-3">
                    <div className="flex items-center justify-between text-xs font-black text-indigo-700">
                      <span>
                        {isSpanishCourse
                          ? 'YOUR NEXT PRIORITY LESSON'
                          : 'TU PASO OBLIGATORIO DE HOY'}
                      </span>
                      <span className="px-2 py-0.5 rounded-lg bg-indigo-100 border border-slate-900 text-slate-950">
                        {isSpanishCourse ? `Step ${nextUpLesson.day}` : `Paso ${nextUpLesson.day}`}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-950 leading-snug">
                      {nextUpLesson.title}
                    </h3>

                    <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                      {nextUpLesson.description}
                    </p>

                    <div className="pt-2 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-slate-800">
                      <span>
                        {isSpanishCourse ? 'Recommended module:' : 'Módulo recomendado:'}
                      </span>
                      <span className="text-indigo-700">{currentRecommendedStageLabel}</span>
                    </div>
                  </div>
                </div>

                {/* Ordered 6-Step Curricular Roadmap (Strictly Ordered by Learning Priority) */}
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-zinc-100">
                      {isSpanishCourse
                        ? 'Official 6-Stage Lesson Roadmap (In Study Order)'
                        : 'Etapas Oficiales del Camino de Lecciones (En Orden de Estudio)'}
                    </h3>
                    <span className="text-xs font-bold text-slate-500">
                      {isSpanishCourse
                        ? 'Follow stages 1st through 6th'
                        : 'Sigue los módulos del 1º al 6º'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Stage 1: A1 Inicial */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveTab('a1-inicial')}
                      className="cursor-pointer flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_#0f172a]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg bg-sky-300 text-slate-950 border border-slate-900 text-xs font-black">
                            {isSpanishCourse ? '1ST STAGE · LEVEL A1.1' : '1º PASO · NIVEL A1.1'}
                          </span>
                          <span className="text-xs font-black text-slate-600 dark:text-zinc-400 tabular-nums">
                            {a1InicialCompletedCount}/{currentA1Inicial.length}{' '}
                            {isSpanishCourse ? 'lessons' : 'lecciones'}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-slate-950 dark:text-white mb-1">
                          {isSpanishCourse
                            ? 'A1 Beginner · Foundations'
                            : 'A1 Inicial · Fundamentos'}
                        </h4>
                        <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-4 leading-relaxed">
                          {isSpanishCourse
                            ? 'Spanish greetings, pronouns, SER vs. ESTAR, basic questions, numbers, and family.'
                            : 'Saludos en inglés, pronombres, verbo To Be, preguntas básicas, números y familia.'}
                        </p>
                      </div>
                      <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-sky-700 dark:text-sky-400">
                        <span>{isSpanishCourse ? 'Enter Stage 1' : 'Entrar al Paso 1º'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Stage 2: A1 Intermedio */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveTab('a1-intermedio')}
                      className="cursor-pointer flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_#0f172a]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg bg-purple-300 text-slate-950 border border-slate-900 text-xs font-black">
                            {isSpanishCourse ? '2ND STAGE · LEVEL A1.2' : '2º PASO · NIVEL A1.2'}
                          </span>
                          <span className="text-xs font-black text-slate-600 dark:text-zinc-400 tabular-nums">
                            {a1IntermedioCompletedCount}/{currentA1Intermedio.length}{' '}
                            {isSpanishCourse ? 'lessons' : 'lecciones'}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-slate-950 dark:text-white mb-1">
                          {isSpanishCourse
                            ? 'A1 Intermediate · Consolidation'
                            : 'A1 Intermedio · Consolidación'}
                        </h4>
                        <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-4 leading-relaxed">
                          {isSpanishCourse
                            ? 'Regular -AR/-ER/-IR verbs, daily routines, GUSTAR, home vocabulary, PODER, and shopping.'
                            : 'Presente simple, rutinas, gustos, vocabulario del hogar, modales de habilidad y compras.'}
                        </p>
                      </div>
                      <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-purple-700 dark:text-purple-400">
                        <span>{isSpanishCourse ? 'Enter Stage 2' : 'Entrar al Paso 2º'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Stage 3: Fluidez Situacional */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveTab('fluency')}
                      className="cursor-pointer flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_#0f172a]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-300 text-slate-950 border border-slate-900 text-xs font-black">
                            {isSpanishCourse
                              ? '3RD STAGE · REAL DIALOGUES'
                              : '3º PASO · DIÁLOGOS REALES'}
                          </span>
                          <span className="text-xs font-black text-slate-600 dark:text-zinc-400 tabular-nums">
                            {fluencyCompletedCount}/{currentFluency.length}{' '}
                            {isSpanishCourse ? 'scenarios' : 'escenarios'}
                          </span>
                        </div>
                        <h4 className="text-lg font-black text-slate-950 dark:text-white mb-1">
                          {isSpanishCourse
                            ? 'Conversational Fluency'
                            : 'Fluidez Conversacional'}
                        </h4>
                        <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-4 leading-relaxed">
                          {isSpanishCourse
                            ? 'Apply your Spanish in cafés, restaurants, hotels, asking for directions, and travel.'
                            : 'Aplica lo aprendido en cafeterías, restaurantes, hoteles, direcciones y viajes.'}
                        </p>
                      </div>
                      <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-emerald-700 dark:text-emerald-400">
                        <span>{isSpanishCourse ? 'Enter Stage 3' : 'Entrar al Paso 3º'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Stage 4: A2 Plataforma */}
                    <div
                      onClick={() => {
                        if (isA1Certified) setActiveTab('a2-plataforma');
                        else setActiveTab('exam');
                      }}
                      className="cursor-pointer flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_#0f172a]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-300 text-slate-950 border border-slate-900 text-xs font-black">
                            {isSpanishCourse ? '4TH STAGE · LEVEL A2' : '4º PASO · NIVEL A2'}
                          </span>
                          {!isA1Certified ? (
                            <span className="px-2 py-0.5 rounded-md bg-amber-200 text-slate-950 border border-slate-900 text-[10px] font-black">
                              {isSpanishCourse ? 'Requires A1 Cert' : 'Pide Certificado A1'}
                            </span>
                          ) : (
                            <span className="text-xs font-black text-slate-600 tabular-nums">
                              {a2CompletedCount}/{currentA2Lessons.length}{' '}
                              {isSpanishCourse ? 'lessons' : 'lecciones'}
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-black text-slate-950 dark:text-white mb-1">
                          {isSpanishCourse
                            ? 'A2 Intermediate Platform'
                            : 'A2 Plataforma Intermedia'}
                        </h4>
                        <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-4 leading-relaxed">
                          {isSpanishCourse
                            ? 'Spanish past tenses (Indefinido vs. Imperfecto), future plans, object pronouns, and Por vs. Para.'
                            : 'Tiempos pasados, planes futuros, experiencias (Present Perfect), salud y condicionales.'}
                        </p>
                      </div>
                      <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-indigo-700 dark:text-indigo-400">
                        <span>
                          {isA1Certified
                            ? isSpanishCourse
                              ? 'Enter Stage 4 (A2)'
                              : 'Entrar al Paso 4º (A2)'
                            : isSpanishCourse
                              ? 'Certify A1 to unlock'
                              : 'Certificar A1 para desbloquear'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Stage 5: B1 Umbral */}
                    <div
                      onClick={() => {
                        if (isA2Certified) setActiveTab('b1-umbral');
                        else setActiveTab('exam');
                      }}
                      className="cursor-pointer flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_#0f172a]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg bg-teal-300 text-slate-950 border border-slate-900 text-xs font-black">
                            {isSpanishCourse ? '5TH STAGE · LEVEL B1' : '5º PASO · NIVEL B1'}
                          </span>
                          {!isA2Certified ? (
                            <span className="px-2 py-0.5 rounded-md bg-amber-200 text-slate-950 border border-slate-900 text-[10px] font-black">
                              {isSpanishCourse ? 'Requires A2 Cert' : 'Pide Certificado A2'}
                            </span>
                          ) : (
                            <span className="text-xs font-black text-slate-600 tabular-nums">
                              {b1CompletedCount}/{currentB1Lessons.length}{' '}
                              {isSpanishCourse ? 'lessons' : 'lecciones'}
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-black text-slate-950 dark:text-white mb-1">
                          {isSpanishCourse
                            ? 'B1 Independent Threshold'
                            : 'B1 Umbral Independiente'}
                        </h4>
                        <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-4 leading-relaxed">
                          {isSpanishCourse
                            ? 'Present Subjunctive, Conditional, Imperative commands, Pluscuamperfecto, and double object pronouns.'
                            : 'Hipótesis (Second Conditional), voz pasiva, estilo indirecto, cláusulas relativas y phrasal verbs.'}
                        </p>
                      </div>
                      <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-teal-700 dark:text-teal-400">
                        <span>
                          {isA2Certified
                            ? isSpanishCourse
                              ? 'Enter Stage 5 (B1)'
                              : 'Entrar al Paso 5º (B1)'
                            : isSpanishCourse
                              ? 'Certify A2 to unlock'
                              : 'Certificar A2 para desbloquear'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Stage 6: B2 Avanzado */}
                    <div
                      onClick={() => {
                        if (isB1Certified) setActiveTab('b2-avanzado');
                        else setActiveTab('exam');
                      }}
                      className="cursor-pointer flex flex-col justify-between p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_#0f172a]"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2.5 py-1 rounded-lg bg-rose-300 text-slate-950 border border-slate-900 text-xs font-black">
                            {isSpanishCourse ? '6TH STAGE · LEVEL B2' : '6º PASO · NIVEL B2'}
                          </span>
                          {!isB1Certified ? (
                            <span className="px-2 py-0.5 rounded-md bg-amber-200 text-slate-950 border border-slate-900 text-[10px] font-black">
                              {isSpanishCourse ? 'Requires B1 Cert' : 'Pide Certificado B1'}
                            </span>
                          ) : (
                            <span className="text-xs font-black text-slate-600 tabular-nums">
                              {b2CompletedCount}/{currentB2Lessons.length}{' '}
                              {isSpanishCourse ? 'lessons' : 'lecciones'}
                            </span>
                          )}
                        </div>
                        <h4 className="text-lg font-black text-slate-950 dark:text-white mb-1">
                          {isSpanishCourse
                            ? 'B2 Advanced Mastery'
                            : 'B2 Dominio y Perfeccionamiento'}
                        </h4>
                        <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mb-4 leading-relaxed">
                          {isSpanishCourse
                            ? 'Imperfect Subjunctive, past counterfactuals, verbal periphrases, and executive Spanish.'
                            : 'Condicionales mixtos, deducción en pasado, inversión estilística y registro profesional.'}
                        </p>
                      </div>
                      <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-rose-700 dark:text-rose-400">
                        <span>
                          {isB1Certified
                            ? isSpanishCourse
                              ? 'Enter Stage 6 (B2)'
                              : 'Entrar al Paso 6º (B2)'
                            : isSpanishCourse
                              ? 'Certify B1 to unlock'
                              : 'Certificar B1 para desbloquear'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Tabletop Level Board (Inspect all 48 lessons in order) */}
                <OnePageBentoExplorer
                  courseLanguage={courseLanguage}
                  progress={progress}
                  a1Lessons={a1Lessons}
                  a2Lessons={currentA2Lessons}
                  b1Lessons={currentB1Lessons}
                  b2Lessons={currentB2Lessons}
                  isA1Certified={isA1Certified}
                  isA2Certified={isA2Certified}
                  isB1Certified={isB1Certified}
                  isB2Certified={isB2Certified}
                  onNavigate={setActiveTab}
                  onSelectLessonDirect={lesson => setDirectLessonModal(lesson)}
                />
              </section>
            )}

            {/* ===================================================================== */}
            {/* PRIORIDAD #2 (SEPARADA): PRÁCTICA CON CARTAS NODECK Y VOCABULARIO SRS */}
            {/* ===================================================================== */}
            {(priorityViewFilter === 'all' ||
              priorityViewFilter === 'priority-2-practice') && (
              <section className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-xl bg-emerald-300 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[2px_2px_0px_0px_#0f172a]">
                      {isSpanishCourse
                        ? 'PRIORITY #2 · PRACTICE & REINFORCEMENT'
                        : 'PRIORIDAD #2 · PRÁCTICA Y REFUERZO'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-display">
                      {isSpanishCourse
                        ? '«NoDeck» Card Games & Spaced Repetition Vocabulary (After Your Lesson)'
                        : 'Juegos de Cartas «NoDeck» y Vocabulario (Después de tu Lección)'}
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Card 1: Open Dedicated NoDeck Card Table */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      playTactileSound('pop');
                      setActiveTab('playground');
                    }}
                    className="cursor-pointer p-6 rounded-3xl bg-yellow-200 dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[5px_5px_0px_0px_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="px-2.5 py-1 rounded-lg bg-white text-slate-950 border border-slate-900 text-xs font-black inline-block mb-3">
                        {isSpanishCourse ? 'SEPARATE GAME ROOM' : 'SALA SEPARADA DE JUEGO'}
                      </span>
                      <h3 className="text-xl font-black text-slate-950 dark:text-white mb-2">
                        {isSpanishCourse
                          ? '«NoDeck» Card Table + Neon Highlighter'
                          : 'Mesa de Cartas «NoDeck» + Subrayador'}
                      </h3>
                      <p className="text-xs font-bold text-slate-800 dark:text-zinc-300 leading-relaxed mb-4">
                        {isSpanishCourse
                          ? 'Highlight Spanish words with a neon marker to hear pronunciation, build sentences with magnets, and match pairs.'
                          : 'Subraya palabras con marcador fluorescente, arma frases con fichas magnéticas y juega a encontrar pares con letra grande.'}
                      </p>
                    </div>
                    <div className="pt-3 border-t-2 border-slate-900/15 flex items-center justify-between text-xs font-black text-slate-950 dark:text-yellow-300">
                      <span>{isSpanishCourse ? 'Open Card Table' : 'Abrir Mesa de Cartas'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card 2: Spaced Repetition Flashcards */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      playTactileSound('pop');
                      setActiveTab('flashcards');
                    }}
                    className="cursor-pointer p-6 rounded-3xl bg-sky-200 dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[5px_5px_0px_0px_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="px-2.5 py-1 rounded-lg bg-white text-slate-950 border border-slate-900 text-xs font-black inline-block mb-3">
                        {currentFastTrackVocab.length} {isSpanishCourse ? '3D CARDS' : 'CARTAS 3D'}
                      </span>
                      <h3 className="text-xl font-black text-slate-950 dark:text-white mb-2">
                        {isSpanishCourse
                          ? 'Core SRS Vocabulary (A1–B2)'
                          : 'Vocabulario Clave SRS (A1–B2)'}
                      </h3>
                      <p className="text-xs font-bold text-slate-800 dark:text-zinc-300 leading-relaxed mb-4">
                        {isSpanishCourse
                          ? 'Spaced repetition flashcards with normal/slow Spanish audio and optional microphone skip.'
                          : 'Tarjetas de memoria espaciada con audio normal/lento y opción para saltar micrófono cuando no puedas hablar.'}
                      </p>
                    </div>
                    <div className="pt-3 border-t-2 border-slate-900/15 flex items-center justify-between text-xs font-black text-slate-950 dark:text-sky-300">
                      <span>
                        {isSpanishCourse ? 'Practice Vocabulary' : 'Practicar Vocabulario'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Card 3: Verb Trainer & 60s Challenge */}
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      playTactileSound('pop');
                      setIsVerbTrainerOpen(true);
                    }}
                    className="cursor-pointer p-6 rounded-3xl bg-emerald-200 dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[5px_5px_0px_0px_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="px-2.5 py-1 rounded-lg bg-white text-slate-950 border border-slate-900 text-xs font-black inline-block mb-3">
                        {isSpanishCourse ? 'SPOKEN GRAMMAR' : 'GRAMÁTICA HABLADA'}
                      </span>
                      <h3 className="text-xl font-black text-slate-950 dark:text-white mb-2">
                        {isSpanishCourse
                          ? 'Spanish Verb & Tense Trainer'
                          : 'Entrenador de Verbos y Tiempos'}
                      </h3>
                      <p className="text-xs font-bold text-slate-800 dark:text-zinc-300 leading-relaxed mb-4">
                        {isSpanishCourse
                          ? 'Master essential Spanish conjugations (Ser, Estar, Tener, Hablar, Querer, Poder) with step-by-step audio.'
                          : 'Domina las conjugaciones esenciales en presente, pasado y futuro con ejemplos auditivos paso a paso.'}
                      </p>
                    </div>
                    <div className="pt-3 border-t-2 border-slate-900/15 flex items-center justify-between text-xs font-black text-slate-950 dark:text-emerald-300">
                      <span>{isSpanishCourse ? 'Train Verbs' : 'Entrenar Verbos'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ===================================================================== */}
            {/* PRIORIDAD #3: CONVERSACIÓN IA, DIAGNÓSTICO Y CERTIFICACIÓN OFICIAL    */}
            {/* ===================================================================== */}
            {(priorityViewFilter === 'all' ||
              priorityViewFilter === 'priority-3-mastery') && (
              <section className="space-y-6 pt-2">
                <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-xl bg-rose-300 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[2px_2px_0px_0px_#0f172a]">
                      {isSpanishCourse
                        ? 'PRIORITY #3 · ASSESSMENT & CONVERSATION'
                        : 'PRIORIDAD #3 · EVALUACIÓN Y PRODUCCIÓN LIBRE'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white font-display">
                      {isSpanishCourse
                        ? 'Study Diagnostics, AI Spanish Tutor & Official CEFR Certification'
                        : 'Diagnóstico de Estudio, Tutor IA y Exámenes Oficiales MCER'}
                    </h2>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveTab('exam')}
                    className="cursor-pointer p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <Award className="w-7 h-7 text-rose-600 mb-3" />
                      <h3 className="text-lg font-black text-slate-950 dark:text-white mb-1">
                        {isSpanishCourse
                          ? 'CEFR Certification Center (A1 to B2)'
                          : 'Centro de Certificación (A1 a B2)'}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                        {isSpanishCourse
                          ? 'Take the official exam for your current level once its lessons are finished. Passing with ≥80% unlocks the next level.'
                          : 'Presenta el examen de tu nivel actual cuando hayas completado sus lecciones. Aprobar con ≥80% desbloquea el siguiente nivel.'}
                      </p>
                    </div>
                    <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-rose-600">
                      <span>
                        {isSpanishCourse ? 'Go to Official Exams' : 'Ir a Exámenes Oficiales'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveTab('ai-tutor')}
                    className="cursor-pointer p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <Bot className="w-7 h-7 text-indigo-600 mb-3" />
                      <h3 className="text-lg font-black text-slate-950 dark:text-white mb-1">
                        {isSpanishCourse
                          ? 'AI Conversational Tutor'
                          : 'Tutoría Conversacional IA'}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                        {isSpanishCourse
                          ? 'Practice real-world Spanish conversations by text or voice with grammar tips explained in English.'
                          : 'Practica conversación libre en inglés por escrito o por voz con correcciones explicadas en español.'}
                      </p>
                    </div>
                    <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-indigo-600">
                      <span>{isSpanishCourse ? 'Open AI Tutor' : 'Abrir Tutor IA'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveTab('ai-tools')}
                    className="cursor-pointer p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] hover:-translate-y-1 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <Wand2 className="w-7 h-7 text-teal-600 mb-3" />
                      <h3 className="text-lg font-black text-slate-950 dark:text-white mb-1">
                        {isSpanishCourse
                          ? 'AI Sentence Analyzer'
                          : 'Analizador de Frases IA'}
                      </h3>
                      <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                        {isSpanishCourse
                          ? 'Type any Spanish sentence to break down its grammar word by word in English.'
                          : 'Escribe cualquier oración en inglés para desglosar su estructura gramatical palabra por palabra.'}
                      </p>
                    </div>
                    <div className="pt-3 border-t-2 border-slate-900/10 flex items-center justify-between text-xs font-black text-teal-600">
                      <span>{isSpanishCourse ? 'Open Analyzer' : 'Abrir Analizador'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        );
      }

      case 'a1-inicial':
        return (
          <div className="px-4 pt-6">
            {renderLessonPathSwitcher()}
            <StepPath
              lessons={currentA1Inicial}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={
                isSpanishCourse
                  ? '1st Stage: Spanish A1 Beginner (Foundations)'
                  : '1º Paso: Inglés A1 Inicial (Fundamentos)'
              }
              description={
                isSpanishCourse
                  ? 'Priority #1: Complete these lessons in order to master Spanish greetings, pronouns, SER vs. ESTAR, questions, and core structures (all explained in English).'
                  : 'Prioridad #1: Completa estas lecciones en orden para dominar saludos, pronombres, verbo To Be, preguntas y estructuras base.'
              }
              levelBadge={
                isSpanishCourse
                  ? 'Stage 1 of Lesson Path · A1 Foundations'
                  : 'Etapa 1 del Camino · Fundamentos A1'
              }
              themeGradient="from-sky-600 via-blue-600 to-indigo-700"
              accentColor="sky"
            />
          </div>
        );

      case 'a1-intermedio':
        return (
          <div className="px-4 pt-6">
            {renderLessonPathSwitcher()}
            <StepPath
              lessons={currentA1Intermedio}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={
                isSpanishCourse
                  ? '2nd Stage: Spanish A1 Intermediate (Consolidation)'
                  : '2º Paso: Inglés A1 Intermedio (Consolidación)'
              }
              description={
                isSpanishCourse
                  ? 'Second mandatory stage: Regular -AR/-ER/-IR verbs, daily routines, GUSTAR, home vocabulary, PODER, and shopping.'
                  : 'Segundo escalón obligatorio: Presente simple, rutinas, gustos, el hogar, modales de habilidad (Can) y compras.'
              }
              levelBadge={
                isSpanishCourse
                  ? 'Stage 2 of Lesson Path · A1 Consolidation'
                  : 'Etapa 2 del Camino · Consolidación A1'
              }
              themeGradient="from-purple-600 via-violet-600 to-indigo-700"
              accentColor="purple"
            />
          </div>
        );

      case 'a2-plataforma':
        if (!isA1Certified) {
          const a1ProgressPercent =
            a1RequiredIds.length > 0
              ? Math.round((a1CompletedCount / a1RequiredIds.length) * 100)
              : 0;
          return (
            <div className="max-w-3xl mx-auto px-4 pt-8 pb-24">
              {renderLessonPathSwitcher()}
              <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_0px_#0f172a] text-center">
                <div className="w-16 h-16 rounded-2xl bg-amber-300 text-slate-950 border-2 border-slate-900 flex items-center justify-center mx-auto mb-5">
                  <Award className="w-8 h-8" />
                </div>
                <p className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-2">
                  {isSpanishCourse
                    ? 'Mandatory Learning Order · Level A2'
                    : 'Orden Pedagógico Obligatorio · Nivel A2'}
                </p>
                <h1 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-zinc-100 mb-3">
                  {isSpanishCourse
                    ? 'Complete the A1 Path and earn your A1 Certificate first'
                    : 'Primero completa el Camino A1 y obtén tu Certificado A1'}
                </h1>
                <p className="text-sm md:text-base text-slate-600 dark:text-zinc-400 max-w-xl mx-auto mb-8 font-semibold leading-relaxed">
                  {isSpanishCourse
                    ? 'To ensure solid foundations before moving to Level A2 (Past Tenses, Future Plans, and Object Pronouns), complete all A1 lessons and pass the A1 Certification Exam with 80% or higher.'
                    : 'Para garantizar que domines las bases antes de pasar al Nivel A2 (Pasado, Futuro y Experiencias), primero debes completar las lecciones de A1 y aprobar el Examen de Certificación A1 con 80% o más.'}
                </p>

                <div className="bg-slate-50 dark:bg-zinc-800/60 border-2 border-slate-900 rounded-2xl p-5 mb-8 text-left max-w-lg mx-auto">
                  <div className="flex items-center justify-between text-xs font-black text-slate-900 dark:text-zinc-200 mb-2 tabular-nums">
                    <span>
                      {isSpanishCourse ? 'Your A1 Path Progress' : 'Tu Avance en el Camino A1'}
                    </span>
                    <span>
                      {a1CompletedCount} / {a1RequiredIds.length}{' '}
                      {isSpanishCourse ? 'lessons' : 'lecciones'} ({a1ProgressPercent}%)
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden border border-slate-900">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                      style={{ width: `${a1ProgressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('a1-inicial')}
                    className="px-6 py-3.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a]"
                  >
                    {isSpanishCourse ? 'Go to A1 Lessons' : 'Ir a las Lecciones de A1'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('exam')}
                    className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a]"
                  >
                    {isSpanishCourse ? 'Take Official A1 Exam' : 'Presentar Examen Oficial A1'}
                  </button>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="px-4 pt-6">
            {renderLessonPathSwitcher()}
            <StepPath
              lessons={currentA2Lessons}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={
                isSpanishCourse
                  ? '4th Stage: Spanish Level A2 (Past, Future & Real Life)'
                  : '4º Paso: Nivel A2 Plataforma (Pasado, Futuro y Vida Real)'
              }
              description={
                isSpanishCourse
                  ? 'Master Spanish past tenses (Indefinido vs. Imperfecto), future plans, object pronouns, and Por vs. Para.'
                  : 'Domina tiempos pasados, planes futuros, experiencias (Present Perfect), salud y primer condicional.'
              }
              levelBadge={
                isSpanishCourse
                  ? 'Stage 4 of Lesson Path · Official Level A2'
                  : 'Etapa 4 del Camino · Currículo Oficial Nivel A2'
              }
              themeGradient="from-indigo-600 via-blue-700 to-violet-700"
              accentColor="indigo"
            />
          </div>
        );

      case 'b1-umbral':
        if (!isA2Certified) {
          return (
            <div className="max-w-3xl mx-auto px-4 pt-8 pb-24">
              {renderLessonPathSwitcher()}
              <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_0px_#0f172a] text-center">
                <div className="w-16 h-16 rounded-2xl bg-teal-300 text-slate-950 border-2 border-slate-900 flex items-center justify-center mx-auto mb-5">
                  <Award className="w-8 h-8" />
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-zinc-100 mb-3">
                  {isSpanishCourse
                    ? 'Requires Official Level A2 Certificate (≥80%)'
                    : 'Requiere Certificado Oficial Nivel A2 (≥80%)'}
                </h1>
                <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-xl mx-auto mb-6 font-semibold">
                  {isSpanishCourse
                    ? 'Follow the priority order: complete the A2 lessons and pass the official A2 exam to unlock Level B1 Independent Threshold.'
                    : 'Sigue el orden de prioridad: primero completa las lecciones de A2 y aprueba su examen oficial para desbloquear el Nivel B1 Umbral Independiente.'}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('exam')}
                  className="px-6 py-3.5 rounded-xl bg-teal-500 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a]"
                >
                  {isSpanishCourse ? 'Go to Certification Center' : 'Ir al Centro de Certificación'}
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="px-4 pt-6">
            {renderLessonPathSwitcher()}
            <StepPath
              lessons={currentB1Lessons}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={
                isSpanishCourse
                  ? '5th Stage: Spanish Level B1 Independent Threshold'
                  : '5º Paso: Nivel B1 Umbral Independiente'
              }
              description={
                isSpanishCourse
                  ? 'Master the Present Subjunctive, Conditional, Imperative commands, and autonomous fluency.'
                  : 'Domina second conditional, voz pasiva, estilo indirecto y fluidez autónoma.'
              }
              levelBadge={
                isSpanishCourse
                  ? 'Stage 5 of Lesson Path · Official Level B1'
                  : 'Etapa 5 del Camino · Currículo Oficial Nivel B1'
              }
              themeGradient="from-teal-600 via-emerald-600 to-cyan-700"
              accentColor="emerald"
            />
          </div>
        );

      case 'b2-avanzado':
        if (!isB1Certified) {
          return (
            <div className="max-w-3xl mx-auto px-4 pt-8 pb-24">
              {renderLessonPathSwitcher()}
              <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_0px_#0f172a] text-center">
                <div className="w-16 h-16 rounded-2xl bg-rose-300 text-slate-950 border-2 border-slate-900 flex items-center justify-center mx-auto mb-5">
                  <Award className="w-8 h-8" />
                </div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-zinc-100 mb-3">
                  {isSpanishCourse
                    ? 'Requires Official Level B1 Certificate (≥80%)'
                    : 'Requiere Certificado Oficial Nivel B1 (≥80%)'}
                </h1>
                <p className="text-sm text-slate-600 dark:text-zinc-400 max-w-xl mx-auto mb-6 font-semibold">
                  {isSpanishCourse
                    ? 'Pass the official Level B1 Exam first to unlock Level B2 Advanced Mastery.'
                    : 'Aprueba primero el Examen Oficial de Nivel B1 para desbloquear el Nivel B2 Avanzado.'}
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('exam')}
                  className="px-6 py-3.5 rounded-xl bg-rose-400 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a]"
                >
                  {isSpanishCourse ? 'Go to Certification Center' : 'Ir al Centro de Certificación'}
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="px-4 pt-6">
            {renderLessonPathSwitcher()}
            <StepPath
              lessons={currentB2Lessons}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={
                isSpanishCourse
                  ? '6th Stage: Spanish Level B2 Advanced Mastery'
                  : '6º Paso: Nivel B2 Dominio y Perfeccionamiento'
              }
              description={
                isSpanishCourse
                  ? 'Master Imperfect Subjunctive, past counterfactuals, verbal periphrases, and executive argumentation.'
                  : 'Domina condicionales mixtos, deducción en pasado, inversión estilística y argumentación avanzada.'
              }
              levelBadge={
                isSpanishCourse
                  ? 'Stage 6 of Lesson Path · Official Level B2'
                  : 'Etapa 6 del Camino · Currículo Oficial Nivel B2'
              }
              themeGradient="from-rose-600 via-pink-600 to-indigo-700"
              accentColor="indigo"
            />
          </div>
        );

      case 'fluency':
        return (
          <div className="px-4 pt-6">
            {renderLessonPathSwitcher()}
            <StepPath
              lessons={currentFluency}
              progress={progress}
              onLessonComplete={markLessonComplete}
              title={
                isSpanishCourse
                  ? '3rd Stage: Conversational Spanish in Real Situations'
                  : '3º Paso: Fluidez Conversacional en Situaciones Reales'
              }
              description={
                isSpanishCourse
                  ? 'Real-world Spanish dialogue scenarios in cafés, hotels, streets, and daily situations.'
                  : 'Escenarios de diálogo real en cafeterías, hoteles, calles y situaciones cotidianas.'
              }
              levelBadge={
                isSpanishCourse
                  ? 'Stage 3 of Lesson Path · Real Conversation'
                  : 'Etapa 3 del Camino · Conversación Real'
              }
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
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors">
      {/* Top Bar Ordered by Student Learning Priority */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b-2 border-slate-900 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="text-lg font-black tracking-tight text-slate-950 dark:text-white whitespace-nowrap shrink-0 font-display flex items-center gap-2"
          >
            <span className="w-7 h-7 rounded-lg bg-yellow-300 border-2 border-slate-900 flex items-center justify-center text-xs text-slate-950">
              CT
            </span>
            <span>CesarTeach</span>
          </button>

          {/* Zone 2: Navigation Links Ordered by Pedagogical Priority */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-extrabold text-slate-600 dark:text-zinc-400">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className={`hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'home'
                  ? 'text-indigo-600 dark:text-yellow-300 underline decoration-2 underline-offset-4'
                  : ''
              }`}
            >
              {isSpanishCourse ? '1. My Path & Priorities' : '1. Mi Ruta y Prioridades'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab(currentRecommendedModuleTab)}
              className={`hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'a1-inicial' ||
                activeTab === 'a1-intermedio' ||
                activeTab === 'fluency' ||
                activeTab === 'a2-plataforma' ||
                activeTab === 'b1-umbral' ||
                activeTab === 'b2-avanzado'
                  ? 'text-indigo-600 dark:text-yellow-300 underline decoration-2 underline-offset-4'
                  : ''
              }`}
            >
              {isSpanishCourse ? '2. Lesson Path' : '2. Camino de Lecciones'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('playground')}
              className={`hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'playground'
                  ? 'text-emerald-700 dark:text-emerald-400 underline decoration-2 underline-offset-4'
                  : ''
              }`}
            >
              {isSpanishCourse ? '3. Card Table (NoDeck)' : '3. Mesa de Cartas (NoDeck)'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('flashcards')}
              className={`hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'flashcards'
                  ? 'text-indigo-600 dark:text-yellow-300 underline decoration-2 underline-offset-4'
                  : ''
              }`}
            >
              {isSpanishCourse ? '4. SRS Vocabulary' : '4. Vocabulario SRS'}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('exam')}
              className={`hover:text-slate-950 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'exam'
                  ? 'text-rose-600 dark:text-rose-400 underline decoration-2 underline-offset-4'
                  : ''
              }`}
            >
              {isSpanishCourse ? '5. CEFR Certification' : '5. Certificación MCER'}
            </button>

            {/* Exclusive Teacher Dashboard Link: ONLY visible to spacio.n.blnco@gmail.com or authorized teachers */}
            {isSoleTeacher && (
              <button
                type="button"
                onClick={() => setActiveTab('teacher-dashboard')}
                className={`px-3 py-1.5 rounded-xl border-2 border-slate-900 transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'teacher-dashboard'
                    ? 'bg-yellow-300 text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                    : 'bg-amber-100 text-slate-950 hover:bg-yellow-300'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isSpanishCourse ? 'Teacher Panel' : 'Panel Profesor'}</span>
              </button>
            )}
          </nav>

          {/* Zone 3: Notebook Action Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsNotebookOpen(true)}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 text-xs font-black transition-colors whitespace-nowrap shrink-0 shadow-[2px_2px_0px_0px_#0f172a]"
            >
              {isSpanishCourse
                ? `My Notebook (${completedLessonsCount})`
                : `Mi Cuaderno (${completedLessonsCount})`}
            </button>
          </div>
        </div>
      </header>

      <main className="pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + courseLanguage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.16 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Direct Lesson Player Modal */}
      {directLessonModal && (
        <LessonPlayer
          lesson={directLessonModal}
          onClose={() => setDirectLessonModal(null)}
          onComplete={() => markLessonComplete(directLessonModal.id)}
        />
      )}

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

      {/* Bottom Floating Navigation Bar (Ordered by Priority) */}
      <nav className="fixed bottom-3 left-3 right-3 max-w-4xl mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-2 border-slate-900 dark:border-zinc-700 rounded-2xl p-1.5 shadow-[4px_4px_0px_0px_#0f172a] z-40">
        <div className="flex justify-around items-center gap-1 overflow-x-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'home'
                ? 'bg-indigo-600 text-white font-black'
                : 'text-slate-600 dark:text-zinc-400 hover:text-indigo-600'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="text-[10px] font-black">
              {isSpanishCourse ? '1. My Path' : '1. Mi Ruta'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab(currentRecommendedModuleTab)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'a1-inicial' ||
              activeTab === 'a1-intermedio' ||
              activeTab === 'fluency' ||
              activeTab === 'a2-plataforma' ||
              activeTab === 'b1-umbral' ||
              activeTab === 'b2-avanzado'
                ? 'bg-yellow-300 text-slate-950 font-black border border-slate-900'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[10px] font-black">
              {isSpanishCourse ? '2. Lessons' : '2. Lecciones'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'playground'
                ? 'bg-emerald-300 text-slate-950 font-black border border-slate-900'
                : 'text-slate-600 dark:text-zinc-400 hover:text-emerald-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-black">
              {isSpanishCourse ? '3. NoDeck Cards' : '3. Cartas NoDeck'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'flashcards'
                ? 'bg-amber-400 text-slate-950 font-black border border-slate-900'
                : 'text-slate-600 dark:text-zinc-400 hover:text-amber-600'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span className="text-[10px] font-black">
              {isSpanishCourse ? '4. SRS Vocab' : '4. Vocab SRS'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('ai-tutor')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'ai-tutor'
                ? 'bg-indigo-600 text-white font-black'
                : 'text-slate-600 dark:text-zinc-400 hover:text-indigo-600'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="text-[10px] font-black">
              {isSpanishCourse ? '5. AI Tutor' : '5. Tutor IA'}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('exam')}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'exam'
                ? 'bg-rose-500 text-white font-black'
                : 'text-slate-600 dark:text-zinc-400 hover:text-rose-600'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="text-[10px] font-black">
              {isSpanishCourse ? '6. Exams' : '6. Exámenes'}
            </span>
          </button>

          {isSoleTeacher && (
            <button
              onClick={() => setActiveTab('teacher-dashboard')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap shrink-0 ${
                activeTab === 'teacher-dashboard'
                  ? 'bg-yellow-300 text-slate-950 font-black border border-slate-900'
                  : 'text-amber-700 dark:text-amber-400 font-black'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black">
                {isSpanishCourse ? 'Teacher' : 'Profesor'}
              </span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
