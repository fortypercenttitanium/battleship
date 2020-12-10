import shipTypes from './shipTypes';

function placePlayerShip({ player, location, currentShip, axis, dispatch }) {
	const { gameBoard } = player;
	const locationArray = gameBoard.createLocationArray(
		location,
		shipTypes[currentShip],
		axis
	);
	if (
		// returns true if there are NO collisions
		gameBoard.checkCollisions(locationArray)
	) {
		// update board state
		dispatch({
			type: 'SET_BOARD',
			payload: {
				locationArray,
				player: 'human',
				ship: shipTypes[currentShip],
			},
		});
		// update ship state
		dispatch({
			type: 'SET_SHIPS',
			payload: {
				ships: [...player.ships, shipTypes[currentShip]],
				player: 'human',
			},
		});
	}
}

export default placePlayerShip;
