class IceStore extends AbstractStore

	constructor: () ->
		@m_incident = null
		@m_pictures = []
	
	setIncident: (incident) ->
		@m_incident = incident
		DataAccess.save(IceStore.name, this)
		
	getIncident: () ->
		@m_incident
		
	addPicture: (picture) ->
		@m_pictures.push(picture)
		DataAccess.save(IceStore.name, this)
		
	getPictures: () ->
		@m_pictures

	send: () ->
		@onSend(ice_page)
		
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
		
		ice_picture.afterSendRegistration()
		ice_hendelse.afterSendRegistration()
		ice_page.afterSendRegistration()
		
		DataAccess.save(IceStore.name, this)
		
		alert('Takk for observasjon')