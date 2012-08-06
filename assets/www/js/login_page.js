var login_page = {
		
	init: function() {

		$('header_middle_text').innerHTML = "Login";
		
		var user = UserStore.get(NORMAL);
		console.log(user.username);
		if(user.isDefined()){
			$('login_username').value = user.username;
			$('login_password').value = user.password;
		}
	}	
};
