require('../tools.js')();

var input = readFileInputCommas('./inputs/day6.txt').map(i=>+i);

var daysToObserve = 256;
/* 
var oldFish = input;
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
} */

var fish = {};
for(var i=0; i<=8; i++){
    fish[i]=input.filter(x=>x==i).length;
}
while(daysToObserve>0) {
    daysToObserve--;
    var newFish = 0;
    for(var f=0; f<9;f++) {
        if(fish[f]>0){
            if(f===0) {
                newFish=fish[0];
                fish[f]=0;
            } else {
                fish[f-1] = fish[f];
                fish[f]=0;
            }
        } 
    }
    fish[6]+=newFish;
    fish[8]+=newFish;
}
var nbFish = Object.values(fish).reduce((a,b)=>a+b,0);
console.log(nbFish);
