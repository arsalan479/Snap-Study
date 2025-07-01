import { Router } from "express";
import multer from "multer";
import { storage } from "../../Config/FileUploadCloud/file.cloudinary.js";
import { fileupload,extractTextFromImage, flashcardsave, flashcardgeneratefromtext} from "../../Controllers/FileUploadController/fileupload.controller.js";

const route = Router();


const upload=multer({storage});
route.post('/file-upload-flash',upload.single('file'),fileupload);

route.post('/extract-text',extractTextFromImage);

route.post('/generate-text',flashcardgeneratefromtext);

route.post('/flashcard-save',  flashcardsave);




export default route;