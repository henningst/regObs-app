var water_faresign = {

		i: 0,
		
		carouselId : CAROUSEL_STANDART,
		
		fillDangerSign: function(data) {
			var options = jQuery("#water_danger_sign_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {

				if(this.DangerSignTID > 599 && this.DangerSignTID < 700)
					options.append(jQuery("<option />").val(this.DangerSignTID).text(this.DangerSignName));
			});
		},

		changeCarouselTo: function(id) 
		{
			water_faresign.carouselId = id;
		},
		
		addFaresign: function() {
			var list = $('water_danger_sign_list');
			
			var comment = $("water_danger_sign_comment").value;
			comment += " " +WATER_TEXT[water_faresign.carouselId];
			
			var obs = new DangerObs(water_faresign.i++, null, WATER_GEO_HAZARD, list[list.selectedIndex].value, 0, comment);
			
			water_page.updateLocation(function(){
				main.store.getWater().addObs(obs);
				water_page.add('water_faresign_count');
				main.panels.slideBack();
				
				$("water_danger_sign_list").selectedIndex = 0;
				$("water_danger_sign_comment").value = "";
			},true);
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Faretegn";
		}
}