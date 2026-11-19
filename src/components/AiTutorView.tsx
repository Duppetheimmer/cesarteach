import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Bot,
  Send,
  Mic,
  Volume2,
  Sparkles,
  MessageSquare,
  Coffee,
  Hotel,
  Plane,
  ShoppingBag,
  Lightbulb,
  User,
  Zap
} from 'lucide-react';
import { playSpeech } from '../utils/speech';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  grammarTip?: string;
  suggestions?: string[];
  timestamp: string;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  aiRole: string;
  userRole: string;
  objective: string;
  initialMessage: string;
}

const ENGLISH_SCENARIOS: Scenario[] = [
  {
    id: 'free',
    title: 'Conversación Libre A1',
    description: 'Charla relajada sobre hobbies, familia, clima y actividades diarias.',
    icon: <MessageSquare className="w-5 h-5 text-indigo-500" />,
    aiRole: 'Aria, una tutora amable de inglés A1',
    userRole: 'Estudiante de inglés',
    objective: 'Practicar saludos, preguntas simples y respuestas cortas',
    initialMessage: 'Hello! My name is Aria. I am your AI English tutor. How are you doing today?'
  },
  {
    id: 'cafe',
    title: 'Cafetería en Nueva York',
    description: 'Pide tu café favorito, consulta opciones y paga la cuenta.',
    icon: <Coffee className="w-5 h-5 text-amber-500" />,
    aiRole: 'Barista en una cafetería neoyorquina',
    userRole: 'Cliente buscando un café',
    objective: 'Ordenar bebida, comida y pagar usando "Can I get..." o "I would like..."',
    initialMessage:
      'Hi there! Welcome to Central Perk Cafe. What can I get started for you today?'
  },
  {
    id: 'hotel',
    title: 'Check-in en Hotel',
    description: 'Haz la entrada en el hotel, pregunta por el Wi-Fi y la hora de salida.',
    icon: <Hotel className="w-5 h-5 text-sky-500" />,
    aiRole: 'Recepcionista de hotel en Londres',
    userRole: 'Huésped llegando al hotel',
    objective: 'Dar tu nombre de reserva y pedir información básica de la habitación',
    initialMessage:
      'Good afternoon! Welcome to the Grand Hotel. Do you have a reservation with us?'
  },
  {
    id: 'airport',
    title: 'Control de Pasaportes',
    description: 'Responde preguntas básicas sobre el propósito de tu viaje en el aeropuerto.',
    icon: <Plane className="w-5 h-5 text-purple-500" />,
    aiRole: 'Oficial de inmigración en el aeropuerto',
    userRole: 'Pasajero en la aduana',
    objective: 'Explicar motivo de viaje (vacaciones/negocios) y duración de estancia',
    initialMessage: 'Next please! Hello. May I see your passport and customs form, please?'
  },
  {
    id: 'shopping',
    title: 'Tienda de Ropa',
    description: 'Consulta por tallas, precios y probadores en una tienda.',
    icon: <ShoppingBag className="w-5 h-5 text-emerald-500" />,
    aiRole: 'Vendedor en una tienda de ropa',
    userRole: 'Comprador buscando una camiseta o chaqueta',
    objective: 'Preguntar precios con "How much is this?" y solicitar probarte ropa',
    initialMessage: 'Hello! Let me know if you need any help finding sizes today!'
  }
];

