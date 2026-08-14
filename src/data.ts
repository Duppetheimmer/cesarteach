import { LessonStep, VocabWord, QuizQuestion } from './types';

// ==========================================
// 1. A1 INICIAL (FUNDAMENTOS A1 EN INGLÉS)
// ==========================================
export const a1InicialLessons: LessonStep[] = [
  {
    id: 'a1_ini_1',
    day: 1,
    title: '1. Saludos, Presentación y Cortesía',
    description: 'Expresiones esenciales para romper el hielo, presentarte y mostrar cortesía en cualquier situación.',
    content: `En inglés, las interacciones cotidianas siempre empiezan con un saludo y expresiones de cortesía.

• Saludos formales e informales:
  - "Hello" (Hola - formal / general)
  - "Hi" / "Hey" (Hola - informal)
  - "Good morning" (Buenos días - hasta mediodía)
  - "Good afternoon" (Buenas tardes - 12pm a 6pm)
  - "Good evening" (Buenas noches - al llegar / saludar de noche)
  - "Good night" (Buenas noches - ¡SOLO para despedirse o ir a dormir!)

• Presentación personal:
  - "My name is..." (Mi nombre es...)
  - "I am..." (Yo soy...)
  - "Nice to meet you" (Gusto en conocerte)
  - "Pleasure to meet you" (Un placer conocerte - más formal)

• Cortesía y despedida:
  - "Please" (Por favor) | "Thank you" / "Thanks a lot" (Muchas gracias)
  - "You're welcome" (De nada) | "Excuse me" (Disculpe / Con permiso) | "I'm sorry" (Lo siento / Perdón)
  - "See you later" / "Have a good day!" (Hasta luego / ¡Que tengas un buen día!)`,
    dialogue: [
      { speaker: 'Emma', textEn: 'Hello! Good morning! My name is Emma.', textEs: '¡Hola! ¡Buenos días! Mi nombre es Emma.' },
      { speaker: 'David', textEn: 'Hi Emma! I am David. Nice to meet you.', textEs: '¡Hola Emma! Yo soy David. Gusto en conocerte.' },
      { speaker: 'Emma', textEn: 'Nice to meet you too! Have a great day.', textEs: '¡Gusto en conocerte también! Que tengas un gran día.' },
      { speaker: 'David', textEn: 'Thank you! You too, goodbye!', textEs: '¡Gracias! Tú también, ¡adiós!' }
    ],
    quiz: [
      {
        id: 'q_a1_1_1',
        question: '¿Cuál es la forma universal y educada de decir "Gracias" en inglés?',
        options: ['Please', 'Hello', 'Thank you', 'Goodbye'],
        correctAnswer: 'Thank you',
        explanation: '"Thank you" es la expresión formal y estándar para dar las gracias en cualquier contexto.',
        hint: 'Tip: Busca la opción con "Thank".'
      },
      {
        id: 'q_a1_1_2',
        question: '¿Qué respondes cuando alguien te da las gracias diciéndote "Thank you"?',
        options: ['Excuse me', "You're welcome", 'Nice to meet you', 'Good morning'],
        correctAnswer: "You're welcome",
        explanation: '"You\'re welcome" significa "De nada" en inglés.',
        hint: 'Tip: Significa literalmente "Eres bienvenido".'
      },
      {
        id: 'q_a1_1_3',
        question: '¿Cómo dices "Gusto en conocerte" al presentarte a alguien por primera vez?',
        options: ['Good evening', 'See you later', 'Nice to meet you', 'How are you'],
        correctAnswer: 'Nice to meet you',
        explanation: '"Nice to meet you" es la frase clave para saludar a alguien recién presentado.',
        hint: 'Tip: "Meet" significa conocerse.'
      },
      {
        id: 'q_a1_1_4',
        type: 'word-order',
        question: 'Ordena las palabras para formar: "Mi nombre es David."',
        options: ['My', 'name', 'is', 'David.'],
        correctAnswer: 'My name is David.',
        explanation: 'Estructura: Posesivo (My) + Sustantivo (name) + Verbo (is) + Nombre propio (David).',
        hint: 'Sigue el orden: My + name + is + David.'
      },
      {
        id: 'q_a1_1_5',
        question: 'Llegas a un restaurante a las 8:00 PM. ¿Cuál es el saludo apropiado de entrada?',
        options: ['Good night', 'Good evening', 'Good morning', 'Good afternoon'],
        correctAnswer: 'Good evening',
        explanation: '"Good evening" se usa para saludar al llegar de noche; "Good night" es solo para despedirse o irse a dormir.',
        hint: 'Tip: "Evening" es para saludar de noche.'
      }
    ]
  },
  {
    id: 'a1_ini_2',
    day: 2,
    title: '2. Números (1-100), Edad y Precios',
    description: 'Aprende a contar, dar tu edad con To Be y consultar precios en tiendas y cafeterías.',
    content: `Dominar los números te permitirá manejar dinero, horarios y edad.

• Números principales:
  - 1-10: One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten.
  - 11-20: Eleven, Twelve, Thirteen, Fourteen, Fifteen, Sixteen, Seventeen, Eighteen, Nineteen, Twenty.
  - Decenas (30-100): Thirty (30), Forty (40 - ¡sin 'u'!), Fifty (50), Sixty (60), Seventy (70), Eighty (80), Ninety (90), One hundred (100).

• Expresar la edad (¡Regla clave A1!):
  En inglés NUNCA se usa "have" para la edad. Se usa el verbo "To Be":
  - "I am 25 years old." (Tengo 25 años. / Literalmente: Soy 25 años viejo.)
  - "She is 18 years old." (Ella tiene 18 años.)
  - "How old are you?" (¿Cuántos años tienes?)

• Preguntar precios:
  - "How much is this?" (¿Cuánto cuesta esto?)
  - "It is 15 dollars." (Cuesta 15 dólares.)
  - "How much are these shoes?" (¿Cuánto cuestan estos zapatos?)`,
    dialogue: [
      { speaker: 'Clerk', textEn: 'Can I help you find something?', textEs: '¿Le ayudo a encontrar algo?' },
      { speaker: 'Customer', textEn: 'Yes, how much is this t-shirt?', textEs: 'Sí, ¿cuánto cuesta esta camiseta?' },
      { speaker: 'Clerk', textEn: 'It is twenty dollars.', textEs: 'Cuesta veinte dólares.' },
      { speaker: 'Customer', textEn: 'Great, I will take it. Here is twenty dollars.', textEs: 'Genial, me la llevo. Aquí tiene veinte dólares.' }
    ],
    quiz: [
      {
        id: 'q_a1_2_1',
        question: '¿Cómo se escribe el número 15 en inglés?',
        options: ['Fiveteen', 'Fifteen', 'Fifty', 'Fivety'],
        correctAnswer: 'Fifteen',
        explanation: 'El número 15 se escribe "Fifteen". "Fifty" corresponde al número 50.',
        hint: 'Tip: Los números del 13 al 19 terminan en "-teen".'
      },
      {
        id: 'q_a1_2_2',
        question: '¿Cuál es la forma correcta de decir "Tengo 20 años"?',
        options: ['I have 20 years', 'I am 20 years old', 'I make 20 years', 'I possess 20 years'],
        correctAnswer: 'I am 20 years old',
        explanation: 'En inglés la edad siempre utiliza el verbo "To Be" (I am).',
        hint: 'Tip: En inglés dices qué tan viejo "eres" (I am ... years old).'
      },
      {
        id: 'q_a1_2_3',
        question: '¿Cómo preguntas el precio de un artículo singular en una tienda?',
        options: ['How many is this?', 'How much is this?', 'What price have this?', 'How money is this?'],
        correctAnswer: 'How much is this?',
        explanation: '"How much is this?" es la fórmula correcta para consultar el precio.',
        hint: 'Tip: Para cantidades no contables o dinero usamos "How much".'
      },
      {
        id: 'q_a1_2_4',
        question: '¿Cómo preguntas la edad a otra persona?',
        options: ['How many years have you?', 'How old are you?', 'What age have you?', 'How years are you?'],
        correctAnswer: 'How old are you?',
        explanation: '"How old are you?" es la pregunta universal en inglés para conocer la edad de alguien.',
        hint: 'Tip: "How old" significa "¿Qué tan viejo/a?".'
      },
      {
        id: 'q_a1_2_5',
        type: 'word-order',
        question: 'Ordena las palabras: "She is thirty years old."',
        options: ['She', 'is', 'thirty', 'years', 'old.'],
        correctAnswer: 'She is thirty years old.',
        explanation: 'Estructura de edad: Sujeto + verbo To Be (is) + número + years old.',
        hint: 'Sujeto (She) + is + thirty + years old.'
      }
    ]
  },
  {
    id: 'a1_ini_3',
    day: 3,
    title: '3. Pronombres Sujeto (Subject Pronouns)',
    description: 'Los bloques esenciales para saber de quién se habla en la oración en inglés.',
    content: `Los pronombres reemplazan los nombres propios en las oraciones.

• Pronombres Sujeto en inglés:
  - I (Yo) -> ¡Siempre se escribe en Mayúscula!
  - You (Tú / Usted / Ustedes - sirve para singular y plural)
  - He (Él - para un hombre)
  - She (Ella - para una mujer)
  - It (Eso/Ello - para un objeto, animal, clima, lugar o concepto singular)
  - We (Nosotros / Nosotras)
  - They (Ellos / Ellas - personas, objetos o animales en plural)

• Reglas de reemplazo:
  - "Carlos is a doctor." -> "He is a doctor."
  - "Maria and I are friends." -> "We are friends."
  - "The book is on the table." -> "It is on the table."
  - "The cars are new." -> "They are new."`,
    quiz: [
      {
        id: 'q_a1_3_1',
        question: '¿Qué pronombre usas para decir "Nosotros / Nosotras"?',
        options: ['They', 'We', 'He', 'You'],
        correctAnswer: 'We',
        explanation: '"We" significa nosotros o nosotras en inglés.',
        hint: 'Tip: Empieza con W.'
      },
      {
        id: 'q_a1_3_2',
        question: '¿Qué pronombre se usa para un objeto o animal singular (por ejemplo, "the computer")?',
        options: ['He', 'She', 'It', 'They'],
        correctAnswer: 'It',
        explanation: '"It" es el pronombre neutro singular para cosas, animales y situaciones.',
        hint: 'Tip: Pronombre neutro de dos letras.'
      },
      {
        id: 'q_a1_3_3',
        question: 'Si hablas de "Sarah and John" (ellos), ¿qué pronombre los sustituye?',
        options: ['We', 'They', 'You', 'He'],
        correctAnswer: 'They',
        explanation: '"They" se usa para referirse a terceras personas en plural (ellos/ellas).',
        hint: 'Tip: Significa "Ellos".'
      },
      {
        id: 'q_a1_3_4',
        question: '¿Cuál de las siguientes afirmaciones sobre el pronombre "I" (Yo) es correcta?',
        options: [
          'Se escribe en minúscula si va al medio de la oración',
          'Siempre se escribe en MAYÚSCULA sin importar su posición',
          'Solo se usa con nombres femeninos',
          'Significa "Usted"'
        ],
        correctAnswer: 'Siempre se escribe en MAYÚSCULA sin importar su posición',
        explanation: 'En inglés, el pronombre "I" siempre va en mayúscula obligatoriamente.',
        hint: 'Tip: Siempre mayúscula: "I am", "you and I".'
      },
      {
        id: 'q_a1_3_5',
        type: 'word-order',
        question: 'Ordena la frase: "They are my best friends."',
        options: ['They', 'are', 'my', 'best', 'friends.'],
        correctAnswer: 'They are my best friends.',
        explanation: 'Sujeto (They) + Verbo (are) + Posesivo (my) + Adjetivo (best) + Sustantivo (friends).',
        hint: 'Inicia con They + are.'
      }
    ]
  },
  {
    id: 'a1_ini_4',
    day: 4,
    title: '4. Verbo To Be (Am, Is, Are) - Ser o Estar',
    description: 'Aprende a usar el verbo más básico e importante del inglés en afirmativo y negativo.',
    content: `El verbo "To Be" significa tanto "SER" como "ESTAR". El contexto te dice cuál es.

• Conjugación Afirmativa:
  - I -> am ("I am a teacher" / "I am in New York")
  - He / She / It -> is ("She is happy" / "He is at home" / "It is sunny")
  - You / We / They -> are ("You are smart" / "We are ready" / "They are tired")

• Contracciones Afirmativas comunes:
  - I'm, He's, She's, It's, You're, We're, They're.

• Conjugación Negativa (añadiendo "not"):
  - I am not (I'm not)
  - He / She / It is not (isn't)
  - You / We / They are not (aren't)

• Ejemplos:
  - "I am not hungry." (No tengo hambre / No estoy hambriento.)
  - "They aren't at school today." (Ellos no están en la escuela hoy.)`,
    dialogue: [
      { speaker: 'Lucas', textEn: 'Are you tired after work?', textEs: '¿Estás cansado después del trabajo?' },
      { speaker: 'Sofia', textEn: 'No, I am not tired. I am very energized!', textEs: 'No, no estoy cansada. ¡Estoy con mucha energía!' },
      { speaker: 'Lucas', textEn: 'Great! We are ready for English class.', textEs: '¡Genial! Estamos listos para la clase de inglés.' }
    ],
    quiz: [
      {
        id: 'q_a1_4_1',
        question: '¿Cuál es la forma del verbo To Be para "She"?',
        options: ['She am', 'She are', 'She is', 'She be'],
        correctAnswer: 'She is',
        explanation: 'Para la 3ª persona singular (He, She, It) la forma de To Be en presente es "is".',
        hint: 'Tip: He is, She is, It is.'
      },
      {
        id: 'q_a1_4_2',
        question: '¿Cómo dices "Nosotros no estamos cansados"?',
        options: ['We am not tired', 'We isn\'t tired', 'We aren\'t tired', 'We not be tired'],
        correctAnswer: "We aren't tired",
        explanation: '"We" se combina en negativo con "aren\'t" (are not).',
        hint: 'Tip: Plural con "aren\'t".'
      },
      {
        id: 'q_a1_4_3',
        question: 'Completa la frase: "I ___ a student and my brother ___ a doctor."',
        options: ['am / is', 'is / are', 'are / is', 'am / are'],
        correctAnswer: 'am / is',
        explanation: 'Para "I" se usa "am", y para "my brother" (He) se usa "is".',
        hint: 'I am... my brother is...'
      },
      {
        id: 'q_a1_4_4',
        type: 'word-order',
        question: 'Ordena la frase: "They are not at home."',
        options: ['They', 'are', 'not', 'at', 'home.'],
        correctAnswer: 'They are not at home.',
        explanation: 'Sujeto (They) + Verbo (are) + Negación (not) + Lugar (at home).',
        hint: 'Sujeto + are not + at home.'
      },
      {
        id: 'q_a1_4_5',
        question: '¿Cuál es la contracción corta para "It is"?',
        options: ["It's", "Its'", "Is'it", "It're"],
        correctAnswer: "It's",
        explanation: '"It\'s" es la contracción de "It is".',
        hint: 'Tip: Lleva apóstrofe antes de la s: It\'s.'
      }
    ]
  },
  {
    id: 'a1_ini_5',
    day: 5,
    title: '5. Preguntas con To Be y Palabras W/H',
    description: 'Estructuras para hacer preguntas de Sí/No y solicitar información detallada en inglés.',
    content: `Para preguntar con To Be inviertes la posición. Para información usas palabras W/H.

1. Preguntas Sí/No (Inversión del verbo To Be al inicio):
  - Afirmativo: "You are ready."
  - Pregunta: "Are you ready?" -> "Yes, I am." / "No, I'm not."
  - "Is he at home?" -> "Yes, he is." / "No, he isn't."

2. Palabras Interrogativas W/H:
  - What? (¿Qué / Cuál?): "What is your name?" | "What is this?"
  - Where? (¿Dónde?): "Where are you from?" | "Where is the bathroom?"
  - Who? (¿Quién?): "Who is your teacher?"
  - When? (¿Cuándo?): "When is the meeting?"
  - Why? (¿Por qué?): "Why are you late?" (Respuesta: "Because...")
  - How? (¿Cómo / Cuán?): "How are you?" | "How much is it?"`,
    dialogue: [
      { speaker: 'Officer', textEn: 'Where are you from?', textEs: '¿De dónde es usted?' },
      { speaker: 'Traveler', textEn: 'I am from Spain. I am in Miami on vacation.', textEs: 'Soy de España. Estoy en Miami de vacaciones.' },
      { speaker: 'Officer', textEn: 'What is your hotel name?', textEs: '¿Cuál es el nombre de su hotel?' },
      { speaker: 'Traveler', textEn: 'It is the Grand Beach Hotel.', textEs: 'Es el Grand Beach Hotel.' }
    ],
    quiz: [
      {
        id: 'q_a1_5_1',
        question: '¿Qué palabra W/H preguntas para saber un lugar?',
        options: ['What', 'Where', 'When', 'Who'],
        correctAnswer: 'Where',
        explanation: '"Where" significa "¿Dónde?" en inglés y pregunta por una ubicación.',
        hint: 'Tip: Pregunta por ubicación.'
      },
      {
        id: 'q_a1_5_2',
        question: '¿Cómo preguntas correctamente "¿Estás listo?"?',
        options: ['You are ready?', 'Are you ready?', 'Is you ready?', 'Am you ready?'],
        correctAnswer: 'Are you ready?',
        explanation: 'En preguntas con To Be, el verbo "Are" va al inicio delante de "you".',
        hint: 'Tip: Pon el verbo antes del pronombre.'
      },
      {
        id: 'q_a1_5_3',
        question: '¿Cuál es la palabra W/H para preguntar la causa o razón ("¿Por qué?")?',
        options: ['Who', 'Why', 'When', 'Which'],
        correctAnswer: 'Why',
        explanation: '"Why" significa "¿Por qué?" y se responde con "Because...".',
        hint: 'Tip: Empieza con Wh y termina en y.'
      },
      {
        id: 'q_a1_5_4',
        type: 'word-order',
        question: 'Ordena la pregunta: "Where is the train station?"',
        options: ['Where', 'is', 'the', 'train', 'station?'],
        correctAnswer: 'Where is the train station?',
        explanation: 'Estructura W/H: Palabra W/H (Where) + Verbo (is) + Sujeto (the train station)?',
        hint: 'Where + is + the train station?'
      },
      {
        id: 'q_a1_5_5',
        question: '¿Cómo respondes afirmativamente a la pregunta "Is she your sister?"?',
        options: ['Yes, she is.', 'Yes, she are.', 'Yes, is she.', 'Yes, she am.'],
        correctAnswer: 'Yes, she is.',
        explanation: 'La respuesta corta afirmativa para "she" es "Yes, she is."',
        hint: 'Tip: Yes, + pronombre + is.'
      }
    ]
  },
  {
    id: 'a1_ini_6',
    day: 6,
    title: '6. Países, Nacionalidades e Idiomas',
    description: 'Expresa con claridad de dónde eres, tu nacionalidad y qué idiomas hablas.',
    content: `Vocabulario internacional esencial para presentarte en el extranjero:

• Fórmulas de origen:
  - "I am from Spain." (País: I am from + País)
  - "I am Spanish." (Nacionalidad: I am + Nacionalidad)
  - "I speak Spanish and English." (Idiomas: I speak + Idiomas)

• Países, Nacionalidades e Idiomas más comunes:
  - Mexico -> Mexican -> Spanish
  - United States -> American -> English
  - Spain -> Spanish -> Spanish
  - Colombia -> Colombian -> Spanish
  - France -> French -> French
  - Germany -> German -> German
  - Italy -> Italian -> Italian
  - Japan -> Japanese -> Japanese
  - Brazil -> Brazilian -> Portuguese`,
    dialogue: [
      { speaker: 'Alex', textEn: 'Hi! Where are you from originally?', textEs: '¡Hola! ¿De dónde eres originalmente?' },
      { speaker: 'Camila', textEn: 'I am from Colombia. I am Colombian.', textEs: 'Soy de Colombia. Soy colombiana.' },
      { speaker: 'Alex', textEn: 'Do you speak French too?', textEs: '¿Hablas francés también?' },
      { speaker: 'Camila', textEn: 'No, I only speak Spanish and a little English.', textEs: 'No, solo hablo español y un poco de inglés.' }
    ],
    quiz: [
      {
        id: 'q_a1_6_1',
        question: '¿Cómo se dice "Yo hablo español e inglés"?',
        options: ['I talk Spanish and English', 'I speak Spanish and English', 'I say Spanish and English', 'I tell Spanish and English'],
        correctAnswer: 'I speak Spanish and English',
        explanation: 'Para idiomas se utiliza siempre el verbo "speak" (hablar un idioma).',
        hint: 'Tip: "Speak languages".'
      },
      {
        id: 'q_a1_6_2',
        question: 'Si alguien es de México, ¿cuál es su nacionalidad en inglés?',
        options: ['Mexicain', 'Mexican', 'Mexicish', 'Mexicano'],
        correctAnswer: 'Mexican',
        explanation: 'La nacionalidad correspondiente a México es "Mexican".',
        hint: 'Tip: Termina en -an.'
      },
      {
        id: 'q_a1_6_3',
        question: '¿Cuál es la diferencia entre "I am from France" e "I am French"?',
        options: [
          'La primera indica país de procedencia y la segunda indica nacionalidad',
          'La primera indica idioma y la segunda indica edad',
          'Significan cosas opuestas',
          'No tienen ninguna diferencia'
        ],
        correctAnswer: 'La primera indica país de procedencia y la segunda indica nacionalidad',
        explanation: '"From France" indica el país de origen y "French" es el adjetivo de nacionalidad.',
        hint: '"From" siempre introduce el país.'
      },
      {
        id: 'q_a1_6_4',
        type: 'word-order',
        question: 'Ordena las palabras: "I am from the United States."',
        options: ['I', 'am', 'from', 'the', 'United', 'States.'],
        correctAnswer: 'I am from the United States.',
        explanation: 'Estructura: I am from + the United States.',
        hint: 'Inicia con I am from...'
      },
      {
        id: 'q_a1_6_5',
        question: '¿Cómo dices "Ella habla tres idiomas"?',
        options: ['She speaks three languages', 'She speak three languages', 'She is speak three languages', 'She speaking three languages'],
        correctAnswer: 'She speaks three languages',
        explanation: 'En presente simple con "She", el verbo lleva "-s" (speaks).',
        hint: 'Tip: Agrega -s a speak para She.'
      }
    ]
  },
  {
    id: 'a1_ini_7',
    day: 7,
    title: '7. La Familia y Adjetivos Posesivos',
    description: 'Nombra a tus parientes y expresa posesión con My, Your, His, Her, Our, Their.',
    content: `Vocabulario de familia y adjetivos posesivos fundamentales:

• Miembros de la Familia:
  - Father / Dad (Padre / Papá) | Mother / Mom (Madre / Mamá) | Parents (Padres)
  - Brother (Hermano) | Sister (Hermana) | Siblings (Hermanos en general)
  - Son (Hijo) | Daughter (Hija) | Children / Kids (Hijos / Niños)
  - Husband (Esposo) | Wife (Esposa)
  - Grandfather (Abuelo) | Grandmother (Abuela)

• Adjetivos Posesivos (indican de quién es algo):
  - I -> My (Mi / Mis) : "My house is big."
  - You -> Your (Tu / Tus) : "Your dog is cute."
  - He -> His (Su / Sus - de él) : "His car is red."
  - She -> Her (Su / Sus - de ella) : "Her brother is tall."
  - It -> Its (Su / Sus - de un objeto/animal) : "The cat is drinking its milk."
  - We -> Our (Nuestro / Nuestra / Nuestros) : "Our family is united."
  - They -> Their (Su / Sus - de ellos) : "Their children are smart."`,
    dialogue: [
      { speaker: 'Daniel', textEn: 'Is this a photo of your family?', textEs: '¿Es esta una foto de tu familia?' },
      { speaker: 'Laura', textEn: 'Yes! This is my husband and our two kids.', textEs: '¡Sí! Este es mi esposo y nuestros dos hijos.' },
      { speaker: 'Daniel', textEn: 'What are their names?', textEs: '¿Cuáles son sus nombres?' },
      { speaker: 'Laura', textEn: 'His name is Leo and her name is Maya.', textEs: 'Su nombre es Leo y el de ella es Maya.' }
    ],
    quiz: [
      {
        id: 'q_a1_7_1',
        question: '¿Qué adjetivo posesivo usas para referirte al auto de ELLA (She)?',
        options: ['His car', 'Her car', 'Your car', 'Their car'],
        correctAnswer: 'Her car',
        explanation: '"Her" es el adjetivo posesivo femenino singular (su de ella).',
        hint: 'Tip: "His" para hombres, "Her" para mujeres.'
      },
      {
        id: 'q_a1_7_2',
        question: '¿Qué palabra engloba tanto a tu padre como a tu madre juntos?',
        options: ['Brothers', 'Sons', 'Parents', 'Fathers'],
        correctAnswer: 'Parents',
        explanation: '"Parents" significa padres (mamá y papá juntos). "Relatives" son parientes en general.',
        hint: 'Tip: No confundir con parientes.'
      },
      {
        id: 'q_a1_7_3',
        question: 'Completa la frase: "We love ___ new house." (Nuestra)',
        options: ['our', 'their', 'his', 'her'],
        correctAnswer: 'our',
        explanation: 'El posesivo correspondiente a "We" (Nosotros) es "Our" (Nuestro/a).',
        hint: 'Tip: We -> Our.'
      },
      {
        id: 'q_a1_7_4',
        type: 'word-order',
        question: 'Ordena la frase: "My brother is twenty years old."',
        options: ['My', 'brother', 'is', 'twenty', 'years', 'old.'],
        correctAnswer: 'My brother is twenty years old.',
        explanation: 'Posesivo (My) + Sujeto (brother) + Verbo (is) + Edad (twenty years old).',
        hint: 'My brother is...'
      },
      {
        id: 'q_a1_7_5',
        question: '¿Cómo dices "El nombre de él es Carlos"?',
        options: ['His name is Carlos', 'Her name is Carlos', 'Your name is Carlos', 'Their name is Carlos'],
        correctAnswer: 'His name is Carlos',
        explanation: '"His" es el posesivo masculino singular (de él).',
        hint: 'Tip: Masculino de él = His.'
      }
    ]
  },
  {
    id: 'a1_ini_8',
    day: 8,
    title: '8. Artículos (A, An, The) y Plurales Regulares/Irregulares',
    description: 'Aprende a usar A / AN correctamente y a formar sustantivos plurales con fluidez.',
    content: `Reglas fundamentales de artículos e identificadores en inglés:

1. Artículo Indefinido: A vs. AN (Un / Una)
  - Usamos "A" antes de sonido de consonante: "a book", "a car", "a doctor", "a university" (/ju:/).
  - Usamos "AN" antes de sonido de vocal (a, e, i, o, u): "an apple", "an umbrella", "an orange", "an hour" (la 'h' es muda).

2. Artículo Definido: THE (El / La / Los / Las)
  - Sirve para cosas específicas conocidas por ambos interlocutores: "The sun", "The teacher", "The books on the desk".

3. Plurales en inglés:
  - Regla general: añade "-s" (cat -> cats, book -> books).
  - Terminados en -s, -ss, -sh, -ch, -x: añade "-es" (bus -> buses, watch -> watches, box -> boxes).
  - Plurales irregulares esenciales que DEBES memorizar:
    - Man -> Men (Hombre -> Hombres)
    - Woman -> Women (Mujer -> Mujeres)
    - Child -> Children (Niño/a -> Niños)
    - Person -> People (Persona -> Personas / Gente)
    - Foot -> Feet (Pie -> Pies)
    - Tooth -> Teeth (Diente -> Dientes)`,
    quiz: [
      {
        id: 'q_a1_8_1',
        question: '¿Cuál es la opción correcta antes de la palabra "apple"?',
        options: ['a apple', 'an apple', 'the an apple', 'one an apple'],
        correctAnswer: 'an apple',
        explanation: 'Al empezar con sonido de vocal, se utiliza "an".',
        hint: 'Tip: "An" antecede sonidos vocálicos.'
      },
      {
        id: 'q_a1_8_2',
        question: '¿Cuál es el plural irregular de la palabra "child" (niño)?',
        options: ['childs', 'childes', 'children', 'childrens'],
        correctAnswer: 'children',
        explanation: 'El plural de "child" es "children" (nunca lleva s final).',
        hint: 'Tip: Termina en -ren.'
      },
      {
        id: 'q_a1_8_3',
        question: '¿Cuál es la forma plural de "person"?',
        options: ['persons', 'peoples', 'people', 'persones'],
        correctAnswer: 'people',
        explanation: 'El plural estándar de "person" en inglés es "people".',
        hint: 'Tip: "People" significa personas o gente.'
      },
      {
        id: 'q_a1_8_4',
        type: 'word-order',
        question: 'Ordena la frase: "There is an apple on the table."',
        options: ['There', 'is', 'an', 'apple', 'on', 'the', 'table.'],
        correctAnswer: 'There is an apple on the table.',
        explanation: 'Estructura: There is + an apple + on the table.',
        hint: 'There is an apple...'
      },
      {
        id: 'q_a1_8_5',
        question: '¿Por qué decimos "an hour" y no "a hour"?',
        options: [
          'Porque la letra "h" en "hour" es muda y empieza con sonido de vocal',
          'Porque es una palabra larga',
          'Porque significa tiempo',
          'Es una excepción sin motivo fonético'
        ],
        correctAnswer: 'Porque la letra "h" en "hour" es muda y empieza con sonido de vocal',
        explanation: 'La regla de A/AN se basa en el SONIDO fonético inicial, no en la letra escrita.',
        hint: 'Tip: "hour" suena como /aʊər/.'
      }
    ]
  },
  {
    id: 'a1_ini_9',
    day: 9,
    title: '9. Demostrativos (This, That, These, Those)',
    description: 'Señala objetos con precisión según su número (singular/plural) y distancia (cerca/lejos).',
    content: `Los demostrativos ubican objetos respecto a la posición física del hablante:

• Cerca de ti (Aquí / Here):
  - THIS (Este / Esta / Esto - Singular) : "This is my phone." (Lo tienes en la mano)
  - THESE (Estos / Estas - Plural) : "These are my keys." (Están cerca de ti)

• Lejos de ti (Allá / There):
  - THAT (Aquel / Ese / Esa / Eso - Singular) : "That is a plane in the sky."
  - THOSE (Aquellos / Esos / Esas - Plural) : "Those are mountains."

• Tabla Resumen:
  | Distancia | Singular | Plural |
  | Cerca     | THIS     | THESE  |
  | Lejos     | THAT     | THOSE  |`,
    dialogue: [
      { speaker: 'Customer', textEn: 'Excuse me, how much is this watch?', textEs: 'Disculpe, ¿cuánto cuesta este reloj (aquí)?' },
      { speaker: 'Vendor', textEn: 'This watch is $50, but those watches over there are $30.', textEs: 'Este reloj cuesta $50, pero aquellos relojes de allá cuestan $30.' },
      { speaker: 'Customer', textEn: 'Can I see that black one over there?', textEs: '¿Puedo ver aquel negro de allá?' }
    ],
    quiz: [
      {
        id: 'q_a1_9_1',
        question: 'Tienes varias llaves en la mano (plural y cerca de ti). ¿Qué frase utilizas?',
        options: ['This is my keys', 'These are my keys', 'That is my keys', 'Those are my keys'],
        correctAnswer: 'These are my keys',
        explanation: 'Plural + Cercanía = "These are".',
        hint: 'Tip: "These" para varios elementos cerca.'
      },
      {
        id: 'q_a1_9_2',
        question: 'Señalas un solo avión a lo lejos en el cielo (singular y lejos). ¿Qué usas?',
        options: ['This is a plane', 'These are planes', 'That is a plane', 'Those are planes'],
        correctAnswer: 'That is a plane',
        explanation: 'Singular + Lejos = "That is".',
        hint: 'Tip: "That" para uno solo a lo lejos.'
      },
      {
        id: 'q_a1_9_3',
        question: '¿Cuál es el plural de "that" (lejos)?',
        options: ['these', 'those', 'this', 'thats'],
        correctAnswer: 'those',
        explanation: 'El plural de "that" (aquel) es "those" (aquellos).',
        hint: 'Tip: That (singular) -> Those (plural).'
      },
      {
        id: 'q_a1_9_4',
        type: 'word-order',
        question: 'Ordena la frase: "This book is very interesting."',
        options: ['This', 'book', 'is', 'very', 'interesting.'],
        correctAnswer: 'This book is very interesting.',
        explanation: 'Demostrativo (This) + Sustantivo (book) + Verbo (is) + Adverbio (very) + Adjetivo (interesting).',
        hint: 'This book is...'
      },
      {
        id: 'q_a1_9_5',
        question: 'Señalas varias camisetas colgadas al otro lado de la tienda (lejos y plural). ¿Qué dices?',
        options: ['These shirts are blue', 'Those shirts are blue', 'This shirt is blue', 'That shirts is blue'],
        correctAnswer: 'Those shirts are blue',
        explanation: 'Plural + Lejos = "Those shirts are...".',
        hint: 'Tip: Plural a distancia = Those.'
      }
    ]
  },
  {
    id: 'a1_ini_10',
    day: 10,
    title: '10. La Hora, Días de la Semana y Meses',
    description: 'Consulta y dice la hora, agenda citas y expresa fechas con las preposiciones correctas (At, On, In).',
    content: `Aprende a dominar el tiempo, las fechas y los horarios en inglés:

• Preguntar y dar la hora:
  - "¿Qué hora es?": "What time is it?" / "Do you have the time?"
  - "Son las 3 en punto": "It is 3 o'clock."
  - "Son las 4 y media (4:30)": "It is 4:30" (four thirty) o "It is half past four."
  - "Son las 5 y cuarto (5:15)": "It is a quarter past five."
  - "Falta un cuarto para las 6 (5:45)": "It is a quarter to six."

• Días de la semana (¡Siempre con preposición ON y con Mayúscula!):
  - Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday.
  - "I have English class on Monday." (Tengo clase de inglés el lunes.)

• Meses del año (¡Siempre con preposición IN y con Mayúscula!):
  - January, February, March, April, May, June, July, August, September, October, November, December.
  - "My birthday is in July." (Mi cumpleaños es en julio.)

• Regla de oro de preposiciones de tiempo:
  - AT -> para horas y momentos exactos: "at 5 PM", "at midnight".
  - ON -> para días y fechas específicas: "on Friday", "on July 4th".
  - IN -> para meses, años y estaciones: "in July", "in 2026", "in summer".`,
    dialogue: [
      { speaker: 'Mark', textEn: 'Excuse me, what time is the meeting?', textEs: 'Disculpe, ¿a qué hora es la reunión?' },
      { speaker: 'Anna', textEn: 'The meeting is at 2:30 PM on Wednesday.', textEs: 'La reunión es a las 2:30 PM el miércoles.' },
      { speaker: 'Mark', textEn: 'Perfect, thank you! See you on Wednesday.', textEs: 'Perfecto, ¡gracias! Nos vemos el miércoles.' }
    ],
    quiz: [
      {
        id: 'q_a1_10_1',
        question: '¿Qué preposición usas antes de los días de la semana (ej. "el Lunes")?',
        options: ['in', 'at', 'on', 'by'],
        correctAnswer: 'on',
        explanation: 'Con días de la semana específicos usamos siempre "on" (on Monday, on Friday).',
        hint: 'Tip: "On" + día de la semana.'
      },
      {
        id: 'q_a1_10_2',
        question: '¿Cómo preguntas "¿Qué hora es?" de forma estándar?',
        options: ['What hour is it?', 'What time is it?', 'Which time is?', 'How hours is it?'],
        correctAnswer: 'What time is it?',
        explanation: '"What time is it?" es la pregunta fija y natural en inglés.',
        hint: 'Tip: Usamos la palabra "time".'
      },
      {
        id: 'q_a1_10_3',
        question: '¿Qué preposición se usa para las horas exactas ("a las 8:00 AM")?',
        options: ['at', 'on', 'in', 'for'],
        correctAnswer: 'at',
        explanation: 'Para horas precisas se usa obligatoriamente "at" (at 8:00 AM).',
        hint: 'Tip: Horas precisas usan "at".'
      },
      {
        id: 'q_a1_10_4',
        type: 'word-order',
        question: 'Ordena la frase: "The party is on Saturday at eight o\'clock."',
        options: ['The', 'party', 'is', 'on', 'Saturday', 'at', 'eight', "o'clock."],
        correctAnswer: "The party is on Saturday at eight o'clock.",
        explanation: 'Estructura: The party is + on Saturday (día) + at eight o\'clock (hora).',
        hint: 'The party is on Saturday...'
      },
      {
        id: 'q_a1_10_5',
        question: 'Completa: "My brother was born ___ 1998 ___ December."',
        options: ['in / in', 'on / at', 'at / in', 'in / on'],
        correctAnswer: 'in / in',
        explanation: 'Tanto los años (1998) como los meses sueltos (December) usan la preposición "in".',
        hint: 'Tip: Años y meses llevan "in".'
      }
    ]
  }
];

