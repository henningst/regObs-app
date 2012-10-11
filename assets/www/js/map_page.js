var map_page = {
	shouldShowFooter : false,
	map: null,
	geo_hazard : null,
	init: function(){
		
		var mapOptions = {
				zoom: 9,
				center: new google.maps.LatLng(60.1, 10.0),
				mapTypeId: google.maps.MapTypeId.ROADMAP
				};
		map_page.map = new google.maps.Map(document.getElementById('map'), mapOptions); 

		var _this = this;
		google.maps.event.addListener(map_page.map, 'click', function(e) {
			_this.showObsNearby(e.latLng);
		}); 
		
		geo.requestPosition("map_page.center", false);
	},
	
	showObsNearby : function(latlng){
		console.log("latlng " + JSON.stringify(latlng) );
		
		map_obs_page.geo_hazard = this.geo_hazard;
		map_obs_page.init();
		map_obs_page.loadObservations(latlng);
		main.panels.slideTo('map_obs_page');
	},
	
	center : function(position){
		map_page.map.setCenter(new  google.maps.LatLng(position.coords.latitude, position.coords.longitude));
	},
	
	slide : function(){
		this.init();
		main.panels.slideTo("map_page");
	},
	
	snowMap : function(){
		this.geo_hazard = SNOW_GEO_HAZARD;
		this.slide();
	},
	
	iceMap: function(){
		this.geo_hazard = ICE_GEO_HAZARD;
		this.slide();
	},
	
	dirtMap: function(){
		this.geo_hazard = DIRT_GEO_HAZARD;
		this.slide();
	},
	
	waterMap: function(){
		this.geo_hazard = WATER_GEO_HAZARD;
		this.slide();
	}
	
};