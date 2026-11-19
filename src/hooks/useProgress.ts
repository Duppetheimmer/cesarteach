import { useEffect, useState, useCallback, useRef } from 'react';
import { UserProgress, Badge, UserProfile, CEFRLevel, ExamAttemptRecord } from '../types';
import { 
  fetchStudentProgressFromDatabase, 
  syncStudentProgressToDatabase, 
  getLocalStudents
} from '../lib/supabase';

const DEFAULT_PROGRESS_KEY = 'lingostep_progress_v3';

export const SYSTEM_BADGES: Badge[] = [
  { id: 'b_first_step', title: 'Primer Paso', description: 'Completa tu primera lección', iconName: 'Footprints', reqType: 'lessons', reqValue: 1 },
  { id: 'b_5_lessons', title: 'Dedicación Constante', description: 'Completa 5 lecciones del curso', iconName: 'BookOpen', reqType: 'lessons', reqValue: 5 },
  { id: 'b_10_lessons', title: 'Líder A1', description: 'Completa 10 lecciones del curso', iconName: 'Award', reqType: 'lessons', reqValue: 10 },
  { id: 'b_10_words', title: 'Mente Léxica', description: 'Domina 10 palabras de vocabulario', iconName: 'Brain', reqType: 'words', reqValue: 10 },
  { id: 'b_25_words', title: 'Vocabulario Ninja', description: 'Domina 25 palabras clave del curso', iconName: 'Zap', reqType: 'words', reqValue: 25 },
  { id: 'b_100_xp', title: 'Primeros 100 XP', description: 'Acumula 100 Puntos de Experiencia', iconName: 'Sparkles', reqType: 'xp', reqValue: 100 },
  { id: 'b_500_xp', title: 'Estudiante Estrella', description: 'Acumula 500 Puntos de Experiencia', iconName: 'Star', reqType: 'xp', reqValue: 500 },
  { id: 'b_cert_a1', title: 'Graduado A1', description: 'Aprueba el Examen de Certificación A1 (≥80%)', iconName: 'Trophy', reqType: 'exam', reqValue: 1 },
  { id: 'b_cert_a2', title: 'Graduado A2', description: 'Aprueba el Examen de Certificación A2 (≥80%)', iconName: 'Trophy', reqType: 2 as any, reqValue: 2 },
  { id: 'b_cert_b1', title: 'Graduado B1 Independiente', description: 'Aprueba el Examen de Certificación B1 (≥80%)', iconName: 'Trophy', reqType: 3 as any, reqValue: 3 },
  { id: 'b_cert_b2', title: 'Maestro B2 Avanzado', description: 'Aprueba el Examen de Certificación B2 (≥80%)', iconName: 'Trophy', reqType: 4 as any, reqValue: 4 },
];

const defaultProgress: UserProgress = {
  completedLessons: [],
  masteredWords: [],
  examScore: undefined,
  examPassed: false,
  examPassedDate: undefined,
  levelScores: {},
  xp: 0,
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  unlockedBadges: [],
  wordSRSStatus: {},
  lessonDates: {},
  examHistory: [],
  totalExercisesDone: 0,
  timeSpentMinutes: 0
};

