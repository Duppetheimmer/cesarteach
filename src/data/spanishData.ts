import { LessonStep, VocabWord, QuizQuestion } from '../types';

// ==========================================
// 1. ESPAÑOL A1 INICIAL (SPANISH A1 FOUNDATIONS FOR ENGLISH SPEAKERS)
// ==========================================
export const spanishA1InicialLessons: LessonStep[] = [
  {
    id: 'es_a1_ini_1',
    day: 1,
    title: '1. Greetings, Introductions & Courtesy (Saludos y Cortesía)',
    description: 'Essential Spanish expressions to introduce yourself, greet others politely, and break the ice.',
    content: `In Spanish, everyday interactions begin with greetings and polite courtesy phrases.

• Greetings (Saludos):
  - "Hola" (Hello / Hi - informal & general)
  - "Buenos días" (Good morning - used until noon)
  - "Buenas tardes" (Good afternoon - 12pm to 8pm)
  - "Buenas noches" (Good evening / Good night - used for both greeting at night and saying goodbye)

• Introductions (Presentación):
  - "Me llamo..." / "Mi nombre es..." (My name is...)
  - "Soy..." (I am...)
  - "¿Cómo te llamas?" (What is your name? - informal)
  - "¿Cómo se llama usted?" (What is your name? - formal)
  - "Mucho gusto" / "Encantado/a" (Nice to meet you / Delighted)

• Courtesy & Farewells (Cortesía y Despedida):
  - "Por favor" (Please) | "Gracias" (Thank you) | "Muchas gracias" (Thank you very much)
  - "De nada" (You're welcome) | "Con gusto" (My pleasure)
  - "Disculpe" / "Perdón" (Excuse me / Sorry)
  - "Hasta luego" (See you later) | "Hasta mañana" (See you tomorrow) | "Adiós" (Goodbye)`,
    dialogue: [
      { speaker: 'Elena', textEn: 'Good morning! My name is Elena. What is your name?', textEs: '¡Buenos días! Mi nombre es Elena. ¿Cómo te llamas?' },
      { speaker: 'Carlos', textEn: 'Hi Elena! I am Carlos. Nice to meet you.', textEs: '¡Hola Elena! Soy Carlos. Mucho gusto.' },
      { speaker: 'Elena', textEn: 'Nice to meet you too! Have a good day.', textEs: '¡Mucho gusto también! Que tengas un buen día.' },
      { speaker: 'Carlos', textEn: 'Thank you! Goodbye!', textEs: '¡Muchas gracias! ¡Adiós!' }
    ],
    quiz: [
      {
        id: 'q_es_a1_1_1',
        question: 'How do you say "Nice to meet you" in Spanish?',
        options: ['Por favor', 'Mucho gusto', 'Hasta luego', 'Buenos días'],
        correctAnswer: 'Mucho gusto',
        explanation: '"Mucho gusto" or "Encantado/a" is the standard phrase for "Nice to meet you".',
        hint: 'Expresses the pleasure ("gusto") of meeting someone.'
      },
      {
        id: 'q_es_a1_1_2',
        question: 'What is the standard response when someone says "Muchas gracias"?',
        options: ['De nada', 'Por favor', 'Hola', 'Perdón'],
        correctAnswer: 'De nada',
        explanation: '"De nada" corresponds to "You\'re welcome" in Spanish.',
        hint: 'Translates literally to "Of nothing".'
      },
      {
        id: 'q_es_a1_1_3',
        question: 'How do you say "Good morning" in Spanish?',
        options: ['Buenas tardes', 'Buenas noches', 'Buenos días', 'Hasta mañana'],
        correctAnswer: 'Buenos días',
        explanation: '"Buenos días" is used from morning until midday.',
        hint: 'Uses the masculine plural "días" (days).'
      },
      {
        id: 'q_es_a1_1_4',
        type: 'word-order',
        question: 'Arrange the words to say: "My name is Carlos."',
        options: ['Mi', 'nombre', 'es', 'Carlos.'],
        correctAnswer: 'Mi nombre es Carlos.',
        explanation: 'Structure: Mi (My) + nombre (name) + es (is) + Carlos.',
        hint: 'Mi + nombre + es + Carlos.'
      },
      {
        id: 'q_es_a1_1_5',
        question: 'How do you ask someone "What is your name?" informally?',
        options: ['¿Dónde vives?', '¿Cómo te llamas?', '¿Cuántos años tienes?', '¿De dónde eres?'],
        correctAnswer: '¿Cómo te llamas?',
        explanation: '"¿Cómo te llamas?" is the informal way to ask someone\'s name.',
        hint: 'Literally "How do you call yourself?".'
      }
    ]
  },
  {
    id: 'es_a1_ini_2',
    day: 2,
    title: '2. Numbers (1-100), Age & Prices (Números, Edad y Precios)',
    description: 'Learn to count, state your age using TENER, and ask for prices in stores and markets.',
    content: `Mastering Spanish numbers is essential for shopping, stating your age, and giving phone numbers.

• Spanish Numbers (Números):
  - 1-10: Uno, Dos, Tres, Cuatro, Cinco, Seis, Siete, Ocho, Nueve, Diez.
  - 11-20: Once, Doce, Trece, Catorce, Quince, Dieciséis, Diecisiete, Dieciocho, Diecinueve, Veinte.
  - 21-29: Veintiuno, Veintidós, Veintitrés, Veinticuatro, Veinticinco...
  - Tens (30-100): Treinta (30), Cuarenta (40), Cincuenta (50), Sesenta (60), Setenta (70), Ochenta (80), Noventa (90), Cien (100).

• Expressing Age (Crucial Difference from English!):
  In Spanish, you do NOT say "I am 20 years old". You say "I HAVE 20 years" using the verb TENER:
  - "Tengo 25 años." (I am 25 years old.)
  - "¿Cuántos años tienes?" (How old are you?)
  - "Ella tiene 30 años." (She is 30 years old.)

• Asking Prices (Preguntar precios):
  - "¿Cuánto cuesta esto?" / "¿Cuánto vale esto?" (How much does this cost?)
  - "Cuesta quince euros / dólares." (It costs fifteen euros / dollars.)`,
    dialogue: [
      { speaker: 'Shopper', textEn: 'Excuse me, how much does this shirt cost?', textEs: 'Disculpe, ¿cuánto cuesta esta camisa?' },
      { speaker: 'Clerk', textEn: 'It costs twenty-five dollars.', textEs: 'Cuesta veinticinco dólares.' },
      { speaker: 'Shopper', textEn: 'Great! I will take it.', textEs: '¡Excelente! Me la llevo.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_2_1',
        question: 'What is the correct way to say "I am 20 years old" in Spanish?',
        options: ['Soy 20 años', 'Tengo 20 años', 'Estoy 20 años', 'Hago 20 años'],
        correctAnswer: 'Tengo 20 años',
        explanation: 'In Spanish, age always uses the verb TENER ("Tengo ... años").',
        hint: 'You "possess" years in Spanish (Tengo).'
      },
      {
        id: 'q_es_a1_2_2',
        question: 'How do you write the number 15 in Spanish?',
        options: ['Diecicinco', 'Cincuenta', 'Quince', 'Veinticinco'],
        correctAnswer: 'Quince',
        explanation: '15 is "Quince". 50 is "Cincuenta".',
        hint: 'Starts with the letter Q.'
      },
      {
        id: 'q_es_a1_2_3',
        question: 'How do you ask "How much does this cost?" in Spanish?',
        options: ['¿Cuánto cuesta esto?', '¿Dónde está esto?', '¿Qué es esto?', '¿Cuándo es esto?'],
        correctAnswer: '¿Cuánto cuesta esto?',
        explanation: '"¿Cuánto cuesta esto?" is the standard question for prices.',
        hint: 'Uses the verb costar (cuesta).'
      },
      {
        id: 'q_es_a1_2_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Ella tiene treinta años."',
        options: ['Ella', 'tiene', 'treinta', 'años.'],
        correctAnswer: 'Ella tiene treinta años.',
        explanation: 'Subject (Ella) + verb (tiene) + number (treinta) + años.',
        hint: 'Ella + tiene + treinta + años.'
      },
      {
        id: 'q_es_a1_2_5',
        question: 'How do you say the number 50 in Spanish?',
        options: ['Quince', 'Cincuenta', 'Cuarenta', 'Sesenta'],
        correctAnswer: 'Cincuenta',
        explanation: '50 is "Cincuenta" (40 is Cuarenta, 60 is Sesenta).',
        hint: 'Starts with Cinc-.'
      }
    ]
  },
  {
    id: 'es_a1_ini_3',
    day: 3,
    title: '3. Subject Pronouns (Pronombres Personales)',
    description: 'Learn the Spanish pronouns: Yo, Tú, Él, Ella, Usted, Nosotros, Ellos, Ustedes.',
    content: `Subject pronouns replace names in sentences. Note the distinction between informal "Tú" and formal "Usted".

• Spanish Subject Pronouns:
  - Yo (I)
  - Tú (You - informal / used with friends, family, peers)
  - Usted (You - formal / used with elders, professionals, strangers)
  - Él (He) | Ella (She)
  - Nosotros / Nosotras (We - masculine/mixed vs feminine)
  - Ellos / Ellas (They - masculine/mixed vs feminine)
  - Ustedes (You all / Plural "you" in Latin America & formal Spain)

• Dropping Pronouns in Spanish:
  Because verb endings in Spanish already identify the subject, pronouns are often omitted!
  - "Yo hablo español." = "Hablo español." (Both mean "I speak Spanish.")`,
    quiz: [
      {
        id: 'q_es_a1_3_1',
        question: 'Which pronoun is used to address an adult or stranger respectfully and formally?',
        options: ['Tú', 'Usted', 'Él', 'Nosotros'],
        correctAnswer: 'Usted',
        explanation: '"Usted" is the formal pronoun for "You".',
        hint: 'Formal address in Spanish.'
      },
      {
        id: 'q_es_a1_3_2',
        question: 'Which pronoun means "We" for a group of women?',
        options: ['Nosotros', 'Nosotras', 'Ellas', 'Ustedes'],
        correctAnswer: 'Nosotras',
        explanation: '"Nosotras" is the feminine form of "We".',
        hint: 'Ends in -as for feminine.'
      },
      {
        id: 'q_es_a1_3_3',
        question: 'Which pronoun means "They" for a group of men or a mixed group?',
        options: ['Ellos', 'Ellas', 'Ustedes', 'Nosotros'],
        correctAnswer: 'Ellos',
        explanation: '"Ellos" is used for masculine or mixed-gender third-person plural.',
        hint: 'Masculine third person plural.'
      },
      {
        id: 'q_es_a1_3_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Nosotros somos amigos."',
        options: ['Nosotros', 'somos', 'amigos.'],
        correctAnswer: 'Nosotros somos amigos.',
        explanation: 'Subject (Nosotros) + verb (somos) + noun (amigos).',
        hint: 'Nosotros + somos + amigos.'
      },
      {
        id: 'q_es_a1_3_5',
        question: 'Why do native Spanish speakers often omit pronouns like "Yo" or "Tú"?',
        options: [
          'Because the verb conjugation already reveals who is doing the action',
          'Because pronouns are impolite in Spanish',
          'Because Spanish has no pronouns',
          'Only children use pronouns'
        ],
        correctAnswer: 'Because the verb conjugation already reveals who is doing the action',
        explanation: 'Verb endings in Spanish clearly show the subject (e.g. "hablo" can only mean "yo hablo").',
        hint: 'Spanish verbs change endings for every person.'
      }
    ]
  },
  {
    id: 'es_a1_ini_4',
    day: 4,
    title: '4. SER vs ESTAR (The Core To Be Distinction)',
    description: 'Master the fundamental Spanish distinction between SER (identity, origin) and ESTAR (states, locations).',
    content: `In Spanish, the English verb "To Be" is divided into TWO distinct verbs: SER and ESTAR.

1. SER (Permanent characteristics, identity, nationality, profession, time):
   - Conjugation: Yo soy, Tú eres, Él/Ella/Usted es, Nosotros somos, Ellos/Ustedes son
   - Uses:
     - Identity: "Soy Carlos." (I am Carlos.)
     - Profession: "Ella es doctora." (She is a doctor.)
     - Origin & Nationality: "Somos de España." (We are from Spain.)
     - Characteristics: "El libro es interesante." (The book is interesting.)

2. ESTAR (Temporary states, emotions, physical condition, geographic location):
   - Conjugation: Yo estoy, Tú estás, Él/Ella/Usted está, Nosotros estamos, Ellos/Ustedes están
   - Uses:
     - Location: "Estoy en casa." (I am at home.) | "¿Dónde está el baño?" (Where is the bathroom?)
     - Emotions & States: "Ella está feliz." (She is happy.) | "Estamos cansados." (We are tired.)

• Memory Acronym:
  - SER = D.O.C.T.O.R. (Description, Occupation, Characteristic, Time, Origin, Relationship)
  - ESTAR = P.L.A.C.E. (Position, Location, Action, Condition, Emotion)`,
    dialogue: [
      { speaker: 'Mateo', textEn: 'Where are you right now?', textEs: '¿Dónde estás ahora mismo?' },
      { speaker: 'Sofia', textEn: 'I am at the university. I am very busy today.', textEs: 'Estoy en la universidad. Estoy muy ocupada hoy.' },
      { speaker: 'Mateo', textEn: 'Are you a medicine student?', textEs: '¿Eres estudiante de medicina?' },
      { speaker: 'Sofia', textEn: 'Yes, I am! The classes are difficult.', textEs: '¡Sí, soy! Las clases son difíciles.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_4_1',
        question: 'Which verb do you use to express your nationality or profession?',
        options: ['ESTAR', 'SER', 'TENER', 'HACER'],
        correctAnswer: 'SER',
        explanation: 'SER is used for permanent characteristics, origin, and professions (Soy profesor).',
        hint: 'Think of identity = SER.'
      },
      {
        id: 'q_es_a1_4_2',
        question: 'How do you say "I am tired" (temporary physical state) in Spanish?',
        options: ['Soy cansado', 'Estoy cansado', 'Tengo cansado', 'Hago cansado'],
        correctAnswer: 'Estoy cansado',
        explanation: 'Physical tiredness is a temporary state, so it requires ESTAR ("Estoy cansado/a").',
        hint: 'Temporary condition uses ESTAR.'
      },
      {
        id: 'q_es_a1_4_3',
        question: 'How do you ask "Where is the hotel?" in Spanish?',
        options: ['¿Dónde es el hotel?', '¿Dónde está el hotel?', '¿Dónde tiene el hotel?', '¿Dónde hay el hotel?'],
        correctAnswer: '¿Dónde está el hotel?',
        explanation: 'Geographic location always uses the verb ESTAR ("¿Dónde está...?").',
        hint: 'Location uses ESTAR.'
      },
      {
        id: 'q_es_a1_4_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Ella es de México."',
        options: ['Ella', 'es', 'de', 'México.'],
        correctAnswer: 'Ella es de México.',
        explanation: 'Origin uses SER: Ella (She) + es (is) + de (from) + México.',
        hint: 'Ella + es + de + México.'
      },
      {
        id: 'q_es_a1_4_5',
        question: 'Complete the sentence: "Nosotros ___ en Madrid hoy."',
        options: ['somos', 'estamos', 'tienen', 'son'],
        correctAnswer: 'estamos',
        explanation: 'Being in Madrid today is a physical location, which requires "estamos" (ESTAR).',
        hint: 'Location in Madrid = estamos.'
      }
    ]
  },
  {
    id: 'es_a1_ini_5',
    day: 5,
    title: '5. Questions & Interrogative Words (Preguntas W/H)',
    description: 'Learn how to form questions in Spanish using ¿Qué?, ¿Dónde?, ¿Quién?, ¿Cuándo?, ¿Por qué?, ¿Cómo?',
    content: `All Spanish question words carry an accent mark (tilde) and are enclosed with opening and closing question marks (¿ ?).

• Key Spanish Question Words:
  - ¿Qué? (What?): "¿Qué es esto?" (What is this?)
  - ¿Dónde? (Where?): "¿Dónde vives?" (Where do you live?) | "¿De dónde eres?" (Where are you from?)
  - ¿Quién? / ¿Quiénes? (Who?): "¿Quién es él?" (Who is he?)
  - ¿Cuándo? (When?): "¿Cuándo es la fiesta?" (When is the party?)
  - ¿Por qué? (Why? - two words with accent) -> Answered with "Porque..." (Because - one word, no accent)
  - ¿Cómo? (How?): "¿Cómo estás?" (How are you?)
  - ¿Cuánto? / ¿Cuánta? / ¿Cuántos? / ¿Cuántas? (How much? / How many?): "¿Cuántos años tienes?" (How old are you?)`,
    dialogue: [
      { speaker: 'Traveler', textEn: 'Excuse me, where is the train station?', textEs: 'Disculpe, ¿dónde está la estación de tren?' },
      { speaker: 'Local', textEn: 'It is two blocks straight ahead.', textEs: 'Está a dos cuadras derecho.' },
      { speaker: 'Traveler', textEn: 'When does the next train leave?', textEs: '¿Cuándo sale el próximo tren?' },
      { speaker: 'Local', textEn: 'At four o\'clock in the afternoon.', textEs: 'A las cuatro de la tarde.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_5_1',
        question: 'Which question word means "Where?" in Spanish?',
        options: ['¿Qué?', '¿Dónde?', '¿Quién?', '¿Cuándo?'],
        correctAnswer: '¿Dónde?',
        explanation: '"¿Dónde?" means "Where?" in Spanish.',
        hint: 'Asks for location.'
      },
      {
        id: 'q_es_a1_5_2',
        question: 'How do you ask "Why?" in Spanish?',
        options: ['¿Por qué?', 'Porque', '¿Para qué?', '¿Quién?'],
        correctAnswer: '¿Por qué?',
        explanation: '"¿Por qué?" (two words with accent) means "Why?". "Porque" (one word) means "Because".',
        hint: 'Two words with accent mark on qué.'
      },
      {
        id: 'q_es_a1_5_3',
        question: 'Which word means "When?" in Spanish?',
        options: ['¿Dónde?', '¿Cuándo?', '¿Cómo?', '¿Cuánto?'],
        correctAnswer: '¿Cuándo?',
        explanation: '"¿Cuándo?" asks about time or date.',
        hint: 'Relates to calendar or schedule.'
      },
      {
        id: 'q_es_a1_5_4',
        type: 'word-order',
        question: 'Arrange the question: "¿Dónde está el baño?"',
        options: ['¿Dónde', 'está', 'el', 'baño?'],
        correctAnswer: '¿Dónde está el baño?',
        explanation: 'Question word (¿Dónde) + verb (está) + article & noun (el baño?).',
        hint: '¿Dónde + está + el baño?'
      },
      {
        id: 'q_es_a1_5_5',
        question: 'How do you ask "How are you?" to a friend in Spanish?',
        options: ['¿Cómo te llamas?', '¿Cómo estás?', '¿De dónde eres?', '¿Qué hora es?'],
        correctAnswer: '¿Cómo estás?',
        explanation: '"¿Cómo estás?" is the standard greeting to ask how someone is doing.',
        hint: 'Uses the verb estar for emotional/physical state.'
      }
    ]
  },
  {
    id: 'es_a1_ini_6',
    day: 6,
    title: '6. Countries, Nationalities & Languages (Países e Idiomas)',
    description: 'Talk about your origin, your nationality, and the languages you speak.',
    content: `Essential vocabulary to discuss where you come from in Spanish:

• Expressing Origin & Nationality:
  - Origin: "Soy de Estados Unidos." (I am from the United States.)
  - Nationality: "Soy estadounidense / americano." (I am American.)
  - Languages: "Hablo inglés y un poco de español." (I speak English and a little Spanish.)

• Common Countries & Nationalities (Masculine / Feminine):
  - España -> español / española (Spanish)
  - México -> mexicano / mexicana (Mexican)
  - Estados Unidos -> estadounidense (American)
  - Canadá -> canadiense (Canadian)
  - Francia -> francés / francesa (French)
  - Italia -> italiano / italiana (Italian)
  - Alemania -> alemán / alemana (German)
  - Reino Unido / Inglaterra -> inglés / inglesa (English/British)

• Note on Gender Agreement:
  Nationalities in Spanish change ending for gender:
  - "Él es mexicano." (He is Mexican.)
  - "Ella es mexicana." (She is Mexican.)`,
    dialogue: [
      { speaker: 'Lucas', textEn: 'Where are you from originally?', textEs: '¿De dónde eres originalmente?' },
      { speaker: 'Maria', textEn: 'I am from Canada. I am Canadian. And you?', textEs: 'Soy de Canadá. Soy canadiense. ¿Y tú?' },
      { speaker: 'Lucas', textEn: 'I am from Spain. Do you speak Spanish?', textEs: 'Soy de España. ¿Hablas español?' },
      { speaker: 'Maria', textEn: 'I speak English and I am learning Spanish.', textEs: 'Hablo inglés y estoy aprendiendo español.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_6_1',
        question: 'How do you say "I speak English and Spanish" in Spanish?',
        options: ['Hablo inglés y español', 'Digo inglés y español', 'Soy inglés y español', 'Tengo inglés y español'],
        correctAnswer: 'Hablo inglés y español',
        explanation: '"Hablo" (from hablar) is the verb used to speak languages.',
        hint: 'Verb HABLAR -> Hablo.'
      },
      {
        id: 'q_es_a1_6_2',
        question: 'If a woman is from Mexico, how do you say "She is Mexican"?',
        options: ['Ella es mexicano', 'Ella es mexicana', 'Ella está mexicana', 'Ella tiene mexicana'],
        correctAnswer: 'Ella es mexicana',
        explanation: 'Adjectives of nationality agree in gender: Ella es mexicanA.',
        hint: 'Feminine gender ending in -a.'
      },
      {
        id: 'q_es_a1_6_3',
        question: 'How do you ask someone "Where are you from?" in Spanish?',
        options: ['¿Dónde vives?', '¿De dónde eres?', '¿Cómo te llamas?', '¿Qué idioma hablas?'],
        correctAnswer: '¿De dónde eres?',
        explanation: '"¿De dónde eres?" asks for someone\'s origin using SER.',
        hint: 'De dónde + eres.'
      },
      {
        id: 'q_es_a1_6_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Yo hablo dos idiomas."',
        options: ['Yo', 'hablo', 'dos', 'idiomas.'],
        correctAnswer: 'Yo hablo dos idiomas.',
        explanation: 'Subject (Yo) + verb (hablo) + number (dos) + noun (idiomas).',
        hint: 'Yo + hablo + dos + idiomas.'
      },
      {
        id: 'q_es_a1_6_5',
        question: 'What is the Spanish name for the United States?',
        options: ['Inglaterra', 'Estados Unidos', 'Reino Unido', 'Alemania'],
        correctAnswer: 'Estados Unidos',
        explanation: '"Estados Unidos" is the United States in Spanish.',
        hint: 'United States = Estados Unidos.'
      }
    ]
  },
  {
    id: 'es_a1_ini_7',
    day: 7,
    title: '7. Family & Possessive Adjectives (La Familia y Posesivos)',
    description: 'Name your family members and express possession with Mi, Tu, Su, Nuestro/a.',
    content: `Vocabulary for family and possessive adjectives in Spanish:

• Family Members (La Familia):
  - Padre / Papá (Father / Dad) | Madre / Mamá (Mother / Mom) | Padres (Parents)
  - Hermano (Brother) | Hermana (Sister) | Hermanos (Brothers/Siblings)
  - Hijo (Son) | Hija (Daughter) | Hijos (Children/Sons)
  - Esposo (Husband) | Esposa (Wife)
  - Abuelo (Grandfather) | Abuela (Grandmother)

• Possessive Adjectives (Must match singular/plural!):
  - Mi / Mis (My): "Mi hermano" / "Mis hermanos"
  - Tu / Tus (Your - informal): "Tu casa" / "Tus libros"
  - Su / Sus (His / Her / Their / Your formal): "Su carro" / "Sus amigos"
  - Nuestro / Nuestra / Nuestros / Nuestras (Our): "Nuestra familia" / "Nuestros hijos"`,
    dialogue: [
      { speaker: 'Diego', textEn: 'Is this your family?', textEs: '¿Es esta tu familia?' },
      { speaker: 'Ana', textEn: 'Yes! This is my husband and our two daughters.', textEs: '¡Sí! Este es mi esposo y nuestras dos hijas.' },
      { speaker: 'Diego', textEn: 'How old are your daughters?', textEs: '¿Cuántos años tienen tus hijas?' },
      { speaker: 'Ana', textEn: 'They are five and eight years old.', textEs: 'Tienen cinco y ocho años.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_7_1',
        question: 'Which word means "Parents" (mother and father together) in Spanish?',
        options: ['Parientes', 'Padres', 'Hermanos', 'Hijos'],
        correctAnswer: 'Padres',
        explanation: '"Padres" means parents (father and mother). "Parientes" means relatives in general.',
        hint: 'Plural of padre.'
      },
      {
        id: 'q_es_a1_7_2',
        question: 'How do you say "My brothers" in Spanish?',
        options: ['Mi hermanos', 'Mis hermanos', 'Tu hermanos', 'Sus hermanos'],
        correctAnswer: 'Mis hermanos',
        explanation: 'Possessive adjectives agree in number with the noun: "Mis hermanos".',
        hint: 'Possessive must be plural (Mis).'
      },
      {
        id: 'q_es_a1_7_3',
        question: 'How do you say "Our family" in Spanish?',
        options: ['Mi familia', 'Tu familia', 'Nuestra familia', 'Su familia'],
        correctAnswer: 'Nuestra familia',
        explanation: '"Nuestra familia" agrees in feminine singular with familia.',
        hint: 'Feminine form of our = nuestra.'
      },
      {
        id: 'q_es_a1_7_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Mi hermana tiene un perro."',
        options: ['Mi', 'hermana', 'tiene', 'un', 'perro.'],
        correctAnswer: 'Mi hermana tiene un perro.',
        explanation: 'Possessive + noun (Mi hermana) + verb (tiene) + object (un perro).',
        hint: 'Mi hermana tiene...'
      },
      {
        id: 'q_es_a1_7_5',
        question: 'What is the Spanish word for "Daughter"?',
        options: ['Hijo', 'Hija', 'Hermana', 'Esposa'],
        correctAnswer: 'Hija',
        explanation: '"Hija" is daughter ("Hijo" is son).',
        hint: 'Feminine ending in -a.'
      }
    ]
  },
  {
    id: 'es_a1_ini_8',
    day: 8,
    title: '8. Articles (El, La, Los, Las, Un, Una) & Gender Agreement',
    description: 'Learn the masculine and feminine grammatical genders and plural rules in Spanish.',
    content: `Every noun in Spanish has a grammatical gender (masculine or feminine).

1. Definite Articles (The):
   - Singular Masculine: EL ("el libro", "el café")
   - Singular Feminine: LA ("la casa", "la mesa")
   - Plural Masculine: LOS ("los libros", "los cafés")
   - Plural Feminine: LAS ("las casas", "las mesas")

2. Indefinite Articles (A / An / Some):
   - Singular Masculine: UN ("un perro", "un auto")
   - Singular Feminine: UNA ("una manzana", "una amiga")
   - Plural Masculine: UNOS ("unos perros" - some dogs)
   - Plural Feminine: UNAS ("unas manzanas" - some apples)

• General Gender Rule:
  - Words ending in -o are typically masculine: el libro, el chico
  - Words ending in -a are typically feminine: la mesa, la chica
  - Common Exceptions: "el día" (masculine), "la mano" (feminine), "el problema" (masculine).`,
    quiz: [
      {
        id: 'q_es_a1_8_1',
        question: 'Which definite article is used before the feminine word "casa" (house)?',
        options: ['El', 'La', 'Los', 'Las'],
        correctAnswer: 'La',
        explanation: '"Casa" is a feminine singular noun, so it uses "La casa".',
        hint: 'Feminine singular article.'
      },
      {
        id: 'q_es_a1_8_2',
        question: 'How do you say "an apple" in Spanish?',
        options: ['un manzana', 'una manzana', 'la manzana', 'el manzana'],
        correctAnswer: 'una manzana',
        explanation: '"Manzana" is feminine, so the indefinite article is "una manzana".',
        hint: 'Feminine indefinite article is "una".'
      },
      {
        id: 'q_es_a1_8_3',
        question: 'What is the plural of "el libro"?',
        options: ['los libros', 'las libros', 'unos libro', 'los libro'],
        correctAnswer: 'los libros',
        explanation: 'The plural of "el libro" is "los libros".',
        hint: 'Both article and noun take -s / -os.'
      },
      {
        id: 'q_es_a1_8_4',
        type: 'word-order',
        question: 'Arrange the phrase: "La casa es muy grande."',
        options: ['La', 'casa', 'es', 'muy', 'grande.'],
        correctAnswer: 'La casa es muy grande.',
        explanation: 'Article + Noun (La casa) + Verb (es) + Adverb & Adjective (muy grande).',
        hint: 'La casa es...'
      },
      {
        id: 'q_es_a1_8_5',
        question: 'Which of the following is a famous masculine exception ending in -a?',
        options: ['La mesa', 'El día', 'La puerta', 'La silla'],
        correctAnswer: 'El día',
        explanation: '"El día" is masculine despite ending in -a ("Buenos días").',
        hint: 'Used in "Buenos días".'
      }
    ]
  },
  {
    id: 'es_a1_ini_9',
    day: 9,
    title: '9. Demonstratives (Este, Esta, Ese, Esa, Aquel)',
    description: 'Point out objects based on distance: here (este/esta), there (ese/esa), over there (aquel/aquella).',
    content: `Spanish demonstratives indicate location relative to the speaker and listener:

• Near the speaker (Here / Aquí):
  - Este (This - masculine) : "Este libro" (This book here)
  - Esta (This - feminine) : "Esta camisa" (This shirt here)
  - Estos (These - masculine plural) : "Estos zapatos"
  - Estas (These - feminine plural) : "Estas llaves"

• Near the listener (There / Ahí):
  - Ese / Esa (That) : "Ese carro" / "Esa mesa"
  - Esos / Esas (Those) : "Esos libros" / "Esas casas"

• Far from both (Over there / Allá):
  - Aquel / Aquella (That over there) : "Aquel edificio" (That building over there)
  - Aquellos / Aquellas (Those over there) : "Aquellas montañas"`,
    dialogue: [
      { speaker: 'Customer', textEn: 'Excuse me, how much is this watch here?', textEs: 'Disculpe, ¿cuánto cuesta este reloj aquí?' },
      { speaker: 'Vendor', textEn: 'This watch is $40, but those over there are $25.', textEs: 'Este reloj cuesta $40, pero aquellos de allá cuestan $25.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_9_1',
        question: 'You are holding a book in your hand (close & masculine). Which demonstrative do you use?',
        options: ['Ese libro', 'Este libro', 'Aquel libro', 'Estos libro'],
        correctAnswer: 'Este libro',
        explanation: '"Este" is used for masculine objects right next to the speaker.',
        hint: 'This (near me) = Este.'
      },
      {
        id: 'q_es_a1_9_2',
        question: 'How do you say "These keys" (feminine plural, near you) in Spanish?',
        options: ['Esta llaves', 'Estas llaves', 'Esas llaves', 'Aquellas llaves'],
        correctAnswer: 'Estas llaves',
        explanation: '"Estas" is the feminine plural demonstrative for objects close to you.',
        hint: 'Feminine plural near = Estas.'
      },
      {
        id: 'q_es_a1_9_3',
        question: 'Which demonstrative refers to something far away in the distance ("over there")?',
        options: ['Este', 'Ese', 'Aquel', 'Esta'],
        correctAnswer: 'Aquel',
        explanation: '"Aquel" / "Aquella" points to objects far from both the speaker and listener.',
        hint: 'Points to "allá" (over there).'
      },
      {
        id: 'q_es_a1_9_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Esta camisa es muy bonita."',
        options: ['Esta', 'camisa', 'es', 'muy', 'bonita.'],
        correctAnswer: 'Esta camisa es muy bonita.',
        explanation: 'Demonstrative (Esta) + noun (camisa) + verb (es) + adjective (muy bonita).',
        hint: 'Esta camisa es...'
      },
      {
        id: 'q_es_a1_9_5',
        question: 'What is the plural of "este"?',
        options: ['estes', 'estos', 'estas', 'esos'],
        correctAnswer: 'estos',
        explanation: 'The plural of "este" is "estos" (not estes).',
        hint: 'Irregular vowel shift: este -> estos.'
      }
    ]
  },
  {
    id: 'es_a1_ini_10',
    day: 10,
    title: '10. Time, Days of the Week & Months (La Hora y Fechas)',
    description: 'Learn how to tell time with SER and express days and months in Spanish.',
    content: `Mastering time, dates, and schedules in Spanish:

• Telling Time (La Hora - Uses the verb SER):
  - Asking time: "¿Qué hora es?" (What time is it?)
  - For 1:00 (Singular): "Es la una." (It is one o'clock.)
  - For all other hours (Plural):
    - "Son las dos." (It is 2:00.)
    - "Son las cuatro y media." (It is 4:30.)
    - "Son las cinco y cuarto." (It is 5:15.)
    - "Son las ocho menos cuarto." (It is a quarter to 8 / 7:45.)

• Days of the Week (Los Días de la Semana - Not capitalized in Spanish!):
  - Lunes (Monday), Martes (Tuesday), Miércoles (Wednesday), Jueves (Thursday), Viernes (Friday), Sábado (Saturday), Domingo (Sunday).
  - In Spanish, use "EL" for "ON": "El lunes tengo clase." (I have class on Monday.)

• Months of the Year (Los Meses del Año):
  - Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre.
  - "Mi cumpleaños es en julio." (My birthday is in July.)`,
    dialogue: [
      { speaker: 'Friend', textEn: 'Excuse me, what time is it?', textEs: 'Disculpa, ¿qué hora es?' },
      { speaker: 'Companion', textEn: 'It is half past three. Our movie starts at four.', textEs: 'Son las tres y media. Nuestra película empieza a las cuatro.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_10_1',
        question: 'How do you say "It is 3:00" in Spanish?',
        options: ['Es las tres', 'Son las tres', 'Está las tres', 'Tiene tres'],
        correctAnswer: 'Son las tres',
        explanation: 'Hours 2 through 12 use plural "Son las [hora]". Only 1:00 uses "Es la una".',
        hint: 'Plural hours use "Son las...".'
      },
      {
        id: 'q_es_a1_10_2',
        question: 'How do you say "on Friday" in Spanish?',
        options: ['en viernes', 'el viernes', 'a viernes', 'por viernes'],
        correctAnswer: 'el viernes',
        explanation: 'In Spanish, "on [day]" is expressed with the definite article "el" ("el viernes").',
        hint: 'Uses the article "el".'
      },
      {
        id: 'q_es_a1_10_3',
        question: 'What is the Spanish word for "Saturday"?',
        options: ['Domingo', 'Sábado', 'Viernes', 'Jueves'],
        correctAnswer: 'Sábado',
        explanation: '"Sábado" is Saturday.',
        hint: 'Weekend day starting with S.'
      },
      {
        id: 'q_es_a1_10_4',
        type: 'word-order',
        question: 'Arrange the sentence: "La fiesta es el sábado a las ocho."',
        options: ['La', 'fiesta', 'es', 'el', 'sábado', 'a', 'las', 'ocho.'],
        correctAnswer: 'La fiesta es el sábado a las ocho.',
        explanation: 'Subject + verb (La fiesta es) + day (el sábado) + time (a las ocho).',
        hint: 'La fiesta es el sábado...'
      },
      {
        id: 'q_es_a1_10_5',
        question: 'How do you tell time for 1:00 PM ("It is one o\'clock")?',
        options: ['Son las una', 'Es la una', 'Está la una', 'Es una hora'],
        correctAnswer: 'Es la una',
        explanation: '1:00 is singular, so it uses "Es la una".',
        hint: 'Singular = Es la una.'
      }
    ]
  }
];

