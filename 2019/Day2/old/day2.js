require('../../tools.js')();

var programOriginal = readFileInputCommas('./input.txt');

function runProgram(noun, verb) {
    program = programOriginal;
    program[1] = noun;
    program[2] = verb;
    var i = 0;
    while (program[i] !== '99') {
        var opcode = program[i];
        var input1 = +program[i + 1];
        var input2 = +program[i + 2];
        var output = +program[i + 3];
        if (opcode === '1') {
            program[output] = +program[input1] + (+program[input2]);
        } else if (opcode === '2') {
            program[output] = +program[input1] * program[input2];
        }
        if (program[output] === 19690720) {
            noun = input1;
            verb = input2;
        }
        i = i + 4;
    }
}
runProgram(12, 2);
console.log('program[0] = ', program[0]);



