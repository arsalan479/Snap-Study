import jwt from 'jsonwebtoken';


export const checkAlreadyLoggedIn = (req,res)=>{

    const token = req.cookies.token || req.headers['authorization']?.spilt(' ')[1];

    if(!token){
        return res.status(200).json({
            isAuthenticated:false
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