var information_page = {
		
		init: function() 
		{
			$('header_middle_text').innerHTML = "regObs";
			jQuery("#regobs-name").hide();
			
			jQuery("#information p").html(ABOUT_REGOBS);
			
			jQuery("#appversion").text(APP_VERSION);
			
			throw {
				message : "tet"
			};
			
		}
		
};
