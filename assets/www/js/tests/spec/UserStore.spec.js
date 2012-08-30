var NORMAL_MODE = "NORMAL_MODE"
describe("UserStore", function(){
	it("should save a user", function(){
			var user = new User(1, "bruker", "pass");
			UserStore.save(NORMAL_MODE, user);
			
			var savedUser = UserStore.get(NORMAL_MODE);
			
			expect(savedUser.id).toEqual(1);
			expect(savedUser.username).toEqual("bruker");
			expect(savedUser.password).toEqual("pass");
			
			expect(savedUser.groups).toEqual([]);
	});
	
	it("should clear a users login", function(){
		UserStore.save(NORMAL_MODE, new User(1, "en", "to"));
		
		UserStore.clear(NORMAL_MODE);
		
		var user = UserStore.get(NORMAL_MODE);
		
		expect(user.username).toEqual("");
	});
	
	it("should keep different modes separated", function(){
		var one = new User(1, "one user", "one pass");
		UserStore.save("One", one);
		var other = new User(2, "other user", "other pass");
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
		UserStore.clear(NORMAL_MODE);	
		var user = UserStore.get(NORMAL_MODE);
		
		expect(user.isDefined()).toBe(false);
	});
	
	it("should mark a defined user as defined", function(){
		UserStore.save(NORMAL_MODE, new User(1, "b", "p"));
		var user = UserStore.get(NORMAL_MODE);
		
		expect(user.isDefined()).toBe(true);
	});
	
	it("should save groups", function(){
		var user = new User(1, "a", "p")
		user.groups = [new Group(1, "a"), new Group(2, "b")]
		
		UserStore.save(NORMAL_MODE, user);
		
		var fetched_user = UserStore.get(NORMAL_MODE);
		
		expect(fetched_user.groups.length).toEqual(2);
		expect(fetched_user.groups[0].name).toEqual("a")
		expect(fetched_user.groups[1].name).toEqual("b")
	});
});