class IceStore extends StoreWithDangerObs

	constructor: () ->
		@superConstructor()
		
	init: () ->
		@name = 'IceStore'
		@page = ice_page
		@picturePage = ice_picture
		@hendelsePage = ice_hendelse
		
		@superInit()