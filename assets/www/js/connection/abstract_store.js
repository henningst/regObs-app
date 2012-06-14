var AbstractStore,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

AbstractStore = (function() {

  function AbstractStore() {
    this.fillAvalancheDangerObs = __bind(this.fillAvalancheDangerObs, this);
    this.fillDangerObs = __bind(this.fillDangerObs, this);
    this.fillPicture = __bind(this.fillPicture, this);
    this.fillIncident = __bind(this.fillIncident, this);
  }

  AbstractStore.prototype.absConstructor = function() {
    this.m_dangerObs = [];
    this.m_incident = null;
    this.m_pictures = [];
    this.lat = 0;
    return this.long = 0;
  };

  AbstractStore.prototype.onError = function(data) {
    return main.errorDialog();
  };

  AbstractStore.prototype.superInit = function() {
    var obs, picture;
    if (this.name === 'SnowStore') {
      this.m_dangerObs = (function() {
        var _i, _len, _ref, _results;
        _ref = this.m_dangerObs;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          obs = _ref[_i];
          _results.push(this.fillAvalancheDangerObs(obs));
        }
        return _results;
      }).call(this);
    } else {
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
    }
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

  AbstractStore.prototype.setIncident = function(incident) {
    this.m_incident = incident;
    return DataAccess.save(this.name, this);
  };

  AbstractStore.prototype.getIncident = function() {
    return this.m_incident;
  };

  AbstractStore.prototype.setLatLong = function(lat, long) {
    this.lat = lat;
    this.long = long;
    return DataAccess.save(this.name, this);
  };

  AbstractStore.prototype.setKommunenr = function(nr) {
    this.komm_nr = nr;
    return console.log("set kommune nr");
  };

  AbstractStore.prototype.setArea = function(nr) {
    this.omrade_id = nr;
    return console.log("set area id");
  };

  AbstractStore.prototype.addObs = function(obs) {
    this.m_dangerObs.push(obs);
    return DataAccess.save(this.name, this);
  };

  AbstractStore.prototype.getObs = function() {
    return this.m_dangerObs;
  };

  AbstractStore.prototype.addPicture = function(picture) {
    this.m_pictures.push(picture);
    return DataAccess.save(this.name, this);
  };

  AbstractStore.prototype.getPictures = function() {
    return this.m_pictures;
  };

  AbstractStore.prototype.send = function() {
    return this.onSend(this.page, true);
  };

  AbstractStore.prototype.afterLocation = function(data, area, force) {
    return this.onAfterLocation(data, area, force);
  };

  AbstractStore.prototype.afterRegistration = function(data, area, force) {
    if (area) {
      return this.completeAreaRegistration(data, force);
    } else {
      return this.completePointRegistration(data);
    }
  };

  AbstractStore.prototype.completeAreaRegistration = function(data, force) {
    var bilde, i, n, obs, picture, _fn, _fn2, _i, _j, _len, _len2, _ref;
    i = 0;
    n = this.name;
    console.log("test");
    _ref = this.m_dangerObs;
    _fn = function(obs) {
      obs.RegID = data.RegID;
      if (n === 'SnowStore') {
        obs.AvalancheDangerObsID = i++;
      } else {
        obs.DangerObsID = i++;
      }
      return SendObjectToServer(obs);
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obs = _ref[_i];
      _fn(obs);
    }
    this.m_dangerObs.length = 0;
    i = 0;
    bilde = this.cutOutPictures(true);
    _fn2 = function(picture) {
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      return SendObjectToServer(picture);
    };
    for (_j = 0, _len2 = bilde.length; _j < _len2; _j++) {
      picture = bilde[_j];
      _fn2(picture);
    }
    if (this.m_incident && (i !== 0 || force)) {
      this.m_incident.RegID = data.RegID;
      SendObjectToServer(this.m_incident);
      this.m_incident = null;
    }
    this.picturePage.afterSendRegistration();
    this.hendelsePage.afterSendRegistration();
    DataAccess.save(this.name, this);
    if (!force) {
      return this.onSend(this.page, false);
    } else {
      this.page.afterSendRegistration();
      return main.showFinishedUploadMessage();
    }
  };

  AbstractStore.prototype.completePointRegistration = function(data) {
    var bilde, i, picture, _fn, _i, _len;
    if (this.m_incident) {
      this.m_incident.RegID = data.RegID;
      SendObjectToServer(this.m_incident);
      this.m_incident = null;
    }
    i = 0;
    bilde = this.cutOutPictures(false);
    _fn = function(picture) {
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      return SendObjectToServer(picture);
    };
    for (_i = 0, _len = bilde.length; _i < _len; _i++) {
      picture = bilde[_i];
      _fn(picture);
    }
    this.m_pictures.length = 0;
    this.picturePage.afterSendRegistration();
    this.hendelsePage.afterSendRegistration();
    this.page.afterSendRegistration();
    main.lastRegID = data.RegID;
    DataAccess.save(this.name, this);
    return main.showFinishedUploadMessage();
  };

  AbstractStore.prototype.fillIncident = function(incident) {
    return new Incident(incident.RegID, incident.GeoHazardTID, incident.ActivityInfluencedTID, incident.DamageExtentTID, incident.ForecastAccurateTID, incident.DtEndTime, incident.IncidentHeader, incident.IncidentIngress, incident.IncidentText, incident.SensitiveText, incident.UsageFlagTID, incident.Comment);
  };

  AbstractStore.prototype.fillPicture = function(picture) {
    return new Picture(picture.PictureID, picture.RegID, picture.PictureImage, picture.Photographer, picture.Copyright, picture.Aspect, picture.GeoHazardTID, picture.Comment, picture.RegistrationTID);
  };

  AbstractStore.prototype.fillDangerObs = function(obs) {
    return new DangerObs(obs.DangerObsID, obs.RegID, obs.GeoHazardTID, obs.DangerSignTID, obs.UsageFlagTID, obs.Comment);
  };

  AbstractStore.prototype.fillAvalancheDangerObs = function(obs) {
    return new AvalancheDangerObs(obs.AvalancheDangerObsID, obs.RegID, obs.DangerSignTID, obs.UsageFlagTID, obs.Comment);
  };

  AbstractStore.prototype.onSend = function(page, area) {
    var elapsedInMinutes, location, pos, source,
      _this = this;
    if (area) main.showWaitingDialogWithMessage(UPLOADING);
    source = 0;
    pos = page.pos_obj;
    if (pos) {
      elapsedInMinutes = ((new Date()).getTime() - pos.timestamp) / 1000 / 60;
      if (elapsedInMinutes < GPS_TIMEOUT_IN_MINUTES) {
        source = GPS_POSITION;
      } else {
        source = OLD_GPS_POSITION;
      }
    }
    if (area) {
      if (this.filterPicture(true).length !== 0 || this.m_dangerObs.length !== 0) {
        location = new ObsLocation("", 33, this.long, this.lat, source, 0, this.omrade_id, null, null, true, null, null, null, null, null, this.komm_nr.toString());
        return SendObjectToServer(location, (function(data) {
          return _this.afterLocation(data, true, false);
        }), function(error) {
          return _this.onError(error);
        });
      } else {
        if (this.filterPicture(false).length !== 0) {
          return this.onSend(page, false);
        } else {
          location = new ObsLocation("", 33, this.long, this.lat, source, 0, this.omrade_id, 250, 250, true, null, null, null, null, null, this.komm_nr.toString());
          return SendObjectToServer(location, (function(data) {
            return _this.afterLocation(data, true, true);
          }), function(error) {
            return _this.onError(error);
          });
        }
      }
    } else {
      if (this.filterPicture(false).length !== 0) {
        location = new ObsLocation("", 33, this.long, this.lat, source, 0, this.omrade_id, 250, 250, false, null, null, null, null, null, this.komm_nr.toString());
        return SendObjectToServer(location, (function(data) {
          return _this.afterLocation(data, false);
        }), function(error) {
          return _this.onError(error);
        });
      } else {
        this.page.afterSendRegistration();
        return main.showFinishedUploadMessage();
      }
    }
  };

  AbstractStore.prototype.onAfterLocation = function(data, area, force) {
    var date, registration,
      _this = this;
    date = new Date(new Date().getTime() + 1000 * 60 * 120);
    registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, date, 0);
    return SendObjectToServer(registration, (function(data) {
      return _this.afterRegistration(data, area, force);
    }), function(error) {
      return _this.onError(error);
    });
  };

  AbstractStore.prototype.cutOutPictures = function(area) {
    var erg, i, picture, _ref, _ref2;
    i = 0;
    erg = [];
    while (i < this.m_pictures.length) {
      picture = this.m_pictures[i];
      if (area) {
        if ((_ref = picture.RegistrationTID) !== 21 && _ref !== 22 && _ref !== 23 && _ref !== 25 && _ref !== 26 && _ref !== 50 && _ref !== 51 && _ref !== 61 && _ref !== 71) {
          erg.push(picture);
          this.m_pictures.splice(i, 1);
        } else {
          i++;
        }
      } else {
        if ((_ref2 = picture.RegistrationTID) === 21 || _ref2 === 22 || _ref2 === 23 || _ref2 === 25 || _ref2 === 26 || _ref2 === 50 || _ref2 === 51 || _ref2 === 61 || _ref2 === 71) {
          erg.push(picture);
          this.m_pictures.splice(i, 1);
        } else {
          i++;
        }
      }
    }
    return erg;
  };

  AbstractStore.prototype.filterPicture = function(area) {
    var picture, _i, _j, _len, _len2, _ref, _ref2, _ref3, _ref4, _results, _results2;
    if (area) {
      _ref = this.m_pictures;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        picture = _ref[_i];
        if ((_ref2 = picture.RegistrationTID) !== 21 && _ref2 !== 22 && _ref2 !== 23 && _ref2 !== 25 && _ref2 !== 26 && _ref2 !== 50 && _ref2 !== 51 && _ref2 !== 61 && _ref2 !== 71) {
          _results.push(picture);
        }
      }
      return _results;
    } else {
      _ref3 = this.m_pictures;
      _results2 = [];
      for (_j = 0, _len2 = _ref3.length; _j < _len2; _j++) {
        picture = _ref3[_j];
        if ((_ref4 = picture.RegistrationTID) === 21 || _ref4 === 22 || _ref4 === 23 || _ref4 === 25 || _ref4 === 26 || _ref4 === 50 || _ref4 === 51 || _ref4 === 61 || _ref4 === 71) {
          _results2.push(picture);
        }
      }
      return _results2;
    }
  };

  return AbstractStore;

})();
