var register = {
		
	init: function() {
		$('header_middle_text').innerHTML = "Opprett konto";
		window.plugins.childBrowser.onClose = ()->
		window.plugins.childBrowser.showWebPage(REGISTER_URL);
	}	
};
