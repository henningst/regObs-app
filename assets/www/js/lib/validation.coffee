

class Validation
  register: (@button, @rules) ->
    
    allElements = @_fieldElements()
    jQuery.each( allElements, (i, e) =>
      jQuery(e).keypress( =>
        setTimeout(()=> 
          @validate()
        , 200)
      )
      
      jQuery(e).change( =>
        setTimeout(()=> 
          @validate()
        , 200)
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
    
    status
  
  
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
      allElementsValidated = allElementsValidated == true && thisElement == true
      console.log("this element, all " + thisElement+ ", " + allElementsValidated)
    )
    
    allElementsValidated
    
class Selected
  constructor : (@element) ->
  
  isValidated : ->
    allElementsValidated = true
    jQuery.each(@element, (index, e) ->
      thisElement = jQuery(e).val() && jQuery(e).val() > 0
      allElementsValidated = allElementsValidated && thisElement
    )

    allElementsValidated
    
class AtLeastOneFilled
  constructor : (@element) ->
  
  isValidated : ->
    allElementsValidated = false
    jQuery.each(@element, (index, e) ->
      thisElement = jQuery(e).val() && jQuery(e).val().length > 0 
      allElementsValidated = allElementsValidated == true || thisElement == true
    )
    
    allElementsValidated
  
  
validation = new Validation()
