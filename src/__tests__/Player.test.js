import Player from '../components/factories/playerFactory';

describe('player functions', () => {
	// instantiate variable to avoid scoping issues
	let player;
	beforeEach(() => {
		player = new Player('Bender Rodriguez');
	});
	it('creates a player with a name', () => {
		expect(player.name).toBe('Bender Rodriguez');
	});
});
