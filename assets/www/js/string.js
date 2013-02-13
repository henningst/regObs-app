/*
 * Feedback after user is logged in
 */
LOGGED_IN  = "Du er logget på!";

LOGIN_BUTTON = "Logg på";

LOGOUT_BUTTON = "Logg av";

NOT_LOGGED_IN_WARNING = "Du er i ferd med å send inn observasjoner som anonym bruker.";

/*
 * Error messages
 */
ERROR_LOGIN =  "Pålogging mislykket. Mangler du nettverk?";

//General error message
AN_ERROR_OCCURED = "Telefonen får ikke kontakt med regObs. Registreringen blir tatt vare på til du forsøker igjen senere.";

LOGGING_IN = "Logger på... ";

SENDING_IN_BACKGROUND = "Telefonen jobber med å sende registreringer til regObs. Trykk ok for å gjøre dette i bakgrunnen."

/*
 * Message shown while loading the picture from the camera
 */
PROCESS_PICTURE = "Laster bilde... ";

/*
 * Uploading progress message
 */
UPLOADING = "Laster opp observasjonen. Vent på bekreftelse (og ikke steng telefonen) ... </br></br>";

/*
 * Buttons for after registration is uploaded
 */
OK = "Ok";

ABORT= "Avbryt"

SEND_EMAIL = "Send kvittering";

OBSERVATION_REGISTERED = "<h3>Registrering sent til regObs</h3><p>Takk for bidraget!</p>";

/**
 * setting page descriptionstext
 */

SETTING_UPDATE_DESCRIPTION = "Hver gang du starter app\'en oppdateres den mot eventuelle endringer i regObs. Du kan også gjøre dette manuelt.";
SETTING_RESET_DESCRIPTION = "Har du problemer med app\'en kan du forsøke resette den.";
SETTING_MODE_DESCRIPTION = "App\'en kan settes i test-modus for øvelse. Hver modus skilles med farge, svart for normal-modus og rød for test. HUSK: Hver modus krever egen bruker.";
SETTING_DIAMETER_DESCRIPTION = "Observasjoner fra regObs hentes ut i et område rundt deg. Diameter gitt i meter.";


/*
 * 
 */
USE_TESTMODE_BUTTON = "Bruk test-regObs";

USE_PROD_BUTTON = "Bruk normal-regObs";

/*
 * Error message if the user does not enter a comment in the Hendelse comment field
 */
HENDELSE_ERROR = "Du må skrive en kommentar!";

/*
 * Utbredelse text
 */
SNOW_TEXT = 
	[
	 	"", //Ikke angit
		"Gjelder på dette stedet.",
		"Gjelder i denne fjellsiden.",
		"Gjelder generelt på fjellet.",
		"Gjelder i dalen/fjorden.",
		"Gjelder for kommunen.",
		"Gjelder for fylket/ varslingsregionen.",
	 ];

SNOW_EVALUATION_TEXT = 
	[
	 	"Ikke angitt", 
		"Gjelder på dette stedet.",
		"Gjelder i denne fjellsiden.",
		"Gjelder generelt på fjellet.",
		"Gjelder i dalen/fjorden.",
		"Gjelder for kommunen.",
		"Gjelder for fylket/ varslingsregionen.",
	 ];

ICE_TEXT = 
	[
	 	"", //Ikke angit
		"Gjelder på dette stedet.",
		"Gjelder på denne siden av vannet.",
		"Gjelder på hele vannet.",
		"Gjelder i området.",
	 ];

WATER_TEXT = 
	[
	 	"", //Ikke angit
		"Gjelder på dette stedet.",
		"Gjelder på dette elvestrekket.",
		"Gjelder i vassdraget.",
	 ];

DIRT_TEXT = 
	[
	 	"", //ikkeangit
		"Gjelder på dette stedet.",
		"Gjelder i denne fjellsiden.",
		"Gjelder generelt på fjellet.",
		"Gjelder i dalen/fjorden.",
		"Gjelder for kommunen.",
		"Gjelder for fylket/ varslingsregionen.",
	 ];

