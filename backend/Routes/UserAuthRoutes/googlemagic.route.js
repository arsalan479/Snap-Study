import { Router } from "express";
import {allLogoutsystem, forgetPasswordById, googleinputlogin, googleregisterinput,googleverifyemailinput,resetPasswordById}  from '../../Controllers/UserAuthController/googleinputmagic.controller.js';
import { verifytoken } from "../../Middleware/UserAuthMiddleware/verifyusertoken.js";
import { checkAlreadyLoggedIn } from "../../Middleware/UserAuthMiddleware/checkAlreadyLoggedIn .js";
import { registervalidator } from "../../Middleware/Validtore/registervalidator.js";
import { body } from "express-validator";

const route = Router();



route.post('/register',registervalidator ,googleregisterinput);
route.post('/verifyemail',  googleverifyemailinput);
route.post('/googleinputlogin',googleinputlogin);

route.post('/forgetPasswordById',forgetPasswordById);
route.post('/resetPasswordById/:token', 
body('password')
.notEmpty().withMessage('password is required')
.isLength({min:8}).withMessage("Password must be at least 8 characters long")
.matches(/[0-9]/).withMessage('password must contain a number')
.matches(/[!@#$%&*]/).withMessage('password must contain a special character'),
resetPasswordById)

route.get('/logout',allLogoutsystem)

route.get('/verifytoken',verifytoken)
route.get('/checkalreadyuserloggedin',checkAlreadyLoggedIn)


export default route;
