import { LessonStep, VocabWord, ExamQuestion } from '../types';

// ============================================================================
// ENGLISH COURSE (FOR SPANISH SPEAKERS) — CEFR B1 (INDEPENDENT THRESHOLD)
// ============================================================================

export const b1EnglishLessons: LessonStep[] = [
  {
    id: 'b1-en-1',
    day: 1,
    title: 'Second Conditional: Hypothetical Worlds & Advice',
    description: 'Expresa situaciones imaginarias en el presente/futuro y da consejos estratégicos con "If I were you".',
    category: 'Hipótesis y Consejos',
    cefrLevel: 'B1',
    grammarFocus: 'If + Past Simple, would + verbo base (If I had time, I would travel)',
    commonMistake: 'Nunca pongas "would" dentro de la cláusula con "If": NO digas "If I would have money", di "If I had money, I would buy it".',
    strategyTip: 'Usa la fórmula fija "If I were you, I would..." para dar consejos elegantes en entrevistas o reuniones profesionales.',
    content: `El **Second Conditional** nos permite hablar de situaciones irreales, hipotéticas o poco probables en el presente o futuro.

### 1. La Fórmula de Oro
- **If + Sujeto + Past Simple**, **Sujeto + would / wouldn't + Verbo Base**
- Ejemplo: *If I lived in London, I would speak English every day.* (Si viviera en Londres, hablaría inglés todos los días).
- Ejemplo: *If she had more free time, she would learn Italian.* (Si ella tuviera más tiempo libre, aprendería italiano).

### 2. El subjuntivo universal con "Were"
En inglés formal y estándar, con el verbo **To Be** usamos **were** para todas las personas en situaciones imaginarias:
- *If I were you, I would accept the job offer.* (Si yo fuera tú, aceptaría la oferta de trabajo).
- *If he were taller, he would play basketball.* (Si él fuera más alto, jugaría baloncesto).

### 3. Preguntas Hipotéticas
- *What would you do if you won the lottery?* (¿Qué harías si ganaras la lotería?)
- *Where would you live if you could choose any country?* (¿Dónde vivirías si pudieras elegir cualquier país?)`,
    dialogue: [
      {
        speaker: 'Elena',
        textEn: 'What would you do if you received a job offer abroad?',
        textEs: '¿Qué harías si recibieras una oferta de trabajo en el extranjero?'
      },
      {
        speaker: 'Marcus',
        textEn: 'If the salary were good, I would move immediately.',
        textEs: 'Si el salario fuera bueno, me mudaría de inmediato.'
      },
      {
        speaker: 'Elena',
        textEn: 'If I were you, I would negotiate remote work first.',
        textEs: 'Yo que tú, negociaría trabajo remoto primero.'
      }
    ],
    quiz: [
      {
        id: 'b1-en-1-q1',
        question: 'Completa la hipótesis: "If I ___ more time, I would learn to play the piano."',
        options: ['have', 'had', 'would have', 'having'],
        correctAnswer: 'had',
        explanation: 'En el Second Conditional, después de "If" siempre va el verbo en Past Simple ("had").'
      },
      {
        id: 'b1-en-1-q2',
        type: 'word-order',
        question: 'Ordena el consejo profesional:',
        options: [],
        wordTiles: ['If', 'I', 'were', 'you,', 'I', 'would', 'accept', 'the', 'offer.'],
        correctAnswer: 'If I were you, I would accept the offer.',
        explanation: '"If I were you, I would..." es la estructura estándar para dar consejos en nivel B1.'
      },
      {
        id: 'b1-en-1-q3',
        question: '¿Cuál de estas oraciones es GRAMATICALMENTE CORRECTA?',
        options: [
          'If she would study harder, she passed.',
          'If she studied harder, she would pass the exam.',
          'If she studies harder, she would pass the exam.',
          'If she studied harder, she will pass.'
        ],
        correctAnswer: 'If she studied harder, she would pass the exam.',
        explanation: 'Combina Past Simple en la condición ("studied") con "would + verbo base" en el resultado ("would pass").'
      }
    ]
  },
  {
    id: 'b1-en-2',
    day: 2,
    title: 'Present Perfect Continuous: Duration & Ongoing Processes',
    description: 'Conecta acciones que empezaron en el pasado y continúan activas hoy usando "have been + -ing".',
    category: 'Tiempos Perfectos',
    cefrLevel: 'B1',
    grammarFocus: 'Have / Has + been + Verbo-ING + for / since',
    commonMistake: 'En español decimos "Llevo 3 años trabajando aquí" (Presente). En inglés es un error grave decir "I am working here for 3 years"; debes decir "I have been working here for 3 years".',
    strategyTip: 'Enfócate en "Present Perfect Simple" para el resultado completado (I have read 3 books) y "Present Perfect Continuous" para enfatizar el tiempo o esfuerzo invertido (I have been reading all morning).',
    content: `Cuando quieres expresar cuánto tiempo llevas haciendo una actividad que aún no termina, el inglés utiliza el **Present Perfect Continuous**.

### 1. Estructura
- **Sujeto + have / has + been + Verbo con -ING**
- *I have been studying English for two years.* (Llevo dos años estudiando inglés).
- *She has been working on this project since Monday.* (Ella lleva trabajando en este proyecto desde el lunes).

### 2. For vs. Since (Repaso de Precisión)
- **For + duración**: *for three hours, for five months, for a long time.*
- **Since + punto de inicio**: *since 2022, since 8:00 AM, since I arrived.*

### 3. Evidencia Visible en el Presente
También se usa cuando una actividad reciente deja una señal evidente ahora mismo:
- *Why are you out of breath? — I have been running.* (¿Por qué estás sin aliento? — He estado corriendo).
- *It has been raining all afternoon, the streets are wet.* (Ha estado lloviendo toda la tarde, las calles están mojadas).`,
    dialogue: [
      {
        speaker: 'Sarah',
        textEn: 'How long have you been living in Madrid?',
        textEs: '¿Cuánto tiempo llevas viviendo en Madrid?'
      },
      {
        speaker: 'David',
        textEn: 'I have been living here since 2021, and I love it.',
        textEs: 'Llevo viviendo aquí desde 2021 y me encanta.'
      },
      {
        speaker: 'Sarah',
        textEn: 'Have you been working at the same company all this time?',
        textEs: '¿Has estado trabajando en la misma empresa todo este tiempo?'
      }
    ],
    quiz: [
      {
        id: 'b1-en-2-q1',
        question: '¿Cómo traduces correctamente "Llevo tres horas esperando"?',
        options: [
          'I am waiting for three hours.',
          'I have been waiting for three hours.',
          'I wait since three hours.',
          'I has been waiting for three hours.'
        ],
        correctAnswer: 'I have been waiting for three hours.',
        explanation: 'Para expresar "llevar + tiempo + gerundio" usamos "have/has been + verbo-ing".'
      },
      {
        id: 'b1-en-2-q2',
        type: 'word-order',
        question: 'Ordena la pregunta sobre duración:',
        options: [],
        wordTiles: ['How', 'long', 'have', 'you', 'been', 'studying', 'here?'],
        correctAnswer: 'How long have you been studying here?',
        explanation: 'La estructura interrogativa es: How long + have/has + sujeto + been + verbo-ing?'
      },
      {
        id: 'b1-en-2-q3',
        question: 'Completa: "She ___ been feeling well since yesterday."',
        options: ['haven\'t', 'hasn\'t', 'isn\'t', 'didn\'t'],
        correctAnswer: 'hasn\'t',
        explanation: 'Con tercera persona singular (She) usamos el auxiliar "has / hasn\'t".'
      }
    ]
  },
  {
    id: 'b1-en-3',
    day: 3,
    title: 'Passive Voice: Objective & Professional Communication',
    description: 'Aprende a destacar el resultado o el objeto de una acción usando la voz pasiva en presente y pasado.',
    category: 'Gramática Estructural',
    cefrLevel: 'B1',
    grammarFocus: 'Be (am/is/are / was/were) + Past Participle (+ by agent)',
    commonMistake: 'En español usamos mucho "Se vende / Se habla / Construyeron el puente". En inglés profesional, se prefiere la Voz Pasiva: "English is spoken", "The bridge was built".',
    strategyTip: 'Identifica primero el tiempo verbal del verbo "To Be" (is/are para presente, was/were para pasado) y añade siempre el Past Participle (3ra columna).',
    content: `La **Voz Pasiva (Passive Voice)** es esencial en noticias, ciencia, negocios y lenguaje formal cuando lo importante es **qué ocurrió** y no quién lo hizo.

### 1. Present Simple Passive (am / is / are + Participio)
- *Coffee is grown in Colombia.* (El café se cultiva en Colombia).
- *Thousands of emails are sent every second.* (Miles de correos se envían cada segundo).

### 2. Past Simple Passive (was / were + Participio)
- *This building was designed in 1995.* (Este edificio fue diseñado en 1995).
- *The meetings were cancelled due to the storm.* (Las reuniones fueron canceladas debido a la tormenta).

### 3. ¿Cuándo usar "by"?
Solo añadimos **by + autor** cuando el creador aporta información relevante:
- *The telephone was invented by Alexander Graham Bell.*`,
    dialogue: [
      {
        speaker: 'Tour Guide',
        textEn: 'This castle was built in the fifteenth century.',
        textEs: 'Este castillo fue construido en el siglo XV.'
      },
      {
        speaker: 'Visitor',
        textEn: 'Is it still used for official ceremonies today?',
        textEs: '¿Todavía se utiliza para ceremonias oficiales hoy en día?'
      },
      {
        speaker: 'Tour Guide',
        textEn: 'Yes, it is visited by thousands of tourists every month.',
        textEs: 'Sí, es visitado por miles de turistas cada mes.'
      }
    ],
    quiz: [
      {
        id: 'b1-en-3-q1',
        question: 'Completa en voz pasiva pasada: "The new software ___ developed last year."',
        options: ['is', 'was', 'were', 'did'],
        correctAnswer: 'was',
        explanation: '"The new software" es singular y "last year" indica pasado, por lo que usamos "was + participio".'
      },
      {
        id: 'b1-en-3-q2',
        type: 'word-order',
        question: 'Construye la oración pasiva:',
        options: [],
        wordTiles: ['Spanish', 'is', 'spoken', 'in', 'many', 'countries.'],
        correctAnswer: 'Spanish is spoken in many countries.',
        explanation: 'Equivale a "Se habla español en muchos países" (is + spoken).'
      },
      {
        id: 'b1-en-3-q3',
        question: 'Elige la opción correcta: "These cars ___ made in Germany."',
        options: ['is', 'are', 'was', 'have'],
        correctAnswer: 'are',
        explanation: '"These cars" es plural, por lo que requiere "are + Past Participle (made)".'
      }
    ]
  },
  {
    id: 'b1-en-4',
    day: 4,
    title: 'Reported Speech: Relaying Conversations & News',
    description: 'Domina el estilo indirecto (Backshift) y la diferencia exacta entre "Say" y "Tell".',
    category: 'Comunicación Avanzada',
    cefrLevel: 'B1',
    grammarFocus: 'Direct → Indirect Backshift (Present → Past, Will → Would, Can → Could)',
    commonMistake: 'No confundas SAY y TELL: "Tell" requiere un objeto personal inmediatamente después ("She told me"), mientras que "Say" no ("She said that..."). Nunca digas "She said me".',
    strategyTip: 'Imagina dar un paso atrás en el tiempo: am/is → was, have/has → had, will → would, can → could.',
    content: `El **Reported Speech (Estilo Indirecto)** sirve para contar a otra persona lo que alguien dijo previamente.

### 1. El Salto Atrás en el Tiempo (Tense Backshift)
- **Present Simple → Past Simple**: *"I work here"* → *He said (that) he **worked** there.*
- **Present Continuous → Past Continuous**: *"I am studying"* → *She said she **was studying**.*
- **Will → Would**: *"I will call you"* → *He told me he **would call** me.*
- **Can → Could**: *"I can help"* → *She said she **could help**.*

### 2. Say vs. Tell
- **Say + (that)**: *He said that the meeting was over.*
- **Tell + alguien (me/you/him/her/us) + (that)**: *He told **me** that the meeting was over.*

### 3. Preguntas en Estilo Indirecto (Sin auxiliar do/did y orden afirmativo)
- Directa: *"Where do you live?"*
- Indirecta: *She asked me **where I lived**.* (No digas: *where did I live*).`,
    dialogue: [
      {
        speaker: 'Clara',
        textEn: 'Did you talk to Daniel about the contract?',
        textEs: '¿Hablaste con Daniel sobre el contrato?'
      },
      {
        speaker: 'Leo',
        textEn: 'Yes, he told me that he would sign it tomorrow morning.',
        textEs: 'Sí, me dijo que lo firmaría mañana por la mañana.'
      },
      {
        speaker: 'Clara',
        textEn: 'Great! He also said that his team was ready to start.',
        textEs: '¡Genial! También dijo que su equipo estaba listo para empezar.'
      }
    ],
    quiz: [
      {
        id: 'b1-en-4-q1',
        question: 'Pasa a estilo indirecto: Maria said, "I will finish the report today." → Maria said that she ___ finish the report.',
        options: ['will', 'would', 'can', 'had'],
        correctAnswer: 'would',
        explanation: 'En Reported Speech, el auxiliar futuro "will" retrocede a "would".'
      },
      {
        id: 'b1-en-4-q2',
        question: 'Completa con el verbo correcto: "He ___ me that he was tired."',
        options: ['said', 'told', 'spoke', 'talked'],
        correctAnswer: 'told',
        explanation: 'Cuando hay un pronombre personal receptor ("me"), es obligatorio usar "told" y no "said".'
      },
      {
        id: 'b1-en-4-q3',
        type: 'word-order',
        question: 'Ordena la pregunta indirecta:',
        options: [],
        wordTiles: ['She', 'asked', 'me', 'where', 'I', 'worked.'],
        correctAnswer: 'She asked me where I worked.',
        explanation: 'Las preguntas reportadas mantienen el orden Sujeto + Verbo sin el auxiliar "did".'
      }
    ]
  },
  {
    id: 'b1-en-5',
    day: 5,
    title: 'Relative Clauses & Precision Descriptions',
    description: 'Une ideas complejas con fluidez usando "who, which, that, where, whose".',
    category: 'Fluidez Sintáctica',
    cefrLevel: 'B1',
    grammarFocus: 'Defining & Non-defining Relative Clauses (who, which, that, where, whose)',
    commonMistake: 'En español usamos "que" para todo ("la persona que...", "el lugar que..."). En inglés debes distinguir: WHO (personas), WHICH (cosas), WHERE (lugares) y WHOSE (posesión: "cuyo").',
    strategyTip: 'Usa cláusulas relativas para definir una palabra que no recuerdas en una conversación ("It is a tool which is used for...").',
    content: `Las **Relative Clauses** permiten unir dos oraciones simples en una oración sofisticada de nivel B1 sin repetir palabras.

### 1. Los Pronombres Relativos Clave
- **WHO / THAT** (Personas): *The architect **who** designed this bridge is famous.*
- **WHICH / THAT** (Cosas o ideas): *The laptop **which** I bought last week is very fast.*
- **WHERE** (Lugares): *This is the neighborhood **where** I grew up.*
- **WHOSE** (Posesión — cuyo/a): *She is the manager **whose** team won the award.*

### 2. Información Esencial vs. Extra (Comas)
- Sin comas (Defining): *The students who passed the exam celebrated.* (Especifica qué estudiantes).
- Entre comas (Non-defining — nunca uses "that" después de coma): *My brother, **who** lives in Toronto, is an engineer.*`,
    dialogue: [
      {
        speaker: 'Hannah',
        textEn: 'Who is the woman who is talking to the director?',
        textEs: '¿Quién es la mujer que está hablando con el director?'
      },
      {
        speaker: 'Victor',
        textEn: 'She is the consultant whose strategy doubled our sales.',
        textEs: 'Ella es la consultora cuya estrategia duplicó nuestras ventas.'
      }
    ],
    quiz: [
      {
        id: 'b1-en-5-q1',
        question: 'Completa: "He is the writer ___ book won the international prize."',
        options: ['who', 'which', 'whose', 'where'],
        correctAnswer: 'whose',
        explanation: '"Whose" expresa posesión ("cuyo libro ganó el premio").'
      },
      {
        id: 'b1-en-5-q2',
        question: 'Completa: "That is the cafe ___ we met for the first time."',
        options: ['which', 'where', 'who', 'whose'],
        correctAnswer: 'where',
        explanation: 'Para lugares donde ocurre una acción usamos "where".'
      },
      {
        id: 'b1-en-5-q3',
        type: 'word-order',
        question: 'Ordena la oración con cláusula relativa:',
        options: [],
        wordTiles: ['The', 'engineer', 'who', 'fixed', 'the', 'system', 'is', 'brilliant.'],
        correctAnswer: 'The engineer who fixed the system is brilliant.',
        explanation: '"Who" conecta al sujeto humano ("The engineer") con la acción que realizó.'
      }
    ]
  },
  {
    id: 'b1-en-6',
    day: 6,
    title: 'Past Perfect & Narrative Sequencing (Had + Participle)',
    description: 'Narra historias con orden cronológico preciso usando el pasado del pasado ("had already done").',
    category: 'Narrativa Avanzada',
    cefrLevel: 'B1',
    grammarFocus: 'Had + Past Participle en combinación con Past Simple (When / By the time)',
    commonMistake: 'Evita contar todo en Past Simple plano. Si una acción ocurrió ANTES que otra acción pasada, usa "had + participio".',
    strategyTip: 'Combina "By the time + Past Simple" con "had already + Participle" para sonar como un narrador avanzado.',
    content: `El **Past Perfect (Pluscuamperfecto)** indica que un evento ocurrió **antes** que otro momento en el pasado.

### 1. Estructura
- **Sujeto + had / hadn't + Past Participle**
- *When I arrived at the station, the train **had already left**.* (Cuando llegué a la estación, el tren ya se había ido).
- *She passed the exam easily because she **had studied** for weeks.* (Aprobó fácilmente porque había estudiado durante semanas).

### 2. Conectores Clave de Secuencia
- **By the time** (Para cuando): *By the time the meeting started, we had prepared all the documents.*
- **Already / Just / Never**: *I realized I had left my keys at home.*`,
    dialogue: [
      {
        speaker: 'Lucas',
        textEn: 'Did you see Emma at the conference yesterday?',
        textEs: '¿Viste a Emma en la conferencia ayer?'
      },
      {
        speaker: 'Nora',
        textEn: 'No, by the time I arrived, she had already given her presentation and left.',
        textEs: 'No, para cuando llegué, ella ya había dado su presentación y se había ido.'
      }
    ],
    quiz: [
      {
        id: 'b1-en-6-q1',
        question: 'Completa: "When we got to the cinema, the movie ___ already started."',
        options: ['has', 'had', 'was', 'did'],
        correctAnswer: 'had',
        explanation: 'La película empezó antes de que llegáramos en el pasado: Past Perfect ("had started").'
      },
      {
        id: 'b1-en-6-q2',
        type: 'word-order',
        question: 'Ordena la frase cronológica:',
        options: [],
        wordTiles: ['I', 'was', 'hungry', 'because', 'I', 'hadn\'t', 'eaten', 'breakfast.'],
        correctAnswer: 'I was hungry because I hadn\'t eaten breakfast.',
        explanation: 'La causa anterior en el pasado va en Past Perfect ("hadn\'t eaten").'
      }
    ]
  },
  {
    id: 'b1-en-7',
    day: 7,
    title: 'Past Habits (Used to) & Modals of Deduction (Must / Can\'t / Might)',
    description: 'Expresa hábitos del pasado que ya cambiaron y deduce situaciones presentes con lógica modal.',
    category: 'Modales y Matices',
    cefrLevel: 'B1',
    grammarFocus: 'Used to + verbo base / didn\'t use to | Must / Might / Can\'t + be',
    commonMistake: 'Para hábitos presentes NO uses "I use to"; usa un adverbio como "I usually...". "Used to" es EXCLUSIVO para el pasado ("Solía...").',
    strategyTip: 'En deducciones lógicas, lo opuesto de "He must be rich" (Seguro es rico) NO es "mustn\'t", sino "He can\'t be rich" (Es imposible que sea rico).',
    content: `Esta lección une dos herramientas de precisión muy frecuentes en nivel B1:

### 1. Hábitos del Pasado con "Used to"
- **Afirmativo**: *I **used to** live in a small town, but now I live in the capital.* (Solía vivir en un pueblo pequeño).
- **Negativo**: *I **didn't use to** like coffee, but now I drink it every morning.* (Fíjate que pierde la "d" al llevar *didn't*).
- **Pregunta**: *Did you **use to** play any instrument at school?*

### 2. Modales de Deducción en el Presente
- **MUST be** (95% seguro de que sí): *She has worked for 12 hours; she **must be** exhausted.*
- **MIGHT / COULD be** (50% posibilidad): *Don't call him now, he **might be** in a meeting.*
- **CAN'T be** (95% seguro de que es imposible): *That **can't be** true! I just saw him five minutes ago.*`,
    dialogue: [
      {
        speaker: 'Oliver',
        textEn: 'Did you use to work in this building?',
        textEs: '¿Solías trabajar en este edificio?'
      },
      {
        speaker: 'Sofia',
        textEn: 'Yes, I used to have an office on the top floor five years ago.',
        textEs: 'Sí, solía tener una oficina en el último piso hace cinco años.'
      }
    ],
    quiz: [
      {
        id: 'b1-en-7-q1',
        question: 'Completa la deducción lógica: "The lights are off and nobody answers. They ___ be at home."',
        options: ['mustn\'t', 'can\'t', 'shouldn\'t', 'used to'],
        correctAnswer: 'can\'t',
        explanation: 'Para deducir que algo es lógicamente imposible usamos "can\'t be".'
      },
      {
        id: 'b1-en-7-q2',
        question: 'Elige la negación correcta de hábito pasado: "I ___ like vegetables when I was a child."',
        options: ['didn\'t used to', 'didn\'t use to', 'don\'t use to', 'wasn\'t used to'],
        correctAnswer: 'didn\'t use to',
        explanation: 'Con el auxiliar "didn\'t", el verbo vuelve a su forma base sin "d": "didn\'t use to".'
      }
    ]
  },
  {
    id: 'b1-en-8',
    day: 8,
    title: 'Essential Phrasal Verbs & Discourse Connectors',
    description: 'Habla con naturalidad usando Phrasal Verbs cotidianos y conectores de contraste (Although, Despite, However).',
    category: 'Fluidez Natural B1',
    cefrLevel: 'B1',
    grammarFocus: 'Phrasal Verbs & Contrast Connectors (Although + clause vs Despite + noun/-ing)',
    commonMistake: 'Después de "Despite" o "In spite of" NUNCA pongas sujeto+verbo directamente; usa un sustantivo o verbo en -ING ("Despite the rain" / "Despite being tired").',
    strategyTip: 'Aprende los Phrasal Verbs en contexto de frases completas en lugar de listas aisladas.',
    content: `Para alcanzar el **Certificado B1**, necesitas dominar los verbos compuestos (*Phrasal Verbs*) y los conectores que estructuran tus ideas.

### 1. Top 6 Phrasal Verbs de Nivel B1
- **Give up** (Rendirse / dejar un hábito): *Never give up on your goals.*
- **Look forward to + ING** (Esperar con ilusión): *I look forward to hearing from you.*
- **Run out of** (Quedarse sin algo): *We ran out of milk this morning.*
- **Turn down** (Rechazar una oferta / bajar volumen): *He turned down the job offer.*
- **Find out** (Descubrir / averiguar): *I just found out the truth.*
- **Carry on** (Continuar): *Please carry on with your presentation.*

### 2. Conectores de Contraste: Although vs. Despite vs. However
- **Although + Sujeto + Verbo**: ***Although** it was raining, we went for a walk.*
- **Despite + Sustantivo / Verbo-ING**: ***Despite** the rain, we went for a walk.*
- **However** (Sin embargo — entre punto y coma): *The exam was hard. **However**, I passed.*`,
    dialogue: [
      {
        speaker: 'Liam',
        textEn: 'Although the project was challenging, our team never gave up.',
        textEs: 'Aunque el proyecto fue desafiante, nuestro equipo nunca se rindió.'
      },
      {
        speaker: 'Maya',
        textEn: 'Exactly! I am really looking forward to launching it next week.',
        textEs: '¡Exacto! Tengo muchas ganas de lanzarlo la próxima semana.'
      }
    ],
    quiz: [
      {
        id: 'b1-en-8-q1',
        question: 'Atención al gerundio: "I look forward to ___ you at the conference."',
        options: ['see', 'seeing', 'saw', 'seen'],
        correctAnswer: 'seeing',
        explanation: 'En "look forward to", "to" es una preposición, por lo que el verbo siguiente SIEMPRE lleva -ING ("seeing").'
      },
      {
        id: 'b1-en-8-q2',
        question: 'Completa: "We need to go to the supermarket because we ___ coffee."',
        options: ['turned down', 'ran out of', 'gave up', 'looked after'],
        correctAnswer: 'ran out of',
        explanation: '"Run out of" significa quedarse sin suministros de algo.'
      }
    ]
  }
];

