class EqualsOperator {
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
        console.log("Less than instruction")
        console.log(`    Param modes: ${this.modeFirstPostition} ${this.modeSecondPosition}`);
        var inputPos1 = memoryManager.getNextValue();
        var inputPos2 = memoryManager.getNextValue();
        var outputPos = memoryManager.getNextValue();
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
        console.log(`Writing ${+(value1 === value2)} to position ${outputPos} `);
        memoryManager.setValueAtAddress(outputPos, (+(value1 === value2)));
        memoryManager.incrementPointer();

    }

}

module.exports = EqualsOperator;