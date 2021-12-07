require('../tools.js')();

var input = readFileInputCommas('./inputs/day6.txt').map(i=>+i);

var oldFish = input;

var daysToObserve = 256;

while(daysToObserve>0){
    var newFish = [];
    var fishToAdd = [];
    daysToObserve--;

    for(var fish of oldFish){
        if(fish===0) {
            newFish.push(6);
            fishToAdd.push(8);
        } else {
            newFish.push(fish-1);
        }
    }
    oldFish = newFish.concat(fishToAdd);
}

console.log(oldFish.length);
