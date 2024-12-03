import {readTextFile} from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day3.txt');
const memoryInput:string = readTextFile(input);

function readInputAndCalculateMultiplication(mInput:string) {
    const regex = /mul\(\d{1,3},\d{1,3}\)/g;
    const foundInstructions = mInput.match(regex) || [];
   
    let result = 0;
    for(let instr of foundInstructions) {
        result += calculateMultiplicationInstruction(instr);
    }
   return result;
}

function calculateMultiplicationInstruction(instruction:string) {
    let [x,y] = instruction.slice(4,instruction.length-1).split(',').map(Number);
    return x*y;
}

function readInputAndCalculateEnabledMultiplication(mInput:string){
    //regex to separate by do() and don't()
    let res = 0;
    let reg:RegExp = /(do\(\)|don't\(\))/g;
    const instructions:string[] = memoryInput.split(reg);
    let enabled = true;
    for(let inst of instructions){
        if("do()"===inst){
            enabled=true;
        } else if ("don't()"===inst){
            enabled = false;
        } else {
            if(enabled) {
                res+=readInputAndCalculateMultiplication(inst);
            }
        }
    }
    return res;
}

// Part 1
console.log('Result multiplications: ', readInputAndCalculateMultiplication(memoryInput));
// Part 2
console.log('Result enabled multiplications: ',readInputAndCalculateEnabledMultiplication(memoryInput));



