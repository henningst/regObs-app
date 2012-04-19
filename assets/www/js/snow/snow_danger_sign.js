function SnowDangerSign(id, dangerSign) 
{
	this.id			= id;
	this.dangerSign = dangerSign;	
}

var snow_danger_sign = {

		i: 0,
		
		addFaresign: function() {

			var obs = new AvalancheDangerObs(snow_danger_sign.i++, null, $("snow_danger_sign_list").selectedIndex, 0, $("snow_danger_sign_comment").value);
			main.store.addObservation(obs);
		},
		
		init: function() {
			
		}
}