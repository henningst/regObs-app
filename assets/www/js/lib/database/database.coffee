STARTUP_PAGE = "regobs_startup_page"

USERNAME = "regobs_username"

PASSWORD = "regobs_password"

DataAccess = {
	storage : window.localStorage

	save: (key, value) ->
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