
describe("Package collection", function(){
	it("save packages", function(){
			var collection = new PackageCollection();
			var pack = {freeze : false}; 
			
			collection.add(pack);
			
			expect(collection.size()).toEqual(1);
	});
	
	it("should retrive the correct one", function(){
		var collection = new PackageCollection();
		var pack = {freezed : false, name: "test"};
		var otherPack = {freezed : false, name: "other"};

		collection.add(pack);
		collection.add(otherPack);
		
		var retreived = collection.get(pack.name);
		expect(retreived).toEqual(pack);
	});
	
	it("should do work for all the packages", function(){
		var collection = new PackageCollection();
		var pack1 = {freezed : true, name: "one"};
		var pack2 = {freezed : true, name: "two"};
		var pack3 = {freezed : true, name: "tree"};
		
		collection.add(pack1);
		collection.add(pack2);
		collection.add(pack3);
		
		var found = [];
		collection.forall(function(pack){
			found.push(pack.name);
		});
		
		expect(found).toEqual(["one","two","tree"]);
	});
	
	it("should remove one of the packages upon finishing", function(){
		var collection = new PackageCollection();
		var pack1 = {freezed : true, name: "one"};
		var pack2 = {freezed : true, name: "two"};
		
		collection.add(pack1);
		collection.add(pack2);
		
		collection.remove(pack2);
		
		expect(collection.size()).toEqual(1);
	});
	
	it("should notify events once something is updated", function(){
		var counter = 0;
		var collection = new PackageCollection(function(collection){
			counter = counter + 1;
		});
		
		var pack1 = {freezed : true, name: "one"};
		var pack2 = {freezed : true, name: "two"};
		collection.add(pack1);
		collection.add(pack2);
		
		expect(counter).toEqual(2);
		
		collection.remove(pack1);
		expect(counter).toEqual(3);
		
	});
	
	
	
});