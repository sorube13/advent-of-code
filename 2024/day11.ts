import { readTextFile } from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day11.txt');
const puzzleInput:number[] = readTextFile(input).split(' ').map(Number);

class Stone {
    value:number;

    constructor(value:number) {
        this.value=value;
    }

    blink(){
        if(this.value === 0){
            return [new Stone(1)];
        } else if(this.value.toString().length%2 === 0){
            let digits = this.value.toString();
            let l = digits.length;
            return [new Stone(+this.value.toString().slice(0,l/2)), new Stone(+this.value.toString().slice(l/2,l))]
        } else {
            return [new Stone(this.value*2024)];
        }
    }

}

class Stones {
    nbStones:number;
    stones: Stone[]=[];
    nbBlinks = 0;
    constructor(arrangement:number[]) {
        for(let st of arrangement){
            this.stones.push(new Stone(st));
        }
        this.nbStones=this.stones.length;
        this.print();
    }

    blink() {
        this.nbBlinks++;
        let newStones:Stone[] = [];
        for(let stone of this.stones){
            newStones.push(...stone.blink());
        }
        this.stones = newStones;
        this.nbStones = newStones.length;
        //this.print();
    }

    blinkNTimes(times:number){
        for(let i=1; i<times+1;i++) {
            this.blink();
        }
        return this.nbStones;
    }

    print(){
        console.log(`After ${this.nbBlinks} blinks:`)
        console.log(this.stones.map(s => s.value))
    }



}
let stones = new Stones(puzzleInput);


// Part 1
console.log('Part 1: ', stones.blinkNTimes(25) );
// Part 2
console.log('Part 2: ',stones.blinkNTimes(75));







