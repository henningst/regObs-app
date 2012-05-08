var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var water_page = {
		
	latitute: 0,
	
	longitude: 0,

	pos_obj: null,
		
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		position.taken = new Date();
		snow_page.pos_obj = position;
		
		var source = new Proj4js.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
		var dest = new Proj4js.Proj('EPSG:32633');     //destination coordinates for Norway
		
		var p = new Proj4js.Point(position.coords.longitude, position.coords.latitude);  
		Proj4js.transform(source, dest, p);
		
		water_page.longitude= Math.round(p.x);
		water_page.latitute  = Math.round(p.y);
		
		$('water_position_header_position').innerHTML = Math.round(position.coords.latitude * NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA +" , " 
		+Math.round(position.coords.longitude* NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA;
		
		main.store.getObjectFromServer(new PositionDetails(water_page.latitute, water_page.longitude), water_page.onKommuneResult);
	},

	// onError Callback receives a PositionError object
	//
	onError: function(error) {
		$('water_position_header_position').innerHTML = "no" +" , " +"geodata";
	},
	
	onKommuneResult : function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			$("water_position_header_town").innerHTML = res.features[0].attributes.KOMMNAVN;
			$("water_position_header_county").innerHTML = res.features[0].attributes.FYLKENAVN;
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
		$('water_picture_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Vann";
		
		water_page.doMeasurement();
		
		if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == WATER) {

			jQuery("#star").attr('src', 'img/stared.png');
		} else {

			jQuery("#star").attr('src', 'img/notstared.png');
		}
	},
}

