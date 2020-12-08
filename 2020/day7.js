require('../tools.js')();

var ruleInputList = readFileInput('./inputs/day7.txt');

class Rule {
    constructor(input) {
        this.color = this.getColorFromInput(input);
        this.bags = this.getBagListFromInput(input);
    }

    getColorFromInput(input){
        return input.split(' bags contain ')[0];
    }
    
    getBagListFromInput(input) {
        let predicate = input.split(' bags contain ')[1];
        let bags = {};
        if('no other bags.' !== predicate) {
            for(let content of predicate.split(', ')){
                let splitContent = content.split(' ');
                bags[splitContent.slice(1, splitContent.length - 1).join(' ')] = +splitContent[0];
            }
        }
        return bags;
    }

    hasBagColor(colorSet){
        for(let color of colorSet){
            if(this.bags[color]){
                return true;
            }
        }
        return false;
    }
}

/**
 * Finds the values from a tuple given list of keys (set)
 * adds value to set
 */
function addValuesFromTuppleToSet(set, tuples){
    let toAdd = [];
    for(let s of set){
        if(tuples[s]){
            toAdd.push(...tuples[s]);
        }
    }
    toAdd.forEach(item => set.add(item));
}
function part1() {
    let myColor = 'shiny gold';
    // Variable holding the tuple of the inversed tree R=>{W,Y} becomes (W,R) (Y,R)
    let tupleColors = {};
    // Set of colors containing my bag
    let setColors = new Set();
    setColors.add(myColor);
    // Creates rule and builds tuples
    for(let ruleInput of ruleInputList){
        let rule = new Rule(ruleInput);
        Object.keys(rule.bags).forEach(key => {
            tupleColors[key] = (tupleColors[key] || []).concat(rule.color);
        });
    }   

    // Adds bag colors to set
    let initialSetSize, finalSetSize;
    do {
        initialSetSize = setColors.size;
        addValuesFromTuppleToSet(setColors, tupleColors);
        finalSetSize = setColors.size;

    } while(initialSetSize !== finalSetSize)

    return setColors.size - 1;
}

let ruleList = [];
function part2(){
    /**
     * Create tuples (SG, [Y: 2, W: 3]), (Y, [B:4])
     * counter = 0
     * while find tuples with key (have children)
     * find values from key and add previous nb * nb current value
     * ex : counter = 0 => counter += 1(1 SG) * 2 (2 Y) => counter += 1(1 SG) * 3 (3W)
     * counter += 2 (2 Y) * 4 (4 B)
     */
    for(let ruleInput of ruleInputList){
        let rule = new Rule(ruleInput);
        ruleList.push(rule);
    }   
    let counter = calculateNbBags('shiny gold', 1);
    return counter;
}

function calculateNbBags(color, nbBags){
    let currentRule = ruleList.find(rule=>rule.color === color);
    let bags = currentRule.bags;
    if(Object.keys(bags).length ===0){
        return nbBags;
    }
    let currentCounter = 1;
    Object.keys(bags).forEach(bagColor => {
        currentCounter +=  calculateNbBags(bagColor, bags[bagColor]);
    });
    return nbBags * currentCounter;
}

console.log('Part 1 - ', part1())
console.log('Part 2 - ', part2() -1 )



