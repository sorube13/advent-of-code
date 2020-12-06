require('../../tools.js')();

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getMDistance(origin = new Point(0, 0)) {
        return Math.abs(this.x - origin.x) + Math.abs(this.y - origin.y);
    }

    isNotOrigin() {
        return this.x && this.x !== 0 && this.y && this.y !== 0;
    }

    static getClosestPoint(points) {
        var min = points[0];
        for (i = 1; i < points.length; i++) {
            min = points[i].getMDistance() < min.getMDistance() ? points[i] : min;
        }
        return min;
    }
}

class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    isHorizontal() {
        return this.p1.y === this.p2.y;
    }

    isPointBetweenXPoints(p) {
        return p.x >= Math.min(this.p1.x, this.p2.x) &&
            p.x <= Math.max(this.p1.x, this.p2.x);
    }

    isPointBetweenYPoints(p) {
        return p.y >= Math.min(this.p1.y, this.p2.y) &&
            p.y <= Math.max(this.p1.y, this.p2.y);
    }

    isPointInLine(p) {
        if (!this.isHorizontal()) {
            return p.x === this.p1.x && this.isPointBetweenYPoints(p);
        } else {
            return p.y === this.p1.y && this.isPointBetweenXPoints(p);
        }
    }

    getLineIntersection(line) {
        if (this.isHorizontal() && !line.isHorizontal()) {
            return new Point(line.p1.x, this.p1.y);
        } else if (!this.isHorizontal() && line.isHorizontal()) {
            return new Point(this.p1.x, line.p1.y);
        } else {
            return null;
        }
    }
}

function movePoint(mov, lastPoint) {
    var direction = mov[0];
    var units = +mov.slice(1);
    var x = lastPoint.x;
    var y = lastPoint.y;
    switch (direction) {
        case 'R':
            x += units;
            break;
        case 'L':
            x -= units;
            break;
        case 'U':
            y += units;
            break;
        case 'D':
            y -= units;
            break;
        default:
            break;
    }
    return new Point(x, y);
}

function readPointsCircuit(circuitInput) {
    var circuitPoints = [];
    circuitPoints.push(new Point(0, 0));
    for (mov of circuitInput.split(',')) {
        var lastPoint = circuitPoints[circuitPoints.length - 1];
        circuitPoints.push(movePoint(mov, lastPoint));
    }
    return circuitPoints;
}

function readLinesFromPoints(circuitPoints) {
    var circuitLines = [];
    for (i = 0; i < circuitPoints.length - 1; i++) {
        circuitLines.push(new Line(circuitPoints[i], circuitPoints[i + 1]));
    }
    return circuitLines;
}

function getIntersectionPoints(circuit1, circuit2) {
    var intersectionPoints = [];
    for (c1 of circuit1) {
        for (c2 of circuit2) {
            var intersectionPoint = c1.getLineIntersection(c2);
            if (intersectionPoint &&
                c1.isPointInLine(intersectionPoint) &&
                c2.isPointInLine(intersectionPoint) &&
                intersectionPoint.isNotOrigin()) {
                intersectionPoints.push(intersectionPoint);
            }
        }
    }
    return intersectionPoints;
}

var lines = readFileInput('./input.txt');
/* var circuit1 = readLinesFromPoints(readPointsCircuit('U2,L2,D4,R5'));
var circuit2 = readLinesFromPoints(readPointsCircuit('R3,D3')); */
var circuit1 = readLinesFromPoints(readPointsCircuit(lines[0]));
var circuit2 = readLinesFromPoints(readPointsCircuit(lines[1]));

var intersectionPoints = getIntersectionPoints(circuit1, circuit2);

var myPoint = Point.getClosestPoint(intersectionPoints);
console.log(myPoint);
console.log(myPoint.getMDistance());





