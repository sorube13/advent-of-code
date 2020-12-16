require('../tools.js')();

var programInput = readFileInput('./inputs/day14.txt');

/**
 * Abstract Class Program.
 *
 * @class Program
 */
class Program {

  constructor() {
    if (this.constructor == Program) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.memory = {};
    this.mask='';
  }

  getMaskFromInput(maskInput) {
    this.mask = maskInput.split(' = ')[1];
  }

  writeValue(instruction) {
    this.memory[instruction.memory] = instruction.value;
  }

  getSumMemory() {
    return Object.values(this.memory).reduce((a, b) => +a + +b)
  }
}

class ProgramV1 extends Program {
  /**
   * memory in base 10
   * value in base 2
   * @param input 
   */
  getMemoryAddressAndValue(input) {
    // input = "mem[memoryAddress] = value"
    var inputParts = input.split(' = ');
    var value =(inputParts[1]>>>0).toString(2).padStart(36, '0')
    var memory = inputParts[0].split(/[\[\]]/)[1];
    return {memory, value};
  }

  applyMaskToValue(value){
    var newValue = '';
    for(var i=0; i<this.mask.length; i++) {
      if(this.mask[i] === 'X'){
        newValue += value[i];
      } else  {
        newValue += this.mask[i];
      }
    }
    return newValue;
  }

  readLine(input) {
    if(input.startsWith('mask')){
      this.getMaskFromInput(input);
      return;
    }
    if(input.startsWith('mem')) {
      var instruction =this.getMemoryAddressAndValue(input)
      instruction.value = this.applyMaskToValue(instruction.value);
      instruction.value = parseInt(instruction.value, 2)
      this.writeValue(instruction);
    } 
  }



}

class ProgramV2 extends Program {

  /**
   * memory in Base 2
   * value in base 10
   * @param {*} input 
   */
  getMemoryAddressAndValue(input) {
    // input = "mem[memoryAddress] = value"
    var inputParts = input.split(' = ');
    var value = inputParts[1]
    var memory = (inputParts[0].split(/[\[\]]/)[1]>>>0).toString(2).padStart(36, '0');
    return {memory, value};
  }


  applyMaskToValue(value){
    var newValue = '';
    for(var i=0; i<this.mask.length; i++) {
      if(this.mask[i] === '0'){
        newValue += value[i];
      } else  {
        newValue += this.mask[i];
      }
    }
    return newValue;
  }

  readLine(input) {
    if(input.startsWith('mask')){
      this.getMaskFromInput(input);
      return;
    }
    if(input.startsWith('mem')) {
      var instruction = this.getMemoryAddressAndValue(input);
      var addressList = this.getAddressList(instruction.memory);
      for(var address of addressList) {
        var memory = parseInt(address, 2)
        this.writeValue({memory, value: instruction.value});
      }
    } 
  }

  getAddressList(address) {
    var maskedAddress = this.applyMaskToValue(address);
    return this.buildAddressList(maskedAddress);
  }

  buildAddressList(address) {
    var addressList = [''];
    for(var str of address){
      if(str !== 'X') {
        addressList = addressList.map(a=>a+(str));
      } else {
        var copyAddress = [...addressList];
        addressList = addressList.map(a=>a+('1'));
        copyAddress = copyAddress.map(a=>a+('0'));
        addressList = addressList.concat(copyAddress);
      }
    }
    return addressList;
  }
}

// Part 1
/* var program = new ProgramV1();
for(var input of programInput){
  program.readLine(input);
}
console.log('Program: ', program.getSumMemory()); */

var program2 = new ProgramV2();
for(var input of programInput) {
  program2.readLine(input);
}
console.log('Program: ', program2.getSumMemory()); 