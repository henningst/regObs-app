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

  AllRegistrationsVUrlGenerator.prototype.baseurl = "http://h-web01.nve.no/stage_regobsservices/Atom/AllRegistrationsV?";

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
    this.urlGenerator = urlGenerator;
    this.entryToObservationView = __bind(this.entryToObservationView, this);

    this.fetchedDataHandler = __bind(this.fetchedDataHandler, this);

    this.getObservations = __bind(this.getObservations, this);

  }

  ObservationFetcher.prototype.getObservations = function(callback) {
    console.log("calling" + this.urlGenerator.url());
    return jQuery.ajax({
      type: "GET",
      cache: false,
      url: this.urlGenerator.url(),
      dataType: "text",
      success: this.fetchedDataHandler(callback),
      error: function(e) {
        return console.log("failed " + (JSON.stringify(e)));
      }
    });
  };

  ObservationFetcher.prototype.fetchedDataHandler = function(callback) {
    var _this = this;
    return function(data) {
      var obs, xml;
      xml = jQuery.parseXML(data);
      console.log("fetched data " + jQuery(xml).find("entry").length);
      obs = _this.entryToObservationView(jQuery(xml).find("entry"));
      return callback(obs);
    };
  };

  ObservationFetcher.prototype.entryToObservationView = function(entrys) {
    var _this = this;
    return jQuery.map(entrys, function(e) {
      var author, content, entry, updated, url;
      entry = jQuery(e);
      author = entry.find("author").text().trim();
      updated = entry.find("updated").text().trim();
      url = entry.find("link").attr("href");
      content = entry.find("title").text().trim();
      return new ObservationView(author, updated, url, content);
    });
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

  function ObservationViewRendrer(domNode, listOfView) {
    this.domNode = domNode;
    this.listOfView = listOfView;
  }

  ObservationViewRendrer.prototype.render = function() {
    jQuery(this.domNode).html("");
    jQuery(this.domNode).html(Handlebars.templates.viewList({
      list: this.listOfView
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
