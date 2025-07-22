import http from "http";
import app from "./app.js";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URI,
    credentials: true,
  },
});

// const userSockeMap = new Map();

// io.on("connection", (socket) => {
//   // console.log("SocketConnected", socket.id);

//   socket.on("register", (userId) => {
//     userSockeMap.set(userId, socket.id);
//     console.log(`User ${userId} registered on socket ${socket.id}`);
//   });

//   socket.on("disconnect", () => {
//     for (const [userId, socketId] of userSockeMap.entries()) {
//       if (socketId === socket.id) {
//         userSockeMap.delete(userId);
//         console.log(`user ${userId} disconnected`);
//         break;
//       }
//     }
//   });

//   socket.on("send_request", ({ senderId, receiverId }) => {
//     const targetSocketId = userSockeMap.get(receiverId);

//     if (targetSocketId) {
//       io.to(targetSocketId).emit("receive_request", { senderId });
//     } else {
//       console.log(`Target user ${toUserId} not connected`);
//     }
//   });
// });











// io.on("connection",(socket)=>{
// console.log("a user connected",socket.id);
// // socket.emit("welcome","hello world")

// socket.on("message",(message)=>{
//   socket.broadcast.emit("reieve-message",message)
//   console.log(message)
// })

// socket.on("disconnect",()=>{
//   console.log("user disconnect",socket.id)
// })

// })

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
  console.log("your server is running on port 3000");
});