export function useProgress(currentUser?: UserProfile | null, courseLanguage: 'en' | 'es' = 'es') {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'local_only' | 'error'>('idle');
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const activeUserRef = useRef<UserProfile | null>(currentUser || null);
  const courseLangRef = useRef<'en' | 'es'>(courseLanguage);

  useEffect(() => {
    activeUserRef.current = currentUser || null;
    courseLangRef.current = courseLanguage;
  }, [currentUser, courseLanguage]);

  const storageKey = currentUser ? `lingostep_progress_${currentUser.id}` : DEFAULT_PROGRESS_KEY;

  // Merge local and Firebase Firestore progress without losing any multi-level achievements
  const mergeProgress = (local: UserProgress, remote: UserProgress): UserProgress => {
    const unionLessons = Array.from(new Set([...(local.completedLessons || []), ...(remote.completedLessons || [])]));
    const unionWords = Array.from(new Set([...(local.masteredWords || []), ...(remote.masteredWords || [])]));
    const unionBadges = Array.from(new Set([...(local.unlockedBadges || []), ...(remote.unlockedBadges || [])]));

    const mergedLevelScores: Partial<Record<CEFRLevel, number>> = {
      ...(local.levelScores || {}),
      ...(remote.levelScores || {})
    };
    (['A1', 'A2', 'B1', 'B2'] as CEFRLevel[]).forEach(lvl => {
      const lScore = local.levelScores?.[lvl] || 0;
      const rScore = remote.levelScores?.[lvl] || 0;
      const maxLvlScore = Math.max(lScore, rScore);
      if (maxLvlScore > 0) {
        mergedLevelScores[lvl] = maxLvlScore;
      }
    });

    // Combine exam history deduplicated by date
    const historyMap = new Map<string, ExamAttemptRecord>();
    (local.examHistory || []).forEach(item => historyMap.set(item.date, item));
    (remote.examHistory || []).forEach(item => historyMap.set(item.date, item));
    const mergedExamHistory = Array.from(historyMap.values()).slice(-30);

    return {
      completedLessons: unionLessons,
      masteredWords: unionWords,
      examScore: Math.max(local.examScore || 0, remote.examScore || 0) || undefined,
      examPassed: Boolean(local.examPassed || remote.examPassed || unionBadges.includes('b_cert_a1')),
      examPassedDate: remote.examPassedDate || local.examPassedDate,
      levelScores: mergedLevelScores,
      xp: Math.max(local.xp || 0, remote.xp || 0),
      streakDays: Math.max(local.streakDays || 1, remote.streakDays || 1),
      lastStudyDate: remote.lastStudyDate || local.lastStudyDate || new Date().toISOString().split('T')[0],
      unlockedBadges: unionBadges,
      wordSRSStatus: { ...(local.wordSRSStatus || {}), ...(remote.wordSRSStatus || {}) },
      lessonDates: { ...(local.lessonDates || {}), ...(remote.lessonDates || {}) },
      examHistory: mergedExamHistory,
      totalExercisesDone: Math.max(local.totalExercisesDone || 0, remote.totalExercisesDone || 0),
      timeSpentMinutes: Math.max(local.timeSpentMinutes || 0, remote.timeSpentMinutes || 0),
    };
  };

  // Initial load when user or storageKey changes
  useEffect(() => {
    let isCancelled = false;

    async function initializeUserProgress() {
      setIsLoaded(false);
      let initialProg: UserProgress = { ...defaultProgress };

      // 1. Check user-specific localStorage, global fallback, and local student registry, and merge them all
      try {
        const storedUser = localStorage.getItem(storageKey);
        if (storedUser) {
          initialProg = mergeProgress(initialProg, { ...defaultProgress, ...JSON.parse(storedUser) });
        }
      } catch (e) {
        console.warn('Failed to parse user local progress', e);
      }

      if (currentUser) {
        try {
          const localStudents = getLocalStudents();
          const found = localStudents.find(
            s => s.profile.id === currentUser.id || s.profile.email.toLowerCase() === currentUser.email.toLowerCase()
          );
          if (found && found.progress) {
            initialProg = mergeProgress(initialProg, { ...defaultProgress, ...found.progress });
          }
        } catch (e) {}
      }

      // Calculate daily streak
      const todayStr = new Date().toISOString().split('T')[0];
      let streak = initialProg.streakDays || 1;
      let lastDate = initialProg.lastStudyDate;

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

      initialProg = {
        ...initialProg,
        streakDays: streak,
        lastStudyDate: lastDate,
      };

      if (!isCancelled) {
        setProgress(initialProg);
        try {
          localStorage.setItem(storageKey, JSON.stringify(initialProg));
        } catch {}
        setIsLoaded(true);
      }

      // 2. Fetch latest data from Firebase Firestore if user is logged in
      if (currentUser?.id) {
        try {
          setSyncStatus('syncing');
          const remoteProgress = await fetchStudentProgressFromDatabase(currentUser.id);
          if (remoteProgress && !isCancelled) {
            const merged = mergeProgress(initialProg, remoteProgress);
            setProgress(merged);
            localStorage.setItem(storageKey, JSON.stringify(merged));
            localStorage.setItem(DEFAULT_PROGRESS_KEY, JSON.stringify(merged));
            await syncStudentProgressToDatabase(currentUser, merged, courseLanguage);
            setSyncStatus('synced');
            setLastSyncedAt(new Date());
          } else if (!isCancelled) {
            localStorage.setItem(storageKey, JSON.stringify(initialProg));
            localStorage.setItem(DEFAULT_PROGRESS_KEY, JSON.stringify(initialProg));
            await syncStudentProgressToDatabase(currentUser, initialProg, courseLanguage);
            setSyncStatus('synced');
            setLastSyncedAt(new Date());
          }
        } catch (err) {
          if (!isCancelled) {
            console.warn('Could not fetch remote progress, using local copy:', err);
            setSyncStatus('local_only');
          }
        }
      } else {
        setSyncStatus('local_only');
      }
    }

    initializeUserProgress();

    return () => {
      isCancelled = true;
    };
  }, [storageKey, currentUser?.id]);

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

  const progressRef = useRef<UserProgress>(progress);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const saveProgress = useCallback((newProgress: UserProgress) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const withUpdatedDate = {
      ...newProgress,
      lastStudyDate: todayStr,
    };
    const badges = evaluateBadges(withUpdatedDate);
    const finalProg: UserProgress = { ...withUpdatedDate, unlockedBadges: badges };
    
    // 1. Instant local state & redundant localStorage update
    setProgress(finalProg);
    progressRef.current = finalProg;

    try {
      const userKey = activeUserRef.current ? `lingostep_progress_${activeUserRef.current.id}` : DEFAULT_PROGRESS_KEY;
      localStorage.setItem(userKey, JSON.stringify(finalProg));
      localStorage.setItem(DEFAULT_PROGRESS_KEY, JSON.stringify(finalProg));
    } catch (e) {
      console.warn('Error writing to localStorage:', e);
    }

    // 2. Direct background sync to local student registry + Firebase Firestore
    const user = activeUserRef.current;
    const lang = courseLangRef.current;
    if (user && user.id) {
      setIsSyncing(true);
      setSyncStatus('syncing');
      syncStudentProgressToDatabase(user, finalProg, lang)
        .then((res) => {
          setIsSyncing(false);
          if (res.success) {
            setSyncStatus('synced');
            setLastSyncedAt(new Date());
          } else {
            setSyncStatus('local_only');
          }
        })
        .catch(() => {
          setIsSyncing(false);
          setSyncStatus('local_only');
        });
    } else {
      setLastSyncedAt(new Date());
    }
  }, []);

  // Flush progress on tab hide or window unload so progress is never lost
  useEffect(() => {
    const handleVisibilityOrUnload = () => {
      const curr = progressRef.current;
      const user = activeUserRef.current;
      const lang = courseLangRef.current;
      try {
        const userKey = user ? `lingostep_progress_${user.id}` : DEFAULT_PROGRESS_KEY;
        localStorage.setItem(userKey, JSON.stringify(curr));
        localStorage.setItem(DEFAULT_PROGRESS_KEY, JSON.stringify(curr));
      } catch {}
      if (user && user.id && document.visibilityState === 'hidden') {
        syncStudentProgressToDatabase(user, curr, lang).catch(() => {});
      }
    };

    window.addEventListener('beforeunload', handleVisibilityOrUnload);
    document.addEventListener('visibilitychange', handleVisibilityOrUnload);
    return () => {
      window.removeEventListener('beforeunload', handleVisibilityOrUnload);
      document.removeEventListener('visibilitychange', handleVisibilityOrUnload);
    };
  }, []);

  const addXP = useCallback((amount: number) => {
    setProgress((prev) => {
      const updated: UserProgress = {
        ...prev,
        xp: (prev.xp || 0) + amount,
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const isAlreadyDone = prev.completedLessons.includes(lessonId);
      const completed = isAlreadyDone ? prev.completedLessons : [...prev.completedLessons, lessonId];
      const bonusXP = isAlreadyDone ? 15 : 60;
      const lessonDates = {
        ...(prev.lessonDates || {}),
        [lessonId]: new Date().toISOString()
      };

      const updated: UserProgress = {
        ...prev,
        completedLessons: completed,
        lessonDates,
        xp: (prev.xp || 0) + bonusXP,
        totalExercisesDone: (prev.totalExercisesDone || 0) + 1,
        timeSpentMinutes: (prev.timeSpentMinutes || 0) + (isAlreadyDone ? 5 : 15),
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  const markWordMastered = useCallback((wordId: string) => {
    setProgress((prev) => {
      const isAlreadyMastered = prev.masteredWords.includes(wordId);
      const mastered = isAlreadyMastered ? prev.masteredWords : [...prev.masteredWords, wordId];
      const bonusXP = isAlreadyMastered ? 5 : 20;

      const updated: UserProgress = {
        ...prev,
        masteredWords: mastered,
        xp: (prev.xp || 0) + bonusXP,
        totalExercisesDone: (prev.totalExercisesDone || 0) + 1,
        timeSpentMinutes: (prev.timeSpentMinutes || 0) + 2,
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  const updateWordSRS = useCallback((wordId: string, status: 'easy' | 'good' | 'hard') => {
    setProgress((prev) => {
      const currentSRS = prev.wordSRSStatus || {};
      const updatedSRS = { ...currentSRS, [wordId]: status };
      
      let mastered = prev.masteredWords;
      if ((status === 'easy' || status === 'good') && !mastered.includes(wordId)) {
        mastered = [...mastered, wordId];
      }

      const updated: UserProgress = {
        ...prev,
        masteredWords: mastered,
        wordSRSStatus: updatedSRS,
        xp: (prev.xp || 0) + 10,
        totalExercisesDone: (prev.totalExercisesDone || 0) + 1,
        timeSpentMinutes: (prev.timeSpentMinutes || 0) + 2,
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  const recordExamResult = useCallback((scorePercent: number, passed: boolean, level: CEFRLevel = 'A1') => {
    setProgress((prev) => {
      const isA1Pass = level === 'A1' ? (passed || prev.examPassed) : prev.examPassed;
      const highestScore = Math.max(scorePercent, prev.examScore || 0);
      const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const certBadgeId = `b_cert_${level.toLowerCase()}`;
      const updatedBadges = passed
        ? Array.from(new Set([...(prev.unlockedBadges || []), certBadgeId]))
        : prev.unlockedBadges || [];

      const bonusXP = passed ? 200 : 30;

      const attemptRecord: ExamAttemptRecord = {
        date: new Date().toISOString(),
        score: scorePercent,
        passed,
        totalQuestions: 12,
        correctCount: Math.round((scorePercent / 100) * 12),
        level
      };

      const updated: UserProgress = {
        ...prev,
        examScore: highestScore,
        examPassed: Boolean(isA1Pass || updatedBadges.includes('b_cert_a1')),
        examPassedDate: (isA1Pass || passed) ? (prev.examPassedDate || currentDate) : prev.examPassedDate,
        levelScores: {
          ...(prev.levelScores || {}),
          [level]: Math.max(scorePercent, prev.levelScores?.[level] || 0)
        },
        examHistory: [...(prev.examHistory || []).slice(-29), attemptRecord],
        unlockedBadges: updatedBadges,
        xp: (prev.xp || 0) + bonusXP,
        totalExercisesDone: (prev.totalExercisesDone || 0) + 12,
        timeSpentMinutes: (prev.timeSpentMinutes || 0) + 20,
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  const resetProgress = useCallback(() => {
    saveProgress(defaultProgress);
  }, [saveProgress]);

  const forceSyncToCloud = useCallback(async () => {
    if (!currentUser) return;
    setIsSyncing(true);
    setSyncStatus('syncing');
    try {
      const res = await syncStudentProgressToDatabase(currentUser, progress, courseLanguage);
      if (res.success) {
        setSyncStatus('synced');
        setLastSyncedAt(new Date());
      } else {
        setSyncStatus('local_only');
      }
    } catch (e) {
      setSyncStatus('error');
    } finally {
      setIsSyncing(false);
    }
  }, [currentUser, progress, courseLanguage]);

  return {
    progress,
    isLoaded,
    isSyncing,
    syncStatus,
    lastSyncedAt,
    addXP,
    markLessonComplete,
    markWordMastered,
    updateWordSRS,
    recordExamResult,
    resetProgress,
    forceSyncToCloud,
  };
}
