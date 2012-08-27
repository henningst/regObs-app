var Cast, PackageCollection,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

PackageCollection = (function() {

  function PackageCollection(callback) {
    this.callCallback = __bind(this.callCallback, this);    console.log("constrct");
    this.callback = callback;
    this.packages = [];
  }

  PackageCollection.prototype.add = function(pkg) {
    var retur;
    retur = this.packages.push(pkg);
    this.callCallback();
    return retur;
  };

  PackageCollection.prototype.get = function(name) {
    var found;
    found = this.packages.filter(function(pkg) {
      return pkg.name === name && pkg.freezed === false;
    });
    return found[0];
  };

  PackageCollection.prototype.remove = function(obj) {
    this.packages = this.packages.filter(function(pkg) {
      return pkg !== obj;
    });
    return this.callCallback();
  };

  PackageCollection.prototype.forall = function(work) {
    var pkg, _i, _len, _ref, _results;
    _ref = this.packages;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pkg = _ref[_i];
      _results.push(work(Cast.package(pkg)));
    }
    return _results;
  };

  PackageCollection.prototype.size = function() {
    return this.packages.length;
  };

  PackageCollection.prototype.callCallback = function() {
    if (this.callback) return this.callback(this);
  };

  return PackageCollection;

})();

Cast = {
  package: function(obj) {
    return jQuery.extend(new SnowPackage(), obj);
  }
};
