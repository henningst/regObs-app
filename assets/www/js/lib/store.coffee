class NveStore
  
  constructor: () ->
    @m_waterPack7age = null
    @m_snowPackage = null
    @m_dirtPackage = null
    @m_icePackage = null
    
    
    @packageCollection =  DataAccess.get("PackageCollection", new PackageCollection())
    if not @packageCollection || @packageCollection == "undefined"
      @packageCollection = new PackageCollection()
      DataAccess.save("PackageCollection", @packageCollection)
    
    @packageCollection.callback = (collection)->
      collection.ids = {}
      DataAccess.save("PackageCollection", collection)
    
    @packageCollection.callback(@packageCollection) 

  clearPackageCollection : ()->
    @packageCollection =  new PackageCollection()
    DataAccess.save("PackageCollection", @packageCollection)

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
      
  clearSnow : ()->
    @m_snowPackage.afterSendRegistration() if @m_snowPackage
     
    @resetGroups()
    @m_snowPackage =  null 
    DataAccess.save(SnowPackage.name, null)
    
  deleteSnow : ()->
    @clearSnow()
  
      
  sendSnow: (callback) =>
    main.hideDialog()
    if @m_snowPackage and not IsEmpty(@m_snowPackage)
      @m_snowPackage.setGroup(jQuery("#snow_obs .selectedGroup").val());
      @packageCollection.add(@m_snowPackage)
      @clearSnow()
    
    @packageCollection.forall (p) => @sendAndHandlePackage(p, () => main.store.clearSnow())
    callback() if callback

  resetGroups : () =>
    jQuery(".selectedGroup").val(0);
    jQuery(".groupButton").attr("value", "Gruppe").removeClass("pressed");
    
  sendAndHandlePackage: (p, clearFunc)->
    p.callback = (pkg) ->
      collection = main.store.packageCollection
      console.log("pr: removeing package " + JSON.stringify(collection))
      pkg.freezed = true
      collection.remove(pkg)
      clearFunc()
      DataAccess.save("PackageCollection", @packageCollection)
      main.updateCollection(collection)
      
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
      
  clearDirt : ()->
    @m_dirtPackage.afterSendRegistration() if @m_dirtPackage
      
    @m_dirtPackage = null
    DataAccess.save(DirtPackage.name, null)
    
  deleteDirt : ()->
    @clearDirt()
      
  sendDirt: (callback) ->
    if @m_dirtPackage and not IsEmpty(@m_dirtPackage)
      @m_dirtPackage.setGroup(jQuery("#dirt_group").val());
      @packageCollection.add(@m_dirtPackage)
      @clearDirt()
      
      
    @packageCollection.forall (p) => @sendAndHandlePackage(p, () => main.store.clearDirt())
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
      
      
  clearIce : ()->
    @m_icePackage.afterSendRegistration() if @m_icePackage
      
    @m_icePackage = null
    DataAccess.save(IcePackage.name, null)
    
  deleteIce : ()->
    @clearIce()
    
  sendIce: (callback) ->
    if @m_icePackage and not IsEmpty(@m_icePackage)
      @m_icePackage.setGroup(jQuery("#ice_group").val());
      @packageCollection.add(@m_icePackage)
      @clearIce()
      
    @packageCollection.forall (p) => @sendAndHandlePackage(p, () => main.store.clearIce())
    
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
      
  clearWater :()->
      @m_waterPackage.afterSendRegistration() if @m_waterPackage
      
      @m_waterPackage = null
      DataAccess.save(WaterPackage.name, null)
      
  deleteWater : ()->
    @clearWater()
      
  sendWater: (callback) ->
    if @m_waterPackage and not IsEmpty(@m_waterPackage)
      @m_waterPackage.setGroup(jQuery("#water_group").val());
      @packageCollection.add(@m_waterPackage)
      @clearWater()
      
    @packageCollection.forall (p) => @sendAndHandlePackage(p, () => main.store.clearWater())
    
    callback() if callback
    
  
IsEmpty = (pkg) ->
  if pkg.getObs().length isnt 0
    return false 
  
  if pkg.getIncident() isnt null
    return false
    
  if pkg.getPictures().length isnt 0
    return false
    
  true
