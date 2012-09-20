var water_level = {
		shouldShowFooter : false,
		fillWaterLevelKD: function(data) {
			
			if(data == null)
				return;
			
			var options = jQuery("#water_level_reference_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
					options.append(jQuery("<option />").val(this.WaterLevelRefTID).text(this.WaterLevelRefName));
			});
		},
		
		addWaterLevelObs: function() {

			var list = $('water_level_reference_list');
			var isRiver = jQuery("input:radio[name=water_level_isriver]:checked");
			var waterLevelValue = $("water_level_description").value;
			
			var waterLevelType = "Elv";
			if(!isRiver){				
				waterLevelType = "Innsj¿/magasin";
			}
			
			var waterLevel = new WaterLevel(null, waterLevelType, waterLevelValue, list[list.selectedIndex].value, null, "");					
			
			water_page.updateLocation(function(){
				main.store.getWater().addObs(waterLevel);
				main.panels.slideBack()
			},true);
				
			$("water_level_reference_list").selectedIndex = 0;
			$("water_level_description").value = "";
		
		}
		
}