import { decodedToken } from "../../Utils/decodedtoken.js";
import quizcardfilemodel from "../../Models/QuizCarsSystemModel/quizcardfile.model.js";
import { deductCredits } from "../../Utils/creditssubtraction.js";

export const handleQuizFileUploadService = async (req) => {
  
  if (!req.file) {
    throw new Error("No file uploaded.");
  }

  const filetype = req.file.mimetype.includes("pdf") ? "pdf" : "image";

  const UserLoginId = decodedToken(req);
  if (!UserLoginId) {
    throw new Error("Unauthorized: Please login correctly.");
  }

  const remainingCredits = await deductCredits(UserLoginId, 10);

  const newFile = new quizcardfilemodel({
    fileUrl: req.file.path,
    filetype,
    UserLoginId,
  });

  await newFile.save();

  return {
    message: "QuizCard file uploaded successfully.",
    file: newFile,
    remainingCredits,
  };
};
