var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var snow_page = {
		
	latitute: 0,
	
	longitude: 0,
	
	komm_nr: 1420,
	
	omrade_id: 122,
	
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
		
		snow_page.longitude= Math.round(p.x);
		snow_page.latitute  = Math.round(p.y);
		
		$('position_header_position').innerHTML = Math.round(position.coords.latitude * NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA +" , " 
		+Math.round(position.coords.longitude* NUMBERS_AFTER_KOMMA)/NUMBERS_AFTER_KOMMA;

		GetObjectFromServer(new PositionDetails(snow_page.latitute, snow_page.longitude), snow_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(snow_page.latitute, snow_page.longitude), snow_page.onAreaInformationResult);
		
	},

	onAreaInformationResult: function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			snow_page.omrade_id = res.features[0].attributes.OMRAADEID +OMRAADE_ID_OFFSET;
		}		
	},
	
	// onError Callback receives a PositionError object
	//
	onError: function(error) {
		$('position_header_position').innerHTML = "no" +" , " +"geodata";
//		$('position_header_position').innerHTML = snow_page.latitute +" , " +snow_page.longitude;
//		GetObjectFromServer(new PositionDetails(snow_page.latitute, snow_page.longitude), snow_page.onKommuneResult);
	},
	
	onKommuneResult : function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			$("position_header_town").innerHTML = res.features[0].attributes.KOMMNAVN;
			$("position_header_county").innerHTML = res.features[0].attributes.FYLKENAVN;
			snow_page.komm_nr = res.features[0].attributes.KOMM_NR;
		}
	},
	
	doMeasurement: function() {
		navigator.geolocation.getCurrentPosition(snow_page.onSuccess, snow_page.onError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
	},
	
	add: function(id)
	{
		var i = parseInt($(id).innerHTML) +1;
		$(id).innerHTML = i;
	},
   
	afterSendRegistration: function() {
		$('snow_faresign_count').innerHTML = 0;
		$('snow_picture_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Sn&oslash;";
		
		
		//only update if its older than a minute
		if(snow_page.pos_obj != null) {
			if(((new Date()).getTime() - snow_page.pos_obj.taken.getTime()) / 1000 / 60 < 1) {
				snow_page.doMeasurement();
			}
		} else {
			snow_page.doMeasurement();
		}
		
		
		if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == SNOW) {

			jQuery("#star").attr('src', 'img/stared.png');
		} else {

			jQuery("#star").attr('src', 'img/notstared.png');
		}
	},
}

