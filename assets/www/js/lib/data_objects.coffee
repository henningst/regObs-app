
class EventedModel
  setRegDate: (date)->
  beforeSend: (index)->
    
class AutoCastable extends EventedModel
  model : undefined
  
class Observation extends AutoCastable



class Result
	constructor: () ->
		@ok = false
		@data = null

	isOk: () ->
		@ok
		
		
class User
	constructor: (@id, @username, @password)->
    @groups = []
    @competancy = new ObserverCompetancy([])
    
	
	isDefined: ->
		if (@username != null and @password != null)  
			if(@username.length != 0 or @password.length != 0)
				true
			else
				false
		else
			false

class Group
  constructor: (@id, @name)->

class ObserverCompetancy
  constructor: (@competancy)->
    
  getLevel: (geoHazard) =>
    res = @competancy.filter((comp) =>
      comp.geoHazard == geoHazard
    )
    console.log(res)
    if(res[0])
      res[0].level
    else
      0 
    
  push: (comp)=>
    @competancy.push(comp)
  
  length: ()=>
    @competancy.length
    

 
class Competancy
  constructor: (@geoHazard, @level)->
		
class SendEmail
	url : "" 
	constructor: (@RegID ) ->
		@url = "#{SERVER_URL}RegistrationNotification?RegID=#{@RegID}"

class Registration
	url : ()  -> "#{SERVER_URL}Registration" 
	constructor: (@ObserverID, @ObsLocationID, @DtRegTime, @DtObsTime, @CompetenceLevelTID, @ObserverGroupID, @Comment) -> 

class ActivityInfluencedKD
	url : null
	constructor: () ->
		@url = "#{SERVER_URL}Language(#{LANGUAGE})/ActivityInfluencedKD"
	
class AreaUsageKD
	url : null
	constructor: (@LangKey, @AreaUsageName, @AreaUsageDescr, @Language ) ->
		@url = "#{SERVER_URL}AreaUsageKD"

###
?text=&geometry=75793,6814257&geometryType=esriGeometryPoint&
inSR=32633&spatialRel=esriSpatialRelIntersects&
relationParam=&objectIds=&where=&time=&
returnCountOnly=false&returnIdsOnly=false&
returnGeometry=false&maxAllowableOffset=&
outSR=&outFields=*&f=pjson
###

class AreaInformation
	url : ""
	constructor: (@Lat, @Long) ->
		@url = "http://gis.nve.no/ArcGIS/rest/services/Mapservices/seNorge/MapServer/35/query?text=&geometry=#{Long},#{Lat}
&geometryType=esriGeometryPoint&inSR=32633&spatialRel=esriSpatialRelIntersects&
relationParam=&objectIds=&where=&time=&returnCountOnly=false&returnIdsOnly=false&
returnGeometry=false&maxAllowableOffset=&outSR=&outFields=*&f=pjson"

class PositionDetails
	url : ""
	constructor: (@Lat, @Long) ->
		@url = "http://gis.nve.no/ArcGIS/rest/services/Mapservices/Bakgrunnsdata/MapServer/36/query?text=&geometry=#{Long},#{Lat}&geometryType=esriGeometryPoint&
inSR=32633&spatialRel=esriSpatialRelIntersects&
relationParam=&objectIds=&where=&time=&
returnCountOnly=false&returnIdsOnly=false&
returnGeometry=false&maxAllowableOffset=&
outSR=&outFields=*&f=pjson"

class AvalancheActivityObs
	url : ()  -> "#{SERVER_URL}AvalancheActivityObs"
	constructor: (@RegID, @Aspect, @HeigthStartZone, @DestructiveSizeTID, @EstimatedNumTID, @AvalancheTID, @AvalancheTriggerTID, @TerrainStartZoneTID, @DtAvalancheTime, @SnowLine, @UsageFlagTID, @Comment) ->
	
class AvalancheDangerKD
	url : null
	constructor: (@LangKey, @AvalancheDangerName, @AvalancheDangerDescr, @Language ) ->
		@url = "#{SERVER_URL}AvalancheDangerKD"
	
class AvalancheDangerObs extends Observation
	url : ()  -> "#{SERVER_URL}AvalancheDangerObs"
	constructor: (@AvalancheDangerObsID, @RegID, @DangerSignTID, @UsageFlagTID, @Comment) ->
		@model = "AvalancheDangerObs"

  beforeSend: (x)=>
    @AvalancheDangerObsID = x
    
###
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
###	
class AvalancheEvaluation
	url : ()  -> "#{SERVER_URL}AvalancheEvaluation"
	constructor: (@RegID, @CanPublish, @AvalancheDangerTID, @ValidExposition, @ValidHeightRelative, @ValidHeightFrom, @ValidHeigtTo, @AvalancheProblemTID1, @AvalancheProblemTID2, @AvalancheProblemTID3, @UsageFlagTID, @AvalancheEvaluation1, @InternalComment, @Comment) ->

