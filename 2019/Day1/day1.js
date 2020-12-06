require('../../tools.js')();

var allFuels = readFileInput('./day1_input.txt');

function getFuel(fuel) {
    var currentFuel = Math.floor(fuel / 3) - 2;
    if (currentFuel <= 0) {
        return 0;
    } else {
        return currentFuel + getFuel(currentFuel);
    }
}

function getFuelSergio(fuel) {
    var k = Math.ceil((Math.log10((2 * fuel - 11) / 13)) / Math.log10(3));
    return (2 * fuel - 11 - (2 * fuel / (Math.pow(3, k))) + (11 / Math.pow(3, k)) - 2 * k) / 4;
}

var output1 = 0;
var output2 = 0;
var output3 = 0;
for (fuel of allFuels) {
    output1 += Math.max(Math.floor(fuel / 3) - 2, 0);
    output2 += getFuel(fuel);
    output3 += getFuelSergio(fuel);
}


console.log('result output 1:', output1);
console.log('result output 2:', output2);
console.log('result output 3:', output3);

