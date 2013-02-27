## Nve Regobs

Nve består av to prosjekter og en felles www mappe. De to prosjketene er hver sitt bygg av
PhoneGap for android og iphone. www mappen inneholder selve applikasjonen som kjøres i et
webview inne i phonegap appen.

For å komme igang med utviklingen så gjøre følgende.

 # Sjekk ut koden
 # Åpne iphone/regObs.xcodeproj
 # Trykk play, og se at alt fungerer
 # Gjør endringer

Linker
 * phonegap [http://phonegap.com/]
 * cordova [http://cordova.apache.org/]
 * phonegappluggins [https://github.com/phonegap/phonegap-plugins]


Applikasjonen består av en stor del delt funksjonalitet. All denne funksjonaliteten ligger i
javascript/html delen av applikasjonen. Hver av de to platformene har egene måter å håndtere
spesial funksjoner på. Disse funksjonene er implementert som phonegap plugins. Enten gjennom
tredjeparts/community utviklere eller egenutviklet.


## Javascript applikasjonen.

regObs mobil er i stor grad en spesiallisert javascript applikasjoen. Denne er implementert
basert på flere rammeverk som hverfor seg leverer spesiallisert funksjonalitet. I listen under
er de viktigste listet opp.

 * jQuery
 * wink
 * odata
 * handlebars

## Struktur

regObs er bygget rundt winks side model. Denne modelen definerer mange sider i html. Hver av
disse sidene er definert med en div og en id. En side har flere egenskaper som at den kan
adresseres, man kan gå fram og tilbake i side historen. Samtidig har en side en livssyklus,
den blir oppretett og avsluttet.

Hver av sidene som er implementert er implementert med dette som bakgrunn. Hver side kan gjøre
noe oppsett i init, dette skjer før siden rendres. Alle funksjoner som håndterer knapper og
burkerintraksjon på en side, er implementert på denne siden. State og regler som brukes på en
side holdes også av side objectet. Dette vil leve så lenge vi har siden i side historien, og
forsvinne når siden går ut av historien.

Når en side skal hente, oppdatere eller registrere data gjøres dette gjennom andre klasser.
Disse kan sess på som servicer eller businessklasser. Dette gjør det enkelere å gjenbruke
funksjoner på tvers av sider.

Servicene blir initializert ved oppstart av appen. De blir montert i det globale scopet og
vil så ledes holde state så lenge appen lever. Dette kan være over svært lang tid. Derfor
må disse klassene rydde opp svært godt når de er ferdige.

### Business klasser

regObs app håndterer flere funksjoner som skal ende opp i dataregistering på regObs web. Så
ledes er det ikke regObs app som bestemmer hvordan data skal se ut. Men det er regObs app sin
oppgave å levere data på et format som regObs web forventer. Dette være seg innhenting av
metadata. Eller sammen settning av flere observasjoner til en registering, innlogging og bruker
tilknyttning.

Businessregler i regObs app hander derfor i stor grad om sammen stilling og validering av data.
Samt registering av data via et mobilt interface. Det siste medfører håndtering av permanet
innloging, offline støtte, dårlige connections og intraksjon med mobiletelefonens sensorer.

### Serverintraksjon

Hoved forlmålet er å levere god og fersk data til regObs dette innebærer to ting. Det første er
å levere data inn i regObs datamodell. Dette gjøres gjennom å sende JSON strukturer som matcher
regObs sine dataobjekter. Det andre er å sammenstille flere dataobjekter til en komplett
registering. Dette gjøre si flere http kall via oData bibliotektet mot regObs servere. Dette
gjøres i en flyt hvor det er flere steg som alle avhenger av hverandre.

Denne jobben utføres av to hovedklasser i samhandling. Det ene er AbstractPackage, som er
spesiallisert for hver naturfare. Denne klasse inneholder sammenstilling av flere observasjoner
med posisjon og lokasjon. Hvor lokasjon beskriver metadata for posisjonen som er representert ved
gps koordinater.

#### Innsendings flyt

Vider gjør samme klassen i samarbeid med Send klassen selve sende rutinen. Det som gjøres i denne
delen er innsending til regObs. Her vil man følge føldende flyt

Object  : ObsLocation -> Registration -> Observation*
Trenger : BrukerId       ObslocationId   RegistrationId

Flyten gjentas opptil to ganger ved å dele mellom punkt og omeråde observasjoner. Det kan være
at flere observasjoner er lagt til samme registering. Dette løses ved at man sender inn
alle observasjonene med samme registerings id. Dette gjør at observasjonene bundles sammen på
regObs.


### Offline datalagring

Data som registeres i felt, kan ikke altid sendes inn med en gang. Dette skyldes først og fremst
at det ikke er mobildekning i felt. Som igjen gjør at appen må passe på all data som ikke er
innsendt og sende denne inn på et senere tidspunkt. Dette gjøres gjennom å lagre data i
LocalStorage i telefonen. Utgående data lagres i telefonen i sine respektive abstraksjoner. Dette
er de samme abstraksjonene som brukes til innsending av data til regObs. Dette med untak av
AbstractPackage som i denne omgang brukes som en kontainer.

All data lagres så fort brukeren trykker Legg til. Og slettes først når man får kvitering på at
alle observasjoner er motatt hos regObs. Dette er med på å passe på at alle observasjoner enten
lagres eller sendes. Det gjør også at flere registeringer med sine metadata, hovedsaklig posisjon
og tidspunkt følger riktige observasjoner.


## Oppsett av utviklermiljø

Vi har i stor grad brukt Eclipse til utvikling av javascript og android, samt XCode til utvikling
av iOs appliaksjonen.

Miljøet er relativt enkelt. Det består av en filstruktur som er standard for hver app, og en symlink
til den delte koden. Dette gjør at det er minimale endringer som skal gjøres for å bygge begge
applikasjonene. Det eneste man trenger så fremt man har miljøet oppe er å bytte app type i
nve_config.js.

### Node.js / coffee script / handlebars

For å kunne kjøre /assets/www/js/lib/compile.sh for å kompilere alle templatene og coffescriptene så
må en ha coffee compiler og handlebars compiler på pathen. Dette gjør vi gjennom node.js.

 # Installer node.js fra: http://nodejs.org/
 # Bruk npm, på kommandolinjen å kjør
 # sudo npm install -g coffee-script handlebars




### Android
Her setter man opp et nytt android prosjekt. Dette gjøres gjennom å velge File -> Import -> Existing
project into workspace. For så å gå til mappen med android prosjektet.

For å kjøre prosjektet, så kontrollerer man at nve_config.js er satt opp til å være android. Også høyre
klikker man på prosjektet og velger run as Android application.

## Iphone
Her må man ha siste versjon av XCode, for så å åpne regObs.xcodeproj.

For å kjøre prosjektet så setter man nve_config.js til iphone. Også trykker man play i XCode.
