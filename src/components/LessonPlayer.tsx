import React, { useState, useMemo } from 'react';
import { LessonStep, QuizQuestion } from '../types';
import { WordOrderExercise } from './WordOrderExercise';
import { PronunciationPractice } from './PronunciationPractice';
import { RolePlaySimulator } from './RolePlaySimulator';
import { playSpeech } from '../utils/speech';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  ChevronRight,
  X,
  Lightbulb,
  RefreshCw,
  Volume2,
  Trophy,
  Heart,
  Zap,
  Brain,
  AlertTriangle,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Target
} from 'lucide-react';

interface QuizItem extends QuizQuestion {
  isRetry?: boolean;
}

interface LessonPlayerProps {
  lesson: LessonStep;
  onComplete: () => void;
  onClose: () => void;
}

export function LessonPlayer({ lesson, onComplete, onClose }: LessonPlayerProps) {
  const [step, setStep] = useState<'content' | 'quiz' | 'roleplay' | 'success'>('content');
  const [quizQueue, setQuizQueue] = useState<QuizItem[]>(() => lesson.quiz.map(q => ({ ...q })));
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.9);
  const [showPreAnswerHint, setShowPreAnswerHint] = useState<boolean>(false);
  const [firstTryMistakes, setFirstTryMistakes] = useState<number>(0);
  const [confidenceLevel, setConfidenceLevel] = useState<'easy' | 'good' | 'hard'>('good');

  const isSpanishCourse = lesson.id.startsWith('es_');
  const courseLang = isSpanishCourse ? 'es' : 'en';
  const currentQuestion = quizQueue[currentQuizIndex];
  const cefrBadge = lesson.cefrLevel || (lesson.id.includes('a2') ? 'A2' : 'A1');

  // Parse content into structured interactive blocks so students can listen to individual examples
  const contentBlocks = useMemo(() => {
    return lesson.content.split('\n').filter(line => line.trim().length > 0);
  }, [lesson.content]);

  const handleNextQuiz = () => {
    setShowPreAnswerHint(false);
    if (currentQuizIndex < quizQueue.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuizStatus('idle');
    } else {
      if (lesson.dialogue && lesson.dialogue.length > 0) {
        setStep('roleplay');
      } else {
        setStep('success');
      }
    }
  };

  const handleOptionSelect = (option: string) => {
    if (quizStatus !== 'idle' || !currentQuestion) return;

    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    setQuizStatus(isCorrect ? 'correct' : 'incorrect');

    if (!isCorrect) {
      if (!currentQuestion.isRetry) {
        setFirstTryMistakes(m => m + 1);
      }
      setQuizQueue(prev => [...prev, { ...currentQuestion, isRetry: true }]);
    }
  };

  const speakText = (text: string) => {
    // Strip leading bullets or emojis for cleaner TTS
    const clean = text.replace(/^[•\-🎯💡⚠️❌✅1-9.]+\s*/, '');
    playSpeech(clean, {
      courseLanguage: courseLang,
      rate: speechSpeed
    });
  };

  const saveConfidenceAndFinish = () => {
    try {
      const existing = JSON.parse(localStorage.getItem('lingostep_lesson_confidence') || '{}');
      existing[lesson.id] = {
        confidence: confidenceLevel,
        accuracy: Math.max(0, Math.round(((lesson.quiz.length - firstTryMistakes) / Math.max(1, lesson.quiz.length)) * 100)),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('lingostep_lesson_confidence', JSON.stringify(existing));
    } catch (e) {}
    onComplete();
    onClose();
  };

  const progressPercent = step === 'content'
    ? 25
    : step === 'quiz'
      ? 25 + ((currentQuizIndex + 1) / quizQueue.length) * 50
      : step === 'roleplay'
        ? 88
        : 100;

  const firstTryAccuracy = Math.max(
    0,
    Math.round(((lesson.quiz.length - firstTryMistakes) / Math.max(1, lesson.quiz.length)) * 100)
  );

  return (
    <div className="fixed inset-0 bg-slate-950/60 dark:bg-black/80 z-50 flex flex-col backdrop-blur-md overflow-hidden">
      {/* Top Pedagogical Phase Bar */}
      <div className="bg-white dark:bg-zinc-900 px-4 md:px-8 py-3.5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition-colors text-slate-600 dark:text-zinc-400"
            title={isSpanishCourse ? 'Exit lesson' : 'Salir de la lección'}
          >
            <X className="w-5 h-5" />
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-zinc-400">
            <span className="font-bold text-slate-900 dark:text-zinc-100">CEFR {cefrBadge}</span>
            <span aria-hidden="true">·</span>
            <span>{isSpanishCourse ? `Step ${lesson.day}` : `Paso ${lesson.day}`}</span>
          </div>
        </div>

        {/* 4-Phase Pedagogical Progress Indicator */}
        <div className="flex-1 max-w-xl mx-auto flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-zinc-400 px-1">
            <span className={step === 'content' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}>
              1. {isSpanishCourse ? 'Structured Input' : 'Input Comprensible'}
            </span>
            <span className={step === 'quiz' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}>
              2. {isSpanishCourse ? 'Active Recall' : 'Práctica Activa'}
            </span>
            {lesson.dialogue && lesson.dialogue.length > 0 && (
              <span className={step === 'roleplay' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''}>
                3. {isSpanishCourse ? 'Live Dialogue' : 'Diálogo Real'}
              </span>
            )}
            <span className={step === 'success' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}>
              {lesson.dialogue && lesson.dialogue.length > 0 ? '4.' : '3.'} {isSpanishCourse ? 'Mastery' : 'Dominio'}
            </span>
          </div>
          <div className="h-2.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Dual-Speed Audio Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSpeechSpeed(s => (s === 0.9 ? 0.7 : 0.9))}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border whitespace-nowrap shrink-0 ${
              speechSpeed === 0.7
                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                : 'bg-slate-50 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'
            }`}
          >
            {isSpanishCourse
              ? speechSpeed === 0.7
                ? 'Slow Audio 0.7x'
                : 'Normal Audio 0.9x'
              : speechSpeed === 0.7
                ? 'Audio Lento 0.7x'
                : 'Audio Normal 0.9x'}
          </button>
        </div>
      </div>

      {/* Main Content Stage */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col max-w-3xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-lg"
            >
              <div className="flex-1 space-y-6">
                {/* Header & Full TTS */}
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-zinc-800 pb-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1.5">
                      <BookOpen className="w-4 h-4" />
                      <span>
                        {isSpanishCourse
                          ? `Phase 1: Comprehensible Input · Level ${cefrBadge}`
                          : `Fase 1: Comprensión Estructurada · Nivel ${cefrBadge}`}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">
                      {lesson.title}
                    </h2>
                    <p className="text-slate-600 dark:text-zinc-400 text-sm mt-1">
                      {lesson.description}
                    </p>
                  </div>
                  <button
                    onClick={() => speakText(lesson.content)}
                    title={isSpanishCourse ? 'Listen to full lesson' : 'Escuchar lección completa'}
                    className="px-3.5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpanishCourse ? 'Listen All' : 'Escuchar Todo'}</span>
                  </button>
                </div>

                {/* Pedagogical Scaffolding Cards (Formula, Common Mistake, Strategy Tip) */}
                {(lesson.grammarFocus || lesson.commonMistake || lesson.strategyTip) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {lesson.grammarFocus && (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                          <Target className="w-3.5 h-3.5" />
                          <span>{isSpanishCourse ? 'Core Pattern' : 'Patrón Estructural'}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200 leading-relaxed">
                          {lesson.grammarFocus}
                        </p>
                      </div>
                    )}

                    {lesson.commonMistake && (
                      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/70">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          <span>{isSpanishCourse ? 'Avoid This Trap' : 'Radar de Error Común'}</span>
                        </div>
                        <p className="text-xs font-medium text-amber-950 dark:text-amber-200 leading-relaxed">
                          {lesson.commonMistake}
                        </p>
                      </div>
                    )}

                    {lesson.strategyTip && (
                      <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/70">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1">
                          <Brain className="w-3.5 h-3.5" />
                          <span>{isSpanishCourse ? 'Memory Strategy' : 'Estrategia Cognitiva'}</span>
                        </div>
                        <p className="text-xs font-medium text-emerald-950 dark:text-emerald-200 leading-relaxed">
                          {lesson.strategyTip}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Interactive Chunked Content (Click any bullet/example to hear audio) */}
                <div className="bg-slate-50 dark:bg-zinc-800/40 border border-slate-200 dark:border-zinc-700/60 rounded-2xl p-5 md:p-6 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 pb-2 border-b border-slate-200/70 dark:border-zinc-700/60">
                    <span>
                      {isSpanishCourse
                        ? 'Tip: Click any example line with "•" to practice listening and shadowing.'
                        : 'Tip Pedagógico: Haz clic en cualquier ejemplo con "•" para escuchar su pronunciación nativa.'}
                    </span>
                  </div>

                  {contentBlocks.map((line, i) => {
                    const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
                    const isHeading = /^[0-9]+\.|^🎯|^💡|^⚠️/.test(line.trim());

                    if (isBullet) {
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => speakText(line)}
                          className="w-full text-left flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-white dark:bg-zinc-900/90 hover:bg-indigo-50/70 dark:hover:bg-indigo-950/40 border border-slate-200/70 dark:border-zinc-800 transition-colors group"
                        >
                          <span className="text-sm md:text-base font-medium text-slate-800 dark:text-zinc-200 leading-relaxed">
                            {line}
                          </span>
                          <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 transition-colors" />
                        </button>
                      );
                    }

                    if (isHeading) {
                      return (
                        <h4
                          key={i}
                          className="text-sm md:text-base font-black text-slate-900 dark:text-zinc-100 pt-3 first:pt-0"
                        >
                          {line}
                        </h4>
                      );
                    }

                    return (
                      <p key={i} className="text-sm md:text-base text-slate-700 dark:text-zinc-300 leading-relaxed">
                        {line}
                      </p>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setStep('quiz')}
                className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-4 font-bold text-base shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <span>
                  {isSpanishCourse
                    ? 'Start Phase 2: Active Recall Practice'
                    : 'Pasar a Fase 2: Práctica de Recuperación Activa'}
                </span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 'quiz' && currentQuestion && (
            <motion.div
              key={`quiz-${currentQuizIndex}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-lg"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <span>
                      {isSpanishCourse ? 'Exercise' : 'Ejercicio'} {currentQuizIndex + 1} {isSpanishCourse ? 'of' : 'de'} {quizQueue.length}
                    </span>
                    {currentQuestion.isRetry && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
                          <RefreshCw className="w-3.5 h-3.5" />
                          {isSpanishCourse ? 'Spaced Error Recovery' : 'Recuperación Espaciada de Error'}
                        </span>
                      </>
                    )}
                  </div>

                  {/* On-demand Pedagogical Hint Button before answering */}
                  {quizStatus === 'idle' && (currentQuestion.hint || currentQuestion.explanation) && (
                    <button
                      type="button"
                      onClick={() => setShowPreAnswerHint(h => !h)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>
                        {showPreAnswerHint
                          ? isSpanishCourse ? 'Hide Grammar Clue' : 'Ocultar Pista'
                          : isSpanishCourse ? 'Need a Grammar Clue?' : '¿Necesitas una Pista Gramatical?'}
                      </span>
                    </button>
                  )}
                </div>

                {(currentQuestion.isRetry || showPreAnswerHint) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-start gap-3"
                  >
                    <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-800 dark:text-amber-300 mb-0.5">
                        {isSpanishCourse ? 'Cognitive Scaffolding Clue:' : 'Andamiaje Gramatical:'}
                      </p>
                      <p className="text-sm text-amber-950 dark:text-amber-200 font-medium">
                        {currentQuestion.hint || currentQuestion.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Question Type: Word Order */}
                {currentQuestion.type === 'word-order' ? (
                  <WordOrderExercise
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
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-zinc-100">
                      {currentQuestion.question}
                    </h3>
                    <PronunciationPractice
                      targetPhrase={currentQuestion.targetText || currentQuestion.correctAnswer}
                      courseLanguage={courseLang}
                      onSuccess={() => setQuizStatus('correct')}
                    />
                  </div>
                ) : (
                  /* Standard Multiple Choice */
                  <>
                    <div className="flex items-start justify-between gap-3 mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-zinc-100 leading-tight">
                        {currentQuestion.question}
                      </h3>
                      <button
                        onClick={() => speakText(currentQuestion.question)}
                        title={isSpanishCourse ? 'Listen to question' : 'Escuchar pregunta'}
                        className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrectOption = option === currentQuestion.correctAnswer;

                        let btnClass = 'flex-1 text-left p-4 rounded-2xl border font-bold text-base transition-colors ';

                        if (quizStatus === 'idle') {
                          btnClass +=
                            'border-slate-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-slate-50/60 dark:bg-zinc-800/50 text-slate-800 dark:text-zinc-200 hover:bg-indigo-50/40';
                        } else if (isSelected && quizStatus === 'correct') {
                          btnClass +=
                            'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                        } else if (isSelected && quizStatus === 'incorrect') {
                          btnClass +=
                            'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                        } else if (!isSelected && isCorrectOption && quizStatus === 'incorrect') {
                          btnClass +=
                            'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200';
                        } else {
                          btnClass +=
                            'border-slate-200 dark:border-zinc-800 bg-slate-50/20 dark:bg-zinc-900/20 opacity-45 text-slate-700 dark:text-zinc-300';
                        }

                        return (
                          <div key={idx} className="flex items-center gap-2.5 w-full">
                            <button
                              type="button"
                              onClick={() => handleOptionSelect(option)}
                              disabled={quizStatus !== 'idle'}
                              className={btnClass}
                            >
                              <span>{option}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => speakText(option)}
                              title={isSpanishCourse ? 'Listen to option' : 'Escuchar opción'}
                              className="p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/40 hover:bg-indigo-50 dark:hover:bg-zinc-800 text-slate-500 hover:text-indigo-600 transition-colors shrink-0"
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {quizStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-5 rounded-2xl border ${
                      quizStatus === 'correct'
                        ? 'bg-emerald-50 text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800'
                        : 'bg-rose-50 text-rose-950 dark:bg-rose-950/50 dark:text-rose-200 border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    <p className="font-bold text-base mb-1 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        {quizStatus === 'correct'
                          ? isSpanishCourse
                            ? 'Correct! Pattern reinforced.'
                            : '¡Correcto! Patrón gramatical consolidado.'
                          : isSpanishCourse
                            ? 'Not quite right — let\'s analyze why:'
                            : 'Respuesta incorrecta — analicemos la regla:'}
                      </span>
                    </p>
                    <p className="text-sm font-medium leading-relaxed">{currentQuestion.explanation}</p>
                    {quizStatus === 'incorrect' && (
                      <p className="mt-2 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                        <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                        {isSpanishCourse
                          ? 'Added to the end of this session for spaced active recall.'
                          : 'Se agregó al final de esta sesión para garantizar retención activa.'}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>

              <button
                onClick={handleNextQuiz}
                disabled={quizStatus === 'idle'}
                className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl py-4 font-bold text-base shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <span>
                  {currentQuizIndex < quizQueue.length - 1
                    ? isSpanishCourse
                      ? 'Next Exercise'
                      : 'Siguiente Ejercicio'
                    : lesson.dialogue && lesson.dialogue.length > 0
                      ? isSpanishCourse
                        ? 'Continue to Phase 3: Real-Life Dialogue'
                        : 'Continuar a Fase 3: Simulación de Diálogo'
                      : isSpanishCourse
                        ? 'Complete Lesson'
                        : 'Finalizar Lección'}
                </span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 'roleplay' && lesson.dialogue && (
            <motion.div
              key="roleplay"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <RolePlaySimulator
                dialogueLines={lesson.dialogue}
                courseLanguage={courseLang}
                onComplete={() => setStep('success')}
              />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-lg"
            >
              <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center mb-5 shadow-md text-white">
                <Trophy className="w-10 h-10" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black mb-2 text-slate-900 dark:text-zinc-100">
                {isSpanishCourse ? 'Lesson Mastered!' : '¡Lección Dominada!'}
              </h2>

              <div className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-zinc-300 mb-6 tabular-nums">
                <span className="text-amber-600 dark:text-amber-400">+60 XP</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {isSpanishCourse ? `First-Try Accuracy: ${firstTryAccuracy}%` : `Precisión al 1er intento: ${firstTryAccuracy}%`}
                </span>
                <span aria-hidden="true">·</span>
                <span>CEFR {cefrBadge}</span>
              </div>

              {/* Metacognitive Self-Assessment */}
              <div className="w-full max-w-md bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 rounded-2xl p-5 mb-7 text-left">
                <p className="text-xs font-bold text-slate-700 dark:text-zinc-300 mb-3 flex items-center gap-1.5">
                  <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {isSpanishCourse
                      ? 'Metacognitive Check: How confident do you feel with this topic?'
                      : 'Autoevaluación Metacognitiva: ¿Qué tan seguro te sientes con este tema?'}
                  </span>
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setConfidenceLevel('easy')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-colors text-center ${
                      confidenceLevel === 'easy'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    {isSpanishCourse ? 'Mastered' : 'Dominado'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfidenceLevel('good')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-colors text-center ${
                      confidenceLevel === 'good'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    {isSpanishCourse ? 'Solid' : 'Bien'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfidenceLevel('hard')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition-colors text-center ${
                      confidenceLevel === 'hard'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700'
                    }`}
                  >
                    {isSpanishCourse ? 'Review Soon' : 'Repasar pronto'}
                  </button>
                </div>
              </div>

              <button
                onClick={saveConfidenceAndFinish}
                className="w-full max-w-md bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-4 font-bold text-base shadow-md flex items-center justify-center transition-colors"
              >
                {isSpanishCourse ? 'Save Progress & Continue' : 'Guardar Progreso en BD y Continuar'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
