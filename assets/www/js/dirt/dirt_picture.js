var dirt_picture  = {
	shouldShowFooter : false,
	pictureData: null,
		
	addPicture: function() {
		if(dirt_picture.pictureData != null) {
			var list = $('dirt_picture_spec_list');
			var picture = new Picture(null, null, dirt_picture.pictureData, null, null, null, DIRT_GEO_HAZARD, $("dirt_picture_comment").value, parseInt(list[list.selectedIndex].value));

			dirt_page.updateLocation(function(){
				main.store.getDirt().addPicture(picture);
				
				dirt_picture.pictureData = null;
				$("dirt_picture_img").src ="";
				$('dirt_picture_spec_list').selectedIndex = 0;
				$("dirt_picture_comment").value = "";
				dirt_picture.updatePictureButtons("#dirt_picture");
	
				dirt_page.add('dirt_picture_count');
				main.panels.slideTo("dirt_obs");
			},true);
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

		var smallImage = document.getElementById('dirt_picture_img');
		smallImage.src = imageData;
		new ImageDataConverter(imageData).convert(function(base64){
			dirt_picture.pictureData = base64;
			dirt_picture.updatePictureButtons("#dirt_picture");
			main.hideDialog();
			setTimeout(
					function(){main.resetHeights(); setTimeout(main.resetHeights, 2000);}, 
					2000
				);
			
			main.showHideFooter("dirt_picture");
		});
	},

	onFail: function(message) {
		if(message === "Camera unavailable"){
			main.showDialogWithMessage("Vi finner ikke eller kan ikke få tak i kameraet på denne telefonen.", "Kamera");
			return;
		}
		main.hideDialog();
	},
	
	afterSendRegistration: function() {
		$('dirt_picture_img').src = "";
		$("dirt_picture_comment").value = "";
	},
	
	
	
	init : function () {
		$('header_middle_text').innerHTML = "Bilde";
		dirt_picture.updatePictureButtons("#dirt_picture");
		this.picturePage = "#dirt_picture";
		var make = this.make;
		var page = this;
		this.setMakePictureHandlers(function(pictureSource){ make.call(page, pictureSource);});
	}
};

jQuery.extend(dirt_picture, super_picture, super_obs);