// ==========================================
// 2. ESPAÑOL A1 INTERMEDIO (INTERMEDIATE A1 IN SPANISH)
// ==========================================
export const spanishA1IntermedioLessons: LessonStep[] = [
  {
    id: 'es_a1_int_1',
    day: 1,
    title: '1. Present Tense Regular Verbs (-AR, -ER, -IR)',
    description: 'Learn the 3 conjugation patterns of regular Spanish verbs in the present tense.',
    content: `Regular Spanish verbs belong to one of three families based on their infinitive endings: -AR, -ER, or -IR.

1. -AR Verbs (e.g. Hablar - to speak, Trabajar - to work):
   - Yo habl-o | Tú habl-as | Él/Ella/Ud. habl-a
   - Nosotros habl-amos | Ellos/Ustedes habl-an

2. -ER Verbs (e.g. Comer - to eat, Beber - to drink):
   - Yo com-o | Tú com-es | Él/Ella/Ud. com-e
   - Nosotros com-emos | Ellos/Ustedes com-en

3. -IR Verbs (e.g. Vivir - to live, Escribir - to write):
   - Yo viv-o | Tú viv-es | Él/Ella/Ud. viv-e
   - Nosotros viv-imos | Ellos/Ustedes viv-en

• Negation in Spanish:
  Simply place "NO" before the conjugated verb:
  - "Yo no como carne." (I don't eat meat.)
  - "Él no habla inglés." (He doesn't speak English.)`,
    dialogue: [
      { speaker: 'Gabriel', textEn: 'Where do you work?', textEs: '¿Dónde trabajas?' },
      { speaker: 'Valeria', textEn: 'I work at a bank and I study in the evenings.', textEs: 'Trabajo en un banco y estudio por las tardes.' },
      { speaker: 'Gabriel', textEn: 'Do you live near your office?', textEs: '¿Vives cerca de tu oficina?' },
      { speaker: 'Valeria', textEn: 'Yes, I live five minutes away.', textEs: 'Sí, vivo a cinco minutos.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_int_1_1',
        question: 'How do you conjugate "Yo" for the verb TRABAJAR (to work)?',
        options: ['Trabajas', 'Trabajo', 'Trabaja', 'Trabajamos'],
        correctAnswer: 'Trabajo',
        explanation: 'All regular verbs in the present tense for "Yo" end in -o (Trabajo).',
        hint: 'Yo ending is -o.'
      },
      {
        id: 'q_es_a1_int_1_2',
        question: 'How do you say "She lives in Madrid" (Vivir)?',
        options: ['Ella vivo en Madrid', 'Ella vives en Madrid', 'Ella vive en Madrid', 'Ella vivan en Madrid'],
        correctAnswer: 'Ella vive en Madrid',
        explanation: 'For -IR verbs with Él/Ella, the ending is -e (Ella vive).',
        hint: '3rd person singular for -IR verbs ends in -e.'
      },
      {
        id: 'q_es_a1_int_1_3',
        question: 'How do you negate a sentence in Spanish (e.g. "I do not drink coffee")?',
        options: ['Yo tomo no café', 'Yo no tomo café', 'Yo café no tomo', 'Yo tomo café no'],
        correctAnswer: 'Yo no tomo café',
        explanation: 'In Spanish, "no" is placed directly before the conjugated verb.',
        hint: '"No" goes before the verb.'
      },
      {
        id: 'q_es_a1_int_1_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Nosotros comemos pizza los viernes."',
        options: ['Nosotros', 'comemos', 'pizza', 'los', 'viernes.'],
        correctAnswer: 'Nosotros comemos pizza los viernes.',
        explanation: 'Subject + verb (Nosotros comemos) + noun + day.',
        hint: 'Nosotros comemos...'
      },
      {
        id: 'q_es_a1_int_1_5',
        question: 'Which ending belongs to "Nosotros" for -AR verbs?',
        options: ['-amos', '-emos', '-imos', '-an'],
        correctAnswer: '-amos',
        explanation: '-AR verbs for Nosotros take the ending "-amos" (hablamos, trabajamos).',
        hint: 'Hablamos, estudiamos, trabajamos.'
      }
    ]
  },
  {
    id: 'es_a1_int_2',
    day: 2,
    title: '2. Frequency Adverbs & Daily Routines (Rutinas y Frecuencia)',
    description: 'Express how often you do activities using Siempre, Usualmente, A veces, Nunca.',
    content: `Adverbs of frequency describe the regularity of your daily habits in Spanish:

• Frequency Scale:
  - Siempre (100% - Always) : "Siempre desayuno café."
  - Usualmente / Normalmente (80% - Usually) : "Usualmente camino al trabajo."
  - A menudo / Con frecuencia (60% - Often) : "Leo libros a menudo."
  - A veces (50% - Sometimes) : "A veces cocino pasta."
  - Rara vez / Casi nunca (10% - Rarely) : "Rara vez veo televisión."
  - Nunca (0% - Never) : "Nunca bebo alcohol."

• Position in the Sentence:
  In Spanish, frequency adverbs are flexible and can appear before the verb or at the beginning/end of the sentence:
  - "Siempre estudio español." / "Yo estudio español siempre."`,
    quiz: [
      {
        id: 'q_es_a1_int_2_1',
        question: 'What is the Spanish word for "Always"?',
        options: ['Nunca', 'A veces', 'Siempre', 'Usualmente'],
        correctAnswer: 'Siempre',
        explanation: '"Siempre" means "Always" in Spanish.',
        hint: '100% frequency.'
      },
      {
        id: 'q_es_a1_int_2_2',
        question: 'What is the Spanish word for "Never"?',
        options: ['Siempre', 'A menudo', 'Nunca', 'Rara vez'],
        correctAnswer: 'Nunca',
        explanation: '"Nunca" means "Never".',
        hint: '0% frequency.'
      },
      {
        id: 'q_es_a1_int_2_3',
        question: 'How do you say "Sometimes I eat out"?',
        options: ['Siempre como fuera', 'A veces como fuera', 'Nunca como fuera', 'Casi nunca como fuera'],
        correctAnswer: 'A veces como fuera',
        explanation: '"A veces" translates to "Sometimes".',
        hint: '50% frequency phrase.'
      },
      {
        id: 'q_es_a1_int_2_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Yo siempre tomo café por la mañana."',
        options: ['Yo', 'siempre', 'tomo', 'café', 'por', 'la', 'mañana.'],
        correctAnswer: 'Yo siempre tomo café por la mañana.',
        explanation: 'Subject + adverb (Yo siempre) + verb (tomo) + object + time.',
        hint: 'Yo siempre tomo...'
      },
      {
        id: 'q_es_a1_int_2_5',
        question: 'How do you ask "¿Con qué frecuencia haces ejercicio?" in English?',
        options: ['When do you exercise?', 'How often do you exercise?', 'Where do you exercise?', 'Why do you exercise?'],
        correctAnswer: 'How often do you exercise?',
        explanation: '"¿Con qué frecuencia...?" means "How often...?".',
        hint: 'Asks for regularity.'
      }
    ]
  },
  {
    id: 'es_a1_int_3',
    day: 3,
    title: '3. Likes & Preferences: The Verb GUSTAR (Me gusta / Me encanta)',
    description: 'Understand how GUSTAR works with indirect object pronouns (Me gusta, Te gusta, Le gusta).',
    content: `The verb GUSTAR functions differently from the English "to like". In Spanish, things are pleasing TO you.

• Structure of GUSTAR:
  [Pronoun] + GUSTA (for singular things or verbs)
  [Pronoun] + GUSTAN (for plural nouns)

• Pronouns used with Gustar:
  - Me gusta / Me gustan (I like / to me it is pleasing)
  - Te gusta / Te gustan (You like - informal)
  - Le gusta / Le gustan (He / She / You formal likes)
  - Nos gusta / Nos gustan (We like)
  - Les gusta / Les gustan (They / You all like)

• Examples:
  - "Me gusta la música." (I like music - singular noun)
  - "Me gustan los libros." (I like books - plural noun -> gustan!)
  - "Me gusta bailar y cantar." (I like dancing and singing - infinitive verbs always use "gusta")
  - "Me encanta la pizza." (I love pizza.)`,
    dialogue: [
      { speaker: 'Pedro', textEn: 'Do you like Spanish food?', textEs: '¿Te gusta la comida española?' },
      { speaker: 'Lucia', textEn: 'Yes, I love paella and tapas! What about you?', textEs: '¡Sí, me encanta la paella y las tapas! ¿Y a ti?' },
      { speaker: 'Pedro', textEn: 'I like Spanish ham and churros with chocolate.', textEs: 'A mí me gusta el jamón español y los churros con chocolate.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_int_3_1',
        question: 'Why do we say "Me GUSTAN los libros" instead of "Me gusta los libros"?',
        options: [
          'Because "los libros" is plural, so the verb must be plural (gustan)',
          'Because "Me" is plural',
          'Because it is in the past tense',
          'It is a random exception'
        ],
        correctAnswer: 'Because "los libros" is plural, so the verb must be plural (gustan)',
        explanation: 'In Spanish, the noun that follows GUSTAR is the grammatical subject (books are pleasing to me).',
        hint: 'Plural object requires gustan.'
      },
      {
        id: 'q_es_a1_int_3_2',
        question: 'How do you say "I like to dance" in Spanish?',
        options: ['Me gusta bailar', 'Me gustan bailar', 'Yo gusto bailar', 'Me gusto bailar'],
        correctAnswer: 'Me gusta bailar',
        explanation: 'When followed by an infinitive verb (bailar), always use singular "gusta".',
        hint: 'Verbs in infinitive always use "gusta".'
      },
      {
        id: 'q_es_a1_int_3_3',
        question: 'How do you say "We like coffee"?',
        options: ['Me gusta el café', 'Nos gusta el café', 'Les gusta el café', 'Te gusta el café'],
        correctAnswer: 'Nos gusta el café',
        explanation: '"Nos" is the pronoun for "We" with the verb gustar (Nos gusta).',
        hint: 'Pronoun for we is "Nos".'
      },
      {
        id: 'q_es_a1_int_3_4',
        type: 'word-order',
        question: 'Arrange the sentence: "A mí me encanta la música."',
        options: ['A', 'mí', 'me', 'encanta', 'la', 'música.'],
        correctAnswer: 'A mí me encanta la música.',
        explanation: 'Emphasis (A mí) + pronoun (me) + verb (encanta) + subject (la música).',
        hint: 'A mí me encanta...'
      },
      {
        id: 'q_es_a1_int_3_5',
        question: 'What is the strongest expression for "I love (really like)" a thing in Spanish?',
        options: ['Me gusta', 'Me encanta', 'No me gusta', 'Me da igual'],
        correctAnswer: 'Me encanta',
        explanation: '"Me encanta" means "I love / I am enchanted by".',
        hint: 'Think of "enchanted".'
      }
    ]
  },
  {
    id: 'es_a1_int_4',
    day: 4,
    title: '4. The House, Furniture & HAY (There is / There are)',
    description: 'Describe the rooms of a house, furniture, and use HAY for existence.',
    content: `Learn to describe houses and apartments in Spanish:

• Parts of the House (Partes de la Casa):
  - Sala (Living room) : Sofá, televisión, mesa
  - Cocina (Kitchen) : Refrigerador / Nevera, estufa, microondas
  - Dormitorio / Habitación (Bedroom) : Cama, armario, lámpara
  - Baño (Bathroom) : Ducha, lavamanos, espejo, toalla
  - Jardín / Balcón (Garden / Balcony)

• HAY (There is / There are - from the verb HABER):
  In Spanish, "HAY" is super easy because it is the SAME for both singular and plural!
  - Singular: "Hay un sofá en la sala." (There is a sofa in the living room.)
  - Plural: "Hay tres camas en la casa." (There are three beds in the house.)
  - Negative: "No hay leche." (There is no milk.)
  - Question: "¿Hay un baño cerca?" (Is there a bathroom nearby?) -> "Sí, hay uno."`,
    dialogue: [
      { speaker: 'Renter', textEn: 'Is there a balcony in the apartment?', textEs: '¿Hay un balcón en el apartamento?' },
      { speaker: 'Owner', textEn: 'Yes, there is a big balcony and there are two bedrooms.', textEs: 'Sí, hay un balcón grande y hay dos dormitorios.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_int_4_1',
        question: 'How do you say "There are four chairs in the kitchen" in Spanish?',
        options: ['Hay cuatro sillas en la cocina', 'Están cuatro sillas en la cocina', 'Tienen cuatro sillas en la cocina', 'Son cuatro sillas'],
        correctAnswer: 'Hay cuatro sillas en la cocina',
        explanation: '"HAY" is used for both singular and plural existence.',
        hint: 'HAY means both there is and there are.'
      },
      {
        id: 'q_es_a1_int_4_2',
        question: 'Which word means "Kitchen" in Spanish?',
        options: ['Baño', 'Dormitorio', 'Cocina', 'Sala'],
        correctAnswer: 'Cocina',
        explanation: '"Cocina" is kitchen.',
        hint: 'Place where you cook (cocinar).'
      },
      {
        id: 'q_es_a1_int_4_3',
        question: 'How do you ask "¿Hay wifi en el hotel?" in English?',
        options: ['Is there Wi-Fi in the hotel?', 'Where is the Wi-Fi?', 'How much is Wi-Fi?', 'When is Wi-Fi?'],
        correctAnswer: 'Is there Wi-Fi in the hotel?',
        explanation: '"¿Hay...?" asks "Is there...?" or "Are there...?".',
        hint: 'Asks about existence.'
      },
      {
        id: 'q_es_a1_int_4_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Hay dos camas en el dormitorio."',
        options: ['Hay', 'dos', 'camas', 'en', 'el', 'dormitorio.'],
        correctAnswer: 'Hay dos camas en el dormitorio.',
        explanation: 'Hay + dos camas + en el dormitorio.',
        hint: 'Hay dos camas...'
      },
      {
        id: 'q_es_a1_int_4_5',
        question: 'How do you say "There is no hot water"?',
        options: ['No es agua caliente', 'No hay agua caliente', 'No está agua caliente', 'No tiene agua'],
        correctAnswer: 'No hay agua caliente',
        explanation: '"No hay..." means "There is no / There isn\'t any...".',
        hint: 'Negation of HAY.'
      }
    ]
  },
  {
    id: 'es_a1_int_5',
    day: 5,
    title: '5. Abilities & Permission: PODER (Can / To be able to)',
    description: 'Learn the irregular verb PODER (puedo, puedes, puede, podemos, pueden) + infinitive.',
    content: `The verb PODER (to be able to / can) expresses ability, possibility, or polite requests.

• Present Tense Conjugation (Stem-changing O -> UE):
  - Yo puedo (I can)
  - Tú puedes (You can - informal)
  - Él / Ella / Usted puede (He/She/You formal can)
  - Nosotros podemos (We can - note: no stem change here!)
  - Ellos / Ustedes pueden (They / You all can)

• Rule: PODER is followed directly by an infinitive verb!
  - "Puedo hablar español." (I can speak Spanish.)
  - "¿Puedes ayudarme, por favor?" (Can you help me, please?)
  - "No podemos ir hoy." (We cannot go today.)
  - "¿Puedo pasar?" (May I come in?)`,
    dialogue: [
      { speaker: 'Tourist', textEn: 'Can you help me, please?', textEs: '¿Puedes ayudarme, por favor?' },
      { speaker: 'Local', textEn: 'Yes of course, how can I help you?', textEs: 'Sí claro, ¿en qué te puedo ayudar?' }
    ],
    quiz: [
      {
        id: 'q_es_a1_int_5_1',
        question: 'How do you conjugate PODER for "Yo" (I can)?',
        options: ['Podo', 'Puedo', 'Pueblo', 'Podes'],
        correctAnswer: 'Puedo',
        explanation: 'PODER is an o->ue stem-changing verb: Yo puedo.',
        hint: 'Stem change to "pue-".'
      },
      {
        id: 'q_es_a1_int_5_2',
        question: 'How do you politely ask someone "Can you help me, please?" in Spanish?',
        options: ['¿Puedes ayudarme, por favor?', '¡Ayúdame ahora!', 'Debes ayudarme.', 'Haces ayuda.'],
        correctAnswer: '¿Puedes ayudarme, por favor?',
        explanation: '"¿Puedes ayudarme, por favor?" is the standard polite request.',
        hint: 'Uses puedes + ayudarme.'
      },
      {
        id: 'q_es_a1_int_5_3',
        question: 'What is the "Nosotros" form of PODER?',
        options: ['Puedemos', 'Podemos', 'Podimos', 'Pueden'],
        correctAnswer: 'Podemos',
        explanation: '"Nosotros" does not take the stem change in regular -ER verbs: "Podemos".',
        hint: 'Keeps the "o": Podemos.'
      },
      {
        id: 'q_es_a1_int_5_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Yo puedo hablar un poco de español."',
        options: ['Yo', 'puedo', 'hablar', 'un', 'poco', 'de', 'español.'],
        correctAnswer: 'Yo puedo hablar un poco de español.',
        explanation: 'Subject + puedo + infinitive (hablar) + un poco de español.',
        hint: 'Yo puedo hablar...'
      },
      {
        id: 'q_es_a1_int_5_5',
        question: 'How do you say "We cannot come today"?',
        options: ['No podemos venir hoy', 'No pueden venir hoy', 'No puedo venir hoy', 'No podéis venir hoy'],
        correctAnswer: 'No podemos venir hoy',
        explanation: '"No podemos venir hoy" uses the 1st person plural (Nosotros).',
        hint: 'We = no podemos.'
      }
    ]
  },
  {
    id: 'es_a1_int_6',
    day: 6,
    title: '6. Food, Drinks & Ordering in a Restaurant (En el Restaurante)',
    description: 'Culinary vocabulary and polite phrases to order food and ask for the bill.',
    content: `Mastering dining and ordering in Hispanic restaurants:

• Food & Drinks Vocabulary (Comida y Bebida):
  - Bebidas: Agua (Water), Café (Coffee), Té (Tea), Jugo / Zumo (Juice), Cerveza (Beer), Vino (Wine)
  - Comida: Pan (Bread), Arroz (Rice), Pollo (Chicken), Carne (Meat/Beef), Pescado (Fish), Ensalada (Salad), Queso (Cheese)
  - Comidas del día: Desayuno (Breakfast), Almuerzo (Lunch), Cena (Dinner)

• Polite Ordering Phrases:
  - "Quisiera un café con leche, por favor." (I would like a coffee with milk, please.)
  - "¿Me trae la carta / el menú, por favor?" (Could you bring me the menu, please?)
  - "Para mí, el pollo asado." (For me, the roasted chicken.)
  - "La cuenta, por favor." (The bill / check, please.)
  - "¿Está incluido el servicio / la propina?" (Is the tip included?)`,
    dialogue: [
      { speaker: 'Waiter', textEn: 'Good evening, are you ready to order?', textEs: 'Buenas noches, ¿están listos para pedir?' },
      { speaker: 'Diner', textEn: 'Yes, I would like the grilled fish with salad, please.', textEs: 'Sí, quisiera el pescado a la plancha con ensalada, por favor.' },
      { speaker: 'Waiter', textEn: 'And to drink?', textEs: '¿Y para beber?' },
      { speaker: 'Diner', textEn: 'A mineral water with gas, please.', textEs: 'Un agua mineral con gas, por favor.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_int_6_1',
        question: 'How do you ask for the check / bill when finishing a meal in Spanish?',
        options: ['El dinero, por favor', 'La cuenta, por favor', 'El menú, por favor', 'El cheque, por favor'],
        correctAnswer: 'La cuenta, por favor',
        explanation: '"La cuenta, por favor" is the universal phrase for "The bill, please".',
        hint: 'Literally "The count / bill".'
      },
      {
        id: 'q_es_a1_int_6_2',
        question: 'What is the polite phrase "Quisiera..." equivalent to in English?',
        options: ['I want immediately', 'I would like...', 'Give me...', 'I must have...'],
        correctAnswer: 'I would like...',
        explanation: '"Quisiera..." (or "Me gustaría...") is the polite form for "I would like...".',
        hint: 'Polite conditional request.'
      },
      {
        id: 'q_es_a1_int_6_3',
        question: 'What is the Spanish word for "Breakfast"?',
        options: ['Almuerzo', 'Cena', 'Desayuno', 'Merienda'],
        correctAnswer: 'Desayuno',
        explanation: '"Desayuno" is breakfast.',
        hint: 'First meal of the day.'
      },
      {
        id: 'q_es_a1_int_6_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Quisiera un vaso de agua, por favor."',
        options: ['Quisiera', 'un', 'vaso', 'de', 'agua,', 'por', 'favor.'],
        correctAnswer: 'Quisiera un vaso de agua, por favor.',
        explanation: 'Quisiera + un vaso de agua + por favor.',
        hint: 'Quisiera un vaso...'
      },
      {
        id: 'q_es_a1_int_6_5',
        question: 'How do you say "water with gas (sparkling water)" in Spanish?',
        options: ['Agua con gas', 'Agua sin gas', 'Agua fría', 'Agua caliente'],
        correctAnswer: 'Agua con gas',
        explanation: '"Agua con gas" is sparkling water; "Agua sin gas" is still water.',
        hint: 'Gas = carbonation.'
      }
    ]
  },
  {
    id: 'es_a1_int_7',
    day: 7,
    title: '7. Physical Descriptions & Personality (Descripciones)',
    description: 'Learn adjectives to describe people\'s physical features and personality traits in Spanish.',
    content: `Describing people in Spanish with gender and number agreement:

• Physical Appearance (SER + Adjectives):
  - Alto / Alta (Tall) | Bajo / Baja (Short)
  - Delgado / Delgada (Thin/Slim) | Fuerte / Atlético (Strong/Athletic)
  - Joven (Young) | Mayor / Viejo (Elderly/Old)

• Hair and Eyes (TENER + features):
  - "Ella tiene el pelo rubio y largo." (She has long blonde hair.)
  - "Él tiene los ojos azules / verdes / castaños." (He has blue/green/brown eyes.)

• Personality (SER + Adjectives):
  - Simpático / Simpática (Friendly / Nice) | Amable (Kind)
  - Inteligente (Smart / Intelligent) | Gracioso / Cómico (Funny)
  - Trabajador / Trabajadora (Hardworking) | Tranquilo / Tranquila (Calm/Quiet)`,
    dialogue: [
      { speaker: 'Carlos', textEn: 'How is your new boss?', textEs: '¿Cómo es tu nuevo jefe?' },
      { speaker: 'Diana', textEn: 'He is very smart, kind, and hardworking.', textEs: 'Es muy inteligente, amable y trabajador.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_int_7_1',
        question: 'How do you say "My sister is very friendly and smart" in Spanish?',
        options: [
          'Mi hermana es muy simpática e inteligente',
          'Mi hermana está muy simpática e inteligente',
          'Mi hermana tiene muy simpática e inteligente',
          'Mi hermana es muy simpático e inteligente'
        ],
        correctAnswer: 'Mi hermana es muy simpática e inteligente',
        explanation: 'Personality uses SER (es) and feminine agreement (simpática). Before "i", "y" turns into "e" (e inteligente).',
        hint: 'Feminine agreement for sister.'
      },
      {
        id: 'q_es_a1_int_7_2',
        question: 'Which verb is used to describe eye and hair color ("He has blue eyes")?',
        options: ['SER', 'ESTAR', 'TENER', 'HACER'],
        correctAnswer: 'TENER',
        explanation: 'In Spanish, features like eyes and hair use TENER ("Tiene ojos azules").',
        hint: 'You "have" features in Spanish.'
      },
      {
        id: 'q_es_a1_int_7_3',
        question: 'What is the feminine form of "trabajador" (hardworking)?',
        options: ['trabajadora', 'trabajador', 'trabajadores', 'trabajadoras'],
        correctAnswer: 'trabajadora',
        explanation: 'Adjectives ending in -or add -a in the feminine (trabajador -> trabajadora).',
        hint: 'Adds -a at the end.'
      },
      {
        id: 'q_es_a1_int_7_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Él es alto y tiene ojos verdes."',
        options: ['Él', 'es', 'alto', 'y', 'tiene', 'ojos', 'verdes.'],
        correctAnswer: 'Él es alto y tiene ojos verdes.',
        explanation: 'Subject + SER (es alto) + TENER (tiene ojos verdes).',
        hint: 'Él es alto y...'
      },
      {
        id: 'q_es_a1_int_7_5',
        question: 'What is the opposite of "alto" (tall) in Spanish?',
        options: ['Grande', 'Bajo', 'Delgado', 'Joven'],
        correctAnswer: 'Bajo',
        explanation: '"Bajo/a" means short in height.',
        hint: 'Opposite of tall.'
      }
    ]
  },
  {
    id: 'es_a1_int_8',
    day: 8,
    title: '8. Clothes, Colors & Shopping (Ropa y Compras)',
    description: 'Describe garments, colors, and practice asking for sizes in clothing stores.',
    content: `Shopping and clothing vocabulary in Spanish:

• Clothing & Accessories (La Ropa):
  - Camisa (Shirt) | Camiseta (T-shirt) | Pantalones (Pants / Trousers)
  - Zapatos (Shoes) | Vestido (Dress) | Falda (Skirt) | Chaqueta (Jacket)
  - Sombrero (Hat) | Gafas (Glasses)

• Colors (Los Colores - Remember: Colors go AFTER the noun!):
  - Rojo/a (Red), Azul (Blue), Verde (Green), Amarillo/a (Yellow)
  - Negro/a (Black), Blanco/a (White), Gris (Gray), Marrón / Café (Brown)
  - Example: "Una camisa blanca" (A white shirt - noun first, color second!).

• Useful Phrases in a Store:
  - "Busco unos pantalones negros." (I am looking for black pants.)
  - "¿Qué talla es esta?" (What size is this?)
  - "¿Tienen una talla más pequeña / grande?" (Do you have a smaller / larger size?)
  - "¿Me lo puedo probar?" (Can I try it on?)
  - "¿Dónde está el probador?" (Where is the fitting room?)`,
    dialogue: [
      { speaker: 'Customer', textEn: 'Excuse me, can I try on this jacket?', textEs: 'Disculpe, ¿me puedo probar esta chaqueta?' },
      { speaker: 'Clerk', textEn: 'Of course! The fitting rooms are in the back.', textEs: '¡Por supuesto! Los probadores están al fondo.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_int_8_1',
        question: 'What is the correct word order in Spanish for "a red dress"?',
        options: ['un rojo vestido', 'un vestido rojo', 'rojo un vestido', 'vestido el rojo'],
        correctAnswer: 'un vestido rojo',
        explanation: 'In Spanish, color adjectives almost always follow the noun ("un vestido rojo").',
        hint: 'Noun first, then color.'
      },
      {
        id: 'q_es_a1_int_8_2',
        question: 'How do you ask "Where is the fitting room?" in Spanish?',
        options: ['¿Dónde está el baño?', '¿Dónde está el probador?', '¿Dónde está la cocina?', '¿Dónde está la caja?'],
        correctAnswer: '¿Dónde está el probador?',
        explanation: '"El probador" is the fitting / dressing room in a clothing store.',
        hint: 'Related to "probar" (to try on).'
      },
      {
        id: 'q_es_a1_int_8_3',
        question: 'What is the Spanish word for "Shirt"?',
        options: ['Camisa', 'Pantalón', 'Zapato', 'Vestido'],
        correctAnswer: 'Camisa',
        explanation: '"Camisa" is shirt. "Camiseta" is T-shirt.',
        hint: 'Starts with C.'
      },
      {
        id: 'q_es_a1_int_8_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Busco una camisa azul."',
        options: ['Busco', 'una', 'camisa', 'azul.'],
        correctAnswer: 'Busco una camisa azul.',
        explanation: 'Verb (Busco) + article (una) + noun (camisa) + color (azul).',
        hint: 'Busco una camisa...'
      },
      {
        id: 'q_es_a1_int_8_5',
        question: 'How do you ask "What size is this?" in Spanish?',
        options: ['¿Qué precio es este?', '¿Qué talla es esta?', '¿Qué color es este?', '¿Dónde está esto?'],
        correctAnswer: '¿Qué talla es esta?',
        explanation: '"Talla" is clothing size in Spanish.',
        hint: 'Size = Talla.'
      }
    ]
  },
  {
    id: 'es_a1_int_9',
    day: 9,
    title: '9. Present Continuous: ESTAR + -ANDO / -IENDO (Actions in Progress)',
    description: 'Express what you or others are doing right now in real time.',
    content: `The Present Continuous in Spanish describes actions happening right now at this moment.

• Structure: ESTAR (conjugated) + Gerund (-ANDO / -IENDO)

• Forming the Gerund:
  - For -AR verbs: remove -ar and add "-ANDO"
    - Hablar -> Hablando (Speaking)
    - Trabajar -> Trabajando (Working)
    - Estudiar -> Estudiando (Studying)
  
  - For -ER and -IR verbs: remove -er/-ir and add "-IENDO"
    - Comer -> Comiendo (Eating)
    - Beber -> Bebiendo (Drinking)
    - Vivir -> Viviendo (Living)
    - Escribir -> Escribiendo (Writing)

• Examples:
  - "Estoy estudiando español ahora mismo." (I am studying Spanish right now.)
  - "¿Qué estás haciendo?" (What are you doing?)
  - "Ellos están comiendo en un restaurante." (They are eating in a restaurant.)`,
    dialogue: [
      { speaker: 'Mother', textEn: 'Hi! What are you doing right now?', textEs: '¡Hola! ¿Qué estás haciendo ahora mismo?' },
      { speaker: 'Son', textEn: 'I am doing my homework and listening to music.', textEs: 'Estoy haciendo mi tarea y escuchando música.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_int_9_1',
        question: 'What is the gerund of the verb HABLAR (to speak) in Spanish?',
        options: ['Hablado', 'Hablando', 'Habliendo', 'Habliente'],
        correctAnswer: 'Hablando',
        explanation: '-AR verbs take the ending "-ando" (hablar -> hablando).',
        hint: '-AR verbs take -ando.'
      },
      {
        id: 'q_es_a1_int_9_2',
        question: 'What is the gerund of the verb COMER (to eat)?',
        options: ['Comando', 'Comiendo', 'Comado', 'Comido'],
        correctAnswer: 'Comiendo',
        explanation: '-ER and -IR verbs take the ending "-iendo" (comer -> comiendo).',
        hint: '-ER verbs take -iendo.'
      },
      {
        id: 'q_es_a1_int_9_3',
        question: 'How do you ask "What are you doing right now?" in Spanish?',
        options: ['¿Qué haces?', '¿Qué estás haciendo ahora mismo?', '¿Qué vas a hacer?', '¿Dónde estás?'],
        correctAnswer: '¿Qué estás haciendo ahora mismo?',
        explanation: '"¿Qué estás haciendo ahora mismo?" uses the present continuous for actions in progress.',
        hint: 'Uses estás + haciendo.'
      },
      {
        id: 'q_es_a1_int_9_4',
        type: 'word-order',
        question: 'Arrange the sentence: "Ella está cocinando la cena."',
        options: ['Ella', 'está', 'cocinando', 'la', 'cena.'],
        correctAnswer: 'Ella está cocinando la cena.',
        explanation: 'Subject + está + gerund (cocinando) + la cena.',
        hint: 'Ella está cocinando...'
      },
      {
        id: 'q_es_a1_int_9_5',
        question: 'Which auxiliary verb is used to form the continuous present in Spanish?',
        options: ['SER', 'ESTAR', 'HABER', 'TENER'],
        correctAnswer: 'ESTAR',
        explanation: 'The present continuous is always formed with ESTAR + Gerund (Estoy hablando).',
        hint: 'Always uses ESTAR.'
      }
    ]
  },
  {
    id: 'es_a1_int_10',
    day: 10,
    title: '10. Prepositions of Place (En, Sobre, Debajo de, Al lado de, Entre)',
    description: 'Pinpoint the location of objects and navigate places with precision.',
    content: `Essential Spanish prepositions of place and spatial position:

• Main Prepositions of Place:
  - EN (In / On / At): "Las llaves están en la mesa." (The keys are on the table.) | "Estoy en el hotel."
  - DEBAJO DE (Under / Below): "El gato está debajo de la cama." (The cat is under the bed.)
  - ENCIMA DE / SOBRE (On top of / Above): "El libro está encima de la mesa."
  - AL LADO DE (Next to / Beside): "El banco está al lado del supermercado." (Note: de + el = del!)
  - ENTRE (Between / Among): "La cafetería está entre el museo y el parque."
  - DELANTE DE / ENFRENTE DE (In front of / Across from): "Hay un taxi delante del hotel."
  - DETRÁS DE (Behind): "El estacionamiento está detrás del edificio."`,
    dialogue: [
      { speaker: 'Lost Person', textEn: 'Excuse me, where is the pharmacy?', textEs: 'Disculpe, ¿dónde está la farmacia?' },
      { speaker: 'Local', textEn: 'It is on Main Street, next to the supermarket and across from the park.', textEs: 'Está en la calle Principal, al lado del supermercado y enfrente del parque.' }
    ],
    quiz: [
      {
        id: 'q_es_a1_int_10_1',
        question: 'Which preposition means "Next to / Beside" in Spanish?',
        options: ['Debajo de', 'Al lado de', 'Entre', 'Detrás de'],
        correctAnswer: 'Al lado de',
        explanation: '"Al lado de" means "Next to / Beside".',
        hint: 'Side = lado.'
      },
      {
        id: 'q_es_a1_int_10_2',
        question: 'Which preposition means "Under / Below"?',
        options: ['Encima de', 'Debajo de', 'Entre', 'Delante de'],
        correctAnswer: 'Debajo de',
        explanation: '"Debajo de" means "Under / Beneath".',
        hint: 'Under = debajo.'
      },
      {
        id: 'q_es_a1_int_10_3',
        question: 'How do you say "The coffee shop is between the bank and the park"?',
        options: [
          'La cafetería está entre el banco y el parque',
          'La cafetería está al lado del banco',
          'La cafetería está debajo del banco',
          'La cafetería está detrás del banco'
        ],
        correctAnswer: 'La cafetería está entre el banco y el parque',
        explanation: '"Entre" means "between two things".',
        hint: 'Between = entre.'
      },
      {
        id: 'q_es_a1_int_10_4',
        type: 'word-order',
        question: 'Arrange the sentence: "El perro está debajo de la mesa."',
        options: ['El', 'perro', 'está', 'debajo', 'de', 'la', 'mesa.'],
        correctAnswer: 'El perro está debajo de la mesa.',
        explanation: 'Subject + está + debajo de + la mesa.',
        hint: 'El perro está debajo...'
      },
      {
        id: 'q_es_a1_int_10_5',
        question: 'When "de" meets the masculine article "el", what contraction is formed?',
        options: ['de el', 'del', 'd\'el', 'da'],
        correctAnswer: 'del',
        explanation: 'In Spanish, "de + el" mandatory merges into the contraction "del" (al lado del banco).',
        hint: 'Mandatory contraction: del.'
      }
    ]
  }
];

