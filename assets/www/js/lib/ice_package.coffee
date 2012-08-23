class IcePackage extends PackageWithDangerObs

	constructor: () ->
		@superConstructor()
		
	init: () ->
		@name = 'IcePackage'
		@page = ice_page
		@picturePage = ice_picture
		@hendelsePage = ice_hendelse
		
		@superInit()