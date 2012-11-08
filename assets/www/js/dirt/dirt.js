var dirt_obs =  dirt_page = {
	name: "dirt_page",
	shouldShowFooter : false,

	favorite_name: DIRT,
		
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		console.log("pp: onsuccess start")
		dirt_page.updatePagePosition(position);
		dirt_page.displayPosition(position);
		
		GetObjectFromServer(new PositionDetails(dirt_page.latitute, dirt_page.longitude), dirt_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(dirt_page.latitute, dirt_page.longitude), dirt_page.onAreaInformationResult);
		console.log("pp: onsuccess end")
	},
	
	savePosition: function(position){
		dirt_page.performSavePosition(position);
	},

	doMeasurement: function() {
		geo.last_page_location = "dirt_page.onSuccess";
		geo.requestPosition('dirt_page.onSuccess');
	},
	
	afterSendRegistration: function() {
		dirt_page.resetCounter('dirt_faresign_count');
		dirt_page.resetCounter('dirt_avalange_count');
		dirt_page.resetCounter('dirt_picture_count');
		jQuery('#dirt_hendelse_count').removeClass("checked").text("0");
		jQuery('#dirt_group').val(0);
	},
	
	init: function() {
		this.danger_store = function(){return main.store.getDirt(); };
		$('header_middle_text').innerHTML = "Jord";
		jQuery("#regobs-name").hide();
		
		dirt_page.doMeasurement();

		var dirtStore = main.store.getDirt();

		dirt_page.setCounter('dirt_avalange_count', dirtStore.getObs('LandSlideObs').length);
		dirt_page.setCounter('dirt_faresign_count', dirtStore.getObs('DangerObs').length);
		dirt_page.setCounter('dirt_picture_count', dirtStore.getPictures().length);
		
		jQuery("#dirt_obs .sendAndGroup").html(Handlebars.templates.sendGroup({sendFunction: "main.store.sendDirt", hazard:"dirt"}));
		login_page.showGroupStatus();
		
		this.showStar();
	}
};

jQuery.extend(dirt_page, super_page);

