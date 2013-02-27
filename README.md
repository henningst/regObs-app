## Nve Regobs

Nve består av to prosjekter og en felles www mappe. De to prosjektene er hver sitt bygg av
PhoneGap et for android og et for iphone. www mappen inneholder selve applikasjonen som kjøres i et
webview inne i appen.

For å komme raskt i gang med utviklingen så gjøre følgende.

 1. Sjekk ut koden 

    git clone https://github.com/NVE/regObs-app.git
 2. Åpne iphone/regObs.xcodeproj
 3. Trykk play, og se at alt fungerer
 4. Gjør endringer

Se "Oppsett av utviklermiljø" lenger nede, for utfyllende beskrivelser.

#### Linker
 * phonegap [http://phonegap.com/]
 * cordova [http://cordova.apache.org/]
 * phonegappluggins [https://github.com/phonegap/phonegap-plugins]


Applikasjonen består av en stor del delt/kryssplattform funksjonalitet. All denne funksjonaliteten ligger i
javascript/html delen av applikasjonen. Hver av de to plattformene har egne måter å håndtere
spesial funksjoner på. Disse funksjonene er implementert som phonegap plugins. Enten gjennom
tredjeparts/community utviklere eller egenutviklet av NVE teamet.


## Javascript applikasjonen.

regObs mobil er i stor grad en spesiallisert javascript applikasjoen. Denne er implementert
basert på flere rammeverk som hverfor seg leverer spesiallisert funksjonalitet. I listen under
er de viktigste listet opp.

 * jQuery [http://jquery.com/]
 * wink [http://www.winktoolkit.org/]
 * odata [http://datajs.codeplex.com/]
 * handlebars [http://datajs.codeplex.com/]

## Struktur

regObs er bygget rundt winks sidemodell. Denne modellen definerer mange appsider i html divs. Hver av
disse sidene er definert med en div og en id. En side har flere egenskaper som at den kan
adresseres, man kan gå fram og tilbake i sidehistoren. Samtidig har en side en livssyklus,
den blir opprettet og avsluttet.

Hver av sidene som er implementert er implementert med dette som bakgrunn. Hver side kan gjøre
noe oppsett i init(), dette skjer før siden rendres. Alle funksjoner som håndterer knapper og
brukerintraksjon er implementert i dette side objektet. Tilstand og regler som brukes på en
side holdes også av side objektet. Dette vil leve så lenge vi har siden i sidehistorien, og
forsvinne når siden går ut av historien.

Når en side skal hente, oppdatere eller registrere data gjøres dette gjennom andre klasser.
Disse kan sees på som servicer eller businessklasser. Dette gjør det enklere å gjenbruke
funksjoner på tvers av sider.

Servicene blir initialisert ved oppstart av appen. De blir montert i det globale scopet og
vil så ledes holde tilstand så lenge appen lever. Dette kan være over svært lang tid. Derfor
må disse klassene rydde opp når de er ferdige.

### Business klasser

regObs app håndterer flere funksjoner som skal ende opp i dataregistering på regObs web. 
Således er det ikke regObs app som bestemmer hvordan data skal se ut. Men det er regObs app sin
oppgave å levere data på et format som regObs web forventer. Dette være seg innhenting av
metadata sammen settning av flere observasjoner til en registrering, innlogging og 
brukertilknyttning.

Businessregler i regObs app hander derfor i stor grad om sammenstilling og validering av data.
Samt registering av data via et mobilt interface. Det siste medfører håndtering av permanet
innloging, offline støtte, dårlige connections og interaksjon med mobiletelefonens sensorer.

### Serverinteraksjon

Hovedformålet er å levere god og fersk data til regObs dette innebærer to ting. Det første er
å levere data inn i regObs datamodell via tjenestelaget [http://api.nve.no/regobsdoc.html]. Dette gjøres gjennom å sende JSON strukturer som matcher
regObs sine dataobjekter. Det andre er å sammenstille flere dataobjekter til en komplett
registering. Dette gjøres i flere http kall via oData bibliotektet mot regObs servere. Dette
gjøres i en flyt hvor det er flere steg som alle avhenger av hverandre.

AbstractPackage gjør hoveddelen av dette arbeidet. Klassen er 
spesiallisert for hver av naturfarene. Denne klasse inneholder sammenstilling av flere observasjoner
med posisjon og lokasjon. Hvor lokasjon beskriver metadata for posisjonen som er representert ved
gps koordinater.

#### Innsendings flyt

Videre gjør samme klasse i samarbeid med Send klassen selve sende rutinen. Det som gjøres i denne
delen er innsending til regObs. Her vil man følge følgende flyt

    Object  : ObsLocation -> Registration -> Observation*

Hver av stegene bruker tidligere hentet data.

    Trenger : BrukerId       ObslocationId   RegistrationId

Flyten gjentas opptil to ganger ved å dele mellom punkt og område observasjoner. Det kan være
at flere observasjoner er lagt til samme registering. Dette løses ved at man sender inn
alle observasjonene med samme registerings id. Dette gjør at observasjonene bundles sammen på
regObs web.


### Offline datalagring

Data som registeres i felt, kan ikke alltid sendes inn med en gang. Dette skyldes først og fremst
at det ikke er mobildekning i felt. Som igjen gjør at appen må passe på all data som ikke er
innsendt og sende denne inn på et senere tidspunkt. Dette gjøres gjennom å lagre data i
LocalStorage i telefonen. Utgående data lagres i telefonen i sine respektive abstraksjoner. Dette
er de samme abstraksjonene som brukes til innsending av data til regObs. Dette med unntak av
AbstractPackage som i denne omgang brukes som en kontainer.

All data lagres så fort brukeren trykker Legg til. Og slettes først når man får kvittering på at
alle observasjoner er motatt hos regObs. Dette er med på å passe på at alle observasjoner enten
lagres eller sendes. Det gjør også at flere registeringer med sine metadata, hovedsaklig posisjon
og tidspunkt følger riktige observasjoner.


# Oppsett av utviklermiljø

Vi har i stor grad brukt Eclipse til utvikling av javascript og android, samt XCode til utvikling
av iOs appliaksjonen.

Miljøet er relativt enkelt. Det består av en filstruktur som er standard for hver app, og en symlink
til den delte koden. Dette gjør at det er minimale endringer som skal gjøres for å bygge begge
applikasjonene. Det eneste man trenger så fremt man har miljøet oppe er å bytte app type i
nve_config.js.

### Node.js / coffee script / handlebars

Vi bruker coffee script til koding av de viktige delene av systemet. Coffee script er et språk
som kompileres til javascript og som gjør det enklere å skrive javascript som er riktig. All
kompilering skjer gjennom compile.sh.

For å kunne kjøre /assets/www/js/lib/compile.sh for å kompilere alle templatene og coffescriptene så
må en ha coffee compiler og handlebars compiler på pathen. Jobben gjøres av node.js.

 1. Installer node.js fra: http://nodejs.org/
 2. Bruk npm, på kommandolinjen å kjør
 3. sudo npm install -g coffee-script handlebars

Så kan man kjøre compile.sh, vi gjør det slik
    
    cd assets/www/js/lib
    sh compile.sh
    
    
### Android
Her setter man opp et nytt android prosjekt i Eclipse. Dette gjøres gjennom å velge 
File -> Import -> "Existing project into workspace". For så å gå til mappen med 
android prosjektet.

For å kjøre prosjektet, så kontrollerer man at nve_config.js er satt opp til å 
være android. Også høyre klikker man på prosjektet og velger run as Android application.

## Iphone
Her må man ha siste versjon av XCode, for så å åpne iphon/regObs.xcodeproj.

For å kjøre prosjektet så setter man nve_config.js til iphone. Også trykker man play i XCode.
