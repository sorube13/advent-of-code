import { readFileInputRegexString } from '../tools-ts';

const inputFile:string = require('path').resolve(__dirname, './inputs/day1.txt');


/**
 * Read the file separating by a blank line
 * For each element in the array, separate by new line
 * The output will be an array containing arrays of strings (= a list of elves, where each list is the calories carried by each elf)
 */
let elfCalories: string[][] = readFileInputRegexString(inputFile, '\r\n\r\n').map((i) => i.split('\r\n'));

/**
 * Expedition class
 */
class Expedition {
  elves: Elf[] = [];

  addElf(elf: Elf) {
    this.elves.push(elf);
    this.orderElves();
  }

  orderElves(): void {
    this.elves = this.elves.sort((e1, e2) => e2.totalCalories - e1.totalCalories);
  }

  findHighestCalorieElf(): void {
    console.log('The elf carrying the most calories is carrying: ' + this.elves[0].totalCalories);
  }

  findTopThreeHighestCalorieElf(): void {
    let topThreeElfCalories = 0;
    for (let i = 0; i < 3; i++) {
      if (this.elves[i]) {
        topThreeElfCalories += this.elves[i].totalCalories;
      }
    }
    console.log('The top three elves carrying the most calories are carrying: ' + topThreeElfCalories);
  }
}

/**
 * Elf class
 */
class Elf {
  calories: number[] = [];
  totalCalories: number = 0;
  constructor(calories: string[]) {
    this.calories = calories.map((c) => +c);
    this.totalCalories = this.countCalories(this.calories);
  }

  countCalories(calories: number[]): number {
    return calories.reduce((c1, c2) => c1 + c2, this.totalCalories);
  }

  print(): void {
    console.log('Elf has ' + this.totalCalories + ' calories');
  }
}

const expedition: Expedition = new Expedition();
for (let calories of elfCalories) {
  expedition.addElf(new Elf(calories));
}

// Part 1
expedition.findHighestCalorieElf();
// Part 2
expedition.findTopThreeHighestCalorieElf();
