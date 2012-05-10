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
			@m_snowStore = DataAccess.get(SnowStore.name, new SnowStore())
			if @m_snowStore
				@m_snowStore
			else
				@m_snowStore = new SnowStore()
			
	sendSnow: (callback) ->
		if @m_snowStore
			@m_snowStore.send()
		
		callback() if callback

	getDirt: () ->
		if @m_dirtStore
			@m_dirtStore
		else
			@m_dirtStore = DataAccess.get(DirtStore.name, new DirtStore())
			if @m_dirtStore
				@m_dirtStore
			else
				@m_dirtStore = new DirtStore()
			
	sendDirt: (callback) ->
		if @m_dirtStore
			@m_dirtStore.send()
		
		callback() if callback
		
	getIce: () ->
		if @m_iceStore
			@m_iceStore
		else
			@m_iceStore = DataAccess.get(IceStore.name, new IceStore())
			if @m_iceStore
				@m_iceStore
			else
				@m_iceStore = new IceStore()
			
	sendIce: (callback) ->
		if @m_iceStore
			@m_iceStore.send()
		
		callback() if callback

	getWater: () ->
		if @m_waterStore
			@m_waterStore
		else
			@m_waterStore = DataAccess.get(WaterStore.name, new WaterStore())
			if @m_waterStore
				@m_waterStore
			else
				@m_waterStore = new WaterStore()
			
	sendWater: (callback) ->
		if @m_waterStore
			@m_waterStore.send()
		
		callback() if callback
