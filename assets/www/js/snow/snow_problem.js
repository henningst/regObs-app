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
			
			
			var _this = this;
			jQuery("#"+ id + " .snow_problem_content").html(Handlebars.templates.snow_problem({
					"sannsynlighet": _this.AvalProbabilityKD,
					"tilleggsbelastning" : _this.AvalTriggerSimpleKD,
					"storrelse" :  _this.DestructiveSizeExtKD,
					"plassering" : _this.AvalReleaseHeightKD
				}	
			));
			
			this.fillDropdown(id, "problem_1", snow_problem.AvalancheExtKD);
			var _this = this;
			jQuery("#" + id + " .problem_1").change(function(){
				_this.fillDropdown(id, "problem_2", _this.filter(snow_problem.AvalCauseKD, snow_problem.AvalancheProblemMenu1V, jQuery(this).val()));
				_this.fillDropdown(id, "problem_3", _this.filter(snow_problem.AvalCauseExtKD, snow_problem.AvalancheProblemMenu2V, jQuery("#" + id + " .problem_2").val()));
			});
			
			jQuery("#" + id + " .problem_2").change(function(){
				_this.fillDropdown(id, "problem_3", _this.filter(snow_problem.AvalCauseExtKD, snow_problem.AvalancheProblemMenu2V, jQuery(this).val()));
			});
			
			main.setScrollerHeights();
			main.resetHeights();
		},
		
		addProblem : function(page_id){
			var page = jQuery("#" +page_id);

			var problem_1 = jQuery(page).find(".problem_1").val();
			var problem_2 = jQuery(page).find(".problem_2").val();
			var problem_3 = jQuery(page).find(".problem_3").val();
			
			var sansynlighet = jQuery(page).find(".sannsynlighet").val();
			var tileggsbelastning = jQuery(page).find(".tilleggsbelastning").val();
			var storrelse = jQuery(page).find(".storrelse").val();
			
			var plassering = jQuery(page).find(".plassering").val();
			
			//console.log(problem_1, problem_2, problem_3, sansynlighet, tileggsbelastning, storrelse, plassering);
			
			//(@RegID, @AvalancheEvalProblemID, @AvalProbabilityTID, @AvalTriggerSimpleTID, @DestructiveSizeExtTID, @AvalancheExtTID, @AvalCauseTID, @AvalReleaseHeightTID, @Comment) ->
			
			var obs = new AvalancheEvalProblem(
						0, 0, parseInt(sansynlighet), 
						parseInt(tileggsbelastning), parseInt(storrelse), parseInt(problem_1), 
						parseInt(problem_2), parseInt(plassering), null);
			console.log("pp: obs " + JSON.stringify(obs));
			
			jQuery(page).find("select").val(0);
			
			console.log("adding obs ", obs);
			snow_evaluation.addProblem(obs);
			main.panels.slideBack();
		},
		
		abort : function(button){
			
		},
		
		filter: function(list, inputOutput, currentVal){
			console.log("pp: current val " + parseInt(currentVal))
			var allowedRows = jQuery.grep(inputOutput, function(element){
				return element.input === parseInt(currentVal);
			});
			console.log("pp: allowedRows " , allowedRows);
			
			var allowedValues = jQuery.map(allowedRows, function(element){
				return element.output;
			});
			
			console.log("pp: allowed values", allowedValues);
			
			var returning = jQuery.grep(list, function(element){
				return jQuery.inArray(element.value, allowedValues) >= 0;
			});
			console.log("pp: filtered list", returning);
			return returning;
		},
		
		fillDropdown: function(id, selectClass, list){
			jQuery("#" +id + " ."+ selectClass +" option").remove()
			jQuery.each(list, function(i, obj){
				jQuery("#" +id + " ." + selectClass).append("<option value='"+ obj.value +"'>" + obj.name + "</option>");
			})
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
		
		holdAvalancheProblemMenu1V : function(data){
			snow_problem.AvalancheProblemMenu1V = jQuery.map(data.results, function(o) {
				return { 
					input: o.AvalancheExtTID, 
					output: o.AvalCauseTID
				};
			});
		}, 
		
		holdAvalancheProblemMenu2V : function(data){
			snow_problem.AvalancheProblemMenu2V = jQuery.map(data.results, function(o) {
				return { 
					input: o.AvalCauseTID, 
					output: o.AvalCauseExtTID
				};
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
		
		holdAvalCauseExtKD: function(data){
			snow_problem.AvalCauseExtKD = jQuery.map(data.results, function(o) {
				return {value: o.AvalCauseExtTID, name : o.AvalCauseExtName };
			});
		},
		holdAvalCauseKD: function(data){
			snow_problem.AvalCauseKD = jQuery.map(data.results, function(o) {
				return {value: o.AvalCauseTID, name : o.AvalCauseName };
			});
		},
		holdAvalancheExtKD: function(data){
			snow_problem.AvalancheExtKD = jQuery.map(data.results, function(o) {
				return {value: o.AvalancheExtTID, name : o.AvalancheExtName };
			});
		},

		
		
};

jQuery.extend(snow_problem, super_obs);

snow_problem_1 = snow_problem_2 = snow_problem_3 = snow_problem;