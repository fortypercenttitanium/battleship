// callback refers to the computer turn, so that it only executes when this function completes
function humanTurn(
	{ dispatch, index, computer, computerTurn, players, checkWinner, playSound },
	computerTurnArgs
) {
	// don't allow if there's a winner
	if (!checkWinner(players)) {
		// initialize mutable sound variable, allow outcomes to mutate
		let sound;
		const computerBoard = computer.gameBoard;
		playSound('fireShot');
		setTimeout(() => {
			if (computerBoard.checkIfShotHit(index)) {
				sound = 'shotHit';
				const newShips = [...computer.ships];
				const hitShip = newShips.find(
					(ship) => ship.name === computerBoard.checkIfShotHit(index)
				);
				hitShip.hit(index);
				dispatch({
					type: 'SET_SHIP_HITS',
					payload: { player: 'computer', ship: hitShip, hits: hitShip.hits },
				});
				if (hitShip.isSunk()) {
					dispatch({
						type: 'SET_MESSAGE',
						payload: `You fire a shot into enemy waters ...... you sunk their ${hitShip.name}!`,
					});
				} else {
					dispatch({
						type: 'SET_MESSAGE',
						payload: "You fire a shot into enemy waters ...... it's a hit!",
					});
				}
			} else {
				sound = 'shotMiss';
				dispatch({
					type: 'SET_MESSAGE',
					payload: 'You fire a shot into enemy waters ...... and miss.',
				});
			}
		}, 0);
		// give time for message to populate
		setTimeout(() => {
			playSound(sound);
			dispatch({
				type: 'FIRE_SHOT',
				payload: { player: 'human', location: index },
			});
			dispatch({ type: 'SET_TURN', payload: 1 });
			computerTurn({
				...computerTurnArgs,
			});
		}, 1700);
	}
}

export default humanTurn;
