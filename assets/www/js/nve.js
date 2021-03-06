TEST_MODE = "test_mode";
STAGE_MODE = "stage_mode";


var geo = {
	last_page_location : null,
	requestPosition : function(callback, shouldHandlePosition) {
		if (window.PhoneGap === undefined || cordova.exec === undefined)
			return;
		
		console.log("requesting position to function " + callback)
		if(typeof eval(callback) !== 'function') { 
			console.log("no function like " + callback)
			new ErrorHandler().handleError("try to call geofunction with error callback : " + callback);
			return;
		}

		console.log("henter geo position");

		if (shouldHandlePosition == undefined)
			shouldHandlePosition = false;
		
		console.log("requestiong position for " + device.platform);
		if (device.platform == "android") {
			PhoneGap.exec(function() {
				console.log("geo plugin ok");
			}, function() {
				geo.noGoodAccuracyFound();
			}, 'NativeLocation', callback, [ shouldHandlePosition ]);
		} else {
			console.log("call back to " + callback);

			if (main.initialised == true) {
				navigator.geolocation.getCurrentPosition(eval(callback),
						function(e) {
							console.log("error;");
							console.log(e.message);
							if (shouldHandlePosition)
								geo.noGoodAccuracyFound();
						}, {
							maximumAge : 500,
							timeout : 3000,
							enableHighAccuracy : true
						});
			} else {
				setTimeout(function() {
					geo.requestPosition(callback, shouldHandlePosition);
				}, 500);
			}
		}
	},

	resume : function() {
		if (main.initialised && geo.last_page_location != null)
			geo.requestPosition(geo.last_page_location);
	},

	pause : function() {
		console.log("pauseing the phone");
	},

	convertToPosition : function(lat, long, acc, time) {
		var date = new Date(time);
		var position = {
			coords : {
				latitude : lat,
				longitude : long,
				accuracy : acc,
				taken : date
			},
			timestamp : time
		};

		return position;
	},

	noGoodAccuracyFound : function() {
		main.hideDialog();
		main.showDialogWithMessage(ERROR_NO_POSITION, "Posisjon utilgjennelig");
	}
};

var omerade = {
	parseArea : function(data) {
		var res = JSON.parse(data);
		
		if (res != null && res.features != undefined && res.features.length > 0) {
			return {
				omeradeid : res.features[0].attributes.OMRAADEID
						+ OMRAADE_ID_OFFSET,
				omeradenavn : res.features[0].attributes.OMRAADENAVN,
				oppdatert : true
			};
		}

		omerade.last_area = {
			omeradeid : null,
			omeradenavn : null,
			oppdater : false
		};
		
		return omerade.last_area;
	},

	parseKommune : function(data) {
		var res = JSON.parse(data);
		if (res != null && res.features != undefined && res.features.length > 0) {
			return {
				kommunenavn : res.features[0].attributes.KOMMNAVN,
				kommunenummer : res.features[0].attributes.KOMM_NR,
				fylkenavn : res.features[0].attributes.FYLKENAVN,
				fylkenummer : res.features[0].attributes.FY_NR,
				oppdatert : true
			};
		}

		return {
			kommunenavn : null,
			kommunenummer : null,
			fylkenavn : null,
			fylkenummer : null,
			oppdatert : false
		};
	},
	
	parseRegine: function(data){
		var res = JSON.parse(data);
		if(res != null && res.features!= undefined && res.features.length >0){
			return {
				reginenavn : res.features[0].attributes.NAVNVASSOMR,
				reginenummer : res.features[0].attributes.VASSOMR,
				oppdatert : true
			};
		}
		
		return {
			reginenavn : null,
			reginenummer : null,
			oppdatert : true
		};
			
	}
};

