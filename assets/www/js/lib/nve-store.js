// Generated by CoffeeScript 1.3.1
var ActivityInfluencedKD, ActivityInfluencedW, AllRegistrationsV, AreaUsageKD, AvalancheActivityObs, AvalancheActivityObsV, AvalancheDangerKD, AvalancheDangerObs, AvalancheDangerObsV, AvalancheEvaluation, AvalancheEvaluationV, AvalancheKD, AvalancheObs, AvalancheProblemKD, AvalanchePublisherKD, AvalancheTriggerKD, AvalancheWarning, AvalancheWarningInternalCommentsV, AvalancheWarningNoV, AvalancheWarningObsLocation, AvalancheWarningPublishedSummaryV, AvalancheWarningSummaryV, AvalancheWarningV, CompetenceLevelKD, CompetenceLevelW, ComprTestFractureKD, CompressionTest, CompressionTestKD, County, CriticalLayerKD, DamageExtentKD, DangerSignKD, DestructiveSizeKD, EstimatedNumKD, ForecastAccurateKD, ForecastRegionKD, ForecastRegionW, GeoHazardKD, IceLayerKD, IceThickness, IceThicknessLayer, Incident, IncidentNoV, IncidentURLs, IncidentV, LANGUAGE, Language, NveStore, ObsLocation, ObsLocationV, Observer, ObserverGroup, ObserverGroupMember, ObserverGroupMemberV, ObserverGroupObsLocationV, ObserverHazardsComp, ObserverHazardsCompW, ObserverLocationV, Picture, PictureV, PositionDetails, PrecipitationKD, PropagationKD, Registration, RegistrationKD, Result, SERVER_URL, SnowCoverObs, SnowCoverObsNoV, SnowCoverObsV, SnowDriftKD, SnowSurfaceKD, SnowSurfaceObservation, SnowSurfaceObservationV, StabilityEvalKD, SurfaceRoughnessKD, SurfaceWaterContentKD, TerrainStartZoneKD, UTMSourceKD, UsageFlagKD, WeatherObservation, WeatherObservationV;

SERVER_URL = "http://h-web01.nve.no/test_regobsservices/Odata.svc/";

LANGUAGE = 1;

NveStore = (function() {
  var m_avalancheDangerObs, m_incident, m_isLoggedIn, m_pictures, send;

  NveStore.name = 'NveStore';

  function NveStore() {}

  send = new NveSend;

  m_isLoggedIn = false;

  m_avalancheDangerObs = [];

  m_incident = null;

  m_pictures = [];

  NveStore.prototype.login = function(userName, userPassword) {
    return send.login(userName, userPassword, this.loginCallback);
  };

  NveStore.prototype.loginCallback = function(data) {
    main.loginCallback(data);
    return m_isLoggedIn = true;
  };

  NveStore.prototype.isLoggedIn = function() {
    return m_isLoggedIn;
  };

  NveStore.prototype.loggedInAs = function(callback) {
    return send.loggedInAs(callback);
  };

  NveStore.prototype.addObservation = function(obs) {
    return m_observations.push(obs);
  };

  NveStore.prototype.addAvalancheDangerObs = function(avaObs) {
    return m_avalancheDangerObs.push(avaObs);
  };

  NveStore.prototype.addPicture = function(picture) {
    return m_pictures.push(picture);
  };

  NveStore.prototype.getPictures = function() {
    return m_pictures;
  };

  NveStore.prototype.addIncident = function(incident) {
    return m_incident = incident;
  };

  NveStore.prototype.getIncident = function() {
    return m_incident;
  };

  NveStore.prototype.getObservations = function() {
    return m_observations;
  };

  NveStore.prototype.addRegistration = function(registration, callback) {
    return send.addRegistration(registration, callback);
  };

  /*
  	getDangerSign: (callback) ->
  		send.getDangerSign(callback)
  */


  NveStore.prototype.getObjectFromServer = function(call, callback) {
    return send.getObjectFromServer(call, callback);
  };

  NveStore.prototype.sendAll = function() {
    var location;
    if (main.login === null || main.login.data === null) {
      alert('login');
      return;
    }
    location = new ObsLocation($("position_header_town").innerHTML, 33, snow_page.longitude, snow_page.latitute, 0, 0, 0, 250, 250, false, null, new Date());
    return send.sendObjectToServer(location, this.zweiter);
  };

  NveStore.prototype.zweiter = function(data) {
    var registration;
    registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date(), 0);
    return send.sendObjectToServer(registration, main.store.calli);
  };

  NveStore.prototype.sendObjectToServer = function(obj, callback) {
    return this.send.sendObjectToServer(obj, callback);
  };

  NveStore.prototype.calli = function(data) {
    var i, obs, picture, _fn, _fn1, _i, _j, _len, _len1;
    i = 0;
    _fn = function(obs) {
      obs.RegID = data.RegID;
      obs.AvalancheDangerObsID = i++;
      return send.sendObjectToServer(obs, main.store.p);
    };
    for (_i = 0, _len = m_avalancheDangerObs.length; _i < _len; _i++) {
      obs = m_avalancheDangerObs[_i];
      _fn(obs);
    }
    m_avalancheDangerObs.length = 0;
    if (m_incident) {
      m_incident.RegID = data.RegID;
      send.sendObjectToServer(m_incident, main.store.p);
      m_incident = null;
    }
    i = 0;
    _fn1 = function(picture) {
      picture.RegID = data.RegID;
      picture.PictureID = i++;
      return send.sendObjectToServer(picture, main.store.p);
    };
    for (_j = 0, _len1 = m_pictures.length; _j < _len1; _j++) {
      picture = m_pictures[_j];
      _fn1(picture);
    }
    m_pictures.length = 0;
    snow_hendelse.afterSendRegistration();
    snow_page.afterSendRegistration();
    return alert('Takk for observasjon');
  };

  NveStore.prototype.p = function(data) {};

  return NveStore;

})();

