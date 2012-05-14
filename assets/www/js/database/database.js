var DataAccess, PASSWORD, STARTUP_PAGE, USERNAME;

STARTUP_PAGE = "regobs_startup_page";

USERNAME = "regobs_username";

PASSWORD = "regobs_password";

DataAccess = {
  storage: window.localStorage,
  save: function(key, value) {
    var result;
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
