import axios from "axios";
import { quizeprompt} from "../../Utils/GeminiPrompts/prompt.js";

export const quizcardgeminiapi = async (text) => {   
  
const prompt =  quizeprompt(text) 



  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: "application/json",
    },
  };

  const url = `${process.env.BASE_URL}/${process.env.MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  try {
    const res = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
    });

    let raw = res.data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!raw) throw new Error("Empty response from Gemini");

    // Remove markdown-like formatting if any
    raw = raw.replace(/^```json|```$/g, "").trim();

    try {
      const flashcards = JSON.parse(raw);

      if (!Array.isArray(flashcards)) {
        throw new Error("Response is not a JSON array");
      }

      const isValid = flashcards.every(
        (item) => typeof item.question === "string" && typeof item.answer === "string"
      );

      if (!isValid) throw new Error("One or more flashcards are malformed.");

      return flashcards;
    } catch (jsonErr) {
      console.error("⚠️ JSON Parse Error:\n", raw);
      throw new Error("Invalid JSON response from Gemini.");
    }
  } catch (err) {
    console.error("❌ Gemini API Error:", err.response?.status, err.response?.data || err.message);
    throw err;
  }
};
