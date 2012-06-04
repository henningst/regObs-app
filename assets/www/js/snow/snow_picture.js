var snow_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(snow_picture.pictureData != null) {
			var list = $('snow_picture_spec_list');
			
			var picture = new Picture(null, null, snow_picture.pictureData, null, null, null, SNOW_GEO_HAZARD, $("snow_picture_comment").value, parseInt(list[list.selectedIndex].value));
			main.store.getSnow().addPicture(picture);
			snow_picture.pictureData = null; 
			
			snow_page.updateLocation();
			snow_page.add('snow_picture_count');
			main.panels.slideBack();
		}
	},

	fillRegistrationKD: function(data) {

		var options = jQuery("#snow_picture_spec_list");
		//remove if previously inserted
		jQuery.each(options, function() {jQuery(this).find('option').remove()});
		
		jQuery.each(data.results, function() {
			if((this.RegistrationTID >= 20 && this.RegistrationTID < 30 ) || this.RegistrationTID == 11 || this.RegistrationTID == 13 || this.RegistrationTID == 99 || this.RegistrationTID == 0)
				options.append(jQuery("<option />").val(this.RegistrationTID).text(this.RegistrationName));
		});
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
//				targetWidth: 1024,
//				targetHeight: 1024,
                correctOrientation: true
            }
		); 		
	}
}