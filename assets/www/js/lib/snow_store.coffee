class SnowStore extends AbstractStore
	
	constructor: () ->
		@absConstructor()
		
	init: () ->
		@name = 'SnowStore'
		@page = snow_page
		@picturePage = snow_picture
		@hendelsePage = snow_hendelse	
		
		@superInit()