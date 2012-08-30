var ice_page = {
	name: "ice_page",
	favorite_name: ICE,
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		ice_page.updatePagePosition(position);
		ice_page.displayPosition(position);
				
		GetObjectFromServer(new PositionDetails(ice_page.latitute, ice_page.longitude), ice_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(ice_page.latitute, ice_page.longitude), ice_page.onAreaInformationResult);
	},
	
	savePosition: function(position){
		ice_page.performSavePosition(position);
	},

	doMeasurement: function() {
		geo.requestPosition('ice_page.onSuccess');
	},
	
	afterSendRegistration: function() {
		$('ice_picture_count').innerHTML = 0;
		$('ice_faresign_count').innerHTML = 0;
		jQuery('#ice_hendelse_count').removeClass("checked").text("0");
	},
	
	init: function() {
		this.danger_store = function() { return main.store.getIce(); };
		$('header_middle_text').innerHTML = "Is";
		
		ice_page.doMeasurement();
		
		var iceStore = main.store.getIce();

		$('ice_faresign_count').innerHTML = iceStore.getObs().length;
		$('ice_picture_count').innerHTML = iceStore.getPictures().length;
		
		this.showStar();
	}
};

jQuery.extend(ice_page, super_page);

