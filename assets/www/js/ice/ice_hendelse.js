var ice_hendelse = {
		shouldShowFooter : false,
		fill_activity_influenced: function(data) {
			if(data == null)
				return;
			
			var options = jQuery("#ice_hendelse_activity_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
				if(this.ActivityInfluencedTID > 699 && this.ActivityInfluencedTID < 800)
					options.append(jQuery("<option />").val(this.ActivityInfluencedTID).text(this.ActivityInfluencedName));
			});
		},
		
		fill_radius: function(data) {
			var options = jQuery("#ice_hendelse_radius_list");
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
			    options.append(jQuery("<option />").val(this.DamageExtentTID).text(this.DamageExtentName));
			});
		},
		
		afterSendRegistration: function() {
			$("ice_hendelse_activity_list").selectedIndex = 0;
			$("ice_hendelse_radius_list").selectedIndex = 0;
			$("ice_hendelse_comment").value = "";
		},
		
		addHendelse: function() {
			//save hendelse

			if($("ice_hendelse_comment").value == "")
			{
				main.showDialogWithMessage(HENDELSE_ERROR);
				return;
			}
			
			var string = $("ice_hendelse_comment").value;
			var index = string.indexOf('.', 0);
			
			var header = string;
			var rest = "";
			if(index != -1) {
				header = string.substr(0,index);
				rest = string.substr(index+1);
			}

			var activityList = $("ice_hendelse_activity_list");
			var radiusList = $("ice_hendelse_radius_list");
			
			var incident = new Incident(
					null, 
					70, 
					activityList[activityList.selectedIndex].value,
					radiusList[radiusList.selectedIndex].value,
					0,
					null,
					header,
					rest,
					"",
					null,
					null,
					"");
			
			ice_page.updateLocation(function(){
				main.store.getIce().setIncident(incident);
				main.panels.slideBack();			
			}, true);
			
			ice_page.check("ice_hendelse_count");
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Hendelse";
			
			//restore old incident if available
			var incident = main.store.getIce().getIncident();
			
			if(incident != null) {
				$("ice_hendelse_activity_list").value = incident.ActivityInfluencedTID;
				$("ice_hendelse_radius_list").value = incident.DamageExtentTID;
				$("ice_hendelse_comment").value = incident.IncidentHeader +"." +incident.IncidentIngress;
			}
			
			var leggTilButton = jQuery("#ice_hendelse button.add");
			validation.register(
					leggTilButton, 
					[
					 	new NonEmpty(jQuery("#ice_hendelse_comment")),
					]);
			
		}
}
jQuery.extend(ice_hendelse, super_obs);