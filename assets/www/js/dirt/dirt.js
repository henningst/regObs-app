var dirt_page = {
	danger_store: function(){return main.store.getDirt(); },
		
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		dirt_page.updatePagePosition(position);
		dirt_page.displayPosition(position);
		
		GetObjectFromServer(new PositionDetails(dirt_page.latitute, dirt_page.longitude), dirt_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(dirt_page.latitute, dirt_page.longitude), dirt_page.onAreaInformationResult);
	},
	
	updateLocation : function() 
	{
		geo.requestPosition('dirt_page.setStoredLocation');
	},

	doMeasurement: function() {
		geo.last_page_location = "dirt_page.onSuccess";
		geo.requestPosition('dirt_page.onSuccess');
	},
	
	afterSendRegistration: function() {
		$('dirt_faresign_count').innerHTML = 0;
		$('dirt_picture_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "L&oslash;smasse";
		
		dirt_page.doMeasurement();

		var dirtStore = main.store.getDirt();

		$('dirt_faresign_count').innerHTML = dirtStore.getObs().length;
		$('dirt_picture_count').innerHTML = dirtStore.getPictures().length;
		
		this.showStar();
	},
};

jQuery.extend(dirt_page, super_page);

