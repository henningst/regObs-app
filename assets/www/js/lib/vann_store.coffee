class WaterStore extends AbstractStore

	constructor: () ->
		@m_incident = null
		@m_pictures = []
	
	setIncident: (incident) ->
		@m_incident = incident
		DataAccess.save(WaterStore.name, this)
		
	getIncident: () ->
		@m_incident
		
	addPicture: (picture) ->
		@m_pictures.push(picture)
		DataAccess.save(WaterStore.name, this)
		
	getPictures: () ->
		@m_pictures

	send: () ->
		@onSend(water_page)
		
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
				picture.PictureID = i
				i += 1
				SendObjectToServer(picture)

		@m_pictures.length = 0
		
		water_picture.afterSendRegistration()
		water_hendelse.afterSendRegistration()
		water_page.afterSendRegistration()
		
		DataAccess.save(WaterStore.name, this)
		
		main.hideDialog();
		alert('Takk for observasjon')