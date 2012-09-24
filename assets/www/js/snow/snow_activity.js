var snow_activity = {
		shouldShowFooter : false,
		
		addSnowActivity: function() {
			var hours = jQuery("#snow_acitivty_time_since");
			var date = new Date();
			date.setHours(date.getHours() - parseInt(hours.val()));

			var type = jQuery("#snow_activity_carusel_type_field");
			var size = jQuery("#snow_activity_carusel_size_field");
			var count = jQuery("#snow_activity_carusel_count_field");
			var comment = jQuery("#snow_acitivty_comment");
			
			//(@RegID, @AvalancheActivityObsID, @Aspect,@HeigthStartZone,@DestructiveSizeTID,@EstimatedNumTID,@AvalancheTID,@AvalancheTriggerTID,@TerrainStartZoneTID,@DtAvalancheTime,@SnowLine,@UsageFlagTID,@Comment)->
			var obs = new AvalancheActivityObs(0,0,null,null, size.val(), count.val(), type.val(),0,0,date, null, 0, comment.val());
			snow_page.updateLocation(function(){
				main.store.getSnow().addObs(obs);
				main.panels.slideBack();
			}, true);
		},
		
		afterSendRegitration: function(){
			jQuery("#snow_activity_slider").slider("value", 0);
			jQuery('#snow_activity_carusel_count').html("");
			jQuery('#snow_activity_carusel_size').html("");
			jQuery('#snow_activity_carusel_type').html("");
			jQuery("#snow_activity_comment").val("");
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Skredaktivitet";
			
			TemplateWireing.insertSlider("snow_activity_slider_placeholder", "snow_acitivty");
			
			
			jQuery('#snow_activity_carusel_count').html(
				main.createCarousel("snow_activity_carusel_count_carusel", jQuery.map(this.estimatedNumKD, function(elem, i){
					return elem.EstimatedNumName;
				})).getDomNode()
			);
			
			jQuery('#snow_activity_carusel_size').html(
				main.createCarousel("snow_activity_carusel_size_carusel", jQuery.map(this.destructiveSizeKD, function(elem, i){
					return elem.DestructiveSizeName;
				})).getDomNode()
			);
			
			jQuery('#snow_activity_carusel_type').html(
				main.createCarousel("snow_activity_carusel_type_carusel", jQuery.map(this.avalancheKD, function(elem, i){
					return elem.AvalancheName;
				})).getDomNode()
			);
			
			main.listenForCaruselEvent("snow_activity_carusel_type_carusel", snow_activity.setType);
			main.listenForCaruselEvent("snow_activity_carusel_size_carusel", snow_activity.setSize);
			main.listenForCaruselEvent("snow_activity_carusel_count_carusel", snow_activity.setCount);
		},

		setType: function(index){
			jQuery("#snow_activity_carusel_type_field").val(snow_activity.avalancheKD[index].AvalancheTID);
		},
		
		setSize : function(index){
			jQuery("#snow_activity_carusel_size_field").val(snow_activity.destructiveSizeKD[index].DestructiveSizeTID);
		},

		setCount : function(index){
			jQuery("#snow_activity_carusel_count_field").val(snow_activity.estimatedNumKD[index].EstimatedNumTID);
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