class SnowStore extends AbstractStore
	
	constructor: () ->
		@m_snowObs = []
		@m_incident = null
		@m_pictures = []
		
	init: () ->
		@m_snowObs = (@fillAvalancheDangerObs obs for obs in @m_snowObs)
		@m_pictures = (@fillPicture picture for picture in @m_pictures)
		@m_incident = @fillIncident @m_incident if @m_incident
	
	setIncident: (incident) ->
		@m_incident = incident
		DataAccess.save(SnowStore.name, this)
		
	getIncident: () ->
		@m_incident
		
	addSnowObs: (obs) ->
		@m_snowObs.push(obs)
		DataAccess.save(SnowStore.name, this)
		
	getSnowObs: () ->
		@m_snowObs
		
	addPicture: (picture) ->
		@m_pictures.push(picture)
		DataAccess.save(SnowStore.name, this)
		
	getPictures: () ->
		@m_pictures
		
	send: () ->
		@onSend(snow_page)
		
	afterLocation: (data) ->
		@onAfterLocation(data)
	
	afterRegistration: (data) ->
		i = 0
		for obs in @m_snowObs
			do(obs) ->
				obs.RegID = data.RegID
				obs.AvalancheDangerObsID = i++
				SendObjectToServer(obs)
				
		@m_snowObs.length = 0
		
		if @m_incident
			@m_incident.RegID = data.RegID
			SendObjectToServer(@m_incident)
			@m_incident = null

		i = 0
		for picture in @m_pictures
			do(picture) ->
				picture.RegID = data.RegID
				picture.PictureID = i++
				SendObjectToServer(picture)

		@m_pictures.length = 0
		
		snow_picture.afterSendRegistration()
		snow_hendelse.afterSendRegistration()
		snow_page.afterSendRegistration()
		
		DataAccess.save(SnowStore.name, this)
		main.showFinishedUploadMessage()
		
	fillIncident: (incident) =>	
		new Incident(incident.RegID, incident.GeoHazardTID, incident.ActivityInfluencedTID, incident.DamageExtentTID, incident.ForecastAccurateTID, incident.DtEndTime, incident.IncidentHeader, incident.IncidentIngress, incident.IncidentText, incident.SensitiveText, incident.UsageFlagTID, incident.Comment)
		
	fillPicture: (picture) =>
		new Picture(picture.PictureID, picture.RegID, picture.PictureImage, picture.Photographer, picture.Copyright, picture.Aspect, picture.GeoHazardTID, picture.Comment)
		
	fillAvalancheDangerObs: (obs) =>
		new AvalancheDangerObs(obs.AvalancheDangerObsID, obs.RegID, obs.DangerSignTID, obs.UsageFlagTID, obs.Comment)
		