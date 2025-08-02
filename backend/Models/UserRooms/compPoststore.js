import mongoose from "mongoose";

const postdata = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserOne",
  },
  compId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usercompetiondata",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const post = mongoose.model("competionPost",postdata)
export default post;
