import shipTypes from './shipTypes';

function placeComputerShips(players, dispatch) {
	shipTypes.forEach((ship) => {
		// hacking an async call so dispatch will update the game state for each computer ship
		setTimeout(() => {
			// update board state
			dispatch({
				type: 'SET_BOARD',
				payload: {
					locationArray: players.computer.gameBoard.findRandomShipLocation(
						ship
					),
					player: 'computer',
					ship: ship,
				},
			});
			// update ship state
			dispatch({
				type: 'SET_SHIPS',
				payload: {
					ships: [...players.computer.ships, ship],
					player: 'computer',
				},
			});
		}, 0);
	});
}

export default placeComputerShips;
