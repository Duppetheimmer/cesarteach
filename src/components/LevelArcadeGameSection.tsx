import React, { useState, useMemo, useEffect } from 'react';
import { CEFRLevel } from '../types';
import {
  ConjugationChallenge,
  ENGLISH_CONJUGATION_CHALLENGES,
  SPANISH_CONJUGATION_CHALLENGES
} from '../data/conjugationArcadeData';
import {
  DictationItem,
  SurvivalMission,
  ENGLISH_DICTATION_ITEMS,
  SPANISH_DICTATION_ITEMS,
  ENGLISH_SURVIVAL_MISSIONS,
  SPANISH_SURVIVAL_MISSIONS
} from '../data/survivalAndDictationData';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';
import { shuffleOptionsList } from '../utils/shuffleOptions';
import { motion, AnimatePresence } from 'motion/react';
import {
  Dices,
  Flame,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  Eye,
  Layers,
  Zap,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Keyboard,
  LayoutGrid,
  Lightbulb,
  Headphones,
  Compass,
  AlertTriangle,
  MessageSquare,
  Undo2
} from 'lucide-react';

interface MemoryVocabPair {
  id: string;
  level: CEFRLevel;
  targetWord: string;
  nativeMeaning: string;
  exampleSentence: string;
}

interface MemoryDeckCard {
  uid: string;
  pairId: string;
  kind: 'target' | 'native';
  displayText: string;
  subLabel: string;
  audioText: string;
}

type CategoryFilter = 'all' | 'affirmative' | 'negative-question' | 'past-perfect' | 'advanced-mood';
type LevelFilter = CEFRLevel | 'ALL';
type ArcadeGameMode = 'conjugation' | 'memory' | 'dictation' | 'survival';

// ============================================================================
// MEMORY MATCH PAIRS BY CEFR LEVEL (A1–B2)
// ============================================================================
const ENGLISH_MEMORY_PAIRS: MemoryVocabPair[] = [
  // A1 (6 pairs)
  { id: 'en_m_a1_1', level: 'A1', targetWord: 'Schedule', nativeMeaning: 'Horario / Agenda', exampleSentence: 'Let me check my schedule.' },
  { id: 'en_m_a1_2', level: 'A1', targetWord: 'Breakfast', nativeMeaning: 'Desayuno', exampleSentence: 'We have breakfast at eight.' },
  { id: 'en_m_a1_3', level: 'A1', targetWord: 'Neighbor', nativeMeaning: 'Vecino / Vecina', exampleSentence: 'Our neighbor is very friendly.' },
  { id: 'en_m_a1_4', level: 'A1', targetWord: 'Receipt', nativeMeaning: 'Recibo / Comprobante', exampleSentence: 'Could I have the receipt, please?' },
  { id: 'en_m_a1_5', level: 'A1', targetWord: 'Luggage', nativeMeaning: 'Equipaje', exampleSentence: 'My luggage is already in the taxi.' },
  { id: 'en_m_a1_6', level: 'A1', targetWord: 'Appointment', nativeMeaning: 'Cita (médica / profesional)', exampleSentence: 'I have a dentist appointment today.' },
  // A2 (6 pairs)
  { id: 'en_m_a2_1', level: 'A2', targetWord: 'Flight delay', nativeMeaning: 'Retraso de vuelo', exampleSentence: 'There was a two-hour flight delay.' },
  { id: 'en_m_a2_2', level: 'A2', targetWord: 'To borrow', nativeMeaning: 'Pedir prestado', exampleSentence: 'Can I borrow your umbrella?' },
  { id: 'en_m_a2_3', level: 'A2', targetWord: 'To lend', nativeMeaning: 'Prestar (dar prestado)', exampleSentence: 'I can lend you my notebook.' },
  { id: 'en_m_a2_4', level: 'A2', targetWord: 'Crowded', nativeMeaning: 'Lleno de gente / Abarrotado', exampleSentence: 'The subway is crowded at rush hour.' },
  { id: 'en_m_a2_5', level: 'A2', targetWord: 'Refund', nativeMeaning: 'Reembolso / Devolución', exampleSentence: 'They gave me a full refund.' },
  { id: 'en_m_a2_6', level: 'A2', targetWord: 'Abroad', nativeMeaning: 'En el extranjero', exampleSentence: 'She studied abroad for a year.' },
  // B1 (6 pairs)
  { id: 'en_m_b1_1', level: 'B1', targetWord: 'To postpone', nativeMeaning: 'Posponer / Aplazar', exampleSentence: 'We had to postpone the launch.' },
  { id: 'en_m_b1_2', level: 'B1', targetWord: 'Reliable', nativeMeaning: 'Confiable / Fiable', exampleSentence: 'She is our most reliable partner.' },
  { id: 'en_m_b1_3', level: 'B1', targetWord: 'Deadline', nativeMeaning: 'Fecha límite de entrega', exampleSentence: 'The deadline is this Friday.' },
  { id: 'en_m_b1_4', level: 'B1', targetWord: 'To figure out', nativeMeaning: 'Resolver / Descifrar', exampleSentence: 'We need to figure out a solution.' },
  { id: 'en_m_b1_5', level: 'B1', targetWord: 'Accurate', nativeMeaning: 'Preciso / Exacto', exampleSentence: 'These figures are completely accurate.' },
  { id: 'en_m_b1_6', level: 'B1', targetWord: 'Outcome', nativeMeaning: 'Resultado / Desenlace', exampleSentence: 'We achieved a positive outcome.' },
  // B2 (6 pairs)
  { id: 'en_m_b2_1', level: 'B2', targetWord: 'Nevertheless', nativeMeaning: 'Sin embargo / No obstante', exampleSentence: 'It was risky; nevertheless, we succeeded.' },
  { id: 'en_m_b2_2', level: 'B2', targetWord: 'Thorough', nativeMeaning: 'Exhaustivo / Minucioso', exampleSentence: 'They conducted a thorough audit.' },
  { id: 'en_m_b2_3', level: 'B2', targetWord: 'Feasible', nativeMeaning: 'Viable / Factible', exampleSentence: 'Is this timeline financially feasible?' },
  { id: 'en_m_b2_4', level: 'B2', targetWord: 'To mitigate', nativeMeaning: 'Mitigar / Reducir riesgos', exampleSentence: 'We took steps to mitigate the risk.' },
  { id: 'en_m_b2_5', level: 'B2', targetWord: 'Unprecedented', nativeMeaning: 'Sin precedentes', exampleSentence: 'The company saw unprecedented growth.' },
  { id: 'en_m_b2_6', level: 'B2', targetWord: 'Bottleneck', nativeMeaning: 'Cuello de botella / Obstáculo', exampleSentence: 'We solved the production bottleneck.' }
];

