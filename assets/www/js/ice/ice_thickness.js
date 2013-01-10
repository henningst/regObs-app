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
					 	new AtLeastOneFilled(jQuery("#ice_thickness_snow_depth, #ice_thickness_slush_depth, #ice_thickness_sum"))
					]);
		},
		
		addIceThickness : function(){
			if(!validation.validate())
				return;
			
			var cm = function(val){ return  "" + (parseInt(val) / 100); };
			function emptyOr(field, value){
				if((field.val() != null && field.val().length === 0) === true)
					return null;
				else 
					return value;
			};
			
			function intOr(string, defaultValue){
				if(isNaN(parseInt(string)))
					return defaultValue;
				else
					return parseInt(string);
			};
			
			var obs = new IceThickness(0, 
					emptyOr(ice_thickness.snow_depth, 	cm(ice_thickness.snow_depth.val())), 
					emptyOr(ice_thickness.slush_depth, 	cm(ice_thickness.slush_depth.val())), 
					emptyOr(ice_thickness.sum, 			cm(ice_thickness.sum.val())), 
					null, null, 0, ice_thickness.comment.val()); 
			
			ice_page.updateLocation(function(){
				ice_thickness.clear();
				main.store.getIce().replaceObs(obs);
				main.panels.slideBack();
			}, true);
		}
};
jQuery.extend(ice_thickness, super_obs);
