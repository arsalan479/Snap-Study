import  { Router } from 'express';
import { acceptrequest, getonlinefriends, sendjoinrequest } from '../../Controllers/RoomCreateController/createroom.controller.js';

const route = Router();


route.get('/onlinefriend',getonlinefriends);
route.post('/sendrequest',sendjoinrequest);
route.post('/acceptrequest',acceptrequest)


export default route;