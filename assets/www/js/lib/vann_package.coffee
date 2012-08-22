class WaterStore extends PackageWithDangerObs

	constructor: () ->
		@superConstructor()
		
	init: () ->
		@name = 'WaterStore'
		@page = water_page
		@picturePage = water_picture
		@hendelsePage = water_hendelse
			
		@superInit()