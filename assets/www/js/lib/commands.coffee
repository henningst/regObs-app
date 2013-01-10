
class ErrorHandlingCommand
  fail: (err, data)->
    console.log("pp: error handling command");
    console.log(err)
    console.log("error handling command "+ JSON.stringify(data))

class ImageDataConverter
  constructor: (@imagedata)->
    
  convert: (@successFunction)->
    if(device.platform == "android")
        prefix = "file://"
      else
        prefix = ""
        
    window.resolveLocalFileSystemURI(prefix + @imagedata, @gotFileEntry, @fail);
    
    
  gotFS: (fileSystem) =>
    console.log("got file system")
    url =  @picture.PictureImage
    console.log("getting file " + url)
    
    fileSystem.root.getFile(url, {}, @gotFileEntry, @fail);
    
  gotFileEntry : (fileEntry) =>
    console.log("got file entry")
    fileEntry.file(@gotFile, @fail)
  
  gotFile: (file) =>
    console.log("got file")
    reader = new FileReader();
    reader.onloadend = (evt) =>
      @successFunction(evt.target.result.substring(23))
    
    reader.readAsDataURL(file);
    
  fail: (e) =>
    console.log("sending in picture failed:")
    for k,v of e
      console.log(k + " -> " + v)
      
    console.log("value of secur err " + FileError.SECURITY_ERR  + " not found err " + FileError.NOT_FOUND_ERR)
    throw e

class SendInPictureCommand
  constructor: (@picture) ->
    console.log("createing send in picture command")
    
  
  send: (@callback) =>
    success = () => @callback(null, "picture sendt")
    error = (error) => @callback(error, "picuter")
    SendObjectToServer(@picture, success, error)


class ObserversGroupsCommand extends ErrorHandlingCommand
  constructor: (@user) ->
    @groups = []
    @url = SERVER_URL+"/ObserverGroupMember?$filter=ObserverID eq #{ @user.id }&$expand=ObserverGroup"
    
  fetch: (@callback) =>
    GetObjectFromServer(this, @gotData, @fail)
    
  gotData:(data)=>
    jQuery.each(data.results, (i, result)=>
      @groups.push({id: result.ObserverGroup.ObserverGroupID, name: result.ObserverGroup.ObserverGroupName})  
    )
    @callback(@groups)
    
    
class ObserversCompCommand extends ErrorHandlingCommand
  constructor: (@user) ->
    @comps = []
    @url = SERVER_URL+"/ObserverHazardsComp?$filter=ObserverID eq #{ @user.id }"
    @callback = ()->
    
  fetch: (@callback) =>
    GetObjectFromServer(this, @gotData, @fail)
    
  gotData: (data) =>
    jQuery.each(data.results, (i, result) =>
      comp = new Competancy(result.GeoHazardTID, result.CompetenceLevelTID)
      @comps.push(comp)  
    )
    @callback(@comps)
    
   
    
    


    