class AvalancheKD
  url : null
  constructor: (@AvalancheTID, @LangKey, @AvalancheName, @AvalancheDescr ) ->
    @url = "#{SERVER_URL}Language(#{LANGUAGE})/AvalancheKD"
	
class AvalancheObs
	constructor: ( ) ->

class AvalancheProblemKD
	constructor: ( ) ->
	
class AvalanchePublisherKD
	constructor: ( ) ->
	
class AvalancheTriggerKD
	constructor: ( ) ->
	
class AvalancheWarning
	constructor: ( ) ->
	
class CompetenceLevelKD
	constructor: ( ) ->
	
class CompressionTest
	constructor: ( ) ->	

class CompressionTestKD
	constructor: ( ) ->

class ComprTestFractureKD
	constructor: ( ) ->

class CriticalLayerKD
	constructor: ( ) ->

class DamageExtentKD
	url : null
	constructor : () ->
		@url = "#{SERVER_URL}Language(#{LANGUAGE})/DamageExtentKD"

class DangerSignKD
	url : null
	constructor: ()->
		@url = "#{SERVER_URL}Language(#{LANGUAGE})/DangerSignKD"

class DangerObs extends Observation
	url : ()  -> "#{SERVER_URL}DangerObs"
	constructor: (@DangerObsID, @RegID, @GeoHazardTID, @DangerSignTID, @UsageFlagTID, @Comment) ->
	  @model = "DangerObs"
	  
	beforeSend: (index) =>
	  @DangerObsID = index
	  

class SnowSurfaceObservation extends Observation
  url : () -> "#{SERVER_URL}SnowSurfaceObservation"
  constructor: (@RegID, @SnowDepth, @NewSnowDepth24, @NewSnowLine, @SnowWindDepth24, @SurfaceWaterContentTID, @SnowDriftTID, @SnowSurfaceTID, @SurfaceRougnessTID, @FootPenetration, @UsageFlagTID, @Comment) ->
    @model = "SnowSurfaceObservation"
	
class AvalancheActivityObs extends Observation
  url : () -> "#{SERVER_URL}AvalancheActivityObs"
  constructor: (@RegID, @AvalancheActivityObsID, @Aspect,@HeigthStartZone,@DestructiveSizeTID,@EstimatedNumTID,@AvalancheTID,@AvalancheTriggerTID,@TerrainStartZoneTID,@DtAvalancheTime,@SnowLine,@UsageFlagTID,@Comment)->
    @model="AvalancheActivityObs"
    
class IceCoverObs extends Observation
  url : () -> "#{SERVER_URL}IceCoverObs"
  constructor: (@RegID, @IceCoverBeforeTID, @IceCoverTID, @UsageFlagTID, @Comment) ->
    @model = "IceCoverObs"


class DestructiveSizeKD
  url : null
  constructor: (@DestructiveSizeTID, @LangKey,@DestructiveSizeName, @DestructiveSizeDescr) ->
    @url = "#{SERVER_URL}Language(#{LANGUAGE})/DestructiveSizeKD"

class EstimatedNumKD
  url : null
  constructor: (@EstimatedNumTID, @LangKey, @EstimatedNumName, @EstimatedNumDescr) ->
    @url = "#{SERVER_URL}Language(#{LANGUAGE})/EstimatedNumKD"
    
class IceCoverBeforeKD
  url: null
  constructor: (@IceCoverBeforeTID, @LangKey, @IceCoverBeforeName, @IceCoverBeforeDescr) ->
    @url = "#{SERVER_URL}IceCoverBeforeKD?Language eq #{LANGUAGE}"

class IceCoverKD
  url : null
  constructor : (@IceCoverTID, @LangKey, @IceCoverName, @IceCoverDescr) ->
    @url = "#{SERVER_URL}IceCoverKD?Language eq #{LANGUAGE}"

class ForecastAccurateKD
	constructor: ( ) ->

class ForecastRegionKD
	constructor: ( ) ->

class GeoHazardKD
	constructor: ( ) ->

class IceLayerKD
	constructor: ( ) ->

class IceThickness
	constructor: ( ) ->

class IceThicknessLayer
	constructor: ( ) ->

###
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
###
class Incident
  url : ()  -> "#{SERVER_URL}Incident"
  constructor: (@RegID, @GeoHazardTID, @ActivityInfluencedTID, @DamageExtentTID, @ForecastAccurateTID, @DtEndTime, @IncidentHeader, @IncidentIngress, @IncidentText, @SensitiveText, @UsageFlagTID, @Comment ) ->

class IncidentURLs
	constructor: ( ) ->

class Language
	constructor: ( ) ->
	
class Observer
	constructor: ( ) ->

class ObserverGroup
	constructor: ( ) ->

class ObserverGroupMember
	constructor: ( ) ->

class ObserverHazardsComp
	constructor: ( ) ->

