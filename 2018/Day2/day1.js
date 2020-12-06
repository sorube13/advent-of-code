require('../../tools.js')();

var allFrequencies = readFileInput('./input.txt');

var currentFreq = 0;
var freqHistory = [currentFreq];
var isTwice = false;
while (isTwice === false) {
    for (freq of allFrequencies) {
        var nb = +freq.slice(1);
        if (freq[0] === '+') {
            currentFreq += nb;
        } else {
            currentFreq -= nb;
        }
        if (freqHistory.includes(currentFreq)) {
            isTwice = true;
            console.log(currentFreq);
            break;

        } else {
            freqHistory.push(currentFreq);
        }
    }
}


console.log('No frequency is repeated');

