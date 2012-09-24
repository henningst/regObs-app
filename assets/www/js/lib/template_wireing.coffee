
class TemplateWireingFunctions
  insertSlider: (placeholderId, namespace) ->
    placeholder = jQuery("##{placeholderId}")
    placeholder.html(Handlebars.templates.slider({name: namespace}))
      
    jQuery( "##{namespace}_slider" ).slider(
        value: 0
        min:  0
        max: 14
        step: 1 
        slide: ( event, ui ) ->
          hours = Math.round(Math.exp(ui.value/3))
          jQuery("##{namespace}_time_since").val(hours)
          display = hours
          jQuery("##{namespace}_unit").text("t")
          if(hours > 24)
            display = Math.round((hours / 24) * 10)/10
            jQuery("##{namespace}_unit").text("d")
          
          jQuery( "##{namespace}_time" ).val(display) 
      )
      jQuery( "##{namespace}_unit").text("t")
      jQuery( "##{namespace}_time" ).val(0)
      jQuery( "##{namespace}_time_since" ).val(0)


TemplateWireing = new TemplateWireingFunctions
