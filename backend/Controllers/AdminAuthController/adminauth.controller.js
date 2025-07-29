import UserOne from "../../Models/UserOneScehma/UserOne.model.js";


export const alluserdata = async(req,res)=>{
    try{
        const result = await UserOne.find({role:"user"})
        if(!result){
            return res.status(400).json({
                message:"User Not Found"
            })
        }
        return res.status(200).json({
            message:"User Found",
            result
        })
    }catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

