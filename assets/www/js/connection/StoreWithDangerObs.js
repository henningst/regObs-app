// Generated by CoffeeScript 1.3.1
var StoreWithDangerObs,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

StoreWithDangerObs = (function(_super) {

  __extends(StoreWithDangerObs, _super);

  StoreWithDangerObs.name = 'StoreWithDangerObs';

  function StoreWithDangerObs() {
    this.fillDangerObs = __bind(this.fillDangerObs, this);

    this.fillPicture = __bind(this.fillPicture, this);

    this.fillIncident = __bind(this.fillIncident, this);
    return StoreWithDangerObs.__super__.constructor.apply(this, arguments);
  }

  StoreWithDangerObs.prototype.superConstructor = function() {
    this.m_dangerObs = [];
    this.m_incident = null;
    return this.m_pictures = [];
  };

  StoreWithDangerObs.prototype.superInit = function() {
    var obs, picture;
    this.m_dangerObs = (function() {
      var _i, _len, _ref, _results;
      _ref = this.m_dangerObs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obs = _ref[_i];
        _results.push(this.fillDangerObs(obs));
      }
      return _results;
    }).call(this);
    this.m_pictures = (function() {
      var _i, _len, _ref, _results;
      _ref = this.m_pictures;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        picture = _ref[_i];
        _results.push(this.fillPicture(picture));
      }
      return _results;
    }).call(this);
    if (this.m_incident) {
      return this.m_incident = this.fillIncident(this.m_incident);
    }
  };

  StoreWithDangerObs.prototype.setIncident = function(incident) {
    this.m_incident = incident;
    return DataAccess.save(this.name, this);
  };

  StoreWithDangerObs.prototype.getIncident = function() {
    return this.m_incident;
  };

  StoreWithDangerObs.prototype.addObs = function(obs) {
    this.m_dangerObs.push(obs);
    return DataAccess.save(this.name, this);
  };

  StoreWithDangerObs.prototype.getObs = function() {
    return this.m_dangerObs;
  };

  StoreWithDangerObs.prototype.addPicture = function(picture) {
    this.m_pictures.push(picture);
    return DataAccess.save(this.name, this);
  };

  StoreWithDangerObs.prototype.getPictures = function() {
    return this.m_pictures;
  };

  StoreWithDangerObs.prototype.send = function() {
    return this.onSend(this.page);
  };

  StoreWithDangerObs.prototype.afterLocation = function(data) {
    return this.onAfterLocation(data);
  };

  StoreWithDangerObs.prototype.afterRegistration = function(data) {
    var i, obs, picture, _fn, _fn1, _i, _j, _len, _len1, _ref, _ref1;
    i = 0;
    _ref = this.m_dangerObs;
    _fn = function(obs) {
      obs.RegID = data.RegID;
      obs.DangerObsID = i++;
      return SendObjectToServer(obs);
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obs = _ref[_i];
      _fn(obs);
    }
    this.m_dangerObs.length = 0;
    if (this.m_incident) {
      this.m_incident.RegID = data.RegID;
      SendObjectToServer(this.m_incident);
      this.m_incident = null;
    }
    i = 0;
    _ref1 = this.m_pictures;
    _fn1 = function(picture) {
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      return SendObjectToServer(picture);
    };
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      picture = _ref1[_j];
      _fn1(picture);
    }
    this.m_pictures.length = 0;
    this.picturePage.afterSendRegistration();
    this.hendelsePage.afterSendRegistration();
    this.page.afterSendRegistration();
    DataAccess.save(this.name, this);
    return main.showFinishedUploadMessage();
  };

  StoreWithDangerObs.prototype.fillIncident = function(incident) {
    return new Incident(incident.RegID, incident.GeoHazardTID, incident.ActivityInfluencedTID, incident.DamageExtentTID, incident.ForecastAccurateTID, incident.DtEndTime, incident.IncidentHeader, incident.IncidentIngress, incident.IncidentText, incident.SensitiveText, incident.UsageFlagTID, incident.Comment);
  };

  StoreWithDangerObs.prototype.fillPicture = function(picture) {
    return new Picture(picture.PictureID, picture.RegID, picture.PictureImage, picture.Photographer, picture.Copyright, picture.Aspect, picture.GeoHazardTID, picture.Comment);
  };

  StoreWithDangerObs.prototype.fillDangerObs = function(obs) {
    return new DangerObs(obs.DangerObsID, obs.RegID, obs.GeoHazardTID, obs.DangerSignTID, obs.UsageFlagTID, obs.Comment);
  };

  return StoreWithDangerObs;

})(AbstractStore);
