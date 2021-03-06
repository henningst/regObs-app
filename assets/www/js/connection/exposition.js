// Generated by CoffeeScript 1.4.0
var Exposition;

Exposition = (function() {

  function Exposition(string, callbacks) {
    this.callbacks = callbacks;
    if (string.length !== 8) {
      this.expositions = "00000000".split("");
    } else {
      this.expositions = string.split("");
    }
    this.callbacks["*"](this.toHumanString());
  }

  Exposition.prototype.toggle = function(expo) {
    this.change(this.indexFromExpo(expo));
    return this.callCallback(expo);
  };

  Exposition.prototype.indexFromExpo = function(expo) {
    switch (expo) {
      case "N":
        return 0;
      case "NØ":
        return 1;
      case "Ø":
        return 2;
      case "SØ":
        return 3;
      case "S":
        return 4;
      case "SV":
        return 5;
      case "V":
        return 6;
      case "NV":
        return 7;
    }
  };

  Exposition.prototype.indexToExpo = function(index) {
    switch (index) {
      case 0:
        return "N";
      case 1:
        return "NØ";
      case 2:
        return "Ø";
      case 3:
        return "SØ";
      case 4:
        return "S";
      case 5:
        return "SV";
      case 6:
        return "V";
      case 7:
        return "NV";
    }
  };

  Exposition.prototype.change = function(index) {
    if (this.expositions[index] === "1") {
      this.expositions[index] = "0";
    } else {
      this.expositions[index] = "1";
    }
    return this.callbacks["*"](this.toHumanString());
  };

  Exposition.prototype.callCallback = function(expo) {
    if (this.callbacks[expo]) {
      return this.callbacks[expo](this.expositions[this.indexFromExpo(expo)] === "1");
    }
  };

  Exposition.prototype.refresh = function() {
    var _this = this;
    return jQuery.each(["N", "NØ", "Ø", "SØ", "S", "SV", "V", "NV"], function(i, expo) {
      return _this.callCallback(expo);
    });
  };

  Exposition.prototype.toString = function() {
    return this.expositions.join("");
  };

  Exposition.prototype.toHumanString = function() {
    var letters,
      _this = this;
    letters = [];
    jQuery.each(this.expositions, function(i, letter) {
      if (letter === "1") {
        return letters.push(_this.indexToExpo(i));
      }
    });
    return letters.join(",");
  };

  return Exposition;

})();
