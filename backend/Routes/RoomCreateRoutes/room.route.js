import  { Router } from 'express';
import { acceptrequest, fetchalluser, freindsearch, friendrequest, getonlinefriends, sendjoinrequest } from '../../Controllers/RoomCreateController/createroom.controller.js';

const route = Router();


route.get('/fetchuser',fetchalluser)

route.get('/friendsearch',freindsearch)

route.post('/sendrequest',friendrequest)



route.get('/onlinefriend',getonlinefriends);
route.post('/sendrequest',sendjoinrequest);
route.post('/acceptrequest',acceptrequest)


export default route;