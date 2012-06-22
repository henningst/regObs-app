var water_picture  = {
	
	pictureData: null,
		
	addPicture: function() {
		if(water_picture.pictureData != null) {
			var list = $('water_picture_spec_list');
			
			var picture = new Picture(null, null, water_picture.pictureData, null, null, null, WATER_GEO_HAZARD, $("water_picture_comment").value, parseInt(list[list.selectedIndex].value));
			water_page.updateLocation(function(){
				main.store.getWater().addPicture(picture);
				
				water_picture.pictureData = null;
				$("water_picture_img").src ="";
				$('water_picture_spec_list').selectedIndex = 0;
				water_picture.updatePictureButtons("#water_picture");
	
				water_page.add('water_picture_count');
				main.panels.slideBack();
			},true);
		}
	},
	
	fillRegistrationKD: function(data) {
		var options = jQuery("#water_picture_spec_list");
		//remove if previously inserted
		jQuery.each(options, function() {jQuery(this).find('option').remove()});
		
		jQuery.each(data.results, function() {
			if(this.RegistrationTID >= 60 && this.RegistrationTID < 70 || this.RegistrationTID == 11 || this.RegistrationTID == 13 || this.RegistrationTID == 99 || this.RegistrationTID == 0)
				options.append(jQuery("<option />").val(this.RegistrationTID).text(this.RegistrationName));
		});
	},
	
	onSuccess: function(imageData) {
		water_picture.pictureData = imageData;

		var smallImage = document.getElementById('water_picture_img');
		smallImage.src = imageData;
		water_picture.updatePictureButtons("#water_picture");

		main.hideDialog();
	},

	onFail: function(message) {
		main.hideDialog();
	},
	
	afterSendRegistration: function() {
		$('water_picture_img').src = "";
		$("water_picture_comment").value = "";
	},
	
	
	
	init : function () {
		$('header_middle_text').innerHTML = "Bilde";
		water_picture.updatePictureButtons("#water_picture");
	}
};

jQuery.extend(water_picture, super_picture);