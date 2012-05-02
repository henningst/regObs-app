var ice_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(ice_picture.pictureData != null) {
			var picture = new Picture(null, null, ice_picture.pictureData, null, null, null, $("ice_picture_comment").value);
			main.store.getIce().addPicture(picture);
			ice_picture.pictureData = null;

			ice_page.add('ice_picture_count');
			main.panels.slideBack();
		}
	},
	
	onSuccess: function(imageData) {
		ice_picture.pictureData = imageData;

		var smallImage = document.getElementById('ice_picture_img');
		smallImage.src = "data:image/jpeg;base64," +imageData;
	},

	onFail: function(message) {
//		alert("Lagre bilde feil");
	},
	
	afterSendRegistration: function() {
		$('ice_picture_img').src = "";
		$("ice_picture_comment").value = "";
	},
	
	init : function () {
		$('header_middle_text').innerHTML = "Bilde";
		
		navigator.camera.getPicture(
			ice_picture.onSuccess, 
			ice_picture.onFail, 
			{ 
				quality: 50, 
				destinationType: navigator.camera.DestinationType.DATA_URL,
				allowEdit : true,
                correctOrientation: true
            }
		); 		
	}
}