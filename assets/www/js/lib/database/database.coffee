STARTUP_PAGE = "regobs_startup_page"

USERNAME = "regobs_username"

PASSWORD = "regobs_password"


DataAccess = {
	storage : window.localStorage

	save: (key, value) ->
		console.log("saving: (" + key + ", " + JSON.stringify(value) + ")");
		result = DataAccess.storage.setItem(key, JSON.stringify(value))

	get: (key, generic) ->
		result = DataAccess.storage.getItem(key)
		
		if result
			ret = JSON.parse(result)
			
			if generic
				ret = jQuery.extend(generic, ret);
			else
				ret
		else
			null
}


UserStore = {
	save: (mode, user) ->
		DataAccess.save(@usernameKey(mode), user.username)
		DataAccess.save(@passwordKey(mode), user.password)
		""
		
	clear: (mode)->
		DataAccess.save(@usernameKey(mode), "")
		DataAccess.save(@passwordKey(mode), "")
		""
	
	get: (mode) ->
		username = DataAccess.get(@usernameKey(mode))
		password = DataAccess.get(@passwordKey(mode))
		new User(username, password)
	
	usernameKey : (mode) ->
		mode + "_" + USERNAME
		
	passwordKey: (mode) ->
		mode + "_" + PASSWORD
		
}