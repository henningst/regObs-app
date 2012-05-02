// Generated by CoffeeScript 1.3.1
var SnowStore;

SnowStore = (function() {
  var m_incident, m_pictures, m_snowObs;

  SnowStore.name = 'SnowStore';

  function SnowStore() {}

  m_incident = null;

  m_snowObs = [];

  m_pictures = [];

  SnowStore.prototype.setIncident = function(incident) {
    return m_incident = incident;
  };

  SnowStore.prototype.getIncident = function() {
    return m_incident;
  };

  SnowStore.prototype.addSnowObs = function(obs) {
    return m_snowObs.push(obs);
  };

  SnowStore.prototype.getSnowObs = function() {
    return m_snowObs;
  };

  SnowStore.prototype.addPicture = function(picture) {
    return m_pictures.push(picture);
  };

  SnowStore.prototype.getPictures = function() {
    return m_pictures;
  };

  SnowStore.prototype.send = function() {
    var location;
    alert("send");
    location = new ObsLocation($("position_header_town").innerHTML, 33, snow_page.longitude, snow_page.latitute, 0, 0, 0, 250, 250, false, null, new Date());
    return SendObjectToServer(location, main.store.getSnow().afterLocation);
  };

  SnowStore.prototype.afterLocation = function(data) {
    var registration;
    alert("afterSend " + data.ObsLocationID + " " + main.login.data.ObserverID + " " + data.ObsLocationID);
    registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date(), 0);
    return SendObjectToServer(registration, main.store.getSnow().afterRegistration);
  };

  SnowStore.prototype.afterRegistration = function(data) {
    var i, obs, picture, _fn, _fn1, _i, _j, _len, _len1;
    alert("afterReg" + " " + data.RegID);
    i = 0;
    _fn = function(obs) {
      obs.RegID = data.RegID;
      obs.AvalancheDangerObsID = i++;
      return SendObjectToServer(obs, main.store.p);
    };
    for (_i = 0, _len = m_snowObs.length; _i < _len; _i++) {
      obs = m_snowObs[_i];
      _fn(obs);
    }
    m_snowObs.length = 0;
    if (m_incident) {
      m_incident.RegID = data.RegID;
      SendObjectToServer(m_incident, main.store.p);
      m_incident = null;
    }
    i = 0;
    _fn1 = function(picture) {
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      return SendObjectToServer(picture, main.store.p);
    };
    for (_j = 0, _len1 = m_pictures.length; _j < _len1; _j++) {
      picture = m_pictures[_j];
      _fn1(picture);
    }
    m_pictures.length = 0;
    snow_picture.afterSendRegistration();
    snow_hendelse.afterSendRegistration();
    return snow_page.afterSendRegistration();
  };

  SnowStore.prototype.print = function(obj) {
    return console.log(obj);
  };

  return SnowStore;

})();
