require('../../tools.js')();
const MemoryManager = require('../intcode/memoryManager');
const OperationFactory = require('../intcode/operationFactory');

function runProgram(input) {
    //var programOriginal = [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99]
    var programOriginal = readFileInputCommas('./input.txt');
    var memoryManager = new MemoryManager(programOriginal, input);
    while (memoryManager.getCurrentValue() != '99') {
        console.log("Operating on address: ", memoryManager.pointer);
        console.log("Value on current address: ", memoryManager.getCurrentValue());
        var operator = OperationFactory.getOperation("" + memoryManager.getCurrentValue());
        operator.execute(memoryManager);
        console.log('---------------------------')
    }
    return memoryManager.getValueAtAddress(0);
}
//runProgram(1);
runProgram(5);
