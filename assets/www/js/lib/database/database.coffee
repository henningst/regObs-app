STARTUP_PAGE = "regobs_startup_page"

USERNAME = "regobs_username"

PASSWORD = "regobs_password"

ID="regobs_id"

GROUP = "regobs_group"

COMP = "regobs_comp"

SEARCH_DIAMETER_KEY = "search_diameter_key";

DATA_VERSION_KEY = "data_version_key";

NICK = "nick";


DataAccess = {
  storage : window.localStorage

  save: (key, value) ->
    window.lastsaved = value
    
    console.log("saving: (" + key + ", " + JSON.stringify(value) + ")");
    result = DataAccess.storage.setItem(key, JSON.stringify(value))

  get: (key, generic) ->
    result = DataAccess.storage.getItem(key)
    
    if result
      try
        ret = JSON.parse(result)
      catch error
        return result 
      
      if generic
        ret = jQuery.extend(generic, ret);
      else
        ret
    else
      null
      
  clear : ()->
    DataAccess.storage.clear()
    
  handleCompatibility : (version)->
    currectDataVersion = DataAccess.get(DATA_VERSION_KEY);
    if(currectDataVersion && version > currectDataVersion)
      user_normal = UserStore.get(TEST_MODE)
      user_stage  = UserStore.get(STAGE_MODE)
      DataAccess.clear();
      
      UserStore.save(TEST_MODE, user_normal)
      UserStore.save(STAGE_MODE, user_stage)
      
    else
      console.log("Data migration ok");
      
    DataAccess.save(DATA_VERSION_KEY, version);
}


UserStore = {
  save: (mode, user) ->
    DataAccess.save(@useridKey(mode), user.id)
    DataAccess.save(@userNick(mode), user.nick)
    DataAccess.save(@usernameKey(mode), user.username)
    DataAccess.save(@passwordKey(mode), user.password)
    ""
    
  saveComp :(mode, user) ->
    DataAccess.save(@compKey(mode), user.competancy)
    ""
    
  saveGroups: (mode, user) ->
    DataAccess.save(@groupKey(mode), user.groups)
    ""
    
  clear: (mode)->
    DataAccess.save(@useridKey(mode), "")
    DataAccess.save(@usernameKey(mode), "")
    DataAccess.save(@userNick(mode), "")
    DataAccess.save(@passwordKey(mode), "")
    DataAccess.save(@groupKey(mode), "")
    DataAccess.save(@compKey(mode), "")
    ""
  
  get: (mode) ->
    id =       DataAccess.get(@useridKey(mode))
    nick = 		 DataAccess.get(@userNick(mode))
    username = DataAccess.get(@usernameKey(mode))
    password = DataAccess.get(@passwordKey(mode))
    groups = DataAccess.get(@groupKey(mode))
    comp = DataAccess.get(@compKey(mode), new ObserverCompetancy([]))
    user = new User(id, username, password, nick)
    
    user.groups = jQuery.map(groups, (obj)-> 
      jQuery.extend(obj, new Group())
    ) if groups
    
    if(comp)
      user.competancy = comp
    else
      user.competancy = new ObserverCompetancy([])
    user
  
  useridKey : (mode) ->
    mode + "_" + ID
  
  usernameKey : (mode) ->
    mode + "_" + USERNAME
  userNick : (mode)->
  	mode + "_" + NICK
    
  passwordKey: (mode) ->
    mode + "_" + PASSWORD
    
  groupKey : (mode) ->
    mode + "_" + GROUP
    
  compKey : (mode) ->
    mode + "_" + COMP
}