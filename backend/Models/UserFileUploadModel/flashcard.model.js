import mongoose from "mongoose";

const flashcardSchema = mongoose.Schema({

    UserLoginId : {
        type:String,
        require:true
    },
      fileUrl:{
    type:String,
    require:true
  },
    ImageType:{
    type:String,
    enum:['image','pdf'],
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
    options: [String] // Only for quiz mode
  }],
  createdAt :{
    type:Date,
    default:Date.now
  }

})


const flashcardmodel = mongoose.model('flashcards',flashcardSchema);
export default flashcardmodel;