const SPANISH_SCENARIOS: Scenario[] = [
  {
    id: 'free',
    title: 'Free Spanish Chat',
    description: 'Relaxed conversation about hobbies, family, weather, and daily routines.',
    icon: <MessageSquare className="w-5 h-5 text-indigo-500" />,
    aiRole: 'Aria, a friendly Spanish tutor for English speakers',
    userRole: 'English-speaking student learning Spanish',
    objective: 'Practice greetings, simple questions, and short answers in Spanish',
    initialMessage:
      '¡Hola! Me llamo Aria. Soy tu tutora de español. ¿Cómo estás hoy? (How are you today?)'
  },
  {
    id: 'cafe',
    title: 'Café in Madrid',
    description: 'Order your favorite coffee, ask about pastries, and ask for the bill.',
    icon: <Coffee className="w-5 h-5 text-amber-500" />,
    aiRole: 'Waiter at a café in Madrid',
    userRole: 'Customer ordering coffee in Spanish',
    objective: 'Order drinks and food using "Me gustaría..." or "¿Me pone...?"',
    initialMessage:
      '¡Hola! Bienvenido a la Cafetería Sol. ¿Qué le gustaría tomar hoy? (What would you like to drink today?)'
  },
  {
    id: 'hotel',
    title: 'Hotel Check-In',
    description: 'Check in at a hotel, ask for the Wi-Fi password and breakfast time.',
    icon: <Hotel className="w-5 h-5 text-sky-500" />,
    aiRole: 'Hotel receptionist in Barcelona',
    userRole: 'Guest arriving at the hotel',
    objective: 'Give your reservation name and ask basic questions about your room',
    initialMessage:
      '¡Buenas tardes! Bienvenido al Gran Hotel. ¿Tiene usted una reservación? (Do you have a reservation?)'
  },
  {
    id: 'airport',
    title: 'Passport Control',
    description: 'Answer basic questions about the purpose of your trip at customs.',
    icon: <Plane className="w-5 h-5 text-purple-500" />,
    aiRole: 'Immigration officer at the airport',
    userRole: 'Traveler arriving at customs',
    objective: 'Explain the purpose of your trip (vacaciones/trabajo) and length of stay',
    initialMessage:
      '¡Hola! Siguiente, por favor. ¿Me permite ver su pasaporte? (May I see your passport?)'
  },
  {
    id: 'shopping',
    title: 'Clothing Store',
    description: 'Ask about sizes, prices, and fitting rooms in a Spanish shop.',
    icon: <ShoppingBag className="w-5 h-5 text-emerald-500" />,
    aiRole: 'Sales assistant at a clothing store',
    userRole: 'Shopper looking for a shirt or jacket',
    objective: 'Ask prices with "¿Cuánto cuesta esto?" and ask to try clothes on',
    initialMessage:
      '¡Hola! Avíseme si necesita ayuda para buscar alguna talla hoy. (Let me know if you need help finding a size today!)'
  }
];

interface AiTutorViewProps {
  onEarnXp?: (xp: number) => void;
  courseLanguage?: 'en' | 'es';
}

