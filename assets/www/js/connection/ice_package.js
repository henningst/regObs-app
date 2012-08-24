var IcePackage,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

IcePackage = (function(_super) {

  __extends(IcePackage, _super);

  function IcePackage() {
    this.superConstructor();
  }

  IcePackage.prototype.init = function() {
    this.name = 'IcePackage';
    this.page = ice_page;
    this.picturePage = ice_picture;
    this.hendelsePage = ice_hendelse;
    return this.superInit();
  };

  return IcePackage;

})(PackageWithDangerObs);
