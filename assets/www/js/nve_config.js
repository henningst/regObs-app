/*
 * A GPS_POSITION is marked as an OLD_GPS_POSITION if the last time this GPS position was updated excedes the GPS_TIMEOUT_IN_MINUTES value 
 */
var GPS_POSITION = 40;
var OLD_GPS_POSITION = 45;

var GPS_TIMEOUT_IN_MINUTES = 20;

/*
 * 
 */
SERVER_URL = "http://h-web01.nve.no/test_regobsservices/Odata.svc/"

/*
 * 1 = Norsk
 */	
LANGUAGE = 1

/*
 * Platform
 */
var device = {
		platform: 'android'
}