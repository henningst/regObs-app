var main = (function()
{
    var main =
    {	
    	actualPage: 0,
    		
    	store: new NveStore(),
    	
    	login: {data: {"EMail" : "anonym@nve.no", "FirstName" : "Anonym", "ObserverID" : 105}},
    	
    	popup: null,
    	
    	waitingDialog: null,
    	
    	panels: null,
    	
		clickLogin: function() {
			var username = document.getElementById('login_username').value;
			var password = document.getElementById('login_password').value;
			
			main.showWaitingDialogWithMessage(LOGGING_IN);
			
			DataAccess.save(USERNAME, username);
			DataAccess.save(PASSWORD, password);
			Login(username, password, main.loginCallback, main.loginErrorCallback);
		},
		
		ok: function(data) {
			alert("ok");
		},
		
		cancel: function(data) {
			alert("cancel");
		},
		
		loginCallback: function(data) {
			main.login = LoggedInAs(main.loggedInAsCallback);
		},
		
		loginErrorCallback: function(data) {

    		main.showLoginStatus(false);
           	main.hideDialog();
			alert("No internet ?!");

			alert(ERROR_LOGIN);
		},
		
		clickLogOut: function() {
			document.getElementById('login_username').value = "";
			document.getElementById('login_password').value = "";
			
			DataAccess.save(USERNAME, "");
			DataAccess.save(PASSWORD, "");
			Logout(main.logoutCallback);
		},
		
		logoutCallback: function() {
        	main.showLoginStatus(false);
		},
		
		starred: function() {
			if(DataAccess.get(STARTUP_PAGE) == main.actualPage) {
				DataAccess.save(STARTUP_PAGE, 0);
				jQuery("#star").attr('src', 'img/notstared.png');	
			} else {
				DataAccess.save(STARTUP_PAGE, main.actualPage);
				jQuery("#star").attr('src', 'img/stared.png');	
			}
			
			main.toogleFavorite();
		},
		
		toogleFavorite: function(){
			if(DataAccess.get(STARTUP_PAGE) > 0){
				jQuery(".footer .fav-inactive").removeClass("fav-inactive");
			} else {
				jQuery(".footer .fav, .footer .camera").addClass("fav-inactive");
			}
				
		},
    	
        init: function()
        {
        	this.panels = new wink.ui.layout.SlidingPanels(
    	        {
    	        	duration: 500,
    	        	transitionType: 'default',
    	        	uId: 5,pages:
        	    		[
	      	        		'home',
	      	        		'settings',
	      	        		'snow',
	      	        		'snow_obs',
	      	        		'snow_hendelse',
	      	        		'snow_faresign',
	      	        		'snow_picture',
	      	        		'ice',
	      	        		'ice_obs',
	      	        		'ice_hendelse',
	      	        		'ice_faresign',
	      	        		'ice_picture',
	      	        		'water',
	      	        		'water_obs',
	      	        		'water_hendelse',
	      	        		'water_faresign',
	      	        		'water_picture',
	      	        		'dirt',
	      	        		'dirt_obs',
	      	        		'dirt_hendelse',
	      	        		'dirt_faresign',
	      	        		'dirt_picture',
	      	        		'learning_page',
	      	        		'information'
        	    		 ]
    	        }
    	    );
            document.body.appendChild(this.panels.getDomNode());
            
            main.waitingDialog = new wink.ui.xy.Popup();
            
			document.body.appendChild(main.waitingDialog.getDomNode());
			
            wink.subscribe('/slidingpanels/events/slidestart', {context: this, method: 'toggleBackButtonDisplay', arguments: 'start'});
            wink.subscribe('/slidingpanels/events/slideend', {context: this, method: 'toggleBackButtonDisplay', arguments: 'end'});

            //init danger signs
            //TODO what if we want to update the mobile clients?
            var registrationKD = DataAccess.get(RegistrationKD.name);
            var dangerSign = DataAccess.get(DangerSignKD.name);
            var activityInfluenced = DataAccess.get(ActivityInfluencedKD.name);
            var damageExtent = DataAccess.get(DamageExtentKD.name);
            
            if(registrationKD == null) 
        	{
            	GetObjectFromServer(new RegistrationKD(), main.fillRegistrationKD);
        	}
            else 
            {
            	main.fillRegistrationKD(registrationKD);
            }
            
            if(dangerSign == null) 
            {
            	GetObjectFromServer(new DangerSignKD(), main.fillDangerSign);
            } 
            else 
            {
            	main.fillDangerSign(dangerSign);
            }
            
            if(activityInfluenced == null) 
            {
            	GetObjectFromServer(new ActivityInfluencedKD(), main.fillActivityInfluenced);
            } 
            else 
            {
            	main.fillActivityInfluenced(activityInfluenced);
            }
            
            if(damageExtent == null) 
            {
            	GetObjectFromServer(new DamageExtentKD(), main.fillDamageExtent);
            } 
            else 
            {
            	main.fillDamageExtent(damageExtent);
            }
            
			var username = DataAccess.get(USERNAME);
			var password = DataAccess.get(PASSWORD);
			
			if(username != undefined && password != undefined) {
				Login(username, password, main.loginCallback);
        	} else {
        		main.showLoginStatus(false);	
			}
			
			main.slideToFavorite();
			main.toogleFavorite();
        },
        
        initPhonegap: function()
        {
        	document.addEventListener("backbutton", main.backKeyDown, true);
        },
        
        backKeyDown: function() 
        {
        	if(main.actualPage != 0) {

            	main.panels.slideBack();
        	}
        	else 
    		{
        		navigator.app.exitApp();
    		}
        },
        
        favoritePage: function(){
        	switch (DataAccess.get(STARTUP_PAGE)) {
				case 1:
					return 'snow';
				case 2:
					return 'ice';
				case 3:
					return 'water';
				case 4:
					return 'dirt';
	
				default:
					return 'home';
	    	}
        },
        
        slideToFavorite: function(){
        	var page = main.favoritePage();
        	main.panels.slideTo(page);
        },
        
        slideToFavoritePicture: function(){
        	var page = main.favoritePage();
        	main.panels.slideTo(page + "_picture");
        },
        
        showFinishedUploadMessage: function()
        {
        	jQuery('.waitingDialog').html( "" +
        			"<div> " +
	        			"<p> Takk for observasjon </p>" +
	        			"<button type='button' style='width: auto; display: inline' " +
	        				"class='w_bg_light c_button w_button w_radius' onclick='main.hideDialog();'>" +OK + 
	        			"</button>" +
	        			"<button type='button' style='width: auto; display: inline' " +
	        				"class='w_bg_light c_button w_button w_radius' onclick='main.hideDialog();'>" +SEND_EMAIL + 
	        			"</button>" +
        			"</div>");
        },
        
        errorDialog: function() 
        {
        	jQuery('.waitingDialog').html( "" +
        			"<div> " +
	        			"<p> " +AN_ERROR_OCCURED  +"</p>" +
	        			"<button type='button' style='width: auto; display: inline' " +
	        				"class='w_bg_light c_button w_button w_radius' onclick='main.hideDialog();'>" +OK + 
	        			"</button>" +
        			"</div>");
        },
        
        showDialogWithMessage: function(message) 
        {
        	main.waitingDialog.popup({
		        content: "<div class='waitingDialog'>" +
		        	message +
		        "</div>",
		    });
        },
        
        showWaitingDialogWithMessage: function(message) 
        {
        	main.startDialog();
        	main.waitingDialog.popup({
		        content: "<div class='waitingDialog'>" +
		        	message + "<img src='img/ajax-loader.gif' />" +
		        "</div>",
		        layerCallback: { context: main, method: 'nothing' } ,
		    });
        },
        
        nothing: function()
        {
        	
        },
        
        startDialog: function()
        {
        	jQuery('.pp_popup').css('z-index', 999);
        },
        
        hideDialog: function() {
        	main.waitingDialog.hide();
        	jQuery('.pp_popup').css('z-index', -99);
        },
        
        fillRegistrationKD: function(data)
        {
        	DataAccess.save(RegistrationKD.name, data);

        	snow_picture.fillRegistrationKD(data);
        	water_picture.fillRegistrationKD(data);
        	ice_picture.fillRegistrationKD(data);
        	dirt_picture.fillRegistrationKD(data);
        },
        
        fillDangerSign: function(data) {
        	DataAccess.save(DangerSignKD.name, data);
        	
        	console.log(data);
        	
        	snow_faresign.fillDangerSign(data);
        	water_faresign.fillDangerSign(data);
        	ice_faresign.fillDangerSign(data);
        	dirt_faresign.fillDangerSign(data);
        },
        
        fillActivityInfluenced: function(data) {
        	DataAccess.save(ActivityInfluencedKD.name, data);
        	
			snow_hendelse.fill_activity_influenced(data);
        	water_hendelse.fill_activity_influenced(data);
        	dirt_hendelse.fill_activity_influenced(data);
        	ice_hendelse.fill_activity_influenced(data);
        },
        
        fillDamageExtent: function(data) {
        	DataAccess.save(DamageExtentKD.name, data);
        	
			snow_hendelse.fill_radius(data);
			water_hendelse.fill_radius(data);
			dirt_hendelse.fill_radius(data);
			ice_hendelse.fill_radius(data);
        },
        
        loggedInAsCallback: function (data) {
        	if(data.EMail != 'anonym@nve.no') {
        		main.showLoginStatus(true);
        	} else {
        		main.showLoginStatus(false);
        	}
        },
        
        showLoginStatus: function(loggedIn){
        	if(loggedIn == true) {
        		jQuery('#login').attr("style", 'background-image: url(img/loggedin.png)');
        	} else {
        		jQuery('#login').attr("style", 'background-image: url(img/loggedout.png)');
        	}
        	main.hideDialog();
        },
        
        hideNve: function(){
        	jQuery("#regobs-info").hide();
        },
        
        showNve: function(){
        	jQuery("#regobs-info").show();
        },
        
        toggleBackButtonDisplay: function(params, status) {

        	if(params.id != 'home') {
        		if(status == 'start') {
    				$('back').style.display = 'block';
    				$('star').style.display = 'inline-table';
    				main.hideNve();
    			}
        	}
        	
        	main.toogleFavorite();
        	
        	switch(params.id) {
        		case 'home':
        			if(status == 'end') {
        				
        			}
        			
        			if(status == 'start') {
        				$('back').style.display = 'none';
        				$('star').style.display = 'none';
        				
        				main.showNve();        				
        				main_page.init();
        				main.actualPage = 0;
        			}
        			break;
        			
        		case 'settings':
        			settings_page.init();
    				$('star').style.display = 'none';
        			
        			break;
        			
        		case 'snow':
        			if(status == 'start') {
        				snow_page.init();
        				//$('mainBody').style.backgroundImage = "url('img/snow_background.png')";
        				
        				main.actualPage = SNOW;
        			}
        			break;
        			
        		case 'snow_obs':
        			if(status == 'start') {
        				snow_page.init();
        			}
        			break;
        			
        		case 'snow_picture':
        			if(status == 'start') {
        				snow_picture.init();
        			}
        			break;
        			
        		case 'snow_hendelse':
        			if(status == 'start') {
        				snow_hendelse.init();
        			}
        			break;
        			
        		case 'snow_faresign':
        			if(status == 'start') {
        				snow_faresign.init();
        			}
        			break;
        			
        		case 'water':
        			if(status == 'start') {
        				water_page.init();
        				
        				main.actualPage = WATER;
        			}
        			break;

        		case 'water_obs':
        			if(status == 'start') {
        				water_page.init();
        			}
        			break;
        			
        		case 'water_picture':
        			if(status == 'start') {
        				water_picture.init();
        			}
        			break;
        			
        		case 'water_hendelse':
        			if(status == 'start') {
        				water_hendelse.init();
        			}
        			break;
        			
        		case 'water_faresign':
        			if(status == 'start') {
        				water_faresign.init();
        			}
        			break;
        			
        		case 'ice':
        			if(status == 'start') {
        				ice_page.init();
        				
        				main.actualPage = ICE;
        			}
        			break;
        			
        		case 'ice_obs':
        			if(status == 'start') {
        				ice_page.init();
        			}
        			break;
        			
        		case 'ice_picture':
        			if(status == 'start') {
        				ice_picture.init();
        			}
        			break;
        			
        		case 'ice_hendelse':
        			if(status == 'start') {
        				ice_hendelse.init();
        			}
        			break;
        			
        		case 'ice_faresign':
        			if(status == 'start') {
        				ice_faresign.init();
        			}
        			break;
        			
        		case 'dirt':
        			if(status == 'start') {
        				dirt_page.init();
        				
        				main.actualPage = DIRT;
        			}
        			break;
        			
        		case 'dirt_obs':
        			if(status == 'start') {
        				dirt_page.init();
        			}
        			break;
        			
        		case 'dirt_picture':
        			if(status == 'start') {
        				dirt_picture.init();
        			}
        			break;
        			
        		case 'dirt_hendelse':
        			if(status == 'start') {
        				dirt_hendelse.init();
        			}
        			break;
        			
        		case 'dirt_faresign':
        			if(status == 'start') {
        				dirt_faresign.init();
        			}
        			break;
        			
        		case 'learning_page':
        			if(status == 'start') {
        				learning_page.init();
        			}
        			break;
        			
        		case 'information':
        			if(status == 'start') {
        				information_page.init();
        			}
        			break;
        			
        		default:
        			break;
        	}
        }
    }
     
    window.addEventListener('load', wink.bind(main.init, main), false);
    document.addEventListener("deviceready", main.initPhonegap, false);

    return main;
}());

