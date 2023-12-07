import { readFileInput} from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day7.txt');
const handsInput:string[] = readFileInput(input);

const typeStrength:Map<string, number> = new Map<string,number>;
typeStrength.set('Five of a kind',7);
typeStrength.set('Four of a kind', 6);
typeStrength.set('Full house', 5);
typeStrength.set('Three of a kind', 4);
typeStrength.set('Two pair', 3);
typeStrength.set('One pair', 2);
typeStrength.set('High card', 1);

const cardStrength: Map<string,number> = new Map<string,number>;
cardStrength.set('A',14);
cardStrength.set('K',13);
cardStrength.set('Q',12);
cardStrength.set('J',11);
cardStrength.set('T',10);
cardStrength.set('9',9);
cardStrength.set('8',8);
cardStrength.set('7',7);
cardStrength.set('6',6);
cardStrength.set('5',5);
cardStrength.set('4',4);
cardStrength.set('3',3);
cardStrength.set('2',2);


function getKey(value:number, map:Map<string,number>) {
    return [...map.entries()].filter(({ 1: v }) => v === value).map(([k]) => k);
}

class Hand {
    handType:number = 0;
    handCards:string;
    bid:number;
    cardCount:Map<string,number>=new Map<string,number>;
    win:number=1;
    power:number=0;

    constructor(line:string) {
        const cardInfo = line.split(' ');
        this.handCards = cardInfo[0];
        this.bid = +cardInfo[1];
        this.getHandType(this.handCards);
        this.getPower();
    }

    getPower(){
        this.power = (cardStrength.get(this.handCards[4])??0)
            + (10*(cardStrength.get(this.handCards[3])??0))
                + (100*(cardStrength.get(this.handCards[2])??0))
                    + (1000*(cardStrength.get(this.handCards[1])??0))
                        + (10000*(cardStrength.get(this.handCards[0])??0));

    }

    getHandType(cards:string) {
        for(let c of cards) {
            this.cardCount.set(c, (this.cardCount.get(c) ?? 0) + 1);
        }
        switch (this.cardCount.size) {
            case 5:
                this.handType=typeStrength.get('High card') ?? 0;
                break;
            case 4 :
                this.handType=typeStrength.get('One pair') ?? 0;
                break;
            case 3 :
                for(let[key,value] of this.cardCount.entries()) {
                    if (value == 3) {
                        this.handType = typeStrength.get('Three of a kind') ?? 0; // TTT98 {T:3, 9:1, 8:1}
                        break;
                    } else if (value == 2) {
                        this.handType = typeStrength.get('Two pair') ?? 0;        // 23432 {2:2, 2:2, 4:1}
                        break;
                    }
                }
                break;
            case 2:
                let value = this.cardCount.values().next().value
                if(value==4 || value == 1){
                    this.handType=typeStrength.get('Four of a kind') ?? 0; // AA8AA {A:4, 8:1}
                } else {
                    this.handType=typeStrength.get('Full house') ?? 0;     // 23332 {2:2, 3:3}
                }
                break;
            case 1 :
                this.handType=typeStrength.get('Five of a kind') ?? 0;
                break;
        }
    }

    print(){
        console.log('Hand : ', this.handCards, ' Type : ', getKey(this.handType, typeStrength))
    }
}

function orderBySecondRule(hands:Hand[]) {
    return hands.sort((h1,h2) => h2.power-h1.power);
}

const handTypeMap:Map<number, Hand[]> = new Map<number, Hand[]>;

let handList:Hand[] = [];
for(let handInput of handsInput){
    let hand = new Hand(handInput)
    // hand.print();
    handList = handList.concat(hand);
    handTypeMap.set(hand.handType, (handTypeMap.get(hand.handType) ?? []).concat(hand));
}

//console.table(handTypeMap);

function partOne() {
    let handListOrdered:Hand[] = [];
    for(let type of typeStrength.values()) {
        handListOrdered = handListOrdered.concat(...orderBySecondRule(handTypeMap.get(type) ?? []));
    }

    let totalWinnings:number = 0;
    let rank = 1;
    for(let i=handListOrdered.length-1;i>=0;i--) {
        console.log(handListOrdered[i].handCards,handListOrdered[i].bid, handListOrdered[i].power,rank);
        totalWinnings+=rank*handListOrdered[i].bid;
        rank++;
    }
    console.log('Total Winnings ', totalWinnings);
}


partOne()
//partTwo()