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
			this.accuracy = position.coords.accuracy;
		},
		add: function(id)
		{
			var i = parseInt($(id).innerHTML) +1;
			$(id).innerHTML = i;
		},
		
		check: function(id){
			jQuery("#" + id).addClass("checked").text("");
		},
		
		setStoredLocation : function(position){
			console.log("setting lat long " + this);
			this.updatePagePosition(position);
			this.danger_store().setLatLong(this.latitute, this.longitude, this.accuracy);
			
			var page = this;
			var store = this.danger_store();
			GetObjectFromServer(new AreaInformation(this.latitute, this.longitude), function(response) { page.onSaveAreaInfo(response, store);});
			GetObjectFromServer(new PositionDetails(this.latitute, this.longitude), function(response) { page.onSaveKommuneInfo(response, store);});
			GetObjectFromServer(new RegineDetails(this.latitute, this.longitude), function(response) { page.onSaveRegineInfo(response, store);});
			
		},
		
		onSaveRegineInfo : function(result, store){
			if(store == undefined) store = this.danger_store();
			
			var regine = omerade.parseRegine(result);
			store.setRegine(regine.reginenummer);
		},
		
		onSaveKommuneInfo: function(result, store){
			if(store == undefined) store = this.danger_store();
			
			var kommune = omerade.parseKommune(result);
			store.setKommunenr(kommune.kommunenummer);
			store.setFylkenr(kommune.fylkenummer);
			
		},
		
		onSaveAreaInfo : function(result, store){
			if(store == undefined) store = this.danger_store();
			
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
			jQuery('.position_header_position').html("UTM33 (Feilmargin: &plusmn;" + Math.round(position.coords.accuracy) +"m)");
			jQuery('.position_header_town').html("N:"+ this.latitute +" &Oslash;:" + this.longitude);
		},
		
		onAreaInformationResult: function(data) {
			console.log("pp: onarea start")
			var area = omerade.parseArea(data);
			if(area.oppdatert){
				this.omrade_id = area.omeradeid;
				jQuery('.county_b').html(area.omeradenavn);
			}else{
				this.omrade_id = null;
				jQuery('.county_b').html("");
			}
			console.log("pp: onarea end")
		},
		
		onKommuneResult : function(data) {
			console.log("pp: onkommune start")
			var kommune = omerade.parseKommune(data);
			if(kommune.oppdatert) {
				jQuery(".county_a").html(kommune.kommunenavn);
				this.komm_nr = kommune.kommunenummer;
			}else{
				jQuery(".county_a").html("");
				this.komm_nr = null;
			}
			console.log("pp: onkommune end")
		},
		
		// onError Callback receives a PositionError object
		//
		onError: function(error) {
			this.longitude = 0;
			this.latitute  = 0;
			this.komm_nr = 0;
			this.omrade_id = 0;
			jQuery(".county_a").html("");
			jQuery('.county_b').html("");
		},
		
		showStar : function(){
			if(DataAccess.get(STARTUP_PAGE) != undefined && parseInt(DataAccess.get(STARTUP_PAGE)) == this.favorite_name) {	
				jQuery("#star").attr('src', 'img/stared.png');
			} else {
	
				jQuery("#star").attr('src', 'img/notstared.png');
			}
		},
		
		resetCounter: function(id){
			jQuery("#" + id ).removeClass("checked")
			this.setCounter(id, "0");
		},
		
		setCounter: function(id, number){
			$(id).innerHTML = number;
		}
};


var super_picture = {
		make: function(pictureSource)
		{
			main.showWaitingDialogWithMessage(PROCESS_PICTURE);	

			console.log("pp: platform picture " + device.platform)
			if(device.platform != 'iphone') {
				if(pictureSource == "cam")
				{
					navigator.camera.getPicture(
						this.onSuccess, 
						this.onFail, 
						{ 
							quality : 50, 
							targetWidth: 1024,
							targetHeight: 1024
			            }
					);
				}else{
					navigator.gallery.getPicture(
							this.onSuccess, 
							this.onFail, 
							{ 
								quality : 50, 
								targetWidth: 1024,
								targetHeight: 1024
				            }
						)
				}
			} 
			else
			{			
				console.log("pp: pic types " + JSON.stringify(Camera.PictureSourceType))
				if(pictureSource == "cam"){
					pictureSource = Camera.PictureSourceType.CAMERA;
				} else {
					pictureSource = Camera.PictureSourceType.PHOTOLIBRARY;
				}
						
				var _this = this; 
				navigator.camera.getPicture(
					function(imageData){
						if(pictureSource == Camera.PictureSourceType.CAMERA)
							window.plugins.SaveImage.saveImage(imageData);
						
						_this.onSuccess(imageData);
					},
					this.onFail,
					{
						quality : 50,
						destinationType : Camera.DestinationType.FILE_URI,
						sourceType : pictureSource,
						allowEdit : false,
						encodingType: Camera.EncodingType.JPEG,
						targetWidth: 1024,
						targetHeight: 1024,
		                correctOrientation: true
		            }
				); 
			}	
			
			this.updatePictureButtons(this.picturePage);
		},
		
		updatePictureButtons : function(domId){
			var image = jQuery(domId).find(".container-image");
			var noImage = jQuery(domId).find(".no-image");
			
			var src = jQuery(image).attr("src");
			if(src && src.length > 0){
				noImage.hide();
				jQuery(".button-image").show();
			}else
			{
				noImage.show();
				jQuery(".button-image").hide();
			}
		},
		
		setMakePictureHandlers: function(callback){
			jQuery(this.picturePage + " .make").click(function(){
				var div = jQuery("<h3>Hvor skal bildet hentes fra?</h3>" +
	            "<div>"+
	            "<button type='button' " +
	              "class='w_bg_light c_button w_button w_radius popupbutton-dual camera' >Kamera" +  
	            "</button>" +
	            "<button type='button' " +
	              "class='w_bg_light c_button w_button w_radius popupbutton-dual gallery' >Galleri" + 
	            "</button>" +
	          "</div>");
				
				
				div.find(".camera").click(function(){callback("cam")})
				div.find(".gallery").click(function(){callback("lib");})
				main.showDialog(div);
			});
		}
		
		
};

var super_obs = {
		abort: function(){
			if(this.afterSendRegistration){
				this.afterSendRegistration();
			}
			
			main.panels.slideBack();
		}
};

var super_observations = {
	setPosAndUpdateObservations: function(position){
		this.updatePagePosition(position);
		var pos = {"east": this.longitude, "north": this.latitute};
		this.urlGenerator.setPos(pos);
		this.fetcher = new ObservationFetcher(this.urlGenerator);
		var _this = this;
		this.fetcher.getObservations(
			function(listOfViews){
				_this.renderer.setListOfView(listOfViews);
				_this.renderer.render();
			}
		);
	}
};
jQuery.extend(super_observations, super_page);
