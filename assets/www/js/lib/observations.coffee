
class ObservationView
  constructor: (@author,  @title, @updated, @url, @content) ->
    

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
      title = entry.find("title").text().trim()
      updated = entry.find("updated").text().trim()
      url = entry.find("link").attr("href")
      content = entry.find("content")[0]
      
      new ObservationView(author, title, updated, url, content)  
    )


class ObservationViewRendrer
  constructor: (@domNode, @listOfView) ->
    
  render: ()->
    console.log(@domNode)
    jQuery(@domNode).html(Handlebars.templates.viewList({list: @listOfView}));
    console.log(jQuery(@domNode))
    
  setListOfView: (@listOfView)-> 
