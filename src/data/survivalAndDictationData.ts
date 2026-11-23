import { CEFRLevel } from '../types';

export interface DictationItem {
  id: string;
  level: CEFRLevel;
  targetSentence: string;
  nativeTranslation: string;
  contextTag: string;
  phoneticTip: string;
  distractorWords: string[]; // Extra look-alike or sound-alike tiles for block dictation
  errorHunter?: {
    wrongSentence: string;
    wrongPart: string;
    correctPart: string;
    options: string[];
    explanation: string;
  };
}

export interface SurvivalTurn {
  stepNumber: number;
  npcRole: string;
  npcLine: string;
  npcTranslation: string;
  missionObjective: string;
  options: string[];
  correctOption: string;
  feedbackExplanation: string;
}

export interface SurvivalMission {
  id: string;
  level: CEFRLevel;
  title: string;
  locationBadge: string;
  scenarioSummary: string;
  turns: SurvivalTurn[];
}

export interface FalseFriendCard {
  id: string;
  level: CEFRLevel;
  trapTitle: string;
  falseFriendPair: string;
  situationPrompt: string;
  targetSentenceWithBlank: string;
  fullCorrectSentence: string;
  correctAnswer: string;
  options: string[];
  contrastExplanation: string;
}

// ============================================================================
// 1. DICTATION & ERROR HUNTER DATA — ENGLISH COURSE (24 ITEMS: 6 PER LEVEL)
// ============================================================================
export const ENGLISH_DICTATION_ITEMS: DictationItem[] = [
  // LEVEL A1 (6 ITEMS)
  {
    id: 'en_dict_a1_1',
    level: 'A1',
    targetSentence: 'Could I have the bill and pay by card, please?',
    nativeTranslation: '¿Podría traerme la cuenta y pagar con tarjeta, por favor?',
    contextTag: 'Restaurante · Pago',
    phoneticTip: 'Escucha cómo "Could I" se enlaza sonando como /kʊ-daɪ/ y "by card" usa la preposición BY.',
    distractorWords: ['for', 'check', 'can'],
    errorHunter: {
      wrongSentence: 'Could I have the bill and pay with card, please?',
      wrongPart: 'with card',
      correctPart: 'by card',
      options: ['by card', 'with card', 'in card', 'for card'],
      explanation: 'En inglés, para medios de pago o transporte generales usamos "BY" sin artículo: "pay by card / by check" (pero "pay in cash").'
    }
  },
  {
    id: 'en_dict_a1_2',
    level: 'A1',
    targetSentence: 'My sister is twenty-six years old and works as a nurse.',
    nativeTranslation: 'Mi hermana tiene veintiséis años y trabaja como enfermera.',
    contextTag: 'Presentación · Familia',
    phoneticTip: 'Presta atención a "is twenty-six" (verbo To Be para edad) y "works as a" (/wɜːrks æz ə/).',
    distractorWords: ['has', 'work', 'like'],
    errorHunter: {
      wrongSentence: 'My sister has twenty-six years old and works as a nurse.',
      wrongPart: 'has twenty-six years',
      correctPart: 'is twenty-six years',
      options: ['is twenty-six years', 'has twenty-six years', 'have twenty-six years', 'are twenty-six years'],
      explanation: 'En inglés la edad es un estado del sujeto y SIEMPRE usa el verbo TO BE ("She is 26 years old"), nunca el verbo "have/has".'
    }
  },
  {
    id: 'en_dict_a1_3',
    level: 'A1',
    targetSentence: 'There are two pharmacies on the corner next to the bank.',
    nativeTranslation: 'Hay dos farmacias en la esquina junto al banco.',
    contextTag: 'Direcciones · Ciudad',
    phoneticTip: '"There are" se pronuncia enlazado /ðeə-rɑːr/ y "next to" lleva la preposición TO.',
    distractorWords: ['is', 'have', 'near'],
    errorHunter: {
      wrongSentence: 'There have two pharmacies on the corner next to the bank.',
      wrongPart: 'There have',
      correctPart: 'There are',
      options: ['There are', 'There have', 'There is', 'They have'],
      explanation: 'Para expresar existencia ("Hay") en plural usamos "There are" (y "There is" en singular), jamás "There have".'
    }
  },
  {
    id: 'en_dict_a1_4',
    level: 'A1',
    targetSentence: 'Does your brother usually take the subway to work on Mondays?',
    nativeTranslation: '¿Tu hermano suele tomar el metro al trabajo los lunes?',
    contextTag: 'Rutina · Preguntas 3ª Persona',
    phoneticTip: 'Escucha "Does your" (/dʌz jɔːr/) y "on Mondays" (los días de la semana siempre llevan ON).',
    distractorWords: ['Do', 'takes', 'in'],
    errorHunter: {
      wrongSentence: 'Does your brother usually takes the subway to work in Mondays?',
      wrongPart: 'takes ... in Mondays',
      correctPart: 'take ... on Mondays',
      options: ['take ... on Mondays', 'takes ... in Mondays', 'take ... the Mondays', 'taking ... on Mondays'],
      explanation: 'Cuando la pregunta abre con "Does", el verbo vuelve a su forma base ("take", sin -s), y los días de la semana siempre usan la preposición "ON" ("on Mondays").'
    }
  },
  {
    id: 'en_dict_a1_5',
    level: 'A1',
    targetSentence: 'I always listen to English podcasts while I make breakfast.',
    nativeTranslation: 'Siempre escucho podcasts en inglés mientras preparo el desayuno.',
    contextTag: 'Hábitos · Preposición TO',
    phoneticTip: 'En "listen", la T es completamente muda (/ˈlɪs.ən/), y siempre va seguida de "to".',
    distractorWords: ['hear', 'at', 'do'],
    errorHunter: {
      wrongSentence: 'I always listen English podcasts while I do breakfast.',
      wrongPart: 'listen English ... do breakfast',
      correctPart: 'listen to English ... make breakfast',
      options: ['listen to English ... make breakfast', 'listen English ... do breakfast', 'hear to English ... make breakfast', 'listen at English ... do breakfast'],
      explanation: 'El verbo "listen" siempre requiere la preposición "to" antes del objeto ("listen to music/podcasts"), y para comidas usamos "make breakfast/dinner".'
    }
  },
  {
    id: 'en_dict_a1_6',
    level: 'A1',
    targetSentence: 'People in this neighborhood are very friendly and helpful.',
    nativeTranslation: 'La gente de este vecindario es muy amable y servicial.',
    contextTag: 'Sustantivos Plurales · People',
    phoneticTip: '"People" (/ˈpiː.pəl/) es plural en inglés, por eso lleva el verbo "are".',
    distractorWords: ['is', 'peoples', 'the'],
    errorHunter: {
      wrongSentence: 'The people in this neighborhood is very friendly and helpful.',
      wrongPart: 'people ... is',
      correctPart: 'people ... are',
      options: ['people ... are', 'people ... is', 'peoples ... are', 'person ... are'],
      explanation: 'Aunque en español "la gente" es singular ("la gente es"), en inglés "people" es plural ("plural de person") y siempre lleva verbo en plural ("people ARE").'
    }
  },

  // LEVEL A2 (6 ITEMS)
  {
    id: 'en_dict_a2_1',
    level: 'A2',
    targetSentence: 'We didn’t buy the tickets yesterday because the website crashed.',
    nativeTranslation: 'No compramos los boletos ayer porque el sitio web se cayó.',
    contextTag: 'Viajes · Pasado Simple',
    phoneticTip: 'Nota que tras "didn’t" el verbo va en presente base "buy" (/baɪ/), y "crashed" suena con /t/ al final (/kræʃt/).',
    distractorWords: ['bought', 'don’t', 'crash'],
    errorHunter: {
      wrongSentence: 'We didn’t bought the tickets yesterday because the website crashed.',
      wrongPart: 'didn’t bought',
      correctPart: 'didn’t buy',
      options: ['didn’t buy', 'didn’t bought', 'don’t bought', 'haven’t bought'],
      explanation: 'El auxiliar "didn’t" ya marca el pasado; por eso el verbo principal debe ir en forma base ("buy"), nunca en pasado ("bought").'
    }
  },
  {
    id: 'en_dict_a2_2',
    level: 'A2',
    targetSentence: 'I completely agree with your proposal for the new schedule.',
    nativeTranslation: 'Estoy totalmente de acuerdo con tu propuesta para el nuevo horario.',
    contextTag: 'Trabajo · Opiniones',
    phoneticTip: '"Agree" es un verbo de acción en inglés (/əˈɡriː/), por lo que va directo después del sujeto "I".',
    distractorWords: ['am', 'are', 'to'],
    errorHunter: {
      wrongSentence: 'I am completely agree with your proposal for the new schedule.',
      wrongPart: 'I am completely agree',
      correctPart: 'I completely agree',
      options: ['I completely agree', 'I am completely agree', 'I have completely agree', 'I do agree with to'],
      explanation: '"Agree" ya significa "estar de acuerdo". Decir "I am agree" es un error muy común por traducir literalmente del español.'
    }
  },
  {
    id: 'en_dict_a2_3',
    level: 'A2',
    targetSentence: 'Have you ever visited the science museum in the city center?',
    nativeTranslation: '¿Alguna vez has visitado el museo de ciencias en el centro de la ciudad?',
    contextTag: 'Experiencias · Present Perfect',
    phoneticTip: 'Escucha "Have you ever visited" (/hæv ju ˈevər ˈvɪzɪtɪd/): el sufijo -ed tras /t/ suena como sílaba extra /ɪd/.',
    distractorWords: ['Did', 'never', 'visit'],
    errorHunter: {
      wrongSentence: 'Did you ever visited the science museum in the city center?',
      wrongPart: 'Did you ever visited',
      correctPart: 'Have you ever visited',
      options: ['Have you ever visited', 'Did you ever visited', 'Has you ever visited', 'Are you ever visited'],
      explanation: 'Para preguntar por experiencias en cualquier momento de la vida ("¿Alguna vez has...?") usamos Present Perfect: "Have you ever + participio".'
    }
  },
  {
    id: 'en_dict_a2_4',
    level: 'A2',
    targetSentence: 'She went to the pharmacy to buy some medicine for her headache.',
    nativeTranslation: 'Ella fue a la farmacia para comprar medicina para su dolor de cabeza.',
    contextTag: 'Propósito · Infinitivo con TO',
    phoneticTip: 'Para expresar el propósito de una acción ("para comprar"), en inglés usamos "to buy", nunca "for buy".',
    distractorWords: ['for', 'buying', 'bought'],
    errorHunter: {
      wrongSentence: 'She went to the pharmacy for buy some medicine for her headache.',
      wrongPart: 'for buy',
      correctPart: 'to buy',
      options: ['to buy', 'for buy', 'for to buy', 'to buying'],
      explanation: 'Para explicar el propósito de una acción ("para + verbo en infinitivo") en inglés siempre usamos "TO + verbo base" ("to buy"), jamás "for buy".'
    }
  },
  {
    id: 'en_dict_a2_5',
    level: 'A2',
    targetSentence: 'Could you please explain this paragraph to me one more time?',
    nativeTranslation: '¿Podrías explicarme este párrafo una vez más, por favor?',
    contextTag: 'Clase · Verbo Explain + TO',
    phoneticTip: 'Escucha "explain this paragraph to me": con el verbo "explain" siempre ponemos "to me", nunca "explain me".',
    distractorWords: ['tell', 'for', 'again'],
    errorHunter: {
      wrongSentence: 'Could you please explain me this paragraph one more time?',
      wrongPart: 'explain me this paragraph',
      correctPart: 'explain this paragraph to me',
      options: ['explain this paragraph to me', 'explain me this paragraph', 'explain to me this', 'explaining me this paragraph'],
      explanation: 'El verbo "explain" no acepta un pronombre indirecto sin preposición: siempre decimos "explain [something] TO me" (o "explain TO me how..."), nunca "explain me".'
    }
  },
  {
    id: 'en_dict_a2_6',
    level: 'A2',
    targetSentence: 'We are really looking forward to meeting your team next Friday.',
    nativeTranslation: 'Tenemos muchas ganas de conocer a tu equipo el próximo viernes.',
    contextTag: 'Correspondencia · Look forward to',
    phoneticTip: 'Escucha "looking forward to meeting": aquí "to" es preposición y exige verbo terminado en -ING.',
    distractorWords: ['meet', 'for', 'met'],
    errorHunter: {
      wrongSentence: 'We are really looking forward to meet your team next Friday.',
      wrongPart: 'looking forward to meet',
      correctPart: 'looking forward to meeting',
      options: ['looking forward to meeting', 'looking forward to meet', 'look forward for meet', 'looking forward meeting'],
      explanation: 'En la expresión "look forward to" ("esperar con ilusión"), la palabra "to" es una preposición, por lo que el verbo que sigue debe ir con -ING ("to meeting").'
    }
  },

  // LEVEL B1 (6 ITEMS)
  {
    id: 'en_dict_b1_1',
    level: 'B1',
    targetSentence: 'We have been waiting for the technician for over forty minutes.',
    nativeTranslation: 'Llevamos esperando al técnico más de cuarenta minutos.',
    contextTag: 'Duración · Present Perfect Continuous',
    phoneticTip: '"Have been waiting" (/hæv bɪn ˈweɪtɪŋ/) conecta una acción que empezó en el pasado y continúa ahora.',
    distractorWords: ['are', 'since', 'waited'],
    errorHunter: {
      wrongSentence: 'We are waiting for the technician since forty minutes.',
      wrongPart: 'are waiting ... since',
      correctPart: 'have been waiting ... for',
      options: ['have been waiting ... for', 'are waiting ... since', 'wait ... since', 'had waited ... during'],
      explanation: 'En inglés no se usa Present Continuous para decir cuánto tiempo llevas haciendo algo: se usa "have been + -ing" y "for" para cantidad de tiempo.'
    }
  },
  {
    id: 'en_dict_b1_2',
    level: 'B1',
    targetSentence: 'She told me that she would send the updated contract before noon.',
    nativeTranslation: 'Ella me dijo que enviaría el contrato actualizado antes del mediodía.',
    contextTag: 'Oficina · Reported Speech',
    phoneticTip: 'Observa que "told me" lleva el objeto directo sin "to" (nunca "told to me") y "would" suena /wʊd/ (la L es muda).',
    distractorWords: ['said', 'to', 'will'],
    errorHunter: {
      wrongSentence: 'She said me that she would send the updated contract before noon.',
      wrongPart: 'She said me',
      correctPart: 'She told me (o She said to me)',
      options: ['She told me', 'She said me', 'She told to me', 'She spoke me'],
      explanation: 'Con pronombre personal directo ("me / you / him") usamos "told me". Si usas "said", necesitas "to" ("said to me").'
    }
  },
  {
    id: 'en_dict_b1_3',
    level: 'B1',
    targetSentence: 'I am already used to waking up early on cold winter mornings.',
    nativeTranslation: 'Ya estoy acostumbrado a despertarme temprano en las mañanas frías de invierno.',
    contextTag: 'Hábitos · Be used to + -ING',
    phoneticTip: '"Used to waking" (/juːst tə ˈweɪkɪŋ/): después de "be used to", el verbo va siempre con -ING.',
    distractorWords: ['wake', 'woke', 'get'],
    errorHunter: {
      wrongSentence: 'I am already used to wake up early on cold winter mornings.',
      wrongPart: 'am already used to wake',
      correctPart: 'am already used to waking',
      options: ['am already used to waking', 'am already used to wake', 'already use to waking', 'am used to woke'],
      explanation: 'Cuando lleva el verbo To Be delante ("I am used to..." = estoy acostumbrado a), la palabra "to" es preposición y exige verbo con -ING ("waking").'
    }
  },
  {
    id: 'en_dict_b1_4',
    level: 'B1',
    targetSentence: 'Despite the heavy rain, the outdoor concert took place on time.',
    nativeTranslation: 'A pesar de la fuerte lluvia, el concierto al aire libre se llevó a cabo a tiempo.',
    contextTag: 'Conectores · Despite vs. In spite of',
    phoneticTip: 'Escucha que "Despite" va seguido directamente de "the heavy rain", sin la preposición "of".',
    distractorWords: ['of', 'Although', 'was'],
    errorHunter: {
      wrongSentence: 'Despite of the heavy rain, the outdoor concert took place on time.',
      wrongPart: 'Despite of',
      correctPart: 'Despite (o In spite of)',
      options: ['Despite', 'Despite of', 'In spite', 'Although of'],
      explanation: '"Despite" NUNCA lleva "of". Puedes decir "Despite the rain" o bien "In spite of the rain", pero jamás "Despite of".'
    }
  },
  {
    id: 'en_dict_b1_5',
    level: 'B1',
    targetSentence: 'Do you know what time the regional train leaves from platform four?',
    nativeTranslation: '¿Sabes a qué hora sale el tren regional del andén cuatro?',
    contextTag: 'Preguntas Indirectas · Orden Afirmativo',
    phoneticTip: 'Tras "Do you know what time...", el orden es sujeto + verbo ("the regional train leaves"), sin auxiliar "does".',
    distractorWords: ['does', 'leave', 'at'],
    errorHunter: {
      wrongSentence: 'Do you know what time does the regional train leave from platform four?',
      wrongPart: 'what time does the regional train leave',
      correctPart: 'what time the regional train leaves',
      options: ['what time the regional train leaves', 'what time does the regional train leave', 'what time leaves the regional train', 'what time did leave the train'],
      explanation: 'En preguntas indirectas ("Do you know... / Could you tell me..."), la segunda parte sigue el orden normal de una afirmación (sujeto + verbo conjugado: "the train leaves"), sin "do/does".'
    }
  },
  {
    id: 'en_dict_b1_6',
    level: 'B1',
    targetSentence: 'Unless we reserve the conference room today, it won’t be available.',
    nativeTranslation: 'A menos que reservemos la sala de conferencias hoy, no estará disponible.',
    contextTag: 'Condicionales · Unless (+)',
    phoneticTip: '"Unless" (/ənˈles/) ya significa "if not" ("a menos que"), por lo que su verbo va en presente afirmativo.',
    distractorWords: ['don’t', 'will', 'not'],
    errorHunter: {
      wrongSentence: 'Unless we don’t reserve the conference room today, it won’t be available.',
      wrongPart: 'Unless we don’t reserve',
      correctPart: 'Unless we reserve',
      options: ['Unless we reserve', 'Unless we don’t reserve', 'Unless we will reserve', 'If not we reserve'],
      explanation: '"Unless" ya incluye la negación ("a menos que / si no"). Por eso el verbo de su cláusula debe ir en afirmativo ("Unless we reserve").'
    }
  },

  // LEVEL B2 (6 ITEMS)
  {
    id: 'en_dict_b2_1',
    level: 'B2',
    targetSentence: 'Had we known about the flight cancellation, we would have booked a train.',
    nativeTranslation: 'Si hubiéramos sabido de la cancelación del vuelo, habríamos reservado un tren.',
    contextTag: 'Inversión Condicional · Nivel Ejecutivo',
    phoneticTip: '"Had we known" reemplaza a "If we had known" en registro formal, y "would have" suele sonar /ˈwʊdəv/.',
    distractorWords: ['If', 'knew', 'will'],
    errorHunter: {
      wrongSentence: 'If we would have known about the flight cancellation, we would have booked a train.',
      wrongPart: 'If we would have known',
      correctPart: 'If we had known (o Had we known)',
      options: ['If we had known', 'If we would have known', 'If we have known', 'Had we would known'],
      explanation: 'En inglés estándar jamás se pone "would have" dentro de la cláusula con "If": la condición va en Past Perfect ("If we had known").'
    }
  },
  {
    id: 'en_dict_b2_2',
    level: 'B2',
    targetSentence: 'Seldom have I attended such a productive and well-structured seminar.',
    nativeTranslation: 'Rara vez he asistido a un seminario tan productivo y bien estructurado.',
    contextTag: 'Inversión Negativa · B2 Formal',
    phoneticTip: 'Al abrir con "Seldom", escucha el orden de pregunta en el auxiliar: "have I attended".',
    distractorWords: ['did', 'attend', 'never'],
    errorHunter: {
      wrongSentence: 'Seldom I have attended such a productive and well-structured seminar.',
      wrongPart: 'Seldom I have attended',
      correctPart: 'Seldom have I attended',
      options: ['Seldom have I attended', 'Seldom I have attended', 'Seldom did I attended', 'Rarely I attended'],
      explanation: 'Cuando colocamos un adverbio restrictivo o negativo al principio ("Seldom / Rarely / Never"), es obligatorio invertir el auxiliar antes del sujeto ("have I attended").'
    }
  },
  {
    id: 'en_dict_b2_3',
    level: 'B2',
    targetSentence: 'The board recommended that every department reduce its operational costs.',
    nativeTranslation: 'La junta recomendó que cada departamento redujera sus costos operativos.',
    contextTag: 'Subjuntivo Formal · Negocios',
    phoneticTip: 'Escucha "department reduce" (sin -s final): es el subjuntivo mandativo formal en inglés.',
    distractorWords: ['reduces', 'reduced', 'to'],
    errorHunter: {
      wrongSentence: 'The board recommended that every department reduces its operational costs.',
      wrongPart: 'every department reduces',
      correctPart: 'every department reduce',
      options: ['every department reduce', 'every department reduces', 'every department to reduce', 'every department reducing'],
      explanation: 'Tras verbos de recomendación o exigencia ("recommend / suggest / insist that..."), el inglés formal usa el subjuntivo (forma base sin -s incluso en 3ª persona singular: "reduce").'
    }
  },
  {
    id: 'en_dict_b2_4',
    level: 'B2',
    targetSentence: 'Not only did she finish the report early, but she also helped her colleagues.',
    nativeTranslation: 'No solo terminó el informe temprano, sino que también ayudó a sus colegas.',
    contextTag: 'Inversión Enfática · Not only... but also',
    phoneticTip: 'Al empezar la oración con "Not only", escucha el auxiliar invertido: "did she finish".',
    distractorWords: ['finished', 'has', 'and'],
    errorHunter: {
      wrongSentence: 'Not only she finished the report early, but she also helped her colleagues.',
      wrongPart: 'Not only she finished',
      correctPart: 'Not only did she finish',
      options: ['Not only did she finish', 'Not only she finished', 'Not only did she finished', 'Not only has she finish'],
      explanation: 'Cuando "Not only" abre la oración, invertimos como en una pregunta: "Not only did she finish..." (con el verbo principal en forma base).'
    }
  },
  {
    id: 'en_dict_b2_5',
    level: 'B2',
    targetSentence: 'It is high time we upgraded our cybersecurity infrastructure.',
    nativeTranslation: 'Ya es hora de que actualicemos nuestra infraestructura de ciberseguridad.',
    contextTag: 'Urgencia · It’s high time + Past Simple',
    phoneticTip: 'Aunque habla del presente, "It is high time we..." exige el verbo en Past Simple ("upgraded").',
    distractorWords: ['upgrade', 'will', 'have'],
    errorHunter: {
      wrongSentence: 'It is high time we upgrade our cybersecurity infrastructure.',
      wrongPart: 'we upgrade',
      correctPart: 'we upgraded',
      options: ['we upgraded', 'we upgrade', 'we will upgrade', 'we have upgraded'],
      explanation: 'La estructura "It’s time / It’s high time + sujeto" usa el Past Simple ("we upgraded") para indicar que algo ya debería haberse hecho.'
    }
  },
  {
    id: 'en_dict_b2_6',
    level: 'B2',
    targetSentence: 'No matter how complex the negotiation may seem, we will reach an agreement.',
    nativeTranslation: 'Sin importar cuán compleja pueda parecer la negociación, llegaremos a un acuerdo.',
    contextTag: 'Concesivas · No matter how + Adj',
    phoneticTip: 'Escucha el orden: "No matter how + adjetivo (complex) + sujeto (the negotiation) + verbo".',
    distractorWords: ['what', 'seems', 'although'],
    errorHunter: {
      wrongSentence: 'No matter how the negotiation may seem complex, we will reach an agreement.',
      wrongPart: 'how the negotiation may seem complex',
      correctPart: 'how complex the negotiation may seem',
      options: ['how complex the negotiation may seem', 'how the negotiation may seem complex', 'what complex the negotiation seems', 'however the negotiation complex is'],
      explanation: 'Con "No matter how" (o "However"), el adjetivo o adverbio debe ir INMEDIATAMENTE después de "how": "No matter how complex the negotiation may seem".'
    }
  }
];

