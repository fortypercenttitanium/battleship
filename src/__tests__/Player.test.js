import Player from '../factories/playerFactory';

describe('player functions', () => {
	// instantiate variable to avoid scoping issues
	let player;
	let testBoard;
	beforeEach(() => {
		// instantiate player
		player = new Player('Bender Rodriguez');
		// create and fill mock opponent board
		testBoard = {
			oppBoard: [],
			receiveShot: jest.fn((loc) => {
				testBoard.oppBoard[loc] = 'miss';
				return true;
			}),
			opponentBoard: jest.fn(() => {
				return testBoard.oppBoard;
			}),
		};
		const arr = [];
		for (let i = 0; i < 100; i++) {
			arr.push('empty');
		}
		testBoard.oppBoard = arr;
	});
	it('creates a player with a name', () => {
		expect(player.name).toBe('Bender Rodriguez');
	});
	it('fires a shot to the gameboard', () => {
		player.fireShot(25, testBoard);
		expect(testBoard.receiveShot.mock.calls.length).toBe(1);
	});
	it('rejects shots fired at locations already fired upon', () => {
		testBoard.oppBoard[10] = 'miss';
		player.fireShot(25, testBoard);
		player.fireShot(10, testBoard);
		expect(testBoard.receiveShot.mock.calls.length).toBe(1);
	});
});