// ==========================================
// 3. FLUIDEZ Y PRÁCTICA CONVERSACIONAL EN ESPAÑOL
// ==========================================
export const spanishFluencyLessons: LessonStep[] = [
  {
    id: 'es_flu_1',
    day: 1,
    title: 'Dialogue 1: Meeting New People & Breaking the Ice',
    category: 'Real Conversation',
    description: 'Learn a natural, friendly Spanish dialogue to introduce yourself and make friends.',
    content: `🗣️ Scenario: Meeting someone in a café or meetup in a Spanish-speaking city.

• Person A: "¡Hola! ¿Está ocupado este asiento?" (Hi! Is this seat taken?)
• Person B: "No, está libre. ¡Siéntate, por favor!" (No, it's free. Please sit down!)
• Person A: "¡Gracias! Me llamo John. ¿Cómo te llamas?" (Thanks! My name is John. What is your name?)
• Person B: "Soy Sofía. ¡Mucho gusto, John! ¿De dónde eres?" (I'm Sofia. Nice to meet you, John! Where are you from?)
• Person A: "Soy de Estados Unidos. ¿Y tú?" (I'm from the United States. And you?)
• Person B: "Soy de Colombia. ¿Estás aquí por trabajo o vacaciones?" (I'm from Colombia. Are you here for work or vacation?)
• Person A: "¡Estoy de vacaciones y practicando mi español!" (I'm on vacation and practicing my Spanish!)`,
    dialogue: [
      { speaker: 'John', textEn: 'Hi! Is this seat taken?', textEs: '¡Hola! ¿Está ocupado este asiento?' },
      { speaker: 'Sofía', textEn: 'No, it\'s free. Please sit down!', textEs: 'No, está libre. ¡Siéntate, por favor!' },
      { speaker: 'John', textEn: 'Thanks! I\'m John. Nice to meet you.', textEs: '¡Gracias! Soy John. Mucho gusto.' },
      { speaker: 'Sofía', textEn: 'Nice to meet you John! Where are you from?', textEs: '¡Mucho gusto John! ¿De dónde eres?' },
      { speaker: 'John', textEn: 'I\'m from Chicago. Are you from here?', textEs: 'Soy de Chicago. ¿Eres de aquí?' },
      { speaker: 'Sofía', textEn: 'Yes, welcome to our city!', textEs: '¡Sí, bienvenido a nuestra ciudad!' }
    ],
    quiz: [
      {
        id: 'q_es_flu_1_1',
        question: 'How do you politely ask if a seat or chair is occupied in Spanish?',
        options: ['¿Está ocupado este asiento?', 'Dame esta silla', '¿Quién se sienta aquí?', '¿Es tu silla?'],
        correctAnswer: '¿Está ocupado este asiento?',
        explanation: '"¿Está ocupado este asiento?" is the natural and polite way to ask.',
        hint: 'Ocupado = occupied / taken.'
      },
      {
        id: 'q_es_flu_1_2',
        question: 'What does "Mucho gusto" mean when meeting someone?',
        options: ['Goodbye', 'Nice to meet you', 'Excuse me', 'Thank you'],
        correctAnswer: 'Nice to meet you',
        explanation: '"Mucho gusto" expresses pleasure upon meeting someone.',
        hint: 'Standard introduction greeting.'
      },
      {
        id: 'q_es_flu_1_3',
        type: 'word-order',
        question: 'Arrange the sentence: "Mucho gusto en conocerte."',
        options: ['Mucho', 'gusto', 'en', 'conocerte.'],
        correctAnswer: 'Mucho gusto en conocerte.',
        explanation: 'Mucho gusto en conocerte = Nice to meet you.',
        hint: 'Mucho gusto en...'
      },
      {
        id: 'q_es_flu_1_4',
        question: 'If asked "¿De dónde eres?", what are they asking you?',
        options: ['Where do you live?', 'Where are you from?', 'How old are you?', 'What is your job?'],
        correctAnswer: 'Where are you from?',
        explanation: '"¿De dónde eres?" asks for your place of origin.',
        hint: 'Origin question.'
      }
    ]
  },
  {
    id: 'es_flu_2',
    day: 2,
    title: 'Dialogue 2: Ordering at a Café (En la Cafetería)',
    category: 'Real Conversation',
    description: 'Conversational practice to order coffee, snacks, and pay with cash or card.',
    content: `🗣️ Scenario: Ordering in a bakery or coffee shop.

• Barista: "¡Hola! ¿Qué le preparo hoy?" (Hello! What can I get for you today?)
• Cliente: "¡Hola! ¿Me da un café con leche y una medialuna / croissant, por favor?" (Hi! Can I get a latte and a croissant, please?)
• Barista: "¡Claro que sí! ¿Para tomar aquí o para llevar?" (Sure! For here or to go?)
• Cliente: "Para tomar aquí. ¿Cuánto es?" (For here. How much is that?)
• Barista: "Son cuatro euros. ¿Paga en efectivo o con tarjeta?" (That will be 4 euros. Cash or card?)
• Cliente: "Con tarjeta, por favor." (Card, please.)
• Barista: "Muchas gracias, ¡que disfrute!" (Thank you very much, enjoy!)`,
    dialogue: [
      { speaker: 'Barista', textEn: 'Good morning! What would you like?', textEs: '¡Buenos días! ¿Qué desea tomar?' },
      { speaker: 'Customer', textEn: 'I would like a large cappuccino and a pastry, please.', textEs: 'Quisiera un capuchino grande y un pastel, por favor.' },
      { speaker: 'Barista', textEn: 'For here or to go?', textEs: '¿Para tomar aquí o para llevar?' },
      { speaker: 'Customer', textEn: 'To go, please. Can I pay with credit card?', textEs: 'Para llevar, por favor. ¿Puedo pagar con tarjeta?' }
    ],
    quiz: [
      {
        id: 'q_es_flu_2_1',
        question: 'How do you say "To go (takeout)" in Spanish?',
        options: ['Para aquí', 'Para llevar', 'Para comer', 'Para pagar'],
        correctAnswer: 'Para llevar',
        explanation: '"Para llevar" is the standard phrase for "To go / Takeaway".',
        hint: 'Llevar = to carry/take away.'
      },
      {
        id: 'q_es_flu_2_2',
        question: 'How do you say "With credit card, please" when paying?',
        options: ['En efectivo, por favor', 'Con tarjeta, por favor', 'Sin dinero, por favor', 'Con cheque'],
        correctAnswer: 'Con tarjeta, por favor',
        explanation: '"Con tarjeta" means by credit/debit card.',
        hint: 'Card = tarjeta.'
      },
      {
        id: 'q_es_flu_2_3',
        type: 'word-order',
        question: 'Arrange the sentence: "Un café con leche, por favor."',
        options: ['Un', 'café', 'con', 'leche,', 'por', 'favor.'],
        correctAnswer: 'Un café con leche, por favor.',
        explanation: 'Un café + con leche + por favor.',
        hint: 'Un café con...'
      },
      {
        id: 'q_es_flu_2_4',
        question: 'What does "efectivo" mean in a payment context?',
        options: ['Credit card', 'Cash', 'Coins only', 'Gift card'],
        correctAnswer: 'Cash',
        explanation: '"Efectivo" means physical cash money.',
        hint: 'Cash payment.'
      }
    ]
  },
  {
    id: 'es_flu_3',
    day: 3,
    title: 'Dialogue 3: Asking for Directions in the City (Direcciones)',
    category: 'Real Conversation',
    description: 'Learn to ask for and understand directions from pedestrians and locals.',
    content: `🗣️ Scenario: Navigating a historic Spanish town looking for the subway or central square.

• Turista: "¡Disculpe! ¿Me podría ayudar? ¿Dónde está la estación de metro más cercana?" (Excuse me! Could you help me? Where is the nearest subway station?)
• Residente: "¡Claro! Siga todo derecho por dos cuadras, y luego doble a la izquierda en el banco." (Sure! Go straight for two blocks, then turn left at the bank.)
• Turista: "¿Está lejos de aquí?" (Is it far from here?)
• Residente: "No, ¡está muy cerca! A unos cinco minutos a pie. Lo verá al lado del supermercado." (No, it's very close! About 5 minutes walking.)
• Turista: "¡Excelente! ¡Muchísimas gracias!" (Great! Thank you so much!)
• Residente: "¡De nada! ¡Buen viaje!" (You're welcome! Safe travels!)`,
    dialogue: [
      { speaker: 'Tourist', textEn: 'Excuse me, where is the main square?', textEs: 'Disculpe, ¿dónde queda la plaza principal?' },
      { speaker: 'Local', textEn: 'Go straight and turn right at the traffic light.', textEs: 'Vaya derecho y gire a la derecha en el semáforo.' }
    ],
    quiz: [
      {
        id: 'q_es_flu_3_1',
        question: 'What does "Doble a la izquierda" mean?',
        options: ['Turn right', 'Turn left', 'Go straight', 'Stop here'],
        correctAnswer: 'Turn left',
        explanation: '"Izquierda" is left and "doblar / girar" is to turn.',
        hint: 'Izquierda = left.'
      },
      {
        id: 'q_es_flu_3_2',
        question: 'How do you say "Go straight" in Spanish?',
        options: ['Gire a la derecha', 'Gire a la izquierda', 'Siga todo derecho / recto', 'Pare aquí'],
        correctAnswer: 'Siga todo derecho / recto',
        explanation: '"Todo derecho" or "recto" means straight ahead.',
        hint: 'Derecho = straight ahead.'
      },
      {
        id: 'q_es_flu_3_3',
        type: 'word-order',
        question: 'Arrange the sentence: "¿Dónde está la estación de tren?"',
        options: ['¿Dónde', 'está', 'la', 'estación', 'de', 'tren?'],
        correctAnswer: '¿Dónde está la estación de tren?',
        explanation: '¿Dónde está + la estación de tren?',
        hint: '¿Dónde está la estación...'
      },
      {
        id: 'q_es_flu_3_4',
        question: 'What does "¿Está lejos de aquí?" ask?',
        options: ['Is it close to here?', 'Is it far from here?', 'Is it open now?', 'How much is the ticket?'],
        correctAnswer: 'Is it far from here?',
        explanation: '"Lejos" means far and "de aquí" means from here.',
        hint: 'Lejos = far.'
      }
    ]
  },
  {
    id: 'es_flu_4',
    day: 4,
    title: 'Dialogue 4: Hotel Check-in & Staying in a Spanish Hotel',
    category: 'Real Conversation',
    description: 'Master checking in, getting your room keycard, and asking for hotel amenities in Spanish.',
    content: `🗣️ Scenario: Arriving at the reception desk of a hotel in Madrid or Mexico City.

• Recepcionista: "¡Buenas tardes! Bienvenido al Hotel Sol. ¿En qué le puedo colaborar?" (Good afternoon! Welcome to Hotel Sol. How can I help you?)
• Huésped: "¡Hola! Tengo una reserva a nombre de Smith." (Hello! I have a reservation under the name of Smith.)
• Recepcionista: "Permítame verificar... Sí, señor Smith, una habitación doble por tres noches. ¿Me permite su pasaporte?" (Let me verify... Yes, Mr. Smith, a double room for 3 nights. May I see your passport?)
• Huésped: "Aquí tiene mi pasaporte y mi tarjeta de crédito." (Here is my passport and credit card.)
• Recepcionista: "¡Gracias! Aquí tiene su llave. Su habitación es la 305 en el tercer piso. El desayuno es de 7 a 10 de la mañana." (Thank you! Here is your key. Room 305 on the 3rd floor. Breakfast is from 7 to 10 AM.)
• Huésped: "¡Perfecto! ¿Cuál es la contraseña del Wi-Fi?" (Perfect! What is the Wi-Fi password?)
• Recepcionista: "La contraseña está escrita en la tarjeta de su llave." (The password is on your keycard.)`,
    dialogue: [
      { speaker: 'Receptionist', textEn: 'Welcome! Do you have a reservation?', textEs: '¡Bienvenido! ¿Tiene una reserva?' },
      { speaker: 'Guest', textEn: 'Yes, I have a reservation under the name of Davis.', textEs: 'Sí, tengo una reserva a nombre de Davis.' },
      { speaker: 'Receptionist', textEn: 'Here is your key. Room 402 on the fourth floor.', textEs: 'Aquí tiene su llave. Habitación 402 en el cuarto piso.' }
    ],
    quiz: [
      {
        id: 'q_es_flu_4_1',
        question: 'How do you say "I have a reservation under the name of..." in Spanish?',
        options: ['Tengo una reserva a nombre de...', 'Compro una cama...', 'Mi nombre es hotel...', 'Quiero un cuarto gratis'],
        correctAnswer: 'Tengo una reserva a nombre de...',
        explanation: '"Tengo una reserva a nombre de..." is the standard formal hotel phrase.',
        hint: 'Reserva a nombre de.'
      },
      {
        id: 'q_es_flu_4_2',
        question: 'How do you ask "What is the Wi-Fi password?" in Spanish?',
        options: ['¿Dónde está la computadora?', '¿Cuál es la contraseña del Wi-Fi?', '¿Cuánto cuesta el internet?', '¿Hay televisión?'],
        correctAnswer: '¿Cuál es la contraseña del Wi-Fi?',
        explanation: '"Contraseña" is the Spanish word for password.',
        hint: 'Contraseña = password.'
      },
      {
        id: 'q_es_flu_4_3',
        type: 'word-order',
        question: 'Arrange the sentence: "Aquí tiene su llave de la habitación."',
        options: ['Aquí', 'tiene', 'su', 'llave', 'de', 'la', 'habitación.'],
        correctAnswer: 'Aquí tiene su llave de la habitación.',
        explanation: 'Aquí tiene + su llave de la habitación.',
        hint: 'Aquí tiene su...'
      },
      {
        id: 'q_es_flu_4_4',
        question: 'What does "el ascensor" mean?',
        options: ['The stairs', 'The elevator', 'The restaurant', 'The parking lot'],
        correctAnswer: 'The elevator',
        explanation: '"El ascensor" is the elevator / lift.',
        hint: 'Takes you to upper floors.'
      }
    ]
  }
];

