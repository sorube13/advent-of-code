"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_ts_1 = require("../tools-ts");
const inputFile = require('path').resolve(__dirname, './inputs/day1.txt');
/**
 * Read the file separating by a blank line
 * For each element in the array, separate by new line
 * The output will be an array containing arrays of strings (= a list of elves, where each list is the calories carried by each elf)
 */
let elfCalories = (0, tools_ts_1.readFileInputRegex)(inputFile, '\r\n\r\n').map((i) => i.split('\r\n'));
/**
 * Expedition class
 */
class Expedition {
    constructor() {
        this.elves = [];
    }
    addElf(elf) {
        this.elves.push(elf);
        this.orderElves();
    }
    orderElves() {
        this.elves = this.elves.sort((e1, e2) => e2.totalCalories - e1.totalCalories);
    }
    findHighestCalorieElf() {
        console.log('The elf carrying the most calories is carrying: ' + this.elves[0].totalCalories);
    }
    findTopThreeHighestCalorieElf() {
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
    constructor(calories) {
        this.calories = [];
        this.totalCalories = 0;
        this.calories = calories.map((c) => +c);
        this.totalCalories = this.countCalories(this.calories);
    }
    countCalories(calories) {
        return calories.reduce((c1, c2) => c1 + c2, this.totalCalories);
    }
    print() {
        console.log('Elf has ' + this.totalCalories + ' calories');
    }
}
const expedition = new Expedition();
for (let calories of elfCalories) {
    expedition.addElf(new Elf(calories));
}
console.log('test silvia');
// Part 1
expedition.findHighestCalorieElf();
// Part 2
expedition.findTopThreeHighestCalorieElf();
