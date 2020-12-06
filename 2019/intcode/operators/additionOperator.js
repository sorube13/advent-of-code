class AdditionOperator {
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
        console.log("Addition instruction")
        console.log(`    Param modes: ${this.modeFirstPostition} ${this.modeSecondPosition}`);
        var inputPos1 = memoryManager.getNextValue();
        var inputPos2 = memoryManager.getNextValue();
        var outputPos = memoryManager.getNextValue();
        var value;
        console.log(`First argument`);
        if (this.modeFirstPostition === '0') {
            console.log(`    Position mode. Address ${inputPos1}. Value to be added : ${memoryManager.getValueAtAddress(inputPos1)}`);
            value = (+memoryManager.getValueAtAddress(inputPos1))
        } else {
            console.log(`    Immediate mode. Value to be added: ${inputPos1}`);
            value = +inputPos1
        }
        console.log(`Second argument`);
        if (this.modeSecondPosition === '0') {
            console.log(`    Position mode. Address ${inputPos2}; Value to be added : ${memoryManager.getValueAtAddress(inputPos2)}`);
            value += (+memoryManager.getValueAtAddress(inputPos2));
        } else {
            console.log(`    Immediate mode. Value to be added: ${inputPos2}`);
            value += +inputPos2;
        }
        console.log(`Writing ${value} to position ${outputPos} `);
        memoryManager.setValueAtAddress(outputPos, value);
        memoryManager.incrementPointer();
    }


}

module.exports = AdditionOperator;