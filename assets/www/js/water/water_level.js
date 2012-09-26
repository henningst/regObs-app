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
			var waterLevelValueInput = $("water_level_value").value;
			var waterLevelComment = $("water_level_comment").value;
						
			var waterLevelDescribed = "";
			var waterLevelValue = 0.00;
			
			var numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
			if(numberRegex.test(waterLevelValueInput)) { //is int
				waterLevelValue = waterLevelValueInput;
			}
			else{
				waterLevelDescribed = waterLevelValueInput;
				waterLevelValue = waterLevelValue.toString();
			}

			/*var waterLevelType = 0;
			if(!isRiver){				
				waterLevelType = 1;
			}*/
			
			
			var waterLevel = new WaterLevel("", waterLevelDescribed, waterLevelValue, list[list.selectedIndex].value, 0, waterLevelComment);					
			
			water_page.updateLocation(function(){
				main.store.getWater().addObs(waterLevel);
				main.panels.slideBack()
			},true);
				
			$("water_level_reference_list").selectedIndex = 0;
			$("water_level_value").value = "";
			$("water_level_comment").value = "";
		
		}
		
};
jQuery.extend(water_level, super_obs);