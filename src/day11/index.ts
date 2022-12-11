import run from "aocrunner";
import { MonkeyManager } from "./monkey.js"

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) =>
{
	let mm = new MonkeyManager(false);
	mm.playRounds(10000);
};

const part2 = (rawInput: string) =>
{
	const input = parseInput(rawInput);

	return;
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
