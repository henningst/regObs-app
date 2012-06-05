package com.phonegap.plugins.analytics;

import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.apache.cordova.api.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;

public class GoogleAnalyticsTracker extends Plugin {
  public static final String START = "start";
  public static final String TRACK_PAGE_VIEW = "trackPageView";
  public static final String TRACK_EVENT = "trackEvent";
  public static final String SET_CUSTOM_VARIABLE = "setCustomVariable";

  public static final int DISPATCH_INTERVAL = 20;
  private final com.google.android.apps.analytics.GoogleAnalyticsTracker tracker;

  public GoogleAnalyticsTracker() {
    tracker = com.google.android.apps.analytics.GoogleAnalyticsTracker
        .getInstance();
  }

  @Override
  public PluginResult execute(final String action, final JSONArray data,
      final String callbackId) {
    PluginResult result = null;
    if (START.equals(action)) {
      try {
        start(data.getString(0));
        result = new PluginResult(Status.OK);
      } catch (JSONException e) {
        result = new PluginResult(Status.JSON_EXCEPTION);
      }
    } else if (TRACK_PAGE_VIEW.equals(action)) {
      try {
        trackPageView(data.getString(0));
        result = new PluginResult(Status.OK);
      } catch (JSONException e) {
        result = new PluginResult(Status.JSON_EXCEPTION);
      }
    } else if (TRACK_EVENT.equals(action)) {
      try {
        trackEvent(data.getString(0), data.getString(1), data.getString(2),
            data.getInt(3));
        result = new PluginResult(Status.OK);
      } catch (JSONException e) {
        result = new PluginResult(Status.JSON_EXCEPTION);
      }
    } else if (SET_CUSTOM_VARIABLE.equals(action)) {
      try {
        setCustomVar(data.getInt(0), data.getString(1), data.getString(2),
            data.getInt(3));
      } catch (JSONException e) {
        result = new PluginResult(Status.JSON_EXCEPTION);
      }
    } else {
      result = new PluginResult(Status.INVALID_ACTION);
    }
    return result;
  }

  private void start(final String accountId) {
    tracker.start(accountId, DISPATCH_INTERVAL, (Context) this.ctx);
  }

  private void trackPageView(final String key) {
    tracker.trackPageView(key);
  }

  private void trackEvent(final String category, final String action,
      final String label, final int value) {
    tracker.trackEvent(category, action, label, value);
  }

  private void setCustomVar(final int index, final String label,
      final String value, final int scope) {
    tracker.setCustomVar(index, label, value, scope);
  }
}
