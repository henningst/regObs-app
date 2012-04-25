var main = (function()
{
    var main =
    {	
    	optionsDisplayed: 0,
    		
    	store: new NveStore(),
    		
    	login: {data: {"EMail" : "anonym@nve.no", "FirstName" : "Anonym", "ObserverID" : 105}},
    	
    	panels: null,
    	
		clickLogin: function() {
//			main.closePopup();
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
		
//		popup: new wink.ui.xy.Popup(),
//		 
//		showPopup: function()
//		{
//			this.popup.popup({
//		        content: "<div class='w_bloc'>" +
//		            "<label>login</label><input type='text' id='login_username' value='' /><br />" +
//		            "<label>password</label><input type='passwd' id='login_password' value='' /><br />" +
//		            "<input type='button' style='color: white;' value='Login' onclick='main.clickLogin()' /><br />" +
//		        "</div>",
//		        layerCallback: { context: window, method: 'closePopup' }
//		    });
//		},
//		 
//		closePopup: function()
//		{
//			this.popup.hide();
//		},
    	
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
//    		document.body.appendChild(this.popup.getDomNode());
            
            wink.subscribe('/slidingpanels/events/slidestart', {context: this, method: 'toggleBackButtonDisplay', arguments: 'start'});
            wink.subscribe('/slidingpanels/events/slideend', {context: this, method: 'toggleBackButtonDisplay', arguments: 'end'});

            //init snow danger signs
			this.store.getObjectFromServer(new DangerSignKD(), snow_faresign.fill_snow_danger_sign);
			this.store.getObjectFromServer(new ActivityInfluencedKD(), snow_hendelse.fill_activity_influenced);
			this.store.getObjectFromServer(new DamageExtentKD(), snow_hendelse.fill_radius);

			jQuery('.sl_container').attr('id', 'pages');
			jQuery('.sl_container').css('webkit-transition-duration', '500ms');
			jQuery('.sl_container').css('webkit-transition-delay', '1ms');
			
			wink.fx.apply($('pages'), {'transition-timing-function': 'ease-in-out'});
			
//			{'webkit-transition-property': '-webkit-transform},
//			{'webkit-transform': 'translate3d(-100%, 0px, 0px)'}
			main.login = main.store.loggedInAs(main.loggedInAsCallback);
        },
        
        sizeElements: function()
    	{
    		scrollTo(0, 0, 0);
    		
    		var _h = window.innerHeight;
    		var _w = window.innerWidth;
    		
    		$('wrapper').style.height = _h + 'px';
    		$('wrapper').style.width = _w + 'px';
    		
    		if ( wink.isSet($('splash')) )
    		{
    			$('splash').style.height = _h + 'px';
    		}
    		
    		$('tests_scroller').style.height = _h - 64 + 'px';
    		$('tests_scroller').style.width = _w + 'px';
    		
    		$('about_scroller').style.height = _h - 54 + 'px';
    		$('about_scroller').style.width = _w - 81 + 'px';
    		
    		$('container').style.height = _h + 'px';
    		
    		$('options').style.width = (_w - 81) + 'px';
    		$('tests').style.width = _w + 'px';
    		$('test').style.width = _w + 'px';
    		
    		$('testContent').style.minHeight = _h + 'px';
    	},
        
        loggedInAsCallback: function (data) {
//        	document.getElementById('loginButton').value = data.FirstName;
        },
        
        toggleBackButtonDisplay: function(params, status) {
        	
        	switch(params.id) {
        		case 'home':
        			if(status == 'start') {
        				$('back').style.display = 'none';
        			}
        			
        			if(status == 'start') {
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
        		if(status == 'end') {
    				$('back').style.display = 'block';
    			}
        	}
        }
    }
     
    window.addEventListener('load', wink.bind(main.init, main), false);
     
    return main;
}());

