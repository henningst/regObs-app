var WaterPackage,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

WaterPackage = (function(_super) {

  __extends(WaterPackage, _super);

  function WaterPackage() {
    this.superConstructor();
  }

  WaterPackage.prototype.init = function() {
    this.name = 'WaterPackage';
    this.page = water_page;
    this.picturePage = water_picture;
    this.hendelsePage = water_hendelse;
    return this.superInit();
  };

  return WaterPackage;

})(PackageWithDangerObs);
