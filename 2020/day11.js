require('../tools.js')();

var mapInput = readFileInput('./inputs/day11.txt');

const EMPTY = 'L';
const FLOOR = '.'; 
const OCCUPIED = '#';
let NB_VISIBLE_OCCUPIED_SEATS=5;

class SeatingPlan {  
  constructor(input) {
    this.plan = [];
    for(let m of input){
      this.plan.push(Array.from(m));
    }
    this.nbOccupiedSeats = 0;
    this.dimensions = [this.plan.length, this.plan[0].length];
  }

  getSeat(x,y){
    if(x>=0 && x<this.dimensions[0] && y>=0 && y<this.dimensions[1]) {
      return this.plan[x][y];
    }
    return null;
  }

  getNextSeatState(x, y) {
    var currentSeat = this.plan[x][y]
    var nbOfAdjecentOccupiedSeats = this.getNbVisibleOccupiedSeats(x,y); //this.getNbAdjacentOccupiedSeats(x,y);
    if(EMPTY===currentSeat && nbOfAdjecentOccupiedSeats===0) {
      this.nbOccupiedSeats++;
      return OCCUPIED;
    } else if(OCCUPIED===currentSeat && nbOfAdjecentOccupiedSeats>=NB_VISIBLE_OCCUPIED_SEATS){
      return EMPTY;
    }
    if(currentSeat===OCCUPIED){
      this.nbOccupiedSeats++;
    }
    return currentSeat;
  }

  getNbAdjacentOccupiedSeats(x,y) {
    var nbOfAdjecentOccupiedSeats = 0;
    var possibleCoordinates = this.getPossibleCoordinates(x,y);
    for(var coord of possibleCoordinates){
      var seat = this.getSeat(coord[0], coord[1]);
      if(seat && OCCUPIED===seat){
        nbOfAdjecentOccupiedSeats++;
      }
    }
    return nbOfAdjecentOccupiedSeats;
  }

  getNbVisibleOccupiedSeats(x,y){
    var seatsEyeSight = this.getSeatsInEyesight(x,y);
    return seatsEyeSight.filter(s=>s===OCCUPIED).length;
  }

  getPossibleCoordinates(x,y) {
    return [[x, y-1], [x, y+1], [x+1, y], [x-1, y], [x+1,y+1],[x+1, y-1], [x-1, y+1],[x-1, y-1]];
  }

  getSeatsInEyesight(x,y) {
    var up = [...this.plan.map((a)=>a[y]).slice(0,x)].reverse().find(s=>s!==FLOOR);
    var down = [...this.plan.map((a)=>a[y]).slice(x+1)].find(s=>s!==FLOOR);
    var left = [...this.plan[x].slice(0,y)].reverse().find(s=>s!==FLOOR);
    var right = [...this.plan[x].slice(y+1)].find(s=>s!==FLOOR);

    var dur = this.buildDiagonalUpRight(x,y).find(s=>s!==FLOOR);
    var ddr = this.buildDiagonalDownRight(x,y).find(s=>s!==FLOOR);
    var ddl = this.buildDiagonalDownLeft(x,y).find(s=>s!==FLOOR);
    var dul = this.buildDiagonalUpLeft(x,y).find(s=>s!==FLOOR);
    return [up, down, left, right, dur, ddr, ddl, dul];
  }

  buildDiagonalDownRight(x,y) {
    var x0 = 1;
    var y0 = 1;
    var diagonal = [];
    while(x+x0<this.dimensions[0] && y+y0<this.dimensions[1]){
      diagonal.push(this.getSeat(x+x0, y+y0));
      x0++;
      y0++;
    }
    return diagonal;
  }

  buildDiagonalUpLeft(x,y) {
    var x0 = 1;
    var y0 = 1;
    var diagonal = [];
    while(x-x0>=0 && y-y0>=0){
      diagonal.push(this.getSeat(x-x0, y-y0));
      x0++;
      y0++;
    }
    return diagonal;
  }

  buildDiagonalUpRight(x,y) {
    var x0 = 1;
    var y0 = 1;
    var diagonal = [];
    while(x-x0>=0 && y+y0<this.dimensions[1]){
      diagonal.push(this.getSeat(x-x0, y+y0));
      x0++;
      y0++;
    }
    return diagonal;
  }

  buildDiagonalDownLeft(x,y) {
    var x0 = 1;
    var y0 = 1;
    var diagonal = [];
    while(x+x0<this.dimensions[0] && y-y0>=0){
      diagonal.push(this.getSeat(x+x0, y-y0));
      x0++;
      y0++;
    }
    return diagonal;
  }

  // Create arrays with vision from point in both directions
  // Get first element non "." of array if exists

  runRound(){
    this.nbOccupiedSeats = 0;
    // Creates a new array of same dimensions than plan but filled with 0
    var newPlan =[...Array(this.dimensions[0])].map(x => Array(this.dimensions[1]).fill(0));
    for(var x=0;x<this.dimensions[0];x++){
      for(var y=0;y<this.dimensions[1];y++){
        newPlan[x][y] = this.getNextSeatState(x,y);
      }
    }
    if(this.isSameArray(this.plan, newPlan)) {
      return true;
    }
    this.plan = newPlan;
    return false;
  }

  isSameArray(array1, array2) {
    return JSON.stringify(array1) === JSON.stringify(array2);
  }

  run(){
    var counter = 0;
    var isSamePlan = false;
    while(!isSamePlan) {
      isSamePlan = this.runRound();
    }
    return this.nbOccupiedSeats;
  }
}



var myMap = new SeatingPlan(mapInput);
console.log('Part 2 - ', myMap.run())
