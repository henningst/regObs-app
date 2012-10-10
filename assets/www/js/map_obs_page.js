var map_obs_page = {
	domNodeId : '#map_obs_page',
	geo_hazard : null,
	init: function(){
		console.log("rendring map-obs");
		this.renderer = new ObservationViewRendrer(this.domNodeId, []);
		this.renderer.render();
		
		this.urlGenerator = new AllRegistrationsVUrlGenerator({}, this.geo_hazard);
	},
	
	loadObservations : function(position){
		var packaged_pos = { 
				coords: {
					latitude : position.Xa,
					longitude : position.Ya
				}
		};
		map_obs_page.setPosAndUpdateObservations.call(map_obs_page, packaged_pos);
	}
};

jQuery.extend(map_obs_page, super_observations);
