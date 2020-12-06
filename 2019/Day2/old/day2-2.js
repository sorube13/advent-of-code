require('../../tools.js')();

var programOriginal = readFileInputCommas('./input.txt');
var targetValue = 19690720;

function runProgram(noun, verb) {
    var program = readFileInputCommas('./input.txt');
    //console.log(program);
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
        i = i + 4;
    }
    return program[0];
}

var n = 0;
var v = 0;
for (; n < 100; n++) {
    for (v = 0; v < 100; v++) {
        if (+(runProgram(n, v)) === targetValue) {
            console.log('n=', n, ' v=', v);
            console.log('result: ', 100 * n + v);
            return;
        }
    }
}