// ============================================================================
// ENGLISH COURSE (FOR SPANISH SPEAKERS) — CEFR B2 (ADVANCED & PERFECTION)
// ============================================================================

export const b2EnglishLessons: LessonStep[] = [
  {
    id: 'b2-en-1',
    day: 1,
    title: 'Third & Mixed Conditionals: Past Counterfactuals',
    description: 'Perfecciona tu capacidad de analizar el pasado ("Si hubiera sabido, habría actuado distinto").',
    category: 'Perfeccionamiento Sintáctico',
    cefrLevel: 'B2',
    grammarFocus: 'If + Past Perfect (had + participle), would have + Past Participle',
    commonMistake: 'Evita decir "If I would have known". La regla de oro se mantiene en B2: después de "If" va "had known", y en el resultado "would have + participio".',
    strategyTip: 'En conversación hablada, los nativos contraen ambos auxiliares: "If I\'d known, I would\'ve told you".',
    content: `El **Third Conditional** es la cumbre del análisis hipotético: nos permite reflexionar sobre el pasado e imaginar cómo habría cambiado el resultado.

### 1. Estructura del Third Conditional (Pasado → Pasado)
- **If + Sujeto + had + Past Participle**, **Sujeto + would / could / might + have + Past Participle**
- *If you **had told** me about the problem, I **would have helped** you.* (Si me hubieras contado sobre el problema, te habría ayudado).
- *If we **hadn't missed** the flight, we **would have arrived** on time.*

### 2. Mixed Conditional (Causa en el Pasado → Resultado en el Presente)
Cuando una decisión del pasado afecta directamente quién eres o dónde estás **hoy**:
- **If + Past Perfect**, **Sujeto + would + Verbo Base (now)**
- *If I **had accepted** that scholarship in 2020, I **would live** in Boston now.*`,
    dialogue: [
      {
        speaker: 'Claire',
        textEn: 'If we had invested in that technology earlier, we would have doubled our market share.',
        textEs: 'Si hubiéramos invertido antes en esa tecnología, habríamos duplicado nuestra cuota de mercado.'
      },
      {
        speaker: 'Arthur',
        textEn: 'True, but we could not have predicted how fast the industry would change.',
        textEs: 'Cierto, pero no habríamos podido predecir qué tan rápido cambiaría la industria.'
      }
    ],
    quiz: [
      {
        id: 'b2-en-1-q1',
        question: 'Completa el Third Conditional: "If she had studied medicine, she ___ become a surgeon."',
        options: ['would', 'would have', 'will have', 'had'],
        correctAnswer: 'would have',
        explanation: 'El resultado en el pasado requiere "would have + Past Participle (become)".'
      },
      {
        id: 'b2-en-1-q2',
        type: 'word-order',
        question: 'Ordena la oración hipotética sobre el pasado:',
        options: [],
        wordTiles: ['If', 'I', 'had', 'known,', 'I', 'would', 'have', 'called', 'you.'],
        correctAnswer: 'If I had known, I would have called you.',
        explanation: '"If I had known, I would have..." equivale a "Si lo hubiera sabido, te habría llamado".'
      }
    ]
  },
  {
    id: 'b2-en-2',
    day: 2,
    title: 'Future Perfect & Future Continuous: Strategic Forecasting',
    description: 'Proyecta metas cumplidas en el futuro ("By 2027, I will have mastered...") y acciones en progreso.',
    category: 'Proyección Ejecutiva',
    cefrLevel: 'B2',
    grammarFocus: 'Will have + Past Participle (By...) vs. Will be + Verbo-ING (At this time tomorrow)',
    commonMistake: 'Cuando uses la preposición "By" (Para tal fecha: "By next month"), usa Future Perfect ("will have finished"), no Future Simple.',
    strategyTip: 'Usa "Will be + -ing" para preguntar planes con mucha cortesía sin presionar: "Will you be using the car today?".',
    content: `En el nivel **B2**, ya no solo hablas del futuro simple; distingues entre una acción que estará **en curso** y una meta que ya estará **completada**.

### 1. Future Continuous (Will be + Verbo-ING)
Para acciones en pleno desarrollo en un momento específico del futuro:
- *This time tomorrow, I **will be flying** to Tokyo.* (Mañana a esta hora, estaré volando a Tokio).

### 2. Future Perfect (Will have + Past Participle)
Para acciones que ya habrán concluido antes de una fecha límite (*By...*):
- *By the end of this year, we **will have completed** all four CEFR levels.* (Para finales de este año, habremos completado los cuatro niveles MCER).`,
    dialogue: [
      {
        speaker: 'Director',
        textEn: 'By Friday afternoon, will the engineering team have finished the security audit?',
        textEs: 'Para el viernes por la tarde, ¿el equipo de ingeniería habrá terminado la auditoría de seguridad?'
      },
      {
        speaker: 'Lead',
        textEn: 'Yes, and by Monday morning we will be deploying the new version.',
        textEs: 'Sí, y el lunes por la mañana estaremos desplegando la nueva versión.'
      }
    ],
    quiz: [
      {
        id: 'b2-en-2-q1',
        question: 'Completa: "By 2028, she ___ graduated from university."',
        options: ['will be', 'will have', 'would', 'has'],
        correctAnswer: 'will have',
        explanation: '"By + fecha futura" activa el Future Perfect: "will have + participio".'
      },
      {
        id: 'b2-en-2-q2',
        question: 'Completa: "Don\'t call me at 8 PM because I ___ having dinner with clients."',
        options: ['will have', 'will be', 'am', 'would have'],
        correctAnswer: 'will be',
        explanation: 'Expresa una acción en progreso en un punto exacto del futuro ("will be having").'
      }
    ]
  },
  {
    id: 'b2-en-3',
    day: 3,
    title: 'Past Modals of Deduction & Regret (Should have / Must have)',
    description: 'Evalúa decisiones pasadas y haz deducciones retrospectivas con precisión nativa.',
    category: 'Lógica y Evaluación',
    cefrLevel: 'B2',
    grammarFocus: 'Should have / Could have / Must have / Can\'t have + Past Participle',
    commonMistake: 'Nunca pongas "of" después de un modal ("should of" es un error ortográfico por cómo suena la contracción "should\'ve"). Escribe siempre "should have".',
    strategyTip: 'Usa "should have + participio" para críticas constructivas y "must have + participio" para conclusiones lógicas sobre el pasado.',
    content: `Los **Modales Perfectos (Modal + have + Past Participle)** te permiten juzgar o deducir hechos ya ocurridos:

### 1. Crítica o Arrepentimiento: Should have / Shouldn't have
- *You **should have backed up** your files before updating.* (Deberías haber hecho una copia de seguridad antes de actualizar).
- *I **shouldn't have said** that in the meeting.* (No debería haber dicho eso).

### 2. Deducción Certera del Pasado: Must have / Can't have
- *The ground is completely wet; it **must have rained** last night.* (Seguro que llovió anoche).
- *He **can't have written** this report alone in ten minutes.* (Es imposible que haya escrito este informe solo en diez minutos).`,
    dialogue: [
      {
        speaker: 'Natalie',
        textEn: 'Where is my phone? I must have left it in the taxi!',
        textEs: '¿Dónde está mi teléfono? ¡Debo haberlo dejado en el taxi!'
      },
      {
        speaker: 'Sam',
        textEn: 'You should have called the driver right away, let us check the app.',
        textEs: 'Deberías haber llamado al conductor de inmediato, revisemos la aplicación.'
      }
    ],
    quiz: [
      {
        id: 'b2-en-3-q1',
        question: 'Expresa arrepentimiento: "I failed the test. I ___ studied harder."',
        options: ['must have', 'should have', 'can\'t have', 'may'],
        correctAnswer: 'should have',
        explanation: '"Should have + participio" indica lo que era recomendable hacer en el pasado pero no se hizo.'
      },
      {
        id: 'b2-en-3-q2',
        question: 'Deducción lógica del pasado: "She wasn\'t in the office yesterday; she ___ taken the day off."',
        options: ['must have', 'should', 'can', 'would'],
        correctAnswer: 'must have',
        explanation: '"Must have + participio" expresa una conclusión lógica casi segura sobre el pasado.'
      }
    ]
  },
  {
    id: 'b2-en-4',
    day: 4,
    title: 'Inversions & Emphatic Cleft Sentences (Not only... / Rarely...)',
    description: 'Domina la retórica persuasiva invirtiendo el orden sujeto-auxiliar para causar máximo impacto.',
    category: 'Retórica y Estilo B2',
    cefrLevel: 'B2',
    grammarFocus: 'Negative Adverbials + Auxiliar + Sujeto (Not only did we... / Never have I...)',
    commonMistake: 'Cuando empiezas una frase con "Never", "Rarely" o "Not only", DEBES invertir el auxiliar como si fuera una pregunta ("Never have I seen", NO "Never I have seen").',
    strategyTip: 'Incluir una sola inversión ("Not only does this improve efficiency, but it also reduces costs") en un ensayo o presentación eleva tu calificación inmediatamente a nivel B2/C1.',
    content: `En el inglés de alto nivel, cambiar el orden de la oración crea un énfasis poderoso y elegante.

### 1. Inversión con Adverbios Negativos
Cuando colocamos **Never, Rarely, Seldom, Not only** al inicio absoluto de la frase, invertimos **Auxiliar + Sujeto**:
- ***Never have I** seen such an impressive presentation.* (Jamás he visto una presentación tan impresionante).
- ***Not only did she** finish on time, **but she also** exceeded expectations.* (No solo terminó a tiempo, sino que además superó las expectativas).

### 2. Cleft Sentences (Oraciones Hendidas con "What...")
Para enfocar la atención del oyente:
- Normal: *We need clear communication.*
- Enfática B2: ***What we really need is** clear communication.* (Lo que realmente necesitamos es comunicación clara).`,
    dialogue: [
      {
        speaker: 'Keynote Speaker',
        textEn: 'Not only did our team solve the crisis, but we also created a new patent.',
        textEs: 'Nuestro equipo no solo resolvió la crisis, sino que también creamos una nueva patente.'
      },
      {
        speaker: 'Investor',
        textEn: 'Rarely do we see such rapid execution in this sector.',
        textEs: 'Rara vez vemos una ejecución tan rápida en este sector.'
      }
    ],
    quiz: [
      {
        id: 'b2-en-4-q1',
        question: 'Elige la inversión correcta de nivel B2: "Never ___ such a breathtaking view."',
        options: ['I have seen', 'have I seen', 'I saw', 'did I saw'],
        correctAnswer: 'have I seen',
        explanation: 'Tras "Never" al inicio de la oración, invertimos el auxiliar y el sujeto: "Never have I seen".'
      },
      {
        id: 'b2-en-4-q2',
        type: 'word-order',
        question: 'Construye la oración enfática (Cleft Sentence):',
        options: [],
        wordTiles: ['What', 'we', 'need', 'is', 'a', 'better', 'strategy.'],
        correctAnswer: 'What we need is a better strategy.',
        explanation: '"What + sujeto + verbo + is..." enfatiza el elemento clave de la frase.'
      }
    ]
  },
  {
    id: 'b2-en-5',
    day: 5,
    title: 'Causative (Have/Get Something Done) & Wishes (I wish / If only)',
    description: 'Expresa servicios encargados a profesionales y deseos sobre el presente o el pasado.',
    category: 'Estructuras Avanzadas',
    cefrLevel: 'B2',
    grammarFocus: 'Have / Get + Objeto + Past Participle | I wish + Past Simple / Past Perfect',
    commonMistake: 'Si dices "I cut my hair", significa que tú mismo tomaste las tijeras. Para decir que fuiste a la peluquería, debes usar el Causativo: "I had my hair cut".',
    strategyTip: 'Recuerda: "I wish + Past Simple" expresa un deseo sobre el PRESENTE (I wish I spoke French), mientras que "I wish + Past Perfect" expresa un lamento sobre el PASADO (I wish I had studied more).',
    content: `Dos estructuras que distinguen a un hablante intermedio de un hablante **avanzado B2**:

### 1. The Causative: Have / Get + Objeto + Past Participle
Se usa cuando contratas o encargas a alguien más que realice un servicio por ti:
- *I **had my car repaired** yesterday.* (Hice reparar mi auto ayer / Llevé a reparar mi auto).
- *We are going to **get the roof fixed** before winter.* (Vamos a hacer arreglar el techo antes del invierno).

### 2. Wishes & Regrets (I wish / If only)
- **Deseo para cambiar el presente (I wish + Past Simple)**:
  - *I wish I **knew** the answer.* (Ojalá supiera la respuesta ahora).
- **Lamento sobre el pasado (I wish + had + Participio)**:
  - *I wish I **had arrived** earlier.* (Ojalá hubiera llegado más temprano).`,
    dialogue: [
      {
        speaker: 'Julian',
        textEn: 'Your house looks amazing! Did you paint it yourself?',
        textEs: '¡Tu casa luce increíble! ¿La pintaste tú mismo?'
      },
      {
        speaker: 'paula',
        textEn: 'No, we had it painted last month. I wish we had done it years ago!',
        textEs: 'No, la hicimos pintar el mes pasado. ¡Ojalá lo hubiéramos hecho hace años!'
      }
    ],
    quiz: [
      {
        id: 'b2-en-5-q1',
        question: 'Completa con estructura causativa: "I need to have my laptop ___ today."',
        options: ['fix', 'fixed', 'fixing', 'to fix'],
        correctAnswer: 'fixed',
        explanation: 'La fórmula causativa es "have + objeto + Past Participle (fixed)".'
      },
      {
        id: 'b2-en-5-q2',
        question: 'Expresa un deseo sobre el presente: "I wish I ___ more free time right now."',
        options: ['have', 'had', 'will have', 'would have'],
        correctAnswer: 'had',
        explanation: 'Para deseos sobre el presente, "I wish" va seguido de Past Simple ("had").'
      }
    ]
  },
  {
    id: 'b2-en-6',
    day: 6,
    title: 'Executive Register, Idioms & Nuanced Debate',
    description: 'Domina modismos de negocios, matizadores diplomáticos (Hedging) y argumentación de nivel B2.',
    category: 'Maestría Comunicativa B2',
    cefrLevel: 'B2',
    grammarFocus: 'Academic & Business Idioms, Hedging, and Formal Connectors (Nevertheless, Whereas)',
    commonMistake: 'Evita sonar demasiado brusco en inglés profesional diciendo "You are wrong". Usa lenguaje diplomático (Hedging): "I see your point, actual data seems to suggest otherwise".',
    strategyTip: 'Usa "Whereas" (Mientras que) para contrastar dos datos elegantes en una sola frase.',
    content: `Para perfeccionar tu inglés en contextos ejecutivos y académicos, necesitas **diplomacia lingüística** y expresiones idiomáticas precisas.

### 1. Modismos de Alta Frecuencia (B2 Idioms)
- **To hit the nail on the head**: Dar exactamente en el clavo.
- **To be on the same page**: Estar en sintonía / de acuerdo en un equipo.
- **A blessing in disguise**: No hay mal que por bien no venga.
- **To go the extra mile**: Dar un esfuerzo adicional extraordinario.

### 2. Conectores de Alto Registro
- **Whereas** (Mientras que — contraste directo): *Sales increased in Europe, **whereas** Asia remained stable.*
- **Nevertheless / Nonetheless** (No obstante): *The market is volatile; **nevertheless**, our forecast is positive.*`,
    dialogue: [
      {
        speaker: 'Elena',
        textEn: 'I think Carlos hit the nail on the head during the board meeting.',
        textEs: 'Creo que Carlos dio exactamente en el clavo durante la junta directiva.'
      },
      {
        speaker: 'Marcus',
        textEn: 'Agreed. Now let us make sure everyone is on the same page before we launch.',
        textEs: 'De acuerdo. Ahora asegurémonos de que todos estén en la misma sintonía antes de lanzar.'
      }
    ],
    quiz: [
      {
        id: 'b2-en-6-q1',
        question: '¿Qué significa la expresión "To hit the nail on the head"?',
        options: [
          'Cometer un error grave',
          'Dar exactamente en el clavo / acertar el punto clave',
          'Trabajar en construcción',
          'Cancelar una reunión'
        ],
        correctAnswer: 'Dar exactamente en el clavo / acertar el punto clave',
        explanation: '"Hit the nail on the head" significa describir exactamente la causa o solución de una situación.'
      },
      {
        id: 'b2-en-6-q2',
        question: 'Completa el contraste formal: "The first option is expensive, ___ the second one is cost-effective."',
        options: ['despite', 'whereas', 'due to', 'unless'],
        correctAnswer: 'whereas',
        explanation: '"Whereas" significa "mientras que" y contrasta dos cláusulas de forma elegante.'
      }
    ]
  }
];

