var main = (function()
{
    var main =
    {
    	panels: null,
    		
        init: function()
        {
        	this.panels = new wink.plugins.AsyncPanels
            (
    	        {
    	        	duration: 500,
    	        	transitionType: 'default',
    	        	pages:
    	    		[
    	        		'page1',
    	        		{id: 'page2', url: './presentation.html'},
    	        		{id: 'page3', url: './contact.html'}
    	        	]
    	        }
    	    );
            document.body.appendChild(this.panels.getDomNode());

            wink.subscribe('/slidingpanels/events/slidestart', {context: this, method: 'toggleBackButtonDisplay', arguments: 'start'});
            wink.subscribe('/slidingpanels/events/slideend', {context: this, method: 'toggleBackButtonDisplay', arguments: 'end'});
        },
        
        toggleBackButtonDisplay: function(params, status) {
        	
        	switch(params.id) {
        		case 'page1':
        			if(status == 'start') {
        				$('back').style.display = 'none';
        			}
        			break;
        			
        		default:
        			if(status == 'end') {
        				$('back').style.display = 'block';
        			}
        			break;
        	}
        }
    }
     
    window.addEventListener('load', wink.bind(main.init, main), false);
     
    return main;
}());