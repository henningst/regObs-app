var water_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(water_picture.pictureData != null) {
			var list = $('water_picture_spec_list');
			
			var picture = new Picture(null, null, water_picture.pictureData, null, null, null, WATER_GEO_HAZARD, $("water_picture_comment").value, parseInt(list[list.selectedIndex].value));
			main.store.getWater().addPicture(picture);
			water_picture.pictureData = null;

			water_page.add('water_picture_count');
			main.panels.slideBack();
		}
	},
	
	fillRegistrationKD: function(data) {
		var options = jQuery("#water_picture_spec_list");
		//remove if previously inserted
		jQuery.each(options, function() {jQuery(this).find('option').remove()});
		
		jQuery.each(data.results, function() {
			if(this.RegistrationTID >= 60 && this.RegistrationTID < 70 || this.RegistrationTID == 11 || this.RegistrationTID == 13 || this.RegistrationTID == 99)
				options.append(jQuery("<option />").val(this.RegistrationTID).text(this.RegistrationName));
		});
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