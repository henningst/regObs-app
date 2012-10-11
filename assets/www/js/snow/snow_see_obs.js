var snow_see_obs = {
	shouldShowFooter : false,
	domNodeId : '#snow_see_obs',
	init: function(){
		this.renderer = new ObservationViewRendrer(this.domNodeId, [], "map_page.snowMap()");
		this.renderer.render();
		
		this.urlGenerator = new AllRegistrationsVUrlGenerator({}, SNOW_GEO_HAZARD);

		geo.requestPosition("snow_see_obs.loadObservations");
		//debug for running in browser
		//snow_see_obs.loadObservations({"coords":{"latitude":61.22086676303297,"longitude":7.079088455066085,"accuracy":50,"taken":"2012-10-09T08:35:40.000Z"},"timestamp":1349771740000});
		
	},
	
	loadObservations : function(position){
		snow_see_obs.setPosAndUpdateObservations.call(snow_see_obs, position);
	}
};

jQuery.extend(snow_see_obs, super_observations);
