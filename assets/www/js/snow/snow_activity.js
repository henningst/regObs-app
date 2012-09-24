var snow_activity = {
		shouldShowFooter : false,
		
		addSnowActivity: function() {
//			var fresh_snow_limit = jQuery("#snow_surface_fresh_snow_limit")
//		
//			
//			var obs = new SnowSurfaceObservation(0, snow_height_cm.toString(), fresh_snow_amount.val(), fresh_snow_limit.val(), null, 0, list.val(), 0, 0, null, 0, null); 
//			
//			snow_page.updateLocation(function(){
//				list.val(0);
//				snow_height.val(null);
//				fresh_snow_amount.val(null);
//				fresh_snow_limit.val(null);
//				main.store.getSnow().addObs(obs);
//				main.panels.slideBack();
//			}, true);
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Skredaktivitet";
			
			TemplateWireing.insertSlider("snow_activity_slider_placeholder", "snow_acitivty");
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
jQuery.extend(snow_activity, super_obs);