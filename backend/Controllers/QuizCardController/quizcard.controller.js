import { saveQuizcardService } from "../../Services/CardsSaveSevice/quizcard.service.js";
import { handleQuizFileUploadService } from "../../Services/FileUploadServices/quizfileupload.service.js";
import { quizcardgeminiapi } from "../../Services/GeminiApiLogic/quizcardgeminiapi.service.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { decodedToken } from "../../Utils/decodedtoken.js";
// import { deductCredits } from "../../Utils/creditssubtraction.js";

export const quizfileupload = async (req, res) => {
  try {
    const response = await handleQuizFileUploadService(req);
    return res.status(200).json({
      result: response,
    })

  } catch (error) {

  if (error.message === "Insufficient credits") {
      return res.status(500).json({
        message:
          "You have no credits left. Please wait until your credits are refreshed.",
      });
    }

    return res.status(500).json({ error: error.message });
  }
};

export const quizcardgeneratefromtext = async (req, res) => {
  const { text } = req.body;
  const userId = decodedToken(req);

  if (!text || !userId) {
    return res.status(400).json({
      message: "text are required",
    });
  }

  try {
    // const remainingCredits = await deductCredits(userId, 10);

    const result = await quizcardgeminiapi(text);

    return res.status(200).json({
      message: "QuizCard content generated successfully",
      data: result,
      // remainingCredits,
    });
  } catch (error) {
    // if (error.message === "Insufficient credits") {
    //   return res.status(500).json({
    //     message:
    //       "You have no credits left. Please wait until your credits are refreshed.",
    //   });
    // }
    res.status(500).json({
      message: error.message,
    });
  }
};

export const quizcardsave = async (req, res) => {
  const response = await saveQuizcardService(req);
  return res.status(response.status).json({
    result: response.data,
  });
};

export const quizcardexplain = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_3);

    const { question, options, answer } = req.body;

    if (!question || !options || !answer) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const prompt = `
Explain logically and in simple terms why the correct answer to the following multiple-choice question is correct.
The explanation must be in the same language as the question text.

Question: ${question}

Options: ${options.join(", ")}

Correct Answer: ${answer}
    `.trim();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });
    const result = await model.generateContent(prompt);

    const response = result.response;
    const explanation =
      response.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No explanation found.";

    if (!explanation) {
      return res
        .status(500)
        .json({ error: "Failed to generate explanation text." });
    }

    res.status(200).json({
      explanation,
    });
  } catch (err) {
    console.error("Error in quizCardExplain:", err);
    res.status(500).json({ error: "Failed to generate explanation." });
  }
};
