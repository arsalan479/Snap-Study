import mongoose from "mongoose";

const aicompdata = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  topicName: {
    type: String,
    require: true,
  },
  numberofquestion: {
    type: String,
    require: true,
  },
  levels: {
    type: String,
    require: true,
  },
  score: {
    type: String,
    require: true,
  },
  total: {
    type: String,
    require: true,
  },
 correctedAnswer: [String],

WrongAnswer: [String],

  quizdatacards: [
    {
      question: String,
      answer: String,
      options: [String],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const competiondata = mongoose.model("usercompetiondata",aicompdata);
export default competiondata;