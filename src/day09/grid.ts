import { generatePrimeSync } from "crypto";

export class Cell {
	visited: boolean;
	label: string;
	x: number;
	y: number;
	isAlreadyTailed: boolean;

	constructor(x, y) {
		this.visited = false;
		this.label = ".";
		this.isAlreadyTailed = false;
		this.x = x;
		this.y = y;
	}

	toString() {
		return this.label;
	}

	toStringTail() {
		if (this.isAlreadyTailed) {
			return "#";
		}
		return ".";
	}
}

export class Knot extends Cell {
	next: Knot;
	previous: Knot;
	constructor(x, y, label, previousKnot?: Knot) {
		super(x, y);
		this.previous = previousKnot;
		this.label = label;
		if (previousKnot) {
			previousKnot.setNext(this);
		}
	}

	setNext(knot: Knot) {
		this.next = knot;
	}

	follow(previous) {
		//console.log("followme !");
		let xDiff = previous.x - this.x;
		let yDiff = previous.y - this.y;

		let newCoordX = this.x;
		let newCoordY = this.y;

		if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
			if (xDiff > 0) {
				newCoordX = newCoordX + 1;
			} else if (xDiff < 0) {
				newCoordX = newCoordX - 1;
			}
			if (yDiff > 0) {
				newCoordY = newCoordY + 1;
			} else if (yDiff < 0) {
				newCoordY = newCoordY - 1;
			}
			/*console.log(
				`Moving ${this.label} from ${this.x},${this.y} to ${newCoordX},${newCoordY}`,
			);*/
			this.moveTo(newCoordX, newCoordY);
		}
	}

	shouldNextKnotBeMoved(): boolean {
		if (this.next) {
			if (
				Math.abs(this.x - this.next.x) > 1 ||
				Math.abs(this.y - this.next.y) > 1
			)
				return true;
		}
		return false;
	}

	moveTo(x, y) {
		this.x = x;
		this.y = y;
		if (this.shouldNextKnotBeMoved()) {
			this.next.follow(this);
		}
	}
}

export class Grid {
	map: Cell[][];
	knots: Knot[];
	nbNewTail = 0;

	constructor(maxSize, nbKnots, defaultX, defaultY) {
		this.map = [];
		for (let i = 0; i < maxSize; i++) {
			this.map[i] = [];
			for (let j = 0; j < maxSize; j++) {
				this.map[i][j] = new Cell(j, i);
			}
		}

		this.knots = [];
		let lastKnot = null;
		for (let k = 0; k < nbKnots; k++) {
			let newKnot = new Knot(defaultX, defaultY, k, lastKnot);
			this.knots.push(newKnot, lastKnot);
			lastKnot = newKnot;
		}
	}

	getCell(x, y): Cell {
		return this.map[y][x];
	}

	getCurrentHead() {
		return this.knots[0];
	}

	getCurrentTail() {
		return this.knots[this.knots.length - 1];
	}

	display() {
		for (let i = this.map.length - 1; i >= 0; i--) {
			let result = "";
			for (let j = 0; j < this.map[i].length; j++) {
				result += this.getCell(j, i).toString();
			}
			console.log(result);
		}
	}

	displayTailPath() {
		for (let i = this.map.length - 1; i >= 0; i--) {
			let result = "";
			for (let j = 0; j < this.map[i].length; j++) {
				result += this.getCell(j, i).toStringTail();
			}
			console.log(result);
		}
	}

	updateTail() {
		let tail = this.getCurrentTail();
		if (!this.getCell(tail.x, tail.y).isAlreadyTailed) {
			this.getCell(tail.x, tail.y).isAlreadyTailed = true;
			this.nbNewTail++;
		}
	}

	moveHeadUp() {
		this.getCurrentHead().moveTo(
			this.getCurrentHead().x,
			this.getCurrentHead().y + 1,
		);
	}
	moveHeadDown() {
		this.getCurrentHead().moveTo(
			this.getCurrentHead().x,
			this.getCurrentHead().y - 1,
		);
	}
	moveHeadLeft() {
		this.getCurrentHead().moveTo(
			this.getCurrentHead().x - 1,
			this.getCurrentHead().y,
		);
	}
	moveHeadRight() {
		this.getCurrentHead().moveTo(
			this.getCurrentHead().x + 1,
			this.getCurrentHead().y,
		);
	}
}
