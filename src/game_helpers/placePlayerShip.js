import shipTypes from './shipTypes';
import Ship from '../factories/shipFactory';

function placePlayerShip({ player, locationArray, currentShip, dispatch }) {
	const { gameBoard } = player;
	const ship = new Ship(shipTypes[currentShip].name, locationArray);

	if (
		// returns true if there are NO collisions
		gameBoard.checkCollisions(locationArray)
	) {
		// update board state
		dispatch({
			type: 'SET_SHIP_ON_BOARD',
			payload: {
				locationArray,
				player: 'human',
				ship: ship,
			},
		});
		// update ship state
		dispatch({
			type: 'SET_SHIPS',
			payload: {
				ships: [...player.ships, ship],
				player: 'human',
			},
		});
	}
}

export default placePlayerShip;
