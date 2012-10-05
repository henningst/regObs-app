/*
 Licensed to the Apache Software Foundation (ASF) under one
 or more contributor license agreements.  See the NOTICE file
 distributed with this work for additional information
 regarding copyright ownership.  The ASF licenses this file
 to you under the Apache License, Version 2.0 (the
 "License"); you may not use this file except in compliance
 with the License.  You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing,
 software distributed under the License is distributed on an
 "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, either express or implied.  See the License for the
 specific language governing permissions and limitations
 under the License.
 */

//
//  AppDelegate.m
//  Nve
//
//  Created by Konstantin on 3/30/12.
//  Copyright __MyCompanyName__ 2012. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

#ifdef CORDOVA_FRAMEWORK
    #import <Cordova/CDVPlugin.h>
    #import <Cordova/CDVURLProtocol.h>
#else
    #import <Cordova/CDVPlugin.h>
    #import <Cordova/CDVURLProtocol.h>
#endif


@implementation AppDelegate

@synthesize invokeString, window, viewController;

- (id) init
{	
	/** If you need to do any extra app-specific initialization, you can do it here
	 *  -jm
	 **/
    NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage]; 
    [cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];
    
    [CDVURLProtocol registerPGHttpURLProtocol];
    
    return [super init];
}

#pragma UIApplicationDelegate implementation

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
- (BOOL) application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    NSURL* url = [launchOptions objectForKey:UIApplicationLaunchOptionsURLKey];
    NSString* invokeString = nil;
    
    if (url && [url isKindOfClass:[NSURL class]]) {
        invokeString = [url absoluteString];
		NSLog(@"Nve launchOptions = %@", url);
    }
    
    CGRect screenBounds = [[UIScreen mainScreen] bounds];
    self.window = [[UIWindow alloc] initWithFrame:screenBounds];
    self.window.autoresizesSubviews = YES;
    
    self.viewController = [[MainViewController alloc] init];
    self.viewController.useSplashScreen = YES;
    self.viewController.wwwFolderName = @"www";
    self.viewController.startPage = @"nve.html";
    self.viewController.invokeString = invokeString;
    
    // NOTE: To control the view's frame size, override [self.viewController viewWillAppear:] in your view controller.
    
    // check whether the current orientation is supported: if it is, keep it, rather than forcing a rotation
    BOOL forceStartupRotation = YES;
    UIDeviceOrientation curDevOrientation = [[UIDevice currentDevice] orientation];
    
    if (UIDeviceOrientationUnknown == curDevOrientation) {
        // UIDevice isn't firing orientation notifications yet… go look at the status bar
        curDevOrientation = (UIDeviceOrientation)[[UIApplication sharedApplication] statusBarOrientation];
    }
    
    if (UIDeviceOrientationIsValidInterfaceOrientation(curDevOrientation)) {
        if ([self.viewController supportsOrientation:curDevOrientation]) {
            forceStartupRotation = NO;
        }
    }
    
    if (forceStartupRotation) {
        UIInterfaceOrientation newOrient;
        if ([self.viewController supportsOrientation:UIInterfaceOrientationPortrait])
            newOrient = UIInterfaceOrientationPortrait;
        else if ([self.viewController supportsOrientation:UIInterfaceOrientationLandscapeLeft])
            newOrient = UIInterfaceOrientationLandscapeLeft;
        else if ([self.viewController supportsOrientation:UIInterfaceOrientationLandscapeRight])
            newOrient = UIInterfaceOrientationLandscapeRight;
        else
            newOrient = UIInterfaceOrientationPortraitUpsideDown;
        
        NSLog(@"AppDelegate forcing status bar to: %d from: %d", newOrient, curDevOrientation);
        [[UIApplication sharedApplication] setStatusBarOrientation:newOrient];
    }
    
    self.window.rootViewController = self.viewController;
    [self.window makeKeyAndVisible];
    
    return YES;
}

