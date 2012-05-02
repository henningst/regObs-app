class WaterStore

	m_incident = null
	
	m_pictures = []
	
	setIncident: (incident) ->
		m_incident = incident
		
	getIncident: () ->
		m_incident
		
	addWaterObs: (obs) ->
		m_waterObs.push(obs)
		
	getWaterObs: () ->
		m_waterObs
		
	addPicture: (picture) ->
		m_pictures.push(picture)
		
	getPictures: () ->
		m_pictures

	send: () ->
		location = new ObsLocation($("position_header_town").innerHTML, 33, snow_page.longitude, snow_page.latitute, 0, 0, 0, 250, 250, false, null, new Date());
		SendObjectToServer(location, main.store.getSnow().afterLocation)
		
	afterLocation: (data) ->
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date(), 0)
		SendObjectToServer(registration, main.store.getSnow().afterRegistration)
	
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
		
		vann_picture.afterSendRegistration()
		vann_hendelse.afterSendRegistration()
		vann_page.afterSendRegistration()