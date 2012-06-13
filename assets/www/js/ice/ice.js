var ice_page = {
	danger_store : function() { return main.store.getIce(); },
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		this.updatePagePosition(position);
		this.displayPosition(position);
				
		GetObjectFromServer(new PositionDetails(ice_page.latitute, ice_page.longitude), ice_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(ice_page.latitute, ice_page.longitude), ice_page.onAreaInformationResult);
	},
	
	updateLocation : function() 
	{
		geo.requestPosition('ice_page.setStoredLocation');
	},

	doMeasurement: function() {
		geo.requestPosition('ice_page.onSuccess');
	},
	
	afterSendRegistration: function() {
		$('ice_picture_count').innerHTML = 0;
		$('ice_faresign_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Is";
		
		ice_page.doMeasurement();
		
		var iceStore = main.store.getIce();

		$('ice_faresign_count').innerHTML = iceStore.getObs().length;
		$('ice_picture_count').innerHTML = iceStore.getPictures().length;
		
		this.showStar();
	}
};

jQuery.extend(ice_page, super_page);

