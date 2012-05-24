var snow_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(snow_picture.pictureData != null) {
			var picture = new Picture(null, null, snow_picture.pictureData, null, null, null, SNOW_GEO_HAZARD, $("snow_picture_comment").value);
			main.store.getSnow().addPicture(picture);
			snow_picture.pictureData = null;

			snow_page.add('snow_picture_count');
			main.panels.slideBack();
		}
	},
	
	onSuccess: function(imageData) {
		snow_picture.pictureData = imageData;

		var smallImage = document.getElementById('snow_picture_img');
		smallImage.src = "data:image/jpeg;base64," +imageData;
		main.hideDialog();
	},

	onFail: function(message) {
//		alert("Lagre bilde feil");
		main.hideDialog();
	},
	
	afterSendRegistration: function() {
		$('snow_picture_img').src = "";
		$("snow_picture_comment").value = "";
	},
	
	init : function () {
		$('header_middle_text').innerHTML = "Bilde";

		main.showWaitingDialogWithMessage(PROCESS_PICTURE);
		
		navigator.camera.getPicture(
			snow_picture.onSuccess, 
			snow_picture.onFail, 
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