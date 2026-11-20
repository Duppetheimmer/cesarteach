import React, { useState, useMemo, useEffect } from 'react';
import { LessonStep, QuizQuestion } from '../types';
import { WordOrderExercise } from './WordOrderExercise';
import { PronunciationPractice } from './PronunciationPractice';
import { RolePlaySimulator } from './RolePlaySimulator';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';
import { randomizeQuestionsOptions, shuffleOptionsList } from '../utils/shuffleOptions';
import { buildEnrichedLessonQuiz } from '../utils/exerciseGenerator';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ChevronRight,
  X,
  Lightbulb,
  RefreshCw,
  Volume2,
  Trophy,
  Brain,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  Target,
  FastForward,
  Highlighter,
  Layers
} from 'lucide-react';

interface QuizItem extends QuizQuestion {
  isRetry?: boolean;
}

interface LessonPlayerProps {
  lesson: LessonStep;
  onComplete: () => void;
  onClose: () => void;
}

type MarkerColor = 'yellow' | 'mint' | 'coral';

const MARKER_STYLES: Record<MarkerColor, { bg: string; dot: string; labelEs: string; labelEn: string }> = {
  yellow: {
    bg: 'bg-yellow-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]',
    dot: 'bg-yellow-400',
    labelEs: 'Amarillo',
    labelEn: 'Yellow'
  },
  mint: {
    bg: 'bg-emerald-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]',
    dot: 'bg-emerald-400',
    labelEs: 'Menta',
    labelEn: 'Mint'
  },
  coral: {
    bg: 'bg-rose-300 text-slate-950 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]',
    dot: 'bg-rose-400',
    labelEs: 'Coral',
    labelEn: 'Coral'
  }
};

