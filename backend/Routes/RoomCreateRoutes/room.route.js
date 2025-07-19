import  { Router } from 'express';
import {  fetchalluser, freindsearch, getnotificaion, sendrequest } from '../../Controllers/RoomCreateController/createroom.controller.js';

const route = Router();


route.get('/fetchuser',fetchalluser)

route.get('/friendsearch',freindsearch)

route.post('/sendrequest',sendrequest)

route.get('/getnotify',getnotificaion)



export default route;