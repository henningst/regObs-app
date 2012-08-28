

class PackageCollection
  
  constructor: (callback) ->
    @callback = callback
    @packages = []
    
  
  add : (pkg) ->
    retur = @packages.push(pkg)
    @callCallback()
    retur
    
  get : (name) ->
    found = @packages.filter (pkg) -> pkg.name == name 
    found[0]
  
  remove : (obj) ->
    prevSize = @size()
    removeIndex = @packages.indexOf(obj)
    @packages.splice(removeIndex, 1)
    
    
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
