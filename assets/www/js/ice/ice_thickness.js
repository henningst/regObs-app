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
			
			ice_thickness.slush_depth = jQuery("#ice_thickness_slush_depth");
			ice_thickness.snow_depth = jQuery("#ice_thickness_snow_depth");
			ice_thickness.sum = jQuery("#ice_thickness_sum");
			ice_thickness.comment = jQuery("#ice_thickness_comment");
			ice_thickness.fields = [ice_thickness.slush_depth, ice_thickness.snow_depth, ice_thickness.sum, ice_thickness.comment];
			
		},
		
		addIceThickness : function(){
			//(@RegID, @SnowDepth, @SlushSnow, @IceThicknessSum, @IceHeightBefore, @IceHeightAfter, @UsageFlagTID, @Comment) ->
			console.log("pp: about to send icethickness");
			var obs = new IceThickness(0, ice_thickness.snow_depth.val(), ice_thickness.slush_depth.val(), ice_thickness.sum.val(), null, null, 0, ice_thickness.comment.val()); 
			console.log("pp: addnig obs " + JSON.stringify(obs))
			ice_page.updateLocation(function(){
				console.log("pp: got location " + JSON.strinigfy(obs));
				ice_thickness.clear();
				console.log("adding " + JSON.stringify(obs));
				main.store.getIce().addObs(obs);
				main.panels.slideBack();
			}, true);
		}
};
jQuery.extend(ice_thickness, super_obs);