SNOW_ACTIVTY_HEIGHT = [{value: 0, name: "0"}];

for(var i = 0; i < 25 ; i++){
	var value = i * 100;
	SNOW_ACTIVTY_HEIGHT.push({value: value, name: value + " moh"})
};
			
SNOW_ACTIVITY_ASPECT = [{value: 0, name: "0"}];
for(var i = 0; i <= 315/45 ; i++){
	var value = i * 45;
	SNOW_ACTIVITY_ASPECT.push({value: value, name: value + "&deg;"})
};


/*
 * Hjelpetekst til observasjonene
 */

LOGIN_PAGE = "<H3>Innlogging</H3>"
	+ "<p>Logg inn med brukernavn og passord. Dette er den samme login du har på regObs-web.</p>"
    + "<p>Om du benytter det av test-modus for øvelse er dette et eget brukernavn og passord. Husk!: Hver modus skilles med farge, svart for normal-modus og rød for test.</p>";

SNOW_ACTIVITY = "<h3>Skredaktivitet</h3>"
    + "<p>Skredaktiviteten skal gi et inntrykk om hvor mange, hvor store og hvilke type skred som gikk de siste 24 timer i et område. Du noterer også utløsnings- områders orientering og høyde.</p>"
    + "<p>Dersom det går flere typer skred i et område kan det registreres flere skredaktiviteter.</p>"
    + "<p>Dersom det er gått mer enn ett døgn siden siste observasjon, noteres et anslag på tid siden skredene gikk. Dersom det ikke er gått nye skred siste 24 timer er det viktig å registrere dette som ”ingen”.</p>";

SNOW_PICTURE = "<H3>Ta bilde</H3>"
	+ "<div>Gode bilder er svært nyttig for varslingsgruppa og andre som vil ha et inntrykk av hvordan snøforholdene er.</div>"
	+ "<ul>"
	+ "<li>Tenk på at bildet du tar skal brukes av andre som ikke har de informasjonen du har om omgivelsene.</li>"
	+ "<li>Eksempel på nyttige bilder: Oversikt som viser snøfordelingen i området, ferske skred, skavler, snøprofil med tydelig svakt lag, sprekker i snøen, snøfokk fra toppene, rimlag…</li>"
	+ "<li>Husk å velge fra nedtrekksmenyen hva bildet forestiller. Dersom ingen av valgene er dekkende kan du skrive noen få ord i tekstfeltet.</li>"
	+ "</ul>"
	+ "<div>Et tips til å ta bedre bilder av snø kan være å gå inn på regObs og se gjennom bilder andre har tatt. Hvilke bilder mener du gir god informasjon?</div>";

SNOW_INCIDENT =  "<h3>Ulykker, nestenulykker og hendelser</h3>"
	+ "<p>Vi ønsker å samle inn så mye informasjon som mulig om ulykker, nestenulykker og andre hendelser knyttet til snøskred.</p>"
	+ "<p>Per i dag vet vi for eksempel nesten ingenting om de skredhendelsene som ikke fører til dødsfall. Hvorfor skjedde hendelsen? Hvorfor gikk det bra? Hvordan kunne situasjonen vært unngått?</p>"
	+ "<p>Mer kunnskap er viktig fordi:</p>"
	+ "<ul>"
	+ "<li>Mer informasjon om uønskede hendelser gjør det lettere å lære av egne og andres feil. Kunnskap er forebyggende.</li>"
	+ "<li>Over tid vil et bedre datagrunnlag over hendelser være med som grunnlag for å evaluere for eksempel effekten av ABS-sekken i norske forhold, eller påvirke innholdet i skredkurs fordi vi vil vite mer om årsakene til de vanligste nestenulykkene.</li>"
	+ "</ul>"
	+ "<p>NB: Dersom du ønsker å være anonym kan du legge inn informasjonen som anonym bruker (dersom du har en bruker og er pålogget må du logge ut først).</p>";

