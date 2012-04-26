var snow_hendelse = {
		
		fill_activity_influenced: function(data) {
			var options = jQuery("#snow_hendelse_activity_list");
			jQuery.each(data.results, function() {
			    options.append(jQuery("<option />").val(this.ActivityInfluencedTID).text(this.ActivityInfluencedName));
			});
		},
		
		fill_radius: function(data) {
			var options = jQuery("#snow_hendelse_radius_list");
			jQuery.each(data.results, function() {
			    options.append(jQuery("<option />").val(this.DamageExtentTID).text(this.DamageExtentName));
			});
		},
		
		afterSendRegistration: function() {
			$("snow_hendelse_activity_list").selectedIndex = 0;
			$("snow_hendelse_radius_list").selectedIndex = 0;
			$("snow_hendelse_comment").value = "";
		},
		
		addHendelse: function() {
			//save hendelse
			
			var string = $("snow_hendelse_comment").value;
			var index = string.indexOf('.', 0);
			
			var header = "";
			var rest = "";
			if(index != -1) {
				header = string.substr(0,index);
				rest = string.substr(index+1);
			}

			var activityList = $("snow_hendelse_activity_list");
			var radiusList = $("snow_hendelse_radius_list");
			
			var incident = new Incident(
					null, 
					0, 
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
			var incident = main.store.getIncident();
			
			if(incident != null) {
				$("snow_hendelse_activity_list").value = incident.ActivityInfluencedTID;
				$("snow_hendelse_radius_list").value = incident.DamageExtentTID;
				$("snow_hendelse_comment").value = incident.IncidentHeader +"." +incident.IncidentIngress;
			}
		}
}