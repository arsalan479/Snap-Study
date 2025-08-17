import quizcardmodel from "../../Models/QuizCarsSystemModel/quizcard.model.js";
import QuizFileData from "../../Models/QuizCarsSystemModel/quizcardfile.model.js";
import UserOne from "../../Models/UserOneScehma/UserOne.model.js";
import Bookmark from "../../Models/UserRooms/bookmark.model.js";
import post from "../../Models/UserRooms/compPoststore.js";
import competiondata from "../../Models/UserRooms/quizcompdata.model.js";

export const alluserdata = async (req, res) => {
  try {
    const result = await UserOne.find({ role: "user" });
    if (!result) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
    return res.status(200).json({
      message: "User Found",
      result,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteuser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        message: "id is not found",
      });
    }

    const response = await UserOne.findByIdAndDelete({ _id: userId });

    await Promise.all([
      post.deleteMany({ userId }),
      Bookmark.deleteMany({ userId }),
      quizcardmodel.deleteMany({ UserLoginId: userId }),
      QuizFileData.deleteMany({ UserLoginId: userId }),
      competiondata.deleteMany({ userId }),
    ]);

    return res.status(200).json({
      message: "delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
