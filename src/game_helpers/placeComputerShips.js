import shipTypes from './shipTypes';
import Ship from '../factories/shipFactory';

function placeComputerShips(players, dispatch) {
	shipTypes.forEach((arrayShip) => {
		const ship = new Ship(
			arrayShip.name,
			players.computer.gameBoard.findRandomShipLocation(arrayShip)
		);
		// hacking an async call so dispatch will update the game state for each computer ship
		setTimeout(() => {
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
		}, 0);
	});
}

export default placeComputerShips;
