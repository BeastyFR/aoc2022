import run from "aocrunner";
import { CPU } from "./cpu.js";

const parseInput = (rawInput: string) => rawInput;


const part1 = (rawInput: string) =>
{
	/*const input = parseInput(rawInput);
	const commands = input.split('\n');
	let cycleChecks = [20, 60, 100, 140, 180, 220];
	let currentSum = 0;
	let cpu = new CPU();
	commands.forEach(command =>
	{
		cpu.addCommandString(command);
	});
	while (cpu.stillWorking())
	{
		let nextCycle = cpu.cycle + 1;
		if (cycleChecks.indexOf(nextCycle) != -1)
		{
			console.log(`adding : ${cpu.signalStrength} * ${nextCycle}`);
			currentSum += cpu.signalStrength * nextCycle;
		}
		cpu.tick();
		console.log(`Cycle : ${cpu.cycle} : ${cpu.signalStrength}`);
	}
	return currentSum;*/
};

const part2 = (rawInput: string) =>
{
	const input = parseInput(rawInput);
	const commands = input.split('\n');
	let cycleChecks = [40, 80, 120, 160, 200, 240];
	let currentSum = 0;
	let cpu = new CPU();
	commands.forEach(command =>
	{
		cpu.addCommandString(command);
	});
	let line = 40;
	let currentIndex = 0;
	let currentLine = "";
	while (cpu.stillWorking())
	{

		if (cpu.signalStrength - 1 <= currentIndex && cpu.signalStrength + 1 >= currentIndex)
		{
			//console.log(`Register is ${cpu.signalStrength} and index is ${currentIndex} -> #`);
			currentLine += "#";
		}
		else 
		{
			//console.log(`Register is ${cpu.signalStrength} and index is ${currentIndex} -> .`);
			currentLine += "."
		}
		cpu.tick();
		if (cpu.cycle % line == 0)
		{
			currentIndex = 0;
			console.log(currentLine);
			currentLine = "";
		}
		else
		{
			currentIndex++;
		}
		//console.log(`Cycle : ${cpu.cycle} : ${cpu.signalStrength}`);
	}
	return currentSum;
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
