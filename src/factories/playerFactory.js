class Player {
	constructor(name) {
		this.name = name;
	}
	fireShot(location, gameboard) {
		if (gameboard.opponentBoard()[location] === 'empty') {
			gameboard.receiveShot(location);
		}
	}
	fireRandomShot(gameboard) {
		// create a version of the gameboard with only available shots
		const availableShots = [];
		gameboard.opponentBoard().forEach((loc, index) => {
			if (loc === 'empty') {
				availableShots.push(index);
			}
		});
		// take a random number based on array length
		const shotLocation = Math.floor(Math.random() * availableShots.length);
		// fire on that spot
		this.fireShot(availableShots[shotLocation], gameboard);
	}
}

export default Player;
