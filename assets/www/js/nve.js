var geo = {
	last_page_location : null,
	requestPosition: function(callback){
		console.log("henter geo position");
		
		if(device.platform == "Android")
		{
			PhoneGap.exec(function(){console.log("geo plugin ok");}, function(){console.log("geo plugin fail");}, 
				'NativeLocation', callback, []);
		}else{
			navigator.geolocation.getCurrentPosition(
					eval(callback), 
                    function(e){ console.log("error," + e); }, 
                    { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
                  );
		}
	},
	
	resume : function(){
		if(main.initialised && geo.last_page_location != null)
			geo.requestPosition(geo.last_page_location);
	},
	
	pause: function(){
		console.log("pauseing the phone");
	},
	
	convertToPosition: function(lat, long, acc, time){
		var date = new Date(time);
		var position = {
				coords: {
					latitude: lat,
					longitude: long,
					accuracy: acc,
					taken : date
				}
			};
		
		return position; 
	},

	noGoodAccuracyFound: function() { }
};

var main = (function()
{
    var main =
    {	
    	actualPage: 0,
    		
    	store: new NveStore(),
    	
    	login: {data: {"EMail" : "anonym@nve.no", "FirstName" : "Anonym", "ObserverID" : 105}},
    	
    	popup: null,
    	
    	waitingDialog: null,
    	
    	lastPage: "",
    	
    	panels: null,
    	
    	lastRegID: -1,
    	
    	scroller : null,
    	
    	inTestMode: false,
    	
    	initialised: false,
    	
		clickLogin: function() {
			if(main.login.data.EMail == 'anonym@nve.no')
			{
				//login
				var username = document.getElementById('login_username').value;
				var password = document.getElementById('login_password').value;
				
				main.showWaitingDialogWithMessage(LOGGING_IN);
				
				DataAccess.save(USERNAME, username);
				DataAccess.save(PASSWORD, password);
				Login(username, password, main.loginCallback, main.loginErrorCallback);
			}
			else 
			{
				//logout
				main.clickLogOut();
			}
		},
		
		loginCallback: function(data) {
			main.login = LoggedInAs(main.loggedInAsCallback);
		},
		
		loginErrorCallback: function(data) {
//			alert("errir");
//    		main.showLoginStatus(false);
//    		setTimeout(main.errorDialog, 5000);
			main.errorDialog();
		},
		
		clickLogOut: function() {
			document.getElementById('login_username').value = "";
			document.getElementById('login_password').value = "";
			
			DataAccess.save(USERNAME, "");
			DataAccess.save(PASSWORD, "");
			Logout(main.logoutCallback, main.ert);
		},
		
		ert: function(data) 
		{
			alert("error");
		},
		
		logoutCallback: function() {
			main.login = {data: {"EMail" : "anonym@nve.no", "FirstName" : "Anonym", "ObserverID" : 105}};
        	main.showLoginStatus(false);
        	main.login = LoggedInAs(main.loggedInAsCallback);
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
	      	        		'snow_see_obs',
	      	        		'snow_see_varsel',
	      	        		'snow_obs',
	      	        		'snow_hendelse',
	      	        		'snow_faresign',
	      	        		'snow_picture',
	      	        		'ice',
	      	        		'ice_see_obs',
	      	        		'ice_see_varsel',
	      	        		'ice_obs',
	      	        		'ice_hendelse',
	      	        		'ice_faresign',
	      	        		'ice_picture',
	      	        		'water',
	      	        		'water_see_obs',
	      	        		'water_see_varsel',
	      	        		'water_obs',
	      	        		'water_hendelse',
	      	        		'water_faresign',
	      	        		'water_picture',
	      	        		'dirt',
	      	        		'dirt_see_obs',
	      	        		'dirt_obs',
	      	        		'dirt_hendelse',
	      	        		'dirt_faresign',
	      	        		'dirt_picture',
	      	        		'learning_page',
	      	        		'information'
        	    		 ]
    	        }
    	    );
            $("wrapper").appendChild(this.panels.getDomNode());
            
            main.waitingDialog = new wink.ui.xy.Popup();
			document.body.appendChild(main.waitingDialog.getDomNode());
            	
        	$('snow_carusel').appendChild(main.createCarousel(SNOW, SNOW_TEXT).getDomNode());
        	$('ice_carusel').appendChild(main.createCarousel(ICE, ICE_TEXT).getDomNode());
        	$('dirt_carusel').appendChild(main.createCarousel(DIRT, DIRT_TEXT).getDomNode());
        	$('water_carusel').appendChild(main.createCarousel(WATER, WATER_TEXT).getDomNode());
            
			wink.subscribe('/carousel/events/switch', {context: this, method: 'carouselChanged'}); 
			
            wink.subscribe('/slidingpanels/events/slidestart', {context: this, method: 'toggleBackButtonDisplay', arguments: 'start'});
            wink.subscribe('/slidingpanels/events/slideend', {context: this, method: 'toggleBackButtonDisplay', arguments: 'end'});

			
			main.slideToFavorite();
			main.toogleFavorite();
			main.gotoTest();
			
			var wrapperHeight = wink.ux.window.height - 2* 45;
			$('wrapper').style.height = wrapperHeight + "px";
			//main.scroller = new iScroll('wrapper');
			
        },
        
        populateBoxes: function(force)
        {
        	//init danger signs
            //TODO what if we want to update the mobile clients?
            var registrationKD = (force ? null : DataAccess.get(RegistrationKD.name)) ;
            var dangerSign = (force ? null : DataAccess.get(DangerSignKD.name));
            var activityInfluenced = (force ? null : DataAccess.get(ActivityInfluencedKD.name));
            var damageExtent = (force ? null : DataAccess.get(DamageExtentKD.name));
            
            if(registrationKD == null) 
        	{
            	GetObjectFromServer(new RegistrationKD(), main.fillRegistrationKD, function(error) { main.fillRegistrationKD(DataAccess.get(RegistrationKD.name)); });
        	}
            else 
            {
            	main.fillRegistrationKD(registrationKD);
            }
            
            if(dangerSign == null) 
            {
            	GetObjectFromServer(new DangerSignKD(), main.fillDangerSign, function(error) { main.fillDangerSign(DataAccess.get(DangerSignKD.name)); });
            } 
            else 
            {
            	main.fillDangerSign(dangerSign);
            }
            
            if(activityInfluenced == null) 
            {
            	GetObjectFromServer(new ActivityInfluencedKD(), main.fillActivityInfluenced, function(error) { main.fillActivityInfluenced(DataAccess.get(ActivityInfluencedKD.name)); });
            } 
            else 
            {
            	main.fillActivityInfluenced(activityInfluenced);
            }
            
            if(damageExtent == null) 
            {
            	GetObjectFromServer(new DamageExtentKD(), main.fillDamageExtent, function(error) { main.fillDamageExtent(DataAccess.get(DamageExtentKD.name)); });
            } 
            else 
            {
            	main.fillDamageExtent(damageExtent);
            }
        },
        
        carouselMoved: function(data)
        {
        	switch(data.carouselId)
        	{
        	case SNOW:
        		snow_hendelse.changeCarouselTo(data.currentItemIndex);
        		
        		break;
        		
        	case DIRT:
        		dirt_hendelse.changeCarouselTo(data.currentItemIndex);
        		
        		break;
        		
        	case ICE:
        		ice_hendelse.changeCarouselTo(data.currentItemIndex);
        		
        		break;
        		
        	case WATER:
        		water_hendelse.changeCarouselTo(data.currentItemIndex);
        		
        		break;
        	}
        },

        carouselChanged: function (data)
        {
        	switch(data.carouselId)
        	{
        	case SNOW:
        		snow_faresign.changeCarouselTo(data.currentItemIndex);
        		break;
        	case ICE:
        		ice_faresign.changeCarouselTo(data.currentItemIndex);
        		break;
        	case WATER:
        		water_faresign.changeCarouselTo(data.currentItemIndex);
        		break;
        	case DIRT:
        		dirt_faresign.changeCarouselTo(data.currentItemIndex);
        		break;
        	}
        },
        
        gotoTest: function ()
        {
        	if(main.inTestMode)
        	{
        		SERVER_URL = TEST;
        		main.inTestMode = false;
        		$('test_button').value = USE_TESTMODE_BUTTON;
        		jQuery('#header').removeClass('testMode');
        	}
        	else 
        	{
        		SERVER_URL = TEST;
        		main.inTestMode = true;
        		$('test_button').value = USE_PROD_BUTTON;
        		jQuery('#header').addClass('testMode');
        	}
        },
        
        logData: function (data)
        {
        	console.log(data);
        },
        
        initPhonegap: function()
        {
        	document.addEventListener("backbutton", main.backKeyDown, true);
			window.plugins.googleAnalyticsPlugin.start("UA-32403556-1");

            main.populateBoxes(true);
            
			var username = DataAccess.get(USERNAME);
			var password = DataAccess.get(PASSWORD);
			
			if(username != undefined && password != undefined) {
				Login(username, password, main.loginCallback);
        	} else {
        		main.showLoginStatus(false);	
			}
			
			main.initialised = true;
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
        	main.hideDialog();
        	
        	main.showDialog( "" +
        			"<div> <h3>Registrering fullført</h3>" +
	        			"<p> Takk for observasjon </p>" +
	        			"<button type='button' " +
	        				"class='w_bg_light c_button w_button w_radius popupbutton-dual' onclick='main.hideDialog();'>" +OK + 
	        			"</button>" +
	        			"<button type='button' " +
	        				"class='w_bg_light c_button w_button w_radius popupbutton-dual' onclick='main.sendEmail();'>" +SEND_EMAIL + 
	        			"</button>" +
        			"</div>");
        },
        
        errorDialog: function() 
        {
        	main.showDialogWithMessage(AN_ERROR_OCCURED);
        },
        
        showDialogWithMessage: function(message, header){
        	if(header == undefined)
        		header = "Melding"
        			
        	main.showDialog("<h3>"+ header +"</h3><p>" + message + "</p><button type='button' " +
    				"class='w_bg_light c_button w_button w_radius popupbutton-single' onclick='main.hideDialog();'>" +OK + 
        			"</button>");
        },
        
        showWaitingDialogWithMessage: function(message) 
        {
        	main.showDialog("<div class='waitingDialog'>" +
		        	message + "<img src='img/ajax-loader.gif' />" +
		        "</div>");
        },
        
        createCarousel: function(id, items)
        {
        	var properties = 
            {
				'itemsWidth': 200,
				'itemsHeight': 35,
				'autoAdjust': 1,
				'autoAdjustDuration': 400,
				'firstItemIndex': CAROUSEL_STANDART,
				'uId': id,
				'items':
        		[
            	]
        	};
        	
        	for(var i = 0; i < items.length; ++i)
        	{
        		properties.items.push({'type': 'string', 'content': "<div style='font-size: 0.8em'>" +items[i] +"</div>"});
        	}

        	return new wink.ui.xy.Carousel(properties);
        },
        
        nothing: function()
        {
        	
        },
        
        sendEmail: function()
        {
        	main.hideDialog();
        	GetObjectFromServer(new SendEmail(main.lastRegID));
        },
        
        showDialog: function(content)
        {
        	jQuery("body").scrollTop(0);
        	jQuery("#popup_content").html(content);
        	jQuery("#popup").css("top", (wink.ux.window.height * .4) + "px");
        	jQuery("#footer").hide();
        	jQuery("#dialog").show();
        	
        	var dialog =  jQuery("#dialog");
        	if(dialog !=null){
        		dialog.bind("touchmove", function(event){
        	     event.preventDefault();
        	});
        	}
        },
        
        hideDialog: function() {
        	jQuery("body").css("overflow", "inherit");
        	jQuery('#dialog').hide().unbind("touchmove");
        	jQuery("#footer").show();
        },
        
        fillRegistrationKD: function(data)
        {
			if(data == null)
				return;
			
        	DataAccess.save(RegistrationKD.name, data);

        	snow_picture.fillRegistrationKD(data);
        	water_picture.fillRegistrationKD(data);
        	ice_picture.fillRegistrationKD(data);
        	dirt_picture.fillRegistrationKD(data);
        },
        
        fillDangerSign: function(data) {
			if(data == null)
				return;
			
        	DataAccess.save(DangerSignKD.name, data);
        	
        	snow_faresign.fillDangerSign(data);
        	water_faresign.fillDangerSign(data);
        	ice_faresign.fillDangerSign(data);
        	dirt_faresign.fillDangerSign(data);
        },
        
        fillActivityInfluenced: function(data) {
			if(data == null)
				return;
			
        	DataAccess.save(ActivityInfluencedKD.name, data);
        	
			snow_hendelse.fill_activity_influenced(data);
        	water_hendelse.fill_activity_influenced(data);
        	dirt_hendelse.fill_activity_influenced(data);
        	ice_hendelse.fill_activity_influenced(data);
        },
        
        fillDamageExtent: function(data) {
			if(data == null)
				return;
			
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
        		$('loginLogoutButton').value = LOGOUT_BUTTON;
        	} else {
        		jQuery('#login').attr("style", 'background-image: url(img/loggedout.png)');
        		$('loginLogoutButton').value = LOGIN_BUTTON;
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
        	console.log("-------backbutton display");
        	console.log(params.id);
        	console.log(status);
        	if(params.id != 'home') {
        		if(status == 'start') {
    				$('back').style.display = 'block';
    				$('star').style.display = 'inline-table';
    				main.hideNve();
    			}
        	}
        	
        	main.toogleFavorite();
        	
        	if(status == 'start' && main.initialised) {
        		//google analytics
    			window.plugins.googleAnalyticsPlugin.trackPageView(params.id);
        	}
        	
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
    				snow_page.init();
    				
    				main.actualPage = SNOW;
        			break;
        			
        		case 'snow_see_obs':
        			if(status == 'start') {
        				if( $('snow_see_obs').innerHTML == "")
        					$('snow_see_obs').innerHTML = '<iframe src="http://regobs.varsom.no/Avalanche"></iframe>';
//        				snow_see_obs.init();
        			}
        			break;
        			
        		case 'snow_see_varsel':
        			if(status == 'start') 
    				{
        				if ( $('snow_see_varsel').innerHTML == "" )
        					$('snow_see_varsel').innerHTML = '<iframe src="http://regobs.varsom.no/AvalancheWarning/Published"></iframe>';
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
        			
        		case 'water_see_obs':
        			if(status == 'start') {
        				if( $('water_see_obs').innerHTML == "" )
        					$('water_see_obs').innerHTML = '<iframe src="http://regobs.varsom.no/Flood"></iframe>';
        			}
        			break;
        			
        		case 'water_see_varsel':
        			if(status == 'start') 
    				{
        				if($('water_see_varsel').innerHTML == "")
        					$('water_see_varsel').innerHTML = '<iframe src="http://www.nve.no/no/Flom-og-skred/Flomvarsling-og-beredskap/Flomvarsling-og-meldinger---arkiv/"></iframe>';
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
        			
        		case 'ice_see_obs':
        			if(status == 'start') {
        				if( $('ice_see_obs').innerHTML == "" )
        					$('ice_see_obs').innerHTML = '<iframe src="http://regobs.varsom.no/Ice"></iframe>';
        			}
        			break;
        			
        		case 'ice_see_varsel':
        			if(status == 'start') 
    				{
        				if( $('ice_see_varsel').innerHTML == "" )
        					$('ice_see_varsel').innerHTML = '<iframe src="http://www.nve.no/no/Vann-og-vassdrag/Hydrologi/Is-og-vanntemperatur/Ismelding/Landsoversikt/"></iframe>';
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

        		case 'dirt_see_obs':
        			if(status == 'start') {
        				if($('dirt_see_obs').innerHTML == "")
        					$('dirt_see_obs').innerHTML = '<iframe src="http://regobs.varsom.no/LandSlide"></iframe>';
        			}
        			break;
        			
        			//Not available by now
//        		case 'dirt_see_varsel':
//        			if(status == 'start') 
//    				{
//        				$('dirt_see_varsel').innerHTML = '<iframe src="http://regobs.varsom.no/AvalancheWarning/Published"></iframe>';
//    				}
//        			break;
        			
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
        				learning_page.init(main.lastPage);
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
        	
        	main.lastPage = params.id;
        	
        }
    };
    
    window.addEventListener('load', wink.bind(main.init, main), false);
    document.addEventListener("deviceready", main.initPhonegap, false);
            
    document.addEventListener("resume", geo.resume, false);
    document.addEventListener("pause", geo.pause, false);
    return main;
}());



