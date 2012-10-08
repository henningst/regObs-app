var snow_show_obs = {
	init : function(){
		$('header_middle_text').innerHTML = "Observasjon";
	},
	
	unload : function(){
		jQuery("#snow_show_obs iframe").remove();
	}

};