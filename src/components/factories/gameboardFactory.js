class Gameboard {
	constructor() {
		this.board = [];
		this.init();
	}
	init() {
		for (let i = 0; i < 100; i++) {
			this.board.push({ hasShip: false, isShot: false });
		}
	}
	receiveShot(location) {
		this.board[location].isShot = true;
		// return true for hit, false for miss
		return this.board[location].hasShip;
	}
	placeShip(location, length, axis) {
		// on x axis, if a ship shares this cell with the next, there is a wall collision
		const collisions = [9, 19, 29, 39, 49, 59, 69, 79, 89];
		const locationArray = [];
		for (let i = 0; i < length; i++) {
			axis === 'x'
				? locationArray.push(location + i)
				: locationArray.push(location + i * 10);
		}
		if (locationArray.some((loc) => !this.board[loc])) {
			// check if ship placement exceeds board boundaries, which covers y axis
			return false;
		} else if (locationArray.some((loc) => this.board[loc].hasShip)) {
			// check for collisions with other ships
			return false;
		} else if (
			collisions.some((num) => {
				// see comment on collisions array
				return [num, num + 1].every((combination) =>
					locationArray.includes(combination)
				);
			})
		) {
			return false;
		} else {
			locationArray.forEach((loc) => (this.board[loc].hasShip = true));
			return true;
		}
	}
	opponentBoard() {
		return this.board.map((cell) => {
			return cell.isShot && cell.hasShip
				? 'hit'
				: cell.isShot
				? 'miss'
				: 'empty';
		});
	}
}

export default Gameboard;
