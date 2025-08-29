export default function createGame(ws, payload, games) {
    const gameId = Math.random().toString(36).substr(2, 9);
    games.set(gameId, { players: [{ ws, color: 'w' }] });

    ws.gameId = gameId;

    ws.send(JSON.stringify({
        type: 'game_created',
        payload: { gameId, color: 'w' }
    }));
}
