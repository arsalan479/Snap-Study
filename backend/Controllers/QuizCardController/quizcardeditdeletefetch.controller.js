import quizcardmodel from "../../Models/QuizCarsSystemModel/quizcard.model.js";
import quizcardfilemodel from '../../Models/QuizCarsSystemModel/quizcardfile.model.js';
import { AlldeleteUserQuizCards,deleteEntireQuizCardDocument, deleteSpecificQuizCard,} from "../../Services/EditDeleteFetch/deletecardsystem.service.js";
import { fetchdatacardquiz } from "../../Services/EditDeleteFetch/fetchdata.service.js";
import { decodedToken } from "../../Utils/decodedtoken.js";

export const fetchquizcard = async (req, res) => {
  try {
    const userId = decodedToken(req);

    if (!userId) {
      return res.status(400).json({
        message: "id is missing",
      });
    }

    const response = await fetchdatacardquiz(userId);

    if (!response) {
      return res.status(404).json({
        message: "some error in response",
      });
    }

    return res
      .status(200)
      .json({ message: "quizcardDataFetch Successfully", response });
  } catch (error) {
    return res.status(500).json({
      message: `something wrong ${error}`,
    });
  }
};

export const quizcardDelete = async (req, res) => {
  try {
    const userId = decodedToken(req);
    const { subject } = req.params;

    if (!userId || !subject) {
      return res.status(400).json({
        message: "missing info",
      });
    }

    const deletionResult = await AlldeleteUserQuizCards(userId, subject);

    return res.status(200).json({
      message: "all quiz card deleted Successfully",
      deleteCount: deletionResult.deletedCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const QuizdeleteSpecificCard = async (req, res) => {
  try {
    const UserId = decodedToken(req);
    const cardId = req.params.id;

    if (!UserId || !cardId) {
      return res.status(400).json({
        message: "User ID or Card ID is missing",
      });
    }

    const result = await deleteSpecificQuizCard(UserId, cardId);

    return res.status(200).json({
      message: "Quiz Card deleted successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const CardDelete = async (req, res) => {
  try {
    const userId = decodedToken(req);
    const objId = req.params.id;

    if (!userId || !objId) {
      return res.status(400).json({
        message: "Id's is missing",
      });
    }

    const result = await deleteEntireQuizCardDocument(userId, objId);

    return res.status(200).json({
      message: "card successfully deleted",
      deleteDocument: result.deletedDocument,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Internal server error ${error}`,
    });
  }
};

export const QuizTitleupdate = async (req, res) => {
  try {
    const userId = decodedToken(req);
    const Quizid = req.params.id;
    const { title } = req.body;

    if (!userId || !title) {
      return res.status(400).json({
        message: "id or title is missing",
      });
    }

    const result = await quizcardmodel.updateOne(
      { _id: Quizid, UserLoginId: userId },
      { $set: { Title: title } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        success: false,
        message:
          "The new title is the same as the current title. Please provide a different title to update.",
      });
    }
    return res.status(200).json({
      message: "title updated successfully",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: `something wrong ${error}`,
    });
  }
};

