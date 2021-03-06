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
	loggedInAsCallback: function (data, shouldPerserveDialog) {
    	if(data.EMail == 'anonym@nve.no') {
    		login_page.showLoginStatus(false);
    		main.showDialogWithMessage(ERROR_WRONG_LOGIN, "Login");
    	} else {
    		var user = UserStore.get(main.currentMode());
    		console.log("pp: relogin user " + JSON.stringify(user))
    		user.id = data.ObserverID;
    		user.nick = data.NickName;
    		UserStore.save(main.currentMode(), user);

    		login_page.showLoginStatus(true);
    		
    		if(shouldPerserveDialog !== true)
    			main.hideDialog();
    		
    		if(main.currentPage == "login_page")
    			main.panels.slideBack();
    	}
    	if(main.haveConnection()){
	    	login_page.updateGroups(login_page.showGroupStatus());
	    	login_page.updateComp();
    	}
    },
    
    updateComp : function(){
    	var user = UserStore.get(main.currentMode());
    	var command = new ObserversCompCommand(user);
    	command.fetch(function (comp) {
    	  user.competancy = new ObserverCompetancy(comp);
    	  UserStore.saveComp(main.currentMode(), user);
    	});
    },
    
    loginCallback: function(data, shouldPerserveDialog) {
		main.login = LoggedInAs(function(d) {
			login_page.loggedInAsCallback(d, shouldPerserveDialog); 
		});
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
		main.runIfConnection(function(){
			main.showDialogWithMessage(ERROR_WRONG_LOGIN);
		});
		
		login_page.relogin();
	},
	
	clickLogOut: function() {
		document.getElementById('login_username').value = "";
		document.getElementById('login_password').value = "";
		
		UserStore.clear(main.currentMode());
		Logout(login_page.logoutCallback, login_page.logoutCallback);
	},
	
	
	logoutCallback: function() {
		console.log("logged out...");
		main.login = {data: {"EMail" : "anonym@nve.no", "FirstName" : "Anonym", "ObserverID" : 105}};
    	login_page.showLoginStatus(false);
	},
	
	showLoginStatus: function(loggedIn){
		if(loggedIn === DEFINED){
			loggedIn = true;
			jQuery('#login').attr("style", 'background-image: url(img/might-loggedin.png)');
    		$('loginLogoutButton').value = LOGOUT_BUTTON;
    		jQuery("body").removeClass("notLoggedIn");
			
    		main.currentlyLoggedIn = loggedIn;
    		main.notConfirmedLogin = true;
    		login_page.showGroupStatus();
    		return;
		}
			
		
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
    	main.currentlyLoggedIn = loggedIn;
    	main.notConfirmedLogin = false;
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
    
    relogin: function(callback, error, shouldPerserveDialog){
    	var user = UserStore.get(main.currentMode());
    	
		if(user.isDefined()) {
			if(!main.haveConnection()){
				login_page.showLoginStatus(DEFINED);	
			}
				
			Login(user.username, user.password, function(data){
				login_page.loginCallback(data, shouldPerserveDialog);
				if(callback){
					callback();
				}
			}, function(data){
				login_page.loginCallback(data, shouldPerserveDialog);
				if(error)
					error(data);
			});
			login_page.updateGroups(login_page.showGroupStatus());
    	} else {
    		login_page.showLoginStatus(false);
    		if(callback && isFunction(callback))
    			callback();
		}
    }
};
