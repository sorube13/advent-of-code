class JumpIfTrueOperator {
    constructor(paramMode) {
        if (paramMode.length > 1) {
            this.modeFirstPostition = paramMode[1] || '0';
            this.modeSecondPosition = paramMode[0] || '0';
        } else {
            this.modeFirstPostition = paramMode[0] || '0';
            this.modeSecondPosition = '0';
        }
    }

    execute(memoryManager) {
        console.log("Jump if true instruction")
        console.log(`    Param modes: ${this.modeFirstPostition} ${this.modeSecondPosition}`);
        var currentPointer = memoryManager.getPointer();
        var inputPos1 = memoryManager.getNextValue();
        var inputPos2 = memoryManager.getNextValue();
        var value1;
        var value2;
        console.log(`First argument`);
        if (this.modeFirstPostition === '0') {
            console.log(`    Position mode. Address ${inputPos1}. Value 1 : ${memoryManager.getValueAtAddress(inputPos1)}`);
            value1 = (+memoryManager.getValueAtAddress(inputPos1))
        } else {
            console.log(`    Immediate mode. Value 1: ${inputPos1}`);
            value1 = +inputPos1
        }
        console.log(`Second argument`);
        if (this.modeSecondPosition === '0') {
            console.log(`    Position mode. Address ${inputPos2}; Value 2 : ${memoryManager.getValueAtAddress(inputPos2)}`);
            value2 = (+memoryManager.getValueAtAddress(inputPos2));
        } else {
            console.log(`    Immediate mode. Value 2: ${inputPos2}`);
            value2 = +inputPos2;
        }
        if (value1 !== 0) {
            console.log(`Setting pointer to ${value2} `);
            memoryManager.setPointer(value2);
        } else {
            console.log(`Not incrementing pointer `);
            memoryManager.incrementPointer();
        }
    }

}

module.exports = JumpIfTrueOperator;