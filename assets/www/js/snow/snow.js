var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var snow_page = {
		
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
		snow_page.updatePagePosition(position);

		jQuery('.position_header_position').html("UTM33 ( &plusmn;" + position.coords.accuracy +"m )" + new Date().getTime());
		jQuery('.position_header_town').html("N: " +snow_page.latitute +" &Oslash;: " +snow_page.longitude);

		GetObjectFromServer(new PositionDetails(snow_page.latitute, snow_page.longitude), snow_page.onKommuneResult);
		GetObjectFromServer(new AreaInformation(snow_page.latitute, snow_page.longitude), snow_page.onAreaInformationResult);
		
	},
	
	updatePagePosition: function(position){
		snow_page.pos_obj = position;
		
		var source = new Proj4js.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
		var dest = new Proj4js.Proj('EPSG:32633');     //destination coordinates for Norway
		
		var p = new Proj4js.Point(position.coords.longitude, position.coords.latitude);  
		Proj4js.transform(source, dest, p);
		
		snow_page.longitude= Math.round(p.x);
		snow_page.latitute  = Math.round(p.y);
	},
	
	setStoredLocation : function(position){
		snow_page.updatePagePosition(position);
		main.store.getSnow().setLatLong(snow_page.latitute, snow_page.longitude);
	},
	
	updateLocation : function() 
	{
		console.log("updateing position");
		geo.requestPosition('snow_page.setStoredLocation');
	},
	
	onAreaInformationResult: function(data) {
		var res = JSON.parse(data);

		if(res != null) {
			snow_page.omrade_id = res.features[0].attributes.OMRAADEID +OMRAADE_ID_OFFSET;
			jQuery('.county_b').html(res.features[0].attributes.OMRAADENAVN);
		}		
	},
	
	// onError Callback receives a PositionError object
	//
	onError: function(error) {
		jQuery('.position_header_town').html("no" +" , " +"geodata");

		snow_page.longitude = 0;
		snow_page.latitute  = 0;
		snow_page.komm_nr = 0;
		snow_page.omrade_id = 0;
	},
	
	onKommuneResult : function(data) {
		var res = JSON.parse(data);

		
		if(res != null) {
			jQuery(".county_a").html(res.features[0].attributes.KOMMNAVN);
			snow_page.komm_nr = res.features[0].attributes.KOMM_NR;
		}
	},
	
	
	doMeasurement: function() {
		geo.last_page_location = 'snow_page.onSuccess';
		geo.requestPosition('snow_page.onSuccess');
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
		
		snow_page.doMeasurement();

		var snowStore = main.store.getSnow();

		$('snow_faresign_count').innerHTML = snowStore.getObs().length
		$('snow_picture_count').innerHTML = snowStore.getPictures().length
		
		if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == SNOW) {

			jQuery("#star").attr('src', 'img/stared.png');
		} else {

			jQuery("#star").attr('src', 'img/notstared.png');
		}
	},
}
