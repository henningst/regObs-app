var settings_page = {
		
	init: function() {

		$('header_middle_text').innerHTML = "Instellinger";
		
		var username = DataAccess.get(USERNAME);
		var password = DataAccess.get(PASSWORD);
		
		if(username != undefined)
			$('login_username').value = username;
		
		if(password != undefined)
			$('login_password').value = password;
		
//		switch (DataAccess.get(STARTUP_PAGE)) {
//		case '1':
//			$("settings_preselect").selectedIndex = 1;
//			break;
//		case '2':
//			$("settings_preselect").selectedIndex = 2;
//			break;
//		case '3':
//			$("settings_preselect").selectedIndex = 3;
//			break;
//		case '4':
//			$("settings_preselect").selectedIndex = 4;
//			break;
//
//		default:
//			break;
//		}
	}	
}