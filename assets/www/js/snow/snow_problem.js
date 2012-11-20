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
			
			jQuery("#"+ id + " .snow_problem_content").html(Handlebars.templates.snow_problem());
		}
};

jQuery.extend(snow_problem, super_obs);

snow_problem_1 = snow_problem_2 = snow_problem_3 = snow_problem;