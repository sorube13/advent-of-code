require('../tools.js')();

var expressionInput = readTextFile('./inputs/day18.txt');

console.log('Expression', expressionInput)

class Expression{
    constructor(){
    }

    calculate(a, b, operator) {
        switch(operator){
            case '+':
                return this.add(+a,+b);
            case '*':
                return this.multiply(+a,+b);
            default:
                break;
        }
    }

    add(a,b) {
        console.log(a + b)
        return a + b;
    }

    multiply(a,b){
        console.log(a * b)
        return a * b;
    }

    evaluateExpression(input) {
        var expressionInput = input.split(' ');
        var i = 1;
        var result = expressionInput[0];
        while(i<expressionInput.length) {
            console.log('a:', result)
            console.log('b:', expressionInput[i+1])
            console.log('operator: ',expressionInput[i])
            result = this.calculate(result, expressionInput[i+1], expressionInput[i]); 
            i+=2;
        }
    }
}

var expression = new Expression().evaluateExpression('1 + 2 * 3 + 4 * 5 + 6');