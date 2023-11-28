"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tools_ts_1 = require("../tools-ts");
const datastream = (0, tools_ts_1.readTextFile)('./inputs/day6.txt');
const chunk = 14;
for (let i = chunk; i < datastream.length; i++) {
    const currentDatastream = datastream.slice(i - chunk, i);
    if (!checkDuplicates(currentDatastream)) {
        console.log('Index:', i);
        break;
    }
}
/**
 * Function to check if string has multiple characters duplicated
 * @param data
 * @returns true if duplicated characters exists, false otherwise
 */
function checkDuplicates(data) {
    for (let d of data) {
        var re = new RegExp(d, 'g');
        if ((data.match(re) || []).length > 1) {
            return true;
        }
    }
    return false;
}
