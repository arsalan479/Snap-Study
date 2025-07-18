import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['friend_request', 'friend_accepted', 'message', 'general'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  read: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FriendRequest',
    required: false
  }
});

notificationSchema.index({ receiverId: 1, timestamp: -1 });
notificationSchema.index({ receiverId: 1, read: 1 });

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;