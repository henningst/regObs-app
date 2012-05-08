
DataAccess = {
	storage : window.localStorage

	save: (key, value) ->
		DataAccess.storage.setItem(key, value)

	get: (key) ->
		DataAccess.storage.getItem(key)

	save_numbers: (numbers) ->
		dao.storage.setItem(dao.label.customer, numbers.customer);	
		dao.storage.setItem(dao.label.alarmTime, numbers.alarmTime);

	get_alarm: () ->
		dao.storage.getItem(dao.label.alarm)
	
	get_alarm_time: () ->
		dao.storage.getItem(dao.label.alarmTime)
	
	get_numbers: () ->
}