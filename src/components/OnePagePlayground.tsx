import React, { useState, useMemo } from 'react';
import { LessonStep, UserProgress, SectionTab, CEFRLevel } from '../types';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';
import { shuffleOptionsList } from '../utils/shuffleOptions';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Play,
  Lock,
  Award,
  Highlighter,
  Layers,
  Grid,
  Puzzle
} from 'lucide-react';

interface WordBreakdown {
  word: string;
  meaning: string;
}

interface InteractiveChallenge {
  id: string;
  level: CEFRLevel;
  context: string;
  phrase: string;
  translation: string;
  question: string;
  options: string[];
  correctAnswer: string;
  tip: string;
  scrambleWords: string[];
  wordNotes: WordBreakdown[];
}

// FOR SPANISH SPEAKERS LEARNING ENGLISH (Explanations in Spanish, Target in English)
const ENGLISH_CHALLENGES: InteractiveChallenge[] = [
  {
    id: 'en_c1',
    level: 'A1',
    context: 'En una cafetería en Londres',
    phrase: 'Could I have an iced coffee to go, please?',
    translation: '¿Me podría dar un café helado para llevar, por favor?',
    question: '¿Qué significa la expresión en inglés "to go" al pedir una bebida?',
    options: ['Para tomar en la mesa', 'Para llevar', 'Sin cafeína'],
    correctAnswer: 'Para llevar',
    tip: '"Could I have..." es la fórmula más educada y natural para pedir cualquier cosa en inglés.',
    scrambleWords: ['Could', 'I', 'have', 'a', 'coffee', 'please?'],
    wordNotes: [
      { word: 'Could', meaning: 'Podría (cortesía)' },
      { word: 'I', meaning: 'Yo' },
      { word: 'have', meaning: 'tomar / pedir' },
      { word: 'an', meaning: 'un (antes de vocal)' },
      { word: 'iced', meaning: 'helado' },
      { word: 'coffee', meaning: 'café' },
      { word: 'to', meaning: 'para' },
      { word: 'go,', meaning: 'llevar' },
      { word: 'please?', meaning: '¿por favor?' }
    ]
  },
  {
    id: 'en_c2',
    level: 'A2',
    context: 'Charla casual con nuevos amigos',
    phrase: 'I have been living here for three years.',
    translation: 'Llevo viviendo aquí tres años.',
    question: '¿Por qué usamos "for" en lugar de "since" en esta oración en inglés?',
    options: [
      'Porque indica un año exacto en el calendario',
      'Porque habla del futuro',
      'Porque indica una cantidad o duración de tiempo (3 years)'
    ],
    correctAnswer: 'Porque indica una cantidad o duración de tiempo (3 years)',
    tip: 'En inglés no se dice "I live here since 3 years": usa siempre "have been + -ing" con "for" (duración).',
    scrambleWords: ['I', 'have', 'lived', 'here', 'for', 'years.'],
    wordNotes: [
      { word: 'I', meaning: 'Yo' },
      { word: 'have', meaning: 'he (auxiliar)' },
      { word: 'been', meaning: 'estado (llevo)' },
      { word: 'living', meaning: 'viviendo' },
      { word: 'here', meaning: 'aquí' },
      { word: 'for', meaning: 'durante / por' },
      { word: 'three', meaning: 'tres' },
      { word: 'years.', meaning: 'años' }
    ]
  },
  {
    id: 'en_c3',
    level: 'B1',
    context: 'Organizando planes de fin de semana',
    phrase: 'Let’s play it by ear tomorrow afternoon.',
    translation: 'Vamos viendo sobre la marcha mañana por la tarde.',
    question: '¿Qué propone alguien cuando dice la expresión "play it by ear"?',
    options: [
      'Escuchar un concierto en vivo',
      'Improvisar y decidir según vayan surgiendo las cosas',
      'Seguir un plan estricto paso a paso'
    ],
    correctAnswer: 'Improvisar y decidir según vayan surgiendo las cosas',
    tip: 'Viene de la música ("tocar de oído" sin partitura) y hoy significa fluir sin un plan rígido.',
    scrambleWords: ['Let’s', 'play', 'it', 'by', 'ear', 'tomorrow.'],
    wordNotes: [
      { word: 'Let’s', meaning: 'Vamos a (propuesta)' },
      { word: 'play', meaning: 'tocar / jugar' },
      { word: 'it', meaning: 'eso (la situación)' },
      { word: 'by', meaning: 'de / por' },
      { word: 'ear', meaning: 'oído (sobre la marcha)' },
      { word: 'tomorrow', meaning: 'mañana' },
      { word: 'afternoon.', meaning: 'por la tarde' }
    ]
  },
  {
    id: 'en_c4',
    level: 'B2',
    context: 'Reunión profesional internacional',
    phrase: 'Had I known about the traffic, I would have left earlier.',
    translation: 'De haber sabido del tráfico, habría salido más temprano.',
    question: '¿Qué logra empezar la frase con "Had I known..."?',
    options: [
      'Convierte la frase en una orden directa',
      'Habla de una rutina diaria en presente',
      'Reemplaza "If I had known" con un tono elegante de nivel B2'
    ],
    correctAnswer: 'Reemplaza "If I had known" con un tono elegante de nivel B2',
    tip: 'Esta inversión condicional equivale en español a "De haber sabido..." y demuestra gran dominio.',
    scrambleWords: ['Had', 'I', 'known,', 'I', 'would', 'have', 'called.'],
    wordNotes: [
      { word: 'Had', meaning: 'De haber (inversión)' },
      { word: 'I', meaning: 'yo' },
      { word: 'known', meaning: 'sabido' },
      { word: 'about', meaning: 'sobre / acerca de' },
      { word: 'the', meaning: 'el' },
      { word: 'traffic,', meaning: 'tráfico' },
      { word: 'I', meaning: 'yo' },
      { word: 'would', meaning: 'habría (condicional)' },
      { word: 'have', meaning: 'haber' },
      { word: 'left', meaning: 'salido / partido' },
      { word: 'earlier.', meaning: 'más temprano' }
    ]
  }
];

