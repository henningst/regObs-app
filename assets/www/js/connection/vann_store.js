var WaterStore,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

WaterStore = (function(_super) {

  __extends(WaterStore, _super);

  function WaterStore() {
    this.m_incident = null;
    this.m_pictures = [];
  }

  WaterStore.prototype.setIncident = function(incident) {
    this.m_incident = incident;
    return DataAccess.save(WaterStore.name, this);
  };

  WaterStore.prototype.getIncident = function() {
    return this.m_incident;
  };

  WaterStore.prototype.addPicture = function(picture) {
    this.m_pictures.push(picture);
    return DataAccess.save(WaterStore.name, this);
  };

  WaterStore.prototype.getPictures = function() {
    return this.m_pictures;
  };

  WaterStore.prototype.send = function() {
    return this.onSend(water_page);
  };

  WaterStore.prototype.afterLocation = function(data) {
    return this.onAfterLocation(data);
  };

  WaterStore.prototype.afterRegistration = function(data) {
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
      picture.PictureID = i;
      i += 1;
      return SendObjectToServer(picture);
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      picture = _ref[_i];
      _fn(picture);
    }
    this.m_pictures.length = 0;
    water_picture.afterSendRegistration();
    water_hendelse.afterSendRegistration();
    water_page.afterSendRegistration();
    DataAccess.save(WaterStore.name, this);
    return main.showFinishedUploadMessage();
  };

  return WaterStore;

})(AbstractStore);
