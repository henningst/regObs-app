var snow_hendelse = {
		
		fill_activity_influenced: function(data) {
			if(data == null)
				return;
			
			var options = jQuery("#snow_hendelse_activity_list");
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
				if(this.ActivityInfluencedTID > 99 && this.ActivityInfluencedTID < 200)
					options.append(jQuery("<option />").val(this.ActivityInfluencedTID).text(this.ActivityInfluencedName));
			});
		},
		
		fill_radius: function(data) {
			var options = jQuery("#snow_hendelse_radius_list");
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
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
			
			if($("snow_hendelse_comment").value == "")
			{
				main.showDialogWithMessage(HENDELSE_ERROR);
				return;
			}
			
			var string = $("snow_hendelse_comment").value;
			var index = string.indexOf('.', 0);
			
			var header = string;
			var rest = "";
			if(index != -1) {
				header = string.substr(0,index);
				rest = string.substr(index+1);
			}

			var activityList = $("snow_hendelse_activity_list");
			var radiusList = $("snow_hendelse_radius_list");
			
			var incident = new Incident(
					null, 
					10, 
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
			
			
			snow_page.updateLocation(function (){
				main.store.getSnow().setIncident(incident);
				main.panels.slideBack();
			});
			
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Hendelse";
			
			//restore old incident if available
			var incident = main.store.getSnow().getIncident();
			
			if(incident != null) {
				$("snow_hendelse_activity_list").value = incident.ActivityInfluencedTID;
				$("snow_hendelse_radius_list").value = incident.DamageExtentTID;
				$("snow_hendelse_comment").value = incident.IncidentHeader +"." +incident.IncidentIngress;
			}
			
			var leggTilButton = jQuery("#snow_hendelse button");
			this.registerValidation(
					leggTilButton, 
					[
					 	new NonEmpty(jQuery("#snow_hendelse_comment")),
					]);
			
			
		}
};

jQuery.extend(snow_hendelse, super_validation);