var water_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(water_picture.pictureData != null) {
			var picture = new Picture(null, null, water_picture.pictureData, null, null, null, $("water_picture_comment").value);
			main.store.getWater().addPicture(picture);
			water_picture.pictureData = null;

			water_page.add('water_picture_count');
			main.panels.slideBack();
		}
	},
	
	onSuccess: function(imageData) {
		water_picture.pictureData = imageData;

		var smallImage = document.getElementById('water_picture_img');
		smallImage.src = "data:image/jpeg;base64," +imageData;

		main.hideDialog();
	},

	onFail: function(message) {
//		alert("Lagre bilde feil");
		main.hideDialog();
	},
	
	afterSendRegistration: function() {
		$('water_picture_img').src = "";
		$("water_picture_comment").value = "";
	},
	
	init : function () {
		$('header_middle_text').innerHTML = "Bilde";

		main.showWaitingDialogWithMessage(PROCESS_PICTURE);
		
		navigator.camera.getPicture(
			water_picture.onSuccess, 
			water_picture.onFail, 
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