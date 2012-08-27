class NveStore
	
	constructor: () ->
		@m_waterPackage = null
		@m_snowPackage = null
		@m_dirtPackage = null
		@m_icePackage = null
		
		
		@packageCollection =  DataAccess.get("PackageCollection", new PackageCollection())
		if not @packageCollection
		  @packageCollection = new PackageCollection()
  		DataAccess.save("PackageCollection", @packageCollection)
		   
		
		
		@packageCollection.callback = (collection)->
      if(collection.size() > 0)
        jQuery(".numPackages").hide().text(collection.size()).show()
      else
        jQuery(".numPackages").hide()
      
      DataAccess.save("PackageCollection", collection)
    
    @packageCollection.callback(@packageCollection)
    
    console.log("packagecollection antall packages at start:" + @packageCollection.size())
		

	getSnow: () ->
		if @m_snowPackage
			@m_snowPackage
		else
			@m_snowPackage = DataAccess.get(SnowPackage.name, new SnowPackage())
			if @m_snowPackage
				@m_snowPackage.init()
				@m_snowPackage
			else
				@m_snowPackage = new SnowPackage()
				@m_snowPackage.init()
				@m_snowPackage
			
	sendSnow: (callback) ->
		if @m_snowPackage and not IsEmpty(@m_snowPackage)
      @m_snowPackage.freezed = true
      @packageCollection.add(@m_snowPackage)
		  
      @m_snowPackage.picturePage.afterSendRegistration()
      @m_snowPackage.hendelsePage.afterSendRegistration()
      @m_snowPackage.page.afterSendRegistration()
      
		  @m_snowPackage =  null 
      DataAccess.save(SnowPackage.name, null)
		  
    console.log("antall pakker: " + @packageCollection.size())
			
			
		collection = @packageCollection
		@packageCollection.forall (p) ->
      p.callback = (pkg) -> collection.remove(p)
      p.send()
      
		callback() if callback

	getDirt: () ->
		if @m_dirtPackage
			@m_dirtPackage
		else
			@m_dirtPackage = DataAccess.get(DirtPackage.name, new DirtPackage())
			if @m_dirtPackage
				@m_dirtPackage.init()
				@m_dirtPackage
			else
				@m_dirtPackage = new DirtPackage()
				@m_dirtPackage.init()
				@m_dirtPackage
			
	sendDirt: (callback) ->
		if @m_dirtPackage and not IsEmpty(@m_dirtPackage)
			@m_dirtPackage.send()
		
		callback() if callback
		
	getIce: () ->
		if @m_icePackage
			@m_icePackage
		else
			@m_icePackage = DataAccess.get(IcePackage.name, new IcePackage())
			if @m_icePackage
				@m_icePackage.init()
				@m_icePackage
			else
				@m_icePackage = new IcePackage()
				@m_icePackage.init()
				@m_icePackage
			
	sendIce: (callback) ->
		if @m_icePackage and not IsEmpty(@m_icePackage)
			@m_icePackage.send()
		
		callback() if callback

	getWater: () ->
		if @m_waterPackage
			@m_waterPackage
		else
			@m_waterPackage = DataAccess.get(WaterPackage.name, new WaterPackage())
			if @m_waterPackage
				@m_waterPackage.init()
				@m_waterPackage
			else
				@m_waterPackage = new WaterPackage()
				@m_waterPackage.init()
				@m_waterPackage
			
	sendWater: (callback) ->
		if @m_waterPackage and not IsEmpty(@m_waterPackage)
			@m_waterPackage.send()
		
		callback() if callback
		
IsEmpty = (package) ->
	if package.getObs().length isnt 0
		return false 
	
	if package.getIncident() isnt null
		return false
		
	if package.getPictures().length isnt 0
		return false
		
	true
