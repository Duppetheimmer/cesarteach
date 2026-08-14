// Speech Synthesis Utility for English and Spanish courses

export type SupportedLang = 'es' | 'en' | 'es-ES' | 'en-US' | 'es-MX';

// Common Spanish words and patterns to reliably detect Spanish even without accent marks
const SPANISH_PATTERN = /[áéíóúüñ¿¡]|(\b(hola|adios|buenos|buenas|dias|tardes|noches|gracias|por|favor|de|nada|como|estas|donde|cuando|quien|que|cual|porque|yo|tu|el|ella|usted|nosotros|nosotras|ellos|ellas|ustedes|soy|eres|es|somos|son|estoy|estas|esta|estamos|estan|tengo|tienes|tiene|tenemos|tienen|puedo|puedes|puede|podemos|pueden|quiero|quieres|quiere|queremos|quieren|hablo|hablas|habla|hablamos|hablan|como|comes|come|comemos|comen|vivo|vives|vive|vivimos|viven|me|te|se|nos|mi|mis|tu|tus|su|sus|nuestro|nuestra|un|una|unos|unas|este|esta|estos|estas|ese|esa|esos|esas|aquel|aquella|amigo|amiga|casa|perro|gato|trabajo|ciudad|tiempo|hombre|mujer|chico|chica|nino|nina|libro|mesa|calle|hermano|hermana|madre|padre|hijo|hija|dinero|agua|comida|muy|bien|mal|grande|pequeno|feliz|triste|nuevo|viejo|facil|dificil|si|no|pero|tambien|siempre|nunca|aqui|alla|hoy|ayer|manana|ser|estar|tener|hacer|ir|ver|dar|saber|querer|poder|decir|gustar|gusta|gustan)\b)/i;

/**
 * Checks if a given text is in Spanish
 */
export function isSpanishText(text: string): boolean {
  if (!text) return false;
  return SPANISH_PATTERN.test(text);
}

/**
 * Get available voices from window.speechSynthesis
 */
let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    cachedVoices = voices;
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadVoices();
  };
}

/**
 * Finds the highest quality voice for the desired language
 */
export function getBestVoice(targetLang: 'es' | 'en'): SpeechSynthesisVoice | null {
  const voices = cachedVoices.length > 0 ? cachedVoices : loadVoices();
  if (!voices || voices.length === 0) return null;

  if (targetLang === 'es') {
    // 1. Preferred Spanish voices
    const preferredSpanish = voices.find(v => 
      (v.lang.startsWith('es') || v.lang === 'es-ES' || v.lang === 'es-MX' || v.lang === 'es-US' || v.lang === 'es-419') &&
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Monica') || v.name.includes('Paulina') || v.name.includes('Jorge') || v.name.includes('Sabina') || v.name.includes('Mónica'))
    );
    if (preferredSpanish) return preferredSpanish;

    // 2. Any Spanish voice
    const anySpanish = voices.find(v => v.lang.toLowerCase().startsWith('es'));
    if (anySpanish) return anySpanish;
  } else {
    // 1. Preferred English voices
    const preferredEnglish = voices.find(v => 
      (v.lang.startsWith('en') || v.lang === 'en-US' || v.lang === 'en-GB') &&
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Jenny') || v.name.includes('Guy'))
    );
    if (preferredEnglish) return preferredEnglish;

    // 2. Any English voice
    const anyEnglish = voices.find(v => v.lang.toLowerCase().startsWith('en'));
    if (anyEnglish) return anyEnglish;
  }

  return null;
}

export interface PlaySpeechOptions {
  lang?: SupportedLang;
  rate?: number;
  pitch?: number;
  onEnd?: () => void;
  courseLanguage?: 'en' | 'es';
}

/**
 * Speaks text using the device's native SpeechSynthesis engine with precise Spanish/English voice routing
 */
export function playSpeech(text: string, options: PlaySpeechOptions = {}): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return;

  try {
    window.speechSynthesis.cancel();

    // Determine if language should be Spanish or English
    let targetLangCode: 'es-ES' | 'en-US' = 'en-US';
    let targetLangType: 'es' | 'en' = 'en';

    if (options.lang) {
      if (options.lang.startsWith('es')) {
        targetLangCode = 'es-ES';
        targetLangType = 'es';
      } else {
        targetLangCode = 'en-US';
        targetLangType = 'en';
      }
    } else if (options.courseLanguage) {
      if (options.courseLanguage === 'es') {
        targetLangCode = 'es-ES';
        targetLangType = 'es';
      } else {
        targetLangCode = 'en-US';
        targetLangType = 'en';
      }
    } else {
      // Auto-detect based on text content
      if (isSpanishText(text)) {
        targetLangCode = 'es-ES';
        targetLangType = 'es';
      } else {
        targetLangCode = 'en-US';
        targetLangType = 'en';
      }
    }

    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = targetLangCode;
    utterance.rate = options.rate ?? 0.9;
    utterance.pitch = options.pitch ?? 1.0;

    const matchedVoice = getBestVoice(targetLangType);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    if (options.onEnd) {
      utterance.onend = options.onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn('Speech synthesis error:', error);
  }
}