// ============================================================================
// 2. DICTATION & ERROR HUNTER DATA — SPANISH COURSE (24 ITEMS: 6 PER LEVEL)
// ============================================================================
export const SPANISH_DICTATION_ITEMS: DictationItem[] = [
  // LEVEL A1 (6 ITEMS)
  {
    id: 'es_dict_a1_1',
    level: 'A1',
    targetSentence: 'Mi hermano tiene veinticinco años y trabaja en un hospital.',
    nativeTranslation: 'My brother is twenty-five years old and works at a hospital.',
    contextTag: 'Family & Age · Tener',
    phoneticTip: 'Listen closely: the H in "hermano" and "hospital" is completely silent, and V in "veinticinco" sounds like a soft B.',
    distractorWords: ['es', 'años', 'por'],
    errorHunter: {
      wrongSentence: 'Mi hermano es veinticinco años y trabaja en un hospital.',
      wrongPart: 'es veinticinco años',
      correctPart: 'tiene veinticinco años',
      options: ['tiene veinticinco años', 'es veinticinco años', 'está veinticinco años', 'tienen veinticinco años'],
      explanation: 'In Spanish, age is expressed with the verb TENER ("tiene 25 años" = literally "has 25 years"), never with SER ("es").'
    }
  },
  {
    id: 'es_dict_a1_2',
    level: 'A1',
    targetSentence: 'La estación de tren está a dos calles de la plaza central.',
    nativeTranslation: 'The train station is two blocks away from the central square.',
    contextTag: 'City Directions · Estar',
    phoneticTip: 'Notice the stress on the final syllable of "estación" and "está", and how LL in "calles" is pronounced.',
    distractorWords: ['es', 'en', 'cerca'],
    errorHunter: {
      wrongSentence: 'La estación de tren es a dos calles de la plaza central.',
      wrongPart: 'La estación de tren es',
      correctPart: 'La estación de tren está',
      options: ['La estación de tren está', 'La estación de tren es', 'La estación de tren hay', 'La estación de tren son'],
      explanation: 'Even for permanent buildings like a train station, physical location ALWAYS requires ESTAR ("está"), never SER ("es").'
    }
  },
  {
    id: 'es_dict_a1_3',
    level: 'A1',
    targetSentence: 'A nosotros nos gustan mucho los restaurantes de comida tradicional.',
    nativeTranslation: 'We really like traditional food restaurants.',
    contextTag: 'Preferences · Gustar Plural',
    phoneticTip: 'Hear the plural verb "gustan" matching the plural subject "los restaurantes".',
    distractorWords: ['gusta', 'gustamos', 'las'],
    errorHunter: {
      wrongSentence: 'A nosotros nos gusta mucho los restaurantes de comida tradicional.',
      wrongPart: 'nos gusta mucho los restaurantes',
      correctPart: 'nos gustan mucho los restaurantes',
      options: ['nos gustan mucho los restaurantes', 'nos gusta mucho los restaurantes', 'nosotros gustamos los restaurantes', 'nos gustamos los restaurantes'],
      explanation: 'With GUSTAR, the verb must agree in number with the thing liked: since "los restaurantes" is plural, it must be "nos gustan".'
    }
  },
  {
    id: 'es_dict_a1_4',
    level: 'A1',
    targetSentence: 'El concierto de guitarra empieza a las ocho de la noche.',
    nativeTranslation: 'The guitar concert starts at eight in the evening.',
    contextTag: 'Telling Time · A las + Hour',
    phoneticTip: 'Notice "empieza a las ocho": telling when an event happens always uses "a la / a las".',
    distractorWords: ['en', 'son', 'por'],
    errorHunter: {
      wrongSentence: 'El concierto de guitarra empieza en las ocho de la noche.',
      wrongPart: 'en las ocho',
      correctPart: 'a las ocho',
      options: ['a las ocho', 'en las ocho', 'son las ocho', 'por las ocho'],
      explanation: 'To say "at [time]" in Spanish, we always use the preposition A ("a la una / a las ocho"), never "en".'
    }
  },
  {
    id: 'es_dict_a1_5',
    level: 'A1',
    targetSentence: 'Tengo mucho calor porque la ventana de la oficina está cerrada.',
    nativeTranslation: 'I am very hot because the office window is closed.',
    contextTag: 'Sensations · Tener Calor / Frío',
    phoneticTip: 'Hear "Tengo mucho calor" (literally "I have much heat") and "ventana ... cerrada" (feminine agreement).',
    distractorWords: ['Estoy', 'muy', 'cerrado'],
    errorHunter: {
      wrongSentence: 'Estoy muy caliente porque la ventana de la oficina está cerrada.',
      wrongPart: 'Estoy muy caliente',
      correctPart: 'Tengo mucho calor',
      options: ['Tengo mucho calor', 'Estoy muy caliente', 'Soy mucho calor', 'Tengo muy caliente'],
      explanation: 'To say a person feels hot or cold, Spanish uses TENER + noun ("Tengo mucho calor / frío"). Saying "Estoy caliente" is a classic trap to avoid!'
    }
  },
  {
    id: 'es_dict_a1_6',
    level: 'A1',
    targetSentence: 'Todos los lunes voy al gimnasio antes de empezar a trabajar.',
    nativeTranslation: 'Every Monday I go to the gym before starting work.',
    contextTag: 'Days of the Week & Preposition + Infinitive',
    phoneticTip: 'Listen to "los lunes" (days of the week use the article "el/los", not "en") and "antes de empezar".',
    distractorWords: ['en', 'empezando', 'a'],
    errorHunter: {
      wrongSentence: 'En los lunes voy al gimnasio antes de empezando a trabajar.',
      wrongPart: 'En los lunes ... antes de empezando',
      correctPart: 'Los lunes ... antes de empezar',
      options: ['Los lunes ... antes de empezar', 'En los lunes ... antes de empezando', 'En lunes ... antes empezar', 'Los lunes ... antes que empezando'],
      explanation: 'In Spanish, days of the week use the definite article ("el lunes / los lunes", without "en"), and after a preposition ("antes de / después de / sin") we always use the Infinitive ("empezar"), never the gerund.'
    }
  },

  // LEVEL A2 (6 ITEMS)
  {
    id: 'es_dict_a2_1',
    level: 'A2',
    targetSentence: 'Ayer buscamos las llaves por toda la casa durante media hora.',
    nativeTranslation: 'Yesterday we looked for the keys all over the house for half an hour.',
    contextTag: 'Past Actions · Buscar',
    phoneticTip: 'Notice that "buscamos" goes directly before "las llaves" without any preposition after the verb.',
    distractorWords: ['para', 'buscábamos', 'los'],
    errorHunter: {
      wrongSentence: 'Ayer buscamos por las llaves por toda la casa durante media hora.',
      wrongPart: 'buscamos por las llaves',
      correctPart: 'buscamos las llaves',
      options: ['buscamos las llaves', 'buscamos por las llaves', 'buscamos para las llaves', 'buscamos a las llaves'],
      explanation: 'In Spanish, the verb BUSCAR already includes the meaning "to look for", so you NEVER put "por" or "para" after it ("buscamos las llaves").'
    }
  },
  {
    id: 'es_dict_a2_2',
    level: 'A2',
    targetSentence: 'Esta mañana ella ha hecho una reserva para cuatro personas.',
    nativeTranslation: 'This morning she has made a reservation for four people.',
    contextTag: 'Recent Past · Pretérito Perfecto',
    phoneticTip: '"Ha hecho" sounds like /a ˈe-tʃo/ because both H letters are silent.',
    distractorWords: ['hacido', 'por', 'hizo'],
    errorHunter: {
      wrongSentence: 'Esta mañana ella ha hacido una reserva para cuatro personas.',
      wrongPart: 'ha hacido',
      correctPart: 'ha hecho',
      options: ['ha hecho', 'ha hacido', 'he hecho', 'has hecho'],
      explanation: 'HACER has an irregular past participle: "hecho" (never "hacido").'
    }
  },
  {
    id: 'es_dict_a2_3',
    level: 'A2',
    targetSentence: 'Gracias por tu ayuda; este informe es para la directora general.',
    nativeTranslation: 'Thank you for your help; this report is for the general director.',
    contextTag: 'Prepositions · Por vs. Para',
    phoneticTip: 'Listen to the contrast: "Gracias POR" (cause/motive) vs. "es PARA la directora" (recipient).',
    distractorWords: ['de', 'con', 'a'],
    errorHunter: {
      wrongSentence: 'Gracias para tu ayuda; este informe es por la directora general.',
      wrongPart: 'Gracias para ... es por',
      correctPart: 'Gracias por ... es para',
      options: ['Gracias por ... es para', 'Gracias para ... es por', 'Gracias para ... es para', 'Gracias por ... es por'],
      explanation: 'We always say "Gracias POR" (reason/cause of gratitude) and "es PARA [alguien]" (destined recipient).'
    }
  },
  {
    id: 'es_dict_a2_4',
    level: 'A2',
    targetSentence: 'Cuando éramos niños, íbamos a la casa de mis abuelos cada verano.',
    nativeTranslation: 'When we were children, we used to go to my grandparents’ house every summer.',
    contextTag: 'Past Habits · Pretérito Imperfecto',
    phoneticTip: 'Both "éramos" and "íbamos" carry an accent mark on the first syllable (esdrújulas).',
    distractorWords: ['fuimos', 'estábamos', 'los'],
    errorHunter: {
      wrongSentence: 'Cuando fuimos niños, fuimos a la casa de mis abuelos cada verano.',
      wrongPart: 'Cuando fuimos niños, fuimos',
      correctPart: 'Cuando éramos niños, íbamos',
      options: ['Cuando éramos niños, íbamos', 'Cuando fuimos niños, fuimos', 'Cuando estábamos niños, íbamos', 'Cuando éramos niños, fuimos'],
      explanation: 'Ongoing childhood stages ("When we were kids") and repeated past habits ("every summer") require the Pretérito Imperfecto ("éramos / íbamos").'
    }
  },
  {
    id: 'es_dict_a2_5',
    level: 'A2',
    targetSentence: 'Ayer conocí al nuevo vecino, pero todavía no sé su nombre.',
    nativeTranslation: 'Yesterday I met the new neighbor, but I still do not know his name.',
    contextTag: 'Verbs · Conocer vs. Saber',
    phoneticTip: 'Hear "conocí al nuevo vecino" (personal "a" + conocer in preterite = met for the first time) vs. "no sé" (saber for facts).',
    distractorWords: ['supe', 'conozco', 'el'],
    errorHunter: {
      wrongSentence: 'Ayer supe el nuevo vecino, pero todavía no conozco su nombre.',
      wrongPart: 'supe el ... no conozco su nombre',
      correctPart: 'conocí al ... no sé su nombre',
      options: ['conocí al ... no sé su nombre', 'supe el ... no conozco su nombre', 'conocía el ... no sé su nombre', 'sabía al ... no conozco su nombre'],
      explanation: 'Meeting a person for the first time is "conocí a [alguien]", whereas knowing a piece of information or fact (like a name or address) uses SABER ("no sé su nombre").'
    }
  },
  {
    id: 'es_dict_a2_6',
    level: 'A2',
    targetSentence: 'Se me olvidaron los documentos importantes encima de la mesa.',
    nativeTranslation: 'I accidentally left/forgot the important documents on top of the table.',
    contextTag: 'Unplanned Events · Se + Pronombre + Verbo',
    phoneticTip: 'Listen to the plural verb "olvidaron" agreeing with the plural subject "los documentos".',
    distractorWords: ['olvidó', 'mi', 'sobre'],
    errorHunter: {
      wrongSentence: 'Se me olvidó los documentos importantes encima de la mesa.',
      wrongPart: 'Se me olvidó los documentos',
      correctPart: 'Se me olvidaron los documentos',
      options: ['Se me olvidaron los documentos', 'Se me olvidó los documentos', 'Me olvidaron los documentos', 'Se yo olvidé los documentos'],
      explanation: 'In the accidental "se" structure ("se me olvidó / olvidaron"), the verb agrees with the thing forgotten: since "los documentos" is plural, it must be "se me olvidaron".'
    }
  },

  // LEVEL B1 (6 ITEMS)
  {
    id: 'es_dict_b1_1',
    level: 'B1',
    targetSentence: 'Espero que tengas un buen viaje y me llames cuando llegues.',
    nativeTranslation: 'I hope you have a good trip and call me when you arrive.',
    contextTag: 'Subjunctive · Wishes & Future "Cuando"',
    phoneticTip: 'Notice the three subjunctive verbs in a row: "tengas", "llames", and "llegues".',
    distractorWords: ['tienes', 'llegas', 'llamas'],
    errorHunter: {
      wrongSentence: 'Espero que tienes un buen viaje y me llames cuando llegas.',
      wrongPart: 'tienes ... llegas',
      correctPart: 'tengas ... llegues',
      options: ['tengas ... llegues', 'tienes ... llegas', 'tendrás ... llegarás', 'tenga ... llegue'],
      explanation: 'Both "Espero que..." (wish) and "cuando..." referring to a future event require the Present Subjunctive ("tengas / llegues").'
    }
  },
  {
    id: 'es_dict_b1_2',
    level: 'B1',
    targetSentence: 'No creo que sea necesario aplazar la reunión hasta el próximo mes.',
    nativeTranslation: 'I do not think it is necessary to postpone the meeting until next month.',
    contextTag: 'Opinions · Negative "No creo que"',
    phoneticTip: 'Hear "que sea necesario": negative belief triggers the Present Subjunctive "sea".',
    distractorWords: ['es', 'será', 'por'],
    errorHunter: {
      wrongSentence: 'No creo que es necesario aplazar la reunión hasta el próximo mes.',
      wrongPart: 'No creo que es',
      correctPart: 'No creo que sea',
      options: ['No creo que sea', 'No creo que es', 'No creo que será', 'No pienso que es'],
      explanation: 'While affirmative "Creo que es..." uses the Indicative, negative "No creo que..." expresses doubt and requires the Subjunctive ("sea").'
    }
  },
  {
    id: 'es_dict_b1_3',
    level: 'B1',
    targetSentence: 'Llevamos más de dos años trabajando juntos en este departamento.',
    nativeTranslation: 'We have been working together in this department for over two years.',
    contextTag: 'Duration · Llevar + Gerundio',
    phoneticTip: 'Listen to "Llevamos ... trabajando": Spanish uses present-tense LLEVAR + time + gerund for ongoing duration.',
    distractorWords: ['Hemos', 'estado', 'por'],
    errorHunter: {
      wrongSentence: 'Estamos trabajando juntos en este departamento por más de dos años.',
      wrongPart: 'Estamos trabajando ... por',
      correctPart: 'Llevamos más de dos años trabajando',
      options: ['Llevamos más de dos años trabajando', 'Estamos trabajando ... por', 'Tenemos trabajando ... desde', 'Fuimos trabajando dos años'],
      explanation: 'To say how long you have been doing something, native Spanish uses "llevar + [tiempo] + gerundio" (or "hacer + tiempo + que + presente").'
    }
  },
  {
    id: 'es_dict_b1_4',
    level: 'B1',
    targetSentence: 'Te recomiendo que no firmes el contrato sin leer todas las cláusulas.',
    nativeTranslation: 'I recommend that you do not sign the contract without reading all the clauses.',
    contextTag: 'Advice & Preposition + Infinitive',
    phoneticTip: 'Notice "que no firmes" (Present Subjunctive after recommendation) and "sin leer" (Infinitive after "sin").',
    distractorWords: ['firmas', 'leyendo', 'para'],
    errorHunter: {
      wrongSentence: 'Te recomiendo que no firmas el contrato sin leyendo todas las cláusulas.',
      wrongPart: 'no firmas ... sin leyendo',
      correctPart: 'no firmes ... sin leer',
      options: ['no firmes ... sin leer', 'no firmas ... sin leyendo', 'no firmes ... sin leyendo', 'no firmar ... sin leer'],
      explanation: '"Te recomiendo que..." requires the Subjunctive ("firmes"), and prepositions like "sin" are ALWAYS followed by the Infinitive ("sin leer"), never the gerund.'
    }
  },
  {
    id: 'es_dict_b1_5',
    level: 'B1',
    targetSentence: 'Si mañana hace buen tiempo, iremos de excursión a la montaña.',
    nativeTranslation: 'If the weather is nice tomorrow, we will go hiking in the mountains.',
    contextTag: 'Real Conditionals · Si + Presente',
    phoneticTip: 'In a real future condition with "Si", the verb is ALWAYS Present Indicative ("Si hace..."), never Future or Subjunctive.',
    distractorWords: ['hará', 'haga', 'iríamos'],
    errorHunter: {
      wrongSentence: 'Si mañana hará buen tiempo, iremos de excursión a la montaña.',
      wrongPart: 'Si mañana hará',
      correctPart: 'Si mañana hace',
      options: ['Si mañana hace', 'Si mañana hará', 'Si mañana haga', 'Si mañana haciendo'],
      explanation: 'In Spanish, the Future tense ("hará") and Present Subjunctive ("haga") can NEVER follow "Si" in a condition: use Present Indicative ("Si mañana hace...").'
    }
  },
  {
    id: 'es_dict_b1_6',
    level: 'B1',
    targetSentence: 'Por mucho que insistas, no cambiarán la fecha límite de entrega.',
    nativeTranslation: 'No matter how much you insist, they will not change the delivery deadline.',
    contextTag: 'Concessive Clauses · Por mucho que + Subjunctive',
    phoneticTip: 'Hear "Por mucho que insistas": uncertain/futile concession takes the Present Subjunctive.',
    distractorWords: ['insistes', 'insistirás', 'para'],
    errorHunter: {
      wrongSentence: 'Para mucho que insistes, no cambiarán la fecha límite de entrega.',
      wrongPart: 'Para mucho que insistes',
      correctPart: 'Por mucho que insistas',
      options: ['Por mucho que insistas', 'Para mucho que insistes', 'Por más que insistirás', 'Para más que insistas'],
      explanation: 'The expression for "no matter how much" is "Por mucho que / Por más que" followed by the Subjunctive ("insistas") when referring to the future.'
    }
  },

  // LEVEL B2 (6 ITEMS)
  {
    id: 'es_dict_b2_1',
    level: 'B2',
    targetSentence: 'Si tuviera más tiempo libre, aprendería a tocar el violonchelo.',
    nativeTranslation: 'If I had more free time, I would learn to play the cello.',
    contextTag: 'Hypotheticals · Si + Imperfect Subjunctive',
    phoneticTip: 'Hear the pairing: "Si tuviera" (Imperfect Subjunctive) followed by "aprendería" (Simple Conditional with accent on -ía).',
    distractorWords: ['tendría', 'tenga', 'tenía'],
    errorHunter: {
      wrongSentence: 'Si tendría más tiempo libre, aprendería a tocar el violonchelo.',
      wrongPart: 'Si tendría',
      correctPart: 'Si tuviera',
      options: ['Si tuviera', 'Si tendría', 'Si tenga', 'Si tendré'],
      explanation: 'In Spanish, the Conditional ("tendría") can NEVER follow "Si" in a hypothetical condition: you must use the Imperfect Subjunctive ("Si tuviera").'
    }
  },
  {
    id: 'es_dict_b2_2',
    level: 'B2',
    targetSentence: 'La junta directiva nos pidió que presentáramos el presupuesto antes del jueves.',
    nativeTranslation: 'The board of directors asked us to present the budget before Thursday.',
    contextTag: 'Executive Spanish · Past Subjunctive',
    phoneticTip: 'Listen for the stress on the antepenultimate syllable in "presentáramos" (with written accent on á).',
    distractorWords: ['presentemos', 'presentamos', 'para'],
    errorHunter: {
      wrongSentence: 'La junta directiva nos pidió que presentemos el presupuesto antes del jueves.',
      wrongPart: 'nos pidió que presentemos',
      correctPart: 'nos pidió que presentáramos',
      options: ['nos pidió que presentáramos', 'nos pidió que presentemos', 'nos pidió presentar', 'nos pidió que presentamos'],
      explanation: 'When the main verb is in the past ("nos pidió que..."), sequence of tenses requires the Imperfect Subjunctive ("presentáramos").'
    }
  },
  {
    id: 'es_dict_b2_3',
    level: 'B2',
    targetSentence: 'Si lo hubiéramos sabido a tiempo, habríamos evitado aquel retraso.',
    nativeTranslation: 'If we had known it in time, we would have avoided that delay.',
    contextTag: 'Past Counterfactual · Pluscuamperfecto',
    phoneticTip: 'Listen carefully to the contrast between "hubiéramos sabido" (condition) and "habríamos evitado" (result).',
    distractorWords: ['habríamos', 'supiéramos', 'evitamos'],
    errorHunter: {
      wrongSentence: 'Si lo habríamos sabido a tiempo, habríamos evitado aquel retraso.',
      wrongPart: 'Si lo habríamos sabido',
      correctPart: 'Si lo hubiéramos sabido',
      options: ['Si lo hubiéramos sabido', 'Si lo habríamos sabido', 'Si lo habíamos sabido', 'Si lo hemos sabido'],
      explanation: 'For past counterfactuals, the "Si" clause requires the Pluperfect Subjunctive ("Si lo hubiéramos sabido"), while the result takes "habríamos evitado".'
    }
  },
  {
    id: 'es_dict_b2_4',
    level: 'B2',
    targetSentence: 'Él siempre habla de economía como si fuera un experto internacional.',
    nativeTranslation: 'He always talks about economics as if he were an international expert.',
    contextTag: 'Unreal Comparisons · Como si + Imperfect Subjunctive',
    phoneticTip: 'After "como si" ("as if"), listen for the Imperfect Subjunctive "fuera" (or "fuese").',
    distractorWords: ['es', 'sea', 'sería'],
    errorHunter: {
      wrongSentence: 'Él siempre habla de economía como si es un experto internacional.',
      wrongPart: 'como si es',
      correctPart: 'como si fuera',
      options: ['como si fuera', 'como si es', 'como si sea', 'como si sería'],
      explanation: '"Como si" ("as if") ALWAYS introduces a counterfactual comparison and requires the Imperfect or Pluperfect Subjunctive ("como si fuera"), never the Indicative or Present Subjunctive.'
    }
  },
  {
    id: 'es_dict_b2_5',
    level: 'B2',
    targetSentence: 'Las nuevas cláusulas del acuerdo fueron aprobadas por unanimidad.',
    nativeTranslation: 'The new clauses of the agreement were approved unanimously.',
    contextTag: 'Formal Passive · Gender & Number Agreement',
    phoneticTip: 'Hear the feminine plural agreement: "Las nuevas cláusulas ... fueron aprobadas".',
    distractorWords: ['aprobado', 'eran', 'fue'],
    errorHunter: {
      wrongSentence: 'Las nuevas cláusulas del acuerdo fueron aprobado por unanimidad.',
      wrongPart: 'fueron aprobado',
      correctPart: 'fueron aprobadas',
      options: ['fueron aprobadas', 'fueron aprobado', 'fue aprobadas', 'eran aprobado'],
      explanation: 'In the passive voice with SER ("fueron + participle"), the participle acts like an adjective and must agree in gender and number with the subject ("las cláusulas → aprobadas").'
    }
  },
  {
    id: 'es_dict_b2_6',
    level: 'B2',
    targetSentence: 'De haber tenido toda la información, habríamos tomado otra decisión.',
    nativeTranslation: 'Had we had all the information, we would have made a different decision.',
    contextTag: 'C-Suite Register · De + Haber + Participio',
    phoneticTip: '"De haber tenido" is a concise, formal alternative to "Si hubiéramos tenido".',
    distractorWords: ['Por', 'tener', 'hubiéramos'],
    errorHunter: {
      wrongSentence: 'De habríamos tenido toda la información, habríamos tomado otra decisión.',
      wrongPart: 'De habríamos tenido',
      correctPart: 'De haber tenido (o Si hubiéramos tenido)',
      options: ['De haber tenido', 'De habríamos tenido', 'De teniendo', 'Por haber tenido'],
      explanation: 'In formal Spanish, "De + haber + participio" ("De haber tenido...") is an elegant conditional structure equivalent to "Si hubiéramos tenido...".'
    }
  }
];