const SPANISH_MEMORY_PAIRS: MemoryVocabPair[] = [
  // A1 (6 pairs)
  { id: 'es_m_a1_1', level: 'A1', targetWord: 'La cuenta', nativeMeaning: 'The bill / check', exampleSentence: '¿Nos trae la cuenta, por favor?' },
  { id: 'es_m_a1_2', level: 'A1', targetWord: 'El desayuno', nativeMeaning: 'Breakfast', exampleSentence: 'El desayuno está incluido.' },
  { id: 'es_m_a1_3', level: 'A1', targetWord: 'La estación', nativeMeaning: 'The station', exampleSentence: 'La estación de metro está cerca.' },
  { id: 'es_m_a1_4', level: 'A1', targetWord: 'Temprano', nativeMeaning: 'Early', exampleSentence: 'Me levanto temprano todos los días.' },
  { id: 'es_m_a1_5', level: 'A1', targetWord: 'El equipaje', nativeMeaning: 'The luggage', exampleSentence: 'Mi equipaje está en la habitación.' },
  { id: 'es_m_a1_6', level: 'A1', targetWord: 'La esquina', nativeMeaning: 'The street corner', exampleSentence: 'El banco está en la esquina.' },
  // A2 (6 pairs)
  { id: 'es_m_a2_1', level: 'A2', targetWord: 'Mudarse', nativeMeaning: 'To move (change residence)', exampleSentence: 'Nos mudamos a Valencia el mes pasado.' },
  { id: 'es_m_a2_2', level: 'A2', targetWord: 'El reembolso', nativeMeaning: 'The refund', exampleSentence: 'Solicité un reembolso completo.' },
  { id: 'es_m_a2_3', level: 'A2', targetWord: 'Alquilar', nativeMeaning: 'To rent', exampleSentence: 'Queremos alquilar un piso luminoso.' },
  { id: 'es_m_a2_4', level: 'A2', targetWord: 'El retraso', nativeMeaning: 'The delay', exampleSentence: 'El tren llegó con diez minutos de retraso.' },
  { id: 'es_m_a2_5', level: 'A2', targetWord: 'Acordarse de', nativeMeaning: 'To remember', exampleSentence: '¿Te acuerdas de nuestra primera clase?' },
  { id: 'es_m_a2_6', level: 'A2', targetWord: 'Darse cuenta', nativeMeaning: 'To realize / notice', exampleSentence: 'Me di cuenta del error a tiempo.' },
  // B1 (6 pairs)
  { id: 'es_m_b1_1', level: 'B1', targetWord: 'El plazo', nativeMeaning: 'The deadline / timeframe', exampleSentence: 'El plazo termina este viernes.' },
  { id: 'es_m_b1_2', level: 'B1', targetWord: 'Aplazar', nativeMeaning: 'To postpone / put off', exampleSentence: 'Tuvimos que aplazar la reunión.' },
  { id: 'es_m_b1_3', level: 'B1', targetWord: 'Fiable', nativeMeaning: 'Reliable / trustworthy', exampleSentence: 'Es una fuente muy fiable.' },
  { id: 'es_m_b1_4', level: 'B1', targetWord: 'Llevar a cabo', nativeMeaning: 'To carry out / execute', exampleSentence: 'Llevaremos a cabo el proyecto.' },
  { id: 'es_m_b1_5', level: 'B1', targetWord: 'Sin embargo', nativeMeaning: 'However / nevertheless', exampleSentence: 'Estaba lloviendo; sin embargo, fuimos.' },
  { id: 'es_m_b1_6', level: 'B1', targetWord: 'Merecer la pena', nativeMeaning: 'To be worth it', exampleSentence: 'El esfuerzo realmente merece la pena.' },
  // B2 (6 pairs)
  { id: 'es_m_b2_1', level: 'B2', targetWord: 'Imprescindible', nativeMeaning: 'Essential / indispensable', exampleSentence: 'La puntualidad es imprescindible aquí.' },
  { id: 'es_m_b2_2', level: 'B2', targetWord: 'El desenlace', nativeMeaning: 'The outcome / resolution', exampleSentence: 'La negociación tuvo un buen desenlace.' },
  { id: 'es_m_b2_3', level: 'B2', targetWord: 'Dar por sentado', nativeMeaning: 'To take for granted', exampleSentence: 'No debemos dar nada por sentado.' },
  { id: 'es_m_b2_4', level: 'B2', targetWord: 'Rentable', nativeMeaning: 'Profitable / cost-effective', exampleSentence: 'La inversión resultó muy rentable.' },
  { id: 'es_m_b2_5', level: 'B2', targetWord: 'A raíz de', nativeMeaning: 'As a result of / following', exampleSentence: 'Todo cambió a raíz de aquel acuerdo.' },
  { id: 'es_m_b2_6', level: 'B2', targetWord: 'Poner en marcha', nativeMeaning: 'To launch / set in motion', exampleSentence: 'Pusimos en marcha la nueva estrategia.' }
];

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeAnswer(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[¿?¡!.,;:"]/g, '')
    .replace(/\s+/g, ' ');
}

interface LevelArcadeGameSectionProps {
  courseLanguage: 'en' | 'es';
  onEarnXP: (amount: number) => void;
}

export function LevelArcadeGameSection({
  courseLanguage,
  onEarnXP
}: LevelArcadeGameSectionProps) {
  const isSpanishCourse = courseLanguage === 'es';
  const [selectedLevel, setSelectedLevel] = useState<LevelFilter>('A1');
  const [activeGameMode, setActiveGameMode] = useState<ArcadeGameMode>('conjugation');

  // ==========================================================================
  // GAME 1 STATE: EXPANDED CONJUGATION ROULETTE & TYPING CHALLENGE (48 CARDS/LANG)
  // ==========================================================================
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [inputMode, setInputMode] = useState<'cards' | 'typing'>('cards');
  const [handSize, setHandSize] = useState<6 | 12>(12);
  const [showParadigmTable, setShowParadigmTable] = useState<boolean>(false);
  const [typedConjugation, setTypedConjugation] = useState<string>('');
  const [letterHintCount, setLetterHintCount] = useState<number>(0);

  const baseConjugationPool = useMemo<ConjugationChallenge[]>(() => {
    const source = isSpanishCourse
      ? SPANISH_CONJUGATION_CHALLENGES
      : ENGLISH_CONJUGATION_CHALLENGES;

    const byLevel =
      selectedLevel === 'ALL'
        ? source
        : source.filter(item => item.level === selectedLevel);

    if (categoryFilter === 'all') return byLevel;
    const filtered = byLevel.filter(item => item.category === categoryFilter);
    return filtered.length > 0 ? filtered : byLevel;
  }, [isSpanishCourse, selectedLevel, categoryFilter]);

  const [conjQueue, setConjQueue] = useState<ConjugationChallenge[]>([]);
  const [conjIndex, setConjIndex] = useState(0);
  const [selectedConjOption, setSelectedConjOption] = useState<string | null>(null);
  const [conjStatus, setConjStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [conjStreak, setConjStreak] = useState(0);
  const [conjBestStreak, setConjBestStreak] = useState(0);
  const [conjRoundFinished, setConjRoundFinished] = useState(false);

  const initConjugationDeck = () => {
    const sliced = shuffleArray<ConjugationChallenge>(baseConjugationPool).slice(
      0,
      selectedLevel === 'ALL' ? Math.max(handSize, 12) : handSize
    );
    const prepared: ConjugationChallenge[] = sliced.map(
      (item: ConjugationChallenge, idx: number) => ({
        ...item,
        options: shuffleOptionsList(item.options, item.correctAnswer, idx),
        isRetry: false
      })
    );
    setConjQueue(prepared);
    setConjIndex(0);
    setSelectedConjOption(null);
    setTypedConjugation('');
    setLetterHintCount(0);
    setShowParadigmTable(false);
    setConjStatus('idle');
    setConjRoundFinished(false);
  };

  useEffect(() => {
    initConjugationDeck();
  }, [baseConjugationPool, handSize, selectedLevel]);

  const currentConj = conjQueue[conjIndex];

  const evaluateConjugationAnswer = (submittedAnswer: string) => {
    if (conjStatus !== 'idle' || !currentConj) return;
    const cleanSubmitted = normalizeAnswer(submittedAnswer);
    const cleanTarget = normalizeAnswer(currentConj.correctAnswer);

    setSelectedConjOption(submittedAnswer.trim());

    if (cleanSubmitted === cleanTarget) {
      playTactileSound('stamp');
      setConjStatus('correct');
      setShowParadigmTable(true);
      const nextStreak = conjStreak + 1;
      setConjStreak(nextStreak);
      if (nextStreak > conjBestStreak) setConjBestStreak(nextStreak);
      const xpReward = inputMode === 'typing' ? 25 : currentConj.isRetry ? 10 : 15;
      onEarnXP(xpReward);
      playSpeech(currentConj.fullSentence, { courseLanguage, rate: 0.94 });
    } else {
      playTactileSound('error');
      setConjStatus('wrong');
      setShowParadigmTable(true);
      setConjStreak(0);
      setConjQueue(prev => [
        ...prev,
        {
          ...currentConj,
          options: shuffleOptionsList(currentConj.options, currentConj.correctAnswer),
          isRetry: true
        }
      ]);
    }
  };

  const handleNextConjugation = () => {
    playTactileSound('flip');
    if (conjIndex < conjQueue.length - 1) {
      setConjIndex(prev => prev + 1);
      setSelectedConjOption(null);
      setTypedConjugation('');
      setLetterHintCount(0);
      setShowParadigmTable(false);
      setConjStatus('idle');
    } else {
      playTactileSound('win');
      onEarnXP(30);
      setConjRoundFinished(true);
    }
  };

  const handleRevealLetterHint = () => {
    if (!currentConj || conjStatus !== 'idle') return;
    playTactileSound('pop');
    const nextCount = Math.min(currentConj.correctAnswer.length, letterHintCount + 2);
    setLetterHintCount(nextCount);
    if (inputMode === 'typing') {
      setTypedConjugation(currentConj.correctAnswer.slice(0, nextCount));
    }
  };

  // ==========================================================================
  // GAME 2 STATE: 3D FLIP MEMORY MATCH BY LEVEL
  // ==========================================================================
  const effectiveSingleLevel: CEFRLevel = selectedLevel === 'ALL' ? 'A1' : selectedLevel;

  const levelMemoryPairs = useMemo<MemoryVocabPair[]>(() => {
    const source = isSpanishCourse ? SPANISH_MEMORY_PAIRS : ENGLISH_MEMORY_PAIRS;
    return source.filter(p => p.level === effectiveSingleLevel);
  }, [isSpanishCourse, effectiveSingleLevel]);

  const [memoryDeck, setMemoryDeck] = useState<MemoryDeckCard[]>([]);
  const [flippedUids, setFlippedUids] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [isPeeking, setIsPeeking] = useState(false);
  const [peekUsed, setPeekUsed] = useState(false);

  const initMemoryBoard = () => {
    const cards: MemoryDeckCard[] = [];
    for (const pair of levelMemoryPairs) {
      cards.push({
        uid: `${pair.id}_target`,
        pairId: pair.id,
        kind: 'target',
        displayText: pair.targetWord,
        subLabel: isSpanishCourse ? 'ESPAÑOL · AUDIO' : 'INGLÉS · AUDIO',
        audioText: pair.targetWord
      });
      cards.push({
        uid: `${pair.id}_native`,
        pairId: pair.id,
        kind: 'native',
        displayText: pair.nativeMeaning,
        subLabel: isSpanishCourse ? 'MEANING' : 'SIGNIFICADO',
        audioText: pair.targetWord
      });
    }
    setMemoryDeck(shuffleArray<MemoryDeckCard>(cards));
    setFlippedUids([]);
    setMatchedPairIds([]);
    setMemoryMoves(0);
    setIsPeeking(false);
    setPeekUsed(false);
  };

  useEffect(() => {
    initMemoryBoard();
  }, [levelMemoryPairs]);

  const handleFlipMemoryCard = (card: MemoryDeckCard) => {
    if (
      isPeeking ||
      flippedUids.length >= 2 ||
      flippedUids.includes(card.uid) ||
      matchedPairIds.includes(card.pairId)
    ) {
      return;
    }

    playTactileSound('flip');
    if (card.kind === 'target') {
      playSpeech(card.audioText, { courseLanguage, rate: 0.94 });
    }

    const nextFlipped = [...flippedUids, card.uid];
    setFlippedUids(nextFlipped);

    if (nextFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const firstCard = memoryDeck.find(c => c.uid === nextFlipped[0]);
      const secondCard = card;

      if (firstCard && firstCard.pairId === secondCard.pairId) {
        const nextMatched = Array.from(new Set([...matchedPairIds, secondCard.pairId]));
        const isBoardComplete = nextMatched.length === levelMemoryPairs.length;
        setTimeout(() => {
          playTactileSound(isBoardComplete ? 'win' : 'stamp');
          setMatchedPairIds(nextMatched);
          setFlippedUids([]);
          onEarnXP(isBoardComplete ? 40 : 10);
        }, 360);
      } else {
        setTimeout(() => {
          playTactileSound('error');
          setFlippedUids([]);
        }, 900);
      }
    }
  };

  const handlePeekDeck = () => {
    if (peekUsed || isPeeking) return;
    playTactileSound('pop');
    setPeekUsed(true);
    setIsPeeking(true);
    setTimeout(() => {
      setIsPeeking(false);
    }, 2200);
  };

  // ==========================================================================
  // GAME 3 STATE: LISTENING DICTATION & ERROR HUNTER (A1–B2)
  // ==========================================================================
  const dictationPool = useMemo<DictationItem[]>(() => {
    const source = isSpanishCourse ? SPANISH_DICTATION_ITEMS : ENGLISH_DICTATION_ITEMS;
    if (selectedLevel === 'ALL') return source;
    return source.filter(item => item.level === selectedLevel);
  }, [isSpanishCourse, selectedLevel]);

  const [dictIndex, setDictIndex] = useState(0);
  const [dictSubMode, setDictSubMode] = useState<'blocks' | 'typing' | 'error-hunter'>('blocks');
  const [pickedTileIndices, setPickedTileIndices] = useState<number[]>([]);
  const [typedDictation, setTypedDictation] = useState('');
  const [dictStatus, setDictStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showTranslationHint, setShowTranslationHint] = useState(false);
  const [selectedErrorFix, setSelectedErrorFix] = useState<string | null>(null);
  const [errorFixStatus, setErrorFixStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  useEffect(() => {
    setDictIndex(0);
    setPickedTileIndices([]);
    setTypedDictation('');
    setDictStatus('idle');
    setShowTranslationHint(false);
    setSelectedErrorFix(null);
    setErrorFixStatus('idle');
  }, [dictationPool]);

  const currentDict = dictationPool[dictIndex] || dictationPool[0];

  const targetDictWords = useMemo<string[]>(() => {
    if (!currentDict) return [];
    return currentDict.targetSentence.split(/\s+/);
  }, [currentDict]);

  const blockDictationTiles = useMemo<{ word: string; isTarget: boolean }[]>(() => {
    if (!currentDict) return [];
    const base = targetDictWords.map(w => ({ word: w, isTarget: true }));
    const extras = currentDict.distractorWords.map(w => ({ word: w, isTarget: false }));
    return shuffleArray<{ word: string; isTarget: boolean }>([...base, ...extras]);
  }, [currentDict, targetDictWords]);

  const shuffledErrorOptions = useMemo<string[]>(() => {
    if (!currentDict?.errorHunter) return [];
    return shuffleOptionsList(
      currentDict.errorHunter.options,
      currentDict.errorHunter.correctPart,
      dictIndex
    );
  }, [currentDict, dictIndex]);

  const handlePickDictationTile = (tileIdx: number) => {
    if (dictStatus !== 'idle' || pickedTileIndices.includes(tileIdx) || !currentDict) return;
    playTactileSound('pop');
    const tileWord = blockDictationTiles[tileIdx].word;
    playSpeech(tileWord.replace(/[¿?¡!.,;:"]/g, ''), { courseLanguage, rate: 0.96 });

    const nextPicked = [...pickedTileIndices, tileIdx];
    setPickedTileIndices(nextPicked);

    if (nextPicked.length === targetDictWords.length) {
      const builtSentence = nextPicked.map(idx => blockDictationTiles[idx].word).join(' ');
      if (normalizeAnswer(builtSentence) === normalizeAnswer(currentDict.targetSentence)) {
        playTactileSound('win');
        setDictStatus('correct');
        onEarnXP(20);
        playSpeech(currentDict.targetSentence, { courseLanguage, rate: 0.94 });
      } else {
        playTactileSound('error');
        setDictStatus('wrong');
      }
    }
  };

  const handleDictationWordHint = () => {
    if (!currentDict || dictStatus !== 'idle') return;
    playTactileSound('highlight');
    if (dictSubMode === 'blocks') {
      let validPrefix = 0;
      while (
        validPrefix < pickedTileIndices.length &&
        normalizeAnswer(blockDictationTiles[pickedTileIndices[validPrefix]].word) ===
          normalizeAnswer(targetDictWords[validPrefix])
      ) {
        validPrefix++;
      }
      if (validPrefix >= targetDictWords.length) return;
      const kept = pickedTileIndices.slice(0, validPrefix);
      const nextWordNeeded = targetDictWords[validPrefix];
      const matchTileIdx = blockDictationTiles.findIndex(
        (t, idx) => !kept.includes(idx) && normalizeAnswer(t.word) === normalizeAnswer(nextWordNeeded)
      );
      if (matchTileIdx === -1) return;
      const updated = [...kept, matchTileIdx];
      setPickedTileIndices(updated);
      if (updated.length === targetDictWords.length) {
        playTactileSound('win');
        setDictStatus('correct');
        onEarnXP(15);
        playSpeech(currentDict.targetSentence, { courseLanguage, rate: 0.94 });
      }
    } else if (dictSubMode === 'typing') {
      const currentWords = typedDictation.trim() ? typedDictation.trim().split(/\s+/) : [];
      const nextWordIdx = Math.min(currentWords.length, targetDictWords.length - 1);
      const revealed = targetDictWords.slice(0, nextWordIdx + 1).join(' ');
      setTypedDictation(revealed + ' ');
    }
  };

  const handleCheckTypedDictation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDict || dictStatus !== 'idle' || !typedDictation.trim()) return;
    if (normalizeAnswer(typedDictation) === normalizeAnswer(currentDict.targetSentence)) {
      playTactileSound('win');
      setDictStatus('correct');
      onEarnXP(30);
      playSpeech(currentDict.targetSentence, { courseLanguage, rate: 0.94 });
    } else {
      playTactileSound('error');
      setDictStatus('wrong');
    }
  };

  const handleSelectErrorHunterOption = (opt: string) => {
    if (!currentDict?.errorHunter || errorFixStatus !== 'idle') return;
    setSelectedErrorFix(opt);
    if (opt === currentDict.errorHunter.correctPart) {
      playTactileSound('stamp');
      setErrorFixStatus('correct');
      onEarnXP(20);
      playSpeech(currentDict.targetSentence, { courseLanguage, rate: 0.94 });
    } else {
      playTactileSound('error');
      setErrorFixStatus('wrong');
    }
  };

  const handleNextDictationCard = () => {
    playTactileSound('flip');
    setPickedTileIndices([]);
    setTypedDictation('');
    setDictStatus('idle');
    setShowTranslationHint(false);
    setSelectedErrorFix(null);
    setErrorFixStatus('idle');
    setDictIndex(prev => (prev + 1) % dictationPool.length);
  };

  // ==========================================================================
  // GAME 4 STATE: REAL-WORLD SURVIVAL MISSIONS (A1–B2)
  // ==========================================================================
  const survivalMissions = useMemo<SurvivalMission[]>(() => {
    const source = isSpanishCourse ? SPANISH_SURVIVAL_MISSIONS : ENGLISH_SURVIVAL_MISSIONS;
    if (selectedLevel === 'ALL') return source;
    const filtered = source.filter(m => m.level === selectedLevel);
    return filtered.length > 0 ? filtered : source;
  }, [isSpanishCourse, selectedLevel]);

  const [missionIdx, setMissionIdx] = useState(0);
  const [turnIdx, setTurnIdx] = useState(0);
  const [selectedSurvivalOpt, setSelectedSurvivalOpt] = useState<string | null>(null);
  const [survivalTurnStatus, setSurvivalTurnStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showNpcTranslation, setShowNpcTranslation] = useState(false);
  const [missionCompleted, setMissionCompleted] = useState(false);

  useEffect(() => {
    setMissionIdx(0);
    setTurnIdx(0);
    setSelectedSurvivalOpt(null);
    setSurvivalTurnStatus('idle');
    setShowNpcTranslation(false);
    setMissionCompleted(false);
  }, [survivalMissions]);

  const currentMission = survivalMissions[missionIdx] || survivalMissions[0];
  const currentTurn = currentMission?.turns[turnIdx] || currentMission?.turns[0];

  const shuffledSurvivalOptions = useMemo<string[]>(() => {
    if (!currentTurn) return [];
    return shuffleOptionsList(
      currentTurn.options,
      currentTurn.correctOption,
      turnIdx + missionIdx
    );
  }, [currentTurn, turnIdx, missionIdx]);

  const handleSelectSurvivalResponse = (opt: string) => {
    if (!currentTurn || survivalTurnStatus === 'correct') return;
    setSelectedSurvivalOpt(opt);
    if (opt === currentTurn.correctOption) {
      playTactileSound('stamp');
      setSurvivalTurnStatus('correct');
      onEarnXP(15);
      playSpeech(opt, { courseLanguage, rate: 0.94 });
    } else {
      playTactileSound('error');
      setSurvivalTurnStatus('wrong');
    }
  };

  const handleNextSurvivalTurn = () => {
    if (!currentMission) return;
    playTactileSound('flip');
    if (turnIdx < currentMission.turns.length - 1) {
      const nextTurn = turnIdx + 1;
      setTurnIdx(nextTurn);
      setSelectedSurvivalOpt(null);
      setSurvivalTurnStatus('idle');
      setShowNpcTranslation(false);
      playSpeech(currentMission.turns[nextTurn].npcLine, { courseLanguage, rate: 0.94 });
    } else {
      playTactileSound('win');
      onEarnXP(30);
      setMissionCompleted(true);
    }
  };

  const levelStyles: Record<LevelFilter, { badgeBg: string; labelEs: string; labelEn: string }> = {
    A1: {
      badgeBg: 'bg-sky-300 text-slate-950',
      labelEs: 'Nivel A1 · Fundamentos',
      labelEn: 'Level A1 · Foundations'
    },
    A2: {
      badgeBg: 'bg-yellow-300 text-slate-950',
      labelEs: 'Nivel A2 · Plataforma',
      labelEn: 'Level A2 · Past & Travel'
    },
    B1: {
      badgeBg: 'bg-emerald-300 text-slate-950',
      labelEs: 'Nivel B1 · Fluidez',
      labelEn: 'Level B1 · Independent'
    },
    B2: {
      badgeBg: 'bg-rose-300 text-slate-950',
      labelEs: 'Nivel B2 · Avanzado',
      labelEn: 'Level B2 · Executive'
    },
    ALL: {
      badgeBg: 'bg-violet-300 text-slate-950',
      labelEs: 'Mixto A1–B2 · Todos los Niveles',
      labelEn: 'Mixed A1–B2 · All Levels'
    }
  };

  const categoryButtons: { id: CategoryFilter; labelEs: string; labelEn: string }[] = [
    { id: 'all', labelEs: 'Todos los Tiempos', labelEn: 'All Tenses' },
    { id: 'affirmative', labelEs: 'Presente / Afirmativo', labelEn: 'Present / Affirmative' },
    { id: 'negative-question', labelEs: 'Negativos y Preguntas', labelEn: 'Negatives & Questions' },
    { id: 'past-perfect', labelEs: 'Pasados y Perfectos', labelEn: 'Past & Perfect Tenses' },
    { id: 'advanced-mood', labelEs: 'Condicionales y Subjuntivo', labelEn: 'Conditionals & Subjunctive' }
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#0f172a] dark:shadow-[6px_6px_0px_0px_#27272a]">
      {/* Top Arcade Header & Controls */}
      <div className="flex flex-col gap-4 pb-6 border-b-2 border-slate-900/10 dark:border-zinc-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-300 text-slate-950 border-2 border-slate-900 text-xs font-black shadow-[2px_2px_0px_0px_#0f172a]">
              <Dices className="w-4 h-4" />
              <span>
                {isSpanishCourse
                  ? '4-IN-1 LEARNING ARCADE · CONJUGATION, MEMORY, DICTATION & SURVIVAL'
                  : 'ARCADE 4 EN 1 · CONJUGACIÓN, MEMORIA, DICTADO Y SUPERVIVENCIA'}
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white tracking-tight font-display">
              {isSpanishCourse
                ? 'Interactive Language Arcade by CEFR Level (A1–B2)'
                : 'Sala Interactiva de Juegos por Nivel MCER (A1–B2)'}
            </h3>
          </div>

          {/* 5 Level Filter Buttons (A1, A2, B1, B2, ALL) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(['A1', 'A2', 'B1', 'B2', 'ALL'] as LevelFilter[]).map(lvl => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    setSelectedLevel(lvl);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-black border-2 border-slate-900 dark:border-zinc-700 transition-all ${
                    isSelected
                      ? `${levelStyles[lvl].badgeBg} shadow-[2px_2px_0px_0px_#0f172a] -translate-y-0.5`
                      : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-100'
                  }`}
                >
                  {lvl === 'ALL' ? (isSpanishCourse ? 'ALL (A1–B2)' : 'TODOS (A1–B2)') : lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Game Mode Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => {
              playTactileSound('pop');
              setActiveGameMode('conjugation');
            }}
            className={`p-3 rounded-2xl border-2 border-slate-900 text-left transition-all flex items-center gap-2.5 ${
              activeGameMode === 'conjugation'
                ? 'bg-yellow-300 text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] -translate-y-0.5'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white'
            }`}
          >
            <Dices className="w-5 h-5 shrink-0" />
            <div>
              <span className="text-xs font-black block">
                {isSpanishCourse ? '1. Conjugation Roulette' : '1. Ruleta de Conjugación'}
              </span>
              <span className="text-[11px] font-bold opacity-80 block">
                {isSpanishCourse ? '48 cards + Verb tables' : '48 cartas + Tablas de verbos'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              playTactileSound('pop');
              setActiveGameMode('memory');
            }}
            className={`p-3 rounded-2xl border-2 border-slate-900 text-left transition-all flex items-center gap-2.5 ${
              activeGameMode === 'memory'
                ? 'bg-emerald-300 text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] -translate-y-0.5'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white'
            }`}
          >
            <Layers className="w-5 h-5 shrink-0" />
            <div>
              <span className="text-xs font-black block">
                {isSpanishCourse ? '2. Memory Card Duel' : '2. Memoria de Palabras'}
              </span>
              <span className="text-[11px] font-bold opacity-80 block">
                {isSpanishCourse ? 'Flip pairs + Spoken audio' : 'Voltear pares + Audio'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              playTactileSound('pop');
              setActiveGameMode('dictation');
            }}
            className={`p-3 rounded-2xl border-2 border-slate-900 text-left transition-all flex items-center gap-2.5 ${
              activeGameMode === 'dictation'
                ? 'bg-sky-300 text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] -translate-y-0.5'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white'
            }`}
          >
            <Headphones className="w-5 h-5 shrink-0" />
            <div>
              <span className="text-xs font-black block">
                {isSpanishCourse ? '3. Audio Dictation & Traps' : '3. Dictado Auditivo y Trampas'}
              </span>
              <span className="text-[11px] font-bold opacity-80 block">
                {isSpanishCourse ? 'Listen 1.0x/0.75x + Error Hunter' : 'Oído 1.0x/0.75x + Caza-Errores'}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              playTactileSound('pop');
              setActiveGameMode('survival');
            }}
            className={`p-3 rounded-2xl border-2 border-slate-900 text-left transition-all flex items-center gap-2.5 ${
              activeGameMode === 'survival'
                ? 'bg-rose-300 text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] -translate-y-0.5'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white'
            }`}
          >
            <Compass className="w-5 h-5 shrink-0" />
            <div>
              <span className="text-xs font-black block">
                {isSpanishCourse ? '4. Survival Missions' : '4. Situaciones de Supervivencia'}
              </span>
              <span className="text-[11px] font-bold opacity-80 block">
                {isSpanishCourse ? 'Real-world dialogue decisions' : 'Decisiones en diálogos reales'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODE 1: EXPANDED CONJUGATION ROULETTE & TYPING CHALLENGE             */}
      {/* ==================================================================== */}
      {activeGameMode === 'conjugation' && (
        <div className="pt-6 space-y-5">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-slate-50 dark:bg-zinc-800/60 p-3.5 rounded-2xl border-2 border-slate-900/15 dark:border-zinc-700">
            <div className="flex flex-wrap items-center gap-1.5">
              {categoryButtons.map(cat => {
                const isCatActive = categoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setCategoryFilter(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all ${
                      isCatActive
                        ? 'bg-indigo-600 text-white border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]'
                        : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-300 dark:border-zinc-700 hover:bg-slate-100'
                    }`}
                  >
                    {isSpanishCourse ? cat.labelEn : cat.labelEs}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center bg-white dark:bg-zinc-900 p-1 rounded-xl border-2 border-slate-900 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    setInputMode('cards');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-colors ${
                    inputMode === 'cards'
                      ? 'bg-yellow-300 text-slate-950 border border-slate-900'
                      : 'text-slate-600 dark:text-zinc-400'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{isSpanishCourse ? '4 Cards' : '4 Cartas'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    setInputMode('typing');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-colors ${
                    inputMode === 'typing'
                      ? 'bg-emerald-300 text-slate-950 border border-slate-900'
                      : 'text-slate-600 dark:text-zinc-400'
                  }`}
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>{isSpanishCourse ? 'Write It (+25 XP)' : 'Escribir (+25 XP)'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  playTactileSound('pop');
                  setHandSize(prev => (prev === 12 ? 6 : 12));
                }}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 border-2 border-slate-900 dark:border-zinc-700 text-xs font-black"
              >
                {handSize === 12
                  ? isSpanishCourse
                    ? 'Full Deck: 12 Cards'
                    : 'Mazo Completo: 12 Cartas'
                  : isSpanishCourse
                    ? 'Quick Hand: 6 Cards'
                    : 'Mano Rápida: 6 Cartas'}
              </button>
            </div>
          </div>

          {conjRoundFinished ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-emerald-100 dark:bg-emerald-950/30 border-2 border-slate-900 dark:border-emerald-700 text-center space-y-5 shadow-[5px_5px_0px_0px_#0f172a]"
            >
              <div className="w-16 h-16 rounded-2xl bg-yellow-300 border-2 border-slate-900 flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#0f172a]">
                <Trophy className="w-8 h-8 text-slate-950" />
              </div>
              <div>
                <span className="px-3 py-1 rounded-lg bg-white text-slate-950 border border-slate-900 text-xs font-black">
                  {isSpanishCourse
                    ? `${levelStyles[selectedLevel].labelEn} Completed!`
                    : `¡${levelStyles[selectedLevel].labelEs} Superado!`}
                </span>
                <h4 className="text-2xl font-black text-slate-950 dark:text-white mt-3">
                  {isSpanishCourse
                    ? 'You Mastered Every Verb Conjugation in This Deck!'
                    : '¡Dominaste Todas las Conjugaciones de este Mazo!'}
                </h4>
                <p className="text-sm font-bold text-slate-700 dark:text-zinc-300 mt-1">
                  {isSpanishCourse
                    ? `Best streak: ${conjBestStreak} in a row · +30 Bonus XP earned`
                    : `Mejor racha: ${conjBestStreak} aciertos seguidos · +30 XP de bono`}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('flip');
                    initConjugationDeck();
                  }}
                  className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>
                    {isSpanishCourse ? 'Shuffle & Play Again' : 'Barajar y Jugar Otra Ronda'}
                  </span>
                </button>
              </div>
            </motion.div>
          ) : currentConj ? (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-zinc-800/90 p-3.5 rounded-2xl border-2 border-slate-900 dark:border-zinc-700">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`px-3 py-1 rounded-xl border-2 border-slate-900 text-xs font-black ${
                      levelStyles[currentConj.level].badgeBg
                    }`}
                  >
                    {currentConj.level}
                  </span>
                  <span className="text-xs font-black text-slate-700 dark:text-zinc-300 tabular-nums">
                    {isSpanishCourse
                      ? `Card ${conjIndex + 1} of ${conjQueue.length}`
                      : `Carta ${conjIndex + 1} de ${conjQueue.length}`}
                  </span>
                  {currentConj.isRetry && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-rose-200 text-rose-950 border border-slate-900 text-[11px] font-black">
                      {isSpanishCourse ? 'Mastery Retry' : 'Repaso de Dominio'}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-200 text-slate-950 border-2 border-slate-900 text-xs font-black">
                    <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
                    <span>
                      {isSpanishCourse ? `Streak: ${conjStreak}` : `Racha: ${conjStreak}`}
                    </span>
                  </div>

                  {conjStatus === 'idle' && (
                    <button
                      type="button"
                      onClick={handleRevealLetterHint}
                      className="px-3 py-1.5 rounded-xl bg-yellow-200 hover:bg-yellow-300 text-slate-950 border-2 border-slate-900 text-xs font-black inline-flex items-center gap-1.5 transition-colors"
                    >
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>
                        {letterHintCount > 0
                          ? `${isSpanishCourse ? 'Starts with:' : 'Empieza con:'} "${currentConj.correctAnswer.slice(0, letterHintCount)}..."`
                          : isSpanishCourse
                            ? 'Hint'
                            : 'Dar Pista'}
                      </span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setShowParadigmTable(prev => !prev);
                    }}
                    className={`px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-black inline-flex items-center gap-1.5 transition-colors ${
                      showParadigmTable
                        ? 'bg-indigo-600 text-white'
                        : 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-zinc-200 hover:bg-indigo-50'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>
                      {showParadigmTable
                        ? isSpanishCourse
                          ? 'Hide Verb Table'
                          : 'Ocultar Tabla'
                        : isSpanishCourse
                          ? 'Full Verb Table'
                          : 'Ver Tabla del Verbo'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('flip');
                      initConjugationDeck();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-yellow-200 text-slate-900 dark:text-zinc-200 border-2 border-slate-900 dark:border-zinc-600 text-xs font-black inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Dices className="w-3.5 h-3.5" />
                    <span>{isSpanishCourse ? 'New Hand' : 'Nueva Mano'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  key={`subj_${currentConj.id}_${conjIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-sky-200 text-slate-950 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]"
                >
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                    {isSpanishCourse ? '1. Subject Card' : '1. Carta de Sujeto'}
                  </span>
                  <p className="text-lg font-black">{currentConj.subjectCard}</p>
                </motion.div>

                <motion.div
                  key={`verb_${currentConj.id}_${conjIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className="p-4 rounded-2xl bg-yellow-200 text-slate-950 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]"
                >
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                    {isSpanishCourse ? '2. Base Verb Card' : '2. Carta de Verbo Base'}
                  </span>
                  <p className="text-lg font-black">{currentConj.verbCard}</p>
                </motion.div>

                <motion.div
                  key={`tense_${currentConj.id}_${conjIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-2xl bg-emerald-200 text-slate-950 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]"
                >
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-700 block mb-1">
                    {isSpanishCourse ? '3. Tense & Mood Card' : '3. Tiempo y Estructura'}
                  </span>
                  <p className="text-lg font-black">{currentConj.tenseCard}</p>
                </motion.div>
              </div>

              <div className="p-6 rounded-3xl bg-[#FAF8F5] dark:bg-zinc-800/80 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                      {isSpanishCourse
                        ? 'Complete the sentence with the correct conjugation:'
                        : 'Completa la oración con la conjugación exacta:'}
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white leading-snug">
                      {currentConj.sentenceTemplate.split('_____').map((part, i, arr) => (
                        <React.Fragment key={i}>
                          {part}
                          {i < arr.length - 1 && (
                            <span
                              className={`inline-block mx-1.5 px-3 py-0.5 rounded-xl border-2 border-slate-900 font-black transition-all ${
                                conjStatus === 'correct'
                                  ? 'bg-emerald-300 text-slate-950'
                                  : conjStatus === 'wrong'
                                    ? 'bg-rose-300 text-slate-950'
                                    : 'bg-yellow-200 text-slate-950'
                              }`}
                            >
                              {conjStatus !== 'idle'
                                ? currentConj.correctAnswer
                                : selectedConjOption ||
                                  (letterHintCount > 0
                                    ? `${currentConj.correctAnswer.slice(0, letterHintCount)}___`
                                    : '_____')}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-zinc-300">
                      {isSpanishCourse ? 'Meaning: ' : 'Traducción: '}
                      <span className="italic">"{currentConj.translation}"</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      playSpeech(currentConj.fullSentence, { courseLanguage, rate: 0.9 })
                    }
                    className="p-3 rounded-2xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] shrink-0 transition-transform active:scale-95"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {inputMode === 'cards' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentConj.options.map((opt, idx) => {
                      const isPicked = selectedConjOption === opt;
                      const isRight = opt === currentConj.correctAnswer;

                      let btnStyle =
                        'bg-white dark:bg-zinc-900 text-slate-950 dark:text-white border-slate-900 dark:border-zinc-600 hover:bg-yellow-100 dark:hover:bg-zinc-800';
                      if (conjStatus !== 'idle') {
                        if (isRight) {
                          btnStyle =
                            'bg-emerald-300 text-slate-950 border-slate-900 shadow-[3px_3px_0px_0px_#065f46]';
                        } else if (isPicked && !isRight) {
                          btnStyle =
                            'bg-rose-300 text-slate-950 border-slate-900 opacity-90';
                        } else {
                          btnStyle =
                            'bg-slate-100 dark:bg-zinc-900/50 text-slate-400 border-slate-300 dark:border-zinc-800 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={`${opt}_${idx}`}
                          type="button"
                          disabled={conjStatus !== 'idle'}
                          onClick={() => evaluateConjugationAnswer(opt)}
                          className={`p-4 rounded-2xl border-2 font-black text-left text-base transition-all flex items-center justify-between gap-3 shadow-[3px_3px_0px_0px_#0f172a] ${btnStyle}`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </span>
                          {conjStatus !== 'idle' && isRight && (
                            <CheckCircle2 className="w-5 h-5 text-slate-950 shrink-0" />
                          )}
                          {conjStatus !== 'idle' && isPicked && !isRight && (
                            <XCircle className="w-5 h-5 text-slate-950 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      if (typedConjugation.trim()) {
                        evaluateConjugationAnswer(typedConjugation);
                      }
                    }}
                    className="space-y-3 pt-2"
                  >
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-500 mr-1">
                        {isSpanishCourse ? 'Accents:' : 'Teclas rápidas:'}
                      </span>
                      {(isSpanishCourse
                        ? ['á', 'é', 'í', 'ó', 'ú', 'ñ']
                        : ["'", "n't", 'will ', 'have ', 'had ']
                      ).map(ch => (
                        <button
                          key={ch}
                          type="button"
                          disabled={conjStatus !== 'idle'}
                          onClick={() => setTypedConjugation(prev => `${prev}${ch}`)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 hover:bg-yellow-200 text-slate-950 dark:text-white border border-slate-900 dark:border-zinc-600 text-xs font-black"
                        >
                          {ch}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <input
                        type="text"
                        disabled={conjStatus !== 'idle'}
                        value={typedConjugation}
                        onChange={e => setTypedConjugation(e.target.value)}
                        placeholder={
                          isSpanishCourse
                            ? 'Type the conjugated Spanish verb here...'
                            : 'Escribe aquí el verbo conjugado en inglés...'
                        }
                        className="flex-1 px-4 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-600 text-base font-black text-slate-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {conjStatus === 'idle' && (
                        <button
                          type="submit"
                          disabled={!typedConjugation.trim()}
                          className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] whitespace-nowrap"
                        >
                          {isSpanishCourse ? 'Check Conjugation' : 'Comprobar Conjugación'}
                        </button>
                      )}
                    </div>
                  </form>
                )}

                <AnimatePresence>
                  {showParadigmTable && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4" />
                          <span>{currentConj.paradigmTitle}</span>
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          {isSpanishCourse
                            ? 'Click any row to hear pronunciation'
                            : 'Toca cualquier fila para escucharla'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {currentConj.paradigmRows.map((row, rIdx) => {
                          const isTargetRow = row.conjugated
                            .toLowerCase()
                            .includes(currentConj.correctAnswer.toLowerCase());
                          return (
                            <button
                              key={`${row.pronoun}_${rIdx}`}
                              type="button"
                              onClick={() =>
                                playSpeech(row.conjugated, { courseLanguage, rate: 0.92 })
                              }
                              className={`p-2.5 rounded-xl border text-left flex items-center justify-between gap-2 transition-colors ${
                                isTargetRow
                                  ? 'bg-yellow-200 text-slate-950 border-slate-900 font-black'
                                  : 'bg-slate-50 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border-slate-300 dark:border-zinc-700 hover:bg-yellow-50'
                              }`}
                            >
                              <div className="text-xs">
                                <span className="font-bold opacity-75 block">{row.pronoun}</span>
                                <span className="font-black text-sm">{row.conjugated}</span>
                              </div>
                              <Volume2 className="w-3.5 h-3.5 shrink-0 opacity-75" />
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {conjStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`p-4 rounded-2xl border-2 border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                        conjStatus === 'correct'
                          ? 'bg-emerald-200 text-slate-950'
                          : 'bg-amber-200 text-slate-950'
                      }`}
                    >
                      <div className="space-y-1">
                        <p className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                          {conjStatus === 'correct' ? (
                            <>
                              <Sparkles className="w-4 h-4" />
                              <span>
                                {isSpanishCourse
                                  ? `Exact Conjugation! (+${inputMode === 'typing' ? 25 : 15} XP)`
                                  : `¡Conjugación Exacta! (+${inputMode === 'typing' ? 25 : 15} XP)`}
                              </span>
                            </>
                          ) : (
                            <>
                              <HelpCircle className="w-4 h-4" />
                              <span>
                                {isSpanishCourse
                                  ? `Correct form: "${currentConj.correctAnswer}" (Queued for Mastery Retry)`
                                  : `Forma correcta: "${currentConj.correctAnswer}" (Agregada al repaso final)`}
                              </span>
                            </>
                          )}
                        </p>
                        <p className="text-xs sm:text-sm font-bold leading-relaxed">
                          {currentConj.ruleExplanation}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handleNextConjugation}
                        className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-indigo-700 text-white font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0px_0px_#312e81] whitespace-nowrap shrink-0 inline-flex items-center gap-2"
                      >
                        <span>{isSpanishCourse ? 'Next Card' : 'Siguiente Carta'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODE 2: 3D FLIP MEMORY MATCH BY LEVEL                                */}
      {/* ==================================================================== */}
      {activeGameMode === 'memory' && (
        <div className="pt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-zinc-800/90 p-3.5 rounded-2xl border-2 border-slate-900 dark:border-zinc-700">
            <div className="flex flex-wrap items-center gap-2.5">
              <span
                className={`px-3 py-1 rounded-xl border-2 border-slate-900 text-xs font-black ${
                  levelStyles[effectiveSingleLevel].badgeBg
                }`}
              >
                {isSpanishCourse
                  ? levelStyles[effectiveSingleLevel].labelEn
                  : levelStyles[effectiveSingleLevel].labelEs}
              </span>
              <span className="text-xs font-black text-slate-700 dark:text-zinc-300 tabular-nums">
                {isSpanishCourse
                  ? `Matched Pairs: ${matchedPairIds.length} / ${levelMemoryPairs.length}`
                  : `Pares Encontrados: ${matchedPairIds.length} / ${levelMemoryPairs.length}`}
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 tabular-nums">
                · {isSpanishCourse ? `Moves: ${memoryMoves}` : `Movimientos: ${memoryMoves}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={peekUsed || isPeeking || matchedPairIds.length === levelMemoryPairs.length}
                onClick={handlePeekDeck}
                className={`px-3 py-1.5 rounded-xl border-2 border-slate-900 text-xs font-black inline-flex items-center gap-1.5 transition-all ${
                  peekUsed
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-yellow-300 hover:bg-yellow-400 text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {peekUsed
                    ? isSpanishCourse
                      ? 'Peek Used'
                      : 'Vistazo Usado'
                    : isSpanishCourse
                      ? 'Peek Cards (2s)'
                      : 'Espiar Cartas (2s)'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileSound('flip');
                  initMemoryBoard();
                }}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 hover:bg-emerald-200 text-slate-950 dark:text-white border-2 border-slate-900 dark:border-zinc-600 text-xs font-black inline-flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isSpanishCourse ? 'New Shuffle' : 'Rebarajar'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
            {memoryDeck.map((card, idx) => {
              const isMatched = matchedPairIds.includes(card.pairId);
              const isFlipped = isPeeking || isMatched || flippedUids.includes(card.uid);

              return (
                <motion.button
                  key={card.uid}
                  type="button"
                  whileHover={!isFlipped ? { y: -2 } : undefined}
                  whileTap={!isFlipped ? { scale: 0.97 } : undefined}
                  onClick={() => handleFlipMemoryCard(card)}
                  className={`h-28 sm:h-32 rounded-2xl border-2 border-slate-900 p-3.5 flex flex-col justify-between text-left transition-all relative overflow-hidden ${
                    isMatched
                      ? 'bg-emerald-300 text-slate-950 shadow-[3px_3px_0px_0px_#065f46]'
                      : isFlipped
                        ? card.kind === 'target'
                          ? 'bg-yellow-200 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a]'
                          : 'bg-sky-200 text-slate-950 shadow-[4px_4px_0px_0px_#0f172a]'
                        : 'bg-slate-900 dark:bg-zinc-800 text-white hover:bg-indigo-950 shadow-[4px_4px_0px_0px_#312e81]'
                  }`}
                >
                  {isFlipped ? (
                    <>
                      <div className="flex items-center justify-between gap-1 w-full">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/80 text-slate-950 border border-slate-900">
                          {card.subLabel}
                        </span>
                        {isMatched ? (
                          <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />
                        ) : card.kind === 'target' ? (
                          <Volume2 className="w-4 h-4 text-slate-950 shrink-0" />
                        ) : null}
                      </div>

                      <p className="text-sm sm:text-base font-black leading-snug line-clamp-2">
                        {card.displayText}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between w-full text-[11px] font-black text-yellow-300">
                        <span>#{idx + 1}</span>
                        <span>{effectiveSingleLevel}</span>
                      </div>
                      <div className="flex items-center justify-center my-auto">
                        <Zap className="w-6 h-6 text-yellow-300 opacity-90" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-300">
                        {isSpanishCourse ? 'Tap to flip' : 'Toca para voltear'}
                      </span>
                    </>
                  )}
                </motion.button>
              );
            })}
          </div>

          {matchedPairIds.length > 0 && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-zinc-800/70 border-2 border-slate-900 dark:border-zinc-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                  {isSpanishCourse
                    ? `Unlocked Level ${effectiveSingleLevel} Words (Click to Hear Audio in Context):`
                    : `Palabras Desbloqueadas del Nivel ${effectiveSingleLevel} (Toca para escuchar en contexto):`}
                </span>
                {matchedPairIds.length === levelMemoryPairs.length && (
                  <span className="px-2.5 py-1 rounded-lg bg-yellow-300 text-slate-950 border border-slate-900 text-xs font-black">
                    {isSpanishCourse ? '★ Board Completed! +40 XP' : '★ ¡Tablero Completado! +40 XP'}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {levelMemoryPairs
                  .filter(p => matchedPairIds.includes(p.id))
                  .map(pair => (
                    <button
                      key={pair.id}
                      type="button"
                      onClick={() =>
                        playSpeech(`${pair.targetWord}. ${pair.exampleSentence}`, {
                          courseLanguage,
                          rate: 0.92
                        })
                      }
                      className="p-3 rounded-xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 text-left hover:bg-yellow-50 transition-colors flex items-start justify-between gap-2"
                    >
                      <div>
                        <p className="text-xs font-black text-slate-950 dark:text-white">
                          {pair.targetWord}{' '}
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">
                            = {pair.nativeMeaning}
                          </span>
                        </p>
                        <p className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400 mt-0.5">
                          "{pair.exampleSentence}"
                        </p>
                      </div>
                      <Volume2 className="w-4 h-4 text-slate-900 dark:text-yellow-300 shrink-0 mt-0.5" />
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODE 3: LISTENING DICTATION & ERROR HUNTER                           */}
      {/* ==================================================================== */}
      {activeGameMode === 'dictation' && currentDict && (
        <div className="pt-6 space-y-5">
          {/* Sub-Mode Bar: Block Dictation vs Typed Dictation vs Error Hunter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-zinc-800/90 p-3.5 rounded-2xl border-2 border-slate-900 dark:border-zinc-700">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-xl border-2 border-slate-900 text-xs font-black ${
                  levelStyles[currentDict.level].badgeBg
                }`}
              >
                {currentDict.level} · {currentDict.contextTag}
              </span>
              <span className="text-xs font-black text-slate-700 dark:text-zinc-300 tabular-nums">
                {isSpanishCourse
                  ? `Audio Challenge ${dictIndex + 1} of ${dictationPool.length}`
                  : `Reto Auditivo ${dictIndex + 1} de ${dictationPool.length}`}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-zinc-900 p-1 rounded-xl border-2 border-slate-900 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => {
                  playTactileSound('pop');
                  setDictSubMode('blocks');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors ${
                  dictSubMode === 'blocks'
                    ? 'bg-sky-300 text-slate-950 border border-slate-900'
                    : 'text-slate-600 dark:text-zinc-400'
                }`}
              >
                {isSpanishCourse ? '1. Audio Blocks' : '1. Dictado por Bloques'}
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileSound('pop');
                  setDictSubMode('typing');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors ${
                  dictSubMode === 'typing'
                    ? 'bg-emerald-300 text-slate-950 border border-slate-900'
                    : 'text-slate-600 dark:text-zinc-400'
                }`}
              >
                {isSpanishCourse ? '2. Write Dictation (+30 XP)' : '2. Dictado Escrito (+30 XP)'}
              </button>

              <button
                type="button"
                onClick={() => {
                  playTactileSound('pop');
                  setDictSubMode('error-hunter');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-colors flex items-center gap-1 ${
                  dictSubMode === 'error-hunter'
                    ? 'bg-amber-300 text-slate-950 border border-slate-900'
                    : 'text-slate-600 dark:text-zinc-400'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{isSpanishCourse ? '3. Error Hunter' : '3. Caza del Error'}</span>
              </button>
            </div>
          </div>

          {dictSubMode !== 'error-hunter' ? (
            <div className="p-6 rounded-3xl bg-[#FAF8F5] dark:bg-zinc-800/80 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] space-y-5">
              {/* Dual-Speed Audio Console */}
              <div className="p-5 rounded-2xl bg-sky-100 dark:bg-sky-950/40 border-2 border-slate-900 dark:border-sky-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-sky-300 flex items-center gap-1.5">
                    <Headphones className="w-4 h-4" />
                    <span>
                      {isSpanishCourse
                        ? 'Step 1: Listen carefully at Normal or Slow speed'
                        : 'Paso 1: Escucha el audio a velocidad Normal o Lenta'}
                    </span>
                  </span>
                  <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    {currentDict.phoneticTip}
                  </p>
                  {showTranslationHint && (
                    <p className="text-xs font-black text-indigo-900 dark:text-yellow-300 pt-1">
                      {isSpanishCourse ? 'Meaning: ' : 'Traducción: '} "{currentDict.nativeTranslation}"
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      playSpeech(currentDict.targetSentence, { courseLanguage, rate: 0.96 })
                    }
                    className="px-4 py-3 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] inline-flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isSpanishCourse ? 'Normal (1.0x)' : 'Escuchar (1.0x)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      playSpeech(currentDict.targetSentence, { courseLanguage, rate: 0.72 })
                    }
                    className="px-4 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a] inline-flex items-center gap-2"
                  >
                    <Volume2 className="w-4 h-4 text-indigo-600" />
                    <span>{isSpanishCourse ? 'Slow (0.72x)' : 'Lento (0.72x)'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowTranslationHint(prev => !prev)}
                    className="px-3 py-3 rounded-xl bg-slate-900 text-white border-2 border-slate-900 font-black text-xs"
                  >
                    {showTranslationHint
                      ? isSpanishCourse
                        ? 'Hide Meaning'
                        : 'Ocultar Traducción'
                      : isSpanishCourse
                        ? 'Show Meaning'
                        : 'Ver Significado'}
                  </button>
                </div>
              </div>

              {/* SUB-MODE A: AUDIO BLOCK BUILDER */}
              {dictSubMode === 'blocks' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black uppercase text-slate-600 dark:text-zinc-400">
                      {isSpanishCourse
                        ? `Tap the ${targetDictWords.length} words you hear in order (watch out for distractor words!):`
                        : `Toca las ${targetDictWords.length} palabras que escuchas en orden (¡cuidado con las palabras trampa!):`}
                    </span>
                    <div className="flex items-center gap-2">
                      {dictStatus === 'idle' && (
                        <button
                          type="button"
                          onClick={handleDictationWordHint}
                          className="px-3 py-1 rounded-lg bg-yellow-200 hover:bg-yellow-300 text-slate-950 border border-slate-900 text-xs font-black inline-flex items-center gap-1"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>{isSpanishCourse ? '+1 Word' : '+1 Palabra'}</span>
                        </button>
                      )}
                      {pickedTileIndices.length > 0 && dictStatus === 'idle' && (
                        <button
                          type="button"
                          onClick={() => {
                            playTactileSound('pop');
                            setPickedTileIndices(prev => prev.slice(0, -1));
                          }}
                          className="px-3 py-1 rounded-lg bg-white text-slate-900 border border-slate-900 text-xs font-black inline-flex items-center gap-1"
                        >
                          <Undo2 className="w-3.5 h-3.5" />
                          <span>{isSpanishCourse ? 'Undo' : 'Borrar última'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Assembled Sentence Tray */}
                  <div className="min-h-16 p-4 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-dashed border-slate-900 dark:border-zinc-600 flex flex-wrap items-center gap-2">
                    {pickedTileIndices.length === 0 ? (
                      <span className="text-xs font-bold text-slate-400">
                        {isSpanishCourse
                          ? 'Press Normal (1.0x) above and tap the word tiles below...'
                          : 'Pulsa Escuchar (1.0x) arriba y toca las fichas abajo para reconstruir el audio...'}
                      </span>
                    ) : (
                      pickedTileIndices.map((tIdx, orderIdx) => (
                        <button
                          key={`picked_${tIdx}_${orderIdx}`}
                          type="button"
                          disabled={dictStatus !== 'idle'}
                          onClick={() => {
                            playTactileSound('pop');
                            setPickedTileIndices(prev => prev.filter((_, i) => i !== orderIdx));
                          }}
                          className="px-3 py-1.5 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 font-black text-sm shadow-[2px_2px_0px_0px_#0f172a]"
                        >
                          {blockDictationTiles[tIdx]?.word}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Available Word Tiles */}
                  <div className="flex flex-wrap gap-2">
                    {blockDictationTiles.map((tile, idx) => {
                      const isUsed = pickedTileIndices.includes(idx);
                      return (
                        <button
                          key={`${tile.word}_${idx}`}
                          type="button"
                          disabled={isUsed || dictStatus !== 'idle'}
                          onClick={() => handlePickDictationTile(idx)}
                          className={`px-3.5 py-2 rounded-xl border-2 font-black text-sm transition-all ${
                            isUsed
                              ? 'bg-slate-200 dark:bg-zinc-800 text-slate-400 border-slate-300 opacity-40 cursor-not-allowed'
                              : 'bg-white dark:bg-zinc-900 hover:bg-sky-100 text-slate-950 dark:text-white border-slate-900 dark:border-zinc-600 shadow-[2px_2px_0px_0px_#0f172a]'
                          }`}
                        >
                          {tile.word}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* SUB-MODE B: WRITTEN DICTATION (+30 XP) */
                <form onSubmit={handleCheckTypedDictation} className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-500">
                        {isSpanishCourse ? 'Accents:' : 'Ayuda:'}
                      </span>
                      {(isSpanishCourse
                        ? ['á', 'é', 'í', 'ó', 'ú', 'ñ', '¿', '¡']
                        : ["'", "’", "didn't ", "Could ", 'please?']
                      ).map(ch => (
                        <button
                          key={ch}
                          type="button"
                          disabled={dictStatus !== 'idle'}
                          onClick={() => setTypedDictation(prev => `${prev}${ch}`)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-900 hover:bg-yellow-200 text-slate-950 dark:text-white border border-slate-900 text-xs font-black"
                        >
                          {ch}
                        </button>
                      ))}
                    </div>

                    {dictStatus === 'idle' && (
                      <button
                        type="button"
                        onClick={handleDictationWordHint}
                        className="px-3 py-1 rounded-lg bg-yellow-200 hover:bg-yellow-300 text-slate-950 border border-slate-900 text-xs font-black inline-flex items-center gap-1"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>
                          {isSpanishCourse ? 'Reveal Next Word' : 'Revelar Siguiente Palabra'}
                        </span>
                      </button>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      disabled={dictStatus !== 'idle'}
                      value={typedDictation}
                      onChange={e => setTypedDictation(e.target.value)}
                      placeholder={
                        isSpanishCourse
                          ? 'Type the complete Spanish sentence you heard...'
                          : 'Escribe la oración completa en inglés que escuchaste...'
                      }
                      className="flex-1 px-4 py-3.5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-600 text-base font-black text-slate-950 dark:text-white"
                    />
                    {dictStatus === 'idle' && (
                      <button
                        type="submit"
                        disabled={!typedDictation.trim()}
                        className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]"
                      >
                        {isSpanishCourse ? 'Verify Dictation' : 'Verificar Dictado'}
                      </button>
                    )}
                  </div>
                </form>
              )}

              {/* Dictation Feedback Banner */}
              {dictStatus !== 'idle' && (
                <div
                  className={`p-4 rounded-2xl border-2 border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    dictStatus === 'correct'
                      ? 'bg-emerald-200 text-slate-950'
                      : 'bg-amber-200 text-slate-950'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase">
                      {dictStatus === 'correct'
                        ? isSpanishCourse
                          ? '★ Exact Audio Dictation! (+20–30 XP)'
                          : '★ ¡Dictado Auditivo Exacto! (+20–30 XP)'
                        : isSpanishCourse
                          ? 'Exact transcript:'
                          : 'Transcripción exacta del audio:'}
                    </p>
                    <p className="text-base font-black">"{currentDict.targetSentence}"</p>
                    <p className="text-xs font-bold opacity-85">
                      {currentDict.nativeTranslation}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {dictStatus === 'wrong' && (
                      <button
                        type="button"
                        onClick={() => {
                          playTactileSound('pop');
                          setPickedTileIndices([]);
                          setTypedDictation('');
                          setDictStatus('idle');
                        }}
                        className="px-4 py-2.5 rounded-xl bg-white text-slate-950 border-2 border-slate-900 font-black text-xs"
                      >
                        {isSpanishCourse ? 'Retry' : 'Reintentar'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleNextDictationCard}
                      className="px-5 py-2.5 rounded-xl bg-slate-950 text-white border-2 border-slate-900 font-black text-xs inline-flex items-center gap-1.5"
                    >
                      <span>{isSpanishCourse ? 'Next Audio' : 'Siguiente Audio'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* SUB-MODE C: GRAMMAR ERROR HUNTER */
            currentDict.errorHunter && (
              <div className="p-6 rounded-3xl bg-[#FAF8F5] dark:bg-zinc-800/80 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] space-y-5">
                <div className="p-5 rounded-2xl bg-rose-100 dark:bg-rose-950/30 border-2 border-slate-900 space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>
                      {isSpanishCourse
                        ? 'Find & Fix the Common Trap in This Sentence:'
                        : 'Detecta y Corrige el Error Común en esta Oración:'}
                    </span>
                  </span>
                  <p className="text-xl font-black text-slate-950 dark:text-white">
                    ❌ "{currentDict.errorHunter.wrongSentence}"
                  </p>
                  <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                    {isSpanishCourse ? 'Intended meaning: ' : 'Lo que se quiere decir: '} "
                    {currentDict.nativeTranslation}"
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-black uppercase text-slate-600 dark:text-zinc-400">
                    {isSpanishCourse
                      ? `Which option replaces "${currentDict.errorHunter.wrongPart}" correctly?`
                      : `¿Cuál es la forma correcta en lugar de "${currentDict.errorHunter.wrongPart}"?`}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {shuffledErrorOptions.map((opt, idx) => {
                      const isPicked = selectedErrorFix === opt;
                      const isRight = opt === currentDict.errorHunter?.correctPart;

                      let btnStyle =
                        'bg-white dark:bg-zinc-900 text-slate-950 dark:text-white border-slate-900 hover:bg-yellow-100';
                      if (errorFixStatus !== 'idle') {
                        if (isRight) {
                          btnStyle = 'bg-emerald-300 text-slate-950 border-slate-900';
                        } else if (isPicked && !isRight) {
                          btnStyle = 'bg-rose-300 text-slate-950 border-slate-900';
                        } else {
                          btnStyle = 'bg-slate-100 text-slate-400 border-slate-300 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={`${opt}_${idx}`}
                          type="button"
                          disabled={errorFixStatus !== 'idle'}
                          onClick={() => handleSelectErrorHunterOption(opt)}
                          className={`p-4 rounded-2xl border-2 font-black text-left text-base shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-between gap-2 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {errorFixStatus !== 'idle' && isRight && (
                            <CheckCircle2 className="w-5 h-5 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {errorFixStatus !== 'idle' && (
                  <div className="p-4 rounded-2xl bg-emerald-200 text-slate-950 border-2 border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-black uppercase">
                        ✅ {isSpanishCourse ? 'Natural Form:' : 'Forma Correcta y Natural:'} "
                        {currentDict.targetSentence}"
                      </p>
                      <p className="text-xs sm:text-sm font-bold">
                        {currentDict.errorHunter.explanation}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleNextDictationCard}
                      className="px-5 py-3 rounded-xl bg-slate-950 text-white border-2 border-slate-900 font-black text-xs whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
                    >
                      <span>{isSpanishCourse ? 'Next Trap' : 'Siguiente Caso'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODE 4: REAL-WORLD SURVIVAL MISSIONS (A1–B2)                         */}
      {/* ==================================================================== */}
      {activeGameMode === 'survival' && currentMission && currentTurn && (
        <div className="pt-6 space-y-5">
          {/* Mission Selector & Progress Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100 dark:bg-zinc-800/90 p-3.5 rounded-2xl border-2 border-slate-900 dark:border-zinc-700">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-xl border-2 border-slate-900 text-xs font-black ${
                  levelStyles[currentMission.level].badgeBg
                }`}
              >
                {currentMission.locationBadge}
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-950 dark:text-white">
                {currentMission.title}
              </h4>
            </div>

            <div className="flex items-center gap-2">
              {survivalMissions.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    setMissionIdx(idx);
                    setTurnIdx(0);
                    setSelectedSurvivalOpt(null);
                    setSurvivalTurnStatus('idle');
                    setMissionCompleted(false);
                  }}
                  className={`px-3 py-1 rounded-xl border-2 border-slate-900 text-xs font-black ${
                    missionIdx === idx
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-900 hover:bg-yellow-200'
                  }`}
                >
                  {m.level} #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {missionCompleted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-emerald-100 dark:bg-emerald-950/30 border-2 border-slate-900 text-center space-y-4 shadow-[5px_5px_0px_0px_#0f172a]"
            >
              <div className="w-16 h-16 rounded-2xl bg-yellow-300 border-2 border-slate-900 flex items-center justify-center mx-auto shadow-[3px_3px_0px_0px_#0f172a]">
                <Trophy className="w-8 h-8 text-slate-950" />
              </div>
              <h4 className="text-2xl font-black text-slate-950 dark:text-white">
                {isSpanishCourse
                  ? `Survival Mission Completed: ${currentMission.title}!`
                  : `¡Misión de Supervivencia Superada: ${currentMission.title}!`}
              </h4>
              <p className="text-sm font-bold text-slate-700 dark:text-zinc-300 max-w-xl mx-auto">
                {isSpanishCourse
                  ? 'You handled all 3 real-world conversation turns with natural grammar and appropriate register (+45 Total XP).'
                  : 'Resolviste los 3 turnos de la situación real con gramática natural y el registro adecuado (+45 XP totales).'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('flip');
                    setTurnIdx(0);
                    setSelectedSurvivalOpt(null);
                    setSurvivalTurnStatus('idle');
                    setMissionCompleted(false);
                  }}
                  className="px-5 py-3 rounded-2xl bg-white text-slate-950 border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a]"
                >
                  {isSpanishCourse ? 'Replay Mission' : 'Repetir Misión'}
                </button>
                {survivalMissions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setMissionIdx(prev => (prev + 1) % survivalMissions.length);
                      setTurnIdx(0);
                      setSelectedSurvivalOpt(null);
                      setSurvivalTurnStatus('idle');
                      setMissionCompleted(false);
                    }}
                    className="px-6 py-3 rounded-2xl bg-indigo-600 text-white border-2 border-slate-900 font-black text-xs shadow-[3px_3px_0px_0px_#0f172a]"
                  >
                    {isSpanishCourse ? 'Next Survival Mission' : 'Siguiente Misión Real'}
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="p-6 rounded-3xl bg-[#FAF8F5] dark:bg-zinc-800/80 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] space-y-5">
              {/* Scenario Brief & Step Indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-slate-900/10">
                <p className="text-xs font-bold text-slate-600 dark:text-zinc-300">
                  {currentMission.scenarioSummary}
                </p>
                <span className="px-3 py-1 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 text-xs font-black whitespace-nowrap shrink-0">
                  {isSpanishCourse
                    ? `Step ${turnIdx + 1} of ${currentMission.turns.length}`
                    : `Paso ${turnIdx + 1} de ${currentMission.turns.length}`}
                </span>
              </div>

              {/* NPC Dialogue Bubble with Audio */}
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[3px_3px_0px_0px_#0f172a] flex items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-indigo-600 dark:text-indigo-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{currentTurn.npcRole}</span>
                  </span>
                  <p className="text-lg sm:text-xl font-black text-slate-950 dark:text-white leading-snug">
                    "{currentTurn.npcLine}"
                  </p>
                  {showNpcTranslation ? (
                    <p className="text-xs font-bold text-slate-600 dark:text-zinc-400 italic">
                      "{currentTurn.npcTranslation}"
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowNpcTranslation(true)}
                      className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 underline"
                    >
                      {isSpanishCourse ? 'Show English translation' : 'Ver traducción al español'}
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    playSpeech(currentTurn.npcLine, { courseLanguage, rate: 0.94 })
                  }
                  className="p-3 rounded-2xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Student Communicative Goal */}
              <div className="p-4 rounded-2xl bg-amber-100 dark:bg-amber-950/40 border-2 border-slate-900 text-slate-950 dark:text-amber-100">
                <span className="text-[11px] font-black uppercase tracking-wider block opacity-80">
                  {isSpanishCourse ? 'Your Communicative Goal:' : 'Tu Objetivo Comunicativo:'}
                </span>
                <p className="text-sm font-black mt-0.5">{currentTurn.missionObjective}</p>
              </div>

              {/* 3 Realistic Response Choices */}
              <div className="space-y-2.5">
                {shuffledSurvivalOptions.map((opt, idx) => {
                  const isPicked = selectedSurvivalOpt === opt;
                  const isRight = opt === currentTurn.correctOption;

                  let cardStyle =
                    'bg-white dark:bg-zinc-900 text-slate-950 dark:text-white border-slate-900 hover:bg-yellow-50';
                  if (survivalTurnStatus === 'correct') {
                    if (isRight) {
                      cardStyle = 'bg-emerald-300 text-slate-950 border-slate-900';
                    } else {
                      cardStyle = 'bg-slate-100 text-slate-400 border-slate-300 opacity-60';
                    }
                  } else if (survivalTurnStatus === 'wrong' && isPicked) {
                    cardStyle = 'bg-rose-200 text-slate-950 border-slate-900';
                  }

                  return (
                    <button
                      key={`${opt}_${idx}`}
                      type="button"
                      disabled={survivalTurnStatus === 'correct'}
                      onClick={() => handleSelectSurvivalResponse(opt)}
                      className={`w-full p-4 rounded-2xl border-2 font-black text-left text-sm sm:text-base transition-all shadow-[3px_3px_0px_0px_#0f172a] flex items-center justify-between gap-3 ${cardStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>"{opt}"</span>
                      </span>
                      {survivalTurnStatus === 'correct' && isRight && (
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Turn Feedback */}
              {survivalTurnStatus !== 'idle' && (
                <div
                  className={`p-4 rounded-2xl border-2 border-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    survivalTurnStatus === 'correct'
                      ? 'bg-emerald-200 text-slate-950'
                      : 'bg-rose-200 text-slate-950'
                  }`}
                >
                  <div className="space-y-1">
                    <p className="text-xs font-black uppercase">
                      {survivalTurnStatus === 'correct'
                        ? isSpanishCourse
                          ? '★ Natural Response! (+15 XP)'
                          : '★ ¡Respuesta Natural y Exacta! (+15 XP)'
                        : isSpanishCourse
                          ? 'Watch out! That response has a common trap. Try another option:'
                          : '¡Cuidado! Esa opción tiene una traducción literal o registro incorrecto. Elige otra:'}
                    </p>
                    {survivalTurnStatus === 'correct' && (
                      <p className="text-xs sm:text-sm font-bold">
                        {currentTurn.feedbackExplanation}
                      </p>
                    )}
                  </div>

                  {survivalTurnStatus === 'correct' && (
                    <button
                      type="button"
                      onClick={handleNextSurvivalTurn}
                      className="px-5 py-3 rounded-xl bg-slate-950 text-white border-2 border-slate-900 font-black text-xs whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
                    >
                      <span>
                        {turnIdx < currentMission.turns.length - 1
                          ? isSpanishCourse
                            ? 'Continue Dialogue'
                            : 'Continuar Diálogo'
                          : isSpanishCourse
                            ? 'Complete Mission'
                            : 'Completar Misión'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
