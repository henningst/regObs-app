var DataAccess, NORMAL, PASSWORD, STARTUP_PAGE, USERNAME, UserStore;

STARTUP_PAGE = "regobs_startup_page";

USERNAME = "regobs_username";

PASSWORD = "regobs_password";

NORMAL = "normal";

DataAccess = {
  storage: window.localStorage,
  save: function(key, value) {
    var result;
    console.log("saving: " + JSON.stringify(value));
    return result = DataAccess.storage.setItem(key, JSON.stringify(value));
  },
  get: function(key, generic) {
    var result, ret;
    result = DataAccess.storage.getItem(key);
    if (result) {
      ret = JSON.parse(result);
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
    DataAccess.save(this.usernameKey(mode), user.username);
    DataAccess.save(this.passwordKey(mode), user.password);
    return "";
  },
  clear: function(mode) {
    DataAccess.save(this.usernameKey(mode), "");
    DataAccess.save(this.passwordKey(mode), "");
    return "";
  },
  get: function(mode) {
    var password, username;
    username = DataAccess.get(this.usernameKey(mode));
    password = DataAccess.get(this.passwordKey(mode));
    return new User(username, password);
  },
  usernameKey: function(mode) {
    return mode + "_" + USERNAME;
  },
  passwordKey: function(mode) {
    return mode + "_" + PASSWORD;
  }
};