// ============================================================================
// 3. REAL-WORLD SURVIVAL MISSIONS — ENGLISH COURSE (12 MISSIONS: 3 PER LEVEL)
// ============================================================================
export const ENGLISH_SURVIVAL_MISSIONS: SurvivalMission[] = [
  // -------------------- LEVEL A1 (3 MISSIONS) --------------------
  {
    id: 'en_surv_a1_1',
    level: 'A1',
    title: 'Misión A1 #1 · Cena en Londres y Cuenta Dividida',
    locationBadge: 'A1 · Restaurante & Pagos',
    scenarioSummary: 'Estás cenando en un restaurante en Londres. Debes pedir una mesa, ordenar tu plato de forma natural y pedir la cuenta pagando con tarjeta.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Hostess (Recepcionista)',
        npcLine: 'Good evening! Welcome to The Covent Garden Bistro. Do you have a reservation?',
        npcTranslation: '¡Buenas noches! Bienvenido a The Covent Garden Bistro. ¿Tiene una reservación?',
        missionObjective: 'Di que no tienes reservación y pregunta si hay una mesa disponible para dos personas junto a la ventana.',
        options: [
          'No, I don’t. Do you have a table for two by the window, please?',
          'No, I haven’t reservation. Give me a table for two people in the window.',
          'No reservation. Are there two chairs near the glass?'
        ],
        correctOption: 'No, I don’t. Do you have a table for two by the window, please?',
        feedbackExplanation: '¡Perfecto! En inglés respondemos a "Do you have...?" con "No, I don’t", y usamos "a table for two by the window" de manera cortés.'
      },
      {
        stepNumber: 2,
        npcRole: 'Waiter (Mesero)',
        npcLine: 'Here is your menu. Are you ready to order, or do you need a few more minutes?',
        npcTranslation: 'Aquí tiene su menú. ¿Está listo para ordenar o necesita unos minutos más?',
        missionObjective: 'Pide el salmón a la parrilla y agua sin gas usando la estructura natural para ordenar comida en inglés.',
        options: [
          'I’ll have the grilled salmon and a bottle of still water, please.',
          'I want eat the salmon grilled and one water without gas.',
          'Put me the grilled salmon and quiet water, please.'
        ],
        correctOption: 'I’ll have the grilled salmon and a bottle of still water, please.',
        feedbackExplanation: '¡Excelente! Para pedir comida en un restaurante nunca decimos "Put me..." ni "I want eat": lo natural es "I’ll have..." o "I’d like...", y el agua sin gas se llama "still water".'
      },
      {
        stepNumber: 3,
        npcRole: 'Waiter (Mesero)',
        npcLine: 'I hope you enjoyed your meal! Can I get you anything else tonight?',
        npcTranslation: '¡Espero que haya disfrutado su comida! ¿Puedo traerle algo más esta noche?',
        missionObjective: 'Pide la cuenta y pregunta si pueden pagar por separado con tarjeta.',
        options: [
          'Could we have the bill, please? Can we pay separately by card?',
          'Bring the account, please. Can we pay separated with card?',
          'How much is the money? We pay with plastic card.'
        ],
        correctOption: 'Could we have the bill, please? Can we pay separately by card?',
        feedbackExplanation: '¡Misión A1 #1 completada! La cuenta del restaurante es "the bill" (o "the check", nunca "the account"), "por separado" es "separately" y "con tarjeta" es "by card".'
      }
    ]
  },
  {
    id: 'en_surv_a1_2',
    level: 'A1',
    title: 'Misión A1 #2 · Check-in en el Hotel, Desayuno y Wifi',
    locationBadge: 'A1 · Hotel & Recepción',
    scenarioSummary: 'Acabas de llegar a tu hotel en Chicago. Debes registrarte dando tu apellido, preguntar el horario del desayuno y pedir la clave del wifi.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Front Desk Clerk (Recepcionista de Hotel)',
        npcLine: 'Good afternoon! Welcome to The Lakeview Hotel. How can I help you today?',
        npcTranslation: '¡Buenas tardes! Bienvenido al Hotel Lakeview. ¿Cómo puedo ayudarle hoy?',
        missionObjective: 'Di que tienes una reservación a nombre tuyo para tres noches.',
        options: [
          'Hello! I’d like to check in, please. I have a reservation for three nights under the name Mendoza.',
          'Hello! I want enter the hotel. My reservation is with the name Mendoza for three days.',
          'Good afternoon! Give me my room for three nights, please.'
        ],
        correctOption: 'Hello! I’d like to check in, please. I have a reservation for three nights under the name Mendoza.',
        feedbackExplanation: '¡Muy bien! En hoteles siempre usamos "check in" y la expresión estándar para decir "a nombre de..." es "under the name [Apellido]".'
      },
      {
        stepNumber: 2,
        npcRole: 'Front Desk Clerk (Recepcionista de Hotel)',
        npcLine: 'Thank you! I see your booking right here. You are in room 405 on the fourth floor. Here is your key card.',
        npcTranslation: '¡Gracias! Veo su reserva aquí mismo. Está en la habitación 405 en el cuarto piso. Aquí tiene su tarjeta llave.',
        missionObjective: 'Pregunta si el desayuno está incluido y a qué hora empieza.',
        options: [
          'Thank you! Is breakfast included, and what time does it start?',
          'Thanks! The breakfast is include? At what hour starts it?',
          'Do you have breakfast free and when is the hour?'
        ],
        correctOption: 'Thank you! Is breakfast included, and what time does it start?',
        feedbackExplanation: '¡Exacto! "Is breakfast included?" (sin artículo "the") y "what time does it start?" con el auxiliar "does".'
      },
      {
        stepNumber: 3,
        npcRole: 'Front Desk Clerk (Recepcionista de Hotel)',
        npcLine: 'Yes, breakfast is included from 7:00 to 10:00 AM in the dining room. Do you need anything else?',
        npcTranslation: 'Sí, el desayuno está incluido de 7:00 a 10:00 AM en el comedor. ¿Necesita algo más?',
        missionObjective: 'Pide la contraseña del wifi de la habitación y pregunta dónde están los ascensores.',
        options: [
          'Yes, could you tell me the Wi-Fi password, and where are the elevators?',
          'Yes, how is the secret word of internet and where is the elevator?',
          'Give me the Wi-Fi code and where is the machine to go up?'
        ],
        correctOption: 'Yes, could you tell me the Wi-Fi password, and where are the elevators?',
        feedbackExplanation: '¡Misión A1 #2 superada! "The Wi-Fi password" y "where are the elevators?" (o "lifts" en el Reino Unido) son esenciales en cualquier viaje.'
      }
    ]
  },
  {
    id: 'en_surv_a1_3',
    level: 'A1',
    title: 'Misión A1 #3 · Compras de Ropa, Probador y Tallas',
    locationBadge: 'A1 · Tienda & Tallas',
    scenarioSummary: 'Estás comprando una chaqueta en una tienda en Toronto. Debes preguntar dónde están los probadores, pedir una talla mediana y conservar el recibo.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Shop Assistant (Vendedora)',
        npcLine: 'Hi there! Let me know if you need help finding your size.',
        npcTranslation: '¡Hola! Avíseme si necesita ayuda para encontrar su talla.',
        missionObjective: 'Pregunta si puedes probarte esta chaqueta y dónde están los probadores.',
        options: [
          'Excuse me, can I try this jacket on? Where are the fitting rooms?',
          'Sorry, can I prove this jacket? Where is the room for clothes?',
          'I want to test this jacket in my body. Where do I go?'
        ],
        correctOption: 'Excuse me, can I try this jacket on? Where are the fitting rooms?',
        feedbackExplanation: '¡Excelente! Para ropa nunca usamos "prove" ni "test": usamos el phrasal verb "try on" ("try this jacket on"), y los probadores son "the fitting rooms" (o "changing rooms").'
      },
      {
        stepNumber: 2,
        npcRole: 'Shop Assistant (Vendedora)',
        npcLine: 'The fitting rooms are right over there on the left. How does the jacket fit?',
        npcTranslation: 'Los probadores están justo allá a la izquierda. ¿Cómo le queda la chaqueta?',
        missionObjective: 'Di que te queda un poco pequeña y pregunta si la tienen en talla mediana en negro.',
        options: [
          'It’s a bit too small. Do you have this in a medium in black?',
          'It is little for me. Have you got a median size with black color?',
          'It doesn’t enter me well. Give me a middle size black.'
        ],
        correctOption: 'It’s a bit too small. Do you have this in a medium in black?',
        feedbackExplanation: '¡Perfecto! Para decir que una prenda queda chica decimos "It’s a bit too small / tight", y la talla mediana se dice "a medium" (nunca "median").'
      },
      {
        stepNumber: 3,
        npcRole: 'Shop Assistant (Vendedora)',
        npcLine: 'Here is the medium in black! It looks great on you. Would you like to take it?',
        npcTranslation: '¡Aquí tiene la mediana en negro! Le queda genial. ¿Le gustaría llevársela?',
        missionObjective: 'Di que te la llevas y pregunta si puedes devolverla con el recibo si cambias de opinión.',
        options: [
          'Yes, I’ll take it! Can I return it with the receipt if I need to?',
          'Yes, I carry it! Can I give it back with the ticket if I want?',
          'Yes, I buy it now. Do you give back money?'
        ],
        correctOption: 'Yes, I’ll take it! Can I return it with the receipt if I need to?',
        feedbackExplanation: '¡Misión A1 #3 completada! Para decir "¡Me la llevo!" al comprar algo en inglés siempre decimos "I’ll take it!", y el comprobante de compra es "the receipt".'
      }
    ]
  },

  // -------------------- LEVEL A2 (3 MISSIONS) --------------------
  {
    id: 'en_surv_a2_1',
    level: 'A2',
    title: 'Misión A2 #1 · Equipaje Perdido en el Aeropuerto',
    locationBadge: 'A2 · Aeropuerto & Reclamos',
    scenarioSummary: 'Acabas de aterrizar en Nueva York y tu maleta no salió en la banda de equipaje. Debes reportarla en el mostrador de Baggage Claim.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Baggage Agent (Agente de Equipaje)',
        npcLine: 'Hello! How can I help you at the Baggage Service desk today?',
        npcTranslation: '¡Hola! ¿Cómo puedo ayudarle hoy en el mostrador de servicio de equipaje?',
        missionObjective: 'Explica en pasado simple que llegaste en el vuelo de Madrid y tu maleta no apareció.',
        options: [
          'I arrived on the flight from Madrid twenty minutes ago, and my suitcase didn’t come out.',
          'I am arrive in the flight of Madrid, and my luggage not appeared.',
          'My suitcase has lost when I was arriving from Madrid.'
        ],
        correctOption: 'I arrived on the flight from Madrid twenty minutes ago, and my suitcase didn’t come out.',
        feedbackExplanation: '¡Muy bien! Usaste el Past Simple afirmativo ("I arrived on the flight...") y negativo ("didn’t come out") con la expresión temporal "twenty minutes ago".'
      },
      {
        stepNumber: 2,
        npcRole: 'Baggage Agent (Agente de Equipaje)',
        npcLine: 'I’m sorry to hear that. May I see your boarding pass and baggage tag? Also, what does your suitcase look like?',
        npcTranslation: 'Lamento escuchar eso. ¿Puedo ver su pase de abordar y etiqueta de equipaje? Además, ¿cómo es su maleta?',
        missionObjective: 'Describe tu maleta con el orden correcto de adjetivos (tamaño + color) y entrega tu etiqueta.',
        options: [
          'Here is the tag. It’s a large dark-blue hard-shell suitcase with a red ribbon on the handle.',
          'Here you have. It is a suitcase blue big with a ribbon red in the hand.',
          'It looks like big and blue dark. Here is my ticket.'
        ],
        correctOption: 'Here is the tag. It’s a large dark-blue hard-shell suitcase with a red ribbon on the handle.',
        feedbackExplanation: '¡Exacto! En inglés los adjetivos van ANTES del sustantivo en orden Tamaño → Color → Material ("a large dark-blue hard-shell suitcase").'
      },
      {
        stepNumber: 3,
        npcRole: 'Baggage Agent (Agente de Equipaje)',
        npcLine: 'I’ve located it in the system! It was loaded onto the next flight. Where are you staying so we can deliver it tonight?',
        npcTranslation: '¡La localicé en el sistema! Fue cargada en el siguiente vuelo. ¿Dónde se hospeda para enviársela esta noche?',
        missionObjective: 'Indica en qué hotel te estás quedando y pregunta a qué hora llegará.',
        options: [
          'I’m staying at the Midtown Grand Hotel. Do you know what time it will arrive?',
          'I stay in the Midtown Grand Hotel. At what hour will it arrive?',
          'I am lived at Midtown Hotel. When do you bring it?'
        ],
        correctOption: 'I’m staying at the Midtown Grand Hotel. Do you know what time it will arrive?',
        feedbackExplanation: '¡Misión A2 #1 completada! Para alojamiento temporal en un viaje usamos Present Continuous ("I’m staying at...") y una pregunta indirecta natural ("Do you know what time it will arrive?").'
      }
    ]
  },
  {
    id: 'en_surv_a2_2',
    level: 'A2',
    title: 'Misión A2 #2 · Consulta Médica y Farmacia de Guardia',
    locationBadge: 'A2 · Salud & Síntomas',
    scenarioSummary: 'Tienes fiebre y dolor de garganta durante un viaje. Debes explicar tus síntomas desde ayer, preguntar si eres alérgico a algo y entender la dosis.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Doctor (Médica)',
        npcLine: 'Come on in and have a seat. What seems to be the problem today?',
        npcTranslation: 'Pase y tome asiento. ¿Cuál parece ser el problema hoy?',
        missionObjective: 'Explica que tienes dolor de garganta y fiebre desde ayer por la noche.',
        options: [
          'I’ve had a sore throat and a slight fever since last night, and it hurts when I swallow.',
          'I have pain in my neck and hot temperature from yesterday night.',
          'My throat is angry since yesterday and I am with fever.'
        ],
        correctOption: 'I’ve had a sore throat and a slight fever since last night, and it hurts when I swallow.',
        feedbackExplanation: '¡Excelente! "A sore throat" es dolor de garganta, y para un síntoma que empezó anoche y sigue hoy usamos Present Perfect con "since last night".'
      },
      {
        stepNumber: 2,
        npcRole: 'Doctor (Médica)',
        npcLine: 'Let me check your throat. Yes, it looks quite inflamed. Are you allergic to any medications?',
        npcTranslation: 'Déjeme revisar su garganta. Sí, se ve bastante inflamada. ¿Es alérgico a algún medicamento?',
        missionObjective: 'Di que no eres alérgico a ningún medicamento y pregunta si necesitas antibióticos.',
        options: [
          'No, I’m not allergic to anything. Do I need to take antibiotics, or just painkillers?',
          'No, I don’t have allergy with nothing. Must I eat antibiotics?',
          'Nothing of allergies. Do you give me strong pills?'
        ],
        correctOption: 'No, I’m not allergic to anything. Do I need to take antibiotics, or just painkillers?',
        feedbackExplanation: '¡Muy bien! En inglés no hacemos doble negación: con "not" usamos "anything" ("I’m not allergic to anything"), y para medicamentos usamos el verbo "take" (nunca "eat").'
      },
      {
        stepNumber: 3,
        npcRole: 'Doctor (Médica)',
        npcLine: 'I’m writing you a prescription. Take one tablet after meals twice a day and drink plenty of fluids.',
        npcTranslation: 'Le estoy escribiendo una receta. Tome una pastilla después de las comidas dos veces al día y beba muchos líquidos.',
        missionObjective: 'Agradece la receta y pregunta cuántos días debes seguir el tratamiento.',
        options: [
          'Thank you, Doctor. How many days should I keep taking the medication?',
          'Thanks for the recipe. How much days must I continue with the pills?',
          'Thank you. Until when I take this medicine?'
        ],
        correctOption: 'Thank you, Doctor. How many days should I keep taking the medication?',
        feedbackExplanation: '¡Misión A2 #2 completada! Recuerda que receta médica es "prescription" ("recipe" es receta de cocina), y con sustantivos contables plurales ("days") usamos "How many" + "keep taking".'
      }
    ]
  },
  {
    id: 'en_surv_a2_3',
    level: 'A2',
    title: 'Misión A2 #3 · Problema con Tarjeta en Cajero Bancario',
    locationBadge: 'A2 · Banco & Finanzas',
    scenarioSummary: 'El cajero automático fuera del banco retuvo tu tarjeta de débito. Entra a la sucursal para recuperar tu tarjeta y verificar que no haya cargos duplicados.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Bank Teller (Cajero de Sucursal)',
        npcLine: 'Good morning! Welcome to First National Bank. How may I assist you?',
        npcTranslation: '¡Buenos días! Bienvenido a First National Bank. ¿En qué puedo ayudarle?',
        missionObjective: 'Explica que estabas retirando efectivo cuando el cajero automático se tragó tu tarjeta.',
        options: [
          'I was withdrawing cash outside when the ATM screen froze and kept my debit card.',
          'I withdrew money and the machine ate my card right now.',
          'The box machine outside took my card while I take money.'
        ],
        correctOption: 'I was withdrawing cash outside when the ATM screen froze and kept my debit card.',
        feedbackExplanation: '¡Gran combinación de Past Continuous ("I was withdrawing cash") con Past Simple ("when the screen froze and kept my card")!'
      },
      {
        stepNumber: 2,
        npcRole: 'Bank Teller (Cajero de Sucursal)',
        npcLine: 'I can help you with that right away. Do you have your passport or ID with you so I can verify your identity?',
        npcTranslation: 'Puedo ayudarle con eso de inmediato. ¿Trae su pasaporte o identificación para verificar su identidad?',
        missionObjective: 'Entrega tu pasaporte y pregunta si el cajero alcanzó a cobrar el retiro de tu cuenta.',
        options: [
          'Yes, here is my passport. Could you also check if the withdrawal was charged to my account?',
          'Yes, take my passport. Did the machine take the money from my bank?',
          'Here you have my ID. Look if my money is less now.'
        ],
        correctOption: 'Yes, here is my passport. Could you also check if the withdrawal was charged to my account?',
        feedbackExplanation: '¡Perfecto! "The withdrawal" es el retiro bancario y "was charged to my account" es la expresión exacta para cargos en cuenta.'
      },
      {
        stepNumber: 3,
        npcRole: 'Bank Teller (Cajero de Sucursal)',
        npcLine: 'No money was deducted, and I have retrieved your card from the machine. Please check that it works at the counter.',
        npcTranslation: 'No se descontó dinero y ya recuperé su tarjeta de la máquina. Por favor verifique que funcione en el mostrador.',
        missionObjective: 'Agradece la rapidez del servicio y pide retirar cien dólares directamente en ventanilla.',
        options: [
          'Thank you so much for your help! Could I withdraw one hundred dollars right here at the counter?',
          'Thanks a lot! Can I take out hundred dollars here in the window?',
          'Very kind! Give me one hundred dollars from my card, please.'
        ],
        correctOption: 'Thank you so much for your help! Could I withdraw one hundred dollars right here at the counter?',
        feedbackExplanation: '¡Misión A2 #3 superada! "Withdraw one hundred dollars at the counter" es claro, educado y 100% natural.'
      }
    ]
  },

  // -------------------- LEVEL B1 (3 MISSIONS) --------------------
  {
    id: 'en_surv_b1_1',
    level: 'B1',
    title: 'Misión B1 #1 · Entrevista Laboral y Negociación Híbrida',
    locationBadge: 'B1 · Carrera & Entrevista',
    scenarioSummary: 'Estás en una entrevista de trabajo en inglés para un puesto internacional. Debes hablar de tu experiencia continua, responder a un reto hipotético y acordar modalidad híbrida.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Hiring Manager (Directora de Selección)',
        npcLine: 'Thanks for joining us today. Could you tell me about your background and how long you’ve been working in your current field?',
        npcTranslation: 'Gracias por acompañarnos hoy. ¿Podría contarme sobre su trayectoria y cuánto tiempo lleva trabajando en su área actual?',
        missionObjective: 'Explica cuánto tiempo llevas trabajando en gestión de proyectos usando Present Perfect Continuous.',
        options: [
          'I’ve been managing digital projects for over four years, focusing on cross-functional teams.',
          'I am managing digital projects since four years ago with different teams.',
          'I have worked in projects during four years and I am very experience.'
        ],
        correctOption: 'I’ve been managing digital projects for over four years, focusing on cross-functional teams.',
        feedbackExplanation: '¡Impecable! Para expresar una actividad que iniciaste en el pasado y sigues desempeñando hoy usamos "I’ve been + verbo-ing + for [tiempo]".'
      },
      {
        stepNumber: 2,
        npcRole: 'Hiring Manager (Directora de Selección)',
        npcLine: 'Suppose a key client suddenly changed the project scope two days before the deadline. How would you handle it?',
        npcTranslation: 'Suponga que un cliente clave cambiara de repente el alcance del proyecto dos días antes de la fecha límite. ¿Cómo lo manejaría?',
        missionObjective: 'Responde a la situación hipotética usando el Second Conditional correctamente.',
        options: [
          'If a client changed the scope at the last minute, I would assess the impact and negotiate a realistic timeline.',
          'If a client would change the scope, I will talk with them and change the date.',
          'When a client changes it, I would have called my boss immediately.'
        ],
        correctOption: 'If a client changed the scope at the last minute, I would assess the impact and negotiate a realistic timeline.',
        feedbackExplanation: '¡Excelente dominio del Second Conditional! "If + Past Simple (changed) → would + verbo base (would assess)".'
      },
      {
        stepNumber: 3,
        npcRole: 'Hiring Manager (Directora de Selección)',
        npcLine: 'We’re very impressed with your answers. Do you have any questions for us regarding the work arrangement?',
        npcTranslation: 'Estamos muy impresionados con sus respuestas. ¿Tiene alguna pregunta sobre la modalidad de trabajo?',
        missionObjective: 'Pregunta con cortesía profesional si el equipo ofrece esquema de trabajo híbrido.',
        options: [
          'I was wondering whether the team operates on a hybrid schedule during the week.',
          'I want to know if can I work from my house some days.',
          'Tell me how many days I must go to the office.'
        ],
        correctOption: 'I was wondering whether the team operates on a hybrid schedule during the week.',
        feedbackExplanation: '¡Misión B1 #1 superada! "I was wondering whether..." con orden afirmativo ("the team operates") es la forma más elegante y profesional de preguntar en una entrevista.'
      }
    ]
  },
  {
    id: 'en_surv_b1_2',
    level: 'B1',
    title: 'Misión B1 #2 · Garantía y Reemplazo de Portátil Defectuoso',
    locationBadge: 'B1 · Servicio Técnico & Reclamos',
    scenarioSummary: 'Compraste una laptop hace diez días y la batería se apaga sola. Debes explicar la falla técnica y solicitar un reemplazo inmediato bajo garantía.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Customer Support Specialist (Especialista de Soporte)',
        npcLine: 'Hello! Welcome to the TechCare Desk. What issue are you experiencing with your laptop?',
        npcTranslation: '¡Hola! Bienvenido al mostrador TechCare. ¿Qué inconveniente está experimentando con su portátil?',
        missionObjective: 'Explica que compraste la laptop la semana pasada, pero se apaga sola aunque esté cargada.',
        options: [
          'I bought this laptop ten days ago, and it keeps shutting down even when the battery is fully charged.',
          'I have bought this computer last week and it turns off by itself although has battery.',
          'This laptop is broken since ten days; it stops working all the time.'
        ],
        correctOption: 'I bought this laptop ten days ago, and it keeps shutting down even when the battery is fully charged.',
        feedbackExplanation: '¡Muy natural! Con "ten days ago" usamos Past Simple ("I bought"), y "keeps shutting down" expresa una falla que se repite continuamente.'
      },
      {
        stepNumber: 2,
        npcRole: 'Customer Support Specialist (Especialista de Soporte)',
        npcLine: 'I see. We can send it to our repair center, which usually takes about two weeks.',
        npcTranslation: 'Entiendo. Podemos enviarla a nuestro centro de reparación, lo cual suele tardar unas dos semanas.',
        missionObjective: 'Rechaza cortésmente esperar dos semanas porque la necesitas para trabajar y pide un reemplazo directo bajo la política de 14 días.',
        options: [
          'Since I’m still within the fourteen-day return window, I’d prefer a direct replacement rather than waiting two weeks.',
          'I cannot wait two weeks because I work. You must give me a new computer today.',
          'I prefer that you changing it now instead to wait fourteen days.'
        ],
        correctOption: 'Since I’m still within the fourteen-day return window, I’d prefer a direct replacement rather than waiting two weeks.',
        feedbackExplanation: '¡Excelente negociación B1! Usaste "Since..." (Ya que...), "within the return window" y la estructura "I’d prefer [sustantivo] rather than [verbo-ing]".'
      },
      {
        stepNumber: 3,
        npcRole: 'Customer Support Specialist (Especialista de Soporte)',
        npcLine: 'You’re right—your purchase qualifies for an immediate exchange. Would you like the exact same model?',
        npcTranslation: 'Tiene razón: su compra califica para un cambio inmediato. ¿Le gustaría exactamente el mismo modelo?',
        missionObjective: 'Acepta el mismo modelo y asegúrate de que la garantía se actualice con el nuevo número de serie.',
        options: [
          'Yes, the same model works for me. Could you make sure the warranty is updated with the new serial number?',
          'Yes, give me the same. Please look that the warranty has the new number.',
          'Yes, I take it, and don’t forget updating the paper of warranty.'
        ],
        correctOption: 'Yes, the same model works for me. Could you make sure the warranty is updated with the new serial number?',
        feedbackExplanation: '¡Misión B1 #2 completada! "Works for me" + "make sure the warranty is updated" (voz pasiva) suenan completamente nativos.'
      }
    ]
  },
  {
    id: 'en_surv_b1_3',
    level: 'B1',
    title: 'Misión B1 #3 · Cambio Urgente de Proveedor para Evento',
    locationBadge: 'B1 · Coordinación & Logística',
    scenarioSummary: 'El servicio de catering canceló a dos días del evento anual de tu empresa. Debes coordinar con un nuevo proveedor, confirmar menú vegetariano y cerrar el presupuesto.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Catering Director (Director de Banquetes)',
        npcLine: 'Hello, this is Prime Events Catering. I heard you have an urgent request for this Thursday?',
        npcTranslation: 'Hola, habla Prime Events Catering. ¿Escuché que tienen una solicitud urgente para este jueves?',
        missionObjective: 'Explica que el proveedor anterior canceló de imprevisto y pregunta si pueden atender a ochenta invitados.',
        options: [
          'Yes! Our previous caterer canceled unexpectedly this morning. Would you be able to cater for eighty guests on Thursday?',
          'Yes, the other company canceled today. Can you make food for eighty people the Thursday?',
          'We have a problem because the caterer didn’t came. Have you food for eighty guests?'
        ],
        correctOption: 'Yes! Our previous caterer canceled unexpectedly this morning. Would you be able to cater for eighty guests on Thursday?',
        feedbackExplanation: '¡Perfecto! "Canceled unexpectedly" y la pregunta cortés "Would you be able to cater for...?" establecen un tono profesional inmediato.'
      },
      {
        stepNumber: 2,
        npcRole: 'Catering Director (Director de Banquetes)',
        npcLine: 'We do have availability on Thursday morning! Are there any dietary restrictions we should be aware of?',
        npcTranslation: '¡Sí tenemos disponibilidad el jueves por la mañana! ¿Hay alguna restricción alimentaria que debamos tener en cuenta?',
        missionObjective: 'Indica que al menos quince asistentes son vegetarianos o intolerantes al gluten.',
        options: [
          'Yes, at least fifteen attendees are either vegetarian or gluten-free, so we’ll need clearly labeled options.',
          'Yes, fifteen persons don’t eat meat or gluten, so put names in the plates.',
          'There are fifteen vegetarians that they cannot eat bread.'
        ],
        correctOption: 'Yes, at least fifteen attendees are either vegetarian or gluten-free, so we’ll need clearly labeled options.',
        feedbackExplanation: '¡Gran precisión! "Attendees" (asistentes a un evento), "either... or..." y "clearly labeled options" son expresiones clave en logística corporativa.'
      },
      {
        stepNumber: 3,
        npcRole: 'Catering Director (Director de Banquetes)',
        npcLine: 'Not a problem at all. I’ll prepare the quote right now. How soon do you need the final invoice?',
        npcTranslation: 'Ningún problema. Prepararé la cotización ahora mismo. ¿Qué tan pronto necesita la factura final?',
        missionObjective: 'Pide que te envíen la cotización tan pronto como esté lista para que finanzas apruebe el pago hoy.',
        options: [
          'Please send it over as soon as it’s ready so that our finance team can approve the payment today.',
          'Send me the price when it will be ready for finance approves it today.',
          'As soon as you will finish, send it to pay today.'
        ],
        correctOption: 'Please send it over as soon as it’s ready so that our finance team can approve the payment today.',
        feedbackExplanation: '¡Misión B1 #3 superada! Recuerda que después de conectores de tiempo como "as soon as" usamos Present Simple ("as soon as it’s ready"), nunca "will".'
      }
    ]
  },

  // -------------------- LEVEL B2 (3 MISSIONS) --------------------
  {
    id: 'en_surv_b2_1',
    level: 'B2',
    title: 'Misión B2 #1 · Junta Ejecutiva: Defensa de Presupuesto y Plazos',
    locationBadge: 'B2 · Negociación Ejecutiva',
    scenarioSummary: 'Lideras una reunión trimestral con la junta directiva. Debes explicar diplomáticamente un retraso pasado, proponer una mitigación y cerrar un acuerdo de presupuesto.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'VP of Operations (Vicepresidente de Operaciones)',
        npcLine: 'Phase One of the platform rollout was delayed by ten days last month. What happened there?',
        npcTranslation: 'La Fase Uno del lanzamiento de la plataforma se retrasó diez días el mes pasado. ¿Qué ocurrió allí?',
        missionObjective: 'Explica la causa usando un Third Conditional formal con inversión ("Had we...") para demostrar control ejecutivo.',
        options: [
          'Had we received the security audit earlier, we would have launched on schedule without compromising data integrity.',
          'If we would have received the security audit earlier, we had launched on time.',
          'It was not our fault because the security team was very slow with the audit.'
        ],
        correctOption: 'Had we received the security audit earlier, we would have launched on schedule without compromising data integrity.',
        feedbackExplanation: '¡Nivel C-Suite! La inversión formal del Third Conditional ("Had we received..., we would have launched...") proyecta máxima autoridad y precisión gramatical.'
      },
      {
        stepNumber: 2,
        npcRole: 'Chief Financial Officer (Directora Financiera)',
        npcLine: 'Even so, you are requesting an additional 15% budget for Q3. Is that investment really necessary right now?',
        npcTranslation: 'Aun así, está solicitando un 15% adicional de presupuesto para el tercer trimestre. ¿Es realmente necesaria esa inversión ahora?',
        missionObjective: 'Defiende la inversión usando un conector concesivo avanzado y vocabulario de mitigación de riesgos.',
        options: [
          'While I understand the budget constraints, allocating these funds now will mitigate long-term infrastructure bottlenecks.',
          'Although you don’t want to spend money, we need 15% more for buying better servers.',
          'Despite of the cost, it is obligatory that you approve the budget today.'
        ],
        correctOption: 'While I understand the budget constraints, allocating these funds now will mitigate long-term infrastructure bottlenecks.',
        feedbackExplanation: '¡Brillante! "While I understand [objection], [gerund subject] will mitigate..." valida la preocupación de finanzas y demuestra retorno estratégico.'
      },
      {
        stepNumber: 3,
        npcRole: 'VP of Operations (Vicepresidente de Operaciones)',
        npcLine: 'Fair point. If we approve the budget today, when can we expect the full migration to be completed?',
        npcTranslation: 'Buen punto. Si aprobamos el presupuesto hoy, ¿para cuándo podemos esperar que se complete toda la migración?',
        missionObjective: 'Compromete una fecha clara usando Future Perfect ("By the end of..., we will have + participle").',
        options: [
          'By the end of October, our team will have completed the full migration and stress-tested all servers.',
          'Until the end of October, our team will complete all the migration.',
          'In October end, we are going to have finish everything.'
        ],
        correctOption: 'By the end of October, our team will have completed the full migration and stress-tested all servers.',
        feedbackExplanation: '¡Misión B2 #1 Ejecutiva superada! "By [deadline], we will have completed..." es la estructura exacta del Future Perfect para comprometer entregables corporativos.'
      }
    ]
  },
  {
    id: 'en_surv_b2_2',
    level: 'B2',
    title: 'Misión B2 #2 · Negociación Salarial y Evaluación de Impacto',
    locationBadge: 'B2 · Liderazgo & Carrera',
    scenarioSummary: 'Estás en tu revisión anual de desempeño. Debes presentar tus logros medibles con inversión enfática, negociar un ajuste salarial y acordar objetivos de liderazgo.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Department Director (Director de Departamento)',
        npcLine: 'You’ve had a strong year leading the regional expansion. How would you summarize your key contributions?',
        npcTranslation: 'Has tenido un gran año liderando la expansión regional. ¿Cómo resumirías tus principales aportaciones?',
        missionObjective: 'Destaca dos logros clave usando la inversión enfática "Not only did we..., but we also...".',
        options: [
          'Not only did we exceed our annual revenue target by 22%, but we also reduced client churn to a record low.',
          'Not only we exceeded the revenue target, also we reduced the clients that left.',
          'We made 22% more money and the clients stayed with us.'
        ],
        correctOption: 'Not only did we exceed our annual revenue target by 22%, but we also reduced client churn to a record low.',
        feedbackExplanation: '¡Impacto ejecutivo total! La estructura invertida "Not only did we exceed..., but we also reduced..." es ideal para resaltar logros cuantificables.'
      },
      {
        stepNumber: 2,
        npcRole: 'Department Director (Director de Departamento)',
        npcLine: 'Those numbers are undeniable. However, company-wide salary increases are capped at 5% this quarter.',
        npcTranslation: 'Esas cifras son innegables. Sin embargo, los aumentos salariales generales están limitados al 5% este trimestre.',
        missionObjective: 'Plantea con diplomacia que tu alcance de responsabilidades se ha duplicado y propón revisar el paquete total con un bono por objetivos.',
        options: [
          'Given that my scope of responsibility has doubled over the past year, I’d like to explore a performance-based bonus structure alongside a base adjustment.',
          'Because I work the double now, 5% is not enough and I demand 15% more.',
          'If you don’t pay me more than 5%, I will have to look for another company.'
        ],
        correctOption: 'Given that my scope of responsibility has doubled over the past year, I’d like to explore a performance-based bonus structure alongside a base adjustment.',
        feedbackExplanation: '¡Negociación de alto nivel! "Given that my scope of responsibility has doubled..." sustenta tu petición en hechos objetivos sin sonar confrontativo.'
      },
      {
        stepNumber: 3,
        npcRole: 'Department Director (Director de Departamento)',
        npcLine: 'That’s a constructive approach. I can recommend a 10% base adjustment plus a quarterly incentive to HR.',
        npcTranslation: 'Ese es un enfoque constructivo. Puedo recomendar a Recursos Humanos un ajuste base del 10% más un incentivo trimestral.',
        missionObjective: 'Agradece el respaldo y solicita que los nuevos términos queden formalizados por escrito antes del cierre de mes.',
        options: [
          'I appreciate your support. I’d be grateful if we could have the revised terms put in writing before the end of the month.',
          'Thanks! Please write it in a paper before the month finishes.',
          'Great, I hope HR puts the money in my contract soon.'
        ],
        correctOption: 'I appreciate your support. I’d be grateful if we could have the revised terms put in writing before the end of the month.',
        feedbackExplanation: '¡Misión B2 #2 superada! Usaste una estructura causativa impecable ("have the revised terms put in writing") con cortesía ejecutiva.'
      }
    ]
  },
  {
    id: 'en_surv_b2_3',
    level: 'B2',
    title: 'Misión B2 #3 · Gestión de Crisis y Comunicación con Prensa',
    locationBadge: 'B2 · Relaciones Públicas & Crisis',
    scenarioSummary: 'Una interrupción temporal de servidores afectó a usuarios europeos durante dos horas. Debes dar una declaración precisa sin admitir negligencia y explicar las medidas preventivas.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Tech Journalist (Periodista Tecnológico)',
        npcLine: 'Rumors suggest that today’s two-hour outage was caused by a security breach. Can you confirm or deny this?',
        npcTranslation: 'Los rumores sugieren que la caída de dos horas de hoy fue causada por una brecha de seguridad. ¿Puede confirmarlo o desmentirlo?',
        missionObjective: 'Desmiente categóricamente una brecha de seguridad usando inversión negativa formal ("At no point was...").',
        options: [
          'At no point was user data compromised; the disruption stemmed from an automated load-balancing update.',
          'At no point user data was in danger; it was only an update problem.',
          'That rumor is false, nobody entered our servers today.'
        ],
        correctOption: 'At no point was user data compromised; the disruption stemmed from an automated load-balancing update.',
        feedbackExplanation: '¡Precisión quirúrgica! "At no point was user data compromised" utiliza inversión negativa formal y el verbo "stemmed from" ("se originó en").'
      },
      {
        stepNumber: 2,
        npcRole: 'Tech Journalist (Periodista Tecnológico)',
        npcLine: 'Still, thousands of enterprise clients were unable to access their dashboards this morning. Shouldn’t your team have foreseen this?',
        npcTranslation: 'Aun así, miles de clientes corporativos no pudieron acceder a sus paneles esta mañana. ¿No debería haberlo previsto su equipo?',
        missionObjective: 'Explica que la actualización había superado todas las pruebas previas y que ya se implementó un protocolo de respaldo redundante.',
        options: [
          'Although the update had passed extensive staging tests, we have since deployed a redundant failover protocol to prevent any recurrence.',
          'We tested everything before, so we couldn’t know it would fail today.',
          'Our engineers should have seen it, and we are sorry for the problem.'
        ],
        correctOption: 'Although the update had passed extensive staging tests, we have since deployed a redundant failover protocol to prevent any recurrence.',
        feedbackExplanation: '¡Excelente manejo de tiempos! Combinaste Past Perfect ("had passed") para el contexto previo con Present Perfect ("have since deployed") para la solución actual.'
      },
      {
        stepNumber: 3,
        npcRole: 'Tech Journalist (Periodista Tecnológico)',
        npcLine: 'Will affected enterprise subscribers receive any compensation for the downtime?',
        npcTranslation: '¿Recibirán alguna compensación los suscriptores corporativos afectados por el tiempo de inactividad?',
        missionObjective: 'Confirma usando el subjuntivo formal que el comité aprobó que a cada cuenta afectada se le acredite un descuento automático.',
        options: [
          'Yes, our executive committee has mandated that every affected account be credited automatically on next month’s statement.',
          'Yes, the committee decided that every account is credited next month.',
          'We will give some free money back to the clients that had problems.'
        ],
        correctOption: 'Yes, our executive committee has mandated that every affected account be credited automatically on next month’s statement.',
        feedbackExplanation: '¡Misión B2 #3 completada! "Has mandated that every affected account BE credited" es un ejemplo magistral de Subjuntivo Pasivo en inglés corporativo.'
      }
    ]
  }
];

