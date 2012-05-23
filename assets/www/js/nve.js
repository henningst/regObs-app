var main = (function()
{
    var main =
    {	
    	actualPage: 0,
    		
    	store: new NveStore(),
    		
    	login: {data: {"EMail" : "anonym@nve.no", "FirstName" : "Anonym", "ObserverID" : 105}},
    	
    	panels: null,
    	
		clickLogin: function() {
			var username = document.getElementById('login_username').value;
			var password = document.getElementById('login_password').value;

			DataAccess.save(USERNAME, username);
			DataAccess.save(PASSWORD, password);
			Login(username, password, main.loginCallback, main.loginErrorCallback);
		},
		
		loginCallback: function(data) {
			main.login = LoggedInAs(main.loggedInAsCallback);
		},
		
		loginErrorCallback: function(data) {
    		$('settings_img').style.backgroundColor = 'red';
			alert("No internet ?!");
		},
		
		clickLogOut: function() {
			document.getElementById('login_username').value = "";
			document.getElementById('login_password').value = "";
			
			DataAccess.save(USERNAME, "");
			DataAccess.save(PASSWORD, "");
			Logout(main.logoutCallback);
		},
		
		logoutCallback: function() {
        	$('settings_img').style.backgroundColor = 'red';
		},
		
		starred: function() {
			if(DataAccess.get(STARTUP_PAGE) == main.actualPage) {
				DataAccess.save(STARTUP_PAGE, 0);
				jQuery("#star").attr('src', 'img/notstared.png');	
			} else {
				DataAccess.save(STARTUP_PAGE, main.actualPage);
				jQuery("#star").attr('src', 'img/stared.png');	
			}	
		},
    	
        init: function()
        {
        	this.panels = new wink.ui.layout.SlidingPanels
            (
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
	      	        		'snow_picture',
	      	        		'snow_faresign',
	      	        		'ice',
	      	        		'ice_obs',
	      	        		'ice_hendelse',
	      	        		'ice_picture',
	      	        		'water',
	      	        		'water_obs',
	      	        		'water_hendelse',
	      	        		'water_picture',
	      	        		'dirt',
	      	        		'dirt_obs',
	      	        		'dirt_hendelse',
	      	        		'dirt_picture'
        	    		 ]
    	        	
    	        }
    	    );
            document.body.appendChild(this.panels.getDomNode());
            
            wink.subscribe('/slidingpanels/events/slidestart', {context: this, method: 'toggleBackButtonDisplay', arguments: 'start'});
            wink.subscribe('/slidingpanels/events/slideend', {context: this, method: 'toggleBackButtonDisplay', arguments: 'end'});

            //init danger signs
            var dangerSign = DataAccess.get(DangerSignKD.name);
            var activityInfluenced = DataAccess.get(ActivityInfluencedKD.name);
            var damageExtent = DataAccess.get(DamageExtentKD.name);
            
            if(dangerSign == null) {
            	GetObjectFromServer(new DangerSignKD(), main.fillDangerSign);
            } else {
            	snow_faresign.fill_snow_danger_sign(dangerSign);
            }
            if(activityInfluenced == null) {
            	GetObjectFromServer(new ActivityInfluencedKD(), main.fillActivityInfluenced);
            } else {
            	main.fillActivityInfluenced(activityInfluenced);
            }
            if(damageExtent == null) {
            	GetObjectFromServer(new DamageExtentKD(), main.fillDamageExtent);
            } else {
            	main.fillDamageExtent(damageExtent);
            }
            
			var username = DataAccess.get(USERNAME);
			var password = DataAccess.get(PASSWORD);
			
			if(username != undefined && password != undefined) {
				Login(username, password, main.loginCallback);
        	} else {
        		$('settings_img').style.backgroundColor = 'red';
			}
			
			switch (DataAccess.get(STARTUP_PAGE)) {
			case 1:
				main.panels.slideTo('snow');
				break;
			case 2:
				main.panels.slideTo('ice');
				break;
			case 3:
				main.panels.slideTo('water');
				break;
			case 4:
				main.panels.slideTo('dirt');
				break;

			default:
				break;
			}
        },
        
        fillDangerSign: function(data) {
        	DataAccess.save(DangerSignKD.name, data);
        	
        	snow_faresign.fill_snow_danger_sign(data);
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
        		$('settings_img').style.backgroundColor = 'green';
        	} else {
        		$('settings_img').style.backgroundColor = 'red';
        	}
        },
        
        toggleBackButtonDisplay: function(params, status) {

        	if(params.id != 'home') {
        		if(status == 'start') {
    				$('back').style.display = 'block';
    				$('star').style.display = 'inline-table';
    			}
        	}
        	
        	switch(params.id) {
        		case 'home':
        			if(status == 'end') {
        			}
        			
        			if(status == 'start') {
        				$('back').style.display = 'none';
        				$('star').style.display = 'none';
        				
        				//$('mainBody').style.backgroundImage = '';
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
        			
        		case 'ice':
        			if(status == 'start') {
        				ice_page.init();
        				
        				main.actualPage = ICE;
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
        			
        		case 'dirt':
        			if(status == 'start') {
        				dirt_page.init();
        				
        				main.actualPage = DIRT;
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
        			
        		default:
        			break;
        	}
        }
    }
     
    window.addEventListener('load', wink.bind(main.init, main), false);
     
    return main;
}());

