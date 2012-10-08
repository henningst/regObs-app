
class ObservationView
  constructor: (@author, @updated, @url, @content) ->
    
  

class ObservationFetcher
  

  getObservations: (callback)=>
    jQuery.get("http://h-web01.nve.no/stage_regobsservices/Atom/AllRegistrationsV?$filter=LangKey%20eq%201%20and%20UTMEast%20gt%20240000%20and%20UTMEast%20lt%20250000%20and%20UTMNorth%20le%206660000%20and%20UTMNorth%20gt%206650000&$orderby=RegID%20desc")
      .success(@fetchedDataHandler(callback))
      .error(@error)
  
  fetchedDataHandler: (callback)->
    ( data )=>
      xml = jQuery(data)
      obs = @entryToObservationView(xml.find("entry"))
      callback(obs)
    
  entryToObservationView: (entrys) ->
    jQuery.map(entrys, (e)->
      entry = jQuery(e)
      author = entry.find("author").text().trim()
      updated = entry.find("updated").text().trim()
      url = entry.find("link").attr("href")
      content = new Handlebars.SafeString(entry.find("content div").html().trim());
      
      obs = new ObservationView(author, updated, url, content)
      console.log(JSON.stringify(obs))
      obs  
    )
    
   
class FullViewRenderer
  constructor: (@domNode, @url)->
    
  render : ()->
    jQuery(@domNode).html(Handlebars.templates.fullView({url: @url}))
    
  setUrl : (@url)->



class ObservationViewRendrer
  constructor: (@domNode, @listOfView) ->
    
  render: ()->
    jQuery(@domNode).html(Handlebars.templates.viewList({list: @listOfView}));
    main.resetHeights()
    jQuery(@domNode).find("li").click ()->
      url = jQuery(this).attr("data-url")
      navigator.app.loadUrl(url, { openExternal:true } ); 
    
    
  setListOfView: (@listOfView)-> 


