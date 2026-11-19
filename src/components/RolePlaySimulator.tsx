import React, { useState } from 'react';
import { DialogueLine } from '../types';
import { PronunciationPractice } from './PronunciationPractice';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';
import { motion } from 'motion/react';
import { Volume2, MessageSquare, ChevronRight, RefreshCw, User, Bot } from 'lucide-react';

interface RolePlaySimulatorProps {
  dialogueLines: DialogueLine[];
  onComplete: () => void;
  courseLanguage?: 'en' | 'es';
}

export function RolePlaySimulator({ dialogueLines, onComplete, courseLanguage = 'es' }: RolePlaySimulatorProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [userRole, setUserRole] = useState<string>('Persona A');
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const [userCompletedLines, setUserCompletedLines] = useState<number[]>([]);

  const speakers = Array.from(new Set(dialogueLines.map(l => l.speaker)));

  const currentLine = dialogueLines[currentLineIndex];
  const isUserTurn = isRoleSelected && currentLine?.speaker === userRole;
  const isSpanish = courseLanguage === 'es';

  const getTargetText = (line: DialogueLine) => (isSpanish ? line.textEs : line.textEn);
  const getSubText = (line: DialogueLine) => (isSpanish ? line.textEn : line.textEs);

  const speakText = (text: string, rate = 0.9) => {
    playSpeech(text, {
      courseLanguage,
      rate
    });
  };

  const handleNextLine = () => {
    playTactileSound('flip');
    if (currentLineIndex < dialogueLines.length - 1) {
      const nextIdx = currentLineIndex + 1;
      setCurrentLineIndex(nextIdx);

      const nextLine = dialogueLines[nextIdx];
      if (nextLine && nextLine.speaker !== userRole) {
        speakText(getTargetText(nextLine));
      }
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 md:p-8 shadow-[8px_8px_0px_0px_#0f172a] dark:shadow-[8px_8px_0px_0px_#27272a] max-w-2xl mx-auto space-y-6"
    >
      {!isRoleSelected ? (
        <div className="text-center space-y-6 py-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-300 border-2 border-slate-900 text-slate-950 flex items-center justify-center mx-auto shadow-[4px_4px_0px_0px_#0f172a]">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-950 dark:text-zinc-100 mb-2">
              {isSpanish ? 'Live Conversation Card Deck' : 'Mazo de Conversación en Vivo'}
            </h3>
            <p className="text-sm font-bold text-slate-600 dark:text-zinc-400 max-w-md mx-auto">
              {isSpanish
                ? 'Choose your character card. The system speaks your partner’s lines, and you speak yours in Spanish.'
                : 'Elige tu carta de personaje. El sistema pronunciará a tu compañero y tú dirás tus frases en inglés.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            {speakers.map((spk, idx) => (
              <motion.button
                key={spk}
                type="button"
                whileHover={{ y: -3, rotate: idx % 2 === 0 ? -1 : 1 }}
                whileTap={{ scale: 0.96, x: 2, y: 2 }}
                onClick={() => {
                  playTactileSound('flip');
                  setUserRole(spk);
                  setIsRoleSelected(true);
                  if (dialogueLines[0] && dialogueLines[0].speaker !== spk) {
                    speakText(getTargetText(dialogueLines[0]));
                  }
                }}
                className={`p-5 rounded-2xl border-2 border-slate-900 font-black text-base transition-all flex flex-col items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#0f172a] ${
                  idx % 2 === 0
                    ? 'bg-yellow-300 hover:bg-yellow-400 text-slate-950'
                    : 'bg-emerald-300 hover:bg-emerald-400 text-slate-950'
                }`}
              >
                <User className="w-6 h-6 text-slate-950" />
                <span>{isSpanish ? `Play as ${spk}` : `Interpretar a ${spk}`}</span>
              </motion.button>
            ))}
          </div>

          <div className="pt-3 border-t-2 border-slate-900/10 dark:border-zinc-800">
            <button
              type="button"
              onClick={() => {
                playTactileSound('pop');
                onComplete();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF6EE] hover:bg-amber-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border-2 border-slate-900 dark:border-zinc-600 text-slate-900 dark:text-zinc-200 text-xs font-black shadow-[2px_2px_0px_0px_#0f172a] transition-colors"
            >
              <span>
                {isSpanish
                  ? "Can't use microphone right now · Skip spoken dialogue & Save Lesson"
                  : 'No puedo usar micrófono ahora · Saltar diálogo hablado y Guardar Lección'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900/15 dark:border-zinc-800 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-zinc-300">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-300 text-slate-950 border border-slate-900">
                {isSpanish ? `Role: ${userRole}` : `Rol: ${userRole}`}
              </span>
              <span>·</span>
              <span className="tabular-nums">
                {isSpanish
                  ? `Card ${currentLineIndex + 1} of ${dialogueLines.length}`
                  : `Carta ${currentLineIndex + 1} de ${dialogueLines.length}`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  playTactileSound('flip');
                  setIsRoleSelected(false);
                  setCurrentLineIndex(0);
                }}
                className="text-xs font-black text-slate-600 dark:text-zinc-400 hover:text-slate-950 flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" /> {isSpanish ? 'Switch Role' : 'Cambiar Rol'}
              </button>
              <button
                type="button"
                onClick={() => {
                  playTactileSound('pop');
                  onComplete();
                }}
                className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                {isSpanish ? 'Skip voice & finish' : 'Omitir voz y finalizar'}
              </button>
            </div>
          </div>

          {/* Dialogue History Stream */}
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {dialogueLines.slice(0, currentLineIndex + 1).map((line, idx) => {
              const isUser = line.speaker === userRole;
              const isCurrent = idx === currentLineIndex;
              const mainText = getTargetText(line);
              const subText = getSubText(line);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`p-4 rounded-2xl border-2 flex items-start gap-3 transition-all ${
                    isCurrent
                      ? isUser
                        ? 'bg-emerald-200/80 dark:bg-emerald-950/50 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]'
                        : 'bg-yellow-200/80 dark:bg-indigo-950/50 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]'
                      : 'bg-[#FAF6EE] dark:bg-zinc-800/40 border-slate-900/20 dark:border-zinc-800 opacity-65'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl border-2 border-slate-900 flex items-center justify-center shrink-0 text-slate-950 font-black text-xs shadow-[2px_2px_0px_0px_#0f172a] ${
                      isUser ? 'bg-emerald-400' : 'bg-yellow-300'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-black text-slate-800 dark:text-zinc-200">{line.speaker}</span>
                      <button
                        type="button"
                        onClick={() => speakText(mainText)}
                        className="p-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-slate-900/30 hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm md:text-base font-black text-slate-950 dark:text-zinc-100">{mainText}</p>
                    <p className="text-xs font-semibold text-slate-600 dark:text-zinc-400 italic">{subText}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Current Turn Controller */}
          {currentLine && (
            <div className="pt-2">
              {isUserTurn ? (
                <div className="space-y-3">
                  <PronunciationPractice
                    targetPhrase={getTargetText(currentLine)}
                    courseLanguage={courseLanguage}
                    onSuccess={() => {
                      if (!userCompletedLines.includes(currentLineIndex)) {
                        setUserCompletedLines(prev => [...prev, currentLineIndex]);
                      }
                    }}
                    onSkip={() => {
                      if (!userCompletedLines.includes(currentLineIndex)) {
                        setUserCompletedLines(prev => [...prev, currentLineIndex]);
                      }
                    }}
                  />

                  <motion.button
                    type="button"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98, x: 2, y: 2 }}
                    onClick={handleNextLine}
                    className="w-full py-4 rounded-2xl bg-emerald-400 hover:bg-emerald-500 text-slate-950 border-2 border-slate-900 font-black text-sm shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>
                      {currentLineIndex === dialogueLines.length - 1
                        ? isSpanish
                          ? 'Finish & Stamp Lesson'
                          : 'Finalizar y Sellar Lección'
                        : isSpanish
                          ? 'Next Dialogue Card'
                          : 'Siguiente Carta de Diálogo'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-indigo-600 animate-bounce" />
                    <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-zinc-100">
                      {isSpanish ? 'Listen to your conversation partner...' : 'Escucha la carta de tu interlocutor...'}
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextLine}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 font-black text-xs shadow-[2px_2px_0px_0px_#0f172a] shrink-0 flex items-center gap-1"
                  >
                    {currentLineIndex === dialogueLines.length - 1
                      ? isSpanish
                        ? 'Finish'
                        : 'Finalizar'
                      : isSpanish
                        ? 'Deal Next'
                        : 'Continuar'}{' '}
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
