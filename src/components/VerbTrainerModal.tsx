import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Zap, BookOpen, Play } from 'lucide-react';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';
import { SPANISH_A1_VERBS, SPANISH_VERB_PRACTICE_QUESTIONS } from '../data/spanishData';
import { randomizeQuestionsOptions, shuffleOptionsList } from '../utils/shuffleOptions';

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
      { pronoun: 'You', present: 'are', negative: "are not (aren't)", exampleEn: 'You are very kind.', exampleEs: 'Tú eres muy amable.' },
      { pronoun: 'He / She / It', present: 'is', negative: "is not (isn't)", exampleEn: 'She is at home.', exampleEs: 'Ella está en casa.' },
      { pronoun: 'We', present: 'are', negative: "are not (aren't)", exampleEn: 'We are ready!', exampleEs: '¡Estamos listos!' },
      { pronoun: 'They', present: 'are', negative: "are not (aren't)", exampleEn: 'They are happy.', exampleEs: 'Ellos están felices.' }
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
      { pronoun: 'I', present: 'have', negative: "don't have", exampleEn: 'I have a car.', exampleEs: 'Tengo un auto.' },
      { pronoun: 'You', present: 'have', negative: "don't have", exampleEn: 'You have a nice smile.', exampleEs: 'Tienes una bonita sonrisa.' },
      { pronoun: 'He / She / It', present: 'has', negative: "doesn't have", exampleEn: 'He has a dog.', exampleEs: 'Él tiene un perro.' },
      { pronoun: 'We', present: 'have', negative: "don't have", exampleEn: 'We have time.', exampleEs: 'Tenemos tiempo.' },
      { pronoun: 'They', present: 'have', negative: "don't have", exampleEn: 'They have two children.', exampleEs: 'Tienen dos hijos.' }
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
      { pronoun: 'I', present: 'like', negative: "don't like", exampleEn: 'I like coffee.', exampleEs: 'Me gusta el café.' },
      { pronoun: 'You', present: 'like', negative: "don't like", exampleEn: 'You like music.', exampleEs: 'Te gusta la música.' },
      { pronoun: 'He / She / It', present: 'likes', negative: "doesn't like", exampleEn: 'She likes pizza.', exampleEs: 'A ella le gusta la pizza.' },
      { pronoun: 'We', present: 'like', negative: "don't like", exampleEn: 'We like English!', exampleEs: '¡Nos gusta el inglés!' },
      { pronoun: 'They', present: 'like', negative: "don't like", exampleEn: 'They like sports.', exampleEs: 'A ellos les gustan los deportes.' }
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
      { pronoun: 'I', present: 'want', negative: "don't want", exampleEn: 'I want water, please.', exampleEs: 'Quiero agua, por favor.' },
      { pronoun: 'You', present: 'want', negative: "don't want", exampleEn: 'You want to study.', exampleEs: 'Tú quieres estudiar.' },
      { pronoun: 'He / She / It', present: 'wants', negative: "doesn't want", exampleEn: 'He wants an ice cream.', exampleEs: 'Él quiere un helado.' },
      { pronoun: 'We', present: 'want', negative: "don't want", exampleEn: 'We want to travel.', exampleEs: 'Queremos viajar.' },
      { pronoun: 'They', present: 'want', negative: "don't want", exampleEn: 'They want help.', exampleEs: 'Ellos quieren ayuda.' }
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
      { pronoun: 'I', present: 'go', negative: "don't go", exampleEn: 'I go to work every day.', exampleEs: 'Voy al trabajo todos los días.' },
      { pronoun: 'You', present: 'go', negative: "don't go", exampleEn: 'You go to the gym.', exampleEs: 'Vas al gimnasio.' },
      { pronoun: 'He / She / It', present: 'goes', negative: "doesn't go", exampleEn: 'She goes to school.', exampleEs: 'Ella va a la escuela.' },
      { pronoun: 'We', present: 'go', negative: "don't go", exampleEn: 'We go home now.', exampleEs: 'Vamos a casa ahora.' },
      { pronoun: 'They', present: 'go', negative: "don't go", exampleEn: 'They go on vacation.', exampleEs: 'Ellos van de vacaciones.' }
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
      { pronoun: 'I', present: 'can', negative: "can't", exampleEn: 'I can speak English!', exampleEs: '¡Puedo hablar inglés!' },
      { pronoun: 'You', present: 'can', negative: "can't", exampleEn: 'You can do it.', exampleEs: 'Tú puedes hacerlo.' },
      { pronoun: 'He / She / It', present: 'can', negative: "can't", exampleEn: 'He can swim fast.', exampleEs: 'Él puede nadar rápido.' },
      { pronoun: 'We', present: 'can', negative: "can't", exampleEn: 'We can help you.', exampleEs: 'Podemos ayudarte.' },
      { pronoun: 'They', present: 'can', negative: "can't", exampleEn: 'They can play guitar.', exampleEs: 'Ellos saben tocar guitarra.' }
    ]
  },
  {
    id: 'do',
    infinitive: 'To Do',
    translation: 'Hacer (actividades / auxiliar)',
    thirdPerson: 'does',
    past: 'did',
    type: 'irregular',
    tip: 'Además de significar "hacer" (do homework, do exercise), es el auxiliar para preguntas y negativas en presente (Do you...? / He doesn\'t...).',
    forms: [
      { pronoun: 'I', present: 'do', negative: "don't do", exampleEn: 'I do my homework at 5 PM.', exampleEs: 'Hago mi tarea a las 5 PM.' },
      { pronoun: 'You', present: 'do', negative: "don't do", exampleEn: 'You do a great job.', exampleEs: 'Haces un gran trabajo.' },
      { pronoun: 'He / She / It', present: 'does', negative: "doesn't do", exampleEn: 'She does yoga every morning.', exampleEs: 'Ella hace yoga cada mañana.' },
      { pronoun: 'We', present: 'do', negative: "don't do", exampleEn: 'We do our best.', exampleEs: 'Hacemos nuestro mejor esfuerzo.' },
      { pronoun: 'They', present: 'do', negative: "don't do", exampleEn: 'They do business here.', exampleEs: 'Ellos hacen negocios aquí.' }
    ]
  },
  {
    id: 'work',
    infinitive: 'To Work',
    translation: 'Trabajar / Funcionar',
    thirdPerson: 'works',
    past: 'worked',
    type: 'regular',
    tip: 'Verbo regular modelo: agrega "-s" con He/She/It en presente (works) y "-ed" en pasado para todas las personas (worked).',
    forms: [
      { pronoun: 'I', present: 'work', negative: "don't work", exampleEn: 'I work from Monday to Friday.', exampleEs: 'Trabajo de lunes a viernes.' },
      { pronoun: 'You', present: 'work', negative: "don't work", exampleEn: 'You work very hard.', exampleEs: 'Trabajas muy duro.' },
      { pronoun: 'He / She / It', present: 'works', negative: "doesn't work", exampleEn: 'He works in a hospital.', exampleEs: 'Él trabaja en un hospital.' },
      { pronoun: 'We', present: 'work', negative: "don't work", exampleEn: 'We work together.', exampleEs: 'Trabajamos juntos.' },
      { pronoun: 'They', present: 'work', negative: "don't work", exampleEn: 'They work remotely.', exampleEs: 'Ellos trabajan de forma remota.' }
    ]
  }
];

