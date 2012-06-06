var DirtStore,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

DirtStore = (function(_super) {

  __extends(DirtStore, _super);

  function DirtStore() {
    this.superConstructor();
  }

  DirtStore.prototype.init = function() {
    this.name = 'DirtStore';
    this.page = dirt_page;
    this.picturePage = dirt_picture;
    this.hendelsePage = dirt_hendelse;
    return this.superInit();
  };

  return DirtStore;

})(StoreWithDangerObs);
