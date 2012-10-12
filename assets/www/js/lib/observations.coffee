
class ObservationView
  constructor: (@author, @updated, @url, @content) ->
    
class AllRegistrationsVUrlGenerator
  baseurl :  ()-> "#{SERVER_URL}AllRegistrationsV?"
  queryString : "$filter=LangKey eq %LANGUAGE% and UTMEast gt %UTM_EAST_MIN% and UTMEast lt %UTM_EAST_MAX% and UTMNorth le %UTM_NORTH_MAX% and UTMNorth gt %UTM_NORTH_MIN% and GeoHazardTID eq %GEOHAZARDTID%&$orderby=RegID desc"
  diameter : ()-> main.getObservationSearchDiameter()
  constructor: (@currentPosition, @geoHazard)->
    
  url : ()->
    currentUrl = @queryString
      .replace("%UTM_EAST_MIN%", @currentPosition.east - @radius())
      .replace("%UTM_EAST_MAX%", @currentPosition.east + @radius())
      .replace("%UTM_NORTH_MIN%", @currentPosition.north - @radius())
      .replace("%UTM_NORTH_MAX%", @currentPosition.north + @radius())
      .replace("%GEOHAZARDTID%", @geoHazard)
      .replace("%LANGUAGE%", LANGUAGE)
    @baseurl() + currentUrl
      
  radius : ()->
    @diameter() / 2
  
  setPos : (@currentPosition)->
  

class ObservationFetcher
  
  constructor: (@urlGenerator)->
    @regType = {}
    data = DataAccess.get(RegistrationKD.name)
    for reg in data.results
      @regType[reg.RegistrationTID] = reg.RegistrationName 
    

  getObservations: (callback)=>
    main.showWaitingDialogWithMessage("Henter observasjoner");
    console.log("henter url "+ @urlGenerator.url()) 
    jQuery.ajax({
      type: "GET",
      cache: false,
      url: @urlGenerator.url(),
      dataType: "json",
      success: @fetchedDataHandler(callback) ,
      error :  (e)->
        console.log("failed #{JSON.stringify(e)}" )
    })
  
  fetchedDataHandler: (callback)=>
    ( data )=>
      obs = @entryToObservationView(data.d.results)
      main.hideDialog();
      callback(obs)
    
  entryToObservationView: (entrys) =>
    jQuery.map(entrys, (e) =>
      entry = e
      author = entry.NickName
      updated = @localDateString(@toDate(entry.DtObsTime))
      url = "#{WEB_LINK_URL}Registration?regId=#{entry.RegID}"
      content = new Handlebars.SafeString("<strong>#{updated}, #{[entry.RegistrationName, @trim(entry.TypicalValue1), @trim(entry.TypicalValue2)].filter((o)->o.length > 0).join(", ")}.</strong> ved (#{entry.ForecastRegionName}/#{entry.Kommunenavn}) <i>#{author}</i>")
      
      new ObservationView(author, updated, url, content)
    )
    
  toDate : (dateString) ->
    time = dateString.replace("/Date(", "").replace(")/", "")
    new Date(parseInt(time))
  localDateString : (date)->
    day = @padZero(date.getUTCDate())
    month = @padZero(parseInt(date.getUTCMonth()) + 1) 
    year = @padZero(date.getUTCFullYear())
    hour = @padZero(date.getUTCHours())
    minute = @padZero(date.getUTCMinutes())
    sec = date.getUTCSeconds()
    if(date.toDateString() == new Date().toDateString())
      "#{hour}:#{minute}"
    else
      "#{day}.#{month}.#{year} #{hour}:#{minute}" 
    
  padZero : (text) ->
    number = parseInt(text)
    if number < 10
      "0#{number}"
    else
      number
  
  trim : (text)->
    if(text == null)
      ""
    else
      text.replace(/^\s+|\s+$/g, "")
      
  toRegistrationType : (tid) ->
    @registrationType(tid)
    
  registrationType : (tid)->
    if(@regType[tid] == null)
      ""
    else
      @regType[tid]
    
   
class FullViewRenderer
  constructor: (@domNode, @url)->
    
  render : ()->
    jQuery(@domNode).html(Handlebars.templates.fullView({url: @url}))
    
  setUrl : (@url)->



class ObservationViewRendrer
  constructor: (@domNode, @listOfView, @handler) ->
    
  render: ()->
    jQuery(@domNode).html("")
    jQuery(@domNode).html(Handlebars.templates.viewList({list: @listOfView, map_handler: @handler, scrollerid: "#{@domNode}_scroller_id"}));
    main.resetHeights()
    jQuery(@domNode).find("li").click ()->
      url = jQuery(this).attr("data-url")
      window.plugins.childBrowser.onClose = ()->
      window.plugins.childBrowser.showWebPage(url); 
    
    
  setListOfView: (@listOfView)-> 


