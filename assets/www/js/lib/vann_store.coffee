class WaterStore

	m_incident = null
	
	m_waterObs = []
	
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
		
	send: (nveSend) ->
		GetObjectFromServer(new DangerSignKD(), this.print);
		
	print: (obj) ->
		console.log(obj)