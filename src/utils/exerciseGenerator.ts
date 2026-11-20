import { LessonStep, QuizQuestion } from '../types';
import { shuffleOptionsList } from './shuffleOptions';

/**
 * Extracts clean target-language / native-translation pairs from a lesson's
 * dialogue lines and bullet points (`• Target — Translation` or `• Target (Translation)`),
 * and generates additional high-retention exercises (Context Cloze, Magnetic Word-Order,
 * and Listening/Conversational Response) that reinforce the exact lesson topic.
 */
interface ExtractedPair {
  target: string;
  translation: string;
  source: 'dialogue' | 'content';
}

function cleanMarkdown(raw: string): string {
  return raw
    .replace(/\*\*/g, '')
    .replace(/^[•\-🎯💡⚠️❌✅0-9.]+\s*/, '')
    .trim();
}

export function extractLessonPairs(lesson: LessonStep): ExtractedPair[] {
  const pairs: ExtractedPair[] = [];
  const isSpanishCourse = lesson.id.startsWith('es_');

  // 1. From dialogue lines (highest quality real-world sentences)
  if (lesson.dialogue && lesson.dialogue.length > 0) {
    for (const line of lesson.dialogue) {
      const target = (isSpanishCourse ? line.textEs : line.textEn).trim();
      const translation = (isSpanishCourse ? line.textEn : line.textEs).trim();
      if (target.length >= 8 && translation.length >= 4 && target.split(/\s+/).length >= 3) {
        pairs.push({
          target,
          translation,
          source: 'dialogue'
        });
      }
    }
  }

  // 2. From bullet lines in lesson.content
  const lines = lesson.content.split('\n');
  for (const rawLine of lines) {
    const trimmed = rawLine.trim();
    if (!trimmed.startsWith('•') && !trimmed.startsWith('-')) continue;
    const cleaned = cleanMarkdown(trimmed);

    // Match formats like: "I am a teacher. — Yo soy profesor." or "Hello = Hola" or "Phrase (Translation)"
    const dashMatch = cleaned.split(/\s+[—–=]\s+/);
    if (dashMatch.length === 2) {
      const left = dashMatch[0].replace(/^["']|["']$/g, '').trim();
      const right = dashMatch[1].replace(/^["']|["']$/g, '').replace(/\([^)]*\)/g, '').trim();
      if (left.length >= 6 && right.length >= 4 && left.split(/\s+/).length >= 3) {
        pairs.push({
          target: left,
          translation: right,
          source: 'content'
        });
      }
      continue;
    }

    const parenMatch = cleaned.match(/^([^(]+)\(([^)]+)\)$/);
    if (parenMatch) {
      const left = parenMatch[1].replace(/^["']|["']$/g, '').trim();
      const right = parenMatch[2].replace(/^["']|["']$/g, '').trim();
      if (left.length >= 6 && right.length >= 4 && left.split(/\s+/).length >= 3) {
        pairs.push({
          target: left,
          translation: right,
          source: 'content'
        });
      }
    }
  }

  return pairs;
}

const ENGLISH_FALLBACK_DISTRACTORS = [
  'always',
  'never',
  'yesterday',
  'tomorrow',
  'quickly',
  'together',
  'already',
  'usually',
  'because',
  'without',
  'between',
  'through'
];

const SPANISH_FALLBACK_DISTRACTORS = [
  'siempre',
  'nunca',
  'mañana',
  'también',
  'después',
  'todavía',
  'aunque',
  'durante',
  'consigo',
  'bastante',
  'entonces',
  'además'
];

/**
 * Generates up to 3 additional varied exercises for a lesson so every lesson has
 * 6-7 total interactive cards covering:
 * - Multiple-choice concept checks
 * - Context Cloze (complete the missing word in a real sentence)
 * - Magnetic Sentence Builder (word-order)
 * - Conversational / Meaning comprehension
 */
export function buildEnrichedLessonQuiz(lesson: LessonStep): QuizQuestion[] {
  const isSpanishCourse = lesson.id.startsWith('es_');
  const baseQuiz: QuizQuestion[] = lesson.quiz.map(q => ({ ...q }));
  const pairs = extractLessonPairs(lesson);

  if (pairs.length === 0) {
    return baseQuiz;
  }

  const extraQuestions: QuizQuestion[] = [];
  const existingTargets = new Set(
    baseQuiz.map(q => (q.targetText || q.correctAnswer || '').trim().toLowerCase())
  );

  // Collect candidate words from all pairs in this lesson for smart distractors
  const lessonWordsPool = Array.from(
    new Set(
      pairs
        .flatMap(p =>
          p.target
            .replace(/[¿?¡!.,;:"']/g, '')
            .split(/\s+/)
            .map(w => w.trim())
        )
        .filter(w => w.length >= 3)
    )
  );

  // 1. Add a Context Cloze (Complete the missing word in context) card
  const clozeCandidate = pairs.find(p => {
    const words = p.target.replace(/[¿?¡!.,;:"']/g, '').split(/\s+/);
    return words.some(w => w.length >= 4) && !existingTargets.has(p.target.toLowerCase());
  });

  if (clozeCandidate) {
    const rawWords = clozeCandidate.target.split(/\s+/);
    // Pick an important word (prefer a word >= 4 chars not at index 0 if possible)
    let targetWordIdx = rawWords.findIndex(
      (w, idx) => idx > 0 && w.replace(/[¿?¡!.,;:"']/g, '').length >= 4
    );
    if (targetWordIdx === -1) {
      targetWordIdx = rawWords.findIndex(w => w.replace(/[¿?¡!.,;:"']/g, '').length >= 3);
    }

    if (targetWordIdx !== -1) {
      const tokenWithPunct = rawWords[targetWordIdx];
      const cleanWord = tokenWithPunct.replace(/[¿?¡!.,;:"']/g, '');
      const blankedToken = tokenWithPunct.replace(cleanWord, '_____');
      const blankedSentence = rawWords
        .map((w, idx) => (idx === targetWordIdx ? blankedToken : w))
        .join(' ');

      const fallbackPool = isSpanishCourse
        ? SPANISH_FALLBACK_DISTRACTORS
        : ENGLISH_FALLBACK_DISTRACTORS;

      const distractors = [
        ...lessonWordsPool.filter(w => w.toLowerCase() !== cleanWord.toLowerCase()),
        ...fallbackPool.filter(w => w.toLowerCase() !== cleanWord.toLowerCase())
      ].slice(0, 3);

      const rawOptions = [cleanWord, ...distractors];
      if (rawOptions.length === 4) {
        extraQuestions.push({
          id: `${lesson.id}_extra_cloze`,
          type: 'multiple-choice',
          question: isSpanishCourse
            ? `Complete the Spanish sentence ("${clozeCandidate.translation}"):\n${blankedSentence}`
            : `Completa la oración en inglés ("${clozeCandidate.translation}"):\n${blankedSentence}`,
          options: shuffleOptionsList(rawOptions, cleanWord, 0),
          correctAnswer: cleanWord,
          hint: isSpanishCourse
            ? `Full sentence meaning: "${clozeCandidate.translation}"`
            : `Significado de la frase completa: "${clozeCandidate.translation}"`,
          explanation: isSpanishCourse
            ? `Complete sentence: "${clozeCandidate.target}" (${clozeCandidate.translation}).`
            : `Oración completa: "${clozeCandidate.target}" (${clozeCandidate.translation}).`
        });
        existingTargets.add(clozeCandidate.target.toLowerCase());
      }
    }
  }

  // 2. Add a Magnetic Sentence Builder (word-order) card if the lesson has fewer than 2 word-order cards
  const currentWordOrderCount = baseQuiz.filter(q => q.type === 'word-order').length;
  if (currentWordOrderCount < 2) {
    const orderCandidate = pairs.find(p => {
      const wordCount = p.target.trim().split(/\s+/).length;
      return (
        wordCount >= 4 &&
        wordCount <= 9 &&
        !existingTargets.has(p.target.trim().toLowerCase())
      );
    });

    if (orderCandidate) {
      const cleanTarget = orderCandidate.target.replace(/\s+/g, ' ').trim();
      extraQuestions.push({
        id: `${lesson.id}_extra_order`,
        type: 'word-order',
        question: isSpanishCourse
          ? `Build this sentence in Spanish: "${orderCandidate.translation}"`
          : `Construye esta oración en inglés: "${orderCandidate.translation}"`,
        options: [],
        correctAnswer: cleanTarget,
        targetText: cleanTarget,
        hint: isSpanishCourse
          ? `Starts with "${cleanTarget.split(' ')[0]}"`
          : `Empieza con "${cleanTarget.split(' ')[0]}"`,
        explanation: isSpanishCourse
          ? `Correct Spanish word order: "${cleanTarget}" (${orderCandidate.translation}).`
          : `Orden correcto en inglés: "${cleanTarget}" (${orderCandidate.translation}).`
      });
      existingTargets.add(cleanTarget.toLowerCase());
    }
  }

  // 3. Add a Meaning / Dialogue Comprehension card if pairs has another distinct item
  const comprehensionCandidate = pairs.find(
    p => !existingTargets.has(p.target.trim().toLowerCase())
  );
  if (comprehensionCandidate && pairs.length >= 3) {
    const otherTranslations = pairs
      .filter(p => p.translation !== comprehensionCandidate.translation)
      .map(p => p.translation);

    const genericTranslations = isSpanishCourse
      ? [
          'Could you repeat that more slowly, please?',
          'I need to check my schedule tomorrow morning.',
          'Where is the nearest metro station from here?'
        ]
      : [
          '¿Podrías repetir eso más despacio, por favor?',
          'Necesito revisar mi horario mañana por la mañana.',
          '¿Dónde está la estación de tren más cercana?'
        ];

    const distractorMeanings = Array.from(
      new Set([...otherTranslations, ...genericTranslations])
    )
      .filter(t => t.toLowerCase() !== comprehensionCandidate.translation.toLowerCase())
      .slice(0, 3);

    if (distractorMeanings.length === 3) {
      const rawOptions = [comprehensionCandidate.translation, ...distractorMeanings];
      extraQuestions.push({
        id: `${lesson.id}_extra_comprehension`,
        type: 'multiple-choice',
        question: isSpanishCourse
          ? `What is the exact meaning of: "${comprehensionCandidate.target}"?`
          : `¿Cuál es el significado exacto de: "${comprehensionCandidate.target}"?`,
        options: shuffleOptionsList(rawOptions, comprehensionCandidate.translation, 1),
        correctAnswer: comprehensionCandidate.translation,
        hint: lesson.grammarFocus || lesson.strategyTip,
        explanation: isSpanishCourse
          ? `"${comprehensionCandidate.target}" means "${comprehensionCandidate.translation}".`
          : `"${comprehensionCandidate.target}" significa "${comprehensionCandidate.translation}".`
      });
    }
  }

  return [...baseQuiz, ...extraQuestions];
}
