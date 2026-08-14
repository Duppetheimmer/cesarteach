import { useEffect, useState } from 'react';
import { UserProgress, Badge } from '../types';

const PROGRESS_KEY = 'lingostep_progress_v3';

export const SYSTEM_BADGES: Badge[] = [
  { id: 'b_first_step', title: 'Primer Paso', description: 'Completa tu primera lección', iconName: 'Footprints', reqType: 'lessons', reqValue: 1 },
  { id: 'b_5_lessons', title: 'Dedicación Constante', description: 'Completa 5 lecciones del curso', iconName: 'BookOpen', reqType: 'lessons', reqValue: 5 },
  { id: 'b_10_lessons', title: 'Líder A1', description: 'Completa 10 lecciones del curso', iconName: 'Award', reqType: 'lessons', reqValue: 10 },
  { id: 'b_10_words', title: 'Mente Léxica', description: 'Domina 10 palabras de vocabulario', iconName: 'Brain', reqType: 'words', reqValue: 10 },
  { id: 'b_25_words', title: 'Vocabulario Ninja', description: 'Domina las 25 palabras clave A1', iconName: 'Zap', reqType: 'words', reqValue: 25 },
  { id: 'b_100_xp', title: 'Primeros 100 XP', description: 'Acumula 100 Puntos de Experiencia', iconName: 'Sparkles', reqType: 'xp', reqValue: 100 },
  { id: 'b_500_xp', title: 'Estudiante Estrella', description: 'Acumula 500 Puntos de Experiencia', iconName: 'Star', reqType: 'xp', reqValue: 500 },
  { id: 'b_cert_a1', title: 'Graduado A1', description: 'Aprueba el Examen Final de Certificación', iconName: 'Trophy', reqType: 'exam', reqValue: 1 },
];

const defaultProgress: UserProgress = {
  completedLessons: [],
  masteredWords: [],
  examScore: undefined,
  examPassed: false,
  examPassedDate: undefined,
  xp: 0,
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  unlockedBadges: [],
  wordSRSStatus: {},
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(PROGRESS_KEY);
    if (stored) {
      try {
        const parsed: UserProgress = JSON.parse(stored);
        
        // Calculate streak
        const todayStr = new Date().toISOString().split('T')[0];
        let streak = parsed.streakDays || 1;
        let lastDate = parsed.lastStudyDate;

        if (lastDate && lastDate !== todayStr) {
          const last = new Date(lastDate);
          const now = new Date(todayStr);
          const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
          
          if (diffDays === 1) {
            streak += 1;
            lastDate = todayStr;
          } else if (diffDays > 1) {
            streak = 1;
            lastDate = todayStr;
          }
        } else if (!lastDate) {
          lastDate = todayStr;
        }

        const updated: UserProgress = {
          ...defaultProgress,
          ...parsed,
          streakDays: streak,
          lastStudyDate: lastDate,
        };

        setProgress(updated);
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    } else {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(defaultProgress));
    }
    setIsLoaded(true);
  }, []);

  const evaluateBadges = (currProg: UserProgress): string[] => {
    const newlyUnlocked = new Set<string>(currProg.unlockedBadges || []);

    SYSTEM_BADGES.forEach(badge => {
      if (newlyUnlocked.has(badge.id)) return;

      if (badge.reqType === 'lessons' && currProg.completedLessons.length >= badge.reqValue) {
        newlyUnlocked.add(badge.id);
      } else if (badge.reqType === 'words' && currProg.masteredWords.length >= badge.reqValue) {
        newlyUnlocked.add(badge.id);
      } else if (badge.reqType === 'xp' && currProg.xp >= badge.reqValue) {
        newlyUnlocked.add(badge.id);
      } else if (badge.reqType === 'exam' && currProg.examPassed) {
        newlyUnlocked.add(badge.id);
      }
    });

    return Array.from(newlyUnlocked);
  };

  const saveProgress = (newProgress: UserProgress) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const withUpdatedDate = {
      ...newProgress,
      lastStudyDate: todayStr,
    };
    const badges = evaluateBadges(withUpdatedDate);
    const finalProg = { ...withUpdatedDate, unlockedBadges: badges };
    
    setProgress(finalProg);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(finalProg));
  };

  const addXP = (amount: number) => {
    saveProgress({
      ...progress,
      xp: (progress.xp || 0) + amount,
    });
  };

  const markLessonComplete = (lessonId: string) => {
    const isAlreadyDone = progress.completedLessons.includes(lessonId);
    const completed = isAlreadyDone ? progress.completedLessons : [...progress.completedLessons, lessonId];
    const bonusXP = isAlreadyDone ? 15 : 60;

    saveProgress({
      ...progress,
      completedLessons: completed,
      xp: (progress.xp || 0) + bonusXP,
    });
  };

  const markWordMastered = (wordId: string) => {
    const isAlreadyMastered = progress.masteredWords.includes(wordId);
    const mastered = isAlreadyMastered ? progress.masteredWords : [...progress.masteredWords, wordId];
    const bonusXP = isAlreadyMastered ? 5 : 20;

    saveProgress({
      ...progress,
      masteredWords: mastered,
      xp: (progress.xp || 0) + bonusXP,
    });
  };

  const updateWordSRS = (wordId: string, status: 'easy' | 'good' | 'hard') => {
    const currentSRS = progress.wordSRSStatus || {};
    const updatedSRS = { ...currentSRS, [wordId]: status };
    
    // If easy or good, mark as mastered
    let mastered = progress.masteredWords;
    if ((status === 'easy' || status === 'good') && !mastered.includes(wordId)) {
      mastered = [...mastered, wordId];
    }

    saveProgress({
      ...progress,
      masteredWords: mastered,
      wordSRSStatus: updatedSRS,
      xp: (progress.xp || 0) + 10,
    });
  };

  const recordExamResult = (scorePercent: number, passed: boolean) => {
    const isNewPass = passed || progress.examPassed;
    const highestScore = Math.max(scorePercent, progress.examScore || 0);
    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const bonusXP = passed ? 150 : 30;

    saveProgress({
      ...progress,
      examScore: highestScore,
      examPassed: isNewPass,
      examPassedDate: isNewPass ? (progress.examPassedDate || currentDate) : progress.examPassedDate,
      xp: (progress.xp || 0) + bonusXP,
    });
  };

  const resetProgress = () => {
    saveProgress(defaultProgress);
  };

  return {
    progress,
    isLoaded,
    addXP,
    markLessonComplete,
    markWordMastered,
    updateWordSRS,
    recordExamResult,
    resetProgress,
  };
}

