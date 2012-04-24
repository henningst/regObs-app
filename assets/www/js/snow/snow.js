var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var snow_page = {
		
	latitute: 0,
	
	longitude: 0,
		
	// onSuccess Callback
	//   This method accepts a `Position` object, which contains
	//   the current GPS coordinates
	//
	onSuccess: function(position) {
		var source = new Proj4js.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
		var dest = new Proj4js.Proj('EPSG:32633');     //destination coordinates in LCC, south of France
		
		var p = new Proj4js.Point(position.coords.longitude, position.coords.latitude);   //any object will do as long as it has 'x' and 'y' properties
		Proj4js.transform(source, dest, p);      //do the transformation.  x and y are modified in place
		
		snow_page.longitude= Math.round(p.x);
		snow_page.latitute  = Math.round(p.y);
		
		$('position_header_position').innerHTML = Math.round(position.coords.latitude * NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA +" , " 
		+Math.round(position.coords.longitude* NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA;
		
		main.store.getObjectFromServer(new PositionDetails(snow_page.latitute, snow_page.longitude), snow_page.onKommuneResult);
	},

	// onError Callback receives a PositionError object
	//
	onError: function(error) {
		$('position_header_position').innerHTML = "no" +" , " +"geodata";
	},
	
	onKommuneResult : function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			$("position_header_town").innerHTML = res.features[0].attributes.KOMMNAVN;
			$("position_header_county").innerHTML = res.features[0].attributes.FYLKENAVN;
		}
	},
	
	doMeasurement: function() {
		navigator.geolocation.getCurrentPosition(snow_page.onSuccess, snow_page.onError);
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Sn&oslash;";
		
		snow_page.doMeasurement();
	},
}

