
describe("Observations", function(){
	it("should fetch observations", function(){
		var observation = new ObservationFetcher();
		var callback = function(observations){
			console.log(observations);
		};
		observation.getObservations(callback);
	});
	
	it("should parse xml correctly", function(){
		 var entry = "<entry>\
						<id>http://h-web01.nve.no/stage_regobsservices/OData.svc/AllRegistrationsV(9862L)</id>\
						<title type='text'>02.10.2012 kl 00:00, Skredfaretegn, Ferske skred, . </title>\
						<link rel='alternate' href='http://h-web01.nve.no/stage_RegObsWeb/Registration?regId=5290'/>\
						<updated>02.10.2012 00:00:37</updated>\
						<author>\
							<name>Ukjent observatør</name>\
						</author>\
						<content type='xhtml'>\
							<div>\
							<strong>02.10.2012 kl 00:00, Skredfaretegn, Ferske skred, . </strong>\
							Snøobservasjon ved (Ingen varslingsregion/BÆRUM) av <i>Ukjent observatør</i>\
							</div>\
						</content>\
					</entry>";
		 
		 var fetcher = new ObservationFetcher();
		 var obsView = fetcher.entryToObservationView([entry]);
		 
		 var view = obsView[0];
		 expect(view.author).toEqual('Ukjent observatør');
		 expect(view.title).toEqual('02.10.2012 kl 00:00, Skredfaretegn, Ferske skred, .');
		 expect(view.updated).toEqual('02.10.2012 00:00:37');
		 expect(view.url).toEqual('http://h-web01.nve.no/stage_RegObsWeb/Registration?regId=5290'); 
		 expect(view.content.innerHTML.trim()).toEqual("<div>\
							<strong>02.10.2012 kl 00:00, Skredfaretegn, Ferske skred, . </strong>\
							Snøobservasjon ved (Ingen varslingsregion/BÆRUM) av <i>Ukjent observatør</i>\
							</div>");
	});		
	
	it("should render listofview", function(){
		var node = document.createElement("div");
		var list = [new ObservationView("aslak", "Test obs", "nå", "http://test.com", "<div><h1>hello world!</h1></div>")];
		
		var renderer = new ObservationViewRendrer(node, list);
		renderer.render();
		
		var li = jQuery(node).find("li")[0];
		expect(jQuery(li).text()).toEqual("Test obs");
	});
	
});
