var main = (function()
{
    var main =
    {	
    	optionsDisplayed: 0,
    		
    	store: new NveStore(),
    		
    	login: {data: {"EMail" : "anonym@nve.no", "FirstName" : "Anonym", "ObserverID" : 105}},
    	
    	panels: null,
    	
		clickLogin: function() {
			this.store.login(document.getElementById('login_username').value, document.getElementById('login_password').value);
		},
		
		loginCallback: function(data) {
			main.login = main.store.loggedInAs(main.loggedInAsCallback);
		},
		
		toggle: function ()
		{
			if ( main.optionsDisplayed == 0 )
			{
				$('pages').translate(window.innerWidth - 81, 0);
				main.optionsDisplayed = 1;
				$('settings').style.display = 'block';
			} else
			{
				$('pages').translate(0, 0);
				main.optionsDisplayed = 0;
				$('settings').style.display = 'none';
			}
		},
		
		sizeElements: function()
    	{
//    		scrollTo(0, 0, 0);
    		
    		var _h = window.innerHeight - jQuery('#header').height();
    		var _w = window.innerWidth;

    		jQuery('.sl_container').css('height' , _h + 'px');
    		jQuery('.sl_container').css('width' , _w + 'px');
    	},
    	
        init: function()
        {
        	this.panels = new wink.ui.layout.SlidingPanels
            (
    	        {
    	        	duration: 500,
    	        	transitionType: 'default',
    	        	uId: 5,
    	        	pages:
    	    		[
    	        		'home',
    	        		'settings',
    	        		'snow',
    	        		'snow_hendelse',
    	        		'snow_picture',
    	        		'snow_faresign',
    	        		'ice',
    	        		'ice_hendelse',
    	        		'ice_picture',
    	        		'water',
    	        		'water_hendelse',
    	        		'water_picture',
    	        		'dirt',
    	        		'dirt_hendelse',
    	        		'dirt_picture'
    	        	]
    	        }
    	    );
            document.body.appendChild(this.panels.getDomNode());
            
            wink.subscribe('/slidingpanels/events/slidestart', {context: this, method: 'toggleBackButtonDisplay', arguments: 'start'});
            wink.subscribe('/slidingpanels/events/slideend', {context: this, method: 'toggleBackButtonDisplay', arguments: 'end'});

            //remove all select options
            jQuery.each(jQuery("select"), function() {jQuery(this).find('option').remove()});
            
            //init snow danger signs
			this.store.getObjectFromServer(new DangerSignKD(), snow_faresign.fill_snow_danger_sign);
			this.store.getObjectFromServer(new ActivityInfluencedKD(), this.fillActivityInfluenced);
			this.store.getObjectFromServer(new DamageExtentKD(), this.fillDamageExtent);
			 
			main.login = main.store.loggedInAs(main.loggedInAsCallback);

			main.sizeElements();
        },
        
        fillActivityInfluenced: function(data) {
			snow_hendelse.fill_activity_influenced(data);
        	water_hendelse.fill_activity_influenced(data);
        	dirt_hendelse.fill_activity_influenced(data);
        	ice_hendelse.fill_activity_influenced(data);
        },
        
        fillDamageExtent: function(data) {
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
        	
        	$('login_username').value = data.EMail;
        },
        
        toggleBackButtonDisplay: function(params, status) {
        	
        	switch(params.id) {
        		case 'home':
        			if(status == 'end') {
        			}
        			
        			if(status == 'start') {
        				$('back').style.display = 'none';
        				$('mainBody').style.backgroundImage = '';
        				main_page.init();
        			}
        			break;
        			
        		case 'snow':
        			if(status == 'start') {
        				snow_page.init();
        				$('mainBody').style.backgroundImage = "url('img/snow_background.png')";
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
        	if(params.id != 'home') {
        		if(status == 'start') {
    				$('back').style.display = 'block';
//    				$('header').style.display = 'block';
    			}
        	}
        }
    }
     
    window.addEventListener('load', wink.bind(main.init, main), false);
     
    return main;
}());

