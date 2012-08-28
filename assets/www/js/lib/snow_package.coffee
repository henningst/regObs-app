class SnowPackage extends AbstractPackage
	
	constructor: () ->
		@absConstructor()
		
	init: () ->
		@name = 'SnowPackage'
		@page = snow_page
		@picturePage = snow_picture
		@hendelsePage = snow_hendelse	
		
		@pages = [@page, @picturePage, @hendelsePage]
		
		@superInit()
		