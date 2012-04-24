var snow_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(snow_picture.pictureData != null) {
			var picture = new Picture(null, null, snow_picture.pictureData, null, null, null, $("snow_picture_comment").value);
			main.store.addPicture(picture);
			snow_picture.pictureData = null;

			snow_observation.add('snow_picture_count');
			main.panels.slideBack();
		}
	},
	
	onSuccess: function(imageData) {
		snow_picture.pictureData = imageData;

		var smallImage = document.getElementById('snow_picture_img');
		smallImage.src = "data:image/jpeg;base64," +imageData;
	},

	onFail: function(message) {
		alert("Lagre bilde feil");
	},
	
	init : function () {
		navigator.camera.getPicture(
			snow_picture.onSuccess, 
			snow_picture.onFail, 
			{ 
				quality: 50, 
				destinationType: navigator.camera.DestinationType.DATA_URL,
				allowEdit : true,
                correctOrientation: true
            }
		); 		
	}
}