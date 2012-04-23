function SnowDangerSign(id, dangerSign) 
{
	this.id			= id;
	this.dangerSign = dangerSign;	
}

var snow_faresign = {

		i: 0,
		
		addFaresign: function() {

			var obs = new AvalancheDangerObs(snow_faresign.i++, null, $("snow_danger_sign_list").selectedIndex, 0, $("snow_danger_sign_comment").value);
			main.store.addAvalancheDangerObs(obs);
			snow_observation.add('snow_faresign');
			main.panels.slideBack();
			
			$("snow_danger_sign_list").selectedIndex = 0;
			$("snow_danger_sign_comment").value = "";
		},
		
		init: function() {
			
		}
}