require('../tools.js')();

var startingNumbersInput = readFileInputCommas('./inputs/day15.txt');

function getNthNumber(num) {
  var startingNumbers=startingNumbersInput.map(element => +element);
  var lastNumbers=startingNumbers.reduce((agg, curr, idx)=>{agg[curr] = idx; return agg;},{})
  var lastIndex = startingNumbers.length-1;
  var age = startingNumbers[lastIndex];
  var nextElement;
  while(lastIndex<num-1) {
    var nextElement = age;
    var age = 0;
    if(lastNumbers[nextElement] !== undefined) {
      age = lastIndex - lastNumbers[nextElement];
    }
    lastNumbers[nextElement] = lastIndex;
    lastIndex++;
  }
  console.log(`${num}th number: ${age}`);
}

function part1() {
  var startingNumbers=startingNumbersInput.map(element => +element);
  for(var i = startingNumbers.length-1; i<num-1;i++) {
    var previousStartingNumbers = startingNumbers.slice(0,i);
    //console.log(`Index ${i} - Element ${startingNumbers[i]} - Previous starting numbers ${previousStartingNumbers}`)
    if(!previousStartingNumbers.includes(startingNumbers[i])) {
      //console.log('Not includes - Add 0')
      startingNumbers.push(0);
    } else{
      //console.log(`Included - Calculate diff Index - ${i - previousStartingNumbers.lastIndexOf(startingNumbers[i])}`);
      startingNumbers.push(i - previousStartingNumbers.lastIndexOf(startingNumbers[i]))
    } 
  }
  console.log(`${num}th number: ${startingNumbers[startingNumbers.length-1]}` );
}

// Part 1
//getNthNumber(2020);
getNthNumber(30000000);


