var fs = require("fs");

module.exports = function () {
    this.readFileInput = function (fileInput) {
        var text = fs.readFileSync(fileInput, "utf-8");
        return text.split("\r\n");
    };
    this.readFileInputRegexString = function (fileInput, regex) {
        var text = fs.readFileSync(fileInput, "utf-8");
        return text.split(regex);
    };

    this.readFileInputCommas = function (fileInput) {
        var text = fs.readFileSync(fileInput, "utf-8");
        return text.split(",");
    };

    this.readTextFile = function (fileInput) {
        return fs.readFileSync(fileInput, "utf-8");
    }
};