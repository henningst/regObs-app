SERVER_URL = "http://h-web01.nve.no/test_regobsservices/Odata.svc/"

class NveStore
	send = new NveSend
	m_isLoggedIn = false
	
	m_avalancheDangerObs = []
	m_incidents = []
	
	login: (userName, userPassword) ->
		send.login(userName, userPassword, this.loginCallback)

	loginCallback: (data) ->
		main.loginCallback(data)
		m_isLoggedIn = true

	isLoggedIn: () ->
		m_isLoggedIn

	loggedInAs: (callback) ->
		send.loggedInAs(callback)

	addObservation: (obs) ->
		m_observations.push(obs)

	addAvalancheDangerObs: (avaObs) ->
		m_avalancheDangerObs.push(avaObs)
		
	addIncident: (incident) ->
		m_incidents.push(incident)

	getObservations: () ->
		m_observations
		
	addRegistration: (registration, callback) ->
		send.addRegistration(registration, callback)

	getDangerSign: (callback) ->
		send.getDangerSign(callback)
		
	getObjectFromServer: (call, callback) ->
		send.getObjectFromServer(call, callback)

	sendAll: () ->
		if main.login is null or main.login.data is null
			alert('login')
			return
	
		location = new ObsLocation("Sogndal", 33, snow_page.longitude, snow_page.latitute, 0, 0, 0, 250, 250, false, null, new Date());
		send.sendObjectToServer(location, this.zweiter)
		
	zweiter: (data) ->
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date(), 0)
		send.sendObjectToServer(registration, main.store.calli)

	sendObjectToServer : (obj, callback) ->
		this.send.sendObjectToServer(obj, callback)

	calli: (data) ->
		console.log(data)

		i = 0
		for obs in m_avalancheDangerObs
			do(obs) ->
				obs.RegID = data.RegID
				obs.AvalancheDangerObsID = i++
				send.sendObjectToServer(obs, this.p)
				
		m_avalancheDangerObs.length = 0
		
		i = 0
		for incident in m_incidents
			do(incident) ->
				incident.RegID = data.RegID
				
		m_incidents.length = 0

		snow_observation.afterSendRegistration()
		
		alert('Takk for observasjon')

	p : (data) ->
		console.log(data)
		
class Result
	constructor: () ->
		@ok = false
		@data = null

	isOk: () ->
		@ok

class Registration
	url : "#{SERVER_URL}Registration"
	constructor: (@ObserverID, @ObsLocationID, @DtRegTime, @DtObsTime, @CompetenceLevelTID, @ObserverGroupID, @Comment) -> 

class ActivityInfluencedKD
	url : "#{SERVER_URL}ActivityInfluencedKD"
	
class AreaUsageKD
	url : "#{SERVER_URL}AreaUsageKD"
	constructor: (@LangKey, @AreaUsageName, @AreaUsageDescr, @Language ) ->
	
class AvalancheActivityObs
	url : "#{SERVER_URL}AvalancheActivityObs"
	constructor: (@RegID, @Aspect, @HeigthStartZone, @DestructiveSizeTID, @EstimatedNumTID, @AvalancheTID, @AvalancheTriggerTID, @TerrainStartZoneTID, @DtAvalancheTime, @SnowLine, @UsageFlagTID, @Comment) ->
	
class AvalancheDangerKD
	url : "#{SERVER_URL}AvalancheDangerKD"
	constructor: (@LangKey, @AvalancheDangerName, @AvalancheDangerDescr, @Language ) ->
	
class AvalancheDangerObs
	url : "#{SERVER_URL}AvalancheDangerObs"
	constructor: (@AvalancheDangerObsID, @RegID, @DangerSignTID, @UsageFlagTID, @Comment) ->

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
"AvalancheEvaluation1": "Partnerforum:Invitasjon til spesialseminar om beredskap ut fra et forskningsperspektiv \r\n\r\nNVE har en viktig beredskapsfunksjon i samfunnet. Gjennom dette seminaret ¿nsker vi Œ gi ÓpŒfyllÓ og stimulere til videreutvikling av vŒrt beredskapsarbeid.",
"InternalComment": "Dette er hemmelig.",
"Comment"
###	
class AvalancheEvaluation
	url : "#{SERVER_URL}AvalancheEvaluation"
	constructor: (@RegID, @CanPublish, @AvalancheDangerTID, @ValidExposition, @ValidHeightRelative, @ValidHeightFrom, @ValidHeigtTo, @AvalancheProblemTID1, @AvalancheProblemTID2, @AvalancheProblemTID3, @UsageFlagTID, @AvalancheEvaluation1, @InternalComment, @Comment) ->

class AvalancheKD
	constructor: ( ) ->
	
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
	constructor: ( ) ->

class DangerSignKD
	constructor: ( ) ->

class DestructiveSizeKD
	constructor: ( ) ->

class EstimatedNumKD
	constructor: ( ) ->

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
	url : "#{SERVER_URL}Incident"
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
	url : "#{SERVER_URL}ObsLocation"
	constructor: (@LocationName, @UTMZone, @UTMEast, @UTMNorth, @UTMSourceTID, @AreaUsageTID, @ForecastRegionTID, @HeigthMax, @HeigthMin, @Area, @HeigthTreeLine, @DtRegTime, @AreaSize, @SlopeAngel, @SlopeDirection, @MunicipalNo, @Comment) ->

class Picture
	constructor: ( ) ->

class PrecipitationKD
	constructor: ( ) ->

class PropagationKD
	constructor: ( ) ->

class RegistrationKD
	constructor: ( ) ->

class SnowCoverObs
	constructor: ( ) ->

class SnowDriftKD
	constructor: ( ) ->

class SnowSurfaceKD
	constructor: ( ) ->

class SnowSurfaceObservation
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
