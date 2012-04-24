var snow_observation = {

   add: function(id)
   {
       var i = parseInt($(id).innerHTML) +1;
       $(id).innerHTML = i;
   },
   
   afterSendRegistration: function() {
	   $('snow_faresign_count').innerHTML = 0;
	   $('snow_picture_count').innerHTML = 0;
	   
   },
		
	init: function() {
		$('header_middle_text').innerHTML = "Sn&oslash;";

	},
}

