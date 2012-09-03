var login_page = {
		
	init: function() {

		$('header_middle_text').innerHTML = "Login";
		
		var user = UserStore.get(main.currentMode());
		console.log(user.username);
		if(user.isDefined()){
			$('login_username').value = user.username;
			$('login_password').value = user.password;
		}else{
			$('login_username').value = "";
			$('login_password').value = "";
		}
	},
	loggedInAsCallback: function (data) {
    	if(data.EMail == 'anonym@nve.no') {
    		login_page.showLoginStatus(false);
    		main.showDialogWithMessage(ERROR_WRONG_LOGIN, "Login");
    	} else {
    		login_page.showLoginStatus(true);
    		main.hideDialog();
    	}
    	
    	login_page.updateGroups(login_page.showGroupStatus());
    },
    loginCallback: function(data) {
		main.login = LoggedInAs(login_page.loggedInAsCallback);
	},
	
	updateGroups: function(callback){
		var user = UserStore.get(main.currentMode());
		var groupsCommand = new ObserversGroupsCommand(user);
		groupsCommand.fetch(function(groups){
			user.groups = groups;
			UserStore.save(main.currentMode(), user);
			
			if(callback)
				callback(user);
		});
	},
	
	loginErrorCallback: function(data) {
//		alert("errir");
//		login_page.showLoginStatus(false);
//		setTimeout(main.errorDialog, 5000);
		main.errorDialog();
	},
	
	clickLogOut: function() {
		document.getElementById('login_username').value = "";
		document.getElementById('login_password').value = "";
		
		UserStore.clear(main.currentMode());
		Logout(login_page.logoutCallback, login_page.ert);
	},
	
	ert: function(data) 
	{
		alert("error");
	},
	
	logoutCallback: function() {
		console.log("logged out...");
		main.login = {data: {"EMail" : "anonym@nve.no", "FirstName" : "Anonym", "ObserverID" : 105}};
    	login_page.showLoginStatus(false);
	},
	
	showLoginStatus: function(loggedIn){
    	main.currentlyLoggedIn = loggedIn;
    	if(loggedIn == true) {
    		jQuery('#login').attr("style", 'background-image: url(img/loggedin.png)');
    		$('loginLogoutButton').value = LOGOUT_BUTTON;
    		jQuery("body").removeClass("notLoggedIn");
    	} else {
    		jQuery('#login').css("background-image", "url(img/loggedout.png)");
    		jQuery('#login').attr("style", 'background-image: url(img/loggedout.png)');
    		$('loginLogoutButton').value = LOGIN_BUTTON;
    		jQuery("body").addClass("notLoggedIn");
    	}
    	login_page.showGroupStatus();
	},
	
    showGroupStatus: function(){
    	var user = UserStore.get(main.currentMode());
    	var dropdown = jQuery(".groups-list select");
    	dropdown.html("");
    	
    	dropdown.append("<option value='0'>Ingen gruppe</option>");
    	jQuery.each(user.groups, function(i, group){
    		dropdown.append("<option value='"+ group.id +"'>" + group.name + "</option>")
    	});
    },
    
    relogin: function(){
    	var user = UserStore.get(main.currentMode());
    	
		if(user.isDefined()) {
			Login(user.username, user.password, login_page.loginCallback);
    	} else {
    		login_page.showLoginStatus(false);	
		}
    }
};
