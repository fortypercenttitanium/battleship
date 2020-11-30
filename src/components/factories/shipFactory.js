class Ship {
	constructor(type, position) {
		this.type = type;
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
}

export default Ship;
