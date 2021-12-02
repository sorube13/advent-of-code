require('../tools.js')();

var course = readFileInput('./inputs/day2.txt');

const FORWARD = 'forward';
const DOWN = 'down'; 
const UP = 'up';

class Submarine1 {
    constructor(horizontal, depth) {
        this.horizontal = horizontal || 0;
        this.depth = depth || 0;
    }

    readStep(step, units) {
        switch (step) {
            case FORWARD:
                this.horizontal += +units;
                break;
            case DOWN:
                this.depth += +units;
                break;
            case UP:
                this.depth -= +units;
                break;
            default:
                break;
        }
    }

    print(){
        console.log('Submarine horizontal position: ' + this.horizontal + ' depth: '+this.depth);
    }

    calculatePosition(){
        console.log('Result: ', this.horizontal*this.depth);
    }
}

let sub = new Submarine1(0,0);
for(instruction of course){
    var step = instruction.split(' ')[0];
    var unit = instruction.split(' ')[1];
    sub.readStep(step, unit);
}
sub.print();
sub.calculatePosition();

class Submarine2 {
    constructor(horizontal, depth, aim) {
        this.horizontal = horizontal || 0;
        this.depth = depth || 0;
        this.aim = aim || 0;
    }

    readStep(step, units) {
        switch (step) {
            case FORWARD:
                this.horizontal += +units;
                this.depth += this.aim*(+units)
                break;
            case DOWN:
                this.aim += +units;
                break;
            case UP:
                this.aim -= +units;
                break;
            default:
                break;
        }
    }

    print(){
        console.log('Submarine horizontal position: ' + this.horizontal + ' depth: '+this.depth + ' aim: '+ this.aim);
    }

    calculatePosition(){
        console.log('Result: ', this.horizontal*this.depth);
    }
}

let sub = new Submarine2(0,0,0);
for(instruction of course){
    var step = instruction.split(' ')[0];
    var unit = instruction.split(' ')[1];
    sub.readStep(step, unit);
}
sub.print();
sub.calculatePosition();