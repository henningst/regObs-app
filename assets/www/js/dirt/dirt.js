var dirt_page = {
	name: "dirt_page",

	favorite_name: DIRT,
		
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
	
	savePosition: function(position){
		dirt_page.performSavePosition(position);
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
		this.danger_store = function(){return main.store.getDirt(); };
		$('header_middle_text').innerHTML = "L&oslash;smasse";
		
		dirt_page.doMeasurement();

		var dirtStore = main.store.getDirt();

		$('dirt_faresign_count').innerHTML = dirtStore.getObs().length;
		$('dirt_picture_count').innerHTML = dirtStore.getPictures().length;
		
		this.showStar();
	},
};

jQuery.extend(dirt_page, super_page);

