var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var ice_page = {
		
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
		
		ice_page.longitude= Math.round(p.x);
		ice_page.latitute  = Math.round(p.y);
		
		$('ice_position_header_position').innerHTML = Math.round(position.coords.latitude * NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA +" , " 
		+Math.round(position.coords.longitude* NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA;
		
		GetObjectFromServer(new PositionDetails(ice_page.latitute, ice_page.longitude), ice_page.onKommuneResult);
	},

	// onError Callback receives a PositionError object
	//
	onError: function(error) {
		$('ice_position_header_position').innerHTML = "no" +" , " +"geodata";
	},
	
	onKommuneResult : function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			$("ice_position_header_town").innerHTML = res.features[0].attributes.KOMMNAVN;
			$("ice_position_header_county").innerHTML = res.features[0].attributes.FYLKENAVN;
		}
	},
	
	doMeasurement: function() {
		navigator.geolocation.getCurrentPosition(ice_page.onSuccess, ice_page.onError);
	},
	
	add: function(id)
	{
		var i = parseInt($(id).innerHTML) +1;
		$(id).innerHTML = i;
	},
   
	afterSendRegistration: function() {
		$('ice_picture_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Is";
		
		ice_page.doMeasurement();
	},
}

