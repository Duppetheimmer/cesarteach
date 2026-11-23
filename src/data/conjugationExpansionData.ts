import { ConjugationChallenge } from './conjugationArcadeData';

// ============================================================================
// EXTRA ENGLISH CONJUGATION CHALLENGES (32 CARDS: 8 PER LEVEL A1-B2 -> 20/LEVEL)
// ============================================================================
export const EXTRA_ENGLISH_CONJUGATIONS: ConjugationChallenge[] = [
  // --------------------------------------------------------------------------
  // LEVEL A1 (CARDS 13 TO 20)
  // --------------------------------------------------------------------------
  {
    id: 'en_conj_a1_13',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'HE (Él)',
    verbCard: 'TO TEACH (Enseñar)',
    tenseCard: 'Present Simple · Terminación -ES (+)',
    sentenceTemplate: 'He _____ mathematics at the local high school.',
    fullSentence: 'He teaches mathematics at the local high school.',
    translation: 'Él enseña matemáticas en la escuela secundaria local.',
    correctAnswer: 'teaches',
    options: ['teaches', 'teach', 'teachs', 'teaching'],
    ruleExplanation: 'Los verbos terminados en -ch, -sh, -ss, -x o -o agregan "-es" con He/She/It (teach → teaches).',
    paradigmTitle: 'Present Simple: TO TEACH',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'teach' },
      { pronoun: 'He / She / It', conjugated: 'teaches' },
      { pronoun: 'We / They', conjugated: 'teach' }
    ]
  },
  {
    id: 'en_conj_a1_14',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'SHE (Ella)',
    verbCard: 'TO FIX (Reparar / Arreglar)',
    tenseCard: 'Present Simple · Terminación -X → -XES (+)',
    sentenceTemplate: 'She _____ computers and smartphones in her shop.',
    fullSentence: 'She fixes computers and smartphones in her shop.',
    translation: 'Ella repara computadoras y teléfonos en su tienda.',
    correctAnswer: 'fixes',
    options: ['fixes', 'fixs', 'fix', 'fixing'],
    ruleExplanation: 'Los verbos que terminan en "-x" añaden "-es" en tercera persona singular (fix → fixes).',
    paradigmTitle: 'Present Simple: TO FIX',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'fix' },
      { pronoun: 'He / She / It', conjugated: 'fixes' },
      { pronoun: 'We / They', conjugated: 'fix' }
    ]
  },
  {
    id: 'en_conj_a1_15',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'WE (Nosotros)',
    verbCard: 'TO BE (Ser / Estar)',
    tenseCard: 'Present Continuous · Negativo (-)',
    sentenceTemplate: 'We _____ working late tonight because it is Friday.',
    fullSentence: "We aren't working late tonight because it is Friday.",
    translation: 'No estamos trabajando hasta tarde esta noche porque es viernes.',
    correctAnswer: "aren't",
    options: ["aren't", "don't", "isn't", "not"],
    ruleExplanation: 'En Present Continuous (be + -ing), negamos con el verbo To Be: "We aren\'t working" (nunca "We don\'t working").',
    paradigmTitle: 'Present Continuous Negative: TO WORK',
    paradigmRows: [
      { pronoun: 'I', conjugated: 'am not working' },
      { pronoun: 'He / She / It', conjugated: "isn't working" },
      { pronoun: 'You / We / They', conjugated: "aren't working" }
    ]
  },
  {
    id: 'en_conj_a1_16',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'YOUR BROTHER (Él)',
    verbCard: 'TO SPEAK (Hablar)',
    tenseCard: 'Present Simple · Pregunta 3ª Persona (?)',
    sentenceTemplate: '_____ your brother speak French fluently?',
    fullSentence: 'Does your brother speak French fluently?',
    translation: '¿Tu hermano habla francés con fluidez?',
    correctAnswer: 'Does',
    options: ['Does', 'Do', 'Is', 'Has'],
    ruleExplanation: 'Para preguntas en Present Simple sobre He/She/It ("your brother"), abrimos con "Does" + verbo base sin -s.',
    paradigmTitle: 'Present Simple Questions: TO SPEAK',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'Do I/you speak...?' },
      { pronoun: 'He / She / It', conjugated: 'Does he/she speak...?' },
      { pronoun: 'We / They', conjugated: 'Do we/they speak...?' }
    ]
  },
  {
    id: 'en_conj_a1_17',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'THE BABY (El bebé)',
    verbCard: 'TO SLEEP (Dormir)',
    tenseCard: 'Present Continuous · Ahora mismo (+)',
    sentenceTemplate: 'Be quiet, please! The baby _____ right now.',
    fullSentence: 'Be quiet, please! The baby is sleeping right now.',
    translation: '¡Guarda silencio, por favor! El bebé está durmiendo ahora mismo.',
    correctAnswer: 'is sleeping',
    options: ['is sleeping', 'sleeps', 'sleeping', 'are sleeping'],
    ruleExplanation: 'Para una acción en progreso en este preciso instante ("right now"), usamos "is/are + verbo-ing".',
    paradigmTitle: 'Present Continuous: TO SLEEP',
    paradigmRows: [
      { pronoun: 'I', conjugated: 'am sleeping' },
      { pronoun: 'He / She / It', conjugated: 'is sleeping' },
      { pronoun: 'You / We / They', conjugated: 'are sleeping' }
    ]
  },
  {
    id: 'en_conj_a1_18',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'THERE (Existencia Plural)',
    verbCard: 'THERE IS / THERE ARE (Haber)',
    tenseCard: 'Presente · Pregunta Plural (?)',
    sentenceTemplate: '_____ any good restaurants near this hotel?',
    fullSentence: 'Are there any good restaurants near this hotel?',
    translation: '¿Hay buenos restaurantes cerca de este hotel?',
    correctAnswer: 'Are there',
    options: ['Are there', 'Is there', 'Do there', 'Have there'],
    ruleExplanation: 'Con sustantivos plurales ("good restaurants"), invertimos "There are" a "¿Are there...?" para preguntar si hay.',
    paradigmTitle: 'Questions with THERE IS / THERE ARE',
    paradigmRows: [
      { pronoun: 'Singular / Uncountable', conjugated: 'Is there any water?' },
      { pronoun: 'Plural Countable', conjugated: 'Are there any restaurants?' }
    ]
  },
  {
    id: 'en_conj_a1_19',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'MY PARENTS (Mis padres)',
    verbCard: 'TO HAVE (Tener / Desayunar)',
    tenseCard: 'Present Simple · Sujeto Plural (+)',
    sentenceTemplate: 'My parents always _____ breakfast at seven thirty.',
    fullSentence: 'My parents always have breakfast at seven thirty.',
    translation: 'Mis padres siempre desayunan a las siete y media.',
    correctAnswer: 'have',
    options: ['have', 'has', 'having', 'are have'],
    ruleExplanation: '"My parents" equivale a "They" (plural), por lo que toma la forma base "have" (no "has").',
    paradigmTitle: 'Present Simple: TO HAVE BREAKFAST',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'have breakfast' },
      { pronoun: 'He / She / It', conjugated: 'has breakfast' },
      { pronoun: 'We / They', conjugated: 'have breakfast' }
    ]
  },
  {
    id: 'en_conj_a1_20',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'YOU (Tú)',
    verbCard: 'TO LIKE (Gustar + Gerundio)',
    tenseCard: 'Like + Verbo en -ING (+)',
    sentenceTemplate: 'Do you like _____ movies in English with subtitles?',
    fullSentence: 'Do you like watching movies in English with subtitles?',
    translation: '¿Te gusta ver películas en inglés con subtítulos?',
    correctAnswer: 'watching',
    options: ['watching', 'watch', 'watches', 'watched'],
    ruleExplanation: 'Después de verbos de gusto o preferencia (like, love, enjoy, hate), el siguiente verbo lleva "-ing" (like watching).',
    paradigmTitle: 'Verbs of Preference + -ING',
    paradigmRows: [
      { pronoun: 'I like / love', conjugated: 'watching / reading' },
      { pronoun: 'She enjoys', conjugated: 'watching / reading' },
      { pronoun: 'We hate', conjugated: 'waiting' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL A2 (CARDS 13 TO 20)
  // --------------------------------------------------------------------------
  {
    id: 'en_conj_a2_13',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'I (Yo)',
    verbCard: 'TO LOSE (Perder)',
    tenseCard: 'Past Simple · Verbo Irregular (+)',
    sentenceTemplate: 'I _____ my house keys at the supermarket yesterday.',
    fullSentence: 'I lost my house keys at the supermarket yesterday.',
    translation: 'Perdí las llaves de mi casa en el supermercado ayer.',
    correctAnswer: 'lost',
    options: ['lost', 'losed', 'lose', 'loosing'],
    ruleExplanation: '"Lose" es irregular: lose → lost → lost. Nunca se dice "losed".',
    paradigmTitle: 'Past Simple Irregular: TO LOSE',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'lost' },
      { pronoun: 'He / She / It', conjugated: 'lost' },
      { pronoun: 'We / They', conjugated: 'lost' }
    ]
  },
  {
    id: 'en_conj_a2_14',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'SHE (Ella)',
    verbCard: 'TO PAY (Pagar)',
    tenseCard: 'Past Simple · Ortografía Irregular (+)',
    sentenceTemplate: 'She _____ for the flight tickets with her credit card.',
    fullSentence: 'She paid for the flight tickets with her credit card.',
    translation: 'Ella pagó los boletos de avión con su tarjeta de crédito.',
    correctAnswer: 'paid',
    options: ['paid', 'payed', 'pays', 'paying'],
    ruleExplanation: 'El pasado de "pay" se escribe "paid" (igual que say → said). "Payed" es un error ortográfico frecuente.',
    paradigmTitle: 'Past Simple: TO PAY',
    paradigmRows: [
      { pronoun: 'Present (I / She)', conjugated: 'pay / pays' },
      { pronoun: 'Past Simple (All)', conjugated: 'paid' },
      { pronoun: 'Present Perfect', conjugated: 'have / has paid' }
    ]
  },
  {
    id: 'en_conj_a2_15',
    level: 'A2',
    category: 'negative-question',
    subjectCard: 'YOU (Tú / Ustedes)',
    verbCard: 'TO BE (Estar en Pasado)',
    tenseCard: 'Past Simple · Verbo To Be (?)',
    sentenceTemplate: 'Where _____ you when the meeting started?',
    fullSentence: 'Where were you when the meeting started?',
    translation: '¿Dónde estabas cuando empezó la reunión?',
    correctAnswer: 'were',
    options: ['were', 'was', 'did', 'are'],
    ruleExplanation: 'El verbo To Be en pasado (was/were) hace preguntas directamente sin el auxiliar "did": "Where were you?".',
    paradigmTitle: 'Past Simple Questions: TO BE',
    paradigmRows: [
      { pronoun: 'I / He / She / It', conjugated: 'Where was I/she?' },
      { pronoun: 'You / We / They', conjugated: 'Where were you/they?' }
    ]
  },
  {
    id: 'en_conj_a2_16',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'WE (Nosotros)',
    verbCard: 'TO KNOW (Conocer a alguien)',
    tenseCard: 'Present Perfect · Verbo de Estado (+)',
    sentenceTemplate: 'We _____ each other since we were in college.',
    fullSentence: 'We have known each other since we were in college.',
    translation: 'Nos conocemos desde que estábamos en la universidad.',
    correctAnswer: 'have known',
    options: ['have known', 'know', 'are knowing', 'have knew'],
    ruleExplanation: 'Para acciones o estados que empezaron en el pasado y continúan hoy ("since..."), el inglés exige Present Perfect ("have known", nunca Present Simple "we know").',
    paradigmTitle: 'Present Perfect with SINCE / FOR: TO KNOW',
    paradigmRows: [
      { pronoun: 'I / You / We / They', conjugated: 'have known' },
      { pronoun: 'He / She / It', conjugated: 'has known' }
    ]
  },
  {
    id: 'en_conj_a2_17',
    level: 'A2',
    category: 'affirmative',
    subjectCard: 'THEY (Ellos)',
    verbCard: 'TO MOVE (Mudarse)',
    tenseCard: 'Futuro con BE GOING TO · Plan Decidido (+)',
    sentenceTemplate: 'They _____ to a bigger apartment next month.',
    fullSentence: 'They are going to move to a bigger apartment next month.',
    translation: 'Ellos se van a mudar a un apartamento más grande el próximo mes.',
    correctAnswer: 'are going to move',
    options: ['are going to move', 'going to move', 'will moving', 'are go to move'],
    ruleExplanation: 'Para planes futuros ya decididos usamos "am/is/are + going to + verbo base". No olvides el verbo To Be ("are").',
    paradigmTitle: 'Future Plans: BE GOING TO MOVE',
    paradigmRows: [
      { pronoun: 'I', conjugated: 'am going to move' },
      { pronoun: 'He / She / It', conjugated: 'is going to move' },
      { pronoun: 'You / We / They', conjugated: 'are going to move' }
    ]
  },
  {
    id: 'en_conj_a2_18',
    level: 'A2',
    category: 'negative-question',
    subjectCard: 'HE (Él)',
    verbCard: 'HAVE TO (Tener que)',
    tenseCard: 'Ausencia de Obligación · DON’T / DOESN’T HAVE TO (-)',
    sentenceTemplate: 'He _____ work on Sundays; it is his day off.',
    fullSentence: "He doesn't have to work on Sundays; it is his day off.",
    translation: 'Él no tiene que trabajar los domingos; es su día libre.',
    correctAnswer: "doesn't have to",
    options: ["doesn't have to", "don't have to", "hasn't to", "doesn't has to"],
    ruleExplanation: 'Para decir "no tiene que" (no es necesario), negamos con el auxiliar: "doesn\'t have to + verbo".',
    paradigmTitle: 'Lack of Necessity: NOT HAVE TO',
    paradigmRows: [
      { pronoun: 'I / You / We / They', conjugated: "don't have to work" },
      { pronoun: 'He / She / It', conjugated: "doesn't have to work" }
    ]
  },
  {
    id: 'en_conj_a2_19',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'IT (La lluvia)',
    verbCard: 'TO RAIN (Llover)',
    tenseCard: 'Past Continuous · Escena de Fondo (+)',
    sentenceTemplate: 'It _____ heavily when we left the theater.',
    fullSentence: 'It was raining heavily when we left the theater.',
    translation: 'Estaba lloviendo fuerte cuando salimos del teatro.',
    correctAnswer: 'was raining',
    options: ['was raining', 'were raining', 'rained', 'is raining'],
    ruleExplanation: 'Para la acción en curso en el pasado que servía de telón de fondo cuando otra ocurrió ("when we left"), usamos "was/were + -ing".',
    paradigmTitle: 'Past Continuous: TO RAIN',
    paradigmRows: [
      { pronoun: 'It (Singular)', conjugated: 'was raining' },
      { pronoun: 'I / He / She', conjugated: 'was walking' },
      { pronoun: 'You / We / They', conjugated: 'were walking' }
    ]
  },
  {
    id: 'en_conj_a2_20',
    level: 'A2',
    category: 'advanced-mood',
    subjectCard: 'YOU (Tú)',
    verbCard: 'TO LEAVE (Salir)',
    tenseCard: 'First Conditional · Condición Real (+)',
    sentenceTemplate: 'If you _____ right now, you will catch the last train.',
    fullSentence: 'If you leave right now, you will catch the last train.',
    translation: 'Si sales ahora mismo, alcanzarás el último tren.',
    correctAnswer: 'leave',
    options: ['leave', 'will leave', 'left', 'leaving'],
    ruleExplanation: 'En el First Conditional, la cláusula después de "If" SIEMPRE va en Present Simple ("If you leave"), nunca con "will".',
    paradigmTitle: 'First Conditional Structure',
    paradigmRows: [
      { pronoun: 'If Clause (I / You / We)', conjugated: 'If you leave (Present)' },
      { pronoun: 'If Clause (He / She)', conjugated: 'If she leaves (Present)' },
      { pronoun: 'Result Clause', conjugated: 'you will catch (Future)' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL B1 (CARDS 13 TO 20)
  // --------------------------------------------------------------------------
  {
    id: 'en_conj_b1_13',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'SHE (Ella)',
    verbCard: 'TO WAIT (Esperar)',
    tenseCard: 'Present Perfect Continuous · Duración Visible (+)',
    sentenceTemplate: 'She _____ for the delivery for over two hours.',
    fullSentence: 'She has been waiting for the delivery for over two hours.',
    translation: 'Ella lleva esperando la entrega más de dos horas.',
    correctAnswer: 'has been waiting',
    options: ['has been waiting', 'is waiting', 'have been waiting', 'has waiting'],
    ruleExplanation: 'Para enfatizar cuánto tiempo lleva ocurriendo una acción continua hasta el presente, usamos "has/have been + verbo-ing".',
    paradigmTitle: 'Present Perfect Continuous: TO WAIT',
    paradigmRows: [
      { pronoun: 'I / You / We / They', conjugated: 'have been waiting' },
      { pronoun: 'He / She / It', conjugated: 'has been waiting' }
    ]
  },
  {
    id: 'en_conj_b1_14',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'THE TRAIN (El tren)',
    verbCard: 'TO LEAVE (Partir / Salir)',
    tenseCard: 'Past Perfect · Pasado del Pasado (+)',
    sentenceTemplate: 'By the time we got to the platform, the train _____ already _____.',
    fullSentence: 'By the time we got to the platform, the train had already left.',
    translation: 'Para cuando llegamos al andén, el tren ya había salido.',
    correctAnswer: 'had / left',
    options: ['had / left', 'has / left', 'was / leaving', 'did / leave'],
    ruleExplanation: 'Para una acción que ocurrió ANTES que otra acción pasada ("got"), usamos Past Perfect: "had + past participle" (had left).',
    paradigmTitle: 'Past Perfect: TO LEAVE',
    paradigmRows: [
      { pronoun: 'I / You / He / She', conjugated: 'had (already) left' },
      { pronoun: 'We / They', conjugated: 'had (already) left' }
    ]
  },
  {
    id: 'en_conj_b1_15',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'THE PACKAGE (Voz Pasiva)',
    verbCard: 'TO DELIVER (Entregar)',
    tenseCard: 'Passive Voice · Present Perfect Passive (+)',
    sentenceTemplate: 'Good news! Your package _____ just _____ to the reception.',
    fullSentence: 'Good news! Your package has just been delivered to the reception.',
    translation: '¡Buenas noticias! Tu paquete acaba de ser entregado en recepción.',
    correctAnswer: 'has / been delivered',
    options: ['has / been delivered', 'has / delivered', 'is / delivering', 'was / deliver'],
    ruleExplanation: 'La voz pasiva en Present Perfect se forma con "has/have + been + participio pasado" (has been delivered).',
    paradigmTitle: 'Present Perfect Passive: TO DELIVER',
    paradigmRows: [
      { pronoun: 'Singular (The package)', conjugated: 'has been delivered' },
      { pronoun: 'Plural (The packages)', conjugated: 'have been delivered' }
    ]
  },
  {
    id: 'en_conj_b1_16',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'HE SAID THAT HE (Reported Speech)',
    verbCard: 'WILL CALL → WOULD CALL',
    tenseCard: 'Reported Speech · Backshift de Will (+)',
    sentenceTemplate: 'He promised that he _____ me back before noon.',
    fullSentence: 'He promised that he would call me back before noon.',
    translation: 'Él prometió que me devolvería la llamada antes del mediodía.',
    correctAnswer: 'would call',
    options: ['would call', 'will call', 'called', 'is calling'],
    ruleExplanation: 'En estilo indirecto (Reported Speech) con verbo introductor en pasado ("He promised"), "will" retrocede a "would" (would call).',
    paradigmTitle: 'Reported Speech Backshift',
    paradigmRows: [
      { pronoun: 'Direct: "I will call"', conjugated: 'Reported: He said he would call' },
      { pronoun: 'Direct: "I can help"', conjugated: 'Reported: She said she could help' }
    ]
  },
  {
    id: 'en_conj_b1_17',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'I (Yo)',
    verbCard: 'TO DRIVE (Conducir por la izquierda)',
    tenseCard: 'BE / GET USED TO + -ING (+)',
    sentenceTemplate: 'After six months in London, I am finally used to _____ on the left.',
    fullSentence: 'After six months in London, I am finally used to driving on the left.',
    translation: 'Después de seis meses en Londres, por fin estoy acostumbrado a conducir por la izquierda.',
    correctAnswer: 'driving',
    options: ['driving', 'drive', 'drove', 'driven'],
    ruleExplanation: 'En la estructura "be used to" / "get used to" (estar acostumbrado a), "to" es una preposición y exige gerundio (-ing): "used to driving".',
    paradigmTitle: 'Used to + Infinitive vs. Be used to + -ING',
    paradigmRows: [
      { pronoun: 'Past habit (Solía)', conjugated: 'I used to drive' },
      { pronoun: 'Accustomed (Acostumbrado)', conjugated: 'I am used to driving' }
    ]
  },
  {
    id: 'en_conj_b1_18',
    level: 'B1',
    category: 'negative-question',
    subjectCard: 'YOU (Question Tag)',
    verbCard: 'HAVE FINISHED (Present Perfect)',
    tenseCard: 'Question Tags · Confirmación (?)',
    sentenceTemplate: "You've already sent the invoice, _____?",
    fullSentence: "You've already sent the invoice, haven't you?",
    translation: 'Ya enviaste la factura, ¿verdad?',
    correctAnswer: "haven't you",
    options: ["haven't you", "didn't you", "don't you", "aren't you"],
    ruleExplanation: 'La coletilla interrogativa (Question Tag) repite el mismo auxiliar de la oración principal ("You\'ve" = You have) en sentido opuesto: "haven\'t you?".',
    paradigmTitle: 'Question Tags by Auxiliary',
    paradigmRows: [
      { pronoun: 'You have sent...', conjugated: "..., haven't you?" },
      { pronoun: 'She sent (Past)...', conjugated: "..., didn't she?" },
      { pronoun: 'They can come...', conjugated: "..., can't they?" }
    ]
  },
  {
    id: 'en_conj_b1_19',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'WE (Nosotros)',
    verbCard: 'TO BOOK (Reservar)',
    tenseCard: 'HAD BETTER · Consejo Urgente (+)',
    sentenceTemplate: 'We _____ a table now or the restaurant will be full.',
    fullSentence: 'We had better book a table now or the restaurant will be full.',
    translation: 'Más vale que reservemos una mesa ahora o el restaurante estará lleno.',
    correctAnswer: 'had better book',
    options: ['had better book', 'had better to book', 'have better book', 'would better booking'],
    ruleExplanation: '"Had better" ("más vale que...") va seguido directamente del verbo en forma base SIN "to": "had better book" / "had better not be late".',
    paradigmTitle: 'Urgent Advice: HAD BETTER',
    paradigmRows: [
      { pronoun: 'Affirmative (All)', conjugated: "We'd better book" },
      { pronoun: 'Negative (All)', conjugated: "You'd better not forget" }
    ]
  },
  {
    id: 'en_conj_b1_20',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'SHE (Ella)',
    verbCard: 'TO AVOID (Evitar + -ING)',
    tenseCard: 'Verbos que Exigen Gerundio (-ING) (+)',
    sentenceTemplate: 'She always avoids _____ during rush hour.',
    fullSentence: 'She always avoids driving during rush hour.',
    translation: 'Ella siempre evita conducir en hora punta.',
    correctAnswer: 'driving',
    options: ['driving', 'to drive', 'drive', 'drove'],
    ruleExplanation: 'Verbos como avoid, enjoy, mind, suggest, finish y keep exigen siempre gerundio (-ing), nunca infinitivo con "to".',
    paradigmTitle: 'Verbs Followed by Gerund (-ING)',
    paradigmRows: [
      { pronoun: 'avoid / enjoy', conjugated: 'avoid driving / enjoy cooking' },
      { pronoun: 'suggest / finish', conjugated: 'suggest waiting / finish working' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL B2 (CARDS 13 TO 20)
  // --------------------------------------------------------------------------
  {
    id: 'en_conj_b2_13',
    level: 'B2',
    category: 'past-perfect',
    subjectCard: 'BY NEXT JULY (Para el próximo julio)',
    verbCard: 'TO WORK (Trabajar)',
    tenseCard: 'Future Perfect Continuous · Proyección Continua (+)',
    sentenceTemplate: 'By next July, she _____ at this firm for ten years.',
    fullSentence: 'By next July, she will have been working at this firm for ten years.',
    translation: 'Para el próximo julio, ella llevará diez años trabajando en esta firma.',
    correctAnswer: 'will have been working',
    options: ['will have been working', 'will be working', 'has been working', 'would be working'],
    ruleExplanation: 'Para proyectar cuánto tiempo llevará en curso una acción al llegar a una fecha futura ("By next July... for ten years"), usamos "will have been + -ing".',
    paradigmTitle: 'Future Perfect vs. Future Perfect Continuous',
    paradigmRows: [
      { pronoun: 'Completed milestone', conjugated: 'will have finished' },
      { pronoun: 'Ongoing duration', conjugated: 'will have been working' }
    ]
  },
  {
    id: 'en_conj_b2_14',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'NO SOONER (Inversión Estilística)',
    verbCard: 'TO ARRIVE (Llegar)',
    tenseCard: 'Negative Inversion · NO SOONER ... THAN (+)',
    sentenceTemplate: 'No sooner _____ we _____ at the hotel than it started to pour.',
    fullSentence: 'No sooner had we arrived at the hotel than it started to pour.',
    translation: 'Apenas habíamos llegado al hotel cuando empezó a llover a cántaros.',
    correctAnswer: 'had / arrived',
    options: ['had / arrived', 'did / arrived', 'we had / arrived', 'have / arrive'],
    ruleExplanation: '"No sooner" al inicio de la frase exige inversión de Past Perfect ("had + sujeto + participio") y se conecta con "than".',
    paradigmTitle: 'B2 Negative Inversions with Time',
    paradigmRows: [
      { pronoun: 'No sooner ... than', conjugated: 'No sooner had we arrived than...' },
      { pronoun: 'Hardly ... when', conjugated: 'Hardly had I sat down when...' }
    ]
  },
  {
    id: 'en_conj_b2_15',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'I WOULD RATHER YOU (Preferencia con Otro Sujeto)',
    verbCard: 'NOT TO TELL (No contar)',
    tenseCard: 'Would Rather + Past Subjunctive (-)',
    sentenceTemplate: 'I would rather you _____ anyone about the merger yet.',
    fullSentence: "I would rather you didn't tell anyone about the merger yet.",
    translation: 'Preferiría que aún no le contaras a nadie sobre la fusión.',
    correctAnswer: "didn't tell",
    options: ["didn't tell", "don't tell", "won't tell", "not tell"],
    ruleExplanation: 'Cuando "would rather" cambia de sujeto ("I would rather YOU..."), el verbo va en Past Simple con valor subjuntivo ("you didn\'t tell").',
    paradigmTitle: 'WOULD RATHER: Same vs. Different Subject',
    paradigmRows: [
      { pronoun: 'Same subject (I)', conjugated: 'I would rather wait / not wait' },
      { pronoun: 'Different subject (You)', conjugated: "I'd rather you waited / didn't tell" }
    ]
  },
  {
    id: 'en_conj_b2_16',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'IT IS HIGH TIME WE (Ya es hora de que)',
    verbCard: 'TO UPGRADE (Actualizar)',
    tenseCard: 'It’s High Time + Past Subjunctive (+)',
    sentenceTemplate: 'It is high time we _____ our security servers.',
    fullSentence: 'It is high time we upgraded our security servers.',
    translation: 'Ya es hora de que actualicemos nuestros servidores de seguridad.',
    correctAnswer: 'upgraded',
    options: ['upgraded', 'upgrade', 'will upgrade', 'have upgraded'],
    ruleExplanation: 'Después de "It\'s time" o "It\'s high time + sujeto", usamos el verbo en Past Simple ("we upgraded") para indicar algo que ya debería haberse hecho.',
    paradigmTitle: 'IT IS (HIGH) TIME + Subject',
    paradigmRows: [
      { pronoun: 'We', conjugated: "It's high time we upgraded" },
      { pronoun: 'You', conjugated: "It's time you went home" }
    ]
  },
  {
    id: 'en_conj_b2_17',
    level: 'B2',
    category: 'past-perfect',
    subjectCard: 'WE (Causativo Have/Get)',
    verbCard: 'TO AUDIT (Auditar)',
    tenseCard: 'Causative · HAVE SOMETHING DONE (+)',
    sentenceTemplate: 'We _____ our financial accounts _____ by an external firm last week.',
    fullSentence: 'We had our financial accounts audited by an external firm last week.',
    translation: 'Hicimos auditar nuestras cuentas financieras por una firma externa la semana pasada.',
    correctAnswer: 'had / audited',
    options: ['had / audited', 'had / audit', 'made / audited', 'got / auditing'],
    ruleExplanation: 'La estructura causativa "have/get + objeto + participio pasado" ("had our accounts audited") indica que encargamos el servicio a un profesional.',
    paradigmTitle: 'Causative: HAVE / GET SOMETHING DONE',
    paradigmRows: [
      { pronoun: 'Present', conjugated: 'We have our accounts audited' },
      { pronoun: 'Past Simple', conjugated: 'We had our accounts audited' },
      { pronoun: 'Future', conjugated: 'We will have them audited' }
    ]
  },
  {
    id: 'en_conj_b2_18',
    level: 'B2',
    category: 'past-perfect',
    subjectCard: 'THEY (Imposibilidad en el Pasado)',
    verbCard: 'TO SEE (Ver)',
    tenseCard: 'Past Modal Deduction · CAN’T HAVE + PARTICIPLE (-)',
    sentenceTemplate: 'They _____ him in Paris yesterday; he is in Tokyo all week!',
    fullSentence: "They can't have seen him in Paris yesterday; he is in Tokyo all week!",
    translation: '¡No pueden haberlo visto en París ayer; él está en Tokio toda la semana!',
    correctAnswer: "can't have seen",
    options: ["can't have seen", "mustn't have seen", "can't see", "shouldn't see"],
    ruleExplanation: 'Para deducir que algo fue lógicamente imposible en el pasado, usamos "can\'t have + participio" (nunca "mustn\'t have").',
    paradigmTitle: 'Past Modal Deductions',
    paradigmRows: [
      { pronoun: '95% sure it happened', conjugated: 'must have seen' },
      { pronoun: '50% possible', conjugated: 'might / could have seen' },
      { pronoun: '99% impossible', conjugated: "can't / couldn't have seen" }
    ]
  },
  {
    id: 'en_conj_b2_19',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'THE BOARD DEMANDED THAT HE (Mandative Subjunctive)',
    verbCard: 'TO RESIGN (Dimitir / Renunciar)',
    tenseCard: 'Formal Subjunctive · Base Form (+)',
    sentenceTemplate: 'The board demanded that the director _____ immediately.',
    fullSentence: 'The board demanded that the director resign immediately.',
    translation: 'La junta exigió que el director dimitiera de inmediato.',
    correctAnswer: 'resign',
    options: ['resign', 'resigns', 'resigned', 'to resign'],
    ruleExplanation: 'Tras verbos de exigencia o recomendación formal (demand, insist, suggest, recommend + that), el subjuntivo inglés usa la forma base sin -s ("that he resign / be").',
    paradigmTitle: 'Formal Mandative Subjunctive',
    paradigmRows: [
      { pronoun: 'They demanded that he...', conjugated: 'resign (base form)' },
      { pronoun: 'She insisted that it...', conjugated: 'be done on time' }
    ]
  },
  {
    id: 'en_conj_b2_20',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'NOT ONLY (Inversión Enfática)',
    verbCard: 'TO EXCEED (Superar)',
    tenseCard: 'Inversion · NOT ONLY ... BUT ALSO (+)',
    sentenceTemplate: 'Not only _____ the team _____ its sales target, but it also cut costs.',
    fullSentence: 'Not only did the team exceed its sales target, but it also cut costs.',
    translation: 'El equipo no solo superó su meta de ventas, sino que también redujo costos.',
    correctAnswer: 'did / exceed',
    options: ['did / exceed', 'did / exceeded', 'had / exceed', 'the team / exceeded'],
    ruleExplanation: 'Al abrir una oración con "Not only", invertimos auxiliar y sujeto como en una pregunta: "Not only did the team exceed...".',
    paradigmTitle: 'B2 Inversion with NOT ONLY',
    paradigmRows: [
      { pronoun: 'Present Simple', conjugated: 'Not only does she speak...' },
      { pronoun: 'Past Simple', conjugated: 'Not only did the team exceed...' }
    ]
  }
];

// ============================================================================
// EXTRA SPANISH CONJUGATION CHALLENGES (32 CARDS: 8 PER LEVEL A1-B2 -> 20/LEVEL)
// ============================================================================
export const EXTRA_SPANISH_CONJUGATIONS: ConjugationChallenge[] = [
  // --------------------------------------------------------------------------
  // LEVEL A1 (CARDS 13 TO 20)
  // --------------------------------------------------------------------------
  {
    id: 'es_conj_a1_13',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'YO (I - Irregular 1st Person)',
    verbCard: 'SALIR (To leave / go out)',
    tenseCard: 'Presente · Verbos con -GO en Yo (+)',
    sentenceTemplate: 'Yo siempre _____ de la oficina a las seis de la tarde.',
    fullSentence: 'Yo siempre salgo de la oficina a las seis de la tarde.',
    translation: 'I always leave the office at six in the evening.',
    correctAnswer: 'salgo',
    options: ['salgo', 'salo', 'saligo', 'sale'],
    ruleExplanation: 'Like "tener → tengo" and "hacer → hago", the verb SALIR has an irregular "-go" ending in the "yo" form: "yo salgo".',
    paradigmTitle: 'Presente de Indicativo: SALIR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'salgo' },
      { pronoun: 'Tú', conjugated: 'sales' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'sale' },
      { pronoun: 'Nosotros/as', conjugated: 'salimos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'salen' }
    ]
  },
  {
    id: 'es_conj_a1_14',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'TÚ (You - Stem Change E → IE)',
    verbCard: 'EMPEZAR (To start / begin)',
    tenseCard: 'Presente · Cambio Radical E → IE (+)',
    sentenceTemplate: '¿A qué hora _____ tú a trabajar los lunes?',
    fullSentence: '¿A qué hora empiezas tú a trabajar los lunes?',
    translation: 'What time do you start working on Mondays?',
    correctAnswer: 'empiezas',
    options: ['empiezas', 'empezas', 'empiezes', 'empezamos'],
    ruleExplanation: 'EMPEZAR is a stem-changing verb (e → ie) in all singular forms and 3rd person plural: "tú empiezas".',
    paradigmTitle: 'Presente (E → IE): EMPEZAR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'empiezo' },
      { pronoun: 'Tú', conjugated: 'empiezas' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'empieza' },
      { pronoun: 'Nosotros/as', conjugated: 'empezamos (sin cambio)' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'empiezan' }
    ]
  },
  {
    id: 'es_conj_a1_15',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'ELLOS (They - Stem Change O → UE)',
    verbCard: 'VOLVER (To return / come back)',
    tenseCard: 'Presente · Cambio Radical O → UE (+)',
    sentenceTemplate: 'Ellos _____ de su viaje el próximo domingo.',
    fullSentence: 'Ellos vuelven de su viaje el próximo domingo.',
    translation: 'They come back from their trip next Sunday.',
    correctAnswer: 'vuelven',
    options: ['vuelven', 'volven', 'vuelvan', 'volvemos'],
    ruleExplanation: 'VOLVER changes "o → ue" when the stem is stressed: "ellos vuelven" (while "nosotros volvemos" keeps the "o").',
    paradigmTitle: 'Presente (O → UE): VOLVER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'vuelvo' },
      { pronoun: 'Tú', conjugated: 'vuelves' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'vuelve' },
      { pronoun: 'Nosotros/as', conjugated: 'volvemos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'vuelven' }
    ]
  },
  {
    id: 'es_conj_a1_16',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'EL CAMARERO (He - Stem Change E → I)',
    verbCard: 'SERVIR (To serve)',
    tenseCard: 'Presente · Cambio Radical E → I (+)',
    sentenceTemplate: 'El camarero _____ el café recién hecho.',
    fullSentence: 'El camarero sirve el café recién hecho.',
    translation: 'The waiter serves the freshly brewed coffee.',
    correctAnswer: 'sirve',
    options: ['sirve', 'serve', 'sierve', 'servimos'],
    ruleExplanation: 'Like "pedir → pide", the -IR verb SERVIR changes "e → i" in the present tense: "él sirve".',
    paradigmTitle: 'Presente (E → I): SERVIR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'sirvo' },
      { pronoun: 'Tú', conjugated: 'sirves' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'sirve' },
      { pronoun: 'Nosotros/as', conjugated: 'servimos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'sirven' }
    ]
  },
  {
    id: 'es_conj_a1_17',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'YO (I - saber vs conocer)',
    verbCard: 'CONOCER (To know a place/person)',
    tenseCard: 'Presente · Cambio -ZCO en Yo (+)',
    sentenceTemplate: 'Yo _____ un restaurante mexicano excelente en este barrio.',
    fullSentence: 'Yo conozco un restaurante mexicano excelente en este barrio.',
    translation: 'I know an excellent Mexican restaurant in this neighborhood.',
    correctAnswer: 'conozco',
    options: ['conozco', 'conoco', 'sé', 'conoces'],
    ruleExplanation: 'Verbs ending in -cer / -cir preceded by a vowel add "-zco" in the "yo" form: "conocer → yo conozco".',
    paradigmTitle: 'Presente: CONOCER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'conozco' },
      { pronoun: 'Tú', conjugated: 'conoces' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'conoce' },
      { pronoun: 'Nosotros/as', conjugated: 'conocemos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'conocen' }
    ]
  },
  {
    id: 'es_conj_a1_18',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'NOSOTROS (We - Reflexive)',
    verbCard: 'ACOSTARS(E) (To go to bed)',
    tenseCard: 'Verbo Reflexivo + Cambio O → UE (+)',
    sentenceTemplate: 'Durante la semana, nosotros _____ a las diez y media.',
    fullSentence: 'Durante la semana, nosotros nos acostamos a las diez y media.',
    translation: 'During the week, we go to bed at ten thirty.',
    correctAnswer: 'nos acostamos',
    options: ['nos acostamos', 'nos acuestamos', 'se acuestan', 'me acuesto'],
    ruleExplanation: 'In the "nosotros" form, reflexive verbs use "nos" and NEVER stem-change ("nos acostamos", while "yo me acuesto" changes o → ue).',
    paradigmTitle: 'Presente Reflexivo: ACOSTARSE',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'me acuesto' },
      { pronoun: 'Tú', conjugated: 'te acuestas' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'se acuesta' },
      { pronoun: 'Nosotros/as', conjugated: 'nos acostamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'se acuestan' }
    ]
  },
  {
    id: 'es_conj_a1_19',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'ELLOS (They - Ongoing Action)',
    verbCard: 'ESTAR + HABLAR (To be speaking)',
    tenseCard: 'Estar + Gerundio (-ANDO / -IENDO) (+)',
    sentenceTemplate: 'En este momento, ellos _____ con el director.',
    fullSentence: 'En este momento, ellos están hablando con el director.',
    translation: 'Right now, they are speaking with the director.',
    correctAnswer: 'están hablando',
    options: ['están hablando', 'son hablando', 'están hablar', 'hablan estando'],
    ruleExplanation: 'To express an action in progress right now, combine ESTAR ("están") + the gerund (-ando for -AR verbs: "hablando").',
    paradigmTitle: 'Presente Progresivo: ESTAR + GERUNDIO',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'estoy hablando' },
      { pronoun: 'Tú', conjugated: 'estás hablando' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'está hablando' },
      { pronoun: 'Nosotros/as', conjugated: 'estamos hablando' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'están hablando' }
    ]
  },
  {
    id: 'es_conj_a1_20',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'A TI (To you - Gustar Plural)',
    verbCard: 'GUSTAR (To please / like)',
    tenseCard: 'Verbo Tipo Gustar · Sujeto Plural (?)',
    sentenceTemplate: '¿A ti te _____ las películas de ciencia ficción?',
    fullSentence: '¿A ti te gustan las películas de ciencia ficción?',
    translation: 'Do you like science fiction movies?',
    correctAnswer: 'gustan',
    options: ['gustan', 'gusta', 'gustas', 'gusto'],
    ruleExplanation: 'GUSTAR agrees with the thing liked ("las películas" = plural), so we use "te gustan" (never "te gustas").',
    paradigmTitle: 'Estructura de GUSTAR',
    paradigmRows: [
      { pronoun: 'Singular / Infinitive', conjugated: 'me/te/le gusta el cine' },
      { pronoun: 'Plural Noun', conjugated: 'me/te/le gustan las películas' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL A2 (CARDS 13 TO 20)
  // --------------------------------------------------------------------------
  {
    id: 'es_conj_a2_13',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'YO (I - Spelling Change -QUÉ)',
    verbCard: 'BUSCAR (To look for)',
    tenseCard: 'Pretérito Indefinido · Cambio C → QU (+)',
    sentenceTemplate: 'Ayer yo _____ mis gafas por toda la casa.',
    fullSentence: 'Ayer yo busqué mis gafas por toda la casa.',
    translation: 'Yesterday I looked for my glasses all over the house.',
    correctAnswer: 'busqué',
    options: ['busqué', 'buscé', 'busco', 'buscaba'],
    ruleExplanation: 'Verbs ending in -CAR change "c → qu" before "-é" in the "yo" Preterite form to preserve the hard /k/ sound: "yo busqué".',
    paradigmTitle: 'Pretérito Indefinido (-CAR): BUSCAR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'busqué (c → qu)' },
      { pronoun: 'Tú', conjugated: 'buscaste' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'buscó' },
      { pronoun: 'Nosotros/as', conjugated: 'buscamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'buscaron' }
    ]
  },
  {
    id: 'es_conj_a2_14',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'NOSOTROS (We - Irregular Preterite)',
    verbCard: 'ESTAR (To be - stem ESTUV-)',
    tenseCard: 'Pretérito Indefinido · Raíz ESTUV- (+)',
    sentenceTemplate: 'El mes pasado nosotros _____ tres días en Sevilla.',
    fullSentence: 'El mes pasado nosotros estuvimos tres días en Sevilla.',
    translation: 'Last month we were in Seville for three days.',
    correctAnswer: 'estuvimos',
    options: ['estuvimos', 'estábamos', 'estamos', 'estuvieron'],
    ruleExplanation: 'For a completed stay with a defined duration ("tres días"), ESTAR uses its irregular preterite stem "estuv-": "nosotros estuvimos".',
    paradigmTitle: 'Pretérito Indefinido: ESTAR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'estuve' },
      { pronoun: 'Tú', conjugated: 'estuviste' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'estuvo' },
      { pronoun: 'Nosotros/as', conjugated: 'estuvimos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'estuvieron' }
    ]
  },
  {
    id: 'es_conj_a2_15',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'ELLOS (They - Stem J in Preterite)',
    verbCard: 'TRAER (To bring)',
    tenseCard: 'Pretérito Indefinido · Raíz TRAJ- (+)',
    sentenceTemplate: 'Mis amigos _____ un postre delicioso a la cena.',
    fullSentence: 'Mis amigos trajeron un postre delicioso a la cena.',
    translation: 'My friends brought a delicious dessert to dinner.',
    correctAnswer: 'trajeron',
    options: ['trajeron', 'trajieron', 'traían', 'trayeron'],
    ruleExplanation: 'Preterite stems ending in "-j" (traj-, dij-, conduj-) drop the "i" in the 3rd person plural: "trajeron" (never "trajieron").',
    paradigmTitle: 'Pretérito Indefinido: TRAER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'traje' },
      { pronoun: 'Tú', conjugated: 'trajiste' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'trajo' },
      { pronoun: 'Nosotros/as', conjugated: 'trajimos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'trajeron (sin i)' }
    ]
  },
  {
    id: 'es_conj_a2_16',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'EL CAMARERO (He - 3rd Person E → I)',
    verbCard: 'PEDIR (To ask for / order)',
    tenseCard: 'Pretérito Indefinido · Cambio E → I en 3ª Persona (+)',
    sentenceTemplate: 'Ella _____ una ensalada templada y agua con gas.',
    fullSentence: 'Ella pidió una ensalada templada y agua con gas.',
    translation: 'She ordered a warm salad and sparkling water.',
    correctAnswer: 'pidió',
    options: ['pidió', 'pedió', 'pide', 'pedía'],
    ruleExplanation: 'Stem-changing -IR verbs change "e → i" (or "o → u" like durmió) in the 3rd person singular and plural of the Preterite: "ella pidió / ellos pidieron".',
    paradigmTitle: 'Pretérito Indefinido (-IR E → I): PEDIR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'pedí' },
      { pronoun: 'Tú', conjugated: 'pediste' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'pidió (e → i)' },
      { pronoun: 'Nosotros/as', conjugated: 'pedimos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'pidieron (e → i)' }
    ]
  },
  {
    id: 'es_conj_a2_17',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'NOSOTROS (We - Childhood Habit)',
    verbCard: 'VER (To see / watch)',
    tenseCard: 'Pretérito Imperfecto · Irregular VER (+)',
    sentenceTemplate: 'De pequeños, nosotros siempre _____ dibujos animados los sábados.',
    fullSentence: 'De pequeños, nosotros siempre veíamos dibujos animados los sábados.',
    translation: 'As kids, we always used to watch cartoons on Saturdays.',
    correctAnswer: 'veíamos',
    options: ['veíamos', 'víamos', 'vimos', 'vemos'],
    ruleExplanation: 'VER is one of only 3 irregular verbs in the Imperfect (along with ser and ir), keeping the "e" in the stem: "veía, veías, veíamos".',
    paradigmTitle: 'Pretérito Imperfecto: VER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'veía' },
      { pronoun: 'Tú', conjugated: 'veías' },
      { pronoun: 'Nosotros/as', conjugated: 'veíamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'veían' }
    ]
  },
  {
    id: 'es_conj_a2_18',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'ELLOS (They - Irregular Participle)',
    verbCard: 'ROMPER (To break)',
    tenseCard: 'Pretérito Perfecto · Participio Irregular (+)',
    sentenceTemplate: 'Los niños _____ el jarrón sin querer esta mañana.',
    fullSentence: 'Los niños han roto el jarrón sin querer esta mañana.',
    translation: 'The children have accidentally broken the vase this morning.',
    correctAnswer: 'han roto',
    options: ['han roto', 'han rompido', 'rompieron', 'habían rompido'],
    ruleExplanation: 'The past participle of ROMPER is irregular: "roto" (never "rompido"). Combined with "han" for "esta mañana": "han roto".',
    paradigmTitle: 'Pretérito Perfecto: ROMPER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'he roto' },
      { pronoun: 'Tú', conjugated: 'has roto' },
      { pronoun: 'Él / Ella', conjugated: 'ha roto' },
      { pronoun: 'Nosotros/as', conjugated: 'hemos roto' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'han roto' }
    ]
  },
  {
    id: 'es_conj_a2_19',
    level: 'A2',
    category: 'affirmative',
    subjectCard: 'TÚ (Informal Command)',
    verbCard: 'PONER (To put / set)',
    tenseCard: 'Imperativo Afirmativo · Tú Irregular (+)',
    sentenceTemplate: 'Por favor, _____ la mesa mientras termino de cocinar.',
    fullSentence: 'Por favor, pon la mesa mientras termino de cocinar.',
    translation: 'Please set the table while I finish cooking.',
    correctAnswer: 'pon',
    options: ['pon', 'pone', 'pones', 'ponga'],
    ruleExplanation: 'PONER has a short irregular affirmative "tú" command: "pon" (remember the 8 short commands: ven, di, sal, haz, ten, ve, pon, sé).',
    paradigmTitle: 'Imperativos Irregulares de TÚ',
    paradigmRows: [
      { pronoun: 'Poner / Tener', conjugated: 'pon / ten' },
      { pronoun: 'Hacer / Salir', conjugated: 'haz / sal' },
      { pronoun: 'Venir / Decir', conjugated: 'ven / di' }
    ]
  },
  {
    id: 'es_conj_a2_20',
    level: 'A2',
    category: 'affirmative',
    subjectCard: 'YO (Ongoing Duration)',
    verbCard: 'LLEVAR + VIVIR (To have been living)',
    tenseCard: 'Perífrasis de Duración · LLEVAR + GERUNDIO (+)',
    sentenceTemplate: 'Yo _____ tres años _____ en esta ciudad.',
    fullSentence: 'Yo llevo tres años viviendo en esta ciudad.',
    translation: 'I have been living in this city for three years.',
    correctAnswer: 'llevo / viviendo',
    options: ['llevo / viviendo', 'he / vivido', 'estoy / viviendo', 'soy / vivir'],
    ruleExplanation: 'To express how long an action has been going on up to the present, Spanish uses "llevar + time + gerund (-ando/-iendo)".',
    paradigmTitle: 'Duración Continua: LLEVAR + GERUNDIO',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'llevo 3 años viviendo' },
      { pronoun: 'Tú', conjugated: 'llevas 3 años viviendo' },
      { pronoun: 'Nosotros/as', conjugated: 'llevamos 3 años viviendo' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL B1 (CARDS 13 TO 20)
  // --------------------------------------------------------------------------
  {
    id: 'es_conj_b1_13',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'ESPERO QUE USTEDES (Subjunctive Irregular)',
    verbCard: 'IR (To go)',
    tenseCard: 'Presente de Subjuntivo · Verbo IR (+)',
    sentenceTemplate: 'Espero que ustedes _____ a la conferencia mañana.',
    fullSentence: 'Espero que ustedes vayan a la conferencia mañana.',
    translation: 'I hope that you all go to the conference tomorrow.',
    correctAnswer: 'vayan',
    options: ['vayan', 'van', 'irán', 'fueron'],
    ruleExplanation: 'After "espero que" (hope/wish), IR uses its irregular Present Subjunctive stem "vay-": "que ustedes vayan".',
    paradigmTitle: 'Presente de Subjuntivo: IR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'vaya' },
      { pronoun: 'Tú', conjugated: 'vayas' },
      { pronoun: 'Nosotros/as', conjugated: 'vayamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'vayan' }
    ]
  },
  {
    id: 'es_conj_b1_14',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'ME ALEGRA QUE TÚ (Emotion + Subjunctive)',
    verbCard: 'ESTAR (To be)',
    tenseCard: 'Presente de Subjuntivo · Emoción (+)',
    sentenceTemplate: 'Me alegra muchísimo que _____ tan contento con tu nuevo puesto.',
    fullSentence: 'Me alegra muchísimo que estés tan contento con tu nuevo puesto.',
    translation: 'I am so glad that you are so happy with your new position.',
    correctAnswer: 'estés',
    options: ['estés', 'estás', 'estarás', 'estabas'],
    ruleExplanation: 'Expressions of emotion ("Me alegra que...", "Siento que...") always trigger the Subjunctive: "que tú estés" (with an accent mark on the -é-).',
    paradigmTitle: 'Presente de Subjuntivo: ESTAR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'esté' },
      { pronoun: 'Tú', conjugated: 'estés' },
      { pronoun: 'Nosotros/as', conjugated: 'estemos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'estén' }
    ]
  },
  {
    id: 'es_conj_b1_15',
    level: 'B1',
    category: 'negative-question',
    subjectCard: 'NO CREO QUE (Doubt / Negated Belief)',
    verbCard: 'HABER (Impersonal Subjunctive)',
    tenseCard: 'Presente de Subjuntivo · HAYA (-)',
    sentenceTemplate: 'No creo que _____ mucho tráfico a esta hora de la noche.',
    fullSentence: 'No creo que haya mucho tráfico a esta hora de la noche.',
    translation: "I don't think there is much traffic at this time of night.",
    correctAnswer: 'haya',
    options: ['haya', 'hay', 'habrá', 'hubo'],
    ruleExplanation: 'While affirmative "Creo que hay..." takes Indicative, negative "No creo que..." expresses doubt and requires the Subjunctive of haber: "haya".',
    paradigmTitle: 'Indicativo vs. Subjuntivo: HABER (Impersonal)',
    paradigmRows: [
      { pronoun: 'Creo que... (Certeza)', conjugated: 'hay tráfico (Indicativo)' },
      { pronoun: 'No creo que... (Duda)', conjugated: 'haya tráfico (Subjuntivo)' }
    ]
  },
  {
    id: 'es_conj_b1_16',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'BUSCAMOS A ALGUIEN QUE (Unknown Antecedent)',
    verbCard: 'SABER (To know how to)',
    tenseCard: 'Presente de Subjuntivo · Antecedente No Específico (+)',
    sentenceTemplate: 'Buscamos a un coordinador que _____ programar en Python.',
    fullSentence: 'Buscamos a un coordinador que sepa programar en Python.',
    translation: 'We are looking for a coordinator who knows how to program in Python.',
    correctAnswer: 'sepa',
    options: ['sepa', 'sabe', 'sabrá', 'supo'],
    ruleExplanation: 'When describing a hypothetical or not-yet-found person ("Buscamos a alguien que..."), Spanish uses the Subjunctive: "que sepa".',
    paradigmTitle: 'Presente de Subjuntivo: SABER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'sepa' },
      { pronoun: 'Tú', conjugated: 'sepas' },
      { pronoun: 'Nosotros/as', conjugated: 'sepamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'sepan' }
    ]
  },
  {
    id: 'es_conj_b1_17',
    level: 'B1',
    category: 'affirmative',
    subjectCard: 'NOSOTROS (Future Irregular)',
    verbCard: 'PODER (To be able to)',
    tenseCard: 'Futuro Simple · Raíz Irregular PODR- (+)',
    sentenceTemplate: 'Con este nuevo sistema, nosotros _____ ahorrar mucho tiempo.',
    fullSentence: 'Con este nuevo sistema, nosotros podremos ahorrar mucho tiempo.',
    translation: 'With this new system, we will be able to save a lot of time.',
    correctAnswer: 'podremos',
    options: ['podremos', 'poderemos', 'podemos', 'pudiéramos'],
    ruleExplanation: 'PODER drops the "e" in the Future and Conditional stem ("podr-"): "nosotros podremos".',
    paradigmTitle: 'Futuro Simple: PODER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'podré' },
      { pronoun: 'Tú', conjugated: 'podrás' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'podrá' },
      { pronoun: 'Nosotros/as', conjugated: 'podremos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'podrán' }
    ]
  },
  {
    id: 'es_conj_b1_18',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'ELLOS (Conditional Irregular)',
    verbCard: 'DECIR (To say / tell)',
    tenseCard: 'Condicional Simple · Raíz DIR- (+)',
    sentenceTemplate: '¿Qué _____ tus socios si les presentamos esta propuesta?',
    fullSentence: '¿Qué dirían tus socios si les presentamos esta propuesta?',
    translation: 'What would your partners say if we present this proposal to them?',
    correctAnswer: 'dirían',
    options: ['dirían', 'decirían', 'dirán', 'decían'],
    ruleExplanation: 'DECIR uses the irregular stem "dir-" in both the Future and Conditional tenses: "ellos dirían".',
    paradigmTitle: 'Condicional Simple: DECIR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'diría' },
      { pronoun: 'Tú', conjugated: 'dirías' },
      { pronoun: 'Nosotros/as', conjugated: 'diríamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'dirían' }
    ]
  },
  {
    id: 'es_conj_b1_19',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'YO (Pluperfect / Past Before Past)',
    verbCard: 'VER (To see)',
    tenseCard: 'Pretérito Pluscuamperfecto · HABÍA + PARTICIPIO (+)',
    sentenceTemplate: 'Antes de este viaje, yo nunca _____ una aurora boreal.',
    fullSentence: 'Antes de este viaje, yo nunca había visto una aurora boreal.',
    translation: 'Before this trip, I had never seen the northern lights.',
    correctAnswer: 'había visto',
    options: ['había visto', 'he visto', 'vi', 'habría visto'],
    ruleExplanation: 'To talk about an experience prior to a past reference point ("Antes de este viaje"), use the Pluperfect: "había + participio" ("había visto").',
    paradigmTitle: 'Pretérito Pluscuamperfecto: VER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'había visto' },
      { pronoun: 'Tú', conjugated: 'habías visto' },
      { pronoun: 'Nosotros/as', conjugated: 'habíamos visto' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'habían visto' }
    ]
  },
  {
    id: 'es_conj_b1_20',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'ANTES DE QUE (Purpose / Time Connector)',
    verbCard: 'IRSE (To leave)',
    tenseCard: 'Antes de que + Presente de Subjuntivo (+)',
    sentenceTemplate: 'Quiero darte las llaves antes de que te _____ a casa.',
    fullSentence: 'Quiero darte las llaves antes de que te vayas a casa.',
    translation: 'I want to give you the keys before you go home.',
    correctAnswer: 'vayas',
    options: ['vayas', 'vas', 'irás', 'fuiste'],
    ruleExplanation: 'Connectors like "antes de que", "para que", "a menos que", and "sin que" ALWAYS require the Subjunctive: "antes de que te vayas".',
    paradigmTitle: 'Conectores que Siempre Exigen Subjuntivo',
    paradigmRows: [
      { pronoun: 'Antes de que (Before)', conjugated: 'antes de que te vayas' },
      { pronoun: 'Para que (So that)', conjugated: 'para que lo sepas' },
      { pronoun: 'A menos que (Unless)', conjugated: 'a menos que llueva' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL B2 (CARDS 13 TO 20)
  // --------------------------------------------------------------------------
  {
    id: 'es_conj_b2_13',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'ERA IMPRESCINDIBLE QUE (Past Necessity)',
    verbCard: 'SABER (To know)',
    tenseCard: 'Imperfecto de Subjuntivo · Raíz SUPIER- (+)',
    sentenceTemplate: 'Era imprescindible que todo el equipo _____ las nuevas normas.',
    fullSentence: 'Era imprescindible que todo el equipo supiera las nuevas normas.',
    translation: 'It was essential that the whole team knew the new rules.',
    correctAnswer: 'supiera',
    options: ['supiera', 'sepa', 'sabía', 'sabría'],
    ruleExplanation: 'When the main clause is in the past ("Era imprescindible que..."), the dependent clause shifts to the Imperfect Subjunctive (supieron → supiera).',
    paradigmTitle: 'Imperfecto de Subjuntivo: SABER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'supiera' },
      { pronoun: 'Tú', conjugated: 'supieras' },
      { pronoun: 'Nosotros/as', conjugated: 'supiéramos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'supieran' }
    ]
  },
  {
    id: 'es_conj_b2_14',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'NOS PIDIERON QUE (Past Request)',
    verbCard: 'TRAER (To bring)',
    tenseCard: 'Imperfecto de Subjuntivo · Raíz TRAJER- (+)',
    sentenceTemplate: 'Nos pidieron que _____ los documentos originales firmados.',
    fullSentence: 'Nos pidieron que trajéramos los documentos originales firmados.',
    translation: 'They asked us to bring the signed original documents.',
    correctAnswer: 'trajéramos',
    options: ['trajéramos', 'trajiéramos', 'traigamos', 'traeríamos'],
    ruleExplanation: 'Derived from "ellos trajeron" (without an "i"), the Imperfect Subjunctive of TRAER is "trajera, trajeras, trajéramos" (never "trajiéramos").',
    paradigmTitle: 'Imperfecto de Subjuntivo: TRAER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'trajera' },
      { pronoun: 'Tú', conjugated: 'trajeras' },
      { pronoun: 'Nosotros/as', conjugated: 'trajéramos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'trajeran' }
    ]
  },
  {
    id: 'es_conj_b2_15',
    level: 'B2',
    category: 'past-perfect',
    subjectCard: 'DUDABA QUE ELLOS (Past Doubt about Prior Action)',
    verbCard: 'TERMINAR (To finish)',
    tenseCard: 'Pluscuamperfecto de Subjuntivo · HUBIERAN + PARTICIPIO (+)',
    sentenceTemplate: 'El cliente dudaba que nosotros _____ el prototipo a tiempo.',
    fullSentence: 'El cliente dudaba que nosotros hubiéramos terminado el prototipo a tiempo.',
    translation: 'The client doubted that we had finished the prototype on time.',
    correctAnswer: 'hubiéramos terminado',
    options: ['hubiéramos terminado', 'hayamos terminado', 'habíamos terminado', 'habríamos terminado'],
    ruleExplanation: 'To express past doubt ("dudaba que") about an action completed even earlier, use the Pluperfect Subjunctive: "hubiéramos terminado".',
    paradigmTitle: 'Pluscuamperfecto de Subjuntivo: TERMINAR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'hubiera terminado' },
      { pronoun: 'Tú', conjugated: 'hubieras terminado' },
      { pronoun: 'Nosotros/as', conjugated: 'hubiéramos terminado' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'hubieran terminado' }
    ]
  },
  {
    id: 'es_conj_b2_16',
    level: 'B2',
    category: 'past-perfect',
    subjectCard: 'PARA FINALES DE ESTE AÑO (Future Milestone)',
    verbCard: 'ABRIR (To open)',
    tenseCard: 'Futuro Compuesto · HABREMOS ABIERTO (+)',
    sentenceTemplate: 'Para finales de este año, ya _____ tres nuevas sucursales.',
    fullSentence: 'Para finales de este año, ya habremos abierto tres nuevas sucursales.',
    translation: 'By the end of this year, we will have already opened three new branches.',
    correctAnswer: 'habremos abierto',
    options: ['habremos abierto', 'habremos abrido', 'abriremos', 'hemos abierto'],
    ruleExplanation: 'Future Perfect ("habremos + participio") expresses an action that will be completed before a future deadline ("Para finales de este año"). Note the irregular participle "abierto".',
    paradigmTitle: 'Futuro Compuesto: ABRIR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'habré abierto' },
      { pronoun: 'Tú', conjugated: 'habrás abierto' },
      { pronoun: 'Él / Ella', conjugated: 'habrá abierto' },
      { pronoun: 'Nosotros/as', conjugated: 'habremos abierto' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'habrán abierto' }
    ]
  },
  {
    id: 'es_conj_b2_17',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'HABRÍA SIDO MEJOR QUE (Past Regret / Advice)',
    verbCard: 'DECIR (To say / tell)',
    tenseCard: 'Pluscuamperfecto de Subjuntivo · HUBIERAS DICHO (+)',
    sentenceTemplate: 'Habría sido mucho mejor que nos _____ la verdad desde el principio.',
    fullSentence: 'Habría sido mucho mejor que nos hubieras dicho la verdad desde el principio.',
    translation: 'It would have been much better if you had told us the truth from the start.',
    correctAnswer: 'hubieras dicho',
    options: ['hubieras dicho', 'habrías dicho', 'hayas dicho', 'dijeras'],
    ruleExplanation: 'After retrospective value judgments ("Habría sido mejor que..."), use the Pluperfect Subjunctive: "que nos hubieras dicho".',
    paradigmTitle: 'Pluscuamperfecto de Subjuntivo: DECIR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'hubiera dicho' },
      { pronoun: 'Tú', conjugated: 'hubieras dicho' },
      { pronoun: 'Nosotros/as', conjugated: 'hubiéramos dicho' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'hubieran dicho' }
    ]
  },
  {
    id: 'es_conj_b2_18',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'HABLA COMO SI (Counterfactual Comparison)',
    verbCard: 'SER (To be)',
    tenseCard: 'COMO SI + Imperfecto de Subjuntivo (+)',
    sentenceTemplate: 'Él opina sobre el proyecto como si _____ el director general.',
    fullSentence: 'Él opina sobre el proyecto como si fuera el director general.',
    translation: 'He gives opinions on the project as if he were the CEO.',
    correctAnswer: 'fuera',
    options: ['fuera', 'es', 'sea', 'sería'],
    ruleExplanation: 'The expression "como si" ("as if / as though") ALWAYS requires the Imperfect or Pluperfect Subjunctive, never the Present Indicative or Present Subjunctive.',
    paradigmTitle: 'Estructura con COMO SI',
    paradigmRows: [
      { pronoun: 'Simultaneous (As if he were)', conjugated: 'como si fuera' },
      { pronoun: 'Prior action (As if he had seen)', conjugated: 'como si hubiera visto' }
    ]
  },
  {
    id: 'es_conj_b2_19',
    level: 'B2',
    category: 'affirmative',
    subjectCard: 'LA EMPRESA (Accumulated Progression)',
    verbCard: 'VENIR + IMPLEMENTAR (To have been implementing)',
    tenseCard: 'Perífrasis Gradual · VENIR + GERUNDIO (+)',
    sentenceTemplate: 'La empresa _____ estas mejoras desde el año pasado.',
    fullSentence: 'La empresa viene implementando estas mejoras desde el año pasado.',
    translation: 'The company has been progressively implementing these improvements since last year.',
    correctAnswer: 'viene implementando',
    options: ['viene implementando', 'viene implementar', 'está implementado', 'va implementar'],
    ruleExplanation: 'In B2 Spanish, "venir + gerundio" ("viene implementando") expresses a gradual process that began in the past and continues accumulating up to the present.',
    paradigmTitle: 'Perífrasis Graduales B2: VENIR / IR + GERUNDIO',
    paradigmRows: [
      { pronoun: 'From past until now', conjugated: 'viene implementando' },
      { pronoun: 'From now into future', conjugated: 'va mejorando poco a poco' }
    ]
  },
  {
    id: 'es_conj_b2_20',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'POR MUCHO QUE (Concessive Effort)',
    verbCard: 'INSISTIR (To insist)',
    tenseCard: 'POR MUCHO QUE + Presente de Subjuntivo (+)',
    sentenceTemplate: 'Por mucho que ellos _____, no cambiaremos las cláusulas del contrato.',
    fullSentence: 'Por mucho que ellos insistan, no cambiaremos las cláusulas del contrato.',
    translation: 'No matter how much they insist, we will not change the contract clauses.',
    correctAnswer: 'insistan',
    options: ['insistan', 'insisten', 'insistirán', 'insistían'],
    ruleExplanation: 'Concessive structures like "Por mucho que..." / "Por más que..." referring to a future or ineffective effort take the Subjunctive: "por mucho que insistan".',
    paradigmTitle: 'Concesivas con POR MUCHO / MÁS QUE',
    paradigmRows: [
      { pronoun: 'Tú', conjugated: 'Por mucho que insistas' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'Por mucho que insistan' }
    ]
  }
];
