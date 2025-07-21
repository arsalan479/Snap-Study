import  { Router } from 'express';
import {  decline, fetchalluser, freindsearch, getnotificaion, sendrequest } from '../../Controllers/RoomCreateController/createroom.controller.js';
import { aitopicsendtext, sumbitquizdata } from '../../Controllers/RoomCreateController/aiquizcompetion.controller.js';
import { body } from 'express-validator';

const route = Router();


route.get('/fetchuser',fetchalluser)

route.get('/friendsearch',freindsearch)

route.post('/sendrequest',sendrequest)

route.get('/getnotify',getnotificaion)

route.delete('/decline/:notificationcurrentId',decline)

route.post('/sendcomp',
        body('topicName').isString().notEmpty().withMessage('Topic is required')
        .isLength({min:10}).withMessage("topic name minium define is 10 character")
        .isLength({max:100}).withMessage("topic define only 100 maximum character"),
        body('numberofquestions').isString().notEmpty().withMessage('Number of Question is required'),
        body('levels').isString().notEmpty().withMessage("choose a level")
    ,aitopicsendtext)


route.post('/sumbitquizdata',sumbitquizdata);


export default route;