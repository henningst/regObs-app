var NonEmpty, Validation, super_validation;

Validation = (function() {

  function Validation() {}

  Validation.prototype.registerValidation = function(fields, button, rules) {
    var _this = this;
    this.fields = fields;
    this.button = button;
    this.rules = rules;
    return jQuery(this.fields).change(function() {
      return _this.validate();
    });
  };

  Validation.prototype.validate = function() {
    var status;
    status = this._validateAllRules();
    jQuery(this.button).attr('disabled', !status);
    return console.log("validation status " + !status);
  };

  Validation.prototype._validateAllRules = function() {
    var allIsTrue, rule, _i, _len, _ref;
    allIsTrue = true;
    _ref = this.rules;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      rule = _ref[_i];
      allIsTrue = allIsTrue && rule.isValidated();
    }
    console.log("all rules are " + allIsTrue);
    return allIsTrue;
  };

  return Validation;

})();

NonEmpty = (function() {

  function NonEmpty(element) {
    this.element = element;
  }

  NonEmpty.prototype.isValidated = function() {
    var allIsTrue;
    allIsTrue = true;
    jQuery.each(this.element, function(index, e) {
      var thisElement;
      thisElement = jQuery(e).val().length > 0;
      console.log("this element " + thisElement);
      return allIsTrue = allIsTrue && thisElement;
    });
    return allIsTrue;
  };

  return NonEmpty;

})();

super_validation = new Validation();
