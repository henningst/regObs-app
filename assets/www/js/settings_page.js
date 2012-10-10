var settings_page = {
		
	search_diameter : function(){return jQuery("#setting_search_diameter")},
	init: function() {
		$('header_middle_text').innerHTML = "Innstillinger";
		jQuery("#regobs-name").hide();
		this.search_diameter().val(main.getObservationSearchDiameter());
	},
	
	changedSearchDiameter : function(){
		diameter = SEARCH_DIAMETER;
		if(this.search_diameter().val() !== "")
			diameter = this.search_diameter().val();
			
		DataAccess.save(SEARCH_DIAMETER_KEY, diameter);
	}
};
