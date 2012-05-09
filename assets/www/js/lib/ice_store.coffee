class IceStore

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
		source = 0
		
		pos = ice_page.pos_obj
		if pos
			elapsedInMinutes = ((new Date()).getTime() - pos.taken.getTime()) / 1000 / 60
			if elapsedInMinutes < GPS_TIMEOUT_IN_MINUTES
				source = GPS_POSITION
			else
				source = OLD_GPS_POSITION
				
		location = new ObsLocation($("ice_position_header_town").innerHTML, 33, ice_page.longitude, ice_page.latitute, source, 0, 0, 250, 250, false, null, new Date());
		SendObjectToServer(location, (data) => @afterLocation(data))
		
	afterLocation: (data) ->
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, new Date(), 0)
		SendObjectToServer(registration, (data) => @afterRegistration(data))
	
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