import * as fs from 'fs';

export function readFileInput(fileInput: string):string[] {
  const text = fs.readFileSync(fileInput, 'utf-8');
  return text.split('\r\n');
}

export function readFileInputRegexString(fileInput: string, regex: string):string[] {
  const text = fs.readFileSync(fileInput, 'utf-8');
  return text.split(regex);
}

export function readFileInputRegex(fileInput: string, regex: RegExp):string[] {
  const text = fs.readFileSync(fileInput, 'utf-8');
  return text.split(regex);
}

export function readFileInputCommas(fileInput: string): string[] {
  const text = fs.readFileSync(fileInput, 'utf-8');
  return text.split(',');
}

export function readTextFile(fileInput: string) : string{
  return fs.readFileSync(fileInput, 'utf-8');
}

export function readFileInputAsMatrix(fileInput:string):string[][] {
    return readFileInput(fileInput).map((i) => i.split(''));
}

export function transpose(matrix:string[][]) {
  let [row] = matrix;
  return row.map((value, column) => matrix.map((row) => row[column]));
}




