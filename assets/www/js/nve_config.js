/*
 * A GPS_POSITION is marked as an OLD_GPS_POSITION if the last time this GPS position was updated excedes the GPS_TIMEOUT_IN_MINUTES value 
 */
var GPS_POSITION = 40;
var OLD_GPS_POSITION = 45;

var GPS_TIMEOUT_IN_MINUTES = 20;

/*
 * 
 */
TEST = "http://h-web01.nve.no/test_regobsservices/Odata.svc/";
STAGE = "http://api.nve.no/hydrology/regobs/v0.8.1/Odata.svc/";
//SERVER_URL = 
SERVER_URL = TEST;

TEST_LOGIN = "http://h-web01.nve.no/stage_RegObsServices/Authentication_JSON_AppService.axd/";
STAGE_LOGIN = "http://api.nve.no/hydrology/regobs/v0.8.1/Authentication_JSON_AppService.axd/";
SERVER_LOGIN_URL = TEST_LOGIN;


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

SNOW_GEO_HAZARD = 10;
DIRT_GEO_HAZARD = 20;
ICE_GEO_HAZARD = 70;
WATER_GEO_HAZARD = 60;

/*
 * 
 */
CAROUSEL_STANDART = 2;

/*
 * Omraade id 
 */
OMRAADE_ID_OFFSET = 100;

