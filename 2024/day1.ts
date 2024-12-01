import {readFileInput} from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day1.txt');
const lists = readFileInput(input);


// Part 1
let listA:number[] = [];
let listB:number[] = [];

for (let v of lists) {
    listA = listA.concat(+v.split(' ')[0]);
    listB = listB.concat(+v.split(' ')[3]);
}

listA = listA.sort();
listB = listB.sort();

let differences = 0;

for(let i=0;i<lists.length; i++){
    differences+= Math.abs(listA[i]- listB[i]);
}

// console.log(differences);

// Part 2
let listC :any= {};
for(let c of listB) {
    if(listC[c]!==undefined) {
        listC[c]++;
    } else {
        listC[c]=1;
    }
} 
console.table(listC)
let similarityScore = 0;
for(let a of listA){
    let multiplier = listC[a] || 0;
    similarityScore += a*multiplier;
}
console.log(similarityScore);