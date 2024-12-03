import {readTextFile} from '../tools-ts';
import { start } from 'repl';

const input:string = require('path').resolve(__dirname, './inputs/day3-1.txt');
const memoryInput:string = readTextFile(input);

function readInputAndCalculateMultiplication(mInput:string) {
    const regex = /mul\(\d{1,3},\d{1,3}\)/g;
    const foundInstructions = mInput.match(regex) || [];
    console.log(`Input: ${mInput} - Found instructions ${foundInstructions}`)

    let result = 0;
    for(let instr of foundInstructions) {
        result += calculateMultiplicationInstruction(instr);
    }
   return result;
}

function calculateMultiplicationInstruction(instruction:string) {
    let [x,y] = instruction.slice(4,instruction.length-1).split(',').map(Number);
    console.log(`Instruction ${instruction}: ${x} x ${y} = ${x*y}`)
    return x*y;
}

function readInputAndCalculateEnabledMultiplication(mInput: string) {
    let result = 0;

    const doIdx = findRegexIndex(mInput, /do\(\)/g);
    const dontIdx = findRegexIndex(mInput, /don't\(\)/g);
    //console.log('Do idx:', doIdx);
    // console.log('Dont idx:', dontIdx);

    //console.log('INPUT:', mInput);
    // Between beginning and first don't() - Verify that there is no do() before first don't()
    if(doIdx[0]>dontIdx[0]) { // there is a don't before do
        console.log('Start',mInput.slice(0,dontIdx[0]))
        const startResult = readInputAndCalculateMultiplication(mInput.slice(0,dontIdx[0]));
        console.log('Start multiplier: ', startResult)
        result += startResult
    }

    // Between do() and don't()
    const regexMiddle = /do\(\).*?(mul\(\d{1,3},\d{1,3}\)).*?don't\(\)/g;
    //result+=calculateWithRegex(mInput, regexMiddle);

    // Between last do() and end - Find that there is no don't() after last do()
    if(doIdx[doIdx.length-1]>dontIdx[dontIdx.length-1]) {
        console.log('End',mInput.slice(doIdx[doIdx.length-1]));
        const endResult= readInputAndCalculateMultiplication(mInput.slice(doIdx[doIdx.length-1]));
        console.log('End multiplier: ', endResult)
        result += endResult;
    }

    return result;
}

function calculateWithRegex(mInput:string, regex:RegExp) {
    const foundInstructions = mInput.match(regex) || [];
    let result = 0;
    for(let inst of foundInstructions){
        result += readInputAndCalculateMultiplication(inst);
    }
    return result;
}

function findRegexIndex(mInput:string, regex:RegExp){
    const matches = [];
    let match;

    // Loop to find all occurrences and their indices
    while ((match = regex.exec(mInput)) !== null) {
        matches.push(match.index); // Store the start index of each match
    }

    return matches;
}

// Part 1
console.log('Result multiplications: ', readInputAndCalculateMultiplication(memoryInput));
// Part 2
console.log('Result enabled multiplications: ',readInputAndCalculateEnabledMultiplication(memoryInput));



