import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Zap, BookOpen, Star, Play } from 'lucide-react';
import { playSpeech } from '../utils/speech';

interface VerbData {
  id: string;
  infinitive: string;
  translation: string;
  thirdPerson: string;
  past: string;
  type: 'regular' | 'irregular' | 'modal';
  forms: {
    pronoun: string;
    present: string;
    negative: string;
    exampleEn: string;
    exampleEs: string;
  }[];
  tip: string;
}

const A1_VERBS: VerbData[] = [
  {
    id: 'be',
    infinitive: 'To Be',
    translation: 'Ser / Estar',
    thirdPerson: 'is',
    past: 'was / were',
    type: 'irregular',
    tip: '¡El verbo más importante en inglés! Cambia por completo según el sujeto (am, is, are).',
    forms: [
      { pronoun: 'I', present: 'am', negative: 'am not', exampleEn: 'I am a student.', exampleEs: 'Yo soy estudiante.' },
      { pronoun: 'You', present: 'are', negative: 'are not (aren\'t)', exampleEn: 'You are very kind.', exampleEs: 'Tú eres muy amable.' },
      { pronoun: 'He / She / It', present: 'is', negative: 'is not (isn\'t)', exampleEn: 'She is at home.', exampleEs: 'Ella está en casa.' },
      { pronoun: 'We', present: 'are', negative: 'are not (aren\'t)', exampleEn: 'We are ready!', exampleEs: '¡Estamos listos!' },
      { pronoun: 'They', present: 'are', negative: 'are not (aren\'t)', exampleEn: 'They are happy.', exampleEs: 'Ellos están felices.' },
    ]
  },
  {
    id: 'have',
    infinitive: 'To Have',
    translation: 'Tener / Haber',
    thirdPerson: 'has',
    past: 'had',
    type: 'irregular',
    tip: 'Con He, She e It se usa "HAS" (no "haves"). Con los demás pronombres se usa "HAVE".',
    forms: [
      { pronoun: 'I', present: 'have', negative: 'don\'t have', exampleEn: 'I have a car.', exampleEs: 'Tengo un auto.' },
      { pronoun: 'You', present: 'have', negative: 'don\'t have', exampleEn: 'You have a nice smile.', exampleEs: 'Tienes una bonita sonrisa.' },
      { pronoun: 'He / She / It', present: 'has', negative: 'doesn\'t have', exampleEn: 'He has a dog.', exampleEs: 'Él tiene un perro.' },
      { pronoun: 'We', present: 'have', negative: 'don\'t have', exampleEn: 'We have time.', exampleEs: 'Tenemos tiempo.' },
      { pronoun: 'They', present: 'have', negative: 'don\'t have', exampleEn: 'They have two children.', exampleEs: 'Tienen dos hijos.' },
    ]
  },
  {
    id: 'like',
    infinitive: 'To Like',
    translation: 'Gustar',
    thirdPerson: 'likes',
    past: 'liked',
    type: 'regular',
    tip: 'En Present Simple, agrega una "-s" al verbo cuando hables de He, She o It (He likes).',
    forms: [
      { pronoun: 'I', present: 'like', negative: 'don\'t like', exampleEn: 'I like coffee.', exampleEs: 'Me gusta el café.' },
      { pronoun: 'You', present: 'like', negative: 'don\'t like', exampleEn: 'You like music.', exampleEs: 'Te gusta la música.' },
      { pronoun: 'He / She / It', present: 'likes', negative: 'doesn\'t like', exampleEn: 'She likes pizza.', exampleEs: 'A ella le gusta la pizza.' },
      { pronoun: 'We', present: 'like', negative: 'don\'t like', exampleEn: 'We like English!', exampleEs: '¡Nos gusta el inglés!' },
      { pronoun: 'They', present: 'like', negative: 'don\'t like', exampleEn: 'They like sports.', exampleEs: 'A ellos les gustan los deportes.' },
    ]
  },
  {
    id: 'want',
    infinitive: 'To Want',
    translation: 'Querer',
    thirdPerson: 'wants',
    past: 'wanted',
    type: 'regular',
    tip: 'Para expresar un deseo. Si pones otro verbo después, usa "to" (I want to learn).',
    forms: [
      { pronoun: 'I', present: 'want', negative: 'don\'t want', exampleEn: 'I want water, please.', exampleEs: 'Quiero agua, por favor.' },
      { pronoun: 'You', present: 'want', negative: 'don\'t want', exampleEn: 'You want to study.', exampleEs: 'Tú quieres estudiar.' },
      { pronoun: 'He / She / It', present: 'wants', negative: 'doesn\'t want', exampleEn: 'He wants an ice cream.', exampleEs: 'Él quiere un helado.' },
      { pronoun: 'We', present: 'want', negative: 'don\'t want', exampleEn: 'We want to travel.', exampleEs: 'Queremos viajar.' },
      { pronoun: 'They', present: 'want', negative: 'don\'t want', exampleEn: 'They want help.', exampleEs: 'Ellos quieren ayuda.' },
    ]
  },
  {
    id: 'go',
    infinitive: 'To Go',
    translation: 'Ir',
    thirdPerson: 'goes',
    past: 'went',
    type: 'irregular',
    tip: 'Con He/She/It se escribe "GOES" (/ɡoʊz/). El pasado irregular es "WENT".',
    forms: [
      { pronoun: 'I', present: 'go', negative: 'don\'t go', exampleEn: 'I go to work every day.', exampleEs: 'Voy al trabajo todos los días.' },
      { pronoun: 'You', present: 'go', negative: 'don\'t go', exampleEn: 'You go to gym.', exampleEs: 'Vas al gimnasio.' },
      { pronoun: 'He / She / It', present: 'goes', negative: 'doesn\'t go', exampleEn: 'She goes to school.', exampleEs: 'Ella va a la escuela.' },
      { pronoun: 'We', present: 'go', negative: 'don\'t go', exampleEn: 'We go home now.', exampleEs: 'Vamos a casa ahora.' },
      { pronoun: 'They', present: 'go', negative: 'don\'t go', exampleEn: 'They go on vacation.', exampleEs: 'Ellos van de vacaciones.' },
    ]
  },
  {
    id: 'can',
    infinitive: 'Can',
    translation: 'Poder / Saber hacer algo',
    thirdPerson: 'can',
    past: 'could',
    type: 'modal',
    tip: 'Verbo modal: ¡NUNCA cambia! No lleva "-s" con He/She/It y su negativa es "cannot" o "can\'t".',
    forms: [
      { pronoun: 'I', present: 'can', negative: 'can\'t', exampleEn: 'I can speak English!', exampleEs: '¡Puedo hablar inglés!' },
      { pronoun: 'You', present: 'can', negative: 'can\'t', exampleEn: 'You can do it.', exampleEs: 'Tú puedes hacerlo.' },
      { pronoun: 'He / She / It', present: 'can', negative: 'can\'t', exampleEn: 'He can swim fast.', exampleEs: 'Él puede nadar rápido.' },
      { pronoun: 'We', present: 'can', negative: 'can\'t', exampleEn: 'We can help you.', exampleEs: 'Podemos ayudarte.' },
      { pronoun: 'They', present: 'can', negative: 'can\'t', exampleEn: 'They can play guitar.', exampleEs: 'Ellos saben tocar guitarra.' },
    ]
  }
];

