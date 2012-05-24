class StoreWithDangerObs extends AbstractStore

	superConstructor: () ->
		@m_dangerObs = []
		@m_incident = null
		@m_pictures = []
	
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