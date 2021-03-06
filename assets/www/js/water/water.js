var water_obs=  water_page = {
	name:"water_page",
	shouldShowFooter : false,
	favorite_name : WATER,
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		water_page.updatePagePosition(position);
		water_page.displayPosition(position);
				
		GetObjectFromServer(new PositionDetails(water_page.latitute, water_page.longitude), water_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(water_page.latitute, water_page.longitude), water_page.onAreaInformationResult);
	},
	
	savePosition: function(position){
		water_page.performSavePosition(position);
	},

	doMeasurement: function() {
		geo.requestPosition('water_page.onSuccess');
	},
	
	afterSendRegistration: function() {
		water_page.resetCounter('water_faresign_count');
		water_page.resetCounter('water_picture_count');
		water_page.resetCounter('water_level_count');
		jQuery('#water_hendelse_count').removeClass("checked").text("0");
		jQuery('#water_level_count').removeClass("checked").text("0");
		jQuery('#water_group').val(0);
	},
	
	init: function() {
		this.danger_store = function() { return main.store.getWater(); };
		$('header_middle_text').innerHTML = "Vann";
		jQuery("#regobs-name").hide();
		
		water_page.doMeasurement();
		
		var waterStore = main.store.getWater();

		water_page.setCounter('water_faresign_count', waterStore.getObs('DangerObs').length);
		water_page.setCounter('water_picture_count', waterStore.getPictures().length);
		

		jQuery("#water_obs .sendAndGroup").html(Handlebars.templates.sendGroup({sendFunction: "main.store.sendWater", hazard:"water"}));
		login_page.showGroupStatus();
		
		this.showStar();
		main.updateCollection(main.store.packageCollection);
	},
};

jQuery.extend(water_page, super_page);

