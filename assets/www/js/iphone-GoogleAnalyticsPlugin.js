function GoogleAnalyticsPlugin() {}

//GoogleAnalyticsPlugin.prototype.startTrackerWithAccountID = function(id) {
//	PhoneGap.exec("GoogleAnalyticsPlugin.startTrackerWithAccountID",id);
//};

GoogleAnalyticsPlugin.prototype.start = function(id) {
	PhoneGap.exec("GoogleAnalyticsPlugin.startTrackerWithAccountID",id);
};

GoogleAnalyticsPlugin.prototype.trackPageView = function(pageUri) {
	PhoneGap.exec("GoogleAnalyticsPlugin.trackPageview",pageUri);
};

GoogleAnalyticsPlugin.prototype.trackEvent = function(category,action,label,value) {
	var options = {category:category,
		action:action,
		label:label,
		value:value};
	PhoneGap.exec("GoogleAnalyticsPlugin.trackEvent",options);
};

GoogleAnalyticsPlugin.prototype.setCustomVariable = function(index,name,value) {
	var options = {index:index,
		name:name,
		value:value};
	PhoneGap.exec("GoogleAnalyticsPlugin.setCustomVariable",options);
};

GoogleAnalyticsPlugin.prototype.hitDispatched = function(hitString) {
	//console.log("hitDispatched :: " + hitString);
};
GoogleAnalyticsPlugin.prototype.trackerDispatchDidComplete = function(count) {
	//console.log("trackerDispatchDidComplete :: " + count);
};

window.analytics = new GoogleAnalyticsPlugin();
