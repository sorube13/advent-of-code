"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_ts_1 = require("../tools-ts");
let input = (0, tools_ts_1.readFileInput)('./inputs/day8.txt');
const forest = input.map((i) => i.split('').map((t) => +t));
const width = forest[0].length;
const height = forest.length;
function getColumn(arr, idx) {
    return arr.map((row) => row[idx]);
}
function getRow(arr, idx) {
    return arr[idx];
}
function checkViewFromTree(directions, tree) {
    let isTreeVisible = false;
    for (let dir of directions) {
        if (isVisible(dir, tree)) {
            isTreeVisible = true;
            break;
        }
    }
    return isTreeVisible;
}
function isVisible(arr, tree) {
    return Math.max(...arr) < tree;
}
function visibleTrees(directions, tree) {
    let scenicScoresDirections = [0, 0, 0, 0];
    for (let dirIdx = 0; dirIdx < directions.length; dirIdx++) {
        let dir = directions[dirIdx];
        //console.log('----------------');
        //console.log('Scenic:', scenicScoresDirections);
        //console.log('Tree:', tree);
        //console.table(directions);
        for (let i = 0; i < dir.length; i++) {
            scenicScoresDirections[dirIdx]++;
            if (dir[i] >= tree) {
                break;
            }
        }
    }
    return scenicScoresDirections.reduce((agg, c) => agg * c, 1);
}
function getDirections(arr, x, y) {
    let leftValues = getRow(arr, x).slice(0, y).reverse();
    let rightValues = getRow(arr, x).slice(y + 1);
    let topValues = getColumn(arr, y).slice(0, x).reverse();
    let bottomValues = getColumn(arr, y).slice(x + 1);
    let directions = [];
    directions.push(leftValues, rightValues, topValues, bottomValues);
    return directions;
}
// Edges = twice height + twice width - 4 edges
let nbVisibleTrees = height * 2 + width * 2 - 4;
let scenicScore = 0;
for (let i = 1; i < forest.length - 1; i++) {
    for (let j = 1; j < forest[0].length - 1; j++) {
        let directions = getDirections(forest, i, j);
        let tree = forest[i][j];
        if (checkViewFromTree(directions, tree)) {
            nbVisibleTrees++;
        }
        scenicScore = Math.max(scenicScore, visibleTrees(directions, tree));
    }
}
console.log('Part 1 : Nb visible trees : ', nbVisibleTrees); //1736
console.log('Part 2 : Scenic score :', scenicScore);
