var snow_surface = {
		shouldShowFooter : false,
		i: 0,
		
		addSnowSurface: function() {
//			var list = $("snow_danger_sign_list");
//			
//			var comment = $("snow_danger_sign_comment").value;
//			comment += " " +SNOW_TEXT[snow_faresign.carouselId];
//			
//			var obs = new AvalancheDangerObs(snow_faresign.i++, null, list[list.selectedIndex].value, 0, comment);
//			
//			snow_page.updateLocation(function(){
//				$("snow_danger_sign_list").selectedIndex = 0;
//				$("snow_danger_sign_comment").value = "";
//				main.store.getSnow().addObs(obs);
//				snow_page.add('snow_faresign_count');
//				main.panels.slideBack();
//			}, true);
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Sn&oslash;surface";
			
		}
};
jQuery.extend(snow_surface, super_obs);