SNOW_EVALUATION = "<h3>Skredvurdering:</h3>"
    + "<p><strong>Merk:</strong> Det kreves mye skredforståelse og lokalkunnskap for å fylle ut dette skjema.</p>"
    + "<p>Skredvurderingen består av:</p>"
    + "<ul>"
    + "<li>Inntil 3 skredproblemer. Disse har egne info sider.</li>"
    + "<li>Faregrad: Sett faregraden nå etter den europeiske skredfareskalaen.</li>"
    + "<li>Eksposisjon: Velg mest utsatt himmelretning.</li>"
    + "<li>Utstrekning: Hvor gjelder vurderingen? App'en legger dette valget til i skredvurderingen.</li>"
    + "<li>Skredvurdering: Skal kort og presist beskrive nåvurdering med værsituasjonen og hvordan det påvirker snødekket, oppbygging av og stabilitet i snødekket og informasjon om skredaktivitet.</li>"
    + "</ul>";

SNOW_PROBLEM = "<h3>Skredproblemer</h3>"
    + "<p>Du kan velg inntil tre skredproblemer. Et skredproblem består av tre deler som blir 'skredtype - årsak - enda en årsak' og tre deler som setter sammen 'sannsynlighet – Utløsningsfaktor – størrelse'. Den siste delen tillater valg av posisjonen i snødekket det er et problem.</p>"
    + "<p>Valg av skredproblem er utgangspunkt for det som videre skrives i skredvurdering.</p>";


SNOW_DANGERSIGN = "<h3>Faretegn</h3>"
	+ "<p>Det er svært nyttig for varslingsgruppa å få informasjon om faretegn fordi de gir gode hint om hvor ustabilt snødekket er.</p>"
	+ "<p>For eksempel:</p>"
	+ "<ul>"
	+ "<li>Hvis det rapporteres om drønnlyder i snøen, sprekker og/eller ferskenaturlig utløste skred er det mye som tyder på at faregraden er minst faregrad 3 (betydelig skredfare).</li>"
	+ "<li>Hvis det rapporteres om rimkrystaller på overflaten vet varslingsgruppa at dette kan skape problemer som et svakt lag senere (hvis det blir begravet).</li>"
	+ "<li>NB! det er også veldig nyttig å få vite at ingen faretegn er observert! Det tyder på at faregraden er enten 2 (moderat skredfare) eller 1 (liten skredfare).</li>"
	+ "</ul>"
	+ "<p>Legg også inn informasjon om ca hvilket område observasjonen gjelder for.</p>";

SNOW_SURFACE = "<h3>Snøoverflate</h3>"
	+ "<p>Her skal det komme hjelpetekst til denne observasjonen.</p>"
	+ "<p>Et forslag til beskrivende tekst mottas med takk!</p>"
	+ "<p>E-post: <a href=\"mailto:raek@nve.no\">raek@nve.no</a></p>";

ICE_PICTURE =  
	  "<H3>Hvordan ta et godt bilde</H3>"
	+ "<ul>" 
	+ "<li>Tenk på at et bilde skal beskrive noe som kan nyttes av andre når de skal gjøre seg en vurdering av forholdene.</li>"
	+ "<li>Hvis bildet skal sees i sammenheng med en annen observasjon, velg den i nedtrekksmenyen.</li>"
	+ "<li>Svært nyttige bilder å få inn er: isdekningsgraden på et vann eller i en elv, råker og andre åpne ispartier relativt terrenget rundt, isganger eller isoppstuinger.</li>"
	+ "<li>Ikke så nyttige bilder å få inn: noen som borrer et hull og som viser verken hullet eller terrenget rundt. Ellers er mye interessant egentlig..</li>"
	+ "</ul>"
	+ "<div>Et tips til hvordan ta gode bilder: gå på regObs og se hvilke bilder du syns var bra og kunne tenke deg å se mer av.</div>";

              
