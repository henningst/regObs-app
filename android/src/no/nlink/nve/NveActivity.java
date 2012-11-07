package no.nlink.nve;

import org.apache.cordova.DroidGap;

import com.bugsense.trace.BugSenseHandler;

import android.os.Bundle;
import android.view.KeyEvent;

public class NveActivity extends DroidGap {
	/** Called when the activity is first created. */
	@Override
	public void onCreate(final Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		BugSenseHandler.initAndStartSession(this.getBaseContext(), "d879d6ce");
   
		super.loadUrl("file:///android_asset/www/nve.html");
	}
	
	@Override
	public void onPause(){
	  super.onPause();
	  RegObsGeoLocationPlugin.clear();
	}
	
	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
	    if (keyCode == KeyEvent.KEYCODE_BACK) {
	        return true;
	    }
	    return super.onKeyDown(keyCode, event);
	}
}