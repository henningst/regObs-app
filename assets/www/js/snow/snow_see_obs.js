var snow_see_obs = {
	domNodeId : '#snow_see_obs',
	init: function(){
		this.renderer = new ObservationViewRendrer(this.domNodeId, []);
		this.renderer.render();
		
		this.fetcher = new ObservationFetcher();
		var _this = this;
		this.fetcher.getObservations(
			function(listOfViews){
				_this.renderer.setListOfView(listOfViews);
				_this.renderer.render();
			}
		);
	}
};
