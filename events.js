/* rave.wien event data. Updated by the scheduled task. Fields: d(date) s(start) e(end) title venue coll[] genres[] floors[{f,a[]}] (artist "HH:MM|Name" = timetable) price age tickets flyer note{de,en} flags: sexpos lgbtq aw nophoto opendecks zero. src[[sourceKey,url]]. VR = Hausregeln je Location (age, aw, nophoto …) gelten für alle Events dort, sofern das Event nichts anderes angibt. VG = Koordinaten [lat,lng] je Location für die Karte. vok:1 = von der Location selbst bestätigt; Events ohne vok und mit nur einer Quelle zeigt die Seite als „nur 1 Quelle“. KC = bekannte Kollektive (auch ohne aktuelle Events im Filter sichtbar). AR = Artist-Infos (Herkunft, Genres, Clubs, Festivals, Links, Sets). CG = typische Genres je Kollektiv (aus früheren Events), ergänzt fehlende Genres. */
const V={
 "Grelle Forelle": "Spittelauer Lände 12, 1090",
 "SASS Music Club": "Karlsplatz 1, 1010",
 "FLUCC Wanne": "Praterstern 5, 1020",
 "FLUCC Deck": "Praterstern 5, 1020",
 "Das Werk": "Spittelauer Lände 12, 1090",
 "PRST": "Praterstraße 18, 1020",
 "Weberknecht": "Lerchenfelder Gürtel 47, 1160",
 "Club Exil": "Marktstraße 13A, 2331 Vösendorf",
 "Otto Wagner Areal": "Baumgartner Höhe 1, 1140",
 "Tagada": "Brunnengasse 76, 1160",
 "O der Klub": "Opernring/Operngasse, 1010",
 "Club Lucia": "U-Bahnbogen 24–25, 1080",
 "Kramladen": "U-Bahnbogen 39–40, Lerchenfelder Gürtel, 1080",
 "Ottakringer Brauerei": "Ottakringer Platz 1, 1160",
 "Libelle": "Tellgasse 25/1, 1150",
 "Celeste": "Hamburgerstraße 18, 1050",
 "Pratersauna": "Waldsteingartenstraße 135, 1020",
 "B72": "Hernalser Gürtel 72–73, 1080",
 "Metastadt": "Dr.-Otto-Neurath-Gasse 3, 1220",
 "Prater (Calafatiplatz)": "Calafatiplatz, 1020",
 "Usus am Wasser": "An der Neuen Donau 1, 1210",
 "Porto Pollo": "Donauinsel 19, 1220",
 "The Popp im Prater": "Wurstelprater, 1020",
 "The Loft": "Lerchenfelder Gürtel 37, 1160",
 "Secret Location": "TBA",
 "TBA": "TBA",
 "Pyramide Vösendorf": "Parkallee 2, 2334 Vösendorf",
 "Flex": "Augartenbrücke 1, 1010",
 "Lugner City": "Gablenzgasse 5, 1150",
 "U4": "Schönbrunner Straße 222-228, 1120",
 "Funkhaus": "Argentinierstraße 30a, 1040",
 "Rhiz": "Lerchenfelder Gürtel, U-Bahnbogen 37-38, 1080",
 "kv.r.": "Hernalser Hauptstraße 86, 1170",
 "Kollektiv Kaorle": "Baumgartner Höhe 1 (Otto Wagner Areal, Pavillon 21), 1140",
 "Prater Dome": "Riesenradplatz 7, 1020",
 "Altia Skybar – DC Tower": "Donau-City-Straße 7, 1220",
 "Westbahn Studios": "Adresse noch TBA"
};
const S={
 "ra": "Resident Advisor",
 "rg": "regioactive",
 "ft": "frey-tag",
 "fl": "flucc.at",
 "sa": "sassvienna.com",
 "osh": "oh schon hell",
 "ev": "events.at",
 "vo": "volume.at",
 "fa": "FALTER",
 "wm": "Wien Modern",
 "rs": "rausgegangen",
 "ex": "club-exil.at",
 "ci": "cityineurope",
 "hg": "hausgemacht.org",
 "sp": "sexpositives.com",
 "gn": "goodnight.at",
 "gf": "grelleforelle.com",
 "eb": "Eventbrite",
 "cl": "clublucia.at",
 "ok": "o-klub.at",
 "ci2": "circl.at",
 "wa": "warda.at",
 "pt": "partyticket.de",
 "fp": "fetischparty.at",
 "un": "ungeniert.org",
 "ot": "oeticket",
 "dw": "daswerk.org",
 "pr": "prst.ticket.io",
 "we": "weberknecht.at",
 "ce": "celeste.co.at",
 "lo": "theloft.at",
 "fx": "flex.at",
 "bio": "biosphere1997.com",
 "exi": "exil.ticket.io",
 "wwg": "Wien was geht",
 "ftr": "feuchtetraeu.me",
 "ksot": "ksot.ticket.io",
 "stepf": "Step Forward (Tickettailor)",
 "awsm": "awsmevent.com",
 "tl": "technolog.wtf",
 "srd": "subrosadictum.de",
 "kore": "KØRE (nfctron)",
 "rr": "Radio Rudina Tickets",
 "sw": "Switch! Ticketshop",
 "ob": "Ottakringer Brauerei",
 "u4": "u4.at",
 "li": "libelle.at",
 "ej": "Eventjet",
 "ka": "Kollektiv Kaorle Ticketshop",
 "kt": "KUPFticket",
 "tt": "1000things"
};
const SO=["hg","un","pt","wm","ftr","ksot","stepf","awsm","bio","kore","tl","rr","srd","sw"];
const VR={"Grelle Forelle":{"age":"21+","sound":{"de":"Alcons Audio + Lambda Labs","en":"Alcons Audio + Lambda Labs","src":"https://www.properformance.audio/articles/grelle-forelle-mainfloor","floors":{"main":{"de":"Alcons Audio QR36 Line Arrays, 8× Lambda Labs DW-15 Subs","en":"Alcons Audio QR36 line arrays, 8× Lambda Labs DW-15 subs"},"kitchen":{"de":"Lambda Labs (MF-15A Subs, TX-2A, CX-1A Monitore)","en":"Lambda Labs (MF-15A subs, TX-2A, CX-1A monitors)","src":"https://lambda-labs.com/en/references/grelle-forelle"}}}},"Das Werk":{"age":"21+","sound":{"de":"Alcons Audio RR12 + Eigenbau-Subwoofer (12× 15\")","en":"Alcons Audio RR12 + custom subwoofer (12× 15\")","src":"https://www.prosoundweb.com/art-culture-venue-in-austria-outfitted-with-alcons-audio/"}},"SASS Music Club":{"age":"18+","aw":1,"sound":{"de":"Beschallung mit Alcons-Audio-Lautsprechern (Pro-Ribbon-Technologie), installiert von Pro Performance.","en":"Alcons Audio loudspeakers (pro-ribbon technology), installed by Pro Performance.","src":"https://properformance.at/en/projects/club/club-sass-wien/"}},"O der Klub":{"age":"18+"},"FLUCC Wanne":{"aw":1},"Club Exil":{"sound":{"de":"Lambda-Labs-Soundsystem: Auf dem Mainfloor ein 90°-QX-Setup mit 20 DH-18-Subwoofern.","en":"Lambda Labs sound system: a 90° QX setup with 20 DH-18 subwoofers on the main floor.","src":"https://www.properformance.audio/articles/the-lambda-labs-qx-series","floors":{"mainfloor":{"de":"Lambda Labs QX in 90°-Anordnung mit 20 DH-18-Subwoofern.","en":"Lambda Labs QX in a 90° configuration with 20 DH-18 subwoofers.","src":"https://www.properformance.audio/articles/the-lambda-labs-qx-series"}}}}};
const CG={
 "303": [
  "Drum & Bass",
  "Neurofunk"
 ],
 "Im Freudentaumel": [
  "Downtempo",
  "Deep House",
  "Techno"
 ],
 "Herzfrequenz": [
  "Trance",
  "Hardtechno",
  "Hard Bounce"
 ],
 "Heimlich": [
  "Downtempo",
  "Slow Techno",
  "Cosmic Disco"
 ],
 "Magika": [
  "Disco",
  "Downtempo"
 ],
 "Journey to Tarab": [
  "Progressive Techno",
  "Deep House"
 ],
 "Ponyhof": [
  "Disco",
  "Techno"
 ],
 "Techno Vienna": [
  "Techno"
 ],
 "hausgemacht": [
  "Techno",
  "Goa",
  "Downtempo"
 ],
 "Zyklop Audio": [
  "Minimal",
  "Microhouse",
  "House"
 ],
 "Step Forward": [
  "Techno",
  "Trance"
 ],
 "Soundlabs": [
  "Techno",
  "Trance"
 ],
 "Schlachthaus": [
  "Techno"
 ],
 "Schrödingers Groove": [
  "Schranz",
  "Hardtechno",
  "Groove",
  "Techno",
  "Hard Techno"
 ],
 "FIFI Rave": [
  "Schranz",
  "Hardtechno",
  "Groove",
  "Techno",
  "Hard Techno"
 ],
 "Bassproduction": [
  "Techno"
 ],
 "Tasteless": [
  "House",
  "Minimal"
 ],
 "Auf der Lauer": [
  "House",
  "Tech House",
  "Electro",
  "Breaks",
  "Techno"
 ],
 "Housetiere": [
  "House",
  "Dub Techno",
  "Techno"
 ],
 "Entrance": [
  "House",
  "Dub Techno",
  "Techno"
 ],
 "Pink Mayhem": [
  "Hardtechno",
  "Trance",
  "Hard Techno",
  "Techno"
 ],
 "Connecting People": [
  "House",
  "Electro",
  "New Wave",
  "Minimal",
  "Techno",
  "Broken Beat"
 ],
 "SIGNAL": [
  "Melodic House",
  "Techno",
  "Club Charts",
  "Hip Hop",
  "Indie Dance",
  "House",
  "Tribal Techno",
  "Minimal",
  "Hard Techno"
 ],
 "Super Disco": [
  "Melodic House",
  "Techno",
  "Club Charts",
  "Hip Hop"
 ],
 "Wien Modern": [
  "Experimental",
  "Electronic"
 ],
 "Mahlwerk": [
  "Techno",
  "Trance",
  "Drum & Bass",
  "Bounce",
  "Hardgroove"
 ],
 "Fadercult": [
  "Techno",
  "Trance",
  "Drum & Bass",
  "Bounce",
  "Hardgroove"
 ],
 "GDN": [
  "Techno",
  "Hardgroove",
  "Schranz",
  "Hardbounce"
 ],
 "Fluffig": [
  "Techno",
  "Acid"
 ],
 "Bestand": [
  "Experimental",
  "Bass",
  "Grime",
  "Dubstep",
  "Breaks"
 ],
 "up/or": [
  "Experimental",
  "Bass",
  "Grime",
  "Dubstep",
  "Breaks"
 ],
 "Sorry Mom": [
  "Techno",
  "Progressive",
  "Psytech",
  "Melodic Techno"
 ],
 "Kollektiv Ost:West": [
  "House",
  "Tech House"
 ],
 "Nine O Nine": [
  "Hardtechno",
  "Detroit Techno",
  "Hardgroove",
  "Hypnotic Techno",
  "Dub Techno"
 ],
 "LSH": [
  "Hardtechno",
  "Detroit Techno",
  "Hardgroove",
  "Hypnotic Techno",
  "Dub Techno"
 ],
 "909techno": [
  "Hardtechno",
  "Detroit Techno",
  "Hardgroove",
  "Hypnotic Techno",
  "Dub Techno"
 ],
 "Klub Halal": [
  "Club",
  "Electronica"
 ],
 "Habibi Party": [
  "Club",
  "Electronica"
 ],
 "served": [
  "Techno",
  "House"
 ],
 "Harmony Rec.": [
  "Techno",
  "House"
 ],
 "hereandthere": [
  "Techno",
  "House"
 ],
 "technolog": [
  "Techno",
  "Industrial"
 ],
 "Zuckerwatt": [
  "Hardgroove",
  "House",
  "Techno",
  "Hardcore"
 ],
 "Cybertribe": [
  "Hardgroove",
  "House",
  "Techno",
  "Hardcore"
 ],
 "deep cut": [
  "Hypnotic Techno",
  "Deep Techno",
  "Techno",
  "Experimental"
 ],
 "Dark Pressure": [
  "Hypnotic Techno",
  "Deep Techno",
  "Techno",
  "Experimental"
 ],
 "Paradies Garten": [
  "Bounce",
  "Hard Dance",
  "Trance",
  "Acid",
  "House"
 ],
 "MEIOSISS": [
  "Techno"
 ],
 "Contrast": [
  "Drum & Bass",
  "Dubstep",
  "UK Garage",
  "House"
 ],
 "Art Attech": [
  "Techno"
 ],
 "Flashback": [
  "Techno",
  "Acid",
  "Trance"
 ],
 "FactX": [
  "Techno",
  "Acid",
  "Trance"
 ],
 "Ravenbogen": [
  "House",
  "Techno"
 ],
 "Vision Serpent": [
  "Techno",
  "Minimal Techno",
  "Psytech"
 ],
 "techNOage": [
  "Techno"
 ],
 "Synergy": [
  "Trance",
  "Hard Techno",
  "Techno"
 ],
 "KARTELL.FM": [
  "Trance",
  "Hard Techno",
  "Techno"
 ],
 "HEKTISCH": [
  "Trance",
  "Hard Techno",
  "Techno"
 ],
 "Fuelized": [
  "Drum & Bass"
 ],
 "Köstlich": [
  "UK Garage",
  "Hardgroove",
  "Techno"
 ],
 "Gürtelgroove": [
  "UK Garage",
  "Hardgroove",
  "Techno"
 ],
 "Drum & Bassick": [
  "Drum & Bass",
  "Neurofunk",
  "Liquid"
 ],
 "Radiance": [
  "Drum & Bass",
  "Neurofunk",
  "Liquid"
 ],
 "Titti Queer Club": [
  "Techno",
  "Pop"
 ],
 "Empyreon": [
  "Progressive House"
 ],
 "Kollektiv Birdhouse": [
  "Progressive House"
 ],
 "Soularium": [
  "House"
 ],
 "Bassclub": [
  "Drum & Bass",
  "Dubstep",
  "Grime",
  "UK Bass",
  "Breaks",
  "Jungle",
  "Reggae",
  "Dancehall",
  "Dub"
 ],
 "Rude Bwoy Embassy": [
  "Drum & Bass",
  "Dubstep",
  "Grime",
  "UK Bass",
  "Breaks",
  "Jungle",
  "Reggae",
  "Dancehall",
  "Dub"
 ],
 "Jah Power Sound": [
  "Drum & Bass",
  "Dubstep",
  "Grime",
  "UK Bass",
  "Breaks",
  "Jungle",
  "Reggae",
  "Dancehall",
  "Dub"
 ],
 "Sub Zero": [
  "Techno"
 ],
 "The Hive": [
  "Drum & Bass"
 ],
 "Collapse": [
  "Drum & Bass"
 ],
 "Hanzom": [
  "Drum & Bass",
  "Neurofunk"
 ],
 "KSOT": [
  "Techno",
  "House"
 ],
 "KØRE": [
  "Drum & Bass"
 ],
 "euphonic records": [
  "Progressive House",
  "Trance"
 ],
 "created-on-earth": [
  "House"
 ],
 "Fader Friends": [
  "Techno",
  "Hardcore"
 ],
 "Cosmic Egg": [
  "Techno",
  "Hardcore"
 ],
 "sama recordings": [
  "Experimental",
  "Electronica"
 ],
 "50 Herz": [
  "Electro",
  "Industrial"
 ],
 "Kaisa Bodega": [
  "House",
  "Ballroom"
 ],
 "Pingpaya Fenty Savage": [
  "House",
  "Ballroom"
 ],
 "Radio Rudina": [
  "House"
 ],
 "VLAN": [
  "Experimental",
  "Dub Techno",
  "Ambient"
 ],
 "Bonkers": [
  "House",
  "Acid"
 ],
 "Belly Dance Services": [
  "House",
  "Acid"
 ],
 "AMBIEVENT": [
  "Ambient"
 ],
 "Triple A Events": [
  "Trance"
 ],
 "AWSM": [
  "Afro House",
  "Melodic House",
  "House"
 ],
 "Switch!": [
  "Drum & Bass",
  "Jungle"
 ],
 "VG+": [
  "House"
 ],
 "Tribal Vibes": [
  "Psytrance",
  "Trance",
  "Downtempo"
 ],
 "Untz Baby Untz": [
  "Techno",
  "House"
 ]
};
const KC=["303","50 Herz","54Hz","909techno","AMBIEVENT","Art Attech","Auf der Lauer","AWSM","Bassbussi","Bassclub","Bassproduction","Belly Dance Services","Bestand","Bonkers","Callshop Radio","Cardio Cult","Collapse","Connecting People","Contrast","Cosmic Egg","CPE","created-on-earth","Cybertribe","Dark Pressure","Das Syndikat","deep cut","Drum & Bassick","Dystopia Rave","Empyreon","Entrance","euphonic records","FactX","Fader Friends","Fadercult","Feuchte Träume","Fifi","FIFI Rave","Flashback","Fluffig","Fuelized","Gassen aus Zucker","GDN","Gürtelgroove","Habibi Party","Hanzom","Harmony Rec.","hausgemacht","Heimlich","HEKTISCH","hereandthere","Herzfrequenz","Housetiere","Im Freudentaumel","Jah Power Sound","Journey to Tarab","Kaisa Bodega","KARTELL.FM","Klub Halal","Kollektiv Birdhouse","Kollektiv Ost:West","KØRE","Köstlich","KSOT","Little Beat More","LSH","Luv Affair","Magika","Mahlwerk","MEIOSISS","Merkwürdig","Nine O Nine","Ninecircles","Paradies Garten","Pingpaya Fenty Savage","Pink Mayhem","Pole Circle","Ponyhof","Queertactics","Radiance","Radio Rudina","Rave am Mittwoch","Ravenbogen","Rude Bwoy Embassy","sama recordings","Schlachthaus","Schrödingers Groove","Selected","served","SIGNAL","Slutlabs","Sorry Mom","Soularium","Soundlabs","Spumante Records","Step Forward","STRICT!","Sub Zero","SubRosaDictum","Super Disco","Switch!","Synergy","Tasteless","Techno Obscene","Techno Vienna","techNOage","technolog","The Hive","Titti Queer Club","Tribal Vibes","Triple A Events","Untz Baby Untz","up/or","VG+","Vision Serpent","VLAN","Wien Modern","WOS Soundsystem","Zuckerwatt","Zyklop Audio"];
const CI={
 "Ponyhof": {
  "de": "Gemeinnütziges Wiener Kollektiv seit 2018. Termine über Instagram.",
  "en": "Non-profit Viennese collective since 2018. Dates via Instagram.",
  "web": "https://ponyhof-official.at/",
  "ig": "https://www.instagram.com/_ponyhof_official/",
  "sc": "https://soundcloud.com/ponyhof_official",
  "founded": "2018",
  "from": "Wien",
  "members": [
   "AliasElias",
   "Benjamin Di Bora",
   "Da_Mike",
   "Megamietzi",
   "Nira",
   "Kovinator",
   "Rave Dave",
   "Feni"
  ],
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "membersSrc": "https://ponyhof-official.at/",
  "logo": "https://ponyhof-official.at/wp-content/uploads/2021/06/cropped-ponyhof_sticker_Black_rainbow-II-270x270.png",
  "logoBg": "#ffffff"
 },
 "Techno Vienna": {
  "web": "https://technovienna.com/",
  "tix": "https://technovienna.ticket.io/",
  "from": "Wien",
  "src": [
   "https://technovienna.com/",
   "https://de.ra.co/events/2223948",
   "https://www.technovienna.com/en/home/"
  ],
  "logo": "https://www.technovienna.com/wp-content/uploads/2021/06/Logo_nl_2.png"
 },
 "Heimlich": {
  "de": "Downtempo-Kollektiv aus Wien (seit Dezember 2015), Projekt des Vereins für angewandte Beschallung; Partys meist unter 100 BPM, dazu das Label Heimlich Musik.",
  "en": "Downtempo collective from Vienna (since December 2015), a project of the Verein für angewandte Beschallung; parties mostly below 100 BPM, plus the label Heimlich Musik.",
  "from": "Wien",
  "web": "https://heimlich.online/",
  "bc": "https://heimlichmusik.bandcamp.com/",
  "sc": "https://soundcloud.com/heimlichaufsc",
  "src": [
   "https://thegap.at/heimlich-langsam-nicht-leise/",
   "https://www.heimlich.online/",
   "https://heimlichmusik.bandcamp.com/artists",
   "https://goodnight.at/magazin/party/1992-die-coolsten-veranstaltungskollektive-wiens",
   "https://heimlich.online/artists"
  ],
  "label": [
   "Oberst & Buchner",
   "ANT ANTIC",
   "E-Gerät",
   "Semodi",
   "mytripismytrip",
   "ANGST vor GRETA",
   "Constantijn Lange",
   "Agle",
   "Bonfante",
   "JPATTERSSON",
   "Franz Matthews",
   "Johannes Klingebiel",
   "ryan hæng",
   "Geplantes Nichtstun",
   "Amount",
   "Dario Klein",
   "Nathan Hall",
   "Faber",
   "coss",
   "Iorie",
   "Dan Bay",
   "Kalipo",
   "AFAR",
   "Dolph",
   "Tulioxi",
   "Acud",
   "Freudenthal Musik",
   "Phortah",
   "Niko Schwind",
   "mUnO",
   "arutani",
   "AVEM",
   "Rabih Rizk",
   "Evan Michael",
   "Bliz Nochi"
  ],
  "members": [
   "Oberst & Buchner",
   "Oliver Rottmann",
   "Kruzio Terrible",
   "leschueft",
   "Louwers",
   "Mareia",
   "ᗰᗩᖇIEᑌ",
   "m ë x",
   "Orange Drift",
   "Sarah-Mo",
   "sissi petutschnig",
   "späk",
   "Vaterfigur"
  ],
  "friends": [
   "martha van straaten",
   "MoM",
   "Rolandson",
   "Ninze",
   "Just Emma",
   "Rampue"
  ],
  "founded": "2015",
  "ig": "https://www.instagram.com/heimlichcrew/",
  "membersSrc": "https://heimlich.online/artists",
  "logo": "https://images.squarespace-cdn.com/content/v1/584c26392e69cf97b9090b2b/1611049853178-TGV1HYVMOKWBB22MBJGQ/Heimlich-Vienna-Downtempo-Musik-Music-Label-Slow-House-Electronica-Rave.png?format=1500w"
 },
 "hausgemacht": {
  "de": "Wiener Kollektiv (seit 2014, Crew von 40–50 Leuten) hinter der sexpositiven Eventreihe „ZusammenKommen“, u. a. in der Grellen Forelle und im Club Exil.",
  "en": "Viennese collective (since 2014, a crew of 40–50 people) behind the sex-positive series “ZusammenKommen”, e.g. at Grelle Forelle and Club Exil.",
  "from": "Wien",
  "web": "https://www.hausgemacht.org/",
  "series": [
   "ZusammenKommen"
  ],
  "src": [
   "https://www.1000thingsmagazine.com/de/a/914949/zusammen-kommen-auf-den-sex-positive-partys-von-hausgemacht/",
   "https://www.hausgemacht.org/en/djs",
   "https://goodnight.at/magazin/party/1992-die-coolsten-veranstaltungskollektive-wiens"
  ],
  "founded": "2014",
  "members": [
   "tinutus",
   "Saint A",
   "Sabina",
   "Pau:sa",
   "lexyz0",
   "Dj Weitsicht",
   "Dj TheRedFox",
   "Dj Lotto",
   "Delaine",
   "Baby Blue",
   "valentin martins",
   "traumata",
   "Steve Michael",
   "Sandy",
   "Purrdition",
   "Nira",
   "Ni Nek",
   "MiaDunkelbunt",
   "Max Kernmayer",
   "Manuel Grün",
   "MA!A",
   "Frau Hofmann",
   "GauTrance",
   "Frühwerk",
   "Ferdinand Schwarz",
   "Ele Luz"
  ],
  "exMembers": [
   "Anni Herzer"
  ],
  "membersSrc": "https://www.hausgemacht.org/en/djs",
  "noLogo": "2026-10-28"
 },
 "Journey to Tarab": {
  "de": "Wiener Kollektiv, Partys „von Freund*innen für Freund*innen“, oft gemeinsam mit Im Freudentaumel im FLUCC.",
  "en": "Viennese collective, parties “by friends for friends”, often together with Im Freudentaumel at FLUCC.",
  "from": "Wien",
  "src": [
   "https://ra.co/events/1927240",
   "https://www.vice.com/de/article/wer-sich-mal-wieder-spuren-will-sollte-zum-journey-to-tarab-festival-fahren/",
   "https://www.startnext.com/en/journey-to-tarab-perpetuum-mob",
   "https://ohschonhell.at/date/arena-vienna-21-09-2018-heimlich-ins-tarab",
   "https://ohschonhell.at/date/flex-vienna-16-03-2019-journey-to-tarab-%E2%8D%99-tarablantis-%E2%8D%99"
  ],
  "founded": "2016",
  "series": [
   "Journey to Tarab Festival",
   "Tarablantis",
   "Heimlich ins Tarab"
  ]
 },
 "Im Freudentaumel": {
  "de": "Wiener Partyreihe im FLUCC, oft gemeinsam mit Journey to Tarab.",
  "en": "Viennese party series at FLUCC, often with Journey to Tarab.",
  "from": "Wien",
  "src": [
   "https://ra.co/events/1927240",
   "https://ohschonhell.at/orte/flucc/50"
  ],
  "founded": "2022",
  "foundedNote": 1,
  "noLogo": "2026-10-28"
 },
 "Zuckerwatt": {
  "founded": "2008",
  "foundedNote": 1,
  "de": "Techno-Reihe von Andreas, Fabian und Thomas (Idee zu Silvester 2007/08), u. a. in Grelle Forelle, Sass, Flex und Pratersauna.",
  "en": "Techno series by Andreas, Fabian and Thomas (idea on New Year's Eve 2007/08), e.g. at Grelle Forelle, Sass, Flex and Pratersauna.",
  "src": [
   "https://goodnight.at/magazin/party/1992-die-coolsten-veranstaltungskollektive-wiens"
  ],
  "noLogo": "2026-10-28"
 },
 "Herzfrequenz": {
  "founded": "2023",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/das+werk/14"
  ],
  "noLogo": "2026-10-28"
 },
 "Contrast": {
  "founded": "2015",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3"
  ]
 },
 "Techno Entgleist": {
  "founded": "2017",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3"
  ]
 },
 "Rhythm Science": {
  "founded": "2018",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/praterstrasse+-+prst/912"
  ]
 },
 "Merkwürdig": {
  "founded": "2016",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/praterstrasse+-+prst/912"
  ]
 },
 "A Party Called Jack": {
  "founded": "2019",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/flucc/50"
  ]
 },
 "Amore AG": {
  "founded": "2022",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/praterstrasse+-+prst/912"
  ]
 },
 "Techno Obscene": {
  "founded": "2023",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/das+werk/14"
  ]
 },
 "Rave am Mittwoch": {
  "founded": "2022",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/das+werk/14"
  ],
  "noLogo": "2026-10-28"
 },
 "Euphoria": {
  "founded": "2022",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/flucc/50"
  ]
 },
 "Reverse": {
  "founded": "2022",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/flucc/50"
  ]
 },
 "deep cut": {
  "founded": "2024",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/flucc/50"
  ]
 },
 "Bassbussi": {
  "founded": "2023",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/kramladen/549"
  ],
  "noLogo": "2026-10-28"
 },
 "KEN Club": {
  "founded": "2013",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/das+werk/14"
  ]
 },
 "Gaze": {
  "founded": "2021",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/pratersauna/5"
  ]
 },
 "Basstrace": {
  "founded": "2015",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/pratersauna/5"
  ]
 },
 "Misguided": {
  "founded": "2024",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/praterstrasse+-+prst/912"
  ]
 },
 "Vienna Worldwide": {
  "founded": "2021",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/praterstrasse+-+prst/912"
  ]
 },
 "Rave On Vienna": {
  "founded": "2013",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/flucc/50"
  ]
 },
 "Hypertrash": {
  "founded": "2023",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/celeste/47"
  ]
 },
 "Fuelized": {
  "founded": "2023",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/club+lucia/963"
  ],
  "noLogo": "2026-10-28"
 },
 "Drum & Bassick": {
  "founded": "2025",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/club+lucia/963"
  ]
 },
 "Acid Techno Techno Club": {
  "founded": "2018",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3"
  ]
 },
 "NEXUS": {
  "founded": "2022",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3"
  ]
 },
 "Fish Market": {
  "de": "Reihe des Labels MEAT (MEAT Recordings, seit 2009) in der Grellen Forelle.",
  "en": "Series by MEAT (MEAT Recordings, since 2009) at Grelle Forelle.",
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3"
  ]
 },
 "Selected": {
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3"
  ]
 },
 "Achterbahn": {
  "de": "Reihe von Anna Ullrich im PRST.",
  "en": "Series by Anna Ullrich at PRST.",
  "src": [
   "https://ohschonhell.at/orte/praterstrasse+-+prst/912"
  ]
 },
 "Feuchte Träume": {
  "de": "Gemeinnütziger, nicht gewinnorientierter Verein für sexpositive Partys: fördert lokale Artists, FLINTA*/LGBTQIA+, Workshops zu Konsens, Awareness-Team; Tickets nach Fragebogen.",
  "en": "Non-profit association for sex-positive parties: supports local artists, FLINTA*/LGBTQIA+, consent workshops, awareness team; tickets after a questionnaire.",
  "from": "Wien",
  "src": [
   "https://www.theloft.at/feuchte-traeume-renaissance-of-pleasure/",
   "https://de.ra.co/events/2208959",
   "https://feuchtetraeu.me/en/",
   "https://shop.feuchtetraeu.me/pages/vision"
  ],
  "rules": {
   "sexpos": 1,
   "nophoto": 1,
   "aw": 1,
   "lgbtq": 1
  },
  "web": "https://feuchtetraeu.me",
  "ig": "https://instagram.com/feuchte_traeume",
  "tix": "https://tickets.feuchtetraeu.me",
  "series": [
   "FT (nummerierte Ausgaben, z. B. FT — 12)"
  ],
  "noLogo": "2026-10-28"
 },
 "Sorry Mom": {
  "src": [
   "https://ra.co/events/2492475",
   "https://ra.co/events/2521239",
   "https://warda.at/events/sorry-mom-x-usus/",
   "https://ra.co/events/2342420",
   "https://linktr.ee/sorrymom.vienna"
  ],
  "de": "Wiener Partyreihe für melodisch-progressiven, treibenden Techno, u. a. im Club Lucia und im USUS am Wasser.",
  "en": "Vienna party series for melodic, progressive, driving techno, held at venues such as Club Lucia and USUS am Wasser.",
  "from": "Wien",
  "web": "https://linktr.ee/sorrymom.vienna",
  "ig": "https://www.instagram.com/____sorrymom__",
  "friends": [
   "USUS am Wasser"
  ],
  "series": [
   "SORRY MOM x USUS",
   "SORRY MOM herbstrascheln"
  ],
  "logo": "https://ugc.production.linktr.ee/56ada16d-b647-4532-93c3-350fbac3c672_sorry-mom-logo-1080x1080-sw-kreis.png"
 },
 "Kinky Galore": {
  "de": "Sexpositive Partyreihe, in Wien u. a. im Club Exil.",
  "en": "Sex-positive party series, in Vienna e.g. at Club Exil.",
  "rules": {
   "sexpos": 1
  }
 },
 "Zyklop Audio": {
  "de": "Vinyl-only-Label aus Wien, 2025 von Kormos gegründet; als Zyklop veranstaltet es auch Partys, etwa Open Airs mit Dunia.",
  "en": "Vinyl-only label from Vienna founded by Kormos in 2025; as Zyklop it also throws parties, such as open airs with Dunia.",
  "founded": "2025",
  "from": "Wien",
  "ig": "https://instagram.com/zyklopaudio",
  "sc": "https://soundcloud.com/zyklopaudio",
  "bc": "https://zyklopaudio.bandcamp.com",
  "label": [
   "Zyklop Audio"
  ],
  "friends": [
   "Dunia",
   "Nick Hanzo",
   "Gibs",
   "Sam Gittis"
  ],
  "src": [
   "https://zyklopaudio.bandcamp.com/",
   "https://linktr.ee/zyklopaudio",
   "https://ra.co/dj/kormos/biography",
   "https://ra.co/events/2415115",
   "https://ra.co/promoters/158928"
  ],
  "logo": "https://f4.bcbits.com/img/0047803878_100.png"
 },
 "Mahlwerk": {
  "de": "Fünfköpfiges Wiener DJ-Kollektiv zwischen Hardgroove, Trance, Techno und Hardtechno, das mit eigenen Events, Hostings und Gastauftritten in Clubs wie Grelle Forelle, PRST, Pratersauna und Flex präsent ist.",
  "en": "Five-member Vienna DJ collective spanning hardgroove, trance, techno and hard techno, active with its own events, hostings and guest spots at clubs such as Grelle Forelle, PRST, Pratersauna and Flex.",
  "from": "Wien",
  "web": "https://linktr.ee/mahlwerk",
  "ig": "https://instagram.com/mahlwerk.mwk",
  "sc": "https://soundcloud.com/mahlwerk-mwk",
  "friends": [
   "Cybertribe"
  ],
  "src": [
   "https://www.tausendaugen.at/mahlwerk",
   "https://popfest.at/07/25/mahlwerk/",
   "https://www.impulstanz.com/social/aid2185/",
   "https://ra.co/events/2110843"
  ],
  "noLogo": "2026-10-28"
 },
 "Wien Modern": {
  "logo": "https://www.wienmodern.at/images/Logo.png",
  "web": "https://www.wienmodern.at/",
  "src": [
   "https://www.wienmodern.at/"
  ]
 }
};
const VI={
 "Grelle Forelle": {
  "web": "https://www.grelleforelle.com/",
  "opened": "2011",
  "floors": [
   "Mainfloor",
   "Kitchen"
  ],
  "residents": [
   "Matt Mor",
   "Aschenbrenner"
  ],
  "resSrc": [
   "https://ra.co/dj/mattmor",
   "https://ra.co/dj/aschenbrenner"
  ],
  "de": "Club an der Spittelauer Lände mit Mainfloor und Kitchen, einer der wichtigsten Techno-Clubs Wiens.",
  "en": "Club on Spittelauer Lände with Mainfloor and Kitchen, one of Vienna's key techno clubs.",
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3",
   "https://www.grelleforelle.com/"
  ],
  "logo": "https://www.grelleforelle.com/wp-content/uploads/2016/08/cropped-favicon-270x270.png"
 },
 "Das Werk": {
  "web": "https://www.daswerk.org/",
  "floors": [
   "Main Floor",
   "Luster"
  ],
  "residents": [
   "Joey",
   "Crystal O",
   "Golpe",
   "Detoxx",
   "DJ Wifi",
   "Patrick M4ss"
  ],
  "resSrc": [
   "https://warda.at/events/werk-resident-night/",
   "https://events.at/event/werk-resident-night-1"
  ],
  "de": "Kulturverein im Stadtbahnbogen an der Spittelauer Lände, Schwerpunkt harte Techno-Spielarten, Schranz und Bounce.",
  "en": "Cultural association in the railway arches on Spittelauer Lände, focusing on hard techno, schranz and bounce.",
  "src": [
   "https://ohschonhell.at/orte/das+werk/14"
  ],
  "noLogo": "2026-10-28"
 },
 "FLUCC Wanne": {
  "web": "https://flucc.at/",
  "opened": "2002",
  "floors": [
   "Wanne",
   "Deck"
  ],
  "group": "FLUCC",
  "de": "Club am Praterstern: Wanne (unten) und Deck (oben).",
  "en": "Club at Praterstern: Wanne (downstairs) and Deck (upstairs).",
  "src": [
   "https://ohschonhell.at/orte/flucc/50"
  ],
  "noLogo": "2026-10-28"
 },
 "FLUCC Deck": {
  "web": "https://flucc.at/",
  "opened": "2002",
  "floors": [
   "Wanne",
   "Deck"
  ],
  "group": "FLUCC",
  "de": "Club am Praterstern: Wanne (unten) und Deck (oben).",
  "en": "Club at Praterstern: Wanne (downstairs) and Deck (upstairs).",
  "src": [
   "https://ohschonhell.at/orte/flucc/50"
  ],
  "noLogo": "2026-10-28"
 },
 "SASS Music Club": {
  "web": "https://sassvienna.com/",
  "de": "Club am Karlsplatz, Schwerpunkt House und Techno, sonntags „Morgengymnastik“.",
  "en": "Club at Karlsplatz, focus on house and techno, Sundays “Morgengymnastik”.",
  "src": [
   "https://ohschonhell.at/orte/sass/9"
  ],
  "noLogo": "2026-10-28"
 },
 "PRST": {
  "opened": "2020",
  "de": "Club Praterstraße (PRST), House- und Techno-Club in der Leopoldstadt.",
  "en": "Club Praterstraße (PRST), house and techno club in Leopoldstadt.",
  "src": [
   "https://ohschonhell.at/orte/praterstrasse+-+prst/912"
  ],
  "noLogo": "2026-10-28"
 },
 "Club Exil": {
  "web": "https://www.club-exil.at/",
  "opened": "2021",
  "de": "Warehouse-Club in Vösendorf, große Raves mit mehreren Floors.",
  "en": "Warehouse club in Vösendorf, big raves on several floors.",
  "src": [
   "https://ohschonhell.at/orte/exil/914",
   "https://www.club-exil.at/en"
  ],
  "logo": "https://www.club-exil.at/logo.svg"
 },
 "Kramladen": {
  "opened": "2015",
  "de": "Kleiner Club im U-Bahnbogen am Lerchenfelder Gürtel.",
  "en": "Small club in the U-Bahn arches on Lerchenfelder Gürtel.",
  "src": [
   "https://ohschonhell.at/orte/kramladen/549",
   "https://ra.co/events/2475933"
  ],
  "noLogo": "2026-10-28"
 },
 "Celeste": {
  "opened": "2014",
  "de": "Bar und Club in Margareten, Fr/Sa DJs und Live-Acts bis 6 Uhr.",
  "en": "Bar and club in Margareten, Fri/Sat DJs and live acts until 6am.",
  "src": [
   "https://ohschonhell.at/orte/celeste/47",
   "https://www.technoairlines.com/club/celeste-vienna"
  ],
  "noLogo": "2026-10-28"
 },
 "Weberknecht": {
  "web": "https://weberknecht.at/",
  "src": [
   "https://ohschonhell.at/orte/weberknecht/28",
   "https://weberknecht.at/"
  ],
  "logo": "https://weberknecht.at/wp-content/uploads/2018/06/cropped-grunge-plus-1-270x270.png"
 },
 "Tagada": {
  "src": [
   "https://ohschonhell.at/orte/tagada+club/951",
   "https://goodnight.at/locations/tagada-club",
   "https://frey-tag.at/locations/tagada"
  ],
  "de": "Bar und Club in der Brunnengasse 76 am Yppenplatz (Ottakring) mit Café/Bar „Rausch“ vorne und Dancefloor, auf dem am Wochenende lokale DJs spielen – „Vom Vortrinken bis zum Rave“.",
  "en": "Bar and club at Brunnengasse 76 on Yppenplatz (Ottakring) with the café/bar 'Rausch' up front and a dancefloor where local DJs play at weekends – 'from pre-drinks to rave'.",
  "web": "https://www.instagram.com/tagada.club",
  "floors": [
   "Rausch (Bar)",
   "Dancefloor"
  ],
  "noLogo": "2026-10-28"
 },
 "Club Lucia": {
  "web": "https://www.clublucia.at/",
  "src": [
   "https://ohschonhell.at/orte/club+lucia/963",
   "https://www.clublucia.at/"
  ],
  "logo": "https://www.clublucia.at/wp-content/uploads/2025/05/LUCIA-FINAL-white-1-1024x968.png"
 },
 "O der Klub": {
  "web": "https://o-klub.at/",
  "de": "Techno-Club in der ehemaligen Albertina Passage zwischen Ring und Staatsoper, seit 2019 von der HORST GROUP betrieben – mit Mainfloor, Salon Wasabi, Chill-out-Area und Roter Bar.",
  "en": "Techno club in the former Albertina Passage between the Ring and the State Opera, run by the HORST GROUP since 2019 – with a main floor, Salon Wasabi, a chill-out area and the Rote Bar.",
  "opened": "2019",
  "floors": [
   "Mainfloor",
   "Salon Wasabi",
   "Chill Out Area",
   "Rote Bar"
  ],
  "src": [
   "https://warda.at/magazin/lifestyle/o-der-klub-partytreffpunkt-wien/",
   "https://goodnight.at/locations/984-club-o",
   "https://o-klub.at/"
  ],
  "logo": "https://o-klub.at/wp-content/uploads/2022/09/Logo_w.svg"
 },
 "Libelle": {
  "web": "https://www.libelle.at/",
  "logo": "https://www.libelle.at/wp-content/uploads/2024/03/cropped-Libelle_Logo-270x270.png",
  "src": [
   "https://www.libelle.at/"
  ]
 },
 "Pratersauna": {
  "opened": "1965",
  "closed": 1,
  "de": "Ehemalige Sauna im Prater, Club mit Pool. 2025 wiedereröffnet, als Club inzwischen wieder geschlossen.",
  "en": "Former sauna in the Prater, club with pool. Reopened 2025, closed again as a club since.",
  "src": [
   "https://ohschonhell.at/orte/pratersauna/5"
  ]
 },
 "Usus am Wasser": {
  "de": "Lokal an der Neuen Donau, im Sommer Ort für Open-Air-Raves (z. B. Techno am Wasser, Sorry Mom, Ponyhof).",
  "en": "Venue on the Neue Donau, in summer a spot for open-air raves (e.g. Techno am Wasser, Sorry Mom, Ponyhof).",
  "src": [
   "https://tableagent.com/vienna/usus-am-wasser/",
   "https://ra.co/events/2492475"
  ]
 },
 "Porto Pollo": {
  "de": "Bar am Ufer der Donauinsel in Kaisermühlen, Day-Raves am Wochenende.",
  "en": "Bar on the Danube Island bank in Kaisermühlen, weekend day raves.",
  "src": [
   "https://www.technoairlines.com/club/porto-pollo-vienna",
   "https://ra.co/events/2456634"
  ]
 },
 "The Popp im Prater": {
  "de": "Location im Wurstelprater, Open Airs u. a. vom Kollektiv Ponyhof.",
  "en": "Venue in the Wurstelprater, open airs e.g. by the Ponyhof collective.",
  "src": [
   "https://www.instagram.com/reel/Dc_fDV6s2Nv/"
  ]
 },
 "The Loft": {
  "web": "https://www.theloft.at/",
  "floors": [
   "Oben",
   "Unten",
   "Wohnzimmer"
  ],
  "de": "Club am Lerchenfelder Gürtel mit drei Räumen (Oben, Unten, Wohnzimmer).",
  "en": "Club on Lerchenfelder Gürtel with three rooms (Oben, Unten, Wohnzimmer).",
  "src": [
   "https://www.theloft.at/feuchte-traeume-renaissance-of-pleasure/",
   "https://www.theloft.at/"
  ],
  "logo": "https://www.theloft.at/wp-content/uploads/2022/02/loft-logo.svg"
 },
 "Pyramide Vösendorf": {
  "src": [
   "https://o-klub.at/events/pyramide-takeover/"
  ]
 },
 "Flex": {
  "src": [
   "https://flex.at/event/the-hive-x-collapse/"
  ],
  "noLogo": "2026-10-28"
 },
 "Ottakringer Brauerei": {
  "src": [
   "https://warda.at/events/ksot-halloween-warehouse-rave/"
  ],
  "noLogo": "2026-10-28"
 },
 "Lugner City": {
  "src": [
   "https://www.volume.at/events/koere-halloween-rave-2026-2026-10-31/"
  ]
 },
 "U4": {
  "src": [
   "https://ra.co/events/2506486"
  ],
  "noLogo": "2026-10-28"
 },
 "Funkhaus": {
  "src": [
   "https://ra.co/events/2547379"
  ],
  "noLogo": "2026-10-28"
 },
 "Rhiz": {
  "src": [
   "https://ra.co/events/2563381",
   "https://rhiz.wien/blog/"
  ],
  "logo": "https://rhiz.wien/wp-content/uploads/2026/01/cropped-favicon-270x270.png"
 },
 "kv.r.": {
  "src": [
   "https://ra.co/events/2564492"
  ],
  "noLogo": "2026-10-28"
 },
 "Kollektiv Kaorle": {
  "src": [
   "https://ra.co/events/2555979"
  ],
  "noLogo": "2026-10-28"
 },
 "Westbahn Studios": {
  "src": [
   "https://ra.co/events/2568237"
  ],
  "noLogo": "2026-10-28"
 },
 "Prater Dome": {
  "src": [
   "https://ra.co/events/2546243"
  ],
  "noLogo": "2026-10-28"
 },
 "Altia Skybar – DC Tower": {
  "src": [
   "https://ra.co/events/2560557"
  ]
 }
};
/* LS = Logo-Suche ohne Treffer für Locations (v) / Kollektive (c) ohne VI-/CI-Eintrag: Datum der letzten Suche; frühestens 60 Tage danach erneut suchen. */
const LS={
 "v": {
  "B72": "2026-10-28",
  "Metastadt": "2026-10-28"
 },
 "c": {
  "SIGNAL": "2026-10-28",
  "Callshop Radio": "2026-10-28",
  "Schrödingers Groove": "2026-10-28",
  "Housetiere": "2026-10-28",
  "AWSM": "2026-10-28",
  "Step Forward": "2026-10-28",
  "Tasteless": "2026-10-28",
  "euphonic records": "2026-10-28",
  "Klub Halal": "2026-10-28",
  "KARTELL.FM": "2026-10-28",
  "Radio Rudina": "2026-10-28",
  "Connecting People": "2026-10-28",
  "KSOT": "2026-10-28",
  "Spumante Records": "2026-10-28",
  "sama recordings": "2026-10-28"
 }
};
const AR={
 "Tanzfuchs": {
  "img": "https://i1.sndcdn.com/avatars-QYMONy0tWsOrqkHQ-XuPyMg-t500x500.jpg",
  "links": {
   "sc": "https://soundcloud.com/tnzfx"
  },
  "src": [
   "https://soundcloud.com/tnzfx"
  ]
 },
 "SHOKI287": {
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "genres": [
   "Techno",
   "Trance"
  ],
  "bio": {
   "de": "Spielt schnellen Techno mit Trance-Passagen und treibenden Remixen ihrer eigenen Rap-Releases.",
   "en": "Plays fast techno with trance passages and driving remixes of her own rap releases."
  },
  "clubs": [
   "ÆDEN",
   "Lehmann Club",
   "Schrotty",
   "DNA Club",
   "Nordstern"
  ],
  "links": {
   "sc": "https://soundcloud.com/shoki287",
   "ig": "https://www.instagram.com/shoki287",
   "ra": "https://ra.co/dj/shoki287"
  },
  "sets": [
   {
    "t": "SHOKI287 @ HIVE Festival 2026 – Sunrise Set, Groove Beach",
    "u": "https://soundcloud.com/shoki287/shoki287xhive-festival-2026"
   },
   {
    "t": "MITMIXEN 041 – SHOKI287",
    "u": "https://soundcloud.com/mitmischenberlin/mitmixen-042-shoki287"
   },
   {
    "t": "GROOVE Podcast 507",
    "u": "https://groove.de/2026/06/17/groove-podcast-507-shoki287/"
   }
  ],
  "src": [
   "https://ra.co/dj/shoki287",
   "https://ra.co/events/2548751"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/shoki287.jpg?dateUpdated=1773759548623",
  "linksOk": "2026-10-29"
 },
 "Toobris": {
  "from": {
   "de": "Deutschland (Berlin, München, Stuttgart)",
   "en": "Germany (Berlin, Munich, Stuttgart)"
  },
  "real": "Lennard Miessner",
  "genres": [
   "Techno"
  ],
  "bio": {
   "de": "Groovige Basslines, knackige Hi-Hats und viel Percussion.",
   "en": "Bouncing basslines, crisp hi-hats and rich percussion."
  },
  "labels": [
   "Key Vinyl",
   "Hayes"
  ],
  "clubs": [
   "Rote Sonne",
   "RSO.BERLIN",
   "RADION"
  ],
  "links": {
   "sc": "https://soundcloud.com/toobris",
   "ig": "https://www.instagram.com/toobris",
   "ra": "https://ra.co/dj/toobris"
  },
  "src": [
   "https://ra.co/dj/toobris",
   "https://ra.co/events/2562101",
   "https://ra.co/dj/toobris/biography"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/toobris.jpg?dateUpdated=1773834624983",
  "linksOk": "2026-10-29"
 },
 "Alex TB": {
  "from": {
   "de": "Brasilien, lebt in Portugal",
   "en": "Brazil, based in Portugal"
  },
  "real": "Alex Rodrigues",
  "genres": [
   "Hardtechno"
  ],
  "bio": {
   "de": "Seit 1996 im Underground aktiv, eine der beständigsten Figuren im Hardtechno.",
   "en": "Active in the underground since 1996, one of hard techno's most enduring names."
  },
  "labels": [
   "AudioCode Records",
   "Standbite Music",
   "Intuition Recordings",
   "Hardwork Records"
  ],
  "clubs": [
   "Lago",
   "NADA Lisbon"
  ],
  "links": {
   "sc": "https://soundcloud.com/alextb",
   "bc": "https://alextb.bandcamp.com",
   "ig": "https://www.instagram.com/djalextb",
   "ra": "https://ra.co/dj/alextb"
  },
  "src": [
   "https://ra.co/dj/alextb",
   "https://ra.co/dj/alextb/biography"
  ],
  "sets": [
   {
    "t": "ALEX TB @ Techno Route – 25 Years of Techno",
    "u": "https://soundcloud.com/alextb/alextbtr25years"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/alextb.jpg?dateUpdated=1784616828837",
  "linksOk": "2026-10-29"
 },
 "Camion Bazar": {
  "from": {
   "de": "Paris, Frankreich",
   "en": "Paris, France"
  },
  "genres": [
   "House",
   "Disco",
   "Electro"
  ],
  "bio": {
   "de": "Pariser Duo aus Benedetta und Romain Play mit hybriden Vinyl-DJ-Sets; die beiden betreiben das Label Enemy Dance und die Partyreihe VOLTAGE.",
   "en": "Paris-based duo of Benedetta and Romain Play playing hybrid vinyl DJ sets; they run the Enemy Dance label and the VOLTAGE parties."
  },
  "labels": [
   "Enemy Dance",
   "Jaki Records"
  ],
  "clubs": [
   "Le Sucre",
   "Rex Club",
   "Cabaret Sauvage",
   "La Machine du Moulin Rouge"
  ],
  "links": {
   "sc": "https://soundcloud.com/camionbazar",
   "bc": "https://camionbazar.bandcamp.com",
   "ig": "https://www.instagram.com/camionbazar",
   "ra": "https://ra.co/dj/camionbazar"
  },
  "sets": [
   {
    "t": "RA Mix of the Day",
    "u": "https://ra.co/news/81033"
   }
  ],
  "src": [
   "https://ra.co/dj/camionbazar"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/camionbazar.jpg?dateUpdated=1775037201830",
  "linksOk": "2026-10-29"
 },
 "Franziska Berns": {
  "from": {
   "de": "Deutschland (Frankfurt)",
   "en": "Germany (Frankfurt)"
  },
  "genres": [
   "Techno",
   "House"
  ],
  "bio": {
   "de": "Resident im Robert Johnson, Techno mit funky Kante.",
   "en": "Robert Johnson resident, techno with a funky edge."
  },
  "clubs": [
   "Robert Johnson",
   "Tanzhaus West",
   "Berghain / Panorama Bar",
   "Dora Brilliant"
  ],
  "links": {
   "sc": "https://soundcloud.com/franziskaberns",
   "ra": "https://ra.co/dj/franziskaberns-de"
  },
  "sets": [
   {
    "t": "RA Mix of the Day",
    "u": "https://ra.co/news/51785"
   }
  ],
  "src": [
   "https://ra.co/dj/franziskaberns-de"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/franziskaberns-de.jpg?dateUpdated=1757516850293",
  "linksOk": "2026-10-29"
 },
 "Chata": {
  "from": {
   "de": "Tiflis, Georgien, lebt in Prag",
   "en": "Tbilisi, Georgia, based in Prague"
  },
  "genres": [
   "House",
   "Dub Techno"
  ],
  "bio": {
   "de": "Dubbige, groovige Basslines, Sets aus Platten und eigenen Produktionen.",
   "en": "Dubby, groovy basslines, sets mixing records with his own productions."
  },
  "clubs": [
   "Groove Bar",
   "Ankali"
  ],
  "links": {
   "sc": "https://soundcloud.com/chatach",
   "bc": "https://chata.bandcamp.com",
   "ra": "https://ra.co/dj/chata"
  },
  "src": [
   "https://ra.co/dj/chata",
   "https://ra.co/events/2554895"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/chata.jpg?dateUpdated=1778180818203",
  "linksOk": "2026-10-29"
 },
 "Massimiliano Pagliara": {
  "from": {
   "de": "Tricase, Italien, lebt in Berlin",
   "en": "Tricase, Italy, based in Berlin"
  },
  "genres": [
   "House",
   "Techno",
   "Electro",
   "Disco"
  ],
  "bio": {
   "de": "Langjähriger Resident in Berghain und Panorama Bar, bekannt für theatralische, erzählende Sets.",
   "en": "Long-time Berghain and Panorama Bar resident, known for theatrical, narrative sets."
  },
  "labels": [
   "Ostgut Ton",
   "Live at Robert Johnson",
   "Permanent Vacation",
   "Funnuvojere"
  ],
  "clubs": [
   "Berghain",
   "Panorama Bar",
   "Basement",
   "Romantica"
  ],
  "links": {
   "ra": "https://ra.co/dj/massimilianopagliara",
   "bc": "https://massimilianopagliara.bandcamp.com",
   "sc": "https://soundcloud.com/massimilianopagliara"
  },
  "src": [
   "https://en.wikipedia.org/wiki/Massimiliano_Pagliara",
   "https://ra.co/dj/massimilianopagliara",
   "https://ra.co/dj/massimilianopagliara/editorial"
  ],
  "img": "https://static.ra.co/images/profiles/square/massimilianopagliara.jpg?dateUpdated=1753197880990",
  "linksOk": "2026-10-29"
 },
 "MIJA": {
  "from": {
   "de": "Phoenix, USA, lebt in Los Angeles",
   "en": "Phoenix, USA, based in Los Angeles"
  },
  "real": "Amber Giles",
  "genres": [
   "House",
   "Techno",
   "Hardgroove"
  ],
  "bio": {
   "de": "Gründerin des Labels Never B Alone und der Reihe „Fk A Genre“.",
   "en": "Founder of the Never B Alone label and the \"Fk A Genre\" series."
  },
  "labels": [
   "Never B Alone",
   "Owsla",
   "Fool's Gold"
  ],
  "festivals": [
   "Coachella",
   "Bonnaroo",
   "Burning Man",
   "HARD Summer"
  ],
  "links": {
   "web": "https://www.hi-mija.com"
  },
  "src": [
   "https://en.wikipedia.org/wiki/Mija_(DJ)"
  ]
 },
 "Prada2000": {
  "from": {
   "de": "Berlin, Deutschland",
   "en": "Berlin, Germany"
  },
  "genres": [
   "Hard Trance",
   "Hard House",
   "Hardtechno",
   "Hard Techno"
  ],
  "labels": [
   "240KM/H",
   "44 Label Group",
   "240 KM/H",
   "R Label Group"
  ],
  "clubs": [
   "Gotec (Resident)",
   "Gotec",
   "Lokschuppen Berlin",
   "OST",
   "Lehmann Club",
   "Bootshaus"
  ],
  "festivals": [
   "SonneMondSterne",
   "Parookaville",
   "Sea You",
   "Terminal V",
   "Dreambeach"
  ],
  "tracks": [
   "Endless Illusions",
   "Summer2k",
   "DO U LUV ME",
   "F1 Screech Club",
   "Dramacore"
  ],
  "links": {
   "sc": "https://soundcloud.com/prada2000",
   "sp": "https://open.spotify.com/artist/3IFQLbStnxyOJ5g4TEDrRm",
   "bc": "https://prada2000.bandcamp.com",
   "ig": "https://instagram.com/prada2000",
   "ra": "https://ra.co/dj/prada2000",
   "web": "https://polyamor.agency/11/"
  },
  "src": [
   "https://www.technoairlines.com/artist/prada2000",
   "https://de.ra.co/dj/prada2000",
   "https://de.ra.co/dj/prada2000/biography",
   "https://240kmh.bandcamp.com/track/prada2000-f1-screech-club",
   "https://soundcloud.com/prada2000/dramacore"
  ],
  "sets": [
   {
    "t": "PRADA2000 – No Mercy (DJ Set)",
    "u": "https://soundcloud.com/prada2000/n-o-m-e-r-c-y-dj-set"
   },
   {
    "t": "PRADA2000 @ HÖR Berlin (29.05.2024)",
    "u": "https://soundcloud.com/prada2000/prada2000-hor-may-29-2024"
   }
  ],
  "setsChecked": "2026-10-27",
  "bio": {
   "de": "PRADA2000 ist ein in Berlin ansässiger DJ und Produzent, den Resident Advisor als aufstrebenden Namen auf der internationalen Bühne beschreibt. Seine energiegeladenen Sets verbinden euphorische Melodien, verspielte Vocals und druckvollen Bass – schnell, spaßig und emotional.",
   "en": "PRADA2000 is a Berlin-based DJ and producer described by Resident Advisor as a rising name on the international stage. His energetic sets blend uplifting melodies, playful vocals and punchy bass – fast, fun and emotional."
  }
 },
 "Afem Syko": {
  "from": {
   "de": "Berlin, Deutschland",
   "en": "Berlin, Germany"
  },
  "genres": [
   "Techno",
   "Acid"
  ],
  "bio": {
   "de": "Hypnotischer Techno, Acid und Oldschool.",
   "en": "Hypnotic techno, acid and old school."
  },
  "links": {
   "sc": "https://soundcloud.com/afemsyko",
   "ra": "https://ra.co/dj/afemsyko"
  },
  "src": [
   "https://www.bandsintown.com/a/15539785-afem-syko",
   "https://ra.co/dj/afemsyko"
  ],
  "sets": [
   {
    "t": "Afem Syko @ Gotec Club (2h bouncy)",
    "u": "https://soundcloud.com/afemsyko/afem-syko-gotec-club-2h-bouncy"
   },
   {
    "t": "Afem Syko [All Night Long] @ DNA Club – Part 1",
    "u": "https://soundcloud.com/afemsyko/afem-syko-all-night-long-dna-club-part-one"
   }
  ],
  "setsChecked": "2026-10-27",
  "linksOk": "2026-10-29"
 },
 "Lisa Korver": {
  "from": {
   "de": "Niederlande (Booking: Phase, Amsterdam)",
   "en": "Netherlands (booking: Phase, Amsterdam)"
  },
  "genres": [
   "Techno",
   "Latin Core",
   "Hard House",
   "Hardgroove",
   "Trance"
  ],
  "festivals": [
   "Lowlands",
   "Into the Woods",
   "Mysteryland",
   "Glitch Festival",
   "Soenda"
  ],
  "links": {
   "sc": "https://soundcloud.com/lisakorver",
   "bc": "https://lisakorver.bandcamp.com",
   "ig": "https://www.instagram.com/lisakorver_/",
   "ra": "https://ra.co/dj/lisakorver"
  },
  "sets": [
   {
    "t": "Lisa Korver @ Lowlands, Het Magazijn",
    "u": "https://soundcloud.com/lisakorver/lisa-korver-lowlands-het"
   },
   {
    "t": "Lisa Korver – Focal",
    "u": "https://soundcloud.com/lisakorver/lisa-korver-focal-extended-mix"
   }
  ],
  "src": [
   "https://m.soundcloud.com/lisakorver",
   "https://ra.co/dj/lisakorver",
   "https://ra.co/dj/lisakorver/biography",
   "https://www.phase.amsterdam/artists/lisa-korver",
   "https://set79.com/dj/Lisa%20Korver"
  ],
  "setsChecked": "2026-10-27",
  "bio": {
   "de": "Lisa Korver ist eine niederländische DJ und Produzentin, die sich zwischen Latin Core, Hard House und Hardgroove bewegt – Hauptsache, es groovt unwiderstehlich. Ihre Solo-Shows in Clubs wie Thuishaven und BASIS waren binnen Stunden ausverkauft, dazu kommen Auftritte bei Lowlands, Into the Woods und Mysteryland.",
   "en": "Lisa Korver is a Dutch DJ and producer moving between Latin core, hard house and hardgroove – as long as it has an undeniable groove. Her solo shows at Thuishaven and BASIS sold out within hours, alongside sets at Lowlands, Into the Woods and Mysteryland."
  },
  "labels": [
   "CURV"
  ],
  "clubs": [
   "Thuishaven",
   "BASIS",
   "Het Sieraad",
   "TivoliVredenburg",
   "Maassilo"
  ],
  "tracks": [
   "Dale Duro",
   "Like That",
   "Focal",
   "Tacatá",
   "Teke Teke",
   "Picante"
  ],
  "linksOk": "2026-10-29"
 },
 "Josefina Tapia": {
  "from": {
   "de": "Chile",
   "en": "Chile"
  },
  "genres": [
   "House",
   "Minimal",
   "Broken Beat",
   "Electro"
  ],
  "bio": {
   "de": "Verbindet klassischen amerikanischen House mit europäischem Minimalismus.",
   "en": "Blends classic American house with European minimalism."
  },
  "links": {
   "ra": "https://ra.co/dj/josefinatapia-2"
  },
  "src": [
   "https://ra.co/events/2484590",
   "https://ra.co/dj/josefinatapia-2"
  ],
  "linksOk": "2026-10-29"
 },
 "DJ Marky": {
  "from": {
   "de": "São Paulo, Brasilien",
   "en": "São Paulo, Brazil"
  },
  "real": "Marco Antonio da Silva",
  "genres": [
   "Drum & Bass",
   "Liquid Funk"
  ],
  "bio": {
   "de": "Prägte den brasilianischen Drum-&-Bass-Sound, bekannt für „LK (Carolina Carol Bela)“.",
   "en": "Shaped the Brazilian drum & bass sound, known for \"LK (Carolina Carol Bela)\"."
  },
  "labels": [
   "Innerground Records",
   "Shogun Audio"
  ],
  "clubs": [
   "fabric (Fabriclive 55)"
  ],
  "festivals": [
   "Lovebox",
   "Notting Hill Carnival"
  ],
  "tracks": [
   "LK (Carolina Carol Bela)",
   "The Brazilian Job",
   "Mystic Sunset"
  ],
  "links": {},
  "src": [
   "https://en.wikipedia.org/wiki/DJ_Marky",
   "https://www.technoairlines.com/artist/dj-marky"
  ]
 },
 "Mijk van Dijk": {
  "from": {
   "de": "Berlin (geboren in Geesthacht)",
   "en": "Berlin (born in Geesthacht)"
  },
  "real": "Michael van den Nieuwendijk",
  "genres": [
   "Techno",
   "Trance",
   "House"
  ],
  "bio": {
   "de": "Pionier des Berliner Techno (Tresor, E-Werk, Loveparade), Hymne „Schöneberg“.",
   "en": "Pioneer of Berlin techno (Tresor, E-Werk, Loveparade), anthem \"Schöneberg\"."
  },
  "clubs": [
   "Tresor",
   "E-Werk"
  ],
  "festivals": [
   "Loveparade"
  ],
  "links": {
   "sc": "https://soundcloud.com/mijk",
   "ig": "https://www.instagram.com/mijk_van_dijk",
   "web": "http://www.microglobe.de",
   "ra": "https://ra.co/dj/mijkvandijk"
  },
  "src": [
   "https://en.wikipedia.org/wiki/Mijk_van_Dijk",
   "https://ra.co/events/2559561",
   "https://ra.co/dj/mijkvandijk"
  ],
  "sets": [
   {
    "t": "Mijk in Japan, Part 2 (Alex.TV 2025)",
    "u": "https://soundcloud.com/mijk/dj_mix_mvd_japan"
   },
   {
    "t": "DJ Mijk van Dijk @ Wooferland (31.08.2024)",
    "u": "https://soundcloud.com/mijk/dj-mijk-van-dijk-at-wooferland-2024-08-31"
   }
  ],
  "setsChecked": "2026-10-28",
  "img": "https://static.ra.co/images/profiles/square/mijkvandijk.jpg?dateUpdated=1606694400000",
  "linksOk": "2026-10-29"
 },
 "Sam Paganini": {
  "from": {
   "de": "Treviso, Italien",
   "en": "Treviso, Italy"
  },
  "genres": [
   "Techno"
  ],
  "bio": {
   "de": "Bekannt für „Zoe“ (1997) und „Rave“, Debütalbum „Satellite“ auf Drumcode.",
   "en": "Known for \"Zoe\" (1997) and \"Rave\", debut album \"Satellite\" on Drumcode."
  },
  "labels": [
   "Drumcode",
   "Cocoon",
   "Plus 8"
  ],
  "tracks": [
   "Rave",
   "Zoe"
  ],
  "links": {
   "sc": "https://soundcloud.com/sam_paganini",
   "web": "https://sampaganini.com"
  },
  "src": [
   "https://en.wikipedia.org/wiki/Sam_Paganini",
   "https://ra.co/dj/sampaganini"
  ],
  "sets": [
   {
    "t": "Sam Paganini @ Input Barcelona (01.02.2025)",
    "u": "https://soundcloud.com/sam_paganini/sam-paganini-input-barcelona-2022025"
   },
   {
    "t": "Sam Paganini @ NATURE ONE – Live Set",
    "u": "https://soundcloud.com/official-nature-one/sam-paganini-nature-one-stay-as-you-are-live-set"
   }
  ],
  "setsChecked": "2026-10-27",
  "linksOk": "2026-10-29"
 },
 "HVOB": {
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "real": "Anna Müller & Paul Wallner",
  "genres": [
   "Electronica",
   "Deep House",
   "Live"
  ],
  "bio": {
   "de": "Wiener Duo (Her Voice Over Boys): Anna Müller komponiert, produziert und singt, Paul Wallner finalisiert die Tracks. Spielt immer live mit Drummer, in über 20 Ländern.",
   "en": "Viennese duo (Her Voice Over Boys): Anna Müller writes, produces and sings, Paul Wallner finishes the tracks. Always plays live with a drummer, in more than 20 countries."
  },
  "labels": [
   "Stil vor Talent"
  ],
  "clubs": [
   "Mezzanine San Francisco",
   "Crobar Buenos Aires"
  ],
  "festivals": [
   "Melt!",
   "Fusion",
   "SXSW",
   "Burning Man (Robot Heart, Mayan Warrior)"
  ],
  "tracks": [
   "Dogs",
   "Ghost",
   "Azrael",
   "Window",
   "Always Like This",
   "Bruise"
  ],
  "links": {
   "sc": "https://soundcloud.com/hvob",
   "sp": "https://open.spotify.com/artist/6RAx8RRxoHeJIqD2d0EjOa"
  },
  "sets": [
   {
    "t": "HVOB live @ Mayan Warrior, Burning Man 2024",
    "u": "https://soundcloud.com/mayanwarriorofficial/hvob-live-mayan-warrior-burning-man-2024"
   },
   {
    "t": "HVOB – Robot Heart, Burning Man 2016",
    "u": "https://soundcloud.com/robot-heart/hvob-robot-heart-burning-man-2016"
   },
   {
    "t": "HVOB – Azrael",
    "u": "https://soundcloud.com/thump/hvob-azrael"
   }
  ],
  "src": [
   "https://en.wikipedia.org/wiki/HVOB",
   "https://www.amsterdam-dance-event.nl/en/artists-speakers/hvob/8877/",
   "https://www.set79.com/dj/HVOB"
  ],
  "setsChecked": "2026-10-27"
 },
 "Oberst & Buchner": {
  "from": {
   "de": "Wien & Berlin",
   "en": "Vienna & Berlin"
  },
  "genres": [
   "Downtempo",
   "Disco",
   "House",
   "Electronica"
  ],
  "bio": {
   "de": "Duo aus Wien und Berlin, nennt den eigenen Stil „Jetlag Disco“: langsame, organische Grooves bis hypnotischer House.",
   "en": "Vienna/Berlin duo calling their style “jetlag disco”: slow organic grooves up to hypnotic house."
  },
  "labels": [
   "Heimlich Musik"
  ],
  "clubs": [
   "Kater Blau Berlin",
   "Sisyphos Berlin",
   "Renate Berlin",
   "Bahnwärter Thiel München",
   "MS Stubnitz Rostock",
   "Station Endlos",
   "Flamingo Landshut",
   "gART.n",
   "Turbina Budapest",
   "Postgarage Graz",
   "Karrusel Kopenhagen",
   "Pratersauna Wien"
  ],
  "festivals": [
   "Fusion Festival",
   "FM4 Unlimited",
   "Zugvøgel",
   "Bucht der Träumer*",
   "Mystic Creatures",
   "Atoll Amore",
   "Doppelbass",
   "Im Grünen",
   "Nektar",
   "Woodlands",
   "MIT DIR Festival",
   "Komod Festival",
   "Paranormal Paradise",
   "TUMULT",
   "Arche Ahoi"
  ],
  "tracks": [
   "Linger (feat. Mimu, 2025)",
   "Quicksand (feat. Mimu)",
   "Slot Machine (feat. Aydo Abay)",
   "Freie Sicht (feat. Acud)",
   "Tosca – Osam (O&B Remix)",
   "Dina Summer – Uranos (O&B Remix)",
   "Rabih Rizk – Inception (O&B Remix)"
  ],
  "albums": [
   "Marble Arch (2LP, 2022)",
   "Sfumato (2019)"
  ],
  "links": {
   "sc": "https://soundcloud.com/buchneroberst",
   "sp": "https://open.spotify.com/artist/6c6I6loLZeoagmF9nfAXJw",
   "bc": "https://oberstundbuchner.bandcamp.com"
  },
  "sets": [
   {
    "t": "Oberst & Buchner @ Fusion Festival 2026 · Extravaganza",
    "u": "https://soundcloud.com/buchneroberst/oberst-buchner-fusion-festival"
   },
   {
    "t": "Oberst & Buchner @ Kater · Acid Bogen · 17.01.26",
    "u": "https://soundcloud.com/buchneroberst/oberst-buchner-kater-i-acid-bogen-i-170126"
   },
   {
    "t": "FM4 Unlimited presents: Oberst & Buchner DJ Set",
    "u": "https://soundcloud.com/buchneroberst/fm4-unlimited-presents-oberst-buchner-dj-set"
   }
  ],
  "src": [
   "https://dvoxmag.com/oberst-buchner-release-freie-sicht-feat-acud/",
   "https://set79.com/tracklist/soundcloud.com/buchneroberst/oberst-buchner-zugvogel-festival-2021",
   "https://www.set79.com/tracklist/soundcloud.com/buchneroberst/katerb_0002",
   "https://oberstundbuchner.bandcamp.com",
   "https://www.forcedexposure.com/Catalog/HMLLPV.003LP.html",
   "https://open.spotify.com/album/6Magrwlk2H6p1UdR2aXMXn"
  ],
  "coll": [
   "Heimlich"
  ],
  "eps": [
   "Doves EP (2014)",
   "Today I Feel EP"
  ],
  "setsChecked": "2026-10-27"
 },
 "AliasElias": {
  "img": "https://ponyhof-official.at/wp-content/themes/ponyhof/assets/img/jockeys/aliaselias.webp",
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "DJ im Wiener Kollektiv Ponyhof.",
   "en": "DJ with the Viennese collective Ponyhof."
  },
  "coll": [
   "Ponyhof"
  ],
  "links": {
   "sc": "https://soundcloud.com/ponyhof_official",
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27"
 },
 "Benjamin Di Bora": {
  "img": "https://ponyhof-official.at/wp-content/themes/ponyhof/assets/img/jockeys/benjamindibora.webp",
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "DJ im Wiener Kollektiv Ponyhof.",
   "en": "DJ with the Viennese collective Ponyhof."
  },
  "coll": [
   "Ponyhof"
  ],
  "links": {
   "sc": "https://soundcloud.com/ponyhof_official",
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27"
 },
 "Da_Mike": {
  "img": "https://ponyhof-official.at/wp-content/themes/ponyhof/assets/img/jockeys/damike.webp",
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "DJ im Wiener Kollektiv Ponyhof.",
   "en": "DJ with the Viennese collective Ponyhof."
  },
  "coll": [
   "Ponyhof"
  ],
  "links": {
   "sc": "https://soundcloud.com/ponyhof_official",
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27"
 },
 "Megamietzi": {
  "img": "https://ponyhof-official.at/wp-content/themes/ponyhof/assets/img/jockeys/megamietzi.webp",
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "DJ im Wiener Kollektiv Ponyhof.",
   "en": "DJ with the Viennese collective Ponyhof."
  },
  "coll": [
   "Ponyhof"
  ],
  "links": {
   "sc": "https://soundcloud.com/ponyhof_official",
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27"
 },
 "Nira": {
  "img": "https://ponyhof-official.at/wp-content/themes/ponyhof/assets/img/jockeys/nira.webp",
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "DJ im Wiener Kollektiv Ponyhof.",
   "en": "DJ with the Viennese collective Ponyhof."
  },
  "coll": [
   "Ponyhof"
  ],
  "links": {
   "sc": "https://soundcloud.com/ponyhof_official",
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27"
 },
 "Kovinator": {
  "img": "https://ponyhof-official.at/wp-content/themes/ponyhof/assets/img/jockeys/kovinator.webp",
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "DJ im Wiener Kollektiv Ponyhof.",
   "en": "DJ with the Viennese collective Ponyhof."
  },
  "coll": [
   "Ponyhof"
  ],
  "links": {
   "sc": "https://soundcloud.com/ponyhof_official",
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27"
 },
 "Rave Dave": {
  "img": "https://ponyhof-official.at/wp-content/themes/ponyhof/assets/img/jockeys/ravedave.webp",
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "DJ im Wiener Kollektiv Ponyhof.",
   "en": "DJ with the Viennese collective Ponyhof."
  },
  "coll": [
   "Ponyhof"
  ],
  "links": {
   "sc": "https://soundcloud.com/ponyhof_official",
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27"
 },
 "Feni": {
  "img": "https://ponyhof-official.at/wp-content/themes/ponyhof/assets/img/jockeys/feni.webp",
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "DJ im Wiener Kollektiv Ponyhof.",
   "en": "DJ with the Viennese collective Ponyhof."
  },
  "coll": [
   "Ponyhof"
  ],
  "links": {
   "sc": "https://soundcloud.com/ponyhof_official",
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27"
 },
 "Kormos": {
  "links": {
   "sc": "https://soundcloud.com/kormosvie",
   "ig": "https://www.instagram.com/kormosvie",
   "web": "https://linktr.ee/kormos",
   "ra": "https://ra.co/dj/kormos"
  },
  "src": [
   "https://ra.co/dj/kormos",
   "https://ra.co/dj/kormos/biography",
   "https://yoyaku.io/release/kormos-jesus-genius-uber-zyklop001/",
   "https://zyklopaudio.bandcamp.com/"
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Wien (geboren in der Türkei)",
   "en": "Vienna (born in Turkey)"
  },
  "real": "Arda Eren Guner",
  "genres": [
   "Minimal House",
   "Disco"
  ],
  "bio": {
   "de": "Kormos ist ein Wiener DJ, Produzent und Labelchef; sein Name stammt von einem Geist aus der alttürkischen Folklore. Seit 2018 produziert er elektronische Musik und gründete 2025 das Vinyl-Label Zyklop Audio. Seine Sets verbinden Minimal House mit psychedelischer Note und Disco-Einflüssen – hypnotisch und trippy.",
   "en": "Kormos is a Vienna-based DJ, producer and label head whose name comes from a ghost in ancient Turkish folklore. He has made electronic music since 2018 and founded the vinyl label Zyklop Audio in 2025. His sets mix minimal house with a psychedelic edge and disco touches – hypnotic and trippy."
  },
  "labels": [
   "Zyklop Audio",
   "Belly Dance Services",
   "duniamusik",
   "disskorienta",
   "Cafe De Anatolia",
   "Camel Vip Records",
   "Verzila"
  ],
  "eps": [
   "Uber (2026)"
  ],
  "clubs": [
   "SASS Music Club",
   "Der Ponyhof",
   "FLUCC"
  ],
  "img": "https://static.ra.co/images/profiles/square/kormos.jpg?dateUpdated=1784030459210",
  "linksOk": "2026-10-29"
 },
 "Anna Ullrich": {
  "links": {
   "sc": "https://soundcloud.com/annaullrich",
   "ig": "https://www.instagram.com/annaullrich",
   "ra": "https://ra.co/dj/annaullrich"
  },
  "src": [
   "https://de.ra.co/dj/annaullrich",
   "https://www.reeperbahnfestival.com/en/act/anna-ullrich",
   "https://ra.co/dj/annaullrich"
  ],
  "sets": [
   {
    "t": "BAM-C: Anna Ullrich – Livemix (Pratersauna)",
    "u": "https://soundcloud.com/annaullrich/bam-c-anna-ullrich-pratersauna-livestream"
   },
   {
    "t": "Anna Ullrich – Mixtape #6",
    "u": "https://soundcloud.com/annaullrich/anna-ullrich-mixtape-6"
   }
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "genres": [
   "Techno",
   "Trance",
   "Minimal Techno"
  ],
  "bio": {
   "de": "Anna Ullrich ist eine Wiener DJ und Produzentin, die 90er-inspirierten Trance mit minimalistischem Techno verbindet. Neben Clubs wie PRST, Club Exil, Grelle Forelle und SASS spielte sie u. a. beim Reeperbahn Festival in Hamburg.",
   "en": "Anna Ullrich is a Viennese DJ and producer blending 90s-inspired trance with minimalist techno. Besides clubs such as PRST, Club Exil, Grelle Forelle and SASS, she has played Hamburg's Reeperbahn Festival."
  },
  "clubs": [
   "PRST",
   "Club Exil",
   "Grelle Forelle",
   "SASS Music Club"
  ],
  "festivals": [
   "Reeperbahn Festival"
  ],
  "tracks": [
   "Wir haben Spaß und ihr nicht (2023)",
   "Sommernacht (2024)",
   "If I Could (2025)"
  ],
  "img": "https://static.ra.co/images/profiles/square/annaullrich.jpg?dateUpdated=1730818382000",
  "linksOk": "2026-10-29"
 },
 "pengg": {
  "links": {
   "ig": "https://www.instagram.com/prodbypengg",
   "ra": "https://ra.co/dj/pengg"
  },
  "src": [
   "https://ra.co/dj/pengg"
  ],
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "pengg (Instagram: prodbypengg) ist in Österreich ansässig; das erste Event auf Resident Advisor war 2025, gespielt wurde bisher vor allem im PRST.",
   "en": "pengg (Instagram: prodbypengg) is based in Austria; the first event on Resident Advisor was in 2025, mostly playing PRST so far."
  },
  "clubs": [
   "PRST"
  ],
  "img": "https://static.ra.co/images/profiles/square/pengg.jpg?dateUpdated=1786628552000",
  "linksOk": "2026-10-29"
 },
 "Paul Mile": {
  "links": {
   "sc": "https://soundcloud.com/paulmilemusic",
   "ig": "https://www.instagram.com/paulmilemusic",
   "bc": "https://paulmilemusic.bandcamp.com",
   "ra": "https://ra.co/dj/paulmile"
  },
  "src": [
   "https://ra.co/dj/paulmile",
   "https://ra.co/dj/paulmile/biography"
  ],
  "sets": [
   {
    "t": "Paul Mile @ Sunside Festival 04/05/2024",
    "u": "https://soundcloud.com/paulmilemusic/paul-mile-sunside-festival-04052024"
   },
   {
    "t": "Paul Mile @ SASS // Donnerstag Nacht 19/01/2023",
    "u": "https://soundcloud.com/paulmilemusic/paul-mile-sass-donnerstag-nacht-19012023"
   }
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Paul Untner",
  "genres": [
   "Hardgroove",
   "House",
   "UK Garage"
  ],
  "bio": {
   "de": "Paul Mile bringt seit fast einem Jahrzehnt Wiener Dancefloors zum Kochen – mit treibenden Sets aus Hardgroove, House und UKG und überraschenden Track-Auswahlen. Seine Wurzeln liegen in härteren Stilen; über das Kollektiv Soundlabs hat er sich in der Wiener Szene etabliert.",
   "en": "Paul Mile has been igniting Vienna's dancefloors for nearly a decade with driving hardgroove, house and UKG sets and unexpected track selections. His roots lie in harder styles, and he built his profile in Vienna through the Soundlabs collective."
  },
  "clubs": [
   "PRST",
   "SASS Music Club",
   "Pratersauna",
   "FLUCC",
   "Gleis19"
  ],
  "img": "https://static.ra.co/images/profiles/square/paulmile.jpg?dateUpdated=1743382326000",
  "linksOk": "2026-10-29"
 },
 "Telicho": {
  "links": {
   "sc": "https://soundcloud.com/linn-a-sophie-wallner",
   "ra": "https://ra.co/dj/telicho"
  },
  "src": [
   "https://ra.co/dj/telicho",
   "https://www.vmi.at/post/interview-with-telicho",
   "https://soundcharts.com/fr/artist/8a9e2e53-3216-4125-b18d-c7239975b5e2"
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Linnéa Wallner",
  "genres": [
   "Techno"
  ],
  "bio": {
   "de": "TELICHO – ein Mix aus „Techno“ und ihrem Vornamen Linn – ist eine Wiener DJ, Produzentin und Veranstalterin, bekannt für energiegeladene Sets mit vielschichtigen, treibenden Grooves. Sie kam von Singer-Songwriter und Rock/Pop mit 16 zur elektronischen Musik und gründete die Eventreihe „Back to Underground“.",
   "en": "TELICHO – a blend of 'techno' and her first name Linn – is a Vienna-based DJ, producer and event organiser known for high-energy sets with layered, driving grooves. She came to electronic music at 16 from singer-songwriter and rock/pop, and founded the event series 'Back to Underground'."
  },
  "labels": [
   "Say What? Recordings",
   "Schimmer Records",
   "Splatter Imprint",
   "Subhills",
   "BCCO",
   "Nine O Nine",
   "DYS Records"
  ],
  "clubs": [
   "Grelle Forelle",
   "Das Werk",
   "Postgarage",
   "Himmel und Wasser",
   "Soda Club"
  ],
  "festivals": [
   "Rave on Snow"
  ],
  "tracks": [
   "Distance",
   "Talk to Me",
   "Revolt In Four Four",
   "Call And Response",
   "One Take On Wax"
  ],
  "img": "https://static.ra.co/images/profiles/square/telicho.jpg?dateUpdated=1776777106873",
  "linksOk": "2026-10-29"
 },
 "ENJA": {
  "links": {
   "sc": "https://soundcloud.com/3nja",
   "ra": "https://ra.co/dj/enja"
  },
  "src": [
   "https://it.ra.co/dj/enja",
   "https://ra.co/dj/enja/biography",
   "https://de.ra.co/dj/enja"
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Westösterreich",
   "en": "Western Austria"
  },
  "genres": [
   "Trance",
   "Techno",
   "Hardgroove",
   "Gabber"
  ],
  "bio": {
   "de": "ENJA stammt aus Westösterreich und spielt Trance und Techno zwischen 140 und 160 BPM, gespickt mit Popkultur-Referenzen und gelegentlich Hardgroove oder Gabber. Ihr Debüt gab sie im Februar 2024 bei CYBERTRIBE im Rauch Club Feldkirch; inzwischen spielt sie regelmäßig in Wien.",
   "en": "ENJA hails from western Austria and plays trance and techno at 140–160 BPM, peppered with pop-culture references and the occasional hardgroove or gabber track. She debuted at CYBERTRIBE in Rauch Club, Feldkirch, in February 2024 and now plays regularly in Vienna."
  },
  "clubs": [
   "Market33",
   "Rauch Club",
   "The Loft",
   "Vakanz",
   "PRST"
  ]
 },
 "Jorkes": {
  "links": {
   "sc": "https://soundcloud.com/jorkes",
   "ig": "https://www.instagram.com/jorkes0",
   "ra": "https://ra.co/dj/jorkes"
  },
  "src": [
   "https://ra.co/dj/jorkes",
   "https://it.ra.co/dj/jorkes"
  ],
  "sets": [
   {
    "t": "The Sound Of: Freeride Millenium, mixed by Jorkes & ParisBöhm (DJ Mag)",
    "u": "https://soundcloud.com/djmag/the-sound-of-freeride-millenium-mixed-by-jorkes-paris-bohm"
   },
   {
    "t": "C.O.R. Guest Mix 0024 – DJ Florian Böhm & Jorkes",
    "u": "https://soundcloud.com/chambersofreflection/cor-guest-mix-0024-dj-florian-bohm-jorkes"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/jorkes.jpg?dateUpdated=1783496049370",
  "linksOk": "2026-10-29"
 },
 "Artifex (DE)": {
  "links": {
   "sc": "https://soundcloud.com/artifex_wav",
   "ig": "https://www.instagram.com/artifex.x_"
  },
  "src": [
   "https://de.ra.co/dj/artifex-2"
  ],
  "setsChecked": "2026-10-27"
 },
 "Trugbild": {
  "links": {
   "sc": "https://soundcloud.com/dastrugbild",
   "bc": "https://trugbild.bandcamp.com",
   "ra": "https://ra.co/dj/trugbild"
  },
  "src": [
   "https://de.ra.co/dj/trugbild",
   "https://trugbild.bandcamp.com",
   "https://es.ra.co/dj/trugbild"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://f4.bcbits.com/img/0032193901_21.jpg",
  "linksOk": "2026-10-29"
 },
 "Lorenzo Raganzini": {
  "links": {
   "sc": "https://soundcloud.com/lorenzoraganzini",
   "ig": "https://www.instagram.com/lorenzoraganzini",
   "web": "http://lorenzoraganzini.komi.io",
   "sp": "https://open.spotify.com/artist/0bvhASdLuh4STSJPxMjjSo",
   "ra": "https://ra.co/dj/lorenzo-es"
  },
  "src": [
   "https://ra.co/dj/lorenzo-es",
   "https://open.spotify.com/artist/0bvhASdLuh4STSJPxMjjSo"
  ],
  "sets": [
   {
    "t": "Lorenzo Raganzini @ Sound Waves Festival 2025",
    "u": "https://soundcloud.com/lorenzoraganzini/lorenzo-raganzini-youtube-video-set-sound-waves-festival-2025"
   },
   {
    "t": "Lorenzo Raganzini @ Arzenal Budapest x Uncertain Events (Juni 2025)",
    "u": "https://soundcloud.com/lorenzoraganzini/lorenzo-raganzini-arzenal-budapest-x-uncertain-events-june-2025"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://i.scdn.co/image/ab6761610000e5eb9da6e147cc195d4d97fd61c5",
  "linksOk": "2026-10-29"
 },
 "Dj Wifi": {
  "links": {
   "sc": "https://soundcloud.com/djwifiworld",
   "ig": "https://www.instagram.com/djwifi.mp3/",
   "bc": "https://djwifi.bandcamp.com",
   "ra": "https://ra.co/dj/djwifi"
  },
  "src": [
   "https://ra.co/dj/djwifi"
  ],
  "sets": [
   {
    "t": "The Vibe – Warehouse Rave Mix",
    "u": "https://soundcloud.com/djwifiworld/thevibe"
   },
   {
    "t": "ENERGY MIX",
    "u": "https://soundcloud.com/djwifiworld/energymix"
   }
  ],
  "setsChecked": "2026-10-27",
  "noImg": "2026-10-28",
  "linksOk": "2026-10-29"
 },
 "Neon Graveyard": {
  "links": {
   "sc": "https://soundcloud.com/noisesbyneongraveyard",
   "ra": "https://ra.co/dj/neongraveyard"
  },
  "src": [
   "https://de.ra.co/dj/neongraveyard",
   "https://ra.co/dj/neongraveyard"
  ],
  "sets": [
   {
    "t": "Neon Graveyard @ Gotec Club – 12h Schranz Set",
    "u": "https://soundcloud.com/gotec76/neon-graveyard-main-floor-gotec-club-1-12h-schranz-set"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/neongraveyard.jpg?dateUpdated=1647614393547",
  "linksOk": "2026-10-29"
 },
 "Stratera": {
  "links": {
   "sc": "https://soundcloud.com/realstratera",
   "ra": "https://ra.co/dj/stratera"
  },
  "src": [
   "https://ra.co/dj/stratera"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/stratera.jpg?dateUpdated=1770845938507",
  "linksOk": "2026-10-29"
 },
 "Tezibel": {
  "links": {
   "sc": "https://soundcloud.com/tezibel",
   "bc": "https://tezibel.bandcamp.com",
   "ra": "https://ra.co/dj/tezibel"
  },
  "src": [
   "https://de.ra.co/dj/tezibel"
  ],
  "sets": [
   {
    "t": "REDIVIDER #29 – DJ Deadlift & TEZIBEL @ Grelle Forelle",
    "u": "https://soundcloud.com/redividervienna/redivider-29-dj-deadlift-tezibel-at-grelle-forelle"
   },
   {
    "t": "Fat Burner Mix",
    "u": "https://soundcloud.com/tezibel/fat-burner-mix"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/tezibel.jpg?dateUpdated=1649160889000",
  "linksOk": "2026-10-29"
 },
 "Katia Curie": {
  "links": {
   "sc": "https://soundcloud.com/katia-curie",
   "ig": "https://www.instagram.com/katiacurie",
   "ra": "https://ra.co/dj/katiacurie"
  },
  "src": [
   "https://ra.co/dj/katiacurie",
   "https://ra.co/dj/katiacurie/biography",
   "https://refugeworldwide.com/artists/katia-curie-b2b-nizar-sarakbi",
   "https://set79.com/dj/Katia%20Curie"
  ],
  "sets": [
   {
    "t": "ICKPA – Katia Curie & Nizar Sarakbi (Refuge Worldwide, 19.06.2025)",
    "u": "https://soundcloud.com/refugeworldwide/ickpa-katia-curie-nizar"
   },
   {
    "t": "MARICAS Mix n.94 – Katia Curie",
    "u": "https://soundcloud.com/maricasmaricas/maricas-mix-n-94-katia-curie"
   }
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Kyjiw, Ukraine – lebt in Wien",
   "en": "Kyiv, Ukraine – based in Vienna"
  },
  "genres": [
   "House",
   "Minimal House",
   "Progressive House",
   "Techno"
  ],
  "bio": {
   "de": "Katia Curie ist eine klassisch ausgebildete DJ und Produzentin aus Kyjiw, die nach Jahren in der Underground-Szene ihrer Heimatstadt heute in Wien lebt. Ihre Sets verbinden die Energie der 90er und frühen 2000er mit modernem Sound, dunkle und euphorische Momente, rollende Rhythmen und Breaks – auf Vinyl wie digital. Mit Nizar Sarakbi betreibt sie das Label Perlaplastica.",
   "en": "Katia Curie is a classically trained DJ and producer from Kyiv who, after years in her hometown's underground scene, is now based in Vienna. Her sets fuse 90s and early-2000s energy with a modern edge, dark and uplifting moods, rolling rhythms and breaks – on vinyl and digital. She co-runs the label Perlaplastica with Nizar Sarakbi."
  },
  "labels": [
   "MINDHELMET",
   "System Error",
   "PLOT",
   "Perlaplastica",
   "Phantasia",
   "Antam Records"
  ],
  "eps": [
   "Dangerous Secrets (mit/with Nizar Sarakbi)"
  ],
  "clubs": [
   "PRST",
   "BLITZ",
   "Grelle Forelle",
   "Das Werk",
   "SASS Music Club",
   "Hoppetosse"
  ],
  "festivals": [
   "Hyperreality",
   "Lighthouse Festival"
  ],
  "tracks": [
   "Go And Get It (with Nizar Sarakbi)"
  ],
  "img": "https://static.ra.co/images/profiles/square/katiacurie.jpg?dateUpdated=1766056471430",
  "linksOk": "2026-10-29"
 },
 "Nizar Sarakbi": {
  "links": {
   "sc": "https://soundcloud.com/nizar-sarakbi",
   "ra": "https://ra.co/dj/nizarsarakbi"
  },
  "src": [
   "https://ra.co/dj/nizarsarakbi",
   "https://fr.ra.co/dj/nizarsarakbi"
  ],
  "sets": [
   {
    "t": "Katia Curie & Nizar Sarakbi live @ Gay Haze x Horst, Brüssel (14.02.2026)",
    "u": "https://soundcloud.com/nizar-sarakbi/katia-curie-nizar-sarakbi-live"
   },
   {
    "t": "Katia Curie & Nizar Sarakbi live @ Lighthouse Festival 2025",
    "u": "https://soundcloud.com/katia-curie/nizar-sarakbi"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/nizarsarakbi.jpg?dateUpdated=1747852656690",
  "linksOk": "2026-10-29"
 },
 "The Advent": {
  "links": {
   "sc": "https://soundcloud.com/ciscoadvent",
   "web": "http://the-advent.com",
   "sp": "https://open.spotify.com/artist/2viciQWa7lV7FrogoaDvk8"
  },
  "src": [
   "https://ra.co/dj/theadvent"
  ],
  "sets": [
   {
    "t": "The Advent – Live at Motor, Detroit",
    "u": "https://soundcloud.com/ciscoadvent/the-advent-live-motor-detroit"
   },
   {
    "t": "The Advent @ Smeerboel Festival 2015",
    "u": "https://soundcloud.com/ciscoadvent/smeerboel-festival-theadvent-2015-dj-set"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "COZi": {
  "links": {
   "sc": "https://soundcloud.com/cozimusic",
   "ra": "https://ra.co/dj/cozi"
  },
  "src": [
   "https://ra.co/dj/cozi"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/cozi.jpg?dateUpdated=1765353323750",
  "linksOk": "2026-10-29"
 },
 "Bludhound": {
  "links": {
   "sc": "https://soundcloud.com/bludhxund",
   "ra": "https://ra.co/dj/bludhound"
  },
  "src": [
   "https://es.ra.co/dj/bludhound",
   "https://ra.co/dj/bludhound"
  ],
  "sets": [
   {
    "t": "Almost Pinkcast – MEL b2b Pinklotion b2b Bludhound (Radio Rudina)",
    "u": "https://soundcloud.com/radiorudina/almost-pinkcast-mel-b2b-pinklotion-b2b-bludhound"
   },
   {
    "t": "BLUDHOUND @ DER Radio",
    "u": "https://soundcloud.com/der-radio/bludhound-der-radio"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/bludhound.jpg?dateUpdated=1730462122000",
  "linksOk": "2026-10-29"
 },
 "Memet Acuma": {
  "links": {
   "sc": "https://soundcloud.com/mehmet-acuma",
   "ig": "https://www.instagram.com/myseriouscomedy",
   "ra": "https://ra.co/dj/memetacuma"
  },
  "src": [
   "https://ra.co/dj/memetacuma",
   "https://ra.co/dj/memetacuma/biography",
   "https://elevate.at/websites/2017/en/arts/memet_acuma/index.html"
  ],
  "sets": [
   {
    "t": "OTG Summer/Breaks with Memet Acuma",
    "u": "https://soundcloud.com/off_the_grid_vienna/otg-summer-breaks-with-memet"
   },
   {
    "t": "[0046] Memet Acuma (Booth Hub)",
    "u": "https://soundcloud.com/boothhub/0046-memet-acuma"
   }
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Linz, Österreich",
   "en": "Linz, Austria"
  },
  "genres": [
   "House",
   "Techno",
   "Broken Beat",
   "Jazz",
   "Experimental"
  ],
  "bio": {
   "de": "Memet Acuma ist DJ, Netzwerker und Booker und gilt als wichtige Figur der österreichischen Clubszene, der in nahezu allen großen Clubs des Landes gespielt hat. Sein Spektrum reicht von experimenteller Musik, obskurem Jazz und Broken Beats bis zu House und Techno – gern mit Scratches und Cuts.",
   "en": "Memet Acuma is a DJ, networker and booker regarded as an important figure in the Austrian club scene, having played nearly every major club in the country. His range spans experimental music, obscure jazz and broken beats through to house and techno – often with scratches and cuts."
  },
  "labels": [
   "Cliché 81"
  ],
  "clubs": [
   "Solaris",
   "Stadtwerkstatt",
   "Das Werk",
   "Unten",
   "Kapu"
  ],
  "img": "https://static.ra.co/images/profiles/memetacuma.jpg?dateUpdated=1529938959000",
  "linksOk": "2026-10-29"
 },
 "Bambi-S": {
  "links": {
   "sc": "https://soundcloud.com/bambi_berlin",
   "ig": "https://www.instagram.com/bambi_berlin",
   "web": "http://linktr.ee/bambi_berlin"
  },
  "src": [
   "https://ra.co/dj/bambi-s"
  ],
  "sets": [
   {
    "t": "Bambi-S @ Sisyphos (13.09.2025)",
    "u": "https://soundcloud.com/bambi_berlin/bambi-s-sisyphos-13092025"
   },
   {
    "t": "Bambi-S @ UNVRS Opening Ibiza (30.05.2025)",
    "u": "https://soundcloud.com/bambi_berlin/bambi-s-unvrs-opening-ibiza-30052025"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Anatol": {
  "links": {
   "sc": "https://soundcloud.com/anatol-official"
  },
  "src": [
   "https://ra.co/dj/anatol"
  ],
  "sets": [
   {
    "t": "ANATOL @ DER Radio",
    "u": "https://soundcloud.com/der-radio/anatol-der-radio"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "DORAH": {
  "links": {
   "sc": "https://soundcloud.com/dora-ban",
   "ig": "https://www.instagram.com/dorah.bpm",
   "ra": "https://ra.co/dj/dorah"
  },
  "src": [
   "https://es.ra.co/dj/dorah"
  ],
  "sets": [
   {
    "t": "DORAH @ Herzfrequenz goes FLUCC Vol. 4 (24.05.2025)",
    "u": "https://soundcloud.com/herzfrequenz_techno/dorah-hz-2405"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/dorah.jpg?dateUpdated=1767780618000",
  "linksOk": "2026-10-29"
 },
 "maro": {
  "links": {
   "sc": "https://soundcloud.com/maro87c",
   "ig": "https://www.instagram.com/maro87c/",
   "bc": "https://maro87.bandcamp.com",
   "web": "http://www.maro87c.at"
  },
  "src": [
   "https://de.ra.co/dj/maro"
  ],
  "sets": [
   {
    "t": "maro – no lullaby (Mahlwerk Artist Set MWK007)",
    "u": "https://soundcloud.com/mahlwerk-mwk/max-mustermann"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "k means": {
  "links": {
   "sc": "https://soundcloud.com/k_means",
   "ig": "https://www.instagram.com/trish_ak_means"
  },
  "src": [
   "https://ra.co/dj/kmeans"
  ],
  "sets": [
   {
    "t": "Dekmantel Mix 487 – k means",
    "u": "https://soundcloud.com/dkmntl/dekmantel-mix-487-k-means"
   },
   {
    "t": "Trip Lick w/ k means (NTS, 28.05.2025)",
    "u": "https://soundcloud.com/user-643553014/trip-lick-w-k-means-280525"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Silentsevir": {
  "links": {
   "sc": "https://soundcloud.com/silentsevir-mpmrecords",
   "ig": "https://www.instagram.com/silentsevir",
   "web": "https://linktr.ee/silentsevir",
   "ra": "https://ra.co/dj/silentsevir"
  },
  "src": [
   "https://ra.co/dj/silentsevir"
  ],
  "sets": [
   {
    "t": "KUSCHELMUSIK (Fall 2023 Schranz Mix)",
    "u": "https://soundcloud.com/silentsevir/kuschelmusik-fall-2023-schranz-mix-1"
   },
   {
    "t": "Silentsevir @ Hive Festival 2023",
    "u": "https://soundcloud.com/silentsevir/hive-2023-set"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/silentsevir.jpg?dateUpdated=1752757701203",
  "linksOk": "2026-10-29"
 },
 "WO.IZZY": {
  "links": {
   "sc": "https://soundcloud.com/der-radio-wo-izzy",
   "ig": "https://www.instagram.com/wo.izzy_",
   "ra": "https://ra.co/dj/wo.izzy"
  },
  "src": [
   "https://ra.co/dj/wo.izzy"
  ],
  "sets": [
   {
    "t": "SODASTREAMS #38 – WO.IZZY",
    "u": "https://soundcloud.com/sodaclubsalzburg/sodastreams-38-wo-izzy"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/wo.izzy.jpg?dateUpdated=1769419964937",
  "linksOk": "2026-10-29"
 },
 "Vivienna": {
  "links": {
   "sc": "https://soundcloud.com/t2vM8zxuw47WrxBBA",
   "ig": "https://www.instagram.com/viviennepohl"
  },
  "src": [
   "https://it.ra.co/dj/vivienna"
  ],
  "setsChecked": "2026-10-27"
 },
 "Albin Brezlan": {
  "links": {
   "sc": "https://soundcloud.com/albinbrezlanmusic",
   "ig": "https://www.instagram.com/albinbrezlanmusic",
   "web": "https://linktr.ee/albinbrezlan"
  },
  "src": [
   "https://ra.co/dj/albinbrezlan"
  ],
  "sets": [
   {
    "t": "Albin Brezlan @ Das Werk, Vienna",
    "u": "https://soundcloud.com/albinbrezlanmusic/albin-brezlan-das-werk-vienna"
   },
   {
    "t": "Albin Brezlan b2b Huebl @ Techno Entgleist / Grelle Forelle",
    "u": "https://soundcloud.com/albinbrezlanmusic/albin-brezlan-b2b-huebl-techno-entgleist-grelle-forelle"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "PAUNA": {
  "links": {
   "sc": "https://soundcloud.com/djpauna",
   "ig": "https://www.instagram.com/pauna_vie"
  },
  "src": [
   "https://fr.ra.co/dj/pauna"
  ],
  "sets": [
   {
    "t": "Gürtel Connection #14 – Wien Station",
    "u": "https://soundcloud.com/djpauna/rec001wav-gurtel-connection"
   },
   {
    "t": "PAUNA / OPMD020 (Open Mind Podcast)",
    "u": "https://soundcloud.com/opmdpodcast/pauna-opmd020"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Huebl": {
  "links": {
   "sc": "https://soundcloud.com/ferdinand-h-bl",
   "ig": "https://www.instagram.com/huebl_techno"
  },
  "src": [
   "https://ra.co/dj/huebl"
  ],
  "sets": [
   {
    "t": "Albin Brezlan b2b Huebl @ Techno Entgleist / Grelle Forelle",
    "u": "https://soundcloud.com/albinbrezlanmusic/albin-brezlan-b2b-huebl-techno-entgleist-grelle-forelle"
   },
   {
    "t": "Albin Brezlan b2b Huebl @ Verknallt (08.09.2023)",
    "u": "https://soundcloud.com/ferdinand-h-bl/albin-brezlan-b2b-huebl-verknallt-w-anxhela-080923"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Dana Melissa": {
  "links": {
   "sc": "https://soundcloud.com/danamelissa",
   "ig": "https://www.instagram.com/danamelissa.vie"
  },
  "src": [
   "https://de.ra.co/dj/danamelissa"
  ],
  "sets": [
   {
    "t": "Dana Melissa @ Techno Entgleist / Grelle Forelle (29.09.2023)",
    "u": "https://soundcloud.com/danamelissa/dana-melissa-techno-entgleistgrelle-forelle"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Michel Lauriola (ARG)": {
  "links": {
   "sc": "https://soundcloud.com/michellauriola",
   "sp": "https://open.spotify.com/artist/49e8z9fLIHIsPjHgVfCMpP"
  },
  "src": [
   "https://ra.co/dj/michellauriola"
  ],
  "setsChecked": "2026-10-27"
 },
 "Spud Bencer": {
  "links": {
   "sc": "https://soundcloud.com/spudbencervie",
   "ig": "https://www.instagram.com/spudbencer0815"
  },
  "src": [
   "https://ra.co/dj/spudbencer"
  ],
  "setsChecked": "2026-10-27"
 },
 "Paraçek": {
  "links": {
   "sc": "https://soundcloud.com/paracek",
   "bc": "https://paracek.bandcamp.com",
   "web": "http://linktr.ee/paracek"
  },
  "src": [
   "https://de.ra.co/dj/paracek"
  ],
  "sets": [
   {
    "t": "Paraçek | HÖR – 2026 DJ Set",
    "u": "https://soundcloud.com/paracek/paracekhoer2026"
   },
   {
    "t": "Paraçek | HÖR – 2025 DJ Set",
    "u": "https://soundcloud.com/paracek/paracek-hor-set-2025"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Felix Rupprecht": {
  "links": {
   "sc": "https://soundcloud.com/felixrupprecht",
   "ig": "https://www.instagram.com/flx.rupprecht",
   "sp": "https://open.spotify.com/artist/3LqNRj4McFE1JrWDgTvrly"
  },
  "src": [
   "https://de.ra.co/dj/felixrupprecht"
  ],
  "setsChecked": "2026-10-27"
 },
 "Julani": {
  "links": {
   "sc": "https://soundcloud.com/julani_slctr",
   "ra": "https://ra.co/dj/julani"
  },
  "src": [
   "https://ra.co/dj/julani"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/julani.jpg?dateUpdated=1756911615000",
  "linksOk": "2026-10-29"
 },
 "Manuel Correa": {
  "links": {
   "ig": "https://www.instagram.com/_manuelcorrea"
  },
  "src": [
   "https://ra.co/dj/manuelcorrea"
  ]
 },
 "DLV": {
  "links": {
   "sc": "https://soundcloud.com/DLV",
   "ig": "https://www.instagram.com/dlv_official",
   "bc": "https://dlvmusic.bandcamp.com"
  },
  "src": [
   "https://ra.co/dj/dlv"
  ],
  "sets": [
   {
    "t": "DLV @ Grelle Forelle – Acid Techno Techno Club (Closing Set, 07.03.2020)",
    "u": "https://soundcloud.com/dlv/grelle-forelle-acid-techno-techno-club-0732020-closing-set"
   },
   {
    "t": "DLV @ Grelle Forelle – Techno.Deluxe (Closing Set, 06.04.2019)",
    "u": "https://soundcloud.com/dlv/dlv-grelle-forelle-technodeluxe-060419-closing-set"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Pola & Bryson": {
  "links": {
   "sc": "https://soundcloud.com/pola-bryson",
   "sp": "https://open.spotify.com/artist/79pzyyqayunwsvh4ty4vpr",
   "ig": "https://www.instagram.com/polabryson",
   "bc": "http://polabryson.bandcamp.com"
  },
  "src": [
   "https://ra.co/dj/polabryson"
  ],
  "sets": [
   {
    "t": "Pola & Bryson DNB60 Mix (Friction, BBC Radio 1)",
    "u": "https://soundcloud.com/pola-bryson/pola-bryson-dnb60-mix-friction-on-bbc-radio-1-1xtra"
   },
   {
    "t": "R&B Meets D&B Mix",
    "u": "https://soundcloud.com/pola-bryson/rb-meets-db-mix"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Thomas Schumacher (Elektrochemie LK)": {
  "links": {
   "sc": "https://soundcloud.com/thomas-schumacher",
   "ig": "https://www.instagram.com/djthomasschumacher",
   "web": "http://www.thomasschumacher.com"
  },
  "src": [
   "https://de.ra.co/dj/thomasschumacher"
  ],
  "sets": [
   {
    "t": "Thomas Schumacher @ Mayday 2022",
    "u": "https://soundcloud.com/thomas-schumacher/mayday-momentum-dj-set-part-1"
   },
   {
    "t": "Thomas Schumacher – Live DJ Set @ The Villa, Oslo",
    "u": "https://soundcloud.com/thomas-schumacher/live-dj-set-from-the-villa-oslo-20012017"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Andy Catana": {
  "links": {
   "sc": "https://soundcloud.com/andy-catana",
   "ig": "https://www.instagram.com/andycatana",
   "bc": "https://andycatana.bandcamp.com",
   "ra": "https://ra.co/dj/andycatana"
  },
  "src": [
   "https://de.ra.co/dj/andycatana",
   "https://andycatana.bandcamp.com",
   "https://es.ra.co/dj/andycatana"
  ],
  "sets": [
   {
    "t": "NTBT – Mixtape Vol. 9 by Andy Catana",
    "u": "https://soundcloud.com/nexttimebigtime/next-time-big-time-9-guestmix-by-andy-catana"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://f4.bcbits.com/img/0037264141_21.jpg",
  "linksOk": "2026-10-29"
 },
 "Rizmo": {
  "links": {
   "sc": "https://soundcloud.com/moriz-hutmacher",
   "ra": "https://ra.co/dj/rizmo"
  },
  "src": [
   "https://ra.co/dj/rizmo"
  ],
  "sets": [
   {
    "t": "Mosaiek – Rizmo (Radio Rudina)",
    "u": "https://soundcloud.com/radiorudina/mosaiek-rizmo"
   },
   {
    "t": "EYA Podcast 94 – Rizmo",
    "u": "https://soundcloud.com/eyarecords/eya-podcast-94-rizmo"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/rizmo.jpg?dateUpdated=1715964167527",
  "linksOk": "2026-10-29"
 },
 "Stipo": {
  "links": {
   "sc": "https://soundcloud.com/stipogonzalo",
   "ig": "https://www.instagram.com/stipo_rs",
   "ra": "https://ra.co/dj/stipo-at"
  },
  "src": [
   "https://ra.co/dj/stipo-at",
   "https://de.ra.co/dj/stipo-at"
  ],
  "sets": [
   {
    "t": "Podcast 018 – Stipo (Rhythm Science) · Merkwürdig",
    "u": "https://soundcloud.com/merkwuerdig_records/podcast-018-stipo-rhythm-science"
   },
   {
    "t": "Stipo – Move & Connect Podcast",
    "u": "https://soundcloud.com/moveandconnect/stipo-move-connect-podcast"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/stipo-at.jpg?dateUpdated=1744405896187",
  "linksOk": "2026-10-29"
 },
 "Arman Shadow": {
  "links": {
   "sc": "https://soundcloud.com/armanshadow",
   "ig": "https://www.instagram.com/armanshadow",
   "ra": "https://ra.co/dj/armanshadow"
  },
  "src": [
   "https://de.ra.co/dj/armanshadow"
  ],
  "sets": [
   {
    "t": "Arman Shadow @ 54Hz (30.05.2025)",
    "u": "https://soundcloud.com/armanshadow/arman-shadow-54hz-300525"
   },
   {
    "t": "Arman Shadow @ Deep Dive / Camera Club (15.07.2022)",
    "u": "https://soundcloud.com/armanshadow/deep-dive-camera-club-15072022"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/armanshadow.jpg?dateUpdated=1764132002880",
  "linksOk": "2026-10-29"
 },
 "Ben Derris": {
  "links": {
   "sc": "https://soundcloud.com/benderris",
   "ig": "https://www.instagram.com/ben.der.riss",
   "bc": "https://benderris.bandcamp.com"
  },
  "src": [
   "https://de.ra.co/dj/benderris"
  ],
  "sets": [
   {
    "t": "Ben Derris @ HÖR Berlin (22.01.2025)",
    "u": "https://soundcloud.com/benderris/22-01-25-hoer-berlin-fixed"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Linus Villa": {
  "links": {
   "sc": "https://soundcloud.com/linusvilla",
   "ig": "https://www.instagram.com/linusvilla",
   "bc": "https://linusvilla.bandcamp.com",
   "sp": "https://open.spotify.com/artist/0t7Btp9w37XCPaJOm7XMti"
  },
  "src": [
   "https://ra.co/dj/linusvilla"
  ],
  "sets": [
   {
    "t": "Relive OASIS 005 – Linus Villa (Closing)",
    "u": "https://soundcloud.com/linusvilla/oasis-005-linus-villa-closing"
   },
   {
    "t": "Sonnenstudio Abschiedset",
    "u": "https://soundcloud.com/linusvilla/sonnenstudio-abschiedset"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Sophti": {
  "links": {
   "sc": "https://soundcloud.com/sophtidj",
   "ig": "https://www.instagram.com/dj.sophti"
  },
  "src": [
   "https://ra.co/dj/sophti"
  ],
  "sets": [
   {
    "t": "Sophti @ HÖR II",
    "u": "https://soundcloud.com/sophtidj/sophti-hoer-ii"
   },
   {
    "t": "019 SOPHTI (Elm Street 42)",
    "u": "https://soundcloud.com/elm-street-42/019-sophti"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Kat Ze": {
  "links": {
   "sc": "https://soundcloud.com/kat_ze_music",
   "ig": "https://www.instagram.com/kat__ze"
  },
  "src": [
   "https://de.ra.co/dj/katzedj"
  ],
  "sets": [
   {
    "t": "Kat Ze @ HÖR Berlin",
    "u": "https://soundcloud.com/kat_ze_music/kat-ze-hoer-berlin"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Prismode": {
  "links": {
   "sc": "https://soundcloud.com/prismode",
   "ig": "https://www.instagram.com/prismode",
   "web": "http://prismode.com"
  },
  "src": [
   "https://ra.co/dj/prismode-de"
  ],
  "sets": [
   {
    "t": "Prismode & Solvane @ EXIT Festival 2017 (Feel Stage)",
    "u": "https://soundcloud.com/ritter-butzke/prismode-solvane-at-feel-festival-2017"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "NTO": {
  "links": {
   "sc": "https://soundcloud.com/ntonto",
   "ig": "https://www.instagram.com/ntomusic",
   "web": "https://www.ntomusic.com/"
  },
  "src": [
   "https://ra.co/dj/nto"
  ],
  "sets": [
   {
    "t": "N'to – Lac de Soi (Cercle Stories)",
    "u": "https://soundcloud.com/cerclelive/ntolacdesoicerclestories"
   },
   {
    "t": "N'to [live] @ DGTL Festival 2016",
    "u": "https://soundcloud.com/dgtl-festival/nto-live-dgtl-festival-2016-amsterdam-26032016"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Oxygeno": {
  "links": {
   "sc": "https://soundcloud.com/oxxxygeno",
   "ig": "https://www.instagram.com/oxygeno__"
  },
  "src": [
   "https://ra.co/dj/oxygeno"
  ],
  "setsChecked": "2026-10-27"
 },
 "Melimeko": {
  "links": {
   "sc": "https://soundcloud.com/melimeko",
   "ig": "https://www.instagram.com/mmelimeko"
  },
  "src": [
   "https://de.ra.co/dj/melimeko"
  ],
  "sets": [
   {
    "t": "BCCO x SoundCloud New Faces S04E02: MELIMEKO",
    "u": "https://soundcloud.com/bcco/bcco-x-soundcloud-new-faces-s04e02-melimeko"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Elah": {
  "links": {
   "sc": "https://soundcloud.com/awkwardendeavor",
   "ig": "https://www.instagram.com/awkwardendeavor"
  },
  "src": [
   "https://de.ra.co/dj/elah"
  ],
  "sets": [
   {
    "t": "BAR MIX 001",
    "u": "https://soundcloud.com/awkwardendeavor/bar-mix"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Solvane": {
  "links": {
   "sc": "https://soundcloud.com/solvane",
   "ig": "https://www.instagram.com/IamSolvane",
   "web": "http://www.solvane.de"
  },
  "src": [
   "https://de.ra.co/dj/solvane"
  ],
  "sets": [
   {
    "t": "Prismode & Solvane @ EXIT Festival 2017 (Feel Stage)",
    "u": "https://soundcloud.com/ritter-butzke/prismode-solvane-at-feel-festival-2017"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Cara Elizabeth": {
  "links": {
   "sc": "https://soundcloud.com/caraxelizabeth",
   "ig": "https://www.instagram.com/caraxelizabeth",
   "sp": "https://open.spotify.com/artist/4Ol10UBcGz0YO0XpAKoGIU"
  },
  "src": [
   "https://ra.co/dj/caraelizabeth"
  ],
  "sets": [
   {
    "t": "Part Time Killer & Cara Elizabeth – HÖR Berlin 2025 DJ Set",
    "u": "https://soundcloud.com/part-time-killer/part-time-killer-cara-elizabeth-hor-berlin-2025-dj-set"
   },
   {
    "t": "Cara Elizabeth @ OXA Beach – Berlin Calling (31.01.2024)",
    "u": "https://soundcloud.com/jedentageinset/cara-elizabeth-oxa-beach-berlin-calling-jedentageinset-special-31012024"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Frederic.": {
  "links": {
   "sc": "https://soundcloud.com/frederic-selected",
   "ig": "https://www.instagram.com/frederic.selected"
  },
  "src": [
   "https://ra.co/dj/frederic-de"
  ],
  "sets": [
   {
    "t": "Frederic. @ Selected – RSO.LIVECAST 017 (23.12.2025)",
    "u": "https://soundcloud.com/rso_berlin/frederic-selected-rsolivecast-017231225"
   },
   {
    "t": "Frederic. @ Geheimclub Magdeburg",
    "u": "https://soundcloud.com/selected-berlin/frederic-geheimclub-magdeburg-100722"
   }
  ],
  "setsChecked": "2026-10-27"
 },
 "Max Kernmayer": {
  "links": {
   "sc": "https://soundcloud.com/maxkernmayer",
   "ig": "https://www.instagram.com/maxkernmayer",
   "ra": "https://ra.co/dj/maxkernmayer"
  },
  "src": [
   "https://ra.co/dj/maxkernmayer",
   "https://es.ra.co/dj/maxkernmayer"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/maxkernmayer.jpg?dateUpdated=1546821638000",
  "linksOk": "2026-10-29"
 },
 "Rui de Janeiro": {
  "links": {
   "sc": "https://soundcloud.com/rui-dejaneiro",
   "ig": "https://www.instagram.com/rui.dejaneiro",
   "ra": "https://ra.co/dj/ruidejaneiro"
  },
  "src": [
   "https://de.ra.co/dj/ruidejaneiro"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/ruidejaneiro.jpg?dateUpdated=1717603677000",
  "linksOk": "2026-10-29"
 },
 "Ele Luz": {
  "links": {
   "sc": "https://soundcloud.com/ele_luz",
   "sp": "https://open.spotify.com/artist/6CAmOOikxXb6SmPODWGN5d",
   "ra": "https://ra.co/dj/eleluz"
  },
  "src": [
   "https://ra.co/dj/eleluz",
   "https://open.spotify.com/artist/6CAmOOikxXb6SmPODWGN5d"
  ],
  "sets": [
   {
    "t": "Ele Luz @ Boom Festival 2025 (Alchemy Circle)",
    "u": "https://soundcloud.com/ele_luz/ele-luz-boom-festival-2025-alchemy-circle"
   },
   {
    "t": "Ele Luz @ Südpol – Alles auf Null (01.01.2025)",
    "u": "https://soundcloud.com/ele_luz/ele-luz-sudpol-alles-auf-null-01012025"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://i.scdn.co/image/ab6761610000e5eb6a47af2dd6f1fff22f265ab8",
  "linksOk": "2026-10-29"
 },
 "PSMT": {
  "links": {
   "sc": "https://soundcloud.com/philipp-siegmeth",
   "ig": "https://www.instagram.com/philippsiegmeth",
   "bc": "https://psmt.bandcamp.com",
   "ra": "https://ra.co/dj/psmt"
  },
  "src": [
   "https://ra.co/dj/psmt"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/psmt.jpg?dateUpdated=1793047727933",
  "linksOk": "2026-10-29"
 },
 "Crystal O": {
  "links": {
   "sc": "https://soundcloud.com/crystal_o",
   "ig": "https://www.instagram.com/crystal.o.vienna",
   "web": "http://crystal-o.com",
   "ra": "https://ra.co/dj/crystalo"
  },
  "src": [
   "https://de.ra.co/dj/crystalo"
  ],
  "sets": [
   {
    "t": "CRYSTAL O @ Acid Techno Techno Club, Grelle Forelle (12.10.2024)",
    "u": "https://soundcloud.com/herzfrequenz_techno/crystal-o-forelle-121024"
   },
   {
    "t": "CRYSTAL O @ Herzfrequenz Pride Edition, Das Werk (01.06.2024)",
    "u": "https://soundcloud.com/herzfrequenz_techno/crystal-o-herzfrequenz-pride-edition-das-werk-01062024-set-recording"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/crystalo.jpg?dateUpdated=1664963179000",
  "linksOk": "2026-10-29"
 },
 "Apua": {
  "links": {
   "web": "http://www.kopfbeifuss.com",
   "sc": "https://soundcloud.com/apua",
   "ra": "https://ra.co/dj/apua"
  },
  "src": [
   "https://ra.co/dj/apua",
   "https://de.ra.co/dj/apua"
  ],
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "sets": [
   {
    "t": "Sonder London #142 – DJ Void & Apua",
    "u": "https://soundcloud.com/sonderlondon/142-dj-void-apua"
   },
   {
    "t": "KbF Radio #08 – Apua (Kopf bei Fuss)",
    "u": "https://soundcloud.com/kopfbeifuss/kbf-radio-08-apua"
   }
  ],
  "setsChecked": "2026-10-28",
  "img": "https://static.ra.co/images/profiles/apua.jpg?dateUpdated=1484824441833",
  "linksOk": "2026-10-29"
 },
 "Peter Pixzel": {
  "links": {
   "ra": "https://ra.co/dj/peterpixzel"
  },
  "src": [
   "https://ra.co/dj/peterpixzel"
  ],
  "from": {
   "de": "London, Vereinigtes Königreich",
   "en": "London, United Kingdom"
  },
  "img": "https://static.ra.co/images/profiles/peterpixzel.jpg?dateUpdated=1287578646000",
  "linksOk": "2026-10-29"
 },
 "Sam Gittis": {
  "links": {
   "sc": "https://soundcloud.com/samgittis",
   "ra": "https://ra.co/dj/samgittis"
  },
  "src": [
   "https://ra.co/dj/samgittis"
  ],
  "from": {
   "de": "Tschechien (Prag)",
   "en": "Czech Republic (Prague)"
  },
  "sets": [
   {
    "t": "Sam Gittis @ Roxy Prague (03.2025)",
    "u": "https://soundcloud.com/samgittis/roxy314"
   },
   {
    "t": "Sam Gittis @ Darkroom, Underground 36 Prague",
    "u": "https://soundcloud.com/samgittis/samgittisdarkroomset"
   }
  ],
  "setsChecked": "2026-10-28",
  "img": "https://static.ra.co/images/profiles/square/samgittis.jpg?dateUpdated=1749156896243",
  "linksOk": "2026-10-29"
 },
 "DizzyDray": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Vanessa Sa": {
  "links": {
   "sc": "https://soundcloud.com/vanessa-sa-vienna",
   "ra": "https://ra.co/dj/vanessasa"
  },
  "src": [
   "https://ra.co/dj/vanessasa"
  ],
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "sets": [
   {
    "t": "Vanessa Sa @ about later, The Loft Wien (11.2023)",
    "u": "https://soundcloud.com/vanessa-sa-vienna/about-later-2023-11-loft"
   },
   {
    "t": "Urban Sessions #145 – Vanessa Sa (Urban FM)",
    "u": "https://soundcloud.com/urban-fm-608950226/urban-sessions-vanessa-sa-145"
   }
  ],
  "setsChecked": "2026-10-28",
  "img": "https://static.ra.co/images/profiles/square/vanessasa.jpg?dateUpdated=1750242437000",
  "linksOk": "2026-10-29"
 },
 "Casanoah": {
  "links": {
   "sc": "https://soundcloud.com/casanoah"
  },
  "sets": [
   {
    "t": "Casanoah – soundlabs session 1 (soundlabs Wien)",
    "u": "https://soundcloud.com/soundlabs-rmc/soundlabs-session-1-casanoah"
   }
  ],
  "setsChecked": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Aleta": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Seba": {
  "img": "https://static.ra.co/images/profiles/seba.jpg?dateUpdated=1494519179647",
  "links": {},
  "linksOk": "2026-10-29"
 },
 "Melchiorr": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Osmos": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Prakas": {
  "links": {
   "ra": "https://ra.co/dj/prakas"
  },
  "src": [
   "https://ra.co/dj/prakas/tour-dates",
   "https://ra.co/dj/prakas",
   "https://ra.co/dj/prakas/biography"
  ],
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "img": "https://static.ra.co/images/profiles/square/prakas.jpg?dateUpdated=1791540455663",
  "linksOk": "2026-10-29"
 },
 "Farbod": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Patrick M4SS": {
  "links": {
   "sc": "https://soundcloud.com/patrickm4ss",
   "sp": "https://open.spotify.com/artist/3ID7rrudaERHQPjtHZDSVs"
  },
  "src": [
   "https://open.spotify.com/track/2ic4vdco6f9MwZCPJB4QvV",
   "https://open.spotify.com/artist/3ID7rrudaERHQPjtHZDSVs"
  ],
  "sets": [
   {
    "t": "Oblivion vs Violendgroove @ Postgarage Graz (13.03.2026)",
    "u": "https://soundcloud.com/patrickm4ss/oblivian-postgarage-13-03-2026"
   },
   {
    "t": "Crystal O(hne) F2F Patrick M4SS @ VS: A Face2Face Rave, Das Werk (15.08.2025)",
    "u": "https://soundcloud.com/herzfrequenz_techno/crystal-ohne-f2f-patrick-m4ss-vs-a-face2face-rave-das-werk-15082025-set-recording-1"
   }
  ],
  "setsChecked": "2026-10-28",
  "img": "https://i.scdn.co/image/ab6761610000e5eb3e0464abd55a3415fbcf8e19"
 },
 "Lenzi": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Adam19": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Meril Fox": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Noel": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Joro & Joabo": {
  "links": {
   "sc": "https://soundcloud.com/joro_und_joabo"
  },
  "sets": [
   {
    "t": "Joro & Joabo – Xmas25 (12.2025)",
    "u": "https://soundcloud.com/joro_und_joabo/joro-joabo-xmas25"
   },
   {
    "t": "Joro & Joabo – Peaktime Techno (07.2022)",
    "u": "https://soundcloud.com/joro_und_joabo/peaktimetechno0722"
   }
  ],
  "setsChecked": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Atomik": {
  "noLinks": "2026-10-28"
 },
 "Norg3n": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Peter Pan": {
  "links": {
   "sc": "https://soundcloud.com/peterpan303",
   "bc": "https://peterpan303.bandcamp.com",
   "ig": "https://www.instagram.com/mrgreenwood303",
   "web": "http://neverland.no",
   "ra": "https://ra.co/dj/peterpan-no"
  },
  "src": [
   "https://ra.co/dj/peterpan-no"
  ],
  "from": {
   "de": "Norwegen",
   "en": "Norway"
  },
  "setsChecked": "2026-10-28",
  "img": "https://static.ra.co/images/profiles/square/peterpan-no.jpg?dateUpdated=1772446692163",
  "linksOk": "2026-10-29"
 },
 "JP eXbert": {
  "links": {
   "sc": "https://soundcloud.com/jpexbert",
   "ig": "https://www.instagram.com/jpexbert",
   "web": "https://linktr.ee/jpexbert",
   "ra": "https://ra.co/dj/jpexbert"
  },
  "src": [
   "https://ra.co/dj/jpexbert"
  ],
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "sets": [
   {
    "t": "JP eXbert – Techno/Acid/Hardtechno/Psy set (Bazooka Entertainment)",
    "u": "https://soundcloud.com/bazooka-entertainment/jp-exbert-techno-acidtechno"
   }
  ],
  "setsChecked": "2026-10-28",
  "img": "https://static.ra.co/images/profiles/square/jpexbert.jpg?dateUpdated=1740684805353"
 },
 "Aschenbrenner": {
  "links": {
   "sc": "https://soundcloud.com/michi-aschenbrenner-1",
   "ra": "https://ra.co/dj/aschenbrenner"
  },
  "src": [
   "https://de.ra.co/dj/aschenbrenner"
  ],
  "from": {
   "de": "Wien, Österreich",
   "en": "Vienna, Austria"
  },
  "sets": [
   {
    "t": "Aschenbrenner @ Grelle Forelle Mainfloor (07.06.2024)",
    "u": "https://soundcloud.com/michi-aschenbrenner-1/grelle-forelle-mainfloor-07-06"
   }
  ],
  "setsChecked": "2026-10-28",
  "img": "https://static.ra.co/images/profiles/square/aschenbrenner.jpg?dateUpdated=1770631536000",
  "linksOk": "2026-10-29"
 },
 "The Tunegirl": {
  "links": {
   "sc": "https://soundcloud.com/tunegirl"
  },
  "sets": [
   {
    "t": "Global Grooves Episode 60 w/ The Tunegirl",
    "u": "https://soundcloud.com/ben_champell/global-grooves-episode-60-w-the-tunegirl"
   },
   {
    "t": "Tunegirl Jam 002 (live)",
    "u": "https://soundcloud.com/tunegirl/tunegirl-jam-002"
   }
  ],
  "setsChecked": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "Alex Maurer": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "DJ Bottleghost": {
  "noLinks": "2026-10-28",
  "noImg": "2026-10-28"
 },
 "DJ Veloziped": {
  "links": {
   "sc": "https://soundcloud.com/veloziped",
   "ra": "https://ra.co/dj/veloziped"
  },
  "src": [
   "https://de.ra.co/dj/veloziped",
   "https://ra.co/dj/veloziped"
  ],
  "from": {
   "de": "Italien (Südtirol)",
   "en": "Italy (South Tyrol)"
  },
  "sets": [
   {
    "t": "The Tribute Mix Show #210 – A Tribute To Underground Resistance, mixed by Veloziped",
    "u": "https://soundcloud.com/thetributemixshow/210-a-tribute-to-underground-resistance-mixed-by-veloziped"
   },
   {
    "t": "The Tribute Mix Show #207 – A Tribute To DJ Hell, mixed by Veloziped",
    "u": "https://soundcloud.com/thetributemixshow/207-a-tribute-to-dj-hell-mixed-by-veloziped"
   }
  ],
  "setsChecked": "2026-10-28",
  "img": "https://static.ra.co/images/profiles/veloziped.jpg?dateUpdated=1301554098000",
  "linksOk": "2026-10-29"
 },
 "Altroy Jerome": {
  "links": {
   "ra": "https://de.ra.co/dj/altroyjerome"
  },
  "src": [
   "https://de.ra.co/dj/altroyjerome"
  ],
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "img": "https://static.ra.co/images/profiles/square/altroyjerome.jpg?dateUpdated=1746100566000"
 },
 "saschka": {
  "img": "https://static.ra.co/images/profiles/square/saschka.jpg?dateUpdated=1790180348463",
  "links": {
   "ra": "https://ra.co/dj/saschka",
   "sc": "https://soundcloud.com/saschkadj"
  },
  "src": [
   "https://pl.ra.co/dj/saschka",
   "https://ra.co/dj/saschka"
  ],
  "linksOk": "2026-10-29"
 },
 "Weazl": {
  "img": "https://static.ra.co/images/profiles/square/weazl.jpg?dateUpdated=1713883742000",
  "links": {
   "ra": "https://ra.co/dj/weazl"
  },
  "src": [
   "https://ra.co/dj/weazl"
  ],
  "linksOk": "2026-10-29"
 },
 "Magnetude": {
  "img": "https://static.ra.co/images/profiles/square/magnetude.jpg?dateUpdated=1738720233000",
  "links": {
   "ra": "https://ra.co/dj/magnetude",
   "bc": "https://magnetude.bandcamp.com",
   "sc": "https://soundcloud.com/magnetude"
  },
  "src": [
   "https://ra.co/dj/magnetude"
  ],
  "linksOk": "2026-10-29"
 },
 "dj sweet6teen": {
  "img": "https://static.ra.co/images/profiles/square/djsweet6teen.jpg?dateUpdated=1789122042677",
  "links": {
   "ra": "https://ra.co/dj/djsweet6teen",
   "sc": "https://soundcloud.com/djsweet6teen"
  },
  "src": [
   "https://fr.ra.co/dj/djsweet6teen",
   "https://ra.co/dj/djsweet6teen"
  ],
  "linksOk": "2026-10-29"
 },
 "Konrad Kaltenböck": {
  "noImg": "2026-10-28"
 },
 "Frühwerk": {
  "noImg": "2026-10-28"
 },
 "Delaine": {
  "noImg": "2026-10-28"
 },
 "Saint A": {
  "noImg": "2026-10-28"
 },
 "Foxloe": {
  "noImg": "2026-10-28"
 },
 "Reinhard Zach": {
  "noImg": "2026-10-28"
 },
 "Leon Diamant": {
  "noImg": "2026-10-28"
 },
 "Peradise": {
  "noImg": "2026-10-28"
 },
 "Sweet Spot": {
  "noImg": "2026-10-28"
 },
 "Deleven": {
  "noImg": "2026-10-28"
 },
 "Ryta Tale": {
  "noImg": "2026-10-28"
 },
 "Clemotone": {
  "noImg": "2026-10-28"
 },
 "Countessa": {
  "noImg": "2026-10-28"
 },
 "Flual": {
  "noImg": "2026-10-28"
 },
 "Bloodsugar": {
  "noImg": "2026-10-28"
 },
 "Pinklotion": {
  "noImg": "2026-10-28"
 },
 "Gopnikbarbie": {
  "noImg": "2026-10-28"
 },
 "Hello Kiffy": {
  "noImg": "2026-10-28"
 },
 "Kristus": {
  "noImg": "2026-10-28"
 },
 "Pitch Madattak": {
  "noImg": "2026-10-28"
 },
 "Gehlektek": {
  "noImg": "2026-10-28"
 },
 "Apocalypz": {
  "noImg": "2026-10-28"
 },
 "Miss Undertaker": {
  "noImg": "2026-10-28"
 },
 "Sportacore": {
  "noImg": "2026-10-28"
 },
 "Cheddar Boyz": {
  "noImg": "2026-10-28"
 },
 "Veneno": {
  "noImg": "2026-10-28"
 },
 "PRDK": {
  "noImg": "2026-10-28"
 },
 "DNBREAK": {
  "noImg": "2026-10-28"
 },
 "Scapula": {
  "noImg": "2026-10-28"
 },
 "Skeedz": {
  "noImg": "2026-10-28"
 },
 "Rellux": {
  "noImg": "2026-10-28"
 },
 "Sinis": {
  "noImg": "2026-10-28"
 },
 "Mayez": {
  "noImg": "2026-10-28"
 },
 "Ben Leander": {
  "noImg": "2026-10-28"
 },
 "2bihonest": {
  "noImg": "2026-10-28"
 },
 "Sarah Dæwie": {
  "noImg": "2026-10-28"
 },
 "Jade Anima": {
  "noImg": "2026-10-28"
 },
 "Burr Oak": {
  "noImg": "2026-10-28"
 },
 "Zombie Cats": {
  "noImg": "2026-10-28"
 },
 "Kaama": {
  "noImg": "2026-10-28"
 },
 "Didz": {
  "noImg": "2026-10-28"
 },
 "Puppy Devil": {
  "noImg": "2026-10-28"
 },
 "ADOBEAR": {
  "noImg": "2026-10-28"
 },
 "BAD PANDA": {
  "noImg": "2026-10-28"
 },
 "YAKKA": {
  "noImg": "2026-10-28"
 },
 "Misspixie": {
  "noImg": "2026-10-28"
 },
 "Stefanie Brida": {
  "noImg": "2026-10-28"
 },
 "Wisteria": {
  "noImg": "2026-10-28"
 },
 "Sanex": {
  "noImg": "2026-10-28"
 },
 "PATRIK HOUR": {
  "noImg": "2026-10-28"
 },
 "Pau:sa": {
  "noImg": "2026-10-28"
 },
 "MA!A": {
  "noImg": "2026-10-28"
 },
 "Ferdinand Schwarz": {
  "noImg": "2026-10-28"
 },
 "Baby Blue": {
  "noImg": "2026-10-28"
 },
 "Artifex": {
  "noImg": "2026-10-28"
 },
 "LUZZT": {
  "noImg": "2026-10-28"
 },
 "Qaoz": {
  "noImg": "2026-10-28"
 },
 "Drum Dad & Bass Boy": {
  "img": "https://i.scdn.co/image/ab6761610000e5eb4ff7471ebb471b57166b4093",
  "links": {
   "sp": "https://open.spotify.com/artist/3UyclZxeiOyCtZyiWmUbBm"
  },
  "src": [
   "https://open.spotify.com/artist/3UyclZxeiOyCtZyiWmUbBm"
  ]
 },
 "lexyz0 & DJ Lotto": {
  "noImg": "2026-10-28"
 },
 "Bella": {
  "noImg": "2026-10-28"
 },
 "Nani Mag. Viech": {
  "noImg": "2026-10-28"
 },
 "TRMT": {
  "noImg": "2026-10-28"
 },
 "La Destinación Final": {
  "noImg": "2026-10-28"
 },
 "Humi": {
  "noImg": "2026-10-28"
 },
 "Luca": {
  "noImg": "2026-10-28"
 },
 "Hanno": {
  "noImg": "2026-10-28"
 },
 "Meltdown": {
  "noImg": "2026-10-28"
 },
 "Janex": {
  "noImg": "2026-10-28"
 },
 "OKO": {
  "noImg": "2026-10-28"
 },
 "Mina": {
  "noImg": "2026-10-28"
 },
 "maximo": {
  "noImg": "2026-10-28"
 },
 "Joey": {
  "noImg": "2026-10-28"
 },
 "CED": {
  "noImg": "2026-10-28"
 },
 "Lazaro": {
  "noImg": "2026-10-28"
 },
 "Distorted": {
  "noImg": "2026-10-28"
 },
 "Hannah": {
  "noImg": "2026-10-28"
 }
};
const VG={
 "Grelle Forelle": [
  48.2353,
  16.3593
 ],
 "Das Werk": [
  48.2338,
  16.3616
 ],
 "SASS Music Club": [
  48.2005,
  16.3688
 ],
 "FLUCC Wanne": [
  48.2186,
  16.3925
 ],
 "FLUCC Deck": [
  48.2186,
  16.3925
 ],
 "PRST": [
  48.2142,
  16.382
 ],
 "Weberknecht": [
  48.2063,
  16.3389
 ],
 "Club Lucia": [
  48.2085,
  16.3392
 ],
 "Kramladen": [
  48.2095,
  16.3395
 ],
 "Tagada": [
  48.2125,
  16.336
 ],
 "O der Klub": [
  48.203,
  16.369
 ],
 "Otto Wagner Areal": [
  48.21,
  16.283
 ],
 "Ottakringer Brauerei": [
  48.213,
  16.324
 ],
 "Libelle": [
  48.1968,
  16.3326
 ],
 "Club Exil": [
  48.123,
  16.33
 ],
 "Celeste": [
  48.195,
  16.356
 ]
};
const RAW=[
{"d":"2026-10-28","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Wöchentlicher Mittwochs-Rave im Werk.","en":"Weekly Wednesday rave at Das Werk."},"vok":1,"src":[["dw","https://www.daswerk.org/program"],["wwg","https://www.wienwasgeht.at/"]],"floors":[{"f":"","a":["TBA"]}],"price":"Eintritt frei"},
{"d":"2026-10-29","s":"23:00","e":"06:00","title":"Donnerstag Nacht","venue":"SASS Music Club","floors":[{"f":"","a":["Peter Pixzel","Sam Gittis","Kormos"]}],"src":[["sa","https://sassvienna.com/en/events/event/donnerstag-nacht-zyklopaudio"]],"coll":["Zyklop Audio"],"genres":["Minimal","Microhouse","House"],"price":"10–15 € / Studierende 0–5 €","note":{"de":"Zyklop Audio übernimmt den Donnerstag im SASS und holt mit Peter Pixzel einen Headliner direkt aus der Londoner House-Szene: Er ist seit 17 Jahren Mitgründer und Resident der Sunday-Night-Party WYS! im fabric London, spielte u. a. im Amnesia und Space auf Ibiza, im Rex in Paris, im D-Edge in São Paulo, im Womb in Tokio und im Club der Visionaere in Berlin und veröffentlicht auf BienAimer, WYS! Recordings und seinem Label Medola Audio. Sam Gittis kommt von der US-Ostküste, hat Residencies im Prager Underground und Releases auf Johnny Johnny, Piston Recordings und Music Stories. Kormos, Gründer von Zyklop Audio, eröffnet mit einem ausgedehnten Warm-up aus hypnotischem Minimal und Microhouse. Willkommensgetränk inklusive.","en":"Zyklop Audio takes over Thursday at SASS and brings headliner Peter Pixzel straight from London's house scene: co-founder and resident of fabric's Sunday-night party WYS! for 17 years, he has played Amnesia and Space Ibiza, Rex Paris, D-Edge São Paulo, Womb Tokyo and Club der Visionaere Berlin, with releases on BienAimer, WYS! Recordings and his own label Medola Audio. Sam Gittis hails from the US East Coast, holds residencies in Prague's underground and releases on Johnny Johnny, Piston Recordings and Music Stories. Kormos, founder of Zyklop Audio, opens with an extended warm-up of hypnotic minimal and microhouse. Welcome drink included."},"vok":1,"age":"18+","aw":1,"flyer":"https://sassvienna.com/assets/images/e/SASS_KW44_1080x1350px_DO_1-e32dcdb0.jpg","head":["Peter Pixzel"]},
{"age":"18+","d":"2026-10-30","s":"21:00","e":"06:00","title":"ZusammenKommen – Süßes oder Sauerei","venue":"Ottakringer Brauerei","coll":["hausgemacht"],"genres":["Techno"],"sexpos":1,"aw":1,"nophoto":1,"floors":[{"f":"Hefeboden","a":["21:00|Max Kernmayer b2b Konrad Kaltenböck","22:45|Baby Blue","00:30|Pau:sa","02:00|lexyz0 & DJ Lotto","03:45|Frühwerk"]},{"f":"Alte Technik","a":["21:00|Delaine","22:45|Ele Luz","00:30|Saint A","02:15|Ferdinand Schwarz","04:15|MA!A"]}],"tickets":"https://app.hausgemacht.org/events/zk-sos","note":{"de":"Halloween-Edition. Tickets nur im Vorverkauf nach Bewerbung, 18+, strenge Tür. Dresscode: Trick or Treat. Handykamera wird abgeklebt. Tickets nur im Vorverkauf nach Bewerbung; Preis nicht veröffentlicht.","en":"Halloween edition. Presale only after application, 18+, strict door. Dress code: trick or treat. Phone cameras get covered. Tickets presale only after application; price not published."},"src":[["hg","https://www.hausgemacht.org/en/events/zusammenkommen-suesses-oder-sauerei"],["sp","https://sexpositives.com/en/events/hausgemacht-ottakringer/"],["ob","https://www.ottakringerbrauerei.at/de/event/zusammenkommen-suesses-oder-sauerei/"]],"vok":1},
{"d":"2026-10-30","s":"22:00","e":"05:00","title":"FORA","venue":"PRST","src":[["ft","https://frey-tag.at/locations/club-praterstrasse"],["ft","https://frey-tag.at/kalender/fora-1?s=wJe2A2di6"]],"floors":[{"f":"","a":["ADOBEAR","BAD PANDA","YAKKA"]}],"note":{"de":"FORA feiert ein Jahr: „One Year. One Family.“ Einjähriges Jubiläum („One year. One family.“). Nicht im PRST-Ticketshop (prst.ticket.io listet nur Halloween am 31.10.).","en":"FORA celebrates its first anniversary: 'One year. One family.' One-year anniversary (\"One year. One family.\"). Not in PRST's ticket shop (prst.ticket.io only lists Halloween on 31 Oct)."}},
{"d":"2026-10-30","s":"22:00","e":"05:00","title":"Gayloween x Titti Queer Club","venue":"The Loft","coll":["Titti Queer Club"],"genres":["Techno","Pop"],"floors":[{"f":"Oben (Techno)","a":["23:00|Deleven","01:00|DORAH","02:30|Bella"]},{"f":"Unten (Pop, All-Time Favorites)","a":["22:00|Ryta Tale","23:00|Clemotone","01:00|Nani Mag. Viech","02:30|Countessa"]},{"f":"Wohnzimmer (Mixed)","a":["23:00|TRMT","00:00|La Destinación Final","01:00|Humi","02:30|Flual","03:00|Bloodsugar"]}],"price":"10–15 €","age":"18+","lgbtq":1,"note":{"de":"Queere Halloween-Party mit Techno-Floor oben, Pop unten, Drag-Show um 01:00. Keine Toleranz für Diskriminierung.","en":"Queer Halloween party with a techno floor upstairs, pop downstairs, drag show at 1 am. No tolerance for discrimination."},"vok":1,"src":[["lo","https://www.theloft.at/gayloween-x-titti-queer-club/"]]},
{"age":"18+","d":"2026-10-30","s":"22:30","e":"05:00","title":"Kranke Welt: Halloween Kick Off","venue":"Club Exil","genres":["Techno","Schranz"],"price":"21 €","floors":[{"f":"","a":["Aschenbrenner","Lorenzo Raganzini","Neon Graveyard","Stratera"]}],"tickets":"https://exil.ticket.io/4t8mMJHM/","flyer":"https://ra.co/events/2557865","nophoto":1,"note":{"de":"Vösendorf, knapp außerhalb Wiens. Kostüme willkommen.","en":"Vösendorf, just outside Vienna. Costumes welcome."},"src":[["ra","https://ra.co/events/2557865"],["ex","https://www.club-exil.at/"],["ex","https://club-exil.at/"],["exi","https://exil.ticket.io/4t8mMJHM/"],["wa","https://warda.at/events/kranke-welt-halloween/"],["vo","https://www.volume.at/events/kranke-welt-halloween-kick-off-2026-10-30/"]],"vok":1},
{"d":"2026-10-30","s":"23:00","e":"06:00","title":"Step Forward pres. Shoki","venue":"Grelle Forelle","coll":["Step Forward","Soundlabs"],"genres":["Techno","Trance"],"price":"ab 16 €","floors":[{"f":"Main Floor","a":["SHOKI287","pengg","Anna Ullrich"]},{"f":"Kitchen (Soundlabs)","a":["DizzyDray","Paul Mile","Vanessa Sa","Casanoah","Aleta"]}],"tickets":"https://www.tickettailor.com/events/stepforward/2445120","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/stepforward_301026_web.jpg","src":[["ra","https://ra.co/events/2548751"],["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/step-forward-pres-shoki?s=m1pggQmlV"],["rg","https://www.regioactive.de/party/step-forward-pres-shoki-wien-grelle-forelle-2026-10-30-229N7L7p55"],["gf","https://www.grelleforelle.com/project/3010-step-forward-pres-shoki/"],["stepf","https://www.tickettailor.com/events/stepforward/2445120"]],"vok":1,"note":{"de":"VVK ausverkauft, Tickets an der Abendkasse.","en":"Presale sold out, tickets at the door."}},
{"d":"2026-10-30","s":"23:00","e":"06:00","title":"Massimiliano Pagliara im Wohnzimmer","venue":"SASS Music Club","genres":["House","Disco","Electro","Techno"],"floors":[{"f":"","a":["Massimiliano Pagliara","Jorkes","Seba"]}],"src":[["sa","https://sassvienna.com/en/events/event/Massimiliano-Pagliara-3"]],"price":"10–15 €","note":{"de":"20 Jahre als DJ: Jubiläumstour. Welcome Drink inklusive.","en":"20 years as a DJ: anniversary tour. Welcome drink included."},"vok":1,"age":"18+","aw":1},
{"d":"2026-10-30","s":"23:00","title":"SCHLACHTHAUS w/ Toobris","venue":"FLUCC Wanne","src":[["fl","https://flucc.at/events/ZRzuEE-schlachthaus/"],["ra","https://ra.co/events/2562101"]],"vok":1,"age":"18+","e":"06:00","coll":["Schlachthaus"],"genres":["Techno"],"price":"12 € VVK / 20 € AK","floors":[{"f":"Wanne","a":["23:00|Artifex","23:00|Melchiorr","01:00|Toobris","03:00|Telicho","04:30|Silentsevir","04:30|PSMT"]}],"tickets":"https://www.eventim-light.com/at/a/6767fbfe967243041fa60b1c","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/301026_Schlachthaus_Wanne_-_Team_SCHLACHTH.max-2560x1440.jpg","aw":1,"nophoto":1},
{"d":"2026-10-30","s":"23:00","e":"06:00","title":"Schwerkraft w/ Alex TB, Prakas, Osmos","venue":"Das Werk","coll":["Schrödingers Groove","FIFI Rave"],"genres":["Schranz","Hardtechno","Groove","Techno","Hard Techno"],"price":"12–20 €","floors":[{"f":"Main","a":["Alex TB","Osmos","Prakas","Farbod","Patrick M4SS"]},{"f":"Luster · FIFI Rave","a":["Lenzi","Rui de Janeiro","Adam19","Meril Fox","Noel"]}],"tickets":"https://www.eventim-light.com/at/a/6ac14cd46095a69cdcc7962d/e/6ac8dc9e32733c9d9cec75aa","flyer":"https://ra.co/events/2557774","zero":1,"src":[["ra","https://ra.co/events/2557774"],["ev","https://events.at/venue/das-werk"],["dw","https://www.daswerk.org/program"],["ev","https://events.at/event/schwerkraft-w-alex-tb-prakas-osmos"]],"vok":1,"note":{"de":"RA nennt 18+, Hausregel der Location ist 21+.","en":"RA states 18+, the venue's house rule is 21+."}},
{"age":"18+","d":"2026-10-30","s":"23:00","e":"06:00","title":"Mijk van Dijk (live) // Joro & Joabo // Atomik","venue":"Weberknecht","coll":["Bassproduction"],"genres":["Techno"],"price":"10–15 €","floors":[{"f":"","a":["Mijk van Dijk","Joro & Joabo","Norg3n","Peter Pan","JP eXbert"]}],"tickets":"https://weberknecht.at/event/live-mijk-van-dijk-jorojoabo-atomik-norg3n-peter-pan-jpexbert/","src":[["ra","https://ra.co/events/2559561"],["we","https://weberknecht.at/event/live-mijk-van-dijk-jorojoabo-atomik-norg3n-peter-pan-jpexbert/"],["vo","https://www.volume.at/events/mijk-van-dijk-2026-10-30/"]],"flyer":"https://weberknecht.at/wp-content/uploads/2026/10/30.10.2026-1.jpg","vok":1},
{"d":"2026-10-30","s":"23:00","title":"October-Transmission","venue":"O der Klub","genres":["Melodic House & Techno","Hits & Classics","Hip Hop"],"floors":[{"f":"CORE – Hits & Classics","a":[]},{"f":"ORBIT – Melodic House & Techno","a":[]},{"f":"Konsulat – Hip Hop & Urban","a":[]}],"price":"12 €","tickets":"https://shop.o-klub.at/shop/registrations?event_id=e9c49129-2338-49db-bc6d-ddec1b491851","flyer":"https://o-klub.at/wp-content/uploads/2026/09/3010_feed-web.jpg","note":{"de":"Drei Floors, darunter Melodic House & Techno im ORBIT; Dresscode casual chic.","en":"Three floors incl. melodic house & techno in ORBIT; dress code casual chic."},"vok":1,"src":[["ok","https://o-klub.at/events/october-transmission/"]]},
{"d":"2026-10-30","s":"23:50","e":"06:00","title":"Forbidden Frequency Pre-Halloween Rave","venue":"Club Lucia","genres":["Deep Tech","Hard Trance","Hard Techno","Trance"],"floors":[{"f":"","a":["01:00|WO.IZZY"]}],"flyer":"https://www.clublucia.at/wp-content/uploads/2026/08/Lucia-Flyer-Static-e1791204192471.png","note":{"de":"Dunkler Pre-Halloween-Rave von Deep Tech über 140 BPM und Hard Trance bis Hard Techno; Erlös an Frauenhäuser.","en":"Dark pre-Halloween rave from deep tech via 140 BPM and hard trance to hard techno; proceeds go to women's shelters."},"vok":1,"src":[["cl","https://www.clublucia.at/event/forbidden-frequency-pre-halloween-rave/"],["vo","https://www.volume.at/events/forbidden-frequency-pre-halloween-rave-2026-10-30/"]]},
{"d":"2026-10-31","s":"20:00","e":"06:00","title":"Halloween auf der Lauer","venue":"TBA","coll":["Auf der Lauer"],"genres":["House","Tech House","Electro","Breaks","Techno"],"floors":[{"f":"","a":["TBA"]}],"tickets":"https://ra.co/events/2555958","flyer":"https://ra.co/events/2555958","note":{"de":"Location wird kurz vorher bekanntgegeben. 2 Floors + Open Air.","en":"Location announced shortly before. 2 floors + open air."},"src":[["ra","https://ra.co/events/2555958"]]},
{"age":"18+","d":"2026-10-31","s":"21:00","e":"06:00","title":"Tasteless 3 Yrs Anniversary – Halloween Special","venue":"Otto Wagner Areal","coll":["Tasteless"],"genres":["House","Minimal"],"price":"15–45 €","floors":[{"f":"","a":["dj sweet6teen","Katia Curie","COZi","Nizar Sarakbi","PATRIK HOUR","Luca"]}],"tickets":"https://events.tickethead.io/de/tickethead/event/5345","flyer":"https://ra.co/events/2550640","note":{"de":"Eingang: Baumgartner Höhe 1 – Küche.","en":"Entrance: Baumgartner Höhe 1 – kitchen building."},"src":[["ra","https://ra.co/events/2550640"],["ci2","https://circl.at/halloween-wien"]]},
{"d":"2026-10-31","s":"21:00","e":"05:00","title":"KSOT – Halloween Warehouse Rave","venue":"Ottakringer Brauerei","coll":["KSOT"],"genres":["Techno","House"],"price":"€25–50 (Early Entry bis 22h €35, Last Release €50, Late Entry ab 01:30 €25)","age":"18+","tickets":"https://ksot.ticket.io/6tmEGJSh/","note":{"de":"Halloween-Rave in der Brauerei, Kostüme erwünscht. Kein Wiedereinlass, keine leicht brennbare Deko. Mehrere Floors (House & Techno), Line-up nicht veröffentlicht. Kein Wiedereinlass.","en":"Halloween warehouse rave at the brewery, costumes encouraged. No re-entry, no flammable decorations. Several floors (house & techno), lineup not published. No re-entry."},"src":[["wa","https://warda.at/events/ksot-halloween-warehouse-rave/"],["vo","https://www.volume.at/events/halloween-warehouse-rave-2026-10-31/"],["ksot","https://ksot.ticket.io/6tmEGJSh/"],["ob","https://www.ottakringerbrauerei.at/de/event/ksot-halloween-warehouse-rave/"],["tt","https://www.1000thingsmagazine.com/de/a/29288/halloween-events-wien/"]],"floors":[{"f":"","a":["TBA"]}],"vok":1},
{"age":"18+","d":"2026-10-31","s":"22:00","e":"05:00","title":"Housetiere w/ Chata","venue":"Tagada","coll":["Housetiere","Entrance"],"genres":["House","Dub Techno","Techno"],"price":"€10","floors":[{"f":"","a":["Chata","Foxloe","Julani","Hanno"]}],"flyer":"https://ra.co/events/2554895","src":[["ra","https://ra.co/events/2554895"],["ft","https://frey-tag.at/locations/tagada"],["ci2","https://circl.at/halloween-wien"],["ft","https://frey-tag.at/kalender/housetiere?s=QUsRb8EW3"]],"tickets":"https://app.circl.at/festival/8eacca65-ee89-4736-9d21-16aae9ddb6d8"},
{"age":"18+","d":"2026-10-31","s":"22:00","e":"06:00","title":"Pink Mayhem – Hardtechno Halloween","venue":"FLUCC Deck","coll":["Pink Mayhem"],"genres":["Hardtechno","Trance","Hard Techno","Techno"],"price":"5 € vor 0 Uhr / 10 € danach (nur AK)","floors":[{"f":"Deck","a":["23:00|Pinklotion","23:00|Kristus","01:00|Bludhound","01:00|Gopnikbarbie","03:00|Meltdown","04:30|Hello Kiffy"]}],"flyer":"https://ra.co/events/2564981","aw":1,"zero":1,"note":{"de":"Nur Abendkassa. Kostüm erwünscht. Awareness-Team erkennt man an Lichterketten. Nur Abendkasse, first come first serve; Kostüme erwünscht.","en":"Door sales only. Come in costume. The awareness team wears fairy lights. Door sales only, first come first served; costumes encouraged."},"src":[["fl","https://flucc.at/events/9EYeqx-pink-mayhem/"],["ra","https://ra.co/events/2564981"]],"vok":1},
{"d":"2026-10-31","s":"22:00","title":"Halloween Rave","venue":"FLUCC Wanne","genres":["Tekno","Acid","Hardtek","Raggatek"],"src":[["fl","https://flucc.at/events/25TgZH-halloween-rave/"],["vo","https://www.volume.at/events/?genre=techno"],["vo","https://www.volume.at/events/halloween-rave-2026-10-31-2/"]],"price":"15 € (nur AK)","floors":[{"f":"Wanne","a":["Pitch Madattak","Gehlektek","Apocalypz","Cheddar Boyz","Janex","Miss Undertaker","Sportacore","Veneno"]}],"vok":1,"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/311026_HalloweenRave_Wanne_Flyer_-_Martin.max-2560x1440.jpg"},
{"d":"2026-10-31","title":"Halloween Transmission","venue":"O der Klub","genres":["Melodic House","Techno","Club Charts","Hip Hop"],"price":"VVK 17 €","src":[["vo","https://www.volume.at/events/?genre=techno"],["ok","https://o-klub.at/events/halloween-3/"],["ci2","https://circl.at/halloween-wien"],["wa","https://warda.at/events/halloween-transmission-2/"],["vo","https://www.volume.at/events/halloween-transmission-2026-10-31/"]],"vok":1,"s":"22:00","age":"18+","coll":["SIGNAL","Super Disco"],"floors":[{"f":"Core · Super Disco","a":["Club Charts & Classics"]},{"f":"Orbit · SIGNAL","a":["Melodic House & Techno"]},{"f":"Konsulat","a":["Hip Hop & Urban"]}],"e":"06:00","tickets":"https://shop.o-klub.at/shop/registrations?event_id=c351cd18-0867-4f4d-9971-5b8bdba00e07","flyer":"https://o-klub.at/wp-content/uploads/2026/08/Halloween_feed-web.jpg"},
{"d":"2026-10-31","s":"22:00","title":"Halloqueer","venue":"Celeste","coll":["Ravenbogen"],"genres":["House","Techno"],"lgbtq":1,"price":"Spende, Richtwert 10 €","note":{"de":"Gratis für Menschen mit wenig Einkommen.","en":"Free for people on low incomes."},"src":[["gn","https://goodnight.at/magazin/freizeit/events-wien-am-wochenende"],["ci2","https://circl.at/halloween-wien"],["ce","https://celeste.co.at/"]],"e":"06:00","floors":[{"f":"Club","a":["Ben Leander","2bihonest","Sarah Dæwie","Jade Anima","saschka"]}],"vok":1},
{"d":"2026-10-31","s":"22:00","title":"KØRE Halloween Rave 2026","venue":"Lugner City","coll":["KØRE"],"genres":["Drum & Bass"],"floors":[{"f":"","a":["Burr Oak","OKO","Zombie Cats","Drum Dad & Bass Boy","Kaama","Didz","Mina","Puppy Devil"]}],"price":"ab €22","tickets":"https://tickets.nfctron.eu/event/kore-event-e-u/k-re-halloween-rave-2026","note":{"de":"Erstes KØRE-Event im Einkaufszentrum Lugner City; plus Special Guest. Plus Special Guest. Kostüm erwünscht. 1000things nennt €28.","en":"KØRE's first event inside the Lugner City mall; plus a special guest. Plus special guest. Costumes welcome. 1000things lists €28."},"src":[["vo","https://www.volume.at/events/koere-halloween-rave-2026-2026-10-31/"],["ci2","https://circl.at/halloween-wien"],["tt","https://www.1000thingsmagazine.com/de/a/29288/halloween-events-wien/"],["kore","https://tickets.nfctron.eu/event/kore-event-e-u/k-re-halloween-rave-2026"]],"age":"18+"},
{"d":"2026-10-31","s":"23:00","e":"06:00","title":"Halloween | The Tunegirl Live","venue":"Grelle Forelle","genres":["Techno"],"price":"ab 15 €","floors":[{"f":"Mainfloor","a":["The Tunegirl","Alex Maurer","Tezibel"]},{"f":"Kitchen","a":["DJ Bottleghost","DJ Veloziped","Altroy Jerome"]}],"src":[["rg","https://www.regioactive.de/party/halloween-the-tunegirl-live-wien-grelle-forelle-2026-10-31-kp8SmQRb0s"],["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/halloween-less-than-greater-than-less-than?s=MeyxkrG_z"],["vo","https://www.volume.at/events/?genre=techno"],["gf","https://www.grelleforelle.com/project/3110-halloween-the-tunegirl-live/"],["vo","https://www.volume.at/events/halloween-the-tunegirl-live-2026-10-31/"]],"vok":1,"tickets":"https://www.eventim-light.com/at/a/69284c91e54d302ec82b2635/e/6ab2528e8c206ca972684214","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/halloween26.jpg"},
{"age":"18+","d":"2026-10-31","s":"23:00","e":"11:00","title":"Halloween at PRST w/ Camion Bazar & Franziska Berns","venue":"PRST","genres":["House","Tech House","Techno"],"price":"15–25 €","floors":[{"f":"","a":["Camion Bazar","Franziska Berns","Andy Catana","Apua","Luca","Rizmo","Reinhard Zach","Stipo"]}],"flyer":"https://ra.co/events/2549018","note":{"de":"12 Stunden, 23–11 Uhr.","en":"12 hours, 11pm–11am."},"src":[["ra","https://ra.co/events/2549018"],["ft","https://frey-tag.at/locations/club-praterstrasse"],["rs","https://rausgegangen.com/at/en/locations/prst-club/"],["pr","https://prst.ticket.io/STnPV92b/"],["ft","https://frey-tag.at/kalender/prst-halloween?s=e4YgMegi7"],["vo","https://www.volume.at/events/prst-invites-halloween-special-2026-10-31/"]],"tickets":"https://prst.ticket.io/STnPV92b/","vok":1},
{"d":"2026-10-31","s":"23:00","e":"05:00","title":"Connecting People","venue":"SASS Music Club","coll":["Connecting People"],"floors":[{"f":"","a":["Peradise","Sweet Spot","maximo"]}],"src":[["sa","https://sassvienna.com/en/events/event/connecting-people-31-10"]],"genres":["House","Electro","New Wave","Minimal"],"price":"10–15 €","vok":1,"age":"18+","aw":1,"flyer":"https://sassvienna.com/assets/images/4/SASS_KW44_1080x1350px_SA_1-f5abd174.jpg"},
{"d":"2026-10-31","title":"Halloween Special","venue":"Das Werk","floors":[{"f":"","a":["Joey","Crystal O","LUZZT","Dj Wifi","Arman Shadow","Qaoz","Trugbild"]}],"src":[["ev","https://events.at/event/halloween-special"],["dw","https://www.daswerk.org/program"]],"tickets":"https://www.eventim-light.com/at/a/623a01d54f99ba1c8b632d22/e/6ad0d75e32733c9d9cec8410","s":"23:00","vok":1},
{"d":"2026-10-31","s":"23:00","title":"The Hive x Collapse – Face Off Halloween Special","venue":"Flex","coll":["The Hive","Collapse"],"floors":[{"f":"","a":["Magnetude","PRDK","CED","DNBREAK","Scapula","Weazl","Sinis","Lazaro","Mayez","Skeedz","Rellux","Distorted"]}],"price":"9–15 € (VVK)","tickets":"https://events.tickethead.io/de/tickethead/event/5561","flyer":"https://flex.at/wp-content/uploads/2026/09/814428341_1741700054047618_4403690900796600159_n.jpg","note":{"de":"Halloween-Face-Off mit Magnetude (UK) und PRDK (CZ) plus lokalen F2F-Sets.","en":"Halloween face-off with Magnetude (UK) and PRDK (CZ) plus local face-to-face sets."},"vok":1,"src":[["fx","https://flex.at/event/the-hive-x-collapse/"],["wa","https://warda.at/events/face-off-halloween-special/"],["vo","https://www.volume.at/events/face-off-halloween-special-2026-10-31/"]],"genres":["Drum & Bass"]},
{"d":"2026-10-31","s":"23:59","e":"05:00","title":"Homesounds – Local FLINTA for local homeless","venue":"Club Lucia","floors":[{"f":"","a":["Hannah","Sanex","Misspixie","Stefanie Brida","Wisteria"]}],"flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/FunPic_20261012_113837324.jpg","note":{"de":"Halloween-Charity-Party mit FLINTA*-DJs; alle Spenden gehen an neunerhaus.","en":"Halloween charity party with FLINTA* DJs; all donations go to neunerhaus."},"vok":1,"src":[["cl","https://www.clublucia.at/event/homesounds-local-flinta-for-local-homeless-%e2%99%a5/"],["vo","https://www.volume.at/events/homesounds-2026-10-31/"]],"genres":["Electronic"]},
{"d":"2026-11-01","s":"06:00","e":"11:00","title":"Morgengymnastik × Connecting People","venue":"SASS Music Club","coll":["Connecting People"],"floors":[{"f":"","a":["Memet Acuma","Leon Diamant"]}],"src":[["sa","https://sassvienna.com/en/events/event/morgengymnastik-171"]],"genres":["House","Techno","Electro","Broken Beat"],"price":"15 €","vok":1,"age":"18+","aw":1,"flyer":"https://sassvienna.com/assets/images/d/SASS_KW44_1080x1350px_SO_0111-ac726fc8.jpg"},
{"d":"2026-11-01","s":"14:00","e":"20:00","title":"FLUT x Callshop Radio – Week 44","venue":"FLUCC Deck","coll":["Spumante Records","Callshop Radio"],"price":"free","note":{"de":"Sonntags-DJ-Session mit Livestream auf Callshop Radio, Line-up tba, Eintritt frei.","en":"Sunday DJ session streamed live on Callshop Radio, line-up tba, free entry."},"vok":1,"src":[["fl","https://flucc.at/events/S3pHTJ-flut-x-callshop-radio-week-44-26/"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-04","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Wöchentlicher Mittwochs-Rave im Werk.","en":"Weekly Wednesday rave at Das Werk."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-05","s":"20:30","title":"Party Modern | SCH:CHT","venue":"FLUCC Deck","coll":["Wien Modern"],"genres":["Experimental"],"src":[["fl","https://flucc.at/events/HzQ4kp-party-modern-schcht/"]],"price":"12 € VVK","tickets":"https://www.wienmodern.at/2026-party-modern-schcht-de-4531","vok":1},
{"d":"2026-11-06","s":"21:00","title":"up/or with NEXUS (live), k means, SAMI, DJ Fred & zey","venue":"FLUCC Deck","floors":[{"f":"","a":["NEXUS","k means","SAMI","DJ Fred","zey"]}],"src":[["fl","https://flucc.at/events/X7gLPJ-upor-with-nexus-live-k-means-sami-dj-fred-zey/"]],"e":"04:30","coll":["Bestand","up/or"],"genres":["Experimental","Bass","Grime","Dubstep","Breaks"],"price":"VVK 11 € · AK 14 €","tickets":"https://kupfticket.com/en/events/upor-bestand-nov26","note":{"de":"Reihe für politischen Ausdruck und klangliches Experiment. Ermäßigte Tickets online.","en":"Series for political expression and sonic experiments. Reduced tickets online."},"vok":1},
{"d":"2026-11-06","s":"22:00","title":"Biosphere – The Techno Spirit of 1997","venue":"Club Exil","coll":["Fluffig"],"genres":["Techno","Acid"],"floors":[{"f":"Bridge Floor","a":["Sam Paganini","The Advent","Joro & Joabo","Elex Red","Tolaris","MC Mars","MC Spot"]},{"f":"Maschinenraum by Fluffig","a":["Anna Ullrich","MARØ","Who is Ela¿","DORAH"]},{"f":"Cyberspace Artist Lab","a":["DJ SDRICCI","Marilou","Raphael Warg","LĪVA"]}],"note":{"de":"8 Stunden, 3 Floors. Vösendorf.","en":"8 hours, 3 floors. Vösendorf."},"src":[["ex","https://www.club-exil.at/"],["ex","https://club-exil.at/"],["bio","https://www.biosphere1997.com/"],["ra","https://ra.co/events/2523457"],["wa","https://warda.at/events/biosphere-club-exil/"]],"vok":1,"tickets":"https://stagedates.com/events/biosphere-club-exil-vosendorf-20261106-HQLYL","price":"ab 33 € (Zündung 1 ausverkauft)","e":"06:00","age":"20+"},
{"d":"2026-11-06","s":"22:00","e":"04:45","title":"Empyreon – Vol. III","venue":"The Loft","coll":["Empyreon","Kollektiv Birdhouse"],"genres":["Progressive House"],"floors":[{"f":"Wohnzimmer","a":["22:00|Mary Slim","23:40|Edictum","01:20|Matt Ludlam","03:00|DJ Andy"]}],"price":"Freie Spende","flyer":"https://www.theloft.at/wp-content/uploads/2026/10/2026.11.06_empyreon-vol.-iii.png","note":{"de":"Progressive-House-Nacht von Kollektiv Birdhouse, von deep bis dunkel-hypnotisch; freie Spende.","en":"Progressive house night by Kollektiv Birdhouse, from deep to dark and hypnotic; pay what you want."},"vok":1,"src":[["lo","https://www.theloft.at/empyreon-vol-iii/"]]},
{"d":"2026-11-06","s":"23:00","e":"06:00","title":"Mahlwerk × Fadercult w/ Afem Syko & Lisa Korver","venue":"Grelle Forelle","coll":["Mahlwerk","Fadercult"],"genres":["Techno","Trance","Drum & Bass","Bounce","Hardgroove"],"price":"ab 13 €","floors":[{"f":"Mainfloor","a":["Afem Syko","Lisa Korver","maro","Max Wagner","WO.IZZY","Kat Ze"]},{"f":"Kitchen (Fadercult Berlin)","a":["Sony2k","Linus Villa","Ben Derris","Sophti"]}],"src":[["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/mahlwerk-and-fadercult?s=KW-rAGWQH"],["gf","https://www.grelleforelle.com/project/0611-mahlwerk-fadercult-w-afem-syko-lisa-horver/"],["ra","https://ra.co/events/2544505"]],"vok":1,"tickets":"https://808factory.stager.co/shop/default/events/111702111","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/mahlwerk_061126_web.jpg","age":"21+"},
{"d":"2026-11-06","s":"23:00","e":"06:00","title":"WOS Soundsystem invites Josefina Tapia","venue":"SASS Music Club","coll":["WOS Soundsystem"],"floors":[{"f":"","a":["Josefina Tapia","Apua","Bambi-S","Oliviero"]}],"src":[["sa","https://sassvienna.com/en/events/event/WOS-josefine%20tapia"]],"price":"15–18 €","vok":1,"age":"18+","aw":1},
{"d":"2026-11-06","title":"GDN Klubnacht w/ Tham","venue":"Das Werk","coll":["GDN"],"floors":[{"f":"Mainfloor","a":["THAM"]},{"f":"","a":["Anatol","Hello Kiffy","High on Melancholia","Kristus","LavendL","MATIVIO"]}],"src":[["ev","https://events.at/venue/das-werk"],["dw","https://www.daswerk.org/program"],["ev","https://events.at/event/gdn-klubnacht-w-tham"]],"s":"23:00","genres":["Techno","Hardgroove","Schranz","Hardbounce"],"tickets":"https://www.eventim-light.com/at/a/623a01d54f99ba1c8b632d22/e/6aca348b32733c9d9cec76ae","flyer":"https://image.events.at/images/facebook/9358032/GDN_KLUBNACHT_w_THAM_c_GDN_222.jpg?versionId=f9ab791072d1","aw":1,"nophoto":1,"vok":1},
{"d":"2026-11-06","s":"23:00","title":"Im Freudentaumel","venue":"FLUCC Wanne","coll":["Im Freudentaumel"],"src":[["fl","https://flucc.at/events/QgUEhp-im-freudentaumel/"]],"e":"06:00","genres":["Techno"],"price":"10–15 €","tickets":"https://kupfticket.com/events/im-freudentaumel","floors":[{"f":"","a":["Scheibosan","Glitzer & Bass","Nafaka & Lipo","Kollektiv Sheesh"]}],"note":{"de":"Verträumter Techno, Lichtshow, verspielte Missionen und Gratis-Sekt.","en":"Dreamy techno, light show, playful missions and free sparkling wine."},"vok":1,"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/kupf.min-2560x1440.png"},
{"d":"2026-11-06","s":"23:00","title":"BLUR with E.LINA","venue":"PRST","floors":[{"f":"","a":["E.LINA"]}],"src":[["rs","https://rausgegangen.com/at/en/locations/prst-club/"],["ra","https://ra.co/events/2553366"]],"e":"06:00","genres":["House","Tech House"],"coll":["Kollektiv Ost:West"],"price":"online 12–20 €, AK 16 € vor 0 Uhr / 20 € danach","age":"18+","tickets":"https://ra.co/events/2553366"},
{"d":"2026-11-06","s":"23:00","title":"Max Styler","venue":"O der Klub","coll":["SIGNAL"],"genres":["Indie Dance","House"],"floors":[{"f":"","a":["Max Styler"]}],"price":"ab 12 €","tickets":"https://shop.o-klub.at/shop/registrations?event_id=021e8ed5-99cc-491b-876a-377ca7925ade","flyer":"https://o-klub.at/wp-content/uploads/2026/08/Max_feed-web.jpg","note":{"de":"Signal präsentiert Max Styler (Beatport #1 mit „Greece 2000“) auf Headline-Tour.","en":"Signal presents Max Styler (Beatport #1 with 'Greece 2000') on his headline tour."},"vok":1,"src":[["ok","https://o-klub.at/events/max-styler/"],["ra","https://ra.co/events/2519490"],["vo","https://www.volume.at/events/signal-presents-max-styler-2026-11-06/"]],"e":"06:00","age":"18+"},
{"d":"2026-11-06","s":"23:00","title":"Soularium w/ Santo","venue":"The Loft","coll":["Soularium"],"genres":["House"],"floors":[{"f":"Oben","a":["Santo"]}],"price":"12–17 €","note":{"de":"House-Nacht Soularium mit Santo (CH) im Obergeschoss.","en":"Soularium house night with Santo (CH) upstairs."},"vok":1,"src":[["lo","https://www.theloft.at/soularium-w-santo-ch/"]]},
{"d":"2026-11-06","s":"23:45","title":"Sorry Mom – herbstrascheln","venue":"Club Lucia","coll":["Sorry Mom"],"genres":["Techno","Progressive","Psytech","Melodic Techno"],"price":"10 €","floors":[{"f":"","a":["Gugu","Hanneken","PA_olo","Romen Est Omen"]}],"src":[["osh","https://ohschonhell.at/orte/club+lucia/963"],["cl","https://www.clublucia.at/event/sorry-mom-herbstrascheln/"],["ra","https://ra.co/events/2521239"]],"vok":1,"e":"06:00","flyer":"https://www.clublucia.at/wp-content/uploads/2026/09/26_11-lucia-1080x1440-1-e1788265151476.png"},
{"d":"2026-11-07","s":"17:00","e":"23:00","title":"Kyau & Albert (Extended Set)","venue":"U4","coll":["euphonic records"],"genres":["Progressive House","Trance"],"floors":[{"f":"","a":["Kyau & Albert","Peter Illias","CREEXX","MJT & RPM"]}],"price":"€19","age":"18+","tickets":"https://ra.co/events/2506486","src":[["ra","https://ra.co/events/2506486"],["u4","https://www.u4.at/events/kyau-albert-live/"]],"vok":1},
{"d":"2026-11-07","s":"18:00","e":"00:00","title":"SXXPLICIT Pop-up Club","venue":"Libelle","coll":["Pole Circle","Slutlabs"],"sexpos":1,"lgbtq":1,"tickets":"https://events.eventjet.at/e/sxxplicit-vienna/","note":{"de":"Queerer Pop-up-Club mit Shows. Consent-Regeln werden beim Einlass erklärt. Pole Circle × Slutlabs; Stage-Shows, Pole- & Lapdances. Ticket garantiert keinen Einlass (Door-Selection). Keine DJs/Genres angegeben.","en":"Queer pop-up club with shows. Consent rules explained at the door. Pole Circle × Slutlabs; stage shows, pole & lap dances. Ticket does not guarantee entry (door selection). No DJs/genres listed."},"src":[["sp","https://sexpositives.com/en/events/sxxplicit-wien-2026-11-07/"],["li","https://www.libelle.at/events/sxxplicit-by-pole-circle-x-slutlabs/"],["ej","https://events.eventjet.at/e/sxxplicit-vienna/"]],"price":"€45","vok":1},
{"d":"2026-11-07","s":"21:00","title":"Little Beat More","venue":"FLUCC Deck","coll":["Little Beat More"],"src":[["fl","https://flucc.at/events/aSALhK-little-beat-more/"]],"vok":1},
{"d":"2026-11-07","s":"22:00","e":"06:00","title":"Fuelized 3 Year Anniversary w/ Minor Forms & Chrome","venue":"Club Lucia","coll":["Fuelized"],"genres":["Drum & Bass"],"floors":[{"f":"","a":["Minor Forms","Chrome","AudioDevice","ICY.DJ","Incognito","M4YB3","Shaxoron","Snowtek"]}],"price":"15 € (AK)","flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/Fuelized_3Years_Feed_Full_Lineup-scaled.jpg","note":{"de":"3 Jahre Fuelized: minimal, deep & soulful Drum & Bass mit Minor Forms und Chrome (UK).","en":"3 years of Fuelized: minimal, deep & soulful drum & bass with Minor Forms and Chrome (UK)."},"vok":1,"src":[["cl","https://www.clublucia.at/event/fuelized-proudly-pres-3-yearanniversary-w-minor-forms-uk-chrome-uk/"],["ra","https://ra.co/events/2554882"]],"age":"18+"},
{"d":"2026-11-07","s":"22:00","e":"06:00","title":"traveling without moving","venue":"Funkhaus","coll":["created-on-earth"],"genres":["House"],"floors":[{"f":"","a":["Felix Rupprecht","Pancratio","Rayya"]}],"age":"18+","tickets":"https://ra.co/events/2547379","src":[["ra","https://ra.co/events/2547379"]]},
{"d":"2026-11-07","s":"23:00","e":"06:00","title":"Mixed Vienna w/ Prada2000","venue":"Grelle Forelle","price":"ab 15 €","floors":[{"f":"Mainfloor","a":["Prada2000","Catlex","Suitside","Aschenbrenner"]},{"f":"Kitchen","a":["DJ Parkverbot","Lieblos","Valera","Sasuma"]}],"src":[["ft","https://frey-tag.at/kalender/mixed-vienna?s=txQP29ZDl"],["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/0711-mixed-vienna-w-prada2000/"]],"vok":1,"tickets":"https://www.eventim-light.com/at/a/697ca7de355c727b43abf53b/e/6ab3d19b6095a69cdcc777b2","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/mixed_071126_web.jpg"},
{"d":"2026-11-07","title":"Techno Obscene #35 – 3 Year Anniversary","venue":"Das Werk","coll":["Nine O Nine","LSH","909techno"],"genres":["Hardtechno","Detroit Techno","Hardgroove","Hypnotic Techno","Dub Techno"],"floors":[{"f":"Laster Floor · Rave","a":["Albin Brezlan b2b Huebl","Jayzo","TBA"]},{"f":"Luster Floor · Groove","a":["Vibechen","Dana Melissa","URBANIST"]}],"src":[["ev","https://events.at/event/techno-obscene-35"],["dw","https://www.daswerk.org/program"],["ra","https://ra.co/events/2556685"]],"zero":1,"nophoto":1,"tickets":"https://www.eventim-light.com/at/a/623a01d54f99ba1c8b632d22/e/6ace449532733c9d9cec7e01","note":{"de":"No-Shirt-No-Party-Policy für alle Geschlechter. Come as you are.","en":"No-shirt-no-party policy for all genders. Come as you are."},"s":"23:00","flyer":"https://image.events.at/images/cfs_616w/9360010/TECHNO_OBSCENE_35_c_909_222.jpg?versionId=9a0046eecce1","vok":1,"e":"06:00","price":"10–15 € (1st wave 9,09 €)"},
{"d":"2026-11-07","title":"served invites Harmony Rec. × hereandthere","venue":"Secret Location","coll":["served","Harmony Rec.","hereandthere"],"note":{"de":"Live-Sets, Labels aus Prag. Location geheim. Kein Ticketlink: Vorab-Registrierung über Formular im served-Telegram-Kanal (via Instagram @serve.ddd), Selektion an der Tür.","en":"Live sets, labels from Prague. Secret location. No ticket link: pre-registration via form in the served Telegram channel (via Instagram @serve.ddd), door selection."},"src":[["ra","https://ra.co/events/2542405"]],"s":"23:00","e":"06:00","genres":["Techno","House"],"floors":[{"f":"","a":["anxxxious_t","Ayū","Georgia Bird","Melimeko","Menal Batti","Pink Concrete","Yan","saschka"]}],"price":"€15–20 (Abendkasse, nur bar)","age":"18+","lgbtq":1},
{"d":"2026-11-07","title":"technolog Special with Michel Lauriola (ARG)","venue":"Kramladen","coll":["technolog"],"genres":["Techno","Industrial"],"floors":[{"f":"","a":["23:00|anexate","00:15|Hetum","01:30|Michel Lauriola","04:00|Roton"]}],"src":[["vo","https://www.volume.at/drum-and-bass-techno-events-in-wien/"],["wa","https://warda.at/events/technolog-special-with-michel-lauriola-arg-kramladen/"],["ra","https://de.ra.co/events/2557226"],["ra","https://ra.co/events/2557226"],["vo","https://www.volume.at/events/technolog-special-with-michael-lauriola-arg-2026-11-07/"],["tl","https://www.technolog.wtf"]],"s":"23:00","e":"06:00","price":"Eintritt frei / free entry","age":"21+","note":{"de":"Freier Eintritt, daher kein Ticketlink.","en":"Free entry, hence no ticket link."}},
{"d":"2026-11-07","s":"23:00","title":"303 presents Hanzom Label Night","venue":"Flex","coll":["303","Hanzom"],"genres":["Drum & Bass","Neurofunk"],"tickets":"https://www.oeticket.com/event/303-presents-hanzom-label-night-flex-22234345/","flyer":"https://flex.at/wp-content/uploads/2026/10/Flyer_303_07112026.jpeg","note":{"de":"Hanzom-Labelnacht: harter Neurofunk mit schwerem Bass.","en":"Hanzom label night: hard-hitting neurofunk with heavy bass."},"vok":1,"src":[["fx","https://flex.at/event/303-presents-hanzom-label-night/"],["ev","https://events.at/event/303-presents-hanzom-label-night"],["ot","https://www.oeticket.com/noapp/eventseries/303-presents-hanzom-label-night-4257591/?affiliate=A21"]],"floors":[{"f":"","a":["TBA"]}],"price":"ab 18,75 €"},
{"d":"2026-11-07","s":"23:00","e":"06:00","title":"Cosmic BirthRave","venue":"Rhiz","coll":["Fader Friends","Cosmic Egg"],"genres":["Techno","Hardcore"],"floors":[{"f":"","a":["adrialin","Enoltra","The Bear","gåpe","wert","Luminoise","Nikø Nøx","Zer0Ton1n","RIETVELD"]}],"price":"5 €","age":"18+","tickets":"https://ra.co/events/2563381","src":[["ra","https://ra.co/events/2563381"]]},
{"d":"2026-11-07","s":"23:30","title":"Klub Halal","venue":"FLUCC Wanne","coll":["Klub Halal","Habibi Party"],"src":[["fl","https://flucc.at/events/ipjeCW-klub-halal/"],["ra","https://ra.co/events/2552786"]],"price":"12 € VVK","tickets":"https://www.tickettailor.com/events/klubhalal/2454809","vok":1,"e":"06:00","genres":["Club","Electronica"],"floors":[{"f":"","a":["MAH MOOD","Rakans","Sherine Falasteen","MODI","Sanadrilla"]}],"age":"18+","aw":1,"lgbtq":1,"zero":1,"note":{"de":"Titel auf RA: KLUB PALESTINE – Fundraiser, 100% Gewinn an 5 queere/trans palästinensische Geflüchtete in Ägypten. Awareness-Team, Filmen nur auf der Bühne, Türpolitik.","en":"RA title: KLUB PALESTINE – fundraiser, 100% of profits to 5 queer/trans Palestinian refugees in Egypt. Awareness team, filming only on stage, door policy."}},
{"d":"2026-11-08","s":"20:00","e":"23:45","title":"Sonntag'sdisco Vol. 28 w/ The Res","venue":"FLUCC Deck","floors":[{"f":"Deck","a":["The Res","Drehli Robnik"]}],"note":{"de":"Nur Abendkasse, Preis noch offen.","en":"Door sales only, price to be announced."},"src":[["fl","https://flucc.at/events/f9RAFs-sonntag-sdisco-081126/"]],"vok":1,"price":"tba (nur AK)","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/081126_Sonntagsdisco_28_FLUCC_Deck.max-2560x1440.jpg"},
{"d":"2026-11-11","s":"21:00","e":"04:00","title":"Köstlich x Gürtelgroove","venue":"Club Lucia","coll":["Köstlich","Gürtelgroove"],"genres":["UK Garage","Hardgroove","Techno"],"floors":[{"f":"","a":["POSTSCRIPTUM","FESH","Adam19","Antone","Dudas","Chris Eru","Mahofsky"]}],"price":"free (Spenden willkommen)","flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/2026-11-11-guertelgroove_koestlich_1080-x-1350.jpeg","note":{"de":"Mittwochs-Groove-Nacht mit UKG, Hardgroove und Techno; Eintritt frei. Kein Platz für Rassismus, Sexismus, Faschismus.","en":"Wednesday groove night with UKG, hardgroove and techno; free entry. No room for racism, sexism, fascism."},"vok":1,"src":[["cl","https://www.clublucia.at/event/kostlich-x-gurtelgroove/"]]},
{"d":"2026-11-11","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Wöchentlicher Mittwochs-Rave im Werk.","en":"Weekly Wednesday rave at Das Werk."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-12","s":"19:00","e":"23:00","title":"sama recordings pres. s c h w e b e n","venue":"kv.r.","coll":["sama recordings"],"genres":["Experimental","Electronica"],"floors":[{"f":"","a":["Philipp Otterbach","Adina Camhy","Andrea Ida"]}],"price":"16,95–22,60 € (Regular/Supporter)","age":"18+","tickets":"https://kupfticket.com/en/shops/samarecordings","note":{"de":"Live-Sets von Philipp Otterbach (Wien-Premiere) und Adina Camhy, DJ-Set Andrea Ida.","en":"Live sets by Philipp Otterbach (Vienna premiere) and Adina Camhy, DJ set by Andrea Ida."},"src":[["ra","https://ra.co/events/2564492"]]},
{"d":"2026-11-13","s":"20:00","title":"Queertactics Festival Party","venue":"FLUCC Deck","coll":["Queertactics"],"lgbtq":1,"src":[["fl","https://flucc.at/events/H7HuvP-queertactics-festival-party/"]],"vok":1},
{"d":"2026-11-13","s":"21:00","e":"02:00","title":"50 Herz / Sodomland","venue":"Kollektiv Kaorle","coll":["50 Herz"],"genres":["Electro","Industrial"],"floors":[{"f":"","a":["Kilroy","Gush Valley","Darina","Djinn Sylva","Sodomland","Xavior"]}],"price":"€15–20 (Soli €15 / Standard €18 / Supporter €20)","age":"18+","tickets":"https://shop.copilot.events/kaorle/events/ecc24459-e741-4ab7-9c18-851c22f5783c","note":{"de":"Freitag-der-13.-Party mit dem Berliner Duo Sodomland, dazu Live-Debüt von Darina & Djinn Sylva. Ticketshop der Location nennt Beginn 21:00 (RA: 20:00).","en":"Friday-the-13th party headlined by Berlin duo Sodomland, plus the live debut of Darina & Djinn Sylva. Venue ticket shop gives start 21:00 (RA: 20:00)."},"src":[["ra","https://ra.co/events/2555979"],["ka","https://shop.copilot.events/kaorle/events/ecc24459-e741-4ab7-9c18-851c22f5783c"]],"vok":1},
{"d":"2026-11-13","s":"23:00","title":"Zuckerwatt w/ MIJA","venue":"Grelle Forelle","coll":["Zuckerwatt","Cybertribe"],"genres":["Hardgroove","House","Techno","Hardcore"],"floors":[{"f":"Mainfloor","a":["MIJA","PartyPauli","Who is Ela¿"]},{"f":"Kitchen (Cybertribe)","a":["DJ Backstage","ENJA","Spud Bencer","Voltmarie"]}],"tickets":"https://zuckerwatt.ticket.io/lrReXJvU/","note":{"de":"Abendkassa ab 23:00.","en":"Door sales from 11pm."},"src":[["rg","https://www.regioactive.de/party/zuckerwatt-w-mija-grelle-forelle-wien-2026-11-13-By44sRL5ck"],["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/1311-zuckerwatt-w-mija/"]],"e":"06:00","vok":1,"flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/08/zuckerwatt_131126.jpg"},
{"d":"2026-11-13","s":"23:00","title":"deep cut × Dark Pressure","venue":"FLUCC Wanne","coll":["deep cut","Dark Pressure"],"genres":["Hypnotic Techno","Deep Techno","Techno","Experimental"],"floors":[{"f":"Wanne","a":["23:00|Alex Maurer","00:45|Aura","02:15|Oxygeno","04:15|Melimeko"]}],"src":[["fl","https://flucc.at/events/PcWCsy-deep-cut/"],["ra","https://ra.co/events/2561302"]],"e":"06:00","price":"15 € VVK / 18 € AK","tickets":"https://ra.co/events/2561302","vok":1,"age":"18+","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/13.11.2026_DeepCutDarkPressure_Wanne_MartinD.max-2560x1440.jpg"},
{"d":"2026-11-13","s":"23:00","title":"Dystopia","venue":"Das Werk","coll":["Dystopia Rave"],"note":{"de":"Dystopia-Rave im Werk; Line-up noch nicht veröffentlicht.","en":"Dystopia rave at Das Werk; line-up not yet published."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-13","s":"23:00","e":"06:00","title":"Fatima Hajji","venue":"O der Klub","coll":["SIGNAL"],"genres":["Techno","Tribal Techno"],"floors":[{"f":"","a":["Fatima Hajji"]}],"price":"ab 12 €","tickets":"https://shop.o-klub.at/shop/registrations?event_id=bea6d6f5-42f5-44be-b50f-368093b3214a","flyer":"https://o-klub.at/wp-content/uploads/2026/09/Fatima_feed-web.jpg","note":{"de":"Signal präsentiert die spanische Techno-DJ Fatima Hajji – tribal und energiegeladen.","en":"Signal presents Spanish techno DJ Fatima Hajji – tribal, high-energy techno."},"vok":1,"src":[["ok","https://o-klub.at/events/fatima-hajji/"],["ra","https://ra.co/events/2528245"]],"age":"18+"},
{"d":"2026-11-13","s":"23:00","title":"Rudebwoy Embassy meets Bassclub – 30 Years Jah Power Sound","venue":"The Loft","coll":["Bassclub","Rude Bwoy Embassy","Jah Power Sound"],"genres":["Drum & Bass","Dubstep","Grime","UK Bass","Breaks","Jungle","Reggae","Dancehall","Dub"],"floors":[{"f":"Oben (Bassclub)","a":["Pezo Fox","Mantis","Stoney Curtis","Zuzee","Scooby Duo"]},{"f":"Unten (Jah Power Sound / Rude Bwoy Embassy)","a":["Dicie Globie","Sparky Rugged","Astarr","Ijahson","Bandulu","Camel","DJ Smo","Baba Sound","Kings Crown Sound","Thr33lake","Jah Power Sound","Royal Marx Sound","G Spot Sound"]}],"price":"10–15 €","flyer":"https://www.theloft.at/wp-content/uploads/2026/10/image00002-scaled.jpeg","note":{"de":"30 Jahre Jah Power Sound: oben Bass Music (DnB, Dubstep, Jungle), unten Reggae & Dancehall; 10 € bis Mitternacht.","en":"30 years of Jah Power Sound: bass music upstairs (DnB, dubstep, jungle), reggae & dancehall downstairs; €10 until midnight."},"vok":1,"src":[["lo","https://www.theloft.at/rudebwoy-embassy-meets-bassclub-30-years-jah-power-sound/"]]},
{"d":"2026-11-13","s":"23:55","e":"05:00","title":"Drum & Bassick x Radiance","venue":"Club Lucia","coll":["Drum & Bassick","Radiance"],"genres":["Drum & Bass","Neurofunk","Liquid"],"floors":[{"f":"","a":["Dave & Bass","Cybercutz","Escapism","I-Jin","Synthesis","Vibrant"]}],"price":"10 € (AK)","flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/Flyer_Lucia_11_2026_1_v009-scaled-e1792496286337.png","note":{"de":"Drum & Bass von Neuro bis Liquid mit sechs lokalen DJs.","en":"Drum & bass from neuro to liquid with six local DJs."},"vok":1,"src":[["cl","https://www.clublucia.at/event/drum-bassick-x-radiance/"]]},
{"d":"2026-11-14","s":"17:00","e":"06:00","title":"Once in a Blue Moon – Kiki Ball + Afterparty","venue":"Funkhaus","coll":["Kaisa Bodega","Pingpaya Fenty Savage"],"genres":["House","Ballroom"],"floors":[{"f":"","a":["Gawdesque","Amina Malounadou","Bellavie"]}],"age":"18+","tickets":"https://ra.co/events/2546333","src":[["ra","https://ra.co/events/2546333"]]},
{"age":"18+","d":"2026-11-14","s":"19:00","title":"NTO live","venue":"O der Klub","genres":["Techno","Melodic Techno"],"floors":[{"f":"","a":["NTO"]}],"tickets":"https://wype.ticketlodge.de/14112026-NTOliveVienna/","src":[["ci","https://cityineurope.com/event/cmugr7bxv0036d8dvhfgizmtd"],["ok","https://o-klub.at/events/nto-live-in-concert/"],["ra","https://ra.co/events/2423044"]],"vok":1,"price":"ab 25 €","flyer":"https://o-klub.at/wp-content/uploads/2026/07/NTO_Tour_2026_Wien_14112026_PostingForADs_1080x1350px.jpg","e":"23:00"},
{"d":"2026-11-14","s":"19:30","e":"23:30","title":"HEAVY LISTENING with Kobermann, MPU101 & Electric Indigo","venue":"Westbahn Studios","coll":["VLAN"],"genres":["Experimental","Dub Techno","Ambient"],"floors":[{"f":"","a":["20:00|Kobermann","21:00|MPU101","22:00|Electric Indigo"]}],"price":"15 €","age":"18+","note":{"de":"Dritte Ausgabe der Listening-Reihe von VLAN; Ort: Westbahn Studios (Adresse noch TBA).","en":"Third edition of VLAN's listening series; venue Westbahn Studios (address TBA)."},"src":[["ra","https://ra.co/events/2568237"]]},
{"d":"2026-11-14","s":"20:00","e":"04:00","title":"STRICT! The Dark Circus","venue":"Libelle","coll":["STRICT!"],"sexpos":1,"src":[["sp","https://sexpositives.com/en/events/strict-dark-circus-wien-2026-11-14/"],["li","https://www.libelle.at/events/dark-circus-hosted-by-strict-3/"]],"nophoto":1,"aw":1,"note":{"de":"Play-Party; Dresscode Dark Circus/Fetisch, keine Streetwear. Fotos/Handys verboten, Safeguarding-Team. Nur mit Voranmeldung per E-Mail an submit@strict.events (kein Online-Ticket). Einlass 20–23 Uhr. Dresscode Dark Circus/Fetisch. Keine DJs/Genres angegeben.","en":"Play party; dress code dark circus/fetish, no streetwear. No photos/phones, safeguarding team. Pre-registration only via email to submit@strict.events (no online ticket). Admission 20:00–23:00. Dress code dark circus/fetish. No DJs/genres listed."},"price":"€30","age":"21+","vok":1},
{"d":"2026-11-14","title":"Herzfrequenz: Herzi F2F Edition","venue":"Das Werk","coll":["Herzfrequenz"],"floors":[{"f":"","a":["Joey"]}],"src":[["ev","https://events.at/event/herzfrequenz-herzi-f2f-edition"],["dw","https://www.daswerk.org/program"]],"s":"23:00","tickets":"https://www.oeticket.com/noapp/eventseries/herzfrequenz-herzi-f2f-edition-4269996/","note":{"de":"Datum laut events.at und oeticket 14.11.; RA nannte zuvor 13.11.","en":"Date per events.at and oeticket is 14 Nov; RA previously said 13 Nov."},"vok":1},
{"d":"2026-11-14","s":"23:00","e":"06:00","title":"Paradies Garten w/ Paraçek","venue":"Grelle Forelle","coll":["Paradies Garten"],"price":"ab 19 €","floors":[{"f":"Mainfloor","a":["Paraçek","MARØ","Vivienna"]},{"f":"Kitchen","a":["Felix Rupprecht","Mariephi","Manuel Correa","Sora"]}],"src":[["rg","https://www.regioactive.de/party/paradies-garten-w-paracek-grelle-forelle-wien-2026-11-14-JVJJnmCzgx"],["ft","https://frey-tag.at/kalender/paradies-garten?s=T6P9XH1YS"],["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/1411-paradies-garten-w-paracek/"],["ra","https://ra.co/events/2556704"]],"genres":["Bounce","Hard Dance","Trance","Acid","House"],"vok":1,"tickets":"https://shop.paylogic.com/59cda0d6cec840928ec3ce1afa3e8b22/","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/paradiesgarten_141126_web.jpg","note":{"de":"RA nennt 18+, Hausregel der Location ist 21+.","en":"RA states 18+, the venue's house rule is 21+."}},
{"d":"2026-11-14","s":"23:00","title":"Fifi x Schrödinger's Groove","venue":"FLUCC Wanne","coll":["Fifi","Schrödingers Groove"],"note":{"de":"Clubnacht der Kollektive Fifi und Schrödinger's Groove; Line-up noch nicht veröffentlicht.","en":"Club night by the Fifi and Schrödinger's Groove collectives; line-up not yet announced."},"vok":1,"src":[["fl","https://flucc.at/events/X3Fef2-fifi-x-schrodinger-s-groove/"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-14","s":"23:00","title":"The Hive","venue":"Flex","coll":["The Hive"],"note":{"de":"The-Hive-Clubnacht; Detailseite zeigt noch Infos einer früheren Ausgabe.","en":"The Hive club night; the detail page still shows a previous edition."},"vok":1,"src":[["fx","https://flex.at/"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-14","s":"23:00","e":"06:00","title":"Radio Rudina","venue":"PRST","coll":["Radio Rudina"],"genres":["House"],"floors":[{"f":"","a":["Andre Zimmer","Anni Herzer","Valentin Zelz"]}],"price":"€13 (Early Bird)","age":"20+","src":[["ra","https://ra.co/events/2564050"],["rr","https://radiorudina.ticket.io/sbEA0Me0/"],["rr","https://www.radiorudina.com"]],"tickets":"https://radiorudina.ticket.io/sbEA0Me0/","note":{"de":"Laut radiorudina.com: „Radio Rudina invites Fiesta Frizzante“. Name dort als „Valentin Zell“ (RA: Valentin Zelz).","en":"Per radiorudina.com: \"Radio Rudina invites Fiesta Frizzante\". Name there spelled \"Valentin Zell\" (RA: Valentin Zelz)."}},
{"d":"2026-11-14","s":"23:59","title":"Hot'n'Wet","venue":"FLUCC Deck","src":[["fl","https://flucc.at/events/WGVN6r-hotnwet/"],["ra","https://ra.co/events/2561330"]],"vok":1,"e":"06:00","coll":["MEIOSISS"],"genres":["Techno"],"floors":[{"f":"","a":["Lila Gold","MEIOSISS","Jules Foe"]}],"price":"10 €","age":"18+","note":{"de":"Auf RA als „Hot & Flirty #6“ (FLUCC, Raum nicht angegeben) mit gleicher Startzeit gelistet; Lineup von dort. Flirt-Party mit Flirt-Armbändern, Fokus auf Konsens.","en":"Listed on RA as 'Hot & Flirty #6' (FLUCC, room not stated) with the same start time; lineup from there. Flirting party with signal wristbands, focus on consent."}},
{"d":"2026-11-15","s":"14:00","title":"FLUT x Callshop Radio – Week 46","venue":"FLUCC Deck","coll":["Callshop Radio"],"note":{"de":"Sonntags-DJ-Session mit Livestream (Reihe, Details wie Week 44 vermutlich).","en":"Sunday DJ session with live stream (series)."},"vok":1,"src":[["fl","https://flucc.at/events/fwStcm-flut-x-callshop-radio-week-46-26/"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-18","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Wöchentlicher Mittwochs-Rave im Werk.","en":"Weekly Wednesday rave at Das Werk."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-19","s":"23:00","e":"06:00","title":"Bonkers × Belly Dance Services","venue":"SASS Music Club","coll":["Bonkers","Belly Dance Services"],"genres":["House","Acid"],"floors":[{"f":"","a":["Ludviq","Nick Hanzo"]}],"price":"10 €","age":"18+","src":[["ra","https://ra.co/events/2567928"]]},
{"d":"2026-11-20","s":"19:00","e":"02:00","title":"AMBIEVENT – trace encounters","venue":"Kollektiv Kaorle","coll":["AMBIEVENT"],"genres":["Ambient"],"floors":[{"f":"","a":["Ssaliva","færo demonic","Inou Ki Endo","esti.d","LCA","Kenji Araki"]}],"price":"15 €","age":"18+","tickets":"https://kupfticket.com/events/ambievent","note":{"de":"Immersiver Ambient-Abend mit Klang, Licht, Duft und Kunst (Ausstellung Maximilian Prag, Klanginstallation Kenji Araki).","en":"Immersive ambient night blending sound, light, scent and art (exhibition by Maximilian Prag, sound installation by Kenji Araki)."},"src":[["ra","https://ra.co/events/2563794"],["kt","https://kupfticket.com/events/ambievent"]]},
{"d":"2026-11-20","s":"21:00","e":"06:00","title":"Pyramide Takeover – SIGNAL Festival","venue":"Pyramide Vösendorf","coll":["SIGNAL"],"genres":["Techno","Minimal","Hard Techno"],"floors":[{"f":"Main","a":["Boris Brejcha","Kasia"]},{"f":"Hard Techno Stage","a":["Anxhela","Biia"]}],"age":"18+","tickets":"https://shop.o-klub.at/shop/registrations?event_id=540ea588-6691-4c71-bd49-8e8989e7cd6e","flyer":"https://o-klub.at/wp-content/uploads/2026/06/Festival_feed-lineup-2-V2-web.jpg","note":{"de":"4. SIGNAL Festival in der Glaspyramide Vösendorf mit Boris Brejcha; veranstaltet von O der Klub.","en":"4th SIGNAL Festival in the glass pyramid in Vösendorf, headlined by Boris Brejcha; run by O der Klub."},"src":[["ok","https://o-klub.at/events/pyramide-takeover/"],["ra","https://de.ra.co/events/2489893"],["vo","https://www.volume.at/events/signal-festival-w-boris-brejcha-2026-11-20/"]],"price":"ab €45"},
{"d":"2026-11-20","s":"22:00","e":"06:00","title":"syndikat","venue":"Celeste","coll":["Das Syndikat"],"floors":[{"f":"","a":["Malounadou","Anna Soto","Jule Feser","Aside"]}],"src":[["ra","https://ra.co/events/2570049"]]},
{"d":"2026-11-20","s":"23:00","title":"Vision Serpent","venue":"FLUCC Wanne","coll":["Vision Serpent"],"note":{"de":"Clubnacht in der Wanne; Details noch nicht veröffentlicht.","en":"Club night in the Wanne; details not yet published."},"vok":1,"src":[["fl","https://flucc.at/events/kZmxyN-vision-serpent/"],["ra","https://ra.co/events/2557296"],["vo","https://www.volume.at/events/nonameleft-mateo-2026-11-20/"]],"floors":[{"f":"","a":["NoNameLeft","Mateo!","David Phoenix","Nya Nyx"]}],"e":"06:00","genres":["Techno","Minimal Techno","Psytech"],"price":"VVK 10 €, AK 18 €","age":"18+","tickets":"https://kupfticket.com/en/events/vision-serpent-showcase-w-nnl-mateo"},
{"d":"2026-11-20","s":"23:00","title":"Synergy Rave x Trance + Hard Techno","venue":"Das Werk","coll":["Synergy","KARTELL.FM","HEKTISCH"],"genres":["Trance","Hard Techno","Techno"],"tickets":"https://www.oeticket.com/noapp/artist/clubkultur-im-daswerk/synergy-rave-x-trance-hard-techno-4268081/","flyer":"https://image.events.at/images/facebook/9363212/SYNERGY_RAVE_Trance_Hard_Techno_20_tickets_2026_c_SYNERGY_222.jpg?versionId=cdd37fe87a5d","zero":1,"note":{"de":"Zwei Floors: Trance (kuratiert von KARTELL.FM) und Hard Techno (HEKTISCH). Zero Tolerance gegen Homophobie, Sexismus, Rassismus.","en":"Two floors: trance (curated by KARTELL.FM) and hard techno (HEKTISCH). Zero tolerance for homophobia, sexism, racism."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"],["ev","https://events.at/event/synergy-rave-x-trance-hard-techno-16"],["ra","https://ra.co/events/2564334"]],"floors":[{"f":"Lusterfloor (Trance & Bounce by KARTELL.FM)","a":[]},{"f":"Lasterfloor (Hard Techno by Hektisch)","a":[]}],"e":"06:00","price":"Early Bird 10 €, VVK 15 €, AK 15–18 €","age":"18+"},
{"d":"2026-11-20","s":"23:00","title":"Sub Zero","venue":"The Loft","coll":["Sub Zero"],"genres":["Techno"],"floors":[{"f":"Oben","a":["Userkiller","Kjaer","Mark Dale","Mike Mystik","MANiLO","Chicano"]}],"price":"10–12 €","flyer":"https://www.theloft.at/wp-content/uploads/2026/10/830563715_10235959980645177_3632405198332878954_n.jpg","note":{"de":"„Vienna meets Berlin“: roher, dunkler, hypnotischer Techno; 10 € vor Mitternacht, 12 € danach.","en":"'Vienna meets Berlin': raw, dark, hypnotic techno; €10 before midnight, €12 after."},"vok":1,"src":[["lo","https://www.theloft.at/sub-zero/"],["ra","https://ra.co/events/2550352"]],"e":"06:00","age":"18+"},
{"d":"2026-11-21","s":"15:00","e":"21:00","title":"techNOage – ab fünfzehn Uhr Clubbing","venue":"FLUCC Deck","coll":["techNOage"],"genres":["Techno"],"price":"Freie Spende","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/technoage_Sept_2026.min-2560x1440.jpg","note":{"de":"Nachmittags-Clubbing 15–21 Uhr, Techno mit Spannungsbogen, Kaffee & Kuchen für guten Zweck, barrierefrei.","en":"Afternoon clubbing 3–9 pm, techno with a dramaturgic arc, coffee & cake for charity, step-free access."},"vok":1,"src":[["fl","https://flucc.at/events/5KV584-technoage-ab-funfzehn-uhr-clubbing-26-09/"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-21","s":"20:00","title":"Art Attech – Kunst küsst Techno","venue":"FLUCC Wanne","coll":["Art Attech"],"genres":["Techno"],"src":[["fl","https://flucc.at/events/WGyKgG-art-attech/"],["ra","https://ra.co/events/2568823"]],"vok":1,"e":"06:00","price":"VVK 14–18 €, AK 19 €","age":"18+","floors":[{"f":"","a":["Aleta","ARAS JE'TÄM","Krawallbarbie","OK CUTEE","Wal_Halla","DJ Parkverbot"]}]},
{"d":"2026-11-21","s":"21:00","title":"Wiener Blut","venue":"Ottakringer Brauerei","coll":["SubRosaDictum"],"sexpos":1,"nophoto":1,"zero":1,"price":"€78","tickets":"https://partyticket.de/SRD/WB26/","note":{"de":"Dresscode: Latex, Leder, Spitze, Abendgarderobe, Masken, Drag. Keine Streetwear. Bereiche: Mixed Dance Floor, Artists & Performance, Playground. Keine DJs/Genres veröffentlicht. Strenger Fetisch-Dresscode.","en":"Dress code: latex, leather, lace, evening wear, masks, drag. No streetwear. Areas: mixed dance floor, artists & performance, playground. No DJs/genres published. Strict fetish dress code."},"src":[["sp","https://sexpositives.com/en/events/subrosadictum-wiener-blut/"],["pt","https://partyticket.de/SRD/WB26/"],["fp","https://www.fetischparty.at/Events"],["srd","https://subrosadictum.de/events/wiener-blut/"]],"age":"18+"},
{"age":"18+","d":"2026-11-21","s":"23:00","title":"Contrast pres. DJ Marky + Pola & Bryson","venue":"Grelle Forelle","coll":["Contrast"],"genres":["Drum & Bass","Dubstep","UK Garage","House"],"floors":[{"f":"Mainfloor","a":["DJ Marky","Pola & Bryson","Contrast Residents"]},{"f":"Kitchen · EN:VY","a":["En:vy","Armin Karmin","Stan Matan","Mantis","Nysos"]}],"src":[["rg","https://www.regioactive.de/party/contrast-pres-dj-marky-pola-bryson-18-wien-grelle-forelle-2026-11-21-T9Qcrn29zL"],["gf","https://www.grelleforelle.com/programm/"],["eb","https://www.eventbrite.com/e/contrast-pres-dj-marky-pola-bryson-tickets-2003233210458"],["gf","https://www.grelleforelle.com/project/2111-contrast-pres-dj-marky-pola-bryson-18/"]],"vok":1,"e":"06:00","price":"26 € (AK)","tickets":"https://www.eventbrite.com/e/contrast-pres-dj-marky-pola-bryson-tickets-2003233210458","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/contrast_211126_web.jpg"},
{"d":"2026-11-21","s":"23:00","title":"54Hz pres. CREEDS","venue":"Das Werk","coll":["54Hz"],"floors":[{"f":"","a":["CREEDS"]}],"note":{"de":"54Hz präsentiert CREEDS.","en":"54Hz presents CREEDS."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"]]},
{"d":"2026-11-21","s":"23:00","e":"06:00","title":"POLYCHAOS DUBIUM","venue":"Rhiz","genres":["Gqom","Baile Funk","Kuduro","Jersey Club","Footwork","Breakcore","Electro","Experimental"],"floors":[{"f":"","a":["Gawdesque","anxxxious_t","Kmanxak","Ironica Los Culos","Nova.psd"]}],"note":{"de":"Zweite Ausgabe; Visuals von Nova.psd (CRT-TV-Installation), Licht/Objekte von Qualia & Ironica Los Culos. Beschreibung nennt 22–04 Uhr.","en":"Second edition; visuals by Nova.psd (CRT TV installation), lights/objects by Qualia & Ironica Los Culos. Description says 22:00–04:00."},"src":[["ra","https://ra.co/events/2570034"]]},
{"d":"2026-11-25","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Wöchentlicher Mittwochs-Rave im Werk.","en":"Weekly Wednesday rave at Das Werk."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-27","s":"22:00","title":"20 Jahre CPE","venue":"Club Exil","coll":["CPE"],"note":{"de":"Alle Floors. Vösendorf.","en":"All floors. Vösendorf."},"src":[["ex","https://www.club-exil.at/"],["ex","https://club-exil.at/"],["exi","https://exil.ticket.io/EilUzLYa/"]],"vok":1,"price":"15 €","floors":[{"f":"Alle Floors","a":["WONKA CTK","MANY MAMMUT","Illtek","CPE Crew & Friends"]}],"tickets":"https://exil.ticket.io/EilUzLYa/"},
{"d":"2026-11-27","s":"22:00","title":"Luv Affair","venue":"FLUCC Wanne","coll":["Luv Affair"],"note":{"de":"Luv Affair auf beiden Floors (Wanne & Deck); Line-up noch nicht veröffentlicht.","en":"Luv Affair on both floors (Wanne & Deck); line-up not yet announced."},"vok":1,"src":[["fl","https://flucc.at/events/kpSL2Q-luv-affair/"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-27","s":"22:00","e":"06:00","title":"Access Another Atmosphere w/ Cosmic Gate & Ruben de Ronde","venue":"Prater Dome","coll":["Triple A Events"],"genres":["Trance"],"floors":[{"f":"","a":["Cosmic Gate","Ruben de Ronde","DJ Observer"]}],"price":"19 €","age":"18+","tickets":"https://www.aaa-events.at/","src":[["ra","https://ra.co/events/2546243"],["vo","https://www.volume.at/events/access-another-atmosphere-2026-11-27/"]]},
{"d":"2026-11-27","s":"23:00","e":"06:00","title":"Flashback w/ Thomas Schumacher – Techno Classics","venue":"Grelle Forelle","coll":["Flashback","FactX"],"genres":["Techno","Acid","Trance"],"price":"ab 16 €","floors":[{"f":"Mainfloor","a":["Thomas Schumacher","Joro & Joabo","Rokis","Tom Snow","MC Mars","MC Spot"]},{"f":"Kitchen","a":["Martin Oelz","Peter Pan","Romen Est Omen","Hanneken","PA_olo"]}],"src":[["rg","https://www.regioactive.de/party/flashback-w-thomas-schumacher-grelle-forelle-techno-classics-elektrochemie-lk-wien-2026-11-27-B5h2WQx06l"],["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/flashback?s=w_k-JY1v2"],["ft","https://frey-tag.at/kalender/flashback-techno-classics-1?s=eJPDz--_e"],["gf","https://www.grelleforelle.com/project/2711-flashback-w-thomas-schumacher-techno-classics-elektrochemie-lk/"],["ra","https://ra.co/events/2551280"]],"tickets":"https://flashback.ticket.io/2nf9fbhu/","vok":1,"flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/flashback_271126_web.jpg","note":{"de":"RA nennt 18+, Hausregel der Location ist 21+.","en":"RA states 18+, the venue's house rule is 21+."}},
{"d":"2026-11-27","s":"23:00","title":"Party Modern × PRST: Station Rose","venue":"PRST","coll":["Wien Modern"],"genres":["Electronic"],"floors":[{"f":"","a":["Stipo","Station Rose","Konman","Julia Goldfarb"]}],"src":[["wm","https://www.wienmodern.at/2026-club-praterstrasse-en-2026-237"],["fa","https://www.falter.at/location/42097/prst-praterstrasse"],["wm","https://www.wienmodern.at/event.php?lang=en&id=4567"]],"price":"€12–15 (€5 mit Festivalpass)","tickets":"https://ticket.wienmodern.at/en/buyingflow/tickets/16540/29099/","e":"06:00","note":{"de":"PRST-Produktion in Koproduktion mit Wien Modern. Zusätzlich gelistet: „Gunafa Clubbing // Nature Is Cool AI 1126 (UA)“. Nicht im PRST-Ticketshop.","en":"PRST production co-produced with Wien Modern. Also listed: \"Gunafa Clubbing // Nature Is Cool AI 1126 (UA)\". Not in PRST's ticket shop."}},
{"d":"2026-11-27","s":"23:00","title":"Resident Night: GOLPE // DETOXX","venue":"Das Werk","note":{"de":"Resident Night mit GOLPE und DETOXX.","en":"Resident night with GOLPE and DETOXX."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-27","s":"23:00","title":"Bassbussi Allstars – 3 Years Anniversary","venue":"The Loft","coll":["Bassbussi"],"note":{"de":"3 Jahre Bassbussi auf zwei Floors (Oben & Unten); Line-up tba.","en":"3 years of Bassbussi on two floors (upstairs & downstairs); line-up tba."},"vok":1,"src":[["lo","https://www.theloft.at/bassbussi-allstars-3-years-anniversary/"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-27","s":"23:00","e":"05:00","title":"AWSM. Skyscraper Edition (Extra Date)","venue":"Altia Skybar – DC Tower","coll":["AWSM"],"genres":["Afro House","Melodic House"],"floors":[{"f":"","a":["MAWU"]}],"price":"ab 20 €","age":"19+","tickets":"https://awsmevent.com/awsm-skyspracer-edition-extra-date/","note":{"de":"Im 58. Stock des DC Tower, Dresscode schick.","en":"On the 58th floor of DC Tower, dress code classy."},"src":[["ra","https://ra.co/events/2560557"],["vo","https://www.volume.at/events/awsm-skyscraper-edition-extra-date-2026-11-27/"],["awsm","https://awsmevent.com/awsm-skyspracer-edition-extra-date/"]]},
{"d":"2026-11-28","s":"23:00","title":"Selected × Bassbussi w/ Cara Elizabeth & Frederic.","venue":"Grelle Forelle","coll":["Selected","Bassbussi"],"floors":[{"f":"Mainfloor","a":["Cara Elizabeth","Frederic.","Andrew Ahmed"]},{"f":"Kitchen (Bassbussi)","a":[]}],"src":[["rg","https://www.regioactive.de/party/selected-x-bassbussi-w-cara-elizabeth-frederic-wien-grelle-forelle-2026-11-28-WngXFFMqQ0"],["gf","https://www.grelleforelle.com/programm/"],["ev","https://events.at/fortgehen-wien"],["gf","https://www.grelleforelle.com/project/2811-selected-x-bassbussi-w-cara-elizabeth-frederic/"],["ev","https://events.at/event/selected-x-bassbussi-w-cara-elizabeth"]],"vok":1,"tickets":"https://www.eventim-light.com/at/a/69284c91e54d302ec82b2635/e/6ad74e2b69e1b51231fecc93","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/selected_281126_web.jpg"},
{"d":"2026-11-28","s":"23:00","title":"Nine Circles","venue":"Das Werk","coll":["Ninecircles"],"note":{"de":"Ninecircles-Nacht im Werk; Line-up noch nicht veröffentlicht.","en":"Ninecircles night at Das Werk; line-up not yet published."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-11-28","s":"23:00","e":"05:00","title":"AWSM. Skyscraper Edition","venue":"Altia Skybar – DC Tower","coll":["AWSM"],"genres":["House","Afro House","Melodic House"],"price":"€30–40 (günstigere Stufen ausverkauft)","age":"19+","tickets":"https://events.tickethead.io/en/tickethead/event/5562","src":[["ra","https://ra.co/events/2547050"],["vo","https://www.volume.at/events/awsm-skyscraper-edition-2026-11-28/"],["awsm","https://awsmevent.com/awsm-skyscraper-edition/"]],"floors":[{"f":"","a":["MAWU","Benjay"]}],"note":{"de":"volume.at nennt nur MAWU. Zusatztermin am 27.11. (awsmevent.com).","en":"volume.at lists only MAWU. Extra date on 27 Nov (awsmevent.com)."}},
{"d":"2026-11-28","s":"23:00","title":"Switch! presents Primate – Sticks & Stones Europe Tour","venue":"Flex","coll":["Switch!"],"genres":["Drum & Bass","Jungle"],"floors":[{"f":"","a":["Primate","Disorder","Replic","Splinta","Mr. Highfi","L3nny","Breeze","MC Jimmy Danger"]}],"price":"€18 (Regular; €12/€15 ausverkauft)","age":"16+","tickets":"https://switch.ticket.io/j4yVQSrj/?lang=en","src":[["vo","https://www.volume.at/events/switch-presents-primate-sticks-stones-europe-tour-2026-11-28/"],["sw","https://switch.ticket.io/j4yVQSrj/?lang=en"]],"note":{"de":"flex.at-Novemberkalender listet am 28.11. bislang nur Konzerte (Glaive, HÄNSEL).","en":"flex.at November calendar so far lists only concerts on 28 Nov (Glaive, HÄNSEL)."}},
{"d":"2026-11-29","s":"14:00","title":"FLUT x Callshop Radio – Week 48","venue":"FLUCC Deck","coll":["Callshop Radio"],"note":{"de":"Sonntags-DJ-Session mit Livestream (Reihe).","en":"Sunday DJ session with live stream (series)."},"vok":1,"src":[["fl","https://flucc.at/events/UJec35-flut-x-callshop-radio-week-48-26/"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-12-05","s":"18:00","e":"15:00","title":"HOUSETIERE × VG+ Weekender","venue":"Tagada","coll":["Housetiere","VG+"],"genres":["House"],"floors":[{"f":"Tagada Courtyard (18–22)","a":[]},{"f":"Tagada Club (22–04)","a":[]},{"f":"Soulkitchen (05–15)","a":[]},{"f":"","a":["MESROD","PJPJPJ","Julani","Lilosh","Fliize","Duplikate","Hanno","Louk","Krueger"]}],"note":{"de":"Weekender über drei Räume bis Sonntagnachmittag; MESROD (Wien-Debüt) spielt Nacht und After.","en":"Weekender across three rooms until Sunday afternoon; MESROD (Vienna debut) plays both night and afterhours."},"src":[["ra","https://ra.co/events/2567885"]]},
{"d":"2026-12-05","s":"20:00","e":"07:00","title":"Tribal Vibes meets Exil","venue":"Club Exil","coll":["Tribal Vibes"],"genres":["Psytrance","Trance","Downtempo"],"floors":[{"f":"Main Floor (Psytrance)","a":[]},{"f":"Forest • Dark • Hi-Tech","a":[]},{"f":"Psyambient & Downtempo","a":[]},{"f":"","a":["Braincell","Boom Shankar","Egorythmia","Psynonima","Tsubi","Tündérke","Arnab","Karam","Alezzaro","Bornvoyage","Caban","CAM","SIS","Insano","Entheon","Hamelin","Kayara","Urklang"]}],"price":"40 €","age":"18+","src":[["ra","https://ra.co/events/2560058"]]},
{"d":"2026-12-05","s":"21:00","title":"Ungeniert Vol. 5","venue":"Libelle","sexpos":1,"src":[["sp","https://sexpositives.com/en/events/ungeniert-vol-5-wien-2026-12-05/"],["un","https://ungeniert.org/"],["un","https://ungeniert.org"],["li","https://www.libelle.at/events/ungeniert-vol-5/"]],"nophoto":1,"price":"€29","note":{"de":"Auf ungeniert.org ist Vol. 5 noch nicht angekündigt (letzter Stand: Vol. 4 am 16.10.). Ablauf laut Veranstalter: Fragebogen, Warteliste, Gästeliste. Dresscode sinnlich, Hausschuhe mitbringen. Einlass bis 00:00. Keine Abendkasse; Erstbesucher:innen füllen vorab einen Fragebogen aus. Keine DJs/Genres angegeben.","en":"Vol. 5 is not yet announced on ungeniert.org (latest: Vol. 4 on 16 Oct). Process per organiser: questionnaire, waiting list, guest list. Sensual dress code, bring slippers. Entry until 00:00. No box office; first-timers complete a questionnaire first. No DJs/genres listed."},"unconf":1,"tickets":"https://event.ungeniert.org/app/1-user-signup-first-step/set-language-68dc311688bd5a4f8ca56aee","vok":1},
{"d":"2026-12-05","s":"23:00","e":"05:00","title":"Karotte im Wohnzimmer","venue":"SASS Music Club","floors":[{"f":"","a":["DJ Karotte","Crazy Sonic","Joro & Joabo"]}],"src":[["sa","https://sassvienna.com/en/events/event/dj-karotte-im-wohnzimmer"],["ra","https://ra.co/events/2558624"]],"price":"18 €","vok":1,"age":"18+","aw":1,"genres":["House","Tech House"]},
{"d":"2026-12-06","s":"13:00","e":"18:30","title":"Untz Baby Untz – Nikolo im Funkhaus","venue":"Funkhaus","coll":["Untz Baby Untz"],"genres":["Techno","House"],"price":"13 €","tickets":"https://ra.co/events/2568943","note":{"de":"Day-Rave, erstes Indoor-Event; Early-Bird-Tickets ab 2. Nov 12:00. Line-up folgt. Untz Baby Untz ist eine familien-/kinderfreundliche Day-Rave-Reihe. Line-up noch TBA; Early Bird ab 2.11., 12:00.","en":"Day rave, first indoor edition; early-bird tickets from 2 Nov 12:00. Line-up TBA. Untz Baby Untz is a family/kid-friendly day-rave series. Lineup still TBA; early bird from 2 Nov, 12:00."},"src":[["ra","https://ra.co/events/2568943"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-12-07","s":"21:00","e":"06:00","title":"FT — 12","venue":"Grelle Forelle","coll":["Feuchte Träume"],"price":"Early Bird 36,16 € (Member 28,93 €), danach 41,81 / 44,64 / 47,46 €","tickets":"https://tickets.feuchtetraeu.me/events/ft-12","nophoto":1,"sexpos":1,"note":{"de":"Nur mit angenommener Online-Bewerbung, keine Abendkasse; personalisierte Tickets, Outfit erwartet, Kameras abgeklebt, Awareness-Team. Line-up folgt. Nacht vor dem Feiertag.","en":"Entry only with accepted online application, no box office; personalised tickets, outfits expected, cameras covered, awareness team. Line-up TBA. Night before the public holiday."},"aw":1,"src":[["ftr","https://feuchtetraeu.me"],["ftr","https://tickets.feuchtetraeu.me/events/ft-12"]],"floors":[{"f":"","a":["TBA"]}]},
{"d":"2026-12-19","s":"18:00","e":"03:00","title":"ZusammenKommen 16","venue":"Club Exil","coll":["hausgemacht"],"genres":["Techno"],"sexpos":1,"note":{"de":"Save the Date. Details folgen über den hausgemacht-Newsletter. Nur Vorverkauf nach Bewerbung, Einlass in Zeitslots bis 22:00. Line-up TBA. Nicht auf club-exil.at gelistet.","en":"Save the date. Details via the hausgemacht newsletter. Presale only after application, time-slot entry until 22:00. Lineup TBA. Not listed on club-exil.at."},"src":[["hg","https://www.hausgemacht.org/en/events/zusammenkommen-16"],["sp","https://sexpositives.com/en/events/zusammenkommen-16-wien-2026-12-19/"]],"tickets":"https://app.hausgemacht.org/events/zk16","age":"18+"}
];
