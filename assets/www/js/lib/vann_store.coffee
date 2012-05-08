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
		source = 0
		
		pos = water_page.pos_obj
		if pos
			elapsedInMinutes = ((new Date()).getTime() - pos.taken.getTime()) / 1000 / 60
			if elapsedInMinutes < GPS_TIMEOUT_IN_MINUTES
				source = GPS_POSITION
			else
				source = OLD_GPS_POSITION
				
		location = new ObsLocation($("water_position_header_town").innerHTML, 33, water_page.longitude, water_page.latitute, source, 0, 0, 250, 250, false, null, new Date());
		SendObjectToServer(location, main.store.getWater().afterLocation)
		
	afterLocation: (data) ->
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, new Date(), 0)
		SendObjectToServer(registration, main.store.getWater().afterRegistration)
	
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
		
		water_picture.afterSendRegistration()
		water_hendelse.afterSendRegistration()
		water_page.afterSendRegistration()
		
		alert('Takk for observasjon')