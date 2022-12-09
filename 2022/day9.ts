import { readFileInput } from '../tools-ts';

let input: string[] = readFileInput('./inputs/day9.txt');

const DIR = {
  UP: 'U',
  DOWN: 'D',
  LEFT: 'L',
  RIGHT: 'R',
};

class Instruction {
  dir: string;
  steps: number;
  constructor(input:string) {
    this.dir = input.split(' ')[0];
    this.steps = +input.split(' ')[1];
  }
  print() {
    console.log('Instruction: ' + this.dir + ' ' + this.steps);
  }
}

class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  moveUp() {
    this.x++;
  }

  moveDown() {
    this.x--;
  }
  moveLeft() {
    this.y--;
  }
  moveRight() {
    this.y++;
  }
  print() {
    console.log('Point :' + this.x + ', ' + this.y);
  }
  equals(p: Point) {
    return this.x == p.x && this.y == p.y;
  }
}

let instructions = input.map((i) => new Instruction(i));
let visitedTailPoints: Point[] = [];

let headPoint = new Point(0, 0);
let tailPoint = new Point(0, 0);

function moveHead(dir: string, hPoint: Point) {
  switch (dir) {
    case DIR.UP:
      hPoint.moveUp();
      break;
    case DIR.DOWN:
      hPoint.moveDown();
      break;
    case DIR.LEFT:
      hPoint.moveLeft();
      break;
    case DIR.RIGHT:
      hPoint.moveRight();
      break;
    default:
      break;
  }
}

function moveTail(hPoint: Point, tPoint: Point) {
  if (hPoint.x > tPoint.x) {
      tPoint.moveUp();
  } else if (hPoint.x < tPoint.x) {
    tPoint.moveDown();
  }
  if (hPoint.y > tPoint.y) {
    tPoint.moveRight();
  } else if (hPoint.y < tPoint.y) {
    tPoint.moveLeft();
  }
}

function mustMoveTail(hPoint: Point, tPoint: Point) {
  return (Math.abs(hPoint.x-tPoint.x)>1 || Math.abs(hPoint.y-tPoint.y)>1);
}

for (let inst of instructions) {
  inst.print();
  let nbSteps = inst.steps;
  while (nbSteps > 0) {
    moveHead(inst.dir, headPoint);
    //console.log('Head Point: {x: ' + headPoint.x + ', y: ' + headPoint.y + '}');
    if (mustMoveTail(headPoint,tailPoint)) {
      // if abs distance from point is >=2 move otherwise dont
      moveTail(headPoint, tailPoint);
    }
    //console.log('Tail Point: {x: ' + tailPoint.x + ', y: ' + tailPoint.y + '}');
    if (!visitedTailPoints.find((p) => p.equals(tailPoint))) {
      visitedTailPoints.push(new Point(tailPoint.x, tailPoint.y));
      //console.log('Visited Point: {x: ' + tailPoint.x + ', y: ' + tailPoint.y + '}');
    }
    nbSteps--;
  }
  //console.log('----------');
}

console.log('Part 1 : ', visitedTailPoints.length); // 6311
