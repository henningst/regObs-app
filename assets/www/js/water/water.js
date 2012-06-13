var water_page = {
	danger_store : function() { return main.store.getWater(); },
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		this.updatePagePosition(position);
		this.displayPosition(position);
				
		GetObjectFromServer(new PositionDetails(water_page.latitute, water_page.longitude), water_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(water_page.latitute, water_page.longitude), water_page.onAreaInformationResult);
	},
	
	updateLocation : function() 
	{
		geo.reqestPosition('water_page.setStoredLocation');
	},

	doMeasurement: function() {
		geo.requestPosition('water_page.onSuccess');
	},
	
	afterSendRegistration: function() {
		$('water_faresign_count').innerHTML = 0;
		$('water_picture_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Vann";
		
		water_page.doMeasurement();
		
		var waterStore = main.store.getWater();

		$('water_faresign_count').innerHTML = waterStore.getObs().length
		$('water_picture_count').innerHTML = waterStore.getPictures().length
		
		this.showStar();
	},
};

jQuery.extend(water_page, super_page);