interface QuizQuestionItem {
  prompt: string;
  options: string[];
  correct: string;
  explanation: string;
  verbName: string;
}

const VERB_PRACTICE_QUESTIONS: QuizQuestionItem[] = [
  {
    prompt: 'Completa: She _____ (have) two cats.',
    options: ['have', 'has', 'haves', 'having'],
    correct: 'has',
    explanation: 'Con He, She e It se usa "has" en lugar de "have".',
    verbName: 'To Have'
  },
  {
    prompt: 'Completa: I _____ (be) ready for the test.',
    options: ['is', 'are', 'am', 'be'],
    correct: 'am',
    explanation: 'Con el pronombre "I", la forma del verbo To Be es "am".',
    verbName: 'To Be'
  },
  {
    prompt: 'Negativa: They _____ (not / like) cold weather.',
    options: ['doesn\'t like', 'don\'t like', 'not like', 'no likes'],
    correct: 'don\'t like',
    explanation: 'Para la negativa de They en presente usamos "don\'t" + verbo en infinitivo.',
    verbName: 'To Like'
  },
  {
    prompt: 'Completa: My brother _____ (go) to university in London.',
    options: ['go', 'gos', 'goes', 'going'],
    correct: 'goes',
    explanation: 'Para He/She/It con verbos terminados en -o, se agrega -es (goes).',
    verbName: 'To Go'
  },
  {
    prompt: 'Completa: He _____ (can / swim) very well.',
    options: ['can swims', 'cans swim', 'can swim', 'can to swim'],
    correct: 'can swim',
    explanation: 'El verbo modal "can" no cambia con He/She/It y va seguido de un verbo sin "to".',
    verbName: 'Can'
  },
  {
    prompt: 'Completa: We _____ (want) a coffee, please.',
    options: ['wants', 'wanting', 'want', 'wanted'],
    correct: 'want',
    explanation: 'Con el pronombre "We" usas la forma base del verbo "want".',
    verbName: 'To Want'
  }
];

