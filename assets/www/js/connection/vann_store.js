var WaterStore,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

WaterStore = (function(_super) {

  __extends(WaterStore, _super);

  function WaterStore() {
    this.superConstructor();
  }

  WaterStore.prototype.init = function() {
    this.name = 'WaterStore';
    this.page = water_page;
    this.picturePage = water_picture;
    this.hendelsePage = water_hendelse;
    return this.superInit();
  };

  return WaterStore;

})(StoreWithDangerObs);
