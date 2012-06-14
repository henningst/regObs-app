var NUMBERS_AFTER_KOMMA = 1000000; //6 numbers precision

var super_page = {
		
		latitute: 0,
		
		longitude: 0,
		
		komm_nr: 0,
		
		omrade_id: 0,
		
		pos_obj: null,
		
		danger_store : null,

		updatePagePosition: function(position){
			this.pos_obj = position;
			
			var source = new Proj4js.Proj('EPSG:4326');    //source coordinates will be in Longitude/Latitude
			var dest = new Proj4js.Proj('EPSG:32633');     //destination coordinates for Norway
			
			var p = new Proj4js.Point(position.coords.longitude, position.coords.latitude);  
			Proj4js.transform(source, dest, p);
			
			this.longitude = Math.round(p.x);
			this.latitute  = Math.round(p.y);
		},
		add: function(id)
		{
			var i = parseInt($(id).innerHTML) +1;
			$(id).innerHTML = i;
		},
		
		setStoredLocation : function(position){
			console.log("setting lat long " + this);
			this.updatePagePosition(position);
			this.danger_store().setLatLong(this.latitute, this.longitude);
		},
		
		updateLocation : function(callback) 
		{
			main.showWaitingDialogWithMessage("Venter p&aring; posisjon");
			this.updateLocCallback = callback;
			geo.requestPosition(name + ".savePostition", true);
		},
		
		displayPosition: function(position){
			jQuery('.position_header_position').html("UTM33 ( &plusmn;" + position.coords.accuracy +"m )");
			jQuery('.position_header_town').html("N:"+ this.latitute +" &Oslash;:" + this.longitude);
		},
		
		onAreaInformationResult: function(data) {
			var res = JSON.parse(data);

			if(res != null && res.features != undefined) {
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

			
			if(res != null && res.features != undefined) {
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