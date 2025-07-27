import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  participants: [{ type:
     mongoose.Schema.Types.ObjectId,
      ref: "UserOne" 
    }],
  quizId: { 
    type: String
 },
  createdAt: { 
    type: Date,
     default: Date.now 
    },
});

const roomModel = mongoose.model('userRoom',roomSchema);
export default roomModel;
