
describe("Observer groups", function(){
	it("should fetchdata", function(){
		TEST_LOGIN = "http://h-web01.nve.no/stage_RegObsServices/Authentication_JSON_AppService.axd/";
		SERVER_LOGIN_URL = TEST_LOGIN;
		
		TEST = "http://h-web01.nve.no/test_regobsservices/Odata.svc/";
		SERVER_URL = TEST;

	
		Login("aslakjo@gmail.com" , " aslak ", function(){
	
			var user = {userId: 188};
			var command = new ObserversGroupsCommand(user);
			
			command.fetch(function(groups){
			
				console.log(command.groups);
				expect(command.groups.length).toEqual(2);
				expect(command.groups[0].name).toEqual("ABC");
			});
		});
	});
	
});