(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['sendGroup'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"sendGroup c_color_gradient\">\n        <div class=\"span2 spanPadding\">\n          <button class=\"confirmButton w_button w_radius w_bg_light takeAllWidth\" onclick=\"main.warnLoginBefore('";
  foundHelper = helpers.sendFunction;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sendFunction; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "')\">\n           Send inn\n        </button> \n            <span class=\"numPackages notification_buble onTopOfButton hidden\">0</span>\n      </div>\n      \n      <div class=\"groups-list span1\" onclick=\"main.attachToGroup('";
  foundHelper = helpers.hazard;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.hazard; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "');\">\n        <button class=\"groupButton confirmButton w_button w_radius w_bg_light takeAllWidth\" >\n            <span class=\"ellipsisText\">Gruppe</span>\n        </button>\n        <input type=\"hidden\" class=\"selectedGroup\"/>\n      </div>\n  </div>\n  \n  <div class=\"groups hidden\"> </div>";
  return buffer;});
})();