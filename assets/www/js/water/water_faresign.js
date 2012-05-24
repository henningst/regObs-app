var water_faresign = {

		i: 0,
		
		fill_snow_danger_sign: function(data) {
			var options = jQuery("#water_danger_sign_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
			    options.append(jQuery("<option />").val(this.DangerSignTID).text(this.DangerSignName));
			});
		},
		
		addFaresign: function() {
			
			var obs = new DangerObs(water_faresign.i++, null, WATER_GEO_HAZARD, $("water_danger_sign_list").selectedIndex, 0, $("water_danger_sign_comment").value);
			
			main.store.getWater().addSnowObs(obs);
			snow_page.add('water_faresign_count');
			main.panels.slideBack();
			
			$("water_danger_sign_list").selectedIndex = 0;
			$("water_danger_sign_comment").value = "";
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Faresign";
			
		}
}