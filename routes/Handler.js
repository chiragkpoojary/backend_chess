import CreateGAme from "../controller/CreateGames.js";
import joinGame from "../controller/JoinGame.js";
import moves from "../controller/Moves.js";
import CreateGame from "../controller/CreateGames.js";
import MoveGame from "../controller/Moves.js";
import Close from "../controller/Close.js";
import handleWebRTCSignal from "../controller/WebRtc_answe.js"
const messageHandler = {
    create_game: CreateGame,
    join_game: joinGame,
    move: MoveGame,
    close: Close,
    webrtc_offer: handleWebRTCSignal,
    webrtc_answer: handleWebRTCSignal,
    webrtc_ice: handleWebRTCSignal,
};

export default function handler(ws, message, games) {
    let data;
    try {
        data = JSON.parse(message);

    } catch {
        ws.send(JSON.stringify({ type: 'error', payload: 'Invalid JSON' }));
        return;
    }

    const { type, payload } = data;
    const passage = messageHandler[type];

    if (passage) {
        console.log("payload",payload)
        passage(ws, payload, games);
    } else {
        ws.send(JSON.stringify({ type: 'error', payload: 'Unknown message type' }));
    }
}