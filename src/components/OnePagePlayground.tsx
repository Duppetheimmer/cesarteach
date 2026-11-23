import React, { useState, useMemo } from 'react';
import { LessonStep, UserProgress, SectionTab, CEFRLevel } from '../types';
import { playSpeech } from '../utils/speech';
import { playTactileSound } from '../utils/soundEffects';
import { shuffleOptionsList } from '../utils/shuffleOptions';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Play,
  Lock,
  Award,
  Highlighter,
  Layers,
  Grid,
  Puzzle,
  Lightbulb,
  Headphones
} from 'lucide-react';

interface WordBreakdown {
  word: string;
  meaning: string;
}

interface InteractiveChallenge {
  id: string;
  level: CEFRLevel;
  context: string;
  phrase: string;
  translation: string;
  question: string;
  options: string[];
  correctAnswer: string;
  tip: string;
  scrambleWords: string[];
  scrambleTranslation?: string;
  clozeWord: string;
  clozeDistractors: string[];
  wordNotes: WordBreakdown[];
}

// FOR SPANISH SPEAKERS LEARNING ENGLISH (Explanations in Spanish, Target in English) - 12 Cards (3 per level A1-B2)
const ENGLISH_CHALLENGES: InteractiveChallenge[] = [
  {
    id: 'en_c1',
    level: 'A1',
    context: 'En una cafetería en Londres',
    phrase: 'Could I have an iced coffee to go, please?',
    translation: '¿Me podría dar un café helado para llevar, por favor?',
    question: '¿Qué significa la expresión en inglés "to go" al pedir una bebida?',
    options: ['Para tomar en la mesa', 'Para llevar', 'Sin cafeína', 'Muy caliente'],
    correctAnswer: 'Para llevar',
    tip: '"Could I have..." es la fórmula más educada y natural para pedir cualquier cosa en inglés.',
    scrambleWords: ['Could', 'I', 'have', 'an', 'iced', 'coffee', 'please?'],
    scrambleTranslation: '¿Me podría dar un café helado, por favor?',
    clozeWord: 'coffee',
    clozeDistractors: ['ticket', 'luggage', 'weather'],
    wordNotes: [
      { word: 'Could', meaning: 'Podría (cortesía)' },
      { word: 'I', meaning: 'Yo' },
      { word: 'have', meaning: 'tomar / pedir' },
      { word: 'an', meaning: 'un (antes de vocal)' },
      { word: 'iced', meaning: 'helado' },
      { word: 'coffee', meaning: 'café' },
      { word: 'to', meaning: 'para' },
      { word: 'go,', meaning: 'llevar' },
      { word: 'please?', meaning: '¿por favor?' }
    ]
  },
  {
    id: 'en_c1b',
    level: 'A1',
    context: 'Presentándote en tu primer día',
    phrase: 'Nice to meet you, I work as a designer.',
    translation: 'Mucho gusto en conocerte, trabajo como diseñador(a).',
    question: '¿Qué palabra se usa siempre en inglés después de "work" para decir tu profesión?',
    options: ['as a (work as a...)', 'for a (work for a...)', 'like (work like...)', 'how (work how...)'],
    correctAnswer: 'as a (work as a...)',
    tip: 'En inglés para profesiones siempre decimos "I work as a/an + profesión" (trabajo como...).',
    scrambleWords: ['I', 'work', 'as', 'a', 'designer.'],
    scrambleTranslation: 'Yo trabajo como diseñador(a).',
    clozeWord: 'meet',
    clozeDistractors: ['make', 'sleep', 'drive'],
    wordNotes: [
      { word: 'Nice', meaning: 'Agradable / Mucho gusto' },
      { word: 'to', meaning: 'en / de' },
      { word: 'meet', meaning: 'conocer' },
      { word: 'you,', meaning: 'a ti' },
      { word: 'I', meaning: 'yo' },
      { word: 'work', meaning: 'trabajo' },
      { word: 'as', meaning: 'como (profesión)' },
      { word: 'a', meaning: 'un(a)' },
      { word: 'designer.', meaning: 'diseñador(a)' }
    ]
  },
  {
    id: 'en_c1c',
    level: 'A1',
    context: 'Preguntando direcciones en la ciudad',
    phrase: 'Excuse me, how do I get to the train station?',
    translation: 'Disculpe, ¿cómo llego a la estación de tren?',
    question: '¿Cuál es la estructura natural en inglés para preguntar "¿cómo llego a..."?',
    options: [
      'How do I get to...?',
      'How I arrive in...?',
      'Where I go for...?',
      'What way is to...?'
    ],
    correctAnswer: 'How do I get to...?',
    tip: '"Get to + lugar" significa "llegar a un lugar". Es mucho más natural que el verbo "arrive".',
    scrambleWords: ['How', 'do', 'I', 'get', 'to', 'the', 'station?'],
    scrambleTranslation: '¿Cómo llego a la estación?',
    clozeWord: 'station?',
    clozeDistractors: ['kitchen?', 'pencil?', 'blanket?'],
    wordNotes: [
      { word: 'Excuse', meaning: 'Disculpe' },
      { word: 'me,', meaning: 'a mí' },
      { word: 'how', meaning: 'cómo' },
      { word: 'do', meaning: '(auxiliar pregunta)' },
      { word: 'I', meaning: 'yo' },
      { word: 'get', meaning: 'llego' },
      { word: 'to', meaning: 'a' },
      { word: 'the', meaning: 'la' },
      { word: 'train', meaning: 'tren' },
      { word: 'station?', meaning: 'estación?' }
    ]
  },
  {
    id: 'en_c2',
    level: 'A2',
    context: 'Charla casual con nuevos amigos',
    phrase: 'I have been living here for three years.',
    translation: 'Llevo viviendo aquí tres años.',
    question: '¿Por qué usamos "for" en lugar de "since" en esta oración en inglés?',
    options: [
      'Porque indica un año exacto en el calendario',
      'Porque habla del futuro',
      'Porque indica una cantidad o duración de tiempo (3 years)',
      'Porque es una oración negativa'
    ],
    correctAnswer: 'Porque indica una cantidad o duración de tiempo (3 years)',
    tip: 'En inglés no se dice "I live here since 3 years": usa siempre "have been + -ing" con "for" (duración).',
    scrambleWords: ['I', 'have', 'been', 'living', 'here', 'for', 'three', 'years.'],
    scrambleTranslation: 'Llevo viviendo aquí tres años.',
    clozeWord: 'living',
    clozeDistractors: ['lived', 'lives', 'live'],
    wordNotes: [
      { word: 'I', meaning: 'Yo' },
      { word: 'have', meaning: 'he (auxiliar)' },
      { word: 'been', meaning: 'estado (llevo)' },
      { word: 'living', meaning: 'viviendo' },
      { word: 'here', meaning: 'aquí' },
      { word: 'for', meaning: 'durante / por' },
      { word: 'three', meaning: 'tres' },
      { word: 'years.', meaning: 'años' }
    ]
  },
  {
    id: 'en_c2b',
    level: 'A2',
    context: 'Contando una anécdota del pasado',
    phrase: 'I was cooking dinner when the phone rang.',
    translation: 'Estaba preparando la cena cuando sonó el teléfono.',
    question: '¿Qué tiempo verbal usamos para la acción larga de fondo ("estaba cocinando")?',
    options: [
      'Past Continuous (was/were + -ing)',
      'Future Simple (will + verb)',
      'Present Simple',
      'Imperative'
    ],
    correctAnswer: 'Past Continuous (was/were + -ing)',
    tip: 'Acción larga en progreso (was cooking) + "when" + acción corta que interrumpe en pasado simple (rang).',
    scrambleWords: ['I', 'was', 'cooking', 'dinner', 'when', 'you', 'called.'],
    scrambleTranslation: 'Estaba preparando la cena cuando llamaste.',
    clozeWord: 'cooking',
    clozeDistractors: ['cooked', 'cooks', 'to cook'],
    wordNotes: [
      { word: 'I', meaning: 'Yo' },
      { word: 'was', meaning: 'estaba' },
      { word: 'cooking', meaning: 'cocinando' },
      { word: 'dinner', meaning: 'la cena' },
      { word: 'when', meaning: 'cuando' },
      { word: 'the', meaning: 'el' },
      { word: 'phone', meaning: 'teléfono' },
      { word: 'rang.', meaning: 'sonó (pasado de ring)' }
    ]
  },
  {
    id: 'en_c2c',
    level: 'A2',
    context: 'Comparando dos opciones de viaje',
    phrase: 'Taking the train is much faster than driving.',
    translation: 'Tomar el tren es mucho más rápido que conducir.',
    question: '¿Qué palabra intensifica un comparativo en inglés ("mucho más rápido")?',
    options: ['much (much faster)', 'very (very faster)', 'more (more faster)', 'too (too faster)'],
    correctAnswer: 'much (much faster)',
    tip: 'Nunca digas "very faster" ni "more faster": para decir "mucho más + adjetivo", usa "much + comparativo".',
    scrambleWords: ['The', 'train', 'is', 'much', 'faster', 'than', 'driving.'],
    scrambleTranslation: 'El tren es mucho más rápido que conducir.',
    clozeWord: 'faster',
    clozeDistractors: ['fastest', 'more fast', 'fastly'],
    wordNotes: [
      { word: 'Taking', meaning: 'Tomar (al inicio)' },
      { word: 'the', meaning: 'el' },
      { word: 'train', meaning: 'tren' },
      { word: 'is', meaning: 'es' },
      { word: 'much', meaning: 'mucho (con comparativos)' },
      { word: 'faster', meaning: 'más rápido' },
      { word: 'than', meaning: 'que (comparación)' },
      { word: 'driving.', meaning: 'conducir' }
    ]
  },
  {
    id: 'en_c3',
    level: 'B1',
    context: 'Organizando planes de fin de semana',
    phrase: 'Let’s play it by ear tomorrow afternoon.',
    translation: 'Vamos viendo sobre la marcha mañana por la tarde.',
    question: '¿Qué propone alguien cuando dice la expresión "play it by ear"?',
    options: [
      'Escuchar un concierto en vivo',
      'Improvisar y decidir según vayan surgiendo las cosas',
      'Seguir un plan estricto paso a paso',
      'Cancelar todos los planes'
    ],
    correctAnswer: 'Improvisar y decidir según vayan surgiendo las cosas',
    tip: 'Viene de la música ("tocar de oído" sin partitura) y hoy significa fluir sin un plan rígido.',
    scrambleWords: ['Let’s', 'play', 'it', 'by', 'ear', 'tomorrow.'],
    scrambleTranslation: 'Vamos viendo sobre la marcha mañana.',
    clozeWord: 'ear',
    clozeDistractors: ['eye', 'hand', 'foot'],
    wordNotes: [
      { word: 'Let’s', meaning: 'Vamos a (propuesta)' },
      { word: 'play', meaning: 'tocar / jugar' },
      { word: 'it', meaning: 'eso (la situación)' },
      { word: 'by', meaning: 'de / por' },
      { word: 'ear', meaning: 'oído (sobre la marcha)' },
      { word: 'tomorrow', meaning: 'mañana' },
      { word: 'afternoon.', meaning: 'por la tarde' }
    ]
  },
  {
    id: 'en_c3b',
    level: 'B1',
    context: 'Situaciones hipotéticas (Second Conditional)',
    phrase: 'If I were in your shoes, I would accept the offer.',
    translation: 'Si yo estuviera en tu lugar, aceptaría la oferta.',
    question: '¿Qué significa la expresión idiomática "in your shoes"?',
    options: [
      'En tu lugar / en tu situación',
      'Buscando zapatos nuevos',
      'Caminando muy rápido',
      'Sin estar preparado'
    ],
    correctAnswer: 'En tu lugar / en tu situación',
    tip: '"If I were in your shoes, I would..." es la fórmula B1 ideal para dar consejos empáticos.',
    scrambleWords: ['If', 'I', 'were', 'you,', 'I', 'would', 'accept', 'it.'],
    scrambleTranslation: 'Si yo fuera tú, lo aceptaría.',
    clozeWord: 'would',
    clozeDistractors: ['will', 'did', 'am'],
    wordNotes: [
      { word: 'If', meaning: 'Si (condicional)' },
      { word: 'I', meaning: 'yo' },
      { word: 'were', meaning: 'estuviera / fuera' },
      { word: 'in', meaning: 'en' },
      { word: 'your', meaning: 'tus' },
      { word: 'shoes,', meaning: 'zapatos (tu lugar)' },
      { word: 'I', meaning: 'yo' },
      { word: 'would', meaning: '(terminación -ría)' },
      { word: 'accept', meaning: 'aceptaría' },
      { word: 'the', meaning: 'la' },
      { word: 'offer.', meaning: 'oferta' }
    ]
  },
  {
    id: 'en_c3c',
    level: 'B1',
    context: 'Hábitos y adaptación (Used to vs Be used to)',
    phrase: 'I am getting used to waking up early every day.',
    translation: 'Me estoy acostumbrando a despertarme temprano todos los días.',
    question: '¿Por qué el verbo "wake" lleva "-ing" (waking) después de "getting used to"?',
    options: [
      'Porque en "be/get used to" (acostumbrarse a), "to" es una preposición y exige verbo con -ing',
      'Porque habla de algo que ocurrió hace diez años',
      'Porque todos los verbos en inglés llevan -ing',
      'Porque es una orden negativa'
    ],
    correctAnswer: 'Porque en "be/get used to" (acostumbrarse a), "to" es una preposición y exige verbo con -ing',
    tip: '"I used to wake up" = Yo solía despertarme. "I am getting used to waking up" = Me estoy acostumbrando a despertarme.',
    scrambleWords: ['I', 'am', 'used', 'to', 'waking', 'up', 'early.'],
    scrambleTranslation: 'Estoy acostumbrado a despertarme temprano.',
    clozeWord: 'waking',
    clozeDistractors: ['wake', 'woke', 'woken'],
    wordNotes: [
      { word: 'I', meaning: 'Yo' },
      { word: 'am', meaning: 'estoy' },
      { word: 'getting', meaning: 'volviéndome' },
      { word: 'used', meaning: 'acostumbrado' },
      { word: 'to', meaning: 'a (preposición)' },
      { word: 'waking', meaning: 'despertarme (-ing)' },
      { word: 'up', meaning: '(partícula)' },
      { word: 'early', meaning: 'temprano' },
      { word: 'every', meaning: 'todos los' },
      { word: 'day.', meaning: 'días' }
    ]
  },
  {
    id: 'en_c4',
    level: 'B2',
    context: 'Reunión profesional internacional',
    phrase: 'Had I known about the traffic, I would have left earlier.',
    translation: 'De haber sabido del tráfico, habría salido más temprano.',
    question: '¿Qué logra empezar la frase con "Had I known..."?',
    options: [
      'Convierte la frase en una orden directa',
      'Habla de una rutina diaria en presente',
      'Reemplaza "If I had known" con una inversión condicional elegante de nivel B2',
      'Expresa una obligación futura'
    ],
    correctAnswer: 'Reemplaza "If I had known" con una inversión condicional elegante de nivel B2',
    tip: 'Esta inversión condicional equivale en español a "De haber sabido..." y demuestra gran dominio.',
    scrambleWords: ['Had', 'I', 'known,', 'I', 'would', 'have', 'left', 'earlier.'],
    scrambleTranslation: 'De haber sabido, habría salido más temprano.',
    clozeWord: 'known',
    clozeDistractors: ['knew', 'know', 'knowing'],
    wordNotes: [
      { word: 'Had', meaning: 'De haber (inversión)' },
      { word: 'I', meaning: 'yo' },
      { word: 'known', meaning: 'sabido' },
      { word: 'about', meaning: 'sobre / acerca de' },
      { word: 'the', meaning: 'el' },
      { word: 'traffic,', meaning: 'tráfico' },
      { word: 'I', meaning: 'yo' },
      { word: 'would', meaning: 'habría (condicional)' },
      { word: 'have', meaning: 'haber' },
      { word: 'left', meaning: 'salido / partido' },
      { word: 'earlier.', meaning: 'más temprano' }
    ]
  },
  {
    id: 'en_c4b',
    level: 'B2',
    context: 'Énfasis formal con inversión negativa',
    phrase: 'Rarely have I seen such an impressive presentation.',
    translation: 'Rara vez he visto una presentación tan impresionante.',
    question: '¿Qué ocurre con el orden de las palabras cuando empezamos con "Rarely" o "Never"?',
    options: [
      'Se invierte el auxiliar antes del sujeto ("have I seen" en vez de "I have seen")',
      'Se elimina el verbo principal',
      'Se cambia toda la frase a futuro simple',
      'No cambia nada en el orden'
    ],
    correctAnswer: 'Se invierte el auxiliar antes del sujeto ("have I seen" en vez de "I have seen")',
    tip: 'En nivel B2, al poner un adverbio negativo al inicio (Rarely, Seldom, Never), invertimos como en una pregunta: "Rarely have I seen...".',
    scrambleWords: ['Rarely', 'have', 'I', 'seen', 'such', 'talent.'],
    scrambleTranslation: 'Rara vez he visto tanto talento.',
    clozeWord: 'Rarely',
    clozeDistractors: ['Always', 'Because', 'Unless'],
    wordNotes: [
      { word: 'Rarely', meaning: 'Rara vez' },
      { word: 'have', meaning: 'he (auxiliar invertido)' },
      { word: 'I', meaning: 'yo' },
      { word: 'seen', meaning: 'visto' },
      { word: 'such', meaning: 'tan' },
      { word: 'an', meaning: 'una' },
      { word: 'impressive', meaning: 'impresionante' },
      { word: 'presentation.', meaning: 'presentación' }
    ]
  },
  {
    id: 'en_c4c',
    level: 'B2',
    context: 'Deducción lógica sobre el pasado',
    phrase: 'She must have forgotten her phone at the office.',
    translation: 'Ella debe de haber olvidado su teléfono en la oficina.',
    question: '¿Cómo expresamos en inglés una deducción casi segura sobre algo que ya pasó?',
    options: [
      'must have + participio pasado (must have forgotten)',
      'must to forget',
      'should forgotten',
      'can forget yesterday'
    ],
    correctAnswer: 'must have + participio pasado (must have forgotten)',
    tip: 'Para deducir qué pasó: "must have + participio" (estoy 95% seguro de que ocurrió) o "can\'t have + participio" (es imposible que haya ocurrido).',
    scrambleWords: ['She', 'must', 'have', 'forgotten', 'her', 'phone.'],
    scrambleTranslation: 'Ella debe de haber olvidado su teléfono.',
    clozeWord: 'forgotten',
    clozeDistractors: ['forget', 'forgets', 'forgetting'],
    wordNotes: [
      { word: 'She', meaning: 'Ella' },
      { word: 'must', meaning: 'debe de (deducción)' },
      { word: 'have', meaning: 'haber' },
      { word: 'forgotten', meaning: 'olvidado' },
      { word: 'her', meaning: 'su' },
      { word: 'phone', meaning: 'teléfono' },
      { word: 'at', meaning: 'en' },
      { word: 'the', meaning: 'la' },
      { word: 'office.', meaning: 'oficina' }
    ]
  }
];

