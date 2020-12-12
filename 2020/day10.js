require('../tools.js')();

var adapters = readFileInput('./inputs/day10.txt');
// Convert tu int array
adapters = adapters.map(x=>+x).sort((a,b)=>a-b);
adapters.unshift(0);
adapters.push(adapters[adapters.length-1] + 3);

function part1() {
  var oneDiff = 0;
  var threeDiff = 0;
  
  adapters.forEach((a,idx, self) => {
    var difference = self[idx+1] ? self[idx+1] - a : 0;
    if(difference === 1){
      oneDiff++;
    } else if(difference ===3){
      threeDiff++;
    }
  });
  return oneDiff * threeDiff;
}

console.log('Part 1 - ', part1());

function updateWindow(arr, elmt){
  if(arr.length===3){
    arr.pop();
  }
  arr.unshift(elmt);
}

function part2(){
  var reversedAdapters = adapters.reverse();
  var weightArray =[1, 0];
  var windowArray = [reversedAdapters[1] , reversedAdapters[0]];
  var node;
  for(var i=2;i<reversedAdapters.length; i++){
    node = reversedAdapters[i];
    var currentWeight = 0;
    for(var wIdx in windowArray){
      if(windowArray[wIdx] - node <=3){
        currentWeight+=weightArray[wIdx];
      }
    }
    updateWindow(windowArray, node);
    updateWindow(weightArray, currentWeight);
  }
  return weightArray[0];
}

console.log('Part 2 - ', part2());


