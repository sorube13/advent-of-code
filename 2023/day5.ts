import { readFileInputRegex } from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day5.txt');
const re = new RegExp(/\n[a-z,-]+ map:/g);
const readInput = readFileInputRegex(input, re).map(ri=>ri.trim());

const seeds = readInput[0].split(': ')[1].split(' ');

console.table(readInput);
console.table(seeds);