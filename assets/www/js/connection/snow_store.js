var SnowStore,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

SnowStore = (function(_super) {

  __extends(SnowStore, _super);

  function SnowStore() {
    this.m_snowObs = [];
    this.m_incident = null;
    this.m_pictures = [];
  }

  SnowStore.prototype.setIncident = function(incident) {
    this.m_incident = incident;
    return DataAccess.save(SnowStore.name, this);
  };

  SnowStore.prototype.getIncident = function() {
    return this.m_incident;
  };

  SnowStore.prototype.addSnowObs = function(obs) {
    this.m_snowObs.push(obs);
    return DataAccess.save(SnowStore.name, this);
  };

  SnowStore.prototype.getSnowObs = function() {
    return this.m_snowObs;
  };

  SnowStore.prototype.addPicture = function(picture) {
    this.m_pictures.push(picture);
    return DataAccess.save(SnowStore.name, this);
  };

  SnowStore.prototype.getPictures = function() {
    return this.m_pictures;
  };

  SnowStore.prototype.send = function() {
    return this.onSend(snow_page);
  };

  SnowStore.prototype.afterLocation = function(data) {
    return this.onAfterLocation(data);
  };

  SnowStore.prototype.afterRegistration = function(data) {
    var i, obs, picture, _fn, _fn2, _i, _j, _len, _len2, _ref, _ref2;
    i = 0;
    _ref = this.m_snowObs;
    _fn = function(obs) {
      obs.RegID = data.RegID;
      obs.AvalancheDangerObsID = i++;
      return SendObjectToServer(obs);
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obs = _ref[_i];
      _fn(obs);
    }
    this.m_snowObs.length = 0;
    if (this.m_incident) {
      this.m_incident.RegID = data.RegID;
      SendObjectToServer(this.m_incident);
      this.m_incident = null;
    }
    i = 0;
    _ref2 = this.m_pictures;
    _fn2 = function(picture) {
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      return SendObjectToServer(picture);
    };
    for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
      picture = _ref2[_j];
      _fn2(picture);
    }
    this.m_pictures.length = 0;
    snow_picture.afterSendRegistration();
    snow_hendelse.afterSendRegistration();
    snow_page.afterSendRegistration();
    DataAccess.save(SnowStore.name, this);
    return main.showFinishedUploadMessage();
  };

  return SnowStore;

})(AbstractStore);