Result = (function() {

  Result.name = 'Result';

  function Result() {
    this.ok = false;
    this.data = null;
  }

  Result.prototype.isOk = function() {
    return this.ok;
  };

  return Result;

})();

Registration = (function() {

  Registration.name = 'Registration';

  Registration.prototype.url = "" + SERVER_URL + "Registration";

  function Registration(ObserverID, ObsLocationID, DtRegTime, DtObsTime, CompetenceLevelTID, ObserverGroupID, Comment) {
    this.ObserverID = ObserverID;
    this.ObsLocationID = ObsLocationID;
    this.DtRegTime = DtRegTime;
    this.DtObsTime = DtObsTime;
    this.CompetenceLevelTID = CompetenceLevelTID;
    this.ObserverGroupID = ObserverGroupID;
    this.Comment = Comment;
  }

  return Registration;

})();

ActivityInfluencedKD = (function() {

  ActivityInfluencedKD.name = 'ActivityInfluencedKD';

  function ActivityInfluencedKD() {}

  ActivityInfluencedKD.prototype.url = "" + SERVER_URL + "Language(" + LANGUAGE + ")/ActivityInfluencedKD";

  return ActivityInfluencedKD;

})();

AreaUsageKD = (function() {

  AreaUsageKD.name = 'AreaUsageKD';

  AreaUsageKD.prototype.url = "" + SERVER_URL + "AreaUsageKD";

  function AreaUsageKD(LangKey, AreaUsageName, AreaUsageDescr, Language) {
    this.LangKey = LangKey;
    this.AreaUsageName = AreaUsageName;
    this.AreaUsageDescr = AreaUsageDescr;
    this.Language = Language;
  }

  return AreaUsageKD;

})();

/*
?text=&geometry=75793,6814257&geometryType=esriGeometryPoint&
inSR=32633&spatialRel=esriSpatialRelIntersects&
relationParam=&objectIds=&where=&time=&
returnCountOnly=false&returnIdsOnly=false&
returnGeometry=false&maxAllowableOffset=&
outSR=&outFields=*&f=pjson
*/


PositionDetails = (function() {

  PositionDetails.name = 'PositionDetails';

  PositionDetails.prototype.url = "";

  function PositionDetails(Lat, Long) {
    this.Lat = Lat;
    this.Long = Long;
    this.url = "http://gis.nve.no/ArcGIS/rest/services/Mapservices/Bakgrunnsdata/MapServer/36/query?text=&geometry=" + Long + "," + Lat + "&geometryType=esriGeometryPoint&inSR=32633&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=false&maxAllowableOffset=&outSR=&outFields=*&f=pjson";
  }

  return PositionDetails;

})();

