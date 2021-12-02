require('../tools.js')();

var allDepths = readFileInput('./inputs/day1.txt');

function findNbIncreases(depths) {
    var nbIncreases = 0;
    if (depths.length <= 1) {
        return 0;
    }
    for(var i=1; i<depths.length; i++){
        if(+depths[i]>+depths[i-1]){
            nbIncreases++;
        } 
    }

    return nbIncreases;
}

function createWindow(depths, wd) {
    var slider = 0;
    var depthsWindows = [];
    do {
        var sum = 0;
        for(var i=slider; i<slider+wd; i++) {
            sum += +depths[i];
        }
        depthsWindows= depthsWindows.concat(+sum);
        slider++;
    } while (depths[slider + wd -1]);
    return depthsWindows;
}

var allDepthsWindow = createWindow(allDepths, 3);
console.log(findNbIncreases(allDepthsWindow));