var snow_evaluation = {
	shouldShowFooter : false,
	buttonText : "Velg utsatte retninger",
	problems : [],
		
	init: function(){
		$('header_middle_text').innerHTML = "Skredfarevurd.";
		
		jQuery("#snow_evaluation_utstrekning option").remove();
		jQuery.each(SNOW_EVALUATION_TEXT, function(i, obj){
			jQuery("#snow_evaluation_utstrekning").append("<option>" + obj + "</option>");
		});
		
		jQuery("#exposition").val("00000000");
		
		this.resetCounters();
	},
	
	resetCounters: function(){
		snow_page.resetCounter("snow_problem1_count");
		snow_page.resetCounter("snow_problem2_count");
		snow_page.resetCounter("snow_problem3_count");
		
		if(snow_evaluation.problems.length > 0)
			snow_page.check("snow_problem1_count")
		if(snow_evaluation.problems.length > 1)
			snow_page.check("snow_problem2_count")
		if(snow_evaluation.problems.length > 2)
			snow_page.check("snow_problem3_count")
	},
	
	deleteProblems: function(){
		snow_evaluation.problems = [];
	},
	
	
	expositionsCallbacks: {
			'NV' 	: function(on){jQuery('.expositions input[value="NV"]').toggleClass('pressed', on)},
			'N' 	: function(on){jQuery('.expositions input[value="N"]').toggleClass('pressed', on)},
			'NØ'	: function(on){jQuery('.expositions input[value="NØ"]').toggleClass('pressed', on)},
			'Ø'		: function(on){jQuery('.expositions input[value="Ø"]').toggleClass('pressed', on)},
			'SØ'	: function(on){jQuery('.expositions input[value="SØ"]').toggleClass('pressed', on)},
			'S'		: function(on){jQuery('.expositions input[value="S"]').toggleClass('pressed', on)},
			'SV'	: function(on){jQuery('.expositions input[value="SV"]').toggleClass('pressed', on)},
			'V'		: function(on){jQuery('.expositions input[value="V"]').toggleClass('pressed', on)},
			'*'		: function(text) {jQuery("#expositionButton").text(text.length > 0 ? text : snow_evaluation.buttonText ); }
	},
	
	addProblem: function(obs){
		snow_evaluation.problems.push(obs);
		snow_page.check("snow_problem"+ snow_evaluation.problems.length +"_count")
	},
	
	addEvaluation: function(){
		var comment = 				jQuery("#snow_evaluation_comment").val();
		var exposition = 			jQuery("#exposition").val();
		var avalancheDangerTID = 	jQuery("#snow_evaluation_danger_level").val();
		var utstrekning = 			jQuery("#snow_evaluation_utstrekning").val();
		
		if(utstrekning != "Ikke angitt"){
			comment = utstrekning + " " + comment
		}
		
		//(@RegID, @AvalancheEvaluation, @AvalancheDevelopment, @ValidExposition, @ExposedHeight1, @ExposedHeight2, @ExposedHeightComboTID, @ExposedClimateTID, @AvalancheDangerTID, @UsageFlagTID )->
		var obs = new AvalancheEvaluation2(0, comment, null, exposition, null, null, null, null, avalancheDangerTID, 0)
		
		snow_page.updateLocation(function(){
			jQuery("#snow_evaluation_comment").val("");
			jQuery("#exposition").val("00000000");
			var controller = new Exposition(jQuery("#exposition").val(), snow_evaluation.expositionsCallbacks);
			controller.refresh();
			jQuery("#snow_evaluation_danger_level").val(0);
			
			console.log("pp evaluation2 obs ", obs)
			main.store.getSnow().addObs(obs);
			
			for(var i = 0; i < snow_evaluation.problems.length; i++){
				var obsProblem = snow_evaluation.problems[i];
				obsProblem.AvalancheEvalProblemID = i;
				console.log("pp: adding problem ", obsProblem );
				main.store.getSnow().replaceObs(obsProblem);
			}
			snow_evaluation.problems = [];
			
			snow_page.resetCounter("snow_problem1_count");
			snow_page.resetCounter("snow_problem2_count");
			snow_page.resetCounter("snow_problem3_count");
			
			main.panels.slideBack();
		}, true);
	},
	
	pickExposition : function(){
		main.showDialogWithMessage("<div id='expositionButtons'>\
	            <table class='expositions'>\
	            <tr>\
	                <td><input class='w_button w_radius c_color_gradient' type='button' value='NV'     onclick='snow_evaluation.clickedExposition(this);'/></td>\
	                <td><input class='w_button w_radius c_color_gradient' type='button' value='N'      onclick='snow_evaluation.clickedExposition(this);'/></td>\
	                <td><input class='w_button w_radius c_color_gradient' type='button' value='NØ'     onclick='snow_evaluation.clickedExposition(this);'/></td>\
	            </tr>\
	            <tr>\
	                <td><input class='w_button w_radius c_color_gradient' type='button' value='V'      onclick='snow_evaluation.clickedExposition(this);'/></td>\
	                <td><input class='w_button w_radius c_color_gradient' type='button' value='Alle'   onclick='snow_evaluation.clickedAllExpositions();'/></td>\
	                <td><input class='w_button w_radius c_color_gradient' type='button' value='Ø'      onclick='snow_evaluation.clickedExposition(this);'/></td>\
	            </tr>\
	            <tr>\
	                <td><input class='w_button w_radius c_color_gradient' type='button' value='SV'     onclick='snow_evaluation.clickedExposition(this);'/></td>\
	                <td><input class='w_button w_radius c_color_gradient' type='button' value='S'      onclick='snow_evaluation.clickedExposition(this);'/></td>\
	                <td><input class='w_button w_radius c_color_gradient' type='button' value='SØ'     onclick='snow_evaluation.clickedExposition(this);'/></td>\
	            </tr>\
	        </table>\
	    </div>", "Velg rettning");
		var controller = new Exposition(jQuery("#exposition").val(), snow_evaluation.expositionsCallbacks);
		controller.refresh();
	},
	
	clickedAllExpositions: function(){
		jQuery("#exposition").val("11111111");
		var controller = new Exposition(jQuery("#exposition").val(), snow_evaluation.expositionsCallbacks);
		controller.refresh();
	},
	
	clickedExposition : function(obj){
		var exposition = jQuery(obj).attr("value");
		var controller = new Exposition(jQuery("#exposition").val(), snow_evaluation.expositionsCallbacks);
		controller.toggle(exposition);
		jQuery("#exposition").val(controller.toString());
		
		controller.refresh();
	},
};

jQuery.extend(snow_evaluation, super_obs);