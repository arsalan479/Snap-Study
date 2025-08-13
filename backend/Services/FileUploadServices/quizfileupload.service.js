import { decodedToken } from "../../Utils/decodedtoken.js";
import quizcardfilemodel from "../../Models/QuizCarsSystemModel/quizcardfile.model.js";
import { deductCredits } from "../../Utils/creditssubtraction.js";
import path from 'path';

export const handleQuizFileUploadService = async (req) => {
  if (!req.file) {
    throw new Error("No file uploaded.");
  }

  const allowedimages = ["image/png", "image/jpeg", "image/jpg"];
  const allowedExtension = [".png", ".jpg", ".jpeg"];

  if (!allowedimages.includes(req.file.mimetype)) {
    throw new Error("Only PNG, JPG, and JPEG files are allowed.");
  }

  const fileExt = path.extname(req.file.originalname).toLowerCase();
  if (!allowedExtension.includes(fileExt)) {
    throw new Error(
      "File extension not allowed. Only PNG, JPG, and JPEG are supported."
    );
  }

  const UserLoginId = decodedToken(req);
  if (!UserLoginId) {
    throw new Error("Unauthorized: Please login correctly.");
  }

  const remainingCredits = await deductCredits(UserLoginId, 10);

  const newFile = new quizcardfilemodel({
    fileUrl: req.file.path,
    filetype: "image",
    UserLoginId,
  });

  await newFile.save();

  return {
    message: "QuizCard file uploaded successfully.",
    file: newFile,
    remainingCredits,
  };
};
