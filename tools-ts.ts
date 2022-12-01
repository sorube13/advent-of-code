import * as fs from 'fs';

export function readFileInput(fileInput: string) {
  var text = fs.readFileSync(fileInput, 'utf-8');
  return text.split('\r\n');
}

export function readFileInputRegex(fileInput: string, regex: string) {
  var text = fs.readFileSync(fileInput, 'utf-8');
  return text.split(regex);
}

export function readFileInputCommas(fileInput: string) {
  var text = fs.readFileSync(fileInput, 'utf-8');
  return text.split(',');
}

export function readTextFile(fileInput: string) {
  return fs.readFileSync(fileInput, 'utf-8');
}
