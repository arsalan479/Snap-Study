import { Router } from "express";
import passport from "passport";
import { jwtgooglemail } from "../../Utils/jsonwebtoken.nodemailgoogle.js";

const route = Router();


route.get('/github', passport.authenticate('github', { scope: ['user:email'],session:false }));


route.get('/github/callback',
    passport.authenticate('github',{
        session:false,
        // failureRedirect:'/auth/github/failure'
    },
    ),(req,res)=>{

        const message = "This email is already registered with another account."

        if(req.user.exists){
     return res.redirect(`http://localhost:5173/?error=${encodeURIComponent(message)}`)

        }

        jwtgooglemail(req.user,res,"GitHub login successful")
      
   if(req.user.role == 'admin'){
        return res.redirect("http://localhost:5173/AdminDashboard")
     }

        return res.redirect(`http://localhost:5173/dashboard?success=true&name=${req.user.displayName}`);
    }

  

    
    )





export default route;