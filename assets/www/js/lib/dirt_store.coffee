class DirtStore extends AbstractStore

	constructor: () ->
		@m_incident = null
		@m_pictures = []
	
	setIncident: (incident) ->
		@m_incident = incident
		DataAccess.save(DirtStore.name, this)
		
	getIncident: () ->
		@m_incident
		
	addPicture: (picture) ->
		@m_pictures.push(picture)
		DataAccess.save(DirtStore.name, this)
		
	getPictures: () ->
		@m_pictures

	send: () ->
		@onSend(dirt_page)
		
	afterLocation: (data) ->
		@onAfterLocation(data)
	
	afterRegistration: (data) ->
		
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
		
		dirt_picture.afterSendRegistration()
		dirt_hendelse.afterSendRegistration()
		dirt_page.afterSendRegistration()
		
		DataAccess.save(DirtStore.name, this)
		
		alert('Takk for observasjon')