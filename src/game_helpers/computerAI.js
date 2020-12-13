function computerAI(player) {
	const playerBoard = player.gameBoard;
	// create a version of the gameboard with only available shots
	const availableShots = [];
	let unsunkShots = [];
	playerBoard.opponentBoard().forEach((loc, index) => {
		// get all available shots
		if (loc === 'empty') {
			availableShots.push(index);
		} else if (loc === 'hit') {
			// get all hits on board to test if we can find the rest of the ship
			unsunkShots.push(index);
		}
	});

	// filter out the shots that have sunk ships
	unsunkShots = unsunkShots.filter((cell) => {
		const hitShip = player.ships.find((ship) => ship.position.includes(cell));
		return !hitShip.isSunk();
	});

	// DETECT SHIPS
	// locate any two shots that resemble a ship
	let detectedShip = unsunkShots.filter((shot, index, thisArray) => {
		return (
			(thisArray.includes(shot + 1) && (shot - 9) % 10 !== 0) ||
			(thisArray.includes(shot - 1) && shot % 10 !== 0) ||
			thisArray.includes(shot + 10) ||
			thisArray.includes(shot - 10)
		);
	});

	// remove doubles
	detectedShip = detectedShip.filter((cell, i, thisArray) => {
		return thisArray.lastIndexOf(cell) === i;
	});

	if (detectedShip.length) {
		const axis = detectedShip[1] - detectedShip[0] === 1 ? 'x' : 'y';
		const possibleShots = [];
		if (axis === 'x') {
			// add the cell to the left unless in the first column
			if (detectedShip[0] % 10 !== 0) possibleShots.push(detectedShip[0] - 1);
			// add the cell to the right unless in the last column
			const furthestRight = detectedShip.find(
				(cell, index, thisArray) => !thisArray.includes(cell + 1)
			);
			if ((furthestRight - 9) % 10 !== 0)
				possibleShots.push(furthestRight + 1);
		} else {
			// add the cell above
			possibleShots.push(detectedShip[0] - 10);
			// add the cell below
			possibleShots.push(
				detectedShip.find((cell, index, thisArray) => {
					return index !== 0 && !thisArray.includes(cell + 10);
				}) + 10
			);
		}

		// remove any that don't exist as available shots, either off the board
		// or already shot
		const filteredPossibleShots = possibleShots.filter((shot) =>
			availableShots.includes(shot)
		);
		if (filteredPossibleShots.length) {
			return filteredPossibleShots[
				Math.floor(Math.random() * filteredPossibleShots.length)
			];
		}
	}

	// TARGET SOLO MARKER
	if (unsunkShots.length) {
		const firstUnsunkShot = unsunkShots[0];
		const soloShotChoices = [
			firstUnsunkShot + 1,
			firstUnsunkShot - 1,
			firstUnsunkShot + 10,
			firstUnsunkShot - 10,
		];
		const filteredSoloShots = soloShotChoices.filter((shot) => {
			// if this shot carries over to next row, ignore it
			if (firstUnsunkShot % 10 === 0) {
				return (shot - 9) % 10 !== 0 && availableShots.includes(shot);
			} else if ((firstUnsunkShot - 9) % 10 === 0) {
				return shot % 10 !== 0 && availableShots.includes(shot);
			}
			return availableShots.includes(shot);
		});
		if (filteredSoloShots.length) {
			return filteredSoloShots[
				Math.floor(Math.random() * filteredSoloShots.length)
			];
		}
	}

	// NOTHING DETECTED, FIRE RANDOMLY
	// return a random shot
	return availableShots[Math.floor(Math.random() * availableShots.length)];
}

export default computerAI;
