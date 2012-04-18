class NveStore
	send = new NveSend
	m_isLoggedIn = false
	
	m_observations = []
	m_locations = []
	
	login: (userName, userPassword) ->
		send.login(userName, userPassword, this.loginCallback)

	loginCallback: (data) ->
		main.loginCallback(data)
		m_isLoggedIn = true

	isLoggedIn: () ->
		m_isLoggedIn

	loggedInAs: () ->
		send.loggedInAs()

	addObsLocation: (location) ->
		m_locations.push(location)

	getObsLocations: () ->
		m_locations
		
	addAvalangeDanger: (obs) ->
		m_observations.push(obs)
		
	getAvalangeDanger: () ->
		m_observations
		
	addRegistration: (registration, callback) ->
		send.addRegistration(registration, callback)

	sendAll: () ->
		location = new Location(null, 33, 103222, 6982346, new Date());
		send.addObsLocation(location, this.zweiter)
		
	zweiter: (data) ->
		registration = new Registration(null, main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date());
		main.store.addRegistration(registration, main.store.calli);

	calli: (data) ->
		console.log(data)
		obs = m_observations[0]
		send.sendStandart(obs, "AvalancheDangerObs", this.p);
		console.log(obs)
		
	p : (data) ->
		console.log(data)
		

class Login
	constructor: (@username, @password)->

class Location
	constructor: (@ObsLocationID, @UTMZone, @UTMEast, @UTMNorth, @DtRegTime) -> 

class Registration
	url: "http://h-web01.nve.no/test_regobsservices/Odata.svc/Registration"
	constructor: (@RegID, @ObserverID, @ObsLocationID, @DtRegTime, @DtObsTime) ->

class Result
	constructor: () ->
		@ok = false
		@data = null

	isOk: () ->
		@ok
		
class AvalangeDangerObs
	constructor: (@AvalancheDangerObsID, @RegID, @DangerSignTID, @UsageFlagTID, @Comment) ->