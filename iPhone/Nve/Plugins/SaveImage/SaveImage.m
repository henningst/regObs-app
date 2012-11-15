//
//  SaveImage.h
//
//  Created by MyFreeWeb on 29/04/2010.
//  Copyright 2010 MyFreeWeb.
//  MIT licensed
//

#import <UIKit/UIKit.h>

#import "SaveImage.h"
@implementation SaveImage

- (void)saveImage:(NSMutableArray*)sdata withDict:(NSMutableDictionary*)options
{
        NSLog(@"image data %@", [sdata objectAtIndex:0] );
        NSString* path = [[sdata objectAtIndex:0] substringFromIndex: 16];
        NSLog(@"the imagepath %@", path );

        UIImage *image = [UIImage imageWithContentsOfFile: path];
        NSLog(@"the image %@", image );
        UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil);
        NSLog(@"Image saved");
}
@end
