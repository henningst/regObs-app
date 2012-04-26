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
    	        		'water',
    	        		'dirt'
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
			this.store.getObjectFromServer(new ActivityInfluencedKD(), snow_hendelse.fill_activity_influenced);
			this.store.getObjectFromServer(new DamageExtentKD(), snow_hendelse.fill_radius);

//			jQuery('.sl_container').attr('id', 'pages');
//			jQuery('#header').css('webkit-transition-duration', '500ms');
//			jQuery('#header').css('webkit-transition-delay', '1ms');
////			
//			wink.fx.apply($('header'), {'transition-timing-function': 'ease-in-out'});
			 
			main.login = main.store.loggedInAs(main.loggedInAsCallback);

//			$('header').style.display = 'none';
			main.sizeElements();
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
        				main_page.init();
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
        			
        		case 'snow':
        			if(status == 'start') {
        				snow_page.init();
        			}
        			break;
        		case 'ice':
        			if(status == 'start') {
        				ice_page.init();
        			}
        			break;
        		case 'water':
        			if(status == 'start') {
        				water_page.init();
        			}
        		break;
        		case 'dirt':
        			if(status == 'start') {
        				dirt_page.init();
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

