import React, { useState } from 'react';
import { QuizQuestion, UserProgress, SectionTab, UserProfile, CEFRLevel } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Lock,
  RefreshCw,
  Trophy,
  Volume2,
  ShieldCheck,
  Download,
  AlertTriangle,
  BookOpen,
  Layers,
  MessageSquare,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';
import { randomizeQuestionsOptions } from '../utils/shuffleOptions';

interface FinalExamViewProps {
  questions: QuizQuestion[];
  a2Questions?: QuizQuestion[];
  b1Questions?: QuizQuestion[];
  b2Questions?: QuizQuestion[];
  requiredLessonIds: string[];
  a2RequiredLessonIds?: string[];
  b1RequiredLessonIds?: string[];
  b2RequiredLessonIds?: string[];
  progress: UserProgress;
  onExamComplete: (scorePercent: number, passed: boolean, level?: CEFRLevel) => void;
  onNavigate?: (tab: SectionTab) => void;
  courseLanguage?: 'en' | 'es';
  currentUser?: UserProfile | null;
}

export function FinalExamView({
  questions,
  a2Questions = [],
  b1Questions = [],
  b2Questions = [],
  requiredLessonIds,
  a2RequiredLessonIds = [],
  b1RequiredLessonIds = [],
  b2RequiredLessonIds = [],
  progress,
  onExamComplete,
  onNavigate,
  courseLanguage = 'es',
  currentUser
}: FinalExamViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const [userName, setUserName] = useState<string>(
    currentUser?.fullName || (courseLanguage === 'es' ? 'CesarTeach Student' : 'Estudiante de CesarTeach')
  );
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [examState, setExamState] = useState<'intro' | 'taking' | 'result'>('intro');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [examAttemptSeed, setExamAttemptSeed] = useState<number>(0);

  const isSpanishTarget = courseLanguage === 'es';
  const badges = progress.unlockedBadges || [];
  const isA1Certified = Boolean(progress.examPassed || badges.includes('b_cert_a1'));
  const isA2Certified = Boolean(badges.includes('b_cert_a2'));
  const isB1Certified = Boolean(badges.includes('b_cert_b1'));
  const isB2Certified = Boolean(badges.includes('b_cert_b2'));

  const baseActiveQuestions =
    selectedLevel === 'B2' && b2Questions.length > 0
      ? b2Questions
      : selectedLevel === 'B1' && b1Questions.length > 0
        ? b1Questions
        : selectedLevel === 'A2' && a2Questions.length > 0
          ? a2Questions
          : questions;

  const activeQuestions = React.useMemo(
    () => randomizeQuestionsOptions(baseActiveQuestions),
    [baseActiveQuestions, selectedLevel, courseLanguage, examAttemptSeed]
  );

  const activeRequiredIds =
    selectedLevel === 'B2' && b2RequiredLessonIds.length > 0
      ? b2RequiredLessonIds
      : selectedLevel === 'B1' && b1RequiredLessonIds.length > 0
        ? b1RequiredLessonIds
        : selectedLevel === 'A2' && a2RequiredLessonIds.length > 0
          ? a2RequiredLessonIds
          : requiredLessonIds;

  const totalRequired = activeRequiredIds.length;
  const completedRequiredCount = activeRequiredIds.filter(id => progress.completedLessons.includes(id)).length;

  const hasPrerequisiteCert =
    selectedLevel === 'A1'
      ? true
      : selectedLevel === 'A2'
        ? isA1Certified
        : selectedLevel === 'B1'
          ? isA2Certified
          : isB1Certified;

  const isCurrentLevelAlreadyCertified =
    (selectedLevel === 'A1' && isA1Certified) ||
    (selectedLevel === 'A2' && isA2Certified) ||
    (selectedLevel === 'B1' && isB1Certified) ||
    (selectedLevel === 'B2' && isB2Certified);

  const isFullyUnlocked =
    hasPrerequisiteCert && (completedRequiredCount >= totalRequired || isCurrentLevelAlreadyCertified);
  const completionPercent = totalRequired > 0 ? Math.round((completedRequiredCount / totalRequired) * 100) : 0;

  const currentQuestion = activeQuestions[currentIdx];

  const handleStartExam = () => {
    if (!isFullyUnlocked) return;
    playTactileSound('flip');
    setExamAttemptSeed(s => s + 1);
    setCurrentIdx(0);
    setUserAnswers({});
    setSelectedOption(null);
    setExamState('taking');
  };

  const handleSelectOption = (option: string) => {
    playTactileSound('pop');
    setSelectedOption(option);
    setUserAnswers(prev => ({ ...prev, [currentIdx]: option }));
  };

  const handleNext = () => {
    if (currentIdx < activeQuestions.length - 1) {
      playTactileSound('flip');
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(userAnswers[currentIdx + 1] || null);
    } else {
      let correctCount = 0;
      activeQuestions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });
      const score = Math.round((correctCount / activeQuestions.length) * 100);
      const passed = score >= 80;
      playTactileSound(passed ? 'win' : 'error');
      onExamComplete(score, passed, selectedLevel);
      setExamState('result');
    }
  };

  const speakText = (text: string) => {
    playSpeech(text, {
      courseLanguage,
      rate: 0.9
    });
  };

  let scoreCount = 0;
  activeQuestions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctAnswer) {
      scoreCount++;
    }
  });
  const scorePercent = activeQuestions.length > 0 ? Math.round((scoreCount / activeQuestions.length) * 100) : 0;
  const isPassed = scorePercent >= 80 || isCurrentLevelAlreadyCertified;

  const examTabs: { level: CEFRLevel; label: string; unlocked: boolean; reqLabel: string; activeBg: string }[] = [
    {
      level: 'A1',
      label: isSpanishTarget ? 'CEFR A1' : 'Certificado A1',
      unlocked: true,
      reqLabel: '',
      activeBg: 'bg-yellow-300 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
    },
    {
      level: 'A2',
      label: isSpanishTarget ? 'CEFR A2' : 'Certificado A2',
      unlocked: isA1Certified,
      reqLabel: isSpanishTarget ? 'Req. A1' : 'Req. A1',
      activeBg: 'bg-emerald-300 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
    },
    {
      level: 'B1',
      label: isSpanishTarget ? 'CEFR B1' : 'Certificado B1',
      unlocked: isA2Certified,
      reqLabel: isSpanishTarget ? 'Req. A2' : 'Req. A2',
      activeBg: 'bg-sky-300 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
    },
    {
      level: 'B2',
      label: isSpanishTarget ? 'CEFR B2 (Mastery)' : 'Certificado B2 (Avanzado)',
      unlocked: isB1Certified,
      reqLabel: isSpanishTarget ? 'Req. B1' : 'Req. B1',
      activeBg: 'bg-rose-300 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
    }
  ];

  return (
    <div className="max-w-3xl mx-auto pb-24 px-4">
      {/* Level Selector Bar (A1 → A2 → B1 → B2 Certification Chain) */}
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap justify-center p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] gap-1.5">
          {examTabs.map(tab => (
            <button
              key={tab.level}
              type="button"
              disabled={!tab.unlocked}
              onClick={() => {
                if (!tab.unlocked) return;
                playTactileSound('pop');
                setSelectedLevel(tab.level);
                setExamState('intro');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                !tab.unlocked
                  ? 'bg-slate-100 dark:bg-zinc-800/60 text-slate-400 dark:text-zinc-500 cursor-not-allowed opacity-70'
                  : selectedLevel === tab.level
                    ? tab.activeBg
                    : 'text-slate-700 dark:text-zinc-300 hover:bg-amber-100 dark:hover:bg-zinc-800'
              }`}
            >
              {tab.unlocked ? <GraduationCap className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
              <span>
                {tab.label} {!tab.unlocked && `(${tab.reqLabel})`}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {examState === 'intro' && (
          <motion.div
            key={`intro-${selectedLevel}`}
            initial={{ opacity: 0, y: 14, rotate: -0.4 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a] text-center"
          >
            <div
              className={`w-20 h-20 rounded-2xl border-2 border-slate-900 flex items-center justify-center mx-auto mb-5 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950 ${
                selectedLevel === 'B2'
                  ? 'bg-rose-300'
                  : selectedLevel === 'B1'
                    ? 'bg-sky-300'
                    : selectedLevel === 'A2'
                      ? 'bg-emerald-300'
                      : 'bg-yellow-300'
              }`}
            >
              <Trophy className="w-10 h-10" />
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-2">
              {isSpanishTarget
                ? `Official CEFR ${selectedLevel} Assessment`
                : `Evaluación Oficial Marco Común Europeo · Nivel ${selectedLevel}`}
            </p>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-zinc-100 mb-3">
              {isSpanishTarget
                ? `CEFR ${selectedLevel} Spanish Proficiency Exam`
                : `Examen Oficial de Certificación Nivel ${selectedLevel}`}
            </h1>

            <p className="text-slate-600 dark:text-zinc-400 font-medium text-sm md:text-base max-w-lg mx-auto mb-8">
              {selectedLevel === 'B2'
                ? isSpanishTarget
                  ? 'Validate your advanced mastery of Imperfect Subjunctive, Past Counterfactuals, Verbal Periphrases, and Executive Spanish.'
                  : 'Valida tu dominio avanzado: Third Conditional, Future Perfect, Inversiones Enfáticas, Causativo y Registro Ejecutivo B2.'
                : selectedLevel === 'B1'
                  ? isSpanishTarget
                    ? 'Validate your independent proficiency in Present Subjunctive, Conditional, Imperative, Pluscuamperfecto, and Double Object Pronouns.'
                    : 'Valida tu independencia comunicativa: Second Conditional, Present Perfect Continuous, Voz Pasiva, Reported Speech y Phrasal Verbs.'
                  : selectedLevel === 'A2'
                    ? isSpanishTarget
                      ? 'Validate your mastery of past tenses (Indefinido vs Imperfecto), future plans, object pronouns, and Por vs Para.'
                      : 'Evalúa tu dominio del Past Simple, Past Continuous, Comparativos, Futuro, Present Perfect, Modales y First Conditional.'
                    : isSpanishTarget
                      ? 'Evaluate your knowledge across Beginner, Intermediate, and Conversational Fluency modules to earn your A1 diploma.'
                      : 'Evalúa tus conocimientos de A1 Inicial, A1 Intermedio y Fluidez Conversacional para certificar tu nivel A1.'}
            </p>

            {/* Unlock Status Card */}
            <div
              className={`p-6 rounded-2xl mb-8 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] text-left ${
                isFullyUnlocked
                  ? 'bg-emerald-100/80 dark:bg-emerald-950/30'
                  : 'bg-[#FAF6EE] dark:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-sm flex items-center gap-2 text-slate-900 dark:text-zinc-100">
                  {isFullyUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-500" />
                  )}
                  {isFullyUnlocked
                    ? isSpanishTarget
                      ? `Level ${selectedLevel} Exam Unlocked!`
                      : `¡Examen ${selectedLevel} Desbloqueado!`
                    : isSpanishTarget
                      ? `Prerequisite: Complete ${selectedLevel} Curriculum`
                      : `Requisito Curricular Nivel ${selectedLevel}`}
                </span>
                <span className="text-xs font-black text-slate-700 dark:text-zinc-300 tabular-nums">
                  {completedRequiredCount} / {totalRequired} {isSpanishTarget ? 'Lessons' : 'Lecciones'}
                </span>
              </div>

              <p className="text-xs font-bold text-slate-700 dark:text-zinc-300 mb-4 leading-relaxed">
                {isFullyUnlocked
                  ? isSpanishTarget
                    ? `You have completed all required ${selectedLevel} lessons. Score 80% or higher to earn your official ${selectedLevel} certificate and unlock the next CEFR level.`
                    : `Has completado las lecciones requeridas del nivel ${selectedLevel}. Obtén 80% o más para recibir tu certificado oficial y desbloquear el siguiente nivel.`
                  : isSpanishTarget
                    ? `Complete all ${totalRequired} lessons in the CEFR ${selectedLevel} module to unlock this certification exam.`
                    : `Completa todas las ${totalRequired} lecciones del Módulo ${selectedLevel} para desbloquear este examen de certificación.`}
              </p>

              <div className="h-3.5 w-full bg-white dark:bg-zinc-700 rounded-full overflow-hidden mb-5 border-2 border-slate-900 dark:border-zinc-600 p-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isFullyUnlocked ? 'bg-emerald-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${completionPercent}%` }}
                />
              </div>

              {/* Quick Navigation to Modules */}
              {onNavigate && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-900/15 dark:border-zinc-700/80">
                  <button
                    type="button"
                    onClick={() => onNavigate('a1-inicial')}
                    className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 hover:bg-yellow-200 transition-colors text-left flex items-center justify-between shadow-[2px_2px_0px_0px_#0f172a]"
                  >
                    <span className="text-xs font-black text-slate-900 dark:text-zinc-200">1. Nivel A1</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-900 dark:text-zinc-200" />
                  </button>

                  <button
                    type="button"
                    disabled={!isA1Certified}
                    onClick={() => {
                      if (!isA1Certified) return;
                      onNavigate('a2-plataforma');
                    }}
                    className={`p-2.5 rounded-xl border-2 transition-colors text-left flex items-center justify-between ${
                      isA1Certified
                        ? 'bg-white dark:bg-zinc-900 border-slate-900 dark:border-zinc-700 hover:bg-emerald-200 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-slate-100 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-800 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-900 dark:text-zinc-200 flex items-center gap-1">
                      {!isA1Certified && <Lock className="w-3 h-3" />}
                      2. Nivel A2
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-900 dark:text-zinc-200" />
                  </button>

                  <button
                    type="button"
                    disabled={!isA2Certified}
                    onClick={() => {
                      if (!isA2Certified) return;
                      onNavigate('b1-umbral');
                    }}
                    className={`p-2.5 rounded-xl border-2 transition-colors text-left flex items-center justify-between ${
                      isA2Certified
                        ? 'bg-white dark:bg-zinc-900 border-slate-900 dark:border-zinc-700 hover:bg-sky-200 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-slate-100 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-800 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-900 dark:text-zinc-200 flex items-center gap-1">
                      {!isA2Certified && <Lock className="w-3 h-3" />}
                      3. Nivel B1
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-900 dark:text-zinc-200" />
                  </button>

                  <button
                    type="button"
                    disabled={!isB1Certified}
                    onClick={() => {
                      if (!isB1Certified) return;
                      onNavigate('b2-avanzado');
                    }}
                    className={`p-2.5 rounded-xl border-2 transition-colors text-left flex items-center justify-between ${
                      isB1Certified
                        ? 'bg-white dark:bg-zinc-900 border-slate-900 dark:border-zinc-700 hover:bg-rose-200 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-slate-100 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-800 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-xs font-black text-slate-900 dark:text-zinc-200 flex items-center gap-1">
                      {!isB1Certified && <Lock className="w-3 h-3" />}
                      4. Nivel B2
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-900 dark:text-zinc-200" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isFullyUnlocked ? (
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98, x: 2, y: 2 }}
                  onClick={handleStartExam}
                  className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base rounded-2xl border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>
                    {isSpanishTarget
                      ? `Deal ${selectedLevel} Exam Deck (${activeQuestions.length} Cards)`
                      : `Repartir Mazo de Examen ${selectedLevel} (${activeQuestions.length} Cartas)`}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="w-full sm:w-auto px-8 py-4 bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 font-bold text-base rounded-2xl cursor-not-allowed border-2 border-slate-300 dark:border-zinc-700 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  <span>
                    {isSpanishTarget
                      ? `Locked (${completedRequiredCount}/${totalRequired} Lessons Completed)`
                      : `Bloqueado (${completedRequiredCount}/${totalRequired} Lecciones Completadas)`}
                  </span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {examState === 'taking' && currentQuestion && (
          <motion.div
            key={`question-${currentIdx}`}
            initial={{ opacity: 0, x: 28, rotate: 0.8 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -28, rotate: -0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a]"
          >
            {/* Header / Progress */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-slate-900/15 dark:border-zinc-800">
              <span className="px-3 py-1 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 text-xs font-black flex items-center gap-1.5 tabular-nums shadow-[2px_2px_0px_0px_#0f172a]">
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {selectedLevel} · {isSpanishTarget ? 'Card' : 'Carta'} {currentIdx + 1} / {activeQuestions.length}
                </span>
              </span>

              <div className="w-36 h-3.5 bg-amber-100 dark:bg-zinc-800 rounded-full overflow-hidden border-2 border-slate-900 dark:border-zinc-600 p-0.5">
                <motion.div
                  className="h-full bg-indigo-600 rounded-full"
                  animate={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="p-5 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex items-start justify-between gap-3 mb-7">
              <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-zinc-100 leading-snug">
                {currentQuestion.question}
              </h3>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                onClick={() => speakText(currentQuestion.question)}
                title="Listen"
                className="p-3 rounded-xl bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0"
              >
                <Volume2 className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Options list */}
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === option;
                const optionLetter = String.fromCharCode(65 + idx);

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center gap-2.5 w-full"
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectOption(option)}
                      className={`flex-1 text-left p-4 md:p-5 rounded-2xl border-2 font-extrabold text-base transition-all flex items-center gap-3 shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] ${
                        isSelected
                          ? 'border-slate-900 bg-yellow-300 text-slate-950'
                          : 'border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-slate-900 dark:text-zinc-100 hover:bg-amber-100 dark:hover:bg-zinc-800'
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center shrink-0 border-2 border-slate-900 ${
                          isSelected
                            ? 'bg-slate-950 text-yellow-300'
                            : 'bg-amber-100 dark:bg-zinc-900 text-slate-950 dark:text-white'
                        }`}
                      >
                        {optionLetter}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-lg bg-white text-slate-950 border border-slate-900 text-xs font-black">
                          ✓ {optionLetter}
                        </span>
                      )}
                    </button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.92 }}
                      onClick={() => speakText(option)}
                      title="Listen"
                      className="p-4 rounded-2xl border-2 border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-yellow-200 text-slate-900 dark:text-zinc-200 shadow-[3px_3px_0px_0px_#0f172a] transition-colors shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-slate-900/15 dark:border-zinc-800">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => {
                  playTactileSound('flip');
                  setCurrentIdx(prev => prev - 1);
                  setSelectedOption(userAnswers[currentIdx - 1] || null);
                }}
                className="px-5 py-3 rounded-xl font-black text-sm border-2 border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-200 disabled:opacity-30 shadow-[2px_2px_0px_0px_#0f172a] transition-colors"
              >
                {isSpanishTarget ? 'Previous Card' : 'Carta Anterior'}
              </button>

              <motion.button
                type="button"
                whileHover={selectedOption ? { y: -2 } : undefined}
                whileTap={selectedOption ? { scale: 0.98, x: 2, y: 2 } : undefined}
                disabled={!selectedOption}
                onClick={handleNext}
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-black text-sm rounded-xl border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] flex items-center gap-2 transition-colors"
              >
                <span>
                  {currentIdx < activeQuestions.length - 1
                    ? isSpanishTarget
                      ? 'Next Exam Card'
                      : 'Siguiente Carta'
                    : isSpanishTarget
                      ? 'Submit & Stamp Exam'
                      : 'Entregar y Sellar Examen'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {examState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl text-center"
          >
            {isPassed ? (
              <div>
                <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md text-white">
                  <Trophy className="w-10 h-10" />
                </div>

                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-zinc-100 mb-2">
                  {isSpanishTarget
                    ? `Congratulations! CEFR ${selectedLevel} Certified`
                    : `¡Felicidades! Nivel ${selectedLevel} Certificado`}
                </h2>
                <p className="text-slate-600 dark:text-zinc-400 font-medium text-base max-w-md mx-auto mb-8">
                  {isSpanishTarget ? 'Final Score:' : 'Calificación obtenida:'}{' '}
                  <strong className="text-emerald-600 dark:text-emerald-400 font-black tabular-nums">
                    {scorePercent}%
                  </strong>
                </p>

                {/* Printable Certificate Card */}
                <div className="relative bg-slate-50 dark:bg-zinc-950 border-2 border-amber-400 dark:border-amber-700 rounded-3xl p-8 md:p-12 mb-8 shadow-lg text-center">
                  <div className="flex justify-center mb-4">
                    <Award className="w-14 h-14 text-amber-500" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">
                    {isSpanishTarget ? 'OFFICIAL CERTIFICATE OF PROFICIENCY' : 'CERTIFICADO OFICIAL DE APROBACIÓN'}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-zinc-100 mb-6 font-serif">
                    {isSpanishTarget
                      ? `CEFR Level ${selectedLevel} — Spanish Language`
                      : `Marco Común Europeo — Nivel ${selectedLevel} (Inglés)`}
                  </h3>

                  <p className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2">
                    {isSpanishTarget ? 'Awarded to:' : 'Otorgado a:'}
                  </p>

                  {isEditingName ? (
                    <div className="flex items-center justify-center gap-2 max-w-xs mx-auto mb-6">
                      <input
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        className="px-4 py-2 border border-amber-400 rounded-xl text-center font-bold text-lg text-slate-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 w-full"
                      />
                      <button
                        type="button"
                        onClick={() => setIsEditingName(false)}
                        className="px-4 py-2 bg-amber-500 text-white font-bold rounded-xl text-xs"
                      >
                        OK
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsEditingName(true)}
                      className="cursor-pointer inline-flex items-center gap-2 text-2xl md:text-3xl font-black text-indigo-700 dark:text-indigo-300 border-b border-indigo-300 pb-1 mb-6"
                    >
                      <span>{userName}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-around gap-4 pt-6 border-t border-slate-200 dark:border-zinc-800 text-xs font-bold text-slate-700 dark:text-zinc-300 tabular-nums">
                    <div>
                      <span className="block text-slate-400 font-normal">{isSpanishTarget ? 'Score' : 'Calificación'}</span>
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{scorePercent}%</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-normal">CEFR Level</span>
                      <span className="text-base font-black text-indigo-600 dark:text-indigo-400">{selectedLevel}</span>
                    </div>
                    <div>
                      <span className="block text-slate-400 font-normal">{isSpanishTarget ? 'Date' : 'Fecha'}</span>
                      <span className="text-base font-black text-slate-900 dark:text-zinc-100">
                        {progress.examPassedDate || new Date().toISOString().split('T')[0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-6 py-3.5 bg-slate-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm rounded-xl shadow-sm flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isSpanishTarget ? 'Print / Save Certificate' : 'Guardar / Imprimir Certificado'}</span>
                  </button>
                  {selectedLevel !== 'B2' && onNavigate && (
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate(
                          selectedLevel === 'A1'
                            ? 'a2-plataforma'
                            : selectedLevel === 'A2'
                              ? 'b1-umbral'
                              : 'b2-avanzado'
                        )
                      }
                      className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm flex items-center gap-2 transition-colors"
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>
                        {selectedLevel === 'A1'
                          ? isSpanishTarget
                            ? 'Start Unlocked CEFR A2 Module'
                            : 'Comenzar Módulo Nivel A2 Desbloqueado'
                          : selectedLevel === 'A2'
                            ? isSpanishTarget
                              ? 'Start Unlocked CEFR B1 Module'
                              : 'Comenzar Módulo Nivel B1 Desbloqueado'
                            : isSpanishTarget
                              ? 'Start Unlocked CEFR B2 Module'
                              : 'Comenzar Módulo Nivel B2 Desbloqueado'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleStartExam}
                    className="px-6 py-3.5 bg-indigo-600 text-white font-bold text-sm rounded-xl shadow-sm hover:bg-indigo-700 flex items-center gap-2 transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{isSpanishTarget ? 'Retake Exam' : 'Repetir Examen'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/60 rounded-2xl flex items-center justify-center mx-auto mb-5 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="w-8 h-8" />
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-zinc-100 mb-2">
                  {isSpanishTarget ? `Score: ${scorePercent}% (80% Required)` : `Calificación: ${scorePercent}% (Se requiere 80%)`}
                </h2>
                <p className="text-slate-600 dark:text-zinc-400 font-medium text-sm max-w-md mx-auto mb-8">
                  {isSpanishTarget
                    ? 'Review the lessons in this level and try again to unlock your official certificate.'
                    : 'Repasa las lecciones de este nivel e inténtalo de nuevo para obtener tu certificado oficial.'}
                </p>

                <button
                  type="button"
                  onClick={handleStartExam}
                  className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md inline-flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{isSpanishTarget ? 'Try Again' : 'Intentar de Nuevo'}</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
