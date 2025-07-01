import { Router } from "express";
import { CardUpdated, deleteSpecificCardFlash, flashcardDelete, flashcardfetch, FlashTitleupdate, Subjectupdate } from "../../Controllers/FileUploadController/editdeletesystem.controller.js";

const route = Router()


route.delete('/flashcardDelete',flashcardDelete);

route.delete('/SpecificDeleteFlash/:id',deleteSpecificCardFlash)

route.patch('/flashTitleupdate',FlashTitleupdate)

route.patch('/Subjectupdate',Subjectupdate)

route.patch('/CardUpdated/:id',CardUpdated)


route.get('/flashcardfetch',flashcardfetch)


export default route;