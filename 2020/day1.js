require('../tools.js')();

var allNumbers = readFileInput('./inputs/day1.txt');

function checkTwoSum(a, b) {
  return a + b === 2020;
}

function checkThreeSum(a, b, c) {
  return a + b + c === 2020;
}

function findTwoMultiplication() {
  for (i = 0; i < allNumbers.length; i++) {
    for (j = i + 1; j < allNumbers.length; j++)
      if (checkTwoSum(+allNumbers[i], +allNumbers[j])) {
        return allNumbers[i] * allNumbers[j];
      }
  }
}


function findThreeMultiplication() {
  for (i = 0; i < allNumbers.length; i++) {
    for (j = i + 1; j < allNumbers.length; j++) {
      for(k=j+1; k< allNumbers.length;k++){
        if (checkThreeSum(+allNumbers[i], +allNumbers[j], +allNumbers[k])) {
          return allNumbers[i] * allNumbers[j] * allNumbers[k];
        }
      }
    }
      
  }
}

console.log('result day 1-1:', findTwoMultiplication(), '876459');
console.log('result day 1-2:', findThreeMultiplication(), '116168640');
