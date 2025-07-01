import mongoose from "mongoose";

const quizcardSchema = mongoose.Schema({
 
    UserLoginId : {
        type:String,
        require:true
    },
    fileUrl:{
    type:String,
    require:true
    },
    Title:{
      type:String,
      require:true
    },
    Subjects : {
     type:String,
     require:true
    },
   Cards: [{
    question: String,
    answer: String,
    options: [String] 
  }],
  createdAt :{
    type:Date,
    default:Date.now
  }   

})


const quizcardmodel = mongoose.model('quizcards',quizcardSchema);
export default quizcardmodel;