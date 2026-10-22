import { LessonStep, VocabWord, ExamQuestion } from '../types';

// ============================================================================
// ENGLISH CEFR A2 CURRICULUM (FOR SPANISH SPEAKERS)
// ============================================================================

export const a2EnglishLessons: LessonStep[] = [
  {
    id: 'a2_1',
    day: 19,
    cefrLevel: 'A2',
    category: 'A2 • Past & Storytelling',
    title: 'Past Simple: Regular & Irregular Verbs',
    description: 'Habla sobre experiencias pasadas, lo que hiciste ayer o en tus últimas vacaciones usando verbos regulares (-ed) e irregulares.',
    grammarFocus: 'Afirmativa: Sujeto + Verbo en Pasado | Negativa: didn\'t + Verbo Base | Pregunta: Did + Sujeto + Verbo Base?',
    commonMistake: 'Error común: Usar el verbo en pasado después de "didn\'t" o "Did". ❌ "I didn\'t went" -> ✅ "I didn\'t go" (El auxiliar DID ya marca el pasado).',
    strategyTip: 'Agrupa los verbos irregulares por patrones sonoros en vez de orden alfabético (ej. buy-bought, think-thought, bring-brought).',
    content: `🎯 OBJETIVO A2.1: NARRAR ACCIONES TERMINADAS EN EL PASADO

En el nivel A2 damos el gran salto temporal: dejamos de hablar solo del presente y aprendemos a contar historias reales sobre ayer, la semana pasada o nuestro último viaje.

1. VERBOS REGULARES (Terminación -ED)
La mayoría de los verbos en inglés forman su pasado agregando "-ed":
• Work -> Worked (Trabajé / Trabajó)
• Travel -> Traveled (Viajé / Viajó)
• Study -> Studied (Estudié - cambia 'y' por 'ied')

💡 TRUCO DE PRONUNCIACIÓN (-ED):
• Nunca pronuncies la "e" en "worked" o "watched" (/wɜːrkt/, /wɒtʃt/).
• Solo se pronuncia como sílaba extra (/ɪd/) cuando el verbo termina en sonido T o D: Needed (/niːdɪd/), Wanted (/wɒntɪd/).

2. LOS 8 VERBOS IRREGULARES ESENCIALES DE SUPERVIVENCIA:
• Go -> Went (Ir -> Fui / Fue)
• Have -> Had (Tener -> Tuve)
• See -> Saw (Ver -> Vi)
• Buy -> Bought (Comprar -> Compré)
• Eat -> Ate (Comer -> Comí)
• Make -> Made (Hacer -> Hice)
• Take -> Took (Tomar -> Tomé)
• Get -> Got (Conseguir/Llegar -> Conseguí/Llegué)

3. REGLA DE ORO DEL AUXILIAR "DID" (Negativas y Preguntas)
Cuando aparece DID o DIDN'T, el verbo principal vuelve a su forma original (infinitivo sin 'to'):
• (+) Yesterday I went to the cinema. (Ayer fui al cine).
• (-) Yesterday I didn't go to the cinema. (Ayer no fui al cine).
• (?) Did you go to the cinema yesterday? — Yes, I did. / No, I didn't.`,
    dialogue: [
      { speaker: 'Emma', textEn: 'Hi Carlos! How was your weekend? Did you stay in Madrid?', textEs: '¡Hola Carlos! ¿Qué tal estuvo tu fin de semana? ¿Te quedaste en Madrid?' },
      { speaker: 'Carlos', textEn: 'No, I didn\'t. I went to Barcelona with my sister on Friday.', textEs: 'No. Fui a Barcelona con mi hermana el viernes.' },
      { speaker: 'Emma', textEn: 'That sounds great! What did you do there?', textEs: '¡Suena genial! ¿Qué hicieron allá?' },
      { speaker: 'Carlos', textEn: 'We visited the Sagrada Familia, walked by the beach, and ate delicious seafood.', textEs: 'Visitamos la Sagrada Familia, caminamos por la playa y comimos mariscos deliciosos.' }
    ],
    quiz: [
      {
        id: 'a2_1_q1',
        question: '¿Cuál es la forma correcta de decir "Ayer no fui al trabajo"?',
        options: [
          'Yesterday I didn\'t went to work.',
          'Yesterday I didn\'t go to work.',
          'Yesterday I don\'t went to work.',
          'Yesterday I not go to work.'
        ],
        correctAnswer: 'Yesterday I didn\'t go to work.',
        explanation: 'Con el auxiliar negativo "didn\'t", el verbo principal siempre va en su forma base ("go", nunca "went").',
        hint: 'Recuerda: "didn\'t" ya lleva la marca del pasado.'
      },
      {
        id: 'a2_1_q2',
        type: 'word-order',
        question: 'Ordena la pregunta en pasado simple:',
        targetText: 'Where did you buy that jacket',
        options: [],
        correctAnswer: 'Where did you buy that jacket',
        explanation: 'Estructura de pregunta en pasado: Wh-word (Where) + did + sujeto (you) + verbo base (buy) + complemento.',
        hint: 'Empieza con "Where did you..."'
      },
      {
        id: 'a2_1_q3',
        question: 'Completa la frase: Last night we _____ a great movie and _____ pizza.',
        options: ['see / eat', 'saw / ate', 'seed / eated', 'seen / eaten'],
        correctAnswer: 'saw / ate',
        explanation: '"See" y "Eat" son verbos irregulares: su pasado simple afirmativo es "saw" y "ate".',
        hint: 'Ambos verbos están en una oración afirmativa en pasado.'
      },
      {
        id: 'a2_1_q4',
        type: 'speaking',
        question: 'Pronuncia en voz alta esta frase sobre el fin de semana pasado:',
        targetText: 'Last weekend I visited my family and we had dinner together',
        options: [],
        correctAnswer: 'Last weekend I visited my family and we had dinner together',
        explanation: 'Excelente práctica de fluidez conectando un verbo regular (visited) y uno irregular (had).'
      }
    ]
  },
  {
    id: 'a2_2',
    day: 20,
    cefrLevel: 'A2',
    category: 'A2 • Past & Storytelling',
    title: 'Past Continuous vs. Past Simple: Telling Stories',
    description: 'Combina acciones en progreso en el pasado ("estaba haciendo") con eventos repentinos ("cuando pasó algo") usando WHEN y WHILE.',
    grammarFocus: 'Past Continuous: was / were + verbo-ING | Interrupción: WHEN + Past Simple / WHILE + Past Continuous',
    commonMistake: 'Error común: Confundir "was" y "were". Usa WAS con I, He, She, It; usa WERE con You, We, They.',
    strategyTip: 'Imagina el Past Continuous como un video de fondo (acción larga) y el Past Simple como una fotografía instantánea que lo interrumpe.',
    content: `🎯 OBJETIVO A2.2: CONTAR ANÉCDOTAS CON CONTEXTO Y ACCIÓN

Para contar una historia interesante en inglés no basta con enumerar hechos; necesitas describir qué estaba ocurriendo de fondo cuando sucedió algo inesperado.

1. ESTRUCTURA DEL PAST CONTINUOUS (Estaba + Gerundio)
• I / He / She / It + WAS + Verbo-ING -> I was sleeping (Yo estaba durmiendo).
• You / We / They + WERE + Verbo-ING -> They were working (Ellos estaban trabajando).

2. LA FÓRMULA DE ORO PARA NARRAR HISTORIAS:
Acción en progreso (Past Continuous) + WHEN + Acción que interrumpe (Past Simple)
• I was cooking dinner WHEN the phone rang.
  (Estaba cocinando la cena CUANDO sonó el teléfono).
• We were walking in the park WHEN it started to rain.
  (Estábamos caminando en el parque CUANDO empezó a llover).

3. CUÁNDO USAR "WHILE" (Mientras) vs "WHEN" (Cuando)
• WHILE va seguido de una acción larga (Past Continuous):
  "While I was driving to work, I saw an accident."
• WHEN suele ir seguido de la acción corta (Past Simple):
  "I was driving to work when I saw an accident."`,
    dialogue: [
      { speaker: 'Liam', textEn: 'Why didn\'t you answer my call yesterday evening?', textEs: '¿Por qué no contestaste mi llamada ayer por la tarde?' },
      { speaker: 'Sofía', textEn: 'Sorry! When you called, I was taking a shower and my phone was in the bedroom.', textEs: '¡Perdón! Cuando llamaste, me estaba duchando y mi teléfono estaba en la habitación.' },
      { speaker: 'Liam', textEn: 'No problem! I was walking near your house and wanted to say hello.', textEs: '¡No hay problema! Estaba caminando cerca de tu casa y quería saludarte.' }
    ],
    quiz: [
      {
        id: 'a2_2_q1',
        question: 'Completa la anécdota: I _____ TV when the lights _____ out.',
        options: [
          'watched / were going',
          'was watching / went',
          'were watching / went',
          'was watch / go'
        ],
        correctAnswer: 'was watching / went',
        explanation: '"I was watching TV" es la acción larga de fondo (Past Continuous) y "went out" es la interrupción repentina (Past Simple).',
        hint: 'Con "I" usamos "was + ing", y el pasado de "go" es "went".'
      },
      {
        id: 'a2_2_q2',
        type: 'word-order',
        question: 'Ordena la frase sobre una acción interrumpida:',
        targetText: 'We were walking home when it started to rain',
        options: [],
        correctAnswer: 'We were walking home when it started to rain',
        explanation: '"We were walking home" establece la escena en progreso y "when it started to rain" introduce el evento puntual.',
        hint: 'Comienza con "We were walking..."'
      },
      {
        id: 'a2_2_q3',
        question: 'What _____ you doing at 8:00 PM yesterday?',
        options: ['did', 'was', 'were', 'are'],
        correctAnswer: 'were',
        explanation: 'Con el pronombre "you" y un verbo terminado en "-ing" (doing), el auxiliar del Past Continuous es "were".',
        hint: 'Fíjate en el gerundio "doing" y el sujeto "you".'
      }
    ]
  },
  {
    id: 'a2_3',
    day: 21,
    cefrLevel: 'A2',
    category: 'A2 • Descriptions & Decisions',
    title: 'Comparatives & Superlatives: Comparing the World',
    description: 'Compara ciudades, productos, precios y personas con precisión usando adjetivos cortos (-er / -est), largos (more / the most) e irregulares.',
    grammarFocus: 'Cortos: Adj-er than / the Adj-est | Largos: more Adj than / the most Adj | Igualdad: as Adj as',
    commonMistake: 'Error común: Decir "more better" o "more cheaper". ❌ "This phone is more cheaper" -> ✅ "This phone is cheaper". Nunca combines "more" con "-er".',
    strategyTip: 'Cuenta las sílabas del adjetivo al hablar: 1 sílaba = agrega "-er" (fast -> faster); 2 o más sílabas (excepto terminados en -y) = usa "more" (modern -> more modern).',
    content: `🎯 OBJETIVO A2.3: COMPARAR OPCIONES Y TOMAR DECISIONES

En la vida real comparamos todo el tiempo: qué apartamento alquilar, qué vuelo comprar o qué ciudad visitar.

1. ADJETIVOS CORTOS (1 sílaba, o 2 terminados en -Y)
• Comparativo (+ER THAN):
  - Fast -> Faster than (Más rápido que)
  - Big -> Bigger than (Más grande que - duplica consonante)
  - Easy -> Easier than (Más fácil que - cambia 'y' por 'ier')
• Superlativo (THE + EST):
  - The fastest (El más rápido), The biggest (El más grande), The easiest (El más fácil).

2. ADJETIVOS LARGOS (2+ sílabas)
• Comparativo (MORE ... THAN):
  - Expensive -> More expensive than (Más caro que)
  - Comfortable -> More comfortable than (Más cómodo que)
• Superlativo (THE MOST ...):
  - The most expensive (El más caro), The most important (El más importante).

3. LOS 3 IRREGULARES OBLIGATORIOS:
• Good (Bueno) -> Better than (Mejor que) -> The best (El mejor)
• Bad (Malo) -> Worse than (Peor que) -> The worst (El peor)
• Far (Lejos) -> Further than (Más lejos que) -> The furthest (El más lejano)

4. COMPARACIÓN DE IGUALDAD (AS ... AS):
• Madrid is as vibrant as London. (Madrid es tan vibrante como Londres).
• The train isn't as expensive as the plane. (El tren no es tan caro como el avión).`,
    dialogue: [
      { speaker: 'Customer', textEn: 'Excuse me, I am looking for a new laptop. Which one is better for traveling?', textEs: 'Disculpe, busco una portátil nueva. ¿Cuál es mejor para viajar?' },
      { speaker: 'Seller', textEn: 'The AirBook is lighter and thinner than the ProModel, so it\'s easier to carry.', textEs: 'La AirBook es más ligera y delgada que la ProModel, así que es más fácil de llevar.' },
      { speaker: 'Customer', textEn: 'Is it more expensive than the ProModel?', textEs: '¿Es más cara que la ProModel?' },
      { speaker: 'Seller', textEn: 'Actually, no! It\'s $200 cheaper, and it has the best battery in the store.', textEs: '¡En realidad no! Es 200 dólares más barata y tiene la mejor batería de la tienda.' }
    ],
    quiz: [
      {
        id: 'a2_3_q1',
        question: 'Elige la opción gramaticalmente correcta:',
        options: [
          'Traveling by train is more comfortable than traveling by bus.',
          'Traveling by train is comfortabler than traveling by bus.',
          'Traveling by train is more comfortabler than traveling by bus.',
          'Traveling by train is most comfortable than traveling by bus.'
        ],
        correctAnswer: 'Traveling by train is more comfortable than traveling by bus.',
        explanation: '"Comfortable" es un adjetivo largo (3-4 sílabas), por lo que su comparativo se forma con "more ... than".',
        hint: 'Los adjetivos largos usan "more ... than".'
      },
      {
        id: 'a2_3_q2',
        question: 'Completa: This restaurant has _____ pasta in the city, and it is _____ than the place next door.',
        options: [
          'the better / more cheap',
          'the best / cheaper',
          'the goodest / cheaper',
          'best / cheapest'
        ],
        correctAnswer: 'the best / cheaper',
        explanation: 'El superlativo irregular de "good" es "the best", y el comparativo de "cheap" (1 sílaba) es "cheaper".',
        hint: 'Good -> Better -> The best.'
      },
      {
        id: 'a2_3_q3',
        type: 'word-order',
        question: 'Ordena la comparación de igualdad:',
        targetText: 'This coffee is not as strong as the espresso',
        options: [],
        correctAnswer: 'This coffee is not as strong as the espresso',
        explanation: 'Usamos "not as [adjetivo] as" para expresar "no tan [adjetivo] como".',
        hint: 'Usa la estructura "not as strong as".'
      }
    ]
  },
  {
    id: 'a2_4',
    day: 22,
    cefrLevel: 'A2',
    category: 'A2 • Future & Planning',
    title: 'Future Plans & Predictions: Going to vs. Will',
    description: 'Domina la diferencia real entre planes decididos ("I am going to") y decisiones espontáneas, promesas o predicciones ("I will").',
    grammarFocus: 'Plan previo: am/is/are + going to + verbo | Decisión en el momento / Promesa / Predicción: will / won\'t + verbo',
    commonMistake: 'Error común: Olvidar el verbo To Be antes de "going to". ❌ "I going to travel" -> ✅ "I am going to travel".',
    strategyTip: 'Si ya compraste el boleto o lo anotaste en tu agenda antes de hablar, usa "GOING TO". Si lo acabas de decidir en este segundo, usa "WILL".',
    content: `🎯 OBJETIVO A2.4: EXPRESAR PLANES FUTUROS, PROMESAS Y PREDICCIONES

En inglés existen dos formas principales de hablar del futuro en nivel A2, y cada una transmite una intención distinta:

1. BE GOING TO + VERBO (Planes decididos e intenciones claras)
Úsalo cuando la decisión se tomó ANTES de hablar o cuando hay evidencia visual:
• I am going to visit my grandparents this Sunday. (Voy a visitar a mis abuelos este domingo - ya es un plan).
• She is going to move to a new apartment next month. (Ella se va a mudar el próximo mes).
• Look at those black clouds! It is going to rain. (¡Mira esas nubes negras! Va a llover - evidencia clara).

2. WILL / WON'T + VERBO (Decisiones espontáneas, promesas y ofertas)
Úsalo cuando decides algo en el mismo instante de hablar, ofreces ayuda o haces una predicción con "I think":
• "The phone is ringing!" — "I'll answer it!" (Decisión instantánea).
• Don't worry, I will help you with your luggage. (Promesa / Oferta).
• I think technology will change education even more. (Opinión / Predicción).
• Negativa: WILL NOT = WON'T -> "I promise I won't be late." (Prometo que no llegaré tarde).`,
    dialogue: [
      { speaker: 'Clara', textEn: 'What are your plans for the summer holidays, David?', textEs: '¿Cuáles son tus planes para las vacaciones de verano, David?' },
      { speaker: 'David', textEn: 'I am going to fly to Lisbon in July. I already bought the tickets!', textEs: 'Voy a volar a Lisboa en julio. ¡Ya compré los boletos!' },
      { speaker: 'Clara', textEn: 'Amazing! Wait, you dropped your boarding pass folder.', textEs: '¡Increíble! Espera, se te cayó tu carpeta de viaje.' },
      { speaker: 'David', textEn: 'Oh, thanks! I\'ll pick it up right now.', textEs: '¡Oh, gracias! La recogeré ahora mismo.' }
    ],
    quiz: [
      {
        id: 'a2_4_q1',
        question: 'Tu amigo dice: "Tengo mucha sed". ¿Qué respondes si decides ir por agua en ese mismo instante?',
        options: [
          'I am going to get you a glass of water.',
          'I\'ll get you a glass of water!',
          'I get you a glass of water.',
          'I will to get you water.'
        ],
        correctAnswer: 'I\'ll get you a glass of water!',
        explanation: 'Para decisiones espontáneas u ofrecimientos hechos en el momento de hablar, siempre usamos "Will" (I\'ll).',
        hint: 'Es una decisión tomada en el acto para ofrecer ayuda.'
      },
      {
        id: 'a2_4_q2',
        question: 'Completa sobre un plan ya organizado: Next year we _____ open a new office in Mexico City.',
        options: [
          'going to',
          'are going to',
          'will to',
          'is going to'
        ],
        correctAnswer: 'are going to',
        explanation: 'Con el sujeto "we", necesitamos el verbo To Be "are" + "going to" para expresar un plan ya decidido.',
        hint: 'No olvides el verbo To Be conjugado para "we".'
      },
      {
        id: 'a2_4_q3',
        type: 'word-order',
        question: 'Ordena la promesa en futuro:',
        targetText: 'I promise I will call you tomorrow morning',
        options: [],
        correctAnswer: 'I promise I will call you tomorrow morning',
        explanation: 'Con promesas ("I promise"), el inglés utiliza el auxiliar modal "will" seguido del verbo base.',
        hint: 'Empieza con "I promise I will..."'
      }
    ]
  },
  {
    id: 'a2_5',
    day: 23,
    cefrLevel: 'A2',
    category: 'A2 • Life Experiences',
    title: 'Present Perfect: Life Experiences (Have you ever...?)',
    description: 'Conecta el pasado con el presente para hablar de experiencias de vida, logros y acciones recientes con ever, never, already y yet.',
    grammarFocus: 'have / has + Participio Pasado (worked / gone / been / seen)',
    commonMistake: 'Error común: Usar Present Perfect con fechas específicas del pasado. ❌ "I have visited Rome in 2022" -> ✅ "I visited Rome in 2022" (Si dices CUÁNDO ocurrió, usa Past Simple).',
    strategyTip: 'Usa Present Perfect cuando importa EL LOGRO o LA EXPERIENCIA ("He estado en Japón"), y Past Simple cuando das EL DETALLE TEMPORAL ("Fui en 2023").',
    content: `🎯 OBJETIVO A2.5: HABLAR DE EXPERIENCIAS DE VIDA Y LOGROS

El Present Perfect ("He hecho / Has visto") es el puente entre el pasado y el presente.

1. ESTRUCTURA: HAVE / HAS + PARTICIPIO PASADO
• I / You / We / They + HAVE ('ve) / HAVEN'T + Participio
• He / She / It + HAS ('s) / HASN'T + Participio

2. PARTICIPIOS CLAVE QUE DEBES DOMINAR:
• Regulares: quedan igual que en pasado (-ed): Visited, Worked, Traveled, Tried.
• Irregulares esenciales:
  - Be -> Been (Estado)
  - Go -> Gone (Ido)
  - See -> Seen (Visto)
  - Eat -> Eaten (Comido)
  - Do -> Done (Hecho)
  - Write -> Written (Escrito)

3. PALABRAS CLAVE DEL PRESENT PERFECT:
• EVER (¿Alguna vez? - en preguntas): "Have you ever tried sushi?"
• NEVER (Nunca - en oración afirmativa): "I have never been to Australia."
• ALREADY (Ya - antes de lo esperado): "She has already finished the report."
• YET (Todavía no / Ya - al final de negativas y preguntas): "I haven't seen that movie yet."`,
    dialogue: [
      { speaker: 'Interviewer', textEn: 'Have you ever worked with international clients before?', textEs: '¿Alguna vez has trabajado con clientes internacionales antes?' },
      { speaker: 'Elena', textEn: 'Yes, I have! I have managed projects for teams in Canada and Germany.', textEs: '¡Sí! He gestionado proyectos para equipos en Canadá y Alemania.' },
      { speaker: 'Interviewer', textEn: 'Have you ever visited their offices in Berlin?', textEs: '¿Has visitado alguna vez sus oficinas en Berlín?' },
      { speaker: 'Elena', textEn: 'Not yet, but I have spoken with them on video calls every week.', textEs: 'Todavía no, pero he hablado con ellos por videollamada todas las semanas.' }
    ],
    quiz: [
      {
        id: 'a2_5_q1',
        question: 'Completa la pregunta sobre experiencias de vida: Have you _____ _____ to London?',
        options: [
          'ever / went',
          'ever / been',
          'never / go',
          'already / was'
        ],
        correctAnswer: 'ever / been',
        explanation: 'En preguntas sobre experiencias usamos "ever" + el participio pasado "been" (Have you ever been to...?).',
        hint: 'El participio de "be" es "been".'
      },
      {
        id: 'a2_5_q2',
        question: '¿Cuál de estas dos oraciones es correcta?',
        options: [
          'I haven\'t finished my homework yet.',
          'I haven\'t finished yet my homework.',
          'I didn\'t finished my homework yet.',
          'I have never finish my homework.'
        ],
        correctAnswer: 'I haven\'t finished my homework yet.',
        explanation: '"Yet" en oraciones negativas significa "todavía" y se coloca siempre al final de la oración.',
        hint: '"Yet" va al final de la frase.'
      },
      {
        id: 'a2_5_q3',
        type: 'speaking',
        question: 'Pronuncia esta frase sobre tus experiencias:',
        targetText: 'I have never eaten Japanese ramen before',
        options: [],
        correctAnswer: 'I have never eaten Japanese ramen before',
        explanation: 'Excelente pronunciación del Present Perfect con "never" y el participio "eaten".'
      }
    ]
  },
  {
    id: 'a2_6',
    day: 24,
    cefrLevel: 'A2',
    category: 'A2 • Social & Workplace',
    title: 'Modals of Advice & Obligation: Should, Must & Have to',
    description: 'Da consejos prácticos con "should", expresa reglas u obligaciones con "must / have to" y entiende la gran diferencia entre "mustn\'t" y "don\'t have to".',
    grammarFocus: 'Consejo: should / shouldn\'t | Obligación: must / have to | Prohibición: mustn\'t vs Ausencia de obligación: don\'t have to',
    commonMistake: 'Trampa clásica: "You don\'t have to" NO significa prohibido; significa "no es necesario". Para prohibir algo usa "You mustn\'t".',
    strategyTip: 'Recuerda que después de SHOULD y MUST nunca se usa "to" (✅ You should rest / ❌ You should to rest).',
    content: `🎯 OBJETIVO A2.6: DAR CONSEJOS, EXPRESAR REGLAS Y OBLIGACIONES

En el trabajo, los viajes y la salud necesitas distinguir entre una sugerencia amable, una obligación y una prohibición.

1. SHOULD / SHOULDN'T (Consejos y Recomendaciones)
Se usa para dar tu opinión sobre qué es lo mejor hacer:
• You look tired. You should go to bed early. (Deberías irte a dormir temprano).
• You shouldn't drink coffee so late at night. (No deberías tomar café tan tarde).

2. MUST vs HAVE TO (Obligación Fuerte)
• HAVE TO (Reglas externas, leyes, horarios de trabajo):
  - I have to wear a uniform at work. (Tengo que usar uniforme en el trabajo).
  - She has to wake up at 6:00 AM tomorrow. (Ella tiene que despertarse a las 6).
• MUST (Obligación moral, personal o carteles oficiales):
  - Passengers must show their passport at the gate. (Los pasajeros deben mostrar su pasaporte).

3. ¡CUIDADO CON LAS NEGATIVAS! (MUSTN'T vs DON'T HAVE TO)
• MUSTN'T = PROHIBIDO (¡No lo hagas!):
  - You mustn't smoke inside the hospital. (Está prohibido fumar en el hospital).
• DON'T HAVE TO = NO ES NECESARIO (Opcional):
  - Tomorrow is Sunday, so I don't have to work! (Mañana es domingo, ¡así que no tengo que trabajar!).`,
    dialogue: [
      { speaker: 'New Employee', textEn: 'Hi Sarah! What time do we have to arrive at the office on Fridays?', textEs: '¡Hola Sarah! ¿A qué hora tenemos que llegar a la oficina los viernes?' },
      { speaker: 'Sarah', textEn: 'On Fridays we work from home, so you don\'t have to come to the office!', textEs: 'Los viernes trabajamos desde casa, ¡así que no tienes que venir a la oficina!' },
      { speaker: 'New Employee', textEn: 'That\'s great! Anything else I should know?', textEs: '¡Qué bien! ¿Alguna otra cosa que debería saber?' },
      { speaker: 'Sarah', textEn: 'Yes, you should join the 9:30 AM video call, and you mustn\'t share client passwords.', textEs: 'Sí, deberías unirte a la videollamada de las 9:30 y no debes compartir contraseñas de clientes.' }
    ],
    quiz: [
      {
        id: 'a2_6_q1',
        question: 'El museo es gratuito los domingos. ¿Cómo se dice "No tienes que pagar entrada los domingos"?',
        options: [
          'You mustn\'t pay for a ticket on Sundays.',
          'You don\'t have to pay for a ticket on Sundays.',
          'You shouldn\'t to pay on Sundays.',
          'You haven\'t to pay on Sundays.'
        ],
        correctAnswer: 'You don\'t have to pay for a ticket on Sundays.',
        explanation: '"Don\'t have to" indica que algo no es necesario (es gratis/opcional). "Mustn\'t" significaría que está prohibido pagar.',
        hint: 'Expresa ausencia de necesidad, no prohibición.'
      },
      {
        id: 'a2_6_q2',
        question: 'Un amigo tiene dolor de muelas. ¿Qué consejo le das?',
        options: [
          'You should see a dentist soon.',
          'You should to see a dentist soon.',
          'You mustn\'t see a dentist.',
          'You have see a dentist.'
        ],
        correctAnswer: 'You should see a dentist soon.',
        explanation: 'Para dar consejos usamos "should" seguido directamente del verbo en forma base sin "to".',
        hint: 'Después de "should" el verbo va sin "to".'
      },
      {
        id: 'a2_6_q3',
        type: 'word-order',
        question: 'Ordena la regla de seguridad en el avión:',
        targetText: 'Passengers must fasten their seatbelts during takeoff',
        options: [],
        correctAnswer: 'Passengers must fasten their seatbelts during takeoff',
        explanation: '"Must + verbo base" se utiliza para normas de seguridad obligatorias.',
        hint: 'Empieza con "Passengers must..."'
      }
    ]
  },
  {
    id: 'a2_7',
    day: 25,
    cefrLevel: 'A2',
    category: 'A2 • Health & Real Life',
    title: 'Health, Symptoms & At the Doctor\'s Office',
    description: 'Expresa síntomas médicos, dolores físicos, pide medicamentos en la farmacia y comprende indicaciones de salud en el extranjero.',
    grammarFocus: 'I have a headache / sore throat / fever | My back hurts | How long have you felt this way?',
    commonMistake: 'Error común: Olvidar el artículo "a" con dolores comunes. En inglés se dice "I have A headache", "I have A cold", "I have A fever".',
    strategyTip: 'Diferencia entre sustantivo ("I have a backache") y verbo ("My back hurts" = Mi espalda duele).',
    content: `🎯 OBJETIVO A2.7: COMUNICARSE EN EL MÉDICO Y LA FARMACIA

Saber explicar cómo te sientes físicamente es una habilidad vital de nivel A2 cuando viajas o vives en otro país.

1. ESTRUCTURA 1: I HAVE A + SÍNTOMA
• I have a headache. (Tengo dolor de cabeza).
• I have a stomachache. (Tengo dolor de estómago).
• I have a sore throat. (Tengo dolor de garganta).
• I have a fever / a temperature. (Tengo fiebre).
• I have a cold / the flu. (Tengo un resfriado / gripe).
• I have a cough. (Tengo tos).

2. ESTRUCTURA 2: MY [PARTE DEL CUERPO] HURTS / ACHES
• My back hurts when I sit down. (Me duele la espalda cuando me siento).
• My knees hurt after running. (Me duelen las rodillas después de correr - plural sin '-s').
• I feel dizzy and exhausted. (Me siento mareado y agotado).

3. FRASES ÚTILES EN LA FARMACIA Y CONSULTA:
• "What seems to be the problem?" (¿Cuál parece ser el problema?)
• "Take one pill every eight hours after meals." (Tome una pastilla cada 8 horas después de comer).
• "Do I need a prescription for this medicine?" (¿Necesito receta médica para este medicamento?)`,
    dialogue: [
      { speaker: 'Doctor', textEn: 'Good morning! What seems to be the problem today?', textEs: '¡Buenos días! ¿Cuál parece ser el problema hoy?' },
      { speaker: 'Patient', textEn: 'I have had a terrible sore throat and a mild fever since yesterday.', textEs: 'He tenido un fuerte dolor de garganta y fiebre leve desde ayer.' },
      { speaker: 'Doctor', textEn: 'Let me check. Do you also have a cough or a headache?', textEs: 'Déjeme revisar. ¿También tiene tos o dolor de cabeza?' },
      { speaker: 'Patient', textEn: 'Yes, my head hurts a little and I feel very tired.', textEs: 'Sí, me duele un poco la cabeza y me siento muy cansado.' },
      { speaker: 'Doctor', textEn: 'You have a throat infection. You should rest, drink plenty of water, and take these tablets twice a day.', textEs: 'Tiene una infección de garganta. Debería descansar, beber mucha agua y tomar estas pastillas dos veces al día.' }
    ],
    quiz: [
      {
        id: 'a2_7_q1',
        question: '¿Cómo explicas en el médico que te duele la garganta y tienes fiebre?',
        options: [
          'I have a sore throat and a fever.',
          'I am sore throat and fever.',
          'My throat is ache and I have hot.',
          'I have pain throat and fever.'
        ],
        correctAnswer: 'I have a sore throat and a fever.',
        explanation: 'En inglés usamos "I have a sore throat" (dolor de garganta) y "a fever" (fiebre).',
        hint: 'Usa "I have a..." para ambos síntomas.'
      },
      {
        id: 'a2_7_q2',
        question: 'Completa: My right ankle _____ because I twisted it playing football.',
        options: ['hurt', 'hurts', 'have pain', 'is ache'],
        correctAnswer: 'hurts',
        explanation: '"My right ankle" es singular (it), por lo que el verbo "hurt" lleva "-s" en presente simple ("hurts").',
        hint: 'El sujeto es singular (1 tobillo).'
      },
      {
        id: 'a2_7_q3',
        type: 'word-order',
        question: 'Ordena la pregunta en la farmacia:',
        targetText: 'Do I need a prescription for these antibiotics',
        options: [],
        correctAnswer: 'Do I need a prescription for these antibiotics',
        explanation: '"Prescription" significa receta médica, una palabra clave en situaciones de salud A2.',
        hint: 'Empieza con "Do I need a..."'
      }
    ]
  },
  {
    id: 'a2_8',
    day: 26,
    cefrLevel: 'A2',
    category: 'A2 • Career & First Conditional',
    title: 'First Conditional & Workplace Communication',
    description: 'Domina el Primer Condicional ("Si pasa X, ocurrirá Y") para negociar, planificar en el trabajo y superar entrevistas laborales.',
    grammarFocus: 'IF + Present Simple, WILL + Verbo Base (If it rains, we will stay inside)',
    commonMistake: 'Error común: Poner "will" justo después de "if". ❌ "If you will study, you will pass" -> ✅ "If you study, you will pass". En la cláusula del IF siempre va Presente Simple.',
    strategyTip: 'Piensa en el First Conditional como una promesa o consecuencia real: Condición en Presente (If...) -> Resultado en Futuro (will...).',
    content: `🎯 OBJETIVO A2.8: CAUSA Y CONSECUENCIA REAL (FIRST CONDITIONAL) Y ENTORNO LABORAL

Para cerrar el nivel A2, aprenderás a conectar condiciones y resultados futuros tanto en tu vida diaria como en el trabajo.

1. FÓRMULA DEL FIRST CONDITIONAL (100% Posible y Real)
[ IF + Sujeto + Present Simple ] , [ Sujeto + WILL / WON'T + Verbo Base ]
• If we finish the report today, we will have a free afternoon tomorrow.
  (Si terminamos el informe hoy, mañana tendremos la tarde libre).
• If you don't hurry, you will miss the train!
  (Si no te das prisa, ¡perderás el tren!).
• She will get the promotion if she passes the final interview.
  (Ella conseguirá el ascenso si aprueba la entrevista final).

⚠️ REGLA DE ORO: NUNCA pongas "will" en la mitad que lleva "IF".
• ❌ If the client will call...
• ✅ If the client calls, I will let you know.

2. EXPRESIONES CLAVE PARA ENTREVISTAS Y TRABAJO A2:
• "I am responsible for..." (Soy responsable de...)
• "I have three years of experience in customer service." (Tengo 3 años de experiencia en atención al cliente).
• "My main strength is problem-solving." (Mi principal fortaleza es la resolución de problemas).
• "Could you send me the details by email?" (¿Podría enviarme los detalles por correo?).`,
    dialogue: [
      { speaker: 'Manager', textEn: 'Marco, if the supplier delivers the materials today, will your team finish the order on Friday?', textEs: 'Marco, si el proveedor entrega los materiales hoy, ¿tu equipo terminará el pedido el viernes?' },
      { speaker: 'Marco', textEn: 'Yes! If they arrive before noon, we will complete everything on time.', textEs: '¡Sí! Si llegan antes del mediodía, completaremos todo a tiempo.' },
      { speaker: 'Manager', textEn: 'Perfect. And what will we do if there is a delay?', textEs: 'Perfecto. ¿Y qué haremos si hay un retraso?' },
      { speaker: 'Marco', textEn: 'If there is a delay, I will contact the client immediately and offer express shipping.', textEs: 'Si hay un retraso, contactaré al cliente de inmediato y le ofreceré envío exprés.' }
    ],
    quiz: [
      {
        id: 'a2_8_q1',
        question: 'Completa el Primer Condicional: If she _____ the job offer, she _____ move to Toronto.',
        options: [
          'will accept / will',
          'accepts / will',
          'accept / will',
          'accepted / would'
        ],
        correctAnswer: 'accepts / will',
        explanation: 'Después de "If" usamos Present Simple ("she accepts" con -s), y en la cláusula resultado usamos "will + verbo base".',
        hint: 'En la parte del "If" va presente simple para tercera persona (she).'
      },
      {
        id: 'a2_8_q2',
        type: 'word-order',
        question: 'Ordena la frase condicional de causa y efecto:',
        targetText: 'If you study every day you will speak fluent English',
        options: [],
        correctAnswer: 'If you study every day you will speak fluent English',
        explanation: 'Condición en presente (If you study every day) + Resultado en futuro (you will speak fluent English).',
        hint: 'Comienza con "If you study..."'
      },
      {
        id: 'a2_8_q3',
        type: 'speaking',
        question: 'Pronuncia esta frase profesional de entrevista en voz alta:',
        targetText: 'If we work together we will achieve great results',
        options: [],
        correctAnswer: 'If we work together we will achieve great results',
        explanation: '¡Excelente entonación! Has completado todos los módulos del nivel A2.'
      }
    ]
  }
];

