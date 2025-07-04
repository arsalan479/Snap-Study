import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connection = mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("your database has connected");
})

export default connection;