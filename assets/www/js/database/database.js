// Generated by CoffeeScript 1.4.0
var COMP, DATA_VERSION_KEY, DataAccess, GROUP, ID, NICK, PASSWORD, SEARCH_DIAMETER_KEY, STARTUP_PAGE, USERNAME, UserStore;

STARTUP_PAGE = "regobs_startup_page";

USERNAME = "regobs_username";

PASSWORD = "regobs_password";

ID = "regobs_id";

GROUP = "regobs_group";

COMP = "regobs_comp";

SEARCH_DIAMETER_KEY = "search_diameter_key";

DATA_VERSION_KEY = "data_version_key";

NICK = "nick";

DataAccess = {
  storage: window.localStorage,
  save: function(key, value) {
    var result;
    window.lastsaved = value;
    key = APP_VERSION + "_" + key;
    console.log("saving: (" + key + ", " + JSON.stringify(value) + ")");
    return result = DataAccess.storage.setItem(key, JSON.stringify(value));
  },
  get: function(key, generic) {
    var result, ret;
    key = APP_VERSION + "_" + key;
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
  },
  clear: function() {
    return DataAccess.storage.clear();
  },
  handleCompatibility: function(version) {
    var currectDataVersion;
    currectDataVersion = DataAccess.get(DATA_VERSION_KEY);
    if (currectDataVersion && version !== currectDataVersion) {
      DataAccess.clear();
      DataAccess.save(DATA_VERSION_KEY, version);
      if (device.platform === 'android') {
        return main.showDialogWithMessageAndFunction("For å fullføre oppdateringen må vi starte appen på nytt. Etter at appen er avsluttet må du starte den på nytt.", "Oppdatering", "Avslutt", "navigator.app.exitApp();");
      }
    } else {
      return console.log("Data migration ok");
    }
  }
};

UserStore = {
  save: function(mode, user) {
    DataAccess.save(this.useridKey(mode), user.id);
    DataAccess.save(this.userNick(mode), user.nick);
    DataAccess.save(this.usernameKey(mode), user.username);
    DataAccess.save(this.passwordKey(mode), user.password);
    return "";
  },
  saveComp: function(mode, user) {
    DataAccess.save(this.compKey(mode), user.competancy);
    return "";
  },
  saveGroups: function(mode, user) {
    DataAccess.save(this.groupKey(mode), user.groups);
    return "";
  },
  clear: function(mode) {
    DataAccess.save(this.useridKey(mode), "");
    DataAccess.save(this.usernameKey(mode), "");
    DataAccess.save(this.userNick(mode), "");
    DataAccess.save(this.passwordKey(mode), "");
    DataAccess.save(this.groupKey(mode), "");
    DataAccess.save(this.compKey(mode), "");
    return "";
  },
  get: function(mode) {
    var comp, groups, id, nick, password, user, username;
    id = DataAccess.get(this.useridKey(mode));
    nick = DataAccess.get(this.userNick(mode));
    username = DataAccess.get(this.usernameKey(mode));
    password = DataAccess.get(this.passwordKey(mode));
    groups = DataAccess.get(this.groupKey(mode));
    comp = DataAccess.get(this.compKey(mode), new ObserverCompetancy([]));
    user = new User(id, username, password, nick);
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
  userNick: function(mode) {
    return mode + "_" + NICK;
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