AvalancheActivityObs = (function() {

  AvalancheActivityObs.name = 'AvalancheActivityObs';

  AvalancheActivityObs.prototype.url = "" + SERVER_URL + "AvalancheActivityObs";

  function AvalancheActivityObs(RegID, Aspect, HeigthStartZone, DestructiveSizeTID, EstimatedNumTID, AvalancheTID, AvalancheTriggerTID, TerrainStartZoneTID, DtAvalancheTime, SnowLine, UsageFlagTID, Comment) {
    this.RegID = RegID;
    this.Aspect = Aspect;
    this.HeigthStartZone = HeigthStartZone;
    this.DestructiveSizeTID = DestructiveSizeTID;
    this.EstimatedNumTID = EstimatedNumTID;
    this.AvalancheTID = AvalancheTID;
    this.AvalancheTriggerTID = AvalancheTriggerTID;
    this.TerrainStartZoneTID = TerrainStartZoneTID;
    this.DtAvalancheTime = DtAvalancheTime;
    this.SnowLine = SnowLine;
    this.UsageFlagTID = UsageFlagTID;
    this.Comment = Comment;
  }

  return AvalancheActivityObs;

})();

AvalancheDangerKD = (function() {

  AvalancheDangerKD.name = 'AvalancheDangerKD';

  AvalancheDangerKD.prototype.url = "" + SERVER_URL + "AvalancheDangerKD";

  function AvalancheDangerKD(LangKey, AvalancheDangerName, AvalancheDangerDescr, Language) {
    this.LangKey = LangKey;
    this.AvalancheDangerName = AvalancheDangerName;
    this.AvalancheDangerDescr = AvalancheDangerDescr;
    this.Language = Language;
  }

  return AvalancheDangerKD;

})();

AvalancheDangerObs = (function() {

  AvalancheDangerObs.name = 'AvalancheDangerObs';

  AvalancheDangerObs.prototype.url = "" + SERVER_URL + "AvalancheDangerObs";

  function AvalancheDangerObs(AvalancheDangerObsID, RegID, DangerSignTID, UsageFlagTID, Comment) {
    this.AvalancheDangerObsID = AvalancheDangerObsID;
    this.RegID = RegID;
    this.DangerSignTID = DangerSignTID;
    this.UsageFlagTID = UsageFlagTID;
    this.Comment = Comment;
  }

  return AvalancheDangerObs;

})();

/*
class AvalancheEvaluation

"RegID": 879,
"CanPublish": true,
"AvalancheDangerTID": 3,
"ValidExposition": "00000001",
"ValidHeightRelative": "111",
"ValidHeightFrom": null,
"ValidHeigtTo": null,
"AvalancheProblemTID1": 2,
"AvalancheProblemTID2": 3,
"AvalancheProblemTID3": 4,
"UsageFlagTID": 0,
"AvalancheEvaluation1": "Partnerforum:Invitasjon til spesialseminar om beredskap ut fra et forskningsperspektiv \r\n\r\nNVE har en viktig beredskapsfunksjon i samfunnet. Gjennom dette seminaret �nsker vi � gi �p�fyll� og stimulere til videreutvikling av v�rt beredskapsarbeid.",
"InternalComment": "Dette er hemmelig.",
"Comment"
*/


AvalancheEvaluation = (function() {

  AvalancheEvaluation.name = 'AvalancheEvaluation';

  AvalancheEvaluation.prototype.url = "" + SERVER_URL + "AvalancheEvaluation";

  function AvalancheEvaluation(RegID, CanPublish, AvalancheDangerTID, ValidExposition, ValidHeightRelative, ValidHeightFrom, ValidHeigtTo, AvalancheProblemTID1, AvalancheProblemTID2, AvalancheProblemTID3, UsageFlagTID, AvalancheEvaluation1, InternalComment, Comment) {
    this.RegID = RegID;
    this.CanPublish = CanPublish;
    this.AvalancheDangerTID = AvalancheDangerTID;
    this.ValidExposition = ValidExposition;
    this.ValidHeightRelative = ValidHeightRelative;
    this.ValidHeightFrom = ValidHeightFrom;
    this.ValidHeigtTo = ValidHeigtTo;
    this.AvalancheProblemTID1 = AvalancheProblemTID1;
    this.AvalancheProblemTID2 = AvalancheProblemTID2;
    this.AvalancheProblemTID3 = AvalancheProblemTID3;
    this.UsageFlagTID = UsageFlagTID;
    this.AvalancheEvaluation1 = AvalancheEvaluation1;
    this.InternalComment = InternalComment;
    this.Comment = Comment;
  }

  return AvalancheEvaluation;

})();

