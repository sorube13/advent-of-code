require('../../tools.js')();
const Layer = require('./layer');
var pixels = readTextFile('./input.txt');
var wide = 25;
var tall = 6;

var sizeLayer = wide * tall;

var layers = [];
for (i = 0; i < pixels.length; i = i + sizeLayer) {
    var layer = new Layer(pixels.slice(i, i + sizeLayer));
    layers.push(layer);
}

var minNumeroZeros = Number.MAX_VALUE;
var index = 0;
for (i = 0; i < layers.length; i++) {
    var layerNbZeros = layers[i].getNumberOfZeros()
    if (layerNbZeros < minNumeroZeros) {
        minNumeroZeros = layerNbZeros;
        index = i;
    }
}
console.log('Result part 1: ', layers[index].getPassword());

var image = new Layer('2'.repeat(sizeLayer));

for (i = 0; i < sizeLayer; i++) {
    for (layer of layers) {
        if (layer.getPosition(i) !== '2') {
            image.setPosition(i, layer.getPosition(i));
            break;
        }
    }
}
image.printLayer(wide);
