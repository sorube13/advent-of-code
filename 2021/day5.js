require('../tools.js')();

var input = readFileInput('./inputs/day5.txt');

class Point {
    constructor(point, x=0, y=0){
        if(point){
            this.x = +point.split(',')[0];
            this.y = +point.split(',')[1];
        } else{
            this.x = +x || 0;
            this.y = +y || 0;
        }
        
    }
}

class Segment {
    constructor(segment) {
        this.point1 = new Point(segment.split(' -> ')[0]);
        this.point2 = new Point(segment.split(' -> ')[1]);
        this.isHorizontal = this.point1.x === this.point2.x;
        this.isVertical = this.point1.y === this.point2.y;
        this.isDiagonal = Math.abs(this.point1.x-this.point2.x) === Math.abs(this.point1.y-this.point2.y);
        if(!this.isHorizontal) {
            // Line equation y = mx + n
            this.m = (this.point2.y - this.point1.y)/(this.point2.x-this.point1.x);
            this.n = this.point2.y - (this.m*this.point2.x);
        }
        
    }

    isInSegment(point){
        if(this.isHorizontal) {
            var ymin = Math.min(segment.point1.y, segment.point2.y);
            var ymax = Math.max(segment.point1.y, segment.point2.y);
            return this.point1.x === point.x && this.point1.x && ymin<=point.y && ymax>=point.y;
        } else if (this.isDiagonal || this.isVertical){
            return this.m*point.x + this.n === point.y;
        }
        return false;
    }

    isValid(){
        return this.isHorizontal ||this.isVertical || this.isDiagonal;
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
        if(segment.isValid()) {
            var xmin = Math.min(segment.point1.x, segment.point2.x);
            var xmax = Math.max(segment.point1.x, segment.point2.x);
            var ymin = Math.min(segment.point1.y, segment.point2.y);
            var ymax = Math.max(segment.point1.y, segment.point2.y);
            for(var x=xmin; x<=xmax; x++){
                for(var y=ymin; y<=ymax; y++) {
                    var point = new Point(null,x,y)
                    if(segment.isInSegment(point)){
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

var ventMap = new VentMap();

for(var seg of input) {
    var segment = new Segment(seg);
    ventMap.fillMap(segment);
}
//ventMap.printMap()
console.log(ventMap.findDangerousAreas(2));



