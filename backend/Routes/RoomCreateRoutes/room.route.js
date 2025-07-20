import  { Router } from 'express';
import {  decline, fetchalluser, freindsearch, getnotificaion, sendrequest } from '../../Controllers/RoomCreateController/createroom.controller.js';

const route = Router();


route.get('/fetchuser',fetchalluser)

route.get('/friendsearch',freindsearch)

route.post('/sendrequest',sendrequest)

route.get('/getnotify',getnotificaion)

route.get('/decline/:notificationcurrentId',decline)


export default route;