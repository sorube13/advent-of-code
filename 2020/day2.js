require('../tools.js')();

var allPasswords = readFileInput('./inputs/day2.txt');
//var allPasswords = ['1-3 a: abcde','1-3 b: cdefg', '2-9 c: ccccccccc'];

const count = (str, pattern) => {
  return ((str || '').match(pattern) || []).length
}

function getDataFromString(data) {
  let separationPass = data.split(' ');
  let minTimes = separationPass[0].split('-')[0];
  let maxTimes = separationPass[0].split('-')[1];
  let letter = separationPass[1].split(':')[0];
  let str = separationPass[2];
  return {minTimes, maxTimes, letter, str};

}

function getValidPasswordsMethod1(){
  let validPasswords = 0;
  for(let pass of allPasswords){
    let data = getDataFromString(pass);

    let countStr = count(data.str,  new RegExp(data.letter,"g"));
    if(countStr >=data.minTimes && countStr<=data.maxTimes) {
      validPasswords++;
    }
  }
  return validPasswords;
}

function getValidPasswordsMethod2(){
  let validPasswords = 0;
  for(let pass of allPasswords){
    let data = getDataFromString(pass);
    if((data.str[data.minTimes-1] === data.letter && data.str[data.maxTimes-1]!== data.letter) ||
       (data.str[data.minTimes-1] !== data.letter && data.str[data.maxTimes-1]=== data.letter)) {
      validPasswords++;
    }
  }
  return validPasswords;
}

console.log('result day 2-1:', getValidPasswordsMethod1(), 582);
console.log('result day 2-2:', getValidPasswordsMethod2(), 582);
