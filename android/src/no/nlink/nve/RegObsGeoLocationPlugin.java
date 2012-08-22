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
  private boolean sendt = false;
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
          Log.d("GeoPlugin", "Register ....");
          manager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000, 2, locationListener);
          manager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 5000, 2, locationListener);
          Log.d("GeoPlugin", "Registered");
        }
      };
      runner.start();
      }catch(Exception e){
        Log.e("GeoPlugin","Register location listeneres", e);
      }
    try{
      
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
        newLocationReceived(wifilocation, true);
      }
     
      if(!sendt){  
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
    return newLocationReceived(location, false);
  }

  private void noGoodAccuracyIsFound() {
    Log.d("GeoPlugin", "fant ingen god posisjon " + shouldHandleError );
    if(shouldHandleError)
      sendJavascript("geo.noGoodAccuracyFound()");
  }
  
  private boolean goodEnoughPosition(){
    return !didNotReceiveGodAccuracy();
  }

  public boolean didNotReceiveGodAccuracy(){
    return accuracy > 80;
  }
  
  public boolean newLocationReceived(Location location, boolean force){
    Log.d("GeoPlugin", "got location: " + location);
    if(location == null)
      return false;
    
    if(accuracy > location.getAccuracy())
        accuracy = location.getAccuracy();
    
    String javascript = action + "(geo.convertToPosition(" +location.getLatitude()  +","+  location.getLongitude() +","+ location.getAccuracy() +","+ location.getTime()+ "))";
    
    if(goodEnoughPosition() || force){
      Log.d("GeoPlugin", "calling: " + javascript);
      sendt = true;
      sendJavascript(javascript);
    }
    
    return goodEnoughPosition();
  }
  
  public boolean goodEnougWifiLocation(){
    Location wifilocation = manager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
    return newLocationReceived(wifilocation, false);
  }

  
  class MyLocationListener implements LocationListener{

    private RegObsGeoLocationPlugin callback;

    public MyLocationListener(RegObsGeoLocationPlugin callback){
      this.callback = callback;
      Log.d("GeoPlugin", "created");
    }

    public void onLocationChanged(Location location) {
      Log.d("GeoPlugin", "new location -------------");
      callback.newLocationReceived(location, false);
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
