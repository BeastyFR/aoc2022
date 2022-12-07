import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

var totalPart1 = 0;
var bestSize = Infinity;

function createFolder(parent, size, name) {
  //console.log("Creation of folder " + name + " in " + parent.name);

  return {
    parent: parent,
    size: Number(size),
    name: name,
    type: "folder",
    childs: [],
  };
}

function createFile(parent, size, name) {
  //console.log("Creation of file " + name + " in " + parent.name);
  return {
    parent: parent,
    size: Number(size),
    name: name,
    type: "file",
  };
}

let disk = { name: "root", childs: [], type: "folder" };

function handleLS(currentFolder, operations) {
  //console.log("LS Current Folder is :");
  //console.log(currentFolder);
  let lsResult = operations.shift();
  while (lsResult) {
    if (lsResult.charAt(0) == "$") {
      operations.unshift(lsResult);
      return;
    } else {
      if (lsResult.substr(0, 3) == "dir") {
        let dirName = lsResult.substr(4);
        currentFolder.childs[dirName] = createFolder(currentFolder, 0, dirName);
      } else {
        let fileArray = lsResult.split(" ");
        let fileName = fileArray[1];
        currentFolder.childs[fileName] = createFile(
          currentFolder,
          fileArray[0],
          fileArray[1],
        );
      }
    }
    lsResult = operations.shift();
  }
  return;
}

function rollUp(folder) {
  let totalSize = 0;
  for (let element in folder.childs) {
    if (folder.childs[element].size != 0) {
      totalSize += Number(folder.childs[element].size);
    } else {
      rollUp(folder.childs[element]);
      totalSize += Number(folder.childs[element].size);
    }
  }
  folder.size = totalSize;
  if (totalSize <= 100000) totalPart1 += totalSize;
  if (totalSize > 1412830 && bestSize > totalSize) bestSize = totalSize;
}

function createDisk(operations) {
  let currentFolder = disk;
  let operation = operations.shift();
  while (operation) {
    //console.log("operation is " + operation);
    if (operation.charAt(0) == "$") {
      switch (operation) {
        case "$ ls":
          handleLS(currentFolder, operations);
          break;
        case "$ cd ..":
          if (currentFolder.parent) {
            currentFolder = currentFolder.parent;
          }
          break;
        case "$ cd /":
          currentFolder = disk;
          break;
        default:
          let directory = operation.split(" ");
          let dirName = directory[2];
          if (!currentFolder.childs[dirName]) {
            currentFolder.childs[dirName] = createFolder(
              currentFolder,
              0,
              dirName,
            );
          }
          currentFolder = currentFolder.childs[dirName];
          break;
      }
    }
    operation = operations.shift();
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const operations = input.split("\n");
  createDisk(operations);
  rollUp(disk);
  console.log(disk);
  return bestSize;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};
//41412830 - 70000000 -> -28 587 170
// 1412830

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
