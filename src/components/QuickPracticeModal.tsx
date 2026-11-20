import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, CheckCircle2, RefreshCw, Zap, Star, Play } from 'lucide-react';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';
import { SPANISH_QUICK_QUESTIONS } from '../data/spanishData';
import { randomizeQuestionsOptions, shuffleOptionsList } from '../utils/shuffleOptions';

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
  isRetry?: boolean;
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
    options: [
      'Where is the train?',
      'Where is the bus?',
      'Where is the bathroom?',
      'Where is the hotel?'
    ],
    correct: 'Where is the bathroom?',
    audioText: 'Where is the bathroom?',
    explanation: 'Escuchaste "Where is the bathroom?" (¿Dónde está el baño?).'
  },
  {
    id: 'q3',
    type: 'word-order',
    question: 'Ordena la frase: "Yo tengo dos perros".',
    options: [
      'I two dogs have.',
      'Have I two dogs.',
      'Two dogs I have.',
      'I have two dogs.'
    ],
    correct: 'I have two dogs.',
    explanation: 'Sujeto (I) + Verbo (have) + Objeto (two dogs).'
  },
  {
    id: 'q4',
    type: 'phrase',
    question: '¿Qué frase usas para pedir un café de forma educada en una cafetería?',
    options: [
      'Give me coffee now.',
      'Could I have a coffee, please?',
      'I want coffee quickly.',
      'Coffee is good.'
    ],
    correct: 'Could I have a coffee, please?',
    explanation: '"Could I have a coffee, please?" es la forma más educada y natural.'
  },
  {
    id: 'q5',
    type: 'vocab',
    question: '¿Cuál es el significado de "ALWAYS"?',
    options: ['Nunca', 'A veces', 'Siempre', 'Raramente'],
    correct: 'Siempre',
    explanation: 'Always = Siempre. (Never = Nunca, Sometimes = A veces).'
  },
  {
    id: 'q6',
    type: 'phrase',
    question: 'Trampa común A1: ¿Cómo se dice "Tengo 25 años" en inglés?',
    options: [
      'I have 25 years.',
      'I am 25 years old.',
      'I am 25 years.',
      'My age has 25.'
    ],
    correct: 'I am 25 years old.',
    explanation: 'En inglés la edad se expresa con el verbo To Be ("I am 25 years old"), nunca con "have".'
  },
  {
    id: 'q7',
    type: 'listening',
    question: 'Escucha el audio y selecciona la frase exacta:',
    options: [
      'How much does this cost?',
      'How many do you want?',
      'What time does it open?',
      'Where is the nearest bank?'
    ],
    correct: 'How much does this cost?',
    audioText: 'How much does this cost?',
    explanation: '"How much does this cost?" significa "¿Cuánto cuesta esto?".'
  },
  {
    id: 'q8',
    type: 'word-order',
    question: 'Nivel A2: Elige la oración correcta para "Llevo tres años viviendo aquí":',
    options: [
      'I have been living here for three years.',
      'I live here since three years.',
      'I am living here three years ago.',
      'I have lived here since three years.'
    ],
    correct: 'I have been living here for three years.',
    explanation: 'Para acciones que empezaron en el pasado y continúan hoy usamos "have been + -ing" con "for" (duración).'
  },
  {
    id: 'q9',
    type: 'phrase',
    question: 'Nivel A2: Completa "Taking the subway is _____ faster than driving":',
    options: ['much', 'very', 'more', 'too'],
    correct: 'much',
    explanation: 'Para decir "mucho más rápido" antes de un comparativo usamos "much" (much faster), nunca "very" ni "more".'
  },
  {
    id: 'q10',
    type: 'phrase',
    question: 'Nivel B1: Completa el condicional "If I _____ more time, I would travel more":',
    options: ['had', 'would have', 'have', 'will have'],
    correct: 'had',
    explanation: 'Second Conditional: If + Past Simple (had), + would + verbo base (would travel).'
  },
  {
    id: 'q11',
    type: 'vocab',
    question: 'Nivel B1: ¿Qué significa la expresión "Every now and then"?',
    options: ['De vez en cuando', 'Ahora mismo', 'Nunca jamás', 'Todo el tiempo'],
    correct: 'De vez en cuando',
    explanation: '"Every now and then" es una expresión natural de nivel B1 que significa "de vez en cuando".'
  },
  {
    id: 'q12',
    type: 'phrase',
    question: 'Nivel B2: Elige la inversión formal equivalente a "If I had known earlier...":',
    options: [
      'Had I known earlier...',
      'Have I knew earlier...',
      'Did I know earlier...',
      'Would I have known earlier...'
    ],
    correct: 'Had I known earlier...',
    explanation: 'En nivel B2, "Had I known..." invierte el auxiliar "Had" para eliminar "If" con gran elegancia ("De haberlo sabido...").'
  }
];

