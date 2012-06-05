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
  @Override
  public PluginResult execute(String action, JSONArray data, String callbackId) {
    Log.d("GeoPlugin", "I Plugin");
    this.action = action;
    
    manager = (LocationManager) ctx.getSystemService(Context.LOCATION_SERVICE);
    locationListener = new MyLocationListener(this);
    try{
      Thread runner = new Thread(){
        public void run(){
          Looper.prepare();
          manager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 2, locationListener);
          Log.d("GeoPlugin", "Registered");
        }
      };
      
      runner.start();
      
      Location location = manager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
      if(locationGoodEnough(location))
        return new PluginResult(Status.OK);
      Thread.sleep(10000);
      
      location = manager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
      if(locationGoodEnough(location))
        return new PluginResult(Status.OK);
      Thread.sleep(10000);
      
      location = manager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
      if(locationGoodEnough(location))
        return new PluginResult(Status.OK);
      
      
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
    newLocationReceived(location);
    if(goodEnoughPosition()){
      if(locationListener != null)
        manager.removeUpdates(locationListener);
      
      return true;
    }else
      return false;
  }

  private void noGoodAccuracyIsFound() {
    sendJavascript("main.noGoodAccuracyFound()");
  }
  
  private boolean goodEnoughPosition(){
    return !didNotReceiveGodAccuracy();
  }

  public boolean didNotReceiveGodAccuracy(){
    return accuracy > 30;
  }
  
  
  
  public void newLocationReceived(Location location){
    if(location == null)
      return;
    
    if(accuracy > location.getAccuracy())
        accuracy = location.getAccuracy();
    
    String javascript = action + "(" +location.getLatitude()  +","+  location.getLongitude() +","+ location.getAccuracy() +")";
    Log.d("GeoPlugin", "calling: " + javascript);
    sendJavascript(javascript);
  }

  
  class MyLocationListener implements LocationListener{

    private RegObsGeoLocationPlugin callback;

    public MyLocationListener(RegObsGeoLocationPlugin callback){
      this.callback = callback;
      Log.d("GeoPlugin", "created");
    }

    public void onLocationChanged(Location location) {
      Log.d("GeoPlugin", "new location");
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
