var snow_faresign = {
		shouldShowFooter : false,
		i: 0,
		
		carouselId: CAROUSEL_STANDART,
		
		fillDangerSign: function(data) {
			var options = jQuery("#snow_danger_sign_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
				if(this.DangerSignTID < 10)
					options.append(jQuery("<option />").val(this.DangerSignTID).text(this.DangerSignName));
			});
		},
		
		changeCarouselTo: function(id) 
		{
			snow_faresign.carouselId = id;
		},
		
		addFaresign: function() {
			var list = $("snow_danger_sign_list");
			
			var comment = $("snow_danger_sign_comment").value;
			comment += " " +SNOW_TEXT[snow_faresign.carouselId];
			var obs = new DangerObs(snow_faresign.i++, null, SNOW_GEO_HAZARD, list[list.selectedIndex].value, 0, comment);
			
			snow_page.updateLocation(function(){
				$("snow_danger_sign_list").selectedIndex = 0;
				$("snow_danger_sign_comment").value = "";
				
				main.carusels[SNOW].goToItem(0);
				main.store.getSnow().addObs(obs);
				main.panels.slideBack();
			}, true);
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Faretegn";
			
		}
};
jQuery.extend(snow_faresign, super_obs);