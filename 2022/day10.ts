import { readFileInput } from '../tools-ts';

const inputFile:string = require('path').resolve(__dirname, './inputs/day10.txt');
let input: string[] = readFileInput(inputFile);

class Program {
  x: number = 1;
  cycle: number = 0;
  signalStrength = 0;
  crt = [...Array(240)].map((a) => '.');

  constructor() {
    // this.writeCrt();
  }

  INSTRUCTIONS = {
    'ADDX': { code: 'addx', nbCycles: 2 },
    'NOOP': { code: 'noop', nbCycles: 0 },
  };

  viewExecution = [20, 60, 100, 140, 180, 220];

  nextCycle() {
    this.cycle++;
    this.writeCrt();
    if (this.viewExecution.includes(this.cycle)) {
      //this.printInfo();
      this.signalStrength = this.signalStrength + this.cycle * this.x;
    }
  }

  add(value: number): void {
    let nbCycles = this.INSTRUCTIONS.ADDX.nbCycles;
    while (nbCycles > 0) {
      this.nextCycle();
      nbCycles--;
    }
    this.x += value;
  }

  executeLine(instruction: string, value: number): void {
    //if (this.cycle > 21) return;
    // this.printInfo();
    // this.writeCrt();
    switch (instruction) {
      case this.INSTRUCTIONS.ADDX.code:
        this.add(value);
        break;
      case this.INSTRUCTIONS.NOOP.code:
        this.nextCycle();
        break;
      default:
        break;
    }
  }

  printInfo(): void {
    console.log('Value is', { cycle: this.cycle, value: this.x }, 'Signal strength = ', this.cycle * this.x);
  }

  shouldWrite() {
    let crtPointer = (this.cycle - 1) % 40;
    return crtPointer === this.x || crtPointer === this.x - 1 || crtPointer === this.x + 1;
  }

  writeCrt() {
    if (this.shouldWrite()) {
      this.crt[this.cycle] = '#';
    }
    //this.printInfo();
    //this.showCrt();
  }

  showCrt() {
    console.log(this.crt.slice(1, 41).join(''));
    console.log(this.crt.slice(41, 81).join(''));
    console.log(this.crt.slice(81, 121).join(''));
    console.log(this.crt.slice(121, 161).join(''));
    console.log(this.crt.slice(161, 201).join(''));
    console.log(this.crt.slice(201, 241).join(''));
  }
}

let p = new Program();
for (let instruction of input) {
  let inst = instruction.split(' ')[0];
  let value = +instruction.split(' ')[1];
  p.executeLine(inst, value);
}
console.log('Part 1', p.signalStrength); // 16880
console.log('Part 2');
p.showCrt();
