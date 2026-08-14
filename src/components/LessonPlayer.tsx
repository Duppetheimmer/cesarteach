import React, { useState } from 'react';
import { LessonStep, QuizQuestion } from '../types';
import { WordOrderExercise } from './WordOrderExercise';
import { PronunciationPractice } from './PronunciationPractice';
import { RolePlaySimulator } from './RolePlaySimulator';
import { playSpeech } from '../utils/speech';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, X, Lightbulb, RefreshCw, Volume2, Sparkles, Trophy, Heart, MessageSquare, Zap } from 'lucide-react';

interface QuizItem extends QuizQuestion {
  isRetry?: boolean;
}

interface LessonPlayerProps {
  lesson: LessonStep;
  onComplete: () => void;
  onClose: () => void;
}

export function LessonPlayer({ lesson, onComplete, onClose }: LessonPlayerProps) {
  const [step, setStep] = useState<'content' | 'roleplay' | 'quiz' | 'success'>('content');
  const [quizQueue, setQuizQueue] = useState<QuizItem[]>(() => lesson.quiz.map(q => ({ ...q })));
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizStatus, setQuizStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.9);

  const isSpanishCourse = lesson.id.startsWith('es_');
  const courseLang = isSpanishCourse ? 'es' : 'en';
  const currentQuestion = quizQueue[currentQuizIndex];

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizQueue.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setQuizStatus('idle');
    } else {
      if (lesson.dialogue && lesson.dialogue.length > 0) {
        setStep('roleplay');
      } else {
        setStep('success');
      }
    }
  };

  const handleOptionSelect = (option: string) => {
    if (quizStatus !== 'idle' || !currentQuestion) return;
    
    setSelectedOption(option);
    const isCorrect = option === currentQuestion.correctAnswer;
    setQuizStatus(isCorrect ? 'correct' : 'incorrect');

    if (!isCorrect) {
      setQuizQueue(prev => [...prev, { ...currentQuestion, isRetry: true }]);
    }
  };

  const speakText = (text: string) => {
    playSpeech(text, {
      courseLanguage: courseLang,
      rate: speechSpeed
    });
  };

  const progressPercent = step === 'content' 
    ? 20 
    : step === 'quiz' 
      ? 20 + ((currentQuizIndex + 1) / quizQueue.length) * 55 
      : step === 'roleplay' 
        ? 88 
        : 100;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50/90 via-sky-50/80 to-emerald-50/90 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 z-50 flex flex-col backdrop-blur-md overflow-hidden">
      {/* Top Header */}
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-6 py-4 border-b border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between gap-4">
        <button 
          onClick={onClose}
          className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-all text-zinc-600 dark:text-zinc-400"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress bar */}
        <div className="flex-1 max-w-md mx-auto">
          <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 rounded-full shadow-sm"
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Speed Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSpeechSpeed(s => s === 0.9 ? 0.7 : 0.9)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all border ${
              speechSpeed === 0.7 
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300' 
                : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
            }`}
          >
            {isSpanishCourse 
              ? (speechSpeed === 0.7 ? '🐢 Slow 0.7x' : '⚡ Normal 0.9x')
              : (speechSpeed === 0.7 ? '🐢 Lento 0.7x' : '⚡ Normal 0.9x')}
          </button>
          <div className="hidden sm:flex items-center gap-1 bg-amber-100 dark:bg-amber-950/60 px-3 py-1 rounded-full text-amber-700 dark:text-amber-300 text-xs font-bold">
            <Heart className="w-4 h-4 fill-amber-500 text-amber-500" /> {isSpanishCourse ? 'Day' : 'Día'} {lesson.day}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col max-w-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 'content' && (
            <motion.div 
              key="content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold mb-3">
                  <Sparkles className="w-3.5 h-3.5" /> {isSpanishCourse ? 'Step-by-Step Guided Lesson' : 'Lección Guiada Paso a Paso'}
                </div>

                <div className="flex items-center justify-between gap-3 mb-2">
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100">
                    {lesson.title}
                  </h3>
                  <button
                    onClick={() => speakText(lesson.content)}
                    title={isSpanishCourse ? 'Listen to text' : 'Escuchar texto completo'}
                    className="p-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 transition-all shrink-0"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-zinc-500 dark:text-zinc-400 font-medium mb-6 text-sm">
                  {lesson.description}
                </p>

                <div className="bg-indigo-50/50 dark:bg-zinc-800/40 border border-indigo-100 dark:border-zinc-700/50 rounded-2xl p-6 text-zinc-800 dark:text-zinc-200 text-base leading-relaxed whitespace-pre-wrap font-sans">
                  {lesson.content}
                </div>
              </div>
              
              <button
                onClick={() => setStep('quiz')}
                className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
              >
                {isSpanishCourse ? 'Start Questions & Exercises' : '¡Entendido! Comenzar Preguntas'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 'quiz' && currentQuestion && (
            <motion.div 
              key={`quiz-${currentQuizIndex}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {isSpanishCourse ? 'Question' : 'Pregunta'} {currentQuizIndex + 1} {isSpanishCourse ? 'of' : 'de'} {quizQueue.length}
                  </span>
                  {currentQuestion.isRetry && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                      <RefreshCw className="w-3.5 h-3.5" />
                      {isSpanishCourse ? 'Review with Tip' : 'Repaso con Tip'}
                    </span>
                  )}
                </div>

                {currentQuestion.isRetry && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-300/80 dark:border-amber-800 flex items-start gap-3 shadow-sm"
                  >
                    <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                        {isSpanishCourse ? 'Tip to solve it again:' : 'Tip para resolverla de nuevo:'}
                      </p>
                      <p className="text-sm text-amber-950 dark:text-amber-200 font-semibold">
                        {currentQuestion.hint || currentQuestion.explanation}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Question Type: Word Order */}
                {currentQuestion.type === 'word-order' ? (
                  <WordOrderExercise
                    correctSentence={currentQuestion.targetText || currentQuestion.correctAnswer}
                    explanation={currentQuestion.explanation}
                    hint={currentQuestion.hint}
                    courseLanguage={courseLang}
                    onCorrect={() => setQuizStatus('correct')}
                    onIncorrect={() => {
                      setQuizStatus('incorrect');
                      setQuizQueue(prev => [...prev, { ...currentQuestion, isRetry: true }]);
                    }}
                  />
                ) : currentQuestion.type === 'speaking' ? (
                  <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100">
                      {currentQuestion.question}
                    </h3>
                    <PronunciationPractice
                      targetPhrase={currentQuestion.targetText || currentQuestion.correctAnswer}
                      courseLanguage={courseLang}
                      onSuccess={() => setQuizStatus('correct')}
                    />
                  </div>
                ) : (
                  /* Standard Multiple Choice */
                  <>
                    <div className="flex items-start justify-between gap-3 mb-6">
                      <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-tight">
                        {currentQuestion.question}
                      </h3>
                      <button
                        onClick={() => speakText(currentQuestion.question)}
                        title={isSpanishCourse ? 'Listen to question' : 'Escuchar pregunta'}
                        className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 transition-colors shrink-0"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === option;
                        const isCorrectOption = option === currentQuestion.correctAnswer;
                        
                        let btnClass = "flex-1 text-left p-4 rounded-2xl border-2 font-bold text-base transition-all ";
                        
                        if (quizStatus === 'idle') {
                          btnClass += "border-zinc-200 dark:border-zinc-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-zinc-50/50 dark:bg-zinc-800/50 text-zinc-800 dark:text-zinc-200 hover:bg-indigo-50/40";
                        } else if (isSelected && quizStatus === 'correct') {
                          btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 shadow-md shadow-emerald-500/10";
                        } else if (isSelected && quizStatus === 'incorrect') {
                          btnClass += "border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300";
                        } else if (!isSelected && isCorrectOption && quizStatus === 'incorrect') {
                          btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300";
                        } else {
                          btnClass += "border-zinc-200 dark:border-zinc-800 bg-zinc-50/20 dark:bg-zinc-900/20 opacity-40 text-zinc-800 dark:text-zinc-200";
                        }

                        return (
                          <div key={idx} className="flex items-center gap-2.5 w-full">
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleOptionSelect(option)}
                              disabled={quizStatus !== 'idle'}
                              className={btnClass}
                            >
                              <span>{option}</span>
                            </motion.button>
                            <button
                              type="button"
                              onClick={() => speakText(option)}
                              title={isSpanishCourse ? 'Listen to option' : 'Escuchar opción'}
                              className="p-4 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-indigo-50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-indigo-600 transition-colors shrink-0"
                            >
                              <Volume2 className="w-5 h-5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                
                {quizStatus !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 p-5 rounded-2xl ${
                      quizStatus === 'correct' 
                        ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800' 
                        : 'bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200 border border-rose-300 dark:border-rose-800'
                    }`}
                  >
                    <p className="font-extrabold text-base mb-1 flex items-center gap-1.5">
                      {quizStatus === 'correct' 
                        ? (isSpanishCourse ? '🎉 Excellent answer!' : '🎉 ¡Excelente respuesta!')
                        : (isSpanishCourse ? '❌ Incorrect answer' : '❌ Respuesta incorrecta')}
                    </p>
                    <p className="text-sm font-medium">{currentQuestion.explanation}</p>
                    {quizStatus === 'incorrect' && (
                      <p className="mt-2 text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1">
                        <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                        {isSpanishCourse 
                          ? "Don't worry! We reordered it at the end with a helpful tip." 
                          : "No te preocupes. La reordenamos al final con un tip de ayuda."}
                      </p>
                    )}
                  </motion.div>
                )}
              </div>
              
              <button
                onClick={handleNextQuiz}
                disabled={quizStatus === 'idle'}
                className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-95"
              >
                {currentQuizIndex < quizQueue.length - 1 
                  ? (isSpanishCourse ? 'Next Question' : 'Siguiente Pregunta') 
                  : (lesson.dialogue && lesson.dialogue.length > 0 
                      ? (isSpanishCourse ? 'Continue to Audio Dialogue Practice' : 'Continuar al Diálogo con Audio') 
                      : (isSpanishCourse ? 'Finish and Save' : 'Finalizar y Guardar'))}
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {step === 'roleplay' && lesson.dialogue && (
            <motion.div
              key="roleplay"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <RolePlaySimulator
                dialogueLines={lesson.dialogue}
                courseLanguage={courseLang}
                onComplete={() => setStep('success')}
              />
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl"
            >
              <div className="w-28 h-28 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30 text-white">
                <Trophy className="w-14 h-14" />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-2 text-zinc-900 dark:text-zinc-100">
                {isSpanishCourse ? 'Lesson Completed!' : '¡Lección Completada!'}
              </h2>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-extrabold text-sm mb-6">
                <Zap className="w-4 h-4 fill-amber-500" /> {isSpanishCourse ? '+60 XP Earned' : '+60 XP Ganados'}
              </div>

              <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm font-medium text-base">
                {isSpanishCourse 
                  ? 'You learned the key concepts and passed all questions correctly. Keep up the fantastic momentum!'
                  : 'Has aprendido los conceptos clave y superado todas las preguntas correctamente. ¡Sigue con este ritmo fantástico!'}
              </p>
              
              <button
                onClick={() => {
                  onComplete();
                  onClose();
                }}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl py-4 font-bold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center transition-all max-w-md transform hover:scale-[1.01]"
              >
                {isSpanishCourse ? 'Continue My Journey' : 'Continuar Mi Camino'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

