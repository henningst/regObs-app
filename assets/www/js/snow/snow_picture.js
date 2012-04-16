var snow_picture  = {
	
	onSuccess: function(imageData) {
		alert('workds');
		 // Uncomment to view the base64 encoded image data
	      // console.log(imageData);

	      // Get image handle
	      //
	      var smallImage = document.getElementById('picture');

	      // Unhide image elements
	      //
	      smallImage.style.display = 'block';

	      // Show the captured photo
	      // The inline CSS rules are used to resize the image
	      //
	      smallImage.src = "data:image/jpeg;base64," + imageData;
//	    var image = document.getElementById('myImage');
//	    image.src = "data:image/jpeg;base64," + imageData;
	},

	onFail :function(message) {
	    alert('Failed because: ' + message);
	},
	
	init : function () {	
		navigator.camera.getPicture(
				snow_picture.onSuccess, 
				snow_picture.onFail, 
				{ quality: 50, destinationType: navigator.camera.DestinationType.DATA_URL }
				); 		
	}
}