// Generated by CoffeeScript 1.3.3
var AllRegistrationsVUrlGenerator, FullViewRenderer, ObservationFetcher, ObservationView, ObservationViewRendrer,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ObservationView = (function() {

  function ObservationView(author, updated, url, content) {
    this.author = author;
    this.updated = updated;
    this.url = url;
    this.content = content;
  }

  return ObservationView;

})();

AllRegistrationsVUrlGenerator = (function() {

  AllRegistrationsVUrlGenerator.prototype.baseurl = "" + SERVER_URL + "AllRegistrationsV?";

  AllRegistrationsVUrlGenerator.prototype.queryString = "$filter=LangKey eq %LANGUAGE% and UTMEast gt %UTM_EAST_MIN% and UTMEast lt %UTM_EAST_MAX% and UTMNorth le %UTM_NORTH_MAX% and UTMNorth gt %UTM_NORTH_MIN% and GeoHazardTID eq %GEOHAZARDTID%&$orderby=RegID desc";

  AllRegistrationsVUrlGenerator.prototype.diameter = function() {
    return main.getObservationSearchDiameter();
  };

  function AllRegistrationsVUrlGenerator(currentPosition, geoHazard) {
    this.currentPosition = currentPosition;
    this.geoHazard = geoHazard;
  }

  AllRegistrationsVUrlGenerator.prototype.url = function() {
    var currentUrl;
    currentUrl = this.queryString.replace("%UTM_EAST_MIN%", this.currentPosition.east - this.radius()).replace("%UTM_EAST_MAX%", this.currentPosition.east + this.radius()).replace("%UTM_NORTH_MIN%", this.currentPosition.north - this.radius()).replace("%UTM_NORTH_MAX%", this.currentPosition.north + this.radius()).replace("%GEOHAZARDTID%", this.geoHazard).replace("%LANGUAGE%", LANGUAGE);
    return this.baseurl + currentUrl;
  };

  AllRegistrationsVUrlGenerator.prototype.radius = function() {
    return this.diameter() / 2;
  };

  AllRegistrationsVUrlGenerator.prototype.setPos = function(currentPosition) {
    this.currentPosition = currentPosition;
  };

  return AllRegistrationsVUrlGenerator;

})();

ObservationFetcher = (function() {

  function ObservationFetcher(urlGenerator) {
    var data, reg, _i, _len, _ref;
    this.urlGenerator = urlGenerator;
    this.entryToObservationView = __bind(this.entryToObservationView, this);

    this.fetchedDataHandler = __bind(this.fetchedDataHandler, this);

    this.getObservations = __bind(this.getObservations, this);

    this.regType = {};
    data = DataAccess.get(RegistrationKD.name);
    _ref = data.results;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      reg = _ref[_i];
      this.regType[reg.RegistrationTID] = reg.RegistrationName;
    }
  }

  ObservationFetcher.prototype.getObservations = function(callback) {
    return jQuery.ajax({
      type: "GET",
      cache: false,
      url: this.urlGenerator.url(),
      dataType: "json",
      success: this.fetchedDataHandler(callback),
      error: function(e) {
        return console.log("failed " + (JSON.stringify(e)));
      }
    });
  };

  ObservationFetcher.prototype.fetchedDataHandler = function(callback) {
    var _this = this;
    return function(data) {
      var obs;
      obs = _this.entryToObservationView(data.d.results);
      return callback(obs);
    };
  };

  ObservationFetcher.prototype.entryToObservationView = function(entrys) {
    var _this = this;
    return jQuery.map(entrys, function(e) {
      var author, content, entry, updated, url;
      entry = e;
      console.log("handling " + JSON.stringify(entry));
      console.log(entry);
      author = entry.NickName;
      updated = _this.localDateString(_this.toDate(entry.DtObsTime));
      url = "" + WEB_LINK_URL + "Registration?regId=" + entry.RegID;
      content = new Handlebars.SafeString("<strong>" + updated + ", " + entry.RegistrationName + ", " + (_this.trim(entry.TypicalValue1)) + ", " + (_this.trim(entry.TypicalValue2)) + ".</strong> " + (_this.toRegistrationType(entry.RegistrationTID)) + " ved (" + entry.ForecastRegionName + "/" + entry.Kommunenavn + ") <i>" + author + "</i>");
      return new ObservationView(author, updated, url, content);
    });
  };

  ObservationFetcher.prototype.toDate = function(dateString) {
    var time;
    time = dateString.replace("/Date(", "").replace(")/", "");
    return new Date(parseInt(time));
  };

  ObservationFetcher.prototype.localDateString = function(date) {
    var day, hour, minute, month, sec, year;
    day = this.padZero(date.getUTCDate());
    month = this.padZero(parseInt(date.getUTCMonth()) + 1);
    year = this.padZero(date.getUTCFullYear());
    hour = this.padZero(date.getUTCHours());
    minute = this.padZero(date.getUTCMinutes());
    sec = date.getUTCSeconds();
    return "" + day + "." + month + "." + year + " " + hour + ":" + minute + ":" + sec;
  };

  ObservationFetcher.prototype.padZero = function(text) {
    var number;
    number = parseInt(text);
    if (number < 10) {
      return "0" + number;
    } else {
      return number;
    }
  };

  ObservationFetcher.prototype.trim = function(text) {
    if (text === null) {
      return "";
    } else {
      return text.replace(/^\s+|\s+$/g, "");
    }
  };

  ObservationFetcher.prototype.toRegistrationType = function(tid) {
    return this.registrationType(tid);
  };

  ObservationFetcher.prototype.registrationType = function(tid) {
    if (this.regType[tid] === null) {
      return "";
    } else {
      return this.regType[tid];
    }
  };

  return ObservationFetcher;

})();

FullViewRenderer = (function() {

  function FullViewRenderer(domNode, url) {
    this.domNode = domNode;
    this.url = url;
  }

  FullViewRenderer.prototype.render = function() {
    return jQuery(this.domNode).html(Handlebars.templates.fullView({
      url: this.url
    }));
  };

  FullViewRenderer.prototype.setUrl = function(url) {
    this.url = url;
  };

  return FullViewRenderer;

})();

ObservationViewRendrer = (function() {

  function ObservationViewRendrer(domNode, listOfView, handler) {
    this.domNode = domNode;
    this.listOfView = listOfView;
    this.handler = handler;
  }

  ObservationViewRendrer.prototype.render = function() {
    jQuery(this.domNode).html("");
    jQuery(this.domNode).html(Handlebars.templates.viewList({
      list: this.listOfView,
      map_handler: this.handler,
      scrollerid: "" + this.domNode + "_scroller_id"
    }));
    main.resetHeights();
    return jQuery(this.domNode).find("li").click(function() {
      var url;
      url = jQuery(this).attr("data-url");
      window.plugins.childBrowser.onClose = function() {};
      return window.plugins.childBrowser.showWebPage(url);
    });
  };

  ObservationViewRendrer.prototype.setListOfView = function(listOfView) {
    this.listOfView = listOfView;
  };

  return ObservationViewRendrer;

})();
