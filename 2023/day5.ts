import { readFileInputRegex } from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day5.txt');
const re = new RegExp(/\n[a-z,-]+ map:/g);
const readInput = readFileInputRegex(input, re).map(ri=>ri.trim());

class Seed {
    seedId:number;
    soilId:number;
    fertilizerId:number;
    waterId:number;
    lightId:number;
    tempId:number;
    humidityId:number;
    locationId:number;

    constructor(seedId:number) {
        this.seedId=seedId;
        this.soilId=0;
        this.fertilizerId=0;
        this.waterId=0;
        this.lightId=0;
        this.tempId=0;
        this.humidityId=0;
        this.locationId=0;
    }

    print() {
        console.log('Seed ', this.seedId,
            ' soil ', this.soilId,
            ' fertilizer ', this.fertilizerId,
            ' water ', this.waterId,
            ' light ', this.lightId,
            ' temperature ', this.tempId,
            ' humidity ', this.humidityId,
            ' localisation ', this.locationId)
    }
}
class GardenMapping {
    name:string;
    sourceMin:number;
    sourceMax:number;
    destinationMin:number;
    destinationMax:number;

    constructor(name:string, line:string) {
        this.name=name;
        let numbers:number[] = line.split(' ').map(l=>+l);
        let range = numbers[2]-1;
        this.sourceMin= numbers[1];
        this.sourceMax = this.sourceMin+range;
        this.destinationMin=numbers[0];
        this.destinationMax = this.destinationMin+range;
    }

    isInSource(id:number) {
        return this.sourceMin<=id && this.sourceMax>=id;
    }

    getMappingDestination(id:number) {
        let diff = id - this.sourceMin;
        return this.destinationMin + diff ;
    }
}

//seed-to-soil mapping
const seedToSoilMapping = readInput[1].split('\r\n').map(s => new GardenMapping('seedToSoilMapping',s));
// soil-to-fertilizer mapping
const soilToFertilizerMapping = readInput[2].split('\r\n').map(s => new GardenMapping('soilToFertilizerMapping', s));
// fertilizer-to-water mapping
const fertilizerToWaterMapping = readInput[3].split('\r\n').map(s => new GardenMapping('fertilizerToWaterMapping', s));
// water-to-light mapping
const waterToLightMapping = readInput[4].split('\r\n').map(s => new GardenMapping('waterToLightMapping', s));
// light-to-temperature mapping
const lightToTemperatureMapping = readInput[5].split('\r\n').map(s => new GardenMapping('lightToTemperatureMapping', s));
// temperature-to-humidity mapping
const temperatureToHumidityMapping = readInput[6].split('\r\n').map(s => new GardenMapping('temperatureToHumidityMapping', s));
// humidity-to-location mapping
const humidityToLocationMapping = readInput[7].split('\r\n').map(s => new GardenMapping('humidityToLocationMapping', s));


function findMappingPromise(origin:number, mappingList: GardenMapping[]):Promise<number> {
    return new Promise(function (resolve,reject) {
        if(origin==0) return resolve(0);
        for(let gardenMap of mappingList) {
            if(gardenMap.isInSource(origin)) {
                return resolve(gardenMap.getMappingDestination(origin));
            }
        }
    } )
}

function findMapping(origin:number, mappingList: GardenMapping[]):number {
    if(origin==0) return 0;
    for(let gardenMap of mappingList) {
        if(gardenMap.isInSource(origin)) {
            return gardenMap.getMappingDestination(origin);
        }
    }
    return origin;
}

function buildSeed(seed:Seed) {
    seed.soilId = findMapping(seed.seedId, seedToSoilMapping);
    seed.fertilizerId = findMapping(seed.soilId, soilToFertilizerMapping);
    seed.waterId = findMapping(seed.fertilizerId, fertilizerToWaterMapping);
    seed.lightId = findMapping(seed.waterId, waterToLightMapping);
    seed.tempId = findMapping(seed.lightId, lightToTemperatureMapping);
    seed.humidityId = findMapping(seed.tempId, temperatureToHumidityMapping);
    seed.locationId = findMapping(seed.humidityId, humidityToLocationMapping);
}


function partOne(){
    const seeds = readInput[0].split(': ')[1].split(' ').map(s=>new Seed(+s));

    for(let seed of seeds ){
        buildSeed(seed);
        //seed.print();
    }

    let orderedSeeds = seeds.sort((s1,s2) => s1.locationId - s2.locationId);
    console.log('Part 1 : ', orderedSeeds[0].locationId);
}

function partTwo() {
    const seedsInput = readInput[0].split(': ')[1].split(' ').map(s=>+s);
    let seeds:Seed[] = [];
    for(let i=0; i<seedsInput.length; i+2) {
        let idx = seedsInput[i];
        for(let j=0; j<seedsInput[i+1]; j++) {
            seeds = seeds.concat(new Seed(idx+j));
        }
    }

    for(let seed of seeds ){
        buildSeed(seed);
        //seed.print();
    }

    let orderedSeeds = seeds.sort((s1,s2) => s1.locationId - s2.locationId);
    console.log('Part 2 : ', orderedSeeds[0].locationId);
}

partOne() // 282277027
partTwo()