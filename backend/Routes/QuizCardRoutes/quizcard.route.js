import { Router } from "express";
import multer from "multer";
import { quizcardgeneratefromtext, quizcardsave, quizfileupload } from "../../Controllers/QuizCardController/quizcard.controller.js";
import { storage } from "../../Config/FileUploadCloud/quizfile.cloudinary.js";
import { extractTextFromImage } from "../../Controllers/FileUploadController/fileupload.controller.js";

const route = Router();


const upload = multer({storage})
route.post('/file-upload-quiz',upload.single('file'),quizfileupload);

route.post('/extractfile-quiz',extractTextFromImage);

route.post('/quizgeminiapi',quizcardgeneratefromtext)

route.post('/quizcard-save',quizcardsave)

export default route;