// ============================================================================
// SPANISH CEFR A2 CURRICULUM (FOR ENGLISH SPEAKERS)
// ============================================================================

export const spanishA2Lessons: LessonStep[] = [
  {
    id: 'es_a2_1',
    day: 19,
    cefrLevel: 'A2',
    category: 'A2 • Past & Storytelling',
    title: 'Pretérito Indefinido: Completed Past Actions',
    description: 'Learn how to talk about completed actions in the past (yesterday, last week, in 2023) using regular and top irregular Spanish verbs.',
    grammarFocus: '-AR: -é, -aste, -ó, -amos, -aron | -ER/-IR: -í, -iste, -ió, -imos, -ieron | Irregulars: fui, tuve, hice',
    commonMistake: 'Don\'t forget the written accent mark (tilde) on the 1st and 3rd person singular! "Hablo" = I speak (Present), "Habló" = He/She spoke (Past).',
    strategyTip: 'Notice that "Ser" (to be) and "Ir" (to go) share the exact same conjugation in Pretérito Indefinido: fui, fuiste, fue, fuimos, fueron! Context tells you which one it is.',
    content: `🎯 CEFR A2.1 GOAL: TALKING ABOUT COMPLETED EVENTS IN THE PAST

In A2 Spanish, you unlock the past tense! The "Pretérito Indefinido" (Preterite) is used for actions that happened at a specific time and are now finished.

1. REGULAR VERB ENDINGS IN PRETÉRITO INDEFINIDO
• -AR Verbs (HABLAR - to speak):
  - Yo hablé (I spoke)
  - Tú hablaste (You spoke)
  - Él / Ella / Usted habló (He/She spoke)
  - Nosotros hablamos (We spoke)
  - Ellos / Ustedes hablaron (They spoke)

• -ER & -IR Verbs share the EXACT SAME endings (COMER / VIVIR):
  - Yo comí / viví
  - Tú comiste / viviste
  - Él / Ella comió / vivió
  - Nosotros comimos / vivimos
  - Ellos comieron / vivieron

2. THE "BIG 4" IRREGULAR PAST VERBS:
• IR (to go) & SER (to be): fui, fuiste, fue, fuimos, fueron
  - "Ayer fui al cine." (Yesterday I went to the cinema).
  - "¡La fiesta fue increíble!" (The party was incredible!).
• TENER (to have): tuve, tuviste, tuvo, tuvimos, tuvieron
• HACER (to do/make): hice, hiciste, hizo, hicimos, hicieron

3. TIME MARKERS FOR INDEFINIDO:
• Ayer (Yesterday), Anoche (Last night), La semana pasada (Last week), El año pasado (Last year), Hace dos días (Two days ago).`,
    dialogue: [
      { speaker: 'Lucía', textEn: 'Hi Mark! What did you do last night?', textEs: '¡Hola Mark! ¿Qué hiciste anoche?' },
      { speaker: 'Mark', textEn: 'Last night I went to a Mexican restaurant with my friends and ate tacos.', textEs: 'Anoche fui a un restaurante mexicano con mis amigos y comí tacos.' },
      { speaker: 'Lucía', textEn: 'How fun! Did you speak in Spanish with the waiter?', textEs: '¡Qué divertido! ¿Hablaste en español con el camarero?' },
      { speaker: 'Mark', textEn: 'Yes! I ordered everything in Spanish and it was a great experience.', textEs: '¡Sí! Pedí todo en español y fue una gran experiencia.' }
    ],
    quiz: [
      {
        id: 'es_a2_1_q1',
        question: 'How do you say "Yesterday I went to the beach with my friends" in Spanish?',
        options: [
          'Ayer voy a la playa con mis amigos.',
          'Ayer fui a la playa con mis amigos.',
          'Ayer fuiste a la playa con mis amigos.',
          'Ayer ido a la playa con mis amigos.'
        ],
        correctAnswer: 'Ayer fui a la playa con mis amigos.',
        explanation: '"Fui" is the first-person singular (Yo) preterite form of the irregular verb "ir" (to go).',
        hint: 'Yo + ir (past) = fui.'
      },
      {
        id: 'es_a2_1_q2',
        question: 'Look at the accent mark! What is the difference between "hablo" and "habló"?',
        options: [
          '"Hablo" is "I speak" (present) and "habló" is "he/she spoke" (past).',
          'They mean the exact same thing.',
          '"Hablo" is past tense and "habló" is future tense.',
          '"Habló" means "we speak".'
        ],
        correctAnswer: '"Hablo" is "I speak" (present) and "habló" is "he/she spoke" (past).',
        explanation: 'In Spanish, the accent mark on the final "-ó" changes both the stressed syllable and the grammatical tense/person!',
        hint: 'Pay attention to the stressed final -ó.'
      },
      {
        id: 'es_a2_1_q3',
        type: 'word-order',
        question: 'Put the words in order to form a past tense question:',
        targetText: 'Qué hiciste el fin de semana pasado',
        options: [],
        correctAnswer: 'Qué hiciste el fin de semana pasado',
        explanation: '"¿Qué hiciste el fin de semana pasado?" means "What did you do last weekend?".',
        hint: 'Start with "Qué hiciste..."'
      }
    ]
  },
  {
    id: 'es_a2_2',
    day: 20,
    cefrLevel: 'A2',
    category: 'A2 • Past & Storytelling',
    title: 'Pretérito Imperfecto: Past Habits & Descriptions',
    description: 'Talk about what you "used to do" in your childhood, describe people/places in the past, and set the scene in stories.',
    grammarFocus: '-AR verbs: -aba, -abas, -aba, -ábamos, -aban | -ER/-IR verbs: -ía, -ías, -ía, -íamos, -ían',
    commonMistake: 'Good news! Unlike the Preterite, the Imperfect tense has ONLY THREE irregular verbs in the entire Spanish language: SER (era), IR (iba), and VER (veía).',
    strategyTip: 'Whenever you would say "used to [do]" or "was/were [doing]" in English to describe background or habits, choose the Pretérito Imperfecto in Spanish.',
    content: `🎯 CEFR A2.2 GOAL: DESCRIBING PAST HABITS ("USED TO") & BACKGROUND SCENES

The "Pretérito Imperfecto" is the easiest and most melodic tense in Spanish. We use it for habitual actions in the past ("I used to play") and ongoing descriptions ("The house was big").

1. REGULAR ENDINGS
• -AR Verbs: Add -ABA (Jugaba, Hablaba, Caminaba)
  - Cuando era niño, jugaba al fútbol todos los días.
    (When I was a child, I used to play soccer every day).

• -ER & -IR Verbs: Add -ÍA (Comía, Vivía, Tenía)
  - Antes yo vivía en Nueva York, pero ahora vivo en Madrid.
    (Before, I used to live in New York, but now I live in Madrid).

2. THE ONLY 3 IRREGULAR VERBS IN IMPERFECTO:
• SER (to be): era, eras, era, éramos, eran ("Mi abuelo era muy amable").
• IR (to go): iba, ibas, iba, íbamos, iban ("Todos los veranos íbamos al mar").
• VER (to see/watch): veía, veías, veía, veíamos, veían ("Veía dibujos animados").

3. COMMON TRIGGERS FOR IMPERFECTO:
• Cuando era niño/a (When I was a child), Antes (Before / Back then), Siempre (Always), Todos los veranos (Every summer).`,
    dialogue: [
      { speaker: 'Mateo', textEn: 'Where did you use to live when you were a child, Sarah?', textEs: '¿Dónde vivías cuando eras niña, Sarah?' },
      { speaker: 'Sarah', textEn: 'I used to live in a small town near Chicago. My family had a house with a big garden.', textEs: 'Vivía en un pueblo pequeño cerca de Chicago. Mi familia tenía una casa con un jardín grande.' },
      { speaker: 'Mateo', textEn: 'What did you use to do in the summer?', textEs: '¿Qué hacías en el verano?' },
      { speaker: 'Sarah', textEn: 'Every summer we used to go to the lake and swim all afternoon.', textEs: 'Todos los veranos íbamos al lago y nadábamos toda la tarde.' }
    ],
    quiz: [
      {
        id: 'es_a2_2_q1',
        question: 'Complete the sentence: Cuando yo _____ niño, _____ muchos libros de aventuras.',
        options: [
          'fui / leí',
          'era / leía',
          'estaba / leo',
          'soy / leía'
        ],
        correctAnswer: 'era / leía',
        explanation: 'We use Imperfecto ("era" and "leía") because we are describing a stage of life (childhood) and a habitual action in the past.',
        hint: 'Use the Imperfect tense for childhood habits.'
      },
      {
        id: 'es_a2_2_q2',
        question: 'Which is the correct Imperfect form of "IR" (to go) for "Nosotros"?',
        options: ['fuimos', 'íbamos', 'vamos', 'iríamos'],
        correctAnswer: 'íbamos',
        explanation: '"Íbamos" means "we used to go" or "we were going" in the Imperfect tense.',
        hint: 'Ir in imperfect: iba, ibas, iba, íbamos, iban.'
      },
      {
        id: 'es_a2_2_q3',
        type: 'speaking',
        question: 'Read aloud this sentence about past habits:',
        targetText: 'Antes yo vivía en Londres pero ahora vivo en España',
        options: [],
        correctAnswer: 'Antes yo vivía en Londres pero ahora vivo en España',
        explanation: 'Great contrast between past habit (vivía) and current state (vivo)!'
      }
    ]
  },
  {
    id: 'es_a2_3',
    day: 21,
    cefrLevel: 'A2',
    category: 'A2 • Past & Storytelling',
    title: 'Masterclass: Indefinido vs. Imperfecto',
    description: 'Master the #1 A2 milestone for Spanish learners: combining background scenes (Imperfecto) with specific events (Indefinido).',
    grammarFocus: 'Imperfecto = Background / Ongoing action (llovía, dormía) | Indefinido = Interrupted event (sonó, llegó)',
    commonMistake: 'English uses "was/were" for both background descriptions and finished events ("It was raining" vs "The concert was yesterday"). In Spanish: "Llovía" (Imperfecto) vs "El concierto fue ayer" (Indefinido).',
    strategyTip: 'Think of a theater play: Imperfecto is the stage scenery and background music; Indefinido is the actor walking onto the stage and speaking.',
    content: `🎯 CEFR A2.3 GOAL: COMBINING BOTH PAST TENSES LIKE A NATIVE

Why does Spanish have two past tenses? Because together they let you paint vivid stories!

1. THE GOLDEN RULE OF STORYTELLING:
• PRETÉRITO IMPERFECTO = The Background Scene (What was happening / How things were)
• PRETÉRITO INDEFINIDO = The Main Action (What suddenly happened / Completed event)

2. REAL EXAMPLES SIDE BY SIDE:
• "Dormía tranquilamente cuando sonó el despertador."
  - Dormía (Imperfecto = I was sleeping, ongoing background)
  - Sonó (Indefinido = rang, sudden interruption)

• "Hacía mucho sol, así que decidimos ir a la playa."
  - Hacía sol (Imperfecto = weather description in the past)
  - Decidimos (Indefinido = decision/action taken)

• "Mientras caminaba por el centro, vi a mi profesor."
  - Caminaba (Imperfecto = While I was walking)
  - Vi (Indefinido = I saw)`,
    dialogue: [
      { speaker: 'Policía', textEn: 'Excuse me sir, what were you doing when the accident happened?', textEs: 'Disculpe señor, ¿qué hacía usted cuando ocurrió el accidente?' },
      { speaker: 'Testigo', textEn: 'I was waiting for the bus at the corner and it was raining a lot.', textEs: 'Yo esperaba el autobús en la esquina y llovía mucho.' },
      { speaker: 'Policía', textEn: 'And what did you see?', textEs: '¿Y qué vio exactamente?' },
      { speaker: 'Testigo', textEn: 'Suddenly, the blue car stopped fast and the motorcycle hit the back.', textEs: 'De repente, el coche azul frenó rápido y la moto chocó por detrás.' }
    ],
    quiz: [
      {
        id: 'es_a2_3_q1',
        question: 'Choose the right combination: Mientras yo _____ (cocinar) la cena, _____ (llegar) mi hermano.',
        options: [
          'cociné / llegaba',
          'cocinaba / llegó',
          'cocinaba / llegaba',
          'cocino / llegó'
        ],
        correctAnswer: 'cocinaba / llegó',
        explanation: '"Mientras cocinaba" is the ongoing action in progress (Imperfecto), and "llegó" is the single completed arrival (Indefinido).',
        hint: 'Background action = -aba; sudden arrival = -ó.'
      },
      {
        id: 'es_a2_3_q2',
        type: 'word-order',
        question: 'Order the Spanish story sentence:',
        targetText: 'Llovía mucho cuando salimos del restaurante',
        options: [],
        correctAnswer: 'Llovía mucho cuando salimos del restaurante',
        explanation: '"Llovía" sets the weather background (it was raining) and "salimos" is the completed action (we left).',
        hint: 'Start with "Llovía mucho..."'
      },
      {
        id: 'es_a2_3_q3',
        question: 'How do you say "I had a lot of work yesterday, so I didn\'t go to the party"?',
        options: [
          'Tenía mucho trabajo ayer, así que no fui a la fiesta.',
          'Tengo mucho trabajo ayer, así que no iba a la fiesta.',
          'Tuve mucho trabajo ayer, así que no era a la fiesta.',
          'Tenía mucho trabajo ayer, así que no iba a la fiesta.'
        ],
        correctAnswer: 'Tenía mucho trabajo ayer, así que no fui a la fiesta.',
        explanation: '"Tenía" describes the ongoing situation/circumstance, and "no fui" is the specific completed result.',
        hint: 'Situation = tenía; specific result = no fui.'
      }
    ]
  },
  {
    id: 'es_a2_4',
    day: 22,
    cefrLevel: 'A2',
    category: 'A2 • Comparisons & Object Pronouns',
    title: 'Comparatives & Direct Object Pronouns (Lo, La, Los, Las)',
    description: 'Compare things naturally (más... que, mejor que, tan... como) and sound fluent by avoiding repetition using Lo, La, Los, Las.',
    grammarFocus: 'más/menos [adj] que | tan [adj] como | Direct Objects: lo, la, los, las placed BEFORE the conjugated verb',
    commonMistake: 'Never say "más bueno" or "más malo" in Spanish! Just like English uses "better / worse", Spanish uses "mejor que" and "peor que".',
    strategyTip: 'In Spanish, "Lo / La" goes BEFORE the conjugated verb ("Lo compré ayer" = I bought it yesterday), whereas in English "it" goes after the verb.',
    content: `🎯 CEFR A2.4 GOAL: COMPARING & USING "LO / LA / LOS / LAS" LIKE A NATIVE

1. MAKING COMPARISONS IN SPANISH
• Superiority: MÁS + [Adjective] + QUE (More ... than)
  - El tren rápido es más cómodo que el autobús. (The fast train is more comfortable than the bus).
• Inferiority: MENOS + [Adjective] + QUE (Less ... than)
  - Este hotel es menos ruidoso que el otro.
• Equality: TAN + [Adjective] + COMO (As ... as)
  - El español es tan útil como el inglés. (Spanish is as useful as English).

• IRREGULAR COMPARATIVES:
  - Bueno -> Mejor que (Better than) -> El/La mejor (The best)
  - Malo -> Peor que (Worse than) -> El/La peor (The worst)

2. DIRECT OBJECT PRONOUNS (Avoiding Repetition: "It / Them")
Instead of repeating the noun every time, replace it with LO, LA, LOS, LAS before the verb:
• "¿Compraste el regalo?" (Did you buy the gift - masc. sing.)
  -> "Sí, LO compré esta mañana." (Yes, I bought IT this morning).
• "¿Viste las llaves?" (Did you see the keys - fem. plural)
  -> "No, no LAS vi." (No, I didn't see THEM).`,
    dialogue: [
      { speaker: 'Ana', textEn: 'Do you like this blue coat or the black one?', textEs: '¿Te gusta este abrigo azul o el negro?' },
      { speaker: 'Tom', textEn: 'I think the blue coat is prettier and warmer than the black one.', textEs: 'Creo que el abrigo azul es más bonito y más cálido que el negro.' },
      { speaker: 'Ana', textEn: 'Are you going to buy it today?', textEs: '¿Vas a comprarlo hoy?' },
      { speaker: 'Tom', textEn: 'Yes, I am going to buy it right now because it has a discount!', textEs: '¡Sí, lo voy a comprar ahora mismo porque tiene descuento!' }
    ],
    quiz: [
      {
        id: 'es_a2_4_q1',
        question: 'How do you answer "¿Tienes las entradas para el concierto?" using a direct object pronoun?',
        options: [
          'Sí, tengo las.',
          'Sí, las tengo aquí.',
          'Sí, los tengo aquí.',
          'Sí, lo tengo aquí.'
        ],
        correctAnswer: 'Sí, las tengo aquí.',
        explanation: '"Las entradas" is feminine plural, so we replace it with "las" placed directly BEFORE the conjugated verb "tengo".',
        hint: '"Las entradas" = feminine plural -> las + verb.'
      },
      {
        id: 'es_a2_4_q2',
        question: 'Complete the comparison: El café de Colombia es _____ que el café instantáneo.',
        options: ['más bueno', 'mejor', 'el más mejor', 'tan mejor'],
        correctAnswer: 'mejor',
        explanation: 'The comparative of "bueno" is irregular: "mejor" (better). Never say "más bueno".',
        hint: 'Good -> Better = Bueno -> Mejor.'
      },
      {
        id: 'es_a2_4_q3',
        type: 'word-order',
        question: 'Order the equality comparison in Spanish:',
        targetText: 'Esta ciudad es tan moderna como Madrid',
        options: [],
        correctAnswer: 'Esta ciudad es tan moderna como Madrid',
        explanation: 'We use "tan + adjective + como" to express "as [adjective] as".',
        hint: 'Use "tan moderna como".'
      }
    ]
  },
  {
    id: 'es_a2_5',
    day: 23,
    cefrLevel: 'A2',
    category: 'A2 • Future & Plans',
    title: 'Future Plans & Predictions: Ir a + Infinitivo & Futuro Simple',
    description: 'Talk about your upcoming plans ("Voy a viajar") and future predictions ("Viajaré, tendré, haré") with confidence.',
    grammarFocus: 'Near Future: Voy/Vas/Va/Vamos/Van + A + Infinitive | Simple Future: Infinitive + -é, -ás, -á, -emos, -án',
    commonMistake: 'In Futuro Simple, you do NOT remove the -AR/-ER/-IR ending! You attach the endings (-é, -ás, -á, -emos, -án) directly onto the whole infinitive (hablar -> hablaré).',
    strategyTip: 'All three verb groups (-AR, -ER, -IR) use the exact same endings in the Futuro Simple!',
    content: `🎯 CEFR A2.5 GOAL: EXPRESSING PLANS, GOALS & FUTURE PREDICTIONS

1. NEAR FUTURE: IR + A + INFINITIVE (Going to...)
Used 80% of the time in spoken Spanish for plans and intentions:
• Yo voy a estudiar español esta noche. (I am going to study Spanish tonight).
• Tú vas a tener mucho éxito. (You are going to have a lot of success).
• Nosotros vamos a viajar a Perú en agosto. (We are going to travel to Peru in August).

2. FUTURO SIMPLE (Will + Verb: Predictions & Promises)
Keep the full infinitive (-ar, -er, -ir) and add: -É, -ÁS, -Á, -EMOS, -ÁN:
• Trabajar -> Trabajaré, trabajarás, trabajará, trabajaremos, trabajarán.
• Comer -> Comeré, comerás, comerá, comeremos, comerán.
• Vivir -> Viviré, vivirás, vivirá, viviremos, vivirán.

3. TOP 4 IRREGULAR STEMS IN FUTURO SIMPLE:
• Tener -> Tendr- (Tendré tiempo mañana = I will have time tomorrow)
• Hacer -> Har- (Haré mi mejor esfuerzo = I will do my best)
• Poder -> Podr- (¿Podrás venir a la reunión? = Will you be able to come?)
• Salir -> Saldr- (Saldremos a las ocho = We will leave at 8:00)`,
    dialogue: [
      { speaker: 'Carlos', textEn: 'What are you going to do after finishing this course, Rachel?', textEs: '¿Qué vas a hacer después de terminar este curso, Rachel?' },
      { speaker: 'Rachel', textEn: 'Next month I am going to visit Mexico City for two weeks!', textEs: '¡El próximo mes voy a visitar la Ciudad de México por dos semanas!' },
      { speaker: 'Carlos', textEn: 'You will love it! Where will you stay?', textEs: '¡Te encantará! ¿Dónde te quedarás?' },
      { speaker: 'Rachel', textEn: 'I will stay in Roma Norte and I will practice Spanish every day.', textEs: 'Me quedaré en Roma Norte y practicaré español todos los días.' }
    ],
    quiz: [
      {
        id: 'es_a2_5_q1',
        question: 'Complete the future plan: Este fin de semana nosotros _____ _____ visitar el museo.',
        options: [
          'vamos a',
          'vamos',
          'iremos a',
          'van a'
        ],
        correctAnswer: 'vamos a',
        explanation: 'The structure for near future plans is "Ir (conjugado) + A + infinitivo": Nosotros vamos a visitar.',
        hint: 'Never forget the preposition "a" after "vamos".'
      },
      {
        id: 'es_a2_5_q2',
        question: 'How do you say "Tomorrow I will have more time" using the Futuro Simple?',
        options: [
          'Mañana teneré más tiempo.',
          'Mañana tendré más tiempo.',
          'Mañana tendrás más tiempo.',
          'Mañana tuve más tiempo.'
        ],
        correctAnswer: 'Mañana tendré más tiempo.',
        explanation: '"Tener" has an irregular stem in the future tense: "tendr-" + "-é" = "tendré".',
        hint: 'Tener -> tendré.'
      },
      {
        id: 'es_a2_5_q3',
        type: 'speaking',
        question: 'Speak aloud this sentence about your future plans:',
        targetText: 'El próximo año voy a viajar por toda Latinoamérica',
        options: [],
        correctAnswer: 'El próximo año voy a viajar por toda Latinoamérica',
        explanation: 'Fantastic pronunciation of "voy a viajar"!'
      }
    ]
  },
  {
    id: 'es_a2_6',
    day: 24,
    cefrLevel: 'A2',
    category: 'A2 • Experiences & Recent Past',
    title: 'Pretérito Perfecto: Life Experiences (He hablado / Has visto)',
    description: 'Use "Haber + Participio" to talk about what you have done today, this week, or in your life ("¿Alguna vez has probado la paella?").',
    grammarFocus: 'he, has, ha, hemos, han + -ado (-AR) / -ido (-ER/-IR) | Irregulars: hecho, visto, escrito, abierto, puesto',
    commonMistake: 'Never use "Tener" as the auxiliary verb for "I have eaten"! "Tener" means to possess an object. For "have + participle", always use HABER (he, has, ha, hemos, han).',
    strategyTip: 'Memorize the acronym "HVEP-A" for irregular participles: Hecho (done), Visto (seen), Escrito (written), Puesto (put), Abierto (opened).',
    content: `🎯 CEFR A2.6 GOAL: TALKING ABOUT RECENT PAST & LIFE EXPERIENCES

1. THE AUXILIARY VERB "HABER" + PAST PARTICIPLE
• Yo HE
• Tú HAS
• Él / Ella / Usted HA
• Nosotros HEMOS
• Ellos / Ustedes HAN

2. FORMING THE PAST PARTICIPLE (-ADO / -IDO):
• -AR Verbs -> -ADO: Hablar -> Hablado, Viajar -> Viajado, Probar -> Probado.
• -ER / -IR Verbs -> -IDO: Comer -> Comido, Vivir -> Vivido, Aprender -> Aprendido.

3. ESSENTIAL IRREGULAR PARTICIPLES:
• Hacer -> Hecho (¿Qué has hecho hoy? = What have you done today?)
• Ver -> Visto (No he visto esa película = I haven't seen that movie)
• Escribir -> Escrito (He escrito un correo = I have written an email)
• Decir -> Dicho (Ella me ha dicho la verdad = She has told me the truth)
• Poner -> Puesto (¿Dónde has puesto las llaves? = Where have you put the keys?)
• Abrir -> Abierto (Han abierto una cafetería nueva = They have opened a new cafe)`,
    dialogue: [
      { speaker: 'Sofía', textEn: 'Have you ever tried traditional Spanish paella, Ben?', textEs: '¿Alguna vez has probado la paella tradicional española, Ben?' },
      { speaker: 'Ben', textEn: 'Yes, I have tried it in Valencia! Have you ever been there?', textEs: '¡Sí, la he probado en Valencia! ¿Alguna vez has estado allí?' },
      { speaker: 'Sofía', textEn: 'Not yet, but this week I have bought train tickets to visit next month.', textEs: 'Todavía no, pero esta semana he comprado billetes de tren para ir el próximo mes.' }
    ],
    quiz: [
      {
        id: 'es_a2_6_q1',
        question: 'How do you say "I have spoken with the teacher today" in Spanish?',
        options: [
          'Tengo hablado con el profesor hoy.',
          'He hablado con el profesor hoy.',
          'Ha hablado con el profesor hoy.',
          'He hablar con el profesor hoy.'
        ],
        correctAnswer: 'He hablado con el profesor hoy.',
        explanation: 'We use "He" (first person of Haber) + "hablado" (past participle of hablar). Never use "tengo" as an auxiliary.',
        hint: 'Yo + haber = he.'
      },
      {
        id: 'es_a2_6_q2',
        question: 'What is the irregular past participle of "Hacer" (to do/make) and "Ver" (to see)?',
        options: [
          'hacido / vido',
          'hecho / visto',
          'hecho / veído',
          'hacido / visto'
        ],
        correctAnswer: 'hecho / visto',
        explanation: '"Hacer" -> "hecho" and "Ver" -> "visto" are two of the most frequent irregular participles in Spanish.',
        hint: 'Remember: ¿Qué has hecho? / ¿Has visto eso?'
      },
      {
        id: 'es_a2_6_q3',
        type: 'word-order',
        question: 'Order the question about life experiences:',
        targetText: 'Alguna vez has viajado a América del Sur',
        options: [],
        correctAnswer: 'Alguna vez has viajado a América del Sur',
        explanation: '"¿Alguna vez has + participio...?" is the exact equivalent of "Have you ever...?".',
        hint: 'Start with "Alguna vez has..."'
      }
    ]
  },
  {
    id: 'es_a2_7',
    day: 25,
    cefrLevel: 'A2',
    category: 'A2 • Health & Commands',
    title: 'Health, Doctor Visits & Giving Advice (Me duele / Imperativo)',
    description: 'Explain symptoms at a clinic or pharmacy using "Me duele / Me duelen" and understand medical advice in the Imperative mood.',
    grammarFocus: 'Me duele + singular noun / Me duelen + plural noun | Tener dolor de... | Affirmative commands: toma, descansa, bebe, haz',
    commonMistake: '"Doler" works just like "Gustar"! Use "Me duele la cabeza" (singular) and "Me duelen los pies" (plural). Never say "Yo duelo".',
    strategyTip: 'For regular affirmative "Tú" commands (giving advice to a friend), just use the normal Él/Ella present tense form: ¡Descansa! (Rest!), ¡Bebe agua! (Drink water!), ¡Toma esta pastilla! (Take this pill!).',
    content: `🎯 CEFR A2.7 GOAL: AT THE DOCTOR'S, SYMPTOMS & IMPERATIVE ADVICE

1. HOW TO EXPRESS PAIN: EL VERBO "DOLER" (Works like Gustar)
• Me / Te / Le + DUELE + [Singular Body Part]:
  - Me duele la cabeza. (My head hurts / I have a headache).
  - Me duele la garganta. (My throat hurts).
  - ¿Te duele el estómago? (Does your stomach hurt?).
• Me / Te / Le + DUELEN + [Plural Body Parts]:
  - Me duelen las muelas. (My teeth hurt).
  - Me duelen las piernas después de correr. (My legs hurt after running).

2. OTHER SYMPTOMS WITH "TENER" & "ESTAR":
• Tengo fiebre / Tengo tos / Tengo gripe. (I have a fever / cough / flu).
• Estoy mareado/a (I feel dizzy) | Estoy resfriado/a (I have a cold).

3. GIVING ADVICE WITH THE AFFIRMATIVE IMPERATIVE (TÚ):
• Regular verbs (= 3rd person present):
  - Tomar -> ¡Toma este jarabe! (Take this syrup!)
  - Descansar -> ¡Descansa dos días! (Rest for two days!)
  - Beber -> ¡Bebe mucha agua! (Drink plenty of water!)
• Short Irregular Commands:
  - Hacer -> ¡Haz ejercicio! (Do exercise!)
  - Ir -> ¡Ve al médico! (Go to the doctor!)
  - Tener -> ¡Ten cuidado! (Be careful!)`,
    dialogue: [
      { speaker: 'Doctora', textEn: 'Hello David, how do you feel today?', textEs: 'Hola David, ¿cómo te sientes hoy?' },
      { speaker: 'David', textEn: 'I don\'t feel well. My throat hurts a lot and I have had a fever since last night.', textEs: 'No me siento bien. Me duele mucho la garganta y tengo fiebre desde anoche.' },
      { speaker: 'Doctora', textEn: 'Open your mouth, please. Yes, your throat is inflamed.', textEs: 'Abre la boca, por favor. Sí, tienes la garganta inflamada.' },
      { speaker: 'Doctora', textEn: 'Rest at home today, drink warm tea with honey, and take one tablet every 8 hours.', textEs: 'Descansa en casa hoy, bebe té caliente con miel y toma una pastilla cada ocho horas.' }
    ],
    quiz: [
      {
        id: 'es_a2_7_q1',
        question: 'Choose the right form: Después de caminar todo el día, me _____ mucho los pies.',
        options: ['duele', 'duelen', 'duelo', 'dolor'],
        correctAnswer: 'duelen',
        explanation: 'Because "los pies" (the feet) is plural, the verb "doler" must be plural: "me duelen los pies".',
        hint: '"Los pies" is plural!'
      },
      {
        id: 'es_a2_7_q2',
        question: 'Your friend is sick. How do you tell them "Go to the doctor and rest!" using informal commands (Tú)?',
        options: [
          '¡Vas al médico y descansas!',
          '¡Ve al médico y descansa!',
          '¡Ir al médico y descansar!',
          '¡Fue al médico y descansó!'
        ],
        correctAnswer: '¡Ve al médico y descansa!',
        explanation: 'The informal imperative of "ir" is "ve", and for "descansar" it is "descansa".',
        hint: 'Ir -> ¡Ve! | Descansar -> ¡Descansa!'
      },
      {
        id: 'es_a2_7_q3',
        type: 'word-order',
        question: 'Order the sentence at the pharmacy:',
        targetText: 'Me duele la cabeza y necesito algo para la fiebre',
        options: [],
        correctAnswer: 'Me duele la cabeza y necesito algo para la fiebre',
        explanation: 'Essential A2 medical phrase combining "Me duele la cabeza" with a pharmacy request.',
        hint: 'Start with "Me duele la cabeza..."'
      }
    ]
  },
  {
    id: 'es_a2_8',
    day: 26,
    cefrLevel: 'A2',
    category: 'A2 • Work & Por vs. Para',
    title: 'Workplace Spanish & Mastering POR vs. PARA',
    description: 'Solve the classic Spanish challenge: learn when to use POR (cause, duration, medium, exchange) vs. PARA (goal, recipient, deadline, destination).',
    grammarFocus: 'PARA = Destination / Goal / Recipient / Deadline | POR = Cause / Duration / Exchange (Price) / Means of communication',
    commonMistake: 'English uses "for" for both price and recipient ("I bought it for $20 for my mom"). In Spanish: "Lo compré POR 20 dólares PARA mi mamá."',
    strategyTip: 'Visualize an arrow: POR looks backward at the CAUSE or engine pushing the action; PARA points forward to the GOAL, destination, or deadline.',
    content: `🎯 CEFR A2.8 GOAL: SOLVING "POR VS. PARA" & PROFESSIONAL COMMUNICATION

English speakers often translate both "por" and "para" as "for". Here is the crystal-clear mental model to never confuse them again:

1. USE "PARA" WHEN LOOKING FORWARD TO A GOAL OR DESTINATION (->)
• Purpose / Goal ("In order to" + Infinitive):
  - Estudio español PARA trabajar en Madrid. (I study Spanish in order to work in Madrid).
• Recipient (Who receives it):
  - Este regalo es PARA ti. (This gift is for you).
• Destination:
  - El vuelo sale PARA Bogotá a las tres. (The flight leaves for Bogotá at 3:00).
• Deadline (By a specific date):
  - Necesito el informe PARA el viernes. (I need the report by/for Friday).

2. USE "POR" FOR CAUSE, EXCHANGE, DURATION & MEDIUM (<->)
• Cause / Reason / Motive ("Because of"):
  - Gracias POR tu ayuda. (Thanks for your help).
• Price / Exchange (Money):
  - Pagué 50 euros POR esta chaqueta. (I paid 50 euros for this jacket).
• Duration of time:
  - Viví en Buenos Aires POR dos años. (I lived in Buenos Aires for two years).
• Means of communication / transportation:
  - Te envío el contrato POR correo electrónico. (I'll send you the contract by email).`,
    dialogue: [
      { speaker: 'Jefa', textEn: 'Hi Alex! Thank you for finishing the presentation. Is it ready for tomorrow\'s meeting?', textEs: '¡Hola Alex! Gracias por terminar la presentación. ¿Está lista para la reunión de mañana?' },
      { speaker: 'Alex', textEn: 'Yes! I worked on it for three hours this morning and sent it by email.', textEs: '¡Sí! Trabajé en ella por tres horas esta mañana y la envié por correo electrónico.' },
      { speaker: 'Jefa', textEn: 'Excellent. This project is very important for our new clients in Chile.', textEs: 'Excelente. Este proyecto es muy importante para nuestros nuevos clientes en Chile.' }
    ],
    quiz: [
      {
        id: 'es_a2_8_q1',
        question: 'Fill in the blanks: Compré este libro _____ 15 euros _____ mi hermana.',
        options: [
          'para / por',
          'por / para',
          'por / por',
          'para / para'
        ],
        correctAnswer: 'por / para',
        explanation: 'We use "POR" for money/exchange (por 15 euros) and "PARA" for the recipient of something (para mi hermana).',
        hint: 'Money exchange = por; Recipient = para.'
      },
      {
        id: 'es_a2_8_q2',
        question: 'Complete: Necesito terminar este informe _____ el lunes, así que te llamo _____ teléfono más tarde.',
        options: [
          'por / para',
          'para / por',
          'para / para',
          'por / por'
        ],
        correctAnswer: 'para / por',
        explanation: 'Deadlines take "PARA" (para el lunes = by Monday), while means of communication take "POR" (por teléfono = by phone).',
        hint: 'Deadline = para; Communication medium = por.'
      },
      {
        id: 'es_a2_8_q3',
        type: 'speaking',
        question: 'Pronounce this complete A2 sentence using both por and para:',
        targetText: 'Muchas gracias por tu ayuda con el informe para el cliente',
        options: [],
        correctAnswer: 'Muchas gracias por tu ayuda con el informe para el cliente',
        explanation: 'Awesome job! You have mastered all 8 lessons of Spanish CEFR A2!'
      }
    ]
  }
];

