var dirt_faresign = {

		i: 0,
		
		carouselId: CAROUSEL_STANDART,
		
		fillDangerSign: function(data) {
			var options = jQuery("#dirt_danger_sign_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {

				if(this.DangerSignTID > 199 && this.DangerSignTID < 300)
					options.append(jQuery("<option />").val(this.DangerSignTID).text(this.DangerSignName));
			});
		},

		changeCarouselTo: function(id) 
		{
			dirt_faresign.carouselId = id;
		},
		
		addFaresign: function() {
			var list = $("dirt_danger_sign_list");
			
			var comment = $("ice_danger_sign_comment").value;
			comment += " " +DIRT_TEXT[dirt_faresign.carouselId]; 
			
			var obs = new DangerObs(dirt_faresign.i++, null, DIRT_GEO_HAZARD, list[list.selectedIndex].value, 0, comment);
			
			dirt_page.updateLocation(function(){
				main.store.getDirt().addObs(obs);
				dirt_page.add('dirt_faresign_count');
				main.panels.slideBack();
				
				$("dirt_danger_sign_list").selectedIndex = 0;
				$("dirt_danger_sign_comment").value = "";
			},true);
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Faretegn";
		}
}