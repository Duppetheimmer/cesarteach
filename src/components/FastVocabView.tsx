import React, { useState, useMemo } from 'react';
import { VocabWord, UserProgress } from '../types';
import { Flashcard } from './Flashcard';
import { WordMatchingGame } from './WordMatchingGame';
import { PronunciationPractice } from './PronunciationPractice';
import { Zap, Award, ArrowLeft, ArrowRight, Filter, Gamepad2, Mic, Layers, Brain, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface FastVocabViewProps {
  words: VocabWord[];
  progress: UserProgress;
  onWordMastered: (id: string) => void;
  onSRSUpdate?: (wordId: string, status: 'easy' | 'good' | 'hard') => void;
  onAddXP?: (amount: number) => void;
  courseLanguage?: 'en' | 'es';
}

export function FastVocabView({
  words,
  progress,
  onWordMastered,
  onSRSUpdate,
  onAddXP,
  courseLanguage = 'es'
}: FastVocabViewProps) {
  const badges = progress.unlockedBadges || [];
  const isA1Certified = Boolean(progress.examPassed || badges.includes('b_cert_a1'));
  const isA2Certified = Boolean(badges.includes('b_cert_a2'));
  const isB1Certified = Boolean(badges.includes('b_cert_b1'));

  const [activeMode, setActiveMode] = useState<'cards' | 'match' | 'speak'>('cards');
  const [selectedLevel, setSelectedLevel] = useState<'ALL' | 'A1' | 'A2' | 'B1' | 'B2' | 'SRS_HARD'>(() =>
    isA1Certified ? 'ALL' : 'A1'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [currentIndex, setCurrentIndex] = useState(0);

  const isSpanishCourse = courseLanguage === 'es';

  const isWordLevelUnlocked = (lvl: string) => {
    if (lvl === 'A1') return true;
    if (lvl === 'A2') return isA1Certified;
    if (lvl === 'B1') return isA2Certified;
    if (lvl === 'B2') return isB1Certified;
    return true;
  };

  // Filter by CEFR level or SRS Hard status first (enforce certificate prerequisites)
  const levelFilteredWords = useMemo(() => {
    return words.filter(w => {
      const wordLevel = w.cefrLevel || (w.id.includes('b2') ? 'B2' : w.id.includes('b1') ? 'B1' : w.id.includes('a2') ? 'A2' : 'A1');
      if (!isWordLevelUnlocked(wordLevel)) return false;
      if (selectedLevel === 'A1') return wordLevel === 'A1';
      if (selectedLevel === 'A2') return wordLevel === 'A2';
      if (selectedLevel === 'B1') return wordLevel === 'B1';
      if (selectedLevel === 'B2') return wordLevel === 'B2';
      if (selectedLevel === 'SRS_HARD') {
        const srs = progress.wordSRSStatus?.[w.id];
        return srs === 'hard' || !progress.masteredWords.includes(w.id);
      }
      return true;
    });
  }, [words, selectedLevel, isA1Certified, isA2Certified, isB1Certified, progress.wordSRSStatus, progress.masteredWords]);

  // Dynamic categories from levelFilteredWords
  const categories = useMemo(() => {
    const unique = Array.from(new Set(levelFilteredWords.map(w => w.category)));
    return ['Todos', ...unique];
  }, [levelFilteredWords]);

  const filteredWords = useMemo(() => {
    if (selectedCategory === 'Todos') return levelFilteredWords;
    return levelFilteredWords.filter(w => w.category === selectedCategory);
  }, [levelFilteredWords, selectedCategory]);

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
  const accessibleWords = useMemo(
    () =>
      words.filter(w => {
        const lvl = w.cefrLevel || (w.id.includes('b2') ? 'B2' : w.id.includes('b1') ? 'B1' : w.id.includes('a2') ? 'A2' : 'A1');
        return isWordLevelUnlocked(lvl);
      }),
    [words, isA1Certified, isA2Certified, isB1Certified]
  );
  const masteredCount = accessibleWords.filter(w => progress.masteredWords.includes(w.id)).length;
  const progressPercentage = accessibleWords.length > 0 ? (masteredCount / accessibleWords.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className="mb-8 text-center bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-8 text-white shadow-lg">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-white/90 mb-2">
            {isSpanishCourse
              ? 'Spaced Repetition System (SRS) · CEFR A1 to B2'
              : 'Sistema de Repetición Espaciada (SRS) · Niveles A1 a B2'}
          </p>
          <h1 className="text-3xl md:text-4xl font-black mb-3">
            {isSpanishCourse ? 'High-Frequency Core Vocabulary (A1–B2)' : 'Laboratorio de Vocabulario A1 a B2'}
          </h1>
          <p className="text-white/95 text-sm md:text-base font-medium">
            {isSpanishCourse
              ? 'Master essential A1, A2, B1, and B2 words using active recall, acoustic shadowing, and memory games.'
              : 'Domina el vocabulario clave desde A1 hasta B2 mediante recuperación activa, pronunciación y asociación visual.'}
          </p>

          {/* Progress Card */}
          <div className="mt-6 bg-black/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 max-w-md mx-auto">
            <div className="flex justify-between items-center text-xs font-bold mb-2 tabular-nums">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-yellow-200" />
                {isSpanishCourse ? 'Mastered Vocabulary' : 'Palabras Dominadas'}
              </span>
              <span>
                {masteredCount} / {accessibleWords.length} ({Math.round(progressPercentage)}%)
              </span>
            </div>
            <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-yellow-300 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CEFR Level & Spaced Repetition Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          {(
            [
              { id: 'ALL', label: isSpanishCourse ? 'All Unlocked' : 'Todo Desbloqueado', locked: false },
              { id: 'A1', label: 'A1', locked: false },
              { id: 'A2', label: 'A2', locked: !isA1Certified },
              { id: 'B1', label: 'B1', locked: !isA2Certified },
              { id: 'B2', label: 'B2', locked: !isB1Certified },
              { id: 'SRS_HARD', label: isSpanishCourse ? 'SRS Review' : 'Por Reforzar (SRS)', locked: false }
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              type="button"
              disabled={tab.locked}
              onClick={() => {
                if (tab.locked) return;
                setSelectedLevel(tab.id);
                setSelectedCategory('Todos');
                setCurrentIndex(0);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                tab.locked
                  ? 'bg-slate-100 dark:bg-zinc-800/60 text-slate-400 dark:text-zinc-500 cursor-not-allowed opacity-70'
                  : selectedLevel === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              {tab.locked && <Lock className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Mode Selector Tabs */}
        <div className="inline-flex p-1 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
          <button
            type="button"
            onClick={() => setActiveMode('cards')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              activeMode === 'cards'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> {isSpanishCourse ? '3D Cards' : 'Tarjetas 3D'}
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('match')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              activeMode === 'match'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" /> {isSpanishCourse ? 'Memory Match' : 'Asociación'}
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('speak')}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              activeMode === 'speak'
                ? 'bg-white dark:bg-zinc-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
            }`}
          >
            <Mic className="w-3.5 h-3.5" /> {isSpanishCourse ? 'Speaking' : 'Pronunciación'}
          </button>
        </div>
      </div>

      {/* CARDS MODE */}
      {activeMode === 'cards' && (
        <>
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8 px-2">
            <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> {isSpanishCourse ? 'Category:' : 'Categoría:'}
            </span>
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentIndex(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800'
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
                onSRSUpdate={status => {
                  if (onSRSUpdate) onSRSUpdate(currentWord.id, status);
                }}
              />

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-8 max-w-md mx-auto bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={safeIndex === 0}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-xs"
                >
                  <ArrowLeft className="w-4 h-4" /> {isSpanishCourse ? 'Previous' : 'Anterior'}
                </button>

                <span className="text-xs font-bold text-slate-600 dark:text-zinc-400 tabular-nums">
                  {safeIndex + 1} / {filteredWords.length}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={safeIndex === filteredWords.length - 1}
                  className="px-4 py-2.5 rounded-xl font-bold text-slate-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 text-xs"
                >
                  {isSpanishCourse ? 'Next' : 'Siguiente'} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-3xl border border-slate-200 dark:border-zinc-800 text-slate-500">
              {isSpanishCourse ? 'All words in this filter are mastered!' : '¡No hay palabras pendientes en este filtro!'}
            </div>
          )}
        </>
      )}

      {/* MATCH MODE */}
      {activeMode === 'match' && (
        <WordMatchingGame
          words={filteredWords.length >= 4 ? filteredWords : words}
          courseLanguage={courseLanguage}
          onCompleteGame={earnedXP => {
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

          <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-2 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
            <button
              type="button"
              onClick={handlePrev}
              disabled={safeIndex === 0}
              className="p-3 rounded-xl font-bold text-slate-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> {isSpanishCourse ? 'Previous Word' : 'Palabra Anterior'}
            </button>

            <span className="text-xs font-bold text-slate-500 tabular-nums">
              {safeIndex + 1} / {filteredWords.length}
            </span>

            <button
              type="button"
              onClick={handleNext}
              disabled={safeIndex === filteredWords.length - 1}
              className="p-3 rounded-xl font-bold text-slate-700 dark:text-zinc-300 disabled:opacity-30 hover:bg-slate-100 dark:hover:bg-zinc-800 text-xs flex items-center gap-1"
            >
              {isSpanishCourse ? 'Next Word' : 'Siguiente Palabra'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
