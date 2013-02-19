// Generated by CoffeeScript 1.4.0
var E, ErrorHandler;

ErrorHandler = (function() {

  function ErrorHandler() {}

  ErrorHandler.prototype.errorCode = function() {
    return Math.floor(Math.random() * 0x10000).toString(16);
  };

  ErrorHandler.prototype.handleErrorSilent = function(exception, error_code) {
    if (!error_code) {
      error_code = this.errorCode();
    }
    if (exception.request !== void 0) {
      delete exception.request;
    }
    if (exception.response !== void 0) {
      delete exception.response;
    }
    try {
      console.log("pp: feil catched " + JSON.stringify(exception), exception);
      return Bugsense.notify({
        error: exception,
        code: error_code
      });
    } catch (e) {
      return console.log("pp: feil in error handling " + e);
    }
  };

  ErrorHandler.prototype.handleError = function(exception) {
    var error_code;
    error_code = this.errorCode();
    this.handleErrorSilent(exception, error_code);
    return main.showDialogWithMessage("Feilen rapporteres til utviklingsteamet. Hvis du ønsker å bidra med ytligere informasjon, noter koden \"" + error_code + "\" og send en mail.", "En feil har oppstått");
  };

  ErrorHandler.prototype.hookInto = function() {
    return jQuery("[onclick]").each(function(index, obj) {
      var funksjon;
      try {
        if (obj.onclick) {
          funksjon = obj.onclick;
          return obj.onclick = E(funksjon);
        }
      } catch (e) {
        return console.log("pp: hook into failed " + e);
      }
    });
  };

  return ErrorHandler;

})();

window.customErrorHandler = new ErrorHandler();

window.onerror = function(error) {
  var ignoreError;
  ignoreError = function(e) {
    if (e.srcElement && e.srcElement.src && /googleapis\.com/.test(e.srcElement.src)) {
      console.log("IGNORE ERROR from srcElement with src: " + e.srcElement.src);
      return true;
    } else {
      return false;
    }
  };
  if (!ignoreError(error)) {
    return window.customErrorHandler.handleError(error);
  }
};

E = function(funksjon) {
  return function() {
    try {
      return funksjon();
    } catch (e) {
      console.log("E catched " + (JSON.stringify(e)));
      return window.customErrorHandler.handleError(e);
    }
  };
};
