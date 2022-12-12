import { Cell } from "./cell.js";

function getNumericElevation(char) : number
{
	if(char == 'S')
		return 0;
	if(char == 'E')
		return 'z'.charCodeAt(0);
	return char.charCodeAt(0) - 'a'.charCodeAt(0);
}

export class Map
{
	grid: Cell[];
	startingPoint :Cell;
	endingPoint :Cell; 
	nbCols : number;
	nbLines : number;

	constructor(stringMap : string)
	{
		this.grid = [];
		const lines = stringMap.split('\n');
		this.nbLines = lines.length;
		lines.forEach((line, idxLine) => {
			const cells = line.split('');
			this.nbCols = cells.length;
			cells.forEach((cell, idxCell) => {
				let newCell = new Cell(getNumericElevation(cell), idxCell, idxLine);
				if(cell == 'S')
					this.startingPoint = newCell;
				else if(cell == 'E')
					this.endingPoint = newCell;

				this.grid.push(newCell);
			})
		})
	}

	getPossibleNeighboors(x,y) : Cell[]
	{
		let candidates :Cell [] = [];
		if(x >0)
			candidates.push(this.getCell(x-1,y));
		if(x < this.nbCols-1)
			candidates.push(this.getCell(x + 1, y));
		if(y > 0)
			candidates.push(this.getCell(x, y -1));
		if(y < this.nbLines-1)
			candidates.push(this.getCell(x, y+1));

		let neighboors : Cell[] = [];
		let currentElevation = this.getCell(x, y).elevation;
		candidates.forEach(candidate => {
			if (Math.abs(currentElevation - candidate.elevation) <= 1 && candidate.visited == false)
			{
				neighboors.push(candidate);
			}
		});

		return neighboors;
	}

	getCell(x,y) : Cell
	{
		return this.grid[y*this.nbCols +x];
	}

	bfs()
	{
		let from = this.startingPoint;
		let end = this.endingPoint;

		let bfsQueue = [];
		from.visited = true;
		bfsQueue.push(from);
		while(bfsQueue.length > 0)
		{
			let currentNode = bfsQueue.shift();
			console.log(currentNode.elevation);
			if(currentNode == end)
				return currentNode.steps;
			let edges = this.getPossibleNeighboors(currentNode.x, currentNode.y)
			edges.forEach(edge => {
				edge.visited = true;
				edge.parent = currentNode;
				edge.steps = currentNode.steps+1;
				bfsQueue.push(edge);
			})
		}

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