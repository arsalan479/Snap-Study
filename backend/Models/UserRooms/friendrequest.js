import mongoose from "mongoose";

const FriendRequestSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserOne",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserOne",
    required: true,
  },
  status: { type: String, default: "pending" }, // e.g., pending, accepted, rejected
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("FriendRequest", FriendRequestSchema);
