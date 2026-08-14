import React, { useState } from 'react';
import { QuizQuestion, UserProgress } from '../types';
import { a1InicialLessons, a1IntermedioLessons, fluencyLessons } from '../data';
import { spanishA1InicialLessons, spanishA1IntermedioLessons, spanishFluencyLessons } from '../data/spanishData';
import { motion, AnimatePresence } from 'motion/react';
import { X, Zap, Trophy, ChevronRight, Volume2, Flame } from 'lucide-react';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  onCompleteChallenge: (earnedXp: number) => void;
  courseLanguage?: 'en' | 'es';
}

export function DailyChallengeModal({ isOpen, onClose, progress, onCompleteChallenge, courseLanguage = 'en' }: DailyChallengeModalProps) {
  const isSpanishCourse = courseLanguage === 'es';

  // Select 3 random questions from all lessons of the active course
  const [questions] = useState<QuizQuestion[]>(() => {
    const allLessons = isSpanishCourse 
      ? [...spanishA1InicialLessons, ...spanishA1IntermedioLessons, ...spanishFluencyLessons]
      : [...a1InicialLessons, ...a1IntermedioLessons, ...fluencyLessons];
    const pool = allLessons.flatMap(l => l.quiz);
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
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
    if (isRight) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setStatus('idle');
    } else {
      setIsDone(true);
      const bonusXp = 50 + score * 20; // 50 base XP + 20 per correct answer
      onCompleteChallenge(bonusXp);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black shadow-inner">
                <Flame className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                  {isSpanishCourse ? 'Speed Workout' : 'Entrenamiento Express'}
                </span>
                <h2 className="text-xl font-black">
                  {isSpanishCourse ? 'Daily A1 Challenge' : 'Desafío Diario A1'}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex-1">
            {!isDone && currentQ ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {isSpanishCourse 
                      ? `Question ${currentIdx + 1} of ${questions.length}` 
                      : `Pregunta ${currentIdx + 1} de ${questions.length}`}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-black text-zinc-500">
                    <Zap className="w-4 h-4 fill-amber-500 text-amber-500" /> +{50 + (currentIdx + 1) * 20} XP
                  </div>
                </div>

                <div className="flex items-start justify-between gap-3 mb-6">
                  <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                    {currentQ.question}
                  </h3>
                  <button
                    onClick={() => speakText(currentQ.question)}
                    className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-amber-600 transition-colors shrink-0"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selectedOption === opt;
                    const isCorrect = opt === currentQ.correctAnswer;
                    
                    let btnClass = "w-full text-left p-4 rounded-2xl border-2 font-bold text-sm transition-all ";
                    
                    if (status === 'idle') {
                      btnClass += "border-zinc-200 dark:border-zinc-800 hover:border-amber-400 bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200";
                    } else if (isSelected && status === 'correct') {
                      btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300";
                    } else if (isSelected && status === 'incorrect') {
                      btnClass += "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300";
                    } else if (!isSelected && isCorrect && status === 'incorrect') {
                      btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300";
                    } else {
                      btnClass += "border-zinc-200 dark:border-zinc-800 opacity-40 text-zinc-800 dark:text-zinc-200";
                    }

                    return (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(opt)}
                        disabled={status !== 'idle'}
                        className={btnClass}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-4 rounded-2xl text-xs font-semibold ${
                      status === 'correct' 
                        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200 border border-emerald-300' 
                        : 'bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200 border border-rose-300'
                    }`}
                  >
                    <p className="font-extrabold mb-1">
                      {status === 'correct' 
                        ? (isSpanishCourse ? 'Excellent!' : '¡Excelente!') 
                        : (isSpanishCourse ? 'Incorrect Answer' : 'Respuesta Incorrecta')}
                    </p>
                    <p>{currentQ.explanation}</p>
                  </motion.div>
                )}

                <button
                  onClick={handleNext}
                  disabled={status === 'idle'}
                  className="mt-6 w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl py-3.5 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>
                    {currentIdx < questions.length - 1 
                      ? (isSpanishCourse ? 'Next Question' : 'Siguiente Pregunta') 
                      : (isSpanishCourse ? 'Complete Challenge' : 'Completar Desafío')}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-950/80 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-500 shadow-inner">
                  <Trophy className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black mb-2 text-zinc-900 dark:text-zinc-100">
                  {isSpanishCourse ? 'Daily Challenge Complete!' : '¡Desafío Diario Completado!'}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 font-medium">
                  {isSpanishCourse 
                    ? `You got ${score} out of 3 questions correct today!` 
                    : `Has acertado ${score} de 3 preguntas en el entrenamiento de hoy.`}
                </p>

                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 text-white font-black text-sm mb-6 shadow-md shadow-amber-500/20">
                  <Zap className="w-4 h-4 fill-white" /> +{50 + score * 20} {isSpanishCourse ? 'XP Added to your profile' : 'XP Añadidos a tu cuenta'}
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-3.5 rounded-2xl text-sm transition-all"
                >
                  {isSpanishCourse ? 'Back to Dashboard' : 'Regresar al Inicio'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