AvalancheKD = (function() {

  AvalancheKD.name = 'AvalancheKD';

  function AvalancheKD() {}

  return AvalancheKD;

})();

AvalancheObs = (function() {

  AvalancheObs.name = 'AvalancheObs';

  function AvalancheObs() {}

  return AvalancheObs;

})();

AvalancheProblemKD = (function() {

  AvalancheProblemKD.name = 'AvalancheProblemKD';

  function AvalancheProblemKD() {}

  return AvalancheProblemKD;

})();

AvalanchePublisherKD = (function() {

  AvalanchePublisherKD.name = 'AvalanchePublisherKD';

  function AvalanchePublisherKD() {}

  return AvalanchePublisherKD;

})();

AvalancheTriggerKD = (function() {

  AvalancheTriggerKD.name = 'AvalancheTriggerKD';

  function AvalancheTriggerKD() {}

  return AvalancheTriggerKD;

})();

AvalancheWarning = (function() {

  AvalancheWarning.name = 'AvalancheWarning';

  function AvalancheWarning() {}

  return AvalancheWarning;

})();

CompetenceLevelKD = (function() {

  CompetenceLevelKD.name = 'CompetenceLevelKD';

  function CompetenceLevelKD() {}

  return CompetenceLevelKD;

})();

CompressionTest = (function() {

  CompressionTest.name = 'CompressionTest';

  function CompressionTest() {}

  return CompressionTest;

})();

CompressionTestKD = (function() {

  CompressionTestKD.name = 'CompressionTestKD';

  function CompressionTestKD() {}

  return CompressionTestKD;

})();

ComprTestFractureKD = (function() {

  ComprTestFractureKD.name = 'ComprTestFractureKD';

  function ComprTestFractureKD() {}

  return ComprTestFractureKD;

})();

CriticalLayerKD = (function() {

  CriticalLayerKD.name = 'CriticalLayerKD';

  function CriticalLayerKD() {}

  return CriticalLayerKD;

})();

DamageExtentKD = (function() {

  DamageExtentKD.name = 'DamageExtentKD';

  function DamageExtentKD() {}

  DamageExtentKD.prototype.url = "" + SERVER_URL + "Language(" + LANGUAGE + ")/DamageExtentKD";

  return DamageExtentKD;

})();

DangerSignKD = (function() {

  DangerSignKD.name = 'DangerSignKD';

  function DangerSignKD() {}

  DangerSignKD.prototype.url = "" + SERVER_URL + "Language(" + LANGUAGE + ")/DangerSignKD";

  return DangerSignKD;

})();

DestructiveSizeKD = (function() {

  DestructiveSizeKD.name = 'DestructiveSizeKD';

  function DestructiveSizeKD() {}

  return DestructiveSizeKD;

})();

EstimatedNumKD = (function() {

  EstimatedNumKD.name = 'EstimatedNumKD';

  function EstimatedNumKD() {}

  return EstimatedNumKD;

})();

ForecastAccurateKD = (function() {

  ForecastAccurateKD.name = 'ForecastAccurateKD';

  function ForecastAccurateKD() {}

  return ForecastAccurateKD;

})();

ForecastRegionKD = (function() {

  ForecastRegionKD.name = 'ForecastRegionKD';

  function ForecastRegionKD() {}

  return ForecastRegionKD;

})();

GeoHazardKD = (function() {

  GeoHazardKD.name = 'GeoHazardKD';

  function GeoHazardKD() {}

  return GeoHazardKD;

})();

IceLayerKD = (function() {

  IceLayerKD.name = 'IceLayerKD';

  function IceLayerKD() {}

  return IceLayerKD;

})();

