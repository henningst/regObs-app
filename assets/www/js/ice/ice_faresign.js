var ice_faresign = {
		shouldShowFooter : false,	
		i: 0,
		
		carouselId: CAROUSEL_STANDART,
		
		fillDangerSign: function(data) {
			var options = jQuery("#ice_danger_sign_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
				if(this.DangerSignTID > 699 && this.DangerSignTID < 800)
					options.append(jQuery("<option />").val(this.DangerSignTID).text(this.DangerSignName));
			});
		},

		changeCarouselTo: function(id) 
		{
			ice_faresign.carouselId = id;
		},
		
		addFaresign: function() {
			var list = $("ice_danger_sign_list");
			var comment = $("ice_danger_sign_comment").value;
			comment += " " +ICE_TEXT[ice_faresign.carouselId];
			
			var obs = new DangerObs(ice_faresign.i++, null, ICE_GEO_HAZARD, list[list.selectedIndex].value, 0, comment);
			
			
			ice_page.updateLocation(function(){
				main.store.getIce().addObs(obs);
				
				ice_page.add('ice_faresign_count');
				$("ice_danger_sign_list").selectedIndex = 0;
				$("ice_danger_sign_comment").value = "";
				main.carusels[ICE].goToItem(0);
				
				main.panels.slideBack();
			}, true);
			
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Faretegn";
			
		}
};
jQuery.extend(ice_faresign, super_obs);