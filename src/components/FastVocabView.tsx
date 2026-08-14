import React, { useState } from 'react';
import { VocabWord, UserProgress } from '../types';
import { Flashcard } from './Flashcard';
import { WordMatchingGame } from './WordMatchingGame';
import { PronunciationPractice } from './PronunciationPractice';
import { Zap, Sparkles, Award, ArrowLeft, ArrowRight, Filter, Gamepad2, Mic, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface FastVocabViewProps {
  words: VocabWord[];
  progress: UserProgress;
  onWordMastered: (id: string) => void;
  onSRSUpdate?: (wordId: string, status: 'easy' | 'good' | 'hard') => void;
  onAddXP?: (amount: number) => void;
  courseLanguage?: 'en' | 'es';
}

export function FastVocabView({ words, progress, onWordMastered, onSRSUpdate, onAddXP, courseLanguage = 'es' }: FastVocabViewProps) {
  const [activeMode, setActiveMode] = useState<'cards' | 'match' | 'speak'>('cards');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ['Todos', 'Sustantivos', 'Verbos', 'Adjetivos', 'Conectores'];

  const filteredWords = selectedCategory === 'Todos' 
    ? words 
    : words.filter(w => w.category === selectedCategory);

  const safeIndex = Math.min(currentIndex, Math.max(0, filteredWords.length - 1));
  const currentWord = filteredWords[safeIndex];

  const handleNext = () => {
    if (safeIndex < filteredWords.length - 1) {
      setCurrentIndex(safeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    }
  };

  const isMastered = currentWord ? progress.masteredWords.includes(currentWord.id) : false;
  const progressPercentage = (progress.masteredWords.length / words.length) * 100;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="mb-8 text-center relative overflow-hidden bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-8 text-white shadow-xl shadow-orange-500/15">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-3">
            <Zap className="w-4 h-4 text-yellow-200 fill-yellow-200" />
            Vía Rápida de Vocabulario A1
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Las 25 Palabras Clave
          </h1>
          <p className="text-white/95 text-base max-w-xl mx-auto font-medium">
            El vocabulario de alta frecuencia para expresarte con fluidez desde el día uno.
          </p>

          {/* Progress Card */}
          <div className="mt-6 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 max-w-md mx-auto">
            <div className="flex justify-between items-center text-sm font-bold mb-2">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-yellow-200" /> Palabras dominadas
              </span>
              <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs font-black">
                {progress.masteredWords.length} / {words.length}
              </span>
            </div>
            <div className="h-3.5 w-full bg-black/15 rounded-full overflow-hidden p-0.5">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-300 to-amber-200 rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.6, type: 'spring' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="flex justify-center mb-8 px-2">
        <div className="inline-flex p-1.5 rounded-2xl bg-zinc-200/80 dark:bg-zinc-800/80 border border-zinc-300 dark:border-zinc-700">
          <button
            onClick={() => setActiveMode('cards')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all ${
              activeMode === 'cards'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" /> Tarjetas 3D (SRS)
          </button>

          <button
            onClick={() => setActiveMode('match')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all ${
              activeMode === 'match'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Gamepad2 className="w-4 h-4" /> Juego de Memoria
          </button>

          <button
            onClick={() => setActiveMode('speak')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-2 transition-all ${
              activeMode === 'speak'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4" /> Pronunciación
          </button>
        </div>
      </div>

      {/* CARDS MODE */}
      {activeMode === 'cards' && (
        <>
          {/* Category Pills Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 px-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filtrar:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentIndex(0);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 scale-105'
                      : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-amber-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {currentWord ? (
            <div className="relative px-4">
              <Flashcard 
                key={currentWord.id}
                word={currentWord} 
                isMastered={isMastered}
                courseLanguage={courseLanguage}
                onMastered={() => onWordMastered(currentWord.id)}
                onSRSUpdate={(status) => {
                  if (onSRSUpdate) onSRSUpdate(currentWord.id, status);
                }}
              />

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-8 max-w-md mx-auto bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
                <button 
                  onClick={handlePrev}
                  disabled={safeIndex === 0}
                  className="p-3 rounded-xl font-bold text-zinc-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-amber-50 dark:hover:bg-zinc-800 hover:text-amber-600 transition-all flex items-center gap-1.5 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </button>

                <span className="px-4 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-extrabold">
                  {safeIndex + 1} de {filteredWords.length}
                </span>

                <button 
                  onClick={handleNext}
                  disabled={safeIndex === filteredWords.length - 1}
                  className="p-3 rounded-xl font-bold text-zinc-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-amber-50 dark:hover:bg-zinc-800 hover:text-amber-600 transition-all flex items-center gap-1.5 text-sm"
                >
                  Siguiente <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500">
              No hay palabras en esta categoría.
            </div>
          )}
        </>
      )}

      {/* MATCH MODE */}
      {activeMode === 'match' && (
        <WordMatchingGame
          words={words}
          courseLanguage={courseLanguage}
          onCompleteGame={(earnedXP) => {
            if (onAddXP) onAddXP(earnedXP);
          }}
        />
      )}

      {/* SPEAK MODE */}
      {activeMode === 'speak' && currentWord && (
        <div className="max-w-md mx-auto space-y-6">
          <PronunciationPractice
            targetPhrase={currentWord.word}
            courseLanguage={courseLanguage}
            onSuccess={() => {
              onWordMastered(currentWord.id);
            }}
          />

          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <button 
              onClick={handlePrev}
              disabled={safeIndex === 0}
              className="p-3 rounded-xl font-bold text-zinc-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-amber-50 dark:hover:bg-zinc-800 text-sm flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Palabra Anterior
            </button>

            <span className="text-xs font-bold text-zinc-500">
              {safeIndex + 1} / {words.length}
            </span>

            <button 
              onClick={handleNext}
              disabled={safeIndex === words.length - 1}
              className="p-3 rounded-xl font-bold text-zinc-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-amber-50 dark:hover:bg-zinc-800 text-sm flex items-center gap-1"
            >
              Siguiente Palabra <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