const EXTRA_SPANISH_QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: 'es_q6',
    type: 'phrase',
    question: 'Why do we say "Me gustan los libros" with an "-n" at the end of "gustan"?',
    options: [
      'Because "los libros" is plural, and gustar agrees with the thing liked',
      'Because "Me" is plural',
      'Because it is past tense',
      'Because all Spanish verbs end in -n'
    ],
    correct: 'Because "los libros" is plural, and gustar agrees with the thing liked',
    explanation: 'With "gustar", use "gusta" for singular nouns/infinitives and "gustan" for plural nouns ("los libros").'
  },
  {
    id: 'es_q7',
    type: 'phrase',
    question: 'Level A2: Complete "Cuando era niño, _____ (jugar) en el parque todos los días":',
    options: ['jugaba', 'jugué', 'jugaré', 'jugando'],
    correct: 'jugaba',
    explanation: 'For repeated childhood habits ("used to play"), Spanish uses the Imperfect tense: "jugaba".'
  },
  {
    id: 'es_q8',
    type: 'listening',
    question: 'Listen and choose the exact Spanish sentence you hear:',
    options: [
      'Llevo dos años estudiando español.',
      'Tengo dos hermanos en Madrid.',
      'Mañana voy a visitar el museo.',
      '¿A qué hora sale el próximo tren?'
    ],
    correct: 'Llevo dos años estudiando español.',
    audioText: 'Llevo dos años estudiando español.',
    explanation: '"Llevo dos años estudiando español" = I have been studying Spanish for two years.'
  },
  {
    id: 'es_q9',
    type: 'phrase',
    question: 'Level B1: Complete "Te recomiendo que _____ (probar) la paella":',
    options: ['pruebes', 'pruebas', 'probaste', 'probarás'],
    correct: 'pruebes',
    explanation: 'Verbs of recommendation ("Te recomiendo que...") require the Present Subjunctive: "pruebes".'
  },
  {
    id: 'es_q10',
    type: 'phrase',
    question: 'Level B2: Complete "Si _____ (tener) más tiempo libre, viajaría por Sudamérica":',
    options: ['tuviera', 'tendría', 'tengo', 'tuve'],
    correct: 'tuviera',
    explanation: 'In hypothetical "Si" clauses, use the Imperfect Subjunctive ("Si tuviera..."), never the Conditional after "Si".'
  }
];

