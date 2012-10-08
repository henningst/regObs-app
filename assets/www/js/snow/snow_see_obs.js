var snow_see_obs = {
	domNodeId : '#snow_see_obs',
	init: function(){
		this.renderer = new ObservationViewRendrer(this.domNodeId, []);
		this.renderer.render();

		geo.requestPosition("snow_see_obs.loadObservations");
		
		
	},
	
	loadObservations : function(position){
		console.log("------------------");
		console.log(JSON.stringify(position));
		
		this.updatePagePosition(position);
		
		snow_see_obs.fetcher = new ObservationFetcher(new AllRegistrationsVUrlGenerator({east: this.longitude, north: this.latitute}));
		var _this = snow_see_obs;
		
		snow_see_obs.fetcher.getObservations(
			function(listOfViews){
				console.log("number of views " + listOfViews.length);
				_this.renderer.setListOfView(listOfViews);
				_this.renderer.render();
			}
		);
	}
};

jQuery.extend(snow_see_obs, super_page);
