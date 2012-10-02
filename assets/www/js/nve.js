TEST_MODE = "test_mode";
STAGE_MODE = "stage_mode";

var geo = {
	last_page_location : null,
	requestPosition: function(callback, shouldHandlePosition){
		if(window.PhoneGap === undefined)
			return;
		
		console.log("henter geo position");
		
		if(shouldHandlePosition == undefined)
			shouldHandlePosition = false;
		console.log("requestiong position for " + device.platform);
		if(device.platform == "android")
		{
			PhoneGap.exec(function(){console.log("geo plugin ok");}, function(){ geo.noGoodAccuracyFound(); }, 
				'NativeLocation', callback, [shouldHandlePosition]);
		}else{
			console.log("call back to " + callback);
			
			if(main.initialised == true){
				navigator.geolocation.getCurrentPosition(
						eval(callback),
	                    function(e){
							console.log("error;");
							console.log(e.message);
							if(shouldHandlePosition)
								geo.noGoodAccuracyFound();
						}, 
	                    { maximumAge: 500, timeout: 3000, enableHighAccuracy: true }
	                  );
			}else{
				setTimeout(function(){
					geo.requestPosition(callback, shouldHandlePosition);
				}, 500);
			}
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
				},
				timestamp: time
			};
		
		return position; 
	},

	noGoodAccuracyFound: function() { 
		main.hideDialog();
		main.showDialogWithMessage(ERROR_NO_POSITION, "Posisjon utilgjennelig");
	}
};

