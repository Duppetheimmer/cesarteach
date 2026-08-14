import React, { useState } from 'react';
import { QuizQuestion, UserProgress, SectionTab, UserProfile } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Award, CheckCircle2, ChevronRight, Lock, RefreshCw, Sparkles, Trophy, Volume2, ShieldCheck, Download, Share2, HelpCircle, AlertTriangle, BookOpen, Layers, MessageSquare, ArrowRight } from 'lucide-react';
import { playSpeech } from '../utils/speech';

interface FinalExamViewProps {
  questions: QuizQuestion[];
  requiredLessonIds: string[];
  progress: UserProgress;
  onExamComplete: (scorePercent: number, passed: boolean) => void;
  onNavigate?: (tab: SectionTab) => void;
  a1InicialCount?: number;
  a1IntermedioCount?: number;
  fluencyCount?: number;
  courseLanguage?: 'en' | 'es';
  currentUser?: UserProfile | null;
}

export function FinalExamView({
  questions,
  requiredLessonIds,
  progress,
  onExamComplete,
  onNavigate,
  courseLanguage = 'es',
  currentUser
}: FinalExamViewProps) {
  const [userName, setUserName] = useState<string>(
    currentUser?.fullName || (courseLanguage === 'es' ? 'CesarTeach Student' : 'Estudiante de CesarTeach')
  );
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [examState, setExamState] = useState<'intro' | 'taking' | 'result'>('intro');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const totalRequired = requiredLessonIds.length;
  const completedRequiredCount = requiredLessonIds.filter(id => progress.completedLessons.includes(id)).length;
  const isFullyUnlocked = completedRequiredCount >= totalRequired || !!progress.examPassed;
  const completionPercent = totalRequired > 0 ? Math.round((completedRequiredCount / totalRequired) * 100) : 0;

  const currentQuestion = questions[currentIdx];

  const handleStartExam = () => {
    if (!isFullyUnlocked) return;
    setCurrentIdx(0);
    setUserAnswers({});
    setSelectedOption(null);
    setExamState('taking');
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setUserAnswers(prev => ({ ...prev, [currentIdx]: option }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(userAnswers[currentIdx + 1] || null);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });
      const score = Math.round((correctCount / questions.length) * 100);
      const passed = score >= 80;
      onExamComplete(score, passed);
      setExamState('result');
    }
  };

  const speakText = (text: string) => {
    playSpeech(text, {
      courseLanguage,
      rate: 0.9
    });
  };

  // Calculate score for display
  let scoreCount = 0;
  questions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctAnswer) {
      scoreCount++;
    }
  });
  const scorePercent = Math.round((scoreCount / questions.length) * 100);
  const isPassed = scorePercent >= 80 || progress.examPassed;

  return (
    <div className="max-w-3xl mx-auto pb-24 px-4">
      <AnimatePresence mode="wait">
        {examState === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white dark:bg-zinc-900 border-2 border-indigo-100 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl shadow-indigo-500/5 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-orange-500/30 text-white">
              <Trophy className="w-12 h-12" />
            </div>

            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 fill-current" /> Evaluación Global A1
            </span>

            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-3">
              Examen de Certificación Nivel A1
            </h1>

            <p className="text-zinc-600 dark:text-zinc-400 font-medium text-base max-w-lg mx-auto mb-8">
              Evalúa tus conocimientos de las 3 secciones (A1 Inicial, A1 Intermedio y Fluidez) para certificar oficialmente tu dominio del Marco Común Europeo A1.
            </p>

            {/* Unlock Status Card */}
            <div className={`p-6 rounded-3xl mb-8 border-2 text-left ${
              isFullyUnlocked 
                ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800' 
                : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-300 dark:border-rose-900/80'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-sm uppercase tracking-wider flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                  {isFullyUnlocked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                  ) : (
                    <Lock className="w-5 h-5 text-rose-500" />
                  )}
                  {isFullyUnlocked ? '¡Examen Desbloqueado y Listo!' : 'Requisito Obligatorio de Desbloqueo'}
                </span>
                <span className={`text-xs font-black px-3 py-1 rounded-full shadow-sm ${
                  isFullyUnlocked 
                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200' 
                    : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                }`}>
                  {completedRequiredCount} / {totalRequired} Lecciones
                </span>
              </div>

              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
                {isFullyUnlocked 
                  ? '¡Has completado todas las lecciones de los 3 módulos! Estás 100% preparado para obtener tu certificado oficial A1.'
                  : 'Debes completar todas las lecciones de A1 Inicial, A1 Intermedio y Fluidez Conversacional antes de rendir este examen.'}
              </p>

              <div className="h-3 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden p-0.5 mb-5">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isFullyUnlocked ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                  style={{ width: `${completionPercent}%` }}
                />
              </div>

              {/* Quick Navigation to Incomplete Modules */}
              {onNavigate && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-zinc-200/80 dark:border-zinc-800">
                  <button
                    onClick={() => onNavigate('a1-inicial')}
                    className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-sky-200 dark:border-zinc-800 hover:border-sky-400 transition-all text-left flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-sky-500" />
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">1. A1 Inicial</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-sky-500 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigate('a1-intermedio')}
                    className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-purple-200 dark:border-zinc-800 hover:border-purple-400 transition-all text-left flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-purple-500" />
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">2. A1 Intermedio</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-500 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onNavigate('fluency')}
                    className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-zinc-800 hover:border-emerald-400 transition-all text-left flex items-center justify-between group shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">3. Fluidez</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}
            </div>

            {/* Previous Pass Status */}
            {progress.examPassed && (
              <div className="mb-8 p-4 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-2xl flex items-center justify-between text-left">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div>
                    <p className="text-sm font-black text-indigo-900 dark:text-indigo-200">¡Ya estás Certificado en A1!</p>
                    <p className="text-xs text-indigo-700 dark:text-indigo-400 font-medium">Puntuación máxima: {progress.examScore}% • Aprobado el {progress.examPassedDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => setExamState('result')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-indigo-700 transition-all shrink-0"
                >
                  Ver Certificado
                </button>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {isFullyUnlocked ? (
                <button
                  onClick={handleStartExam}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-105"
                >
                  {progress.examPassed ? 'Volver a Realizar Examen' : 'Comenzar Examen A1 (15 Preguntas)'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  disabled
                  className="w-full sm:w-auto px-8 py-4 bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 font-extrabold text-base rounded-2xl cursor-not-allowed border-2 border-zinc-300 dark:border-zinc-700/60 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5 text-zinc-400" />
                  <span>Examen Bloqueado (Completa los 3 Módulos)</span>
                </button>
              )}
            </div>
          </motion.div>
        )}

        {examState === 'taking' && currentQuestion && (
          <motion.div
            key={`question-${currentIdx}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-zinc-900 border-2 border-indigo-100 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-indigo-500/5"
          >
            {/* Header / Progress */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Pregunta {currentIdx + 1} de {questions.length}
              </span>

              <div className="w-32 h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <div className="flex items-start justify-between gap-3 mb-8">
              <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-zinc-100 leading-snug">
                {currentQuestion.question}
              </h3>
              <button
                onClick={() => speakText(currentQuestion.question)}
                title="Escuchar audio de la pregunta"
                className="p-2.5 rounded-xl bg-amber-50 dark:bg-zinc-800 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-colors shrink-0"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Options list */}
            <div className="space-y-3.5 mb-8">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === option;

                return (
                  <div key={idx} className="flex items-center gap-2.5 w-full">
                    <button
                      type="button"
                      onClick={() => handleSelectOption(option)}
                      className={`flex-1 text-left p-4 md:p-5 rounded-2xl border-2 font-bold text-base transition-all ${
                        isSelected 
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 shadow-md ring-2 ring-amber-300 dark:ring-amber-800' 
                          : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 text-zinc-800 dark:text-zinc-200 hover:border-amber-300 dark:hover:border-amber-700'
                      }`}
                    >
                      <span>{option}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => speakText(option)}
                      title="Escuchar opción"
                      className="p-4 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 hover:bg-amber-50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-amber-600 transition-colors shrink-0"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <button
                disabled={currentIdx === 0}
                onClick={() => {
                  setCurrentIdx(prev => prev - 1);
                  setSelectedOption(userAnswers[currentIdx - 1] || null);
                }}
                className="px-5 py-3 rounded-2xl font-bold text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 transition-all"
              >
                Anterior
              </button>

              <button
                disabled={!selectedOption}
                onClick={handleNext}
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
              >
                {currentIdx < questions.length - 1 ? 'Siguiente Pregunta' : 'Enviar Examen'}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {examState === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-zinc-900 border-2 border-indigo-100 dark:border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl text-center"
          >
            {isPassed ? (
              <div>
                <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30 text-white">
                  <Trophy className="w-12 h-12" />
                </div>

                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-500" /> Examen Aprobado con Éxito
                </span>

                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-100 mb-2">
                  ¡Felicidades! Nivel A1 Completado
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium text-base max-w-md mx-auto mb-8">
                  Has obtenido una calificación de <strong className="text-emerald-600 dark:text-emerald-400 font-black">{scorePercent}%</strong>. Aquí tienes tu certificado oficial.
                </p>

                {/* Printable / Personalizable Certificate Card */}
                <div className="relative bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-yellow-50/80 dark:from-zinc-950 dark:via-amber-950/20 dark:to-zinc-900 border-4 border-amber-300/80 dark:border-amber-700/60 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl text-center overflow-hidden">
                  {/* Decorative corner borders */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-t-4 border-l-4 border-amber-500" />
                  <div className="absolute top-3 right-3 w-8 h-8 border-t-4 border-r-4 border-amber-500" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-b-4 border-l-4 border-amber-500" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-b-4 border-r-4 border-amber-500" />

                  <div className="flex justify-center mb-4">
                    <Award className="w-16 h-16 text-amber-500" />
                  </div>

                  <p className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">
                    CERTIFICADO OFICIAL DE APROBACIÓN
                  </p>
                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-6 font-serif">
                    Marco Común Europeo - Nivel A1 (Inglés)
                  </h3>

                  <p className="text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">Otorgado a:</p>
                  
                  {isEditingName ? (
                    <div className="flex items-center justify-center gap-2 max-w-xs mx-auto mb-6">
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="px-4 py-2 border-2 border-amber-400 rounded-xl text-center font-bold text-lg text-zinc-900 dark:text-zinc-100 bg-white dark:bg-zinc-800 w-full"
                        placeholder="Tu Nombre Completo"
                      />
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="px-4 py-2 bg-amber-500 text-white font-bold rounded-xl text-xs"
                      >
                        Guardar
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => setIsEditingName(true)}
                      className="cursor-pointer group inline-flex items-center gap-2 text-2xl md:text-3xl font-black text-indigo-700 dark:text-indigo-300 border-b-2 border-indigo-300/80 pb-1 mb-6 hover:text-indigo-900 transition-all"
                      title="Haz clic para cambiar tu nombre en el certificado"
                    >
                      <span>{userName}</span>
                      <span className="text-xs font-semibold px-2 py-1 bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        Editar
                      </span>
                    </div>
                  )}

                  <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 max-w-lg mx-auto mb-6 leading-relaxed">
                    Por haber superado satisfactoriamente los módulos de Fundamentos A1, Consolidación A1, Práctica Conversacional y el Examen Global de Evaluación.
                  </p>

                  <div className="flex flex-wrap items-center justify-around gap-4 pt-6 border-t border-amber-200/80 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    <div>
                      <span className="block text-zinc-400 font-normal">Calificación</span>
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{scorePercent}% Sobresaliente</span>
                    </div>
                    <div>
                      <span className="block text-zinc-400 font-normal">Plataforma</span>
                      <span className="text-base font-black text-indigo-600 dark:text-indigo-400">CesarTeach Interactive</span>
                    </div>
                    <div>
                      <span className="block text-zinc-400 font-normal">Fecha de Emisión</span>
                      <span className="text-base font-black text-zinc-900 dark:text-zinc-100">{progress.examPassedDate || 'Hoy'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-3.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-sm rounded-2xl shadow-md hover:bg-zinc-800 flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" /> Guardar / Imprimir Certificado
                  </button>
                  <button
                    onClick={handleStartExam}
                    className="px-6 py-3.5 bg-amber-500 text-white font-bold text-sm rounded-2xl shadow-md hover:bg-amber-600 flex items-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" /> Repetir Examen
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-20 h-20 bg-rose-100 dark:bg-rose-950/60 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-600 dark:text-rose-400">
                  <AlertTriangle className="w-10 h-10" />
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-zinc-100 mb-2">
                  Examen No Aprobado ({scorePercent}%)
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 font-medium text-sm max-w-md mx-auto mb-8">
                  Para obtener tu Certificado A1 necesitas un puntaje mínimo del <strong className="text-amber-600 font-bold">80%</strong>. Te recomendamos repasar las lecciones de A1 Inicial e Intermedio y volver a intentarlo.
                </p>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handleStartExam}
                    className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all"
                  >
                    <RefreshCw className="w-4 h-4" /> Intentar de Nuevo
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
