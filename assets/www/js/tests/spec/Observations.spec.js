

describe("Observations", function(){
	it("should fetch observations", function(){
		main = {resetHeights: function(){}, getObservationSearchDiameter: function(){return 10000;}};
		var observation = new ObservationFetcher(new AllRegistrationsVUrlGenerator({}, 10));
		var callback = function(observations){
			console.log(observations);
		};
		observation.getObservations(callback);
	});
	
	it("should parse xml correctly", function(){
		 var entry = {
	               "__metadata":
	               {
	                   "uri": "http://h-web01.nve.no/stage_regobsservices/OData.svc/AllRegistrationsV(9862L)",
	                   "type": "RegObsModel.AllRegistrationsV"
	               },
	               "RadNummer": "9862",
	               "RegID": 5290,
	               "DtObsTime": "/Date(1349136037267)/",
	               "DtRegTime": "/Date(1349136066970)/",
	               "Kommunenr": "0219",
	               "Kommunenavn": "BÆRUM",
	               "ForecastRegionTID": 0,
	               "ForecastRegionName": "Ingen varslingsregion",
	               "LocationName": "",
	               "ObserverGroupName": null,
	               "NickName": "Ukjent observatør",
	               "CompetenceLevelTID": 0,
	               "CompetenceLevelName": "Helt ukjent",
	               "GeoHazardTID": 10,
	               "GeoHazardName": "Snø",
	               "RegistrationTID": 24,
	               "RegistrationName": "Skredfaretegn",
	               "TypicalValue1": "Ferske skred ",
	               "TypicalValue2": " ",
	               "LangKey": 1,
	               "ObserverId": 105,
	               "LocationID": 3714,
	               "UTMZone": 33,
	               "UTMEast": 248666,
	               "UTMNorth": 6651945
	           };
		 var fetcher = new ObservationFetcher();
		 var obsView = fetcher.entryToObservationView([entry]);
		 
		 var view = obsView[0];
		 expect(view.author).toEqual('Ukjent observatør');
		 expect(view.updated).toEqual('02.10.2012 00:00:37');
		 expect(view.url).toEqual('http://h-web01.nve.no/stage_RegObsWeb/Registration?regId=5290'); 
		 expect(view.content).toEqual({string :"<strong>02.10.2012 kl 00:00, Skredfaretegn, Ferske skred, . </strong>\
							Snøobservasjon ved (Ingen varslingsregion/BÆRUM) av <i>Ukjent observatør</i>"});
	});		
	
	it("should render listofview", function(){
		main = {resetHeights: function(){}};
		var node = document.createElement("div");
		var list = [new ObservationView("aslak", "Test obs", "nå", "http://test.com", "<div><h1>hello world!</h1></div>")];
		
		var renderer = new ObservationViewRendrer(node, list);
		renderer.render();
		
		var li = jQuery(node).find("li");
		expect(jQuery(li).text()).toEqual("<strong>02.10.2012 kl 00:00, Skredfaretegn, Ferske skred, . </strong>\
							Snøobservasjon ved (Ingen varslingsregion/BÆRUM) av <i>Ukjent observatør</i>");
	});
	
});