// FOR ENGLISH SPEAKERS LEARNING SPANISH (Explanations in English, Target in Spanish) - 12 Cards (3 per level A1-B2)
const SPANISH_CHALLENGES: InteractiveChallenge[] = [
  {
    id: 'es_c1',
    level: 'A1',
    context: 'At a restaurant in Madrid',
    phrase: '¿Me trae la cuenta cuando pueda, por favor?',
    translation: 'Could you bring me the check when you can, please?',
    question: 'How do you politely ask for the bill/check in a Spanish restaurant?',
    options: ['La receta, por favor', 'La cuenta, por favor', 'El recibo de luz', 'La maleta, por favor'],
    correctAnswer: 'La cuenta, por favor',
    tip: 'Adding "cuando pueda" ("whenever you can") softens the request and sounds very polite across the Spanish-speaking world.',
    scrambleWords: ['¿Me', 'trae', 'la', 'cuenta,', 'por', 'favor?'],
    scrambleTranslation: 'Could you bring me the check, please?',
    clozeWord: 'cuenta',
    clozeDistractors: ['maleta', 'ventana', 'lluvia'],
    wordNotes: [
      { word: '¿Me', meaning: 'To me' },
      { word: 'trae', meaning: 'you bring (formal)' },
      { word: 'la', meaning: 'the' },
      { word: 'cuenta', meaning: 'bill / check' },
      { word: 'cuando', meaning: 'when' },
      { word: 'pueda,', meaning: 'you can (polite)' },
      { word: 'por', meaning: 'for' },
      { word: 'favor?', meaning: 'please?' }
    ]
  },
  {
    id: 'es_c1b',
    level: 'A1',
    context: 'Introducing your origin and location (Ser vs Estar)',
    phrase: 'Soy de Chicago, pero ahora estoy en Ciudad de México.',
    translation: 'I am from Chicago, but right now I am in Mexico City.',
    question: 'Why does the first part use "Soy" (Ser) and the second part use "estoy" (Estar)?',
    options: [
      '"Ser" expresses permanent origin (Soy de...), while "Estar" expresses current location (estoy en...)',
      'Because "Soy" is past tense and "estoy" is future tense',
      'They are completely interchangeable in every sentence',
      'Because Mexico City is plural'
    ],
    correctAnswer: '"Ser" expresses permanent origin (Soy de...), while "Estar" expresses current location (estoy en...)',
    tip: 'Origin & Identity = SER (Soy de...). Physical Location & Mood = ESTAR (Estoy en...).',
    scrambleWords: ['Soy', 'de', 'Chicago,', 'pero', 'estoy', 'en', 'México.'],
    scrambleTranslation: 'I am from Chicago, but I am in Mexico.',
    clozeWord: 'estoy',
    clozeDistractors: ['soy', 'eres', 'somos'],
    wordNotes: [
      { word: 'Soy', meaning: 'I am (origin - Ser)' },
      { word: 'de', meaning: 'from' },
      { word: 'Chicago,', meaning: 'Chicago' },
      { word: 'pero', meaning: 'but' },
      { word: 'ahora', meaning: 'now' },
      { word: 'estoy', meaning: 'I am (location - Estar)' },
      { word: 'en', meaning: 'in' },
      { word: 'Ciudad', meaning: 'City' },
      { word: 'de', meaning: 'of' },
      { word: 'México.', meaning: 'Mexico' }
    ]
  },
  {
    id: 'es_c1c',
    level: 'A1',
    context: 'Expressing likes and preferences with Gustar',
    phrase: 'Me encantan los tacos, pero no me gusta el picante.',
    translation: 'I love tacos, but I don’t like spicy food.',
    question: 'Why do we say "Me encantan" (with an -n) for "los tacos" and "me gusta" (without -n) for "el picante"?',
    options: [
      'Because gustar/encantar agrees with the thing liked: plural "los tacos" takes -n, singular "el picante" does not',
      'Because "encantan" is only used in the morning',
      'Because negative verbs never take -n',
      'Because "yo" is plural'
    ],
    correctAnswer: 'Because gustar/encantar agrees with the thing liked: plural "los tacos" takes -n, singular "el picante" does not',
    tip: 'With GUSTAR and ENCANTAR: use singular (gusta/encanta) for 1 thing or an infinitive verb, and plural (gustan/encantan) for plural nouns.',
    scrambleWords: ['Me', 'encantan', 'los', 'tacos', 'de', 'este', 'lugar.'],
    scrambleTranslation: 'I love the tacos from this place.',
    clozeWord: 'encantan',
    clozeDistractors: ['encanta', 'encanto', 'encantar'],
    wordNotes: [
      { word: 'Me', meaning: 'To me' },
      { word: 'encantan', meaning: 'are enchanting (plural)' },
      { word: 'los', meaning: 'the (plural)' },
      { word: 'tacos,', meaning: 'tacos' },
      { word: 'pero', meaning: 'but' },
      { word: 'no', meaning: 'not' },
      { word: 'me', meaning: 'to me' },
      { word: 'gusta', meaning: 'is pleasing (singular)' },
      { word: 'el', meaning: 'the' },
      { word: 'picante.', meaning: 'spicy food' }
    ]
  },
  {
    id: 'es_c2',
    level: 'A2',
    context: 'Talking about childhood memories',
    phrase: 'Cuando era niño, jugaba en este parque todos los días.',
    translation: 'When I was a child, I used to play in this park every day.',
    question: 'Why do we use "era" and "jugaba" in the Imperfect past tense here?',
    options: [
      'Because the action happened only once yesterday afternoon',
      'Because it is a promise about the future',
      'Because they describe an ongoing habit or repeated routine in the past ("used to")',
      'Because it is an imperative command'
    ],
    correctAnswer: 'Because they describe an ongoing habit or repeated routine in the past ("used to")',
    tip: 'Think of the Spanish Imperfect (-aba / -ía) as a background video describing childhood habits and ongoing past scenes.',
    scrambleWords: ['Cuando', 'era', 'niño,', 'jugaba', 'en', 'este', 'parque.'],
    scrambleTranslation: 'When I was a child, I used to play in this park.',
    clozeWord: 'jugaba',
    clozeDistractors: ['jugué', 'jugaré', 'juego'],
    wordNotes: [
      { word: 'Cuando', meaning: 'When' },
      { word: 'era', meaning: 'I was (ongoing)' },
      { word: 'niño,', meaning: 'a child' },
      { word: 'jugaba', meaning: 'I used to play' },
      { word: 'en', meaning: 'in' },
      { word: 'este', meaning: 'this' },
      { word: 'parque', meaning: 'park' },
      { word: 'todos', meaning: 'every / all' },
      { word: 'los', meaning: 'the' },
      { word: 'días.', meaning: 'days' }
    ]
  },
  {
    id: 'es_c2b',
    level: 'A2',
    context: 'Completed Past Action (Preterite / Indefinido)',
    phrase: 'Ayer compré los boletos y reservé el hotel.',
    translation: 'Yesterday I bought the tickets and booked the hotel.',
    question: 'Why do we use the Preterite ("compré", "reservé") instead of the Imperfect ("compraba")?',
    options: [
      'Because they are completed, one-time actions at a specific moment in the past ("Ayer")',
      'Because they describe the weather',
      'Because the speaker still hasn’t bought the tickets',
      'Because they are childhood habits'
    ],
    correctAnswer: 'Because they are completed, one-time actions at a specific moment in the past ("Ayer")',
    tip: 'Time markers like "ayer" (yesterday), "anoche" (last night), and "el lunes pasado" trigger the Preterite (-é / -í).',
    scrambleWords: ['Ayer', 'compré', 'los', 'boletos', 'para', 'el', 'viaje.'],
    scrambleTranslation: 'Yesterday I bought the tickets for the trip.',
    clozeWord: 'compré',
    clozeDistractors: ['compraba', 'compraré', 'compro'],
    wordNotes: [
      { word: 'Ayer', meaning: 'Yesterday' },
      { word: 'compré', meaning: 'I bought (completed)' },
      { word: 'los', meaning: 'the' },
      { word: 'boletos', meaning: 'tickets' },
      { word: 'y', meaning: 'and' },
      { word: 'reservé', meaning: 'I booked (completed)' },
      { word: 'el', meaning: 'the' },
      { word: 'hotel.', meaning: 'hotel' }
    ]
  },
  {
    id: 'es_c2c',
    level: 'A2',
    context: 'Object Pronouns & Duration with "Llevar + Gerundio"',
    phrase: 'Llevo dos años estudiando español todos los días.',
    translation: 'I have been studying Spanish every day for two years.',
    question: 'What is the most natural Spanish formula to say how long you have been doing something?',
    options: [
      'Llevar + time duration + gerund (-ando / -iendo)',
      'Ser + time duration + infinitive',
      'Tener + time duration + past participle',
      'Estar + por + future tense'
    ],
    correctAnswer: 'Llevar + time duration + gerund (-ando / -iendo)',
    tip: '"Llevo + tiempo + verbo en -ando/-iendo" is the #1 natural way native speakers say "I have been doing X for Y time".',
    scrambleWords: ['Llevo', 'dos', 'años', 'estudiando', 'español.'],
    scrambleTranslation: 'I have been studying Spanish for two years.',
    clozeWord: 'estudiando',
    clozeDistractors: ['estudiado', 'estudié', 'estudiar'],
    wordNotes: [
      { word: 'Llevo', meaning: 'I carry / I have been' },
      { word: 'dos', meaning: 'two' },
      { word: 'años', meaning: 'years' },
      { word: 'estudiando', meaning: 'studying (-ando)' },
      { word: 'español', meaning: 'Spanish' },
      { word: 'todos', meaning: 'every' },
      { word: 'los', meaning: 'the' },
      { word: 'días.', meaning: 'days' }
    ]
  },
  {
    id: 'es_c3',
    level: 'B1',
    context: 'Giving recommendations to a friend',
    phrase: 'Te recomiendo que pruebes el plato típico de la región.',
    translation: 'I recommend that you try the traditional dish of the region.',
    question: 'Why do we say "pruebes" (Subjunctive) instead of "pruebas" (Indicative)?',
    options: [
      'Because the sentence is talking about the past',
      'Because verbs of recommendation and advice ("recomiendo que...") trigger the Subjunctive',
      'Because it is a direct question',
      'Because "plato" is masculine'
    ],
    correctAnswer: 'Because verbs of recommendation and advice ("recomiendo que...") trigger the Subjunctive',
    tip: 'Verbs of influence like recomendar, sugerir, aconsejar + "que" + a change of subject always require the Spanish Subjunctive.',
    scrambleWords: ['Te', 'recomiendo', 'que', 'pruebes', 'este', 'plato.'],
    scrambleTranslation: 'I recommend that you try this dish.',
    clozeWord: 'pruebes',
    clozeDistractors: ['pruebas', 'probaste', 'probar'],
    wordNotes: [
      { word: 'Te', meaning: 'To you' },
      { word: 'recomiendo', meaning: 'I recommend' },
      { word: 'que', meaning: 'that (connector)' },
      { word: 'pruebes', meaning: 'you try (subjunctive)' },
      { word: 'el', meaning: 'the' },
      { word: 'plato', meaning: 'dish' },
      { word: 'típico', meaning: 'traditional' },
      { word: 'de', meaning: 'of' },
      { word: 'la', meaning: 'the' },
      { word: 'región.', meaning: 'region' }
    ]
  },
  {
    id: 'es_c3b',
    level: 'B1',
    context: 'Mastering Por vs Para in real life',
    phrase: 'Gracias por tu ayuda; este regalo es para ti.',
    translation: 'Thank you for your help; this gift is for you.',
    question: 'Why do we use "por" in the first half and "para" in the second half?',
    options: [
      '"Por" expresses the cause/reason ("por tu ayuda"), while "para" indicates the recipient/destination ("para ti")',
      'Because "por" is only used before feminine nouns',
      'They mean the exact same thing and can be swapped',
      'Because "para" is only used in questions'
    ],
    correctAnswer: '"Por" expresses the cause/reason ("por tu ayuda"), while "para" indicates the recipient/destination ("para ti")',
    tip: 'Think of POR as looking backward at the cause/motive (Gracias por...), and PARA as looking forward to the recipient or goal (Es para ti).',
    scrambleWords: ['Gracias', 'por', 'venir;', 'esto', 'es', 'para', 'ti.'],
    scrambleTranslation: 'Thanks for coming; this is for you.',
    clozeWord: 'para',
    clozeDistractors: ['por', 'pero', 'sin'],
    wordNotes: [
      { word: 'Gracias', meaning: 'Thanks' },
      { word: 'por', meaning: 'for (reason/motive)' },
      { word: 'tu', meaning: 'your' },
      { word: 'ayuda;', meaning: 'help' },
      { word: 'este', meaning: 'this' },
      { word: 'regalo', meaning: 'gift' },
      { word: 'es', meaning: 'is' },
      { word: 'para', meaning: 'for (recipient)' },
      { word: 'ti.', meaning: 'you' }
    ]
  },
  {
    id: 'es_c3c',
    level: 'B1',
    context: 'Future Time Clauses with "Cuando + Subjunctive"',
    phrase: 'Llámame en cuanto llegues al aeropuerto.',
    translation: 'Call me as soon as you arrive at the airport.',
    question: 'Why does "llegues" use the Subjunctive after "en cuanto" (as soon as)?',
    options: [
      'Because time connectors (cuando, en cuanto) referring to a future action that hasn’t happened yet take the Subjunctive',
      'Because the person already arrived yesterday',
      'Because "aeropuerto" is masculine',
      'Because it is a negative sentence'
    ],
    correctAnswer: 'Because time connectors (cuando, en cuanto) referring to a future action that hasn’t happened yet take the Subjunctive',
    tip: 'When talking about a future event after "cuando" or "en cuanto", Spanish always uses the Present Subjunctive ("cuando llegues", never "cuando llegarás").',
    scrambleWords: ['Llámame', 'en', 'cuanto', 'llegues', ' a', 'casa.'].map(s => s.trim()),
    scrambleTranslation: 'Call me as soon as you get home.',
    clozeWord: 'llegues',
    clozeDistractors: ['llegas', 'llegarás', 'llegaste'],
    wordNotes: [
      { word: 'Llámame', meaning: 'Call me' },
      { word: 'en', meaning: 'in / as' },
      { word: 'cuanto', meaning: 'soon as' },
      { word: 'llegues', meaning: 'you arrive (subjunctive)' },
      { word: 'al', meaning: 'at the (a + el)' },
      { word: 'aeropuerto.', meaning: 'airport' }
    ]
  },
  {
    id: 'es_c4',
    level: 'B2',
    context: 'Hypothetical situations and personal dreams',
    phrase: 'Si tuviera más tiempo libre, aprendería un tercer idioma.',
    translation: 'If I had more free time, I would learn a third language.',
    question: 'Which verb combination forms a hypothetical "If" clause in Spanish?',
    options: [
      'Si + Present Simple, + Past Simple',
      'Si + Future Simple, + Imperative',
      'Si + Imperfect Subjunctive (-ra), + Conditional (-ría)',
      'Si + Gerund, + Infinitive'
    ],
    correctAnswer: 'Si + Imperfect Subjunctive (-ra), + Conditional (-ría)',
    tip: 'Golden Rule: Never put the Conditional (-ría) directly after "Si" (If); always use the Imperfect Subjunctive ("Si tuviera...").',
    scrambleWords: ['Si', 'tuviera', 'tiempo,', 'aprendería', 'otro', 'idioma.'],
    scrambleTranslation: 'If I had time, I would learn another language.',
    clozeWord: 'tuviera',
    clozeDistractors: ['tendría', 'tengo', 'tuve'],
    wordNotes: [
      { word: 'Si', meaning: 'If' },
      { word: 'tuviera', meaning: 'I had (hypothetical)' },
      { word: 'más', meaning: 'more' },
      { word: 'tiempo', meaning: 'time' },
      { word: 'libre,', meaning: 'free' },
      { word: 'aprendería', meaning: 'I would learn' },
      { word: 'un', meaning: 'a' },
      { word: 'tercer', meaning: 'third' },
      { word: 'idioma.', meaning: 'language' }
    ]
  },
  {
    id: 'es_c4b',
    level: 'B2',
    context: 'Concessive Clauses with "Aunque + Subjunctive"',
    phrase: 'Saldremos a caminar aunque llueva esta tarde.',
    translation: 'We will go out for a walk even if it rains this afternoon.',
    question: 'What is the difference between "aunque llueve" (Indicative) and "aunque llueva" (Subjunctive)?',
    options: [
      '"Aunque + Indicative" states a known fact ("although it is raining"), while "Aunque + Subjunctive" expresses a hypothetical obstacle ("even if it rains")',
      'There is no difference at all',
      '"Aunque llueva" only refers to last year',
      '"Aunque llueve" is grammatically incorrect'
    ],
    correctAnswer: '"Aunque + Indicative" states a known fact ("although it is raining"), while "Aunque + Subjunctive" expresses a hypothetical obstacle ("even if it rains")',
    tip: 'In B2 Spanish: Aunque + Indicative = "Although" (fact). Aunque + Subjunctive = "Even if" (hypothetical).',
    scrambleWords: ['Iremos', 'al', 'parque', 'aunque', 'llueva', 'hoy.'],
    scrambleTranslation: 'We will go to the park even if it rains today.',
    clozeWord: 'llueva',
    clozeDistractors: ['llueve', 'lloverá', 'llovió'],
    wordNotes: [
      { word: 'Saldremos', meaning: 'We will go out' },
      { word: 'a', meaning: 'to' },
      { word: 'caminar', meaning: 'walk' },
      { word: 'aunque', meaning: 'even if' },
      { word: 'llueva', meaning: 'it rains (subjunctive)' },
      { word: 'esta', meaning: 'this' },
      { word: 'tarde.', meaning: 'afternoon' }
    ]
  },
  {
    id: 'es_c4c',
    level: 'B2',
    context: 'Past Hypothetical Regrets (Pluperfect Subjunctive)',
    phrase: 'De haberlo sabido antes, te habría avisado de inmediato.',
    translation: 'Had I known it earlier, I would have let you know immediately.',
    question: 'What does the B2 structure "De haberlo sabido..." replace with high elegance?',
    options: [
      'It replaces "Si lo hubiera sabido..." ("If I had known it...")',
      'It replaces a present tense routine',
      'It is used only to order food',
      'It expresses a future obligation'
    ],
    correctAnswer: 'It replaces "Si lo hubiera sabido..." ("If I had known it...")',
    tip: '"De + haber + participio" (De haberlo sabido...) is the Spanish equivalent of the English B2 inversion "Had I known...".',
    scrambleWords: ['De', 'haberlo', 'sabido,', 'te', 'habría', 'avisado.'],
    scrambleTranslation: 'Had I known it, I would have let you know.',
    clozeWord: 'habría',
    clozeDistractors: ['hubiera', 'había', 'haré'],
    wordNotes: [
      { word: 'De', meaning: 'If / Upon (inversion)' },
      { word: 'haberlo', meaning: 'having it' },
      { word: 'sabido', meaning: 'known' },
      { word: 'antes,', meaning: 'earlier' },
      { word: 'te', meaning: 'you' },
      { word: 'habría', meaning: 'I would have' },
      { word: 'avisado', meaning: 'notified / let know' },
      { word: 'de', meaning: 'right' },
      { word: 'inmediato.', meaning: 'away' }
    ]
  }
];

