var map_obs_page = {
	shouldShowFooter : false,
	domNodeId : '#map_obs_page',
	geo_hazard : null,
	init: function(){
		this.renderer = new ObservationViewRendrer(this.domNodeId, []);
		this.renderer.render();
		
		this.urlGenerator = new AllRegistrationsVUrlGenerator({}, this.geo_hazard);
	},
	
	loadObservations : function(position){
		var packaged_pos = { 
				coords: {
					latitude : position.lat(),
					longitude : position.lng()
				}
		};
		map_obs_page.setPosAndUpdateObservations.call(map_obs_page, packaged_pos);
	}
};

jQuery.extend(map_obs_page, super_observations);
