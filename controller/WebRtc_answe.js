
function WebRtc_answer(ws, payload, games) {
    const { gameId } = payload;
    const game = games.get(gameId);
    game.players.forEach(player => {
        if (player !== ws && player.readyState === WebSocket.OPEN) {
            player.send(JSON.stringify("webrtc-answer"));
        }
    });
}

export default WebRtc_answer;