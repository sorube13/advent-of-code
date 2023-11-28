"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_ts_1 = require("../tools-ts");
const input = (0, tools_ts_1.readFileInputRegex)('./inputs/day5.txt', '\r\n\r\n');
const part1 = false;
const map = input[0].split('\r\n').reverse();
let chunkSize = 3;
let crates = [];
for (let idx = 0; idx < map.length; idx++) {
    crates[idx] = [];
    for (let i = 0; i < map[idx].length; i += chunkSize + 1) {
        crates[idx] = crates[idx].concat(map[idx].slice(i, i + chunkSize).trim());
    }
}
let cratesTransp = (0, tools_ts_1.transpose)(crates);
const stacks = {};
for (let c of cratesTransp) {
    stacks[c[0]] = c.slice(1).filter((x) => x != '');
}
const procedures = input[1].split('\r\n');
for (let proc of procedures) {
    let procList = proc.split(' ');
    let instruction = procList[0];
    let nbCrates = +procList[1];
    let origin = procList[3];
    let destination = procList[5];
    if (part1) {
        while (nbCrates > 0) {
            stacks[destination] = stacks[destination].concat(stacks[origin].pop());
            nbCrates--;
        }
    }
    else {
        let movingCrates = stacks[origin].splice(stacks[origin].length - nbCrates);
        stacks[destination] = stacks[destination].concat(movingCrates);
    }
}
let lastStack = '';
for (let key of Object.keys(stacks)) {
    let list = stacks[key];
    lastStack += list[list.length - 1];
}
console.log(lastStack.replace(/\[/g, '').replace(/\]/g, ''));
