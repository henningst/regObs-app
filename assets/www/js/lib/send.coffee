class NveSend

Login = (name, pass, callback, onError) ->
	@cridentials = {
		"userName": name,
		"password": pass,
		"createPersistentCookie": true,
		"Expires":"\/Date(" + new Date().getTime() + "-0100)\/"
	}
	jQuery.ajax({
		type: 'POST',
		url: "http://h-web01.nve.no/stage_RegObsServices/Authentication_JSON_AppService.axd/Login",
		data: JSON.stringify(@cridentials),
		dataType: 'json',
		headers: {
			Accept : "application/json; charset=utf-8",
			"Content-Type": "application/json; charset=utf-8"
		}
		success: (data) ->
			callback(data) if callback
		error: (data) ->
			onError(data) if onError
		}
		
	)
		
Logout = (callback, onError) ->
	jQuery.ajax({
		type: 'POST',
		url: "http://h-web01.nve.no/stage_RegObsServices/Authentication_JSON_AppService.axd/Logout",
		data: "",
		dataType: 'json',
		headers: { 
			Accept : "application/json; charset=utf-8",
			"Content-Type": "application/json; charset=utf-8"
		},
		success: (data) ->
			callback(data) if callback
		error: (data) ->
			onError(data) if onError
		}
	)	
	 
LoggedInAs = (callback) ->
	result = new Result
	OData.request({
	requestUri: "http://h-web01.nve.no/stage_regobsservices/Odata.svc/Observer",
	method: "GET",
	}, (data) ->
		result.ok = true
		result.data = data.results[0]
		callback(data.results[0]) if callback
	)
	result
		
GetObjectFromServer = (call, callback, onError) ->
	result = new Result
	OData.request({
	requestUri: call.url,
	method: "GET",
	data: ""
	}, (data) ->
		result.ok = true
		result.data = data
		callback(data) if callback
	, (error) ->
		onError(error) if onError
		###
		console.log(error)
		alert("Error occurred in ::GetObjectFromServer #{error.message} #{call.url}")
		###
	)
	result

SendObjectToServer = (obj, callback, onError) ->
	result = new Result
	OData.request({
	requestUri: obj.url,
	method: "POST",
	data: obj
	}, (data) ->
		result.ok = true
		result.data = data
		callback(data) if callback
	, (err) ->
		onError(err) if onError 
		###
		console.log(err)
		alert("Error occurred in ::SendObjectToServer #{err.message} #{obj.url}")
		###
	)
	result
	