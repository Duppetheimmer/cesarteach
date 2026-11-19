/**
 * Shuffles an array of strings using Fisher-Yates.
 * If `correctAnswer` and `avoidIndex` are provided, ensures the correct answer
 * does not land on `avoidIndex` (e.g., avoiding always being index 0 or repeating the previous question's slot).
 */
export function shuffleOptionsList(
  options: string[],
  correctAnswer?: string,
  avoidIndex?: number
): string[] {
  if (!options || options.length <= 1) return options ? [...options] : [];

  const copy = [...options];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  if (
    correctAnswer &&
    typeof avoidIndex === 'number' &&
    avoidIndex >= 0 &&
    avoidIndex < copy.length &&
    copy[avoidIndex] === correctAnswer &&
    copy.length > 1
  ) {
    const swapIdx = (avoidIndex + 1 + Math.floor(Math.random() * (copy.length - 1))) % copy.length;
    [copy[avoidIndex], copy[swapIdx]] = [copy[swapIdx], copy[avoidIndex]];
  }

  return copy;
}

/**
 * Takes a list of quiz/exam questions and shuffles each question's `options` array
 * while guaranteeing that consecutive questions never place the correct answer in the same position
 * and that the first question does not default to index 0 (Option A).
 */
export function randomizeQuestionsOptions<
  T extends { options: string[]; correctAnswer?: string; correct?: string }
>(questions: T[]): T[] {
  let lastCorrectIdx = 0; // Start by avoiding index 0 on the very first question so it's not A!

  return questions.map(q => {
    if (!q.options || q.options.length <= 1) return { ...q };
    const targetCorrect = q.correctAnswer ?? q.correct;
    const shuffledOpts = shuffleOptionsList(q.options, targetCorrect, lastCorrectIdx);
    const newCorrectIdx = targetCorrect ? shuffledOpts.indexOf(targetCorrect) : -1;
    if (newCorrectIdx !== -1) {
      lastCorrectIdx = newCorrectIdx;
    }
    return {
      ...q,
      options: shuffledOpts
    };
  });
}
