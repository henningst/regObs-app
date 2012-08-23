class NveStore
	
	constructor: () ->
		@m_waterStore = null
		@m_snowStore = null
		@m_dirtStore = null
		@m_iceStore = null

	getSnow: () ->
		if @m_snowStore
			@m_snowStore
		else
			@m_snowStore = DataAccess.get(SnowPackage.name, new SnowPackage())
			if @m_snowStore
				@m_snowStore.init()
				@m_snowStore
			else
				@m_snowStore = new SnowPackage()
				@m_snowStore.init()
				@m_snowStore
			
	sendSnow: (callback) ->
		if @m_snowStore and not IsEmpty(@m_snowStore)
			@m_snowStore.send()
		
		callback() if callback

	getDirt: () ->
		if @m_dirtStore
			@m_dirtStore
		else
			@m_dirtStore = DataAccess.get(DirtPackage.name, new DirtPackage())
			if @m_dirtStore
				@m_dirtStore.init()
				@m_dirtStore
			else
				@m_dirtStore = new DirtPackage()
				@m_dirtStore.init()
				@m_dirtStore
			
	sendDirt: (callback) ->
		if @m_dirtStore and not IsEmpty(@m_dirtStore)
			@m_dirtStore.send()
		
		callback() if callback
		
	getIce: () ->
		if @m_iceStore
			@m_iceStore
		else
			@m_iceStore = DataAccess.get(IcePackage.name, new IcePackage())
			if @m_iceStore
				@m_iceStore.init()
				@m_iceStore
			else
				@m_iceStore = new IcePackage()
				@m_iceStore.init()
				@m_iceStore
			
	sendIce: (callback) ->
		if @m_iceStore and not IsEmpty(@m_iceStore)
			@m_iceStore.send()
		
		callback() if callback

	getWater: () ->
		if @m_waterStore
			@m_waterStore
		else
			@m_waterStore = DataAccess.get(WaterPackage.name, new WaterPackage())
			if @m_waterStore
				@m_waterStore.init()
				@m_waterStore
			else
				@m_waterStore = new WaterPackage()
				@m_waterStore.init()
				@m_waterStore
			
	sendWater: (callback) ->
		if @m_waterStore and not IsEmpty(@m_waterStore)
			@m_waterStore.send()
		
		callback() if callback
		
IsEmpty = (store) ->
	if store.getObs().length isnt 0
		return false 
	
	if store.getIncident() isnt null
		return false
		
	if store.getPictures().length isnt 0
		return false
		
	true