// ============================================================================
// A2 FAST-TRACK VOCABULARY (ENGLISH & SPANISH)
// ============================================================================

export const a2EnglishVocab: VocabWord[] = [
  { id: 'v_a2_1', word: 'Appointment', translation: 'Cita (médica / profesional)', example: 'I have a dentist appointment at 4 PM.', category: 'A2 • Salud y Trabajo', phonetic: '/əˈpɔɪntmənt/', cefrLevel: 'A2' },
  { id: 'v_a2_2', word: 'Luggage', translation: 'Equipaje', example: 'Did you check your luggage at the airport?', category: 'A2 • Viajes', phonetic: '/ˈlʌɡɪdʒ/', cefrLevel: 'A2' },
  { id: 'v_a2_3', word: 'Prescription', translation: 'Receta médica', example: 'The doctor gave me a prescription for antibiotics.', category: 'A2 • Salud y Trabajo', phonetic: '/prɪˈskrɪpʃən/', cefrLevel: 'A2' },
  { id: 'v_a2_4', word: 'Experience', translation: 'Experiencia', example: 'Have you ever had an experience like that?', category: 'A2 • Experiencias', phonetic: '/ɪkˈspɪəriəns/', cefrLevel: 'A2' },
  { id: 'v_a2_5', word: 'Neighborhood', translation: 'Vecindario / Barrio', example: 'Our new neighborhood is quieter than the center.', category: 'A2 • Vida Cotidiana', phonetic: '/ˈneɪbərhʊd/', cefrLevel: 'A2' },
  { id: 'v_a2_6', word: 'Delay', translation: 'Retraso / Demora', example: 'If there is a flight delay, I will call you.', category: 'A2 • Viajes', phonetic: '/dɪˈleɪ/', cefrLevel: 'A2' },
  { id: 'v_a2_7', word: 'Salary', translation: 'Salario / Sueldo', example: 'The new job offers a better salary and benefits.', category: 'A2 • Salud y Trabajo', phonetic: '/ˈsæləri/', cefrLevel: 'A2' },
  { id: 'v_a2_8', word: 'Comfortable', translation: 'Cómodo/a', example: 'This train seat is more comfortable than the bus.', category: 'A2 • Descripciones', phonetic: '/ˈkʌmftəbəl/', cefrLevel: 'A2' },
  { id: 'v_a2_9', word: 'Headache', translation: 'Dolor de cabeza', example: 'I have a terrible headache, I should rest.', category: 'A2 • Salud y Trabajo', phonetic: '/ˈhedeɪk/', cefrLevel: 'A2' },
  { id: 'v_a2_10', word: 'Achievement', translation: 'Logro / Meta cumplida', example: 'Speaking fluent A2 English is a great achievement.', category: 'A2 • Experiencias', phonetic: '/əˈtʃiːvmənt/', cefrLevel: 'A2' },
  { id: 'v_a2_11', word: 'Crowded', translation: 'Lleno de gente / Concurrido', example: 'The subway was very crowded when I went home.', category: 'A2 • Descripciones', phonetic: '/ˈkraʊdɪd/', cefrLevel: 'A2' },
  { id: 'v_a2_12', word: 'Schedule', translation: 'Horario / Agenda', example: 'We have to check the schedule before booking.', category: 'A2 • Salud y Trabajo', phonetic: '/ˈskedʒuːl/', cefrLevel: 'A2' }
];

