var water_level_ref;
var water_level_isRiver = true;
var water_level = {
		shouldShowFooter : false,
		fillWaterLevelKD: function(data) {
			
			if(data == null)
				return;
			
			water_level_ref = data;

			var options = jQuery("#water_level_reference_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			
            if(water_level_isRiver){
                	jQuery.each(data.results, function() {
                		if(this.WaterLevelRefTID < 200)
                		{
                			options.append(jQuery("<option />").val(this.WaterLevelRefTID).text(this.WaterLevelRefName));
                		}
                });
            }
            else{
                	jQuery.each(data.results, function() {
                		if(this.WaterLevelRefTID >= 200)
                		{
                			options.append(jQuery("<option />").val(this.WaterLevelRefTID).text(this.WaterLevelRefName));
                		}
                });
            }
			
		},
		
		refIsRiver: function(isRiver){

			if(isRiver){
				water_level_isRiver = true;
			}
			else{
				water_level_isRiver = false;
			}
			
			water_level.fillWaterLevelKD(water_level_ref);
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