// ============================================================================
// SPANISH COURSE (FOR ENGLISH SPEAKERS) — CEFR B1 (UMBRAL INDEPENDIENTE)
// ============================================================================

export const spanishB1Lessons: LessonStep[] = [
  {
    id: 'b1-es-1',
    day: 1,
    title: 'Present Subjunctive (WEIRDO): Wishes, Emotions & Doubts',
    description: 'Master the Spanish Present Subjunctive triggered by wishes, emotions, recommendations, and doubt.',
    category: 'Subjunctive Mood',
    cefrLevel: 'B1',
    grammarFocus: 'Quiero que / Espero que / Es importante que + Presente de Subjuntivo (-ar → -e, -er/-ir → -a)',
    commonMistake: 'English uses the infinitive ("I want you to go"), which fails in Spanish (*Yo quiero tú ir*). You MUST use "que + Subjunctive": "Quiero que vayas".',
    strategyTip: 'Flip the vowel! Start from the "Yo" present form (tengo → teng-), drop the "-o", and add the opposite ending (-ar takes -e; -er/-ir takes -a).',
    content: `The **Subjunctive (El Subjuntivo)** is the heart of intermediate B1 Spanish. While the Indicative states objective facts, the Subjunctive expresses **Wishes, Emotions, Impersonal expressions, Recommendations, Doubt, and Ojalá (WEIRDO)**.

### 1. How to Form the Present Subjunctive (The Vowel Flip)
1. Take the **Yo** form of the present indicative (*hablo, como, tengo, digo*).
2. Drop the **-o**.
3. Add the **opposite vowel**:
   - **-AR verbs** take **-e, -es, -e, -emos, -éis, -en** (*que tú hables, que él trabaje*).
   - **-ER / -IR verbs** take **-a, -as, -a, -amos, -áis, -an** (*que tú comas, que ella tenga, que ellos digan*).

### 2. Key Triggers with "Que"
- **Wishes**: *Quiero que **vengas** a mi fiesta.* (I want you to come to my party).
- **Recommendations**: *Te recomiendo que **pruebes** la paella.*
- **Impersonal Expressions**: *Es importante que **estudiemos** todos los días.*
- **Ojalá**: *¡Ojalá **haga** buen tiempo mañana!*`,
    dialogue: [
      {
        speaker: 'Mateo',
        textEn: 'I hope you have a great trip to Colombia!',
        textEs: '¡Espero que tengas un excelente viaje a Colombia!'
      },
      {
        speaker: 'Chloe',
        textEn: 'Thank you! My doctor recommends that I drink bottled water.',
        textEs: '¡Gracias! Mi médico me recomienda que beba agua embotellada.'
      }
    ],
    quiz: [
      {
        id: 'b1-es-1-q1',
        question: 'Complete with the Present Subjunctive: "Quiero que tú ___ (hablar) conmigo."',
        options: ['hablas', 'hables', 'hablar', 'habló'],
        correctAnswer: 'hables',
        explanation: '-AR verbs take "-e" endings in the Present Subjunctive: tú hables.'
      },
      {
        id: 'b1-es-1-q2',
        type: 'word-order',
        question: 'Order the subjunctive recommendation:',
        options: [],
        wordTiles: ['Es', 'importante', 'que', 'tengas', 'paciencia.'],
        correctAnswer: 'Es importante que tengas paciencia.',
        explanation: '"Es importante que" triggers the subjunctive form "tengas" (from tener → tengo → tengas).'
      }
    ]
  },
  {
    id: 'b1-es-2',
    day: 2,
    title: 'Simple Conditional (-ía): Politeness, Advice & Hypotheticals',
    description: 'Express "would" in Spanish using the Simple Conditional for polite requests and advice.',
    category: 'Conditional Tense',
    cefrLevel: 'B1',
    grammarFocus: 'Infinitivo + -ía, -ías, -ía, -íamos, -íais, -ían (hablaría, comería, tendría)',
    commonMistake: 'Do not drop the -ar/-er/-ir ending! Just attach "-ía" directly to the full infinitive (viajar + ía = viajaría).',
    strategyTip: 'Use "¿Podrías...?" (Could you...?) and "Me gustaría..." (I would like...) to sound immediately polite and natural.',
    content: `The **Condicional Simple** corresponds to **"would + verb"** in English.

### 1. Regular Formation (Full Infinitive + Ending)
All -AR, -ER, and -IR verbs use the exact same endings attached to the infinitive:
- **-ía, -ías, -ía, -íamos, -íais, -ían**
- *Yo **viajaría** por todo el mundo.* (I would travel around the world).
- *¿**Podrías** ayudarme un momento?* (Could you help me for a moment?).

### 2. Irregular Stems (Same as Future Tense)
- *Tener → **tendría** | Poder → **podría** | Hacer → **haría** | Decir → **diría** | Salir → **saldría***
- *Yo en tu lugar, **hablaría** con el director.* (In your place, I would speak with the director).`,
    dialogue: [
      {
        speaker: 'Lucas',
        textEn: 'What would you do in my situation?',
        textEs: '¿Qué harías tú en mi situación?'
      },
      {
        speaker: 'Valeria',
        textEn: 'I would tell the truth immediately.',
        textEs: 'Yo diría la verdad inmediatamente.'
      }
    ],
    quiz: [
      {
        id: 'b1-es-2-q1',
        question: 'Complete: "Me ___ (gustar) reservar una mesa para dos personas."',
        options: ['gusto', 'gustaría', 'gustaba', 'gustará'],
        correctAnswer: 'gustaría',
        explanation: '"Me gustaría" means "I would like" and is the standard polite form.'
      },
      {
        id: 'b1-es-2-q2',
        question: 'What is the irregular conditional "Yo" form of "Hacer"?',
        options: ['hacería', 'haría', 'hiciera', 'hago'],
        correctAnswer: 'haría',
        explanation: 'Hacer uses the irregular stem "har-" in both the future and conditional: yo haría.'
      }
    ]
  },
  {
    id: 'b1-es-3',
    day: 3,
    title: 'Affirmative & Negative Commands (El Imperativo)',
    description: 'Give clear instructions, advice, and polite commands in formal and informal contexts.',
    category: 'Commands & Imperative',
    cefrLevel: 'B1',
    grammarFocus: 'Imperativo Afirmativo (habla, ten, ven) vs. Imperativo Negativo (no hables, no tengas)',
    commonMistake: 'In Spanish, affirmative "tú" commands and negative "tú" commands use DIFFERENT verb forms! "Habla" (Speak!) vs. "No hables" (Don\'t speak!).',
    strategyTip: 'All Negative Commands (No hables, No comas, No vayas) and Formal Commands (Usted) use the exact same forms as the Present Subjunctive!',
    content: `Mastering commands (**El Imperativo**) is essential for giving directions, cooking instructions, and daily advice.

### 1. Informal Affirmative Commands (Tú)
- Regular verbs use the 3rd person singular present form: *¡**Habla** más despacio! ¡**Come** las verduras!*
- **8 Short Irregulars**: *Ven (venir), Di (decir), Sal (salir), Haz (hacer), Ten (tener), Ve (ir), Pon (poner), Sé (ser)*.

### 2. Informal Negative Commands (No + Subjunctive)
- *¡No **hables** tan rápido!* (Don't speak so fast!).
- *¡No **digas** eso!* (Don't say that!).
- *¡No **te preocupes**!* (Don't worry!).`,
    dialogue: [
      {
        speaker: 'Chef',
        textEn: 'Put the olive oil in the pan, but do not burn the garlic.',
        textEs: 'Pon el aceite de oliva en la sartén, pero no quemes el ajo.'
      },
      {
        speaker: 'Student',
        textEn: 'Got it! Tell me when I should add the tomatoes.',
        textEs: '¡Entendido! Dime cuándo debo añadir los tomates.'
      }
    ],
    quiz: [
      {
        id: 'b1-es-3-q1',
        question: 'Choose the correct negative command: "¡No ___ (llegar - tú) tarde a la entrevista!"',
        options: ['llegas', 'llega', 'llegues', 'llegar'],
        correctAnswer: 'llegues',
        explanation: 'Negative tú commands use the Present Subjunctive (llegar → llegues).'
      },
      {
        id: 'b1-es-3-q2',
        question: 'What is the affirmative "tú" command for "Hacer"?',
        options: ['Hace', 'Haz', 'Hagas', 'Hacer'],
        correctAnswer: 'Haz',
        explanation: '"Haz" is the irregular affirmative command for "tú" (e.g., ¡Haz tu tarea!).'
      }
    ]
  },
  {
    id: 'b1-es-4',
    day: 4,
    title: 'Past Perfect (Pluscuamperfecto: Había + Participio)',
    description: 'Narrate events that had already happened before another past action.',
    category: 'Narrative Tenses',
    cefrLevel: 'B1',
    grammarFocus: 'Había / Habías / Había / Habíamos / Habían + Participio (-ado / -ido)',
    commonMistake: 'Never separate "había" from the participle with words like "ya" or "nunca": say "Ya había comido", NOT "Había ya comido".',
    strategyTip: 'Pair "Cuando llegué..." (Preterite) with "...ya habían empezado" (Past Perfect) to tell rich stories.',
    content: `The **Pluscuamperfecto (Past Perfect)** describes "the past before the past" (*had done*).

### 1. Formula
- **Imperfect of Haber (había, habías, había, habíamos, habían) + Past Participle**
- *Cuando llegué al aeropuerto, el avión ya **había salido**.* (When I arrived at the airport, the plane had already left).
- *Nunca **había probado** el ceviche antes de viajar a Perú.* (I had never tried ceviche before traveling to Peru).`,
    dialogue: [
      {
        speaker: 'Sofía',
        textEn: 'Had you visited Mexico before this trip?',
        textEs: '¿Habías visitado México antes de este viaje?'
      },
      {
        speaker: 'Ethan',
        textEn: 'No, I had never been to Latin America before.',
        textEs: 'No, nunca había estado en Latinoamérica antes.'
      }
    ],
    quiz: [
      {
        id: 'b1-es-4-q1',
        question: 'Complete: "Cuando llamé a Ana, ella ya ___ (salir) de la oficina."',
        options: ['ha salido', 'había salido', 'salió', 'salía'],
        correctAnswer: 'había salido',
        explanation: '"Había salido" expresses an action completed prior to another past action ("llamé").'
      },
      {
        id: 'b1-es-4-q2',
        type: 'word-order',
        question: 'Order the Past Perfect sentence:',
        options: [],
        wordTiles: ['Nunca', 'había', 'visto', 'una', 'película', 'tan', 'buena.'],
        correctAnswer: 'Nunca había visto una película tan buena.',
        explanation: '"Visto" is the irregular participle of "ver", preceded immediately by "había".'
      }
    ]
  },
  {
    id: 'b1-es-5',
    day: 5,
    title: 'Double Object Pronouns (Se lo, Me la, Te los)',
    description: 'Combine indirect and direct object pronouns naturally without tongue-twisters.',
    category: 'Pronoun Mastery',
    cefrLevel: 'B1',
    grammarFocus: 'Indirect Pronoun (me/te/se/nos) + Direct Pronoun (lo/la/los/las) before the verb',
    commonMistake: 'Never say "Le lo di" or "Les la compré"! Whenever "le" or "les" comes before "lo/la/los/las", it MUST change to "SE": "Se lo di".',
    strategyTip: 'Remember the acronym RID: Reflexive / Indirect comes FIRST, Direct comes SECOND ("Me lo dijo").',
    content: `To sound truly fluent at **Level B1**, you need to combine Indirect (*to whom*) and Direct (*what*) pronouns.

### 1. Order: Indirect First + Direct Second
- *¿Tienes el informe para mí? — Sí, **te lo** envío ahora mismo.* (Yes, I'll send it to you right now).
- *Mi madre me compró esta chaqueta → Mi madre **me la** compró.*

### 2. The Golden Rule: LE / LES → SE
When **le** or **les** is followed by **lo, la, los, las**, change **le/les** to **se** to avoid two "L" sounds in a row:
- *Di el libro a Juan → **Se lo** di.* (I gave it to him).`,
    dialogue: [
      {
        speaker: 'Camila',
        textEn: 'Did you give the keys to the neighbor?',
        textEs: '¿Le diste las llaves al vecino?'
      },
      {
        speaker: 'Diego',
        textEn: 'Yes, I gave them to him this morning.',
        textEs: 'Sí, se las di esta mañana.'
      }
    ],
    quiz: [
      {
        id: 'b1-es-5-q1',
        question: 'Replace both objects: "Compré el regalo para María" → "___ compré."',
        options: ['Le lo', 'Se lo', 'Lo se', 'Me la'],
        correctAnswer: 'Se lo',
        explanation: '"Le" (to María) changes to "Se" before "lo" (el regalo): "Se lo compré".'
      },
      {
        id: 'b1-es-5-q2',
        question: 'Complete: "¿Me prestas tu bolígrafo? — Sí, ___ presto."',
        options: ['te lo', 'lo te', 'se la', 'me lo'],
        correctAnswer: 'te lo',
        explanation: 'Indirect pronoun "te" (to you) + Direct masculine singular "lo" (el bolígrafo).'
      }
    ]
  },
  {
    id: 'b1-es-6',
    day: 6,
    title: 'Verbs of Change: Ponerse, Volverse, Hacerse & Quedarse',
    description: 'Master the 4 ways to express "to become / to get" in Spanish depending on emotion, effort, or permanence.',
    category: 'Lexical Precision',
    cefrLevel: 'B1',
    grammarFocus: 'Ponerse (mood/health), Hacerse (career/effort), Volverse (sudden personality), Quedarse (lasting state)',
    commonMistake: 'English uses "to get" or "to become" for everything ("get nervous, become a doctor, go blind"). Spanish chooses a specific verb for each type of change.',
    strategyTip: 'Think of "Ponerse" for temporary emotions (ponerse nervioso/feliz) and "Hacerse" for professions or gradual effort (hacerse médico/rico).',
    content: `In Spanish, there is no single word for **"to become"**. Instead, you choose one of four reflexive verbs based on the nature of the transformation:

### 1. Ponerse + Adjective (Temporary Physical or Emotional Change)
- *Me **puse** muy nervioso antes del examen.* (I got very nervous).
- *Ella se **puso** contenta con la noticia.* (She became happy).

### 2. Hacerse + Noun/Adjective (Voluntary Effort, Profession, Ideology)
- *Estudió mucho y se **hizo** abogado.* (He became a lawyer).

### 3. Volverse + Adjective (Deep or Sudden Psychological Change)
- *Con la fama, se **volvió** muy arrogante.* (He became very arrogant).

### 4. Quedarse + Adjective (Resulting State or Loss)
- *Me **quedé** sorprendido.* (I was left surprised). | *Se **quedó** dormido.* (He fell asleep).`,
    dialogue: [
      {
        speaker: 'Elena',
        textEn: 'Why did Carlos get so nervous during the dinner?',
        textEs: '¿Por qué se puso tan nervioso Carlos durante la cena?'
      },
      {
        speaker: 'Pablo',
        textEn: 'Because he was left speechless when they offered him the promotion!',
        textEs: '¡Porque se quedó sin palabras cuando le ofrecieron el ascenso!'
      }
    ],
    quiz: [
      {
        id: 'b1-es-6-q1',
        question: 'Which verb expresses a temporary emotional change? "Cuando escuchó su canción favorita, se ___ muy feliz."',
        options: ['hizo', 'puso', 'quedó', 'fue'],
        correctAnswer: 'puso',
        explanation: '"Ponerse" is used for immediate emotional or mood changes.'
      },
      {
        id: 'b1-es-6-q2',
        question: 'Complete for a career achieved through effort: "Después de seis años en la universidad, se ___ arquitecta."',
        options: ['puso', 'hizo', 'quedó', 'volvió'],
        correctAnswer: 'hizo',
        explanation: '"Hacerse" is used for professions and goals achieved through personal effort.'
      }
    ]
  },
  {
    id: 'b1-es-7',
    day: 7,
    title: 'Subjunctive with Conjunctions (Para que, Antes de que, Cuando)',
    description: 'Connect complex ideas about purpose and future time using subjunctive triggers.',
    category: 'Complex Sentences',
    cefrLevel: 'B1',
    grammarFocus: 'ESCAPA Conjunctions (Para que, Antes de que, Sin que) & Future "Cuando + Subjuntivo"',
    commonMistake: 'In English we say "When I arrive tomorrow" (Present). In Spanish, future events after "Cuando" REQUIRE the Subjunctive: "Cuando llegue mañana" (NOT "Cuando llego mañana").',
    strategyTip: 'Remember ESCAPA (En caso de que, Sin que, Con tal de que, Antes de que, Para que, A menos que) — they ALWAYS trigger the subjunctive!',
    content: `Certain conjunctions in Spanish automatically require the **Subjunctive** because they point toward a purpose, condition, or unfulfilled future event.

### 1. Always Subjunctive (ESCAPA)
- **Para que** (so that / in order that): *Te explico esto **para que entiendas** la regla.*
- **Antes de que** (before): *Llámame **antes de que salgas**.*
- **A menos que** (unless): *Iremos a la playa **a menos que llueva**.*

### 2. Time Conjunctions Referring to the Future (Cuando, En cuanto, Hasta que)
- Habitual fact (Indicative): *Cuando **llego** a casa, siempre ceno.*
- Future plan (Subjunctive): *Mañana, cuando **llegue** a casa, te llamaré.*`,
    dialogue: [
      {
        speaker: 'Lucía',
        textEn: 'Call me as soon as you arrive at the hotel.',
        textEs: 'Llámame en cuanto llegues al hotel.'
      },
      {
        speaker: 'Noah',
        textEn: 'Of course! I will send you the address so that you know where we are.',
        textEs: '¡Por supuesto! Te enviaré la dirección para que sepas dónde estamos.'
      }
    ],
    quiz: [
      {
        id: 'b1-es-7-q1',
        question: 'Future event after "Cuando": "Te avisaré mañana cuando ___ (terminar - yo) el informe."',
        options: ['termino', 'termine', 'terminaré', 'terminé'],
        correctAnswer: 'termine',
        explanation: 'Future actions introduced by "cuando" require the Present Subjunctive ("termine").'
      },
      {
        id: 'b1-es-7-q2',
        question: 'Complete: "Te doy las llaves para que ___ (poder - tú) entrar."',
        options: ['puedes', 'puedas', 'podrás', 'podías'],
        correctAnswer: 'puedas',
        explanation: '"Para que" (so that) always requires the Subjunctive ("puedas").'
      }
    ]
  },
  {
    id: 'b1-es-8',
    day: 8,
    title: 'Reported Speech (Estilo Indirecto) & B1 Connectors',
    description: 'Relay what others said accurately and structure arguments with formal connectors.',
    category: 'Discourse & Fluency',
    cefrLevel: 'B1',
    grammarFocus: 'Present → Imperfect (Dice que tiene → Dijo que tenía) | Future → Conditional (Dijo que iría)',
    commonMistake: 'When reporting a yes/no question in Spanish, use "si" (whether/if): "Me preguntó si tenía tiempo".',
    strategyTip: 'Use "Sin embargo" (However), "Por lo tanto" (Therefore), and "Además" (Furthermore) to link your ideas smoothly.',
    content: `In **Estilo Indirecto (Reported Speech)**, when the reporting verb is in the past (*Dijo que... / Me contó que...*), the original verb shifts back:

### 1. Key Shifts
- **Presente → Imperfecto**: *"Tengo hambre"* → *Dijo que **tenía** hambre.*
- **Pretérito / Perfecto → Pluscuamperfecto**: *"Fui al médico"* → *Me contó que **había ido** al médico.*
- **Futuro → Condicional**: *"Llegaré a las ocho"* → *Prometió que **llegaría** a las ocho.*`,
    dialogue: [
      {
        speaker: 'Andrés',
        textEn: 'What did the director say at the meeting?',
        textEs: '¿Qué dijo la directora en la reunión?'
      },
      {
        speaker: 'Elena',
        textEn: 'She said that the company would open a new office in Bogotá.',
        textEs: 'Dijo que la empresa abriría una nueva oficina en Bogotá.'
      }
    ],
    quiz: [
      {
        id: 'b1-es-8-q1',
        question: 'Shift to Reported Speech: Juan dijo: "Mañana viajaré a Lima" → Juan dijo que al día siguiente ___ a Lima.',
        options: ['viajará', 'viajaría', 'viaja', 'viajó'],
        correctAnswer: 'viajaría',
        explanation: 'When reporting past statements, Future ("viajaré") shifts to Conditional ("viajaría").'
      },
      {
        id: 'b1-es-8-q2',
        question: 'Complete the yes/no reported question: "Ella me preguntó ___ yo hablaba español."',
        options: ['que', 'si', 'como', 'cuando'],
        correctAnswer: 'si',
        explanation: 'Yes/No indirect questions are introduced by "si" (if/whether).'
      }
    ]
  }
];

