var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var super_page = {
		updatePagePosition: function(position){
			this.pos_obj = position;
			
			var source = new Proj4js.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
			var dest = new Proj4js.Proj('EPSG:32633');     //destination coordinates for Norway
			
			var p = new Proj4js.Point(position.coords.longitude, position.coords.latitude);  
			Proj4js.transform(source, dest, p);
			
			this.longitude= Math.round(p.x);
			this.latitute  = Math.round(p.y);
		},
		add: function(id)
		{
			var i = parseInt($(id).innerHTML) +1;
			$(id).innerHTML = i;
		},
		
		setStoredLocation : function(position){
			this.updatePagePosition(position);
			this.danger_store().setLatLong(this.latitute, this.longitude);
		},
		
		onAreaInformationResult: function(data) {
			var res = JSON.parse(data);

			if(res != null) {
				this.omrade_id = res.features[0].attributes.OMRAADEID +OMRAADE_ID_OFFSET;
				jQuery('.county_b').html(res.features[0].attributes.OMRAADENAVN);
			}		
		},
		
		// onError Callback receives a PositionError object
		//
		onError: function(error) {
			jQuery('.position_header_town').html("no" +" , " +"geodata");

			this.longitude = 0;
			this.latitute  = 0;
			this.komm_nr = 0;
			this.omrade_id = 0;
		},
		
		onKommuneResult : function(data) {
			var res = JSON.parse(data);

			
			if(res != null) {
				jQuery(".county_a").html(res.features[0].attributes.KOMMNAVN);
				this.komm_nr = res.features[0].attributes.KOMM_NR;
			}
		},
		
		
		showStar : function(){
			if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == SNOW) {
	
				jQuery("#star").attr('src', 'img/stared.png');
			} else {
	
				jQuery("#star").attr('src', 'img/notstared.png');
			}
		}
};

var snow_page = {
		
	latitute: 0,
	
	longitude: 0,
	
	komm_nr: 0,
	
	omrade_id: 0,
	
	pos_obj: null,
	
	danger_store : function(){ return main.store.getSnow(); },
		
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
	
	updateLocation : function() 
	{
		console.log("updateing position");
		geo.requestPosition('snow_page.setStoredLocation');
	},
	
	doMeasurement: function() {
		geo.last_page_location = 'snow_page.onSuccess';
		geo.requestPosition('snow_page.onSuccess');
	},
   
	afterSendRegistration: function() {
		$('snow_faresign_count').innerHTML = 0;
		$('snow_picture_count').innerHTML = 0;
	},
	
	init: function() {
		$('header_middle_text').innerHTML = "Sn&oslash;";
		
		snow_page.doMeasurement();

		var snowStore = main.store.getSnow();

		$('snow_faresign_count').innerHTML = snowStore.getObs().length;
		$('snow_picture_count').innerHTML = snowStore.getPictures().length;
		
		this.showStar();
	}
};

jQuery.extend(snow_page, super_page);
