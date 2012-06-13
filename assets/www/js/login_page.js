var settings_page = {
		
	init: function() {

		$('header_middle_text').innerHTML = "Login";
		
		var username = DataAccess.get(USERNAME);
		var password = DataAccess.get(PASSWORD);
		
		if(username != undefined)
			$('login_username').value = username;
		
		if(password != undefined)
			$('login_password').value = password;
	}	
}