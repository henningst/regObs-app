

class Validation
	registerValidation: (@button, @rules) ->
		
		allElements = @_fieldElements()
		jQuery.each( allElements, (i, e) =>
			jQuery(e).change( =>
				@validate()
			)
		)
		
		@validate()
		
	validate : ->
		status = @_validateAllRules()
		jQuery(@button).attr('disabled', !status)
		if(!status)
			jQuery(@button).fadeTo(0, .5)
		else
			jQuery(@button).fadeTo(0, 1)
		
		console.log("disable button: " + !status)
		
  
  
	_fieldElements : ->
  	elements = []
  	for rule in @rules
  			elements.push(rule.element)
  	
  	elements

	_validateAllRules : ->
		allRulesValidated = true
		for rule in @rules
			allRulesValidated = allRulesValidated && rule.isValidated()
			
		return allRulesValidated
		
class NonEmpty
	constructor : (@element) ->
	
	isValidated : ->
		allElementsValidated = true
		jQuery.each(@element, (index, e) ->
			thisElement = jQuery(e).val() && jQuery(e).val().length > 0 
			allElementsValidated = allElementsValidated && thisElement
		)
		
		allElementsValidated
		
class Selected
	constructor : (@element) ->
	
	isValidated : ->
		allElementsValidated = true
		jQuery.each(@element, (index, e) ->
			thisElement =jQuery(e).val() && jQuery(e).val() > 0
			allElementsValidated = allElementsValidated && thisElement
		)

		allElementsValidated
	
	
super_validation = new Validation()