export const spanishA2Vocab: VocabWord[] = [
  { id: 'es_v_a2_1', word: 'La cita médica', translation: 'Doctor\'s appointment', example: 'Ayer tuve una cita médica por la mañana.', category: 'A2 • Health & Work', phonetic: 'lah SEE-tah MEH-dee-kah', cefrLevel: 'A2' },
  { id: 'es_v_a2_2', word: 'El equipaje', translation: 'Luggage / Baggage', example: 'Ya he facturado todo mi equipaje en el aeropuerto.', category: 'A2 • Travel', phonetic: 'ehl eh-kee-PAH-heh', cefrLevel: 'A2' },
  { id: 'es_v_a2_3', word: 'La receta', translation: 'Prescription / Recipe', example: 'Necesitas una receta del médico para este medicamento.', category: 'A2 • Health & Work', phonetic: 'lah reh-SEH-tah', cefrLevel: 'A2' },
  { id: 'es_v_a2_4', word: 'El barrio', translation: 'Neighborhood', example: 'Antes vivía en un barrio más tranquilo que este.', category: 'A2 • Daily Life', phonetic: 'ehl BAH-rryoh', cefrLevel: 'A2' },
  { id: 'es_v_a2_5', word: 'El retraso', translation: 'Delay', example: 'El tren llegó tarde por un retraso en la vía.', category: 'A2 • Travel', phonetic: 'ehl reh-TRAH-soh', cefrLevel: 'A2' },
  { id: 'es_v_a2_6', word: 'El sueldo', translation: 'Salary / Wage', example: 'Este puesto ofrece mejor sueldo y horario flexible.', category: 'A2 • Health & Work', phonetic: 'ehl SWEHL-doh', cefrLevel: 'A2' },
  { id: 'es_v_a2_7', word: 'La garganta', translation: 'Throat', example: 'Me duele mucho la garganta cuando hablo.', category: 'A2 • Health & Work', phonetic: 'lah gahr-GAHN-tah', cefrLevel: 'A2' },
  { id: 'es_v_a2_8', word: 'El alquiler', translation: 'Rent', example: 'Pagué el alquiler del apartamento por transferencia.', category: 'A2 • Daily Life', phonetic: 'ehl ahl-kee-LEHR', cefrLevel: 'A2' },
  { id: 'es_a2_v_9', word: 'Inolvidable', translation: 'Unforgettable', example: 'Nuestro viaje por el sur de España fue inolvidable.', category: 'A2 • Experiences', phonetic: 'een-ohl-bee-DAH-bleh', cefrLevel: 'A2' },
  { id: 'es_a2_v_10', word: 'La entrevista', translation: 'Interview', example: 'Mañana voy a tener una entrevista de trabajo importante.', category: 'A2 • Health & Work', phonetic: 'lah ehn-treh-BEES-tah', cefrLevel: 'A2' },
  { id: 'es_a2_v_11', word: 'El billete de ida y vuelta', translation: 'Round-trip ticket', example: 'Compré un billete de ida y vuelta para Sevilla.', category: 'A2 • Travel', phonetic: 'bee-YEH-teh deh EE-dah ee BWEHL-tah', cefrLevel: 'A2' },
  { id: 'es_a2_v_12', word: 'Acostumbrarse', translation: 'To get used to', example: 'Ya me he acostumbrado al horario de España.', category: 'A2 • Experiences', phonetic: 'ah-kohs-toom-BRAHR-seh', cefrLevel: 'A2' }
];

