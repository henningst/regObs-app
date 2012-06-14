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
			
			var page = this;
			var store = this.danger_store();
			GetObjectFromServer(new AreaInformation(this.latitute, this.longitude), function(response) { page.onSaveAreaInfo(response, store);});
			GetObjectFromServer(new PositionDetails(this.latitute, this.longitude), function(response) { page.onSaveKommuneInfo(response, store);});
		},
		
		onSaveKommuneInfo: function(result, store){
			if(store == undefined) store = this.danger_store();
			
			console.log("test " + result + " " + store);
			var kommune = omerade.parseKommune(result);
			store.setKommunenr(kommune.kommunenummer);
		},
		
		onSaveAreaInfo : function(result, store){
			if(store == undefined) store = this.danger_store();
			
			console.log("test " + result + " " + store);
			var area = omerade.parseArea(result);
			store.setArea(area.omeradeid);
		},
		
		updateLocation : function(callback) 
		{
			main.showWaitingDialogWithMessage("Venter p&aring; posisjon");
			this.updateLocCallback = callback;
			geo.requestPosition(this.name + ".savePosition", true);
		},
		
		performSavePosition : function(position){
			this.setStoredLocation(position);
			main.hideDialog();
			this.updateLocCallback();
		},
		
		displayPosition: function(position){
			jQuery('.position_header_position').html("UTM33 ( &plusmn;" + position.coords.accuracy +"m )");
			jQuery('.position_header_town').html("N:"+ this.latitute +" &Oslash;:" + this.longitude);
		},
		
		onAreaInformationResult: function(data) {
			var area = omerade.parseArea(data);
			if(area.oppdatert){
				this.omrade_id = area.omeradeid;
				jQuery('.county_b').html(area.omeradenavn);
			}
		},
		
		onKommuneResult : function(data) {
			var kommune = omerade.parseKommune(data);
			if(kommune.oppdatert) {
				jQuery(".county_a").html(kommune.kommunenavn);
				this.komm_nr = kommune.kommunenummer;
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
		
		
		
		
		showStar : function(){
			if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == SNOW) {
	
				jQuery("#star").attr('src', 'img/stared.png');
			} else {
	
				jQuery("#star").attr('src', 'img/notstared.png');
			}
		}
};


var super_picture = {
		make: function()
		{
			main.showWaitingDialogWithMessage(PROCESS_PICTURE);	
			
			if(device.platform != 'Android') {
				navigator.camera.getPicture(
					this.onSuccess, 
					this.onFail, 
					{ 
						quality : 50, 
						destinationType : Camera.DestinationType.DATA_URL, 
						sourceType : Camera.PictureSourceType.CAMERA, 
						encodingType: Camera.EncodingType.JPEG,
		                correctOrientation: true
		            }
				);
			} 
			else
			{			
				navigator.camera.getPicture(
					this.onSuccess,
					this.onFail,
					{
						quality : 50,
						destinationType : Camera.DestinationType.DATA_URL,
						sourceType : Camera.PictureSourceType.CAMERA,
						allowEdit : true,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 1024,
						targetHeight: 1024,
		                correctOrientation: true
		            }
				); 
			}	
		}
}