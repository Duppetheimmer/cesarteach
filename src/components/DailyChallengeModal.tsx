import React, { useState } from 'react';
import { QuizQuestion, UserProgress } from '../types';
import { a1InicialLessons, a1IntermedioLessons, fluencyLessons } from '../data';
import { spanishA1InicialLessons, spanishA1IntermedioLessons, spanishFluencyLessons } from '../data/spanishData';
import { randomizeQuestionsOptions } from '../utils/shuffleOptions';
import { playTactileSound } from '../utils/soundEffects';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Trophy, ChevronRight, Volume2, Flame } from 'lucide-react';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onCompleteChallenge: (earnedXp: number) => void;
  courseLanguage?: 'en' | 'es';
}

export function DailyChallengeModal({
  isOpen,
  onClose,
  progress,
  onCompleteChallenge,
  courseLanguage = 'en'
}: DailyChallengeModalProps) {
  const isSpanishCourse = courseLanguage === 'es';

  const [questions] = useState<QuizQuestion[]>(() => {
    const allLessons = isSpanishCourse
      ? [...spanishA1InicialLessons, ...spanishA1IntermedioLessons, ...spanishFluencyLessons]
      : [...a1InicialLessons, ...a1IntermedioLessons, ...fluencyLessons];
    const pool = allLessons.flatMap(l => l.quiz).filter(q => q.options && q.options.length > 1);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return randomizeQuestionsOptions(shuffled.slice(0, 3));
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [score, setScore] = useState(0);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIdx];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = isSpanishCourse ? 'es-ES' : 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSelectOption = (option: string) => {
    if (status !== 'idle' || !currentQ) return;
    setSelectedOption(option);
    const isRight = option === currentQ.correctAnswer;
    setStatus(isRight ? 'correct' : 'incorrect');
    if (isRight) {
      playTactileSound('stamp');
      setScore(s => s + 1);
    } else {
      playTactileSound('error');
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      playTactileSound('flip');
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setStatus('idle');
    } else {
      playTactileSound('win');
      setIsDone(true);
      const bonusXp = 50 + score * 20;
      onCompleteChallenge(bonusXp);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18, rotate: -0.5 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl w-full max-w-lg shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-amber-300 dark:bg-zinc-800 border-b-2 border-slate-900 dark:border-zinc-700 p-5 text-slate-950 dark:text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 flex items-center justify-center font-black shadow-[3px_3px_0px_0px_#0f172a]">
                <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-700 dark:text-zinc-300">
                  {isSpanishCourse ? 'Speed Card Workout' : 'Mazo de Entrenamiento Exprés'}
                </span>
                <h2 className="text-xl font-black">
                  {isSpanishCourse ? 'Daily A1 Challenge' : 'Desafío Diario A1'}
                </h2>
              </div>
            </div>
            <button
              onClick={() => {
                playTactileSound('pop');
                onClose();
              }}
              className="p-2 rounded-xl bg-white dark:bg-zinc-900 border-2 border-slate-900 text-slate-950 dark:text-white shadow-[2px_2px_0px_0px_#0f172a] hover:bg-rose-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1 bg-[#FAF6EE] dark:bg-zinc-950">
            {!isDone && currentQ ? (
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 border-2 border-slate-900 text-xs font-black text-slate-950 dark:text-white tabular-nums">
                    {isSpanishCourse
                      ? `Card ${currentIdx + 1} / ${questions.length}`
                      : `Carta ${currentIdx + 1} / ${questions.length}`}
                  </span>
                  <div className="flex items-center gap-2">
                    {status === 'correct' && (
                      <motion.span
                        initial={{ scale: 1.5, rotate: -12 }}
                        animate={{ scale: 1, rotate: -4 }}
                        className="px-2.5 py-0.5 rounded-lg bg-emerald-300 border-2 border-slate-900 text-slate-950 text-xs font-black"
                      >
                        ✓ STAMPED!
                      </motion.span>
                    )}
                    <div className="flex items-center gap-1 text-xs font-black text-slate-900 dark:text-amber-300 tabular-nums">
                      <Zap className="w-4 h-4 fill-amber-500 text-amber-500" /> +{50 + (currentIdx + 1) * 20} XP
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex items-start justify-between gap-3 mb-5">
                  <h3 className="text-lg font-black text-slate-950 dark:text-zinc-100">
                    {currentQ.question}
                  </h3>
                  <button
                    onClick={() => speakText(currentQ.question)}
                    className="p-2.5 rounded-xl bg-indigo-600 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-2.5">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === currentQ.correctAnswer;
                    const optionLetter = String.fromCharCode(65 + i);

                    let btnClass =
                      'w-full text-left p-3.5 rounded-2xl border-2 font-extrabold text-sm transition-all flex items-center justify-between gap-2 ';

                    if (status === 'idle') {
                      btnClass +=
                        'border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-100 hover:bg-yellow-100 shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px]';
                    } else if (isSelected && status === 'correct') {
                      btnClass +=
                        'border-slate-900 bg-emerald-300 text-slate-950 shadow-[3px_3px_0px_0px_#0f172a]';
                    } else if (isSelected && status === 'incorrect') {
                      btnClass += 'border-slate-900 bg-rose-300 text-slate-950';
                    } else if (!isSelected && isCorrect && status === 'incorrect') {
                      btnClass +=
                        'border-slate-900 bg-emerald-300 text-slate-950 shadow-[3px_3px_0px_0px_#0f172a]';
                    } else {
                      btnClass +=
                        'border-slate-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 opacity-45 text-slate-500';
                    }

                    return (
                      <motion.button
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={
                          isSelected && status === 'incorrect'
                            ? { opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }
                            : { opacity: 1, y: 0, x: 0 }
                        }
                        transition={{ delay: status === 'idle' ? i * 0.04 : 0 }}
                        onClick={() => handleSelectOption(opt)}
                        disabled={status !== 'idle'}
                        className={btnClass}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-600 text-xs font-black text-slate-950 dark:text-white flex items-center justify-center shrink-0">
                            {optionLetter}
                          </span>
                          <span>{opt}</span>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-5 p-4 rounded-2xl text-xs font-bold border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] ${
                      status === 'correct'
                        ? 'bg-emerald-200 text-slate-950'
                        : 'bg-rose-200 text-slate-950'
                    }`}
                  >
                    <p className="font-black mb-1">
                      {status === 'correct'
                        ? isSpanishCourse
                          ? '✓ Correct Card!'
                          : '✓ ¡Carta Correcta!'
                        : isSpanishCourse
                          ? 'Check this rule:'
                          : 'Revisa esta regla:'}
                    </p>
                    <p>{currentQ.explanation}</p>
                  </motion.div>
                )}

                <motion.button
                  whileHover={status !== 'idle' ? { y: -2 } : undefined}
                  whileTap={status !== 'idle' ? { scale: 0.98, x: 2, y: 2 } : undefined}
                  onClick={handleNext}
                  disabled={status === 'idle'}
                  className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl py-3.5 font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-all"
                >
                  <span>
                    {currentIdx < questions.length - 1
                      ? isSpanishCourse
                        ? 'Next Card'
                        : 'Siguiente Carta'
                      : isSpanishCourse
                        ? 'Complete & Claim XP'
                        : 'Completar y Reclamar XP'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-emerald-300 border-2 border-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a]">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-slate-950 dark:text-zinc-100">
                  {isSpanishCourse ? 'Daily Deck Cleared!' : '¡Mazo Diario Completado!'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 mb-6 font-bold">
                  {isSpanishCourse
                    ? `You stamped ${score} out of 3 cards today!`
                    : `Has sellado ${score} de 3 cartas en el reto de hoy.`}
                </p>

                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 font-black text-sm mb-6 shadow-[3px_3px_0px_0px_#0f172a] tabular-nums">
                  <Zap className="w-4 h-4 fill-slate-950" /> +{50 + score * 20} XP
                </div>

                <button
                  onClick={() => {
                    playTactileSound('pop');
                    onClose();
                  }}
                  className="w-full bg-slate-950 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black py-3.5 rounded-2xl text-sm border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] transition-all"
                >
                  {isSpanishCourse ? 'Back to Card Table' : 'Volver a la Mesa'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
