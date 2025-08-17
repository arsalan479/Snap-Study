import { Router } from 'express';
import { alluserdata, deleteuser } from '../../Controllers/AdminAuthController/adminauth.controller.js';

const route = Router();

route.get('/alluserdata',alluserdata);

route.delete('/userdelete/:userId',deleteuser)

export default route;   