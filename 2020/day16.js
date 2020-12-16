require('../tools.js')();

var notes = readFileInputRegex('./inputs/day16.txt', "\r\n\r\n");

class Rule {
  constructor(input){
    this.code=this.getCodeFromInput(input);
    this.validator = this.getValidatorsFromInput(input);
  }

  getCodeFromInput(input){
    return input.split(':')[0].replace(' ', '_').toUpperCase();
  }

  getValidatorsFromInput(input){
    var values = input.split(': ')[1].split(' or ');
    var validator = [];
    for(var value of values) {
      var minmax = value.split('-');
      validator = validator.concat({min: +minmax[0], max: +minmax[1]});
    }
    return validator;
  }

  verifyRule(value){
    for(var validator of this.validator){
      if(validator.max>=value && validator.min<=value){
        return true;
      }
    }
    return false;
  }
}

class Ticket{
  constructor(input, rules){
    this.rules = rules;
    this.invalidFields = new Set();
    this.isValid = true;
    this.values = this.calculateRulesForValue(input);
  }

  calculateRulesForValue(input){
    var ticketValues = input.split(',');
    var values = ticketValues.reduce((agg,curr,idx)=> { agg[curr]={order: idx, rules:[], isValid: false}; return agg;}, {});
    for(var ticketValue of ticketValues) {
      for(var rule of this.rules) {
        if(rule.verifyRule(ticketValue)) {
          values[ticketValue].rules = values[ticketValue].rules.concat(rule.code);
          values[ticketValue].isValid = true;
        }
      }
      if(!values[ticketValue].isValid){
          this.invalidFields.add(ticketValue);
          this.isValid = false;
      }
    }
    return values;
  }
}


function createTickets(){
  var rules = [];
  for(var note of notes[0].split("\r\n")) {
    rules = rules.concat(new Rule(note));
  }
  
  var ticketList = [];
  var ticketNotes = notes[2].split("\r\n").slice(1);
  for(var ticket of ticketNotes) {
    ticketList = ticketList.concat(new Ticket(ticket, rules));
  }
  return ticketList;
}

var ticketList = createTickets();

// Part 1
var tser = 0;
for(var ticket of ticketList) {
  if(!ticket.isValid){
    for (let item of ticket.invalidFields) {
      tser += +item
    }
  }
}
console.log('TSER : ', tser)


// Part 2
var orderRule = {};
var validTickets = ticketList.filter(t=>t.isValid);
for(var ticket of validTickets) {
  var ticketValues = ticket.values;
  for(var ticketKey of Object.keys(ticketValues)) {
    if(orderRule[ticketValues[ticketKey].order]===undefined) {
      orderRule[ticketValues[ticketKey].order] = ticketValues[ticketKey].rules;
    } else {
      for(var rule of orderRule[ticketValues[ticketKey].order]){
        if(!ticketValues[ticketKey].rules.includes(rule)) {
          orderRule[ticketValues[ticketKey].order] = orderRule[ticketValues[ticketKey].order].filter(r=> r!==rule)
        }  
      }
    }
  }
}


while(!checkRules()){
  for(var key of Object.keys(orderRule)){
    if(orderRule[key].length === 1) {
      removeRuleFromOthers(orderRule[key][0], key);
    }
  }
}

function checkRules() {
  for(var value of Object.values(orderRule)){
    if(value.length!==1){
      return false;
    }
  }
  return true;
}

function removeRuleFromOthers(rule, idx) {
  for(var key of Object.keys(orderRule)){
    if(idx!==key){
      orderRule[key] = orderRule[key].filter(r=>r!==rule);
    }
  }
}

var myTicketNotes = notes[1].split("\r\n")[1].split(',');
var departures = 1;
for(var idx in myTicketNotes){
  if(orderRule[idx][0].startsWith('DEPARTURE')){
    departures = departures*+myTicketNotes[idx]
  }
}
console.log('Departures', departures)