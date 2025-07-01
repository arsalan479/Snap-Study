import { Router } from "express";
import { google, googlecallback, userfetch } from "../../Controllers/UserAuthController/googleauth.controller.js";

const route = Router();


route.get('/google',google);

route.get('/google/callback',googlecallback)

route.get('/userfetch',userfetch)



export default route;
