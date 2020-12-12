import computerAI from '../game_helpers/computerAI';
import Player from '../factories/playerFactory';
import Ship from '../factories/shipFactory';
import shipTypes from '../game_helpers/shipTypes';

describe('computerAI', () => {
	let player;
	beforeEach(() => {
		player = new Player('test');
		shipTypes.forEach((shipType) => {
			const ship = new Ship(
				shipType.name,
				player.gameBoard.findRandomShipLocation(shipType)
			);
			ship.position.forEach(
				(pos) => (player.gameBoard.board[pos].hasShip = ship.name)
			);
			player.ships.push(ship);
		});
		for (let i = 0; i < 40; i++) {
			const shot = Math.floor(Math.random() * 100);
			const hitShip = player.ships.find(
				//eslint-disable-next-line
				(ship) => ship.name === player.gameBoard.checkIfShotHit(shot)
			);
			if (hitShip) hitShip.hit(shot);
			player.gameBoard.board[shot].isShot = true;
		}
	});
	it('returns some shot locations', () => {
		// test 20 times to check for undefined
		let shotsArr = [];
		for (let i = 0; i <= 20; i++) {
			shotsArr.push(computerAI(player));
		}
		expect(shotsArr.every((shot) => shot >= 0 && shot < 100)).toBe(true);
	});
});
