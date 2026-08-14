export type SectionTab = 'home' | 'a1-inicial' | 'a1-intermedio' | 'fluency' | 'flashcards' | 'exam' | 'ai-tutor' | 'ai-tools' | 'teacher-dashboard';

export type UserRole = 'student' | 'teacher';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  targetLanguage?: 'en' | 'es';
  avatarUrl?: string;
  createdAt: string;
  lastActiveAt: string;
  notesFromTeacher?: string;
  studentIdNumber?: string;
}

export type QuestionType = 'multiple-choice' | 'word-order' | 'listening' | 'speaking' | 'fill-blank';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  hint?: string;
  audioPrompt?: string;
  type?: QuestionType;
  wordTiles?: string[]; // Shuffle tiles for word-order
  targetText?: string; // English phrase for speech recognition or listening
}

export interface DialogueLine {
  speaker: string;
  textEn: string;
  textEs: string;
}

export interface LessonStep {
  id: string;
  day: number;
  title: string;
  description: string;
  content: string;
  category?: string;
  quiz: QuizQuestion[];
  dialogue?: DialogueLine[];
}

export interface VocabWord {
  id: string;
  word: string;
  translation: string;
  example: string;
  category: string;
  phonetic?: string;
}

export interface ExamQuestion extends QuizQuestion {
  sectionTitle: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  reqType: 'lessons' | 'words' | 'streak' | 'exam' | 'xp';
  reqValue: number;
}

export interface ExamAttemptRecord {
  date: string;
  score: number;
  passed: boolean;
  totalQuestions: number;
  correctCount: number;
}

export interface UserProgress {
  completedLessons: string[]; // Lesson IDs
  masteredWords: string[]; // Word IDs
  examScore?: number; // Highest score %
  examPassed?: boolean;
  examPassedDate?: string;
  xp: number;
  streakDays: number;
  lastStudyDate?: string;
  unlockedBadges: string[];
  wordSRSStatus?: Record<string, 'easy' | 'good' | 'hard'>;
  lessonDates?: Record<string, string>; // lessonId -> ISO date completed
  examHistory?: ExamAttemptRecord[];
  totalExercisesDone?: number;
  timeSpentMinutes?: number;
}

export interface StudentRecord {
  profile: UserProfile;
  progress: UserProgress;
  courseLanguage: 'en' | 'es';
}

