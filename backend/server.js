import http from 'http'
import app from './app.js'
import { Server } from 'socket.io';

const server = http.createServer(app)

const io = new Server(server,{
    cors:{
        origin:process.env.FRONTEND_URI
    }
});

io.on("connection",(socket)=>{
    console.log("a user connected")
})


const port = process.env.PORT || 3000;
server.listen(port,'0.0.0.0',()=>{
    console.log("your server is running on port 3000")
})