// ==========================================
// 4. SPANISH VOCABULARY BANK (SPANISH FAST TRACK)
// ==========================================
export const spanishFastTrackVocab: VocabWord[] = [
  // Nouns
  { id: 'es_v_1', word: 'Tiempo', translation: 'Time / Weather', example: '¿Tienes tiempo para hablar?', category: 'Sustantivos' },
  { id: 'es_v_2', word: 'Gente', translation: 'People', example: 'Hay mucha gente amable aquí.', category: 'Sustantivos' },
  { id: 'es_v_3', word: 'Camino', translation: 'Way / Path', example: 'Este es el camino correcto.', category: 'Sustantivos' },
  { id: 'es_v_4', word: 'Día', translation: 'Day', example: '¡Que tengas un lindo día!', category: 'Sustantivos' },
  { id: 'es_v_5', word: 'Cosa', translation: 'Thing', example: '¿Qué es esa cosa?', category: 'Sustantivos' },
  { id: 'es_v_6', word: 'Mundo', translation: 'World', example: 'Viajar por todo el mundo.', category: 'Sustantivos' },
  { id: 'es_v_7', word: 'Vida', translation: 'Life', example: 'La vida es maravillosa.', category: 'Sustantivos' },
  { id: 'es_v_8', word: 'Lugar', translation: 'Place', example: 'Este es un lugar hermoso.', category: 'Sustantivos' },
  { id: 'es_v_9', word: 'Agua', translation: 'Water', example: 'Bebe mucha agua todos los días.', category: 'Sustantivos' },
  { id: 'es_v_10', word: 'Dinero', translation: 'Money', example: '¿Cuánto dinero necesitas?', category: 'Sustantivos' },
  { id: 'es_v_10b', word: 'Amigo', translation: 'Friend', example: 'Él es mi mejor amigo.', category: 'Sustantivos' },
  { id: 'es_v_10c', word: 'Casa', translation: 'House / Home', example: 'Mi casa es tu casa.', category: 'Sustantivos' },

  // Verbs
  { id: 'es_v_11', word: 'Necesitar', translation: 'To need', example: 'Necesito tu ayuda ahora.', category: 'Verbos' },
  { id: 'es_v_12', word: 'Querer', translation: 'To want / love', example: 'Quiero una taza de café.', category: 'Verbos' },
  { id: 'es_v_13', word: 'Saber', translation: 'To know (information)', example: 'Yo sé la respuesta correcta.', category: 'Verbos' },
  { id: 'es_v_14', word: 'Entender', translation: 'To understand', example: '¿Me entiendes cuando hablo?', category: 'Verbos' },
  { id: 'es_v_15', word: 'Hacer', translation: 'To do / To make', example: 'Ella puede hacer la cena.', category: 'Verbos' },
  { id: 'es_v_16', word: 'Pensar', translation: 'To think', example: 'Pienso que es una gran idea.', category: 'Verbos' },
  { id: 'es_v_17', word: 'Tomar', translation: 'To take / To drink', example: 'Toma un paraguas contigo.', category: 'Verbos' },
  { id: 'es_v_18', word: 'Encontrar', translation: 'To find', example: 'No puedo encontrar mis llaves.', category: 'Verbos' },
  { id: 'es_v_19', word: 'Hablar', translation: 'To speak', example: 'Hablo español e inglés.', category: 'Verbos' },
  { id: 'es_v_20', word: 'Escuchar', translation: 'To listen', example: 'Escucha con atención al profesor.', category: 'Verbos' },
  { id: 'es_v_20b', word: 'Vivir', translation: 'To live', example: 'Vivo en Madrid.', category: 'Verbos' },
  { id: 'es_v_20c', word: 'Aprender', translation: 'To learn', example: 'Aprendo español todos los días.', category: 'Verbos' },

  // Adjectives
  { id: 'es_v_21', word: 'Importante', translation: 'Important', example: 'Esta lección es muy importante.', category: 'Adjetivos' },
  { id: 'es_v_22', word: 'Disponible', translation: 'Available', example: '¿Estás disponible mañana?', category: 'Adjetivos' },
  { id: 'es_v_23', word: 'Diferente', translation: 'Different', example: 'Tenemos opiniones diferentes.', category: 'Adjetivos' },
  { id: 'es_v_24', word: 'Fácil', translation: 'Easy', example: 'El español es fácil con práctica.', category: 'Adjetivos' },
  { id: 'es_v_25', word: 'Útil', translation: 'Useful', example: 'Este vocabulario es muy útil.', category: 'Adjetivos' },
  { id: 'es_v_26', word: 'Feliz', translation: 'Happy', example: 'Ella está muy feliz hoy.', category: 'Adjetivos' },
  { id: 'es_v_27', word: 'Listo', translation: 'Ready / Smart', example: '¿Estás listo para el examen?', category: 'Adjetivos' },
  { id: 'es_v_27b', word: 'Delicioso', translation: 'Delicious', example: 'Esta comida está deliciosa.', category: 'Adjetivos' },

  // Connectors & Expressions
  { id: 'es_v_28', word: 'Porque', translation: 'Because', example: 'Estudio porque me gustan los idiomas.', category: 'Conectores' },
  { id: 'es_v_29', word: 'Sin embargo', translation: 'However / Nevertheless', example: 'Estaba lloviendo; sin embargo, salimos.', category: 'Conectores' },
  { id: 'es_v_30', word: 'También', translation: 'Also / Too', example: 'Yo también hablo un poco de italiano.', category: 'Conectores' },
  { id: 'es_v_31', word: 'En realidad', translation: 'Actually / In reality', example: 'En realidad, ya terminé la lección.', category: 'Conectores' },
  { id: 'es_v_32', word: 'Juntos', translation: 'Together', example: 'Podemos practicar español juntos.', category: 'Conectores' }
];

