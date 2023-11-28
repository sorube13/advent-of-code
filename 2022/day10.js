"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_ts_1 = require("../tools-ts");
let input = (0, tools_ts_1.readFileInput)('./inputs/day10.txt');
class Program {
    constructor() {
        this.x = 1;
        this.cycle = 0;
        this.signalStrength = 0;
        this.crt = [...Array(240)].map((a) => '.');
        this.INSTRUCTIONS = {
            'ADDX': { code: 'addx', nbCycles: 2 },
            'NOOP': { code: 'noop', nbCycles: 0 },
        };
        this.viewExecution = [20, 60, 100, 140, 180, 220];
        // this.writeCrt();
    }
    nextCycle() {
        this.cycle++;
        this.writeCrt();
        if (this.viewExecution.includes(this.cycle)) {
            //this.printInfo();
            this.signalStrength = this.signalStrength + this.cycle * this.x;
        }
    }
    add(value) {
        let nbCycles = this.INSTRUCTIONS.ADDX.nbCycles;
        while (nbCycles > 0) {
            this.nextCycle();
            nbCycles--;
        }
        this.x += value;
    }
    executeLine(instruction, value) {
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
    printInfo() {
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
