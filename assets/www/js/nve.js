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
    	
        init: function()
        {
        	this.panels = new wink.ui.layout.SlidingPanels
            (
    	        {
    	        	duration: 500,
    	        	transitionType: 'default',
    	        	pages:
    	    		[
    	        		'page1',
    	        		'snow',
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
            
            var properties1 = 
    		{
    			'itemsWidth': 280,
    			'itemsHeight': 136,
    			'autoAdjust': 1,
    			'autoAdjustDuration': 400,
    			'autoPlay': 1,
    			'autoPlayDuration': 4000,
    			'firstItemIndex': 2,
    			'items':
    			[
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_01.png" />'},
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_02.png" />'},
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_03.png" />'},
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_04.png" />'},
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_05.png" />'},
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_01.png" />'},
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_02.png" />'},
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_03.png" />'},
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_04.png" />'},
    			 {'type': 'string', 'content': '<img src="./img/carousel_image_05.png" />'}
    			]
    		};
            
    		carousel1 = new wink.ui.xy.Carousel(properties1);

			$('snow_test1').appendChild(carousel1.getDomNode());
            
//            var spinner1 = new wink.ui.xy.Spinner({background: "light"}).getDomNode();
//			var spinner2 = new wink.ui.xy.Spinner({background: "dark"}).getDomNode();
//			var spinner3 = new wink.ui.xy.Spinner({background: "personal", backgroundImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAdCAYAAABWk2cPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAqBJREFUeNq0l09sTVEQxt+956V/BE1VVYioRki1C8QKCzYSiY0FDRULtScW3TSR2thaNK3YSFhJV1pJY2HDhoQFkpJKLERKaGhoFY37jm9kRsb03Of23naSX+/tfe+e78ycMzPnudLibAWoAA8Og1bQBCIwk3WQKMN3doEj4ABoBN/Aa3BPjRHxZOizJ+BtXtENYAB0qoH19/vVGLHhKxhL8z5OEezhlzqqTMozIQcoIl0cpQVWDjzrA908iE+Jxif1PDL34kgN2AtWgQfVPD0DTvB9xXhE/ALXwSHjaWSI1ZW83ZO2prSGI6BeTUh7MAFOpaxTHTgKVpu1FeEE3OC1/keUBLeYcEkkjoHxDDu9GRwHTr0v4tMcpb+D7uec8yq0nq87MgqSTYFBFnFGlPK5TYueCwiWeNZ57JZZW5nAQS26UYkJk+BFTtEPYI7FnBJeI6L7QK0Kp3CyVMxuBooG6Wwtcy55lR6Sn58Lis4pL/Wm/SPaZnIuNpWmiLlAeraUVecomaKw1KJi9SQ6y0LRMojGgXo9H3ObspuosoSeOpOzU/TnoSkGsr6NBQVXBsoh8UpEvxtvqVZeKyh6QXnoVA2ekJi/M17S/VqwLafgJi4ENrTTeqGvBkJM16Gcor0mtBLeMS36CLwxorKT71JCZxTbzA44s5aOm8FL29rWc+upMTU44etHcB58CYhRH70IGtSkEzXGT3BZqpw9itC55qzpNklgk8kpQv7XzxOVcvLObXV6XFAxxvlMs914G+qzPqVmR+oZ2X1w539l6jGHo50/9ykTqCZINs+nkdHFnHtbwCXutTq83oSzYtaP7t+DK3xqzHXCp5PcabCON5kVF35w8x4Gz4v+rNC2G+zk5K/jnxH0E+IZeJp1kN8CDAB9ltpq+w/AhQAAAABJRU5ErkJggg=="}).getDomNode();
			
//			spinner1.style.height = "20px";
			
//			$('snow_test1').appendChild(spinner1);
//			$('snow_test1').appendChild(spinner2);
//			$('snow_tes1').appendChild(spinner3);

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