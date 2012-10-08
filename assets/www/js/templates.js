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
  buffer += escapeExpression(stack1) + "');\">\n        <button class=\"groupButton confirmButton w_button w_radius w_bg_light takeAllWidth\" >\n            <span class=\"ellipsisText\">Gruppe</span>\n        </button>\n        <input type=\"hidden\" class=\"selectedGroup\"/>\n      </div>\n  </div>\n  \n  <div class=\"groups hidden\"> </div>\n  \n  ";
  return buffer;});
templates['slider'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bigWidth\" style=\"margin: auto; padding-bottom: 20px;\">\n    <label for=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_time\" >Timer siden:</label>\n    <div style=\"padding-right: 20%;\">\n        <input type=\"text\" id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_time\" disabled=\"disabled\" class=\"border-less as-text\" /><span id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_unit\">t</span>\n        <input type=\"hidden\" id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_time_since\" />\n    </div>\n    <div id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "_slider\"></div>\n</div>";
  return buffer;});
templates['viewList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <li>";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</li>\n    ";
  return buffer;}

  buffer += "<ul>\n    ";
  stack1 = depth0.list;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</ul>";
  return buffer;});
})();