interface PairDeck {
  level: CEFRLevel;
  titleEs: string;
  titleEn: string;
  pairs: { id: string; left: string; right: string }[];
}

const MATCH_PAIR_DECKS_EN: PairDeck[] = [
  {
    level: 'A1',
    titleEs: 'Mazo 1 (A1): Expresiones Esenciales',
    titleEn: 'Deck 1 (A1): Essential Expressions',
    pairs: [
      { id: 'en_p1', left: 'Nice to meet you', right: 'Mucho gusto en conocerte' },
      { id: 'en_p2', left: 'Could I have the bill?', right: '¿Me trae la cuenta?' },
      { id: 'en_p3', left: 'How do I get to...?', right: '¿Cómo llego a...?' },
      { id: 'en_p4', left: 'Just a moment, please', right: 'Un momento, por favor' }
    ]
  },
  {
    level: 'A2',
    titleEs: 'Mazo 2 (A2): Conectores Conversacionales',
    titleEn: 'Deck 2 (A2): Conversational Connectors',
    pairs: [
      { id: 'en_p5', left: 'By the way', right: 'Por cierto' },
      { id: 'en_p6', left: 'As soon as possible', right: 'Lo antes posible' },
      { id: 'en_p7', left: 'It makes sense', right: 'Tiene sentido' },
      { id: 'en_p8', left: 'At the end of the day', right: 'Al final del día / A fin de cuentas' }
    ]
  },
  {
    level: 'B1',
    titleEs: 'Mazo 3 (B1): Modismos y Fluidez Natural',
    titleEn: 'Deck 3 (B1): Idioms & Natural Fluency',
    pairs: [
      { id: 'en_p9', left: 'Let’s play it by ear', right: 'Vamos viendo sobre la marcha' },
      { id: 'en_p10', left: 'If I were in your shoes', right: 'Si yo estuviera en tu lugar' },
      { id: 'en_p11', left: 'To make up your mind', right: 'Tomar una decisión' },
      { id: 'en_p12', left: 'Every now and then', right: 'De vez en cuando' }
    ]
  },
  {
    level: 'B2',
    titleEs: 'Mazo 4 (B2): Registro Profesional y Avanzado',
    titleEn: 'Deck 4 (B2): Professional & Advanced Register',
    pairs: [
      { id: 'en_p13', left: 'Had I known earlier', right: 'De haberlo sabido antes' },
      { id: 'en_p14', left: 'Take into account', right: 'Tener en cuenta / Considerar' },
      { id: 'en_p15', left: 'On the other hand', right: 'Por otra parte / En cambio' },
      { id: 'en_p16', left: 'It goes without saying', right: 'Está de más decirlo / Es evidente' }
    ]
  }
];

