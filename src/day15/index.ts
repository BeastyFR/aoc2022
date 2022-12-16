import run from "aocrunner";
import { Grid } from "./grid.js";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
	/*const input = parseInput(rawInput);
	const regex =
		/Sensor at x=([-0-9]+), y=([-0-9]+): closest beacon is at x=([-0-9]+), y=([-0-9]+)/gm;
	const lines = input.split("\n");
	let map = new Grid();
	lines.forEach((line) => {
		var m;

		while ((m = regex.exec(line)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}

			console.log(m);
			map.addSensor(
				Number(m[1]),
				Number(m[2]),
				Number(m[3]),
				Number(m[4]),
			);
		}
	});

	let y = 2000000;
	return map.getImpossiblePosition(y);*/
};

const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const regex =
		/Sensor at x=([-0-9]+), y=([-0-9]+): closest beacon is at x=([-0-9]+), y=([-0-9]+)/gm;
	const lines = input.split("\n");
	let map = new Grid();
	lines.forEach((line) => {
		var m;

		while ((m = regex.exec(line)) !== null) {
			if (m.index === regex.lastIndex) {
				regex.lastIndex++;
			}

			//console.log(m);
			map.addSensor(
				Number(m[1]),
				Number(m[2]),
				Number(m[3]),
				Number(m[4]),
			);
		}
	});

	return map.getDistressSignalBetween(0,4000000);
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
