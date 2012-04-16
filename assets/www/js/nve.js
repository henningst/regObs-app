var main = (function()
{
    var main =
    {	
    	panels: null,
    	
    	toolbar : 
		{

	       add: function(id)
	       {
	               var i = parseInt($(id).innerHTML) +1;
	               $(id).innerHTML = i;
	       }
		},
		
		popup: new wink.ui.xy.Popup(),
		 
		showPopup: function()
		{
			this.popup.popup({
		        content: "<div class='w_bloc'>" +
		            "<label>login</label><input type='text' /><br />" +
		            "<label>password</label><input type='passwd' /><br />" +
		            "<input type='button' value='Login' onclick='main.closePopup()' /><br />" +
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
            
            alert(document.body.clientHeight +" : " +document.body.clientWidth);
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