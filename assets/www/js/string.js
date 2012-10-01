/*
 * Feedback after user is logged in
 */
LOGGED_IN  = "Logget inn !";

LOGIN_BUTTON = "Logg inn";

LOGOUT_BUTTON = "Logg ut";

NOT_LOGGED_IN_WARNING = "Du er i ferd med å send inn observasjoner som anonym bruker.";

/*
 * Error messages
 */
ERROR_LOGIN =  "Innlogging misslykket. Mangler du nettverk?";

//General error message
AN_ERROR_OCCURED = "Telefonen får ikke kontak med regObs. Registreringen blir tatt vare på til du forsøker igjen senere.";

LOGGING_IN = "Logger inn... ";

/*
 * Message shown while loading the picture from the camera
 */
PROCESS_PICTURE = "Laster bilde... ";

/*
 * Uploading progress message
 */
UPLOADING = "Laster opp... ";

/*
 * Buttons for after registration is uploaded
 */
OK = "Ok";

ABORT= "Avbryt"

SEND_EMAIL = "Kvittering på epost";

OBSERVATION_REGISTERED = "<h3>Registrering sent til regObs</h3><p>Takk for bidraget!</p>";



/*
 * 
 */
USE_TESTMODE_BUTTON = "Bruk testregObs";

USE_PROD_BUTTON = "Bruk normalregObs";

/*
 * Error message if the user does not enter a comment in the Hendelse comment field
 */
HENDELSE_ERROR = "Du må skrive en kommentar!";

/*
 * Utbredelse text
 */
SNOW_TEXT = 
	[
	 	"", //ikkeangit
		"Gjelder på dette stedet.",
		"Gjelder i denne fjellsiden.",
		"Gjelder generelt på fjellet.",
		"Gjelder i dalen/fjorden.",
		"Gjelder for kommunen.",
		"Gjelder for fylket/ varslingsregionen.",
	 ];

ICE_TEXT = 
	[
	 	"", //ikkeangit
		"Gjelder på dette stedet.",
		"Gjelder på denne siden av vannet.",
		"Gjelder på hele vannet.",
		"Gjelder i området.",
	 ];