IceThickness = (function() {

  IceThickness.name = 'IceThickness';

  function IceThickness() {}

  return IceThickness;

})();

IceThicknessLayer = (function() {

  IceThicknessLayer.name = 'IceThicknessLayer';

  function IceThicknessLayer() {}

  return IceThicknessLayer;

})();

/*
class Incident

"RegID": 689,
"GeoHazardTID": 0,
"ActivityInfluencedTID": 120,
"DamageExtentTID": 0,
"ForecastAccurateTID": 0,
"DtEndTime": null,
"IncidentHeader": "Jj",
"IncidentIngress": "Jjjjj",
"IncidentText": "Kdkdjj",
"SensitiveText": null,
"UsageFlagTID": null,
"Comment": "Bekk",
*/


Incident = (function() {

  Incident.name = 'Incident';

  Incident.prototype.url = "" + SERVER_URL + "Incident";

  function Incident(RegID, GeoHazardTID, ActivityInfluencedTID, DamageExtentTID, ForecastAccurateTID, DtEndTime, IncidentHeader, IncidentIngress, IncidentText, SensitiveText, UsageFlagTID, Comment) {
    this.RegID = RegID;
    this.GeoHazardTID = GeoHazardTID;
    this.ActivityInfluencedTID = ActivityInfluencedTID;
    this.DamageExtentTID = DamageExtentTID;
    this.ForecastAccurateTID = ForecastAccurateTID;
    this.DtEndTime = DtEndTime;
    this.IncidentHeader = IncidentHeader;
    this.IncidentIngress = IncidentIngress;
    this.IncidentText = IncidentText;
    this.SensitiveText = SensitiveText;
    this.UsageFlagTID = UsageFlagTID;
    this.Comment = Comment;
  }

  return Incident;

})();

IncidentURLs = (function() {

  IncidentURLs.name = 'IncidentURLs';

  function IncidentURLs() {}

  return IncidentURLs;

})();

Language = (function() {

  Language.name = 'Language';

  function Language() {}

  return Language;

})();

Observer = (function() {

  Observer.name = 'Observer';

  function Observer() {}

  return Observer;

})();

ObserverGroup = (function() {

  ObserverGroup.name = 'ObserverGroup';

  function ObserverGroup() {}

  return ObserverGroup;

})();

ObserverGroupMember = (function() {

  ObserverGroupMember.name = 'ObserverGroupMember';

  function ObserverGroupMember() {}

  return ObserverGroupMember;

})();

ObserverHazardsComp = (function() {

  ObserverHazardsComp.name = 'ObserverHazardsComp';

  function ObserverHazardsComp() {}

  return ObserverHazardsComp;

})();

/*
class ObsLocation

"LocationName": "Ikke Ekornbakken 30",
"UTMZone": 33,
"UTMEast": 103222,
"UTMNorth": 6982346,
"UTMSourceTID": 20,
"AreaUsageTID": null,
"ForecastRegionTID": 0,
"HeigthMax": 250,
"HeigthMin": 250,
"Area": false,
"HeigthTreeLine": null,
"DtRegTime": "/Date(1291458888000)/",
"AreaSize": null,
"SlopeAngel": null,
"SlopeDirection": null,
"MunicipalNo": "1502",
"LocationDescription": null,
"Comment": null,
*/


ObsLocation = (function() {

  ObsLocation.name = 'ObsLocation';

  ObsLocation.prototype.url = "" + SERVER_URL + "ObsLocation";

  function ObsLocation(LocationName, UTMZone, UTMEast, UTMNorth, UTMSourceTID, AreaUsageTID, ForecastRegionTID, HeigthMax, HeigthMin, Area, HeigthTreeLine, DtRegTime, AreaSize, SlopeAngel, SlopeDirection, MunicipalNo, Comment) {
    this.LocationName = LocationName;
    this.UTMZone = UTMZone;
    this.UTMEast = UTMEast;
    this.UTMNorth = UTMNorth;
    this.UTMSourceTID = UTMSourceTID;
    this.AreaUsageTID = AreaUsageTID;
    this.ForecastRegionTID = ForecastRegionTID;
    this.HeigthMax = HeigthMax;
    this.HeigthMin = HeigthMin;
    this.Area = Area;
    this.HeigthTreeLine = HeigthTreeLine;
    this.DtRegTime = DtRegTime;
    this.AreaSize = AreaSize;
    this.SlopeAngel = SlopeAngel;
    this.SlopeDirection = SlopeDirection;
    this.MunicipalNo = MunicipalNo;
    this.Comment = Comment;
  }

  return ObsLocation;

})();

