var IsEmpty, NveStore;

NveStore = (function() {

  function NveStore() {
    this.m_waterPackage = null;
    this.m_snowPackage = null;
    this.m_dirtPackage = null;
    this.m_icePackage = null;
    this.packageCollection = new PackageCollection();
  }

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

  NveStore.prototype.sendSnow = function(callback) {
    var collection;
    if (this.m_snowPackage && !IsEmpty(this.m_snowPackage)) {
      this.m_snowPackage.freezed = true;
      this.packageCollection.add(this.m_snowPackage);
      this.m_snowPackage.picturePage.afterSendRegistration();
      this.m_snowPackage.hendelsePage.afterSendRegistration();
      this.m_snowPackage.page.afterSendRegistration();
    }
    this.m_snowPackage = null;
    DataAccess.save(SnowPackage.name, null);
    console.log("antall pakker: " + this.packageCollection.size());
    collection = this.packageCollection;
    this.packageCollection.forall(function(p) {
      p.callback = function(pkg) {
        console.log("done. ....");
        console.log("pkg : " + JSON.stringify(pkg));
        console.log("package : " + JSON.stringify(p));
        collection.remove(p);
        return console.log("left in collection " + collection.size());
      };
      return p.send();
    });
    if (callback) return callback();
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

  NveStore.prototype.sendDirt = function(callback) {
    if (this.m_dirtPackage && !IsEmpty(this.m_dirtPackage)) {
      this.m_dirtPackage.send();
    }
    if (callback) return callback();
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

  NveStore.prototype.sendIce = function(callback) {
    if (this.m_icePackage && !IsEmpty(this.m_icePackage)) this.m_icePackage.send();
    if (callback) return callback();
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

  NveStore.prototype.sendWater = function(callback) {
    if (this.m_waterPackage && !IsEmpty(this.m_waterPackage)) {
      this.m_waterPackage.send();
    }
    if (callback) return callback();
  };

  return NveStore;

})();

IsEmpty = function(package) {
  if (package.getObs().length !== 0) return false;
  if (package.getIncident() !== null) return false;
  if (package.getPictures().length !== 0) return false;
  return true;
};
