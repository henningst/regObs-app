// Generated by CoffeeScript 1.3.3
var IsEmpty, NveStore,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

NveStore = (function() {

  function NveStore() {
    this.resetGroups = __bind(this.resetGroups, this);

    this.sendSnow = __bind(this.sendSnow, this);

    this.setNotificationId = __bind(this.setNotificationId, this);

    this.getNotificationId = __bind(this.getNotificationId, this);
    this.m_waterPackage = null;
    this.m_snowPackage = null;
    this.m_dirtPackage = null;
    this.m_icePackage = null;
    this.packageCollection = DataAccess.get("PackageCollection", new PackageCollection());
    if (!this.packageCollection) {
      this.packageCollection = new PackageCollection();
      DataAccess.save("PackageCollection", this.packageCollection);
    }
    this.packageCollection.callback = function(collection) {
      if (main) {
        setTimeout(function() {
          return main.updateCollection(collection);
        }, 1000);
      }
      return DataAccess.save("PackageCollection", collection);
    };
    this.packageCollection.callback(this.packageCollection);
  }

  NveStore.prototype.clearPackageCollection = function() {
    this.packageCollection = new PackageCollection();
    return DataAccess.save("PackageCollection", this.packageCollection);
  };

  NveStore.prototype.getNotificationId = function() {
    if (this.notificationId && this.notificationId.id) {
      return this.notificationId.id;
    } else {
      return null;
    }
  };

  NveStore.prototype.setNotificationId = function(id) {
    return this.notificationId = {
      "id": id
    };
  };

  NveStore.prototype.getSnow = function() {
    if (this.m_snowPackage) {
      return this.m_snowPackage;
    } else {
      this.m_snowPackage = DataAccess.get(SnowPackage.name, new SnowPackage());
      if (this.m_snowPackage) {
        this.m_snowPackage.init();
        return this.m_snowPackage;
      } else {
        this.m_snowPackage = new SnowPackage();
        this.m_snowPackage.init();
        return this.m_snowPackage;
      }
    }
  };

  NveStore.prototype.clearSnow = function() {
    if (this.m_snowPackage) {
      this.m_snowPackage.afterSendRegistration();
    }
    this.resetGroups();
    this.m_snowPackage = null;
    return DataAccess.save(SnowPackage.name, null);
  };

  NveStore.prototype.deleteSnow = function() {
    this.clearSnow();
    return this.clearPackageCollection();
  };

  NveStore.prototype.sendSnow = function(callback) {
    var _this = this;
    if (this.m_snowPackage && !IsEmpty(this.m_snowPackage)) {
      this.m_snowPackage.setGroup(jQuery("#snow_obs .selectedGroup").val());
      this.packageCollection.add(this.m_snowPackage);
      this.clearSnow();
    }
    this.packageCollection.forall(function(p) {
      return _this.sendAndHandlePackage(p);
    });
    if (callback) {
      return callback();
    }
  };

  NveStore.prototype.resetGroups = function() {
    jQuery(".selectedGroup").val(0);
    return jQuery(".groupButton").attr("value", "Gruppe").removeClass("pressed");
  };

  NveStore.prototype.sendAndHandlePackage = function(p) {
    p.callback = function(pkg) {
      var collection;
      collection = main.store.packageCollection;
      pkg.freezed = true;
      return collection.remove(pkg);
    };
    return p.send();
  };

  NveStore.prototype.getDirt = function() {
    if (this.m_dirtPackage) {
      return this.m_dirtPackage;
    } else {
      this.m_dirtPackage = DataAccess.get(DirtPackage.name, new DirtPackage());
      if (this.m_dirtPackage) {
        this.m_dirtPackage.init();
        return this.m_dirtPackage;
      } else {
        this.m_dirtPackage = new DirtPackage();
        this.m_dirtPackage.init();
        return this.m_dirtPackage;
      }
    }
  };

  NveStore.prototype.clearDirt = function() {
    if (this.m_dirtPackage) {
      this.m_dirtPackage.afterSendRegistration();
    }
    this.m_dirtPackage = null;
    return DataAccess.save(DirtPackage.name, null);
  };

  NveStore.prototype.deleteDirt = function() {
    this.clearDirt();
    return this.clearPackageCollection();
  };

  NveStore.prototype.sendDirt = function(callback) {
    var _this = this;
    if (this.m_dirtPackage && !IsEmpty(this.m_dirtPackage)) {
      this.m_dirtPackage.setGroup(jQuery("#dirt_group").val());
      this.packageCollection.add(this.m_dirtPackage);
      this.clearDirt();
    }
    this.packageCollection.forall(function(p) {
      return _this.sendAndHandlePackage(p);
    });
    if (callback) {
      return callback();
    }
  };

  NveStore.prototype.getIce = function() {
    if (this.m_icePackage) {
      return this.m_icePackage;
    } else {
      this.m_icePackage = DataAccess.get(IcePackage.name, new IcePackage());
      if (this.m_icePackage) {
        this.m_icePackage.init();
        return this.m_icePackage;
      } else {
        this.m_icePackage = new IcePackage();
        this.m_icePackage.init();
        return this.m_icePackage;
      }
    }
  };

  NveStore.prototype.clearIce = function() {
    if (this.m_icePackage) {
      this.m_icePackage.afterSendRegistration();
    }
    this.m_icePackage = null;
    return DataAccess.save(IcePackage.name, null);
  };

  NveStore.prototype.deleteIce = function() {
    this.clearIce();
    return this.clearPackageCollection();
  };

  NveStore.prototype.sendIce = function(callback) {
    var _this = this;
    if (this.m_icePackage && !IsEmpty(this.m_icePackage)) {
      this.m_icePackage.setGroup(jQuery("#ice_group").val());
      this.packageCollection.add(this.m_icePackage);
      this.clearIce();
    }
    this.packageCollection.forall(function(p) {
      return _this.sendAndHandlePackage(p);
    });
    if (callback) {
      return callback();
    }
  };

  NveStore.prototype.getWater = function() {
    if (this.m_waterPackage) {
      return this.m_waterPackage;
    } else {
      this.m_waterPackage = DataAccess.get(WaterPackage.name, new WaterPackage());
      if (this.m_waterPackage) {
        this.m_waterPackage.init();
        return this.m_waterPackage;
      } else {
        this.m_waterPackage = new WaterPackage();
        this.m_waterPackage.init();
        return this.m_waterPackage;
      }
    }
  };

  NveStore.prototype.clearWater = function() {
    if (this.m_waterPackage) {
      this.m_waterPackage.afterSendRegistration();
    }
    this.m_waterPackage = null;
    return DataAccess.save(WaterPackage.name, null);
  };

  NveStore.prototype.deleteWater = function() {
    this.clearWater();
    return this.clearPackageCollection();
  };

  NveStore.prototype.sendWater = function(callback) {
    var _this = this;
    if (this.m_waterPackage && !IsEmpty(this.m_waterPackage)) {
      this.m_waterPackage.setGroup(jQuery("#water_group").val());
      this.packageCollection.add(this.m_waterPackage);
      this.clearWater();
    }
    this.packageCollection.forall(function(p) {
      return _this.sendAndHandlePackage(p);
    });
    if (callback) {
      return callback();
    }
  };

  return NveStore;

})();

IsEmpty = function(pkg) {
  if (pkg.getObs().length !== 0) {
    return false;
  }
  if (pkg.getIncident() !== null) {
    return false;
  }
  if (pkg.getPictures().length !== 0) {
    return false;
  }
  return true;
};
