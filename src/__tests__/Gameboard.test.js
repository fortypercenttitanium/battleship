import Gameboard from '../components/factories/gameboardFactory';

describe('Gameboard functions', () => {
	let testBoard;
	beforeEach(() => {
		testBoard = new Gameboard();
	});
	it('initializes a gameboard with the appropriate amount of cells', () => {
		const arr = [];
		for (let i = 0; i < 100; i++) {
			arr.push({ hasShip: false, isShot: false });
		}
		expect(testBoard.board).toEqual(arr);
	});
	it('updates a cell when receiving a shot', () => {
		testBoard.receiveShot(25);
		expect(testBoard.board[25].isShot).toBe(true);
	});
	it('responds to a miss', () => {
		expect(testBoard.receiveShot(25)).toBe(false);
	});
	it('confirms a hit', () => {
		testBoard.board[25].hasShip = true;
		expect(testBoard.receiveShot(25)).toBe(true);
	});
	it('places a ship on the x axis', () => {
		testBoard.placeShip(51, 4, 'x');
		expect(
			testBoard.board.reduce((acc, cell, i) => {
				cell.hasShip && acc.push(i);
				return acc;
			}, [])
		).toEqual([51, 52, 53, 54]);
	});
	it('places a ship on the y axis', () => {
		testBoard.placeShip(48, 4, 'y');
		expect(
			testBoard.board.reduce((acc, cell, i) => {
				cell.hasShip && acc.push(i);
				return acc;
			}, [])
		).toEqual([48, 58, 68, 78]);
	});
	it('allows valid placement of ships', () => {
		expect(testBoard.placeShip(12, 3, 'x')).toBe(true);
	});
	it('rejects ship placement that collides with other ships', () => {
		testBoard.placeShip(12, 3, 'x');
		expect(testBoard.placeShip(2, 4, 'y')).toBe(false);
	});
	it('rejects ship placement that runs through map edge on x axis', () => {
		expect(testBoard.placeShip(8, 5, 'x')).toBe(false);
	});
	it('rejects ship placement that runs through map edge on y axis', () => {
		expect(testBoard.placeShip(78, 5, 'y')).toBe(false);
	});
	it('renders the opponent version', () => {
		const arr = [];
		for (let i = 0; i < 100; i++) {
			arr.push('empty');
		}
		arr[23] = 'hit';
		arr[79] = 'miss';
		testBoard.placeShip(22, 3, 'x');
		testBoard.receiveShot(23);
		testBoard.receiveShot(79);
		expect(testBoard.opponentBoard()).toEqual(arr);
	});
});
