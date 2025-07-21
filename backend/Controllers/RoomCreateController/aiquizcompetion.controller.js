import { validationResult } from "express-validator";
import { quiztopictext } from "../../Services/GeminiApiLogic/aicomptopic.service.js";
import { aicompetationprompt } from "../../Utils/GeminiPrompts/prompt.js";

export const aitopicsendtext = async (req, res) => {
  try {
    const { topicName, numberofquestions, levels } = req.body;

    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({
        message: "validation error",
        error: err.array(),
      });
    }

    const prompt = aicompetationprompt(numberofquestions, topicName, levels);

    const response = await quiztopictext(prompt);

    return res.status(200).json({
      response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const sumbitquizdata = async (req, res) => {
try {
    const {quiz} = req.body;

  if (!quiz) {
    return res.status(400).json({
      message: "quiz is missing",
    });
  }

  const result = quiz.map((q) => ({
    question: q.question,
    selectedAnswer: q.selectedAnswer,
    correctAnswer: q.correctAnswer,
    isCorrect:q.selectedAnswer === q.correctAnswer
  }));

  const score = result.filter(r => r.isCorrect).length;

  return res.status(200).json({
   result: result,
  score:  score,
  total:result.length
  })

} catch (error) {
  return res.status(500).json({
    error:error.message
  })  
}
};


