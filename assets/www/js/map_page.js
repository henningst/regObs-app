var map_page = {
	map: null,
	init: function(){
		var mapOptions = {
				zoom: 8,
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
		
		map_obs_page.geo_hazard = SNOW_GEO_HAZARD;
		map_obs_page.init();
		map_obs_page.loadObservations(latlng);
		main.panels.slideTo('map_obs_page');
	},
	
	center : function(position){
		map_page.map.setCenter(new  google.maps.LatLng(position.coords.latitude, position.coords.longitude));
	}
};