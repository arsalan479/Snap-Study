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

// const connectedUser = new Map();

// io.on("connection", (socket) => {
//   socket.on("authenticate", (token) => {
//     try {
//       const userId = decodedToken(token);

//       connectedUser.set(userId, socket.id);
//       socket.join(userId);

//       console.log(`User ${userId} joined room ${userId}`);
//     } catch (error) {
//       console.log("invalid token", error.message);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//     for (const [userId, socketId] of connectedUser.entries()) {
//       if (socketId === socket.id) {
//         connectedUser.delete(userId);
//         break;
//       }
//     }
//   });
// });

// app.set("io", io);

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
  console.log("your server is running on port 3000");
});
