var SnowStore,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

SnowStore = (function(_super) {

  __extends(SnowStore, _super);

  function SnowStore() {
    this.absConstructor();
  }

  SnowStore.prototype.init = function() {
    this.name = 'SnowStore';
    this.page = snow_page;
    this.picturePage = snow_picture;
    this.hendelsePage = snow_hendelse;
    return this.superInit();
  };

  return SnowStore;

})(AbstractStore);
