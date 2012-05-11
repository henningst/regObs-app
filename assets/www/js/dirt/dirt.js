var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var dirt_page = {
		
	latitute: 0,
	
	longitude: 0,
	
	komm_nr: 0,
	
	omrade_id: 0,
	
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
		
		dirt_page.longitude= Math.round(p.x);
		dirt_page.latitute  = Math.round(p.y);
		
		$('dirt_position_header_position').innerHTML = Math.round(position.coords.latitude * NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA +" , " 
		+Math.round(position.coords.longitude* NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA;
		
		GetObjectFromServer(new PositionDetails(dirt_page.latitute, dirt_page.longitude), dirt_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(dirt_page.latitute, dirt_page.longitude), dirt_page.onAreaInformationResult);
	},

	onAreaInformationResult: function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			dirt_page.omrade_id = res.features[0].attributes.OMRAADEID;
		}		
	},

	// onError Callback receives a PositionError object
	//
	onError: function(error) {
		$('dirt_position_header_position').innerHTML = "no" +" , " +"geodata";
	},
	
	onKommuneResult : function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			$("dirt_position_header_town").innerHTML = res.features[0].attributes.KOMMNAVN;
			$("dirt_position_header_county").innerHTML = res.features[0].attributes.FYLKENAVN;
			dirt_page.komm_nr = KOMM_NR
		}
	},
	
	doMeasurement: function() {
		navigator.geolocation.getCurrentPosition(dirt_page.onSuccess, dirt_page.onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
	},
	
	add: function(id)
	{
		var i = parseInt($(id).innerHTML) +1;
		$(id).innerHTML = i;
	},
   
	afterSendRegistration: function() {
		$('dirt_picture_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "L&oslash;smasse";
		
		if(dirt_page.pos_obj != null) {
			if(((new Date()).getTime() - pos.taken.getTime()) / 1000 / 60 < 1) {
				dirt_page.doMeasurement();
			}
		} else {
			dirt_page.doMeasurement();
		}
		
		if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == DIRT) {

			jQuery("#star").attr('src', 'img/stared.png');
		} else {

			jQuery("#star").attr('src', 'img/notstared.png');
		}
	},
}