// ==========================================
// 5. SPANISH A1 FINAL CERTIFICATION EXAM (20 QUESTIONS)
// ==========================================
export const spanishFinalExamQuestions: QuizQuestion[] = [
  {
    id: 'es_ex_1',
    question: '1. How do you correctly say "I am 25 years old" in Spanish?',
    options: ['Soy 25 años', 'Tengo 25 años', 'Estoy 25 años', 'Hago 25 años'],
    correctAnswer: 'Tengo 25 años',
    explanation: 'In Spanish, age is always expressed with the verb TENER ("Tengo ... años").',
    hint: 'A1 Foundations: Remember to use TENER for age.'
  },
  {
    id: 'es_ex_2',
    question: '2. Which subject pronoun is used for "We" when referring to a group of people including yourself?',
    options: ['Ellos', 'Nosotros', 'Ustedes', 'Vosotros'],
    correctAnswer: 'Nosotros',
    explanation: '"Nosotros" means "We" in Spanish.',
    hint: 'A1 Foundations: 1st person plural.'
  },
  {
    id: 'es_ex_3',
    question: '3. What is the difference between SER and ESTAR in Spanish?',
    options: [
      'SER is for permanent identity/characteristics; ESTAR is for temporary states and locations',
      'SER is only for animals; ESTAR is only for people',
      'They are completely interchangeable',
      'ESTAR is used for time and SER is used for weather'
    ],
    correctAnswer: 'SER is for permanent identity/characteristics; ESTAR is for temporary states and locations',
    explanation: 'SER is used for origin, identity, and traits; ESTAR is used for locations and changing conditions.',
    hint: 'A1 Foundations: D.O.C.T.O.R. vs P.L.A.C.E.'
  },
  {
    id: 'es_ex_4',
    question: '4. How do you say "Where is the nearest bathroom?" in Spanish?',
    options: [
      '¿Dónde está el baño más cercano?',
      '¿Dónde es el baño más cercano?',
      '¿Cuándo está el baño?',
      '¿Quién es el baño?'
    ],
    correctAnswer: '¿Dónde está el baño más cercano?',
    explanation: 'Locations always use the verb ESTAR ("¿Dónde está...?").',
    hint: 'A1 Foundations: Location uses ESTAR.'
  },
  {
    id: 'es_ex_5',
    question: '5. Which definite article is used with the masculine plural noun "libros"?',
    options: ['El', 'La', 'Los', 'Las'],
    correctAnswer: 'Los',
    explanation: '"Los" is the masculine plural definite article (Los libros).',
    hint: 'A1 Foundations: Masculine plural article.'
  },
  {
    id: 'es_ex_6',
    question: '6. What is the polite response when someone says "Muchas gracias"?',
    options: ['Por favor', 'De nada', 'Disculpe', 'Hasta luego'],
    correctAnswer: 'De nada',
    explanation: '"De nada" corresponds to "You\'re welcome" in Spanish.',
    hint: 'A1 Foundations: Courtesy response.'
  },
  {
    id: 'es_ex_7',
    question: '7. How do you conjugate the regular verb TRABAJAR (to work) for "Ella"?',
    options: ['Ella trabajo', 'Ella trabajas', 'Ella trabaja', 'Ella trabajamos'],
    correctAnswer: 'Ella trabaja',
    explanation: 'For -AR regular verbs with Él/Ella, the ending is -a (Ella trabaja).',
    hint: 'A1 Intermediate: -AR verb 3rd person singular.'
  },
  {
    id: 'es_ex_8',
    question: '8. Complete the sentence of habit: "Yo ___ tomo café por la mañana." (Always)',
    options: ['nunca', 'a veces', 'siempre', 'rara vez'],
    correctAnswer: 'siempre',
    explanation: '"Siempre" means "Always" in Spanish.',
    hint: 'A1 Intermediate: 100% frequency.'
  },
  {
    id: 'es_ex_9',
    question: '9. How do you say "I like books" using the verb GUSTAR?',
    options: ['Me gusta los libros', 'Me gustan los libros', 'Yo gusto los libros', 'Me gusto los libros'],
    correctAnswer: 'Me gustan los libros',
    explanation: 'Because "los libros" is plural, the verb must be plural ("Me gustan").',
    hint: 'A1 Intermediate: Plural subject requires gustan.'
  },
  {
    id: 'es_ex_10',
    question: '10. How do you express "There are two bedrooms in the house" using HAY?',
    options: ['Hay dos dormitorios en la casa', 'Están dos dormitorios', 'Son dos dormitorios', 'Tienen dos dormitorios'],
    correctAnswer: 'Hay dos dormitorios en la casa',
    explanation: '"HAY" is used for existence in both singular and plural in Spanish.',
    hint: 'A1 Intermediate: Use HAY for there is/are.'
  },
  {
    id: 'es_ex_11',
    question: '11. What is the "Yo" form of the modal verb PODER (to be able to / can)?',
    options: ['Podo', 'Puedo', 'Podes', 'Pueden'],
    correctAnswer: 'Puedo',
    explanation: 'PODER is an o->ue stem changing verb: "Yo puedo".',
    hint: 'A1 Intermediate: Stem change to pue-.'
  },
  {
    id: 'es_ex_12',
    question: '12. In a restaurant, how do you politely ask for the check / bill?',
    options: ['El dinero, por favor', 'La cuenta, por favor', 'El menú, por favor', 'El papel, por favor'],
    correctAnswer: 'La cuenta, por favor',
    explanation: '"La cuenta, por favor" is the standard phrase for the bill.',
    hint: 'Fluency: The bill = la cuenta.'
  },
  {
    id: 'es_ex_13',
    question: '13. Which preposition of place means "Next to / Beside"?',
    options: ['Debajo de', 'Al lado de', 'Entre', 'Detrás de'],
    correctAnswer: 'Al lado de',
    explanation: '"Al lado de" means beside or next to.',
    hint: 'A1 Intermediate: Lado = side.'
  },
  {
    id: 'es_ex_14',
    question: '14. What does "el ascensor" mean in a hotel or building?',
    options: ['The stairs', 'The elevator', 'The keycard', 'The lobby'],
    correctAnswer: 'The elevator',
    explanation: '"El ascensor" is the elevator / lift.',
    hint: 'Fluency: Elevator.'
  },
  {
    id: 'es_ex_15',
    question: '15. What is the meaning of the Spanish verb "Entender"?',
    options: ['To learn', 'To understand', 'To listen', 'To write'],
    correctAnswer: 'To understand',
    explanation: '"Entender" means to understand / comprehend.',
    hint: 'Vocabulary: Core cognitive verb.'
  },
  {
    id: 'es_ex_16',
    question: '16. How do you tell time for 2:30 ("It is 2:30") in Spanish?',
    options: ['Es la dos y media', 'Son las dos y media', 'Está dos y media', 'Tiene dos y media'],
    correctAnswer: 'Son las dos y media',
    explanation: 'Plural hours use "Son las [hora]".',
    hint: 'A1 Foundations: Plural hours use "Son las...".'
  },
  {
    id: 'es_ex_17',
    question: '17. How do you form the present continuous for "Ella ___ (estudiar) ahora mismo"?',
    options: ['está estudiando', 'es estudiando', 'estudia ahora', 'está estudiado'],
    correctAnswer: 'está estudiando',
    explanation: 'Present continuous is formed with ESTAR + Gerund (-ando): "está estudiando".',
    hint: 'A1 Intermediate: ESTAR + -ando.'
  },
  {
    id: 'es_ex_18',
    question: '18. How do you say "on Monday" in Spanish?',
    options: ['en lunes', 'el lunes', 'a lunes', 'por lunes'],
    correctAnswer: 'el lunes',
    explanation: 'Days of the week use the article "el" ("el lunes").',
    hint: 'A1 Foundations: Use "el" for days.'
  },
  {
    id: 'es_ex_19',
    question: '19. What is the feminine form of the nationality "español"?',
    options: ['española', 'españolo', 'españolas', 'españole'],
    correctAnswer: 'española',
    explanation: 'Nationalities ending in a consonant add "-a" for feminine: "española".',
    hint: 'A1 Foundations: Adds -a for feminine.'
  },
  {
    id: 'es_ex_20',
    question: '20. How do you ask someone for the Wi-Fi password in Spanish?',
    options: [
      '¿Cuál es la contraseña del Wi-Fi?',
      '¿Dónde está el internet?',
      '¿Cuánto cuesta la computadora?',
      '¿Tiene Wi-Fi abierto?'
    ],
    correctAnswer: '¿Cuál es la contraseña del Wi-Fi?',
    explanation: '"Contraseña" means password in Spanish.',
    hint: 'Fluency: Contraseña = password.'
  }
];

