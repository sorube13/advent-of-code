import { readFileInputAsMatrix } from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day6.txt');
const puzzleInput:string[][] = readFileInputAsMatrix(input);

class Guard {
    x:number;
    y:number;
    direction:'U'|'D'|'L'|'R';
    uniquePositions =1; // Starting position counts as 1
    map:string[][];
    out=false;
    constructor(x:number,y:number,direction:'U'|'D'|'L'|'R', map:string[][]) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.map = map;
        this.map[x][y] = 'X';
    }

    changeDirection() {
        switch (this.direction) {
            case "U":
                this.direction='R';
                break;
            case "D":
                this.direction='L';
                break;
            case "R":
                this.direction='D';
                break;
            case "L":
                this.direction='U';
                break;
        }
    }

    advanceGuard() {
        let newX = this.x;
        let newY = this.y;
        switch (this.direction) {
            case "U":
                newX--;
                break;
            case "D":
                newX++;
                break;
            case "R":
                newY++;
                break;
            case "L":
                newY--;
                break;
        }
        if(newX>this.map.length-1 || newX<0 || newY>this.map[0].length-1 ||newY<0) {
            //this.printMap();
            this.out=true;
        } else {
            let newMapPoint = this.map[newX][newY];
            if(newMapPoint === '.' ||newMapPoint==='X') {
                this.x = newX;
                this.y = newY;
                if(newMapPoint==='.') {
                    this.map[this.x][this.y] = 'X';
                    this.uniquePositions++;
                }
                //this.printMap();
                //console.log('Coordinates:', this.x, this.y)
            } else if(newMapPoint==='#'){
                this.changeDirection();
                this.advanceGuard();
            }
        }
    }

    printMap() {
        console.log('Current map: ')
        console.table(this.map);
        console.log('Number of unique positions:', this.uniquePositions);
    }

}


function getCoordinates(map:string[][], position:string) {
    for(let i = 0;i<map.length; i++) {
        for(let j=0;j<map[0].length;j++) {
            if(map[i][j]===position){
                return [i,j]
            }
        }
    }
    return[-1,-1];
}
let initialCoord = getCoordinates(puzzleInput, '^');
let guard = new Guard(initialCoord[0], initialCoord[1], 'U', puzzleInput);


while(!guard.out){
    guard.advanceGuard();
}

// Part 1
console.log('Part 1: ', guard.uniquePositions);
// Part 2
console.log('Part 2: ',);