// ============================================================================
// 4. REAL-WORLD SURVIVAL MISSIONS — SPANISH COURSE (12 MISSIONS: 3 PER LEVEL)
// ============================================================================
export const SPANISH_SURVIVAL_MISSIONS: SurvivalMission[] = [
  // -------------------- LEVEL A1 (3 MISSIONS) --------------------
  {
    id: 'es_surv_a1_1',
    level: 'A1',
    title: 'Mission A1 #1 · Tapas in Madrid & Paying the Bill',
    locationBadge: 'A1 · Café & Restaurant',
    scenarioSummary: 'You are having dinner at a traditional restaurant in Madrid. Ask for a table on the terrace, order politely without using literal English translations, and ask for the check.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Camarero (Waiter)',
        npcLine: '¡Buenas tardes! Bienvenidos a Casa Lucía. ¿Tienen reserva o buscan mesa?',
        npcTranslation: 'Good afternoon! Welcome to Casa Lucía. Do you have a reservation or are you looking for a table?',
        missionObjective: 'Say you do not have a reservation and ask if there is a table for two on the terrace.',
        options: [
          'No tenemos reserva. ¿Hay una mesa libre para dos en la terraza, por favor?',
          'No tenemos reservación. ¿Están dos sillas por dos personas en la terraza?',
          'Sin reserva. Queremos tener una mesa por dos personas.'
        ],
        correctOption: 'No tenemos reserva. ¿Hay una mesa libre para dos en la terraza, por favor?',
        feedbackExplanation: 'Great job! In Spanish, we use "¿Hay...?" ("Is there...?") for availability and "para dos" ("for two people").'
      },
      {
        stepNumber: 2,
        npcRole: 'Camarero (Waiter)',
        npcLine: '¡Claro que sí! Aquí tienen la carta. ¿Qué van a tomar de beber y de comer?',
        npcTranslation: 'Of course! Here is the menu. What are you going to have to drink and eat?',
        missionObjective: 'Order the tortilla española and a bottle of sparkling water naturally.',
        options: [
          'Para mí, una ración de tortilla española y una botella de agua con gas, por favor.',
          'Yo voy a tener la tortilla española y un agua espumosa.',
          'Puedo tener tortilla española y agua con burbujas, por favor.'
        ],
        correctOption: 'Para mí, una ración de tortilla española y una botella de agua con gas, por favor.',
        feedbackExplanation: 'Spot on! In Spanish, we never say "¿Puedo tener...?" ("Can I have...?") to order food. Native speakers say "Para mí...", "Me pone...", or "Quiero...", and sparkling water is "agua con gas".'
      },
      {
        stepNumber: 3,
        npcRole: 'Camarero (Waiter)',
        npcLine: '¿Qué tal estaba todo? ¿Les apetece algún postre o café?',
        npcTranslation: 'How was everything? Would you like any dessert or coffee?',
        missionObjective: 'Say everything was delicious and ask for the bill to pay by card.',
        options: [
          'Todo estaba delicioso, muchas gracias. ¿Nos trae la cuenta, por favor? ¿Se puede pagar con tarjeta?',
          'Todo fue muy bueno. ¿Nos da la factura? Pagamos por tarjeta.',
          'Estuvo bien. Trae el cheque para pagar en tarjeta.'
        ],
        correctOption: 'Todo estaba delicioso, muchas gracias. ¿Nos trae la cuenta, por favor? ¿Se puede pagar con tarjeta?',
        feedbackExplanation: 'Mission A1 #1 Complete! In a restaurant, the bill is "la cuenta", we ask "¿Nos trae la cuenta?", and paying by card is "pagar con tarjeta".'
      }
    ]
  },
  {
    id: 'es_surv_a1_2',
    level: 'A1',
    title: 'Mission A1 #2 · Hotel Check-In & Asking for Directions',
    locationBadge: 'A1 · Hotel & Ser vs. Estar',
    scenarioSummary: 'You just arrived at your hotel in Seville. Check in under your name, ask what time breakfast starts, and ask where the nearest metro station is located.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Recepcionista (Front Desk)',
        npcLine: '¡Hola, buenas tardes! Bienvenido al Hotel Giralda. ¿En qué puedo ayudarle?',
        npcTranslation: 'Hello, good afternoon! Welcome to Hotel Giralda. How can I help you?',
        missionObjective: 'Say you have a reservation under your name for three nights.',
        options: [
          'Buenas tardes. Tengo una reserva a nombre de Parker para tres noches.',
          'Buenas tardes. Soy una reservación debajo del nombre Parker por tres noches.',
          'Hola. Quiero registrar adentro por tres días con nombre Parker.'
        ],
        correctOption: 'Buenas tardes. Tengo una reserva a nombre de Parker para tres noches.',
        feedbackExplanation: 'Excellent! In Spanish, "under the name of..." is "a nombre de...", and destination/duration for a booking uses "para tres noches".'
      },
      {
        stepNumber: 2,
        npcRole: 'Recepcionista (Front Desk)',
        npcLine: 'Perfecto, aquí está su reserva. Su habitación es la 304 en la tercera planta. Aquí tiene su llave.',
        npcTranslation: 'Perfect, here is your reservation. Your room is 304 on the third floor. Here is your key.',
        missionObjective: 'Ask what time breakfast starts and where the dining room is located (using ESTAR).',
        options: [
          'Muchas gracias. ¿A qué hora empieza el desayuno y dónde está el comedor?',
          'Gracias. ¿En qué hora empieza el desayuno y dónde es el comedor?',
          '¿Cuál tiempo es el desayuno y dónde hay el comedor?'
        ],
        correctOption: 'Muchas gracias. ¿A qué hora empieza el desayuno y dónde está el comedor?',
        feedbackExplanation: 'Spot on! We ask "¿A qué hora...?" for schedules and "¿Dónde ESTÁ...?" for physical locations.'
      },
      {
        stepNumber: 3,
        npcRole: 'Recepcionista (Front Desk)',
        npcLine: 'El desayuno es de siete y media a diez en la planta baja. ¿Necesita alguna indicación para salir al centro?',
        npcTranslation: 'Breakfast is from 7:30 to 10:00 on the ground floor. Do you need any directions to go downtown?',
        missionObjective: 'Ask if the nearest metro station is far from the hotel.',
        options: [
          'Sí, por favor. ¿La estación de metro más cercana está lejos de aquí?',
          'Sí. ¿La estación de metro más cerca es lejos del hotel?',
          '¿Dónde es el metro más próximo desde aquí?'
        ],
        correctOption: 'Sí, por favor. ¿La estación de metro más cercana está lejos de aquí?',
        feedbackExplanation: 'Mission A1 #2 Complete! Location uses ESTAR ("¿está lejos de aquí?"), and "nearest" before/after a feminine noun is "la estación más cercana".'
      }
    ]
  },
  {
    id: 'es_surv_a1_3',
    level: 'A1',
    title: 'Mission A1 #3 · Shopping at a Clothing Store in Barcelona',
    locationBadge: 'A1 · Shopping & Gustar / Quedar',
    scenarioSummary: 'You are shopping for a shirt in Barcelona. Ask to try it on, request a larger size using "me queda", and pay at the register.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Dependienta (Shop Assistant)',
        npcLine: '¡Hola! Si necesitas alguna talla o quieres probarte algo, avísame.',
        npcTranslation: 'Hello! If you need any size or want to try something on, let me know.',
        missionObjective: 'Ask if you can try on this blue shirt and where the fitting rooms are.',
        options: [
          'Perdona, ¿puedo probarme esta camisa azul? ¿Dónde están los probadores?',
          'Disculpa, ¿puedo tratar esta camisa azul? ¿Dónde son los cuartos de ropa?',
          'Quiero probar a la camisa azul. ¿Dónde está el probador?'
        ],
        correctOption: 'Perdona, ¿puedo probarme esta camisa azul? ¿Dónde están los probadores?',
        feedbackExplanation: 'Great job! "To try on clothes" is the reflexive verb PROBARSE ("¿puedo probarme...?"), and fitting rooms are "los probadores".'
      },
      {
        stepNumber: 2,
        npcRole: 'Dependienta (Shop Assistant)',
        npcLine: 'Los probadores están al fondo a la derecha. ¿Qué tal te queda la camisa?',
        npcTranslation: 'The fitting rooms are at the back on the right. How does the shirt fit you?',
        missionObjective: 'Say it fits a bit tight and ask if they have it in a large size.',
        options: [
          'Me queda un poco estrecha. ¿La tienes en la talla grande?',
          'Es un poco pequeña para mí. ¿Tienes ella en tamaño largo?',
          'No me entra bien. Dame una talla más larga, por favor.'
        ],
        correctOption: 'Me queda un poco estrecha. ¿La tienes en la talla grande?',
        feedbackExplanation: 'Perfect! In Spanish, how clothes fit is expressed with QUEDAR ("Me queda estrecha / pequeña / bien"), and clothing sizes are "talla pequeña, mediana, grande" ("largo" means long, not large!).'
      },
      {
        stepNumber: 3,
        npcRole: 'Dependienta (Shop Assistant)',
        npcLine: 'Aquí tienes la talla grande. ¡Esa te queda perfecta!',
        npcTranslation: 'Here is the large size. That one fits you perfectly!',
        missionObjective: 'Say you will take it and ask how much it costs.',
        options: [
          '¡Me queda genial, me la llevo! ¿Cuánto cuesta?',
          '¡Es buena, la tomo! ¿Cuánto dinero es?',
          'Yo cojo esta camisa. ¿Qué precio tiene ella?'
        ],
        correctOption: '¡Me queda genial, me la llevo! ¿Cuánto cuesta?',
        feedbackExplanation: 'Mission A1 #3 Complete! "¡Me la llevo!" ("I’ll take it!") is the exact phrase native Spanish speakers use when buying an item.'
      }
    ]
  },

  // -------------------- LEVEL A2 (3 MISSIONS) --------------------
  {
    id: 'es_surv_a2_1',
    level: 'A2',
    title: 'Mission A2 #1 · High-Speed Train Delay & Ticket Change',
    locationBadge: 'A2 · Travel & Past Tenses',
    scenarioSummary: 'You are at Madrid Atocha train station. Your connecting train arrived late, causing you to miss your train to Seville. Explain what happened and rebook your seat.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Agente de Atención (Station Agent)',
        npcLine: 'Buenos días. Dígame, ¿en qué puedo ayudarle?',
        npcTranslation: 'Good morning. Tell me, how can I help you?',
        missionObjective: 'Explain in the Pretérito Indefinido that your previous train arrived 25 minutes late and you missed the connection to Seville.',
        options: [
          'Mi tren anterior llegó con veinticinco minutos de retraso y perdí la conexión a Sevilla.',
          'Mi tren anterior llegaba tarde veinticinco minutos y yo falté el tren a Sevilla.',
          'El tren ha llegado tarde ayer y no pude coger la conexión.'
        ],
        correctOption: 'Mi tren anterior llegó con veinticinco minutos de retraso y perdí la conexión a Sevilla.',
        feedbackExplanation: 'Excellent! Single completed events in the past use Pretérito Indefinido ("llegó / perdí"), and "to miss a train/flight" in Spanish is "perder el tren/vuelo" (never "faltar").'
      },
      {
        stepNumber: 2,
        npcRole: 'Agente de Atención (Station Agent)',
        npcLine: 'Entiendo, permítame su billete. Efectivamente hubo una avería en la vía. El próximo AVE a Sevilla sale en cuarenta minutos.',
        npcTranslation: 'I understand, let me see your ticket. Indeed there was a track issue. The next high-speed train to Seville leaves in forty minutes.',
        missionObjective: 'Ask if you can change your ticket free of charge and request a window seat.',
        options: [
          '¿Me puede cambiar el billete sin coste adicional y darme un asiento de ventanilla, por favor?',
          '¿Puede cambiarme el boleto gratis y ponerme en una silla cerca de la ventana?',
          'Quiero otro billete por ningún dinero en la ventana.'
        ],
        correctOption: '¿Me puede cambiar el billete sin coste adicional y darme un asiento de ventanilla, por favor?',
        feedbackExplanation: 'Perfect! "Sin coste adicional" (free of additional charge) and "asiento de ventanilla / de pasillo" (window / aisle seat) are essential travel expressions.'
      },
      {
        stepNumber: 3,
        npcRole: 'Agente de Atención (Station Agent)',
        npcLine: 'Listo, aquí tiene su nuevo billete sin cargo. Coche 4, asiento 12A. Sale desde la vía número 7.',
        npcTranslation: 'Done, here is your new ticket at no charge. Coach 4, seat 12A. It departs from track number 7.',
        missionObjective: 'Thank the agent using POR correctly and ask where the boarding gate for track 7 is located.',
        options: [
          'Muchas gracias por su ayuda. ¿Dónde está el control de embarque para la vía siete?',
          'Muchas gracias para su ayuda. ¿Dónde es la puerta por la vía siete?',
          'Gracias por ayudarme. ¿Dónde hay la vía siete?'
        ],
        correctOption: 'Muchas gracias por su ayuda. ¿Dónde está el control de embarque para la vía siete?',
        feedbackExplanation: 'Mission A2 #1 Complete! You correctly used "Gracias POR" (reason), "¿Dónde ESTÁ...?" (location), and "PARA la vía siete" (destination).'
      }
    ]
  },
  {
    id: 'es_surv_a2_2',
    level: 'A2',
    title: 'Mission A2 #2 · Medical Clinic & Pharmacy Visit',
    locationBadge: 'A2 · Health & Body ("Me duele")',
    scenarioSummary: 'You twisted your ankle while walking in Granada. Explain how it happened using Imperfect + Preterite, describe the pain with DOLER, and understand the treatment.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Médico de Urgencias (ER Doctor)',
        npcLine: 'Pase, por favor. Veo que camina con dificultad. ¿Qué le ha pasado en el tobillo?',
        npcTranslation: 'Come in, please. I see you are walking with difficulty. What happened to your ankle?',
        missionObjective: 'Explain that while you were walking down the stairs (Imperfect), you twisted your ankle (Preterite).',
        options: [
          'Mientras bajaba las escaleras del hotel esta mañana, me torcí el tobillo derecho.',
          'Mientras bajé las escaleras, torcía mi tobillo derecho.',
          'Cuando caminaba en la escalera, yo rompí mi pie.'
        ],
        correctOption: 'Mientras bajaba las escaleras del hotel esta mañana, me torcí el tobillo derecho.',
        feedbackExplanation: 'Textbook A2 storytelling! The background action in progress takes the Imperfect ("Mientras bajaba..."), and the sudden event takes the Preterite ("me torcí el tobillo").'
      },
      {
        stepNumber: 2,
        npcRole: 'Médico de Urgencias (ER Doctor)',
        npcLine: 'Vamos a examinarlo. Está un poco hinchado, pero no hay fractura. ¿Le duele cuando apoya el pie?',
        npcTranslation: 'Let’s examine it. It is a bit swollen, but there is no fracture. Does it hurt when you put weight on your foot?',
        missionObjective: 'Say that your ankle hurts a lot when you walk and ask if you need a bandage or anti-inflammatory cream.',
        options: [
          'Sí, me duele bastante el tobillo al caminar. ¿Necesito una venda o alguna crema antiinflamatoria?',
          'Sí, mi tobillo duele mí mucho cuando camino. ¿Necesito poner medicina?',
          'Yo tengo dolor en mi tobillo. ¿Me da usted una banda?'
        ],
        correctOption: 'Sí, me duele bastante el tobillo al caminar. ¿Necesito una venda o alguna crema antiinflamatoria?',
        feedbackExplanation: 'Great job! DOLER works like GUSTAR ("me duele el tobillo"), and "al + infinitivo" ("al caminar") means "upon walking / when walking".'
      },
      {
        stepNumber: 3,
        npcRole: 'Médico de Urgencias (ER Doctor)',
        npcLine: 'Le voy a poner un vendaje compresivo y a recetar este antiinflamatorio cada ocho horas después de comer.',
        npcTranslation: 'I am going to put a compression bandage on you and prescribe this anti-inflammatory every eight hours after eating.',
        missionObjective: 'Thank the doctor and ask where the nearest 24-hour pharmacy (farmacia de guardia) is.',
        options: [
          'Muchas gracias, doctor. ¿Sabe dónde está la farmacia de guardia más cercana?',
          'Gracias por la receta. ¿Conoce dónde es la farmacia abierta ahora?',
          'Muy amable. ¿Dónde puedo encontrar una tienda de medicinas?'
        ],
        correctOption: 'Muchas gracias, doctor. ¿Sabe dónde está la farmacia de guardia más cercana?',
        feedbackExplanation: 'Mission A2 #2 Complete! You used SABER for facts ("¿Sabe dónde está...?") and the authentic cultural term "farmacia de guardia" (on-duty/24h pharmacy).'
      }
    ]
  },
  {
    id: 'es_surv_a2_3',
    level: 'A2',
    title: 'Mission A2 #3 · Lost Wallet & Police Report (Denuncia)',
    locationBadge: 'A2 · Emergencies & Description',
    scenarioSummary: 'You left your wallet in a taxi in Mexico City. Go to the tourist police office, explain what happened using the accidental "Se" structure, and describe the wallet.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Oficial de Policía (Police Officer)',
        npcLine: 'Buenas tardes. Bienvenido al módulo de atención al turista. ¿En qué le podemos ayudar?',
        npcTranslation: 'Good afternoon. Welcome to the tourist assistance desk. How can we help you?',
        missionObjective: 'Explain that you accidentally left your wallet in a taxi an hour ago using "Se me quedó / Se me olvidó".',
        options: [
          'Buenas tardes, oficial. Hace una hora se me quedó la cartera en un taxi cerca del museo.',
          'Buenas tardes. Hace una hora yo olvidé a mi cartera dentro de un coche.',
          'Hola. Mi cartera se perdió por mí en el taxi hoy.'
        ],
        correctOption: 'Buenas tardes, oficial. Hace una hora se me quedó la cartera en un taxi cerca del museo.',
        feedbackExplanation: 'Natural A2 Spanish! "Se me quedó / Se me olvidó la cartera" is the exact accidental "se" structure native speakers use when leaving something behind.'
      },
      {
        stepNumber: 2,
        npcRole: 'Oficial de Policía (Police Officer)',
        npcLine: 'Vamos a levantar el acta. ¿Cómo era la cartera y qué documentos llevaba dentro?',
        npcTranslation: 'Let’s file the report. What did the wallet look like and what documents did it have inside?',
        missionObjective: 'Describe the wallet in the Imperfect tense ("Era de cuero marrón y llevaba...") because you are describing how things were in the past.',
        options: [
          'Era una cartera pequeña de cuero marrón y llevaba mi carné de conducir y dos tarjetas bancarias.',
          'Fue una cartera marrón y tuvo mi licencia y dos tarjetas.',
          'Es una cartera de piel y llevó mis documentos ayer.'
        ],
        correctOption: 'Era una cartera pequeña de cuero marrón y llevaba mi carné de conducir y dos tarjetas bancarias.',
        feedbackExplanation: 'Spot on! Descriptions of objects and what they contained in the past always use the Pretérito Imperfecto ("Era de cuero... y llevaba...").'
      },
      {
        stepNumber: 3,
        npcRole: 'Oficial de Policía (Police Officer)',
        npcLine: 'Ya bloqueamos el reporte y avisamos a la central de taxis. Aquí tiene una copia sellada de la denuncia.',
        npcTranslation: 'We have logged the report and notified the taxi dispatch. Here is a stamped copy of the police report.',
        missionObjective: 'Thank the officer and explain that you need the stamped report in order to request a temporary passport (using PARA + infinitive).',
        options: [
          'Muchísimas gracias. Necesito esta copia para tramitar un documento temporal en mi consulado.',
          'Muchas gracias. Necesito este papel por pedir un pasaporte en el consulado.',
          'Gracias. Uso esto para que yo pido otro documento.'
        ],
        correctOption: 'Muchísimas gracias. Necesito esta copia para tramitar un documento temporal en mi consulado.',
        feedbackExplanation: 'Mission A2 #3 Complete! Expressing purpose ("in order to process...") always uses "PARA + infinitivo" ("para tramitar").'
      }
    ]
  },

  // -------------------- LEVEL B1 (3 MISSIONS) --------------------
  {
    id: 'es_surv_b1_1',
    level: 'B1',
    title: 'Mission B1 #1 · Apartment Lease & Repair Negotiation',
    locationBadge: 'B1 · Housing & Subjunctive',
    scenarioSummary: 'You are renting an apartment in Valencia and the heating system stopped working. Call the landlord, explain how long it has been broken, and request a technician using the Subjunctive.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Propietario (Landlord)',
        npcLine: '¡Hola! Dime, ¿todo bien en el piso?',
        npcTranslation: 'Hello! Tell me, is everything okay in the apartment?',
        missionObjective: 'Explain politely that the heating has not been working for three days using "llevar + sin + infinitivo".',
        options: [
          'Hola, te llamo porque la calefacción lleva tres días sin funcionar y hace bastante frío.',
          'Hola, la calefacción no está funcionando por tres días atrás.',
          'Hola, tenemos tres días que la calefacción no trabaja.'
        ],
        correctOption: 'Hola, te llamo porque la calefacción lleva tres días sin funcionar y hace bastante frío.',
        feedbackExplanation: 'Great fluency! "Llevar + [time] + sin + infinitive" ("lleva tres días sin funcionar") is the most natural way to express how long something has not been happening.'
      },
      {
        stepNumber: 2,
        npcRole: 'Propietario (Landlord)',
        npcLine: '¡Vaya, qué raro! El invierno pasado funcionaba perfectamente. ¿Quieres que llame al servicio técnico?',
        npcTranslation: 'Oh, how strange! Last winter it worked perfectly. Do you want me to call the technical service?',
        missionObjective: 'Use the Present Subjunctive to ask the landlord to send a technician as soon as possible.',
        options: [
          'Sí, por favor. Te agradecería que envíes a un técnico lo antes posible para que revise la caldera.',
          'Sí, quiero que tú envías un técnico rápido para revisar la caldera.',
          'Sí, es necesario que el técnico viene hoy mismo.'
        ],
        correctOption: 'Sí, por favor. Te agradecería que envíes a un técnico lo antes posible para que revise la caldera.',
        feedbackExplanation: 'Spot on! Both "Te agradecería que..." (request/influence) and "para que..." (purpose) require the Subjunctive ("envíes / revise").'
      },
      {
        stepNumber: 3,
        npcRole: 'Propietario (Landlord)',
        npcLine: 'Acabo de hablar con el técnico. Dice que puede ir mañana por la mañana. ¿Estarás en casa?',
        npcTranslation: 'I just spoke with the technician. He says he can go tomorrow morning. Will you be home?',
        missionObjective: 'Confirm you will be home and tell the landlord to have the technician call you when he arrives (Subjunctive after "cuando").',
        options: [
          'Perfecto, trabajaré desde casa. Dile que me llame al móvil en cuanto llegue al portal.',
          'Perfecto, estaré allí. Dile que me llama cuando llega al edificio.',
          'Muy bien. Cuando él llegará mañana, yo abro la puerta.'
        ],
        correctOption: 'Perfecto, trabajaré desde casa. Dile que me llame al móvil en cuanto llegue al portal.',
        feedbackExplanation: 'Mission B1 #1 Complete! Indirect commands ("Dile que me llame") and future time clauses ("en cuanto llegue") both take the Present Subjunctive.'
      }
    ]
  },
  {
    id: 'es_surv_b1_2',
    level: 'B1',
    title: 'Mission B1 #2 · Job Interview in Spanish & Relocation Plans',
    locationBadge: 'B1 · Career & Future Subjunctive',
    scenarioSummary: 'You are interviewing for a marketing position in Bogotá. Describe your ongoing experience, explain what kind of team you are looking for (Subjunctive in adjective clauses), and discuss relocation.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Gerente de Recursos Humanos (HR Manager)',
        npcLine: 'Bienvenido a la entrevista. Cuéntenos, ¿qué experiencia tiene coordinando campañas internacionales?',
        npcTranslation: 'Welcome to the interview. Tell us, what experience do you have coordinating international campaigns?',
        missionObjective: 'Explain that you have been working in digital marketing for four years and recently led a regional launch.',
        options: [
          'Llevo cuatro años trabajando en marketing digital y el trimestre pasado dirigí un lanzamiento regional con éxito.',
          'Estoy trabajando en marketing por cuatro años y dirigía un lanzamiento el mes pasado.',
          'He sido trabajando cuatro años en campañas y hice un proyecto grande.'
        ],
        correctOption: 'Llevo cuatro años trabajando en marketing digital y el trimestre pasado dirigí un lanzamiento regional con éxito.',
        feedbackExplanation: 'Excellent! You combined "Llevo cuatro años trabajando..." (ongoing duration) with Pretérito Indefinido ("dirigí") for a completed milestone.'
      },
      {
        stepNumber: 2,
        npcRole: 'Gerente de Recursos Humanos (HR Manager)',
        npcLine: 'Muy interesante. ¿Qué es lo que más valora en una empresa al buscar un nuevo puesto?',
        npcTranslation: 'Very interesting. What do you value most in a company when looking for a new position?',
        missionObjective: 'Say you are looking for a company that fosters innovation and allows professional growth (Subjunctive for sought qualities).',
        options: [
          'Busco una empresa que fomente la innovación y que ofrezca oportunidades reales de crecimiento.',
          'Busco una empresa que fomenta la innovación y ofrece oportunidades de crecer.',
          'Quiero una compañía donde puedo crecer y tienen buenas ideas.'
        ],
        correctOption: 'Busco una empresa que fomente la innovación y que ofrezca oportunidades reales de crecimiento.',
        feedbackExplanation: 'Bravo! When describing an indefinite or sought entity ("Busco una empresa que..."), Spanish requires the Present Subjunctive ("fomente / ofrezca").'
      },
      {
        stepNumber: 3,
        npcRole: 'Gerente de Recursos Humanos (HR Manager)',
        npcLine: 'El puesto requiere incorporarse en nuestra oficina de Bogotá el próximo mes. ¿Tendría disponibilidad para mudarse?',
        npcTranslation: 'The position requires joining our Bogotá office next month. Would you be available to relocate?',
        missionObjective: 'Use the Simple Conditional to confirm you would be delighted to move as soon as they confirm the offer.',
        options: [
          'Sí, estaría encantado de mudarme a Bogotá tan pronto como me confirmen la oferta formal.',
          'Sí, estaré encantado de mudarme cuando me confirmarán la oferta.',
          'Claro, yo me mudaría en cuanto me confirman el contrato.'
        ],
        correctOption: 'Sí, estaría encantado de mudarme a Bogotá tan pronto como me confirmen la oferta formal.',
        feedbackExplanation: 'Mission B1 #2 Complete! "Estaría encantado" (Conditional) + "tan pronto como me confirmen" (Subjunctive after future time connector) is B1 mastery.'
      }
    ]
  },
  {
    id: 'es_surv_b1_3',
    level: 'B1',
    title: 'Mission B1 #3 · Returning a Defective Laptop & Consumer Rights',
    locationBadge: 'B1 · Customer Service & Opinions',
    scenarioSummary: 'A tablet you bought in Madrid has a defective screen. Return to the electronics store, express doubt about a slow repair ("No creo que..."), and negotiate an immediate exchange.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Encargado de Postventa (Service Manager)',
        npcLine: 'Buenas tardes. Veo que trae esta tableta que compró la semana pasada. ¿Qué fallo presenta?',
        npcTranslation: 'Good afternoon. I see you are bringing in this tablet you bought last week. What fault does it have?',
        missionObjective: 'Explain that the screen freezes every time you open an application, even after resetting it.',
        options: [
          'Cada vez que abro una aplicación, la pantalla se queda bloqueada, aunque ya la he reiniciado varias veces.',
          'Siempre cuando abro un programa, la pantalla para de trabajar aunque reinicié ella.',
          'La pantalla está rota porque no se mueve cuando toco con el dedo.'
        ],
        correctOption: 'Cada vez que abro una aplicación, la pantalla se queda bloqueada, aunque ya la he reiniciado varias veces.',
        feedbackExplanation: 'Great B1 vocabulary! "Se queda bloqueada" (freezes/locks up) and "aunque ya la he reiniciado" (concessive clause with Indicative for a known fact).'
      },
      {
        stepNumber: 2,
        npcRole: 'Encargado de Postventa (Service Manager)',
        npcLine: 'Podemos enviarla al taller del fabricante; calculo que tardarán unos veinte días en devolverla.',
        npcTranslation: 'We can send it to the manufacturer’s workshop; I estimate they will take about twenty days to return it.',
        missionObjective: 'Use "No creo que + Subjunctive" to say you do not think it is fair to wait 20 days for a brand-new product.',
        options: [
          'Como la compré hace solo cinco días, no creo que sea razonable esperar veinte días por un producto nuevo.',
          'Porque la compré hace cinco días, no creo que es justo esperar veinte días.',
          'No pienso que será bueno esperar veinte días cuando es nueva.'
        ],
        correctOption: 'Como la compré hace solo cinco días, no creo que sea razonable esperar veinte días por un producto nuevo.',
        feedbackExplanation: 'Perfect! Starting a causal clause with "Como..." ("Since/Because...") and using "no creo que sea razonable" (Subjunctive after negated opinion) is persuasive and polite.'
      },
      {
        stepNumber: 3,
        npcRole: 'Encargado de Postventa (Service Manager)',
        npcLine: 'Tiene razón, está dentro del plazo legal de quince días. ¿Prefiere que le demos una unidad nueva o el reembolso?',
        npcTranslation: 'You are right, it is within the 15-day legal period. Do you prefer that we give you a new unit or a refund?',
        missionObjective: 'Ask them to exchange it for a new unit and verify that it works before you leave.',
        options: [
          'Prefiero que me la cambien por una unidad nueva y que comprobemos que funciona antes de salir.',
          'Prefiero que me cambian por otra nueva y comprobamos ella aquí.',
          'Quiero cambiarla por una nueva para que yo veo que sirve.'
        ],
        correctOption: 'Prefiero que me la cambien por una unidad nueva y que comprobemos que funciona antes de salir.',
        feedbackExplanation: 'Mission B1 #3 Complete! "Prefiero que me la cambien" (double object pronoun + Subjunctive) and "antes de salir" (Infinitive when same subject/general) are spot on.'
      }
    ]
  },

  // -------------------- LEVEL B2 (3 MISSIONS) --------------------
  {
    id: 'es_surv_b2_1',
    level: 'B2',
    title: 'Mission B2 #1 · Executive Client Crisis & Contract Renegotiation',
    locationBadge: 'B2 · Diplomatic Business Spanish',
    scenarioSummary: 'An international client is upset about a software integration delay. Lead the call diplomatically using Imperfect/Pluperfect Subjunctive and conditional structures.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Directora de Operaciones (Client COO)',
        npcLine: 'Esperábamos que el módulo de facturación estuviera activo el lunes pasado. Este retraso está afectando a nuestro equipo.',
        npcTranslation: 'We expected the billing module to be live last Monday. This delay is affecting our team.',
        missionObjective: 'Acknowledge their concern and explain the past counterfactual using "Si hubiéramos..." + "habríamos...".',
        options: [
          'Comprendo perfectamente su inquietud. Si hubiéramos recibido las credenciales del servidor a tiempo, habríamos completado la integración el lunes.',
          'Lo siento mucho. Si habríamos tenido las claves antes, habíamos terminado el lunes.',
          'No fue culpa nuestra; ustedes enviaron los datos muy tarde la semana pasada.'
        ],
        correctOption: 'Comprendo perfectamente su inquietud. Si hubiéramos recibido las credenciales del servidor a tiempo, habríamos completado la integración el lunes.',
        feedbackExplanation: 'Executive precision! You validated the client diplomatically and used "Si hubiéramos recibido..., habríamos completado..." flawlessly.'
      },
      {
        stepNumber: 2,
        npcRole: 'Directora de Operaciones (Client COO)',
        npcLine: 'Entiendo ese punto, pero necesitamos garantías de que no volverá a ocurrir en la segunda fase del proyecto.',
        npcTranslation: 'I understand that point, but we need guarantees that it will not happen again in the second phase of the project.',
        missionObjective: 'Propose a concrete safeguard using a hypothetical clause with "Si surgiera..." (Imperfect Subjunctive).',
        options: [
          'Por supuesto. Si surgiera cualquier incidencia técnica en la segunda fase, asignaríamos un equipo de soporte exclusivo de inmediato.',
          'Claro. Si surgiría algún problema en la fase dos, pondremos más ingenieros.',
          'Le prometo que aunque hay problemas, lo resolveremos rápido.'
        ],
        correctOption: 'Por supuesto. Si surgiera cualquier incidencia técnica en la segunda fase, asignaríamos un equipo de soporte exclusivo de inmediato.',
        feedbackExplanation: 'Masterful B2 Spanish! Using "Si surgiera cualquier incidencia..." softens the possibility of a problem while showing full preparedness.'
      },
      {
        stepNumber: 3,
        npcRole: 'Directora de Operaciones (Client COO)',
        npcLine: 'Me parece una solución razonable. ¿Cuándo podremos revisar el entorno de pruebas definitivo?',
        npcTranslation: 'That sounds like a reasonable solution. When will we be able to review the final staging environment?',
        missionObjective: 'Commit to a delivery time using the Futuro Compuesto ("Para mañana a las doce, ya habremos...") and a polite closing.',
        options: [
          'Para mañana a las doce del mediodía, ya habremos desplegado el entorno completo para que su equipo lo valide sin contratiempos.',
          'Hasta mañana a las doce, ya desplegaremos todo para que su equipo lo valida.',
          'Mañana al mediodía habríamos terminado todo el sistema.'
        ],
        correctOption: 'Para mañana a las doce del mediodía, ya habremos desplegado el entorno completo para que su equipo lo valide sin contratiempos.',
        feedbackExplanation: 'Mission B2 #1 Complete! You combined Futuro Compuesto ("Para mañana..., ya habremos desplegado") with a purpose clause in the Subjunctive ("para que su equipo lo valide").'
      }
    ]
  },
  {
    id: 'es_surv_b2_2',
    level: 'B2',
    title: 'Mission B2 #2 · Executive Salary Review & Leadership Proposal',
    locationBadge: 'B2 · Leadership & Negotiation',
    scenarioSummary: 'You are in your annual performance review in Madrid. Present your measurable results, use polite Imperfect Subjunctive softening ("Quisiera que valoráramos..."), and secure a promotion.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Socio Director (Managing Partner)',
        npcLine: 'Ha sido un año clave para nuestra expansión en Latinoamérica. ¿Qué balance haces de la gestión de tu departamento?',
        npcTranslation: 'It has been a key year for our expansion in Latin America. How do you assess your department’s performance?',
        missionObjective: 'Highlight that thanks to the restructuring you carried out ("a raíz de..."), revenue grew by 25%.',
        options: [
          'A raíz de la nueva estrategia que pusimos en marcha en marzo, logramos incrementar la facturación un 25% y fidelizar a las cuentas clave.',
          'Porque hicimos una estrategia nueva en marzo, el dinero subió 25% con los clientes.',
          'Después de poniendo en marcha el plan, hemos crecido mucho este año.'
        ],
        correctOption: 'A raíz de la nueva estrategia que pusimos en marcha en marzo, logramos incrementar la facturación un 25% y fidelizar a las cuentas clave.',
        feedbackExplanation: 'C-Suite vocabulary! "A raíz de..." ("As a result of / following..."), "poner en marcha" ("to launch"), and "fidelizar" ("build client loyalty") show true B2 command.'
      },
      {
        stepNumber: 2,
        npcRole: 'Socio Director (Managing Partner)',
        npcLine: 'Los resultados son excelentes. Sin embargo, el presupuesto para revisiones salariales este año es bastante ajustado.',
        npcTranslation: 'The results are excellent. However, the budget for salary reviews this year is quite tight.',
        missionObjective: 'Use diplomatic softening ("Me gustaría que valoráramos...") to propose linking your compensation to the new regional objectives.',
        options: [
          'Entiendo la situación presupuestaria; no obstante, me gustaría que valoráramos una actualización acorde con las nuevas responsabilidades regionales que he asumido.',
          'Entiendo eso, pero quiero que me suben el sueldo porque tengo más trabajo ahora.',
          'Si no me pagarían más este mes, no sería justo para mi trabajo.'
        ],
        correctOption: 'Entiendo la situación presupuestaria; no obstante, me gustaría que valoráramos una actualización acorde con las nuevas responsabilidades regionales que he asumido.',
        feedbackExplanation: 'Masterful diplomacy! "No obstante" + "me gustaría que valoráramos" (Conditional + Imperfect Subjunctive) is the gold standard for polite executive negotiation.'
      },
      {
        stepNumber: 3,
        npcRole: 'Socio Director (Managing Partner)',
        npcLine: 'Me parece justo. Podemos aprobar un incremento del 12% junto con el nombramiento como Director Regional.',
        npcTranslation: 'That seems fair. We can approve a 12% increase along with the appointment as Regional Director.',
        missionObjective: 'Accept the promotion gratefully and express hope that the formal addendum has been signed before the next quarter begins.',
        options: [
          'Agradezco mucho la confianza. Espero que hayamos formalizado el anexo del contrato antes de que empiece el próximo trimestre.',
          'Muchas gracias. Espero que formalizamos el papel antes que empieza el trimestre.',
          'Excelente, ojalá firmaremos el nuevo contrato muy pronto.'
        ],
        correctOption: 'Agradezco mucho la confianza. Espero que hayamos formalizado el anexo del contrato antes de que empiece el próximo trimestre.',
        feedbackExplanation: 'Mission B2 #2 Complete! Combining "Espero que hayamos formalizado" (Present Perfect Subjunctive) with "antes de que empiece" (Subjunctive after "antes de que") is top-tier Spanish.'
      }
    ]
  },
  {
    id: 'es_surv_b2_3',
    level: 'B2',
    title: 'Mission B2 #3 · Boardroom Debate on AI & Data Privacy Policy',
    locationBadge: 'B2 · Policy & Subjunctive Triggers',
    scenarioSummary: 'You are participating in an executive committee debate on adopting AI tools across the firm. Express nuanced conditions ("Siempre y cuando..."), warn against taking security for granted, and reach consensus.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Director de Innovación (Chief Innovation Officer)',
        npcLine: 'Propongo que autoricemos el uso abierto de herramientas de inteligencia artificial en todos los departamentos a partir del lunes.',
        npcTranslation: 'I propose that we authorize the open use of artificial intelligence tools across all departments starting Monday.',
        missionObjective: 'Support the innovation conditionally using "Siempre y cuando + Present Subjunctive" to require strict data privacy protocols.',
        options: [
          'Estoy a favor de la iniciativa, siempre y cuando establezcamos protocolos estrictos que garanticen la confidencialidad de los datos.',
          'Estoy de acuerdo, siempre y cuando establecemos reglas que garantizan los datos.',
          'Me parece bien si autorizaríamos primero una regla de seguridad.'
        ],
        correctOption: 'Estoy a favor de la iniciativa, siempre y cuando establezcamos protocolos estrictos que garanticen la confidencialidad de los datos.',
        feedbackExplanation: 'Spot on! "Siempre y cuando" ("Provided that / as long as") ALWAYS triggers the Subjunctive ("establezcamos"), as does the purpose/indefinite relative clause ("que garanticen").'
      },
      {
        stepNumber: 2,
        npcRole: 'Director de Innovación (Chief Innovation Officer)',
        npcLine: '¿No crees que exigir demasiados filtros ralentizaría la productividad de los equipos?',
        npcTranslation: 'Don’t you think demanding too many filters would slow down the teams’ productivity?',
        missionObjective: 'Warn that we cannot take cybersecurity for granted ("dar por sentado") and use an inverted past conditional ("De haberse filtrado...").',
        options: [
          'Al contrario: no podemos dar por sentada la seguridad. De haberse producido una filtración de datos, el coste reputacional habría sido incalculable.',
          'No podemos dar por sentado la seguridad. Si habría pasado un problema, sería muy malo.',
          'Aunque sea lento, es mejor que no tengamos un error grande.'
        ],
        correctOption: 'Al contrario: no podemos dar por sentada la seguridad. De haberse producido una filtración de datos, el coste reputacional habría sido incalculable.',
        feedbackExplanation: 'Brilliant B2 rhetoric! "Dar por sentada la seguridad" + "De haberse producido..., habría sido..." shows complete command of advanced Spanish.'
      },
      {
        stepNumber: 3,
        npcRole: 'Director de Innovación (Chief Innovation Officer)',
        npcLine: 'Tienes toda la razón. ¿Qué te parece si lanzamos primero un programa piloto supervisado durante treinta días?',
        npcTranslation: 'You are completely right. How about we launch a supervised 30-day pilot program first?',
        missionObjective: 'Endorse the pilot program and suggest that the committee reconvene once they have evaluated the first metrics ("una vez que hayamos evaluado").',
        options: [
          'Es la vía más prudente. Sugiero que volvamos a reunirnos una vez que hayamos evaluado las métricas del primer mes.',
          'Es buena idea. Sugiero que nos reunimos cuando hemos visto los números del mes.',
          'Perfecto, nos veremos después de que evaluaremos el primer mes.'
        ],
        correctOption: 'Es la vía más prudente. Sugiero que volvamos a reunirnos una vez que hayamos evaluado las métricas del primer mes.',
        feedbackExplanation: 'Mission B2 #3 Complete! Both "Sugiero que volvamos" and future "una vez que hayamos evaluado" use the Subjunctive with total precision.'
      }
    ]
  }
];

