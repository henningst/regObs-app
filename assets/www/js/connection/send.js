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
  result = new Result;
  OData.request({
    requestUri: obj.url,
    method: "POST",
    data: obj
  }, function(data) {
    result.ok = true;
    result.data = data;
    if (callback) return callback(data);
  }, function(err) {
    if (onError) return onError(err);
  });
  return result;
};
