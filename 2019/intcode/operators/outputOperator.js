class OutputOperator {
    constructor(paramMode) {
        this.paramMode = +paramMode || 0;
    }

    execute(memoryManager) {
        console.log("Output instruction")
        console.log(`    Param mode: ${this.paramMode}`);
        console.log("    Next value in memory: ", memoryManager.getValueAtAddress(memoryManager.pointer + 1));
        if (this.paramMode === 0) {
            console.log(memoryManager.getValueAtAddress(memoryManager.getNextValue()));
        } else {
            console.log(memoryManager.getNextValue())
        }
        memoryManager.incrementPointer();
    }


}

module.exports = OutputOperator;