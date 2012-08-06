
describe("UserStore", function(){
	it("should save a user", function(){
			var user = new User("bruker", "pass");
			UserStore.save(NORMAL, user);
			
			var savedUser = UserStore.get(NORMAL);
			
			expect(savedUser.username).toEqual("bruker");
			expect(savedUser.password).toEqual("pass");
	});
	
	it("should clear a users login", function(){
		UserStore.save(NORMAL, new User("en", "to"));
		
		UserStore.clear(NORMAL);
		
		var user = UserStore.get(NORMAL);
		
		expect(user.username).toEqual("");
	});
	
	it("should keep different modes separated", function(){
		var one = new User("one user", "one pass");
		UserStore.save("One", one);
		var other = new User("other user", "other pass");
		UserStore.save("Other", other);
		
		var one_user = UserStore.get("One");
		var other_user = UserStore.get("Other");
		
		expect(one_user).toEqual(one);
		expect(other_user).toEqual(other);		
		
	});
	
	it("should mark a empty user/pass as undefined", function(){
		var user = UserStore.get("random");
		
		expect(user.isDefined()).toBe(false);
	});
	
	it("should mark a cleared user/pass as undefined", function(){
		UserStore.clear(NORMAL);	
		var user = UserStore.get(NORMAL);
		
		expect(user.isDefined()).toBe(false);
	});
	
	it("should mark a defined user as defined", function(){
		UserStore.save(NORMAL, new User("b", "p"));
		var user = UserStore.get(NORMAL);
		
		expect(user.isDefined()).toBe(true)
	});
});