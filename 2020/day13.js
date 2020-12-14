const { time } = require('console');

require('../tools.js')();

var busInput = readFileInput('./inputs/day13.txt');

var earliestTimestamp = busInput[0];
var busIds = busInput[1].split(',');

// Part 1
var nextBus = busIds.filter(b=>b!=='x').map(b=> Math.ceil(earliestTimestamp/b) * b);
var minTime = Math.min(...nextBus);
console.log('Part 1 - ', (minTime - earliestTimestamp) * busIds.filter(b=>b!=='x')[nextBus.indexOf(minTime)])

// Part 2
function findTimestamp() {
  var mapTimestamp = [];
  busIds.forEach((b,idx) => {
    if(b!=='x') {
      mapTimestamp.push({value: +b, offset: idx});
    }
  });
  var timestamp = mapTimestamp[0].value;
  var increment = mapTimestamp[0].value;
  for(var i=1; i<mapTimestamp.length;i++) {
    while((timestamp + mapTimestamp[i].offset) % mapTimestamp[i].value !==0){
      timestamp += increment;
    }
    increment = increment*mapTimestamp[i].value;
  }
  
  console.log(timestamp)
}




console.log('Part 2 - ', findTimestamp())