import { SPANISH_A1_VERBS, SPANISH_VERB_PRACTICE_QUESTIONS } from '../data/spanishData';

interface VerbTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXP: (amount: number) => void;
  courseLanguage?: 'en' | 'es';
}

export function VerbTrainerModal({ isOpen, onClose, onAddXP, courseLanguage = 'en' }: VerbTrainerModalProps) {
  const [activeTab, setActiveTab] = useState<'study' | 'quiz'>('study');
  const activeVerbs = courseLanguage === 'es' ? (SPANISH_A1_VERBS as any) : A1_VERBS;
  const activeQuestions = courseLanguage === 'es' ? (SPANISH_VERB_PRACTICE_QUESTIONS as any) : VERB_PRACTICE_QUESTIONS;

  const [selectedVerbId, setSelectedVerbId] = useState<string>(activeVerbs[0]?.id || 'be');
  
  // Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [score, setScore] = useState<number>(0);

  if (!isOpen) return null;

  const currentVerb = activeVerbs.find((v: any) => v.id === selectedVerbId) || activeVerbs[0];
  const currentQuestion = activeQuestions[quizIndex] || activeQuestions[0];

  const speakText = (text: string) => {
    playSpeech(text, {
      courseLanguage,
      rate: 0.85
    });
  };

  const handleSelectAnswer = (option: string) => {
    if (quizStatus !== 'idle') return;
    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correct;
    if (isCorrect) {
      setQuizStatus('correct');
      setScore(s => s + 1);
      onAddXP(20);
      speakText(courseLanguage === 'es' ? ('¡Correcto! ' + currentQuestion.correct) : ('Correct! ' + currentQuestion.correct));
    } else {
      setQuizStatus('incorrect');
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < VERB_PRACTICE_QUESTIONS.length - 1) {
      setQuizIndex(i => i + 1);
      setSelectedOption(null);
      setQuizStatus('idle');
    } else {
      // Finished
      setQuizStatus('idle');
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizStatus('idle');
    setScore(0);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-xl shadow-inner">
                ⚡
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full">
                  Entrenador Gramatical A1
                </span>
                <h2 className="text-xl md:text-2xl font-black">Dominio de Verbos Clave</h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Tabs */}
          <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-2 gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('study')}
              className={`flex-1 py-3 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'study'
                  ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-md'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Tablas y Reglas de Conjugación</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 py-3 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'quiz'
                  ? 'bg-white dark:bg-zinc-800 text-purple-600 dark:text-purple-400 shadow-md'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>2. Test Interactivo de Práctica</span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto flex-1 text-zinc-900 dark:text-zinc-100">
            {activeTab === 'study' ? (
              <div className="space-y-6">
                {/* Verb Selector Chips */}
                <div className="flex flex-wrap gap-2">
                  {A1_VERBS.map(verb => (
                    <button
                      key={verb.id}
                      onClick={() => setSelectedVerbId(verb.id)}
                      className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-black transition-all flex items-center gap-1.5 border ${
                        selectedVerbId === verb.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/25 scale-105'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-indigo-300'
                      }`}
                    >
                      <span>{verb.infinitive}</span>
                      <span className="opacity-75 text-[10px]">({verb.translation})</span>
                    </button>
                  ))}
                </div>

                {/* Selected Verb Card */}
                <div className="bg-indigo-50/60 dark:bg-zinc-800/60 border border-indigo-100 dark:border-zinc-700/60 rounded-3xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
                          {currentVerb.infinitive}
                        </h3>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-200 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 uppercase">
                          {currentVerb.type}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                        Significado: <strong className="text-zinc-900 dark:text-zinc-100">{currentVerb.translation}</strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakText(`${currentVerb.infinitive}. ${currentVerb.translation}`)}
                        className="bg-indigo-600 text-white px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-indigo-700 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" /> Escuchar
                      </button>
                    </div>
                  </div>

                  {/* Golden Tip */}
                  <div className="bg-amber-100/70 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 rounded-2xl p-3.5 text-xs font-medium text-amber-900 dark:text-amber-200 mb-6 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Regla A1:</strong> {currentVerb.tip}</span>
                  </div>

                  {/* Conjugation Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm">
                      <thead>
                        <tr className="border-b border-indigo-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 font-extrabold uppercase">
                          <th className="pb-2">Sujeto</th>
                          <th className="pb-2">Presente</th>
                          <th className="pb-2">Negativa</th>
                          <th className="pb-2">Ejemplo en Uso</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-indigo-100 dark:divide-zinc-800">
                        {currentVerb.forms.map((form, idx) => (
                          <tr key={idx} className="hover:bg-indigo-100/40 dark:hover:bg-zinc-800/40 transition-colors">
                            <td className="py-3 font-black text-indigo-600 dark:text-indigo-400">{form.pronoun}</td>
                            <td className="py-3 font-bold text-zinc-900 dark:text-zinc-100">{form.present}</td>
                            <td className="py-3 font-semibold text-rose-600 dark:text-rose-400">{form.negative}</td>
                            <td className="py-3">
                              <div className="flex items-center justify-between gap-2">
                                <div>
                                  <p className="font-extrabold text-zinc-900 dark:text-zinc-100">{form.exampleEn}</p>
                                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{form.exampleEs}</p>
                                </div>
                                <button
                                  onClick={() => speakText(form.exampleEn)}
                                  className="p-1.5 rounded-lg hover:bg-indigo-200/50 dark:hover:bg-zinc-700 text-indigo-600 dark:text-indigo-300"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              /* Practice Quiz Tab */
              <div className="space-y-6">
                {quizIndex < VERB_PRACTICE_QUESTIONS.length ? (
                  <div className="bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 rounded-3xl p-6 md:p-8">
                    {/* Header Progress */}
                    <div className="flex items-center justify-between text-xs font-black text-zinc-500 mb-4">
                      <span>Pregunta {quizIndex + 1} de {VERB_PRACTICE_QUESTIONS.length}</span>
                      <span className="bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-full">
                        Score: {score} / {VERB_PRACTICE_QUESTIONS.length}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-black mb-6 text-zinc-900 dark:text-zinc-100">
                      {currentQuestion.prompt}
                    </h3>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentQuestion.correct;
                        let btnStyle = 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:border-purple-400';

                        if (quizStatus !== 'idle') {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-500 text-white border-emerald-500 font-black shadow-lg shadow-emerald-500/20';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-500 text-white border-rose-500 font-black';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectAnswer(option)}
                            disabled={quizStatus !== 'idle'}
                            className={`p-4 rounded-2xl border-2 text-sm font-extrabold transition-all text-left flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{option}</span>
                            {quizStatus !== 'idle' && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Banner */}
                    {quizStatus !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl mb-6 text-sm font-medium border ${
                          quizStatus === 'correct'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {quizStatus === 'correct' ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-extrabold mb-0.5">
                              {quizStatus === 'correct' ? '¡Excelente! +20 XP' : '¡Casi! Respuesta correcta: ' + currentQuestion.correct}
                            </p>
                            <p className="text-xs opacity-90">{currentQuestion.explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Next Button */}
                    {quizStatus !== 'idle' && (
                      <button
                        onClick={handleNextQuestion}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all"
                      >
                        <span>Siguiente Pregunta</span>
                        <Play className="w-4 h-4 fill-white" />
                      </button>
                    )}
                  </div>
                ) : (
                  /* Completion Screen */
                  <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-800/50 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-700">
                    <div className="w-20 h-20 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
                      🏆
                    </div>
                    <h3 className="text-2xl font-black mb-2">¡Práctica de Verbos Completada!</h3>
                    <p className="text-sm font-medium text-zinc-500 mb-6 max-w-md mx-auto">
                      Obtuviste <strong className="text-zinc-900 dark:text-zinc-100">{score} de {VERB_PRACTICE_QUESTIONS.length} aciertos</strong>. Los verbos son la columna vertebral de tus oraciones A1.
                    </p>

                    <button
                      onClick={restartQuiz}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-6 py-3.5 rounded-2xl text-sm shadow-lg transition-transform active:scale-95 inline-flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Volver a Practicar</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
