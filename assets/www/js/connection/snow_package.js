var SnowPackage,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

SnowPackage = (function(_super) {

  __extends(SnowPackage, _super);

  function SnowPackage() {
    this.absConstructor();
  }

  SnowPackage.prototype.init = function() {
    this.name = 'SnowPackage';
    this.page = snow_page;
    this.picturePage = snow_picture;
    this.hendelsePage = snow_hendelse;
    return this.superInit();
  };

  return SnowPackage;

})(AbstractPackage);
