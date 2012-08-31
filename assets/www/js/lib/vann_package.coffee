class WaterPackage extends PackageWithDangerObs

	constructor: () ->
		@superConstructor()
		
	init: () ->
		@name = 'WaterPackage'
		@page = water_page
		@picturePage = water_picture
		@hendelsePage = water_hendelse
			
		@superInit()