// ============================================================================
// CEFR A2 CERTIFICATION EXAM QUESTIONS (ENGLISH & SPANISH)
// ============================================================================

export const a2FinalExamQuestions: ExamQuestion[] = [
  {
    id: 'ex_a2_1',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Past Simple & Irregulars',
    question: 'Choose the correct sentence in Past Simple:',
    options: [
      'Did you went to the meeting yesterday morning?',
      'Did you go to the meeting yesterday morning?',
      'Were you go to the meeting yesterday morning?',
      'Have you went to the meeting yesterday?'
    ],
    correctAnswer: 'Did you go to the meeting yesterday morning?',
    explanation: 'En preguntas con el auxiliar "Did", el verbo principal siempre va en su forma base ("go").'
  },
  {
    id: 'ex_a2_2',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Past Continuous vs. Past Simple',
    question: 'While I _____ dinner last night, my friend _____ me on the phone.',
    options: [
      'cooked / was calling',
      'was cooking / called',
      'were cooking / called',
      'have cooked / call'
    ],
    correctAnswer: 'was cooking / called',
    explanation: 'La acción en progreso después de "While" usa Past Continuous (was cooking) y la interrupción usa Past Simple (called).'
  },
  {
    id: 'ex_a2_3',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Comparatives & Superlatives',
    question: 'This hotel is _____ than the hostel, and it has _____ view in town.',
    options: [
      'more comfortable / the best',
      'comfortabler / the better',
      'most comfortable / the goodest',
      'more comfortable / better'
    ],
    correctAnswer: 'more comfortable / the best',
    explanation: '"Comfortable" es un adjetivo largo (more comfortable than) y el superlativo de "good" es "the best".'
  },
  {
    id: 'ex_a2_4',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Future Plans vs. Spontaneous Decisions',
    question: 'Look at the dark sky! It _____ rain very soon.',
    options: [
      'is going to',
      'going to',
      'will to',
      'has to'
    ],
    correctAnswer: 'is going to',
    explanation: 'Cuando hay evidencia física evidente en el presente (nubes oscuras), usamos "is going to".'
  },
  {
    id: 'ex_a2_5',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Present Perfect Experiences',
    question: 'Have you _____ _____ to Japan? — No, I have _____ been to Asia.',
    options: [
      'ever been / never',
      'ever went / never',
      'already be / yet',
      'never been / ever'
    ],
    correctAnswer: 'ever been / never',
    explanation: '"Have you ever been..." pregunta por experiencias en la vida, y "never" responde negativamente con verbo en positivo.'
  },
  {
    id: 'ex_a2_6',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Modals: Mustn\'t vs. Don\'t have to',
    question: 'The entrance is free today, so you _____ pay anything!',
    options: [
      'mustn\'t',
      'don\'t have to',
      'shouldn\'t to',
      'haven\'t to'
    ],
    correctAnswer: 'don\'t have to',
    explanation: '"Don\'t have to" significa que no es necesario hacer algo.'
  },
  {
    id: 'ex_a2_7',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Health & Medical Vocabulary',
    question: 'I can\'t speak very well today because I have a terrible _____.',
    options: [
      'sore throat',
      'pain neck',
      'stomach hurt',
      'ankle ache'
    ],
    correctAnswer: 'sore throat',
    explanation: '"Sore throat" significa dolor o inflamación de garganta.'
  },
  {
    id: 'ex_a2_8',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • First Conditional',
    question: 'If we _____ the train at 8:00 AM, we _____ arrive in London before noon.',
    options: [
      'will take / will',
      'take / will',
      'took / will',
      'takes / would'
    ],
    correctAnswer: 'take / will',
    explanation: 'En el First Conditional, la condición con "If" lleva Present Simple (take) y el resultado lleva "will + verbo".'
  }
];

