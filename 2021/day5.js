require('../tools.js')();

var input = readFileInput('./inputs/day5.txt');

class Segment {
    constructor(segment) {
        var point1 = segment.split(' -> ')[0];
        var point2 = segment.split(' -> ')[1];
        this.x1 = point1.split(',')[0];
        this.x2 = point2.split(',')[0];
        this.y1 = point1.split(',')[1];
        this.y2 = point2.split(',')[1];
        this.isStraight = this.x1 === this.x2 || this.y1 === this.y2;
        this.isDiagonal = Math.abs(this.x2-this.x1) === Math.abs(this.y2-this.y1);
        this.isValid = this.isStraight || this.isDiagonal;
    }

    getMaxX() {
        return Math.max(this.x1, this.x2);
    }

    getMaxY() {
        return Math.max(this.y1, this.y2);
    }

    isInSegment(x,y){
        if(this.isStraight) {
            return this.x1>=x && this.x2<=x && this.y1>=y && this.y2<=y;
        } else if (this.isDiagonal){
            var m = (this.y2-this.y1)/(this.x2-this.x1);
            return (this.y2-y)/(this.x2-x) === m;
        }
        return false;
    }
}

class VentMap {
    constructor(x=1000,y=1000){
        this.xmax=x;
        this.ymax = y;
        this.map =this.buildMap() ;
    }

    buildMap(){
        return Array.from({length: this.ymax}).map(()=>Array.from({length:this.xmax}).map(()=>0));
    }

    fillMap(segment) {
        if(segment.isValid) {
            var xmin = Math.min(segment.x1, segment.x2);
            var xmax = Math.max(segment.x1, segment.x2);
            var ymin = Math.min(segment.y1, segment.y2);
            var ymax = Math.max(segment.y1, segment.y2);
            for(var x=xmin; x<=xmax; x++){
                for(var y=ymin; y<=ymax; y++) {
                    if(segment.isInSegment(x, y)){
                        this.map[y][x]++; 
                    }                }
            }
        }
    }

    findDangerousAreas(maxPoints){
        var nbDangerousAreas = 0;
        for(var y=0; y<this.ymax; y++) {
            for(var x=0; x<this.xmax; x++){
                if(this.map[y][x]>=maxPoints) {
                    nbDangerousAreas++;
                }
            }
        }
        return nbDangerousAreas;
    }

    printMap() {
        console.table(this.map)
    }

}

var ventMap = new VentMap(10,10);

for(var seg of input) {
    var segment = new Segment(seg);
    ventMap.fillMap(segment);
}
ventMap.printMap()
console.log(ventMap.findDangerousAreas(2));



