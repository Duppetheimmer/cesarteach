import React, { useState } from 'react';
import { LessonStep, UserProgress } from '../types';
import { CheckCircle2, Lock, Play, Star, Trophy, Unlock } from 'lucide-react';
import { LessonPlayer } from './LessonPlayer';
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

  const completedCount = lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  const isSpanishCourse = lessons.length > 0 && lessons[0].id.startsWith('es_');

  let confidenceMap: Record<string, { confidence: 'easy' | 'good' | 'hard'; accuracy: number }> = {};
  try {
    confidenceMap = JSON.parse(localStorage.getItem('lingostep_lesson_confidence') || '{}');
  } catch (e) {}

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className={`mb-10 text-center bg-gradient-to-r ${themeGradient} rounded-3xl p-8 text-white shadow-lg relative overflow-hidden`}>
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-white/90 mb-2">
            {levelBadge}
          </p>
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">{title}</h1>
          <p className="text-white/95 text-sm md:text-base font-medium mb-6">{description}</p>

          {/* Level Progress & Pedagogical Mode Toggle */}
          <div className="max-w-lg mx-auto bg-black/15 backdrop-blur-md border border-white/20 rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center text-xs font-bold tabular-nums">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-300" />
                {isSpanishCourse ? 'Module Progress' : 'Progreso del Módulo'}
              </span>
              <span>
                {completedCount} / {lessons.length} {isSpanishCourse ? 'lessons' : 'lecciones'} ({Math.round(progressPercent)}%)
              </span>
            </div>
            <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-300 to-emerald-300 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/15 text-xs">
              <span className="text-white/90 font-medium">
                {isSpanishCourse ? 'Study Mode:' : 'Modo de Estudio:'}
              </span>
              <button
                type="button"
                onClick={() => setFreeExplorationMode(prev => !prev)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold transition-colors"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>
                  {freeExplorationMode
                    ? isSpanishCourse
                      ? 'Free Access Active (All Unlocked)'
                      : 'Modo Libre Activo (Todo Desbloqueado)'
                    : isSpanishCourse
                      ? 'Sequential Path (Click to Unlock All)'
                      : 'Secuencial Guiado (Clic para Modo Libre)'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Path Container */}
      <div className="relative px-2">
        {/* Central spine line */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-slate-200 dark:bg-zinc-800 -translate-x-1/2 rounded-full" />

        <div className="space-y-8 relative">
          {lessons.map((lesson, index) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isUnlocked =
              freeExplorationMode ||
              index === 0 ||
              isCompleted ||
              progress.completedLessons.includes(lessons[index - 1].id);
            const isCurrentActive = isUnlocked && !isCompleted;
            const isEven = index % 2 === 0;
            const savedMeta = confidenceMap[lesson.id];

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
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 shadow-sm cursor-pointer hover:border-emerald-500'
                        : isCurrentActive
                          ? 'bg-white dark:bg-zinc-900 border-indigo-500 dark:border-indigo-500 shadow-md cursor-pointer hover:border-indigo-600'
                          : 'bg-slate-50/70 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    {/* Clean unboxed metadata row */}
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-zinc-400 mb-2">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span className="text-indigo-600 dark:text-indigo-400">
                          {isSpanishCourse ? `Step ${lesson.day}` : `Paso ${lesson.day}`}
                        </span>
                        {lesson.cefrLevel && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>CEFR {lesson.cefrLevel}</span>
                          </>
                        )}
                        {savedMeta && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums text-emerald-600 dark:text-emerald-400">
                              {savedMeta.accuracy}%
                            </span>
                          </>
                        )}
                      </div>

                      {isCompleted ? (
                        <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                          {isSpanishCourse ? 'Completed' : 'Completada'}
                        </span>
                      ) : isCurrentActive ? (
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">
                          {isSpanishCourse ? 'Ready' : 'Disponible'}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 font-bold text-slate-400">
                          <Lock className="w-3.5 h-3.5" />
                          {isSpanishCourse ? 'Locked' : 'Bloqueado'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-slate-900 dark:text-zinc-100 mb-1.5 leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 leading-relaxed">
                      {lesson.description}
                    </p>

                    {lesson.grammarFocus && (
                      <p className="mt-2.5 text-[11px] font-semibold text-slate-500 dark:text-zinc-400 border-t border-slate-100 dark:border-zinc-800/80 pt-2">
                        {lesson.grammarFocus}
                      </p>
                    )}

                    {isUnlocked && (
                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        <span>
                          {isCompleted
                            ? isSpanishCourse
                              ? 'Practice & Review Again'
                              : 'Repasar Lección'
                            : isSpanishCourse
                              ? 'Start 4-Phase Lesson'
                              : 'Iniciar Lección (4 Fases)'}
                        </span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Node Center Icon */}
                <div
                  className={`hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center w-11 h-11 rounded-2xl border-4 border-white dark:border-zinc-950 z-10 transition-colors shadow-sm ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrentActive
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-200 dark:bg-zinc-800 text-slate-400 dark:text-zinc-600'
                  }`}
                >
                  {isCompleted ? (
                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                  ) : isCurrentActive ? (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  ) : (
                    <Lock className="w-4 h-4" />
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
