class StoreWithDangerObs extends AbstractStore

	superConstructor: () ->
		@m_dangerObs = []
		@m_incident = null
		@m_pictures = []
	
	superInit: () ->
		@m_dangerObs = (@fillDangerObs obs for obs in @m_dangerObs)
		@m_pictures = (@fillPicture picture for picture in @m_pictures)
		@m_incident = @fillIncident @m_incident if @m_incident
	
	setIncident: (incident) ->
		@m_incident = incident
		DataAccess.save(@name, this)
		
	getIncident: () ->
		@m_incident
		
	addObs: (obs) ->
		@m_dangerObs.push(obs)
		DataAccess.save(@name, this)
		
	getObs: () ->
		@m_dangerObs
		
	addPicture: (picture) ->
		@m_pictures.push(picture)
		DataAccess.save(@name, this)
		
	getPictures: () ->
		@m_pictures
		
	send: () ->
		@onSend(@page)
		
	afterLocation: (data) ->
		@onAfterLocation(data)
	
	afterRegistration: (data) ->
		i = 0
		for obs in @m_dangerObs
			do(obs) ->
				obs.RegID = data.RegID
				obs.DangerObsID = i++
				SendObjectToServer(obs)
				
		@m_dangerObs.length = 0
		
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
		
		@picturePage.afterSendRegistration()
		@hendelsePage.afterSendRegistration()
		@page.afterSendRegistration()
		
		DataAccess.save(@name, this)
		main.showFinishedUploadMessage()
		
	fillIncident: (incident) =>	
		new Incident(incident.RegID, incident.GeoHazardTID, incident.ActivityInfluencedTID, incident.DamageExtentTID, incident.ForecastAccurateTID, incident.DtEndTime, incident.IncidentHeader, incident.IncidentIngress, incident.IncidentText, incident.SensitiveText, incident.UsageFlagTID, incident.Comment)
		
	fillPicture: (picture) =>
		new Picture(picture.PictureID, picture.RegID, picture.PictureImage, picture.Photographer, picture.Copyright, picture.Aspect, picture.GeoHazardTID, picture.Comment)
		
	fillDangerObs: (obs) =>
		new DangerObs(obs.DangerObsID, obs.RegID, obs.GeoHazardTID, obs.DangerSignTID, obs.UsageFlagTID, obs.Comment)
		