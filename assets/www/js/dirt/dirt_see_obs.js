var dirt_see_obs = {
	domNodeId : '#dirt_see_obs',
	init: function(){
		this.renderer = new ObservationViewRendrer(this.domNodeId, []);
		this.renderer.render();
		
		this.urlGenerator = new AllRegistrationsVUrlGenerator({}, DIRT_GEO_HAZARD);

		geo.requestPosition("dirt_see_obs.loadObservations");
		//debug for running in browser
		//snow_see_obs.loadObservations({"coords":{"latitude":61.22086676303297,"longitude":7.079088455066085,"accuracy":50,"taken":"2012-10-09T08:35:40.000Z"},"timestamp":1349771740000});
		
	},
	
	loadObservations : function(position){
		dirt_see_obs.setPosAndUpdateObservations.call(dirt_see_obs, position);
	}
};

jQuery.extend(dirt_see_obs, super_observations);
