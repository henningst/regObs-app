var snow_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(snow_picture.pictureData != null) {
			var picture = new Picture(null, null, snow_picture.pictureData, null, null, null, "asd");
			main.store.addPicture(picture);
			snow_picture.pictureData = null;

			snow_observation.add('snow_picture');
			main.panels.slideBack();
		}
	},
		
	onSuccess: function(imageData) {
		 // Uncomment to view the base64 encoded image data
	       snow_picture.pictureData = imageData;

	      // Get image handle
	      //
	      var smallImage = document.getElementById('picture');

	      // Unhide image elements
	      //
	      smallImage.style.display = 'block';

	      // Show the captured photo
	      // The inline CSS rules are used to resize the image
	      smallImage.src = "data:image/jpeg;base64," + imageData;
	},

	onFail :function(message) {
//	    alert('Failed because: ' + message);
	},
	
	init : function () {	
		navigator.camera.getPicture(
				snow_picture.onSuccess, 
				snow_picture.onFail, 
				{ quality: 25, destinationType: navigator.camera.DestinationType.DATA_URL }
				); 		
	}
}