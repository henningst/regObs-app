var GetObjectFromServer, LoggedInAs, Login, Logout, NveSend, SendObjectToServer;

NveSend = (function() {

  function NveSend() {}

  return NveSend;

})();

Login = function(name, pass, callback, onError) {
  this.cridentials = {
    "userName": name,
    "password": pass,
    "createPersistentCookie": true,
    "Expires": "\/Date(" + new Date().getTime() + "-0100)\/"
  };
  return jQuery.ajax({
    type: 'POST',
    url: "http://h-web01.nve.no/stage_RegObsServices/Authentication_JSON_AppService.axd/Login",
    data: JSON.stringify(this.cridentials),
    dataType: 'json',
    headers: {
      Accept: "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8"
    },
    success: function(data) {
      if (callback) return callback(data);
    },
    error: function(data) {
      if (onError) return onError(data);
    }
  });
};

Logout = function(callback, onError) {
  return jQuery.ajax({
    type: 'POST',
    url: "http://h-web01.nve.no/stage_RegObsServices/Authentication_JSON_AppService.axd/Logout",
    data: "",
    dataType: 'json',
    headers: {
      Accept: "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8"
    },
    success: function(data) {
      if (callback) return callback(data);
    },
    error: function(data) {
      if (onError) return onError(data);
    }
  });
};

LoggedInAs = function(callback) {
  var result;
  result = new Result;
  OData.request({
    requestUri: "http://h-web01.nve.no/stage_regobsservices/Odata.svc/Observer",
    method: "GET"
  }, function(data) {
    result.ok = true;
    result.data = data.results[0];
    if (callback) return callback(data.results[0]);
  });
  return result;
};

GetObjectFromServer = function(call, callback, onError) {
  var result;
  result = new Result;
  OData.request({
    requestUri: call.url,
    method: "GET",
    data: ""
  }, function(data) {
    result.ok = true;
    result.data = data;
    if (callback) return callback(data);
  }, function(error) {
    if (onError) return onError(error);
  });
  return result;
};

SendObjectToServer = function(obj, callback, onError) {
  var result;
  console.log("sending --- " + obj.url);
  result = new Result;
  console.log("about to send");
  OData.request({
    requestUri: obj.url,
    method: "POST",
    data: obj
  }, function(data) {
    console.log("got data back");
    result.ok = true;
    result.data = data;
    if (callback) return callback(data);
  }, function(err) {
    var k, v, _ref, _ref2;
    console.log("error " + err.message);
    for (k in err) {
      v = err[k];
      console.log(k + " -> " + v);
    }
    console.log("response " + err.response);
    _ref = err.response;
    for (k in _ref) {
      v = _ref[k];
      console.log(k + " -> " + v);
    }
    console.log("request " + err.request);
    _ref2 = err.request;
    for (k in _ref2) {
      v = _ref2[k];
      console.log(k + " -> " + v);
    }
    if (onError) return onError(err);
  });
  console.log("fired");
  return result;
};