###
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
###
class ObsLocation
	url : ()  -> "#{SERVER_URL}ObsLocation"
	constructor: (@LocationName, @UTMZone, @UTMEast, @UTMNorth, @UTMSourceTID, @AreaUsageTID, @ForecastRegionTID, @HeigthMax, @HeigthMin, @Area, @HeigthTreeLine, @DtRegTime, @AreaSize, @SlopeAngel, @SlopeDirection, @MunicipalNo, @Comment) ->

class Picture
	url: ()  -> "#{SERVER_URL}Picture"
	constructor: (@PictureID, @RegID, @PictureImage, @Photographer, @Copyright, @Aspect, @GeoHazardTID, @Comment, @RegistrationTID) ->

class PrecipitationKD
	constructor: ( ) ->

class PropagationKD
	constructor: ( ) ->

class RegistrationKD
	url: null
	constructor: ( ) ->
		 @url = "#{SERVER_URL}Language(#{LANGUAGE})/RegistrationKD"

class SnowCoverObs
	constructor: ( ) ->

class SnowDriftKD
	constructor: ( ) ->

class SnowSurfaceKD
	constructor: ( ) ->




class StabilityEvalKD
	constructor: ( ) ->

class SurfaceRoughnessKD
	constructor: ( ) ->

class SurfaceWaterContentKD
	constructor: ( ) ->

class TerrainStartZoneKD
	constructor: ( ) ->

class UsageFlagKD
	constructor: ( ) ->

class UTMSourceKD
	constructor: ( ) ->

class WeatherObservation
	constructor: ( ) ->

class ActivityInfluencedW
	constructor: ( ) ->

class AvalancheDangerObsV
	constructor: ( ) ->

class AvalancheEvaluationV
	constructor: ( ) ->

class AvalancheWarningV
	constructor: ( ) ->

class CompetenceLevelW
	constructor: ( ) ->

class ForecastRegionW
	constructor: ( ) ->

class IncidentNoV
	constructor: ( ) ->

class IncidentV
	constructor: ( ) ->

class ObserverHazardsCompW
	constructor: ( ) ->

class ObserverLocationV
	constructor: ( ) ->

class PictureV
	constructor: ( ) ->

class SnowCoverObsNoV
	constructor: ( ) ->

class SnowCoverObsV
	constructor: ( ) ->

class SnowSurfaceObservationV
	constructor: ( ) ->

class WeatherObservationV
	constructor: ( ) ->

class AvalancheWarningSummaryV
	constructor: ( ) ->

class AllRegistrationsV
	constructor: ( ) ->

class ObserverGroupObsLocationV
	constructor: ( ) ->

class ObserverGroupMemberV
	constructor: ( ) ->

class AvalancheActivityObsV
	constructor: ( ) ->

class AvalancheWarningNoV
	constructor: ( ) ->

class AvalancheWarningInternalCommentsV
	constructor: ( ) ->

class AvalancheWarningObsLocation
	constructor: ( ) ->

class County
	constructor: ( ) -> 

class AvalancheWarningPublishedSummaryV
	constructor: ( ) ->

class ObsLocationV
	constructor: ( ) ->
	  
class LandSlideSizeKD
  url: null
  constructor: (@LandSlideSizeTID, @LangKey, @LandSlideSizeName, @LandSlideSizeDescr) ->
    @url = "#{SERVER_URL}/LandSlideSizeKD?$filter=LangKey eq #{ LANGUAGE }"
    
  
class LandSlideTriggerKD
  url: null
  constructor: () ->
    @url = "#{SERVER_URL}/LandSlideTriggerKD?$filter=LangKey eq #{ LANGUAGE }"
	  
class LandSlideKD
  url: null
  constructor: (@LandSlideTID, @LangKey, @LandSlideName, @LandSlideDescr) ->
     @url = "#{SERVER_URL}/LandSlideKD?$filter=LangKey eq #{ LANGUAGE }"
     
     
class LandSlideObs extends Observation
  url : ()  -> "#{SERVER_URL}LandSlideObs"
  constructor: (@RegID, @DtLandSlideTime, @UTMNorthStop, @UTMEastStop, @UTMZoneStop, @LandSlideTID, @LandSlideTriggerTID, @LandSlideSizeTID, @UsageFlagTID, @Comment)->
    @model = "LandSlideObs"
    
class WaterLevel
	url : ()  -> "#{SERVER_URL}WaterLevel"
	constructor: (@RegID, @WaterLevelDescribed, @WaterLevelValue, @WaterLevelRefTID, @UsageFlagTID, @Comment) ->
		@model = "WaterLevel"
	    
    
class WaterLevelRefKD
  url: null
  constructor: (@WaterLevelRefKD, @LangKey, @WaterLevelRefName, @WaterLevelRefDescr) ->
    @url= "#{ SERVER_URL }/WaterLevelRefKD?$filter=LangKey eq #{ LANGUAGE }"
  
class SnowDriftKD
  constructor: (@SnowDriftTID, @LangKey, @SnowDriftName, @SnowDriftDescr) ->
    @url = "#{ SERVER_URL }/SnowDriftKD?$filter=LangKey eq #{ LANGUAGE }"
    
        