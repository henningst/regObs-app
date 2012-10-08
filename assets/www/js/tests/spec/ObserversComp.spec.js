

describe("Observer comp", function(){
	it("should fetchdata, and find level", function(){
		var user = {userId: 188};
		var response = {"results":[
		        {"__metadata":{"uri":"http://h-web01.nve.no/test_regobsservices/OData.svc/ObserverHazardsComp(GeoHazardTID=10,ObserverID=188)","type":"RegObsModel.ObserverHazardsComp"},
		        	"ObserverID":188,"GeoHazardTID":10,"CompetenceLevelTID":141,"Observer":{"__deferred":{"uri":"http://h-web01.nve.no/test_regobsservices/OData.svc/ObserverHazardsComp(GeoHazardTID=10,ObserverID=188)/Observer"}}},
				{"__metadata":{"uri":"http://h-web01.nve.no/test_regobsservices/OData.svc/ObserverHazardsComp(GeoHazardTID=20,ObserverID=188)","type":"RegObsModel.ObserverHazardsComp"},
					"ObserverID":188,"GeoHazardTID":20,"CompetenceLevelTID":201,"Observer":{"__deferred":{"uri":"http://h-web01.nve.no/test_regobsservices/OData.svc/ObserverHazardsComp(GeoHazardTID=20,ObserverID=188)/Observer"}}},
				{"__metadata":{"uri":"http://h-web01.nve.no/test_regobsservices/OData.svc/ObserverHazardsComp(GeoHazardTID=70,ObserverID=188)","type":"RegObsModel.ObserverHazardsComp"},
					"ObserverID":188,"GeoHazardTID":70,"CompetenceLevelTID":710,"Observer":{"__deferred":{"uri":"http://h-web01.nve.no/test_regobsservices/OData.svc/ObserverHazardsComp(GeoHazardTID=70,ObserverID=188)/Observer"}}}
			]};
		
		
		var command = new ObserversCompCommand(user);
		command.gotData(response);
		
		var competancy = new ObserverCompetancy(command.comps);
		
		expect(competancy.length()).toEqual(3);
		expect(competancy.getLevel(10)).toEqual(141);
	});
	
});