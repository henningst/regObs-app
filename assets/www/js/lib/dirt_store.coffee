class DirtStore extends PackageWithDangerObs

	constructor: () ->
		@superConstructor()
		
	init: () ->
		@name = 'DirtStore'
		@page = dirt_page
		@picturePage = dirt_picture
		@hendelsePage = dirt_hendelse
		
		@superInit()