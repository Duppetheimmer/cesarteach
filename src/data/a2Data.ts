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
        explanation: '¡Excelente entonación! Sigamos profundizando en las estructuras clave de A2.'
      }
    ]
  },
  {
    id: 'a2_9',
    day: 27,
    cefrLevel: 'A2',
    category: 'A2 • Patrones Verbales',
    title: 'Gerunds (-ING) vs. Infinitives (To + Verb)',
    description: 'Descubre por qué decimos "I enjoy reading" pero "I decided to read", y cómo cambia el significado en verbos como Stop y Remember.',
    grammarFocus: 'Verbos + -ING (enjoy, avoid, mind, finish, suggest) vs. Verbos + TO + Infinitivo (want, decide, hope, plan, promise)',
    commonMistake: 'En español siempre usamos el infinitivo ("Disfruto leer" / "Terminé de comer"). En inglés es INCORRECTO decir "I enjoy to read" o "I finished to eat": debe ser "I enjoy reading" y "I finished eating".',
    strategyTip: 'Truco mental: Los verbos que miran hacia el FUTURO (want, hope, decide, plan, promise) llevan TO + Verbo. Los verbos que expresan disfrute, hábito o fin de una experiencia (enjoy, finish, avoid, mind) llevan -ING.',
    content: `🎯 OBJETIVO CEFR A2.9: DOMINAR CUÁNDO USAR "-ING" Y CUÁNDO USAR "TO + VERBO"

Cuando juntas dos verbos seguidos en inglés, el primer verbo dicta la forma del segundo. Dominar este patrón hace que tu inglés suene inmediatamente natural.

1. VERBOS QUE SIEMPRE EXIGEN "-ING" (GERUND)
Memoriza el grupo "EFAMS":
• Enjoy (Disfrutar): "I enjoy cooking on weekends." (Disfruto cocinar los fines de semana).
• Finish (Terminar): "Have you finished reading the report?" (¿Terminaste de leer el informe?).
• Avoid (Evitar): "You should avoid driving in heavy rain." (Deberías evitar conducir bajo lluvia fuerte).
• Mind (Importar / Molestar): "Would you mind opening the window?" (¿Te importaría abrir la ventana?).
• Suggest / Recommend (Sugerir): "She suggested taking a taxi." (Ella sugirió tomar un taxi).
• + Después de CUALQUIER preposición (in, on, at, for, about, without, before, after):
  - "Thank you FOR helping me."
  - "She left WITHOUT saying goodbye."

2. VERBOS QUE SIEMPRE EXIGEN "TO + VERBO" (INFINITIVE)
• Decide (Decidir): "We decided to move to a bigger apartment."
• Plan / Hope / Expect (Planear / Esperar): "I hope to see you soon."
• Promise / Offer / Refuse (Prometer / Ofrecer / Negarse): "He promised to call me at 5 PM."
• Need / Want / Would like: "I would like to book a table for two."

3. ¡CUIDADO! VERBOS QUE CAMBIAN DE SIGNIFICADO:
• STOP + -ING = Dejar un hábito o interrumpir lo que hacías:
  - "He stopped smoking two years ago." (Dejó de fumar).
• STOP + TO + VERB = Detener la marcha para hacer otra cosa:
  - "We stopped to buy some water." (Nos detuvimos para comprar agua).`,
    dialogue: [
      { speaker: ' Clara', textEn: 'Have you finished preparing your suitcase for the trip?', textEs: '¿Has terminado de preparar tu maleta para el viaje?' },
      { speaker: 'Daniel', textEn: 'Almost! I decided to pack light because I want to avoid paying extra luggage fees.', textEs: '¡Casi! Decidí empacar ligero porque quiero evitar pagar cargos extra de equipaje.' },
      { speaker: 'Clara', textEn: 'Smart move! Would you mind sharing a taxi to the airport tomorrow morning?', textEs: '¡Buena jugada! ¿Te importaría compartir un taxi al aeropuerto mañana por la mañana?' },
      { speaker: 'Daniel', textEn: 'Not at all! I promise to be ready by 6:00 AM.', textEs: '¡Para nada! Prometo estar listo a las 6:00 AM.' }
    ],
    quiz: [
      {
        id: 'a2_9_q1',
        question: 'Elige la combinación correcta: She really enjoys _____ languages, so she decided _____ a course in London.',
        options: [
          'to learn / taking',
          'learning / to take',
          'learning / taking',
          'learn / to take'
        ],
        correctAnswer: 'learning / to take',
        explanation: '"Enjoy" exige siempre verbo con -ING ("enjoy learning"), mientras que "Decide" exige TO + Infinitivo ("decided to take").',
        hint: 'Enjoy + -ing | Decide + to...'
      },
      {
        id: 'a2_9_q2',
        question: 'Completa la regla de las preposiciones: He left the restaurant without _____ the bill.',
        options: ['pay', 'to pay', 'paying', 'paid'],
        correctAnswer: 'paying',
        explanation: 'Después de cualquier preposición en inglés (without, before, after, for, about), el verbo SIEMPRE va en -ING ("without paying").',
        hint: 'Without es preposición -> verbo con -ing.'
      },
      {
        id: 'a2_9_q3',
        type: 'word-order',
        question: 'Ordena esta pregunta cortés muy común en nivel A2:',
        targetText: 'Would you mind closing the door please',
        options: [],
        correctAnswer: 'Would you mind closing the door please',
        explanation: '"Would you mind + verbo-ING" es la forma más educada de pedir un favor en inglés.',
        hint: 'Comienza con "Would you mind closing..."'
      }
    ]
  },
  {
    id: 'a2_10',
    day: 28,
    cefrLevel: 'A2',
    category: 'A2 • Precisión Gramatical',
    title: 'Quantifiers: Much, Many, A Few, A Little, Too & Enough',
    description: 'Domina los sustantivos contables e incontables y expresa cantidades exactas o excesivas sin cometer errores.',
    grammarFocus: 'Countable (many / a few / few) vs. Uncountable (much / a little / little) | Too + adj vs. Adj + enough',
    commonMistake: 'Palabras como "Information", "Advice", "Furniture", "Luggage" y "Traffic" son INCONTABLES en inglés. ¡Nunca digas "an advice" o "many informations"! Di "some advice" o "a piece of advice".',
    strategyTip: 'Presta atención a la letra "A": "A few / A little" es POSITIVO (unos cuantos / un poco, alcanza). "Few / Little" sin "a" es NEGATIVO (casi nada / muy pocos, no alcanza).',
    content: `🎯 OBJETIVO CEFR A2.10: EXPRESAR CANTIDAD Y SUFICIENCIA CON PRECISIÓN

1. SUSTANTIVOS CONTABLES VS. INCONTABLES TRAMPOSOS
• Contables (se pueden contar: 1 chair, 2 chairs):
  - Usan: MANY (muchos), A FEW (unos pocos), FEW (casi ninguno).
• Incontables (líquidos, conceptos o masas que no tienen plural):
  - Money, Time, Water, Traffic, Information, Advice (consejo), Luggage (equipaje), Homework, News.
  - Usan: MUCH (mucho), A LITTLE (un poco), LITTLE (casi nada).

2. LA DIFERENCIA ENTRE "A LITTLE" Y "LITTLE" (O "A FEW" Y "FEW")
• "I have A LITTLE money, let's buy coffee!" (Tengo algo de dinero — sentido positivo 😊).
• "I have LITTLE money, I can't buy coffee." (Tengo muy poco dinero — sentido negativo 😟).
• "I have A FEW good friends in this city." (Tengo algunos buenos amigos 😊).
• "Very FEW people passed the test." (Muy pocas personas aprobaron 😟).

3. TOO, TOO MUCH, TOO MANY & ENOUGH
• TOO + Adjetivo (Demasiado...): "This soup is too hot."
• TOO MUCH + Incontable: "There is too much traffic today."
• TOO MANY + Contable plural: "There are too many cars."
• Adjetivo + ENOUGH (Suficientemente...): "Is the water warm enough?" (¡Enough va DESPUÉS del adjetivo!)
• ENOUGH + Sustantivo (Suficiente...): "We have enough time." (¡Enough va ANTES del sustantivo!)`,
    dialogue: [
      { speaker: 'Lucas', textEn: 'Can you give me some advice before my trip to Chicago?', textEs: '¿Puedes darme algún consejo antes de mi viaje a Chicago?' },
      { speaker: 'Emma', textEn: 'Sure! Don\'t take too much luggage, and leave early because there is always a lot of traffic.', textEs: '¡Claro! No lleves demasiado equipaje y sal temprano porque siempre hay mucho tráfico.' },
      { speaker: 'Lucas', textEn: 'Do I have enough time to visit the art museum if I only stay for a few days?', textEs: '¿Tengo suficiente tiempo para visitar el museo de arte si solo me quedo unos pocos días?' },
      { speaker: 'Emma', textEn: 'Yes! A few hours in the morning is warm and quiet enough to see the best galleries.', textEs: '¡Sí! Unas cuantas horas por la mañana es suficientemente tranquilo para ver las mejores galerías.' }
    ],
    quiz: [
      {
        id: 'a2_10_q1',
        question: 'Cuidado con los incontables en inglés: Can you give me _____ before the interview?',
        options: [
          'an advice',
          'some advices',
          'some advice',
          'many advice'
        ],
        correctAnswer: 'some advice',
        explanation: '"Advice" (consejo) e "Information" son sustantivos incontables en inglés: nunca llevan "an" ni plural "-s". Se usa "some advice" o "a piece of advice".',
        hint: 'Advice es incontable en inglés.'
      },
      {
        id: 'a2_10_q2',
        question: 'Elige la posición correcta de "enough": This apartment isn\'t _____ for our family.',
        options: [
          'enough big',
          'big enough',
          'too big enough',
          'many big'
        ],
        correctAnswer: 'big enough',
        explanation: '"Enough" se coloca SIEMPRE DESPUÉS de los adjetivos (big enough, old enough, warm enough) y ANTES de los sustantivos (enough money).',
        hint: 'Adjetivo + enough.'
      },
      {
        id: 'a2_10_q3',
        question: 'Completa: We only have _____ minutes left before the train leaves, so hurry up!',
        options: ['a little', 'a few', 'much', 'too much'],
        correctAnswer: 'a few',
        explanation: '"Minutes" es contable plural, por lo que usamos "a few minutes" (unos pocos minutos).',
        hint: 'Minutes es contable plural.'
      }
    ]
  },
  {
    id: 'a2_11',
    day: 29,
    cefrLevel: 'A2',
    category: 'A2 • Hábitos y Adaptación',
    title: 'Past Habits & Adaptation: Used to vs. Be/Get Used to',
    description: 'Habla de lo que solías hacer antes ("I used to live...") y diferéncialo de acostumbrarse a algo nuevo ("I am getting used to living...").',
    grammarFocus: 'Used to + Infinitive (solía) | Didn\'t use to | Be/Get used to + Noun/-ING (estar/acostumbrarse a)',
    commonMistake: 'En preguntas y negativas con "Did", "used to" pierde la "-d": escribe "Did you use to play?" y "I didn\'t use to like it" (NO "didn\'t used to").',
    strategyTip: 'No confundas: "I used to wake up early" (Antes solía despertarme temprano, ya no) vs. "I am used to waking up early" (Estoy acostumbrado a despertarme temprano hoy en día).',
    content: `🎯 OBJETIVO CEFR A2.11: DOMINAR "USED TO" (SOLÍA) VS. "GET USED TO" (ACOSTUMBRARSE)

Esta es una de las estructuras más útiles del inglés real para comparar tu vida pasada con tu vida actual.

1. "USED TO + VERBO BASE" (Hábitos o estados del pasado que ya cambiaron)
Equivale a "Solía..." o al Pretérito Imperfecto en español (jugaba, vivía, tenía):
• Afirmativa: "I used to live in a small town, but now I live in Madrid." (Antes vivía en un pueblo pequeño).
• Negativa (DIDN'T USE TO): "She didn't use to drink coffee, but now she loves it." (Ella no solía tomar café).
• Pregunta (DID YOU USE TO...?): "Where did you use to go on vacation as a child?"

2. "BE USED TO + SUSTANTIVO / -ING" (Estar acostumbrado a algo)
Aquí "used" funciona como adjetivo ("acostumbrado") y "to" es una preposición:
• "I am used to cold weather." (Estoy acostumbrado al clima frío).
• "He is used to speaking in public." (Él está acostumbrado a hablar en público — nota el -ING).

3. "GET USED TO + SUSTANTIVO / -ING" (El proceso de acostumbrarse)
• "It took me three months to get used to driving on the left." (Me tomó tres meses acostumbrarme a conducir por la izquierda).`,
    dialogue: [
      { speaker: 'Sofía', textEn: 'How is your new life in London, David? Did you use to live in a big city before?', textEs: '¿Cómo va tu nueva vida en Londres, David? ¿Solías vivir en una gran ciudad antes?' },
      { speaker: 'David', textEn: 'No, I didn\'t use to take the subway at all! I used to walk everywhere in my hometown.', textEs: '¡No, no solía tomar el metro para nada! Solía caminar a todas partes en mi ciudad natal.' },
      { speaker: 'Sofía', textEn: 'And are you getting used to the rainy weather?', textEs: '¿Y te estás acostumbrando al clima lluvioso?' },
      { speaker: 'David', textEn: 'Yes, I am slowly getting used to carrying an umbrella every day!', textEs: '¡Sí, poco a poco me estoy acostumbrando a llevar un paraguas todos los días!' }
    ],
    quiz: [
      {
        id: 'a2_11_q1',
        question: 'Elige la forma negativa correcta de un hábito pasado: I _____ like vegetables when I was a child.',
        options: [
          'didn\'t used to',
          'didn\'t use to',
          'don\'t used to',
          'wasn\'t use to'
        ],
        correctAnswer: 'didn\'t use to',
        explanation: 'Como el auxiliar "didn\'t" ya marca el pasado, "use to" va sin la "-d" final ("didn\'t use to").',
        hint: 'Después de didn\'t, el verbo pierde la -d.'
      },
      {
        id: 'a2_11_q2',
        question: 'Diferencia clave: "I am getting used to _____ early for my new job."',
        options: [
          'wake up',
          'waking up',
          'woke up',
          'be wake up'
        ],
        correctAnswer: 'waking up',
        explanation: 'En "be/get used to", "to" es una preposición ("acostumbrarse a"), por lo que el verbo que sigue lleva -ING ("waking up").',
        hint: 'Get used to + verbo con -ING.'
      },
      {
        id: 'a2_11_q3',
        type: 'word-order',
        question: 'Ordena la oración sobre un hábito del pasado:',
        targetText: 'We used to go to the beach every summer',
        options: [],
        correctAnswer: 'We used to go to the beach every summer',
        explanation: '"We used to go..." expresa una costumbre repetida en el pasado ("Solíamos ir / Íbamos").',
        hint: 'Comienza con "We used to go..."'
      }
    ]
  },
  {
    id: 'a2_12',
    day: 30,
    cefrLevel: 'A2',
    category: 'A2 • Autonomía y Movimiento',
    title: 'Prepositions of Movement & Essential A2 Phrasal Verbs',
    description: 'Da y comprende indicaciones precisas de movimiento (across, through, into, along) y domina los Phrasal Verbs esenciales de la vida diaria.',
    grammarFocus: 'Movement: into/out of, through vs. across, along, towards | Phrasal Verbs: look after, look for, put on, take off, get on/off',
    commonMistake: 'No confundas "Across" con "Through": "Walk ACROSS the street" (cruzar una superficie plana de un lado a otro) vs. "Drive THROUGH the tunnel / park" (atravesar un espacio tridimensional rodeado de árboles o paredes).',
    strategyTip: 'En inglés cotidiano, los hablantes nativos prefieren los Phrasal Verbs: dicen "take off your shoes" en lugar de "remove your shoes", y "look for my keys" en lugar de "search my keys".',
    content: `🎯 OBJETIVO CEFR A2.12: NAVEGAR POR EL MUNDO Y USAR PHRASAL VERBS COTIDIANOS

Para cerrar el Nivel A2 con dominio total, necesitas describir movimiento en el espacio y manejar los verbos compuestos más frecuentes del día a día.

1. PREPOSICIONES DE MOVIMIENTO (¿Hacia dónde se mueve?)
• ACROSS (Cruzar de un lado a otro en superficie plana):
  - "Walk across the bridge / across the street." (Cruza el puente / la calle).
• THROUGH (Atravesar por dentro de un espacio cerrado o con árboles):
  - "The train went through the tunnel." (El tren atravesó el túnel).
• INTO vs. OUT OF (Entrar a vs. Salir de):
  - "She walked into the bank and came out of the building ten minutes later."
• ALONG (A lo largo de / siguiendo una línea):
  - "We walked along the river at sunset." (Caminamos a lo largo del río).
• TOWARDS (En dirección hacia):
  - "He walked towards the station."

2. LOS 6 PHRASAL VERBS IMPRESCINDIBLES DE A2
• LOOK FOR (Buscar): "I am looking for my glasses." (¡En español no lleva preposición, en inglés siempre lleva FOR!).
• LOOK AFTER (Cuidar a alguien): "Can you look after my dog this weekend?"
• PUT ON vs. TAKE OFF (Ponerse vs. Quitarse ropa / Despegar un avión):
  - "Put on your jacket, it's cold." / "The plane took off on time."
• GET ON vs. GET OFF (Subirse a vs. Bajarse de autobús, tren, avión):
  - "Get off the bus at the third stop."
• WAKE UP vs. GET UP (Despertarse vs. Levantarse de la cama).`,
    dialogue: [
      { speaker: 'Tourist', textEn: 'Excuse me, I am looking for the Central Library. How do I get there from here?', textEs: 'Disculpe, estoy buscando la Biblioteca Central. ¿Cómo llego allí desde aquí?' },
      { speaker: 'Local', textEn: 'It\'s very easy! First, walk across this avenue and go through the green park.', textEs: '¡Es muy fácil! Primero, cruce esta avenida y atraviese el parque verde.' },
      { speaker: 'Tourist', textEn: 'Okay, across the avenue and through the park. And then?', textEs: 'Bien, cruzo la avenida y atravieso el parque. ¿Y después?' },
      { speaker: 'Local', textEn: 'Walk along the canal for two minutes and you will see the big glass entrance right in front of you.', textEs: 'Camine a lo largo del canal por dos minutos y verá la gran entrada de cristal justo frente a usted.' }
    ],
    quiz: [
      {
        id: 'a2_12_q1',
        question: 'Elige las preposiciones de movimiento correctas: The train went _____ the dark tunnel and then crossed _____ the river bridge.',
        options: [
          'across / through',
          'through / across',
          'along / into',
          'into / out'
        ],
        correctAnswer: 'through / across',
        explanation: 'Usamos "through" para atravesar el interior de un túnel (espacio 3D cerrado) y "across" para cruzar por encima de un puente.',
        hint: 'Túnel = through | Puente = across.'
      },
      {
        id: 'a2_12_q2',
        question: '¿Qué Phrasal Verb significa "cuidar a alguien o algo"? Can you _____ my cat while I am away?',
        options: [
          'look for',
          'look after',
          'look at',
          'take off'
        ],
        correctAnswer: 'look after',
        explanation: '"Look after" significa cuidar de alguien (una mascota, un niño, una planta). "Look for" significa buscar.',
        hint: 'Look after = take care of.'
      },
      {
        id: 'a2_12_q3',
        type: 'speaking',
        question: 'Pronuncia esta frase final del módulo A2 en voz alta:',
        targetText: 'Walk across the street and go through the park',
        options: [],
        correctAnswer: 'Walk across the street and go through the park',
        explanation: '¡Felicidades! Has completado las 12 lecciones exhaustivas del Nivel A2.'
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
        explanation: 'Awesome job! Let\'s continue with lessons 9 to 12 to master every nuance of CEFR A2 Spanish!'
      }
    ]
  },
  {
    id: 'es_a2_9',
    day: 27,
    cefrLevel: 'A2',
    category: 'A2 • Daily Life & Reflexives',
    title: 'Reflexive Verbs, Daily Routines & Stem Changes',
    description: 'Master reflexive pronouns (me, te, se, nos) and stem-changing routine verbs (despertarse, vestirse, acostarse) in present and past.',
    grammarFocus: 'me, te, se, nos, se + verb | Stem-changers: despertarse (e->ie), acostarse (o->ue), vestirse (e->i)',
    commonMistake: 'With body parts and clothing in Spanish, do NOT use possessive adjectives ("mi, tu")! Say "Me lavo LAS manos" and "Me pongo LA chaqueta" (NOT "Me lavo mis manos").',
    strategyTip: 'When you have two verbs together (Voy a levantarme / Quiero ducharme), you can put the reflexive pronoun EITHER before the first verb ("Me voy a levantar") OR attached to the end of the infinitive ("Voy a levantarme")!',
    content: `🎯 CEFR A2.9 GOAL: TALKING ABOUT DAILY ROUTINES & PERSONAL CARE NATURALLY

In Spanish, many daily routine actions are "reflexive" (the person doing the action also receives it), marked by "-SE" at the end of the infinitive.

1. REFLEXIVE PRONOUNS + STEM-CHANGING ROUTINE VERBS
• DESPERTARSE (to wake up, e -> ie):
  - Yo me despierto a las siete. (I wake up at 7:00).
  - Tú te despiertas temprano.
• LEVANTARSE (to get up, regular):
  - Ella se levanta enseguida. (She gets up right away).
• VESTIRSE (to get dressed, e -> i):
  - Nosotros nos vestimos rápido.
• ACOSTARSE (to go to bed, o -> ue):
  - Ellos se acuestan a las once de la noche.

2. BODY PARTS & CLOTHING RULE
Because the reflexive pronoun (me, te, se) already tells us whose body or clothes it is, Spanish uses the definite article (el, la, los, las):
• "Me lavo los dientes después de desayunar." (I brush my teeth after having breakfast).
• "Me quito los zapatos al entrar en casa." (I take off my shoes when entering the house).

3. RECIPROCAL VERBS (Each other: Nos / Se)
• "Mi hermano y yo nos llevamos muy bien." (My brother and I get along very well with each other).`,
    dialogue: [
      { speaker: 'Elena', textEn: 'What time do you usually wake up during the week, Sam?', textEs: '¿A qué hora te despiertas normalmente entre semana, Sam?' },
      { speaker: 'Sam', textEn: 'I wake up at 6:30, take a shower, and get dressed before having coffee.', textEs: 'Me despierto a las seis y media, me ducho y me visto antes de tomar café.' },
      { speaker: 'Elena', textEn: 'And what time did you go to bed last night?', textEs: '¿Y a qué hora te acostaste anoche?' },
      { speaker: 'Sam', textEn: 'Last night I went to bed very late because I stayed up watching a Spanish series.', textEs: 'Anoche me acosté muy tarde porque me quedé viendo una serie en español.' }
    ],
    quiz: [
      {
        id: 'es_a2_9_q1',
        question: 'Choose the natural Spanish way to say "I wash my hands before eating":',
        options: [
          'Me lavo mis manos antes de comer.',
          'Me lavo las manos antes de comer.',
          'Lavo mis manos antes de comer.',
          'Te lavas las manos antes de comer.'
        ],
        correctAnswer: 'Me lavo las manos antes de comer.',
        explanation: 'In Spanish, reflexive verbs use the definite article ("las manos", "los dientes") rather than the possessive "mis".',
        hint: 'Use "me lavo + las manos".'
      },
      {
        id: 'es_a2_9_q2',
        question: 'Complete with the correct stem-changing reflexive form: Normalmente yo _____ (acostarse, o->ue) a las diez y media.',
        options: [
          'me acuesto',
          'me acosto',
          'acuesto',
          'se acuesta'
        ],
        correctAnswer: 'me acuesto',
        explanation: '"Acostarse" changes O -> UE in the present tense and needs the pronoun "me" for Yo: "me acuesto".',
        hint: 'Yo + me + acuesto.'
      },
      {
        id: 'es_a2_9_q3',
        type: 'word-order',
        question: 'Order the sentence about morning routine:',
        targetText: 'Me despierto temprano y me ducho todos los días',
        options: [],
        correctAnswer: 'Me despierto temprano y me ducho todos los días',
        explanation: 'Great job placing the reflexive pronoun "me" directly before each conjugated verb!',
        hint: 'Start with "Me despierto temprano..."'
      }
    ]
  },
  {
    id: 'es_a2_10',
    day: 28,
    cefrLevel: 'A2',
    category: 'A2 • Indirect Pronouns & Gustar Verbs',
    title: 'Indirect Object Pronouns & Verbs Like Gustar (Encantar, Importar, Parecer)',
    description: 'Go beyond basic "me gusta" to master "encantar, interesar, molestar, importar, quedar bien" and Indirect Object Pronouns (me, te, le, nos, les).',
    grammarFocus: 'A mí me / A ti te / A él le / A nosotros nos / A ellos les + singular (-a) or plural (-an) verb',
    commonMistake: 'The verb agrees with the THING that pleases or matters, NOT the person! Say "A mí me encantan los conciertos" (plural "encantan" because "los conciertos" is plural).',
    strategyTip: 'When mentioning a specific person ("A María" or "A mis padres"), you STILL must include the pronoun "le" or "les" before the verb: "A María LE encanta el arte".',
    content: `🎯 CEFR A2.10 GOAL: EXPRESSING REACTIONS, OPINIONS & INDIRECT OBJECTS

1. VERBS THAT WORK EXACTLY LIKE "GUSTAR"
In Spanish, these verbs literally mean "to be pleasing/interesting/important to someone":
• ENCANTAR (To love something):
  - "Me encanta esta canción" (1 thing) / "Me encantan tus zapatos" (2+ things).
• INTERESAR (To be interested in):
  - "¿Te interesa la historia de México?" (Are you interested in Mexican history?).
• IMPORTAR (To care / mind):
  - "¿Te importa cerrar la ventana?" (Do you mind closing the window?).
• MOLESTAR (To bother / annoy):
  - "A mi padre le molesta el ruido." (Noise bothers my father).
• PARECER (To seem / think of):
  - "¿Qué te parece este restaurante?" (What do you think of this restaurant?).
• QUEDAR BIEN / MAL (To fit or suit well - clothes):
  - "¡Esa camisa te queda genial!" (That shirt looks great on you!).

2. INDIRECT OBJECT PRONOUNS (To whom an action is done)
• Me (to me), Te (to you), Le (to him/her/usted), Nos (to us), Les (to them/ustedes):
  - "El camarero NOS trajo el menú." (The waiter brought US the menu).
  - "Siempre LE digo la verdad a mi mejor amigo." (I always tell my best friend the truth).`,
    dialogue: [
      { speaker: 'Sofía', textEn: 'What do you think of this green jacket, Leo? Does it suit me?', textEs: '¿Qué te parece esta chaqueta verde, Leo? ¿Me queda bien?' },
      { speaker: 'Leo', textEn: 'It looks fantastic on you! And I love the color.', textEs: '¡Te queda genial! Y además me encanta el color.' },
      { speaker: 'Sofía', textEn: 'Are you interested in looking at the shoes on the second floor?', textEs: '¿Te interesa mirar los zapatos del segundo piso?' },
      { speaker: 'Leo', textEn: 'Sure, I don\'t mind waiting while you try them on.', textEs: 'Claro, no me importa esperar mientras te los pruebas.' }
    ],
    quiz: [
      {
        id: 'es_a2_10_q1',
        question: 'Complete the sentence: A mis amigos _____ _____ mucho las películas de ciencia ficción.',
        options: [
          'le gustan',
          'les encanta',
          'les encantan',
          'los encantan'
        ],
        correctAnswer: 'les encantan',
        explanation: '"A mis amigos" requires the plural indirect pronoun "les", and "las películas" (plural subject) requires the plural verb "encantan".',
        hint: 'A mis amigos -> les | las películas -> encantan.'
      },
      {
        id: 'es_a2_10_q2',
        question: 'How do you say "That dress looks great on you!" in Spanish?',
        options: [
          '¡Ese vestido te queda genial!',
          '¡Ese vestido eres genial!',
          '¡Ese vestido te gusta genial!',
          '¡Ese vestido lo queda bien!'
        ],
        correctAnswer: '¡Ese vestido te queda genial!',
        explanation: '"Quedar bien / genial" is the idiomatic Spanish verb for how clothes fit or look on someone.',
        hint: 'Use "te queda genial".'
      },
      {
        id: 'es_a2_10_q3',
        type: 'word-order',
        question: 'Order the question asking for someone\'s opinion:',
        targetText: 'Qué te parece nuestra nueva oficina en el centro',
        options: [],
        correctAnswer: 'Qué te parece nuestra nueva oficina en el centro',
        explanation: '"¿Qué te parece...?" is the most natural way to ask "What do you think of...?" in Spanish.',
        hint: 'Start with "Qué te parece..."'
      }
    ]
  },
  {
    id: 'es_a2_11',
    day: 29,
    cefrLevel: 'A2',
    category: 'A2 • Precision & Negation',
    title: 'Indefinites & Double Negation (Alguien/Nadie, Algún/Ningún, Tampoco)',
    description: 'Master Spanish double negation ("No conozco a nadie") and pairs of affirmative/negative words without translating literally from English.',
    grammarFocus: 'Algo/Nada | Alguien/Nadie | Algún/Ningún | Siempre/Nunca | También/Tampoco',
    commonMistake: 'In English, double negatives are wrong ("I don\'t know nobody"). In Spanish, when the negative word comes AFTER the verb, double negation is MANDATORY: "No conozco a nadie" (Literally: I don\'t know nobody).',
    strategyTip: 'To agree with a negative statement ("Me neither"), NEVER use "también no"—always use "Yo tampoco"!',
    content: `🎯 CEFR A2.11 GOAL: MASTERING SPANISH DOUBLE NEGATION & OPPOSITE PAIRS

1. THE 5 ESSENTIAL AFFIRMATIVE / NEGATIVE PAIRS
• Algo (Something) <-> Nada (Nothing / Anything)
• Alguien (Someone) <-> Nadie (No one / Anyone)
• Algún / Alguno/a (Some / Any) <-> Ningún / Ninguno/a (None / Not any)
• Siempre (Always) <-> Nunca / Jamás (Never)
• También (Also / Too) <-> Tampoco (Neither / Either)

2. THE GOLDEN RULE OF SPANISH DOUBLE NEGATION
If the negative word (nada, nadie, nunca, ningún, tampoco) goes AFTER the verb, you MUST put "NO" before the verb:
• "No tengo nada en los bolsillos." (I don't have anything in my pockets).
• "No hay nadie en la sala." (There isn't anyone in the room).
• "Ella no come carne nunca." OR "Ella nunca come carne." (If "nunca" goes BEFORE the verb, drop the "no"!).

3. APOCOPATION: ALGÚN & NINGÚN BEFORE MASCULINE SINGULAR NOUNS
• Before a masculine singular noun, "alguno" and "ninguno" drop the "-o":
  - "¿Tienes algún plan para hoy?" -> "No, no tengo ningún plan."`,
    dialogue: [
      { speaker: 'Camila', textEn: 'Do you know anyone at this conference, Ryan?', textEs: '¿Conoces a alguien en esta conferencia, Ryan?' },
      { speaker: 'Ryan', textEn: 'No, I don\'t know anyone here yet.', textEs: 'No, todavía no conozco a nadie aquí.' },
      { speaker: 'Camila', textEn: 'Me neither! Have you ever attended this event before?', textEs: '¡Yo tampoco! ¿Has asistido alguna vez a este evento?' },
      { speaker: 'Ryan', textEn: 'Never, this is my first time, but I don\'t have any problem introducing myself!', textEs: 'Nunca, es mi primera vez, ¡pero no tengo ningún problema en presentarme!' }
    ],
    quiz: [
      {
        id: 'es_a2_11_q1',
        question: 'Translate "I don\'t have any problem with the schedule" into natural Spanish:',
        options: [
          'No tengo algún problema con el horario.',
          'No tengo ningún problema con el horario.',
          'No tengo ninguno problema con el horario.',
          'Tengo ningún problema con el horario.'
        ],
        correctAnswer: 'No tengo ningún problema con el horario.',
        explanation: 'Spanish requires double negation ("No tengo ningún...") and drops the "-o" before the masculine singular noun "problema".',
        hint: 'No tengo + ningún problema.'
      },
      {
        id: 'es_a2_11_q2',
        question: 'How do you reply "Me neither" when a friend says "No me gusta el café amargo"?',
        options: [
          'A mí también no.',
          'A mí tampoco.',
          'Yo también.',
          'Yo nunca.'
        ],
        correctAnswer: 'A mí tampoco.',
        explanation: 'To agree with a negative statement, we use "tampoco" (and with gustar-type verbs, "A mí tampoco").',
        hint: 'Negative agreement = tampoco.'
      },
      {
        id: 'es_a2_11_q3',
        type: 'word-order',
        question: 'Order the double-negative sentence in Spanish:',
        targetText: 'Hoy no hay nadie en la oficina',
        options: [],
        correctAnswer: 'Hoy no hay nadie en la oficina',
        explanation: 'When "nadie" follows the verb "hay", "no" must precede the verb: "no hay nadie".',
        hint: 'Start with "Hoy no hay..."'
      }
    ]
  },
  {
    id: 'es_a2_12',
    day: 30,
    cefrLevel: 'A2',
    category: 'A2 • Verbal Periphrases & Fluency',
    title: 'Essential Periphrases: Acabar de, Tener que, Hay que & Estar + Gerundio',
    description: 'Express what you "just did" (Acabo de...), obligations (Tengo que / Hay que), and ongoing actions (Estoy haciendo / Seguir haciendo).',
    grammarFocus: 'Acabar de + Infinitive (just did) | Tener que vs. Hay que + Inf | Estar / Seguir + Gerundio (-ando / -iendo)',
    commonMistake: 'In English, "-ing" is used as a noun ("Swimming is healthy"). In Spanish, the gerund (-ando/-iendo) is NEVER a noun! Use the infinitive as a noun: "Nadar es saludable" (NOT "Nadando es saludable").',
    strategyTip: 'Use "Acabo de + infinitivo" whenever you want to say "I just [did something]" in English—it is super easy because "acabo" is in the present tense!',
    content: `🎯 CEFR A2.12 GOAL: SPEAKING WITH NATURAL FLUENCY USING VERBAL PERIPHRASES

1. "ACABAR DE + INFINITIVE" (To have just done something)
Instead of complicated past tenses, Spanish uses Present of ACABAR + DE + INFINITIVE:
• "Acabo de llegar al aeropuerto." (I just arrived at the airport).
• "Ellos acaban de comprar una casa." (They just bought a house).

2. PERSONAL VS. IMPERSONAL OBLIGATION: TENER QUE VS. HAY QUE
• TENER QUE + Infinitive (Specific person must do it):
  - "Tengo que enviar este documento hoy." (I have to send this document today).
• HAY QUE + Infinitive (General rule / "One must"):
  - "Para hablar bien español, hay que practicar todos los días." (To speak Spanish well, one must practice every day).

3. ESTAR + GERUNDIO & SEGUIR + GERUNDIO (-ANDO / -IENDO)
• ESTAR + Gerundio (Right now in progress):
  - "Estoy preparando la cena." (I am making dinner right now).
• SEGUIR + Gerundio (Keep doing / Still doing):
  - "¿Sigues viviendo en el mismo barrio?" (Are you still living in the same neighborhood?).
  - Irregular gerunds to remember: Leer -> Leyendo, Dormir -> Durmiendo, Pedir -> Pidiendo.`,
    dialogue: [
      { speaker: 'Martín', textEn: 'Hi Claire! Where are you? We are waiting for you at the cafe.', textEs: '¡Hola Claire! ¿Dónde estás? Te estamos esperando en la cafetería.' },
      { speaker: 'Claire', textEn: 'I just got off the metro! I am walking towards the square right now.', textEs: '¡Acabo de bajar del metro! Estoy caminando hacia la plaza ahora mismo.' },
      { speaker: 'Martín', textEn: 'Great! Are you still taking Spanish classes in the evenings?', textEs: '¡Genial! ¿Sigues tomando clases de español por las tardes?' },
      { speaker: 'Claire', textEn: 'Yes, one has to be consistent to pass the official A2 exam!', textEs: '¡Sí, hay que ser constante para aprobar el examen oficial A2!' }
    ],
    quiz: [
      {
        id: 'es_a2_12_q1',
        question: 'How do you say "I just spoke with the manager" in idiomatic Spanish?',
        options: [
          'Justo hablo con el gerente.',
          'Acabo de hablar con el gerente.',
          'Acabo hablando con el gerente.',
          'Tengo que hablar con el gerente.'
        ],
        correctAnswer: 'Acabo de hablar con el gerente.',
        explanation: '"Acabar de + infinitive" is the standard Spanish structure for "to have just done something".',
        hint: 'Use "Acabo de + infinitive".'
      },
      {
        id: 'es_a2_12_q2',
        question: 'Choose the right form to express "Are you still working at the same company?":',
        options: [
          '¿Sigues trabajando en la misma empresa?',
          '¿Sigues trabajar en la misma empresa?',
          '¿Acabas de trabajando en la misma empresa?',
          '¿Hay que trabajando en la misma empresa?'
        ],
        correctAnswer: '¿Sigues trabajando en la misma empresa?',
        explanation: '"Seguir + gerundio (-ando/-iendo)" means "to keep doing" or "to still be doing" something.',
        hint: 'Seguir + gerundio (-ando).'
      },
      {
        id: 'es_a2_12_q3',
        type: 'speaking',
        question: 'Speak aloud this final sentence of the 12-lesson A2 Spanish module:',
        targetText: 'Acabo de completar todas las lecciones del nivel A2',
        options: [],
        correctAnswer: 'Acabo de completar todas las lecciones del nivel A2',
        explanation: '¡Felicidades! You have completed all 12 comprehensive lessons of Spanish CEFR A2!'
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
  { id: 'v_a2_12', word: 'Schedule', translation: 'Horario / Agenda', example: 'We have to check the schedule before booking.', category: 'A2 • Salud y Trabajo', phonetic: '/ˈskedʒuːl/', cefrLevel: 'A2' },
  { id: 'v_a2_13', word: 'Advice', translation: 'Consejo (Incontable)', example: 'Let me give you some useful advice.', category: 'A2 • Precisión', phonetic: '/ədˈvaɪs/', cefrLevel: 'A2' },
  { id: 'v_a2_14', word: 'Look after', translation: 'Cuidar de alguien', example: 'She looks after her younger brother.', category: 'A2 • Phrasal Verbs', phonetic: '/lʊk ˈæftər/', cefrLevel: 'A2' },
  { id: 'v_a2_15', word: 'Get used to', translation: 'Acostumbrarse a', example: 'I am getting used to waking up early.', category: 'A2 • Hábitos', phonetic: '/ɡet juːzd tuː/', cefrLevel: 'A2' },
  { id: 'v_a2_16', word: 'Avoid', translation: 'Evitar (+ verbo -ING)', example: 'Try to avoid making the same mistake.', category: 'A2 • Patrones Verbales', phonetic: '/əˈvɔɪd/', cefrLevel: 'A2' },
  { id: 'v_a2_17', word: 'Across', translation: 'Al otro lado de / Cruzando', example: 'Walk across the bridge to see the museum.', category: 'A2 • Movimiento', phonetic: '/əˈkrɔːs/', cefrLevel: 'A2' },
  { id: 'v_a2_18', word: 'Enough', translation: 'Suficiente / Suficientemente', example: 'We have enough time to finish the project.', category: 'A2 • Precisión', phonetic: '/ɪˈnʌf/', cefrLevel: 'A2' }
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
  { id: 'es_a2_v_12', word: 'Acostumbrarse', translation: 'To get used to', example: 'Ya me he acostumbrado al horario de España.', category: 'A2 • Experiences', phonetic: 'ah-kohs-toom-BRAHR-seh', cefrLevel: 'A2' },
  { id: 'es_a2_v_13', word: 'Acabar de + inf.', translation: 'To have just done something', example: 'Acabo de hablar con la directora.', category: 'A2 • Periphrases', phonetic: 'ah-kah-BAHR deh', cefrLevel: 'A2' },
  { id: 'es_a2_v_14', word: 'Llevarse bien', translation: 'To get along well', example: 'Me llevo muy bien con mis compañeros.', category: 'A2 • Daily Life', phonetic: 'yeh-BAHR-seh byehn', cefrLevel: 'A2' },
  { id: 'es_a2_v_15', word: 'Quedar bien', translation: 'To fit / suit well (clothing)', example: 'Esa chaqueta azul te queda muy bien.', category: 'A2 • Daily Life', phonetic: 'keh-DAHR byehn', cefrLevel: 'A2' },
  { id: 'es_a2_v_16', word: 'Tampoco', translation: 'Neither / Not either', example: 'Yo tampoco conozco a nadie aquí.', category: 'A2 • Precision', phonetic: 'tahm-POH-koh', cefrLevel: 'A2' },
  { id: 'es_a2_v_17', word: 'Despertarse', translation: 'To wake up (e -> ie)', example: 'Siempre me despierto a las siete.', category: 'A2 • Daily Life', phonetic: 'dehs-pehr-TAHR-seh', cefrLevel: 'A2' },
  { id: 'es_a2_v_18', word: 'Hay que + inf.', translation: 'One must / It is necessary to', example: 'Hay que reservar mesa con antelación.', category: 'A2 • Periphrases', phonetic: 'ahy keh', cefrLevel: 'A2' }
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
  },
  {
    id: 'ex_a2_9',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Gerunds vs. Infinitives',
    question: 'Would you mind _____ the window? I promise _____ it back in ten minutes.',
    options: [
      'opening / to close',
      'to open / closing',
      'open / to close',
      'opening / closing'
    ],
    correctAnswer: 'opening / to close',
    explanation: '"Would you mind" siempre exige verbo en -ING ("opening"), mientras que "promise" exige TO + Infinitivo ("to close").'
  },
  {
    id: 'ex_a2_10',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Quantifiers & Uncountables',
    question: 'Is this coffee warm _____ for you, or do you want me to heat it up?',
    options: [
      'enough',
      'too',
      'many',
      'much'
    ],
    correctAnswer: 'enough',
    explanation: '"Enough" se ubica después del adjetivo ("warm enough") para expresar suficiencia.'
  },
  {
    id: 'ex_a2_11',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Used to vs. Get used to',
    question: 'I _____ live in a small village, so I am still getting used to _____ in the city traffic.',
    options: [
      'used to / driving',
      'use to / drive',
      'used to / drive',
      'was used to / drove'
    ],
    correctAnswer: 'used to / driving',
    explanation: '"Used to + verbo base" indica estado pasado, y "getting used to + -ING" indica el proceso de adaptarse.'
  },
  {
    id: 'ex_a2_12',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Movement & Phrasal Verbs',
    question: 'Can you _____ my dog while I walk _____ the street to the pharmacy?',
    options: [
      'look after / across',
      'look for / through',
      'take off / along',
      'look at / into'
    ],
    correctAnswer: 'look after / across',
    explanation: '"Look after" significa cuidar, y "walk across the street" significa cruzar la calle de un lado al otro.'
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
  },
  {
    id: 'es_ex_a2_9',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Reflexive Verbs & Routines',
    question: 'Todas las mañanas yo _____ a las siete y _____ los dientes.',
    options: [
      'me despierto / me lavo',
      'despierto / lavo mis',
      'te despiertas / me lavo',
      'me despierto / lavo mis'
    ],
    correctAnswer: 'me despierto / me lavo',
    explanation: 'Reflexive routine verbs require "me" for Yo and the definite article ("los dientes") instead of "mis".'
  },
  {
    id: 'es_ex_a2_10',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Verbs Like Gustar',
    question: 'A nosotros _____ _____ mucho los museos de historia antigua.',
    options: [
      'nos interesa',
      'nos interesan',
      'les interesan',
      'nos interesamos'
    ],
    correctAnswer: 'nos interesan',
    explanation: '"Los museos" is plural, so the verb agrees in plural ("interesan") with the indirect pronoun "nos".'
  },
  {
    id: 'es_ex_a2_11',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Double Negation',
    question: 'Es domingo por la noche y no hay _____ en la oficina.',
    options: [
      'alguien',
      'nadie',
      'algún',
      'algo'
    ],
    correctAnswer: 'nadie',
    explanation: 'After a negated verb ("no hay"), Spanish requires the negative word "nadie" (no one / anyone).'
  },
  {
    id: 'es_ex_a2_12',
    cefrLevel: 'A2',
    sectionTitle: 'A2 • Verbal Periphrases',
    question: '¡Llegaste justo a tiempo! Nosotros _____ de preparar el café.',
    options: [
      'acabamos',
      'tenemos',
      'seguimos',
      'estamos'
    ],
    correctAnswer: 'acabamos',
    explanation: '"Acabar de + infinitive" means "to have just done something" (Acabamos de preparar = We just made).'
  }
];
