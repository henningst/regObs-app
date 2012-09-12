var water_level = {
		
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
}