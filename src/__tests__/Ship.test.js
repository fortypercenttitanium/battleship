import Ship from '../factories/shipFactory';

describe('ship functions', () => {
	// assign variables to avoid beforeEach scoping issues
	let testCarrier;
	let testSubmarine;
	beforeEach(() => {
		testCarrier = new Ship('carrier', [0, 1, 2, 3, 4]);
		testSubmarine = new Ship('submarine', [12, 13, 14]);
	});
	it('accepts a hit', () => {
		testCarrier.hit(0);
		expect(testCarrier.hits).toEqual([0]);
	});
	it('accepts multiple hits', () => {
		testSubmarine.hit(12);
		testSubmarine.hit(13);
		expect(testSubmarine.hits).toEqual([12, 13]);
	});
	it('shows that the boat is not sunk', () => {
		testCarrier.hit(0);
		testCarrier.hit(1);
		expect(testCarrier.isSunk()).toBe(false);
	});
	it('shows that a boat is sunk', () => {
		testSubmarine.hit(12);
		testSubmarine.hit(13);
		testSubmarine.hit(14);
		expect(testSubmarine.isSunk()).toBe(true);
	});
});
