import run from "aocrunner";
import { Map } from "./map.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	let map = new Map(input);
	//return(map.bfs());
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);
	return Map.minBfs(input);
};

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
