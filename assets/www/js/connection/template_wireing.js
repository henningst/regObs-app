// Generated by CoffeeScript 1.3.3
var TemplateWireing, TemplateWireingFunctions;

TemplateWireingFunctions = (function() {

  function TemplateWireingFunctions() {}

  TemplateWireingFunctions.prototype.insertSlider = function(id, name) {
    var placeholder;
    placeholder = jQuery("#" + id);
    placeholder.html(Handlebars.templates.slider({
      name: name
    }));
    jQuery("#" + name + "_slider").slider({
      value: 0,
      min: 0,
      max: 14,
      step: 1,
      slide: function(event, ui) {
        var display, hours;
        hours = Math.round(Math.exp(ui.value / 3));
        jQuery("#" + name + "_time_since").val(hours);
        display = hours;
        jQuery("#" + name + "_unit").text("t");
        if (hours > 24) {
          display = Math.round((hours / 24) * 10) / 10;
          jQuery("#" + name + "_unit").text("d");
        }
        return jQuery("#" + name + "_time").val(display);
      }
    });
    jQuery("#" + name + "_unit").text("t");
    jQuery("#" + name + "_time").val(0);
    return jQuery("#" + name + "_time_since").val(0);
  };

  return TemplateWireingFunctions;

})();

TemplateWireing = new TemplateWireingFunctions;
