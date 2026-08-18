import { useEffect, useState, useCallback, useRef } from 'react';
import { UserProgress, Badge, UserProfile } from '../types';
import { 
  fetchStudentProgressFromDatabase, 
  syncStudentProgressToDatabase, 
  getLocalStudents, 
  getSupabaseClient 
} from '../lib/supabase';

const DEFAULT_PROGRESS_KEY = 'lingostep_progress_v3';

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
  lessonDates: {},
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

  // Merge remote and local progress smartly
  const mergeProgress = (local: UserProgress, remote: UserProgress): UserProgress => {
    const unionLessons = Array.from(new Set([...(local.completedLessons || []), ...(remote.completedLessons || [])]));
    const unionWords = Array.from(new Set([...(local.masteredWords || []), ...(remote.masteredWords || [])]));
    const unionBadges = Array.from(new Set([...(local.unlockedBadges || []), ...(remote.unlockedBadges || [])]));
    
    return {
      completedLessons: unionLessons,
      masteredWords: unionWords,
      examScore: Math.max(local.examScore || 0, remote.examScore || 0) || undefined,
      examPassed: Boolean(local.examPassed || remote.examPassed),
      examPassedDate: remote.examPassedDate || local.examPassedDate,
      xp: Math.max(local.xp || 0, remote.xp || 0),
      streakDays: Math.max(local.streakDays || 1, remote.streakDays || 1),
      lastStudyDate: remote.lastStudyDate || local.lastStudyDate || new Date().toISOString().split('T')[0],
      unlockedBadges: unionBadges,
      wordSRSStatus: { ...(local.wordSRSStatus || {}), ...(remote.wordSRSStatus || {}) },
      lessonDates: { ...(local.lessonDates || {}), ...(remote.lessonDates || {}) },
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

      // 1. Check user-specific localStorage first
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          initialProg = { ...defaultProgress, ...parsed };
        } catch (e) {
          console.warn('Failed to parse local progress', e);
        }
      } else if (currentUser) {
        // Check local student registry
        const localStudents = getLocalStudents();
        const found = localStudents.find(s => s.profile.id === currentUser.id || s.profile.email.toLowerCase() === currentUser.email.toLowerCase());
        if (found && found.progress) {
          initialProg = { ...defaultProgress, ...found.progress };
        }
      }

      // Calculate streak
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
        setIsLoaded(true);
      }

      // 2. Fetch latest data from Supabase database if student is logged in
      if (currentUser?.id) {
        try {
          setSyncStatus('syncing');
          const remoteProgress = await fetchStudentProgressFromDatabase(currentUser.id);
          if (remoteProgress && !isCancelled) {
            const merged = mergeProgress(initialProg, remoteProgress);
            setProgress(merged);
            localStorage.setItem(storageKey, JSON.stringify(merged));
            setSyncStatus('synced');
            setLastSyncedAt(new Date());
          } else if (!isCancelled) {
            // First time in Supabase - upload initial progress
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

  const saveProgress = useCallback((newProgress: UserProgress) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const withUpdatedDate = {
      ...newProgress,
      lastStudyDate: todayStr,
    };
    const badges = evaluateBadges(withUpdatedDate);
    const finalProg: UserProgress = { ...withUpdatedDate, unlockedBadges: badges };
    
    // 1. Instant local state update
    setProgress(finalProg);
    const userKey = activeUserRef.current ? `lingostep_progress_${activeUserRef.current.id}` : DEFAULT_PROGRESS_KEY;
    localStorage.setItem(userKey, JSON.stringify(finalProg));

    // 2. Direct background sync to Supabase database
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
    }
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
      };
      saveProgress(updated);
      return updated;
    });
  }, [saveProgress]);

  const recordExamResult = useCallback((scorePercent: number, passed: boolean) => {
    setProgress((prev) => {
      const isNewPass = passed || prev.examPassed;
      const highestScore = Math.max(scorePercent, prev.examScore || 0);
      const currentDate = new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const bonusXP = passed ? 150 : 30;

      const updated: UserProgress = {
        ...prev,
        examScore: highestScore,
        examPassed: isNewPass,
        examPassedDate: isNewPass ? (prev.examPassedDate || currentDate) : prev.examPassedDate,
        xp: (prev.xp || 0) + bonusXP,
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

