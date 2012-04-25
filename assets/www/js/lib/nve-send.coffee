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
			url: "http://h-web01.nve.no/test_RegObsServices/Authentication_JSON_AppService.axd/Login",
			data: JSON.stringify(@cridentials),
			dataType: 'json',
			headers: { 
				Accept : "application/json; charset=utf-8",
				"Content-Type": "application/json; charset=utf-8"
			}
			}).complete( (data) =>
				callback(data) if callback
		)
	
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
	###	
	getDangerSign : (callback) ->
		result = new Result
		OData.request({
		requestUri: "http://h-web01.nve.no/test_regobsservices/OData.svc/DangerSignKD",
		method: "GET",
		data: ""
		}, (data) ->
			result.ok = true
			result.data = data
			callback(data) if callback
		, (error) ->
			alert("Error occurred in getDangerSign" +error.message)
		)
		result
	###
	getObjectFromServer : (call, callback) ->
		console.log(call.url)
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
			alert("Error occurred in getObjectFromServer" +error.message)
		)
		result
	
	sendObjectToServer : (obj, callback) ->
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
			alert("Error occurred in sendObjectToServer" + err.message)
			console.log(obj)
			console.log(err)
		)
		result
	
	addRegistration: (registration, callback) ->
		result = new Result
		OData.request({
		requestUri: "http://h-web01.nve.no/test_regobsservices/Odata.svc/Registration",
		method: "POST",
		data: registration
		}, (data) ->
			result.ok= true
			result.data = data
			callback(data) if callback
		)
		result
	 
	loggedInAs: (callback) ->
		result = new Result
		OData.request({
		requestUri: "http://h-web01.nve.no/test_regobsservices/Odata.svc/Observer",
		method: "GET",
		}, (data) ->
			result.ok = true
			result.data = data.results[0]
			callback(data.results[0]) if callback
		)
		result