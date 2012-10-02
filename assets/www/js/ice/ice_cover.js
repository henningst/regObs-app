var ice_cover = {
		shouldShowFooter : false,
		
		afterSendRegistration: function() {
			
		},
		
		
		init: function() {
			$('header_middle_text').innerHTML = "Isdekningsgrad";
			
			
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
		
		addIceCoverObs : function(){
			var list = jQuery("#ice_cover_list");
			var before_list = jQuery("#ice_cover_before_list");
			var comment = jQuery("#ice_cover_commet");

			var obs = new IceCoverObs(0, list.val(), before_list.val(), 0, comment.val()); 
			
			ice_page.updateLocation(function(){
				main.store.getIce().addObs(obs);
				main.panels.slideBack();
			}, true);
		}
};
jQuery.extend(ice_cover, super_obs);