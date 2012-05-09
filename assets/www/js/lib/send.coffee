class NveSend

	login : (name, pass, callback) ->
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
			}).complete( (data) =>
				callback(data) if callback
		)
		
	logout : (callback) ->
		jQuery.ajax({
			type: 'POST',
			url: "http://h-web01.nve.no/stage_RegObsServices/Authentication_JSON_AppService.axd/Logout",
			data: "",
			dataType: 'json',
			headers: { 
				Accept : "application/json; charset=utf-8",
				"Content-Type": "application/json; charset=utf-8"
			}
			}).complete( (data) =>
				callback(data) if callback
		)	
	 
	loggedInAs: (callback) ->
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
		
GetObjectFromServer = (call, callback) ->
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
		###
		console.log(error)
		alert("Error occurred in ::GetObjectFromServer #{error.message} #{call.url}")
		###
	)
	result

SendObjectToServer = (obj, callback) ->
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
		###
		console.log(err)
		alert("Error occurred in ::SendObjectToServer #{err.message} #{obj.url}")
		###
	)
	result
	