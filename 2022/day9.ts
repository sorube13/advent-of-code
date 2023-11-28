import { readFileInput } from '../tools-ts';

const inputFile:string = require('path').resolve(__dirname, './inputs/day9.txt');
let input: string[] = readFileInput(inputFile);

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

class Knot {
  point:Point;
  visitedPoints: Point[]=[];
  childKnot:Knot|undefined;
  constructor(point:Point) {
    this.point = point;
    this.visitedPoints.push(new Point(point.x, point.y));
  }

  move(dir: string) {
    switch (dir) {
      case DIR.UP:
        this.point.moveUp();
        break;
      case DIR.DOWN:
        this.point.moveDown();
        break;
      case DIR.LEFT:
        this.point.moveLeft();
        break;
      case DIR.RIGHT:
        this.point.moveRight();
        break;
      default:
        break;
    }
    this.saveVisitedPoint();
    this.moveChild();
  }

  moveChild():void {
    if(!this.childKnot || !this.mustMoveChild()){
      return;
    }
    let childKnotPoint = this.childKnot.point;
    if (this.point.x > childKnotPoint.x) {
      childKnotPoint.moveUp();
    } else if (this.point.x < childKnotPoint.x) {
      childKnotPoint.moveDown();
    }
    if (this.point.y > childKnotPoint.y) {
      childKnotPoint.moveRight();
    } else if (this.point.y < childKnotPoint.y) {
      childKnotPoint.moveLeft();
    }
    this.childKnot.saveVisitedPoint();
    if(this.childKnot){
      this.childKnot.moveChild();
    }
  }

  mustMoveChild():boolean {
    if(!this.childKnot){
      return false;
    }
    let childKnotPoint=this.childKnot.point;
    return (Math.abs(this.point.x-childKnotPoint.x)>1 || Math.abs(this.point.y-childKnotPoint.y)>1);
  }

  saveVisitedPoint():void{
    if (!this.visitedPoints.find((p) => p.equals(this.point))) {
      this.visitedPoints.push(new Point(this.point.x, this.point.y));
    }
  }

  print():void {
    console.log('Visited points : ',this.visitedPoints);
  }  
}

let instructions = input.map((i) => new Instruction(i));

// Part 1
let headKnot = new Knot(new Point(0, 0));
let tailKnot = new Knot(new Point(0, 0));
headKnot.childKnot=tailKnot;

// Part 2
let tailKnot2 = new Knot(new Point(0, 0));
let tailKnot3 = new Knot(new Point(0, 0));
let tailKnot4 = new Knot(new Point(0, 0));
let tailKnot5 = new Knot(new Point(0, 0));
let tailKnot6 = new Knot(new Point(0, 0));
let tailKnot7 = new Knot(new Point(0, 0));
let tailKnot8 = new Knot(new Point(0, 0));
let tailKnot9 = new Knot(new Point(0, 0));
tailKnot.childKnot=tailKnot2;
tailKnot2.childKnot=tailKnot3;
tailKnot3.childKnot=tailKnot4;
tailKnot4.childKnot=tailKnot5;
tailKnot5.childKnot=tailKnot6;
tailKnot6.childKnot=tailKnot7;
tailKnot7.childKnot=tailKnot8;
tailKnot8.childKnot=tailKnot9;

for (let inst of instructions) {
  let nbSteps = inst.steps;
  while (nbSteps > 0) {
    headKnot.move(inst.dir);
    nbSteps--;
  }
}

console.log('Part 1 : ', tailKnot.visitedPoints.length); // 6311
console.log('Part 2 : ', tailKnot9.visitedPoints.length); // 2482
