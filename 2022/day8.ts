import { dir } from 'console';
import { readFileInput } from '../tools-ts';

let input: string[] = readFileInput('./inputs/day8.txt');

const forest: number[][] = input.map((i) => i.split('').map((t) => +t));
const width = forest[0].length;
const height = forest.length;

function getColumn(arr: number[][], idx: number) {
  return arr.map((row) => row[idx]);
}

function getRow(arr: number[][], idx: number) {
  return arr[idx];
}

function checkViewFromTree(directions: number[][], tree: number): boolean {
  let isTreeVisible = false;
  for (let dir of directions) {
    if (isVisible(dir, tree)) {
      isTreeVisible = true;
      break;
    }
  }
  return isTreeVisible;
}

function isVisible(arr: number[], tree): boolean {
  return Math.max(...arr) < tree;
}

function visibleTrees(directions: number[][], tree): number {
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

function getDirections(arr: number[][], x: number, y: number): number[][] {
  let leftValues: number[] = getRow(arr, x).slice(0, y).reverse();
  let rightValues: number[] = getRow(arr, x).slice(y + 1);
  let topValues: number[] = getColumn(arr, y).slice(0, x).reverse();
  let bottomValues: number[] = getColumn(arr, y).slice(x + 1);
  let directions: number[][] = [];
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
