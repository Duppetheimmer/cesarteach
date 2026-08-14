export interface PhrasebookItem {
  id: string;
  category: string;
  phraseEn: string;
  phraseEs: string;
  phonetic: string;
  contextTip: string;
}

export const a1Phrasebook: PhrasebookItem[] = [
  // Cafetería y Restaurante
  {
    id: 'ph_1',
    category: '☕ Cafetería y Restaurante',
    phraseEn: 'Can I get a coffee, please?',
    phraseEs: '¿Me da un café, por favor?',
    phonetic: '/kæn aɪ ɡet ə ˈkɒfi pliːz/',
    contextTip: 'La frase más natural y educada para pedir en cualquier cafetería angloparlante.'
  },
  {
    id: 'ph_2',
    category: '☕ Cafetería y Restaurante',
    phraseEn: 'I would like a table for two, please.',
    phraseEs: 'Me gustaría una mesa para dos, por favor.',
    phonetic: '/aɪ wʊd laɪk ə ˈteɪbl fɔː tuː pliːz/',
    contextTip: 'Úsala al entrar a un restaurante con un acompañante.'
  },
  {
    id: 'ph_3',
    category: '☕ Cafetería y Restaurante',
    phraseEn: 'Could I see the menu, please?',
    phraseEs: '¿Podría ver el menú, por favor?',
    phonetic: '/kʊd aɪ siː ðə ˈmenjuː pliːz/',
    contextTip: 'Forma súper cortés usando "Could I".'
  },
  {
    id: 'ph_4',
    category: '☕ Cafetería y Restaurante',
    phraseEn: 'The check, please.',
    phraseEs: 'La cuenta, por favor.',
    phonetic: '/ðə tʃek pliːz/',
    contextTip: 'En EE.UU. se dice "The check", en Reino Unido dicen "The bill".'
  },

  // Viajes y Direcciones
  {
    id: 'ph_5',
    category: '🗺️ Viajes y Direcciones',
    phraseEn: 'Excuse me, where is the bathroom?',
    phraseEs: 'Disculpe, ¿dónde está el baño?',
    phonetic: '/ɪkˈskjuːz miː weər ɪz ðə ˈbɑːθruːm/',
    contextTip: '"Excuse me" es la forma cortesísima de llamar la atención de un desconocido.'
  },
  {
    id: 'ph_6',
    category: '🗺️ Viajes y Direcciones',
    phraseEn: 'Is it far from here?',
    phraseEs: '¿Está lejos de aquí?',
    phonetic: '/ɪz ɪt fɑːr frɒm hɪər/',
    contextTip: 'Respuestas comunes: "No, it\'s close" (No, está cerca) o "A 5-minute walk" (A 5 minutos a pie).'
  },
  {
    id: 'ph_7',
    category: '🗺️ Viajes y Direcciones',
    phraseEn: 'How do I get to the train station?',
    phraseEs: '¿Cómo llego a la estación de tren?',
    phonetic: '/haʊ duː aɪ ɡet tuː ðə treɪn ˈsteɪʃn/',
    contextTip: 'Fórmula universal: "How do I get to + lugar?".'
  },

  // Hotel y Hospedaje
  {
    id: 'ph_8',
    category: '🏨 Hotel y Hospedaje',
    phraseEn: 'I have a reservation under my name.',
    phraseEs: 'Tengo una reserva a mi nombre.',
    phonetic: '/aɪ hæv ə ˌrezəˈveɪʃn ˈʌndər maɪ neɪm/',
    contextTip: 'Dilo al llegar a la recepción del hotel.'
  },
  {
    id: 'ph_9',
    category: '🏨 Hotel y Hospedaje',
    phraseEn: 'What time is check-out?',
    phraseEs: '¿A qué hora es la salida (check-out)?',
    phonetic: '/wɒt taɪm ɪz tʃek aʊt/',
    contextTip: 'Para saber a qué hora debes entregar la habitación.'
  },
  {
    id: 'ph_10',
    category: '🏨 Hotel y Hospedaje',
    phraseEn: 'Is Wi-Fi included?',
    phraseEs: '¿Está incluido el Wi-Fi?',
    phonetic: '/ɪz waɪ faɪ ɪnˈkluːdɪd/',
    contextTip: 'Pregunta también: "What is the Wi-Fi password?" (¿Cuál es la clave?).'
  },

  // Presentación y Social
  {
    id: 'ph_11',
    category: '💬 Social y Saludos',
    phraseEn: 'Nice to meet you! My name is...',
    phraseEs: '¡Gusto en conocerte! Mi nombre es...',
    phonetic: '/naɪs tuː miːt juː maɪ neɪm ɪz/',
    contextTip: 'Acompaña siempre esta frase con una sonrisa o un estrechón de manos.'
  },
  {
    id: 'ph_12',
    category: '💬 Social y Saludos',
    phraseEn: 'Where are you from?',
    phraseEs: '¿De dónde eres?',
    phonetic: '/weər ɑːr juː frɒm/',
    contextTip: 'Respuesta: "I am from [tu país]".'
  },
  {
    id: 'ph_13',
    category: '💬 Social y Saludos',
    phraseEn: 'Sorry, I am learning English.',
    phraseEs: 'Disculpa, estoy aprendiendo inglés.',
    phonetic: '/ˈsɒri aɪ æm ˈlɜːnɪŋ ˈɪŋɡlɪʃ/',
    contextTip: 'Hará que los angloparlantes te hablen más despacio y con amabilidad.'
  },
  {
    id: 'ph_14',
    category: '💬 Social y Saludos',
    phraseEn: 'Could you speak a bit slower, please?',
    phraseEs: '¿Podrías hablar un poco más despacio, por favor?',
    phonetic: '/kʊd juː spiːk ə bɪt ˈsləʊər pliːz/',
    contextTip: 'Frase salva-vidas cuando hablen muy rápido.'
  },

  // Compras y Precios
  {
    id: 'ph_15',
    category: '🛍️ Compras y Tiendas',
    phraseEn: 'How much is this?',
    phraseEs: '¿Cuánto cuesta esto?',
    phonetic: '/haʊ mʌtʃ ɪz ðɪs/',
    contextTip: 'Sostén el producto o señálalo al preguntar.'
  },
  {
    id: 'ph_16',
    category: '🛍️ Compras y Tiendas',
    phraseEn: 'Can I try this on?',
    phraseEs: '¿Me puedo probar esto?',
    phonetic: '/kæn aɪ traɪ ðɪs ɒn/',
    contextTip: 'Pregunta clave en tiendas de ropa.'
  },

  // Emergencias y Ayuda
  {
    id: 'ph_17',
    category: '🚑 Emergencias y Ayuda',
    phraseEn: 'I need help, please.',
    phraseEs: 'Necesito ayuda, por favor.',
    phonetic: '/aɪ niːd help pliːz/',
    contextTip: 'Frase vital para situaciones de urgencia.'
  },
  {
    id: 'ph_18',
    category: '🚑 Emergencias y Ayuda',
    phraseEn: 'Where is the nearest pharmacy?',
    phraseEs: '¿Dónde está la farmacia más cercana?',
    phonetic: '/weər ɪz ðə ˈnɪərɪst ˈfɑːməsi/',
    contextTip: 'Útil si necesitas medicamentos en un viaje.'
  }
];