export const spanishA2FinalExamQuestions: ExamQuestion[] = [
  {
    id: 'es_ex_a2_1',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Pretérito Indefinido',
    question: 'Complete the sentence in the past: El verano pasado nosotros _____ a Cuzco y _____ Machu Picchu.',
    options: [
      'fuimos / visitamos',
      'íbamos / visitábamos',
      'vamos / visitamos',
      'hemos ido / visitar'
    ],
    correctAnswer: 'fuimos / visitamos',
    explanation: 'For completed actions in a finished time frame ("el verano pasado"), we use Pretérito Indefinido: fuimos y visitamos.'
  },
  {
    id: 'es_ex_a2_2',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Indefinido vs. Imperfecto',
    question: 'Mientras yo _____ por el parque ayer, _____ a llover.',
    options: [
      'caminé / empezaba',
      'caminaba / empezó',
      'caminaba / empezaba',
      'camino / empezó'
    ],
    correctAnswer: 'caminaba / empezó',
    explanation: '"Caminaba" (Imperfecto) sets the ongoing action in progress, and "empezó" (Indefinido) is the sudden event that interrupted it.'
  },
  {
    id: 'es_ex_a2_3',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Comparatives & Object Pronouns',
    question: '— ¿Compraste las flores para tu madre? — Sí, _____ compré esta mañana.',
    options: [
      'los',
      'las',
      'la',
      'le'
    ],
    correctAnswer: 'las',
    explanation: '"Las flores" is feminine plural, so the direct object pronoun that replaces it before the verb is "las".'
  },
  {
    id: 'es_ex_a2_4',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Futuro Simple & Ir a + Infinitivo',
    question: 'Mañana no _____ ir a la fiesta porque _____ que trabajar temprano.',
    options: [
      'podré / tendré',
      'poderé / teneré',
      'puedo / tuve',
      'podría / tenía'
    ],
    correctAnswer: 'podré / tendré',
    explanation: '"Poder" and "Tener" have irregular future stems: podr- (podré) and tendr- (tendré).'
  },
  {
    id: 'es_ex_a2_5',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Pretérito Perfecto',
    question: '¿Qué _____ _____ ustedes esta mañana en la oficina?',
    options: [
      'han hecho',
      'tienen hecho',
      'han hacido',
      'hemos hecho'
    ],
    correctAnswer: 'han hecho',
    explanation: 'For "ustedes", the auxiliary verb Haber is "han", and the irregular past participle of hacer is "hecho".'
  },
  {
    id: 'es_ex_a2_6',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Health & Doler',
    question: 'No puedo caminar rápido hoy porque me _____ mucho las rodillas.',
    options: [
      'duele',
      'duelen',
      'duelo',
      'dolores'
    ],
    correctAnswer: 'duelen',
    explanation: '"Las rodillas" is plural, so we use the plural form "duelen" (me duelen las rodillas).'
  },
  {
    id: 'es_ex_a2_7',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Imperative Advice',
    question: 'Si tienes fiebre y gripe, ¡_____ en cama y _____ mucha agua!',
    options: [
      'descansa / bebe',
      'descansas / bebes',
      'descansar / beber',
      'descanse / beban'
    ],
    correctAnswer: 'descansa / bebe',
    explanation: 'The informal affirmative imperative (tú) uses the third-person singular present form: ¡descansa! and ¡bebe!'
  },
  {
    id: 'es_ex_a2_8',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Por vs. Para',
    question: 'Pagué cien dólares _____ este boleto de avión que sale mañana _____ Buenos Aires.',
    options: [
      'para / por',
      'por / para',
      'por / por',
      'para / para'
    ],
    correctAnswer: 'por / para',
    explanation: 'We use "POR" for financial exchange/price (por cien dólares) and "PARA" for destination (para Buenos Aires).'
  }
];
