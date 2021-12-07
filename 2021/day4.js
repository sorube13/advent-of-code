require('../tools.js')();

var input = readFileInput('./inputs/day4.txt');

class BingoBoard {
    constructor(board) {
        this.board = board;
        this.numbers = {};
        this.buildBoard(board);
        this.hasBingo = false;
        this.score = 0;
    }

    buildBoard(board){
        for(var line of board) {
            for(var elem of line) {
                this.numbers[elem] = false;
            }
        }
    }

    callNumber(num) {
        if(!this.hasBingo && this.numbers[num] !== undefined) {
            this.numbers[num] = true;
            if(this.checkBingo()) {
                this.score = this.calculateScore(num);
                console.log('SCORE : ', this.score);
                return  this.score;
            }
        }
    }
    
    checkBingo(){
        this.hasRowBingo();
        this.hasColumnBingo();
        return this.hasBingo;
    }

    hasRowBingo(){
        for(var line of this.board) {
            var hasLine = true;
            for(var elem of line) {
                if(!this.numbers[elem]) {
                    hasLine = false;
                }
            }
            if(hasLine){
                this.hasBingo = true;
                break;
            }
        }
    }

    hasColumnBingo(){
        for(var c=0; c<this.board[0].length; c++) {
            var hasLine = true;
            for(var line of this.board) {
                if(!this.numbers[line[c]]) {
                    hasLine = false;
                }
            }
            if(hasLine){
                this.hasBingo = true;
                break;
            }
        }
    }

    calculateScore(calledNumber) {
        var score = 0;
        for(var num of Object.keys(this.numbers)) {
            if(!this.numbers[num]) {
                score += +num;
            }
        }
        return score*calledNumber;
    }
    
}

var numbersCalled = input[0].split(',');
var boards = [];
for(var i=2; i<input.length; i=i+6) {
    var board = input.slice(i, i+5).map(item=> item.split(' ').filter(item=> item!==''));
    boards[boards.length] = new BingoBoard(board);
}

var score;
for(var num of numbersCalled) {
    for(var bingoBoard of boards){
        bingoBoard.callNumber(num);
        if(bingoBoard.hasBingo){
            score = bingoBoard.score;
        }
    }
   /*  if(score!==undefined) {
        break;
    } */
}