const MATCH_PAIR_DECKS_ES: PairDeck[] = [
  {
    level: 'A1',
    titleEs: 'Mazo 1 (A1): Supervivencia en Español',
    titleEn: 'Deck 1 (A1): Survival Spanish',
    pairs: [
      { id: 'es_p1', left: 'Mucho gusto', right: 'Nice to meet you' },
      { id: 'es_p2', left: 'La cuenta, por favor', right: 'The check, please' },
      { id: 'es_p3', left: '¿Dónde está el metro?', right: 'Where is the subway?' },
      { id: 'es_p4', left: 'Con mucho gusto', right: 'Gladly / With pleasure' }
    ]
  },
  {
    level: 'A2',
    titleEs: 'Mazo 2 (A2): Vida Cotidiana',
    titleEn: 'Deck 2 (A2): Everyday Life Connectors',
    pairs: [
      { id: 'es_p5', left: 'Por si acaso', right: 'Just in case' },
      { id: 'es_p6', left: 'De vez en cuando', right: 'Every now and then' },
      { id: 'es_p7', left: 'Vale la pena', right: 'It is worth it' },
      { id: 'es_p8', left: 'Llevo dos años aquí', right: 'I have been here for two years' }
    ]
  },
  {
    level: 'B1',
    titleEs: 'Mazo 3 (B1): Subjuntivo y Expresiones',
    titleEn: 'Deck 3 (B1): Subjunctive & Idioms',
    pairs: [
      { id: 'es_p9', left: 'En cuanto llegues', right: 'As soon as you arrive' },
      { id: 'es_p10', left: 'Te recomiendo que vayas', right: 'I recommend that you go' },
      { id: 'es_p11', left: 'Echar una mano', right: 'To lend a hand / help out' },
      { id: 'es_p12', left: 'Hoy por ti, mañana por mí', right: 'Today for you, tomorrow for me' }
    ]
  },
  {
    level: 'B2',
    titleEs: 'Mazo 4 (B2): Dominio Avanzado',
    titleEn: 'Deck 4 (B2): Advanced Mastery',
    pairs: [
      { id: 'es_p13', left: 'De haberlo sabido antes', right: 'Had I known it earlier' },
      { id: 'es_p14', left: 'Aunque llueva mañana', right: 'Even if it rains tomorrow' },
      { id: 'es_p15', left: 'Sin lugar a dudas', right: 'Without a shadow of a doubt' },
      { id: 'es_p16', left: 'Tomar cartas en el asunto', right: 'To take action on the matter' }
    ]
  }
];

type MarkerColor = 'yellow' | 'mint' | 'coral';

const MARKER_STYLES: Record<MarkerColor, { bg: string; labelEs: string; labelEn: string; dot: string }> = {
  yellow: {
    bg: 'bg-yellow-300 text-slate-950 dark:bg-yellow-400 dark:text-slate-950',
    labelEs: 'Amarillo',
    labelEn: 'Yellow',
    dot: 'bg-yellow-400'
  },
  mint: {
    bg: 'bg-emerald-300 text-slate-950 dark:bg-emerald-400 dark:text-slate-950',
    labelEs: 'Menta',
    labelEn: 'Mint',
    dot: 'bg-emerald-400'
  },
  coral: {
    bg: 'bg-rose-300 text-slate-950 dark:bg-rose-400 dark:text-slate-950',
    labelEs: 'Coral',
    labelEn: 'Coral',
    dot: 'bg-rose-400'
  }
};

interface HeroInteractiveCardProps {
  courseLanguage: 'en' | 'es';
  onEarnXP: (amount: number) => void;
}