// ============================================================================
// 5. FALSE FRIENDS & BILINGUAL TRAPS DUEL (32 CARDS: 16 ENGLISH + 16 SPANISH)
// ============================================================================
export const ENGLISH_FALSE_FRIENDS: FalseFriendCard[] = [
  // A1 (4 CARDS)
  {
    id: 'en_ff_a1_1',
    level: 'A1',
    trapTitle: 'ACTUALLY vs. CURRENTLY',
    falseFriendPair: 'Actually ≠ Actualmente',
    situationPrompt: 'Quieres decir: "Actualmente vivo en Madrid, pero de hecho nací en Bogotá."',
    targetSentenceWithBlank: '_____ I live in Madrid, but actually I was born in Bogotá.',
    fullCorrectSentence: 'Currently I live in Madrid, but actually I was born in Bogotá.',
    correctAnswer: 'Currently',
    options: ['Currently', 'Actually', 'Presently', 'Actively'],
    contrastExplanation: '"Currently" significa "actualmente / hoy en día", mientras que "Actually" significa "en realidad / de hecho".'
  },
  {
    id: 'en_ff_a1_2',
    level: 'A1',
    trapTitle: 'LIBRARY vs. BOOKSTORE',
    falseFriendPair: 'Library ≠ Librería (tienda)',
    situationPrompt: 'Quieres decir: "Fui a la librería a comprar un diccionario de inglés."',
    targetSentenceWithBlank: 'I went to the _____ to buy an English dictionary.',
    fullCorrectSentence: 'I went to the bookstore to buy an English dictionary.',
    correctAnswer: 'bookstore',
    options: ['bookstore', 'library', 'bookcase', 'magazine'],
    contrastExplanation: '"Bookstore" (o "bookshop") es la tienda donde compras libros (librería). "Library" es la biblioteca donde los pides prestados.'
  },
  {
    id: 'en_ff_a1_3',
    level: 'A1',
    trapTitle: 'MAKE vs. DO (Homework & Mistakes)',
    falseFriendPair: 'Do homework vs. Make a mistake',
    situationPrompt: 'Quieres decir: "Siempre hago mi tarea temprano para no cometer errores."',
    targetSentenceWithBlank: 'I always _____ my homework early so I don’t make mistakes.',
    fullCorrectSentence: 'I always do my homework early so I don’t make mistakes.',
    correctAnswer: 'do',
    options: ['do', 'make', 'realize', 'elaborate'],
    contrastExplanation: 'Para tareas, trabajo o ejercicio usamos "DO" ("do homework / do exercise"), pero para errores, planes o decisiones usamos "MAKE" ("make a mistake / make a decision").'
  },
  {
    id: 'en_ff_a1_4',
    level: 'A1',
    trapTitle: 'EXIT vs. SUCCESS',
    falseFriendPair: 'Exit ≠ Éxito',
    situationPrompt: 'Quieres decir: "El nuevo producto de la empresa fue un gran éxito."',
    targetSentenceWithBlank: 'The company’s new product was a huge _____.',
    fullCorrectSentence: 'The company’s new product was a huge success.',
    correctAnswer: 'success',
    options: ['success', 'exit', 'succeed', 'way out'],
    contrastExplanation: '"Success" significa "éxito". "Exit" solo significa "salida" (de un edificio o autopista).'
  },

  // A2 (4 CARDS)
  {
    id: 'en_ff_a2_1',
    level: 'A2',
    trapTitle: 'ATTEND vs. ASSIST',
    falseFriendPair: 'Assist ≠ Asistir a un lugar',
    situationPrompt: 'Quieres decir: "Más de cien personas asistieron a la conferencia ayer."',
    targetSentenceWithBlank: 'Over one hundred people _____ the conference yesterday.',
    fullCorrectSentence: 'Over one hundred people attended the conference yesterday.',
    correctAnswer: 'attended',
    options: ['attended', 'assisted', 'attended to', 'presented'],
    contrastExplanation: 'Para decir "asistir a una clase, reunión o evento" usamos "ATTEND". "Assist" significa "ayudar / auxiliar".'
  },
  {
    id: 'en_ff_a2_2',
    level: 'A2',
    trapTitle: 'REALIZE vs. CARRY OUT / MAKE',
    falseFriendPair: 'Realize ≠ Realizar (hacer)',
    situationPrompt: 'Quieres decir: "De repente me di cuenta de que había dejado mis llaves en casa."',
    targetSentenceWithBlank: 'I suddenly _____ that I had left my keys at home.',
    fullCorrectSentence: 'I suddenly realized that I had left my keys at home.',
    correctAnswer: 'realized',
    options: ['realized', 'noticed of', 'made Account', 'performed'],
    contrastExplanation: '"Realize" significa "darse cuenta de algo" (proceso mental). Para decir "realizar un proyecto" se usa "carry out" o "conduct".'
  },
  {
    id: 'en_ff_a2_3',
    level: 'A2',
    trapTitle: 'EMBARRASSED vs. PREGNANT',
    falseFriendPair: 'Embarrassed ≠ Embarazada',
    situationPrompt: 'Quieres decir: "Me sentí muy avergonzado cuando olvidé el nombre del director."',
    targetSentenceWithBlank: 'I felt really _____ when I forgot the director’s name.',
    fullCorrectSentence: 'I felt really embarrassed when I forgot the director’s name.',
    correctAnswer: 'embarrassed',
    options: ['embarrassed', 'pregnant', 'ashamed of', 'awkwardly'],
    contrastExplanation: '"Embarrassed" significa "avergonzado / apenado". "Embarazada" en inglés se dice "pregnant".'
  },
  {
    id: 'en_ff_a2_4',
    level: 'A2',
    trapTitle: 'BORROW vs. LEND',
    falseFriendPair: 'Pedir prestado vs. Dar prestado',
    situationPrompt: 'Quieres decir: "¿Me puedes prestar tu bolígrafo un segundo?" (tú me lo das a mí).',
    targetSentenceWithBlank: 'Could you _____ me your pen for a second, please?',
    fullCorrectSentence: 'Could you lend me your pen for a second, please?',
    correctAnswer: 'lend',
    options: ['lend', 'borrow', 'loaned', 'rent'],
    contrastExplanation: '"LEND" es dar prestado ("Could you lend me...?") y "BORROW" es recibir/tomar prestado ("Could I borrow your pen?").'
  },

  // B1 (4 CARDS)
  {
    id: 'en_ff_b1_1',
    level: 'B1',
    trapTitle: 'SENSIBLE vs. SENSITIVE',
    falseFriendPair: 'Sensible ≠ Sensible (emocional)',
    situationPrompt: 'Quieres decir: "Es una decisión financiera muy sensata y práctica."',
    targetSentenceWithBlank: 'That is a very _____ and practical financial decision.',
    fullCorrectSentence: 'That is a very sensible and practical financial decision.',
    correctAnswer: 'sensible',
    options: ['sensible', 'sensitive', 'Emotional', 'sensing'],
    contrastExplanation: '"Sensible" en inglés significa "sensato / prudente / con sentido común". Para decir "sensible (emocional o a la luz/frío)" se usa "sensitive".'
  },
  {
    id: 'en_ff_b1_2',
    level: 'B1',
    trapTitle: 'DISCUSS vs. ARGUE',
    falseFriendPair: 'Argue ≠ Discutir amistosamente un tema',
    situationPrompt: 'Quieres decir: "Mañana nos reuniremos para conversar/analizar los detalles del contrato."',
    targetSentenceWithBlank: 'Tomorrow we will meet to _____ the details of the contract.',
    fullCorrectSentence: 'Tomorrow we will meet to discuss the details of the contract.',
    correctAnswer: 'discuss',
    options: ['discuss', 'argue', 'discuss about', 'argument'],
    contrastExplanation: '"Discuss" (sin "about") significa "conversar o analizar un tema profesionalmente". "Argue" significa "pelearse verbalmente / discutir con enojo".'
  },
  {
    id: 'en_ff_b1_3',
    level: 'B1',
    trapTitle: 'PRETEND vs. INTEND',
    falseFriendPair: 'Pretend ≠ Pretender (tener intención)',
    situationPrompt: 'Quieres decir: "¿Qué pretendes (tienes intención de) lograr con esta estrategia?"',
    targetSentenceWithBlank: 'What do you _____ to achieve with this strategy?',
    fullCorrectSentence: 'What do you intend to achieve with this strategy?',
    correctAnswer: 'intend',
    options: ['intend', 'pretend', 'fake', 'simulate'],
    contrastExplanation: '"Intend to" significa "tener la intención de / pretender lograr algo". "Pretend" significa únicamente "fingir / aparentar".'
  },
  {
    id: 'en_ff_b1_4',
    level: 'B1',
    trapTitle: 'REMEMBER vs. REMIND',
    falseFriendPair: 'Recordar por uno mismo vs. Hacer recordar a otro',
    situationPrompt: 'Quieres decir: "Por favor, recuérdame llamar al contador a las tres."',
    targetSentenceWithBlank: 'Please _____ me to call the accountant at three o’clock.',
    fullCorrectSentence: 'Please remind me to call the accountant at three o’clock.',
    correctAnswer: 'remind',
    options: ['remind', 'remember', 'recall', 'memorize'],
    contrastExplanation: '"Remind [someone] to..." es hacer que otra persona recuerde algo ("Recuérdame llamar"). "Remember" es tener el recuerdo uno mismo ("I remember").'
  },

  // B2 (4 CARDS)
  {
    id: 'en_ff_b2_1',
    level: 'B2',
    trapTitle: 'EVENTUALLY vs. TEMPORARILY / PERHAPS',
    falseFriendPair: 'Eventually ≠ Eventualmente (tal vez)',
    situationPrompt: 'Quieres decir: "Después de meses de negociación, finalmente (al final) firmaron el acuerdo."',
    targetSentenceWithBlank: 'After months of negotiation, they _____ signed the agreement.',
    fullCorrectSentence: 'After months of negotiation, they eventually signed the agreement.',
    correctAnswer: 'eventually',
    options: ['eventually', 'possibly', 'occasionally', 'chance'],
    contrastExplanation: '"Eventually" significa "finalmente / a la larga / tras mucho tiempo". Para decir "eventualmente (posiblemente o de forma ocasional)" se usa "potentially" u "occasionally".'
  },
  {
    id: 'en_ff_b2_2',
    level: 'B2',
    trapTitle: 'COMPROMISE vs. COMMITMENT',
    falseFriendPair: 'Compromise ≠ Compromiso (dedicación)',
    situationPrompt: 'Quieres decir: "Agradecemos tu gran compromiso y dedicación con este proyecto."',
    targetSentenceWithBlank: 'We truly appreciate your strong _____ and dedication to this project.',
    fullCorrectSentence: 'We truly appreciate your strong commitment and dedication to this project.',
    correctAnswer: 'commitment',
    options: ['commitment', 'compromise', 'obligation', 'engagement ring'],
    contrastExplanation: '"Commitment" es compromiso/lealtad/obligación asumida. "Compromise" significa "acuerdo mutuo donde ambas partes ceden" (o poner en riesgo).'
  },
  {
    id: 'en_ff_b2_3',
    level: 'B2',
    trapTitle: 'COMPREHENSIVE vs. UNDERSTANDING',
    falseFriendPair: 'Comprehensive ≠ Comprensivo (empático)',
    situationPrompt: 'Quieres decir: "La auditoría incluye un análisis exhaustivo y completo de todos los riesgos."',
    targetSentenceWithBlank: 'The audit includes a _____ analysis of all operational risks.',
    fullCorrectSentence: 'The audit includes a comprehensive analysis of all operational risks.',
    correctAnswer: 'comprehensive',
    options: ['comprehensive', 'understanding', 'sympathetic', 'compassionate'],
    contrastExplanation: '"Comprehensive" significa "exhaustivo / completo / integral". Para decir que una persona es "comprensiva y empática" se usa "understanding".'
  },
  {
    id: 'en_ff_b2_4',
    level: 'B2',
    trapTitle: 'RESUME vs. SUMMARIZE',
    falseFriendPair: 'To resume ≠ Resumir un texto',
    situationPrompt: 'Quieres decir: "La sesión se reanudará inmediatamente después del receso para comer."',
    targetSentenceWithBlank: 'The session will _____ immediately after the lunch break.',
    fullCorrectSentence: 'The session will resume immediately after the lunch break.',
    correctAnswer: 'resume',
    options: ['resume', 'summarize', 'abstract', 'synthesis'],
    contrastExplanation: 'El verbo "to resume" significa "reanudar / retomar algo tras una pausa". Para decir "resumir un texto o presentación" usamos "to summarize".'
  }
];

