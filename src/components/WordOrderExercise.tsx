import React, { useState } from 'react';
import { CheckCircle2, RefreshCw, Puzzle, X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';

interface WordOrderExerciseProps {
  correctSentence: string;
  explanation: string;
  hint?: string;
  courseLanguage?: 'en' | 'es';
  onCorrect: () => void;
  onIncorrect: () => void;
}

export function WordOrderExercise({
  correctSentence,
  explanation,
  hint,
  courseLanguage,
  onCorrect,
  onIncorrect
}: WordOrderExerciseProps) {
  const isSpanishCourse = courseLanguage === 'es';
  const targetWords = correctSentence.split(' ');

  const [availableTiles, setAvailableTiles] = useState<string[]>(() =>
    [...targetWords].sort(() => 0.5 - Math.random())
  );
  const [selectedTiles, setSelectedTiles] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const speakWord = (word: string) => {
    playSpeech(word, {
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

  const handleCheck = () => {
    const constructed = selectedTiles.join(' ');
    const isMatched = constructed.trim().toLowerCase() === correctSentence.trim().toLowerCase();

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
    setAvailableTiles([...targetWords].sort(() => 0.5 - Math.random()));
    setStatus('idle');
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
          <Puzzle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>
            {isSpanishCourse
              ? 'Magnetic Sentence Builder (Spanish)'
              : 'Imán de Frases (Ordena las fichas en inglés)'}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => speakSentence(correctSentence)}
            className="px-3 py-1 rounded-xl bg-indigo-600 text-white border-2 border-slate-900 text-xs font-black flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a]"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpanishCourse ? 'Audio Hint' : 'Audio Pista'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1 rounded-xl bg-white dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-600 text-xs font-black text-slate-900 dark:text-zinc-200 flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a]"
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
                ? 'Tap the magnetic word tiles below in the right order...'
                : 'Toca las fichas magnéticas de abajo en el orden correcto...'}
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
          className="p-4 rounded-2xl bg-rose-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] text-xs sm:text-sm font-bold space-y-1"
        >
          <p className="font-black">
            {isSpanishCourse
              ? 'Not quite the right word order. Check the clue!'
              : 'Ese no es el orden correcto de las fichas.'}
          </p>
          {hint && <p className="italic">Tip: {hint}</p>}
        </motion.div>
      )}
    </div>
  );
}