// ==========================================
// 2. A1 INTERMEDIO (CONSOLIDACIÓN A1 EN INGLÉS)
// ==========================================
export const a1IntermedioLessons: LessonStep[] = [
  {
    id: 'a1_int_1',
    day: 1,
    title: '1. Presente Simple: Rutinas y Hábitos Diarios',
    description: 'Habla sobre lo que haces habitualmente y domina la regla de la 3ª persona (-s/-es) y auxiliares DO / DOES.',
    content: `El Presente Simple sirve para describir hábitos, rutinas y verdades generales.

• Afirmativo (Regla de la 3ª persona singular):
  Para I / You / We / They -> verbo en forma base:
  - "I work every day." | "We live in New York."
  Para He / She / It -> se agrega "-s" o "-es" al verbo:
  - "He works every day." (work -> works)
  - "She watches TV." (watch -> watches)
  - "He studies English." (study -> studies)

• Negaciones con DON'T / DOESN'T:
  - I / You / We / They -> don't + verbo base ("I don't drink coffee.")
  - He / She / It -> doesn't + verbo base ("She doesn't eat meat.") (¡al poner doesn't se quita la -s del verbo!)

• Preguntas con DO / DOES:
  - "Do you speak English?" -> "Yes, I do." / "No, I don't."
  - "Does he live here?" -> "Yes, he does." / "No, he doesn't."`,
    dialogue: [
      { speaker: 'Ryan', textEn: 'Do you drink coffee in the morning?', textEs: '¿Bebes café por la mañana?' },
      { speaker: 'Jessica', textEn: 'Yes, I drink two cups! But my husband doesn\'t drink coffee.', textEs: '¡Sí, bebo dos tazas! Pero mi esposo no bebe café.' },
      { speaker: 'Ryan', textEn: 'What does he drink?', textEs: '¿Qué bebe él?' },
      { speaker: 'Jessica', textEn: 'He drinks green tea.', textEs: 'Él bebe té verde.' }
    ],
    quiz: [
      {
        id: 'q_a1_int_1_1',
        question: '¿Cómo dices en afirmativo "Ella trabaja todos los días"?',
        options: ['She work every day', 'She works every day', 'She is work every day', 'She working every day'],
        correctAnswer: 'She works every day',
        explanation: 'Para "She" en afirmativo en presente simple se le suma la "-s" al verbo (works).',
        hint: 'Tip: Agrega "-s" al verbo para He/She/It.'
      },
      {
        id: 'q_a1_int_1_2',
        question: '¿Cómo niegas correctamente la oración "He speaks French"?',
        options: ['He don\'t speak French', 'He doesn\'t speak French', 'He not speak French', 'He isn\'t speak French'],
        correctAnswer: "He doesn't speak French",
        explanation: 'Para He/She/It se usa el auxiliar negativo "doesn\'t" y el verbo vuelve a su forma base (speak).',
        hint: 'Tip: Auxiliar "doesn\'t".'
      },
      {
        id: 'q_a1_int_1_3',
        question: '¿Cómo preguntas a alguien si vive en Madrid?',
        options: ['Do you live in Madrid?', 'Does you live in Madrid?', 'Are you live in Madrid?', 'Live you in Madrid?'],
        correctAnswer: 'Do you live in Madrid?',
        explanation: 'Con "you" el auxiliar de pregunta en presente simple es "Do".',
        hint: 'Tip: Pregunta con "Do you...".'
      },
      {
        id: 'q_a1_int_1_4',
        type: 'word-order',
        question: 'Ordena la frase: "She wakes up at seven every day."',
        options: ['She', 'wakes', 'up', 'at', 'seven', 'every', 'day.'],
        correctAnswer: 'She wakes up at seven every day.',
        explanation: 'Sujeto (She) + Verbo con -s (wakes up) + Hora (at seven) + Frecuencia (every day).',
        hint: 'She wakes up...'
      },
      {
        id: 'q_a1_int_1_5',
        question: '¿Cuál oración tiene un error gramatical?',
        options: ['He doesn\'t works on Sunday', 'He doesn\'t work on Sunday', 'I don\'t work on Sunday', 'They work on Sunday'],
        correctAnswer: 'He doesn\'t works on Sunday',
        explanation: 'Cuando se usa "doesn\'t", el verbo principal NO debe llevar "-s" (debe ser work, no works).',
        hint: 'Tip: "doesn\'t" ya absorbe la s.'
      }
    ]
  },
  {
    id: 'a1_int_2',
    day: 2,
    title: '2. Adverbios de Frecuencia (Always, Usually, Sometimes, Never)',
    description: 'Expresa con exactitud qué tan a menudo realizas tus actividades cotidianas.',
    content: `Los adverbios de frecuencia indican la regularidad de una acción:

• Escala de Frecuencia:
  - Always (100% - Siempre) : "I always brush my teeth."
  - Usually / Normally (80% - Usualmente) : "He usually drives to work."
  - Often (60% - A menudo / Frecuentemente) : "We often cook at home."
  - Sometimes (50% - A veces) : "They sometimes play tennis."
  - Rarely / Seldom (10% - Rara vez) : "I rarely eat fast food."
  - Never (0% - Nunca) : "She never drinks alcohol."

• Posición en la oración (¡Regla de oro!):
  1. ANTES del verbo principal: "Sujeto + Adverbio + Verbo"
     - "I ALWAYS drink water." | "She NEVER arrives late."
  2. DESPUÉS del verbo To Be (am/is/are):
     - "He is ALWAYS happy." | "They are OFTEN busy."`,
    quiz: [
      {
        id: 'q_a1_int_2_1',
        question: '¿Dónde se coloca "always" en una oración con un verbo común como "eat"?',
        options: ['I eat always breakfast', 'I always eat breakfast', 'I eat breakfast always', 'Always I eat breakfast'],
        correctAnswer: 'I always eat breakfast',
        explanation: 'Los adverbios de frecuencia van inmediatamente antes del verbo principal (eat).',
        hint: 'Tip: Entre el sujeto (I) y el verbo (eat).'
      },
      {
        id: 'q_a1_int_2_2',
        question: 'Si nunca bebes café, ¿cuál es la forma correcta de expresarlo?',
        options: ['I don\'t never drink coffee', 'I never drink coffee', 'I drink never coffee', 'I not never drink'],
        correctAnswer: 'I never drink coffee',
        explanation: '"Never" ya tiene significado negativo, por lo que en inglés NO se usa "don\'t" (evitar doble negación).',
        hint: 'Tip: Evita la doble negación.'
      },
      {
        id: 'q_a1_int_2_3',
        question: '¿Cuál es la posición correcta con el verbo To Be?',
        options: ['She always is happy', 'She is always happy', 'She happy is always', 'Always she is happy'],
        correctAnswer: 'She is always happy',
        explanation: 'Con el verbo To Be, el adverbio de frecuencia va DESPUÉS del verbo (is always).',
        hint: 'Tip: To Be + Adverbio.'
      },
      {
        id: 'q_a1_int_2_4',
        type: 'word-order',
        question: 'Ordena la frase: "We usually have lunch at noon."',
        options: ['We', 'usually', 'have', 'lunch', 'at', 'noon.'],
        correctAnswer: 'We usually have lunch at noon.',
        explanation: 'Sujeto (We) + Adverbio (usually) + Verbo (have) + Objeto (lunch) + Tiempo (at noon).',
        hint: 'We usually have...'
      },
      {
        id: 'q_a1_int_2_5',
        question: '¿Qué pregunta usas para saber con qué frecuencia alguien hace algo?',
        options: ['How many times?', 'How often do you exercise?', 'When do you always exercise?', 'How much do you exercise?'],
        correctAnswer: 'How often do you exercise?',
        explanation: '"How often...?" es la pregunta clave en inglés para consultar frecuencia.',
        hint: 'Tip: "How often" = ¿Con qué frecuencia? / ¿Cada cuánto?'
      }
    ]
  },
  {
    id: 'a1_int_3',
    day: 3,
    title: '3. Gustos y Preferencias (Like, Love, Prefer, Hate + -ING)',
    description: 'Aprende a expresar lo que disfrutas, prefieres o detestas hacer en tu tiempo libre.',
    content: `Para hablar de aficiones, hobbies y preferencias personales:

• Verbos de preferencia:
  - Love (Encantar / Amar) : "I love music."
  - Like (Gustar) : "I like pizza."
  - Prefer (Preferir) : "I prefer tea."
  - Don't mind (No importar / Dar igual) : "I don't mind walking."
  - Dislike / Don't like (No gustar) : "I don't like horror movies."
  - Hate (Odiar / Detestar) : "I hate waiting in line."

• Regla del segundo verbo (-ING):
  Cuando colocas un verbo de acción después de like, love o hate, añade "-ing" al verbo:
  - "I love READING books." (Me encanta leer libros.)
  - "She likes DANCING salsa." (A ella le gusta bailar salsa.)
  - "They hate WASHING the dishes." (Odian lavar los platos.)`,
    dialogue: [
      { speaker: 'Carlos', textEn: 'What do you like doing on weekends?', textEs: '¿Qué te gusta hacer los fines de semana?' },
      { speaker: 'Maya', textEn: 'I love going to the beach and reading novels. What about you?', textEs: 'Me encanta ir a la playa y leer novelas. ¿Y tú?' },
      { speaker: 'Carlos', textEn: 'I like playing video games and cooking for my family.', textEs: 'Me gusta jugar videojuegos y cocinar para mi familia.' }
    ],
    quiz: [
      {
        id: 'q_a1_int_3_1',
        question: '¿Cómo dices "Me gusta escuchar música" aplicando la regla gramatical?',
        options: ['I like listen music', 'I like listening to music', 'I like to listening music', 'I liking listen'],
        correctAnswer: 'I like listening to music',
        explanation: 'Después del verbo "like", la acción lleva la terminación "-ing" (listening to music).',
        hint: 'Tip: "like" + verbo con "-ing".'
      },
      {
        id: 'q_a1_int_3_2',
        question: '¿Qué significa "She hates waking up early"?',
        options: ['A ella le gusta levantarse temprano', 'Ella odia levantarse temprano', 'Ella suele levantarse temprano', 'Ella no puede levantarse temprano'],
        correctAnswer: 'Ella odia levantarse temprano',
        explanation: '"Hate" significa odiar o detestar.',
        hint: 'Tip: "Hate" es lo opuesto a "love".'
      },
      {
        id: 'q_a1_int_3_3',
        question: 'Completa: "He ___ playing soccer, but he doesn\'t like running."',
        options: ['loves', 'love', 'loving', 'is love'],
        correctAnswer: 'loves',
        explanation: 'Con el sujeto "He" en afirmativo se añade la "-s" al verbo (loves).',
        hint: 'Tip: He + loves.'
      },
      {
        id: 'q_a1_int_3_4',
        type: 'word-order',
        question: 'Ordena la frase: "They love traveling around the world."',
        options: ['They', 'love', 'traveling', 'around', 'the', 'world.'],
        correctAnswer: 'They love traveling around the world.',
        explanation: 'Sujeto (They) + Verbo de preferencia (love) + Verbo en -ing (traveling) + Complemento.',
        hint: 'They love traveling...'
      },
      {
        id: 'q_a1_int_3_5',
        question: '¿Cómo niegas que a él le gusta el café?',
        options: ['He don\'t like coffee', 'He doesn\'t like coffee', 'He isn\'t like coffee', 'He not likes coffee'],
        correctAnswer: "He doesn't like coffee",
        explanation: 'Para la 3ª persona singular en presente simple usamos "doesn\'t like".',
        hint: 'Tip: He doesn\'t like.'
      }
    ]
  },
  {
    id: 'a1_int_4',
    day: 4,
    title: '4. La Casa, Mobiliario y "There is / There are" (Haber)',
    description: 'Describe las habitaciones de una vivienda, el mobiliario y la existencia de cosas.',
    content: `Expresa la existencia de objetos y personas en lugares determinados:

• Partes de la casa y mobiliario:
  - Living room (Sala de estar) : Sofa, TV, coffee table
  - Kitchen (Cocina) : Refrigerator/Fridge, stove, microwave
  - Bedroom (Dormitorio) : Bed, closet, lamp
  - Bathroom (Baño) : Shower, mirror, sink, towel
  - Garden / Balcony (Jardín / Balcón)

• THERE IS / THERE ARE (Significa "HAY" del verbo haber):
  - THERE IS (Singular - para una sola cosa):
    - "There is a sofa in the living room."
    - Negativo: "There isn't a TV."
    - Pregunta: "Is there a supermarket near here?" -> "Yes, there is." / "No, there isn't."
  
  - THERE ARE (Plural - para dos o más cosas):
    - "There are two beds in the bedroom."
    - Negativo: "There aren't any chairs."
    - Pregunta: "Are there clean towels?" -> "Yes, there are." / "No, there aren't."`,
    dialogue: [
      { speaker: 'Tenant', textEn: 'Is there a washing machine in the apartment?', textEs: '¿Hay una lavadora en el apartamento?' },
      { speaker: 'Landlord', textEn: 'Yes, there is one in the kitchen. And there are two big closets in the bedroom.', textEs: 'Sí, hay una en la cocina. Y hay dos armarios grandes en el dormitorio.' },
      { speaker: 'Tenant', textEn: 'That is wonderful! How many bathrooms are there?', textEs: '¡Eso es maravilloso! ¿Cuántos baños hay?' },
      { speaker: 'Landlord', textEn: 'There is one full bathroom.', textEs: 'Hay un baño completo.' }
    ],
    quiz: [
      {
        id: 'q_a1_int_4_1',
        question: '¿Cómo dices "Hay tres sillas en la cocina"?',
        options: ['There is three chairs in the kitchen', 'There are three chairs in the kitchen', 'Have three chairs in the kitchen', 'There be three chairs in the kitchen'],
        correctAnswer: 'There are three chairs in the kitchen',
        explanation: '"Three chairs" es plural, por lo que requiere obligatoriamente "There are".',
        hint: 'Tip: Plural = There are.'
      },
      {
        id: 'q_a1_int_4_2',
        question: '¿Cómo preguntas "¿Hay un hospital cerca de aquí?"?',
        options: ['Is there a hospital near here?', 'Are there a hospital near here?', 'There is a hospital near here?', 'Has there a hospital near here?'],
        correctAnswer: 'Is there a hospital near here?',
        explanation: 'Para preguntar por un elemento singular se invierte a "Is there...?".',
        hint: 'Tip: Inversión en singular: Is there...?'
      },
      {
        id: 'q_a1_int_4_3',
        question: '¿Qué palabra en inglés designa la habitación donde duermes?',
        options: ['Kitchen', 'Bathroom', 'Bedroom', 'Living room'],
        correctAnswer: 'Bedroom',
        explanation: '"Bedroom" es el dormitorio o habitación.',
        hint: 'Tip: Contiene "bed" (cama).'
      },
      {
        id: 'q_a1_int_4_4',
        type: 'word-order',
        question: 'Ordena la frase: "There are two cats under the bed."',
        options: ['There', 'are', 'two', 'cats', 'under', 'the', 'bed.'],
        correctAnswer: 'There are two cats under the bed.',
        explanation: 'There are (plural) + two cats + preposición (under the bed).',
        hint: 'There are two cats...'
      },
      {
        id: 'q_a1_int_4_5',
        question: 'Completa en negativo: "There ___ any milk in the fridge."',
        options: ["isn't", "aren't", "don't", "not is"],
        correctAnswer: "isn't",
        explanation: '"Milk" es un sustantivo incontable singular, por lo que se niega con "isn\'t".',
        hint: 'Tip: La leche es singular incontable (isn\'t).'
      }
    ]
  },
  {
    id: 'a1_int_5',
    day: 5,
    title: '5. Habilidades, Posibilidad y Permiso: CAN y CAN\'T',
    description: 'Expresa lo que puedes o sabes hacer, pide favores y solicita permisos con fluidez.',
    content: `El verbo modal CAN (Poder / Saber hacer algo):

• Características clave de los verbos modales:
  1. Es idéntico para TODOS los pronombres (NUNCA se añade "-s" en 3ª persona: "He can", no "He cans").
  2. El verbo que le sigue va en forma base directa (SIN "to": "I can swim", no "I can to swim").

• Estructuras:
  - Afirmativo:
    - "I can speak two languages." (Puedo/sé hablar dos idiomas.)
    - "She can drive very well." (Ella sabe conducir muy bien.)
  
  - Negativo (CANNOT / CAN'T):
    - "He can't come to the party." (Él no puede venir a la fiesta.)
    - "I can't swim." (No sé nadar.)
  
  - Preguntas y Peticiones amables:
    - "Can you help me, please?" (¿Puedes ayudarme, por favor?)
    - "Can I have a glass of water?" (¿Me da un vaso de agua?)
    - Respuestas: "Yes, I can." / "No, I can't."`,
    dialogue: [
      { speaker: 'Interviewer', textEn: 'Can you speak English and Spanish fluently?', textEs: '¿Puedes hablar inglés y español con fluidez?' },
      { speaker: 'Candidate', textEn: 'Yes, I can! And I can also use Excel very well.', textEs: '¡Sí, puedo! Y también sé usar Excel muy bien.' },
      { speaker: 'Interviewer', textEn: 'Can you start on Monday?', textEs: '¿Puedes comenzar el lunes?' },
      { speaker: 'Candidate', textEn: 'Yes, I can definitely start on Monday.', textEs: 'Sí, definitivamente puedo empezar el lunes.' }
    ],
    quiz: [
      {
        id: 'q_a1_int_5_1',
        question: '¿Cuál oración es gramaticalmente CORRECTA?',
        options: ['She can to speak English', 'She can speaks English', 'She can speak English', 'She cans speak English'],
        correctAnswer: 'She can speak English',
        explanation: 'Después del modal "can", el verbo va en infinitivo sin "to" y sin "-s".',
        hint: 'Tip: Sin "to" y sin "-s".'
      },
      {
        id: 'q_a1_int_5_2',
        question: '¿Cómo le preguntas a un amigo si sabe nadar?',
        options: ['Do you can swim?', 'Can you swim?', 'Are you swim?', 'You can swim?'],
        correctAnswer: 'Can you swim?',
        explanation: 'Para preguntas con CAN, simplemente colocamos "Can" al principio de la frase.',
        hint: 'Tip: "Can" encabeza la pregunta.'
      },
      {
        id: 'q_a1_int_5_3',
        question: '¿Cómo pides ayuda cortésmente a un extraño?',
        options: ['Can you help me, please?', 'Help me now!', 'You must help me.', 'Do help me.'],
        correctAnswer: 'Can you help me, please?',
        explanation: '"Can you help me, please?" es la fórmula más amable y común.',
        hint: 'Tip: "Can you help me, please?".'
      },
      {
        id: 'q_a1_int_5_4',
        type: 'word-order',
        question: 'Ordena la frase: "I can play the guitar."',
        options: ['I', 'can', 'play', 'the', 'guitar.'],
        correctAnswer: 'I can play the guitar.',
        explanation: 'Sujeto (I) + Modal (can) + Verbo (play) + Objeto (the guitar).',
        hint: 'I can play...'
      },
      {
        id: 'q_a1_int_5_5',
        question: '¿Cómo niegas que él puede conducir?',
        options: ['He doesn\'t can drive', 'He can\'t drive', 'He isn\'t drive', 'He not can drive'],
        correctAnswer: "He can't drive",
        explanation: 'La forma negativa de CAN es "can\'t" (cannot).',
        hint: 'Tip: Forma negativa = can\'t.'
      }
    ]
  },
  {
    id: 'a1_int_6',
    day: 6,
    title: '6. Alimentos, Bebidas y Ordenar en un Restaurante',
    description: 'Vocabulario gastronómico e interacciones reales para pedir comida y bebidas cortésmente.',
    content: `Aprende a pedir comida en restaurantes, cafeterías y mercados:

• Vocabulario de Alimentos y Bebidas:
  - Drinks: Water (Agua), Coffee (Café), Tea (Té), Juice (Jugo), Soda (Gaseosa)
  - Food: Bread (Pan), Rice (Arroz), Chicken (Pollo), Beef/Meat (Carne de res), Fish (Pescado), Salad (Ensalada), Cheese (Queso)
  - Meals: Breakfast (Desayuno), Lunch (Almuerzo), Dinner (Cena)

• Fórmulas educadas para ordenar:
  - "I would like a coffee, please." (Me gustaría un café, por favor.) -> Contracción: "I'd like..."
  - "Can I get a cheeseburger, please?" (¿Me da una hamburguesa con queso, por favor?)
  - "Could we have the menu, please?" (¿Nos da el menú, por favor?)
  - "The check, please." / "The bill, please." (La cuenta, por favor.)
  - "Keep the change." (Quédese con el cambio / propina.)`,
    dialogue: [
      { speaker: 'Waiter', textEn: 'Good evening! Are you ready to order?', textEs: '¡Buenas noches! ¿Están listos para ordenar?' },
      { speaker: 'Customer', textEn: 'Yes! I would like the grilled chicken with a salad, please.', textEs: '¡Sí! Me gustaría el pollo a la parrilla con ensalada, por favor.' },
      { speaker: 'Waiter', textEn: 'And to drink?', textEs: '¿Y de beber?' },
      { speaker: 'Customer', textEn: 'Just sparkling water with lemon, please.', textEs: 'Solo agua con gas y limón, por favor.' }
    ],
    quiz: [
      {
        id: 'q_a1_int_6_1',
        question: '¿Cómo pides un café cortésmente en un restaurante?',
        options: ['Give me coffee', 'I want coffee now', 'I would like a coffee, please', 'Coffee for me'],
        correctAnswer: 'I would like a coffee, please',
        explanation: '"I would like..." (o "I\'d like...") es la forma más educada de pedir algo.',
        hint: 'Tip: "I would like" = Me gustaría.'
      },
      {
        id: 'q_a1_int_6_2',
        question: '¿Cómo pides la cuenta al terminar de comer en un restaurante?',
        options: ['The money, please', 'The check, please', 'The count, please', 'The paper, please'],
        correctAnswer: 'The check, please',
        explanation: '"The check" (en inglés americano) o "The bill" (en inglés británico) significa la cuenta.',
        hint: 'Tip: Se dice "The check" o "The bill".'
      },
      {
        id: 'q_a1_int_6_3',
        question: '¿Cómo se dice "desayuno" en inglés?',
        options: ['Dinner', 'Lunch', 'Breakfast', 'Snack'],
        correctAnswer: 'Breakfast',
        explanation: '"Breakfast" es el desayuno. "Lunch" es el almuerzo y "Dinner" es la cena.',
        hint: 'Tip: Empieza con B (romper el ayuno).'
      },
      {
        id: 'q_a1_int_6_4',
        type: 'word-order',
        question: 'Ordena la frase: "Can I get a glass of water, please?"',
        options: ['Can', 'I', 'get', 'a', 'glass', 'of', 'water,', 'please?'],
        correctAnswer: 'Can I get a glass of water, please?',
        explanation: 'Can I get + a glass of water + please?',
        hint: 'Can I get a glass...'
      },
      {
        id: 'q_a1_int_6_5',
        question: 'Si no deseas vuelto y dejas propina, ¿qué le dices al mesero?',
        options: ['Give my change', 'Keep the change', 'Take money', 'No money back'],
        correctAnswer: 'Keep the change',
        explanation: '"Keep the change" significa "Quédese con el cambio".',
        hint: 'Tip: "Keep" significa guardar o quedarse.'
      }
    ]
  },
  {
    id: 'a1_int_7',
    day: 7,
    title: '7. Descripciones Físicas y de Personalidad',
    description: 'Aprende adjetivos para describir a personas, su aspecto físico y rasgos de carácter.',
    content: `Vocabulario descriptivo de personas:

• Aspecto Físico (usando To Be para altura/complexión, y HAVE para rasgos):
  - Height & Build (Estatura y cuerpo - usan To Be):
    - Tall (Alto) | Short (Bajo) | Medium height (Estatura media)
    - Thin / Slim (Delgado) | Athletic (Atlético)
  
  - Hair & Eyes (Cabello y ojos - usan HAVE / HAS):
    - "She has long brown hair." (Ella tiene cabello castaño y largo.)
    - "He has short curly hair." (Él tiene cabello corto y rizado.)
    - "They have blue eyes." (Tienen ojos azules.)

• Personalidad y Carácter (usan To Be):
  - Friendly (Amigable / Simpático) | Kind / Nice (Amable)
  - Smart / Intelligent (Inteligente) | Funny (Divertido / Gracioso)
  - Hardworking (Trabajador) | Quiet (Tranquilo / Callado) | Polite (Educado)

• Ejemplos:
  - "My mother is very kind and patient."
  - "My best friend is tall and has blue eyes."`,
    dialogue: [
      { speaker: 'Elena', textEn: 'Who is that man talking to Sarah?', textEs: '¿Quién es aquel hombre hablando con Sarah?' },
      { speaker: 'Tom', textEn: 'That is her brother Mark. He is very tall and has green eyes.', textEs: 'Ese es su hermano Mark. Es muy alto y tiene ojos verdes.' },
      { speaker: 'Elena', textEn: 'Is he friendly?', textEs: '¿Es simpático?' },
      { speaker: 'Tom', textEn: 'Yes, he is super funny and smart!', textEs: '¡Sí, es súper divertido e inteligente!' }
    ],
    quiz: [
      {
        id: 'q_a1_int_7_1',
        question: '¿Cómo dices "Mi hermana es muy amigable e inteligente"?',
        options: ['My sister is very friendly and smart', 'My sister has very friendly and smart', 'My sister is very short and thin', 'My sister friendly smart'],
        correctAnswer: 'My sister is very friendly and smart',
        explanation: 'Para rasgos de personalidad usamos el verbo To Be ("is") con los adjetivos.',
        hint: 'Tip: "Friendly" = amigable, "smart" = inteligente.'
      },
      {
        id: 'q_a1_int_7_2',
        question: '¿Qué frase describe correctamente el cabello de alguien?',
        options: ['She is long hair', 'She has long hair', 'She wears long hair', 'She do long hair'],
        correctAnswer: 'She has long hair',
        explanation: 'Para rasgos como cabello u ojos se usa el verbo "have / has" (She has long hair).',
        hint: 'Tip: Usa "has" para She.'
      },
      {
        id: 'q_a1_int_7_3',
        question: '¿Qué adjetivo significa "Trabajador/a"?',
        options: ['Lazy', 'Hardworking', 'Quiet', 'Funny'],
        correctAnswer: 'Hardworking',
        explanation: '"Hardworking" significa trabajador o aplicado.',
        hint: 'Tip: Trabajar duro = hard + working.'
      },
      {
        id: 'q_a1_int_7_4',
        type: 'word-order',
        question: 'Ordena la frase: "He is tall and has brown eyes."',
        options: ['He', 'is', 'tall', 'and', 'has', 'brown', 'eyes.'],
        correctAnswer: 'He is tall and has brown eyes.',
        explanation: 'He is tall (To Be para altura) + and has brown eyes (has para ojos).',
        hint: 'He is tall and has...'
      },
      {
        id: 'q_a1_int_7_5',
        question: '¿Qué significa "He is very funny"?',
        options: ['Él es muy gracioso/divertido', 'Él es muy raro', 'Él está enojado', 'Él es aburrido'],
        correctAnswer: 'Él es muy gracioso/divertido',
        explanation: '"Funny" significa gracioso o divertido.',
        hint: 'Tip: "Funny" hace reír.'
      }
    ]
  },
  {
    id: 'a1_int_8',
    day: 8,
    title: '8. Ropa, Colores y Compras en Tiendas',
    description: 'Describe las prendas de vestir, sus colores y practica cómo comprar y preguntar tallas.',
    content: `Vocabulario de compras y vestimenta:

• Ropa y Accesorios:
  - Shirt (Camisa) | T-shirt (Camiseta) | Pants / Trousers (Pantalones)
  - Jeans (Vaqueros) | Dress (Vestido) | Skirt (Falda) | Jacket (Chaqueta) | Coat (Abrigo)
  - Shoes (Zapatos) | Sneakers (Zapatillas deportivas) | Hat (Sombrero/Gorra) | Glasses (Gafas)

• Colores:
  - Red (Rojo), Blue (Azul), Green (Verde), Yellow (Amarillo), Black (Negro), White (Blanco), Gray (Gris), Brown (Marrón), Pink (Rosa), Orange (Naranja).
  - Regla: ¡El color va ANTES del sustantivo! ("a blue shirt", no "a shirt blue").

• Frases útiles en una tienda:
  - "I am looking for a black jacket." (Estoy buscando una chaqueta negra.)
  - "What size is this?" (¿Qué talla es esta?)
  - "Do you have this in medium / large?" (¿Tiene esto en talla mediana / grande?)
  - "Can I try it on?" (¿Me lo puedo probar?)
  - "Where is the fitting room?" (¿Dónde está el probador?)`,
    dialogue: [
      { speaker: 'Shopper', textEn: 'Excuse me, I like this jacket. Can I try it on?', textEs: 'Disculpe, me gusta esta chaqueta. ¿Me la puedo probar?' },
      { speaker: 'Salesperson', textEn: 'Of course! The fitting rooms are right over there.', textEs: '¡Por supuesto! Los probadores están justo allá.' },
      { speaker: 'Shopper', textEn: 'Do you have it in a size small?', textEs: '¿La tiene en talla pequeña?' },
      { speaker: 'Salesperson', textEn: 'Yes, here is a size small in dark blue.', textEs: 'Sí, aquí tiene una talla pequeña en azul oscuro.' }
    ],
    quiz: [
      {
        id: 'q_a1_int_8_1',
        question: '¿Cómo le preguntas al vendedor si te puedes probar una prenda?',
        options: ['Can I buy this?', 'Can I try it on?', 'Where is the shirt?', 'Is this my size?'],
        correctAnswer: 'Can I try it on?',
        explanation: '"Try on" es el phrasal verb para probarse ropa.',
        hint: 'Tip: El phrasal verb es "try on".'
      },
      {
        id: 'q_a1_int_8_2',
        question: '¿Cuál es el orden correcto de adjetivo y sustantivo para "un vestido rojo"?',
        options: ['a dress red', 'a red dress', 'red a dress', 'dress the red'],
        correctAnswer: 'a red dress',
        explanation: 'En inglés el color (adjetivo) siempre va ANTES del sustantivo (a red dress).',
        hint: 'Tip: Adjetivo primero, luego el sustantivo.'
      },
      {
        id: 'q_a1_int_8_3',
        question: '¿Cómo se dice "probador" (lugar donde te pruebas ropa en una tienda)?',
        options: ['Bathroom', 'Fitting room', 'Bedroom', 'Kitchen'],
        correctAnswer: 'Fitting room',
        explanation: '"Fitting room" (o "dressing room") es el probador de una tienda de ropa.',
        hint: 'Tip: Relacionado con la palabra "fit" (calzar/quedar bien).'
      },
      {
        id: 'q_a1_int_8_4',
        type: 'word-order',
        question: 'Ordena la frase: "I am looking for a blue shirt."',
        options: ['I', 'am', 'looking', 'for', 'a', 'blue', 'shirt.'],
        correctAnswer: 'I am looking for a blue shirt.',
        explanation: 'I am looking for (estoy buscando) + a blue shirt.',
        hint: 'I am looking for...'
      },
      {
        id: 'q_a1_int_8_5',
        question: '¿Cómo preguntas "¿Cuánto cuestan estos pantalones?"?',
        options: ['How much is this pants?', 'How much are these pants?', 'How many cost pants?', 'How price are pants?'],
        correctAnswer: 'How much are these pants?',
        explanation: '"Pants" es un sustantivo plural en inglés, por lo que usa "How much are these...".',
        hint: 'Tip: Pants es plural (are these).'
      }
    ]
  },
  {
    id: 'a1_int_9',
    day: 9,
    title: '9. Presente Continuo: Acciones en Progreso (To Be + -ING)',
    description: 'Expresa lo que está sucediendo en este preciso momento de forma clara.',
    content: `El Presente Continuo habla de acciones que ocurren AHORA MISMO en tiempo real.

• Estructura: Sujeto + am/is/are + Verbo con "-ing"
  - I am reading (Estoy leyendo)
  - He / She / It is working (Él/Ella está trabajando)
  - You / We / They are studying (Ustedes/Nosotros están estudiando)

• Negativo: Sujeto + am not / isn't / aren't + Verbo en "-ing"
  - "She isn't sleeping, she is studying." (Ella no está durmiendo, está estudiando.)

• Preguntas: Am / Is / Are + Sujeto + Verbo en "-ing"?
  - "What are you doing right now?" (¿Qué estás haciendo ahora mismo?)
  - "Is it raining outside?" -> "Yes, it is." / "No, it isn't."

• Palabras clave temporales:
  - Right now (Ahora mismo) | At the moment (En este momento) | Look! (¡Mira!) | Listen! (¡Escucha!)`,
    dialogue: [
      { speaker: 'Mom', textEn: 'Hi Sam! What are you doing right now?', textEs: '¡Hola Sam! ¿Qué estás haciendo ahora mismo?' },
      { speaker: 'Sam', textEn: 'I am doing my homework and listening to music.', textEs: 'Estoy haciendo mi tarea y escuchando música.' },
      { speaker: 'Mom', textEn: 'Is your brother studying too?', textEs: '¿Tu hermano está estudiando también?' },
      { speaker: 'Sam', textEn: 'No, he is playing in the garden.', textEs: 'No, él está jugando en el jardín.' }
    ],
    quiz: [
      {
        id: 'q_a1_int_9_1',
        question: 'Si ves a alguien corriendo en este preciso momento, ¿qué frase utilizas?',
        options: ['He runs every day', 'He is running right now', 'He ran yesterday', 'He will run tomorrow'],
        correctAnswer: 'He is running right now',
        explanation: '"Right now" indica acción en progreso en este momento, requiere presente continuo (is running).',
        hint: 'Tip: Presente continuo = is + running.'
      },
      {
        id: 'q_a1_int_9_2',
        question: '¿Cómo niegas "They are watching TV"?',
        options: ['They don\'t watching TV', 'They aren\'t watching TV', 'They not watching TV', 'They isn\'t watching TV'],
        correctAnswer: "They aren't watching TV",
        explanation: 'La negación en presente continuo para "they" es "aren\'t watching".',
        hint: 'Tip: Plural "aren\'t".'
      },
      {
        id: 'q_a1_int_9_3',
        question: '¿Cómo preguntas "¿Qué estás haciendo?"?',
        options: ['What are you doing?', 'What do you do?', 'What you are doing?', 'What is you doing?'],
        correctAnswer: 'What are you doing?',
        explanation: '"What are you doing?" es la pregunta para saber qué hace alguien en este momento.',
        hint: 'Tip: Inversión "are you doing".'
      },
      {
        id: 'q_a1_int_9_4',
        type: 'word-order',
        question: 'Ordena la frase: "She is cooking dinner at the moment."',
        options: ['She', 'is', 'cooking', 'dinner', 'at', 'the', 'moment.'],
        correctAnswer: 'She is cooking dinner at the moment.',
        explanation: 'Sujeto (She) + is + Verbo en -ing (cooking) + dinner + at the moment.',
        hint: 'She is cooking...'
      },
      {
        id: 'q_a1_int_9_5',
        question: 'Completa: "Listen! The baby ___ in the room."',
        options: ['cries', 'is crying', 'crying', 'are crying'],
        correctAnswer: 'is crying',
        explanation: 'La palabra de atención "Listen!" indica que la acción ocurre ahora (is crying).',
        hint: 'Tip: Singular "the baby" -> is crying.'
      }
    ]
  },
  {
    id: 'a1_int_10',
    day: 10,
    title: '10. Preposiciones de Lugar (In, On, At, Under, Next to, Between)',
    description: 'Ubica objetos, personas y lugares con exactitud en el espacio.',
    content: `Preposiciones fundamentales de posición y espacio:

• Preposiciones Principales:
  - IN (Dentro de / En un espacio cerrado): "The keys are in my pocket." | "She is in the kitchen."
  - ON (Sobre / En contacto con una superficie): "The book is on the table." | "The picture is on the wall."
  - AT (En un punto o ubicación específica): "I am at the bus stop." | "She is at the airport."
  - UNDER (Debajo de): "The dog is sleeping under the bed."
  - NEXT TO / BESIDE (Al lado de / Junto a): "The bank is next to the pharmacy."
  - BETWEEN (Entre dos cosas o lugares): "The coffee shop is between the library and the park."
  - IN FRONT OF (En frente de / Delante de): "There is a taxi in front of the hotel."
  - BEHIND (Detrás de): "The parking lot is behind the building."`,
    dialogue: [
      { speaker: 'Lost Person', textEn: 'Excuse me, where is the nearest pharmacy?', textEs: 'Disculpe, ¿dónde está la farmacia más cercana?' },
      { speaker: 'Local', textEn: 'It is on Main Street, next to the supermarket and in front of the bank.', textEs: 'Está en la calle Main, al lado del supermercado y en frente del banco.' },
      { speaker: 'Lost Person', textEn: 'Thank you so much for your help!', textEs: '¡Muchas gracias por su ayuda!' }
    ],
    quiz: [
      {
        id: 'q_a1_int_10_1',
        question: 'Si tu teléfono está encima de la mesa, ¿qué preposición usas?',
        options: ['in', 'on', 'under', 'between'],
        correctAnswer: 'on',
        explanation: '"ON" indica superficie (sobre la mesa).',
        hint: 'Tip: Superficie = ON.'
      },
      {
        id: 'q_a1_int_10_2',
        question: 'Si las llaves están dentro de la mochila, ¿qué frase es correcta?',
        options: ['The keys are in the bag', 'The keys are on the bag', 'The keys are under the bag', 'The keys are at the bag'],
        correctAnswer: 'The keys are in the bag',
        explanation: '"IN" indica interior o espacio cerrado (dentro de).',
        hint: 'Tip: Interior = IN.'
      },
      {
        id: 'q_a1_int_10_3',
        question: '¿Qué preposición usas para indicar que algo está "entre dos cosas"?',
        options: ['Next to', 'Between', 'Behind', 'Under'],
        correctAnswer: 'Between',
        explanation: '"Between" significa "entre dos objetos o lugares".',
        hint: 'Tip: Empieza con Bet-.'
      },
      {
        id: 'q_a1_int_10_4',
        type: 'word-order',
        question: 'Ordena la frase: "The cat is sleeping under the table."',
        options: ['The', 'cat', 'is', 'sleeping', 'under', 'the', 'table.'],
        correctAnswer: 'The cat is sleeping under the table.',
        explanation: 'Sujeto (The cat) + is sleeping + preposición (under the table).',
        hint: 'The cat is sleeping...'
      },
      {
        id: 'q_a1_int_10_5',
        question: 'Si el banco está al lado de la farmacia, ¿cómo lo dices?',
        options: ['The bank is in the pharmacy', 'The bank is under the pharmacy', 'The bank is next to the pharmacy', 'The bank is on the pharmacy'],
        correctAnswer: 'The bank is next to the pharmacy',
        explanation: '"Next to" significa "al lado de" o "junto a".',
        hint: 'Tip: "Next to" = al lado de.'
      }
    ]
  }
];

