


class SendInPictureCommand
	constructor: (@picture) ->
		console.log("createing send in picture command")
	
	send: () =>
		console.log("sending picture")
		window.resolveLocalFileSystemURI(@picture.PictureImage, @gotFileEntry, @fail);
		
	gotFS: (fileSystem) =>
		console.log("got file system")
		url =  @picture.PictureImage
		console.log("getting file " + url)
		
		fileSystem.root.getFile(url, {}, @gotFileEntry, @fail);
    
	gotFileEntry : (fileEntry) =>
		console.log("got file entry")
		fileEntry.file(@gotFile, @fail)
	
	gotFile: (file) =>
		console.log("got file")
		reader = new FileReader();
		reader.onloadend = (evt) =>
    	@picture.PictureImage = evt.target.result.substring(23)
    	SendObjectToServer(@picture)
		
		reader.readAsDataURL(file);
		
		
		
		
	fail: (e) ->
		console.log("sending in picture failed:")
		for k,v of e
			console.log(k + " -> " + v)
			
		console.log("value of secur err " + FileError.SECURITY_ERR  + " not found err " + FileError.NOT_FOUND_ERR)