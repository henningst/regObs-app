class AbstractStore

	onError: (data) ->
		alert("an error occured")
	
	onSend: (page) ->
		main.showWaitingDialogWithMessage(UPLOADING);
	
		source = 0
		pos = page.pos_obj
		if pos
			elapsedInMinutes = ((new Date()).getTime() - pos.taken.getTime()) / 1000 / 60
			if elapsedInMinutes < GPS_TIMEOUT_IN_MINUTES
				source = GPS_POSITION
			else
				source = OLD_GPS_POSITION
		
		location = new ObsLocation("", 33, page.longitude, page.latitute, source, 0, page.omrade_id, 250, 250, false, null, null, null, null, null, page.komm_nr.toString());
		SendObjectToServer(location, ((data) => @afterLocation(data)) , (error) => @onError(error))
		
	onAfterLocation: (data) ->
		registration = new Registration(main.login.data.ObserverID, data.ObsLocationID, null, new Date(), 0)
		SendObjectToServer(registration, ((data) => @afterRegistration(data)) , (error) => @onError(error))