// ==========================================
// 3. FLUIDEZ Y PRÁCTICA CONVERSACIONAL A1 EN INGLÉS
// ==========================================
export const fluencyLessons: LessonStep[] = [
  {
    id: 'flu_1',
    day: 1,
    title: 'Diálogo 1: Romper el Hielo y Conocer Gente Nueva',
    category: 'Conversación Real',
    description: 'Aprende un diálogo fluido y natural para presentarte y entablar amistad con un angloparlante.',
    content: `🗣️ Escenario: Conociendo a un nuevo compañero en una cafetería o evento.

• Persona A: "Hi! Is this seat taken?" (¡Hola! ¿Está ocupado este asiento?)
• Persona B: "No, it's free. Please sit down!" (No, está libre. ¡Toma asiento!)
• Persona A: "Thanks! I'm Carlos. What's your name?" (¡Gracias! Soy Carlos. ¿Cómo te llamas?)
• Persona B: "I'm Sarah. Nice to meet you, Carlos! Where are you from?" (Soy Sarah. ¡Gusto en conocerte, Carlos! ¿De dónde eres?)
• Persona A: "I'm from Mexico. And you?" (Soy de México. ¿Y tú?)
• Persona B: "I'm from Canada. Are you here for work or vacation?" (Soy de Canadá. ¿Estás aquí por trabajo o vacaciones?)
• Persona A: "I'm here on vacation and to practice my English!" (¡Estoy aquí de vacaciones y para practicar mi inglés!)`,
    dialogue: [
      { speaker: 'Carlos', textEn: 'Hi! Is this seat taken?', textEs: '¡Hola! ¿Está ocupado este asiento?' },
      { speaker: 'Sarah', textEn: 'No, it\'s free. Please sit down!', textEs: 'No, está libre. ¡Toma asiento!' },
      { speaker: 'Carlos', textEn: 'Thanks! I\'m Carlos. Nice to meet you.', textEs: '¡Gracias! Soy Carlos. Gusto en conocerte.' },
      { speaker: 'Sarah', textEn: 'Nice to meet you Carlos! Where are you from?', textEs: '¡Gusto en conocerte Carlos! ¿De dónde eres?' },
      { speaker: 'Carlos', textEn: 'I\'m from Mexico. Are you here on vacation?', textEs: 'Soy de México. ¿Estás aquí de vacaciones?' },
      { speaker: 'Sarah', textEn: 'Yes, I love this city!', textEs: '¡Sí, me encanta esta ciudad!' }
    ],
    quiz: [
      {
        id: 'q_flu_1_1',
        question: '¿Cómo preguntas amablemente si una silla o asiento está libre?',
        options: ['Is this seat taken?', 'Give me this chair', 'Who sits here?', 'Is this your chair?'],
        correctAnswer: 'Is this seat taken?',
        explanation: '"Is this seat taken?" es la frase fija y educada para preguntar si el asiento está ocupado.',
        hint: 'Tip: Significa literalmente "¿Está tomado este asiento?".'
      },
      {
        id: 'q_flu_1_2',
        question: 'Si te preguntan "Are you here for work or vacation?", ¿qué te están consultando?',
        options: ['Si vives aquí', 'Si viniste por trabajo o por vacaciones', 'Si hablas inglés bien', 'Cuándo te regresas a tu país'],
        correctAnswer: 'Si viniste por trabajo o por vacaciones',
        explanation: 'Preguntan el motivo de tu estancia: trabajo ("work") o vacaciones ("vacation").',
        hint: 'Tip: Work = trabajo, Vacation = vacaciones.'
      },
      {
        id: 'q_flu_1_3',
        type: 'word-order',
        question: 'Ordena la frase: "It is nice to meet you."',
        options: ['It', 'is', 'nice', 'to', 'meet', 'you.'],
        correctAnswer: 'It is nice to meet you.',
        explanation: 'It is nice to meet you = Es un gusto conocerte.',
        hint: 'It is nice to...'
      },
      {
        id: 'q_flu_1_4',
        question: '¿Cómo respondes si alguien te pregunta "Where are you from?"?',
        options: ['I am 25 years old', 'I am from Colombia', 'I am fine, thanks', 'I like coffee'],
        correctAnswer: 'I am from Colombia',
        explanation: '"I am from [país]" responde al origen de una persona.',
        hint: 'Tip: Indica tu país de procedencia.'
      }
    ]
  },
  {
    id: 'flu_2',
    day: 2,
    title: 'Diálogo 2: Pedir Comida y Bebida en una Cafetería',
    category: 'Conversación Real',
    description: 'Práctica conversacional para ordenar café, comida y pagar sin vacilar en inglés.',
    content: `🗣️ Escenario: Pidiendo en un café o restaurante rápido.

• Barista: "Hello! What can I get for you today?" (¡Hola! ¿Qué te sirvo hoy?)
• Cliente: "Hi! Can I get a large iced coffee and a chocolate muffin, please?" (¡Hola! ¿Me da un café helado grande y un muffin de chocolate, por favor?)
• Barista: "Sure thing! Would you like milk with your coffee?" (¡Claro! ¿Deseas leche con tu café?)
• Cliente: "Yes, almond milk, please. How much is that?" (Sí, leche de almendras, por favor. ¿Cuánto es?)
• Barista: "That will be $7.50. Will that be cash or card?" (Serán $7.50. ¿Será en efectivo o tarjeta?)
• Cliente: "Card, please. Here you go." (Tarjeta, por favor. Aquí tiene.)
• Barista: "Thank you! Have a great day!" (¡Gracias! ¡Que tenga un excelente día!)`,
    dialogue: [
      { speaker: 'Barista', textEn: 'Hello! What can I get started for you?', textEs: '¡Hola! ¿Qué le puedo preparar?' },
      { speaker: 'Customer', textEn: 'Can I get a large latte and a croissant, please?', textEs: '¿Me da un latte grande y un croissant, por favor?' },
      { speaker: 'Barista', textEn: 'For here or to go?', textEs: '¿Para tomar aquí o para llevar?' },
      { speaker: 'Customer', textEn: 'To go, please. Can I pay with credit card?', textEs: 'Para llevar, por favor. ¿Puedo pagar con tarjeta de crédito?' },
      { speaker: 'Barista', textEn: 'Yes, just tap your card right here.', textEs: 'Sí, solo apoye su tarjeta justo aquí.' }
    ],
    quiz: [
      {
        id: 'q_flu_2_1',
        question: '¿Qué respuesta das cuando el cajero te pregunta "Cash or card?"?',
        options: ['Yes please', 'Card, please', 'No thank you', 'It is 5 dollars'],
        correctAnswer: 'Card, please',
        explanation: 'Indicamos la forma de pago deseada: "Cash" (Efectivo) o "Card" (Tarjeta).',
        hint: 'Tip: Eliges tarjeta ("Card").'
      },
      {
        id: 'q_flu_2_2',
        question: '¿Qué frase usa el cliente para pedir de manera fluida y natural?',
        options: ['I want coffee now', 'Can I get a large iced coffee, please?', 'Bring me coffee fast', 'Give coffee'],
        correctAnswer: 'Can I get a large iced coffee, please?',
        explanation: '"Can I get... please?" es la forma estándar y natural en países angloparlantes.',
        hint: 'Tip: "Can I get...?" es muy natural y cortés.'
      },
      {
        id: 'q_flu_2_3',
        question: 'Si el barista pregunta "For here or to go?", ¿qué te consulta?',
        options: ['Si es frío o caliente', 'Si es para consumir en el local o para llevar', 'Si vas a pagar en efectivo', 'Si deseas azúcar'],
        correctAnswer: 'Si es para consumir en el local o para llevar',
        explanation: '"For here" es para comer en el lugar; "To go" es para llevar.',
        hint: 'Tip: "To go" = para llevar.'
      },
      {
        id: 'q_flu_2_4',
        type: 'word-order',
        question: 'Ordena la frase: "Can I have the check, please?"',
        options: ['Can', 'I', 'have', 'the', 'check,', 'please?'],
        correctAnswer: 'Can I have the check, please?',
        explanation: 'Can I have + the check + please?',
        hint: 'Can I have the check...'
      }
    ]
  },
  {
    id: 'flu_3',
    day: 3,
    title: 'Diálogo 3: Preguntar Direcciones en la Ciudad',
    category: 'Conversación Real',
    description: 'Aprende a ubicar lugares, pedir indicaciones y entender las respuestas de peatones.',
    content: `🗣️ Escenario: Perdido en el centro de la ciudad buscando una estación.

• Turista: "Excuse me! Could you help me? Where is the nearest subway station?" (¡Disculpe! ¿Podría ayudarme? ¿Dónde está la estación de metro más cercana?)
• Peatón: "Sure! Go straight for two blocks, then turn left at the bank." (¡Claro! Siga derecho por dos cuadras, luego gire a la izquierda en el banco.)
• Turista: "Is it far from here?" (¿Está lejos de aquí?)
• Peatón: "No, it's very close! About a 5-minute walk. You'll see it next to the supermarket." (No, ¡está muy cerca! Como a 5 minutos caminando. Lo verá al lado del supermercado.)
• Turista: "Awesome! Thank you so much!" (¡Buenísimo! ¡Muchas gracias!)
• Peatón: "You're welcome! Have a safe trip!" (¡De nada! ¡Que tengas un buen viaje!)`,
    dialogue: [
      { speaker: 'Tourist', textEn: 'Excuse me, is there a pharmacy near here?', textEs: 'Disculpe, ¿hay una farmacia cerca de aquí?' },
      { speaker: 'Pedestrian', textEn: 'Yes, go straight and turn right at the traffic light.', textEs: 'Sí, vaya derecho y gire a la derecha en el semáforo.' },
      { speaker: 'Tourist', textEn: 'How long does it take to walk there?', textEs: '¿Cuánto tiempo toma llegar caminando?' },
      { speaker: 'Pedestrian', textEn: 'Only about three minutes. It is across from the bank.', textEs: 'Solo unos tres minutos. Está cruzando en frente del banco.' }
    ],
    quiz: [
      {
        id: 'q_flu_3_1',
        question: '¿Qué significa "Is it far from here?"?',
        options: ['¿Está lejos de aquí?', '¿Está cerrado el lugar?', '¿Cuánto cuesta el boleto?', '¿A qué hora abre?'],
        correctAnswer: '¿Está lejos de aquí?',
        explanation: '"Far" significa lejos y "from here" significa de aquí.',
        hint: 'Tip: "Far" es opuesto a "close" (cerca).'
      },
      {
        id: 'q_flu_3_2',
        question: 'Si te dicen "Turn left at the bank", ¿qué debes hacer?',
        options: ['Girar a la derecha en el banco', 'Girar a la izquierda en el banco', 'Seguir derecho hasta el banco', 'Entrar al banco'],
        correctAnswer: 'Girar a la izquierda en el banco',
        explanation: '"Left" es izquierda y "Turn" es girar.',
        hint: 'Tip: Left = izquierda.'
      },
      {
        id: 'q_flu_3_3',
        question: '¿Qué significa la instrucción "Go straight"?',
        options: ['Gira a la derecha', 'Gira a la izquierda', 'Sigue derecho / recto', 'Detente'],
        correctAnswer: 'Sigue derecho / recto',
        explanation: '"Go straight" significa continuar recto o hacia adelante sin desviarse.',
        hint: 'Tip: Straight = recto / derecho.'
      },
      {
        id: 'q_flu_3_4',
        type: 'word-order',
        question: 'Ordena la frase: "Where is the nearest subway station?"',
        options: ['Where', 'is', 'the', 'nearest', 'subway', 'station?'],
        correctAnswer: 'Where is the nearest subway station?',
        explanation: 'Where is + the nearest subway station?',
        hint: 'Where is the nearest...'
      }
    ]
  },
  {
    id: 'flu_4',
    day: 4,
    title: 'Diálogo 4: Check-in y Estadía en un Hotel',
    category: 'Conversación Real',
    description: 'Resuelve el proceso de llegada a tu hotel, entrega de llaves y solicitud de servicios en inglés.',
    content: `🗣️ Escenario: En la recepción del hotel.

• Recepcionista: "Good afternoon! Welcome to the Grand Hotel. How can I help you?" (¡Buenas tardes! Bienvenido al Grand Hotel. ¿En qué le puedo ayudar?)
• Huésped: "Hello! I have a reservation under the name of Garcia." (¡Hola! Tengo una reserva a nombre de García.)
• Recepcionista: "Let me check... Yes, Mr. Garcia, a double room for 3 nights. May I see your passport?" (Déjeme verificar... Sí, Sr. García, una habitación doble por 3 noches. ¿Puedo ver su pasaporte?)
• Huésped: "Here is my passport and my credit card." (Aquí tiene mi pasaporte y mi tarjeta de crédito.)
• Recepcionista: "Thank you! Here is your keycard. You are in room 402 on the fourth floor. Breakfast is served from 7 to 10 AM." (¡Gracias! Aquí tiene su tarjeta llave. Está en la habitación 402 en el cuarto piso. El desayuno se sirve de 7 a 10 AM.)
• Huésped: "Great! Where is the elevator?" (¡Genial! ¿Dónde está el ascensor?)
• Recepcionista: "Right behind you, to the left." (Justo detrás de usted, a la izquierda.)`,
    dialogue: [
      { speaker: 'Receptionist', textEn: 'Welcome! Do you have a reservation with us?', textEs: '¡Bienvenido! ¿Tiene una reserva con nosotros?' },
      { speaker: 'Guest', textEn: 'Yes, I have a reservation under the name of Davis.', textEs: 'Sí, tengo una reserva a nombre de Davis.' },
      { speaker: 'Receptionist', textEn: 'Perfect. Here is your room key. What time would you like wake-up service?', textEs: 'Perfecto. Aquí tiene su llave. ¿A qué hora desea servicio de despertador?' },
      { speaker: 'Guest', textEn: 'At 7:00 AM please. Also, what is the Wi-Fi password?', textEs: 'A las 7:00 AM por favor. Además, ¿cuál es la clave del Wi-Fi?' },
      { speaker: 'Receptionist', textEn: 'The Wi-Fi password is on your keycard.', textEs: 'La clave del Wi-Fi está en su tarjeta llave.' }
    ],
    quiz: [
      {
        id: 'q_flu_4_1',
        question: '¿Cómo dices "Tengo una reserva a nombre de..." en inglés?',
        options: ['I have a reservation under the name of...', 'I buy a room named...', 'My name is room...', 'Give me a bed for...'],
        correctAnswer: 'I have a reservation under the name of...',
        explanation: '"I have a reservation under the name of..." es la expresión formal y correcta en hoteles.',
        hint: 'Tip: "Under the name of" = a nombre de.'
      },
      {
        id: 'q_flu_4_2',
        question: '¿Qué significa "Where is the elevator?"?',
        options: ['¿Dónde está el baño?', '¿Dónde está el ascensor?', '¿A qué hora es el desayuno?', '¿Dónde está la salida?'],
        correctAnswer: '¿Dónde está el ascensor?',
        explanation: '"Elevator" (inglés americano) o "Lift" (inglés británico) significa ascensor.',
        hint: 'Tip: Eleva a los pisos superiores.'
      },
      {
        id: 'q_flu_4_3',
        question: '¿Cómo preguntas la contraseña del internet inalámbrico en el hotel?',
        options: ['Where is the computer?', 'What is the Wi-Fi password?', 'How much is the internet?', 'Is there internet?'],
        correctAnswer: 'What is the Wi-Fi password?',
        explanation: '"What is the Wi-Fi password?" es la pregunta estándar para solicitar la clave de Wi-Fi.',
        hint: 'Tip: "Password" = contraseña.'
      },
      {
        id: 'q_flu_4_4',
        type: 'word-order',
        question: 'Ordena la frase: "Here is your room keycard."',
        options: ['Here', 'is', 'your', 'room', 'keycard.'],
        correctAnswer: 'Here is your room keycard.',
        explanation: 'Here is + your room keycard.',
        hint: 'Here is your...'
      }
    ]
  }
];

