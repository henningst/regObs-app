//
//  GoogleAnalyticsPlugin.m
//  Google Analytics plugin for PhoneGap
//
//  Created by Jesse MacFadyen on 11-04-21.
//  Updated to 1.x by Olivier Louvignes on 11-11-24.
//  Updated to 1.5 by Chris Kihneman on 12-04-09.
//  MIT Licensed
//

#import "GoogleAnalyticsPlugin.h"

// Dispatch period in seconds
static const NSInteger kGANDispatchPeriodSec = 10;

@implementation GoogleAnalyticsPlugin

- (void) startTrackerWithAccountID:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
	NSString* accountId = [arguments objectAtIndex:0];

    [GAI sharedInstance].trackUncaughtExceptions = YES;
    [GAI sharedInstance].dispatchInterval = 20;
    [[GAI sharedInstance] trackerWithTrackingId:accountId];
}

- (void) trackEvent:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
	NSString* category = [options valueForKey:@"category"];
	NSString* action = [options valueForKey:@"action"];
	NSString* label = [options valueForKey:@"label"];
	int value = [[options valueForKey:@"value"] intValue];


	if (![[[GAI sharedInstance] defaultTracker] sendEventWithCategory:category withAction:action withLabel:label withValue:[NSNumber numberWithInt:value]])
    {
		// Handle error here
		NSLog(@"GoogleAnalyticsPlugin.trackEvent Error");
	}
	NSLog(@"GoogleAnalyticsPlugin.trackEvent::%@, %@, %@, %d",category,action,label,value);

}

- (void) setCustomVariable:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
    NSAssert(FALSE, @"Custom varibles isn't working");
	/*int index = [[options valueForKey:@"index"] intValue];
	NSString* name = [options valueForKey:@"name"];
	NSString* value = [options valueForKey:@"value"];
    
    
	if (![[[GAI sharedInstance] defaultTracker] setCustomVariableAtIndex:index  name:name  value:value  withError:&error]) {
		// Handle error here
		NSLog(@"GoogleAnalyticsPlugin.setCustonVariable Error",);
	}
    
    
	NSLog(@"GoogleAnalyticsPlugin.setCustomVariable::%d, %@, %@", index, name, value); */
    
}

- (void) trackPageview:(NSMutableArray*)arguments withDict:(NSMutableDictionary*)options
{
	NSString* pageUri = [arguments objectAtIndex:0];
    NSLog(@"DEBUG %@", @"Test reaching");
	if (![[[GAI sharedInstance] defaultTracker] sendView:pageUri]) {
		// TODO: Handle error here
	}
}

- (void) hitDispatched:(NSString *)hitString
{
	NSString* callback = [NSString stringWithFormat:@"window.plugins.googleAnalyticsPlugin.hitDispatched(%d);",
						  hitString];
            NSLog(@"DEBUG dispatch hit");
	//[ self.webView stringByEvaluatingJavaScriptFromString:callback];

}
/*
- (void) trackerDispatchDidComplete:(GANTracker *)tracker
                  eventsDispatched:(NSUInteger)hitsDispatched
              eventsFailedDispatch:(NSUInteger)hitsFailedDispatch
{
	NSString* callback = [NSString stringWithFormat:@"window.plugins.googleAnalyticsPlugin.trackerDispatchDidComplete(%d);",
							hitsDispatched];
        NSLog(@"DEBUG dispatch finished");
	//[ self.webView stringByEvaluatingJavaScriptFromString:callback];

}*/


@end
