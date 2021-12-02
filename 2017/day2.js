require('../tools.js')();

var numberList = readFileInput('./inputs/day2.txt');

// Part 1
var checksum = 0;
for(var num of numberList) {
    nums = num.split(' ');
    checksum += Math.max(...nums) - Math.min(...nums);
}
console.log('Checksum', checksum)

// Part 2
var divisionChecksum = 0;
for(var num of numberList) {
    nums = num.split(' ');
    for(var n of nums){
        var div = nums.find(num=>num%n===0 && num!==n);
        if(div){
            divisionChecksum += div/n;
            break;
        }
    }
}
console.log('Division checksum', divisionChecksum)