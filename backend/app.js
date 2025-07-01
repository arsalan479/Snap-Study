import express from 'express';
import database from './Config/dbconnection.js';
import googleauthroute from './Routes/UserAuthRoutes/googleauth.route.js';
import githubauthroute from './Routes/UserAuthRoutes/githubauth.route.js';
import googleinputmagicroute from './Routes/UserAuthRoutes/googlemagic.route.js';
import adminauthroute from './Routes/AdminAuthRoutes/adminauth.route.js';
import verfifyrecaptcharoute from './Routes/VerifyUserReCapcha/verifyrecaptcha.route.js';
import fileuploadroute from './Routes/FileUploadCloudRoutes/fileupload.route.js';
import editdeletesystem from './Routes/FileUploadCloudRoutes/editdeletesystem.route.js'
import quizcardsroutes from './Routes/QuizCardRoutes/quizcard.route.js';
import quizcardeditdeletefetch from './Routes/QuizCardRoutes/quizcardeditdeletefetch.route.js'
import passport from 'passport';
import cors from 'cors';
import './Config/googleauth/google.passport.js';
import './Config/githubauth/github.passport.js';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';


const app = express();



app.use(cookieParser());

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true   }))



app.use(passport.initialize());





//google route
app.use('/auth',googleauthroute);


//github route
app.use('/auth',githubauthroute);


//google magic input route
app.use('/auth/magic',googleinputmagicroute);


//admin route
app.use('/admin',adminauthroute)


//verifyreCAPTCHA ROUTE FOR V2 AND V3
app.use('/auth',verfifyrecaptcharoute)


//fileuploadrouteoncloud
app.use('/api/file',fileuploadroute)


//edit and delete system
app.use('/editdelete',editdeletesystem)

app.use('/api/quiz',quizcardsroutes)
app.use('/api/quiz/crud',quizcardeditdeletefetch)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log("your server is running on port 3000")
})
