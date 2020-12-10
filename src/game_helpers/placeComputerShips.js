import shipTypes from './shipTypes';
import Ship from '../factories/shipFactory';

function placeComputerShips(players, dispatch) {
	// hacking an async call so dispatch will update the game state for each computer ship
	let count = 0;
	const setShips = setInterval(() => {
		const ship = new Ship(
			shipTypes[count].name,
			players.computer.gameBoard.findRandomShipLocation(shipTypes[count])
		);
		// update board state
		dispatch({
			type: 'SET_BOARD',
			payload: {
				locationArray: ship.position,
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
		count++;
		if (count >= 5) clearInterval(setShips);
	}, 50);
}

export default placeComputerShips;
