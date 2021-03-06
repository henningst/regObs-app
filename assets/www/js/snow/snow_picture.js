var snow_picture  = {
	shouldShowFooter : false,
	pictureData: null,
		
	addPicture: function() {
		if(snow_picture.pictureData != null) {
			var list = $('snow_picture_spec_list');
			
			console.log("pp: snow picture data is :" +snow_picture.pictureData)
			var picture = new Picture(null, null, snow_picture.pictureData, null, null, null, SNOW_GEO_HAZARD, $("snow_picture_comment").value, parseInt(list[list.selectedIndex].value));
			
			
			snow_page.updateLocation(function(){
				main.store.getSnow().addPicture(picture);
				
				snow_picture.pictureData = null;
				$("snow_picture_img").src =""; 
				$('snow_picture_spec_list').selectedIndex = 0;
				$("snow_picture_comment").value = "";
				
				snow_picture.updatePictureButtons("#snow_picture");
				
				snow_page.add('snow_picture_count');
				main.panels.slideTo("snow_obs");
			}, true);
		}
	},

	fillRegistrationKD: function(data) {

		var options = jQuery("#snow_picture_spec_list");
		//remove if previously inserted
		jQuery.each(options, function() {jQuery(this).find('option').remove();});
		
		jQuery.each(data.results, function() {
			if((this.RegistrationTID >= 20 && this.RegistrationTID < 30 ) || this.RegistrationTID == 11 || this.RegistrationTID == 13 || this.RegistrationTID == 99 || this.RegistrationTID == 0)
				options.append(jQuery("<option />").val(this.RegistrationTID).text(this.RegistrationName));
		});
	},
	
	onSuccess: function(imageData) {

		var smallImage = document.getElementById('snow_picture_img');
		smallImage.onload = function() { main.resetHeights(); }
		smallImage.src = imageData;
		new ImageDataConverter(imageData).convert(function(base64){
			snow_picture.pictureData = base64;
			snow_picture.updatePictureButtons("#snow_picture");
			main.hideDialog();
			main.showHideFooter("snow_picture");
			
			main.resetHeights();
		})
	},

	onFail: function(message) {
		if(message === "Camera unavailable"){
			main.showDialogWithMessage("Vi finner ikke eller kan ikke få tak i kameraet på denne telefonen.", "Kamera");
			return;
		}
		
		console.log("pp: image fail " + message);
		main.hideDialog();
	},
	
	afterSendRegistration: function() {
		$('snow_picture_img').src = "";
		$("snow_picture_comment").value = "";
	},
	
	init : function () {
		$('header_middle_text').innerHTML = "Bilde";	
		this.picturePage = "#snow_picture";
		this.updatePictureButtons("#snow_picture");
		var make = this.make;
		var page = this;
		this.setMakePictureHandlers(function(pictureSource){ make.call(page, pictureSource);});
		
	}
};

jQuery.extend(snow_picture, super_picture, super_obs);
