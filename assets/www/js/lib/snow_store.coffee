class SnowStore

	m_incident = null
	
	m_snowObs = []
	
	m_pictures = []
	
	setIncident: (incident) ->
		m_incident = incident
		
	getIncident: () ->
		m_incident
		
	addSnowObs: (obs) ->
		m_snowObs.push(obs)
		
	getSnowObs: () ->
		m_snowObs
		
	addPicture: (picture) ->
		m_pictures.push(picture)
		
	getPictures: () ->
		m_pictures
		
	send: () ->
		alert("send")
		location = new ObsLocation($("position_header_town").innerHTML, 33, snow_page.longitude, snow_page.latitute, 0, 0, 0, 250, 250, false, null, new Date());
		SendObjectToServer(location, main.store.getSnow().afterLocation)
		
	afterLocation: (data) ->
		alert("afterSend #{data.ObsLocationID} #{main.login.data.ObserverID} #{data.ObsLocationID}")
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, new Date(), new Date(), 0)
		SendObjectToServer(registration, main.store.getSnow().afterRegistration)
	
	afterRegistration: (data) ->
		alert("afterReg" +" " +data.RegID)
		i = 0
		for obs in m_snowObs
			do(obs) ->
				obs.RegID = data.RegID
				obs.AvalancheDangerObsID = i++
				SendObjectToServer(obs, main.store.p)
				
		m_snowObs.length = 0
		
		if m_incident
			m_incident.RegID = data.RegID
			SendObjectToServer(m_incident, main.store.p)
			m_incident = null

		i = 0
		for picture in m_pictures
			do(picture) ->
				picture.RegID = data.RegID
				picture.PictureID = i++
				SendObjectToServer(picture, main.store.p)

		m_pictures.length = 0
		
		snow_picture.afterSendRegistration()
		snow_hendelse.afterSendRegistration()
		snow_page.afterSendRegistration()
		
	print: (obj) ->
		console.log(obj)