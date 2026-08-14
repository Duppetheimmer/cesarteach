import React, { useState, useEffect } from 'react';
import { BookOpen, Zap, Layers, Home as HomeIcon, Sparkles, Award, MessageSquare, Trophy, CheckCircle, ArrowRight, Flame, Star, Bookmark, Compass, Bot, Wand2, Globe, ShieldCheck, User, LogIn, UserPlus, LogOut, GraduationCap, Database } from 'lucide-react';
import { a1InicialLessons, a1IntermedioLessons, fluencyLessons, fastTrackVocab, finalExamQuestions } from './data';
import { spanishA1InicialLessons, spanishA1IntermedioLessons, spanishFluencyLessons, spanishFastTrackVocab, spanishFinalExamQuestions } from './data/spanishData';
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
import { SectionTab, UserProfile } from './types';
import { getStoredCurrentUser, setStoredCurrentUser, syncStudentProgressToDatabase, isSupabaseConfigured } from './lib/supabase';
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
    addXP,
    markLessonComplete,
    markWordMastered,
    updateWordSRS,
    recordExamResult
  } = useProgress();

  // Auto-sync progress to database whenever progress changes
  useEffect(() => {
    if (isLoaded && currentUser) {
      syncStudentProgressToDatabase(currentUser, progress, courseLanguage);
    }
  }, [progress, currentUser, courseLanguage, isLoaded]);

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-zinc-950 dark:to-zinc-900 text-indigo-600 font-bold">
        <Sparkles className="w-10 h-10 animate-spin mb-3 text-indigo-500" />
        <p className="text-lg">Cargando tu experiencia de aprendizaje A1...</p>
      </div>
    );
  }

  // STRICT AUTH GATE: User MUST sign up or log in before accessing lessons and courses
  if (!currentUser) {
    return <AuthGateView onLoginSuccess={handleLoginSuccess} />;
  }

  const currentA1Inicial = courseLanguage === 'es' ? spanishA1InicialLessons : a1InicialLessons;
  const currentA1Intermedio = courseLanguage === 'es' ? spanishA1IntermedioLessons : a1IntermedioLessons;
  const currentFluency = courseLanguage === 'es' ? spanishFluencyLessons : fluencyLessons;
  const currentFastTrackVocab = courseLanguage === 'es' ? spanishFastTrackVocab : fastTrackVocab;
  const currentFinalExamQuestions = courseLanguage === 'es' ? spanishFinalExamQuestions : finalExamQuestions;

  const allLessons = [...currentA1Inicial, ...currentA1Intermedio, ...currentFluency];
  const requiredLessonIds = allLessons.map(l => l.id);
  const totalLessonsCount = allLessons.length;
  const completedLessonsCount = progress.completedLessons.length;
  const masteredWordsCount = progress.masteredWords.length;
  const isExamUnlocked = requiredLessonIds.every(id => progress.completedLessons.includes(id)) || !!progress.examPassed;

  // Rank Level based on XP
  const userXP = progress.xp || 0;
  let userRank = courseLanguage === 'es' ? 'A1 Beginner' : 'Principiante A1';
  if (userXP >= 600) userRank = courseLanguage === 'es' ? 'A1 Master' : 'Maestro A1';
  else if (userXP >= 300) userRank = courseLanguage === 'es' ? 'A1 Explorer' : 'Explorador A1';
  else if (userXP >= 100) userRank = courseLanguage === 'es' ? 'A1 Student' : 'Estudiante A1';

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
          <div className="max-w-4xl mx-auto pt-8 pb-24 px-4">
            {/* Top User Bar / Teacher Portal Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
              <div className="flex items-center gap-2">
                {currentUser && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm text-xs font-medium">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center">
                      {currentUser.fullName.charAt(0)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100 leading-tight">{currentUser.fullName}</span>
                      <span className="text-[10px] text-zinc-400 font-mono leading-tight">{currentUser.studentIdNumber || currentUser.email}</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 capitalize font-bold ml-1">
                      {currentUser.role === 'teacher' 
                        ? (courseLanguage === 'es' ? 'Teacher' : 'Profesor') 
                        : (courseLanguage === 'es' ? 'Student' : 'Alumno')}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="ml-2 p-1 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
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
                  className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-zinc-950 text-xs font-black shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShieldCheck className="w-4 h-4 text-zinc-950" />
                  <span>{courseLanguage === 'es' ? 'Teacher Dashboard / Review' : 'Panel del Profesor / Revisión'}</span>
                </button>
              </div>
            </div>

            {/* Top Stats & Course Language Switcher Bar */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border-2 border-indigo-100 dark:border-zinc-800 rounded-3xl p-4 md:p-5 shadow-lg shadow-indigo-500/5 mb-8"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 font-black text-xl">
                  {courseLanguage === 'es' ? '🇪🇸' : '🇬🇧'}
                </div>
                <div>
                  <h2 className="font-black text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                    CesarTeach <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      {userRank}
                    </span>
                    {currentUser && (
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> {courseLanguage === 'es' ? 'Synced' : 'Sincronizado'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Course Selector & Stats */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Language Switcher Toggle */}
                <div className="bg-zinc-100 dark:bg-zinc-800 p-1 rounded-2xl flex items-center gap-1 border border-zinc-200 dark:border-zinc-700">
                  <button
                    onClick={() => handleToggleLanguage('es')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                      courseLanguage === 'es'
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <span>🇪🇸</span>
                    <span>{courseLanguage === 'es' ? 'Learn Spanish' : 'Español A1'}</span>
                  </button>
                  <button
                    onClick={() => handleToggleLanguage('en')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                      courseLanguage === 'en'
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>{courseLanguage === 'es' ? 'Learn English' : 'Inglés A1'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-amber-500 text-white font-black px-3 py-1.5 rounded-2xl text-xs shadow-md shadow-amber-500/20">
                  <Flame className="w-4 h-4 fill-white" />
                  <span>{progress.streakDays || 1}{courseLanguage === 'es' ? 'd streak' : 'd racha'}</span>
                </div>

                <div className="flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-black px-3 py-1.5 rounded-2xl text-xs">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>{userXP} XP</span>
                </div>

                <button
                  onClick={() => setIsNotebookOpen(true)}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black px-3.5 py-1.5 rounded-2xl text-xs shadow-md shadow-purple-500/20 transition-transform active:scale-95"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{courseLanguage === 'es' ? 'My Notebook' : 'Mi Cuaderno'}</span>
                </button>
              </div>
            </motion.div>

            {/* Hero Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-purple-500/15 relative overflow-hidden"
            >
              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-4">
                  <Globe className="w-4 h-4" />
                  <span>
                    {courseLanguage === 'es' ? 'Active Course: Spanish A1 (For English Speakers)' : 'Curso Activo: Inglés A1 (Para Hispanohablantes)'}
                  </span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4 leading-tight">
                  {courseLanguage === 'es' 
                    ? 'Learn A1 Spanish from scratch with step-by-step English guidance.'
                    : 'Domina el Nivel A1 de Inglés de principio a fin.'}
                </h1>
                <p className="text-white/90 text-base md:text-lg font-medium mb-6">
                  {courseLanguage === 'es'
                    ? 'Designed for English speakers: learn greetings, SER vs ESTAR, present tense conjugations, key vocabulary, and real-life conversations with CEFR A1 standards.'
                    : 'Supera los módulos de Fundamentos, Consolidación, Fluidez Conversacional y obtén tu Certificado Oficial de Aprobación.'}
                </p>

                {/* Course Switch Banner */}
                <div className="inline-flex items-center justify-center p-1.5 bg-black/20 backdrop-blur-lg rounded-2xl border border-white/20 gap-2">
                  <span className="text-xs font-bold px-2">{courseLanguage === 'es' ? 'Study path:' : 'Camino de estudio:'}</span>
                  <button
                    onClick={() => handleToggleLanguage('en')}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${courseLanguage === 'en' ? 'bg-white text-indigo-700 shadow-md' : 'text-white/80 hover:text-white'}`}
                  >
                    🇬🇧 Inglés A1
                  </button>
                  <button
                    onClick={() => handleToggleLanguage('es')}
                    className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${courseLanguage === 'es' ? 'bg-white text-amber-600 shadow-md' : 'text-white/80 hover:text-white'}`}
                  >
                    🇪🇸 Español A1
                  </button>
                </div>
              </div>
            </motion.div>

            {/* AI Powered Super Features Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
            >
              <div 
                onClick={() => setActiveTab('ai-tutor')}
                className="cursor-pointer bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 text-white rounded-3xl p-6 shadow-xl shadow-purple-500/20 flex items-center justify-between gap-4 transition-transform active:scale-[0.98] relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Bot className="w-5 h-5 text-indigo-200" />
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                      {courseLanguage === 'es' ? 'Gemini 3.6 Tutor' : 'Tutoría Gemini 3.6'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-1">{courseLanguage === 'es' ? 'Virtual Tutor Aria' : 'Tutoría Virtual Aria'}</h3>
                  <p className="text-xs text-white/90 font-medium">
                    {courseLanguage === 'es'
                      ? 'Practice Spanish conversations with live corrections in English and real-life scenarios.'
                      : 'Practica chat en inglés con correcciones en vivo en español y simulación de situaciones.'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              <div 
                onClick={() => setActiveTab('ai-tools')}
                className="cursor-pointer bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-3xl p-6 shadow-xl shadow-teal-500/20 flex items-center justify-between gap-4 transition-transform active:scale-[0.98] relative overflow-hidden group"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Wand2 className="w-5 h-5 text-teal-200" />
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                      {courseLanguage === 'es' ? 'AI Tools' : 'Herramientas IA'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-1">{courseLanguage === 'es' ? 'AI Sentence Analyzer & Vocab' : 'Analizador & Creador IA'}</h3>
                  <p className="text-xs text-white/90 font-medium">
                    {courseLanguage === 'es'
                      ? 'Analyze Spanish sentences word-by-word with English explanations and generate custom topic cards.'
                      : 'Analiza frases palabra por palabra y genera tarjetas de vocabulario de cualquier tema.'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            {/* Daily Challenge & Quick Practice Banners */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
            >
              <div 
                onClick={() => setIsDailyChallengeOpen(true)}
                className="cursor-pointer bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-3xl p-6 shadow-lg shadow-amber-500/20 flex items-center justify-between gap-4 transition-transform active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Flame className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                      {courseLanguage === 'es' ? 'Express Workout' : 'Entrenamiento Exprès'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-1">{courseLanguage === 'es' ? 'Daily A1 Challenge' : 'Desafío Diario A1'}</h3>
                  <p className="text-xs text-white/90 font-medium">
                    {courseLanguage === 'es' 
                      ? '3 random exercises to earn +110 XP and keep your daily streak alive.'
                      : '3 ejercicios aleatorios para ganar +110 XP y mantener tu racha activa.'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              <div 
                onClick={() => setIsVerbTrainerOpen(true)}
                className="cursor-pointer bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-3xl p-6 shadow-lg shadow-purple-500/20 flex items-center justify-between gap-4 transition-transform active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                      {courseLanguage === 'es' ? 'Grammar Booster' : 'Acelerador Gramatical'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-1">{courseLanguage === 'es' ? 'Key Verb Trainer' : 'Entrenador de Verbos Clave'}</h3>
                  <p className="text-xs text-white/90 font-medium">
                    {courseLanguage === 'es'
                      ? 'Interactive conjugations (Ser, Estar, Tener, Gustar, Querer, Ir, Poder) with audio and quizzes.'
                      : 'Conjugaciones interactivas (To Be, Have, Like, Want, Go, Can) con audio y quiz.'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              <div 
                onClick={() => setIsQuickPracticeOpen(true)}
                className="cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-3xl p-6 shadow-lg shadow-emerald-500/20 flex items-center justify-between gap-4 transition-transform active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star className="w-5 h-5 text-emerald-200 fill-emerald-200" />
                    <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                      {courseLanguage === 'es' ? 'Quick Review' : 'Repaso Rápido'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-1">{courseLanguage === 'es' ? '5-Minute Practice' : 'Práctica 5 Minutos'}</h3>
                  <p className="text-xs text-white/90 font-medium">
                    {courseLanguage === 'es'
                      ? '5 fast questions to strengthen Spanish vocabulary, phrasebook, and listening skills.'
                      : '5 preguntas rápidas para reforzar vocabulario, frases y escucha.'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>

              <div 
                onClick={() => setIsNotebookOpen(true)}
                className="cursor-pointer bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-3xl p-6 shadow-lg shadow-sky-500/20 flex items-center justify-between gap-4 transition-transform active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Compass className="w-5 h-5 text-sky-200" />
                    <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                      {courseLanguage === 'es' ? 'A1 Audio Phrases' : 'Frases & Audios A1'}
                    </span>
                  </div>
                  <h3 className="text-xl font-black mb-1">{courseLanguage === 'es' ? 'Survival Phrasebook' : 'Guía de Supervivencia'}</h3>
                  <p className="text-xs text-white/90 font-medium">
                    {courseLanguage === 'es'
                      ? '18 key Spanish phrases with audio, phonetics, and speech recognition practice.'
                      : '18 frases clave con audio, fonética y práctica de voz para viajes y restaurantes.'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </motion.div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Module 1: A1 Inicial */}
              <motion.div 
                role="button"
                tabIndex={0}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('a1-inicial')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab('a1-inicial'); }}
                className="cursor-pointer flex flex-col text-left p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-sky-100 dark:border-zinc-800 shadow-xl shadow-sky-500/5 hover:border-sky-400 transition-all group relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-gradient-to-tr from-sky-400 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-sky-500/30 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 mb-1">
                  {courseLanguage === 'es' ? 'Module 1 • Foundations' : 'Módulo 1 • Fundamentos'}
                </span>
                <h3 className="text-xl font-black mb-2 text-zinc-900 dark:text-zinc-100">
                  {courseLanguage === 'es' ? 'A1 Beginner Spanish' : 'A1 Inicial'}
                </h3>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-6 flex-1">
                  {courseLanguage === 'es'
                    ? 'Greetings, numbers, pronouns, SER vs ESTAR, question words, family, and gender articles.'
                    : 'Saludos, números, pronombre, verbo To Be, preguntas W/H, familia y artículos.'}
                </p>
                <div className="flex items-center justify-between text-xs font-extrabold text-sky-600 dark:text-sky-400 pt-3 border-t border-sky-50 dark:border-zinc-800">
                  <span>{a1InicialLessons.length} {courseLanguage === 'es' ? 'Lessons' : 'Lecciones'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Module 2: A1 Intermedio */}
              <motion.div 
                role="button"
                tabIndex={0}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('a1-intermedio')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab('a1-intermedio'); }}
                className="cursor-pointer flex flex-col text-left p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-purple-100 dark:border-zinc-800 shadow-xl shadow-purple-500/5 hover:border-purple-400 transition-all group relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-gradient-to-tr from-purple-500 to-pink-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1">
                  {courseLanguage === 'es' ? 'Module 2 • Consolidation' : 'Módulo 2 • Consolidación'}
                </span>
                <h3 className="text-xl font-black mb-2 text-zinc-900 dark:text-zinc-100">
                  {courseLanguage === 'es' ? 'A1 Intermediate Spanish' : 'A1 Intermedio'}
                </h3>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-6 flex-1">
                  {courseLanguage === 'es'
                    ? 'Present tense -AR/-ER/-IR conjugations, GUSTAR, house vocabulary, PODER/QUERER, dining.'
                    : 'Presente simple, adverbios, gustos, la casa, CAN/CAN\'T, comida y compras.'}
                </p>
                <div className="flex items-center justify-between text-xs font-extrabold text-purple-600 dark:text-purple-400 pt-3 border-t border-purple-50 dark:border-zinc-800">
                  <span>{a1IntermedioLessons.length} {courseLanguage === 'es' ? 'Lessons' : 'Lecciones'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Module 3: Fluidez Conversacional */}
              <motion.div 
                role="button"
                tabIndex={0}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('fluency')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab('fluency'); }}
                className="cursor-pointer flex flex-col text-left p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-emerald-100 dark:border-zinc-800 shadow-xl shadow-emerald-500/5 hover:border-emerald-400 transition-all group relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-gradient-to-tr from-emerald-400 to-teal-600 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                  {courseLanguage === 'es' ? 'Module 3 • Real Practice' : 'Módulo 3 • Práctica Real'}
                </span>
                <h3 className="text-xl font-black mb-2 text-zinc-900 dark:text-zinc-100">
                  {courseLanguage === 'es' ? 'A1 Spanish Fluency' : 'Fluidez A1'}
                </h3>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-6 flex-1">
                  {courseLanguage === 'es'
                    ? 'Real dialogues in cafes, restaurants, hotels, asking for directions, and meeting friends.'
                    : 'Diálogos en restaurantes, hoteles, pedir direcciones y romper el hielo.'}
                </p>
                <div className="flex items-center justify-between text-xs font-extrabold text-emerald-600 dark:text-emerald-400 pt-3 border-t border-emerald-50 dark:border-zinc-800">
                  <span>{fluencyLessons.length} {courseLanguage === 'es' ? 'Scenarios' : 'Escenarios'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Module 4: Flashcards / Vocabulario */}
              <motion.div 
                role="button"
                tabIndex={0}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('flashcards')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab('flashcards'); }}
                className="cursor-pointer flex flex-col text-left p-6 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-amber-100 dark:border-zinc-800 shadow-xl shadow-amber-500/5 hover:border-amber-400 transition-all group relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-gradient-to-tr from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 fill-white" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                  {courseLanguage === 'es' ? 'Flashcards • Fast Track' : 'Flashcards • Rápido'}
                </span>
                <h3 className="text-xl font-black mb-2 text-zinc-900 dark:text-zinc-100">
                  {courseLanguage === 'es' ? 'Core Spanish Vocab' : 'Vocabulario Clave'}
                </h3>
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-6 flex-1">
                  {courseLanguage === 'es'
                    ? 'Accelerated memorization of the most frequent A1 Spanish words with 3D cards.'
                    : 'Memorización acelerada de las palabras más usadas del nivel A1.'}
                </p>
                <div className="flex items-center justify-between text-xs font-extrabold text-amber-600 dark:text-amber-400 pt-3 border-t border-amber-50 dark:border-zinc-800">
                  <span>{fastTrackVocab.length} {courseLanguage === 'es' ? '3D Cards' : 'Tarjetas 3D'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Module 5: Examen Final A1 */}
              <motion.div 
                role="button"
                tabIndex={0}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab('exam')}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveTab('exam'); }}
                className={`cursor-pointer md:col-span-2 lg:col-span-2 flex flex-col sm:flex-row items-center gap-6 text-left p-6 md:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group ${
                  isExamUnlocked 
                    ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-orange-500/20' 
                    : 'bg-gradient-to-r from-slate-700 via-zinc-800 to-zinc-900 shadow-zinc-900/30 border border-zinc-700'
                }`}
              >
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 ${
                    isExamUnlocked ? 'bg-black/20 backdrop-blur-md text-white' : 'bg-rose-500/30 text-rose-200 border border-rose-400/30'
                  }`}>
                    {isExamUnlocked 
                      ? (courseLanguage === 'es' ? '🏆 Final Approval Exam' : '🏆 Examen de Aprobación Final') 
                      : (courseLanguage === 'es' ? `🔒 Locked (${completedLessonsCount}/${totalLessonsCount} Lessons)` : `🔒 Bloqueado (${completedLessonsCount}/${totalLessonsCount} Lecciones)`)}
                  </span>
                  <h3 className="text-2xl font-black mb-1">
                    {courseLanguage === 'es' ? 'A1 Spanish Certification' : 'Certificación Nivel A1'}
                  </h3>
                  <p className="text-white/90 text-xs font-medium leading-relaxed">
                    {isExamUnlocked 
                      ? (courseLanguage === 'es' 
                        ? '15-question comprehensive exam evaluating all 3 modules. Pass with +80% to earn your Official A1 Certificate!' 
                        : 'Examen integral de 15 preguntas que evalúa los 3 módulos del nivel. ¡Aprueba con +80% para obtener tu Certificado Oficial de A1!')
                      : (courseLanguage === 'es'
                        ? 'Complete all lessons in Beginner, Intermediate, and Fluency modules to unlock the final exam and certificate.'
                        : 'Debes completar todas las lecciones de A1 Inicial, Intermedio y Fluidez para desbloquear la evaluación final y tu certificado.')}
                  </p>
                </div>
                <div className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs shadow-md shrink-0 ${
                  isExamUnlocked ? 'bg-white text-orange-600' : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                }`}>
                  <span>
                    {isExamUnlocked 
                      ? (progress.examPassed ? (courseLanguage === 'es' ? 'View Certificate' : 'Ver Certificado') : (courseLanguage === 'es' ? 'Take Exam' : 'Tomar Examen')) 
                      : (courseLanguage === 'es' ? 'View Requirements' : 'Ver Requisitos')}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
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
              title={courseLanguage === 'es' ? "A1 Beginner: Spanish Foundations" : "A1 Inicial: Fundamentos"}
              description={courseLanguage === 'es' ? "Learn greetings, pronouns, SER vs ESTAR, numbers, family, and essential phrases in Spanish." : "Aprende saludos, números, To Be, pronombres, familia y estructuras de inicio."}
              levelBadge={courseLanguage === 'es' ? "Module 1 • A1 Foundations" : "Módulo 1 • Fundamentos A1"}
              themeGradient="from-sky-500 via-blue-600 to-indigo-600"
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
              title={courseLanguage === 'es' ? "A1 Intermediate: Spanish Consolidation" : "A1 Intermedio: Consolidación"}
              description={courseLanguage === 'es' ? "Master present tense, verb GUSTAR, house vocabulary, PODER/QUERER, and shopping in Spanish." : "Domina presente simple, adverbios, gustos, la casa, CAN/CAN'T, comida y compras."}
              levelBadge={courseLanguage === 'es' ? "Module 2 • A1 Consolidation" : "Módulo 2 • Consolidación A1"}
              themeGradient="from-purple-600 via-violet-600 to-pink-600"
              accentColor="purple"
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
              title={courseLanguage === 'es' ? "A1 Fluency: Spanish Conversation" : "Fluidez: Práctica Conversacional"}
              description={courseLanguage === 'es' ? "Real dialogue scenarios in cafes, hotels, asking directions, and making friends in Spanish-speaking countries." : "Escenarios de diálogo real en cafeterías, hoteles, calles y situaciones cotidianas."}
              levelBadge={courseLanguage === 'es' ? "Module 3 • Real Practice" : "Módulo 3 • Conversación Real"}
              themeGradient="from-emerald-500 via-teal-600 to-cyan-600"
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
              requiredLessonIds={requiredLessonIds}
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/70 via-sky-50/50 to-emerald-50/70 dark:from-zinc-950 dark:via-indigo-950/20 dark:to-zinc-950 font-sans selection:bg-indigo-500 selection:text-white transition-colors">
      <main className="pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + courseLanguage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Auth Modal for Student and Teacher registration/sign-in */}
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
        onCompleteChallenge={(earnedXp) => addXP(earnedXp)}
        courseLanguage={courseLanguage}
      />

      {/* Verb Trainer Modal */}
      <VerbTrainerModal
        isOpen={isVerbTrainerOpen}
        onClose={() => setIsVerbTrainerOpen(false)}
        onAddXP={(earnedXp) => addXP(earnedXp)}
        courseLanguage={courseLanguage}
      />

      {/* Quick Practice Modal */}
      <QuickPracticeModal
        isOpen={isQuickPracticeOpen}
        onClose={() => setIsQuickPracticeOpen(false)}
        onAddXP={(earnedXp) => addXP(earnedXp)}
        courseLanguage={courseLanguage}
      />

      {/* Bottom Floating Navigation */}
      <nav className="fixed bottom-4 left-3 right-3 max-w-2xl mx-auto bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-2 border-indigo-100 dark:border-zinc-800 rounded-3xl p-1.5 shadow-2xl shadow-indigo-500/10 z-40">
        <div className="flex justify-around items-center gap-1">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-2xl transition-all ${
              activeTab === 'home' 
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/30 scale-105' 
                : 'text-zinc-500 hover:text-indigo-600 dark:hover:text-zinc-200'
            }`}
          >
            <HomeIcon className="w-4 h-4" />
            <span className="text-[9px] uppercase font-black tracking-wider">
              {courseLanguage === 'es' ? 'Home' : 'Inicio'}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('a1-inicial')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all ${
              activeTab === 'a1-inicial' 
                ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/30 scale-105' 
                : 'text-zinc-500 hover:text-sky-600 dark:hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="text-[9px] uppercase font-black tracking-wider">
              {courseLanguage === 'es' ? 'Beginner' : 'A1 Inicial'}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('a1-intermedio')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all ${
              activeTab === 'a1-intermedio' 
                ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/30 scale-105' 
                : 'text-zinc-500 hover:text-purple-600 dark:hover:text-zinc-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-[9px] uppercase font-black tracking-wider">
              {courseLanguage === 'es' ? 'Interm.' : 'A1 Interm.'}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('fluency')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all ${
              activeTab === 'fluency' 
                ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-500/30 scale-105' 
                : 'text-zinc-500 hover:text-emerald-600 dark:hover:text-zinc-200'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[9px] uppercase font-black tracking-wider">
              {courseLanguage === 'es' ? 'Fluency' : 'Fluidez'}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('ai-tutor')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all ${
              activeTab === 'ai-tutor' 
                ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/30 scale-105' 
                : 'text-zinc-500 hover:text-indigo-600 dark:hover:text-zinc-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span className="text-[9px] uppercase font-black tracking-wider">
              {courseLanguage === 'es' ? 'AI Tutor' : 'Tutor IA'}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('ai-tools')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all ${
              activeTab === 'ai-tools' 
                ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-500/30 scale-105' 
                : 'text-zinc-500 hover:text-teal-600 dark:hover:text-zinc-200'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span className="text-[9px] uppercase font-black tracking-wider">
              {courseLanguage === 'es' ? 'AI Tools' : 'Herram. IA'}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('flashcards')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all ${
              activeTab === 'flashcards' 
                ? 'bg-amber-500 text-white font-bold shadow-md shadow-amber-500/30 scale-105' 
                : 'text-zinc-500 hover:text-amber-600 dark:hover:text-zinc-200'
            }`}
          >
            <Zap className="w-4 h-4 fill-current" />
            <span className="text-[9px] uppercase font-black tracking-wider">
              {courseLanguage === 'es' ? 'Vocab' : 'Vocabulario'}
            </span>
          </button>

          <button 
            onClick={() => setActiveTab('exam')}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all ${
              activeTab === 'exam' 
                ? 'bg-red-500 text-white font-bold shadow-md shadow-red-500/30 scale-105' 
                : 'text-zinc-500 hover:text-red-600 dark:hover:text-zinc-200'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="text-[9px] uppercase font-black tracking-wider">
              {courseLanguage === 'es' ? 'Exam' : 'Examen'}
            </span>
          </button>

          {/* Teacher review shortcut */}
          <button 
            onClick={handleOpenTeacherPortal}
            className={`flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-2xl transition-all ${
              activeTab === 'teacher-dashboard' 
                ? 'bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/30 scale-105' 
                : 'text-amber-600 dark:text-amber-400 hover:text-amber-700'
            }`}
            title="Panel de Profesor"
          >
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[9px] uppercase font-black tracking-wider">
              {courseLanguage === 'es' ? 'Teacher' : 'Docente'}
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}
