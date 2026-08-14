import React, { useState } from 'react';
import { VocabWord } from '../types';
import { motion } from 'motion/react';
import { playSpeech } from '../utils/speech';
import { Volume2, Sparkles, CheckCircle, RotateCw, Smile, Meh, Frown } from 'lucide-react';

interface FlashcardProps {
  key?: React.Key;
  word: VocabWord;
  onMastered: () => void;
  onSRSUpdate?: (status: 'easy' | 'good' | 'hard') => void;
  isMastered: boolean;
  courseLanguage?: 'en' | 'es';
}

const categoryColors: Record<string, { bg: string; text: string; gradient: string }> = {
  Sustantivos: { bg: 'bg-emerald-100 dark:bg-emerald-950/60', text: 'text-emerald-700 dark:text-emerald-300', gradient: 'from-emerald-500 to-teal-600' },
  Verbos: { bg: 'bg-indigo-100 dark:bg-indigo-950/60', text: 'text-indigo-700 dark:text-indigo-300', gradient: 'from-indigo-500 to-purple-600' },
  Adjetivos: { bg: 'bg-rose-100 dark:bg-rose-950/60', text: 'text-rose-700 dark:text-rose-300', gradient: 'from-rose-500 to-pink-600' },
  Conectores: { bg: 'bg-amber-100 dark:bg-amber-950/60', text: 'text-amber-700 dark:text-amber-300', gradient: 'from-amber-500 to-orange-600' },
};

export function Flashcard({ word, onMastered, onSRSUpdate, isMastered, courseLanguage = 'es' }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const catStyle = categoryColors[word.category] || { 
    bg: 'bg-blue-100 dark:bg-blue-950/60', 
    text: 'text-blue-700 dark:text-blue-300', 
    gradient: 'from-blue-500 to-indigo-600' 
  };

  const speak = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSpeech(word.word, {
      courseLanguage,
      rate: 0.9
    });
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      <div 
        className="relative w-full h-72 md:h-80 cursor-pointer perspective-1000 group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Card */}
          <div className="absolute w-full h-full bg-white dark:bg-zinc-900 border-2 border-indigo-100 dark:border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-between backface-hidden shadow-xl shadow-indigo-500/5">
            <div className="w-full flex justify-between items-center">
              <span className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full ${catStyle.bg} ${catStyle.text}`}>
                {word.category}
              </span>
              <button 
                onClick={speak}
                title="Escuchar pronunciación"
                className="p-2.5 rounded-full bg-indigo-50 hover:bg-indigo-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-indigo-600 dark:text-indigo-400 transition-all transform hover:scale-110 active:scale-95"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center my-auto">
              <h3 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
                {word.word}
              </h3>
              <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium">
                Pronunciación en inglés
              </p>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-indigo-600 transition-colors">
              <RotateCw className="w-3.5 h-3.5" />
              Toca para revelar traducción
            </div>
          </div>
          
          {/* Back Card */}
          <div 
            className={`absolute w-full h-full bg-gradient-to-br ${catStyle.gradient} rounded-3xl p-8 flex flex-col items-center justify-between backface-hidden shadow-2xl text-white`}
            style={{ transform: 'rotateY(180deg)' }}
          >
            <div className="w-full flex justify-between items-center opacity-80">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                Traducción
              </span>
              <button 
                onClick={speak}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all transform hover:scale-110"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center my-auto">
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">{word.translation}</h3>
              <div className="w-12 h-1 bg-white/40 rounded-full mx-auto mb-4" />
              <p className="text-sm md:text-base font-medium text-white/95 italic bg-black/10 p-3 rounded-2xl backdrop-blur-sm">
                "{word.example}"
              </p>
            </div>

            <div className="text-xs font-semibold text-white/80">
              ¡Evalúa tu nivel de recuerdo!
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* SRS Difficulty Rating Buttons */}
      <div className="mt-6 flex flex-col gap-3 w-full">
        {isFlipped && onSRSUpdate ? (
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl border border-zinc-200 dark:border-zinc-700">
            <button
              onClick={() => {
                onSRSUpdate('hard');
                setIsFlipped(false);
              }}
              className="py-2.5 px-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 transition-transform active:scale-95 shadow-sm"
            >
              <Frown className="w-4 h-4" />
              <span>Difícil</span>
            </button>
            <button
              onClick={() => {
                onSRSUpdate('good');
                setIsFlipped(false);
              }}
              className="py-2.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 transition-transform active:scale-95 shadow-sm"
            >
              <Meh className="w-4 h-4" />
              <span>Bien (+10XP)</span>
            </button>
            <button
              onClick={() => {
                onSRSUpdate('easy');
                setIsFlipped(false);
              }}
              className="py-2.5 px-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 transition-transform active:scale-95 shadow-sm"
            >
              <Smile className="w-4 h-4" />
              <span>Fácil (+20XP)</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex-1 py-3.5 px-4 rounded-2xl font-bold border-2 border-indigo-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-indigo-50 dark:hover:bg-zinc-800 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <RotateCw className="w-4 h-4 text-indigo-500" />
              {isFlipped ? 'Ver en inglés' : 'Girar tarjeta'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onMastered();
              }}
              disabled={isMastered}
              className={`flex-1 py-3.5 px-4 rounded-2xl font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
                isMastered 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border-2 border-emerald-300 dark:border-emerald-800 cursor-default' 
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              {isMastered ? '¡Aprendida!' : 'Marcar aprendida'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

