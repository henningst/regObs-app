function ActivityInfluenced(id, name) 
{
	this.id		= id;
	this.name	= name;	
}

var snow_hendelse = {
		
		fill_activity_influenced: function(data) {
			var list = $("snow_hendelse_activity_list");
			var i=0;
			for (i = 0; i < data.results.length; i++)
			{
				if(data.results[i].ActivityInfluencedTID < 200)
					list.add(new Option(data.results[i].ActivityInfluencedName, data.results[i].ActivityInfluencedTID));	
			}
		},
		
		fill_radius: function(data) {
			var list = $("snow_hendelse_radius_list");
			var i=0;
			for (i = 0; i < data.results.length; i++)
			{
				list.add(new Option(data.results[i].DamageExtentName, data.results[i].DamageExtentTID));	
			}
		},
		
		afterSendRegistration: function() {
			$("snow_hendelse_activity_list").selectedIndex = 0;
			$("snow_hendelse_radius_list").selectedIndex = 0;
			$("snow_hendelse_comment").value = "";
		},
		
		addHendelse: function() {
	
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
			var incident = main.store.getIncident();
			
			if(incident != null) {
				$("snow_hendelse_activity_list").selectedIndex = incident.ActivityInfluencedTID;
				$("snow_hendelse_radius_list").selectedIndex = incident.DamageExtentTID;
				$("snow_hendelse_comment").value = incident.IncidentHeader +"." +incident.IncidentIngress;
			}
		}
}