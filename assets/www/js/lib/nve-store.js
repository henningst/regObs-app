var Location, Login, NveStore, Registration, Result;

NveStore = (function() {

  function NveStore(login, callback) {
    var _this = this;
    this.login = login;
    this.loggedIn = false;
    this.cridentials = {
      "userName": this.login.username,
      "password": this.login.password,
      "createPersistentCookie": true,
      "Expires": "\/Date(" + new Date().getTime() + "-0100)\/"
    };
    jQuery.ajax({
      type: 'POST',
      url: "http://h-web01.nve.no/test_RegObsServices/Authentication_JSON_AppService.axd/Login",
      data: JSON.stringify(this.cridentials),
      dataType: 'json',
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8"
      }
    }).complete(function(data) {
    	if(callback != null)
    		callback(data);
    	
      return _this.loggedIn = true;
    });
  }

  NveStore.prototype.isLoggedIn = function() {
    return this.loggedIn;
  };

  NveStore.prototype.addObsLocation = function(obsLocation, callback) {
    var result;
    result = new Result;
    OData.request({
      requestUri: "http://h-web01.nve.no/test_regobsservices/Odata.svc/ObsLocation",
      method: "POST",
      data: obsLocation
    }, function(data) {
      result.ok = true;
      result.data = data;
      if (callback) return callback(data);
    });
    return result;
  };

  NveStore.prototype.addRegistration = function(test, callback) {
    return test;
  };

  NveStore.prototype.loggedInAs = function() {
    var result;
    result = new Result;
    OData.request({
      requestUri: "http://h-web01.nve.no/test_regobsservices/Odata.svc/Observer",
      method: "GET"
    }, function(data) {
      result.ok = true;
      result.data = data.results[0];
      return console.log(data);
    });
    return result;
  };

  return NveStore;

})();

Login = (function() {

  function Login(username, password) {
    this.username = username;
    this.password = password;
  }

  return Login;

})();

Location = (function() {

  function Location(ObsLocationID, UTMZone, UTMEast, UTMNorth) {
    this.ObsLocationID = ObsLocationID;
    this.UTMZone = UTMZone;
    this.UTMEast = UTMEast;
    this.UTMNorth = UTMNorth;
  }

  return Location;

})();

Registration = (function() {

  Registration.prototype.url = "http://h-web01.nve.no/test_regobsservices/Odata.svc/Registration";

  function Registration(location) {
    this.location = location;
  }

  Registration.prototype.id = Registration.id;

  return Registration;

})();

Result = (function() {

  function Result() {
    this.ok = false;
    this.data = null;
  }

  Result.prototype.isOk = function() {
    return this.ok;
  };

  return Result;

})();
