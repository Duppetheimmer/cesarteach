import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
app.use(express.json({ limit: "5mb" }));

const PORT = 3000;

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// 1. AI Tutor Chat Endpoint
app.post("/api/ai/tutor", async (req, res) => {
  try {
    const { messages, scenario, targetLang = "en" } = req.body;
    const ai = getGenAI();

    let systemInstruction = targetLang === "es"
      ? `You are "Aria", a virtual SPANISH tutor created specifically for native ENGLISH SPEAKERS learning A1 Spanish (Beginners).
Your goal is to guide the student in learning Spanish through friendly, encouraging conversation.
Guidelines:
1. Speak in simple A1 Level Spanish using short sentences and high-frequency vocabulary.
2. ALWAYS provide clear English translations in parentheses for key phrases and sentences (e.g. "¡Hola! ¿Cómo estás? (Hello! How are you?)").
3. If the English-speaking student makes a grammar or vocabulary mistake in Spanish, add a short section at the end called "💡 Grammar Tip / Correction:" written in clear English explaining the rule.
4. At the end, provide 2 or 3 suggested replies in Spanish with English translations in parentheses to guide the student.
5. Always be patient, warm, and highly supportive of English native speakers learning Spanish.`
      : `Eres "Aria", una tutora virtual de inglés especializada en estudiantes de Nivel A1 (Principiantes).
Tu objetivo es mantener una conversación amigable, clara y motivadora.
Pautas:
1. Responde principalmente en inglés de Nivel A1 con oraciones cortas y vocabulario sencillo.
2. Si detectas un error en la intervención previa del estudiante, agrega al final de tu respuesta una sección breve en español llamada "💡 Consejo de Gramática / Corrección:".
3. Al final, proporciona 2 o 3 sugerencias de respuesta en inglés para orientar al alumno.
4. Sé siempre paciente y alentadora.`;

    if (scenario) {
      systemInstruction += `\n\nESCENARIO DE PRÁCTICA SIMULADA:
Título del Escenario: ${scenario.title}
Tu Rol: ${scenario.aiRole}
Rol del Estudiante: ${scenario.userRole}
Misión o Meta: ${scenario.objective}`;
    }

    const conversationHistory = Array.isArray(messages) 
      ? messages.map((m: any) => `${m.role === 'user' ? 'Estudiante' : 'Aria'}: ${m.content}`).join('\n')
      : targetLang === 'es' ? "Hola Aria" : "Hola Aria";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: conversationHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const defaultReply = targetLang === 'es'
      ? "¡Hola! ¿Cómo estás hoy? ¡Qué alegría practicar español A1 contigo!"
      : "Hello! How are you today? I am glad to practice English with you!";

    const replyText = response.text || defaultReply;
    res.json({ success: true, reply: replyText });
  } catch (error: any) {
    console.error("Error in /api/ai/tutor:", error);
    res.status(500).json({
      success: false,
      error: error.message || "No se pudo conectar con el servicio de IA.",
      reply: req.body.targetLang === 'es'
        ? "¡Hola! ¿Cómo puedo ayudarte a practicar tu español A1 hoy?"
        : "Hello! How can I help you practice your A1 English today?"
    });
  }
});

// 2. Sentence Analysis Endpoint
app.post("/api/ai/analyze-sentence", async (req, res) => {
  try {
    const { sentence, targetLang = "en" } = req.body;
    if (!sentence || typeof sentence !== 'string') {
      return res.status(400).json({ success: false, error: "Por favor proporciona una oración." });
    }

    const ai = getGenAI();
    const systemInstruction = targetLang === "es"
      ? `You are an expert Spanish teacher for English speakers learning A1 Spanish. Analyze the provided Spanish or English sentence and return strictly JSON according to the schema. Explanations (explanationEs) and word meanings (meaningEs) MUST be written in English so the English native speaker can understand.`
      : `Eres un profesor de inglés de nivel A1. Analiza la frase recibida y responde strictly en formato JSON según el esquema especificado.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `Analiza la siguiente oración para un estudiante de nivel A1 (${targetLang === 'es' ? 'Español' : 'Inglés'}): "${sentence}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN, description: "True si la oración es gramaticalmente correcta para A1" },
            correctedSentence: { type: Type.STRING, description: "La oración corregida si contenía errores" },
            translationEs: { type: Type.STRING, description: "Traducción natural al español o inglés" },
            explanationEs: { type: Type.STRING, description: "Explicación breve y amigable de la regla gramatical" },
            grammarBreakdown: {
              type: Type.ARRAY,
              description: "Desglose de cada palabra",
              items: {
                type: Type.OBJECT,
                properties: {
                  word: { type: Type.STRING },
                  partOfSpeech: { type: Type.STRING, description: "Sustantivo, Verbo, Adjetivo, Preposición, Pronombre, etc." },
                  meaningEs: { type: Type.STRING, description: "Significado o equivalente" }
                },
                required: ["word", "partOfSpeech", "meaningEs"]
              }
            },
            pronunciationTip: { type: Type.STRING, description: "Consejo práctico de pronunciación" }
          },
          required: ["isCorrect", "correctedSentence", "translationEs", "explanationEs", "grammarBreakdown", "pronunciationTip"]
        }
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Error in /api/ai/analyze-sentence:", error);
    res.status(500).json({ success: false, error: error.message || "Error al analizar la frase." });
  }
});

// 3. Custom Topic Vocabulary Generator Endpoint
app.post("/api/ai/generate-topic-words", async (req, res) => {
  try {
    const { topic, targetLang = "en" } = req.body;
    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ success: false, error: "Indica un tema para generar vocabulario." });
    }

    const ai = getGenAI();
    const isEs = targetLang === "es";

    const contents = isEs
      ? `Generate 5 essential A1 Spanish words/phrases for an English speaker learning Spanish on the topic: "${topic}"`
      : `Genera 5 palabras esenciales de Nivel A1 sobre el tema: "${topic}"`;

    const systemInstruction = isEs
      ? `You are a Spanish vocabulary generator for English speakers learning A1 Spanish. Return 5 words where "word" is the Spanish word, "translation" is the English translation, "phonetic" is the phonetic pronunciation, "exampleEn" is the Spanish example sentence, and "exampleEs" is the English translation of that example sentence.`
      : `Eres un generador de vocabulario en inglés para estudiantes A1 de habla hispana.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING, description: isEs ? "Spanish word" : "Palabra en inglés" },
              translation: { type: Type.STRING, description: isEs ? "English translation" : "Traducción al español" },
              phonetic: { type: Type.STRING, description: "Pronunciación fonética aprox." },
              exampleEn: { type: Type.STRING, description: isEs ? "Ejemplo corto en español A1" : "Ejemplo de oracion corta en inglés A1" },
              exampleEs: { type: Type.STRING, description: isEs ? "Traducción del ejemplo al inglés" : "Traducción del ejemplo al español" }
            },
            required: ["word", "translation", "phonetic", "exampleEn", "exampleEs"]
          }
        }
      }
    });

    const words = JSON.parse(response.text || "[]");
    res.json({ success: true, words });
  } catch (error: any) {
    console.error("Error in /api/ai/generate-topic-words:", error);
    res.status(500).json({ success: false, error: error.message || "Error al generar vocabulario temático." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
