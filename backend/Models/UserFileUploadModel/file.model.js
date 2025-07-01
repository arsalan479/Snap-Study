import mongoose from 'mongoose';

const FileSchema = mongoose.Schema({

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


const FileData = mongoose.model("fileuploadedata",FileSchema);
export default FileData;

