import { CEFRLevel } from '../types';

export interface VerbParadigmRow {
  pronoun: string;
  conjugated: string;
}

export interface ConjugationChallenge {
  id: string;
  level: CEFRLevel;
  category: 'affirmative' | 'negative-question' | 'past-perfect' | 'advanced-mood';
  subjectCard: string;
  verbCard: string;
  tenseCard: string;
  sentenceTemplate: string; // Uses _____ for the blank
  fullSentence: string;
  translation: string;
  correctAnswer: string;
  options: string[];
  ruleExplanation: string;
  paradigmTitle: string;
  paradigmRows: VerbParadigmRow[];
  isRetry?: boolean;
}

// ============================================================================
// COURSE 1: SPANISH SPEAKERS LEARNING ENGLISH (48 CARDS: 12 PER LEVEL A1-B2)
// ============================================================================
export const ENGLISH_CONJUGATION_CHALLENGES: ConjugationChallenge[] = [
  // --------------------------------------------------------------------------
  // LEVEL A1 (12 CARDS)
  // --------------------------------------------------------------------------
  {
    id: 'en_conj_a1_1',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'SHE (Ella)',
    verbCard: 'TO WORK (Trabajar)',
    tenseCard: 'Present Simple · Afirmativo (+)',
    sentenceTemplate: 'She _____ in an international bank every day.',
    fullSentence: 'She works in an international bank every day.',
    translation: 'Ella trabaja en un banco internacional todos los días.',
    correctAnswer: 'works',
    options: ['works', 'work', 'working', 'worked'],
    ruleExplanation: 'En Present Simple afirmativo, con He / She / It agregamos -s al verbo base (work → works).',
    paradigmTitle: 'Present Simple: TO WORK',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'work' },
      { pronoun: 'He / She / It', conjugated: 'works' },
      { pronoun: 'We / They', conjugated: 'work' }
    ]
  },
  {
    id: 'en_conj_a1_2',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'THEY (Ellos)',
    verbCard: 'TO BE (Ser / Estar)',
    tenseCard: 'Presente · Verbo To Be (+)',
    sentenceTemplate: 'They _____ very excited about the new project.',
    fullSentence: 'They are very excited about the new project.',
    translation: 'Ellos están muy emocionados por el nuevo proyecto.',
    correctAnswer: 'are',
    options: ['are', 'is', 'am', 'be'],
    ruleExplanation: 'Para You / We / They siempre usamos "are" en el presente del verbo To Be.',
    paradigmTitle: 'Present Simple: TO BE',
    paradigmRows: [
      { pronoun: 'I', conjugated: 'am' },
      { pronoun: 'He / She / It', conjugated: 'is' },
      { pronoun: 'You / We / They', conjugated: 'are' }
    ]
  },
  {
    id: 'en_conj_a1_3',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'HE (Él)',
    verbCard: 'TO HAVE (Tener)',
    tenseCard: 'Present Simple · Negativo (-)',
    sentenceTemplate: 'He _____ time for a meeting this morning.',
    fullSentence: "He doesn't have time for a meeting this morning.",
    translation: 'Él no tiene tiempo para una reunión esta mañana.',
    correctAnswer: "doesn't have",
    options: ["doesn't have", "don't have", "doesn't has", "isn't have"],
    ruleExplanation: 'Con He/She/It usamos el auxiliar "doesn\'t" + el verbo en forma base ("have", nunca "has").',
    paradigmTitle: 'Present Simple Negative: TO HAVE',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: "don't have" },
      { pronoun: 'He / She / It', conjugated: "doesn't have" },
      { pronoun: 'We / They', conjugated: "don't have" }
    ]
  },
  {
    id: 'en_conj_a1_4',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'YOU (Tú)',
    verbCard: 'TO LIVE (Vivir)',
    tenseCard: 'Present Simple · Pregunta (?)',
    sentenceTemplate: 'Where _____ you live right now?',
    fullSentence: 'Where do you live right now?',
    translation: '¿Dónde vives ahora mismo?',
    correctAnswer: 'do',
    options: ['do', 'does', 'are', 'is'],
    ruleExplanation: 'Para preguntas en Present Simple con I / You / We / They usamos el auxiliar "do" antes del sujeto.',
    paradigmTitle: 'Present Simple Questions: TO LIVE',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'Do I/you live...?' },
      { pronoun: 'He / She / It', conjugated: 'Does he/she live...?' },
      { pronoun: 'We / They', conjugated: 'Do we/they live...?' }
    ]
  },
  {
    id: 'en_conj_a1_5',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'HE (Él)',
    verbCard: 'TO STUDY (Estudiar)',
    tenseCard: 'Present Simple · Regla -IES (+)',
    sentenceTemplate: 'He _____ English every evening after dinner.',
    fullSentence: 'He studies English every evening after dinner.',
    translation: 'Él estudia inglés todas las noches después de cenar.',
    correctAnswer: 'studies',
    options: ['studies', 'studys', 'study', 'studying'],
    ruleExplanation: 'Si el verbo termina en consonante + Y (study), con He/She/It cambiamos la Y por -IES (studies).',
    paradigmTitle: 'Present Simple (-Y → -IES): TO STUDY',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'study' },
      { pronoun: 'He / She / It', conjugated: 'studies' },
      { pronoun: 'We / They', conjugated: 'study' }
    ]
  },
  {
    id: 'en_conj_a1_6',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'WE (Nosotros)',
    verbCard: 'TO WATCH (Ver / Mirar)',
    tenseCard: 'Present Continuous · Ahora mismo',
    sentenceTemplate: 'Right now, we _____ a documentary in English.',
    fullSentence: 'Right now, we are watching a documentary in English.',
    translation: 'Ahora mismo estamos viendo un documental en inglés.',
    correctAnswer: 'are watching',
    options: ['are watching', 'watch', 'is watching', 'watching'],
    ruleExplanation: 'Para acciones que ocurren en este preciso momento ("Right now") usamos am / is / are + verbo-ing.',
    paradigmTitle: 'Present Continuous: TO WATCH',
    paradigmRows: [
      { pronoun: 'I', conjugated: 'am watching' },
      { pronoun: 'He / She / It', conjugated: 'is watching' },
      { pronoun: 'You / We / They', conjugated: 'are watching' }
    ]
  },
  {
    id: 'en_conj_a1_7',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'SHE (Ella)',
    verbCard: 'TO SPEAK (Hablar)',
    tenseCard: 'Present Simple · Pregunta 3ª Persona (?)',
    sentenceTemplate: '_____ she speak German at the office?',
    fullSentence: 'Does she speak German at the office?',
    translation: '¿Habla ella alemán en la oficina?',
    correctAnswer: 'Does',
    options: ['Does', 'Do', 'Is', 'Has'],
    ruleExplanation: 'En preguntas de Present Simple con He / She / It abrimos con "Does" y el verbo queda en forma base (speak).',
    paradigmTitle: 'Questions: TO SPEAK',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'Do you speak...?' },
      { pronoun: 'He / She / It', conjugated: 'Does she speak...?' },
      { pronoun: 'We / They', conjugated: 'Do they speak...?' }
    ]
  },
  {
    id: 'en_conj_a1_8',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'MY BROTHER (Mi hermano = He)',
    verbCard: 'TO GO (Ir)',
    tenseCard: 'Present Simple · Regla -ES (+)',
    sentenceTemplate: 'My brother _____ to the gym three times a week.',
    fullSentence: 'My brother goes to the gym three times a week.',
    translation: 'Mi hermano va al gimnasio tres veces por semana.',
    correctAnswer: 'goes',
    options: ['goes', 'gos', 'go', 'going'],
    ruleExplanation: 'Los verbos terminados en -o, -ch, -sh, -ss, -x agregan -ES en tercera persona singular (go → goes).',
    paradigmTitle: 'Present Simple: TO GO',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'go' },
      { pronoun: 'He / She / It', conjugated: 'goes' },
      { pronoun: 'We / They', conjugated: 'go' }
    ]
  },
  {
    id: 'en_conj_a1_9',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'I (Yo)',
    verbCard: 'TO BE (Estar)',
    tenseCard: 'Presente · To Be Negativo (-)',
    sentenceTemplate: 'I _____ late for class today; I arrived ten minutes early.',
    fullSentence: 'I am not late for class today; I arrived ten minutes early.',
    translation: 'Hoy no llego tarde a clase; llegué diez minutos temprano.',
    correctAnswer: 'am not',
    options: ['am not', "don't be", "isn't", "aren't"],
    ruleExplanation: 'El verbo To Be se niega por sí mismo: para "I" siempre usamos "I am not" (nunca "don\'t be").',
    paradigmTitle: 'Present Negative: TO BE',
    paradigmRows: [
      { pronoun: 'I', conjugated: 'am not' },
      { pronoun: 'He / She / It', conjugated: "isn't (is not)" },
      { pronoun: 'You / We / They', conjugated: "aren't (are not)" }
    ]
  },
  {
    id: 'en_conj_a1_10',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'SHE (Ella)',
    verbCard: 'CAN + DRIVE (Poder conducir)',
    tenseCard: 'Modal de Habilidad · Can (+)',
    sentenceTemplate: 'She _____ a manual car very well.',
    fullSentence: 'She can drive a manual car very well.',
    translation: 'Ella sabe conducir un auto manual muy bien.',
    correctAnswer: 'can drive',
    options: ['can drive', 'cans drive', 'can drives', 'can to drive'],
    ruleExplanation: 'El modal "can" nunca lleva -s ni "to": siempre va seguido del verbo en su forma base ("can drive").',
    paradigmTitle: 'Modal Ability: CAN + DRIVE',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'can drive' },
      { pronoun: 'He / She / It', conjugated: 'can drive' },
      { pronoun: 'We / They', conjugated: 'can drive' }
    ]
  },
  {
    id: 'en_conj_a1_11',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'THERE (Hay - Plural)',
    verbCard: 'THERE IS / THERE ARE (Haber)',
    tenseCard: 'Existencia · Plural (+)',
    sentenceTemplate: 'There _____ two pharmacies near the hotel.',
    fullSentence: 'There are two pharmacies near the hotel.',
    translation: 'Hay dos farmacias cerca del hotel.',
    correctAnswer: 'are',
    options: ['are', 'is', 'have', 'has'],
    ruleExplanation: 'Para decir "hay" en plural ("two pharmacies") usamos "There are" (nunca "There have").',
    paradigmTitle: 'Existence: THERE BE',
    paradigmRows: [
      { pronoun: 'Singular (1 item)', conjugated: 'There is' },
      { pronoun: 'Plural (2+ items)', conjugated: 'There are' },
      { pronoun: 'Negative Plural', conjugated: "There aren't" }
    ]
  },
  {
    id: 'en_conj_a1_12',
    level: 'A1',
    category: 'negative-question',
    subjectCard: 'THEY (Ellos)',
    verbCard: 'TO WORK (Trabajar)',
    tenseCard: 'Present Continuous · Pregunta (?)',
    sentenceTemplate: '_____ they working from home today?',
    fullSentence: 'Are they working from home today?',
    translation: '¿Están ellos trabajando desde casa hoy?',
    correctAnswer: 'Are',
    options: ['Are', 'Do', 'Is', 'Have'],
    ruleExplanation: 'Cuando el verbo principal termina en -ing (working), la pregunta se forma invirtiendo el verbo To Be ("Are they working...?").',
    paradigmTitle: 'Present Continuous Questions',
    paradigmRows: [
      { pronoun: 'I', conjugated: 'Am I working...?' },
      { pronoun: 'He / She / It', conjugated: 'Is she working...?' },
      { pronoun: 'You / We / They', conjugated: 'Are they working...?' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL A2 (12 CARDS)
  // --------------------------------------------------------------------------
  {
    id: 'en_conj_a2_1',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'WE (Nosotros)',
    verbCard: 'TO GO (Ir)',
    tenseCard: 'Past Simple · Ayer (+)',
    sentenceTemplate: 'Yesterday we _____ to the airport very early.',
    fullSentence: 'Yesterday we went to the airport very early.',
    translation: 'Ayer fuimos al aeropuerto muy temprano.',
    correctAnswer: 'went',
    options: ['went', 'goed', 'gone', 'were go'],
    ruleExplanation: '"Go" es un verbo irregular: su pasado simple afirmativo para todos los sujetos es "went".',
    paradigmTitle: 'Past Simple: TO GO',
    paradigmRows: [
      { pronoun: 'I / You', conjugated: 'went' },
      { pronoun: 'He / She / It', conjugated: 'went' },
      { pronoun: 'We / They', conjugated: 'went' }
    ]
  },
  {
    id: 'en_conj_a2_2',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'I (Yo)',
    verbCard: 'TO COOK (Cocinar)',
    tenseCard: 'Past Continuous · Acción en progreso',
    sentenceTemplate: 'I _____ dinner when the phone rang.',
    fullSentence: 'I was cooking dinner when the phone rang.',
    translation: 'Yo estaba cocinando la cena cuando sonó el teléfono.',
    correctAnswer: 'was cooking',
    options: ['was cooking', 'were cooking', 'cooked', 'am cooking'],
    ruleExplanation: 'El Past Continuous para una acción en progreso interrumpida con "I / He / She / It" se forma con "was" + verbo-ing.',
    paradigmTitle: 'Past Continuous: TO COOK',
    paradigmRows: [
      { pronoun: 'I / He / She / It', conjugated: 'was cooking' },
      { pronoun: 'You / We / They', conjugated: 'were cooking' }
    ]
  },
  {
    id: 'en_conj_a2_3',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'SHE (Ella)',
    verbCard: 'TO VISIT (Visitar)',
    tenseCard: 'Present Perfect · Experiencia (+)',
    sentenceTemplate: 'She _____ London three times so far.',
    fullSentence: 'She has visited London three times so far.',
    translation: 'Ella ha visitado Londres tres veces hasta ahora.',
    correctAnswer: 'has visited',
    options: ['has visited', 'have visited', 'visited', 'is visiting'],
    ruleExplanation: 'Para experiencias hasta el presente con She/He/It usamos "has" + participio pasado (visited).',
    paradigmTitle: 'Present Perfect: TO VISIT',
    paradigmRows: [
      { pronoun: 'I / You / We / They', conjugated: 'have visited' },
      { pronoun: 'He / She / It', conjugated: 'has visited' }
    ]
  },
  {
    id: 'en_conj_a2_4',
    level: 'A2',
    category: 'negative-question',
    subjectCard: 'THEY (Ellos)',
    verbCard: 'TO BUY (Comprar)',
    tenseCard: 'Past Simple · Negativo (-)',
    sentenceTemplate: 'They _____ the tickets yesterday because it was late.',
    fullSentence: "They didn't buy the tickets yesterday because it was late.",
    translation: 'Ellos no compraron los boletos ayer porque era tarde.',
    correctAnswer: "didn't buy",
    options: ["didn't buy", "didn't bought", "don't bought", "weren't buy"],
    ruleExplanation: 'Después de "didn\'t" el verbo siempre vuelve a su forma base ("buy", nunca "bought").',
    paradigmTitle: 'Past Simple Negative: TO BUY',
    paradigmRows: [
      { pronoun: 'Affirmative (+)', conjugated: 'bought' },
      { pronoun: 'Negative (-)', conjugated: "didn't buy" },
      { pronoun: 'Question (?)', conjugated: 'Did they buy...?' }
    ]
  },
  {
    id: 'en_conj_a2_5',
    level: 'A2',
    category: 'negative-question',
    subjectCard: 'YOU (Tú / Ustedes)',
    verbCard: 'TO SEE (Ver)',
    tenseCard: 'Past Simple · Pregunta (?)',
    sentenceTemplate: '_____ you see the message I sent last night?',
    fullSentence: 'Did you see the message I sent last night?',
    translation: '¿Viste el mensaje que envié anoche?',
    correctAnswer: 'Did',
    options: ['Did', 'Do', 'Were', 'Have'],
    ruleExplanation: 'Con una referencia de tiempo pasado cerrado ("last night") abrimos la pregunta con "Did" + sujeto + verbo base.',
    paradigmTitle: 'Past Simple Questions: TO SEE',
    paradigmRows: [
      { pronoun: 'Affirmative (+)', conjugated: 'saw' },
      { pronoun: 'Negative (-)', conjugated: "didn't see" },
      { pronoun: 'Question (?)', conjugated: 'Did you see...?' }
    ]
  },
  {
    id: 'en_conj_a2_6',
    level: 'A2',
    category: 'affirmative',
    subjectCard: 'WE (Nosotros)',
    verbCard: 'TO TRAVEL (Viajar)',
    tenseCard: 'Futuro con Plan · Going to (+)',
    sentenceTemplate: 'Next month, we _____ to Rome for a conference.',
    fullSentence: 'Next month, we are going to travel to Rome for a conference.',
    translation: 'El próximo mes vamos a viajar a Roma para una conferencia.',
    correctAnswer: 'are going to travel',
    options: ['are going to travel', 'going to travel', 'is going to travel', 'will to travel'],
    ruleExplanation: 'Para planes futuros ya decididos usamos am / is / are + going to + verbo base.',
    paradigmTitle: 'Future Plans: BE GOING TO',
    paradigmRows: [
      { pronoun: 'I', conjugated: 'am going to travel' },
      { pronoun: 'He / She / It', conjugated: 'is going to travel' },
      { pronoun: 'You / We / They', conjugated: 'are going to travel' }
    ]
  },
  {
    id: 'en_conj_a2_7',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'I (Yo)',
    verbCard: 'TO FINISH (Terminar)',
    tenseCard: 'Present Perfect · Negativo con YET (-)',
    sentenceTemplate: 'I _____ reading the contract yet.',
    fullSentence: "I haven't finished reading the contract yet.",
    translation: 'Todavía no he terminado de leer el contrato.',
    correctAnswer: "haven't finished",
    options: ["haven't finished", "didn't finished", "hasn't finished", "don't finish"],
    ruleExplanation: 'Con "yet" al final de una oración negativa usamos Present Perfect ("haven\'t / hasn\'t + participio").',
    paradigmTitle: 'Present Perfect Negative',
    paradigmRows: [
      { pronoun: 'I / You / We / They', conjugated: "haven't finished" },
      { pronoun: 'He / She / It', conjugated: "hasn't finished" }
    ]
  },
  {
    id: 'en_conj_a2_8',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'THEY (Ellos)',
    verbCard: 'TO BE (Estar)',
    tenseCard: 'Past Simple · Verbo To Be (+)',
    sentenceTemplate: 'They _____ at the office yesterday afternoon.',
    fullSentence: 'They were at the office yesterday afternoon.',
    translation: 'Ellos estuvieron en la oficina ayer por la tarde.',
    correctAnswer: 'were',
    options: ['were', 'was', 'are', 'did be'],
    ruleExplanation: 'En pasado simple del verbo To Be usamos "was" para I/He/She/It y "were" para You/We/They.',
    paradigmTitle: 'Past Simple: TO BE',
    paradigmRows: [
      { pronoun: 'I / He / She / It', conjugated: 'was' },
      { pronoun: 'You / We / They', conjugated: 'were' }
    ]
  },
  {
    id: 'en_conj_a2_9',
    level: 'A2',
    category: 'affirmative',
    subjectCard: 'IF IT RAINS (Si llueve...)',
    verbCard: 'TO STAY (Quedarse)',
    tenseCard: 'First Conditional · Futuro Real',
    sentenceTemplate: 'If it rains tomorrow, we _____ at the hotel.',
    fullSentence: 'If it rains tomorrow, we will stay at the hotel.',
    translation: 'Si llueve mañana, nos quedaremos en el hotel.',
    correctAnswer: 'will stay',
    options: ['will stay', 'stay', 'would stay', 'stayed'],
    ruleExplanation: 'En el First Conditional (situación futura real), la cláusula con "If" va en presente y el resultado lleva "will + verbo base".',
    paradigmTitle: 'First Conditional Result: WILL + VERB',
    paradigmRows: [
      { pronoun: 'If + Present Simple', conjugated: 'If it rains...' },
      { pronoun: 'Result Clause (+)', conjugated: 'we will stay' },
      { pronoun: 'Result Clause (-)', conjugated: "we won't stay" }
    ]
  },
  {
    id: 'en_conj_a2_10',
    level: 'A2',
    category: 'affirmative',
    subjectCard: 'YOU (Tú)',
    verbCard: 'HAVE TO + WEAR (Tener que usar)',
    tenseCard: 'Obligación · Have to (+)',
    sentenceTemplate: 'You _____ a security badge inside the building.',
    fullSentence: 'You have to wear a security badge inside the building.',
    translation: 'Tienes que llevar una credencial de seguridad dentro del edificio.',
    correctAnswer: 'have to wear',
    options: ['have to wear', 'has to wear', 'must to wear', 'having to wear'],
    ruleExplanation: 'Para reglas u obligaciones externas con I/You/We/They usamos "have to + verbo base" (y nunca "must to").',
    paradigmTitle: 'External Obligation: HAVE TO',
    paradigmRows: [
      { pronoun: 'I / You / We / They', conjugated: 'have to wear' },
      { pronoun: 'He / She / It', conjugated: 'has to wear' },
      { pronoun: 'Past Obligation', conjugated: 'had to wear' }
    ]
  },
  {
    id: 'en_conj_a2_11',
    level: 'A2',
    category: 'negative-question',
    subjectCard: 'YOU (Tú)',
    verbCard: 'TO EAT (Comer)',
    tenseCard: 'Present Perfect · Pregunta con EVER (?)',
    sentenceTemplate: '_____ you ever eaten authentic Japanese ramen?',
    fullSentence: 'Have you ever eaten authentic Japanese ramen?',
    translation: '¿Alguna vez has comido auténtico ramen japonés?',
    correctAnswer: 'Have',
    options: ['Have', 'Did', 'Has', 'Are'],
    ruleExplanation: 'Las preguntas de experiencia de vida con "ever" + participio pasado ("eaten") abren con "Have / Has".',
    paradigmTitle: 'Present Perfect Experience: TO EAT',
    paradigmRows: [
      { pronoun: 'Base / Past Simple', conjugated: 'eat / ate' },
      { pronoun: 'Past Participle', conjugated: 'eaten' },
      { pronoun: 'Experience Question', conjugated: 'Have you ever eaten...?' }
    ]
  },
  {
    id: 'en_conj_a2_12',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'HE (Él)',
    verbCard: 'TO LOSE (Perder)',
    tenseCard: 'Past Simple · Verbo Irregular (+)',
    sentenceTemplate: 'He _____ his keys at the shopping mall last Saturday.',
    fullSentence: 'He lost his keys at the shopping mall last Saturday.',
    translation: 'Él perdió sus llaves en el centro comercial el sábado pasado.',
    correctAnswer: 'lost',
    options: ['lost', 'losed', 'lose', 'has lost'],
    ruleExplanation: 'Con una fecha pasada específica ("last Saturday") usamos Past Simple: el pasado irregular de "lose" es "lost".',
    paradigmTitle: 'Irregular Verb: TO LOSE',
    paradigmRows: [
      { pronoun: 'Present Base', conjugated: 'lose / loses' },
      { pronoun: 'Past Simple', conjugated: 'lost' },
      { pronoun: 'Present Perfect', conjugated: 'have / has lost' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL B1 (12 CARDS)
  // --------------------------------------------------------------------------
  {
    id: 'en_conj_b1_1',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'IF I (Si yo...)',
    verbCard: 'TO HAVE (Tener)',
    tenseCard: 'Second Conditional · Hipotético',
    sentenceTemplate: 'If I _____ more free time, I would learn another language.',
    fullSentence: 'If I had more free time, I would learn another language.',
    translation: 'Si yo tuviera más tiempo libre, aprendería otro idioma.',
    correctAnswer: 'had',
    options: ['had', 'would have', 'have', 'having'],
    ruleExplanation: 'En el Second Conditional (situación hipotética presente), la cláusula con "If" lleva Past Simple ("had").',
    paradigmTitle: 'Second Conditional Structure',
    paradigmRows: [
      { pronoun: 'If-Clause (Condition)', conjugated: 'If I/she/we had...' },
      { pronoun: 'Result Clause', conjugated: 'I would learn...' },
      { pronoun: 'With TO BE', conjugated: 'If I were you...' }
    ]
  },
  {
    id: 'en_conj_b1_2',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'THE REPORT (El informe)',
    verbCard: 'TO WRITE (Escribir)',
    tenseCard: 'Passive Voice · Past Simple',
    sentenceTemplate: 'The financial report _____ by the director yesterday.',
    fullSentence: 'The financial report was written by the director yesterday.',
    translation: 'El informe financiero fue escrito por la directora ayer.',
    correctAnswer: 'was written',
    options: ['was written', 'wrote', 'is wrote', 'has wrote'],
    ruleExplanation: 'La voz pasiva en pasado singular se construye con "was" + participio pasado ("written").',
    paradigmTitle: 'Passive Voice: TO WRITE',
    paradigmRows: [
      { pronoun: 'Present Passive', conjugated: 'is / are written' },
      { pronoun: 'Past Passive', conjugated: 'was / were written' },
      { pronoun: 'Present Perfect Passive', conjugated: 'has / have been written' }
    ]
  },
  {
    id: 'en_conj_b1_3',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'WE (Nosotros)',
    verbCard: 'TO WAIT (Esperar)',
    tenseCard: 'Present Perfect Continuous',
    sentenceTemplate: 'We _____ for the bus for over forty minutes.',
    fullSentence: 'We have been waiting for the bus for over forty minutes.',
    translation: 'Llevamos esperando el autobús más de cuarenta minutos.',
    correctAnswer: 'have been waiting',
    options: ['have been waiting', 'are waiting', 'waited', 'had waiting'],
    ruleExplanation: 'Para enfatizar cuánto tiempo lleva ocurriendo una acción desde el pasado hasta ahora usamos "have/has been + verbo-ing".',
    paradigmTitle: 'Present Perfect Continuous: TO WAIT',
    paradigmRows: [
      { pronoun: 'I / You / We / They', conjugated: 'have been waiting' },
      { pronoun: 'He / She / It', conjugated: 'has been waiting' }
    ]
  },
  {
    id: 'en_conj_b1_4',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'HE (Él)',
    verbCard: 'TO SMOKE (Fumar)',
    tenseCard: 'Hábito Pasado · Used to',
    sentenceTemplate: 'He _____ a lot, but he quit five years ago.',
    fullSentence: 'He used to smoke a lot, but he quit five years ago.',
    translation: 'Él solía fumar mucho, pero lo dejó hace cinco años.',
    correctAnswer: 'used to smoke',
    options: ['used to smoke', 'use to smoked', 'was used to smoke', 'uses to smoke'],
    ruleExplanation: 'Para hábitos o estados del pasado que ya no ocurren usamos "used to + verbo base".',
    paradigmTitle: 'Past Habits: USED TO',
    paradigmRows: [
      { pronoun: 'Affirmative (+)', conjugated: 'used to smoke' },
      { pronoun: 'Negative (-)', conjugated: "didn't use to smoke" },
      { pronoun: 'Question (?)', conjugated: 'Did he use to smoke...?' }
    ]
  },
  {
    id: 'en_conj_b1_5',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'THE TRAIN (El tren)',
    verbCard: 'TO LEAVE (Salir / Partir)',
    tenseCard: 'Past Perfect · Pasado Anterior',
    sentenceTemplate: 'When we arrived at the station, the train _____ already.',
    fullSentence: 'When we arrived at the station, the train had left already.',
    translation: 'Cuando llegamos a la estación, el tren ya había partido.',
    correctAnswer: 'had left',
    options: ['had left', 'has left', 'left', 'was leaving'],
    ruleExplanation: 'Para una acción que ocurrió ANTES de otro evento en el pasado ("arrived"), usamos Past Perfect ("had + participio").',
    paradigmTitle: 'Past Perfect: TO LEAVE',
    paradigmRows: [
      { pronoun: 'All Subjects (I/She/They)', conjugated: 'had left' },
      { pronoun: 'Negative (-)', conjugated: "hadn't left" },
      { pronoun: 'Question (?)', conjugated: 'Had the train left...?' }
    ]
  },
  {
    id: 'en_conj_b1_6',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'SHE SAID THAT (Estilo Indirecto)',
    verbCard: 'TO BE (Estar - Reported Speech)',
    tenseCard: 'Reported Speech · Backshift',
    sentenceTemplate: 'She told me that she _____ working on the proposal.',
    fullSentence: 'She told me that she was working on the proposal.',
    translation: 'Ella me dijo que estaba trabajando en la propuesta.',
    correctAnswer: 'was',
    options: ['was', 'is', 'has been', 'will be'],
    ruleExplanation: 'En Reported Speech, cuando el verbo introductor está en pasado ("She told me"), el Present Continuous retrocede a Past Continuous ("was working").',
    paradigmTitle: 'Reported Speech Tense Shift',
    paradigmRows: [
      { pronoun: 'Direct: "I am working"', conjugated: 'Reported: she was working' },
      { pronoun: 'Direct: "I worked"', conjugated: 'Reported: she had worked' },
      { pronoun: 'Direct: "I will work"', conjugated: 'Reported: she would work' }
    ]
  },
  {
    id: 'en_conj_b1_7',
    level: 'B1',
    category: 'affirmative',
    subjectCard: 'SHE (Ella)',
    verbCard: 'AVOID + SPEAK (Evitar hablar)',
    tenseCard: 'Verbo + Gerundio (-ING)',
    sentenceTemplate: 'She always avoids _____ about politics at work.',
    fullSentence: 'She always avoids speaking about politics at work.',
    translation: 'Ella siempre evita hablar de política en el trabajo.',
    correctAnswer: 'speaking',
    options: ['speaking', 'to speak', 'speak', 'spoken'],
    ruleExplanation: 'Verbos como avoid, enjoy, finish, mind y suggest siempre van seguidos de gerundio (-ing), nunca de infinitivo con "to".',
    paradigmTitle: 'Verb Patterns: Gerund vs Infinitive',
    paradigmRows: [
      { pronoun: 'avoid / enjoy / finish', conjugated: '+ speaking (-ING)' },
      { pronoun: 'decide / hope / promise', conjugated: '+ to speak (TO + INF)' }
    ]
  },
  {
    id: 'en_conj_b1_8',
    level: 'B1',
    category: 'affirmative',
    subjectCard: 'THEY (Ellos)',
    verbCard: 'DECIDE + MOVE (Decidir mudarse)',
    tenseCard: 'Verbo + Infinitivo (TO + Verbo)',
    sentenceTemplate: 'They finally decided _____ to a bigger office.',
    fullSentence: 'They finally decided to move to a bigger office.',
    translation: 'Ellos finalmente decidieron mudarse a una oficina más grande.',
    correctAnswer: 'to move',
    options: ['to move', 'moving', 'move', 'for moving'],
    ruleExplanation: 'Después de verbos como decide, plan, hope, offer y agree usamos el infinitivo con "to" ("decided to move").',
    paradigmTitle: 'Verbs followed by TO + Infinitive',
    paradigmRows: [
      { pronoun: 'decide / plan / hope', conjugated: '+ to move' },
      { pronoun: 'Negative Infinitive', conjugated: 'decided not to move' }
    ]
  },
  {
    id: 'en_conj_b1_9',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'I (Yo)',
    verbCard: 'BE USED TO + WAKE UP',
    tenseCard: 'Estar acostumbrado a (+ -ING)',
    sentenceTemplate: 'I am used to _____ up at six in the morning.',
    fullSentence: 'I am used to waking up at six in the morning.',
    translation: 'Estoy acostumbrado a despertarme a las seis de la mañana.',
    correctAnswer: 'waking',
    options: ['waking', 'wake', 'woke', 'be waking'],
    ruleExplanation: 'En la estructura "be used to" (estar acostumbrado a), "to" es una preposición y por eso el verbo siguiente va en -ING ("waking").',
    paradigmTitle: 'USED TO vs BE USED TO',
    paradigmRows: [
      { pronoun: 'I used to wake up', conjugated: 'Solía despertarme (pasado)' },
      { pronoun: 'I am used to waking up', conjugated: 'Estoy acostumbrado a despertarme' },
      { pronoun: 'I got used to waking up', conjugated: 'Me acostumbré a despertarme' }
    ]
  },
  {
    id: 'en_conj_b1_10',
    level: 'B1',
    category: 'negative-question',
    subjectCard: 'YOU (Question Tag)',
    verbCard: 'HAVE FINISHED (Present Perfect)',
    tenseCard: 'Question Tag · Confirmación (?)',
    sentenceTemplate: 'You have finished the presentation, _____?',
    fullSentence: "You have finished the presentation, haven't you?",
    translation: 'Has terminado la presentación, ¿verdad?',
    correctAnswer: "haven't you",
    options: ["haven't you", "don't you", "didn't you", "aren't you"],
    ruleExplanation: 'El Question Tag repite el mismo auxiliar de la oración principal en sentido opuesto: "You have finished... → haven\'t you?".',
    paradigmTitle: 'Question Tags Rule',
    paradigmRows: [
      { pronoun: 'You have finished (+)', conjugated: "haven't you? (-)" },
      { pronoun: 'She works here (+)', conjugated: "doesn't she? (-)" },
      { pronoun: "They didn't go (-)", conjugated: 'did they? (+)' }
    ]
  },
  {
    id: 'en_conj_b1_11',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'NEW PRODUCTS (Plural)',
    verbCard: 'TO DEVELOP (Desarrollar)',
    tenseCard: 'Passive Voice · Present Continuous',
    sentenceTemplate: 'Two new software products _____ right now.',
    fullSentence: 'Two new software products are being developed right now.',
    translation: 'Dos nuevos productos de software están siendo desarrollados ahora mismo.',
    correctAnswer: 'are being developed',
    options: ['are being developed', 'are developing', 'have developed', 'were being developed'],
    ruleExplanation: 'La voz pasiva en Present Continuous se forma con "am / is / are + being + participio pasado".',
    paradigmTitle: 'Continuous Passive Voice',
    paradigmRows: [
      { pronoun: 'Singular (It)', conjugated: 'is being developed' },
      { pronoun: 'Plural (They)', conjugated: 'are being developed' },
      { pronoun: 'Past Continuous Passive', conjugated: 'were being developed' }
    ]
  },
  {
    id: 'en_conj_b1_12',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'YOU (Consejo Fuerte)',
    verbCard: 'HAD BETTER + LEAVE',
    tenseCard: 'Advertencia · Had better (+)',
    sentenceTemplate: 'You _____ now, or you will miss the last flight.',
    fullSentence: 'You had better leave now, or you will miss the last flight.',
    translation: 'Más vale que salgas ahora, o perderás el último vuelo.',
    correctAnswer: 'had better leave',
    options: ['had better leave', 'had better to leave', 'have better leave', 'would better leaving'],
    ruleExplanation: '"Had better" ("más vale que...") expresa una advertencia urgente en el presente y va seguido del verbo base sin "to".',
    paradigmTitle: 'Urgent Advice: HAD BETTER',
    paradigmRows: [
      { pronoun: 'Affirmative (+)', conjugated: "You'd better leave" },
      { pronoun: 'Negative (-)', conjugated: "You'd better not be late" }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL B2 (12 CARDS)
  // --------------------------------------------------------------------------
  {
    id: 'en_conj_b2_1',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'IF SHE (Si ella hubiera...)',
    verbCard: 'TO KNOW (Saber)',
    tenseCard: 'Third Conditional · Pasado Irreal',
    sentenceTemplate: 'If she _____ about the traffic, she would have left earlier.',
    fullSentence: 'If she had known about the traffic, she would have left earlier.',
    translation: 'Si ella hubiera sabido del tráfico, habría salido más temprano.',
    correctAnswer: 'had known',
    options: ['had known', 'would have known', 'knew', 'has known'],
    ruleExplanation: 'En el Third Conditional (pasado irreal), la condición con "If" requiere Past Perfect ("had + participio").',
    paradigmTitle: 'Third Conditional (Past Counterfactual)',
    paradigmRows: [
      { pronoun: 'If-Clause (Past Perfect)', conjugated: 'If she had known...' },
      { pronoun: 'Result Clause', conjugated: 'she would have left' },
      { pronoun: 'Formal Inversion', conjugated: 'Had she known...' }
    ]
  },
  {
    id: 'en_conj_b2_2',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'HE (Él)',
    verbCard: 'TO FORGET (Olvidar)',
    tenseCard: 'Past Modal Deduction · Certeza',
    sentenceTemplate: 'He isn’t here yet; he _____ about our appointment.',
    fullSentence: 'He isn’t here yet; he must have forgotten about our appointment.',
    translation: 'Él aún no está aquí; debe haberse olvidado de nuestra cita.',
    correctAnswer: 'must have forgotten',
    options: ['must have forgotten', 'must forgot', 'should forget', 'can have forgotten'],
    ruleExplanation: 'Para deducir con alta certeza algo que ocurrió en el pasado usamos "must have + participio pasado".',
    paradigmTitle: 'Past Modals of Deduction',
    paradigmRows: [
      { pronoun: '95% Certainty (+)', conjugated: 'must have forgotten' },
      { pronoun: '50% Possibility', conjugated: 'might / could have forgotten' },
      { pronoun: '95% Impossibility (-)', conjugated: "can't have forgotten" }
    ]
  },
  {
    id: 'en_conj_b2_3',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'SELDOM (Rara vez - Inversión)',
    verbCard: 'TO SEE (Ver)',
    tenseCard: 'Inversión Estilística Formal',
    sentenceTemplate: 'Seldom _____ such a well-organized presentation.',
    fullSentence: 'Seldom have I seen such a well-organized presentation.',
    translation: 'Rara vez he visto una presentación tan bien organizada.',
    correctAnswer: 'have I seen',
    options: ['have I seen', 'I have seen', 'I saw', 'did I saw'],
    ruleExplanation: 'Al iniciar una oración formal con un adverbio negativo ("Seldom / Rarely / Never"), invertimos auxiliar + sujeto ("have I seen").',
    paradigmTitle: 'Negative Adverbial Inversion',
    paradigmRows: [
      { pronoun: 'Seldom / Rarely / Never', conjugated: 'have I seen...' },
      { pronoun: 'Not only...', conjugated: 'did she finish, but also...' },
      { pronoun: 'Under no circumstances', conjugated: 'should you share...' }
    ]
  },
  {
    id: 'en_conj_b2_4',
    level: 'B2',
    category: 'past-perfect',
    subjectCard: 'BY NEXT MONTH (Para el próximo mes)',
    verbCard: 'TO COMPLETE (Completar)',
    tenseCard: 'Future Perfect · Meta Cumplida',
    sentenceTemplate: 'By next month, our team _____ the entire migration.',
    fullSentence: 'By next month, our team will have completed the entire migration.',
    translation: 'Para el próximo mes, nuestro equipo habrá completado toda la migración.',
    correctAnswer: 'will have completed',
    options: ['will have completed', 'will complete', 'has completed', 'would complete'],
    ruleExplanation: 'Para una acción que ya estará terminada antes de una fecha futura ("By next month") usamos Future Perfect ("will have + participio").',
    paradigmTitle: 'Future Perfect vs Future Continuous',
    paradigmRows: [
      { pronoun: 'Future Perfect (Done by then)', conjugated: 'will have completed' },
      { pronoun: 'Future Continuous (In progress)', conjugated: 'will be completing' }
    ]
  },
  {
    id: 'en_conj_b2_5',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'I WISH (Ojalá en el pasado)',
    verbCard: 'TO ACCEPT (Aceptar)',
    tenseCard: 'Wish + Past Perfect · Arrepentimiento',
    sentenceTemplate: 'I wish I _____ that job offer in Zurich last year.',
    fullSentence: 'I wish I had accepted that job offer in Zurich last year.',
    translation: 'Ojalá hubiera aceptado aquella oferta de trabajo en Zúrich el año pasado.',
    correctAnswer: 'had accepted',
    options: ['had accepted', 'accepted', 'would accept', 'have accepted'],
    ruleExplanation: 'Para expresar arrepentimiento sobre el pasado ("last year") después de "I wish / If only" usamos Past Perfect ("had accepted").',
    paradigmTitle: 'Wishes & Regrets: I WISH',
    paradigmRows: [
      { pronoun: 'Present Wish', conjugated: 'I wish I knew (Past Simple)' },
      { pronoun: 'Past Regret', conjugated: 'I wish I had accepted (Past Perfect)' },
      { pronoun: 'Annoyance / Change', conjugated: 'I wish it would stop raining' }
    ]
  },
  {
    id: 'en_conj_b2_6',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'WE (Causativo - Servicio)',
    verbCard: 'HAVE + REPAIR (Hacer reparar)',
    tenseCard: 'Causative Have · Have something done',
    sentenceTemplate: 'We _____ the office air conditioning repaired yesterday.',
    fullSentence: 'We had the office air conditioning repaired yesterday.',
    translation: 'Hicimos reparar el aire acondicionado de la oficina ayer.',
    correctAnswer: 'had',
    options: ['had', 'made', 'did', 'were'],
    ruleExplanation: 'La estructura causativa "have/get + objeto + participio pasado" indica que encargamos el servicio a un profesional ("had it repaired").',
    paradigmTitle: 'Causative Structure: HAVE SOMETHING DONE',
    paradigmRows: [
      { pronoun: 'Present Causative', conjugated: 'We have it repaired' },
      { pronoun: 'Past Causative', conjugated: 'We had it repaired' },
      { pronoun: 'Future Causative', conjugated: 'We will have it repaired' }
    ]
  },
  {
    id: 'en_conj_b2_7',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'IF I HAD TAKEN (Condicional Mixto)',
    verbCard: 'TO BE (Estar - Resultado Ahora)',
    tenseCard: 'Mixed Conditional · Pasado → Hoy',
    sentenceTemplate: 'If I had taken that flight, I _____ in Tokyo right now.',
    fullSentence: 'If I had taken that flight, I would be in Tokyo right now.',
    translation: 'Si hubiera tomado ese vuelo, estaría en Tokio ahora mismo.',
    correctAnswer: 'would be',
    options: ['would be', 'would have been', 'will be', 'had been'],
    ruleExplanation: 'Cuando una condición irreal del pasado ("If I had taken") tiene su efecto en el presente ("right now"), el resultado usa "would + verbo base" ("would be").',
    paradigmTitle: 'Mixed Conditional (Past Cause → Present Result)',
    paradigmRows: [
      { pronoun: 'If-Clause (Past)', conjugated: 'If I had taken that flight...' },
      { pronoun: 'Result (Present Now)', conjugated: 'I would be in Tokyo right now' }
    ]
  },
  {
    id: 'en_conj_b2_8',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'THE BOARD SUGGESTED (Subjuntivo)',
    verbCard: 'TO INVEST (Invertir)',
    tenseCard: 'Mandative Subjunctive · Formal',
    sentenceTemplate: 'The board suggested that the company _____ in renewable energy.',
    fullSentence: 'The board suggested that the company invest in renewable energy.',
    translation: 'La junta directiva sugirió que la empresa invirtiera en energía renovable.',
    correctAnswer: 'invest',
    options: ['invest', 'invests', 'invested', 'investing'],
    ruleExplanation: 'En inglés formal, tras verbos de recomendación (suggest, recommend, insist + that), el verbo va en forma base pura ("invest", sin -s ni -ed).',
    paradigmTitle: 'Formal Subjunctive in English',
    paradigmRows: [
      { pronoun: 'They suggested that he...', conjugated: 'invest (base form)' },
      { pronoun: 'It is essential that she...', conjugated: 'be informed (base be)' }
    ]
  },
  {
    id: 'en_conj_b2_9',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'NO SOONER (Apenas... cuando)',
    verbCard: 'TO START (Empezar)',
    tenseCard: 'Inversión Temporal · No sooner... than',
    sentenceTemplate: 'No sooner _____ the meeting than the fire alarm went off.',
    fullSentence: 'No sooner had we started the meeting than the fire alarm went off.',
    translation: 'Apenas habíamos empezado la reunión cuando sonó la alarma de incendios.',
    correctAnswer: 'had we started',
    options: ['had we started', 'we had started', 'did we started', 'have we started'],
    ruleExplanation: 'Al empezar con "No sooner", invertimos el Past Perfect ("had + sujeto + participio") y conectamos la segunda cláusula con "than".',
    paradigmTitle: 'Time Inversion: NO SOONER / HARDLY',
    paradigmRows: [
      { pronoun: 'No sooner...', conjugated: 'had we started ... than' },
      { pronoun: 'Hardly / Scarcely...', conjugated: 'had we started ... when' }
    ]
  },
  {
    id: 'en_conj_b2_10',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'YOU (Crítica en Pasado)',
    verbCard: 'SHOULD + TELL (Deberías haber dicho)',
    tenseCard: 'Past Modal · Crítica / Consejo Pasado',
    sentenceTemplate: 'You _____ me earlier that the deadline had changed.',
    fullSentence: 'You should have told me earlier that the deadline had changed.',
    translation: 'Deberías haberme dicho antes que la fecha límite había cambiado.',
    correctAnswer: 'should have told',
    options: ['should have told', 'should told', 'must have tell', 'would told'],
    ruleExplanation: 'Para reprochar o señalar algo que debía haberse hecho en el pasado y no se hizo, usamos "should have + participio pasado".',
    paradigmTitle: 'Past Advice & Criticism: SHOULD HAVE',
    paradigmRows: [
      { pronoun: 'Affirmative (+)', conjugated: 'You should have told me' },
      { pronoun: 'Negative (-)', conjugated: "You shouldn't have said that" }
    ]
  },
  {
    id: 'en_conj_b2_11',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'I WOULD RATHER YOU (Preferencia)',
    verbCard: 'TO CALL (Llamar)',
    tenseCard: 'Would rather + Nuevo Sujeto (Past)',
    sentenceTemplate: 'I would rather you _____ the client tomorrow morning instead of today.',
    fullSentence: 'I would rather you called the client tomorrow morning instead of today.',
    translation: 'Preferiría que llamaras al cliente mañana por la mañana en vez de hoy.',
    correctAnswer: 'called',
    options: ['called', 'call', 'will call', 'calling'],
    ruleExplanation: 'Cuando "would rather" cambia de sujeto ("I would rather you..."), el verbo siguiente va en Past Simple ("called") para referirse al presente o futuro.',
    paradigmTitle: 'Preferences: WOULD RATHER',
    paradigmRows: [
      { pronoun: 'Same Subject (I → I)', conjugated: 'I would rather call' },
      { pronoun: 'Different Subject (I → You)', conjugated: 'I would rather you called' }
    ]
  },
  {
    id: 'en_conj_b2_12',
    level: 'B2',
    category: 'past-perfect',
    subjectCard: 'THE CEO (Reporte Impersonal)',
    verbCard: 'TO BELIEVE (Creer - Pasiva Formal)',
    tenseCard: 'Reporting Passive + Perfect Infinitive',
    sentenceTemplate: 'The CEO is believed _____ the merger agreement last night.',
    fullSentence: 'The CEO is believed to have signed the merger agreement last night.',
    translation: 'Se cree que el director ejecutivo firmó el acuerdo de fusión anoche.',
    correctAnswer: 'to have signed',
    options: ['to have signed', 'to sign', 'signing', 'that signed'],
    ruleExplanation: 'En estructuras pasivas periodísticas ("is believed / is reported"), para referirse a una acción anterior ("last night") usamos el infinitivo perfecto: "to have + participio".',
    paradigmTitle: 'Advanced Reporting Passive',
    paradigmRows: [
      { pronoun: 'Present Action', conjugated: 'is believed to be...' },
      { pronoun: 'Prior / Past Action', conjugated: 'is believed to have signed' }
    ]
  }
];

// ============================================================================
// COURSE 2: ENGLISH SPEAKERS LEARNING SPANISH (48 CARDS: 12 PER LEVEL A1-B2)
// ============================================================================
export const SPANISH_CONJUGATION_CHALLENGES: ConjugationChallenge[] = [
  // --------------------------------------------------------------------------
  // LEVEL A1 (12 CARDS)
  // --------------------------------------------------------------------------
  {
    id: 'es_conj_a1_1',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'YO (I)',
    verbCard: 'TENER (To have)',
    tenseCard: 'Presente · Irregular en Yo',
    sentenceTemplate: 'Yo _____ veintiocho años y vivo en Madrid.',
    fullSentence: 'Yo tengo veintiocho años y vivo en Madrid.',
    translation: 'I am twenty-eight years old and I live in Madrid.',
    correctAnswer: 'tengo',
    options: ['tengo', 'tienes', 'tiene', 'tener'],
    ruleExplanation: 'In Spanish we use TENER for age, and its "yo" form in the present tense is irregular: "yo tengo".',
    paradigmTitle: 'Presente de Indicativo: TENER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'tengo' },
      { pronoun: 'Tú', conjugated: 'tienes' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'tiene' },
      { pronoun: 'Nosotros/as', conjugated: 'tenemos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'tienen' }
    ]
  },
  {
    id: 'es_conj_a1_2',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'NOSOTROS (We)',
    verbCard: 'HABLAR (To speak)',
    tenseCard: 'Presente Regular (-AR)',
    sentenceTemplate: 'Nosotros _____ español todos los días en la oficina.',
    fullSentence: 'Nosotros hablamos español todos los días en la oficina.',
    translation: 'We speak Spanish every day at the office.',
    correctAnswer: 'hablamos',
    options: ['hablamos', 'hablan', 'habláis', 'hablo'],
    ruleExplanation: 'For regular -AR verbs in the present tense, the "nosotros" ending is always "-amos" (hablar → hablamos).',
    paradigmTitle: 'Presente Regular (-AR): HABLAR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'hablo' },
      { pronoun: 'Tú', conjugated: 'hablas' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'habla' },
      { pronoun: 'Nosotros/as', conjugated: 'hablamos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'hablan' }
    ]
  },
  {
    id: 'es_conj_a1_3',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'LA CAFETERÍA (The café)',
    verbCard: 'ESTAR (To be - Location)',
    tenseCard: 'Presente · Ubicación Física',
    sentenceTemplate: 'La cafetería _____ muy cerca de la estación de tren.',
    fullSentence: 'La cafetería está muy cerca de la estación de tren.',
    translation: 'The coffee shop is very close to the train station.',
    correctAnswer: 'está',
    options: ['está', 'es', 'están', 'son'],
    ruleExplanation: 'Physical locations (even permanent buildings) always require ESTAR ("está"), never SER.',
    paradigmTitle: 'Presente: ESTAR (Location & States)',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'estoy' },
      { pronoun: 'Tú', conjugated: 'estás' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'está' },
      { pronoun: 'Nosotros/as', conjugated: 'estamos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'están' }
    ]
  },
  {
    id: 'es_conj_a1_4',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'ELLOS (They)',
    verbCard: 'QUERER (To want)',
    tenseCard: 'Presente · Cambio Radical (e → ie)',
    sentenceTemplate: 'Ellos _____ reservar una mesa para cuatro personas.',
    fullSentence: 'Ellos quieren reservar una mesa para cuatro personas.',
    translation: 'They want to book a table for four people.',
    correctAnswer: 'quieren',
    options: ['quieren', 'queremos', 'quiere', 'queren'],
    ruleExplanation: 'QUERER is a stem-changing verb (e → ie): for "ellos/ellas/ustedes" it conjugates as "quieren".',
    paradigmTitle: 'Presente (e → ie): QUERER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'quiero' },
      { pronoun: 'Tú', conjugated: 'quieres' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'quiere' },
      { pronoun: 'Nosotros/as', conjugated: 'queremos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'quieren' }
    ]
  },
  {
    id: 'es_conj_a1_5',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'ELLA (She)',
    verbCard: 'SER (To be - Identity / Origin)',
    tenseCard: 'Presente · Profesión y Origen',
    sentenceTemplate: 'Ella _____ arquitecta y trabaja en Barcelona.',
    fullSentence: 'Ella es arquitecta y trabaja en Barcelona.',
    translation: 'She is an architect and works in Barcelona.',
    correctAnswer: 'es',
    options: ['es', 'está', 'eres', 'son'],
    ruleExplanation: 'Professions, nationalities, and identity always use the verb SER ("Ella es arquitecta").',
    paradigmTitle: 'Presente: SER (Identity & Origin)',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'soy' },
      { pronoun: 'Tú', conjugated: 'eres' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'es' },
      { pronoun: 'Nosotros/as', conjugated: 'somos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'son' }
    ]
  },
  {
    id: 'es_conj_a1_6',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'TÚ (You - Informal)',
    verbCard: 'COMER (To eat)',
    tenseCard: 'Presente Regular (-ER)',
    sentenceTemplate: '¿A qué hora _____ tú normalmente al mediodía?',
    fullSentence: '¿A qué hora comes tú normalmente al mediodía?',
    translation: 'What time do you usually eat at noon?',
    correctAnswer: 'comes',
    options: ['comes', 'come', 'comemos', 'comen'],
    ruleExplanation: 'Regular -ER verbs take "-es" for "tú" in the present tense (comer → comes).',
    paradigmTitle: 'Presente Regular (-ER): COMER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'como' },
      { pronoun: 'Tú', conjugated: 'comes' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'come' },
      { pronoun: 'Nosotros/as', conjugated: 'comemos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'comen' }
    ]
  },
  {
    id: 'es_conj_a1_7',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'USTEDES (You all)',
    verbCard: 'VIVIR (To live)',
    tenseCard: 'Presente Regular (-IR)',
    sentenceTemplate: '¿Desde cuándo _____ ustedes en este barrio?',
    fullSentence: '¿Desde cuándo viven ustedes en este barrio?',
    translation: 'Since when have you all lived in this neighborhood?',
    correctAnswer: 'viven',
    options: ['viven', 'vivimos', 'vives', 'vive'],
    ruleExplanation: 'For "ustedes" (and "ellos/ellas"), regular -IR verbs end in "-en" (vivir → viven).',
    paradigmTitle: 'Presente Regular (-IR): VIVIR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'vivo' },
      { pronoun: 'Tú', conjugated: 'vives' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'vive' },
      { pronoun: 'Nosotros/as', conjugated: 'vivimos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'viven' }
    ]
  },
  {
    id: 'es_conj_a1_8',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'NOSOTROS (We)',
    verbCard: 'IR (To go)',
    tenseCard: 'Presente Irregular · IR + A',
    sentenceTemplate: 'Este fin de semana nosotros _____ a la playa.',
    fullSentence: 'Este fin de semana nosotros vamos a la playa.',
    translation: 'This weekend we are going to the beach.',
    correctAnswer: 'vamos',
    options: ['vamos', 'van', 'voy', 'vais'],
    ruleExplanation: 'IR (to go) is irregular in the present tense: for "nosotros" we always use "vamos".',
    paradigmTitle: 'Presente Irregular: IR (To go)',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'voy' },
      { pronoun: 'Tú', conjugated: 'vas' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'va' },
      { pronoun: 'Nosotros/as', conjugated: 'vamos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'van' }
    ]
  },
  {
    id: 'es_conj_a1_9',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'YO (I)',
    verbCard: 'PODER (Can / To be able to)',
    tenseCard: 'Presente · Cambio Radical (o → ue)',
    sentenceTemplate: 'Lo siento, hoy no _____ asistir a la reunión.',
    fullSentence: 'Lo siento, hoy no puedo asistir a la reunión.',
    translation: 'I am sorry, today I cannot attend the meeting.',
    correctAnswer: 'puedo',
    options: ['puedo', 'pode', 'podemos', 'puedes'],
    ruleExplanation: 'PODER changes its stem from "o" to "ue" in all forms except nosotros/vosotros: "yo puedo".',
    paradigmTitle: 'Presente (o → ue): PODER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'puedo' },
      { pronoun: 'Tú', conjugated: 'puedes' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'puede' },
      { pronoun: 'Nosotros/as', conjugated: 'podemos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'pueden' }
    ]
  },
  {
    id: 'es_conj_a1_10',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'A MÍ + PLURAL (To me + Plural noun)',
    verbCard: 'GUSTAR (To like / please)',
    tenseCard: 'Estructura GUSTAR · Objeto Plural',
    sentenceTemplate: 'A mí me _____ mucho los museos de historia.',
    fullSentence: 'A mí me gustan mucho los museos de historia.',
    translation: 'I really like history museums.',
    correctAnswer: 'gustan',
    options: ['gustan', 'gusta', 'gusto', 'gustas'],
    ruleExplanation: 'GUSTAR agrees with the thing liked: because "los museos" is plural, we must use "me gustan" (never "me gusto").',
    paradigmTitle: 'Structure of GUSTAR',
    paradigmRows: [
      { pronoun: 'Singular Noun / Infinitive', conjugated: 'me / te / le gusta' },
      { pronoun: 'Plural Noun (los museos)', conjugated: 'me / te / le gustan' },
      { pronoun: 'Nosotros / Ellos (Plural)', conjugated: 'nos / les gustan' }
    ]
  },
  {
    id: 'es_conj_a1_11',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'YO (I - Reflexive)',
    verbCard: 'LEVANTARSE (To get up)',
    tenseCard: 'Verbo Reflexivo · Rutina Diaria',
    sentenceTemplate: 'Todos los días yo _____ a las siete de la mañana.',
    fullSentence: 'Todos los días yo me levanto a las siete de la mañana.',
    translation: 'Every day I get up at seven in the morning.',
    correctAnswer: 'me levanto',
    options: ['me levanto', 'se levanta', 'levanto', 'te levantas'],
    ruleExplanation: 'Reflexive verbs require the matching reflexive pronoun before the conjugated verb: for "yo", it is "me levanto".',
    paradigmTitle: 'Presente Reflexivo: LEVANTARSE',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'me levanto' },
      { pronoun: 'Tú', conjugated: 'te levantas' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'se levanta' },
      { pronoun: 'Nosotros/as', conjugated: 'nos levantamos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'se levantan' }
    ]
  },
  {
    id: 'es_conj_a1_12',
    level: 'A1',
    category: 'affirmative',
    subjectCard: 'YO (I)',
    verbCard: 'HACER (To do / make)',
    tenseCard: 'Presente · Verbo "Yo -GO"',
    sentenceTemplate: 'Yo siempre _____ ejercicio antes de ir al trabajo.',
    fullSentence: 'Yo siempre hago ejercicio antes de ir al trabajo.',
    translation: 'I always exercise before going to work.',
    correctAnswer: 'hago',
    options: ['hago', 'haco', 'hace', 'haces'],
    ruleExplanation: 'HACER is a "yo-go" verb: its first-person singular in the present tense is irregular ("yo hago").',
    paradigmTitle: 'Presente Irregular (Yo-Go): HACER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'hago' },
      { pronoun: 'Tú', conjugated: 'haces' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'hace' },
      { pronoun: 'Nosotros/as', conjugated: 'hacemos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'hacen' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL A2 (12 CARDS)
  // --------------------------------------------------------------------------
  {
    id: 'es_conj_a2_1',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'AYER YO (Yesterday I)',
    verbCard: 'IR (To go)',
    tenseCard: 'Pretérito Indefinido · Pasado Puntual',
    sentenceTemplate: 'Ayer yo _____ al mercado central para comprar fruta.',
    fullSentence: 'Ayer yo fui al mercado central para comprar fruta.',
    translation: 'Yesterday I went to the central market to buy fruit.',
    correctAnswer: 'fui',
    options: ['fui', 'iba', 'fue', 'fuiste'],
    ruleExplanation: 'For a completed past action at a specific time ("ayer"), IR in the Pretérito Indefinido for "yo" is "fui".',
    paradigmTitle: 'Pretérito Indefinido: IR / SER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'fui' },
      { pronoun: 'Tú', conjugated: 'fuiste' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'fue' },
      { pronoun: 'Nosotros/as', conjugated: 'fuimos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'fueron' }
    ]
  },
  {
    id: 'es_conj_a2_2',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'CUANDO ERA NIÑO (When I was a child)',
    verbCard: 'JUGAR (To play)',
    tenseCard: 'Pretérito Imperfecto · Hábito Pasado',
    sentenceTemplate: 'Cuando era niño, siempre _____ en el parque con mis primos.',
    fullSentence: 'Cuando era niño, siempre jugaba en el parque con mis primos.',
    translation: 'When I was a child, I always used to play in the park with my cousins.',
    correctAnswer: 'jugaba',
    options: ['jugaba', 'jugué', 'juego', 'jugaría'],
    ruleExplanation: 'Habitual actions in the past ("used to play") use the Imperfect tense (-AR verbs take "-aba": jugaba).',
    paradigmTitle: 'Pretérito Imperfecto (-AR): JUGAR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella / Usted', conjugated: 'jugaba' },
      { pronoun: 'Tú', conjugated: 'jugabas' },
      { pronoun: 'Nosotros/as', conjugated: 'jugábamos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'jugaban' }
    ]
  },
  {
    id: 'es_conj_a2_3',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'ELLA (She)',
    verbCard: 'HACER (To make / do)',
    tenseCard: 'Pretérito Perfecto · Esta mañana',
    sentenceTemplate: 'Esta mañana ella _____ un desayuno delicioso.',
    fullSentence: 'Esta mañana ella ha hecho un desayuno delicioso.',
    translation: 'This morning she has made a delicious breakfast.',
    correctAnswer: 'ha hecho',
    options: ['ha hecho', 'ha hacido', 'he hecho', 'hizo'],
    ruleExplanation: 'HACER has an irregular past participle: "hecho" (never "hacido"). With "ella", we use "ha hecho".',
    paradigmTitle: 'Pretérito Perfecto: HABER + HECHO',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'he hecho' },
      { pronoun: 'Tú', conjugated: 'has hecho' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'ha hecho' },
      { pronoun: 'Nosotros/as', conjugated: 'hemos hecho' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'han hecho' }
    ]
  },
  {
    id: 'es_conj_a2_4',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'EL MÉDICO (3ª Persona Singular)',
    verbCard: 'DECIR (To say / tell)',
    tenseCard: 'Pretérito Indefinido · Irregular (-J)',
    sentenceTemplate: '¿Qué te _____ el médico en la consulta de ayer?',
    fullSentence: '¿Qué te dijo el médico en la consulta de ayer?',
    translation: 'What did the doctor tell you at yesterday’s appointment?',
    correctAnswer: 'dijo',
    options: ['dijo', 'decía', 'ha dicho', 'dijiste'],
    ruleExplanation: 'The subject here is "el médico" (3rd person singular). In Pretérito Indefinido, DECIR becomes "dijo".',
    paradigmTitle: 'Pretérito Indefinido: DECIR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'dije' },
      { pronoun: 'Tú', conjugated: 'dijiste' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'dijo' },
      { pronoun: 'Nosotros/as', conjugated: 'dijimos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'dijeron' }
    ]
  },
  {
    id: 'es_conj_a2_5',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'NOSOTROS (We)',
    verbCard: 'TENER (To have)',
    tenseCard: 'Pretérito Indefinido · Raíz TUV-',
    sentenceTemplate: 'La semana pasada nosotros _____ mucho trabajo en la clínica.',
    fullSentence: 'La semana pasada nosotros tuvimos mucho trabajo en la clínica.',
    translation: 'Last week we had a lot of work at the clinic.',
    correctAnswer: 'tuvimos',
    options: ['tuvimos', 'teníamos', 'tuvieron', 'tuve'],
    ruleExplanation: 'TENER uses the irregular stem "tuv-" in the Pretérito Indefinido: for "nosotros", it is "tuvimos".',
    paradigmTitle: 'Pretérito Indefinido: TENER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'tuve' },
      { pronoun: 'Tú', conjugated: 'tuviste' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'tuvo' },
      { pronoun: 'Nosotros/as', conjugated: 'tuvimos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'tuvieron' }
    ]
  },
  {
    id: 'es_conj_a2_6',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'MIENTRAS YO (While I was...)',
    verbCard: 'LEER (To read)',
    tenseCard: 'Estaba + Gerundio · Acción en curso',
    sentenceTemplate: 'Mientras yo _____ el periódico, sonó el timbre.',
    fullSentence: 'Mientras yo estaba leyendo el periódico, sonó el timbre.',
    translation: 'While I was reading the newspaper, the doorbell rang.',
    correctAnswer: 'estaba leyendo',
    options: ['estaba leyendo', 'estuve leyendo', 'leí', 'estaba leiendo'],
    ruleExplanation: 'For an ongoing background action interrupted by another event, use Imperfect "estaba" + gerund ("leyendo", with y).',
    paradigmTitle: 'Estar (Imperfecto) + Gerundio: LEER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'estaba leyendo' },
      { pronoun: 'Tú', conjugated: 'estabas leyendo' },
      { pronoun: 'Nosotros/as', conjugated: 'estábamos leyendo' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'estaban leyendo' }
    ]
  },
  {
    id: 'es_conj_a2_7',
    level: 'A2',
    category: 'affirmative',
    subjectCard: 'MAÑANA ELLOS (Tomorrow they)',
    verbCard: 'SALIR (To leave / depart)',
    tenseCard: 'Futuro Simple · Irregular (SALDR-)',
    sentenceTemplate: 'Mañana ellos _____ hacia el aeropuerto a las seis.',
    fullSentence: 'Mañana ellos saldrán hacia el aeropuerto a las seis.',
    translation: 'Tomorrow they will leave for the airport at six.',
    correctAnswer: 'saldrán',
    options: ['saldrán', 'salirán', 'salen', 'saldrían'],
    ruleExplanation: 'SALIR has an irregular future stem ("saldr-"): for "ellos/ustedes" it becomes "saldrán".',
    paradigmTitle: 'Futuro Simple Irregular: SALIR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'saldré' },
      { pronoun: 'Tú', conjugated: 'saldrás' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'saldrá' },
      { pronoun: 'Nosotros/as', conjugated: 'saldremos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'saldrán' }
    ]
  },
  {
    id: 'es_conj_a2_8',
    level: 'A2',
    category: 'affirmative',
    subjectCard: 'TÚ (Imperativo Afirmativo)',
    verbCard: 'PONER (To put / set)',
    tenseCard: 'Imperativo Afirmativo · Irregular Corto',
    sentenceTemplate: 'Por favor, _____ los documentos sobre mi escritorio.',
    fullSentence: 'Por favor, pon los documentos sobre mi escritorio.',
    translation: 'Please put the documents on my desk.',
    correctAnswer: 'pon',
    options: ['pon', 'pone', 'pones', 'ponga'],
    ruleExplanation: 'PONER has a short irregular affirmative "tú" command: "pon" (alongside ven, ten, haz, sal, di, ve, sé).',
    paradigmTitle: 'Short Irregular Tú Commands',
    paradigmRows: [
      { pronoun: 'Poner / Tener / Venir', conjugated: 'pon / ten / ven' },
      { pronoun: 'Hacer / Salir / Decir', conjugated: 'haz / sal / di' },
      { pronoun: 'Ir / Ser', conjugated: 've / sé' }
    ]
  },
  {
    id: 'es_conj_a2_9',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'NOSOTROS (We - Childhood)',
    verbCard: 'SER (To be)',
    tenseCard: 'Pretérito Imperfecto · Irregular',
    sentenceTemplate: 'Cuando _____ jóvenes, vivíamos cerca del mar.',
    fullSentence: 'Cuando éramos jóvenes, vivíamos cerca del mar.',
    translation: 'When we were young, we used to live near the sea.',
    correctAnswer: 'éramos',
    options: ['éramos', 'fuimos', 'somos', 'eran'],
    ruleExplanation: 'SER is one of only 3 irregular verbs in the Imperfect (ser, ir, ver): for "nosotros" it is "éramos".',
    paradigmTitle: 'Pretérito Imperfecto: SER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'era' },
      { pronoun: 'Tú', conjugated: 'eras' },
      { pronoun: 'Nosotros/as', conjugated: 'éramos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'eran' }
    ]
  },
  {
    id: 'es_conj_a2_10',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'ELLOS (They)',
    verbCard: 'PEDIR (To ask for / order)',
    tenseCard: 'Pretérito Indefinido · Cambio (e → i)',
    sentenceTemplate: 'Anoche en el restaurante ellos _____ paella de mariscos.',
    fullSentence: 'Anoche en el restaurante ellos pidieron paella de mariscos.',
    translation: 'Last night at the restaurant they ordered seafood paella.',
    correctAnswer: 'pidieron',
    options: ['pidieron', 'pedieron', 'pedían', 'pidió'],
    ruleExplanation: '-IR stem-changing verbs like PEDIR change e → i in the 3rd person singular and plural of the Preterite (pidió / pidieron).',
    paradigmTitle: 'Pretérito Indefinido (e → i): PEDIR',
    paradigmRows: [
      { pronoun: 'Yo / Tú', conjugated: 'pedí / pediste' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'pidió' },
      { pronoun: 'Nosotros/as', conjugated: 'pedimos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'pidieron' }
    ]
  },
  {
    id: 'es_conj_a2_11',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'YO (I - Spelling Change)',
    verbCard: 'EMPEZAR (To start / begin)',
    tenseCard: 'Pretérito Indefinido · Cambio (z → c)',
    sentenceTemplate: 'Yo _____ mi nuevo curso de español el lunes pasado.',
    fullSentence: 'Yo empecé mi nuevo curso de español el lunes pasado.',
    translation: 'I started my new Spanish course last Monday.',
    correctAnswer: 'empecé',
    options: ['empecé', 'empezé', 'empezaba', 'empiezo'],
    ruleExplanation: 'Verbs ending in -ZAR change Z → C before "-é" in the "yo" form of the Preterite ("empecé").',
    paradigmTitle: 'Pretérito Indefinido (-ZAR → -CÉ): EMPEZAR',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'empecé' },
      { pronoun: 'Tú', conjugated: 'empezaste' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'empezó' },
      { pronoun: 'Nosotros / Ellos', conjugated: 'empezamos / empezaron' }
    ]
  },
  {
    id: 'es_conj_a2_12',
    level: 'A2',
    category: 'past-perfect',
    subjectCard: 'TÚ (You)',
    verbCard: 'VER (To see)',
    tenseCard: 'Pretérito Perfecto · Participio Irregular',
    sentenceTemplate: '¿Alguna vez _____ una película de este director?',
    fullSentence: '¿Alguna vez has visto una película de este director?',
    translation: 'Have you ever seen a movie by this director?',
    correctAnswer: 'has visto',
    options: ['has visto', 'has veído', 'viste', 'he visto'],
    ruleExplanation: 'VER has an irregular past participle: "visto". For life experiences ("¿Alguna vez...?"), use "has visto".',
    paradigmTitle: 'Irregular Past Participles in Spanish',
    paradigmRows: [
      { pronoun: 'Ver → Visto', conjugated: 'has visto' },
      { pronoun: 'Escribir → Escrito', conjugated: 'has escrito' },
      { pronoun: 'Abrir → Abierto', conjugated: 'has abierto' },
      { pronoun: 'Poner → Puesto', conjugated: 'has puesto' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL B1 (12 CARDS)
  // --------------------------------------------------------------------------
  {
    id: 'es_conj_b1_1',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'ESPERO QUE TÚ (I hope that you...)',
    verbCard: 'TENER (To have)',
    tenseCard: 'Presente de Subjuntivo · Deseo (WEIRDO)',
    sentenceTemplate: 'Espero que _____ un excelente viaje esta semana.',
    fullSentence: 'Espero que tengas un excelente viaje esta semana.',
    translation: 'I hope you have an excellent trip this week.',
    correctAnswer: 'tengas',
    options: ['tengas', 'tienes', 'tendrás', 'tenga'],
    ruleExplanation: 'After expressions of hope/wish ("Espero que..."), Spanish requires the Present Subjunctive: tener → tengas.',
    paradigmTitle: 'Presente de Subjuntivo: TENER',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'tenga' },
      { pronoun: 'Tú', conjugated: 'tengas' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'tenga' },
      { pronoun: 'Nosotros/as', conjugated: 'tengamos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'tengan' }
    ]
  },
  {
    id: 'es_conj_b1_2',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'YO EN TU LUGAR (In your place, I...)',
    verbCard: 'HABLAR (To speak)',
    tenseCard: 'Condicional Simple · Consejo',
    sentenceTemplate: 'Yo en tu lugar _____ directamente con la gerente.',
    fullSentence: 'Yo en tu lugar hablaría directamente con la gerente.',
    translation: 'In your place, I would speak directly with the manager.',
    correctAnswer: 'hablaría',
    options: ['hablaría', 'hablaba', 'hablé', 'hable'],
    ruleExplanation: 'To say what you "would" do, attach "-ía" to the full infinitive: hablar → hablaría.',
    paradigmTitle: 'Condicional Simple: HABLAR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella / Usted', conjugated: 'hablaría' },
      { pronoun: 'Tú', conjugated: 'hablarías' },
      { pronoun: 'Nosotros/as', conjugated: 'hablaríamos' },
      { pronoun: 'Ellos / Ellas / Ustedes', conjugated: 'hablarían' }
    ]
  },
  {
    id: 'es_conj_b1_3',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'CUANDO ELLOS (When they arrive...)',
    verbCard: 'LLEGAR (To arrive)',
    tenseCard: 'Subjuntivo con Futuro ("Tan pronto como")',
    sentenceTemplate: 'Te llamaré tan pronto como ellos _____ a la oficina.',
    fullSentence: 'Te llamaré tan pronto como ellos lleguen a la oficina.',
    translation: 'I will call you as soon as they arrive at the office.',
    correctAnswer: 'lleguen',
    options: ['lleguen', 'llegan', 'llegarán', 'llegaron'],
    ruleExplanation: 'Time conjunctions ("cuando", "tan pronto como") referring to a pending future action require the Present Subjunctive ("lleguen").',
    paradigmTitle: 'Presente de Subjuntivo (-GAR → -GU): LLEGAR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'llegue' },
      { pronoun: 'Tú', conjugated: 'llegues' },
      { pronoun: 'Nosotros/as', conjugated: 'lleguemos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'lleguen' }
    ]
  },
  {
    id: 'es_conj_b1_4',
    level: 'B1',
    category: 'negative-question',
    subjectCard: 'TÚ (Imperativo Negativo)',
    verbCard: 'DECIR (To say / tell)',
    tenseCard: 'Mandato Negativo · "No..."',
    sentenceTemplate: 'Por favor, no le _____ nada todavía sobre la sorpresa.',
    fullSentence: 'Por favor, no le digas nada todavía sobre la sorpresa.',
    translation: 'Please do not tell him/her anything about the surprise yet.',
    correctAnswer: 'digas',
    options: ['digas', 'dices', 'di', 'diga'],
    ruleExplanation: 'Negative informal commands ("tú") always use the Present Subjunctive form: "no digas".',
    paradigmTitle: 'Imperativo Afirmativo vs Negativo: DECIR',
    paradigmRows: [
      { pronoun: 'Tú Afirmativo (+)', conjugated: 'di' },
      { pronoun: 'Tú Negativo (-)', conjugated: 'no digas' },
      { pronoun: 'Usted (+/-)', conjugated: 'diga / no diga' }
    ]
  },
  {
    id: 'es_conj_b1_5',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'ES IMPORTANTE QUE NOSOTROS',
    verbCard: 'SABER (To know)',
    tenseCard: 'Presente de Subjuntivo · Irregular (SEP-)',
    sentenceTemplate: 'Es importante que nosotros _____ la respuesta antes del viernes.',
    fullSentence: 'Es importante que nosotros sepamos la respuesta antes del viernes.',
    translation: 'It is important that we know the answer before Friday.',
    correctAnswer: 'sepamos',
    options: ['sepamos', 'sabemos', 'sabremos', 'sepan'],
    ruleExplanation: 'Impersonal expressions of necessity ("Es importante que...") trigger the Subjunctive. SABER is irregular: "sepamos".',
    paradigmTitle: 'Presente de Subjuntivo Irregular: SABER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'sepa' },
      { pronoun: 'Tú', conjugated: 'sepas' },
      { pronoun: 'Nosotros/as', conjugated: 'sepamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'sepan' }
    ]
  },
  {
    id: 'es_conj_b1_6',
    level: 'B1',
    category: 'negative-question',
    subjectCard: 'NO CREO QUE (Doubt / Denial)',
    verbCard: 'SER (To be)',
    tenseCard: 'Subjuntivo tras Negación de Opinión',
    sentenceTemplate: 'No creo que esa _____ la mejor solución para el equipo.',
    fullSentence: 'No creo que esa sea la mejor solución para el equipo.',
    translation: 'I do not think that is the best solution for the team.',
    correctAnswer: 'sea',
    options: ['sea', 'es', 'será', 'fuera'],
    ruleExplanation: 'While affirmative "Creo que..." uses Indicative, negative "No creo que..." expresses doubt and requires Subjunctive ("sea").',
    paradigmTitle: 'Presente de Subjuntivo: SER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'sea' },
      { pronoun: 'Tú', conjugated: 'seas' },
      { pronoun: 'Nosotros/as', conjugated: 'seamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'sean' }
    ]
  },
  {
    id: 'es_conj_b1_7',
    level: 'B1',
    category: 'past-perfect',
    subjectCard: 'CUANDO LLEGUÉ (When I arrived)',
    verbCard: 'TERMINAR (To finish)',
    tenseCard: 'Pretérito Pluscuamperfecto · Pasado Previo',
    sentenceTemplate: 'Cuando llegué a la sala, la conferencia ya _____.',
    fullSentence: 'Cuando llegué a la sala, la conferencia ya había terminado.',
    translation: 'When I arrived at the room, the conference had already ended.',
    correctAnswer: 'había terminado',
    options: ['había terminado', 'ha terminado', 'terminó', 'habría terminado'],
    ruleExplanation: 'For a past action completed before another past action ("llegué"), use the Pluperfect ("había + participio").',
    paradigmTitle: 'Pretérito Pluscuamperfecto: TERMINAR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'había terminado' },
      { pronoun: 'Tú', conjugated: 'habías terminado' },
      { pronoun: 'Nosotros/as', conjugated: 'habíamos terminado' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'habían terminado' }
    ]
  },
  {
    id: 'es_conj_b1_8',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'ELLOS (They)',
    verbCard: 'TENER (To have)',
    tenseCard: 'Condicional Simple · Irregular (TENDR-)',
    sentenceTemplate: 'Con más apoyo, ellos _____ mejores resultados este trimestre.',
    fullSentence: 'Con más apoyo, ellos tendrían mejores resultados este trimestre.',
    translation: 'With more support, they would have better results this quarter.',
    correctAnswer: 'tendrían',
    options: ['tendrían', 'tenerían', 'tenían', 'tendrán'],
    ruleExplanation: 'TENER uses the irregular stem "tendr-" in both the Future and Conditional tenses: "ellos tendrían".',
    paradigmTitle: 'Condicional Simple Irregular: TENER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'tendría' },
      { pronoun: 'Tú', conjugated: 'tendrías' },
      { pronoun: 'Nosotros/as', conjugated: 'tendríamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'tendrían' }
    ]
  },
  {
    id: 'es_conj_b1_9',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'BUSCAMOS A ALGUIEN QUE (Indefinite)',
    verbCard: 'HABLAR (To speak)',
    tenseCard: 'Subjuntivo en Cláusula Adjetiva',
    sentenceTemplate: 'Buscamos a un candidato que _____ tres idiomas con fluidez.',
    fullSentence: 'Buscamos a un candidato que hable tres idiomas con fluidez.',
    translation: 'We are looking for a candidate who speaks three languages fluently.',
    correctAnswer: 'hable',
    options: ['hable', 'habla', 'hablará', 'habló'],
    ruleExplanation: 'When describing a hypothetical or not-yet-identified person ("un candidato que..."), Spanish uses the Subjunctive ("hable").',
    paradigmTitle: 'Adjective Clauses: Known vs Unknown',
    paradigmRows: [
      { pronoun: 'Known: Tengo un amigo que...', conjugated: 'habla (Indicativo)' },
      { pronoun: 'Sought: Busco a alguien que...', conjugated: 'hable (Subjuntivo)' }
    ]
  },
  {
    id: 'es_conj_b1_10',
    level: 'B1',
    category: 'affirmative',
    subjectCard: 'USTED (Formal Command)',
    verbCard: 'FIRMAR (To sign)',
    tenseCard: 'Imperativo Formal · Usted',
    sentenceTemplate: 'Señor director, _____ aquí al final de la página, por favor.',
    fullSentence: 'Señor director, firme aquí al final de la página, por favor.',
    translation: 'Mr. Director, please sign here at the bottom of the page.',
    correctAnswer: 'firme',
    options: ['firme', 'firma', 'firmas', 'firmó'],
    ruleExplanation: 'Formal commands ("usted") take the opposite vowel ending from the Present Subjunctive (-AR verbs take "-e": firme).',
    paradigmTitle: 'Imperativo Formal (Usted / Ustedes): FIRMAR',
    paradigmRows: [
      { pronoun: 'Usted (+ / -)', conjugated: 'firme / no firme' },
      { pronoun: 'Ustedes (+ / -)', conjugated: 'firmen / no firmen' },
      { pronoun: 'Tú (+ / -)', conjugated: 'firma / no firmes' }
    ]
  },
  {
    id: 'es_conj_b1_11',
    level: 'B1',
    category: 'affirmative',
    subjectCard: 'NOSOTROS (We)',
    verbCard: 'LLEVAR + GERUNDIO',
    tenseCard: 'Perífrasis de Duración · Llevar + -ndo',
    sentenceTemplate: 'Nosotros _____ tres años trabajando en esta empresa.',
    fullSentence: 'Nosotros llevamos tres años trabajando en esta empresa.',
    translation: 'We have been working at this company for three years.',
    correctAnswer: 'llevamos',
    options: ['llevamos', 'tenemos', 'estamos', 'hacemos'],
    ruleExplanation: 'To express how long an action has been going on ("have been doing for X time"), Spanish uses "llevar + time + gerund".',
    paradigmTitle: 'Duration Periphrasis: LLEVAR + GERUNDIO',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'llevo 3 años trabajando' },
      { pronoun: 'Nosotros/as', conjugated: 'llevamos 3 años trabajando' },
      { pronoun: 'Negation (Llevar sin + Inf)', conjugated: 'llevo 3 días sin dormir' }
    ]
  },
  {
    id: 'es_conj_b1_12',
    level: 'B1',
    category: 'advanced-mood',
    subjectCard: 'TE LO EXPLICO PARA QUE TÚ',
    verbCard: 'ENTENDER (To understand)',
    tenseCard: 'Subjuntivo Final · "Para que"',
    sentenceTemplate: 'Te envío el esquema para que _____ mejor el proceso.',
    fullSentence: 'Te envío el esquema para que entiendas mejor el proceso.',
    translation: 'I am sending you the diagram so that you understand the process better.',
    correctAnswer: 'entiendas',
    options: ['entiendas', 'entiendes', 'entenderás', 'entienda'],
    ruleExplanation: 'The purpose connector "para que" ("so that / in order that") ALWAYS requires the Subjunctive ("entiendas").',
    paradigmTitle: 'Presente de Subjuntivo (e → ie): ENTENDER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'entienda' },
      { pronoun: 'Tú', conjugated: 'entiendas' },
      { pronoun: 'Nosotros/as', conjugated: 'entendamos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'entiendan' }
    ]
  },

  // --------------------------------------------------------------------------
  // LEVEL B2 (12 CARDS)
  // --------------------------------------------------------------------------
  {
    id: 'es_conj_b2_1',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'SI YO (If I had...)',
    verbCard: 'TENER (To have)',
    tenseCard: 'Imperfecto de Subjuntivo · Hipótesis',
    sentenceTemplate: 'Si yo _____ más presupuesto, contrataría a dos diseñadores.',
    fullSentence: 'Si yo tuviera más presupuesto, contrataría a dos diseñadores.',
    translation: 'If I had more budget, I would hire two designers.',
    correctAnswer: 'tuviera',
    options: ['tuviera', 'tendría', 'tenga', 'tenía'],
    ruleExplanation: 'In hypothetical "Si" clauses about the present, Spanish uses the Imperfect Subjunctive ("Si yo tuviera..."), never the conditional.',
    paradigmTitle: 'Imperfecto de Subjuntivo: TENER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'tuviera (o tuviese)' },
      { pronoun: 'Tú', conjugated: 'tuvieras' },
      { pronoun: 'Nosotros/as', conjugated: 'tuviéramos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'tuvieran' }
    ]
  },
  {
    id: 'es_conj_b2_2',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'SI NOSOTROS (If we had known...)',
    verbCard: 'SABER (To know)',
    tenseCard: 'Pluscuamperfecto de Subjuntivo',
    sentenceTemplate: 'Si lo _____ antes, habríamos cambiado el vuelo.',
    fullSentence: 'Si lo hubiéramos sabido antes, habríamos cambiado el vuelo.',
    translation: 'If we had known it earlier, we would have changed the flight.',
    correctAnswer: 'hubiéramos sabido',
    options: ['hubiéramos sabido', 'habríamos sabido', 'sabíamos', 'supiéramos'],
    ruleExplanation: 'For past counterfactuals ("If we had known"), use the Pluperfect Subjunctive ("hubiéramos sabido") after "Si".',
    paradigmTitle: 'Pluscuamperfecto de Subjuntivo: SABER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'hubiera sabido' },
      { pronoun: 'Tú', conjugated: 'hubieras sabido' },
      { pronoun: 'Nosotros/as', conjugated: 'hubiéramos sabido' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'hubieran sabido' }
    ]
  },
  {
    id: 'es_conj_b2_3',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'ME PIDIÓ QUE (She asked me to...)',
    verbCard: 'ENVIAR (To send)',
    tenseCard: 'Correlación Temporal en Pasado',
    sentenceTemplate: 'La directora me pidió que le _____ el contrato firmado.',
    fullSentence: 'La directora me pidió que le enviara el contrato firmado.',
    translation: 'The director asked me to send her the signed contract.',
    correctAnswer: 'enviara',
    options: ['enviara', 'envío', 'enviaré', 'envíe'],
    ruleExplanation: 'When the main verb of influence is in the past ("me pidió que..."), the dependent clause takes the Imperfect Subjunctive ("enviara").',
    paradigmTitle: 'Imperfecto de Subjuntivo: ENVIAR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'enviara' },
      { pronoun: 'Tú', conjugated: 'enviaras' },
      { pronoun: 'Nosotros/as', conjugated: 'enviáramos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'enviaran' }
    ]
  },
  {
    id: 'es_conj_b2_4',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'AUNQUE (Even if it were...)',
    verbCard: 'SER (To be)',
    tenseCard: 'Concesiva Hipotética · Subjuntivo',
    sentenceTemplate: 'No aceptaría esa oferta aunque el salario _____ el doble.',
    fullSentence: 'No aceptaría esa oferta aunque el salario fuera el doble.',
    translation: 'I would not accept that offer even if the salary were double.',
    correctAnswer: 'fuera',
    options: ['fuera', 'es', 'sería', 'era'],
    ruleExplanation: 'When "aunque" introduces a hypothetical condition ("even if"), it requires the Imperfect Subjunctive ("fuera").',
    paradigmTitle: 'Imperfecto de Subjuntivo: SER / IR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'fuera (o fuese)' },
      { pronoun: 'Tú', conjugated: 'fueras' },
      { pronoun: 'Nosotros/as', conjugated: 'fuéramos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'fueran' }
    ]
  },
  {
    id: 'es_conj_b2_5',
    level: 'B2',
    category: 'past-perfect',
    subjectCard: 'PARA EL VIERNES (By Friday)',
    verbCard: 'RESOLVER (To resolve / solve)',
    tenseCard: 'Futuro Compuesto · Acción Previa',
    sentenceTemplate: 'Para el próximo viernes, ya _____ todos los detalles técnicos.',
    fullSentence: 'Para el próximo viernes, ya habremos resuelto todos los detalles técnicos.',
    translation: 'By next Friday, we will have already resolved all the technical details.',
    correctAnswer: 'habremos resuelto',
    options: ['habremos resuelto', 'habremos resolvido', 'resolveremos', 'hemos resuelto'],
    ruleExplanation: 'For an action that will be completed before a future deadline ("Para el viernes"), use Futuro Compuesto ("habremos") + irregular participle "resuelto".',
    paradigmTitle: 'Futuro Compuesto: HABER + RESUELTO',
    paradigmRows: [
      { pronoun: 'Yo', conjugated: 'habré resuelto' },
      { pronoun: 'Tú', conjugated: 'habrás resuelto' },
      { pronoun: 'Él / Ella / Usted', conjugated: 'habrá resuelto' },
      { pronoun: 'Nosotros/as', conjugated: 'habremos resuelto' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'habrán resuelto' }
    ]
  },
  {
    id: 'es_conj_b2_6',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'SI HUBIERAS AVISADO (Resultado Pasado)',
    verbCard: 'PODER (To be able to)',
    tenseCard: 'Condicional Compuesto · Pasado Irreal',
    sentenceTemplate: 'Si nos hubieras avisado, te _____ ayudar con la mudanza.',
    fullSentence: 'Si nos hubieras avisado, te habríamos podido ayudar con la mudanza.',
    translation: 'If you had let us know, we would have been able to help you with the move.',
    correctAnswer: 'habríamos podido',
    options: ['habríamos podido', 'hubiéramos podido', 'podríamos', 'habíamos podido'],
    ruleExplanation: 'In the result clause of a past counterfactual ("Si hubieras..."), standard Spanish uses the Condicional Compuesto ("habríamos podido").',
    paradigmTitle: 'Condicional Compuesto: HABER + PODIDO',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'habría podido' },
      { pronoun: 'Tú', conjugated: 'habrías podido' },
      { pronoun: 'Nosotros/as', conjugated: 'habríamos podido' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'habrían podido' }
    ]
  },
  {
    id: 'es_conj_b2_7',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'HABLA COMO SI (As if he knew...)',
    verbCard: 'SABER (To know)',
    tenseCard: 'Comparación Irreal · "Como si"',
    sentenceTemplate: 'Él opina sobre el proyecto como si _____ todos los datos.',
    fullSentence: 'Él opina sobre el proyecto como si supiera todos los datos.',
    translation: 'He gives opinions on the project as if he knew all the facts.',
    correctAnswer: 'supiera',
    options: ['supiera', 'sabe', 'sepa', 'sabría'],
    ruleExplanation: 'The expression "como si" ("as if") ALWAYS requires the Imperfect (or Pluperfect) Subjunctive, never the Indicative or Present Subjunctive ("supiera").',
    paradigmTitle: 'Imperfecto de Subjuntivo: SABER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'supiera' },
      { pronoun: 'Tú', conjugated: 'supieras' },
      { pronoun: 'Nosotros/as', conjugated: 'supiéramos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'supieran' }
    ]
  },
  {
    id: 'es_conj_b2_8',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'ME EXTRAÑA QUE AYER (Emotion + Past)',
    verbCard: 'DECIR (To say)',
    tenseCard: 'Pretérito Perfecto de Subjuntivo',
    sentenceTemplate: 'Me extraña que ella no _____ nada en la junta de esta mañana.',
    fullSentence: 'Me extraña que ella no haya dicho nada en la junta de esta mañana.',
    translation: 'It surprises me that she did not say anything at this morning’s meeting.',
    correctAnswer: 'haya dicho',
    options: ['haya dicho', 'ha dicho', 'dijera', 'diga'],
    ruleExplanation: 'When a present verb of emotion ("Me extraña que...") refers to a recent completed action ("esta mañana"), we use the Present Perfect Subjunctive ("haya dicho").',
    paradigmTitle: 'Pretérito Perfecto de Subjuntivo: DECIR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'haya dicho' },
      { pronoun: 'Tú', conjugated: 'hayas dicho' },
      { pronoun: 'Nosotros/as', conjugated: 'hayamos dicho' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'hayan dicho' }
    ]
  },
  {
    id: 'es_conj_b2_9',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'OJALÁ (Wish in the Present)',
    verbCard: 'ESTAR (To be - Location)',
    tenseCard: 'Ojalá + Imperfecto de Subjuntivo',
    sentenceTemplate: '¡Ojalá vosotros _____ aquí con nosotros ahora mismo!',
    fullSentence: '¡Ojalá vosotros estuvierais aquí con nosotros ahora mismo!',
    translation: 'I wish you all were here with us right now!',
    correctAnswer: 'estuvierais',
    options: ['estuvierais', 'estáis', 'estaríais', 'estuvisteis'],
    ruleExplanation: 'To express a counterfactual wish about the present ("ahora mismo") after "Ojalá", use the Imperfect Subjunctive (estar → estuvierais).',
    paradigmTitle: 'Imperfecto de Subjuntivo: ESTAR',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'estuviera' },
      { pronoun: 'Tú', conjugated: 'estuvieras' },
      { pronoun: 'Nosotros/as', conjugated: 'estuviéramos' },
      { pronoun: 'Vosotros/as', conjugated: 'estuvierais' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'estuvieran' }
    ]
  },
  {
    id: 'es_conj_b2_10',
    level: 'B2',
    category: 'past-perfect',
    subjectCard: 'LAS PROPUESTAS (Voz Pasiva Plural)',
    verbCard: 'APROBAR (To approve)',
    tenseCard: 'Voz Pasiva · Ser + Participio Concordado',
    sentenceTemplate: 'Las nuevas propuestas _____ por el comité ayer.',
    fullSentence: 'Las nuevas propuestas fueron aprobadas por el comité ayer.',
    translation: 'The new proposals were approved by the committee yesterday.',
    correctAnswer: 'fueron aprobadas',
    options: ['fueron aprobadas', 'fueron aprobado', 'eran aprobadas', 'han aprobado'],
    ruleExplanation: 'In Spanish passive voice ("ser + participle"), the participle must agree in gender and number with the subject: "las propuestas → fueron aprobadas".',
    paradigmTitle: 'Voz Pasiva (SER + Participio)',
    paradigmRows: [
      { pronoun: 'El proyecto (Masc. Sing.)', conjugated: 'fue aprobado' },
      { pronoun: 'La propuesta (Fem. Sing.)', conjugated: 'fue aprobada' },
      { pronoun: 'Las propuestas (Fem. Pl.)', conjugated: 'fueron aprobadas' }
    ]
  },
  {
    id: 'es_conj_b2_11',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'TE ACONSEJÉ QUE NO (Past Advice)',
    verbCard: 'HACER (To do / make)',
    tenseCard: 'Imperfecto de Subjuntivo · Raíz HIC-',
    sentenceTemplate: 'Te aconsejé que no _____ ningún cambio sin copia de seguridad.',
    fullSentence: 'Te aconsejé que no hicieras ningún cambio sin copia de seguridad.',
    translation: 'I advised you not to make any changes without a backup.',
    correctAnswer: 'hicieras',
    options: ['hicieras', 'hagas', 'harías', 'hacías'],
    ruleExplanation: 'HACER takes the stem "hic-" from the 3rd person plural preterite ("hicieron") to form the Imperfect Subjunctive: "hicieras".',
    paradigmTitle: 'Imperfecto de Subjuntivo: HACER',
    paradigmRows: [
      { pronoun: 'Yo / Él / Ella', conjugated: 'hiciera' },
      { pronoun: 'Tú', conjugated: 'hicieras' },
      { pronoun: 'Nosotros/as', conjugated: 'hiciéramos' },
      { pronoun: 'Ellos / Ustedes', conjugated: 'hicieran' }
    ]
  },
  {
    id: 'es_conj_b2_12',
    level: 'B2',
    category: 'advanced-mood',
    subjectCard: 'SI HUBIERA ACEPTADO (Condicional Mixto)',
    verbCard: 'VIVIR (To live - Ahora)',
    tenseCard: 'Condicional Mixto · Pasado → Hoy',
    sentenceTemplate: 'Si hubiera aceptado ese puesto en 2022, hoy _____ en Ginebra.',
    fullSentence: 'Si hubiera aceptado ese puesto en 2022, hoy viviría en Ginebra.',
    translation: 'If I had accepted that position in 2022, today I would live in Geneva.',
    correctAnswer: 'viviría',
    options: ['viviría', 'habría vivido', 'viviera', 'vivo'],
    ruleExplanation: 'When a past counterfactual condition ("Si hubiera aceptado...") has a result in the present ("hoy"), the result clause uses the Simple Conditional ("viviría").',
    paradigmTitle: 'Mixed Conditional in Spanish',
    paradigmRows: [
      { pronoun: 'Past Condition (Si + Pluscuam.)', conjugated: 'Si hubiera aceptado...' },
      { pronoun: 'Present Result (Hoy + Cond. Simple)', conjugated: 'hoy viviría en Ginebra' }
    ]
  }
];