interface QuizQuestionItem {
  prompt: string;
  options: string[];
  correct: string;
  explanation: string;
  verbName: string;
  isRetry?: boolean;
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
    options: ["doesn't like", 'not like', 'no likes', "don't like"],
    correct: "don't like",
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
    options: ['can swims', 'cans swim', 'can to swim', 'can swim'],
    correct: 'can swim',
    explanation: 'El verbo modal "can" no cambia con He/She/It y va seguido de un verbo sin "to".',
    verbName: 'Can'
  },
  {
    prompt: 'Completa: We _____ (want) a coffee, please.',
    options: ['wants', 'want', 'wanting', 'wanted'],
    correct: 'want',
    explanation: 'Con el pronombre "We" usas la forma base del verbo "want".',
    verbName: 'To Want'
  },
  {
    prompt: 'Negativa 3ª persona: She _____ (not / work) on Sundays.',
    options: ["doesn't work", "doesn't works", "don't work", 'not works'],
    correct: "doesn't work",
    explanation: 'Cuando usamos "doesn\'t", el verbo principal vuelve a su forma base sin "-s" ("doesn\'t work").',
    verbName: 'To Work'
  },
  {
    prompt: 'Pasado del verbo To Be: Yesterday we _____ very busy.',
    options: ['were', 'was', 'are', 'been'],
    correct: 'were',
    explanation: 'En pasado de To Be: I/He/She/It usan "was", mientras que You/We/They usan "were".',
    verbName: 'To Be'
  },
  {
    prompt: 'Pasado irregular de To Go: Last summer I _____ to Spain.',
    options: ['went', 'goed', 'gone', 'goes'],
    correct: 'went',
    explanation: 'El pasado simple irregular de "go" es "went" para todas las personas.',
    verbName: 'To Go'
  },
  {
    prompt: 'Pregunta en presente: _____ she have a car?',
    options: ['Does', 'Do', 'Is', 'Has'],
    correct: 'Does',
    explanation: 'Para preguntas en presente con He/She/It usamos el auxiliar "Does" + sujeto + verbo base ("Does she have...?").',
    verbName: 'To Have'
  },
  {
    prompt: 'Infinitivo de propósito: He wants _____ English fluently.',
    options: ['to speak', 'speaking', 'speaks', 'spoke'],
    correct: 'to speak',
    explanation: 'Después del verbo "want" siempre colocamos "to + verbo base" (wants to speak).',
    verbName: 'To Want'
  },
  {
    prompt: 'Expresión con To Do: She _____ yoga every morning.',
    options: ['does', 'do', 'makes', 'is'],
    correct: 'does',
    explanation: 'Con actividades como yoga, homework o exercise usamos "To Do", y para She es "does".',
    verbName: 'To Do'
  }
];

