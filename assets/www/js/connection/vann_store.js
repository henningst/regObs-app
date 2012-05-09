// Generated by CoffeeScript 1.3.1
var WaterStore;

WaterStore = (function() {

  WaterStore.name = 'WaterStore';

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
    var elapsedInMinutes, location, pos, source,
      _this = this;
    source = 0;
    pos = water_page.pos_obj;
    if (pos) {
      elapsedInMinutes = ((new Date()).getTime() - pos.taken.getTime()) / 1000 / 60;
      if (elapsedInMinutes < GPS_TIMEOUT_IN_MINUTES) {
        source = GPS_POSITION;
      } else {
        source = OLD_GPS_POSITION;
      }
    }
    location = new ObsLocation($("water_position_header_town").innerHTML, 33, water_page.longitude, water_page.latitute, source, 0, 0, 250, 250, false, null, new Date());
    return SendObjectToServer(location, function(data) {
      return _this.afterLocation(data);
    });
  };

  WaterStore.prototype.afterLocation = function(data) {
    var registration,
      _this = this;
    registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, new Date(), 0);
    return SendObjectToServer(registration, function(data) {
      return _this.afterRegistration(data);
    });
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
      picture.PictureID = i++;
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
    return alert('Takk for observasjon');
  };

  return WaterStore;

})();