// Quick questions for quick practice modal
export const SPANISH_QUICK_QUESTIONS = [
  {
    id: 'sq1',
    type: 'vocab' as const,
    question: 'How do you say "Breakfast" in Spanish?',
    options: ['Almuerzo', 'Desayuno', 'Cena', 'Merienda'],
    correct: 'Desayuno',
    explanation: 'Desayuno = Breakfast, Almuerzo = Lunch, Cena = Dinner.'
  },
  {
    id: 'sq2',
    type: 'listening' as const,
    question: 'Listen to the audio and select the phrase you heard:',
    options: ['¿Dónde está el baño?', '¿Dónde está el tren?', '¿Dónde está el autobús?', '¿Dónde está el hotel?'],
    correct: '¿Dónde está el baño?',
    audioText: '¿Dónde está el baño?',
    explanation: 'You heard "¿Dónde está el baño?" (Where is the bathroom?).'
  },
  {
    id: 'sq3',
    type: 'word-order' as const,
    question: 'Arrange the sentence: "Yo tengo dos perros."',
    options: ['Yo tengo dos perros.', 'Yo dos perros tengo.', 'Tengo yo dos perros.', 'Dos perros yo tengo.'],
    correct: 'Yo tengo dos perros.',
    explanation: 'Subject (Yo) + Verb (tengo) + Object (dos perros).'
  },
  {
    id: 'sq4',
    type: 'phrase' as const,
    question: 'Which phrase is used to politely order coffee in a Spanish café?',
    options: ['Dame café ahora.', 'Quisiera un café, por favor.', 'Quiero café rápido.', 'El café es bueno.'],
    correct: 'Quisiera un café, por favor.',
    explanation: '"Quisiera un café, por favor" is the most polite and natural phrasing.'
  },
  {
    id: 'sq5',
    type: 'vocab' as const,
    question: 'What does "La cuenta, por favor" mean in a restaurant?',
    options: ['The menu, please', 'The check / bill, please', 'More water, please', 'The food is ready'],
    correct: 'The check / bill, please',
    explanation: '"La cuenta, por favor" means "The bill, please".'
  }
];

