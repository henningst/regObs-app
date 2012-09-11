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
      setTimeout(()-> 
        main.updateCollection(collection) 
      ,1000) if main
      
      DataAccess.save("PackageCollection", collection)
    
    @packageCollection.callback(@packageCollection)


  getNotificationId: () =>
    if @notificationId and @notificationId.id 
      @notificationId.id
    else
      null 

  setNotificationId : (id)=>
    @notificationId = {"id": id}

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
      
      
      
  sendSnow: (callback) =>
      if @m_snowPackage and not IsEmpty(@m_snowPackage)
        @m_snowPackage.setGroup(jQuery("#snow_obs .selectedGroup").val());
        @packageCollection.add(@m_snowPackage)
        @m_snowPackage.afterSendRegistration()
        
        @m_snowPackage =  null 
        DataAccess.save(SnowPackage.name, null)
      
      @packageCollection.forall (p) => @sendAndHandlePackage(p)
      callback() if callback
    
  sendAndHandlePackage: (p)->
    p.callback = (pkg) ->
      collection = main.store.packageCollection 
      pkg.freezed = true
      collection.remove(pkg)
    
    p.send()

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
      @m_dirtPackage.setGroup(jQuery("#dirt_group").val());
      @packageCollection.add(@m_dirtPackage)
      @m_dirtPackage.afterSendRegistration()
      
      @m_dirtPackage = null
      DataAccess.save(DirtPackage.name, null)
      
    @packageCollection.forall (p) => @sendAndHandlePackage(p)
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
      @m_icePackage.setGroup(jQuery("#ice_group").val());
      @packageCollection.add(@m_icePackage)
      @m_icePackage.afterSendRegistration()
      
      @m_icePackage = null
      DataAccess.save(IcePackage.name, null)
      
    @packageCollection.forall (p) => @sendAndHandlePackage(p)
    
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
      @m_waterPackage.setGroup(jQuery("#water_group").val());
      @packageCollection.add(@m_waterPackage)
      @m_waterPackage.afterSendRegistration()
      
      @m_waterPackage = null
      DataAccess.save(WaterPackage.name, null)
      
    @packageCollection.forall (p) => @sendAndHandlePackage(p)
    
    callback() if callback
    
  
IsEmpty = (pkg) ->
  if pkg.getObs().length isnt 0
    return false 
  
  if pkg.getIncident() isnt null
    return false
    
  if pkg.getPictures().length isnt 0
    return false
    
  true
