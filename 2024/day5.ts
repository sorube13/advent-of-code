import { readFileInputRegexString } from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day5.txt');
const puzzleInput:string[] = readFileInputRegexString(input,'\r\n\r\n');

let rules = new Map<number, number[]>;
for(let ruleInput of puzzleInput[0].split('\r\n')){
    const rule = ruleInput.split('|').map(Number);
    rules.set(rule[1], [...(rules.get(rule[1]) ||[]).concat(rule[0])])
}

let updateList = puzzleInput[1].split('\r\n');

function getUpdateMap(updateInput:number[]):Map<number,number>{
    let updateMap = new Map();
    updateInput.forEach((u,idx) => updateMap.set(u, idx));
    return updateMap;
}



function checkPageOrderingRules(update:Map<number, number>, rules:Map<number, number[]>){
    for(let [num,idx] of update) {
        for(let bn of rules.get(num)||[]) {
            if((update.get(bn)||-1)>idx) {
                return false;
            }
        }
    }
    return true;
}

function analyseInput(){
    let correctUpdates:number[][]=[];
    let incorrectUpdate:number[][] = [];

    for(let update of updateList) {
        const updateNb = update.split(',').map(Number);
        let updateMap:Map<number,number> = getUpdateMap(updateNb);
        if(checkPageOrderingRules(updateMap,rules)) {
            correctUpdates.push(updateNb);
        } else {
            incorrectUpdate.push(updateNb);
        }
    }
    return [correctUpdates, incorrectUpdate];
}

function calculateMiddlePageNumbers(updates:number[][]){
    let middlePageNumbers = 0;
    for(let c of updates) {
        middlePageNumbers += c[(c.length-1)/2];
    }
    return middlePageNumbers;
}


// Part 1
console.log('Part 1: ', calculateMiddlePageNumbers(analyseInput()[0]));
// Part 2
console.log('Part 2: ',analyseInput()[1]);







