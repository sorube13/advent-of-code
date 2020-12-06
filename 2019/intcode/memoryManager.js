class MemoryManager {
    constructor(memory, input = 0) {
        this.pointer = 0;
        this.memory = memory;
        this.input = +input;
    }

    getValueAtAddress(position) {
        return this.memory[+position];
    }

    setValueAtAddress(position, value) {
        this.memory[+position] = +value;
    }

    incrementPointer(nbPositions = 1) {
        this.pointer += +nbPositions;
    }
    getCurrentValue() {
        return this.getValueAtAddress(this.pointer);
    }

    setNextValue(value) {
        this.incrementPointer();
        this.memory[this.pointer] = +value;
    }

    setInputToAddress(address) {
        this.setValueAtAddress(+address, this.input);
    }

    getNextValue() {
        this.incrementPointer()
        return this.getCurrentValue();
    }

    setPointer(value) {
        this.pointer = +value;
    }

    getPointer() {
        return this.pointer;
    }

}

module.exports = MemoryManager;