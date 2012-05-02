// Generated by CoffeeScript 1.3.1
var GetObjectFromServer, NveSend, SendObjectToServer;

NveSend = (function() {

  NveSend.name = 'NveSend';

  function NveSend() {}

  NveSend.prototype.login = function(name, pass, callback) {
    var _this = this;
    this.cridentials = {
      "userName": name,
      "password": pass,
      "createPersistentCookie": true,
      "Expires": "\/Date(" + new Date().getTime() + "-0100)\/"
    };
    return jQuery.ajax({
      type: 'POST',
      url: "http://h-web01.nve.no/test_RegObsServices/Authentication_JSON_AppService.axd/Login",
      data: JSON.stringify(this.cridentials),
      dataType: 'json',
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8"
      }
    }).complete(function(data) {
      if (callback) {
        return callback(data);
      }
    });
  };

  NveSend.prototype.addObsLocation = function(obsLocation, callback) {
    var result;
    result = new Result;
    OData.request({
      requestUri: "http://h-web01.nve.no/test_regobsservices/Odata.svc/ObsLocation",
      method: "POST",
      data: obsLocation
    }, function(data) {
      result.ok = true;
      result.data = data;
      if (callback) {
        return callback(data);
      }
    });
    return result;
  };

  /*	
  	getDangerSign : (callback) ->
  		result = new Result
  		OData.request({
  		requestUri: "http://h-web01.nve.no/test_regobsservices/OData.svc/DangerSignKD",
  		method: "GET",
  		data: ""
  		}, (data) ->
  			result.ok = true
  			result.data = data
  			callback(data) if callback
  		, (error) ->
  			alert("Error occurred in getDangerSign" +error.message)
  		)
  		result
  */


  NveSend.prototype.getObjectFromServer = function(call, callback) {
    var result;
    result = new Result;
    OData.request({
      requestUri: call.url,
      method: "GET",
      data: ""
    }, function(data) {
      result.ok = true;
      result.data = data;
      if (callback) {
        return callback(data);
      }
    }, function(error) {
      return alert("Error occurred in getObjectFromServer" + error.message);
    });
    return result;
  };

  NveSend.prototype.sendObjectToServer = function(obj, callback) {
    var result;
    console.log(obj);
    result = new Result;
    OData.request({
      requestUri: obj.url,
      method: "POST",
      data: obj
    }, function(data) {
      console.log(data);
      result.ok = true;
      result.data = data;
      if (callback) {
        return callback(data);
      }
    }, function(err) {
      return alert("Error occurred in sendObjectToServer" + err.message);
    });
    return result;
  };

  NveSend.prototype.addRegistration = function(registration, callback) {
    var result;
    result = new Result;
    OData.request({
      requestUri: "http://h-web01.nve.no/test_regobsservices/Odata.svc/Registration",
      method: "POST",
      data: registration
    }, function(data) {
      result.ok = true;
      result.data = data;
      if (callback) {
        return callback(data);
      }
    });
    return result;
  };

  NveSend.prototype.loggedInAs = function(callback) {
    var result;
    result = new Result;
    OData.request({
      requestUri: "http://h-web01.nve.no/test_regobsservices/Odata.svc/Observer",
      method: "GET"
    }, function(data) {
      result.ok = true;
      result.data = data.results[0];
      if (callback) {
        return callback(data.results[0]);
      }
    });
    return result;
  };

  return NveSend;

})();

GetObjectFromServer = function(call, callback) {
  var result;
  result = new Result;
  OData.request({
    requestUri: call.url,
    method: "GET",
    data: ""
  }, function(data) {
    result.ok = true;
    result.data = data;
    if (callback) {
      return callback(data);
    }
  }, function(error) {
    console.log(error);
    return alert("Error occurred in ::GetObjectFromServer " + error.message + " " + call.url);
  });
  return result;
};

SendObjectToServer = function(obj, callback) {
  var result;
  result = new Result;
  OData.request({
    requestUri: obj.url,
    method: "POST",
    data: obj
  }, function(data) {
    result.ok = true;
    result.data = data;
    if (callback) {
      return callback(data);
    }
  }, function(err) {
    console.log(err);
    return alert("Error occurred in ::SendObjectToServer " + err.message + " " + obj.url);
  });
  return result;
};
