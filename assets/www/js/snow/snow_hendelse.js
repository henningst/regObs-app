var snow_hendelse = {
		
		i: 0,
		
		fill_activity_influenced: function() {
			
		},
		
		addHendelse: function() {

//			var obs = new AvalancheDangerObs(snow_danger_sign.i++, null, $("snow_hendelse_list").selectedIndex, 0, $("snow_hendelse_comment").value);
//			main.store.addAvalancheDangerObs(obs);
			
			var incident = new Incident();
			main.store.add
			snow_observation.add('snow_hendelse');
			main.panels.slideBack();

			$("snow_hendelse_list").selectedIndex = 0;
			$("snow_hendelse_list1").selectedIndex = 0;
			$("snow_hendelse_comment").value = "";
			
		},
		
		init: function() {
			
		}
}