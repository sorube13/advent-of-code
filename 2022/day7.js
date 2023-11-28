"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_ts_1 = require("../tools-ts");
let input = (0, tools_ts_1.readFileInput)('./inputs/day7.txt');
const maxSize = 100000;
const totalDiskSpace = 70000000;
const updateSpace = 30000000;
let line = 0;
let fileSys = {};
let currentDir = '';
while (line < input.length) {
    let currentLine = input[line];
    if (isCommand(currentLine)) {
        if (isCd(currentLine)) {
            if (!isCdBack(currentLine)) {
                let dirName = currentLine.split(' ')[2];
                if (dirName == '/') {
                    currentDir = dirName;
                    fileSys[currentDir] = { size: 0, children: [] };
                }
                else {
                    let parent = currentDir;
                    currentDir = currentDir + dirName + '/';
                    fileSys[parent].children.push(currentDir);
                    fileSys[currentDir] = { size: 0, children: [] };
                }
            }
            else {
                currentDir = currentDir.slice(0, -1);
                currentDir = currentDir.slice(0, currentDir.lastIndexOf('/') + 1);
            }
        }
    }
    else {
        if (isFile(currentLine)) {
            fileSys[currentDir].size += +currentLine.split(' ')[0];
        }
    }
    line++;
}
// Calculate total size
for (let key of Object.keys(fileSys)) {
    fileSys[key].size = calculateTotalSize(fileSys[key]);
}
let totalSize = 0;
for (let key of Object.keys(fileSys)) {
    if (fileSys[key].size <= maxSize) {
        totalSize += fileSys[key].size;
    }
}
console.log('Part 1: ', totalSize);
const freeSpace = totalDiskSpace - fileSys['/'].size;
let directoriesToDelete = [];
for (let key of Object.keys(fileSys)) {
    if (freeSpace + fileSys[key].size >= updateSpace) {
        directoriesToDelete.push(key);
    }
}
directoriesToDelete.sort((k1, k2) => fileSys[k1].size - fileSys[k2].size);
console.log('Part 2 :', fileSys[directoriesToDelete[0]].size);
function calculateTotalSize(tree) {
    if (tree.children.length == 0) {
        return tree.size;
    }
    let totalChildrenSize = 0;
    for (let childTree of tree.children) {
        totalChildrenSize += calculateTotalSize(fileSys[childTree]);
    }
    return tree.size + totalChildrenSize;
}
function isCommand(lineInput) {
    return lineInput.startsWith('$');
}
function isCd(lineInput) {
    return lineInput.split(' ')[1] == 'cd';
}
function isCdBack(lineInput) {
    return lineInput.split(' ')[2] == '..';
}
function isFile(lineInput) {
    return !lineInput.startsWith('dir');
}
