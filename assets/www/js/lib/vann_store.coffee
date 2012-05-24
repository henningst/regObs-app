class WaterStore extends StoreWithDangerObs

	constructor: () ->
		@name = 'WaterStore'
		@page = water_page
		@picturePage = water_picture
		@hendelsePage = water_hendelse
		@superConstructor()