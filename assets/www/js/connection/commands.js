// Generated by CoffeeScript 1.3.3
var ErrorHandlingCommand, ObserversCompCommand, ObserversGroupsCommand, SendInPictureCommand,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ErrorHandlingCommand = (function() {

  function ErrorHandlingCommand() {}

  ErrorHandlingCommand.prototype.fail = function(err, data) {
    console.log("pp: error handling command");
    console.log(err);
    return console.log("error handling command " + JSON.stringify(data));
  };

  return ErrorHandlingCommand;

})();

SendInPictureCommand = (function() {

  function SendInPictureCommand(picture) {
    this.picture = picture;
    this.gotFile = __bind(this.gotFile, this);

    this.gotFileEntry = __bind(this.gotFileEntry, this);

    this.gotFS = __bind(this.gotFS, this);

    console.log("createing send in picture command");
  }

  SendInPictureCommand.prototype.send = function(callback) {
    var prefix;
    this.callback = callback;
    console.log("pp: callback is " + this.callback);
    console.log("pp: sending picture " + JSON.stringify(this.picture.PictureImage));
    if (device.platform === "android") {
      prefix = "file://";
    } else {
      prefix = "";
    }
    return window.resolveLocalFileSystemURI(prefix + this.picture.PictureImage, this.gotFileEntry, this.fail);
  };

  SendInPictureCommand.prototype.gotFS = function(fileSystem) {
    var url;
    console.log("got file system");
    url = this.picture.PictureImage;
    console.log("getting file " + url);
    return fileSystem.root.getFile(url, {}, this.gotFileEntry, this.fail);
  };

  SendInPictureCommand.prototype.gotFileEntry = function(fileEntry) {
    console.log("got file entry");
    return fileEntry.file(this.gotFile, this.fail);
  };

  SendInPictureCommand.prototype.gotFile = function(file) {
    var reader,
      _this = this;
    console.log("got file");
    reader = new FileReader();
    reader.onloadend = function(evt) {
      var error, success;
      _this.picture.PictureImage = evt.target.result.substring(23);
      success = function() {
        return _this.callback(null, "picture sendt");
      };
      error = function(error) {
        return _this.callback(error, "picuter");
      };
      return SendObjectToServer(_this.picture, success, error);
    };
    return reader.readAsDataURL(file);
  };

  SendInPictureCommand.prototype.fail = function(e) {
    var k, v;
    console.log("sending in picture failed:");
    for (k in e) {
      v = e[k];
      console.log(k + " -> " + v);
    }
    return console.log("value of secur err " + FileError.SECURITY_ERR + " not found err " + FileError.NOT_FOUND_ERR);
  };

  return SendInPictureCommand;

})();

ObserversGroupsCommand = (function(_super) {

  __extends(ObserversGroupsCommand, _super);

  function ObserversGroupsCommand(user) {
    this.user = user;
    this.gotData = __bind(this.gotData, this);

    this.fetch = __bind(this.fetch, this);

    this.groups = [];
    this.url = SERVER_URL + ("/ObserverGroupMember?$filter=ObserverID eq " + this.user.id + "&$expand=ObserverGroup");
  }

  ObserversGroupsCommand.prototype.fetch = function(callback) {
    this.callback = callback;
    return GetObjectFromServer(this, this.gotData, this.fail);
  };

  ObserversGroupsCommand.prototype.gotData = function(data) {
    var _this = this;
    jQuery.each(data.results, function(i, result) {
      return _this.groups.push({
        id: result.ObserverGroup.ObserverGroupID,
        name: result.ObserverGroup.ObserverGroupName
      });
    });
    return this.callback(this.groups);
  };

  return ObserversGroupsCommand;

})(ErrorHandlingCommand);

ObserversCompCommand = (function(_super) {

  __extends(ObserversCompCommand, _super);

  function ObserversCompCommand(user) {
    this.user = user;
    this.gotData = __bind(this.gotData, this);

    this.fetch = __bind(this.fetch, this);

    this.comps = [];
    this.url = SERVER_URL + ("/ObserverHazardsComp?$filter=ObserverID eq " + this.user.id);
    this.callback = function() {};
  }

  ObserversCompCommand.prototype.fetch = function(callback) {
    this.callback = callback;
    return GetObjectFromServer(this, this.gotData, this.fail);
  };

  ObserversCompCommand.prototype.gotData = function(data) {
    var _this = this;
    jQuery.each(data.results, function(i, result) {
      var comp;
      comp = new Competancy(result.GeoHazardTID, result.CompetenceLevelTID);
      return _this.comps.push(comp);
    });
    return this.callback(this.comps);
  };

  return ObserversCompCommand;

})(ErrorHandlingCommand);
