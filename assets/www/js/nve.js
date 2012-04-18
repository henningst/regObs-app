var main = (function()
{
    var main =
    {	
    	store: null,
    		
    	login: null,
    	
    	panels: null,
    	
    	toolbar : 
		{

	       add: function(id)
	       {
               var i = parseInt($(id).innerHTML) +1;
               $(id).innerHTML = i;
	       }
		},
		
		clickLogin: function() {
			main.closePopup();
			
			var login = new Login(document.getElementById('login_username').value, document.getElementById('login_password').value);
			this.store = new NveStore();
			this.store.login(document.getElementById('login_username').value, document.getElementById('login_password').value);
		},
		
		loginCallback: function(data) {
			main.login = main.store.loggedInAs();
			document.getElementById('loginButton').value = data.statusText;
		},
		
		pointsClicked: function() {
			console.log(main.login.data);
			var location = new Location(null, 33, 103222, 6982346, new Date());
			this.store.addObsLocation(location, this.yes);
		},
		
		calli: function(data) {
			console.log(data);
		},
		
		yes: function(data) {
			var registration = new Registration(null, main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date());
			main.store.addRegistration(registration, this.calli);
		},
		
		popup: new wink.ui.xy.Popup(),
		 
		showPopup: function()
		{
			this.popup.popup({
		        content: "<div class='w_bloc'>" +
		            "<label>login</label><input type='text' id='login_username' value='philipp@nlink.no' /><br />" +
		            "<label>password</label><input type='passwd' id='login_password' value='philipp2philipp' /><br />" +
		            "<input type='button' value='Login' onclick='main.clickLogin()' /><br />" +
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
    	        		'snow_second',
    	        		'snow_picture',
    	        		'ice',
    	        		'water',
    	        		'dirt',
    	        		'snow_test1',
    	        		'snow_test2',
    	        		'snow_test3',
    	        		'snow_test4'
    	        	]
    	        }
    	    );
            document.body.appendChild(this.panels.getDomNode());
    		document.body.appendChild(this.popup.getDomNode());
            
            wink.subscribe('/slidingpanels/events/slidestart', {context: this, method: 'toggleBackButtonDisplay', arguments: 'start'});
            wink.subscribe('/slidingpanels/events/slideend', {context: this, method: 'toggleBackButtonDisplay', arguments: 'end'});
            
//            alert(document.body.clientHeight +" : " +document.body.clientWidth);
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

//Bin !
/*
###
constructor: (@login, callback) ->
    @loggedIn = false
    
    @cridentials = {
      "userName": @login.username,
      "password": @login.password,
      "createPersistentCookie": true,
      "Expires":"\/Date(" + new Date().getTime() + "-0100)\/"
    }
    
    jQuery.ajax({
      type: 'POST',
      url: "http://h-web01.nve.no/test_RegObsServices/Authentication_JSON_AppService.axd/Login",
      data: JSON.stringify(@cridentials),
      dataType: 'json',
      headers: { 
        Accept : "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8"
      }
    }).complete( (data) => 
      @loggedIn = true
      callback(data) if callback
    )  
###

 */