// ============================================================================
// SPANISH COURSE (FOR ENGLISH SPEAKERS) — CEFR B2 (AVANZADO & PERFECCIONAMIENTO)
// ============================================================================

export const spanishB2Lessons: LessonStep[] = [
  {
    id: 'b2-es-1',
    day: 1,
    title: 'Imperfect Subjunctive (-ra / -se) & Hypothetical "Si" Clauses',
    description: 'Master hypothetical conditions ("Si tuviera tiempo, viajaría") and past polite requests.',
    category: 'Advanced Subjunctive',
    cefrLevel: 'B2',
    grammarFocus: 'Si + Imperfecto de Subjuntivo (-ra), Condicional Simple (-ía)',
    commonMistake: 'NEVER use the Present Subjunctive after "Si" (If)! Say "Si tuviera dinero, compraría..." (NOT *Si tenga dinero*).',
    strategyTip: 'To form the Imperfect Subjunctive of ANY verb, take the 3rd person plural Preterite (ellos hablaron / tuvieron), drop "-ron", and add "-ra, -ras, -ra, -ramos, -ran".',
    content: `The **Imperfect Subjunctive (Imperfecto de Subjuntivo)** unlocks hypothetical thinking and advanced politeness in Spanish.

### 1. How to Form It (From Preterite "Ellos")
- *Hablaron → habla-* + **-ra, -ras, -ra, -ríamos (´-ramos), -ran** (*hablara, hablaras...*)
- *Tuvieron → tuvie-* + **-ra** → ***tuviera, tuvieras, tuviera, tuviéramos, tuvieran***
- *Fueron (ser/ir) → fue-* + **-ra** → ***fuera, fueras, fuera, fuéramos, fueran***

### 2. Hypothetical "Si" Clauses (Second Conditional)
- **Si + Imperfecto de Subjuntivo (-ra)**, **Condicional Simple (-ía)**
- *Si **tuviera** más tiempo libre, **aprendería** a tocar el violín.*
- *Si yo **fuera** tú, **aceptaría** ese puesto.*`,
    dialogue: [
      {
        speaker: 'Gabriel',
        textEn: 'If you could live in any city in the world, where would you live?',
        textEs: '¿Si pudieras vivir en cualquier ciudad del mundo, dónde vivirías?'
      },
      {
        speaker: 'Hannah',
        textEn: 'If I spoke perfect Spanish, I would live in Buenos Aires.',
        textEs: 'Si hablara español perfecto, viviría en Buenos Aires.'
      }
    ],
    quiz: [
      {
        id: 'b2-es-1-q1',
        question: 'Complete the hypothetical clause: "Si yo ___ (tener) más vacaciones, viajaría por Sudamérica."',
        options: ['tengo', 'tenga', 'tuviera', 'tendría'],
        correctAnswer: 'tuviera',
        explanation: 'Hypothetical "Si" clauses require the Imperfect Subjunctive ("tuviera") in the condition.'
      },
      {
        id: 'b2-es-1-q2',
        type: 'word-order',
        question: 'Order the B2 advice sentence:',
        options: [],
        wordTiles: ['Si', 'yo', 'fuera', 'tú,', 'hablaría', 'con', 'ella.'],
        correctAnswer: 'Si yo fuera tú, hablaría con ella.',
        explanation: '"Si yo fuera tú" + Conditional ("hablaría") is the natural way to say "If I were you...".'
      }
    ]
  },
  {
    id: 'b2-es-2',
    day: 2,
    title: 'Past Counterfactuals: Si Hubiera + Habría (Third Conditional)',
    description: 'Reflect on past decisions and alternative outcomes with Pluperfect Subjunctive and Compound Conditional.',
    category: 'Counterfactual Mastery',
    cefrLevel: 'B2',
    grammarFocus: 'Si + hubiera + participio, habría + participio',
    commonMistake: 'Do not use "habría" inside the "Si" clause (*Si habría sabido*). Keep "hubiera" with "Si", and "habría" in the result!',
    strategyTip: 'Native speakers also frequently use "hubiera" in both clauses in spoken Spanish, but "Si hubiera..., habría..." is the gold standard for exams and formal writing.',
    content: `To express how the past would have been different (**"If I had known, I would have..."**), Spanish pairs two compound tenses:

### 1. The Formula
- **Si + hubiera / hubieras / hubiéramos + Participio**, **habría / habrías / habríamos + Participio**
- *Si me **hubieras avisado**, te **habría ayudado** con la mudanza.* (If you had let me know, I would have helped you with the move).
- *Si **hubiéramos salido** antes, no **habríamos perdido** el tren.*`,
    dialogue: [
      {
        speaker: 'Valeria',
        textEn: 'If we had reserved the tickets last week, they would have been much cheaper.',
        textEs: 'Si hubiéramos reservado los boletos la semana pasada, habrían sido mucho más baratos.'
      },
      {
        speaker: 'Liam',
        textEn: 'You are right, I wish I had checked the website on Monday.',
        textEs: 'Tienes razón, ojalá hubiera revisado el sitio web el lunes.'
      }
    ],
    quiz: [
      {
        id: 'b2-es-2-q1',
        question: 'Complete: "Si ___ (saber - yo) que estabas en la ciudad, te habría invitado a cenar."',
        options: ['habría sabido', 'hubiera sabido', 'sabía', 'he sabido'],
        correctAnswer: 'hubiera sabido',
        explanation: 'After "Si" in past counterfactuals, we always use the Pluperfect Subjunctive ("hubiera sabido").'
      },
      {
        id: 'b2-es-2-q2',
        question: 'Complete the result clause: "Si hubieras estudiado más, ___ aprobado el examen."',
        options: ['habrías', 'hubieras', 'habías', 'tendrías'],
        correctAnswer: 'habrías',
        explanation: 'The result clause uses the Compound Conditional ("habrías aprobado").'
      }
    ]
  },
  {
    id: 'b2-es-3',
    day: 3,
    title: 'Passive Voice with "Ser" vs. Reflexive Passive with "Se"',
    description: 'Sound like a native journalist or executive by choosing between "Fue construido" and "Se construyó".',
    category: 'Stylistic Precision',
    cefrLevel: 'B2',
    grammarFocus: 'Pasiva Refleja (Se + verbo 3ra persona singular/plural) vs. Pasiva con Ser + Participio concordado',
    commonMistake: 'With "Pasiva Refleja (Se)", the verb MUST agree in number with the noun: "Se vende casa" (singular) vs. "Se venden casas" (plural).',
    strategyTip: 'In everyday Spanish, use "Se + verb" when the agent is not mentioned ("Se aprobaron las leyes"), and reserve "Ser + participle + por" when highlighting the creator.',
    content: `While English relies heavily on the *To Be* passive, Spanish has two distinct passive structures:

### 1. Pasiva Refleja con "Se" (Most Natural in Spanish)
When the person who performs the action is unknown or general:
- *Aquí **se habla** español.* (Spanish is spoken here).
- ***Se firmaron** los acuerdos ayer.* (The agreements were signed yesterday — plural *firmaron* agrees with *los acuerdos*).

### 2. Pasiva Analítica con "Ser + Participio + por" (Journalistic / Historical)
The participle must agree in **gender and number** with the subject:
- *La novela **fue escrita** por Gabriel García Márquez.* (Feminine singular *escrita*).
- *Las torres **fueron diseñadas** por un arquitecto local.* (Feminine plural *diseñadas*).`,
    dialogue: [
      {
        speaker: 'Periodista',
        textEn: 'The new museum was inaugurated by the mayor this morning.',
        textEs: 'El nuevo museo fue inaugurado por la alcaldesa esta mañana.'
      },
      {
        speaker: 'Curador',
        textEn: 'More than five hundred historical pieces are exhibited inside.',
        textEs: 'En su interior se exhiben más de quinientas piezas históricas.'
      }
    ],
    quiz: [
      {
        id: 'b2-es-3-q1',
        question: 'Choose the correct agreement in Pasiva Refleja: "En esta tienda se ___ (vender) libros antiguos."',
        options: ['vende', 'venden', 'vendido', 'vender'],
        correctAnswer: 'venden',
        explanation: '"Libros antiguos" is plural, so the reflexive passive verb must also be plural: "se venden".'
      },
      {
        id: 'b2-es-3-q2',
        question: 'Check gender/number agreement: "Las cartas fueron ___ por el director."',
        options: ['escrito', 'escrita', 'escritos', 'escritas'],
        correctAnswer: 'escritas',
        explanation: 'In the "Ser" passive, the participle agrees with the feminine plural subject "Las cartas" → "escritas".'
      }
    ]
  },
  {
    id: 'b2-es-4',
    day: 4,
    title: 'Advanced Verbal Periphrases (Llevar + Gerundio, Dejar de, Volver a)',
    description: 'Replace awkward literal translations with idiomatic Spanish verb combinations.',
    category: 'Idiomatic Structures',
    cefrLevel: 'B2',
    grammarFocus: 'Llevar + tiempo + gerundio | Dejar de + inf | Volver a + inf | Acabar de + inf',
    commonMistake: 'Instead of saying "Llamé otra vez" (I called again), native B2 speakers prefer the periphrasis "Volví a llamar".',
    strategyTip: 'To negate "Llevar + gerundio", use "Llevar + tiempo + SIN + infinitivo": "Llevo dos días sin dormir" (I haven\'t slept for two days).',
    content: `**Perífrasis Verbales** are two-verb combinations that express nuances of duration, repetition, or interruption with native elegance:

### 1. Duration: Llevar + Tiempo + Gerundio (-ando / -iendo)
- ***Llevo** cinco años **viviendo** en España.* (I have been living in Spain for five years).
- Negative with **SIN + Infinitive**: ***Llevo** tres meses **sin fumar**.*

### 2. Repetition: Volver a + Infinitivo (To do something again)
- *No te preocupes, no **volveré a cometer** ese error.* (I won't make that mistake again).

### 3. Cessation: Dejar de + Infinitivo (To stop doing something)
- *Ha **dejado de llover**, ¡salgamos!* (It has stopped raining).`,
    dialogue: [
      {
        speaker: 'Clara',
        textEn: 'How long have you been studying advanced Spanish?',
        textEs: '¿Cuánto tiempo llevas estudiando español avanzado?'
      },
      {
        speaker: 'Owen',
        textEn: 'I have been practicing every day for a year, and I just passed my B1 exam.',
        textEs: 'Llevo un año practicando todos los días y acabo de aprobar mi examen B1.'
      }
    ],
    quiz: [
      {
        id: 'b2-es-4-q1',
        question: 'How do a native speaker say "She read the book again"?',
        options: [
          'Ella volvió a leer el libro.',
          'Ella llevó leyendo el libro.',
          'Ella dejó de leer el libro.',
          'Ella acabó por leer el libro.'
        ],
        correctAnswer: 'Ella volvió a leer el libro.',
        explanation: '"Volver a + infinitive" is the idiomatic way to express repeating an action.'
      },
      {
        id: 'b2-es-4-q2',
        question: 'Complete the negative duration: "Llevo dos semanas ___ comer azúcar."',
        options: ['no', 'sin', 'nunca', 'de'],
        correctAnswer: 'sin',
        explanation: 'The negative of "llevar + gerundio" is "llevar + tiempo + SIN + infinitivo".'
      }
    ]
  },
  {
    id: 'b2-es-5',
    day: 5,
    title: 'Subjunctive in Relative Clauses (Known vs. Unknown Antecedent)',
    description: 'Distinguish between "Busco un asistente que habla..." and "Busco un asistente que hable...".',
    category: 'Nuanced Subjunctive',
    cefrLevel: 'B2',
    grammarFocus: 'Antecedente Conocido (Indicativo) vs. Antecedente Desconocido o Negado (Subjuntivo)',
    commonMistake: 'After "No hay nadie que..." or "No tengo nada que...", you MUST ALWAYS use the Subjunctive ("No hay nadie que sepa la respuesta").',
    strategyTip: 'Ask yourself: Does this specific person/thing already exist in my mind? Yes → Indicative. Looking for someone hypothetical → Subjunctive.',
    content: `In **B2 Spanish**, changing a single vowel from Indicative to Subjunctive changes the meaning of a relative clause:

### 1. Specific & Known Antecedent → Indicative
- *Tengo un amigo que **habla** japonés.* (I have a specific friend, and he speaks Japanese).

### 2. Hypothetical / Desired Antecedent → Subjunctive
- *Busco un apartamento que **tenga** terraza.* (I am looking for any apartment that might have a terrace — I haven't found it yet).

### 3. Negative Antecedent (Nadie, Ninguno, Nada) → Always Subjunctive
- *No conozco a nadie que **pueda** traducir este texto.* (I don't know anyone who can translate this text).`,
    dialogue: [
      {
        speaker: 'Reclutadora',
        textEn: 'We need a project manager who speaks both English and Spanish fluently.',
        textEs: 'Necesitamos un director de proyecto que hable inglés y español con fluidez.'
      },
      {
        speaker: 'Director',
        textEn: 'I know a candidate who has ten years of international experience.',
        textEs: 'Conozco a una candidata que tiene diez años de experiencia internacional.'
      }
    ],
    quiz: [
      {
        id: 'b2-es-5-q1',
        question: 'Hypothetical search: "Queremos contratar a alguien que ___ (saber) programar en Python."',
        options: ['sabe', 'sepa', 'sabrá', 'supo'],
        correctAnswer: 'sepa',
        explanation: 'Because we are searching for a hypothetical candidate ("alguien que..."), we use the Subjunctive ("sepa").'
      },
      {
        id: 'b2-es-5-q2',
        question: 'Negative antecedent: "Aquí no hay ningún restaurante que ___ (abrir) después de medianoche."',
        options: ['abre', 'abra', 'abrirá', 'abrió'],
        correctAnswer: 'abra',
        explanation: 'Non-existent or negated antecedents ("no hay ningún...") always require the Subjunctive ("abra").'
      }
    ]
  },
  {
    id: 'b2-es-6',
    day: 6,
    title: 'Executive Spanish, Idioms & High-Level Argumentation',
    description: 'Perfect your fluency with native idioms, concession clauses (Aunque + Subjuntivo), and formal debate.',
    category: 'Mastery & Perfection B2',
    cefrLevel: 'B2',
    grammarFocus: 'Aunque + Indicativo (fact) vs. Aunque + Subjuntivo (even if) | Native Idioms & Formal Register',
    commonMistake: '"Aunque llueve" means "Even though it IS raining (fact)". "Aunque llueva" means "Even if it rains (hypothetical)".',
    strategyTip: 'Elevate your essays and conversations with connectors like "No obstante", "A pesar de que", and "Por consiguiente".',
    content: `Welcome to the final lesson of the **CEFR B2 Perfection Path**!

### 1. The Nuance of "Aunque" (Even though vs. Even if)
- **Aunque + Indicativo** (Real obstacle): ***Aunque está** cansado, sigue trabajando.* (Even though he is tired, he keeps working).
- **Aunque + Subjuntivo** (Hypothetical obstacle): ***Aunque sea** difícil, lo lograremos.* (Even if it is difficult, we will achieve it).

### 2. High-Level Native Idioms
- **Dar en el clavo**: To hit the nail on the head.
- **No tener pelos en la lengua**: To speak one's mind directly / not mince words.
- **Echar una mano**: To lend a hand / help out.
- **Valer la pena**: To be worth the effort.`,
    dialogue: [
      {
        speaker: 'Elena',
        textEn: 'Even if the negotiation is complex, it is worth the effort.',
        textEs: 'Aunque la negociación sea compleja, vale totalmente la pena.'
      },
      {
        speaker: 'Marcos',
        textEn: 'You hit the nail on the head. Let us move forward with the proposal.',
        textEs: 'Has dado en el clavo. Avancemos con la propuesta.'
      }
    ],
    quiz: [
      {
        id: 'b2-es-6-q1',
        question: 'Express "Even if it rains tomorrow, we will go": "Aunque mañana ___ (llover), iremos."',
        options: ['llueve', 'llueva', 'lloverá', 'llovió'],
        correctAnswer: 'llueva',
        explanation: '"Aunque + Subjunctive" expresses a hypothetical condition ("even if").'
      },
      {
        id: 'b2-es-6-q2',
        question: 'What does the idiom "Dar en el clavo" mean?',
        options: [
          'To make a mistake',
          'To hit the nail on the head / get it exactly right',
          'To arrive late',
          'To give up'
        ],
        correctAnswer: 'To hit the nail on the head / get it exactly right',
        explanation: '"Dar en el clavo" is used when someone identifies the exact point or solution.'
      }
    ]
  }
];

