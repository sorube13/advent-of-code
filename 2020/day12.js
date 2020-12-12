require('../tools.js')();

var coordinateInput = readFileInput('./inputs/day12.txt');

const FORWARD = 'F';
const LEFT = 'L';
const RIGHT = 'R';
const NORTH = 'N';
const SOUTH = 'S';
const WEST = 'W';
const EAST = 'E';

class Navigation {
  constructor(){
    this.coords = {N: 0, E: 0};
    this.direction = EAST;
  }

  moveShip(instruction){
    var direction = instruction[0];
    var arg = +instruction.slice(1);
    console.log('---------- Moving Ship')
    console.log('Direction: ', direction)
    console.log('ARG: ', arg)

    switch (direction) {
      case NORTH:
        this.coords[NORTH] += arg;       
        break;
      case SOUTH:
        this.coords[NORTH] -= arg;       
        break;
      case EAST:
        this.coords[EAST] += arg;       
        break;
      case WEST:
        this.coords[EAST] -= arg;       
        break;
      case FORWARD:
        this.advanceForward(+arg);
        break;
      case RIGHT:
      case LEFT:
          this.changeDirection(direction, arg);
          break;    
      default:
        break;
    }

    console.log(this);
  }

  advanceForward(arg) {
    if(this.direction===NORTH || this.direction===EAST) {
      this.coords[this.direction]+=arg;
    } else if(this.direction===SOUTH) {
      this.coords[NORTH] -= arg;
    } else if(this.direction === WEST){
      this.coords[EAST] -= arg;
    }
  }

  changeDirection(dir, degrees){
    var compass = [NORTH, EAST, SOUTH, WEST];
    var shift = degrees/90;
    if(dir === RIGHT){
      this.direction = compass[(compass.indexOf(this.direction) + shift) % compass.length]; 
    } else if(dir === LEFT){
      compass.reverse();
      this.direction = compass[(compass.indexOf(this.direction) + shift) % compass.length]; 
    }
  }

  getManhattanDistance(){
    return Math.abs(this.coords.N) + Math.abs(this.coords.E);
  }


}

var nav = new Navigation();
console.log(nav)
for(var coord of coordinateInput) {
  nav.moveShip(coord);
}
console.log('Part 1 - NAV', nav);
console.log('Part 1 - DISTANCE', nav.getManhattanDistance());
