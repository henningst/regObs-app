
class ObservationView
  constructor: (@author, @updated, @url, @content) ->
    
class AllRegistrationsVUrlGenerator
  baseurl : "http://h-web01.nve.no/stage_regobsservices/Atom/AllRegistrationsV?"
  queryString : "$filter=LangKey eq #{LANGUAGE} and UTMEast gt %UTM_EAST_MIN% and UTMEast lt %UTM_EAST_MAX% and UTMNorth le %UTM_NORTH_MAX% and UTMNorth gt %UTM_NORTH_MIN%&$orderby=RegID desc"
  diameter : 10000
  constructor: (@currentPosition)->
    
  url : ()->
    currentUrl = @queryString
      .replace("%UTM_EAST_MIN%", @currentPosition.east - @radius())
      .replace("%UTM_EAST_MAX%", @currentPosition.east + @radius())
      .replace("%UTM_NORTH_MIN%", @currentPosition.north - @radius())
      .replace("%UTM_NORTH_MAX%", @currentPosition.north + @radius())
    console.log("currrent position " + JSON.stringify(@currentPosition))
    console.log("currrent url " + currentUrl )
    @baseurl + encodeURIComponent(currentUrl)
      
  radius : ()->
    @diameter / 2
  

class ObservationFetcher
  
  constructor: (@urlGenerator)->

  getObservations: (callback)=>
    jQuery.ajax({
      type: "GET",
      url: @urlGenerator.url(),
      dataType: "text",
      success: @fetchedDataHandler(callback) ,
      error :  (e)->
        console.log("failed #{JSON.stringify(e)}" )
    })
  
  fetchedDataHandler: (callback)=>
    ( data )=>
      xml = jQuery.parseXML(data)
      obs = @entryToObservationView(jQuery(xml).find("entry"))
      callback(obs)
    
  entryToObservationView: (entrys) =>
    jQuery.map(entrys, (e) =>
      entry = jQuery(e)
      author = entry.find("author").text().trim()
      updated = entry.find("updated").text().trim()
      url = entry.find("link").attr("href")
      content = entry.find("title").text().trim()
      
      new ObservationView(author, updated, url, content)
    )
    
   
class FullViewRenderer
  constructor: (@domNode, @url)->
    
  render : ()->
    jQuery(@domNode).html(Handlebars.templates.fullView({url: @url}))
    
  setUrl : (@url)->



class ObservationViewRendrer
  constructor: (@domNode, @listOfView) ->
    
  render: ()->
    jQuery(@domNode).html("")
    jQuery(@domNode).html(Handlebars.templates.viewList({list: @listOfView}));
    main.resetHeights()
    jQuery(@domNode).find("li").click ()->
      url = jQuery(this).attr("data-url")
      
      cb = window.plugins.childBrowser;

      if(cb != null) {
        cb.onLocationChange = () -> console.log("called locationcahnge")
        cb.onClose = () -> console.log("called close")
        cb.onOpenExternal = () -> console.log("called open external")
      }
      
      window.plugins.childBrowser.showWebPage(url); 
    
    
  setListOfView: (@listOfView)-> 


