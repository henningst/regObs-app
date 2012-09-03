STARTUP_PAGE = "regobs_startup_page"

USERNAME = "regobs_username"

PASSWORD = "regobs_password"

ID="regobs_id"

GROUP = "regobs_group"

COMP = "regobs_comp"


DataAccess = {
  storage : window.localStorage

  save: (key, value) ->
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
}


UserStore = {
  save: (mode, user) ->
    DataAccess.save(@useridKey(mode), user.id)
    DataAccess.save(@usernameKey(mode), user.username)
    DataAccess.save(@passwordKey(mode), user.password)
    DataAccess.save(@groupKey(mode), user.groups)
    DataAccess.save(@compKey(mode), user.competancy)
    ""
    
  clear: (mode)->
    DataAccess.save(@useridKey(mode), "")
    DataAccess.save(@usernameKey(mode), "")
    DataAccess.save(@passwordKey(mode), "")
    DataAccess.save(@groupKey(mode), "")
    DataAccess.save(@compKey(mode), "")
    ""
  
  get: (mode) ->
    id =       DataAccess.get(@useridKey(mode))
    username = DataAccess.get(@usernameKey(mode))
    password = DataAccess.get(@passwordKey(mode))
    groups = DataAccess.get(@groupKey(mode))
    comp = DataAccess.get(@compKey(mode), new ObserverCompetancy([]))
    user = new User(id, username, password)
    
    user.groups = jQuery.map(groups, (obj)-> 
      jQuery.extend(obj, new Group())
    ) if groups
    
    user.competancy = comp
    user
  
  useridKey : (mode) ->
    mode + "_" + ID
  
  usernameKey : (mode) ->
    mode + "_" + USERNAME
    
  passwordKey: (mode) ->
    mode + "_" + PASSWORD
    
  groupKey : (mode) ->
    mode + "_" + GROUP
    
  compKey : (mode) ->
    mode + "_" + COMP
}