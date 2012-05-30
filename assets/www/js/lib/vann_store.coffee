class WaterStore extends StoreWithDangerObs

	constructor: () ->
		@superConstructor()
		
	init: () ->
		@name = 'WaterStore'
		@page = water_page
		@picturePage = water_picture
		@hendelsePage = water_hendelse
			
		@superInit()