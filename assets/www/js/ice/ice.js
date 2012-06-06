var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var ice_page = {
		
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
		ice_page.pos_obj = position;
		
		var source = new Proj4js.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
		var dest = new Proj4js.Proj('EPSG:32633');     //destination coordinates for Norway
		
		var p = new Proj4js.Point(position.coords.longitude, position.coords.latitude);  
		Proj4js.transform(source, dest, p);
		
		ice_page.longitude= Math.round(p.x);
		ice_page.latitute  = Math.round(p.y);

		jQuery('.position_header_position').html("UTM33 ( &plusmn;" +position.coords.accuracy +"m )");
		jQuery('.position_header_town').html("N:" +Math.round(p.y) +" &Oslash;:" +Math.round(p.x));
		
		GetObjectFromServer(new PositionDetails(ice_page.latitute, ice_page.longitude), ice_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(ice_page.latitute, ice_page.longitude), ice_page.onAreaInformationResult);
	},
	
	updateLocation : function() 
	{
		main.store.getIce().setLatLong(ice_page.latitute, ice_page.longitude);
	},

	onAreaInformationResult: function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			ice_page.omrade_id = res.features[0].attributes.OMRAADEID +OMRAADE_ID_OFFSET;
			jQuery('.county_b').html(res.features[0].attributes.OMRAADENAVN);
		}		
	},

	// onError Callback receives a PositionError object
	//
	onError: function(error) {
		jQuery('.position_header_town').html("no" +" , " +"geodata");
	},
	
	onKommuneResult : function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			jQuery(".county_a").html(res.features[0].attributes.KOMMNAVN);
			ice_page.komm_nr = res.features[0].attributes.KOMM_NR;
		}
	},
	
	doMeasurement: function() {
		geo.requestPosition('ice_page.onSuccess');
	},
	
	add: function(id)
	{
		var i = parseInt($(id).innerHTML) +1;
		$(id).innerHTML = i;
	},
   
	afterSendRegistration: function() {
		$('ice_picture_count').innerHTML = 0;
		$('ice_faresign_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Is";
		
		if(ice_page.pos_obj != null) {
			if(((new Date()).getTime() - ice_page.pos_obj.taken.getTime()) / 1000 / 60 < 1) {
				ice_page.doMeasurement();
			}
		} else {
			ice_page.doMeasurement();
		}
		
		var iceStore = main.store.getIce();

		$('ice_faresign_count').innerHTML = iceStore.getObs().length
		$('ice_picture_count').innerHTML = iceStore.getPictures().length
		
		if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == ICE) {

			jQuery("#star").attr('src', 'img/stared.png');
		} else {
			jQuery("#star").attr('src', 'img/notstared.png');
		}
	},
}