// FOR ENGLISH SPEAKERS LEARNING SPANISH (Explanations in English, Target in Spanish)
const SPANISH_CHALLENGES: InteractiveChallenge[] = [
  {
    id: 'es_c1',
    level: 'A1',
    context: 'At a restaurant in Madrid',
    phrase: '¿Me trae la cuenta cuando pueda, por favor?',
    translation: 'Could you bring me the check when you can, please?',
    question: 'How do you politely ask for the bill/check in a Spanish restaurant?',
    options: ['La receta, por favor', 'La cuenta, por favor', 'El recibo de luz'],
    correctAnswer: 'La cuenta, por favor',
    tip: 'Adding "cuando pueda" ("whenever you can") softens the request and sounds very polite across the Spanish-speaking world.',
    scrambleWords: ['¿Me', 'trae', 'la', 'cuenta', 'por', 'favor?'],
    wordNotes: [
      { word: '¿Me', meaning: 'To me' },
      { word: 'trae', meaning: 'you bring (formal)' },
      { word: 'la', meaning: 'the' },
      { word: 'cuenta', meaning: 'bill / check' },
      { word: 'cuando', meaning: 'when' },
      { word: 'pueda,', meaning: 'you can (subjunctive)' },
      { word: 'por', meaning: 'for' },
      { word: 'favor?', meaning: 'please?' }
    ]
  },
  {
    id: 'es_c2',
    level: 'A2',
    context: 'Talking about childhood memories',
    phrase: 'Cuando era niño, jugaba en este parque todos los días.',
    translation: 'When I was a child, I used to play in this park every day.',
    question: 'Why do we use "era" and "jugaba" in the Imperfect past tense here?',
    options: [
      'Because the action happened only once yesterday afternoon',
      'Because it is a promise about the future',
      'Because they describe an ongoing habit or repeated routine in the past ("used to")'
    ],
    correctAnswer: 'Because they describe an ongoing habit or repeated routine in the past ("used to")',
    tip: 'Think of the Spanish Imperfect (-aba / -ía) as a background video describing childhood habits and ongoing past scenes.',
    scrambleWords: ['Cuando', 'era', 'niño', 'jugaba', 'en', 'el', 'parque.'],
    wordNotes: [
      { word: 'Cuando', meaning: 'When' },
      { word: 'era', meaning: 'I was (ongoing)' },
      { word: 'niño,', meaning: 'a child' },
      { word: 'jugaba', meaning: 'I used to play' },
      { word: 'en', meaning: 'in' },
      { word: 'este', meaning: 'this' },
      { word: 'parque', meaning: 'park' },
      { word: 'todos', meaning: 'every / all' },
      { word: 'los', meaning: 'the' },
      { word: 'días.', meaning: 'days' }
    ]
  },
  {
    id: 'es_c3',
    level: 'B1',
    context: 'Giving recommendations to a friend',
    phrase: 'Te recomiendo que pruebes el plato típico de la región.',
    translation: 'I recommend that you try the traditional dish of the region.',
    question: 'Why do we say "pruebes" (Subjunctive) instead of "pruebas" (Indicative)?',
    options: [
      'Because the sentence is talking about the past',
      'Because verbs of recommendation and advice ("recomiendo que...") trigger the Subjunctive',
      'Because it is a direct question'
    ],
    correctAnswer: 'Because verbs of recommendation and advice ("recomiendo que...") trigger the Subjunctive',
    tip: 'Verbs of influence like recomendar, sugerir, aconsejar + "que" + a change of subject always require the Spanish Subjunctive.',
    scrambleWords: ['Te', 'recomiendo', 'que', 'pruebes', 'este', 'plato.'],
    wordNotes: [
      { word: 'Te', meaning: 'To you' },
      { word: 'recomiendo', meaning: 'I recommend' },
      { word: 'que', meaning: 'that (connector)' },
      { word: 'pruebes', meaning: 'you try (subjunctive)' },
      { word: 'el', meaning: 'the' },
      { word: 'plato', meaning: 'dish' },
      { word: 'típico', meaning: 'traditional' },
      { word: 'de', meaning: 'of' },
      { word: 'la', meaning: 'the' },
      { word: 'región.', meaning: 'region' }
    ]
  },
  {
    id: 'es_c4',
    level: 'B2',
    context: 'Hypothetical situations and personal dreams',
    phrase: 'Si tuviera más tiempo libre, aprendería un tercer idioma.',
    translation: 'If I had more free time, I would learn a third language.',
    question: 'Which verb combination forms a hypothetical "If" clause in Spanish?',
    options: [
      'Si + Present Simple, + Past Simple',
      'Si + Future Simple, + Imperative',
      'Si + Imperfect Subjunctive (-ra), + Conditional (-ría)'
    ],
    correctAnswer: 'Si + Imperfect Subjunctive (-ra), + Conditional (-ría)',
    tip: 'Golden Rule: Never put the Conditional (-ría) directly after "Si" (If); always use the Imperfect Subjunctive ("Si tuviera...").',
    scrambleWords: ['Si', 'tuviera', 'tiempo,', 'aprendería', 'otro', 'idioma.'],
    wordNotes: [
      { word: 'Si', meaning: 'If' },
      { word: 'tuviera', meaning: 'I had (hypothetical)' },
      { word: 'más', meaning: 'more' },
      { word: 'tiempo', meaning: 'time' },
      { word: 'libre,', meaning: 'free' },
      { word: 'aprendería', meaning: 'I would learn' },
      { word: 'un', meaning: 'a' },
      { word: 'tercer', meaning: 'third' },
      { word: 'idioma.', meaning: 'language' }
    ]
  }
];

