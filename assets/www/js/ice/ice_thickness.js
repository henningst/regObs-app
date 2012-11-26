var ice_thickness = {
		shouldShowFooter : false,
		
		clear: function(){
			jQuery.each(ice_thickness.fields, function(index, name){
				this.val("");
			});
		},
		afterSendRegistration: function() {
			ice_thickness.clear();
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Istykkelse";
			
			ice_thickness.slush_depth = jQuery("#ice_thickness_slush_depth");
			ice_thickness.snow_depth = jQuery("#ice_thickness_snow_depth");
			ice_thickness.sum = jQuery("#ice_thickness_sum");
			ice_thickness.comment = jQuery("#ice_thickness_comment");
			ice_thickness.fields = [ice_thickness.slush_depth, ice_thickness.snow_depth, ice_thickness.sum, ice_thickness.comment];
			
			
			var leggTilButton = jQuery("#ice_thickness button.add");
			validation.register(
					leggTilButton, 
					[
					 	new NonEmpty(jQuery("#ice_thickness_snow_depth, #ice_thickness_slush_depth, #ice_thickness_sum"))
					]);
		},
		
		addIceThickness : function(){
			if(!validation.validate())
				return;
			
			var cm = function(val){ return  "" + (parseInt(val) / 100); };
			
			var obs = new IceThickness(0, cm(ice_thickness.snow_depth.val()), cm(ice_thickness.slush_depth.val()), cm(ice_thickness.sum.val()), null, null, 0, ice_thickness.comment.val()); 
			
			ice_page.updateLocation(function(){
				ice_thickness.clear();
				main.store.getIce().addObs(obs);
				main.panels.slideBack();
			}, true);
		}
};
jQuery.extend(ice_thickness, super_obs);
