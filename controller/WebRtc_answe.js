
export default function WebRtc_answer(ws, payload, games) {
    console.log("hi");
    const { gameId,msg } = payload;
    console.log(payload)
    const game = games.get(gameId);
    console.log(game);
    console.log(msg);
    game.players.forEach(player => {
        if (player !== ws && player.readyState === WebSocket.OPEN) {
            player.send(JSON.stringify("webrtc-offer"));
        }
    });
}