// ============================================================================
// VOCABULARY DECKS FOR B1 & B2 (ENGLISH & SPANISH)
// ============================================================================

export const b1EnglishVocab: VocabWord[] = [
  {
    id: 'v-b1-en-1',
    word: 'Look forward to',
    translation: 'Esperar con ilusión / Tener ganas de',
    example: 'I look forward to meeting your team next week.',
    category: 'Phrasal Verbs B1',
    phonetic: '/lʊk ˈfɔːrwərd tuː/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-en-2',
    word: 'Run out of',
    translation: 'Quedarse sin (suministros/tiempo)',
    example: 'We ran out of time during the exam.',
    category: 'Phrasal Verbs B1',
    phonetic: '/rʌn aʊt əv/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-en-3',
    word: 'Turn down',
    translation: 'Rechazar (una oferta) / Bajar el volumen',
    example: 'She turned down the job offer because of the distance.',
    category: 'Phrasal Verbs B1',
    phonetic: '/tɜːrn daʊn/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-en-4',
    word: 'Despite',
    translation: 'A pesar de',
    example: 'Despite the heavy traffic, we arrived on time.',
    category: 'Conectores B1',
    phonetic: '/dɪˈspaɪt/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-en-5',
    word: 'Reliable',
    translation: 'Confiable / Fiable',
    example: 'We need a reliable partner for this project.',
    category: 'Profesional B1',
    phonetic: '/rɪˈlaɪəbəl/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-en-6',
    word: 'Deadline',
    translation: 'Fecha límite / Plazo de entrega',
    example: 'The deadline for the report is Friday at 5 PM.',
    category: 'Profesional B1',
    phonetic: '/ˈdedlaɪn/',
    cefrLevel: 'B1'
  }
];

