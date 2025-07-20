import { GoogleGenerativeAI } from "@google/generative-ai";

export const quiztopictext = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_2);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-latest",
  });

  const result = await model.generateContent(prompt);

  const response = result.response;

  let explanation = response.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!explanation) {
    throw new Error("Empty response from Gemini");
  }

  explanation = explanation.replace(/^```json|```$/g, "").trim();

  try {
    const data = JSON.parse(explanation);
    if (!data) {
      throw new Error("data is not manage");
    }
    return data;
  } catch (error) {}
};
