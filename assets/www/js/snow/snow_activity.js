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
			
			$('snow_activity_carusel_count').appendChild(
				main.createCarousel("snow_activity_carusel_count_carusel", jQuery.map(this.estimatedNumKD, function(elem, i){
					return elem.EstimatedNumName;
				})).getDomNode()
			);
			
			$('snow_activity_carusel_size').appendChild(
				main.createCarousel("snow_activity_carusel_size_carusel", jQuery.map(this.destructiveSizeKD, function(elem, i){
					return elem.DestructiveSizeName;
				})).getDomNode()
			);
			
			$('snow_activity_carusel_type').appendChild(
				main.createCarousel("snow_activity_carusel_type_carusel", jQuery.map(this.avalancheKD, function(elem, i){
					return elem.AvalancheName;
				})).getDomNode()
			);
				
		},
		
		fillEstimatedNumKD: function(data){
			snow_activity.estimatedNumKD = jQuery.map(data.results, function(elem, i){
				return jQuery.extend(new EstimatedNumKD(), elem);
			});
		},
		fillAvalancheKD: function(data){
			snow_activity.avalancheKD = jQuery.map(data.results, function(elem, i){
				return jQuery.extend(new AvalancheKD(), elem);
			});
		},
		fillDestructiveSizeKD: function(data){
			snow_activity.destructiveSizeKD= jQuery.map(data.results, function(elem, i){
				return jQuery.extend(new DestructiveSizeKD(), elem);
			});
		}
		
		
};
jQuery.extend(snow_activity, super_obs);