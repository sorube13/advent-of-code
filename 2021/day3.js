require('../tools.js')();

var report = readFileInput('./inputs/day3.txt');

class DiagnosticReport {
    constructor(report) {
        this.gamma = '';
        this.epsilon = '';
        this.oxygenGen = '';
        this.co2 = '';
        this.power = 0;
        this.lifeSupport = 0;
        this.report = report;
    }

    readReportPowerConsumption() {
        var sizeReport = this.report.length;
        var sizeLine = this.report[0].length;
        for(var i=0; i<sizeLine; i++){
            var sum = 0;
            for(var j=0; j<sizeReport; j++){
                sum += +this.report[j].charAt(i);
            }
            if(sum>sizeReport/2) {
                this.gamma = this.gamma + '1';
                this.epsilon = this.epsilon + '0';
            } else {
                this.gamma = this.gamma + '0';
                this.epsilon = this.epsilon + '1';
            }
        }
        calculatePower();
    }

    readReportLifeSupport(){
        this.oxygenGen = this.calculateOxygen();
        this.co2 = this.calculateCO2();
        this.calculateLifeSupport();

    }

    calculateOxygen(){
        var sizeLine = this.report[0].length;
        var oldReport = this.report;
        for(var i=0; i<sizeLine; i++) {
            var newReport = [];
            var sizeReport = oldReport.length;
            var sum = 0;
            var bite = '';
            for(var j=0; j<oldReport.length; j++){
                sum += +oldReport[j].charAt(i);
            }
            if(sum>=sizeReport/2) {
                bite = '1';
            } else {
                bite = '0';
            }
            this.oxygenGen = this.oxygenGen + bite;

            for(var j=0; j<oldReport.length; j++){
                if(oldReport[j].charAt(i)===bite) {
                    newReport = newReport.concat(oldReport[j]);
                }
            }
            if(oldReport.length===1){
                return oldReport;
            }
            oldReport = newReport;
        }
        return oldReport;
    }

    calculateCO2(){
        var sizeLine = this.report[0].length;
        var oldReport = this.report;
        for(var i=0; i<sizeLine; i++) {
            var newReport = [];
            var sizeReport = oldReport.length;
            var sum = 0;
            var bite = '';
            for(var j=0; j<oldReport.length; j++){
                sum += +oldReport[j].charAt(i);
            }
            if(sum>=sizeReport/2) {
                bite = '0';
            } else {
                bite = '1';
            }
            this.co2 = this.oxygenGen + bite;

            for(var j=0; j<oldReport.length; j++){
                if(oldReport[j].charAt(i)===bite) {
                    newReport = newReport.concat(oldReport[j]);
                }
            }
            if(oldReport.length===1){
                return oldReport;
            }
            oldReport = newReport;
        }
        return oldReport;
  
    }

    calculatePower(){
        this.power = parseInt(this.gamma, 2)  * parseInt(this.epsilon,2);
    }

    calculateLifeSupport() {
        this.lifeSupport = parseInt(this.oxygenGen, 2)  * parseInt(this.co2,2);
    }

    printPower(){
        console.log('POWER: ', this.power);
    }

    printLifeSupport(){
        console.log('Oxygen', this.oxygenGen, parseInt(this.oxygenGen,2))
        console.log('CO2', this.co2, parseInt(this.co2,2))
        console.log('LIFE SUPPORT: ', this.lifeSupport);
    }




}

var diagReport = new DiagnosticReport(report);
//diagReport.readReportPowerConsumption();
//diagReport.printPower();

diagReport.readReportLifeSupport();
diagReport.printLifeSupport();

