class NveStore
  constructor: (@login) ->
    @loggedIn = false
    
    @cridentials = {
      "userName": @login.username,
      "password": @login.password,
      "createPersistentCookie": true,
      "Expires":"\/Date(" + new Date().getTime() + "-0100)\/"
    }
    
    
    $.ajax({
      type: 'POST',
      url: "http://h-web01.nve.no/test_RegObsServices/Authentication_JSON_AppService.axd/Login",
      data: JSON.stringify(@cridentials),
      dataType: 'json',
      headers: { 
        Accept : "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8"
      }
    }).complete( (data) => 
      @loggedIn = true
    )  

  isLoggedIn: ()->
    @loggedIn

  addObsLocation: (obsLocation, callback) ->
    result = new Result
    OData.request({
        requestUri: "http://h-web01.nve.no/test_regobsservices/Odata.svc/ObsLocation",
        method: "POST",
        data: obsLocation
    }, (data) ->
      result.ok= true
      result.data = data
      callback(data) if callback
    )
    result

  addRegistration: (test, callback) ->
    test
  
  loggedInAs: () ->
    result = new Result
    OData.request({
      requestUri: "http://h-web01.nve.no/test_regobsservices/Odata.svc/Observer",
      method: "GET",
    }, (data) ->
      result.ok = true
      result.data = data.results[0]
      console.log(data)
    )
    result
    
class Login
  constructor: (@username, @password)->
    
 
class Location
  constructor: (@ObsLocationID, @UTMZone, @UTMEast, @UTMNorth) -> 
  
class Registration
  url: "http://h-web01.nve.no/test_regobsservices/Odata.svc/Registration"
  constructor: (@location) ->
  
  id: @id
  
  
class Result
  constructor: () ->
    @ok = false
    @data = null
  
  isOk: () ->
    @ok 
  