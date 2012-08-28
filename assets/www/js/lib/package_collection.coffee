

class PackageCollection
  
  constructor: (callback) ->
    @callback = callback
    @packages = []
    
  
  add : (pkg) ->
    retur = @packages.push(pkg)
    @callCallback()
    retur
    
  get : (name) ->
    found = @packages.filter (pkg) -> pkg.name == name and pkg.freezed == false
    found[0]
  
  remove : (obj) ->
    prevSize = @size()
    @packages = @packages.filter (pkg) -> JSON.stringify(pkg) != JSON.stringify(obj)
    if(prevSize == @size())
      throw "No matching object found in collection";
    @callCallback()
  
  forall : (work) ->
    for pkg in @packages
      work(Cast.package(pkg))   
      
  size: ->
    @packages.length


  callCallback : () =>
    @callback(this) if @callback
    

Cast ={
  package: (obj)->
    jQuery.extend(new SnowPackage(), obj);
  
}
