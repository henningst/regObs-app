var snow_hendelse = {
		
		init: function() {
			var login = new Login("aslak@nlink.no", "aslak2aslak");
				
			var location = new Location(null, 33, 103222, 6982346);
			var store = new NveStore(login);
	
			store.isLoggedIn();
			var result = store.addObsLocation(location, snow_hendelse.callback);
	
			console.log(result);
		},

		callback : function(result) {
			alert("Vi har send in Location!: \n" +result.UTMEast +"\n" +result.UTMNorth);
		}
}