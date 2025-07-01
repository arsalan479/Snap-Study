import passport from "passport"
import { jwtgooglemail } from "../../Utils/jsonwebtoken.nodemailgoogle.js";

export const github = (req,res,next)=>{
    passport.authenticate('github', { scope: ['user:email'],session:false })
    (req,res,next)
}

export const githubcallback = (req, res, next) => {
  passport.authenticate('github', { session: false }, (err, user, info) => {
    if (err) {
      return res.redirect(
        `http://localhost:5173/?error=${encodeURIComponent(err.message)}`
      );
    }

    if (!user) {
      return res.redirect(
        'http://localhost:5173/?error=github_authentication_failed'
      );
    }

    if (user.exists) {
      const message = "This email is already registered with another account.";
      return res.redirect(
        `http://localhost:5173/?error=${encodeURIComponent(message)}`
      );
    }

    try {
      // Issue JWT token
      jwtgooglemail(user, res, "GitHub login successful");

      // Role-based redirection
      if (user.role === 'admin') {
        return res.redirect(`http://localhost:5173/AdminDashboard?success=true&name=${encodeURIComponent(user.displayName)}&role=${encodeURIComponent(user.role)}`);
      }

      // Regular user redirection
      return res.redirect(
        `http://localhost:5173/dashboard?success=true&name=${encodeURIComponent(user.displayName)}`
      );
      
    } catch (error) {
      return res.redirect(
        `http://localhost:5173/?error=${encodeURIComponent('Authentication processing failed')}`
      );
    }
  })(req, res, next);
};
      

  
