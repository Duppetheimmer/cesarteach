import { CEFRLevel } from '../types';
import { SurvivalMission, FalseFriendCard } from './survivalAndDictationData';

export interface MemoryVocabPair {
  id: string;
  level: CEFRLevel;
  boardSet: 1 | 2 | 3; // 3 boards of 6 pairs per level = 18 important words per level
  boardTitleEs: string;
  boardTitleEn: string;
  targetWord: string;
  nativeMeaning: string;
  exampleSentence: string;
}

// ============================================================================
// 1. EXPANDED MEMORY MATCH VOCABULARY — 18 IMPORTANT WORDS PER LEVEL (72/LANG)
//    3 BOARDS OF 6 PAIRS PER LEVEL (SET 1, SET 2, SET 3)
// ============================================================================
export const EXPANDED_ENGLISH_MEMORY_PAIRS: MemoryVocabPair[] = [
  // ---------------- LEVEL A1 · SET 1: VIAJES Y VIDA DIARIA (6 PAIRS) ----------------
  { id: 'en_m_a1_1', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Rutina', boardTitleEn: 'Set 1: Travel & Routine', targetWord: 'Schedule', nativeMeaning: 'Horario / Agenda', exampleSentence: 'Let me check my schedule.' },
  { id: 'en_m_a1_2', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Rutina', boardTitleEn: 'Set 1: Travel & Routine', targetWord: 'Breakfast', nativeMeaning: 'Desayuno', exampleSentence: 'We have breakfast at eight.' },
  { id: 'en_m_a1_3', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Rutina', boardTitleEn: 'Set 1: Travel & Routine', targetWord: 'Neighbor', nativeMeaning: 'Vecino / Vecina', exampleSentence: 'Our neighbor is very friendly.' },
  { id: 'en_m_a1_4', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Rutina', boardTitleEn: 'Set 1: Travel & Routine', targetWord: 'Receipt', nativeMeaning: 'Recibo / Comprobante', exampleSentence: 'Could I have the receipt, please?' },
  { id: 'en_m_a1_5', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Rutina', boardTitleEn: 'Set 1: Travel & Routine', targetWord: 'Luggage', nativeMeaning: 'Equipaje', exampleSentence: 'My luggage is already in the taxi.' },
  { id: 'en_m_a1_6', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Rutina', boardTitleEn: 'Set 1: Travel & Routine', targetWord: 'Appointment', nativeMeaning: 'Cita (médica / profesional)', exampleSentence: 'I have a dentist appointment today.' },

  // ---------------- LEVEL A1 · SET 2: CIUDAD Y COMPRAS (6 PAIRS) ----------------
  { id: 'en_m_a1_7', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Ciudad y Compras', boardTitleEn: 'Set 2: City & Shopping', targetWord: 'Groceries', nativeMeaning: 'Compras del supermercado', exampleSentence: 'I need to buy groceries for dinner.' },
  { id: 'en_m_a1_8', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Ciudad y Compras', boardTitleEn: 'Set 2: City & Shopping', targetWord: 'Cashier', nativeMeaning: 'Cajero / Cajera (tienda)', exampleSentence: 'You can pay the cashier over there.' },
  { id: 'en_m_a1_9', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Ciudad y Compras', boardTitleEn: 'Set 2: City & Shopping', targetWord: 'Crosswalk', nativeMeaning: 'Paso de peatones', exampleSentence: 'Wait at the crosswalk until the light is green.' },
  { id: 'en_m_a1_10', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Ciudad y Compras', boardTitleEn: 'Set 2: City & Shopping', targetWord: 'Change', nativeMeaning: 'Cambio / Vuelto (dinero)', exampleSentence: 'Here is your change and your receipt.' },
  { id: 'en_m_a1_11', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Ciudad y Compras', boardTitleEn: 'Set 2: City & Shopping', targetWord: 'Subway', nativeMeaning: 'Metro / Subterráneo', exampleSentence: 'The subway station is two blocks away.' },
  { id: 'en_m_a1_12', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Ciudad y Compras', boardTitleEn: 'Set 2: City & Shopping', targetWord: 'Downstairs', nativeMeaning: 'Abajo (en el piso inferior)', exampleSentence: 'The hotel restaurant is downstairs.' },

  // ---------------- LEVEL A1 · SET 3: TRABAJO, CLIMA Y HOGAR (6 PAIRS) ----------------
  { id: 'en_m_a1_13', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Trabajo y Hogar', boardTitleEn: 'Set 3: Work & Home', targetWord: 'Coworker', nativeMeaning: 'Compañero(a) de trabajo', exampleSentence: 'My coworker helped me with the report.' },
  { id: 'en_m_a1_14', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Trabajo y Hogar', boardTitleEn: 'Set 3: Work & Home', targetWord: 'Umbrella', nativeMeaning: 'Paraguas', exampleSentence: 'Take an umbrella because it looks cloudy.' },
  { id: 'en_m_a1_15', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Trabajo y Hogar', boardTitleEn: 'Set 3: Work & Home', targetWord: 'Available', nativeMeaning: 'Disponible', exampleSentence: 'Is this table available for four people?' },
  { id: 'en_m_a1_16', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Trabajo y Hogar', boardTitleEn: 'Set 3: Work & Home', targetWord: 'Hurry up', nativeMeaning: 'Darse prisa / Apurarse', exampleSentence: 'Hurry up or we will miss the bus!' },
  { id: 'en_m_a1_17', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Trabajo y Hogar', boardTitleEn: 'Set 3: Work & Home', targetWord: 'Kind', nativeMeaning: 'Amable / Bondadoso', exampleSentence: 'Thank you, that is very kind of you.' },
  { id: 'en_m_a1_18', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Trabajo y Hogar', boardTitleEn: 'Set 3: Work & Home', targetWord: 'Wallet', nativeMeaning: 'Billetera / Cartera', exampleSentence: 'I left my wallet on the kitchen table.' },

  // ---------------- LEVEL A2 · SET 1: AEROPUERTO Y GESTIONES (6 PAIRS) ----------------
  { id: 'en_m_a2_1', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Aeropuerto y Trámites', boardTitleEn: 'Set 1: Airport & Errands', targetWord: 'Flight delay', nativeMeaning: 'Retraso de vuelo', exampleSentence: 'There was a two-hour flight delay.' },
  { id: 'en_m_a2_2', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Aeropuerto y Trámites', boardTitleEn: 'Set 1: Airport & Errands', targetWord: 'To borrow', nativeMeaning: 'Pedir prestado', exampleSentence: 'Can I borrow your umbrella?' },
  { id: 'en_m_a2_3', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Aeropuerto y Trámites', boardTitleEn: 'Set 1: Airport & Errands', targetWord: 'To lend', nativeMeaning: 'Prestar (dar prestado)', exampleSentence: 'I can lend you my notebook.' },
  { id: 'en_m_a2_4', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Aeropuerto y Trámites', boardTitleEn: 'Set 1: Airport & Errands', targetWord: 'Crowded', nativeMeaning: 'Lleno de gente / Abarrotado', exampleSentence: 'The subway is crowded at rush hour.' },
  { id: 'en_m_a2_5', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Aeropuerto y Trámites', boardTitleEn: 'Set 1: Airport & Errands', targetWord: 'Refund', nativeMeaning: 'Reembolso / Devolución', exampleSentence: 'They gave me a full refund.' },
  { id: 'en_m_a2_6', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Aeropuerto y Trámites', boardTitleEn: 'Set 1: Airport & Errands', targetWord: 'Abroad', nativeMeaning: 'En el extranjero', exampleSentence: 'She studied abroad for a year.' },

  // ---------------- LEVEL A2 · SET 2: VIVIENDA Y SALUD (6 PAIRS) ----------------
  { id: 'en_m_a2_7', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Vivienda y Salud', boardTitleEn: 'Set 2: Housing & Health', targetWord: 'Landlord', nativeMeaning: 'Casero / Propietario', exampleSentence: 'Our landlord fixed the heating today.' },
  { id: 'en_m_a2_8', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Vivienda y Salud', boardTitleEn: 'Set 2: Housing & Health', targetWord: 'Tenant', nativeMeaning: 'Inquilino / Arrendatario', exampleSentence: 'The new tenant signed the lease.' },
  { id: 'en_m_a2_9', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Vivienda y Salud', boardTitleEn: 'Set 2: Housing & Health', targetWord: 'Prescription', nativeMeaning: 'Receta médica', exampleSentence: 'You need a prescription for this antibiotic.' },
  { id: 'en_m_a2_10', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Vivienda y Salud', boardTitleEn: 'Set 2: Housing & Health', targetWord: 'Symptom', nativeMeaning: 'Síntoma', exampleSentence: 'A sore throat is a common symptom.' },
  { id: 'en_m_a2_11', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Vivienda y Salud', boardTitleEn: 'Set 2: Housing & Health', targetWord: 'Deposit', nativeMeaning: 'Fianza / Depósito', exampleSentence: 'We paid one month as a security deposit.' },
  { id: 'en_m_a2_12', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Vivienda y Salud', boardTitleEn: 'Set 2: Housing & Health', targetWord: 'Insurance', nativeMeaning: 'Seguro (médico / viaje)', exampleSentence: 'Does your travel insurance cover delays?' },

  // ---------------- LEVEL A2 · SET 3: VIDA COTIDIANA Y EXPERIENCIAS (6 PAIRS) ----------------
  { id: 'en_m_a2_13', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Vida Cotidiana', boardTitleEn: 'Set 3: Everyday Life', targetWord: 'Bargain', nativeMeaning: 'Ganga / Muy buena oferta', exampleSentence: 'This winter coat was a real bargain.' },
  { id: 'en_m_a2_14', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Vida Cotidiana', boardTitleEn: 'Set 3: Everyday Life', targetWord: 'Commute', nativeMeaning: 'Trayecto diario al trabajo', exampleSentence: 'My morning commute takes thirty minutes.' },
  { id: 'en_m_a2_15', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Vida Cotidiana', boardTitleEn: 'Set 3: Everyday Life', targetWord: 'To run out of', nativeMeaning: 'Quedarse sin (algo)', exampleSentence: 'We ran out of milk this morning.' },
  { id: 'en_m_a2_16', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Vida Cotidiana', boardTitleEn: 'Set 3: Everyday Life', targetWord: 'To look forward to', nativeMeaning: 'Esperar con ilusión', exampleSentence: 'I look forward to hearing from you.' },
  { id: 'en_m_a2_17', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Vida Cotidiana', boardTitleEn: 'Set 3: Everyday Life', targetWord: 'Grateful', nativeMeaning: 'Agradecido / Agradecida', exampleSentence: 'I am very grateful for your advice.' },
  { id: 'en_m_a2_18', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Vida Cotidiana', boardTitleEn: 'Set 3: Everyday Life', targetWord: 'To afford', nativeMeaning: 'Permitirse pagar (costear)', exampleSentence: 'We can afford a short vacation this summer.' },

  // ---------------- LEVEL B1 · SET 1: PROYECTOS Y EMPLEO (6 PAIRS) ----------------
  { id: 'en_m_b1_1', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Proyectos y Empleo', boardTitleEn: 'Set 1: Projects & Career', targetWord: 'To postpone', nativeMeaning: 'Posponer / Aplazar', exampleSentence: 'We had to postpone the launch.' },
  { id: 'en_m_b1_2', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Proyectos y Empleo', boardTitleEn: 'Set 1: Projects & Career', targetWord: 'Reliable', nativeMeaning: 'Confiable / Fiable', exampleSentence: 'She is our most reliable partner.' },
  { id: 'en_m_b1_3', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Proyectos y Empleo', boardTitleEn: 'Set 1: Projects & Career', targetWord: 'Deadline', nativeMeaning: 'Fecha límite de entrega', exampleSentence: 'The deadline is this Friday.' },
  { id: 'en_m_b1_4', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Proyectos y Empleo', boardTitleEn: 'Set 1: Projects & Career', targetWord: 'To figure out', nativeMeaning: 'Resolver / Descifrar', exampleSentence: 'We need to figure out a solution.' },
  { id: 'en_m_b1_5', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Proyectos y Empleo', boardTitleEn: 'Set 1: Projects & Career', targetWord: 'Accurate', nativeMeaning: 'Preciso / Exacto', exampleSentence: 'These figures are completely accurate.' },
  { id: 'en_m_b1_6', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Proyectos y Empleo', boardTitleEn: 'Set 1: Projects & Career', targetWord: 'Outcome', nativeMeaning: 'Resultado / Desenlace', exampleSentence: 'We achieved a positive outcome.' },

  // ---------------- LEVEL B1 · SET 2: NEGOCIACIÓN Y DECISIONES (6 PAIRS) ----------------
  { id: 'en_m_b1_7', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Negociación y Acuerdos', boardTitleEn: 'Set 2: Negotiation & Decisions', targetWord: 'Feedback', nativeMeaning: 'Retroalimentación / Comentarios', exampleSentence: 'The client gave us constructive feedback.' },
  { id: 'en_m_b1_8', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Negociación y Acuerdos', boardTitleEn: 'Set 2: Negotiation & Decisions', targetWord: 'Worthwhile', nativeMeaning: 'Que vale la pena', exampleSentence: 'Learning a second language is worthwhile.' },
  { id: 'en_m_b1_9', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Negociación y Acuerdos', boardTitleEn: 'Set 2: Negotiation & Decisions', targetWord: 'Challenge', nativeMeaning: 'Reto / Desafío', exampleSentence: 'Our biggest challenge is time management.' },
  { id: 'en_m_b1_10', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Negociación y Acuerdos', boardTitleEn: 'Set 2: Negotiation & Decisions', targetWord: 'To overcome', nativeMeaning: 'Superar (un obstáculo)', exampleSentence: 'She overcame every obstacle with patience.' },
  { id: 'en_m_b1_11', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Negociación y Acuerdos', boardTitleEn: 'Set 2: Negotiation & Decisions', targetWord: 'Budget', nativeMeaning: 'Presupuesto', exampleSentence: 'We completed the event under budget.' },
  { id: 'en_m_b1_12', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Negociación y Acuerdos', boardTitleEn: 'Set 2: Negotiation & Decisions', targetWord: 'Requirement', nativeMeaning: 'Requisito', exampleSentence: 'Fluency in English is a key requirement.' },

  // ---------------- LEVEL B1 · SET 3: FLUIDEZ Y PHRASAL VERBS (6 PAIRS) ----------------
  { id: 'en_m_b1_13', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Fluidez y Phrasal Verbs', boardTitleEn: 'Set 3: Fluency & Phrasal Verbs', targetWord: 'To call off', nativeMeaning: 'Cancelar', exampleSentence: 'They called off the outdoor concert.' },
  { id: 'en_m_b1_14', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Fluidez y Phrasal Verbs', boardTitleEn: 'Set 3: Fluency & Phrasal Verbs', targetWord: 'To bring up', nativeMeaning: 'Mencionar / Sacar un tema', exampleSentence: 'She brought up an important point.' },
  { id: 'en_m_b1_15', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Fluidez y Phrasal Verbs', boardTitleEn: 'Set 3: Fluency & Phrasal Verbs', targetWord: 'To turn down', nativeMeaning: 'Rechazar (una oferta)', exampleSentence: 'He turned down the job offer.' },
  { id: 'en_m_b1_16', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Fluidez y Phrasal Verbs', boardTitleEn: 'Set 3: Fluency & Phrasal Verbs', targetWord: 'Willing', nativeMeaning: 'Dispuesto(a) a', exampleSentence: 'We are willing to adjust the schedule.' },
  { id: 'en_m_b1_17', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Fluidez y Phrasal Verbs', boardTitleEn: 'Set 3: Fluency & Phrasal Verbs', targetWord: 'Aware of', nativeMeaning: 'Consciente de / Al tanto de', exampleSentence: 'Are you aware of the new policy?' },
  { id: 'en_m_b1_18', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Fluidez y Phrasal Verbs', boardTitleEn: 'Set 3: Fluency & Phrasal Verbs', targetWord: 'Look into', nativeMeaning: 'Investigar / Revisar a fondo', exampleSentence: 'We will look into the issue right away.' },

  // ---------------- LEVEL B2 · SET 1: ESTRATEGIA Y DIRECCIÓN (6 PAIRS) ----------------
  { id: 'en_m_b2_1', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Estrategia Ejecutiva', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'Nevertheless', nativeMeaning: 'Sin embargo / No obstante', exampleSentence: 'It was risky; nevertheless, we succeeded.' },
  { id: 'en_m_b2_2', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Estrategia Ejecutiva', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'Thorough', nativeMeaning: 'Exhaustivo / Minucioso', exampleSentence: 'They conducted a thorough audit.' },
  { id: 'en_m_b2_3', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Estrategia Ejecutiva', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'Feasible', nativeMeaning: 'Viable / Factible', exampleSentence: 'Is this timeline financially feasible?' },
  { id: 'en_m_b2_4', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Estrategia Ejecutiva', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'To mitigate', nativeMeaning: 'Mitigar / Reducir riesgos', exampleSentence: 'We took steps to mitigate the risk.' },
  { id: 'en_m_b2_5', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Estrategia Ejecutiva', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'Unprecedented', nativeMeaning: 'Sin precedentes', exampleSentence: 'The company saw unprecedented growth.' },
  { id: 'en_m_b2_6', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Estrategia Ejecutiva', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'Bottleneck', nativeMeaning: 'Cuello de botella / Obstáculo', exampleSentence: 'We solved the production bottleneck.' },

  // ---------------- LEVEL B2 · SET 2: ARGUMENTACIÓN Y ANÁLISIS (6 PAIRS) ----------------
  { id: 'en_m_b2_7', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'Furthermore', nativeMeaning: 'Además / Es más', exampleSentence: 'Furthermore, the data confirms our hypothesis.' },
  { id: 'en_m_b2_8', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'Drawback', nativeMeaning: 'Desventaja / Inconveniente', exampleSentence: 'The only drawback is the initial cost.' },
  { id: 'en_m_b2_9', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'Breakthrough', nativeMeaning: 'Avance decisivo / Gran hallazgo', exampleSentence: 'The team achieved a scientific breakthrough.' },
  { id: 'en_m_b2_10', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'Compelling', nativeMeaning: 'Convincente / Irrefutable', exampleSentence: 'She presented a compelling argument.' },
  { id: 'en_m_b2_11', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'Seamless', nativeMeaning: 'Fluido / Sin interrupciones', exampleSentence: 'We ensured a seamless transition.' },
  { id: 'en_m_b2_12', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'To jeopardize', nativeMeaning: 'Poner en peligro / Comprometer', exampleSentence: 'Delays could jeopardize the contract.' },

  // ---------------- LEVEL B2 · SET 3: FINANZAS Y LIDERAZGO (6 PAIRS) ----------------
  { id: 'en_m_b2_13', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Finanzas y Liderazgo', boardTitleEn: 'Set 3: Finance & Leadership', targetWord: 'Stakeholder', nativeMeaning: 'Parte interesada / Socio clave', exampleSentence: 'We briefed every stakeholder on Friday.' },
  { id: 'en_m_b2_14', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Finanzas y Liderazgo', boardTitleEn: 'Set 3: Finance & Leadership', targetWord: 'To allocate', nativeMeaning: 'Asignar (recursos / fondos)', exampleSentence: 'We allocated more funds to research.' },
  { id: 'en_m_b2_15', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Finanzas y Liderazgo', boardTitleEn: 'Set 3: Finance & Leadership', targetWord: 'Accountable', nativeMeaning: 'Responsable (que rinde cuentas)', exampleSentence: 'Managers are accountable for results.' },
  { id: 'en_m_b2_16', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Finanzas y Liderazgo', boardTitleEn: 'Set 3: Finance & Leadership', targetWord: 'Lucrative', nativeMeaning: 'Rentable / Lucrativo', exampleSentence: 'They signed a lucrative partnership.' },
  { id: 'en_m_b2_17', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Finanzas y Liderazgo', boardTitleEn: 'Set 3: Finance & Leadership', targetWord: 'Milestone', nativeMeaning: 'Hito / Etapa clave', exampleSentence: 'Launching version two was a major milestone.' },
  { id: 'en_m_b2_18', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Finanzas y Liderazgo', boardTitleEn: 'Set 3: Finance & Leadership', targetWord: 'Notwithstanding', nativeMeaning: 'A pesar de / No obstante', exampleSentence: 'Notwithstanding the rain, the event succeeded.' }
];

export const EXPANDED_SPANISH_MEMORY_PAIRS: MemoryVocabPair[] = [
  // ---------------- LEVEL A1 · SET 1: SUPERVIVENCIA Y VIAJES (6 PAIRS) ----------------
  { id: 'es_m_a1_1', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Restaurante', boardTitleEn: 'Set 1: Travel & Dining', targetWord: 'La cuenta', nativeMeaning: 'The bill / check', exampleSentence: '¿Nos trae la cuenta, por favor?' },
  { id: 'es_m_a1_2', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Restaurante', boardTitleEn: 'Set 1: Travel & Dining', targetWord: 'El desayuno', nativeMeaning: 'Breakfast', exampleSentence: 'El desayuno está incluido.' },
  { id: 'es_m_a1_3', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Restaurante', boardTitleEn: 'Set 1: Travel & Dining', targetWord: 'La estación', nativeMeaning: 'The station', exampleSentence: 'La estación de metro está cerca.' },
  { id: 'es_m_a1_4', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Restaurante', boardTitleEn: 'Set 1: Travel & Dining', targetWord: 'Temprano', nativeMeaning: 'Early', exampleSentence: 'Me levanto temprano todos los días.' },
  { id: 'es_m_a1_5', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Restaurante', boardTitleEn: 'Set 1: Travel & Dining', targetWord: 'El equipaje', nativeMeaning: 'The luggage', exampleSentence: 'Mi equipaje está en la habitación.' },
  { id: 'es_m_a1_6', level: 'A1', boardSet: 1, boardTitleEs: 'Mazo 1: Viajes y Restaurante', boardTitleEn: 'Set 1: Travel & Dining', targetWord: 'La esquina', nativeMeaning: 'The street corner', exampleSentence: 'El banco está en la esquina.' },

  // ---------------- LEVEL A1 · SET 2: COMPRAS Y CIUDAD (6 PAIRS) ----------------
  { id: 'es_m_a1_7', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Compras y Ciudad', boardTitleEn: 'Set 2: Shopping & City', targetWord: 'El efectivo', nativeMeaning: 'Cash', exampleSentence: '¿Puedo pagar en efectivo?' },
  { id: 'es_m_a1_8', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Compras y Ciudad', boardTitleEn: 'Set 2: Shopping & City', targetWord: 'La propina', nativeMeaning: 'The tip (gratuity)', exampleSentence: 'Dejamos la propina en la mesa.' },
  { id: 'es_m_a1_9', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Compras y Ciudad', boardTitleEn: 'Set 2: Shopping & City', targetWord: 'La parada', nativeMeaning: 'The bus / tram stop', exampleSentence: 'La parada de autobús está enfrente.' },
  { id: 'es_m_a1_10', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Compras y Ciudad', boardTitleEn: 'Set 2: Shopping & City', targetWord: 'El billete', nativeMeaning: 'The ticket / banknote', exampleSentence: 'Compré un billete de ida y vuelta.' },
  { id: 'es_m_a1_11', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Compras y Ciudad', boardTitleEn: 'Set 2: Shopping & City', targetWord: 'Abierto', nativeMeaning: 'Open', exampleSentence: 'El supermercado sigue abierto.' },
  { id: 'es_m_a1_12', level: 'A1', boardSet: 2, boardTitleEs: 'Mazo 2: Compras y Ciudad', boardTitleEn: 'Set 2: Shopping & City', targetWord: 'El barrio', nativeMeaning: 'The neighborhood', exampleSentence: 'Este barrio es muy tranquilo.' },

  // ---------------- LEVEL A1 · SET 3: HOGAR Y RUTINA (6 PAIRS) ----------------
  { id: 'es_m_a1_13', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Hogar y Rutina', boardTitleEn: 'Set 3: Home & Routine', targetWord: 'La llave', nativeMeaning: 'The key', exampleSentence: 'Aquí tiene la llave de su habitación.' },
  { id: 'es_m_a1_14', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Hogar y Rutina', boardTitleEn: 'Set 3: Home & Routine', targetWord: 'El paraguas', nativeMeaning: 'The umbrella', exampleSentence: 'Lleva el paraguas por si llueve.' },
  { id: 'es_m_a1_15', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Hogar y Rutina', boardTitleEn: 'Set 3: Home & Routine', targetWord: 'Amable', nativeMeaning: 'Kind / polite', exampleSentence: 'La recepcionista es muy amable.' },
  { id: 'es_m_a1_16', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Hogar y Rutina', boardTitleEn: 'Set 3: Home & Routine', targetWord: 'Cansado', nativeMeaning: 'Tired', exampleSentence: 'Estoy un poco cansado después del vuelo.' },
  { id: 'es_m_a1_17', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Hogar y Rutina', boardTitleEn: 'Set 3: Home & Routine', targetWord: 'La cartera', nativeMeaning: 'The wallet / purse', exampleSentence: 'Tengo mi documento en la cartera.' },
  { id: 'es_m_a1_18', level: 'A1', boardSet: 3, boardTitleEs: 'Mazo 3: Hogar y Rutina', boardTitleEn: 'Set 3: Home & Routine', targetWord: 'Cerca de', nativeMeaning: 'Near / close to', exampleSentence: 'Vivimos cerca de la plaza central.' },

  // ---------------- LEVEL A2 · SET 1: GESTIONES Y MUDANZA (6 PAIRS) ----------------
  { id: 'es_m_a2_1', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Gestiones y Mudanza', boardTitleEn: 'Set 1: Errands & Moving', targetWord: 'Mudarse', nativeMeaning: 'To move (change residence)', exampleSentence: 'Nos mudamos a Valencia el mes pasado.' },
  { id: 'es_m_a2_2', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Gestiones y Mudanza', boardTitleEn: 'Set 1: Errands & Moving', targetWord: 'El reembolso', nativeMeaning: 'The refund', exampleSentence: 'Solicité un reembolso completo.' },
  { id: 'es_m_a2_3', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Gestiones y Mudanza', boardTitleEn: 'Set 1: Errands & Moving', targetWord: 'Alquilar', nativeMeaning: 'To rent', exampleSentence: 'Queremos alquilar un piso luminoso.' },
  { id: 'es_m_a2_4', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Gestiones y Mudanza', boardTitleEn: 'Set 1: Errands & Moving', targetWord: 'El retraso', nativeMeaning: 'The delay', exampleSentence: 'El tren llegó con diez minutos de retraso.' },
  { id: 'es_m_a2_5', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Gestiones y Mudanza', boardTitleEn: 'Set 1: Errands & Moving', targetWord: 'Acordarse de', nativeMeaning: 'To remember', exampleSentence: '¿Te acuerdas de nuestra primera clase?' },
  { id: 'es_m_a2_6', level: 'A2', boardSet: 1, boardTitleEs: 'Mazo 1: Gestiones y Mudanza', boardTitleEn: 'Set 1: Errands & Moving', targetWord: 'Darse cuenta', nativeMeaning: 'To realize / notice', exampleSentence: 'Me di cuenta del error a tiempo.' },

  // ---------------- LEVEL A2 · SET 2: SALUD Y VIVIENDA (6 PAIRS) ----------------
  { id: 'es_m_a2_7', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Salud y Vivienda', boardTitleEn: 'Set 2: Health & Housing', targetWord: 'El casero', nativeMeaning: 'The landlord', exampleSentence: 'El casero reparó la caldera hoy.' },
  { id: 'es_m_a2_8', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Salud y Vivienda', boardTitleEn: 'Set 2: Health & Housing', targetWord: 'La receta médica', nativeMeaning: 'The medical prescription', exampleSentence: 'El médico me dio una receta médica.' },
  { id: 'es_m_a2_9', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Salud y Vivienda', boardTitleEn: 'Set 2: Health & Housing', targetWord: 'La fianza', nativeMeaning: 'The security deposit', exampleSentence: 'Pagamos un mes de fianza al firmar.' },
  { id: 'es_m_a2_10', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Salud y Vivienda', boardTitleEn: 'Set 2: Health & Housing', targetWord: 'La avería', nativeMeaning: 'The breakdown / malfunction', exampleSentence: 'Hubo una avería eléctrica en el edificio.' },
  { id: 'es_m_a2_11', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Salud y Vivienda', boardTitleEn: 'Set 2: Health & Housing', targetWord: 'El seguro', nativeMeaning: 'The insurance', exampleSentence: 'El seguro cubre cualquier urgencia.' },
  { id: 'es_m_a2_12', level: 'A2', boardSet: 2, boardTitleEs: 'Mazo 2: Salud y Vivienda', boardTitleEn: 'Set 2: Health & Housing', targetWord: 'Mejorar', nativeMeaning: 'To get better / improve', exampleSentence: 'Espero que te mejores muy pronto.' },

  // ---------------- LEVEL A2 · SET 3: VIAJES Y CONECTORES (6 PAIRS) ----------------
  { id: 'es_m_a2_13', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Viajes y Conectores', boardTitleEn: 'Set 3: Travel & Connectors', targetWord: 'Hacer escala', nativeMeaning: 'To have a layover', exampleSentence: 'Nuestro vuelo hace escala en Bogotá.' },
  { id: 'es_m_a2_14', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Viajes y Conectores', boardTitleEn: 'Set 3: Travel & Connectors', targetWord: 'La tarjeta de embarque', nativeMeaning: 'The boarding pass', exampleSentence: 'Descargué la tarjeta de embarque en el móvil.' },
  { id: 'es_m_a2_15', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Viajes y Conectores', boardTitleEn: 'Set 3: Travel & Connectors', targetWord: 'Por si acaso', nativeMeaning: 'Just in case', exampleSentence: 'Llevé una chaqueta por si acaso.' },
  { id: 'es_m_a2_16', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Viajes y Conectores', boardTitleEn: 'Set 3: Travel & Connectors', targetWord: 'De vez en cuando', nativeMeaning: 'Once in a while', exampleSentence: 'Salimos a cenar fuera de vez en cuando.' },
  { id: 'es_m_a2_17', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Viajes y Conectores', boardTitleEn: 'Set 3: Travel & Connectors', targetWord: 'Agradecido', nativeMeaning: 'Grateful / thankful', exampleSentence: 'Estoy muy agradecido por tu hospitalidad.' },
  { id: 'es_m_a2_18', level: 'A2', boardSet: 3, boardTitleEs: 'Mazo 3: Viajes y Conectores', boardTitleEn: 'Set 3: Travel & Connectors', targetWord: 'Enseguida', nativeMeaning: 'Right away / immediately', exampleSentence: 'El camarero nos atendió enseguida.' },

  // ---------------- LEVEL B1 · SET 1: TRABAJO Y PROYECTOS (6 PAIRS) ----------------
  { id: 'es_m_b1_1', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Trabajo y Proyectos', boardTitleEn: 'Set 1: Work & Projects', targetWord: 'El plazo', nativeMeaning: 'The deadline / timeframe', exampleSentence: 'El plazo termina este viernes.' },
  { id: 'es_m_b1_2', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Trabajo y Proyectos', boardTitleEn: 'Set 1: Work & Projects', targetWord: 'Aplazar', nativeMeaning: 'To postpone / put off', exampleSentence: 'Tuvimos que aplazar la reunión.' },
  { id: 'es_m_b1_3', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Trabajo y Proyectos', boardTitleEn: 'Set 1: Work & Projects', targetWord: 'Fiable', nativeMeaning: 'Reliable / trustworthy', exampleSentence: 'Es una fuente muy fiable.' },
  { id: 'es_m_b1_4', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Trabajo y Proyectos', boardTitleEn: 'Set 1: Work & Projects', targetWord: 'Llevar a cabo', nativeMeaning: 'To carry out / execute', exampleSentence: 'Llevaremos a cabo el proyecto.' },
  { id: 'es_m_b1_5', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Trabajo y Proyectos', boardTitleEn: 'Set 1: Work & Projects', targetWord: 'Sin embargo', nativeMeaning: 'However / nevertheless', exampleSentence: 'Estaba lloviendo; sin embargo, fuimos.' },
  { id: 'es_m_b1_6', level: 'B1', boardSet: 1, boardTitleEs: 'Mazo 1: Trabajo y Proyectos', boardTitleEn: 'Set 1: Work & Projects', targetWord: 'Merecer la pena', nativeMeaning: 'To be worth it', exampleSentence: 'El esfuerzo realmente merece la pena.' },

  // ---------------- LEVEL B1 · SET 2: ACUERDOS Y OPINIONES (6 PAIRS) ----------------
  { id: 'es_m_b1_7', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Acuerdos y Opiniones', boardTitleEn: 'Set 2: Agreements & Opinions', targetWord: 'Tener en cuenta', nativeMeaning: 'To take into account', exampleSentence: 'Debemos tener en cuenta el presupuesto.' },
  { id: 'es_m_b1_8', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Acuerdos y Opiniones', boardTitleEn: 'Set 2: Agreements & Opinions', targetWord: 'Echar una mano', nativeMeaning: 'To lend a hand / help', exampleSentence: '¿Me puedes echar una mano con esto?' },
  { id: 'es_m_b1_9', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Acuerdos y Opiniones', boardTitleEn: 'Set 2: Agreements & Opinions', targetWord: 'Ponerse de acuerdo', nativeMeaning: 'To reach an agreement', exampleSentence: 'Por fin nos pusimos de acuerdo.' },
  { id: 'es_m_b1_10', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Acuerdos y Opiniones', boardTitleEn: 'Set 2: Agreements & Opinions', targetWord: 'El presupuesto', nativeMeaning: 'The budget / quote', exampleSentence: 'Aprobaron el presupuesto anual.' },
  { id: 'es_m_b1_11', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Acuerdos y Opiniones', boardTitleEn: 'Set 2: Agreements & Opinions', targetWord: 'El requisito', nativeMeaning: 'The requirement', exampleSentence: 'Cumple con todos los requisitos del puesto.' },
  { id: 'es_m_b1_12', level: 'B1', boardSet: 2, boardTitleEs: 'Mazo 2: Acuerdos y Opiniones', boardTitleEn: 'Set 2: Agreements & Opinions', targetWord: 'A pesar de', nativeMeaning: 'Despite / in spite of', exampleSentence: 'Lo logramos a pesar de las dificultades.' },

  // ---------------- LEVEL B1 · SET 3: VIDA PROFESIONAL Y RETOS (6 PAIRS) ----------------
  { id: 'es_m_b1_13', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Carrera y Retos', boardTitleEn: 'Set 3: Career & Challenges', targetWord: 'Superar', nativeMeaning: 'To overcome / exceed', exampleSentence: 'Superamos todas las metas del trimestre.' },
  { id: 'es_m_b1_14', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Carrera y Retos', boardTitleEn: 'Set 3: Career & Challenges', targetWord: 'El desafío', nativeMeaning: 'The challenge', exampleSentence: 'Acepté este nuevo desafío profesional.' },
  { id: 'es_m_b1_15', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Carrera y Retos', boardTitleEn: 'Set 3: Career & Challenges', targetWord: 'Dispuesto a', nativeMeaning: 'Willing to', exampleSentence: 'Estoy dispuesto a colaborar en el equipo.' },
  { id: 'es_m_b1_16', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Carrera y Retos', boardTitleEn: 'Set 3: Career & Challenges', targetWord: 'Encargarse de', nativeMeaning: 'To take charge of / handle', exampleSentence: 'Ella se encarga de la logística.' },
  { id: 'es_m_b1_17', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Carrera y Retos', boardTitleEn: 'Set 3: Career & Challenges', targetWord: 'Rechazar', nativeMeaning: 'To turn down / reject', exampleSentence: 'Decidió rechazar aquella oferta.' },
  { id: 'es_m_b1_18', level: 'B1', boardSet: 3, boardTitleEs: 'Mazo 3: Carrera y Retos', boardTitleEn: 'Set 3: Career & Challenges', targetWord: 'Hoy en día', nativeMeaning: 'Nowadays', exampleSentence: 'Hoy en día el teletrabajo es muy común.' },

  // ---------------- LEVEL B2 · SET 1: ESTRATEGIA Y DIRECCIÓN (6 PAIRS) ----------------
  { id: 'es_m_b2_1', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Dirección y Estrategia', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'Imprescindible', nativeMeaning: 'Essential / indispensable', exampleSentence: 'La puntualidad es imprescindible aquí.' },
  { id: 'es_m_b2_2', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Dirección y Estrategia', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'El desenlace', nativeMeaning: 'The outcome / resolution', exampleSentence: 'La negociación tuvo un buen desenlace.' },
  { id: 'es_m_b2_3', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Dirección y Estrategia', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'Dar por sentado', nativeMeaning: 'To take for granted', exampleSentence: 'No debemos dar nada por sentado.' },
  { id: 'es_m_b2_4', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Dirección y Estrategia', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'Rentable', nativeMeaning: 'Profitable / cost-effective', exampleSentence: 'La inversión resultó muy rentable.' },
  { id: 'es_m_b2_5', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Dirección y Estrategia', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'A raíz de', nativeMeaning: 'As a result of / following', exampleSentence: 'Todo cambió a raíz de aquel acuerdo.' },
  { id: 'es_m_b2_6', level: 'B2', boardSet: 1, boardTitleEs: 'Mazo 1: Dirección y Estrategia', boardTitleEn: 'Set 1: Executive Strategy', targetWord: 'Poner en marcha', nativeMeaning: 'To launch / set in motion', exampleSentence: 'Pusimos en marcha la nueva estrategia.' },

  // ---------------- LEVEL B2 · SET 2: ARGUMENTACIÓN Y DIPLOMACIA (6 PAIRS) ----------------
  { id: 'es_m_b2_7', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'No obstante', nativeMeaning: 'Nevertheless / notwithstanding', exampleSentence: 'Es complejo; no obstante, es viable.' },
  { id: 'es_m_b2_8', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'Factible', nativeMeaning: 'Feasible / achievable', exampleSentence: 'El plan es técnicamente factible.' },
  { id: 'es_m_b2_9', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'Exhaustivo', nativeMeaning: 'Thorough / comprehensive', exampleSentence: 'Hicimos un análisis exhaustivo de los datos.' },
  { id: 'es_m_b2_10', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'Sin precedentes', nativeMeaning: 'Unprecedented', exampleSentence: 'Logramos un crecimiento sin precedentes.' },
  { id: 'es_m_b2_11', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'El inconveniente', nativeMeaning: 'The drawback / downside', exampleSentence: 'El único inconveniente es la distancia.' },
  { id: 'es_m_b2_12', level: 'B2', boardSet: 2, boardTitleEs: 'Mazo 2: Argumentación Formal', boardTitleEn: 'Set 2: Formal Argumentation', targetWord: 'Contundente', nativeMeaning: 'Compelling / decisive', exampleSentence: 'Presentó pruebas muy contundentes.' },

  // ---------------- LEVEL B2 · SET 3: FINANZAS Y GESTIÓN AVANZADA (6 PAIRS) ----------------
  { id: 'es_m_b2_13', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Gestión y Liderazgo', boardTitleEn: 'Set 3: Leadership & Management', targetWord: 'El hito', nativeMeaning: 'The milestone', exampleSentence: 'Esta apertura marca un hito histórico.' },
  { id: 'es_m_b2_14', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Gestión y Liderazgo', boardTitleEn: 'Set 3: Leadership & Management', targetWord: 'Mitigar', nativeMeaning: 'To mitigate / reduce risks', exampleSentence: 'Tomamos medidas para mitigar el impacto.' },
  { id: 'es_m_b2_15', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Gestión y Liderazgo', boardTitleEn: 'Set 3: Leadership & Management', targetWord: 'Asignar recursos', nativeMeaning: 'To allocate resources', exampleSentence: 'Asignamos más recursos a innovación.' },
  { id: 'es_m_b2_16', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Gestión y Liderazgo', boardTitleEn: 'Set 3: Leadership & Management', targetWord: 'Rendir cuentas', nativeMeaning: 'To be accountable / report', exampleSentence: 'La directiva rinde cuentas cada trimestre.' },
  { id: 'es_m_b2_17', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Gestión y Liderazgo', boardTitleEn: 'Set 3: Leadership & Management', targetWord: 'El cuello de botella', nativeMeaning: 'The bottleneck', exampleSentence: 'Resolvimos el cuello de botella logístico.' },
  { id: 'es_m_b2_18', level: 'B2', boardSet: 3, boardTitleEs: 'Mazo 3: Gestión y Liderazgo', boardTitleEn: 'Set 3: Leadership & Management', targetWord: 'Poner en peligro', nativeMeaning: 'To jeopardize / endanger', exampleSentence: 'Nada debe poner en peligro la calidad.' }
];

// ============================================================================
// 2. EXTRA SURVIVAL MISSIONS — 2 MORE PER LEVEL (8/LANG -> 5 MISSIONS/LEVEL)
// ============================================================================
export const EXTRA_ENGLISH_SURVIVAL_MISSIONS: SurvivalMission[] = [
  // ---------------- LEVEL A1 (MISSIONS #4 & #5) ----------------
  {
    id: 'en_surv_a1_4',
    level: 'A1',
    title: 'Estación de Tren: Boleto y Andén',
    locationBadge: 'Estación Central · A1',
    scenarioSummary: 'Necesitas comprar un boleto de ida y vuelta a Oxford, preguntar de qué andén sale y a qué hora llega.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Taquillero (Ticket Clerk)',
        npcLine: 'Good morning! Where are you traveling to today?',
        npcTranslation: '¡Buenos días! ¿Adónde viaja hoy?',
        missionObjective: 'Pide un boleto de ida y vuelta (round-trip / return ticket) a Oxford para hoy.',
        options: [
          'Could I have a round-trip ticket to Oxford for today, please?',
          'I want go and come back Oxford today.',
          'Give me two trains for Oxford.'
        ],
        correctOption: 'Could I have a round-trip ticket to Oxford for today, please?',
        feedbackExplanation: 'En inglés, "round-trip ticket" (EE. UU.) o "return ticket" (Reino Unido) significa boleto de ida y vuelta.'
      },
      {
        stepNumber: 2,
        npcRole: 'Taquillero (Ticket Clerk)',
        npcLine: 'Here is your ticket. The next train leaves in fifteen minutes.',
        npcTranslation: 'Aquí tiene su boleto. El próximo tren sale en quince minutos.',
        missionObjective: 'Pregunta de qué andén (platform) sale el tren.',
        options: [
          'Which platform does the train leave from?',
          'Where is the street of the train?',
          'How many platforms have the train?'
        ],
        correctOption: 'Which platform does the train leave from?',
        feedbackExplanation: 'Para trenes siempre usamos "platform" (andén) y la estructura "¿Which platform does the train leave from?".'
      },
      {
        stepNumber: 3,
        npcRole: 'Taquillero (Ticket Clerk)',
        npcLine: 'It leaves from Platform 4, right over there.',
        npcTranslation: 'Sale del andén 4, justo por allá.',
        missionObjective: 'Agradece y pregunta a qué hora llega el tren a Oxford.',
        options: [
          'Thank you! What time does it arrive in Oxford?',
          'Thanks! What hour it gets to Oxford?',
          'Thank you! When is Oxford?'
        ],
        correctOption: 'Thank you! What time does it arrive in Oxford?',
        feedbackExplanation: 'Para preguntar la hora de un horario usamos "What time does it arrive in + ciudad?".'
      }
    ]
  },
  {
    id: 'en_surv_a1_5',
    level: 'A1',
    title: 'Supermercado: Pasillo y Pago',
    locationBadge: 'Supermercado Local · A1',
    scenarioSummary: 'Estás buscando aceite de oliva en el supermercado y luego quieres pagar en efectivo en la caja.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Empleado del Supermercado',
        npcLine: 'Hi there! Can I help you find something?',
        npcTranslation: '¡Hola! ¿Puedo ayudarle a encontrar algo?',
        missionObjective: 'Pregunta en qué pasillo (aisle) está el aceite de oliva.',
        options: [
          'Yes, please. Which aisle is the olive oil in?',
          'Where have you the olive oil?',
          'How do I arrive to olive oil?'
        ],
        correctOption: 'Yes, please. Which aisle is the olive oil in?',
        feedbackExplanation: '"Aisle" (pronunciado /aɪl/, con la "s" muda) significa pasillo de supermercado o avión.'
      },
      {
        stepNumber: 2,
        npcRole: 'Cajera (Cashier)',
        npcLine: 'That comes to eighteen dollars and fifty cents. Do you need a bag?',
        npcTranslation: 'Son dieciocho dólares con cincuenta centavos. ¿Necesita una bolsa?',
        missionObjective: 'Di que no necesitas bolsa porque trajiste la tuya y pregunta si puedes pagar en efectivo.',
        options: [
          'No, thank you, I brought my own bag. Can I pay in cash?',
          'No bag. I pay with cash money?',
          'I have bag. Is possible cash?'
        ],
        correctOption: 'No, thank you, I brought my own bag. Can I pay in cash?',
        feedbackExplanation: 'Recuerda: se dice "pay IN cash" (en efectivo) y "pay BY card" (con tarjeta).'
      },
      {
        stepNumber: 3,
        npcRole: 'Cajera (Cashier)',
        npcLine: 'Of course! Out of twenty... here is one dollar and fifty cents change.',
        npcTranslation: '¡Por supuesto! De veinte... aquí tiene un dólar con cincuenta de cambio.',
        missionObjective: 'Agradece con amabilidad y despídete deseándole un buen día.',
        options: [
          'Thank you very much! Have a great day!',
          'Good night and welcome!',
          'You are welcome for the change!'
        ],
        correctOption: 'Thank you very much! Have a great day!',
        feedbackExplanation: '"Have a great day!" o "Have a nice day!" es la despedida natural al salir de cualquier comercio.'
      }
    ]
  },

  // ---------------- LEVEL A2 (MISSIONS #4 & #5) ----------------
  {
    id: 'en_surv_a2_4',
    level: 'A2',
    title: 'Reserva de Auto: Seguro y Kilometraje',
    locationBadge: 'Alquiler de Autos · A2',
    scenarioSummary: 'Recoges un auto alquilado y necesitas confirmar que tenga kilometraje ilimitado y seguro a todo riesgo.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Agente de Alquiler (Rental Agent)',
        npcLine: 'Welcome! I have your reservation for a compact car. May I see your driver’s license?',
        npcTranslation: '¡Bienvenido! Tengo su reserva para un auto compacto. ¿Me permite ver su licencia de conducir?',
        missionObjective: 'Entrega tu licencia y pregunta si la tarifa incluye kilometraje ilimitado (unlimited mileage).',
        options: [
          'Here it is. Does this rate include unlimited mileage?',
          'Take it. Has the car infinite kilometers?',
          'Here is my license. Can I drive without limit?'
        ],
        correctOption: 'Here it is. Does this rate include unlimited mileage?',
        feedbackExplanation: '"Unlimited mileage" es el término estándar en alquiler de vehículos para kilometraje ilimitado.'
      },
      {
        stepNumber: 2,
        npcRole: 'Agente de Alquiler (Rental Agent)',
        npcLine: 'Yes, it does. Would you like to add full insurance coverage just in case?',
        npcTranslation: 'Sí, lo incluye. ¿Le gustaría añadir cobertura de seguro completo por si acaso?',
        missionObjective: 'Acepta el seguro completo y pregunta cuánto cuesta por día.',
        options: [
          'Yes, I would prefer full coverage. How much extra is it per day?',
          'Yes, put all insurance. How many moneys for day?',
          'I want full safe. What price has it?'
        ],
        correctOption: 'Yes, I would prefer full coverage. How much extra is it per day?',
        feedbackExplanation: '"Full coverage" (cobertura total) y "per day" (por día) son esenciales al contratar servicios.'
      },
      {
        stepNumber: 3,
        npcRole: 'Agente de Alquiler (Rental Agent)',
        npcLine: 'It is twelve dollars a day, and the tank is full right now.',
        npcTranslation: 'Son doce dólares al día, y el tanque está lleno ahora mismo.',
        missionObjective: 'Confirma que devolverás el auto con el tanque lleno el domingo por la tarde.',
        options: [
          'Sounds good! I will return it with a full tank on Sunday afternoon.',
          'Okay! I give back the car full in Sunday.',
          'Fine! I return the gas at Sunday.'
        ],
        correctOption: 'Sounds good! I will return it with a full tank on Sunday afternoon.',
        feedbackExplanation: 'Para días de la semana siempre usamos la preposición ON ("on Sunday afternoon").'
      }
    ]
  },
  {
    id: 'en_surv_a2_5',
    level: 'A2',
    title: 'Soporte Técnico: Cambio de Contraseña y Acceso',
    locationBadge: 'Mesa de Ayuda IT · A2',
    scenarioSummary: 'No puedes entrar a tu correo corporativo después de una actualización y llamas a soporte técnico.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Soporte IT (IT Helpdesk)',
        npcLine: 'IT Support Desk, this is Kevin. What seems to be the problem?',
        npcTranslation: 'Mesa de Soporte IT, habla Kevin. ¿Cuál parece ser el problema?',
        missionObjective: 'Explica que no has podido iniciar sesión (log in) en tu correo desde esta mañana.',
        options: [
          "Hi Kevin, I haven't been able to log in to my email account since this morning.",
          'Hello, I cannot enter inside my mail from today morning.',
          'My email is broken and not open since eight.'
        ],
        correctOption: "Hi Kevin, I haven't been able to log in to my email account since this morning.",
        feedbackExplanation: 'Usamos Present Perfect ("haven\'t been able to log in") con "since this morning" porque el problema continúa ahora.'
      },
      {
        stepNumber: 2,
        npcRole: 'Soporte IT (IT Helpdesk)',
        npcLine: 'Did you get an error message when you typed your password?',
        npcTranslation: '¿Recibiste un mensaje de error cuando escribiste tu contraseña?',
        missionObjective: 'Explica que decía que tu contraseña había expirado mientras estabas de vacaciones.',
        options: [
          'Yes, it said my password expired while I was on vacation last week.',
          'Yes, it told my password dead during my holidays.',
          'The screen said password finish when I was in vacation.'
        ],
        correctOption: 'Yes, it said my password expired while I was on vacation last week.',
        feedbackExplanation: '"On vacation" (de vacaciones) y "expired" (expiró / caducó) son las colocaciones naturales.'
      },
      {
        stepNumber: 3,
        npcRole: 'Soporte IT (IT Helpdesk)',
        npcLine: 'I just sent a temporary reset link to your phone. Did you receive it?',
        npcTranslation: 'Acabo de enviar un enlace temporal de restablecimiento a tu teléfono. ¿Lo recibiste?',
        missionObjective: 'Confirma que acaba de llegar y que ya pudiste entrar sin problemas.',
        options: [
          'Yes, it just arrived and I logged in successfully. Thanks for your help!',
          'Yes, it came now and I entered good. Thank you!',
          'I have the link and now is working fine.'
        ],
        correctOption: 'Yes, it just arrived and I logged in successfully. Thanks for your help!',
        feedbackExplanation: '"It just arrived" y "logged in successfully" expresan con precisión que el acceso quedó resuelto.'
      }
    ]
  },

  // ---------------- LEVEL B1 (MISSIONS #4 & #5) ----------------
  {
    id: 'en_surv_b1_4',
    level: 'B1',
    title: 'Reunión de Equipo: Reorganizar Carga de Trabajo',
    locationBadge: 'Gestión de Proyectos · B1',
    scenarioSummary: 'Dos compañeros están enfermos y debes proponer cómo redistribuir las tareas prioritarias sin retrasar la entrega.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Líder de Proyecto (Project Lead)',
        npcLine: 'Since Mark and Laura are out sick today, how should we handle the client report?',
        npcTranslation: 'Dado que Mark y Laura están de baja por enfermedad hoy, ¿cómo deberíamos manejar el informe del cliente?',
        missionObjective: 'Propón encargarte tú del análisis de datos si alguien más revisa las diapositivas.',
        options: [
          'I can take care of the data analysis as long as someone else proofreads the slides.',
          'I make the data if other person looks the presentation.',
          'Let me do the numbers and you make the slides.'
        ],
        correctOption: 'I can take care of the data analysis as long as someone else proofreads the slides.',
        feedbackExplanation: '"Take care of" (encargarse de), "as long as" (siempre y cuando) y "proofread" (revisar textos) son propios del nivel B1.'
      },
      {
        stepNumber: 2,
        npcRole: 'Líder de Proyecto (Project Lead)',
        npcLine: 'Good idea. Do you think we will still meet Friday’s deadline?',
        npcTranslation: 'Buena idea. ¿Crees que aun así cumpliremos con la fecha límite del viernes?',
        missionObjective: 'Expresa que si priorizamos las secciones clave hoy, estaremos listos a tiempo.',
        options: [
          'If we prioritize the core sections today, we should be able to finish right on schedule.',
          'If we will work fast today, we finish Friday.',
          'Yes, we arrive to the Friday limit without problem.'
        ],
        correctOption: 'If we prioritize the core sections today, we should be able to finish right on schedule.',
        feedbackExplanation: '"Meet a deadline" y "finish right on schedule" (terminar según lo programado) demuestran fluidez profesional.'
      },
      {
        stepNumber: 3,
        npcRole: 'Líder de Proyecto (Project Lead)',
        npcLine: 'Great! Let’s touch base again at four o’clock to check our progress.',
        npcTranslation: '¡Genial! Volvamos a hablar a las cuatro para revisar nuestro avance.',
        missionObjective: 'Confirma la reunión de las cuatro y promete tener el primer borrador listo para entonces.',
        options: [
          'Sounds like a plan. I will have the first draft ready by four.',
          'Okay, I am with the draft until four hours.',
          'Perfect, at four I show you the paper.'
        ],
        correctOption: 'Sounds like a plan. I will have the first draft ready by four.',
        feedbackExplanation: 'La preposición "by four" significa "a más tardar a las cuatro / para las cuatro".'
      }
    ]
  },
  {
    id: 'en_surv_b1_5',
    level: 'B1',
    title: 'Aerolínea: Vuelo Sobrecomprado y Compensación',
    locationBadge: 'Puerta de Embarque · B1',
    scenarioSummary: 'La aerolínea tiene sobreventa (overbooking) y necesitas negociar un asiento en el siguiente vuelo más compensación.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Supervisor de Puerta (Gate Agent)',
        npcLine: 'We apologize, but this flight is overbooked and we are looking for volunteers to take the evening flight.',
        npcTranslation: 'Pedimos disculpas, pero este vuelo está sobrevendido y buscamos voluntarios para tomar el vuelo de la tarde.',
        missionObjective: 'Pregunta qué compensación ofrecen si aceptas ceder tu asiento.',
        options: [
          'What kind of compensation are you offering if I volunteer to take the later flight?',
          'How much money you give me if I wait here?',
          'What is my prize for not flying now?'
        ],
        correctOption: 'What kind of compensation are you offering if I volunteer to take the later flight?',
        feedbackExplanation: '"Volunteer to take the later flight" y "What kind of compensation..." plantean la negociación con cortesía y firmeza.'
      },
      {
        stepNumber: 2,
        npcRole: 'Supervisor de Puerta (Gate Agent)',
        npcLine: 'We are offering a three-hundred-dollar travel voucher and a confirmed seat at 6:00 PM.',
        npcTranslation: 'Ofrecemos un bono de viaje de trescientos dólares y un asiento confirmado a las 6:00 PM.',
        missionObjective: 'Pide que incluyan acceso a la sala VIP (lounge access) y un vale de comida mientras esperas.',
        options: [
          'I would be willing to accept that if you could also include lounge access and a meal voucher.',
          'Put me also the VIP room and food free please.',
          'I accept only with food ticket and sofa room.'
        ],
        correctOption: 'I would be willing to accept that if you could also include lounge access and a meal voucher.',
        feedbackExplanation: '"I would be willing to accept that if you could..." es la estructura condicional B1 perfecta para negociar beneficios extra.'
      },
      {
        stepNumber: 3,
        npcRole: 'Supervisor de Puerta (Gate Agent)',
        npcLine: 'Deal! I can issue the lounge pass and your new boarding pass right away.',
        npcTranslation: '¡Trato hecho! Puedo emitir el pase a la sala VIP y su nueva tarjeta de embarque enseguida.',
        missionObjective: 'Agradece y verifica que tu maleta facturada sea transferida automáticamente al vuelo de las 6:00 PM.',
        options: [
          'Thank you! Could you just make sure my checked luggage is transferred to the six o’clock flight?',
          'Thanks! Look that my bag goes in the same plane at six.',
          'Good! My suitcase will move alone to the six flight?'
        ],
        correctOption: 'Thank you! Could you just make sure my checked luggage is transferred to the six o’clock flight?',
        feedbackExplanation: 'Usa la voz pasiva "is transferred" y "checked luggage" (equipaje facturado) para confirmar tu equipaje.'
      }
    ]
  },

  // ---------------- LEVEL B2 (MISSIONS #4 & #5) ----------------
  {
    id: 'en_surv_b2_4',
    level: 'B2',
    title: 'Negociación Salarial y Ascenso Anual',
    locationBadge: 'Revisión Ejecutiva · B2',
    scenarioSummary: 'En tu evaluación anual has superado todas las métricas y negocias un ajuste salarial acorde a tus nuevas responsabilidades.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Directora de Operaciones (VP of Operations)',
        npcLine: 'Your performance this year has been outstanding, especially leading the regional expansion.',
        npcTranslation: 'Tu desempeño este año ha sido sobresaliente, especialmente liderando la expansión regional.',
        missionObjective: 'Agradece el reconocimiento y plantea que, dado que tu alcance de responsabilidades se ha ampliado, deseas revisar tu compensación.',
        options: [
          'I appreciate the recognition. Given that my scope of responsibilities has expanded significantly, I would like to discuss a salary adjustment.',
          'Thank you. Because I do more work now, I want you to pay me more salary.',
          'I am happy you noticed. Now it is time for a bigger paycheck.'
        ],
        correctOption: 'I appreciate the recognition. Given that my scope of responsibilities has expanded significantly, I would like to discuss a salary adjustment.',
        feedbackExplanation: '"Given that my scope of responsibilities has expanded..." introduce una negociación salarial B2 con total profesionalismo.'
      },
      {
        stepNumber: 2,
        npcRole: 'Directora de Operaciones (VP of Operations)',
        npcLine: 'Our standard annual increase is five percent, though budgets are tight this quarter.',
        npcTranslation: 'Nuestro incremento anual estándar es del cinco por ciento, aunque los presupuestos están ajustados este trimestre.',
        missionObjective: 'Argumenta con datos que tu equipo generó un 20% más de ingresos y propón un incremento del 12% o un bono por desempeño.',
        options: [
          'While I understand the budget constraints, my team generated a twenty-percent revenue increase; a twelve-percent adjustment or a performance bonus would better reflect that impact.',
          'Five percent is too small for me. My team made twenty percent more money so give me twelve percent.',
          'Even with tight budget, I deserve twelve percent because of the twenty percent sales.'
        ],
        correctOption: 'While I understand the budget constraints, my team generated a twenty-percent revenue increase; a twelve-percent adjustment or a performance bonus would better reflect that impact.',
        feedbackExplanation: 'Reconocer la objeción ("While I understand the budget constraints...") antes de presentar evidencia cuantificable es clave en inglés ejecutivo.'
      },
      {
        stepNumber: 3,
        npcRole: 'Directora de Operaciones (VP of Operations)',
        npcLine: 'That is a fair point. I can approve an eight-percent base increase now plus a five-percent quarterly bonus.',
        npcTranslation: 'Es un argumento justo. Puedo aprobar un aumento base del ocho por ciento ahora más un bono trimestral del cinco por ciento.',
        missionObjective: 'Acepta la propuesta y solicita que el acuerdo quede reflejado por escrito a partir del próximo mes.',
        options: [
          'That sounds like a balanced compromise. Could we have those terms put in writing effective next month?',
          'Okay, I take the eight and five percent. Write it on paper for next month.',
          'Good deal! Make a contract with this money for next month.'
        ],
        correctOption: 'That sounds like a balanced compromise. Could we have those terms put in writing effective next month?',
        feedbackExplanation: 'La estructura causativa "have those terms put in writing effective next month" cierra el acuerdo con precisión legal y ejecutiva.'
      }
    ]
  },
  {
    id: 'en_surv_b2_5',
    level: 'B2',
    title: 'Propiedad Intelectual y Cláusula de Confidencialidad',
    locationBadge: 'Comité Legal · B2',
    scenarioSummary: 'Estás revisando un contrato con un proveedor tecnológico y debes exigir que una cláusula ambigua de datos sea modificada.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Abogado del Proveedor (Vendor Counsel)',
        npcLine: 'We have sent over the final service agreement. Are you ready to sign off on it today?',
        npcTranslation: 'Hemos enviado el acuerdo final de servicio. ¿Están listos para firmarlo hoy?',
        missionObjective: 'Explica que no pueden firmar hasta que se aclare la cláusula sobre propiedad de datos en la sección 4.',
        options: [
          'Not quite yet. We cannot sign off on the agreement until the ambiguity regarding data ownership in Section 4 is resolved.',
          'No, we do not sign today because Section 4 about data is very confusing.',
          'We must wait. The clause four has a problem with who owns the data.'
        ],
        correctOption: 'Not quite yet. We cannot sign off on the agreement until the ambiguity regarding data ownership in Section 4 is resolved.',
        feedbackExplanation: '"Sign off on" (aprobar/firmar formalmente) y "ambiguity regarding data ownership" son términos esenciales en negociación contractual B2.'
      },
      {
        stepNumber: 2,
        npcRole: 'Abogado del Proveedor (Vendor Counsel)',
        npcLine: 'That clause simply allows us to use anonymized data to improve our algorithms.',
        npcTranslation: 'Esa cláusula simplemente nos permite usar datos anonimizados para mejorar nuestros algoritmos.',
        missionObjective: 'Exige que quede estipulado explícitamente que ningún dato confidencial de clientes será compartido con terceros.',
        options: [
          'Be that as it may, we need the contract to explicitly stipulate that no proprietary client data will be disclosed to third parties.',
          'Maybe, but you must write clearly that you will not give our client secrets to other companies.',
          'Even so, put in the paper that third parties cannot see our data.'
        ],
        correctOption: 'Be that as it may, we need the contract to explicitly stipulate that no proprietary client data will be disclosed to third parties.',
        feedbackExplanation: '"Be that as it may" ("Sea como fuere"), "explicitly stipulate" y "disclosed to third parties" reflejan dominio B2 superior.'
      },
      {
        stepNumber: 3,
        npcRole: 'Abogado del Proveedor (Vendor Counsel)',
        npcLine: 'Understood. We will amend Section 4 accordingly and send the revised draft within the hour.',
        npcTranslation: 'Entendido. Modificaremos la Sección 4 en consecuencia y enviaremos el borrador revisado dentro de una hora.',
        missionObjective: 'Confirma que una vez que su equipo legal verifique la enmienda, procederán con la firma de inmediato.',
        options: [
          'Much appreciated. Once our legal team verifies the amendment, we will proceed with the signature right away.',
          'Thanks. When our lawyers see the change, we sign fast.',
          'Great. After legal looks at it, we put the signature.'
        ],
        correctOption: 'Much appreciated. Once our legal team verifies the amendment, we will proceed with the signature right away.',
        feedbackExplanation: '"Once our legal team verifies the amendment, we will proceed with..." cierra la gestión con elegancia y claridad.'
      }
    ]
  }
];

export const EXTRA_SPANISH_SURVIVAL_MISSIONS: SurvivalMission[] = [
  // ---------------- LEVEL A1 (MISSIONS #4 & #5) ----------------
  {
    id: 'es_surv_a1_4',
    level: 'A1',
    title: 'Estación de Atocha: Billete de AVE y Andén',
    locationBadge: 'Estación de Tren · A1',
    scenarioSummary: 'You are at Madrid Atocha station buying a round-trip high-speed train ticket to Córdoba and asking for the platform.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Taquillero de Renfe',
        npcLine: '¡Buenos días! ¿Adónde desea viajar hoy?',
        npcTranslation: 'Good morning! Where would you like to travel today?',
        missionObjective: 'Politely ask for a round-trip ticket (billete de ida y vuelta) to Córdoba for today.',
        options: [
          'Quería un billete de ida y vuelta a Córdoba para hoy, por favor.',
          'Dame dos trenes para ir y volver a Córdoba.',
          'Yo voy Córdoba hoy con ticket redondo.'
        ],
        correctOption: 'Quería un billete de ida y vuelta a Córdoba para hoy, por favor.',
        feedbackExplanation: '"Un billete (or boleto) de ida y vuelta" is the universal Spanish expression for a round-trip ticket.'
      },
      {
        stepNumber: 2,
        npcRole: 'Taquillero de Renfe',
        npcLine: 'Aquí tiene su billete. El próximo tren sale en veinte minutos.',
        npcTranslation: 'Here is your ticket. The next train leaves in twenty minutes.',
        missionObjective: 'Ask which platform (andén / vía) the train leaves from.',
        options: [
          'Muchas gracias. ¿De qué andén sale el tren?',
          '¿Dónde es la calle del tren?',
          '¿Cuántos andenes tiene el tren?'
        ],
        correctOption: 'Muchas gracias. ¿De qué andén sale el tren?',
        feedbackExplanation: '"¿De qué andén (or vía) sale el tren?" is the natural way to ask for your departure platform.'
      },
      {
        stepNumber: 3,
        npcRole: 'Taquillero de Renfe',
        npcLine: 'Sale de la vía número 6, bajando por las escaleras mecánicas.',
        npcTranslation: 'It leaves from track number 6, down the escalators.',
        missionObjective: 'Thank the clerk and ask what time the train arrives in Córdoba.',
        options: [
          '¡Perfecto! ¿A qué hora llega a Córdoba?',
          '¡Gracias! ¿Qué tiempo llega en Córdoba?',
          '¿Cuándo es Córdoba?'
        ],
        correctOption: '¡Perfecto! ¿A qué hora llega a Córdoba?',
        feedbackExplanation: 'To ask what time an event happens, Spanish always uses "¿A qué hora...?" + verb + "a" + destination.'
      }
    ]
  },
  {
    id: 'es_surv_a1_5',
    level: 'A1',
    title: 'Mercado Local: Fruta Fresca y Pago en Efectivo',
    locationBadge: 'Mercado Municipal · A1',
    scenarioSummary: 'You are buying fresh fruit at a Spanish market, asking for the price per kilo, and paying in cash.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Frutera del Mercado',
        npcLine: '¡Hola! ¿Qué le pongo hoy? Tenemos unas fresas buenísimas.',
        npcTranslation: 'Hello! What can I get you today? We have great strawberries.',
        missionObjective: 'Ask how much a kilo of strawberries costs and ask for half a kilo (medio kilo).',
        options: [
          '¿Cuánto cuesta el kilo de fresas? Póngame medio kilo, por favor.',
          '¿Qué precio son las fresas? Quiero mitad kilo.',
          'Dame medio de fresas, ¿cuánto dinero?'
        ],
        correctOption: '¿Cuánto cuesta el kilo de fresas? Póngame medio kilo, por favor.',
        feedbackExplanation: '"¿Cuánto cuesta...?" and "Póngame medio kilo" are the authentic phrases used in markets across the Spanish-speaking world.'
      },
      {
        stepNumber: 2,
        npcRole: 'Frutera del Mercado',
        npcLine: 'Aquí tiene. ¿Desea algo más o le cobro ya?',
        npcTranslation: 'Here you go. Would you like anything else or should I ring you up now?',
        missionObjective: 'Say that is all (eso es todo) and ask if you can pay in cash (en efectivo).',
        options: [
          'Eso es todo, gracias. ¿Puedo pagar en efectivo?',
          'Nada más. ¿Pago con moneda física?',
          'Todo terminado. ¿Es posible dinero en mano?'
        ],
        correctOption: 'Eso es todo, gracias. ¿Puedo pagar en efectivo?',
        feedbackExplanation: '"Eso es todo" (That’s all) and "pagar en efectivo" (pay in cash) are essential A1 shopping phrases.'
      },
      {
        stepNumber: 3,
        npcRole: 'Frutera del Mercado',
        npcLine: '¡Claro que sí! Son cuatro euros. Aquí tiene su cambio.',
        npcTranslation: 'Of course! That is four euros. Here is your change.',
        missionObjective: 'Thank her and wish her a great day.',
        options: [
          '¡Muchas gracias! ¡Que tenga un buen día!',
          '¡De nada por el cambio! ¡Buenas noches!',
          '¡Igualmente el dinero!'
        ],
        correctOption: '¡Muchas gracias! ¡Que tenga un buen día!',
        feedbackExplanation: '"¡Que tenga un buen día!" uses the polite Subjunctive wish formula and sounds warm and natural.'
      }
    ]
  },

  // ---------------- LEVEL A2 (MISSIONS #4 & #5) ----------------
  {
    id: 'es_surv_a2_4',
    level: 'A2',
    title: 'Alquiler de Coche: Seguro y Depósito de Combustible',
    locationBadge: 'Mostrador de Alquiler · A2',
    scenarioSummary: 'You are picking up a rental car in Malaga and confirming unlimited mileage and full insurance coverage.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Agente de Alquiler',
        npcLine: '¡Buenas tardes! Aquí tengo su reserva. ¿Me permite su carné de conducir?',
        npcTranslation: 'Good afternoon! I have your reservation here. May I see your driver’s license?',
        missionObjective: 'Hand over your license and ask if the reservation includes unlimited mileage (kilometraje ilimitado).',
        options: [
          'Aquí lo tiene. ¿La reserva incluye kilometraje ilimitado?',
          'Tome. ¿El coche tiene kilómetros infinitos?',
          'Aquí está. ¿Puedo conducir sin números?'
        ],
        correctOption: 'Aquí lo tiene. ¿La reserva incluye kilometraje ilimitado?',
        feedbackExplanation: '"Kilometraje ilimitado" is the standard Spanish phrase when renting vehicles.'
      },
      {
        stepNumber: 2,
        npcRole: 'Agente de Alquiler',
        npcLine: 'Sí, está incluido. ¿Prefiere el seguro básico o el seguro a todo riesgo sin franquicia?',
        npcTranslation: 'Yes, it is included. Do you prefer basic insurance or full coverage with zero deductible?',
        missionObjective: 'Choose full insurance coverage (seguro a todo riesgo) so you can travel with peace of mind.',
        options: [
          'Prefiero el seguro a todo riesgo sin franquicia para viajar más tranquilo.',
          'Quiero todo el seguro sin pagar nada.',
          'Ponme el seguro grande por favor.'
        ],
        correctOption: 'Prefiero el seguro a todo riesgo sin franquicia para viajar más tranquilo.',
        feedbackExplanation: '"Seguro a todo riesgo sin franquicia" means full coverage with zero deductible/excess.'
      },
      {
        stepNumber: 3,
        npcRole: 'Agente de Alquiler',
        npcLine: 'Perfecto. El depósito de gasolina está lleno en este momento.',
        npcTranslation: 'Perfect. The gas tank is full right now.',
        missionObjective: 'Confirm that you will return the car with a full tank on Sunday afternoon.',
        options: [
          'Entendido, devolveré el coche con el depósito lleno el domingo por la tarde.',
          'Vale, yo regreso el coche lleno en domingo.',
          'Bien, pongo gasolina cuando vuelvo el domingo.'
        ],
        correctOption: 'Entendido, devolveré el coche con el depósito lleno el domingo por la tarde.',
        feedbackExplanation: 'Notice that in Spanish we use the definite article "el domingo" (never "en domingo") for days of the week.'
      }
    ]
  },
  {
    id: 'es_surv_a2_5',
    level: 'A2',
    title: 'Soporte Informático: Restablecer Acceso',
    locationBadge: 'Soporte Técnico · A2',
    scenarioSummary: 'You cannot log in to your work platform after a password expiration and call IT support in Spanish.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Técnico de Soporte',
        npcLine: 'Soporte Informático, le atiende Marcos. ¿En qué puedo ayudarle?',
        npcTranslation: 'IT Support, Marcos speaking. How can I help you?',
        missionObjective: 'Explain that you have not been able to log in (iniciar sesión) to your account since this morning.',
        options: [
          'Hola Marcos, desde esta mañana no he podido iniciar sesión en mi cuenta.',
          'Hola, no puedo entrar dentro de mi correo desde hoy.',
          'Mi cuenta está rota y no abre.'
        ],
        correctOption: 'Hola Marcos, desde esta mañana no he podido iniciar sesión en mi cuenta.',
        feedbackExplanation: '"No he podido iniciar sesión" (Pretérito Perfecto) accurately describes an issue that started this morning and continues now.'
      },
      {
        stepNumber: 2,
        npcRole: 'Técnico de Soporte',
        npcLine: '¿Le apareció algún mensaje de error al escribir su contraseña?',
        npcTranslation: 'Did an error message appear when you typed your password?',
        missionObjective: 'Explain that it said your password expired while you were on vacation last week.',
        options: [
          'Sí, decía que mi contraseña había caducado mientras estaba de vacaciones la semana pasada.',
          'Sí, dijo que la contraseña murió en mis vacaciones.',
          'La pantalla hablaba de contraseña terminada.'
        ],
        correctOption: 'Sí, decía que mi contraseña había caducado mientras estaba de vacaciones la semana pasada.',
        feedbackExplanation: '"Caducar" (to expire) and "mientras estaba de vacaciones" (Imperfect for background state) fit naturally here.'
      },
      {
        stepNumber: 3,
        npcRole: 'Técnico de Soporte',
        npcLine: 'Acabo de enviarle un enlace temporal a su móvil para crear una contraseña nueva.',
        npcTranslation: 'I just sent a temporary link to your mobile phone to create a new password.',
        missionObjective: 'Confirm that you just received the link and were able to log in without any issues.',
        options: [
          '¡Ya me llegó el enlace y pude entrar sin problemas! Muchísimas gracias.',
          'Tengo el enlace y ahora funciona bueno.',
          'Ya vino el mensaje y entré bien.'
        ],
        correctOption: '¡Ya me llegó el enlace y pude entrar sin problemas! Muchísimas gracias.',
        feedbackExplanation: '"Ya me llegó" and "pude entrar sin problemas" sound 100% idiomatic.'
      }
    ]
  },

  // ---------------- LEVEL B1 (MISSIONS #4 & #5) ----------------
  {
    id: 'es_surv_b1_4',
    level: 'B1',
    title: 'Coordinación de Equipo: Repartir Tareas Urgentes',
    locationBadge: 'Gestión de Equipo · B1',
    scenarioSummary: 'Two colleagues are out sick and you need to redistribute tasks with your team lead so you still meet Friday’s deadline.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Coordinadora de Proyecto',
        npcLine: 'Como Carlos y Elena están de baja hoy, ¿cómo nos organizamos con el informe del cliente?',
        npcTranslation: 'Since Carlos and Elena are out on sick leave today, how should we organize the client report?',
        missionObjective: 'Offer to take charge of the data analysis provided that someone else reviews the presentation.',
        options: [
          'Yo puedo encargarme del análisis de datos siempre y cuando alguien más revise la presentación.',
          'Yo hago los números si otra persona mira las diapositivas.',
          'Déjame hacer los datos y tú haces el resto.'
        ],
        correctOption: 'Yo puedo encargarme del análisis de datos siempre y cuando alguien más revise la presentación.',
        feedbackExplanation: '"Encargarse de" + "siempre y cuando + Subjunctive (revise)" is a hallmark B1 conditional structure.'
      },
      {
        stepNumber: 2,
        npcRole: 'Coordinadora de Proyecto',
        npcLine: 'Me parece genial. ¿Crees que llegaremos a tiempo a la entrega del viernes?',
        npcTranslation: 'That sounds great. Do you think we will make Friday’s delivery on time?',
        missionObjective: 'State that if you prioritize the key sections today, you will meet the deadline without any issues.',
        options: [
          'Si damos prioridad a los apartados clave hoy, cumpliremos el plazo sin ningún problema.',
          'Si trabajaremos rápido hoy, terminamos el viernes.',
          'Sí, llegamos al límite del viernes fácil.'
        ],
        correctOption: 'Si damos prioridad a los apartados clave hoy, cumpliremos el plazo sin ningún problema.',
        feedbackExplanation: '"Dar prioridad a" and "cumplir el plazo" (meet the deadline) are high-frequency professional collocations.'
      },
      {
        stepNumber: 3,
        npcRole: 'Coordinadora de Proyecto',
        npcLine: 'Estupendo. Hablamos de nuevo a las cuatro para ver cómo vamos.',
        npcTranslation: 'Wonderful. Let’s talk again at four to see how we are doing.',
        missionObjective: 'Agree and promise to have the first draft ready before four o’clock.',
        options: [
          'Hecho. Para las cuatro ya tendré listo el primer borrador.',
          'Vale, en las cuatro estoy con el papel.',
          'Perfecto, hasta las cuatro hago el borrador.'
        ],
        correctOption: 'Hecho. Para las cuatro ya tendré listo el primer borrador.',
        feedbackExplanation: '"Para las cuatro" expresses a deadline ("by four o\'clock"), while "por" would indicate approximate time.'
      }
    ]
  },
  {
    id: 'es_surv_b1_5',
    level: 'B1',
    title: 'Aeropuerto: Sobreventa de Vuelo y Compensación',
    locationBadge: 'Puerta de Embarque · B1',
    scenarioSummary: 'Your flight is overbooked and you negotiate a seat on the next flight, a compensation voucher, and VIP lounge access.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Supervisora de Aerolínea',
        npcLine: 'Les pedimos disculpas, pero hay sobreventa en este vuelo y buscamos voluntarios para volar a las seis de la tarde.',
        npcTranslation: 'We apologize, but this flight is overbooked and we are looking for volunteers to fly at six this evening.',
        missionObjective: 'Ask what compensation the airline offers if you volunteer to take the later flight.',
        options: [
          '¿Qué tipo de compensación ofrecen si cedo mi asiento para volar en el de las seis?',
          '¿Cuánto dinero me dan si espero aquí?',
          '¿Cuál es mi regalo por no subir al avión ahora?'
        ],
        correctOption: '¿Qué tipo de compensación ofrecen si cedo mi asiento para volar en el de las seis?',
        feedbackExplanation: '"Ceder mi asiento" (give up my seat) and "¿Qué tipo de compensación ofrecen...?" set a polite, effective tone.'
      },
      {
        stepNumber: 2,
        npcRole: 'Supervisora de Aerolínea',
        npcLine: 'Ofrecemos un bono de trescientos euros y plaza confirmada en el vuelo de las seis.',
        npcTranslation: 'We offer a three-hundred-euro voucher and a confirmed seat on the six o’clock flight.',
        missionObjective: 'Say you would be willing to accept provided that they also include VIP lounge access and a meal voucher.',
        options: [
          'Estaría dispuesto a aceptarlo con tal de que también incluyan acceso a la sala VIP y un vale de comida.',
          'Ponme también la sala VIP y comida gratis por favor.',
          'Acepto solo si me dan ticket de restaurante y sofá.'
        ],
        correctOption: 'Estaría dispuesto a aceptarlo con tal de que también incluyan acceso a la sala VIP y un vale de comida.',
        feedbackExplanation: '"Estaría dispuesto a..." + "con tal de que + Subjunctive (incluyan)" is an ideal B1 negotiation structure.'
      },
      {
        stepNumber: 3,
        npcRole: 'Supervisora de Aerolínea',
        npcLine: '¡Trato hecho! Ahora mismo le imprimo el pase a la sala VIP y su nueva tarjeta de embarque.',
        npcTranslation: 'Deal! I will print your VIP lounge pass and your new boarding pass right away.',
        missionObjective: 'Thank her and ask her to make sure your checked suitcase is transferred to the 6:00 PM flight.',
        options: [
          'Muchas gracias. ¿Podría asegurarse de que mi maleta facturada pase directamente al vuelo de las seis?',
          'Gracias. Mira que mi maleta vaya en el avión de las seis.',
          '¿Mi equipaje camina solo al otro vuelo?'
        ],
        correctOption: 'Muchas gracias. ¿Podría asegurarse de que mi maleta facturada pase directamente al vuelo de las seis?',
        feedbackExplanation: '"¿Podría asegurarse de que + Subjunctive (pase)?" and "maleta facturada" (checked luggage) complete the mission naturally.'
      }
    ]
  },

  // ---------------- LEVEL B2 (MISSIONS #4 & #5) ----------------
  {
    id: 'es_surv_b2_4',
    level: 'B2',
    title: 'Revisión Salarial y Reconocimiento de Logros',
    locationBadge: 'Dirección General · B2',
    scenarioSummary: 'During your annual performance review, you present quantifiable achievements to negotiate a salary adjustment.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Directora de Operaciones',
        npcLine: 'Tu desempeño este año ha sido impecable, sobre todo al frente de la expansión regional.',
        npcTranslation: 'Your performance this year has been impeccable, especially leading the regional expansion.',
        missionObjective: 'Thank her for the recognition and propose reviewing your salary given that your responsibilities have grown.',
        options: [
          'Agradezco mucho la valoración. Dado que mis responsabilidades han aumentado de forma considerable, me gustaría plantear una revisión salarial.',
          'Gracias. Como ahora hago más trabajo, quiero que me suban el sueldo.',
          'Me alegra que lo vean. Ahora toca hablar de pagarme más.'
        ],
        correctOption: 'Agradezco mucho la valoración. Dado que mis responsabilidades han aumentado de forma considerable, me gustaría plantear una revisión salarial.',
        feedbackExplanation: '"Dado que mis responsabilidades han aumentado de forma considerable..." frames a B2 executive request with poise.'
      },
      {
        stepNumber: 2,
        npcRole: 'Directora de Operaciones',
        npcLine: 'La subida estándar anual es del cinco por ciento, ya que el presupuesto de este trimestre es ajustado.',
        npcTranslation: 'The standard annual raise is five percent, as this quarter’s budget is tight.',
        missionObjective: 'Acknowledge the budget constraints, highlight that your department increased revenue by 20%, and propose a 12% raise or performance bonus.',
        options: [
          'Si bien comprendo las limitaciones presupuestarias, mi área incrementó la facturación un veinte por ciento; un ajuste del doce por ciento o un bono por objetivos reflejaría mejor ese impacto.',
          'Cinco por ciento es muy poco. Mi equipo ganó veinte por ciento más, así que pido doce.',
          'Aunque haya poco presupuesto, merezco el doce por ciento por las ventas.'
        ],
        correctOption: 'Si bien comprendo las limitaciones presupuestarias, mi área incrementó la facturación un veinte por ciento; un ajuste del doce por ciento o un bono por objetivos reflejaría mejor ese impacto.',
        feedbackExplanation: '"Si bien comprendo..." ("While I understand...") + quantifiable business evidence is the gold standard of B2 negotiation.'
      },
      {
        stepNumber: 3,
        npcRole: 'Directora de Operaciones',
        npcLine: 'Tienes toda la razón. Puedo aprobar un ocho por ciento fijo ahora más un cinco por ciento en variables trimestrales.',
        npcTranslation: 'You have a very fair point. I can approve an eight-percent fixed raise now plus five percent in quarterly bonuses.',
        missionObjective: 'Accept the balanced agreement and ask for the new terms to be formalized in writing effective next month.',
        options: [
          'Me parece un punto medio muy equilibrado. ¿Podríamos dejar estas condiciones por escrito con efecto a partir del próximo mes?',
          'Vale, acepto el ocho y el cinco. Escríbelo en un papel para el mes que viene.',
          'Buen trato. Hagamos el contrato nuevo para el próximo mes.'
        ],
        correctOption: 'Me parece un punto medio muy equilibrado. ¿Podríamos dejar estas condiciones por escrito con efecto a partir del próximo mes?',
        feedbackExplanation: '"Dejar estas condiciones por escrito con efecto a partir de..." closes the negotiation with formal clarity.'
      }
    ]
  },
  {
    id: 'es_surv_b2_5',
    level: 'B2',
    title: 'Contrato Tecnológico: Cláusula de Confidencialidad',
    locationBadge: 'Comité Jurídico · B2',
    scenarioSummary: 'You are reviewing a vendor agreement and require an ambiguous data-sharing clause to be amended before signing.',
    turns: [
      {
        stepNumber: 1,
        npcRole: 'Asesor Jurídico del Proveedor',
        npcLine: 'Les hemos remitido la versión final del contrato. ¿Estamos en disposición de firmarlo hoy mismo?',
        npcTranslation: 'We have sent you the final version of the contract. Are we in a position to sign it today?',
        missionObjective: 'Explain that you cannot sign until the ambiguity in Clause 4 regarding data ownership is resolved.',
        options: [
          'Todavía no del todo. No podemos proceder con la firma hasta que se subsane la ambigüedad de la cláusula cuarta sobre la titularidad de los datos.',
          'No, hoy no firmamos porque la cláusula cuatro es confusa.',
          'Tenemos que esperar porque hay un problema con quién es dueño de los datos.'
        ],
        correctOption: 'Todavía no del todo. No podemos proceder con la firma hasta que se subsane la ambigüedad de la cláusula cuarta sobre la titularidad de los datos.',
        feedbackExplanation: '"Proceder con la firma" and "hasta que se subsane la ambigüedad" (until the ambiguity is remedied) reflect C1/B2 legal-business register.'
      },
      {
        stepNumber: 2,
        npcRole: 'Asesor Jurídico del Proveedor',
        npcLine: 'Esa cláusula únicamente nos faculta para emplear métricas anónimas con fines estadísticos.',
        npcTranslation: 'That clause solely authorizes us to use anonymous metrics for statistical purposes.',
        missionObjective: 'Insist that the text explicitly stipulate that no confidential client data may be transferred to third parties.',
        options: [
          'Sea como fuere, necesitamos que el documento estipule de forma expresa que ningún dato confidencial será cedido a terceros.',
          'Tal vez, pero tienen que escribir claro que no darán secretos a otras empresas.',
          'Aun así, pongan en el papel que terceros no pueden ver los datos.'
        ],
        correctOption: 'Sea como fuere, necesitamos que el documento estipule de forma expresa que ningún dato confidencial será cedido a terceros.',
        feedbackExplanation: '"Sea como fuere" ("Be that as it may"), "estipule de forma expresa", and "cedido a terceros" are top-tier B2 expressions.'
      },
      {
        stepNumber: 3,
        npcRole: 'Asesor Jurídico del Proveedor',
        npcLine: 'Tomamos nota. Rectificaremos el redactado ahora mismo y les enviaremos el anexo corregido en media hora.',
        npcTranslation: 'Noted. We will amend the wording right now and send you the corrected addendum within half an hour.',
        missionObjective: 'Thank him and confirm that as soon as your legal department validates the change, you will sign immediately.',
        options: [
          'Se lo agradezco. En cuanto nuestro departamento jurídico valide la modificación, formalizaremos la firma de inmediato.',
          'Gracias. Cuando nuestros abogados miren el cambio, firmamos rápido.',
          'Perfecto. Después de que lo vean, ponemos la firma.'
        ],
        correctOption: 'Se lo agradezco. En cuanto nuestro departamento jurídico valide la modificación, formalizaremos la firma de inmediato.',
        feedbackExplanation: '"En cuanto + Subjunctive (valide)" + "formalizaremos la firma de inmediato" wraps up the legal mission flawlessly.'
      }
    ]
  }
];

// ============================================================================
// 3. EXTRA FALSE FRIENDS & BILINGUAL TRAPS — 6 MORE PER LEVEL (24/LANG -> 10/LEVEL)
// ============================================================================
export const EXTRA_ENGLISH_FALSE_FRIENDS: FalseFriendCard[] = [
  // ---------------- LEVEL A1 (CARDS #5 TO #10) ----------------
  {
    id: 'en_ff_a1_5',
    level: 'A1',
    trapTitle: 'Trampa A1: "Parents" vs "Relatives"',
    falseFriendPair: 'Parents (Padres) ≠ Parientes (Relatives)',
    situationPrompt: 'Quieres decir en inglés: "Todos mis parientes vienen a nuestra cena familiar en Navidad."',
    targetSentenceWithBlank: 'All my _____ are coming to our family dinner at Christmas.',
    fullCorrectSentence: 'All my relatives are coming to our family dinner at Christmas.',
    correctAnswer: 'relatives',
    options: ['relatives', 'parents', 'familiars', 'fathers'],
    contrastExplanation: '"Parents" significa únicamente "padres" (mamá y papá). Para decir "parientes / familiares" (tíos, primos, abuelos), usa siempre "relatives".'
  },
  {
    id: 'en_ff_a1_6',
    level: 'A1',
    trapTitle: 'Trampa A1: "Plate" vs "Dish"',
    falseFriendPair: 'Dish (Platillo preparado) ≠ Plate (Vajilla / Plato físico)',
    situationPrompt: 'Quieres decir en inglés: "La paella es mi platillo típico favorito."',
    targetSentenceWithBlank: 'Paella is my favorite traditional _____.',
    fullCorrectSentence: 'Paella is my favorite traditional dish.',
    correctAnswer: 'dish',
    options: ['dish', 'plate', 'bowl', 'table'],
    contrastExplanation: '"Plate" es el objeto físico de cerámica donde sirves la comida. Cuando hablas de una receta o platillo gastronómico, se dice "dish" ("my favorite dish").'
  },
  {
    id: 'en_ff_a1_7',
    level: 'A1',
    trapTitle: 'Trampa A1: "Dessert" vs "Desert"',
    falseFriendPair: 'Dessert (Postre - 2 S) ≠ Desert (Desierto - 1 S)',
    situationPrompt: 'Quieres decir en inglés: "¿Qué te gustaría pedir de postre?"',
    targetSentenceWithBlank: 'What would you like to order for _____?',
    fullCorrectSentence: 'What would you like to order for dessert?',
    correctAnswer: 'dessert',
    options: ['dessert', 'desert', 'sweet', 'candy'],
    contrastExplanation: '"Dessert" (con doble S y acento en la segunda sílaba /dɪˈzɜːrt/) es "postre". "Desert" (con una sola S, /ˈdezərt/) es el "desierto" de arena.'
  },
  {
    id: 'en_ff_a1_8',
    level: 'A1',
    trapTitle: 'Trampa A1: "History" vs "Story"',
    falseFriendPair: 'Story (Cuento / Anécdota) ≠ History (Ciencia histórica)',
    situationPrompt: 'Quieres decir en inglés: "Mi abuelo siempre nos cuenta una historia divertida."',
    targetSentenceWithBlank: 'My grandfather always tells us a funny _____.',
    fullCorrectSentence: 'My grandfather always tells us a funny story.',
    correctAnswer: 'story',
    options: ['story', 'history', 'notice', 'novel'],
    contrastExplanation: '"Story" es un relato, cuento o anécdota personal. "History" se refiere a la historia de la humanidad o de un país como asignatura.'
  },
  {
    id: 'en_ff_a1_9',
    level: 'A1',
    trapTitle: 'Trampa A1: "fabric" vs "factory"',
    falseFriendPair: 'Fabric (Tela / Tejido) ≠ Fábrica (Factory)',
    situationPrompt: 'Quieres decir en inglés: "Mi tío trabaja en una fábrica de automóviles."',
    targetSentenceWithBlank: 'My uncle works in a car _____.',
    fullCorrectSentence: 'My uncle works in a car factory.',
    correctAnswer: 'factory',
    options: ['factory', 'fabric', 'office', 'industry'],
    contrastExplanation: '"Fabric" significa "tela o tejido" (como algodón o seda). Para decir "fábrica" industrial, la palabra correcta es "factory" o "plant".'
  },
  {
    id: 'en_ff_a1_10',
    level: 'A1',
    trapTitle: 'Trampa A1: "Chef" vs "Boss"',
    falseFriendPair: 'Boss (Jefe de trabajo) ≠ Chef (Cocinero profesional)',
    situationPrompt: 'Quieres decir en inglés: "Tengo que hablar con mi jefe en la oficina."',
    targetSentenceWithBlank: 'I need to speak with my _____ at the office.',
    fullCorrectSentence: 'I need to speak with my boss at the office.',
    correctAnswer: 'boss',
    options: ['boss', 'chef', 'chief', 'captain'],
    contrastExplanation: 'En inglés, "chef" es exclusivamente un jefe de cocina o cocinero profesional. El jefe de tu empresa u oficina es "boss" o "manager".'
  },

  // ---------------- LEVEL A2 (CARDS #5 TO #10) ----------------
  {
    id: 'en_ff_a2_5',
    level: 'A2',
    trapTitle: 'Trampa A2: "Lecture" vs "Reading"',
    falseFriendPair: 'Lecture (Conferencia / Clase magistral) ≠ Lectura (Reading)',
    situationPrompt: 'Quieres decir en inglés: "Asistimos a una conferencia muy interesante en la universidad."',
    targetSentenceWithBlank: 'We attended a very interesting _____ at the university.',
    fullCorrectSentence: 'We attended a very interesting lecture at the university.',
    correctAnswer: 'lecture',
    options: ['lecture', 'reading', 'lesson', 'book'],
    contrastExplanation: '"Lecture" NO significa lectura de un libro ("reading"), sino una charla, ponencia o clase magistral impartida por un profesor.'
  },
  {
    id: 'en_ff_a2_6',
    level: 'A2',
    trapTitle: 'Trampa A2: "Success" vs "Event / Incident"',
    falseFriendPair: 'Success (Éxito) ≠ Suceso (Event / Incident)',
    situationPrompt: 'Quieres decir en inglés: "El lanzamiento del nuevo producto fue un gran éxito."',
    targetSentenceWithBlank: 'The launch of the new product was a huge _____.',
    fullCorrectSentence: 'The launch of the new product was a huge success.',
    correctAnswer: 'success',
    options: ['success', 'exit', 'event', 'happen'],
    contrastExplanation: '"Success" significa "éxito" (y "successful" = exitoso). No lo confundas con "suceso" ("event / incident") ni uses "exit" (salida).'
  },
  {
    id: 'en_ff_a2_7',
    level: 'A2',
    trapTitle: 'Trampa A2: "Notice" vs "News"',
    falseFriendPair: 'Notice (Aviso / Notar) ≠ Noticia (Piece of news)',
    situationPrompt: 'Quieres decir en inglés: "¡Tengo excelentes noticias sobre tu solicitud!"',
    targetSentenceWithBlank: 'I have great _____ about your application!',
    fullCorrectSentence: 'I have great news about your application!',
    correctAnswer: 'news',
    options: ['news', 'notices', 'notes', 'new'],
    contrastExplanation: '"Notice" es un cartel de aviso o el verbo notar. Para decir "noticias" (incontable en inglés), siempre usamos "news" (nunca "notices").'
  },
  {
    id: 'en_ff_a2_8',
    level: 'A2',
    trapTitle: 'Trampa A2: "Introduce" vs "Insert / Enter"',
    falseFriendPair: 'Introduce (Presentar personas) ≠ Introducir datos (Enter / Insert)',
    situationPrompt: 'Quieres decir en inglés: "Permíteme presentarte a nuestra nueva directora."',
    targetSentenceWithBlank: 'Let me _____ you to our new director.',
    fullCorrectSentence: 'Let me introduce you to our new director.',
    correctAnswer: 'introduce',
    options: ['introduce', 'present', 'enter', 'show'],
    contrastExplanation: 'Para presentar a una persona usamos "introduce someone to someone". En cambio, para introducir una tarjeta o contraseña usamos "insert" o "enter".'
  },
  {
    id: 'en_ff_a2_9',
    level: 'A2',
    trapTitle: 'Trampa A2: "Advise / Warn" vs "Avisar (Let know)"',
    falseFriendPair: 'Advise (Aconsejar) ≠ Avisar / Informar (Let someone know)',
    situationPrompt: 'Quieres decir en inglés: "Por favor avísame cuando llegues a casa."',
    targetSentenceWithBlank: 'Please _____ me _____ when you get home.',
    fullCorrectSentence: 'Please let me know when you get home.',
    correctAnswer: 'let / know',
    options: ['let / know', 'advise / now', 'advice / to', 'say / me'],
    contrastExplanation: '"Advise" significa dar un consejo formal. Para el "avisar" cotidiano en español ("avísame"), la expresión natural es "let me know".'
  },
  {
    id: 'en_ff_a2_10',
    level: 'A2',
    trapTitle: 'Trampa A2: "Quiet" vs "Still"',
    falseFriendPair: 'Quiet (Silencioso / Tranquilo) ≠ Quieto sin moverse (Still)',
    situationPrompt: 'Quieres decir al tomar una foto: "¡Por favor quédate quieto un segundo para la foto!"',
    targetSentenceWithBlank: 'Please stand _____ for one second for the photo!',
    fullCorrectSentence: 'Please stand still for one second for the photo!',
    correctAnswer: 'still',
    options: ['still', 'quiet', 'calm', 'silent'],
    contrastExplanation: '"Quiet" significa "en silencio" (sin hacer ruido). Para decir "quieto" (sin moverse físicamente), en inglés se usa "still" ("stand still / keep still").'
  },

  // ---------------- LEVEL B1 (CARDS #5 TO #10) ----------------
  {
    id: 'en_ff_b1_5',
    level: 'B1',
    trapTitle: 'Trampa B1: "Argument" vs "Plot"',
    falseFriendPair: 'Argument (Discusión / Argumento lógico) ≠ Argumento de película (Plot)',
    situationPrompt: 'Quieres decir en inglés: "La película tiene una trama / un argumento muy original."',
    targetSentenceWithBlank: 'The movie has a very original _____.',
    fullCorrectSentence: 'The movie has a very original plot.',
    correctAnswer: 'plot',
    options: ['plot', 'argument', 'discussion', 'theme'],
    contrastExplanation: '"Argument" en inglés es una pelea verbal o un razonamiento en un debate. La trama o argumento de un libro o película se llama "plot" o "storyline".'
  },
  {
    id: 'en_ff_b1_6',
    level: 'B1',
    trapTitle: 'Trampa B1: "Discuss" vs "Argue"',
    falseFriendPair: 'Discuss (Conversar / Analizar un tema) ≠ Discutir peleando (Argue)',
    situationPrompt: 'Quieres decir en inglés: "Mañana analizaremos / hablaremos de los detalles del contrato."',
    targetSentenceWithBlank: 'Tomorrow we will _____ the contract details.',
    fullCorrectSentence: 'Tomorrow we will discuss the contract details.',
    correctAnswer: 'discuss',
    options: ['discuss', 'argue', 'discuss about', 'fight'],
    contrastExplanation: '"Discuss" es positivo y neutro (hablar a fondo de un tema, y NUNCA lleva la preposición "about"). Pelear verbalmente es "argue".'
  },
  {
    id: 'en_ff_b1_7',
    level: 'B1',
    trapTitle: 'Trampa B1: "Resume / CV" vs "Summary"',
    falseFriendPair: 'Summary (Resumen de un texto) ≠ Résumé (Currículum Vitae)',
    situationPrompt: 'Quieres decir en inglés: "Escribí un breve resumen de la reunión de hoy."',
    targetSentenceWithBlank: 'I wrote a brief _____ of today’s meeting.',
    fullCorrectSentence: 'I wrote a brief summary of today’s meeting.',
    correctAnswer: 'summary',
    options: ['summary', 'resume', 'abstract', 'curriculum'],
    contrastExplanation: 'Como sustantivo, "résumé" en EE. UU. significa tu Currículum Vitae (y como verbo "to resume" es reanudar). Un "resumen" de ideas es "summary".'
  },
  {
    id: 'en_ff_b1_8',
    level: 'B1',
    trapTitle: 'Trampa B1: "Support" vs "Put up with / Stand"',
    falseFriendPair: 'Support (Apoyar / Respaldar) ≠ Soportar / Tolerar algo molesto (Stand / Put up with)',
    situationPrompt: 'Quieres decir en inglés: "No soporto el ruido del tráfico por la noche."',
    targetSentenceWithBlank: 'I cannot _____ the traffic noise at night.',
    fullCorrectSentence: 'I cannot stand the traffic noise at night.',
    correctAnswer: 'stand',
    options: ['stand', 'support', 'hold', 'assist'],
    contrastExplanation: '"Support" significa "apoyar o respaldar" a alguien ("I support your idea"). Para decir "no soporto / no aguanto algo", usa "I can\'t stand..." o "put up with".'
  },
  {
    id: 'en_ff_b1_9',
    level: 'B1',
    trapTitle: 'Trampa B1: "Sympathetic" vs "Friendly / Likeable"',
    falseFriendPair: 'Sympathetic (Compasivo ante un problema) ≠ Simpático (Friendly / Nice)',
    situationPrompt: 'Quieres decir en inglés: "Tus nuevos compañeros de piso son muy simpáticos."',
    targetSentenceWithBlank: 'Your new roommates are very _____ and welcoming.',
    fullCorrectSentence: 'Your new roommates are very friendly and welcoming.',
    correctAnswer: 'friendly',
    options: ['friendly', 'sympathetic', 'compassionate', 'gentle'],
    contrastExplanation: '"Sympathetic" significa mostrar compasión o pésame cuando alguien sufre un problema. Para decir que alguien es "simpático", usa "friendly", "nice" o "likeable".'
  },
  {
    id: 'en_ff_b1_10',
    level: 'B1',
    trapTitle: 'Trampa B1: "Conductor" vs "Driver"',
    falseFriendPair: 'Driver (Conductor de vehículo) ≠ Conductor (Director de orquesta / Revisor de tren)',
    situationPrompt: 'Quieres decir en inglés: "El conductor del autobús nos avisó cuál era nuestra parada."',
    targetSentenceWithBlank: 'The bus _____ let us know which stop was ours.',
    fullCorrectSentence: 'The bus driver let us know which stop was ours.',
    correctAnswer: 'driver',
    options: ['driver', 'conductor', 'pilot', 'chauffeur'],
    contrastExplanation: 'Quien maneja un auto o autobús es "driver". En inglés, "conductor" es el director de una orquesta sinfónica o el inspector de boletos en un tren.'
  },

  // ---------------- LEVEL B2 (CARDS #5 TO #10) ----------------
  {
    id: 'en_ff_b2_5',
    level: 'B2',
    trapTitle: 'Trampa B2: "Comprehensive" vs "Understanding"',
    falseFriendPair: 'Comprehensive (Exhaustivo / Integral) ≠ Comprensivo / Empático (Understanding)',
    situationPrompt: 'Quieres decir en inglés: "El comité publicó un informe exhaustivo y completo sobre el mercado."',
    targetSentenceWithBlank: 'The committee published a _____ report on the market.',
    fullCorrectSentence: 'The committee published a comprehensive report on the market.',
    correctAnswer: 'comprehensive',
    options: ['comprehensive', 'understanding', 'sympathetic', 'comprehensible'],
    contrastExplanation: '"Comprehensive" significa "integral, completo, que abarca todo" (p. ej. "comprehensive insurance"). Una persona comprensiva y empática es "understanding".'
  },
  {
    id: 'en_ff_b2_6',
    level: 'B2',
    trapTitle: 'Trampa B2: "Policy" vs "Politics / Police"',
    falseFriendPair: 'Policy (Normativa / Política de empresa) ≠ Politics (Política partidista)',
    situationPrompt: 'Quieres decir en inglés: "Según la política de nuestra empresa, el reembolso tarda cinco días."',
    targetSentenceWithBlank: 'According to our company _____, refunds take five business days.',
    fullCorrectSentence: 'According to our company policy, refunds take five business days.',
    correctAnswer: 'policy',
    options: ['policy', 'politics', 'police', 'polite'],
    contrastExplanation: '"Policy" es un reglamento, protocolo o política institucional ("company policy / privacy policy"). "Politics" se refiere al gobierno, elecciones y partidos.'
  },
  {
    id: 'en_ff_b2_7',
    level: 'B2',
    trapTitle: 'Trampa B2: "Disgust" vs "Annoyance / Upset"',
    falseFriendPair: 'Disgust (Asco / Repugnancia profunda) ≠ Disgusto / Contratiempo (Upset / Disappointment)',
    situationPrompt: 'Quieres decir en inglés: "Nos llevamos un disgusto / una decepción cuando cancelaron el vuelo."',
    targetSentenceWithBlank: 'It was a major _____ when they canceled our flight.',
    fullCorrectSentence: 'It was a major disappointment when they canceled our flight.',
    correctAnswer: 'disappointment',
    options: ['disappointment', 'disgust', 'nausea', 'hatred'],
    contrastExplanation: '"Disgust" en inglés es mucho más fuerte que en español: significa "asco o repugnancia visceral". Para un disgusto o contratiempo usamos "upset" o "disappointment".'
  },
  {
    id: 'en_ff_b2_8',
    level: 'B2',
    trapTitle: 'Trampa B2: "Casualty" vs "Coincidence"',
    falseFriendPair: 'Casualty (Víctima / Baja en accidente) ≠ Casualidad (Coincidence / Chance)',
    situationPrompt: 'Quieres decir en inglés: "¡Qué casualidad encontrarte en este aeropuerto!"',
    targetSentenceWithBlank: 'What a _____ running into you at this airport!',
    fullCorrectSentence: 'What a coincidence running into you at this airport!',
    correctAnswer: 'coincidence',
    options: ['coincidence', 'casualty', 'casual', 'fatality'],
    contrastExplanation: '¡Mucho cuidado! "Casualty" significa herido o víctima mortal en un accidente o desastre. Para decir "casualidad", usa siempre "coincidence" o "by chance".'
  },
  {
    id: 'en_ff_b2_9',
    level: 'B2',
    trapTitle: 'Trampa B2: "Commodity" vs "Comfort / Convenience"',
    falseFriendPair: 'Commodity (Materia prima comercial) ≠ Comodidad (Comfort / Convenience)',
    situationPrompt: 'Quieres decir en inglés: "Este hotel ofrece todas las comodidades modernas para viajeros de negocios."',
    targetSentenceWithBlank: 'This hotel offers every modern _____ for business travelers.',
    fullCorrectSentence: 'This hotel offers every modern convenience for business travelers.',
    correctAnswer: 'convenience',
    options: ['convenience', 'commodity', 'raw material', 'commerce'],
    contrastExplanation: '"Commodity" es un término económico que significa materia prima o bien básico (como petróleo, café o trigo). Para "comodidad", usa "comfort" o "convenience / amenity".'
  },
  {
    id: 'en_ff_b2_10',
    level: 'B2',
    trapTitle: 'Trampa B2: "Agenda" vs "Diary / Planner"',
    falseFriendPair: 'Agenda (Orden del día de una reunión) ≠ Agenda personal / Libreta (Planner / Calendar)',
    situationPrompt: 'Quieres decir en inglés: "El primer punto en el orden del día de la reunión es el presupuesto."',
    targetSentenceWithBlank: 'The first item on today’s meeting _____ is the budget.',
    fullCorrectSentence: 'The first item on today’s meeting agenda is the budget.',
    correctAnswer: 'agenda',
    options: ['agenda', 'diary', 'notebook', 'journal'],
    contrastExplanation: 'En inglés de negocios, "agenda" es la lista de temas a tratar en una reunión ("orden del día"). El cuaderno o app donde anotas tus citas personales es tu "planner" o "calendar".'
  }
];

export const EXTRA_SPANISH_FALSE_FRIENDS: FalseFriendCard[] = [
  // ---------------- LEVEL A1 (CARDS #5 TO #10) ----------------
  {
    id: 'es_ff_a1_5',
    level: 'A1',
    trapTitle: 'A1 Trap: "Parientes" vs "Padres"',
    falseFriendPair: 'Parientes (Relatives) ≠ Padres (Parents)',
    situationPrompt: 'You want to say in Spanish: "My parents live in Boston, and my other relatives live in Miami."',
    targetSentenceWithBlank: 'Mis _____ viven en Boston y mis otros parientes viven en Miami.',
    fullCorrectSentence: 'Mis padres viven en Boston y mis otros parientes viven en Miami.',
    correctAnswer: 'padres',
    options: ['padres', 'parientes', 'familiares', 'primos'],
    contrastExplanation: '"Mis padres" means "my parents" (mom and dad). "Mis parientes" means "my extended relatives" (aunts, uncles, cousins).'
  },
  {
    id: 'es_ff_a1_6',
    level: 'A1',
    trapTitle: 'A1 Trap: "Sopa" vs "Jabón"',
    falseFriendPair: 'Sopa (Soup) ≠ Jabón (Soap)',
    situationPrompt: 'You are in a hotel and want to ask housekeeping: "Could you bring me a bar of soap, please?"',
    targetSentenceWithBlank: '¿Me podría traer una pastilla de _____, por favor?',
    fullCorrectSentence: '¿Me podría traer una pastilla de jabón, por favor?',
    correctAnswer: 'jabón',
    options: ['jabón', 'sopa', 'caldo', 'toalla'],
    contrastExplanation: '"La sopa" is soup that you eat with a spoon! To wash your hands, ask for "el jabón" (soap).'
  },
  {
    id: 'es_ff_a1_7',
    level: 'A1',
    trapTitle: 'A1 Trap: "Ropa" vs "Cuerda"',
    falseFriendPair: 'Ropa (Clothes) ≠ Cuerda (Rope)',
    situationPrompt: 'You want to say in Spanish: "I need to pack warm clothes for our trip to the mountains."',
    targetSentenceWithBlank: 'Necesito llevar _____ de abrigo para nuestro viaje a la montaña.',
    fullCorrectSentence: 'Necesito llevar ropa de abrigo para nuestro viaje a la montaña.',
    correctAnswer: 'ropa',
    options: ['ropa', 'cuerda', 'tela', 'soga'],
    contrastExplanation: '"La ropa" means "clothing / clothes" (and is always singular uncountable in Spanish). The English word "rope" translates to "la cuerda".'
  },
  {
    id: 'es_ff_a1_8',
    level: 'A1',
    trapTitle: 'A1 Trap: "Fábrica" vs "Tela"',
    falseFriendPair: 'Fábrica (Factory) ≠ Tela / Tejido (Fabric)',
    situationPrompt: 'You want to say in Spanish: "This shirt is made of very soft cotton fabric."',
    targetSentenceWithBlank: 'Esta camisa está hecha de una _____ de algodón muy suave.',
    fullCorrectSentence: 'Esta camisa está hecha de una tela de algodón muy suave.',
    correctAnswer: 'tela',
    options: ['tela', 'fábrica', 'factoría', 'planta'],
    contrastExplanation: '"La fábrica" means an industrial factory. When referring to cloth or textile material ("fabric"), use "la tela" or "el tejido".'
  },
  {
    id: 'es_ff_a1_9',
    level: 'A1',
    trapTitle: 'A1 Trap: "Largo" vs "Grande"',
    falseFriendPair: 'Largo (Long in length) ≠ Grande (Large in size)',
    situationPrompt: 'You want to order a large coffee in Spanish: "A large coffee with oat milk, please."',
    targetSentenceWithBlank: 'Un café _____ con leche de avena, por favor.',
    fullCorrectSentence: 'Un café grande con leche de avena, por favor.',
    correctAnswer: 'grande',
    options: ['grande', 'largo', 'ancho', 'alto'],
    contrastExplanation: '"Largo" means "long" in distance or duration ("un viaje largo"). For a "large" size drink, shirt, or room, use "grande".'
  },
  {
    id: 'es_ff_a1_10',
    level: 'A1',
    trapTitle: 'A1 Trap: "Campo" vs "Campamento"',
    falseFriendPair: 'Campo (Countryside) ≠ Campamento (Summer camp)',
    situationPrompt: 'You want to say in Spanish: "We love spending the weekend in a house in the countryside."',
    targetSentenceWithBlank: 'Nos encanta pasar el fin de semana en una casa en el _____.',
    fullCorrectSentence: 'Nos encanta pasar el fin de semana en una casa en el campo.',
    correctAnswer: 'campo',
    options: ['campo', 'campamento', 'tienda', 'camping'],
    contrastExplanation: '"El campo" means the countryside or rural area (or a sports field). A campsite or summer camp with tents is "el campamento" or "el camping".'
  },

  // ---------------- LEVEL A2 (CARDS #5 TO #10) ----------------
  {
    id: 'es_ff_a2_5',
    level: 'A2',
    trapTitle: 'A2 Trap: "Lectura" vs "Conferencia"',
    falseFriendPair: 'Lectura (Reading) ≠ Conferencia / Clase magistral (Lecture)',
    situationPrompt: 'You want to say in Spanish: "The professor gave an inspiring lecture on architecture."',
    targetSentenceWithBlank: 'La profesora dio una _____ muy inspiradora sobre arquitectura.',
    fullCorrectSentence: 'La profesora dio una conferencia muy inspiradora sobre arquitectura.',
    correctAnswer: 'conferencia',
    options: ['conferencia', 'lectura', 'lección', 'revista'],
    contrastExplanation: '"La lectura" means the act of reading books. A university or public "lecture" is "una conferencia" or "una clase magistral".'
  },
  {
    id: 'es_ff_a2_6',
    level: 'A2',
    trapTitle: 'A2 Trap: "Receta" (Recipe & Prescription)',
    falseFriendPair: 'Receta (Recipe / Medical Prescription) ≠ Recibo (Receipt)',
    situationPrompt: 'You just paid at a store and want to ask: "Could you give me the receipt, please?"',
    targetSentenceWithBlank: '¿Me podría dar el _____ de compra, por favor?',
    fullCorrectSentence: '¿Me podría dar el recibo de compra, por favor?',
    correctAnswer: 'recibo',
    options: ['recibo', 'receta', 'menú', 'plato'],
    contrastExplanation: '"El recibo" (or "el ticket") is a payment receipt. "La receta" means either a cooking recipe ("receta de cocina") or a doctor’s prescription ("receta médica").'
  },
  {
    id: 'es_ff_a2_7',
    level: 'A2',
    trapTitle: 'A2 Trap: "Contestar" vs "Competir"',
    falseFriendPair: 'Contestar (To answer) ≠ Competir / Impugnar (To contest)',
    situationPrompt: 'You want to say in Spanish: "She didn’t answer my phone call yesterday."',
    targetSentenceWithBlank: 'Ella no _____ mi llamada telefónica ayer.',
    fullCorrectSentence: 'Ella no contestó mi llamada telefónica ayer.',
    correctAnswer: 'contestó',
    options: ['contestó', 'compitió', 'preguntó', 'discutió'],
    contrastExplanation: '"Contestar" simply means "to answer or reply" (synonym of "responder") to a question, phone call, or email.'
  },
  {
    id: 'es_ff_a2_8',
    level: 'A2',
    trapTitle: 'A2 Trap: "Sano" vs "Cuerdo / Sensato"',
    falseFriendPair: 'Sano (Healthy) ≠ Cuerdo / Sensato (Sane)',
    situationPrompt: 'You want to say in Spanish: "Eating fresh vegetables and exercising keeps you healthy."',
    targetSentenceWithBlank: 'Comer verduras frescas y hacer ejercicio te mantiene _____.',
    fullCorrectSentence: 'Comer verduras frescas y hacer ejercicio te mantiene sano.',
    correctAnswer: 'sano',
    options: ['sano', 'cuerdo', 'loco', 'sensible'],
    contrastExplanation: '"Sano" (or "saludable") means "physically healthy / wholesome". The English word "sane" (mentally sound) translates to "cuerdo" or "sensato".'
  },
  {
    id: 'es_ff_a2_9',
    level: 'A2',
    trapTitle: 'A2 Trap: "Recordar" vs "Grabar"',
    falseFriendPair: 'Recordar (To remember) ≠ Grabar audio/video (To record)',
    situationPrompt: 'You want to say in Spanish: "We are going to record a new episode of our podcast today."',
    targetSentenceWithBlank: 'Hoy vamos a _____ un nuevo episodio de nuestro pódcast.',
    fullCorrectSentence: 'Hoy vamos a grabar un nuevo episodio de nuestro pódcast.',
    correctAnswer: 'grabar',
    options: ['grabar', 'recordar', 'acordar', 'escribir'],
    contrastExplanation: '"Recordar" means "to remember / recall". When recording audio, video, or data, the Spanish verb is "grabar".'
  },
  {
    id: 'es_ff_a2_10',
    level: 'A2',
    trapTitle: 'A2 Trap: "Despertar" vs "Desesperado"',
    falseFriendPair: 'Despertar (To wake up) ≠ Desesperado (Desperate)',
    situationPrompt: 'You want to say in Spanish: "I usually wake up at seven in the morning without an alarm."',
    targetSentenceWithBlank: 'Normalmente me _____ a las siete de la mañana sin despertador.',
    fullCorrectSentence: 'Normalmente me despierto a las siete de la mañana sin despertador.',
    correctAnswer: 'despierto',
    options: ['despierto', 'desespero', 'levanto tarde', 'acuesto'],
    contrastExplanation: '"Despertarse" (me despierto) means "to wake up" (and "despierto" as an adjective means "awake"). "Desperate" is "desesperado".'
  },

  // ---------------- LEVEL B1 (CARDS #5 TO #10) ----------------
  {
    id: 'es_ff_b1_5',
    level: 'B1',
    trapTitle: 'B1 Trap: "Soportar" vs "Apoyar"',
    falseFriendPair: 'Soportar (To tolerate / bear) ≠ Apoyar (To support)',
    situationPrompt: 'You want to say in Spanish: "Thank you for always supporting my professional projects."',
    targetSentenceWithBlank: 'Gracias por _____ siempre mis proyectos profesionales.',
    fullCorrectSentence: 'Gracias por apoyar siempre mis proyectos profesionales.',
    correctAnswer: 'apoyar',
    options: ['apoyar', 'soportar', 'aguantar', 'sujetar'],
    contrastExplanation: 'To support or back a person or idea is "apoyar" (or "respaldar"). "Soportar" means "to put up with / tolerate" something annoying (or hold physical weight).'
  },
  {
    id: 'es_ff_b1_6',
    level: 'B1',
    trapTitle: 'B1 Trap: "Resumen" vs "Currículum"',
    falseFriendPair: 'Resumen (Executive summary) ≠ Currículum / Hoja de vida (Résumé / CV)',
    situationPrompt: 'You are applying for a job and want to say: "I attached my résumé / CV in PDF format."',
    targetSentenceWithBlank: 'He adjuntado mi _____ en formato PDF.',
    fullCorrectSentence: 'He adjuntado mi currículum en formato PDF.',
    correctAnswer: 'currículum',
    options: ['currículum', 'resumen', 'sumario', 'índice'],
    contrastExplanation: 'Your job application document (résumé) is "el currículum" or "la hoja de vida". "Un resumen" is a summary of a book, article, or meeting.'
  },
  {
    id: 'es_ff_b1_7',
    level: 'B1',
    trapTitle: 'B1 Trap: "Educado" vs "Con estudios"',
    falseFriendPair: 'Bien educado (Polite / well-mannered) ≠ Con formación académica (Educated)',
    situationPrompt: 'You want to say in Spanish: "The hotel staff was extremely polite and helpful."',
    targetSentenceWithBlank: 'El personal del hotel fue sumamente _____ y atento.',
    fullCorrectSentence: 'El personal del hotel fue sumamente educado y atento.',
    correctAnswer: 'educado',
    options: ['educado', 'universitario', 'escolarizado', 'académico'],
    contrastExplanation: 'In Spanish, saying someone is "educado" (or "bien educado") means they are polite and have good manners ("maleducado" = rude). Academic education is "formación académica / culto".'
  },
  {
    id: 'es_ff_b1_8',
    level: 'B1',
    trapTitle: 'B1 Trap: "Delito" vs "Deleite / Placer"',
    falseFriendPair: 'Delito (Crime / offense) ≠ Deleite / Encanto (Delight)',
    situationPrompt: 'You want to say in Spanish: "Listening to live classical music in this garden is a true delight."',
    targetSentenceWithBlank: 'Escuchar música clásica en vivo en este jardín es un verdadero _____.',
    fullCorrectSentence: 'Escuchar música clásica en vivo en este jardín es un verdadero deleite.',
    correctAnswer: 'deleite',
    options: ['deleite', 'delito', 'crimen', 'castigo'],
    contrastExplanation: 'Never confuse these two! "Un delito" is a crime or legal offense. To express "a delight / pleasure", use "un deleite", "una delicia", or "un placer".'
  },
  {
    id: 'es_ff_b1_9',
    level: 'B1',
    trapTitle: 'B1 Trap: "Ignorar" (Not knowing vs Ignoring)',
    falseFriendPair: 'Ignorar (To be unaware of / not know) & Hacer caso omiso',
    situationPrompt: 'In formal Spanish, you read: "Ignorábamos que el horario había cambiado." What does "Ignorábamos" mean here?',
    targetSentenceWithBlank: 'En registro formal, "ignorábamos el cambio" significa que nosotros _____ el cambio.',
    fullCorrectSentence: 'En registro formal, "ignorábamos el cambio" significa que nosotros desconocíamos el cambio.',
    correctAnswer: 'desconocíamos',
    options: ['desconocíamos', 'rechazábamos con enojo', 'celebrábamos', 'provocábamos'],
    contrastExplanation: 'In formal and written Spanish, "ignorar algo" often means "to be unaware of / not know something" ("desconocer"), not just deliberately ignoring someone.'
  },
  {
    id: 'es_ff_b1_10',
    level: 'B1',
    trapTitle: 'B1 Trap: "Apologizar" (Doesn’t exist!) vs "Disculparse"',
    falseFriendPair: 'Pedir disculpas / Disculparse (To apologize) ≠ Apología (Defense speech)',
    situationPrompt: 'You want to say in Spanish: "He called to apologize for arriving ten minutes late."',
    targetSentenceWithBlank: 'Llamó para _____ por llegar diez minutos tarde.',
    fullCorrectSentence: 'Llamó para disculparse por llegar diez minutos tarde.',
    correctAnswer: 'disculparse',
    options: ['disculparse', 'apologizar', 'perdonar', 'acusarse'],
    contrastExplanation: 'To say "to apologize" in Spanish, use "disculparse" or "pedir disculpas / pedir perdón". ("Apología" in Spanish means a formal public defense of an idea).'
  },

  // ---------------- LEVEL B2 (CARDS #5 TO #10) ----------------
  {
    id: 'es_ff_b2_5',
    level: 'B2',
    trapTitle: 'B2 Trap: "Casualidad" vs "Víctima / Baja"',
    falseFriendPair: 'Casualidad (Coincidence) ≠ Víctima / Herido (Casualty)',
    situationPrompt: 'You want to say in Spanish: "Thankfully, there were no casualties in the highway accident."',
    targetSentenceWithBlank: 'Afortunadamente, no hubo _____ en el accidente de la autopista.',
    fullCorrectSentence: 'Afortunadamente, no hubo víctimas en el accidente de la autopista.',
    correctAnswer: 'víctimas',
    options: ['víctimas', 'casualidades', 'coincidencias', 'suertes'],
    contrastExplanation: '"La casualidad" means "coincidence / chance" ("¡Qué casualidad!"). Injuries or fatalities in an accident ("casualties") are "las víctimas" or "los heridos".'
  },
  {
    id: 'es_ff_b2_6',
    level: 'B2',
    trapTitle: 'B2 Trap: "Comprensivo" vs "Exhaustivo / Integral"',
    falseFriendPair: 'Comprensivo (Understanding / empathetic) ≠ Exhaustivo / Integral (Comprehensive)',
    situationPrompt: 'You want to say in Spanish: "We need a comprehensive analysis of all international markets."',
    targetSentenceWithBlank: 'Necesitamos un análisis _____ de todos los mercados internacionales.',
    fullCorrectSentence: 'Necesitamos un análisis exhaustivo de todos los mercados internacionales.',
    correctAnswer: 'exhaustivo',
    options: ['exhaustivo', 'comprensivo', 'compasivo', 'sensible'],
    contrastExplanation: '"Comprensivo" describes an empathetic, understanding person. When you mean "comprehensive / thorough / all-inclusive", use "exhaustivo", "integral", or "completo".'
  },
  {
    id: 'es_ff_b2_7',
    level: 'B2',
    trapTitle: 'B2 Trap: "Consistente" vs "Constante / Coherente"',
    falseFriendPair: 'Coherente / Constante (Consistent over time) vs Consistente (Solid texture / well-founded)',
    situationPrompt: 'You want to say in Spanish: "To master a language, it is essential to be consistent every week."',
    targetSentenceWithBlank: 'Para dominar un idioma, es fundamental ser _____ todas las semanas.',
    fullCorrectSentence: 'Para dominar un idioma, es fundamental ser constante todas las semanas.',
    correctAnswer: 'constante',
    options: ['constante', 'espeso', 'denso', 'pesado'],
    contrastExplanation: 'To describe a person who practices steadily and regularly ("consistent effort"), genuine Spanish uses "ser constante" (or "coherente" for logical consistency).'
  },
  {
    id: 'es_ff_b2_8',
    level: 'B2',
    trapTitle: 'B2 Trap: "Asumir" vs "Suponer"',
    falseFriendPair: 'Suponer (To assume / suppose without proof) vs Asumir (To take on responsibility)',
    situationPrompt: 'You want to say in Spanish: "She took on the presidency of the board in January."',
    targetSentenceWithBlank: 'Ella _____ la presidencia del consejo directivo en enero.',
    fullCorrectSentence: 'Ella asumió la presidencia del consejo directivo en enero.',
    correctAnswer: 'asumió',
    options: ['asumió', 'supuso', 'adivinó', 'imaginó'],
    contrastExplanation: 'Traditionally in formal Spanish, "asumir" means "to take on a role, responsibility, or cost" ("asumir el cargo"), while "to assume / suppose" a fact is "suponer" or "dar por sentado".'
  },
  {
    id: 'es_ff_b2_9',
    level: 'B2',
    trapTitle: 'B2 Trap: "Evidencia" vs "Pruebas"',
    falseFriendPair: 'Pruebas / Indicios (Forensic or legal evidence) vs Evidencia (Obvious certainty)',
    situationPrompt: 'You want to say in Spanish: "The prosecutor presented conclusive evidence during the trial."',
    targetSentenceWithBlank: 'El fiscal presentó _____ contundentes durante el juicio.',
    fullCorrectSentence: 'El fiscal presentó pruebas contundentes durante el juicio.',
    correctAnswer: 'pruebas',
    options: ['pruebas', 'evidencias obvias', 'opiniones', 'rumores'],
    contrastExplanation: 'In natural legal and academic Spanish, "evidence" presented to prove something is "las pruebas" ("presentar pruebas").'
  },
  {
    id: 'es_ff_b2_10',
    level: 'B2',
    trapTitle: 'B2 Trap: " Aplicación" vs "Solicitud / Candidatura"',
    falseFriendPair: 'Solicitud (Job/visa application) ≠ Aplicación móvil (Software app)',
    situationPrompt: 'You want to say in Spanish: "I submitted my scholarship application before the deadline."',
    targetSentenceWithBlank: 'Presenté mi _____ de beca antes de que venciera el plazo.',
    fullCorrectSentence: 'Presenté mi solicitud de beca antes de que venciera el plazo.',
    correctAnswer: 'solicitud',
    options: ['solicitud', 'aplicación', 'pantalla', 'programa'],
    contrastExplanation: '"Una aplicación" is a mobile/computer software app (or the implementation of a rule). When applying for a job, visa, or scholarship, always use "la solicitud" (or "candidatura") and the verb "solicitar / postularse".'
  }
];
