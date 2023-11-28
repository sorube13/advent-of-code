import { readFileInput } from '../tools-ts';
const inputFile:string = require('path').resolve(__dirname, './inputs/day7.txt');
let input: string[] = readFileInput(inputFile);

const maxSize = 100000;
const totalDiskSpace = 70000000;
const updateSpace = 30000000;

let line = 0;
let fileSys: { [index: string]: any } = {};
let currentDir = '';
while (line < input.length) {
  let currentLine: string = input[line];
  if (isCommand(currentLine)) {
    if (isCd(currentLine)) {
      if (!isCdBack(currentLine)) {
        let dirName = currentLine.split(' ')[2];
        if (dirName == '/') {
          currentDir = dirName;
          fileSys[currentDir] = { size: 0, children: [] };
        } else {
          let parent = currentDir;
          currentDir = currentDir + dirName + '/';
          fileSys[parent].children.push(currentDir);
          fileSys[currentDir] = { size: 0, children: [] };
        }
      } else {
        currentDir = currentDir.slice(0, -1);
        currentDir = currentDir.slice(0, currentDir.lastIndexOf('/') + 1);
      }
    }
  } else {
    if (isFile(currentLine)) {
      fileSys[currentDir].size += +currentLine.split(' ')[0];
    }
  }
  line++;
}

// Calculate total size
for (let key of Object.keys(fileSys)) {
  fileSys[key].size = calculateTotalSize(fileSys[key]);
}

let totalSize = 0;
for (let key of Object.keys(fileSys)) {
  if (fileSys[key].size <= maxSize) {
    totalSize += fileSys[key].size;
  }
}
console.log('Part 1: ', totalSize);

const freeSpace = totalDiskSpace - fileSys['/'].size;
let directoriesToDelete = [];
for (let key of Object.keys(fileSys)) {
  if (freeSpace + fileSys[key].size >= updateSpace) {
    directoriesToDelete.push(key);
  }
}

directoriesToDelete.sort((k1, k2) => fileSys[k1].size - fileSys[k2].size);

console.log('Part 2 :', fileSys[directoriesToDelete[0]].size);

function calculateTotalSize(tree: { children: string | any[]; size: number; }) {
  if (tree.children.length == 0) {
    return tree.size;
  }
  let totalChildrenSize = 0;
  for (let childTree of tree.children) {
    totalChildrenSize += calculateTotalSize(fileSys[childTree]);
  }
  return tree.size + totalChildrenSize;
}

function isCommand(lineInput: string): boolean {
  return lineInput.startsWith('$');
}

function isCd(lineInput: string): boolean {
  return lineInput.split(' ')[1] == 'cd';
}

function isCdBack(lineInput: string): boolean {
  return lineInput.split(' ')[2] == '..';
}

function isFile(lineInput: string): boolean {
  return !lineInput.startsWith('dir');
}
