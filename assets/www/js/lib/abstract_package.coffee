class AbstractPackage
  
  absConstructor: () =>
    @m_dangerObs = []
    @m_incident = null
    @m_pictures = []
    @lat = 0
    @long = 0
    @komnr = 0
    @omrade_id = 0
    @regDate = null
    @freezed = false
    @pages = []

  onError: (data) =>
    main.errorDialog()
    main.updateCollection(main.store.packageCollection)
  
  superInit: () =>
    @pages = [@page, @picturePage, @hendelsePage]
    
    @m_dangerObs = (@fillObs obs for obs in @m_dangerObs)
      
    @m_pictures = (@fillPicture picture for picture in @m_pictures)
    @m_incident = @fillIncident @m_incident if @m_incident
  
  setIncident: (incident) =>
    @setRegDate()
    @m_incident = incident
    DataAccess.save(@name, this)
    
  setWaterLevel:(waterLevel) =>
    @setRegDate()
    @m_waterLevel = waterLevel
    DataAccess.save(@name, this)
  
  setRegDate : ()=>
    date = new Date()
    
    @regDate = new Date(date.setHours(date.getHours() + 2))
   
  setGroup: (groupId)=>
    @groupId = groupId
    
  setCompetancy: (competancy) =>
    @competancy = competancy 
   
  afterSendRegistration: ()=>
    for page in @pages
      page.afterSendRegistration() if page and page.afterSendRegistration
    
  getIncident: () =>
    @m_incident
    
  setLatLong: (lat, long, accuracy) =>
    @lat = lat
    @long = long
    @accuracy = accuracy
    DataAccess.save(@name, this)
    
  setKommunenr: (nr) =>
    @komm_nr = nr if nr
  
  setFylkenr: (nr) =>
    @fylke_nr = nr if nr
    
  setArea: (nr) =>
    @omrade_id = nr
    
  setRegine: (nr) =>
    console.log("Setting regine nr" + nr)
    @regine_nr = nr if nr
    
  addObs: (obs) =>
    @setRegDate()
    obs.setRegDate(@regDate) if obs.setRegDate
    @m_dangerObs.push(obs)
    DataAccess.save(@name, this)
    
  getObs: (type) =>
    if(type == undefined)
      @m_dangerObs
    else
      @m_dangerObs.filter (obj) -> obj.model == type
    
  addPicture: (picture) =>
    @setRegDate()
    @m_pictures.push(picture)
    DataAccess.save(@name, this)
    
  getPictures: () =>
    @m_pictures
    
  send: () =>
    user = UserStore.get(main.currentMode())
    competancy = user.competancy
    
    @setCompetancy(competancy.getLevel(@currentHazard()))
    
    @onSend(@page, true)
    
  currentHazard : ()=>
    page = @page.name
    
    currentHazard = switch page
      when "snow_page" then SNOW_GEO_HAZARD
      when "dirt_page" then DIRT_GEO_HAZARD
      when "ice_page" then ICE_GEO_HAZARD
      when "water_page" then WATER_GEO_HAZARD
      
    console.log("current hazard is " + page + "=" + currentHazard)
    currentHazard
    
  callCallback: ()=>
    @callback(this) if @callback 
   
  afterLocation: (data, area, force) =>
    @onAfterLocation(data, area, force)
  
  afterRegistration: (data, area, force) =>
    console.log("after reg area " + area + " force " + force)
    if area
      @completeAreaRegistration(data, force)
    else 
      @completePointRegistration(data)
    
  completeAreaRegistration: (data, force) =>
    console.log("complete force " + force  )
    x = 0
    n = @name
    console.log("models complete area " + JSON.stringify(@pointModels(@m_dangerObs).area))
    for obs in @pointModels(@m_dangerObs).area 
      do(obs) =>
        console.log("model area "+ JSON.stringify(obs))
        obs.RegID = data.RegID
        clone = JSON.parse(JSON.stringify(obs))
        clone = @castedModel(clone)
        clone.beforeSend(x++) if clone.beforeSend
                
        delete clone.model if clone.model          
        SendObjectToServer(clone, undefined, (error) => @onError(error))
          
        

    @removeAreaModels()

    i = 0
    bilde = @cutOutPictures(true)
    for picture in bilde
      do(picture) ->
        picture = jQuery.extend(picture, new Picture())
        picture.RegID = data.RegID
        picture.PictureID = i++
        sendPicture = new SendInPictureCommand(picture)
        sendPicture.send()  

    if @m_incident and (i isnt 0 or x isnt 0 or force)
      @m_incident = jQuery.extend(@m_incident, new Incident())
      @m_incident.RegID = data.RegID
      
      SendObjectToServer(@m_incident)
      @m_incident = null
    
    
    main.addLastRegID(data.RegID)
    DataAccess.save(@name, this)
    
    if not force
      @onSend(@page, false)
    else
      @callCallback()
      main.showFinishedUploadMessage()  
      
  
  completePointRegistration: (data) =>
    if @m_incident
      @m_incident = jQuery.extend(@m_incident, new Incident())
      @m_incident.RegID = data.RegID
      SendObjectToServer(@m_incident, undefined, (error) => @onError(error))
      @m_incident = null
      
    
    
    x = 0
    for obs in @pointModels(@m_dangerObs).point 
      do(obs) =>
        obs.RegID = data.RegID
        
        clone = JSON.parse(JSON.stringify(obs))
        clone = @castedModel(clone)
        clone.beforeSend(x++) if clone.beforeSend
                
        delete clone.model if clone.model          
        SendObjectToServer(clone, undefined, (error) => @onError(error))
          
    @removePointModels()

    i = 0
    bilde = @cutOutPictures(false)
    for picture in bilde
      do(picture) ->
        picture = jQuery.extend(picture, new Picture())
        picture.RegID = data.RegID
        picture.PictureID = i++
        sendPicture = new SendInPictureCommand(picture)
        sendPicture.send()        
        

    @m_pictures.length = 0
    
    main.addLastRegID(data.RegID)
    DataAccess.save(@name, this)
    @callCallback()
    main.showFinishedUploadMessage()  
  
  fillIncident: (incident) =>  
    new Incident(incident.RegID, incident.GeoHazardTID, incident.ActivityInfluencedTID, incident.DamageExtentTID, incident.ForecastAccurateTID, incident.DtEndTime, incident.IncidentHeader, incident.IncidentIngress, incident.IncidentText, incident.SensitiveText, incident.UsageFlagTID, incident.Comment)
    
  fillPicture: (picture) =>
    new Picture(picture.PictureID, picture.RegID, picture.PictureImage, picture.Photographer, picture.Copyright, picture.Aspect, picture.GeoHazardTID, picture.Comment, picture.RegistrationTID)
    
  fillObs: (obs) =>
    @castedModel(obs)
  
  onSend: (page, area) =>
    if area
      main.showWaitingDialogWithMessage(UPLOADING);
  
    source = 0
    pos = page.pos_obj 
    if pos
      elapsedInMinutes = ((new Date()).getTime() - pos.timestamp) / 1000 / 60
      if elapsedInMinutes < GPS_TIMEOUT_IN_MINUTES
        source = GPS_POSITION
      else
        source = OLD_GPS_POSITION
      
    
    komm_string = "0"
    if @komm_nr
      komm_string = @komm_nr.toString()
       
    if area
      if @areaPictures().length > 0 || @pointModels(@m_dangerObs).area.length > 0
        location = new ObsLocation("", 33, @long, @lat, source, 0, @omrade_id, null, null, true, null, @regDate, null, null, null, komm_string, "Feilmargin: #{@accuracy}m");
        SendObjectToServer(location, ((data) => @afterLocation(data, true, false)) , (error) => @onError(error))
      else 
        if @pointPictures().length > 0 || @pointModels(@m_dangerObs).point.length > 0
          @onSend(page, false)
        else
          location = new ObsLocation("", 33, @long, @lat, source, 0, @omrade_id, null, null, true, null, @regDate, null, null, null, komm_string, "Feilmargin: #{@accuracy}m");
          SendObjectToServer(location, ((data) => @afterLocation(data, true, true)) , (error) => @onError(error))

    else
      if @pointPictures().length > 0 || @pointModels(@m_dangerObs).point.length > 0
        location = new ObsLocation("", 33, @long, @lat, source, 0, @omrade_id, null, null, false, null, @regDate, null, null, null, komm_string, "Feilmargin: #{@accuracy}m");
        SendObjectToServer(location, ((data) => @afterLocation(data, false)) , (error) => @onError(error))
      else
        @callCallback()
        main.showFinishedUploadMessage()
    
    
  pointModels : (models)->
    point = []
    area = []
    pointModelName = ["SnowSurfaceObservation", "SnowCoverObs", "AvalancheActivityObs", "IceCoverObs", "IceThickness", "WaterLevel", "LandSlideObs"]
    
    for model in models
      if model.model &&  model.model in pointModelName
        point.push(model)
      else
        area.push(model)
        
    {"point": point, "area": area}
   
  
  removeAreaModels: ()->
    area = @pointModels(@m_dangerObs).area
    @m_dangerObs = jQuery.grep(@m_dangerObs, (obs)->
      !(obs in area)  
    )    
   
  removePointModels: ()->
    points = @pointModels(@m_dangerObs).point
    @m_dangerObs = jQuery.grep(@m_dangerObs, (obs)->
      !(obs in points)  
    )     
    
  onAfterLocation: (data, area, force) ->
    groupId = parseInt(@groupId)
    groupId = undefined if groupId == 0
    
    registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, @regDate, @competancy, groupId)
    SendObjectToServer(registration, ((data) => @afterRegistration(data, area, force)) , (error) => @onError(error))
    
  cutOutPictures: (area) ->
    i = 0
    erg = []
    while i < @m_pictures.length
      picture = @m_pictures[i]
      if area
        if picture.RegistrationTID not in [21, 22, 23, 25, 26, 50, 51, 61, 71]
          erg.push picture
          @m_pictures.splice(i, 1)
        else
          i++
      else
        if picture.RegistrationTID in [21, 22, 23, 25, 26, 50, 51, 61, 71]
          erg.push picture 
          @m_pictures.splice(i, 1)
        else
          i++
    erg
    
  areaPictures : ()-> @filterPicture(true)
  pointPictures : ()-> @filterPicture(false)
    
    
  filterPicture: (area) ->
    if area
      (picture for picture in @m_pictures when picture.RegistrationTID not in [21, 22, 23, 25, 26, 50, 51, 61, 71])
    else
      (picture for picture in @m_pictures when picture.RegistrationTID in [21, 22, 23, 25, 26, 50, 51, 61, 71])
      
  castedModel: (obs, x) =>
    console.log("casting model " + obs.model + " -> " + JSON.stringify(obs))
    if(obs.model)
      obs = jQuery.extend(obs, eval("new #{obs.model}()"))
      obs
    else
      obs


