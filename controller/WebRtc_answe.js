
export default function WebRtc_answer(ws, payload, games) {
    console.log("hi");
    const { gameId,msg } = payload;
    const game = games.get(gameId);
    game.players.forEach(player => {
        if (player !== ws && player.readyState === WebSocket.OPEN) {
            player.send(JSON.stringify(msg));
        }
    });
}
