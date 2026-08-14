import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { playSpeech, isSpanishText } from '../utils/speech';

interface PronunciationPracticeProps {
  targetPhrase: string;
  onSuccess?: () => void;
  accentColor?: string;
  courseLanguage?: 'en' | 'es';
}

export function PronunciationPractice({ targetPhrase, onSuccess, accentColor = 'indigo', courseLanguage }: PronunciationPracticeProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [score, setScore] = useState<number | null>(null);
  const [recognitionAvailable, setRecognitionAvailable] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionAvailable(false);
    }
  }, []);

  const isSpanish = courseLanguage ? (courseLanguage === 'es') : isSpanishText(targetPhrase);
  const langCode = isSpanish ? 'es-ES' : 'en-US';

  const speakText = (rate = 0.9) => {
    playSpeech(targetPhrase, {
      lang: langCode,
      rate
    });
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecognitionAvailable(false);
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
        setFeedback(isSpanish ? 'Escuchando... Pronuncia claramente en español' : 'Listening... Pronounce clearly in English');
      };

      recognition.onresult = (event: any) => {
        const currentResult = event.results[0][0].transcript;
        setTranscript(currentResult);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech error:', event.error);
        setIsListening(false);
        setFeedback('No logramos escucharte. Intenta hablar más fuerte o activa tu micrófono.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const evaluateSpeech = () => {
    if (!transcript) return;

    // Normalize accents and punctuation for lenient matching
    const normalize = (str: string) => 
      str.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9 ]/g, '')
        .trim();

    const cleanTarget = normalize(targetPhrase);
    const cleanSpoken = normalize(transcript);

    if (cleanTarget === cleanSpoken || cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
      setScore(100);
      setFeedback('¡Excelente pronunciación! Perfecta imitación.');
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
      setFeedback('¡Muy bien! Se entiende claramente.');
      if (onSuccess) onSuccess();
    } else {
      setFeedback('Vas bien. Escucha el audio de nuevo e intenta imitar el ritmo.');
    }
  };

  useEffect(() => {
    if (transcript && !isListening) {
      evaluateSpeech();
    }
  }, [transcript, isListening]);

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-purple-50/50 to-sky-50/70 dark:from-zinc-900 dark:via-zinc-800/80 dark:to-zinc-900 border-2 border-indigo-200 dark:border-zinc-700/80 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" /> Práctica de Pronunciación Real
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => speakText(0.7)}
            title="Escuchar audio lento"
            className="px-2.5 py-1 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 transition-colors flex items-center gap-1"
          >
            🐢 0.7x
          </button>
          <button
            onClick={() => speakText(1.0)}
            title="Escuchar velocidad normal"
            className="p-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target Phrase Display */}
      <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-indigo-100 dark:border-zinc-800 text-center">
        <p className="text-lg md:text-xl font-black text-zinc-900 dark:text-zinc-100 leading-snug">
          "{targetPhrase}"
        </p>
      </div>

      {/* Microphone Interaction */}
      <div className="flex flex-col items-center justify-center gap-3 pt-2">
        {recognitionAvailable ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startListening}
            disabled={isListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all ${
              isListening 
                ? 'bg-rose-500 animate-pulse ring-8 ring-rose-200 dark:ring-rose-950' 
                : 'bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-indigo-500/30'
            }`}
          >
            {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </motion.button>
        ) : (
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">
            El reconocimiento de voz directo requiere un navegador moderno con soporte de micrófono.
          </p>
        )}

        <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
          {isListening ? 'Escuchando... Habla ahora' : 'Toca el micrófono y lee la frase en voz alta'}
        </p>
      </div>

      {/* Spoken Transcript & Evaluation Feedback */}
      {transcript && (
        <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Dijiste:</p>
          <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 italic">
            "{transcript}"
          </p>

          {score !== null && (
            <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                {score >= 70 ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-500" />
                )}
                <span className="text-xs font-extrabold text-zinc-700 dark:text-zinc-300">
                  Precisión: {score}%
                </span>
              </div>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                {feedback}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
