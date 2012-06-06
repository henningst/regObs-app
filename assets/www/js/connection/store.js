var NveStore,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

NveStore = (function() {

  function NveStore() {
    this.IsEmpty = __bind(this.IsEmpty, this);    this.m_waterStore = null;
    this.m_snowStore = null;
    this.m_dirtStore = null;
    this.m_iceStore = null;
  }

  NveStore.prototype.getSnow = function() {
    if (this.m_snowStore) {
      return this.m_snowStore;
    } else {
      this.m_snowStore = DataAccess.get(SnowStore.name, new SnowStore());
      if (this.m_snowStore) {
        this.m_snowStore.init();
        return this.m_snowStore;
      } else {
        this.m_snowStore = new SnowStore();
        this.m_snowStore.init();
        return this.m_snowStore;
      }
    }
  };

  NveStore.prototype.sendSnow = function(callback) {
    if (this.m_snowStore && !IsEmpty(this.m_snowStore)) this.m_snowStore.send();
    if (callback) return callback();
  };

  NveStore.prototype.getDirt = function() {
    if (this.m_dirtStore) {
      return this.m_dirtStore;
    } else {
      this.m_dirtStore = DataAccess.get(DirtStore.name, new DirtStore());
      if (this.m_dirtStore) {
        this.m_dirtStore.init();
        return this.m_dirtStore;
      } else {
        this.m_dirtStore = new DirtStore();
        this.m_dirtStore.init();
        return this.m_dirtStore;
      }
    }
  };

  NveStore.prototype.sendDirt = function(callback) {
    if (this.m_dirtStore && !IsEmpty(this.m_dirtStore)) this.m_dirtStore.send();
    if (callback) return callback();
  };

  NveStore.prototype.getIce = function() {
    if (this.m_iceStore) {
      return this.m_iceStore;
    } else {
      this.m_iceStore = DataAccess.get(IceStore.name, new IceStore());
      if (this.m_iceStore) {
        this.m_iceStore.init();
        return this.m_iceStore;
      } else {
        this.m_iceStore = new IceStore();
        this.m_iceStore.init();
        return this.m_iceStore;
      }
    }
  };

  NveStore.prototype.sendIce = function(callback) {
    if (this.m_iceStore && !IsEmpty(this.m_iceStore)) this.m_iceStore.send();
    if (callback) return callback();
  };

  NveStore.prototype.getWater = function() {
    if (this.m_waterStore) {
      return this.m_waterStore;
    } else {
      this.m_waterStore = DataAccess.get(WaterStore.name, new WaterStore());
      if (this.m_waterStore) {
        this.m_waterStore.init();
        return this.m_waterStore;
      } else {
        this.m_waterStore = new WaterStore();
        this.m_waterStore.init();
        return this.m_waterStore;
      }
    }
  };

  NveStore.prototype.sendWater = function(callback) {
    if (this.m_waterStore && !IsEmpty(this.m_waterStore)) this.m_waterStore.send();
    if (callback) return callback();
  };

  NveStore.prototype.IsEmpty = function(store) {
    if (store.getObs().length !== 0) return false;
    if (store.getIncident() !== null) return false;
    if (store.getPictures() !== 0) return false;
    return true;
  };

  return NveStore;

})();