const MATCH_PAIRS_EN = [
  { id: 'm1', left: 'By the way', right: 'Por cierto' },
  { id: 'm2', left: 'As soon as possible', right: 'Lo antes posible' },
  { id: 'm3', left: 'It makes sense', right: 'Tiene sentido' }
];

const MATCH_PAIRS_ES = [
  { id: 'm1', left: 'Por si acaso', right: 'Just in case' },
  { id: 'm2', left: 'De vez en cuando', right: 'Every now and then' },
  { id: 'm3', left: 'Vale la pena', right: 'It is worth it' }
];

type MarkerColor = 'yellow' | 'mint' | 'coral';

const MARKER_STYLES: Record<MarkerColor, { bg: string; labelEs: string; labelEn: string; dot: string }> = {
  yellow: {
    bg: 'bg-yellow-300 text-slate-950 dark:bg-yellow-400 dark:text-slate-950',
    labelEs: 'Amarillo',
    labelEn: 'Yellow',
    dot: 'bg-yellow-400'
  },
  mint: {
    bg: 'bg-emerald-300 text-slate-950 dark:bg-emerald-400 dark:text-slate-950',
    labelEs: 'Menta',
    labelEn: 'Mint',
    dot: 'bg-emerald-400'
  },
  coral: {
    bg: 'bg-rose-300 text-slate-950 dark:bg-rose-400 dark:text-slate-950',
    labelEs: 'Coral',
    labelEn: 'Coral',
    dot: 'bg-rose-400'
  }
};

interface HeroInteractiveCardProps {
  courseLanguage: 'en' | 'es';
  onEarnXP: (amount: number) => void;
}

