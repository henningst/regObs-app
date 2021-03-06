var dirt_hendelse = {
		shouldShowFooter : false,
		fill_activity_influenced: function(data) {
			if(data == null)
				return;
			
			var options = jQuery("#dirt_hendelse_activity_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
				if(this.ActivityInfluencedTID > 199 && this.ActivityInfluencedTID < 300)
					options.append(jQuery("<option />").val(this.ActivityInfluencedTID).text(this.ActivityInfluencedName));
			});
		},
		
		fill_radius: function(data) {
			var options = jQuery("#dirt_hendelse_radius_list");
			
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
			    options.append(jQuery("<option />").val(this.DamageExtentTID).text(this.DamageExtentName));
			});
		},
		
		afterSendRegistration: function() {
			$("dirt_hendelse_activity_list").selectedIndex = 0;
			$("dirt_hendelse_radius_list").selectedIndex = 0;
			$("dirt_hendelse_comment").value = "";
		},
		
		addHendelse: function() {
			//save hendelse

			if($("dirt_hendelse_comment").value == "")
			{
				main.showDialogWithMessage(HENDELSE_ERROR);
				return;
			}
			
			var string = $("dirt_hendelse_comment").value;
			var index = string.indexOf('.', 0);
			
			var header = string;
			var rest = "";
			if(index != -1) {
				header = string.substr(0,index);
				rest = string.substr(index+1);
			}

			var activityList = $("dirt_hendelse_activity_list");
			var radiusList = $("dirt_hendelse_radius_list");
			
			var incident = new Incident(
					null, 
					DIRT_GEO_HAZARD, 
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
			
			dirt_page.updateLocation(function(){
				main.store.getDirt().setIncident(incident);
				main.panels.slideBack();			
			},true);
			
			dirt_page.check("dirt_hendelse_count");
		},
		
		init: function() {
			$('header_middle_text').innerHTML = "Hendelse";
			
			//restore old incident if available
			var incident = main.store.getDirt().getIncident();
			
			if(incident != null) {
				$("dirt_hendelse_activity_list").value = incident.ActivityInfluencedTID;
				$("dirt_hendelse_radius_list").value = incident.DamageExtentTID;
				$("dirt_hendelse_comment").value = incident.IncidentHeader +"." +incident.IncidentIngress;
			}
			
			var leggTilButton = jQuery("#dirt_hendelse button.add");
			validation.register(
					leggTilButton, 
					[
					 	new NonEmpty(jQuery("#dirt_hendelse_comment")),
					]);
			
		}
};

jQuery.extend(dirt_hendelse, super_obs);

