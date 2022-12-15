import { readFileInputRegex } from '../tools-ts';

const input: string[] = readFileInputRegex('inputs/day11.txt', '\r\n\r\n');

class Monkey {
  id: number;
  items: number[];
  operation: string;
  divisibleBy: number;
  monkeyIdTrue: number;
  monkeyIdFalse: number;
  nbInspectedItems: number = 0;

  constructor(input: string) {
    let inputLines: string[] = input.split('\r\n');
    this.id = +inputLines[0].slice(7, inputLines[0].length - 1);
    this.items = this.getStartingItems(inputLines[1]);
    this.operation = inputLines[2].split(' = ')[1];
    this.divisibleBy = +inputLines[3].split('divisible by ')[1];
    this.monkeyIdTrue = +inputLines[4].split('throw to monkey ')[1];
    this.monkeyIdFalse = +inputLines[5].split('throw to monkey ')[1];
  }

  getStartingItems(input: string) {
    return input
      .split(': ')[1]
      .split(', ')
      .map((nbItem) => +nbItem);
  }

  printMonkey() {
    console.log('Monkey ' + this.id + ':');
    console.log('   Starting items: ' + this.items.join(', '));
    console.log('   Operation: new = ' + this.operation);
    console.log('   Test: divisible by ' + this.divisibleBy);
    console.log('        If true: throw to monkey ' + this.monkeyIdTrue);
    console.log('        If false: throw to monkey ' + this.monkeyIdFalse);
  }

  printItems() {
    console.log('Monkey ' + this.id + ': ' + this.items.join(', '));
  }

  printInspectedItems() {
    console.log('Monkey ' + this.id + ': inspected items ' + this.nbInspectedItems + ' times');
  }

  sendToNewMonkey(monkeys: Monkey[], item: number): void {
    if (item % this.divisibleBy === 0) {
      //console.log('      Current worry level is divisible by ' + this.divisibleBy);
      // console.log('      Item with worry level ' + item + ' is thrown to monkey ' + this.monkeyIdTrue);
      let trueMonkey = monkeys.find((m) => m.id === this.monkeyIdTrue);
      trueMonkey.items.push(item);
    } else {
      //console.log('      Current worry level is not divisible by ' + this.divisibleBy);
      //console.log('      Item with worry level ' + item + ' is thrown to monkey ' + this.monkeyIdFalse);
      let falseMonkey = monkeys.find((m) => m.id === this.monkeyIdFalse);
      falseMonkey.items.push(item);
    }
  }

  calculateWorryLevel(item: number): number {
    let increasedWorryLevel = eval(this.operation.replace(/old/g, '' + item));
    //console.log('      Worry level changes to ' + increasedWorryLevel);
    let worryLevel = Math.floor(increasedWorryLevel / 3);
    //console.log('      Monkey gets bored with item. Worry level is divided by 3 to ' + worryLevel);
    return worryLevel;
  }

  inspectItem(item: number): number {
    this.nbInspectedItems++;
    //console.log('   Monkey inspects an item with a worry level of ' + item);
    return this.calculateWorryLevel(item);
  }

  round(monkeys: Monkey[]) {
    // console.log('Monkey ' + this.id + ':');
    let initialItems = [...this.items];
    for (let item of initialItems) {
      let worryLevel = this.inspectItem(item);
      this.sendToNewMonkey(monkeys, worryLevel);
      this.items = this.items.slice(1);
    }
  }
}

let monkeyList: Monkey[] = [];
for (let i of input) {
  let monkey = new Monkey(i);
  monkey.printMonkey();
  monkeyList.push(monkey);
}

const nbRounds = 20;
let currentRound = 0;
while (currentRound < nbRounds) {
  for (let monkey of monkeyList) {
    monkey.round(monkeyList);
  }
  currentRound++;
  //console.log('After round ' + currentRound + ', the monkeys are holding items with these worry levels: ');
  /* for (let monkey of monkeyList) {
    monkey.printItems();
  } */
}
/* for (let monkey of monkeyList) {
  monkey.printInspectedItems();
} */

console.log(
  'Part 1',
  monkeyList
    .sort((m1, m2) => m2.nbInspectedItems - m1.nbInspectedItems)
    .slice(0, 2)
    .reduce((agg, c) => agg * c.nbInspectedItems, 1),
); // 90882
