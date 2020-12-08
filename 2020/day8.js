const { exception } = require('console');

require('../tools.js')();

var instructionsInput = readFileInput('./inputs/day8.txt');

const Operations = [
  'acc',
  'jmp',
  'nop',
]

class LoopError extends Error {
  constructor( ...params) {
    // Pasa los argumentos restantes (incluidos los específicos del proveedor) al constructor padre
    super(...params)

    // Mantiene un seguimiento adecuado de la pila para el lugar donde se lanzó nuestro error (solo disponible en V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, LoopError)
    }

    this.name = 'LoopError'
    this.date = new Date()
  }
}


class Instruction {
  constructor(input, index) {
    this.operation = this.getOperation(input);
    this.argument = this.getArgument(input);
    this.index = index;
  }

  getOperation(input) {
    let opt = input.split(' ')[0];
    if(Operations.includes(opt)){
      return opt;
    }
    return 'nop';
  }

  getArgument(input) {
    let arg = input.split(' ')[1];
    return arg[0]==='-' ? -arg.slice(1) : +arg.slice(1);
  }

  switchNopJmpOperations(){
    if(this.operation==='nop'){
      this.operation = 'jmp';
    } else if(this.operation==='jmp'){
      this.operation = 'nop';
    }
  }
}

class Program {
  constructor(instructionList) {
    this.instructions = instructionList;
    this.indexOfInstructions = [];
    this.accumulator = 0;
    this.nextInstruction = null;
  }

  readInstruction(instruction){
    let currentIndex = instruction.index;//this.indexOfInstructions[this.indexOfInstructions.length-1];
    switch (instruction.operation) {
      case 'acc':
        this.nextInstruction = this.getNextInstruction(currentIndex, 1);
        this.accumulator += instruction.argument;
        break;
      case 'jmp':
          this.nextInstruction = this.getNextInstruction(currentIndex, instruction.argument);
          break;
      default:
        this.nextInstruction = this.getNextInstruction(currentIndex, 1);
        break;
      }
  }

  getNextInstruction(currentIndex, argument) {
    return this.instructions[+currentIndex + argument] ? this.instructions[+currentIndex + argument] : null
  }

  canReadInstruction(instruction) {
    if(!this.indexOfInstructions.includes(instruction.index)){
      this.indexOfInstructions.push(instruction.index);
      return true;
    }
    throw new LoopError('ERROR - INSTRUCTION READ TWICE');
  }

  run() {
    this.nextInstruction = this.instructions[0];
    do {
      try {
        if(this.canReadInstruction(this.nextInstruction)){
          this.readInstruction(this.nextInstruction); 
        } else {
          this.nextInstruction=null;
        }
      } catch(e) {
        if(e instanceof LoopError) {
          throw e;
        }
      }
    } while(this.nextInstruction !==null)
    return this.accumulator;
  }
}


function buildInstructionList() {
  let instructionList = [];
  for(let idx in instructionsInput){
    instructionList.push(new Instruction(instructionsInput[idx], idx));
  }
  return instructionList;
}


function part1(){
  let program = new Program(buildInstructionList());
  try{
    program.run();
  } catch(e) {
  }
  return program.accumulator;
}
console.log('Part 1 - ', part1())



function part2(){
  // Gets the indexes of all instructions starting with nop or jmp
  let indexOfNopJmp = instructionsInput.map((e, i) => e.startsWith('nop') || e.startsWith('jmp') ? i : '').filter(String);
  // Create a program switching nop and jmp instructions
  for(let idx of indexOfNopJmp) {
    let modifiedInstructions = buildInstructionList();
    modifiedInstructions[idx].switchNopJmpOperations();
    let program = new Program(modifiedInstructions);
    try{
      program.run();
      return program.accumulator;
    } catch(e){
       continue;
    }
  }
}

console.log('Part 2 - ', part2())