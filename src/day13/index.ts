import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function isNumber(n)
{
	return typeof (n) == "number" || typeof (n) == "string";
}

function isArray(a)
{
	return typeof(a) == "object";
}

function isEmpty(n)
{
	return typeof (n) == "undefined";
}

enum order{
	OK,
	NOK,
	NONE
}

function IsRightOrder(first, second) : order
{
	console.log(`Comparing ${JSON.stringify(first)} and ${JSON.stringify(second)}`);
	for(let idx = 0 ; idx < Math.max(first.length, second.length); idx++)
	{
		if(idx >= first.length && idx >= second.length)
		{
			console.log(`[NONE] End of both !`)
			return order.NONE
		}
		else if (idx < first.length && idx >= second.length)
		{
			console.log(`[NOK] End of second !`)
			return order.NOK;
		}
		else if (idx >= first.length && idx < second.length)
		{
			console.log(`[OK] End of first !`)
			return order.OK;
		}

		let f = first[idx];
		let s = second[idx];
		if(isNumber(f) && isNumber(s))
		{
			if(Number(f) < Number(s))
			{
				console.log(`[OK] ${Number(f)} < ${Number(s)} `)
				return order.OK;
			}
			else if (Number(f) > Number(s))
			{
				console.log(`[NOK] f>s `)
				return order.NOK;
			}			
		}
		else if(isArray(f) && isArray(s))
		{
			let subTest : order = IsRightOrder(f,s);
			if(subTest == order.OK || subTest == order.NOK)
				return subTest;
		}
		else if (isArray(f) && isNumber(s))
		{
			let subTest: order = IsRightOrder(f, [s]);
			if (subTest == order.OK || subTest == order.NOK)
				return subTest;
		}
		else if (isArray(s) && isNumber(f))
		{
			let subTest: order = IsRightOrder([f], s);
			if (subTest == order.OK || subTest == order.NOK)
				return subTest;
		}
	}
	return order.NONE
}

function compare(a,b) : number
{
	let testOrder = IsRightOrder(a,b);
	if (testOrder == order.OK)
		return -1;
	if (testOrder == order.NOK)
		return 1;
	return 0;
}

const part1 = (rawInput: string) =>
{
	/*const input = parseInput(rawInput);
	const pairs = input.split('\n');
	let pairsIdx = 0 ;
	let totalResult = 0;
	while(pairsIdx < pairs.length)
	{ 
		let firstPair = eval(pairs[pairsIdx]);
		let secondPair = eval(pairs[pairsIdx+1]);
		if(IsRightOrder(firstPair, secondPair) == order.OK)
		{
			totalResult+=(pairsIdx/3)+1;
		}
		pairsIdx = pairsIdx+3
	}
	return totalResult;*/
};
 
const part2 = (rawInput: string) =>
{
	const input = parseInput(rawInput);
	const pairsString = input.split('\n');
	let pairsIdx = 0;
	let pairs = [];
	while (pairsIdx < pairsString.length)
	{
		let firstPair = eval(pairsString[pairsIdx]);
		let secondPair = eval(pairsString[pairsIdx + 1]);
		pairs.push(firstPair);
		pairs.push(secondPair);
		pairsIdx = pairsIdx+3;
	}
	pairs.push([[2]]);
	pairs.push([[6]]);
	
	pairs.sort(compare);
	
	console.log('PAIRS IS ORDERED');
	
	let pairsEqual = [];
	let two, six;
	for (let idx = 0; idx < pairs.length-1 ; idx++)
	{
		if(IsRightOrder(pairs[idx], [[2]]) == order.NONE)
		{
			two = idx;
		}
		if (IsRightOrder(pairs[idx], [[6]]) == order.NONE)
		{
			six = idx;
		} 
	}

//	console.log(JSON.stringify(pairsEqual));
	

	console.log(`two ${two} and six ${six}`);

	return two*six;
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
