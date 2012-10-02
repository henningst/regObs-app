var ice_thickness = {
		shouldShowFooter : false,
		
		clear: function(){
			jQuery.each(this.fields, function(index, name){
				name.val("");
			});
		},
		afterSendRegistration: function() {
			this.clear();
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Istykkelse";
			
			this.slush_depth = jQuery("#ice_thickness_slush_depth");
			this.snow_depth = jQuery("#ice_thickness_snow_depth");
			this.sum = jQuery("#ice_thickness_sum");
			this.comment = jQuery("#ice_thickness_comment");
			this.fields = [this.slush_depth, this.snow_depth, this.sum, this.comment];
			
		},
		
		fillIceCoverBeforeKD : function(data){
			var options = jQuery("#ice_cover_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove();});
			
			jQuery.each(data.results, function() {
				options.append(jQuery("<option />").val(this.IceCoverBeforeTID).text(this.IceCoverBeforeName));
			});
		},
		
		fillIceCoverKD : function(data){
			var options = jQuery("#ice_cover_before_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove();});
			
			jQuery.each(data.results, function() {
				options.append(jQuery("<option />").val(this.IceCoverTID).text(this.IceCoverName));
			});
		},
		
		addIceThickness : function(){
			//(@RegID, @SnowDepth, @SlushSnow, @IceThicknessSum, @IceHeightBefore, @IceHeightAfter, @UsageFlagTID, @Comment) ->
			var obs = new IceThickness(0, this.snow_depth.val(), this.slush_depth.val(), this.sum.val(), null, null, 0, this.comment.val()); 
			
			ice_page.updateLocation(function(){
				ice_thickness.clear();
				main.store.getIce().addObs(obs);
				main.panels.slideBack();
			}, true);
		}
};
jQuery.extend(ice_thickness, super_obs);