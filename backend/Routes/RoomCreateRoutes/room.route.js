import  { Router } from 'express';
import {  acceptrequest, decline, fetchalluser, freindsearch, getnotificaion, sendrequest } from '../../Controllers/RoomCreateController/createroom.controller.js';
import { aitopicsendtext, quizcompdatafetch, quizcompdatasave, sumbitquizdata,qicompdatadelete } from '../../Controllers/RoomCreateController/aiquizcompetion.controller.js';
import { body } from 'express-validator';
import { bookmark, bookmarkdelete,compdatafetch,competionpost,deletecompPost,fetchbookmark, userpost } from '../../Controllers/RoomCreateController/bookmark.controller.js';

const route = Router();


route.get('/fetchuser',fetchalluser)

route.get('/friendsearch',freindsearch)

route.post('/sendrequest',sendrequest)

route.get('/getnotify',getnotificaion)

route.delete('/decline/:notificationcurrentId',decline)

route.get('/acceptrequest/:senderId',acceptrequest)


route.post('/sendcomp',
        body('topicName').isString().notEmpty().withMessage('Topic is required').matches(/^[A-Za-z\s]+$/).withMessage("Topic Name only taking a alphabates not numbers")
        .isLength({min:10}).withMessage("topic name minium define is 10 character")
        .isLength({max:100}).withMessage("topic define only 100 maximum character"),
        body('numberofquestions').isString().notEmpty().withMessage('Number of Question is required'),
        body('levels').isString().notEmpty().withMessage("choose a level")
,aitopicsendtext)

route.post('/sumbitquizdata',sumbitquizdata);

route.post('/aicompdatasave',quizcompdatasave)

route.get('/getcompdata',quizcompdatafetch)

route.delete('/deletecompdata/:cardId',qicompdatadelete)


//bookmark routes

route.post('/bookmark/:cardId',bookmark);

route.delete('/bookmarkdelete/:bookmarkId',bookmarkdelete)

route.get('/fetchbookmark',fetchbookmark)

route.post('/competionpost/:compId',competionpost);

route.get('/compdatafetch',compdatafetch)

route.delete('/compPostdelete/:compcardId',deletecompPost)

route.get('/userpost/:compId',userpost)

export default route;