export function QuickPracticeModal({
  isOpen,
  onClose,
  onAddXP,
  courseLanguage = 'en'
}: QuickPracticeModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [firstTryScore, setFirstTryScore] = useState(0);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const isSpanishCourse = courseLanguage === 'es';

  const buildDeck = (): QuickQuestion[] => {
    const rawPool = isSpanishCourse
      ? [...(SPANISH_QUICK_QUESTIONS as QuickQuestion[]), ...EXTRA_SPANISH_QUICK_QUESTIONS]
      : QUICK_QUESTIONS;
    const shuffledPool = [...rawPool].sort(() => 0.5 - Math.random()).slice(0, 8);
    return randomizeQuestionsOptions(shuffledPool.map(q => ({ ...q, isRetry: false })));
  };

  const [questionsQueue, setQuestionsQueue] = useState<QuickQuestion[]>(() => buildDeck());
  const [initialCount, setInitialCount] = useState<number>(8);

  useEffect(() => {
    const fresh = buildDeck();
    setQuestionsQueue(fresh);
    setInitialCount(fresh.length);
    setCurrentIndex(0);
    setSelectedOption(null);
    setStatus('idle');
    setFirstTryScore(0);
  }, [isSpanishCourse, shuffleSeed]);

  if (!isOpen) return null;

  const currentQ = questionsQueue[currentIndex] || questionsQueue[0];

  const speakText = (text: string) => {
    playSpeech(text, {
      courseLanguage,
      rate: 0.88
    });
  };

  const handleSelectOption = (option: string) => {
    if (status !== 'idle' || !currentQ) return;
    setSelectedOption(option);
    const isCorrect = option === currentQ.correct;
    if (isCorrect) {
      playTactileSound('stamp');
      setStatus('correct');
      if (!currentQ.isRetry) {
        setFirstTryScore(s => s + 1);
      }
      onAddXP(15);
      if (currentQ.audioText) {
        speakText(currentQ.audioText);
      } else {
        speakText(currentQ.correct);
      }
    } else {
      playTactileSound('error');
      setStatus('incorrect');
      // Re-queue missed card at the end of the sprint with reshuffled options!
      const prevIdx = currentQ.options.indexOf(currentQ.correct);
      const reshuffled = shuffleOptionsList(currentQ.options, currentQ.correct, prevIdx);
      setQuestionsQueue(prev => [
        ...prev,
        { ...currentQ, options: reshuffled, isRetry: true }
      ]);
    }
  };

  const handleNext = () => {
    if (currentIndex < questionsQueue.length - 1) {
      playTactileSound('flip');
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setStatus('idle');
    } else {
      playTactileSound('win');
      setCurrentIndex(questionsQueue.length);
      setStatus('idle');
    }
  };

  const handleRestart = () => {
    playTactileSound('flip');
    setShuffleSeed(s => s + 1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 18, rotate: -0.5 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl w-full max-w-xl shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-5 bg-emerald-300 dark:bg-zinc-800 border-b-2 border-slate-900 dark:border-zinc-700 text-slate-950 dark:text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 flex items-center justify-center shadow-[3px_3px_0px_0px_#0f172a]">
                <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-700 dark:text-zinc-300">
                  {isSpanishCourse ? 'Adaptive 8-Card Sprint (A1–B2)' : 'Mazo Adaptativo de 8 Cartas (A1–B2)'}
                </span>
                <h3 className="text-lg font-black">
                  {isSpanishCourse ? 'Spanish Quick Practice' : 'Práctica Rápida en Inglés'}
                </h3>
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

          {/* Content Body */}
          <div className="p-6 text-slate-950 dark:text-zinc-100 bg-[#FAF6EE] dark:bg-zinc-950">
            {currentIndex < questionsQueue.length ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              >
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs font-black text-slate-700 dark:text-zinc-300 mb-2">
                  <div className="flex items-center gap-2">
                    <span>
                      {isSpanishCourse
                        ? `Card ${currentIndex + 1} of ${questionsQueue.length}`
                        : `Carta ${currentIndex + 1} de ${questionsQueue.length}`}
                    </span>
                    {currentQ.isRetry && (
                      <span className="px-2 py-0.5 rounded-md bg-amber-200 text-slate-950 border border-slate-900 text-[10px] font-black">
                        {isSpanishCourse ? 'Retry Card' : 'Carta de Refuerzo'}
                      </span>
                    )}
                  </div>
                  <span className="text-amber-600 dark:text-amber-400 font-black flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />{' '}
                    {isSpanishCourse ? '+15 XP per card' : '+15 XP por carta'}
                  </span>
                </div>

                <div className="h-3.5 w-full bg-white dark:bg-zinc-800 rounded-full overflow-hidden mb-6 border-2 border-slate-900 dark:border-zinc-600 p-0.5">
                  <motion.div
                    className="h-full bg-emerald-400 rounded-full"
                    animate={{ width: `${((currentIndex + 1) / questionsQueue.length) * 100}%` }}
                    transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  />
                </div>

                {/* Question Card */}
                <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-2xl p-5 mb-5 text-center shadow-[4px_4px_0px_0px_#0f172a]">
                  {currentQ.audioText && (
                    <button
                      onClick={() => speakText(currentQ.audioText!)}
                      className="mb-3 px-4 py-2 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs inline-flex items-center gap-2 shadow-[2px_2px_0px_0px_#0f172a] transition-all active:scale-95"
                    >
                      <Volume2 className="w-4 h-4 animate-bounce" />
                      <span>{isSpanishCourse ? 'Play Card Audio' : 'Reproducir Audio'}</span>
                    </button>
                  )}
                  <h4 className="text-base md:text-xl font-black text-slate-950 dark:text-zinc-100">
                    {currentQ.question}
                  </h4>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQ.correct;
                    const optionLetter = String.fromCharCode(65 + idx);
                    let btnStyle =
                      'bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 hover:bg-yellow-100 shadow-[3px_3px_0px_0px_#0f172a]';

                    if (status !== 'idle') {
                      if (isCorrect) {
                        btnStyle =
                          'bg-emerald-300 text-slate-950 border-2 border-slate-900 font-black shadow-[3px_3px_0px_0px_#0f172a]';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-300 text-slate-950 border-2 border-slate-900 font-black';
                      } else {
                        btnStyle = 'bg-white/50 dark:bg-zinc-900/40 border border-slate-300 opacity-45';
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: status === 'idle' ? idx * 0.04 : 0 }}
                        onClick={() => handleSelectOption(option)}
                        disabled={status !== 'idle'}
                        className={`p-3.5 rounded-2xl text-xs md:text-sm font-extrabold transition-all text-left flex items-center justify-between gap-2 active:translate-x-[2px] active:translate-y-[2px] ${btnStyle}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-zinc-800 border border-slate-900 text-xs font-black text-slate-950 dark:text-white flex items-center justify-center shrink-0">
                            {optionLetter}
                          </span>
                          <span>{option}</span>
                        </span>
                        {status !== 'idle' && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-2xl mb-5 text-xs md:text-sm font-bold border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] ${
                      status === 'correct'
                        ? 'bg-emerald-200 text-slate-950'
                        : 'bg-rose-200 text-slate-950'
                    }`}
                  >
                    <p className="font-black mb-1">
                      {status === 'correct'
                        ? isSpanishCourse
                          ? '✓ STAMPED! +15 XP'
                          : '✓ ¡SELLADO! +15 XP'
                        : isSpanishCourse
                          ? `Correct answer: ${currentQ.correct} (We shuffled this card to the end so you can master it!)`
                          : `Respuesta correcta: ${currentQ.correct} (Se barajó al final del mazo para que la domines)`}
                    </p>
                    <p>{currentQ.explanation}</p>
                  </motion.div>
                )}

                {/* Next */}
                {status !== 'idle' && (
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98, x: 2, y: 2 }}
                    onClick={handleNext}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-2xl font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-all"
                  >
                    <span>{isSpanishCourse ? 'Deal Next Card' : 'Siguiente Carta'}</span>
                    <Play className="w-4 h-4 fill-white" />
                  </motion.button>
                )}
              </motion.div>
            ) : (
              /* Finish Screen */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-yellow-300 border-2 border-slate-900 text-slate-950 flex items-center justify-center mx-auto mb-3 text-3xl shadow-[4px_4px_0px_0px_#0f172a]">
                  🎉
                </div>
                <h4 className="text-xl font-black mb-1">
                  {isSpanishCourse ? '100% Cards Mastered!' : '¡100% de las Cartas Dominadas!'}
                </h4>
                <p className="text-xs font-bold text-slate-600 dark:text-zinc-400 mb-6">
                  {isSpanishCourse ? (
                    <>
                      First-try accuracy:{' '}
                      <strong>
                        {firstTryScore} / {initialCount}
                      </strong>{' '}
                      (all missed cards were reviewed and stamped!).
                    </>
                  ) : (
                    <>
                      Aciertos al primer intento:{' '}
                      <strong>
                        {firstTryScore} de {initialCount}
                      </strong>{' '}
                      (todas las cartas pendientes fueron repasadas y selladas).
                    </>
                  )}
                </p>

                <div className="flex gap-3 justify-center">
                  <button
                    onClick={handleRestart}
                    className="bg-white dark:bg-zinc-800 border-2 border-slate-900 text-slate-950 dark:text-zinc-100 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-[3px_3px_0px_0px_#0f172a]"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />{' '}
                    {isSpanishCourse ? 'New 8-Card Sprint' : 'Nuevo Mazo de 8 Cartas'}
                  </button>
                  <button
                    onClick={() => {
                      playTactileSound('pop');
                      onClose();
                    }}
                    className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 border-2 border-slate-900 font-black px-6 py-2.5 rounded-xl text-xs shadow-[3px_3px_0px_0px_#0f172a]"
                  >
                    {isSpanishCourse ? 'Done!' : '¡Listo!'}
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
