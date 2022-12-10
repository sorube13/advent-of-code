import { readFileInput } from '../tools-ts';

let input: string[] = readFileInput('./inputs/day10.txt');

class Program {
    x:number = 1;
    cycle:number=0;
    signalStrength = 0;
    crt = [...Array(239)].map(a=>'.');

    constructor(){
        this.writeCrt();
    }

    INSTRUCTIONS = {
        'ADDX': {code: 'addx', nbCycles: 2},
        'NOOP': {code: 'noop', nbCycles : 0}
    }

    viewExecution = [20,60, 100, 140, 180, 220];

    nextCycle(){
        this.cycle++;
        this.writeCrt();
        if(this.viewExecution.includes(this.cycle)){
            //this.printInfo();
            this.signalStrength =this.signalStrength + this.cycle*this.x;
        }
    }

    add(value:number):void{
        let nbCycles = this.INSTRUCTIONS.ADDX.nbCycles;
        while(nbCycles>0){
            this.nextCycle();
            nbCycles--;
        }
        this.x += value;
    }

    executeLine(instruction:string, value:number) : void{
        this.printInfo();
       // this.writeCrt();
        switch(instruction) {
            case this.INSTRUCTIONS.ADDX.code:
                this.add(value);
                break;
            case this.INSTRUCTIONS.NOOP.code:
                this.nextCycle();    
                break;
            default:
                break;
        }
    }

    printInfo():void {
        console.log('Value is', {cycle: this.cycle, value: this.x}, 'Signal strength = ', this.cycle*this.x);
    }

    shouldWrite(){
        let crtPointer = this.cycle % 40;
        return crtPointer === this.x || crtPointer === this.x-1 || crtPointer=== this.x+1;
    }
    
    writeCrt(){
        if(this.shouldWrite()){
            this.crt[this.cycle]='#';
        } 
    }

    showCrt(){
        console.log(this.crt.slice(0,39).join(''));
        console.log(this.crt.slice(40,79).join(''));
        console.log(this.crt.slice(80,119).join(''));
        console.log(this.crt.slice(120,159).join(''));
        console.log(this.crt.slice(160,199).join(''));
        console.log(this.crt.slice(200,239).join(''));
    }
}

let p = new Program();
for (let instruction of input){
    let inst=instruction.split(' ')[0];
    let value=+instruction.split(' ')[1];
    p.executeLine(inst, value);
}
console.log('Part 1', p.signalStrength)
console.log('Part 2')
p.showCrt();