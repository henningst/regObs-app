// Generated by CoffeeScript 1.3.3
var COMP, DataAccess, GROUP, ID, PASSWORD, STARTUP_PAGE, USERNAME, UserStore;

STARTUP_PAGE = "regobs_startup_page";

USERNAME = "regobs_username";

PASSWORD = "regobs_password";

ID = "regobs_id";

GROUP = "regobs_group";

COMP = "regobs_comp";

DataAccess = {
  storage: window.localStorage,
  save: function(key, value) {
    var result;
    console.log("saving: (" + key + ", " + JSON.stringify(value) + ")");
    return result = DataAccess.storage.setItem(key, JSON.stringify(value));
  },
  get: function(key, generic) {
    var result, ret;
    result = DataAccess.storage.getItem(key);
    if (result) {
      try {
        ret = JSON.parse(result);
      } catch (error) {
        return result;
      }
      if (generic) {
        return ret = jQuery.extend(generic, ret);
      } else {
        return ret;
      }
    } else {
      return null;
    }
  }
};

UserStore = {
  save: function(mode, user) {
    DataAccess.save(this.useridKey(mode), user.id);
    DataAccess.save(this.usernameKey(mode), user.username);
    DataAccess.save(this.passwordKey(mode), user.password);
    DataAccess.save(this.groupKey(mode), user.groups);
    DataAccess.save(this.compKey(mode), user.competancy);
    return "";
  },
  clear: function(mode) {
    DataAccess.save(this.useridKey(mode), "");
    DataAccess.save(this.usernameKey(mode), "");
    DataAccess.save(this.passwordKey(mode), "");
    DataAccess.save(this.groupKey(mode), "");
    DataAccess.save(this.compKey(mode), "");
    return "";
  },
  get: function(mode) {
    var comp, groups, id, password, user, username;
    id = DataAccess.get(this.useridKey(mode));
    username = DataAccess.get(this.usernameKey(mode));
    password = DataAccess.get(this.passwordKey(mode));
    groups = DataAccess.get(this.groupKey(mode));
    comp = DataAccess.get(this.compKey(mode), new ObserverCompetancy([]));
    user = new User(id, username, password);
    if (groups) {
      user.groups = jQuery.map(groups, function(obj) {
        return jQuery.extend(obj, new Group());
      });
    }
    if (comp) {
      user.competancy = comp;
    } else {
      user.competancy = new ObserverCompetancy([]);
    }
    return user;
  },
  useridKey: function(mode) {
    return mode + "_" + ID;
  },
  usernameKey: function(mode) {
    return mode + "_" + USERNAME;
  },
  passwordKey: function(mode) {
    return mode + "_" + PASSWORD;
  },
  groupKey: function(mode) {
    return mode + "_" + GROUP;
  },
  compKey: function(mode) {
    return mode + "_" + COMP;
  }
};
