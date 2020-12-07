const findShipPlacement = (ship, board) => {
	// check if ship is on board
	if (board.find((cell) => cell.hasShip === ship.name)) {
		const boardWithIndex = board.map((cell, index) => {
			cell.index = index;
			return cell;
		});
		const shipLocation = boardWithIndex.filter(
			(cell) => cell.hasShip === ship.name
		);
		const axis =
			shipLocation[shipLocation.length - 1].index - shipLocation[0].index <= 5
				? 'x'
				: 'y';
		return {
			start: shipLocation[0].index,
			axis,
		};
	} else {
		return;
	}
};

export default findShipPlacement;
