class DirtStore

	m_incident = null
	
	m_pictures = []
	
	setIncident: (incident) ->
		m_incident = incident
		
	getIncident: () ->
		m_incident
		
	addPicture: (picture) ->
		m_pictures.push(picture)
		
	getPictures: () ->
		m_pictures

	send: () ->
		location = new ObsLocation($("position_header_town").innerHTML, 33, snow_page.longitude, snow_page.latitute, 0, 0, 0, 250, 250, false, null, new Date());
		SendObjectToServer(location, main.store.getDirt().afterLocation)
		
	afterLocation: (data) ->
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date(), 0)
		SendObjectToServer(registration, main.store.getDirt().afterRegistration)
	
	afterRegistration: (data) ->
		
		if m_incident
			m_incident.RegID = data.RegID
			SendObjectToServer(m_incident)
			m_incident = null

		i = 0
		for picture in m_pictures
			do(picture) ->
				picture.RegID = data.RegID
				picture.PictureID = i++
				SendObjectToServer(picture)

		m_pictures.length = 0
		
		dirt_picture.afterSendRegistration()
		dirt_hendelse.afterSendRegistration()
		dirt_page.afterSendRegistration()