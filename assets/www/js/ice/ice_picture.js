var ice_picture  = {
	shouldShowFooter : false,	
	pictureData: null,
		
	addPicture: function() {
		if(ice_picture.pictureData != null) {
			var list = $('ice_picture_spec_list');
			
			var picture = new Picture(null, null, ice_picture.pictureData, null, null, null, ICE_GEO_HAZARD, $("ice_picture_comment").value, parseInt(list[list.selectedIndex].value));
			ice_page.updateLocation(function(){
				main.store.getIce().addPicture(picture);
				
				ice_picture.pictureData = null;
				$("ice_picture_img").src ="";
				$('ice_picture_spec_list').selectedIndex = 0;
				ice_picture.updatePictureButtons("#ice_picture");
				
				ice_page.add('ice_picture_count');
				main.panels.slideTo("ice_obs");
			},true);
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
		smallImage.src = imageData;
		ice_picture.updatePictureButtons("#ice_picture");
		main.hideDialog();
		main.showHideFooter("ice_picture");
	},

	onFail: function(message) {
//		alert("Lagre bilde feil");
		main.hideDialog();
	},
	
	afterSendRegistration: function() {
		$('ice_picture_img').src = "";
		$("ice_picture_comment").value = "";
	},
	
	init : function () {
		$('header_middle_text').innerHTML = "Bilde";
		ice_picture.updatePictureButtons("#ice_picture");
		this.picturePage = "#ice_picture";
		var make = this.make;
		var page = this;
		this.setMakePictureHandlers(function(pictureSource){ make.call(page, pictureSource);});
	}
}

jQuery.extend(ice_picture, super_picture, super_obs);