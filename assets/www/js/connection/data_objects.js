// Generated by CoffeeScript 1.3.3
var ActivityInfluencedKD, ActivityInfluencedW, AllRegistrationsV, AreaInformation, AreaUsageKD, AutoCastable, AvalancheActivityObs, AvalancheActivityObsV, AvalancheDangerKD, AvalancheDangerObs, AvalancheDangerObsV, AvalancheEvaluation, AvalancheEvaluationV, AvalancheKD, AvalancheObs, AvalancheProblemKD, AvalanchePublisherKD, AvalancheTriggerKD, AvalancheWarning, AvalancheWarningInternalCommentsV, AvalancheWarningNoV, AvalancheWarningObsLocation, AvalancheWarningPublishedSummaryV, AvalancheWarningSummaryV, AvalancheWarningV, Competancy, CompetenceLevelKD, CompetenceLevelW, ComprTestFractureKD, CompressionTest, CompressionTestKD, County, CriticalLayerKD, DamageExtentKD, DangerObs, DangerSignKD, DestructiveSizeKD, EstimatedNumKD, EventedModel, ForecastAccurateKD, ForecastRegionKD, ForecastRegionW, GeoHazardKD, Group, IceLayerKD, IceThickness, IceThicknessLayer, Incident, IncidentNoV, IncidentURLs, IncidentV, LandSlideKD, LandSlideObs, LandSlideSizeKD, LandSlideTriggerKD, Language, ObsLocation, ObsLocationV, Observation, Observer, ObserverCompetancy, ObserverGroup, ObserverGroupMember, ObserverGroupMemberV, ObserverGroupObsLocationV, ObserverHazardsComp, ObserverHazardsCompW, ObserverLocationV, Picture, PictureV, PositionDetails, PrecipitationKD, PropagationKD, Registration, RegistrationKD, Result, SendEmail, SnowCoverObs, SnowCoverObsNoV, SnowCoverObsV, SnowDriftKD, SnowSurfaceKD, SnowSurfaceObservation, SnowSurfaceObservationV, StabilityEvalKD, SurfaceRoughnessKD, SurfaceWaterContentKD, TerrainStartZoneKD, UTMSourceKD, UsageFlagKD, User, WaterLevel, WaterLevelRefKD, WeatherObservation, WeatherObservationV,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

EventedModel = (function() {

  function EventedModel() {}

  EventedModel.prototype.setRegDate = function(date) {};

  EventedModel.prototype.beforeSend = function(index) {};

  return EventedModel;

})();

AutoCastable = (function(_super) {

  __extends(AutoCastable, _super);

  function AutoCastable() {
    return AutoCastable.__super__.constructor.apply(this, arguments);
  }

  AutoCastable.prototype.model = void 0;

  return AutoCastable;

})(EventedModel);

Observation = (function(_super) {

  __extends(Observation, _super);

  function Observation() {
    return Observation.__super__.constructor.apply(this, arguments);
  }

  return Observation;

})(AutoCastable);

Result = (function() {

  function Result() {
    this.ok = false;
    this.data = null;
  }

  Result.prototype.isOk = function() {
    return this.ok;
  };

  return Result;

})();

