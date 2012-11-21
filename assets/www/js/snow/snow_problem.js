var snow_problem = {
		shouldShowFooter: false,
		
		init: function(id){
			var problemId = 1;
			switch(id){
			case "snow_problem_1": problemId = 1; break;
			case "snow_problem_2": problemId = 2; break;
			case "snow_problem_3": problemId = 3; break;
			}
			$('header_middle_text').innerHTML = "Problem " + problemId;
			
			jQuery("#exposition").val("00000000");
			
			var _this = this;
			jQuery("#"+ id + " .snow_problem_content").html(Handlebars.templates.snow_problem({
					"sannsynlighet": _this.AvalProbabilityKD,
					"tilleggsbelastning" : _this.AvalTriggerSimpleKD,
					"storrelse" :  _this.DestructiveSizeExtKD,
					"plassering" : _this.AvalReleaseHeightKD
				}	
			));
			
			main.setScrollerHeights();
			main.resetHeights();
		},
		
		
		

		fillAvalancheDangerKD: function(data){
			if(data == null)
				return;
			
			var options = jQuery("#snow_evaluation_danger_level");
			//remove if previously inserted
			jQuery.each(options, function() {jQuery(this).find('option').remove()});
			
			jQuery.each(data.results, function() {
				options.append(jQuery("<option />").val(this.AvalancheDangerTID).text(this.AvalancheDangerName));
			});
		},
		
		holdAvalProbabilityKD: function(data){
			snow_problem.AvalProbabilityKD = jQuery.map(data.results, function(o) {
				return { 
					value: o.AvalProbabilityTID, 
					name : o.AvalProbabilityName
				};
			});
		},
		holdAvalTriggerSimpleKD: function(data){
			snow_problem.AvalTriggerSimpleKD = jQuery.map(data.results, function(o) {
				return {value: o.AvalTriggerSimpleTID, name : o.AvalTriggerSimpleName};
			});
		},
		holdDestructiveSizeExtKD: function(data){
			snow_problem.DestructiveSizeExtKD = jQuery.map(data.results, function(o) {
				return {value: o.DestructiveSizeExtTID, name : o.DestructiveSizeExtName};
			});
		},
		holdAvalReleaseHeightKD: function(data){
			snow_problem.AvalReleaseHeightKD = jQuery.map(data.results, function(o) {
				return {value: o.AvalReleaseHeightTID, name : o.AvalReleaseHeighName };
			});
		},

		
		
};

jQuery.extend(snow_problem, super_obs);

snow_problem_1 = snow_problem_2 = snow_problem_3 = snow_problem;