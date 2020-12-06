require('../tools.js')();

var boardingPassInputList = readFileInput('./inputs/day5.txt');

const BACK = 'B';
const FRONT = 'F';
const RIGHT = 'R';
const LEFT = 'L';

class BoardingPass {
    constructor(input) {
        this.row = this.getRowFromInput(input);
        this.column = this.getColumnFromInput(input);
        this.id = this.getBoardingPassId();
    }

    getBoardingPassId(){
        return this.row * 8 + this.column;
    }

    getLowerHalf(arr){
        var halfLength = Math.ceil(arr.length / 2);    
        return arr.splice(0,halfLength);

    }
    getUpperHalf(arr){
        var halfLength = Math.ceil(arr.length / 2);    
        return arr.splice(halfLength);
    }

    getRowFromInput(input) {
        let rows = [...Array(128).keys()];
        for(let str of input) {
            if(FRONT === str) {
                rows = [...this.getLowerHalf(rows)];
            } else if(BACK=== str){
                rows = [...this.getUpperHalf(rows)];
            }
        }
        return rows[0];
    }

    getColumnFromInput(input) {
        let columns = [...Array(8).keys()];
        for(let str of input) {
            if(LEFT === str) {
                columns = [...this.getLowerHalf(columns)];
            } else if(RIGHT=== str){
                columns = [...this.getUpperHalf(columns)];
            }
        }
        return columns[0];
    } 
}

boardingPassList = [];
for(let boardingPassInput of boardingPassInputList){
    let boardingPass = new BoardingPass(boardingPassInput);
    boardingPassList.push(boardingPass);
}
console.log('Part 1 : Max id - ', Math.max(...(boardingPassList.map(b=>b.id))));

boardingPassList.sort((b1, b2) => b1.id - b2.id);

let boardingPassIds = boardingPassList.map(b=>b.id);
for(let i=1; i<boardingPassIds.length; i++){
    if((boardingPassIds[i-1]!==boardingPassIds[i] - 1) &&
        (boardingPassIds[i-1]+2===boardingPassIds[i])){
            console.log(boardingPassIds[i-1] + 1);
            return;
    }
}


