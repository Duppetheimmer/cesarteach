import React, { useState } from 'react';
import { UserProgress, VocabWord } from '../types';
import { SYSTEM_BADGES } from '../hooks/useProgress';
import { fastTrackVocab } from '../data';
import { a1Phrasebook } from '../data/phrasebook';
import { X, BookOpen, Volume2, Search, CheckCircle2, Award, Sparkles, Brain, Trophy, Zap, Footprints, Star, MessageSquare, Compass, Mic, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSpeech, isSpanishText } from '../utils/speech';

interface NotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
  progress: UserProgress;
  courseLanguage?: 'en' | 'es';
}

const BADGE_ICONS: Record<string, React.ReactNode> = {
  Footprints: <Footprints className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />,
};

export function NotebookModal({ isOpen, onClose, progress, courseLanguage = 'es' }: NotebookModalProps) {
  const [activeTab, setActiveTab] = useState<'grammar' | 'phrasebook' | 'vocab' | 'badges'>('grammar');
  const [searchQuery, setSearchQuery] = useState('');
  const [phraseCategory, setPhraseCategory] = useState<string>('all');
  const [audioSpeed, setAudioSpeed] = useState<number>(0.9);
  const [speakingPhraseId, setSpeakingPhraseId] = useState<string | null>(null);
  const [speechSuccessId, setSpeechSuccessId] = useState<string | null>(null);

  if (!isOpen) return null;

  const speakText = (text: string) => {
    playSpeech(text, {
      courseLanguage,
      rate: audioSpeed
    });
  };

  const handleListenPronunciation = (phraseId: string, phraseEn: string) => {
    setSpeakingPhraseId(phraseId);
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Google Chrome o Edge.');
      setSpeakingPhraseId(null);
      return;
    }

    const isSpanish = isSpanishText(phraseEn);
    const langCode = isSpanish ? 'es-ES' : 'en-US';

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = langCode;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      // recognition active
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9 ]/g, '').trim();
      const cleanTarget = normalize(phraseEn);
      const cleanTranscript = normalize(transcript);

      if (cleanTranscript.includes(cleanTarget) || cleanTarget.includes(cleanTranscript)) {
        setSpeechSuccessId(phraseId);
        setTimeout(() => setSpeechSuccessId(null), 3000);
      } else {
        alert(`Escuchamos: "${transcript}". ¡Inténtalo de nuevo acercándote al micrófono!`);
      }
      setSpeakingPhraseId(null);
    };

    recognition.onerror = () => {
      setSpeakingPhraseId(null);
    };

    recognition.start();
  };

  const filteredVocab = fastTrackVocab.filter(
    v => v.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
         v.translation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = ['all', ...Array.from(new Set(a1Phrasebook.map(p => p.category)))];

  const filteredPhrases = a1Phrasebook.filter(p => 
    phraseCategory === 'all' || p.category === phraseCategory
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-sky-600 p-6 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black">Mi Cuaderno A1</h2>
                <p className="text-xs text-white/90 font-medium">Resumen rápido de gramática, vocabulario y tus logros</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-4 pt-3 shrink-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('grammar')}
              className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-2xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'grammar'
                  ? 'bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Reglas de Gramática
            </button>

            <button
              onClick={() => setActiveTab('phrasebook')}
              className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-2xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'phrasebook'
                  ? 'bg-white dark:bg-zinc-900 text-sky-600 dark:text-sky-400 border-sky-600 dark:border-sky-400 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent'
              }`}
            >
              <Compass className="w-4 h-4 text-sky-500" />
              Frases de Supervivencia A1 ({a1Phrasebook.length})
            </button>

            <button
              onClick={() => setActiveTab('vocab')}
              className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-2xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'vocab'
                  ? 'bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 border-amber-600 dark:border-amber-400 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent'
              }`}
            >
              <Zap className="w-4 h-4" />
              Diccionario A1 ({progress.masteredWords.length}/{fastTrackVocab.length})
            </button>

            <button
              onClick={() => setActiveTab('badges')}
              className={`px-4 py-3 font-bold text-xs md:text-sm rounded-t-2xl transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'badges'
                  ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 border-emerald-600 dark:border-emerald-400 shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-transparent'
              }`}
            >
              <Trophy className="w-4 h-4" />
              Logros ({progress.unlockedBadges?.length || 0}/{SYSTEM_BADGES.length})
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* GRAMMAR TAB */}
            {activeTab === 'grammar' && (
              <div className="space-y-6 text-zinc-800 dark:text-zinc-200 text-sm">
                {/* Audio Speed Toggle */}
                <div className="flex items-center justify-between bg-indigo-50 dark:bg-zinc-800/60 p-3.5 rounded-2xl border border-indigo-100 dark:border-zinc-700/60">
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                    <Volume2 className="w-4 h-4 text-indigo-600" /> Velocidad de Audio para Ejemplos:
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAudioSpeed(0.7)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        audioSpeed === 0.7 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200'
                      }`}
                    >
                      🐢 0.7x Lento
                    </button>
                    <button
                      onClick={() => setAudioSpeed(0.9)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        audioSpeed === 0.9 ? 'bg-indigo-600 text-white shadow-sm' : 'bg-white dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200'
                      }`}
                    >
                      ⚡ 0.9x Normal
                    </button>
                  </div>
                </div>

                {/* Section 1: Verbo To Be */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-base text-indigo-600 dark:text-indigo-400">
                      1. Verbo To Be (Ser o Estar) & Edad
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Es el verbo más usado en A1. En inglés la edad siempre utiliza <strong className="text-indigo-600">To Be</strong> (nunca "have").
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                      <span>I am 25 years old.</span>
                      <button onClick={() => speakText("I am twenty five years old")} className="text-indigo-500 hover:text-indigo-700 p-1">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                      <span>She is a student.</span>
                      <button onClick={() => speakText("She is a student")} className="text-indigo-500 hover:text-indigo-700 p-1">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section 2: Presente Simple (-s rule) */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
                  <h3 className="font-black text-base text-purple-600 dark:text-purple-400">
                    2. Presente Simple: Regla de la 3ª Persona (-s)
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Para <strong className="text-purple-600">He, She, It</strong> en afirmación, añade <strong>"-s"</strong> al verbo. En negación usa <strong>"doesn't"</strong>.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                      <span>He works every day.</span>
                      <button onClick={() => speakText("He works every day")} className="text-purple-500 hover:text-purple-700 p-1">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                      <span>She doesn't speak French.</span>
                      <button onClick={() => speakText("She doesn't speak French")} className="text-purple-500 hover:text-purple-700 p-1">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section 3: W/H Questions */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
                  <h3 className="font-black text-base text-sky-600 dark:text-sky-400">
                    3. Preguntas W/H
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <strong className="text-sky-600 block">What?</strong> Qué / Cuál
                    </div>
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <strong className="text-sky-600 block">Where?</strong> Dónde
                    </div>
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <strong className="text-sky-600 block">Who?</strong> Quién
                    </div>
                    <div className="p-2.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <strong className="text-sky-600 block">When?</strong> Cuándo
                    </div>
                  </div>
                </div>

                {/* Section 4: Preposiciones In, On, At */}
                <div className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/60 space-y-3">
                  <h3 className="font-black text-base text-emerald-600 dark:text-emerald-400">
                    4. Preposiciones de Lugar (In, On, At)
                  </h3>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <li>• <strong className="text-emerald-600">IN</strong>: Dentro de espacios cerrados (<em>In the bag, in the room</em>).</li>
                    <li>• <strong className="text-emerald-600">ON</strong>: Sobre superficies o días (<em>On the table, on Monday</em>).</li>
                    <li>• <strong className="text-emerald-600">AT</strong>: En un punto o lugar específico (<em>At the bus stop, at 8:00 AM</em>).</li>
                  </ul>
                </div>
              </div>
            )}

            {/* PHRASEBOOK TAB */}
            {activeTab === 'phrasebook' && (
              <div className="space-y-4">
                {/* Category Filters */}
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setPhraseCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                        phraseCategory === cat
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200'
                      }`}
                    >
                      {cat === 'all' ? 'Todas las Frases' : cat}
                    </button>
                  ))}
                </div>

                {/* Phrase Cards Grid */}
                <div className="space-y-3">
                  {filteredPhrases.map(item => {
                    const isSpeakingThis = speakingPhraseId === item.id;
                    const isSuccessThis = speechSuccessId === item.id;

                    return (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 shadow-sm space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                              {item.category}
                            </span>
                            <h4 className="text-base font-black text-zinc-900 dark:text-zinc-100 mt-1">
                              {item.phraseEn}
                            </h4>
                            <p className="text-xs font-semibold text-sky-700 dark:text-sky-400">
                              {item.phraseEs}
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => speakText(item.phraseEn)}
                              title="Escuchar pronunciación"
                              className="p-2.5 rounded-xl bg-sky-50 dark:bg-zinc-700 hover:bg-sky-100 text-sky-600 dark:text-sky-300 transition-colors"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleListenPronunciation(item.id, item.phraseEn)}
                              title="Practicar con tu voz"
                              className={`p-2.5 rounded-xl transition-all flex items-center gap-1 text-xs font-bold ${
                                isSpeakingThis 
                                  ? 'bg-rose-500 text-white animate-pulse' 
                                  : isSuccessThis 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-zinc-100 dark:bg-zinc-700 hover:bg-indigo-50 text-zinc-600 dark:text-zinc-300'
                              }`}
                            >
                              {isSuccessThis ? <Check className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Phonetics & Tip */}
                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                          <span className="font-mono text-zinc-400 dark:text-zinc-500">
                            Pronunciación: <strong className="text-zinc-700 dark:text-zinc-300">{item.phonetic}</strong>
                          </span>
                          <span className="italic text-zinc-500 dark:text-zinc-400">
                            💡 {item.contextTip}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* VOCAB TAB */}
            {activeTab === 'vocab' && (
              <div className="space-y-4">
                {/* Search input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Buscar palabra en inglés o español..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Word List Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredVocab.map(v => {
                    const isDone = progress.masteredWords.includes(v.id);
                    return (
                      <div
                        key={v.id}
                        className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                          isDone 
                            ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/80' 
                            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-black text-base text-zinc-900 dark:text-zinc-100">{v.word}</span>
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                              {v.category}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">
                            {v.translation}
                          </p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 italic line-clamp-1">
                            "{v.example}"
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => speakText(v.word)}
                            className="p-2 rounded-xl bg-zinc-100 hover:bg-amber-100 dark:bg-zinc-800 text-zinc-600 hover:text-amber-700 transition-colors"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          {isDone && (
                            <CheckCircle2 className="w-5 h-5 text-amber-500 fill-amber-100 dark:fill-amber-950" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* BADGES TAB */}
            {activeTab === 'badges' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SYSTEM_BADGES.map(badge => {
                  const isUnlocked = progress.unlockedBadges?.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`p-4 md:p-5 rounded-2xl border-2 flex items-center gap-4 transition-all ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/20 border-emerald-400 dark:border-emerald-800 shadow-md shadow-emerald-500/10'
                          : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 opacity-50 grayscale'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white ${
                        isUnlocked ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30' : 'bg-zinc-300 dark:bg-zinc-800'
                      }`}>
                        {BADGE_ICONS[badge.iconName] || <Award className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="font-black text-sm text-zinc-900 dark:text-zinc-100">{badge.title}</h4>
                          {isUnlocked && (
                            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                              Desbloqueado
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                          {badge.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