// Spanish A1 Core Verbs Trainer Data
export const SPANISH_A1_VERBS = [
  {
    id: 'ser',
    infinitive: 'Ser',
    translation: 'To Be (Identity, Origin, Traits)',
    thirdPerson: 'es',
    past: 'fue / era',
    type: 'irregular',
    tip: 'Essential Spanish verb! Used for permanent identity, professions, nationality, and telling time.',
    forms: [
      { pronoun: 'Yo', present: 'soy', negative: 'no soy', exampleEn: 'I am a student.', exampleEs: 'Yo soy estudiante.' },
      { pronoun: 'Tú', present: 'eres', negative: 'no eres', exampleEn: 'You are very kind.', exampleEs: 'Tú eres muy amable.' },
      { pronoun: 'Él / Ella / Usted', present: 'es', negative: 'no es', exampleEn: 'She is a doctor.', exampleEs: 'Ella es doctora.' },
      { pronoun: 'Nosotros', present: 'somos', negative: 'no somos', exampleEn: 'We are friends.', exampleEs: 'Nosotros somos amigos.' },
      { pronoun: 'Ellos / Ellas / Ustedes', present: 'son', negative: 'no son', exampleEn: 'They are from Spain.', exampleEs: 'Ellos son de España.' },
    ]
  },
  {
    id: 'estar',
    infinitive: 'Estar',
    translation: 'To Be (Locations, States, Emotions)',
    thirdPerson: 'está',
    past: 'estuvo / estaba',
    type: 'irregular',
    tip: 'Used for geographic locations, temporary conditions, and emotions (P.L.A.C.E.).',
    forms: [
      { pronoun: 'Yo', present: 'estoy', negative: 'no estoy', exampleEn: 'I am at home.', exampleEs: 'Estoy en casa.' },
      { pronoun: 'Tú', present: 'estás', negative: 'no estás', exampleEn: 'You are happy today.', exampleEs: 'Estás feliz hoy.' },
      { pronoun: 'Él / Ella / Usted', present: 'está', negative: 'no está', exampleEn: 'Where is the hotel?', exampleEs: '¿Dónde está el hotel?' },
      { pronoun: 'Nosotros', present: 'estamos', negative: 'no estamos', exampleEn: 'We are ready.', exampleEs: 'Estamos listos.' },
      { pronoun: 'Ellos / Ellas / Ustedes', present: 'están', negative: 'no están', exampleEn: 'They are tired.', exampleEs: 'Ellos están cansados.' },
    ]
  },
  {
    id: 'tener',
    infinitive: 'Tener',
    translation: 'To Have / Age',
    thirdPerson: 'tiene',
    past: 'tuvo / tenía',
    type: 'irregular',
    tip: 'Used for possession and age (Tengo 20 años = I am 20 years old).',
    forms: [
      { pronoun: 'Yo', present: 'tengo', negative: 'no tengo', exampleEn: 'I have a car.', exampleEs: 'Tengo un carro.' },
      { pronoun: 'Tú', present: 'tienes', negative: 'no tienes', exampleEn: 'How old are you?', exampleEs: '¿Cuántos años tienes?' },
      { pronoun: 'Él / Ella / Usted', present: 'tiene', negative: 'no tiene', exampleEn: 'He has a dog.', exampleEs: 'Él tiene un perro.' },
      { pronoun: 'Nosotros', present: 'tenemos', negative: 'no tenemos', exampleEn: 'We have time.', exampleEs: 'Tenemos tiempo.' },
      { pronoun: 'Ellos / Ellas / Ustedes', present: 'tienen', negative: 'no tienen', exampleEn: 'They have two children.', exampleEs: 'Tienen dos hijos.' },
    ]
  },
  {
    id: 'hablar',
    infinitive: 'Hablar',
    translation: 'To Speak / Talk',
    thirdPerson: 'habla',
    past: 'habló / hablaba',
    type: 'regular',
    tip: 'The model -AR regular verb in Spanish: -o, -as, -a, -amos, -an.',
    forms: [
      { pronoun: 'Yo', present: 'hablo', negative: 'no hablo', exampleEn: 'I speak Spanish.', exampleEs: 'Hablo español.' },
      { pronoun: 'Tú', present: 'hablas', negative: 'no hablas', exampleEn: 'Do you speak English?', exampleEs: '¿Hablas inglés?' },
      { pronoun: 'Él / Ella / Usted', present: 'habla', negative: 'no habla', exampleEn: 'She speaks French.', exampleEs: 'Ella habla francés.' },
      { pronoun: 'Nosotros', present: 'hablamos', negative: 'no hablamos', exampleEn: 'We speak together.', exampleEs: 'Hablamos juntos.' },
      { pronoun: 'Ellos / Ellas / Ustedes', present: 'hablan', negative: 'no hablan', exampleEn: 'They speak fast.', exampleEs: 'Ellos hablan rápido.' },
    ]
  },
  {
    id: 'querer',
    infinitive: 'Querer',
    translation: 'To Want / Love',
    thirdPerson: 'quiere',
    past: 'quiso / quería',
    type: 'irregular',
    tip: 'Stem-changing verb (e -> ie): quiero, quieres, quiere, queremos, quieren.',
    forms: [
      { pronoun: 'Yo', present: 'quiero', negative: 'no quiero', exampleEn: 'I want a coffee, please.', exampleEs: 'Quiero un café, por favor.' },
      { pronoun: 'Tú', present: 'quieres', negative: 'no quieres', exampleEn: 'Do you want to study?', exampleEs: '¿Quieres estudiar?' },
      { pronoun: 'Él / Ella / Usted', present: 'quiere', negative: 'no quiere', exampleEn: 'He wants to travel.', exampleEs: 'Él quiere viajar.' },
      { pronoun: 'Nosotros', present: 'queremos', negative: 'no queremos', exampleEn: 'We want to learn.', exampleEs: 'Queremos aprender.' },
      { pronoun: 'Ellos / Ellas / Ustedes', present: 'quieren', negative: 'no quieren', exampleEn: 'They want help.', exampleEs: 'Ellos quieren ayuda.' },
    ]
  },
  {
    id: 'poder',
    infinitive: 'Poder',
    translation: 'Can / To Be Able To',
    thirdPerson: 'puede',
    past: 'pudo / podía',
    type: 'irregular',
    tip: 'Stem-changing verb (o -> ue): puedo, puedes, puede, podemos, pueden. Followed by an infinitive.',
    forms: [
      { pronoun: 'Yo', present: 'puedo', negative: 'no puedo', exampleEn: 'I can speak Spanish!', exampleEs: '¡Puedo hablar español!' },
      { pronoun: 'Tú', present: 'puedes', negative: 'no puedes', exampleEn: 'Can you help me?', exampleEs: '¿Puedes ayudarme?' },
      { pronoun: 'Él / Ella / Usted', present: 'puede', negative: 'no puede', exampleEn: 'He can swim well.', exampleEs: 'Él puede nadar bien.' },
      { pronoun: 'Nosotros', present: 'podemos', negative: 'no podemos', exampleEn: 'We can go now.', exampleEs: 'Podemos ir ahora.' },
      { pronoun: 'Ellos / Ellas / Ustedes', present: 'pueden', negative: 'no pueden', exampleEn: 'They can understand.', exampleEs: 'Ellos pueden entender.' },
    ]
  }
];

