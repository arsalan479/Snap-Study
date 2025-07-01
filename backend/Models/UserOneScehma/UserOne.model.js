import mongoose from "mongoose";
import { type } from "os";

const UserOneSchema = mongoose.Schema({
     authMethods: {
    google: {
      id: String,
      verified: { type: Boolean, default: false }
    },
    github: {
      id: String,
      verified: { type: Boolean, default: false }
    },
    googleuserbyemail:{
      idCrypto:{
        type:String
      },
        password:{
          type:String,
          select:false,
          require:true
        },

        verificationCode:{
        type:String,
        default :false
    },
          verified: { 
        type: Boolean, 
        default: false
     },
     avatar:{
      type:String,
      require:true
     },
     resetToken: String,
    resetTokenExpiry: Date,

    }
  },
  email: {
    type: String,
    required: true,
   
  },
  displayName: {
    type: String,
    required: true,
    default:false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  avatar: {
    type: String,
    require: true,
  },
   
  createdAt: {
    type: Date,
    default: Date.now,
  },
    lastLogin: {
    type: Date
  }
});


//create index jis se db ko user dhnodne me asani hogi login karte wqt jese booke ka index number dekhte he hum or us index page pe chale jate hen ac he work karta he yeb bhi.

UserOneSchema.index({'authMethods.google.id':1});
UserOneSchema.index({'authMethods.github.id':1});
UserOneSchema.index({'authMethods.googleuserbyemail.id':1});

const UserOne = mongoose.model("UserOne",UserOneSchema);
export default UserOne;