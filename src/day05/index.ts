import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

function initStack()
{
  let stacks= [];
  stacks[1] = ['S','Z','P','D','L','B','D','C'];
  stacks[2] = "NVGPHWB".split('');
  stacks[3] = "FWBJG".split('');
  stacks[4] = "GJNFLWCS".split('');
  stacks[5] = "WJLTPMSH".split('');
  stacks[6] = "BCWGFS".split('');
  stacks[7] = "HTPMQBW".split('');
  stacks[8] = "FSWT".split('');
  stacks[9] = "NCR".split('');
  return stacks;
}

function moveCrate(stack, number, from , to)
{
  for(let nbMove = 0 ; nbMove < number ; nbMove++)
  {
    let elt = stack[from].pop();
    stack[to].push(elt);
  }
  return stack;
}


function moveCrate2(stack, number, from , to)
{
  let moveStack = [];
  for(let nbMove = 0 ; nbMove < number ; nbMove++)
  {
    let elt = stack[from].pop();
    moveStack.push(elt);
  }
  for(let nbMove = 0 ; nbMove < number ; nbMove++)
  {
    let elt = moveStack.pop();
    stack[to].push(elt);
  }  
  return stack;
}


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const moves = input.split('\n');
  let stack = initStack();
  moves.forEach(line => {
    let move = line.replace("move ","").replace(" from ","$").replace(" to ","$").split('$');
    stack = moveCrate(stack, move[0], move[1], move[2]);
  });

  //console.log(stack);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const moves = input.split('\n');
  let stack = initStack();
  moves.forEach(line => {
    let move = line.replace("move ","").replace(" from ","$").replace(" to ","$").split('$');
    stack = moveCrate2(stack, move[0], move[1], move[2]);
  });

  console.log(stack);
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
