var settings_page = {
		
	search_diameter : function(){return jQuery("#setting_search_diameter");},
	init: function() {
		$('header_middle_text').innerHTML = "Innstillinger";
		jQuery("#regobs-name").hide();
		this.search_diameter().val(main.getObservationSearchDiameter());
		
		jQuery("#setting_mode_description").html(SETTING_MODE_DESCRIPTION);
		jQuery("#setting_update_description").html(SETTING_UPDATE_DESCRIPTION);
		jQuery("#setting_reset_description").html(SETTING_RESET_DESCRIPTION);
		jQuery("#setting_diameter_description").html(SETTING_DIAMETER_DESCRIPTION);
		
		jQuery("#setting_version").text(APP_VERSION);
	},
	
	changedSearchDiameter : function(){
		diameter = SEARCH_DIAMETER;
		if(this.search_diameter().val() !== "")
			diameter = this.search_diameter().val();
			
		DataAccess.save(SEARCH_DIAMETER_KEY, diameter);
	}
};