User = (function() {

  function User(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.groups = [];
    this.competancy = new ObserverCompetancy([]);
  }

  User.prototype.isDefined = function() {
    if (this.username !== null && this.password !== null) {
      if (this.username.length !== 0 || this.password.length !== 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return User;

})();

Group = (function() {

  function Group(id, name) {
    this.id = id;
    this.name = name;
  }

  return Group;

})();

ObserverCompetancy = (function() {

  function ObserverCompetancy(competancy) {
    this.competancy = competancy;
    this.length = __bind(this.length, this);

    this.push = __bind(this.push, this);

    this.getLevel = __bind(this.getLevel, this);

  }

  ObserverCompetancy.prototype.getLevel = function(geoHazard) {
    var res,
      _this = this;
    res = this.competancy.filter(function(comp) {
      return comp.geoHazard === geoHazard;
    });
    console.log(res);
    if (res[0]) {
      return res[0].level;
    } else {
      return 0;
    }
  };

  ObserverCompetancy.prototype.push = function(comp) {
    return this.competancy.push(comp);
  };

  ObserverCompetancy.prototype.length = function() {
    return this.competancy.length;
  };

  return ObserverCompetancy;

})();

Competancy = (function() {

  function Competancy(geoHazard, level) {
    this.geoHazard = geoHazard;
    this.level = level;
  }

  return Competancy;

})();

SendEmail = (function() {

  SendEmail.prototype.url = "";

  function SendEmail(RegID) {
    this.RegID = RegID;
    this.url = "" + SERVER_URL + "RegistrationNotification?RegID=" + this.RegID;
  }

  return SendEmail;

})();

Registration = (function() {

  Registration.prototype.url = function() {
    return "" + SERVER_URL + "Registration";
  };

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

  ActivityInfluencedKD.prototype.url = null;

  function ActivityInfluencedKD() {
    this.url = "" + SERVER_URL + "Language(" + LANGUAGE + ")/ActivityInfluencedKD";
  }

  return ActivityInfluencedKD;

})();

AreaUsageKD = (function() {

  AreaUsageKD.prototype.url = null;

  function AreaUsageKD(LangKey, AreaUsageName, AreaUsageDescr, Language) {
    this.LangKey = LangKey;
    this.AreaUsageName = AreaUsageName;
    this.AreaUsageDescr = AreaUsageDescr;
    this.Language = Language;
    this.url = "" + SERVER_URL + "AreaUsageKD";
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


AreaInformation = (function() {

  AreaInformation.prototype.url = "";

  function AreaInformation(Lat, Long) {
    this.Lat = Lat;
    this.Long = Long;
    this.url = "http://gis.nve.no/ArcGIS/rest/services/Mapservices/seNorge/MapServer/35/query?text=&geometry=" + Long + "," + Lat + "&geometryType=esriGeometryPoint&inSR=32633&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=false&maxAllowableOffset=&outSR=&outFields=*&f=pjson";
  }

  return AreaInformation;

})();

PositionDetails = (function() {

  PositionDetails.prototype.url = "";

  function PositionDetails(Lat, Long) {
    this.Lat = Lat;
    this.Long = Long;
    this.url = "http://gis.nve.no/ArcGIS/rest/services/Mapservices/Bakgrunnsdata/MapServer/36/query?text=&geometry=" + Long + "," + Lat + "&geometryType=esriGeometryPoint&inSR=32633&spatialRel=esriSpatialRelIntersects&relationParam=&objectIds=&where=&time=&returnCountOnly=false&returnIdsOnly=false&returnGeometry=false&maxAllowableOffset=&outSR=&outFields=*&f=pjson";
  }

  return PositionDetails;

})();

AvalancheActivityObs = (function() {

  AvalancheActivityObs.prototype.url = function() {
    return "" + SERVER_URL + "AvalancheActivityObs";
  };

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

  AvalancheDangerKD.prototype.url = null;

  function AvalancheDangerKD(LangKey, AvalancheDangerName, AvalancheDangerDescr, Language) {
    this.LangKey = LangKey;
    this.AvalancheDangerName = AvalancheDangerName;
    this.AvalancheDangerDescr = AvalancheDangerDescr;
    this.Language = Language;
    this.url = "" + SERVER_URL + "AvalancheDangerKD";
  }

  return AvalancheDangerKD;

})();

AvalancheDangerObs = (function(_super) {

  __extends(AvalancheDangerObs, _super);

  AvalancheDangerObs.prototype.url = function() {
    return "" + SERVER_URL + "AvalancheDangerObs";
  };

  function AvalancheDangerObs(AvalancheDangerObsID, RegID, DangerSignTID, UsageFlagTID, Comment) {
    var _this = this;
    this.AvalancheDangerObsID = AvalancheDangerObsID;
    this.RegID = RegID;
    this.DangerSignTID = DangerSignTID;
    this.UsageFlagTID = UsageFlagTID;
    this.Comment = Comment;
    this.model = "AvalancheDangerObs";
    ({
      beforeSend: function(x) {
        return _this.AvalancheDangerObsID = x;
      }
    });
  }

  return AvalancheDangerObs;

})(Observation);

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

  AvalancheEvaluation.prototype.url = function() {
    return "" + SERVER_URL + "AvalancheEvaluation";
  };

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

  function AvalancheKD() {}

  return AvalancheKD;

})();

AvalancheObs = (function() {

  function AvalancheObs() {}

  return AvalancheObs;

})();

AvalancheProblemKD = (function() {

  function AvalancheProblemKD() {}

  return AvalancheProblemKD;

})();

AvalanchePublisherKD = (function() {

  function AvalanchePublisherKD() {}

  return AvalanchePublisherKD;

})();

AvalancheTriggerKD = (function() {

  function AvalancheTriggerKD() {}

  return AvalancheTriggerKD;

})();

AvalancheWarning = (function() {

  function AvalancheWarning() {}

  return AvalancheWarning;

})();

CompetenceLevelKD = (function() {

  function CompetenceLevelKD() {}

  return CompetenceLevelKD;

})();

CompressionTest = (function() {

  function CompressionTest() {}

  return CompressionTest;

})();

CompressionTestKD = (function() {

  function CompressionTestKD() {}

  return CompressionTestKD;

})();

ComprTestFractureKD = (function() {

  function ComprTestFractureKD() {}

  return ComprTestFractureKD;

})();

CriticalLayerKD = (function() {

  function CriticalLayerKD() {}

  return CriticalLayerKD;

})();

DamageExtentKD = (function() {

  DamageExtentKD.prototype.url = null;

  function DamageExtentKD() {
    this.url = "" + SERVER_URL + "Language(" + LANGUAGE + ")/DamageExtentKD";
  }

  return DamageExtentKD;

})();

DangerSignKD = (function() {

  DangerSignKD.prototype.url = null;

  function DangerSignKD() {
    this.url = "" + SERVER_URL + "Language(" + LANGUAGE + ")/DangerSignKD";
  }

  return DangerSignKD;

})();

DangerObs = (function(_super) {

  __extends(DangerObs, _super);

  DangerObs.prototype.url = function() {
    return "" + SERVER_URL + "DangerObs";
  };

  function DangerObs(DangerObsID, RegID, GeoHazardTID, DangerSignTID, UsageFlagTID, Comment) {
    this.DangerObsID = DangerObsID;
    this.RegID = RegID;
    this.GeoHazardTID = GeoHazardTID;
    this.DangerSignTID = DangerSignTID;
    this.UsageFlagTID = UsageFlagTID;
    this.Comment = Comment;
    this.beforeSend = __bind(this.beforeSend, this);

    this.model = "DangerObs";
  }

  DangerObs.prototype.beforeSend = function(index) {
    return this.DangerObsID = index;
  };

  return DangerObs;

})(Observation);

DestructiveSizeKD = (function() {

  function DestructiveSizeKD() {}

  return DestructiveSizeKD;

})();

EstimatedNumKD = (function() {

  function EstimatedNumKD() {}

  return EstimatedNumKD;

})();

ForecastAccurateKD = (function() {

  function ForecastAccurateKD() {}

  return ForecastAccurateKD;

})();

ForecastRegionKD = (function() {

  function ForecastRegionKD() {}

  return ForecastRegionKD;

})();

GeoHazardKD = (function() {

  function GeoHazardKD() {}

  return GeoHazardKD;

})();

IceLayerKD = (function() {

  function IceLayerKD() {}

  return IceLayerKD;

})();

IceThickness = (function() {

  function IceThickness() {}

  return IceThickness;

})();

IceThicknessLayer = (function() {

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

  Incident.prototype.url = function() {
    return "" + SERVER_URL + "Incident";
  };

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

  function IncidentURLs() {}

  return IncidentURLs;

})();

Language = (function() {

  function Language() {}

  return Language;

})();

Observer = (function() {

  function Observer() {}

  return Observer;

})();

ObserverGroup = (function() {

  function ObserverGroup() {}

  return ObserverGroup;

})();

ObserverGroupMember = (function() {

  function ObserverGroupMember() {}

  return ObserverGroupMember;

})();

ObserverHazardsComp = (function() {

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

  ObsLocation.prototype.url = function() {
    return "" + SERVER_URL + "ObsLocation";
  };

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

  Picture.prototype.url = function() {
    return "" + SERVER_URL + "Picture";
  };

  function Picture(PictureID, RegID, PictureImage, Photographer, Copyright, Aspect, GeoHazardTID, Comment, RegistrationTID) {
    this.PictureID = PictureID;
    this.RegID = RegID;
    this.PictureImage = PictureImage;
    this.Photographer = Photographer;
    this.Copyright = Copyright;
    this.Aspect = Aspect;
    this.GeoHazardTID = GeoHazardTID;
    this.Comment = Comment;
    this.RegistrationTID = RegistrationTID;
  }

  return Picture;

})();

PrecipitationKD = (function() {

  function PrecipitationKD() {}

  return PrecipitationKD;

})();

PropagationKD = (function() {

  function PropagationKD() {}

  return PropagationKD;

})();

RegistrationKD = (function() {

  RegistrationKD.prototype.url = null;

  function RegistrationKD() {
    this.url = "" + SERVER_URL + "Language(" + LANGUAGE + ")/RegistrationKD";
  }

  return RegistrationKD;

})();

SnowCoverObs = (function() {

  function SnowCoverObs() {}

  return SnowCoverObs;

})();

SnowDriftKD = (function() {

  function SnowDriftKD() {}

  return SnowDriftKD;

})();

SnowSurfaceKD = (function() {

  function SnowSurfaceKD() {}

  return SnowSurfaceKD;

})();

SnowSurfaceObservation = (function() {

  function SnowSurfaceObservation() {}

  return SnowSurfaceObservation;

})();

StabilityEvalKD = (function() {

  function StabilityEvalKD() {}

  return StabilityEvalKD;

})();

SurfaceRoughnessKD = (function() {

  function SurfaceRoughnessKD() {}

  return SurfaceRoughnessKD;

})();

SurfaceWaterContentKD = (function() {

  function SurfaceWaterContentKD() {}

  return SurfaceWaterContentKD;

})();

TerrainStartZoneKD = (function() {

  function TerrainStartZoneKD() {}

  return TerrainStartZoneKD;

})();

UsageFlagKD = (function() {

  function UsageFlagKD() {}

  return UsageFlagKD;

})();

UTMSourceKD = (function() {

  function UTMSourceKD() {}

  return UTMSourceKD;

})();

WeatherObservation = (function() {

  function WeatherObservation() {}

  return WeatherObservation;

})();

ActivityInfluencedW = (function() {

  function ActivityInfluencedW() {}

  return ActivityInfluencedW;

})();

AvalancheDangerObsV = (function() {

  function AvalancheDangerObsV() {}

  return AvalancheDangerObsV;

})();

AvalancheEvaluationV = (function() {

  function AvalancheEvaluationV() {}

  return AvalancheEvaluationV;

})();

AvalancheWarningV = (function() {

  function AvalancheWarningV() {}

  return AvalancheWarningV;

})();

CompetenceLevelW = (function() {

  function CompetenceLevelW() {}

  return CompetenceLevelW;

})();

ForecastRegionW = (function() {

  function ForecastRegionW() {}

  return ForecastRegionW;

})();

IncidentNoV = (function() {

  function IncidentNoV() {}

  return IncidentNoV;

})();

IncidentV = (function() {

  function IncidentV() {}

  return IncidentV;

})();

ObserverHazardsCompW = (function() {

  function ObserverHazardsCompW() {}

  return ObserverHazardsCompW;

})();

ObserverLocationV = (function() {

  function ObserverLocationV() {}

  return ObserverLocationV;

})();

PictureV = (function() {

  function PictureV() {}

  return PictureV;

})();

SnowCoverObsNoV = (function() {

  function SnowCoverObsNoV() {}

  return SnowCoverObsNoV;

})();

SnowCoverObsV = (function() {

  function SnowCoverObsV() {}

  return SnowCoverObsV;

})();

SnowSurfaceObservationV = (function() {

  function SnowSurfaceObservationV() {}

  return SnowSurfaceObservationV;

})();

WeatherObservationV = (function() {

  function WeatherObservationV() {}

  return WeatherObservationV;

})();

AvalancheWarningSummaryV = (function() {

  function AvalancheWarningSummaryV() {}

  return AvalancheWarningSummaryV;

})();

AllRegistrationsV = (function() {

  function AllRegistrationsV() {}

  return AllRegistrationsV;

})();

ObserverGroupObsLocationV = (function() {

  function ObserverGroupObsLocationV() {}

  return ObserverGroupObsLocationV;

})();

ObserverGroupMemberV = (function() {

  function ObserverGroupMemberV() {}

  return ObserverGroupMemberV;

})();

AvalancheActivityObsV = (function() {

  function AvalancheActivityObsV() {}

  return AvalancheActivityObsV;

})();

AvalancheWarningNoV = (function() {

  function AvalancheWarningNoV() {}

  return AvalancheWarningNoV;

})();

AvalancheWarningInternalCommentsV = (function() {

  function AvalancheWarningInternalCommentsV() {}

  return AvalancheWarningInternalCommentsV;

})();

AvalancheWarningObsLocation = (function() {

  function AvalancheWarningObsLocation() {}

  return AvalancheWarningObsLocation;

})();

County = (function() {

  function County() {}

  return County;

})();

AvalancheWarningPublishedSummaryV = (function() {

  function AvalancheWarningPublishedSummaryV() {}

  return AvalancheWarningPublishedSummaryV;

})();

ObsLocationV = (function() {

  function ObsLocationV() {}

  return ObsLocationV;

})();

LandSlideSizeKD = (function() {

  LandSlideSizeKD.prototype.url = null;

  function LandSlideSizeKD(LandSlideSizeTID, LangKey, LandSlideSizeName, LandSlideSizeDescr) {
    this.LandSlideSizeTID = LandSlideSizeTID;
    this.LangKey = LangKey;
    this.LandSlideSizeName = LandSlideSizeName;
    this.LandSlideSizeDescr = LandSlideSizeDescr;
    this.url = "" + SERVER_URL + "/LandSlideSizeKD?$filter=LangKey eq " + LANGUAGE;
  }

  return LandSlideSizeKD;

})();

LandSlideTriggerKD = (function() {

  LandSlideTriggerKD.prototype.url = null;

  function LandSlideTriggerKD() {
    this.url = "" + SERVER_URL + "/LandSlideTriggerKD?$filter=LangKey eq " + LANGUAGE;
  }

  return LandSlideTriggerKD;

})();

LandSlideKD = (function() {

  LandSlideKD.prototype.url = null;

  function LandSlideKD(LandSlideTID, LangKey, LandSlideName, LandSlideDescr) {
    this.LandSlideTID = LandSlideTID;
    this.LangKey = LangKey;
    this.LandSlideName = LandSlideName;
    this.LandSlideDescr = LandSlideDescr;
    this.url = "" + SERVER_URL + "/LandSlideKD?$filter=LangKey eq " + LANGUAGE;
  }

  return LandSlideKD;

})();

LandSlideObs = (function(_super) {

  __extends(LandSlideObs, _super);

  LandSlideObs.prototype.url = function() {
    return "" + SERVER_URL + "LandSlideObs";
  };

  function LandSlideObs(RegID, DtLandSlideTime, UTMNorthStop, UTMEastStop, UTMZoneStop, LandSlideTID, LandSlideTriggerTID, LandSlideSizeTID, UsageFlagTID, Comment) {
    this.RegID = RegID;
    this.DtLandSlideTime = DtLandSlideTime;
    this.UTMNorthStop = UTMNorthStop;
    this.UTMEastStop = UTMEastStop;
    this.UTMZoneStop = UTMZoneStop;
    this.LandSlideTID = LandSlideTID;
    this.LandSlideTriggerTID = LandSlideTriggerTID;
    this.LandSlideSizeTID = LandSlideSizeTID;
    this.UsageFlagTID = UsageFlagTID;
    this.Comment = Comment;
    this.model = "LandSlideObs";
  }

  return LandSlideObs;

})(Observation);

WaterLevel = (function() {

  WaterLevel.prototype.url = function() {
    return "" + SERVER_URL + "WaterLevel";
  };

  function WaterLevel(RegID, WaterLevelDescribed, WaterLevelValue, WaterLevelRefTID, UsageFlagTID, Comment) {
    this.RegID = RegID;
    this.WaterLevelDescribed = WaterLevelDescribed;
    this.WaterLevelValue = WaterLevelValue;
    this.WaterLevelRefTID = WaterLevelRefTID;
    this.UsageFlagTID = UsageFlagTID;
    this.Comment = Comment;
    this.model = "WaterLevel";
  }

  return WaterLevel;

})();

WaterLevelRefKD = (function() {

  WaterLevelRefKD.prototype.url = function() {
    return "" + SERVER_URL + "/WaterLevelRefKD?$filter=LangKey eq " + LANGUAGE;
  };

  function WaterLevelRefKD(WaterLevelRefKD, LangKey, WaterLevelRefName, WaterLevelRefDescr) {
    this.WaterLevelRefKD = WaterLevelRefKD;
    this.LangKey = LangKey;
    this.WaterLevelRefName = WaterLevelRefName;
    this.WaterLevelRefDescr = WaterLevelRefDescr;
  }

  return WaterLevelRefKD;

})();
