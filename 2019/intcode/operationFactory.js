const AdditionOperator = require('./operators/additionOperator');
const MultiplicationOperator = require('./operators/multiplicationOperator');
const InputOperator = require('./operators/inputOperator');
const OutputOperator = require('./operators/outputOperator');
const JumpIfTrueOperator = require('./operators/jumpIfTrueOperator');
const JumpIfFalseOperator = require('./operators/jumpIfFalseOperator');
const LessThanOperator = require('./operators/lessThanOperator');
const EqualsOperator = require('./operators/equalsOperator');

function _getOpCode(operator) {
    return +operator.slice(-2);
}

function _getParamMode(operator) {
    return operator.slice(-4, -2);
}

class OperationFactory {

    static getOperation(operator) {
        var opCode = +_getOpCode(operator);
        var paramMode = _getParamMode(operator);
        if (opCode === 1) {
            return new AdditionOperator(paramMode);
        } else if (opCode === 2) {
            return new MultiplicationOperator(paramMode);
        } else if (opCode === 3) {
            return new InputOperator();
        } else if (opCode === 4) {
            return new OutputOperator(paramMode);
        } else if (opCode === 5) {
            return new JumpIfTrueOperator(paramMode)
        } else if (opCode === 6) {
            return new JumpIfFalseOperator(paramMode);
        } else if (opCode === 7) {
            return new LessThanOperator(paramMode);
        } else if (opCode === 8) {
            return new EqualsOperator(paramMode);
        }
        console.log('unknown operator:', operator);
        return null;
    }

}
module.exports = OperationFactory;