import { readTextFile } from '../tools-ts';

const datastream: string = readTextFile('./inputs/day6.txt');

const chunk:number = 14;

for(let i=chunk; i<datastream.length; i++) {
    const currentDatastream = datastream.slice(i-chunk,i);
    if(!checkDuplicates(currentDatastream)){
        console.log('Index:', i)
        break;
    }

}

/**
 * Function to check if string has multiple characters duplicated
 * @param data 
 * @returns true if duplicated characters exists, false otherwise
 */
function checkDuplicates(data:string):boolean {
    for(let d of data){
        var re = new RegExp(d, 'g');
        if((data.match(re) || []).length>1){
            return true;
        }
    }
    return false;
}