import React, { useState } from 'react';
import { DialogueLine } from '../types';
import { PronunciationPractice } from './PronunciationPractice';
import { playSpeech } from '../utils/speech';
import { Volume2, MessageSquare, CheckCircle2, ChevronRight, RefreshCw, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

  // Collect unique speakers
  const speakers = Array.from(new Set(dialogueLines.map(l => l.speaker)));

  const currentLine = dialogueLines[currentLineIndex];
  const isUserTurn = isRoleSelected && currentLine?.speaker === userRole;
  const isSpanish = courseLanguage === 'es';

  const getTargetText = (line: DialogueLine) => isSpanish ? line.textEs : line.textEn;
  const getSubText = (line: DialogueLine) => isSpanish ? line.textEn : line.textEs;

  const speakText = (text: string, rate = 0.9) => {
    playSpeech(text, {
      courseLanguage,
      rate
    });
  };

  const handleNextLine = () => {
    if (currentLineIndex < dialogueLines.length - 1) {
      const nextIdx = currentLineIndex + 1;
      setCurrentLineIndex(nextIdx);
      
      // Auto-speak if it's the partner's turn
      const nextLine = dialogueLines[nextIdx];
      if (nextLine && nextLine.speaker !== userRole) {
        speakText(getTargetText(nextLine));
      }
    } else {
      onComplete();
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto space-y-6">
      {!isRoleSelected ? (
        <div className="text-center space-y-6 py-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mb-2">
              {isSpanish ? 'Real Dialogue Simulator' : 'Simulador de Conversación Real'}
            </h3>
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              {isSpanish 
                ? 'Select your role. The system will speak your partner’s lines, and you will speak your lines out loud in Spanish.'
                : 'Selecciona el rol que deseas interpretar. El sistema pronunciará el personaje contrario y tú dirás tus frases en voz alta.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto pt-2">
            {speakers.map(spk => (
              <button
                key={spk}
                onClick={() => {
                  setUserRole(spk);
                  setIsRoleSelected(true);
                  // Speak first line if partner starts
                  if (dialogueLines[0] && dialogueLines[0].speaker !== spk) {
                    speakText(getTargetText(dialogueLines[0]));
                  }
                }}
                className="p-5 rounded-2xl border-2 border-emerald-200 dark:border-zinc-800 bg-emerald-50/50 dark:bg-zinc-800/40 hover:border-emerald-500 hover:bg-emerald-100/50 text-emerald-950 dark:text-emerald-200 font-extrabold text-base transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <User className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>{isSpanish ? `Play ${spk}` : `Interpretar ${spk}`}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-black uppercase">
                {isSpanish ? 'Your Role:' : 'Tu Rol:'} {userRole}
              </span>
              <span className="text-xs font-bold text-zinc-400">
                {isSpanish ? 'Line' : 'Línea'} {currentLineIndex + 1} {isSpanish ? 'of' : 'de'} {dialogueLines.length}
              </span>
            </div>

            <button
              onClick={() => {
                setIsRoleSelected(false);
                setCurrentLineIndex(0);
              }}
              className="text-xs font-bold text-zinc-500 hover:text-emerald-600 flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> {isSpanish ? 'Change Role' : 'Cambiar Rol'}
            </button>
          </div>

          {/* Dialogue History Stream */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {dialogueLines.slice(0, currentLineIndex + 1).map((line, idx) => {
              const isUser = line.speaker === userRole;
              const isCurrent = idx === currentLineIndex;
              const mainText = getTargetText(line);
              const subText = getSubText(line);

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${
                    isCurrent
                      ? isUser
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 ring-2 ring-emerald-300'
                        : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-400'
                      : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 opacity-60'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                    isUser ? 'bg-emerald-600' : 'bg-indigo-600'
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-black text-zinc-700 dark:text-zinc-300">{line.speaker}</span>
                      <button
                        onClick={() => speakText(mainText)}
                        className="p-1 hover:text-indigo-600 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{mainText}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 italic">{subText}</p>
                  </div>
                </div>
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
                  />

                  <button
                    onClick={handleNextLine}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.99]"
                  >
                    <span>
                      {currentLineIndex === dialogueLines.length - 1 
                        ? (isSpanish ? 'Finish & Save Lesson' : 'Finalizar y Guardar Lección')
                        : (isSpanish ? 'Next Phrase' : 'Siguiente Frase')}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-indigo-600 animate-bounce" />
                    <span className="text-xs font-extrabold text-indigo-900 dark:text-indigo-200">
                      {isSpanish ? 'Listen to your partner...' : 'Escucha a tu interlocutor...'}
                    </span>
                  </div>

                  <button
                    onClick={handleNextLine}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shrink-0 flex items-center gap-1"
                  >
                    {currentLineIndex === dialogueLines.length - 1 
                      ? (isSpanish ? 'Finish' : 'Finalizar') 
                      : (isSpanish ? 'Reply' : 'Responder')} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
