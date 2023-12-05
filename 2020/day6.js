require('../tools.js')();

var customFormInput = readFileInputRegexString('./inputs/day6.txt', "\r\n\r\n");


class CustomForm {
    constructor(input) {
        this.answers = this.buildAnswersFromInput(input);
        this.nbAllAnswers = this.getNbAllAnswers();
        this.nbUniqueAnswers = this.getNbUniqueAnswers();
    }

    buildAnswersFromInput(input) {
        return input.split("\r\n")
    }

    makeUnique(str) {
        return String.prototype.concat(...new Set(str))
      }

    getNbAllAnswers(){
        return this.makeUnique(this.answers.join('')).length;
    }

    getNbUniqueAnswers(){
        let nbResponses = this.answers.length;
        let result = [...this.answers.join('')].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {}); 
        let uniqueAnswers = this.getKeyByValue(result, nbResponses);
        return uniqueAnswers.length;
    }
    
    getKeyByValue(object, value) {
        return Object.keys(object).filter(key => object[key] === value);
    }
}

let nbTotalAnswers = 0;
let nbTotalUniqueAnswers = 0;
for(let input of customFormInput) {
    let customForm = new CustomForm(input);
    nbTotalAnswers += customForm.nbAllAnswers;
    nbTotalUniqueAnswers += customForm.nbUniqueAnswers;
}
console.log('Part 1 - Nb total answers = ', nbTotalAnswers);
console.log('Part 2 - Nb total unique answers = ', nbTotalUniqueAnswers);
