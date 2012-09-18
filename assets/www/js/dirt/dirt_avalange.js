var dirt_avalange = {
		shouldShowFooter : false,

		addAvalange: function() {
			var type = jQuery("#dirt_avalange_type_list");
			var size = jQuery("#dirt_avalange_size_list");
			var trigger = jQuery("#dirt_avalange_trigger_list");
			var hours = jQuery("#dirt_avalange_time");
			var date = new Date();
			date.setHours(date.getHours() - parseInt(hours.val()));
			
			var obs = new LandSlideObs(0, date, null,null,null, type.val(), size.val(), trigger.val());
			
			dirt_page.updateLocation(function(){
				main.store.getDirt().addObs(obs);
				dirt_page.add('dirt_avalange_count');
				
				main.panels.slideBack();
				
				type.val($("#target option:first").val());
				size.val($("#target option:first").val());
				trigger.val($("#target option:first").val());
			},true);
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Jordsprang/Flomskred";
			
			jQuery( "#dirt_avalange_slider" ).slider({
				value:0,
				min: 0,
				max: 6,
				step: 1,
				slide: function( event, ui ) {
					jQuery( "#dirt_avalange_time" ).val( ui.value * ui.value) ;
				}
			});
			jQuery( "#dirt_avalange_time" ).val(0);
		},
		
		fillLandSlideKD : function(data){
			var options = jQuery("#dirt_avalange_type_list");
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove(); });
			jQuery.each(data.results, function() {
				options.append(jQuery("<option />").val(this.LandSlideTID).text(this.LandSlideName));
			});
		},
		
		fillLandSlideSizeKD : function(data){
			var options = jQuery("#dirt_avalange_size_list");
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove(); });
			jQuery.each(data.results, function() {
				options.append(jQuery("<option />").val(this.LandSlideSizeTID).text(this.LandSlideSizeName));
			});
		},
		
		fillLandSlideTriggerKD : function(data){
			var options = jQuery("#dirt_avalange_trigger_list");
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove(); });
			jQuery.each(data.results, function() {
				options.append(jQuery("<option />").val(this.LandSlideTriggerTID).text(this.LandSlideTriggerName));
			});
		}
};
jQuery.extend(dirt_avalange, super_obs);