var main = (function() {

	var main = {
		actualPage : 0,

		store : new NveStore(),

		login : {
			data : {
				"EMail" : "anonym@nve.no",
				"FirstName" : "Anonym",
				"ObserverID" : 105
			}
		},

		popup : null,

		waitingDialog : null,

		lastPage : "",

		panels : null,

		currentlyLoggedIn : false,
		
		notConfirmedLogin : true,

		currentPage : "",

		lastRegID : [],
		
		scrollers : {},

		caruselListeners : [],
		
		carusels : [],

		addLastRegID : function(regId) {
			console.log("adding regid " + regId);
			if (main.lastRegID.length == 0)
				main.lastRegID = [ regId ];
			else
				main.lastRegID.push(regId);

			console.log("size of regid array " + main.lastRegID.length);
		},

		clearRegID : function() {
			main.lastRegID = [];
		},

		scroller : null,

		inTestMode : true,

		initialised : false,

		clickLogin : function() {
			if (main.currentlyLoggedIn == false) {
				// login
				var username = document.getElementById('login_username').value;
				var password = document.getElementById('login_password').value;

				main.showWaitingDialogWithMessage(LOGGING_IN);

				var user = new User(0, username, password);
				UserStore.save(main.currentMode(), user);
				Login(username, password, login_page.loginCallback, login_page.loginErrorCallback);
			} else {
				// logout
				login_page.clickLogOut();
			}
		},
		
		userNick : function() {
			var user = UserStore.get(main.currentMode());
			return user.nick;
		},

		currentUrl : function() {
			return SERVER_URL;
		},

		haveConnection: function(){
			return navigator.network.connection.type !== Connection.NONE && navigator.network.connection.type !== Connection.UNKNOWN;
		},
		
		runIfConnection: function(callback){
			if(main.haveConnection()){
				callback();
			}else{
				main.handleNoConnection();
			}
		},
		
		handleNoConnection: function(){
			if(!main.haveConnection()){
				main.noConnectionDialog();
			}
			
			return main.haveConnection();
		},
		
		handleConnectionFailed: function(e){
			if(main.haveConnection()){
				console.log("pp: connection failed but we have internett:") // + JSON.stringify(e))
			}else{
				main.noConnectionDialog();
			}
				
		},
		
		
		
		updateCollection : function(collection) {
			console.log("pp: collection  = " + collection +", " + JSON.stringify(collection))
			if(collection === "undefined"|| collection === null)
				return;
			
			if (collection.size() > 0) {
				jQuery(".numPackages").hide().text(collection.size()).show();

				console.log("setting platform for: " + device.platform + " - "
						+ main.store.getNotificationId())
				if (device.platform === "iphone"
						|| main.store.getNotificationId() == null) {
					console.log("------------ adding a notification "
							+ collection.size() + " ------------- ")
					main.store.setNotificationId(4);
					var notification = new LocalNotification();
					console.log("pp: notification " + notification);
					notification
							.add({
								date : new Date(),
								message : "Du har usendte observasjoner i regObs\n Gå inn i appen å trykk \"Send inn\" for å sende disse",
								ticker : "regObs har usendte observasjoner",
								repeatDaily : false,
								id : 4,
								badge : "" + collection.size(),
							});
					
					
					
					console.log("pp: test done location");
				}
			} else {
				if(cordova.exec !== undefined){
					jQuery(".numPackages").hide();
					console.log("------------ removeing ------------- ")
					new LocalNotification().cancelAll();
					new LocalNotification().cancel(4);
					main.store.setNotificationId(null);
				}
			}
		},
		
		showRegister: function(){
			window.plugins.childBrowser.onClose = function(){};
			window.plugins.childBrowser.showWebPage(REGISTER_URL);
		},
		
		resetApp: function(){
			DataAccess.clear();
			main.populateBoxes(true);

			login_page.showLoginStatus(false);
			login_page.relogin();
			main.updateCollection(main.store.packageCollection);
			main.resetPostHooks();
			
			if(device.platform == "android")
				navigator.app.exitApp();
		},
		
		resetPostHooks: function(){
			snow_evaluation.deleteProblems();
		},

		starred : function() {
			if (DataAccess.get(STARTUP_PAGE) == main.actualPage) {
				DataAccess.save(STARTUP_PAGE, 0);
				jQuery("#star").attr('src', 'img/notstared.png');
			} else {
				DataAccess.save(STARTUP_PAGE, main.actualPage);
				jQuery("#star").attr('src', 'img/stared.png');
			}

			main.toogleFavorite();
		},

		toogleFavorite : function() {
			if (DataAccess.get(STARTUP_PAGE) > 0) {
				jQuery(".footer .fav-inactive").removeClass("fav-inactive");
			} else {
				jQuery(".footer .fav, .footer .camera")
						.addClass("fav-inactive");
			}
		},

		init : function() {
			this.panels = new wink.ui.layout.SlidingPanels({
				duration : 500,
				transitionType : 'default',
				uId : 5,
				pages : [ 'home', 'settings', 'map_page',
						'map_obs_page', 'snow', 'snow_see_obs', 'snow_evaluation',
						'snow_problem_1','snow_problem_2','snow_problem_3',
						'snow_see_varsel', 'snow_obs', 'snow_hendelse',
						'snow_faresign', 'snow_picture', 'snow_surface',
						'snow_activity', 'ice', 'ice_see_obs',
						'ice_see_varsel', 'ice_obs', 'ice_hendelse',
						'ice_faresign', 'ice_cover', 'ice_thickness',
						'ice_picture', 'water', 'water_see_obs',
						'water_see_varsel', 'water_obs', 'water_hendelse',
						'water_faresign', 'water_picture', 'water_level',
						'dirt', 'dirt_see_obs', 'dirt_obs', 'dirt_hendelse',
						'dirt_faresign', 'dirt_picture', 'dirt_avalange',
						'learning_page', 'information', 'login_page' ]
			});
			$("wrapper").appendChild(this.panels.getDomNode());

			main.waitingDialog = new wink.ui.xy.Popup();
			document.body.appendChild(main.waitingDialog.getDomNode());

			$('snow_carusel').appendChild(
					main.createCarousel(SNOW, SNOW_TEXT).getDomNode());
			$('ice_carusel').appendChild(
					main.createCarousel(ICE, ICE_TEXT).getDomNode());
			$('dirt_carusel').appendChild(
					main.createCarousel(DIRT, DIRT_TEXT).getDomNode());
			$('water_carusel').appendChild(
					main.createCarousel(WATER, WATER_TEXT).getDomNode());

			wink.subscribe('/carousel/events/switch', {
				context : this,
				method : 'carouselChanged'
			});

			wink.subscribe('/slidingpanels/events/slidestart', {
				context : this,
				method : 'toggleBackButtonDisplay',
				arguments : 'start'
			});
			wink.subscribe('/slidingpanels/events/slideend', {
				context : this,
				method : 'toggleBackButtonDisplay',
				arguments : 'end'
			});

			
			main.slideToFavorite();
			main.toogleFavorite();

			var wrapperHeight = wink.ux.window.height - 2 * 45;
			$('wrapper').style.height = wrapperHeight + "px";
			// main.scroller = new iScroll('wrapper');

		},

		fillDropdown : function(kdObject, fillFunction, force) {
			var cached = (force ? null : DataAccess.get(kdObject.name));
			if (cached == null) {
				GetObjectFromServer(new kdObject, fillFunction,
						function(error) {
							fillFunction(DataAccess.get(kdObject.name));
						});
			} else {
				fillFunction(cached);
			}

		},

		populateBoxes : function(force) {
			main.fillDropdown(LandSlideTriggerKD, main.fillLandSlideTriggerKD,
					force);
			main.fillDropdown(LandSlideSizeKD, main.fillLandSlideSizeKD, force);
			main.fillDropdown(LandSlideKD, main.fillLandSlideKD, force);
			main.fillDropdown(RegistrationKD, main.fillRegistrationKD, force);
			main.fillDropdown(DangerSignKD, main.fillDangerSign, force);
			main.fillDropdown(ActivityInfluencedKD,
					main.fillActivityInfluenced, force);
			main.fillDropdown(DamageExtentKD, main.fillDamageExtent, force);
			main.fillDropdown(WaterLevelRefKD, main.fillWaterLevelKD, force);
			main.fillDropdown(SnowDriftKD, main.fillSnowDriftKD, force);

			main.fillDropdown(EstimatedNumKD, main.fillEstimatedNumKD, force);
			main.fillDropdown(DestructiveSizeKD, main.fillDestructiveSizeKD,
					force);
			main.fillDropdown(AvalancheKD, main.fillAvalancheKD, force);

			main.fillDropdown(IceCoverBeforeKD, main.fillIceCoverBeforeKD,
					force);
			main.fillDropdown(IceCoverKD, main.fillIceCoverKD, force);

			main.fillDropdown(AvalancheDangerKD, main.fillAvalancheDangerKD, force);
			
			main.fillDropdown(AvalProbabilityKD, main.fillAvalProbabilityKD, force);
			main.fillDropdown(AvalTriggerSimpleKD, main.fillAvalTriggerSimpleKD, force);
			main.fillDropdown(DestructiveSizeExtKD, main.fillDestructiveSizeExtKD, force);
			main.fillDropdown(AvalReleaseHeightKD, main.fillAvalReleaseHeightKD, force);
			
			main.fillDropdown(AvalancheExtKD, main.fillAvalancheExtKD, force);
			main.fillDropdown(AvalCauseKD, main.fillAvalCauseKD, force);
			main.fillDropdown(AvalCauseExtKD, main.fillAvalCauseExtKD, force);
			
			main.fillDropdown(AvalancheProblemMenu1V, main.fillAvalancheProblemMenu1V, force);
			main.fillDropdown(AvalancheProblemMenu2V, main.fillAvalancheProblemMenu2V, force);
			
			
		},
		

		carouselMoved : function(data) {
			switch (data.carouselId) {
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

		carouselChanged : function(data) {
			switch (data.carouselId) {
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

		caruselEvent : function(data) {
			main.caruselListeners[data.carouselId](data.currentItemIndex);
		},

		listenForCaruselEvent : function(id, callback) {
			main.caruselListeners[id] = callback;
		},

		gotoTest : function() {
			main.toogleTestMode();

			var user = UserStore.get(main.currentMode());
			if (!user.isDefined()) {
				main.warnBefore("Login", ERROR_NO_LOGIN_CURRENT_MODE, "OK", "main.hideDialog()", "Login", 'main.panels.slideTo("login_page"); main.hideDialog();');
			}
			
			main.populateBoxes(false);
		},

		toogleTestMode : function() {
			if (main.inTestMode) {
				SERVER_URL = STAGE;
				SERVER_LOGIN_URL = STAGE_LOGIN;
				REGISTER_URL = PROD_REGISTER_URL;
				WEB_LINK_URL = WEB_LINK_URL_STAGE;
				main.inTestMode = false;
				$('test_button').value = USE_TESTMODE_BUTTON;
				jQuery('#header').removeClass('testMode');

			} else {
				SERVER_URL = TEST;
				SERVER_LOGIN_URL = TEST_LOGIN;
				REGISTER_URL = STAGE_REGISTER_URL;
				WEB_LINK_URL = WEB_LINK_URL_TEST;
				main.inTestMode = true;
				$('test_button').value = USE_PROD_BUTTON;
				jQuery('#header').addClass('testMode');
			}

			login_page.relogin();
		},

		currentMode : function() {
			if (main.inTestMode)
				return TEST_MODE;
			else
				return STAGE_MODE;
		},

		logData : function(data) {
			console.log(data);
		},

		initPhonegap : function() {
			DataAccess.handleCompatibility(APP_VERSION);
			main.init();
			console.log("started");
			
			document.addEventListener("online", login_page.relogin , true)
			
			document.addEventListener("backbutton", main.backKeyDown, true);
			if (window.analytics) {
				window.analytics.start(GA_TRACKER_CODE);
			} else {
				console.log("no analytics");
			}

			main.populateBoxes(true);

			login_page.showLoginStatus(false);
			main.toogleTestMode();

			main.initialised = true;
			geo.requestPosition(main.nothing, false);
			navigator.splashscreen.hide();

			new ErrorHandler().hookInto();
//			main.clickToTap();
		},
		
		clickToTap: function(){
			jQuery("[onclick]").each(function(index, obj){
				try{
					var click = obj.onclick;
					jQuery(obj).bind('tapone', click );
					jQuery(obj).attr("onclick", "");
				}catch(e){
					console.log("pp: tap hookup failed " + e );
				}
			});
			
			jQuery("input").each(function(index, obj){
				try{
					var _current = obj;
					jQuery(obj).bind('tapone', function(){
						jQuery(_current).trigger('focus');
					})
				}catch(e){
					console.log("pp: tap hookup inputs failed" + e)
				}
			});
		},

		backKeyDown : function(e) {
			e.preventDefault();
			
			if(main.dialogShowing)
				return;
			
			if (main.actualPage != 0) {
				main.panels.slideBack();
			} else {
				console.log("pp: about to exit")
				navigator.app.exitApp();
			}
		},

		favoritePage : function() {
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

		slideToFavorite : function() {
			var page = main.favoritePage();
			main.panels.slideTo(page);
		},

		slideToFavoritePicture : function() {
			var page = main.favoritePage();
			main.showDialog("<h3>Laster</h3><p>Går til favoritbildet</p>");
			main.panels.slideTo(page + "_obs");
			setTimeout(function() {
				main.panels.slideTo(page + "_picture");
				main.hideDialog();
			}, 1000);

		},

		showFinishedUploadMessage : function() {
			main.hideDialog();

			main
					.showDialog(""
							+ "<div>"
							+ OBSERVATION_REGISTERED
							+ "<button type='button' "
							+ "class='w_bg_light c_button w_button w_radius popupbutton-dual' onclick='main.clearRegID();main.hideDialog();'>"
							+ OK
							+ "</button>"
							+ "<button type='button' "
							+ "class='w_bg_light c_button w_button w_radius popupbutton-dual emailButton' onclick='main.sendEmail();'>"
							+ SEND_EMAIL + "</button>" + "</div>");
			
			main.clickToTap();
		},

		errorDialog : function() {
			main.showDialogWithMessage(AN_ERROR_OCCURED);
		},
		
		openUrl: function(url){
			window.plugins.childBrowser.onClose = function(){};
			window.plugins.childBrowser.showWebPage(url);
		},
		
		noConnectionDialog: function(){
			main.showDialogWithMessage(NO_CONNECTION);
		},
		
		showSendingDialog : function(){
			main.showDialogWithMessage(SENDING_IN_BACKGROUND);
		},

		showDialogWithMessage : function(message, header) {
			main.showDialogWithMessageAndFunction(message,header, OK, "main.hideDialog();")
		},
		
		showDialogWithMessageAndFunction : function(message, header, buttonText, buttonFunction){
			main.dialogShowing = false;
			main.dialogStarted = null;
			
			if (header == undefined)
				header = "Melding";

			var content = jQuery("<div><h3>"
					+ header
					+ "</h3><p></p><button type='button' "
					+ "class='w_bg_light c_button w_button w_radius popupbutton-single' onclick='"+ buttonFunction +"'>"
					+ buttonText + "</button></div>");

			var messageText = message;
			if (message.html)
				messageText = message.html();
			else
				messageText = "<span>" + message + "</span>";

			content.find("p").wrap(messageText);
			main.showDialog(content);
		},
		

		showWaitingDialogWithMessage : function(message, callback) {
			main.dialogShowing = true;
			main.dialogStarted = new Date().toString();
			main.showDialog("<div class='waitingDialog'>" + message
					+ "<img src='img/ajax-loader.gif' />" + "</div>");

			var dateStarted = main.dialogStarted;
			setTimeout(function() {
				if (main.dialogShowing && dateStarted === main.dialogStarted) {
					main.hideDialog();
					if(callback !== undefined )
						callback()
					else
						main.showDialogWithMessage(ERROR_TIMEOUT, "Tidsavbrudd");
				}
			}, 20000);
		},
		
		warnDeletionBefore : function(delete_function){
			main.areYouSure("Sletting", "Er du sikker du ønsker å slette observasjonene?", delete_function);
		},
		
		areYouSure: function(header, text, delete_function){
			main.warnBefore(header, text, OK, delete_function + "; main.hideDialog();", ABORT, 'main.hideDialog()');
		},

		warnBefore: function(header, text, ok, ok_method, cancel, cancel_method){
			main.showDialog("<h3>"+ header +"</h3>"
					+ "<div><p>"
					+ text
					+ "</p>"
					+ "<button type='button' class='w_bg_light c_button w_button w_radius popupbutton-dual' onclick='"+ ok_method +"'>"
						+ ok
					+ "</button>"
					+ "<button type='button' class='w_bg_light c_button w_button w_radius popupbutton-dual' onclick='"+cancel_method+"'>"
					+ cancel + "</button>" + "</div>");
		},
		
		warnLoginBefore : function(after, shouldNotRetry) {
			if (!main.currentlyLoggedIn) {
				main.warnBefore("Ikke innlogget", NOT_LOGGED_IN_WARNING, OK, "login_page.clickLogOut();" + after + "()", LOGIN_BUTTON, 'main.goToAndHide(\"login_page\")');
			} else if(main.notConfirmedLogin === true && main.haveConnection() && !shouldNotRetry){
				login_page.relogin(main.warnLoginBefore(after, true));
			} else {
				eval(after + "()");
			}

		},

		createCarousel : function(id, items, widthOfCaruselElement) {
			if (widthOfCaruselElement === undefined)
				widthOfCaruselElement = 200;

			var properties = {
				'itemsWidth' : widthOfCaruselElement,
				'itemsHeight' : 35,
				'autoAdjust' : 1,
				'autoAdjustDuration' : widthOfCaruselElement * 2,
				'firstItemIndex' : CAROUSEL_STANDART,
				'uId' : id,
				'items' : [ {
					'type' : 'string',
					'content' : "<div style='font-size: 0.8em'>Ikke angitt</div>"
				} ]
			};

			for ( var i = 1; i < items.length; ++i) {
				properties.items.push({
					'type' : 'string',
					'content' : "<div style='font-size: 0.8em'>" + items[i]
							+ "</div>"
				});
			}

			var carusel = new wink.ui.xy.Carousel(properties);
			main.carusels[id] = carusel;
			
			return carusel;
		},

		nothing : function() {

		},

		isFocuse : false,
		resetHeights : function() {
			console.log("pp: reseting scroller")
			jQuery(".scrolling:visible").each(function(){
				var id = jQuery(this).attr("id");
				console.log("pp: refreshing scroller " + id)
				var currentScroller = main.scrollers[id];
				if(currentScroller != null){
					currentScroller.refresh();
				}
			})
			
			main.setHeights();
		},

		setHeights : function() {
			main.setScrollerHeights();
			main.insertScroller();
		},

		setScrollerHeights : function() {
			var bodyHeight = jQuery("body").height();
			var top = bodyHeight - 139;

			console.log("pp: heights " + bodyHeight + ", " + jQuery(window).height() + ", " + top);
			
			jQuery(".addAbort").css("top", (top + 45 + 45) + "px");
			jQuery(".sendGroup").css("top", (top + 45 + 45 ) + "px");

			jQuery(".listScroller").css("height", (top - 55) + "px");
			jQuery(".pageScroller").css("height", (bodyHeight + 38 + 200) + "px");
			jQuery(".pageScroller.full, #map_page").css("height", (bodyHeight - 50 ) + "px");
			
		},
		

		insertScroller : function() {
			jQuery(".listScroller:visible:not(.scrolling), .pageScroller:visible:not(.scrolling)").each(function(){
				var currentDiv = jQuery(this);
				currentDiv.addClass("scrolling");
				console.log("pp: adding scroller " + currentDiv.attr("id"));
				
				var currentScroller = new iScroll(currentDiv.attr("id"), {
					onBeforeScrollStart: function (e) {
						var target = e.target;
						while (target.nodeType != 1) target = target.parentNode;

						if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA')
							e.preventDefault();
					}
				}); 
				main.scrollers[currentDiv.attr("id")] = currentScroller;
			})
							
		},

		attachToGroup : function(id) {
			var dialog = jQuery("#" + id + "_obs .groups")[0]
			main.showDialogWithMessage(jQuery(dialog), "Velg gruppe");
			main.resetHeights();
		},

		goToAndHide : function(page) {
			main.panels.slideTo(page);
			main.hideDialog();
		},

		sendEmail : function() {
			main.hideDialog();
			jQuery.each(main.lastRegID, function(i, regid) {
				GetObjectFromServer(new SendEmail(regid));
			});
			main.clearRegID();
		},

		showDialog : function(content) {
			jQuery("body").scrollTop(0);
			jQuery("#popup_content").html("").append(content);
			jQuery("#popup").css("top", (wink.ux.window.height * .4) + "px");
			jQuery("#footer, .sendGroup").hide();
			jQuery("#dialog").show();

			main.clickToTap();
			var dialog = jQuery("#dialog");
			if (dialog != null) {
				dialog.bind("touchmove", function(event) {
					event.preventDefault();
				});
			}

		},

		hideDialog : function() {
			main.dialogShowing = false;
			main.dialogStarted = null;

			// jQuery("body").css("overflow", "hidden");
			jQuery('#dialog').hide().unbind("touchmove");
			jQuery("#footer, .sendGroup").show();
			main.showHideFooter(main.currentPage);
		},

		saveAndCall : function(kdObject, data, callingFunctions) {
			if (data == null)
				return;

			DataAccess.save(kdObject.name, data);
			jQuery.each(callingFunctions, function(i, f) {
				f(data);
			});
		},
		
		fillAvalancheProblemMenu1V : function(data){
			main.saveAndCall(AvalancheProblemMenu1V, data, [ snow_problem.holdAvalancheProblemMenu1V ]);
		},  
		

		fillAvalancheProblemMenu2V : function(data){
			main.saveAndCall(AvalancheProblemMenu2V, data, [ snow_problem.holdAvalancheProblemMenu2V ]);
		},  
		
		fillAvalancheExtKD : function(data){
			main.saveAndCall(AvalancheExtKD, data, [ snow_problem.holdAvalancheExtKD ]);
		},
		
		fillAvalCauseKD : function(data){
			main.saveAndCall(AvalCauseKD, data, [ snow_problem.holdAvalCauseKD ]);
		},
		fillAvalCauseExtKD : function(data){
			main.saveAndCall(AvalCauseExtKD, data, [ snow_problem.holdAvalCauseExtKD ]);
		},
		
		fillAvalProbabilityKD : function(data) {
			main.saveAndCall(AvalProbabilityKD, data, [ snow_problem.holdAvalProbabilityKD ]);
		},
		fillAvalTriggerSimpleKD : function(data) {
			main.saveAndCall(AvalTriggerSimpleKD, data, [ snow_problem.holdAvalTriggerSimpleKD ]);
		},
		fillDestructiveSizeExtKD : function(data) {
			main.saveAndCall(DestructiveSizeExtKD, data, [ snow_problem.holdDestructiveSizeExtKD ]);
		},
		fillAvalReleaseHeightKD : function(data) {
			main.saveAndCall(AvalReleaseHeightKD , data, [ snow_problem.holdAvalReleaseHeightKD ]);
		},
		
		fillEstimatedNumKD : function(data) {
			main.saveAndCall(EstimatedNumKD, data,
					[ snow_activity.fillEstimatedNumKD ]);
		},

		fillAvalancheDangerKD:function(data){
			main.saveAndCall(AvalancheDangerKD, data, [ snow_problem.fillAvalancheDangerKD ]);
		},
		
		fillIceCoverKD : function(data) {
			main.saveAndCall(IceCoverKD, data, [ ice_cover.fillIceCoverKD ]);
		},

		fillIceCoverBeforeKD : function(data) {
			main.saveAndCall(IceCoverBeforeKD, data,
					[ ice_cover.fillIceCoverBeforeKD ]);
		},

		fillAvalancheKD : function(data) {
			main.saveAndCall(AvalancheKD, data,
					[ snow_activity.fillAvalancheKD ]);
		},

		fillDestructiveSizeKD : function(data) {
			main.saveAndCall(DestructiveSizeKD, data,
					[ snow_activity.fillDestructiveSizeKD ]);
		},

		fillSnowDriftKD : function(data) {
			main.saveAndCall(SnowDriftKD, data,
					[ snow_surface.fillSnowDriftKD ]);
		},
		fillLandSlideSizeKD : function(data) {
			main.saveAndCall(LandSlideSizeKD, data,
					[ dirt_avalange.fillLandSlideSizeKD ]);
		},

		fillLandSlideTriggerKD : function(data) {
			main.saveAndCall(LandSlideTriggerKD, data,
					[ dirt_avalange.fillLandSlideTriggerKD ]);
		},

		fillLandSlideKD : function(data) {
			main.saveAndCall(LandSlideKD, data,
					[ dirt_avalange.fillLandSlideKD ])
		},

		fillRegistrationKD : function(data) {
			main.saveAndCall(RegistrationKD, data, [
					snow_picture.fillRegistrationKD,
					water_picture.fillRegistrationKD,
					ice_picture.fillRegistrationKD,
					dirt_picture.fillRegistrationKD ]);
		},

		fillDangerSign : function(data) {
			main.saveAndCall(DangerSignKD, data, [
					snow_faresign.fillDangerSign,
					water_faresign.fillDangerSign, ice_faresign.fillDangerSign,
					dirt_faresign.fillDangerSign ]);
		},

		fillActivityInfluenced : function(data) {
			main.saveAndCall(ActivityInfluencedKD, data, [
					snow_hendelse.fill_activity_influenced,
					water_hendelse.fill_activity_influenced,
					dirt_hendelse.fill_activity_influenced,
					ice_hendelse.fill_activity_influenced ]);
		},

		fillDamageExtent : function(data) {
			main.saveAndCall(DamageExtentKD, data, [ snow_hendelse.fill_radius,
					water_hendelse.fill_radius, dirt_hendelse.fill_radius,
					ice_hendelse.fill_radius ]);
		},

		fillWaterLevelKD : function(data) {
			main.saveAndCall(WaterLevelRefKD, data,
					[ water_level.fillWaterLevelKD ])
		},

		getObservationSearchDiameter : function() {
			var saved = DataAccess.get(SEARCH_DIAMETER_KEY);

			return saved || SEARCH_DIAMETER;
		},

		hideNve : function() {
			jQuery("#regobs-info").hide();
		},

		showNve : function() {
			jQuery("#regobs-info").show();
			jQuery("#regobs-name").show();
			jQuery("#header_middle_text").text("");
		},

		updateLoginStatusAndBehaviour : function() {

		},

		showHideFooter : function(id) {
			if (eval(id) !== undefined && (eval(id).shouldShowFooter == false )) {
				jQuery(".footer").hide();
			} else {
				jQuery(".footer").show();
			}
			
		},

		toggleBackButtonDisplay : function(params, status) {
			if(!main.initialised){
				setTimeout(function(){main.toggleBackButtonDisplay(params, status);}, 200);
				return; 
			}
			
			console.log("-------backbutton display");
			console.log(params.id);
			console.log(status);
			if (params.id != 'home') {
				if (status == 'start') {
					$('back').style.display = 'block';
					$('star').style.display = 'inline-table';
					main.hideNve();
				}
			}

			main.toogleFavorite();
			main.updateCollection(main.store.packageCollection);
			main.updateLoginStatusAndBehaviour();

			console.log("pp: have connection " + main.haveConnection());
			
			if (status == 'start' && main.initialised) {
				// google analytics
				console.log("analytics " + window.analytics);
				window.analytics.trackPageView(params.id, function(d) {
					//console.log("success " + JSON.stringify(d))
				}, function(d) {
					//console.log("fail " + JSON.stringify(d))
				});
			}

			main.showHideFooter(params.id);

			main.resetHeights();
			main.currentPage = params.id;
			switch (params.id) {
			case 'home':
				if (status == 'end') {

				}

				if (status == 'start') {
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
			
			case 'login_page':
				login_page.init();
				$("star").style.display = 'none';

				break;

			case 'map_page':
				map_page.init();

				break;

			case 'map_obs_page':

				break;

			case 'snow':
				snow_page.init();

				main.actualPage = SNOW;
				break;

			case 'snow_see_obs':
				if (status == 'start') {
					snow_see_obs.init();
				}
				break;
				
			case 'snow_evaluation':
				if(status == 'start'){
					snow_evaluation.init();
				}
				break;
				
			case 'snow_problem_1':
			case 'snow_problem_2':
			case 'snow_problem_3':
				if(status == 'start'){
					snow_problem.init(params.id);
				}
				break;

			case 'snow_see_varsel':
				if (status == 'start') {
					if ($('snow_see_varsel').innerHTML == "")
						$('snow_see_varsel').innerHTML = '<iframe src="http://regobs.varsom.no/AvalancheWarning/Published"></iframe>';
				}
				break;

			case 'snow_obs':
				if (status == 'start') {
					snow_page.init();
				}
				break;

			case 'snow_picture':
				if (status == 'start') {
					snow_picture.init();
				}
				break;

			case 'snow_hendelse':
				if (status == 'start') {
					snow_hendelse.init();
				}
				break;

			case 'snow_faresign':
				if (status == 'start') {
					snow_faresign.init();
				}
				break;

			case 'snow_surface':
				if (status == 'start') {
					snow_surface.init();
				}
				break;

			case 'snow_activity':
				if (status == 'start') {
					snow_activity.init();
				}
				break;

			case 'water':
				if (status == 'start') {
					water_page.init();

					main.actualPage = WATER;
				}
				break;

			case 'water_see_obs':
				if (status == 'start') {
					water_see_obs.init()
				}
				break;

			case 'water_see_varsel':
				if (status == 'start') {
					if ($('water_see_varsel').innerHTML == "")
						$('water_see_varsel').innerHTML = '<iframe src="http://www.nve.no/no/Flom-og-skred/Flomvarsling-og-beredskap/Flomvarsling-og-meldinger---arkiv/"></iframe>';
				}
				break;

			case 'water_obs':
				if (status == 'start') {
					water_page.init();
				}
				break;

			case 'water_picture':
				if (status == 'start') {
					water_picture.init();
				}
				break;

			case 'water_hendelse':
				if (status == 'start') {
					water_hendelse.init();
				}
				break;

			case 'water_faresign':
				if (status == 'start') {
					water_faresign.init();
				}
				break;

			case 'ice':
				if (status == 'start') {
					ice_page.init();

					main.actualPage = ICE;
				}
				break;

			case 'ice_see_obs':
				if (status == 'start') {
					ice_see_obs.init();
				}
				break;

			case 'ice_see_varsel':
				if (status == 'start') {
					if ($('ice_see_varsel').innerHTML == "")
						$('ice_see_varsel').innerHTML = '<iframe src="http://www.nve.no/no/Vann-og-vassdrag/Hydrologi/Is-og-vanntemperatur/Ismelding/Landsoversikt/"></iframe>';
				}
				break;

			case 'ice_obs':
				if (status == 'start') {
					ice_page.init();
				}
				break;

			case 'ice_picture':
				if (status == 'start') {
					ice_picture.init();
				}
				break;

			case 'ice_hendelse':
				if (status == 'start') {
					ice_hendelse.init();
				}
				break;

			case 'ice_cover':
				if (status == 'start') {
					ice_cover.init();
				}
				break;

			case 'ice_thickness':
				if (status == 'start') {
					ice_thickness.init();
				}
				break;

			case 'ice_faresign':
				if (status == 'start') {
					ice_faresign.init();
				}
				break;

			case 'dirt':
				if (status == 'start') {
					dirt_page.init();

					main.actualPage = DIRT;
				}
				break;

			case 'dirt_see_obs':
				if (status == 'start') {
					dirt_see_obs.init()
				}
				break;

			// Not available by now
			// case 'dirt_see_varsel':
			// if(status == 'start')
			// {
			// $('dirt_see_varsel').innerHTML = '<iframe
			// src="http://regobs.varsom.no/AvalancheWarning/Published"></iframe>';
			// }
			// break;

			case 'dirt_obs':
				if (status == 'start') {
					dirt_page.init();
				}
				break;

			case 'dirt_picture':
				if (status == 'start') {
					dirt_picture.init();
				}
				break;

			case 'dirt_hendelse':
				if (status == 'start') {
					dirt_hendelse.init();
				}
				break;

			case 'dirt_faresign':
				if (status == 'start') {
					dirt_faresign.init();
				}
				break;

			case 'dirt_avalange':
				if (status == 'start') {
					dirt_avalange.init();
				}
				break;

			case 'learning_page':
				if (status == 'start') {
					learning_page.init(main.lastPage);
				}
				break;

			case 'information':
				if (status == 'start') {
					information_page.init();
				}
				break;

			default:
				break;
			}

			main.lastPage = params.id;

			console.log("pp: done init")
		}
	};

	
	
	document.addEventListener("deviceready", E(main.initPhonegap), false);

	document.addEventListener("resume", geo.resume, false);
	document.addEventListener("pause", geo.pause, false);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	window.onorientationchange = function(e){
		console.log("orientation changed");
		setTimeout(function(){
			main.setScrollerHeights();
			main.resetHeights();
		}, 800);
	};

	
	jQuery("textarea").live("focus", function(){
		console.log(device.platform)
		if(device.platform === "android")
		{
			var id = jQuery(this).parents(".scrolling").attr("id");
			if(jQuery(this).hasClass("noscroll") || main.scrollers[id] === undefined)
				return;
			
			main.scrollers[id].scrollToElement(this, 0);
			main.scrollers[id].scrollTo(0, -60, 0, true);
		}
	});
	
	jQuery("textarea, select").live("blur", function(){
			window.scrollTo(0,0);
	});
	
	
	jQuery("button.doubleTapPrevention").on("click", function() {
		jQuery(this).attr("disable", "disable");
		var button = jQuery(this);
		setTimeout(function() {
			button.removeAttr("disable");
		}, 500);
	});
	

	return main;
}());


function isFunction(functionToCheck) {
 var getType = {};
 return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}
