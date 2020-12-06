require('../../tools.js')();
const Node = require('./node');
var linesInput = readFileInput('./input.txt');

//var linesInput = ['A)B', 'COM)A', 'B)E', 'B)C', 'B)D'];
function createMap(lines) {
    var lineMap = new Map();
    for (line of lines) {
        parent = line.split(')')[0];
        value = line.split(')')[1];
        if (lineMap.has(parent)) {
            lineMap.set(parent, [...lineMap.get(parent), value]);
        } else {
            lineMap.set(parent, [value])
        }
    }
    return lineMap;
}

function createNode(root, lineMap) {
    if (!lineMap.has(root)) {
        return new Node(root, []);
    }
    var children = [];
    for (child of lineMap.get(root)) {
        children = [...children, createNode(child, lineMap)];
    }
    return new Node(root, children);
}

function getDistance(node, distance = 0) {
    if (node.children.length === 0) {
        return distance;
    }
    var currentDistance = distance;
    for (child of node.children) {
        distance += getDistance(child, currentDistance + 1);
    }
    return distance;
}

var myNode = createNode('COM', createMap(linesInput));
console.log(getDistance(myNode));

//var lines2 = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN'];

//var nodeP2 = createNode('COM', createMap(lines2));

var pathToYou = myNode.getPathToNode('YOU');
var pathToSanta = myNode.getPathToNode('SAN');

console.log('pathToYou: ', pathToYou)
console.log('pathToSanta: ', pathToSanta)
function getMinDistanceBetweenYouAndSanta() {
    for (i = 0; i < Math.min(pathToYou.length, pathToSanta.length); i++) {
        if (pathToYou[i] !== pathToSanta[i]) {
            return pathToYou.length + pathToSanta.length - 2 - 2 * (i)
        }
    }
}

console.log(getMinDistanceBetweenYouAndSanta());