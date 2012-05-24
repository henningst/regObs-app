// Generated by CoffeeScript 1.3.1
var IceStore,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

IceStore = (function(_super) {

  __extends(IceStore, _super);

  IceStore.name = 'IceStore';

  function IceStore() {
    this.m_incident = null;
    this.m_pictures = [];
  }

  IceStore.prototype.setIncident = function(incident) {
    this.m_incident = incident;
    return DataAccess.save(IceStore.name, this);
  };

  IceStore.prototype.getIncident = function() {
    return this.m_incident;
  };

  IceStore.prototype.addPicture = function(picture) {
    this.m_pictures.push(picture);
    return DataAccess.save(IceStore.name, this);
  };

  IceStore.prototype.getPictures = function() {
    return this.m_pictures;
  };

  IceStore.prototype.send = function() {
    return this.onSend(ice_page);
  };

  IceStore.prototype.afterLocation = function(data) {
    return this.onAfterLocation(data);
  };

  IceStore.prototype.afterRegistration = function(data) {
    var i, picture, _fn, _i, _len, _ref;
    if (this.m_incident) {
      this.m_incident.RegID = data.RegID;
      SendObjectToServer(this.m_incident);
      this.m_incident = null;
    }
    i = 0;
    _ref = this.m_pictures;
    _fn = function(picture) {
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      return SendObjectToServer(picture);
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      picture = _ref[_i];
      _fn(picture);
    }
    this.m_pictures.length = 0;
    ice_picture.afterSendRegistration();
    ice_hendelse.afterSendRegistration();
    ice_page.afterSendRegistration();
    DataAccess.save(IceStore.name, this);
    return main.showFinishedUploadMessage();
  };

  return IceStore;

})(AbstractStore);
