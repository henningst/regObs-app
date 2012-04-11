
describe("Nve store", function(){
	var login = new Login("aslak@nlink.no", "aslak2aslak");
	it("should get insert a observation to regobs", function(){
		
		var location = new Location(null, 33, 103222, 6982346);
		runs(function(){
			this.store = new NveStore(login);
		})
		
		runs(function (){
			waitsFor(function(){ return this.store.isLoggedIn()}, "Logging inn", 10000)
			this.result = this.store.addObsLocation(location);
		})
		runs(function(){
			waitsFor(function(){ return this.result.ok }, "Loading the obslocation", 10000); 
		})

		runs(function(){
			expect(this.result.data).toNotBe(null);
			var obsLocation = this.result.data;
			expect(obsLocation.ObsLocationID).toBeGreaterThan(0)
		});
	});
	
	it("should be able to log in", function(){
		runs(function(){
			this.store = new NveStore(login);
		})
		runs(function(){
			waitsFor(function(){ return this.store.isLoggedIn(); }, "Logging in", 10000)
		})
		
		runs(function(){
			this.result = this.store.loggedInAs();
		})
		runs(function(){
			waitsFor(function(){ return this.result.ok }, "logged inn", 10000);
		})	
		runs(function(){
			console.log(this.result.data)
			expect(this.result.data.EMail).toBe(login.username)
		})
	});
});