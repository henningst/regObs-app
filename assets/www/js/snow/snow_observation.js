var snow_observation = {

   add: function(id)
   {
       var i = parseInt($(id).innerHTML) +1;
       $(id).innerHTML = i;
   },
   
   afterSendRegistration: function() {
	   $('snow_faresign').innerHTML = 0;
	   $('snow_hendelse').innerHTML = 0;
	   $('report3').innerHTML = 0;
	   $('report4').innerHTML = 0;
	   
   },
		
	init: function() {
		$('header_middle_text').innerHTML = "Sn&oslash;";

	},
}

