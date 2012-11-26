

Login = (name, pass, callback, onError) ->
	@cridentials = {
		"userName": name,
		"password": pass,
		"createPersistentCookie": true,
		"Expires":"\/Date(" + new Date().getTime() + "-0100)\/"
	}
	jQuery.ajax({
		type: 'POST',
		url: "#{SERVER_LOGIN_URL}Login",
		data: JSON.stringify(@cridentials),
		dataType: 'json',
		headers: {
			Accept : "application/json; charset=utf-8",
			"Content-Type": "application/json; charset=utf-8"
		}
		success: (data) ->
			console.log("logged in " + JSON.stringify(data))
			callback(data) if callback
		error: (data) ->
			console.log("login failed")
			for k,v of data
				console.log(k + " -> " + v)
				
			onError(data) if onError
		}
	)
		
Logout = (callback, onError) ->
	jQuery.ajax({
		type: 'POST',
		url: "#{SERVER_LOGIN_URL}Logout",
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
	requestUri: "#{SERVER_URL}Observer",
	method: "GET",
	}, (data) ->
		result.ok = true
		result.data = data.results[0]
		callback(data.results[0]) if callback
		error: (data) ->	
			console.log("how am i failed" + data)
	)
	result
	
GetObjectFromServer = (call, callback, onError) ->
	console.log("getting " + call.url)
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
	)
	result


SendObjectToServer = (obj, callback, onError) ->
	console.log("about to send : " + JSON.stringify(obj))
	console.log("sending - " + obj.url()  );
	result = new Result
	
	OData.request({
	requestUri: obj.url() ,
	method: "POST",
	data: obj
	}, (data) ->
		console.log("got data back")
		result.ok = true
		result.data = data
		callback(data) if callback
	, (err) ->
		console.log("error " + err.message)
		for k,v of err
			console.log(k + " -> " + v)

		console.log("response " + err.response);
		for k,v of err.response
			console.log(k + " -> " + v)
			
		console.log("request " + err.request);
		for k,v of err.request
			console.log(k + " -> " + v)
			
			
		onError(err) if onError 
	)
	console.log("fired")
	result
	