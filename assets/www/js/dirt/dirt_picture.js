var dirt_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(dirt_picture.pictureData != null) {
			var picture = new Picture(null, null, dirt_picture.pictureData, null, null, null, $("dirt_picture_comment").value);
			main.store.getDirt().addPicture(picture);
			dirt_picture.pictureData = null;

			dirt_page.add('dirt_picture_count');
			main.panels.slideBack();
		}
	},
	
	onSuccess: function(imageData) {
		dirt_picture.pictureData = imageData;

		var smallImage = document.getElementById('dirt_picture_img');
		smallImage.src = "data:image/jpeg;base64," +imageData;
	},

	onFail: function(message) {
//		alert("Lagre bilde feil");
	},
	
	afterSendRegistration: function() {
		$('dirt_picture_img').src = "";
		$("dirt_picture_comment").value = "";
	},
	
	init : function () {
		$('header_middle_text').innerHTML = "Bilde";
		
		navigator.camera.getPicture(
			dirt_picture.onSuccess, 
			dirt_picture.onFail, 
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