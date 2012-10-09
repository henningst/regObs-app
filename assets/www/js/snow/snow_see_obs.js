var snow_see_obs = {
	domNodeId : '#snow_see_obs',
	init: function(){
		this.renderer = new ObservationViewRendrer(this.domNodeId, []);
		this.renderer.render();

//		geo.requestPosition("snow_see_obs.loadObservations");
		snow_see_obs.loadObservations({"coords":{"latitude":61.22086676303297,"longitude":7.079088455066085,"accuracy":50,"taken":"2012-10-09T08:35:40.000Z"},"timestamp":1349771740000});
		
	},
	
	loadObservations : function(position){
		console.log("------------------");
		console.log(JSON.stringify(position));
		
		super_page.updatePagePosition.call(snow_see_obs,position);
		
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
