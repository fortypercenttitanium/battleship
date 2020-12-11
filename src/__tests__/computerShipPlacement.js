import placeComputerShips from '../game_helpers/placeComputerShips';
import Gameboard from '../factories/gameboardFactory';

describe('computer ship placement', () => {
	let state;
	const dispatch = jest.fn((action) => {
		const mockBoardReducer = jest.fn((payload) => {
			const justShipsArray = payload.board.filter((cell) => cell.hasShip);
			expect(justShipsArray.length).toBe(17);
		});
		const mockShipReducer = jest.fn((payload) => {
			expect(payload.ships.length).toBe(5);
		});
		if (action.type === 'SET_BOARD') {
			mockBoardReducer(action.payload);
		} else {
			mockShipReducer(action.payload);
		}
	});
	beforeEach(() => {
		state = {
			players: {
				human: {},
				computer: {
					name: 'computer',
					ships: [],
					gameBoard: new Gameboard(),
				},
			},
		};
	});
	it('places computer ships with no collisions', () => {
		placeComputerShips(dispatch, state.players.computer.gameBoard);
	});
});
