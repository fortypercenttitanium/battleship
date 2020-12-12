import computerAI from './computerAI';

function computerTurn({
	playerBoard,
	setShotTimeout,
	checkWinner,
	computer,
	dispatch,
	players,
	playSound,
}) {
	// initialize mutable sound variable, allow outcomes to mutate
	let sound;
	// prevent from running when locked for win conditions
	if (!checkWinner(players)) {
		// computer waits for its turn, then fires
		// a little fake immersion
		setTimeout(() => {
			dispatch({
				type: 'SET_MESSAGE',
				payload: 'Your opponent is aiming...',
			});
		}, 1000);

		setTimeout(() => {
			playSound('fireShot');
			const shotLocation = computerAI(players.human);
			if (playerBoard.checkIfShotHit(shotLocation)) {
				sound = 'shotHit';
				const newShips = { ...players.human }.ships;
				const hitShip = newShips.find(
					(ship) => ship.name === playerBoard.checkIfShotHit(shotLocation)
				);
				hitShip.hit(shotLocation);
				// update hits on human ships
				dispatch({
					type: 'SET_SHIP_HITS',
					payload: { player: 'human', ship: hitShip, hits: hitShip.hits },
				});
				if (hitShip.isSunk()) {
					dispatch({
						type: 'SET_MESSAGE',
						payload: `The enemy fires a shot into your waters ...... they sunk your ${hitShip.name}!`,
					});
				} else {
					dispatch({
						type: 'SET_MESSAGE',
						payload:
							"The enemy fires a shot into your waters ...... it's a hit!",
					});
				}
			} else {
				sound = 'shotMiss';
				dispatch({
					type: 'SET_MESSAGE',
					payload: 'The enemy fires a shot into your waters ...... and misses.',
				});
			}
			// fire on that spot after message populates
			setTimeout(() => {
				playSound(sound);
				computer.fireShot(shotLocation, playerBoard);
				dispatch({ type: 'SET_TURN', payload: 0 });
				setShotTimeout(false);
			}, 1800);
		}, 2600);
	}
}

export default computerTurn;
