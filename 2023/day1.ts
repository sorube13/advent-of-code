import {readFileInput} from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day1.txt');
const calibrationDocument = readFileInput(input);

const numberMap = new Map();
numberMap.set('zero', 0);
numberMap.set('one', 1);
numberMap.set('two', 2);
numberMap.set('three', 3);
numberMap.set('four', 4);
numberMap.set('five', 5);
numberMap.set('six', 6);
numberMap.set('seven', 7);
numberMap.set('eight', 8);
numberMap.set('nine',9);

const replaceAt = (s:string, index:number, replacement:string, len:number) => {
    return s.substring(0, index) + replacement + s.substring(index + len);
}

const getFirstNumber = (line:string) => {
    let firstNumberIndex = line.match(/\d/)?.index;
    if(firstNumberIndex == undefined){
        return '';
    }
    return line[firstNumberIndex];
}

const getLastNumber = (line: string) => {
    let lastNumberIndex = line.match(/(\d)(?!.*\d)/)?.index;
    if(lastNumberIndex == undefined){
        return '';
    }
    return line[lastNumberIndex];
}

const hasNumber = (s: string) => /\d/.test(s);

const translateStringToNumbers = (s:string) : string => {
    for(const [key, value] of numberMap.entries()){
        s = s.replace(key, value);
    }
    return s;
}
const location = (substring:string, str:string) => {
    let re = new RegExp(substring, "g");
    return[ ...str.matchAll(re)];
}


const findNumberIndexes = (s:string) : Map<number, any> => {
    let indexes = new Map();
    for(const key of numberMap.keys()){
        for(let loc of location(key, s)) {
            indexes.set(loc.index, key);
        }
    }
    return indexes;
}

function partOne() {
    let calibrationValues: number[] = []
    for(let cal of calibrationDocument) {
        if(!hasNumber(cal)) continue;
        let calibrationVal = getFirstNumber(cal) + getLastNumber(cal);
        calibrationValues = calibrationValues.concat(+calibrationVal);
    }
    console.log('Part 1: ', calibrationValues.reduce((a,c)=>a + c, 0)); // 54697
}

function translateFirstAndLastNumbers(line: string) {
    let indexes = findNumberIndexes(line);
    // order indexes
    let sortedIndexes = [...indexes.keys()].sort((a,b)=>a-b);
    let firstIndex = sortedIndexes[0];
    let lastIndex = sortedIndexes[sortedIndexes.length - 1];

    let reFirst = new RegExp(indexes.get(firstIndex), "g")
    let reLast = new RegExp(indexes.get(lastIndex), "g")
    let lineFirst = line.replace(reFirst, numberMap.get(indexes.get(firstIndex)));
    let lineLast = line.replace(reLast, numberMap.get(indexes.get(lastIndex)));
    return {lineFirst, lineLast};
}

function partTwo() {
    let calibrationValues: number[] = []
    let lineId=1;
    for(let cal of calibrationDocument) {
        let {lineFirst, lineLast} = translateFirstAndLastNumbers(cal);
        let calibrationVal = getFirstNumber(lineFirst) + getLastNumber(lineLast);
        calibrationValues = calibrationValues.concat(+calibrationVal);
        lineId++;
    }
    console.log('Part 2: ', calibrationValues.reduce((a,c)=>a + c, 0)); //54885
}

partOne();
partTwo();