class IceStore extends StoreWithDangerObs

	constructor: () ->
		@name = 'IceStore'
		@page = ice_page
		@picturePage = ice_picture
		@hendelsePage = ice_hendelse
		@superConstructor()