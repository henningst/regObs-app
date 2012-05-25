var ice_faresign = {

		i: 0,
		
		fillDangerSign: function(data) {
			var options = jQuery("#ice_danger_sign_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
				if(this.DangerSignTID > 699 && this.DangerSignTID < 800)
					options.append(jQuery("<option />").val(this.DangerSignTID).text(this.DangerSignName));
			});
		},
		
		addFaresign: function() {
			var obs = new DangerObs(ice_faresign.i++, null, ICE_GEO_HAZARD, $("ice_danger_sign_list").selectedIndex, 0, $("ice_danger_sign_comment").value);
			main.store.getIce().addObs(obs);
			
			ice_page.add('ice_faresign_count');
			main.panels.slideBack();
			
			$("ice_danger_sign_list").selectedIndex = 0;
			$("ice_danger_sign_comment").value = "";
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Faresign";
			
		}
}