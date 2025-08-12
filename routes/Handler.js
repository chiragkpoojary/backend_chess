import CreateGAme from "../controller/CreateGames.js";
import joinGame from "../controller/JoinGame.js";
import moves from "../controller/Moves.js";
import CreateGame from "../controller/CreateGames.js";
import MoveGame from "../controller/Moves.js";
import Close from "../controller/Close.js";
import webrtc_answer from "../controller/WebRtc_answe.js"
const messageHandler={
    create_game:CreateGame,
    join_game:joinGame,
    move:MoveGame,
    close:Close,
    webrtc_answer:webrtc_answer
}

export default function handler(ws, message, games) {
    let data;
    try {
        data = JSON.parse(message);
    } catch {
        ws.send(JSON.stringify({ type: 'error', payload: 'Invalid JSON' }));
        return;
    }

    const { type, payload } = data;
    const handler = messageHandler[type];

    if (handler) {
        handler(ws, payload, games);
    } else {
        ws.send(JSON.stringify({ type: 'error', payload: 'Unknown message type' }));
    }
}