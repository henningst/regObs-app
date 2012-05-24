class DirtStore extends StoreWithDangerObs

	constructor: () ->
		@name = 'DirtStore'
		@page = dirt_page
		@picturePage = dirt_picture
		@hendelsePage = dirt_hendelse
		@superConstructor()