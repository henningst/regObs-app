class SnowStore
	
	constructor: () ->
		@m_snowObs = []
		@m_incident = null
		@m_pictures = []
	
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
		source = 0
		
		pos = snow_page.pos_obj
		if pos
			elapsedInMinutes = ((new Date()).getTime() - pos.taken.getTime()) / 1000 / 60
			if elapsedInMinutes < GPS_TIMEOUT_IN_MINUTES
				source = GPS_POSITION
			else
				source = OLD_GPS_POSITION
		
		location = new ObsLocation($("position_header_town").innerHTML, 33, snow_page.longitude, snow_page.latitute, source, 0, 0, 250, 250, false, null, new Date());
		SendObjectToServer(location, (data) => @afterLocation(data))
		
	afterLocation: (data) ->
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, new Date(), 0)
		SendObjectToServer(registration, (data) => @afterRegistration(data))
	
	afterRegistration: (data) ->
		console.log(this)
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
		
		alert('Takk for observasjon')