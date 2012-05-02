var water_faresign = {

		i: 0,
		
		fill_water_danger_sign: function(data) {
			var options = jQuery("#water_danger_sign_list");
			
			jQuery.each(data.results, function() {
			    options.append(jQuery("<option />").val(this.DangerSignTID).text(this.DangerSignName));
			});
		},
		
		addFaresign: function() {
			
			var obs = new AvalancheDangerObs(snow_faresign.i++, null, $("water_danger_sign_list").selectedIndex, 0, $("water_danger_sign_comment").value);
			main.store.addAvalancheDangerObs(obs);
			snow_page.add('water_faresign_count');
			main.panels.slideBack();
			
			$("water_danger_sign_list").selectedIndex = 0;
			$("water_danger_sign_comment").value = "";
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Faresign";
			
		}
}