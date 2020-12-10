function checkWinner({ human, computer }) {
	const stillPlaying = [human, computer].filter(
		(player) => !player.ships.every((ship) => ship.isSunk())
	);
	return stillPlaying.length === 1 ? stillPlaying[0] : false;
}

export default checkWinner;
