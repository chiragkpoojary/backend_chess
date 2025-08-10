export default function Close(ws, payload, games) {
    if (!ws.gameId) return;

    const game = games.get(ws.gameId);
    if (!game) return;

    // Remove the leaving player
    game.players = game.players.filter(p => p.ws !== ws);

    if (game.players.length === 0) {
        games.delete(ws.gameId);
        return;
    }

    // Notify remaining players
    game.players.forEach(player => {
        if (player.ws.readyState === player.ws.OPEN) {
            player.ws.send(JSON.stringify({
                type: 'player_left',
                payload: { color: ws.color }
            }));
            player.ws.send(JSON.stringify({
                type: 'player_update',
                payload: {
                    white: game.players.some(p => p.color === 'w'),
                    black: game.players.some(p => p.color === 'b')
                }
            }));
        }
    });
}
