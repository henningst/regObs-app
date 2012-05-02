class NveStore
	send = new NveSend
	m_isLoggedIn = false
	
	m_waterStore = null
	
	m_snowStore = null
	
	m_dirtStore = null
	
	m_iceStore = null
	
	login: (userName, userPassword) ->
		send.login(userName, userPassword, this.loginCallback)

	loginCallback: (data) ->
		main.loginCallback(data)
		m_isLoggedIn = true

	isLoggedIn: () ->
		m_isLoggedIn

	loggedInAs: (callback) ->
		send.loggedInAs(callback)

	getSnow: () ->
		if m_snowStore
			m_snowStore
		else
			m_snowStore = new SnowStore()
			
	sendSnow: (callback) ->
		if m_snowStore
			m_snowStore.send()
			m_snowStore = null
		
		callback() if callback

	getDirt: () ->
		if m_dirtStore
			m_dirtStore
		else
			m_dirtStore = new DirtStore()
			
	sendDirt: (callback) ->
		if m_dirtStore
			m_dirtStore.send()
			m_dirtStore = null
		
		callback() if callback
		
	getIce: () ->
		if m_iceStore
			m_iceStore
		else
			m_iceStore = new IceStore()
			
	sendIce: (callback) ->
		if m_iceStore
			m_iceStore.send()
			m_iceStore = null
		
		callback() if callback

	getWater: () ->
		if m_waterStore
			m_waterStore
		else
			m_waterStore = new WaterStore()
			
	sendWater: (callback) ->
		if m_waterStore
			m_waterStore.send()
			m_waterStore = null
		
		callback() if callback

	addObservation: (obs) ->
		m_observations.push(obs)

	addAvalancheDangerObs: (avaObs) ->
		m_avalancheDangerObs.push(avaObs)
		
	addPicture: (picture) ->
		m_pictures.push(picture)
		
	getPictures: () ->
		m_pictures
		
	addIncident: (incident) ->
		m_incident = incident

	getIncident: () ->
		m_incident

	getObservations: () ->
		m_observations
		
	addRegistration: (registration, callback) ->
		send.addRegistration(registration, callback)

	###
	getDangerSign: (callback) ->
		send.getDangerSign(callback)
	###
	
	getObjectFromServer: (call, callback) ->
		send.getObjectFromServer(call, callback)

	sendAll: () ->
		if main.login is null or main.login.data is null
			alert('login')
			return
	
		location = new ObsLocation($("position_header_town").innerHTML, 33, snow_page.longitude, snow_page.latitute, 0, 0, 0, 250, 250, false, null, new Date());
		send.sendObjectToServer(location, this.zweiter)
		
	zweiter: (data) ->
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date(), 0)
		send.sendObjectToServer(registration, main.store.calli)

	sendObjectToServer : (obj, callback) ->
		this.send.sendObjectToServer(obj, callback)

	calli: (data) ->
		i = 0
		for obs in m_avalancheDangerObs
			do(obs) ->
				obs.RegID = data.RegID
				obs.AvalancheDangerObsID = i++
				send.sendObjectToServer(obs, main.store.p)
				
		m_avalancheDangerObs.length = 0
		
		if m_incident
			m_incident.RegID = data.RegID
			send.sendObjectToServer(m_incident, main.store.p)
			m_incident = null

		i = 0
		for picture in m_pictures
			do(picture) ->
				picture.RegID = data.RegID
				picture.PictureID = i++
				send.sendObjectToServer(picture, main.store.p)

		m_pictures.length = 0
		
		snow_picture.afterSendRegistration()
		snow_hendelse.afterSendRegistration()
		snow_page.afterSendRegistration()
		
		alert('Takk for observasjon')

	p : (data) ->