export function HeroInteractiveCard({ courseLanguage, onEarnXP }: HeroInteractiveCardProps) {
  const isSpanishCourse = courseLanguage === 'es'; // English native speaker learning Spanish
  const challenges = isSpanishCourse ? SPANISH_CHALLENGES : ENGLISH_CHALLENGES;
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<'deck' | 'builder' | 'pairs'>('deck');
  const [markerColor, setMarkerColor] = useState<MarkerColor>('yellow');
  const [highlightedWords, setHighlightedWords] = useState<Record<string, MarkerColor>>({});
  const [activeWordNote, setActiveWordNote] = useState<WordBreakdown | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [pickedWords, setPickedWords] = useState<number[]>([]);
  const [xpAwardedForId, setXpAwardedForId] = useState<Record<string, boolean>>({});

  // Pairs mini-game state
  const pairsData = isSpanishCourse ? MATCH_PAIRS_ES : MATCH_PAIRS_EN;
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);

  const current = challenges[activeIndex % challenges.length];

  const shuffledChallengeOptions = useMemo(() => {
    const avoidSlot = activeIndex % current.options.length;
    return shuffleOptionsList(current.options, current.correctAnswer, avoidSlot);
  }, [current, activeIndex]);

  const shuffledTiles = useMemo(() => {
    return current.scrambleWords
      .map((word, index) => ({ word, originalIndex: index }))
      .sort((a, b) => a.word.localeCompare(b.word));
  }, [current]);

  const handleWordHighlightClick = (w: WordBreakdown, idx: number) => {
    playTactileSound('highlight');
    const key = `${current.id}_${idx}`;
    setHighlightedWords(prev => {
      const next = { ...prev };
      if (next[key] === markerColor) {
        delete next[key];
      } else {
        next[key] = markerColor;
      }
      return next;
    });
    setActiveWordNote(w);
    playSpeech(w.word.replace(/[¿?.,!]/g, ''), { courseLanguage, rate: 0.9 });
  };

  const handleSelectOption = (opt: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(opt);
    if (opt === current.correctAnswer) {
      playTactileSound('stamp');
      playSpeech(current.phrase, { courseLanguage, rate: 0.95 });
      const rewardKey = `${current.id}_quiz`;
      if (!xpAwardedForId[rewardKey]) {
        setXpAwardedForId(prev => ({ ...prev, [rewardKey]: true }));
        onEarnXP(15);
      }
    } else {
      playTactileSound('error');
    }
  };

  const handlePickTile = (tileIdx: number) => {
    playTactileSound('pop');
    if (pickedWords.includes(tileIdx)) {
      setPickedWords(prev => prev.filter(i => i !== tileIdx));
      return;
    }
    const next = [...pickedWords, tileIdx];
    setPickedWords(next);

    if (next.length === current.scrambleWords.length) {
      const built = next.map(i => shuffledTiles[i].word).join(' ');
      const target = current.scrambleWords.join(' ');
      if (built === target) {
        playTactileSound('win');
        playSpeech(target, { courseLanguage, rate: 0.95 });
        const rewardKey = `${current.id}_builder`;
        if (!xpAwardedForId[rewardKey]) {
          setXpAwardedForId(prev => ({ ...prev, [rewardKey]: true }));
          onEarnXP(20);
        }
      } else {
        playTactileSound('error');
      }
    }
  };

  const handleSelectPairRight = (pairId: string, textToSpeak: string) => {
    if (!selectedLeft) return;
    if (selectedLeft === pairId) {
      playTactileSound('stamp');
      playSpeech(textToSpeak, { courseLanguage, rate: 0.95 });
      const nextMatched = Array.from(new Set([...matchedPairIds, pairId]));
      setMatchedPairIds(nextMatched);
      setSelectedLeft(null);
      if (nextMatched.length === pairsData.length && !xpAwardedForId['pairs_bonus']) {
        playTactileSound('win');
        setXpAwardedForId(prev => ({ ...prev, pairs_bonus: true }));
        onEarnXP(30);
      }
    } else {
      playTactileSound('error');
      setSelectedLeft(null);
    }
  };

  const handleNextChallenge = () => {
    playTactileSound('flip');
    setSelectedAnswer(null);
    setPickedWords([]);
    setActiveWordNote(null);
    setActiveIndex(prev => (prev + 1) % challenges.length);
  };

  const builtSentence = pickedWords.map(i => shuffledTiles[i]?.word).join(' ');
  const isBuilderComplete = pickedWords.length === current.scrambleWords.length;
  const isBuilderCorrect = isBuilderComplete && builtSentence === current.scrambleWords.join(' ');
  const isStamped =
    (mode === 'deck' && selectedAnswer === current.correctAnswer) ||
    (mode === 'builder' && isBuilderCorrect) ||
    (mode === 'pairs' && matchedPairIds.length === pairsData.length);

  return (
    <div className="bg-amber-50/70 dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 md:p-7 shadow-[6px_6px_0px_0px_#0f172a] dark:shadow-[6px_6px_0px_0px_#27272a] flex flex-col justify-between h-full relative overflow-hidden">
      {/* Top Interactive Mode Tabs (Tactile Stationery Tabs) */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b-2 border-slate-900/15 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 bg-white dark:bg-zinc-800 p-1 rounded-2xl border-2 border-slate-900 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => {
                playTactileSound('pop');
                setMode('deck');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                mode === 'deck'
                  ? 'bg-yellow-300 text-slate-950 border border-slate-900'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isSpanishCourse ? '1. Interactive Card' : '1. Carta Interactiva'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playTactileSound('pop');
                setMode('builder');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                mode === 'builder'
                  ? 'bg-emerald-300 text-slate-950 border border-slate-900'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>{isSpanishCourse ? '2. Sentence Magnet' : '2. Imán de Frases'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playTactileSound('pop');
                setMode('pairs');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                mode === 'pairs'
                  ? 'bg-rose-300 text-slate-950 border border-slate-900'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{isSpanishCourse ? '3. Speed Pairs' : '3. Pares Rápidos'}</span>
            </button>
          </div>

          {/* Animated Stamp when completed */}
          <AnimatePresence>
            {isStamped && (
              <motion.div
                initial={{ scale: 1.5, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: -4 }}
                exit={{ opacity: 0 }}
                className="px-3 py-1 rounded-xl border-2 border-emerald-700 bg-emerald-300 text-slate-950 font-black text-xs tracking-wide shadow-[2px_2px_0px_0px_#065f46]"
              >
                {isSpanishCourse ? '✓ STAMPED!' : '✓ ¡SELLADO!'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MODE 1: INTERACTIVE CARD + FLUORESCENT HIGHLIGHTER (NODECK STYLE) */}
        {mode === 'deck' && (
          <div className="space-y-4">
            {/* Highlighter Toolbar + Audio Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <Highlighter className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                <span className="font-bold text-slate-700 dark:text-zinc-300">
                  {isSpanishCourse
                    ? 'Highlight words (tap any word):'
                    : 'Subrayar palabras (toca cualquier palabra):'}
                </span>
                {(['yellow', 'mint', 'coral'] as MarkerColor[]).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setMarkerColor(c);
                    }}
                    title={
                      isSpanishCourse
                        ? `${MARKER_STYLES[c].labelEn} Marker`
                        : `Marcador ${MARKER_STYLES[c].labelEs}`
                    }
                    className={`w-5 h-5 rounded-full border-2 transition-transform ${
                      MARKER_STYLES[c].dot
                    } ${
                      markerColor === c
                        ? 'border-slate-950 dark:border-white scale-125'
                        : 'border-slate-400 opacity-70'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => playSpeech(current.phrase, { courseLanguage, rate: 0.65 })}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 font-bold text-slate-900 dark:text-white text-xs hover:bg-yellow-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {isSpanishCourse ? '🐢 Slow' : '🐢 Lento'}
                </button>
                <button
                  type="button"
                  onClick={() => playSpeech(current.phrase, { courseLanguage, rate: 0.95 })}
                  className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 font-bold text-xs flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a]"
                >
                  <Volume2 className="w-3.5 h-3.5" /> {isSpanishCourse ? 'Listen' : 'Escuchar'}
                </button>
              </div>
            </div>

            {/* Tactile Index Card with Word-by-Word Highlighter */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] dark:shadow-[4px_4px_0px_0px_#27272a]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-zinc-400 mb-2">
                <span>
                  {isSpanishCourse ? 'CEFR' : 'MCER'} {current.level} · {current.context}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {isSpanishCourse
                    ? 'Click any word to hear & translate'
                    : 'Haz clic en las palabras para traducir'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 my-2">
                {current.wordNotes.map((w, idx) => {
                  const key = `${current.id}_${idx}`;
                  const appliedColor = highlightedWords[key];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleWordHighlightClick(w, idx)}
                      className={`px-2 py-1 rounded-lg text-lg md:text-xl font-black transition-all cursor-pointer border ${
                        appliedColor
                          ? `${MARKER_STYLES[appliedColor].bg} border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]`
                          : 'border-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-900 dark:text-zinc-100'
                      }`}
                    >
                      {w.word}
                    </button>
                  );
                })}
              </div>

              <p className="text-sm font-semibold text-slate-600 dark:text-zinc-400 italic mt-2 pt-2 border-t border-slate-200 dark:border-zinc-800">
                "{current.translation}"
              </p>

              {activeWordNote && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 px-3.5 py-2 rounded-xl bg-yellow-200 dark:bg-yellow-400/90 text-slate-950 border border-slate-900 text-xs font-extrabold flex items-center justify-between"
                >
                  <span>
                    {isSpanishCourse ? 'Selected word:' : 'Palabra seleccionada:'} "
                    {activeWordNote.word.replace(/[¿?.,!]/g, '')}" ={' '}
                    <span className="underline">{activeWordNote.meaning}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveWordNote(null)}
                    className="text-[11px] font-black ml-2 hover:opacity-75"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </div>

            {/* Large-Print Accessible Quiz Question */}
            <div className="space-y-2.5 pt-1">
              <p className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
                {current.question}
              </p>
              <div className="space-y-2">
                {shuffledChallengeOptions.map((opt, idx) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === current.correctAnswer;
                  const optionLetter = String.fromCharCode(65 + idx);

                  let btnStyle =
                    'bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 hover:bg-yellow-100 dark:hover:bg-zinc-800 shadow-[3px_3px_0px_0px_#0f172a]';
                  if (selectedAnswer) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-300 dark:bg-emerald-500 border-2 border-slate-900 text-slate-950 shadow-[3px_3px_0px_0px_#0f172a]';
                    } else if (isSelected) {
                      btnStyle =
                        'bg-rose-300 dark:bg-rose-500 border-2 border-slate-900 text-slate-950';
                    } else {
                      btnStyle =
                        'bg-white/60 dark:bg-zinc-900/40 border border-slate-300 dark:border-zinc-800 opacity-55 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-900/30 dark:border-zinc-600 text-xs font-black flex items-center justify-center shrink-0">
                          {optionLetter}
                        </span>
                        <span>{opt}</span>
                      </span>
                      {selectedAnswer && isCorrect && (
                        <span className="text-xs font-black bg-white text-slate-950 px-2 py-0.5 rounded-lg border border-slate-900 shrink-0 tabular-nums">
                          +15 XP
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-xs sm:text-sm text-slate-800 dark:text-zinc-200 font-semibold"
                >
                  <strong className="font-black text-indigo-600 dark:text-indigo-400">
                    {isSpanishCourse ? 'Memory Tip: ' : 'Tip de memoria: '}
                  </strong>
                  {current.tip}
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* MODE 2: MAGNETIC SENTENCE BUILDER */}
        {mode === 'builder' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                  {isSpanishCourse
                    ? 'Build this sentence in Spanish:'
                    : 'Construye esta idea en inglés:'}
                </p>
                <p className="text-base font-black text-slate-900 dark:text-white">
                  "{current.translation}"
                </p>
              </div>
              <button
                type="button"
                onClick={() => playSpeech(current.scrambleWords.join(' '), { courseLanguage, rate: 0.9 })}
                className="p-3 rounded-xl bg-indigo-600 text-white border-2 border-slate-900 shrink-0 shadow-[2px_2px_0px_0px_#0f172a]"
                title={isSpanishCourse ? 'Listen to audio hint' : 'Escuchar pista en audio'}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Magnetic Drop Zone */}
            <div className="min-h-[68px] p-3.5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-dashed border-slate-900 dark:border-zinc-600 flex flex-wrap items-center gap-2">
              {pickedWords.length === 0 ? (
                <span className="text-sm font-bold text-slate-400 dark:text-zinc-500">
                  {isSpanishCourse
                    ? 'Tap the magnetic word tiles below in the right order...'
                    : 'Toca las fichas magnéticas de abajo en el orden correcto...'}
                </span>
              ) : (
                pickedWords.map(tileIdx => (
                  <button
                    key={tileIdx}
                    type="button"
                    onClick={() => handlePickTile(tileIdx)}
                    className="px-3.5 py-2 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 text-sm font-black shadow-[2px_2px_0px_0px_#0f172a] hover:bg-rose-300 transition-colors"
                  >
                    {shuffledTiles[tileIdx].word}
                  </button>
                ))
              )}
            </div>

            {/* Large Accessible Word Tiles */}
            <div className="flex flex-wrap gap-2 pt-1">
              {shuffledTiles.map((item, idx) => {
                const isUsed = pickedWords.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isUsed}
                    onClick={() => handlePickTile(idx)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-black border-2 transition-all ${
                      isUsed
                        ? 'opacity-25 border-slate-300 dark:border-zinc-800 bg-slate-200 dark:bg-zinc-800 cursor-not-allowed'
                        : 'border-slate-900 dark:border-zinc-600 bg-white dark:bg-zinc-800 hover:bg-emerald-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-white shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px]'
                    }`}
                  >
                    {item.word}
                  </button>
                );
              })}
            </div>

            {isBuilderComplete && (
              <div
                className={`p-3.5 rounded-2xl border-2 border-slate-900 text-sm font-extrabold flex items-center justify-between ${
                  isBuilderCorrect
                    ? 'bg-emerald-300 text-slate-950'
                    : 'bg-amber-200 text-slate-950'
                }`}
              >
                <span>
                  {isBuilderCorrect
                    ? isSpanishCourse
                      ? 'Great job! You built the sentence and earned +20 XP.'
                      : '¡Excelente construcción! Has ganado +20 XP.'
                    : isSpanishCourse
                      ? 'Almost there: tap a word tile above to adjust the order.'
                      : 'Casi lista: toca una ficha de arriba para cambiar su orden.'}
                </span>
                {!isBuilderCorrect && (
                  <button
                    type="button"
                    onClick={() => setPickedWords([])}
                    className="px-3 py-1 rounded-lg bg-white border border-slate-900 text-xs font-black ml-2 shrink-0"
                  >
                    {isSpanishCourse ? 'Reset' : 'Reiniciar'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODE 3: LARGE-PRINT SPEED PAIRS (YOUTH & SENIOR FRIENDLY) */}
        {mode === 'pairs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 dark:text-zinc-300">
              <span>
                {isSpanishCourse
                  ? 'Tap a Spanish expression on the left and match its English meaning on the right (+30 XP):'
                  : 'Toca una frase en inglés a la izquierda y luego su pareja en español a la derecha (+30 XP):'}
              </span>
              {matchedPairIds.length === pairsData.length && (
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('flip');
                    setMatchedPairIds([]);
                    setSelectedLeft(null);
                  }}
                  className="underline text-indigo-600 dark:text-indigo-400"
                >
                  {isSpanishCourse ? 'Play again' : 'Jugar de nuevo'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Left Column */}
              <div className="space-y-2.5">
                {pairsData.map(item => {
                  const isMatched = matchedPairIds.includes(item.id);
                  const isSelected = selectedLeft === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => {
                        playTactileSound('pop');
                        setSelectedLeft(item.id);
                        playSpeech(item.left, { courseLanguage, rate: 0.92 });
                      }}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left text-sm font-black transition-all flex items-center justify-between ${
                        isMatched
                          ? 'bg-emerald-200 dark:bg-emerald-950/50 border-emerald-700 text-emerald-950 dark:text-emerald-200 opacity-65'
                          : isSelected
                            ? 'bg-yellow-300 text-slate-950 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]'
                            : 'bg-white dark:bg-zinc-950 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white hover:bg-yellow-100 shadow-[3px_3px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>{item.left}</span>
                      <Volume2 className="w-4 h-4 shrink-0 opacity-70" />
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-2.5">
                {[...pairsData].reverse().map(item => {
                  const isMatched = matchedPairIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleSelectPairRight(item.id, item.left)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left text-sm font-black transition-all flex items-center justify-between ${
                        isMatched
                          ? 'bg-emerald-300 dark:bg-emerald-900/60 border-slate-900 text-slate-950 dark:text-emerald-100'
                          : 'bg-white dark:bg-zinc-950 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white hover:bg-emerald-100 dark:hover:bg-zinc-800 shadow-[3px_3px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>{item.right}</span>
                      {isMatched && <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tactile Card Deck Footer Switcher */}
      <div className="pt-4 mt-5 border-t-2 border-slate-900/15 dark:border-zinc-800 flex items-center justify-between text-xs">
        <span className="text-slate-700 dark:text-zinc-300 font-extrabold tabular-nums">
          {isSpanishCourse
            ? `Card #${activeIndex + 1} of ${challenges.length} · Level ${current.level}`
            : `Carta #${activeIndex + 1} de ${challenges.length} · Nivel ${current.level}`}
        </span>
        <button
          type="button"
          onClick={handleNextChallenge}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-950 text-white font-black text-xs flex items-center gap-1.5 transition-colors shadow-[2px_2px_0px_0px_#4f46e5]"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>{isSpanishCourse ? 'Draw Another Card' : 'Sacar Otra Carta'}</span>
        </button>
      </div>
    </div>
  );
}

interface OnePageBentoExplorerProps {
  courseLanguage: 'en' | 'es';
  progress: UserProgress;
  a1Lessons: LessonStep[];
  a2Lessons: LessonStep[];
  b1Lessons: LessonStep[];
  b2Lessons: LessonStep[];
  isA1Certified: boolean;
  isA2Certified: boolean;
  isB1Certified: boolean;
  isB2Certified: boolean;
  onNavigate: (tab: SectionTab) => void;
  onSelectLessonDirect: (lesson: LessonStep) => void;
}

export function OnePageBentoExplorer({
  courseLanguage,
  progress,
  a1Lessons,
  a2Lessons,
  b1Lessons,
  b2Lessons,
  isA1Certified,
  isA2Certified,
  isB1Certified,
  isB2Certified,
  onNavigate,
  onSelectLessonDirect
}: OnePageBentoExplorerProps) {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const isSpanishCourse = courseLanguage === 'es'; // English speaker learning Spanish

  const levelConfig = useMemo(() => {
    const a1Done = a1Lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const a2Done = a2Lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const b1Done = b1Lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const b2Done = b2Lessons.filter(l => progress.completedLessons.includes(l.id)).length;

    return {
      A1: {
        code: 'A1' as CEFRLevel,
        number: '01',
        title: isSpanishCourse
          ? 'Level A1 · Spanish Foundations & Survival'
          : 'Nivel A1 · Fundamentos del Inglés',
        subtitle: isSpanishCourse
          ? 'Greetings, pronunciation, SER vs ESTAR, present tense (-AR/-ER/-IR), TENER for age, and real-world dialogues.'
          : 'Saludos, verbo To Be, presente simple, preguntas esenciales y vocabulario diario.',
        lessons: a1Lessons,
        completed: a1Done,
        total: a1Lessons.length,
        isUnlocked: true,
        isCertified: isA1Certified,
        unlockReqText: isSpanishCourse
          ? 'Unlocked from Day 1'
          : 'Acceso abierto desde el primer día',
        targetTab: 'a1-inicial' as SectionTab,
        cardBg: 'bg-sky-100/80 dark:bg-sky-950/30',
        tabActiveBg: 'bg-sky-300 text-slate-950'
      },
      A2: {
        code: 'A2' as CEFRLevel,
        number: '02',
        title: isSpanishCourse
          ? 'Level A2 · Storytelling & Past Tenses'
          : 'Nivel A2 · Plataforma e Historias',
        subtitle: isSpanishCourse
          ? 'Past tenses (Pretérito Indefinido vs Imperfecto), object pronouns, future plans, and Por vs Para.'
          : 'Past Simple vs Continuous, comparativos, Present Perfect, futuro y condicionales.',
        lessons: a2Lessons,
        completed: a2Done,
        total: a2Lessons.length,
        isUnlocked: isA1Certified,
        isCertified: isA2Certified,
        unlockReqText: isSpanishCourse
          ? 'Requires passing the Official CEFR A1 Certification Exam (≥80%)'
          : 'Requiere aprobar el Examen de Certificación A1 (≥80%)',
        targetTab: 'a2-plataforma' as SectionTab,
        cardBg: 'bg-amber-100/80 dark:bg-amber-950/30',
        tabActiveBg: 'bg-yellow-300 text-slate-950'
      },
      B1: {
        code: 'B1' as CEFRLevel,
        number: '03',
        title: isSpanishCourse
          ? 'Level B1 · Independent Spanish Fluency'
          : 'Nivel B1 · Fluidez Independiente',
        subtitle: isSpanishCourse
          ? 'Present Subjunctive (WEIRDO), commands, conditional tense, passive voice, and expressing opinions.'
          : 'Second Conditional, Voz Pasiva, Reported Speech, Phrasal Verbs y matices.',
        lessons: b1Lessons,
        completed: b1Done,
        total: b1Lessons.length,
        isUnlocked: isA2Certified,
        isCertified: isB1Certified,
        unlockReqText: isSpanishCourse
          ? 'Requires passing the Official CEFR A2 Certification Exam (≥80%)'
          : 'Requiere aprobar el Examen de Certificación A2 (≥80%)',
        targetTab: 'b1-umbral' as SectionTab,
        cardBg: 'bg-emerald-100/80 dark:bg-emerald-950/30',
        tabActiveBg: 'bg-emerald-300 text-slate-950'
      },
      B2: {
        code: 'B2' as CEFRLevel,
        number: '04',
        title: isSpanishCourse
          ? 'Level B2 · Advanced & Professional Mastery'
          : 'Nivel B2 · Dominio Profesional y Académico',
        subtitle: isSpanishCourse
          ? 'Imperfect & Pluperfect Subjunctive, hypothetical "Si" clauses, verbal periphrases, and executive register.'
          : 'Third & Mixed Conditionals, inversión estilística, modales en pasado e inglés ejecutivo.',
        lessons: b2Lessons,
        completed: b2Done,
        total: b2Lessons.length,
        isUnlocked: isB1Certified,
        isCertified: isB2Certified,
        unlockReqText: isSpanishCourse
          ? 'Requires passing the Official CEFR B1 Certification Exam (≥80%)'
          : 'Requiere aprobar el Examen de Certificación B1 (≥80%)',
        targetTab: 'b2-avanzado' as SectionTab,
        cardBg: 'bg-rose-100/80 dark:bg-rose-950/30',
        tabActiveBg: 'bg-rose-300 text-slate-950'
      }
    };
  }, [
    isSpanishCourse,
    a1Lessons,
    a2Lessons,
    b1Lessons,
    b2Lessons,
    progress.completedLessons,
    isA1Certified,
    isA2Certified,
    isB1Certified,
    isB2Certified
  ]);

  const activeData = levelConfig[selectedLevel];
  const percent = activeData.total > 0 ? Math.round((activeData.completed / activeData.total) * 100) : 0;

  const previewLessons = useMemo(() => {
    const uncompleted = activeData.lessons.filter(l => !progress.completedLessons.includes(l.id));
    const completed = activeData.lessons.filter(l => progress.completedLessons.includes(l.id));
    return [...uncompleted, ...completed].slice(0, 6);
  }, [activeData.lessons, progress.completedLessons]);

  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#0f172a] dark:shadow-[6px_6px_0px_0px_#27272a] mb-8">
      {/* Header & Tactile Level Switcher Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900/10 dark:border-zinc-800">
        <div>
          <p className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
            {isSpanishCourse
              ? 'Level Mission Board · Listen & Practice Instantly'
              : 'Tablero de Misiones por Nivel · Escucha y Juega al Instante'}
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">
            {isSpanishCourse ? 'CEFR Level Map (A1 → B2)' : 'Mapa de Niveles MCER (A1 → B2)'}
          </h2>
        </div>

        {/* Tactile Level Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(['A1', 'A2', 'B1', 'B2'] as CEFRLevel[]).map(lvl => {
            const info = levelConfig[lvl];
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  playTactileSound('pop');
                  setSelectedLevel(lvl);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black border-2 border-slate-900 dark:border-zinc-600 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isSelected
                    ? `${info.tabActiveBg} shadow-[3px_3px_0px_0px_#0f172a] -translate-y-0.5`
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white'
                }`}
              >
                <span>
                  {info.number}. {isSpanishCourse ? `Level ${lvl}` : `Nivel ${lvl}`}
                </span>
                {info.isCertified ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : !info.isUnlocked ? (
                  <Lock className="w-3.5 h-3.5 opacity-60" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Level Showcase */}
      <div className="pt-6">
        <div className={`p-5 rounded-2xl border-2 border-slate-900 dark:border-zinc-700 ${activeData.cardBg} mb-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-zinc-300 mb-1 tabular-nums">
                <span>
                  {activeData.number}. {isSpanishCourse ? `Level ${activeData.code}` : `Nivel ${activeData.code}`}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {isSpanishCourse
                    ? `${activeData.completed} of ${activeData.total} lessons completed (${percent}%)`
                    : `${activeData.completed} de ${activeData.total} lecciones superadas (${percent}%)`}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {activeData.isCertified
                    ? isSpanishCourse
                      ? '✓ Official Certificate Earned'
                      : '✓ Sello Oficial Obtenido'
                    : activeData.isUnlocked
                      ? isSpanishCourse
                        ? 'Open to study'
                        : 'Abierto para jugar'
                      : isSpanishCourse
                        ? 'Requires previous level certificate'
                        : 'Requiere certificar nivel previo'}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-zinc-100 mb-1">
                {activeData.title}
              </h3>
              <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-zinc-300 max-w-2xl">
                {activeData.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {activeData.isUnlocked ? (
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    onNavigate(activeData.targetTab);
                  }}
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0px_0px_#4f46e5] flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
                >
                  <span>
                    {isSpanishCourse
                      ? `Open all ${activeData.total} lessons`
                      : `Abrir las ${activeData.total} lecciones`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    onNavigate('exam');
                  }}
                  className="px-5 py-3 rounded-2xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>{isSpanishCourse ? 'Go to Exam to Unlock' : 'Ir al Examen para Desbloquear'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-white/80 dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Interactive Lesson Cards Grid or Prerequisite Notice */}
        {!activeData.isUnlocked ? (
          <div className="p-6 rounded-2xl bg-amber-50 dark:bg-zinc-800/50 border-2 border-slate-900 dark:border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-base font-black text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>{activeData.unlockReqText}</span>
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-400">
                {isSpanishCourse
                  ? `Score 80% or higher on the previous level exam to unlock these ${activeData.total} interactive lessons.`
                  : `Obtén 80% o más en el examen del nivel anterior para desbloquear estas ${activeData.total} misiones interactivas.`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('exam')}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] whitespace-nowrap shrink-0"
            >
              {isSpanishCourse ? 'Take Exam Now' : 'Presentar Examen Ahora'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {previewLessons.map(lesson => {
              const isDone = progress.completedLessons.includes(lesson.id);
              const samplePhrase =
                lesson.quiz[0]?.targetText || lesson.quiz[0]?.correctAnswer || lesson.title;

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    playTactileSound('pop');
                    onSelectLessonDirect(lesson);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      playTactileSound('pop');
                      onSelectLessonDirect(lesson);
                    }
                  }}
                  className="p-5 rounded-2xl border-2 border-slate-900 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between group shadow-[4px_4px_0px_0px_#0f172a] dark:shadow-[4px_4px_0px_0px_#27272a]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-600 dark:text-zinc-400 mb-2 tabular-nums">
                      <span className="font-black text-indigo-600 dark:text-indigo-400">
                        {isSpanishCourse ? `Card #${lesson.day}` : `Carta #${lesson.day}`} ·{' '}
                        {lesson.cefrLevel || selectedLevel}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            playSpeech(samplePhrase, { courseLanguage, rate: 0.92 });
                          }}
                          title={
                            isSpanishCourse
                              ? 'Listen to key phrase from this lesson'
                              : 'Escuchar frase clave de la lección'
                          }
                          className="p-1.5 rounded-lg bg-yellow-200 hover:bg-yellow-300 text-slate-950 border border-slate-900 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        {isDone ? (
                          <span className="font-black text-emerald-700 dark:text-emerald-400">
                            {isSpanishCourse ? '✓ Completed' : '✓ Sellada'}
                          </span>
                        ) : (
                          <span className="font-bold text-slate-500">
                            {isSpanishCourse ? 'Ready' : 'Lista'}
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="text-base font-black text-slate-900 dark:text-zinc-100 mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                      {lesson.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t-2 border-slate-100 dark:border-zinc-700/70 flex items-center justify-between text-xs font-black text-slate-900 dark:text-white">
                    <span>
                      {isDone
                        ? isSpanishCourse
                          ? 'Review lesson card'
                          : 'Volver a jugar carta'
                        : isSpanishCourse
                          ? 'Start this lesson card'
                          : 'Jugar esta carta ahora'}
                    </span>
                    <Play className="w-4 h-4 fill-indigo-600 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
