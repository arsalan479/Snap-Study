import mongoose from "mongoose";


const blacklist = mongoose.Schema({

token:{
    type:String,
    require:true,
    unique:true
},
createdAt:{
    type:Date,
    default:Date.now(),
    expires:86400 // 24 hours
}

})


const blacklistToken = mongoose.model("blackListToken",blacklist)
export default blacklistToken