export function HeroInteractiveCard({ courseLanguage, onEarnXP }: HeroInteractiveCardProps) {
  const isSpanishCourse = courseLanguage === 'es'; // English native speaker learning Spanish
  const allChallenges = isSpanishCourse ? SPANISH_CHALLENGES : ENGLISH_CHALLENGES;
  const [levelFilter, setLevelFilter] = useState<'ALL' | CEFRLevel>('ALL');
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<'deck' | 'builder' | 'pairs' | 'cloze'>('deck');
  const [markerColor, setMarkerColor] = useState<MarkerColor>('yellow');
  const [highlightedWords, setHighlightedWords] = useState<Record<string, MarkerColor>>({});
  const [activeWordNote, setActiveWordNote] = useState<WordBreakdown | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedClozeAnswer, setSelectedClozeAnswer] = useState<string | null>(null);
  const [pickedWords, setPickedWords] = useState<number[]>([]);
  const [xpAwardedForId, setXpAwardedForId] = useState<Record<string, boolean>>({});

  // Pairs mini-game state across 4 multi-level decks
  const pairDecks = isSpanishCourse ? MATCH_PAIR_DECKS_ES : MATCH_PAIR_DECKS_EN;
  const [activePairDeckIdx, setActivePairDeckIdx] = useState(0);
  const currentPairDeck = pairDecks[activePairDeckIdx % pairDecks.length];
  const pairsData = currentPairDeck.pairs;
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);

  const challenges = useMemo(() => {
    if (levelFilter === 'ALL') return allChallenges;
    const filtered = allChallenges.filter(c => c.level === levelFilter);
    return filtered.length > 0 ? filtered : allChallenges;
  }, [allChallenges, levelFilter]);

  const current = challenges[activeIndex % challenges.length];

  const shuffledChallengeOptions = useMemo(() => {
    const avoidSlot = activeIndex % current.options.length;
    return shuffleOptionsList(current.options, current.correctAnswer, avoidSlot);
  }, [current, activeIndex]);

  const shuffledClozeOptions = useMemo(() => {
    const raw = [current.clozeWord, ...current.clozeDistractors];
    return shuffleOptionsList(raw, current.clozeWord, (activeIndex + 1) % raw.length);
  }, [current, activeIndex]);

  const blankedClozePhrase = useMemo(() => {
    const cleanTarget = current.clozeWord.replace(/[¿?¡!.,]/g, '');
    const regex = new RegExp(`\\b${cleanTarget}\\b`, 'i');
    if (regex.test(current.phrase)) {
      return current.phrase.replace(regex, '_____');
    }
    return current.phrase.replace(current.clozeWord, '_____');
  }, [current]);

  // Guaranteed non-solved Fisher-Yates shuffle for Sentence Magnet tiles
  const shuffledTiles = useMemo(() => {
    const base = current.scrambleWords.map((word, index) => ({ word, originalIndex: index }));
    if (base.length <= 1) return base;
    const arr = [...base];
    // Deterministic-yet-scrambled permutation based on card id + word length so it never starts in 0,1,2,3... order
    for (let i = arr.length - 1; i > 0; i--) {
      const seed = (current.id.charCodeAt(current.id.length - 1) + i * 7) % (i + 1);
      const tmp = arr[i];
      arr[i] = arr[seed];
      arr[seed] = tmp;
    }
    if (arr.every((item, idx) => item.originalIndex === idx)) {
      return [...base].reverse();
    }
    return arr;
  }, [current]);

  // Non-trivial permutation for Right Column of Speed Pairs
  const shuffledRightPairs = useMemo(() => {
    const arr = [...pairsData];
    if (arr.length <= 2) return arr.reverse();
    // Shift by 1 or 2 positions so no item sits directly across from itself
    return arr.map((_, idx) => arr[(idx + 2) % arr.length]);
  }, [pairsData]);

  const handleWordHighlightClick = (w: WordBreakdown, idx: number) => {
    playTactileSound('highlight');
    const key = `${current.id}_${idx}`;
    setHighlightedWords(prev => {
      const next = { ...prev };
      if (next[key] === markerColor) {
        delete next[key];
      } else {
        next[key] = markerColor;
      }
      return next;
    });
    setActiveWordNote(w);
    playSpeech(w.word.replace(/[¿?.,!]/g, ''), { courseLanguage, rate: 0.9 });
  };

  const handleSelectOption = (opt: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(opt);
    if (opt === current.correctAnswer) {
      playTactileSound('stamp');
      playSpeech(current.phrase, { courseLanguage, rate: 0.95 });
      const rewardKey = `${current.id}_quiz`;
      if (!xpAwardedForId[rewardKey]) {
        setXpAwardedForId(prev => ({ ...prev, [rewardKey]: true }));
        onEarnXP(15);
      }
    } else {
      playTactileSound('error');
    }
  };

  const handleSelectClozeOption = (opt: string) => {
    if (selectedClozeAnswer) return;
    setSelectedClozeAnswer(opt);
    if (opt.toLowerCase() === current.clozeWord.toLowerCase()) {
      playTactileSound('stamp');
      playSpeech(current.phrase, { courseLanguage, rate: 0.95 });
      const rewardKey = `${current.id}_cloze`;
      if (!xpAwardedForId[rewardKey]) {
        setXpAwardedForId(prev => ({ ...prev, [rewardKey]: true }));
        onEarnXP(15);
      }
    } else {
      playTactileSound('error');
    }
  };

  const handlePickTile = (tileIdx: number) => {
    playTactileSound('pop');
    if (pickedWords.includes(tileIdx)) {
      setPickedWords(prev => prev.filter(i => i !== tileIdx));
      return;
    }
    const next = [...pickedWords, tileIdx];
    setPickedWords(next);
    playSpeech(shuffledTiles[tileIdx].word.replace(/[¿?.,!]/g, ''), {
      courseLanguage,
      rate: 0.95
    });

    if (next.length === current.scrambleWords.length) {
      const built = next.map(i => shuffledTiles[i].word).join(' ');
      const target = current.scrambleWords.join(' ');
      if (built.toLowerCase() === target.toLowerCase()) {
        playTactileSound('win');
        playSpeech(target, { courseLanguage, rate: 0.95 });
        const rewardKey = `${current.id}_builder`;
        if (!xpAwardedForId[rewardKey]) {
          setXpAwardedForId(prev => ({ ...prev, [rewardKey]: true }));
          onEarnXP(20);
        }
      } else {
        playTactileSound('error');
      }
    }
  };

  // Guided +1 Word Clue for Sentence Magnet
  const handleBuilderHintOneWord = () => {
    let correctPrefixLen = 0;
    while (
      correctPrefixLen < pickedWords.length &&
      shuffledTiles[pickedWords[correctPrefixLen]]?.word.toLowerCase() ===
        current.scrambleWords[correctPrefixLen]?.toLowerCase()
    ) {
      correctPrefixLen++;
    }
    if (correctPrefixLen >= current.scrambleWords.length) return;

    const kept = pickedWords.slice(0, correctPrefixLen);
    const targetWord = current.scrambleWords[correctPrefixLen];
    const nextTileIdx = shuffledTiles.findIndex(
      (t, idx) => !kept.includes(idx) && t.word.toLowerCase() === targetWord.toLowerCase()
    );
    if (nextTileIdx === -1) return;

    const updated = [...kept, nextTileIdx];
    playTactileSound('highlight');
    setPickedWords(updated);

    if (updated.length === current.scrambleWords.length) {
      playTactileSound('win');
      playSpeech(current.scrambleWords.join(' '), { courseLanguage, rate: 0.95 });
    }
  };

  const handleSelectPairRight = (pairId: string, textToSpeak: string) => {
    if (!selectedLeft) return;
    if (selectedLeft === pairId) {
      playTactileSound('stamp');
      playSpeech(textToSpeak, { courseLanguage, rate: 0.95 });
      const nextMatched = Array.from(new Set([...matchedPairIds, pairId]));
      setMatchedPairIds(nextMatched);
      setSelectedLeft(null);
      const deckRewardKey = `pairs_bonus_${currentPairDeck.level}`;
      if (nextMatched.length === pairsData.length && !xpAwardedForId[deckRewardKey]) {
        playTactileSound('win');
        setXpAwardedForId(prev => ({ ...prev, [deckRewardKey]: true }));
        onEarnXP(30);
      }
    } else {
      playTactileSound('error');
      setSelectedLeft(null);
    }
  };

  const handleNextChallenge = () => {
    playTactileSound('flip');
    setSelectedAnswer(null);
    setSelectedClozeAnswer(null);
    setPickedWords([]);
    setActiveWordNote(null);
    setActiveIndex(prev => (prev + 1) % challenges.length);
  };

  const builtSentence = pickedWords.map(i => shuffledTiles[i]?.word).join(' ');
  const isBuilderComplete = pickedWords.length === current.scrambleWords.length;
  const isBuilderCorrect =
    isBuilderComplete &&
    builtSentence.toLowerCase() === current.scrambleWords.join(' ').toLowerCase();
  const isClozeCorrect =
    selectedClozeAnswer !== null &&
    selectedClozeAnswer.toLowerCase() === current.clozeWord.toLowerCase();
  const isStamped =
    (mode === 'deck' && selectedAnswer === current.correctAnswer) ||
    (mode === 'builder' && isBuilderCorrect) ||
    (mode === 'cloze' && isClozeCorrect) ||
    (mode === 'pairs' && matchedPairIds.length === pairsData.length);

  return (
    <div className="bg-amber-50/70 dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 md:p-7 shadow-[6px_6px_0px_0px_#0f172a] dark:shadow-[6px_6px_0px_0px_#27272a] flex flex-col justify-between h-full relative overflow-hidden">
      {/* Top Interactive Mode Tabs & Level Filter */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b-2 border-slate-900/15 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-1.5 bg-white dark:bg-zinc-800 p-1 rounded-2xl border-2 border-slate-900 dark:border-zinc-700">
            <button
              type="button"
              onClick={() => {
                playTactileSound('pop');
                setMode('deck');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                mode === 'deck'
                  ? 'bg-yellow-300 text-slate-950 border border-slate-900'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isSpanishCourse ? '1. Study Card' : '1. Carta Interactiva'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playTactileSound('pop');
                setMode('builder');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                mode === 'builder'
                  ? 'bg-emerald-300 text-slate-950 border border-slate-900'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
              }`}
            >
              <Puzzle className="w-3.5 h-3.5" />
              <span>{isSpanishCourse ? '2. Sentence Magnet' : '2. Imán de Frases'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playTactileSound('pop');
                setMode('cloze');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                mode === 'cloze'
                  ? 'bg-sky-300 text-slate-950 border border-slate-900'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>{isSpanishCourse ? '3. Listen & Complete' : '3. Oído y Completar'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                playTactileSound('pop');
                setMode('pairs');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                mode === 'pairs'
                  ? 'bg-rose-300 text-slate-950 border border-slate-900'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-slate-950'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>{isSpanishCourse ? '4. Speed Pairs' : '4. Pares Rápidos'}</span>
            </button>
          </div>

          {/* Animated Stamp when completed */}
          <AnimatePresence>
            {isStamped && (
              <motion.div
                initial={{ scale: 1.5, opacity: 0, rotate: -12 }}
                animate={{ scale: 1, opacity: 1, rotate: -4 }}
                exit={{ opacity: 0 }}
                className="px-3 py-1 rounded-xl border-2 border-emerald-700 bg-emerald-300 text-slate-950 font-black text-xs tracking-wide shadow-[2px_2px_0px_0px_#065f46]"
              >
                {isSpanishCourse ? '✓ STAMPED!' : '✓ ¡SELLADO!'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CEFR Level Filter Bar & Complexity Progression Ladder for Cards */}
        {mode !== 'pairs' && (
          <div className="space-y-2.5 mb-4 p-3 rounded-2xl bg-white/80 dark:bg-zinc-800/70 border-2 border-slate-900/20 dark:border-zinc-700">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-300 text-slate-950 border border-slate-900 text-[10px] font-black uppercase">
                  {isSpanishCourse
                    ? 'Ordered by Complexity (A1 → B2)'
                    : 'Ordenado por Complejidad (A1 → B2)'}
                </span>
                <span className="text-[11px] font-black text-slate-700 dark:text-zinc-300">
                  {isSpanishCourse
                    ? `Step ${(activeIndex % challenges.length) + 1} of ${challenges.length}`
                    : `Escalón ${(activeIndex % challenges.length) + 1} de ${challenges.length}`}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {(['ALL', 'A1', 'A2', 'B1', 'B2'] as const).map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setLevelFilter(lvl);
                      setActiveIndex(0);
                      setSelectedAnswer(null);
                      setSelectedClozeAnswer(null);
                      setPickedWords([]);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black border transition-all ${
                      levelFilter === lvl
                        ? 'bg-slate-900 text-white dark:bg-yellow-300 dark:text-slate-950 border-slate-900'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-900/30 hover:bg-yellow-100'
                    }`}
                  >
                    {lvl === 'ALL' ? (isSpanishCourse ? 'All (1→12)' : 'Todos (1→12)') : lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Numbered Complexity Step Selector (1 -> N) */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {challenges.map((cardItem, idx) => {
                const isCurrentCard = idx === activeIndex % challenges.length;
                const tierColor =
                  cardItem.level === 'A1'
                    ? 'bg-sky-200 text-slate-950'
                    : cardItem.level === 'A2'
                      ? 'bg-yellow-200 text-slate-950'
                      : cardItem.level === 'B1'
                        ? 'bg-emerald-200 text-slate-950'
                        : 'bg-rose-200 text-slate-950';

                return (
                  <button
                    key={cardItem.id}
                    type="button"
                    onClick={() => {
                      playTactileSound('flip');
                      setActiveIndex(idx);
                      setSelectedAnswer(null);
                      setSelectedClozeAnswer(null);
                      setPickedWords([]);
                      setActiveWordNote(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black border transition-all ${
                      isCurrentCard
                        ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950 border-slate-950 shadow-[2px_2px_0px_0px_#4f46e5] -translate-y-0.5'
                        : `${tierColor} border-slate-900/40 opacity-85 hover:opacity-100`
                    }`}
                    title={`${cardItem.level} · ${cardItem.context}`}
                  >
                    #{idx + 1} {cardItem.level}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MODE 1: INTERACTIVE CARD + FLUORESCENT HIGHLIGHTER (NODECK STYLE) */}
        {mode === 'deck' && (
          <div className="space-y-4">
            {/* Highlighter Toolbar + Audio Controls */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5">
                <Highlighter className="w-4 h-4 text-slate-700 dark:text-zinc-300" />
                <span className="font-bold text-slate-700 dark:text-zinc-300">
                  {isSpanishCourse
                    ? 'Highlight words (tap any word):'
                    : 'Subrayar palabras (toca cualquier palabra):'}
                </span>
                {(['yellow', 'mint', 'coral'] as MarkerColor[]).map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      playTactileSound('pop');
                      setMarkerColor(c);
                    }}
                    title={
                      isSpanishCourse
                        ? `${MARKER_STYLES[c].labelEn} Marker`
                        : `Marcador ${MARKER_STYLES[c].labelEs}`
                    }
                    className={`w-5 h-5 rounded-full border-2 transition-transform ${
                      MARKER_STYLES[c].dot
                    } ${
                      markerColor === c
                        ? 'border-slate-950 dark:border-white scale-125'
                        : 'border-slate-400 opacity-70'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => playSpeech(current.phrase, { courseLanguage, rate: 0.65 })}
                  className="px-2.5 py-1 rounded-xl bg-white dark:bg-zinc-800 border-2 border-slate-900 dark:border-zinc-700 font-bold text-slate-900 dark:text-white text-xs hover:bg-yellow-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {isSpanishCourse ? '🐢 Slow' : '🐢 Lento'}
                </button>
                <button
                  type="button"
                  onClick={() => playSpeech(current.phrase, { courseLanguage, rate: 0.95 })}
                  className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white border-2 border-slate-900 font-bold text-xs flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a]"
                >
                  <Volume2 className="w-3.5 h-3.5" /> {isSpanishCourse ? 'Listen' : 'Escuchar'}
                </button>
              </div>
            </div>

            {/* Tactile Index Card with Word-by-Word Highlighter */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] dark:shadow-[4px_4px_0px_0px_#27272a]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-zinc-400 mb-2">
                <span>
                  {isSpanishCourse ? 'CEFR' : 'MCER'} {current.level} · {current.context}
                </span>
                <span className="text-indigo-600 dark:text-indigo-400">
                  {isSpanishCourse
                    ? 'Click any word to hear & translate'
                    : 'Haz clic en las palabras para traducir'}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 my-2">
                {current.wordNotes.map((w, idx) => {
                  const key = `${current.id}_${idx}`;
                  const appliedColor = highlightedWords[key];
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleWordHighlightClick(w, idx)}
                      className={`px-2 py-1 rounded-lg text-lg md:text-xl font-black transition-all cursor-pointer border ${
                        appliedColor
                          ? `${MARKER_STYLES[appliedColor].bg} border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]`
                          : 'border-transparent hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-900 dark:text-zinc-100'
                      }`}
                    >
                      {w.word}
                    </button>
                  );
                })}
              </div>

              <p className="text-sm font-semibold text-slate-600 dark:text-zinc-400 italic mt-2 pt-2 border-t border-slate-200 dark:border-zinc-800">
                "{current.translation}"
              </p>

              {activeWordNote && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 px-3.5 py-2 rounded-xl bg-yellow-200 dark:bg-yellow-400/90 text-slate-950 border border-slate-900 text-xs font-extrabold flex items-center justify-between"
                >
                  <span>
                    {isSpanishCourse ? 'Selected word:' : 'Palabra seleccionada:'} "
                    {activeWordNote.word.replace(/[¿?.,!]/g, '')}" ={' '}
                    <span className="underline">{activeWordNote.meaning}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveWordNote(null)}
                    className="text-[11px] font-black ml-2 hover:opacity-75"
                  >
                    ✕
                  </button>
                </motion.div>
              )}
            </div>

            {/* Large-Print Accessible Quiz Question */}
            <div className="space-y-2.5 pt-1">
              <p className="text-sm font-extrabold text-slate-900 dark:text-zinc-100">
                {current.question}
              </p>
              <div className="space-y-2">
                {shuffledChallengeOptions.map((opt, idx) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrect = opt === current.correctAnswer;
                  const optionLetter = String.fromCharCode(65 + idx);

                  let btnStyle =
                    'bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-zinc-100 hover:bg-yellow-100 dark:hover:bg-zinc-800 shadow-[3px_3px_0px_0px_#0f172a]';
                  if (selectedAnswer) {
                    if (isCorrect) {
                      btnStyle =
                        'bg-emerald-300 dark:bg-emerald-500 border-2 border-slate-900 text-slate-950 shadow-[3px_3px_0px_0px_#0f172a]';
                    } else if (isSelected) {
                      btnStyle =
                        'bg-rose-300 dark:bg-rose-500 border-2 border-slate-900 text-slate-950';
                    } else {
                      btnStyle =
                        'bg-white/60 dark:bg-zinc-900/40 border border-slate-300 dark:border-zinc-800 opacity-55 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(opt)}
                      className={`w-full text-left px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-between gap-2 ${btnStyle}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-900/30 dark:border-zinc-600 text-xs font-black flex items-center justify-center shrink-0">
                          {optionLetter}
                        </span>
                        <span>{opt}</span>
                      </span>
                      {selectedAnswer && isCorrect && (
                        <span className="text-xs font-black bg-white text-slate-950 px-2 py-0.5 rounded-lg border border-slate-900 shrink-0 tabular-nums">
                          +15 XP
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 text-xs sm:text-sm text-slate-800 dark:text-zinc-200 font-semibold"
                >
                  <strong className="font-black text-indigo-600 dark:text-indigo-400">
                    {isSpanishCourse ? 'Memory Tip: ' : 'Tip de memoria: '}
                  </strong>
                  {current.tip}
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* MODE 2: MAGNETIC SENTENCE BUILDER */}
        {mode === 'builder' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 flex items-center justify-between gap-3 shadow-[3px_3px_0px_0px_#0f172a]">
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                  {isSpanishCourse
                    ? `Build this ${current.level} Spanish sentence (${current.scrambleWords.length} words):`
                    : `Construye esta oración ${current.level} en inglés (${current.scrambleWords.length} fichas):`}
                </p>
                <p className="text-base font-black text-slate-900 dark:text-white">
                  "{current.scrambleTranslation || current.translation}"
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {pickedWords.length < current.scrambleWords.length && (
                  <button
                    type="button"
                    onClick={handleBuilderHintOneWord}
                    className="px-2.5 py-2 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 text-xs font-black flex items-center gap-1 shadow-[2px_2px_0px_0px_#0f172a]"
                    title={isSpanishCourse ? 'Place next correct word' : 'Colocar siguiente ficha correcta'}
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>+1</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    playSpeech(current.scrambleWords.join(' '), { courseLanguage, rate: 0.9 })
                  }
                  className="p-2.5 rounded-xl bg-indigo-600 text-white border-2 border-slate-900 shrink-0 shadow-[2px_2px_0px_0px_#0f172a]"
                  title={isSpanishCourse ? 'Listen to audio hint' : 'Escuchar pista en audio'}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Magnetic Drop Zone */}
            <div className="min-h-[68px] p-3.5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-dashed border-slate-900 dark:border-zinc-600 flex flex-wrap items-center gap-2">
              {pickedWords.length === 0 ? (
                <span className="text-sm font-bold text-slate-400 dark:text-zinc-500">
                  {isSpanishCourse
                    ? 'Tap the magnetic word tiles below in the right order...'
                    : 'Toca las fichas magnéticas de abajo en el orden correcto...'}
                </span>
              ) : (
                pickedWords.map(tileIdx => (
                  <button
                    key={tileIdx}
                    type="button"
                    onClick={() => handlePickTile(tileIdx)}
                    className="px-3.5 py-2 rounded-xl bg-yellow-300 text-slate-950 border-2 border-slate-900 text-sm font-black shadow-[2px_2px_0px_0px_#0f172a] hover:bg-rose-300 transition-colors"
                  >
                    {shuffledTiles[tileIdx].word}
                  </button>
                ))
              )}
            </div>

            {/* Large Accessible Word Tiles */}
            <div className="flex flex-wrap gap-2 pt-1">
              {shuffledTiles.map((item, idx) => {
                const isUsed = pickedWords.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isUsed}
                    onClick={() => handlePickTile(idx)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-black border-2 transition-all ${
                      isUsed
                        ? 'opacity-25 border-slate-300 dark:border-zinc-800 bg-slate-200 dark:bg-zinc-800 cursor-not-allowed'
                        : 'border-slate-900 dark:border-zinc-600 bg-white dark:bg-zinc-800 hover:bg-emerald-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-white shadow-[3px_3px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px]'
                    }`}
                  >
                    {item.word}
                  </button>
                );
              })}
            </div>

            {isBuilderComplete && (
              <div
                className={`p-3.5 rounded-2xl border-2 border-slate-900 text-sm font-extrabold flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                  isBuilderCorrect
                    ? 'bg-emerald-300 text-slate-950'
                    : 'bg-amber-200 text-slate-950'
                }`}
              >
                <div>
                  <p>
                    {isBuilderCorrect
                      ? isSpanishCourse
                        ? '✓ Great job! You built the sentence and earned +20 XP.'
                        : '✓ ¡Excelente construcción! Has ganado +20 XP.'
                      : isSpanishCourse
                        ? `Target order: "${current.scrambleWords.join(' ')}"`
                        : `Orden correcto: "${current.scrambleWords.join(' ')}"`}
                  </p>
                </div>
                {!isBuilderCorrect && (
                  <button
                    type="button"
                    onClick={() => setPickedWords([])}
                    className="px-3 py-1.5 rounded-lg bg-white border-2 border-slate-900 text-xs font-black shrink-0"
                  >
                    {isSpanishCourse ? 'Reset & Try Again' : 'Reiniciar e Intentar'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* MODE 3: ACTIVE LISTENING & CONTEXT CLOZE (OÍDO Y COMPLETAR) */}
        {mode === 'cloze' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-slate-900 dark:border-zinc-700 shadow-[4px_4px_0px_0px_#0f172a] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-black text-indigo-700 dark:text-indigo-400 uppercase">
                  {isSpanishCourse
                    ? `CEFR ${current.level} · Listen & Fill the Missing Word`
                    : `MCER ${current.level} · Escucha y Completa la Palabra Clave`}
                </span>
                <button
                  type="button"
                  onClick={() => playSpeech(current.phrase, { courseLanguage, rate: 0.9 })}
                  className="px-3 py-1.5 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 border-2 border-slate-900 text-xs font-black flex items-center gap-1.5 shadow-[2px_2px_0px_0px_#0f172a]"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpanishCourse ? 'Play Audio' : 'Escuchar Frase'}</span>
                </button>
              </div>

              <p className="text-lg md:text-xl font-black text-slate-950 dark:text-white leading-snug">
                {blankedClozePhrase}
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-zinc-400 italic">
                "{current.translation}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {shuffledClozeOptions.map((opt, idx) => {
                const isSelected = selectedClozeAnswer === opt;
                const isRight = opt.toLowerCase() === current.clozeWord.toLowerCase();
                const letter = String.fromCharCode(65 + idx);
                let cls =
                  'bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white hover:bg-yellow-100 shadow-[3px_3px_0px_0px_#0f172a]';
                if (selectedClozeAnswer) {
                  if (isRight) {
                    cls = 'bg-emerald-300 text-slate-950 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]';
                  } else if (isSelected) {
                    cls = 'bg-rose-300 text-slate-950 border-2 border-slate-900';
                  } else {
                    cls = 'bg-white/50 dark:bg-zinc-900/40 border border-slate-300 opacity-50';
                  }
                }
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectClozeOption(opt)}
                    className={`p-3.5 rounded-2xl text-sm font-black text-left flex items-center justify-between gap-2 transition-all ${cls}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-zinc-800 border border-slate-900 text-xs font-black text-slate-950 dark:text-white flex items-center justify-center shrink-0">
                        {letter}
                      </span>
                      <span>{opt}</span>
                    </span>
                    {selectedClozeAnswer && isRight && (
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {selectedClozeAnswer && (
              <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-950 border-2 border-slate-900 text-xs font-bold text-slate-800 dark:text-zinc-200">
                <strong className="text-emerald-700 dark:text-emerald-400">
                  {isSpanishCourse ? 'Complete Sentence: ' : 'Oración Completa: '}
                </strong>
                {current.phrase} — <em>{current.tip}</em>
              </div>
            )}
          </div>
        )}

        {/* MODE 4: LARGE-PRINT SPEED PAIRS ACROSS 4 CEFR DECKS */}
        {mode === 'pairs' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black text-slate-900 dark:text-zinc-200">
                {isSpanishCourse ? currentPairDeck.titleEn : currentPairDeck.titleEs}
              </span>
              <div className="flex items-center gap-1">
                {pairDecks.map((d, idx) => (
                  <button
                    key={d.level}
                    type="button"
                    onClick={() => {
                      playTactileSound('flip');
                      setActivePairDeckIdx(idx);
                      setMatchedPairIds([]);
                      setSelectedLeft(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black border transition-all ${
                      activePairDeckIdx === idx
                        ? 'bg-rose-300 text-slate-950 border-slate-900'
                        : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border-slate-900/30'
                    }`}
                  >
                    {d.level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 dark:text-zinc-300">
              <span>
                {isSpanishCourse
                  ? 'Tap a Spanish expression on the left and match its English meaning on the right (+30 XP):'
                  : 'Toca una frase en inglés a la izquierda y luego su pareja en español a la derecha (+30 XP):'}
              </span>
              {matchedPairIds.length === pairsData.length && (
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('flip');
                    setActivePairDeckIdx(prev => (prev + 1) % pairDecks.length);
                    setMatchedPairIds([]);
                    setSelectedLeft(null);
                  }}
                  className="px-3 py-1 rounded-xl bg-emerald-300 text-slate-950 border border-slate-900 font-black"
                >
                  {isSpanishCourse ? 'Next Pairs Deck →' : 'Siguiente Mazo de Pares →'}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Left Column */}
              <div className="space-y-2.5">
                {pairsData.map(item => {
                  const isMatched = matchedPairIds.includes(item.id);
                  const isSelected = selectedLeft === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => {
                        playTactileSound('pop');
                        setSelectedLeft(item.id);
                        playSpeech(item.left, { courseLanguage, rate: 0.92 });
                      }}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left text-sm font-black transition-all flex items-center justify-between ${
                        isMatched
                          ? 'bg-emerald-200 dark:bg-emerald-950/50 border-emerald-700 text-emerald-950 dark:text-emerald-200 opacity-65'
                          : isSelected
                            ? 'bg-yellow-300 text-slate-950 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]'
                            : 'bg-white dark:bg-zinc-950 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white hover:bg-yellow-100 shadow-[3px_3px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>{item.left}</span>
                      <Volume2 className="w-4 h-4 shrink-0 opacity-70" />
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-2.5">
                {shuffledRightPairs.map(item => {
                  const isMatched = matchedPairIds.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={isMatched}
                      onClick={() => handleSelectPairRight(item.id, item.left)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left text-sm font-black transition-all flex items-center justify-between ${
                        isMatched
                          ? 'bg-emerald-300 dark:bg-emerald-900/60 border-slate-900 text-slate-950 dark:text-emerald-100'
                          : 'bg-white dark:bg-zinc-950 border-slate-900 dark:border-zinc-700 text-slate-900 dark:text-white hover:bg-emerald-100 dark:hover:bg-zinc-800 shadow-[3px_3px_0px_0px_#0f172a]'
                      }`}
                    >
                      <span>{item.right}</span>
                      {isMatched && <CheckCircle2 className="w-4 h-4 text-slate-950 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tactile Card Deck Footer Switcher */}
      <div className="pt-4 mt-5 border-t-2 border-slate-900/15 dark:border-zinc-800 flex items-center justify-between text-xs">
        <span className="text-slate-700 dark:text-zinc-300 font-extrabold tabular-nums">
          {mode === 'pairs'
            ? isSpanishCourse
              ? `Pairs Deck ${activePairDeckIdx + 1} of ${pairDecks.length} · Level ${currentPairDeck.level} (Ordered A1 → B2)`
              : `Mazo de Pares ${activePairDeckIdx + 1} de ${pairDecks.length} · Nivel ${currentPairDeck.level} (Orden A1 → B2)`
            : isSpanishCourse
              ? `Complexity Step #${(activeIndex % challenges.length) + 1} of ${challenges.length} · Level ${current.level}`
              : `Escalón de Complejidad #${(activeIndex % challenges.length) + 1} de ${challenges.length} · Nivel ${current.level}`}
        </span>
        <button
          type="button"
          onClick={() => {
            if (mode === 'pairs') {
              playTactileSound('flip');
              setActivePairDeckIdx(prev => (prev + 1) % pairDecks.length);
              setMatchedPairIds([]);
              setSelectedLeft(null);
            } else {
              handleNextChallenge();
            }
          }}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 dark:bg-white dark:text-slate-950 text-white font-black text-xs flex items-center gap-1.5 transition-colors shadow-[2px_2px_0px_0px_#4f46e5]"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>
            {isSpanishCourse ? 'Next Complexity Card →' : 'Siguiente Carta en Complejidad →'}
          </span>
        </button>
      </div>
    </div>
  );
}

interface OnePageBentoExplorerProps {
  courseLanguage: 'en' | 'es';
  progress: UserProgress;
  a1Lessons: LessonStep[];
  a2Lessons: LessonStep[];
  b1Lessons: LessonStep[];
  b2Lessons: LessonStep[];
  isA1Certified: boolean;
  isA2Certified: boolean;
  isB1Certified: boolean;
  isB2Certified: boolean;
  onNavigate: (tab: SectionTab) => void;
  onSelectLessonDirect: (lesson: LessonStep) => void;
}

export function OnePageBentoExplorer({
  courseLanguage,
  progress,
  a1Lessons,
  a2Lessons,
  b1Lessons,
  b2Lessons,
  isA1Certified,
  isA2Certified,
  isB1Certified,
  isB2Certified,
  onNavigate,
  onSelectLessonDirect
}: OnePageBentoExplorerProps) {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>('A1');
  const isSpanishCourse = courseLanguage === 'es'; // English speaker learning Spanish

  const levelConfig = useMemo(() => {
    const a1Done = a1Lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const a2Done = a2Lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const b1Done = b1Lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const b2Done = b2Lessons.filter(l => progress.completedLessons.includes(l.id)).length;

    return {
      A1: {
        code: 'A1' as CEFRLevel,
        number: '01',
        title: isSpanishCourse
          ? 'Level A1 · Spanish Foundations & Survival'
          : 'Nivel A1 · Fundamentos del Inglés',
        subtitle: isSpanishCourse
          ? 'Greetings, pronunciation, SER vs ESTAR, present tense (-AR/-ER/-IR), TENER for age, and real-world dialogues.'
          : 'Saludos, verbo To Be, presente simple, preguntas esenciales y vocabulario diario.',
        lessons: a1Lessons,
        completed: a1Done,
        total: a1Lessons.length,
        isUnlocked: true,
        isCertified: isA1Certified,
        unlockReqText: isSpanishCourse
          ? 'Unlocked from Day 1'
          : 'Acceso abierto desde el primer día',
        targetTab: 'a1-inicial' as SectionTab,
        cardBg: 'bg-sky-100/80 dark:bg-sky-950/30',
        tabActiveBg: 'bg-sky-300 text-slate-950'
      },
      A2: {
        code: 'A2' as CEFRLevel,
        number: '02',
        title: isSpanishCourse
          ? 'Level A2 · Storytelling & Past Tenses'
          : 'Nivel A2 · Plataforma e Historias',
        subtitle: isSpanishCourse
          ? 'Past tenses (Pretérito Indefinido vs Imperfecto), object pronouns, future plans, and Por vs Para.'
          : 'Past Simple vs Continuous, comparativos, Present Perfect, futuro y condicionales.',
        lessons: a2Lessons,
        completed: a2Done,
        total: a2Lessons.length,
        isUnlocked: isA1Certified,
        isCertified: isA2Certified,
        unlockReqText: isSpanishCourse
          ? 'Requires passing the Official CEFR A1 Certification Exam (≥80%)'
          : 'Requiere aprobar el Examen de Certificación A1 (≥80%)',
        targetTab: 'a2-plataforma' as SectionTab,
        cardBg: 'bg-amber-100/80 dark:bg-amber-950/30',
        tabActiveBg: 'bg-yellow-300 text-slate-950'
      },
      B1: {
        code: 'B1' as CEFRLevel,
        number: '03',
        title: isSpanishCourse
          ? 'Level B1 · Independent Spanish Fluency'
          : 'Nivel B1 · Fluidez Independiente',
        subtitle: isSpanishCourse
          ? 'Present Subjunctive (WEIRDO), commands, conditional tense, passive voice, and expressing opinions.'
          : 'Second Conditional, Voz Pasiva, Reported Speech, Phrasal Verbs y matices.',
        lessons: b1Lessons,
        completed: b1Done,
        total: b1Lessons.length,
        isUnlocked: isA2Certified,
        isCertified: isB1Certified,
        unlockReqText: isSpanishCourse
          ? 'Requires passing the Official CEFR A2 Certification Exam (≥80%)'
          : 'Requiere aprobar el Examen de Certificación A2 (≥80%)',
        targetTab: 'b1-umbral' as SectionTab,
        cardBg: 'bg-emerald-100/80 dark:bg-emerald-950/30',
        tabActiveBg: 'bg-emerald-300 text-slate-950'
      },
      B2: {
        code: 'B2' as CEFRLevel,
        number: '04',
        title: isSpanishCourse
          ? 'Level B2 · Advanced & Professional Mastery'
          : 'Nivel B2 · Dominio Profesional y Académico',
        subtitle: isSpanishCourse
          ? 'Imperfect & Pluperfect Subjunctive, hypothetical "Si" clauses, verbal periphrases, and executive register.'
          : 'Third & Mixed Conditionals, inversión estilística, modales en pasado e inglés ejecutivo.',
        lessons: b2Lessons,
        completed: b2Done,
        total: b2Lessons.length,
        isUnlocked: isB1Certified,
        isCertified: isB2Certified,
        unlockReqText: isSpanishCourse
          ? 'Requires passing the Official CEFR B1 Certification Exam (≥80%)'
          : 'Requiere aprobar el Examen de Certificación B1 (≥80%)',
        targetTab: 'b2-avanzado' as SectionTab,
        cardBg: 'bg-rose-100/80 dark:bg-rose-950/30',
        tabActiveBg: 'bg-rose-300 text-slate-950'
      }
    };
  }, [
    isSpanishCourse,
    a1Lessons,
    a2Lessons,
    b1Lessons,
    b2Lessons,
    progress.completedLessons,
    isA1Certified,
    isA2Certified,
    isB1Certified,
    isB2Certified
  ]);

  const activeData = levelConfig[selectedLevel];
  const percent = activeData.total > 0 ? Math.round((activeData.completed / activeData.total) * 100) : 0;

  const previewLessons = useMemo(() => {
    const allLessons = activeData.lessons;
    if (allLessons.length <= 6) return allLessons;
    const firstPendingIdx = allLessons.findIndex(
      l => !progress.completedLessons.includes(l.id)
    );
    if (firstPendingIdx === -1) {
      return allLessons.slice(0, 6);
    }
    // Keep sequential order starting 1 card before the current active card when possible
    const maxStart = Math.max(0, allLessons.length - 6);
    const startIdx = Math.min(Math.max(0, firstPendingIdx - 1), maxStart);
    return allLessons.slice(startIdx, startIdx + 6);
  }, [activeData.lessons, progress.completedLessons]);

  return (
    <div className="bg-white dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_#0f172a] dark:shadow-[6px_6px_0px_0px_#27272a] mb-8">
      {/* Header & Tactile Level Switcher Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b-2 border-slate-900/10 dark:border-zinc-800">
        <div>
          <p className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
            {isSpanishCourse
              ? 'Sequential Mission Path · Complete Each Card to Unlock the Next'
              : 'Camino Secuencial por Nivel · Completa cada Carta para Desbloquear la Siguiente'}
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">
            {isSpanishCourse ? 'CEFR Level Map (A1 → B2)' : 'Mapa de Niveles MCER (A1 → B2)'}
          </h2>
        </div>

        {/* Tactile Level Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(['A1', 'A2', 'B1', 'B2'] as CEFRLevel[]).map(lvl => {
            const info = levelConfig[lvl];
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  playTactileSound('pop');
                  setSelectedLevel(lvl);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black border-2 border-slate-900 dark:border-zinc-600 transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isSelected
                    ? `${info.tabActiveBg} shadow-[3px_3px_0px_0px_#0f172a] -translate-y-0.5`
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-white'
                }`}
              >
                <span>
                  {info.number}. {isSpanishCourse ? `Level ${lvl}` : `Nivel ${lvl}`}
                </span>
                {info.isCertified ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                ) : !info.isUnlocked ? (
                  <Lock className="w-3.5 h-3.5 opacity-60" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Level Showcase */}
      <div className="pt-6">
        <div className={`p-5 rounded-2xl border-2 border-slate-900 dark:border-zinc-700 ${activeData.cardBg} mb-6`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold text-slate-700 dark:text-zinc-300 mb-1 tabular-nums">
                <span>
                  {activeData.number}. {isSpanishCourse ? `Level ${activeData.code}` : `Nivel ${activeData.code}`}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {isSpanishCourse
                    ? `${activeData.completed} of ${activeData.total} lessons completed (${percent}%)`
                    : `${activeData.completed} de ${activeData.total} lecciones superadas (${percent}%)`}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {activeData.isCertified
                    ? isSpanishCourse
                      ? '✓ Official Certificate Earned'
                      : '✓ Sello Oficial Obtenido'
                    : activeData.isUnlocked
                      ? isSpanishCourse
                        ? 'Sequential path active'
                        : 'Camino secuencial activo'
                      : isSpanishCourse
                        ? 'Requires previous level certificate'
                        : 'Requiere certificar nivel previo'}
                </span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-zinc-100 mb-1">
                {activeData.title}
              </h3>
              <p className="text-xs md:text-sm font-medium text-slate-700 dark:text-zinc-300 max-w-2xl">
                {activeData.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              {activeData.isUnlocked ? (
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    onNavigate(activeData.targetTab);
                  }}
                  className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-indigo-600 text-white font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0px_0px_#4f46e5] flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
                >
                  <span>
                    {isSpanishCourse
                      ? `Open full ${activeData.total}-step path`
                      : `Ver camino completo (${activeData.total} cartas)`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    playTactileSound('pop');
                    onNavigate('exam');
                  }}
                  className="px-5 py-3 rounded-2xl bg-yellow-300 hover:bg-yellow-400 text-slate-950 font-black text-xs border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] flex items-center gap-2 transition-all whitespace-nowrap shrink-0"
                >
                  <Award className="w-4 h-4" />
                  <span>{isSpanishCourse ? 'Go to Exam to Unlock' : 'Ir al Examen para Desbloquear'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-3 w-full bg-white/80 dark:bg-zinc-900 border-2 border-slate-900 dark:border-zinc-700 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>

        {/* Interactive Lesson Cards Grid or Prerequisite Notice */}
        {!activeData.isUnlocked ? (
          <div className="p-6 rounded-2xl bg-amber-50 dark:bg-zinc-800/50 border-2 border-slate-900 dark:border-zinc-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-base font-black text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>{activeData.unlockReqText}</span>
              </p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-400">
                {isSpanishCourse
                  ? `Score 80% or higher on the previous level exam to unlock these ${activeData.total} interactive lessons.`
                  : `Obtén 80% o más en el examen del nivel anterior para desbloquear estas ${activeData.total} misiones interactivas.`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('exam')}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] whitespace-nowrap shrink-0"
            >
              {isSpanishCourse ? 'Take Exam Now' : 'Presentar Examen Ahora'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {previewLessons.map(lesson => {
              const fullIndex = activeData.lessons.findIndex(l => l.id === lesson.id);
              const prevLesson = fullIndex > 0 ? activeData.lessons[fullIndex - 1] : null;
              const isDone = progress.completedLessons.includes(lesson.id);
              const isCardUnlocked =
                fullIndex <= 0 ||
                isDone ||
                (prevLesson ? progress.completedLessons.includes(prevLesson.id) : false);
              const isNextActive = isCardUnlocked && !isDone;
              const samplePhrase =
                lesson.quiz[0]?.targetText || lesson.quiz[0]?.correctAnswer || lesson.title;

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (!isCardUnlocked) {
                      playTactileSound('error');
                      return;
                    }
                    playTactileSound('pop');
                    onSelectLessonDirect(lesson);
                  }}
                  role={isCardUnlocked ? 'button' : undefined}
                  tabIndex={isCardUnlocked ? 0 : -1}
                  aria-disabled={!isCardUnlocked}
                  onKeyDown={e => {
                    if (isCardUnlocked && (e.key === 'Enter' || e.key === ' ')) {
                      playTactileSound('pop');
                      onSelectLessonDirect(lesson);
                    }
                  }}
                  className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between group ${
                    isDone
                      ? 'border-emerald-700 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 hover:-translate-y-1 cursor-pointer shadow-[4px_4px_0px_0px_#065f46]'
                      : isNextActive
                        ? 'border-slate-900 dark:border-indigo-400 bg-white dark:bg-zinc-800 hover:-translate-y-1 cursor-pointer ring-2 ring-indigo-500/40 shadow-[5px_5px_0px_0px_#4f46e5]'
                        : 'border-slate-300 dark:border-zinc-800 bg-slate-100/80 dark:bg-zinc-900/50 opacity-70 cursor-not-allowed'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-600 dark:text-zinc-400 mb-2 tabular-nums">
                      <span
                        className={`font-black ${
                          isDone
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : isNextActive
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'text-slate-500 dark:text-zinc-500'
                        }`}
                      >
                        {isSpanishCourse ? `Card #${lesson.day}` : `Carta #${lesson.day}`} ·{' '}
                        {lesson.cefrLevel || selectedLevel}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            playSpeech(samplePhrase, { courseLanguage, rate: 0.92 });
                          }}
                          title={
                            isSpanishCourse
                              ? 'Listen to key phrase from this lesson'
                              : 'Escuchar frase clave de la lección'
                          }
                          className="p-1.5 rounded-lg bg-yellow-200 hover:bg-yellow-300 text-slate-950 border border-slate-900 transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>

                        {isDone ? (
                          <span className="font-black text-emerald-700 dark:text-emerald-400">
                            {isSpanishCourse ? '✓ Completed' : '✓ Sellada'}
                          </span>
                        ) : isNextActive ? (
                          <span className="px-2 py-0.5 rounded-md bg-yellow-300 text-slate-950 border border-slate-900 font-black text-[11px]">
                            {isSpanishCourse ? 'Next Step' : 'En Turno'}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 font-bold text-slate-500 dark:text-zinc-500">
                            <Lock className="w-3.5 h-3.5" />
                            {isSpanishCourse ? 'Locked' : 'Bloqueada'}
                          </span>
                        )}
                      </div>
                    </div>

                    <h4
                      className={`text-base font-black mb-1.5 transition-colors leading-snug ${
                        isCardUnlocked
                          ? 'text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                          : 'text-slate-500 dark:text-zinc-500'
                      }`}
                    >
                      {lesson.title}
                    </h4>
                    <p className="text-xs font-medium text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-4 border-t-2 border-slate-200/80 dark:border-zinc-700/70 flex items-center justify-between text-xs font-black">
                    {isDone ? (
                      <>
                        <span className="text-emerald-800 dark:text-emerald-300">
                          {isSpanishCourse ? 'Review lesson card' : 'Volver a repasar carta'}
                        </span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </>
                    ) : isNextActive ? (
                      <>
                        <span className="text-indigo-700 dark:text-indigo-300">
                          {isSpanishCourse ? 'Start this lesson card now' : 'Jugar esta carta ahora'}
                        </span>
                        <Play className="w-4 h-4 fill-indigo-600 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
                      </>
                    ) : (
                      <>
                        <span className="text-slate-500 dark:text-zinc-500">
                          {isSpanishCourse
                            ? `Complete Card #${prevLesson?.day ?? lesson.day - 1} first`
                            : `Completa la Carta #${prevLesson?.day ?? lesson.day - 1} primero`}
                        </span>
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