Picture = (function() {

  Picture.name = 'Picture';

  Picture.prototype.url = "" + SERVER_URL + "Picture";

  function Picture(PictureID, RegID, PictureImage, Photographer, Copyright, Aspect, Comment) {
    this.PictureID = PictureID;
    this.RegID = RegID;
    this.PictureImage = PictureImage;
    this.Photographer = Photographer;
    this.Copyright = Copyright;
    this.Aspect = Aspect;
    this.Comment = Comment;
  }

  return Picture;

})();

PrecipitationKD = (function() {

  PrecipitationKD.name = 'PrecipitationKD';

  function PrecipitationKD() {}

  return PrecipitationKD;

})();

PropagationKD = (function() {

  PropagationKD.name = 'PropagationKD';

  function PropagationKD() {}

  return PropagationKD;

})();

RegistrationKD = (function() {

  RegistrationKD.name = 'RegistrationKD';

  function RegistrationKD() {}

  return RegistrationKD;

})();

SnowCoverObs = (function() {

  SnowCoverObs.name = 'SnowCoverObs';

  function SnowCoverObs() {}

  return SnowCoverObs;

})();

SnowDriftKD = (function() {

  SnowDriftKD.name = 'SnowDriftKD';

  function SnowDriftKD() {}

  return SnowDriftKD;

})();

SnowSurfaceKD = (function() {

  SnowSurfaceKD.name = 'SnowSurfaceKD';

  function SnowSurfaceKD() {}

  return SnowSurfaceKD;

})();

SnowSurfaceObservation = (function() {

  SnowSurfaceObservation.name = 'SnowSurfaceObservation';

  function SnowSurfaceObservation() {}

  return SnowSurfaceObservation;

})();

StabilityEvalKD = (function() {

  StabilityEvalKD.name = 'StabilityEvalKD';

  function StabilityEvalKD() {}

  return StabilityEvalKD;

})();

SurfaceRoughnessKD = (function() {

  SurfaceRoughnessKD.name = 'SurfaceRoughnessKD';

  function SurfaceRoughnessKD() {}

  return SurfaceRoughnessKD;

})();

SurfaceWaterContentKD = (function() {

  SurfaceWaterContentKD.name = 'SurfaceWaterContentKD';

  function SurfaceWaterContentKD() {}

  return SurfaceWaterContentKD;

})();

TerrainStartZoneKD = (function() {

  TerrainStartZoneKD.name = 'TerrainStartZoneKD';

  function TerrainStartZoneKD() {}

  return TerrainStartZoneKD;

})();

UsageFlagKD = (function() {

  UsageFlagKD.name = 'UsageFlagKD';

  function UsageFlagKD() {}

  return UsageFlagKD;

})();

UTMSourceKD = (function() {

  UTMSourceKD.name = 'UTMSourceKD';

  function UTMSourceKD() {}

  return UTMSourceKD;

})();

WeatherObservation = (function() {

  WeatherObservation.name = 'WeatherObservation';

  function WeatherObservation() {}

  return WeatherObservation;

})();

ActivityInfluencedW = (function() {

  ActivityInfluencedW.name = 'ActivityInfluencedW';

  function ActivityInfluencedW() {}

  return ActivityInfluencedW;

})();

AvalancheDangerObsV = (function() {

  AvalancheDangerObsV.name = 'AvalancheDangerObsV';

  function AvalancheDangerObsV() {}

  return AvalancheDangerObsV;

})();

AvalancheEvaluationV = (function() {

  AvalancheEvaluationV.name = 'AvalancheEvaluationV';

  function AvalancheEvaluationV() {}

  return AvalancheEvaluationV;

})();

AvalancheWarningV = (function() {

  AvalancheWarningV.name = 'AvalancheWarningV';

  function AvalancheWarningV() {}

  return AvalancheWarningV;

})();

