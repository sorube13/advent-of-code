class Layer {
    constructor(pixels) {
        this.pixels = pixels;
    }

    getNumberOfZeros() {
        var nbZeros = 0;
        // console.log(this.pixels);
        for (var p of this.pixels) {
            if (p === '0') {
                nbZeros++;
            }
        }
        return nbZeros;
    }

    getPassword() {
        var nbOnes = 0;
        var nbTwos = 0;
        for (var p of this.pixels) {
            if (p === '1') {
                nbOnes++;
            } else if (p === '2') {
                nbTwos++;
            }
        }
        return nbOnes * nbTwos;
    }

    getPosition(pos) {
        return this.pixels[pos];
    }

    setPosition(pos, value) {
        this.pixels = this.pixels.substr(0, pos) + value + this.pixels.substr(pos + 1);
    }

    printLayer(width) {
        for (var i = 0, charsLength = this.pixels.length; i < charsLength; i += width) {
            var line = this.pixels.substring(i, i + width)
            console.log(line.replace(/0/g, ' ').replace(/1/g, '\u2580'));
        }
    }
}



module.exports = Layer;