export const b2EnglishVocab: VocabWord[] = [
  {
    id: 'v-b2-en-1',
    word: 'Nevertheless',
    translation: 'No obstante / Sin embargo',
    example: 'The project was risky; nevertheless, it succeeded.',
    category: 'Conectores B2',
    phonetic: '/ˌnevərðəˈles/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-en-2',
    word: 'Whereas',
    translation: 'Mientras que (contraste)',
    example: 'He prefers remote work, whereas she enjoys the office.',
    category: 'Conectores B2',
    phonetic: '/werˈæz/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-en-3',
    word: 'Hit the nail on the head',
    translation: 'Dar exactamente en el clavo',
    example: 'Your analysis hit the nail on the head.',
    category: 'Idioms B2',
    phonetic: '/hɪt ðə neɪl ɑːn ðə hed/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-en-4',
    word: 'Breakthrough',
    translation: 'Avance decisivo / Gran descubrimiento',
    example: 'Scientists achieved a major breakthrough in renewable energy.',
    category: 'Ejecutivo B2',
    phonetic: '/ˈbreɪkθruː/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-en-5',
    word: 'Overcome',
    translation: 'Superar (obstáculos o dificultades)',
    example: 'How did you overcome those initial challenges?',
    category: 'Ejecutivo B2',
    phonetic: '/ˌoʊvərˈkʌm/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-en-6',
    word: 'Thorough',
    translation: 'Minucioso / Exhaustivo',
    example: 'They conducted a thorough investigation of the system.',
    category: 'Ejecutivo B2',
    phonetic: '/ˈθɜːroʊ/',
    cefrLevel: 'B2'
  }
];