export function AiTutorView({ onEarnXp, courseLanguage = 'en' }: AiTutorViewProps) {
  const isSpanishCourse = courseLanguage === 'es';
  const activeScenarios = isSpanishCourse ? SPANISH_SCENARIOS : ENGLISH_SCENARIOS;

  const [selectedScenario, setSelectedScenario] = useState<Scenario>(activeScenarios[0]);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);

  const getInitialSuggestions = (id: string, isEs: boolean) => {
    if (isEs) {
      switch (id) {
        case 'cafe':
          return [
            'Me gustaría un café con leche, por favor.',
            '¿Tienen cruasanes frescos?',
            'La cuenta, por favor.'
          ];
        case 'hotel':
          return [
            'Sí, tengo una reservación a mi nombre.',
            '¿A qué hora es el desayuno?',
            '¿Cuál es la clave del Wi-Fi?'
          ];
        case 'airport':
          return [
            'Aquí está mi pasaporte.',
            'Viajo por vacaciones durante cinco días.',
            'Me quedo en un hotel.'
          ];
        case 'shopping':
          return [
            '¿Cuánto cuesta esta chaqueta?',
            '¿Tiene esto en talla mediana?',
            '¿Dónde están los probadores?'
          ];
        default:
          return [
            '¡Hola Aria! Estoy muy bien, gracias.',
            'Quiero practicar mi español hoy.',
            '¿Qué tal tu día?'
          ];
      }
    }
    switch (id) {
      case 'cafe':
        return ['Can I get a coffee, please?', 'Do you have fresh muffins?', 'I would like a tea.'];
      case 'hotel':
        return [
          'Yes, I have a reservation under my name.',
          'Hello! Can I check in now?',
          'Where is the elevator?'
        ];
      case 'airport':
        return [
          'Here is my passport.',
          'I am traveling for vacation for 5 days.',
          'I stay at a hotel.'
        ];
      case 'shopping':
        return [
          'How much is this jacket?',
          'Do you have this in medium?',
          'Where are the fitting rooms?'
        ];
      default:
        return [
          'Hello Aria! I am good, thank you.',
          'I want to practice my English.',
          'How is your day?'
        ];
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: '1',
      role: 'assistant',
      content: activeScenarios[0].initialMessage,
      suggestions: getInitialSuggestions('free', isSpanishCourse),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  useEffect(() => {
    const firstScen = isSpanishCourse ? SPANISH_SCENARIOS[0] : ENGLISH_SCENARIOS[0];
    setSelectedScenario(firstScen);
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: firstScen.initialMessage,
        suggestions: getInitialSuggestions(firstScen.id, isSpanishCourse),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [isSpanishCourse]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const speakText = (text: string) => {
    const cleanText = text
      .split('💡')[0]
      .replace(/\(.*?\)/g, '')
      .trim();
    playSpeech(cleanText, {
      courseLanguage,
      rate: 0.9
    });
  };

  const startVoiceInput = () => {
    setVoiceNotice(null);
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setVoiceNotice(
        isSpanishCourse
          ? 'Your browser does not support live voice input. You can type your response directly below.'
          : 'Tu navegador no admite reconocimiento de voz en tiempo real. Puedes escribir tu respuesta directamente abajo.'
      );
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = isSpanishCourse ? 'es-ES' : 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSelectScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: scenario.initialMessage,
        suggestions: getInitialSuggestions(scenario.id, isSpanishCourse),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const parseReply = (rawReply: string) => {
    let mainContent = rawReply;
    let grammarTip: string | undefined = undefined;

    if (rawReply.includes('💡 Consejo de Gramática') || rawReply.includes('💡 Grammar Tip')) {
      const parts = rawReply.split(/💡 (?:Consejo de Gramática|Grammar Tip).*?:/i);
      mainContent = parts[0].trim();
      if (parts[1]) {
        grammarTip = parts[1].trim();
      }
    } else if (rawReply.includes('💡')) {
      const parts = rawReply.split('💡');
      mainContent = parts[0].trim();
      grammarTip = parts[1].trim();
    }

    return { mainContent, grammarTip };
  };

  const handleSend = async (customText?: string) => {
    const messageText = customText || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          scenario: selectedScenario.id !== 'free' ? selectedScenario : undefined,
          targetLang: courseLanguage
        })
      });

      const data = await response.json();

      if (data.success && data.reply) {
        const { mainContent, grammarTip } = parseReply(data.reply);

        const assistantMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: mainContent,
          grammarTip,
          suggestions: extractOrGenerateSuggestions(
            mainContent,
            selectedScenario.id,
            isSpanishCourse
          ),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, assistantMsg]);
        speakText(mainContent);

        if (onEarnXp) {
          onEarnXp(15);
        }
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isSpanishCourse
          ? '¡Eso suena muy bien! ¿Qué más te gustaría decir en español? (That sounds great! What else would you like to say in Spanish?)'
          : 'That sounds great! What else would you like to say? (¡Suena genial! ¿Qué más te gustaría decir?)',
        suggestions: isSpanishCourse
          ? ['Me gusta aprender español.', '¿Puedes ayudarme con una pregunta?', '¡Muchas gracias!']
          : ['I like learning English.', 'Can you help me with a question?', 'Thank you!'],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const extractOrGenerateSuggestions = (
    reply: string,
    scenarioId: string,
    isEs: boolean
  ): string[] => {
    const lower = reply.toLowerCase();
    if (isEs) {
      if (scenarioId === 'cafe') {
        if (lower.includes('tamaño') || lower.includes('bebida'))
          return ['Grande, por favor.', 'Un café helado pequeño.', 'Un capuchino caliente.'];
        return ['Aquí tiene.', '¿Puedo pagar con tarjeta?', '¡Muchas gracias!'];
      }
      if (scenarioId === 'hotel') {
        return ['Mi nombre es Alex.', '¿Cuál es la clave del Wi-Fi?', '¡Muchas gracias!'];
      }
      return ['¡Qué interesante!', '¿Puedes explicarme eso?', 'Entiendo. ¿Y tú?'];
    }
    if (scenarioId === 'cafe') {
      if (lower.includes('size') || lower.includes('drink'))
        return ['Large, please.', 'Small iced coffee, please.', 'A hot cappuccino.'];
      if (lower.includes('else') || lower.includes('food'))
        return ['A blueberry muffin, please.', 'Nothing else, thanks.', 'How much is it?'];
      return ['Here you go.', 'Can I pay by card?', 'Thank you!'];
    }
    if (scenarioId === 'hotel') {
      if (lower.includes('name'))
        return ['My name is Alex Smith.', 'Under Smith, please.', 'Here is my ID.'];
      if (lower.includes('room') || lower.includes('key'))
        return ['What is the Wi-Fi code?', 'What time is breakfast?', 'Thank you so much!'];
      return ['Is breakfast included?', 'Where is the elevator?', 'Have a good day.'];
    }
    return ['That is interesting!', 'Can you explain that?', 'I understand. What about you?'];
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 md:p-8 text-white mb-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="inline-block px-3 py-0.5 rounded-full bg-black/20 text-[10px] font-black uppercase tracking-wider mb-1">
                {isSpanishCourse
                  ? '🤖 Interactive AI Spanish Tutor'
                  : '🤖 Tutoría Virtual Inteligente de Inglés'}
              </span>
              <h1 className="text-2xl md:text-3xl font-black">
                {isSpanishCourse
                  ? 'Aria — Your Spanish Conversation Tutor'
                  : 'Aria — Tu Tutora de Inglés'}
              </h1>
              <p className="text-xs md:text-sm text-white/90 font-medium">
                {isSpanishCourse
                  ? 'Practice real-world Spanish conversations without fear. Aria explains grammar tips in clear English!'
                  : 'Conversa en inglés sin miedo a equivocarte. Aria corregirá tus errores explicándote en español.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black shrink-0">
            <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>{isSpanishCourse ? '+15 XP per reply' : '+15 XP por respuesta'}</span>
          </div>
        </div>
      </div>

      {/* Scenario Selector Horizontal Scroll */}
      <div className="mb-6">
        <span className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 block px-1">
          {isSpanishCourse ? 'Choose a Practice Scenario:' : 'Elige un Escenario de Práctica:'}
        </span>
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {activeScenarios.map(scen => {
            const isSelected = selectedScenario.id === scen.id;
            return (
              <button
                key={scen.id}
                onClick={() => handleSelectScenario(scen)}
                className={`p-3.5 rounded-2xl border-2 text-left shrink-0 transition-all flex items-center gap-3 ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:border-indigo-300'
                }`}
              >
                <div
                  className={`p-2 rounded-xl shrink-0 ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-zinc-100 dark:bg-zinc-800'
                  }`}
                >
                  {scen.icon}
                </div>
                <div>
                  <h4 className="text-xs font-black leading-tight">{scen.title}</h4>
                  <p
                    className={`text-[10px] font-medium max-w-[160px] truncate ${
                      isSelected ? 'text-white/80' : 'text-zinc-500'
                    }`}
                  >
                    {scen.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {voiceNotice && (
        <div className="mb-4 p-3 rounded-2xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold">
          {voiceNotice}
        </div>
      )}

      {/* Main Chat Interface */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl overflow-hidden flex flex-col h-[560px]">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map(msg => {
            const isAss = msg.role === 'assistant';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-3 ${isAss ? '' : 'flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    isAss
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white'
                  }`}
                >
                  {isAss ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                {/* Bubble Container */}
                <div className={`max-w-[82%] space-y-2 ${isAss ? 'text-left' : 'text-right'}`}>
                  <div
                    className={`p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm relative group ${
                      isAss
                        ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-tl-none border border-zinc-200/80 dark:border-zinc-700/60'
                        : 'bg-indigo-600 text-white rounded-tr-none'
                    }`}
                  >
                    <p>{msg.content}</p>

                    {/* Audio button for assistant */}
                    {isAss && (
                      <button
                        onClick={() => speakText(msg.content)}
                        className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />{' '}
                        {isSpanishCourse ? 'Listen in Spanish' : 'Escuchar Voz en Inglés'}
                      </button>
                    )}
                  </div>

                  {/* Grammar Tip Card if present */}
                  {msg.grammarTip && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs text-left"
                    >
                      <div className="flex items-center gap-1.5 font-black text-amber-700 dark:text-amber-400 mb-1">
                        <Lightbulb className="w-4 h-4 fill-amber-400 text-amber-500" />
                        <span>
                          {isSpanishCourse
                            ? "💡 Aria's Grammar Tip (in English):"
                            : '💡 Consejos de Aria para mejorar (en Español):'}
                        </span>
                      </div>
                      <p className="font-semibold leading-normal">{msg.grammarTip}</p>
                    </motion.div>
                  )}

                  {/* Timestamp */}
                  <span className="text-[10px] text-zinc-400 font-semibold px-1 block">
                    {msg.timestamp}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center">
                <Bot className="w-5 h-5 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />{' '}
                {isSpanishCourse
                  ? 'Aria is writing a reply...'
                  : 'Aria está escribiendo tu respuesta...'}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Replies */}
        {messages.length > 0 && messages[messages.length - 1].suggestions && !isLoading && (
          <div className="px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[10px] font-black uppercase text-zinc-400 shrink-0">
              {isSpanishCourse ? '💡 Quick replies:' : '💡 Opciones:'}
            </span>
            {messages[messages.length - 1].suggestions?.map((sug, i) => (
              <button
                key={i}
                onClick={() => handleSend(sug)}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-indigo-200 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 text-xs font-bold shrink-0 transition-colors shadow-sm"
              >
                "{sug}"
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-3 md:p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
          <button
            onClick={startVoiceInput}
            title={isSpanishCourse ? 'Speak with microphone (optional)' : 'Hablar por micrófono (opcional)'}
            className={`p-3 rounded-2xl transition-all shrink-0 ${
              isListening
                ? 'bg-rose-500 text-white animate-bounce'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-indigo-100 hover:text-indigo-600'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={
              isListening
                ? isSpanishCourse
                  ? 'Listening to your Spanish...'
                  : 'Escuchando tu voz...'
                : isSpanishCourse
                  ? 'Type your reply in Spanish...'
                  : 'Escribe tu respuesta en inglés...'
            }
            className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-2xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all shrink-0 shadow-md"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
