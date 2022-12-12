import { Cell } from "./cell.js";

function getNumericElevation(char): number {
	if (char == "S") return 0;
	if (char == "E") return "z".charCodeAt(0) - "a".charCodeAt(0);
	return char.charCodeAt(0) - "a".charCodeAt(0);
}

export class Map {
	grid: Cell[];
	startingPoint: Cell;
	endingPoint: Cell;
	nbCols: number;
	nbLines: number;

	constructor(stringMap: string) {
		this.grid = [];
		const lines = stringMap.split("\n");
		this.nbLines = lines.length;
		lines.forEach((line, idxLine) => {
			const cells = line.split("");
			this.nbCols = cells.length;
			cells.forEach((cell, idxCell) => {
				let newCell = new Cell(
					getNumericElevation(cell),
					idxCell,
					idxLine,
				);
				if (cell == "S") this.startingPoint = newCell;
				else if (cell == "E") this.endingPoint = newCell;

				this.grid.push(newCell);
			});
		});
	}

	getStartingPoints(): Cell[] {
		let startingPoints: Cell[] = [];
		for (let x = 0; x < this.nbCols; x++) {
			for (let y = 0; y < this.nbLines; y++) {
				if (this.getCell(x, y).elevation == 0) {
					startingPoints.push(this.getCell(x, y));
				}
			}
		}
		return startingPoints;
	}

	getPossibleNeighboors(cell): Cell[] {
		let x = cell.x;
		let y = cell.y;
		let candidates: Cell[] = [];
		if (x > 0) candidates.push(this.getCell(x - 1, y));
		if (x < this.nbCols - 1) candidates.push(this.getCell(x + 1, y));
		if (y > 0) candidates.push(this.getCell(x, y - 1));
		if (y < this.nbLines - 1) candidates.push(this.getCell(x, y + 1));

		let neighboors: Cell[] = [];
		let currentElevation = this.getCell(x, y).elevation;
		candidates.forEach((candidate) => {
			/*console.log(
				`Neighbor Test ${cell.toString()} ${candidate.toString()}`,
			);*/

			if (
				candidate.elevation - currentElevation <= 1 &&
				candidate.visited == false
			) {
				//console.log(`Neighbor Test Checked !`);

				neighboors.push(candidate);
			}
		});

		return neighboors;
	}

	getCell(x, y): Cell {
		return this.grid[y * this.nbCols + x];
	}

	static minBfs(input) {
		let indexMap = new Map(input);
		let startingPoints = indexMap.getStartingPoints();
		let minScore = Infinity;
		startingPoints.forEach((start) => {
			let map = new Map(input);
			map.startingPoint = map.getCell(start.x, start.y);
			let score = map.bfs();
			if (minScore > score) minScore = score;
		});
		return minScore;
	}

	bfs() {
		let from = this.startingPoint;
		let end = this.endingPoint;

		let bfsQueue = [];
		from.visited = true;
		bfsQueue.push(from);
		while (bfsQueue.length > 0) {
			let currentNode = bfsQueue.shift();
			//console.log(currentNode.toString());
			if (currentNode.x == end.x && currentNode.y == end.y) {
				//console.log("FOUND EXIT!");
				return currentNode.steps;
			}
			let edges = this.getPossibleNeighboors(currentNode);
			edges.forEach((edge) => {
				edge.visited = true;
				edge.parent = currentNode;
				edge.steps = currentNode.steps + 1;
				bfsQueue.push(edge);
			});
		}
		return 100000;

		/*		
		4      Q.enqueue(root)
		5      while Q is not empty do
			6          v := Q.dequeue()
		7          if v is the goal then
		8              return v
		9          for all edges from v to w in G.adjacentEdges(v) do
			10              if w is not labeled as explored then
		11                  label w as explored
		12                  w.parent := v
		13                  Q.enqueue(w)*/
	}
}
