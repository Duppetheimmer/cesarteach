import React, { useState } from 'react';
import { Volume2, CheckCircle2, RefreshCw, Sparkles, X } from 'lucide-react';
import { motion } from 'motion/react';
import { playSpeech } from '../utils/speech';

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
  // Extract words from sentence
  const targetWords = correctSentence.split(' ');
  
  // Shuffle words for bank
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

    speakWord(word);
    setSelectedTiles(prev => [...prev, word]);
    setAvailableTiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleTileRemove = (word: string, index: number) => {
    if (status !== 'idle') return;

    setSelectedTiles(prev => prev.filter((_, i) => i !== index));
    setAvailableTiles(prev => [...prev, word]);
  };

  const handleCheck = () => {
    const constructed = selectedTiles.join(' ');
    const isMatched = constructed.trim().toLowerCase() === correctSentence.trim().toLowerCase();

    if (isMatched) {
      setStatus('correct');
      speakSentence(correctSentence);
      onCorrect();
    } else {
      setStatus('incorrect');
      onIncorrect();
    }
  };

  const handleReset = () => {
    setSelectedTiles([]);
    setAvailableTiles([...targetWords].sort(() => 0.5 - Math.random()));
    setStatus('idle');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Construye la Oración en Inglés
        </span>
        <button
          onClick={handleReset}
          className="text-xs font-bold text-zinc-400 hover:text-indigo-600 flex items-center gap-1"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Limpiar
        </button>
      </div>

      {/* Construction Zone */}
      <div className={`p-5 rounded-2xl border-2 min-h-[100px] flex flex-wrap items-center gap-2 transition-all ${
        status === 'correct'
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-300'
          : status === 'incorrect'
          ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400'
          : 'bg-zinc-50 dark:bg-zinc-800/50 border-dashed border-zinc-300 dark:border-zinc-700'
      }`}>
        {selectedTiles.length === 0 ? (
          <span className="text-xs font-semibold text-zinc-400 italic">
            Toca las palabras de abajo en el orden correcto para formar la frase...
          </span>
        ) : (
          selectedTiles.map((w, idx) => (
            <motion.button
              key={`${w}-${idx}`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={() => handleTileRemove(w, idx)}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-extrabold text-sm shadow-md flex items-center gap-1 hover:bg-rose-600 transition-colors"
            >
              <span>{w}</span>
              <X className="w-3.5 h-3.5 opacity-80" />
            </motion.button>
          ))
        )}
      </div>

      {/* Available Word Tiles */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        {availableTiles.map((w, idx) => (
          <motion.button
            key={`${w}-${idx}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTileSelect(w, idx)}
            disabled={status !== 'idle'}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500 font-bold text-sm text-zinc-800 dark:text-zinc-200 shadow-sm"
          >
            {w}
          </motion.button>
        ))}
      </div>

      {/* Verify Action Button */}
      {status === 'idle' && (
        <button
          onClick={handleCheck}
          disabled={selectedTiles.length === 0}
          className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-black text-sm shadow-md shadow-indigo-500/20 transition-all"
        >
          Comprobar Oración
        </button>
      )}

      {/* Feedback status */}
      {status === 'correct' && (
        <div className="p-4 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>¡Excelente! {explanation}</span>
        </div>
      )}

      {status === 'incorrect' && (
        <div className="p-4 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 text-xs font-bold space-y-1">
          <p>Ese no es el orden correcto. Inténtalo de nuevo.</p>
          {hint && <p className="text-rose-700 dark:text-rose-300 italic">Tip: {hint}</p>}
        </div>
      )}
    </div>
  );
}
