import React, { useState, useMemo } from 'react';
import { LessonStep, UserProgress } from '../types';
import { CheckCircle2, Lock, Play, Star, Trophy, Unlock, Volume2, ArrowRight } from 'lucide-react';
import { LessonPlayer } from './LessonPlayer';
import { playSpeech } from '../utils/speech';
import { motion } from 'motion/react';

interface StepPathProps {
  lessons: LessonStep[];
  progress: UserProgress;
  onLessonComplete: (id: string) => void;
  title: string;
  description: string;
  levelBadge: string;
  themeGradient: string;
  accentColor: string;
}

export function StepPath({
  lessons,
  progress,
  onLessonComplete,
  title,
  description,
  levelBadge,
  themeGradient
}: StepPathProps) {
  const [activeLesson, setActiveLesson] = useState<LessonStep | null>(null);
  const [freeExplorationMode, setFreeExplorationMode] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<'all' | 'pending' | 'completed'>('all');

  const completedCount = lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  const isSpanishCourse = lessons.length > 0 && lessons[0].id.startsWith('es_');
  const courseLang = isSpanishCourse ? 'es' : 'en';

  const nextRecommendedLesson = useMemo(() => {
    return lessons.find(l => !progress.completedLessons.includes(l.id)) || lessons[0] || null;
  }, [lessons, progress.completedLessons]);

  const filteredLessons = useMemo(() => {
    if (filterMode === 'pending') {
      return lessons.filter(l => !progress.completedLessons.includes(l.id));
    }
    if (filterMode === 'completed') {
      return lessons.filter(l => progress.completedLessons.includes(l.id));
    }
    return lessons;
  }, [lessons, progress.completedLessons, filterMode]);

  let confidenceMap: Record<string, { confidence: 'easy' | 'good' | 'hard'; accuracy: number }> = {};
  try {
    confidenceMap = JSON.parse(localStorage.getItem('lingostep_lesson_confidence') || '{}');
  } catch (e) {}

  return (
    <div className="max-w-5xl mx-auto pb-24">
      {/* Header Banner */}
      <div className={`mb-8 bg-gradient-to-r ${themeGradient} rounded-3xl p-7 md:p-9 text-white shadow-md relative overflow-hidden`}>
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-white/85 mb-2">
              {levelBadge}
            </p>
            <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">{title}</h1>
            <p className="text-white/90 text-sm md:text-base font-medium mb-6 leading-relaxed">
              {description}
            </p>

            {nextRecommendedLesson && (
              <button
                type="button"
                onClick={() => setActiveLesson(nextRecommendedLesson)}
                className="px-5 py-3 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-xs shadow-md inline-flex items-center gap-2 transition-transform active:scale-95"
              >
                <Play className="w-4 h-4 fill-indigo-600 text-indigo-600" />
                <span>
                  {isSpanishCourse
                    ? `Continue Step ${nextRecommendedLesson.day}: ${nextRecommendedLesson.title}`
                    : `Continuar Paso ${nextRecommendedLesson.day}: ${nextRecommendedLesson.title}`}
                </span>
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </button>
            )}
          </div>

          {/* Level Progress & Pedagogical Mode Toggle */}
          <div className="w-full lg:w-80 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl p-5 space-y-3.5 shrink-0">
            <div className="flex justify-between items-center text-xs font-bold tabular-nums">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-300" />
                {isSpanishCourse ? 'Module Progress' : 'Progreso del Módulo'}
              </span>
              <span>
                {completedCount} / {lessons.length} ({Math.round(progressPercent)}%)
              </span>
            </div>
            <div className="h-2.5 w-full bg-black/25 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-300 to-emerald-300 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs">
              <span className="text-white/90 font-medium">
                {isSpanishCourse ? 'Study Mode:' : 'Modo de Avance:'}
              </span>
              <button
                type="button"
                onClick={() => setFreeExplorationMode(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold transition-colors whitespace-nowrap shrink-0"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>
                  {freeExplorationMode
                    ? isSpanishCourse
                      ? 'Free Mode Active'
                      : 'Modo Libre Activo'
                    : isSpanishCourse
                      ? 'Unlock All Steps'
                      : 'Desbloquear Todas'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 px-1">
        <div className="flex items-center gap-1 p-1 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-2xs">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isSpanishCourse ? `All (${lessons.length})` : `Todas (${lessons.length})`}
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('pending')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
              filterMode === 'pending'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isSpanishCourse
              ? `Pending (${lessons.length - completedCount})`
              : `Pendientes (${lessons.length - completedCount})`}
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('completed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
              filterMode === 'completed'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {isSpanishCourse ? `Completed (${completedCount})` : `Completadas (${completedCount})`}
          </button>
        </div>

        <span className="text-xs font-medium text-slate-500 dark:text-zinc-400">
          {isSpanishCourse
            ? 'Click any unlocked lesson to start or listen to its audio preview.'
            : 'Haz clic en cualquier lección desbloqueada para iniciar o escuchar su vista previa.'}
        </span>
      </div>

      {/* Path Container */}
      <div className="relative px-2">
        {/* Central spine line */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-zinc-800 -translate-x-1/2 rounded-full" />

        <div className="space-y-6 relative">
          {filteredLessons.map((lesson, idx) => {
            const originalIndex = lessons.findIndex(l => l.id === lesson.id);
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isUnlocked =
              freeExplorationMode ||
              originalIndex <= 0 ||
              isCompleted ||
              progress.completedLessons.includes(lessons[originalIndex - 1]?.id);
            const isCurrentActive = isUnlocked && !isCompleted;
            const isEven = idx % 2 === 0;
            const savedMeta = confidenceMap[lesson.id];
            const samplePhrase = lesson.quiz[0]?.targetText || lesson.quiz[0]?.correctAnswer || lesson.title;

            return (
              <div
                key={lesson.id}
                className={`flex flex-col md:flex-row items-center w-full ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Card Container */}
                <div
                  className={`w-full md:w-1/2 flex ${
                    isEven ? 'md:justify-end md:pr-10' : 'md:justify-start md:pl-10'
                  }`}
                >
                  <div
                    role={isUnlocked ? 'button' : undefined}
                    tabIndex={isUnlocked ? 0 : -1}
                    onClick={() => isUnlocked && setActiveLesson(lesson)}
                    onKeyDown={e => {
                      if (isUnlocked && (e.key === 'Enter' || e.key === ' ')) {
                        setActiveLesson(lesson);
                      }
                    }}
                    className={`p-6 rounded-3xl w-full max-w-md text-left transition-all border ${
                      isCompleted
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-2xs cursor-pointer hover:border-emerald-500'
                        : isCurrentActive
                          ? 'bg-white dark:bg-zinc-900 border-indigo-500 dark:border-indigo-500 shadow-sm cursor-pointer hover:border-indigo-600'
                          : 'bg-slate-50/70 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Clean unboxed metadata row */}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-zinc-400 mb-2">
                      <div className="flex items-center gap-1.5 font-bold tabular-nums">
                        <span className="text-indigo-600 dark:text-indigo-400">
                          {isSpanishCourse ? `Step ${lesson.day}` : `Paso ${lesson.day}`}
                        </span>
                        {lesson.cefrLevel && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>
                              {isSpanishCourse ? `CEFR ${lesson.cefrLevel}` : `MCER ${lesson.cefrLevel}`}
                            </span>
                          </>
                        )}
                        {savedMeta && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-emerald-600 dark:text-emerald-400">
                              {isSpanishCourse
                                ? `${savedMeta.accuracy}% accuracy`
                                : `${savedMeta.accuracy}% precisión`}
                            </span>
                          </>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            playSpeech(samplePhrase, { courseLanguage: courseLang, rate: 0.92 });
                          }}
                          title={
                            isSpanishCourse
                              ? 'Listen to sample phrase from this lesson'
                              : 'Escuchar ejemplo de esta lección'
                          }
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-50 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-600 dark:text-zinc-300 hover:text-indigo-600 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        {isCompleted ? (
                          <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            {isSpanishCourse ? 'Completed' : 'Completada'}
                          </span>
                        ) : isCurrentActive ? (
                          <span className="font-bold text-indigo-600 dark:text-indigo-400">
                            {isSpanishCourse ? 'Available' : 'Disponible'}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 font-bold text-slate-400">
                            <Lock className="w-3.5 h-3.5" />
                            {isSpanishCourse ? 'Locked' : 'Bloqueado'}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 dark:text-zinc-100 mb-1.5 leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {lesson.description}
                    </p>

                    {lesson.grammarFocus && (
                      <p className="mt-2.5 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800/80 pt-2">
                        {isSpanishCourse ? 'Focus:' : 'Enfoque:'} {lesson.grammarFocus}
                      </p>
                    )}

                    {isUnlocked && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        <span>
                          {isCompleted
                            ? isSpanishCourse
                              ? 'Review Lesson'
                              : 'Repasar Lección'
                            : isSpanishCourse
                              ? 'Start Interactive Lesson'
                              : 'Iniciar Lección Interactiva'}
                        </span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Node Center Icon */}
                <div
                  className={`hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-10 h-10 rounded-2xl border-4 border-slate-50 dark:border-zinc-950 z-10 transition-colors shadow-2xs ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrentActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600'
                  }`}
                >
                  {isCompleted ? (
                    <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ) : isCurrentActive ? (
                    <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Balance Column */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      {activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onComplete={() => onLessonComplete(activeLesson.id)}
        />
      )}
    </div>
  );
}
