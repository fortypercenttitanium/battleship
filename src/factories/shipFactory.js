import shipTypes from '../game_helpers/shipTypes';

class Ship {
	constructor(name, position) {
		this.name = name;
		this.position = position;
		this.hits = [];
	}
	hit(index) {
		this.hits.push(index);
	}
	isSunk() {
		return this.position.every((occupiedCell) =>
			this.hits.includes(occupiedCell)
		);
	}
	getComponentWithProps(props) {
		return shipTypes
			.find((ship) => ship.name === this.name)
			.getComponentWithProps(props);
	}
}

export default Ship;
