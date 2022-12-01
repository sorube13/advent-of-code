require('../tools.js')();

var input = readFileInput('./inputs/day8.txt');

function readEntry(entry) {
    var dictInput = entry.split(' | ')[0].split(' ');
    var segments = {};
    for(var d of dictInput){
        segments[d] = d.length
    }
    var output = entry.split(' | ')[1].split(' ');
    return {segments, output};
}

function calculateUniqueOutput(input){
    var nbUnique = 0;
    for(var line of input){
        if(line=== ''){
            continue
        }
        console.log(readEntry(line))
        var output = line.split(' | ')[1].split(' ');
        var outputLengths = output.map(o=>o.length).filter(l=>(l===2 || l===4||l===3 || l===7));
        nbUnique+=(outputLengths.length||0);
    }
    return nbUnique
}

function translateSegments(segments){
    var remainingSegments = segments;
    var translation = {};

    // Find '1'
    var one = Object.keys(segments).find(s=>segments[s]===2);
    translation[one] = '1';
    delete remainingSegments[one];
    // Find '4'
    var four = Object.keys(segments).find(s=>segments[s]===4);
    translation[four] = '4';
    delete remainingSegments[four];
    // Find '7'
    var seven = Object.keys(segments).find(s=>segments[s]===3);
    translation[seven] = '7';
    delete remainingSegments[seven];
    // Find '8'
    var eight = Object.keys(segments).find(s=>segments[s]===7);
    translation[eight] = '8';
    delete remainingSegments[eight];

    // Find '6' : '6' does not include '1' and is length 6
    var size6 = Object.keys(remainingSegments).filter(s=>remainingSegments[s]===6);
    for(s of size6) {
        for(o of one) {
            if(s.indexOf(o)===-1){
                six = s;
                break;
            }
        }
    }
    translation[six]='6';
    delete remainingSegments[six];

    // Find '0' : '0' does not include '4' and is length 6
    var size6 = Object.keys(remainingSegments).filter(s=>remainingSegments[s]===6);
    for(s of size6) {
        for(o of four) {
            if(s.indexOf(o)!==-1){
                zero = s;
                break;
            }
        }
    }
    translation[zero]='0';
    delete remainingSegments[zero];
    
    // Find '9' : '9' is length 6
    var nine = Object.keys(remainingSegments).filter(s=>remainingSegments[s]===6)[0];
    translation[nine]='9';
    delete remainingSegments[nine];

    // Find '3' : '3' includes '7'
    loopS:
        for(s of Object.keys(remainingSegments)) {
            loopN:
                for(o of seven) {
                    var counter = 0;
                    if(s.indexOf(o)===-1){
                        continue loopS;
                    }else {
                        three=s;
                        counter++
                        if(counter===seven.length){
                            break loopS;
                        }
                        continue;
                    }

                    
                }
        }
    translation[three]='3';
    delete remainingSegments[three];

    // Find '5' : '5' includes '6'
    for(s of Object.keys(remainingSegments)) {
        if(distance(s, six)===0){
            five=s;
            break;
        }
    }
    translation[five]='5';
    delete remainingSegments[five];
    
    var two = Object.keys(remainingSegments).filter(s=>remainingSegments[s]===5)[0];
    translation[two]='2';
    delete remainingSegments[two];
        
    console.log(translation)
    return translation;
}

function distance(s1,s2) {
    return [...s1].filter(x=>s2.indexOf(x)===-1).length;
}



var sum = 0;
var entry = readEntry(input[0]);
var translation = translateSegments(entry.segments);
var number = '';
for(var o of entry.output){
    console.log('o', o)
    console.log('translation[o]', translation[o])
    number+= translation[o];
}
console.log(number)
sum+= +number;



