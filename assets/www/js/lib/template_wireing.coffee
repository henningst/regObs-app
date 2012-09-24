
class TemplateWireingFunctions
  insertSlider: (id, name) ->
    placeholder = jQuery("#" + id)
    placeholder.html(Handlebars.templates.slider({name: name}))
      
    jQuery( "##{name}_slider" ).slider(
        value: 0
        min:  0
        max: 14
        step: 1 
        slide: ( event, ui ) ->
          hours = Math.round(Math.exp(ui.value/3))
          jQuery("##{name}_time_since").val(hours)
          display = hours
          jQuery("##{name}_unit").text("t")
          if(hours > 24)
            display = Math.round((hours / 24) * 10)/10
            jQuery("##{name}_unit").text("d")
          
          jQuery( "##{name}_time" ).val(display) 
      )
      jQuery( "##{name}_unit").text("t")
      jQuery( "##{name}_time" ).val(0)
      jQuery( "##{name}_time_since" ).val(0)


TemplateWireing = new TemplateWireingFunctions
