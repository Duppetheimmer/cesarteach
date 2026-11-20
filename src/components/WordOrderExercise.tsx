import React, { useState, useEffect, useMemo } from 'react';
import { CheckCircle2, RefreshCw, Puzzle, X, Volume2, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';

interface WordOrderExerciseProps {
  questionPrompt?: string;
  correctSentence: string;
  explanation: string;
  hint?: string;
  courseLanguage?: 'en' | 'es';
  onCorrect: () => void;
  onIncorrect: () => void;
}

function scrambleWordsGuaranteed(words: string[]): string[] {
  if (words.length <= 1) return [...words];
  const targetJoined = words.join(' ');
  let arr = [...words];
  for (let attempt = 0; attempt < 8; attempt++) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    if (arr.join(' ') !== targetJoined) {
      return arr;
    }
  }
  return [...words].reverse();
}

function normalizeForComparison(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/[¿?¡!.,;:]/g, '')
    .trim()
    .toLowerCase();
}

export function WordOrderExercise({
  questionPrompt,
  correctSentence,
  explanation,
  hint,
  courseLanguage,
  onCorrect,
  onIncorrect
}: WordOrderExerciseProps) {
  const isSpanishCourse = courseLanguage === 'es';
  const targetWords = useMemo(
    () =>
      correctSentence
        .trim()
        .split(/\s+/)
        .filter(Boolean),
    [correctSentence]
  );

  const [availableTiles, setAvailableTiles] = useState<string[]>(() =>
    scrambleWordsGuaranteed(targetWords)
  );
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Reset tiles whenever correctSentence changes (e.g. moving to another word-order card)
  useEffect(() => {
    setAvailableTiles(scrambleWordsGuaranteed(targetWords));
    setSelectedTiles([]);
    setStatus('idle');
  }, [targetWords]);

  const speakWord = (word: string) => {
    playSpeech(word.replace(/[¿?¡!.,;:]/g, ''), {
      courseLanguage,
      rate: 0.95
    });
  };

  const speakSentence = (sentence: string) => {
    playSpeech(sentence, {
      courseLanguage,
      rate: 0.9
    });
  };

  const handleTileSelect = (word: string, index: number) => {
    if (status !== 'idle') return;
    playTactileSound('pop');
    speakWord(word);
    setSelectedTiles(prev => [...prev, word]);
    setAvailableTiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleTileRemove = (word: string, index: number) => {
    if (status !== 'idle') return;
    playTactileSound('pop');
    setSelectedTiles(prev => prev.filter((_, i) => i !== index));
    setAvailableTiles(prev => [...prev, word]);
  };

  // Smart Guided Hint: Places the next correct word tile automatically
  const handlePlaceNextCorrectWord = () => {
    if (status !== 'idle') return;
    // Find first position where selectedTiles doesn't match targetWords
    let mismatchIdx = 0;
    while (
      mismatchIdx < selectedTiles.length &&
      selectedTiles[mismatchIdx].toLowerCase() === targetWords[mismatchIdx]?.toLowerCase()
    ) {
      mismatchIdx++;
    }

    if (mismatchIdx >= targetWords.length) return;

    // Return any wrongly placed tiles from mismatchIdx onwards back to available
    const keptSelected = selectedTiles.slice(0, mismatchIdx);
    const returnedTiles = selectedTiles.slice(mismatchIdx);
    const pool = [...availableTiles, ...returnedTiles];

    const neededWord = targetWords[mismatchIdx];
    const poolIndex = pool.findIndex(w => w.toLowerCase() === neededWord.toLowerCase());
    if (poolIndex === -1) return;

    const pickedWord = pool[poolIndex];
    const nextPool = pool.filter((_, idx) => idx !== poolIndex);

    playTactileSound('highlight');
    speakWord(pickedWord);
    setSelectedTiles([...keptSelected, pickedWord]);
    setAvailableTiles(nextPool);
  };

  const handleCheck = () => {
    const constructed = selectedTiles.join(' ');
    const isMatched =
      normalizeForComparison(constructed) === normalizeForComparison(correctSentence);

    if (isMatched) {
      playTactileSound('win');
      setStatus('correct');
      speakSentence(correctSentence);
      onCorrect();
    } else {
      playTactileSound('error');
      setStatus('incorrect');
      onIncorrect();
    }
  };

  const handleReset = () => {
    playTactileSound('flip');
    setSelectedTiles([]);
    setAvailableTiles(scrambleWordsGuaranteed(targetWords));
    setStatus('idle');
  };

  return (
    <div className="space-y-4">
      {/* Prompt Card */}
      {questionPrompt && (
        <div className="p-4 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex items-start justify-between gap-3">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1 mb-1">
              <Puzzle className="w-3.5 h-3.5" />
              {isSpanishCourse
                ? 'Magnetic Sentence Builder (Spanish)'
                : 'Imán de Frases (Construcción Activa)'}
            </span>
            <h3 className="text-lg md:text-xl font-black text-slate-950 dark:text-zinc-100 leading-snug">
              {questionPrompt}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => speakSentence(correctSentence)}
            title={isSpanishCourse ? 'Listen to target sentence' : 'Escuchar oración objetivo'}
            className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] shrink-0"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-extrabold text-slate-600 dark:text-zinc-400">
          {isSpanishCourse
            ? `Words placed: ${selectedTiles.length} / ${targetWords.length}`
            : `Fichas colocadas: ${selectedTiles.length} / ${targetWords.length}`}
        </span>
        <div className="flex items-center gap-2">
          {status === 'idle' && selectedTiles.length < targetWords.length && (
            <button
              type="button"
              onClick={handlePlaceNextCorrectWord}
              className="px-3 py-1.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 text-xs font-black flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a]"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{isSpanishCourse ? '+1 Word Help' : 'Ayuda +1 Ficha'}</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => speakSentence(correctSentence)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white border-2 border-slate-900 text-xs font-black flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a]"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpanishCourse ? 'Audio Hint' : 'Escuchar Audio'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-600 text-xs font-black text-slate-900 dark:text-zinc-200 flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a]"
          >
            <RefreshCw className="w-3.5 h-3.5" /> {isSpanishCourse ? 'Reset' : 'Reiniciar'}
          </button>
        </div>
      </div>

      {/* Magnetic Drop Zone */}
      <motion.div
        animate={status === 'incorrect' ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
        transition={{ duration: 0.25 }}
        className={`p-5 rounded-2xl border-2 min-h-[96px] flex flex-wrap items-center gap-2.5 transition-colors shadow-[4px_4px_0px_0px_#0f172a] ${
          status === 'correct'
            ? 'bg-emerald-200 dark:bg-emerald-950/60 border-slate-900'
            : status === 'incorrect'
              ? 'bg-rose-200 dark:bg-rose-950/60 border-slate-900'
              : 'bg-[#FAF6EE] dark:bg-zinc-950 border-dashed border-slate-900 dark:border-zinc-600'
        }`}
      >
        <AnimatePresence>
          {selectedTiles.length === 0 ? (
            <span className="text-xs sm:text-sm font-bold text-slate-500 dark:text-zinc-400">
              {isSpanishCourse
                ? 'Tap the magnetic word tiles below in the right order (or use "+1 Word Help")...'
                : 'Toca las fichas magnéticas de abajo en el orden correcto (o usa "Ayuda +1 Ficha")...'}
            </span>
          ) : (
            selectedTiles.map((w, idx) => (
              <motion.button
                key={`${w}-${idx}`}
                layout
                initial={{ scale: 0.75, rotate: -4, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.75, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                onClick={() => handleTileRemove(w, idx)}
                className="px-3.5 py-2 rounded-xl bg-yellow-300 hover:bg-rose-300 text-slate-950 border-2 border-slate-900 font-black text-sm shadow-[3px_3px_0px_0px_#0f172a] flex items-center gap-1.5 transition-colors"
              >
                <span>{w}</span>
                <X className="w-3.5 h-3.5" />
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Available Magnetic Word Tiles */}
      <div className="flex flex-wrap items-center gap-2.5 pt-1">
        {availableTiles.map((w, idx) => (
          <motion.button
            key={`${w}-${idx}`}
            layout
            whileHover={{ y: -2, rotate: -1 }}
            whileTap={{ scale: 0.94, x: 2, y: 2 }}
            onClick={() => handleTileSelect(w, idx)}
            disabled={status !== 'idle'}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-emerald-200 dark:hover:bg-zinc-700 border-2 border-slate-900 dark:border-zinc-600 font-black text-sm text-slate-950 dark:text-zinc-100 shadow-[3px_3px_0px_0px_#0f172a] transition-colors"
          >
            {w}
          </motion.button>
        ))}
      </div>

      {/* Verify Action Button */}
      {status === 'idle' && (
        <motion.button
          whileHover={selectedTiles.length > 0 ? { y: -2 } : undefined}
          whileTap={selectedTiles.length > 0 ? { scale: 0.98, x: 2, y: 2 } : undefined}
          onClick={handleCheck}
          disabled={selectedTiles.length === 0}
          className="w-full py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-500 disabled:opacity-40 text-slate-950 border-2 border-slate-900 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] transition-colors"
        >
          {isSpanishCourse ? 'Stamp & Verify Sentence' : 'Sellar y Comprobar Oración'}
        </motion.button>
      )}

      {/* Feedback status */}
      {status === 'correct' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-2xl bg-emerald-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] text-xs sm:text-sm font-black flex items-center gap-2"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>
            {isSpanishCourse ? '✓ STAMPED! ' : '✓ ¡SELLADO! '} {explanation}
          </span>
        </motion.div>
      )}

      {status === 'incorrect' && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-rose-200 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] text-xs sm:text-sm font-bold space-y-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-black text-rose-950">
              {isSpanishCourse
                ? 'Word order check — compare with the target structure:'
                : 'Revisa el orden de las fichas — compara con la estructura correcta:'}
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-1 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 text-xs font-black shadow-[2px_2px_0px_0px_#0f172a]"
            >
              {isSpanishCourse ? 'Try Building It Again' : 'Intentar Armarla de Nuevo'}
            </button>
          </div>
          <p className="px-3 py-2 rounded-xl bg-white border border-slate-900 font-black text-slate-950">
            ✓ {correctSentence}
          </p>
          {hint && <p className="italic text-xs">💡 {hint}</p>}
        </motion.div>
      )}
    </div>
  );
}
