package no.nlink.nve;

import java.util.Arrays;
import java.util.List;

import no.nlink.nve.RegObsGeoLocationPlugin.MyLocationListener;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.apache.cordova.api.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.Looper;
import android.util.Log;
import android.widget.TextView;

public class RegObsGeoLocationPlugin extends Plugin {
  
  String action = null;
  private float accuracy = Float.MAX_VALUE;
  private MyLocationListener locationListener;
  private LocationManager manager;
  private boolean shouldHandleError;
  @Override
  public PluginResult execute(String action, JSONArray data, String callbackId) {
    Log.d("GeoPlugin", "I Plugin");
    this.action = action;
    
    try {
      this.shouldHandleError = data.getBoolean(0);
    } catch (JSONException e1) {}
    
    manager = (LocationManager) ctx.getSystemService(Context.LOCATION_SERVICE);
    locationListener = new MyLocationListener(this);
    try{
      Thread runner = new Thread(){
        public void run(){
          Looper.prepare();
          manager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000, 2, locationListener);
          manager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 5000, 2, locationListener);
          Log.d("GeoPlugin", "Registered");
        }
      };
      
      runner.start();
      
      Location location = manager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
      Log.d("GeoPlugin", "1. try");
      if(locationGoodEnough(location))
        return new PluginResult(Status.OK);
      else{
        if(goodEnougWifiLocation())
          return new PluginResult(Status.OK);
      }
      Thread.sleep(10000);
      
      Log.d("GeoPlugin", "2. try");
      location = manager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
      if(locationGoodEnough(location))
        return new PluginResult(Status.OK);
      Thread.sleep(10000);
      
      Log.d("GeoPlugin", "3. try");
      location = manager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
      if(locationGoodEnough(location))
        return new PluginResult(Status.OK);
      
      if(didNotReceiveGodAccuracy()){
        Location wifilocation = manager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
        newLocationReceived(wifilocation);
      }
     
      if(didNotReceiveGodAccuracy()){  
        noGoodAccuracyIsFound();
      }
      
      if(locationListener != null)
        manager.removeUpdates(locationListener);
      
    }catch(Throwable e){
      Log.e("GeoPlugin", "register failed", e);
    }
    
    return new PluginResult(Status.OK);
  }
  
  
  
  private boolean locationGoodEnough(Location location) {
    return newLocationReceived(location);
  }

  private void noGoodAccuracyIsFound() {
    if(shouldHandleError)
      sendJavascript("geo.noGoodAccuracyFound()");
  }
  
  private boolean goodEnoughPosition(){
    return !didNotReceiveGodAccuracy();
  }

  public boolean didNotReceiveGodAccuracy(){
    return accuracy > 80;
  }
  
  public boolean newLocationReceived(Location location){
    Log.d("GeoPlugin", "got location: " + location);
    if(location == null)
      return false;
    
    if(accuracy > location.getAccuracy())
        accuracy = location.getAccuracy();
    
    String javascript = action + "(geo.convertToPosition(" +location.getLatitude()  +","+  location.getLongitude() +","+ location.getAccuracy() +","+ location.getTime()+ "))";
    Log.d("GeoPlugin", "calling: " + javascript);
    if(goodEnoughPosition())
      sendJavascript(javascript);
    
    return goodEnoughPosition();
  }
  
  public boolean goodEnougWifiLocation(){
    Location wifilocation = manager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
    return newLocationReceived(wifilocation);
  }

  
  class MyLocationListener implements LocationListener{

    private RegObsGeoLocationPlugin callback;

    public MyLocationListener(RegObsGeoLocationPlugin callback){
      this.callback = callback;
      Log.d("GeoPlugin", "created");
    }

    public void onLocationChanged(Location location) {
      Log.d("GeoPlugin", "new location -------------");
      callback.newLocationReceived(location);
    }

    public void onProviderDisabled(String provider) {
      Log.d("GeoPlugin", "stopped by user");
      
    }

    public void onProviderEnabled(String provider) {
      Log.d("GeoPlugin", "enabled by user");
      
    }

    public void onStatusChanged(String provider, int status, Bundle extras) {
      Log.d("GeoPlugin", "changed " + status);
      
    }
    
  }
}
