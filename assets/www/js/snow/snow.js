var snow_page = {	
	name : "snow_page",
	favorite_name : SNOW,
		
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
	
	savePosition: function(position){
		snow_page.performSavePosition(position);
	},
	
	doMeasurement: function() {
		geo.last_page_location = 'snow_page.onSuccess';
		geo.requestPosition('snow_page.onSuccess');
	},
   
	afterSendRegistration: function() {
		snow_page.resetCounter('snow_faresign_count');
		snow_page.resetCounter('snow_picture_count');
		jQuery('#snow_hendelse_count').removeClass("checked").text("0");
		jQuery('#snow_group').val(0);
		
	},
	
	init: function() {
		this.danger_store = function(){ return main.store.getSnow(); };
		$('header_middle_text').innerHTML = "Sn&oslash;";
		jQuery("#regobs-name").hide();
		
		snow_page.doMeasurement();

		var snowStore = main.store.getSnow();

		snow_page.setCounter('snow_faresign_count', snowStore.getObs().length);
		snow_page.setCounter('snow_picture_count', snowStore.getPictures().length);
		
		jQuery("#snow_obs .sendAndGroup").html(Handlebars.templates.sendGroup({sendFunction: "main.store.sendSnow", hazard:"snow"}));
		
		this.showStar();
	}
};

jQuery.extend(snow_page, super_page);
