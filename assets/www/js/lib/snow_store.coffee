class SnowStore extends AbstractStore
	
	constructor: () ->
		@absConstructor()
		
	init: () ->
		@name = 'SnowStore'
		@page = snow_page
		@picturePage = snow_picture
		@hendelsePage = snow_hendelse	
		
		@superInit()
	
	###
	setIncident: (incident) ->
		@m_incident = incident
		DataAccess.save(SnowStore.name, this)
		
	getIncident: () ->
		@m_incident
		
	addSnowObs: (obs) ->
		@m_dangerObs.push(obs)
		DataAccess.save(SnowStore.name, this)
		
	getSnowObs: () ->
		@m_dangerObs
		
	addPicture: (picture) ->
		@m_pictures.push(picture)
		DataAccess.save(SnowStore.name, this)
		
	getPictures: () ->
		@m_pictures
		
	send: () ->
		if area? 
			@onSend(snow_page, area) 
		else 
			@onSend(snow_page, true)
		
	afterLocation: (data, area, force) ->
		@onAfterLocation(data, area, force)
	
	afterRegistration: (data, area, force) ->
		if area
			@completeAreaRegistration(data, force)
		else 
			@completePointRegistration(data)
		
	completeAreaRegistration: (data, force) ->
		i = 0
		for obs in @m_dangerObs 
			do(obs) ->
				obs.RegID = data.RegID
				obs.AvalancheDangerObsID = i++
				SendObjectToServer(obs)
				
		@m_dangerObs.length = 0

		i = 0
		bilde = @cutOutPictures(true)
		for picture in bilde
			do(picture) ->
				picture.RegID = data.RegID
				picture.PictureID = i++
				SendObjectToServer(picture)

		if @m_incident and (i isnt 0 or force)
			@m_incident.RegID = data.RegID
			SendObjectToServer(@m_incident)
			@m_incident = null

		snow_picture.afterSendRegistration()
		snow_hendelse.afterSendRegistration()
		
		DataAccess.save(SnowStore.name, this)
		
		if not force
			@onSend(snow_page, false)
	
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
				SendObjectToServer(picture)

		@m_pictures.length = 0
		
		snow_picture.afterSendRegistration()
		snow_hendelse.afterSendRegistration()
		snow_page.afterSendRegistration()
		
		main.lastRegID = data.RegID
		DataAccess.save(SnowStore.name, this)
		main.showFinishedUploadMessage()
				
	fillIncident: (incident) =>	
		new Incident(incident.RegID, incident.GeoHazardTID, incident.ActivityInfluencedTID, incident.DamageExtentTID, incident.ForecastAccurateTID, incident.DtEndTime, incident.IncidentHeader, incident.IncidentIngress, incident.IncidentText, incident.SensitiveText, incident.UsageFlagTID, incident.Comment)
		
	fillPicture: (picture) =>
		new Picture(picture.PictureID, picture.RegID, picture.PictureImage, picture.Photographer, picture.Copyright, picture.Aspect, picture.GeoHazardTID, picture.Comment, picture.RegistrationTID)
		
	fillAvalancheDangerObs: (obs) =>
		new AvalancheDangerObs(obs.AvalancheDangerObsID, obs.RegID, obs.DangerSignTID, obs.UsageFlagTID, obs.Comment)
	###