export const SPANISH_FALSE_FRIENDS: FalseFriendCard[] = [
  // A1 (4 CARDS)
  {
    id: 'es_ff_a1_1',
    level: 'A1',
    trapTitle: 'ACTUALMENTE vs. EN REALIDAD',
    falseFriendPair: 'Actualmente ≠ Actually',
    situationPrompt: 'You want to say: "Actually (in fact), I prefer tea rather than coffee."',
    targetSentenceWithBlank: '_____, prefiero el té en lugar del café.',
    fullCorrectSentence: 'En realidad, prefiero el té en lugar del café.',
    correctAnswer: 'En realidad',
    options: ['En realidad', 'Actualmente', 'Presentemente', 'Corrientemente'],
    contrastExplanation: '"En realidad" (or "De hecho") means "Actually / In fact". "Actualmente" means "Currently / Nowadays".'
  },
  {
    id: 'es_ff_a1_2',
    level: 'A1',
    trapTitle: 'ÉXITO vs. SALIDA',
    falseFriendPair: 'Éxito ≠ Exit',
    situationPrompt: 'You want to say: "Where is the emergency exit of this building?"',
    targetSentenceWithBlank: '¿Dónde está la _____ de emergencia de este edificio?',
    fullCorrectSentence: '¿Dónde está la salida de emergencia de este edificio?',
    correctAnswer: 'salida',
    options: ['salida', 'éxito', 'partida', 'entrada'],
    contrastExplanation: '"La salida" means "the exit". "El éxito" is a false friend that means "success"!'
  },
  {
    id: 'es_ff_a1_3',
    level: 'A1',
    trapTitle: 'LIBRERÍA vs. BIBLIOTECA',
    falseFriendPair: 'Librería ≠ Library',
    situationPrompt: 'You want to say: "I study silently at the university library every afternoon."',
    targetSentenceWithBlank: 'Estudio en silencio en la _____ de la universidad todas las tardes.',
    fullCorrectSentence: 'Estudio en silencio en la biblioteca de la universidad todas las tardes.',
    correctAnswer: 'biblioteca',
    options: ['biblioteca', 'librería', 'papelería', 'lectura'],
    contrastExplanation: '"La biblioteca" is the library (where you borrow books and study). "La librería" is a bookstore where you buy books.'
  },
  {
    id: 'es_ff_a1_4',
    level: 'A1',
    trapTitle: 'SOPA vs. JABÓN',
    falseFriendPair: 'Sopa ≠ Soap',
    situationPrompt: 'You want to say at a hotel: "There is no soap in the bathroom."',
    targetSentenceWithBlank: 'Perdone, no hay _____ en el cuarto de baño.',
    fullCorrectSentence: 'Perdone, no hay jabón en el cuarto de baño.',
    correctAnswer: 'jabón',
    options: ['jabón', 'sopa', 'caldo', 'toalla'],
    contrastExplanation: '"El jabón" means "soap". "La sopa" is soup that you eat!'
  },

  // A2 (4 CARDS)
  {
    id: 'es_ff_a2_1',
    level: 'A2',
    trapTitle: 'AVERGONZADO vs. EMBARAZADA',
    falseFriendPair: 'Embarazada ≠ Embarrassed',
    situationPrompt: 'You want to say: "I felt very embarrassed when I arrived late to the dinner."',
    targetSentenceWithBlank: 'Me sentí muy _____ cuando llegué tarde a la cena.',
    fullCorrectSentence: 'Me sentí muy avergonzado cuando llegué tarde a la cena.',
    correctAnswer: 'avergonzado',
    options: ['avergonzado', 'embarazado', 'molesto', 'ocupado'],
    contrastExplanation: '"Avergonzado/a" (or "Me dio mucha vergüenza") means "embarrassed". "Embarazada" ONLY means "pregnant"!'
  },
  {
    id: 'es_ff_a2_2',
    level: 'A2',
    trapTitle: 'RECORDAR vs. ACORDARSE DE',
    falseFriendPair: 'Recordar algo vs. Acordarse DE algo',
    situationPrompt: 'You want to say: "Do you remember the name of that restaurant in Valencia?"',
    targetSentenceWithBlank: '¿Te _____ del nombre de aquel restaurante en Valencia?',
    fullCorrectSentence: '¿Te acuerdas del nombre de aquel restaurante en Valencia?',
    correctAnswer: 'acuerdas',
    options: ['acuerdas', 'recuerdas', 'memorizas', 'piensas'],
    contrastExplanation: 'With the reflexive pronoun and preposition DE ("¿Te ... del nombre?"), we use ACORDARSE DE ("¿Te acuerdas de...?"). RECORDAR is transitive without "de" ("¿Recuerdas el nombre?").'
  },
  {
    id: 'es_ff_a2_3',
    level: 'A2',
    trapTitle: 'ASISTIR A vs. AYUDAR / ATENDER',
    falseFriendPair: 'Asistir a ≠ To assist (help)',
    situationPrompt: 'You want to say: "We are going to attend an international trade fair tomorrow."',
    targetSentenceWithBlank: 'Mañana vamos a _____ a una feria comercial internacional.',
    fullCorrectSentence: 'Mañana vamos a asistir a una feria comercial internacional.',
    correctAnswer: 'asistir',
    options: ['asistir', 'atender', 'ayudar', 'presentar'],
    contrastExplanation: '"Asistir a [un lugar/evento]" means "to attend". Conversely, "Atender a un cliente" means "to assist/serve a customer"!'
  },
  {
    id: 'es_ff_a2_4',
    level: 'A2',
    trapTitle: 'CONSTIPADO vs. ESTREÑIDO',
    falseFriendPair: 'Estar constipado ≠ To be constipated',
    situationPrompt: 'A colleague in Spain says: "Hoy estoy un poco constipado y me duele la garganta." What do they mean?',
    targetSentenceWithBlank: 'In Spain, "estar constipado" means having _____.',
    fullCorrectSentence: 'In Spain, "estar constipado" means having a common cold / nasal congestion.',
    correctAnswer: 'a common cold / nasal congestion',
    options: [
      'a common cold / nasal congestion',
      'a stomach or digestive blockage',
      'a terrible migraine headache',
      'an allergic skin reaction'
    ],
    contrastExplanation: 'Watch out! "Estar constipado" (or "resfriado") in Spanish means having a common head cold! Digestive constipation is "estar estreñido".'
  },

  // B1 (4 CARDS)
  {
    id: 'es_ff_b1_1',
    level: 'B1',
    trapTitle: 'SENSATO vs. SENSIBLE',
    falseFriendPair: 'Sensible ≠ Sensible (practical)',
    situationPrompt: 'You want to say: "Choosing the train instead of driving in the snow is a very sensible decision."',
    targetSentenceWithBlank: 'Elegir el tren en vez de conducir con nieve es una decisión muy _____.',
    fullCorrectSentence: 'Elegir el tren en vez de conducir con nieve es una decisión muy sensata.',
    correctAnswer: 'sensata',
    options: ['sensata', 'sensible', 'emocional', 'delicada'],
    contrastExplanation: '"Sensato/a" means "sensible / level-headed / practical". In Spanish, "sensible" means "sensitive" (emotional or easily affected).'
  },
  {
    id: 'es_ff_b1_2',
    level: 'B1',
    trapTitle: 'APOYAR vs. SOPORTAR',
    falseFriendPair: 'Soportar ≠ To support (encourage/back)',
    situationPrompt: 'You want to say: "Thank you for supporting our team during the transition."',
    targetSentenceWithBlank: 'Muchas gracias por _____ a nuestro equipo durante la transición.',
    fullCorrectSentence: 'Muchas gracias por apoyar a nuestro equipo durante la transición.',
    correctAnswer: 'apoyar',
    options: ['apoyar', 'soportar', 'tolerar', 'aguantar'],
    contrastExplanation: '"Apoyar" means "to support / back / help". "Soportar" means "to put up with / tolerate something annoying" (or bear physical weight).'
  },
  {
    id: 'es_ff_b1_3',
    level: 'B1',
    trapTitle: 'DARSE CUENTA vs. REALIZAR',
    falseFriendPair: 'Realizar ≠ To realize (notice)',
    situationPrompt: 'You want to say: "I didn’t realize that the schedule had changed."',
    targetSentenceWithBlank: 'No _____ de que el horario había cambiado.',
    fullCorrectSentence: 'No me di cuenta de que el horario había cambiado.',
    correctAnswer: 'me di cuenta',
    options: ['me di cuenta', 'realicé', 'hice cuenta', 'cumplí'],
    contrastExplanation: '"Darse cuenta de..." means "to realize / notice". In Spanish, "realizar" means "to carry out / perform / accomplish" (e.g., "realizar un estudio").'
  },
  {
    id: 'es_ff_b1_4',
    level: 'B1',
    trapTitle: 'FINGIR vs. PRETENDER',
    falseFriendPair: 'Pretender ≠ To pretend (fake)',
    situationPrompt: 'You want to say: "He pretended to be asleep so he wouldn’t have to answer."',
    targetSentenceWithBlank: 'Él _____ estar dormido para no tener que responder.',
    fullCorrectSentence: 'Él fingió estar dormido para no tener que responder.',
    correctAnswer: 'fingió',
    options: ['fingió', 'pretendió', 'intentó', 'aspiró'],
    contrastExplanation: '"Fingir" means "to pretend / fake". In Spanish, "pretender" means "to intend / aim / expect to achieve something".'
  },

  // B2 (4 CARDS)
  {
    id: 'es_ff_b2_1',
    level: 'B2',
    trapTitle: 'COMPROMISO vs. ACUERDO MUTUO / CEDER',
    falseFriendPair: 'Compromiso = Commitment (AND Agreement)',
    situationPrompt: 'You want to say: "Both companies had to make concessions to reach a compromise."',
    targetSentenceWithBlank: 'Ambas empresas tuvieron que _____ para llegar a un acuerdo intermedio.',
    fullCorrectSentence: 'Ambas empresas tuvieron que ceder para llegar a un acuerdo intermedio.',
    correctAnswer: 'ceder',
    options: ['ceder', 'comprometer', 'prometerse', 'arriesgar'],
    contrastExplanation: 'To "compromise" in a negotiation is translated as "ceder / llegar a un acuerdo intermedio / hacer concesiones". "Comprometerse" means "to commit oneself" (or get engaged).'
  },
  {
    id: 'es_ff_b2_2',
    level: 'B2',
    trapTitle: 'FINALMENTE / A LA LARGA vs. EVENTUALMENTE',
    falseFriendPair: 'Eventualmente ≠ Eventually',
    situationPrompt: 'You want to say: "After years of research, the scientists eventually found the cure."',
    targetSentenceWithBlank: 'Tras años de investigación, los científicos _____ encontraron la cura.',
    fullCorrectSentence: 'Tras años de investigación, los científicos finalmente encontraron la cura.',
    correctAnswer: 'finalmente',
    options: ['finalmente', 'eventualmente', 'ocasionalmente', 'acaso'],
    contrastExplanation: 'In standard Spanish, "eventualmente" means "potentially / contingently / occasionally", whereas English "eventually" ("in the end") is "finalmente / a la larga / con el tiempo".'
  },
  {
    id: 'es_ff_b2_3',
    level: 'B2',
    trapTitle: 'REANUDAR vs. RESUMIR',
    falseFriendPair: 'Resumir ≠ To resume (restart)',
    situationPrompt: 'You want to say: "Negotiations will resume next Tuesday at nine."',
    targetSentenceWithBlank: 'Las negociaciones se _____ el próximo martes a las nueve.',
    fullCorrectSentence: 'Las negociaciones se reanudarán el próximo martes a las nueve.',
    correctAnswer: 'reanudarán',
    options: ['reanudarán', 'resumirán', 'sintetizarán', 'abreviarán'],
    contrastExplanation: '"Reanudar" (or "retomar") means "to resume / restart after a pause". "Resumir" means "to summarize"!'
  },
  {
    id: 'es_ff_b2_4',
    level: 'B2',
    trapTitle: 'EXHAUSTIVO / INTEGRAL vs. COMPRENSIVO',
    falseFriendPair: 'Comprensivo ≠ Comprehensive',
    situationPrompt: 'You want to say: "We need a comprehensive report covering all legal and financial aspects."',
    targetSentenceWithBlank: 'Necesitamos un informe _____ que abarque todos los aspectos legales y financieros.',
    fullCorrectSentence: 'Necesitamos un informe exhaustivo que abarque todos los aspectos legales y financieros.',
    correctAnswer: 'exhaustivo',
    options: ['exhaustivo', 'comprensivo', 'compasivo', 'simpático'],
    contrastExplanation: '"Exhaustivo" (or "integral / completo") means "comprehensive / thorough". In Spanish, "comprensivo" describes an empathetic, understanding person.'
  }
];
