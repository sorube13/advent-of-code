import { readFileInput } from '../tools-ts';

const inputFile:string = require('path').resolve(__dirname, './inputs/day3.txt');
let rucksacks: string[] = readFileInput(inputFile);
const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/*let sumPriority = 0;

for (let rucksack of rucksacks) {
  let compartement1 = {};
  let nbItems = rucksack.length;
  for (let i = 0; i < nbItems / 2; i++) {
    if (!compartement1[rucksack[i]]) {
      compartement1[rucksack[i]] = 0;
    }
    compartement1[rucksack[i]] = compartement1[rucksack[i]] + 1;
  }
  for (let i = nbItems / 2; i < nbItems; i++) {
    if (compartement1[rucksack[i]]) {
      sumPriority += priorities.indexOf(rucksack[i]) + 1;
      break;
    }
  }
}
console.log(sumPriority);*/

let sumBadge = 0;
let ruckIdx = 0;
while (ruckIdx <= rucksacks.length - 3) {
  const sortedRucksacks = rucksacks.slice(ruckIdx, ruckIdx + 3).sort((r1, r2) => r1.length - r2.length);
  for (let ruck of sortedRucksacks[0]) {
    if (sortedRucksacks[1].includes(ruck) && sortedRucksacks[2].includes(ruck)) {
      sumBadge += priorities.indexOf(ruck) + 1;
      break;
    }
  }
  ruckIdx += 3;
}
console.log(sumBadge);
