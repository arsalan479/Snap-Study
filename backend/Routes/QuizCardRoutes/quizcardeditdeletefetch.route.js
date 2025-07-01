import { Router } from "express";
import { CardDelete, fetchquizcard, quizcardDelete, QuizdeleteSpecificCard, QuizTitleupdate } from "../../Controllers/QuizCardController/quizcardeditdeletefetch.controller.js";

const route = Router();


route.get('/quizcardfetch',fetchquizcard);

route.delete('/allquizcardDelete/:subject',quizcardDelete)

route.delete('/specificquizcardDelete/:id',QuizdeleteSpecificCard)

route.delete('/cardDelete/:id',CardDelete)

route.patch('/quizTitleUpadate/:id',QuizTitleupdate)

export default route;