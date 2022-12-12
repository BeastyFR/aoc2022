export class Cell {
	elevation: number;
	visited: boolean;
	steps: number;
	x: number;
	y: number;
	parent: Cell;

	constructor(elevation, x, y) {
		this.elevation = elevation;
		this.visited = false;
		this.x = x;
		this.y = y;
		this.steps = 0;
	}

	toString() {
		return `${this.x},${this.y} : ${this.elevation} (${this.steps})`;
	}
}
