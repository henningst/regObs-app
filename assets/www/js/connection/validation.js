var NonEmpty, Selected, Validation, super_validation;

Validation = (function() {

  function Validation() {}

  Validation.prototype.registerValidation = function(button, rules) {
    var allElements,
      _this = this;
    this.button = button;
    this.rules = rules;
    allElements = this._fieldElements();
    jQuery.each(allElements, function(i, e) {
      return jQuery(e).change(function() {
        return _this.validate();
      });
    });
    return this.validate();
  };

  Validation.prototype.validate = function() {
    var status;
    status = this._validateAllRules();
    jQuery(this.button).attr('disabled', !status);
    if (!status) {
      jQuery(this.button).fadeTo(0, .5);
    } else {
      jQuery(this.button).fadeTo(0, 1);
    }
    return console.log("disable button: " + !status);
  };

  Validation.prototype._fieldElements = function() {
    var elements, rule, _i, _len, _ref;
    elements = [];
    _ref = this.rules;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rule = _ref[_i];
      elements.push(rule.element);
    }
    return elements;
  };

  Validation.prototype._validateAllRules = function() {
    var allRulesValidated, rule, _i, _len, _ref;
    allRulesValidated = true;
    _ref = this.rules;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rule = _ref[_i];
      allRulesValidated = allRulesValidated && rule.isValidated();
    }
    return allRulesValidated;
  };

  return Validation;

})();

NonEmpty = (function() {

  function NonEmpty(element) {
    this.element = element;
  }

  NonEmpty.prototype.isValidated = function() {
    var allElementsValidated;
    allElementsValidated = true;
    jQuery.each(this.element, function(index, e) {
      var thisElement;
      thisElement = jQuery(e).val() && jQuery(e).val().length > 0;
      return allElementsValidated = allElementsValidated && thisElement;
    });
    return allElementsValidated;
  };

  return NonEmpty;

})();

Selected = (function() {

  function Selected(element) {
    this.element = element;
  }

  Selected.prototype.isValidated = function() {
    var allElementsValidated;
    allElementsValidated = true;
    jQuery.each(this.element, function(index, e) {
      var thisElement;
      thisElement = jQuery(e).val() && jQuery(e).val() > 0;
      return allElementsValidated = allElementsValidated && thisElement;
    });
    return allElementsValidated;
  };

  return Selected;

})();

super_validation = new Validation();
