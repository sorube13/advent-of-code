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
    this.waypoint = {N: 1, E:10};
  }

  callAction(instruction){
    var direction = instruction[0];
    var arg = +instruction.slice(1);

    switch (direction) {
      case NORTH:
        this.waypoint[NORTH] += arg;       
        break;
      case SOUTH:
        this.waypoint[NORTH] -= arg;       
        break;
      case EAST:
        this.waypoint[EAST] += arg;       
        break;
      case WEST:
        this.waypoint[EAST] -= arg;       
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
  }

  advanceForward(arg) {
    this.coords[NORTH] += this.waypoint[NORTH] * arg;
    this.coords[EAST] += this.waypoint[EAST] * arg;
  }

  changeDirection(dir, degrees){
    var shift = degrees/90;
    if(dir === RIGHT){
      for(var i = 1; i<=shift; i++) {
        var oldWaypoint = {...this.waypoint}
        this.waypoint[NORTH] = -oldWaypoint[EAST];
        this.waypoint[EAST] = oldWaypoint[NORTH];
      }
    } else if(dir === LEFT){
      for(var i = 1; i<=shift; i++) {
        var oldWaypoint = {...this.waypoint}
        this.waypoint[NORTH] = oldWaypoint[EAST];
        this.waypoint[EAST] = -oldWaypoint[NORTH];
      }
    }
  }

  getManhattanDistance(){
    return Math.abs(this.coords.N) + Math.abs(this.coords.E);
  }


}

var nav = new Navigation();
console.log(nav)
for(var coord of coordinateInput) {
  nav.callAction(coord);
}
console.log('Part 1 - NAV', nav);
console.log('Part 1 - DISTANCE', nav.getManhattanDistance());
