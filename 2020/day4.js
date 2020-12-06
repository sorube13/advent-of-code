require('../tools.js')();

var passportsInput = readFileInputRegex('./inputs/day4.txt', "\r\n\r\n");

class Passport {
  constructor(input) {
    let inputObj = this.transformInputToObject(input);
    // (Birth Year)
    this.byr = {value: inputObj['byr'], isRequired: true, valid: ()=> this.validateYear(inputObj['byr'], 1920, 2002)};  
    // (Issue Year)
    this.iyr = {value: inputObj['iyr'], isRequired: true, valid: ()=> this.validateYear(inputObj['iyr'], 2010, 2020)};  
    // (Expiration Year)
    this.eyr = {value: inputObj['eyr'], isRequired: true, valid: ()=> this.validateYear(inputObj['eyr'], 2020, 2030)};  
    // (Height)
    this.hgt = {value: inputObj['hgt'], isRequired: true, valid: ()=> this.validateHeight(inputObj['hgt'])};  
    // (Hair Color)
    this.hcl = {value: inputObj['hcl'], isRequired: true, valid: () => this.validateHairColor(inputObj['hcl'])};  
    // (Eye Color)
    this.ecl = {value: inputObj['ecl'], isRequired: true, valid: ()=> this.validateEyeColor(inputObj['ecl'])};  
    // (Passport ID)
    this.pid = {value: inputObj['pid'], isRequired: true, valid: () => this.validatePasportId(inputObj['pid'])};  
    // (Country ID)
    this.cid = {value: inputObj['cid'], isRequired: false, valid: () => true};  
  }

  validateYear(value, minYear, maxYear) {
    // console.log('validate year', +value>= +minYear && +value<=+maxYear)
    return +value>= +minYear && +value<=+maxYear;
  }
  
  validateEyeColor(value){
    // console.log('validate eye color', value, ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value))
    return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
  }

  validateHairColor(value){
   // console.log('validate hair color', value, value.length === 7, /^#[0-9a-f]{6}/.test(value))
    return value.length === 7 && /^#[0-9a-f]{6}/.test(value);
  }

  validatePasportId(value) {
   // console.log('validate passport', value, value.length,  /^\d+$/.test(value));
    return value.length===9 && /^\d+$/.test(value);
  }

  validateHeight(value){
    //If cm, the number must be at least 150 and at most 193.
    // If in, the number must be at least 59 and at most 76.
    let mesurement = value.slice(-2);
    let height = value.slice(0,value.length -2);
    if(mesurement==='cm'){
      return height>=150 && height<=193;
    } else if(mesurement==='in'){
      return height>=59 && height<=76;
    }
    return false;
  }

  transformInputToObject(input) {
    let inputObj = {};
    input = input.replace(/(\r\n|\n|\r)/gm, " ").split(' ');
    for (let p of input) {
      inputObj[p.split(':')[0]] = p.split(':')[1];
    }
    return inputObj;
  }

  isPassportValid() {
    for(let key of Object.keys(this)) {
      if((this[key].isRequired && !this[key].value) || !this[key].valid()) {
        console.log('Invalid key: ', this, key, this[key].valid())
        return false;
      }
    }
    return true;
  }
  
}

let nbValidPassports = 0;
for(let input of passportsInput) {
  let passport = new Passport(input);
  if(passport.isPassportValid()) {
    nbValidPassports++;
  }
}
console.log(nbValidPassports);