ICE_DANGERSIGN = 
	  "<h3>Hva er det med disse faretegnene egentlig?</h3>"
	+ "<p>Faretegn kan man bruke til å vurdere hvor trygg isen er.</p>"
	+ "<ul>"
	+ "<li>Kanskje det er ting som du har lagt merke til som ikke er så lett å vite om? Kanskje du vet at vannføringen har økt og isen tæres fra undersiden?</li>"
	+ "<li>Kanskje man bør holde seg unna den ene enden av vannet da osen er åpen?</li>"
	+ "<li>Eller rett og slett, du har boret og vet at det er bare 5cm is under snøen.</li>"
	+ "</ul>"
	+ "<p>Det er noen ”kanksje’er” og i teksten over. Faretegn forteller bare en liten del av totalbildet. De er indikatorer, men er veldig nyttige som tilleggsinformasjon når man skal ferdes på isen.</p>"
	+ "<p>Legg merke til at man kan anslå utstrekning på faretegnet og dette kommer med i kommentarfeltet.</p>";


ICE_INCIDENT =
	  "<h3>Ulykker, nestenulykker og hendelser</h3>"
	+ "<div>Vi ønsker å lære av deres feil. Vi ønsker at dere skal lære av andres feil.</div>"
	+ "<ul>"
	+ "<li>Hvis man legger inn info når det skjer noe kan alle lære av ulykken og den kan ha en forebyggende effekt.</li>"
	+ "<li>Ut fra en beredskapstankegang er det nyttig å få vite om hendelser for å kunne oppdatere innholdet så det blir mer relevant for det som skjer.</li>"
	+ "</ul>"
	+ "<div>Vi kan også lære av mange hendelser over tid.</div>"
	+ "<ul>"
	+ "<li>Hvis man kan få tall på hvor ofte ulike typer ulykker eller nestenulykker forrekommer gir man grunnlaget for å jobbe prevantivt med opplæring og informasjon.</li>"
	+ "</ul>";

ICE_COVER = "<h3>Isdekning</h3>"
    + "<p>Feltet ”Isdekning” viser isforholdene akkurat nå.</p>"
    + "<p>Feltet ”Isdekning før observasjon” brukes dersom gårsdagen var annerledes.</p>"
    + "<p>I kommentarene er det fint med tekst om skøyteforhold og sikkerhet, og kanskje anslag om istykkelsen.</p>";


ICE_THICKNESS = "<h3>Istykkelse</h3>"
    + "<p>Før man starter boringen finner man et sted som virker representativt, og helst minst 50 m fra land.</p>"
    + "<p>Grav deg ned i snøen og mål tykkelsen på den tørre og den våte delen av snøen. Total istykkelse er avstanden fra toppen av det øverste islaget til bunnen av det nederste islaget. Regn altså med eventuelt mellomliggende sørpelag.</p>"
    + "<p>I kommentar kan man beskrive tykkelsen på lag dersom det er flere. Aller best er det om man etter turen oppdaterer målingen på en datamaskin, da websiden gir mulighet til å detaljere lag for lag. I kommentarene er det også fint med tekst om skøyteforhold og sikkerhet.</p>";

DIRT_AVALANGE = "<h3>Jord- og flomskred</h3>"
+ "<p>Hvilken type jordskred har du observert? For varslingstjenesten er dette nyttig informasjon for å gjøre varslingen bedre. Er det jordskred (har ikke gått i bekkeløp), er det flomskred (i bekkeløp), steinsprang (mest stein), leirskred (utglidninger i fine masser) eller noe annet? Det er også svært viktig å registrere når du antar skredet har gått, selv om dette kan være vanskelig å anslå dersom du faktisk ikke var tilstede da det skjedde. Størrelse og trigger (utløsningsmekanisme) kan du gjerne registrere, men dette kan selvsagt være vanskelig å anslå.</p>";


DIRT_PICTURE =  "<h3>Ta bilde</h3>"
+ "<p>Et bilde av jordskred som har gått eller faretegn i terrenget er til stor hjelp for forstå bedre hva som har hendt og øker kvaliteten på registreringen. Jordskredvarslingen får med et bilde et raskt og godt inntrykk av hva som er situasjonen ute i terrenget. Et godt bilde viser skredmateriale (er det jord, stein eller kanskje leire?), størrelsen på skredet, skredbanen og løsneområdet. Alt dette kan være vanskelig å få inn på et bilde, så ta gjerne flere bilder! I bildebeskrivelsen er det nyttig å angi i hvilken retning bildet er tatt og hvor.</p>";