var omerade = {
		parseArea : function(data){
			console.log("omerade");
			console.log(data);
			var res = JSON.parse(data);
			
			if(res != null && res.features != undefined && res.features.length > 0) {
				return {
					omeradeid: res.features[0].attributes.OMRAADEID +OMRAADE_ID_OFFSET,
					omeradenavn: res.features[0].attributes.OMRAADENAVN,
					oppdatert: true
				};
			}	
			
			return {
				omeradeid : null,
				omeradenavn : null,
				oppdater: false
			};
		},
		
		parseKommune : function(data){
			var res = JSON.parse(data);

			if(res != null && res.features != undefined && res.features.length > 0) {
				return {
					kommunenavn: res.features[0].attributes.KOMMNAVN,
					kommunenummer: res.features[0].attributes.KOMM_NR,
					oppdatert: true
				};
			}
			
			return {
				kommunenavn: null,
				kommunenummer: null,
				oppdatert: false
			};
		}
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
    	
    	currentlyLoggedIn : false,
    	
    	lastRegID: [],
    	
    	caruselListeners: [],
    	
    	addLastRegID: function(regId){
    		console.log("adding regid " + regId);
    		if(main.lastRegID.length == 0)
    			main.lastRegID = [regId];
    		else
    			main.lastRegID.push(regId);
    		
    		console.log("size of regid array " + main.lastRegID.length);
    	},
    	
    	clearRegID: function(){
    		main.lastRegID = [];
    	},
    	
    	scroller : null,
    	
    	inTestMode: false,
    	
    	initialised: false,
    	
		clickLogin: function() {
			if(main.currentlyLoggedIn == false)
			{
				//login
				var username = document.getElementById('login_username').value;
				var password = document.getElementById('login_password').value;
				
				main.showWaitingDialogWithMessage(LOGGING_IN);
				
				var user = new User(0, username, password);
				UserStore.save(main.currentMode(), user);
				Login(username, password, login_page.loginCallback, login_page.loginErrorCallback);
			}
			else 
			{
				//logout
				login_page.clickLogOut();
			}
		},
		
		
		currentUrl: function(){
			return SERVER_URL;
		},
		
		
		
		updateCollection: function(collection){
		  if(collection.size() > 0){
			  jQuery(".numPackages").hide().text(collection.size()).show();
			  
			  console.log("setting platform for: " +device.platform + " - " + main.store.getNotificationId())
			  if(device.platform === "iphone" || main.store.getNotificationId() == null )
			  {
				  console.log("------------ adding a notification " + collection.size() +  " ------------- ")
				  main.store.setNotificationId(4);
				  var notification =  new LocalNotification();
				  notification.add({
	                  date : new Date(),
	                  message : "Du har usendte observasjoner i regObs\n Gå inn i appen å trykk \"Send inn\" for å sende disse",
	                  ticker : "regObs har usendte observasjoner",
	                  repeatDaily : false,
	                  id : 4,
	                  badge: "" + collection.size(),
				  });
			  }
		  }else{
	        jQuery(".numPackages").hide();
        	console.log("------------ removeing ------------- ")
//        	new LocalNotification().cancelAll();
//        	new LocalNotification().cancel(4);
        	main.store.setNotificationId(null);
		  }
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
	      	        		'register',
	      	        		'snow',
	      	        		'snow_see_obs',
	      	        		'snow_see_varsel',
	      	        		'snow_obs',
	      	        		'snow_hendelse',
	      	        		'snow_faresign',
	      	        		'snow_picture',
	      	        		'snow_surface',
	      	        		'snow_activity',
	      	        		'ice',
	      	        		'ice_see_obs',
	      	        		'ice_see_varsel',
	      	        		'ice_obs',
	      	        		'ice_hendelse',
	      	        		'ice_faresign',
	      	        		'ice_cover',
	      	        		'ice_thickness',
	      	        		'ice_picture',
	      	        		'water',
	      	        		'water_see_obs',
	      	        		'water_see_varsel',
	      	        		'water_obs',
	      	        		'water_hendelse',
	      	        		'water_faresign',
	      	        		'water_picture',
	      	        		'water_level',
	      	        		'dirt',
	      	        		'dirt_see_obs',
	      	        		'dirt_obs',
	      	        		'dirt_hendelse',
	      	        		'dirt_faresign',
	      	        		'dirt_picture',
	      	        		'dirt_avalange',
	      	        		'learning_page',
	      	        		'information',
	      	        		'login_page'
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
			main.toogleTestMode();
			
			var wrapperHeight = wink.ux.window.height - 2* 45;
			$('wrapper').style.height = wrapperHeight + "px";
			//main.scroller = new iScroll('wrapper');
			
        },
        
        fillDropdown: function(kdObject, fillFunction, force){
            var cached = (force ? null : DataAccess.get(kdObject.name));
            if(cached == null) 
        	{
            	GetObjectFromServer(new kdObject, fillFunction, function(error) {  fillFunction(DataAccess.get(kdObject.name)); });
        	}
            else 
            {
            	fillFunction(cached);
            }
            
        },
        
        populateBoxes: function(force)
        {
            main.fillDropdown(LandSlideTriggerKD, main.fillLandSlideTriggerKD, force);
            main.fillDropdown(LandSlideSizeKD, main.fillLandSlideSizeKD, force);
            main.fillDropdown(LandSlideKD, main.fillLandSlideKD, force);
            main.fillDropdown(RegistrationKD, main.fillRegistrationKD, force);
            main.fillDropdown(DangerSignKD, main.fillDangerSign, force);
            main.fillDropdown(ActivityInfluencedKD, main.fillActivityInfluenced, force);
            main.fillDropdown(DamageExtentKD, main.fillDamageExtent, force);
            main.fillDropdown(WaterLevelRefKD, main.fillWaterLevelKD, force);
            main.fillDropdown(SnowDriftKD, main.fillSnowDriftKD, force);
            
            main.fillDropdown(EstimatedNumKD, main.fillEstimatedNumKD, force);
            main.fillDropdown(DestructiveSizeKD, main.fillDestructiveSizeKD, force);
            main.fillDropdown(AvalancheKD, main.fillAvalancheKD, force);
            
            main.fillDropdown(IceCoverBeforeKD, main.fillIceCoverBeforeKD, force);
            main.fillDropdown(IceCoverKD, main.fillIceCoverKD, force);
            
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
        	default:
        		main.caruselEvent(data);
        	}
        },
        
        caruselEvent : function(data){
        	main.caruselListeners[data.carouselId](data.currentItemIndex);
        },
        
        listenForCaruselEvent: function(id, callback){
        	main.caruselListeners[id] = callback;
        },
        
        
        gotoTest: function ()
        {
        	main.toogleTestMode();
        	
        	var user = UserStore.get(main.currentMode());
        	if(!user.isDefined()){
        		main.showDialogWithMessage(ERROR_NO_LOGIN_CURRENT_MODE, "Login");
        	}
        	
        },
        
        toogleTestMode: function(){
        	if(main.inTestMode)
        	{
        		SERVER_URL = STAGE;
        		SERVER_LOGIN_URL = STAGE_LOGIN;
        		REGISTER_URL = PROD_REGISTER_URL;
        		main.inTestMode = false;
        		$('test_button').value = USE_TESTMODE_BUTTON;
        		jQuery('#header').removeClass('testMode');
        		
        	}
        	else 
        	{
        		SERVER_URL = TEST;
        		SERVER_LOGIN_URL = TEST_LOGIN;
        		REGISTER_URL = STAGE_REGISTER_URL;
        		main.inTestMode = true;
        		$('test_button').value = USE_PROD_BUTTON;
        		jQuery('#header').addClass('testMode');
        	}
        	
        	login_page.relogin();
        },
        
        currentMode : function(){
        	if(main.inTestMode)
        		return TEST_MODE;
    		else
    			return STAGE_MODE;
        },
        
        logData: function (data)
        {
        	console.log(data);
        },
        
        initPhonegap: function()
        {
        	document.addEventListener("backbutton", main.backKeyDown, true);
        	if(window.analytics)
			{
        		window.analytics.start(GA_TRACKER_CODE);
			}else
			{
				window.analytics = {
						trackPageView  : function(){}
				}
			}

            main.populateBoxes(true);
            
            login_page.showLoginStatus(false);
            login_page.relogin();
			
			main.initialised = true;
			geo.requestPosition(main.nothing, false);
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
        	main.showDialog("<h3>Laster</h3><p>Går til favoritbildet</p>");
        	main.panels.slideTo(page + "_obs");
        	setTimeout(function(){
        		main.panels.slideTo(page + "_picture");
        		main.hideDialog();
        	}, 1000);
        	
        	
        },
        
        showFinishedUploadMessage: function()
        {
        	main.hideDialog();
        	
        	main.showDialog( "" +
        			"<div>"  + OBSERVATION_REGISTERED + 
	        			"<button type='button' " +
	        				"class='w_bg_light c_button w_button w_radius popupbutton-dual' onclick='main.clearRegID();main.hideDialog();'>" + OK + 
	        			"</button>" +
	        			"<button type='button' " +
	        				"class='w_bg_light c_button w_button w_radius popupbutton-dual emailButton' onclick='main.sendEmail();'>" +SEND_EMAIL + 
	        			"</button>" +
        			"</div>");
        },
        
        errorDialog: function() 
        {
        	main.showDialogWithMessage(AN_ERROR_OCCURED);
        },
        
        showDialogWithMessage: function(message, header){
        	if(header == undefined)
        		header = "Melding";
        			
            var content = jQuery("<div><h3>"+ header +"</h3><p></p><button type='button' " +
			"class='w_bg_light c_button w_button w_radius popupbutton-single' onclick='main.hideDialog();'>" +OK + 
			"</button></div>");
            
            var messageText = message;
            if(message.html)
            	messageText = message.html();
            else
            	messageText = "<span>" + message + "</span>";
            
        	content.find("p").wrap(messageText);
        	main.showDialog(content);
        },
        
        showWaitingDialogWithMessage: function(message) 
        {
        	main.dialogShowing = true;
        	main.dialogStarted = new Date().toString();
        	main.showDialog("<div class='waitingDialog'>" +
		        	message + "<img src='img/ajax-loader.gif' />" +
		        "</div>");
        	
        	var dateStarted = main.dialogStarted;
        	setTimeout(function(){
        		if(main.dialogShowing && dateStarted === main.dialogStarted)
    			{
        			main.hideDialog();
        			main.showDialogWithMessage(ERROR_TIMEOUT, "Tidsavbrudd");
    			}
        	}, 15000);
        },
        
        warnLoginBefore: function(after){
        	if(!main.currentlyLoggedIn)
        	{
        		main.showDialog( "<h3>Ikke innlogget</h3>" +
                    "<div><p>"  + NOT_LOGGED_IN_WARNING + "</p>"+
                      "<button type='button' " +
                        "class='w_bg_light c_button w_button w_radius popupbutton-dual' onclick='"+ after +"()'>" + OK + 
                      "</button>" +
                      "<button type='button' " +
                        "class='w_bg_light c_button w_button w_radius popupbutton-dual' onclick='main.goToAndHide(\"login_page\");'>" + LOGIN_BUTTON + 
                      "</button>" +
                    "</div>");
        	}else
    		{
        		eval(after + "()");
    		}
          
        },
        
        createCarousel: function(id, items, widthOfCaruselElement)
        {
        	if(widthOfCaruselElement === undefined)
        		widthOfCaruselElement = 200;
        	
        	var properties = 
            {
				'itemsWidth': widthOfCaruselElement,
				'itemsHeight': 35,
				'autoAdjust': 1,
				'autoAdjustDuration': widthOfCaruselElement * 2,
				'firstItemIndex': CAROUSEL_STANDART,
				'uId': id,
				'items':
        		[
        		 {'type': 'string', 'content': "<div style='font-size: 0.8em'>Ikke angit</div>"}
            	]
        	};
        	
        	for(var i = 1; i < items.length; ++i)
        	{
        		properties.items.push({'type': 'string', 'content': "<div style='font-size: 0.8em'>" +items[i] +"</div>"});
        	}

        	return new wink.ui.xy.Carousel(properties);
        },
        
        nothing: function()
        {
        	
        },
        
        isFocuse: false,
        setHeights: function(){
        	var height = jQuery(".sl_container").height();
        	var bodyHeight = jQuery("body").height();
        	var top = height - 52;
        	
        	jQuery(".addAbort").css("top", (top + 45) + "px");
        	jQuery(".sendGroup").css("top", (top) + "px");
        	
        	jQuery(".listScroller").css("height", (top- 100) + "px");
        	jQuery(".pageScroller").css("height", (bodyHeight - 55 - 52)+"px")
            
        	jQuery(".scrollable:visible:not(.scrolling)").each(function(){
        		console.log("pp: adding scroller");
        		var functions = {
            			enableContainingElements: function(arg){
            				if(arg.uxEvent){
    	        				var e = arg.uxEvent;
    	        				var target = arg.uxEvent.target;
    	        		         
    	        		        if (target instanceof HTMLSelectElement || target instanceof HTMLAnchorElement || 
    	        		        	target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement ||
    	        		        	jQuery(target).is(".ca_items") || jQuery(target).parents(".ca_items").length > 0 ) {
    	        		            scroller.disable();
    	        		            this._disable = true;
    	        		            jQuery("body").css("overflow", "inherit");
    	        		            console.log("pp: off");
    	        		            
    	        		        }else if (this._disable) {
    	        		        	console.log("pp: on");
    	        		        	window.scrollTo(0, 0);
    	        		        	jQuery("body").css("overflow", "none");
    	        		            scroller.enable();
    	        		            this._selectNode = null;
    	        		            this._disable = false;
    	        		        }
            				}
            			}
            	
            	};
	    		scroller = new wink.ui.layout.Scroller({
	                target: jQuery(this).attr("id"),
	                direction: "y",
	                callbacks: {
	                	scrollerTouched: { context: functions, method: 'enableContainingElements'}
	                }
	        	});

	    		jQuery(this).addClass("scrolling");
	    		
	    		function hiddenKeyboard(){
	    			var _this = this;
	    			setTimeout(function(){
	    				if(main.isFocuse === true)
	    					return;
	    				
			        	window.scrollTo(0, 0);
			        	jQuery("body").css("overflow", "none");
			        	scroller.enable();
			        	_this._selectNode = null;
			        	_this._disable = false;
			        	console.log("pp: on");
	    			}, 100);
	    		}
	    		
	    		function showingKeyboard(){
	    			scroller.disable();
		            this._disable = true;
		            jQuery("body").css("overflow", "inherit");
		            console.log("pp: off");
	    		}
	    		document.addEventListener("hidekeyboard", function(){
	    			//does not fire on iphone...
	    			hiddenKeyboard();
		        }, false);
	    		
	    		jQuery(this).find("input[type=text], textarea, select").
	    		bind("focus", function(e) {
	    			main.isFocuse= false;
	    			showingKeyboard();
	    		});
	    		document.addEventListener("showkeyboard", function(){
		    		showingKeyboard();
	    		}, false);
        	});
        	
        },
        
        attachToGroup: function(id){
        	var dialog = jQuery("#" + id + "_obs .groups")[0]
        	main.showDialogWithMessage(jQuery(dialog), "Velg gruppe");
        },
        
        goToAndHide : function(page){
        	main.panels.slideTo(page);
        	main.hideDialog();
        },
        
        sendEmail: function()
        {
        	main.hideDialog();
        	jQuery.each(main.lastRegID, function(i, regid){
        		GetObjectFromServer(new SendEmail(regid));
        	});
        	main.clearRegID();
        },
        
        showDialog: function(content)
        {
        	jQuery("body").scrollTop(0);
        	jQuery("#popup_content").html("").append(content);
        	jQuery("#popup").css("top", (wink.ux.window.height * .4) + "px");
        	jQuery("#footer, .sendGroup").hide();
        	jQuery("#dialog").show();
        	
        	var dialog =  jQuery("#dialog");
        	if(dialog !=null){
        		dialog.bind("touchmove", function(event){
        	     event.preventDefault();
        	});
        	}
        	
        	
        },
        
        hideDialog: function() {
        	main.dialogShowing = false;
        	main.dialogStarted = null;
        	
        	jQuery("body").css("overflow", "hidden");
        	jQuery('#dialog').hide().unbind("touchmove");
        	jQuery("#footer, .sendGroup").show();
        },
        
        saveAndCall: function(kdObject, data, callingFunctions){
        	if(data == null)
				return;
			
        	DataAccess.save(kdObject.name, data);
        	jQuery.each(callingFunctions, function(i, f){
        		f(data);
        	});
        },
        

        fillEstimatedNumKD : function(data){
        	main.saveAndCall(EstimatedNumKD, data, [snow_activity.fillEstimatedNumKD]);
        },  
        

        fillIceCoverKD : function(data){
        	main.saveAndCall(IceCoverKD, data, [ice_cover.fillIceCoverKD]);
        },  

        fillIceCoverBeforeKD : function(data){
        	main.saveAndCall(IceCoverBeforeKD, data, [ice_cover.fillIceCoverBeforeKD]);
        },  
        
        fillAvalancheKD : function(data){
        	main.saveAndCall(AvalancheKD, data, [snow_activity.fillAvalancheKD]);
        },       

        fillDestructiveSizeKD : function(data){
        	main.saveAndCall(DestructiveSizeKD , data, [snow_activity.fillDestructiveSizeKD]);
        },       
        
        fillSnowDriftKD : function(data){
        	main.saveAndCall(SnowDriftKD, data, [snow_surface.fillSnowDriftKD]);
        },       
        fillLandSlideSizeKD: function(data){
        	main.saveAndCall(LandSlideSizeKD, data, [dirt_avalange.fillLandSlideSizeKD]);
        },       
        
        fillLandSlideTriggerKD: function(data){
        	main.saveAndCall(LandSlideTriggerKD, data, [dirt_avalange.fillLandSlideTriggerKD]);
        },
        
        fillLandSlideKD: function(data){
        	main.saveAndCall(LandSlideKD, data, [dirt_avalange.fillLandSlideKD])
        },
        
        fillRegistrationKD: function(data)
        {
        	main.saveAndCall(RegistrationKD, data, 
        			[snow_picture.fillRegistrationKD, 
        			 water_picture.fillRegistrationKD,
        			 ice_picture.fillRegistrationKD,
        			 dirt_picture.fillRegistrationKD]);
        },
        
        fillDangerSign: function(data) {
        	main.saveAndCall(DangerSignKD, data, 
        			[snow_faresign.fillDangerSign,
        			 water_faresign.fillDangerSign,
        			 ice_faresign.fillDangerSign,
        			 dirt_faresign.fillDangerSign]);
        },
        
        fillActivityInfluenced: function(data) {
        	main.saveAndCall(ActivityInfluencedKD, data, 
        			[snow_hendelse.fill_activity_influenced,
                	water_hendelse.fill_activity_influenced,
                	dirt_hendelse.fill_activity_influenced,
                	ice_hendelse.fill_activity_influenced]);
        },
        
        fillDamageExtent: function(data) {
        	main.saveAndCall(DamageExtentKD, data, 
        			[snow_hendelse.fill_radius,
        			water_hendelse.fill_radius,
        			dirt_hendelse.fill_radius,
        			ice_hendelse.fill_radius]);
        },

        fillWaterLevelKD: function(data){
        	main.saveAndCall(WaterLevelRefKD, data, [water_level.fillWaterLevelKD])
        },
        
        hideNve: function(){
        	jQuery("#regobs-info").hide();
        },
        
        showNve: function(){
        	jQuery("#regobs-info").show();
        	jQuery("#regobs-name").show();
        	jQuery("#header_middle_text").text("");
        },
        
        updateLoginStatusAndBehaviour: function(){
        	
        },
        
        showHideFooter: function(id){
        	if(eval(id).shouldShowFooter == false){
        		jQuery(".footer").hide();
        	}else{
        		jQuery(".footer").show();
    		}
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
        	main.updateCollection(main.store.packageCollection);
        	main.updateLoginStatusAndBehaviour();
        	
        	if(status == 'start' && main.initialised) {
        		//google analytics
    			window.analytics.trackPageView(params.id);
        	}
        	
        	main.showHideFooter(params.id);
        	
        	
        	main.setHeights();
        	
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
        			
        		case 'register':
        			register.init();
    				$('star').style.display = 'none';
        			
        			break;
        		
        		case 'login_page':
        			login_page.init();
        			$("star").style.display= 'none';
        			
    				break;
        		
        		case 'snow':
    				snow_page.init();
    				
    				main.actualPage = SNOW;
        			break;
        			
        		case 'snow_see_obs':
        			if(status == 'start') {
        				if( $('snow_see_obs').innerHTML == "")
        					$('snow_see_obs').innerHTML = '<iframe  src="http://regobs.varsom.no/Avalanche"></iframe></div>';
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
        			
        		case 'snow_surface':
        			if(status == 'start') {
        				snow_surface.init();
        			}
        			break;
        			
        		case 'snow_activity':
        			if(status == 'start') {
        				snow_activity.init();
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
        			
        		case 'ice_cover':
        			if(status == 'start') {
        				ice_cover.init();
        			}
        			break;
        			
        		case 'ice_thickness':
        			if(status == 'start') {
        				ice_thickness.init();
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
        			
        		case 'dirt_avalange':
        			if(status == 'start') {
        				dirt_avalange.init();
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
    
    jQuery("button.doubleTapPrevention").on("click", function(){
    	jQuery(this).attr("disable", "disable");
    	var button = jQuery(this);
    	setTimeout(function(){
    		button.removeAttr("disable");
    	}, 500);
    });
    
    return main;
}());



