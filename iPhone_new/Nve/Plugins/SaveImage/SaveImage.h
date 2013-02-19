//
//  SaveImage.h
//
//  Created by MyFreeWeb on 29/04/2010.
//  Copyright 2010 MyFreeWeb.
//  MIT licensed
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>


@interface SaveImage : CDVPlugin {
}

- (void)saveImage:(NSMutableArray*)sdata withDict:(NSMutableDictionary*)options;
@end
