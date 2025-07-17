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

app.set("io",io)

export const userSocketMap = {};
io.on("connection", (socket) => {
  socket.on("register", (userId) => {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} registered with socket ${socket.id}`);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
  console.log("your server is running on port 3000");
});
