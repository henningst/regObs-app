class NveStore
	send = new NveSend
	m_isLoggedIn = false
	
	login: (userName, userPassword) ->
		send.login(userName, userPassword, this.loginCallback)

	loginCallback: (data) ->
		main.loginCallback(data)
		m_isLoggedIn = true

	isLoggedIn: () ->
		m_isLoggedIn

	loggedInAs: () ->
		send.loggedInAs()

	addObsLocation: (location, callback) ->
		send.addObsLocation(location, callback)
		
	addRegistration: (registration, callback) ->
		send.addRegistration(registration, callback)

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