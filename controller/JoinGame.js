export default function joinGame(ws, payload, games) {
    const { gameIdInput } = payload; // the ID entered by the joining player
    const game = games.get(gameIdInput);

    if (!game) {
        ws.send(JSON.stringify({ type: 'error', payload: 'Game not found' }));
        return;
    }

    if (game.players.length >= 2) {
        ws.send(JSON.stringify({ type: 'error', payload: 'Players full' }));
        return;
    }


    game.players.push({ ws, color: 'b' });
    ws.gameId = gameIdInput;


    ws.send(JSON.stringify({
        type: 'game_joined',
        payload: { gameId: gameIdInput, color: 'b' }
    }));

    game.players.forEach((p, i) => {
        if (!p || !p.ws) {
            console.error(`Invalid player at index ${i}:`, p);
            return;
        }
        p.ws.send(JSON.stringify({
            type: 'game_start',
            payload: {
                gameId: gameIdInput,
                color: p.color
            }
        }));
    });
    // After player joins
    game.players.forEach(p => {
        p.ws.send(JSON.stringify({
            type: 'player_update',
            payload: {
                white: !!game.players.find(pl => pl.color === 'w'),
                black: !!game.players.find(pl => pl.color === 'b')
            }
        }));
    });

}