export const spanishB1Vocab: VocabWord[] = [
  {
    id: 'v-b1-es-1',
    word: 'Ojalá',
    translation: 'Hopefully / I wish (+ Subjunctive)',
    example: '¡Ojalá tengamos buen tiempo este fin de semana!',
    category: 'Subjunctive B1',
    phonetic: '/o.xaˈla/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-es-2',
    word: 'Sin embargo',
    translation: 'However / Nevertheless',
    example: 'El examen fue difícil; sin embargo, aprobé con buena nota.',
    category: 'Connectors B1',
    phonetic: '/sin emˈbaɾ.ɣo/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-es-3',
    word: 'Ponerse nervioso',
    translation: 'To get nervous (temporary change)',
    example: 'Siempre me pongo nervioso antes de hablar en público.',
    category: 'Verbs of Change',
    phonetic: '/poˈneɾ.se neɾˈβjo.so/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-es-4',
    word: 'En cuanto',
    translation: 'As soon as',
    example: 'Te llamaré en cuanto llegue al aeropuerto.',
    category: 'Connectors B1',
    phonetic: '/en ˈkwan.to/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-es-5',
    word: 'A menos que',
    translation: 'Unless (+ Subjunctive)',
    example: 'Saldremos a las ocho, a menos que llueva.',
    category: 'Subjunctive B1',
    phonetic: '/a ˈme.nos ke/',
    cefrLevel: 'B1'
  },
  {
    id: 'v-b1-es-6',
    word: 'Por lo tanto',
    translation: 'Therefore',
    example: 'Completaste todos los módulos; por lo tanto, estás listo.',
    category: 'Connectors B1',
    phonetic: '/poɾ lo ˈtan.to/',
    cefrLevel: 'B1'
  }
];

export const spanishB2Vocab: VocabWord[] = [
  {
    id: 'v-b2-es-1',
    word: 'No obstante',
    translation: 'Nevertheless / Notwithstanding',
    example: 'Existían riesgos; no obstante, el proyecto fue un éxito.',
    category: 'Executive B2',
    phonetic: '/no oβsˈtan.te/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-es-2',
    word: 'Dar en el clavo',
    translation: 'To hit the nail on the head',
    example: 'Con ese comentario diste exactamente en el clavo.',
    category: 'Idioms B2',
    phonetic: '/daɾ en el ˈkla.βo/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-es-3',
    word: 'Llevar a cabo',
    translation: 'To carry out / To execute',
    example: 'Vamos a llevar a cabo una investigación exhaustiva.',
    category: 'Executive B2',
    phonetic: '/ʎeˈβaɾ a ˈka.βo/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-es-4',
    word: 'Valer la pena',
    translation: 'To be worth it / worth the effort',
    example: 'Aunque requiera esfuerzo, aprender otro idioma vale la pena.',
    category: 'Idioms B2',
    phonetic: '/baˈleɾ la ˈpe.na/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-es-5',
    word: 'Echar de menos',
    translation: 'To miss (someone or a place)',
    example: 'Echo mucho de menos la comida de mi abuela.',
    category: 'Idioms B2',
    phonetic: '/eˈtʃaɾ ðe ˈme.nos/',
    cefrLevel: 'B2'
  },
  {
    id: 'v-b2-es-6',
    word: 'Imprescindible',
    translation: 'Essential / Indispensable',
    example: 'El subjuntivo es imprescindible para el nivel avanzado.',
    category: 'Executive B2',
    phonetic: '/im.pɾes.θinˈdi.βle/',
    cefrLevel: 'B2'
  }
];