WATER_TEXT = 
	[
	 	"", //ikkeangit
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


/*
 * Hjelpetekst til observasjonene
 */
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

SNOW_DANGERSIGN = "<h3>Faretegn</h3>"
	+ "<p>Det er svært nyttig for varslingsgruppa å få informasjon om faretegn fordi de gir gode hint om hvor ustabilt snødekket er.</p>"
	+ "<p>For eksempel:</p>"
	+ "<ul>"
	+ "<li>Hvis det rapporteres om drønnelyder i snøen, sprekker og/eller ferskenaturlig utløste skred er det mye som tyder på at faregraden er minst faregrad 3 (betydelig skredfare).</li>"
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
	+ "<li>Kanskje det er ting som du har lagt merketil som ikke er så lett å vite om? Kanskje du vet at vannføringen har økt og isen tæres fra undersiden?</li>"
	+ "<li>Kanskje man bør holde seg unna den ene enden av vannet da osen er åpen?</li>"
	+ "<li>Eller rett og slett, du har borret og vet at det er bare 5cm is under snøen.</li>"
	+ "</ul>"
	+ "<p>Det er noen ”kanksje’er” og i teksten over. Faretegn forteller bare en liten del av totalbildet. De er indikatorer, men er veldig nyttige som tilleggsinfomasjon når man skal ferdes på isen.</p>"
	+ "<p>Legg merke til at man kan annslå utstrekning på faretegnet og dette kommer med i kommentarfeltet.</p>";


ICE_INCIDENT =
	  "<h3>Ulykker, nestenulykker og hendelser</h3>"
	+ "<div>Vi ønkser å lære av deres feil. Vi ønsker at dere skal lære av andres feil.</div>"
	+ "<ul>"
	+ "<li>Hvis man legger inn info når det skjer noe kan alle lære av ulykken og den kan ha en forebyggende effekt.</li>"
	+ "<li>Ut fra en beredskapstankegang er det nyttig å få vite om hendelser for å kunne oppdatere innholdet så det blir mer relevant for det som skjer.</li>"
	+ "</ul>"
	+ "<div>Vi kan også lære av mange hendelser over tid.</div>"
	+ "<ul>"
	+ "<li>Hvis man kan få tall på hvor ofte ulike typer ulykker eller nestenulykker forrekommer gir man grunnlaget for å jobbe prevantivt med opplæring og informasjon.</li>"
	+ "</ul>";


DIRT_AVALANGE = "<h3>Jord- og flomskred</h3>"
	+ "<p>Her skal det komme hjelpetekst til denne observasjonen.</p>"
	+ "<p>Et forslag til beskrivende tekst mottas med takk!</p>"
	+ "<p>E-post: <a href=\"mailto:raek@nve.no\">raek@nve.no</a></p>";

DIRT_PICTURE =  "<h3>Ta bilde</h3>"
	+ "<p>Her skal det komme hjelpetekst til denne observasjonen.</p>"
	+ "<p>Et forslag til beskrivende tekst mottas med takk!</p>"
	+ "<p>E-post: <a href=\"mailto:raek@nve.no\">raek@nve.no</a></p>";

DIRT_ DANGERSIGN = "<h3>Faretegn</h3>"
	+ "<p>Her skal det komme hjelpetekst til denne observasjonen.</p>"
	+ "<p>Et forslag til beskrivende tekst mottas med takk!</p>"
	+ "<p>E-post: <a href=\"mailto:raek@nve.no\">raek@nve.no</a></p>";

DIRT_INCIDENT = "<h3>Ulykker, nestenulykker og hendelser</h3>"
	+ "<p>Her skal det komme hjelpetekst til denne observasjonen.</p>"
	+ "<p>Et forslag til beskrivende tekst mottas med takk!</p>"
	+ "<p>E-post: <a href=\"mailto:raek@nve.no\">raek@nve.no</a></p>"; 

WATER_LEVEL = "<h3>Vannstand</h3>"
	+ "<p>Her skal det komme hjelpetekst til denne observasjonen.</p>"
	+ "<p>Et forslag til beskrivende tekst mottas med takk!</p>"
	+ "<p>E-post: <a href=\"mailto:raek@nve.no\">raek@nve.no</a></p>";

WATER_PICTURE =  "<h3>Ta bilde</h3>"
	+ "<p>Her skal det komme hjelpetekst til denne observasjonen.</p>"
	+ "<p>Et forslag til beskrivende tekst mottas med takk!</p>"
	+ "<p>E-post: <a href=\"mailto:raek@nve.no\">raek@nve.no</a></p>";

WATER_ DANGERSIGN = "<h3>Faretegn</h3>"
	+ "<p>Her skal det komme hjelpetekst til denne observasjonen.</p>"
	+ "<p>Et forslag til beskrivende tekst mottas med takk!</p>"
	+ "<p>E-post: <a href=\"mailto:raek@nve.no\">raek@nve.no</a></p>";

WATER_INCIDENT = "<h3>Ulykker, nestenulykker og hendelser</h3>"
	+ "<p>Her skal det komme hjelpetekst til denne observasjonen.</p>"
	+ "<p>Et forslag til beskrivende tekst mottas med takk!</p>"
	+ "<p>E-post: <a href=\"mailto:raek@nve.no\">raek@nve.no</a></p>";

/*
 * Text om appen og regObs. Vises på førstesiden bak regObssymbolet
 */
ABOUT_REGOBS =
	  "<H3>Om regObs</H3>"
	+ "<p>regObs er en del av verktøyene NVE har laget gjennom arbeidet knyttet til varsling og beredskap. regObs er en del av Varsom familien og varsom.no.</p>"
	+ "<p>I regObs legger vi opp til at du kan dele informasjon med oss slik at våre produkter til samfunnet blir bedre. Vi har også lagt opp til at du skal kunne dele med dine egne venner, kollegaer, gjester, kunder... og at det er et verktøy som kan brukes av flere, for egne formål.</p>"
	+ "<p>Vi hører gjerne om dine bruker opplevelser på godt og vondt og har <a href=\"https://docs.google.com/spreadsheet/embeddedform?formkey=dE5HSDcxMjV4bVAyLTVPdGN2ZEViSEE6MQ\">et skjema</a> for nettopp det.</p>"
	+ "<p>Lykke til!</p>";



HENDELSE = "Ulykke / Hendelse";
	+ "<div>regObs er en del av verktøyene NVE har laget gjennom arbeidet knyttet til varsling og beredskap. regObs er en del av Varsom familien og varsom.no.</div>"
	+ "<div>I regObs legger vi opp til at du kan dele informasjon med oss slik at våre produkter til samfunnet blir bedre. Vi har også lagt opp til at du skal kunne dele med dine egne venner, kollegaer, gjester, kunder... og at det er et verktøy som kan brukes av flere, for egne formål.</div>"
	+ "<div>Vi hører gjerne om dine bruker opplevelser på godt og vondt og har <a href=\"https://docs.google.com/spreadsheet/embeddedform?formkey=dE5HSDcxMjV4bVAyLTVPdGN2ZEViSEE6MQ\" target='_blank'>et skjema</a> for nettopp det.</div>"
	+ "<div>Lykke til!</div>";


/*
 * Popup på innloggings siden ved feil brukernavn eller passord.
 */
ERROR_WRONG_LOGIN = "Innlogging feilet, sjekk bruker navn og passord";

/*
 * Popup hvis vi ikke finner god nok posisjon. 
 */
ERROR_NO_POSITION = "Det er ikke mulig &aring; finne en posisjon. Sjekk instillinger, forbedre GPS motakk og pr&oslash;v igjen";

ERROR_NO_LOGIN_CURRENT_MODE = "Du er ikke logget inn i denne versjonen av regObs.";

ERROR_TIMEOUT = "Vi kunne dessverre ikke avslutte oprasjonen i tide. Prøv igjen.";

