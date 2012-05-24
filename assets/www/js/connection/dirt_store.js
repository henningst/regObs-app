var DirtStore,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

DirtStore = (function(_super) {

  __extends(DirtStore, _super);

  function DirtStore() {
    this.m_incident = null;
    this.m_pictures = [];
  }

  DirtStore.prototype.setIncident = function(incident) {
    this.m_incident = incident;
    return DataAccess.save(DirtStore.name, this);
  };

  DirtStore.prototype.getIncident = function() {
    return this.m_incident;
  };

  DirtStore.prototype.addPicture = function(picture) {
    this.m_pictures.push(picture);
    return DataAccess.save(DirtStore.name, this);
  };

  DirtStore.prototype.getPictures = function() {
    return this.m_pictures;
  };

  DirtStore.prototype.send = function() {
    return this.onSend(dirt_page);
  };

  DirtStore.prototype.afterLocation = function(data) {
    return this.onAfterLocation(data);
  };

  DirtStore.prototype.afterRegistration = function(data) {
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
    dirt_picture.afterSendRegistration();
    dirt_hendelse.afterSendRegistration();
    dirt_page.afterSendRegistration();
    DataAccess.save(DirtStore.name, this);
    main.hideDialog();
    return alert('Takk for observasjon');
  };

  return DirtStore;

})(AbstractStore);
