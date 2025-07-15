import mongoose from "mongoose";
const friendRequestSchema = new mongoose.Schema({
    
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Indexes for better performance
friendRequestSchema.index({ senderId: 1, receiverId: 1 });
friendRequestSchema.index({ receiverId: 1, status: 1 });

// Update updatedAt on save
friendRequestSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);

export default FriendRequest;