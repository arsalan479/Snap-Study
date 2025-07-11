import http from 'http'
import app from './app.js'
import { initsocket } from './Utils/sockeio.js';

const server = http.createServer(app)

initsocket(server)


const port = process.env.PORT || 3000;
server.listen(port,'0.0.0.0',()=>{
    console.log("your server is running on port 3000")
})
