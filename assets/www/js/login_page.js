var login_page = {
		
	init: function() {
		$('header_middle_text').innerHTML = "Login";
		jQuery("#regobs-name").hide();
		
		var user = UserStore.get(main.currentMode());
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
    		var user = UserStore.get(main.currentMode());
    		user.id = data.ObserverID;
    		UserStore.save(main.currentMode(), user);

    		login_page.showLoginStatus(true);
    		main.hideDialog();
    		
    		main.panels.slideBack();
    	}
    	
    	login_page.updateGroups(login_page.showGroupStatus());
    	login_page.updateComp();
    },
    
    updateComp : function(){
    	var user = UserStore.get(main.currentMode());
    	var command = new ObserversCompCommand(user);
    	command.fetch(function (comp) {
    	  user.competancy = new ObserverCompetancy(comp);
    	  UserStore.saveComp(main.currentMode(), user);
    	});
    },
    
    loginCallback: function(data) {
		main.login = LoggedInAs(login_page.loggedInAsCallback);
	},
	
	updateGroups: function(callback){
		var user = UserStore.get(main.currentMode());
		var groupsCommand = new ObserversGroupsCommand(user);
		groupsCommand.fetch(function(groups){
			user.groups = groups;
			UserStore.saveGroups(main.currentMode(), user);
			login_page.showGroupStatus();
			
			if(callback)
				callback(user);
		});
	},
	
	loginErrorCallback: function(data) {
		main.handleConnectionFailed(data);
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
    	
    	var list = "";
    	jQuery.each(user.groups, function(i, group){
    		list = list + "<div><input type='radio' name='group' value='"+ group.id +"' title='"+ group.name +"'/>"+ group.name +"</div>";
    	});
		var dialog = "<div class='max80px divScroller'><div class='list scrollable' id='group_scroller'><div><input type='radio' name='group' value='0' checked='checked' title='Gruppe'>Ingen gruppe</div>"+ list +"</div></div>";
		jQuery(".groups").html(dialog);
		jQuery("input[name=group]").live('click', function(){
			login_page.groupChangedTo(this);
		});
		
    },
    
    groupChangedTo: function(newValue){
    	var newGroup = jQuery(newValue).val();
    	var name = jQuery(newValue).attr("title");
    	
    	console.log("newValue", name, jQuery(".groupButton span"));
    	
    	
    	jQuery(".groupButton span").text(name);
    	
    	jQuery(".selectedGroup").val(newGroup);
    	
    	if(newGroup > 0)
    		jQuery(".groupButton").addClass("pressed");
    	else
    		jQuery(".groupButton").removeClass("pressed");
    },
    
    relogin: function(){
    	var user = UserStore.get(main.currentMode());
    	
		if(user.isDefined()) {
			Login(user.username, user.password, login_page.loginCallback);
			login_page.updateGroups(login_page.showGroupStatus());
    	} else {
    		login_page.showLoginStatus(false);	
		}
    }
};
