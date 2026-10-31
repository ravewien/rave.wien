/* rave.wien event data. Updated by the scheduled task. Fields: d(date) s(start) e(end) title venue coll[] genres[] floors[{f,a[]}] (artist "HH:MM|Name" = timetable) price age tickets flyer note{de,en} flags: sexpos lgbtq aw nophoto opendecks zero. src[[sourceKey,url]]. VR = Hausregeln je Location (age, aw, nophoto …) gelten für alle Events dort, sofern das Event nichts anderes angibt. VG = Koordinaten [lat,lng] je Location für die Karte. vok:1 = von der Location selbst bestätigt; Events ohne vok und mit nur einer Quelle zeigt die Seite als „nur 1 Quelle“. KC = bekannte Kollektive (auch ohne aktuelle Events im Filter sichtbar). AR = Artist-Infos (Herkunft, Genres, Clubs, Festivals, Links, Sets). CG = typische Genres je Kollektiv (aus früheren Events), ergänzt fehlende Genres. */
const V={
 "Wiener Würstelstand Spittelau": "U-Bahn-Station Spittelau, 1090",
 "Event Arena Vösendorf": "Marktstraße 13a, 2331 Vösendorf",
 "M1 Club": "Schwarzenbergplatz 10, 1040",
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
 "Westbahn Studios": "Adresse noch TBA",
 "Hofburg Vienna": "Heldenplatz, 1010",
 "Loop": "Lerchenfelder Gürtel, Stadtbahnbogen 27, 1080"
};
const S={
 "man": "Manuell eingetragen",
 "s1": "szene1.at",
 "th": "tickethead.io",
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
 "tt": "1000things",
 "ta": "Techno Airlines",
 "gl": "enter-glitch.com",
 "smt": "sunmoon.ticket.io"
};
const SO=["hg","un","pt","wm","ftr","ksot","stepf","awsm","bio","kore","tl","rr","srd","sw","gl","smt"];
const VR={"Grelle Forelle":{"age":"21+","sound":{"de":"Alcons Audio + Lambda Labs","en":"Alcons Audio + Lambda Labs","src":"https://www.properformance.audio/articles/grelle-forelle-mainfloor","floors":{"main":{"de":"Alcons Audio QR36 Line Arrays, 8× Lambda Labs DW-15 Subs","en":"Alcons Audio QR36 line arrays, 8× Lambda Labs DW-15 subs"},"kitchen":{"de":"Lambda Labs (MF-15A Subs, TX-2A, CX-1A Monitore)","en":"Lambda Labs (MF-15A subs, TX-2A, CX-1A monitors)","src":"https://lambda-labs.com/en/references/grelle-forelle"}}}},"Das Werk":{"age":"21+","sound":{"de":"Alcons Audio RR12 + Eigenbau-Subwoofer (12× 15\")","en":"Alcons Audio RR12 + custom subwoofer (12× 15\")","src":"https://www.prosoundweb.com/art-culture-venue-in-austria-outfitted-with-alcons-audio/"}},"SASS Music Club":{"age":"18+","aw":1,"sound":{"de":"Beschallung mit Alcons-Audio-Lautsprechern (Pro-Ribbon-Technologie), installiert von Pro Performance.","en":"Alcons Audio loudspeakers (pro-ribbon technology), installed by Pro Performance.","src":"https://properformance.at/en/projects/club/club-sass-wien/"}},"O der Klub":{"age":"18+"},"FLUCC Wanne":{"aw":1},"Club Exil":{"sound":{"de":"Lambda-Labs-Soundsystem: Auf dem Mainfloor ein 90°-QX-Setup mit 20 DH-18-Subwoofern.","en":"Lambda Labs sound system: a 90° QX setup with 20 DH-18 subwoofers on the main floor.","src":"https://www.properformance.audio/articles/the-lambda-labs-qx-series","floors":{"mainfloor":{"de":"Lambda Labs QX in 90°-Anordnung mit 20 DH-18-Subwoofern.","en":"Lambda Labs QX in a 90° configuration with 20 DH-18 subwoofers.","src":"https://www.properformance.audio/articles/the-lambda-labs-qx-series"}}}},"The Loft":{"sound":{"de":"KV2-Anlage im Keller (Dancefloor Unten).","en":"KV2 sound system in the basement (Unten dancefloor).","src":"https://www.wien.info/de/essen-trinken/bars-clubs/clubs-discos/the-loft-361056","floors":{"Unten":{"de":"KV2-Anlage","en":"KV2 sound system","src":"https://www.wien.info/de/essen-trinken/bars-clubs/clubs-discos/the-loft-361056"}}}}};
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
  "Progressive House",
  "Deep House",
  "Melodic House"
 ],
 "Kollektiv Birdhouse": [
  "Progressive House",
  "Electroclash",
  "Indie Dance"
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
const KC=["303","50 Herz","54Hz","909techno","Alles Allen","AMBIEVENT","Art Attech","Auf der Lauer","AWSM","Bassbussi","Bassclub","Bassproduction","Belly Dance Services","Bestand","Bonkers","Callshop Radio","Cardio Cult","ClassiX","Collapse","Connecting People","Contrast","Cosmic Egg","CPE","created-on-earth","Cybertribe","Dark Pressure","Das Syndikat","deep cut","Drum & Bassick","Dunkelton Kollektiv","Dystopia Rave","Empyreon","Entrance","euphonic records","FactX","Fader Friends","Fadercult","Feuchte Träume","Fifi","FIFI Rave","Flashback","Fluffig","Frieden & Liebe","Fuelized","Gassen aus Zucker","GDN","GLITCH","Green Light Collective","Gürtelgroove","Habibi Party","Hanzom","Hardline","Harmony Rec.","hausgemacht","Heimlich","HEKTISCH","hereandthere","Herzfrequenz","HERZZZ","House of Plüsch","Housetiere","Im Freudentaumel","Jah Power Sound","Journey to Tarab","Kaisa Bodega","KARTELL.FM","Klub Halal","Kollektiv Birdhouse","Kollektiv Ost:West","KØRE","Köstlich","KSOT","Little Beat More","LSH","Luv Affair","Magika","Mahlwerk","MEIOSISS","Merkwürdig","Nine O Nine","Ninecircles","Paradies Garten","Pingpaya Fenty Savage","Pink Mayhem","Pole Circle","Ponyhof","Queertactics","Radiance","Radio Rudina","Raqsouna","Rave am Mittwoch","Ravenbogen","Rude Bwoy Embassy","sama recordings","sch:cht","Schlachthaus","Schrödingers Groove","Selected","served","SIGNAL","Slutlabs","Sorry Mom","Soularium","Soundlabs","Spumante Records","Step Forward","STRICT!","Sub Zero","SubRosaDictum","Super Disco","Switch!","Synergy","Taktgefühl","Tasteless","Techno Obscene","Techno Vienna","techNOage","technolog","The Hive","Titti Queer Club","Tribal Vibes","Triple A Events","TUFF","Untz Baby Untz","up/or","VG+","Vision Serpent","VLAN","Wien Modern","WOS Soundsystem","Wreck","YE","Zuckerwatt","Zyklop Audio"];
const CI={
 "303": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
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
  "type": [
   "Kollektiv"
  ],
  "man": 1
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
  "noLogo": "2026-10-28",
  "rules": {
   "aw": 1,
   "nophoto": 1,
   "sexpos": 1,
   "lgbtq": 1
  },
  "type": [
   "Kollektiv"
  ],
  "man": 1,
  "logo": "https://www.backbeat.at/wp-content/uploads/2022/01/Download.png"
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
   "https://ohschonhell.at/orte/das+werk/14",
   "https://de.ra.co/events/2556025"
  ],
  "noLogo": "2026-10-28",
  "de": "Wöchentliche Rave-Reihe am Mittwoch im Werk, Eintritt gegen freie Spende, mit Awareness-Team.",
  "en": "Weekly Wednesday rave series at Das Werk, entry by free donation, with an awareness team.",
  "from": "Wien",
  "infoChk": "2026-10-31"
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
   "https://ohschonhell.at/orte/kramladen/549",
   "https://www.theloft.at/bass-bussi/",
   "https://de.ra.co/events/2532710",
   "https://ra.co/events/2154859"
  ],
  "noLogo": "2026-10-28",
  "de": "Wiener Partyreihe im The Loft, die bei ihren Ausgaben beide Floors bespielt; Headliner u. a. ELOISA (Berlin) mit Sounds von Hard House über Groove bis Acid.",
  "en": "Vienna party series at The Loft that takes over both floors; headliners have included ELOISA (Berlin) with sounds ranging from hard house to groove and acid.",
  "ig": "https://www.instagram.com/bassxbussi/",
  "infoChk": "2026-10-31"
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
  "noLogo": "2026-10-28",
  "infoChk": "2026-10-31"
 },
 "Wien Modern": {
  "logo": "https://www.wienmodern.at/images/Logo.png",
  "web": "https://www.wienmodern.at/",
  "src": [
   "https://www.wienmodern.at/",
   "https://en.wikipedia.org/wiki/Wien_Modern",
   "https://flucc.at/events/RVw6Sh-party-modern-schcht/"
  ],
  "de": "Festival für zeitgenössische Musik in Wien, 1988 von Claudio Abbado gegründet; veranstaltet u. a. die Clubreihe Party Modern.",
  "en": "Vienna festival of contemporary music, founded in 1988 by Claudio Abbado; its programme includes the club series Party Modern.",
  "founded": "1988",
  "from": "Wien",
  "infoChk": "2026-10-31"
 },
 "Pole Circle": {
  "rules": {
   "sexpos": 1
  },
  "man": 1
 },
 "Slutlabs": {
  "rules": {
   "sexpos": 1
  },
  "man": 1
 },
 "STRICT!": {
  "rules": {
   "sexpos": 1
  },
  "man": 1
 },
 "SubRosaDictum": {
  "rules": {
   "sexpos": 1
  },
  "man": 1
 },
 "HERZZZ": {
  "members": [
   "Anni Herzer"
  ],
  "man": 1
 },
 "KSOT": {
  "de": "Wiener Event-Agentur von Benedikt Fleischhacker für Techno-Events an besonderen Orten, etwa Hofburg, Schloss Cobenzl oder Wiener Konzerthaus.",
  "en": "Viennese event agency run by Benedikt Fleischhacker, staging techno events at special venues such as the Hofburg, Schloss Cobenzl or the Wiener Konzerthaus.",
  "from": "Wien",
  "tix": "https://ksot.ticket.io/",
  "src": [
   "https://www.1000thingsmagazine.com/de/a/2223438/ksot-rave-hofburg-wien/",
   "https://de.ra.co/dj/ksotsoundsystem"
  ],
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Auf der Lauer": {
  "from": "Wien",
  "src": [
   "https://ra.co/promoters/176473"
  ],
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "SIGNAL": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Super Disco": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Connecting People": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "The Hive": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Tasteless": {
  "de": "Wiener Partyreihe (Tasteless.vie) mit Events u. a. im The Loft, im PRST und auf dem Otto-Wagner-Areal; das Grand Opening fand im Jänner 2024 statt.",
  "en": "Viennese party series (Tasteless.vie) with events at The Loft, PRST and the Otto Wagner Areal, among others; its grand opening took place in January 2024.",
  "from": "Wien",
  "src": [
   "https://de.ra.co/events/1835390",
   "https://de.ra.co/events/2003539"
  ],
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Ravenbogen": {
  "de": "Queere Partyreihe aus Graz, u. a. mit „Gayliens on Stardust“ im Theatercafé Hin & Wider.",
  "en": "Queer party series from Graz, including \"Gayliens on Stardust\" at Theatercafé Hin & Wider.",
  "from": "Graz",
  "ig": "https://www.instagram.com/ravenbogen",
  "src": [
   "https://rainbowtime.super.site/events-database/ravenbogen-gayliens-on-stardust"
  ],
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Hardline": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "YE": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Alles Allen": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Housetiere": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Entrance": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "KØRE": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Callshop Radio": {
  "de": "Radioprojekt mit Stationen in Düsseldorf, Leipzig und Paris; in Kooperation mit dem FLUCC Transmitter (FLUT) entstand daraus ein Wiener Programm aus verschiedenen Strömungen der lokalen Musik- und Kulturszene, das regelmäßig am FLUCC Deck läuft.",
  "en": "Radio project with stations in Düsseldorf, Leipzig and Paris; together with FLUCC Transmitter (FLUT) it runs a Vienna programme featuring various currents of the local music and culture scene, held regularly at FLUCC Deck.",
  "founded": "2017",
  "foundedNote": 1,
  "web": "https://callshopradio.com/",
  "ig": "https://instagram.com/callshopradio",
  "src": [
   "https://flucc.at/events/fwStcm-flut-x-callshop-radio-week-46-26/",
   "https://ra.co/events/2130003",
   "https://de.ra.co/events/1908134"
  ],
  "infoChk": "2026-10-31"
 },
 "Wreck": {
  "de": "Veranstaltungsreihe im Wiener SASS Music Club, bei der LaLa und Æ-X Extended Sets spielen – Motto: „In einer Welt, in der alle immer schneller werden, nehmen wir uns Zeit.“",
  "en": "Event series at Vienna's SASS Music Club featuring extended sets by LaLa and Æ-X – motto: 'In a world where everyone keeps getting faster, we take our time.'",
  "noLogo": "2026-10-31",
  "src": [
   "https://sassvienna.com/en/events/event/wreck-7"
  ],
  "infoChk": "2026-10-31"
 },
 "AWSM": {
  "infoChk": "2026-10-31"
 },
 "ClassiX": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Pink Mayhem": {
  "de": "Wiener Partyreihe am FLUCC Deck mit eigener Resident-Crew und DJ-Contest; regelmäßig auch Halloween-Specials (seit 2023 belegt).",
  "en": "Vienna party series at FLUCC Deck with its own resident crew and a DJ contest; regular Halloween specials (documented since 2023).",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "ig": "https://www.instagram.com/dankepinkmayhem/",
  "noLogo": "2026-10-31",
  "src": [
   "https://flucc.at/events/dc4JWH-pink-mayhem/",
   "https://flucc.at/events/h7acrh-pink-mayhem-halloween-special/"
  ],
  "infoChk": "2026-10-31"
 },
 "Collapse": {
  "de": "Wiener Drum-&-Bass-Veranstalter, der u. a. „COLLAPSE XL“ in der Arena Wien mit kompromissloser elektronischer Musik, schwerem Sound und immersiven Visuals ausrichtet.",
  "en": "Vienna drum & bass promoter behind events such as 'COLLAPSE XL' at Arena Wien, promising uncompromising electronic music, heavy sound and immersive visuals.",
  "tix": "https://collapse-events.ticket.io/",
  "noLogo": "2026-10-31",
  "src": [
   "https://de.ra.co/events/2445780",
   "https://collapse.ticket.io/j0hmygbn/"
  ],
  "infoChk": "2026-10-31"
 },
 "Dunkelton Kollektiv": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Spumante Records": {
  "de": "Wiener Veranstalter/Label, das das Programm „FLUT x Callshop Radio“ am FLUCC kuratiert und dort Kooperationen wie mit Threads Radio präsentiert.",
  "en": "Vienna-based outfit that curates the 'FLUT x Callshop Radio' programme at FLUCC and presents collaborations there, e.g. with Threads Radio.",
  "from": "Wien",
  "ig": "https://www.instagram.com/spumanterecords/",
  "src": [
   "https://flucc.at/events/fwStcm-flut-x-callshop-radio-week-46-26/",
   "https://ra.co/events/2130003",
   "https://ra.co/promoters/150702"
  ],
  "infoChk": "2026-10-31"
 },
 "sch:cht": {
  "de": "Konzert-/Clubreihe des Kulturvereins kunstl:cht, die sich seit Frühjahr 2022 als Plattform für musikalische Entdeckungen abseits des Mainstreams versteht – zwischen akustischer und elektronischer Klangästhetik; Gast bei Wien Moderns Party Modern im FLUCC.",
  "en": "Concert/club series run by the cultural association kunstl:cht, a platform for musical discoveries beyond the mainstream since spring 2022, between acoustic and electronic sound aesthetics; regular guest at Wien Modern's Party Modern at FLUCC.",
  "type": [
   "Reihe"
  ],
  "founded": "2022",
  "noLogo": "2026-10-31",
  "src": [
   "https://flucc.at/events/RVw6Sh-party-modern-schcht/",
   "https://flucc.at/events/AbZjQp-party-modern-schcht-ct/"
  ],
  "infoChk": "2026-10-31"
 },
 "Bestand": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "up/or": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "House of Plüsch": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Fluffig": {
  "de": "Wiener Veranstalter von Trance- und Techno-Partys, u. a. der „Fluffig Punsch Party“ als Winter-Open-Air im Club U.",
  "en": "Vienna organiser of trance and techno parties, including the 'Fluffig Punsch Party' winter open air at Club U.",
  "noLogo": "2026-10-31",
  "src": [
   "https://de.ra.co/events/2323092"
  ],
  "infoChk": "2026-10-31"
 },
 "Empyreon": {
  "de": "Neue Eventreihe im Wiener The Loft mit dem Ziel, eine lokale Szene für Deep-, Progressive- und Melodic-House-Musik, DJs und Produzent:innen in Wien aufzubauen.",
  "en": "New event series at Vienna's The Loft aiming to build a local scene for deep, progressive and melodic house music, DJs and producers in Vienna.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "noLogo": "2026-10-31",
  "src": [
   "https://www.theloft.at/empyreon-progressive-house-2/"
  ],
  "infoChk": "2026-10-31"
 },
 "Kollektiv Birdhouse": {
  "de": "Wiener Kollektiv („Birdhouse Collective“) hinter einer der langlebigsten alternativen Clubnächte Wiens, mit Electroclash, Indie Dance und Underground-Beats.",
  "en": "Vienna collective ('Birdhouse Collective') behind one of the city's longest-running alternative club nights, featuring electroclash, indie dance and underground beats.",
  "type": [
   "Kollektiv"
  ],
  "from": "Wien",
  "noLogo": "2026-10-31",
  "src": [
   "https://nl.ra.co/events/2514903"
  ],
  "infoChk": "2026-10-31"
 },
 "Fadercult": {
  "de": "Berliner Kollektiv, das u. a. gemeinsam mit Mahlwerk in der Wiener Grelle Forelle einen eigenen Floor („Kitchen“) hostet.",
  "en": "Berlin collective that hosts its own floor ('Kitchen') at events such as its collaboration with Mahlwerk at Vienna's Grelle Forelle.",
  "type": [
   "Kollektiv"
  ],
  "from": "Berlin",
  "noLogo": "2026-10-31",
  "src": [
   "https://www.grelleforelle.com/project/0611-mahlwerk-fadercult-w-afem-syko-lisa-horver/"
  ],
  "infoChk": "2026-10-31"
 },
 "WOS Soundsystem": {
  "noLogo": "2026-10-31",
  "infoChk": "2026-10-31"
 }
};
const VI={
 "Wiener Würstelstand Spittelau": {
  "de": "Würstelstand von Mike Lanner und Sengl bei der U-Bahn-Station Spittelau mit modernen Hot Dogs, Fassbier und Garten; gelegentlich legen hier DJs auf.",
  "en": "Sausage stand by Mike Lanner and Sengl at the Spittelau underground station, serving modern hot dogs and draught beer, with a garden; DJs play here occasionally.",
  "man": 1,
  "src": [
   "https://www.theviennareview.at/food-drink/12453/wiener-wurstelstand",
   "https://ra.co/clubs/218090"
  ],
  "io": [
   "Outdoor"
  ]
 },
 "Hofburg Vienna": {
  "de": "Ehemalige Kaiserresidenz am Heldenplatz, deren Prunksäle auch für Großveranstaltungen genutzt werden.",
  "en": "Former imperial residence on Heldenplatz whose state halls are also used for large events.",
  "src": [
   "https://ksot.ticket.io/"
  ],
  "io": [
   "Indoor"
  ]
 },
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
  "logo": "https://www.grelleforelle.com/wp-content/uploads/2016/08/cropped-favicon-270x270.png",
  "io": [
   "Indoor"
  ],
  "infoChk": "2026-10-31"
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
   "Patrick M4ss",
   "Arman Shadow"
  ],
  "resSrc": [
   "https://warda.at/events/werk-resident-night/",
   "https://events.at/event/werk-resident-night-1",
   "https://de.ra.co/dj/armanshadow/biography"
  ],
  "de": "Kulturverein im Stadtbahnbogen an der Spittelauer Lände, Schwerpunkt harte Techno-Spielarten, Schranz und Bounce.",
  "en": "Cultural association in the railway arches on Spittelauer Lände, focusing on hard techno, schranz and bounce.",
  "src": [
   "https://ohschonhell.at/orte/das+werk/14",
   "https://www.daswerk.org/faq"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ],
  "opened": "2006",
  "infoChk": "2026-10-31"
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
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ],
  "man": 1,
  "infoChk": "2026-10-31"
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
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ],
  "man": 1,
  "infoChk": "2026-10-31"
 },
 "SASS Music Club": {
  "web": "https://sassvienna.com/",
  "de": "Club am Karlsplatz, Schwerpunkt House und Techno, sonntags „Morgengymnastik“.",
  "en": "Club at Karlsplatz, focus on house and techno, Sundays “Morgengymnastik”.",
  "src": [
   "https://ohschonhell.at/orte/sass/9"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ],
  "infoChk": "2026-10-31"
 },
 "PRST": {
  "opened": "2020",
  "de": "Club Praterstraße (PRST), House- und Techno-Club in der Leopoldstadt.",
  "en": "Club Praterstraße (PRST), house and techno club in Leopoldstadt.",
  "src": [
   "https://ohschonhell.at/orte/praterstrasse+-+prst/912"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ]
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
  "logo": "https://www.club-exil.at/logo.svg",
  "io": [
   "Indoor"
  ],
  "floors": [
   "Mainfloor",
   "Bridge Floor",
   "Maschinenraum",
   "Cyberspace"
  ]
 },
 "Kramladen": {
  "opened": "2015",
  "de": "Kleiner Club im U-Bahnbogen am Lerchenfelder Gürtel.",
  "en": "Small club in the U-Bahn arches on Lerchenfelder Gürtel.",
  "src": [
   "https://ohschonhell.at/orte/kramladen/549",
   "https://ra.co/events/2475933"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ]
 },
 "Celeste": {
  "opened": "2014",
  "de": "Bar und Club in Margareten, Fr/Sa DJs und Live-Acts bis 6 Uhr.",
  "en": "Bar and club in Margareten, Fri/Sat DJs and live acts until 6am.",
  "src": [
   "https://ohschonhell.at/orte/celeste/47",
   "https://www.technoairlines.com/club/celeste-vienna"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ]
 },
 "Weberknecht": {
  "web": "https://weberknecht.at/",
  "src": [
   "https://ohschonhell.at/orte/weberknecht/28",
   "https://weberknecht.at/"
  ],
  "logo": "https://weberknecht.at/wp-content/uploads/2018/06/cropped-grunge-plus-1-270x270.png",
  "io": [
   "Indoor"
  ]
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
   "Dancefloor",
   "Courtyard"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ]
 },
 "Club Lucia": {
  "web": "https://www.clublucia.at/",
  "src": [
   "https://ohschonhell.at/orte/club+lucia/963",
   "https://www.clublucia.at/"
  ],
  "logo": "https://www.clublucia.at/wp-content/uploads/2025/05/LUCIA-FINAL-white-1-1024x968.png",
  "io": [
   "Indoor"
  ]
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
   "Rote Bar",
   "Core",
   "Orbit",
   "Konsulat"
  ],
  "src": [
   "https://warda.at/magazin/lifestyle/o-der-klub-partytreffpunkt-wien/",
   "https://goodnight.at/locations/984-club-o",
   "https://o-klub.at/"
  ],
  "logo": "https://o-klub.at/wp-content/uploads/2022/09/Logo_w.svg",
  "io": [
   "Indoor"
  ]
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
  ],
  "io": [
   "Indoor",
   "Outdoor"
  ]
 },
 "Usus am Wasser": {
  "de": "Lokal an der Neuen Donau, im Sommer Ort für Open-Air-Raves (z. B. Techno am Wasser, Sorry Mom, Ponyhof).",
  "en": "Venue on the Neue Donau, in summer a spot for open-air raves (e.g. Techno am Wasser, Sorry Mom, Ponyhof).",
  "src": [
   "https://tableagent.com/vienna/usus-am-wasser/",
   "https://ra.co/events/2492475"
  ],
  "io": [
   "Indoor",
   "Outdoor"
  ],
  "ioMain": "Outdoor"
 },
 "Porto Pollo": {
  "de": "Bar am Ufer der Donauinsel in Kaisermühlen, Day-Raves am Wochenende.",
  "en": "Bar on the Danube Island bank in Kaisermühlen, weekend day raves.",
  "src": [
   "https://www.technoairlines.com/club/porto-pollo-vienna",
   "https://ra.co/events/2456634"
  ],
  "io": [
   "Outdoor"
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
   "https://www.theloft.at/",
   "https://www.wien.info/de/essen-trinken/bars-clubs/clubs-discos/the-loft-361056"
  ],
  "logo": "https://www.theloft.at/wp-content/uploads/2022/02/loft-logo.svg",
  "io": [
   "Indoor"
  ],
  "opened": "2009",
  "infoChk": "2026-10-31"
 },
 "Pyramide Vösendorf": {
  "src": [
   "https://o-klub.at/events/pyramide-takeover/"
  ],
  "io": [
   "Indoor"
  ]
 },
 "Flex": {
  "src": [
   "https://flex.at/event/the-hive-x-collapse/"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor",
   "Outdoor"
  ]
 },
 "Ottakringer Brauerei": {
  "src": [
   "https://warda.at/events/ksot-halloween-warehouse-rave/"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor",
   "Outdoor"
  ],
  "floors": [
   "Hefeboden",
   "Alte Technik"
  ]
 },
 "Lugner City": {
  "src": [
   "https://www.volume.at/events/koere-halloween-rave-2026-2026-10-31/"
  ],
  "io": [
   "Indoor"
  ]
 },
 "U4": {
  "src": [
   "https://ra.co/events/2506486"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ]
 },
 "Funkhaus": {
  "src": [
   "https://ra.co/events/2547379"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ]
 },
 "Rhiz": {
  "src": [
   "https://ra.co/events/2563381",
   "https://rhiz.wien/blog/"
  ],
  "logo": "https://rhiz.wien/wp-content/uploads/2026/01/cropped-favicon-270x270.png",
  "io": [
   "Indoor"
  ]
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
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ]
 },
 "Prater Dome": {
  "src": [
   "https://ra.co/events/2546243"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ]
 },
 "Altia Skybar – DC Tower": {
  "src": [
   "https://ra.co/events/2560557"
  ],
  "io": [
   "Indoor"
  ],
  "man": 1
 },
 "Event Arena Vösendorf": {
  "io": [
   "Indoor"
  ],
  "floors": [
   "Ground Zero",
   "The Tunnel",
   "Machine Room"
  ]
 },
 "M1 Club": {
  "io": [
   "Indoor"
  ]
 },
 "B72": {
  "io": [
   "Indoor"
  ]
 },
 "Metastadt": {
  "io": [
   "Indoor"
  ]
 },
 "Prater (Calafatiplatz)": {
  "io": [
   "Outdoor"
  ]
 },
 "Otto Wagner Areal": {
  "io": [
   "Indoor",
   "Outdoor"
  ]
 },
 "Loop": {
  "src": [
   "https://ra.co/events/2548181"
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
  "sets": [
   {
    "t": "Tanzfuchs – Integrity",
    "u": "https://on.soundcloud.com/OO69Ki4YiMDhoJk9Zf"
   }
  ],
  "setsChecked": "2026-10-29",
  "img": "https://i1.sndcdn.com/avatars-QYMONy0tWsOrqkHQ-XuPyMg-t500x500.jpg",
  "links": {
   "sc": "https://soundcloud.com/tnzfx"
  },
  "src": [
   "https://soundcloud.com/tnzfx"
  ],
  "bio": {
   "de": "extrem cooler dude"
  },
  "from": {
   "de": "Wien"
  },
  "real": "Marco",
  "man": 1
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
   "web": "https://www.hi-mija.com",
   "sc": "https://soundcloud.com/hi_mija",
   "sp": "https://open.spotify.com/intl-de/artist/1NpKmfDYMhw1KJIIUCsX4O?si=fm7KHrvLSdScD-Zw2SiiHA"
  },
  "src": [
   "https://en.wikipedia.org/wiki/Mija_(DJ)"
  ],
  "img": "https://i1.sndcdn.com/avatars-QL7aVE7zOoo3pxkF-zY0tYQ-t500x500.jpg",
  "man": 1,
  "sets": [
   {
    "t": "MIJA 3h DJ Set @ Hot Meal x BCCO NYE 2025",
    "u": "https://soundcloud.com/hi_mija/mija-3hr-dj-set-hot-meal-x-bcco-nye-2025"
   },
   {
    "t": "MIJA 2h DJ Set live from Lick n Dip, Los Angeles",
    "u": "https://soundcloud.com/hi_mija/2-hr-dj-set-live-from-lickndip-los-angeles"
   }
  ],
  "setsChecked": "2026-10-31"
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
  },
  "img": "https://static.ra.co/images/profiles/square/prada2000.jpg?dateUpdated=1770138010373",
  "infoChk": "2026-10-31"
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
   "ra": "https://ra.co/dj/afemsyko",
   "ig": "https://www.instagram.com/afemsyko"
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
  "linksOk": "2026-10-29",
  "img": "https://static.ra.co/images/profiles/square/afemsyko.jpg?dateUpdated=1791908005157",
  "labels": [
   "Kontor",
   "Tribe Records",
   "R Label Group",
   "EXHALE Records",
   "Speedmaster Records"
  ],
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "img": "https://static.ra.co/images/profiles/square/lisakorver.jpg?dateUpdated=1763572983037",
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "img": "https://static.ra.co/images/profiles/square/josefinatapia-2.jpg?dateUpdated=1759191389887",
  "labels": [
   "MyHouse YourHouse",
   "FAFO Records"
  ],
  "infoChk": "2026-10-31"
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
   "web": "https://sampaganini.com",
   "ra": "https://ra.co/dj/sampaganini"
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
  "linksOk": "2026-10-29",
  "img": "https://static.ra.co/images/profiles/square/sampaganini.jpg?dateUpdated=1740436287120",
  "infoChk": "2026-10-31"
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
   "bc": "https://oberstundbuchner.bandcamp.com",
   "ig": "https://www.instagram.com/oberst_und_buchner/"
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
  "setsChecked": "2026-10-27",
  "img": "https://f4.bcbits.com/img/0028446882_10.jpg",
  "man": 1
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
  "setsChecked": "2026-10-27",
  "sets": [
   {
    "t": "Riverrave1 2 11 09 25 16 08",
    "u": "https://soundcloud.com/ponyhof_official/riverrave1-2-11-09-25-16-08"
   }
  ],
  "man": 1
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
   "sc": "https://soundcloud.com/benjamindibora",
   "ig": "https://www.instagram.com/benjamindibora"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27",
  "sets": [
   {
    "t": "Opening Set For Wehbba And Luft Liebe Pratersauna",
    "u": "https://soundcloud.com/benjamindibora/opening-set-for-wehbba-and-luft-liebe-pratersauna"
   }
  ],
  "man": 1
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
  "setsChecked": "2026-10-27",
  "sets": [
   {
    "t": "Grelleforellekitchenzuckerwatt Megamietzi Reaching The Peak",
    "u": "https://soundcloud.com/ponyhof_official/grelleforellekitchenzuckerwatt-megamietzi-reaching-the-peak"
   }
  ],
  "man": 1
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
   "sc": "https://soundcloud.com/kovinator",
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27",
  "sets": [
   {
    "t": "Techpool Kovinator",
    "u": "https://soundcloud.com/ponyhof_official/techpool-kovinator"
   }
  ],
  "man": 1
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
   "sc": "https://soundcloud.com/david-penz-987684508",
   "ig": "https://www.instagram.com/ravedave_dj/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27",
  "genres": [
   "Hard Bounce",
   "Bounce"
  ],
  "sets": [
   {
    "t": "Ponyhof Raveodave Radio Rudina",
    "u": "https://soundcloud.com/radiorudina/ponyhof-raveodave-radio-rudina"
   }
  ],
  "man": 1
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
  "linksOk": "2026-10-29",
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Paul H",
  "bio": {
   "de": "DJ aus Österreich, der vor allem in Wien spielt – am häufigsten im Das Werk, im FLUCC und im Ponyhof.",
   "en": "DJ from Austria who mostly plays in Vienna – most often at Das Werk, FLUCC and Ponyhof."
  },
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Tessa Kadletz",
  "bio": {
   "de": "TEZIBEL ist eine in Wien lebende DJ und Produzentin. Sie spielt regelmäßig in Wiener Clubs wie Grelle Forelle, PRST, Das Werk und Pratersauna.",
   "en": "TEZIBEL is a Vienna-based DJ and producer. She plays regularly at Viennese clubs such as Grelle Forelle, PRST, Das Werk and Pratersauna."
  },
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "from": {
   "de": "Ukraine, lebt in Wien",
   "en": "Ukraine, based in Vienna"
  },
  "bio": {
   "de": "Wiener DJ, Produzent und Plattensammler mit einem Geschmack zwischen dem Unerwarteten und dem Unbestreitbaren; Releases auf System Error und Tancido.",
   "en": "Vienna-based DJ, producer and record digger with a taste that swerves between the unexpected and the undeniable; releases on System Error and Tancido."
  },
  "labels": [
   "System Error",
   "Tancido"
  ],
  "infoChk": "2026-10-31"
 },
 "The Advent": {
  "links": {
   "sc": "https://soundcloud.com/ciscoadvent",
   "web": "http://the-advent.com",
   "sp": "https://open.spotify.com/artist/2viciQWa7lV7FrogoaDvk8",
   "ra": "https://ra.co/dj/theadvent"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/theadvent.jpg?dateUpdated=1510323401000",
  "from": {
   "de": "London, UK",
   "en": "London, UK"
  },
  "real": "Cisco Ferreira",
  "bio": {
   "de": "Projekt des Londoner Musikers und Sounddesigners Cisco Ferreira, ein Techno-Pionier mit Releases u. a. auf Tresor, Drumcode und Kombination Research.",
   "en": "Project of London-based musician and sound designer Cisco Ferreira, a techno pioneer with releases on Tresor, Drumcode and Kombination Research, among others."
  },
  "labels": [
   "Tresor",
   "Drumcode",
   "Kombination Research",
   "Tortured Records",
   "MB Elektronics",
   "Alchemy",
   "Synewave"
  ],
  "infoChk": "2026-10-31"
 },
 "COZi": {
  "links": {
   "sc": "https://soundcloud.com/cozimusic",
   "ra": "https://ra.co/dj/cozi"
  },
  "src": [
   "https://ra.co/dj/cozi",
   "https://ra.co/dj/cozi/biography"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/cozi.jpg?dateUpdated=1765353323750",
  "linksOk": "2026-10-29",
  "from": {
   "de": "Sydney, Australien, lebt in Österreich",
   "en": "Sydney, Australia, based in Austria"
  },
  "real": "Connor",
  "bio": {
   "de": "Ehemaliger Profitänzer aus Sydney, heute DJ und Produzent in Österreich mit groovigem House und Tech-House mit 2000er-Wurzeln. Gründete Anfang 2025 das Label Energy In Motion, dort erschien seine Debüt-EP „The 5th Dimension“.",
   "en": "Former professional dancer from Sydney, now a DJ and producer in Austria playing groovy house and tech house with 2000s roots. Founded the label Energy In Motion in early 2025, home of his debut EP \"The 5th Dimension\"."
  },
  "genres": [
   "House",
   "Tech House"
  ],
  "labels": [
   "Energy In Motion"
  ],
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "DJ aus Österreich. Spielt vor allem in Wiener Clubs wie FLUCC, Das Werk und Flex.",
   "en": "DJ from Austria. Plays mainly at Viennese clubs such as FLUCC, Das Werk and Flex."
  },
  "infoChk": "2026-10-31"
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
   "ig": "https://www.instagram.com/trish_ak_means",
   "ra": "https://ja.ra.co/dj/kmeans"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/kmeans.jpg?dateUpdated=1783454954280",
  "from": {
   "de": "Schweden, lebt in Großbritannien",
   "en": "Sweden, based in the United Kingdom"
  },
  "bio": {
   "de": "DJ aus Schweden mit Wohnsitz in Großbritannien; u. a. Dekmantel-Podcast-Mix und NTS-Gastsendung.",
   "en": "Swedish DJ based in the United Kingdom; contributed a Dekmantel podcast mix and an NTS guest show."
  },
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "from": {
   "de": "Wien",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "Wiener DJ mit Fokus auf Underground-House in all seinen Spielarten; spielt vor allem im Tagada und im SASS Music Club.",
   "en": "Vienna-based DJ focused on underground house music of all styles; plays mostly at Tagada and SASS Music Club."
  },
  "genres": [
   "House"
  ],
  "infoChk": "2026-10-31"
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
   "ra": "https://ra.co/dj/andycatana",
   "web": "https://doeasyrec.com"
  },
  "src": [
   "https://de.ra.co/dj/andycatana",
   "https://andycatana.bandcamp.com",
   "https://es.ra.co/dj/andycatana",
   "https://ra.co/dj/andycatana/biography"
  ],
  "sets": [
   {
    "t": "NTBT – Mixtape Vol. 9 by Andy Catana",
    "u": "https://soundcloud.com/nexttimebigtime/next-time-big-time-9-guestmix-by-andy-catana"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://f4.bcbits.com/img/0037264141_21.jpg",
  "linksOk": "2026-10-29",
  "from": {
   "de": "Österreich (Wels), geboren in Rumänien",
   "en": "Austria (Wels), born in Romania"
  },
  "labels": [
   "Do Easy Records",
   "Moon Harbour Recordings",
   "Bloop Recordings",
   "Valioso Recordings",
   "Fizical"
  ],
  "bio": {
   "de": "In Rumänien geboren, kam Andy Catana mit fünf Jahren nach Österreich und wuchs in Wels auf. Seit den frühen 2000ern DJ und Produzent, gründete er 2009 sein Label Do Easy Records. Releases u. a. auf Moon Harbour, Bloop und Valioso.",
   "en": "Born in Romania, Andy Catana moved to Austria at the age of five and grew up in Wels. A DJ and producer since the early 2000s, he founded his label Do Easy Records in 2009. Releases include Moon Harbour, Bloop and Valioso."
  },
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "from": {
   "de": "Wien",
   "en": "Vienna, Austria"
  },
  "bio": {
   "de": "DJ aus Wien, spielt vor allem im SASS Music Club und im PRST.",
   "en": "Vienna-based DJ, playing mostly at SASS Music Club and PRST."
  },
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "DJ aus Österreich, der vor allem in Wien auflegt – am häufigsten im PRST, im SASS Music Club, in der Pratersauna und in der Grelle Forelle.",
   "en": "DJ from Austria who mostly plays in Vienna – most often at PRST, SASS Music Club, Pratersauna and Grelle Forelle."
  },
  "infoChk": "2026-10-31"
 },
 "Arman Shadow": {
  "links": {
   "sc": "https://soundcloud.com/armanshadow",
   "ig": "https://www.instagram.com/armanshadow",
   "ra": "https://ra.co/dj/armanshadow"
  },
  "src": [
   "https://de.ra.co/dj/armanshadow",
   "https://de.ra.co/dj/armanshadow/biography"
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
  "linksOk": "2026-10-29",
  "from": {
   "de": "Iran, lebt in Paris",
   "en": "Iran, based in Paris"
  },
  "bio": {
   "de": "Techno-Produzent und DJ aus dem Iran, der aus dem Wiener und Pariser Underground kommt und heute in Paris lebt. Bekannt für groovige, hypnotische Sets; laut RA Resident im Das Werk.",
   "en": "Techno producer and DJ from Iran who emerged from the Vienna and Paris underground and is now based in Paris. Known for groove-driven, hypnotic sets; according to RA a resident at Das Werk."
  },
  "infoChk": "2026-10-31"
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
   "https://de.ra.co/dj/crystalo",
   "https://de.ra.co/dj/crystalo/biography"
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
  "linksOk": "2026-10-29",
  "genres": [
   "Hard Techno",
   "Schranz"
  ],
  "bio": {
   "de": "Crystal O gilt laut RA als künstlerische Säule der Wiener Queer-Community. Sie spielt harte, groovige Sounds, frühen deutschen Hardtechno und Schranz; ohne Drag tritt sie auch als Crystal Ohne auf.",
   "en": "According to RA, Crystal O is an artistic pillar of Vienna's queer community. She plays hard, groovy sounds, early German hard techno and schranz, and also performs out of drag as Crystal Ohne."
  },
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "bio": {
   "de": "DJ aus Österreich. Spielt regelmäßig im PRST und SASS Music Club in Wien sowie in Graz (Postgarage, Forum Stadtpark).",
   "en": "DJ from Austria. Plays regularly at PRST and SASS Music Club in Vienna as well as in Graz (Postgarage, Forum Stadtpark)."
  },
  "infoChk": "2026-10-31"
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
  "noImg": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Alex Maurer": {
  "noLinks": "2026-10-31",
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31"
 },
 "DJ Bottleghost": {
  "noLinks": "2026-10-31",
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "real": "Walter Garber",
  "bio": {
   "de": "DJ aus Italien, früher unter dem Namen Technowalter aktiv. Spielt vor allem in Norditalien, u. a. in Clubs wie Sketch, Basis Vinschgau und Mirò Club.",
   "en": "DJ from Italy, formerly known as Technowalter. Plays mainly in northern Italy, at clubs such as Sketch, Basis Vinschgau and Mirò Club."
  },
  "infoChk": "2026-10-31"
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
  "img": "https://static.ra.co/images/profiles/square/altroyjerome.jpg?dateUpdated=1746100566000",
  "bio": {
   "de": "US-amerikanischer DJ und Produzent mit Wohnsitz in Österreich. Bekannt für die Verbindung von deepen, souligen Sounds mit elektronischen Rhythmen. Spielt regelmäßig in Wiener Clubs wie FLUCC, PRST, Das Werk und Black Market.",
   "en": "US-born DJ and producer based in Austria. Known for fusing deep, soulful music with electronic rhythms and melodies. Plays regularly at Viennese clubs such as FLUCC, PRST, Das Werk and Black Market."
  },
  "infoChk": "2026-10-31"
 },
 "saschka": {
  "img": "https://static.ra.co/images/profiles/square/saschka.jpg?dateUpdated=1790180348463",
  "links": {
   "ra": "https://ra.co/dj/saschka",
   "sc": "https://soundcloud.com/saschkadj"
  },
  "src": [
   "https://pl.ra.co/dj/saschka",
   "https://ra.co/dj/saschka",
   "https://ra.co/dj/saschka/biography"
  ],
  "linksOk": "2026-10-29",
  "sets": [
   {
    "t": "DJ Frauenquote b2b Saschka (Amore Vienna LHF 003)",
    "u": "https://soundcloud.com/amore-vienna/lhf-003"
   }
  ],
  "setsChecked": "2026-10-31",
  "from": {
   "de": "Stuttgart, lebt in Wien",
   "en": "Stuttgart, based in Vienna"
  },
  "bio": {
   "de": "In Stuttgart aufgewachsen, heute in Wien: Multi-Genre-DJ zwischen House, Trance und Techno mit Wurzeln in der deutschen Rave-Szene. Auftritte u. a. bei Herrensauna, Grand Lighthouse Festival und in den Corsica Studios.",
   "en": "Raised in Stuttgart, now based in Vienna: a multi-genre DJ moving between house, trance and techno with roots in the German rave scene. Played Herrensauna, Grand Lighthouse Festival and Corsica Studios, among others."
  },
  "genres": [
   "Trance",
   "Techno",
   "Progressive",
   "House"
  ],
  "infoChk": "2026-10-31"
 },
 "Weazl": {
  "img": "https://static.ra.co/images/profiles/square/weazl.jpg?dateUpdated=1713883742000",
  "links": {
   "ra": "https://ra.co/dj/weazl"
  },
  "src": [
   "https://ra.co/dj/weazl",
   "https://ra.co/dj/weazl/biography"
  ],
  "linksOk": "2026-10-29",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "genres": [
   "Drum & Bass"
  ],
  "labels": [
   "Collapse Recordings"
  ],
  "bio": {
   "de": "WEAZL ist ein Drum-&-Bass-DJ aus Wien, der seit seinem 16. Lebensjahr auflegt. Er leitet das Label Collapse Recordings und teilte die Bühne bereits mit Artists wie AC13, Malux, Rido, Maze, Basstripper und Sinister Souls.",
   "en": "WEAZL is a drum & bass DJ from Vienna who has been spinning since the age of 16. He heads the label Collapse Recordings and has shared stages with artists such as AC13, Malux, Rido, Maze, Basstripper and Sinister Souls."
  },
  "infoChk": "2026-10-31"
 },
 "Magnetude": {
  "img": "https://static.ra.co/images/profiles/square/magnetude.jpg?dateUpdated=1738720233000",
  "links": {
   "ra": "https://ra.co/dj/magnetude",
   "bc": "https://magnetude.bandcamp.com",
   "sc": "https://soundcloud.com/magnetude",
   "ig": "https://www.instagram.com/magnetudeofficial",
   "web": "https://magnetudemusic.com/"
  },
  "src": [
   "https://ra.co/dj/magnetude"
  ],
  "linksOk": "2026-10-29",
  "from": {
   "de": "UK/Russland",
   "en": "UK/Russia"
  },
  "bio": {
   "de": "Act mit Wurzeln in UK und Russland; Releases u. a. auf Evolution Chamber.",
   "en": "Act with roots in the UK and Russia; releases on Evolution Chamber among others."
  },
  "labels": [
   "Evolution Chamber"
  ],
  "sets": [],
  "setsChecked": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "dj sweet6teen": {
  "img": "https://static.ra.co/images/profiles/square/djsweet6teen.jpg?dateUpdated=1789122042677",
  "links": {
   "ra": "https://ra.co/dj/djsweet6teen",
   "sc": "https://soundcloud.com/djsweet6teen",
   "ig": "https://www.instagram.com/djsweet6teen"
  },
  "src": [
   "https://fr.ra.co/dj/djsweet6teen",
   "https://ra.co/dj/djsweet6teen"
  ],
  "linksOk": "2026-10-29",
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "bio": {
   "de": "DJ aus Deutschland, gestaltete den RA-Podcast RA.1004; spielt u. a. im Gewölbe, Subway (Köln) und Thuishaven.",
   "en": "DJ from Germany who mixed RA podcast RA.1004; plays at Gewölbe, Subway (Cologne) and Thuishaven, among others."
  },
  "infoChk": "2026-10-31"
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
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Reinhard Zach": {
  "noImg": "2026-10-28",
  "links": {
   "sc": "https://soundcloud.com/reinhard-zach"
  },
  "src": [
   "https://soundcloud.com/reinhard-zach",
   "https://m.soundcloud.com/boothhub/0068-reinhard-zach",
   "https://soundcloud.com/non-funxion/special-agent-008-reinhard-zach",
   "https://soundcloud.com/moveandconnect/reini-move-connect-podcast"
  ],
  "infoChk": "2026-10-31"
 },
 "Leon Diamant": {
  "noImg": "2026-10-28"
 },
 "Peradise": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Sweet Spot": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
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
  "noImg": "2026-10-28",
  "links": {
   "sc": "https://soundcloud.com/mrpinklotion"
  },
  "genres": [
   "Hard Techno",
   "Schranz"
  ],
  "bio": {
   "de": "Hard-Techno- und Schranz-DJ mit der Mixreihe „pinked out“ (155–160 BPM). Veröffentlicht eigene Tracks wie „pentada“ und „expressversand“ (mit terrortussy).",
   "en": "Hard techno and schranz DJ behind the \"pinked out\" mix series (155–160 BPM). Releases own tracks such as \"pentada\" and \"expressversand\" (with terrortussy)."
  },
  "src": [
   "https://soundcloud.com/mrpinklotion/tracks",
   "https://soundcloud.com/mrpinklotion/pinked-out-001-hard-technoschranz-set-155-160bpm",
   "https://soundcloud.com/mrpinklotion/pentada",
   "https://soundcloud.com/mrpinklotion/pinklotion-terrortussy-expressversand",
   "https://soundcloud.com/radiorudina/almost-pinkcast-mel-b2b-pinklotion-b2b-bludhound"
  ],
  "infoChk": "2026-10-31"
 },
 "Gopnikbarbie": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Hello Kiffy": {
  "noImg": "2026-10-28",
  "links": {
   "sc": "https://soundcloud.com/user-zlmss"
  },
  "src": [
   "https://soundcloud.com/user-zlmss",
   "https://soundcloud.com/pinkmayhem/hello-kiffy-set-recording",
   "https://soundcloud.com/pinkmayhem/mel-b2b-hello-kiffy-set-recording-2401",
   "https://soundcloud.com/radiorudina/almost-pinkcast-mel-b2b-pinklotion-b2b-bludhound?in=user-zlmss%2Fsets%2Fink-mayhem"
  ],
  "infoChk": "2026-10-31"
 },
 "Kristus": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Pitch Madattak": {
  "img": "https://f4.bcbits.com/img/0013234561_23.jpg",
  "from": {
   "de": "Bozen, Italien",
   "en": "Bolzano, Italy"
  },
  "bio": {
   "de": "Produzent und Live-Act aus Bozen, der zwischen Italien und Europa auftritt; Releases u. a. auf Astrofonik und Undergroundtekno.",
   "en": "Producer and live act from Bolzano performing across Italy and Europe; releases on Astrofonik and Undergroundtekno, among others."
  },
  "labels": [
   "Astrofonik",
   "Undergroundtekno",
   "FLS"
  ],
  "links": {
   "bc": "https://pitchmadattak1.bandcamp.com"
  },
  "noLinks": "2026-10-31",
  "src": [
   "https://pitchmadattak1.bandcamp.com",
   "https://www.infoconcert.com/artiste/pitch-mad-attak-146194/concerts/presentation"
  ],
  "infoChk": "2026-10-31"
 },
 "Gehlektek": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Apocalypz": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Miss Undertaker": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Sportacore": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Cheddar Boyz": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Veneno": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "PRDK": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "DNBREAK": {
  "noImg": "2026-10-28",
  "links": {
   "sc": "https://soundcloud.com/fabiiam"
  },
  "genres": [
   "Drum & Bass"
  ],
  "src": [
   "https://soundcloud.com/fabiiam",
   "https://soundcloud.com/gorilla-cave/dnbreak-b2b-scarnox-mastered?in=luke-anmacht/sets/dnb"
  ],
  "infoChk": "2026-10-31"
 },
 "Scapula": {
  "noImg": "2026-10-28",
  "links": {
   "sc": "https://soundcloud.com/scapula_at"
  },
  "src": [
   "https://soundcloud.com/scapula_at"
  ],
  "infoChk": "2026-10-31"
 },
 "Skeedz": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Rellux": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Sinis": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Mayez": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Ben Leander": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "2bihonest": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Sarah Dæwie": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Jade Anima": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Burr Oak": {
  "img": "https://i.scdn.co/image/ab6761610000e5eb1812dfb8da2c1231ea762ebc",
  "tracks": [
   "Originate",
   "Ring The Death Knell"
  ],
  "links": {
   "sp": "https://open.spotify.com/artist/3yyEYoHrjvoUtLJ6n2Wz83"
  },
  "src": [
   "https://open.spotify.com/artist/3yyEYoHrjvoUtLJ6n2Wz83"
  ],
  "infoChk": "2026-10-31"
 },
 "Zombie Cats": {
  "img": "https://f4.bcbits.com/img/0021678544_23.jpg",
  "from": {
   "de": "Deutschland/Australien",
   "en": "Germany/Australia"
  },
  "bio": {
   "de": "Drum-&-Bass-Duo aus Rouven Fehr und Ross Deschamp mit Studios in Deutschland und Australien; Releases u. a. auf Eatbrain, Liquicity, Dispatch und Drum&BassArena.",
   "en": "Drum & bass duo of Rouven Fehr and Ross Deschamp with studios in Germany and Australia; releases on Eatbrain, Liquicity, Dispatch and Drum&BassArena, among others."
  },
  "tracks": [
   "Cat Attack",
   "Zima",
   "Kraken"
  ],
  "genres": [
   "Drum & Bass"
  ],
  "labels": [
   "Eatbrain",
   "Liquicity",
   "Dispatch",
   "Drum&BassArena"
  ],
  "links": {
   "bc": "https://wearezombiecats.bandcamp.com",
   "web": "https://wearezombiecats.org"
  },
  "noLinks": "2026-10-31",
  "src": [
   "https://wearezombiecats.bandcamp.com/music"
  ],
  "infoChk": "2026-10-31"
 },
 "Kaama": {
  "noImg": "2026-10-31",
  "links": {
   "sc": "https://soundcloud.com/kamila-vejvodova"
  },
  "infoChk": "2026-10-31"
 },
 "Didz": {
  "noImg": "2026-10-31",
  "links": {
   "sc": "https://soundcloud.com/diddi-schellnegger"
  },
  "infoChk": "2026-10-31"
 },
 "Puppy Devil": {
  "noImg": "2026-10-31",
  "links": {
   "sc": "https://soundcloud.com/user-345074195"
  },
  "infoChk": "2026-10-31"
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
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "PATRIK HOUR": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
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
  "img": "https://static.ra.co/images/profiles/square/luzzt.jpg?dateUpdated=1692132918000",
  "links": {
   "ra": "https://ra.co/dj/luzzt"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Georg Böck",
  "bio": {
   "de": "LUZZT (Georg Böck) ist ein österreichischer DJ, der vor allem in Wien auflegt. Am häufigsten spielt er im Das Werk und im FLUCC.",
   "en": "LUZZT (Georg Böck) is an Austrian DJ who mostly plays in Vienna. His most-played clubs are Das Werk and FLUCC."
  },
  "src": [
   "https://ra.co/events/2143849",
   "https://ra.co/dj/luzzt"
  ],
  "infoChk": "2026-10-31"
 },
 "Qaoz": {
  "img": "https://static.ra.co/images/profiles/square/qaoz.jpg?dateUpdated=1722523267000",
  "links": {
   "ra": "https://ra.co/dj/qaoz",
   "sc": "https://soundcloud.com/qaoz",
   "ig": "https://www.instagram.com/byqaoz",
   "web": "https://qaoz.me"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "labels": [
   "Feel Free Records",
   "Obscuur",
   "Carbone Records",
   "fhainest",
   "DTECT-Records",
   "Streamlines",
   "Milli Records"
  ],
  "bio": {
   "de": "Qaoz ist ein österreichischer DJ und Produzent, der vor allem in Wien spielt, am häufigsten im Das Werk. Veröffentlichungen erschienen u. a. auf Feel Free Records, Obscuur, Carbone Records, DTECT-Records und Milli Records.",
   "en": "Qaoz is an Austrian DJ and producer who plays mostly in Vienna, most often at Das Werk. Releases have appeared on labels including Feel Free Records, Obscuur, Carbone Records, DTECT-Records and Milli Records."
  },
  "src": [
   "https://ra.co/events/2353351",
   "https://ra.co/dj/qaoz"
  ],
  "infoChk": "2026-10-31"
 },
 "Drum Dad & Bass Boy": {
  "img": "https://i.scdn.co/image/ab6761610000e5eb4ff7471ebb471b57166b4093",
  "links": {
   "sp": "https://open.spotify.com/artist/3UyclZxeiOyCtZyiWmUbBm"
  },
  "src": [
   "https://open.spotify.com/artist/3UyclZxeiOyCtZyiWmUbBm",
   "https://open.spotify.com/album/3uw1Wkfi360BvKH0ZjJ0pW",
   "https://open.spotify.com/album/43IhxxqKfS2NLiSg3t0gSH",
   "https://open.spotify.com/album/5ESMgKEUZzOJLfCG7c13vN"
  ],
  "bio": {
   "de": "Drum-&-Bass-Act mit Singles wie „Feeling Good“ (2026), „Walzer“ und „BOMBOCLAT DUB“.",
   "en": "Drum & bass act with singles such as \"Feeling Good\" (2026), \"Walzer\" and \"BOMBOCLAT DUB\"."
  },
  "infoChk": "2026-10-31"
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
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Hanno": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Meltdown": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Janex": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "OKO": {
  "noImg": "2026-10-31",
  "links": {
   "sc": "https://soundcloud.com/eorgiearper"
  },
  "infoChk": "2026-10-31"
 },
 "Mina": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "maximo": {
  "img": "https://static.ra.co/images/profiles/square/maximilianfoit-at.jpg?dateUpdated=1682594057000",
  "links": {
   "ra": "https://ra.co/dj/maximilianfoit-at",
   "sc": "https://soundcloud.com/maximilian-foit-1"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Maximilian Foit",
  "bio": {
   "de": "maximo ist das Alias von Maximilian Foit, der in Wien geboren und aufgewachsen ist. Seine erste Verbindung zur elektronischen Musik entstand Mitte der 90er im Alter von acht Jahren. Am häufigsten spielt er in Wien in der Pratersauna, im SASS Music Club, in der Auslage, im FLUCC und im PRST.",
   "en": "maximo is the alias of Maximilian Foit, born and raised in Vienna. His first connection to electronic music came in the mid-90s at the age of eight. His most-played Vienna clubs are Pratersauna, SASS Music Club, Auslage, FLUCC and PRST."
  },
  "src": [
   "https://ra.co/dj/maximilianfoit-at",
   "https://soundcloud.com/maximilian-foit-1",
   "https://ra.co/events/1378405"
  ],
  "infoChk": "2026-10-31"
 },
 "Joey": {
  "img": "https://static.ra.co/images/profiles/square/joey-2.jpg?dateUpdated=1769944329620",
  "links": {
   "ra": "https://ra.co/dj/joey-2",
   "sc": "https://soundcloud.com/joey_vienna",
   "ig": "https://www.instagram.com/joey.vienna",
   "web": "https://dj-joey.com"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Johannes Turpel",
  "labels": [
   "The Finest Techno",
   "HERZFREQUENZ"
  ],
  "bio": {
   "de": "Joey (Johannes Turpel) ist ein österreichischer Techno-DJ mit dem Motto „Loud & Louder. Hard & Harder.“ Er spielt vor allem in Wien, am häufigsten im Das Werk, in der Grelle Forelle und im FLUCC. Auf RA sind die Labels The Finest Techno und HERZFREQUENZ gelistet.",
   "en": "Joey (Johannes Turpel) is an Austrian techno DJ whose motto is \"Loud & Louder. Hard & Harder.\" He plays mostly in Vienna, most often at Das Werk, Grelle Forelle and FLUCC. His RA profile lists the labels The Finest Techno and HERZFREQUENZ."
  },
  "src": [
   "https://ra.co/events/2382527",
   "https://ra.co/dj/joey-2"
  ],
  "infoChk": "2026-10-31"
 },
 "CED": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Lazaro": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Distorted": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Hannah": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Anni Herzer": {
  "from": {
   "de": "Wien",
   "en": "Vienna, Austria"
  },
  "genres": [
   "House",
   "Hard House",
   "90s House",
   "acid house"
  ],
  "img": "https://i1.sndcdn.com/avatars-gzJnOoEawccUTjYG-wHH6xg-t500x500.jpg",
  "links": {
   "sc": "https://soundcloud.com/anniherzer"
  },
  "man": 1,
  "sets": [
   {
    "t": "Anni Herzer – Live from SASS (HERZZZ)",
    "u": "https://soundcloud.com/sass-music-club/live-from-sass-anni-herzer-herzzz"
   },
   {
    "t": "121MIN TRAIN-ING [ÖBB Train Party]",
    "u": "https://soundcloud.com/anniherzer/anniherzer-discozug-230923"
   }
  ],
  "setsChecked": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "DJ Observer": {
  "img": "https://static.ra.co/images/profiles/djobserver.jpg?dateUpdated=1223075127497",
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "DJ aus Österreich.",
   "en": "DJ from Austria."
  },
  "links": {
   "ra": "https://de.ra.co/dj/djobserver",
   "web": "https://www.djobserver.com"
  },
  "src": [
   "https://de.ra.co/dj/djobserver"
  ],
  "infoChk": "2026-10-31"
 },
 "THAM": {
  "img": "https://static.ra.co/images/profiles/tham.jpg?dateUpdated=1471451515047",
  "from": {
   "de": "Berlin, Deutschland",
   "en": "Berlin, Germany"
  },
  "bio": {
   "de": "DJ und Produzent aus Berlin mit Releases u. a. auf R Label Group, Lebendig, Ismus und Destroy To Rebuild Records.",
   "en": "Berlin-based DJ and producer with releases on R Label Group, Lebendig, Ismus and Destroy To Rebuild Records, among others."
  },
  "labels": [
   "R Label Group",
   "Lebendig",
   "Ismus",
   "Destroy To Rebuild Records",
   "Deestricted"
  ],
  "links": {
   "ra": "https://de.ra.co/dj/tham",
   "sc": "https://www.soundcloud.com/thambln"
  },
  "src": [
   "https://de.ra.co/dj/tham"
  ],
  "sets": [
   {
    "t": "THAM @ Hör Berlin (Februar 2025)",
    "u": "https://soundcloud.com/thambln/hoer-berlin-february-2025"
   },
   {
    "t": "THAM – Techno Germany Podcast 102",
    "u": "https://soundcloud.com/technogermany/tham-techno-germany-podcast-102"
   }
  ],
  "setsChecked": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "E.LINA": {
  "img": "https://static.ra.co/images/profiles/square/e-lina.jpg?dateUpdated=1684773635000",
  "from": {
   "de": "Ukraine, lebt in Berlin",
   "en": "Ukraine, based in Berlin"
  },
  "bio": {
   "de": "Multidisziplinäre Künstlerin aus Berlin mit Wurzeln in der ukrainischen Underground-Szene, bekannt als leidenschaftliche Plattensammlerin und Diggerin.",
   "en": "Berlin-based multidisciplinary artist from the Ukrainian underground scene, known for her passion for records and digging."
  },
  "links": {
   "ra": "https://ra.co/dj/e-lina",
   "sc": "https://www.soundcloud.com/elinaelian",
   "ig": "https://www.instagram.com/e.lina.elian",
   "web": "https://linktr.ee/e.lina.dj"
  },
  "src": [
   "https://ra.co/dj/e-lina"
  ],
  "sets": [
   {
    "t": "E.LINA @ Club der Visionaere (09.08.2023)",
    "u": "https://soundcloud.com/elinaelian/elina-cdv-mixxxx"
   },
   {
    "t": "DDC Mix 006 – E.Lina",
    "u": "https://soundcloud.com/diasdecampo/ddc-mix-006-elina"
   }
  ],
  "setsChecked": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Max Styler": {
  "img": "https://static.ra.co/images/profiles/square/maxstyler.jpg?dateUpdated=1759778202897",
  "from": {
   "de": "Kalifornien, USA",
   "en": "California, USA"
  },
  "bio": {
   "de": "Produzent und DJ aus Kalifornien mit fast zehn Jahren Produktionserfahrung; Releases u. a. auf Diynamic, Truesoul und Kraftek.",
   "en": "California-born producer and DJ with nearly a decade of production experience; releases on Diynamic, Truesoul and Kraftek, among others."
  },
  "labels": [
   "Diynamic Music",
   "Truesoul",
   "Kraftek",
   "REALM"
  ],
  "links": {
   "ra": "https://ra.co/dj/maxstyler"
  },
  "src": [
   "https://ra.co/dj/maxstyler"
  ],
  "infoChk": "2026-10-31"
 },
 "Kyau & Albert": {
  "img": "https://static.ra.co/images/profiles/kyaualbert.jpg?dateUpdated=1256751105000",
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "bio": {
   "de": "Duo aus Ralph Kyau und Steven Möbius Albert, früher als Kyau vs. Albert bekannt.",
   "en": "Duo of Ralph Kyau and Steven Moebius Albert, formerly known as Kyau vs. Albert."
  },
  "links": {
   "ra": "https://ra.co/dj/kyaualbert",
   "web": "https://www.kyauandalbert.com/en/en.html"
  },
  "src": [
   "https://ra.co/dj/kyaualbert"
  ],
  "infoChk": "2026-10-31"
 },
 "Minor Forms": {
  "img": "https://static.ra.co/images/profiles/square/minorforms.jpg?dateUpdated=1711361301000",
  "from": {
   "de": "London, UK",
   "en": "London, UK"
  },
  "bio": {
   "de": "Drum-&-Bass-Produzent und DJ aus London; Releases auf C.I.A.",
   "en": "Drum & bass producer and DJ from London; releases on C.I.A."
  },
  "genres": [
   "Drum & Bass"
  ],
  "labels": [
   "C.I.A."
  ],
  "links": {
   "ra": "https://ra.co/dj/minorforms"
  },
  "src": [
   "https://ra.co/dj/minorforms"
  ],
  "infoChk": "2026-10-31"
 },
 "Michel Lauriola": {
  "img": "https://static.ra.co/images/profiles/square/michellauriola.jpg?dateUpdated=1486390644390",
  "from": {
   "de": "Buenos Aires, Argentinien",
   "en": "Buenos Aires, Argentina"
  },
  "bio": {
   "de": "Italienische Wurzeln, in Venezuela geboren, lebt in Buenos Aires. Releases u. a. auf Credo, Naked Lunch, Android Muziq und Gynoid Audio.",
   "en": "Italian roots, born in Venezuela, based in Buenos Aires. Releases on Credo, Naked Lunch, Android Muziq and Gynoid Audio, among others."
  },
  "labels": [
   "Credo",
   "Naked Lunch Records",
   "Android Muziq",
   "TMM Records",
   "Selected Records",
   "Illegal Alien Records",
   "Gynoid Audio",
   "Different is Different Records"
  ],
  "links": {
   "ra": "https://ra.co/dj/michellauriola",
   "sc": "https://www.soundcloud.com/michellauriola"
  },
  "src": [
   "https://ra.co/dj/michellauriola"
  ],
  "sets": [
   {
    "t": "Michel Lauriola @ Disorder #139",
    "u": "https://soundcloud.com/connectch/disorder-139"
   }
  ],
  "setsChecked": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Peter Portman": {
  "img": "https://static.ra.co/images/profiles/peterportman.jpg?dateUpdated=1471996800000",
  "from": {
   "de": "Serbien",
   "en": "Serbia"
  },
  "bio": {
   "de": "DJ aus Serbien, Resident der Beat-Partys und Teilnehmer der Burn Residency 2016; Releases u. a. auf Neptuun City, ROMP und Mindless Records.",
   "en": "DJ from Serbia, resident of the Beat parties and Burn Residency 2016 contestant; releases on Neptuun City, ROMP and Mindless Records, among others."
  },
  "labels": [
   "Neptuun City",
   "Patent Skillz",
   "Parabola",
   "ROMP",
   "Mindless Records"
  ],
  "links": {
   "ra": "https://ra.co/dj/peterportman",
   "sc": "https://www.soundcloud.com/peterportman93"
  },
  "src": [
   "https://ra.co/dj/peterportman",
   "https://ra.co/events/2361147"
  ],
  "sets": [
   {
    "t": "NWDCAST022 – Peter Portman",
    "u": "https://soundcloud.com/nowwedeep/nwdcast022-peter-portman"
   }
  ],
  "setsChecked": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "The Dark Horror": {
  "noImg": "2026-10-31",
  "bio": {
   "de": "Hardcore-Produzent mit Kollaborationen u. a. mit Guizcore, Deadly Guns, Major Conspiracy und Dual Damage.",
   "en": "Hardcore producer with collaborations with Guizcore, Deadly Guns, Major Conspiracy and Dual Damage, among others."
  },
  "tracks": [
   "In The Pit",
   "Heavy Energy",
   "FENDI ON MY EYES"
  ],
  "links": {
   "sp": "https://open.spotify.com/artist/3e7LfI39pUL22PeGn1mlFa"
  },
  "src": [
   "https://open.spotify.com/artist/3e7LfI39pUL22PeGn1mlFa"
  ],
  "infoChk": "2026-10-31"
 },
 "The Straikerz": {
  "img": "https://i.scdn.co/image/ab6761610000e5ebf889cf24b9ebd129d03f3a10",
  "bio": {
   "de": "Act mit Singles wie „Highscore“, „Kill The Beat“ und „Beat Of The Drum“ sowie Kollaborationen u. a. mit Arzadous, Adjuzt und Sound Rush.",
   "en": "Act with singles such as \"Highscore\", \"Kill The Beat\" and \"Beat Of The Drum\" and collaborations with Arzadous, Adjuzt and Sound Rush, among others."
  },
  "tracks": [
   "Highscore",
   "Kill The Beat",
   "Beat Of The Drum",
   "Pain"
  ],
  "links": {
   "sp": "https://open.spotify.com/artist/23YqfnxHhNcTMAkU4hxl1l"
  },
  "src": [
   "https://open.spotify.com/artist/23YqfnxHhNcTMAkU4hxl1l"
  ],
  "infoChk": "2026-10-31"
 },
 "Pinotello": {
  "noImg": "2026-10-31",
  "tracks": [
   "Gotta Die",
   "BadBoy Sound",
   "BRUTAL KAOZ"
  ],
  "links": {
   "sc": "https://soundcloud.com/pinostacks"
  },
  "infoChk": "2026-10-31"
 },
 "Poley Tight": {
  "noImg": "2026-10-31",
  "tracks": [
   "Engel des Todes",
   "Blasphemous Traitors"
  ],
  "links": {
   "sc": "https://soundcloud.com/poleytight"
  },
  "sets": [
   {
    "t": "Poley Tight @ Dominator 2024",
    "u": "https://soundcloud.com/dominatorfestival/dominator-2024-poley-tight"
   }
  ],
  "setsChecked": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Schlot": {
  "noImg": "2026-10-31",
  "tracks": [
   "Legacy of Chaos (Freedom of Hardcore Intro)",
   "The Underworld",
   "Hard Beats"
  ],
  "links": {
   "sc": "https://soundcloud.com/therealschlot"
  },
  "infoChk": "2026-10-31"
 },
 "Outlined": {
  "noImg": "2026-10-31",
  "links": {
   "sc": "https://soundcloud.com/user-530319358"
  },
  "infoChk": "2026-10-31"
 },
 "NEXUS": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "SAMI": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "DJ Fred": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "zey": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Santo": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Chrome": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "j.around": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Lenz Rausch": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Scheibosan": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "C12": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Floer Klamauk": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Stalinsky": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "DJ Shady MF": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Sonic Warfare": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Another Dimension": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Emkatress": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Fractured Souls": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Eternal Injustice vs Raw Kickzz": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Recovered": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Dennes Deen": {
  "noImg": "2026-10-31",
  "links": {
   "sc": "https://soundcloud.com/dennesdeen"
  },
  "infoChk": "2026-10-31"
 },
 "Duracell": {
  "noImg": "2026-10-31",
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "Österreichische DJ-Legende, die zuerst im Biosphere mit sphärischem Sound auf sich aufmerksam machte.",
   "en": "Austrian DJ legend who first made a name for himself with a spherical sound at Biosphere."
  },
  "noLinks": "2026-10-31",
  "src": [
   "https://www.vienna.at/timeline-die-dj-legenden-sterreichs/2952605"
  ],
  "infoChk": "2026-10-31"
 },
 "Uptempo Babys": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Agonize": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Burger Kingz": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Mark Enigma": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Rick C": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Cancel": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "KarmaSutra": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Pesca": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Lucifer": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Frau F": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "DJ Handgepäck": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "DJ Streuselkuchen": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Tom Silver": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Sdricci": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Adelic": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Rantom": {
  "bio": {
   "de": "Rantom ist ein Techno-DJ aus der Wiener Szene, von dem HERZFREQUENZ mehrere Set-Mitschnitte aus dem Das Werk und der Grelle Forelle veröffentlicht hat. Sein Track „Crowd Control“ erschien auf der Compilation „Pakt VA“ [GDNVA01].",
   "en": "Rantom is a techno DJ from the Vienna scene; HERZFREQUENZ has released several of his set recordings from Das Werk and Grelle Forelle. His track \"Crowd Control\" appeared on the compilation \"Pakt VA\" [GDNVA01]."
  },
  "src": [
   "https://soundcloud.com/herzfrequenz_techno/rantom-hz-250110",
   "https://soundcloud.com/herzfrequenz_techno/rantom-impulse-021124",
   "https://soundcloud.com/technowereld/premiere-rantom-crowd-control-gdnva01",
   "https://ra.co/events/2382527",
   "https://ra.co/events/2143849"
  ],
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Nikilist": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "KRISTUS": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Feli Nightingale": {
  "img": "https://static.ra.co/images/profiles/square/felinightingale.jpg?dateUpdated=1778683118337",
  "links": {
   "ra": "https://ra.co/dj/felinightingale",
   "ig": "https://www.instagram.com/Felinightingale"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Feliciano Nightingale",
  "bio": {
   "de": "Feli Nightingale ist Promoter, DJ und Produzent aus Wien. Am häufigsten spielt er im Das Werk und in der Grelle Forelle.",
   "en": "Feli Nightingale is a promoter, DJ and producer from Vienna. His most-played clubs are Das Werk and Grelle Forelle."
  },
  "src": [
   "https://ra.co/events/2323484",
   "https://ra.co/dj/felinightingale"
  ],
  "infoChk": "2026-10-31"
 },
 "Techflex": {
  "img": "https://static.ra.co/images/profiles/square/techflex.jpg?dateUpdated=1744880555000",
  "links": {
   "ra": "https://ra.co/dj/techflex"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Felix Lebl",
  "genres": [
   "Techno"
  ],
  "labels": [
   "Trapez",
   "Children of Tomorrow",
   "Sleaze Records",
   "Naked Lunch Records",
   "Jeton Records",
   "Luminar Records",
   "Unknown Territory",
   "Dolma Records",
   "Technodrome",
   "Black Codes Experiments",
   "Shadow State"
  ],
  "bio": {
   "de": "Techflex ist ein in Wien ansässiger Techno-Produzent und DJ, der seit den frühen 1990ern in der Techno-Szene aktiv ist. Sein Sound ist roh, hypnotisch, dunkel und hart. Er veröffentlichte u.a. auf Naked Lunch, Black Codes Experiments, Sleaze Records, Children of Tomorrow, Trapez und Dolma und betreibt das Underground-Techno-Label Shadow State.",
   "en": "Techflex is a Vienna-based techno producer and DJ who has been involved in techno since the early 1990s. His sound is raw, hypnotic, dark and hard. He has released on labels including Naked Lunch, Black Codes Experiments, Sleaze Records, Children of Tomorrow, Trapez and Dolma, and runs the underground techno label Shadow State."
  },
  "src": [
   "https://ra.co/dj/techflex",
   "https://ra.co/dj/techflex/biography"
  ],
  "infoChk": "2026-10-31"
 },
 "Mike Mystik": {
  "img": "https://static.ra.co/images/profiles/square/mikemystik.jpg?dateUpdated=1789204766220",
  "links": {
   "ra": "https://ra.co/dj/mikemystik",
   "sc": "https://soundcloud.com/dj-mike-mystic",
   "ig": "https://www.instagram.com/dj_mike_mystik",
   "web": "https://www.beatport.com/de/artist/mike-mystik/1501932"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Michael Böhm",
  "genres": [
   "Techno"
  ],
  "labels": [
   "Shadow State"
  ],
  "bio": {
   "de": "Mike Mystik steht für deepe, dunkle Techno-Vibes. Er legte bereits vor 2000 in Underground-Techno-Clubs auf und ist nach einer langen Pause mit treibendem Sound für Wien zurück.",
   "en": "Mike Mystik stands for deep and dark techno vibes. He played underground techno clubs before 2000 and, after a long break, is back with a driving sound for Vienna."
  },
  "src": [
   "https://ra.co/dj/mikemystik"
  ],
  "infoChk": "2026-10-31"
 },
 "Zuckerfrei": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 }
};
const VG={
 "Event Arena Vösendorf": [
  48.123,
  16.33
 ],
 "M1 Club": [
  48.1992,
  16.3753
 ],
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
{"d":"2026-10-30","s":"19:00","e":"00:00","title":"Drum&Bass am Würstelstand","venue":"Wiener Würstelstand Spittelau","genres":["Drum & Bass"],"floors":[{"f":"","a":["19:00|Martin_Van_Vienna","21:30|Revax"]}],"price":"Eintritt frei / free entry","flyer":"https://rave.wien/flyers/2026-10-30-drum-bass-wuerstelstand.jpg","note":{"de":"Drum & Bass im Freien am Wiener Würstelstand bei der U4-Station Spittelau: Martin_Van_Vienna legt von 19:00 bis 21:30 auf, danach Revax bis Mitternacht. Eintritt frei.","en":"Open-air drum & bass at the Wiener Würstelstand by the U4 station Spittelau: Martin_Van_Vienna plays from 19:00 to 21:30, followed by Revax until midnight. Free entry."},"man":1,"chk":"2026-10-30","src":[["man","https://rave.wien/"]]},
{"age":"18+","d":"2026-10-30","s":"21:00","e":"06:00","title":"ZusammenKommen – Süßes oder Sauerei","venue":"Ottakringer Brauerei","coll":["hausgemacht"],"genres":["Techno"],"sexpos":1,"aw":1,"nophoto":1,"floors":[{"f":"Hefeboden","a":["21:00|Max Kernmayer b2b Konrad Kaltenböck","22:45|Baby Blue","00:30|Pau:sa","02:00|lexyz0 & DJ Lotto","03:45|Frühwerk"]},{"f":"Alte Technik","a":["21:00|Delaine","22:45|Ele Luz","00:30|Saint A","02:15|Ferdinand Schwarz","04:15|MA!A"]}],"tickets":"https://app.hausgemacht.org/events/zk-sos","note":{"de":"Halloween-Edition der sexpositiven Reihe ZusammenKommen von hausgemacht in der Ottakringer Brauerei: drei Etagen mit drei Bereichen – einer für Musik und Bewegung, einer für Performances und intimere Momente (inkl. Darkrooms) und eine Ruhezone. Techno gibt es auf zwei Floors: Am Hefeboden spielen u. a. Max Kernmayer b2b Konrad Kaltenböck, Baby Blue, Pau:sa, lexyz0 & DJ Lotto und Frühwerk, in der Alten Technik Delaine, Ele Luz, Saint A, Ferdinand Schwarz und MA!A. Dresscode „Trick or Treat“ (keine politischen Statements, keine Uniformen von Rettungsdiensten, keine Leuchtaccessoires; Umziehen vor Ort nicht möglich). Konsens steht im Mittelpunkt, Handykameras werden abgeklebt, das Awareness-Team trägt Lichterketten. Tickets nur im Vorverkauf nach Bewerbung, strenge Tür, 18+ mit Lichtbildausweis; ein Preis ist nicht veröffentlicht.","en":"Halloween edition of hausgemacht's sex-positive ZusammenKommen series at Ottakringer Brauerei: three levels with three areas – one for music and movement, one for performances and more intimate moments (incl. darkrooms) and a quiet zone. Techno on two floors: on the Hefeboden Max Kernmayer b2b Konrad Kaltenböck, Baby Blue, Pau:sa, lexyz0 & DJ Lotto and Frühwerk, in the Alte Technik Delaine, Ele Luz, Saint A, Ferdinand Schwarz and MA!A. Dress code \"Trick or Treat\" (no political statements, no emergency-service uniforms, no light-up accessories; no changing on site). Consent is central, phone cameras are taped, the awareness team wears fairy lights. Presale only after application, strict door, 18+ with photo ID; price not published."},"src":[["hg","https://www.hausgemacht.org/en/events/zusammenkommen-suesses-oder-sauerei"],["sp","https://sexpositives.com/en/events/hausgemacht-ottakringer/"],["ob","https://www.ottakringerbrauerei.at/de/event/zusammenkommen-suesses-oder-sauerei/"]],"vok":1,"flyer":"https://cdn.prod.website-files.com/62f2b94feafac5f9b05877aa/6a7f28a6a59e6b692a09d003_ZusammenKommen-Suesses-oder-Sauerei.jpg","na":["price"],"chk":"2026-10-30","srcChk":"2026-10-29","io":["Indoor"],"man":1},
{"d":"2026-10-30","s":"21:00","e":"06:00","title":"Drahthaus Album Release Show x TOGA","venue":"FLUCC Deck","coll":["Tanz oder gar nicht"],"genres":["Downtempo","Electronica","Dubstep","Latin"],"floors":[{"f":"Deck","a":["23:00|Hannsolo","00:30|Drahthaus","02:00|Mareia","04:00|ing.dude"]}],"head":["Drahthaus"],"price":"VVK 22 € (weitere Stufen 11 € / 50 €, nicht näher bezeichnet)","tickets":"https://ntry.at/Drahthaus?l=de","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/Drahthaus_30.10.26.max-2560x1440.png","aw":1,"note":{"de":"Die Wiener Band Drahthaus stellt im FLUCC Deck ihr Album „Elephant In The Room“ vor, das auf Downtempo-Electronica basiert, die die Band dehnt und aufbricht – angekündigt als tanzbare, psychedelische und stellenweise humorvolle Show (live um 00:30). Gemeinsam mit dem befreundeten Kollektiv Tanz oder gar nicht (TOGA) wird daraus eine ganze Nacht: um 21:00 ein Tanzworkshop mit Tanzresonanz, danach Hannsolo mit Latin Beats, nach dem Konzert Mareia mit Bouncy Beats und ab 04:00 ing.dude mit Old School Dubstep bis 06:00. Dazu Deko, eine Tattoo-Station und Awareness-Angebote; festliche Kleidung erwünscht.","en":"Viennese band Drahthaus present their album \"Elephant In The Room\" at FLUCC Deck, built on downtempo electronica that the band stretches and breaks open – billed as a danceable, psychedelic and at times humorous show (live at 00:30). Together with their long-time friends from the collective Tanz oder gar nicht (TOGA) it becomes a full night: a dance workshop with Tanzresonanz at 21:00, then Hannsolo with Latin beats, after the concert Mareia with bouncy beats and from 04:00 ing.dude with old-school dubstep until 06:00. Plus decoration, a tattoo station and awareness services; festive outfits encouraged."},"vok":1,"src":[["fl","https://flucc.at/events/mJ2U85-live-drahthaus/"],["fl","https://flucc.at/"]],"na":["age"],"chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-10-30","s":"22:00","e":"05:00","title":"FORA","venue":"PRST","src":[["ft","https://frey-tag.at/locations/club-praterstrasse"],["ft","https://frey-tag.at/kalender/fora-1?s=wJe2A2di6"],["pr","https://prst.ticket.io/STnPV92b/"]],"floors":[{"f":"","a":["ADOBEAR","BAD PANDA","YAKKA"]}],"note":{"de":"FORA feiert im PRST sein einjähriges Bestehen unter dem Motto „One Year. One Family. Countless Memories.“ – ein Rückblick auf ein Jahr voller Musik, Nächte und Momente, die die Community zusammengebracht haben. An den Decks stehen ADOBEAR, BAD PANDA und YAKKA; nähere Angaben zu den Acts, Set-Zeiten und ein Eintrittspreis sind nicht veröffentlicht. Das Event ist nicht im PRST-Ticketshop gelistet (prst.ticket.io führt nur Halloween am 31.10.).","en":"FORA celebrates its first anniversary at PRST under the motto \"One Year. One Family. Countless Memories.\" – looking back on a year of music, nights and moments that brought the community together. On the decks: ADOBEAR, BAD PANDA and YAKKA; no further details on the acts, set times or entry price have been published. The event is not listed in PRST's ticket shop (prst.ticket.io only lists Halloween on 31 Oct)."},"coll":["FORA"],"na":["price","flyer","tickets"],"chk":"2026-10-30","srcChk":"2026-10-29","genres":["Electronic"]},
{"d":"2026-10-30","s":"22:00","e":"05:00","title":"Gayloween x Titti Queer Club","venue":"The Loft","coll":["Titti Queer Club"],"genres":["Techno","Pop"],"floors":[{"f":"Oben (Techno)","a":["23:00|Deleven","01:00|DORAH","02:30|Bella"]},{"f":"Unten (Pop, All-Time Favorites)","a":["22:00|Ryta Tale","23:00|Clemotone","01:00|Nani Mag. Viech","02:30|Countessa"]},{"f":"Wohnzimmer (Mixed)","a":["23:00|TRMT","00:00|La Destinación Final","01:00|Humi","02:30|Flual","03:00|Bloodsugar"]}],"price":"10–15 €","age":"18+","lgbtq":1,"note":{"de":"Titti ist eine queere Partyreihe in Wien, die seit rund sieben Jahren queeren Gästen einen sicheren Raum und queeren Künstler:innen eine Bühne bietet – zu Halloween als „Gayloween“ im The Loft auf drei Floors. Oben läuft Techno mit Deleven, DORAH und Bella, unten Pop und All-Time Favorites mit Ryta Tale, Clemotone, Nani Mag. Viech und Countessa, im Wohnzimmer gemischte Musik mit TRMT, La Destinación Final, Humi, Flual und Bloodsugar. Um 01:00 gibt es unten eine Drag-Show mit Metamorkid, Ryta Tale, XYZ und Canaya. Eintritt 10/15 €, ab 18; alle Geschlechter willkommen, keine Toleranz für Sexismus, Homophobie, Rassismus, Body-Shaming oder andere Diskriminierung.","en":"Titti is a queer party series in Vienna that has offered queer guests a safe space and queer artists a stage for around seven years – for Halloween as \"Gayloween\" at The Loft across three floors. Upstairs techno with Deleven, DORAH and Bella, downstairs pop and all-time favourites with Ryta Tale, Clemotone, Nani Mag. Viech and Countessa, and mixed music in the Wohnzimmer with TRMT, La Destinación Final, Humi, Flual and Bloodsugar. At 1 am there is a drag show downstairs with Metamorkid, Ryta Tale, XYZ and Canaya. Entry €10/15, 18+; all genders welcome, no tolerance for sexism, homophobia, racism, body shaming or any other discrimination."},"vok":1,"src":[["lo","https://www.theloft.at/gayloween-x-titti-queer-club/"]],"na":["flyer"],"chk":"2026-10-30","srcChk":"2026-10-29"},
{"age":"18+","d":"2026-10-30","s":"22:30","e":"05:00","title":"Kranke Welt: Halloween Kick Off","venue":"Club Exil","genres":["Techno","Schranz"],"price":"21 € (Final Phase) / Early Bird 12 €","floors":[{"f":"","a":["Aschenbrenner","Lorenzo Raganzini","Neon Graveyard","Stratera"]}],"tickets":"https://exil.ticket.io/4t8mMJHM/","flyer":"https://cdn.ticket.io/companies/QnXA3adF/events/4t8mMJHM/img/holder-1080.jpg?e9930d6a","nophoto":1,"note":{"de":"Kranke Welt eröffnet das Halloween-Wochenende am Vorabend im Club Exil in Vösendorf, knapp außerhalb Wiens: dunkle Sounds und hohe Energie, von treibendem, groovigem Techno bis zu kompromisslos hartem Schranz. Headliner sind Lorenzo Raganzini und Neon Graveyard (u. a. bekannt für 12-Stunden-Schranz-Sets im Gotec Club), dazu spielen der Wiener Aschenbrenner und Stratera. Kein Dresscode, Kostüme sind willkommen; auf dem Dancefloor gilt No-Filming. Early-Bird-Tickets (12 €) waren limitiert, aktuell 21 € in der Final Phase.","en":"Kranke Welt kicks off the Halloween weekend the night before at Club Exil in Vösendorf, just outside Vienna: dark sounds and high energy, from driving, groovy techno to uncompromisingly hard Schranz. Headliners are Lorenzo Raganzini and Neon Graveyard (known among other things for 12-hour Schranz sets at Gotec Club), joined by Vienna's Aschenbrenner and Stratera. No dress code, costumes welcome; no filming on the dancefloor. Early bird tickets (€12) were limited, currently €21 in the final phase."},"src":[["ra","https://ra.co/events/2557865"],["ex","https://www.club-exil.at/"],["ex","https://club-exil.at/"],["exi","https://exil.ticket.io/4t8mMJHM/"],["wa","https://warda.at/events/kranke-welt-halloween/"],["vo","https://www.volume.at/events/kranke-welt-halloween-kick-off-2026-10-30/"],["ra","https://de.ra.co/events/2557865"]],"vok":1,"head":["Lorenzo Raganzini","Neon Graveyard"],"chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-10-30","s":"23:00","e":"06:00","title":"Step Forward pres. Shoki","venue":"Grelle Forelle","coll":["Step Forward","Soundlabs"],"genres":["Techno","Trance"],"price":"ab 16 €","floors":[{"f":"Main Floor","a":["SHOKI287","pengg","Anna Ullrich"]},{"f":"Kitchen (Soundlabs)","a":["DizzyDray","Paul Mile","Vanessa Sa","Casanoah","Aleta"]}],"tickets":"https://www.tickettailor.com/events/stepforward/2445120","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/stepforward_301026_web.jpg","src":[["ra","https://ra.co/events/2548751"],["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/step-forward-pres-shoki?s=m1pggQmlV"],["rg","https://www.regioactive.de/party/step-forward-pres-shoki-wien-grelle-forelle-2026-10-30-229N7L7p55"],["gf","https://www.grelleforelle.com/project/3010-step-forward-pres-shoki/"],["stepf","https://www.tickettailor.com/events/stepforward/2445120"]],"vok":1,"note":{"de":"Step Forward holt SHOKI287 in die Grelle Forelle: Sie spielt laut und unbekümmert schnellen Techno mit Trance-Passagen und gelegentlich treibenden Remixen ihrer eigenen Rap-Releases – mit vielen flexiblen Wechseln, verspielt und mit direkter Underground-Haltung, ohne Pausen. Auf dem Main Floor ergänzen die Wiener DJs Anna Ullrich und pengg (Prod by Pengg). Den Kitchen Floor gestaltet das Kollektiv Soundlabs mit DizzyDray, Paul Mile, Vanessa Sa, Casanoah und Aleta. Einlass ab 23:00; der Vorverkauf über Tickettailor ist ausverkauft, Tickets gibt es an der Abendkasse.","en":"Step Forward brings SHOKI287 to Grelle Forelle: loud and carefree, she plays fast techno with trance passages and occasional driving remixes of her own rap releases – lots of flexible transitions, playful and with a straight underground attitude, no breaks. On the main floor she is joined by Viennese DJs Anna Ullrich and pengg (Prod by Pengg). The Kitchen floor is hosted by the Soundlabs collective with DizzyDray, Paul Mile, Vanessa Sa, Casanoah and Aleta. Doors 23:00; the Tickettailor presale is sold out, tickets at the door."},"head":["SHOKI287"],"chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-10-30","s":"23:00","e":"06:00","title":"Massimiliano Pagliara im Wohnzimmer","venue":"SASS Music Club","genres":["House","Disco","Electro","Techno"],"floors":[{"f":"","a":["Massimiliano Pagliara","Jorkes","Seba"]}],"src":[["sa","https://sassvienna.com/en/events/event/Massimiliano-Pagliara-3"]],"price":"10–15 €","note":{"de":"Massimiliano Pagliara feiert 20 Jahre hinter den Decks und macht auf seiner Jubiläumstour im SASS Station. Der aus dem zeitgenössischen Tanz kommende, lange in Berlin lebende DJ ist Resident u. a. in der Panorama Bar, im Robert Johnson, im Romantica und im Basement New York; er spielt House, Disco, Electro und Techno, sein Album „See You In Paradise“ wurde ausgezeichnet und mit Funnuvojere betreibt er ein eigenes Label. Das Warm-up übernimmt Jorkes (House, Disco, Electro), ebenfalls Romantica-Resident und mit Paris Böhm Betreiber des Labels Freeride Millenium, das sich für die LGBTQIA+-Community einsetzt; Seba spielt Support. Welcome Drink inklusive, Awareness-Team vor Ort.","en":"Massimiliano Pagliara celebrates 20 years behind the decks and stops at SASS on his anniversary tour. Coming from contemporary dance and long based in Berlin, he holds residencies at Panorama Bar, Robert Johnson, Romantica and Basement New York; he plays house, disco, electro and techno, his album \"See You In Paradise\" won an award and he runs a label with Funnuvojere. Warm-up by Jorkes (house, disco, electro), also a Romantica resident and co-founder with Paris Böhm of the label Freeride Millenium, which supports the LGBTQIA+ community; Seba plays support. Welcome drink included, awareness team on site."},"vok":1,"age":"18+","aw":1,"flyer":"https://sassvienna.com/assets/images/6/SASS_3010_1-a2d0cf1e.jpg","head":["Massimiliano Pagliara"],"chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-10-30","s":"23:00","title":"SCHLACHTHAUS w/ Toobris","venue":"FLUCC Wanne","src":[["fl","https://flucc.at/events/ZRzuEE-schlachthaus/"],["ra","https://ra.co/events/2562101"]],"vok":1,"age":"18+","e":"06:00","coll":["Schlachthaus"],"genres":["Techno"],"price":"12 € VVK / 20 € AK","floors":[{"f":"Wanne","a":["23:00|Artifex b2b Melchiorr","01:00|Toobris","03:00|Telicho","04:30|Silentsevir b2b PSMT"]}],"tickets":"https://www.eventim-light.com/at/a/6767fbfe967243041fa60b1c","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/301026_Schlachthaus_Wanne_-_Team_SCHLACHTH.max-2560x1440.jpg","aw":1,"nophoto":1,"head":["Toobris"],"note":{"de":"SCHLACHTHAUS übernimmt am 30. Oktober wieder die FLUCC Wanne für eine Nacht mit vorwärtsgewandtem Techno. Headliner Toobris steht für Forward-Techno mit souligen Grooves und viel Percussion; dazu kommt Telicho aus Wien. Die Residents Artifex und PSMT spielen jeweils b2b mit Gästen: Artifex mit Melchiorr aus München zum Auftakt (23–01 Uhr), PSMT mit dem Wiener Silentsevir zum Closing (04:30–06 Uhr). VVK 12 €, Abendkasse 20 €.","en":"SCHLACHTHAUS returns to FLUCC Wanne on 30 October for a night of forward-thinking techno. Headliner Toobris stands for forward techno with soulful grooves and plenty of percussion, joined by Vienna's Telicho. Residents Artifex and PSMT each play b2b with guests: Artifex with Melchiorr from Munich as the opener (23–01), PSMT with Vienna's Silentsevir for the closing (04:30–06). Presale €12, door €20."},"chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-10-30","s":"23:00","e":"06:00","title":"Schwerkraft w/ Alex TB, Prakas, Osmos","venue":"Das Werk","coll":["Schrödingers Groove","FIFI Rave"],"genres":["Schranz","Hardtechno","Groove","Techno","Hard Techno"],"price":"12–20 €","floors":[{"f":"Main","a":["Alex TB","Osmos","Prakas","Farbod","Patrick M4SS"]},{"f":"Luster · FIFI Rave","a":["Lenzi","Rui de Janeiro","Adam19","Meril Fox","Noel"]}],"tickets":"https://www.eventim-light.com/at/a/6ac14cd46095a69cdcc7962d/e/6ac8dc9e32733c9d9cec75aa","flyer":"https://images.ra.co/8e0787dd3ef241ba8c71b39ada5f9cf56867dbe8.jpg","zero":1,"src":[["ra","https://ra.co/events/2557774"],["ev","https://events.at/venue/das-werk"],["dw","https://www.daswerk.org/program"],["ev","https://events.at/event/schwerkraft-w-alex-tb-prakas-osmos"],["ra","https://de.ra.co/events/2557774"],["ot","https://www.oeticket.com/noapp/eventseries/schwerkraft-w-alex-tb-prakas-osmos-4261430/"]],"vok":1,"note":{"de":"Schrödingers Groove lädt zu einer Schranz-Nacht ins Werk. Auf dem Main Floor spielen Alex TB, Hardtechno-Veteran und seit 1996 im Underground aktiv, Prakas als Vertreter der neuen Schranz-Generation mit Releases wie der „Kick Some Ass“-EP (Audiocode Records) und „HTHK“ (44) sowie der belgische DJ und Produzent Osmos, bekannt für markante Percussion und verzerrte Drums (Releases auf Audiocode, Agony, KKULA, Merciless); dazu Farbod und Patrick M4SS. Den Luster Floor gestaltet FIFI Rave mit einer Groove-Auswahl aus rollenden Rhythmen und Basslines (Lenzi, Rui de Janeiro, Adam19, Meril Fox, Noel). Null Toleranz gegenüber Sexismus, Rassismus und Homophobie. RA nennt 18+, Hausregel der Location ist 21+.","en":"Schrödingers Groove hosts a Schranz night at Das Werk. The main floor features Alex TB, a hard techno veteran active in the underground since 1996, Prakas, representing the new Schranz generation with releases such as the \"Kick Some Ass\" EP (Audiocode Records) and \"HTHK\" (44), and Belgian DJ/producer Osmos, known for distinctive percussion and distorted drums (releases on Audiocode, Agony, KKULA, Merciless); plus Farbod and Patrick M4SS. The Luster floor is hosted by FIFI Rave with a groove selection of rolling rhythms and basslines (Lenzi, Rui de Janeiro, Adam19, Meril Fox, Noel). Zero tolerance for sexism, racism and homophobia. RA states 18+, the venue's house rule is 21+."},"head":["Alex TB","Prakas","Osmos"],"chk":"2026-10-30","srcChk":"2026-10-29"},
{"age":"18+","d":"2026-10-30","s":"23:00","e":"06:00","title":"Mijk van Dijk (live) // Joro & Joabo // Atomik","venue":"Weberknecht","coll":["Bassproduction"],"genres":["Techno"],"price":"15 € / Early Bird 10 €","floors":[{"f":"","a":["Mijk van Dijk","Joro & Joabo","Norg3n","Peter Pan","JP eXbert"]}],"tickets":"https://weberknecht.at/event/live-mijk-van-dijk-jorojoabo-atomik-norg3n-peter-pan-jpexbert/","src":[["ra","https://ra.co/events/2559561"],["we","https://weberknecht.at/event/live-mijk-van-dijk-jorojoabo-atomik-norg3n-peter-pan-jpexbert/"],["vo","https://www.volume.at/events/mijk-van-dijk-2026-10-30/"]],"flyer":"https://weberknecht.at/wp-content/uploads/2026/10/30.10.2026-1.jpg","vok":1,"head":["Mijk van Dijk"],"note":{"de":"Techno-Nacht im Weberknecht mit Mijk van Dijk als Live-Act: Der Berliner Produzent war in den 90ern Resident in Tresor und E-Werk, prägte die Loveparade mit und ist bekannt für Marmion („Schöneberg“, mit Marcos López), die MFS-Compilation „Tranceformed From Beyond“ mit Cosmic Baby und sein Solodebüt „Afreuropamericasiaustralica“. Er veröffentlichte bei Sony Music und Frogman Records in Japan, arbeitete mit Takkyu Ishino und schrieb Soundtracks zu „Ghost in the Shell“ und „Ridge Racer V“; aktuell ist er mit Floats bei „Rave the Planet“ und dem Album „From XS to Eternity“ mit Tom Wax aktiv. Dazu spielen Joro & Joabo, Norg3n, Peter Pan und JP eXbert. Early Bird 10 € (limitiert), regulär 15 €.","en":"Techno night at Weberknecht with Mijk van Dijk performing live: the Berlin producer was a resident at Tresor and E-Werk in the 90s, helped shape the Love Parade and is known for Marmion (\"Schöneberg\", with Marcos López), the MFS compilation \"Tranceformed From Beyond\" with Cosmic Baby and his solo debut \"Afreuropamericasiaustralica\". He released on Sony Music and Frogman Records in Japan, worked with Takkyu Ishino and composed soundtracks for \"Ghost in the Shell\" and \"Ridge Racer V\"; currently he runs floats at \"Rave the Planet\" and released the album \"From XS to Eternity\" with Tom Wax. Also playing: Joro & Joabo, Norg3n, Peter Pan and JP eXbert. Early bird €10 (limited), regular €15."},"chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-10-30","s":"23:00","title":"October-Transmission","venue":"O der Klub","genres":["Melodic House & Techno","Hits & Classics","Hip Hop"],"floors":[{"f":"CORE – Hits & Classics","a":["TBA"]},{"f":"ORBIT – Melodic House & Techno","a":["TBA"]},{"f":"Konsulat – Hip Hop & Urban","a":["TBA"]}],"price":"12 €","tickets":"https://shop.o-klub.at/shop/registrations?event_id=e9c49129-2338-49db-bc6d-ddec1b491851","flyer":"https://o-klub.at/wp-content/uploads/2026/09/3010_feed-web.jpg","note":{"de":"Oktober-Ausgabe der Transmission-Reihe im O – der Klub: drei Floors in einer Nacht. Im CORE laufen Hits & Classics, im ORBIT Melodic House & Techno, im Konsulat Hip Hop & Urban. Namen der DJs nennt der Club nicht. Dresscode casual chic; Tischreservierungen inkl. Eintritt, eigenem VIP-Eingang und Garderobe möglich.","en":"October edition of the Transmission series at O – der Klub: three floors in one night. CORE plays hits & classics, ORBIT melodic house & techno, Konsulat hip hop & urban. The club does not name the DJs. Dress code casual chic; table reservations incl. entry, separate VIP entrance and cloakroom available."},"vok":1,"src":[["ok","https://o-klub.at/events/october-transmission/"]],"na":["lineup","e"],"chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-10-30","s":"23:50","e":"06:00","title":"Forbidden Frequency Pre-Halloween Rave","venue":"Club Lucia","genres":["Deep Tech","Hard Trance","Hard Techno","Trance"],"floors":[{"f":"","a":["01:00|WO.IZZY"]}],"flyer":"https://www.clublucia.at/wp-content/uploads/2026/08/Lucia-Flyer-Static-e1791204192471.png","note":{"de":"Dunkler Pre-Halloween-Rave im Club Lucia mit einer Reise durch die Härtegrade: Ab 23:50 Deep Tech, danach WO.IZZY mit 140 BPM, anschließend Hard Trance und ab 04:00 Hard Techno bis 06:00. Motto: dunkel kleiden, noch härter tanzen. Die Einnahmen gehen an Frauenhäuser. Weitere Acts sowie Eintrittspreis nennt die Location nicht.","en":"Dark pre-Halloween rave at Club Lucia moving up the intensity scale: deep tech from 23:50, then WO.IZZY at 140 BPM, followed by hard trance and hard techno from 04:00 until 06:00. Motto: dress dark, dance harder. Proceeds go to women's shelters. The venue names no further acts and no entry price."},"vok":1,"src":[["cl","https://www.clublucia.at/event/forbidden-frequency-pre-halloween-rave/"],["vo","https://www.volume.at/events/forbidden-frequency-pre-halloween-rave-2026-10-30/"]],"na":["price"],"chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-10-31","s":"20:00","e":"06:00","title":"Halloween auf der Lauer","venue":"TBA","coll":["Auf der Lauer"],"genres":["House","Tech House","Electro","Breaks","Techno"],"floors":[{"f":"","a":["Anni Herzer","Peter Portman","j.around","Lenz Rausch","Scheibosan","C12","Floer Klamauk","Rizmo","Stalinsky"]}],"tickets":"https://de.ra.co/events/2555958","flyer":"https://images.ra.co/6ee4153003d32eec539fb3845eb84878382b4a0e.jpg","note":{"de":"Halloween-Sonderausgabe von Auf der Lauer an einer geheimen Location, die erst kurz vorher bekanntgegeben wird: zwei Floors plus Open-Air-Bereich und aufwendige Deko. Über zehn DJs spielen rund zwölf Stunden elektronische Musik von House und Techno bis Electro und Breaks – darunter Anni Herzer, Peter Portman, j.around, Lenz Rausch, Scheibosan, C12, Floer Klamauk, Rizmo und Stalinsky. Passende Verkleidung ist erwünscht. Preis, Mindestalter und Location sind noch nicht veröffentlicht.","en":"Halloween special of Auf der Lauer at a secret location announced shortly beforehand: two floors plus an open-air area and elaborate decoration. More than ten DJs play around twelve hours of electronic music from house and techno to electro and breaks – including Anni Herzer, Peter Portman, j.around, Lenz Rausch, Scheibosan, C12, Floer Klamauk, Rizmo and Stalinsky. Costumes encouraged. Price, minimum age and location not yet published."},"src":[["ra","https://ra.co/events/2555958"],["ra","https://de.ra.co/events/2555958"]],"na":["price"],"chk":"2026-10-31","srcChk":"2026-10-31","price":"ausverkauft","man":1},
{"d":"2026-10-31","s":"20:00","title":"HARDLINE: Purge Night – A Halloween Special","venue":"Event Arena Vösendorf","coll":["Hardline"],"genres":["Rawstyle","Hardcore","Uptempo","Early Hardcore","Hardstyle","Gabber","Hakken"],"floors":[{"f":"Ground Zero","a":["The Dark Horror","The Straikerz","DJ Shady MF","Outlined","Pinotello","Poley Tight","Schlot","Sonic Warfare"]},{"f":"The Tunnel","a":["Another Dimension","Emkatress","Fractured Souls","Eternal Injustice vs Raw Kickzz","Recovered","Uptempo Babys"]},{"f":"Machine Room","a":["Agonize","Burger Kingz","Mark Enigma","Poley Tight","Rick C","Sonic Warfare"]}],"price":"38,90 € (Phase 3) / VIP 54,90 €","tickets":"https://events.tickethead.io/de/tickethead/event/5282","flyer":"https://www.volume.at/cdn/event/PhotoshopExtension_Image-6-scaled__original.jpeg","note":{"de":"Hardline verwandelt die Event Arena Vösendorf zu Halloween in eine Welt aus Chaos und Dunkelheit – „für eine Nacht gibt es keine Regeln mehr“. Drei Areas mit eigenem Sound: Ground Zero ist die Mainstage u. a. mit The Dark Horror, The Straikerz, DJ Shady MF, Outlined, Pinotello, Schlot und Sonic Warfare; The Tunnel steht für Rawstyle und Uptempo u. a. mit Another Dimension, Emkatress, Fractured Souls und Uptempo Babys; im Machine Room laufen Gabber, Early Hardcore und Hakken u. a. mit Agonize, Burger Kingz, Mark Enigma und Rick C. Einlass ab 20:00, ein Ende ist nicht angegeben. Tickets Phase 3 38,90 €, VIP 54,90 €.","en":"Hardline turns Event Arena Vösendorf into a world of chaos and darkness for Halloween – \"for one night there are no more rules\". Three areas, each with its own sound: Ground Zero is the main stage with The Dark Horror, The Straikerz, DJ Shady MF, Outlined, Pinotello, Schlot and Sonic Warfare among others; The Tunnel is dedicated to rawstyle and uptempo with Another Dimension, Emkatress, Fractured Souls and Uptempo Babys among others; the Machine Room plays gabber, early hardcore and hakken with Agonize, Burger Kingz, Mark Enigma and Rick C among others. Doors 20:00, no end time given. Tickets phase 3 €38.90, VIP €54.90."},"src":[["vo","https://www.volume.at/events/hardline-purge-night-2026-10-31/"],["vo","https://www.volume.at/halloween-partys/"],["th","https://events.tickethead.io/de/tickethead/event/5282"]],"na":["e","age"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"20:00","e":"03:00","title":"Bloody Masquerade – Halloween × Hofburg Vienna","venue":"Hofburg Vienna","coll":["KSOT","YE"],"genres":[],"floors":[{"f":"","a":["TBA"]}],"price":"Phase 3 50 € / Last Release 60 € / Final Call 80 €; Early Entry bis 20:15 20 €, bis 20:30 25 €, bis 21:00 30 €, bis 21:30 35 €; Gruppenticket (3 bzw. 4 Pers.) 40 €; VIP Stage Pass (Ballroom) 149 €","tickets":"https://ksot.ticket.io/MKR1dxiZ/","flyer":"https://cdn.ticket.io/companies/ilYGYoDT/events/MKR1dxiZ/img/holder-1080.jpg?64d2ccd3","note":{"de":"Halloween-Maskenball in der Hofburg am Heldenplatz als erste gemeinsame Veranstaltung von YE und KSOT („Kein Sonntag ohne Techno“), angekündigt als Auftakt einer Partnerschaft der beiden Marken. Versprochen werden elektronische Musik mit nationalen und internationalen DJs, eine große Produktion und ein eigens entwickeltes Lichtkonzept; Namen sind nicht veröffentlicht. Es gibt einen Ballroom mit VIP-Stage auf dem Mainfloor (VIP-Pass inkl. Fast-Lane-Einlass). Die Kapazität ist begrenzt, frühes Kommen wird mit günstigeren Early-Entry-Tickets belohnt. Mindestalter und Dresscode sind nicht angegeben.","en":"Halloween masquerade at the Hofburg on Heldenplatz, the first joint event by YE and KSOT (\"Kein Sonntag ohne Techno\"), announced as the start of a partnership between the two brands. Promised are electronic music by national and international DJs, a large-scale production and a light concept made for the night; no names have been published. There is a ballroom with a VIP stage on the main floor (VIP pass incl. fast-track entry). Capacity is limited, and cheaper early-entry tickets reward arriving early. Minimum age and dress code are not stated."},"src":[["ksot","https://ksot.ticket.io/MKR1dxiZ/"],["ksot","https://ksot.ticket.io/?lang=en"]],"na":["lineup","age"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"20:00","e":"06:00","title":"ALLES ALLEN No Halloween Birthday Bash","venue":"Rhiz","coll":["Alles Allen"],"genres":["House","Baile Funk","Techno","Electro Pop","Trap","90s Trance","Psy","Bounce","Indie House","Peak Time","Deep House","UK Dance"],"floors":[{"f":"","a":["Cancel b2b KarmaSutra","Pesca","Lucifer","Frau F","DJ Handgepäck","DJ Streuselkuchen"]}],"flyer":"https://images.ra.co/1ffd446c382f2203be92c5807392ae7ca755aa34.png","note":{"de":"Geburtstagsparty des Kollektivs Alles Allen im Rhiz – bewusst „No Halloween“. Sechs DJs spielen querbeet von House, Deep House und Techno über Baile Funk, Trap und Bounce bis zu 90s Trance und Psy. Das Motto lautet Gemeinschaft, Freundschaft und Liebe; alle sind willkommen, Homophobie, Rassismus, Sexismus und jede andere Form von Diskriminierung werden nicht toleriert. Flyer-Illustration von @rrriot.art. Startzeit uneinheitlich: RA-Kopfzeile 23:00, RA-Text und ohschonhell 20:00.","en":"Birthday party of the Alles Allen crew at Rhiz – explicitly a 'No Halloween' night. Six DJs cover everything from house, deep house and techno to baile funk, trap, bounce, 90s trance and psy. The motto is community, friendship and love; everybody is welcome, and homophobia, racism, sexism and any other discrimination are not tolerated. Flyer artwork by @rrriot.art. Start time inconsistent: RA header says 23:00, RA text and ohschonhell say 20:00."},"zero":1,"src":[["ra","https://ra.co/events/2568810"],["osh","https://ohschonhell.at/date/rhiz-vienna-31-10-2026-alles-allen-no-halloween-birthday-bash"]],"na":["price","age","tickets"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"age":"18+","d":"2026-10-31","s":"21:00","e":"06:00","title":"Tasteless 3 Yrs Anniversary – Halloween Special","venue":"Otto Wagner Areal","coll":["Tasteless"],"genres":["House","Minimal"],"price":"15–45 €","floors":[{"f":"","a":["dj sweet6teen","Katia Curie","COZi","Nizar Sarakbi","PATRIK HOUR","Luca"]}],"tickets":"https://events.tickethead.io/de/tickethead/event/5345","flyer":"https://images.ra.co/73f6a9175b724e97b1541a06c3fb0019f0ff6a57.jpg","note":{"de":"Tasteless feiert sein dreijähriges Bestehen mit einer Halloween-Edition im Otto Wagner Areal (Eingang Baumgartner Höhe 1 – Küche). Das Kollektiv war dieses Jahr erstmals auch in Städten außerhalb Österreichs unterwegs. Es spielen dj sweet6teen, Katia Curie und Nizar Sarakbi (die beiden treten u. a. gemeinsam auf, etwa bei Refuge Worldwide und auf dem Lighthouse Festival), COZi, PATRIK HOUR und Luca – House und Minimal von 21 bis 06 Uhr. Einlass ab 18 Jahren. Die Early-Bird-Stufe war laut RA fast ausverkauft; Preis 15–45 €, circl nennt ab 14,90 €.","en":"Tasteless celebrates its third anniversary with a Halloween edition at Otto Wagner Areal (entrance Baumgartner Höhe 1 – Küche). This year the collective took its party to cities outside Austria for the first time. Playing are dj sweet6teen, Katia Curie and Nizar Sarakbi (who also perform together, e.g. at Refuge Worldwide and Lighthouse Festival), COZi, PATRIK HOUR and Luca – house and minimal from 9pm to 6am. Admission 18+. According to RA the early-bird tier was almost sold out; price €15–45, circl lists from €14.90."},"src":[["ra","https://ra.co/events/2550640"],["ci2","https://circl.at/halloween-wien"],["ra","https://de.ra.co/events/2550640"]],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"21:00","e":"05:00","title":"KSOT – Halloween Warehouse Rave","venue":"Ottakringer Brauerei","coll":["KSOT"],"genres":["Techno","House"],"price":"50 € (Last Release) / Final Call 55 €, Late Entry ab 01:30 25 €, ab 02:00 20 €","age":"18+","tickets":"https://ksot.ticket.io/6tmEGJSh/","note":{"de":"KSOT („Kein Sonntag ohne Techno“) macht zu Halloween eine Ausnahme vom Sonntag und lädt zum Warehouse Rave in die Ottakringer Brauerei, beworben als Wiens größte Halloween-Nacht, mit House und Techno auf mehreren Floors. Ein Line-up ist nicht veröffentlicht. Kostüme sind erwünscht; leicht brennbare Deko (Stroh, Papier, Karton) ist verboten, eigene Speisen und Getränke ebenso. Kein Wiedereinlass, Kartenzahlung möglich, früh kommen empfohlen. Early Entry (35 €) ist vorbei, aktuell Last Release 50 € bzw. Final Call 55 €, Late Entry ab 01:30 25 € und ab 02:00 20 €.","en":"KSOT (\"Kein Sonntag ohne Techno\") makes a Halloween exception from its Sunday slot with a warehouse rave at Ottakringer Brauerei, billed as Vienna's biggest Halloween night, with house and techno on several floors. No line-up has been published. Costumes encouraged; easily flammable decorations (straw, paper, cardboard) and outside food and drinks are not allowed. No re-entry, card payment possible, arriving early recommended. Early entry (€35) is over; currently last release €50 or final call €55, late entry from 01:30 €25 and from 02:00 €20."},"src":[["wa","https://warda.at/events/ksot-halloween-warehouse-rave/"],["vo","https://www.volume.at/events/halloween-warehouse-rave-2026-10-31/"],["ksot","https://ksot.ticket.io/6tmEGJSh/"],["ob","https://www.ottakringerbrauerei.at/de/event/ksot-halloween-warehouse-rave/"],["tt","https://www.1000thingsmagazine.com/de/a/29288/halloween-events-wien/"]],"floors":[{"f":"","a":["TBA"]}],"vok":1,"flyer":"https://cdn.ticket.io/companies/ilYGYoDT/events/6tmEGJSh/img/holder-1080.jpg?44145364","na":["lineup"],"chk":"2026-10-31","srcChk":"2026-10-31","io":["Indoor"],"man":1},
{"age":"18+","d":"2026-10-31","s":"22:00","e":"05:00","title":"Housetiere w/ Chata","venue":"Tagada","coll":["Housetiere","Entrance"],"genres":["House","Dub Techno","Techno"],"price":"€10","floors":[{"f":"","a":["Chata","Foxloe","Julani","Hanno"]}],"flyer":"https://images.ra.co/e8e3e48dbc0732986b569f4abaad4f0754648e8d.jpg","src":[["ra","https://ra.co/events/2554895"],["ft","https://frey-tag.at/locations/tagada"],["ci2","https://circl.at/halloween-wien"],["ft","https://frey-tag.at/kalender/housetiere?s=QUsRb8EW3"],["ra","https://de.ra.co/events/2554895"]],"tickets":"https://app.circl.at/festival/8eacca65-ee89-4736-9d21-16aae9ddb6d8","head":["Chata"],"note":{"de":"Housetiere lädt zum Halloween-Dance ins Tagada mit zwei Gästen und Warm-up. Chata stammt aus Georgien, lebt in Prag und gilt als aufstrebender Künstler mit dubbigen, groovigen Basslines; seine Sets bestehen aus sorgfältig ausgewählten Platten passend zu seinen eigenen Produktionen. Support kommt von Foxloe vom Wiener Kollektiv Entrance, gebürtig aus Frankreich und fester Bestandteil der Wiener House-Szene, mit tiefem, atmosphärischem Sound. Das Warm-up übernehmen Julani und Hanno. House und Dub Techno, Eintritt 10 €, 18+.","en":"Housetiere hosts a Halloween dance at Tagada with two guests and a warm-up. Chata is originally from Georgia, now based in Prague, and is considered a rising artist with dubby, groovy basslines; his sets consist of carefully selected records that match his own productions. Support comes from Foxloe of Vienna's Entrance collective, originally from France and a fixture of the Vienna house scene, with a deep, atmospheric sound. Warm-up by Julani and Hanno. House and dub techno, entry €10, 18+."},"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"22:00","title":"Halloween Rave","venue":"FLUCC Wanne","genres":["Tekno","Acid","Hardtek","Raggatek"],"src":[["fl","https://flucc.at/events/25TgZH-halloween-rave/"],["vo","https://www.volume.at/events/?genre=techno"],["vo","https://www.volume.at/events/halloween-rave-2026-10-31-2/"]],"price":"15 € (nur AK)","floors":[{"f":"Wanne","a":["Pitch Madattak","Gehlektek","Apocalypz","Cheddar Boyz","Janex","Miss Undertaker","Sportacore","Veneno"]}],"vok":1,"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/311026_HalloweenRave_Wanne_Flyer_-_Martin.max-2560x1440.jpg","note":{"de":"Halloween-Rave in der FLUCC Wanne im Zeichen von Tekno, Acid, Hardtek und Raggatek. Mit drei Live-Acts – Pitch Madattak, Gehlektek und Apocalypz – sowie den DJs Cheddar Boyz, Janex, Miss Undertaker, Sportacore und Veneno. Eintritt 15 €, nur an der Abendkasse. Die Location nennt keinen weiteren Beschreibungstext, keine Set-Zeiten und kein Ende.","en":"Halloween rave at FLUCC Wanne dedicated to tekno, acid, hardtek and raggatek. With three live acts – Pitch Madattak, Gehlektek and Apocalypz – plus DJs Cheddar Boyz, Janex, Miss Undertaker, Sportacore and Veneno. Entry €15, door only. The venue gives no further description, set times or end time."},"na":["e"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","title":"Halloween Transmission","venue":"O der Klub","genres":["Melodic House","Techno","Club Charts","Hip Hop"],"price":"VVK 17 €","src":[["vo","https://www.volume.at/events/?genre=techno"],["ok","https://o-klub.at/events/halloween-3/"],["ci2","https://circl.at/halloween-wien"],["wa","https://warda.at/events/halloween-transmission-2/"],["vo","https://www.volume.at/events/halloween-transmission-2026-10-31/"]],"vok":1,"s":"22:00","age":"18+","coll":["SIGNAL","Super Disco"],"floors":[{"f":"Core · Super Disco","a":["TBA"]},{"f":"Orbit · SIGNAL","a":["TBA"]},{"f":"Konsulat","a":["TBA"]}],"e":"06:00","tickets":"https://shop.o-klub.at/shop/registrations?event_id=c351cd18-0867-4f4d-9971-5b8bdba00e07","flyer":"https://o-klub.at/wp-content/uploads/2026/08/Halloween_feed-web.jpg","note":{"de":"Zu Halloween verwandelt sich O – der Klub in ein düsteres Paralleluniversum zwischen Fiebertraum und Tanzekstase: drei Floors, drei Musikwelten. Im CORE (Mainfloor) spielt Super Disco aktuelle Club-Charts und Klassiker in einer Grusel-Sonderedition, im ORBIT (2. Stock) übernimmt SIGNAL mit Melodic House und Techno, im KONSULAT (3. Stock) laufen die ganze Nacht Hip Hop und Urban Beats. Verkleidung erwünscht, aber kein Muss. DJ-Namen werden nicht genannt; Tischreservierungen mit VIP-Eingang und Bottle Service möglich.","en":"For Halloween, O – der Klub turns into a dark parallel universe between fever dream and dance ecstasy: three floors, three musical worlds. In CORE (main floor) Super Disco plays current club charts and classics in a spooky special edition, ORBIT (2nd floor) is hosted by SIGNAL with melodic house and techno, and KONSULAT (3rd floor) serves hip hop and urban beats all night. Costumes encouraged but optional. No DJ names given; table reservations with VIP entrance and bottle service available."},"na":["lineup"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"22:00","title":"Halloqueer","venue":"Celeste","coll":["Ravenbogen"],"genres":["House","Techno"],"lgbtq":1,"price":"Spende, Richtwert 10 €","note":{"de":"Das queere Kollektiv Ravenbogen kommt aus Graz nach Wien und bringt zu Halloween queeren House und Techno ins Celeste. Motto ist eine magisch-düstere Hexen-Energie; Kostüme sind willkommen, vor Ort gibt es eine kostenlose Glitzerstation. Es spielen Ben Leander, 2bihonest, Sarah Dæwie, Jade Anima und saschka. Eintritt auf Spendenbasis mit Richtwert 10 €, für Menschen mit wenig Einkommen gratis.","en":"The queer collective Ravenbogen comes from Graz to Vienna and brings queer house and techno to Celeste for Halloween. The theme is magical, dark witch energy; costumes welcome, with a free glitter station on site. Playing are Ben Leander, 2bihonest, Sarah Dæwie, Jade Anima and saschka. Entry by donation, suggested €10, free for people on low incomes."},"src":[["gn","https://goodnight.at/magazin/freizeit/events-wien-am-wochenende"],["ci2","https://circl.at/halloween-wien"],["ce","https://celeste.co.at/"],["ra","https://ra.co/events/2556930"]],"e":"06:00","floors":[{"f":"Club","a":["Ben Leander","2bihonest","Sarah Dæwie","Jade Anima","saschka"]}],"vok":1,"na":["flyer"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"22:00","title":"KØRE Halloween Rave 2026","venue":"Lugner City","coll":["KØRE"],"genres":["Drum & Bass"],"floors":[{"f":"","a":["Burr Oak","OKO","Zombie Cats","Drum Dad & Bass Boy","Kaama","Didz b2b Mina","Puppy Devil"]}],"price":"ab €22","tickets":"https://tickets.nfctron.eu/event/kore-event-e-u/k-re-halloween-rave-2026","note":{"de":"KØRE übernimmt mit seinem ersten Event die Lugner City und verwandelt das Einkaufszentrum in eine Halloween-Drum-&-Bass-Nacht mit schweren Bässen, hoher Energie und internationalem Line-up in einer eigens gestalteten Atmosphäre – Ziel ist, Drum & Bass an Orte zu bringen, wo man ihn nicht erwartet. Es spielen Burr Oak, OKO, Zombie Cats, Drum Dad & Bass Boy, Kaama, Didz b2b Mina und Puppy Devil, dazu ein noch nicht genannter Special Guest. Kostüme sind erwünscht, Zahlung mit Karte oder bar. VVK ab 22 € (circl: 22,77 €, 1000things: 28 €); das Ende um 04:00 nennt nur circl.","en":"KØRE takes over Lugner City for its first event, turning the shopping centre into a Halloween drum & bass night with heavy bass, high energy and an international line-up in a custom-built atmosphere – the aim is to bring drum & bass to places where you wouldn't expect it. Playing are Burr Oak, OKO, Zombie Cats, Drum Dad & Bass Boy, Kaama, Didz b2b Mina and Puppy Devil, plus a yet-unnamed special guest. Costumes encouraged, payment by card or cash. Presale from €22 (circl: €22.77, 1000things: €28); only circl gives the 04:00 end time."},"src":[["vo","https://www.volume.at/events/koere-halloween-rave-2026-2026-10-31/"],["ci2","https://circl.at/halloween-wien"],["tt","https://www.1000thingsmagazine.com/de/a/29288/halloween-events-wien/"],["kore","https://tickets.nfctron.eu/event/kore-event-e-u/k-re-halloween-rave-2026"]],"age":"18+","flyer":"https://www.volume.at/cdn/event/PhotoshopExtension_Image-3-1__original.jpeg","e":"04:00","chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"22:00","e":"05:00","title":"ClassiX – Halloween Madness","venue":"M1 Club","coll":["ClassiX"],"genres":["Techno","House","Tech House","Trance"],"floors":[{"f":"","a":["DJ Observer","Dennes Deen","Tom Silver","Sdricci","Adelic","Duracell"]}],"head":["DJ Observer"],"price":"VVK 12 € / AK 15 € (VVK inkl. Styling Corner 20 €; Tischpaket 4 Pers. 300 €, VIP-Lounge 6 Pers. 500 €)","tickets":"https://shop.eventjet.at/en/cca9a014-1091-4d5f-91c7-558ddd0032ad/event/716a611b-4483-45e9-8817-4e2539345e4f","flyer":"https://fsc.szene1.at/fijn/971339/fijn_971339.jpg","note":{"de":"ClassiX kehrt zu Halloween im M1 Club (ehemals Atrium) am Schwarzenbergplatz zurück – so, wie viele die Reihe von früher kennen: House-, Techno- und Trance-Classics der 90er- und 2000er-Jahre auf drei Floors mit sechs DJs. Es spielen DJ Observer (bekannt von der Loveparade), Dennes Deen und Tom Silver (beide Hypnotic), Sdricci (Biosphere) sowie Adelic und Duracell (beide Gasometer). Dazu Halloween-Deko, eine Styling Corner von Tichy (eigenes Ticket bzw. Kombiticket 20 €) sowie Tisch- und VIP-Pakete. Veranstalter ist Hypnotic Organizer; VVK 12 €, Abendkasse 15 €.","en":"ClassiX returns for Halloween at M1 Club (formerly Atrium) on Schwarzenbergplatz – the way many remember the series: house, techno and trance classics of the 90s and 2000s on three floors with six DJs. Playing are DJ Observer (known from the Love Parade), Dennes Deen and Tom Silver (both Hypnotic), Sdricci (Biosphere) and Adelic and Duracell (both Gasometer). Plus Halloween decoration, a styling corner by Tichy (separate ticket or €20 combo) and table and VIP packages. Organised by Hypnotic Organizer; presale €12, door €15."},"src":[["gn","https://goodnight.at/magazin/freizeit/events-wien-am-wochenende"],["s1","https://www.szene1.at/event/classix-halloween-madness-m1-ehem-atrium-wien-31-10-2026-eid486609"],["ej","https://shop.eventjet.at/en/cca9a014-1091-4d5f-91c7-558ddd0032ad/event/716a611b-4483-45e9-8817-4e2539345e4f"],["vo","https://www.volume.at/events/classix-halloween-madness-2026-10-31/"],["tt","https://www.1000thingsmagazine.com/de/a/29288/halloween-events-wien/"]],"na":["age"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"age":"18+","d":"2026-10-31","s":"23:00","e":"06:00","title":"Pink Mayhem – Hardtechno Halloween","venue":"FLUCC Deck","coll":["Pink Mayhem"],"genres":["Hardtechno","Trance","Hard Techno","Techno"],"price":"5 € vor 0 Uhr / 10 € danach (nur AK)","floors":[{"f":"Deck","a":["23:00|Pinklotion b2b Kristus","01:00|Bludhound b2b Gopnikbarbie","03:00|Meltdown","04:30|Hello Kiffy"]}],"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/311026_pink_mayhem_Halloween_Deck_-_bea_sc.max-2560x1440.jpg","aw":1,"zero":1,"note":{"de":"Pink Mayhem lädt zum dritten Hardtechno-Halloween-Special aufs FLUCC Deck – laut, hart und sehr verschwitzt. Zum Auftakt spielen Pinklotion b2b Kristus (23–01 Uhr), danach Bludhound b2b Gopnikbarbie (01–03 Uhr), Meltdown (03–04:30 Uhr) und zum Closing Hello Kiffy (04:30–06 Uhr). Kostüme sind erwünscht. Tickets nur an der Abendkasse, first come, first served: 5 € vor Mitternacht, danach 10 €. Das Awareness-Team erkennt man an Lichterketten.","en":"Pink Mayhem hosts its third hardtechno Halloween special on FLUCC Deck – loud, hard and very sweaty. Opening with Pinklotion b2b Kristus (23–01), followed by Bludhound b2b Gopnikbarbie (01–03), Meltdown (03–04:30) and Hello Kiffy closing (04:30–06). Costumes encouraged. Tickets at the door only, first come first served: €5 before midnight, €10 after. The awareness team wears fairy lights."},"src":[["fl","https://flucc.at/events/9EYeqx-pink-mayhem/"],["ra","https://ra.co/events/2564981"]],"vok":1,"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"23:00","e":"06:00","title":"Halloween | The Tunegirl Live","venue":"Grelle Forelle","genres":["Techno"],"price":"ab 15 €","floors":[{"f":"Mainfloor","a":["The Tunegirl","Alex Maurer","Tezibel"]},{"f":"Kitchen","a":["DJ Bottleghost","DJ Veloziped","Altroy Jerome"]}],"src":[["rg","https://www.regioactive.de/party/halloween-the-tunegirl-live-wien-grelle-forelle-2026-10-31-kp8SmQRb0s"],["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/halloween-less-than-greater-than-less-than?s=MeyxkrG_z"],["vo","https://www.volume.at/events/?genre=techno"],["gf","https://www.grelleforelle.com/project/3110-halloween-the-tunegirl-live/"],["vo","https://www.volume.at/events/halloween-the-tunegirl-live-2026-10-31/"]],"vok":1,"tickets":"https://www.eventim-light.com/at/a/69284c91e54d302ec82b2635/e/6ab2528e8c206ca972684214","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/halloween26.jpg","head":["The Tunegirl"],"note":{"de":"Halloween-Nacht in der Grelle Forelle mit The Tunegirl als Live-Act auf dem Mainfloor, unterstützt von Alex Maurer und Tezibel. Den Kitchen-Floor bespielen DJ Bottleghost, DJ Veloziped und Altroy Jerome. Einlass und Abendkasse ab 23:00, Vorverkauf über Eventim. Die Location selbst veröffentlicht keinen weiteren Beschreibungstext.","en":"Halloween night at Grelle Forelle with The Tunegirl performing live on the main floor, supported by Alex Maurer and Tezibel. The Kitchen floor is played by DJ Bottleghost, DJ Veloziped and Altroy Jerome. Doors and box office from 23:00, presale via Eventim. The venue has not published any further description."},"chk":"2026-10-31","srcChk":"2026-10-31"},
{"age":"18+","d":"2026-10-31","s":"23:00","e":"11:00","title":"Halloween at PRST w/ Camion Bazar & Franziska Berns","venue":"PRST","genres":["House","Tech House","Techno"],"price":"25 € (VVK Phase 3) / Early Bird 15 € (ausverkauft)","floors":[{"f":"","a":["Camion Bazar","Franziska Berns","Andy Catana","Apua","Luca","Rizmo","Reinhard Zach","Stipo"]}],"flyer":"https://images.ra.co/33c1aec1487427ca7ff4f807689445f939663b6f.jpg","note":{"de":"Nach dem 12-Stunden-Halloween-Marathon im Vorjahr lädt das PRST wieder zu einer verlängerten Halloween-Nacht von 23 bis 11 Uhr. Gäste sind Camion Bazar, das Pariser Duo aus Benedetta und Romain Play mit hybriden Vinyl-Sets aus House, Disco und Electro (Label Enemy Dance, Partyreihe VOLTAGE), sowie Franziska Berns, Resident im Frankfurter Robert Johnson mit Techno mit funky Kante. Dazu spielen Andy Catana, Apua (Kopf bei Fuss), Luca, Rizmo, Reinhard Zach und Stipo. Early Bird sowie VVK-Phasen 1 und 2 (15/20/23 €) sind ausverkauft, aktuell gilt Phase 3 mit 25 €; RA nennt 20–30 €. Der Online-Vorverkauf ist inzwischen geschlossen (laut prst.ticket.io), Tickets nur noch an der Abendkassa.","en":"After last year's 12-hour Halloween marathon, PRST again hosts an extended Halloween night from 11pm to 11am. Guests are Camion Bazar, the Paris duo of Benedetta and Romain Play with hybrid vinyl sets of house, disco and electro (Enemy Dance label, VOLTAGE parties), and Franziska Berns, resident at Frankfurt's Robert Johnson, playing techno with a funky edge. Also on the bill: Andy Catana, Apua (Kopf bei Fuss), Luca, Rizmo, Reinhard Zach and Stipo. Early bird and presale phases 1 and 2 (€15/20/23) are sold out; phase 3 at €25 is current; RA lists €20–30. Online presale has now closed (per prst.ticket.io); tickets at the door only."},"src":[["ra","https://ra.co/events/2549018"],["ft","https://frey-tag.at/locations/club-praterstrasse"],["rs","https://rausgegangen.com/at/en/locations/prst-club/"],["pr","https://prst.ticket.io/STnPV92b/"],["ft","https://frey-tag.at/kalender/prst-halloween?s=e4YgMegi7"],["vo","https://www.volume.at/events/prst-invites-halloween-special-2026-10-31/"],["ra","https://de.ra.co/events/2549018"],["pr","https://prst.ticket.io/"]],"tickets":"https://prst.ticket.io/STnPV92b/","vok":1,"head":["Camion Bazar","Franziska Berns"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"23:00","e":"05:00","title":"Connecting People","venue":"SASS Music Club","coll":["Connecting People"],"floors":[{"f":"","a":["Peradise","Sweet Spot","maximo"]}],"src":[["sa","https://sassvienna.com/en/events/event/connecting-people-31-10"],["sa","https://sassvienna.com/en/events"]],"genres":["House","Electro","New Wave","Minimal"],"price":"10–15 €","vok":1,"age":"18+","aw":1,"flyer":"https://sassvienna.com/assets/images/4/SASS_KW44_1080x1350px_SA_1-f5abd174.jpg","note":{"de":"Die Reihe Connecting People kehrt mit House-Grooves ins SASS zurück. Peradise, aufgewachsen zwischen Jazz und Klassik, verbindet groovigen House, minimalistische Beats und feine elektronische Klangflächen. Sweet Spot ist das Projekt zweier Brüder aus dem Wiener Underground (bekannt durch House of Wonders und Wien Ballett) – sugr sugr steht für die harte, futuristische Seite, Vanja für Vielseitigkeit. maximo, Gründer von Kollektiv und Label Connecting People, half ab 2013 beim Aufbau der SASS-Afterhour (damals „Sunday Mornings“) und spielt aktuell Electro, Electroclash, New Wave und Synth Pop. Welcome Drink inklusive, Awareness-Team vor Ort.","en":"The Connecting People series returns to SASS with house grooves. Peradise, raised between jazz and classical music, blends groovy house, minimal beats and subtle electronic textures. Sweet Spot is the project of two brothers from Vienna's underground (known from House of Wonders and Wien Ballett) – sugr sugr stands for the hard, futuristic side, Vanja for versatility. maximo, founder of the Connecting People collective and label, helped build the SASS afterhour from 2013 (then \"Sunday Mornings\") and currently plays electro, electroclash, new wave and synth pop. Welcome drink included, awareness team on site."},"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","title":"Halloween Special","venue":"Das Werk","floors":[{"f":"Main Floor","a":["Joey","Crystal O","Rantom b2b LUZZT","Dj Wifi","Arman Shadow"]},{"f":"Luster Floor","a":["Nikilist","Qaoz","Trugbild b2b KRISTUS","Feli Nightingale"]}],"src":[["ev","https://events.at/event/halloween-special"],["dw","https://www.daswerk.org/program"],["ot","https://www.oeticket.com/noapp/eventseries/halloween-special-4266389/"],["osh","https://ohschonhell.at/date/das-werk-vienna-31-10-2026-halloween-special"],["ra","https://ra.co/events/2562677"]],"tickets":"https://www.eventim-light.com/at/a/623a01d54f99ba1c8b632d22/e/6ad0d75e32733c9d9cec8410","s":"23:00","vok":1,"price":"12–20 € (Early Bird VVK 12 €, AK 20 €)","note":{"de":"Halloween-Nacht im Werk (auf der Website als „Halloween Rave“ gelistet) ab 23:00 auf zwei Floors: Am Main Floor spielen Joey, Crystal O, Rantom b2b LUZZT, Dj Wifi und Arman Shadow, am Luster Floor Nikilist, Qaoz, Trugbild b2b KRISTUS und Feli Nightingale. Early-Bird-Vorverkauf 12 €, Abendkassa 20 € (oeticket listete zuvor ab 22,20 € inkl. Gebühren). Eine Endzeit und einen Beschreibungstext veröffentlicht die Location nicht.","en":"Halloween night at Das Werk (listed on its website as \"Halloween Rave\") from 23:00 on two floors: Joey, Crystal O, Rantom b2b LUZZT, Dj Wifi and Arman Shadow play the Main Floor, Nikilist, Qaoz, Trugbild b2b KRISTUS and Feli Nightingale the Luster Floor. Early-bird presale €12, door €20 (oeticket previously listed from €22.20 incl. fees). The venue publishes no end time or description."},"na":["flyer","e"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"23:00","title":"The Hive x Collapse – Face Off Halloween Special","venue":"Flex","coll":["The Hive","Collapse"],"floors":[{"f":"","a":["Magnetude","PRDK","CED","DNBREAK","Scapula","Weazl","Sinis","Lazaro","Mayez","Skeedz","Rellux","Distorted"]}],"price":"9–15 € (VVK)","tickets":"https://events.tickethead.io/de/tickethead/event/5561","flyer":"https://flex.at/wp-content/uploads/2026/09/814428341_1741700054047618_4403690900796600159_n.jpg","note":{"de":"Face Off: The Hive und Collapse laden zum Drum-&-Bass-Halloween-Special ins Flex, bei dem alle Acts Face-to-Face (F2F) spielen. Headliner sind Magnetude aus Großbritannien F2F PRDK aus Tschechien. Als Local Support treten CED F2F DNBREAK, Scapula F2F Weazl, Sinis F2F Lazaro, Mayez F2F Skeedz und Rellux F2F Distorted an. Einlass 23 Uhr; VVK Phase 1 9 €, Phase 2 15 €, Abendkasse noch offen. Ein Ende nennt der Club nicht.","en":"Face Off: The Hive and Collapse host a drum & bass Halloween special at Flex where every act plays face-to-face (F2F). Headliners are Magnetude from the UK F2F PRDK from the Czech Republic. Local support: CED F2F DNBREAK, Scapula F2F Weazl, Sinis F2F Lazaro, Mayez F2F Skeedz and Rellux F2F Distorted. Doors 23:00; presale phase 1 €9, phase 2 €15, door price TBA. The club gives no end time."},"vok":1,"src":[["fx","https://flex.at/event/the-hive-x-collapse/"],["wa","https://warda.at/events/face-off-halloween-special/"],["vo","https://www.volume.at/events/face-off-halloween-special-2026-10-31/"]],"genres":["Drum & Bass"],"head":["Magnetude","PRDK"],"na":["e","age"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"23:30","e":"05:00","title":"Black Signal","venue":"Loop","coll":["Dunkelton Kollektiv"],"genres":["Techno"],"floors":[{"f":"","a":["Techflex","Mike Mystik","Zuckerfrei"]}],"price":"Eintritt frei / freiwillige Spende","age":"18+","flyer":"https://images.ra.co/d8cb6e590540885da03aad7ebe7d79a84b59584a.jpg","note":{"de":"Black Signal ist zurück: Das Dunkelton Kollektiv lädt erneut in den Club Loop zu einer Nacht mit rohem, tiefem und hypnotischem Techno. Erwartet werden treibende Rhythmen, dunkle Atmosphäre und kompromisslose Underground-Sounds – „No hype. No mainstream. Just Techno.“ Es spielen Techflex, Mike Mystik und Zuckerfrei. Eintritt frei bzw. freiwillige Spende. RA nennt in der Kopfzeile 23:00 und als Preis 5, der Text spricht von 23:30 und freiem Eintritt bzw. Spende.","en":"Black Signal returns: Dunkelton Kollektiv is back at Club Loop for another night of raw, deep and hypnotic techno. Expect driving rhythms, dark atmospheres and uncompromising underground sounds – 'No hype. No mainstream. Just Techno.' Techflex, Mike Mystik and Zuckerfrei play. Free entry / voluntary donation. RA header says 23:00 and lists a cost of 5, while the text says 23:30 and free entry/donation."},"src":[["ra","https://ra.co/events/2548181"]],"na":["tickets"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-10-31","s":"23:59","e":"05:00","title":"Homesounds – Local FLINTA for local homeless","venue":"Club Lucia","floors":[{"f":"","a":["Hannah","Sanex","Misspixie","Stefanie Brida","Wisteria b2b Stefanie Brida"]}],"flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/FunPic_20261012_113837324.jpg","note":{"de":"Halloween-Charity-Nacht im Club Lucia unter dem Motto „Local DJs for local homeless“ und „Colours for all“: Lokale FLINTA*-DJs legen für den guten Zweck auf, alle Spenden gehen an das neunerhaus, eine Wiener Organisation für wohnungslose Menschen. Es spielen Hannah, Sanex, Misspixie und Stefanie Brida; zum Abschluss gibt es ein b2b-Set von Wisteria (Drum & Bass) und Stefanie Brida. Verkleidung ist willkommen, aber kein Muss. Einen fixen Eintrittspreis nennt die Location nicht – es wird um Spenden gebeten. Geplant ist bis 05:00; bei genug Publikum wird laut Location bis 06:00 verlängert.","en":"Halloween charity night at Club Lucia under the motto \"Local DJs for local homeless\" and \"Colours for all\": local FLINTA* DJs play for a good cause, all donations go to neunerhaus, a Viennese organisation for homeless people. Playing are Hannah, Sanex, Misspixie and Stefanie Brida; the night closes with a b2b set by Wisteria (drum & bass) and Stefanie Brida. Costumes welcome but not required. The venue states no fixed entry price – donations are requested. Planned until 05:00; according to the venue it will run until 06:00 if enough people show up."},"vok":1,"src":[["cl","https://www.clublucia.at/event/homesounds-local-flinta-for-local-homeless-%e2%99%a5/"],["vo","https://www.volume.at/events/homesounds-2026-10-31/"]],"genres":["Electronic"],"price":"Spende","chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-01","s":"06:00","e":"11:00","title":"Morgengymnastik × Connecting People","venue":"SASS Music Club","coll":["Connecting People"],"floors":[{"f":"","a":["Memet Acuma","Leon Diamant"]}],"src":[["sa","https://sassvienna.com/en/events/event/morgengymnastik-171"],["sa","https://sassvienna.com/en/events"]],"genres":["House","Techno","Electro","Broken Beat"],"price":"15 €","vok":1,"age":"18+","aw":1,"flyer":"https://sassvienna.com/assets/images/d/SASS_KW44_1080x1350px_SO_0111-ac726fc8.jpg","note":{"de":"Wenn draußen der Morgen anbricht, beginnt im SASS der Sonntag: Connecting People übernimmt die Afterhour Morgengymnastik mit zwei DJs, die schon unzählige Stunden gemeinsam hinter den Decks verbracht haben. Memet Acuma, seit Langem eine feste Größe der österreichischen Szene, bewegt sich zwischen House, Techno, gebrochenen Rhythmen und experimentellen Texturen. Sein eingespielter Partner Leon Diamant ergänzt ihn – gemeinsam verbinden sie tiefen, federnden House mit scharfen Electro-Cuts. Bequeme Schuhe empfohlen; Awareness-Team vor Ort.","en":"As morning breaks outside, Sunday starts at SASS: Connecting People takes over the Morgengymnastik afterhour with two DJs who have spent countless hours behind the decks together. Memet Acuma, a long-standing fixture of the Austrian scene, moves between house, techno, broken beats and experimental textures. His well-rehearsed partner Leon Diamant joins him – together they blend deep, bouncy house with sharp electro cuts. Comfortable shoes recommended; awareness team on site."},"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-01","s":"14:00","e":"20:00","title":"FLUT x Callshop Radio – Week 44","venue":"FLUCC Deck","coll":["Spumante Records","Callshop Radio"],"price":"Eintritt frei","note":{"de":"Sonntagnachmittag am FLUCC Deck: FLUT (FLUCC Transmitter) ist Teil der erweiterten Aktivitäten des FLUCC und kooperiert mit Callshop Radio, das auch aus Düsseldorf, Leipzig und Paris sendet. Die Session wird live über Stream 2 auf callshopradio.com übertragen und von Spumante Records aus Wien kuratiert. Das Live-DJ-Line-up bilden The Lebanese, Findus, Helix, sig. Molteni, Birk und Soularium. Während des Streams ist die Deck-Bar geöffnet. Eintritt frei.","en":"Sunday afternoon on the FLUCC Deck: FLUT (FLUCC Transmitter) is part of FLUCC's extended activities and cooperates with Callshop Radio, which also broadcasts from Düsseldorf, Leipzig and Paris. The session is streamed live via Stream 2 on callshopradio.com and curated by Vienna's Spumante Records. The live DJ line-up is The Lebanese, Findus, Helix, sig. Molteni, Birk and Soularium. The Deck bar is open during the stream. Free entry."},"vok":1,"src":[["fl","https://flucc.at/events/S3pHTJ-flut-x-callshop-radio-week-44-26/"]],"floors":[{"f":"Deck","a":["The Lebanese","Findus","Helix","sig. Molteni","Birk","Soularium"]}],"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/Flucc_Transmitter8.min-2560x1440.png","na":["lineup"],"chk":"2026-10-31","srcChk":"2026-10-31","genres":["Electronic"]},
{"d":"2026-11-04","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Wöchentlicher Mittwochs-Rave der Reihe Rave am Mittwoch im Werk, Beginn 23:00. Das Werk führt den Termin in seinem Programm, nennt aber noch kein Lineup, keinen Preis und keine Endzeit. Auch auf RA ist für den 4.11. noch keine eigene Eventseite zu finden; Details folgen voraussichtlich kurzfristig.","en":"Weekly Wednesday rave of the Rave am Mittwoch series at Das Werk, starting at 23:00. Das Werk lists the date in its programme but has not yet announced a lineup, price or end time. RA has no dedicated event page for 4 November yet either; details will probably follow at short notice."},"vok":1,"src":[["dw","https://www.daswerk.org/program"],["dw","https://www.daswerk.org/"]],"floors":[{"f":"","a":["TBA"]}],"na":["flyer","price","e","genres"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-05","s":"20:30","title":"Party Modern | SCH:CHT","venue":"FLUCC Deck","coll":["sch:cht","Wien Modern"],"genres":["Musique concrète","Noise"],"src":[["fl","https://flucc.at/events/HzQ4kp-party-modern-schcht/"],["wm","https://www.wienmodern.at/2026-party-modern-schcht-de-4531"]],"price":"12 € VVK (bis 4.11.) / 15 € AK, 5 € mit Wien-Modern-Festivalpass","tickets":"https://www.wienmodern.at/2026-party-modern-schcht-de-4531","vok":1,"e":"00:30","floors":[{"f":"Deck","a":["21:30|Kasho Chualan","Parajekt","Eye F"]}],"note":{"de":"Das Kollektiv sch:cht lädt gemeinsam mit dem Festival Wien Modern zur Party auf das FLUCC Deck (Einlass 20:30, Beginn 21:30, Ende ca. 00:30). Den Auftakt macht Kasho Chualan, kurdisch-kanadische Pianistin, Komponistin und Klangkünstlerin aus Wien, mit Klavier und Elektronik. Danach spielt Parajekt, das Elektronik-Duo von Bernhard Hammer (E-Gitarre, Elektronik) und Matija Schellander (Drum Machine, Sampler), das elektronische Beats mit Musique concrète und Noise verbindet. Zum Abschluss legt Eye F als DJ auf. Kuratiert vom Kulturverein kunstl:cht, koproduziert von Wien Modern; das Deck ist barrierefrei zugänglich.","en":"The sch:cht collective and the Wien Modern festival host a party on the FLUCC Deck (doors 20:30, start 21:30, ends around 00:30). Kasho Chualan, a Kurdish-Canadian pianist, composer and sound artist based in Vienna, opens with piano and electronics. Next up is Parajekt, the electronic duo of Bernhard Hammer (electric guitar, electronics) and Matija Schellander (drum machine, sampler), combining electronic beats with musique concrète and noise. Eye F closes the night with a DJ set. Curated by Kulturverein kunstl:cht, co-produced by Wien Modern; the Deck is wheelchair accessible."},"na":["flyer","age"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-05","s":"23:00","e":"06:00","title":"Donnerstag Nacht","venue":"SASS Music Club","floors":[{"f":"","a":["Gilista","Artemuse","Michael Wagner"]}],"price":"10–15 € / Studierende 0–5 € (inkl. Welcome-Drink)","age":"18+","aw":1,"vok":1,"note":{"de":"Donnerstag Nacht im SASS (23:00–06:00) mit drei DJs. Gilista übernimmt das Warm-up und verbindet 2000er-Vibes mit neueren Sounds – nostalgisch, treibend, groovy. Artemuse, Wiener DJ und Veranstalterin mit Kärntner und griechischen Wurzeln, legt seit 2015 auf, spielt rollende Basslines, eingängige Melodien und starke Vocals und betreibt seit 2025 die Reihe Jeez Louise, um mehr FLINTA*-DJs zu buchen. Michael Wagner aus Klagenfurt spielt nostalgischen, groovigen House der frühen 90er und 2000er mit Fokus auf weniger bekannte Tracks. Eintritt 10–15 €, Studierende 0–5 €, jeweils inkl. Welcome-Drink; ab 18 mit Ausweis-, Taschen- und Sicherheitskontrolle.","en":"Donnerstag Nacht at SASS (23:00–06:00) with three DJs. Gilista handles the warm-up, blending 2000s vibes with newer sounds – nostalgic, driving, groovy. Artemuse, a Vienna-based DJ and promoter with Carinthian and Greek roots, has been DJing since 2015, plays rolling basslines, catchy melodies and strong vocals, and since 2025 has run the Jeez Louise series to book more FLINTA* DJs. Michael Wagner from Klagenfurt plays nostalgic, groovy house from the early 90s and 2000s with a focus on lesser-known tracks. Entry €10–15, students €0–5, each including a welcome drink; 18+ with ID, bag and security checks."},"genres":["House"],"src":[["sa","https://sassvienna.com/en/events/event/donnerstag-nacht-54"],["sa","https://sassvienna.com/en/events"]],"na":["flyer"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"21:00","title":"up/or with NEXUS (live), k means, SAMI, DJ Fred & zey","venue":"FLUCC Deck","floors":[{"f":"","a":["NEXUS","k means","SAMI","DJ Fred","zey"]}],"src":[["fl","https://flucc.at/events/X7gLPJ-upor-with-nexus-live-k-means-sami-dj-fred-zey/"]],"e":"04:30","coll":["Bestand","up/or"],"genres":["Experimental","Bass","Grime","Dubstep","Breaks"],"price":"VVK 11 € · AK 14 €","tickets":"https://kupfticket.com/en/events/upor-bestand-nov26","note":{"de":"up/or – slowenisch für „Widerstand“ – ist eine Reihe zwischen politischer Artikulation, klanglichem Experiment und Clubmusik, präsentiert von Bestand auf dem FLUCC Deck (21:00–04:30). Live spielt NEXUS, das Duo aus B4mba und Mooki6, das das Erbe seiner Herkunft mit Metal, Punk, Dubstep, Trap und experimenteller Clubelektronik verbindet. k means aus Bristol pendelt zwischen Club-Rush und experimentellen, dunklen, kakophonen Sounds; SAMI, Producerin und DJ aus Berlin, spielt bassige, genrefluide Sets mit Grime, 140er-Dubstep, Bass und Rap. DJ Fred bringt Breaks, die Wiener DJ, Sounddesignerin und Veranstalterin zey verbindet verschiedene Traditionen Schwarzer zeitgenössischer Musik. VVK 11 €, AK 14 €, ermäßigte Tickets online.","en":"up/or – Slovenian for 'resistance' – is a series between political articulation, sonic experiment and club music, presented by Bestand on the FLUCC Deck (21:00–04:30). NEXUS plays live, the duo of B4mba and Mooki6, who blend their ancestral heritage with metal, punk, dubstep, trap and experimental club electronics. Bristol's k means moves between club rush and experimental, dark, cacophonous sounds; SAMI, a Berlin-based producer and DJ, plays bass-heavy, genre-fluid sets of grime, 140 dubstep, bass and rap. DJ Fred brings breaks, and Vienna-based DJ, sound designer and organiser zey connects diverse Black contemporary music traditions. Presale €11, door €14, reduced tickets online."},"vok":1,"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/061126_upor_Deck_-_Samo_Zeichen.max-2560x1440.png","head":["NEXUS"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"21:00","e":"04:00","title":"Plüsch","venue":"Tagada","coll":["House of Plüsch"],"genres":["House"],"floors":[{"f":"","a":["MJANE","Miyra Lim","Cristinho","Florian No"]}],"note":{"de":"Plüsch ist eine House-Nacht im Tagada: Vier DJs – MJANE, Miyra Lim, Cristinho und Florian No – sollen den Dancefloor zum Kochen bringen. Motto: „4 DJs. 1 Message: Love will Save the Day“ – House Music All Night Long.","en":"Plüsch is a house night at Tagada: four DJs – MJANE, Miyra Lim, Cristinho and Florian No – set out to bring the dancefloor to the boil. Motto: '4 DJs. 1 Message: Love will Save the Day' – house music all night long."},"src":[["ft","https://frey-tag.at/locations/tagada"],["ft","https://frey-tag.at/kalender/pluesch?s=D58FzEGyT"]],"na":["price","tickets","flyer","age"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-06","s":"22:00","title":"Biosphere – The Techno Spirit of 1997","venue":"Club Exil","coll":["Fluffig"],"genres":["Techno","Acid"],"floors":[{"f":"Bridge Floor","a":["Sam Paganini","The Advent","Joro & Joabo","Elex Red","Tolaris","MC Mars","MC Spot"]},{"f":"Maschinenraum by Fluffig","a":["Anna Ullrich","MARØ","Who is Ela¿","DORAH"]},{"f":"Cyberspace Artist Lab","a":["DJ SDRICCI","Marilou","Raphael Warg","LĪVA"]}],"note":{"de":"BIOSPHERE – The Techno Spirit of 1997 lässt den Geist der Wiener Rave-Szene der 90er wieder aufleben: „90s Acid Techno meets Cosmic Rave“, 8 Stunden auf 3 Floors im Club Exil in Vösendorf (22:00–06:00, ab 20). Auf dem Bridge Floor spielen der Italiener Sam Paganini (Treviso; bekannt für „Zoe“ und „Rave“, Releases auf Drumcode) und The Advent (London, Raw Techno/Electro), dazu Joro & Joabo, Elex Red und Tolaris sowie live die MCs MC Mars und MC Spot. Den Maschinenraum gestaltet Fluffig mit Anna Ullrich (Techno, Bounce, Trance), MARØ, WHO IS ELA¿ und DORAH (Hard Bounce, Hard Techno). Im Cyberspace Artist Lab (in Kooperation mit Dancemalschutz) stehen Mentor DJ SDRICCI und ausgewählte Newcomer wie Marilou (Thessaloniki), LĪVA und Raphael Warg. Erste Ticketstufe (33 €) ausverkauft, Tickets über StageDates.","en":"BIOSPHERE – The Techno Spirit of 1997 revives the spirit of Vienna's 90s rave scene: '90s acid techno meets cosmic rave', 8 hours on 3 floors at Club Exil in Vösendorf (22:00–06:00, 20+). The Bridge Floor features Italy's Sam Paganini (Treviso; known for 'Zoe' and 'Rave', releases on Drumcode) and The Advent (London, raw techno/electro), plus Joro & Joabo, Elex Red and Tolaris, with live vocals by MC Mars and MC Spot. Fluffig hosts the Maschinenraum with Anna Ullrich (techno, bounce, trance), MARØ, WHO IS ELA¿ and DORAH (hard bounce, hard techno). The Cyberspace Artist Lab (in partnership with Dancemalschutz) features mentor DJ SDRICCI and selected newcomers such as Marilou (Thessaloniki), LĪVA and Raphael Warg. First ticket tier (€33) sold out, tickets via StageDates."},"src":[["ex","https://www.club-exil.at/"],["ex","https://club-exil.at/"],["bio","https://www.biosphere1997.com/"],["ra","https://ra.co/events/2523457"],["wa","https://warda.at/events/biosphere-club-exil/"]],"vok":1,"tickets":"https://stagedates.com/events/biosphere-club-exil-vosendorf-20261106-HQLYL","price":"ab 33 € (Zündung 1 ausverkauft)","e":"06:00","age":"20+","flyer":"https://www.biosphere1997.com/assets/biosphere-flyer-lineup-2026-11-06.jpg?v=2","head":["Sam Paganini","The Advent"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"22:00","e":"04:45","title":"Empyreon – Vol. III","venue":"The Loft","coll":["Empyreon","Kollektiv Birdhouse"],"genres":["Progressive House"],"floors":[{"f":"Wohnzimmer","a":["22:00|Mary Slim","23:40|Edictum","01:20|Matt Ludlam","03:00|DJ Andy"]}],"price":"Freie Spende","flyer":"https://www.theloft.at/wp-content/uploads/2026/10/2026.11.06_empyreon-vol.-iii.png","note":{"de":"Dritte Ausgabe von Empyreon im Wohnzimmer des Loft: Gastgeber Kollektiv Birdhouse will in Wien eine Progressive-House-Underground-Szene aufbauen und setzt auf ein internationales Lineup und DJ-Handwerk. Die Sets sind als Bogen geplant – von deepen Grooves über treibende, melodische und emotionale Sounds bis zu dunklen, technoiden, hypnotischen Rhythmen. Es spielen Mary Slim (22:00), Edictum (23:40), Matt Ludlam (01:20) und DJ Andy (03:00–04:45). Eintritt gegen freie Spende.","en":"Third edition of Empyreon in The Loft's Wohnzimmer: host Kollektiv Birdhouse wants to build a progressive house underground scene in Vienna, focusing on an international lineup and DJ craft. The sets are planned as one arc – from deep grooves through driving, melodic and emotional sounds to dark, techy, hypnotic rhythms. Playing are Mary Slim (22:00), Edictum (23:40), Matt Ludlam (01:20) and DJ Andy (03:00–04:45). Entry by free donation."},"vok":1,"src":[["lo","https://www.theloft.at/empyreon-vol-iii/"]],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","e":"06:00","title":"Mahlwerk × Fadercult w/ Afem Syko & Lisa Korver","venue":"Grelle Forelle","coll":["Mahlwerk","Fadercult"],"genres":["Techno","Trance","Drum & Bass","Bounce","Hardgroove"],"price":"ab 13 €","floors":[{"f":"Mainfloor","a":["Afem Syko","Lisa Korver","maro","Max Wagner","WO.IZZY","Kat Ze"]},{"f":"Kitchen (Fadercult Berlin)","a":["Sony2k","Linus Villa","Ben Derris","Sophti"]}],"src":[["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/mahlwerk-and-fadercult?s=KW-rAGWQH"],["gf","https://www.grelleforelle.com/project/0611-mahlwerk-fadercult-w-afem-syko-lisa-horver/"],["ra","https://ra.co/events/2544505"]],"vok":1,"tickets":"https://808factory.stager.co/shop/default/events/111702111","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/mahlwerk_061126_web.jpg","age":"21+","head":["Afem Syko","Lisa Korver"],"note":{"de":"Mahlwerk kehrt in die Grelle Forelle zurück und bringt das Berliner Kollektiv Fadercult mit. Auf dem Mainfloor spielen Afem Syko aus Berlin, deren Sound Techno, Drum & Bass und Trance mischt, und Lisa Korver aus Amsterdam, die sich zwischen Techno, Trance, Bounce und Hardgroove bewegt; dazu maro b2b Max Wagner und WO.IZZY b2b Kat Ze. Den Kitchen-Floor hostet Fadercult mit Sony2k, Linus Villa, Ben Derris und Sophti. Einlass 23:00, VVK über 808factory, Abendkasse ab 23:00, ab 21.","en":"Mahlwerk returns to Grelle Forelle, bringing the Berlin collective Fadercult along. On the main floor, Berlin's Afem Syko mixes techno, drum & bass and trance, and Amsterdam's Lisa Korver moves between techno, trance, bounce and hardgroove; plus maro b2b Max Wagner and WO.IZZY b2b Kat Ze. Fadercult hosts the Kitchen with Sony2k, Linus Villa, Ben Derris and Sophti. Doors 23:00, presale via 808factory, box office from 23:00, 21+."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","e":"06:00","title":"WOS Soundsystem invites Josefina Tapia","venue":"SASS Music Club","coll":["WOS Soundsystem"],"floors":[{"f":"","a":["Josefina Tapia","Apua","Bambi-S","Oliviero"]}],"src":[["sa","https://sassvienna.com/en/events/event/WOS-josefine%20tapia"]],"price":"10–15 € (inkl. Welcome-Drink)","vok":1,"age":"18+","aw":1,"head":["Josefina Tapia"],"note":{"de":"WOS Soundsystem übernimmt das SASS für eine lange Nacht Clubmusik (23:00–06:00) und lädt dafür Josefina Tapia ein, eine aus Chile stammende DJ, die klassischen amerikanischen House mit europäischem Minimalismus verbindet. Dazu spielen Apua, Bambi-S und Oliviero. Der Eintritt (10–15 €) enthält einen Welcome-Drink; ab 18 mit Ausweis-, Taschen- und Sicherheitskontrolle, das Awareness-Team des SASS ist vor Ort.","en":"WOS Soundsystem takes over SASS for a long night of club music (23:00–06:00), inviting Josefina Tapia, a Chilean DJ who blends classic American house with European minimalism. Apua, Bambi-S and Oliviero also play. Entry (€10–15) includes a welcome drink; 18+ with ID, bag and security checks, SASS's awareness team is on site."},"na":["flyer","genres"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","title":"GDN Klubnacht w/ Tham","venue":"Das Werk","coll":["GDN"],"floors":[{"f":"Mainfloor","a":["THAM"]},{"f":"","a":["Anatol","Hello Kiffy","High on Melancholia","Kristus","LavendL","MATIVIO"]}],"src":[["ev","https://events.at/venue/das-werk"],["dw","https://www.daswerk.org/program"],["ev","https://events.at/event/gdn-klubnacht-w-tham"],["ft","https://frey-tag.at/kalender/gdn-klubnacht?s=JmeX8qFwc"]],"s":"23:00","genres":["Techno","Hardgroove","Schranz","Hardbounce"],"tickets":"https://www.eventim-light.com/at/a/623a01d54f99ba1c8b632d22/e/6aca348b32733c9d9cec76ae","flyer":"https://image.events.at/images/facebook/9358032/GDN_KLUBNACHT_w_THAM_c_GDN_222.jpg?versionId=f9ab791072d1","aw":1,"nophoto":1,"vok":1,"price":"ab 12 €","head":["THAM"],"note":{"de":"Die nächste GDN Klubnacht im Werk: Die Berliner Künstlerin THAM übernimmt den Mainfloor mit groovigem Techno. Den Rest der Nacht bestreiten GDN-Residents und Freund*innen des Kollektivs – ANATOL, Hello Kiffy, High on Melancholia, KRISTUS, LavendL und MATIVIO – mit Techno, Hardgroove, Schranz und Hardbounce. Ein geschultes Awareness-Team ist vor Ort (rote oder blaue Leuchtbänder am Arm, rot mit zusätzlicher medizinischer Ausbildung). Strikte No-Photo-Policy: Handykameras werden abgeklebt, eine Fotobox steht bereit; kein Platz für Homo- und Transphobie, Rassismus und Sexismus. Tickets ab 12 € über Eventim Light.","en":"The next GDN Klubnacht at Das Werk: Berlin artist THAM takes over the main floor with groovy techno. GDN residents and friends of the collective – ANATOL, Hello Kiffy, High on Melancholia, KRISTUS, LavendL and MATIVIO – cover the rest of the night with techno, hardgroove, schranz and hardbounce. A trained awareness team is on site (red or blue light strips on the arm, red with additional medical training). Strict no-photo policy: phone cameras are covered with stickers, a photo box is available; no place for homophobia, transphobia, racism or sexism. Tickets from €12 via Eventim Light."},"na":["e"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","title":"Im Freudentaumel","venue":"FLUCC Wanne","coll":["Im Freudentaumel"],"src":[["fl","https://flucc.at/events/QgUEhp-im-freudentaumel/"]],"e":"06:00","genres":["Techno"],"price":"10–15 €","tickets":"https://kupfticket.com/events/im-freudentaumel","floors":[{"f":"","a":["Scheibosan","Glitzer & Bass","Nafaka & Lipo","Kollektiv Sheesh"]}],"note":{"de":"Im Freudentaumel ist nach einem gelungenen Herbststart zurück im FLUCC (Kupf) mit verträumtem Techno „in unterschiedlichen Farben“ (23:00–06:00). Es spielen Scheibosan, Glitzer & Bass, Nafaka & Lipo und Kollektiv Sheesh. Dazu gibt es eine Live-Lichtshow, verspielte Missionen, Gratis-Secco und verträumte Deko. Tickets 10–15 € über KUPFticket, ein kleines Early-Bird-Kontingent um ca. 10 €.","en":"Im Freudentaumel is back at FLUCC (Kupf) after a great autumn start, with dreamy techno 'in different colours' (23:00–06:00). Playing are Scheibosan, Glitzer & Bass, Nafaka & Lipo and Kollektiv Sheesh. There is also a live light show, playful missions, free secco and dreamy decorations. Tickets €10–15 via KUPFticket, with a small early-bird allotment at around €10."},"vok":1,"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/kupf.min-2560x1440.png","chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","title":"BLUR with E.LINA","venue":"PRST","floors":[{"f":"","a":["E.LINA","Chris Freud","David Radi","Matthias Kaiser"]}],"src":[["rs","https://rausgegangen.com/at/en/locations/prst-club/"],["ra","https://ra.co/events/2553366"]],"e":"06:00","genres":["House","Tech House"],"coll":["Kollektiv Ost:West"],"price":"online 12–20 €, AK 16 € vor 0 Uhr / 20 € danach","age":"18+","tickets":"https://ra.co/events/2553366","flyer":"https://images.ra.co/5925b8f06c12ea4c41b0a57e9e5c777165085851.jpg","head":["E.LINA"],"note":{"de":"BLUR ist eine House-Nacht von Kollektiv Ost:West im PRST (23:00–06:00). Headlinerin ist E.LINA, eine ukrainische, in Berlin lebende Künstlerin mit Wurzeln in Hip-Hop und elektronischer Musik, bekannt für tiefe Basslines und rhythmische Melodien; gespielt hat sie u. a. im CDV, in der Panorama Bar, im Amnesia sowie bei Dimensions und Fusion. Dazu spielen die KO:W-Residents Chris Freud, David Radi und Matthias Kaiser. Online 12–20 €, Abendkasse 16 € vor Mitternacht, 20 € danach; ab 18.","en":"BLUR is a house night by Kollektiv Ost:West at PRST (23:00–06:00). The headliner is E.LINA, a Ukrainian, Berlin-based artist rooted in hip-hop and electronic music, known for deep basslines and rhythmic melodies; she has played CDV, Panorama Bar, Amnesia, Dimensions and Fusion, among others. KO:W residents Chris Freud, David Radi and Matthias Kaiser complete the lineup. Online €12–20, door €16 before midnight and €20 after; 18+."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","title":"Max Styler","venue":"O der Klub","coll":["SIGNAL"],"genres":["Indie Dance","House"],"floors":[{"f":"","a":["Max Styler"]}],"price":"12–25 €","tickets":"https://shop.o-klub.at/shop/registrations?event_id=021e8ed5-99cc-491b-876a-377ca7925ade","flyer":"https://o-klub.at/wp-content/uploads/2026/08/Max_feed-web.jpg","note":{"de":"SIGNAL präsentiert Max Styler im O der Klub (23:00–06:00, ab 18). Der aus Kalifornien stammende Producer war 2025 laut 1001Tracklists der meistgesupportete Producer der Top 101 und landete mehrere Beatport-#1-Releases. Er gründete sein eigenes Label und Eventformat Nu Moda, war im Jänner 2026 Beatports Artist of the Month und erreichte mit „Greece 2000“ Platz 1 über alle Genres. Der Wien-Termin ist Teil seiner bisher größten Headline-Tour durch Nord- und Südamerika, Großbritannien und Europa.","en":"SIGNAL presents Max Styler at O der Klub (23:00–06:00, 18+). According to 1001Tracklists, the California-born producer was the most-supported producer in its 2025 Top 101 and scored several Beatport #1 releases. He launched his own label and event brand Nu Moda, was Beatport's Artist of the Month in January 2026 and reached #1 across all genres with 'Greece 2000'. The Vienna date is part of his biggest headline tour to date across North and South America, the UK and Europe."},"vok":1,"src":[["ok","https://o-klub.at/events/max-styler/"],["ra","https://ra.co/events/2519490"],["vo","https://www.volume.at/events/signal-presents-max-styler-2026-11-06/"]],"e":"06:00","age":"18+","head":["Max Styler"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","title":"Soularium w/ Santo","venue":"The Loft","coll":["Soularium"],"genres":["House"],"floors":[{"f":"Oben","a":["Santo"]}],"price":"12–15/17 €","note":{"de":"Die Reihe Soularium holt Santo aus der Schweiz in den oberen Floor („Oben“) des Loft. Das Loft taggt den Abend mit House; Beginn 23:00, Eintritt 12–15/17 €. Weitere Acts, Endzeit und ein Beschreibungstext sind auf der Loft-Seite bislang nicht angegeben.","en":"The Soularium series brings Santo from Switzerland to The Loft's upstairs floor ('Oben'). The Loft tags the night as house; starts at 23:00, entry €12–15/17. Further acts, end time and a description have not yet been published on The Loft's page."},"vok":1,"src":[["lo","https://www.theloft.at/soularium-w-santo-ch/"]],"head":["Santo"],"na":["flyer","e"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:45","title":"Sorry Mom – herbstrascheln","venue":"Club Lucia","coll":["Sorry Mom"],"genres":["Techno","Progressive","Psytech","Melodic Techno"],"price":"10 €","floors":[{"f":"","a":["Gugu","Hanneken","PA_olo","Romen Est Omen"]}],"src":[["osh","https://ohschonhell.at/orte/club+lucia/963"],["cl","https://www.clublucia.at/event/sorry-mom-herbstrascheln/"],["ra","https://ra.co/events/2521239"]],"vok":1,"e":"06:00","flyer":"https://www.clublucia.at/wp-content/uploads/2026/09/26_11-lucia-1080x1440-1-e1788265151476.png","age":"18+","note":{"de":"Sorry Mom lädt zum „herbstrascheln“ in den Club Lucia: eine warme, bassige Herbstnacht mit melodischem, progressivem, treibendem Techno und Psytech, um die Sommerträgheit vor dem Winter abzuschütteln. Es spielen Gugu, Hanneken, PA_olo und Romen est Omen. Beginn 23:45, Ende 06:00, Eintritt 10 €, ab 18; gespielt wird über ein L-Acoustics-System.","en":"Sorry Mom invites you to 'herbstrascheln' at Club Lucia: a warm, bass-heavy autumn night of melodic, progressive, driving techno and psytech to shake off the summer slump before winter. Playing are Gugu, Hanneken, PA_olo and Romen est Omen. Starts 23:45, ends 06:00, entry €10, 18+; sound comes from an L-Acoustics system."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"17:00","e":"23:00","title":"Kyau & Albert (Extended Set)","venue":"U4","coll":["euphonic records"],"genres":["Progressive House","Trance"],"floors":[{"f":"","a":["Kyau & Albert","Peter Illias","CREEXX","MJT & RPM"]}],"price":"€19","age":"18+","tickets":"https://ra.co/events/2506486","src":[["ra","https://ra.co/events/2506486"],["u4","https://www.u4.at/events/kyau-albert-live/"]],"vok":1,"flyer":"https://images.ra.co/1e56e39040905a5a82a08551fcdd340ce44f111c.jpg","head":["Kyau & Albert"],"note":{"de":"Kyau & Albert spielen im U4 ein 3-stündiges Extended Set – laut U4 ihr erster Auftritt in Österreich. Das deutsche Duo gründete 1997 das Label Euphonic, veröffentlicht seit 2004 auf Anjunabeats (London), spielte in über 80 Ländern und auf großen Festivals und moderiert die wöchentliche Radioshow „Euphonic Sessions“ (Progressive House, Melodic Techno, Trance). Support kommt von Peter Illias, CREEXX und MJT & RPM. Abend-Event von 17:00 bis 23:00, 19 €, ab 18; Tickets über RA.","en":"Kyau & Albert play a 3-hour extended set at U4 – according to U4 their first show in Austria. The German duo founded the Euphonic label in 1997, have released on London's Anjunabeats since 2004, have played more than 80 countries and major festivals, and host the weekly radio show 'Euphonic Sessions' (progressive house, melodic techno, trance). Support comes from Peter Illias, CREEXX and MJT & RPM. Evening event from 17:00 to 23:00, €19, 18+; tickets via RA."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"18:00","e":"00:00","title":"SXXPLICIT Pop-up Club","venue":"Libelle","coll":["Pole Circle","Slutlabs"],"sexpos":1,"lgbtq":1,"tickets":"https://events.eventjet.at/e/sxxplicit-vienna/","note":{"de":"SXXPLICIT ist ein von Gemma Rose gegründeter Pop-up-Club – ein von Sexarbeiter*innen geprägter, queerer Raum, der die Standards der Branche neu definieren will. Nach Events in Großbritannien bringen Pole Circle und Slutlabs das Format in die Libelle: eine Nacht queerer Freude und erotischer Rebellion mit Stage-Shows sowie Pole- und Lapdances (18:00–00:00). DJs, Performer*innen und Musikrichtung sind nicht angegeben. Ticket 45 € über Eventjet, das Ticket garantiert keinen Einlass (Door-Selection); Consent-Regeln werden beim Einlass erklärt, Gäste sollen in einem Zustand kommen, in dem sie auf sich und andere achten können.","en":"SXXPLICIT is a pop-up club founded by Gemma Rose – a worker-centred, queer-focused space aiming to redefine the industry's standards. After events in the UK, Pole Circle and Slutlabs bring the format to Libelle: a night of queer joy and erotic rebellion with stage shows plus pole and lap dances (18:00–00:00). DJs, performers and music style are not listed. Ticket €45 via Eventjet; a ticket does not guarantee entry (door selection); consent rules are explained at the door, and guests should arrive in a state in which they can look after themselves and others."},"src":[["sp","https://sexpositives.com/en/events/sxxplicit-wien-2026-11-07/"],["li","https://www.libelle.at/events/sxxplicit-by-pole-circle-x-slutlabs/"],["ej","https://events.eventjet.at/e/sxxplicit-vienna/"]],"price":"€45","vok":1,"flyer":"https://www.libelle.at/wp-content/uploads/2026/10/IMG_4142.png","floors":[{"f":"","a":["TBA"]}],"na":["genres","age"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"21:00","title":"Pomelo Plaza #3 presented by Little Beat More","venue":"FLUCC Deck","coll":["Little Beat More"],"src":[["fl","https://flucc.at/events/aSALhK-little-beat-more/"]],"vok":1,"floors":[{"f":"Deck","a":["D.b.h","Urlaub in Jazzolo","Café Mondo"]}],"e":"04:00","price":"10 € (nur Abendkasse, bar)","genres":["Funk","Disco"],"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/071126_POMELO_PLAZA_N.3_Deck_LittleBeatMor.max-2560x1440.jpg","zero":1,"note":{"de":"Little Beat More lädt zur dritten Pomelo Plaza auf das FLUCC Deck – ein herbstlicher Pomelo-Abend mit funky Grooves, Feel-Good-Rhythmen und Disco-Sounds, ausschließlich von Vinyl. Es spielen Little Beat More feat. D.b.h sowie die Vinyl-Selectors Urlaub in Jazzolo und Café Mondo. Beginn 21:00; das Programm nennt 04:00 als Ende, der Beschreibungstext 06:00. Eintritt 10 € die ganze Nacht, nur Abendkasse und nur bar. Null Toleranz für Rassismus und Hass – wer sich unwohl fühlt, kann sich an Bar oder Security wenden.","en":"Little Beat More hosts the third Pomelo Plaza on the FLUCC Deck – an autumn pomelo night of funky grooves, feel-good rhythms and disco sounds, all on vinyl. Playing are Little Beat More feat. D.b.h plus vinyl selectors Urlaub in Jazzolo and Café Mondo. Starts at 21:00; the listing gives 04:00 as the end, the description 06:00. Entry €10 all night, door only and cash only. Zero tolerance for racism and hate – anyone feeling unsafe can turn to the bar or security staff."},"na":["age"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"22:00","e":"06:00","title":"Fuelized 3 Year Anniversary w/ Minor Forms & Chrome","venue":"Club Lucia","coll":["Fuelized"],"genres":["Drum & Bass"],"floors":[{"f":"","a":["Minor Forms","Chrome","AudioDevice","ICY.DJ","Incognito","M4YB3","Shaxoron","Snowtek"]}],"price":"15 € (AK)","flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/Fuelized_3Years_Feed_Full_Lineup-scaled.jpg","note":{"de":"Fuelized feiert drei Jahre Partys im Club Lucia, die in Wien minimalen, deepen und souligen Drum & Bass pushen. Headliner sind zwei britische Underground-Größen: Minor Forms (Releases auf Sofa Sound, Flexout Audio und V Recordings) und Chrome (Yamatai, Mustard). Local Support kommt von AudioDevice (Contrast), ICY.DJ, Incognito, M4YB3, Shaxoron, Snowtek und dem Gewinner bzw. der Gewinnerin des Fuelized-Mix-Contests. 22:00–06:00, Abendkasse 15 €, Tickets über Eventfrog; ab 18.","en":"Fuelized celebrates three years of parties at Club Lucia pushing minimal, deep and soulful drum & bass in Vienna. Headliners are two UK underground names: Minor Forms (releases on Sofa Sound, Flexout Audio and V Recordings) and Chrome (Yamatai, Mustard). Local support comes from AudioDevice (Contrast), ICY.DJ, Incognito, M4YB3, Shaxoron, Snowtek and the winner of the Fuelized mix contest. 22:00–06:00, door €15, tickets via Eventfrog; 18+."},"vok":1,"src":[["cl","https://www.clublucia.at/event/fuelized-proudly-pres-3-yearanniversary-w-minor-forms-uk-chrome-uk/"],["ra","https://ra.co/events/2554882"]],"age":"18+","head":["Minor Forms","Chrome"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"22:00","e":"06:00","title":"traveling without moving","venue":"Funkhaus","coll":["created-on-earth"],"genres":["House"],"floors":[{"f":"","a":["Felix Rupprecht","Pancratio","Rayya"]}],"age":"18+","tickets":"https://ra.co/events/2547379","src":[["ra","https://ra.co/events/2547379"]],"flyer":"https://images.ra.co/40a4bba1f457a1ffdf3f6571db854cabe0a12fb7.png","note":{"de":"„traveling without moving“ von created-on-earth meint, sich durch Sound, Rhythmus und Atmosphäre wegtragen zu lassen, ohne die Tanzfläche zu verlassen: Statt Ticket, Pass und Koffer gibt es vielfältige Musik – trotz des Namens wird viel getanzt. Die Reise führt laut Beschreibung im Lauf der Nacht etwa nach Detroit und Rio. Es spielen Felix Rupprecht, Pancratio und Rayya; RA taggt den Abend mit House. 22:00–06:00 im Funkhaus, ab 18.","en":"'traveling without moving' by created-on-earth means being carried away by sound, rhythm and atmosphere without leaving the dancefloor: instead of a ticket, passport and suitcase there is varied music – despite the name, there is plenty of dancing. According to the description, the journey 'lands' in places like Detroit and Rio over the course of the night. Playing are Felix Rupprecht, Pancratio and Rayya; RA tags the night as house. 22:00–06:00 at Funkhaus, 18+."},"na":["price"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:00","e":"06:00","title":"Mixed Vienna w/ Prada2000","venue":"Grelle Forelle","price":"ab 15 €","floors":[{"f":"Mainfloor","a":["Prada2000","Catlex","Suitside","Aschenbrenner"]},{"f":"Kitchen","a":["DJ Parkverbot","Lieblos","Valera","Sasuma"]}],"src":[["ft","https://frey-tag.at/kalender/mixed-vienna?s=txQP29ZDl"],["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/0711-mixed-vienna-w-prada2000/"]],"vok":1,"tickets":"https://www.eventim-light.com/at/a/697ca7de355c727b43abf53b/e/6ab3d19b6095a69cdcc777b2","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/mixed_071126_web.jpg","genres":["Techno"],"head":["Prada2000"],"note":{"de":"Letzte Mixed-Vienna-Ausgabe des Jahres in der Grelle Forelle: Headliner Prada2000 spielt ein 3-stündiges Extended Set. Der Berliner DJ und Producer verbindet in energiegeladenen Sets euphorische Melodien, verspielte Vocals und druckvollen Bass. Auf dem Mainfloor spielen außerdem Catlex sowie Suitside b2b Aschenbrenner, die Kitchen bespielen Freund*innen der Crew: DJ Parkverbot, Lieblos b2b Valera und Sasuma. Einlass 23:00, Tickets ab 15 € über Eventim Light, Abendkasse ab 23:00, ab 21.","en":"Final Mixed Vienna edition of the year at Grelle Forelle: headliner Prada2000 plays a 3-hour extended set. The Berlin DJ and producer combines euphoric melodies, playful vocals and punchy bass in high-energy sets. Also on the main floor are Catlex and Suitside b2b Aschenbrenner, while friends of the crew play the Kitchen: DJ Parkverbot, Lieblos b2b Valera and Sasuma. Doors 23:00, tickets from €15 via Eventim Light, box office from 23:00, 21+."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","title":"Techno Obscene #35 – 3 Year Anniversary","venue":"Das Werk","coll":["Nine O Nine","LSH","909techno","Techno Obscene"],"genres":["Hardtechno","Detroit Techno","Hardgroove","Hypnotic Techno","Dub Techno"],"floors":[{"f":"Laster Floor · Rave","a":["Albin Brezlan b2b Huebl","Jayzo","TBA"]},{"f":"Luster Floor · Groove","a":["Vibechen","Dana Melissa","URBANIST"]}],"src":[["ev","https://events.at/event/techno-obscene-35"],["dw","https://www.daswerk.org/program"],["ra","https://ra.co/events/2556685"]],"zero":1,"nophoto":1,"tickets":"https://www.eventim-light.com/at/a/623a01d54f99ba1c8b632d22/e/6ace449532733c9d9cec7e01","note":{"de":"Techno Obscene feiert mit der 35. Ausgabe drei Jahre (Nine O Nine × LSH) im Werk und fragt, was eigentlich „obszön“ ist und wer das entscheidet – vielleicht ist es das Obszönste, in einer Welt voller Schubladen einfach man selbst zu sein. Versprochen wird roher, dreckiger Techno in einem Safer Space für Selbstausdruck. Laster Floor (Rave; Detroit, Hardtechno): Albin Brezlan b2b Huebl, Jayzo und ein weiterer Act (TBA). Luster Floor (Groove; Dub, Hypnotic, Hardgroove): Vibechen, Dana Melissa und URBANIST. Come as you are, null Toleranz gegen Homophobie, Sexismus, Rassismus und Hass, No-Photo-Policy und „No Shirt, No Party“ für alle Geschlechter; 23:00–06:00, 10–15 € (First Wave 9,09 €).","en":"Techno Obscene celebrates three years (Nine O Nine × LSH) with its 35th edition at Das Werk, asking what 'obscene' really means and who decides – perhaps the most obscene thing is simply being yourself in a world full of boxes. It promises raw, dirty techno in a safer space for self-expression. Laster Floor (rave; Detroit, hardtechno): Albin Brezlan b2b Huebl, Jayzo and one more act (TBA). Luster Floor (groove; dub, hypnotic, hardgroove): Vibechen, Dana Melissa and URBANIST. Come as you are, zero tolerance for homophobia, sexism, racism and hate, no-photo policy and 'no shirt, no party' for all genders; 23:00–06:00, €10–15 (first wave €9.09)."},"s":"23:00","flyer":"https://image.events.at/images/cfs_616w/9360010/TECHNO_OBSCENE_35_c_909_222.jpg?versionId=9a0046eecce1","vok":1,"e":"06:00","price":"10–15 € (1st wave 9,09 €)","age":"18+","chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","title":"served invites Harmony Rec. × hereandthere","venue":"Secret Location","coll":["served","Harmony Rec.","hereandthere"],"note":{"de":"Die dritte Ausgabe von served kehrt zu ihrem ursprünglichen Spirit zurück – erstmals auf zwei Floors und mit dem bisher größten Lineup. Zu Gast sind die Prager Crews Harmony Rec. und hereandthere, dazu Wiener Artists: anxxxious_t, Ayū (live), Georgia Bird, Melimeko, Menal Batti (House-Set), Pink Concrete b2b Secret Guest und Yan b2b saschka. Im Mittelpunkt stehen persönliche Musik und ein Raum zum Abtauchen; die Party ist von und für queere Menschen und ihre Allies, die Tanzflächen sind zum Tanzen da. Vorab-Registrierung über ein Formular im served-Telegram-Kanal (via Instagram @serve.ddd), Selektion an der Tür, Hausregeln vorab auf Instagram lesen. Secret Location, 23:00–06:00, 15–20 € nur bar an der Abendkasse, ab 18.","en":"The third edition of served returns to its original spirit – for the first time on two floors and with its biggest lineup yet. Guests are the Prague crews Harmony Rec. and hereandthere, plus Vienna artists: anxxxious_t, Ayū (live), Georgia Bird, Melimeko, Menal Batti (house set), Pink Concrete b2b secret guest and Yan b2b saschka. The focus is on personal music and a space to escape; the party is by and for queer people and their allies, and the dancefloors are for dancing. Pre-registration via a form in the served Telegram channel (via Instagram @serve.ddd), door selection, read the house rules on Instagram beforehand. Secret location, 23:00–06:00, €15–20 cash only at the door, 18+."},"src":[["ra","https://ra.co/events/2542405"]],"s":"23:00","e":"06:00","genres":["Techno","House"],"floors":[{"f":"","a":["anxxxious_t","Ayū","Georgia Bird","Melimeko","Menal Batti","Pink Concrete","Yan","saschka"]}],"price":"€15–20 (Abendkasse, nur bar)","age":"18+","lgbtq":1,"flyer":"https://images.ra.co/fccebdad98a9a9dc455b41f190d8f8f75420a3c2.png","chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","title":"technolog Special with Michel Lauriola (ARG)","venue":"Kramladen","coll":["technolog"],"genres":["Techno","Industrial"],"floors":[{"f":"","a":["23:00|anexate","00:15|Hetum","01:30|Michel Lauriola","04:00|Roton"]}],"src":[["vo","https://www.volume.at/drum-and-bass-techno-events-in-wien/"],["wa","https://warda.at/events/technolog-special-with-michel-lauriola-arg-kramladen/"],["ra","https://de.ra.co/events/2557226"],["ra","https://ra.co/events/2557226"],["vo","https://www.volume.at/events/technolog-special-with-michael-lauriola-arg-2026-11-07/"],["tl","https://www.technolog.wtf"]],"s":"23:00","e":"06:00","price":"Eintritt frei / free entry","age":"21+","note":{"de":"technolog lädt zum Special in den Kramladen mit Michel Lauriola aus Argentinien, der u. a. mit den Labels Mord, Nachtstrom Schallplatten und Semántica verbunden ist; RA taggt den Abend mit Techno und Industrial. Timetable: anexate (23:00), Hetum (00:15), Michel Lauriola (01:30–04:00) und Roton zum Abschluss (04:00–06:00). Freier Eintritt, ab 21.","en":"technolog hosts a special at Kramladen with Argentina's Michel Lauriola, associated with labels including Mord, Nachtstrom Schallplatten and Semántica; RA tags the night as techno and industrial. Timetable: anexate (23:00), Hetum (00:15), Michel Lauriola (01:30–04:00) and Roton closing (04:00–06:00). Free entry, 21+."},"flyer":"https://images.ra.co/12ca3bc55dbc0221ee32b3397c21302554e4ec90.jpg","head":["Michel Lauriola"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:00","title":"303 presents Hanzom Label Night","venue":"Flex","coll":["303","Hanzom"],"genres":["Drum & Bass","Neurofunk"],"tickets":"https://www.oeticket.com/event/303-presents-hanzom-label-night-flex-22234345/","flyer":"https://flex.at/wp-content/uploads/2026/10/Flyer_303_07112026.jpeg","note":{"de":"Das Label Hanzom kehrt mit 303 für eine Labelnacht ins Flex zurück: energiegeladener, hart treibender Neurofunk mit schwerem Bass. Einzelne Acts sind weder beim Flex noch bei oeticket oder events.at angegeben. Einlass 23:00, Tickets limitiert – VVK 18,75 € über oeticket (zzgl. Servicegebühr) und Abendkasse.","en":"The Hanzom label returns to Flex with 303 for a label night: high-energy, hard-hitting neurofunk with heavy bass. No individual acts are listed by Flex, oeticket or events.at. Doors 23:00, limited tickets – presale €18.75 via oeticket (plus service fee) and box office."},"vok":1,"src":[["fx","https://flex.at/event/303-presents-hanzom-label-night/"],["ev","https://events.at/event/303-presents-hanzom-label-night"],["ot","https://www.oeticket.com/noapp/eventseries/303-presents-hanzom-label-night-4257591/?affiliate=A21"],["ot","https://www.oeticket.com/event/303-presents-hanzom-label-night-flex-22234345/"]],"floors":[{"f":"","a":["TBA"]}],"price":"18,75 € VVK (oeticket, zzgl. Gebühr) / Abendkasse","na":["e","age"],"chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:00","e":"06:00","title":"Cosmic BirthRave","venue":"Rhiz","coll":["Fader Friends","Cosmic Egg"],"genres":["Techno","Hardcore"],"floors":[{"f":"","a":["adrialin","Enoltra","The Bear","gåpe","wert","Luminoise","Nikø Nøx","Zer0Ton1n","RIETVELD"]}],"price":"5 €","age":"18+","tickets":"https://ra.co/events/2563381","src":[["ra","https://ra.co/events/2563381"],["vo","https://www.volume.at/events/cosmicbirthrave-2026-11-07/"]],"flyer":"https://images.ra.co/ee23bc79d4345b9147dcbbee7d85756141afbfdd.png","note":{"de":"Fader Friends tun sich mit Cosmic Egg zusammen und bringen deren Cosmic-Debütparty ins Rhiz – zugleich die Geburtstagsfeier des Cosmic-Egg-Gründers. Versprochen wird eine Reise, bei der der Bass schwerer, die BPM schneller und die Energie immer größer wird, mit Licht und Sound im Gleichklang. Das Lineup aus kuratierten lokalen Talenten führt durch mehrere Genres elektronischer Musik (RA: Techno, Hardcore): adrialin, Enoltra b2b The Bear, gåpe, wert, Luminoise, Nikø Nøx und Zer0Ton1n b2b RIETVELD. 23:00–06:00, 5 €, ab 18.","en":"Fader Friends team up with Cosmic Egg to bring their Cosmic debut party to Rhiz – also the birthday celebration of Cosmic Egg's founder. It promises a journey where the bass gets heavier, the BPM faster and the energy keeps growing, with lights and sound moving as one. The lineup of curated local talent guides through multiple genres of electronic music (RA: techno, hardcore): adrialin, Enoltra b2b The Bear, gåpe, wert, Luminoise, Nikø Nøx and Zer0Ton1n b2b RIETVELD. 23:00–06:00, €5, 18+."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:00","e":"05:00","title":"Cyclic Existence","venue":"SASS Music Club","coll":["Cyclic Existence"],"floors":[{"f":"","a":["Arne","André","Arni Jr.","Duplikate"]}],"genres":["House","Minimal","Techno","Progressive","Electro"],"price":"10–15 € (inkl. Welcome-Drink)","age":"18+","aw":1,"vok":1,"note":{"de":"Cyclic Existence bringt vier DJs für eine Nacht deeperen House ins SASS (23:00–05:00) – entspannt, langsam aufbauend, mit Fokus auf Groove und gemeinsamer Energie. Arne bewegt sich in fließenden, unaufgeregten Sets zwischen House, Minimal und Techno. André legt seit über zehn Jahren auf, lebt seit 2019 in Offenbach, gräbt nach House, Progressive und Minimal ab den frühen 2000ern und betreibt die Off-Location-Reihe Not From This Earth. Arni Jr. ist seit über zehn Jahren Vinyl-only-DJ in Wien (Come Closer, Vinyl Fetish) mit Electro, Techno, Progressive und Broken Sounds; Duplikate, seit zwei Jahren im SASS und Teil des Housetiere-Kollektivs, spielt Electro House mit schweren Basslines, eingängigen Vocals und Metal-Kante. Eintritt 10–15 € inkl. Welcome-Drink, ab 18, Awareness-Team vor Ort.","en":"Cyclic Existence brings four DJs to SASS for a night of deeper house (23:00–05:00) – relaxed, building gradually, focused on groove and shared energy. Arne moves between house, minimal and techno in flowing, unhurried sets. André has been DJing for over ten years, has lived in Offenbach since 2019, digs for house, progressive and minimal from the early 2000s onwards and runs the off-location series Not From This Earth. Arni Jr. has been a vinyl-only DJ in Vienna for over ten years (Come Closer, Vinyl Fetish) playing electro, techno, progressive and broken sounds; Duplikate, at SASS for two years and part of the Housetiere collective, plays electro house with heavy basslines, catchy vocals and a metal edge. Entry €10–15 incl. welcome drink, 18+, awareness team on site."},"src":[["sa","https://sassvienna.com/en/events/event/cyclic-existence-november"],["sa","https://sassvienna.com/en/events"]],"na":["flyer"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:00","title":"Super Disco","venue":"O der Klub","coll":["Super Disco"],"floors":[{"f":"Main Floor","a":["TBA"]},{"f":"Orbit Floor (by PLAYBACK)","a":["PLAYBACK"]}],"genres":["Club Charts","90s","2000s"],"price":"15 € (VVK & AK)","age":"18+","tickets":"https://shop.o-klub.at/shop/registrations?event_id=1b3b0822-a8f4-4e74-9b6e-ca0835cf24c5","flyer":"https://o-klub.at/wp-content/uploads/2026/09/SD-feed-0711-V2-web.jpg","vok":1,"note":{"de":"Super Disco versteht sich als „Paralleluniversum“ statt Club: eine Themennacht auf vier Floors unter der Oper, in der man für ein paar Stunden loslassen soll. Der Main Floor spielt die größten Hits und zeitlose Klassiker, den Orbit Floor gestaltet PLAYBACK mit dem Besten aus den 90ern, 2000ern und 2010ern. Unterstützt von NOSTALGIE Österreich. Beginn 23:00, 15 € im VVK und an der Abendkasse, ab 18, Dresscode casual chic; Tischreservierung möglich.","en":"Super Disco sees itself as a 'parallel universe' rather than a club: a themed night on four floors beneath the opera where you can let go for a few hours. The Main Floor plays the biggest hits and timeless classics, while PLAYBACK hosts the Orbit Floor with the best of the 90s, 2000s and 2010s. Supported by NOSTALGIE Österreich. Starts 23:00, €15 presale and at the door, 18+, dress code casual chic; table bookings available."},"src":[["ok","https://o-klub.at/events/super-disco-64/"],["ok","https://o-klub.at/events/"]],"na":["e"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:30","title":"Klub Halal pres. Klub Palestine","venue":"FLUCC Wanne","coll":["Klub Halal","Habibi Party"],"src":[["fl","https://flucc.at/events/ipjeCW-klub-halal/"],["ra","https://ra.co/events/2552786"]],"price":"12 € VVK (FLUCC) · RA: 10/15/18 € (gestaffelt), nur Vorverkauf","tickets":"https://www.tickettailor.com/events/klubhalal/2454809","vok":1,"e":"06:00","genres":["Club","Electronica"],"floors":[{"f":"","a":["MAH MOOD","Rakans","Sherine Falasteen","MODI","Sanadrilla"]}],"age":"18+","aw":1,"lgbtq":1,"zero":1,"note":{"de":"Klub Halal präsentiert Klub Palestine in der FLUCC Wanne – eine Nacht zu Ehren queerer palästinensischer Künstler*innen, mit Solidarität auch für Sudan, Kongo, Libanon und Iran. 100 % des Gewinns gehen an fünf queere und trans palästinensische Geflüchtete in Ägypten (Wohnen, Essen, dringende Lebenskosten). Es treten auf: Drag-Artist Sherine Falasteen (aus Jerusalem, zwischen Ramallah und Brüssel), Techno-Artist Rakans aus Nazareth (Gründer von Rawmantique), DJ und Producer MAH MOOD aus Haifa (Gründer der Reihe Makhlouta), Tabla-Spieler MODI (Klub-Halal-Mitglied, live zu den DJ-Sets) und Klub-Halal-Gründerin Sanadrilla mit Arab-Pop-Edits. Awareness-Team in pinken Westen, Consent- und Filmregeln (Filmen nur auf der Bühne), null Toleranz gegen Diskriminierung, Türpolitik; nur Vorverkauf, solidarisch ermäßigte Tickets für Menschen mit wenig Geld, keine Rückerstattung außer bei Absage.","en":"Klub Halal presents Klub Palestine at FLUCC Wanne – a night honouring queer Palestinian artists, with solidarity extending to Sudan, Congo, Lebanon and Iran. 100% of profits go to five queer and trans Palestinian refugees in Egypt (housing, food, urgent living costs). Performing are drag artist Sherine Falasteen (from Jerusalem, based between Ramallah and Brussels), techno artist Rakans from Nazareth (founder of Rawmantique), Haifa-based DJ and producer MAH MOOD (founder of the Makhlouta series), tabla player MODI (Klub Halal member, live during the DJ sets) and Klub Halal founder Sanadrilla with Arab pop edits. Awareness team in pink vests, consent and filming rules (filming only on stage), zero tolerance for discrimination, door policy; presale only, community-supported reduced tickets for those on low incomes, no refunds unless cancelled."},"flyer":"https://images.ra.co/0f42345c1bcd19a268bc9b9524f3983e4ba7e043.jpg","chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-08","s":"06:00","e":"11:00","title":"Morgengymnastik","venue":"SASS Music Club","floors":[{"f":"","a":["Thomas Grün","Ulfersson"]}],"price":"15 €","age":"18+","aw":1,"vok":1,"note":{"de":"Die Sonntags-Afterhour Morgengymnastik im SASS (06:00–11:00) steht diesmal unter dem Motto „Making House Great Again“: Zwei befreundete DJs spielen Vinyl-Sets, um den Sonntag in Gang zu bringen. Thomas Grün, bekannt aus dem Club Pompadour, kehrt nach einer kreativen Pause hinter die Decks zurück. Ulfersson betreibt Vibrant.vie und ist eine feste Größe der Wiener House-Szene. Eintritt 15 €, ab 18 mit Ausweiskontrolle, Awareness-Team vor Ort.","en":"SASS's Sunday afterhour Morgengymnastik (06:00–11:00) runs under the motto 'Making House Great Again' this time: two friends play vinyl sets to get Sunday going. Thomas Grün, known from Club Pompadour, returns behind the decks after a creative break. Ulfersson runs Vibrant.vie and is an established part of Vienna's house scene. Entry €15, 18+ with ID check, awareness team on site."},"src":[["sa","https://sassvienna.com/en/events/event/morgengymnastik-172"],["sa","https://sassvienna.com/en/events"]],"na":["flyer","genres"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-08","s":"20:00","e":"23:45","title":"Sonntag'sdisco Vol. 28 w/ The Res","venue":"FLUCC Deck","floors":[{"f":"Deck","a":["The Res","Drehli Robnik"]}],"note":{"de":"Die 28. Sonntag'sdisco auf dem FLUCC Deck bringt The Res live auf die Bühne. Davor und danach legt Drehli Robnik „viele seiner Platten“ auf. 20:00–23:45, nur Abendkasse, Preis noch nicht bekannt; eine Musikrichtung nennt das FLUCC nicht.","en":"The 28th Sonntag'sdisco on the FLUCC Deck brings The Res live on stage. Before and after, Drehli Robnik plays 'many of his records'. 20:00–23:45, door sales only, price not yet announced; FLUCC does not name a music style."},"src":[["fl","https://flucc.at/events/f9RAFs-sonntag-sdisco-081126/"]],"vok":1,"price":"tba (nur AK)","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/081126_Sonntagsdisco_28_FLUCC_Deck.max-2560x1440.jpg","head":["The Res"],"na":["genres","age"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-11","s":"21:00","e":"04:00","title":"Köstlich x Gürtelgroove","venue":"Club Lucia","coll":["Köstlich","Gürtelgroove"],"genres":["UK Garage","Hardgroove","Techno"],"floors":[{"f":"","a":["POSTSCRIPTUM","FESH","Adam19","Antone b2b Dudas","Chris Eru b2b Mahofsky"]}],"price":"free (Spenden willkommen)","flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/2026-11-11-guertelgroove_koestlich_1080-x-1350.jpeg","note":{"de":"Die Kollektive Köstlich und Gürtelgroove teilen sich einen Mittwochabend im Club Lucia, angekündigt als Nacht voller Groove und Rhythmus mit UKG, Hardgroove und Techno. Von Köstlich spielen POSTSCRIPTUM, FESH sowie Chris Eru b2b Mahofsky, von Gürtelgroove Antone b2b Dudas. Dazu kommt Adam19 vom Kollektiv FIFI. Der Eintritt ist frei, Spenden sind willkommen. Die Veranstalter halten fest: kein Platz für Rassismus, Sexismus, Faschismus oder andere Formen von Hass und Gewalt.","en":"The collectives Köstlich and Gürtelgroove share a Wednesday night at Club Lucia, billed as a night driven by groove and rhythm with UKG, hardgroove and techno. Köstlich brings POSTSCRIPTUM, FESH and Chris Eru b2b Mahofsky, Gürtelgroove brings Antone b2b Dudas. Adam19 of the FIFI collective joins them. Entry is free, donations welcome. The organisers state there is no room for racism, sexism, fascism or any other form of hate or violence."},"vok":1,"src":[["cl","https://www.clublucia.at/event/kostlich-x-gurtelgroove/"]],"chk":"2026-10-30"},
{"d":"2026-11-11","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Der wöchentliche Rave am Mittwoch (RAM) im Werk unter dem Motto „Recharge Wednesdays“ – laut Veranstalter jede Woche harte Beats und lange Nächte. Beginn 23 Uhr; der Eintritt erfolgt in den bisherigen Ausgaben gegen freiwillige Spende, ein Dresscode existiert nicht. Ein Awareness-Team ist vor Ort. Das Line-up dieser Ausgabe ist noch nicht veröffentlicht.","en":"The weekly Rave am Mittwoch (RAM) at Das Werk under the motto 'Recharge Wednesdays' – heavy beats and long nights every week, according to the organisers. Starts at 23:00; previous editions had free entry with a voluntary donation and no dress code. An awareness team is present. The line-up for this edition has not been published yet."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}],"na":["price","e","flyer","tickets"],"chk":"2026-10-31"},
{"d":"2026-11-12","s":"19:00","e":"23:00","title":"sama recordings pres. s c h w e b e n","venue":"kv.r.","coll":["sama recordings"],"genres":["Experimental","Electronica"],"floors":[{"f":"","a":["Philipp Otterbach","Adina Camhy","Andrea Ida"]}],"price":"16,95–22,60 € (Regular/Supporter)","age":"18+","tickets":"https://kupfticket.com/en/shops/samarecordings","note":{"de":"s c h w e b e n ist die seit 2020 laufende Reihe von sama recordings zwischen Avantgarde-Pop, elektronischer Clubmusik und Experiment. Der deutsche Produzent, DJ und Remixer Philipp Otterbach zeigt bei seiner Wien-Premiere ein neu entwickeltes Live-Set mit ambienten Klanglandschaften. Adina Camhy (AT) spielt live mit Field Recordings, Kirchenorgel-Improvisationen und Stimme zwischen Noise, Ambient, Drone und Industrial; ihr Album „krst“ erschien 2025 bei smallforms. Andrea Ida (AT), Musikerin und Moderatorin bei Noods Radio (Bristol), legt ein DJ-Set auf. Es gilt ein Verhaltenskodex gegen Diskriminierung, Belästigung kann per E-Mail oder beim Team vor Ort gemeldet werden; Tickets als Regular oder Supporter (Soli-Aufpreis).","en":"s c h w e b e n is sama recordings' series, running since 2020, between avant-pop, electronic club music and experimental sounds. German producer, DJ and remixer Philipp Otterbach makes his Vienna debut with a newly developed live set of ambient soundscapes. Adina Camhy (AT) performs live with field recordings, church organ improvisation and voice, spanning noise, ambient, drone and industrial; her album \"krst\" came out on smallforms in 2025. Andrea Ida (AT), musician and host on Noods Radio (Bristol), plays a DJ set. A code of conduct against discrimination applies, harassment can be reported by email or to the team on site; tickets come as Regular or Supporter (solidarity surcharge)."},"src":[["ra","https://ra.co/events/2564492"]],"aw":1,"flyer":"https://images.ra.co/d0f6f204ba374cf91e61477d0a014d2b9cbee36d.jpg","chk":"2026-10-30"},
{"d":"2026-11-12","s":"23:00","e":"06:00","title":"Donnerstag Nacht × Green Light Collective","venue":"SASS Music Club","floors":[{"f":"","a":["Grenco","Andreas","Ian Staraj","Andrija Mlacovic"]}],"vok":1,"note":{"de":"Donnerstag Nacht im SASS Music Club mit dem Green Light Collective, das zuvor bei Radio Rudina in Wien zu Gast ist und danach ins SASS weiterzieht. Es spielen Grenco, Andreas, Ian Staraj und Andrija Mlacovic. Der Eintritt beträgt regulär 10–15 € inklusive Willkommensgetränk, für Studierende 0–5 €. Wie alle SASS-Veranstaltungen wird der Abend von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Thursday night at SASS Music Club with the Green Light Collective, who first guest at Radio Rudina in Vienna and then move on to SASS. Grenco, Andreas, Ian Staraj and Andrija Mlacovic play. Regular entry is 10–15 € including a welcome drink, students 0–5 €. As at all SASS events, an awareness team is present; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/donnerstag-nacht-55"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/donnerstag-nacht-55","srcChk":"2026-10-30","price":"10–15 € / Studierende 0–5 €","age":"18+","coll":["Green Light Collective"],"chk":"2026-10-31"},
{"d":"2026-11-13","s":"20:00","title":"Queertactics Festival Party","venue":"FLUCC Deck","coll":["Queertactics"],"lgbtq":1,"src":[["fl","https://flucc.at/events/H7HuvP-queertactics-festival-party/"]],"vok":1,"floors":[{"f":"","a":["TBA"]}],"note":{"de":"Party im Rahmen des Queertactics Festivals auf dem FLUCC Deck, Beginn 20:00. Die FLUCC-Seite nennt bisher weder Lineup noch Preis, Ende oder Flyer. Weitere Details sollen folgen.","en":"Party as part of the Queertactics Festival on the FLUCC Deck, starting 20:00. The FLUCC page does not yet list a lineup, price, end time or flyer. Further details are still to come."},"chk":"2026-10-30"},
{"d":"2026-11-13","s":"21:00","e":"02:00","title":"50 Herz / Sodomland","venue":"Kollektiv Kaorle","coll":["50 Herz"],"genres":["Electro","Industrial"],"floors":[{"f":"","a":["Sodomland","Kilroy","Gush Valley","Darina","Djinn Sylva","Xavior"]}],"price":"€15–20 (Soli €15 / Standard €18 / Supporter €20)","age":"18+","tickets":"https://shop.copilot.events/kaorle/events/ecc24459-e741-4ab7-9c18-851c22f5783c","note":{"de":"50 Herz feiert Freitag den 13. als „Doomsday“-Party mit lauter, basslastiger Elektronik im Kollektiv Kaorle am Otto-Wagner-Areal (Pavillon 21). Hauptact ist das Berliner Duo Sodomland. Kilroy eröffnet solo, danach folgen Gush Valley und Darina, außerdem präsentieren Darina & Djinn Sylva live ihre neue EP. Xavior spielt das Closing-Set. Beginn laut RA 20:00, laut Ticketshop der Location 21:00; Ende 02:00, Tickets 15–20 € (Soli/Standard/Supporter), ab 18.","en":"50 Herz marks Friday the 13th with a \"Doomsday\" party of loud, bass-heavy electronics at Kollektiv Kaorle on the Otto Wagner grounds (Pavilion 21). The main act is Berlin duo Sodomland. Kilroy opens solo, followed by Gush Valley and Darina, and Darina & Djinn Sylva premiere their new EP live. Xavior plays the closing set. Start is 20:00 per RA and 21:00 per the venue's ticket shop; ends 02:00, tickets €15–20 (solidarity/standard/supporter), 18+."},"src":[["ra","https://ra.co/events/2555979"],["ka","https://shop.copilot.events/kaorle/events/ecc24459-e741-4ab7-9c18-851c22f5783c"]],"vok":1,"head":["Sodomland"],"flyer":"https://images.ra.co/7e8053f2e7ac555f2bbd2875d19ed29851ceede6.jpg","chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","title":"Zuckerwatt w/ MIJA","venue":"Grelle Forelle","coll":["Zuckerwatt","Cybertribe"],"genres":["Hardgroove","House","Techno","Hardcore"],"floors":[{"f":"Mainfloor","a":["MIJA","PartyPauli","Who is Ela¿"]},{"f":"Kitchen (Cybertribe)","a":["DJ Backstage","ENJA","Spud Bencer","Voltmarie"]}],"tickets":"https://zuckerwatt.ticket.io/lrReXJvU/","note":{"de":"Zuckerwatt holt MIJA in die Grelle Forelle; die US-Künstlerin („Born to chill, forced to DJ“) ist eine vielseitige Multidisziplin-Artist und betreibt das DIY-Label Never B Alone, dessen Releases die Artists gemeinsam auswählen. Ihre EPs „Summer Groove“ und „Soft Groove“ verbinden Hardgroove mit House, Techno und Funk. Am Mainfloor spielen außerdem PartyPauli und Who is Ela¿. Die Kitchen wird von Cybertribe gehostet mit DJ Backstage, ENJA, Spud Bencer und Voltmarie. Einlass und Abendkassa ab 23:00, Vorverkauf über ticket.io.","en":"Zuckerwatt brings MIJA to Grelle Forelle; the US artist (\"Born to chill, forced to DJ\") is a versatile multidisciplinary artist who runs the DIY label Never B Alone, whose releases are chosen collectively by its artists. Her EPs \"Summer Groove\" and \"Soft Groove\" blend hardgroove with house, techno and funk. PartyPauli and Who is Ela¿ also play the main floor. The Kitchen is hosted by Cybertribe with DJ Backstage, ENJA, Spud Bencer and Voltmarie. Doors and box office from 23:00, presale via ticket.io."},"src":[["rg","https://www.regioactive.de/party/zuckerwatt-w-mija-grelle-forelle-wien-2026-11-13-By44sRL5ck"],["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/1311-zuckerwatt-w-mija/"]],"e":"06:00","vok":1,"flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/08/zuckerwatt_131126.jpg","head":["MIJA"],"na":["price"],"chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","title":"deep cut × Dark Pressure","venue":"FLUCC Wanne","coll":["deep cut","Dark Pressure"],"genres":["Hypnotic Techno","Deep Techno","Techno","Experimental"],"floors":[{"f":"Wanne","a":["23:00|Alex Maurer","00:45|Aura","02:15|Oxygeno","04:15|Melimeko"]}],"src":[["fl","https://flucc.at/events/PcWCsy-deep-cut/"],["ra","https://ra.co/events/2561302"],["fl","https://flucc.at/"],["ft","https://frey-tag.at/kalender/deep-cut?s=Rm19NuOSv"]],"e":"06:00","price":"15 € VVK / 18 € AK","tickets":"https://ra.co/events/2561302","vok":1,"age":"18+","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/13.11.2026_DeepCutDarkPressure_Wanne_MartinD.max-2560x1440.jpg","note":{"de":"deep cut und Dark Pressure präsentieren eine Nacht mit hypnotischem und deepem Techno in der FLUCC Wanne. Hauptgast ist Oxygeno aus Spanien, der rohe, emotionale Produktionen u. a. auf Mord, Axis, Semantica, Non Series und Soma veröffentlicht hat, das Label Lost Verses betreibt und international neben Jeff Mills, Oscar Mulero und Ø [Phase] spielte. Alex Maurer (Turbo) eröffnet um 23:00, um 00:45 feiert Aura Premiere, das dawless Live-Projekt von Dcascallana und pezel. Oxygeno spielt ab 02:15, Melimeko (RAW Session) schließt von 04:15 bis 06:00. Tickets 15 € im VVK, 18 € an der Abendkasse; Flyer-Artwork von Martin Daxinger. frey-tag.at führt das Event abweichend im Kramladen; flucc.at nennt die FLUCC Wanne.","en":"deep cut and Dark Pressure present a night of hypnotic and deep techno in the FLUCC Wanne. The main guest is Spain's Oxygeno, whose raw, emotional productions have appeared on Mord, Axis, Semantica, Non Series and Soma; he runs the label Lost Verses and has played internationally alongside Jeff Mills, Oscar Mulero and Ø [Phase]. Alex Maurer (Turbo) opens at 23:00, and at 00:45 Aura premieres, the dawless live project of Dcascallana and pezel. Oxygeno plays from 02:15, Melimeko (RAW Session) closes from 04:15 to 06:00. Tickets €15 presale, €18 at the door; flyer artwork by Martin Daxinger. frey-tag.at lists the event at Kramladen instead; flucc.at names FLUCC Wanne."},"chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","title":"Dystopia","venue":"Das Werk","coll":["Dystopia Rave"],"note":{"de":"Dystopia-Rave im Werk; Line-up noch nicht veröffentlicht.","en":"Dystopia rave at Das Werk; line-up not yet published."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}],"na":["price","e","flyer","tickets"],"chk":"2026-10-31"},
{"d":"2026-11-13","s":"23:00","e":"06:00","title":"Fatima Hajji","venue":"O der Klub","coll":["SIGNAL"],"genres":["Techno","Tribal Techno"],"floors":[{"f":"","a":["Fatima Hajji"]}],"price":"ab 12 €","tickets":"https://shop.o-klub.at/shop/registrations?event_id=bea6d6f5-42f5-44be-b50f-368093b3214a","flyer":"https://o-klub.at/wp-content/uploads/2026/09/Fatima_feed-web.jpg","note":{"de":"SIGNAL präsentiert die in Spanien geborene DJ Fatima Hajji mit arabischen Wurzeln, deren Sound kraftvolle Tribal-Grooves mit energiegeladenem modernem Techno verbindet. Sie legte mit 16 erstmals auf und spielte zu Spitzenzeiten über 120 Shows pro Jahr. Auftritte führten sie u. a. zu Awakenings, Verknipt, Monegros, Medusa und Time Warp Spain sowie in Clubs wie Tresor Berlin, Fabric London und Amnesia Ibiza. 2023 startete sie ihre Reihe „Fatima Hajji Invites“ mit einem ausverkauften All-Night-Long im Fabrik Madrid. Beginn 23:00, Tickets ab 12 €, Dresscode casual.","en":"SIGNAL presents Spanish-born DJ Fatima Hajji, of Arab heritage, whose sound fuses powerful tribal grooves with high-energy modern techno. She first played at 16 and at her peak played more than 120 shows a year. She has appeared at Awakenings, Verknipt, Monegros, Medusa and Time Warp Spain, and in clubs such as Tresor Berlin, Fabric London and Amnesia Ibiza. In 2023 she launched her series \"Fatima Hajji Invites\" with a sold-out all-night-long at Fabrik Madrid. Starts 23:00, tickets from €12, dress code casual."},"vok":1,"src":[["ok","https://o-klub.at/events/fatima-hajji/"],["ra","https://ra.co/events/2528245"]],"age":"18+","head":["Fatima Hajji"],"chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","title":"Rudebwoy Embassy meets Bassclub – 30 Years Jah Power Sound","venue":"The Loft","coll":["Bassclub","Rude Bwoy Embassy","Jah Power Sound"],"genres":["Drum & Bass","Dubstep","Grime","UK Bass","Breaks","Jungle","Reggae","Dancehall","Dub"],"floors":[{"f":"Oben (Bassclub)","a":["Pezo Fox b2b Mantis","Stoney Curtis b2b Zuzee","Scooby Duo"]},{"f":"Unten (Jah Power Sound / Rude Bwoy Embassy)","a":["Dicie Globie","Sparky Rugged","Astarr","Ijahson","Bandulu","Camel","DJ Smo","Baba Sound","Kings Crown Sound","Thr33lake","Jah Power Sound","Royal Marx Sound","G Spot Sound"]}],"price":"10 € bis 24:00, danach 15 € / Ladies free bis 24:00","flyer":"https://www.theloft.at/wp-content/uploads/2026/10/image00002-scaled.jpeg","note":{"de":"Rudebwoy Embassy und Bassclub feiern 30 Jahre Jah Power Sound und damit jamaikanische Soundsystem-Kultur in Österreich, mit 13 DJs und 6 Live-Acts auf zwei Floors. Oben übernimmt Bassclub mit Drum & Bass, Dubstep, Grime, UK Bass, Breaks, Jungle und HipHop: Pezo Fox b2b Mantis, Stoney Curtis b2b Zuzee, Scooby Duo und angekündigte Special Acts. Unten gehört die Bühne Jah Power Sound mit Reggae, Dancehall und Dub: live Dicie Globie, Sparky Rugged, Astarr, Ijahson, Bandulu und Camel. An den Decks unten stehen DJ Smo, Baba Sound, Kings Crown Sound, Thr33lake, Jah Power Sound, Royal Marx Sound und G Spot Sound. Beginn 23:00; 10 € bis Mitternacht, danach 15 €, Frauen bis Mitternacht gratis.","en":"Rudebwoy Embassy and Bassclub celebrate 30 years of Jah Power Sound and Jamaican sound-system culture in Austria, with 13 DJs and 6 live acts on two floors. Upstairs Bassclub plays drum & bass, dubstep, grime, UK bass, breaks, jungle and hip-hop: Pezo Fox b2b Mantis, Stoney Curtis b2b Zuzee, Scooby Duo and announced special acts. Downstairs belongs to Jah Power Sound with reggae, dancehall and dub: live acts Dicie Globie, Sparky Rugged, Astarr, Ijahson, Bandulu and Camel. On the decks downstairs are DJ Smo, Baba Sound, Kings Crown Sound, Thr33lake, Jah Power Sound, Royal Marx Sound and G Spot Sound. Starts 23:00; €10 until midnight, €15 after, ladies free until midnight."},"vok":1,"src":[["lo","https://www.theloft.at/rudebwoy-embassy-meets-bassclub-30-years-jah-power-sound/"]],"chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","e":"06:00","title":"HERZZZ","venue":"SASS Music Club","floors":[{"f":"","a":["Anni Herzer","Felix Rupprecht","Julani"]}],"vok":1,"price":"10–15 €","age":"18+","aw":1,"note":{"de":"HERZZZ im SASS Music Club (23:00–06:00 Uhr) mit Anni Herzer, Felix Rupprecht und Julani. Einen Beschreibungstext oder Set-Zeiten veröffentlicht der Club bisher nicht. Eintritt 10–15 € inkl. Welcome Drink, ab 18 mit Ausweiskontrolle; wie bei allen SASS-Events ist ein Awareness-Team vor Ort.","en":"HERZZZ at SASS Music Club (23:00–06:00) with Anni Herzer, Felix Rupprecht and Julani. The club has not yet published a description or set times. Entry €10–15 incl. welcome drink, 18+ with ID check; as at all SASS events an awareness team is present."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/herzzz-november"]],"na":["flyer","genres","tickets"],"chk":"2026-10-30","srcChk":"2026-10-30","coll":["HERZZZ"]},
{"d":"2026-11-13","s":"23:00","title":"TUFF vol. 2","venue":"Club Exil","coll":["TUFF"],"genres":["Bounce","Hardbounce"],"floors":[{"f":"","a":["Barbara Lago","KRL MX","NYRA","Pinklotion","Serafin"]}],"price":"Early Bird 11 €","tickets":"https://exil.ticket.io/nDYvo6wD/","note":{"de":"TUFF, nach eigener Beschreibung „Viennas bounce hub“, geht im Club Exil in die zweite Runde – Motto: „Hard. Fast. TUFF.“ Es spielen Barbara Lago, KRL MX, NYRA, Pinklotion und Serafin. Es gilt eine No-Photo-Policy.","en":"TUFF, self-described as Vienna's bounce hub, returns to Club Exil for its second edition under the motto 'Hard. Fast. TUFF.' Barbara Lago, KRL MX, NYRA, Pinklotion and Serafin play. A no-photo policy applies."},"nophoto":1,"vok":1,"na":["e","flyer","age"],"src":[["ex","https://club-exil.at/"],["exi","https://exil.ticket.io/nDYvo6wD/"]],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-13","s":"23:55","e":"05:00","title":"Drum & Bassick x Radiance","venue":"Club Lucia","coll":["Drum & Bassick","Radiance"],"genres":["Drum & Bass","Neurofunk","Liquid"],"floors":[{"f":"","a":["Dave & Bass b2b Cybercutz","Escapism","I-Jin","Synthesis","Vibrant"]}],"price":"10 € (AK)","flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/Flyer_Lucia_11_2026_1_v009-scaled-e1792496286337.png","note":{"de":"Die Reihen Drum & Bassick und Radiance tun sich im Club Lucia zusammen, um das ganze Spektrum von Drum & Bass auf einen Floor zu bringen. Sechs lokale DJs decken alles von Neurofunk bis Liquid ab: Dave & Bass b2b Cybercutz, Escapism, I-Jin, Synthesis und Vibrant. Angekündigt ist außerdem ein B2B, das „no one’s ever done before“, Details verraten die Veranstalter nicht. Beginn 23:55, Ende 05:00, Eintritt 10 € an der Abendkasse.","en":"The Drum & Bassick and Radiance series join forces at Club Lucia to bring the whole spectrum of drum & bass to one floor. Six local DJs cover everything from neurofunk to liquid: Dave & Bass b2b Cybercutz, Escapism, I-Jin, Synthesis and Vibrant. A surprise b2b \"no one's ever done before\" is also announced, with no further details. Starts 23:55, ends 05:00, €10 at the door."},"vok":1,"src":[["cl","https://www.clublucia.at/event/drum-bassick-x-radiance/"]],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"17:00","e":"06:00","title":"Once in a Blue Moon – Kiki Ball + Afterparty","venue":"Funkhaus","coll":["Kaisa Bodega","Pingpaya Fenty Savage"],"genres":["House","Ballroom"],"floors":[{"f":"","a":["Gawdesque","Amina Malounadou","Bellavie"]}],"age":"18+","tickets":"https://ra.co/events/2546333","src":[["ra","https://ra.co/events/2546333"]],"flyer":"https://images.ra.co/d202d6de45984699ab2ae40c9b678a7be40a87eb.png","note":{"de":"Kaisa Bodega und Pingpaya Fenty Savage präsentieren einen Kiki Ball mit anschließender Afterparty im Funkhaus. Angekündigt ist eine Ballroom-Nacht voller Glamour, Fantasie und Verwandlung, in der Gäste ihre seltensten Seiten zeigen sollen – etwas, das nur „once in a blue moon“ passiert. Genannt sind Gawdesque, Amina Malounadou und Bellavie; Kategorien, Hosts, Judges und Ablauf stehen noch nicht fest. Beginn 17:00, Ende 06:00, ab 18.","en":"Kaisa Bodega and Pingpaya Fenty Savage present a kiki ball followed by an afterparty at Funkhaus. It is billed as a ballroom night of glamour, fantasy and transformation where guests show their rarest sides, something that happens only once in a blue moon. Gawdesque, Amina Malounadou and Bellavie are listed; categories, hosts, judges and running order are not yet published. Starts 17:00, ends 06:00, 18+."},"chk":"2026-10-30"},
{"age":"18+","d":"2026-11-14","s":"19:00","title":"NTO live","venue":"O der Klub","genres":["Techno","Melodic Techno"],"floors":[{"f":"","a":["NTO"]}],"tickets":"https://wype.ticketlodge.de/14112026-NTOliveVienna/","src":[["ci","https://cityineurope.com/event/cmugr7bxv0036d8dvhfgizmtd"],["ok","https://o-klub.at/events/nto-live-in-concert/"],["ra","https://ra.co/events/2423044"]],"vok":1,"price":"ab 25 €","flyer":"https://o-klub.at/wp-content/uploads/2026/07/NTO_Tour_2026_Wien_14112026_PostingForADs_1080x1350px.jpg","e":"23:00","note":{"de":"Der französische Produzent NTO macht mit seiner neuen Live-Tour Station im O der Klub. Er spielt melodischen Techno mit emotionaler Tiefe, darunter neue, unveröffentlichte Tracks seines kommenden Albums. Die Show ist als Mischung aus Konzert und Club mit treibenden Beats und filmischen Klangflächen angelegt. Beginn 19:00, Tickets ab 25 € über ticketlodge; Support und Set-Zeiten sind nicht genannt.","en":"French producer NTO brings his new live tour to O der Klub. He plays melodic techno with emotional depth, including new unreleased tracks from his upcoming album. The show is pitched as a mix of concert and club night with driving beats and cinematic soundscapes. Starts 19:00, tickets from €25 via ticketlodge; support acts and set times are not announced."},"head":["NTO"],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"19:30","e":"23:30","title":"HEAVY LISTENING with Kobermann, MPU101 & Electric Indigo","venue":"Westbahn Studios","coll":["VLAN"],"genres":["Experimental","Dub Techno","Ambient"],"floors":[{"f":"","a":["20:00|Kobermann","21:00|MPU101","22:00|Electric Indigo"]}],"price":"15 €","age":"18+","note":{"de":"Dritte Ausgabe von HEAVY LISTENING, präsentiert von VLAN: eine Reihe, die Ambient, New Age, Dub, Downtempo, Tribal und experimentelle Elektronik als Gegenpol zu schnellen Rhythmen und Kurzvideo-Kultur ins Zentrum stellt. Kobermann (Johannes Piller, Wien), seit 2014 zwischen Lo-fi, Post-Punk und Dub aktiv und Betreiber von A.T.C. Records, eröffnet um 20:00 mit einem DJ-Set. Um 21:00 spielt MPU101 live, eng mit dem Münchner Label Ilian Tape verbunden und zuletzt mit Field Recordings aus abgelegenen Gegenden der USA beschäftigt. Ab 22:00 folgt Electric Indigo (Susanne Kirchmayr, Wien) live, seit 1989 international aktiv, Gründerin des Netzwerks female:pressure und Trägerin des Österreichischen Kunstpreises für Musik 2020. Einlass 19:30, Ende 23:30, 15 €, ab 18; Ort Westbahn Studios (genaue Adresse TBA), unterstützt von Stadt Wien/MA 7.","en":"Third edition of HEAVY LISTENING, presented by VLAN: a series that puts ambient, new age, dub, downtempo, tribal and experimental electronics at the centre as a counterweight to fast rhythms and short-video culture. Kobermann (Johannes Piller, Vienna), active since 2014 between lo-fi, post-punk and dub and running A.T.C. Records, opens with a DJ set at 20:00. At 21:00 MPU101 plays live, closely tied to Munich label Ilian Tape and lately working with field recordings from remote parts of the USA. From 22:00 Electric Indigo (Susanne Kirchmayr, Vienna) performs live, internationally active since 1989, founder of the female:pressure network and recipient of Austria's Art Prize for Music in 2020. Doors 19:30, ends 23:30, €15, 18+; venue Westbahn Studios (exact address TBA), supported by the City of Vienna/MA 7."},"src":[["ra","https://ra.co/events/2568237"]],"flyer":"https://images.ra.co/e3eba3bc39742ae417a9d1b8864d0251523fd505.jpg","chk":"2026-10-30"},
{"d":"2026-11-14","s":"20:00","e":"04:00","title":"STRICT! The Dark Circus","venue":"Libelle","coll":["STRICT!"],"sexpos":1,"src":[["sp","https://sexpositives.com/en/events/strict-dark-circus-wien-2026-11-14/"],["li","https://www.libelle.at/events/dark-circus-hosted-by-strict-3/"]],"nophoto":1,"aw":1,"note":{"de":"STRICT! lädt zur Play-Party „The Dark Circus“ in die Libelle; ausdrücklich keine Tanzparty oder Rave, sondern ein Abend mit Ringmasters, Dompteur*innen, Freaks, Dark Clowns, Akrobat*innen und Burlesque-Performances. Teilnahme nur mit Voranmeldung per E-Mail an submit@strict.events (Name laut Ausweis, Alter, Geschlechtsidentität, Bestätigung des Verhaltenskodex, Safeword und kurzes Motivationsschreiben), Eintritt 30 €, ab 21. Dresscode Fetisch/Theaterkostüm (Latex, Leder, Korsagen, Samt u. Ä.); keine Streetwear, Anzüge oder bloße Nacktheit, Straßenschuhe bleiben am Eingang, saubere Innenschuhe mitbringen. Es gelten Konsens, Drogenverbot und Safer-Sex-Regeln, ein Safeguarding-Team ist da, das Safeword „Elephant“ alarmiert sofort das Personal. Fotos, Filmen und Smart Glasses sind verboten, Handys nur im Eingangsbereich; Einlass 20–23 Uhr, Ende 04:00.","en":"STRICT! hosts the play party \"The Dark Circus\" at Libelle; explicitly not a dance party or rave, but a night with ringmasters, animal tamers, freaks, dark clowns, acrobats and burlesque performances. Entry only with prior registration by email to submit@strict.events (name as on ID, age, gender identity, confirmation of the code of conduct, safeword and a short motivation letter), €30, 21+. Dress code fetish/theatrical (latex, leather, corsets, velvet etc.); no streetwear, suits or plain nudity, street shoes stay at the entrance, bring clean indoor shoes. Consent, a no-drugs policy and safer-sex rules apply, a safeguarding team is present and the safeword \"Elephant\" alerts staff immediately. Photos, filming and smart glasses are banned, phones only in the entrance hall; admission 20:00–23:00, ends 04:00."},"price":"€30","age":"21+","vok":1,"flyer":"https://www.libelle.at/wp-content/uploads/2026/04/DC-Web-1-e1790883481870.jpg","na":["lineup","tickets"],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"22:00","title":"RAVE ON XXL 4.0","venue":"Club Exil","coll":["Rave On Vienna"],"floors":[{"f":"","a":["Dune","Neophyte","Maissouille","Radze","Toge","Miss Pixie aka Tekniker","Genetek","Apocalypz","The Rave Bear","Klaut-G","Veneno","SYC","Gingertek","Auditore","Brandix","Se.Vero","Gosh","Fullip","Poison","Para2P3ctrum","Louisa India","Kandy","MATIVIO"]}],"head":["Dune","Neophyte"],"price":"34,90 € (Final Phase; günstigere Stufen ausverkauft)","tickets":"https://sunmoon.ticket.io/ObeGEC9z/","note":{"de":"Die vierte XXL-Ausgabe der Reihe Rave On, veranstaltet von Sun & Moon Event, belegt den Club Exil mit einem großen Line-up aus rund zwei Dutzend Acts, darunter Dune und Neophyte sowie u. a. Miss Pixie aka Tekniker, Apocalypz, Veneno und Mativio. Einlass ab 22:00. Alle günstigeren Ticketstufen sind bereits ausverkauft.","en":"The fourth XXL edition of the Rave On series, run by Sun & Moon Event, takes over Club Exil with a line-up of around two dozen acts, including Dune and Neophyte plus Miss Pixie aka Tekniker, Apocalypz, Veneno and Mativio among others. Doors at 22:00. All cheaper ticket tiers are already sold out."},"vok":1,"ook":1,"na":["e","flyer","genres","age"],"src":[["ex","https://club-exil.at/"],["smt","https://sunmoon.ticket.io/ObeGEC9z/"]],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-14","title":"Herzfrequenz: Herzi F2F Edition","venue":"Das Werk","coll":["Herzfrequenz"],"floors":[{"f":"","a":["Joey"]}],"src":[["ev","https://events.at/event/herzfrequenz-herzi-f2f-edition"],["dw","https://www.daswerk.org/program"]],"s":"23:00","tickets":"https://www.oeticket.com/noapp/eventseries/herzfrequenz-herzi-f2f-edition-4269996/","note":{"de":"Herzfrequenz lädt zur „Herzi F2F Edition“ ins Werk. events.at nennt ein Lineup, Preise oder eine Erklärung von „F2F“ bisher nicht; Tickets gibt es über oeticket. Datum laut events.at und oeticket 14.11. (RA nannte zuvor 13.11.); events.at gibt 23:00–01:00 an, was für eine Clubnacht im Werk ungewöhnlich kurz ist.","en":"Herzfrequenz hosts its \"Herzi F2F Edition\" at Das Werk. events.at does not yet list a lineup, prices or what \"F2F\" stands for; tickets are sold via oeticket. Date per events.at and oeticket is 14 Nov (RA previously said 13 Nov); events.at gives 23:00–01:00, which is unusually short for a club night at Das Werk."},"vok":1,"chk":"2026-10-30"},
{"d":"2026-11-14","s":"23:00","e":"06:00","title":"Paradies Garten w/ Paraçek","venue":"Grelle Forelle","coll":["Paradies Garten"],"price":"ab 19 €","floors":[{"f":"Mainfloor","a":["Paraçek","MARØ","Vivienna"]},{"f":"Kitchen","a":["Felix Rupprecht","Mariephi","Manuel Correa b2b Sora"]}],"src":[["rg","https://www.regioactive.de/party/paradies-garten-w-paracek-grelle-forelle-wien-2026-11-14-JVJJnmCzgx"],["ft","https://frey-tag.at/kalender/paradies-garten?s=T6P9XH1YS"],["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/1411-paradies-garten-w-paracek/"],["ra","https://ra.co/events/2556704"]],"genres":["Bounce","Hard Dance","Trance","Acid","House"],"vok":1,"tickets":"https://shop.paylogic.com/59cda0d6cec840928ec3ce1afa3e8b22/","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/paradiesgarten_141126_web.jpg","note":{"de":"Paradies Garten kehrt nach dem Sommer in die Grelle Forelle zurück, mit einem durchgehend energiegeladenen Lineup. Headliner Paraçek aus Deutschland kommt aus der Free-Rave-Szene von Leipzig und Dresden und verbindet schnellen Hard Dance mit 90er-Trance und Acid-Rave, eingängigen Vocals, euphorischen Synths und kräftigen Basslines. Am Mainfloor spielen außerdem MARØ und Vivienna. In der Kitchen legen Felix Rupprecht, Mariephi sowie Manuel Correa b2b Sora auf. Einlass und Abendkassa ab 23:00, Vorverkauf über Paylogic; RA nennt 18+, Hausregel der Location ist 21+.","en":"Paradies Garten returns to Grelle Forelle after the summer with a high-energy lineup from start to finish. Headliner Paraçek from Germany comes out of the Leipzig and Dresden free-rave scene and blends fast hard dance with 90s trance and acid rave, catchy vocals, euphoric synths and heavy basslines. MARØ and Vivienna also play the main floor. In the Kitchen, Felix Rupprecht, Mariephi and Manuel Correa b2b Sora are on the decks. Doors and box office from 23:00, presale via Paylogic; RA says 18+, the venue's house rule is 21+."},"head":["Paraçek"],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"23:00","title":"Fifi x Schrödinger's Groove","venue":"FLUCC Wanne","coll":["Fifi","Schrödingers Groove"],"note":{"de":"Gemeinsame Clubnacht der Kollektive Fifi und Schrödinger's Groove in der FLUCC Wanne, Beginn 23:00. Die FLUCC-Seite nennt bisher weder Lineup noch Preis, Ende oder Flyer. Details sollen noch folgen.","en":"Joint club night by the collectives Fifi and Schrödinger's Groove in the FLUCC Wanne, starting 23:00. The FLUCC page does not yet list a lineup, price, end time or flyer. Details are still to come."},"vok":1,"src":[["fl","https://flucc.at/events/X3Fef2-fifi-x-schrodinger-s-groove/"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"23:00","title":"The Hive","venue":"Flex","coll":["The Hive"],"note":{"de":"Neue Ausgabe der Drum-&-Bass-Reihe The Hive, gemeinsam veranstaltet von The Hive und Collapse im Flex. Ganz oben auf dem Lineup steht Ed Rush aus Großbritannien, dazu Waeys aus den Niederlanden und Wingz aus Österreich. Lokal ergänzen Inaya, Scapula & Weazl, Sinis b2b Mayez und 5HA5H. Einlass 23:00, ab 16; VVK über Tickethead (Early Bird 14 €, Phase 1 18 €, Phase 2 21 €), Abendkasse noch offen. Set-Zeiten und Ende nennt der Club nicht.","en":"New edition of the drum & bass series The Hive, co-hosted by The Hive and Collapse at Flex. Top of the bill is Ed Rush from the UK, joined by Waeys from the Netherlands and Wingz from Austria. Local support comes from Inaya, Scapula & Weazl, Sinis b2b Mayez and 5HA5H. Doors 23:00, 16+; presale via Tickethead (early bird €14, phase 1 €18, phase 2 €21), door price TBA. The club gives no set times or end time."},"vok":1,"src":[["fx","https://flex.at/"],["fx","https://flex.at/event/the-hive/"],["th","https://events.tickethead.io/de/tickethead/event/5864"]],"floors":[{"f":"","a":["Ed Rush","Waeys","Wingz","Inaya","Scapula & Weazl","Sinis b2b Mayez","5HA5H"]}],"genres":["Drum & Bass"],"head":["Ed Rush"],"price":"Early Bird 14 € / Phase 1 18 € / Phase 2 21 € (VVK), AK TBA","age":"16+","tickets":"https://events.tickethead.io/de/tickethead/event/5864","flyer":"https://flex.at/wp-content/uploads/2026/10/855693998_1776915100526113_1273349458521656650_n.jpg","na":["e"],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"23:00","e":"06:00","title":"Radio Rudina","venue":"PRST","coll":["Radio Rudina"],"genres":["House"],"floors":[{"f":"","a":["Andre Zimmer","Anni Herzer","Valentin Zelz"]}],"price":"13–14 € (Early Bird 13 €)","age":"20+","src":[["ra","https://ra.co/events/2564050"],["rr","https://radiorudina.ticket.io/sbEA0Me0/"],["rr","https://www.radiorudina.com"]],"tickets":"https://radiorudina.ticket.io/sbEA0Me0/","note":{"de":"Radio Rudina lädt in den PRST in der Praterstraße; laut radiorudina.com unter dem Motto „Radio Rudina invites Fiesta Frizzante“. Es spielen Andre Zimmer, Anni Herzer und Valentin Zelz (auf radiorudina.com „Valentin Zell“), RA taggt das Event als House. Beginn 23:00, Ende 06:00. Early-Bird-Tickets 13 € über ticket.io, RA nennt 14 €. RA gibt als Mindestalter 20+ an.","en":"Radio Rudina hosts a night at PRST on Praterstraße; per radiorudina.com it runs as \"Radio Rudina invites Fiesta Frizzante\". Andre Zimmer, Anni Herzer and Valentin Zelz (\"Valentin Zell\" on radiorudina.com) play, and RA tags the event as house. Starts 23:00, ends 06:00. Early-bird tickets €13 via ticket.io, RA lists €14. RA gives a minimum age of 20+."},"flyer":"https://images.ra.co/508efb6bbbbd164af042e032973d7cdc0ef9719f.jpg","chk":"2026-10-30"},
{"d":"2026-11-14","s":"23:00","e":"05:00","title":"Club Pompadour","venue":"SASS Music Club","floors":[{"f":"","a":["Veronika Amie","Paul Panther","Philipp Blecha"]}],"vok":1,"coll":["Club Pompadour"],"price":"10–15 €","age":"18+","aw":1,"note":{"de":"Club Pompadour im SASS Music Club (23:00–05:00 Uhr) mit Veronika Amie, Paul Panther und Philipp Blecha. Einen Beschreibungstext oder Set-Zeiten veröffentlicht der Club bisher nicht. Eintritt 10–15 € inkl. Welcome Drink, ab 18 mit Ausweiskontrolle; wie bei allen SASS-Events ist ein Awareness-Team vor Ort.","en":"Club Pompadour at SASS Music Club (23:00–05:00) with Veronika Amie, Paul Panther and Philipp Blecha. The club has not yet published a description or set times. Entry €10–15 incl. welcome drink, 18+ with ID check; as at all SASS events an awareness team is present."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/club-pompadour-november"]],"na":["flyer","genres","tickets"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-11-14","s":"23:30","e":"04:00","title":"Raqsouna invites Gaouta","venue":"Club Lucia","coll":["Raqsouna"],"floors":[{"f":"","a":["Gaouta","Qamareen","Abu Naima"]}],"head":["Gaouta"],"price":"10–15 € / Community-Ticket auf Anfrage","flyer":"https://images.ra.co/59190d1c480a7d942443d734aba112e8e240b98e.jpg","note":{"de":"Letzte Raqsouna-Ausgabe des Jahres im Club Lucia, unterstützt von Stadt Wien Kultur (MA7). Live spielt Gaouta, ein marokkanischer Musiker an Drums, Gitarre, Synths und Gesang, der Post-Punk, New Wave und 80er-Sounds mit Darija verbindet. Dazu legen die Residents auf: Qamareen (auch Luna Al-Mousli) mit SWANA-Pop, Indie und Elektronik sowie Abu Naima, der von Hip-Hop-Wurzeln und arabischer Musik der 1970er bis zu aktueller basslastiger Clubmusik spielt.","en":"Raqsouna's final edition of the year at Club Lucia, supported by Stadt Wien Kultur (MA7). Gaouta plays live – a Moroccan musician on drums, guitar, synths and vocals who blends post-punk, new wave and '80s sounds with Darija. Residents Qamareen (also Luna Al-Mousli), playing SWANA pop, indie and electronic music, and Abu Naima, ranging from hip-hop roots and 1970s Arabic music to current bassy club music, complete the night."},"src":[["ta","https://www.technoairlines.com/club/club-lucia-vienna"],["ta","https://www.technoairlines.com/event/raqsouna-invites-gaouta-club-lucia-2026-11-14"],["ra","https://ra.co/events/2561086"]],"na":["genres","age","tickets"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-14","s":"23:59","title":"Hot'n'Wet","venue":"FLUCC Deck","src":[["fl","https://flucc.at/events/WGVN6r-hotnwet/"],["ra","https://ra.co/events/2561330"]],"vok":1,"e":"06:00","coll":["MEIOSISS"],"genres":["Techno"],"floors":[{"f":"","a":["Jules Foe","Lila Gold","MEIOSISS"]}],"price":"10 €","age":"18+","note":{"de":"MEIOSISS veranstaltet am FLUCC Deck die sechste Ausgabe ihrer Flirt-Party, auf RA als „Hot & Flirty #6“ gelistet: Flirten soll statt per Dating-App wieder im echten Leben auf der Tanzfläche passieren. Markenzeichen sind Flirt-Armbänder, die anderen zeigen, worauf man Lust hat. Persönliche Grenzen und Einvernehmlichkeit sind Grundvoraussetzung („only YES means YES“). Es spielen Lila Gold, MEIOSISS und Jules Foe als Special Guest, RA taggt Techno. Beginn 23:59 (RA-Beschreibung: 00:00), Ende 06:00, 10 € für die ganze Nacht, ab 18.","en":"MEIOSISS hosts the sixth edition of its flirt party on the FLUCC Deck, listed on RA as \"Hot & Flirty #6\": flirting is meant to move off dating apps and back onto the dance floor. Its trademark is flirt wristbands that show others what you are up for. Personal boundaries and consent are a basic requirement (\"only YES means YES\"). Lila Gold, MEIOSISS and special guest Jules Foe play, RA tags it techno. Starts 23:59 (RA description says 00:00), ends 06:00, €10 for the whole night, 18+."},"aw":1,"head":["Jules Foe"],"flyer":"https://images.ra.co/df7ab4b63e3763d3a35fe9cf775fc3fdb452ce63.jpg","na":["tickets"],"chk":"2026-10-30"},
{"d":"2026-11-15","s":"06:00","e":"11:00","title":"Redivider","venue":"SASS Music Club","floors":[{"f":"","a":["Redivider"]}],"vok":1,"note":{"de":"Sonntags-Afterhour im SASS Music Club von 6 bis 11 Uhr mit Redivider (@redivideredivider). Weitere Details nennt der Club noch nicht. Der Eintritt beträgt 15 €. Alle SASS-Veranstaltungen werden von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Sunday-morning afterhour at SASS Music Club from 6 to 11 am with Redivider (@redivideredivider). The club has not announced further details yet. Entry is 15 €. All SASS events are accompanied by an awareness team; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/Redivider-173"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/Redivider-173","srcChk":"2026-10-30","price":"15 €","age":"18+","chk":"2026-10-31"},
{"d":"2026-11-15","s":"14:00","title":"FLUT x Callshop Radio – Week 46","venue":"FLUCC Deck","coll":["Callshop Radio"],"note":{"de":"FLUT ist die Radioschiene des FLUCC in Kooperation mit Callshop Radio, das auch in Düsseldorf, Leipzig und Paris sendet; die Session wird über Stream 2 auf callshopradio.com übertragen. Week 46 kuratieren Spumante Records aus Wien, das Lineup ist noch offen. Während des Streams hat die Deck Bar geöffnet, Gäste können den Sonntagnachmittag mit Live-DJs verbringen. Von 14:00 bis 20:00, Eintritt frei.","en":"FLUT is FLUCC's radio strand in cooperation with Callshop Radio, which also broadcasts from Düsseldorf, Leipzig and Paris; the session streams on Stream 2 at callshopradio.com. Week 46 is curated by Vienna's Spumante Records, lineup still TBA. The Deck bar is open during the stream, so guests can spend Sunday afternoon with live DJs. From 14:00 to 20:00, free entry."},"vok":1,"src":[["fl","https://flucc.at/events/fwStcm-flut-x-callshop-radio-week-46-26/"]],"floors":[{"f":"","a":["TBA"]}],"e":"20:00","price":"free","chk":"2026-10-30"},
{"d":"2026-11-18","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Der wöchentliche Rave am Mittwoch (RAM) im Werk unter dem Motto „Recharge Wednesdays“ – laut Veranstalter jede Woche harte Beats und lange Nächte. Beginn 23 Uhr; der Eintritt erfolgt in den bisherigen Ausgaben gegen freiwillige Spende, ein Dresscode existiert nicht. Ein Awareness-Team ist vor Ort. Das Line-up dieser Ausgabe ist noch nicht veröffentlicht.","en":"The weekly Rave am Mittwoch (RAM) at Das Werk under the motto 'Recharge Wednesdays' – heavy beats and long nights every week, according to the organisers. Starts at 23:00; previous editions had free entry with a voluntary donation and no dress code. An awareness team is present. The line-up for this edition has not been published yet."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}],"na":["price","e","flyer","tickets"],"chk":"2026-10-31"},
{"d":"2026-11-19","s":"23:00","e":"06:00","title":"Bonkers × Belly Dance Services","venue":"SASS Music Club","coll":["Bonkers","Belly Dance Services"],"genres":["House","Acid"],"floors":[{"f":"","a":["Ludviq","Nick Hanzo"]}],"price":"10 €","age":"18+","src":[["ra","https://ra.co/events/2567928"]],"flyer":"https://images.ra.co/e19c209bbab103e8cbf27fd9259011e081e68928.jpg","note":{"de":"Bonkers und Belly Dance Services stehen im SASS erstmals seit drei Jahren wieder gemeinsam auf einem Lineup – ein Wiedersehen zweier DJs, die seit Jahren zusammenarbeiten. Ludviq gründete Bonkers 2018 in Barcelona; die Reihe ist an kein Genre gebunden, von Techno über Breaks und Psychedelic bis Indie und EBM. Nick Hanzo hat 2019 das multikulturelle Label Belly Dance Services mitgegründet, dessen Sound von trippy House über Slow Techno bis zu perkussiven Elementen reicht. RA taggt House und Acid; 23:00–06:00, 10 €, ab 18.","en":"Bonkers and Belly Dance Services share a lineup at SASS for the first time in three years, a reunion of two DJs who have worked together for years. Ludviq founded Bonkers in Barcelona in 2018; the series is not tied to any genre, ranging from techno, breaks and psychedelic to indie and EBM. Nick Hanzo co-founded the multicultural label Belly Dance Services in 2019, whose sound spans trippy house, slow techno and percussive elements. RA tags house and acid; 23:00–06:00, €10, 18+."},"chk":"2026-10-30"},
{"d":"2026-11-19","s":"23:00","title":"Teknoteka","venue":"Kramladen","genres":["Techno"],"floors":[{"f":"","a":["UV Project","Norg3n","Nasty"]}],"head":["UV Project"],"price":"Eintritt frei / free entry","note":{"de":"Teknoteka geht in die dritte Runde und bringt eine Nacht mit treibenden Basslines, Underground-Beats und energiegeladenem Techno in den Kramladen. Special Guest ist UV Project, dazu spielen NORG3N und Nasty. Eintritt frei.","en":"Teknoteka enters its third edition with a night of driving basslines, underground beats and high-energy techno at Kramladen. UV Project is the special guest, joined by NORG3N and Nasty. Free entry."},"src":[["ft","https://frey-tag.at/kalender/teknoteka?s=nix6lADv-"],["ft","https://frey-tag.at/locations/kramladen"]],"na":["e","age","tickets","flyer"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-20","s":"19:00","e":"02:00","title":"AMBIEVENT – trace encounters","venue":"Kollektiv Kaorle","coll":["AMBIEVENT"],"genres":["Ambient"],"floors":[{"f":"","a":["Ssaliva","færo demonic","Inou Ki Endo","esti.d","LCA","Kenji Araki"]}],"price":"15 €","age":"18+","tickets":"https://kupfticket.com/events/ambievent","note":{"de":"AMBIEVENT „trace encounters“ ist als immersiver Ambient-Abend im Kollektiv Kaorle (Otto-Wagner-Areal, Pavillon 21) angelegt, bei dem Klang, Licht, Duft und Kunst zusammenwirken. Bühnendesign, visuelle Kunst und sensorische Elemente sollen den Raum zur Erweiterung der Musik machen. Musikalisch sind Ssaliva, færo demonic, Inou Ki Endo, esti.d und LCA angekündigt, Kenji Araki steuert eine Klanginstallation bei. Ein Ausstellungsraum zeigt Arbeiten von Maximilian Prag, einen eigens kreierten Duft liefert Nēomirage. 19:00–02:00, 15 €, ab 18.","en":"AMBIEVENT \"trace encounters\" is an immersive ambient night at Kollektiv Kaorle (Otto Wagner grounds, Pavilion 21) where sound, light, scent and art come together. Stage design, visual art and sensory elements are meant to turn the space into an extension of the music. Ssaliva, færo demonic, Inou Ki Endo, esti.d and LCA are announced, and Kenji Araki contributes a sound installation. An exhibition room shows works by Maximilian Prag, and Nēomirage provides a scent created for the event. 19:00–02:00, €15, 18+."},"src":[["ra","https://ra.co/events/2563794"],["kt","https://kupfticket.com/events/ambievent"]],"flyer":"https://images.ra.co/aff197484f7e2a221ae22ecd3c65df5e923fbd26.jpg","chk":"2026-10-30"},
{"d":"2026-11-20","s":"21:00","e":"06:00","title":"Pyramide Takeover – SIGNAL Festival","venue":"Pyramide Vösendorf","coll":["SIGNAL"],"genres":["Techno","Minimal","Hard Techno"],"floors":[{"f":"Main","a":["Boris Brejcha","Kasia"]},{"f":"Hard Techno Stage","a":["Anxhela","Biia"]}],"age":"18+","tickets":"https://shop.o-klub.at/shop/registrations?event_id=540ea588-6691-4c71-bd49-8e8989e7cd6e","flyer":"https://o-klub.at/wp-content/uploads/2026/06/Festival_feed-lineup-2-V2-web.jpg","note":{"de":"Die vierte Ausgabe des SIGNAL Festivals von O der Klub übernimmt die Glaspyramide in Vösendorf. Headliner ist Boris Brejcha, bekannt für Joker-Maske und High-Tech-Minimal, der Live-Sets aus eigenen Produktionen spielt. Auf der Main Stage spielt außerdem Kasia mit hypnotischem, perkussivem Sound, gebucht u. a. bei Ultra Miami, Resistance, Drumcode und Afterlife. Die Hard Techno Stage bespielen Anxhela (IT/AL) mit Techno mit Trance- und Acid-Einflüssen und Biia mit rohem, genreübergreifendem Techno mit 90er-Einflüssen; weitere Acts folgen. 21:00–06:00, ab 18, Dresscode casual/rave, Early-Bird-Tickets ab 45 €.","en":"The fourth edition of O der Klub's SIGNAL Festival takes over the glass pyramid in Vösendorf. The headliner is Boris Brejcha, known for his Joker mask and high-tech minimal, playing live sets of his own productions. Kasia also plays the main stage with a hypnotic, percussive sound, booked at Ultra Miami, Resistance, Drumcode and Afterlife among others. The Hard Techno Stage features Anxhela (IT/AL) with techno shaped by trance and acid, and Biia with raw, genre-crossing techno with 90s influences; more acts TBA. 21:00–06:00, 18+, dress code casual/rave, early-bird tickets from €45."},"src":[["ok","https://o-klub.at/events/pyramide-takeover/"],["ra","https://de.ra.co/events/2489893"],["vo","https://www.volume.at/events/signal-festival-w-boris-brejcha-2026-11-20/"]],"price":"ab €45","head":["Boris Brejcha"],"chk":"2026-10-30"},
{"d":"2026-11-20","s":"22:00","e":"06:00","title":"syndikat","venue":"Celeste","coll":["Das Syndikat"],"floors":[{"f":"","a":["Malounadou","Anna Soto","Jule Feser","Aside"]}],"src":[["ra","https://ra.co/events/2570049"]],"genres":["House"],"flyer":"https://images.ra.co/def42c8e0589bb6771ae4224771410427fd6a7c6.png","note":{"de":"Das Syndikat kommt zum ersten Mal im Celeste zusammen. Es spielen Malounadou, Anna Soto, Jule Feser und Aside, angekündigt ist House. Weitere Infos zu den Artists, Preis und Mindestalter nennt die RA-Seite nicht. 22:00–06:00.","en":"Das Syndikat comes together for the first time at Celeste. Malounadou, Anna Soto, Jule Feser and Aside play, with house announced. The RA page gives no further artist info, price or age limit. 22:00–06:00."},"chk":"2026-10-30"},
{"d":"2026-11-20","s":"23:00","title":"Vision Serpent","venue":"FLUCC Wanne","coll":["Vision Serpent"],"note":{"de":"Vision Serpent lädt zum Showcase in die FLUCC Wanne mit NoNameLeft, Mateo!, David Phoenix und Nya Nyx. Bisherige Quellen ordnen den Abend Techno, Minimal Techno und Psytech zu. Beginn 23:00, Ende 06:00; Vorverkauf 10 € über kupfticket, Abendkasse 18 €. Die FLUCC-Seite selbst enthält noch keine Beschreibung oder Flyer.","en":"Vision Serpent hosts a showcase in the FLUCC Wanne with NoNameLeft, Mateo!, David Phoenix and Nya Nyx. Earlier sources place the night in techno, minimal techno and psytech. Starts 23:00, ends 06:00; presale €10 via kupfticket, €18 at the door. The FLUCC page itself has no description or flyer yet."},"vok":1,"src":[["fl","https://flucc.at/events/kZmxyN-vision-serpent/"],["ra","https://ra.co/events/2557296"],["vo","https://www.volume.at/events/nonameleft-mateo-2026-11-20/"]],"floors":[{"f":"","a":["NoNameLeft","Mateo!","David Phoenix","Nya Nyx"]}],"e":"06:00","genres":["Techno","Minimal Techno","Psytech"],"price":"VVK 10 €, AK 18 €","age":"18+","tickets":"https://kupfticket.com/en/events/vision-serpent-showcase-w-nnl-mateo","chk":"2026-10-30"},
{"d":"2026-11-20","s":"23:00","title":"Synergy Rave x Trance + Hard Techno","venue":"Das Werk","coll":["Synergy","KARTELL.FM","HEKTISCH"],"genres":["Trance","Hard Techno","Techno"],"tickets":"https://www.oeticket.com/noapp/artist/clubkultur-im-daswerk/synergy-rave-x-trance-hard-techno-4268081/","flyer":"https://images.ra.co/04b7d7930ace10a3fd637644fb7c49fcf184213d.jpg","zero":1,"note":{"de":"Synergy Rave bringt Trance und Hard Techno auf zwei Floors ins Werk: Auf dem Lusterfloor kuratiert KARTELL.FM von 23 bis 6 Uhr Trance & Bounce, auf dem Lasterfloor übernimmt HEKTISCH von 0 bis 6 Uhr mit Hard Techno. Weitere Acts sind noch nicht bekannt. Early Bird 10 €, Vorverkauf 15 €, Abendkasse 15 € bzw. 18 € ab Mitternacht; Einlass ab 18. Zero Tolerance gegenüber Homophobie, Sexismus und Rassismus.","en":"Synergy Rave brings trance and hard techno to two floors at Das Werk: KARTELL.FM curates trance & bounce on the Lusterfloor from 11 pm to 6 am, while HEKTISCH takes over the Lasterfloor with hard techno from midnight to 6 am. Further acts have not been announced. Early bird 10 €, presale 15 €, door 15 € or 18 € after midnight; 18+. Zero tolerance for homophobia, sexism and racism."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"],["ev","https://events.at/event/synergy-rave-x-trance-hard-techno-16"],["ra","https://ra.co/events/2564334"]],"floors":[{"f":"Lusterfloor (Trance & Bounce by KARTELL.FM)","a":["TBA"]},{"f":"Lasterfloor (Hard Techno by Hektisch)","a":["TBA"]}],"e":"06:00","price":"VVK 15 € / Early Bird 10 €; AK 15 €, ab 00:00 18 €","age":"18+","chk":"2026-10-31"},
{"d":"2026-11-20","s":"23:00","title":"Sub Zero","venue":"The Loft","coll":["Sub Zero"],"genres":["Techno"],"floors":[{"f":"Oben","a":["Userkiller","Kjaer","Mark Dale","Mike Mystik","MANiLO","Chicano"]}],"price":"10 € vor 00:00 / 12 € danach","flyer":"https://www.theloft.at/wp-content/uploads/2026/10/830563715_10235959980645177_3632405198332878954_n.jpg","note":{"de":"„Vienna meets Berlin“: Sub Zero bringt den Berliner Techno-Sound ins The Loft und lässt ihn auf die dunklere, rohere Seite der Wiener Szene treffen – kein polierter Clubsound, kein Mainstream, sondern treibende Kicks, düstere Atmosphären und kompromissloser Techno. Aus Deutschland kommen Userkiller (Tresor Berlin, R.C.S), MANiLO (Vorwärts Musik, R.C.S) und Chicano (R.C.S). Die österreichische Seite vertreten Kjaer (IAMT Red, Fine Artistry), Mark Dale (Republic Artists, Dynamic) und Mike Mystik (Dunkelton, Shadow State). Gespielt wird im oberen Floor; Eintritt 10 € vor Mitternacht, 12 € danach.","en":"'Vienna meets Berlin': Sub Zero brings Berlin's techno sound to The Loft and lets it collide with the darker, rawer side of the Viennese scene – no polished club music, no mainstream, but driving kicks, dark atmospheres and uncompromising techno. From Germany come Userkiller (Tresor Berlin, R.C.S), MANiLO (Vorwärts Musik, R.C.S) and Chicano (R.C.S). Representing Austria are Kjaer (IAMT Red, Fine Artistry), Mark Dale (Republic Artists, Dynamic) and Mike Mystik (Dunkelton, Shadow State). The night takes place on the upstairs floor; entry 10 € before midnight, 12 € after."},"vok":1,"src":[["lo","https://www.theloft.at/sub-zero/"],["ra","https://ra.co/events/2550352"]],"e":"06:00","age":"18+","na":["tickets"],"chk":"2026-10-31"},
{"d":"2026-11-20","s":"23:00","e":"06:00","title":"Freeride Millenium","venue":"SASS Music Club","floors":[{"f":"","a":["eira haul","Paris Böhm","Seba"]}],"vok":1,"note":{"de":"Freeride Millenium im SASS Music Club von 23 bis 6 Uhr mit eira haul, Paris Böhm und Seba. Der Eintritt beträgt 10–15 €, ein Willkommensgetränk ist inklusive. Alle SASS-Veranstaltungen werden von einem Awareness-Team begleitet – schaut auf euch und eure Mitmenschen. Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Freeride Millenium at SASS Music Club from 11 pm to 6 am with eira haul, Paris Böhm and Seba. Entry is 10–15 € including a welcome drink. All SASS events are accompanied by an awareness team – look out for yourselves and each other. Entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/freeride-millenium-november"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/freeride-millenium-november","srcChk":"2026-10-30","price":"10–15 €","age":"18+","chk":"2026-10-31"},
{"d":"2026-11-20","s":"23:00","title":"Männer im Loft","venue":"The Loft","floors":[{"f":"Unten","a":["DJ Countessa","Sebastian Wagner","Noemi Universe"]}],"price":"13–15 € / Trans, Drags & Refugees frei","tickets":"https://shop.eventjet.at/en/vangardist/event/1afaee65-8e05-45f1-b209-8b74852a22b1","flyer":"https://www.theloft.at/wp-content/uploads/2026/10/2026.11.20_maenner_im_loft.png","note":{"de":"Zweite Ausgabe der Partyreihe „Männer im Loft“ (Tickets über Vangardist) mit „Home-Party-Vibes“ im Unten-Floor und dem Wohnzimmer als Chill-Bereich mit Couches. Es legen DJ Countessa, Sebastian Wagner und Noemi Universe auf. Freier Eintritt für Trans-Personen, Drags und Geflüchtete. Genre nicht angegeben.","en":"Second edition of the party series 'Männer im Loft' (tickets via Vangardist), promising home-party vibes on the downstairs floor with the Wohnzimmer as a chill-out room with couches. DJ Countessa, Sebastian Wagner and Noemi Universe play. Free entry for trans people, drag performers and refugees. No genre stated."},"vok":1,"lgbtq":1,"src":[["lo","https://www.theloft.at/programm/"],["lo","https://www.theloft.at/maenner-im-loft/"]],"na":["genres","e","age"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-20","s":"23:59","e":"06:00","title":"GLITCH Vienna 001","venue":"Rhiz","coll":["GLITCH"],"genres":["House"],"floors":[{"f":"","a":["KΛSKIN","TenFifty"]}],"tickets":"https://www.enter-glitch.com/events/glitch-vienna-001","note":{"de":"Auftakt der House-Residency von GLITCH im Rhiz. GLITCH ist eine 2025 gegründete House-Eventreihe (Verein GLITCH), ursprünglich mit kleinen Off-Location-Partys in Kärnten. Es spielen KΛSKIN, laut Veranstalter eines der ersten Indie-Dance-Projekte Österreichs (aus Villach, auch in Wien aktiv), und das GLITCH-Resident-Tech-House-Projekt TenFifty (Grafenauer & KΛSKIN, Wien-Margareten). Weitere Acts sind angekündigt.","en":"Opening night of GLITCH's house residency at Rhiz. GLITCH is a house event series founded in 2025 (Verein GLITCH) that started with small off-location parties in Carinthia. KΛSKIN, described as one of Austria's first indie-dance projects (from Villach, also active in Vienna), and GLITCH resident tech-house project TenFifty (Grafenauer & KΛSKIN, Vienna-Margareten) play; more acts are to be announced."},"ook":1,"na":["price","flyer","age"],"src":[["gl","https://www.enter-glitch.com/"],["gl","https://www.enter-glitch.com/events/glitch-vienna-001"]],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-21","s":"15:00","e":"21:00","title":"techNOage – ab fünfzehn Uhr Clubbing","venue":"FLUCC Deck","coll":["techNOage"],"genres":["Techno"],"price":"Freie Spende","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/technoage_Sept_2026.min-2560x1440.jpg","note":{"de":"Nachmittags-Clubbing 15–21 Uhr, Techno mit Spannungsbogen, Kaffee & Kuchen für guten Zweck, barrierefrei.","en":"Afternoon clubbing 3–9 pm, techno with a dramaturgic arc, coffee & cake for charity, step-free access."},"vok":1,"src":[["fl","https://flucc.at/events/5KV584-technoage-ab-funfzehn-uhr-clubbing-26-09/"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-11-21","s":"20:00","title":"Art Attech – Kunst küsst Techno","venue":"FLUCC Wanne","coll":["Art Attech"],"genres":["Techno"],"src":[["fl","https://flucc.at/events/WGyKgG-art-attech/"],["ra","https://ra.co/events/2568823"]],"vok":1,"e":"06:00","price":"VVK 14–18 €, AK 19 €","age":"18+","floors":[{"f":"","a":["Aleta","ARAS JE'TÄM","Krawallbarbie","OK CUTEE","Wal_Halla","DJ Parkverbot"]}],"chk":"2026-10-29"},
{"d":"2026-11-21","s":"21:00","title":"Wiener Blut","venue":"Ottakringer Brauerei","coll":["SubRosaDictum"],"sexpos":1,"nophoto":1,"zero":1,"price":"€78","tickets":"https://partyticket.de/SRD/WB26/","note":{"de":"Dresscode: Latex, Leder, Spitze, Abendgarderobe, Masken, Drag. Keine Streetwear. Bereiche: Mixed Dance Floor, Artists & Performance, Playground. Keine DJs/Genres veröffentlicht. Strenger Fetisch-Dresscode.","en":"Dress code: latex, leather, lace, evening wear, masks, drag. No streetwear. Areas: mixed dance floor, artists & performance, playground. No DJs/genres published. Strict fetish dress code."},"src":[["sp","https://sexpositives.com/en/events/subrosadictum-wiener-blut/"],["pt","https://partyticket.de/SRD/WB26/"],["fp","https://www.fetischparty.at/Events"],["srd","https://subrosadictum.de/events/wiener-blut/"]],"age":"18+","chk":"2026-10-29"},
{"age":"18+","d":"2026-11-21","s":"23:00","title":"Contrast pres. DJ Marky + Pola & Bryson","venue":"Grelle Forelle","coll":["Contrast"],"genres":["Drum & Bass","Dubstep","UK Garage","House"],"floors":[{"f":"Mainfloor","a":["DJ Marky","Pola & Bryson","Contrast Residents"]},{"f":"Kitchen · EN:VY","a":["En:vy","Armin Karmin","Stan Matan","Mantis","Nysos"]}],"src":[["rg","https://www.regioactive.de/party/contrast-pres-dj-marky-pola-bryson-18-wien-grelle-forelle-2026-11-21-T9Qcrn29zL"],["gf","https://www.grelleforelle.com/programm/"],["eb","https://www.eventbrite.com/e/contrast-pres-dj-marky-pola-bryson-tickets-2003233210458"],["gf","https://www.grelleforelle.com/project/2111-contrast-pres-dj-marky-pola-bryson-18/"]],"vok":1,"e":"06:00","price":"26 € (AK)","tickets":"https://www.eventbrite.com/e/contrast-pres-dj-marky-pola-bryson-tickets-2003233210458","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/contrast_211126_web.jpg","chk":"2026-10-29"},
{"d":"2026-11-21","s":"23:00","title":"54Hz pres. CREEDS","venue":"Das Werk","coll":["54Hz"],"floors":[{"f":"","a":["CREEDS"]}],"note":{"de":"54Hz präsentiert CREEDS.","en":"54Hz presents CREEDS."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"]],"chk":"2026-10-29"},
{"d":"2026-11-21","s":"23:00","e":"06:00","title":"POLYCHAOS DUBIUM","venue":"Rhiz","genres":["Gqom","Baile Funk","Kuduro","Jersey Club","Footwork","Breakcore","Electro","Experimental"],"floors":[{"f":"","a":["Gawdesque","anxxxious_t","Kmanxak","Ironica Los Culos","Nova.psd"]}],"note":{"de":"Zweite Ausgabe; Visuals von Nova.psd (CRT-TV-Installation), Licht/Objekte von Qualia & Ironica Los Culos. Beschreibung nennt 22–04 Uhr.","en":"Second edition; visuals by Nova.psd (CRT TV installation), lights/objects by Qualia & Ironica Los Culos. Description says 22:00–04:00."},"src":[["ra","https://ra.co/events/2570034"]],"chk":"2026-10-29"},
{"d":"2026-11-21","s":"23:00","title":"Tanz dich glücklich","venue":"FLUCC Deck","coll":["Tanz dich glücklich"],"genres":["House","Bounce"],"floors":[{"f":"Deck","a":["DJEENI","Saender","Saratonin","SWEGALICIOUS","Wiener Grantscheibn"]}],"price":"AK 15 €","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/211126_TanzDichGlucklich_Deck_-_E.2e16d0ba.fill-1200x630.png","note":{"de":"Die Feel-Good-Partyreihe Tanz dich glücklich, die es seit 2018 gibt, kommt aufs FLUCC Deck. Gespielt wird alles zwischen groovy House und schnellem Bounce, dazu kommt Live-Saxophon. Hinter den Decks stehen DJEENI, Saender, Saratonin, SWEGALICIOUS und Wiener Grantscheibn; Set-Zeiten nennt die Location nicht. Eintritt 15 €, nur an der Abendkasse.","en":"The feel-good party series Tanz dich glücklich, running since 2018, comes to FLUCC Deck. Expect everything between groovy house and fast bounce, topped with live saxophone. On the decks are DJEENI, Saender, Saratonin, SWEGALICIOUS and Wiener Grantscheibn; the venue gives no set times. Entry €15, door sales only."},"vok":1,"src":[["fl","https://flucc.at/"],["fl","https://flucc.at/events/iXY45x-tanz-dich-glucklich/"]],"na":["e","age","tickets"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-11-21","s":"23:00","e":"05:00","title":"Wreck","venue":"SASS Music Club","floors":[{"f":"","a":["Tim Kern","LaLa"]}],"vok":1,"coll":["Wreck"],"price":"10–15 €","age":"18+","aw":1,"note":{"de":"Wreck im SASS Music Club (23:00–05:00 Uhr) mit Tim Kern und LaLa. Einen Beschreibungstext oder Set-Zeiten veröffentlicht der Club bisher nicht. Eintritt 10–15 € inkl. Welcome Drink, ab 18 mit Ausweiskontrolle; wie bei allen SASS-Events ist ein Awareness-Team vor Ort.","en":"Wreck at SASS Music Club (23:00–05:00) with Tim Kern and LaLa. The club has not yet published a description or set times. Entry €10–15 incl. welcome drink, 18+ with ID check; as at all SASS events an awareness team is present."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/wreck-november-sa"]],"na":["flyer","genres","tickets"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-11-22","s":"06:00","e":"11:00","title":"Morgengymnastik × Wreck","venue":"SASS Music Club","floors":[{"f":"","a":["Young Sun","AE-X"]}],"vok":1,"coll":["Wreck"],"note":{"de":"Morgengymnastik, die Sonntags-Afterhour im SASS Music Club, wird diesmal von Wreck kuratiert: Von 6 bis 11 Uhr spielen Young Sun und AE-X. Der Eintritt beträgt 15 €. Alle SASS-Veranstaltungen werden von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Morgengymnastik, the Sunday-morning afterhour at SASS Music Club, is hosted by Wreck this time: Young Sun and AE-X play from 6 to 11 am. Entry is 15 €. All SASS events are accompanied by an awareness team; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/morgengymnastik-173-wreck"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/morgengymnastik-173-wreck","srcChk":"2026-10-30","price":"15 €","age":"18+","chk":"2026-10-31"},
{"d":"2026-11-22","s":"20:00","title":"Sonntag'sdisco Vol. 29","venue":"FLUCC Deck","floors":[{"f":"Deck","a":["Drehli Robnik"]}],"note":{"de":"Die 29. Ausgabe der Sonntag'sdisco am FLUCC Deck von 20:00 bis 23:45. Ein Live-Act ist angekündigt, aber noch nicht benannt. Davor und danach legt Drehli Robnik viele seiner Platten auf. Eintritt 10 €, nur an der Abendkasse.","en":"The 29th edition of Sonntag'sdisco on the FLUCC Deck from 8 pm to 11:45 pm. A live act is announced but not yet named. Before and after, Drehli Robnik plays many of his records. Entry 10 €, door only."},"vok":1,"src":[["fl","https://flucc.at/"],["fl","https://flucc.at/events/EhMJ39-sonntag-sdisco-201126/"]],"na":["lineup","flyer","tickets","age","genres"],"_detailUrl":"https://flucc.at/events/EhMJ39-sonntag-sdisco-201126/","srcChk":"2026-10-30","e":"23:45","price":"10 € (nur AK)","chk":"2026-10-31"},
{"d":"2026-11-25","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Wöchentlicher Mittwochs-Rave im Werk.","en":"Weekly Wednesday rave at Das Werk."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-11-26","s":"23:00","e":"06:00","title":"Donnerstag Nacht","venue":"SASS Music Club","floors":[{"f":"","a":["Slack Hippy","neomodern","Crnobrnja"]}],"vok":1,"note":{"de":"Donnerstag Nacht im SASS Music Club von 23 bis 6 Uhr mit Slack Hippy, neomodern und Crnobrnja. Der Eintritt beträgt regulär 10–15 € inklusive Willkommensgetränk, für Studierende 0–5 €. Alle SASS-Veranstaltungen werden von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Thursday night at SASS Music Club from 11 pm to 6 am with Slack Hippy, neomodern and Crnobrnja. Regular entry is 10–15 € including a welcome drink, students 0–5 €. All SASS events are accompanied by an awareness team; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/donnerstag-nacht-57"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/donnerstag-nacht-57","srcChk":"2026-10-30","price":"10–15 € / Studierende 0–5 €","age":"18+","chk":"2026-10-31"},
{"d":"2026-11-27","s":"22:00","title":"20 Jahre CPE","venue":"Club Exil","coll":["CPE"],"note":{"de":"Die CPE-Crew feiert ihr 20-jähriges Bestehen unter dem Motto „Wir haben noch lange nicht genug!“ im Club Exil in Vösendorf (Marktstraße 13) – 20 Jahre Freundschaft, Wahnsinn und gemeinsame Leidenschaft. Versprochen wird eine laute, intensive Nacht mit alten Geschichten und Leuten, die von Anfang an dabei waren, „eine Nacht wie damals 2006“. Auf allen Floors spielen WONKA CTK, MANY MAMMUT, Illtek sowie die CPE Crew & Friends – „All Floors and all Minds Open“. Tickets kosten 15 € über ticket.io.","en":"The CPE crew celebrates its 20th anniversary under the motto 'Wir haben noch lange nicht genug!' (we're far from done) at Club Exil in Vösendorf (Marktstraße 13) – 20 years of friendship, madness and shared passion. The promise is a loud, intense night with old stories and people who were there from the start, 'a night like back in 2006'. WONKA CTK, MANY MAMMUT, Illtek and the CPE Crew & Friends play across all floors – 'All Floors and all Minds Open'. Tickets cost 15 € via ticket.io."},"src":[["ex","https://www.club-exil.at/"],["ex","https://club-exil.at/"],["exi","https://exil.ticket.io/EilUzLYa/"]],"vok":1,"price":"15 €","floors":[{"f":"Alle Floors","a":["WONKA CTK","MANY MAMMUT","Illtek","CPE Crew & Friends"]}],"tickets":"https://exil.ticket.io/EilUzLYa/","flyer":"https://dzorzunietucjdmyskzn.supabase.co/storage/v1/object/public/flyers/pack/3491c54c-06d5-439b-ac03-d51cacb9e11d/karte-4x5.jpg","na":["e","age","genres"],"chk":"2026-10-31"},
{"d":"2026-11-27","s":"22:00","title":"Luv Affair","venue":"FLUCC Wanne","coll":["Luv Affair"],"note":{"de":"Luv Affair auf beiden Floors (Wanne & Deck); Line-up noch nicht veröffentlicht.","en":"Luv Affair on both floors (Wanne & Deck); line-up not yet announced."},"vok":1,"src":[["fl","https://flucc.at/events/kpSL2Q-luv-affair/"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-11-27","s":"22:00","e":"06:00","title":"Access Another Atmosphere w/ Cosmic Gate & Ruben de Ronde","venue":"Prater Dome","coll":["Triple A Events"],"genres":["Trance"],"floors":[{"f":"","a":["Cosmic Gate","Ruben de Ronde","DJ Observer"]}],"price":"19 €","age":"18+","tickets":"https://www.aaa-events.at/","src":[["ra","https://ra.co/events/2546243"],["vo","https://www.volume.at/events/access-another-atmosphere-2026-11-27/"]],"chk":"2026-10-29"},
{"d":"2026-11-27","s":"23:00","e":"06:00","title":"Flashback w/ Thomas Schumacher – Techno Classics","venue":"Grelle Forelle","coll":["Flashback","FactX"],"genres":["Techno","Acid","Trance"],"price":"ab 16 €","floors":[{"f":"Mainfloor","a":["Thomas Schumacher","Joro & Joabo","Rokis","Tom Snow","MC Mars","MC Spot"]},{"f":"Kitchen","a":["Martin Oelz","Peter Pan","Romen Est Omen","Hanneken","PA_olo"]}],"src":[["rg","https://www.regioactive.de/party/flashback-w-thomas-schumacher-grelle-forelle-techno-classics-elektrochemie-lk-wien-2026-11-27-B5h2WQx06l"],["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/flashback?s=w_k-JY1v2"],["ft","https://frey-tag.at/kalender/flashback-techno-classics-1?s=eJPDz--_e"],["gf","https://www.grelleforelle.com/project/2711-flashback-w-thomas-schumacher-techno-classics-elektrochemie-lk/"],["ra","https://ra.co/events/2551280"]],"tickets":"https://flashback.ticket.io/2nf9fbhu/","vok":1,"flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/flashback_271126_web.jpg","note":{"de":"RA nennt 18+, Hausregel der Location ist 21+.","en":"RA states 18+, the venue's house rule is 21+."},"chk":"2026-10-29"},
{"d":"2026-11-27","s":"23:00","title":"Party Modern × PRST: Station Rose","venue":"PRST","coll":["Wien Modern"],"genres":["Electronic"],"floors":[{"f":"","a":["Stipo","Station Rose","Konman","Julia Goldfarb"]}],"src":[["wm","https://www.wienmodern.at/2026-club-praterstrasse-en-2026-237"],["fa","https://www.falter.at/location/42097/prst-praterstrasse"],["wm","https://www.wienmodern.at/event.php?lang=en&id=4567"]],"price":"€12–15 (€5 mit Festivalpass)","tickets":"https://ticket.wienmodern.at/en/buyingflow/tickets/16540/29099/","e":"06:00","note":{"de":"PRST-Produktion in Koproduktion mit Wien Modern. Zusätzlich gelistet: „Gunafa Clubbing // Nature Is Cool AI 1126 (UA)“. Nicht im PRST-Ticketshop.","en":"PRST production co-produced with Wien Modern. Also listed: \"Gunafa Clubbing // Nature Is Cool AI 1126 (UA)\". Not in PRST's ticket shop."},"chk":"2026-10-29"},
{"d":"2026-11-27","s":"23:00","title":"Resident Night: GOLPE // DETOXX","venue":"Das Werk","note":{"de":"Resident Night mit GOLPE und DETOXX.","en":"Resident night with GOLPE and DETOXX."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-11-27","s":"23:00","title":"Bassbussi Allstars – 3 Years Anniversary","venue":"The Loft","coll":["Bassbussi"],"note":{"de":"Bassbussi feiert den dritten Geburtstag im The Loft mit einem „BB-Allstars B2B Special“: drei Jahre Bass, Nächte am Dancefloor und gemeinsame Erinnerungen. Oben spielen Andrew Ahmed b2b Sluzy, PartyPauli b2b Maro und Arman Shadow b2b Leanne, unten Ave Maria b2b Christella, WO.IZZY b2b DJ Parkverbot, Aschenbrenner b2b Zeq und Anatol b2b Pinklotion – alle Sets als B2B. Start 23:00, Eintritt 15 €. Set-Zeiten, Ende und Mindestalter nennt die Location nicht.","en":"Bassbussi celebrates its third birthday at The Loft with a \"BB-Allstars B2B special\": three years of bass, dancefloor nights and shared memories. Upstairs: Andrew Ahmed b2b Sluzy, PartyPauli b2b Maro and Arman Shadow b2b Leanne; downstairs: Ave Maria b2b Christella, WO.IZZY b2b DJ Parkverbot, Aschenbrenner b2b Zeq and Anatol b2b Pinklotion – every set is a b2b. Starts 23:00, entry €15. The venue gives no set times, end time or age limit."},"vok":1,"src":[["lo","https://www.theloft.at/bassbussi-allstars-3-years-anniversary/"]],"floors":[{"f":"Oben","a":["Andrew Ahmed b2b Sluzy","PartyPauli b2b maro","Arman Shadow b2b Leanne"]},{"f":"Unten","a":["Ave Maria b2b Christella","WO.IZZY b2b DJ Parkverbot","Aschenbrenner b2b Zeq","Anatol b2b Pinklotion"]}],"price":"15 €","genres":["Trance"],"na":["e","flyer","tickets","age"],"chk":"2026-10-30"},
{"d":"2026-11-27","s":"23:00","e":"05:00","title":"AWSM. Skyscraper Edition (Extra Date)","venue":"Altia Skybar – DC Tower","coll":["AWSM"],"genres":["Afro House","Melodic House"],"floors":[{"f":"","a":["MAWU"]}],"price":"ab 20 €","age":"19+","tickets":"https://awsmevent.com/awsm-skyspracer-edition-extra-date/","note":{"de":"Im 58. Stock des DC Tower, Dresscode schick.","en":"On the 58th floor of DC Tower, dress code classy."},"src":[["ra","https://ra.co/events/2560557"],["vo","https://www.volume.at/events/awsm-skyscraper-edition-extra-date-2026-11-27/"],["awsm","https://awsmevent.com/awsm-skyspracer-edition-extra-date/"]],"chk":"2026-10-29"},
{"d":"2026-11-27","s":"23:00","e":"06:00","title":"Vivid – Frieden & Liebe","venue":"SASS Music Club","floors":[{"f":"","a":["Vivid"]}],"vok":1,"note":{"de":"Vivid, präsentiert von Frieden & Liebe (@friedenundliebe.vienna), im SASS Music Club von 23 bis 6 Uhr; ein detailliertes Line-up ist noch nicht veröffentlicht. Der Eintritt beträgt 10–15 €, ein Willkommensgetränk ist inklusive. Alle SASS-Veranstaltungen werden von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Vivid, presented by Frieden & Liebe (@friedenundliebe.vienna), at SASS Music Club from 11 pm to 6 am; a detailed line-up has not been published yet. Entry is 10–15 € including a welcome drink. All SASS events are accompanied by an awareness team; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/vivid-frienden-liebe-november"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/vivid-frienden-liebe-november","srcChk":"2026-10-30","price":"10–15 €","age":"18+","coll":["Frieden & Liebe"],"chk":"2026-10-31"},
{"d":"2026-11-27","s":"23:00","title":"High Voltage Fairies in the Pit – Metal x DnB","venue":"Flex","coll":["High Voltage Fairies"],"genres":["Drum & Bass","Metal"],"floors":[{"f":"","a":["AKOV b2b Van:Hill","Dave & Bass","Rosi","WNR","Fairy Mary"]}],"head":["AKOV b2b Van:Hill"],"tickets":"https://www.eventim-light.com/at/a/69f4c38de8b0edb43d1ba579/e/6adfd07eb6a71e455d87f9c0","flyer":"https://flex.at/wp-content/uploads/2026/10/Flex-Website-Flyer-1.png","note":{"de":"Der „Fairy Pit“ kehrt ins Flex zurück – laut Flex Wiens einzige Metal-&-Drum-&-Bass-Party, bei der Alt, Nu Metal und Metalcore auf Drum & Bass treffen. Im Zentrum steht ein Metal-x-DnB-Set von AKOV b2b Van:Hill mit Live-Metal-Gesang von AKOV, Frontmann der Band Aenygma. Special Guest ist Dave & Bass, die Residents Rosi, WNR und Fairy Mary liefern den „High Voltage“-Sound; dazu gibt es Live-Fairy-Dance-Performances auf der Bühne. Einlass 23:00; Tickets im VVK (Eventim Light, oeticket) und an der Abendkasse, Preise sind nicht angegeben.","en":"The \"Fairy Pit\" returns to Flex – according to the club Vienna's only metal & drum & bass party, where alt, nu metal and metalcore meet drum & bass. At its centre is a metal x DnB set by AKOV b2b Van:Hill with live metal vocals from AKOV, frontman of the band Aenygma. Special guest is Dave & Bass, while residents Rosi, WNR and Fairy Mary bring the \"High Voltage\" sound; there are also live fairy dance performances on stage. Doors 23:00; tickets in presale (Eventim Light, oeticket) and at the door, prices not stated."},"vok":1,"src":[["fx","https://flex.at/event/high-voltage-fairies-in-the-pit/"]],"na":["price","e","age"],"srcChk":"2026-10-30","chk":"2026-10-31"},
{"d":"2026-11-28","s":"23:00","title":"Selected × Bassbussi w/ Cara Elizabeth & Frederic.","venue":"Grelle Forelle","coll":["Selected","Bassbussi"],"floors":[{"f":"Mainfloor","a":["Cara Elizabeth","Frederic.","Andrew Ahmed"]},{"f":"Kitchen (Bassbussi)","a":[]}],"src":[["rg","https://www.regioactive.de/party/selected-x-bassbussi-w-cara-elizabeth-frederic-wien-grelle-forelle-2026-11-28-WngXFFMqQ0"],["gf","https://www.grelleforelle.com/programm/"],["ev","https://events.at/fortgehen-wien"],["gf","https://www.grelleforelle.com/project/2811-selected-x-bassbussi-w-cara-elizabeth-frederic/"],["ev","https://events.at/event/selected-x-bassbussi-w-cara-elizabeth"]],"vok":1,"tickets":"https://www.eventim-light.com/at/a/69284c91e54d302ec82b2635/e/6ad74e2b69e1b51231fecc93","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/selected_281126_web.jpg","chk":"2026-10-29"},
{"d":"2026-11-28","s":"23:00","title":"Nine Circles","venue":"Das Werk","coll":["Ninecircles"],"note":{"de":"Ninecircles-Nacht im Werk; Line-up noch nicht veröffentlicht.","en":"Ninecircles night at Das Werk; line-up not yet published."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-11-28","s":"23:00","e":"05:00","title":"AWSM. Skyscraper Edition","venue":"Altia Skybar – DC Tower","coll":["AWSM"],"genres":["House","Afro House","Melodic House"],"price":"€30–40 (günstigere Stufen ausverkauft)","age":"19+","tickets":"https://events.tickethead.io/en/tickethead/event/5562","src":[["ra","https://ra.co/events/2547050"],["vo","https://www.volume.at/events/awsm-skyscraper-edition-2026-11-28/"],["awsm","https://awsmevent.com/awsm-skyscraper-edition/"]],"floors":[{"f":"","a":["MAWU","Benjay"]}],"note":{"de":"volume.at nennt nur MAWU. Zusatztermin am 27.11. (awsmevent.com).","en":"volume.at lists only MAWU. Extra date on 27 Nov (awsmevent.com)."},"chk":"2026-10-29"},
{"d":"2026-11-28","s":"23:00","title":"Switch! presents Primate – Sticks & Stones Europe Tour","venue":"Flex","coll":["Switch!"],"genres":["Drum & Bass","Jungle"],"floors":[{"f":"","a":["Primate","Disorder","Replic","Splinta","Mr. Highfi","L3nny","Breeze","MC Jimmy Danger"]}],"price":"€18 (Regular; €12/€15 ausverkauft)","age":"16+","tickets":"https://switch.ticket.io/j4yVQSrj/?lang=en","src":[["vo","https://www.volume.at/events/switch-presents-primate-sticks-stones-europe-tour-2026-11-28/"],["sw","https://switch.ticket.io/j4yVQSrj/?lang=en"],["fx","https://flex.at/event/switch-2/"]],"note":{"de":"Switch! holt Primate aus Belgien im Rahmen seiner „Sticks & Stones Europe Tour“ ins Flex. Dazu spielen Disorder, Replic, Splinta, Mr. Highfi, L3nny und Breeze; Host ist MC Jimmy Danger, Live-Visuals kommen von Moving Eyes. Einlass 23:00, ab 16; Tickets im VVK über switch.ticket.io (18 € regulär, 12/15 €-Stufen ausverkauft) und an der Abendkasse. Set-Zeiten und Ende sind nicht angegeben.","en":"Switch! brings Belgium's Primate to Flex on his \"Sticks & Stones Europe Tour\". Also playing are Disorder, Replic, Splinta, Mr. Highfi, L3nny and Breeze; MC Jimmy Danger hosts and Moving Eyes provide live visuals. Doors 23:00, 16+; presale via switch.ticket.io (€18 regular, €12/€15 tiers sold out) and at the door. No set times or end time given."},"vok":1,"flyer":"https://flex.at/wp-content/uploads/2026/10/864951098_1668611768609108_1508070702285235241_n.jpg","na":["e"],"chk":"2026-10-30"},
{"d":"2026-11-28","s":"23:00","e":"05:00","title":"Cardio Cult","venue":"SASS Music Club","floors":[{"f":"","a":["TBA"]}],"vok":1,"coll":["Cardio Cult"],"note":{"de":"Cardio Cult im SASS Music Club von 23 bis 5 Uhr mit den DJs des Cardio-Cult-Kollektivs (@cardio.cult); weitere Namen sind noch nicht bekannt. Der Eintritt beträgt 10–15 €, ein Willkommensgetränk ist inklusive. Alle SASS-Veranstaltungen werden von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Cardio Cult at SASS Music Club from 11 pm to 5 am with the Cardio Cult DJs (@cardio.cult); further names are not yet known. Entry is 10–15 € including a welcome drink. All SASS events are accompanied by an awareness team; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/cardio-cult-november"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/cardio-cult-november","srcChk":"2026-10-30","price":"10–15 €","age":"18+","chk":"2026-10-31"},
{"d":"2026-11-29","s":"06:00","e":"11:00","title":"Morgengymnastik × Donaurave","venue":"SASS Music Club","floors":[{"f":"","a":["DONAURAVE"]}],"vok":1,"note":{"de":"Morgengymnastik, die Sonntags-Afterhour im SASS Music Club, wird von 6 bis 11 Uhr von DONAURAVE (@donaurave.wien) übernommen. Der Eintritt beträgt 15 €. Alle SASS-Veranstaltungen werden von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Morgengymnastik, the Sunday-morning afterhour at SASS Music Club, is taken over by DONAURAVE (@donaurave.wien) from 6 to 11 am. Entry is 15 €. All SASS events are accompanied by an awareness team; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/morgengymnastik-173"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/morgengymnastik-173","srcChk":"2026-10-30","price":"15 €","age":"18+","chk":"2026-10-31"},
{"d":"2026-11-29","s":"14:00","title":"FLUT x Callshop Radio – Week 48","venue":"FLUCC Deck","coll":["Callshop Radio"],"note":{"de":"Sonntags-DJ-Session mit Livestream (Reihe).","en":"Sunday DJ session with live stream (series)."},"vok":1,"src":[["fl","https://flucc.at/events/UJec35-flut-x-callshop-radio-week-48-26/"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-12-04","s":"23:00","title":"Tanz oder gar nicht","venue":"FLUCC Deck","floors":[{"f":"","a":["TBA"]}],"note":{"de":"Tanz oder gar nicht im FLUCC Deck. Die Location-Seite nennt bisher nur Titel, Datum und Beginn (23:00 Uhr); Lineup, Preis, Ende und Flyer sind noch nicht veröffentlicht.","en":"Tanz oder gar nicht at FLUCC Deck. The venue page so far only lists title, date and start time (23:00); lineup, price, end time and flyer have not been published yet."},"vok":1,"src":[["fl","https://flucc.at/"],["fl","https://flucc.at/events/JeJdYy-tanzodergarnicht/"]],"na":["lineup","price","e","flyer","tickets","age","genres"],"coll":["Tanz oder gar nicht"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-04","s":"23:30","title":"Basstrace","venue":"FLUCC Wanne","floors":[{"f":"","a":["TBA"]}],"note":{"de":"Basstrace im FLUCC Wanne. Die Location-Seite nennt bisher nur Titel, Datum und Beginn (23:30 Uhr); Lineup, Preis, Ende und Flyer sind noch nicht veröffentlicht. Verlinkt ist die Website basstrace.com.","en":"Basstrace at FLUCC Wanne. The venue page so far only lists title, date and start time (23:30); lineup, price, end time and flyer have not been published yet."},"vok":1,"src":[["fl","https://flucc.at/"],["fl","https://flucc.at/events/kPMaPj-basstrace/"]],"na":["lineup","price","e","flyer","tickets","age","genres"],"coll":["Basstrace"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-05","s":"18:00","e":"15:00","title":"HOUSETIERE × VG+ Weekender","venue":"Tagada","coll":["Housetiere","VG+"],"genres":["House"],"floors":[{"f":"Tagada Courtyard (18–22)","a":[]},{"f":"Tagada Club (22–04)","a":[]},{"f":"Soulkitchen (05–15)","a":[]},{"f":"","a":["MESROD","PJPJPJ","Julani","Lilosh","Fliize","Duplikate","Hanno","Louk","Krueger"]}],"note":{"de":"Weekender über drei Räume bis Sonntagnachmittag; MESROD (Wien-Debüt) spielt Nacht und After.","en":"Weekender across three rooms until Sunday afternoon; MESROD (Vienna debut) plays both night and afterhours."},"src":[["ra","https://ra.co/events/2567885"],["ft","https://frey-tag.at/kalender/housetiere-x-vg?s=65Q45wDeI"]],"chk":"2026-10-29","head":["MESROD"]},
{"d":"2026-12-05","s":"20:00","e":"07:00","title":"Tribal Vibes meets Exil","venue":"Club Exil","coll":["Tribal Vibes"],"genres":["Psytrance","Trance","Downtempo"],"floors":[{"f":"Main Floor (Psytrance)","a":[]},{"f":"Forest • Dark • Hi-Tech","a":[]},{"f":"Psyambient & Downtempo","a":[]},{"f":"","a":["Braincell","Boom Shankar","Egorythmia","Psynonima","Tsubi","Tündérke","Arnab","Karam","Alezzaro","Bornvoyage","Caban","CAM","SIS","Insano","Entheon","Hamelin","Kayara","Urklang"]}],"price":"19,65–24,75 € (Super Early Bird / Early Bird)","age":"18+","src":[["ra","https://ra.co/events/2560058"],["ex","https://club-exil.at/"]],"chk":"2026-10-31","tickets":"https://shop.eventjet.at/53c0ad62-32dc-48f4-9305-1708f1f05a00/event/4875f25a-4f08-43cf-acb6-3e4893ce5e20","vok":1},
{"d":"2026-12-05","s":"21:00","title":"Ungeniert Vol. 5","venue":"Libelle","sexpos":1,"src":[["sp","https://sexpositives.com/en/events/ungeniert-vol-5-wien-2026-12-05/"],["un","https://ungeniert.org/"],["un","https://ungeniert.org"],["li","https://www.libelle.at/events/ungeniert-vol-5/"]],"nophoto":1,"price":"€29","note":{"de":"Auf ungeniert.org ist Vol. 5 noch nicht angekündigt (letzter Stand: Vol. 4 am 16.10.). Ablauf laut Veranstalter: Fragebogen, Warteliste, Gästeliste. Dresscode sinnlich, Hausschuhe mitbringen. Einlass bis 00:00. Keine Abendkasse; Erstbesucher:innen füllen vorab einen Fragebogen aus. Keine DJs/Genres angegeben.","en":"Vol. 5 is not yet announced on ungeniert.org (latest: Vol. 4 on 16 Oct). Process per organiser: questionnaire, waiting list, guest list. Sensual dress code, bring slippers. Entry until 00:00. No box office; first-timers complete a questionnaire first. No DJs/genres listed."},"unconf":1,"tickets":"https://event.ungeniert.org/app/1-user-signup-first-step/set-language-68dc311688bd5a4f8ca56aee","vok":1,"chk":"2026-10-29"},
{"d":"2026-12-05","s":"22:00","title":"Panzerschokolade","venue":"FLUCC Deck","floors":[{"f":"","a":["TBA"]}],"note":{"de":"Panzerschokolade im FLUCC Deck. Die Location-Seite nennt bisher nur Titel, Datum und Beginn (22:00 Uhr); Lineup, Preis, Ende und Flyer sind noch nicht veröffentlicht.","en":"Panzerschokolade at FLUCC Deck. The venue page so far only lists title, date and start time (22:00); lineup, price, end time and flyer have not been published yet."},"vok":1,"src":[["fl","https://flucc.at/"],["fl","https://flucc.at/events/HkoXCz-panzerschokolade/"]],"na":["lineup","price","e","flyer","tickets","age","genres"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-05","s":"23:00","e":"05:00","title":"Karotte im Wohnzimmer","venue":"SASS Music Club","floors":[{"f":"","a":["DJ Karotte","Crazy Sonic","Joro & Joabo"]}],"src":[["sa","https://sassvienna.com/en/events/event/dj-karotte-im-wohnzimmer"],["ra","https://ra.co/events/2558624"]],"price":"18 €","vok":1,"age":"18+","aw":1,"genres":["House","Tech House"],"chk":"2026-10-29"},
{"d":"2026-12-05","s":"23:00","title":"Bassbehörde","venue":"FLUCC Wanne","floors":[{"f":"","a":["TBA"]}],"note":{"de":"Bassbehörde im FLUCC Wanne. Die Location-Seite nennt bisher nur Titel, Datum und Beginn (23:00 Uhr); Lineup, Preis, Ende und Flyer sind noch nicht veröffentlicht.","en":"Bassbehörde at FLUCC Wanne. The venue page so far only lists title, date and start time (23:00); lineup, price, end time and flyer have not been published yet."},"vok":1,"src":[["fl","https://flucc.at/"],["fl","https://flucc.at/events/D8e6qM-bassbeh%C3%B6rde/"]],"na":["lineup","price","e","flyer","tickets","age","genres"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-06","s":"13:00","e":"18:30","title":"Untz Baby Untz – Nikolo im Funkhaus","venue":"Funkhaus","coll":["Untz Baby Untz"],"genres":["Techno","House"],"price":"13 €","tickets":"https://ra.co/events/2568943","note":{"de":"Day-Rave, erstes Indoor-Event; Early-Bird-Tickets ab 2. Nov 12:00. Line-up folgt. Untz Baby Untz ist eine familien-/kinderfreundliche Day-Rave-Reihe. Line-up noch TBA; Early Bird ab 2.11., 12:00.","en":"Day rave, first indoor edition; early-bird tickets from 2 Nov 12:00. Line-up TBA. Untz Baby Untz is a family/kid-friendly day-rave series. Lineup still TBA; early bird from 2 Nov, 12:00."},"src":[["ra","https://ra.co/events/2568943"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-12-07","title":"GLITCH Vienna pres. Stef Davidse","venue":"The Loft","coll":["GLITCH","Resonance Social Artists"],"genres":["House"],"floors":[{"f":"Oben","a":["Stef Davidse","TenFifty","LLo"]}],"head":["Stef Davidse"],"price":"7–15 €","tickets":"https://www.enter-glitch.com/","note":{"de":"Nach kleinen Off-Location-Partys in Kärnten bringt GLITCH sein bisher größtes Event nach Wien: Headliner ist der Niederländer Stef Davidse (Eastenderz). Dazu spielen GLITCH-Resident Tenfifty und LLo (IT) von Resonance Social Artists aus Mailand. Ein Raum, ein Dancefloor, House-Musik. Die Loft-Website nennt als Termin Montag, 7.12.2026, mit der offensichtlichen Platzhalter-Uhrzeit 00:23; Beginn und genaue Nacht sind daher noch unklar.","en":"After small off-location parties in Carinthia, GLITCH brings its biggest event yet to Vienna with Dutch headliner Stef Davidse (Eastenderz). GLITCH resident Tenfifty and LLo (IT) of Milan's Resonance Social Artists join him. One room, one dancefloor, house music. The Loft website lists Monday 7 Dec 2026 with an apparent placeholder time of 00:23, so the start time and exact night are still unclear."},"vok":1,"ook":1,"src":[["lo","https://www.theloft.at/programm/"],["lo","https://www.theloft.at/glitch-vienna-pres-stef-davidse/"]],"na":["e","flyer","age","s"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-12-07","s":"21:00","e":"06:00","title":"FT — 12","venue":"Grelle Forelle","coll":["Feuchte Träume"],"price":"Early Bird 36,16 € (Member 28,93 €), danach 41,81 / 44,64 / 47,46 €","tickets":"https://tickets.feuchtetraeu.me/events/ft-12","nophoto":1,"sexpos":1,"note":{"de":"Nur mit angenommener Online-Bewerbung, keine Abendkasse; personalisierte Tickets, Outfit erwartet, Kameras abgeklebt, Awareness-Team. Line-up folgt. Nacht vor dem Feiertag.","en":"Entry only with accepted online application, no box office; personalised tickets, outfits expected, cameras covered, awareness team. Line-up TBA. Night before the public holiday."},"aw":1,"src":[["ftr","https://feuchtetraeu.me"],["ftr","https://tickets.feuchtetraeu.me/events/ft-12"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-12-11","s":"21:00","e":"06:00","title":"SIGNAL Festival w/ Eric Prydz","venue":"Pyramide Vösendorf","coll":["SIGNAL"],"genres":["Techno"],"floors":[{"f":"","a":["Eric Prydz","TBA"]}],"head":["Eric Prydz"],"age":"18+","tickets":"https://shop.o-klub.at/shop/","flyer":"https://warda.at/wp-content/uploads/2026/09/792717161_1165555019336613_1184285506877769689_n.jpg","note":{"de":"SIGNAL (Reihe von O der Klub) bringt Eric Prydz in die Glaspyramide Vösendorf, angekündigt als großangelegte „Transmission“. Der schwedische Produzent bewegte sich laut Ankündigung von melodischen, progressiven Sounds als Pryda hin zu dunklerem Techno als Cirez D; erwähnt werden sein Album OPUS und seine aufwendigen EPIC-Shows. Weitere Acts sind noch TBA. Es gibt reguläre Tickets, VIP-Stage-Tickets und VIP-Tische; Preise sind nicht angegeben. Einlass ab 18 Jahren.","en":"SIGNAL (a series by O der Klub) brings Eric Prydz to the glass pyramid in Vösendorf, billed as a full-scale \"transmission\". According to the announcement, the Swedish producer moved from melodic, progressive sounds as Pryda to darker techno as Cirez D; his album OPUS and his elaborate EPIC shows are mentioned. Further acts are TBA. Regular tickets, VIP stage tickets and VIP tables are available; prices not stated. Admission 18+."},"src":[["wa","https://warda.at/events/signal-festival-w-eric-prydz/"],["wa","https://warda.at/genre/techno/"]],"na":["price"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-11","s":"22:00","title":"Titti Titti Bang Bang","venue":"The Loft","coll":["Titti Queer Club"],"lgbtq":1,"floors":[{"f":"Oben","a":["TBA"]},{"f":"Unten","a":["TBA"]},{"f":"Wohnzimmer","a":["TBA"]}],"price":"10–15 €","age":"18+","note":{"de":"Titti ist eine queere Partyreihe in Wien, die seit rund sieben Jahren queeren Gästen einen sicheren Raum und queeren Künstler:innen eine offene Bühne bietet – diesmal als „Titti Titti Bang Bang“ auf drei Floors im The Loft mit Pop, gemischter Musik sowie Techno/House (welcher Floor was spielt, ist nicht angegeben). Das DJ-Lineup verweist auf die TTBB-Website. Um 01:00 gibt es unten eine Drag-Show, gehostet von Ryta Tale und Metamorkid mit Philisha Conditioner und Bloodsugar; von 00:00 bis 02:00 schenkt Horness Gratis-Shots aus. Eintritt 10/15 €, ab 18; alle Geschlechter willkommen, keine Toleranz für Sexismus, Homophobie, Rassismus, Body-Shaming oder andere Diskriminierung.","en":"Titti is a queer party series in Vienna that has offered queer guests a safe space and queer artists an open stage for around seven years – this time as \"Titti Titti Bang Bang\" across three floors at The Loft with pop, mixed music and techno/house (which floor plays what is not stated). For the DJ line-up the venue refers to the TTBB website. At 1 am there is a drag show downstairs hosted by Ryta Tale and Metamorkid with Philisha Conditioner and Bloodsugar; Horness serves free shots from midnight to 2 am. Entry €10/15, 18+; all genders welcome, no tolerance for sexism, homophobia, racism, body shaming or any other discrimination."},"vok":1,"src":[["lo","https://www.theloft.at/titti-titti-bang-bang-14/"]],"na":["lineup","e","tickets","flyer"],"srcChk":"2026-10-30","chk":"2026-10-31"},
{"d":"2026-12-11","s":"23:00","title":"Zuckerwatt w/ Ellen Allien","venue":"Grelle Forelle","coll":["Zuckerwatt"],"floors":[{"f":"Mainfloor","a":["Ellen Allien","TBA"]},{"f":"Kitchen","a":["TBA"]}],"head":["Ellen Allien"],"tickets":"https://zuckerwatt.ticket.io/8EYfX8ZC/","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/08/zuckerwatt_111226.jpg","note":{"de":"Die Reihe Zuckerwatt holt Ellen Allien in die Grelle Forelle. Die Location beschreibt sie als eine der prägendsten Künstlerinnen ihrer Generation, die den Kern des Techno verkörpert, als DJ in großen Clubs und auf Festivals weltweit gespielt hat und einen umfangreichen Katalog aus Soloalben, Singles, EPs und Remixen vorweisen kann. Weitere Acts für Mainfloor und Kitchen sind noch tba. Einlass 23:00, Vorverkauf über ticket.io; Preis und Ende sind noch nicht angegeben.","en":"The Zuckerwatt series brings Ellen Allien to Grelle Forelle. The venue describes her as one of the most iconic artists of her generation who embodies the core ethos of techno, has played major clubs and festivals worldwide and has an extensive catalogue of solo albums, singles, EPs and remixes. Further acts for Mainfloor and Kitchen are still tba. Doors 23:00, presale via ticket.io; price and end time not yet announced."},"vok":1,"src":[["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/1112-zuckerwatt-w-ellen-allien/"]],"na":["price","e","age","genres"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-11","s":"23:30","e":"05:00","title":"TAKTGEFÜHL Vol. 2","venue":"Club Lucia","coll":["Taktgefühl"],"genres":["Trance","Techno"],"floors":[{"f":"","a":["KWEEN BEE","Chiara Allnutt","L.O.S.S."]}],"price":"12–15 €","age":"18+","tickets":"https://events.eventjet.at/e/taktgefuehl-vol-2/","flyer":"https://images.ra.co/2917bb85cd0c900498f50062c379cb8ac5cbbc4c0.jpg","note":{"de":"Zweite Ausgabe der Reihe TAKTGEFÜHL im Club Lucia, zwischen Groove, Techno und Trance. KWEEN BEE spielt schnellen Techno mit funkigen Elementen, Chiara Allnutt groovigen, uptempo Techno. L.O.S.S. bringt eine Sammlung alter Trance-CDs mit.","en":"Second edition of the TAKTGEFÜHL series at Club Lucia, mixing groove, techno and trance. KWEEN BEE plays fast techno with funky elements, Chiara Allnutt groovy, upbeat techno, and L.O.S.S. brings a collection of old trance CDs."},"src":[["ta","https://www.technoairlines.com/event/taktgefuhl-vol-2-club-lucia-2026-12-11"],["ra","https://ra.co/events/2547316"]],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-12-19","s":"18:00","e":"03:00","title":"ZusammenKommen 16","venue":"Club Exil","coll":["hausgemacht"],"genres":["Techno"],"sexpos":1,"note":{"de":"Save the Date. Details folgen über den hausgemacht-Newsletter. Nur Vorverkauf nach Bewerbung, Einlass in Zeitslots bis 22:00. Line-up TBA. Nicht auf club-exil.at gelistet.","en":"Save the date. Details via the hausgemacht newsletter. Presale only after application, time-slot entry until 22:00. Lineup TBA. Not listed on club-exil.at."},"src":[["hg","https://www.hausgemacht.org/en/events/zusammenkommen-16"],["sp","https://sexpositives.com/en/events/zusammenkommen-16-wien-2026-12-19/"],["ex","https://club-exil.at/"]],"tickets":"https://app.hausgemacht.org/events/zk16","age":"18+","chk":"2026-10-29"}
];
