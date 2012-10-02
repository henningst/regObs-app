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
		}
};
jQuery.extend(ice_cover, super_obs);