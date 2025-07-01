import { Router } from 'express';
import { getauser } from '../../Controllers/AdminAuthController/adminauth.controller.js';
import {verifytoken} from '../../Middleware/UserAuthMiddleware/verifyusertoken.js';

const route = Router();

route.get('/checkadmin', verifytoken ,(req,res)=>{
    res.status(200).json({
        message:"Welcome to admin dashboard",
        success:true
    })
})

export default route;   