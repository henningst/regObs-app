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

    @ids = {}

  onError: (data) =>
    @errorCallback() if @errorCallback
    if(main.haveConnection())
      if(data == null)
        new ErrorHandler().handleError("No error description, abstract package")
        return

      if(data != null && data.response)
        @handleStatusCode(data.response.statusCode)
        console.log("pp: error occured sending package "+ data)

        new ErrorHandler().handleErrorSilent(data)
      else
        new ErrorHandler().handleError(data)

    else
      main.noConnectionDialog()

    main.updateCollection(main.store.packageCollection)

  handleStatusCode: (code) ->
    console.log("pp: statusCode " + code + ", is " + typeof code)
    switch code
      when 400 then main.showDialogWithMessage(BAD_REQUEST)
      when 500 then main.showDialogWithMessage(INTERNAL_ERROR)
      else main.showDialogWithMessage(UVENTET_FEIL)

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
    hourOffset = (date.getTimezoneOffset() / 60) * -1
    @regDate = new Date(date.setHours(date.getHours() + hourOffset))
    console.log("pp: setting regdate " + JSON.stringify(@regDate))


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
    @accuracy = Math.round(accuracy)
    DataAccess.save(@name, this)

  setKommunenr: (nr) =>
    @komm_nr = nr if nr

  setFylkenr: (nr) =>
    @fylke_nr = nr if nr

  setArea: (nr) =>
    @omrade_id = nr

  setRegine: (nr) =>
    @regine_nr = nr if nr

  addObs: (obs) =>
    @setRegDate()
    console.log("adding observation " + JSON.stringify(@))
    obs.setRegDate(@regDate) if obs.setRegDate
    obs.beforeSend(@m_dangerObs.length) if obs.beforeSend
    @m_dangerObs.push(obs)
    DataAccess.save(@name, this)

  replaceObs: (obs)=>
  	model = obs.model
  	if model
  		position = -1
  		for current, i in @m_dangerObs
  			if(current.model == model)
  					position = i

  		if position >= 0
  			@m_dangerObs.splice(position, 1)

  		@addObs(obs)

  removeObs: (model) =>
    removeing = jQuery.grep(@m_dangerObs, (current, i) ->
      current.model == model
    )

    for remove in removeing
      index = @m_dangerObs.indexOf(remove)
      @m_dangerObs.splice(index, 1)


  getObs: (type) =>
    if(type == undefined)
      @m_dangerObs
    else
      @m_dangerObs.filter (obj) -> obj.model == type

  addPicture: (picture) =>
    @setRegDate()
    picture.Photographer = main.userNick()
    picture.Copyright = main.userNick()
    console.log("pp: usernick image is " + main.userNick())
    @m_pictures.push(picture)
    DataAccess.save(@name, this)

  getPictures: () =>
    @m_pictures

  send: () =>
    user = UserStore.get(main.currentMode())
    competancy = user.competancy

    @setCompetancy(competancy.getLevel(@currentHazard()))
    success = () => @onSend(@page, true)
    fail = () =>
      main.runIfConnection(()=>
        main.showDialogWithMessage(MISSING_LOGIN);
      )

      @errorCallback() if @errorCallback

    login_page.relogin(success , fail, true)


  currentHazard : ()=>
    page = @page.name

    currentHazard = switch page
      when "snow_page" then SNOW_GEO_HAZARD
      when "dirt_page" then DIRT_GEO_HAZARD
      when "ice_page" then ICE_GEO_HAZARD
      when "water_page" then WATER_GEO_HAZARD

    console.log("current hazard is " + page + "=" + currentHazard)
    currentHazard

  omradeIdByCurrentHazard : ()=>
    id = switch @currentHazard()
      when SNOW_GEO_HAZARD then parseInt(@omrade_id)
      when DIRT_GEO_HAZARD then parseInt(@fylke_nr) + 200
      when ICE_GEO_HAZARD then parseInt(@fylke_nr) + 700
      when WATER_GEO_HAZARD then parseInt(@regine_nr) + 2000

    console.log("current id " + id)
    id

  callCallback: ()=>
    @ids = {}
    @callback(this) if @callback

  afterLocation: (data, area, force) =>
    @setObsLocation(area, data.ObsLocationID)
    @onAfterLocation(@getStore(area).obsLocationID, area, force)

  afterRegistration: (data, area, force) =>
    console.log("after reg area " + area + " force " + force)
    @setRegistration(area, data.RegID)
    @onAfterRegistration(@getStore(area).regID, area, force)

  onAfterRegistration: (regid, area, force)->
    if area
      @completeAreaRegistration(regid, force)
    else
      @completePointRegistration(regid, force)

  setRegistration : (area, regID) =>
    store = @getStore(area)
    store.regID = regID
    @save()

  completeAreaRegistration: (regID, force) =>
    console.log("complete force " + force  )

    sendingFunctions = []

    x = 0
    n = @name
    for obs in @pointModels(@m_dangerObs).area
      do(obs) =>
        sendFunc = (callback) =>
          obs.RegID = regID
          clone = JSON.parse(JSON.stringify(obs))
          clone = @castedModel(clone)


          delete clone.model if clone.model
          success = () =>
            console.log("success have sendt " + JSON.stringify(obs))
            @save()
            callback(null, obs.RegID)
          error = (error) -> callback(error)

          SendObjectToServer(clone, success, error)

        if(obs.RegID != null && obs.RegID > 0)
          console.log("dr: skipping have obs id " + obs.model + " - " + obs.RegID)
        else
          sendingFunctions.push(sendFunc)



    i = 0
    bilde = @areaPictures()
    for picture in bilde
      do(picture) =>
        sendFunc = (callback) =>
          picture = jQuery.extend(picture, new Picture())

          clone = JSON.parse(JSON.stringify(picture))
          console.log("--: about to cast")
          clone.model = "Picture"
          clone = @castedModel(clone)
          delete clone.model if clone.model
          clone.RegID = regID
          clone.PictureID = i++
          success = (error, complete) =>
            if error == null
              picture.RegID = regID

            console.log("--: success picture " + JSON.stringify(error))
            console.log("--: saving picture check " + JSON.stringify(picture))
            @save()
            callback(error, complete)

          sendPicture = new SendInPictureCommand(clone)
          sendPicture.send(success)

        console.log("--: about to check " + JSON.stringify(picture))
        if(picture.RegID and picture.RegID > 0)
          console.log("skipping picture")
        else
          sendingFunctions.push(sendFunc)

    incidentFunc = (callback) =>
      if @m_incident and (i isnt 0 or x isnt 0 or force)
        @m_incident = jQuery.extend(@m_incident, new Incident())
        @m_incident.RegID = regID

        success = ()=>
          @save()
          callback(null, "incident sendt")
        error = (error)-> callback(error)

        SendObjectToServer(@m_incident, success, error)
        @m_incident = null
      else
        callback(null, "no incident")

    if(@m_incident and @m_incident.RegID > 0)
      console.log("pr: skipping")
    else
      sendingFunctions.push(incidentFunc)

    async.series(sendingFunctions, (err, result)=>
      console.log("done sending " + result)
      if(err)
        console.log("pp: error " + JSON.stringify(err) )
        @onError(err)
      else
        @removeAreaModels()
        @cutOutPictures(true)
        main.addLastRegID(regID)
        DataAccess.save(@name, this)

        if not force
          @onSend(@page, false)
        else
          @callCallback()
          main.showFinishedUploadMessage()
    )


  completePointRegistration: (regId) =>
    sendFunctions = []

    sendIncident = (callback ) =>
      if @m_incident
        @m_incident = jQuery.extend(@m_incident, new Incident())
        @m_incident.RegID = regId
        success = () =>
          @save()
          callback(null, "incident sendt")
        error = (error) -> callback(error)

        SendObjectToServer(@m_incident, success, error)
        @m_incident = null
      else
        callback(null, "no incident")

    if(@m_incident && @m_incident.RegID != null && @m_incident.RegID > 0)
      console.log("dr: skipping have obs id " + obs.model + " - " + obs.RegID)
    else
      sendFunctions.push(sendIncident)

    x = 0
    for obs in @pointModels(@m_dangerObs).point
      do(obs) =>
        sendFunc = (callback)=>
          obs.RegID = regId

          clone = JSON.parse(JSON.stringify(obs))
          clone = @castedModel(clone)
          clone.beforeSend(x++) if clone.beforeSend

          delete clone.model if clone.model
          success = ()=>
            console.log("success have sendt " + JSON.stringify(obs))
            @save()
            callback(null, regId)
          error = ()-> callback("problem with " + regId + " " + JSON.stringify(obs))
          SendObjectToServer(clone, success, error)

        console.log("dr: have obs id " + obs.model + " - " + obs.RegID)
        if(obs.RegID != null && obs.RegID > 0)
          console.log("dr: skipping have obs id " + obs.model + " - " + obs.RegID)
        else
          sendFunctions.push(sendFunc)


    i = 0
    bilde = @pointPictures()
    for picture in bilde
      do(picture) =>
        sendFunc = (callback) =>
          picture = jQuery.extend(picture, new Picture())

          clone = JSON.parse(JSON.stringify(picture))
          clone.model = "Picture"
          clone = @castedModel(clone)
          clone.RegID = regId
          clone.PictureID = i++
          delete clone.model if clone.model
          success = (error, complete)=>
            if error == null
              picture.RegID = regId
            @save()
            callback(error, complete)
          sendPicture = new SendInPictureCommand(clone)
          sendPicture.send(success)
        if(picture.RegID != null && picture.RegID > 0)
          console.log("dr: skipping have obs id " + picture.model + " - " + picture.RegID)
        else
          sendFunctions.push(sendFunc)


    async.series(sendFunctions, (err, result) =>
      console.log("done with " + result + ", error " + err)
      if(err)
        @onError(err)
      else
        @m_pictures.length = 0
        @removePointModels()

        main.addLastRegID(regId)
        DataAccess.save(@name, this)
        @callCallback()
        main.showFinishedUploadMessage()
    )



  fillIncident: (incident) =>
    new Incident(incident.RegID, incident.GeoHazardTID, incident.ActivityInfluencedTID, incident.DamageExtentTID, incident.ForecastAccurateTID, incident.DtEndTime, incident.IncidentHeader, incident.IncidentIngress, incident.IncidentText, incident.SensitiveText, incident.UsageFlagTID, incident.Comment)

  fillPicture: (picture) =>
    new Picture(picture.PictureID, picture.RegID, picture.PictureImage, picture.Photographer, picture.Copyright, picture.Aspect, picture.GeoHazardTID, picture.Comment, picture.RegistrationTID)

  fillObs: (obs) =>
    @castedModel(obs)

  onSend: (page, area) =>
    if area
      main.showWaitingDialogWithMessage(UPLOADING, ()-> main.showSendingDialog());

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

    console.log("dr: have obs location id " + @getStore(area).obsLocationID)
    if area
      if @areaPictures().length > 0 || @pointModels(@m_dangerObs).area.length > 0
        if(@getStore(area).obsLocationID > 0)
          console.log("dr: skipping obslocation")
          @onAfterLocation(@getStore(area).obsLocationID, area, false)
        else
          location = new ObsLocation("", 33, @long, @lat, source, 0, @omradeIdByCurrentHazard(), null, null, true, null, @regDate, null, null, null, komm_string, "Feilmargin: #{@accuracy}m");
          SendObjectToServer(location, ((data) => @afterLocation(data, true, false)) , (error) => @onError(error))
      else
        if @pointPictures().length > 0 || @pointModels(@m_dangerObs).point.length > 0
          @onSend(page, false)
        else
          if(@getStore(true).obsLocationID > 0)
            console.log("dr: skipping obslocation")
            @onAfterLocation(@getStore(true).obsLocationID, true, true)
          else
            location = new ObsLocation("", 33, @long, @lat, source, 0, @omradeIdByCurrentHazard(), null, null, true, null, @regDate, null, null, null, komm_string, "Feilmargin: #{@accuracy}m");
            SendObjectToServer(location, ((data) => @afterLocation(data, true, true)) , (error) => @onError(error))

    else
      if @pointPictures().length > 0 || @pointModels(@m_dangerObs).point.length > 0
        if(@getStore(false).obsLocationID > 0)
          console.log("dr: skipping obslocation")
          @onAfterLocation(@getStore(false).obsLocationID, area)
        else
          location = new ObsLocation("", 33, @long, @lat, source, 0, @omradeIdByCurrentHazard(), null, null, false, null, @regDate, null, null, null, komm_string, "Feilmargin: #{@accuracy}m");
          SendObjectToServer(location, ((data) => @afterLocation(data, false)) , (error) => @onError(error))
      else
        @callCallback()
        main.showFinishedUploadMessage()


  pointModels : (models)->
    point = []
    area = []
    pointModelName = ["SnowSurfaceObservation", "SnowCoverObs", "IceCoverObs", "IceThickness", "WaterLevel", "LandSlideObs"]

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

  onAfterLocation: (obsLocationID, area, force) ->
    console.log("dr: have registration id " + @getStore(area).regID)

    if @getStore(area).regID > 0
      console.log("dr: skipping registration")
      @onAfterRegistration(@getStore(area).regID, area, force)
    else
      groupId = parseInt(@groupId)
      groupId = undefined if groupId == 0

      console.log("pp: regdate is " + @regDate + ", " + typeof @regDate)
      if typeof @regDate == "string"
        @regDate = new Date(Date.fromISOString(@regDate))
      console.log("pp: regdate is now " + @regDate + ", " + typeof @regDate)

      observerId = @getObserverID(main.login.data)

      registration = new Registration(observerId, obsLocationID, null, @regDate, @competancy, groupId)
      SendObjectToServer(registration, ((data) => @afterRegistration(data, area, force)) , (error) => @onError(error))

  getObserverID: (data) ->
  	if data.EMail == "anonym@nve.no"
  		if main.currentMode() == STAGE_MODE then 0 else 105
  	else
  		data.ObserverID

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

  setObsLocation: (area, obsLocationID)=>
    store = @getStore(area)
    store.obsLocationID = obsLocationID
    @save()

  save : () =>
    @savePackageCollection()

  savePackageCollection : ()->
    main.store.packageCollection.save()



  getStore: (area) =>
    section = "point"
    if(area)
      section = "area"


    if @ids[section]
      store = @ids[section]
    else
      store = {}
      @ids[section] = store

    store

