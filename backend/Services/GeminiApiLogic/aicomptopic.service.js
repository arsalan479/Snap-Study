import { GoogleGenerativeAI } from "@google/generative-ai";

export const quiztopictext = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
  });

  const result = await model.generateContent(prompt);

  const response = result.response;

  const explanation =
    response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!explanation) {
    throw new Error("Failed to generate explanation");
  }

  return explanation;
};