export const SPANISH_VERB_PRACTICE_QUESTIONS = [
  {
    prompt: 'Complete: Ella _____ (tener) dos gatos.',
    options: ['tengo', 'tienes', 'tiene', 'tienen'],
    correct: 'tiene',
    explanation: 'With "Ella", the verb TENER is conjugated as "tiene".',
    verbName: 'Tener'
  },
  {
    prompt: 'Complete: Yo _____ (ser) estudiante de español.',
    options: ['es', 'eres', 'soy', 'somos'],
    correct: 'soy',
    explanation: 'With the pronoun "Yo", the verb SER is "soy".',
    verbName: 'Ser'
  },
  {
    prompt: 'Negative: Nosotros _____ (no / estar) cansados.',
    options: ['no estamos', 'no están', 'no soy', 'no somos'],
    correct: 'no estamos',
    explanation: 'Nosotros + no estamos is the correct 1st person plural of ESTAR.',
    verbName: 'Estar'
  },
  {
    prompt: 'Complete: ¿_____ (hablar / tú) inglés?',
    options: ['Hablas', 'Hablo', 'Habla', 'Hablan'],
    correct: 'Hablas',
    explanation: 'With the informal pronoun "tú", regular -AR verbs end in -as (hablas).',
    verbName: 'Hablar'
  },
  {
    prompt: 'Complete: Yo _____ (poder) ayudarte ahora.',
    options: ['puedo', 'podes', 'pudo', 'podemos'],
    correct: 'puedo',
    explanation: 'PODER has an o->ue change with "Yo": "Yo puedo".',
    verbName: 'Poder'
  }
];

