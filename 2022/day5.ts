import { readFileInputRegexString, transpose } from '../tools-ts';

const inputFile:string = require('path').resolve(__dirname, './inputs/day5.txt');

const input: string[] = readFileInputRegexString(inputFile, '\r\n\r\n');
const part1 = false;

const map = input[0].split('\r\n').reverse();

let chunkSize = 3;
let crates : string[][] = [];
for (let idx = 0; idx < map.length; idx++) {
  crates[idx] = [];
  for (let i = 0; i < map[idx].length; i += chunkSize + 1) {
    crates[idx] = crates[idx].concat(map[idx].slice(i, i + chunkSize).trim());
  }
}

let cratesTransp: string[][] = transpose(crates);

const stacks: {[index: string]:any} = {}
for (let c of cratesTransp) {
  stacks[c[0]] = c.slice(1).filter((x) => x != '');
}

const procedures: string[] = input[1].split('\r\n');

for (let proc of procedures) {
  let procList: string[] = proc.split(' ');
  let instruction: string = procList[0];
  let nbCrates: number = +procList[1];
  let origin: string = procList[3];
  let destination: string = procList[5];
  if(part1) {
    while (nbCrates > 0) {
      stacks[destination] = stacks[destination].concat(stacks[origin].pop());
      nbCrates--;
    }
  } else {
    let movingCrates:string[]=stacks[origin].splice(stacks[origin].length-nbCrates);
    stacks[destination] = stacks[destination].concat(movingCrates);
  }
  
}

let lastStack: string = '';
for (let key of Object.keys(stacks)) {
  let list: string[] = stacks[key];
  lastStack += list[list.length - 1];
}

console.log(lastStack.replace(/\[/g, '').replace(/\]/g, ''));
