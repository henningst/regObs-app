var DirtPackage,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

DirtPackage = (function(_super) {

  __extends(DirtPackage, _super);

  function DirtPackage() {
    this.superConstructor();
  }

  DirtPackage.prototype.init = function() {
    this.name = 'DirtPackage';
    this.page = dirt_page;
    this.picturePage = dirt_picture;
    this.hendelsePage = dirt_hendelse;
    return this.superInit();
  };

  return DirtPackage;

})(PackageWithDangerObs);
