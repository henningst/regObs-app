

class PackageCollection
  
  constructor: (callback) ->
    console.log("constrct")
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
    console.log("pp: --removeing package " + JSON.stringify(obj))
    prevSize = @size()
    @packages = @packages.filter (pkg) -> JSON.stringify(pkg) != JSON.stringify(obj)
    if(prevSize == @size())
      throw "No matching object found in collection";
    console.log("pp: --package removed")
    @callCallback()
    console.log("pp: --callback done")
  
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