DIRT_DANGERSIGN = "<h3>Faretegn</h3>"
+ "<p>Et registrert faretegn for jordskred gir jordskredvarslinga et inntrykk av hvordan situasjonen er i terrenget med de værforholdene som er på tidspunktet. Dette gir nyttig tilleggsinfo til den som skal vurdere faregraden for området. Bruk feltet for beskrivelse visst de forhåndsdefinerte faretegnene ikke helt passer inn i det du ønsker å rapportere, eller for å beskrive omfanget/utstrekningen av det du registrerer.</p>";


DIRT_INCIDENT = "<h3>Ulykker, nestenulykker og hendelser</h3>"
+ "<p>Hvilke konsekvenser har jordskredet du har observert? Er det skade på hus, vei eller annen infrastruktur? Har det påvirket mennesker, dyr eller trafikk? Demmes bekk eller elv opp av skredmassene? Her kan du beskrive jordskredet uten tekniske finesser. Tenk at du vil opplyse andre som beveger seg i området om konsekvensene jordskredet har.</p>";


WATER_LEVEL = "<h3>Vannstand</h3>"
+ "<p>Her kan du registrere observert vannstand, i forhold til en kjent skala eller andre referansepunkt. Er det vann opp til dørklinka? Ta et bilde og referer til bildet med en kommentar her. </p>";


WATER_PICTURE =  "<h3>Ta bilde</h3>"
+ "<p>Et bilde kan si mer enn tusen ord! Er det mer vann enn vanlig der du ferdes? Står det vann på jordene, i kjellere eller opp av kumlokk? Del det, så får flomvarslingen en viktig statusrapport og andre interesserte kan for eksempel planlegge ferdsel. Er du ved en målestasjon for vannstand kan du ta bilde av vannstandskalaen, dette er god informasjon for NVE sine felthydrologer.</p>";


WATER_DANGERSIGN = "<h3>Faretegn</h3>"
+ "<p>Observerer du vann på ville veier, og årsaken til det? Er det tette stikkrenner eller andre avløpsveier? Er det is i bekkeløp eller kulverter som tvinger vannet til å ta nye veier? Stiger vannet faretruende fort? Slik type informasjon kan hjelpe flomvarslingen og andre til å forstå hvilke effekt en nedbør- eller snøsmeltingssituasjon har. Eller kanskje ansvarlig beredskapsmyndighet får et tips om hvor det er aktuelt å rykke ut nettopp nå?</p>";


WATER_INCIDENT = "<h3>Ulykker, nestenulykker og hendelser</h3>"
+ "<p>Hva er konsekvensen av det du registrerer? Er det vann på ville veier som skader veg, jernbane, hus eller en målestasjon? Er noen skadet som følge av dette? Tenk at du vil opplyse andre som beveger seg i området om konsekvensene av at det er mye (eller lite?) vann i elva/bekken.</p>";




/*
 * Text om appen og regObs. Vises på førstesiden bak regObssymbolet
 */
ABOUT_REGOBS_OLD =
"<H3>Om regObs</H3>"
+ "<p>regObs er en del av verktøyene NVE har laget gjennom arbeidet knyttet til varsling og beredskap. regObs er en del av Varsom familien og varsom.no.</p>"
+ "<p>I regObs legger vi opp til at du kan dele informasjon med oss slik at våre produkter til samfunnet blir bedre. Vi har også lagt opp til at du skal kunne dele med dine egne venner, kollegaer, gjester, kunder... og at det er et verktøy som kan brukes av flere, for egne formål.</p>"
+ "<p>Vi hører gjerne om dine bruker opplevelser på godt og vondt og har <a href='#' onclick='main.openUrl(\"https://docs.google.com/spreadsheet/embeddedform?formkey=dE5HSDcxMjV4bVAyLTVPdGN2ZEViSEE6MQ\");'>et skjema</a> for nettopp det.</p>"
+ "<p>Lykke til!</p>";

