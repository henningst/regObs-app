var main = (function()
{
    var main =
    {	
    	store: new NveStore(),
    		
    	login: {data: {"EMail" : "anonym@nve.no", "FirstName" : "Anonym", "ObserverID" : 105}},
    	
    	panels: null,
    	
		clickLogin: function() {
			main.closePopup();

			this.store.login(document.getElementById('login_username').value, document.getElementById('login_password').value);
		},
		
		loginCallback: function(data) {
			main.login = main.store.loggedInAs(main.loggedInAsCallback);
//			document.getElementById('loginButton').value = data.statusText;
		},
		
		testMethod: function() {
			alert(this.store.getPictures());
		},
		
		fill_snow_danger_sign: function(data) {
			var list = $("snow_danger_sign_list");
			var i=0;
			for (i = 0; i < data.results.length; i++)
			{
				list.add(new Option(data.results[i].DangerSignName, data.results[i].DangerSignTID));
			}
		},
		
		calli: function(data) {
			console.log(data);
		},
		
		popup: new wink.ui.xy.Popup(),
		 
		showPopup: function()
		{
			this.popup.popup({
		        content: "<div class='w_bloc'>" +
		            "<label>login</label><input type='text' id='login_username' value='' /><br />" +
		            "<label>password</label><input type='passwd' id='login_password' value='' /><br />" +
		            "<input type='button' style='color: white;' value='Login' onclick='main.clickLogin()' /><br />" +
		        "</div>",
		        layerCallback: { context: window, method: 'closePopup' }
		    });
		},
		 
		closePopup: function()
		{
			this.popup.hide();
		},
    	
        init: function()
        {
        	this.panels = new wink.ui.layout.SlidingPanels
            (
    	        {
    	        	duration: 500,
    	        	transitionType: 'default',
    	        	pages:
    	    		[
    	        		'home',
    	        		'snowObservation',
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
    		document.body.appendChild(this.popup.getDomNode());
            
            wink.subscribe('/slidingpanels/events/slidestart', {context: this, method: 'toggleBackButtonDisplay', arguments: 'start'});
            wink.subscribe('/slidingpanels/events/slideend', {context: this, method: 'toggleBackButtonDisplay', arguments: 'end'});

            //init snow danger signs
			this.store.getObjectFromServer(new DangerSignKD(), main.fill_snow_danger_sign);
			this.store.getObjectFromServer(new ActivityInfluencedKD(), snow_hendelse.fill_activity_influenced);
			this.store.getObjectFromServer(new DamageExtentKD(), snow_hendelse.fill_radius);
			
			main.login = main.store.loggedInAs(main.loggedInAsCallback);
        },
        
        loggedInAsCallback: function (data) {
        	document.getElementById('loginButton').value = data.FirstName;
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
        			
        		case 'snowObservation':
        			if(status == 'start') {
        				snow_observation.init();
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
