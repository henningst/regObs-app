var cities = [
    {"value": "Paris", "pop": "2 211 297"},
    {"value": "Marseille", "pop": "851 420"},
    {"value": "Lyon", "pop": "474 946"},
    {"value": "Toulouse", "pop": "439 553"},
    {"value": "Nice", "pop": "344 875"},
    {"value": "Nantes", "pop": "283 288"},
    {"value": "Strasbourg", "pop": "272 116"},
    {"value": "Montpellier", "pop": "252 998"},
    {"value": "Bordeaux", "pop": "235 891"},
    {"value": "Lille", "pop": "225 784"},
    {"value": "Rennes", "pop": "206 655"},
    {"value": "Reims", "pop": "181 468"},
    {"value": "Le Havre", "pop": "178 769"},
    {"value": "Saint-Étienne", "pop": "172 696"},
    {"value": "Toulon", "pop": "166 733"},
    {"value": "Grenoble", "pop": "156 659"},
    {"value": "Dijon", "pop": "151 576"},
    {"value": "Angers", "pop": "148 405"},
    {"value": "Saint-Denis", "pop": "144 238"},
    {"value": "Le Mans", "pop": "143 547"},
    {"value": "Aix-en-Provence", "pop": "142 743"},
    {"value": "Brest", "pop": "142 097"},
    {"value": "Villeurbanne", "pop": "141 106"},
    {"value": "Nîmes", "pop": "140 267"},
    {"value": "Limoges", "pop": "140 138"},
    {"value": "Clermont-Ferrand", "pop": "139 006"},
    {"value": "Tours", "pop": "135 480"},
    {"value": "Amiens", "pop": "134 381"},
    {"value": "Metz", "pop": "122 838"},
    {"value": "Besançon", "pop": "117 599"},
    {"value": "Perpignan", "pop": "116 676"},
    {"value": "Orléans", "pop": "113 257"},
    {"value": "Boulogne-Billancourt", "pop": "112 233"},
    {"value": "Mulhouse", "pop": "111 860"},
    {"value": "Caen", "pop": "109 899"},
    {"value": "Rouen", "pop": "109 425"},
    {"value": "Nancy", "pop": "106 361"},
    {"value": "Saint-Denis", "pop": "103 742"},
    {"value": "Argenteuil", "pop": "103 250"},
    {"value": "Saint-Paul", "pop": "103 008"},
    {"value": "Montreuil", "pop": "102 176"},
    {"value": "Roubaix", "pop": "95 893"},
    {"value": "Tourcoing", "pop": "92 614"},
    {"value": "Avignon", "pop": "90 109"},
    {"value": "Nanterre", "pop": "89 556"},
    {"value": "Créteil", "pop": "89 304"},
    {"value": "Poitiers", "pop": "89 282"},
    {"value": "Fort-de-France", "pop": "89 000"},
    {"value": "Versailles", "pop": "86 686"},
    {"value": "Courbevoie", "pop": "85 054"},
    {"value": "Vitry-sur-Seine", "pop": "84 071"},
    {"value": "Pau", "pop": "84 036"},
    {"value": "Colombes", "pop": "83 695"},
    {"value": "Aulnay-sous-Bois", "pop": "82 188"},
    {"value": "Asnières-sur-Seine", "pop": "81 666"},
    {"value": "Rueil-Malmaison", "pop": "78 112"},
    {"value": "Antibes", "pop": "76 994"},
    {"value": "Saint-Pierre", "pop": "76 247"},
    {"value": "La Rochelle", "pop": "75 822"},
    {"value": "Saint-Maur-des-Fossés", "pop": "75 724"},
    {"value": "Champigny-sur-Marne", "pop": "75 142"},
    {"value": "Calais", "pop": "74 817"},
    {"value": "Aubervilliers", "pop": "74 528"},
    {"value": "Cannes", "pop": "72 939"},
    {"value": "Le Tampon", "pop": "72 026"},
    {"value": "Béziers", "pop": "71 672"},
    {"value": "Bourges", "pop": "68 980"},
    {"value": "Dunkerque", "pop": "68 292"},
    {"value": "Saint-Nazaire", "pop": "66 912"},
    {"value": "Colmar", "pop": "66 871"},
    {"value": "Drancy", "pop": "66 194"},
    {"value": "Mérignac", "pop": "66 095"},
    {"value": "Ajaccio", "pop": "65 153"},
    {"value": "Valence", "pop": "64 484"},
    {"value": "Quimper", "pop": "63 929"},
    {"value": "Issy-les-Moulineaux", "pop": "63 297"},
    {"value": "Noisy-le-Grand", "pop": "63 106"},
    {"value": "Levallois-Perret", "pop": "62 995"},
    {"value": "Villeneuve-d'Ascq", "pop": "62 717"},
    {"value": "Troyes", "pop": "61 544"},
    {"value": "Antony", "pop": "61 240"},
    {"value": "Neuilly-sur-Seine", "pop": "60 341"},
    {"value": "La Seyne-sur-Mer", "pop": "59 999"},
    {"value": "Les Abymes", "pop": "59 270"},
    {"value": "Sarcelles", "pop": "59 221"},
    {"value": "Clichy", "pop": "58 388"},
    {"value": "Lorient", "pop": "58 148"},
    {"value": "Niort", "pop": "58 072"},
    {"value": "Cayenne", "pop": "57 643"},
    {"value": "Pessac", "pop": "57 632"},
    {"value": "Vénissieux", "pop": "57 629"},
    {"value": "Saint-Quentin", "pop": "56 843"},
    {"value": "Chambéry", "pop": "56 835"},
    {"value": "Ivry-sur-Seine", "pop": "56 679"},
    {"value": "Cergy", "pop": "56 108"},
    {"value": "Montauban", "pop": "55 974"},
    {"value": "Hyères", "pop": "55 135"},
    {"value": "Beauvais", "pop": "54 953"},
    {"value": "Cholet", "pop": "54 118"},
    {"value": "Bondy", "pop": "53 259"},
    {"value": "Villejuif", "pop": "53 240"},
    {"value": "Saint-André", "pop": "52 956"},
    {"value": "Vannes", "pop": "52 983"},
    {"value": "Maisons-Alfort", "pop": "52 852"},
    {"value": "Fontenay-sous-Bois", "pop": "52 848"},
    {"value": "Chelles", "pop": "52 765"},
    {"value": "Arles", "pop": "52 729"},
    {"value": "Pantin", "pop": "52 698"},
    {"value": "Épinay-sur-Seine", "pop": "52 689"},
    {"value": "Fréjus", "pop": "52 687"},
    {"value": "Évry", "pop": "52 500"},
    {"value": "La Roche-sur-Yon", "pop": "51 724"},
    {"value": "Grasse", "pop": "51 580"},
    {"value": "Sartrouville", "pop": "51 447"},
    {"value": "Clamart", "pop": "51 407"},
    {"value": "Narbonne", "pop": "51 005"},
    {"value": "Laval", "pop": "50 931"},
    {"value": "Charleville-Mézières", "pop": "50 876"},
    {"value": "Évreux", "pop": "50 777"},
    {"value": "Sevran", "pop": "50 770"},
    {"value": "Saint-Louis", "pop": "50 717"},
    {"value": "Le Blanc-Mesnil", "pop": "50 668"},
    {"value": "Belfort", "pop": "50 346"},
    {"value": "Annecy", "pop": "50 115"},
    {"value": "Brive-la-Gaillarde", "pop": "49 675"},
    {"value": "Cagnes-sur-Mer", "pop": "48 926"},
    {"value": "Meaux", "pop": "48 853"},
    {"value": "Albi", "pop": "48 847"},
    {"value": "Saint-Malo", "pop": "48 211"},
    {"value": "Vincennes", "pop": "48 118"},
    {"value": "Bobigny", "pop": "47 726"},
    {"value": "Carcassonne", "pop": "47 634"},
    {"value": "Blois", "pop": "46 834"},
    {"value": "Montrouge", "pop": "46 682"},
    {"value": "Martigues", "pop": "46 471"},
    {"value": "Châlons-en-Champagne", "pop": "46 138"},
    {"value": "Aubagne", "pop": "46 093"},
    {"value": "Châteauroux", "pop": "46 026"},
    {"value": "Chalon-sur-Saône", "pop": "46 017"},
    {"value": "Saint-Brieuc", "pop": "45 879"},
    {"value": "Suresnes", "pop": "45 617"},
    {"value": "Saint-Ouen", "pop": "45 595"},
    {"value": "Alfortville", "pop": "44 728"},
    {"value": "Meudon", "pop": "44 706"},
    {"value": "Puteaux", "pop": "44 548"},
    {"value": "Bayonne", "pop": "44 506"},
    {"value": "Tarbes", "pop": "44 174"},
    {"value": "Boulogne-sur-Mer", "pop": "43 753"},
    {"value": "Bastia", "pop": "43 477"},
    {"value": "Saint-Herblain", "pop": "43 177"},
    {"value": "Angoulême", "pop": "43 112"},
    {"value": "Castres", "pop": "43 010"},
    {"value": "Sète", "pop": "42 786"},
    {"value": "Arras", "pop": "42 782"},
    {"value": "Valenciennes", "pop": "42 656"},
    {"value": "Istres", "pop": "42 603"},
    {"value": "Mantes-la-Jolie", "pop": "42 593"},
    {"value": "Douai", "pop": "42 413"},
    {"value": "Wattrelos", "pop": "41 829"},
    {"value": "Gennevilliers", "pop": "41 822"},
    {"value": "Livry-Gargan", "pop": "41 808"},
    {"value": "Corbeil-Essonnes", "pop": "41 666"},
    {"value": "Compiègne", "pop": "41 648"},
    {"value": "Saint-Priest", "pop": "41 460"},
    {"value": "Salon-de-Provence", "pop": "41 411"},
    {"value": "Thionville", "pop": "41 129"},
    {"value": "Saint-Germain-en-Laye", "pop": "40 940"},
    {"value": "Le Cannet", "pop": "40 940"},
    {"value": "Caluire-et-Cuire", "pop": "40 869"},
    {"value": "Rosny-sous-Bois", "pop": "40 843"},
    {"value": "Talence", "pop": "40 576"},
    {"value": "Massy", "pop": "40 545"},
    {"value": "Alès", "pop": "40 520"},
    {"value": "Vaulx-en-Velin", "pop": "40 373"},
    {"value": "Bourg-en-Bresse", "pop": "40 203"},
    {"value": "Cherbourg-Octeville", "pop": "39 774"},
    {"value": "Garges-lès-Gonesse", "pop": "39 640"},
    {"value": "Montluçon", "pop": "39 492"},
    {"value": "Le Lamentin", "pop": "39 410"},
    {"value": "Chartres", "pop": "39 159"},
    {"value": "Bron", "pop": "39 094"},
    {"value": "Melun", "pop": "38 938"},
    {"value": "Marcq-en-Barœul", "pop": "38 874"},
    {"value": "Noisy-le-Sec", "pop": "38 716"},
    {"value": "Gap", "pop": "38 584"},
    {"value": "Bagneux", "pop": "38 509"},
    {"value": "Gagny", "pop": "38 342"},
    {"value": "Le Port", "pop": "38 279"},
    {"value": "Choisy-le-Roi", "pop": "38 153"},
    {"value": "Rezé", "pop": "37 910"},
    {"value": "Anglet", "pop": "37 897"},
    {"value": "Nevers", "pop": "37 558"},
    {"value": "Poissy", "pop": "37 466"},
    {"value": "Savigny-sur-Orge", "pop": "37 319"},
    {"value": "La Courneuve", "pop": "36 915"},
    {"value": "Auxerre", "pop": "36 856"},
    {"value": "Draguignan", "pop": "36 648"},
    {"value": "Saint-Martin", "pop": "36 661"},
    {"value": "Vitrolles", "pop": "36 610"},
    {"value": "Lens", "pop": "36 120"},
    {"value": "Roanne", "pop": "35 936"},
    {"value": "Joué-lès-Tours", "pop": "35 839"},
    {"value": "Villepinte", "pop": "35 810"},
    {"value": "Échirolles", "pop": "35 688"},
    {"value": "Saint-Laurent-du-Maroni", "pop": "35 631"},
    {"value": "Saint-Martin-d'Hères", "pop": "35 565"},
    {"value": "Saint-Chamond", "pop": "35 516"},
    {"value": "Tremblay-en-France", "pop": "35 494"},
    {"value": "Haguenau", "pop": "35 144"},
    {"value": "Saint-Joseph", "pop": "35 062"},
    {"value": "Montélimar", "pop": "34 847"},
    {"value": "Pontault-Combault", "pop": "34 815"},
    {"value": "Conflans-Sainte-Honorine", "pop": "34 814"},
    {"value": "Six-Fours-les-Plages", "pop": "34 803"},
    {"value": "Stains", "pop": "34 608"},
    {"value": "Creil", "pop": "34 580"},
    {"value": "Mâcon", "pop": "34 298"},
    {"value": "Villefranche-sur-Saône", "pop": "34 159"},
    {"value": "Sainte-Geneviève-des-Bois", "pop": "34 022"},
    {"value": "Saint-Raphaël", "pop": "34 006"},
    {"value": "Montigny-le-Bretonneux", "pop": "33 993"},
    {"value": "Bagnolet", "pop": "33 960"},
    {"value": "Marignane", "pop": "33 909"},
    {"value": "Saint-Benoît", "pop": "33 802"},
    {"value": "La Ciotat", "pop": "33 790"},
    {"value": "Dieppe", "pop": "33 590"},
    {"value": "Châtellerault", "pop": "33 540"},
    {"value": "Romans-sur-Isère", "pop": "33 440"},
    {"value": "Agen", "pop": "33 245"},
    {"value": "Franconville", "pop": "33 214"},
    {"value": "Colomiers", "pop": "33 200"},
    {"value": "Neuilly-sur-Marne", "pop": "33 198"},
    {"value": "Épinal", "pop": "33 043"},
    {"value": "Thonon-les-Bains", "pop": "32 824"},
    {"value": "Châtillon", "pop": "32 510"},
    {"value": "Maubeuge", "pop": "32 374"},
    {"value": "Cambrai", "pop": "32 346"},
    {"value": "Les Mureaux", "pop": "32 337"},
    {"value": "Le Perreux-sur-Marne", "pop": "32 250"},
    {"value": "Liévin", "pop": "32 026"},
    {"value": "Châtenay-Malabry", "pop": "31 854"},
    {"value": "Viry-Châtillon", "pop": "31 681"},
    {"value": "Dreux", "pop": "31 212"},
    {"value": "Schiltigheim", "pop": "31 133"},
    {"value": "Vandœuvre-lès-Nancy", "pop": "31 083"},
    {"value": "Malakoff", "pop": "30 909"},
    {"value": "Houilles", "pop": "30 908"},
    {"value": "Nogent-sur-Marne", "pop": "30 852"},
    {"value": "Villeneuve-Saint-Georges", "pop": "30 820"},
    {"value": "Sainte-Marie", "pop": "30 815"},
    {"value": "Plaisir", "pop": "30 773"},
    {"value": "Athis-Mons", "pop": "30 647"},
    {"value": "Goussainville", "pop": "30 567"},
    {"value": "Palaiseau", "pop": "30 352"},
    {"value": "Saint-Laurent-du-Var", "pop": "30 276"},
    {"value": "Mont-de-Marsan", "pop": "30 162"},
    {"value": "Sotteville-lès-Rouen", "pop": "30 042"}
];