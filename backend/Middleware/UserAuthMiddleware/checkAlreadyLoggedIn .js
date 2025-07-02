import jwt from 'jsonwebtoken';
import blacklistToken from '../../Models/UserOneScehma/BlackListToken.js';


export const checkAlreadyLoggedIn = async(req,res)=>{

    const token = req.cookies.token;

    if(!token){
        return res.status(200).json({
            isAuthenticated:false
        })
    }


    const isBlackList = await blacklistToken.findOne({token})
    if(isBlackList){
        res.clearCookie('token')
        return res.status(401).json({
            isAuthenticated:false,
            message:"Token is BlackList"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        return res.status(200).json({
            isAuthenticated:true,
            user:decoded,
            role:decoded.role
        })
    }catch(error){
        return res.status(401).json({
            isAuthenticated:false,
            message:"User Is Unauthorized Or Expire Token"
        })
    }

}