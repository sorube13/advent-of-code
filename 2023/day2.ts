import { readFileInput, readFileInputRegexString } from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day2.txt');

class Game {
    identifier: number;
    revealedCubesList: [];
    maxRed:number;
    maxBlue:number;
    maxGreen:number;

    constructor(identifier:number) {
        this.identifier = identifier;
        this.revealedCubesList = [];
        this.maxRed=0;
        this.maxBlue=0;
        this.maxGreen=0;
    }

    revealCubes(revealedCubesList:string[]) {
        for(let cubes of revealedCubesList){
            let regExRed = /(\d+)(?=\s*red)/;
            let regExGreen = /(\d+)(?=\s*green)/;
            let regExBlue = /(\d+)(?=\s*blue)/;
            this.maxRed = Math.max(this.maxRed, +(cubes.match(regExRed)?.[0] ?? 0));
            this.maxBlue = Math.max(this.maxBlue, +(cubes.match(regExBlue)?.[0] ?? 0));
            this.maxGreen = Math.max(this.maxGreen, +(cubes.match(regExGreen)?.[0] ?? 0));
        }
    }

    checkGame(possibleRed:number, possibleBlue:number, possibleGreen:number) {
        if(this.maxRed<=possibleRed && 
            this.maxBlue<=possibleBlue && 
            this.maxGreen<=possibleGreen) {
                return this.identifier;
        }
        return 0;
    }

    power() {
        return this.maxRed * this.maxGreen * this.maxBlue;
    }
}

const limitRed = 12;
const limitGreen = 13;
const limitBlue = 14;
let possibleGameId = 0;
let powerGame = 0;

const gameInputList = readFileInput(input);
for(let gameLine of gameInputList) {
    let game = new Game(+gameLine.split(':')[0].split(' ')[1]);
    game.revealCubes(gameLine.split(':')[1].split(';'));
    possibleGameId +=game.checkGame(limitRed, limitBlue, limitGreen);
    powerGame += game.power();
}
console.log('Part 1', possibleGameId);
console.log('Part 2', powerGame);
