import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function findSum(arr)
{
  let sum = 0;

  for(let i=0; i<arr.length; i++)
  {
    let n = Number(arr[i]);
    if(!isNaN(n)) 
      sum += n;
  }

  console.log(sum);
  
  return sum;
}

const part1 = (rawInput: string) => { 

  const input = parseInput(rawInput);
  let elves = input.split("\r\n\r\n");
  let max = -Infinity;
  elves.forEach(elve => {
    let caloriesString = elve.split('\r\n');
    console.log(caloriesString);
    let sum = findSum(caloriesString);
    if(max < sum)
      max = sum;
  });
  return max;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let elves = input.split("\r\n\r\n");
  let max = -Infinity;
  let calories = [];
  elves.forEach(elve => {
    let caloriesString = elve.split('\r\n');
    console.log(caloriesString);
    calories.push(findSum(caloriesString));
    calories.sort((a,b) => b - a);

  });
  console.log(calories);
  return calories[0] + calories[1] + calories[2];

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
