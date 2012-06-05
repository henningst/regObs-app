var ice_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(ice_picture.pictureData != null) {
			var list = $('ice_picture_spec_list');
			
			var picture = new Picture(null, null, ice_picture.pictureData, null, null, null, ICE_GEO_HAZARD, $("ice_picture_comment").value, parseInt(list[list.selectedIndex].value));
			main.store.getIce().addPicture(picture);
			
			ice_picture.pictureData = null;
			$("ice_picture_img").src ="";
			
			ice_page.updateLocation();
			ice_page.add('ice_picture_count');
			main.panels.slideBack();
		}
	},
	
	fillRegistrationKD: function(data) {
		var options = jQuery("#ice_picture_spec_list");
		//remove if previously inserted
		jQuery.each(options, function() {jQuery(this).find('option').remove()});
		
		jQuery.each(data.results, function() {
			if(this.RegistrationTID >= 50 && this.RegistrationTID < 60 || this.RegistrationTID == 11 || this.RegistrationTID == 13 || this.RegistrationTID == 99 || this.RegistrationTID == 0)
				options.append(jQuery("<option />").val(this.RegistrationTID).text(this.RegistrationName));
		});
	},
	
	onSuccess: function(imageData) {
		ice_picture.pictureData = imageData;

		var smallImage = document.getElementById('ice_picture_img');
		smallImage.src = "data:image/jpeg;base64," +imageData;
		main.hideDialog();
	},

	onFail: function(message) {
//		alert("Lagre bilde feil");
		main.hideDialog();
	},
	
	afterSendRegistration: function() {
		$('ice_picture_img').src = "";
		$("ice_picture_comment").value = "";
	},
	
	make: function()
	{
		main.showWaitingDialogWithMessage(PROCESS_PICTURE);
		
		navigator.camera.getPicture(
			ice_picture.onSuccess, 
			ice_picture.onFail, 
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