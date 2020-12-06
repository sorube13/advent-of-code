require('../../tools.js')();
const MemoryManager = require('../intcode/memoryManager');
const OperationFactory = require('../intcode/operationFactory');


//var programOriginal = ['2', '4', '2', '0', '99'];


//var programOriginal = readFileInputCommas('./input.txt');

function runProgram(noun, verb) {
    var programOriginal = readFileInputCommas('./input.txt');
    var memoryManager = new MemoryManager(programOriginal);
    memoryManager.setValueAtAddress(1, noun);
    memoryManager.setValueAtAddress(2, verb);
    while (memoryManager.getCurrentValue() !== '99') {
        var operator = OperationFactory.getOperation(memoryManager.getCurrentValue());
        operator.execute(memoryManager);
    }
    return memoryManager.getValueAtAddress(0);
}
console.log(runProgram(12, 2));

function part2(targetValue) {
    var n = 0;
    var v = 0;
    for (; n < 100; n++) {
        for (v = 0; v < 100; v++) {
            if (+(runProgram(n, v)) === targetValue) {
                return (100 * n + v);
            }
        }
    }
}

//console.log(part2(19690720));




