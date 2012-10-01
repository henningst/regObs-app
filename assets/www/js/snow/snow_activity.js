var snow_activity = {
		shouldShowFooter : false,
		
		addSnowActivity: function() {
			var hours = jQuery("#snow_acitivty_time_since");
			var date = new Date();
			date.setHours(date.getHours() - parseInt(hours.val()));

			var type = jQuery("#snow_activity_carusel_type_field");
			var size = jQuery("#snow_activity_carusel_size_field");
			var count = jQuery("#snow_activity_carusel_count_field");
			var height = jQuery("#snow_activity_carusel_height_field");
			var aspect = jQuery("#snow_activity_carusel_aspect_field");
			var comment = jQuery("#snow_acitivty_comment");
			
			//(@RegID, @AvalancheActivityObsID, @Aspect,@HeigthStartZone,@DestructiveSizeTID,@EstimatedNumTID,@AvalancheTID,@AvalancheTriggerTID,@TerrainStartZoneTID,@DtAvalancheTime,@SnowLine,@UsageFlagTID,@Comment)->
			var obs = new AvalancheActivityObs(0,0, aspect.val(), height.val(), size.val(), count.val(), type.val(),0,0,date, null, 0, comment.val());
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
			jQuery("#snow_activity_carusel_height").html("");
			jQuery("#snow_activity_carusel_aspect").html("");
			jQuery("#snow_acitivty_comment").val("");
		},
		
		caruselInit: function(id, onSet, values, nameMapper, widthOfCaruselElement){
			jQuery('#' + id).html(
				main.createCarousel(id + "_carusel", jQuery.map(values, nameMapper), widthOfCaruselElement).getDomNode()
			);
			
			main.listenForCaruselEvent(id + "_carusel", onSet);
		},
		
		init: function() {
			this.heightKD = SNOW_ACTIVTY_HEIGHT;
			this.aspectKD = SNOW_ACTIVITY_ASPECT;
			
			$('header_middle_text').innerHTML = "Skredaktivitet";
			
			TemplateWireing.insertSlider("snow_activity_slider_placeholder", "snow_acitivty");
			
			this.caruselInit("snow_activity_carusel_count", snow_activity.setCount, this.estimatedNumKD, function(elem){return elem.EstimatedNumName;});
			this.caruselInit("snow_activity_carusel_size", snow_activity.setSize, this.destructiveSizeKD, function(elem){return elem.DestructiveSizeName;});
			this.caruselInit("snow_activity_carusel_type", snow_activity.setType, this.avalancheKD, function(elem){return elem.AvalancheName;});
			this.caruselInit("snow_activity_carusel_aspect", snow_activity.setAspect, this.aspectKD, function(elem){return elem.name;}, 100);
			this.caruselInit("snow_activity_carusel_height", snow_activity.setHeight, this.heightKD, function(elem){return elem.name;}, 100);
			
			
		},


		setAspect: function(index){
			jQuery("#snow_activity_carusel_aspect_field").val(snow_activity.aspectKD[index].value);
		},

		setHeight: function(index){
			jQuery("#snow_activity_carusel_height_field").val(snow_activity.heightKD[index].value);
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