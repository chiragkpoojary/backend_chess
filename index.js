import express from 'express';
import { WebSocketServer } from 'ws';
import * as http from "node:http";
import handler from "./routes/Handler.js";
import Close from "./controller/Close.js";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({server});
const games=new Map();
wss.on("connection",ws=>{
    console.log("client connected");
    ws.on("message", data => {
        handler(ws,data,games)
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN && client!==ws) {
                client.send(data.toString());
            }
        })
        ws.send("server recived",data);
    })

    ws.on("close",()=>{
        console.log("client disconnected");
        Close(ws, null, games);



    })
ws.on("error",err => {
    console.error("websocket",err);
})
    ws.send("welcome to web socket server!");
})
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})