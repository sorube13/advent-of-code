import {readFileInput} from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day1.txt');
const lists = readFileInput(input);

function roundTowardZero(num:number) {
  return num < 0 ? Math.ceil(num) : Math.floor(num);
}


class Dial {
    position:number=50;
    nbZeros:number=0;
    nbPassesZero:number=0;
    
    constructor(){}

    performRotation(rotation:string){
        var direction:string = rotation.charAt(0) as 'L'|'R';
        var distance:number = parseInt(rotation.slice(1));
        var oldPosition=this.position;
        
        var nbTurns = Math.abs(roundTowardZero(distance/100));
        var newDistance = distance - nbTurns*100;

        //console.log(`NbTurns = ${nbTurns} | newDistance = ${newDistance}`)

        if(direction==='L'){
            this.position -= newDistance ;
        } else {
            this.position += newDistance
        }
        
        if((this.position>99 || this.position<1) &&  oldPosition!==0){
            this.position
            this.nbPassesZero++;
        }
        this.nbPassesZero+=nbTurns;

        
        this.position = this.position 

        this.position = ((this.position % 100)+100)%100; // Between 0 and 99 (positif)
        //console.log(`The dial is rotated ${rotation} (${direction}, ${distance}) to point at ${this.position}. Passes : ${this.nbPassesZero}`)

        if(this.position===0){
            this.nbZeros++;
        }
    }
}

let dial = new Dial();
for(let rotate of lists) {
    dial.performRotation(rotate);
}

console.log(`Part 1 : Number of times we land on 0 : ${dial.nbZeros}`);
console.log(`Part 2 : Number of times dial passes through 0 : ${dial.nbPassesZero}`);