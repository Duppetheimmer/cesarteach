import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, CheckCircle2, AlertCircle, FastForward, Ear } from 'lucide-react';
import { motion } from 'motion/react';
import { playSpeech, isSpanishText } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';

interface PronunciationPracticeProps {
  targetPhrase: string;
  onSuccess?: () => void;
  onSkip?: () => void;
  accentColor?: string;
  courseLanguage?: 'en' | 'es';
}

const SILENT_MODE_STORAGE_KEY = 'lingostep_silent_mic_mode';

export function PronunciationPractice({
  targetPhrase,
  onSuccess,
  onSkip,
  courseLanguage
}: PronunciationPracticeProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [recognitionAvailable, setRecognitionAvailable] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>('');
  const [skippedMic, setSkippedMic] = useState(false);
  const [silentModeActive, setSilentModeActive] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(SILENT_MODE_STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionAvailable(false);
    }
  }, []);

  useEffect(() => {
    setTranscript('');
    setFeedback('');
    if (silentModeActive) {
      setSkippedMic(true);
      setScore(100);
      if (onSkip) onSkip();
      else if (onSuccess) onSuccess();
    } else {
      setSkippedMic(false);
      setScore(null);
    }
  }, [targetPhrase, silentModeActive]);

  const isSpanish = courseLanguage ? courseLanguage === 'es' : isSpanishText(targetPhrase);
  const langCode = isSpanish ? 'es-ES' : 'en-US';

  const speakText = (rate = 0.9) => {
    playTactileSound('pop');
    playSpeech(targetPhrase, {
      lang: langCode,
      rate
    });
  };

  const handleSkipTask = (enableSessionSilentMode = false) => {
    playTactileSound('pop');
    if (enableSessionSilentMode) {
      try {
        sessionStorage.setItem(SILENT_MODE_STORAGE_KEY, 'true');
      } catch {}
      setSilentModeActive(true);
    }
    setIsListening(false);
    setSkippedMic(true);
    setScore(100);
    setFeedback(
      isSpanish
        ? 'Microphone task skipped. Audio validated to continue.'
        : 'Tarea de micrófono omitida. Audio validado para continuar.'
    );
    if (onSkip) {
      onSkip();
    } else if (onSuccess) {
      onSuccess();
    }
  };

  const disableSilentMode = () => {
    playTactileSound('pop');
    try {
      sessionStorage.removeItem(SILENT_MODE_STORAGE_KEY);
    } catch {}
    setSilentModeActive(false);
    setSkippedMic(false);
    setScore(null);
    setFeedback('');
  };

  const startListening = () => {
    playTactileSound('pop');
    setSkippedMic(false);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionAvailable(false);
      setFeedback(
        isSpanish
          ? 'Your browser does not support direct microphone input. Use the skip button below.'
          : 'Tu navegador no soporta micrófono directo. Usa el botón de saltar tarea de voz abajo.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = langCode;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
        setScore(null);
        setFeedback(
          isSpanish
            ? 'Listening... Speak clearly in Spanish'
            : 'Escuchando... Pronuncia claramente en inglés'
        );
      };

      recognition.onresult = (event: any) => {
        const currentResult = event.results[0][0].transcript;
        setTranscript(currentResult);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech error:', event.error);
        setIsListening(false);
        setFeedback(
          isSpanish
            ? 'Could not hear the microphone. You can try again or skip this voice task below.'
            : 'No logramos escuchar el micrófono. Puedes intentar de nuevo o saltar esta tarea de voz abajo.'
        );
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
      setFeedback(
        isSpanish
          ? 'Error activating microphone. Use the skip voice task button below.'
          : 'Error al activar el micrófono. Usa el botón de saltar tarea de voz abajo.'
      );
    }
  };

  const evaluateSpeech = () => {
    if (!transcript) return;

    const normalize = (str: string) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 ]/g, '')
        .trim();

    const cleanTarget = normalize(targetPhrase);
    const cleanSpoken = normalize(transcript);

    if (cleanTarget === cleanSpoken || cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
      playTactileSound('stamp');
      setScore(100);
      setFeedback(
        isSpanish
          ? 'Excellent pronunciation! Accurate Spanish shadowing.'
          : '¡Excelente pronunciación! Imitación precisa.'
      );
      if (onSuccess) onSuccess();
      return;
    }

    const targetWords = cleanTarget.split(' ').filter(Boolean);
    const spokenWords = cleanSpoken.split(' ').filter(Boolean);

    let matches = 0;
    targetWords.forEach(w => {
      if (spokenWords.includes(w)) matches++;
    });

    const accuracy = Math.round((matches / Math.max(targetWords.length, 1)) * 100);
    setScore(accuracy);

    if (accuracy >= 70) {
      playTactileSound('stamp');
      setFeedback(
        isSpanish ? 'Great job! Clearly understood.' : '¡Muy bien! Se entiende claramente.'
      );
      if (onSuccess) onSuccess();
    } else {
      playTactileSound('error');
      setFeedback(
        isSpanish
          ? 'Good try! Listen to the audio again, imitate the rhythm, or skip the exercise if you cannot speak right now.'
          : 'Vas bien. Escucha el audio de nuevo, intenta imitar el ritmo o salta el ejercicio si no puedes hablar.'
      );
    }
  };

  useEffect(() => {
    if (transcript && !isListening) {
      evaluateSpeech();
    }
  }, [transcript, isListening]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 rounded-2xl bg-[#FAF6EE] dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] space-y-4"
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-xs font-black text-slate-900 dark:text-zinc-200 flex items-center gap-1.5">
          <Mic className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>
            {isSpanish ? 'Voice Card · Spanish Pronunciation' : 'Carta de Voz · Pronunciación en Inglés'}
          </span>
        </span>
        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => speakText(0.7)}
            title={isSpanish ? 'Listen slow audio' : 'Escuchar audio lento'}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-600 text-xs font-black text-slate-900 dark:text-zinc-200 hover:bg-yellow-200 transition-colors shadow-[2px_2px_0px_0px_#0f172a]"
          >
            🐢 0.7x
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => speakText(1.0)}
            title={isSpanish ? 'Listen normal speed' : 'Escuchar velocidad normal'}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 border-2 border-slate-900 transition-colors text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0f172a]"
          >
            <Volume2 className="w-3.5 h-3.5" /> {isSpanish ? 'Listen' : 'Escuchar'}
          </motion.button>
        </div>
      </div>

      {/* Target Phrase Display */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 shadow-[3px_3px_0px_0px_#0f172a] text-center">
        <p className="text-lg md:text-2xl font-black text-slate-950 dark:text-zinc-100 leading-snug">
          "{targetPhrase}"
        </p>
      </div>

      {/* Microphone Interaction */}
      {!skippedMic && (
        <div className="flex flex-col items-center justify-center gap-2.5 pt-1">
          {recognitionAvailable ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.06, rotate: -2 }}
              whileTap={{ scale: 0.94 }}
              onClick={startListening}
              disabled={isListening}
              className={`w-16 h-16 rounded-2xl border-2 border-slate-900 flex items-center justify-center text-slate-950 shadow-[4px_4px_0px_0px_#0f172a] transition-all ${
                isListening
                  ? 'bg-rose-400 text-white animate-bounce'
                  : 'bg-yellow-300 hover:bg-yellow-400'
              }`}
            >
              {isListening ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
            </motion.button>
          ) : (
            <p className="text-xs text-amber-700 dark:text-amber-400 font-bold text-center">
              {isSpanish
                ? 'Microphone recognition unavailable on this device. Use the skip button below.'
                : 'Reconocimiento de micrófono no disponible en este dispositivo. Usa el botón de omitir micrófono abajo.'}
            </p>
          )}

          <p className="text-xs font-bold text-slate-600 dark:text-zinc-400 text-center">
            {isListening
              ? isSpanish
                ? 'Listening... Speak in Spanish now'
                : 'Escuchando... Habla en inglés ahora'
              : isSpanish
                ? 'Tap the microphone card to speak aloud in Spanish'
                : 'Toca el botón de micrófono para pronunciar en voz alta'}
          </p>
        </div>
      )}

      {/* Explicit Skip Microphone / Silent Mode Controls */}
      <div className="pt-3 border-t-2 border-slate-900/10 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-2">
        {!skippedMic ? (
          <>
            <button
              type="button"
              onClick={() => {
                speakText(0.95);
                handleSkipTask(false);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-amber-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 border-2 border-slate-900 dark:border-zinc-600 text-slate-900 dark:text-zinc-200 text-xs font-black transition-colors shadow-[2px_2px_0px_0px_#0f172a]"
            >
              <FastForward className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>
                {isSpanish
                  ? "Can't use microphone · Skip task"
                  : 'No puedo usar micrófono · Saltar tarea'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleSkipTask(true)}
              className="text-xs font-extrabold text-slate-600 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 underline underline-offset-2 transition-colors"
            >
              {isSpanish
                ? 'No-microphone mode for the whole session'
                : 'Modo sin micrófono toda la sesión'}
            </button>
          </>
        ) : (
          <div className="w-full p-3.5 rounded-xl bg-emerald-200/90 dark:bg-emerald-950/50 border-2 border-slate-900 dark:border-emerald-700 flex items-center justify-between gap-3 shadow-[2px_2px_0px_0px_#0f172a]">
            <div className="flex items-center gap-2 text-xs font-black text-slate-950 dark:text-emerald-200">
              <Ear className="w-4 h-4 shrink-0" />
              <span>
                {silentModeActive
                  ? isSpanish
                    ? 'Silent mode active: Validated through listening.'
                    : 'Modo sin micrófono activo: Validado mediante escucha.'
                  : isSpanish
                    ? 'Microphone skipped: Ready for next card.'
                    : 'Tarea de voz omitida: Lista para la siguiente carta.'}
              </span>
            </div>
            {silentModeActive ? (
              <button
                type="button"
                onClick={disableSilentMode}
                className="text-xs font-black text-slate-950 dark:text-emerald-200 underline shrink-0"
              >
                {isSpanish ? 'Re-enable mic' : 'Reactivar voz'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setSkippedMic(false);
                  setScore(null);
                }}
                className="text-xs font-black text-slate-950 dark:text-emerald-200 underline shrink-0"
              >
                {isSpanish ? 'Try with voice' : 'Intentar con voz'}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Spoken Transcript & Evaluation Feedback */}
      {transcript && !skippedMic && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-white dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 space-y-2 shadow-[3px_3px_0px_0px_#0f172a]"
        >
          <p className="text-xs font-black text-slate-500">
            {isSpanish ? 'Detected Speech:' : 'Voz Detectada:'}
          </p>
          <p className="text-sm font-bold text-slate-900 dark:text-zinc-200 italic">
            "{transcript}"
          </p>

          {score !== null && (
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-zinc-800 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {score >= 70 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                )}
                <span className="text-xs font-black text-slate-900 dark:text-zinc-200 tabular-nums">
                  {isSpanish ? `Accuracy: ${score}%` : `Precisión: ${score}%`}
                </span>
              </div>
              <span className="text-xs font-extrabold text-indigo-700 dark:text-indigo-400">
                {feedback}
              </span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
