var AbstractStore;

AbstractStore = (function() {

  function AbstractStore() {}

  AbstractStore.prototype.onError = function(data) {
    return alert("No Internet ?");
  };

  AbstractStore.prototype.onSend = function(page) {
    var elapsedInMinutes, location, pos, source,
      _this = this;
    source = 0;
    pos = page.pos_obj;
    if (pos) {
      elapsedInMinutes = ((new Date()).getTime() - pos.taken.getTime()) / 1000 / 60;
      if (elapsedInMinutes < GPS_TIMEOUT_IN_MINUTES) {
        source = GPS_POSITION;
      } else {
        source = OLD_GPS_POSITION;
      }
    }
    location = new ObsLocation("", 33, page.longitude, page.latitute, source, 0, 0, 250, 250, false, null, new Date());
    return SendObjectToServer(location, (function(data) {
      return _this.afterLocation(data);
    }), function(error) {
      return _this.onError(error);
    });
  };

  AbstractStore.prototype.onAfterLocation = function(data) {
    var registration,
      _this = this;
    registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, new Date(), 0);
    return SendObjectToServer(registration, (function(data) {
      return _this.afterRegistration(data);
    }), function(error) {
      return _this.onError(error);
    });
  };

  return AbstractStore;

})();