interface VerbTrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddXP: (amount: number) => void;
  courseLanguage?: 'en' | 'es';
}

export function VerbTrainerModal({
  isOpen,
  onClose,
  onAddXP,
  courseLanguage = 'en'
}: VerbTrainerModalProps) {
  const [activeTab, setActiveTab] = useState<'study' | 'quiz'>('study');
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const isSpanishCourse = courseLanguage === 'es'; // English speaker learning Spanish
  const activeVerbs: VerbData[] = isSpanishCourse ? (SPANISH_A1_VERBS as VerbData[]) : A1_VERBS;

  const buildVerbQuizQueue = (): QuizQuestionItem[] => {
    const raw = isSpanishCourse
      ? (SPANISH_VERB_PRACTICE_QUESTIONS as QuizQuestionItem[])
      : VERB_PRACTICE_QUESTIONS;
    return randomizeQuestionsOptions(raw.map(q => ({ ...q, isRetry: false })));
  };

  const [activeQuestions, setActiveQuestions] = useState<QuizQuestionItem[]>(() =>
    buildVerbQuizQueue()
  );

  const [selectedVerbId, setSelectedVerbId] = useState<string>(activeVerbs[0]?.id || 'be');

  useEffect(() => {
    setSelectedVerbId(activeVerbs[0]?.id || 'be');
    setActiveQuestions(buildVerbQuizQueue());
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizStatus('idle');
    setScore(0);
  }, [courseLanguage, shuffleSeed]);

  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [score, setScore] = useState<number>(0);

  if (!isOpen) return null;

  const currentVerb = activeVerbs.find(v => v.id === selectedVerbId) || activeVerbs[0];
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
      playTactileSound('stamp');
      setQuizStatus('correct');
      if (!currentQuestion.isRetry) {
        setScore(s => s + 1);
      }
      onAddXP(20);
      speakText(currentQuestion.correct);
    } else {
      playTactileSound('error');
      setQuizStatus('incorrect');
      const prevIdx = currentQuestion.options.indexOf(currentQuestion.correct);
      const reshuffled = shuffleOptionsList(
        currentQuestion.options,
        currentQuestion.correct,
        prevIdx
      );
      setActiveQuestions(prev => [
        ...prev,
        { ...currentQuestion, options: reshuffled, isRetry: true }
      ]);
    }
  };

  const handleNextQuestion = () => {
    if (quizIndex < activeQuestions.length - 1) {
      playTactileSound('flip');
      setQuizIndex(i => i + 1);
      setSelectedOption(null);
      setQuizStatus('idle');
    } else {
      playTactileSound('win');
      setQuizIndex(activeQuestions.length);
      setQuizStatus('idle');
    }
  };

  const restartQuiz = () => {
    playTactileSound('flip');
    setShuffleSeed(s => s + 1);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15, rotate: -0.4 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl w-full max-w-3xl shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a] overflow-hidden flex flex-col my-8 max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 bg-yellow-300 dark:bg-zinc-800 border-b-2 border-slate-900 dark:border-zinc-700 text-slate-950 dark:text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 flex items-center justify-center font-black text-xl shadow-[3px_3px_0px_0px_#0f172a]">
                ⚡
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-700 dark:text-zinc-300">
                  {isSpanishCourse ? 'Spanish Verb Deck' : 'Mazo de Verbos A1'}
                </span>
                <h2 className="text-xl md:text-2xl font-black">
                  {isSpanishCourse
                    ? 'Master Core Spanish Verbs'
                    : 'Dominio de Verbos Clave en Inglés'}
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
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav Tabs */}
          <div className="flex border-b-2 border-slate-900 dark:border-zinc-800 bg-[#FAF6EE] dark:bg-zinc-900/50 p-2 gap-2 shrink-0">
            <button
              onClick={() => {
                playTactileSound('pop');
                setActiveTab('study');
              }}
              className={`flex-1 py-3 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'study'
                  ? 'bg-emerald-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {isSpanishCourse
                  ? '1. Conjugation Cards & Rules'
                  : '1. Cartas y Reglas de Conjugación'}
              </span>
            </button>

            <button
              onClick={() => {
                playTactileSound('pop');
                setActiveTab('quiz');
              }}
              className={`flex-1 py-3 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${
                activeTab === 'quiz'
                  ? 'bg-yellow-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span>
                {isSpanishCourse ? '2. Interactive Verb Card Quiz' : '2. Reto de Cartas de Verbos'}
              </span>
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto flex-1 text-slate-950 dark:text-zinc-100 bg-[#FAF6EE] dark:bg-zinc-950">
            {activeTab === 'study' ? (
              <div className="space-y-6">
                {/* Verb Selector Chips */}
                <div className="flex flex-wrap gap-2">
                  {activeVerbs.map(verb => (
                    <button
                      key={verb.id}
                      onClick={() => {
                        playTactileSound('flip');
                        setSelectedVerbId(verb.id);
                      }}
                      className={`px-4 py-2 rounded-2xl text-xs md:text-sm font-black transition-all flex items-center gap-1.5 border-2 ${
                        selectedVerbId === verb.id
                          ? 'bg-indigo-600 text-white border-slate-950 shadow-[3px_3px_0px_0px_#0f172a]'
                          : 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-200 border-slate-900 dark:border-zinc-700 hover:bg-yellow-100'
                      }`}
                    >
                      <span>{verb.infinitive}</span>
                      <span className="opacity-80 text-[10px]">({verb.translation})</span>
                    </button>
                  ))}
                </div>

                {/* Selected Verb Card */}
                <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 shadow-[4px_4px_0px_0px_#0f172a]">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-2xl font-black text-indigo-700 dark:text-indigo-300">
                          {currentVerb.infinitive}
                        </h3>
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-yellow-300 text-slate-950 border border-slate-900 uppercase">
                          {currentVerb.type}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-600 dark:text-zinc-400">
                        {isSpanishCourse ? 'Meaning: ' : 'Significado: '}
                        <strong className="text-slate-950 dark:text-zinc-100">
                          {currentVerb.translation}
                        </strong>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakText(currentVerb.infinitive)}
                        className="bg-indigo-600 text-white px-3.5 py-2 rounded-xl text-xs font-black border-2 border-slate-900 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0f172a] hover:bg-indigo-700 transition-colors"
                      >
                        <Volume2 className="w-4 h-4" />{' '}
                        {isSpanishCourse ? 'Listen' : 'Escuchar'}
                      </button>
                    </div>
                  </div>

                  {/* Golden Tip */}
                  <div className="bg-amber-200/80 dark:bg-amber-950/50 border-2 border-slate-900 dark:border-amber-800 rounded-2xl p-3.5 text-xs font-bold text-slate-950 dark:text-amber-200 mb-6 flex items-start gap-2 shadow-[2px_2px_0px_0px_#0f172a]">
                    <Sparkles className="w-4 h-4 text-slate-950 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>{isSpanishCourse ? 'Grammar Rule:' : 'Regla A1:'}</strong>{' '}
                      {currentVerb.tip}
                    </span>
                  </div>

                  {/* Conjugation Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs md:text-sm">
                      <thead>
                        <tr className="border-b-2 border-slate-900/20 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 font-black uppercase">
                          <th className="pb-2">{isSpanishCourse ? 'Subject' : 'Sujeto'}</th>
                          <th className="pb-2">{isSpanishCourse ? 'Present' : 'Presente'}</th>
                          <th className="pb-2">{isSpanishCourse ? 'Negative' : 'Negativa'}</th>
                          <th className="pb-2">
                            {isSpanishCourse ? 'Example in Context' : 'Ejemplo en Uso'}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-zinc-800">
                        {currentVerb.forms.map((form, idx) => {
                          const primaryTargetSentence = isSpanishCourse
                            ? form.exampleEs
                            : form.exampleEn;
                          const translationSentence = isSpanishCourse
                            ? form.exampleEn
                            : form.exampleEs;

                          return (
                            <tr
                              key={idx}
                              className="hover:bg-amber-50 dark:hover:bg-zinc-800/40 transition-colors"
                            >
                              <td className="py-3 font-black text-indigo-700 dark:text-indigo-400">
                                {form.pronoun}
                              </td>
                              <td className="py-3 font-black text-slate-950 dark:text-zinc-100">
                                {form.present}
                              </td>
                              <td className="py-3 font-bold text-rose-600 dark:text-rose-400">
                                {form.negative}
                              </td>
                              <td className="py-3">
                                <div className="flex items-center justify-between gap-2">
                                  <div>
                                    <p className="font-black text-slate-950 dark:text-zinc-100">
                                      {primaryTargetSentence}
                                    </p>
                                    <p className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                                      {translationSentence}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => speakText(primaryTargetSentence)}
                                    className="p-2 rounded-xl bg-amber-100 dark:bg-zinc-800 border border-slate-900/30 hover:bg-indigo-600 hover:text-white text-slate-900 dark:text-zinc-200 transition-colors"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              /* Practice Quiz Tab */
              <div className="space-y-6">
                {quizIndex < activeQuestions.length ? (
                  <motion.div
                    key={quizIndex}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#0f172a]"
                  >
                    {/* Header Progress */}
                    <div className="flex items-center justify-between text-xs font-black text-slate-700 dark:text-zinc-300 mb-4">
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-zinc-800 border border-slate-900 text-slate-950 dark:text-white tabular-nums">
                        {isSpanishCourse
                          ? `Card ${quizIndex + 1} / ${activeQuestions.length}`
                          : `Carta ${quizIndex + 1} / ${activeQuestions.length}`}
                      </span>
                      <span className="bg-yellow-300 text-slate-950 border-2 border-slate-900 px-3 py-1 rounded-xl shadow-[2px_2px_0px_0px_#0f172a] tabular-nums">
                        Score: {score} / {activeQuestions.length}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-2xl font-black mb-6 text-slate-950 dark:text-zinc-100">
                      {currentQuestion.prompt}
                    </h3>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentQuestion.correct;
                        const optionLetter = String.fromCharCode(65 + idx);
                        let btnStyle =
                          'bg-[#FAF6EE] dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 text-slate-950 dark:text-zinc-100 hover:bg-yellow-100 shadow-[3px_3px_0px_0px_#0f172a]';

                        if (quizStatus !== 'idle') {
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
                            transition={{ delay: quizStatus === 'idle' ? idx * 0.04 : 0 }}
                            onClick={() => handleSelectAnswer(option)}
                            disabled={quizStatus !== 'idle'}
                            className={`p-4 rounded-2xl text-sm font-extrabold transition-all text-left flex items-center justify-between gap-2 active:translate-x-[2px] active:translate-y-[2px] ${btnStyle}`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-900 border-2 border-slate-900 text-xs font-black text-slate-950 dark:text-white flex items-center justify-center shrink-0">
                                {optionLetter}
                              </span>
                              <span>{option}</span>
                            </span>
                            {quizStatus !== 'idle' && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 shrink-0" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>

                    {/* Feedback Banner */}
                    {quizStatus !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl mb-6 text-sm font-bold border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] ${
                          quizStatus === 'correct'
                            ? 'bg-emerald-200 text-slate-950'
                            : 'bg-rose-200 text-slate-950'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {quizStatus === 'correct' ? (
                            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-black mb-0.5">
                              {quizStatus === 'correct'
                                ? isSpanishCourse
                                  ? '✓ STAMPED! +20 XP'
                                  : '✓ ¡SELLADO! +20 XP'
                                : isSpanishCourse
                                  ? `Correct answer: ${currentQuestion.correct}`
                                  : `Respuesta correcta: ${currentQuestion.correct}`}
                            </p>
                            <p className="text-xs">{currentQuestion.explanation}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Next Button */}
                    {quizStatus !== 'idle' && (
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98, x: 2, y: 2 }}
                        onClick={handleNextQuestion}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm border-2 border-slate-950 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-all"
                      >
                        <span>
                          {isSpanishCourse ? 'Deal Next Verb Card' : 'Siguiente Carta de Verbo'}
                        </span>
                        <Play className="w-4 h-4 fill-white" />
                      </motion.button>
                    )}
                  </motion.div>
                ) : (
                  /* Completion Screen */
                  <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-3xl p-8 border-2 border-slate-900 dark:border-zinc-700 shadow-[6px_6px_0px_0px_#0f172a]">
                    <div className="w-20 h-20 rounded-2xl bg-emerald-300 border-2 border-slate-900 text-slate-950 flex items-center justify-center mx-auto mb-4 text-3xl shadow-[4px_4px_0px_0px_#0f172a]">
                      🏆
                    </div>
                    <h3 className="text-2xl font-black mb-2">
                      {isSpanishCourse
                        ? 'Verb Deck Completed!'
                        : '¡Mazo de Verbos Completado!'}
                    </h3>
                    <p className="text-sm font-bold text-slate-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">
                      {isSpanishCourse ? (
                        <>
                          You scored{' '}
                          <strong className="text-slate-950 dark:text-zinc-100">
                            {score} out of {activeQuestions.length}
                          </strong>
                          .
                        </>
                      ) : (
                        <>
                          Obtuviste{' '}
                          <strong className="text-slate-950 dark:text-zinc-100">
                            {score} de {activeQuestions.length} aciertos
                          </strong>
                          .
                        </>
                      )}
                    </p>

                    <button
                      onClick={restartQuiz}
                      className="bg-yellow-300 hover:bg-yellow-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] transition-transform active:scale-95 inline-flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{isSpanishCourse ? 'Shuffle & Practice Again' : 'Barajar y Volver a Practicar'}</span>
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
