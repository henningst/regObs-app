var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var water_page = {
		
	latitute: 0,
	
	longitude: 0,
	
	komm_nr: 0,
	
	omrade_id: 0,

	pos_obj: null,
	
	last_pos_obj: null,
		
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		position.taken = new Date();
		water_page.pos_obj = position;
		
		var source = new Proj4js.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
		var dest = new Proj4js.Proj('EPSG:32633');     //destination coordinates for Norway
		
		var p = new Proj4js.Point(position.coords.longitude, position.coords.latitude);  
		Proj4js.transform(source, dest, p);
		
		water_page.longitude = Math.round(p.x);
		water_page.latitute  = Math.round(p.y);

		jQuery('.position_header_position').html("UTM33 ( &plusmn;" +position.coords.accuracy +"m )");
		jQuery('.position_header_town').html("N:" +Math.round(p.y) +" &Oslash;:" +Math.round(p.x));
		
		GetObjectFromServer(new PositionDetails(water_page.latitute, water_page.longitude), water_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(water_page.latitute, water_page.longitude), water_page.onAreaInformationResult);
	},
	
	updateLocation : function() 
	{
		water_page.last_pos_obj = { 'lat' : water_page.latitute, 'long' : water_page.longitude };
	},

	onAreaInformationResult: function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			water_page.omrade_id = res.features[0].attributes.OMRAADEID +OMRAADE_ID_OFFSET;
			jQuery('.county_b').html(res.features[0].attributes.OMRAADENAVN);
		}		
	},

	// onError Callback receives a PositionError object
	//
	onError: function(error) {
		jQuery('position_header_town').html("no" +" , " +"geodata");
	},
	
	onKommuneResult : function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			jQuery(".county_a").html(res.features[0].attributes.KOMMNAVN);
			water_page.komm_nr = res.features[0].attributes.KOMM_NR;
		}
	},
	
	doMeasurement: function() {
		navigator.geolocation.getCurrentPosition(water_page.onSuccess, water_page.onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
	},
	
	add: function(id)
	{
		var i = parseInt($(id).innerHTML) +1;
		$(id).innerHTML = i;
	},
   
	afterSendRegistration: function() {
		$('water_faresign_count').innerHTML = 0;
		$('water_picture_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Vann";
		
		if(water_page.pos_obj != null) {
			if(((new Date()).getTime() - water_page.pos_obj.taken.getTime()) / 1000 / 60 < 1) {
				water_page.doMeasurement();
			}
		} else {
			water_page.doMeasurement();
		}
		
		var waterStore = main.store.getWater();

		$('water_faresign_count').innerHTML = waterStore.getObs().length
		$('water_picture_count').innerHTML = waterStore.getPictures().length
		
		if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == WATER) {

			jQuery("#star").attr('src', 'img/stared.png');
		} else {
			jQuery("#star").attr('src', 'img/notstared.png');
		}
	},
}