// ==========================================
// 4. FLASHCARDS / VOCABULARIO VÍA RÁPIDA A1
// ==========================================
export const fastTrackVocab: VocabWord[] = [
  // Sustantivos
  { id: 'v_1', word: 'Time', translation: 'Tiempo / Hora', example: 'Do you have time to talk?', category: 'Sustantivos' },
  { id: 'v_2', word: 'People', translation: 'Gente / Personas', example: 'There are many people here.', category: 'Sustantivos' },
  { id: 'v_3', word: 'Way', translation: 'Camino / Manera', example: 'This is the best way to learn.', category: 'Sustantivos' },
  { id: 'v_4', word: 'Day', translation: 'Día', example: 'Have a wonderful day!', category: 'Sustantivos' },
  { id: 'v_5', word: 'Thing', translation: 'Cosa', example: 'What is that thing on the desk?', category: 'Sustantivos' },
  { id: 'v_6', word: 'World', translation: 'Mundo', example: 'Travel around the world.', category: 'Sustantivos' },
  { id: 'v_7', word: 'Life', translation: 'Vida', example: 'Life is full of choices.', category: 'Sustantivos' },
  { id: 'v_8', word: 'Place', translation: 'Lugar', example: 'This is a beautiful place.', category: 'Sustantivos' },
  { id: 'v_9', word: 'Water', translation: 'Agua', example: 'Drink plenty of water every day.', category: 'Sustantivos' },
  { id: 'v_10', word: 'Money', translation: 'Dinero', example: 'How much money do you need?', category: 'Sustantivos' },
  { id: 'v_10b', word: 'Friend', translation: 'Amigo / Amiga', example: 'She is my best friend.', category: 'Sustantivos' },
  { id: 'v_10c', word: 'House', translation: 'Casa', example: 'Welcome to my house.', category: 'Sustantivos' },

  // Verbos
  { id: 'v_11', word: 'Need', translation: 'Necesitar', example: 'I need your help now.', category: 'Verbos' },
  { id: 'v_12', word: 'Want', translation: 'Querer / Desear', example: 'I want a cup of coffee.', category: 'Verbos' },
  { id: 'v_13', word: 'Know', translation: 'Saber / Conocer', example: 'I know the answer.', category: 'Verbos' },
  { id: 'v_14', word: 'Understand', translation: 'Entender / Comprender', example: 'Do you understand me?', category: 'Verbos' },
  { id: 'v_15', word: 'Make', translation: 'Hacer / Crear', example: 'She can make dinner tonight.', category: 'Verbos' },
  { id: 'v_16', word: 'Think', translation: 'Pensar / Creer', example: 'I think it is a great idea.', category: 'Verbos' },
  { id: 'v_17', word: 'Take', translation: 'Tomar / Llevar', example: 'Take an umbrella with you.', category: 'Verbos' },
  { id: 'v_18', word: 'Find', translation: 'Encontrar', example: 'I can\'t find my keys.', category: 'Verbos' },
  { id: 'v_19', word: 'Speak', translation: 'Hablar', example: 'I speak Spanish and English.', category: 'Verbos' },
  { id: 'v_20', word: 'Listen', translation: 'Escuchar', example: 'Listen carefully to the teacher.', category: 'Verbos' },
  { id: 'v_20b', word: 'Live', translation: 'Vivir', example: 'I live in Madrid.', category: 'Verbos' },
  { id: 'v_20c', word: 'Learn', translation: 'Aprender', example: 'We learn English every day.', category: 'Verbos' },

  // Adjetivos
  { id: 'v_21', word: 'Important', translation: 'Importante', example: 'This lesson is very important.', category: 'Adjetivos' },
  { id: 'v_22', word: 'Available', translation: 'Disponible', example: 'Are you available tomorrow?', category: 'Adjetivos' },
  { id: 'v_23', word: 'Different', translation: 'Diferente', example: 'We have different opinions.', category: 'Adjetivos' },
  { id: 'v_24', word: 'Easy', translation: 'Fácil', example: 'English is easy with practice.', category: 'Adjetivos' },
  { id: 'v_25', word: 'Useful', translation: 'Útil', example: 'This dictionary is very useful.', category: 'Adjetivos' },
  { id: 'v_26', word: 'Happy', translation: 'Feliz / Contento', example: 'She is very happy today.', category: 'Adjetivos' },
  { id: 'v_27', word: 'Ready', translation: 'Listo / Preparado', example: 'Are you ready for the exam?', category: 'Adjetivos' },
  { id: 'v_27b', word: 'Delicious', translation: 'Delicioso / Rico', example: 'This food is delicious.', category: 'Adjetivos' },

  // Conectores y Expresiones
  { id: 'v_28', word: 'Because', translation: 'Porque (explicación)', example: 'I am studying because I love languages.', category: 'Conectores' },
  { id: 'v_29', word: 'However', translation: 'Sin embargo', example: 'It was raining; however, we went out.', category: 'Conectores' },
  { id: 'v_30', word: 'Also', translation: 'También', example: 'I also speak a little Italian.', category: 'Conectores' },
  { id: 'v_31', word: 'Actually', translation: 'De hecho / En realidad', example: 'Actually, I am already done.', category: 'Conectores' },
  { id: 'v_32', word: 'Together', translation: 'Juntos', example: 'We can practice English together.', category: 'Conectores' }
];

