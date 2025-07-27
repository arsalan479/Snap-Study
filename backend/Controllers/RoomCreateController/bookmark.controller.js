import { decodedToken } from "../../Utils/decodedtoken.js";
import quizcardmodel from "../../Models/QuizCarsSystemModel/quizcard.model.js";
import Bookmark from "../../Models/UserRooms/bookmark.model.js";

export const bookmark = async (req, res) => {
  const userId = decodedToken(req);
  const { cardId } = req.params;

  if (!userId || !cardId) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {

    const result = await quizcardmodel.findOne(
      {
        UserLoginId: userId,
        "Cards._id": cardId
      },
      {
        "Cards.$": 1,
        title: 1,
        subject: 1
      }
    );


    if (!result || !result.Cards || result.Cards.length === 0) {
      return res.status(404).json({
        message: "Card not found",
      });
    }

    const card = result.Cards[0];           

    const createBookmark = await Bookmark.create({
      userId,
      title,
      subject,
      cards: [card],
    });

    return res.status(201).json({
      message: "Card bookmarked successfully",
      data: createBookmark,
    });

  } catch (error) {
    return res.status(500).json({
      message: `Something went wrong: ${error.message}`,
    });
  }
};

export const bookmarkdelete = async (req, res) => {
  const userId = decodedToken(req);
  const { bookmarkId } = req.params;
  try {
    if (!userId || !bookmarkId) {
      return res.status(400).json({
        message: "missinginfo",
      });
    }

    const response = await Bookmark.findByIdAndDelete({
      userId,
      _id: bookmarkId,
    });

    return res.status(200).json({
      message: "deletebookmark",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchbookmark = async (req, res) => {

    const userId = decodedToken(req);

  if (!userId) {
    return res.status(400).json({
      message: "missinginfo",
    });
  }

  try {
    const response = await Bookmark.find({ userId });
    if (!response) {
      return res.status(404).json({
        message: "bookmark not found",
      });
    }

    return res.status(200).json({
      message: "fetchbookmark",
      data: response,
    });
  } catch (error) {
return res.status(500).json({
  message: error.message,
});  
}
}