ABOUT_REGOBS =
"<H3>Om regObs</H3>"
+ "<p>regObs er en del av verktøyene NVE har laget gjennom arbeidet knyttet til varsling og beredskap.</p>"
+ "<p>App’en er et samarbeid med Statens Vegvesen.</br>App’en er utviklet av nLink og NVE/HI.</p>"
+ "<p>Målet med regObs er å lage et verktøy for å samle data om snøforhold, jordskred, flom, isforhold, m.m. til å varslingstjenestene NVE har. Data er tilgjengelig for alle å bruke gjennom. Data som ligger på regObs er lisensiert under Norsk lisens for offentlige data (NLOD) som er kompatibel med CC Navngivelse 3.0 Norge (CC BY 3.0).</p>"
+ "<p>Denne app'en en beta. Vårt observatørkorps og partnere kommer til å bruke den denne vinteren og vi slipper den til publikum slik at flere kan ha nytte av den.</p>"
+ "<p>Vi hører gjerne <a href='#' onclick='main.openUrl(\"https://docs.google.com/spreadsheet/embeddedform?formkey=dE5HSDcxMjV4bVAyLTVPdGN2ZEViSEE6MQ\");'>om dine erfaringer</a> på godt og vondt!</p>"
+ "<p>Lykke til!</p>";


HENDELSE = "Ulykke / Hendelse";
	+ "<div>regObs er en del av verktøyene NVE har laget gjennom arbeidet knyttet til varsling og beredskap. regObs er en del av Varsom familien og varsom.no.</div>"
	+ "<div>I regObs legger vi opp til at du kan dele informasjon med oss slik at våre produkter til samfunnet blir bedre. Vi har også lagt opp til at du skal kunne dele med dine egne venner, kollegaer, gjester, kunder... og at det er et verktøy som kan brukes av flere, for egne formål.</div>"
	+ "<div>Vi hører gjerne om dine bruker opplevelser på godt og vondt og har <a href=\"https://docs.google.com/spreadsheet/embeddedform?formkey=dE5HSDcxMjV4bVAyLTVPdGN2ZEViSEE6MQ\" target='_blank'>et skjema</a> for nettopp det.</div>"
	+ "<div>Lykke til!</div>";


/*
 * Popup på innloggingssiden ved feil brukernavn eller passord.
 */
ERROR_WRONG_LOGIN = "Pålogging feilet, sjekk bruker navn og passord";

/*
 * Popup hvis vi ikke finner god nok posisjon. 
 */
ERROR_NO_POSITION = "Det er ikke mulig &aring; finne en posisjon. Sjekk innstillinger, forbedre GPS mottak og pr&oslash;v igjen";

ERROR_NO_LOGIN_CURRENT_MODE = "Du er ikke logget på i denne versjonen av regObs.";

ERROR_TIMEOUT = "Vi kunne dessverre ikke avslutte operasjonen i tide. Prøv igjen.";

NO_CONNECTION = "Det er ikke mulig å nå regObs når du ikke er koblet til Internett."
	
MISSING_LOGIN = "Vi kunne ikke logge deg inn. Kontrollering innloggig og prøv på nytt.";

BAD_REQUEST = "regObs kunne ikke ta i mot registreringen. Forsøk på nytt, eller nullstill app'en å gjenta registreringen."
	
INTERNAL_ERROR = "regObs har midlertidige problemer. Forsøk innsending igjen senere."
	
UVENTET_FEIL = "Det har oppstått en uventet feil ifb. innsending av registrering. Forsøk igjen senere. Feilen er rapportert."
	
	
/*
 * Settings side
 */
UPDATE_DATA_HEADER = 'Oppdatere data';
UPDATE_DATA_BODY = 'Ønsker du å laste ned all bakgrunnsdata på nytt?';
