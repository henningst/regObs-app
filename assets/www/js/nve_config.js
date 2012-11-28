
/*
 * A GPS_POSITION is marked as an OLD_GPS_POSITION if the last time this GPS position was updated excedes the GPS_TIMEOUT_IN_MINUTES value 
 */
var GPS_POSITION = 40;
var OLD_GPS_POSITION = 45;

var GPS_TIMEOUT_IN_MINUTES = 20;

/*
 * 
 */
TEST = "http://h-web01.nve.no/stage_regobsservices/Odata.svc/";
STAGE = "http://api.nve.no/hydrology/regobs/v0.8.2/Odata.svc/";
//SERVER_URL = 
SERVER_URL = TEST;

TEST_LOGIN = "http://h-web01.nve.no/stage_RegObsServices/Authentication_JSON_AppService.axd/";
STAGE_LOGIN = "http://api.nve.no/hydrology/regobs/v0.8.2/Authentication_JSON_AppService.axd/";
SERVER_LOGIN_URL = TEST_LOGIN;

WEB_LINK_URL_STAGE = "http://www.regobs.no/";
WEB_LINK_URL_TEST = "http://h-web01.nve.no/stage_RegObsWeb/";
WEB_LINK_URL = WEB_LINK_URL_TEST;


STAGE_REGISTER_URL = "http://h-web01.nve.no/stage_RegObsServices/Account/Register";
PROD_REGISTER_URL = "http://api.nve.no/hydrology/regobs/v0.8.2/Account/Register";
REGISTER_URL = STAGE_REGISTER_URL;

GA_TRACKER_CODE = "UA-32394009-1";

/*
 * Platform
 */
var device = {
//	platform: 'android'
	platform: 'iphone'
};



APP_VERSION = "0.15.9";
	
//BUGSENS_KEY = '1e74c587';//test
BUGSENS_KEY = '5eb4c461';//prod
	
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
CAROUSEL_STANDART = 0;

/*
 * Omraade id 
 */
OMRAADE_ID_OFFSET = 100;

/*
 * Defaul "diameter" på sirkel/firkant som vi søker etter observasjoner i
 */
SEARCH_DIAMETER = 40000;
SEARCH_DIAMETER_KEY = "search_diameter_key"
	
DEFINED = 0x123141;
