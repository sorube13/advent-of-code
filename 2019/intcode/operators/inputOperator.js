class InputOperator {
    constructor() {
    }

    execute(memoryManager) {
        console.log("Input instruction")
        console.log(`    Writing to: ${memoryManager.getValueAtAddress(memoryManager.pointer + 1)}`);
        memoryManager.setInputToAddress(memoryManager.getNextValue());
        memoryManager.incrementPointer();
    }


}

module.exports = InputOperator;