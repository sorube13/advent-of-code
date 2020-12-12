require('../tools.js')();

var xmasData = readFileInput('./inputs/day9.txt');
// Convert tu int array
xmasData = xmasData.map(x=>+x);


var preamble = 25;

function findSumOfNumber(arr, n) {
  return arr.some((item, i) => arr.slice(i+1).includes(n-item))
}

function findInvalidNumber(){
  for(let i = preamble; i<xmasData.length - 1; i++) {
    let preambleArray = xmasData.slice(i-preamble, i);
    let dataChecked = xmasData[i]
    if(!findSumOfNumber(preambleArray, dataChecked)) {
      return dataChecked;
    }
  }
}
var invalidNumber = findInvalidNumber();
console.log('Part 1 - ', invalidNumber)

function findIndexSetOfInvalidNumberSum() {
  var sum = xmasData[0]; // The first number is initialized
  var indexList = [xmasData[0]]; // The first index is added

  for(var i = 1; i<xmasData.length; i++) {
    sum = sum + xmasData[i];
    while(sum > invalidNumber) {
      sum -= indexList.shift();
    }
    indexList.push(xmasData[i]);
    if(sum == invalidNumber) {
      return indexList
    }
  }
}

function encryptionWeakness(arr){
  return Math.max(...arr) + Math.min(...arr);
}
console.log('Part 2 - ', encryptionWeakness(findIndexSetOfInvalidNumberSum()))