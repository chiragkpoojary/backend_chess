export default function moves(ws, payload, games) {
    const { gameId, move } = payload;
    const game = games.get(gameId);
    if (!game) return;


    const sender = game.players.find(p => p.ws === ws);
    if (!sender) return;


    if ((move.color === 'w' && sender.color !== 'w') ||
        (move.color === 'b' && sender.color !== 'b')) {
        ws.send(JSON.stringify({ type: 'error', payload: 'Not your turn' }));
        return;
    }


    game.players.forEach(p => {
        if (p.ws !== ws) {
            p.ws.send(JSON.stringify({
                type: 'opponent_move',
                payload: { move }
            }));
        }
    });
}
