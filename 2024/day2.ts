import {readFileInput} from '../tools-ts';

const input:string = require('path').resolve(__dirname, './inputs/day2.txt');
const reportInput = readFileInput(input);

let reports:number[][] = [];
for(let ri of reportInput) {
    reports = reports.concat([ri.split(' ').map(Number)]);
}

function checkReportSafe(report:number[]):boolean {
    if(report.length<2){
        return false;
    }
    const increasing = report[0] < report[1];
    for(let i=0;i<report.length-1; i++){
        let diff = report[i+1]-report[i];
        if(increasing){
            if (diff>3 || diff<1){
                return false;
            }
        } else { // decreasing
            if(diff>-1 || diff<-3){
                return false;
            }
        }
    }
    return true;
}

function checkReportSafeDampener(report:number[]) {
    if(checkReportSafe(report)){
        return true;
    }
    for(let i=0;i<report.length;i++) {
        let reportCopy = [...report];
        delete reportCopy[i];
        if(checkReportSafe(reportCopy.filter(Number))) {
            return true;
        }
    }
    return false;
}


// Part 1
console.log('Number of safe reports: ',reports.map(checkReportSafe).filter(Boolean).length);
// Part 2
console.log('Number of safe reports with Dampener: ',reports.map(checkReportSafeDampener).filter(Boolean).length);



