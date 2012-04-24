var snow_faresign = {

		i: 0,
		
		fill_snow_danger_sign: function(data) {
			var list = $("snow_danger_sign_list");
			var i=0;
			for (i = 0; i < data.results.length; i++)
			{
				list.add(new Option(data.results[i].DangerSignName, data.results[i].DangerSignTID));
			}
		},
		
		addFaresign: function() {

			var obs = new AvalancheDangerObs(snow_faresign.i++, null, $("snow_danger_sign_list").selectedIndex, 0, $("snow_danger_sign_comment").value);
			main.store.addAvalancheDangerObs(obs);
			snow_observation.add('snow_faresign_count');
			main.panels.slideBack();
			
			$("snow_danger_sign_list").selectedIndex = 0;
			$("snow_danger_sign_comment").value = "";
		},
		
		init: function() {
			
		}
}