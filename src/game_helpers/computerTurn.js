import checkWinner from './checkWinner';

function computerTurn({
	playerBoard,
	setShotTimeout,
	computer,
	dispatch,
	players,
}) {
	// prevent from running when locked for win conditions
	if (!setShotTimeout) {
		// prevent dependencies from running this multiple times
		setShotTimeout(true);
		// computer waits for its turn, then fires
		// setTimeout(() => {
		// 	dispatch({
		// 		type: 'SET_MESSAGE',
		// 		payload: 'Your opponent is aiming...',
		// 	});
		// }, 500);

		setTimeout(() => {
			// create a version of the gameboard with only available shots
			const availableShots = [];
			playerBoard.opponentBoard().forEach((loc, index) => {
				if (loc === 'empty') {
					availableShots.push(index);
				}
			});
			// take a random number based on array length
			const shotLocation =
				availableShots[Math.floor(Math.random() * availableShots.length)];
			if (playerBoard.checkIfShotHit(shotLocation)) {
				const newShips = { ...players.human }.ships;
				const hitShip = newShips.find(
					(ship) => ship.name === playerBoard.checkIfShotHit(shotLocation)
				);
				hitShip.hit(shotLocation);
				dispatch({
					type: 'SET_SHIP_HITS',
					payload: { player: 'human', ship: hitShip, hits: hitShip.hits },
				});
				if (hitShip.isSunk()) {
					dispatch({
						type: 'SET_MESSAGE',
						payload: `The enemy fires a shot into your waters ...... they sunk your ${hitShip.name}!`,
					});
					setTimeout(() => {
						// allow for state refresh
						if (checkWinner(players)) {
							setTimeout(() => {
								dispatch({
									type: 'SET_WINNER',
									payload: checkWinner(players),
								});
							}, 2000);
						}
					}, 0);
				} else {
					dispatch({
						type: 'SET_MESSAGE',
						payload:
							"The enemy fires a shot into your waters ...... it's a hit!",
					});
				}
			} else {
				dispatch({
					type: 'SET_MESSAGE',
					payload: 'The enemy fires a shot into your waters ...... and misses.',
				});
			}
			// fire on that spot after message populates
			setTimeout(() => {
				computer.fireShot(shotLocation, playerBoard);
				dispatch({ type: 'SET_TURN', payload: 0 });
				setShotTimeout(false);
			}, 100);
		}, 0);
	}
}

export default computerTurn;
