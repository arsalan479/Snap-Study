import { validationResult } from "express-validator";
import { quiztopictext } from "../../Services/GeminiApiLogic/aicomptopic.service.js";
import { aicompetationprompt } from "../../Utils/GeminiPrompts/prompt.js";
import { aicompdatacreate } from "../../Services/CardsSaveSevice/quizcard.service.js";
import { decodedToken } from "../../Utils/decodedtoken.js";
import competiondata from "../../Models/UserRooms/quizcompdata.model.js";

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
    const { quiz } = req.body;

    if (!quiz) {
      return res.status(400).json({
        message: "quiz is missing",
      });
    }

    const result = quiz.map((q) => ({
      question: q.question,
      selectedAnswer: q.selectedAnswer,
      correctAnswer: q.correctAnswer,
      isCorrect: q.selectedAnswer === q.correctAnswer,
    }));

    const score = result.filter((r) => r.isCorrect).length;

    return res.status(200).json({
      result: result,
      score: score,
      total: result.length,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const quizcompdatasave = async (req, res) => {
 
  try {

    const userId = decodedToken(req);
    const {
      topicName,
      numberofquestion,
      levels,
      correctedAnswer,
      score,
      WrongAnswer,
      total,
      quizdatacards,
    } = req.body;

    if (
      !userId ||
      !topicName ||
      !numberofquestion ||
      !levels ||
      !score ||
      !total ||
      !quizdatacards
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const response = await competiondata.create({
      userId,
      topicName,
      numberofquestion,
      levels,
      correctedAnswer,
      WrongAnswer,
      score,
      total,
      quizdatacards,
    });

    return res.status(201).json({
      message: "data create successfully",
      data: response,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
