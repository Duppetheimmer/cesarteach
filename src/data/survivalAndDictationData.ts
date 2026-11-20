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

// ============================================================================
// 1. DICTATION & ERROR HUNTER DATA — ENGLISH COURSE (FOR SPANISH SPEAKERS)
// ============================================================================
export const ENGLISH_DICTATION_ITEMS: DictationItem[] = [
  // LEVEL A1
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
  // LEVEL A2
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
  // LEVEL B1
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
  // LEVEL B2
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
  }
];

// ============================================================================
// 2. DICTATION & ERROR HUNTER DATA — SPANISH COURSE (FOR ENGLISH SPEAKERS)
// ============================================================================
export const SPANISH_DICTATION_ITEMS: DictationItem[] = [
  // LEVEL A1
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
  // LEVEL A2
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
  // LEVEL B1
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
  // LEVEL B2
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
  }
];

// ============================================================================
// 3. REAL-WORLD SURVIVAL MISSIONS — ENGLISH COURSE (FOR SPANISH SPEAKERS)
// ============================================================================
export const ENGLISH_SURVIVAL_MISSIONS: SurvivalMission[] = [
  {
    id: 'en_surv_a1_1',
    level: 'A1',
    title: 'Misión A1 · Cena en Londres y Cuenta Dividida',
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
        feedbackExplanation: '¡Misión A1 completada! La cuenta del restaurante es "the bill" (o "the check", nunca "the account"), "por separado" es "separately" y "con tarjeta" es "by card".'
      }
    ]
  },
  {
    id: 'en_surv_a2_1',
    level: 'A2',
    title: 'Misión A2 · Equipaje Perdido en el Aeropuerto',
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
        feedbackExplanation: '¡Misión A2 completada! Para alojamiento temporal en un viaje usamos Present Continuous ("I’m staying at...") y una pregunta indirecta natural ("Do you know what time it will arrive?").'
      }
    ]
  },
  {
    id: 'en_surv_b1_1',
    level: 'B1',
    title: 'Misión B1 · Entrevista Laboral y Negociación Híbrida',
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
        feedbackExplanation: '¡Misión B1 superada! "I was wondering whether..." con orden afirmativo ("the team operates") es la forma más elegante y profesional de preguntar en una entrevista.'
      }
    ]
  },
  {
    id: 'en_surv_b2_1',
    level: 'B2',
    title: 'Misión B2 · Junta Ejecutiva: Defensa de Presupuesto y Plazos',
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
        feedbackExplanation: '¡Misión B2 Ejecutiva superada! "By [deadline], we will have completed..." es la estructura exacta del Future Perfect para comprometer entregables corporativos.'
      }
    ]
  }
];

// ============================================================================
// 4. REAL-WORLD SURVIVAL MISSIONS — SPANISH COURSE (FOR ENGLISH SPEAKERS)
// ============================================================================
export const SPANISH_SURVIVAL_MISSIONS: SurvivalMission[] = [
  {
    id: 'es_surv_a1_1',
    level: 'A1',
    title: 'Mission A1 · Tapas in Madrid & Paying the Bill',
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
        feedbackExplanation: 'Mission A1 Complete! In a restaurant, the bill is "la cuenta", we ask "¿Nos trae la cuenta?", and paying by card is "pagar con tarjeta".'
      }
    ]
  },
  {
    id: 'es_surv_a2_1',
    level: 'A2',
    title: 'Mission A2 · High-Speed Train Delay & Ticket Change',
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
        feedbackExplanation: 'Mission A2 Complete! You correctly used "Gracias POR" (reason), "¿Dónde ESTÁ...?" (location), and "PARA la vía siete" (destination).'
      }
    ]
  },
  {
    id: 'es_surv_b1_1',
    level: 'B1',
    title: 'Mission B1 · Apartment Lease & Repair Negotiation',
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
        feedbackExplanation: 'Mission B1 Complete! Indirect commands ("Dile que me llame") and future time clauses ("en cuanto llegue") both take the Present Subjunctive.'
      }
    ]
  },
  {
    id: 'es_surv_b2_1',
    level: 'B2',
    title: 'Mission B2 · Executive Client Crisis & Contract Renegotiation',
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
        feedbackExplanation: 'Mission B2 Complete! You combined Futuro Compuesto ("Para mañana..., ya habremos desplegado") with a purpose clause in the Subjunctive ("para que su equipo lo valide").'
      }
    ]
  }
];
