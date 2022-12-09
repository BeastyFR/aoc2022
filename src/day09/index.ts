import run from "aocrunner";
import { Grid, Cell } from "./grid.js";

const parseInput = (rawInput: string) => rawInput;
var sizeOfGrid = 2000;

const part1 = (rawInput: string) => {
	/*const input = parseInput(rawInput);
	const commands = input.split("\n");
	let grid = initGrid();
	commands.forEach((command) => {
		let params = command.split(" ");
		const direction = params[0];
		const move = params[1];

		for (let nbMove = 0; nbMove < Number(move); nbMove++) {
			switch (direction) {
				case "U":
					grid.moveHeadUp();
					break;
				case "D":
					grid.moveHeadDown();
					break;
				case "L":
					grid.moveHeadLeft();
					break;
				case "R":
					grid.moveHeadRight();
					break;
			}
			console.log(command);
			//grid.display();
		}
	});
	//grid.displayTailPath();
	return grid.nbNewTail;*/
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const commands = input.split("\n");
	let grid = initGrid();
	commands.forEach((command) => {
		let params = command.split(" ");
		const direction = params[0];
		const move = params[1];

		for (let nbMove = 0; nbMove < Number(move); nbMove++) {
			switch (direction) {
				case "U":
					grid.moveHeadUp();
					break;
				case "D":
					grid.moveHeadDown();
					break;
				case "L":
					grid.moveHeadLeft();
					break;
				case "R":
					grid.moveHeadRight();
					break;
			}
			grid.updateTail();
			//console.log(command);
			//grid.display();
		}
	});
	//grid.displayTailPath();
	return grid.nbNewTail;
};

function initGrid() {
	let grid = new Grid(sizeOfGrid, 11, 1000, 1000);

	return grid;
}

run({
	part1: {
		tests: [
			// {
			//   input: ``,
			//   expected: "",
			// },
		],
		solution: part1,
	},
	part2: {
		tests: [
			// {
			//   input: ``,
			//   expected: "",
			// },
		],
		solution: part2,
	},
	trimTestInputs: true,
	onlyTests: false,
});
