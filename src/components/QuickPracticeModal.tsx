import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Zap, Star, Play, Award } from 'lucide-react';
import { playSpeech } from '../utils/speech';

import { SPANISH_QUICK_QUESTIONS } from '../data/spanishData';

interface QuickPracticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXP: (amount: number) => void;
  courseLanguage?: 'en' | 'es';
}

interface QuickQuestion {
  id: string;
  type: 'vocab' | 'listening' | 'word-order' | 'phrase';
  question: string;
  options: string[];
  correct: string;
  explanation: string;
  audioText?: string;
}

const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: 'q1',
    type: 'vocab',
    question: '¿Cómo se dice "desayuno" en inglés?',
    options: ['Lunch', 'Breakfast', 'Dinner', 'Snack'],
    correct: 'Breakfast',
    explanation: 'Breakfast = Desayuno, Lunch = Almuerzo, Dinner = Cena.'
  },
  {
    id: 'q2',
    type: 'listening',
    question: 'Escucha el audio y selecciona la frase que escuchaste:',
    options: ['Where is the bathroom?', 'Where is the train?', 'Where is the bus?', 'Where is the hotel?'],
    correct: 'Where is the bathroom?',
    audioText: 'Where is the bathroom?',
    explanation: 'Escuchaste "Where is the bathroom?" (¿Dónde está el baño?).'
  },
  {
    id: 'q3',
    type: 'word-order',
    question: 'Ordena la frase: "Yo tengo dos perros".',
    options: ['I have two dogs.', 'I two dogs have.', 'Have I two dogs.', 'Two dogs I have.'],
    correct: 'I have two dogs.',
    explanation: 'Sujeto (I) + Verbo (have) + Objeto (two dogs).'
  },
  {
    id: 'q4',
    type: 'phrase',
    question: '¿Qué frase usas para pedir un café en una cafetería?',
    options: ['Give me coffee now.', 'Can I get a coffee, please?', 'I want coffee quickly.', 'Coffee is good.'],
    correct: 'Can I get a coffee, please?',
    explanation: '"Can I get a coffee, please?" es la forma más educada y natural.'
  },
  {
    id: 'q5',
    type: 'vocab',
    question: '¿Cuál es el significado de "ALWAYS"?',
    options: ['Nunca', 'A veces', 'Siempre', 'Raramente'],
    correct: 'Siempre',
    explanation: 'Always = Siempre. (Never = Nunca, Sometimes = A veces).'
  }
];

export function QuickPracticeModal({ isOpen, onClose, onAddXP, courseLanguage = 'en' }: QuickPracticeModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const questionsList = courseLanguage === 'es' ? (SPANISH_QUICK_QUESTIONS as any) : QUICK_QUESTIONS;
  const currentQ = questionsList[currentIndex] || questionsList[0];

  const speakText = (text: string) => {
    playSpeech(text, {
      courseLanguage,
      rate: 0.85
    });
  };

  const handleSelectOption = (option: string) => {
    if (status !== 'idle') return;
    setSelectedOption(option);
    const isCorrect = option === currentQ.correct;
    if (isCorrect) {
      setStatus('correct');
      setScore(s => s + 1);
      onAddXP(15);
      if (currentQ.audioText) speakText(currentQ.audioText);
    } else {
      setStatus('incorrect');
    }
  };

  const handleNext = () => {
    if (currentIndex < QUICK_QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setStatus('idle');
    } else {
      // Completed
      setStatus('idle');
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setStatus('idle');
    setScore(0);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Zap className="w-5 h-5 text-yellow-200 fill-yellow-200" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                  Repaso Exprès 5 Minutos
                </span>
                <h3 className="text-lg font-black">Práctica Rápida A1</h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 text-zinc-900 dark:text-zinc-100">
            {currentIndex < QUICK_QUESTIONS.length ? (
              <div>
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs font-black text-zinc-500 mb-2">
                  <span>Pregunta {currentIndex + 1} de {QUICK_QUESTIONS.length}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" /> +15 XP por acierto
                  </span>
                </div>

                <div className="h-2.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300 rounded-full"
                    style={{ width: `${((currentIndex + 1) / QUICK_QUESTIONS.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <div className="bg-amber-50/60 dark:bg-zinc-800/60 border border-amber-200/60 dark:border-zinc-700 rounded-2xl p-5 mb-5 text-center">
                  {currentQ.audioText && (
                    <button
                      onClick={() => speakText(currentQ.audioText!)}
                      className="mb-3 px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
                    >
                      <Volume2 className="w-4 h-4 animate-bounce" />
                      <span>Reproducir Audio</span>
                    </button>
                  )}
                  <h4 className="text-base md:text-lg font-black text-zinc-900 dark:text-zinc-100">
                    {currentQ.question}
                  </h4>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQ.correct;
                    let btnStyle = 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-amber-400';

                    if (status !== 'idle') {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-500 font-black shadow-md';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-500 text-white border-rose-500 font-black';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option)}
                        disabled={status !== 'idle'}
                        className={`p-3.5 rounded-2xl border-2 text-xs md:text-sm font-extrabold transition-all text-left flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {status !== 'idle' && isCorrect && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl mb-5 text-xs md:text-sm font-medium border ${
                      status === 'correct'
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 text-emerald-800 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 text-rose-800 dark:text-rose-200'
                    }`}
                  >
                    <p className="font-extrabold mb-1">
                      {status === 'correct' ? '¡Correcto! +15 XP' : 'Respuesta correcta: ' + currentQ.correct}
                    </p>
                    <p className="opacity-90">{currentQ.explanation}</p>
                  </motion.div>
                )}

                {/* Next */}
                {status !== 'idle' && (
                  <button
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3.5 rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 hover:from-amber-600 hover:to-orange-600 transition-all"
                  >
                    <span>Continuar</span>
                    <Play className="w-4 h-4 fill-white" />
                  </button>
                )}
              </div>
            ) : (
              /* Finish Screen */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-500 flex items-center justify-center mx-auto mb-3 text-3xl shadow-md">
                  🎉
                </div>
                <h4 className="text-xl font-black mb-1">¡Repaso Completado!</h4>
                <p className="text-xs text-zinc-500 mb-6">
                  Lograste <strong>{score} de {QUICK_QUESTIONS.length} aciertos</strong>. La constancia es la clave para hablar inglés fluido.
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleRestart}
                    className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-200 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Repetir
                  </button>
                  <button
                    onClick={onClose}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-2.5 rounded-xl text-xs shadow-md"
                  >
                    ¡Listo!
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
