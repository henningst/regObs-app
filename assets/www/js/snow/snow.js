var snow_page = {
	
		
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates       
	//
	onSuccess: function(position) {
		console.log("in success");
		snow_page.updatePagePosition(position);
		snow_page.displayPosition(position);

		GetObjectFromServer(new PositionDetails(snow_page.latitute, snow_page.longitude), snow_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(snow_page.latitute, snow_page.longitude), snow_page.onAreaInformationResult);
	},
	
	updateLocation : function(callback) 
	{
		snow_page.updateLocCallback = callback;
		geo.requestPosition('snow_page.savePosition', true);
	},
	
	savePosition: function(position){
		console.log("poition saved " + position)
		snow_page.setStoredLocation(position);
		snow_page.updateLocCallback();
	},
	
	doMeasurement: function() {
		geo.last_page_location = 'snow_page.onSuccess';
		geo.requestPosition('snow_page.onSuccess');
	},
   
	afterSendRegistration: function() {
		$('snow_faresign_count').innerHTML = 0;
		$('snow_picture_count').innerHTML = 0;
	},
	
	init: function() {
		this.danger_store = function(){ return main.store.getSnow(); };
		$('header_middle_text').innerHTML = "Sn&oslash;";
		
		snow_page.doMeasurement();

		var snowStore = main.store.getSnow();

		$('snow_faresign_count').innerHTML = snowStore.getObs().length;
		$('snow_picture_count').innerHTML = snowStore.getPictures().length;
		
		this.showStar();
	}
};

jQuery.extend(snow_page, super_page);