// ==========================================
// 5. EXAMEN FINAL DE CERTIFICACIÓN A1 (20 PREGUNTAS INTEGRALES)
// ==========================================
export const finalExamQuestions: QuizQuestion[] = [
  {
    id: 'ex_1',
    question: '1. ¿Cómo dices correctamente "Tengo 22 años" en inglés?',
    options: ['I have 22 years', 'I am 22 years old', 'I make 22 years', 'I possess 22 years'],
    correctAnswer: 'I am 22 years old',
    explanation: 'En inglés la edad se expresa obligatoriamente con el verbo To Be (I am).',
    hint: 'A1 Inicial: Recuerda usar To Be para la edad.'
  },
  {
    id: 'ex_2',
    question: '2. ¿Cuál es el pronombre correcto para "Carlos and Maria" cuando hablas de ellos?',
    options: ['We', 'They', 'You', 'He'],
    correctAnswer: 'They',
    explanation: '"They" se refiere a terceras personas en plural (ellos/ellas).',
    hint: 'A1 Inicial: Significa "Ellos".'
  },
  {
    id: 'ex_3',
    question: '3. Selecciona la opción con los artículos correctos: "___ apple" y "___ book".',
    options: ['a apple, an book', 'an apple, a book', 'the apple, an book', 'a apple, a book'],
    correctAnswer: 'an apple, a book',
    explanation: '"An" precede sonidos vocálicos (apple) y "A" sonidos de consonante (book).',
    hint: 'A1 Inicial: Vocal usa "an", consonante usa "a".'
  },
  {
    id: 'ex_4',
    question: '4. ¿Cómo niegas en presente simple para "She" (Ella)?',
    options: ['She don\'t speak English', 'She doesn\'t speak English', 'She isn\'t speak English', 'She not speak English'],
    correctAnswer: "She doesn't speak English",
    explanation: 'Para la 3ª persona singular (He, She, It) el auxiliar negativo es "doesn\'t".',
    hint: 'A1 Intermedio: Utiliza "doesn\'t".'
  },
  {
    id: 'ex_5',
    question: '5. Tienes tus llaves en la mano (cerca de ti y plural). ¿Qué frase utilizas?',
    options: ['This is my keys', 'These are my keys', 'That is my keys', 'Those are my keys'],
    correctAnswer: 'These are my keys',
    explanation: 'Plural + Cercanía = "These are".',
    hint: 'A1 Inicial: Demostrativo "These".'
  },
  {
    id: 'ex_6',
    question: '6. ¿Cuál es la respuesta cortés a "Thank you"?',
    options: ['Excuse me', "You're welcome", 'Nice to meet you', 'Good evening'],
    correctAnswer: "You're welcome",
    explanation: '"You\'re welcome" equivale a "De nada".',
    hint: 'A1 Inicial: Significa "Eres bienvenido".'
  },
  {
    id: 'ex_7',
    question: '7. ¿Cómo preguntas el precio de algo que deseas comprar en una tienda?',
    options: ['How many is this?', 'How much is this?', 'What price have this?', 'How money is this?'],
    correctAnswer: 'How much is this?',
    explanation: '"How much is this?" es la frase estándar para consultar precios.',
    hint: 'A1 Inicial: Usamos "How much".'
  },
  {
    id: 'ex_8',
    question: '8. Completa la oración de hábito: "He usually ___ at 6 AM."',
    options: ['wake up', 'wakes up', 'is waking up', 'waking up'],
    correctAnswer: 'wakes up',
    explanation: 'Para hábitos en presente simple con "He", agregamos "-s" al verbo (wakes up).',
    hint: 'A1 Intermedio: Regla de la "-s" para He/She/It.'
  },
  {
    id: 'ex_9',
    question: '9. ¿Cómo dices "A ella le gusta bailar" usando la regla de preferencias?',
    options: ['She likes dance', 'She likes dancing', 'She liking dance', 'She like to dancing'],
    correctAnswer: 'She likes dancing',
    explanation: 'El verbo que sigue a "like/love/hate" lleva la terminación "-ing" (dancing).',
    hint: 'A1 Intermedio: Verbo con "-ing".'
  },
  {
    id: 'ex_10',
    question: '10. ¿Cómo indicas que hay dos dormitorios en el apartamento?',
    options: ['There is two bedrooms', 'There are two bedrooms', 'Have two bedrooms', 'There be two bedrooms'],
    correctAnswer: 'There are two bedrooms',
    explanation: 'Para plural ("two bedrooms") se usa obligatoriamente "There are".',
    hint: 'A1 Intermedio: "There are" para plural.'
  },
  {
    id: 'ex_11',
    question: '11. ¿Cuál es la forma correcta del verbo modal CAN en negación?',
    options: ['She don\'t can swim', 'She can\'t swim', 'She not can swim', 'She isn\'t can swim'],
    correctAnswer: "She can't swim",
    explanation: 'La negación de "can" es "can\'t" (cannot).',
    hint: 'A1 Intermedio: Modal "can\'t".'
  },
  {
    id: 'ex_12',
    question: '12. En un café, ¿cómo pides cortésmente una bebida?',
    options: ['Give me coffee', 'I want coffee now', 'I would like a coffee, please', 'Bring coffee'],
    correctAnswer: 'I would like a coffee, please',
    explanation: '"I would like..." es la forma más amable y educada.',
    hint: 'Fluidez A1: "I would like...".'
  },
  {
    id: 'ex_13',
    question: '13. ¿Qué preposición de lugar usas si tus llaves están DENTRO de la mochila?',
    options: ['on', 'in', 'at', 'under'],
    correctAnswer: 'in',
    explanation: '"IN" indica interior o espacio cerrado.',
    hint: 'A1 Intermedio: Interior = IN.'
  },
  {
    id: 'ex_14',
    question: '14. En un hotel, ¿cómo preguntas dónde queda el ascensor?',
    options: ['Where is the restroom?', 'Where is the elevator?', 'When is breakfast?', 'How much is the room?'],
    correctAnswer: 'Where is the elevator?',
    explanation: '"Elevator" significa ascensor.',
    hint: 'Fluidez A1: Ascensor = Elevator.'
  },
  {
    id: 'ex_15',
    question: '15. ¿Qué significa la palabra de vocabulario "Understand"?',
    options: ['Aprender', 'Entender / Comprender', 'Escuchar', 'Escribir'],
    correctAnswer: 'Entender / Comprender',
    explanation: '"Understand" significa entender o comprender.',
    hint: 'Vocabulario A1: Verbo clave de comprensión.'
  },
  {
    id: 'ex_16',
    question: '16. ¿Qué preposición temporal se utiliza con los días de la semana (ej. "el viernes")?',
    options: ['in', 'at', 'on', 'by'],
    correctAnswer: 'on',
    explanation: 'Los días de la semana siempre llevan la preposición "on" (on Friday).',
    hint: 'A1 Inicial: Días llevan ON.'
  },
  {
    id: 'ex_17',
    question: '17. ¿Cuál es la forma en Presente Continuo para "Look! They ___ in the garden"?',
    options: ['play', 'is playing', 'are playing', 'plays'],
    correctAnswer: 'are playing',
    explanation: 'Con el pronombre "They" en presente continuo se usa "are playing".',
    hint: 'A1 Intermedio: They are + playing.'
  },
  {
    id: 'ex_18',
    question: '18. ¿Cómo preguntas amablemente a un transeúnte si un asiento está ocupado?',
    options: ['Is this seat taken?', 'You leave this chair?', 'Give chair now', 'Whose chair?'],
    correctAnswer: 'Is this seat taken?',
    explanation: '"Is this seat taken?" es la frase natural para consultar si un asiento está libre.',
    hint: 'Fluidez A1: "Is this seat taken?".'
  },
  {
    id: 'ex_19',
    question: '19. ¿Cuál es el plural irregular de "woman" (mujer)?',
    options: ['womans', 'womanes', 'women', 'womens'],
    correctAnswer: 'women',
    explanation: 'El plural irregular de "woman" es "women".',
    hint: 'A1 Inicial: Se cambia la "a" por "e".'
  },
  {
    id: 'ex_20',
    question: '20. ¿Qué frase significa "Disculpe, ¿dónde está el baño más cercano?"?',
    options: [
      'Excuse me, where is the nearest bathroom?',
      'Sorry, where you go bathroom?',
      'Where bathroom is near?',
      'Excuse me, bathroom open?'
    ],
    correctAnswer: 'Excuse me, where is the nearest bathroom?',
    explanation: '"Excuse me, where is the nearest bathroom?" es la pregunta perfecta y cortés.',
    hint: 'Fluidez A1: "nearest bathroom".'
  }
];
