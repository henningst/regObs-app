(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['fullView'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div style=\"width: 300px; height: 400px; overflow:hidden; \">\n	<div class=\"iframeScroller\">\n	  <div class=\"scrollable\" id=\"iframeScrollerPane\">\n	    <div style=\"width: 3000px; height: 4000px; float:left; border: 2px solid red\">\n	       <iframe src=\"";
  foundHelper = helpers.url;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\"></iframe>\n	    </div>\n	  </div>\n	</div>\n</div>\n";
  return buffer;});
templates['sendGroup'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"sendGroup c_color_gradient\">\n        <div class=\"span2 spanPadding\">\n          <button class=\"confirmButton w_button w_radius w_bg_light takeAllWidth\" onclick=\"main.warnLoginBefore('";
  foundHelper = helpers.sendFunction;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.sendFunction; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "')\">\n           Send inn\n        </button> \n            <span class=\"numPackages notification_buble onTopOfButton hidden\">0</span>\n      </div>\n      \n      <div class=\"groups-list span1\" onclick=\"main.attachToGroup('";
  foundHelper = helpers.hazard;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.hazard; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "');\">\n        <button class=\"groupButton confirmButton w_button w_radius w_bg_light takeAllWidth\" >\n            <span class=\"ellipsisText\">Gruppe</span>\n        </button>\n        <input type=\"hidden\" class=\"selectedGroup\"/>\n      </div>\n  </div>\n  \n  <div class=\"groups hidden\"> </div>\n  \n  ";
  return buffer;});
templates['slider'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"bigWidth\" style=\"margin: auto; padding-bottom: 20px;\">\n    <label for=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "_time\" >Timer siden:</label>\n    <div style=\"padding-right: 20%;\">\n        <input type=\"text\" id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "_time\" disabled=\"disabled\" class=\"border-less as-text\" /><span id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "_unit\">t</span>\n        <input type=\"hidden\" id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "_time_since\" />\n    </div>\n    <div id=\"";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "_slider\"></div>\n</div>";
  return buffer;});
templates['snow_problem'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <option value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n    ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <option value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n    ";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <option value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n    ";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n        <option value=\"";
  foundHelper = helpers.value;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.value; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</option>\n    ";
  return buffer;}

  buffer += "<a class=\"learning_icon\" onclick=\"main.panels.slideTo('learning_page')\"><img src=\"img/get_info.png\" height=\"25px\" width=\"25px\" /></a>\n<br/>\n<label>Legg til skredproblem:</label>\n<select class=\"problem_1 bigWidth w_select c_selectBox\" style=\"padding-bottom: 20px; margin-bottom: 20px;\">\n    <option>Skredtype 1</option>\n</select>\n<select class=\"problem_2 bigWidth w_select c_selectBox\" style=\"padding-bottom: 20px; margin-bottom: 20px;\">\n    <option>Aventer valg</option>\n</select>\n\n<select class=\"problem_3 bigWidth w_select c_selectBox\" style=\"padding-bottom: 20px; margin-bottom: 20px;\">\n    <option>Aventer valg</option>\n</select>\n\n<label>Legg til sannsynlighet:</label>\n<select class=\"sannsynlighet bigWidth w_select c_selectBox\" style=\"padding-bottom: 20px; margin-bottom: 20px;\">\n    ";
  stack1 = depth0.sannsynlighet;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n<label>Tilleggsbelastning:</label>\n<select class=\"tilleggsbelastning bigWidth w_select c_selectBox\" style=\"padding-bottom: 20px; margin-bottom: 20px;\">\n    ";
  stack1 = depth0.tilleggsbelastning;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n<label>Størrelse:</label>\n<select class=\"storrelse bigWidth w_select c_selectBox\" style=\"padding-bottom: 20px; margin-bottom: 20px;\">\n    ";
  stack1 = depth0.storrelse;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n\n<label>Legg til plassering i snødekket:</label>\n<select class=\"plassering bigWidth w_select c_selectBox\" style=\"padding-bottom: 20px; margin-bottom: 20px;\">\n    ";
  stack1 = depth0.plassering;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</select>\n\n<div class=\"scrollSpacer\"></div>";
  return buffer;});
templates['viewList'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, blockHelperMissing=helpers.blockHelperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"top_button\">\n      <input type=\"button\" class=\"w_bg_light c_button fullWidth w_button\" value=\"Se obs. fra andre steder\" onclick=\"";
  stack1 = typeof depth0 === functionType ? depth0.apply(depth0) : depth0;
  buffer += escapeExpression(stack1) + "\" />\n    </div>\n";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n		        <li class=\"w_list_item w_border_bottom w_bg_light\" data-url=\"";
  foundHelper = helpers.url;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.url; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		          <div class=\"list_element\">\n		           ";
  foundHelper = helpers.content;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\n		          </div>\n		        </li>\n		    ";
  return buffer;}

function program5(depth0,data) {
  
  
  return "\n<div class=\"loading popup c_color_gradient\">\n    Ingen observasjoner funnet\n</div>\n";}

  buffer += "<div class=\"spacer\"></div>\n";
  foundHelper = helpers.map_handler;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  else { stack1 = depth0.map_handler; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.map_handler) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(1, program1, data),data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"pageScroller full\" id=\"";
  foundHelper = helpers.scrollerid;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.scrollerid; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">\n		<ul class=\"w_list scrollable\" >\n		    ";
  stack1 = depth0.list;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n</div>\n\n";
  foundHelper = helpers.list;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},inverse:self.program(5, program5, data),fn:self.noop,data:data}); }
  else { stack1 = depth0.list; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  stack2 = {};
  if (!helpers.list) { stack1 = blockHelperMissing.call(depth0, stack1, {hash:stack2,inverse:self.program(5, program5, data),fn:self.noop,data:data}); }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;});
})();