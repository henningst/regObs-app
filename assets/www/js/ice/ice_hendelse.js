var ice_hendelse = {
		
		fill_activity_influenced: function(data) {
			var options = jQuery("#ice_hendelse_activity_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
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
			
			main.store.addIncident(incident);
			main.panels.slideBack();			
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
		}
}