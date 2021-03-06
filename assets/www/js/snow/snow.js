var snow_obs =  snow_page = {	
	name : "snow_page",
	favorite_name : SNOW,
	shouldShowFooter : false,
		
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates       
	//
	onSuccess: function(position) {
		console.log("in success");
		snow_page.updatePagePosition(position);
		snow_page.displayPosition(position);

		GetObjectFromServer(new PositionDetails(snow_page.latitute, snow_page.longitude), snow_page.onKommuneResult, snow_page.onError);
		GetObjectFromServer(new AreaInformation(snow_page.latitute, snow_page.longitude), snow_page.onAreaInformationResult, snow_page.onError);
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
		snow_page.resetCounter('snow_surface_count');
		snow_page.resetCounter('snow_activity_count');
		snow_page.resetCounter('snow_evaluation_count');
		jQuery('#snow_hendelse_count').removeClass("checked").text("0");
		jQuery('#snow_group').val(0);
		
	},
	
	init: function() {
		this.danger_store = function(){ return main.store.getSnow(); };
		$('header_middle_text').innerHTML = "Sn&oslash;";
		jQuery("#regobs-name").hide();
		
		snow_page.doMeasurement();

		var snowStore = main.store.getSnow();

		snow_page.setCounter('snow_faresign_count', snowStore.getObs('DangerObs').length);
		if(snowStore.getObs('SnowSurfaceObservation').length > 0){
			snow_page.check('snow_surface_count');
		}
		
		snow_page.setCounter('snow_activity_count', snowStore.getObs('AvalancheActivityObs').length);
		if(snowStore.getObs('AvalancheEvaluation2').length > 0){
			snow_page.check('snow_evaluation_count');
		}
		snow_page.setCounter('snow_picture_count', snowStore.getPictures().length);
		
		jQuery("#snow_obs .sendAndGroup").html(Handlebars.templates.sendGroup({sendFunction: "main.store.sendSnow", hazard:"snow"}));
		login_page.showGroupStatus();
		
		this.showStar();
		main.updateCollection(main.store.packageCollection);
	}
};

jQuery.extend(snow_page, super_page);
