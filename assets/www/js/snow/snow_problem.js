var snow_problem = {
		shouldShowFooter: false,
		
		expositionsCallbacks: {
				'NV' 	: function(on){jQuery('.expositions input[value="NV"]').toggleClass('pressed', on)},
				'N' 	: function(on){jQuery('.expositions input[value="N"]').toggleClass('pressed', on)},
				'NØ'	: function(on){jQuery('.expositions input[value="NØ"]').toggleClass('pressed', on)},
				'Ø'		: function(on){jQuery('.expositions input[value="Ø"]').toggleClass('pressed', on)},
				'SØ'	: function(on){jQuery('.expositions input[value="SØ"]').toggleClass('pressed', on)},
				'S'		: function(on){jQuery('.expositions input[value="S"]').toggleClass('pressed', on)},
				'SV'	: function(on){jQuery('.expositions input[value="SV"]').toggleClass('pressed', on)},
				'V'		: function(on){jQuery('.expositions input[value="V"]').toggleClass('pressed', on)},
		},
		
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
			
			main.setScrollerHeights();
			main.resetHeights();
		},
		
		pickExposition : function(){
			main.showDialogWithMessage("<div id='expositionButtons'>\
		            <table class='expositions'>\
		            <tr>\
		                <td><input class='w_button w_radius c_color_gradient' type='button' value='NV'     onclick='snow_problem.clickedExposition(this);'/></td>\
		                <td><input class='w_button w_radius c_color_gradient' type='button' value='N'      onclick='snow_problem.clickedExposition(this);'/></td>\
		                <td><input class='w_button w_radius c_color_gradient' type='button' value='NØ'     onclick='snow_problem.clickedExposition(this);'/></td>\
		            </tr>\
		            <tr>\
		                <td><input class='w_button w_radius c_color_gradient' type='button' value='V'      onclick='snow_problem.clickedExposition(this);'/></td>\
		                <td><input class='w_button w_radius c_color_gradient' type='button' value='Alle'   onclick='snow_problem.clickedAllExpositions();'/></td>\
		                <td><input class='w_button w_radius c_color_gradient' type='button' value='Ø'      onclick='snow_problem.clickedExposition(this);'/></td>\
		            </tr>\
		            <tr>\
		                <td><input class='w_button w_radius c_color_gradient' type='button' value='SV'     onclick='snow_problem.clickedExposition(this);'/></td>\
		                <td><input class='w_button w_radius c_color_gradient' type='button' value='S'      onclick='snow_problem.clickedExposition(this);'/></td>\
		                <td><input class='w_button w_radius c_color_gradient' type='button' value='SØ'     onclick='snow_problem.clickedExposition(this);'/></td>\
		            </tr>\
		        </table>\
		    </div>", "Velg rettning");
			var controller = new Exposition(jQuery("#exposition").val(), snow_problem.expositionsCallbacks);
			controller.refresh();
		},
		
		clickedAllExpositions: function(){
			jQuery("#exposition").val("11111111");
			var controller = new Exposition(jQuery("#exposition").val(), snow_problem.expositionsCallbacks);
			controller.refresh();
		},
		
		clickedExposition : function(obj){
			var exposition = jQuery(obj).attr("value");
			var controller = new Exposition(jQuery("#exposition").val(), snow_problem.expositionsCallbacks);
			controller.toggle(exposition);
			jQuery("#exposition").val(controller.toString());
			
			controller.refresh();
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