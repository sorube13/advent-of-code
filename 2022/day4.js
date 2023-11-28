"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_ts_1 = require("../tools-ts");
let input = (0, tools_ts_1.readFileInput)('./inputs/day4.txt');
function createSection(start, finish) {
    return Array.from({ length: finish - start + 1 }, (_, i) => start + i);
}
function completeOverlap(section1, section2) {
    let a = section1[0];
    let b = section1[section1.length - 1];
    let c = section2[0];
    let d = section2[section2.length - 1];
    return (a <= c && d <= b) || (c <= a && b <= d);
}
function someOverlap(section1, section2) {
    let a = section1[0];
    let b = section1[section1.length - 1];
    let c = section2[0];
    let d = section2[section2.length - 1];
    return (a <= c && c <= b) || (a <= d && d <= b) || (c <= a && a <= d) || (c <= b && b <= d);
}
let nbCompleteOverlaps = 0;
let nbPartialOverlaps = 0;
for (let sections of input) {
    let elf1 = sections.split(',')[0];
    let elf2 = sections.split(',')[1];
    let sectionElf1 = createSection(+elf1.split('-')[0], +elf1.split('-')[1]);
    let sectionElf2 = createSection(+elf2.split('-')[0], +elf2.split('-')[1]);
    if (completeOverlap(sectionElf1, sectionElf2)) {
        nbCompleteOverlaps++;
    }
    if (someOverlap(sectionElf1, sectionElf2)) {
        nbPartialOverlaps++;
    }
}
console.log('Part 1: ', nbCompleteOverlaps);
console.log('Part 2: ', nbPartialOverlaps);
