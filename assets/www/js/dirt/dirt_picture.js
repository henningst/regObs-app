var dirt_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(dirt_picture.pictureData != null) {
			var list = $('dirt_picture_spec_list');
			var picture = new Picture(null, null, dirt_picture.pictureData, null, null, null, DIRT_GEO_HAZARD, $("dirt_picture_comment").value, parseInt(list[list.selectedIndex].value));
			main.store.getDirt().addPicture(picture);
			dirt_picture.pictureData = null;

			dirt_page.updateLocation();
			dirt_page.add('dirt_picture_count');
			main.panels.slideBack();
		}
	},
	
	fillRegistrationKD: function(data) {
		var options = jQuery("#dirt_picture_spec_list");
		//remove if previously inserted
		jQuery.each(options, function() {jQuery(this).find('option').remove()});
		
		jQuery.each(data.results, function() {
			if(this.RegistrationTID >= 70 && this.RegistrationTID < 80 || this.RegistrationTID == 11 || this.RegistrationTID == 13 || this.RegistrationTID == 99 || this.RegistrationTID == 0)
				options.append(jQuery("<option />").val(this.RegistrationTID).text(this.RegistrationName));
		});
	},
	
	onSuccess: function(imageData) {
		dirt_picture.pictureData = imageData;

		var smallImage = document.getElementById('dirt_picture_img');
		smallImage.src = "data:image/jpeg;base64," +imageData;
		main.hideDialog();
	},

	onFail: function(message) {
//		alert("Lagre bilde feil");
		main.hideDialog();
	},
	
	afterSendRegistration: function() {
		$('dirt_picture_img').src = "";
		$("dirt_picture_comment").value = "";
	},
	
	make: function()
	{
		main.showWaitingDialogWithMessage(PROCESS_PICTURE);
		
		navigator.camera.getPicture(
			dirt_picture.onSuccess, 
			dirt_picture.onFail, 
			{ 
				quality : 50, 
				destinationType : Camera.DestinationType.DATA_URL, 
				sourceType : Camera.PictureSourceType.CAMERA, 
				allowEdit : true,
				encodingType: Camera.EncodingType.JPEG,
                correctOrientation: true
            }
		); 		
	},
	
	init : function () {
		$('header_middle_text').innerHTML = "Bilde";
	}
}