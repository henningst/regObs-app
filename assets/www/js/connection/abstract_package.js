// Generated by CoffeeScript 1.3.3
var AbstractPackage,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

AbstractPackage = (function() {

  function AbstractPackage() {
    this.castedModel = __bind(this.castedModel, this);

    this.onSend = __bind(this.onSend, this);

    this.fillObs = __bind(this.fillObs, this);

    this.fillPicture = __bind(this.fillPicture, this);

    this.fillIncident = __bind(this.fillIncident, this);

    this.completePointRegistration = __bind(this.completePointRegistration, this);

    this.completeAreaRegistration = __bind(this.completeAreaRegistration, this);

    this.afterRegistration = __bind(this.afterRegistration, this);

    this.afterLocation = __bind(this.afterLocation, this);

    this.callCallback = __bind(this.callCallback, this);

    this.omradeIdByCurrentHazard = __bind(this.omradeIdByCurrentHazard, this);

    this.currentHazard = __bind(this.currentHazard, this);

    this.send = __bind(this.send, this);

    this.getPictures = __bind(this.getPictures, this);

    this.addPicture = __bind(this.addPicture, this);

    this.getObs = __bind(this.getObs, this);

    this.addObs = __bind(this.addObs, this);

    this.setRegine = __bind(this.setRegine, this);

    this.setArea = __bind(this.setArea, this);

    this.setFylkenr = __bind(this.setFylkenr, this);

    this.setKommunenr = __bind(this.setKommunenr, this);

    this.setLatLong = __bind(this.setLatLong, this);

    this.getIncident = __bind(this.getIncident, this);

    this.afterSendRegistration = __bind(this.afterSendRegistration, this);

    this.setCompetancy = __bind(this.setCompetancy, this);

    this.setGroup = __bind(this.setGroup, this);

    this.setRegDate = __bind(this.setRegDate, this);

    this.setWaterLevel = __bind(this.setWaterLevel, this);

    this.setIncident = __bind(this.setIncident, this);

    this.superInit = __bind(this.superInit, this);

    this.onError = __bind(this.onError, this);

    this.absConstructor = __bind(this.absConstructor, this);

  }

  AbstractPackage.prototype.absConstructor = function() {
    this.m_dangerObs = [];
    this.m_incident = null;
    this.m_pictures = [];
    this.lat = 0;
    this.long = 0;
    this.komnr = 0;
    this.omrade_id = 0;
    this.regDate = null;
    this.freezed = false;
    return this.pages = [];
  };

  AbstractPackage.prototype.onError = function(data) {
    if (main.haveConnection()) {
      this.handleStatusCode(data.response.statusCode);
      console.log("pp: error occured sending package " + data);
      new ErrorHandler().handleErrorSilent(data);
      return main.updateCollection(main.store.packageCollection);
    } else {
      return main.noConnectionDialog();
    }
  };

  AbstractPackage.prototype.handleStatusCode = function(code) {
    console.log("pp: statusCode " + code + ", is " + typeof code);
    switch (code) {
      case 400:
        return main.showDialogWithMessage(BAD_REQUEST);
      case 500:
        return main.showDialogWithMessage(INTERNAL_ERROR);
      default:
        return main.showDialogWithMessage(UVENTET_FEIL);
    }
  };

  AbstractPackage.prototype.superInit = function() {
    var obs, picture;
    this.pages = [this.page, this.picturePage, this.hendelsePage];
    this.m_dangerObs = (function() {
      var _i, _len, _ref, _results;
      _ref = this.m_dangerObs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obs = _ref[_i];
        _results.push(this.fillObs(obs));
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

  AbstractPackage.prototype.setIncident = function(incident) {
    this.setRegDate();
    this.m_incident = incident;
    return DataAccess.save(this.name, this);
  };

  AbstractPackage.prototype.setWaterLevel = function(waterLevel) {
    this.setRegDate();
    this.m_waterLevel = waterLevel;
    return DataAccess.save(this.name, this);
  };

  AbstractPackage.prototype.setRegDate = function() {
    var date, hourOffset;
    date = new Date();
    hourOffset = (date.getTimezoneOffset() / 60) * -1;
    return this.regDate = new Date(date.setHours(date.getHours() + hourOffset));
  };

  AbstractPackage.prototype.setGroup = function(groupId) {
    return this.groupId = groupId;
  };

  AbstractPackage.prototype.setCompetancy = function(competancy) {
    return this.competancy = competancy;
  };

  AbstractPackage.prototype.afterSendRegistration = function() {
    var page, _i, _len, _ref, _results;
    _ref = this.pages;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      page = _ref[_i];
      if (page && page.afterSendRegistration) {
        _results.push(page.afterSendRegistration());
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  AbstractPackage.prototype.getIncident = function() {
    return this.m_incident;
  };

  AbstractPackage.prototype.setLatLong = function(lat, long, accuracy) {
    this.lat = lat;
    this.long = long;
    this.accuracy = accuracy;
    return DataAccess.save(this.name, this);
  };

  AbstractPackage.prototype.setKommunenr = function(nr) {
    if (nr) {
      return this.komm_nr = nr;
    }
  };

  AbstractPackage.prototype.setFylkenr = function(nr) {
    if (nr) {
      return this.fylke_nr = nr;
    }
  };

  AbstractPackage.prototype.setArea = function(nr) {
    return this.omrade_id = nr;
  };

  AbstractPackage.prototype.setRegine = function(nr) {
    console.log("Setting regine nr" + nr);
    if (nr) {
      return this.regine_nr = nr;
    }
  };

  AbstractPackage.prototype.addObs = function(obs) {
    this.setRegDate();
    if (obs.setRegDate) {
      obs.setRegDate(this.regDate);
    }
    this.m_dangerObs.push(obs);
    return DataAccess.save(this.name, this);
  };

  AbstractPackage.prototype.getObs = function(type) {
    if (type === void 0) {
      return this.m_dangerObs;
    } else {
      return this.m_dangerObs.filter(function(obj) {
        return obj.model === type;
      });
    }
  };

  AbstractPackage.prototype.addPicture = function(picture) {
    this.setRegDate();
    this.m_pictures.push(picture);
    return DataAccess.save(this.name, this);
  };

  AbstractPackage.prototype.getPictures = function() {
    return this.m_pictures;
  };

  AbstractPackage.prototype.send = function() {
    var competancy, user;
    user = UserStore.get(main.currentMode());
    competancy = user.competancy;
    this.setCompetancy(competancy.getLevel(this.currentHazard()));
    return this.onSend(this.page, true);
  };

  AbstractPackage.prototype.currentHazard = function() {
    var currentHazard, page;
    page = this.page.name;
    currentHazard = (function() {
      switch (page) {
        case "snow_page":
          return SNOW_GEO_HAZARD;
        case "dirt_page":
          return DIRT_GEO_HAZARD;
        case "ice_page":
          return ICE_GEO_HAZARD;
        case "water_page":
          return WATER_GEO_HAZARD;
      }
    })();
    console.log("current hazard is " + page + "=" + currentHazard);
    return currentHazard;
  };

  AbstractPackage.prototype.omradeIdByCurrentHazard = function() {
    var id;
    id = (function() {
      switch (this.currentHazard()) {
        case SNOW_GEO_HAZARD:
          return parseInt(this.omrade_id);
        case DIRT_GEO_HAZARD:
          return parseInt(this.fylke_nr) + 200;
        case ICE_GEO_HAZARD:
          return parseInt(this.fylke_nr) + 700;
        case WATER_GEO_HAZARD:
          return parseInt(this.regine_nr) + 2000;
      }
    }).call(this);
    console.log("current id " + id);
    return id;
  };

  AbstractPackage.prototype.callCallback = function() {
    if (this.callback) {
      return this.callback(this);
    }
  };

  AbstractPackage.prototype.afterLocation = function(data, area, force) {
    return this.onAfterLocation(data, area, force);
  };

  AbstractPackage.prototype.afterRegistration = function(data, area, force) {
    console.log("after reg area " + area + " force " + force);
    if (area) {
      return this.completeAreaRegistration(data, force);
    } else {
      return this.completePointRegistration(data);
    }
  };

  AbstractPackage.prototype.completeAreaRegistration = function(data, force) {
    var bilde, i, n, obs, picture, x, _fn, _fn1, _i, _j, _len, _len1, _ref,
      _this = this;
    console.log("complete force " + force);
    x = 0;
    n = this.name;
    _ref = this.pointModels(this.m_dangerObs).area;
    _fn = function(obs) {
      var clone;
      obs.RegID = data.RegID;
      clone = JSON.parse(JSON.stringify(obs));
      clone = _this.castedModel(clone);
      if (clone.beforeSend) {
        clone.beforeSend(x++);
      }
      if (clone.model) {
        delete clone.model;
      }
      return SendObjectToServer(clone, void 0, function(error) {
        return _this.onError(error);
      });
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obs = _ref[_i];
      _fn(obs);
    }
    this.removeAreaModels();
    i = 0;
    bilde = this.cutOutPictures(true);
    _fn1 = function(picture) {
      var sendPicture;
      picture = jQuery.extend(picture, new Picture());
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      sendPicture = new SendInPictureCommand(picture);
      return sendPicture.send();
    };
    for (_j = 0, _len1 = bilde.length; _j < _len1; _j++) {
      picture = bilde[_j];
      _fn1(picture);
    }
    if (this.m_incident && (i !== 0 || x !== 0 || force)) {
      this.m_incident = jQuery.extend(this.m_incident, new Incident());
      this.m_incident.RegID = data.RegID;
      SendObjectToServer(this.m_incident);
      this.m_incident = null;
    }
    main.addLastRegID(data.RegID);
    DataAccess.save(this.name, this);
    if (!force) {
      return this.onSend(this.page, false);
    } else {
      this.callCallback();
      return main.showFinishedUploadMessage();
    }
  };

  AbstractPackage.prototype.completePointRegistration = function(data) {
    var bilde, i, obs, picture, x, _fn, _fn1, _i, _j, _len, _len1, _ref,
      _this = this;
    if (this.m_incident) {
      this.m_incident = jQuery.extend(this.m_incident, new Incident());
      this.m_incident.RegID = data.RegID;
      SendObjectToServer(this.m_incident, void 0, function(error) {
        return _this.onError(error);
      });
      this.m_incident = null;
    }
    x = 0;
    _ref = this.pointModels(this.m_dangerObs).point;
    _fn = function(obs) {
      var clone;
      obs.RegID = data.RegID;
      clone = JSON.parse(JSON.stringify(obs));
      clone = _this.castedModel(clone);
      if (clone.beforeSend) {
        clone.beforeSend(x++);
      }
      if (clone.model) {
        delete clone.model;
      }
      return SendObjectToServer(clone, void 0, function(error) {
        return _this.onError(error);
      });
    };
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obs = _ref[_i];
      _fn(obs);
    }
    this.removePointModels();
    i = 0;
    bilde = this.cutOutPictures(false);
    _fn1 = function(picture) {
      var sendPicture;
      picture = jQuery.extend(picture, new Picture());
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      sendPicture = new SendInPictureCommand(picture);
      return sendPicture.send();
    };
    for (_j = 0, _len1 = bilde.length; _j < _len1; _j++) {
      picture = bilde[_j];
      _fn1(picture);
    }
    this.m_pictures.length = 0;
    main.addLastRegID(data.RegID);
    DataAccess.save(this.name, this);
    this.callCallback();
    return main.showFinishedUploadMessage();
  };

  AbstractPackage.prototype.fillIncident = function(incident) {
    return new Incident(incident.RegID, incident.GeoHazardTID, incident.ActivityInfluencedTID, incident.DamageExtentTID, incident.ForecastAccurateTID, incident.DtEndTime, incident.IncidentHeader, incident.IncidentIngress, incident.IncidentText, incident.SensitiveText, incident.UsageFlagTID, incident.Comment);
  };

  AbstractPackage.prototype.fillPicture = function(picture) {
    return new Picture(picture.PictureID, picture.RegID, picture.PictureImage, picture.Photographer, picture.Copyright, picture.Aspect, picture.GeoHazardTID, picture.Comment, picture.RegistrationTID);
  };

  AbstractPackage.prototype.fillObs = function(obs) {
    return this.castedModel(obs);
  };

  AbstractPackage.prototype.onSend = function(page, area) {
    var elapsedInMinutes, komm_string, location, pos, source,
      _this = this;
    if (area) {
      main.showWaitingDialogWithMessage(UPLOADING);
    }
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
    komm_string = "0";
    if (this.komm_nr) {
      komm_string = this.komm_nr.toString();
    }
    if (area) {
      if (this.areaPictures().length > 0 || this.pointModels(this.m_dangerObs).area.length > 0) {
        location = new ObsLocation("", 33, this.long, this.lat, source, 0, this.omradeIdByCurrentHazard(), null, null, true, null, this.regDate, null, null, null, komm_string, "Feilmargin: " + this.accuracy + "m");
        return SendObjectToServer(location, (function(data) {
          return _this.afterLocation(data, true, false);
        }), function(error) {
          return _this.onError(error);
        });
      } else {
        if (this.pointPictures().length > 0 || this.pointModels(this.m_dangerObs).point.length > 0) {
          return this.onSend(page, false);
        } else {
          location = new ObsLocation("", 33, this.long, this.lat, source, 0, this.omradeIdByCurrentHazard(), null, null, true, null, this.regDate, null, null, null, komm_string, "Feilmargin: " + this.accuracy + "m");
          return SendObjectToServer(location, (function(data) {
            return _this.afterLocation(data, true, true);
          }), function(error) {
            return _this.onError(error);
          });
        }
      }
    } else {
      if (this.pointPictures().length > 0 || this.pointModels(this.m_dangerObs).point.length > 0) {
        location = new ObsLocation("", 33, this.long, this.lat, source, 0, this.omradeIdByCurrentHazard(), null, null, false, null, this.regDate, null, null, null, komm_string, "Feilmargin: " + this.accuracy + "m");
        return SendObjectToServer(location, (function(data) {
          return _this.afterLocation(data, false);
        }), function(error) {
          return _this.onError(error);
        });
      } else {
        this.callCallback();
        return main.showFinishedUploadMessage();
      }
    }
  };

  AbstractPackage.prototype.pointModels = function(models) {
    var area, model, point, pointModelName, _i, _len, _ref;
    point = [];
    area = [];
    pointModelName = ["SnowSurfaceObservation", "SnowCoverObs", "AvalancheActivityObs", "IceCoverObs", "IceThickness", "WaterLevel", "LandSlideObs"];
    for (_i = 0, _len = models.length; _i < _len; _i++) {
      model = models[_i];
      if (model.model && (_ref = model.model, __indexOf.call(pointModelName, _ref) >= 0)) {
        point.push(model);
      } else {
        area.push(model);
      }
    }
    return {
      "point": point,
      "area": area
    };
  };

  AbstractPackage.prototype.removeAreaModels = function() {
    var area;
    area = this.pointModels(this.m_dangerObs).area;
    return this.m_dangerObs = jQuery.grep(this.m_dangerObs, function(obs) {
      return !(__indexOf.call(area, obs) >= 0);
    });
  };

  AbstractPackage.prototype.removePointModels = function() {
    var points;
    points = this.pointModels(this.m_dangerObs).point;
    return this.m_dangerObs = jQuery.grep(this.m_dangerObs, function(obs) {
      return !(__indexOf.call(points, obs) >= 0);
    });
  };

  AbstractPackage.prototype.onAfterLocation = function(data, area, force) {
    var groupId, registration,
      _this = this;
    groupId = parseInt(this.groupId);
    if (groupId === 0) {
      groupId = void 0;
    }
    if (typeof this.regDate === "string") {
      this.regDate = new Date(this.regDate);
    }
    registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, this.regDate, this.competancy, groupId);
    return SendObjectToServer(registration, (function(data) {
      return _this.afterRegistration(data, area, force);
    }), function(error) {
      return _this.onError(error);
    });
  };

  AbstractPackage.prototype.cutOutPictures = function(area) {
    var erg, i, picture, _ref, _ref1;
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
        if ((_ref1 = picture.RegistrationTID) === 21 || _ref1 === 22 || _ref1 === 23 || _ref1 === 25 || _ref1 === 26 || _ref1 === 50 || _ref1 === 51 || _ref1 === 61 || _ref1 === 71) {
          erg.push(picture);
          this.m_pictures.splice(i, 1);
        } else {
          i++;
        }
      }
    }
    return erg;
  };

  AbstractPackage.prototype.areaPictures = function() {
    return this.filterPicture(true);
  };

  AbstractPackage.prototype.pointPictures = function() {
    return this.filterPicture(false);
  };

  AbstractPackage.prototype.filterPicture = function(area) {
    var picture, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3, _results, _results1;
    if (area) {
      _ref = this.m_pictures;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        picture = _ref[_i];
        if ((_ref1 = picture.RegistrationTID) !== 21 && _ref1 !== 22 && _ref1 !== 23 && _ref1 !== 25 && _ref1 !== 26 && _ref1 !== 50 && _ref1 !== 51 && _ref1 !== 61 && _ref1 !== 71) {
          _results.push(picture);
        }
      }
      return _results;
    } else {
      _ref2 = this.m_pictures;
      _results1 = [];
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        picture = _ref2[_j];
        if ((_ref3 = picture.RegistrationTID) === 21 || _ref3 === 22 || _ref3 === 23 || _ref3 === 25 || _ref3 === 26 || _ref3 === 50 || _ref3 === 51 || _ref3 === 61 || _ref3 === 71) {
          _results1.push(picture);
        }
      }
      return _results1;
    }
  };

  AbstractPackage.prototype.castedModel = function(obs, x) {
    console.log("casting model " + obs.model + " -> " + JSON.stringify(obs));
    if (obs.model) {
      obs = jQuery.extend(obs, eval("new " + obs.model + "()"));
      return obs;
    } else {
      return obs;
    }
  };

  return AbstractPackage;

})();
