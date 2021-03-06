var IceStore,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

IceStore = (function(_super) {

  __extends(IceStore, _super);

  function IceStore() {
    this.superConstructor();
  }

  IceStore.prototype.init = function() {
    this.name = 'IceStore';
    this.page = ice_page;
    this.picturePage = ice_picture;
    this.hendelsePage = ice_hendelse;
    return this.superInit();
  };

  return IceStore;

})(StoreWithDangerObs);
