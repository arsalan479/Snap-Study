import { Router } from 'express';
import { alluserdata } from '../../Controllers/AdminAuthController/adminauth.controller.js';

const route = Router();

route.get('/alluserdata',alluserdata);

export default route;   