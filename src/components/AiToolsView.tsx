import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Brain, Search, Sparkles, CheckCircle2, AlertTriangle, Volume2, Mic, ArrowRight, Lightbulb, BookOpen, Wand2, Layers, RefreshCw } from 'lucide-react';
import { playSpeech } from '../utils/speech';

interface GrammarBreakdownItem {
  word: string;
  partOfSpeech: string;
  meaningEs: string;
}

interface SentenceAnalysisData {
  isCorrect: boolean;
  correctedSentence: string;
  translationEs: string;
  explanationEs: string;
  grammarBreakdown: GrammarBreakdownItem[];
  pronunciationTip: string;
}

interface GeneratedWord {
  word: string;
  translation: string;
  phonetic: string;
  exampleEn: string;
  exampleEs: string;
}

interface AiToolsViewProps {
  courseLanguage?: 'en' | 'es';
}

export function AiToolsView({ courseLanguage = 'en' }: AiToolsViewProps) {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'generator'>('analyzer');

  // Sentence Analyzer State
  const [sentenceInput, setSentenceInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SentenceAnalysisData | null>(null);
  const [analyzerError, setAnalyzerError] = useState<string | null>(null);

  // Topic Generator State
  const [topicInput, setTopicInput] = useState('');
  const [isGeneratingWords, setIsGeneratingWords] = useState(false);
  const [generatedWords, setGeneratedWords] = useState<GeneratedWord[]>([]);
  const [generatorError, setGeneratorError] = useState<string | null>(null);

  const speakText = (text: string) => {
    playSpeech(text, {
      courseLanguage,
      rate: 0.9
    });
  };

  const handleAnalyzeSentence = async (customText?: string) => {
    const textToAnalyze = customText || sentenceInput;
    if (!textToAnalyze.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setAnalyzerError(null);
    setAnalysisResult(null);

    try {
      const res = await fetch('/api/ai/analyze-sentence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence: textToAnalyze.trim(), targetLang: courseLanguage })
      });
      const data = await res.json();

      if (data.success && data.data) {
        setAnalysisResult(data.data);
      } else {
        throw new Error(data.error || 'Error al analizar la frase');
      }
    } catch (err: any) {
      console.error(err);
      setAnalyzerError(err.message || 'No se pudo analizar la frase en este momento.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateTopicWords = async (customTopic?: string) => {
    const topicToUse = customTopic || topicInput;
    if (!topicToUse.trim() || isGeneratingWords) return;

    setIsGeneratingWords(true);
    setGeneratorError(null);

    try {
      const res = await fetch('/api/ai/generate-topic-words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicToUse.trim(), targetLang: courseLanguage })
      });
      const data = await res.json();

      if (data.success && data.words) {
        setGeneratedWords(data.words);
      } else {
        throw new Error(data.error || 'Error al generar vocabulario');
      }
    } catch (err: any) {
      console.error(err);
      setGeneratorError(err.message || 'No se pudo generar el vocabulario temático.');
    } finally {
      setIsGeneratingWords(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 rounded-3xl p-6 md:p-8 text-white mb-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
            <Wand2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <span className="inline-block px-3 py-0.5 rounded-full bg-black/20 text-[10px] font-black uppercase tracking-wider mb-1">
              ✨ Herramientas Lingüísticas IA
            </span>
            <h1 className="text-2xl md:text-3xl font-black">Analizador & Creador por IA</h1>
            <p className="text-xs md:text-sm text-white/90 font-medium">
              Analiza la estructura de cualquier oración o genera tarjetas de vocabulario de tus temas preferidos.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-zinc-100 dark:bg-zinc-800/80 p-1.5 rounded-2xl mb-6 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab('analyzer')}
          className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'analyzer'
              ? 'bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 shadow-md'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>Analizador Sintáctico</span>
        </button>

        <button
          onClick={() => setActiveTab('generator')}
          className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${
            activeTab === 'generator'
              ? 'bg-white dark:bg-zinc-900 text-teal-600 dark:text-teal-400 shadow-md'
              : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Generador Temático</span>
        </button>
      </div>

      {/* TAB 1: SENTENCE ANALYZER */}
      {activeTab === 'analyzer' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 mb-1">
              Analizador de Oraciones A1
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-medium">
              Escribe o pega cualquier frase en inglés para obtener un desglose completo de sujeto, verbo, errores y pronunciación.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={sentenceInput}
                onChange={(e) => setSentenceInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleAnalyzeSentence(); }}
                placeholder="Ejemplo: She go to the park yesterday or Can I get a coffee?"
                className="flex-1 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 text-zinc-900 dark:text-zinc-100"
              />
              <button
                onClick={() => handleAnalyzeSentence()}
                disabled={!sentenceInput.trim() || isAnalyzing}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
              >
                {isAnalyzing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                <span>{isAnalyzing ? 'Analizando...' : 'Analizar Frase'}</span>
              </button>
            </div>

            {/* Preset Samples */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-black uppercase text-zinc-400 shrink-0">Probar ejemplos:</span>
              {[
                "She goes to school.",
                "I wants a coffee.",
                "Where is the hotel?",
                "They is my friends."
              ].map((sample, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSentenceInput(sample);
                    handleAnalyzeSentence(sample);
                  }}
                  className="text-xs font-semibold px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-emerald-50 hover:text-emerald-600 shrink-0 transition-colors"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>

          {/* Analysis Results Card */}
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl space-y-6"
            >
              {/* Status Header */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                analysisResult.isCorrect 
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200' 
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-900 dark:text-amber-200'
              }`}>
                <div className="flex items-center gap-3">
                  {analysisResult.isCorrect ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-7 h-7 text-amber-600 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-extrabold text-sm">
                      {analysisResult.isCorrect ? '¡Oración Correcta!' : 'Sugerencia de Corrección Gramatical'}
                    </h4>
                    <p className="text-xs opacity-90 font-medium">
                      {analysisResult.explanationEs}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => speakText(analysisResult.correctedSentence)}
                  className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 shadow-sm text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 transition-colors shrink-0"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Corrected Text & Translation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                    Oración en Inglés
                  </span>
                  <p className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                    {analysisResult.correctedSentence}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60">
                  <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 dark:text-sky-400 block mb-1">
                    Traducción al Español
                  </span>
                  <p className="text-lg font-extrabold text-zinc-800 dark:text-zinc-200">
                    {analysisResult.translationEs}
                  </p>
                </div>
              </div>

              {/* Word-by-Word Breakdown */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-zinc-500 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-500" /> Desglose Gramatical Palabra por Palabra
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                  {analysisResult.grammarBreakdown.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50">
                      <p className="font-black text-sm text-indigo-600 dark:text-indigo-400">{item.word}</p>
                      <span className="inline-block px-2 py-0.5 rounded-md bg-zinc-200 dark:bg-zinc-700 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 my-1">
                        {item.partOfSpeech}
                      </span>
                      <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">{item.meaningEs}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pronunciation Tip */}
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 flex items-center gap-3 text-sky-900 dark:text-sky-200 text-xs font-semibold">
                <Lightbulb className="w-5 h-5 text-sky-500 shrink-0" />
                <span><strong>Consejo Fonético:</strong> {analysisResult.pronunciationTip}</span>
              </div>
            </motion.div>
          )}

          {analyzerError && (
            <div className="p-4 rounded-2xl bg-rose-100 text-rose-900 text-xs font-bold border border-rose-300">
              {analyzerError}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: TOPIC GENERATOR */}
      {activeTab === 'generator' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-100 mb-1">
              Generador de Vocabulario A1 Personalizado
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-medium">
              Escribe cualquier tema de tu interés y la IA creará un paquete de 5 palabras clave con ejemplos e interpretación fonética.
            </p>

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={topicInput}
                onChange={(e) => setTopicInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleGenerateTopicWords(); }}
                placeholder="Ejemplo: Videojuegos, Películas, Mascotas, Tecnología, Cocina..."
                className="flex-1 bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 text-zinc-900 dark:text-zinc-100"
              />
              <button
                onClick={() => handleGenerateTopicWords()}
                disabled={!topicInput.trim() || isGeneratingWords}
                className="bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shrink-0"
              >
                {isGeneratingWords ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>{isGeneratingWords ? 'Generando...' : 'Crear Vocabulario'}</span>
              </button>
            </div>

            {/* Quick Topic Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-[10px] font-black uppercase text-zinc-400 shrink-0">Temas Populares:</span>
              {["✈️ Aeropuerto", "🎮 Gaming", "🍕 Comida", "⚽ Deportes", "🎵 Música", "💻 Tecnología"].map((topic, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const cleanTopic = topic.split(' ')[1];
                    setTopicInput(cleanTopic);
                    handleGenerateTopicWords(cleanTopic);
                  }}
                  className="text-xs font-semibold px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-teal-50 hover:text-teal-600 shrink-0 transition-colors"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Generated Words List */}
          {generatedWords.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {generatedWords.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-lg space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xl font-black text-teal-600 dark:text-teal-400">
                        {item.word}
                      </h4>
                      <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                        {item.translation}
                      </p>
                      <span className="text-[11px] font-mono text-zinc-400">
                        Pronunciación: {item.phonetic}
                      </span>
                    </div>

                    <button
                      onClick={() => speakText(item.word)}
                      className="p-2.5 rounded-xl bg-teal-50 dark:bg-zinc-800 text-teal-600 dark:text-teal-400 hover:bg-teal-100 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-100 dark:border-zinc-700/50 text-xs space-y-1">
                    <p className="font-extrabold text-zinc-800 dark:text-zinc-200">
                      "{item.exampleEn}"
                    </p>
                    <p className="font-medium text-zinc-500 dark:text-zinc-400 italic">
                      ({item.exampleEs})
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {generatorError && (
            <div className="p-4 rounded-2xl bg-rose-100 text-rose-900 text-xs font-bold border border-rose-300">
              {generatorError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
