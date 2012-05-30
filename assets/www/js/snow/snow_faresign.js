var snow_faresign = {

		i: 0,
		
		fillDangerSign: function(data) {
			var options = jQuery("#snow_danger_sign_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
				if(this.DangerSignTID < 10)
					options.append(jQuery("<option />").val(this.DangerSignTID).text(this.DangerSignName));
			});
		},
		
		addFaresign: function() {
			
			var obs = new AvalancheDangerObs(snow_faresign.i++, null, $("snow_danger_sign_list").selectedIndex, 0, $("snow_danger_sign_comment").value);
			main.store.getSnow().addObs(obs);
			snow_page.add('snow_faresign_count');
			main.panels.slideBack();
			
			$("snow_danger_sign_list").selectedIndex = 0;
			$("snow_danger_sign_comment").value = "";
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Faresign";
			
		}
}