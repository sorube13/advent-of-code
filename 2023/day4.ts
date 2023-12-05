import { readFileInput } from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day4.txt');

class Card {
    identifier: number;
    winningNumbers: number[];
    cardNumbers: number[];
    points:number;
    matchingNumbers:number;

    constructor(identifier:number, winningNumbers: number[],cardNumbers: number[] ) {
        this.identifier = identifier;
        this.winningNumbers = winningNumbers;
        this.cardNumbers=cardNumbers;
        this.points=0;
        this.matchingNumbers=0;
    }

   checkNumber(nb : number){
        return this.cardNumbers.includes(nb);
   }

   addPoints() {
        if(this.points===0) {
            this.points = 1;
        } else {
            this.points *=2;
        }
   }

   checkPointsCard(){
        for(let winningNumber of this.winningNumbers){
            if(this.checkNumber(winningNumber)) {
                this.addPoints();
            }
        }
        return this.points;
   }

   checkMatchingNumbers() {
       for(let winningNumber of this.winningNumbers){
           if(this.checkNumber(winningNumber)) {
               this.matchingNumbers++;
           }
       }
       return this.matchingNumbers;
   }
}

const cardInputList = readFileInput(input);
let totalPoints = 0;

let winnerCards: number[] = [];
let totalInstances:number[] = [];

for(let [index, cardLineOg] of cardInputList.entries()) {
    let cardLine = cardLineOg.replace(/\s+/g, ' ');
    //console.log(cardLine)
    let cardIdentifier = cardLine.split(':')[0];
    //console.log(cardIdentifier)
    let identifier = +cardIdentifier.split(' ')[1];
    let cardNumberList = cardLine.split(':')[1];
    let winningNumbers = cardNumberList.split('|')[0].trim().split(' ').map(n=>+n);
    let cardNumbers = cardNumberList.split('|')[1].trim().split(' ').map(n=>+n);
    let card = new Card(identifier, winningNumbers, cardNumbers);
    // Part 1
    totalPoints += card.checkPointsCard();

    // Part 2
    winnerCards[index] = card.checkMatchingNumbers();
    totalInstances[index] = 1;
}


for(let [k, winnerCard] of winnerCards.entries()){
    if(winnerCard>0) {
        for(let i = k+1 ; i<=k + winnerCard; i++) {
            totalInstances[i] = totalInstances[i] + totalInstances[k];
        }
    }
}

console.log('Part 1', totalPoints);
console.log('Part 2',totalInstances.reduce((a,c)=>a+c,0));




