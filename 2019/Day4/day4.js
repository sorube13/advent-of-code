var input = '387638-919123';
var size = 6;

function setInputs(input, size) {
    var minInput = input.split('-')[0];
    var maxInput = input.split('-')[1];
    if (minInput.length < size) {
        minInput = '1'.repeat(size);
    }
    if (maxInput.length > size) {
        maxInput = '9'.repeat(size);
    }
    return { minInput, maxInput };
}

function hasDoubleDigits(number) {
    for (i = 0; i < number.length - 1; i++) {
        if (number[i] === number[i + 1]) {
            return true;
        }
    }
    return false;
}

function hasOnlyDoubleDigits(number) {
    for (i = 0; i < number.length - 1; i++) {
        if (number[i] === number[i + 1]) {
            if (i === 0) {
                if (number[i] === number[i + 2]) {
                    continue;
                } else {
                    return true;
                }
            } else if (i === number.length - 2) {
                return number[i] !== number[i - 1];
            }
            if (number[i] !== number[i - 1] && number[i] !== number[i + 2]) {
                return true;
            }
        }
    }
    return false;
}

function hasIncreasedDigits(number) {
    for (i = 0; i < number.length - 1; i++) {
        if (number[i] > number[i + 1]) {
            return false;
        }
    }
    return true;
}

var { minInput, maxInput } = setInputs(input, size);
var counter = 0;
for (number = +minInput; number <= +maxInput; number++) {
    if (hasOnlyDoubleDigits(number.toString()) && hasIncreasedDigits(number.toString())) {
        counter++;
    }
}
console.log(counter);