CompetenceLevelW = (function() {

  CompetenceLevelW.name = 'CompetenceLevelW';

  function CompetenceLevelW() {}

  return CompetenceLevelW;

})();

ForecastRegionW = (function() {

  ForecastRegionW.name = 'ForecastRegionW';

  function ForecastRegionW() {}

  return ForecastRegionW;

})();

IncidentNoV = (function() {

  IncidentNoV.name = 'IncidentNoV';

  function IncidentNoV() {}

  return IncidentNoV;

})();

IncidentV = (function() {

  IncidentV.name = 'IncidentV';

  function IncidentV() {}

  return IncidentV;

})();

ObserverHazardsCompW = (function() {

  ObserverHazardsCompW.name = 'ObserverHazardsCompW';

  function ObserverHazardsCompW() {}

  return ObserverHazardsCompW;

})();

ObserverLocationV = (function() {

  ObserverLocationV.name = 'ObserverLocationV';

  function ObserverLocationV() {}

  return ObserverLocationV;

})();

PictureV = (function() {

  PictureV.name = 'PictureV';

  function PictureV() {}

  return PictureV;

})();

SnowCoverObsNoV = (function() {

  SnowCoverObsNoV.name = 'SnowCoverObsNoV';

  function SnowCoverObsNoV() {}

  return SnowCoverObsNoV;

})();

SnowCoverObsV = (function() {

  SnowCoverObsV.name = 'SnowCoverObsV';

  function SnowCoverObsV() {}

  return SnowCoverObsV;

})();

SnowSurfaceObservationV = (function() {

  SnowSurfaceObservationV.name = 'SnowSurfaceObservationV';

  function SnowSurfaceObservationV() {}

  return SnowSurfaceObservationV;

})();

WeatherObservationV = (function() {

  WeatherObservationV.name = 'WeatherObservationV';

  function WeatherObservationV() {}

  return WeatherObservationV;

})();

AvalancheWarningSummaryV = (function() {

  AvalancheWarningSummaryV.name = 'AvalancheWarningSummaryV';

  function AvalancheWarningSummaryV() {}

  return AvalancheWarningSummaryV;

})();

AllRegistrationsV = (function() {

  AllRegistrationsV.name = 'AllRegistrationsV';

  function AllRegistrationsV() {}

  return AllRegistrationsV;

})();

ObserverGroupObsLocationV = (function() {

  ObserverGroupObsLocationV.name = 'ObserverGroupObsLocationV';

  function ObserverGroupObsLocationV() {}

  return ObserverGroupObsLocationV;

})();

ObserverGroupMemberV = (function() {

  ObserverGroupMemberV.name = 'ObserverGroupMemberV';

  function ObserverGroupMemberV() {}

  return ObserverGroupMemberV;

})();

AvalancheActivityObsV = (function() {

  AvalancheActivityObsV.name = 'AvalancheActivityObsV';

  function AvalancheActivityObsV() {}

  return AvalancheActivityObsV;

})();

AvalancheWarningNoV = (function() {

  AvalancheWarningNoV.name = 'AvalancheWarningNoV';

  function AvalancheWarningNoV() {}

  return AvalancheWarningNoV;

})();

AvalancheWarningInternalCommentsV = (function() {

  AvalancheWarningInternalCommentsV.name = 'AvalancheWarningInternalCommentsV';

  function AvalancheWarningInternalCommentsV() {}

  return AvalancheWarningInternalCommentsV;

})();

AvalancheWarningObsLocation = (function() {

  AvalancheWarningObsLocation.name = 'AvalancheWarningObsLocation';

  function AvalancheWarningObsLocation() {}

  return AvalancheWarningObsLocation;

})();

County = (function() {

  County.name = 'County';

  function County() {}

  return County;

})();

AvalancheWarningPublishedSummaryV = (function() {

  AvalancheWarningPublishedSummaryV.name = 'AvalancheWarningPublishedSummaryV';

  function AvalancheWarningPublishedSummaryV() {}

  return AvalancheWarningPublishedSummaryV;

})();

ObsLocationV = (function() {

  ObsLocationV.name = 'ObsLocationV';

  function ObsLocationV() {}

  return ObsLocationV;

})();