export function LessonPlayer({ lesson, onComplete, onClose }: LessonPlayerProps) {
  const draftKey = `lingostep_lesson_draft_${lesson.id}`;

  const initialDraft = useMemo(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) return JSON.parse(raw);
    } catch {}
    return null;
  }, [draftKey]);

  const [step, setStep] = useState<'content' | 'quiz' | 'roleplay' | 'success'>(
    initialDraft?.step && initialDraft.step !== 'success' ? initialDraft.step : 'content'
  );
  const enrichedBaseQuiz = useMemo(() => buildEnrichedLessonQuiz(lesson), [lesson]);

  const [quizQueue, setQuizQueue] = useState<QuizItem[]>(() =>
    randomizeQuestionsOptions(enrichedBaseQuiz.map(q => ({ ...q })))
  );
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(() => {
    const savedIdx = Number(initialDraft?.currentQuizIndex || 0);
    return savedIdx >= 0 && savedIdx < enrichedBaseQuiz.length ? savedIdx : 0;
  });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.9);
  const [showPreAnswerHint, setShowPreAnswerHint] = useState<boolean>(false);
  const [firstTryMistakes, setFirstTryMistakes] = useState<number>(Number(initialDraft?.firstTryMistakes || 0));
  const [confidenceLevel, setConfidenceLevel] = useState<'easy' | 'good' | 'hard'>('good');
  const [markerColor, setMarkerColor] = useState<MarkerColor>('yellow');
  const [highlightedLines, setHighlightedLines] = useState<Record<number, MarkerColor>>({});

  // Auto-save partial lesson progress so refreshing or closing never loses student work
  useEffect(() => {
    try {
      if (step === 'success') {
        localStorage.removeItem(draftKey);
      } else {
        localStorage.setItem(
          draftKey,
          JSON.stringify({
            step,
            currentQuizIndex,
            firstTryMistakes,
            updatedAt: new Date().toISOString()
          })
        );
      }
    } catch {}
  }, [draftKey, step, currentQuizIndex, firstTryMistakes]);

  const isSpanishCourse = lesson.id.startsWith('es_');
  const courseLang = isSpanishCourse ? 'es' : 'en';
  const currentQuestion = quizQueue[currentQuizIndex];
  const cefrBadge = lesson.cefrLevel || (lesson.id.includes('a2') ? 'A2' : 'A1');

  const contentBlocks = useMemo(() => {
    return lesson.content.split('\n').filter(line => line.trim().length > 0);
  }, [lesson.content]);

  const handleNextQuiz = () => {
    playTactileSound('flip');
    setShowPreAnswerHint(false);
    if (currentQuizIndex < quizQueue.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuizStatus('idle');
    } else {
      if (lesson.dialogue && lesson.dialogue.length > 0) {
        setStep('roleplay');
      } else {
        playTactileSound('win');
        setStep('success');
      }
    }
  };

  const handleOptionSelect = (option: string) => {
    if (quizStatus !== 'idle' || !currentQuestion) return;

    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    setQuizStatus(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      playTactileSound('stamp');
      speakText(option);
    } else {
      playTactileSound('error');
      if (!currentQuestion.isRetry) {
        setFirstTryMistakes(m => m + 1);
      }
      const prevCorrectIdx = currentQuestion.options.indexOf(currentQuestion.correctAnswer);
      const reshuffledOptions = shuffleOptionsList(
        currentQuestion.options,
        currentQuestion.correctAnswer,
        prevCorrectIdx
      );
      setQuizQueue(prev => [
        ...prev,
        { ...currentQuestion, options: reshuffledOptions, isRetry: true }
      ]);
    }
  };

  const speakText = (text: string) => {
    const clean = text.replace(/^[•\-🎯💡⚠️❌✅1-9.]+\s*/, '');
    playSpeech(clean, {
      courseLanguage: courseLang,
      rate: speechSpeed
    });
  };

  const toggleLineHighlight = (lineIdx: number, lineText: string) => {
    playTactileSound('highlight');
    setHighlightedLines(prev => {
      const next = { ...prev };
      if (next[lineIdx] === markerColor) {
        delete next[lineIdx];
      } else {
        next[lineIdx] = markerColor;
      }
      return next;
    });
    speakText(lineText);
  };

  const saveConfidenceAndFinish = () => {
    playTactileSound('win');
    try {
      localStorage.removeItem(draftKey);
      const existing = JSON.parse(localStorage.getItem('lingostep_lesson_confidence') || '{}');
      existing[lesson.id] = {
        confidence: confidenceLevel,
        accuracy: Math.max(
          0,
          Math.round(((lesson.quiz.length - firstTryMistakes) / Math.max(1, lesson.quiz.length)) * 100)
        ),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('lingostep_lesson_confidence', JSON.stringify(existing));
    } catch (e) {}
    onComplete();
    onClose();
  };

  const progressPercent =
    step === 'content'
      ? 25
      : step === 'quiz'
        ? 25 + ((currentQuizIndex + 1) / quizQueue.length) * 50
        : step === 'roleplay'
          ? 88
          : 100;

  const firstTryAccuracy = Math.max(
    0,
    Math.round(((enrichedBaseQuiz.length - firstTryMistakes) / Math.max(1, enrichedBaseQuiz.length)) * 100)
  );

  const handleStartBonusPracticeRound = () => {
    playTactileSound('flip');
    setQuizQueue(randomizeQuestionsOptions(enrichedBaseQuiz.map(q => ({ ...q }))));
    setCurrentQuizIndex(0);
    setSelectedOption(null);
    setQuizStatus('idle');
    setFirstTryMistakes(0);
    setStep('quiz');
  };

  return (
    <div className="fixed inset-0 bg-[#FAF6EE]/95 dark:bg-zinc-950/95 z-50 flex flex-col backdrop-blur-md overflow-hidden">
      {/* Top Tactile Pedagogical Phase Bar */}
      <div className="bg-white dark:bg-zinc-900 px-4 md:px-8 py-3.5 border-b-2 border-slate-900 dark:border-zinc-700 flex items-center justify-between gap-4 shadow-[0_4px_0_0_#0f172a] dark:shadow-[0_4px_0_0_#27272a]">
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.06, rotate: -4 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              playTactileSound('pop');
              onClose();
            }}
            className="p-2 bg-amber-100 hover:bg-rose-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border-2 border-slate-900 dark:border-zinc-600 rounded-xl transition-colors text-slate-900 dark:text-zinc-100 shadow-[2px_2px_0px_0px_#0f172a]"
            title={isSpanishCourse ? 'Exit lesson' : 'Salir de la lección'}
          >
            <X className="w-5 h-5" />
          </motion.button>
          <div className="hidden sm:flex items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-zinc-300">
            <span className="font-black text-slate-950 dark:text-white">CEFR {cefrBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{isSpanishCourse ? `Card Step ${lesson.day}` : `Carta Paso ${lesson.day}`}</span>
          </div>
        </div>

        {/* 4-Phase Pedagogical Progress Indicator */}
        <div className="flex-1 max-w-xl mx-auto flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-600 dark:text-zinc-400 px-1">
            <span className={step === 'content' ? 'text-slate-950 dark:text-yellow-300 underline decoration-2' : ''}>
              1. {isSpanishCourse ? 'Theory Card' : 'Carta de Teoría'}
            </span>
            <span className={step === 'quiz' ? 'text-slate-950 dark:text-yellow-300 underline decoration-2' : ''}>
              2. {isSpanishCourse ? 'Card Challenges' : 'Reto de Cartas'}
            </span>
            {lesson.dialogue && lesson.dialogue.length > 0 && (
              <span className={step === 'roleplay' ? 'text-slate-950 dark:text-yellow-300 underline decoration-2' : ''}>
                3. {isSpanishCourse ? 'Live Dialogue' : 'Diálogo Vivo'}
              </span>
            )}
            <span className={step === 'success' ? 'text-emerald-700 dark:text-emerald-400 font-black' : ''}>
              {lesson.dialogue && lesson.dialogue.length > 0 ? '4.' : '3.'}{' '}
              {isSpanishCourse ? 'Stamped!' : '¡Sellado!'}
            </span>
          </div>
          <div className="h-3.5 w-full bg-amber-100 dark:bg-zinc-800 rounded-full overflow-hidden border-2 border-slate-900 dark:border-zinc-600 p-0.5">
            <motion.div
              className="h-full bg-emerald-400 dark:bg-emerald-500 rounded-full"
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
            />
          </div>
        </div>

        {/* Dual-Speed Audio Control */}
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              playTactileSound('pop');
              setSpeechSpeed(s => (s === 0.9 ? 0.7 : 0.9));
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors border-2 border-slate-900 dark:border-zinc-600 shadow-[2px_2px_0px_0px_#0f172a] whitespace-nowrap shrink-0 ${
              speechSpeed === 0.7
                ? 'bg-yellow-300 text-slate-950'
                : 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100'
            }`}
          >
            {isSpanishCourse
              ? speechSpeed === 0.7
                ? '🐢 Slow 0.7x'
                : '🔊 Normal 0.9x'
              : speechSpeed === 0.7
                ? '🐢 Lento 0.7x'
                : '🔊 Normal 0.9x'}
          </motion.button>
        </div>
      </div>

      {/* Main Animated Card-Table Stage */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 18, rotate: -0.5 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -18, rotate: 0.5 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="flex-1 flex flex-col bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border-2 border-slate-900 dark:border-zinc-700 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a]"
            >
              <div className="flex-1 space-y-6">
                {/* Header & Full TTS */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-slate-900/15 dark:border-zinc-800 pb-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold text-indigo-700 dark:text-indigo-400 mb-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>
                        {isSpanishCourse
                          ? `Interactive Study Card · Level ${cefrBadge}`
                          : `Carta de Estudio Interactiva · Nivel ${cefrBadge}`}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-zinc-100 tracking-tight">
                      {lesson.title}
                    </h2>
                    <p className="text-slate-600 dark:text-zinc-400 text-sm font-medium mt-1">
                      {lesson.description}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96, x: 2, y: 2 }}
                    onClick={() => {
                      playTactileSound('pop');
                      speakText(lesson.content);
                    }}
                    className="px-4 py-2.5 rounded-2xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs flex items-center gap-1.5 shadow-[3px_3px_0px_0px_#0f172a] shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpanishCourse ? 'Listen Full Card' : 'Escuchar Carta Completa'}</span>
                  </motion.button>
                </div>

                {/* Pedagogical Scaffolding Cards (NoDeck Sticky Note Style) */}
                {(lesson.grammarFocus || lesson.commonMistake || lesson.strategyTip) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {lesson.grammarFocus && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="p-4 rounded-2xl bg-sky-100 dark:bg-sky-950/40 border-2 border-slate-900 dark:border-zinc-700 shadow-[3px_3px_0px_0px_#0f172a]"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-950 dark:text-sky-300 mb-1">
                          <Target className="w-4 h-4" />
                          <span>{isSpanishCourse ? 'Core Formula' : 'Fórmula Clave'}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 dark:text-zinc-200 leading-relaxed">
                          {lesson.grammarFocus}
                        </p>
                      </motion.div>
                    )}

                    {lesson.commonMistake && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 rounded-2xl bg-amber-200/80 dark:bg-amber-950/40 border-2 border-slate-900 dark:border-zinc-700 shadow-[3px_3px_0px_0px_#0f172a]"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-950 dark:text-amber-300 mb-1">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{isSpanishCourse ? 'Common Trap' : 'Trampa Común'}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 dark:text-amber-100 leading-relaxed">
                          {lesson.commonMistake}
                        </p>
                      </motion.div>
                    )}

                    {lesson.strategyTip && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="p-4 rounded-2xl bg-emerald-200/80 dark:bg-emerald-950/40 border-2 border-slate-900 dark:border-zinc-700 shadow-[3px_3px_0px_0px_#0f172a]"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-black text-slate-950 dark:text-emerald-300 mb-1">
                          <Brain className="w-4 h-4" />
                          <span>{isSpanishCourse ? 'Memory Trick' : 'Truco de Memoria'}</span>
                        </div>
                        <p className="text-xs font-bold text-slate-900 dark:text-emerald-100 leading-relaxed">
                          {lesson.strategyTip}
                        </p>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Interactive Chunked Content with Fluorescent Highlighter */}
                <div className="bg-[#FAF6EE] dark:bg-zinc-800/50 border-2 border-slate-900 dark:border-zinc-700 rounded-2xl p-5 md:p-6 space-y-2.5 shadow-[4px_4px_0px_0px_#0f172a]">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700 dark:text-zinc-300 pb-3 mb-1 border-b-2 border-slate-900/10 dark:border-zinc-700">
                    <span className="font-bold">
                      {isSpanishCourse
                        ? 'Tap any "•" example card to highlight & hear pronunciation:'
                        : 'Toca cualquier ejemplo con "•" para subrayarlo con marcador y escucharlo:'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Highlighter className="w-3.5 h-3.5" />
                      {(['yellow', 'mint', 'coral'] as MarkerColor[]).map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            playTactileSound('pop');
                            setMarkerColor(c);
                          }}
                          className={`w-5 h-5 rounded-full border-2 transition-transform ${MARKER_STYLES[c].dot} ${
                            markerColor === c ? 'border-slate-950 dark:border-white scale-125' : 'border-slate-400 opacity-70'
                          }`}
                          title={isSpanishCourse ? MARKER_STYLES[c].labelEn : MARKER_STYLES[c].labelEs}
                        />
                      ))}
                    </div>
                  </div>

                  {contentBlocks.map((line, i) => {
                    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
                    const isHeading = /^[0-9]+\.|^🎯|^💡|^⚠️/.test(line.trim());
                    const appliedHighlight = highlightedLines[i];

                    if (isBullet) {
                      return (
                        <motion.button
                          key={i}
                          type="button"
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => toggleLineHighlight(i, line)}
                          className={`w-full text-left flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 transition-all group ${
                            appliedHighlight
                              ? MARKER_STYLES[appliedHighlight].bg
                              : 'bg-white dark:bg-zinc-900 hover:bg-yellow-100/80 dark:hover:bg-zinc-800 border-slate-900/20 dark:border-zinc-700 text-slate-900 dark:text-zinc-100'
                          }`}
                        >
                          <span className="text-sm md:text-base font-bold leading-relaxed">
                            {line}
                          </span>
                          <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-900/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <Volume2 className="w-4 h-4" />
                          </span>
                        </motion.button>
                      );
                    }

                    if (isHeading) {
                      return (
                        <h4
                          key={i}
                          className="text-sm md:text-base font-black text-slate-950 dark:text-zinc-100 pt-3 first:pt-0"
                        >
                          {line}
                        </h4>
                      );
                    }

                    return (
                      <p key={i} className="text-sm md:text-base font-medium text-slate-800 dark:text-zinc-300 leading-relaxed">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98, x: 2, y: 2 }}
                onClick={() => {
                  playTactileSound('flip');
                  setStep('quiz');
                }}
                className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 font-black text-base border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-colors"
              >
                <Layers className="w-5 h-5" />
                <span>
                  {isSpanishCourse
                    ? 'Deal Exercise Cards (Phase 2)'
                    : 'Repartir Cartas de Ejercicio (Fase 2)'}
                </span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {step === 'quiz' && currentQuestion && (
            <motion.div
              key={`quiz-${currentQuizIndex}`}
              initial={{ opacity: 0, x: 30, rotate: 1 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -30, rotate: -1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="flex-1 flex flex-col bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border-2 border-slate-900 dark:border-zinc-700 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a] relative overflow-hidden"
            >
              <div className="flex-1">
                {/* Top Card Status Row + Animated Rubber Stamp */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b-2 border-slate-900/10 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-black text-slate-900 dark:text-zinc-200">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-200 dark:bg-zinc-800 border border-slate-900 dark:border-zinc-600 text-slate-950 dark:text-amber-300 tabular-nums">
                      {isSpanishCourse ? 'Card' : 'Carta'} {currentQuizIndex + 1} / {quizQueue.length}
                    </span>
                    {currentQuestion.isRetry && (
                      <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-extrabold">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        {isSpanishCourse ? 'Second Chance Card' : 'Carta de Refuerzo'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Animated Stamp when correct */}
                    <AnimatePresence>
                      {quizStatus === 'correct' && (
                        <motion.div
                          initial={{ scale: 1.6, opacity: 0, rotate: -14 }}
                          animate={{ scale: 1, opacity: 1, rotate: -4 }}
                          exit={{ opacity: 0 }}
                          className="px-3 py-1 rounded-xl border-2 border-slate-900 bg-emerald-300 text-slate-950 font-black text-xs tracking-wide shadow-[2px_2px_0px_0px_#0f172a]"
                        >
                          {isSpanishCourse ? '✓ STAMPED! +15 XP' : '✓ ¡SELLADO! +15 XP'}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {quizStatus === 'idle' && (currentQuestion.hint || currentQuestion.explanation) && (
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          playTactileSound('pop');
                          setShowPreAnswerHint(h => !h);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-zinc-800 border border-slate-900 dark:border-zinc-600 text-xs font-extrabold text-slate-900 dark:text-amber-300"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>
                          {showPreAnswerHint
                            ? isSpanishCourse
                              ? 'Hide Clue'
                              : 'Ocultar Pista'
                            : isSpanishCourse
                              ? 'Flip Clue'
                              : 'Ver Pista'}
                        </span>
                      </motion.button>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {(currentQuestion.isRetry || showPreAnswerHint) && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mb-6 p-4 rounded-2xl bg-yellow-200/90 dark:bg-amber-950/60 border-2 border-slate-900 dark:border-amber-700 shadow-[3px_3px_0px_0px_#0f172a] flex items-start gap-3"
                    >
                      <Lightbulb className="w-5 h-5 text-slate-950 dark:text-amber-300 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-black text-slate-950 dark:text-amber-300 mb-0.5">
                          {isSpanishCourse ? 'Card Clue:' : 'Pista de la Carta:'}
                        </p>
                        <p className="text-sm text-slate-950 dark:text-amber-100 font-bold">
                          {currentQuestion.hint || currentQuestion.explanation}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Question Type: Word Order */}
                {currentQuestion.type === 'word-order' ? (
                  <WordOrderExercise
                    questionPrompt={currentQuestion.question}
                    correctSentence={currentQuestion.targetText || currentQuestion.correctAnswer}
                    explanation={currentQuestion.explanation}
                    hint={currentQuestion.hint}
                    courseLanguage={courseLang}
                    onCorrect={() => setQuizStatus('correct')}
                    onIncorrect={() => {
                      setQuizStatus('incorrect');
                      if (!currentQuestion.isRetry) setFirstTryMistakes(m => m + 1);
                      setQuizQueue(prev => [...prev, { ...currentQuestion, isRetry: true }]);
                    }}
                  />
                ) : currentQuestion.type === 'speaking' ? (
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-zinc-100">
                      {currentQuestion.question}
                    </h3>
                    <PronunciationPractice
                      targetPhrase={currentQuestion.targetText || currentQuestion.correctAnswer}
                      courseLanguage={courseLang}
                      onSuccess={() => {
                        playTactileSound('stamp');
                        setQuizStatus('correct');
                      }}
                      onSkip={() => {
                        playTactileSound('pop');
                        setQuizStatus('correct');
                      }}
                    />
                  </div>
                ) : (
                  /* Tactile Animated Multiple Choice Cards */
                  <>
                    <div className="p-5 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex items-start justify-between gap-3 mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-slate-950 dark:text-zinc-100 leading-tight">
                        {currentQuestion.question}
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        onClick={() => {
                          playTactileSound('pop');
                          speakText(currentQuestion.question);
                        }}
                        title={isSpanishCourse ? 'Listen to question' : 'Escuchar pregunta'}
                        className="p-3 rounded-xl bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="space-y-3">
                      {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrectOption = option === currentQuestion.correctAnswer;
                        const optionLetter = String.fromCharCode(65 + idx);

                        let btnClass =
                          'flex-1 text-left p-4 rounded-2xl border-2 font-extrabold text-base transition-all flex items-center justify-between gap-3 ';

                        if (quizStatus === 'idle') {
                          btnClass +=
                            'border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 text-slate-900 dark:text-zinc-100 hover:bg-yellow-100 dark:hover:bg-zinc-800 shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px]';
                        } else if (isSelected && quizStatus === 'correct') {
                          btnClass +=
                            'border-slate-900 bg-emerald-300 dark:bg-emerald-500 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a]';
                        } else if (isSelected && quizStatus === 'incorrect') {
                          btnClass +=
                            'border-slate-900 bg-rose-300 dark:bg-rose-500 text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]';
                        } else if (!isSelected && isCorrectOption && quizStatus === 'incorrect') {
                          btnClass +=
                            'border-slate-900 bg-emerald-300 dark:bg-emerald-500 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a]';
                        } else {
                          btnClass +=
                            'border-slate-300 dark:border-zinc-800 bg-slate-50/40 dark:bg-zinc-900/30 opacity-45 text-slate-500 dark:text-zinc-400';
                        }

                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            animate={
                              isSelected && quizStatus === 'incorrect'
                                ? { opacity: 1, y: 0, x: [0, -8, 8, -5, 5, 0] }
                                : { opacity: 1, y: 0, x: 0 }
                            }
                            transition={{ duration: 0.25, delay: quizStatus === 'idle' ? idx * 0.05 : 0 }}
                            className="flex items-center gap-2.5 w-full"
                          >
                            <button
                              type="button"
                              onClick={() => handleOptionSelect(option)}
                              disabled={quizStatus !== 'idle'}
                              className={btnClass}
                            >
                              <span className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-600 text-xs font-black text-slate-950 dark:text-white flex items-center justify-center shrink-0">
                                  {optionLetter}
                                </span>
                                <span>{option}</span>
                              </span>

                              {quizStatus !== 'idle' && isCorrectOption && (
                                <span className="text-xs font-black bg-white text-slate-950 px-2.5 py-1 rounded-lg border-2 border-slate-900 shrink-0">
                                  ✓ {optionLetter}
                                </span>
                              )}
                            </button>
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.92 }}
                              onClick={() => speakText(option)}
                              title={isSpanishCourse ? 'Listen to option' : 'Escuchar opción'}
                              className="p-4 rounded-2xl border-2 border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-yellow-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-zinc-200 shadow-[3px_3px_0px_0px_#0f172a] transition-colors shrink-0"
                            >
                              <Volume2 className="w-5 h-5" />
                            </motion.button>
                          </motion.div>
                        );
                      })}
                    </div>
                  </>
                )}

                {quizStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`mt-6 p-5 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] ${
                      quizStatus === 'correct'
                        ? 'bg-emerald-200/90 text-slate-950 dark:bg-emerald-950/80 dark:text-emerald-100'
                        : 'bg-rose-200/90 text-slate-950 dark:bg-rose-950/80 dark:text-rose-100'
                    }`}
                  >
                    <p className="font-black text-base mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <span>
                        {quizStatus === 'correct'
                          ? isSpanishCourse
                            ? 'Card Cleared! Rule Mastered:'
                            : '¡Carta Superada! Regla consolidada:'
                          : isSpanishCourse
                            ? "Let's check the grammar rule:"
                            : 'Analicemos la regla de esta carta:'}
                      </span>
                    </p>
                    <p className="text-sm font-bold leading-relaxed">{currentQuestion.explanation}</p>
                    {quizStatus === 'incorrect' && (
                      <p className="mt-2 text-xs font-extrabold flex items-center gap-1.5 opacity-90">
                        <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                        {isSpanishCourse
                          ? 'Shuffled back into the deck with a new option order.'
                          : 'Se barajó de nuevo al final del mazo con las opciones en otro orden.'}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
                {currentQuestion.type === 'speaking' && quizStatus === 'idle' && (
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setQuizStatus('correct');
                      handleNextQuiz();
                    }}
                    className="w-full sm:w-auto px-5 py-4 rounded-2xl border-2 border-slate-900 dark:border-zinc-700 bg-amber-100 hover:bg-amber-200 dark:bg-zinc-800 text-slate-950 dark:text-zinc-100 font-black text-sm flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_#0f172a] shrink-0"
                  >
                    <FastForward className="w-4 h-4" />
                    <span>{isSpanishCourse ? 'Skip microphone & continue' : 'Saltar micrófono y avanzar'}</span>
                  </button>
                )}

                <motion.button
                  type="button"
                  whileHover={quizStatus !== 'idle' ? { y: -2 } : undefined}
                  whileTap={quizStatus !== 'idle' ? { scale: 0.98, x: 2, y: 2 } : undefined}
                  onClick={handleNextQuiz}
                  disabled={quizStatus === 'idle'}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl py-4 font-black text-base border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-colors"
                >
                  <span>
                    {currentQuizIndex < quizQueue.length - 1
                      ? isSpanishCourse
                        ? 'Next Exercise Card'
                        : 'Siguiente Carta de Ejercicio'
                      : lesson.dialogue && lesson.dialogue.length > 0
                        ? isSpanishCourse
                          ? 'Continue to Phase 3: Live Dialogue'
                          : 'Continuar a Fase 3: Simulación de Diálogo'
                        : isSpanishCourse
                          ? 'Finish & Stamp Lesson'
                          : 'Finalizar y Sellar Lección'}
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          )}

          {step === 'roleplay' && lesson.dialogue && (
            <motion.div
              key="roleplay"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <RolePlaySimulator
                dialogueLines={lesson.dialogue}
                courseLanguage={courseLang}
                onComplete={() => {
                  playTactileSound('win');
                  setStep('success');
                }}
              />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92, rotate: -1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              className="flex-1 flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-900 p-8 rounded-3xl border-2 border-slate-900 dark:border-zinc-700 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a]"
            >
              <motion.div
                initial={{ scale: 0.5, rotate: -15 }}
                animate={{ scale: 1, rotate: -3 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="w-20 h-20 bg-emerald-400 border-2 border-slate-900 rounded-2xl flex items-center justify-center mb-5 shadow-[4px_4px_0px_0px_#0f172a] text-slate-950"
              >
                <Trophy className="w-10 h-10" />
              </motion.div>

              <div className="px-3.5 py-1 rounded-xl border-2 border-slate-900 bg-yellow-300 text-slate-950 font-black text-xs mb-3 shadow-[2px_2px_0px_0px_#0f172a]">
                {isSpanishCourse ? '✓ LESSON DECK COMPLETED!' : '✓ ¡MAZO DE LECCIÓN SELLADO!'}
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-2 text-slate-950 dark:text-zinc-100">
                {isSpanishCourse ? 'Lesson Mastered!' : '¡Lección Dominada!'}
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-black text-slate-700 dark:text-zinc-300 mb-6 tabular-nums">
                <span className="text-amber-600 dark:text-amber-400">+60 XP</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 dark:text-emerald-400">
                  {isSpanishCourse
                    ? `First-Try Accuracy: ${firstTryAccuracy}%`
                    : `Precisión al 1er intento: ${firstTryAccuracy}%`}
                </span>
                <span aria-hidden="true">·</span>
                <span>CEFR {cefrBadge}</span>
              </div>

              {/* Metacognitive Self-Assessment */}
              <div className="w-full max-w-md bg-[#FAF6EE] dark:bg-zinc-800/70 border-2 border-slate-900 dark:border-zinc-700 rounded-2xl p-5 mb-7 text-left shadow-[4px_4px_0px_0px_#0f172a]">
                <p className="text-xs font-black text-slate-900 dark:text-zinc-200 mb-3 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {isSpanishCourse
                      ? 'How confident do you feel with this card deck?'
                      : '¿Qué tan seguro te sientes con las cartas de esta lección?'}
                  </span>
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setConfidenceLevel('easy');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-black border-2 border-slate-900 transition-all text-center ${
                      confidenceLevel === 'easy'
                        ? 'bg-emerald-300 text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    {isSpanishCourse ? 'Mastered' : 'Dominado'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setConfidenceLevel('good');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-black border-2 border-slate-900 transition-all text-center ${
                      confidenceLevel === 'good'
                        ? 'bg-yellow-300 text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    {isSpanishCourse ? 'Solid' : 'Bien'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setConfidenceLevel('hard');
                    }}
                    className={`p-2.5 rounded-xl text-xs font-black border-2 border-slate-900 transition-all text-center ${
                      confidenceLevel === 'hard'
                        ? 'bg-rose-300 text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    {isSpanishCourse ? 'Review Soon' : 'Repasar pronto'}
                  </button>
                </div>
              </div>

              <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98, x: 2, y: 2 }}
                  onClick={handleStartBonusPracticeRound}
                  className="flex-1 bg-yellow-300 hover:bg-yellow-400 text-slate-950 rounded-2xl py-4 px-4 font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>
                    {isSpanishCourse ? 'Bonus Practice Round' : 'Ronda Extra de Práctica'}
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98, x: 2, y: 2 }}
                  onClick={saveConfidenceAndFinish}
                  className="flex-1 bg-emerald-400 hover:bg-emerald-500 text-slate-950 rounded-2xl py-4 px-4 font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center transition-colors"
                >
                  {isSpanishCourse ? 'Save & Continue' : 'Guardar y Continuar'}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
