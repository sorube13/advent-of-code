require('../tools.js')();

var input = readFileInputCommas('./inputs/day7.txt').map(i=>+i);

const median = arr => {
    let middle = Math.floor(arr.length / 2);
      arr = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2;
};

const average = (array) => Math.floor(array.reduce((a,b)=>a+b,0)/array.length);

var medianPosition = median(input);
var averagePosition = average(input);
console.log(averagePosition);
var fuel = [0,0];
for(var pos of input){
    fuel[0] = fuel[0] + Math.abs(medianPosition - pos);
    var n = Math.abs(averagePosition - pos);
    fuel[1] = fuel[1] + (n*(n+1)/2);
    
}

console.log(fuel);