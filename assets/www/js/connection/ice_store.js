// Generated by CoffeeScript 1.3.1
var IceStore;

IceStore = (function() {
  var m_incident, m_pictures;

  IceStore.name = 'IceStore';

  function IceStore() {}

  m_incident = null;

  m_pictures = [];

  IceStore.prototype.setIncident = function(incident) {
    return m_incident = incident;
  };

  IceStore.prototype.getIncident = function() {
    return m_incident;
  };

  IceStore.prototype.addPicture = function(picture) {
    return m_pictures.push(picture);
  };

  IceStore.prototype.getPictures = function() {
    return m_pictures;
  };

  IceStore.prototype.send = function() {
    var location;
    location = new ObsLocation($("position_header_town").innerHTML, 33, snow_page.longitude, snow_page.latitute, 0, 0, 0, 250, 250, false, null, new Date());
    return SendObjectToServer(location, main.store.getIce().afterLocation);
  };

  IceStore.prototype.afterLocation = function(data) {
    var registration;
    registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date(), 0);
    return SendObjectToServer(registration, main.store.getIce().afterRegistration);
  };

  IceStore.prototype.afterRegistration = function(data) {
    var i, picture, _fn, _i, _len;
    if (m_incident) {
      m_incident.RegID = data.RegID;
      SendObjectToServer(m_incident);
      m_incident = null;
    }
    i = 0;
    _fn = function(picture) {
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      return SendObjectToServer(picture);
    };
    for (_i = 0, _len = m_pictures.length; _i < _len; _i++) {
      picture = m_pictures[_i];
      _fn(picture);
    }
    m_pictures.length = 0;
    ice_picture.afterSendRegistration();
    ice_hendelse.afterSendRegistration();
    return ice_page.afterSendRegistration();
  };

  return IceStore;

})();
