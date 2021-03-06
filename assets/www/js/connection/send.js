// Generated by CoffeeScript 1.4.0
var GetObjectFromServer, LoggedInAs, Login, Logout, SendObjectToServer;

Login = function(name, pass, callback, onError) {
  this.cridentials = {
    "userName": name,
    "password": pass,
    "createPersistentCookie": true,
    "Expires": "\/Date(" + new Date().getTime() + "-0100)\/"
  };
  return jQuery.ajax({
    type: 'POST',
    url: "" + SERVER_LOGIN_URL + "Login",
    data: JSON.stringify(this.cridentials),
    dataType: 'json',
    headers: {
      Accept: "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8"
    },
    success: function(data) {
      var content;
      console.log("logged in " + JSON.stringify(data));
      content = data;
      if (content.d === true) {
        if (callback) {
          return callback(data);
        }
      } else {
        if (onError) {
          return onError(data);
        }
      }
    },
    error: function(data) {
      var k, v;
      console.log("login failed");
      for (k in data) {
        v = data[k];
        console.log(k + " -> " + v);
      }
      if (onError) {
        return onError(data);
      }
    }
  });
};

Logout = function(callback, onError) {
  return jQuery.ajax({
    type: 'POST',
    url: "" + SERVER_LOGIN_URL + "Logout",
    data: "",
    dataType: 'json',
    headers: {
      Accept: "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8"
    },
    success: function(data) {
      if (callback) {
        return callback(data);
      }
    },
    error: function(data) {
      if (onError) {
        return onError(data);
      }
    }
  });
};

LoggedInAs = function(callback) {
  var result;
  result = new Result;
  OData.request({
    requestUri: "" + SERVER_URL + "Observer",
    method: "GET"
  }, function(data) {
    result.ok = true;
    result.data = data.results[0];
    console.log("pp: logged in as " + JSON.stringify(data.results[0]));
    if (callback) {
      return callback(data.results[0]);
    }
  }, function(error) {
    return console.log("how am i failed" + error);
  });
  return result;
};

GetObjectFromServer = function(call, callback, onError) {
  var result;
  console.log("getting " + call.url);
  result = new Result;
  OData.request({
    requestUri: call.url,
    method: "GET",
    headers: {
      "DataServiceVersion": "2.0"
    },
    data: ""
  }, function(data) {
    result.ok = true;
    result.data = data;
    if (callback) {
      return callback(data);
    }
  }, function(error) {
    if (onError) {
      return onError(error);
    }
  });
  return result;
};

SendObjectToServer = function(obj, callback, onError) {
  var result;
  console.log("about to send : " + JSON.stringify(obj));
  console.log("sending - " + obj.url());
  result = new Result;
  OData.request({
    requestUri: obj.url(),
    method: "POST",
    headers: {
      "DataServiceVersion": "2.0"
    },
    data: obj
  }, function(data) {
    console.log("got data back");
    result.ok = true;
    result.data = data;
    if (callback) {
      return callback(data);
    }
  }, function(err) {
    var k, v, _ref, _ref1;
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
    _ref1 = err.request;
    for (k in _ref1) {
      v = _ref1[k];
      console.log(k + " -> " + v);
    }
    if (onError) {
      return onError(err);
    }
  });
  console.log("fired");
  return result;
};