// this happens while we are running ( in the background, or from within our own app )
// only valid if FooBar.plist specifies a protocol to handle
- (BOOL) application:(UIApplication*)application handleOpenURL:(NSURL*)url 
{
    if (!url) { 
        return NO; 
    }
    
	// calls into javascript global function 'handleOpenURL'
    NSString* jsString = [NSString stringWithFormat:@"handleOpenURL(\"%@\");", url];
    [self.viewController.webView stringByEvaluatingJavaScriptFromString:jsString];
    
    // all plugins will get the notification, and their handlers will be called 
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];
    
    return YES;    
}

#pragma PGCommandDelegate implementation

- (id) getCommandInstance:(NSString*)className
{
	return [self.viewController getCommandInstance:className];
}

- (BOOL) execute:(CDVInvokedUrlCommand*)command
{
	return [self.viewController execute:command];
}

- (NSString*) pathForResource:(NSString*)resourcepath;
{
	return [self.viewController pathForResource:resourcepath];
}

#pragma UIWebDelegate implementation

- (void) webViewDidFinishLoad:(UIWebView*) theWebView 
{
	// only valid if FooBar.plist specifies a protocol to handle
	if (self.invokeString)
	{
		// this is passed before the deviceready event is fired, so you can access it in js when you receive deviceready
		NSString* jsString = [NSString stringWithFormat:@"var invokeString = \"%@\";", self.invokeString];
		[theWebView stringByEvaluatingJavaScriptFromString:jsString];
	}
	
	 // Black base color for background matches the native apps
   	theWebView.backgroundColor = [UIColor blackColor];
    
	return [self.viewController webViewDidFinishLoad:theWebView];
}

- (void) webViewDidStartLoad:(UIWebView*)theWebView 
{
	return [self.viewController webViewDidStartLoad:theWebView];
}

- (void) webView:(UIWebView*)theWebView didFailLoadWithError:(NSError*)error 
{
	return [self.viewController webView:theWebView didFailLoadWithError:error];
}






- (BOOL)webView:(UIWebView *)theWebView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType
{
	NSURL *url = [request URL];
    
	// Intercept the external http requests and forward to Safari.app
	// Otherwise forward to the PhoneGap WebView
    // Avoid opening iFrame URLs in Safari by inspecting the `navigationType`
	if ((navigationType == UIWebViewNavigationTypeLinkClicked && ([[url scheme] isEqualToString:@"http"] || [[url scheme] isEqualToString:@"https"]))) {
		[[UIApplication sharedApplication] openURL:url];
		return NO;
	}
	else {
		return [self.viewController webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType];
	}
}

// ADD OUR NOTIFICATION CODE
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
    
    UIApplicationState state = [application applicationState];
    if (state == UIApplicationStateActive) {
        // WAS RUNNING
        NSLog(@"I was currently active");
        
        NSString *notCB = [notification.userInfo objectForKey:@"foreground"];
        NSString *notID = [notification.userInfo objectForKey:@"notificationId"];
        
        NSString * jsCallBack = [NSString
                                 stringWithFormat:@"%@(%@)", notCB,notID];
        
        
        [self.viewController.webView  stringByEvaluatingJavaScriptFromString:jsCallBack];
        
        application.applicationIconBadgeNumber = 0;
    }
    else {
        // WAS IN BG
        NSLog(@"I was in the background");
        
        NSString *notCB = [notification.userInfo objectForKey:@"background"];
        NSString *notID = [notification.userInfo objectForKey:@"notificationId"];
        
        NSString * jsCallBack = [NSString
                                 stringWithFormat:@"%@(%@)", notCB,notID];
        [self.viewController.webView stringByEvaluatingJavaScriptFromString:jsCallBack];
        
        application.applicationIconBadgeNumber = 0;
    }
}


- (NSUInteger) application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window
{
    // IPhone doesn't support upside down by default, while the IPad does.  Override to allow all orientations always, and let the root view controller decide whats allowed (the supported orientations mask gets intersected).
    NSUInteger supportedInterfaceOrientations = (1 << UIInterfaceOrientationPortrait) | (1 << UIInterfaceOrientationLandscapeLeft) | (1 << UIInterfaceOrientationLandscapeRight) | (1 << UIInterfaceOrientationPortraitUpsideDown);
    return supportedInterfaceOrientations;
}
@end
