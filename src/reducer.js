const reducer = (state, action) => {
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
		case 'ADD_SHIP': {
			const { player, ship } = payload;
			const newState = { ...state };
			const newShips = [...newState.players[player].ships, ship];
			console.log('1: ', newState.players[player].ships);
			newState.players[player].ships = newShips;
			console.log('2: ', newState.players[player].ships);
			return {
				...newState,
			};
		}
		case 'SET_BOARD': {
			debugger;
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
};

export default reducer;
