var water_hendelse = {
		
		fill_activity_influenced: function(data) {
			if(data == null)
				return;
			
			var options = jQuery("#water_hendelse_activity_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
				if(this.ActivityInfluencedTID > 599 && this.ActivityInfluencedTID < 700)
					options.append(jQuery("<option />").val(this.ActivityInfluencedTID).text(this.ActivityInfluencedName));
			});
		},
		
		fill_radius: function(data) {
			var options = jQuery("#water_hendelse_radius_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
			    options.append(jQuery("<option />").val(this.DamageExtentTID).text(this.DamageExtentName));
			});
		},
		
		afterSendRegistration: function() {
			$("water_hendelse_activity_list").selectedIndex = 0;
			$("water_hendelse_radius_list").selectedIndex = 0;
			$("water_hendelse_comment").value = "";
		},
		
		addHendelse: function() {
			//save hendelse

			if($("water_hendelse_comment").value == "")
			{
				main.showDialogWithMessage(HENDELSE_ERROR);
				return;
			}
			
			var string = $("water_hendelse_comment").value;
			var index = string.indexOf('.', 0);
			
			var header = string;
			var rest = "";
			if(index != -1) {
				header = string.substr(0,index);
				rest = string.substr(index+1);
			}

			var activityList = $("water_hendelse_activity_list");
			var radiusList = $("water_hendelse_radius_list");
			
			var incident = new Incident(
					null, 
					60, 
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
			
			water_page.updateLocation(function(){
				main.store.getWater().setIncident(incident);
				main.panels.slideBack();			
			},true);
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Hendelse";
			
			//restore old incident if available
			var incident = main.store.getWater().getIncident();
			
			if(incident != null) {
				$("water_hendelse_activity_list").value = incident.ActivityInfluencedTID;
				$("water_hendelse_radius_list").value = incident.DamageExtentTID;
				$("water_hendelse_comment").value = incident.IncidentHeader +"." +incident.IncidentIngress;
			}
			
			var leggTilButton = jQuery("#water_hendelse button");
			validation.register(
					leggTilButton, 
					[
					 	new NonEmpty(jQuery("#water_hendelse_comment")),
					]);
			
		}
}
