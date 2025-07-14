import  { Router } from 'express';
import { acceptrequest, fetchalluser, getonlinefriends, sendjoinrequest } from '../../Controllers/RoomCreateController/createroom.controller.js';

const route = Router();


route.get('/fetchuser',fetchalluser)
route.get('/onlinefriend',getonlinefriends);
route.post('/sendrequest',sendjoinrequest);
route.post('/acceptrequest',acceptrequest)


export default route;