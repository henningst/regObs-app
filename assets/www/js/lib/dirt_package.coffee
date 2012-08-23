class DirtPackage extends PackageWithDangerObs

	constructor: () ->
		@superConstructor()
		
	init: () ->
		@name = 'DirtPackage'
		@page = dirt_page
		@picturePage = dirt_picture
		@hendelsePage = dirt_hendelse
		
		@superInit()