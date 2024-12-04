import {readFileInput} from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day4.txt');
const puzzleInput:string[] = readFileInput(input);

let puzzleArray:string[][] = puzzleInput.map(x=>x.split(""));

function findXmas(input:string) {
    if(input.length<"XMAS".length) {
        return 0;
    }
    const regF = /(XMAS)/g;
    const regR =  /(SAMX)/g;
    return (input.match(regF)||[]).length + (input.match(regR)||[]).length
}

function findMAS(input:string) {
    if(input.length<"MAS".length) {
        return 0;
    }
    const regF = /(MAS)/g;
    const regR =  /(SAM)/g;
    return (input.match(regF)||[]).length + (input.match(regR)||[]).length >0
}

function countXmas(puzzle:string[][]){
    let nbXmas = 0;

    // Analyse rows
    for(let r=0;r<puzzle.length;r++) {
        let pLine = puzzle[r].join('');
        nbXmas += findXmas(pLine);
    }

    // Analyse columns
    let nbCols = 0;
    for(let c=0;c<puzzle[0].length; c++) {
        let pLine = puzzle.map(p=>p[c]).join('');
        nbXmas += findXmas(pLine)
    }


    // Analyse diagonals
    let nbDiag1=0;
    let diagPuzzle = getDiagonals(puzzle);
    for(let d1=0; d1<diagPuzzle.length;d1++){
        let pLine = diagPuzzle[d1].join('');
        nbXmas += findXmas(pLine)
    }
    console.log(nbDiag1)

    // Analyse reverse diagonals
    let nbDiag2=0;
    let revDiagPuzzle = getReverseDiagonals(puzzle);
    for(let d1=0; d1<revDiagPuzzle.length;d1++){
        let pLine = revDiagPuzzle[d1].join('');
        nbXmas += findXmas(pLine)
    }

    return nbXmas;
}


function getDiagonals(array:string[][]) {
    const rows = array.length;
    const cols = array[0].length;
    const diagonals = [];

    // Top-left to bottom-right diagonals
    for (let d = 0; d < rows + cols - 1; d++) {
        const diagonal = [];
        for (let i = 0; i < rows; i++) {
            const j = d - i; // Calculate column index
            if (j >= 0 && j < cols) {
                diagonal.push(array[i][j]);
            }
        }
        if (diagonal.length > 0) {
            diagonals.push(diagonal);
        }
    }

    return diagonals;
}

function getReverseDiagonals(array:string[][]) {
    const rows = array.length;
    const cols = array[0].length;
    const diagonals = [];

    // Top-right to bottom-left diagonals
    for (let d = 0; d < rows + cols - 1; d++) {
        const diagonal = [];
        for (let i = 0; i < rows; i++) {
            const j = d - (rows - 1) + i; // Calculate column index for reverse diagonals
            if (j >= 0 && j < cols) {
                diagonal.push(array[i][j]);
            }
        }
        if (diagonal.length > 0) {
            diagonals.push(diagonal);
        }
    }

    return diagonals;
}

function countMas(puzzle:string[][]) {
    let nbMas = 0;
    for(let i=1;i<puzzle.length-1;i++) {
        for(let j=1;j<puzzle[0].length-1; j++) {
            if(puzzle[i][j]==='A' && checkXmas(puzzle, i, j)) {
               nbMas++;
            }
        }
    }
    return nbMas;
}

function checkXmas(puzzle:string[][], i:number, j:number){
    let cross1 = puzzle[i-1][j-1] + 'A' + puzzle[i+1][j+1];
    let cross2 = puzzle[i+1][j-1] + 'A' + puzzle[i-1][j+1];
    return findMAS(cross1)&&findMAS(cross2);
}


// Part 1
console.log('Part 1: ', countXmas(puzzleArray));
// Part 2
console.log('Part 2: ',countMas(puzzleArray));







