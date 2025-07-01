  import { jwtgooglemail } from "../../Utils/jsonwebtoken.nodemailgoogle.js";
  import { passwordresetverification, welcomeVerification } from "../../Utils/sendverificationcode.mailer.js";
  import UserOne from "../../Models/UserOneScehma/UserOne.model.js";
  import { comparepasssword, hashedpassword } from "../../Utils/hashpassword.js";
  import { googleinputuser } from "../../Services/UserAuthServices/gooleinputuser.service.js";
  import crypto from 'crypto'
  import { validationResult } from "express-validator";
import blacklistToken from "../../Models/UserOneScehma/BlackListToken.js";


  export const googleregisterinput = async (req, res) => {
    try {
      const { email, displayName, password } = req.body;
      const result = await googleinputuser({ email, displayName, password });
      return res.status(200).json({
        result,
        message: result.message,
        success: result.success,
        redirectURL: result.redirectURL
      });
    } catch (error) {
      if (error.message === 'Email is required') {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      if (error.message === 'User already exists') {
        return res.status(400).json({
          message: error.message,
          success: false,
        });
      }
      return res.status(500).json({
        message: "Internal server error",
        success: false
      });
    }
  }


export const googleverifyemailinput = async(req,res)=>{
    try {
      const {code}= req.body

if(!code){
      res.status(401).json({
        message:"Enter A Valid OTP!"
      })
    }

    const googleinputuser= await UserOne.findOne({
      'authMethods.googleuserbyemail.verificationCode':code
    }).select('authMethods.googleuserbyemail.verificationCode email displayName')

    if(!googleinputuser){
      return res.status(400).json({
        message:"invalid token or expire code otp",
        success:false
      })
    }

    
    

      googleinputuser.authMethods.googleuserbyemail.verified = true;
        googleinputuser.authMethods.googleuserbyemail.verificationCode = undefined;

        await googleinputuser.save();

        await welcomeVerification( googleinputuser.displayName, googleinputuser.email)

        //store jwt token
        jwtgooglemail(googleinputuser,res,"email verified and genereated jwt token")


  return res.status(200).json({
    message:"email verified successfully",
    success:true,
    email:googleinputuser.email,
    redirectURL:`http://localhost:5173/dashboard?success=true&name=${googleinputuser.displayName}`
  })

    } catch (error) {
  return res.status(500).json({
    message:`${"server error",error}`,
    success:false
  })
    }
  }



export const googleinputlogin = async(req,res)=>{

    try {
      const {email,password} = req.body;

if (!email || !password) {
      return res.status(400).json({
        message: "Email and Password are required",
      });
    }

    const userlogin = await UserOne.findOne({email}).select('authMethods.googleuserbyemail.password authMethods.googleuserbyemail.verified role displayName ')


    if(!userlogin){
      return res.status(401).json({
        message:"user email is not find please signup an then login"
      })
     }

    const checkemail = userlogin.authMethods?.googleuserbyemail;
    if(!checkemail || !checkemail.password){
     return  res.status(401).json({
        message:"your email is already register on different auth"
      })
    }
    

    const authpass = userlogin.authMethods.googleuserbyemail.password;

    const isMatch = await comparepasssword(password,authpass);

    if(!isMatch){
     return res.status(400).json({
        message:"email or password is incorrect"
      })
    }

       const userloginverified = userlogin.authMethods.googleuserbyemail.verified;

    if(userloginverified === false){
     return res.status(400).json({
        message:"your email is not verified",
      })

    }


    jwtgooglemail(userlogin,res,"LoginSuccessfully")

 if (userlogin.role === 'admin') {
      return res.status(200).json({
        message: "Admin login successful",
        success: true,
        redirectURL: `http://localhost:5173/AdminDashboard?success=true&name=${userlogin.displayName}&role=${userlogin.role}`
      });
    } 

     userlogin.authMethods.googleuserbyemail.password = undefined

     
     return res.status(200).json({
      message:"login successfully",
      success:true,
      userlogin,
      redirectURL:`http://localhost:5173/dashboard?success=true&name=${userlogin.displayName}`
    })

    } catch (error) {
      res.status(500).json({
        message:`server error on login ${error}`
      })
    }

}



  export const forgetPasswordById = async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required"
        });
      }

      const user = await UserOne.findOne({ email }).select('authMethods.googleuserbyemail.password');

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const hasPassword = user.authMethods?.googleuserbyemail?.password;

      if (!hasPassword) {
        return res.status(403).json({
          message: "This email is already registered.",
        });
      }

      const token = crypto.randomBytes(32).toString('hex')
      user.authMethods.googleuserbyemail.resetToken = token;
      user.authMethods.googleuserbyemail.resetTokenExpiry= Date.now() + 15 * 60 *1000; //5 min expiry
      await user.save()

      const resetLink = `${process.env.RESET_PASSWORD_LINK}/resetpassword/${token}`;
      const passwordsendemail = await passwordresetverification(email, resetLink, user.displayName);

      return res.status(200).json({
        message: "Email verified. Proceed to reset password.",
        token,
        resetLink,
        passwordsendemail
      });

    } catch (error) {
      return res.status(500).json({
        message: "Internal server error"
      });
    }
  };



  export const resetPasswordById = async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({
        message:'validation error',
        errors:errors.array()
      })
    }

  try {
  const { token } = req.params;
  const {password} = req.body;

 if (!token) {
      return res.status(400).json({
        message: "Token is missing from the request."
      });
    }

  const user = await UserOne.findOne({
     "authMethods.googleuserbyemail.resetToken": req.params.token,
  "authMethods.googleuserbyemail.resetTokenExpiry": { $gt: Date.now() }
  });


  if(!user){
    return res.status(401).json({
      message:"Token is invalid or has expired. Please request a new one.",
    });
  }

      const hashedPassword = await hashedpassword(password);
      user.authMethods.googleuserbyemail.password=hashedPassword

    user.authMethods.googleuserbyemail.resetToken=undefined
    user.authMethods.googleuserbyemail.resetTokenExpiry=undefined
    

      await user.save()


  return res.status(200).json({
    message:"Password reset successful. You can now log in with your new password.",
  });




  } catch (error) {
    res.status(500).json({
      message:"internal server error"
    })
  }

  }



export const allLogoutsystem = async(req,res)=>{
   
     res.clearCookie('token');
    const token = req.cookies.token

    await blacklistToken.create({token})
   
    return res.status(200).json({
      message:"logged out"
    })
}