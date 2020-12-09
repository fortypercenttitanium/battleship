function reducer(state, action) {
	const { type, payload } = action;
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
		case 'SET_SHIPS': {
			const { player, ships } = payload;
			const newState = { ...state };
			newState.players[player].ships = ships;
			return {
				...newState,
			};
		}
		case 'SET_BOARD': {
			const { locationArray, player, ship } = payload;
			const newState = { ...state };
			const newBoard = newState.players[player].gameBoard.board.map(
				(cell, index) => {
					if (locationArray.includes(index)) {
						cell.hasShip = ship.name;
					}
					return cell;
				}
			);
			newState.players[player].gameBoard.board = newBoard;
			return {
				...newState,
			};
		}
		default:
			return state;
	}
}

export default reducer;
