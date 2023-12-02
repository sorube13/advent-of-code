import {readFileInput, readFileInputRegex} from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day1.txt');
const calibrationDocument = readFileInput(input);

const numberMap = new Map();
numberMap.set('nine',9);
numberMap.set('eight', 8);
numberMap.set('seven', 7);
numberMap.set('six', 6);
numberMap.set('five', 5);
numberMap.set('four', 4);
numberMap.set('three', 3);
numberMap.set('two', 2);
numberMap.set('one', 1);
numberMap.set('zero', 0);

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

const findNumberIndexes = (s:string) : Map<number, any> => {
    let indexes = new Map();
    for(const key of numberMap.keys()){
        let idx = s.indexOf(key);
        if(idx>-1) {
            indexes.set(idx, key);
        }
    }
    return indexes;
}

const findIndexOfValueInString = (s: string, value: string) => {
    return s.indexOf(value);
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

function partTwo() {
    let calibrationValues: number[] = []
    let line = 'twone12';
    let indexes = findNumberIndexes(line);

    // order indexes
    console.log([...indexes.keys()].sort());

    // Replace First

    /*for(let cal of calibrationDocument) {
        cal = translateStringToNumbers(cal);
        if(!hasNumber(cal)) continue;
        console.log(cal);
        let calibrationVal = getFirstNumber(cal) + getFirstNumber(reverseString(cal));
        calibrationValues = calibrationValues.concat(+calibrationVal);
    }
    console.log('Part 2: ', calibrationValues.reduce((a,c)=>a + c, 0));*/
}



partOne();
partTwo();