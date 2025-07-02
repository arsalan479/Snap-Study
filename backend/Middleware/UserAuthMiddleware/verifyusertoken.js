import jwt, { decode } from 'jsonwebtoken';
import blacklistToken from '../../Models/UserOneScehma/BlackListToken.js';

export const verifytoken = async (req,res,next)=>{

const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if(!token){
   return res.status(403).json({ message: "Unauthorized User", success: false });
    }

const isBlackList = await blacklistToken.findOne({token})
if(isBlackList){
  return res.status(401).json({ message: "Token is blacklisted", success: false });

}

    try{
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        req.user = decoded
        next()
       
    }catch(error){
      
    return res.status(403).json({ message: "Token Is Expire", success: false });

    }

}