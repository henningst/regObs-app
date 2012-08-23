class AbstractPackage
	
	absConstructor: () ->
		@m_dangerObs = []
		@m_incident = null
		@m_pictures = []
		@lat = 0
		@long = 0
		@komnr = 0
		@omrade_id = 0
		@regDate = null
		@freezed = false

	onError: (data) ->
		main.errorDialog()
	
	superInit: () ->
	
		if @name is 'SnowPackage'
			@m_dangerObs = (@fillAvalancheDangerObs obs for obs in @m_dangerObs)
		else
			@m_dangerObs = (@fillDangerObs obs for obs in @m_dangerObs)
			
		@m_pictures = (@fillPicture picture for picture in @m_pictures)
		@m_incident = @fillIncident @m_incident if @m_incident
	
	setIncident: (incident) ->
		@setRegDate()
		@m_incident = incident
		DataAccess.save(@name, this)
	
	setRegDate : ()->
		@regDate = new Date(new Date().getTime() + 1000 * 60 * 120)
		
	getIncident: () ->
		@m_incident
		
	setLatLong: (lat, long) ->
		@lat = lat
		@long = long
		DataAccess.save(@name, this)
		
	setKommunenr: (nr) ->
		@komm_nr = nr if nr
		console.log("set kommune nr" + nr);
		
	setArea: (nr) ->
		@omrade_id = nr
		console.log("set area id");
		
	addObs: (obs) ->
		@setRegDate()
		@m_dangerObs.push(obs)
		DataAccess.save(@name, this)
		
	getObs: () ->
		@m_dangerObs
		
	addPicture: (picture) ->
		@setRegDate()
		@m_pictures.push(picture)
		DataAccess.save(@name, this)
		
	getPictures: () ->
		@m_pictures
		
	send: () =>
		@onSend(@page, true)
		
	afterLocation: (data, area, force) ->
		@onAfterLocation(data, area, force)
	
	afterRegistration: (data, area, force) ->
		if area
			@completeAreaRegistration(data, force)
		else 
			@completePointRegistration(data)
		
	completeAreaRegistration: (data, force) ->
		x = 0
		n = @name
		console.log("test");
		for obs in @m_dangerObs 
			do(obs) ->
				obs.RegID = data.RegID
				
				
				if n is 'SnowPackage'
					obs.AvalancheDangerObsID = x++
				else
					obs.DangerObsID = x++
				
				SendObjectToServer(obs)
				
		@m_dangerObs.length = 0

		i = 0
		bilde = @cutOutPictures(true)
		for picture in bilde
			do(picture) ->
				picture.RegID = data.RegID
				picture.PictureID = i++
				sendPicture = new SendInPictureCommand(picture)
				sendPicture.send()	

		if @m_incident and (i isnt 0 or x isnt 0 or force)
			@m_incident.RegID = data.RegID
			SendObjectToServer(@m_incident)
			@m_incident = null
	    
		@picturePage.afterSendRegistration()
		@hendelsePage.afterSendRegistration()
		
		
		main.addLastRegID(data.RegID)
		DataAccess.save(@name, this)
		
		if not force
			@onSend(@page, false)
		else
			@page.afterSendRegistration()
			main.showFinishedUploadMessage()	
			
	
	completePointRegistration: (data) ->
		if @m_incident
			@m_incident.RegID = data.RegID
			SendObjectToServer(@m_incident)
			@m_incident = null

		i = 0
		bilde = @cutOutPictures(false)
		for picture in bilde
			do(picture) ->
				picture.RegID = data.RegID
				picture.PictureID = i++
				sendPicture = new SendInPictureCommand(picture)
				sendPicture.send()				
				

		@m_pictures.length = 0
		
		@picturePage.afterSendRegistration()
		@hendelsePage.afterSendRegistration()
		@page.afterSendRegistration()
		
		main.addLastRegID(data.RegID)
		DataAccess.save(@name, this)
		main.showFinishedUploadMessage()	
	
	fillIncident: (incident) =>	
		new Incident(incident.RegID, incident.GeoHazardTID, incident.ActivityInfluencedTID, incident.DamageExtentTID, incident.ForecastAccurateTID, incident.DtEndTime, incident.IncidentHeader, incident.IncidentIngress, incident.IncidentText, incident.SensitiveText, incident.UsageFlagTID, incident.Comment)
		
	fillPicture: (picture) =>
		new Picture(picture.PictureID, picture.RegID, picture.PictureImage, picture.Photographer, picture.Copyright, picture.Aspect, picture.GeoHazardTID, picture.Comment, picture.RegistrationTID)
		
	fillDangerObs: (obs) =>
		new DangerObs(obs.DangerObsID, obs.RegID, obs.GeoHazardTID, obs.DangerSignTID, obs.UsageFlagTID, obs.Comment)
		
	fillAvalancheDangerObs: (obs) =>
		new AvalancheDangerObs(obs.AvalancheDangerObsID, obs.RegID, obs.DangerSignTID, obs.UsageFlagTID, obs.Comment)
	
	
	onSend: (page, area) ->
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
			if @filterPicture(true).length isnt 0 || @m_dangerObs.length isnt 0
				location = new ObsLocation("", 33, @long, @lat, source, 0, @omrade_id, null, null, true, null, @regDate, null, null, null, komm_string);
				SendObjectToServer(location, ((data) => @afterLocation(data, true, false)) , (error) => @onError(error))
			else 
				if @filterPicture(false).length isnt 0
					@onSend(page, false)
				else
					location = new ObsLocation("", 33, @long, @lat, source, 0, @omrade_id, null, null, true, null, @regDate, null, null, null, komm_string);
					SendObjectToServer(location, ((data) => @afterLocation(data, true, true)) , (error) => @onError(error))

		else
			if @filterPicture(false).length isnt 0
				location = new ObsLocation("", 33, @long, @lat, source, 0, @omrade_id, null, null, false, null, @regDate, null, null, null, komm_string);
				SendObjectToServer(location, ((data) => @afterLocation(data, false)) , (error) => @onError(error))
			else
				@page.afterSendRegistration()
				main.showFinishedUploadMessage()
		
		
	onAfterLocation: (data, area, force) ->
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, @regDate, 0)
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
		
	filterPicture: (area) ->

		if area
			(picture for picture in @m_pictures when picture.RegistrationTID not in [21, 22, 23, 25, 26, 50, 51, 61, 71])
		else
			(picture for picture in @m_pictures when picture.RegistrationTID in [21, 22, 23, 25, 26, 50, 51, 61, 71])