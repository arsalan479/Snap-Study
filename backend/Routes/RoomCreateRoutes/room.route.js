import  { Router } from 'express';
import {  decline, fetchalluser, freindsearch, getnotificaion, sendrequest } from '../../Controllers/RoomCreateController/createroom.controller.js';
import { aitopicsendtext } from '../../Controllers/RoomCreateController/aiquizcompetion.controller.js';

const route = Router();


route.get('/fetchuser',fetchalluser)

route.get('/friendsearch',freindsearch)

route.post('/sendrequest',sendrequest)

route.get('/getnotify',getnotificaion)

route.delete('/decline/:notificationcurrentId',decline)

route.post('/sendcomp',aitopicsendtext)



export default route;