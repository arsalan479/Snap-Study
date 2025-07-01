import mongoose from 'mongoose';

const QuizFileSchema = mongoose.Schema({

    UserLoginId : {
    type:String,
    required: true,
  },
    fileUrl: { 
        type: String, 
        required: true 
    },
    filetype:{
        type:String,
        enum:['image','pdf'],
        require:true,
    },
    uploadedAt:{
        type:Date,
        default:Date.now
    }
})


const QuizFileData = mongoose.model("quizfiledata",QuizFileSchema);
export default QuizFileData;

