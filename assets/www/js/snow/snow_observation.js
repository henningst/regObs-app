var snow_observation = {

   add: function(id)
   {
       var i = parseInt($(id).innerHTML) +1;
       $(id).innerHTML = i;
   },
   
   afterSendRegistration: function() {
	   $('snow_faretegn').innerHTML = 0;
	   $('report1').innerHTML = 0;
	   $('report3').innerHTML = 0;
	   $('report4').innerHTML = 0;
	   
   },
		
	init: function() {
		$('header_middle_text').innerHTML = "Sn&oslash;";

	},
}

