/*
 * A GPS_POSITION is marked as an OLD_GPS_POSITION if the last time this GPS position was updated excedes the GPS_TIMEOUT_IN_MINUTES value 
 */
var GPS_POSITION = 40;
var OLD_GPS_POSITION = 45;

var GPS_TIMEOUT_IN_MINUTES = 20;

/*
 * 
 */
SERVER_URL = "http://h-web01.nve.no/stage_regobsservices/Odata.svc/";
//SERVER_URL = "http://h-web01.nve.no/test_regobsservices/Odata.svc/";

/*
 * Platform
 */
var device = {
		platform: 'iphone'
};

/*
 * 1 = Norsk
 */	
LANGUAGE = 1;

/*
 * Enums for snow, water, ice and dirt 
 */
SNOW = 1;
ICE = 2;
WATER = 3;
DIRT = 4;

/*
 * Omraade id 
 */
OMRAADE_ID_OFFSET = 100;

/*
 * Text
 */
LOGGED_IN  = "Logget inn !";
ERROR_LOGIN =  "No internet ?!";
LOGGING_IN = "Logger inn... ";
PROCESS_PICTURE = "Prosess bilde... ";
UPLOADING = "Laster opp... ";
OK = "Ok";
SEND_EMAIL = "Send epost";
