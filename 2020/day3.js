require('../tools.js')();

var mapInput = readFileInput('./inputs/day3.txt');

const TREE = '#';
const SQUARE = '.'; 
const SLEIGH = 'O';

class Map {  


  constructor(map) {
    this.map = [];
    this.nbTreesEncountered = 0;
    for(let m of map){
      this.map.push(Array.from(m));
    }
  }

  static isOpenSquare(str) {
    return SQUARE === str; 
  }

  checkIsTree(x, y) {
    if(this.getPointOnMap(x, y) === TREE) {
      this.nbTreesEncountered++;
    } else{
      this.map[x],[y] = SLEIGH;
    }
  }

  getPointOnMap(x, y){
    this.shouldforestGrow(y);
    return this.map[x][y];
  }

  shouldforestGrow(y) {
    const dimensions = [ this.map.length, this.map[0].length ];
    if(y>=dimensions[1]){
      this.repeatMap();
    }
  }

  getColumn(col) {
    var column = [];
    for(var i=0; i<this.map.length; i++){
      column.push(this.map[i][col]);
    }
    return column;
  }

  repeatMap(){
    let nbColumns = this.map[0].length; 
    for(let i = 0; i< nbColumns; i++) {
      this.map.forEach(line => {
        line[nbColumns + i] = line[i];
      });
    }
  }

  goDownSlope(x,y) {
    const dimensions = [ this.map.length, this.map[0].length ];
    let x0 = 0;
    let y0 = 0;
    do {
      this.checkIsTree(x0,y0);
      //console.table(dimensions)
      //console.table([x0, y0])
      x0 += x;
      y0 += y;
    } while(x0<this.map.length);
    return this.nbTreesEncountered;
  }
}


let myMap = new Map(mapInput);
let result = new Map(mapInput).goDownSlope(1, 1);
result *= new Map(mapInput).goDownSlope(1, 3);
result *= new Map(mapInput).goDownSlope(1, 5);
result *= new Map(mapInput).goDownSlope(1, 7);
result *= new Map(mapInput).goDownSlope(2, 1);
console.table(result);
//console.table( myMap.map);
