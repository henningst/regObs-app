// Generated by CoffeeScript 1.3.1
var WaterStore;

WaterStore = (function() {
  var m_incident, m_pictures, m_waterObs;

  WaterStore.name = 'WaterStore';

  function WaterStore() {}

  m_incident = null;

  m_waterObs = [];

  m_pictures = [];

  WaterStore.prototype.setIncident = function(incident) {
    return m_incident = incident;
  };

  WaterStore.prototype.getIncident = function() {
    return m_incident;
  };

  WaterStore.prototype.addWaterObs = function(obs) {
    return m_waterObs.push(obs);
  };

  WaterStore.prototype.getWaterObs = function() {
    return m_waterObs;
  };

  WaterStore.prototype.addPicture = function(picture) {
    return m_pictures.push(picture);
  };

  WaterStore.prototype.getPictures = function() {
    return m_pictures;
  };

  WaterStore.prototype.send = function(nveSend) {
    return GetObjectFromServer(new DangerSignKD(), this.print);
  };

  WaterStore.prototype.print = function(obj) {
    return console.log(obj);
  };

  return WaterStore;

})();