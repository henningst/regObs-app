

class PackageCollection
  
  constructor: (@callback) ->
    console.log("constrct")
    @packages = []
    
  
  add : (pkg) ->
    retur = @packages.push(pkg)
    @callCallback()
    retur
    
  get : (name) ->
    found = @packages.filter (pkg) -> pkg.name == name and pkg.freezed == false
    found[0]
  
  remove : (obj) ->
    @packages = @packages.filter (pkg) -> pkg isnt obj
    @callCallback()
  
  forall : (work) ->
    for pkg in @packages
      work(pkg)   
      
  size: ->
    @packages.length


  callCallback : () ->
    @callback(this) if @callback