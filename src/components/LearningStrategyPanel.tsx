import React, { useState } from 'react';
import { UserProgress, SectionTab } from '../types';
import {
  Brain,
  Target,
  Volume2,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Layers,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Lock,
  Award
} from 'lucide-react';

interface LearningStrategyPanelProps {
  progress: UserProgress;
  courseLanguage: 'en' | 'es';
  a1CompletedCount: number;
  a1TotalCount: number;
  a2CompletedCount: number;
  a2TotalCount: number;
  b1CompletedCount?: number;
  b1TotalCount?: number;
  b2CompletedCount?: number;
  b2TotalCount?: number;
  onNavigate: (tab: SectionTab) => void;
  onOpenQuickPractice: () => void;
}

export function LearningStrategyPanel({
  progress,
  courseLanguage,
  a1CompletedCount,
  a1TotalCount,
  a2CompletedCount,
  a2TotalCount,
  b1CompletedCount = 0,
  b1TotalCount = 8,
  b2CompletedCount = 0,
  b2TotalCount = 6,
  onNavigate,
  onOpenQuickPractice
}: LearningStrategyPanelProps) {
  const [showMethodologyDetails, setShowMethodologyDetails] = useState(false);

  const isSpanishTarget = courseLanguage === 'es';
  const badges = progress.unlockedBadges || [];
  const isA1Certified = Boolean(progress.examPassed || badges.includes('b_cert_a1'));
  const isA2Certified = Boolean(badges.includes('b_cert_a2'));
  const isB1Certified = Boolean(badges.includes('b_cert_b1'));
  const isB2Certified = Boolean(badges.includes('b_cert_b2'));

  // Analyze SRS hard words
  const srsEntries = Object.entries(progress.wordSRSStatus || {});
  const hardWordsCount = srsEntries.filter(([, status]) => status === 'hard').length;

  const a1Percentage = Math.round((a1CompletedCount / Math.max(1, a1TotalCount)) * 100);
  const a2Percentage = Math.round((a2CompletedCount / Math.max(1, a2TotalCount)) * 100);
  const b1Percentage = Math.round((b1CompletedCount / Math.max(1, b1TotalCount)) * 100);
  const b2Percentage = Math.round((b2CompletedCount / Math.max(1, b2TotalCount)) * 100);

  // Determine adaptive recommendation based on student's real cognitive state across A1 -> A2 -> B1 -> B2
  let recommendationTitle = '';
  let recommendationDesc = '';
  let actionLabel = '';
  let handleRecommendedAction = () => onNavigate('a1-inicial');

  if (hardWordsCount >= 2) {
    recommendationTitle = isSpanishTarget
      ? `Spaced Repetition Alert: ${hardWordsCount} Hard Words Detected`
      : `Alerta de Curva del Olvido: ${hardWordsCount} palabras por reforzar`;
    recommendationDesc = isSpanishTarget
      ? 'According to Ebbinghaus Spaced Repetition, reviewing difficult vocabulary before advancing consolidates long-term memory by +65%.'
      : 'Según la curva de retención de Ebbinghaus, repasar tus palabras difíciles antes de avanzar consolida la memoria a largo plazo un +65%.';
    actionLabel = isSpanishTarget ? 'Review Flashcards Now' : 'Repasar Vocabulario Difícil';
    handleRecommendedAction = () => onNavigate('flashcards');
  } else if (a1CompletedCount < 9) {
    recommendationTitle = isSpanishTarget
      ? 'Phase 1 Priority: Consolidate A1 Foundations'
      : 'Prioridad Fase 1: Consolidar Cimientos A1 Inicial';
    recommendationDesc = isSpanishTarget
      ? 'Master core pronouns, SER vs ESTAR, and basic sentence building with audio shadowing before complex verb tenses.'
      : 'Domina pronombres, verbo To Be y estructuras base escuchando cada ejemplo en voz alta antes de pasar a tiempos compuestos.';
    actionLabel = isSpanishTarget ? 'Continue A1 Beginner' : 'Continuar A1 Inicial';
    handleRecommendedAction = () => onNavigate('a1-inicial');
  } else if (a1CompletedCount < a1TotalCount) {
    recommendationTitle = isSpanishTarget
      ? 'Phase 2 Priority: Complete A1 Intermediate & Fluency'
      : 'Prioridad Fase 2: Completar A1 Intermedio y Fluidez';
    recommendationDesc = isSpanishTarget
      ? 'You already have the foundations! Complete all remaining A1 lessons to unlock the A1 Certification Exam.'
      : '¡Ya tienes la base! Completa las lecciones restantes de A1 Intermedio y Fluidez para desbloquear el Examen de Certificación A1.';
    actionLabel = isSpanishTarget ? 'Go to A1 Intermediate' : 'Ir a A1 Intermedio';
    handleRecommendedAction = () => onNavigate('a1-intermedio');
  } else if (!isA1Certified) {
    recommendationTitle = isSpanishTarget
      ? 'Mandatory Step: Earn Your Official A1 Certificate (≥80%) to Unlock A2'
      : 'Paso Obligatorio: Obtén tu Certificado A1 (≥80%) para Desbloquear el Nivel A2';
    recommendationDesc = isSpanishTarget
      ? 'You finished all A1 lessons! Pass the official CEFR A1 Certification Exam with 80% or higher to unlock the Level A2 module.'
      : '¡Completaste todas las lecciones A1! Aprueba ahora el Examen de Certificación A1 con 80% o más para habilitar el Módulo Nivel A2.';
    actionLabel = isSpanishTarget ? 'Take A1 Exam Now' : 'Rendir Examen Certificado A1';
    handleRecommendedAction = () => onNavigate('exam');
  } else if (a2CompletedCount < a2TotalCount) {
    recommendationTitle = isSpanishTarget
      ? 'A1 Certified! Next Milestone: Complete CEFR A2'
      : '¡Certificado A1 Aprobado! Avanza al Nivel CEFR A2';
    recommendationDesc = isSpanishTarget
      ? 'Your A1 Certificate unlocked Level A2! Conquer past tenses (Indefinido vs Imperfecto), future plans, and Por vs Para.'
      : '¡Tu Certificado A1 ha desbloqueado el Nivel A2! Conquista el pasado (Past Simple & Continuous), Present Perfect y First Conditional.';
    actionLabel = isSpanishTarget ? 'Continue CEFR A2 Module' : 'Continuar Módulo A2';
    handleRecommendedAction = () => onNavigate('a2-plataforma');
  } else if (!isA2Certified) {
    recommendationTitle = isSpanishTarget
      ? 'Mandatory Step: Pass Your A2 Certificate (≥80%) to Unlock B1'
      : 'Paso Obligatorio: Obtén tu Certificado A2 (≥80%) para Desbloquear el Nivel B1';
    recommendationDesc = isSpanishTarget
      ? 'You finished all A2 lessons! Pass the CEFR A2 Certification Exam to unlock Level B1 (Independent Threshold).'
      : '¡Completaste todas las lecciones A2! Aprueba el Examen de Certificación A2 con ≥80% para desbloquear el Nivel B1 Independiente.';
    actionLabel = isSpanishTarget ? 'Take A2 Certification Exam' : 'Rendir Examen Certificado A2';
    handleRecommendedAction = () => onNavigate('exam');
  } else if (b1CompletedCount < b1TotalCount) {
    recommendationTitle = isSpanishTarget
      ? 'A2 Certified! Advance to CEFR B1 Independent Threshold'
      : '¡Certificado A2 Aprobado! Domina el Nivel B1 Umbral Independiente';
    recommendationDesc = isSpanishTarget
      ? 'Master the Present Subjunctive, Conditional, Commands, and Double Object Pronouns in Level B1.'
      : 'Domina Second Conditional, Present Perfect Continuous, Passive Voice, Reported Speech y Phrasal Verbs en el Nivel B1.';
    actionLabel = isSpanishTarget ? 'Continue CEFR B1 Module' : 'Continuar Módulo B1';
    handleRecommendedAction = () => onNavigate('b1-umbral');
  } else if (!isB1Certified) {
    recommendationTitle = isSpanishTarget
      ? 'Mandatory Step: Pass Your B1 Certificate (≥80%) to Unlock B2 Perfection'
      : 'Paso Obligatorio: Obtén tu Certificado B1 (≥80%) para Desbloquear el Nivel B2';
    recommendationDesc = isSpanishTarget
      ? 'You finished all B1 lessons! Pass the CEFR B1 Exam to unlock the highest module: Level B2 (Advanced & Perfection).'
      : '¡Completaste B1! Aprueba el Examen de Certificación B1 con ≥80% para desbloquear el Nivel B2 de Perfeccionamiento.';
    actionLabel = isSpanishTarget ? 'Take B1 Certification Exam' : 'Rendir Examen Certificado B1';
    handleRecommendedAction = () => onNavigate('exam');
  } else if (b2CompletedCount < b2TotalCount) {
    recommendationTitle = isSpanishTarget
      ? 'B1 Certified! Conquer CEFR B2 Advanced & Perfection'
      : '¡Certificado B1 Aprobado! Perfecciona tu Idioma en el Nivel B2 Avanzado';
    recommendationDesc = isSpanishTarget
      ? 'Master Imperfect Subjunctive, Past Counterfactuals, Verbal Periphrases, and Executive Spanish.'
      : 'Alcanza la maestría con Third Conditional, Future Perfect, Inversiones Enfáticas, Causativo y Registro Ejecutivo B2.';
    actionLabel = isSpanishTarget ? 'Continue CEFR B2 Module' : 'Continuar Módulo B2 Avanzado';
    handleRecommendedAction = () => onNavigate('b2-avanzado');
  } else if (!isB2Certified) {
    recommendationTitle = isSpanishTarget
      ? 'Final Milestone: Take Your CEFR B2 Mastery Exam!'
      : '¡Meta Final: Rinde tu Examen de Certificación B2 Avanzado!';
    recommendationDesc = isSpanishTarget
      ? 'You have completed the entire A1–B2 curriculum! Pass the B2 exam to earn your highest academic diploma.'
      : '¡Has completado todo el programa curricular A1–B2! Aprueba el examen B2 para obtener tu diploma de Perfeccionamiento.';
    actionLabel = isSpanishTarget ? 'Take B2 Mastery Exam' : 'Rendir Examen Final B2';
    handleRecommendedAction = () => onNavigate('exam');
  } else {
    recommendationTitle = isSpanishTarget
      ? 'Full CEFR A1–B2 Mastery Achieved!'
      : '¡Graduado con Maestría Completa MCER A1 a B2!';
    recommendationDesc = isSpanishTarget
      ? 'Congratulations! You have earned all four official CEFR certificates (A1, A2, B1, and B2).'
      : '¡Felicidades! Has obtenido los cuatro certificados oficiales de la academia (A1, A2, B1 y B2).';
    actionLabel = isSpanishTarget ? 'View Your Certificates' : 'Ver Mis Certificados';
    handleRecommendedAction = () => onNavigate('exam');
  }

  const strategies = isSpanishTarget
    ? [
        {
          title: '01. Comprehensible Input (Krashen i+1)',
          desc: 'Every lesson presents grammar inside real-life contexts with native audio at 0.9x and 0.7x speeds before testing.'
        },
        {
          title: '02. Active Recall & Error Loop',
          desc: 'Instead of passive reading, you reconstruct word order and retry missed questions at the end of each session.'
        },
        {
          title: '03. Contrastive L1-L2 Radar',
          desc: 'Explicit warnings prevent literal translation traps across A1, A2, B1, and B2.'
        },
        {
          title: '04. Acoustic Shadowing & Output',
          desc: 'Click any example sentence to listen and repeat aloud, training muscle memory and pronunciation simultaneously.'
        }
      ]
    : [
        {
          title: '01. Input Comprensible (Krashen i+1)',
          desc: 'Cada lección presenta estructuras dentro de situaciones reales con audio nativo a velocidad 0.9x y 0.7x antes de evaluar.'
        },
        {
          title: '02. Recuperación Activa & Ciclo de Errores',
          desc: 'En lugar de lectura pasiva, construyes frases y las preguntas falladas se reprograman al final con pistas de andamiaje.'
        },
        {
          title: '03. Radar Contrastivo Español vs. Inglés',
          desc: 'Alertas específicas previenen errores por traducción literal en A1, A2, B1 y B2.'
        },
        {
          title: '04. Shadowing Acústico y Producción Oral',
          desc: 'Haz clic en cualquier frase de ejemplo para escuchar e imitar en voz alta, conectando oído y pronunciación.'
        }
      ];

  return (
    <section className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-zinc-800">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <Brain className="w-4 h-4" />
            <span>
              {isSpanishTarget
                ? 'Neuro-Cognitive Learning Optimizer · CEFR A1 → A2 → B1 → B2'
                : 'Optimizador Pedagógico Neuro-Cognitivo · Ruta Completa A1 → A2 → B1 → B2'}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">
            {recommendationTitle}
          </h2>
          <p className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
            {recommendationDesc}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleRecommendedAction}
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <span>{actionLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onOpenQuickPractice}
            className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isSpanishTarget ? '5-Min Active Recall' : 'Práctica Activa 5 Min'}</span>
          </button>
        </div>
      </div>

      {/* 4-Level CEFR Progress Grid (A1, A2, B1, B2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 py-5 border-b border-slate-100 dark:border-zinc-800">
        {/* A1 */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Nivel A1</span>
            </span>
            <span className="text-slate-600 dark:text-zinc-400 tabular-nums">
              {a1CompletedCount}/{a1TotalCount} ({a1Percentage}%)
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div className="h-full bg-sky-600 rounded-full transition-all duration-500" style={{ width: `${a1Percentage}%` }} />
          </div>
        </div>

        {/* A2 */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
              {isA1Certified ? (
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
              )}
              <span>Nivel A2</span>
            </span>
            <span className="text-slate-600 dark:text-zinc-400 tabular-nums">
              {isA1Certified ? `${a2CompletedCount}/{a2TotalCount} (${a2Percentage}%)` : isSpanishTarget ? 'Req. A1 Cert' : 'Req. Cert. A1'}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isA1Certified ? 'bg-indigo-600' : 'bg-slate-400'}`}
              style={{ width: `${isA1Certified ? a2Percentage : 0}%` }}
            />
          </div>
        </div>

        {/* B1 */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
              {isA2Certified ? (
                <Target className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
              )}
              <span>Nivel B1</span>
            </span>
            <span className="text-slate-600 dark:text-zinc-400 tabular-nums">
              {isA2Certified ? `${b1CompletedCount}/{b1TotalCount} (${b1Percentage}%)` : isSpanishTarget ? 'Req. A2 Cert' : 'Req. Cert. A2'}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isA2Certified ? 'bg-teal-600' : 'bg-slate-400'}`}
              style={{ width: `${isA2Certified ? b1Percentage : 0}%` }}
            />
          </div>
        </div>

        {/* B2 */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200/70 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
              {isB1Certified ? (
                <Award className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
              )}
              <span>Nivel B2</span>
            </span>
            <span className="text-slate-600 dark:text-zinc-400 tabular-nums">
              {isB1Certified ? `${b2CompletedCount}/{b2TotalCount} (${b2Percentage}%)` : isSpanishTarget ? 'Req. B1 Cert' : 'Req. Cert. B1'}
            </span>
          </div>
          <div className="h-2 w-full bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${isB1Certified ? 'bg-rose-600' : 'bg-slate-400'}`}
              style={{ width: `${isB1Certified ? b2Percentage : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Collapsible 4 Pedagogical Strategies */}
      <div className="pt-4">
        <button
          type="button"
          onClick={() => setShowMethodologyDetails(prev => !prev)}
          className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200 transition-colors"
        >
          <span>
            {isSpanishTarget
              ? 'View 4 Active Teaching Strategies Applied in Your Course'
              : 'Ver las 4 Estrategias de Enseñanza Activa Aplicadas en tu Curso'}
          </span>
          {showMethodologyDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showMethodologyDetails && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-2">
            {strategies.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/80 dark:bg-zinc-800/40 border border-slate-200/80 dark:border-zinc-800"
              >
                <h4 className="text-xs font-black text-slate-900 dark:text-zinc-100 mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
