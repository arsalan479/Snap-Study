import jwt from 'jsonwebtoken';

export const decodedToken = (req,res)=>{
    const token = req.cookies.token;
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    return decode.userId;
}