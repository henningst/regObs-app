

class Validation
	registerValidation: (@fields, @button, @rules) ->
		jQuery(@fields).change( =>
			@validate()
		)
		
	validate : ->
		status = @_validateAllRules()
		jQuery(@button).attr('disabled', !status)
		console.log("validation status " + !status)
		
	_validateAllRules : ->
		allIsTrue = true
		for rule in @rules
			allIsTrue = allIsTrue && rule.isValidated()
			
		console.log("all rules are "+ allIsTrue)
		allIsTrue
		
class NonEmpty
	constructor : (@element) ->
	
	isValidated : ->
		allIsTrue = true
		jQuery.each(@element, (index, e) ->
			thisElement = jQuery(e).val().length > 0
			console.log("this element " + thisElement);
			allIsTrue = allIsTrue && thisElement
		)
		
		allIsTrue
	
	
super_validation = new Validation()