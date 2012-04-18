class NveStore
	send = new NveSend

	login: (userName, userPassword) ->
  		send.login(new Login(userName, userPassword))
    
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
  