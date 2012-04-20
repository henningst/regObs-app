var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var snow_page = {
		
	latitute: 0,
	
	longiude: 0,
		
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		snow_page.latitute = position.coords.latitude;
		snow_page.longitude = position.coords.longitude;
		
		$('position_header_position').innerHTML = Math.round(position.coords.latitude * NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA +" , " 
		+Math.round(position.coords.longitude* NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA;
	},

	// onError Callback receives a PositionError object
	//
	onError: function(error) {
		$('position_header_position').innerHTML = "no" +" , " +"geodata";
	},
	
	doMeasurement: function() {
		navigator.geolocation.getCurrentPosition(snow_page.onSuccess, snow_page.onError);
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Sn&oslash;";
		
		snow_page.doMeasurement();
		/*
		 * Do some querys to get more information about the point;
		 */
		$('position_header_town').innerHTML = "Sogndal";
		$('position_header_county').innerHTML = "Sognefjorane";
	},
}

