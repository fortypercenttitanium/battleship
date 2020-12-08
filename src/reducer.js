const reducer = (state, action) => {
	const { type, payload } = action;
	const players = { ...state.players };
	switch (type) {
		case 'SET_TIMELINE': {
			return {
				...state,
				timeline: payload,
			};
		}
		case 'SET_PLAYERS': {
			return {
				...state,
				players: payload,
			};
		}
		case 'ADD_SHIP': {
			const player = players[0];
			player.ships.push(payload.ship);
			return {
				...state,
				players,
			};
		}
		case 'SET_BOARD': {
			const player = players[0];
			console.log('payload:', payload);
			player.gameBoard.board = payload;
			return {
				...state,
				players,
			};
		}
		default:
			return state;
	}
};

export default reducer;
