var snow_surface = {
		shouldShowFooter : false,
		i: 0,
		
		addSnowSurface: function() {
			if(!validation.validate())
				return;
			
			function intOr(string, defaultValue){
				if(isNaN(parseInt(string)))
					return defaultValue;
				else
					return parseInt(string);
			}
			
			var list = jQuery("#snow_surface_drift");
			var snow_height = jQuery("#snow_surface_snow_height");
			var snow_height_meter = intOr(snow_height.val(), 0);
			var snow_height_cm = snow_height_meter / 100;
			var fresh_snow_amount = jQuery("#snow_surface_fresh_snow_amount");
			var fresh_snow_amount_meter = intOr(fresh_snow_amount.val(), 0);
			var fresh_snow_amount_cm = fresh_snow_amount_meter / 100;
			
			var fresh_snow_limit = jQuery("#snow_surface_fresh_snow_limit")
		
			
			var obs = new SnowSurfaceObservation(0, snow_height_cm.toString(), fresh_snow_amount_cm.toString(), intOr(fresh_snow_limit.val(),0).toString(), null, 0, list.val(), 0, 0, null, 0, null); 
			
			snow_page.updateLocation(function(){
				list.val(0);
				snow_height.val(null);
				fresh_snow_amount.val(null);
				fresh_snow_limit.val(null);
				main.store.getSnow().replaceObs(obs);
				main.panels.slideBack();
			}, true);
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Sn&oslash;overflate";
			
			validation.register(
					jQuery("#snow_surface button.add"),
					[
					 	new AtLeastOneFilled(jQuery("#snow_surface_snow_height, #snow_surface_fresh_snow_amount, #snow_surface_fresh_snow_limit"))
					]
			);
			
		},
		
		fillSnowDriftKD : function(data){
			var options = jQuery("#snow_surface_drift");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove();});
			
			jQuery.each(data.results, function() {
				options.append(jQuery("<option />").val(this.SnowDriftTID).text(this.SnowDriftName));
			});
		}
};
jQuery.extend(snow_surface, super_obs);