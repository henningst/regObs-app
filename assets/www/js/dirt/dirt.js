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
		dirt_page.pos_obj = position;
		
		var source = new Proj4js.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
		var dest = new Proj4js.Proj('EPSG:32633');     //destination coordinates for Norway
		
		var p = new Proj4js.Point(position.coords.longitude, position.coords.latitude);  
		Proj4js.transform(source, dest, p);
		
		dirt_page.longitude= Math.round(p.x);
		dirt_page.latitute  = Math.round(p.y);

		jQuery('.position_header_position').html("UTM33 ( &plusmn;" +position.coords.accuracy +"m )");
		jQuery('.position_header_town').html("N: " +Math.round(p.y) +" &Oslash;: " +Math.round(p.x));
		
		GetObjectFromServer(new PositionDetails(dirt_page.latitute, dirt_page.longitude), dirt_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(dirt_page.latitute, dirt_page.longitude), dirt_page.onAreaInformationResult);
	},
	
	updateLocation : function() 
	{
		main.store.getDirt().setLatLong(dirt_page.latitute, dirt_page.longitude);
//		dirt_page.last_pos_obj = { 'lat' : dirt_page.latitute, 'long' : dirt_page.longitude };
	},

	onAreaInformationResult: function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			dirt_page.omrade_id = res.features[0].attributes.OMRAADEID +OMRAADE_ID_OFFSET
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
			dirt_page.komm_nr = res.features[0].attributes.KOMM_NR
		}
	},
	
	doMeasurement: function() {
		geo.requestPosition('dirt_page.onSuccess');
	},
	
	add: function(id)
	{
		var i = parseInt($(id).innerHTML) +1;
		$(id).innerHTML = i;
	},
   
	afterSendRegistration: function() {
		$('dirt_faresign_count').innerHTML = 0;
		$('dirt_picture_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "L&oslash;smasse";
		
		if(dirt_page.pos_obj != null) {
			if(((new Date()).getTime() - dirt_page.pos_obj.taken.getTime()) / 1000 / 60 < 1) {
				dirt_page.doMeasurement();
			}
		} else {
			dirt_page.doMeasurement();
		}

		var dirtStore = main.store.getDirt();

		$('dirt_faresign_count').innerHTML = dirtStore.getObs().length
		$('dirt_picture_count').innerHTML = dirtStore.getPictures().length
		
		if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == DIRT) {

			jQuery("#star").attr('src', 'img/stared.png');
		} else {

			jQuery("#star").attr('src', 'img/notstared.png');
		}
	},
}

