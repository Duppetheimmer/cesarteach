import React, { useState } from 'react';
import { LessonStep, UserProgress } from '../types';
import { CheckCircle2, Lock, Play, Sparkles, Star, Trophy, Award } from 'lucide-react';
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
  themeGradient,
  accentColor
}: StepPathProps) {
  const [activeLesson, setActiveLesson] = useState<LessonStep | null>(null);

  const completedCount = lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const progressPercent = (completedCount / lessons.length) * 100;

  const isSpanishCourse = lessons.length > 0 && lessons[0].id.startsWith('es_');

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header Banner */}
      <div className={`mb-12 text-center bg-gradient-to-r ${themeGradient} rounded-3xl p-8 text-white shadow-xl relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-yellow-200 fill-yellow-200" />
            {levelBadge}
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3">{title}</h1>
          <p className="text-white/95 text-base max-w-lg mx-auto font-medium mb-6">{description}</p>

          {/* Level Progress */}
          <div className="max-w-md mx-auto bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl p-4">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-yellow-300" /> {isSpanishCourse ? 'Level Progress' : 'Progreso del Nivel'}
              </span>
              <span>{completedCount} {isSpanishCourse ? 'of' : 'de'} {lessons.length} {isSpanishCourse ? 'lessons' : 'lecciones'}</span>
            </div>
            <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden p-0.5">
              <motion.div 
                className="h-full bg-gradient-to-r from-yellow-300 to-emerald-300 rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, type: 'spring' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Path Container */}
      <div className="relative px-2">
        {/* Animated gradient central line */}
        <div className="absolute left-1/2 top-4 bottom-4 w-2 bg-gradient-to-b from-indigo-200 via-purple-200 to-emerald-200 dark:from-zinc-800 dark:to-zinc-800 -translate-x-1/2 rounded-full shadow-inner" />

        <div className="space-y-10 relative">
          {lessons.map((lesson, index) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isUnlocked = index === 0 || progress.completedLessons.includes(lessons[index - 1].id);
            const isCurrentActive = isUnlocked && !isCompleted;
            const isEven = index % 2 === 0;

            return (
              <div key={lesson.id} className={`flex items-center w-full ${isEven ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Card Container */}
                <div className={`w-1/2 flex ${isEven ? 'justify-end pr-6 md:pr-10' : 'justify-start pl-6 md:pl-10'}`}>
                  <motion.div 
                    whileHover={isUnlocked ? { scale: 1.03, y: -2 } : {}}
                    whileTap={isUnlocked ? { scale: 0.98 } : {}}
                    className={`p-6 rounded-3xl w-full max-w-sm text-left transition-all ${
                      isCompleted 
                        ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border-2 border-emerald-300 dark:border-emerald-800 shadow-md shadow-emerald-500/10 cursor-pointer' 
                        : isCurrentActive
                        ? 'bg-white dark:bg-zinc-900 border-2 border-indigo-400 dark:border-indigo-500 shadow-xl shadow-indigo-500/20 ring-4 ring-indigo-100 dark:ring-indigo-950/50 cursor-pointer'
                        : 'bg-zinc-50/80 dark:bg-zinc-900/40 border-2 border-zinc-200/80 dark:border-zinc-800/80 opacity-60 cursor-not-allowed'
                    }`}
                    onClick={() => isUnlocked && setActiveLesson(lesson)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                        isCompleted 
                          ? 'bg-emerald-200/60 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' 
                          : isCurrentActive 
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300' 
                          : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                      }`}>
                        {isSpanishCourse ? 'Step' : 'Paso'} {lesson.day}
                      </span>

                      {isCompleted && (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" /> {isSpanishCourse ? 'Completed' : 'Completada'}
                        </span>
                      )}
                      {isCurrentActive && (
                        <span className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
                          <Sparkles className="w-4 h-4" /> {isSpanishCourse ? 'Available now!' : '¡Disponible hoy!'}
                        </span>
                      )}
                      {!isUnlocked && (
                        <span className="flex items-center gap-1 text-xs font-bold text-zinc-400">
                          <Lock className="w-3.5 h-3.5" /> {isSpanishCourse ? 'Locked' : 'Bloqueado'}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 mb-1.5 leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>

                    {isUnlocked && (
                      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        <span>{isCompleted ? (isSpanishCourse ? 'Review again' : 'Volver a repasar') : (isSpanishCourse ? 'Start lesson' : 'Empezar lección')}</span>
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Node Center Icon */}
                <div 
                  className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-2xl border-4 border-white dark:border-zinc-950 z-10 transition-all shadow-md ${
                    isCompleted
                      ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-emerald-500/30 scale-105'
                      : isCurrentActive
                      ? 'bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-indigo-500/40 scale-110 ring-4 ring-indigo-200 dark:ring-indigo-900'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600'
                  }`}
                >
                  {isCompleted ? (
                    <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                  ) : isCurrentActive ? (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                {/* Balance Column */}
                <div className="w-1/2" />
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