// ============================================================================
// OFFICIAL CERTIFICATION EXAMS FOR B1 AND B2
// ============================================================================

export const b1FinalExamQuestions: ExamQuestion[] = [
  {
    id: 'exam-b1-en-1',
    sectionTitle: 'Second Conditional',
    cefrLevel: 'B1',
    question: 'If I ___ you, I would apply for that international scholarship immediately.',
    options: ['am', 'were', 'would be', 'have been'],
    correctAnswer: 'were',
    explanation: 'En el Second Conditional usamos "If I were you" para dar consejos.'
  },
  {
    id: 'exam-b1-en-2',
    sectionTitle: 'Present Perfect Continuous',
    cefrLevel: 'B1',
    question: 'How long ___ you been working on this software architecture?',
    options: ['are', 'have', 'did', 'were'],
    correctAnswer: 'have',
    explanation: 'Present Perfect Continuous: How long + have/has + sujeto + been + verbo-ing.'
  },
  {
    id: 'exam-b1-en-3',
    sectionTitle: 'Passive Voice',
    cefrLevel: 'B1',
    question: 'The new electric model ___ manufactured in our Berlin factory last month.',
    options: ['is', 'was', 'has', 'did'],
    correctAnswer: 'was',
    explanation: 'Voz pasiva en pasado singular ("last month"): was + Past Participle.'
  },
  {
    id: 'exam-b1-en-4',
    sectionTitle: 'Reported Speech',
    cefrLevel: 'B1',
    question: 'Sarah told me that she ___ call the client the next day.',
    options: ['will', 'would', 'can', 'shall'],
    correctAnswer: 'would',
    explanation: 'En Reported Speech, "will" retrocede a "would".'
  },
  {
    id: 'exam-b1-en-5',
    sectionTitle: 'Relative Clauses',
    cefrLevel: 'B1',
    question: 'She is the director ___ team won the innovation award.',
    options: ['who', 'which', 'whose', 'where'],
    correctAnswer: 'whose',
    explanation: '"Whose" indica posesión ("cuyo equipo").'
  },
  {
    id: 'exam-b1-en-6',
    sectionTitle: 'Past Perfect',
    cefrLevel: 'B1',
    question: 'By the time we arrived at the theater, the concert ___ already begun.',
    options: ['has', 'had', 'was', 'did'],
    correctAnswer: 'had',
    explanation: 'Past Perfect ("had begun") para una acción previa a otra en el pasado.'
  },
  {
    id: 'exam-b1-en-7',
    sectionTitle: 'Modals of Deduction',
    cefrLevel: 'B1',
    question: 'He just ate three large pizzas; he ___ be hungry anymore!',
    options: ['mustn\'t', 'can\'t', 'shouldn\'t', 'might'],
    correctAnswer: 'can\'t',
    explanation: '"Can\'t be" expresa que algo es lógicamente imposible en el presente.'
  },
  {
    id: 'exam-b1-en-8',
    sectionTitle: 'Phrasal Verbs & Prepositions',
    cefrLevel: 'B1',
    question: 'We really look forward to ___ with your company this year.',
    options: ['collaborate', 'collaborating', 'collaborated', 'be collaborate'],
    correctAnswer: 'collaborating',
    explanation: 'Después de "look forward to", el verbo siempre va en gerundio (-ing).'
  }
];

export const b2FinalExamQuestions: ExamQuestion[] = [
  {
    id: 'exam-b2-en-1',
    sectionTitle: 'Third Conditional',
    cefrLevel: 'B2',
    question: 'If we had signed the contract in May, we ___ saved 20% of the budget.',
    options: ['would', 'would have', 'will have', 'had'],
    correctAnswer: 'would have',
    explanation: 'Third Conditional: If + had + participle, would have + participle.'
  },
  {
    id: 'exam-b2-en-2',
    sectionTitle: 'Future Perfect',
    cefrLevel: 'B2',
    question: 'By the end of this decade, artificial intelligence ___ transformed every industry.',
    options: ['will be', 'will have', 'would', 'is'],
    correctAnswer: 'will have',
    explanation: '"By + fecha futura" requiere Future Perfect ("will have + participio").'
  },
  {
    id: 'exam-b2-en-3',
    sectionTitle: 'Past Modals',
    cefrLevel: 'B2',
    question: 'You ___ told me earlier! I could have helped you solve the issue.',
    options: ['should have', 'must', 'can\'t', 'would'],
    correctAnswer: 'should have',
    explanation: '"Should have + participio" expresa lo que habría sido correcto hacer en el pasado.'
  },
  {
    id: 'exam-b2-en-4',
    sectionTitle: 'Negative Inversion',
    cefrLevel: 'B2',
    question: 'Not only ___ the exam, but she also achieved the highest score in the school.',
    options: ['she passed', 'did she pass', 'passed she', 'she did pass'],
    correctAnswer: 'did she pass',
    explanation: '"Not only" al inicio de la frase obliga a invertir auxiliar + sujeto ("did she pass").'
  },
  {
    id: 'exam-b2-en-5',
    sectionTitle: 'Causative Structure',
    cefrLevel: 'B2',
    question: 'We are going to have the entire office ___ before the new semester starts.',
    options: ['renovate', 'renovated', 'renovating', 'to renovate'],
    correctAnswer: 'renovated',
    explanation: 'Estructura causativa: have + objeto + Past Participle ("renovated").'
  },
  {
    id: 'exam-b2-en-6',
    sectionTitle: 'Executive Connectors',
    cefrLevel: 'B2',
    question: 'The northern region prefers digital channels, ___ the southern branch relies on in-person visits.',
    options: ['despite', 'whereas', 'due to', 'moreover'],
    correctAnswer: 'whereas',
    explanation: '"Whereas" contrasta dos cláusulas completas con registro formal.'
  }
];

export const spanishB1FinalExamQuestions: ExamQuestion[] = [
  {
    id: 'exam-b1-es-1',
    sectionTitle: 'Present Subjunctive',
    cefrLevel: 'B1',
    question: 'Es fundamental que todos los estudiantes ___ (practicar) la pronunciación.',
    options: ['practican', 'practiquen', 'practicarán', 'practicaron'],
    correctAnswer: 'practiquen',
    explanation: '"Es fundamental que" activa el Presente de Subjuntivo (practicar → practiquen).'
  },
  {
    id: 'exam-b1-es-2',
    sectionTitle: 'Simple Conditional',
    cefrLevel: 'B1',
    question: 'Yo en tu lugar, ___ (hablar) directamente con la gerente.',
    options: ['hablaré', 'hablaría', 'hable', 'hablaba'],
    correctAnswer: 'hablaría',
    explanation: 'Para dar consejos ("Yo en tu lugar...") usamos el Condicional Simple ("hablaría").'
  },
  {
    id: 'exam-b1-es-3',
    sectionTitle: 'Negative Commands',
    cefrLevel: 'B1',
    question: '¡Por favor, no ___ (hacer - tú) ruido mientras grabamos el audio!',
    options: ['haces', 'haz', 'hagas', 'harás'],
    correctAnswer: 'hagas',
    explanation: 'El imperativo negativo usa siempre la forma del presente de subjuntivo ("no hagas").'
  },
  {
    id: 'exam-b1-es-4',
    sectionTitle: 'Past Perfect (Pluscuamperfecto)',
    cefrLevel: 'B1',
    question: 'Cuando llegamos al restaurante, nuestros amigos ya ___ (pedir) la cena.',
    options: ['han pedido', 'habían pedido', 'pidieron', 'pedían'],
    correctAnswer: 'habían pedido',
    explanation: 'El Pluscuamperfecto ("habían pedido") indica una acción anterior a otra pasada ("llegamos").'
  },
  {
    id: 'exam-b1-es-5',
    sectionTitle: 'Double Object Pronouns',
    cefrLevel: 'B1',
    question: '¿Le entregaste el contrato al cliente? — Sí, ___ entregué ayer.',
    options: ['le lo', 'se lo', 'me lo', 'lo se'],
    correctAnswer: 'se lo',
    explanation: 'El pronombre indirecto "le" cambia a "se" delante de "lo/la/los/las".'
  },
  {
    id: 'exam-b1-es-6',
    sectionTitle: 'Verbs of Change',
    cefrLevel: 'B1',
    question: 'Después de años de esfuerzo y estudio, Elena se ___ cirujana.',
    options: ['puso', 'hizo', 'quedó', 'fue'],
    correctAnswer: 'hizo',
    explanation: '"Hacerse" expresa un cambio profesional logrado mediante esfuerzo voluntario.'
  },
  {
    id: 'exam-b1-es-7',
    sectionTitle: 'Future Time Clauses',
    cefrLevel: 'B1',
    question: 'Mañana te enviaré un mensaje en cuanto ___ (aterrizar) el avión.',
    options: ['aterriza', 'aterrice', 'aterrizará', 'aterrizó'],
    correctAnswer: 'aterrice',
    explanation: 'Las conjunciones temporales ("en cuanto", "cuando") referidas al futuro exigen Subjuntivo.'
  },
  {
    id: 'exam-b1-es-8',
    sectionTitle: 'Reported Speech',
    cefrLevel: 'B1',
    question: 'Carlos dijo que el viernes ___ (tener) una reunión importante.',
    options: ['tendrá', 'tendría', 'tenga', 'ha tenido'],
    correctAnswer: 'tendría',
    explanation: 'Al reportar en pasado una promesa futura, el Futuro pasa a Condicional ("tendría").'
  }
];

export const spanishB2FinalExamQuestions: ExamQuestion[] = [
  {
    id: 'exam-b2-es-1',
    sectionTitle: 'Imperfect Subjunctive Clauses',
    cefrLevel: 'B2',
    question: 'Si ___ (tener - nosotros) más presupuesto, abriríamos una sede en Madrid.',
    options: ['tenemos', 'tengamos', 'tuviéramos', 'tendríamos'],
    correctAnswer: 'tuviéramos',
    explanation: 'Las cláusulas hipotéticas con "Si" requieren Imperfecto de Subjuntivo ("tuviéramos").'
  },
  {
    id: 'exam-b2-es-2',
    sectionTitle: 'Past Counterfactuals',
    cefrLevel: 'B2',
    question: 'Si me hubieras llamado antes, te ___ (acompañar) al hospital sin dudarlo.',
    options: ['hubiera acompañado', 'habría acompañado', 'acompañaba', 'acompañé'],
    correctAnswer: 'habría acompañado',
    explanation: 'El resultado de "Si + hubiera + participio" se expresa con el Condicional Compuesto ("habría acompañado").'
  },
  {
    id: 'exam-b2-es-3',
    sectionTitle: 'Pasiva Refleja',
    cefrLevel: 'B2',
    question: 'En esta conferencia internacional se ___ (buscar) soluciones sostenibles.',
    options: ['busca', 'buscan', 'buscado', 'buscando'],
    correctAnswer: 'buscan',
    explanation: 'En la pasiva refleja, el verbo concuerda en plural con "soluciones sostenibles" ("se buscan").'
  },
  {
    id: 'exam-b2-es-4',
    sectionTitle: 'Verbal Periphrases',
    cefrLevel: 'B2',
    question: 'Llevo más de cuatro años ___ (aprender) idiomas en esta academia.',
    options: ['aprender', 'aprendiendo', 'aprendido', 'aprendo'],
    correctAnswer: 'aprendiendo',
    explanation: '"Llevar + tiempo + gerundio" expresa duración acumulada hasta el presente.'
  },
  {
    id: 'exam-b2-es-5',
    sectionTitle: 'Relative Clauses with Subjunctive',
    cefrLevel: 'B2',
    question: 'No hay nadie en el departamento que ___ (conocer) mejor este sistema que tú.',
    options: ['conoce', 'conozca', 'conocerá', 'conoció'],
    correctAnswer: 'conozca',
    explanation: 'Un antecedente negado ("No hay nadie que...") exige siempre el modo Subjuntivo ("conozca").'
  },
  {
    id: 'exam-b2-es-6',
    sectionTitle: 'Concession & Idioms',
    cefrLevel: 'B2',
    question: 'Aunque el camino ___ (ser) exigente, alcanzar el nivel B2 vale la pena.',
    options: ['es', 'sea', 'será', 'fue'],
    correctAnswer: 'sea',
    explanation: '"Aunque + Subjuntivo" proyecta una concesión hipotética o de futuro ("even if").'
  }
];
