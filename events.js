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
 "Loop": "Lerchenfelder Gürtel, Stadtbahnbogen 27, 1080",
 "Jaz in the City": "Windmühlgasse 28, 1060",
 "Stiftskeller Klosterneuburg": "Albrechtsbergergasse 1, 3400 Klosterneuburg",
 "Multiversum Schwechat": "Möhringgasse 2/4, 2320 Schwechat",
 "Coco Bar": "Lerchenfelder Gürtel Stadtbahnbogen 34–35, 1080"
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
const VR={"Grelle Forelle":{"age":"21+","sound":{"de":"Alcons Audio + Lambda Labs","en":"Alcons Audio + Lambda Labs","src":"https://www.properformance.audio/articles/grelle-forelle-mainfloor","floors":{"main":{"de":"Alcons Audio QR36 Line Arrays, 8× Lambda Labs DW-15 Subs","en":"Alcons Audio QR36 line arrays, 8× Lambda Labs DW-15 subs"},"kitchen":{"de":"Lambda Labs (MF-15A Subs, TX-2A, CX-1A Monitore)","en":"Lambda Labs (MF-15A subs, TX-2A, CX-1A monitors)","src":"https://lambda-labs.com/en/references/grelle-forelle"}}}},"Das Werk":{"age":"21+","sound":{"de":"Alcons Audio RR12 + Eigenbau-Subwoofer (12× 15\")","en":"Alcons Audio RR12 + custom subwoofer (12× 15\")","src":"https://www.prosoundweb.com/art-culture-venue-in-austria-outfitted-with-alcons-audio/"}},"SASS Music Club":{"age":"18+","aw":1,"sound":{"de":"Beschallung mit Alcons-Audio-Lautsprechern (Pro-Ribbon-Technologie), installiert von Pro Performance.","en":"Alcons Audio loudspeakers (pro-ribbon technology), installed by Pro Performance.","src":"https://properformance.at/en/projects/club/club-sass-wien/"}},"O der Klub":{"age":"18+"},"FLUCC Wanne":{"aw":1},"Club Exil":{"sound":{"de":"Lambda-Labs-Soundsystem: Auf dem Mainfloor ein 90°-QX-Setup mit 20 DH-18-Subwoofern.","en":"Lambda Labs sound system: a 90° QX setup with 20 DH-18 subwoofers on the main floor.","src":"https://www.properformance.audio/articles/the-lambda-labs-qx-series","floors":{"mainfloor":{"de":"Lambda Labs QX in 90°-Anordnung mit 20 DH-18-Subwoofern.","en":"Lambda Labs QX in a 90° configuration with 20 DH-18 subwoofers.","src":"https://www.properformance.audio/articles/the-lambda-labs-qx-series"}}}},"The Loft":{"sound":{"de":"KV2-Anlage im Keller (Dancefloor Unten).","en":"KV2 sound system in the basement (Unten dancefloor).","src":"https://www.wien.info/de/essen-trinken/bars-clubs/clubs-discos/the-loft-361056","floors":{"Unten":{"de":"KV2-Anlage","en":"KV2 sound system","src":"https://www.wien.info/de/essen-trinken/bars-clubs/clubs-discos/the-loft-361056"}}}},"Flex":{"sound":{"de":"Alcons-Soundsystem (Planung/Installation Pro Performance seit 2007): Main Floor seit 2022 mit 8 Alcons QR24 und 2 QM24 als L/R-Arrays, 4 BC543-Cardioid-Bässen und dem berühmten Beton-Horn-Subwoofer; Flex Café mit Alcons LR18; im Außenbereich die früheren QR36.","en":"Alcons sound system (designed/installed by Pro Performance since 2007): since 2022 the main floor runs 8 Alcons QR24 plus 2 QM24 as L/R arrays, 4 BC543 cardioid subs and the famous concrete horn subwoofers; the Flex Café uses Alcons LR18; the former QR36 now cover the outdoor area.","src":"https://www.fast-and-wide.com/faw-news/fast-news/17647-vienna-s-flex","floors":{"Main Floor":{"de":"8× Alcons QR24 (4× QR24/80, 4× QR24/110) + 2× QM24 als L/R-Arrays, 4× BC543 Cardioid-Bass, Beton-Horn-Subwoofer mit je vier 15\"-Treibern pro Seite.","en":"8× Alcons QR24 (4× QR24/80, 4× QR24/110) + 2× QM24 as L/R arrays, 4× BC543 cardioid bass, concrete horn subwoofers with four 15\" drivers per side.","src":"https://www.fast-and-wide.com/faw-news/fast-news/17647-vienna-s-flex"},"Flex Café":{"de":"Alcons LR18 Pro-Ribbon-Line-Array links/rechts der Bühne, Bässe in End-Fire-Anordnung.","en":"Alcons LR18 pro-ribbon line array left/right of the stage, subs in end-fire configuration.","src":"https://www.fast-and-wide.com/faw-news/fast-news/17647-vienna-s-flex"}}}},"PRST":{"sound":{"de":"Lambda-Labs-Soundsystem von Pro Performance Sound + Acoustics (Wolfgang Sauter): Lambda Labs QX als Haupt-PA, horizontales Double-Endfire-Array aus 8 DH-18-Subwoofern vor und hinter dem DJ-Pult, DJ-Monitoring mit CB-Design-15\"-Subs und Lambda Labs TX-3A; Active Noise Control zwischen Clubraum und Bar.","en":"Lambda Labs sound system by Pro Performance Sound + Acoustics (Wolfgang Sauter): Lambda Labs QX main PA, a horizontal double end-fire array of 8 DH-18 subwoofers in front of and behind the DJ booth, DJ monitoring with CB-Design 15\" subs and Lambda Labs TX-3A; active noise control between club room and bar.","src":"https://www.lewitt-audio.com/blog/PRST-audio-experience"}},"U4":{"age":"18+"}};
const CG={
 "303": [
  "Drum & Bass",
  "Neurofunk"
 ],
 "Im Freudentaumel": [
  "Downtempo",
  "Deep House",
  "Techno",
  "Midtempo",
  "House",
  "Psy-Techno"
 ],
 "Herzfrequenz": [
  "Trance",
  "Hardtechno",
  "Hard Bounce",
  "Hard Techno",
  "Nightcore"
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
  "Dub Techno",
  "Techno"
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
  "House",
  "Techno"
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
  "Psytech",
  "Minimal"
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
  "Pop",
  "Rock"
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
  "Ambient",
  "Dub",
  "Downtempo"
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
  "Trance",
  "Melodic Techno"
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
 ],
 "Luv Affair": [
  "Disco",
  "House"
 ],
 "TUFF": [
  "Bounce",
  "Hardbounce"
 ],
 "54Hz": [
  "Bounce",
  "Hard Bounce",
  "Hard Techno"
 ],
 "Frieden & Liebe": [
  "House"
 ],
 "Ninecircles": [
  "Techno",
  "Industrial"
 ],
 "Spectral": [
  "Techno",
  "Acid",
  "Melodic Techno"
 ],
 "Rave On Vienna": [
  "Rave",
  "Tekno"
 ],
 "Tanz dich glücklich": [
  "House",
  "Bounce"
 ],
 "Tropical Thunder": [
  "Balearic",
  "Tropical",
  "Zouk",
  "Afrobeat",
  "Indie Dance"
 ],
 "Basstrace": [
  "Dubstep",
  "Bass"
 ],
 "House of Plüsch": [
  "House"
 ],
 "Fifi": [
  "Hardgroove",
  "Techno",
  "Schranz",
  "Hardtechno",
  "Groove",
  "Hard Techno"
 ],
 "Club Pompadour": [
  "House"
 ],
 "Fish Market": [
  "Techno"
 ]
};
const KC=["303","50 Herz","54Hz","909techno","Alles Allen","AMBIEVENT","Art Attech","Auf der Lauer","Ausländer Haus","AWSM","Bassbussi","Bassclub","Bassproduction","Basstrace","Belly Dance Services","Bestand","Bonkers","Café Mondo","Callshop Radio","Cardio Cult","ClassiX","Club Pompadour","Collapse","Connecting People","Contrast","Cosmic Egg","CPE","created-on-earth","Cybertribe","Cyclic Existence","Dark Pressure","Das Syndikat","deep cut","Derisch","Drum & Bassick","Dunkelton Kollektiv","Dystopia Rave","Empyreon","Entrance","euphonic records","FactX","Fader Friends","Fadercult","Feuchte Träume","Fifi","FIFI Rave","Fish Market","Flashback","Fluffig","Frieden & Liebe","Fuelized","Gassen aus Zucker","GDN","GLITCH","Green Light Collective","Gürtelgroove","Habibi Party","Hanzom","Hardline","Harmony Rec.","hausgemacht","Heimlich","HEKTISCH","hereandthere","Herzfrequenz","HERZZZ","High Voltage Fairies","House of Plüsch","Housetiere","Im Freudentaumel","Jah Power Sound","Journey to Tarab","Kaisa Bodega","KARTELL.FM","Klub Halal","Kollektiv Birdhouse","Kollektiv Ost:West","KØRE","Köstlich","KSOT","Liminal","Little Beat More","LSH","LustMusik","Luv Affair","Magika","Mahlwerk","MEIOSISS","Merkwürdig","Nine O Nine","Ninecircles","Paradies Garten","Pingpaya Fenty Savage","Pink Mayhem","Pole Circle","Ponyhof","Queertactics","Radiance","Radio Rudina","Raqsouna","Rave am Mittwoch","Rave On Vienna","Ravenbogen","Resonance Social Artists","Rude Bwoy Embassy","S.O.U.L.","sama recordings","sch:cht","Schlachthaus","Schrödingers Groove","Selected","served","SIGNAL","Slutlabs","Sorry Mom","Soularium","Soundlabs","Spectral","Spumante Records","Step Forward","STRICT!","Sub Zero","SubRosaDictum","Super Disco","Superego Records","Switch!","Synergy","Taktgefühl","Tanz dich glücklich","Tanz oder gar nicht","Tasteless","Techno Obscene","Techno Vienna","techNOage","technolog","The Hive","Titti Queer Club","Tribal Vibes","Triple A Events","Tropical Thunder","TUFF","Untz Baby Untz","up/or","VG+","Vision Serpent","VLAN","Wien Modern","WOS Soundsystem","Wreck","YE","Zuckerwatt","Zyklop Audio"];
const CI={
 "303": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Drum-&-Bass-Veranstalter mit Abenden im Wiener Flex, darunter „303 goes Flex“ (November 2025, Neurofunk/Drum & Bass) und „303 presents Hanzom Label Night“ (2026).",
  "en": "Drum & bass promoter running nights at Vienna's Flex, including “303 goes Flex” (November 2025, neurofunk/drum & bass) and “303 presents Hanzom Label Night” (2026).",
  "src": [
   "https://pl.ra.co/events/2311235",
   "https://dropthebass.co/events/303-goes-flex-291125"
  ]
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
  ],
  "logo": "https://i1.sndcdn.com/avatars-000545622270-yfcydf-t500x500.jpg",
  "sc": "https://soundcloud.com/journeytotarab",
  "man": 1
 },
 "Im Freudentaumel": {
  "de": "Wiener Partyreihe im FLUCC",
  "en": "Viennese party series at FLUCC",
  "from": "Wien",
  "src": [
   "https://ra.co/events/1927240",
   "https://ohschonhell.at/orte/flucc/50",
   "https://de.ra.co/events/1827218"
  ],
  "founded": "2022",
  "foundedNote": 1,
  "noLogo": "2026-10-28",
  "infoChk": "2026-10-31",
  "ig": "https://www.instagram.com/im.freudentaumel",
  "logo": "https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/im-freudentaumel_KxbXHnR.max-2560x1440.png",
  "man": 1
 },
 "Zuckerwatt": {
  "founded": "2008",
  "foundedNote": 1,
  "de": "Techno-Reihe von Andreas, Fabian und Thomas (Idee zu Silvester 2007/08), u. a. in Grelle Forelle, Sass, Flex und Pratersauna.",
  "en": "Techno series by Andreas, Fabian and Thomas (idea on New Year's Eve 2007/08), e.g. at Grelle Forelle, Sass, Flex and Pratersauna.",
  "src": [
   "https://goodnight.at/magazin/party/1992-die-coolsten-veranstaltungskollektive-wiens",
   "https://www.facebook.com/zuckerwatt/"
  ],
  "noLogo": "2026-10-28",
  "logo": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgxSNTz3y4vRe1uW6jAeEvkGJ8big2rRBHtXt7PFPx_1NgOIsaeuPzAUOIDBMAMDyhlvyg4dpSfKKDm66ShGgXrn-rYA-IQ7v_uHAdON2-SyAoiFnhr2mG6DOb4fSA0aCD2n6d_2e9RxVYc/s1600/zuckerwatt_hq.jpg",
  "man": 1,
  "tix": "https://zuckerwatt.ticket.io/",
  "infoChk": "2026-11-02"
 },
 "Herzfrequenz": {
  "founded": "2023",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/das+werk/14",
   "https://herzfrequenz-techno.com",
   "https://ra.co/events/2382527",
   "https://de.ra.co/events/2498633",
   "https://de.ra.co/events/1904628"
  ],
  "noLogo": "2026-11-02",
  "de": "Wiener Drag-Rave („Shirts Off Rave“), der Hard Techno, Hard Bounce und Nightcore mit Drag-Kunst verbindet – u. a. im Das Werk, inklusive offizieller Vienna-Pride-Afterparty.",
  "en": "Vienna drag rave (a 'shirts off rave') combining hard techno, hard bounce and nightcore with drag performance, held at venues such as Das Werk, including the official Vienna Pride afterparty.",
  "from": "Wien",
  "web": "https://herzfrequenz-techno.com",
  "ig": "https://instagram.com/herzfrequenz.techno",
  "sc": "https://soundcloud.com/herzfrequenz_techno",
  "infoChk": "2026-11-02",
  "alias": [
   "Herzfrequenz Techno"
  ]
 },
 "Contrast": {
  "founded": "2015",
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3",
   "https://ukf.com/read/rave-scenes-vienna/",
   "https://ra.co/events/1789556",
   "https://ra.co/events/993998"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Drum-&-Bass-Reihe, die seit 2015 ausschließlich in der Grellen Forelle stattfindet und von Markus Szabo veranstaltet wird. Laut Veranstalter war sie eine der ersten Wiener D&B-Veranstaltungen ab 18 Jahren; gebucht werden regelmäßig internationale Gäste, u. a. aus Großbritannien, sowie Labelnächte.",
  "en": "Drum & bass series held exclusively at Grelle Forelle since 2015, hosted by Markus Szabo. According to the organiser it was one of the first 18+ d&b events in Vienna; it regularly books international guests, including from the UK, as well as label nights.",
  "type": [
   "Reihe"
  ],
  "from": "Wien"
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
   "https://ohschonhell.at/orte/das+werk/14",
   "https://ra.co/events/1832377",
   "https://ra.co/events/2466171"
  ],
  "de": "Techno-Reihe im Das Werk, veranstaltet von Nine O Nine und LSH (Les Suspects Habituels); versteht sich als „safe space for people of all shades“ und „rave where we challenge the concept of obscenity“.",
  "en": "Techno series at Das Werk run by Nine O Nine and LSH (Les Suspects Habituels); aims to be 'a safe space for people of all shades' and 'a rave where we challenge the concept of obscenity'.",
  "type": [
   "Reihe"
  ],
  "infoChk": "2026-11-02",
  "noLogo": "2026-11-02"
 },
 "Rave am Mittwoch": {
  "founded": "2022",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/das+werk/14",
   "https://de.ra.co/events/2556025"
  ],
  "noLogo": "2026-11-02",
  "de": "Wöchentliche Rave-Reihe am Mittwoch („RAM – Recharge Wednesdays“) im Werk, 23–6 Uhr, Eintritt gegen freie Spende, ohne Dresscode und mit Awareness-Team.",
  "en": "Weekly Wednesday rave series ('RAM – Recharge Wednesdays') at Das Werk, 11pm–6am, entry by free donation, no dress code and with an awareness team.",
  "from": "Wien",
  "infoChk": "2026-11-02",
  "alias": [
   "RAM"
  ]
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
   "https://ohschonhell.at/orte/flucc/50",
   "https://de.ra.co/events/2113405",
   "https://ra.co/events/2482873",
   "https://ra.co/promoters/137303",
   "https://deepcut.at/",
   "https://deepcut.at/links/"
  ],
  "de": "Wiener Eventreihe für Hypnotic und Deep Techno mit organischen Texturen, Dub und Psytrance-Einflüssen, u. a. im FLUCC und im Kramladen.",
  "en": "Vienna event series for hypnotic and deep techno with organic textures, dub and psytrance influences, held at FLUCC, Kramladen and elsewhere.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "web": "https://deepcut.at",
  "ig": "https://www.instagram.com/deepcut.event",
  "sc": "https://soundcloud.com/deepcut-event",
  "infoChk": "2026-11-02",
  "logo": "https://deepcut.at/wp-content/uploads/2026/02/deep-cut-Logo-white-300w.png"
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
  "noLogo": "2026-11-02",
  "de": "Wiener Partyreihe im The Loft, die bei ihren Ausgaben beide Floors bespielt; Headliner u. a. ELOISA (Berlin) mit Sounds von Hard House über Groove bis Acid.",
  "en": "Vienna party series at The Loft that takes over both floors; headliners have included ELOISA (Berlin) with sounds ranging from hard house to groove and acid.",
  "ig": "https://www.instagram.com/bassxbussi/",
  "infoChk": "2026-11-02"
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
  "src": [
   "https://ohschonhell.at/orte/pratersauna/5",
   "https://de.ra.co/events/2079120",
   "https://de.ra.co/promoters/50305",
   "https://ra.co/events/670807",
   "https://de.ra.co/events/1879278",
   "https://soundcloud.com/basstrace",
   "https://soundcloud.com/lady_bird_music/bt055-ladybird"
  ],
  "de": "Wiener Dubstep-Reihe, die laut Eigenbeschreibung seit 2015 die „trueschool roots of Dubstep“ pflegt (Motto „System. Roots. Culture.“). Nummerierte Ausgaben fanden u. a. im FLUCC, im Rhiz, im Venster und im Jolly Roger statt; 2024 feierte die Reihe 9 Jahre, 2025 10 Jahre.",
  "en": "Vienna dubstep series that, by its own description, has been sharing and cultivating the “trueschool roots of dubstep” since 2015 (motto “System. Roots. Culture.”). Numbered editions have taken place at venues such as FLUCC, Rhiz, Venster and Jolly Roger; it celebrated 9 years in 2024 and 10 years in 2025.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "web": "https://basstrace.com",
  "sc": "https://soundcloud.com/basstrace",
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
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
   "https://ohschonhell.at/orte/flucc/50",
   "https://sunmoon.ticket.io/ObeGEC9z/"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Wiener Partyreihe für 90er-Rave und Tekno, die laut ihrem „12th Bday Bash“ im Februar 2025 seit etwa 2013 besteht. Regelmäßig im FLUCC, außerdem mit der Großausgabe „Rave On XXL“ im Club Exil.",
  "en": "Viennese party series for 90s rave and tekno, which according to its '12th Bday Bash' in February 2025 has been running since around 2013. Regularly at FLUCC, plus the large-scale edition 'Rave On XXL' at Club Exil.",
  "type": [
   "Reihe"
  ],
  "alias": [
   "Rave On",
   "Rave On XXL"
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
   "https://ohschonhell.at/orte/club+lucia/963",
   "https://ra.co/events/2284048",
   "https://www.eventbrite.at/e/fuelized-pres-objectiv-uk-tickets-1980332038436",
   "https://www.instagram.com/fuelized_events/"
  ],
  "noLogo": "2026-11-02",
  "de": "Wiener Drum-&-Bass-Veranstalter (FUELIZED EVENTS) mit Partys im Club Lucia, Fokus auf minimale, deepe und soulige Drum-&-Bass-Sounds.",
  "en": "Vienna drum & bass promoter (FUELIZED EVENTS) running parties at Club Lucia, focusing on minimal, deep and soulful drum & bass.",
  "type": [
   "Promoter"
  ],
  "from": "Wien",
  "infoChk": "2026-11-02",
  "ig": "https://www.instagram.com/fuelized_events"
 },
 "Drum & Bassick": {
  "founded": "2025",
  "foundedNote": 1,
  "src": [
   "https://ohschonhell.at/orte/club+lucia/963",
   "https://ra.co/events/2467514",
   "https://www.clublucia.at/event/drum-bassick-x-radiance/",
   "https://de.ra.co/events/2219708"
  ],
  "de": "Wiener Drum-&-Bass-Partyreihe, die seit 2025 Raves im Club Lucia und im Loop veranstaltet, mit Fokus auf Community und gelegentlichen Charity-Specials.",
  "en": "Viennese drum & bass party series running raves at Club Lucia and Loop since 2025, with a focus on community and occasional charity specials.",
  "from": "Wien",
  "ig": "https://www.instagram.com/drumandbassick/",
  "type": [
   "Reihe"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
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
  "de": "Techno-Partyreihe in der Grellen Forelle, veranstaltet von Meat Market Vienna (MEAT); 2024 wurde das 15-jährige Bestehen seit der ersten Party gefeiert. Neben Clubnächten mit internationalen Gästen richtet die Reihe auch offizielle Pride-Afterpartys aus.",
  "en": "Techno party series at Grelle Forelle, run by Meat Market Vienna (MEAT); in 2024 it celebrated 15 years since its first party. Besides club nights with international guests, the series also hosts official Pride afterparties.",
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3",
   "https://ra.co/events/1861030",
   "https://ra.co/events/2445124",
   "https://ra.co/events/716790",
   "https://ra.co/events/1198279"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "type": [
   "Reihe"
  ],
  "founded": "2009",
  "foundedNote": 1,
  "from": "Wien"
 },
 "Selected": {
  "src": [
   "https://ohschonhell.at/orte/grelle+forelle/3"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
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
  "logo": "https://ugc.production.linktr.ee/56ada16d-b647-4532-93c3-350fbac3c672_sorry-mom-logo-1080x1080-sw-kreis.png",
  "infoChk": "2026-11-02"
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
   "https://ra.co/events/2110843",
   "https://linktr.ee/mahlwerk"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "bc": "https://mahlwerk.bandcamp.com/",
  "type": [
   "Kollektiv"
  ]
 },
 "Wien Modern": {
  "logo": "https://www.wienmodern.at/images/Logo.png",
  "web": "https://www.wienmodern.at/",
  "src": [
   "https://www.wienmodern.at/",
   "https://en.wikipedia.org/wiki/Wien_Modern",
   "https://flucc.at/events/RVw6Sh-party-modern-schcht/"
  ],
  "de": "Festival für zeitgenössische Musik in Wien, 1988 auf Initiative von Claudio Abbado gegründet; findet jedes Jahr rund einen Monat lang im November an vielen Orten der Stadt statt und veranstaltet u. a. die Clubreihe Party Modern.",
  "en": "Vienna festival of contemporary music, founded in 1988 on the initiative of Claudio Abbado; it runs for about a month every November at many venues across the city, and its programme includes the club series Party Modern.",
  "founded": "1988",
  "from": "Wien",
  "infoChk": "2026-11-02",
  "ig": "https://www.instagram.com/wienmodern/",
  "sc": "https://soundcloud.com/wienmodern1"
 },
 "Pole Circle": {
  "rules": {
   "sexpos": 1
  },
  "man": 1,
  "infoChk": "2026-11-02",
  "de": "Veranstalter, der gemeinsam mit Slutlabs den von Sexarbeiter*innen geprägten, queeren Pop-up-Club SXXPLICIT mit Stage-Shows, Pole- und Lapdances in die Libelle Wien bringt.",
  "en": "Organiser that, together with Slutlabs, brings SXXPLICIT – a worker-centred, queer pop-up club with stage shows, pole and lap dances – to Libelle in Vienna.",
  "src": [
   "https://www.libelle.at/events/sxxplicit-by-pole-circle-x-slutlabs/",
   "https://sexpositives.com/en/events/sxxplicit-wien-2026-11-07/"
  ],
  "noLogo": "2026-11-02"
 },
 "Slutlabs": {
  "rules": {
   "sexpos": 1
  },
  "man": 1,
  "infoChk": "2026-11-02",
  "noLogo": "2026-11-02"
 },
 "STRICT!": {
  "rules": {
   "sexpos": 1
  },
  "man": 1,
  "infoChk": "2026-11-02",
  "de": "Veranstalter von Fetisch-Play-Partys in der Libelle Wien, etwa der Themennacht „The Dark Circus“ mit Performances; ausdrücklich keine Tanzparty, Teilnahme nur nach Voranmeldung, mit eigenem Dresscode und Verhaltenskodex.",
  "en": "Organiser of fetish play parties at Libelle in Vienna, such as the themed night “The Dark Circus” with performances; explicitly not a dance party, attendance by advance registration only, with its own dress code and code of conduct.",
  "src": [
   "https://www.libelle.at/events/dark-circus-hosted-by-strict-3/",
   "https://sexpositives.com/en/events/strict-dark-circus-wien-2026-11-14/"
  ],
  "noLogo": "2026-11-02"
 },
 "SubRosaDictum": {
  "rules": {
   "sexpos": 1
  },
  "man": 1,
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Veranstalter von BDSM- und Fetisch-Events wie Wiener Blut, Hotel Lust, THE UNION und Pleasure Bay mit Mixed Dance Floor, Performances und Playground; Vorverkaufsstellen in Wien, München und Salzburg, strenger Dresscode (keine Streetwear) und Foto-/Filmverbot.",
  "en": "Organiser of BDSM and fetish events such as Wiener Blut, Hotel Lust, THE UNION and Pleasure Bay with a mixed dance floor, performances and a playground; ticket outlets in Vienna, Munich and Salzburg, a strict dress code (no streetwear) and a ban on photos and filming.",
  "web": "https://subrosadictum.de/",
  "src": [
   "https://subrosadictum.de/events/wiener-blut/"
  ]
 },
 "HERZZZ": {
  "members": [
   "Anni Herzer"
  ],
  "man": 1,
  "de": "Clubnacht im SASS Music Club, gehostet von Anni Herzer, mit perkussiven, euphorischen Peak-Time-Sets.",
  "en": "Club night at SASS Music Club hosted by Anni Herzer, with percussive, euphoric peak-time sets.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "noLogo": "2026-11-02",
  "src": [
   "https://sassvienna.com/en/events/event/herzzz-6",
   "https://ra.co/events/2103434"
  ],
  "infoChk": "2026-11-02",
  "founded": "2024",
  "foundedNote": 1
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
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Event- und Festivalreihe von O – der Klub (Horst Group) in Wien mit Techno, Melodic und Hard Techno; neben Clubnächten im O der Klub gibt es größere Festival-Ausgaben in der Pyramide Vösendorf (Herbst 2026: vierte Ausgabe).",
  "en": "Event and festival series by O – der Klub (Horst Group) in Vienna featuring techno, melodic and hard techno; besides club nights at O der Klub there are larger festival editions at Pyramide Vösendorf (autumn 2026: fourth edition).",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "web": "https://o-klub.at/event-type/signal/",
  "src": [
   "https://o-klub.at/events/pyramide-takeover/",
   "https://o-klub.at/event-type/signal/"
  ]
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
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Drum-&-Bass-Veranstaltung im Wiener Flex, die internationale Acts wie Ed Rush, Millbrook oder Tantron mit lokalen DJs präsentiert; Ausgaben sind mindestens seit 2024 belegt, 2026 gemeinsam mit Collapse.",
  "en": "Drum & bass event at Vienna's Flex presenting international acts such as Ed Rush, Millbrook or Tantron alongside local DJs; editions are documented since at least 2024, in 2026 together with Collapse.",
  "src": [
   "https://flex.at/event/the-hive/",
   "https://ra.co/events/1934244"
  ]
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
  "de": "Unabhängiges Online-Community-Radio mit Musik aus Club- und Subkultur und Fokus auf lokale Artists, 2017 gegründet, mit Stationen in Düsseldorf, Leipzig und Paris. In Kooperation mit dem FLUCC Transmitter (FLUT) entstand ein Wiener Programm aus verschiedenen Strömungen der lokalen Musik- und Kulturszene, das regelmäßig am FLUCC Deck läuft.",
  "en": "Independent online community radio featuring club and subculture music with a focus on local artists, founded in 2017, with stations in Düsseldorf, Leipzig and Paris. Together with FLUCC Transmitter (FLUT) it runs a Vienna programme featuring various currents of the local music and culture scene, held regularly at FLUCC Deck.",
  "founded": "2017",
  "web": "https://callshopradio.com/",
  "ig": "https://instagram.com/callshopradio",
  "src": [
   "https://flucc.at/events/fwStcm-flut-x-callshop-radio-week-46-26/",
   "https://ra.co/events/2130003",
   "https://de.ra.co/events/1908134",
   "https://steady.page/de/callshop-radio",
   "https://soundcloud.com/callshopradio"
  ],
  "infoChk": "2026-11-02",
  "sc": "https://soundcloud.com/callshopradio",
  "noLogo": "2026-11-02"
 },
 "Wreck": {
  "de": "Veranstaltungsreihe im Wiener SASS Music Club, bei der LaLa und Æ-X Extended Sets spielen – Motto: „In einer Welt, in der alle immer schneller werden, nehmen wir uns Zeit.“",
  "en": "Event series at Vienna's SASS Music Club featuring extended sets by LaLa and Æ-X – motto: 'In a world where everyone keeps getting faster, we take our time.'",
  "noLogo": "2026-11-02",
  "src": [
   "https://sassvienna.com/en/events/event/wreck-7"
  ],
  "infoChk": "2026-11-02"
 },
 "AWSM": {
  "infoChk": "2026-11-02",
  "de": "AWSM ist eine Wiener Eventreihe für Daypartys, Rooftop-Partys und Nachtevents mit House, Afro House und Melodic House, seit Mai 2025. Veranstaltet wird u. a. am Nussberg (Buschenschank Feuerwehr Wagner), im Oktogon am Himmel, in der Altia Skybar im DC Tower und im Stiftskeller Klosterneuburg.",
  "en": "AWSM is a Vienna event series for day parties, rooftop parties and night events with house, afro house and melodic house, running since May 2025. Venues include the Nussberg vineyard (Buschenschank Feuerwehr Wagner), Oktogon am Himmel, Altia Skybar in the DC Tower and Stiftskeller Klosterneuburg.",
  "type": [
   "Reihe"
  ],
  "founded": "2025",
  "from": "Wien",
  "web": "https://awsmevent.com/",
  "ig": "https://www.instagram.com/awsmevent/",
  "src": [
   "https://awsmevent.com/",
   "https://awsmevent.com/en/statistics/",
   "https://eventfrog.at/en/p/party/house-techno/awsm-nye-skyline-edition-7395843027586043087.html"
  ],
  "rules": {
   "age": "19+"
  },
  "noLogo": "2026-11-02"
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
  "noLogo": "2026-11-02",
  "src": [
   "https://flucc.at/events/RVw6Sh-party-modern-schcht/",
   "https://flucc.at/events/AbZjQp-party-modern-schcht-ct/"
  ],
  "infoChk": "2026-11-02"
 },
 "Bestand": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "up/or": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Eventreihe des Vereins Bestand zwischen politischer Artikulation, klanglichem Experiment und Clubmusik. Der Name steht für Richtungswechsel („up“) und Transformation („or“); „upor“ ist zudem slowenisch für „Widerstand“. Veranstaltungsort u. a. das FLUCC Deck.",
  "en": "Event series by the association Bestand, situated between political articulation, sonic experimentation and club music. The name stands for a change of direction ('up') and transformation ('or'); 'upor' is also Slovenian for 'resistance'. Venues include FLUCC Deck.",
  "type": [
   "Reihe"
  ],
  "web": "https://bestand.org/",
  "src": [
   "https://bestand.org/termine/upor_nov26",
   "https://flucc.at/events/X7gLPJ-upor-with-nexus-live-k-means-sami-dj-fred-zey/"
  ]
 },
 "House of Plüsch": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Partyreihe „Plüsch“ mit House-Musik die ganze Nacht, u. a. im Tagada in Wien-Ottakring.",
  "en": "Party series “Plüsch” with house music all night, held among other places at Tagada in Vienna's Ottakring district.",
  "ig": "https://www.instagram.com/houseofpluesch",
  "src": [
   "https://frey-tag.at/kalender/pluesch?s=D58FzEGyT",
   "https://frey-tag.at/locations/tagada"
  ]
 },
 "Fluffig": {
  "de": "Wiener Veranstalter von Trance- und Techno-Partys, u. a. der „Fluffig Punsch Party“ als Winter-Open-Air im Club U.",
  "en": "Vienna organiser of trance and techno parties, including the 'Fluffig Punsch Party' winter open air at Club U.",
  "noLogo": "2026-11-02",
  "src": [
   "https://de.ra.co/events/2323092",
   "https://de.ra.co/events/2462572"
  ],
  "infoChk": "2026-11-02"
 },
 "Empyreon": {
  "de": "Neue Eventreihe im Wiener The Loft mit dem Ziel, eine lokale Szene für Deep-, Progressive- und Melodic-House-Musik, DJs und Produzent:innen in Wien aufzubauen.",
  "en": "New event series at Vienna's The Loft aiming to build a local scene for deep, progressive and melodic house music, DJs and producers in Vienna.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "noLogo": "2026-11-02",
  "src": [
   "https://www.theloft.at/empyreon-progressive-house-2/"
  ],
  "infoChk": "2026-11-02"
 },
 "Kollektiv Birdhouse": {
  "de": "Wiener Kollektiv („Birdhouse Collective“) hinter einer der langlebigsten alternativen Clubnächte Wiens, mit Electroclash, Indie Dance und Underground-Beats.",
  "en": "Vienna collective ('Birdhouse Collective') behind one of the city's longest-running alternative club nights, featuring electroclash, indie dance and underground beats.",
  "type": [
   "Kollektiv"
  ],
  "from": "Wien",
  "noLogo": "2026-11-02",
  "src": [
   "https://nl.ra.co/events/2514903"
  ],
  "infoChk": "2026-11-02"
 },
 "Fadercult": {
  "de": "Berliner Kollektiv, das u. a. gemeinsam mit Mahlwerk in der Wiener Grelle Forelle einen eigenen Floor („Kitchen“) hostet.",
  "en": "Berlin collective that hosts its own floor ('Kitchen') at events such as its collaboration with Mahlwerk at Vienna's Grelle Forelle.",
  "type": [
   "Kollektiv"
  ],
  "from": "Berlin",
  "noLogo": "2026-11-02",
  "src": [
   "https://www.grelleforelle.com/project/0611-mahlwerk-fadercult-w-afem-syko-lisa-horver/",
   "https://soundcloud.com/fadercult"
  ],
  "infoChk": "2026-11-02"
 },
 "WOS Soundsystem": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "GDN": {
  "de": "GDN (Gesindel der Nacht) ist ein Wiener Musikkollektiv, Label (GDN Records) und Agentur. Es veranstaltet Partys wie NACHTSCHUB und Klubnächte im Das Werk, BOUNCYLICIOUS im FLUCC, 12H in der Ballonhalle sowie gemeinsam mit Herzfrequenz die queere Hard-Techno-Nacht HART.",
  "en": "GDN (Gesindel der Nacht) is a Vienna music collective, label (GDN Records) and agency. It runs parties such as NACHTSCHUB and club nights at Das Werk, BOUNCYLICIOUS at FLUCC, 12H at Ballonhalle and, together with Herzfrequenz, the queer hard techno night HART.",
  "type": [
   "Kollektiv",
   "Label"
  ],
  "web": "https://gesindeldernacht.at",
  "noLogo": "2026-11-02",
  "src": [
   "https://fr.ra.co/events/2117571",
   "https://fr.ra.co/promoters/126017",
   "https://gesindeldernacht.at",
   "https://de.ra.co/events/2077984",
   "https://gesindeldernacht.at/",
   "https://de.ra.co/events/1909952",
   "https://de.ra.co/events/1904628",
   "https://www.instagram.com/gesindel_der_nacht/",
   "https://soundcloud.com/gesindel-der-nacht/silentsevir-cerberus-gdn002"
  ],
  "infoChk": "2026-11-02",
  "from": "Wien",
  "ig": "https://www.instagram.com/gesindel_der_nacht/",
  "sc": "https://soundcloud.com/gesindel-der-nacht",
  "alias": [
   "Gesindel der Nacht",
   "GDN Records"
  ]
 },
 "Kollektiv Ost:West": {
  "de": "Wiener Kollektiv (KO:W), zu dessen Gründungsmitgliedern Matthias Kaiser und David Radi zählen. 2023 veranstaltete es unter dem Titel „Kollektiv Ost:West & Friends“ Raves am Badeschiff.",
  "en": "Vienna collective (KO:W) whose founding members include Matthias Kaiser and David Radi. In 2023 it hosted raves at Badeschiff under the title 'Kollektiv Ost:West & Friends'.",
  "type": [
   "Kollektiv"
  ],
  "src": [
   "https://ra.co/events/1748332",
   "https://de.ra.co/events/1672711"
  ],
  "infoChk": "2026-11-02",
  "from": "Wien",
  "noLogo": "2026-11-02"
 },
 "Soularium": {
  "de": "Wiener Partyreihe „Soularium Club“, u. a. gemeinsam mit 808Factory im PRST („Open Format Party“) und mit No Sleep Club im The Loft.",
  "en": "Vienna party series 'Soularium Club', e.g. with 808Factory at PRST ('open format party') and with No Sleep Club at The Loft.",
  "ig": "https://www.instagram.com/soularium.club/",
  "src": [
   "https://ra.co/events/1926527",
   "https://de.ra.co/events/2337976"
  ],
  "infoChk": "2026-11-02",
  "noLogo": "2026-11-02"
 },
 "euphonic records": {
  "de": "Label bzw. Musikproduktionsfirma „Euphonic“, 1997 von Ralph Kyau und Steven Möbius Albert (Kyau & Albert) gegründet.",
  "en": "Label and music production company 'Euphonic', founded in 1997 by Ralph Kyau and Steven Möbius Albert (Kyau & Albert).",
  "type": [
   "Label"
  ],
  "founded": "1997",
  "src": [
   "https://en.wikipedia.org/wiki/Kyau_%26_Albert",
   "https://preview.vinylcentric.ca/label/euphonic"
  ],
  "infoChk": "2026-11-02",
  "noLogo": "2026-11-02"
 },
 "Little Beat More": {
  "de": "Unabhängiges Label aus Wien, betrieben vom italienischen DJ/Produzenten Woxow, zugleich DJ-Kollektiv und Veranstalter von Partys mit lokalen und internationalen Gästen; Motto „We Dance We Think“.",
  "en": "Independent Vienna-based record label run by Italian DJ/producer Woxow, also a DJ collective and promoter of parties with local and international guests; motto 'We Dance We Think'.",
  "type": [
   "Label",
   "Kollektiv",
   "Promoter"
  ],
  "from": "Wien",
  "web": "https://linktr.ee/littlebeatmore",
  "bc": "https://littlebeatmore.bandcamp.com",
  "noLogo": "2026-10-31",
  "src": [
   "https://littlebeatmore.bandcamp.com/artists",
   "https://linktr.ee/littlebeatmore",
   "https://termine.orf.at/fm4/veranstaltung/little-beat-more-96753"
  ],
  "infoChk": "2026-10-31"
 },
 "created-on-earth": {
  "infoChk": "2026-11-02",
  "noLogo": "2026-11-02"
 },
 "Nine O Nine": {
  "de": "Techno-Crew (Instagram 909techno), die gemeinsam mit LSH (Les Suspects Habituels) seit 2023 die Reihe TECHNO OBSCENE im Das Werk veranstaltet – mit zwei Floors für Rave-Techno (Detroit, Hardtechno) und Groove (Dub, Hypnotic, Hardgroove).",
  "en": "Techno crew (Instagram 909techno) that has run the TECHNO OBSCENE series at Das Werk together with LSH (Les Suspects Habituels) since 2023, with two floors for rave techno (Detroit, hard techno) and groove (dub, hypnotic, hardgroove).",
  "ig": "https://instagram.com/909techno",
  "src": [
   "https://ra.co/events/1832377",
   "https://ra.co/events/2466171",
   "https://ra.co/events/2556685"
  ],
  "infoChk": "2026-11-02",
  "noLogo": "2026-11-02"
 },
 "LSH": {
  "de": "LSH (Les Suspects Habituels) ist ein Wiener Kollektiv, bekannt für die Partyreihe Techno Entgleist in der Grellen Forelle. Gemeinsam mit Nine O Nine veranstaltet es die Techno-Reihe TECHNO OBSCENE im Das Werk.",
  "en": "LSH (Les Suspects Habituels) is a Vienna collective known for its Techno Entgleist parties at Grelle Forelle. Together with Nine O Nine it co-hosts the techno series TECHNO OBSCENE at Das Werk.",
  "ig": "https://www.instagram.com/lessuspectshabituels/",
  "src": [
   "https://ra.co/events/1832377",
   "https://visitbratislava.com/events/subwave-x-les-suspects-habituels",
   "https://ra.co/events/1851260",
   "https://ra.co/events/2466171"
  ],
  "infoChk": "2026-11-02",
  "type": [
   "Kollektiv"
  ],
  "from": "Wien",
  "alias": [
   "Les Suspects Habituels"
  ],
  "noLogo": "2026-11-02"
 },
 "909techno": {
  "de": "Techno-Crew Nine O Nine (909techno), die gemeinsam mit LSH die Reihe TECHNO OBSCENE im Das Werk veranstaltet.",
  "en": "Techno crew Nine O Nine (909techno), co-hosting the TECHNO OBSCENE series at Das Werk with LSH.",
  "ig": "https://instagram.com/909techno",
  "src": [
   "https://ra.co/events/1832377",
   "https://ra.co/events/2466171"
  ],
  "infoChk": "2026-11-02",
  "noLogo": "2026-11-02"
 },
 "served": {
  "de": "Wiener Partyreihe für queere Menschen und Gleichgesinnte mit House und Techno; die Ausgabe mit Harmony Rec. × hereandthere ist die dritte.",
  "en": "Vienna party series for queer people and like-minded folks with house and techno; the edition with Harmony Rec. × hereandthere is its third.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "ig": "https://www.instagram.com/serve.ddd",
  "src": [
   "https://ra.co/events/2542405",
   "https://ra.co/promoters/157180"
  ],
  "infoChk": "2026-11-02",
  "noLogo": "2026-11-02"
 },
 "Harmony Rec.": {
  "de": "Label und Kollektiv aus Prag (heute Berlin & Prag), das seit 2014 ortsspezifische audiovisuelle Events veranstaltet und seit 2017 Platten veröffentlicht.",
  "en": "Label and collective from Prague (now Berlin & Prague) organising site-specific audiovisual events since 2014 and releasing records since 2017.",
  "type": [
   "Label",
   "Kollektiv",
   "Reihe"
  ],
  "founded": "2014",
  "from": "Prag",
  "web": "https://harmonyrec.com",
  "ig": "https://www.instagram.com/harmony_rec/",
  "sc": "https://soundcloud.com/harmony-rec",
  "bc": "https://harmonyrec.bandcamp.com",
  "noLogo": "2026-11-02",
  "src": [
   "https://harmonyrec.bandcamp.com",
   "https://harmonyrec.com",
   "https://www.hhv-mag.com/feature/how-harmony-rec-went-from-prague-off-raves-to-becoming-a-leading-name-in-european-techno/?lang=en",
   "https://ra.co/events/2542405"
  ],
  "infoChk": "2026-11-02"
 },
 "hereandthere": {
  "de": "Label aus Prag, laut RA-Eventtext eines von „two multidimensional labels from Prague“.",
  "en": "Label from Prague, described as one of 'two multidimensional labels from Prague'.",
  "type": [
   "Label"
  ],
  "from": "Prag",
  "noLogo": "2026-10-31",
  "src": [
   "https://ra.co/events/2542405",
   "https://ra.co/promoters/127072"
  ],
  "infoChk": "2026-10-31"
 },
 "technolog": {
  "infoChk": "2026-11-02",
  "de": "Wiener DJ-Kollektiv, 2012 gegründet, mit Techno von tief-harmonisch bis dunkel-industriell. Die Veranstaltungen finden vor allem im Kramladen statt, vereinzelt auch im Lucia.",
  "en": "Viennese DJ collective founded in 2012, playing techno ranging from deep and harmonic to dark and industrial. Events mostly take place at Kramladen, occasionally also at Lucia.",
  "type": [
   "Kollektiv"
  ],
  "founded": "2012",
  "from": "Wien",
  "web": "https://www.technolog.wtf",
  "ig": "https://www.instagram.com/_technolog__/",
  "sc": "https://soundcloud.com/technolog_official",
  "members": [
   "hetum",
   "ROTON",
   "anexate"
  ],
  "membersSrc": "https://www.technolog.wtf",
  "src": [
   "https://www.technolog.wtf",
   "https://ra.co/dj/roton/biography",
   "https://ra.co/events/2557226"
  ],
  "noLogo": "2026-11-02"
 },
 "Hanzom": {
  "de": "Hanzom Music ist ein deutsches Drum-&-Bass-Label mit eigenen Events, 2018 gegründet, mit Fokus auf deep, dark Drum & Bass.",
  "en": "Hanzom Music is a German drum & bass label and event brand founded in 2018, focused on deep, dark drum & bass.",
  "type": [
   "Label"
  ],
  "founded": "2018",
  "web": "https://www.hanzom.com/",
  "ig": "https://www.instagram.com/hanzom_music/",
  "sc": "https://soundcloud.com/hanzommusic",
  "noLogo": "2026-10-31",
  "src": [
   "https://ra.co/labels/18326",
   "https://ukf.com/read/get-to-know-the-deep-dark-futuristic-sound-of-hanzom-music/"
  ],
  "infoChk": "2026-10-31"
 },
 "Gassen aus Zucker": {
  "de": "DJ- and Event-Collective based in Vienna (AUT)",
  "en": "DJ- and Event-Collective based in Vienna (AUT)",
  "logo": "https://i1.sndcdn.com/avatars-000048192524-zbrypt-t500x500.jpg",
  "sc": "https://soundcloud.com/gassen-aus-zucker",
  "web": "https://gassenauszucker.at/",
  "man": 1
 },
 "Paradies Garten": {
  "logo": "https://www.paradiesgartenfestival.at/assets/website/images/logo/paradies-garten.d1836a4e.svg",
  "web": "https://www.paradiesgartenfestival.at",
  "man": 1,
  "logoBg": "#ffffff",
  "infoChk": "2026-11-02",
  "de": "Elektronik-Festival für Techno und House im Schlossgarten von Schloss Prugg in Bruck an der Leitha (ca. 30 Minuten von Wien), das unter dem Namen Paradies Garten auch Clubnächte in Wien veranstaltet, u. a. in der Grelle Forelle.",
  "en": "Electronic music festival for techno and house in the castle gardens of Schloss Prugg in Bruck an der Leitha (about 30 minutes from Vienna), which also hosts club nights in Vienna under the Paradies Garten name, including at Grelle Forelle.",
  "ig": "https://www.instagram.com/paradiesgartenfestival/",
  "src": [
   "https://www.paradiesgartenfestival.at",
   "https://www.grelleforelle.com/project/1411-paradies-garten-w-paracek/"
  ]
 },
 "Fader Friends": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Cosmic Egg": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Cyclic Existence": {
  "de": "Clubreihe im SASS Music Club (Karlsplatz) mit House, Techno und Breakbeats.",
  "en": "Club series at SASS Music Club (Karlsplatz) with house, techno and breakbeats.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "ig": "https://www.instagram.com/cyclic_existence",
  "noLogo": "2026-11-02",
  "src": [
   "https://sassvienna.com/de/programm/event/cyclic-existence-4"
  ],
  "infoChk": "2026-11-02"
 },
 "Klub Halal": {
  "de": "Queere arabische Clubnacht in Wien mit arabischem Pop und Club-Edits, Fokus auf SWANA-/nordafrikanische Artists; u. a. in FLUCC und Rhiz.",
  "en": "Queer Arab club night in Vienna with Arab pop and club edits, centring SWANA/North African artists; held at FLUCC, Rhiz and others.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "ig": "https://www.instagram.com/klubhalal",
  "tix": "https://www.tickettailor.com/events/klubhalal",
  "noLogo": "2026-10-31",
  "src": [
   "https://ra.co/events/2480563",
   "https://ra.co/events/2552786",
   "https://rainbowtime.super.site/events-database/klub-halal-magic",
   "https://www.tickettailor.com/events/klubhalal/1852704"
  ],
  "infoChk": "2026-10-31"
 },
 "Habibi Party": {
  "from": "Wien",
  "noLogo": "2026-10-31",
  "src": [
   "https://ra.co/promoters/144709",
   "https://ra.co/events/2480563",
   "https://ra.co/events/2552786"
  ],
  "infoChk": "2026-10-31"
 },
 "Köstlich": {
  "de": "Wiener Kollektiv (Kollektiv Köstlich) mit Techno- und Garage-Partys, u. a. Open-Air-Raves mit Gleis 19 und Abende im Club Lucia.",
  "en": "Viennese collective (Kollektiv Köstlich) throwing techno and garage parties, including open-air raves with Gleis 19 and nights at Club Lucia.",
  "alias": [
   "Kollektiv Köstlich"
  ],
  "type": [
   "Kollektiv"
  ],
  "from": "Wien",
  "ig": "https://www.instagram.com/kollektiv.koestlich/",
  "noLogo": "2026-11-02",
  "src": [
   "https://de.ra.co/events/2219865",
   "https://www.clublucia.at/event/kostlich-x-gurtelgroove/",
   "https://soundcloud.com/koestlich-kollektiv"
  ],
  "infoChk": "2026-11-02",
  "sc": "https://soundcloud.com/koestlich-kollektiv"
 },
 "Gürtelgroove": {
  "ig": "https://www.instagram.com/guertelgroove/",
  "noLogo": "2026-11-02",
  "src": [
   "https://www.clublucia.at/event/kostlich-x-gurtelgroove/"
  ],
  "infoChk": "2026-11-02"
 },
 "sama recordings": {
  "de": "Unabhängiges Wiener Label, 2014 von Benedikt Guschlbauer gegründet, für stilistisch offene, experimentelle elektronische Musik; veranstaltet die Reihe „s c h w e b e n“.",
  "en": "Independent Vienna label founded in 2014 by Benedikt Guschlbauer, releasing genre-free, forward-thinking electronic music; hosts the event series 's c h w e b e n'.",
  "type": [
   "Label"
  ],
  "founded": "2014",
  "from": "Wien",
  "ig": "https://www.instagram.com/sama_recordings/",
  "sc": "https://soundcloud.com/sama-recordings",
  "bc": "https://samarecordings.bandcamp.com/",
  "tix": "https://kupfticket.com/en/shops/samarecordings",
  "noLogo": "2026-11-02",
  "src": [
   "https://samarecordings.bandcamp.com/track/distant-object",
   "https://ra.co/events/2261057"
  ],
  "infoChk": "2026-11-02"
 },
 "Green Light Collective": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Queertactics": {
  "de": "Queer-feministisches Filmfestival in Wien, organisiert vom Verein zur Förderung queer_feministischer Perspektiven in Wissenschaft und Kunst; 2026 siebte Ausgabe in Stadtkino, Admiralkino und Breitenseer Lichtspielen, mit Kurzfilmpreis Goldene Medusa und einer Festival-Party mit DJs und Performances im FLUCC.",
  "en": "Queer-feminist film festival in Vienna, organised by the Verein zur Förderung queer_feministischer Perspektiven in Wissenschaft und Kunst; its seventh edition in 2026 takes place at Stadtkino, Admiralkino and Breitenseer Lichtspiele, with the Golden Medusa short-film award and a festival party with DJs and performances at FLUCC.",
  "from": "Wien",
  "web": "https://queertactics.at",
  "src": [
   "https://www.pressefeuer.at/queertactics-2025-das-festival-das-wien-verzaubert",
   "https://flucc.at/events/Ahdm47-queertactics-6/",
   "https://queertactics.at"
  ],
  "infoChk": "2026-11-02",
  "ig": "https://www.instagram.com/queertactics.at/",
  "logo": "https://queertactics.at/wp-content/uploads/2025/10/queertactics_schriftzug_rot-scaled.png"
 },
 "50 Herz": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Cybertribe": {
  "de": "Wiener Techno-Kollektiv, das seit rund 2015 Clubnächte mit internationalen Gästen veranstaltet, u. a. im Flex, in der PRST, im B72, im Opera Club und im The Loft – teils gemeinsam mit Crews wie Misguided, Mahlwerk, VNV Kollektiv oder NEXUS.",
  "en": "Vienna techno collective hosting club nights with international guests since around 2015, at venues such as Flex, PRST, B72, Opera Club and The Loft – partly together with crews such as Misguided, Mahlwerk, VNV Kollektiv or NEXUS.",
  "type": [
   "Kollektiv"
  ],
  "from": "Wien",
  "noLogo": "2026-11-02",
  "src": [
   "https://de.ra.co/events/2400422",
   "https://de.ra.co/events/2479561",
   "https://ra.co/events/2110843",
   "https://fr.ra.co/events/1781675",
   "https://ra.co/events/1636984",
   "https://ra.co/events/1834637",
   "https://de.ra.co/events/2100688",
   "https://ra.co/events/2561642"
  ],
  "infoChk": "2026-11-02",
  "founded": "2015",
  "foundedNote": 1
 },
 "Dark Pressure": {
  "de": "Techno-Label mit eigener Eventreihe in Wien (Deep, Raw, Hypnotic und Industrial Techno); erstes Label-Event „Chapter 1“ im November 2025 im Kramladen.",
  "en": "Techno label with its own event series in Vienna (deep, raw, hypnotic and industrial techno); first label event 'Chapter 1' in November 2025 at Kramladen.",
  "type": [
   "Label"
  ],
  "noLogo": "2026-11-02",
  "src": [
   "https://nl.ra.co/events/2286421"
  ],
  "infoChk": "2026-11-02"
 },
 "Dystopia Rave": {
  "de": "Rave-Reihe (auch „DYSTØPIA RAVE“) im Das Werk mit Hardtechno, Hardgroove, Schranz und Drum & Bass auf zwei Floors.",
  "en": "Rave series (also styled 'DYSTØPIA RAVE') at Das Werk with hard techno, hardgroove, schranz and drum & bass across two floors.",
  "alias": [
   "DYSTØPIA RAVE"
  ],
  "type": [
   "Reihe"
  ],
  "noLogo": "2026-11-02",
  "src": [
   "https://ra.co/events/2503283",
   "https://ra.co/events/2409498",
   "https://ra.co/events/2293673"
  ],
  "infoChk": "2026-11-02"
 },
 "Bassclub": {
  "noLogo": "2026-11-02",
  "src": [
   "https://www.theloft.at/rudebwoy-embassy-meets-bassclub-30-years-jah-power-sound/"
  ],
  "infoChk": "2026-11-02"
 },
 "Rude Bwoy Embassy": {
  "alias": [
   "Rudebwoy Embassy"
  ],
  "noLogo": "2026-11-02",
  "src": [
   "https://www.theloft.at/rudebwoy-embassy-meets-bassclub-30-years-jah-power-sound/"
  ],
  "infoChk": "2026-11-02"
 },
 "Jah Power Sound": {
  "de": "Soundsystem für Reggae, Dancehall und Dub, das 2026 mit einer Nacht im Loft 30 Jahre jamaikanische Soundsystem-Kultur feiert.",
  "en": "Reggae, dancehall and dub sound system celebrating 30 years of Jamaican sound system culture with a night at The Loft in 2026.",
  "founded": "1996",
  "foundedNote": 1,
  "noLogo": "2026-11-02",
  "src": [
   "https://www.theloft.at/rudebwoy-embassy-meets-bassclub-30-years-jah-power-sound/"
  ],
  "infoChk": "2026-11-02"
 },
 "Luv Affair": {
  "de": "Wiener Disco- und House-Kollektiv mit Heimat im FLUCC am Praterstern; 2025 feierte es sein sechsjähriges Bestehen. Veranstaltet auch Floors in der Grellen Forelle und im Mon Ami.",
  "en": "Viennese disco and house collective based at FLUCC on Praterstern; it celebrated its sixth anniversary in 2025. Also hosts floors at Grelle Forelle and Mon Ami.",
  "founded": "2019",
  "foundedNote": 1,
  "from": "Wien",
  "ig": "https://www.instagram.com/luvaffair_vienna/",
  "type": [
   "Kollektiv"
  ],
  "alias": [
   "LuvAffair"
  ],
  "noLogo": "2026-11-02",
  "src": [
   "https://de.ra.co/events/2291520",
   "https://de.ra.co/promoters/139324",
   "https://ra.co/events/2360512",
   "https://www.grelleforelle.com/project/2011-fish-market-feat-altinbas-annika-stein-gerald-vdh-luvaffair-floor/",
   "https://soundcloud.com/luvaffair_vienna",
   "https://de.ra.co/events/2234422"
  ],
  "infoChk": "2026-11-02",
  "sc": "https://soundcloud.com/luvaffair_vienna"
 },
 "Café Mondo": {
  "de": "Wiener Partyreihe, die Gast-DJs einlädt und u. a. im Tagada Club, im Funkhaus und im Espresso Burggasse stattfindet.",
  "en": "Viennese party series inviting guest DJs, held at venues such as Tagada Club, Funkhaus and Espresso Burggasse.",
  "from": "Wien",
  "alias": [
   "Cafe Mondo"
  ],
  "noLogo": "2026-11-02",
  "src": [
   "https://termine.orf.at/fm4/veranstaltung/3-years-caf-mondo-107856",
   "https://de.ra.co/events/2285862",
   "https://ra.co/events/2524100"
  ],
  "infoChk": "2026-11-02",
  "founded": "2023",
  "foundedNote": 1
 },
 "LustMusik": {
  "de": "Wiener Techno-Act und Veranstalter von Clubnächten wie „Schrille Marille“ im Rhiz.",
  "en": "Viennese techno act and promoter of club nights such as 'Schrille Marille' at Rhiz.",
  "from": "Wien",
  "noLogo": "2026-11-02",
  "src": [
   "https://de.ra.co/events/2531884"
  ],
  "infoChk": "2026-11-02"
 },
 "Superego Records": {
  "de": "Wiener Label, das Labelnights mit Live-Acts und DJ-Sets veranstaltet, etwa im Celeste.",
  "en": "Vienna-based label hosting label nights with live acts and DJ sets, for example at Celeste.",
  "from": "Wien",
  "type": [
   "Label"
  ],
  "noLogo": "2026-11-02",
  "src": [
   "https://ra.co/events/2570993",
   "https://ra.co/promoters/196842"
  ],
  "infoChk": "2026-11-02"
 },
 "TUFF": {
  "de": "Bounce-Partyreihe („Viennas bounce hub“), die unter dem Motto „Hard. Fast. TUFF.“ im Club Exil Bounce und Hardbounce spielt.",
  "en": "Bounce party series ('Vienna's bounce hub') playing bounce and hardbounce at Club Exil under the motto 'Hard. Fast. TUFF.'",
  "from": "Wien",
  "type": [
   "Reihe"
  ],
  "noLogo": "2026-11-02",
  "src": [
   "https://exil.ticket.io/nDYvo6wD/"
  ],
  "infoChk": "2026-11-02"
 },
 "Radiance": {
  "de": "Wiener Drum-&-Bass-Veranstaltung, die gemeinsam mit Drum & Bassick im Club Lucia mit lokalen DJs von Neurofunk bis Liquid spielt.",
  "en": "Viennese drum & bass event teaming up with Drum & Bassick at Club Lucia, with local DJs from neurofunk to liquid.",
  "from": "Wien",
  "ig": "https://www.instagram.com/radiance.at/",
  "noLogo": "2026-11-02",
  "src": [
   "https://www.clublucia.at/event/drum-bassick-x-radiance/"
  ],
  "infoChk": "2026-11-02"
 },
 "Kaisa Bodega": {
  "noLogo": "2026-11-02",
  "src": [
   "https://ra.co/events/2546333"
  ],
  "infoChk": "2026-11-02"
 },
 "Pingpaya Fenty Savage": {
  "noLogo": "2026-11-02",
  "src": [
   "https://ra.co/events/2546333"
  ],
  "infoChk": "2026-11-02"
 },
 "VLAN": {
  "de": "VLAN („Vienna Local Area Network“) ist ein Wiener Internetradio für zeitgenössische (Nicht-)Club-Musik mit Fokus auf die Stärkung marginalisierter Gruppen; veranstaltet u. a. die Reihe HEAVY LISTENING mit Ambient, Dub und experimenteller Elektronik.",
  "en": "VLAN ('Vienna Local Area Network') is a Viennese internet radio for contemporary (non-)club music focused on empowering marginalised groups; it hosts the HEAVY LISTENING series of ambient, dub and experimental electronics.",
  "from": "Wien",
  "ig": "https://www.instagram.com/vlan.radio/",
  "sc": "https://soundcloud.com/vlanradio",
  "alias": [
   "VLAN Radio",
   "Vienna Local Area Network"
  ],
  "noLogo": "2026-11-02",
  "src": [
   "https://ra.co/events/2568237",
   "https://www.mqw.at/en/program/vlan-radio"
  ],
  "infoChk": "2026-11-02"
 },
 "Fifi": {
  "noLogo": "2026-11-02",
  "src": [
   "https://flucc.at/events/X3Fef2-fifi-x-schrodinger-s-groove/",
   "https://flucc.at/events/nRmjtM-fifi/"
  ],
  "infoChk": "2026-11-02",
  "de": "Wiener Partyreihe (FIFI Rave) für Hardgroove, Techno und energiegeladene Sounds, u. a. im FLUCC (Deck und Wanne).",
  "en": "Vienna party series (FIFI Rave) for hardgroove, techno and high-energy sounds, held at FLUCC (Deck and Wanne) among others.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "alias": [
   "FIFI Rave"
  ],
  "ig": "https://www.instagram.com/fifi__rave"
 },
 "Schrödingers Groove": {
  "noLogo": "2026-11-02",
  "src": [
   "https://flucc.at/events/X3Fef2-fifi-x-schrodinger-s-groove/"
  ],
  "infoChk": "2026-11-02"
 },
 "Radio Rudina": {
  "de": "Unabhängiges Wiener Musik- und Kulturkollektiv mit 24/7-Webradio, Live-Shows und Events, etwa regelmäßigen Partys im PRST.",
  "en": "Independent Viennese music and culture collective running a 24/7 web radio, live shows and events, including regular parties at PRST.",
  "from": "Wien",
  "web": "https://www.radiorudina.com",
  "ig": "https://www.instagram.com/radiorudina/",
  "sc": "https://soundcloud.com/radiorudina",
  "tix": "https://radiorudina.ticket.io/",
  "logoBg": "#000000",
  "type": [
   "Kollektiv"
  ],
  "logo": "https://images.squarespace-cdn.com/content/v1/6847ea8642e80a7c5234842b/3f2e1a87-f2d6-48f5-ae0a-3fe153e5b704/Radio+Rudina+Logo+wei%C3%9F+og1.png?format=1500w",
  "src": [
   "https://www.radiorudina.com",
   "https://de.ra.co/promoters/146609",
   "https://radiorudina.ticket.io/sbEA0Me0/"
  ],
  "infoChk": "2026-11-02"
 },
 "Club Pompadour": {
  "noLogo": "2026-11-02",
  "src": [
   "https://sassvienna.com/en/events/event/club-pompadour-november",
   "https://sassvienna.com/en/events/event/pompadour",
   "https://sassvienna.com/de/programm/event/club-pompadour-3",
   "https://ra.co/events/124374",
   "https://de.ra.co/events/1550690"
  ],
  "infoChk": "2026-11-02",
  "de": "Wiener Clubreihe rund um die Residents Thomas Grün und Philipp Blecha, belegt seit mindestens 2009 (damals in der Pratersauna), heute regelmäßig im SASS Music Club. Musikalisch House und Grooves.",
  "en": "Vienna club series built around residents Thomas Grün and Philipp Blecha, documented since at least 2009 (then at Pratersauna), now held regularly at SASS Music Club. Musically house and grooves.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "ig": "https://www.instagram.com/pompadourist"
 },
 "Raqsouna": {
  "de": "Von Qamareen (Luna Al-Mousli) gegründete Wiener Partyreihe („Raqsouna – Make Us Dance!“) mit Musik und Musiker:innen aus der SWANA-Region und darüber hinaus, die die BIPOC-Diaspora feiern und einen achtsamen Raum bieten will; mit Live-Acts und den Residents Qamareen und Abu Naima u. a. im Club Lucia und im Flucc.",
  "en": "Vienna party series ('Raqsouna – Make Us Dance!') founded by Qamareen (Luna Al-Mousli), focused on music and musicians from the SWANA region and beyond, aiming to celebrate the BIPOC diaspora in a caring space; with live acts and residents Qamareen and Abu Naima at venues such as Club Lucia and Flucc.",
  "from": "Wien",
  "type": [
   "Reihe"
  ],
  "noLogo": "2026-11-02",
  "src": [
   "https://de.ra.co/dj/qamareen/biography",
   "https://ra.co/events/2561086",
   "https://tzkrti.com/en/events/3787",
   "https://tzkrti.com/profile/raqsouna"
  ],
  "infoChk": "2026-11-02"
 },
 "MEIOSISS": {
  "de": "MEIOSISS veranstaltet im FLUCC die Techno-Flirtparty „Hot & Flirty“ mit Flirt-Armbändern und Konsens-Fokus („only YES means YES“) und legt dort auch selbst auf.",
  "en": "MEIOSISS hosts the techno flirt party 'Hot & Flirty' at FLUCC, with flirt wristbands and a focus on consent ('only YES means YES'), and also DJs there.",
  "from": "Wien",
  "noLogo": "2026-11-02",
  "src": [
   "https://ra.co/events/2561330",
   "https://ra.co/events/2388587",
   "https://ra.co/events/2310895"
  ],
  "infoChk": "2026-11-02"
 },
 "Derisch": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Bonkers": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Belly Dance Services": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Österreichisches Plattenlabel, laut RA 2018 gegründet und vom Wiener DJ/Produzenten Nick Hanzo mitbetrieben. Nach eigener Beschreibung will das Label Menschen zum Tanzen bringen; veröffentlicht u. a. Funboys, ID_UA, Cornelius Doctor und reFelt.",
  "en": "Austrian record label, founded in 2018 according to RA and co-run by Vienna DJ/producer Nick Hanzo. By its own description the label aims to get people moving; its roster includes Funboys, ID_UA, Cornelius Doctor and reFelt.",
  "type": [
   "Label"
  ],
  "founded": "2018",
  "bc": "https://bellydanceservices.bandcamp.com",
  "src": [
   "https://ra.co/labels/16175",
   "https://jericho.orf.at/soundpark/n/nickhanzo/main"
  ]
 },
 "AMBIEVENT": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Das Syndikat": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Sub Zero": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Techno-Reihe unter dem Motto „Vienna meets Berlin“ im The Loft, die Berliner Techno-Acts mit der dunkleren, rohen Seite der Wiener Szene zusammenbringt – treibende Kicks, düstere Atmosphäre, kein Mainstream.",
  "en": "Techno series under the motto 'Vienna meets Berlin' at The Loft, bringing Berlin techno acts together with the darker, raw side of the Vienna scene – driving kicks, dark atmospheres, no mainstream.",
  "alias": [
   "SUBZERO"
  ],
  "src": [
   "https://www.theloft.at/sub-zero/",
   "https://ra.co/events/2550352"
  ]
 },
 "Tanz dich glücklich": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Feel-Good-Partyreihe, die es seit 2018 gibt. Gespielt wird alles zwischen groovy House und schnellem Bounce, teils mit Live-Saxophon; Motto „Come as you are!“. Veranstaltungsort u. a. das FLUCC Deck.",
  "en": "Feel-good party series running since 2018. The music spans everything from groovy house to fast bounce, sometimes with live saxophone; motto: 'Come as you are!'. Venues include FLUCC Deck.",
  "type": [
   "Reihe"
  ],
  "founded": "2018",
  "ig": "https://www.instagram.com/tanzdichgluecklich/",
  "src": [
   "https://flucc.at/events/iXY45x-tanz-dich-glucklich/"
  ]
 },
 "Vision Serpent": {
  "de": "Techno-Label aus Österreich zwischen Techno, Minimal und Psytech, kuratiert von Gründer David Phoenix; veranstaltet auch Label-Showcases.",
  "en": "Austrian techno label bridging techno, minimal and psytech, curated by founder David Phoenix; also hosts label showcases.",
  "type": [
   "Label"
  ],
  "from": "Österreich",
  "web": "https://visionserpentrecords.com",
  "ig": "https://www.instagram.com/visionserpentrecords",
  "bc": "https://visionserpentrecords.bandcamp.com",
  "logo": "https://ugc.production.linktr.ee/c93e2304-592a-41c3-80c5-fd1e533ca7e4_VS-LOGO-4000-centered-b.png?io=true&size=avatar-v3_0",
  "src": [
   "https://de.ra.co/labels/22834",
   "https://linktr.ee/visionserpentrecords"
  ],
  "infoChk": "2026-11-02"
 },
 "Synergy": {
  "de": "Partyreihe „SYNERGY RAVE“ mit Trance und Hard Techno im Werk, veranstaltet von KARTELL.FM.",
  "en": "Party series “SYNERGY RAVE” with trance and hard techno at Das Werk, run by KARTELL.FM.",
  "alias": [
   "SYNERGY RAVE"
  ],
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "tix": "https://synergy.kartell.fm",
  "src": [
   "https://de.ra.co/events/2445175"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "KARTELL.FM": {
  "de": "Wiener Veranstalter hinter der Reihe SYNERGY RAVE (Trance und Hard Techno) im Werk.",
  "en": "Vienna-based organiser behind the SYNERGY RAVE series (trance and hard techno) at Das Werk.",
  "from": "Wien",
  "web": "https://kartell.fm",
  "ig": "https://instagram.com/kartell.fm",
  "series": [
   "Synergy"
  ],
  "src": [
   "https://de.ra.co/events/2445175",
   "https://kartell.fm"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "HEKTISCH": {
  "de": "Wiener Crew, die bei SYNERGY RAVE im Werk einen eigenen Floor gestaltet.",
  "en": "Vienna crew hosting its own floor at SYNERGY RAVE at Das Werk.",
  "from": "Wien",
  "ig": "https://instagram.com/hektisch.vie",
  "src": [
   "https://de.ra.co/events/2445175"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "GLITCH": {
  "web": "https://www.enter-glitch.com/",
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "techNOage": {
  "de": "Monatliches Techno-Clubbing am Nachmittag ab 15 Uhr, das Inklusion und Begegnung zwischen Generationen fördert – für Senior:innen, Menschen mit Behinderung, Eltern sowie frühere und heutige Raver:innen. Veranstaltet von Vier::tel Vienna (vierviertelvienna) und SNDR_Xone, u. a. im FLUCC (Deck/Wanne); Eintritt auch nach dem Prinzip „pay what you can“.",
  "en": "Monthly afternoon techno clubbing from 3 pm promoting inclusion and intergenerational encounters – for seniors, people with disabilities, parents and past and present ravers. Run by Vier::tel Vienna (vierviertelvienna) and SNDR_Xone, held at FLUCC (Deck/Wanne) among others; admission also on a pay-what-you-can basis.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "src": [
   "https://ra.co/events/2325124",
   "https://ra.co/promoters/133764",
   "https://www.1000thingsmagazine.com/de/a/1180209/vierviertel-vienna-techno-inklusion/"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Art Attech": {
  "de": "Wiener Event-Reihe „Kunst küsst Techno“ im FLUCC, die eine Kunst-Vernissage (Ausstellung, Performances, Artist Talks, Live- und Mitmach-Painting) mit einem anschließenden Techno-Rave verbindet; ein Teil der Einnahmen geht an die ausstellenden Künstler:innen. Ausgabe #9 fand im November 2024, #10 im Jänner 2025 statt, 2026 folgte die 14. Ausgabe.",
  "en": "Vienna event series “Kunst küsst Techno” (art kisses techno) at FLUCC, combining an art vernissage (exhibition, performances, artist talks, live and participatory painting) with a techno rave afterwards; part of the proceeds goes to the exhibiting artists. Edition #9 took place in November 2024, #10 in January 2025, followed by the 14th edition in 2026.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "ig": "https://www.instagram.com/artattechwien/",
  "src": [
   "https://flucc.at/events/hnXWhA-art-attech/",
   "https://ra.co/events/2076746",
   "https://de.ra.co/events/2028150"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "54Hz": {
  "de": "Partyreihe von Stay Acid im Das Werk (Wien), mindestens seit 2025, mit Bounce, Hard Bounce und Hard Techno.",
  "en": "Party series by Stay Acid at Das Werk (Vienna), running since at least 2025, featuring bounce, hard bounce and hard techno.",
  "from": "Wien",
  "src": [
   "https://ra.co/events/2464385",
   "https://de.ra.co/events/2169452",
   "https://ra.co/events/2415040"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "type": [
   "Reihe"
  ]
 },
 "CPE": {
  "de": "Wiener Party-Crew, die seit 2006 Partys veranstaltet und 2026 im Club Exil ihr 20-jähriges Bestehen feiert.",
  "en": "Vienna party crew throwing parties since 2006, celebrating its 20th anniversary at Club Exil in 2026.",
  "founded": "2006",
  "foundedNote": 1,
  "from": "Wien",
  "src": [
   "https://www.club-exil.at/en"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Triple A Events": {
  "de": "Wiener Veranstalter (auch „AAA Events“) mit der Eventmarke „Access Another Atmosphere“ für Trance, Melodic Techno und verwandte Sounds, u. a. im Club Exil und im Prater Dome.",
  "en": "Vienna-based organiser (also “AAA Events”) behind the event brand “Access Another Atmosphere”, focusing on trance, melodic techno and related sounds, e.g. at Club Exil and Prater Dome.",
  "alias": [
   "AAA Events"
  ],
  "from": "Wien",
  "web": "https://www.aaa-events.at/",
  "series": [
   "Access Another Atmosphere"
  ],
  "src": [
   "https://www.aaa-events.at/",
   "https://ra.co/events/2546243"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Flashback": {
  "de": "Partyreihe mit Techno-Klassikern („Techno Classics“) in der Grellen Forelle, mit Sommer-Ausgaben und mehreren Floors. 2026 gab es zudem ein Free-Open-Air-Special gemeinsam mit „Techno am Wasser“.",
  "en": "Party series dedicated to techno classics at Grelle Forelle, with summer editions and multiple floors. In 2026 it also held a free open-air special together with 'Techno am Wasser'.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "src": [
   "https://www.regioactive.de/party/flashback-techno-classics-summer-edition-grelle-forelle-vienna-wien-2026-08-29-Qqy0cZsYRy",
   "https://de.ra.co/events/2391499",
   "https://ra.co/events/2456825"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "tix": "https://flashback.ticket.io/"
 },
 "FactX": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Frieden & Liebe": {
  "de": "Wiener Kollektiv hinter der Reihe VIVID im SASS Music Club, die für eklektischen, genreübergreifenden House steht.",
  "en": "Vienna collective behind the VIVID series at SASS Music Club, standing for eclectic, genre-crossing house.",
  "type": [
   "Kollektiv"
  ],
  "from": "Wien",
  "ig": "https://www.instagram.com/friedenundliebe.vienna",
  "series": [
   "Vivid"
  ],
  "src": [
   "https://sassvienna.com/de/programm/event/vivid-w-frieden-liebe"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "High Voltage Fairies": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Ninecircles": {
  "de": "Partyreihe für Techno und Industrial im Werk – „ein kompromissloser Trip in den Underground“.",
  "en": "Techno and industrial party series at Das Werk – “an uncompromising trip into the underground”.",
  "alias": [
   "Nine Circles"
  ],
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "src": [
   "https://ra.co/events/2473498"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Switch!": {
  "de": "Drum-&-Bass-Veranstalter, der internationale Acts ins Flex holt (z. B. Subsonic Frequencies × MAZE, Primate).",
  "en": "Drum & bass promoter bringing international acts to Flex (e.g. Subsonic Frequencies × MAZE, Primate).",
  "from": "Wien",
  "tix": "https://switch.ticket.io/",
  "src": [
   "https://ra.co/events/2340564"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Cardio Cult": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "de": "Wiederkehrende Clubnacht im SASS Music Club in Wien, auf RA mit mehreren Ausgaben gelistet.",
  "en": "Recurring club night at SASS Music Club in Vienna, with several editions listed on RA.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "src": [
   "https://de.ra.co/dj/magsi",
   "https://de.ra.co/dj/leondiamant"
  ]
 },
 "Spectral": {
  "de": "Techno-Reihe im Wiener Kramladen mit internationalen und österreichischen Gästen, u. a. Kollaborationen mit Crews wie Sonic Spinz (Innsbruck); musikalisch zwischen Acid, melodischem und treibendem Techno. Veranstaltungen 2026 meist bei freiem Eintritt.",
  "en": "Techno series at Vienna's Kramladen featuring international and Austrian guests, including collaborations with crews such as Sonic Spinz (Innsbruck); musically between acid, melodic and driving techno. Events in 2026 mostly free entry.",
  "type": [
   "Reihe"
  ],
  "src": [
   "https://ra.co/events/2573844",
   "https://de.ra.co/events/2416037",
   "https://de.ra.co/dj/alenanoctis"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "S.O.U.L.": {
  "de": "Wiener Verein, der unter dem Titel „S.O.U.L. Utopia“ sexpositive Partynächte veranstaltet, im November 2026 bereits zum 56. Mal. Laut eigener Website will S.O.U.L. „alle Menschen in (Selbst)liebe zusammenführen und das Leben zelebrieren“. Der Fokus liegt auf einvernehmlichen Begegnungen und gemeinsamem Tanzen; der Veranstaltungsort wird erst mit dem Ticket bekanntgegeben.",
  "en": "Viennese association hosting sex-positive party nights under the title 'S.O.U.L. Utopia', reaching its 56th edition in November 2026. According to its website, S.O.U.L. aims to 'bring all people together in (self-)love and celebrate life'. The focus is on consensual encounters and dancing together; the venue is only revealed with the ticket.",
  "type": [
   "Promoter"
  ],
  "from": "Wien",
  "alias": [
   "S.O.U.L. Utopia",
   "SOUL Events"
  ],
  "web": "https://www.soul-events.at/",
  "ig": "https://www.instagram.com/s.o.u.l.events/",
  "logo": "https://www.soul-events.at/wp-content/uploads/2023/02/cropped-Logo_regenbogenkreis-min.jpg",
  "src": [
   "https://www.soul-events.at/",
   "https://sexpositives.com/en/events/soul-utopia-wild-things-wien-2026-11-13/"
  ],
  "infoChk": "2026-11-02"
 },
 "Tanz oder gar nicht": {
  "de": "Wiener Techno-Partyreihe, u. a. im FLUCC Deck; veranstaltete im Oktober 2026 gemeinsam mit Sorry Mom die Nacht „TOGAther“ im Kramladen.",
  "en": "Vienna techno party series, held at venues such as FLUCC Deck; co-hosted the night 'TOGAther' with Sorry Mom at Kramladen in October 2026.",
  "ig": "https://www.instagram.com/tanzodergarnicht.xyz/",
  "src": [
   "https://de.ra.co/events/2521255",
   "https://flucc.at/events/JeJdYy-tanzodergarnicht/"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "VG+": {
  "de": "Wiener House-Kollektiv, das im Dezember 2026 erstmals gemeinsam mit Housetiere einen Weekender im Tagada (Courtyard, Club) und in der Soulkitchen veranstaltet.",
  "en": "Vienna house collective that teams up with Housetiere for the first time in December 2026 for a weekender at Tagada (courtyard, club) and Soulkitchen.",
  "type": [
   "Kollektiv"
  ],
  "ig": "https://www.instagram.com/very.good.plus/",
  "src": [
   "https://ra.co/events/2567885"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Tribal Vibes": {
  "de": "Psytrance-Veranstalter, der nach eigener Ankündigung „den authentischen Old-School-Psychedelic-Spirit zurück nach Wien“ bringen will. Veranstaltungsort u. a. der Club Exil („Tribal Vibes meets Exil“).",
  "en": "Psytrance promoter that, in its own words, aims to bring 'the authentic old-school psychedelic spirit back to Vienna'. Venues include Club Exil ('Tribal Vibes meets Exil').",
  "type": [
   "Promoter"
  ],
  "ig": "https://www.instagram.com/tribalvibes3/",
  "src": [
   "https://ra.co/events/2560058"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Tropical Thunder": {
  "de": "Wiener Partyreihe mit tropischen und balearischen Sounds – von Vintage-Südafrika, Karibik, Compas, Soca, Afrobeat und Tropicália bis Retro-Zouk, French Boogie und Indie Dance. Seit mindestens 2020 aktiv, u. a. in der Gönnerbar, im FLUCC, in der Pratersauna, am Porto Pollo (Open Air) und im Funkhaus; das Format „Noche d'Amore“ entstand 2025 für die Wiener Festwochen.",
  "en": "Vienna party series built around tropical and Balearic sounds – from vintage South African, Caribbean, compas, soca, afrobeat and tropicália to retro zouk, French boogie and indie dance. Active since at least 2020 at venues such as Gönnerbar, FLUCC, Pratersauna, Porto Pollo (open air) and Funkhaus; its 'Noche d'Amore' format was created in 2025 for the Wiener Festwochen.",
  "from": "Wien",
  "src": [
   "https://ra.co/events/2568201",
   "https://ra.co/events/1291997",
   "https://de.ra.co/events/2234391",
   "https://de.ra.co/events/1805502",
   "https://ra.co/events/2225282",
   "https://ra.co/events/2305457"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Untz Baby Untz": {
  "ig": "https://www.instagram.com/untz.baby.untz/",
  "de": "Day-Rave-Reihe in Wien; am 6. Dezember 2026 findet im Funkhaus das erste Indoor-Event statt.",
  "en": "Day-rave series in Vienna; its first indoor event takes place at Funkhaus on 6 December 2026.",
  "src": [
   "https://ra.co/events/2568943",
   "https://ra.co/promoters/192705"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Resonance Social Artists": {
  "de": "Crew aus Mailand, befreundet mit der Reihe GLITCH; LLo (IT) von Resonance Social Artists spielt im Dezember 2026 bei GLITCH Vienna im The Loft.",
  "en": "Milan-based crew, friends of the GLITCH series; LLo (IT) of Resonance Social Artists plays GLITCH Vienna at The Loft in December 2026.",
  "from": "Mailand",
  "src": [
   "https://www.theloft.at/glitch-vienna-pres-stef-davidse/"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Titti Queer Club": {
  "de": "Queere Partyreihe in Wien („Titti Titti Bang Bang“), die sich als Safe Space für queere Gäste und offene Bühne für queere Künstler:innen versteht. Drei Floors mit Pop, Rock und Techno, dazu Drag-Shows und Performances, u. a. im The Loft. Alle Geschlechter willkommen, keine Toleranz für Diskriminierung.",
  "en": "Queer party series in Vienna ('Titti Titti Bang Bang') positioning itself as a safe space for queer guests and an open stage for queer artists. Three floors of pop, rock and techno plus drag shows and performances, e.g. at The Loft. All genders welcome, no tolerance for discrimination.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "alias": [
   "Titti Titti Bang Bang",
   "Titty Titty Bang Bang",
   "TTBB"
  ],
  "web": "https://www.ttbb.at/",
  "ig": "https://www.instagram.com/tittitittibangbang/",
  "logo": "https://www.ttbb.at/wp-content/uploads/2026/03/Schriftzug-weiss.svg",
  "logoBg": "#000000",
  "src": [
   "https://www.ttbb.at/",
   "https://www.theloft.at/titti-titti-bang-bang-14/",
   "https://www.1000thingsmagazine.com/de/a/2045907/sex-positive-partys-wien/"
  ],
  "infoChk": "2026-11-02"
 },
 "Taktgefühl": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Liminal": {
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Ausländer Haus": {
  "de": "Wiener Partyreihe mit multikulturellem Fokus: Afro House, Latin und orientalische Beats, aufgelegt von DJs aus dem Globalen Süden (u. a. Chile, Ägypten, Uganda, Indien, Nigeria). Stationen u. a. Cafe Derwisch Partykeller, FLUCC und Celeste; mittlerweile über 20 Ausgaben.",
  "en": "Vienna party series with a multicultural focus: Afro house, Latin and oriental beats, played by DJs from the Global South (including Chile, Egypt, Uganda, India and Nigeria). Held at Cafe Derwisch Partykeller, FLUCC and Celeste, among others; now past its 20th edition.",
  "type": [
   "Reihe"
  ],
  "from": "Wien",
  "src": [
   "https://de.ra.co/events/2047416",
   "https://es.ra.co/events/2384429",
   "https://de.ra.co/events/2290782"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 }
};
const VI={
 "Coco Bar": {
  "de": "Bar in den Stadtbahnbögen am Lerchenfelder Gürtel mit gelegentlichen DJ- und Listening-Abenden.",
  "en": "Bar in the railway arches on Lerchenfelder Gürtel with occasional DJ and listening nights.",
  "io": [
   "Indoor"
  ],
  "src": [
   "https://ra.co/events/2573316"
  ]
 },
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
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
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
  "infoChk": "2026-10-31",
  "logo": "https://imgproxy.ra.co/_/quality:66/h:180/w:180/extend:1/rt:fill/enlarge:1/aHR0cHM6Ly9zdGF0aWMucmEuY28vaW1hZ2VzL2NsdWJzL2F0LXdlcmsuanBnP2RhdGVVcGRhdGVkPTE2NTY5NDc0NzkyOTc=",
  "man": 1
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
  "infoChk": "2026-10-31",
  "logo": "https://imgproxy.ra.co/_/quality:66/h:180/w:180/extend:1/rt:fill/enlarge:1/aHR0cHM6Ly9zdGF0aWMucmEuY28vaW1hZ2VzL2NsdWJzL2ZsdWNjLnBuZz9kYXRlVXBkYXRlZD0xNzIyODY4Mzk5NDMz"
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
  "infoChk": "2026-10-31",
  "logo": "https://imgproxy.ra.co/_/quality:66/h:180/w:180/extend:1/rt:fill/enlarge:1/aHR0cHM6Ly9zdGF0aWMucmEuY28vaW1hZ2VzL2NsdWJzL2ZsdWNjLnBuZz9kYXRlVXBkYXRlZD0xNzIyODY4Mzk5NDMz"
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
  "alias": ["Praterstraße", "Club Praterstraße"],
  "opened": "2020",
  "de": "Club Praterstraße (PRST), House- und Techno-Club in der Leopoldstadt.",
  "en": "Club Praterstraße (PRST), house and techno club in Leopoldstadt.",
  "src": [
   "https://ohschonhell.at/orte/praterstrasse+-+prst/912",
   "https://www.wien.info/de/essen-trinken/bars-clubs/clubs-discos/praterstrasse-421558",
   "https://www.lewitt-audio.com/blog/PRST-audio-experience"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ],
  "web": "https://www.praterstrasse.wien/",
  "infoChk": "2026-10-31",
  "logo": "https://imgproxy.ra.co/_/quality:66/h:180/w:180/extend:1/rt:fill/enlarge:1/aHR0cHM6Ly9zdGF0aWMucmEuY28vaW1hZ2VzL2NsdWJzL3Byc3RfcmFfbG9nb196ZWljaGVuZmxhLWNoZS0xLnBuZz9kYXRlVXBkYXRlZD0xNzc0NTM1MzAzNTkw",
  "man": 1
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
  ],
  "infoChk": "2026-10-31"
 },
 "Kramladen": {
  "opened": "2015",
  "de": "Kleiner Club im U-Bahnbogen am Lerchenfelder Gürtel.",
  "en": "Small club in the U-Bahn arches on Lerchenfelder Gürtel.",
  "src": [
   "https://ohschonhell.at/orte/kramladen/549",
   "https://ra.co/events/2475933",
   "https://wien.info/en/dine-drink/bars-clubs/nightlife-under-subway-354334"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ],
  "infoChk": "2026-10-31"
 },
 "Celeste": {
  "opened": "2014",
  "de": "Bar und Club in Margareten, Fr/Sa DJs und Live-Acts bis 6 Uhr.",
  "en": "Bar and club in Margareten, Fri/Sat DJs and live acts until 6am.",
  "src": [
   "https://ohschonhell.at/orte/celeste/47",
   "https://www.technoairlines.com/club/celeste-vienna",
   "https://www.theviennareview.at/food-drink/1745/celeste"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ],
  "infoChk": "2026-10-31"
 },
 "Weberknecht": {
  "web": "https://weberknecht.at/",
  "src": [
   "https://ohschonhell.at/orte/weberknecht/28",
   "https://weberknecht.at/",
   "https://www.vienna.at/der-groe-grtel-check/1671483"
  ],
  "logo": "https://weberknecht.at/wp-content/uploads/2018/06/cropped-grunge-plus-1-270x270.png",
  "io": [
   "Indoor"
  ],
  "infoChk": "2026-11-02",
  "de": "Bar und Club am Lerchenfelder Gürtel, eine Institution, in der viele junge Musiker*innen ihre ersten Schritte gemacht haben; Partys werden oft von wechselnden Veranstalter*innen ausgerichtet, im Sommer gibt es einen Garten abseits des Gürtellärms.",
  "en": "Bar and club on Lerchenfelder Gürtel, an institution where many young musicians took their first steps; parties are often run by changing organisers, and in summer there is a garden away from the Gürtel noise.",
  "floors": [
   "Floor 1",
   "Down Under"
  ]
 },
 "Tagada": {
  "src": [
   "https://ohschonhell.at/orte/tagada+club/951",
   "https://goodnight.at/locations/tagada-club",
   "https://frey-tag.at/locations/tagada",
   "https://de.ra.co/events/2501222"
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
  ],
  "infoChk": "2026-10-31"
 },
 "Club Lucia": {
  "web": "https://www.clublucia.at/",
  "src": [
   "https://ohschonhell.at/orte/club+lucia/963",
   "https://www.clublucia.at/",
   "https://ra.co/news/83353",
   "https://www.1000thingsmagazine.com/de/a/2153427/wien-hat-einen-neuen-club-in-den-stadtbahnboegen/",
   "https://www.technoairlines.com/club/club-lucia-vienna"
  ],
  "logo": "https://www.clublucia.at/wp-content/uploads/2025/05/LUCIA-FINAL-white-1-1024x968.png",
  "io": [
   "Indoor"
  ],
  "de": "Live-Musik- und Club-Location in den Stadtbahnbögen 24/25 am Gürtel (1080, nahe U6 Thaliastraße), seit August 2025 – Konzerte unter der Woche, am Wochenende Clubnächte mit House, Techno und Drum & Bass.",
  "en": "Live music and club venue in railway arches 24/25 on the Gürtel (1080, near U6 Thaliastraße), open since August 2025 – concerts on weeknights, club nights with house, techno and drum & bass at weekends.",
  "opened": "2025",
  "infoChk": "2026-10-31"
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
  ],
  "infoChk": "2026-10-31",
  "residents": [
   "Albin Brezlan"
  ],
  "resSrc": [
   "https://ra.co/dj/albinbrezlan/biography"
  ]
 },
 "Libelle": {
  "web": "https://www.libelle.at/",
  "logo": "https://www.libelle.at/wp-content/uploads/2024/03/cropped-Libelle_Logo-270x270.png",
  "src": [
   "https://www.libelle.at/",
   "https://www.1000thingsmagazine.com/de/a/2045907/sex-positive-partys-wien/"
  ],
  "infoChk": "2026-11-02",
  "de": "Sexpositiver Ort in der Tellgasse im Nibelungenviertel (Rudolfsheim-Fünfhaus), früher „Schwelle Wien“: regelmäßige Workshops rund um Sexualität sowie Partys, die sexuellen Begegnungen offenstehen. Grundregel: „Alles außer ein enthusiastisches Ja ist ein Nein.“",
  "en": "Sex-positive space on Tellgasse in the Nibelungenviertel (Rudolfsheim-Fünfhaus), formerly \"Schwelle Wien\": regular workshops on sexuality and parties open to sexual encounters. Core rule: \"Anything but an enthusiastic yes is a no.\"",
  "io": [
   "Indoor"
  ],
  "alias": ["Schwelle Wien"]
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
  "ioMain": "Outdoor",
  "floors": [
   "Kulturdeck",
   "Salon",
   "Sonnendecks"
  ],
  "logo": "https://assets-s3.welocally.at/shrine/store/fdb7dbe8a7bf036d6f0ac22885b8b3d2.png",
  "web": "https://amwasser.wien",
  "man": 1
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
   "https://o-klub.at/events/pyramide-takeover/",
   "https://www.conferencehotelgroup.com/hotels/299/Eventhotel-Pyramide---Congress-Center",
   "https://warda.at/events/signal-festival-pyramide-takeover-we2/"
  ],
  "io": [
   "Indoor"
  ],
  "de": "Glaspyramide des Eventhotels Pyramide in Vösendorf am südlichen Stadtrand von Wien, neben der Shopping City Süd; die große Event-Halle wird gelegentlich für große Clubevents genutzt.",
  "en": "Glass pyramid of the Eventhotel Pyramide in Vösendorf on Vienna's southern edge, next to Shopping City Süd; its large event hall occasionally hosts big club events.",
  "alias": ["Eventhotel Pyramide"],
  "floors": [
   "Main",
   "Hard Techno Stage"
  ],
  "noLogo": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "Flex": {
  "src": [
   "https://flex.at/event/the-hive-x-collapse/",
   "https://www.wien.info/de/essen-trinken/bars-clubs/clubs-discos/flex-346082",
   "https://www.profil.at/kultur/warum-wien-kult-location-flex-378184",
   "https://www.fast-and-wide.com/faw-news/fast-news/17647-vienna-s-flex",
   "https://www.technoairlines.com/club/flex-vienna"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor",
   "Outdoor"
  ],
  "de": "Kult-Club in einem stillgelegten U-Bahn-Tunnel am Donaukanal bei der Augartenbrücke; 1990 gegründet, seit 1995 am heutigen Standort – bekannt für Drum & Bass, Techno und Konzerte, mit Flex Café und Platz am Kanalufer.",
  "en": "Cult club in a disused underground tunnel on the Danube Canal by the Augartenbrücke; founded in 1990, at its current site since 1995 – known for drum & bass, techno and concerts, with the Flex Café and space on the canal bank.",
  "web": "https://flex.at/",
  "opened": "1990",
  "floors": [
   "Main Floor",
   "Flex Café"
  ],
  "infoChk": "2026-10-31"
 },
 "Ottakringer Brauerei": {
  "src": [
   "https://warda.at/events/ksot-halloween-warehouse-rave/",
   "https://meeting.vienna.info/en/event-planning/venue-finder/ottakringer-eventlocation-454394"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor",
   "Outdoor"
  ],
  "floors": [
   "Hefeboden",
   "Alte Technik"
  ],
  "de": "Traditionsbrauerei in Ottakring, deren historische Brauereiräume (u. a. Hefeboden, Alte Technik) als Eventlocation für Firmen- und Privatfeiern, Seminare und Clubbings genutzt werden; dazu ein rund 1.000 m² großer Außenbereich.",
  "en": "Traditional brewery in Ottakring whose historic brewing halls (incl. Hefeboden, Alte Technik) serve as an event venue for corporate and private events, seminars and club nights, plus an outdoor area of around 1,000 m².",
  "web": "https://www.ottakringerbrauerei.at",
  "infoChk": "2026-10-31"
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
   "https://ra.co/events/2506486",
   "https://www.u4.at/",
   "https://www.technoairlines.com/club/u4-vienna",
   "https://www.wien.info/en/dine-drink/bars-clubs/clubs-discos/u4-362190"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ],
  "de": "Traditionsreicher Kellerclub in Meidling an der Schönbrunner Straße, seit den frühen 1980ern eine Institution des Wiener Nachtlebens. Zwei Dancefloors (Main Floor und Club Floor) mit Clubnächten und Partyreihen.",
  "en": "Long-running basement club in Meidling on Schönbrunner Straße, an institution of Vienna nightlife since the early 1980s. Two dancefloors (Main Floor and Club Floor) hosting club nights and party series.",
  "web": "https://www.u4.at/",
  "floors": [
   "Main Floor",
   "Club Floor"
  ],
  "infoChk": "2026-11-02",
  "opened": "1980"
 },
 "Funkhaus": {
  "src": [
   "https://ra.co/events/2547379",
   "https://www.vienna.at/funkhaus-in-wien-wieden-verwandelt-sich-in-gratzlhub/9297596",
   "https://www.weekend.at/de/projekt/funkhaus-vienna-s-got-a-new-rhythm/OBGC202509241453541414ebd8086ac",
   "https://www.leadersnet.at/news/87908,das-traditionsreiche-funkhaus-in-wien-wird-neugestaltet.html"
  ],
  "noLogo": "2026-10-28",
  "io": [
   "Indoor"
  ],
  "de": "Ehemaliges, denkmalgeschütztes ORF-Funkhaus (1930) in der Argentinierstraße auf der Wieden, das zum offenen Kulturhub mit Konzert- und Veranstaltungsräumen, Gastronomie, Ateliers und Studios umgebaut wird; die Sendesäle bleiben ORF-Veranstaltungen vorbehalten.",
  "en": "Former listed ORF broadcasting house (1930) on Argentinierstraße in Wieden, being converted into an open cultural hub with concert and event spaces, gastronomy, studios and ateliers; the broadcast halls remain in use for ORF events.",
  "alias": ["ORF-Funkhaus", "Funkhaus Wien"],
  "infoChk": "2026-11-02",
  "web": "https://www.funkhaus.wien"
 },
 "Rhiz": {
  "src": [
   "https://ra.co/events/2563381",
   "https://rhiz.wien/blog/",
   "https://www.wien.info/de/essen-trinken/bars-clubs/live-locations/rhiz-356666",
   "https://wien.info/en/dine-drink/bars-clubs/nightlife-under-subway-354334"
  ],
  "logo": "https://rhiz.wien/wp-content/uploads/2026/01/cropped-favicon-270x270.png",
  "io": [
   "Indoor"
  ],
  "de": "Bar und Live-Location in den Stadtbahnbögen 37–38 am Lerchenfelder Gürtel (1080) – Wiens Anlaufstelle für avancierte Elektronik und experimentellen Rock, mit Konzerten unter der Woche und DJ-Abenden am Wochenende.",
  "en": "Bar and live venue in railway arches 37–38 on the Lerchenfelder Gürtel (1080) – Vienna's hub for advanced electronic music and experimental rock, with concerts during the week and DJ nights at weekends.",
  "web": "https://rhiz.wien/",
  "infoChk": "2026-10-31"
 },
 "kv.r.": {
  "src": [
   "https://ra.co/events/2564492"
  ],
  "noLogo": "2026-10-28",
  "infoChk": "2026-11-01"
 },
 "Kollektiv Kaorle": {
  "src": [
   "https://ra.co/events/2555979",
   "https://kollektiv-kaorle.at",
   "https://www.vienna.at/wiener-otto-wagner-areal-bekommt-neue-zwischennutzer/9638579"
  ],
  "noLogo": "2026-10-28",
  "de": "Kulturverein bzw. Kollektiv, das leerstehende Räume bespielt; seit Oktober 2025 im Pavillon 21 am Otto-Wagner-Areal (Steinhof, Penzing), davor in Ottakring. Programm aus Konzerten, Festivals, Ausstellungen, Film und Workshops.",
  "en": "Cultural association/collective activating vacant spaces; since October 2025 in Pavilion 21 of the Otto Wagner Areal (Steinhof, Penzing), previously in Ottakring. Programme of concerts, festivals, exhibitions, film and workshops.",
  "web": "https://kollektiv-kaorle.at",
  "infoChk": "2026-11-01"
 },
 "Westbahn Studios": {
  "src": [
   "https://ra.co/events/2568237"
  ],
  "noLogo": "2026-11-02",
  "io": [
   "Indoor"
  ],
  "infoChk": "2026-11-02"
 },
 "Prater Dome": {
  "src": [
   "https://ra.co/events/2546243",
   "https://www.wien.info/en/dine-drink/bars-clubs/clubs-discos/prater-dome-355624",
   "https://www.praterdome.at"
  ],
  "io": [
   "Indoor"
  ],
  "de": "Großdiskothek im Wiener Prater am Riesenradplatz – laut Wien Tourismus die größte Disco Österreichs, mit zwei Ebenen, drei Floors und zwölf Bars; musikalisch breit von Techno, House, EDM, Drum & Bass und Trance bis Hip-Hop und 90er/2000er.",
  "en": "Large nightclub in Vienna's Prater at Riesenradplatz – according to Vienna Tourism Austria's largest disco, with two levels, three floors and twelve bars; musically broad, from techno, house, EDM, drum & bass and trance to hip-hop and 90s/2000s.",
  "web": "https://www.praterdome.at",
  "opened": "2008",
  "logo": "https://praterdome.at/media/default/_targets/override/images/praterdome-logo.png?v=1793200157",
  "floors": [
   "Main Floor"
  ],
  "infoChk": "2026-11-02"
 },
 "Altia Skybar – DC Tower": {
  "src": [
   "https://ra.co/events/2560557",
   "https://www.melia.com/de/hotels/osterreich/wien/melia-vienna/restaurants/altia-skybar",
   "https://www.dctower.at/en/"
  ],
  "io": [
   "Indoor"
  ],
  "man": 1,
  "infoChk": "2026-11-02",
  "de": "Skybar mit Cocktailbar, Lounge und Dachterrasse im 58. Stock des DC Tower (Hotel Meliá Vienna) in der Donau City, laut Betreiber die höchstgelegene Dachterrasse Österreichs; eleganter Dresscode, DJ-Sessions.",
  "en": "Sky bar with cocktail bar, lounge and roof terrace on the 58th floor of DC Tower (Meliá Vienna hotel) in Donau City, billed as Austria's highest roof terrace; elegant dress code, DJ sessions.",
  "web": "https://www.melia.com/de/hotels/osterreich/wien/melia-vienna/restaurants/altia-skybar",
  "alias": ["Altia Skybar"]
 },
 "Event Arena Vösendorf": {
  "io": [
   "Indoor"
  ],
  "floors": [
   "Ground Zero",
   "The Tunnel",
   "Machine Room"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "M1 Club": {
  "io": [
   "Indoor"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "B72": {
  "io": [
   "Indoor"
  ],
  "de": "Zweistöckiger Club und Live-Musik-Ort in zwei U-Bahn-Bögen am Hernalser Gürtel nahe der U6-Station Alser Straße – Schwerpunkt gitarrenlastige Alternative-Musik mit Konzerten, Clubnächten und DJ-Abenden; im Sommer mit Gastgarten.",
  "en": "Two-storey club and live music venue in two U-Bahn arches on Hernalser Gürtel near U6 Alser Straße – focusing on guitar-based alternative music with concerts, club nights and DJ evenings; with a garden in summer.",
  "web": "https://www.b72.at",
  "src": [
   "https://www.wien.info/en/dine-drink/bars-clubs/live-locations/b72-340090",
   "https://b72.at/about-and-where"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02",
  "opened": "1998"
 },
 "Metastadt": {
  "io": [
   "Indoor"
  ],
  "de": "Multifunktionale Eventlocation in den revitalisierten ehemaligen ELIN-Werken in der Donaustadt, mit mehreren Hallen auf rund 14.500 m² und Außenflächen für bis zu 5.000 Gäste.",
  "en": "Multifunctional event venue in the revitalised former ELIN factories in Donaustadt, with several halls across about 14,500 m² plus outdoor areas for up to 5,000 guests.",
  "web": "https://www.metastadt.at/",
  "floors": [
   "METAHall",
   "METAArt 1",
   "METAArt 2",
   "METACube",
   "WAGENWerk",
   "KESSELHaus",
   "KESSELBar"
  ],
  "src": [
   "https://meeting.vienna.info/en/event-planning/venue-finder/metastadt-congress-326114"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
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
  ],
  "de": "Weitläufiges Areal mit Grünflächen und historischen Pavillons auf der Baumgartner Höhe im 14. Bezirk; seit 2025 in Zwischennutzung durch Kreative und Kulturvereine und ein beliebter Veranstaltungsort.",
  "en": "Extensive site with green spaces and historic pavilions on the Baumgartner Höhe in Vienna's 14th district; since 2025 in interim use by creatives and cultural associations and a popular event location.",
  "src": [
   "https://www.1000thingsmagazine.com/de/a/2159363/otto-wagner-areal-wien-zwischennutzung/"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Loop": {
  "src": [
   "https://ra.co/events/2548181",
   "https://www.wien.info/de/essen-trinken/bars-clubs/guertel-347398",
   "https://www.loop.co.at"
  ],
  "de": "Musikbar in den Stadtbahnbögen am Lerchenfelder Gürtel – Mischung aus Bar, Club und Lounge mit Konzerten, Sessions, DJ-Sets und Schanigarten, seit über zwei Jahrzehnten.",
  "en": "Music bar in the Stadtbahn arches on Lerchenfelder Gürtel – a mix of bar, club and lounge with concerts, sessions, DJ sets and a outdoor terrace, open for more than two decades.",
  "web": "https://loop.co.at",
  "io": [
   "Indoor"
  ],
  "logo": "https://loop.co.at/wp-content/uploads/2022/02/copy-loop-logo_white.jpg",
  "infoChk": "2026-11-02"
 },
 "Jaz in the City": {
  "de": "Hotel Jaz in the City in der Windmühlgasse (Mariahilf) mit der Dachbar Mariatrink, in der die Rooftop Series mit DJ-Sets stattfindet.",
  "en": "Jaz in the City hotel on Windmühlgasse (Mariahilf) with the Mariatrink rooftop bar, home of the Rooftop Series DJ sessions.",
  "alias": ["Mariatrink"],
  "src": [
   "https://ra.co/events/2527346",
   "https://www.tageskarte.io/hotellerie/detail/jaz-in-the-city-vienna-eroeffnet.html",
   "https://hrewards.com/en/jaz-in-the-city-vienna",
   "https://therooftopguide.com/rooftop-bars-in-vienna/mariatrink.html"
  ],
  "web": "https://hrewards.com/en/jaz-in-the-city-vienna",
  "opened": "2021",
  "io": [
   "Indoor",
   "Outdoor"
  ],
  "noLogo": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "Stiftskeller Klosterneuburg": {
  "de": "Gewölbekeller mit hohen Decken und Ziegelwänden unter dem Stiftsrestaurant Leopold in Klosterneuburg.",
  "en": "Vaulted cellar with high ceilings and brick walls beneath Stiftsrestaurant Leopold in Klosterneuburg.",
  "io": [
   "Indoor"
  ],
  "src": [
   "https://ra.co/events/2547042"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Multiversum Schwechat": {
  "de": "Veranstaltungszentrum in Schwechat südöstlich von Wien.",
  "en": "Event centre in Schwechat, south-east of Vienna.",
  "io": [
   "Indoor"
  ],
  "src": [
   "https://ra.co/events/2540048",
   "https://www.lower-austria.info/convention/location/multiversum-schwechat"
  ],
  "web": "https://www.multiversum-schwechat.at",
  "opened": "2011",
  "floors": [
   "Eventhalle",
   "VIP-Raum",
   "Lounge"
  ],
  "noLogo": "2026-11-02",
  "infoChk": "2026-11-02"
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
  "alias": ["TNZFX"],
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
  "links": {
   "ra": "https://ra.co/dj/djmarky"
  },
  "src": [
   "https://en.wikipedia.org/wiki/DJ_Marky",
   "https://www.technoairlines.com/artist/dj-marky",
   "https://ra.co/dj/djmarky"
  ],
  "img": "https://static.ra.co/images/profiles/djmarky.jpg?dateUpdated=1253524755000",
  "sets": [
   {
    "t": "DJ Marky B2B DJ Die – SUNANDBASS 24",
    "u": "https://soundcloud.com/sunandbass/marky-b2b-dj-die-sunandbass-24"
   },
   {
    "t": "DJ Marky – Marky & Friends London Promo Mix 2018 (Drum&BassArena)",
    "u": "https://soundcloud.com/drumandbassarena/dj-marky-marky-friends-london-promo-mix-2018"
   },
   {
    "t": "Boiler Room São Paulo – DJ Marky DnB",
    "u": "https://soundcloud.com/platform/boiler-room-sao-paulo-dj-marky-dnb"
   }
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
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
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27",
  "man": 1
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
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27",
  "man": 1
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
   "ig": "https://www.instagram.com/_ponyhof_official/"
  },
  "src": [
   "https://ponyhof-official.at/",
   "https://ponyhof-official.at/en/"
  ],
  "setsChecked": "2026-10-27",
  "man": 1
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
  ],
  "img": "https://static.ra.co/images/profiles/square/enja.jpg?dateUpdated=1711360724000",
  "infoChk": "2026-11-02"
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
   "web": "http://linktr.ee/bambi_berlin",
   "ra": "https://ra.co/dj/bambi-s"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/bambi-s.jpg?dateUpdated=1786441014807",
  "from": {
   "de": "Berlin",
   "en": "Berlin"
  },
  "genres": [
   "House",
   "Techno"
  ],
  "labels": [
   "Miura Records",
   "La Zic"
  ],
  "bio": {
   "de": "Bambi-S ist in Berlin ansässig, legt als DJ auf und produziert. Der Sound verbindet groovigen House, Detroit-Einflüsse, Oldschool-Techno und aktuelle Tracks. Releases auf Miura Records und La Zic.",
   "en": "Bambi-S is a Berlin-based DJ and producer. The sound blends groove-driven house, Detroit influences, old-school techno and contemporary cuts. Releases on Miura Records and La Zic."
  },
  "infoChk": "2026-10-31"
 },
 "Anatol": {
  "links": {
   "sc": "https://soundcloud.com/anatol-official",
   "ra": "https://ra.co/dj/anatol"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/anatol.jpg?dateUpdated=1448888690553",
  "bio": {
   "de": "DJ und Produzent aus München, inzwischen in Wien ansässig. Regelmäßig im Das Werk, außerdem im FLUCC und im Club Exil zu hören.",
   "en": "DJ and producer from Munich, now based in Vienna. Plays regularly at Das Werk, as well as FLUCC and Club Exil."
  },
  "from": {
   "de": "München",
   "en": "Munich"
  },
  "labels": [
   "Treibjagd-Records",
   "Product London Records",
   "forTunea",
   "Outline Records"
  ],
  "infoChk": "2026-10-31"
 },
 "DORAH": {
  "links": {
   "sc": "https://soundcloud.com/dora-ban",
   "ig": "https://www.instagram.com/dorah.bpm",
   "ra": "https://ra.co/dj/dorah"
  },
  "src": [
   "https://es.ra.co/dj/dorah",
   "https://ra.co/events/2523457"
  ],
  "sets": [
   {
    "t": "DORAH @ Herzfrequenz goes FLUCC Vol. 4 (24.05.2025)",
    "u": "https://soundcloud.com/herzfrequenz_techno/dorah-hz-2405"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/dorah.jpg?dateUpdated=1767780618000",
  "linksOk": "2026-10-29",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Dora B",
  "genres": [
   "Hard Bounce",
   "Hard Techno"
  ],
  "bio": {
   "de": "In Wien ansässige DJ und Produzentin, die Hard Bounce und Hard Techno mit melodischen Elementen verbindet. Ihre eigenen Produktionen prägen ihre energiegeladenen Sets; verwurzelt ist sie in Wiens queerer Underground-Szene.",
   "en": "Vienna-based DJ and producer blending hard bounce and hard techno with melodic elements. Her own productions shape her high-energy sets, and she is rooted in Vienna's queer underground scene."
  },
  "infoChk": "2026-10-31"
 },
 "maro": {
  "links": {
   "sc": "https://soundcloud.com/maro87c",
   "ig": "https://www.instagram.com/maro87c/",
   "bc": "https://maro87.bandcamp.com",
   "web": "http://www.maro87c.at",
   "ra": "https://ra.co/dj/maro"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/maro.jpg?dateUpdated=1766386631437",
  "from": {
   "de": "Deutschland, lebt in Österreich",
   "en": "Germany, based in Austria"
  },
  "genres": [
   "Techno",
   "Trance",
   "Hardgroove",
   "Breakbeat"
  ],
  "bio": {
   "de": "maro ist in Deutschland geboren und in Österreich ansässig. Bekannt für energiegeladene Sets, die Techno, Trance, Hardgroove und Breakbeats verbinden. Spielt am häufigsten in Wien, u. a. in Grelle Forelle, PRST, Gleis19 und Flex.",
   "en": "maro was born in Germany and is based in Austria. Known for high-energy sets blending techno, trance, hardgroove and breakbeats. Plays most often in Vienna, including Grelle Forelle, PRST, Gleis19 and Flex."
  },
  "infoChk": "2026-10-31"
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
  "linksOk": "2026-10-29",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Isabella",
  "bio": {
   "de": "WO.IZZY ist eine Newcomerin der Wiener Elektronikszene. Ihr RA-Profil beschreibt sie als abenteuerlustig, neugierig, verspielt und furchtlos. Sie spielt u. a. im SASS Music Club, Celeste und Das Werk.",
   "en": "WO.IZZY is a rising newcomer in Vienna's electronic scene. Her RA profile describes her as adventurous, curious, playful and fearless. She plays at venues including SASS Music Club, Celeste and Das Werk."
  },
  "infoChk": "2026-10-31"
 },
 "Vivienna": {
  "links": {
   "sc": "https://soundcloud.com/t2vM8zxuw47WrxBBA",
   "ig": "https://www.instagram.com/viviennepohl",
   "ra": "https://ra.co/dj/vivienna"
  },
  "src": [
   "https://it.ra.co/dj/vivienna",
   "https://es.ra.co/dj/vivienna"
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Geboren in Deutschland, lebt in Wien",
   "en": "Born in Germany, based in Vienna"
  },
  "real": "Vivienne",
  "img": "https://static.ra.co/images/profiles/square/vivienna.jpg?dateUpdated=1786223820637",
  "bio": {
   "de": "Vivienna ist eine genrefluide DJ, geboren in Deutschland und in Wien zu Hause. Sie spielt hypnotischen, groovigen Techno und mischt über mehrere Decks Einflüsse aus Hip-Hop, Latin, MENA und Jazz hinein.",
   "en": "Vivienna is a genre-fluid DJ, born in Germany and based in Vienna. She plays hypnotic, groovy techno, layering multiple decks to bring in hip-hop, Latin, MENA and jazz influences."
  },
  "infoChk": "2026-11-02"
 },
 "Albin Brezlan": {
  "links": {
   "sc": "https://soundcloud.com/albinbrezlanmusic",
   "ig": "https://www.instagram.com/albinbrezlanmusic",
   "web": "https://linktr.ee/albinbrezlan",
   "ra": "https://ra.co/dj/albinbrezlan"
  },
  "src": [
   "https://ra.co/dj/albinbrezlan",
   "https://ra.co/dj/albinbrezlan/biography"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/albinbrezlan.jpg?dateUpdated=1742288384243",
  "bio": {
   "de": "Albin Brezlan ist DJ, Produzent, Remixer, Promoter und Creative Director aus Kärnten und Resident im O – der Klub in Wien. Er spielte u. a. Support für Carl Cox, Sven Väth und Loco Dice sowie bei Electric Love und Sonus.",
   "en": "Albin Brezlan is a DJ, producer, remixer, promoter and creative director from Carinthia, Austria, and a resident at O – der Klub in Vienna. He has supported Carl Cox, Sven Väth and Loco Dice and played festivals such as Electric Love and Sonus."
  },
  "from": {
   "de": "Kärnten, Österreich",
   "en": "Carinthia, Austria"
  },
  "infoChk": "2026-10-31"
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
   "ig": "https://www.instagram.com/huebl_techno",
   "ra": "https://ra.co/dj/huebl"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/huebl.jpg?dateUpdated=1676635960000",
  "bio": {
   "de": "Huebl ist ein Wiener Techno-DJ mit dem Motto „Detroit X Vienna“. Er spielt vor allem im Das Werk, Himmel und Wasser, O – der Klub, in der Postgarage und im Club Exil.",
   "en": "Huebl is a Vienna techno DJ whose motto is \"Detroit X Vienna\". He plays mostly at Das Werk, Himmel und Wasser, O – der Klub, Postgarage and Club Exil."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "infoChk": "2026-10-31"
 },
 "Dana Melissa": {
  "links": {
   "sc": "https://soundcloud.com/danamelissa",
   "ig": "https://www.instagram.com/danamelissa.vie",
   "ra": "https://ra.co/dj/danamelissa"
  },
  "src": [
   "https://de.ra.co/dj/danamelissa",
   "https://ra.co/dj/danamelissa/biography"
  ],
  "sets": [
   {
    "t": "Dana Melissa @ Techno Entgleist / Grelle Forelle (29.09.2023)",
    "u": "https://soundcloud.com/danamelissa/dana-melissa-techno-entgleistgrelle-forelle"
   }
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/danamelissa.jpg?dateUpdated=1710758259000",
  "bio": {
   "de": "Dana Melissa stammt aus Leova in Moldau und lebt in Wien. Nach Jahren als Raverin begann sie selbst aufzulegen und sucht nach unentdeckten Tracks für groovige Sets. Ihre Releases „Inima Bate“ und „Venele“ tragen rumänische Texte über ihre Heimat und ihr Leben in Wien.",
   "en": "Dana Melissa comes from Leova, Moldova, and lives in Vienna. After years as a raver she began selecting her own music, digging for undiscovered tracks for groove-driven sets. Her releases \"Inima Bate\" and \"Venele\" feature Romanian lyrics about her hometown and her life in Vienna."
  },
  "from": {
   "de": "Leova, Moldau (lebt in Wien)",
   "en": "Leova, Moldova (based in Vienna)"
  },
  "labels": [
   "Nine O Nine"
  ],
  "infoChk": "2026-10-31"
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
   "ig": "https://www.instagram.com/spudbencer0815",
   "ra": "https://ra.co/dj/spudbencer"
  },
  "src": [
   "https://ra.co/dj/spudbencer"
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Felix Schwarzmann",
  "img": "https://static.ra.co/images/profiles/square/spudbencer.jpg?dateUpdated=1706112484000",
  "bio": {
   "de": "Spud Bencer ist ein Wiener DJ, der seit rund zehn Jahren auflegt, u. a. in The Loft, Grelle Forelle, B72 und PRST.",
   "en": "Spud Bencer is a Vienna-based DJ who has been playing for around ten years, including at The Loft, Grelle Forelle, B72 and PRST."
  },
  "infoChk": "2026-11-02"
 },
 "Paraçek": {
  "links": {
   "sc": "https://soundcloud.com/paracek",
   "bc": "https://paracek.bandcamp.com",
   "web": "http://linktr.ee/paracek",
   "ra": "https://ra.co/dj/para%C3%A7ek",
   "sp": "https://open.spotify.com/artist/1YAXvPP9indIwd27HpEDF1",
   "ig": "https://www.instagram.com/paracek_official/"
  },
  "src": [
   "https://de.ra.co/dj/paracek",
   "https://de.ra.co/dj/para%C3%A7ek",
   "https://www.technoairlines.com/artist/paracek",
   "https://www.regioactive.de/party/paradies-garten-w-paracek-grelle-forelle-wien-2026-11-14-JVJJnmCzgx"
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
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "img": "https://static.ra.co/images/profiles/square/para%C3%A7ek.jpg?dateUpdated=1761495669563",
  "labels": [
   "TRANCEKRAFT 4000"
  ],
  "infoChk": "2026-11-02",
  "bio": {
   "de": "Paraçek ist ein in Dresden ansässiger DJ, dessen Sound in der Free-Party-Rave-Szene von Leipzig und Dresden wurzelt. Seit 2021 aktiv, verbindet er schnellen Hard Dance und Hard Trance mit 90er-Trance und Acid-Rave. Veröffentlichungen erschienen u. a. auf TRANCEKRAFT 4000.",
   "en": "Paraçek is a Dresden-based DJ whose sound is rooted in the free-party rave scene of Leipzig and Dresden. Active since 2021, he blends fast hard dance and hard trance with 90s trance and acid rave. His releases include output on TRANCEKRAFT 4000."
  },
  "genres": [
   "Hard Trance",
   "Hard Dance",
   "Trance"
  ]
 },
 "Felix Rupprecht": {
  "links": {
   "sc": "https://soundcloud.com/felixrupprecht",
   "ig": "https://www.instagram.com/flx.rupprecht",
   "sp": "https://open.spotify.com/artist/3LqNRj4McFE1JrWDgTvrly",
   "ra": "https://ra.co/dj/felixrupprecht"
  },
  "src": [
   "https://de.ra.co/dj/felixrupprecht"
  ],
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/felixrupprecht.jpg?dateUpdated=1695895162000",
  "bio": {
   "de": "Felix Rupprecht ist ein in Deutschland geborener, in Österreich lebender DJ, der sich laut RA der Rettung der elektronischen Tanzmusik der 90er verschrieben hat und genreübergreifend Four-on-the-Floor spielt. Er legt vor allem in Wien auf, u. a. im PRST, in der Pratersauna, im SASS Music Club und in der Grelle Forelle, sowie im BLITZ München.",
   "en": "Felix Rupprecht is a German-born, Austria-based DJ – per RA 'a four-on-the-floor loving, genre-mixing hero on his journey to save 90s electronic dance music'. He plays mostly in Vienna, including PRST, Pratersauna, SASS Music Club and Grelle Forelle, as well as BLITZ Munich."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "infoChk": "2026-10-31"
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
   "ig": "https://www.instagram.com/_manuelcorrea",
   "ra": "https://ra.co/dj/manuelcorrea"
  },
  "src": [
   "https://ra.co/dj/manuelcorrea"
  ],
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Manuel Correa Kunnen",
  "img": "https://static.ra.co/images/profiles/square/manuelcorrea.jpg?dateUpdated=1667988584000",
  "bio": {
   "de": "Manuel Correa ist ein DJ und Produzent aus Wien, der vor allem im PRST, im SASS Music Club und in der Pratersauna spielt.",
   "en": "Manuel Correa is a Vienna-based DJ and producer who mostly plays at PRST, SASS Music Club and Pratersauna."
  },
  "infoChk": "2026-11-02"
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
   "bc": "http://polabryson.bandcamp.com",
   "ra": "https://ra.co/dj/polabryson"
  },
  "src": [
   "https://ra.co/dj/polabryson",
   "https://ra.co/dj/polabryson/biography"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/polabryson.jpg?dateUpdated=1737980042000",
  "bio": {
   "de": "Pola & Bryson sind ein britisches Drum-&-Bass-Produzentenduo: Jack (Pola) stammt aus East London, Harry (Bryson) aus West Yorkshire. Nach dem Debütalbum „This Time Last Year“ auf ihrem Label Soulvent Records erschienen „Lost In Thought“ und „Beneath The Surface“ (2021) auf Shogun Audio; „Phoneline“ mit Emily Makis wurde 2023 zu einer viel gespielten D&B-Hymne.",
   "en": "Pola & Bryson are a UK drum & bass production duo: Jack (Pola) grew up in East London and Harry (Bryson) in West Yorkshire. After their debut album 'This Time Last Year' on their own Soulvent Records, they released 'Lost In Thought' and 'Beneath The Surface' (2021) on Shogun Audio; 'Phoneline' with Emily Makis became a widely played D&B anthem in 2023."
  },
  "from": {
   "de": "Vereinigtes Königreich",
   "en": "United Kingdom"
  },
  "labels": [
   "Shogun Audio",
   "Soulvent Records"
  ],
  "genres": [
   "Drum & Bass",
   "Liquid Drum & Bass"
  ],
  "infoChk": "2026-11-02"
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
   "bc": "https://benderris.bandcamp.com",
   "ra": "https://ra.co/dj/benderris"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/benderris.jpg?dateUpdated=1692724586000",
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "real": "Ben",
  "bio": {
   "de": "Ben Derris ist ein DJ aus Deutschland. Er spielt vor allem in Berlin, Hamburg, Leipzig, Köln und Frankfurt, u. a. im Lokschuppen Berlin, Humboldthain Club und OXI.",
   "en": "Ben Derris is a DJ from Germany. He plays mostly in Berlin, Hamburg, Leipzig, Cologne and Frankfurt, including Lokschuppen Berlin, Humboldthain Club and OXI."
  },
  "infoChk": "2026-10-31"
 },
 "Linus Villa": {
  "links": {
   "sc": "https://soundcloud.com/linusvilla",
   "ig": "https://www.instagram.com/linusvilla",
   "bc": "https://linusvilla.bandcamp.com",
   "sp": "https://open.spotify.com/artist/0t7Btp9w37XCPaJOm7XMti",
   "ra": "https://ra.co/dj/linusvilla"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/linusvilla.jpg",
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "labels": [
   "Deadline Records",
   "240 KM/H",
   "Hot Meal Records"
  ],
  "bio": {
   "de": "Linus Villa ist ein Produzent und DJ aus Deutschland. Releases u. a. auf Deadline Records, 240 KM/H und Hot Meal Records. Er spielt vor allem in Berlin, Köln, Hamburg, Stuttgart und München.",
   "en": "Linus Villa is a producer and DJ from Germany. He has released on labels including Deadline Records, 240 KM/H and Hot Meal Records. He plays mostly in Berlin, Cologne, Hamburg, Stuttgart and Munich."
  },
  "infoChk": "2026-10-31"
 },
 "Sophti": {
  "links": {
   "sc": "https://soundcloud.com/sophtidj",
   "ig": "https://www.instagram.com/dj.sophti",
   "ra": "https://ra.co/dj/sophti"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/sophti.jpg?dateUpdated=1710155118000",
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "bio": {
   "de": "Sophti ist eine DJ aus Deutschland. Ihr Sound ist ein verspielter Multi-Genre-Mashup. Sie spielt u. a. regelmäßig bei der Partyreihe STUDIO 69.",
   "en": "Sophti is a DJ from Germany. Her sound is a playful multi-genre mashup. She plays regularly at the STUDIO 69 party series, among others."
  },
  "infoChk": "2026-10-31"
 },
 "Kat Ze": {
  "links": {
   "sc": "https://soundcloud.com/kat_ze_music",
   "ig": "https://www.instagram.com/kat__ze",
   "ra": "https://ra.co/dj/katzedj"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/katzedj.jpg?dateUpdated=1690547231000",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Katharina Ze",
  "genres": [
   "Techno"
  ],
  "bio": {
   "de": "Kat Ze (Kathi) ist eine Techno-DJ aus Wien. Sie spielt u. a. in Grelle Forelle, Das Werk, Flex und Club Exil.",
   "en": "Kat Ze (Kathi) is a techno DJ living in Vienna. She plays at venues including Grelle Forelle, Das Werk, Flex and Club Exil."
  },
  "infoChk": "2026-10-31"
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
   "web": "https://www.ntomusic.com/",
   "ra": "https://ra.co/dj/nto"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/nto.jpg?dateUpdated=1633011040000",
  "from": {
   "de": "Frankreich",
   "en": "France"
  },
  "bio": {
   "de": "NTO ist ein französischer Live-Act im Bereich Melodic Techno. Releases u. a. auf Hungry Music, Afterlife, Burlesque Musique und Parquet Recordings.",
   "en": "NTO is a French melodic techno live act with releases on Hungry Music, Afterlife, Burlesque Musique and Parquet Recordings, among others."
  },
  "labels": [
   "Parquet Recordings",
   "Burlesque Musique",
   "Form Music",
   "Klangwelt",
   "Delicieuse Records",
   "Afterlife",
   "Hungry Music",
   "Bambu Records"
  ],
  "genres": [
   "Melodic Techno"
  ],
  "infoChk": "2026-11-01"
 },
 "Oxygeno": {
  "links": {
   "sc": "https://soundcloud.com/oxxxygeno",
   "ig": "https://www.instagram.com/oxygeno__",
   "ra": "https://ra.co/dj/oxygeno",
   "bc": "https://lostversesmusic.bandcamp.com"
  },
  "src": [
   "https://ra.co/dj/oxygeno"
  ],
  "setsChecked": "2026-10-27",
  "from": {
   "de": "Spanien",
   "en": "Spain"
  },
  "real": "Diego Amido Teijeiro",
  "img": "https://static.ra.co/images/profiles/square/oxygeno.jpg?dateUpdated=1578337446000",
  "labels": [
   "Axis Records",
   "Soma Records",
   "Edit Select Records",
   "Illegal Alien Records",
   "Mord",
   "Lost Verses"
  ],
  "genres": [
   "Techno"
  ],
  "bio": {
   "de": "Oxygeno (Diego Amido) wurde 1995 im Norden Spaniens geboren und gilt seit 2019 als eine feste Größe der spanischen Techno-Szene. Er veröffentlichte u. a. auf Axis, Soma, Mord, Edit Select und Illegal Alien Records.",
   "en": "Oxygeno (Diego Amido) was born in 1995 in northern Spain and has been a key figure in Spanish techno since 2019. He has released on Axis, Soma, Mord, Edit Select and Illegal Alien Records, among others."
  },
  "infoChk": "2026-11-02"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/melimeko.jpg?dateUpdated=1787584908987",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "Techno-DJ aus Wien.",
   "en": "Vienna-based techno DJ."
  },
  "infoChk": "2026-11-01"
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
   "sp": "https://open.spotify.com/artist/4Ol10UBcGz0YO0XpAKoGIU",
   "ra": "https://ra.co/dj/caraelizabeth"
  },
  "src": [
   "https://ra.co/dj/caraelizabeth",
   "https://ra.co/dj/caraelizabeth/biography"
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
  "setsChecked": "2026-10-27",
  "img": "https://static.ra.co/images/profiles/square/caraelizabeth.jpg?dateUpdated=1657546889000",
  "bio": {
   "de": "Cara Elizabeth ist eine in Berlin geborene und lebende DJ. Sie spielt harte, zugleich melodische Sets zwischen Neo-Rave, Hard Techno und Trance.",
   "en": "Cara Elizabeth is a DJ born and based in Berlin. She plays hard yet melodic sets that move between neo-rave, hard techno and trance."
  },
  "from": {
   "de": "Berlin, Deutschland",
   "en": "Berlin, Germany"
  },
  "genres": [
   "Hard Techno",
   "Trance",
   "Neo-Rave"
  ],
  "infoChk": "2026-11-02"
 },
 "Frederic.": {
  "links": {
   "sc": "https://soundcloud.com/frederic-selected",
   "ig": "https://www.instagram.com/frederic.selected",
   "ra": "https://ra.co/dj/frederic-de"
  },
  "src": [
   "https://ra.co/dj/frederic-de",
   "https://ra.co/dj/frederic-de/biography"
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
  "setsChecked": "2026-11-02",
  "img": "https://static.ra.co/images/profiles/square/frederic-de.jpg?dateUpdated=1774863813873",
  "from": {
   "de": "Berlin",
   "en": "Berlin"
  },
  "bio": {
   "de": "Frederic. ist ein in Berlin lebender DJ, Produzent und Veranstalter und Manager der Selected-Crew. Er spielt mentalen, rave-orientierten Techno und stand u. a. im Tresor, RSO, Fold, Mondo Disko und Radion hinter den Decks. Regelmäßig ist er zudem mit Shows auf HÖR zu hören.",
   "en": "Frederic. is a Berlin-based DJ, producer and promoter and manager of the Selected crew. He plays mental, rave-oriented techno and has performed at venues such as Tresor, RSO, Fold, Mondo Disko and Radion. He also plays regular shows on HÖR."
  },
  "infoChk": "2026-11-02"
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
  "noLinks": "2026-11-02",
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
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
  "noLinks": "2026-11-02",
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
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
   "sc": "https://soundcloud.com/joro_und_joabo",
   "ig": "https://www.instagram.com/joro.und.joabo/"
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
  "setsChecked": "2026-11-02",
  "noImg": "2026-11-02",
  "genres": [
   "Techno"
  ],
  "bio": {
   "de": "Techno-Act aus der Wiener Szene, angekündigt mit Verweisen auf die legendären Gazometer-Raves und die Partyreihe XXX Favorite Tools. Auf SoundCloud finden sich u. a. ein Livemix aus der Pratersauna Wien und Peaktime-Techno-Mixe.",
   "en": "Techno act from the Vienna scene, billed with references to the legendary Gazometer raves and the XXX Favorite Tools party series. Their SoundCloud includes a live mix from Pratersauna Vienna and peak-time techno mixes."
  },
  "src": [
   "https://de.ra.co/events/2391499",
   "https://soundcloud.com/joro_und_joabo",
   "https://soundcloud.com/joro_und_joabo/livemix-at-pratersauna-vienna",
   "https://soundcloud.com/joro_und_joabo/peaktimetechno0722",
   "https://www.instagram.com/joro.und.joabo/"
  ],
  "infoChk": "2026-11-02"
 },
 "Atomik": {
  "noLinks": "2026-10-28"
 },
 "Norg3n": {
  "noLinks": "2026-11-02",
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
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
   "https://ra.co/dj/peterpan-no",
   "https://de.ra.co/dj/peterpan-no",
   "https://de.ra.co/dj/peterpan-no/biography"
  ],
  "from": {
   "de": "Norwegen",
   "en": "Norway"
  },
  "setsChecked": "2026-10-28",
  "img": "https://static.ra.co/images/profiles/square/peterpan-no.jpg?dateUpdated=1772446692163",
  "linksOk": "2026-10-29",
  "bio": {
   "de": "Peter Pan (auch Peter Greenwood bzw. PeterPan303) ist ein norwegischer DJ und Produzent. Seine Musik reicht von melodischem House bis zu tieferem Techno; Releases erschienen u. a. auf Avocado Records, Aquavit BEAT und NeverLand Productions. Er stand u. a. mit John Digweed, Sasha, Guy J, Boris Brejcha und Fluke auf Line-ups.",
   "en": "Peter Pan (also Peter Greenwood or PeterPan303) is a Norwegian DJ and producer. His music ranges from melodic house to deeper techno, with releases on labels including Avocado Records, Aquavit BEAT and NeverLand Productions. He has shared line-ups with John Digweed, Sasha, Guy J, Boris Brejcha and Fluke."
  },
  "labels": [
   "Avocado Records",
   "Aquavit BEAT",
   "NeverLand Productions"
  ],
  "alias": ["Peter Greenwood", "PeterPan303"],
  "infoChk": "2026-11-02"
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
  "linksOk": "2026-10-29",
  "bio": {
   "de": "Aschenbrenner ist ein in Wien ansässiger DJ und Resident der Grelle Forelle. Bekannt ist er für energiegeladene Sets mit hüpfenden, hart treibenden Basslines.",
   "en": "Aschenbrenner is a Vienna-based DJ and resident artist at Grelle Forelle, known for high-energy sets with bouncy, hard-hitting basslines."
  },
  "real": "Michael Aschenbrenner",
  "infoChk": "2026-10-31"
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
  "noLinks": "2026-11-02",
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
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
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
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
  "noImg": "2026-11-02",
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
   "https://soundcloud.com/radiorudina/almost-pinkcast-mel-b2b-pinklotion-b2b-bludhound",
   "https://soundcloud.com/radiorudina/pinklotion"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "Pinklotion – Radio Rudina",
    "u": "https://soundcloud.com/radiorudina/pinklotion"
   },
   {
    "t": "pinked out 001 – Hard Techno/Schranz Set (155–160 BPM)",
    "u": "https://soundcloud.com/mrpinklotion/pinked-out-001-hard-technoschranz-set-155-160bpm"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Gopnikbarbie": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Hello Kiffy": {
  "noImg": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/user-zlmss"
  },
  "src": [
   "https://soundcloud.com/user-zlmss",
   "https://soundcloud.com/pinkmayhem/hello-kiffy-set-recording",
   "https://soundcloud.com/pinkmayhem/mel-b2b-hello-kiffy-set-recording-2401",
   "https://soundcloud.com/radiorudina/almost-pinkcast-mel-b2b-pinklotion-b2b-bludhound?in=user-zlmss%2Fsets%2Fink-mayhem"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "HELLO KIFFY [SET RECORDING ROSAROT 8.8]",
    "u": "https://soundcloud.com/pinkmayhem/hello-kiffy-set-recording"
   },
   {
    "t": "MEL B2B HELLO KIFFY [SET RECORDING 24.01]",
    "u": "https://soundcloud.com/pinkmayhem/mel-b2b-hello-kiffy-set-recording-2401"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Kristus": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "noLinks": "2026-11-02"
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
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
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
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "noLinks": "2026-11-02"
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
  "noImg": "2026-10-28",
  "links": {
   "sc": "https://soundcloud.com/tekniker_at"
  },
  "src": [
   "https://soundcloud.com/tekniker_at",
   "https://soundcloud.com/tekniker_at/misspixie-live-decibelles-2025_12_26"
  ],
  "infoChk": "2026-10-31"
 },
 "Stefanie Brida": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Wisteria": {
  "noImg": "2026-10-28",
  "infoChk": "2026-10-31",
  "noLinks": "2026-10-31"
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
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
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
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02",
  "bio": {
   "de": "NEXUS ist das gemeinsame Projekt von B4MBA und MOOKI6 aus dem panafrikanischen, multidisziplinären Jokkoo Collective in Barcelona. Ihre dichte, konfrontative Musik verbindet Punk, Industrial, Dancehall, Noise und Trap. 2023 erschien bei Jokkoo die EP „PROTO NEXUS“ mit Industrial-Dancehall und Jungle, entstanden auf einer Reise durch Kenia.",
   "en": "NEXUS is the joint project of B4MBA and MOOKI6 from Barcelona's pan-African, multidisciplinary Jokkoo Collective. Their dense, confrontational music blends punk, industrial, dancehall, noise and trap. In 2023 they released the EP 'PROTO NEXUS' on Jokkoo, combining industrial dancehall and jungle, made during a trip through Kenya."
  },
  "from": {
   "de": "Barcelona",
   "en": "Barcelona"
  },
  "labels": [
   "Jokkoo"
  ],
  "genres": [
   "Experimental",
   "Dancehall",
   "Industrial",
   "Jungle"
  ],
  "src": [
   "https://www.ctm-festival.de/festival-2026/programme/artists/n/nexus",
   "https://jokkoo.bandcamp.com/album/proto-nexus",
   "https://www.artexplora.org/en/festival/performance/jokkoo-collective---dj-set"
  ]
 },
 "SAMI": {
  "infoChk": "2026-11-02",
  "img": "https://static.ra.co/images/profiles/square/sami-2.jpg?dateUpdated=1704706839000",
  "links": {
   "ra": "https://ra.co/dj/sami-2"
  },
  "bio": {
   "de": "SAMI ist Producer und DJ in Berlin mit Wurzeln im palästinensischen Dorf Kufr Bir'em und Gründer der Berliner Partyreihe DASAM. Die Sets sind hart und basslastig und verbinden Grime, 140er-Dubstep, Left-Field-Bass und experimentellen Hip-Hop. Angefangen hat SAMI als Rapper in verschiedenen Stilen.",
   "en": "SAMI is a Berlin-based producer and DJ with roots in the Palestinian village of Kufr Bir'em and the founder of the Berlin party series DASAM. The hard-hitting, bass-heavy sets blend grime, 140 dubstep, left-field bass and experimental hip hop. SAMI started out as a rapper across several styles."
  },
  "from": {
   "de": "Berlin",
   "en": "Berlin"
  },
  "genres": [
   "Grime",
   "Dubstep",
   "Bass",
   "Hip Hop"
  ],
  "src": [
   "https://ra.co/dj/sami-2",
   "https://ra.co/events/2248860"
  ]
 },
 "DJ Fred": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "zey": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Santo": {
  "infoChk": "2026-11-02",
  "img": "https://f4.bcbits.com/img/0044668134_10.jpg",
  "links": {
   "sc": "https://soundcloud.com/wearesanto",
   "bc": "https://wearesanto.bandcamp.com",
   "ig": "https://www.instagram.com/wearesanto/",
   "sp": "https://open.spotify.com/artist/62qdQ7T1K8aby7gQWH2gWg"
  },
  "from": {
   "de": "Lausanne",
   "en": "Lausanne"
  },
  "genres": [
   "Afro House"
  ],
  "bio": {
   "de": "SANTO (CH) ist ein DJ und Produzent aus Lausanne, der Einflüsse aus vielen Kulturen verbindet und als Pionier der „Global Club Remixes“ gilt. Laut Montreux Jazz Festival hat er über 3 Millionen SoundCloud-Streams und mehrere Gold- und Platin-Auszeichnungen für Produktionen mit internationalen Artists. Auf SoundCloud veröffentlicht er u. a. Afro-House-Edits und Flips.",
   "en": "SANTO (CH) is a Lausanne-based DJ and producer who blends influences from many cultures and is described as a pioneer of global club remixes. According to Montreux Jazz Festival he has over 3 million SoundCloud streams and several gold and platinum records for production work with international artists. His SoundCloud features Afro house edits and flips."
  },
  "src": [
   "https://soundcloud.com/wearesanto",
   "https://wearesanto.bandcamp.com",
   "https://www.montreuxjazzfestival.com/en/artist/santo/"
  ],
  "setsChecked": "2026-11-02"
 },
 "Chrome": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
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
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/scheibosan"
  },
  "bio": {
   "de": "Scheibosan ist ein österreichischer DJ, der seit 1981 auflegt. Bekannt wurde er u. a. durch die Compilation-Reihe „Black Coffee“ auf Ecco Chamber, die Dub, R&B, Funk, Soul, Acid Jazz, Breakbeats und Electro verbindet; gemeinsam mit Shanti Roots produziert er Remixe. Seine Mixe dokumentieren u. a. Sets im Funkhaus Wien und beim Gomde Sommerfest.",
   "en": "Scheibosan is an Austrian DJ who has been spinning since 1981. He is known among other things for the 'Black Coffee' compilation series on Ecco Chamber, blending dub, R&B, funk, soul, acid jazz, breakbeats and electro, and produces remixes together with Shanti Roots. His mixes document sets at Funkhaus Wien and the Gomde Sommerfest, among others."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "labels": [
   "Ecco Chamber"
  ],
  "sets": [
   {
    "t": "Scheibosan B2B DJ H.ott - Sunday Chillout @ Gomde Sommerfest 2025",
    "u": "https://soundcloud.com/scheibosan/scheibosan-b2b-dj-h-ott-1"
   },
   {
    "t": "Scheibosan B2B DJ H.ott - Gomde Sommerfest 2025",
    "u": "https://soundcloud.com/scheibosan/scheibosan-b2b-dj-h-ott-gomde"
   }
  ],
  "src": [
   "https://soundcloud.com/scheibosan",
   "https://www.last.fm/music/Shanti+Roots+&amp;+Scheibosan/+wiki"
  ],
  "setsChecked": "2026-11-02"
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
 },
 "The Lebanese": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Findus": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Helix": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "sig. Molteni": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Birk": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Soularium": {
  "links": {
   "sc": "https://soundcloud.com/soularium-club"
  },
  "src": [
   "https://soundcloud.com/soularium-club",
   "https://soundcloud.com/callshopradio/soularium-101124",
   "https://ra.co/events/1926527"
  ],
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31"
 },
 "Kasho Chualan": {
  "infoChk": "2026-11-02",
  "img": "https://f4.bcbits.com/img/0047713957_10.jpg",
  "links": {
   "bc": "https://kasho.bandcamp.com"
  },
  "from": {
   "de": "Kurdisch-kanadisch, lebt in Wien",
   "en": "Kurdish-Canadian, based in Vienna"
  },
  "bio": {
   "de": "Kasho Chualan ist eine kurdisch-kanadische Pianistin, Komponistin und Klangkünstlerin mit Sitz in Wien. Mit Klavier, Keyboards, präparierten Instrumenten, Tapes und Klangobjekten verbindet sie klassische Formen mit experimentellen, improvisierten und erzählerischen Ansätzen; ihr kurdisches Erbe prägt ihre Arbeit. 2023 erschien ihre Single „Trauma Nostalgique“.",
   "en": "Kasho Chualan is a Kurdish-Canadian pianist, composer and sound artist based in Vienna. Using piano, keyboards, prepared instruments, tapes and sound objects, she blends classical forms with experimental, improvised and narrative approaches; her Kurdish heritage informs her work. Her single \"Trauma Nostalgique\" came out in 2023."
  },
  "src": [
   "https://kasho.bandcamp.com/",
   "https://www.kontejner.org/en/osobe/kasho-chualan-kuca"
  ]
 },
 "Parajekt": {
  "infoChk": "2026-11-02",
  "img": "https://f4.bcbits.com/img/0040447540_10.jpg",
  "bio": {
   "de": "Parajekt ist das Wiener Elektronik-Duo von Bernhard Hammer und Matija Schellander. Ihre Musik entsteht mit Drum Machines, Samplern, Modularsynthesizern und Effekten, aufgenommen auf Tonband und anschließend mit Dub-Techniken weiterbearbeitet; sie verbindet elektronische Beatmusik mit Musique concrète und Noise. Das selbstbetitelte Album erschien im Jänner 2026 auf Palazzo Recordings.",
   "en": "Parajekt is the Vienna-based electronic duo of Bernhard Hammer and Matija Schellander. Their music is built with drum machines, samplers, modular synths and effects, recorded to tape and then reworked with dub techniques, blending electronic beat music with musique concrète and noise. Their self-titled album was released on Palazzo Recordings in January 2026."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Bernhard Hammer & Matija Schellander",
  "links": {
   "bc": "https://parajekt.bandcamp.com/"
  },
  "labels": [
   "Palazzo Recordings"
  ],
  "genres": [
   "Musique concrète",
   "Noise",
   "Dub"
  ],
  "src": [
   "https://parajekt.bandcamp.com/",
   "https://parajekt.bandcamp.com/album/parajekt-2",
   "https://www.dancingvinyl.com/release/1759469450021/parajekt-parajekt-(lp)"
  ]
 },
 "Eye F": {
  "img": "https://static.ra.co/images/profiles/square/eyef.jpg?dateUpdated=1608128874000",
  "links": {
   "ra": "https://es.ra.co/dj/eyef"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Florian",
  "bio": {
   "de": "Eye F ist ein DJ aus Österreich, der vor allem in Wien auftritt.",
   "en": "Eye F is a DJ from Austria who mostly plays in Vienna."
  },
  "src": [
   "https://es.ra.co/dj/eyef"
  ],
  "infoChk": "2026-10-31"
 },
 "Gilista": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Artemuse": {
  "img": "https://static.ra.co/images/profiles/square/artemuse.jpg?dateUpdated=1744275702490",
  "links": {
   "ra": "https://ra.co/dj/artemuse",
   "sc": "https://www.soundcloud.com/artemis-katefidis",
   "ig": "https://www.instagram.com/artemuse___"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Artemis Katefidis",
  "genres": [
   "House",
   "Techno"
  ],
  "bio": {
   "de": "Artemuse ist eine österreichische House- und Techno-DJ mit griechischen Wurzeln. Sie spielt vor allem in Wien.",
   "en": "Artemuse is an Austrian house and techno DJ with Greek roots. She plays mostly in Vienna."
  },
  "src": [
   "https://ra.co/dj/artemuse",
   "https://soundcloud.com/artemis-katefidis"
  ],
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "Michael Wagner": {
  "img": "https://static.ra.co/images/profiles/square/michaelwagner.jpg?dateUpdated=1694429396000",
  "links": {
   "ra": "https://ra.co/dj/michaelwagner",
   "sc": "https://soundcloud.com/michaelwagnersc",
   "ig": "https://www.instagram.com/michaelwagner_"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "DJ und Produzent aus Österreich mit einer Leidenschaft für das Unbekannte.",
   "en": "DJ and producer from Austria with a passion for the unknown."
  },
  "src": [
   "https://ra.co/dj/michaelwagner"
  ],
  "infoChk": "2026-10-31"
 },
 "MJANE": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Miyra Lim": {
  "img": "https://static.ra.co/images/profiles/square/miyralim.jpg?dateUpdated=1734399689000",
  "links": {
   "ra": "https://ra.co/dj/miyralim",
   "sc": "https://soundcloud.com/miyralim"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "genres": [
   "House"
  ],
  "bio": {
   "de": "In Wien aktive DJ, deren Sound in House-Musik und ihrer Kultur verwurzelt ist, ergänzt um Jazz, Hip-Hop und Soul. Im Mittelpunkt steht für sie eine authentische Klangwelt, in der sich die Tanzenden frei bewegen können.",
   "en": "Vienna-based DJ whose sound is rooted in house music and its culture, blended with jazz, hip hop and soul. Her priority is an authentic soundscape where dancers can move freely."
  },
  "src": [
   "https://ra.co/dj/miyralim",
   "https://pl.ra.co/dj/miyralim/biography"
  ],
  "infoChk": "2026-10-31"
 },
 "Cristinho": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Florian No": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Elex Red": {
  "links": {
   "sc": "https://soundcloud.com/alexrot"
  },
  "src": [
   "https://soundcloud.com/alexrot",
   "https://soundcloud.com/alexrot/alex-rot-elektro-goenner-mix"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "alias": ["Alex Rot"],
  "sets": [
   {
    "t": "Alex Rot - Elektro Goenner Mix - 20120309",
    "u": "https://soundcloud.com/alexrot/alex-rot-elektro-goenner-mix"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Tolaris": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "MC Mars": {
  "bio": {
   "de": "Wiener MC, der bei Raves als Host am Mikrofon steht. Wird in Line-ups mit Verweisen auf LIVING F/X und die Gazometer-Raves angekündigt, häufig gemeinsam mit MC Spot.",
   "en": "Vienna MC who hosts raves on the mic. Billed with references to LIVING F/X and the Gazometer raves, often alongside MC Spot."
  },
  "src": [
   "https://de.ra.co/events/2391499"
  ],
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "MC Spot": {
  "bio": {
   "de": "Wiener MC, der bei Raves als Host am Mikrofon steht. Wird in Line-ups mit Verweisen auf LIVING F/X und die Gazometer-Raves angekündigt, häufig gemeinsam mit MC Mars.",
   "en": "Vienna MC who hosts raves on the mic. Billed with references to LIVING F/X and the Gazometer raves, often alongside MC Mars."
  },
  "src": [
   "https://de.ra.co/events/2391499"
  ],
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "MARØ": {
  "img": "https://static.ra.co/images/profiles/square/maro.jpg?dateUpdated=1766386631437",
  "links": {
   "ra": "https://ra.co/dj/maro",
   "sc": "https://soundcloud.com/maro87c",
   "ig": "https://www.instagram.com/maro87c/",
   "bc": "https://maro87.bandcamp.com"
  },
  "from": {
   "de": "Deutschland (lebt in Österreich)",
   "en": "Germany (based in Austria)"
  },
  "genres": [
   "Techno",
   "Trance",
   "Hardgroove",
   "Breakbeat"
  ],
  "bio": {
   "de": "In Deutschland geborener, in Österreich ansässiger DJ und Produzent. Bekannt für energiegeladene, genreübergreifende Sets, die Techno, Trance und Hardgroove mit Breakbeats verbinden.",
   "en": "German-born DJ and producer based in Austria. Known for high-energy, genre-blurring sets that blend techno, trance and hardgroove with breakbeats."
  },
  "src": [
   "https://ra.co/events/2523457",
   "https://de.ra.co/dj/maro"
  ],
  "infoChk": "2026-10-31"
 },
 "Who is Ela¿": {
  "img": "https://static.ra.co/images/profiles/square/whoisela%C2%BF.jpg?dateUpdated=1774034559527",
  "links": {
   "ra": "https://ra.co/dj/whoisela%C2%BF",
   "sc": "https://soundcloud.com/whos_elaaa"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Elena Eichhorn",
  "genres": [
   "Techno"
  ],
  "bio": {
   "de": "DJ aus Österreich, bekannt für treibende Basslines, eingängige Sounds und energiegeladene Sets. Ihr Sound verbindet experimentellen Techno, hüpfende Melodien und harte Underground-Stile, mit Fokus auf Energie und unerwartete Momente.",
   "en": "Austrian DJ known for driving basslines, catchy sounds and energetic sets. Her sound blends experimental techno, bouncy melodies and hard underground styles, focusing on energy and unexpected moments."
  },
  "src": [
   "https://ra.co/dj/whoisela%C2%BF",
   "https://ra.co/events/2523457"
  ],
  "infoChk": "2026-10-31"
 },
 "DJ SDRICCI": {
  "links": {
   "sc": "https://soundcloud.com/hux-de-bude-aka-sdricci"
  },
  "bio": {
   "de": "Auch unter dem Namen HuxDeBude aktiv. Auf SoundCloud finden sich Sets u. a. von Vienna Virus und Ultraschall.",
   "en": "Also active under the name HuxDeBude. His SoundCloud features sets from events such as Vienna Virus and Ultraschall."
  },
  "src": [
   "https://soundcloud.com/hux-de-bude-aka-sdricci",
   "https://soundcloud.com/hux-de-bude-aka-sdricci/vienna-virus-prt2",
   "https://soundcloud.com/hux-de-bude-aka-sdricci/huxdebude-aka-sdricci",
   "https://soundcloud.com/hux-de-bude-aka-sdricci/garden-of-dreams-20191102",
   "https://soundcloud.com/hux-de-bude-aka-sdricci/huxdebude-surfclub-2014"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "alias": [
   "HuxDeBude"
  ],
  "sets": [
   {
    "t": "@garden of dreams 20191102",
    "u": "https://soundcloud.com/hux-de-bude-aka-sdricci/garden-of-dreams-20191102"
   },
   {
    "t": "HuxDeBude@surfclub 2014",
    "u": "https://soundcloud.com/hux-de-bude-aka-sdricci/huxdebude-surfclub-2014"
   },
   {
    "t": "HuxDeBude aka Sdricci @ ultraschall 2013",
    "u": "https://soundcloud.com/hux-de-bude-aka-sdricci/huxdebude-aka-sdricci"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Marilou": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Raphael Warg": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "LĪVA": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Mary Slim": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "Edictum": {
  "img": "https://static.ra.co/images/profiles/square/edictum.jpg?dateUpdated=1750928248000",
  "links": {
   "ra": "https://ra.co/dj/edictum",
   "sc": "https://soundcloud.com/edictum303",
   "bc": "https://edictum.bandcamp.com",
   "ig": "https://www.instagram.com/Edictum303",
   "web": "https://edictum.music"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Simon",
  "bio": {
   "de": "Edictum ist ein österreichischer Produzent und DJ, seit 2002 aktiv. Sein Fokus liegt auf melodischer, tanzbarer elektronischer Musik; Releases auf über 15 Labels. Er spielt regelmäßig in Wien, u. a. im Loop und bei Empyreon.",
   "en": "Edictum is an Austrian producer and DJ, active since 2002. He focuses on melodic, danceable electronic music and has released on more than 15 labels. He plays regularly in Vienna, including at Loop and Empyreon."
  },
  "src": [
   "https://fr.ra.co/dj/edictum"
  ],
  "infoChk": "2026-10-31"
 },
 "Matt Ludlam": {
  "infoChk": "2026-10-31",
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31"
 },
 "DJ Andy": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Max Wagner": {
  "img": "https://static.ra.co/images/profiles/square/maxwagner.jpg?dateUpdated=1712866351000",
  "links": {
   "ra": "https://ra.co/dj/maxwagner",
   "ig": "https://www.instagram.com/waxmagna"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "Max Wagner ist ein DJ aus Österreich. Er spielt vor allem in Wien, u. a. in Grelle Forelle, Flex und PRST.",
   "en": "Max Wagner is a DJ from Austria. He mostly plays in Vienna, including Grelle Forelle, Flex and PRST."
  },
  "src": [
   "https://de.ra.co/dj/maxwagner"
  ],
  "infoChk": "2026-10-31"
 },
 "Sony2k": {
  "infoChk": "2026-11-02",
  "img": "https://static.ra.co/images/profiles/square/sony2k.jpg?dateUpdated=1734451493000",
  "links": {
   "ra": "https://ra.co/dj/sony2k",
   "ig": "https://www.instagram.com/sony2k__"
  },
  "real": "Eric Odavas",
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "bio": {
   "de": "Sony2k ist ein in Deutschland ansässiger DJ aus dem Berliner Umfeld. Als Promoter veranstaltet er unter anderem die Party Rapido mit Trance und Hardgroove im Humboldthain Club in Berlin, wo er auch selbst auflegt.",
   "en": "Sony2k is a Germany-based DJ from the Berlin scene. As a promoter he runs events such as Rapido, a trance and hardgroove party at Humboldthain Club in Berlin, where he also plays himself."
  },
  "genres": [
   "Trance",
   "Hardgroove"
  ],
  "src": [
   "https://ra.co/dj/sony2k",
   "https://ra.co/events/2194462"
  ]
 },
 "Oliviero": {
  "img": "https://static.ra.co/images/profiles/square/oliviero.jpg?dateUpdated=1735293087900",
  "links": {
   "ra": "https://ra.co/dj/oliviero",
   "sc": "https://soundcloud.com/olivierowss"
  },
  "bio": {
   "de": "In Rom aufgewachsener DJ und Produzent, laut RA in Deutschland ansässig; aufgelegt hat er u. a. im Kater und Ritter Butzke in Berlin sowie im Balagan in Rom.",
   "en": "Rome-raised DJ and producer, listed by RA as based in Germany; he has played Kater and Ritter Butzke in Berlin and Balagan in Rome."
  },
  "from": {
   "de": "Rom",
   "en": "Rome"
  },
  "real": "Oliviero Maria Bianchi",
  "src": [
   "https://de.ra.co/dj/oliviero"
  ],
  "infoChk": "2026-10-31"
 },
 "High on Melancholia": {
  "noImg": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/highonmelancholia"
  },
  "src": [
   "https://soundcloud.com/highonmelancholia/high-on-melancholia-eskalante-kante-vol1-lichtbogen-09022024-set-recording",
   "https://soundcloud.com/dur_label/high-on-melancholia-bre-petrunko-dur007",
   "https://soundcloud.com/gesindel-der-nacht/high-on-melancholia-let-the-games-begin",
   "https://soundcloud.com/jahanamsound/high-on-melancholia-womanizer-hom-edit-jah092"
  ],
  "infoChk": "2026-11-02",
  "bio": {
   "de": "High on Melancholia (HOM.) ist ein Techno-Act mit Releases auf DUR_ (EP „High On Melancholia / Never Meant To Belong“, DUR007), GDN Records („Let The Games Begin“) und Jahanam. Auf SoundCloud finden sich Set-Aufnahmen, u. a. von der Reihe Eskalante Kante.",
   "en": "High on Melancholia (HOM.) is a techno act with releases on DUR_ (the “High On Melancholia / Never Meant To Belong” EP, DUR007), GDN Records (“Let The Games Begin”) and Jahanam. Their SoundCloud features set recordings, including from the Eskalante Kante series."
  },
  "labels": [
   "DUR_",
   "GDN Records",
   "Jahanam"
  ],
  "alias": ["HOM."],
  "sets": [
   {
    "t": "High On Melancholia @ Eskalante Kante Vol. 1, Lichtbogen (09.02.2024)",
    "u": "https://soundcloud.com/highonmelancholia/high-on-melancholia-eskalante-kante-vol1-lichtbogen-09022024-set-recording"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "LavendL": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "MATIVIO": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Glitzer & Bass": {
  "img": "https://static.ra.co/images/profiles/square/glitzerundbass.jpg?dateUpdated=1709052562000",
  "links": {
   "ra": "https://ra.co/dj/glitzerundbass",
   "ig": "https://www.instagram.com/glitzerundbass"
  },
  "bio": {
   "de": "Wiener Techno-Act, der u. a. im FLUCC, Club U, Volksgarten Pavillon (das techno cafe) und bei Himmel und Wasser aufgelegt hat. Außerdem gebucht für das Bachblyten Festival 2026.",
   "en": "Vienna-based techno act that has played FLUCC, Club U, Volksgarten Pavillon (das techno cafe) and Himmel und Wasser, and was booked for Bachblyten Festival 2026."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Marie-Christine Fischer",
  "src": [
   "https://ra.co/dj/glitzerundbass"
  ],
  "infoChk": "2026-10-31"
 },
 "Nafaka & Lipo": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Kollektiv Sheesh": {
  "noImg": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/kollektivsheesh"
  },
  "src": [
   "https://soundcloud.com/kollektivsheesh/matija-kollektiv-sheesh-im-freudentaumel-flucc-vienna-2023",
   "https://soundcloud.com/kollektivsheesh/kollektiv-sheesh-3000grad-festival-schiff-ahoi-3023"
  ],
  "infoChk": "2026-11-02"
 },
 "Chris Freud": {
  "img": "https://static.ra.co/images/profiles/square/chrisfreud.jpg?dateUpdated=1747310537723",
  "links": {
   "ra": "https://ra.co/dj/chrisfreud"
  },
  "bio": {
   "de": "Wiener DJ, der mit 17 seine Leidenschaft für elektronische Musik entdeckte und bald darauf mit dem Auflegen begann. Seine Sets verbinden Deep House, minimalistischen House und Tech House.",
   "en": "Viennese DJ who discovered electronic music at 17 and soon started DJing. His sets blend deep house, minimal house and tech house."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "genres": [
   "Deep House",
   "Minimal House",
   "Tech House"
  ],
  "src": [
   "https://ra.co/dj/chrisfreud",
   "https://ra.co/events/2218855"
  ],
  "infoChk": "2026-10-31"
 },
 "David Radi": {
  "img": "https://static.ra.co/images/profiles/square/davidradi.jpg?dateUpdated=1747401517000",
  "links": {
   "ra": "https://ra.co/dj/davidradi",
   "sc": "https://soundcloud.com/david-radi",
   "ig": "https://www.instagram.com/david.radi_ofc"
  },
  "bio": {
   "de": "DJ aus Österreich, der u. a. im PRST, im Vienna City Beach Club, im Aux Gazelles und am Badeschiff spielt.",
   "en": "Austrian DJ who plays venues such as PRST, Vienna City Beach Club, Aux Gazelles and Badeschiff."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "src": [
   "https://ra.co/dj/davidradi"
  ],
  "infoChk": "2026-10-31"
 },
 "Matthias Kaiser": {
  "img": "https://static.ra.co/images/profiles/square/matthiaskaiser.jpg?dateUpdated=1747732341000",
  "links": {
   "ra": "https://ra.co/dj/matthiaskaiser"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "src": [
   "https://ra.co/events/2218855",
   "https://ra.co/dj/matthiaskaiser"
  ],
  "infoChk": "2026-10-31"
 },
 "Gugu": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "src": [
   "https://ra.co/events/2521239"
  ],
  "infoChk": "2026-11-02"
 },
 "Hanneken": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "src": [
   "https://ra.co/events/1986880"
  ],
  "infoChk": "2026-11-02"
 },
 "PA_olo": {
  "noImg": "2026-11-02",
  "src": [
   "https://ra.co/events/1986880",
   "https://soundcloud.com/pa_olo"
  ],
  "infoChk": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/pa_olo"
  },
  "setsChecked": "2026-11-02"
 },
 "Romen Est Omen": {
  "noImg": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/romen_est_omen"
  },
  "src": [
   "https://soundcloud.com/romen_est_omen"
  ],
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "Peter Illias": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "bio": {
   "de": "Peter Illias ist Produzent und DJ im Bereich Progressive House. Er veröffentlichte u. a. „Summer Vibes“ auf Silk Music (Monstercat Silk) sowie „Evolution“ auf Silk Royal und „For This Moment“ (mit Ad Brown) auf Arrival.",
   "en": "Peter Illias is a progressive house producer and DJ. His releases include 'Summer Vibes' on Silk Music (Monstercat Silk), 'Evolution' on Silk Royal and 'For This Moment' (with Ad Brown) on Arrival."
  },
  "links": {
   "sc": "https://soundcloud.com/peter-illias"
  },
  "labels": [
   "Silk Music",
   "Silk Royal",
   "Arrival"
  ],
  "genres": [
   "Progressive House"
  ],
  "src": [
   "https://soundcloud.com/peter-illias",
   "https://www.beatport.com/track/summer-vibes-original-mix/4441719",
   "https://soundcloud.com/peter-illias/peter-illias-evolution",
   "https://soundcloud.com/peter-illias/peter-illias-moment-original"
  ],
  "setsChecked": "2026-11-02"
 },
 "CREEXX": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "src": [
   "https://ra.co/events/2506486"
  ],
  "infoChk": "2026-11-02"
 },
 "MJT & RPM": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "src": [
   "https://ra.co/events/2506486"
  ],
  "infoChk": "2026-10-31"
 },
 "D.b.h": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Urlaub in Jazzolo": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "infoChk": "2026-10-31"
 },
 "Café Mondo": {
  "noImg": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/cafe-mondo",
   "ig": "https://www.instagram.com/cafe_mondo_/",
   "web": "https://linktr.ee/cafe.mondo"
  },
  "bio": {
   "de": "Café Mondo ist eine Wiener Partyreihe bzw. ein DJ-Kollektiv, das Abende u. a. im Funkhaus und im Tagada Club veranstaltet und dazu internationale Gäste einlädt. Im Jänner 2026 feierte Café Mondo sein dreijähriges Bestehen. Mixe von Café Mondo liefen u. a. bei Callshop Radio, Res.Radio und Tropical Thunder.",
   "en": "Café Mondo is a Vienna party series / DJ collective hosting nights at venues such as Funkhaus and Tagada Club, inviting international guests. In January 2026 Café Mondo celebrated its third anniversary. Café Mondo mixes have aired on Callshop Radio, Res.Radio and Tropical Thunder."
  },
  "src": [
   "https://ra.co/events/2568365",
   "https://termine.orf.at/fm4/veranstaltung/3-years-caf-mondo-107856",
   "https://soundcloud.com/cafe-mondo",
   "https://soundcloud.com/callshopradio/cafe-mondo-190125",
   "https://soundcloud.com/resradio/sets/cafe-mondo",
   "https://soundcloud.com/tropicalthundervienna/cafe-mondo",
   "https://ra.co/promoters/196602",
   "https://soundcloud.com/callshopradio/cafe-mondo-081224"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "Café Mondo 19.01.25 (Callshop Radio)",
    "u": "https://soundcloud.com/callshopradio/cafe-mondo-190125"
   },
   {
    "t": "Cafe Mondo 08.12.24 (Callshop Radio)",
    "u": "https://soundcloud.com/callshopradio/cafe-mondo-081224"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "AudioDevice": {
  "noImg": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/audiodevice",
   "mc": "https://www.mixcloud.com/AudioDevice/"
  },
  "bio": {
   "de": "AudioDevice ist ein Wiener Drum-&-Bass-DJ, der seit Ende der 1990er in der Wiener Szene aktiv ist. Er spielte u. a. bei CONTRAST in der Grelle Forelle und in der CONTRAST Radio Show.",
   "en": "AudioDevice is a Vienna drum & bass DJ active in the local scene since the late 1990s. He has played CONTRAST at Grelle Forelle and on the CONTRAST Radio Show."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "alias": ["Audio Device"],
  "src": [
   "https://www.mixcloud.com/AudioDevice/listens/",
   "https://soundcloud.com/audiodevice",
   "https://soundcloud.com/audiodevice/audiodevice-at-contrast-grelle-forelle-2472021",
   "https://soundcloud.com/audiodevice/contrast-radio-show"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "CONTRAST RADIO SHOW AudioDevice MAR 21 2025",
    "u": "https://soundcloud.com/audiodevice/contrast-radio-show"
   },
   {
    "t": "AudioDevice At Contrast <>< Grelle Forelle Nov 20 2021",
    "u": "https://soundcloud.com/audiodevice/audiodevice-at-contrast-grelle-forelle-nov-20-2021"
   },
   {
    "t": "AudioDevice B2B Redex Warming Up 4 Phace At Contrast Boatparty 21.8.2021",
    "u": "https://soundcloud.com/audiodevice/audiodevice-b2b-redex-warming-up-4-phace-at-contrast-boatparty-2182021"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "ICY.DJ": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "src": [
   "https://ra.co/events/2250635"
  ],
  "infoChk": "2026-11-02"
 },
 "Incognito": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "src": [
   "https://ra.co/events/1873343",
   "https://ra.co/events/2250635"
  ],
  "infoChk": "2026-11-02"
 },
 "M4YB3": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "src": [
   "https://ra.co/events/2250635"
  ],
  "infoChk": "2026-10-31"
 },
 "Shaxoron": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "src": [
   "https://ra.co/events/2250635"
  ],
  "infoChk": "2026-11-02"
 },
 "Snowtek": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "bio": {
   "de": "Snowtek ist ein Drum-&-Bass-Produzent und -DJ mit Releases auf Blu Saphir (u. a. „Lost In Memory EP“, BLUS054) und Celsius Recordings („Underwater EP“ mit Ferice). Er arbeitet häufig mit Ferice zusammen und spielte 2024 bei „Eight Years NU:Vision“ in Österreich (gelistet als Blu Saphir / NU:Vision).",
   "en": "Snowtek is a drum & bass producer and DJ with releases on Blu Saphir (incl. the 'Lost In Memory EP', BLUS054) and Celsius Recordings ('Underwater EP' with Ferice). He frequently collaborates with Ferice and played 'Eight Years NU:Vision' in Austria in 2024 (billed as Blu Saphir / NU:Vision)."
  },
  "labels": [
   "Blu Saphir",
   "Celsius Recordings"
  ],
  "src": [
   "https://ra.co/events/1873343",
   "https://soundcloud.com/blusaphir_records/out-now-snowtek-lost-in-memory-lost-in-memory-ep-blus054",
   "https://soundcloud.com/celsiusrecordings/snowtek-ferice-circeling",
   "https://soundcloud.com/blusaphir_records/blu-saphir-studio-mix-003-by-snowtek-january-2022"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "Blu Saphir Studio Mix 003 w/ Snowtek (January 2022)",
    "u": "https://soundcloud.com/blusaphir_records/blu-saphir-studio-mix-003-by-snowtek-january-2022"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Pancratio": {
  "img": "https://static.ra.co/images/profiles/square/pancratio.jpg?dateUpdated=1787467740553",
  "links": {
   "ra": "https://ra.co/dj/pancratio",
   "sc": "https://www.soundcloud.com/pancratio",
   "ig": "https://www.instagram.com/_pancratio",
   "bc": "https://onetriptoavyon.bandcamp.com",
   "web": "https://linktr.ee/onetriptoavyon"
  },
  "bio": {
   "de": "Pancratio (bürgerlich Gian Luigi Mendozza) ist ein Produzent und Komponist aus Rom, der in Deutschland lebt. Er veröffentlicht u. a. auf Love On The Rocks und Faith Beat und war früher als Alli Borem, Ndsomeware und Archivia Tapes aktiv. Er spielt international, etwa im Berghain/Panorama Bar, Sub Club Glasgow und bei ADE.",
   "en": "Pancratio (real name Gian Luigi Mendozza) is a producer and composer from Rome, based in Germany. He releases on labels including Love On The Rocks and Faith Beat and was formerly known as Alli Borem, Ndsomeware and Archivia Tapes. He plays internationally, e.g. Berghain/Panorama Bar, Sub Club Glasgow and ADE."
  },
  "from": {
   "de": "Rom",
   "en": "Rome"
  },
  "real": "Gian Luigi Mendozza",
  "labels": [
   "Love On The Rocks",
   "Faith Beat"
  ],
  "alias": ["Alli Borem", "Ndsomeware", "Archivia Tapes"],
  "src": [
   "https://ra.co/dj/pancratio"
  ],
  "infoChk": "2026-10-31"
 },
 "Rayya": {
  "img": "https://static.ra.co/images/profiles/square/rayya.jpg?dateUpdated=1782044467233",
  "links": {
   "ra": "https://ra.co/dj/rayya",
   "sc": "https://www.soundcloud.com/user1751436",
   "ig": "https://www.instagram.com/sorayyameyer",
   "bc": "https://unarayya.bandcamp.com"
  },
  "bio": {
   "de": "Rayya (Sorayya Meyer) ist eine in Deutschland geborene, in Wien lebende DJ. Seit 2024 auf RA gelistet, spielt sie vor allem im SASS Music Club, im PRST und im Porto Pollo sowie im Funkhaus.",
   "en": "Rayya (Sorayya Meyer) is a German-born DJ based in Vienna. Listed on RA since 2024, she plays mostly at SASS Music Club, PRST and Porto Pollo, as well as Funkhaus."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Sorayya Meyer",
  "src": [
   "https://ra.co/dj/rayya"
  ],
  "infoChk": "2026-10-31"
 },
 "Catlex": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "src": [
   "https://soundcloud.com/catlexxx",
   "https://soundcloud.com/catlexmusic"
  ],
  "infoChk": "2026-11-02"
 },
 "Suitside": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "src": [
   "https://soundcloud.com/suitsidemusic",
   "https://soundcloud.com/herzfrequenz_techno/suitside-f2f-yonder-vs-a-face2face-rave-das-werk-15082025-set-recording-3"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "SUITSIDE F2F YØNDER – VS: A Face2Face Rave @ Das Werk (15.08.2025)",
    "u": "https://soundcloud.com/herzfrequenz_techno/suitside-f2f-yonder-vs-a-face2face-rave-das-werk-15082025-set-recording-3"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "DJ Parkverbot": {
  "img": "https://static.ra.co/images/profiles/square/djparkverbot.jpg?dateUpdated=1788429401000",
  "links": {
   "ra": "https://ra.co/dj/djparkverbot"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "real": "Leopold Hartmann",
  "src": [
   "https://ra.co/dj/djparkverbot"
  ],
  "infoChk": "2026-11-02"
 },
 "Lieblos": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Valera": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "src": [
   "https://ra.co/dj/valera-de"
  ],
  "infoChk": "2026-10-31"
 },
 "Sasuma": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "src": [
   "https://de.ra.co/dj/sasuma"
  ],
  "infoChk": "2026-11-02"
 },
 "Jayzo": {
  "img": "https://static.ra.co/images/profiles/square/jayzo.jpg?dateUpdated=1772388351453",
  "links": {
   "ra": "https://ra.co/dj/jayzo",
   "sc": "https://soundcloud.com/jayzodj",
   "ig": "https://www.instagram.com/jayzodj"
  },
  "bio": {
   "de": "Jayzo ist ein in Amsterdam ansässiger DJ für hypnotischen, energiegeladenen Raw Techno mit progressiven Einflüssen. Er begann 2010 am Strand von Scheveningen und hat in 26 Ländern gespielt.",
   "en": "Jayzo is an Amsterdam-based DJ playing hypnotic, high-energy raw techno with progressive influences. He started DJing at Scheveningen beach in 2010 and has played in 26 countries."
  },
  "from": {
   "de": "Amsterdam, Niederlande",
   "en": "Amsterdam, Netherlands"
  },
  "genres": [
   "Hypnotic Techno"
  ],
  "src": [
   "https://ra.co/dj/jayzo",
   "https://ra.co/dj/jayzo/biography"
  ],
  "infoChk": "2026-10-31"
 },
 "Vibechen": {
  "noImg": "2026-10-31",
  "links": {
   "sc": "https://soundcloud.com/vibechen"
  },
  "src": [
   "https://soundcloud.com/vibechen/vibechen-fm4-digital-konfusion-mixshow"
  ],
  "infoChk": "2026-10-31"
 },
 "URBANIST": {
  "noImg": "2026-10-31",
  "noLinks": "2026-10-31",
  "src": [
   "https://soundcloud.com/theurbanist"
  ],
  "infoChk": "2026-10-31"
 },
 "anxxxious_t": {
  "img": "https://static.ra.co/images/profiles/square/anxxxious_t.jpg?dateUpdated=1767757936970",
  "links": {
   "ra": "https://ra.co/dj/anxxxious_t",
   "sc": "https://soundcloud.com/anxxxious_t",
   "ig": "https://www.instagram.com/anxi0us_t"
  },
  "bio": {
   "de": "anxxxious_t ist bildende Künstlerin und DJ aus Deutschland mit Lebensmittelpunkt Wien. Sie spielt vor allem in Wien, u. a. im FLUCC, in der Pratersauna und im Celeste.",
   "en": "anxxxious_t is a German-born visual artist and DJ based in Vienna. She plays mostly in Vienna, including FLUCC, Pratersauna and Celeste."
  },
  "from": {
   "de": "Deutschland (lebt in Wien)",
   "en": "Germany (based in Vienna)"
  },
  "real": "Mathea Hoffmann",
  "src": [
   "https://ra.co/dj/anxxxious_t",
   "https://ra.co/dj/anxxxious_t/biography"
  ],
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "Ayū": {
  "img": "https://static.ra.co/images/profiles/square/ayu-1.jpg?dateUpdated=1778053913547",
  "links": {
   "ra": "https://ra.co/dj/ayu-1",
   "sc": "https://soundcloud.com/ayuuuuuuuuuuuu",
   "web": "https://linktr.ee/milano_ayu"
  },
  "bio": {
   "de": "Ayū ist ein in Berlin ansässiger Live-Act mit energiegeladener, im Trance verwurzelter Musik. Einflüsse kommen aus Tech House, Dub Techno, Deep Techno und Acid House.",
   "en": "Ayū is a Berlin-based live artist crafting high-energy, trance-rooted music with deep influences from Tech House, Dub Techno, Deep Techno and Acid House."
  },
  "from": {
   "de": "Berlin",
   "en": "Berlin"
  },
  "labels": [
   "Kalahari Oyster Cult",
   "Harmony Rec.",
   "Neptune Discs"
  ],
  "src": [
   "https://ra.co/dj/ayu-1",
   "https://soundcloud.com/ayuuuuuuuuuuuu/ayu-live-pbs-radio-melbourne-1"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "RA Live – Alfred Czital and Ayū (Live) – Pitch Music & Arts 2026",
    "u": "https://soundcloud.com/resident-advisor/ra-live-alfred-czital-and-ayu-pitch-music-arts-2026-13"
   },
   {
    "t": "Ayū*live @ PBS Radio Melbourne",
    "u": "https://soundcloud.com/ayuuuuuuuuuuuu/ayu-live-pbs-radio-melbourne-1"
   },
   {
    "t": "pi/live: Alfred Czital and Ayu live set @ Ankali, Prague (17.05.2024)",
    "u": "https://soundcloud.com/pipipigroup/pilive-alfred-czital-and-ayu-live-set-at-ankali-05-17-2024"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Mama Demba": {
  "noImg": "2026-11-01",
  "noLinks": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "The Res": {
  "noImg": "2026-11-01",
  "noLinks": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "Jana Passt": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "LinsenJoe": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Mia Wurscht": {
  "links": {
   "sc": "https://soundcloud.com/miawurscht"
  },
  "src": [
   "https://soundcloud.com/miawurscht"
  ],
  "noImg": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "SandimSchuh": {
  "links": {
   "sc": "https://soundcloud.com/ninjannn"
  },
  "src": [
   "https://soundcloud.com/ninjannn"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "Georgia Bird": {
  "img": "https://static.ra.co/images/profiles/square/georgiabird.jpg?dateUpdated=1784713038403",
  "links": {
   "ra": "https://ra.co/dj/georgiabird",
   "sc": "https://soundcloud.com/georgia-bird-3",
   "ig": "https://www.instagram.com/junglegeorgia",
   "bc": "https://georgiabird1.bandcamp.com"
  },
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "bio": {
   "de": "In Australien geborene DJ, die in Deutschland lebt. Verbunden mit dem Label The Space Between Us (TSBU).",
   "en": "Australian-born DJ based in Germany. Affiliated with the label The Space Between Us (TSBU)."
  },
  "labels": [
   "The Space Between Us"
  ],
  "sets": [
   {
    "t": "meltdown 13 - georgia bird",
    "u": "https://soundcloud.com/slowburncast/meltdown-013-georgia-bird"
   },
   {
    "t": "Georgia Bird @ daycare x Harmony [Sonnenraum, Berlin] 2025",
    "u": "https://soundcloud.com/harmony-rec/georgia-bird-daycare-x-harmony-sonnenraum-berlin-2025"
   }
  ],
  "setsChecked": "2026-11-01",
  "src": [
   "https://ra.co/dj/georgiabird"
  ],
  "infoChk": "2026-11-01"
 },
 "Menal Batti": {
  "img": "https://static.ra.co/images/profiles/square/menalbatti.jpg?dateUpdated=1692640637000",
  "links": {
   "ra": "https://ra.co/dj/menalbatti",
   "sc": "https://soundcloud.com/menal_batti",
   "ig": "https://www.instagram.com/menal_batti"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "In Schweden geborene DJ, die in Österreich lebt. Sie lädt dazu ein, in ihre wandelbare und vielschichtige Klangwelt einzutauchen.",
   "en": "Swedish-born DJ based in Austria. She invites listeners to immerse themselves in her transformative and multifaceted soundscape."
  },
  "sets": [
   {
    "t": "TILT.cast 11 Menal Batti",
    "u": "https://soundcloud.com/tilt-label/menal-batti-tiltcast-master-44"
   },
   {
    "t": "Vault Sessions #263 - Menal Batti",
    "u": "https://soundcloud.com/vault-sessions-collective/vault-sessions-263-menal-batti"
   }
  ],
  "setsChecked": "2026-11-01",
  "src": [
   "https://ra.co/dj/menalbatti"
  ],
  "infoChk": "2026-11-01"
 },
 "Pink Concrete": {
  "img": "https://static.ra.co/images/profiles/square/pinkconcrete.jpg?dateUpdated=1561540594000",
  "links": {
   "ra": "https://ra.co/dj/pinkconcrete",
   "sc": "https://soundcloud.com/pinkconcrete",
   "ig": "https://www.instagram.com/pinkconcrete",
   "bc": "https://herenthere.bandcamp.com",
   "web": "https://www.hereandthe.re"
  },
  "from": {
   "de": "Tschechien",
   "en": "Czech Republic"
  },
  "bio": {
   "de": "In der Türkei geborener DJ und Produzent, der in Tschechien lebt. Veröffentlichungen auf Labels wie Children of Tomorrow, Hardgroove, Bipolar Disorder, Hedone und hereandthere.",
   "en": "Turkish-born DJ and producer based in the Czech Republic. Releases on labels including Children of Tomorrow, Hardgroove, Bipolar Disorder, Hedone and hereandthere."
  },
  "real": "Yalin Yucel",
  "labels": [
   "Children of Tomorrow",
   "Hardgroove",
   "Bipolar Disorder",
   "Moving Pictures",
   "Hedone",
   "hereandthere",
   "EvilGroove Records"
  ],
  "sets": [
   {
    "t": "BCCO Podcast 388: Pink Concrete",
    "u": "https://soundcloud.com/bcco/bcco-podcast-388-pink-concrete"
   },
   {
    "t": "Pink Concrete — HATE Podcast 429",
    "u": "https://soundcloud.com/hate_music/pink-concrete-hate-podcast-429"
   }
  ],
  "setsChecked": "2026-11-01",
  "src": [
   "https://ra.co/dj/pinkconcrete"
  ],
  "infoChk": "2026-11-01"
 },
 "Yan": {
  "links": {
   "ra": "https://ra.co/dj/yan-cz",
   "sc": "https://soundcloud.com/yanmmxiv",
   "ig": "https://www.instagram.com/najkebarh"
  },
  "from": {
   "de": "Tschechien",
   "en": "Czech Republic"
  },
  "bio": {
   "de": "DJ aus Tschechien, Co-Kurator von Harmony Rec. und Resident im Ankali in Prag.",
   "en": "Czech DJ, co-curator of Harmony Rec. and resident at Ankali in Prague."
  },
  "real": "Jan Hrabek",
  "labels": [
   "Harmony Rec."
  ],
  "sets": [
   {
    "t": "Harmony Rec w/ Yan",
    "u": "https://soundcloud.com/shella-radio/harmony-rec-w-yan"
   }
  ],
  "setsChecked": "2026-11-01",
  "src": [
   "https://ra.co/dj/yan-cz"
  ],
  "noImg": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "anexate": {
  "links": {
   "sc": "https://soundcloud.com/anexate"
  },
  "sets": [
   {
    "t": "anexate - Technolog @Flex - Echosphere 20 04 14",
    "u": "https://soundcloud.com/anexate/anexate-technologflex-echosphere200414"
   },
   {
    "t": "Vienna Virus Infects Technolog @dasWerK(Vienna) 19 11 16",
    "u": "https://soundcloud.com/anexate/vienna-virus-infects-technolog-werk-19-11-16"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://soundcloud.com/anexate"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Hetum": {
  "infoChk": "2026-11-02",
  "img": "https://static.ra.co/images/profiles/square/hetum.jpg?dateUpdated=1511136000000",
  "links": {
   "ra": "https://ra.co/dj/hetum",
   "sc": "https://soundcloud.com/hetum"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "Hetum ist ein österreichischer Techno-DJ. Er spielt regelmäßig bei der Reihe technolog im Wiener Kramladen, meist gemeinsam mit Roton. Laut RA ist er auch unter den Namen Schallstrahler, Nareg und MarsBed aktiv.",
   "en": "Hetum is an Austrian techno DJ. He plays regularly at the technolog series at Kramladen in Vienna, usually alongside Roton. According to RA he is also active as Schallstrahler, Nareg and MarsBed."
  },
  "genres": [
   "Techno"
  ],
  "alias": ["Schallstrahler", "Nareg", "MarsBed", "ɦɘɬʊɱ"],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/hetum",
   "https://soundcloud.com/hetum"
  ]
 },
 "Roton": {
  "img": "https://static.ra.co/images/profiles/square/roton.jpg?dateUpdated=1792759218327",
  "links": {
   "ra": "https://ra.co/dj/roton",
   "sc": "https://soundcloud.com/roton",
   "web": "https://technolog.wtf"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "DJ und Produzent aus Wien. Spielt rohen, hypnotischen Techno mit tiefem Sub-Bass, minimalistischen Loops, industriellen Texturen und verzerrten Synths.",
   "en": "Vienna-based DJ and producer. Plays raw, hypnotic techno with deep sub-bass, minimalist loops, industrial textures and distorted synths."
  },
  "genres": [
   "Techno"
  ],
  "src": [
   "https://ra.co/dj/roton"
  ],
  "infoChk": "2026-11-01"
 },
 "adrialin": {
  "img": "https://static.ra.co/images/profiles/square/adrialin.jpg?dateUpdated=1708339086000",
  "links": {
   "ra": "https://ra.co/dj/adrialin",
   "sc": "https://soundcloud.com/adrialin",
   "ig": "https://www.instagram.com/adrialin_dj"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "DJ aus Wien. Ihre Leidenschaft gilt rauem, basslastigem Techno, der zum ewigen Bleiben auf der Tanzfläche einlädt.",
   "en": "Vienna-based DJ. Her passion lies in rough, bassy techno that makes you want to stay on the dance floor forever."
  },
  "real": "Adriana Davidovic",
  "genres": [
   "Techno"
  ],
  "sets": [
   {
    "t": "Rave on Society @das Werk Vienna 27.05.2023",
    "u": "https://soundcloud.com/adrialin/rave-on-society"
   },
   {
    "t": "Adrialin Closing Eskalante Kante Rave",
    "u": "https://soundcloud.com/adrialin/closing-eskalante-kante-rave"
   }
  ],
  "setsChecked": "2026-11-01",
  "src": [
   "https://ra.co/dj/adrialin"
  ],
  "infoChk": "2026-11-01"
 },
 "Enoltra": {
  "img": "https://f4.bcbits.com/img/0030125330_21.jpg",
  "links": {
   "bc": "https://enoltralive.bandcamp.com",
   "sc": "https://soundcloud.com/enoltralive",
   "ig": "https://instagram.com/enoltralive"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "Enoltra ist eine in Österreich lebende Produzentin elektronischer Musik und stammt ursprünglich aus Bosnien und Herzegowina. Ihre Musik bewegt sich zwischen Trance, Hard Techno, Schranz und Soundtracks.",
   "en": "Enoltra is an Austria-based electronic music producer originally from Bosnia and Herzegovina. Her music centers on trance, hard techno, schranz and soundtracks."
  },
  "genres": [
   "Trance",
   "Hard Techno",
   "Schranz"
  ],
  "src": [
   "https://enoltralive.bandcamp.com/music"
  ],
  "infoChk": "2026-11-01"
 },
 "The Bear": {
  "noImg": "2026-11-01",
  "noLinks": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "gåpe": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "wert": {
  "noImg": "2026-11-01",
  "noLinks": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "Luminoise": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Nikø Nøx": {
  "img": "https://static.ra.co/images/profiles/square/nikonox.jpg?dateUpdated=1793026945000",
  "links": {
   "ra": "https://ra.co/dj/nikonox",
   "sc": "https://soundcloud.com/nikonox",
   "ig": "https://www.instagram.com/dj_niko_nox",
   "web": "https://nikonox.com"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "Nikø Nøx verbindet die treibende Kraft von Peak Time Techno mit der Intensität von Hard Techno und ergänzt seine Sets um melodische und emotionale Momente. In Wien spielte er unter anderem im Kramladen, Club Lucia, Rhiz, Das Werk und Loop.",
   "en": "Nikø Nøx blends the drive of peak-time techno with the intensity of hard techno, adding melodic and emotional elements to his sets. In Vienna he has played Kramladen, Club Lucia, Rhiz, Das Werk and Loop."
  },
  "genres": [
   "Peak Time Techno",
   "Hard Techno"
  ],
  "alias": ["NIKØ NO/X"],
  "src": [
   "https://ra.co/dj/nikonox",
   "https://ra.co/dj/nikonox/biography"
  ],
  "infoChk": "2026-11-01"
 },
 "Zer0Ton1n": {
  "noImg": "2026-11-01",
  "noLinks": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "RIETVELD": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Arne": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "André": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02",
  "bio": {
   "de": "André legt seit über zehn Jahren auf und lebt seit 2019 in Offenbach. Er gräbt nach House, Progressive und Minimal ab den frühen 2000ern und betreibt die Off-Location-Reihe Not From This Earth. In Wien spielt er im Rahmen von Cyclic Existence.",
   "en": "André has been DJing for more than ten years and has lived in Offenbach since 2019. He digs for house, progressive and minimal from the early 2000s onwards and runs the off-location series Not From This Earth. In Vienna he plays as part of Cyclic Existence."
  },
  "genres": [
   "House",
   "Progressive",
   "Minimal"
  ]
 },
 "Arni Jr.": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Duplikate": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "PLAYBACK": {
  "noImg": "2026-11-01",
  "noLinks": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "MAH MOOD": {
  "img": "https://static.ra.co/images/profiles/square/mahmood.jpg?dateUpdated=1783951841643",
  "links": {
   "ra": "https://ra.co/dj/mahmood",
   "sc": "https://soundcloud.com/r8dtM6hCMn7328aH7",
   "ig": "https://www.instagram.com/__mah_mood____"
  },
  "from": {
   "de": "Haifa",
   "en": "Haifa"
  },
  "bio": {
   "de": "MAH MOOD ist ein queerer palästinensischer DJ, Produzent und Kurator aus Haifa. Er spielt hypnotischen Techno und perkussiven House, beeinflusst von den Underground-Traditionen aus Chicago, Detroit und Berlin. Er gründete die queere palästinensische Partyreihe Makhluta.",
   "en": "MAH MOOD is a queer Palestinian DJ, producer and curator based in Haifa. He plays hypnotic techno and percussive house influenced by the Chicago, Detroit and Berlin underground traditions. He founded the queer Palestinian party series Makhluta."
  },
  "genres": [
   "Techno",
   "House"
  ],
  "src": [
   "https://ra.co/dj/mahmood",
   "https://ra.co/dj/mahmood/biography"
  ],
  "infoChk": "2026-11-01"
 },
 "Rakans": {
  "img": "https://static.ra.co/images/profiles/rakans.jpg?dateUpdated=1578674790000",
  "links": {
   "ra": "https://ra.co/dj/rakans",
   "sc": "https://soundcloud.com/Rakans",
   "ig": "https://www.instagram.com/Rakanscom",
   "web": "https://www.rakans.com"
  },
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "bio": {
   "de": "Rakans ist DJ, Künstler und visueller Gestalter, dessen Weg in Beirut begann. Seine experimentellen, eklektischen Sets verbinden Techno mit orientalischen Einflüssen. Er gründete die Dresdner Clubnacht Rawmantique.",
   "en": "Rakans is a DJ, artist and visual creator whose journey began in Beirut. His experimental, eclectic sets blend techno with oriental influences. He founded the Dresden club night Rawmantique."
  },
  "labels": [
   "SYXT",
   "Linea Records",
   "Secta"
  ],
  "genres": [
   "Techno"
  ],
  "alias": ["LÜJAH"],
  "src": [
   "https://ra.co/dj/rakans",
   "https://ra.co/dj/rakans/biography"
  ],
  "infoChk": "2026-11-01"
 },
 "Sherine Falasteen": {
  "from": {
   "de": "Jerusalem",
   "en": "Jerusalem"
  },
  "bio": {
   "de": "Sherine Falasteen ist eine Drag-Künstlerin aus Jerusalem, die zwischen Ramallah und Brüssel lebt. Sie tritt in traditionellen Thobes auf und ist Resident-Performerin der Party Gazelle L'Hafla.",
   "en": "Sherine Falasteen is a drag artist originally from Jerusalem, based between Ramallah and Brussels. She performs in traditional thobes and is a resident performer of Gazelle L'Hafla."
  },
  "src": [
   "https://ra.co/events/2552786",
   "https://ra.co/events/2145453"
  ],
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "MODI": {
  "bio": {
   "de": "MODI ist Tabla-Spieler, geboren im Irak mit Wurzeln in Haifa. Er spielt live zu DJ-Sets und ergänzt sie um perkussive Rhythmen.",
   "en": "MODI is a tabla player born in Iraq with roots in Haifa. He joins DJ sets live, adding percussive rhythms."
  },
  "src": [
   "https://ra.co/events/2552786"
  ],
  "noImg": "2026-11-01",
  "noLinks": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "Sanadrilla": {
  "links": {
   "sc": "https://soundcloud.com/sanadrilla"
  },
  "bio": {
   "de": "Sanadrilla ist eine palästinensisch-jordanische DJ mit mütterlichen Wurzeln in Hebron. Sie spielt energiegeladene Arab-Pop-Edits und Selections.",
   "en": "Sanadrilla is a Palestinian-Jordanian DJ with maternal roots in Hebron, playing energetic Arab pop edits and selections."
  },
  "src": [
   "https://ra.co/events/2552786",
   "https://soundcloud.com/sanadrilla"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "Thomas Grün": {
  "img": "https://static.ra.co/images/profiles/thomasgrun.jpg?dateUpdated=1426300331543",
  "links": {
   "ra": "https://ra.co/dj/thomasgrun",
   "sc": "https://soundcloud.com/thomas-gruen",
   "web": "https://www.movimiento.at"
  },
  "from": {
   "de": "Kärnten",
   "en": "Carinthia"
  },
  "bio": {
   "de": "Thomas Grün wurde 1981 in Kärnten geboren. Zu seinen Einflüssen zählt er Jeff Mills, Carl Cox und Armand van Helden. Releases auf Untitled 100.",
   "en": "Thomas Grün was born in 1981 in Carinthia, Austria. He cites Jeff Mills, Carl Cox and Armand van Helden as influences. Releases on Untitled 100."
  },
  "labels": [
   "Untitled 100"
  ],
  "src": [
   "https://ra.co/dj/thomasgrun"
  ],
  "infoChk": "2026-11-01"
 },
 "Ulfersson": {
  "links": {
   "sc": "https://soundcloud.com/ulfersson"
  },
  "src": [
   "https://soundcloud.com/ulfersson"
  ],
  "noImg": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "Drehli Robnik": {
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "Drehli Robnik ist ein Wiener Film- und Politiktheoretiker, Kritiker, Essayist und „talking DJ“. In seinen DJ-Sets verbindet er Songs mit gleichnamigen Filmen.",
   "en": "Drehli Robnik is a Vienna-based film and political theorist, critic, essayist and 'talking DJ' whose sets pair songs with films of the same title."
  },
  "src": [
   "https://www.diametrale.at/en/festivals/2019-diametrale/program/dj-brunch-mit-drehli-robnik/",
   "https://geschichte.lbg.ac.at/team/drehli-robnik/?lang=en"
  ],
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Vantan": {
  "links": {
   "sc": "https://soundcloud.com/johannavantan"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "Vantan ist das Projekt der Wiener Komponistin, Performerin und Instrumentalistin Johanna Schlömicher. Ihre Musik bewegt sich zwischen Soundscapes, Singer-Songwriter, Noise, Synth-Pop und New Wave.",
   "en": "Vantan is the project of Viennese composer, performer and instrumentalist Johanna Schlömicher, moving between soundscapes, singer-songwriter material, noise, synth pop and new wave."
  },
  "real": "Johanna Schlömicher",
  "src": [
   "https://de.ra.co/events/2101000",
   "https://soundcloud.com/johannavantan"
  ],
  "noImg": "2026-11-01",
  "infoChk": "2026-11-01"
 },
 "Sodomland": {
  "img": "https://static.ra.co/images/profiles/square/sodomland.jpg?dateUpdated=1782761041460",
  "links": {
   "ra": "https://ra.co/dj/sodomland",
   "sc": "https://soundcloud.com/sodomland",
   "ig": "https://www.instagram.com/sodomland",
   "bc": "https://sodomland.bandcamp.com"
  },
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "bio": {
   "de": "Sodomland ist ein in Deutschland ansässiger Act. Die Selbstbeschreibung auf RA lautet „Esoteric EDM Ontology“.",
   "en": "Sodomland is a Germany-based act, self-described on RA as 'Esoteric EDM Ontology'."
  },
  "src": [
   "https://ra.co/dj/sodomland"
  ],
  "infoChk": "2026-11-01"
 },
 "Fatima Hajji": {
  "img": "https://static.ra.co/images/profiles/square/fatimahajji.jpg?dateUpdated=1739448008000",
  "links": {
   "ra": "https://ra.co/dj/fatimahajji",
   "sc": "https://soundcloud.com/fatimahajji",
   "ig": "https://www.instagram.com/fatimahajji",
   "web": "https://www.fatimahajji.com"
  },
  "from": {
   "de": "Spanien",
   "en": "Spain"
  },
  "bio": {
   "de": "Fatima Hajji ist eine spanische Techno-DJ mit arabischen Wurzeln und bekannt für energiegeladene Sets. Sie verbindet Tribal-Grooves mit modernem Techno. Releases u. a. auf Codex Recordings, Pornographic Recordings und Unity Records.",
   "en": "Fatima Hajji is a Spanish techno DJ with Arab roots, known for high-energy shows. She blends tribal grooves with modern techno. Releases include Codex Recordings, Pornographic Recordings and Unity Records."
  },
  "labels": [
   "Standbite Music",
   "Pornographic Recordings",
   "Unity Records",
   "Riot Recordings",
   "AudioCode Records",
   "Taikatta",
   "Codex Recordings",
   "Dolma Records",
   "Emphatic Records",
   "Silver M"
  ],
  "src": [
   "https://ra.co/dj/fatimahajji"
  ],
  "infoChk": "2026-11-01"
 },
 "Jah Power Sound": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Kobermann": {
  "img": "https://static.ra.co/images/profiles/kobermann.jpg?dateUpdated=1583343662000",
  "links": {
   "ra": "https://ra.co/dj/kobermann"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "Kobermann (Johannes Piller, auch Laminat) ist ein österreichischer Artist, der vor allem in Wien auftritt, etwa im Werk, in der Grellen Forelle und im Celeste. Releases auf Terra Magica Rec.",
   "en": "Kobermann (Johannes Piller, aka Laminat) is an Austrian artist who mostly plays in Vienna, including Das Werk, Grelle Forelle and Celeste. Releases on Terra Magica Rec."
  },
  "real": "Johannes Piller",
  "labels": [
   "Terra Magica Rec."
  ],
  "alias": ["Laminat"],
  "src": [
   "https://ra.co/dj/kobermann"
  ],
  "infoChk": "2026-11-01"
 },
 "MPU101": {
  "img": "https://i.scdn.co/image/ab6761610000e5eb594e23449e92af6107ee5a31",
  "links": {
   "sc": "https://soundcloud.com/mpu101",
   "sp": "https://open.spotify.com/artist/2P7CNpfHB0cOsqu0Gwl8he"
  },
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "bio": {
   "de": "MPU101 ist ein Produzent aus Deutschland, der auf Ilian Tape veröffentlicht, darunter die Releases MPU101 bis MPU108. Er tritt mit Live-Sets auf.",
   "en": "MPU101 is a German producer releasing on Ilian Tape, including the MPU101–MPU108 series, and performs live sets."
  },
  "labels": [
   "Ilian Tape"
  ],
  "src": [
   "https://open.spotify.com/artist/2P7CNpfHB0cOsqu0Gwl8he"
  ],
  "infoChk": "2026-11-01"
 },
 "Electric Indigo": {
  "img": "https://static.ra.co/images/profiles/square/electricindigo.jpg?dateUpdated=1535236216000",
  "links": {
   "ra": "https://ra.co/dj/electricindigo",
   "sc": "https://soundcloud.com/indigo",
   "bc": "https://electricindigo.bandcamp.com",
   "web": "https://indigo-inc.at"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "Electric Indigo (Susanne Kirchmayr) ist eine österreichische DJ, Musikerin und Komponistin, die seit über 30 Jahren in 45 Ländern auflegt. Veröffentlichungen u. a. auf Editions Mego, Imbalance Computer Music, Disko B und ihrem Label indigo:inc.",
   "en": "Electric Indigo (Susanne Kirchmayr) is an Austrian DJ, musician and composer who has played clubs and festivals in 45 countries for more than 30 years. Releases include Editions Mego, Imbalance Computer Music, Disko B and her own indigo:inc."
  },
  "real": "Susanne Kirchmayr",
  "labels": [
   "International DeeJay Gigolo Records",
   "Disko B",
   "Editions Mego",
   "Imbalance Computer Music",
   "Athletikk",
   "Muller Records",
   "indigo:inc",
   "Illegal Alien Records",
   "Different is Different Records",
   "temp~"
  ],
  "src": [
   "https://ra.co/dj/electricindigo"
  ],
  "infoChk": "2026-11-01"
 },
 "Dune": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Neophyte": {
  "from": {
   "de": "Niederlande",
   "en": "Netherlands"
  },
  "img": "https://static.ra.co/images/profiles/square/neophyte.jpg?dateUpdated=1716925787000",
  "links": {
   "ra": "https://ra.co/dj/neophyte",
   "sp": "https://open.spotify.com/artist/2AfGElfjqXuSyUny7dsj9p"
  },
  "src": [
   "https://ra.co/dj/neophyte",
   "https://en.wikipedia.org/wiki/Neophyte_(band)",
   "https://www.technoairlines.com/artist/neophyte"
  ],
  "infoChk": "2026-11-02",
  "bio": {
   "de": "Neophyte ist eine niederländische Hardcore-/Gabber-Formation, 1992 in Rotterdam gegründet; aktuell besteht sie aus Jeroen Streunding, Danny Greten und Jarno Butter. Die frühen Tracks erschienen auf Paul Elstaks Label Rotterdam Records, später gründete die Gruppe ihr eigenes Label Neophyte Records (u. a. Tha Playah, DJ Panic, Evil Activities). Bekannt sind u. a. „Army of Hardcore“ und die offizielle Thunderdome-Hymne „TD is You“ (2012).",
   "en": "Neophyte is a Dutch hardcore/gabber group formed in 1992 in Rotterdam, currently made up of Jeroen Streunding, Danny Greten and Jarno Butter. Their early tracks came out on Paul Elstak's Rotterdam Records, and the group later founded its own label Neophyte Records (home to Tha Playah, DJ Panic and Evil Activities, among others). Known tracks include \"Army of Hardcore\" and the official Thunderdome anthem \"TD is You\" (2012)."
  },
  "labels": [
   "Neophyte Records",
   "Rotterdam Records"
  ],
  "genres": [
   "Hardcore",
   "Gabber"
  ]
 },
 "Ed Rush": {
  "from": {
   "de": "Vereinigtes Königreich",
   "en": "United Kingdom"
  },
  "real": "Ben Settle",
  "img": "https://static.ra.co/images/profiles/edrush.jpg?dateUpdated=1187272638407",
  "links": {
   "ra": "https://ra.co/dj/edrush",
   "sc": "https://soundcloud.com/edrush"
  },
  "labels": [
   "Virus Recordings",
   "V Recordings",
   "Quarantine",
   "Resist Music",
   "Deep Jungle Records"
  ],
  "genres": [
   "Drum & Bass"
  ],
  "bio": {
   "de": "Ed Rush (bürgerlich Ben Settle) aus Großbritannien gilt als eine der prägenden Figuren des Drum & Bass. Er veröffentlichte u. a. auf Virus Recordings, V Recordings, Quarantine und Deep Jungle Records und ist auch als Teil des Duos Ed Rush & Optical bekannt.",
   "en": "Ed Rush (real name Ben Settle) from the UK is regarded as one of the leading figures of drum & bass. He has released on Virus Recordings, V Recordings, Quarantine and Deep Jungle Records, among others, and is also known as one half of Ed Rush & Optical."
  },
  "src": [
   "https://ra.co/dj/edrush"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "Ed Rush – Summer 2012 Mix",
    "u": "https://soundcloud.com/edrush/ed-rush-summer-2012-mix-final"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "POSTSCRIPTUM": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Gaouta": {
  "img": "https://i.scdn.co/image/ab6761610000e5eb4c2bb832ac6ec6a011a9b253",
  "links": {
   "sp": "https://open.spotify.com/artist/6WaK9Bq6tJ5gRhs0VTtujg",
   "sc": "https://soundcloud.com/gaouta",
   "bc": "https://gaoutamusic.bandcamp.com"
  },
  "src": [
   "https://open.spotify.com/artist/6WaK9Bq6tJ5gRhs0VTtujg",
   "https://gaoutamusic.bandcamp.com",
   "https://www.periscope-lyon.com/?p=17943"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "GAOUTA @ GIMIC (02.10.2024)",
    "u": "https://soundcloud.com/gimic-radio/gaouta-gimic-02-october-2024"
   },
   {
    "t": "Club Gouine invite Gaouta (Januar 2024)",
    "u": "https://soundcloud.com/ines-yazidi-608912782/club-gouine-invite-gaouta"
   }
  ],
  "setsChecked": "2026-11-02",
  "from": {
   "de": "Casablanca, Marokko",
   "en": "Casablanca, Morocco"
  },
  "bio": {
   "de": "Gaouta ist eine marokkanische Musikerin aus Casablanca. Sie schreibt, komponiert und produziert Cold-Wave- und Post-Punk-Musik mit 80er-Einflüssen und singt auf Darija (marokkanisches Arabisch). Live tritt sie solo an Drums mit elektronischen Texturen auf.",
   "en": "Gaouta is a Moroccan musician based in Casablanca. She writes, composes and produces cold wave and post-punk music with 80s influences, sung in Darija (Moroccan Arabic). Live, she performs solo on drums with electronic textures."
  },
  "genres": [
   "Post-Punk",
   "Cold Wave",
   "New Wave"
  ]
 },
 "Jules Foe": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Redivider": {
  "links": {
   "sc": "https://soundcloud.com/redividervienna",
   "ig": "https://www.instagram.com/redivideredivider"
  },
  "src": [
   "https://soundcloud.com/redividervienna",
   "https://sassvienna.com/en/events/event/Redivider-173"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "FESH": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Antone": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Dudas": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Chris Eru": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Mahofsky": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Adina Camhy": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/adinacamhy"
  },
  "bio": {
   "de": "Adina Camhy ist eine in Graz und Wien tätige Künstlerin an der Schnittstelle von Musik, Sound, Video, Text, Performance und Zeichnung. Live arbeitet sie mit Field Recordings, Kirchenorgel-Improvisationen und Stimme zwischen Noise, Ambient, Drone und Industrial. Ihr Album „krst“ erschien im September 2025 auf Small Forms und basiert auf Field Recordings aus Residencies in Triest 2023 und 2024.",
   "en": "Adina Camhy is an artist based in Graz and Vienna working across music, sound, video, text, performance and drawing. Her live work combines field recordings, church organ improvisation and voice between noise, ambient, drone and industrial. Her album 'krst' was released in September 2025 on Small Forms and is based on field recordings made during residencies in Trieste in 2023 and 2024."
  },
  "from": {
   "de": "Graz/Wien",
   "en": "Graz/Vienna, Austria"
  },
  "genres": [
   "Experimental",
   "Ambient",
   "Drone",
   "Noise"
  ],
  "labels": [
   "Small Forms"
  ],
  "sets": [
   {
    "t": "Concert excerpt – Wow! Signal Festival, April 2024, Semmelweisklinik, Vienna",
    "u": "https://soundcloud.com/adinacamhy/wow-signal-concert-excerpt-2024"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://smallforms.bandcamp.com/album/krst",
   "https://dafilms.com/director/12989-adina-camhy"
  ]
 },
 "Andrea Ida": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Philipp Otterbach": {
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "img": "https://static.ra.co/images/profiles/philippotterbach.jpg?dateUpdated=1428411289637",
  "links": {
   "ra": "https://ra.co/dj/philippotterbach",
   "sc": "https://soundcloud.com/philipp-otterbach"
  },
  "labels": [
   "Offen Music",
   "Knekelhuis",
   "Tour Messier",
   "Grokenberger Records",
   "R.i.O.",
   "WARNING"
  ],
  "bio": {
   "de": "Philipp Otterbach ist ein DJ und Produzent aus Deutschland. Er veröffentlichte u. a. auf Offen Music, Knekelhuis, Tour Messier, Grokenberger Records und R.i.O.",
   "en": "Philipp Otterbach is a DJ and producer from Germany. He has released on Offen Music, Knekelhuis, Tour Messier, Grokenberger Records and R.i.O., among others."
  },
  "src": [
   "https://ra.co/dj/philippotterbach"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "Crack Mix 305: Philipp Otterbach",
    "u": "https://soundcloud.com/crackmagazine/crack-mix-305-phillip-otterbach"
   },
   {
    "t": "Warming S03E05 Philipp Otterbach",
    "u": "https://soundcloud.com/warningberlin/warming_philipp_otterbach"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Grenco": {
  "from": {
   "de": "Kroatien",
   "en": "Croatia"
  },
  "real": "Fran Grenko",
  "img": "https://static.ra.co/images/profiles/square/grenco.jpg?dateUpdated=1768569419933",
  "links": {
   "ra": "https://ra.co/dj/grenco",
   "sc": "https://soundcloud.com/grenco",
   "ig": "https://www.instagram.com/grenco_dj"
  },
  "labels": [
   "THANQ",
   "Picnic Records"
  ],
  "bio": {
   "de": "Grenco (Fran Grenko) ist ein Produzent und DJ aus Kroatien und gehört zur neuen Generation der kroatischen Underground-Szene. Er veröffentlichte auf THANQ und Picnic Records.",
   "en": "Grenco (Fran Grenko) is a producer and DJ from Croatia and part of the new generation of the country's underground scene. He has released on THANQ and Picnic Records."
  },
  "src": [
   "https://ra.co/dj/grenco"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "Grenco ■ Hapësira Podcast LXXII",
    "u": "https://soundcloud.com/hapesira/grenco-hapesira-podcast-lxxii"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Andrija Mlacovic": {
  "from": {
   "de": "Kroatien",
   "en": "Croatia"
  },
  "img": "https://static.ra.co/images/profiles/square/andrijamlacovic.jpg?dateUpdated=1731578495000",
  "links": {
   "ra": "https://ra.co/dj/andrijamlacovic",
   "sc": "https://soundcloud.com/andrijamla"
  },
  "src": [
   "https://ra.co/dj/andrijamlacovic"
  ],
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02",
  "bio": {
   "de": "Andrija Mlacovic ist ein DJ aus Kroatien, der laut RA vor allem in Zagreb auftritt, am häufigsten im Club Masters. In Wien spielt er mit dem Green Light Collective.",
   "en": "Andrija Mlacovic is a DJ from Croatia who, according to RA, mostly plays in Zagreb, most often at Masters. In Vienna he plays with Green Light Collective."
  }
 },
 "Andreas": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Ian Staraj": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/ianstaraj"
  },
  "sets": [
   {
    "t": "Ian Staraj @ Love International 2024",
    "u": "https://soundcloud.com/greenlight_collective/ian-staraj-love-international-2024"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://soundcloud.com/ianstaraj",
   "https://soundcloud.com/greenlight_collective/ian-staraj-love-international-2024",
   "https://ra.co/events/2554813"
  ]
 },
 "RUG": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Marie Byrd Land": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Soulspin": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "links": {
   "mc": "https://www.mixcloud.com/djsoulspin/"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "genres": [
   "Soul",
   "Funk",
   "Disco",
   "House"
  ],
  "sets": [
   {
    "t": "Decades",
    "u": "https://www.mixcloud.com/djsoulspin/decades/"
   },
   {
    "t": "The Real Nitty Gritty",
    "u": "https://www.mixcloud.com/djsoulspin/the-real-nitty-gritty/"
   },
   {
    "t": "Discoliebe",
    "u": "https://www.mixcloud.com/djsoulspin/discoliebe/"
   }
  ],
  "bio": {
   "de": "Soulspin ist ein Wiener DJ, dessen Mixe sich zwischen Soul, Funk, Disco, House und Edits bewegen. Beim Superego-Records-Labelabend im Celeste wird er mit Disco, Italo, Hi-NRG und Proto-House angekündigt.",
   "en": "Soulspin is a Vienna-based DJ whose mixes move between soul, funk, disco, house and edits. For the Superego Records label night at Celeste he is billed with disco, Italo, Hi-NRG and proto-house."
  },
  "src": [
   "https://www.mixcloud.com/djsoulspin/"
  ],
  "setsChecked": "2026-11-02"
 },
 "Dansmussen": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Siili": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/siilimusic"
  },
  "src": [
   "https://soundcloud.com/siilimusic",
   "https://soundcloud.com/siilimusic/siili-dead-end-praterstern-original-mix"
  ],
  "setsChecked": "2026-11-02"
 },
 "Punzmann": {
  "infoChk": "2026-11-02",
  "img": "https://static.ra.co/images/profiles/square/punzmann.jpg?dateUpdated=1658219698000",
  "bio": {
   "de": "Punzmann (Christoph Punzmann) ist ein in Deutschland geborener Komponist, Performer, Multiinstrumentalist und Produzent mit peruanischen Wurzeln. Seine Arbeiten reichen von Stereo- und Mehrkanal-Live-Performances über Guzheng bis zu klassischer Instrumentalmusik und nutzen Field Recordings sowie analoge und digitale Synthese. Auf dem Wiener Label Superego Records erschienen das Album „Hoquetus“ (2023) und die Doppelsingle „Chaski / Ananay“ (2026).",
   "en": "Punzmann (Christoph Punzmann) is a German-born composer, performer, multi-instrumentalist and producer with Peruvian roots. His work ranges from stereo and multichannel live performances to guzheng and classical instrumental music, drawing on field recordings and analogue and digital synthesis. The Viennese label Superego Records released his album 'Hoquetus' (2023) and the double single 'Chaski / Ananay' (2026)."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Christoph Punzmann",
  "links": {
   "ra": "https://ra.co/dj/punzmann",
   "ig": "https://www.instagram.com/punzmann_/",
   "bc": "https://punzmann.bandcamp.com",
   "web": "https://www.punzmann.com"
  },
  "labels": [
   "Superego Records"
  ],
  "genres": [
   "Experimental",
   "Electroacoustic"
  ],
  "src": [
   "https://ra.co/dj/punzmann",
   "https://www.superego-records.com/artist-punzmann.html",
   "https://www.superego-records.com/kopie-von-punzmann-1"
  ]
 },
 "Nava Hemyari": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Kilroy": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Gush Valley": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "links": {
   "ig": "https://www.instagram.com/gush.valley/"
  },
  "src": [
   "https://www.instagram.com/gush.valley/",
   "https://de.ra.co/events/2384766"
  ]
 },
 "Darina": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Djinn Sylva": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Xavior": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "PartyPauli": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "bio": {
   "de": "PartyPauli legt in der Wiener Clubszene auf, u. a. bei Achterbahn (f2f mit DJ SUSI) im PRST und beim MUSCHI ISST WURST Festival. Auf SoundCloud veröffentlicht PartyPauli eigene Edits, etwa Baile-, Summer-Trance- und Donk-Versionen bekannter Tracks.",
   "en": "PartyPauli plays in Vienna's club scene, including Achterbahn (f2f with DJ SUSI) at PRST and the MUSCHI ISST WURST festival. On SoundCloud, PartyPauli releases their own edits, such as baile, summer-trance and donk versions of well-known tracks."
  },
  "links": {
   "sc": "https://soundcloud.com/user-199275066",
   "ig": "https://www.instagram.com/partypaulii/"
  },
  "src": [
   "https://ra.co/events/2359494",
   "https://ra.co/events/2411670",
   "https://ra.co/events/2249727",
   "https://soundcloud.com/user-199275066/undressed-sombr-summer-trance-edit",
   "https://soundcloud.com/user-199275066/break-it-off-pinkpantheress",
   "https://soundcloud.com/user-199275066/shake-it-to-the-max-donk-remix",
   "https://www.instagram.com/partypaulii/"
  ],
  "setsChecked": "2026-11-02"
 },
 "Voltmarie": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "DJ Backstage": {
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "img": "https://static.ra.co/images/profiles/square/djbackstage.jpg?dateUpdated=1708952443000",
  "links": {
   "ra": "https://ra.co/dj/djbackstage",
   "sc": "https://soundcloud.com/djbackstage"
  },
  "src": [
   "https://de.ra.co/dj/djbackstage",
   "https://es-mx.ra.co/dj/djbackstage"
  ],
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02",
  "bio": {
   "de": "DJ Backstage ist ein österreichischer DJ aus dem Umfeld der Wiener Reihe Cybertribe und spielt regelmäßig bei deren Events im PRST, in The Loft und im Gleis 19. 2025 legte er außerdem in Amsterdam auf, u. a. in der Hi-Fi-Bar Radio Radio und bei SISSI'S.",
   "en": "DJ Backstage is an Austrian DJ from the orbit of the Vienna series Cybertribe, playing its events at PRST, The Loft and Gleis 19. In 2025 he also played in Amsterdam, including the hi-fi bar Radio Radio and SISSI'S."
  }
 },
 "Aura": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02",
  "bio": {
   "de": "Aura ist das dawless Live-Projekt von Dcascallana und pezel. Dcascallana spielt regelmäßig in Wiener Clubs wie Kramladen, FLUCC und Das Werk und ist mit dem Label Dark Pressure verbunden.",
   "en": "Aura is the dawless live project of Dcascallana and pezel. Dcascallana plays regularly at Vienna clubs such as Kramladen, FLUCC and Das Werk and is connected to the label Dark Pressure."
  },
  "genres": [
   "Techno",
   "Live"
  ],
  "src": [
   "https://de.ra.co/dj/dcascallana"
  ]
 },
 "Pezo Fox": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/pezofox"
  },
  "sets": [
   {
    "t": "Pezo Steelo 2022-01-24",
    "u": "https://soundcloud.com/pezofox/pezo_steelo_24jan2022"
   },
   {
    "t": "MQ Weekendsounds 2014-08-17",
    "u": "https://soundcloud.com/pezofox/mq-weekendsounds-2014-08-17"
   }
  ],
  "src": [
   "https://soundcloud.com/pezofox"
  ],
  "setsChecked": "2026-11-02"
 },
 "Mantis": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Stoney Curtis": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Zuzee": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Scooby Duo": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "links": {
   "mc": "https://www.mixcloud.com/scoobyduo/"
  },
  "bio": {
   "de": "Scooby Duo ist ein Wiener DJ-Duo, das seit 2012 aktiv ist und neue Fundstücke, alte Platten und Underground-Grooves teilt. Das Duo moderiert jeden ersten Montag im Monat die „Scooby Duo Radio Show“ auf Radio Superfly.",
   "en": "Scooby Duo is a Vienna-based DJ duo active since 2012, sharing new finds, old records and underground grooves. They host the Scooby Duo Radio Show on Radio Superfly on the first Monday of every month."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "sets": [
   {
    "t": "The Scooby Duo Radio Show 010",
    "u": "https://www.mixcloud.com/scoobyduo/the-scooby-duo-radio-show-010/"
   },
   {
    "t": "The Scooby Duo Radio Show 001",
    "u": "https://www.mixcloud.com/scoobyduo/the-scooby-duo-radio-show-001/"
   }
  ],
  "src": [
   "https://www.mixcloud.com/scoobyduo/listens/",
   "https://www.mixcloud.com/scoobyduo/the-scooby-duo-radio-show-010/"
  ],
  "setsChecked": "2026-11-02"
 },
 "Dicie Globie": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Sparky Rugged": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Astarr": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Ijahson": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Bandulu": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Camel": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "DJ Smo": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "links": {
   "mc": "https://www.mixcloud.com/realdjsmo/",
   "sc": "https://soundcloud.com/realdjsmo",
   "ig": "https://www.instagram.com/realdjsmo",
   "web": "https://hyperfollow.com/djsmo"
  },
  "bio": {
   "de": "DJ Smo ist ein in Wien ansässiger Dancehall-DJ, Produzent und MC. Laut eigenem Profil ist er Kernmitglied der Jugglerz-Crew und veröffentlicht seit 2022 eigene Musik zwischen Trap und Dancehall, u. a. mit Konshens und Spice. Seine Mixtapes reichen von Dancehall und Bashment über Afro bis Reggae.",
   "en": "DJ Smo is a Vienna-based dancehall DJ, producer and MC. According to his own profile he is a core member of the Jugglerz crew and has released solo music blending trap and dancehall since 2022, including collaborations with Konshens and Spice. His mixtapes range from dancehall and bashment to afro and reggae."
  },
  "genres": [
   "Dancehall",
   "Reggae"
  ],
  "sets": [
   {
    "t": "Hot Gyal Summer Dancehall Mixtape (2026)",
    "u": "https://www.mixcloud.com/realdjsmo/hot-gyal-summer-dancehall-mixtape-2026/"
   },
   {
    "t": "DJ Smo live in Warsaw 2026 – hosted by Splendid Sound",
    "u": "https://www.mixcloud.com/realdjsmo/dj-smo-live-in-warsaw-2026-hosted-by-splendid-sound-dancehall/"
   },
   {
    "t": "DJ Smo – Kingston Current – Reggae Mixtape 2026",
    "u": "https://www.mixcloud.com/realdjsmo/dj-smo-kingston-current-reggae-mixtape-2026/"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://www.mixcloud.com/realdjsmo/stream/",
   "https://soundcloud.com/realdjsmo/smo23",
   "https://soundcloud.com/realdjsmo/transporter-mixtape"
  ]
 },
 "Baba Sound": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Kings Crown Sound": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Thr33lake": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Royal Marx Sound": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "G Spot Sound": {
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "links": {
   "mc": "https://www.mixcloud.com/gspotsound/"
  },
  "src": [
   "https://www.mixcloud.com/gspotsound/",
   "https://www.sherwood.it/articolo/4537/g-spot-sound-from-wien-aut",
   "https://www.mixcloud.com/gspotsound/uploads/"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "bio": {
   "de": "G-Spot Sound ist ein Wiener Soundsystem in jamaikanischer Tradition, 2001 von Phile und Oliver gegründet. Die Crew veranstaltet Dances und setzt auf Dubplates, die bei regelmäßigen Reisen nach Kingston aufgenommen werden. Später kamen Selecta O.G. und 2004 Koolbreak dazu; bekannt ist das Soundsystem vor allem für sein Juggling.",
   "en": "G-Spot Sound is a Vienna-based soundsystem in the Jamaican tradition, founded in 2001 by Phile and Oliver. The crew organises dances and focuses on dubplates voiced during regular trips to Kingston. Selecta O.G. joined later and Koolbreak in 2004; the sound is known above all for its juggling."
  },
  "genres": [
   "Reggae",
   "Dancehall"
  ],
  "sets": [
   {
    "t": "G-SPOT SOUND pres. BODYSLAM VOL.II (mixed by Koolbreak)",
    "u": "https://www.mixcloud.com/gspotsound/g-spot-sound-pres-bodyslam-volii-mixed-by-koolbreak/"
   },
   {
    "t": "Maaad Jamaican Juggling Pt. II (mixed by Koolbreak)",
    "u": "https://www.mixcloud.com/gspotsound/maaad-jamaican-juggling-pt-ii-mixed-by-koolbreak/"
   },
   {
    "t": "Bodyslam",
    "u": "https://www.mixcloud.com/gspotsound/bodyslam/"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Barbara Lago": {
  "from": {
   "de": "Spanien",
   "en": "Spain"
  },
  "img": "https://static.ra.co/images/profiles/square/barbaralago.jpg?dateUpdated=1657115623000",
  "links": {
   "ra": "https://ra.co/dj/barbaralago",
   "sc": "https://soundcloud.com/barbaralago",
   "ig": "https://www.instagram.com/barbara_lago"
  },
  "alias": ["Bárbara Lago"],
  "bio": {
   "de": "Bárbara Lago stammt aus einer kleinen Stadt im Norden Spaniens, ließ sich 2015 in A Coruña nieder und begann dort ihre Laufbahn als DJ.",
   "en": "Bárbara Lago comes from a small town in northern Spain; she settled in A Coruña in 2015 and began her career as a DJ there."
  },
  "src": [
   "https://es.ra.co/dj/barbaralago",
   "https://soundcloud.com/barbaralago"
  ],
  "infoChk": "2026-11-02",
  "sets": [
   {
    "t": "BCCO Mix Series 526: Barbara Lago",
    "u": "https://soundcloud.com/bcco/bcco-mix-series-526-barbara-lago"
   },
   {
    "t": "Blackworks Radio: Barbara Lago",
    "u": "https://soundcloud.com/blackworksclub/blackworks-radio-barbara-lago"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "KRL MX": {
  "from": {
   "de": "Frankreich",
   "en": "France"
  },
  "img": "https://static.ra.co/images/profiles/square/krlmx.jpg?dateUpdated=1790418999747",
  "links": {
   "ra": "https://ra.co/dj/krlmx",
   "sc": "https://soundcloud.com/krl_mx",
   "ig": "https://www.instagram.com/krl_mx.666",
   "bc": "https://kapitalistdanceclub.bandcamp.com"
  },
  "labels": [
   "Kapitalist Dance Club",
   "EXHALE Records",
   "Taapion Records",
   "ARTS",
   "Ismus",
   "RAW"
  ],
  "bio": {
   "de": "KRL MX aus Frankreich bewegt sich in der schnellen elektronischen Szene, spielte u. a. für Boiler Room und Teletech und veröffentlichte auf Exhale. Er betreibt sein eigenes Label Kapitalist Dance Club.",
   "en": "KRL MX from France operates in the fast-paced electronic scene, has played for Boiler Room and Teletech and released on Exhale. He runs his own imprint, Kapitalist Dance Club."
  },
  "src": [
   "https://ra.co/dj/krlmx"
  ],
  "infoChk": "2026-11-02"
 },
 "NYRA": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Serafin": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Dave & Bass": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "Dave & Bass ist ein Wiener Drum-&-Bass-DJ. Er steht regelmäßig im Lineup der Reihe Drum & Bassick im Club Lucia, u. a. beim Summer Opening Special und beim einjährigen Jubiläum 2026, und spielt auch bei der Metal-x-DnB-Party High Voltage Fairies im Flex.",
   "en": "Dave & Bass is a Vienna-based drum & bass DJ. He regularly appears on the lineups of the Drum & Bassick series at Club Lucia, including its Summer Opening Special and its first anniversary in 2026, and also plays the metal-meets-DnB party High Voltage Fairies at Flex."
  },
  "genres": [
   "Drum & Bass"
  ],
  "src": [
   "https://ra.co/events/2442906",
   "https://ra.co/events/2467514",
   "https://www.clublucia.at/event/drum-bassick-x-radiance/",
   "https://flex.at/event/high-voltage-fairies-in-the-pit/"
  ]
 },
 "Cybercutz": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "Cybercutz ist ein Wiener Drum-&-Bass-DJ und tritt auf Resident Advisor als Veranstalter der Reihe Drum & Bassick im Club Lucia auf, die 2026 ihr einjähriges Bestehen feierte. Cybercutz spielt dort regelmäßig selbst, oft gemeinsam mit Dave & Bass.",
   "en": "Cybercutz is a Vienna-based drum & bass DJ and is listed on Resident Advisor as the promoter of the Drum & Bassick series at Club Lucia, which celebrated its first anniversary in 2026. Cybercutz regularly plays there as well, often alongside Dave & Bass."
  },
  "genres": [
   "Drum & Bass"
  ],
  "src": [
   "https://ra.co/promoters/168917",
   "https://ra.co/events/2467514",
   "https://ra.co/events/2442906",
   "https://www.clublucia.at/event/drum-bassick-x-radiance/"
  ]
 },
 "Escapism": {
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/escapismdnb"
  },
  "bio": {
   "de": "Escapism ist ein Drum-&-Bass-DJ aus der Wiener Szene. Auf SoundCloud finden sich Gastmixe u. a. für die FM4-Sendung Dog's Bollocks (Februar 2021) und für die Radioshow Pandora's Playground auf Superfly.fm.",
   "en": "Escapism is a drum & bass DJ from the Vienna scene. His SoundCloud features guest mixes for FM4's Dog's Bollocks show (February 2021) and for the Pandora's Playground radio show on Superfly.fm."
  },
  "genres": [
   "Drum & Bass"
  ],
  "sets": [
   {
    "t": "ESCAPISM @ Pandora's Playground (Superfly.fm) Ep. 96",
    "u": "https://soundcloud.com/escapismdnb/pandorasplayground96"
   },
   {
    "t": "FM4 Dog's Bollocks Jungle/Footwork/Drum & Bass (February 2021)",
    "u": "https://soundcloud.com/escapismdnb/fm4-february-2021"
   },
   {
    "t": "ESCAPISM @ Pandora's Playground (Superfly.fm Radioshow) – Interview & Guestmix",
    "u": "https://soundcloud.com/escapismdnb/pandorasplayground"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://soundcloud.com/escapismdnb",
   "https://soundcloud.com/escapismdnb/fm4-february-2021",
   "https://soundcloud.com/escapismdnb/pandorasplayground96"
  ]
 },
 "Synthesis": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02",
  "src": [
   "https://soundcloud.com/nightsirens/synthesis-at-liquid-drum-and"
  ]
 },
 "Vibrant": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "I-Jin": {
  "links": {
   "sc": "https://soundcloud.com/user-520936179"
  },
  "src": [
   "https://soundcloud.com/user-520936179"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "Gawdesque": {
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "img": "https://brut-wien.at/assets/artists/gawdesque/26_Gawdesque_c_Fadia-Hanuna.jpeg",
  "bio": {
   "de": "Gawdesque ist ein:e in Wien lebende:r DJ und spielt Musik aus West- und Südafrika sowie der afrikanischen Diaspora in Amerika und der Karibik – als Feier des eigenen afrikanischen Erbes und seiner globalen Verzweigungen.",
   "en": "Gawdesque is a Vienna-based DJ playing music from West and South Africa and the African diaspora in the Americas and the Caribbean, celebrating their African heritage and its global branches."
  },
  "src": [
   "https://brut-wien.at/en/artists/gawdesque",
   "https://soundcloud.com/gawdesque",
   "https://soundcloud.com/boosterclub_vienna/booster-club-ola-radio-takeover-part-3"
  ],
  "infoChk": "2026-11-02",
  "links": {
   "sc": "https://soundcloud.com/gawdesque"
  },
  "sets": [
   {
    "t": "BOOSTER CLUB #3 w/ Gawdesque, Carmen Copper (Res.Radio)",
    "u": "https://soundcloud.com/resradio/boosterclub-3"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Amina Malounadou": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Bellavie": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Maissouille": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Radze": {
  "links": {
   "sc": "https://soundcloud.com/radze"
  },
  "src": [
   "https://soundcloud.com/radze",
   "https://soundcloud.com/radze/the-end-liveset-2019-acid-vs-tekno"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "genres": [
   "Acid",
   "Tekno"
  ],
  "sets": [
   {
    "t": "The END Liveset 2019 – Acid vs Tekno",
    "u": "https://soundcloud.com/radze/the-end-liveset-2019-acid-vs-tekno"
   }
  ],
  "setsChecked": "2026-11-02"
 },
 "Toge": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Miss Pixie aka Tekniker": {
  "alias": ["Miss Pixie", "Tekniker"],
  "links": {
   "sc": "https://soundcloud.com/tekniker_at"
  },
  "src": [
   "https://soundcloud.com/tekniker_at"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Genetek": {
  "links": {
   "sc": "https://soundcloud.com/genetektekno"
  },
  "src": [
   "https://soundcloud.com/genetektekno"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "The Rave Bear": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Klaut-G": {
  "links": {
   "sc": "https://soundcloud.com/klaut-g-van-donderland"
  },
  "src": [
   "https://soundcloud.com/klaut-g-van-donderland"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "SYC": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Gingertek": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Auditore": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Brandix": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Se.Vero": {
  "links": {
   "sc": "https://soundcloud.com/dj-se-vero"
  },
  "src": [
   "https://soundcloud.com/dj-se-vero"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "Gosh": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Fullip": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Poison": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Para2P3ctrum": {
  "links": {
   "sc": "https://soundcloud.com/para2p3ctrum"
  },
  "src": [
   "https://soundcloud.com/para2p3ctrum"
  ],
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02",
  "setsChecked": "2026-11-02"
 },
 "Louisa India": {
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Louisa India",
  "img": "https://static.ra.co/images/profiles/square/louisaindia.jpg?dateUpdated=1706299454000",
  "links": {
   "ra": "https://ra.co/dj/louisaindia",
   "sc": "https://soundcloud.com/louisaindia",
   "ig": "https://www.instagram.com/louisaindia_"
  },
  "genres": [
   "Hard Techno",
   "Hard Bounce",
   "Trance",
   "Tek"
  ],
  "bio": {
   "de": "Louisa India ist eine österreichische DJ aus Wien, die Hard Techno, Hard Bounce, Trance und Tek spielt – vor allem im Werk, im Club Exil, im FLUCC, in der Pratersauna und in der Grellen Forelle.",
   "en": "Louisa India is an Austrian DJ from Vienna playing hard techno, hard bounce, trance and tek – mostly at Das Werk, Club Exil, FLUCC, Pratersauna and Grelle Forelle."
  },
  "src": [
   "https://ra.co/dj/louisaindia"
  ],
  "infoChk": "2026-11-02"
 },
 "Kandy": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Mariephi": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "H∆NN∆": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "færo demonic": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "eira haul": {
  "img": "https://static.ra.co/images/profiles/square/eirahaul.jpg?dateUpdated=1772077947010",
  "links": {
   "ra": "https://ra.co/dj/eirahaul",
   "sc": "https://soundcloud.com/eira_haul",
   "ig": "https://www.instagram.com/eira_haul"
  },
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "bio": {
   "de": "eira haul ist ein DJ und Produzent aus Deutschland mit Basis in Berlin und Leipzig, der verschiedene Spielarten von House mit hellen melodischen Elementen verbindet. Er war Resident beim Akasha Festival und veröffentlichte zwei EPs auf Edition Akasha, außerdem auf R.A.N.D. Muzik, Limousine Dream und Anna Walls Dream Theory. 2024 gründete er das Label utopiazones mit.",
   "en": "eira haul is a German DJ and producer based in Berlin and Leipzig, blending various strands of house with bright melodic touches. He was a resident at Akasha Festival and released two EPs on Edition Akasha, plus records on R.A.N.D. Muzik, Limousine Dream and Anna Wall's Dream Theory. In 2024 he co-founded the label utopiazones."
  },
  "genres": [
   "House",
   "Deep House"
  ],
  "labels": [
   "Edition Akasha",
   "utopiazones",
   "R.A.N.D. Muzik",
   "Limousine Dream",
   "Dream Theory"
  ],
  "sets": [
   {
    "t": "eira haul live in Jakarta",
    "u": "https://soundcloud.com/eira_haul/eira-haul-live-in-jakarta"
   },
   {
    "t": "Eira Haul - 28 Septembre 2020 (Rinse France)",
    "u": "https://soundcloud.com/rinse_france/eira-haul-28-septembre-2020"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/eirahaul",
   "https://volumo.com/artist/1047052-eira-haul/about"
  ],
  "infoChk": "2026-11-02"
 },
 "Franky": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "En:vy": {
  "img": "https://criticalmusic.com/wp-content/uploads/2025/12/Photo_envy-400x400.jpg",
  "links": {
   "sc": "https://soundcloud.com/envydnb",
   "ig": "https://www.instagram.com/envy.music_/"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "En:vy ist ein Drum-&-Bass-Produzent, der in Wien aufgewachsen ist und inzwischen in Bristol lebt. Seine ersten Drum-&-Bass-Abende erlebte er 2015 bei Contrast in der Grelle Forelle. Er veröffentlicht regelmäßig auf Critical Music (u. a. Binary EP, Neo EP, Death Sprint EP mit Enei, Love Talk / Boss Fight), früher auch auf Overview Music und Flexout Audio.",
   "en": "En:vy is a drum & bass producer who grew up in Vienna and is now based in Bristol. He first experienced drum & bass at Contrast at Grelle Forelle in 2015. He releases regularly on Critical Music (including the Binary EP, Neo EP, Death Sprint EP with Enei and Love Talk / Boss Fight), and earlier on Overview Music and Flexout Audio."
  },
  "genres": [
   "Drum & Bass"
  ],
  "labels": [
   "Critical Music",
   "Overview Music",
   "Flexout Audio"
  ],
  "sets": [
   {
    "t": "1985 Music (En:vy Guestmix) – Rinse FM Podcast",
    "u": "https://soundcloud.com/envydnb/1985-rinse-fm-podcast-envy"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://criticalmusic.com/artists/envy/",
   "https://ukf.com/read/who-the-hell-is-envy/",
   "https://soundcloud.com/envydnb"
  ],
  "infoChk": "2026-11-02"
 },
 "Julia Goldfarb": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Hamelin": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Inou Ki Endo": {
  "img": "https://static.ra.co/images/profiles/inoukiendo.jpg?dateUpdated=1522944790000",
  "links": {
   "ra": "https://ra.co/dj/inoukiendo",
   "sc": "https://soundcloud.com/inoukiendo"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "Inou Ki Endo ist ein in Österreich verorteter DJ, der seit etwa 2018 regelmäßig in der Wiener Clubszene auftritt, etwa bei Common Contact im EKH sowie bei Struma+Iodine in FLUCC, Venster 99 und Rhiz. Für Struma+Iodine entstanden die Podcast-Mixe SI019 und SI110. Dazu kommen Mixe für den TONGUES-Podcast und eine Res.Radio-Sendung mit dem Wiener Label Ventil Records.",
   "en": "Inou Ki Endo is an Austria-based DJ who has played Vienna's club scene regularly since around 2018, including Common Contact at EKH and Struma+Iodine nights at FLUCC, Venster 99 and Rhiz. The podcast mixes SI019 and SI110 were made for Struma+Iodine. Other mixes include one for the TONGUES podcast and a Res.Radio show with Vienna label Ventil Records."
  },
  "sets": [
   {
    "t": "SI110 - INOU KI ENDO",
    "u": "https://soundcloud.com/strumandiodine/inou-ki-endo-2026"
   },
   {
    "t": "GM190824 - Inou Ki Endo - nightcrawler mix (TONGUES)",
    "u": "https://soundcloud.com/tongues_1150/tongues-inoukiendo-plus3db"
   },
   {
    "t": "Curated #1.3 Ventil Records w/ Inou Ki Endo (Res.Radio)",
    "u": "https://soundcloud.com/resradio/curated-13-ventil-records-w-inou-ki-endo"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://de.ra.co/dj/inoukiendo",
   "https://ra.co/events/1177528",
   "https://ra.co/events/1275466",
   "https://ra.co/events/1213968",
   "https://de.ra.co/events/2054017",
   "https://soundcloud.com/inoukiendo",
   "https://soundcloud.com/strumandiodine/inou-ki-endo-2026",
   "https://soundcloud.com/strumandiodine/si019-inou-ki-endo",
   "https://soundcloud.com/tongues_1150/tongues-inoukiendo-plus3db",
   "https://soundcloud.com/resradio/curated-13-ventil-records-w-inou-ki-endo"
  ],
  "infoChk": "2026-11-02"
 },
 "Gerald VDH": {
  "img": "https://static.ra.co/images/profiles/square/geraldvdh.jpg?dateUpdated=1479208210000",
  "links": {
   "ra": "https://ra.co/dj/geraldvdh",
   "sc": "https://soundcloud.com/geraldvdh",
   "ig": "https://www.instagram.com/geraldvdh",
   "web": "https://www.blakksheep.com/artist/gerald-vdh/"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "Gerald VDH (Gerald van der Hint) ist ein Wiener Vinyl-DJ für Techno und House, der seit 1998 auflegt. Er veranstaltet in Wien die Partyreihen MEAT MARKET, FISH MARKET, F*CKEN PLUS und MUTTER. Als Produzent veröffentlichte er unter anderem auf Meat Recordings und spielte Podcasts etwa für das Groove Magazin.",
   "en": "Gerald VDH (Gerald van der Hint) is a Vienna-based vinyl DJ who has played techno and house since 1998. He runs the Vienna party series MEAT MARKET, FISH MARKET, F*CKEN PLUS and MUTTER. As a producer he has released on Meat Recordings, among others, and has recorded podcasts for outlets such as Groove Magazin."
  },
  "genres": [
   "Techno",
   "House"
  ],
  "labels": [
   "Meat Recordings"
  ],
  "alias": ["Gerald van der Hint"],
  "sets": [
   {
    "t": "GUEST SERIES: Gerald VDH @ FISH MARKET, GRELLE FORELLE - 29/06/24",
    "u": "https://soundcloud.com/conceptualviolence/guest-series-gerald-vdh-fish-market-grelle-forelle-290624"
   },
   {
    "t": "DJ-Set at Grelle Forelle April 19",
    "u": "https://soundcloud.com/geraldvdh/dj-set-at-grelle-forelle-april-19"
   },
   {
    "t": "DJ Set at Grelle Forelle - Fish Market 16.04.16",
    "u": "https://soundcloud.com/geraldvdh/dj-set-at-grelle-forelle-fish-market-160416"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/geraldvdh",
   "https://de.ra.co/dj/geraldvanderhint/biography",
   "https://soundcloud.com/geraldvdh/tracks",
   "https://soundcloud.com/6amgroup/premiere-gerald-vdh-push-meat-recordings",
   "https://soundcloud.com/groove-magazin/groove-resident-podcast-5-gerald-vdh",
   "https://soundcloud.com/conceptualviolence/guest-series-gerald-vdh-fish-market-grelle-forelle-290624"
  ],
  "infoChk": "2026-11-02"
 },
 "Gomez & Nickfried": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Ironica Los Culos": {
  "links": {
   "sc": "https://soundcloud.com/ironica-los-culos"
  },
  "sets": [
   {
    "t": "CommON AIR Festival 2022: IRONICA LOS CULOS 25/05/22",
    "u": "https://soundcloud.com/vlanradio/ironicalosculos-250522"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://soundcloud.com/ironica-los-culos",
   "https://soundcloud.com/vlanradio/ironicalosculos-250522"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "Fairy Mary": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Egorythmia": {
  "links": {
   "sc": "https://soundcloud.com/egorythmia"
  },
  "from": {
   "de": "Nordmazedonien",
   "en": "North Macedonia"
  },
  "bio": {
   "de": "Egorythmia ist das Progressive-Psytrance-Projekt von Boban Lazovski aus Skopje in Nordmazedonien. Sein Debüt war 2008 die EP „Night Sight“ auf Iono Music. Seitdem tritt er weltweit auf Festivals auf, etwa beim Boom Festival und beim Ozora Festival.",
   "en": "Egorythmia is the progressive psytrance project of Boban Lazovski from Skopje, North Macedonia. He debuted in 2008 with the EP 'Night Sight' on Iono Music. Since then he has played festivals worldwide, including Boom Festival and Ozora Festival."
  },
  "genres": [
   "Psytrance",
   "Progressive Psytrance"
  ],
  "labels": [
   "Iono Music"
  ],
  "sets": [
   {
    "t": "Egorythmia @ Ozora Festival 2026",
    "u": "https://soundcloud.com/egorythmia/egorythmia-ozora-festival-2026"
   },
   {
    "t": "Egorythmia Live @ Boom 2012",
    "u": "https://soundcloud.com/egorythmia/egorythmia-live-boom-2012"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://www.beatport.com/artist/egorythmia/67000",
   "https://www.discogs.com/artist/1056854-Boban-Lazovski",
   "https://soundcloud.com/egorythmia",
   "https://soundcloud.com/egorythmia/egorythmia-ozora-festival-2026",
   "https://soundcloud.com/egorythmia/egorythmia-live-boom-2012"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "Eric Prydz": {
  "img": "https://static.ra.co/images/profiles/ericprydz.jpg?dateUpdated=1605876513000",
  "links": {
   "ra": "https://ra.co/dj/ericprydz",
   "web": "https://www.ericprydz.com"
  },
  "from": {
   "de": "Schweden",
   "en": "Sweden"
  },
  "bio": {
   "de": "Eric Prydz ist ein schwedischer DJ und Produzent. Er veröffentlicht melodischen House als Pryda und härteren Techno als Cirez D und betreibt die Labels Pryda, Pryda Friends und Mouseville. Bekannt wurde er 2004 mit „Call On Me“, das sechs Wochen auf Platz eins der UK-Charts stand.",
   "en": "Eric Prydz is a Swedish DJ and producer. He releases melodic house as Pryda and harder techno as Cirez D, and runs the labels Pryda, Pryda Friends and Mouseville. He broke through in 2004 with 'Call On Me', which spent six weeks at number one in the UK charts."
  },
  "genres": [
   "Progressive House",
   "Techno"
  ],
  "labels": [
   "Pryda",
   "Pryda Friends",
   "Mouseville"
  ],
  "alias": ["Pryda", "Cirez D"],
  "src": [
   "https://ra.co/dj/ericprydz",
   "https://ra.co/dj/ericprydz/biography"
  ],
  "infoChk": "2026-11-02"
 },
 "Inaya": {
  "links": {
   "sc": "https://soundcloud.com/inayadnb",
   "ig": "https://www.instagram.com/inayadnb/"
  },
  "genres": [
   "Drum & Bass"
  ],
  "alias": ["인아야"],
  "sets": [
   {
    "t": "INAYA @ CINEMATIƆ – Prater Dome Vienna 13.09.2024",
    "u": "https://soundcloud.com/prater-dome/inaya-cinematic-prater-dome-vienna-13-09-2024"
   },
   {
    "t": "OFFICE SESSION: Drum & Bass by INAYA",
    "u": "https://soundcloud.com/verumgaudium/office-session-drum-bass-by-inaya"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://soundcloud.com/inayadnb",
   "https://soundcloud.com/inayadnb/sets/mixes",
   "https://www.instagram.com/inayadnb/",
   "https://ra.co/events/2143808"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "Heap": {
  "img": "https://static.ra.co/images/profiles/square/heap.jpg?dateUpdated=1518191055000",
  "links": {
   "ra": "https://ra.co/dj/heap",
   "sc": "https://soundcloud.com/heapvienna",
   "ig": "https://www.instagram.com/heapvienna",
   "web": "https://neubau-music.art"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "Heap ist ein österreichischer DJ und Produzent aus Wien und Gründer von Neubau. Er steht für rohe, kantige und abstrakte Elektronik für den Dancefloor abseits von Trends. Releases bzw. Remixe erschienen u. a. auf ESP Institute, Berceuse Heroique, Mechatronica, Super Utu und Betonska.",
   "en": "Heap is an Austrian DJ and producer from Vienna and the founder of Neubau. He stands for raw, rugged and abstract electronics for the dancefloor, away from trends. Releases and remixes have appeared on labels including ESP Institute, Berceuse Heroique, Mechatronica, Super Utu and Betonska."
  },
  "labels": [
   "Neubau",
   "ESP Institute",
   "Berceuse Heroique",
   "Mechatronica",
   "Super Utu",
   "Betonska"
  ],
  "real": "Florian Stöffelbauer",
  "alias": ["FS"],
  "sets": [
   {
    "t": "Heap @ ÆDEN Berlin, Dec 2021",
    "u": "https://soundcloud.com/vertere-berlin/heap-aeden-berlin-dec-2021"
   },
   {
    "t": "Phormix Podcast #158 Heap @ Camp Cosmic 2019",
    "u": "https://soundcloud.com/phormix/phormix-podcast-158-heap-camp-cosmic-2019"
   },
   {
    "t": "Heap - Oddity Influence Mix",
    "u": "https://soundcloud.com/oddityradio/neubau-oddity-influence-mix"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/heap",
   "https://soundcloud.com/vertere-berlin/heap-aeden-berlin-dec-2021",
   "https://soundcloud.com/phormix/phormix-podcast-158-heap-camp-cosmic-2019",
   "https://soundcloud.com/oddityradio/neubau-oddity-influence-mix"
  ],
  "infoChk": "2026-11-02"
 },
 "Jule Feser": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Fede Frostl": {
  "img": "https://static.ra.co/images/profiles/square/fedefrostl.jpg?dateUpdated=1702403094000",
  "links": {
   "ra": "https://ra.co/dj/fedefrostl",
   "sc": "https://soundcloud.com/fede-froestl",
   "ig": "https://www.instagram.com/fedefrostl",
   "web": "https://www.fedefrostl.com"
  },
  "from": {
   "de": "Argentinien",
   "en": "Argentina"
  },
  "bio": {
   "de": "Fede Frostl ist ein Progressive-House-DJ aus Argentinien, der in Österreich lebt. Er hat in Argentinien, Mexiko, Österreich, Deutschland, Spanien, Ungarn und weiteren Ländern gespielt; in Wien u. a. mit der Reihe Pure Progressive. Tracks erschienen u. a. auf South America Sound Avenue, Stellar Fountain und Trippy Code.",
   "en": "Fede Frostl is a progressive house DJ from Argentina based in Austria. He has played in Argentina, Mexico, Austria, Germany, Spain, Hungary and other countries; in Vienna among others with the Pure Progressive series. Tracks have appeared on labels including South America Sound Avenue, Stellar Fountain and Trippy Code."
  },
  "genres": [
   "Progressive House"
  ],
  "labels": [
   "South America Sound Avenue",
   "Stellar Fountain",
   "Trippy Code",
   "Another Life",
   "Balkan Connection South America"
  ],
  "alias": ["Fede Fröstl"],
  "sets": [
   {
    "t": "Pure Progressive - Fede Fröstl live at Kramladen, Vienna 15.2.25",
    "u": "https://soundcloud.com/fede-froestl/3-25a"
   },
   {
    "t": "Pure Progressive - Set 1.25",
    "u": "https://soundcloud.com/fede-froestl/set-125"
   },
   {
    "t": "Live set at Kramladen, Vienna. 14.9.24",
    "u": "https://soundcloud.com/fede-froestl/set-kramladen"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/fedefrostl/biography",
   "https://de.ra.co/dj/fedefrostl",
   "https://soundcloud.com/fede-froestl/3-25a",
   "https://soundcloud.com/fede-froestl/set-125",
   "https://soundcloud.com/fede-froestl/set-kramladen"
  ],
  "infoChk": "2026-11-02"
 },
 "finster": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Flo Førg": {
  "img": "https://static.ra.co/images/profiles/square/floforg.jpg?dateUpdated=1573430400000",
  "links": {
   "ra": "https://ra.co/dj/floforg"
  },
  "from": {
   "de": "München",
   "en": "Munich"
  },
  "bio": {
   "de": "Flo Førg ist DJ, Produzent, Veranstalter und Labelbetreiber aus München, bekannt für eklektische Sets zwischen Downtempo, House, Funk, Disco, Hip-Hop und Jazz. Er begann Ende der 1990er-Jahre in Münchner Clubs aufzulegen und moderierte die Black Label Radioshow von Compost Records mit. Er betreibt das Label Wertstoff Musik.",
   "en": "Flo Førg is a Munich-based DJ, producer, promoter and label owner known for eclectic sets spanning downtempo, house, funk, disco, hip-hop and jazz. He started DJing in Munich clubs in the late 1990s and co-hosted Compost Records' Black Label Radioshow. He runs the label Wertstoff Musik."
  },
  "labels": [
   "Wertstoff Musik",
   "Compost Black Label",
   "Eskapaden Musik",
   "Fine Coincidence"
  ],
  "src": [
   "https://es-mx.ra.co/dj/floforg/biography"
  ],
  "infoChk": "2026-11-02"
 },
 "Fliize": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Entheon": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "HÄNSCH": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "esti.d": {
  "img": "https://static.ra.co/images/profiles/square/esti.d.jpg?dateUpdated=1792594143910",
  "links": {
   "ra": "https://ra.co/dj/esti.d",
   "sc": "https://soundcloud.com/3st1",
   "ig": "https://www.instagram.com/3st1.d"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "esti.d ist ein:e DJ aus der Wiener Clubszene; das RA-Profil führt Österreich als Standort und den Alias PISSTWINK. Die eigene Bio beschreibt den Sound als „interessant und unvorhersehbar“. esti.d spielte u. a. bei HYPERTRASH-Partys in Wien und war bei Res.Radio in der Reihe ÄRGER Hits zu Gast.",
   "en": "esti.d is a DJ from Vienna's club scene; their RA profile lists Austria as location and the alias PISSTWINK. Their own bio describes the sound as \"interesting and unpredictable\". esti.d has played HYPERTRASH parties in Vienna and guested on Res.Radio's ÄRGER Hits series."
  },
  "alias": ["PISSTWINK"],
  "sets": [
   {
    "t": "ÄRGER Hits Volume 3 w/ esti.d (Res.Radio)",
    "u": "https://soundcloud.com/resradio/arger-hits-volume-3-w-estid"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://de.ra.co/dj/esti.d",
   "https://ra.co/dj/esti.d/biography",
   "https://soundcloud.com/3st1",
   "https://soundcloud.com/resradio/arger-hits-volume-3-w-estid"
  ],
  "infoChk": "2026-11-02"
 },
 "Ernst": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "IVUR": {
  "img": "https://f4.bcbits.com/img/0028539340_21.jpg",
  "links": {
   "bc": "https://ivur.bandcamp.com"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "bio": {
   "de": "IVUR ist ein österreichisch-ungarisches Elektronik-Duo aus dem Raum Wien, bestehend aus dem langjährigen Underground-DJ Mr.URNs und dem Multiinstrumentalisten FKV. Der Name steht für „Infraviolet Ultrared“. Auf Bandcamp ordnet sich das Duo zwischen Italo Disco, Minimal Synth, New Wave und Synthpop ein.",
   "en": "IVUR is an Austrian-Hungarian electronic duo from the Vienna area, made up of veteran underground DJ Mr.URNs and multi-instrumentalist FKV. The name stands for \"Infraviolet Ultrared\". On Bandcamp the duo tags its music as Italo disco, minimal synth, new wave and synthpop."
  },
  "genres": [
   "Italo Disco",
   "Minimal Synth",
   "New Wave",
   "Synthpop"
  ],
  "src": [
   "https://ivur.bandcamp.com/track/fire"
  ],
  "infoChk": "2026-11-02"
 },
 "Illtek": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Insano": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Ellen Allien": {
  "img": "https://static.ra.co/images/profiles/square/ellenallien.jpg?dateUpdated=1778835341000",
  "links": {
   "ra": "https://ra.co/dj/ellenallien",
   "sc": "https://soundcloud.com/ellen-allien",
   "ig": "https://www.instagram.com/ellen.allien",
   "bc": "https://ellenallien.bandcamp.com"
  },
  "from": {
   "de": "Berlin",
   "en": "Berlin"
  },
  "bio": {
   "de": "Ellen Allien ist DJ, Musikerin und Labelbetreiberin aus Berlin. Sie leitet die Labels BPitch und UFO Inc., das sie 2018 für härteren, clubtauglichen Techno gründete. Sie hat zehn Alben sowie Singles, EPs und Remixe veröffentlicht, u. a. auf Warp und Mute, zuletzt das Album AurAA. In Berlin veranstaltet sie die Reihe We Are Not Alone, international tourt sie als UFO Rave.",
   "en": "Ellen Allien is a DJ, musician and label head from Berlin. She runs the labels BPitch and UFO Inc., the latter launched in 2018 as an outlet for harder, dancefloor-focused techno. She has released ten albums plus singles, EPs and remixes, including on Warp and Mute, most recently the album AurAA. In Berlin she runs the We Are Not Alone raves and takes the party worldwide as UFO Rave."
  },
  "genres": [
   "Techno"
  ],
  "labels": [
   "BPitch",
   "UFO Inc."
  ],
  "sets": [
   {
    "t": "Ellen Allien – Live DJ Set @ Ritvales, Medellín",
    "u": "https://soundcloud.com/ellen-allien/ellen-allien_ritvales_medellin"
   },
   {
    "t": "Ellen Allien – Boiler Room x T2 Berlin DJ Set (90s Set)",
    "u": "https://soundcloud.com/platform/ellen-allien-3"
   },
   {
    "t": "Ellen Allien – 4h DJ Set @ Melt Festival Sleepless Floor (17.07.2016)",
    "u": "https://soundcloud.com/ellen-allien/ellen-allien-djset-melt-festival-sleepless-floor-120915"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/ellenallien",
   "https://ra.co/dj/ellenallien/biography",
   "https://soundcloud.com/ellen-allien/ellen-allien_ritvales_medellin",
   "https://soundcloud.com/platform/ellen-allien-3",
   "https://soundcloud.com/ellen-allien/ellen-allien-djset-melt-festival-sleepless-floor-120915"
  ],
  "infoChk": "2026-11-02"
 },
 "Sentic Cycle": {
  "img": "https://static.ra.co/images/profiles/square/senticcycle.jpg?dateUpdated=1792956162853",
  "links": {
   "ra": "https://ra.co/dj/senticcycle"
  },
  "real": "Theodor Sperl",
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "labels": [
   "Unchained",
   "Cyberfunk",
   "4NC¥"
  ],
  "bio": {
   "de": "Sentic Cycle ist das Projekt des Wiener Produzenten und Fotografen Theodor Sperl, der Klang und Bild verbindet. Seit 2017 aktiv, hat er Singles, EPs und LPs u. a. auf Unchained, Cyberfunk und 4NC¥ veröffentlicht; seine Musik lief auf FM4, BBC Radio 1, Noisia Radio und im Diffrent Music Podcast. Live und an den Decks war er u. a. in Pratersauna, Flex und Rhiz zu hören.",
   "en": "Sentic Cycle is the project of Vienna-based producer and photographer Theodor Sperl, who combines sound and visual art. Active since 2017, he has released singles, EPs and LPs on labels including Unchained, Cyberfunk and 4NC¥, with airplay on FM4, BBC Radio 1, Noisia Radio and the Diffrent Music Podcast. He has performed at Vienna venues such as Pratersauna, Flex and Rhiz."
  },
  "src": [
   "https://ra.co/dj/senticcycle",
   "https://ra.co/dj/senticcycle/biography"
  ],
  "infoChk": "2026-11-02"
 },
 "Shaolinda": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Sora": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Ssaliva": {
  "img": "https://static.ra.co/images/profiles/ssaliva.jpg?dateUpdated=1493130981000",
  "links": {
   "ra": "https://ra.co/dj/ssaliva",
   "bc": "https://ssaliva.bandcamp.com",
   "sc": "https://soundcloud.com/ssaliva",
   "fb": "https://www.facebook.com/sssaliva/"
  },
  "real": "François Boulanger",
  "alias": ["Cupp Cave", "Kingfisherg"],
  "from": {
   "de": "Lüttich",
   "en": "Liège"
  },
  "genres": [
   "Ambient",
   "Experimental"
  ],
  "labels": [
   "Vlek",
   "Leaving Records",
   "Surf Kill",
   "Ekster",
   "Slagwerk"
  ],
  "bio": {
   "de": "Ssaliva ist das Projekt des belgischen Produzenten François Boulanger aus Lüttich, der zuvor als Kingfisherg und Cupp Cave aktiv war. Seine Musik ist überwiegend beatlos, atmosphärisch und experimentell und gilt live als besonders eindrücklich. Veröffentlicht hat er vor allem auf Vlek, Surf Kill und dem Label Leaving Records aus L.A.",
   "en": "Ssaliva is the project of Belgian producer François Boulanger from Liège, who previously released as Kingfisherg and Cupp Cave. His music is largely beatless, atmospheric and experimental, and best experienced live. He releases mainly on Vlek, Surf Kill and L.A.'s Leaving Records."
  },
  "src": [
   "https://ra.co/dj/ssaliva",
   "https://ssaliva.bandcamp.com/",
   "https://www.discogs.com/artist/2172100-Ssaliva",
   "https://www.meakusma-festival.be/?p=5722"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Sebastian Wagner": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Sabina": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "STAATSEINDE": {
  "img": "https://f4.bcbits.com/img/0047558788_21.jpg",
  "links": {
   "bc": "https://staatseinde.bandcamp.com",
   "sp": "https://open.spotify.com/artist/3J4naeNeXCdeiDicpCsPHO",
   "ig": "https://www.instagram.com/staatseinde",
   "fb": "https://www.facebook.com/Staatseinde",
   "web": "https://staatseinde.com"
  },
  "from": {
   "de": "Utrecht",
   "en": "Utrecht"
  },
  "genres": [
   "EBM",
   "Synth-Punk",
   "New Wave"
  ],
  "labels": [
   "Wharf Records",
   "Enfant Terrible",
   "Ende Der Zukunft Recordings",
   "Onrijn Records",
   "Lo Phi Forms Records"
  ],
  "bio": {
   "de": "STAATSEINDE ist eine Cosmic-EBM- und Synth-Band aus Utrecht, die die Dringlichkeit von EBM mit futuristischem Synth-Punk und 80er-Wave verbindet. Ihren Sound nennt die Band „Neue-Niederländische-Welle“; seit dem Abgang des Schlagzeugers arbeitet sie stärker elektronisch mit Sequencing und Drum-Programming. Releases erschienen u. a. auf Enfant Terrible und Ende Der Zukunft Recordings, die Live-Shows sind energiegeladen und clubartig.",
   "en": "STAATSEINDE is a cosmic EBM and synth band from Utrecht that fuses the urgency of EBM with futuristic synth-punk and 80s wave. The band calls its sound 'Neue-Niederländische-Welle' and has moved to a more electronic approach built on sequencing and drum programming. Releases have appeared on labels such as Enfant Terrible and Ende Der Zukunft Recordings, and their live shows are high-energy and club-like."
  },
  "src": [
   "https://staatseinde.bandcamp.com/",
   "https://www.discogs.com/artist/1855311-Staatseinde"
  ],
  "infoChk": "2026-11-02"
 },
 "Stan Matan": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Saender": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Saratonin": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "SWEGALICIOUS": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Slack Hippy": {
  "links": {
   "sc": "https://soundcloud.com/slackhippy",
   "mc": "https://www.mixcloud.com/slackhippy/"
  },
  "bio": {
   "de": "Slack Hippy wurde in London geboren, wuchs in Cornwall auf und lebt seit 1991 in Wien, wo er seit 1990 auflegt. Er ist Resident-DJ der FM4-Sendung La Boum De Luxe und Mitbegründer und Co-Host (mit D.Kay) der monatlichen Breakbeat-Sendung The Dogs Bollocks auf FM4. Musikalisch spielt er alles zwischen 80 und 180 BPM, mit besonderer Vorliebe für Underground Drum & Bass.",
   "en": "Slack Hippy was born in London, raised in Cornwall and has lived in Vienna since 1991, DJing since 1990. He is resident DJ of FM4's La Boum De Luxe and founder and co-host (with D.Kay) of the monthly breakbeat show The Dogs Bollocks on FM4. He plays anything from 80 to 180 bpm, with a particular love for deep underground drum & bass."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "genres": [
   "Drum & Bass",
   "Breakbeat"
  ],
  "sets": [
   {
    "t": "Slack Hippy FM4 Mix Mar 2020",
    "u": "https://soundcloud.com/slackhippy/slack-hippy-fm4-mix-mar-20201"
   },
   {
    "t": "Luv Shack Rec Pres: GYS Austria #4",
    "u": "https://soundcloud.com/slackhippy/slack-hippy-globalise-yourself-mix"
   }
  ],
  "src": [
   "https://www.mixcloud.com/slackhippy/listens/",
   "https://elevate.at/websites/2009/en/music-arts/artists/artist-details/guests/slack-hippy/index.html%3Ftx_ttnews[backPid]=504&cHash=2314a0277ce4b76221b5ec51440fe7ae.html",
   "https://soundcloud.com/slackhippy"
  ],
  "setsChecked": "2026-11-02",
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Station Rose": {
  "links": {
   "sc": "https://soundcloud.com/station-rose"
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "bio": {
   "de": "Station Rose ist das Multimedia-Duo von Elisa Rose (Bild) und Gary Danner (Sound), 1988 in Wien als audiovisuelles Labor gegründet. Mit der Reihe Gunafa Clubbing verbanden sie früh elektronische Musik, Visuals und Live-Internet. Musikalisch reicht das Spektrum von Techno über Dub und Electro bis Ambient; Releases erschienen u. a. auf International Deejay Gigolo, Mille Plateaux, Sony Music und ihrem eigenen Label Gunafa.",
   "en": "Station Rose is the multimedia duo of Elisa Rose (visuals) and Gary Danner (sound), founded in Vienna in 1988 as an audiovisual laboratory. Their Gunafa Clubbing series was an early fusion of electronic music, visuals and live internet connection. Musically they range from techno to dub, electro and ambient, with releases on International Deejay Gigolo, Mille Plateaux, Sony Music and their own Gunafa label."
  },
  "genres": [
   "Techno",
   "Ambient",
   "Electronic"
  ],
  "labels": [
   "Gunafa",
   "International Deejay Gigolo Records",
   "Mille Plateaux",
   "Spaziotempo",
   "Childhood Intelligence"
  ],
  "src": [
   "https://kunsthallewien.at/en/event/station-rose",
   "https://ra.co/reviews/34721",
   "https://soundcloud.com/station-rose",
   "https://www.discogs.com/artist/6950-Station-Rose"
  ],
  "setsChecked": "2026-11-02",
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Sluzy": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Splinta": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "SIS": {
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Sonya Hibiscus": {
  "links": {
   "sc": "https://soundcloud.com/sonya-hibiscus",
   "ig": "https://www.instagram.com/sonya_hibiscus/"
  },
  "from": {
   "de": "Frankreich",
   "en": "France"
  },
  "bio": {
   "de": "Sonya Hibiscus ist eine DJ aus Frankreich, die mit der Pariser Partyreihe Grand Bal Zouk verbunden ist, einer Nacht für Retro-Zouk, Kompa und karibische Clubkultur. Ihre Sets verbinden tropische und Balearic-Sounds mit Boogie und Breaks.",
   "en": "Sonya Hibiscus is a French DJ associated with the Paris party series Grand Bal Zouk, a night dedicated to retro zouk, kompa and Caribbean club culture. Her sets blend tropical and Balearic sounds with boogie and breaks."
  },
  "src": [
   "https://soundcloud.com/sonya-hibiscus",
   "https://www.instagram.com/sonya_hibiscus/",
   "https://ra.co/events/2080997",
   "https://ra.co/events/2568201"
  ],
  "setsChecked": "2026-11-02",
  "noImg": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Stef Davidse": {
  "img": "https://static.ra.co/images/profiles/square/stefdavidse.jpg?dateUpdated=1689326207000",
  "links": {
   "ra": "https://ra.co/dj/stefdavidse",
   "sc": "https://soundcloud.com/stefdavidse",
   "ig": "https://www.instagram.com/stefdavidse",
   "web": "https://linktr.ee/stefdavidse"
  },
  "bio": {
   "de": "Stef Davidse ist ein DJ und Producer aus Rotterdam. Nach Anfängen im Hip-Hop kam er 2018 zum House; seine Sets und Produktionen setzen auf rollende, oldschool-angehauchte Tracks mit Fokus auf Vocals, Percussion und Bass. Releases erschienen u. a. auf Nervous Records, Innocent Music und Wyld Records, Support kam etwa von Jamie Jones, Archie Hamilton und East End Dubs.",
   "en": "Stef Davidse is a Rotterdam-based DJ and producer. Coming from hip hop, he moved to house in 2018; his sets and productions favour rolling, old-school-leaning tunes focused on vocals, percussion and bass. He has released on labels such as Nervous Records, Innocent Music and Wyld Records, with support from Jamie Jones, Archie Hamilton and East End Dubs."
  },
  "from": {
   "de": "Rotterdam",
   "en": "Rotterdam"
  },
  "genres": [
   "House"
  ],
  "labels": [
   "Nervous Records",
   "Innocent Music",
   "Wyld Records",
   "Happiness Therapy",
   "neXup recz"
  ],
  "sets": [
   {
    "t": "Hottrax LIVE 003: Stef Davidse",
    "u": "https://soundcloud.com/hottraxmusic/hottrax-live-003-stef-davidse"
   }
  ],
  "src": [
   "https://ra.co/dj/stefdavidse",
   "https://ra.co/dj/stefdavidse/biography",
   "https://soundcloud.com/stefdavidse/stef-davidse-burnin-2026-1",
   "https://soundcloud.com/hottraxmusic/hottrax-live-003-stef-davidse"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "SHDW": {
  "img": "https://static.ra.co/images/profiles/square/shdw.jpg?dateUpdated=1772164135830",
  "links": {
   "ra": "https://ra.co/dj/shdw",
   "sc": "https://soundcloud.com/shdw-mutual-rytm",
   "ig": "https://www.instagram.com/i.am.shdw",
   "bc": "https://mutual-rytm.bandcamp.com",
   "fb": "https://www.facebook.com/shdw.official"
  },
  "real": "Marco Bläsi",
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "labels": [
   "Mutual Rytm"
  ],
  "alias": ["SHDW & Obscure Shape"],
  "sets": [
   {
    "t": "SHDW at EXPO XXI Warsaw (2025)",
    "u": "https://soundcloud.com/shdw-mutual-rytm/shdw-at-expo-xxi-warsaw-poland-2025"
   },
   {
    "t": "SHDW – HATE Podcast 377",
    "u": "https://soundcloud.com/hate_music/shdw-hate-podcast-377"
   },
   {
    "t": "Bassiani invites SHDW / Podcast #267",
    "u": "https://soundcloud.com/bassiani/bassiani-invites-shdw-podcast-267"
   }
  ],
  "bio": {
   "de": "SHDW ist ein deutscher Techno-DJ und Produzent, der über ein Jahrzehnt als eine Hälfte des einflussreichen Duos SHDW & Obscure Shape bekannt wurde, mit dem er das Label Mutual Rytm gründete. Seit 2024 verfolgt er ein Soloprojekt, das ganz auf seine eigene Musik, Decks und Mixer reduziert ist.",
   "en": "SHDW is a German techno DJ and producer who built a lasting legacy over a decade as one half of the influential duo SHDW & Obscure Shape, with whom he co-founded the label Mutual Rytm. Since 2024 he has pursued a solo project built around performing with just his music, decks and a mixer."
  },
  "src": [
   "https://ra.co/dj/shdw",
   "https://ra.co/events/2540048"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Svetec": {
  "img": "https://static.ra.co/images/profiles/square/svetec.jpg?dateUpdated=1451997150543",
  "links": {
   "ra": "https://ra.co/dj/svetec",
   "sc": "https://www.soundcloud.com/svetec",
   "bc": "https://svetec.bandcamp.com",
   "ig": "https://www.instagram.com/svetec_official",
   "fb": "https://www.facebook.com/deejaysvetec"
  },
  "bio": {
   "de": "SveTec ist ein ungarischer Hard-Techno-DJ und -Produzent, der seit rund zwei Jahrzehnten aktiv ist und laut RA zu den prägendsten Figuren der Hard-Techno-Szene zählt. 2016 gründete er sein Label Mad Made als Plattform für Newcomer und Hard-Techno-Veteranen. Releases erschienen u.a. auf AudioCode Records und Hardwork Records; gespielt hat er in zahlreichen Ländern Europas und Südamerikas.",
   "en": "SveTec is a Hungarian hard techno DJ and producer active for around two decades, described by RA as one of the most dominant figures of the hard techno scene. In 2016 he launched his label Mad Made as a platform for emerging artists and hard techno veterans. He has released on labels such as AudioCode Records and Hardwork Records and has played across Europe and South America."
  },
  "from": {
   "de": "Ungarn",
   "en": "Hungary"
  },
  "genres": [
   "Hard Techno"
  ],
  "labels": [
   "Mad Made",
   "AudioCode Records",
   "Hardwork Records",
   "Oskyrth"
  ],
  "real": "Adam Szvetek",
  "sets": [
   {
    "t": "TKWT Podcast #044 - SveTec",
    "u": "https://soundcloud.com/tkwt-podcast/tkwt-podcast-044-svetec"
   },
   {
    "t": "AudioCode Podcast #4: SveTec (HU)",
    "u": "https://soundcloud.com/audiocode/audiocode-podcast-4-svetec"
   },
   {
    "t": "Podcast Vol. 8/2016 - Mixed by SveTec",
    "u": "https://soundcloud.com/schubfaktor/podcast-032-mixed-by-svetec"
   }
  ],
  "src": [
   "https://ra.co/dj/svetec",
   "https://pl.ra.co/dj/svetec/biography",
   "https://ra.co/events/2540048"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Annie High": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Boris Brejcha": {
  "img": "https://static.ra.co/images/profiles/square/borisbrejcha.jpg?dateUpdated=1464181990000",
  "links": {
   "ra": "https://ra.co/dj/borisbrejcha",
   "sc": "https://soundcloud.com/boris-brejcha",
   "ig": "https://www.instagram.com/borisbrejcha",
   "web": "https://www.borisbrejcha.de"
  },
  "bio": {
   "de": "Boris Brejcha ist ein deutscher DJ und Produzent, der für seinen Stil den eigenen Begriff „High-Tech Minimal“ prägte. Er tritt mit Joker-Maske auf und spielt Live-Sets aus eigenen Produktionen. Releases erschienen u. a. auf Harthouse Mannheim, Ultra Records und Cloning Sound.",
   "en": "Boris Brejcha is a German DJ and producer who coined his own term, \"high-tech minimal\", for his style. He performs wearing a joker mask and plays live sets built from his own productions. He has released on labels including Harthouse Mannheim, Ultra Records and Cloning Sound."
  },
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "genres": [
   "High-Tech Minimal",
   "Techno",
   "Minimal"
  ],
  "labels": [
   "Ultra Records",
   "Harthouse Mannheim",
   "Cloning Sound",
   "Electronic Petz",
   "Circle Music"
  ],
  "sets": [
   {
    "t": "Boris Brejcha @ Grand Palais for Cercle",
    "u": "https://soundcloud.com/cerclelive/boris-brejcha-grand-palais-for-cercle"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/borisbrejcha"
  ],
  "infoChk": "2026-11-02"
 },
 "Aside": {
  "from": {
   "de": "Wien",
   "en": "Vienna, Austria"
  },
  "src": [
   "https://de.ra.co/events/1787089"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "AE-X": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "B.visible": {
  "img": "https://f4.bcbits.com/img/0044756308_21.jpg",
  "links": {
   "bc": "https://bvisible.bandcamp.com",
   "sc": "https://soundcloud.com/b-vsbl",
   "ig": "https://www.instagram.com/b.visible/",
   "web": "https://b-visible.net/"
  },
  "bio": {
   "de": "B.Visible ist ein Wiener Produzent und DJ, der seit 2004 auflegt und produziert. Seine Musik verbindet scharfe elektronische Elemente mit staubigen akustischen Schichten; seine Debüt-EP „Order and Chaos“ erschien auf dem französischen Label Cosmonostro. Weitere Releases sind u. a. „Life is my Hobby“, „Planes“ und „In Between Places“.",
   "en": "B.Visible is a Viennese producer and DJ who has been producing and DJing since 2004. His music blends sharp electronic elements with dusty acoustic layers; his debut EP \"Order and Chaos\" came out on the French label Cosmonostro. Other releases include \"Life is my Hobby\", \"Planes\" and \"In Between Places\"."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna, Austria"
  },
  "genres": [
   "Electronica",
   "Beats"
  ],
  "labels": [
   "Cosmonostro"
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://bvisible.bandcamp.com/music",
   "https://www.thewildcity.com/features/2498-in-profile-b-visible"
  ],
  "infoChk": "2026-11-02"
 },
 "Boom Shankar": {
  "links": {
   "sc": "https://soundcloud.com/boomshankar-bmssrecords"
  },
  "bio": {
   "de": "Boom Shankar ist ein in Deutschland ansässiger Psytrance-DJ, Labelmanager von BMSS Records und Veranstalter. Er kam Anfang der 1990er mit der Goa-Trance-Szene in Kontakt, kompilierte zahlreiche Compilations auf BMSS Records und gehört zur Crew des S.U.N. Festivals in Ungarn sowie der Partyreihe Alice im Wummerland.",
   "en": "Boom Shankar is a Germany-based psytrance DJ, label manager of BMSS Records and event promoter. He was introduced to the Goa trance scene in the early 1990s, has compiled numerous compilations on BMSS Records and is part of the S.U.N. Festival crew in Hungary and the Alice im Wummerland party series."
  },
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "genres": [
   "Psytrance",
   "Goa Trance"
  ],
  "labels": [
   "BMSS Records"
  ],
  "sets": [
   {
    "t": "Boom Shankar - Psyence Fiction [Psychedelic Dj Set 2016]",
    "u": "https://soundcloud.com/boomshankar-bmssrecords/boom-shankar-psyence-fiction"
   },
   {
    "t": "S.U.N. Festival 2015 - Boom Shankar Dj Set",
    "u": "https://soundcloud.com/boomshankar-bmssrecords/boom-shankar-sun-festival-2015-a-voyage-into-trance"
   },
   {
    "t": "S.U.N. Festival 2014 - Boom Shankar Dj Set",
    "u": "https://soundcloud.com/boomshankar-bmssrecords/sun-festival-2014-boom-shankar-dj-set"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://www.beatport.com/artist/boom-shankar/381159",
   "https://festapp.io/es/artists/boom-shankar"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "AVO2X": {
  "img": "https://static.ra.co/images/profiles/square/avo2x.jpg?dateUpdated=1678964293000",
  "links": {
   "ra": "https://ra.co/dj/avo2x",
   "sc": "https://soundcloud.com/djavoavo",
   "ig": "https://www.instagram.com/avo_avo_"
  },
  "bio": {
   "de": "AVO2X ist DJ und Promoter des österreichischen Techno-Kollektivs Cybertribe und legt seit rund 15 Jahren auf. Als Cybertribe-Resident spielt AVO2X häufig b2b mit ENJA.",
   "en": "AVO2X is a DJ and promoter of the Austrian techno collective Cybertribe and has been DJing for around 15 years. As a Cybertribe resident, AVO2X often plays b2b with ENJA."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "genres": [
   "Techno",
   "Trance"
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/avo2x",
   "https://ra.co/events/2400422"
  ],
  "infoChk": "2026-11-02"
 },
 "ALT": {
  "img": "https://f4.bcbits.com/img/0026447848_10.jpg",
  "links": {
   "bc": "https://abbyleetee.bandcamp.com",
   "sc": "https://soundcloud.com/abbyleetee",
   "mc": "https://www.mixcloud.com/abbyleetee",
   "ig": "https://www.instagram.com/_abbyleetee",
   "web": "https://abbyleetee.com"
  },
  "bio": {
   "de": "ALT ist ein Projektname von Abby Lee Tee, einem österreichischen Musiker und Klangkünstler (Jahrgang 1987), laut Bandcamp in Linz ansässig. Seit 2009 veröffentlicht er Solomaterial zwischen Instrumental-Hip-Hop, Electronica und Experimental mit Faible für Field Recordings, u. a. auf Shash, Czaszka, Dinzu Artefacts und Accidental. Daneben arbeitet er an Installationen, Soundwalks, Theater-Sounddesign und audiovisuellen Projekten.",
   "en": "ALT is a project name of Abby Lee Tee, an Austrian musician and sound artist (born 1987), based in Linz according to Bandcamp. He has released solo material since 2009, spanning instrumental hip hop, electronica and experimental music with a focus on field recordings, on labels including Shash, Czaszka, Dinzu Artefacts and Accidental. He also works on installations, sound walks, theatre sound design and audiovisual projects."
  },
  "from": {
   "de": "Linz",
   "en": "Linz, Austria"
  },
  "genres": [
   "Instrumental Hip Hop",
   "Electronica",
   "Experimental"
  ],
  "labels": [
   "Shash",
   "Czaszka",
   "Dinzu Artefacts",
   "Accidental"
  ],
  "alias": ["Abby Lee Tee"],
  "sets": [
   {
    "t": "MIMS Guest Mix – Abby Lee Tee (Austria)",
    "u": "https://soundcloud.com/musicismysanctuary/mims-guest-mix-abby-lee-tee"
   },
   {
    "t": "Abby Lee Tee presents 'young frogs & golden lakes' [mix]",
    "u": "https://soundcloud.com/acloserlisten/abby-lee-tee-presents-young-frogs-golden-lakes-mix"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://abbyleetee.bandcamp.com/",
   "https://cense.earth/abby-lee-tee"
  ],
  "infoChk": "2026-11-02"
 },
 "ADHS Lene": {
  "links": {
   "sc": "https://soundcloud.com/adhs_lene"
  },
  "sets": [
   {
    "t": "Welia #8 w/ ADHS Lene (09/04/20) – Retreat Radio",
    "u": "https://soundcloud.com/retreatradio/welia-8"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://soundcloud.com/adhs_lene"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "Andre Zimmer": {
  "img": "https://static.ra.co/images/profiles/square/andrezimmer.jpg?dateUpdated=1786040801473",
  "links": {
   "ra": "https://ra.co/dj/andrezimmer",
   "sc": "https://soundcloud.com/andrezimmermusic",
   "bc": "https://andrezimmer.bandcamp.com"
  },
  "bio": {
   "de": "Andre Zimmer ist ein in Kanada geborener, in Berlin lebender Selector, Produzent und Labelbetreiber. Er führt die Labels Big Trouble Records und Lost & Found Re-issues. Laut RA ist er u. a. mit fabric Records, Life and Death, Craigie Knowes und Shall Not Fade verbunden.",
   "en": "Andre Zimmer is a Canada-born, Berlin-based selector, producer and label owner. He runs Big Trouble Records and Lost & Found Re-issues. RA also associates him with fabric Records, Life and Death, Craigie Knowes and Shall Not Fade."
  },
  "from": {
   "de": "Berlin (geboren in Kanada)",
   "en": "Berlin, Germany (born in Canada)"
  },
  "genres": [
   "House"
  ],
  "labels": [
   "Big Trouble Records",
   "Lost & Found Re-issues",
   "fabric Records",
   "Life and Death",
   "Craigie Knowes",
   "Shall Not Fade"
  ],
  "sets": [
   {
    "t": "Andre Zimmer Mixtape for KALTBLUT Magazine",
    "u": "https://soundcloud.com/kaltblutmagazine/andre-zimmer"
   },
   {
    "t": "LYO#262 / Andre Zimmer",
    "u": "https://soundcloud.com/les-yeux-orange/lyo262-andre-zimmer"
   },
   {
    "t": "Big Trouble Records Link Up w/ Andre Zimmer",
    "u": "https://soundcloud.com/bigtroublerecords/big-trouble-records-link-up-w-andre-zimmer"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/andrezimmer"
  ],
  "infoChk": "2026-11-02"
 },
 "Anxhela": {
  "img": "https://static.ra.co/images/profiles/square/anxhela.jpg?dateUpdated=1771443051863",
  "links": {
   "ra": "https://ra.co/dj/anxhela",
   "sc": "https://soundcloud.com/anxheladj",
   "bc": "https://anxhela1.black-hole.bandcamp.com",
   "ig": "https://www.instagram.com/anxhelamusic",
   "web": "https://anxhela.komi.io"
  },
  "bio": {
   "de": "Anxhela ist eine italienisch-albanische Techno-DJ und Produzentin, die mit 17 in die Techno-Szene kam. Ihre energiegeladenen Hard-Techno-Sets sind von Trance und Acid beeinflusst. Ihr erster Track „3nter 0n the 3ternal acid rave“ erschien 2022 auf MRC Records; im selben Jahr folgte eine Kollaboration mit Alignment auf Voxnox Records.",
   "en": "Anxhela is an Italian-Albanian techno DJ and producer who entered the techno scene at 17. Her high-energy hard techno sets draw on trance and acid influences. Her first track '3nter 0n the 3ternal acid rave' came out in 2022 on MRC Records, followed that year by a collaboration with Alignment on Voxnox Records."
  },
  "from": {
   "de": "Italien/Albanien",
   "en": "Italy/Albania"
  },
  "genres": [
   "Hard Techno",
   "Techno",
   "Acid",
   "Trance"
  ],
  "labels": [
   "MRC Records",
   "Voxnox Records"
  ],
  "sets": [
   {
    "t": "Anxhela @ Soenda Indoor Festival 2024",
    "u": "https://soundcloud.com/soendafestival/anxhela-soenda-indoor-festival-2024"
   },
   {
    "t": "Anxhela – Madrid Blackworks NYD",
    "u": "https://soundcloud.com/platform/anxhela-madrid-blackworks-nyd"
   },
   {
    "t": "MRC Agency Podcast 03: ANXHELA",
    "u": "https://soundcloud.com/mrcagency/mrc-agency-podcast-03-anxhela"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/anxhela",
   "https://fr.ra.co/dj/anxhela/biography",
   "https://trifec.one/anxhela/"
  ],
  "infoChk": "2026-11-02"
 },
 "Andrew Ahmed": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Benjay": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Arnab": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Alena Noctis": {
  "img": "https://static.ra.co/images/profiles/square/alenanoctis.jpg?dateUpdated=1774262264833",
  "links": {
   "ra": "https://ra.co/dj/alenanoctis",
   "sc": "https://soundcloud.com/user-837576255",
   "ig": "https://www.instagram.com/alenanoctis"
  },
  "bio": {
   "de": "Alena Noctis ist DJ und Produzentin aus Wien und spielt rohen, treibenden Techno. Sie ist Resident des Wiener Kollektivs Spectral, wo sie Acid, melodischen und treibenden Techno auflegt. Releases erschienen u. a. auf OFF Recordings und Xperiment Records.",
   "en": "Alena Noctis is a DJ and producer from Vienna playing raw, driving techno. She is a resident of the Vienna collective Spectral, where she plays acid, melodic and driving techno. Her releases have appeared on labels including OFF Recordings and Xperiment Records."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna, Austria"
  },
  "genres": [
   "Techno",
   "Acid"
  ],
  "labels": [
   "OFF Recordings",
   "Xperiment Records"
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://es.ra.co/dj/alenanoctis"
  ],
  "infoChk": "2026-11-02"
 },
 "AUGEN ZU": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Abu Naima": {
  "img": "https://static.ra.co/images/profiles/square/abunaima.jpg?dateUpdated=1737971743000",
  "links": {
   "ra": "https://ra.co/dj/abunaima"
  },
  "bio": {
   "de": "Abu Naima ist DJ und Teil von Raqsouna, einer Reihe, die u. a. im Wiener Club Lucia stattfindet. Er spielt nostalgische arabische Musik der 1970er ebenso wie basslastige Clubmusik; seine Wurzeln liegen im Hip-Hop.",
   "en": "Abu Naima is a DJ and part of Raqsouna, a series hosted at venues including Club Lucia in Vienna. He plays nostalgic Arabic music from the 1970s as well as bass-heavy club music, with roots in hip-hop."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "src": [
   "https://ra.co/dj/abunaima"
  ],
  "infoChk": "2026-11-02"
 },
 "Altinbas": {
  "img": "https://static.ra.co/images/profiles/square/altinbas.jpg?dateUpdated=1691777201590",
  "links": {
   "ra": "https://ra.co/dj/altinbas",
   "sc": "https://soundcloud.com/altinbas",
   "bc": "https://observerstation.bandcamp.com",
   "ig": "https://www.instagram.com/altinbas.t"
  },
  "bio": {
   "de": "Ahmet Altinbas ist ein türkisch-belgischer Techno-Artist aus Brüssel. Er ist Resident und Label-Kurator des Brüsseler Clubs Fuse und gilt als eines der prägenden Talente der Brüsseler Elektronikszene. Releases erschienen u. a. auf Token, Float Records, SK_eleven und seinem Label Observer Station.",
   "en": "Ahmet Altinbas is a Turkish-Belgian techno artist from Brussels. He is a resident and in-house label curator at Brussels club Fuse and one of the leading talents in the city's electronic scene. His releases have appeared on Token, Float Records, SK_eleven and his label Observer Station."
  },
  "from": {
   "de": "Brüssel, Belgien",
   "en": "Brussels, Belgium"
  },
  "real": "Ahmet Altinbas",
  "genres": [
   "Techno"
  ],
  "labels": [
   "Token",
   "Non Series",
   "Float Records",
   "SK_eleven",
   "Observer Station"
  ],
  "sets": [
   {
    "t": "Altinbas at SECTION., London 07-03-2026",
    "u": "https://soundcloud.com/altinbas/altinbas-at-section-london-07"
   },
   {
    "t": "Altinbas at Waking Life 2025, Sunday Floresta Opening",
    "u": "https://soundcloud.com/altinbas/altinbas-at-waking-life-2025-sunday-floresta-opening"
   },
   {
    "t": "Altinbas at Church of Endzeit, San Francisco 04-04-2025",
    "u": "https://soundcloud.com/altinbas/altinbas-at-church-of-endzeit-san-francisco-04-04-2025"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/altinbas",
   "https://soundcloud.com/altinbas"
  ],
  "infoChk": "2026-11-02"
 },
 "Biia": {
  "img": "https://static.ra.co/images/profiles/square/biia.jpg?dateUpdated=1574422275000",
  "links": {
   "ra": "https://ra.co/dj/biia",
   "sc": "https://soundcloud.com/biiamusic",
   "bc": "https://biia.bandcamp.com"
  },
  "bio": {
   "de": "BIIA ist eine portugiesische Techno-Künstlerin, die laut einem Interview von 2023 in Barcelona lebt. Ihr Sound ist roh und hart, mit 90er-Beats, trippigen Elementen, schweren Kicks und konzeptuellen Vocals, und kreuzt immer wieder andere Genres.",
   "en": "BIIA is a Portuguese techno artist who, according to a 2023 interview, lives in Barcelona. Her sound is raw and hard, with 90s-style beats, trippy elements, heavy kicks and conceptual vocals, often crossing into other genres."
  },
  "from": {
   "de": "Portugal",
   "en": "Portugal"
  },
  "real": "Beatriz Soares",
  "genres": [
   "Techno",
   "Hard Techno"
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/biia",
   "https://ra.co/dj/biia/biography",
   "https://6amgroup.com/articles/all/navigating-the-electronic-landscape-biia-on-sound-style-and-inspiration"
  ],
  "infoChk": "2026-11-02"
 },
 "ARAS JE'TÄM": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Ave Maria": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Breeze": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Alezzaro": {
  "links": {
   "sc": "https://soundcloud.com/alezzaro"
  },
  "genres": [
   "Psytrance",
   "Progressive Psytrance"
  ],
  "sets": [
   {
    "t": "ALEZZARO 3years progressive selection 132-138bpm",
    "u": "https://soundcloud.com/alezzaro/dj-alezzaro-3years-progressive"
   },
   {
    "t": "Alezzaro @ Spirit Base meets Psyisland 2020 Saturday 13 - 15",
    "u": "https://soundcloud.com/alezzaro/alezzaro-spirit-base-meets-psyisland-2020-saturday-13-15"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://soundcloud.com/alezzaro"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "Armin Schmelz": {
  "links": {
   "sc": "https://soundcloud.com/znicz-olimpijski"
  },
  "bio": {
   "de": "Armin Schmelz ist ein DJ aus Wien und wird bei RA im Umfeld des Wiener Kollektivs Liederbetätigung geführt. Er spielte u. a. bei Dancing For Mental Health im Berliner Sameheads, bei Camp Cosmic in Chemnitz und auf der Fusion (Karla Kutter). Mixe von ihm erschienen u. a. im Krossfingers Podcast, in der Average Records Mix Series und bei Ola Radio.",
   "en": "Armin Schmelz is a Vienna-based DJ listed on RA in connection with the Viennese collective Liederbetätigung. He has played Dancing For Mental Health at Sameheads in Berlin, Camp Cosmic in Chemnitz and Fusion Festival (Karla Kutter). Mixes of his have appeared on the Krossfingers podcast, the Average Records Mix Series and Ola Radio."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna, Austria"
  },
  "sets": [
   {
    "t": "Krossfingers Podcast 149 – Armin Schmelz",
    "u": "https://soundcloud.com/krossfingers/podcast-149-armin-schmelz"
   },
   {
    "t": "Average Records Mix Series 008 – Armin Schmelz live at DFMH @ Sameheads (28.02.2020)",
    "u": "https://soundcloud.com/averagerecordsbln/average-records-mix-series-armin-schmelz-live-at-dfmh-sameheads-february-28th-2020"
   },
   {
    "t": "Local Heroes – Jann invite Armin Schmelz (Ola Radio, 10.07.2019)",
    "u": "https://soundcloud.com/ola_radio/local-heroes-jann-invite-armin-schmelz"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/events/1384072",
   "https://soundcloud.com/znicz-olimpijski/tracks",
   "https://soundcloud.com/liederbetaetigung"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "Annika Stein": {
  "img": "https://static.ra.co/images/profiles/square/annikastein.jpg?dateUpdated=1571917354000",
  "links": {
   "ra": "https://ra.co/dj/annikastein",
   "sc": "https://soundcloud.com/annikastein",
   "bc": "https://annikastein.bandcamp.com",
   "ig": "https://www.instagram.com/annika____stein"
  },
  "bio": {
   "de": "Annika Stein ist eine in Deutschland geborene, in Österreich lebende DJ, die ihren Sound auf RA als Prime-Time-Techno, Industrial und Breaks beschreibt. Sie ist Resident der Reihe Fish Market (früher MEAT MARKET) in der Grelle Forelle. Sets von ihr erschienen u. a. bei hausgemacht (Das Werk).",
   "en": "Annika Stein is a German-born DJ based in Austria who describes her sound on RA as prime-time techno, industrial and breaks. She is a resident of the Fish Market (formerly MEAT MARKET) series at Grelle Forelle. Sets of hers have appeared via hausgemacht (Das Werk)."
  },
  "from": {
   "de": "Deutschland, lebt in Österreich",
   "en": "Germany, based in Austria"
  },
  "genres": [
   "Techno",
   "Industrial",
   "Breaks"
  ],
  "sets": [
   {
    "t": "HAPPY PRIDE MONTH MIX",
    "u": "https://soundcloud.com/annikastein/happypride"
   },
   {
    "t": "Annika Stein @BeatTheVirus (Rette das Werk, 28.03.2020)",
    "u": "https://soundcloud.com/hausgemachtinwien/annika-stein-beatthevirus-rette-das-werk-28032020-wien"
   },
   {
    "t": "Annika Stein @ Yas, Queen, Werk (06.03.2020, Das Werk)",
    "u": "https://soundcloud.com/hausgemachtinwien/annika-stein-yas-queen-werk-6"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://es.ra.co/dj/annikastein"
  ],
  "infoChk": "2026-11-02"
 },
 "Anna Soto": {
  "sets": [
   {
    "t": "Anna Soto – Soundbüglerei (Radio Rudina)",
    "u": "https://soundcloud.com/radiorudina/anna-soto-soundbuglerei-radio-rudina"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://de.ra.co/events/2144473"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Armin Karmin": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "AKOV": {
  "img": "https://f4.bcbits.com/img/0037136745_10.jpg",
  "links": {
   "sc": "https://soundcloud.com/akovmusic",
   "bc": "https://akov.bandcamp.com",
   "web": "https://www.akovmusic.com/"
  },
  "bio": {
   "de": "AKOV ist ein österreichischer Drum-&-Bass-Produzent mit Fokus auf Neurofunk, der eigene Releases sowie Sample-Packs veröffentlicht. Er ist zudem Frontmann der Metal-Band Aenygma und verbindet bei High Voltage Fairies im Flex Metal und Drum & Bass mit Live-Gesang.",
   "en": "AKOV is an Austrian drum & bass producer focused on neurofunk who puts out his own releases and sample packs. He is also the frontman of the metal band Aenygma and combines metal and drum & bass with live vocals at High Voltage Fairies at Flex."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "genres": [
   "Drum & Bass",
   "Neurofunk",
   "Metal"
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://akov.bandcamp.com",
   "https://akovmusic.com/shop/"
  ],
  "infoChk": "2026-11-02"
 },
 "Braincell": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Bornvoyage": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "KlangKuenstler": {
  "img": "https://static.ra.co/images/profiles/square/klangkuenstler.jpg?dateUpdated=1578873600000",
  "links": {
   "sc": "https://soundcloud.com/klangkuenstler",
   "ig": "https://www.instagram.com/klangkuenstler",
   "ra": "https://ra.co/dj/klangkuenstler"
  },
  "from": {
   "de": "Berlin, Deutschland",
   "en": "Berlin, Germany"
  },
  "labels": [
   "EXHALE Records"
  ],
  "genres": [
   "Techno"
  ],
  "bio": {
   "de": "KlangKuenstler ist ein Techno-Produzent aus Berlin, dessen Sound stark von den 90er- und frühen 2000er-Jahren geprägt ist. Er veröffentlicht u. a. auf EXHALE Records und spielt international, etwa im Ääniwalli in Helsinki, im Arzenal in Budapest oder im Bolgia.",
   "en": "KlangKuenstler is a Berlin techno producer whose sound is strongly influenced by the 1990s and early 2000s. He releases on labels such as EXHALE Records and plays internationally, e.g. at Ääniwalli in Helsinki, Arzenal in Budapest and Bolgia."
  },
  "src": [
   "https://ra.co/dj/klangkuenstler",
   "https://ra.co/dj/klangkuenstler/biography"
  ],
  "infoChk": "2026-11-02"
 },
 "Kasia": {
  "img": "https://static.ra.co/images/profiles/square/kasia-ofc.jpg?dateUpdated=1771344732733",
  "links": {
   "sc": "https://soundcloud.com/kasia_music",
   "ig": "https://www.instagram.com/kasia.music_",
   "ra": "https://ra.co/dj/kasia-ofc"
  },
  "real": "Kasia Sobczyk",
  "from": {
   "de": "Polen, lebt in den USA",
   "en": "Poland, based in the USA"
  },
  "labels": [
   "Armada Music",
   "Einmusika"
  ],
  "bio": {
   "de": "KASIA (Kasia Sobczyk) ist eine in Polen geborene, in den USA ansässige DJ und Produzentin. Ihr Sound ist in der Rave-Kultur verwurzelt und baut hypnotische, perkussive Spannungsbögen auf. Releases erschienen u. a. auf Armada Music und Einmusika; sie wird auch unter dem Drumcode-Banner gebucht.",
   "en": "KASIA (Kasia Sobczyk) is a Poland-born DJ and producer based in the USA. Rooted in rave culture, her sound builds hypnotic, percussive energy arcs. She has released on labels such as Armada Music and Einmusika and is also booked under the Drumcode banner."
  },
  "src": [
   "https://nl.ra.co/dj/kasia-ofc",
   "https://o-klub.at/events/pyramide-takeover/"
  ],
  "infoChk": "2026-11-02"
 },
 "Kjaer": {
  "links": {
   "sc": "https://soundcloud.com/kjaer_music"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "labels": [
   "IAMT Red",
   "Fine Artistry"
  ],
  "genres": [
   "Techno"
  ],
  "bio": {
   "de": "KJAER ist ein österreichischer Techno-DJ und -Produzent mit Releases auf IAMT Red und Fine Artistry. Er spielte u. a. bei Stahlstadt Techno in der Linzer Tabakfabrik und bei FM4 La Boum Deluxe in Wien.",
   "en": "KJAER is an Austrian techno DJ and producer with releases on IAMT Red and Fine Artistry. He has played at Stahlstadt Techno in Linz's Tabakfabrik and at FM4 La Boum Deluxe in Vienna, among others."
  },
  "sets": [
   {
    "t": "KJAER – DJ Set @ FM4 La Boum Deluxe (Vienna, 14.04.23)",
    "u": "https://soundcloud.com/kjaer_music/kjaer-fm4-la-boum-deluxe-140423"
   },
   {
    "t": "KJAER – DJ Set @ Stahlstadt Techno, Tabakfabrik Linz (03.12.22)",
    "u": "https://soundcloud.com/kjaer_music/kjaer-stahlstadt-techno-linz-austria"
   }
  ],
  "src": [
   "https://soundcloud.com/kjaer_music",
   "https://www.theloft.at/sub-zero/"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "Ludviq": {
  "img": "https://static.ra.co/images/profiles/square/ludviq.jpg?dateUpdated=1695899307000",
  "links": {
   "sc": "https://soundcloud.com/ludviqmsc",
   "ig": "https://www.instagram.com/ludviq.msc",
   "bc": "https://ludviq.bandcamp.com",
   "ra": "https://ra.co/dj/ludviq"
  },
  "real": "Luis Fernando Hernandez Madrigal",
  "from": {
   "de": "Guadalajara, Mexiko; lebt in Barcelona",
   "en": "Guadalajara, Mexico; based in Barcelona"
  },
  "labels": [
   "Bonkers Music",
   "Belly Dance Services",
   "Playground Records",
   "Play Pal Music",
   "THISBE Recordings",
   "Kaputt.wav",
   "Sonido Moderna"
  ],
  "bio": {
   "de": "Ludviq ist das Projekt von Luis Fernando, geboren in Guadalajara (Mexiko) und heute in Barcelona ansässig. 2018 gründete er in Barcelona Bonkers Music – Reihe und Label ohne Genregrenzen zwischen Techno, Breaks, Psychedelic und EBM. Releases erschienen u. a. auf Bonkers Music, Belly Dance Services, Playground Records und Kaputt.wav.",
   "en": "Ludviq is the project of Luis Fernando, born in Guadalajara (Mexico) and now based in Barcelona. In 2018 he founded Bonkers Music in Barcelona, a party series and label without genre limits spanning techno, breaks, psychedelia and EBM. He has released on Bonkers Music, Belly Dance Services, Playground Records and Kaputt.wav, among others."
  },
  "sets": [
   {
    "t": "aka-tape no 69 by Ludviq",
    "u": "https://soundcloud.com/aka-tapes/aka-tape-no-69-by-ludviq"
   },
   {
    "t": "FF025 Ludviq [Bonkers Records] – Future Frequencies",
    "u": "https://soundcloud.com/futurefrequencies/ff025-ludviq-bonkers-records-guadalajara-mx"
   },
   {
    "t": "Quixotical Mix #005 – Ludviq",
    "u": "https://soundcloud.com/quixoticalrecords/quixotical-mix-005-ludviq"
   }
  ],
  "src": [
   "https://ra.co/dj/ludviq",
   "https://ra.co/events/2567928"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Konman": {
  "bio": {
   "de": "Konman ist ein DJ mit wandelbarem Stil, der sich nach Stimmung und Rahmen richtet. Meist bewegt er sich in tiefen, groovigen Sounds, wechselt aber mühelos ins Trippige.",
   "en": "Konman is a DJ with a versatile style that adapts to the mood and setting. He mostly leans towards deep, groovy sounds but switches easily into trippier territory."
  },
  "src": [
   "https://www.wienmodern.at/2026-bio-konman-de-9346"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Lucia Kagramanyan": {
  "img": "https://dev2.elevate.at/fileadmin/EIS_images/artist/2733/9129-Lucia-Kagramanyan_1280x853.png",
  "links": {
   "sc": "https://soundcloud.com/luciakagramanyan"
  },
  "from": {
   "de": "Lebt in Wien",
   "en": "Based in Vienna"
  },
  "bio": {
   "de": "Lucia Kagramanyan ist eine in Wien lebende Künstlerin, DJ und Klangforscherin, die Archivmaterial mit dem Underground verbindet. In ihrer Sendung „Panorama Yerevan“ auf NTS Radio widmet sie sich ausschließlich armenischer Musik in ihrer ganzen Vielfalt – mit seltenen Aufnahmen aus Radio- und Privatarchiven neben der aktuellen Szene. 2026 spielte sie u. a. beim Elevate Festival in Graz.",
   "en": "Lucia Kagramanyan is a Vienna-based artist, DJ and sonic researcher who connects archival material with the underground. Her NTS Radio show \"Panorama Yerevan\" is devoted solely to Armenian music in all its variety, placing rare recordings from radio and private archives next to the contemporary scene. In 2026 she played Elevate Festival in Graz, among others."
  },
  "src": [
   "https://dev2.elevate.at/en/music/artists/lucia_kagramanyan/",
   "https://mizna.org/mizna-news/interview-lucia-kagramanyan/"
  ],
  "infoChk": "2026-11-02"
 },
 "Kenji Araki": {
  "img": "https://static.ra.co/images/profiles/square/kenjiaraki.jpg?dateUpdated=1702582823467",
  "alias": [
   "enns"
  ],
  "links": {
   "web": "https://kenji-araki.com/",
   "sc": "https://soundcloud.com/kenjiaraki",
   "bc": "https://kenjiaraki.bandcamp.com",
   "ig": "https://www.instagram.com/_kenjiaraki_",
   "ra": "https://ra.co/dj/kenjiaraki"
  },
  "from": {
   "de": "Wien, mit japanischen Wurzeln",
   "en": "Vienna, with roots in Japan"
  },
  "labels": [
   "Affine Records",
   "Ashida Park"
  ],
  "bio": {
   "de": "Kenji Araki ist Musiker, digitaler Künstler und Performer mit Sitz in Wien und Wurzeln in Japan. 2023 erschien auf Affine Records sein Release „Hope Chess“; außerdem veröffentlichte er auf Ashida Park, teils auch unter dem Namen enns. Er trat u. a. beim Donaufestival, bei Ars Electronica und beim Elevate Festival auf.",
   "en": "Kenji Araki is a musician, digital artist and performer based in Vienna with roots in Japan. His release \"Hope Chess\" came out on Affine Records in 2023, and he has also released on Ashida Park, partly under the name enns. He has performed at Donaufestival, Ars Electronica and Elevate Festival, among others."
  },
  "src": [
   "https://ra.co/dj/kenjiaraki",
   "https://affinerecords.com/kenji-araki-hope-chess/",
   "https://www.donaufestival.at/en/artists/kenji-araki/276",
   "https://dev2.elevate.at/en/music/artists/kenji_araki"
  ],
  "infoChk": "2026-11-02"
 },
 "Lila Gold": {
  "img": "https://static.ra.co/images/profiles/square/lilagold-2.jpg?dateUpdated=1764326805980",
  "links": {
   "sc": "https://soundcloud.com/lila_gold",
   "ig": "https://www.instagram.com/lila.goold",
   "ra": "https://ra.co/dj/lilagold-2"
  },
  "from": {
   "de": "Österreich (vor allem Wien)",
   "en": "Austria (mostly Vienna)"
  },
  "genres": [
   "Trance",
   "Hard Trance",
   "Hard Bounce",
   "Hard House"
  ],
  "bio": {
   "de": "LILA GOLD ist eine in Österreich ansässige DJ, die vor allem in Wien auflegt und sich zwischen Trance, Hard Trance, Hard Bounce und Hard House bewegt. Sie spielte u. a. bei HOT&FLIRTY und BOUNCYLICIOUS (GDN) im FLUCC, bei MIXED in der Grelle Forelle und bei Trance Babes im Kramladen.",
   "en": "LILA GOLD is an Austria-based DJ who mostly plays in Vienna, moving between trance, hard trance, hard bounce and hard house. She has played HOT&FLIRTY and BOUNCYLICIOUS (GDN) at FLUCC, MIXED at Grelle Forelle and Trance Babes at Kramladen, among others."
  },
  "sets": [
   {
    "t": "SILVESTER GOLD (Cybertribe Closing)",
    "u": "https://soundcloud.com/lila_gold/silvester-gold-cybertribe-closing"
   },
   {
    "t": "HOT&WET – LILA GOLD & DER Radio",
    "u": "https://soundcloud.com/der-radio/hot-wet-lila-gold-der-radio"
   }
  ],
  "src": [
   "https://ra.co/dj/lilagold-2"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "KΛSKIN": {
  "from": {
   "de": "Villach (Kärnten), auch in Wien aktiv",
   "en": "Villach (Carinthia), also active in Vienna"
  },
  "bio": {
   "de": "KΛSKIN gilt laut der Reihe GLITCH als eines der ersten Indie-Dance-Projekte Österreichs, stammt aus Villach und ist auch in Wien aktiv. Gemeinsam mit Grafenauer bildet KΛSKIN das Tech-House-Projekt TenFifty, Resident bei GLITCH.",
   "en": "According to the GLITCH series, KΛSKIN is one of Austria's first indie dance projects, hailing from Villach and also active in Vienna. Together with Grafenauer, KΛSKIN forms the tech house project TenFifty, a GLITCH resident."
  },
  "src": [
   "https://www.enter-glitch.com/events/glitch-vienna-001"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "LLo": {
  "from": {
   "de": "Italien (Mailand)",
   "en": "Italy (Milan)"
  },
  "bio": {
   "de": "LLo ist ein italienischer House-DJ aus dem Umfeld von Resonance Social Artists in Mailand. In Wien spielt LLo auf Einladung der House-Reihe GLITCH.",
   "en": "LLo is an Italian house DJ from the Resonance Social Artists circle in Milan. In Vienna, LLo plays at the invitation of the house series GLITCH."
  },
  "src": [
   "https://www.theloft.at/glitch-vienna-pres-stef-davidse/"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Lucy Bakanal": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "LCA": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Lim Banda": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Krawallbarbie": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Kmanxak": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "LaLa": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Leanne": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "L3nny": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Lilosh": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Louk": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Krueger": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Karam": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Kayara": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "KWEEN BEE": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "L.O.S.S.": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Karolina": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "DJ Kompact": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "DDS Fam": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Dual Drive": {
  "img": "https://static.ra.co/images/profiles/square/dualdrive.jpg?dateUpdated=1773411077417",
  "links": {
   "ra": "https://ra.co/dj/dualdrive",
   "sc": "https://soundcloud.com/dualdriveofficial",
   "ig": "https://www.instagram.com/dualdriveofficial",
   "web": "https://linktr.ee/dualdriveofficial"
  },
  "bio": {
   "de": "Schwedisches DJ-Duo aus Bara W und Technokid, das treibenden, groovigen Techno spielt. Die beiden legen seit über vier Jahren gemeinsam auf und betrieben zuvor die Stockholmer Eventmarke Demand (Demandsthlm), mit der sie internationale Artists buchten. Sie standen bereits mit Lilly Palmer, Bart Skils und Thomas Schumacher auf der Bühne.",
   "en": "Swedish DJ duo of Bara W and Technokid, playing driving, groovy techno. The two have played together for more than four years and previously ran the Stockholm event brand Demand (Demandsthlm), booking international artists. They have shared stages with Lilly Palmer, Bart Skils and Thomas Schumacher."
  },
  "from": {
   "de": "Schweden",
   "en": "Sweden"
  },
  "genres": [
   "Techno"
  ],
  "sets": [
   {
    "t": "Dual Drive Live @ DEMAND Pres. Lilly Palmer [Slaktkyrkan, Stockholm]",
    "u": "https://soundcloud.com/dualdriveofficial/dual-drive-live-demand-pres-lilly-palmer-slaktkyrkan"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/dualdrive",
   "https://ra.co/dj/dualdrive/biography",
   "https://soundcloud.com/dualdriveofficial/dual-drive-live-demand-pres-lilly-palmer-slaktkyrkan",
   "https://www.instagram.com/dualdriveofficial/"
  ],
  "infoChk": "2026-11-02"
 },
 "DJ Scarf": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Djane Stone": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "DJ Zidi": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Carl H": {
  "img": "https://static.ra.co/images/profiles/carlh.jpg?dateUpdated=1762190738567",
  "links": {
   "ra": "https://ra.co/dj/carlh",
   "sc": "https://soundcloud.com/carl-haop"
  },
  "from": {
   "de": "Cleethorpes, Vereinigtes Königreich",
   "en": "Cleethorpes, United Kingdom"
  },
  "genres": [
   "House",
   "Techno",
   "Electro",
   "Acid"
  ],
  "labels": [
   "Animals On Psychedelics"
  ],
  "bio": {
   "de": "Carl H ist DJ, Labelbetreiber, Veranstalter und Radiomoderator aus Cleethorpes, England, und leitet das Label Animals On Psychedelics. Seine Sets bewegen sich zwischen House, Techno, Electro, Rave und Acid. Er war Resident bei Northern Purpose, Collective Minds (Birmingham) und Sub:System (London) und spielte u. a. im Club der Visionaere und in der Grelle Forelle. Auf dem Leedser Sender KMAH moderiert er eine monatliche Radioshow unter dem Namen seines Labels.",
   "en": "Carl H is a DJ, label owner, promoter and radio host from Cleethorpes, England, who runs the label Animals On Psychedelics. His sets range across house, techno, electro, rave and acid. He has held residencies at Northern Purpose, Collective Minds (Birmingham) and Sub:System (London) and has played Club der Visionaere and Grelle Forelle, among others. He hosts a monthly radio show named after his label on Leeds station KMAH."
  },
  "sets": [
   {
    "t": "Carl H @ Kraft und Licht invites Animals on Psychedelics [ADE '22]",
    "u": "https://soundcloud.com/kraftundlicht/carlh-kraft-und-licht-invites-animals-on-psychedelics"
   },
   {
    "t": "Ute Mix Series #41 – Carl H",
    "u": "https://soundcloud.com/ute-rec/41-carlh"
   },
   {
    "t": "Animals On Psychedelics KMAH #1",
    "u": "https://soundcloud.com/carl-haop/animals-on-psychedelics-kmah1"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/carlh",
   "https://ra.co/dj/carlh/biography",
   "https://soundcloud.com/carl-haop/tracks"
  ],
  "infoChk": "2026-11-02"
 },
 "DJ Countessa": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Chicano": {
  "img": "https://static.ra.co/images/profiles/square/chicano.jpg?dateUpdated=1482404218000",
  "links": {
   "ra": "https://ra.co/dj/chicano",
   "sc": "https://soundcloud.com/chicano-6",
   "ig": "https://www.instagram.com/chicano_music",
   "bc": "https://chicano.bandcamp.com"
  },
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "real": "Manuel Clauss",
  "genres": [
   "Deep House",
   "Tech House",
   "Techno"
  ],
  "labels": [
   "Chicano - Music",
   "Matrix Music Records",
   "Disco Balls Records"
  ],
  "bio": {
   "de": "Chicano ist ein deutscher DJ und Produzent zwischen Deep House, Tech House und Techno, aufgewachsen in Nordrhein-Westfalen nahe Bonn/Köln. Er veröffentlichte auf seinem eigenen Imprint Chicano - Music sowie auf Matrix Music Records und Disco Balls Records. Gespielt hat er u. a. in der Elektroküche (Köln) und beim Beats For Love Festival in Ostrava.",
   "en": "Chicano is a German DJ and producer working between deep house, tech house and techno, raised in North Rhine-Westphalia near Bonn/Cologne. He has released on his own imprint Chicano - Music as well as on Matrix Music Records and Disco Balls Records. He has played at Elektroküche (Cologne) and Beats For Love Festival in Ostrava, among others."
  },
  "src": [
   "https://ra.co/dj/chicano",
   "https://ra.co/dj/chicano/biography",
   "https://ra.co/events/2550352"
  ],
  "infoChk": "2026-11-02"
 },
 "David Phoenix": {
  "img": "https://static.ra.co/images/profiles/square/davidphoenix.jpg?dateUpdated=1791571998880",
  "links": {
   "ra": "https://ra.co/dj/davidphoenix",
   "sc": "https://soundcloud.com/davidphoenixdj",
   "ig": "https://www.instagram.com/davidphoenixdj",
   "bc": "https://davidphoenix.bandcamp.com"
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "genres": [
   "Techno",
   "Minimal Techno",
   "Psytech"
  ],
  "labels": [
   "Iboga Records",
   "Soupherb Records",
   "Set About",
   "Subios Records",
   "Techgnosis Records",
   "Vision Serpent",
   "Shadow Wulf"
  ],
  "bio": {
   "de": "David Phoenix ist ein in Ungarn geborener, in Österreich ansässiger DJ und Produzent, der sich auf der abstrakten Seite von Techno und Minimal bewegt. Seine Musik ist düster und treibend. Releases erschienen u. a. auf Iboga Records, Techgnosis Records, Shadow Wulf und Vision Serpent, für das er auch die Reihe „Vision Serpent Podcast“ mixt.",
   "en": "David Phoenix is a Hungarian-born, Austria-based DJ and producer working on the abstract side of techno and minimal. His music is dark and driving. He has released on labels including Iboga Records, Techgnosis Records, Shadow Wulf and Vision Serpent, for which he also mixes the Vision Serpent Podcast series."
  },
  "sets": [
   {
    "t": "Vision Serpent Podcast 006",
    "u": "https://soundcloud.com/davidphoenixdj/vision-serpent-podcast-006"
   },
   {
    "t": "Vision Serpent Podcast 004",
    "u": "https://soundcloud.com/davidphoenixdj/vision-serpent-podcast-004"
   },
   {
    "t": "Vision Serpent Podcast 001",
    "u": "https://soundcloud.com/davidphoenixdj/vision-serpent-podcast-001"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://de.ra.co/dj/davidphoenix",
   "https://davidphoenix.bandcamp.com/music",
   "https://soundcloud.com/davidphoenixdj"
  ],
  "infoChk": "2026-11-02"
 },
 "CREEDS": {
  "links": {
   "sc": "https://soundcloud.com/creeds",
   "sp": "https://open.spotify.com/artist/2gW0M5fn2r7Lo4Hn1r8HZ5",
   "ig": "https://www.instagram.com/creeds_official/"
  },
  "from": {
   "de": "Frankreich",
   "en": "France"
  },
  "genres": [
   "Hard Techno",
   "Frenchcore"
  ],
  "bio": {
   "de": "CREEDS ist ein französischer Produzent und DJ mit Wurzeln im Frenchcore, der heute im Bereich Hard Techno und Hardstyle arbeitet. Sein Track „Push Up“ (2022) ging viral und wurde in mehreren europäischen Ländern mit Gold und Platin ausgezeichnet. Weitere Releases sind u. a. „Closer“ (2024) und „Dangerous“ (2026).",
   "en": "CREEDS is a French producer and DJ with roots in frenchcore who now works in hard techno and hardstyle. His track \"Push Up\" (2022) went viral and earned gold and platinum certifications in several European countries. Further releases include \"Closer\" (2024) and \"Dangerous\" (2026)."
  },
  "sets": [
   {
    "t": "RaveCast118 - Creeds",
    "u": "https://soundcloud.com/rave_alert/ravecast118-creeds"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://www.technoairlines.com/artist/creeds",
   "https://fourfourmag.com/in-conversation-with-creeds-i-was-ready-to-give-up-then-push-up-happened/",
   "https://soundcloud.com/creeds/push-up"
  ],
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "DJEENI": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Crnobrnja": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Cosmic Gate": {
  "img": "https://i.scdn.co/image/ab6761610000e5eb715f2b0a098b31ba36e14876",
  "links": {
   "ra": "https://ra.co/dj/cosmicgate",
   "sc": "https://soundcloud.com/cosmicgateofficial",
   "sp": "https://open.spotify.com/artist/6ySxYu68zTsO5ghsThpGtS"
  },
  "bio": {
   "de": "Cosmic Gate ist ein deutsches Trance-Projekt, das Nic Chagall und Bossi (Stefan Bossems) Ende 1998 gründeten. Bekannt wurde es mit Tracks wie „Fire Wire“, „Exploration of Space“ und „Not Enough Time“ sowie mit der Compilation-Reihe „Back2Back“ auf Tiëstos Label Black Hole Recordings. Im Februar 2026 stieg Bossems nach 27 Jahren aus, seither führt Nic Chagall Cosmic Gate allein weiter.",
   "en": "Cosmic Gate is a German trance project that Nic Chagall and Bossi (Stefan Bossems) started in late 1998. It became known for tracks such as \"Fire Wire\", \"Exploration of Space\" and \"Not Enough Time\", and for the Back2Back compilation series on Tiësto's label Black Hole Recordings. In February 2026 Bossems left after 27 years, and Nic Chagall has continued Cosmic Gate as a solo project since then."
  },
  "from": {
   "de": "Deutschland",
   "en": "Germany"
  },
  "genres": [
   "Trance"
  ],
  "labels": [
   "Black Hole Recordings"
  ],
  "sets": [
   {
    "t": "Cosmic Gate live at The Concourse Project, Austin, TX (31.08.24)",
    "u": "https://soundcloud.com/cosmicgateofficial/cosmic-gate-live-at-the-concourse-project-austin-tx-310824"
   },
   {
    "t": "Cosmic Gate – Live DJ Set, 1001Tracklists x DJ Lovers Club pres. Water Ways Miami 2024",
    "u": "https://soundcloud.com/1001tracklists/cosmic-gate-live-water-ways-miami-2024"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/cosmicgate",
   "https://ra.co/dj/cosmicgate/biography",
   "https://ra.co/news/84631",
   "https://open.spotify.com/artist/6ySxYu68zTsO5ghsThpGtS",
   "https://soundcloud.com/cosmicgateofficial/cosmic-gate-live-at-the-concourse-project-austin-tx-310824"
  ],
  "infoChk": "2026-11-02"
 },
 "Christella": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "DJ Keshi": {
  "img": "https://static.ra.co/images/profiles/square/djkeshi.jpg?dateUpdated=1793569898640",
  "links": {
   "ra": "https://ra.co/dj/djkeshi",
   "sc": "https://soundcloud.com/dj-keshii",
   "ig": "https://www.instagram.com/dj_keshi"
  },
  "bio": {
   "de": "DJ Keshi ist eine Wiener DJ mit iranischen und kurdischen Wurzeln. Sie spielt vor allem basslastige, perkussive Sets zwischen Breaks und Broken Beat, beeinflusst von Global Bass und diasporischen Sounds, kombiniert mit verspielten Vocals und Edits. Sie ist Mitgründerin des Wiener Breakbeat- und Bass-Kollektivs breakberry und Teil von Res Radio.",
   "en": "DJ Keshi is a Vienna-based DJ with Iranian and Kurdish roots. She mostly plays bass-heavy, percussion-driven sets built on breaks and broken beat, drawing on global bass and diasporic sounds and mixing in playful vocals and edits. She co-founded the Viennese breakbeat and bass collective breakberry and is part of Res Radio."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "genres": [
   "Breakbeat",
   "Bass"
  ],
  "sets": [
   {
    "t": "DJ Keshi b2b 2NDLISTEN b2b o0m @ Lichtung Festival 2026",
    "u": "https://soundcloud.com/dj-keshii/dj-keshi-b2b-2ndlisten-b2b-o0m"
   },
   {
    "t": "Radio Roll #2 w/ DJ Keshi (Res.Radio)",
    "u": "https://soundcloud.com/resradio/radio-roll-2"
   },
   {
    "t": "The res Breakfast Show w/ DJ Keshi & o0m (Res.Radio)",
    "u": "https://soundcloud.com/resradio/sunday-klubb-5"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/djkeshi",
   "https://fr.ra.co/dj/djkeshi/biography",
   "https://soundcloud.com/dj-keshii"
  ],
  "infoChk": "2026-11-02"
 },
 "Disorder": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "DJ Karotte": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Crazy Sonic": {
  "img": "https://static.ra.co/images/profiles/crazysonic.jpg?dateUpdated=1305481560000",
  "links": {
   "ra": "https://ra.co/dj/crazysonic",
   "sc": "https://soundcloud.com/crazysonic"
  },
  "real": "Rudolf Wrany",
  "bio": {
   "de": "Crazy Sonic organisiert seit den frühen 1990ern Partys in Wiener Clubs und veranstaltete in dieser Zeit auch Events mit Kruder & Dorfmeister. Ab 1998 buchte er für das Flex, wo er 2001 die wöchentliche Dienstagsreihe „CRAZY“ startete, die rund neun Jahre lief. Seit 2006 produziert er; Releases erschienen u. a. auf VIM Records, Estrela, International DeeJay Gigolo Records und seinem Label FLEX Schallplatten.",
   "en": "Crazy Sonic has been organising parties in Vienna's clubs since the early 1990s, including events with Kruder & Dorfmeister. He began booking for Flex in 1998, and in 2001 he launched the weekly Tuesday night \"CRAZY\" there, which ran for about nine years. He has been producing since 2006, with releases on labels including VIM Records, Estrela, International DeeJay Gigolo Records and his own FLEX Schallplatten."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "labels": [
   "International DeeJay Gigolo Records",
   "VIM Records",
   "Estrela",
   "Clean And Dirty Recordings",
   "Souled Records",
   "Stripped Down Records",
   "FLEX Schallplatten"
  ],
  "src": [
   "https://ra.co/dj/crazysonic",
   "https://ra.co/dj/crazysonic/biography"
  ],
  "infoChk": "2026-11-02"
 },
 "Caban": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "DBBD": {
  "img": "https://static.ra.co/images/profiles/square/dbbd.jpg?dateUpdated=1777499633167",
  "links": {
   "ra": "https://ra.co/dj/dbbd",
   "sc": "https://soundcloud.com/playdbbd",
   "bc": "https://dbbd.bandcamp.com"
  },
  "bio": {
   "de": "DBBD ist ein Produzent und DJ aus Berlin und gilt als Pionier des „Slut Bass“: dreckige Basslines, eingängige Synth-Melodien und oft freche weibliche Vocals. Er arbeitet häufig mit Miss Bashful zusammen, unter anderem an „Hard Being Hot“ und „DJ on Your Face“ (mit MCR-T).",
   "en": "DBBD is a Berlin producer and DJ regarded as a pioneer of \"slut bass\": dirty basslines, catchy synth melodies and often cheeky female vocals. He collaborates frequently with Miss Bashful, including on \"Hard Being Hot\" and \"DJ on Your Face\" (with MCR-T)."
  },
  "from": {
   "de": "Berlin, Deutschland",
   "en": "Berlin, Germany"
  },
  "sets": [
   {
    "t": "TUNNEL Mix 005 – Miss Bashful x DBBD live @ TUNNEL (14.01.2023)",
    "u": "https://soundcloud.com/tunnel_radio/miss-bashful-x-dbbd-live-tunnel-jan-14-2023"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://ra.co/dj/dbbd",
   "https://dbbd.bandcamp.com/community",
   "https://www.technoairlines.com/event/cybertribe-11-years-with-dbbd-berlin-vienna-prst-2026-12-07",
   "https://kzsc.org/blog/2025/03/10/berlins-it-girl-and-dbbd-at-1015-folsom/",
   "https://soundcloud.com/playdbbd/dbbd-x-miss-bashful-hard-being-hot",
   "https://soundcloud.com/livefromearth/mcr-t-miss-bashful-dbbd-dj-on"
  ],
  "infoChk": "2026-11-02"
 },
 "Chiara Allnutt": {
  "img": "https://static.ra.co/images/profiles/square/chiaraallnutt.jpg?dateUpdated=1765647857577",
  "links": {
   "ra": "https://ra.co/dj/chiaraallnutt",
   "sc": "https://soundcloud.com/chiara_allnutt",
   "ig": "https://www.instagram.com/chiara.allnutt"
  },
  "bio": {
   "de": "Chiara Allnutt ist in Deutschland geboren, von Berlin geprägt und laut RA in Österreich ansässig. Sie spielt groovigen Uptempo-Techno mit Vocals und hüpfenden Grooves und mischt dabei verschiedene Genres. Sie legt regelmäßig in Wien (u. a. The Loft) und Berlin auf.",
   "en": "Chiara Allnutt was born in Germany, shaped by Berlin and, according to RA, is based in Austria. She plays groovy uptempo techno with vocals and bouncy grooves, mixing several genres. She plays regularly in Vienna (including The Loft) and Berlin."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "genres": [
   "Techno"
  ],
  "alias": [
   "Chiara Allnut"
  ],
  "sets": [
   {
    "t": "NonStop No. 187 – Chiara Allnutt at OXI (09.11.2024)",
    "u": "https://soundcloud.com/nonchalance_music/nonstop-no-187-chiara-allnutt"
   },
   {
    "t": "Chiara Allnutt b2b MC1R – Synthetic Love (Radio Rudina)",
    "u": "https://soundcloud.com/radiorudina/chiara-allnut-b2b-mc1r-synthetic-love-radio-rudina"
   }
  ],
  "setsChecked": "2026-11-02",
  "src": [
   "https://de.ra.co/dj/chiaraallnutt",
   "https://ra.co/dj/chiaraallnut",
   "https://soundcloud.com/chiara_allnutt"
  ],
  "infoChk": "2026-11-02"
 },
 "Patrik Pagan": {
  "img": "https://static.ra.co/images/profiles/square/patrikpagan.jpg?dateUpdated=1718637639000",
  "bio": {
   "de": "Patrik Pagan ist ein in Wien ansässiger Techno-DJ mit einer Vorliebe für dunkle, treibende Sounds. Er ist Resident der Wiener Reihe Spectral und spielte u. a. im FLUCC, im Kramladen, in der Pratersauna und im Werk.",
   "en": "Patrik Pagan is a Vienna-based techno DJ with a passion for dark and driving sounds. He is a resident of the Viennese series Spectral and has played venues such as FLUCC, Kramladen, Pratersauna and Das Werk."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "links": {
   "ra": "https://ra.co/dj/patrikpagan",
   "sc": "https://soundcloud.com/patrikpagan",
   "ig": "https://www.instagram.com/patrik_pagan"
  },
  "genres": [
   "Techno"
  ],
  "sets": [
   {
    "t": "Loft Closing – 23.02.2024",
    "u": "https://soundcloud.com/patrikpagan/loft-closing-23022024"
   },
   {
    "t": "Otto Wagina b2b Patrik Pagan @ Flucc",
    "u": "https://soundcloud.com/patrikpagan/ab3b3ea7-89f1-41ed-8aff-1b0ff1c4fa69"
   }
  ],
  "src": [
   "https://pl.ra.co/dj/patrikpagan",
   "https://pl.ra.co/events/2059567",
   "https://soundcloud.com/patrikpagan"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Relinquo": {
  "img": "https://static.ra.co/images/profiles/square/relinquo.jpg?dateUpdated=1782726657707",
  "bio": {
   "de": "Relinquo ist ein Wiener Producer und DJ, der seinen Stil „Cinematic Peak Time Techno“ nennt: filmisches Sounddesign trifft auf treibende Techno-Drums und Basslines. Seine Wurzeln liegen auch in Drum & Bass, Punk und Post-Hardcore. Er veröffentlichte u. a. auf Pentaphonia, Animarum, OFF Recordings, Reload und IAMT und war Resident in mehreren Wiener Clubs.",
   "en": "Relinquo is a Viennese producer and DJ who calls his style 'Cinematic Peak Time Techno', combining cinematic sound design with driving techno drums and basslines. His background also includes drum & bass, punk and post-hardcore. He has released on labels such as Pentaphonia, Animarum, OFF Recordings, Reload and IAMT and has held residencies at several Vienna clubs."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "links": {
   "ra": "https://ra.co/dj/relinquo",
   "sc": "https://soundcloud.com/relinquo",
   "ig": "https://www.instagram.com/relinquobeats"
  },
  "labels": [
   "Pentaphonia",
   "Animarum Recordings",
   "OFF Recordings",
   "Reload Records",
   "IAMT",
   "Renesanz",
   "Xperiment Records",
   "Loading Systems Records",
   "Hyggelit Records"
  ],
  "genres": [
   "Techno",
   "Peak Time Techno"
  ],
  "sets": [
   {
    "t": "Vespera 2 (Peak Time Techno Mix)",
    "u": "https://soundcloud.com/relinquo/relinquo-end-of-summer-2023"
   },
   {
    "t": "Cinematic Techno Mix I",
    "u": "https://soundcloud.com/relinquo/cinematic-techno-mix"
   }
  ],
  "src": [
   "https://ra.co/dj/relinquo",
   "https://ra.co/dj/relinquo/biography",
   "https://volumo.com/artist/548209-relinquo"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Paul Panther": {
  "img": "https://static.ra.co/images/profiles/square/paulpanther.jpg?dateUpdated=1662479768000",
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Paul Angerer",
  "links": {
   "ra": "https://ra.co/dj/paulpanther",
   "ig": "https://www.instagram.com/paulangerer/"
  },
  "src": [
   "https://de.ra.co/dj/paulpanther"
  ],
  "infoChk": "2026-11-02"
 },
 "Philipp Blecha": {
  "img": "https://static.ra.co/images/profiles/philippblecha.jpg?dateUpdated=1457006057603",
  "bio": {
   "de": "Philipp Blecha alias Dadajack ist ein österreichischer DJ und Producer zwischen Techno, Acid, Minimal und House, geprägt von Detroit Techno sowie Chicago und Acid House der 1990er. Er legt seit 1998 auf, produziert seit 2007 (u. a. als Herbst & Blecha) und ist seit 2013 Teil des Labels imola-music. 2002 gründete er die Reihe Movimiento mit, die heute Club Pompadour heißt; 2014–2016 war er Resident in der Pratersauna.",
   "en": "Philipp Blecha aka Dadajack is an Austrian DJ and producer working across techno, acid, minimal and house, rooted in 1990s Detroit techno and Chicago and acid house. He has DJed since 1998, produced since 2007 (including as Herbst & Blecha) and joined the imola-music roster in 2013. In 2002 he co-founded the Movimiento series, now known as Club Pompadour, and was resident at Pratersauna from 2014 to 2016."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "links": {
   "ra": "https://ra.co/dj/philippblecha",
   "sc": "https://soundcloud.com/philblecha_dadajack",
   "ig": "https://www.instagram.com/philblecha_dadajack",
   "web": "https://philippblecha.com"
  },
  "labels": [
   "imola-music",
   "NB Records",
   "Youngsociety"
  ],
  "genres": [
   "Techno",
   "Acid",
   "Minimal",
   "House"
  ],
  "sets": [
   {
    "t": "Philipp Blecha @ Club Pompadour / Sass Music Club 12.01.2024",
    "u": "https://soundcloud.com/philblecha_dadajack/philipp-blecha-club-pompadour-sass-music-club-12012024"
   },
   {
    "t": "Flashback MayDay Rave / Grelle Forelle / 30.04.19 – Oldschool-Set",
    "u": "https://soundcloud.com/philblecha_dadajack/flashback-300419-grelleforelle"
   },
   {
    "t": "Philipp Blecha @ Prater Unser Festival 2014 Opening Day 2",
    "u": "https://soundcloud.com/philblecha_dadajack/philipp_blecha"
   }
  ],
  "alias": ["Dadajack"],
  "src": [
   "https://ra.co/dj/philippblecha",
   "https://ra.co/dj/philippblecha/biography"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Randalia": {
  "img": "https://static.ra.co/images/profiles/square/randalia.jpg?dateUpdated=1723474432000",
  "bio": {
   "de": "Randalia ist eine DJ aus Wien und in der Wiener Musikszene aktiv. Ihre Sets verbinden Progressive House, Psytrance, Breakbeat, Electro und Trance mit Einflüssen aus den späten 90ern und frühen 2000ern und reichen von schweren Basslines bis zu verträumten Melodien.",
   "en": "Randalia is a DJ from Vienna who is active in the Viennese music scene. Her sets blend progressive house, psytrance, breakbeat, electro and trance with influences from the late '90s and early 2000s, ranging from heavy basslines to dreamy melodies."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "links": {
   "ra": "https://ra.co/dj/randalia"
  },
  "genres": [
   "Progressive House",
   "Psytrance",
   "Breakbeat",
   "Electro",
   "Trance"
  ],
  "src": [
   "https://ra.co/dj/randalia/biography",
   "https://ra.co/events/2199660",
   "https://ra.co/events/2500898"
  ],
  "infoChk": "2026-11-02"
 },
 "Qamareen": {
  "img": "https://static.ra.co/images/profiles/square/qamareen.jpg?dateUpdated=1718977105000",
  "bio": {
   "de": "Qamareen (Luna Al-Mousli) ist eine Wiener DJ und Gründerin der Partyreihe Raqsouna, die Partykultur neu denken und neue Räume zum Tanzen schaffen will. In ihren Sets spielt sie SWANA-Sounds und verbindet Pop, Indie und elektronische Beats, wobei Lyrics neben der Melodie eine zentrale Rolle spielen.",
   "en": "Qamareen (Luna Al-Mousli) is a Vienna-based DJ and founder of the Raqsouna party series, which aims to rethink party culture and create new spaces for dancing. Her sets feature SWANA sounds blending pop, indie and electronic beats, with lyrics playing as central a role as melody."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "real": "Luna Al-Mousli",
  "links": {
   "ra": "https://ra.co/dj/qamareen",
   "sc": "https://soundcloud.com/luna-al-mousli"
  },
  "genres": [
   "SWANA",
   "Pop",
   "Indie",
   "Electronic"
  ],
  "src": [
   "https://ra.co/dj/qamareen",
   "https://ra.co/dj/qamareen/biography",
   "https://www.mdw.ac.at/musicandminorities/symposium2026/programme/closing-party-at-brunnenpassage/"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Nick Hanzo": {
  "img": "https://f4.bcbits.com/img/0010041718_23.jpg",
  "bio": {
   "de": "Nick Hanzo ist ein in Wien ansässiger Producer und DJ, der 2016 seinen Bürojob aufgab, um sich ganz der Musik zu widmen. Er betreibt das Label Belly Dance Services mit, bildet mit Yaman das Duo Hanzo & Yaman und veröffentlichte u. a. auf Bonkers Music die „Frequent Habits“-EP. Seine Sets und Produktionen liefen auf FM4, etwa in La Boum de Luxe.",
   "en": "Nick Hanzo is a Vienna-based producer and DJ who left his office job in 2016 to focus fully on music. He co-runs the label Belly Dance Services, forms the duo Hanzo & Yaman with Yaman, and has released on Bonkers Music, among others the 'Frequent Habits' EP. His sets and productions have been played on FM4, for example on La Boum de Luxe."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "links": {
   "sc": "https://soundcloud.com/nickhanzo",
   "bc": "https://nickhanzo.bandcamp.com/",
   "web": "https://www.nickhanzo.com"
  },
  "labels": [
   "Belly Dance Services",
   "Bonkers Music"
  ],
  "sets": [
   {
    "t": "Electric Shapes 203 – Nick Hanzo",
    "u": "https://soundcloud.com/electric_shapes/203nick-hanzo"
   },
   {
    "t": "TB Podcast #15 – Nick Hanzo (Tellerbetrieb)",
    "u": "https://www.mixcloud.com/Tellerbetrieb/tb-podcast-15-nick-hanzo/"
   },
   {
    "t": "FM4 La Boum De Luxe – Hanzo's Summer Mix (2018)",
    "u": "https://soundcloud.com/nickhanzo/sommermix2018"
   }
  ],
  "src": [
   "https://jericho.orf.at/soundpark/n/nickhanzo/main",
   "https://nickhanzo.bandcamp.com/",
   "https://bonkers.bandcamp.com/album/frequent-habits",
   "https://soundcloud.com/nickhanzo"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Nasty": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "NoNameLeft": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Nya Nyx": {
  "img": "https://static.ra.co/images/profiles/square/nyanyx.jpg?dateUpdated=1686044690000",
  "bio": {
   "de": "Nya Nyx ist eine österreichische DJ, die ihren Sound auf RA als „dark, psychedelic and just the right amount of crazy“ beschreibt. Sie spielt vor allem in Wien, etwa in der FLUCC Wanne, und stand bei einer Vision-Serpent-Labelnacht in Budapest im Lineup. Gastmixe lieferte sie u. a. für den Tiefdruck Podcast und die Techgnosis Sessions.",
   "en": "Nya Nyx is an Austrian DJ who describes her sound on RA as 'dark, psychedelic and just the right amount of crazy'. She mostly plays in Vienna, for example at FLUCC Wanne, and was on the lineup of a Vision Serpent label night in Budapest. She has recorded guest mixes for the Tiefdruck Podcast and Techgnosis Sessions, among others."
  },
  "from": {
   "de": "Österreich",
   "en": "Austria"
  },
  "links": {
   "ra": "https://ra.co/dj/nyanyx",
   "sc": "https://soundcloud.com/nya_nyx",
   "ig": "https://www.instagram.com/nya.nyx_music"
  },
  "genres": [
   "Techno",
   "Psytech"
  ],
  "sets": [
   {
    "t": "Nya Nyx am Sturmdeck @ Schall & Rauch 25 (unlock|me)",
    "u": "https://soundcloud.com/unlock_me/nya-nyx-am-sturmdeck-schall-rauch-25"
   },
   {
    "t": "Tiefdruck Podcast #130",
    "u": "https://soundcloud.com/tiefdrucksalzburgszg2020/nyanyx-tiefdruck-podcast-130"
   },
   {
    "t": "Techgnosis Sessions 086 – Nya Nyx [AUT]",
    "u": "https://soundcloud.com/techgnosis-records/techgnosis-sessions-nya-nyx"
   }
  ],
  "src": [
   "https://ra.co/dj/nyanyx",
   "https://ra.co/events/2252547",
   "https://soundcloud.com/nya_nyx"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Paris Böhm": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Noemi Universe": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "OK CUTEE": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Paul Galbur": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Romanova": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "_ra_di_aa_ti_on_": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Nysos": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Nova.psd": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "neomodern": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Ruben de Ronde": {
  "img": "https://static.ra.co/images/profiles/square/rubenderonde.jpg?dateUpdated=1778148207227",
  "bio": {
   "de": "Ruben de Ronde ist ein niederländischer DJ, Produzent und Radiomoderator aus dem Progressive- und Trance-Bereich und Labelbetreiber im Umfeld von Statement! Music. Er tourt mit A State of Trance; sein Remix von Above & Beyonds „Can't Sleep“ (mit Elevven, 2022) stand drei Wochen auf Platz 1 bei Beatport.",
   "en": "Ruben de Ronde is a Dutch DJ, producer and radio host working in progressive and trance, and a label owner associated with Statement! Music. He tours with A State of Trance; his 2022 remix of Above & Beyond's 'Can't Sleep' (with Elevven) held the Beatport #1 spot for three weeks."
  },
  "from": {
   "de": "Niederlande",
   "en": "Netherlands"
  },
  "links": {
   "ra": "https://ra.co/dj/rubenderonde",
   "sc": "https://soundcloud.com/rubenderonde"
  },
  "labels": [
   "Statement! Music"
  ],
  "genres": [
   "Trance",
   "Progressive"
  ],
  "src": [
   "https://ra.co/dj/rubenderonde",
   "https://nl.ra.co/dj/rubenderonde/biography"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Rokis": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Rosi": {
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02",
  "noLinks": "2026-11-02"
 },
 "Rosa Nebel": {
  "img": "https://f4.bcbits.com/img/0031729466_10.jpg",
  "bio": {
   "de": "Rosa Nebel ist ein Live-Act aus Wien. Auf Bandcamp erschienen u. a. „Morbid Self-Attention“ (auch über Tutamen), „08_20“ und „Pseudofreiheit der Beliebigkeit“ sowie eine Split-EP auf Lux Rec.",
   "en": "Rosa Nebel is a live act from Vienna. Releases on Bandcamp include 'Morbid Self-Attention' (also via Tutamen), '08_20' and 'Pseudofreiheit der Beliebigkeit', plus a split EP on Lux Rec."
  },
  "from": {
   "de": "Wien",
   "en": "Vienna"
  },
  "links": {
   "bc": "https://rosanebel.bandcamp.com/",
   "sc": "https://soundcloud.com/rosanebel",
   "ig": "https://www.instagram.com/rosanebelvie/"
  },
  "src": [
   "https://rosanebel.bandcamp.com/",
   "https://tutamen.bandcamp.com/album/morbid-self-attention",
   "https://luxrec.bandcamp.com/album/split-ep"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Primate": {
  "bio": {
   "de": "Primate ist ein Drum-&-Bass-Producer und DJ aus Gent (Belgien), der laut seiner Agentur 2018 seine erste Drum-&-Bass-Show spielte. Bekannt wurde er mit kreischenden Bässen und harten Drums; inzwischen bewegt sich sein Sound zu melodischeren, technischeren Tracks mit rauer Kante. 2025 erschien die Single „About Us“.",
   "en": "Primate is a drum & bass producer and DJ from Ghent, Belgium, who according to his agency played his first drum & bass show in 2018. He became known for screechy basses and hard-hitting drums, and his sound has since shifted towards more melodic, technical tracks with a gritty edge. In 2025 he released the single 'About Us'."
  },
  "from": {
   "de": "Gent, Belgien",
   "en": "Ghent, Belgium"
  },
  "real": "Marcel Matheussen",
  "links": {
   "sc": "https://soundcloud.com/absoluteprimate",
   "sp": "https://open.spotify.com/artist/37C3qTCakuZc3EjTari9lU",
   "ig": "https://www.instagram.com/itsprimate/"
  },
  "genres": [
   "Drum & Bass"
  ],
  "src": [
   "https://www.mbartists.co.uk/artists/primate",
   "https://www.c-heads.com/2025/09/26/behind-the-beats-primate-on-live-energy-growth-and-the-story-of-about-us/"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
 },
 "Replic": {
  "img": "https://static.ra.co/images/profiles/replic.jpg?dateUpdated=1321611783000",
  "bio": {
   "de": "Drum-&-Bass-DJ, der regelmäßig bei der Reihe Switch! im Flex in Wien auflegt, u. a. bei „10 Years of Switch!“, beim „Switch! Birthday Bash“ und an der Seite von Alcemist & Teddy Killerz.",
   "en": "Drum & bass DJ who plays regularly at the Switch! series at Flex in Vienna, including \"10 Years of Switch!\", the \"Switch! Birthday Bash\" and alongside Alcemist & Teddy Killerz."
  },
  "real": "Alex Mohebbi",
  "links": {
   "ra": "https://ra.co/dj/replic",
   "sc": "https://soundcloud.com/replic"
  },
  "genres": [
   "Drum & Bass"
  ],
  "src": [
   "https://ra.co/dj/replic"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "PJPJPJ": {
  "img": "https://static.ra.co/images/profiles/square/pjpjpj.jpg?dateUpdated=1727797306000",
  "bio": {
   "de": "PJPJPJ ist Plattensammler und Produzent, der seit 2013 Platten gräbt und regelmäßig in Wien und Leipzig auflegt. Seine Sets reichen von trippigem Acid über Italo-Breaks bis zu euphorischem Progressive House. Er war u. a. bei Callshop Radio zu Gast und veröffentlichte auf Metro Drive.",
   "en": "PJPJPJ is a record collector and producer who has been digging for records since 2013 and plays regularly in Vienna and Leipzig. His sets range from trippy acid and Italo breaks to uplifting progressive house. He has guested on Callshop Radio and released on Metro Drive."
  },
  "links": {
   "ra": "https://ra.co/dj/pjpjpj",
   "sc": "https://soundcloud.com/pjnm"
  },
  "labels": [
   "Metro Drive"
  ],
  "genres": [
   "Acid",
   "Italo",
   "Progressive House"
  ],
  "sets": [
   {
    "t": "PJPJPJ @ AMUSE Festival 2025",
    "u": "https://soundcloud.com/pjnm/pj-amuse-festival-2025"
   },
   {
    "t": "bin aural #10 w/ PJPJPJ 16.04.24 (Callshop Radio)",
    "u": "https://soundcloud.com/callshopradio/bin-aural-10-w-pjpjpj-160424"
   },
   {
    "t": "Magic Water Records invites: PJ.nm (Radioshow 28|06|23)",
    "u": "https://soundcloud.com/magic-water-records/magic-water-records-invites-pjnm-radioshow-280623"
   }
  ],
  "alias": ["Aerodynamic Boy", "PJ.nm"],
  "src": [
   "https://de.ra.co/dj/pjpjpj",
   "https://de.ra.co/dj/pjpjpj/biography",
   "https://soundcloud.com/pjnm"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02"
 },
 "Psynonima": {
  "bio": {
   "de": "Djane Psynonima ist eine DJ aus dem Hi-Tech-Psytrance-Bereich. Sie hat u. a. Sets für Radio Zora (World People Productions Series) und Trance México gespielt und die Compilation „Mystic Spiral“ zusammengestellt.",
   "en": "Djane Psynonima is a hi-tech psytrance DJ. She has recorded sets for Radio Zora (World People Productions series) and Trance México and compiled the compilation 'Mystic Spiral'."
  },
  "links": {
   "sc": "https://soundcloud.com/psynonima",
   "ig": "https://www.instagram.com/djane_psynonima/"
  },
  "genres": [
   "Hi-Tech Psytrance"
  ],
  "sets": [
   {
    "t": "Pakawalla Hitech DJ-Set",
    "u": "https://soundcloud.com/psynonima/pakawalla-hitech-djset-psynonima"
   },
   {
    "t": "Djane Psynonima – Set #351 für Trance México",
    "u": "https://soundcloud.com/trance-mexico/djane-psynonima-set-351-exclusivo-para-trance-mexico"
   },
   {
    "t": "Psynonima – World People Productions Series Vol. 6 (Radio Zora, 22.05.2019)",
    "u": "https://soundcloud.com/radiozora/psynonima-world-people-productions-series-vol-6-22052019"
   }
  ],
  "src": [
   "https://soundcloud.com/psynonima",
   "https://www.instagram.com/djane_psynonima/",
   "https://soundcloud.com/psynonima/sets/mystic-spiral-compiled-by-djane-psynonima"
  ],
  "setsChecked": "2026-11-02",
  "infoChk": "2026-11-02",
  "noImg": "2026-11-02"
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
{"d":"2026-11-01","s":"06:00","e":"11:00","title":"Morgengymnastik × Connecting People","venue":"SASS Music Club","coll":["Connecting People"],"floors":[{"f":"","a":["Memet Acuma","Leon Diamant"]}],"src":[["sa","https://sassvienna.com/en/events/event/morgengymnastik-171"],["sa","https://sassvienna.com/en/events"]],"genres":["House","Techno","Electro","Broken Beat"],"price":"15 €","vok":1,"age":"18+","aw":1,"flyer":"https://sassvienna.com/assets/images/d/SASS_KW44_1080x1350px_SO_0111-ac726fc8.jpg","note":{"de":"Wenn draußen der Morgen anbricht, beginnt im SASS der Sonntag: Connecting People übernimmt die Afterhour Morgengymnastik mit zwei DJs, die schon unzählige Stunden gemeinsam hinter den Decks verbracht haben. Memet Acuma, seit Langem eine feste Größe der österreichischen Szene, bewegt sich zwischen House, Techno, gebrochenen Rhythmen und experimentellen Texturen. Sein eingespielter Partner Leon Diamant ergänzt ihn – gemeinsam verbinden sie tiefen, federnden House mit scharfen Electro-Cuts. Bequeme Schuhe empfohlen; Awareness-Team vor Ort.","en":"As morning breaks outside, Sunday starts at SASS: Connecting People takes over the Morgengymnastik afterhour with two DJs who have spent countless hours behind the decks together. Memet Acuma, a long-standing fixture of the Austrian scene, moves between house, techno, broken beats and experimental textures. His well-rehearsed partner Leon Diamant joins him – together they blend deep, bouncy house with sharp electro cuts. Comfortable shoes recommended; awareness team on site."},"chk":"2026-11-01","srcChk":"2026-10-31"},
{"d":"2026-11-01","s":"14:00","e":"20:00","title":"FLUT x Callshop Radio – Week 44","venue":"FLUCC Deck","coll":["Spumante Records","Callshop Radio"],"price":"Eintritt frei","note":{"de":"Sonntagnachmittag am FLUCC Deck: FLUT (FLUCC Transmitter) ist Teil der erweiterten Aktivitäten des FLUCC und kooperiert mit Callshop Radio, das auch aus Düsseldorf, Leipzig und Paris sendet. Die Session wird live über Stream 2 auf callshopradio.com übertragen und von Spumante Records aus Wien kuratiert. Das Live-DJ-Line-up bilden The Lebanese, Findus, Helix, sig. Molteni, Birk und Soularium. Während des Streams ist die Deck-Bar geöffnet. Eintritt frei.","en":"Sunday afternoon on the FLUCC Deck: FLUT (FLUCC Transmitter) is part of FLUCC's extended activities and cooperates with Callshop Radio, which also broadcasts from Düsseldorf, Leipzig and Paris. The session is streamed live via Stream 2 on callshopradio.com and curated by Vienna's Spumante Records. The live DJ line-up is The Lebanese, Findus, Helix, sig. Molteni, Birk and Soularium. The Deck bar is open during the stream. Free entry."},"vok":1,"src":[["fl","https://flucc.at/events/S3pHTJ-flut-x-callshop-radio-week-44-26/"]],"floors":[{"f":"Deck","a":["The Lebanese","Findus","Helix","sig. Molteni","Birk","Soularium"]}],"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/Flucc_Transmitter8.min-2560x1440.png","na":["lineup"],"chk":"2026-11-01","srcChk":"2026-10-31","genres":["Electronic"]},
{"d":"2026-11-04","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Wöchentlicher Mittwochs-Rave der Reihe Rave am Mittwoch im Werk, Beginn 23:00. Das Werk führt den Termin in seinem Programm, nennt aber noch kein Lineup, keinen Preis und keine Endzeit. Auch auf RA ist für den 4.11. noch keine eigene Eventseite zu finden; Details folgen voraussichtlich kurzfristig.","en":"Weekly Wednesday rave of the Rave am Mittwoch series at Das Werk, starting at 23:00. Das Werk lists the date in its programme but has not yet announced a lineup, price or end time. RA has no dedicated event page for 4 November yet either; details will probably follow at short notice."},"vok":1,"src":[["dw","https://www.daswerk.org/program"],["dw","https://www.daswerk.org/"]],"floors":[{"f":"","a":["TBA"]}],"na":["flyer","price","e","genres"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-05","s":"20:30","title":"Party Modern | SCH:CHT","venue":"FLUCC Deck","coll":["sch:cht","Wien Modern"],"genres":["Musique concrète","Noise"],"src":[["fl","https://flucc.at/events/HzQ4kp-party-modern-schcht/"],["wm","https://www.wienmodern.at/2026-party-modern-schcht-de-4531"]],"price":"12 € VVK (bis 4.11.) / 15 € AK, 5 € mit Wien-Modern-Festivalpass","tickets":"https://www.wienmodern.at/2026-party-modern-schcht-de-4531","vok":1,"e":"00:30","floors":[{"f":"Deck","a":["21:30|Kasho Chualan","Parajekt","THAO"]}],"note":{"de":"Das Kollektiv sch:cht lädt gemeinsam mit dem Festival Wien Modern zur Party auf das FLUCC Deck (Einlass 20:30, Beginn 21:30, Ende ca. 00:30). Den Auftakt macht Kasho Chualan, kurdisch-kanadische Pianistin, Komponistin und Klangkünstlerin aus Wien, mit Klavier und Elektronik. Danach spielt Parajekt, das Elektronik-Duo von Bernhard Hammer (E-Gitarre, Elektronik) und Matija Schellander (Drum Machine, Sampler), das elektronische Beats mit Musique concrète und Noise verbindet; das Set umfasst rund 48 Minuten. Zum Abschluss legt laut aktueller FLUCC-Seite die Wiener DJ THAO auf, die elektronische Clubmusik aus der ost- und südostasiatischen Diaspora erkundet (früher war an dieser Stelle Eye F genannt). Kuratiert vom Kulturverein kunstl:cht, koproduziert von Wien Modern; 12 € VVK bis 4.11., 15 € an der Abendkasse, 5 € mit Festivalpass.","en":"The sch:cht collective and the Wien Modern festival host a party on the FLUCC Deck (doors 20:30, start 21:30, ends around 00:30). Kasho Chualan, a Kurdish-Canadian pianist, composer and sound artist based in Vienna, opens with piano and electronics. Next up is Parajekt, the electronic duo of Bernhard Hammer (electric guitar, electronics) and Matija Schellander (drum machine, sampler), combining electronic beats with musique concrète and noise in a set of about 48 minutes. According to the current FLUCC page, Vienna-based DJ THAO closes the night, exploring electronic club music from the East and Southeast Asian diaspora (Eye F was listed in this slot earlier). Curated by Kulturverein kunstl:cht, co-produced by Wien Modern; €12 presale until 4 Nov, €15 at the door, €5 with a festival pass."},"na":["age"],"chk":"2026-11-02","srcChk":"2026-11-02","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/5.11.26_Wien_Modern_DSC00296____G.2db7d666.fill-1200x630.jpg"},
{"d":"2026-11-05","s":"23:00","e":"06:00","title":"Donnerstag Nacht","venue":"SASS Music Club","floors":[{"f":"","a":["Gilista","Artemuse","Michael Wagner"]}],"price":"10–15 € / Studierende 0–5 € (inkl. Welcome-Drink)","age":"18+","aw":1,"vok":1,"note":{"de":"Donnerstag Nacht im SASS (23:00–06:00) mit drei DJs. Gilista übernimmt das Warm-up und verbindet 2000er-Vibes mit neueren Sounds – nostalgisch, treibend, groovy. Artemuse, Wiener DJ und Veranstalterin mit Kärntner und griechischen Wurzeln, legt seit 2015 auf, spielt rollende Basslines, eingängige Melodien und starke Vocals und betreibt seit 2025 die Reihe Jeez Louise, um mehr FLINTA*-DJs zu buchen. Michael Wagner aus Klagenfurt spielt nostalgischen, groovigen House der frühen 90er und 2000er mit Fokus auf weniger bekannte Tracks. Eintritt 10–15 €, Studierende 0–5 €, jeweils inkl. Welcome-Drink; ab 18 mit Ausweis-, Taschen- und Sicherheitskontrolle.","en":"Donnerstag Nacht at SASS (23:00–06:00) with three DJs. Gilista handles the warm-up, blending 2000s vibes with newer sounds – nostalgic, driving, groovy. Artemuse, a Vienna-based DJ and promoter with Carinthian and Greek roots, has been DJing since 2015, plays rolling basslines, catchy melodies and strong vocals, and since 2025 has run the Jeez Louise series to book more FLINTA* DJs. Michael Wagner from Klagenfurt plays nostalgic, groovy house from the early 90s and 2000s with a focus on lesser-known tracks. Entry €10–15, students €0–5, each including a welcome drink; 18+ with ID, bag and security checks."},"genres":["House"],"src":[["sa","https://sassvienna.com/en/events/event/donnerstag-nacht-54"],["sa","https://sassvienna.com/en/events"]],"chk":"2026-11-02","srcChk":"2026-11-02","flyer":"https://sassvienna.com/assets/images/8/SASS_KW45_1080x1350px_DO_1-dfb52728.jpg"},
{"d":"2026-11-06","s":"21:00","title":"up/or with NEXUS (live), k means, SAMI, DJ Fred & zey","venue":"FLUCC Deck","floors":[{"f":"","a":["NEXUS","k means","SAMI","DJ Fred","zey"]}],"src":[["fl","https://flucc.at/events/X7gLPJ-upor-with-nexus-live-k-means-sami-dj-fred-zey/"]],"e":"04:30","coll":["Bestand","up/or"],"genres":["Experimental","Bass","Grime","Dubstep","Breaks"],"price":"VVK 11 € · AK 14 €","tickets":"https://kupfticket.com/en/events/upor-bestand-nov26","note":{"de":"up/or – slowenisch für „Widerstand“ – ist eine Reihe zwischen politischer Artikulation, klanglichem Experiment und Clubmusik, präsentiert von Bestand auf dem FLUCC Deck (21:00–04:30). Live spielt NEXUS, das Duo aus B4mba und Mooki6, das das Erbe seiner Herkunft mit Metal, Punk, Dubstep, Trap und experimenteller Clubelektronik verbindet. k means aus Bristol pendelt zwischen Club-Rush und experimentellen, dunklen, kakophonen Sounds; SAMI, Producerin und DJ aus Berlin, spielt bassige, genrefluide Sets mit Grime, 140er-Dubstep, Bass und Rap. DJ Fred bringt Breaks, die Wiener DJ, Sounddesignerin und Veranstalterin zey verbindet verschiedene Traditionen Schwarzer zeitgenössischer Musik. VVK 11 €, AK 14 €, ermäßigte Tickets online.","en":"up/or – Slovenian for 'resistance' – is a series between political articulation, sonic experiment and club music, presented by Bestand on the FLUCC Deck (21:00–04:30). NEXUS plays live, the duo of B4mba and Mooki6, who blend their ancestral heritage with metal, punk, dubstep, trap and experimental club electronics. Bristol's k means moves between club rush and experimental, dark, cacophonous sounds; SAMI, a Berlin-based producer and DJ, plays bass-heavy, genre-fluid sets of grime, 140 dubstep, bass and rap. DJ Fred brings breaks, and Vienna-based DJ, sound designer and organiser zey connects diverse Black contemporary music traditions. Presale €11, door €14, reduced tickets online."},"vok":1,"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/061126_upor_Deck_-_Samo_Zeichen.max-2560x1440.png","head":["NEXUS"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"21:00","e":"04:00","title":"Plüsch","venue":"Tagada","coll":["House of Plüsch"],"genres":["House"],"floors":[{"f":"","a":["MJANE","Miyra Lim","Cristinho","Florian No"]}],"note":{"de":"Plüsch ist eine House-Nacht im Tagada: Vier DJs – MJANE, Miyra Lim, Cristinho und Florian No – sollen den Dancefloor zum Kochen bringen. Motto: „4 DJs. 1 Message: Love will Save the Day“ – House Music All Night Long.","en":"Plüsch is a house night at Tagada: four DJs – MJANE, Miyra Lim, Cristinho and Florian No – set out to bring the dancefloor to the boil. Motto: '4 DJs. 1 Message: Love will Save the Day' – house music all night long."},"src":[["ft","https://frey-tag.at/locations/tagada"],["ft","https://frey-tag.at/kalender/pluesch?s=D58FzEGyT"]],"na":["price","tickets","flyer","age"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-06","s":"22:00","title":"Biosphere – The Techno Spirit of 1997","venue":"Club Exil","coll":["Fluffig"],"genres":["Techno","Acid"],"floors":[{"f":"Bridge Floor","a":["Sam Paganini","The Advent","Joro & Joabo","Elex Red","Tolaris","MC Mars","MC Spot"]},{"f":"Maschinenraum by Fluffig","a":["Anna Ullrich","MARØ","Who is Ela¿","DORAH"]},{"f":"Cyberspace Artist Lab","a":["DJ SDRICCI","Marilou","Raphael Warg","LĪVA"]}],"note":{"de":"BIOSPHERE – The Techno Spirit of 1997 lässt den Geist der Wiener Rave-Szene der 90er wieder aufleben: „90s Acid Techno meets Cosmic Rave“, 8 Stunden auf 3 Floors im Club Exil in Vösendorf (22:00–06:00, ab 20). Auf dem Bridge Floor spielen der Italiener Sam Paganini (Treviso; bekannt für „Zoe“ und „Rave“, Releases auf Drumcode) und The Advent (London, Raw Techno/Electro), dazu Joro & Joabo, Elex Red und Tolaris sowie live die MCs MC Mars und MC Spot. Den Maschinenraum gestaltet Fluffig mit Anna Ullrich (Techno, Bounce, Trance), MARØ, WHO IS ELA¿ und DORAH (Hard Bounce, Hard Techno). Im Cyberspace Artist Lab (in Kooperation mit Dancemalschutz) stehen Mentor DJ SDRICCI und ausgewählte Newcomer wie Marilou (Thessaloniki), LĪVA und Raphael Warg. Erste Ticketstufe (33 €) ausverkauft, Tickets über StageDates.","en":"BIOSPHERE – The Techno Spirit of 1997 revives the spirit of Vienna's 90s rave scene: '90s acid techno meets cosmic rave', 8 hours on 3 floors at Club Exil in Vösendorf (22:00–06:00, 20+). The Bridge Floor features Italy's Sam Paganini (Treviso; known for 'Zoe' and 'Rave', releases on Drumcode) and The Advent (London, raw techno/electro), plus Joro & Joabo, Elex Red and Tolaris, with live vocals by MC Mars and MC Spot. Fluffig hosts the Maschinenraum with Anna Ullrich (techno, bounce, trance), MARØ, WHO IS ELA¿ and DORAH (hard bounce, hard techno). The Cyberspace Artist Lab (in partnership with Dancemalschutz) features mentor DJ SDRICCI and selected newcomers such as Marilou (Thessaloniki), LĪVA and Raphael Warg. First ticket tier (€33) sold out, tickets via StageDates."},"src":[["ex","https://www.club-exil.at/"],["ex","https://club-exil.at/"],["bio","https://www.biosphere1997.com/"],["ra","https://ra.co/events/2523457"],["wa","https://warda.at/events/biosphere-club-exil/"]],"vok":1,"tickets":"https://stagedates.com/events/biosphere-club-exil-vosendorf-20261106-HQLYL","price":"ab 33 € (Zündung 1 ausverkauft)","e":"06:00","age":"20+","flyer":"https://www.biosphere1997.com/assets/biosphere-flyer-lineup-2026-11-06.jpg?v=2","head":["Sam Paganini","The Advent"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"22:00","e":"04:45","title":"Empyreon – Vol. III","venue":"The Loft","coll":["Empyreon","Kollektiv Birdhouse"],"genres":["Progressive House"],"floors":[{"f":"Wohnzimmer","a":["22:00|Mary Slim","23:40|Edictum","01:20|Matt Ludlam","03:00|DJ Andy"]}],"price":"Freie Spende","flyer":"https://www.theloft.at/wp-content/uploads/2026/10/2026.11.06_empyreon-vol.-iii.png","note":{"de":"Dritte Ausgabe von Empyreon im Wohnzimmer des Loft: Gastgeber Kollektiv Birdhouse will in Wien eine Progressive-House-Underground-Szene aufbauen und setzt auf ein internationales Lineup und DJ-Handwerk. Die Sets sind als Bogen geplant – von deepen Grooves über treibende, melodische und emotionale Sounds bis zu dunklen, technoiden, hypnotischen Rhythmen. Es spielen Mary Slim (22:00), Edictum (23:40), Matt Ludlam (01:20) und DJ Andy (03:00–04:45). Eintritt gegen freie Spende.","en":"Third edition of Empyreon in The Loft's Wohnzimmer: host Kollektiv Birdhouse wants to build a progressive house underground scene in Vienna, focusing on an international lineup and DJ craft. The sets are planned as one arc – from deep grooves through driving, melodic and emotional sounds to dark, techy, hypnotic rhythms. Playing are Mary Slim (22:00), Edictum (23:40), Matt Ludlam (01:20) and DJ Andy (03:00–04:45). Entry by free donation."},"vok":1,"src":[["lo","https://www.theloft.at/empyreon-vol-iii/"]],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"22:00","e":"06:00","title":"Café Mondo invites Mama Demba","venue":"Funkhaus","coll":["Café Mondo"],"genres":["Disco","Afrobeat"],"floors":[{"f":"","a":["Mama Demba"]}],"price":"12 €","zero":1,"flyer":"https://images.ra.co/63fc147b0c49a7096166b3173d2d12fdd9f62be8.jpg","note":{"de":"Nach einem ruhigen Sommer meldet sich die Wiener Crew Café Mondo mit einer Nacht im Funkhaus zurück, angekündigt mit immersivem Soundsystem. Zu Gast ist erstmals in Wien Mama Demba (CV/PT), ein in Lissabon lebender DJ aus Kap Verde, der als Archäologe lusophoner Musik gilt und eine der besten Sammlungen afrikanischer Platten besitzen soll. Er spielt Sounds aus Kap Verde, Angola, Guinea-Bissau, São Tomé und Príncipe sowie den Westindischen Inseln und ist mit Tabanka Records, dem Badju D Terra Sound System Collective und der Mindel Reggae Family verbunden. RA nennt Disco und Afrobeat, 22:00–06:00, 12 € (Early-Bird-Vorverkauf über KUPFticket). Keine Toleranz für Rassismus und Hass – wer sich unwohl fühlt, wendet sich an Personal, Bar oder Security.","en":"After a quiet summer, Vienna crew Café Mondo returns with a night at Funkhaus, announced with an immersive sound system. Their guest, in Vienna for the first time, is Mama Demba (CV/PT), a Lisbon-based DJ from Cape Verde described as an archaeologist of Lusophone music with one of the finest African record collections. He plays sounds from Cape Verde, Angola, Guinea-Bissau, São Tomé and Príncipe and the West Indies and is linked to Tabanka Records, the Badju D Terra Sound System Collective and the Mindel Reggae Family. RA lists disco and afrobeat, 22:00–06:00, €12 (early-bird presale via KUPFticket). No tolerance for racism and hate – anyone feeling unsafe can turn to staff, bar or security."},"src":[["ra","https://ra.co/events/2568365"],["ta","https://www.technoairlines.com/event/cafe-mondo-invites-mama-demba-cv-pt-funkhaus-2026-11-06"]],"na":["tickets"],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-11-06","s":"22:00","e":"06:00","title":"Clubbduzz","venue":"Celeste","floors":[{"f":"","a":["ALT","H∆NN∆","Sentic Cycle","Shaolinda","DJ Kompact","DDS Fam"]}],"vok":1,"note":{"de":"Clubnacht Clubbduzz im Celeste in Margareten, von 22:00 bis 06:00. Laut Programm des Celeste spielen ALT (aka AbbyLeeTee), H∆NN∆, Sentic Cycle, Shaolinda, DJ Kompact und die DDS Fam als DJ-Crew. Die Reihe war bereits im November 2025 im Celeste zu Gast. Preis, Genres und Flyer nennt das Celeste nicht.","en":"Clubbduzz club night at Celeste in Margareten, 22:00 to 06:00. According to Celeste's programme, ALT (aka AbbyLeeTee), H∆NN∆, Sentic Cycle, Shaolinda, DJ Kompact and the DDS Fam DJ crew play. The series already visited Celeste in November 2025. Celeste lists no price, genres or flyer."},"src":[["ce","https://celeste.co.at/"]],"na":["price","tickets","flyer","genres"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-06","s":"23:00","e":"06:00","title":"Mahlwerk × Fadercult w/ Afem Syko & Lisa Korver","venue":"Grelle Forelle","coll":["Mahlwerk","Fadercult"],"genres":["Techno","Trance","Drum & Bass","Bounce","Hardgroove"],"price":"ab 13 €","floors":[{"f":"Mainfloor","a":["Afem Syko","Lisa Korver","maro","Max Wagner","WO.IZZY","Kat Ze"]},{"f":"Kitchen (Fadercult Berlin)","a":["Sony2k","Linus Villa","Ben Derris","Sophti"]}],"src":[["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/mahlwerk-and-fadercult?s=KW-rAGWQH"],["gf","https://www.grelleforelle.com/project/0611-mahlwerk-fadercult-w-afem-syko-lisa-horver/"],["ra","https://ra.co/events/2544505"]],"vok":1,"tickets":"https://808factory.stager.co/shop/default/events/111702111","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/mahlwerk_061126_web.jpg","age":"21+","head":["Afem Syko","Lisa Korver"],"note":{"de":"Mahlwerk kehrt in die Grelle Forelle zurück und bringt das Berliner Kollektiv Fadercult mit. Auf dem Mainfloor spielen Afem Syko aus Berlin, deren Sound Techno, Drum & Bass und Trance mischt, und Lisa Korver aus Amsterdam, die sich zwischen Techno, Trance, Bounce und Hardgroove bewegt; dazu maro b2b Max Wagner und WO.IZZY b2b Kat Ze. Den Kitchen-Floor hostet Fadercult mit Sony2k, Linus Villa, Ben Derris und Sophti. Einlass 23:00, VVK über 808factory, Abendkasse ab 23:00, ab 21.","en":"Mahlwerk returns to Grelle Forelle, bringing the Berlin collective Fadercult along. On the main floor, Berlin's Afem Syko mixes techno, drum & bass and trance, and Amsterdam's Lisa Korver moves between techno, trance, bounce and hardgroove; plus maro b2b Max Wagner and WO.IZZY b2b Kat Ze. Fadercult hosts the Kitchen with Sony2k, Linus Villa, Ben Derris and Sophti. Doors 23:00, presale via 808factory, box office from 23:00, 21+."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","e":"06:00","title":"WOS Soundsystem invites Josefina Tapia","venue":"SASS Music Club","coll":["WOS Soundsystem"],"floors":[{"f":"","a":["Josefina Tapia","Apua","Bambi-S","Oliviero"]}],"src":[["sa","https://sassvienna.com/en/events/event/WOS-josefine%20tapia"]],"price":"10–15 € (inkl. Welcome-Drink)","vok":1,"age":"18+","aw":1,"head":["Josefina Tapia"],"note":{"de":"WOS Soundsystem übernimmt das SASS für eine lange Nacht Clubmusik (23:00–06:00) und lädt dafür Josefina Tapia ein, eine aus Chile stammende DJ, die klassischen amerikanischen House mit europäischem Minimalismus verbindet. Dazu spielen Apua, Bambi-S und Oliviero. Der Eintritt (10–15 €) enthält einen Welcome-Drink; ab 18 mit Ausweis-, Taschen- und Sicherheitskontrolle, das Awareness-Team des SASS ist vor Ort.","en":"WOS Soundsystem takes over SASS for a long night of club music (23:00–06:00), inviting Josefina Tapia, a Chilean DJ who blends classic American house with European minimalism. Apua, Bambi-S and Oliviero also play. Entry (€10–15) includes a welcome drink; 18+ with ID, bag and security checks, SASS's awareness team is on site."},"na":["flyer","genres"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","title":"GDN Klubnacht w/ Tham","venue":"Das Werk","coll":["GDN"],"floors":[{"f":"Mainfloor","a":["THAM"]},{"f":"","a":["Anatol","Hello Kiffy","High on Melancholia","Kristus","LavendL","MATIVIO"]}],"src":[["ev","https://events.at/venue/das-werk"],["dw","https://www.daswerk.org/program"],["ev","https://events.at/event/gdn-klubnacht-w-tham"],["ft","https://frey-tag.at/kalender/gdn-klubnacht?s=JmeX8qFwc"]],"s":"23:00","genres":["Techno","Hardgroove","Schranz","Hardbounce"],"tickets":"https://www.eventim-light.com/at/a/623a01d54f99ba1c8b632d22/e/6aca348b32733c9d9cec76ae","flyer":"https://image.events.at/images/facebook/9358032/GDN_KLUBNACHT_w_THAM_c_GDN_222.jpg?versionId=f9ab791072d1","aw":1,"nophoto":1,"vok":1,"price":"ab 12 €","head":["THAM"],"note":{"de":"Die nächste GDN Klubnacht im Werk: Die Berliner Künstlerin THAM übernimmt den Mainfloor mit groovigem Techno. Den Rest der Nacht bestreiten GDN-Residents und Freund*innen des Kollektivs – ANATOL, Hello Kiffy, High on Melancholia, KRISTUS, LavendL und MATIVIO – mit Techno, Hardgroove, Schranz und Hardbounce. Ein geschultes Awareness-Team ist vor Ort (rote oder blaue Leuchtbänder am Arm, rot mit zusätzlicher medizinischer Ausbildung). Strikte No-Photo-Policy: Handykameras werden abgeklebt, eine Fotobox steht bereit; kein Platz für Homo- und Transphobie, Rassismus und Sexismus. Tickets ab 12 € über Eventim Light.","en":"The next GDN Klubnacht at Das Werk: Berlin artist THAM takes over the main floor with groovy techno. GDN residents and friends of the collective – ANATOL, Hello Kiffy, High on Melancholia, KRISTUS, LavendL and MATIVIO – cover the rest of the night with techno, hardgroove, schranz and hardbounce. A trained awareness team is on site (red or blue light strips on the arm, red with additional medical training). Strict no-photo policy: phone cameras are covered with stickers, a photo box is available; no place for homophobia, transphobia, racism or sexism. Tickets from €12 via Eventim Light."},"na":["e"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","title":"Im Freudentaumel","venue":"FLUCC Wanne","coll":["Im Freudentaumel"],"src":[["fl","https://flucc.at/events/QgUEhp-im-freudentaumel/"]],"e":"06:00","genres":["Techno"],"price":"10–15 €","tickets":"https://kupfticket.com/events/im-freudentaumel","floors":[{"f":"","a":["Scheibosan","Glitzer & Bass","Nafaka & Lipo","Kollektiv Sheesh"]}],"note":{"de":"Im Freudentaumel ist nach einem gelungenen Herbststart zurück im FLUCC (Kupf) mit verträumtem Techno „in unterschiedlichen Farben“ (23:00–06:00). Es spielen Scheibosan, Glitzer & Bass, Nafaka & Lipo und Kollektiv Sheesh. Dazu gibt es eine Live-Lichtshow, verspielte Missionen, Gratis-Secco und verträumte Deko. Tickets 10–15 € über KUPFticket, ein kleines Early-Bird-Kontingent um ca. 10 €.","en":"Im Freudentaumel is back at FLUCC (Kupf) after a great autumn start, with dreamy techno 'in different colours' (23:00–06:00). Playing are Scheibosan, Glitzer & Bass, Nafaka & Lipo and Kollektiv Sheesh. There is also a live light show, playful missions, free secco and dreamy decorations. Tickets €10–15 via KUPFticket, with a small early-bird allotment at around €10."},"vok":1,"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/kupf.min-2560x1440.png","chk":"2026-10-30","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","title":"BLUR with E.LINA","venue":"PRST","floors":[{"f":"","a":["E.LINA","Chris Freud","David Radi","Matthias Kaiser"]}],"src":[["rs","https://rausgegangen.com/at/en/locations/prst-club/"],["ra","https://ra.co/events/2553366"]],"e":"06:00","genres":["House","Tech House"],"coll":["Kollektiv Ost:West"],"price":"online 12–20 €, AK 16 € vor 0 Uhr / 20 € danach","age":"18+","tickets":"https://ra.co/events/2553366","flyer":"https://images.ra.co/5925b8f06c12ea4c41b0a57e9e5c777165085851.jpg","head":["E.LINA"],"note":{"de":"BLUR ist eine House-Nacht von Kollektiv Ost:West im PRST (23:00–06:00). Headlinerin ist E.LINA, eine ukrainische, in Berlin lebende Künstlerin mit Wurzeln in Hip-Hop und elektronischer Musik, bekannt für tiefe Basslines und rhythmische Melodien; gespielt hat sie u. a. im CDV, in der Panorama Bar, im Amnesia sowie bei Dimensions und Fusion. Dazu spielen die KO:W-Residents Chris Freud, David Radi und Matthias Kaiser. Online 12–20 €, Abendkasse 16 € vor Mitternacht, 20 € danach; ab 18.","en":"BLUR is a house night by Kollektiv Ost:West at PRST (23:00–06:00). The headliner is E.LINA, a Ukrainian, Berlin-based artist rooted in hip-hop and electronic music, known for deep basslines and rhythmic melodies; she has played CDV, Panorama Bar, Amnesia, Dimensions and Fusion, among others. KO:W residents Chris Freud, David Radi and Matthias Kaiser complete the lineup. Online €12–20, door €16 before midnight and €20 after; 18+."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","title":"Max Styler","venue":"O der Klub","coll":["SIGNAL"],"genres":["Indie Dance","House"],"floors":[{"f":"","a":["Max Styler"]}],"price":"12–25 €","tickets":"https://shop.o-klub.at/shop/registrations?event_id=021e8ed5-99cc-491b-876a-377ca7925ade","flyer":"https://o-klub.at/wp-content/uploads/2026/08/Max_feed-web.jpg","note":{"de":"SIGNAL präsentiert Max Styler im O der Klub (23:00–06:00, ab 18). Der aus Kalifornien stammende Producer war 2025 laut 1001Tracklists der meistgesupportete Producer der Top 101 und landete mehrere Beatport-#1-Releases. Er gründete sein eigenes Label und Eventformat Nu Moda, war im Jänner 2026 Beatports Artist of the Month und erreichte mit „Greece 2000“ Platz 1 über alle Genres. Der Wien-Termin ist Teil seiner bisher größten Headline-Tour durch Nord- und Südamerika, Großbritannien und Europa.","en":"SIGNAL presents Max Styler at O der Klub (23:00–06:00, 18+). According to 1001Tracklists, the California-born producer was the most-supported producer in its 2025 Top 101 and scored several Beatport #1 releases. He launched his own label and event brand Nu Moda, was Beatport's Artist of the Month in January 2026 and reached #1 across all genres with 'Greece 2000'. The Vienna date is part of his biggest headline tour to date across North and South America, the UK and Europe."},"vok":1,"src":[["ok","https://o-klub.at/events/max-styler/"],["ra","https://ra.co/events/2519490"],["vo","https://www.volume.at/events/signal-presents-max-styler-2026-11-06/"]],"e":"06:00","age":"18+","head":["Max Styler"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:00","title":"Soularium w/ Santo","venue":"The Loft","coll":["Soularium"],"genres":["House"],"floors":[{"f":"Oben","a":["Santo"]}],"price":"12–15/17 €","note":{"de":"Die Reihe Soularium holt Santo aus der Schweiz in den oberen Floor („Oben“) des Loft. Das Loft taggt den Abend mit House; Beginn 23:00, Eintritt 12–15/17 €. Weitere Acts, Endzeit und ein Beschreibungstext sind auf der Loft-Seite bislang nicht angegeben.","en":"The Soularium series brings Santo from Switzerland to The Loft's upstairs floor ('Oben'). The Loft tags the night as house; starts at 23:00, entry €12–15/17. Further acts, end time and a description have not yet been published on The Loft's page."},"vok":1,"src":[["lo","https://www.theloft.at/soularium-w-santo-ch/"]],"head":["Santo"],"na":["flyer","e"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-06","s":"23:30","e":"05:00","title":"5. Org","venue":"Loop","coll":["LustMusik"],"genres":["Techno"],"floors":[{"f":"","a":["Jana Passt","LinsenJoe","Mia Wurscht","SandimSchuh"]}],"price":"Eintritt frei","age":"18+","flyer":"https://images.ra.co/d47d710aa0e213e5e1e4bf08120937ccabed4eca.jpg","note":{"de":"Fünfte Ausgabe der Reihe „Org“ von LustMusik im Loop am Gürtel, auf RA als Techno-Nacht gelistet. Das Lineup steht auf RA ohne Trennzeichen („Jana Passt LustMusik LinsenJoe Mia Wurscht SandimSchuh“) – gemeint sind offenbar Jana Passt, LinsenJoe, Mia Wurscht und SandimSchuh, dazu LustMusik selbst; eine Eventbeschreibung gibt es nicht. 23:30–05:00, RA gibt als Eintritt 0 an, ab 18.","en":"Fifth edition of LustMusik's 'Org' series at Loop on the Gürtel, listed on RA as a techno night. RA shows the lineup without separators ('Jana Passt LustMusik LinsenJoe Mia Wurscht SandimSchuh') – apparently Jana Passt, LinsenJoe, Mia Wurscht and SandimSchuh plus LustMusik themselves; there is no event description. 23:30–05:00, RA lists entry as 0, 18+."},"src":[["ra","https://ra.co/events/2562864"],["ta","https://www.technoairlines.com/event/5-org-loop-2026-11-06"]],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-11-06","s":"23:30","e":"06:00","title":"Spectral with Dual Drive (SE)","venue":"Kramladen","coll":["Spectral"],"genres":["Techno","Acid"],"floors":[{"f":"","a":["Dual Drive","Alena Noctis","Patrik Pagan","Relinquo"]}],"head":["Dual Drive"],"price":"Eintritt frei","age":"18+","flyer":"https://images.ra.co/bd88d8ec9395629894e2e02a3a391e16d5fed56f.jpg","note":{"de":"Die Reihe Spectral holt das schwedische DJ-Duo Dual Drive in den Kramladen. Die beiden spielen seit über vier Jahren zusammen, betreiben die Eventreihe Demand und standen schon mit Lilly Palmer, Bart Skils und Thomas Schumacher auf der Bühne. Unterstützt werden sie von den Spectral-Residents Alena Noctis, Patrik Pagan und Relinquo, die mit Acid, melodischem und treibendem Techno bis in den Morgen spielen. Beginn 23:30, Ende 06:00, Eintritt frei, ab 18.","en":"The Spectral series brings Swedish DJ duo Dual Drive to Kramladen. The pair have played together for more than four years, run the Demand event series and have shared stages with Lilly Palmer, Bart Skils and Thomas Schumacher. Spectral residents Alena Noctis, Patrik Pagan and Relinquo support them with acid, melodic and driving techno until the morning. Starts 23:30, ends 06:00, free entry, 18+."},"src":[["ra","https://ra.co/events/2573844"],["ta","https://www.technoairlines.com/event/spectral-with-dual-drive-se-kramladen-2026-11-06"]],"na":["tickets"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-06","s":"23:45","title":"Sorry Mom – herbstrascheln","venue":"Club Lucia","coll":["Sorry Mom"],"genres":["Techno","Progressive","Psytech","Melodic Techno"],"price":"10 €","floors":[{"f":"","a":["Gugu","Hanneken","PA_olo","Romen Est Omen"]}],"src":[["osh","https://ohschonhell.at/orte/club+lucia/963"],["cl","https://www.clublucia.at/event/sorry-mom-herbstrascheln/"],["ra","https://ra.co/events/2521239"]],"vok":1,"e":"06:00","flyer":"https://www.clublucia.at/wp-content/uploads/2026/09/26_11-lucia-1080x1440-1-e1788265151476.png","age":"18+","note":{"de":"Sorry Mom lädt zum „herbstrascheln“ in den Club Lucia: eine warme, bassige Herbstnacht mit melodischem, progressivem, treibendem Techno und Psytech, um die Sommerträgheit vor dem Winter abzuschütteln. Es spielen Gugu, Hanneken, PA_olo und Romen est Omen. Beginn 23:45, Ende 06:00, Eintritt 10 €, ab 18; gespielt wird über ein L-Acoustics-System.","en":"Sorry Mom invites you to 'herbstrascheln' at Club Lucia: a warm, bass-heavy autumn night of melodic, progressive, driving techno and psytech to shake off the summer slump before winter. Playing are Gugu, Hanneken, PA_olo and Romen est Omen. Starts 23:45, ends 06:00, entry €10, 18+; sound comes from an L-Acoustics system."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"17:00","e":"23:00","title":"Kyau & Albert (Extended Set)","venue":"U4","coll":["euphonic records"],"genres":["Progressive House","Trance"],"floors":[{"f":"","a":["Kyau & Albert","Peter Illias","CREEXX","MJT & RPM"]}],"price":"€19","age":"18+","tickets":"https://ra.co/events/2506486","src":[["ra","https://ra.co/events/2506486"],["u4","https://www.u4.at/events/kyau-albert-live/"]],"vok":1,"flyer":"https://images.ra.co/1e56e39040905a5a82a08551fcdd340ce44f111c.jpg","head":["Kyau & Albert"],"note":{"de":"Kyau & Albert spielen im U4 ein 3-stündiges Extended Set – laut U4 ihr erster Auftritt in Österreich. Das deutsche Duo gründete 1997 das Label Euphonic, veröffentlicht seit 2004 auf Anjunabeats (London), spielte in über 80 Ländern und auf großen Festivals und moderiert die wöchentliche Radioshow „Euphonic Sessions“ (Progressive House, Melodic Techno, Trance). Support kommt von Peter Illias, CREEXX und MJT & RPM. Abend-Event von 17:00 bis 23:00, 19 €, ab 18; Tickets über RA.","en":"Kyau & Albert play a 3-hour extended set at U4 – according to U4 their first show in Austria. The German duo founded the Euphonic label in 1997, have released on London's Anjunabeats since 2004, have played more than 80 countries and major festivals, and host the weekly radio show 'Euphonic Sessions' (progressive house, melodic techno, trance). Support comes from Peter Illias, CREEXX and MJT & RPM. Evening event from 17:00 to 23:00, €19, 18+; tickets via RA."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"18:00","e":"00:00","title":"SXXPLICIT Pop-up Club","venue":"Libelle","coll":["Pole Circle","Slutlabs"],"sexpos":1,"lgbtq":1,"tickets":"https://events.eventjet.at/e/sxxplicit-vienna/","note":{"de":"SXXPLICIT ist ein von Gemma Rose gegründeter Pop-up-Club – ein von Sexarbeiter*innen geprägter, queerer Raum, der die Standards der Branche neu definieren will. Nach Events in Großbritannien bringen Pole Circle und Slutlabs das Format in die Libelle: eine Nacht queerer Freude und erotischer Rebellion mit Stage-Shows sowie Pole- und Lapdances (18:00–00:00). DJs, Performer*innen und Musikrichtung sind nicht angegeben. Ticket 45 € über Eventjet, das Ticket garantiert keinen Einlass (Door-Selection); Consent-Regeln werden beim Einlass erklärt, Gäste sollen in einem Zustand kommen, in dem sie auf sich und andere achten können.","en":"SXXPLICIT is a pop-up club founded by Gemma Rose – a worker-centred, queer-focused space aiming to redefine the industry's standards. After events in the UK, Pole Circle and Slutlabs bring the format to Libelle: a night of queer joy and erotic rebellion with stage shows plus pole and lap dances (18:00–00:00). DJs, performers and music style are not listed. Ticket €45 via Eventjet; a ticket does not guarantee entry (door selection); consent rules are explained at the door, and guests should arrive in a state in which they can look after themselves and others."},"src":[["sp","https://sexpositives.com/en/events/sxxplicit-wien-2026-11-07/"],["li","https://www.libelle.at/events/sxxplicit-by-pole-circle-x-slutlabs/"],["ej","https://events.eventjet.at/e/sxxplicit-vienna/"]],"price":"€45","vok":1,"flyer":"https://www.libelle.at/wp-content/uploads/2026/10/IMG_4142.png","floors":[{"f":"","a":["TBA"]}],"na":["genres","age"],"chk":"2026-11-01","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"21:00","title":"Pomelo Plaza #3 presented by Little Beat More","venue":"FLUCC Deck","coll":["Little Beat More"],"src":[["fl","https://flucc.at/events/aSALhK-little-beat-more/"]],"vok":1,"floors":[{"f":"Deck","a":["D.b.h","Urlaub in Jazzolo","Café Mondo"]}],"e":"04:00","price":"10 € (nur Abendkasse, bar)","genres":["Funk","Disco"],"flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/071126_POMELO_PLAZA_N.3_Deck_LittleBeatMor.max-2560x1440.jpg","zero":1,"note":{"de":"Little Beat More lädt zur dritten Pomelo Plaza auf das FLUCC Deck – ein herbstlicher Pomelo-Abend mit funky Grooves, Feel-Good-Rhythmen und Disco-Sounds, ausschließlich von Vinyl. Es spielen Little Beat More feat. D.b.h sowie die Vinyl-Selectors Urlaub in Jazzolo und Café Mondo. Beginn 21:00; das Programm nennt 04:00 als Ende, der Beschreibungstext 06:00. Eintritt 10 € die ganze Nacht, nur Abendkasse und nur bar. Null Toleranz für Rassismus und Hass – wer sich unwohl fühlt, kann sich an Bar oder Security wenden.","en":"Little Beat More hosts the third Pomelo Plaza on the FLUCC Deck – an autumn pomelo night of funky grooves, feel-good rhythms and disco sounds, all on vinyl. Playing are Little Beat More feat. D.b.h plus vinyl selectors Urlaub in Jazzolo and Café Mondo. Starts at 21:00; the listing gives 04:00 as the end, the description 06:00. Entry €10 all night, door only and cash only. Zero tolerance for racism and hate – anyone feeling unsafe can turn to the bar or security staff."},"na":["age"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"22:00","e":"06:00","title":"Fuelized 3 Year Anniversary w/ Minor Forms & Chrome","venue":"Club Lucia","coll":["Fuelized"],"genres":["Drum & Bass"],"floors":[{"f":"","a":["Minor Forms","Chrome","AudioDevice","ICY.DJ","Incognito","M4YB3","Shaxoron","Snowtek"]}],"price":"15 € (AK)","flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/Fuelized_3Years_Feed_Full_Lineup-scaled.jpg","note":{"de":"Fuelized feiert drei Jahre Partys im Club Lucia, die in Wien minimalen, deepen und souligen Drum & Bass pushen. Headliner sind zwei britische Underground-Größen: Minor Forms (Releases auf Sofa Sound, Flexout Audio und V Recordings) und Chrome (Yamatai, Mustard). Local Support kommt von AudioDevice (Contrast), ICY.DJ, Incognito, M4YB3, Shaxoron, Snowtek und dem Gewinner bzw. der Gewinnerin des Fuelized-Mix-Contests. 22:00–06:00, Abendkasse 15 €, Tickets über Eventfrog; ab 18.","en":"Fuelized celebrates three years of parties at Club Lucia pushing minimal, deep and soulful drum & bass in Vienna. Headliners are two UK underground names: Minor Forms (releases on Sofa Sound, Flexout Audio and V Recordings) and Chrome (Yamatai, Mustard). Local support comes from AudioDevice (Contrast), ICY.DJ, Incognito, M4YB3, Shaxoron, Snowtek and the winner of the Fuelized mix contest. 22:00–06:00, door €15, tickets via Eventfrog; 18+."},"vok":1,"src":[["cl","https://www.clublucia.at/event/fuelized-proudly-pres-3-yearanniversary-w-minor-forms-uk-chrome-uk/"],["ra","https://ra.co/events/2554882"]],"age":"18+","head":["Minor Forms","Chrome"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"22:00","e":"06:00","title":"traveling without moving","venue":"Funkhaus","coll":["created-on-earth"],"genres":["House"],"floors":[{"f":"","a":["Felix Rupprecht","Pancratio","Rayya"]}],"age":"18+","tickets":"https://ra.co/events/2547379","src":[["ra","https://ra.co/events/2547379"]],"flyer":"https://images.ra.co/40a4bba1f457a1ffdf3f6571db854cabe0a12fb7.png","note":{"de":"„traveling without moving“ von created-on-earth meint, sich durch Sound, Rhythmus und Atmosphäre wegtragen zu lassen, ohne die Tanzfläche zu verlassen: Statt Ticket, Pass und Koffer gibt es vielfältige Musik – trotz des Namens wird viel getanzt. Die Reise führt laut Beschreibung im Lauf der Nacht etwa nach Detroit und Rio. Es spielen Felix Rupprecht, Pancratio und Rayya; RA taggt den Abend mit House. 22:00–06:00 im Funkhaus, ab 18.","en":"'traveling without moving' by created-on-earth means being carried away by sound, rhythm and atmosphere without leaving the dancefloor: instead of a ticket, passport and suitcase there is varied music – despite the name, there is plenty of dancing. According to the description, the journey 'lands' in places like Detroit and Rio over the course of the night. Playing are Felix Rupprecht, Pancratio and Rayya; RA tags the night as house. 22:00–06:00 at Funkhaus, 18+."},"na":["price"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"22:00","e":"06:00","title":"Invitation","venue":"Celeste","floors":[{"f":"","a":["Armin Schmelz","Annie High","ADHS Lene","Marc Græbnør"]}],"vok":1,"note":{"de":"Clubnacht „Invitation ♡“ im Celeste von 22:00 bis 06:00. Laut Celeste-Programm sind Armin Schmelz sowie die DJs Annie High, ADHS Lene und Marc Græbnør dabei. Preis, Genres und Flyer sind auf der Seite des Celeste nicht angegeben.","en":"Club night \"Invitation ♡\" at Celeste from 22:00 to 06:00. According to Celeste's programme, Armin Schmelz plus DJs Annie High, ADHS Lene and Marc Græbnør are on the bill. Price, genres and flyer are not given on Celeste's site."},"src":[["ce","https://celeste.co.at/"]],"na":["price","tickets","flyer","genres"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-07","s":"23:00","e":"06:00","title":"Mixed Vienna w/ Prada2000","venue":"Grelle Forelle","price":"ab 15 €","floors":[{"f":"Mainfloor","a":["Prada2000","Catlex","Suitside","Aschenbrenner"]},{"f":"Kitchen","a":["DJ Parkverbot","Lieblos","Valera","Sasuma"]}],"src":[["ft","https://frey-tag.at/kalender/mixed-vienna?s=txQP29ZDl"],["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/0711-mixed-vienna-w-prada2000/"]],"vok":1,"tickets":"https://www.eventim-light.com/at/a/697ca7de355c727b43abf53b/e/6ab3d19b6095a69cdcc777b2","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/mixed_071126_web.jpg","genres":["Techno"],"head":["Prada2000"],"note":{"de":"Letzte Mixed-Vienna-Ausgabe des Jahres in der Grelle Forelle: Headliner Prada2000 spielt ein 3-stündiges Extended Set. Der Berliner DJ und Producer verbindet in energiegeladenen Sets euphorische Melodien, verspielte Vocals und druckvollen Bass. Auf dem Mainfloor spielen außerdem Catlex sowie Suitside b2b Aschenbrenner, die Kitchen bespielen Freund*innen der Crew: DJ Parkverbot, Lieblos b2b Valera und Sasuma. Einlass 23:00, Tickets ab 15 € über Eventim Light, Abendkasse ab 23:00, ab 21.","en":"Final Mixed Vienna edition of the year at Grelle Forelle: headliner Prada2000 plays a 3-hour extended set. The Berlin DJ and producer combines euphoric melodies, playful vocals and punchy bass in high-energy sets. Also on the main floor are Catlex and Suitside b2b Aschenbrenner, while friends of the crew play the Kitchen: DJ Parkverbot, Lieblos b2b Valera and Sasuma. Doors 23:00, tickets from €15 via Eventim Light, box office from 23:00, 21+."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","title":"Techno Obscene #35 – 3 Year Anniversary","venue":"Das Werk","coll":["Nine O Nine","LSH","909techno","Techno Obscene"],"genres":["Hardtechno","Detroit Techno","Hardgroove","Hypnotic Techno","Dub Techno"],"floors":[{"f":"Laster Floor · Rave","a":["Albin Brezlan b2b Huebl","Jayzo","TBA"]},{"f":"Luster Floor · Groove","a":["Vibechen","Dana Melissa","URBANIST"]}],"src":[["ev","https://events.at/event/techno-obscene-35"],["dw","https://www.daswerk.org/program"],["ra","https://ra.co/events/2556685"]],"zero":1,"nophoto":1,"tickets":"https://www.eventim-light.com/at/a/623a01d54f99ba1c8b632d22/e/6ace449532733c9d9cec7e01","note":{"de":"Techno Obscene feiert mit der 35. Ausgabe drei Jahre (Nine O Nine × LSH) im Werk und fragt, was eigentlich „obszön“ ist und wer das entscheidet – vielleicht ist es das Obszönste, in einer Welt voller Schubladen einfach man selbst zu sein. Versprochen wird roher, dreckiger Techno in einem Safer Space für Selbstausdruck. Laster Floor (Rave; Detroit, Hardtechno): Albin Brezlan b2b Huebl, Jayzo und ein weiterer Act (TBA). Luster Floor (Groove; Dub, Hypnotic, Hardgroove): Vibechen, Dana Melissa und URBANIST. Come as you are, null Toleranz gegen Homophobie, Sexismus, Rassismus und Hass, No-Photo-Policy und „No Shirt, No Party“ für alle Geschlechter; 23:00–06:00, 10–15 € (First Wave 9,09 €).","en":"Techno Obscene celebrates three years (Nine O Nine × LSH) with its 35th edition at Das Werk, asking what 'obscene' really means and who decides – perhaps the most obscene thing is simply being yourself in a world full of boxes. It promises raw, dirty techno in a safer space for self-expression. Laster Floor (rave; Detroit, hardtechno): Albin Brezlan b2b Huebl, Jayzo and one more act (TBA). Luster Floor (groove; dub, hypnotic, hardgroove): Vibechen, Dana Melissa and URBANIST. Come as you are, zero tolerance for homophobia, sexism, racism and hate, no-photo policy and 'no shirt, no party' for all genders; 23:00–06:00, €10–15 (first wave €9.09)."},"s":"23:00","flyer":"https://image.events.at/images/cfs_616w/9360010/TECHNO_OBSCENE_35_c_909_222.jpg?versionId=9a0046eecce1","vok":1,"e":"06:00","price":"10–15 € (1st wave 9,09 €)","age":"18+","chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","title":"served invites Harmony Rec. × hereandthere","venue":"Secret Location","coll":["served","Harmony Rec.","hereandthere"],"note":{"de":"Die dritte Ausgabe von served kehrt zu ihrem ursprünglichen Spirit zurück – erstmals auf zwei Floors und mit dem bisher größten Lineup. Zu Gast sind die Prager Crews Harmony Rec. und hereandthere, dazu Wiener Artists: anxxxious_t, Ayū (live), Georgia Bird, Melimeko, Menal Batti (House-Set), Pink Concrete b2b Secret Guest und Yan b2b saschka. Im Mittelpunkt stehen persönliche Musik und ein Raum zum Abtauchen; die Party ist von und für queere Menschen und ihre Allies, die Tanzflächen sind zum Tanzen da. Vorab-Registrierung über ein Formular im served-Telegram-Kanal (via Instagram @serve.ddd), Selektion an der Tür, Hausregeln vorab auf Instagram lesen. Secret Location, 23:00–06:00, 15–20 € nur bar an der Abendkasse, ab 18.","en":"The third edition of served returns to its original spirit – for the first time on two floors and with its biggest lineup yet. Guests are the Prague crews Harmony Rec. and hereandthere, plus Vienna artists: anxxxious_t, Ayū (live), Georgia Bird, Melimeko, Menal Batti (house set), Pink Concrete b2b secret guest and Yan b2b saschka. The focus is on personal music and a space to escape; the party is by and for queer people and their allies, and the dancefloors are for dancing. Pre-registration via a form in the served Telegram channel (via Instagram @serve.ddd), door selection, read the house rules on Instagram beforehand. Secret location, 23:00–06:00, €15–20 cash only at the door, 18+."},"src":[["ra","https://ra.co/events/2542405"]],"s":"23:00","e":"06:00","genres":["Techno","House"],"floors":[{"f":"","a":["anxxxious_t","Ayū","Georgia Bird","Melimeko","Menal Batti","Pink Concrete","Yan","saschka"]}],"price":"€15–20 (Abendkasse, nur bar)","age":"18+","lgbtq":1,"flyer":"https://images.ra.co/fccebdad98a9a9dc455b41f190d8f8f75420a3c2.png","chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-11-07","title":"technolog Special with Michel Lauriola (ARG)","venue":"Kramladen","coll":["technolog"],"genres":["Techno","Industrial"],"floors":[{"f":"","a":["23:00|anexate","00:15|Hetum","01:30|Michel Lauriola","04:00|Roton"]}],"src":[["vo","https://www.volume.at/drum-and-bass-techno-events-in-wien/"],["wa","https://warda.at/events/technolog-special-with-michel-lauriola-arg-kramladen/"],["ra","https://de.ra.co/events/2557226"],["ra","https://ra.co/events/2557226"],["vo","https://www.volume.at/events/technolog-special-with-michael-lauriola-arg-2026-11-07/"],["tl","https://www.technolog.wtf"]],"s":"23:00","e":"06:00","price":"Eintritt frei / free entry","age":"21+","note":{"de":"technolog lädt zum Special in den Kramladen mit Michel Lauriola aus Argentinien, der u. a. mit den Labels Mord, Nachtstrom Schallplatten und Semántica verbunden ist; RA taggt den Abend mit Techno und Industrial. Timetable: anexate (23:00), Hetum (00:15), Michel Lauriola (01:30–04:00) und Roton zum Abschluss (04:00–06:00). Freier Eintritt, ab 21.","en":"technolog hosts a special at Kramladen with Argentina's Michel Lauriola, associated with labels including Mord, Nachtstrom Schallplatten and Semántica; RA tags the night as techno and industrial. Timetable: anexate (23:00), Hetum (00:15), Michel Lauriola (01:30–04:00) and Roton closing (04:00–06:00). Free entry, 21+."},"flyer":"https://images.ra.co/12ca3bc55dbc0221ee32b3397c21302554e4ec90.jpg","head":["Michel Lauriola"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:00","title":"303 presents Hanzom Label Night","venue":"Flex","coll":["303","Hanzom"],"genres":["Drum & Bass","Neurofunk"],"tickets":"https://www.oeticket.com/event/303-presents-hanzom-label-night-flex-22234345/","flyer":"https://flex.at/wp-content/uploads/2026/10/Flyer_303_07112026.jpeg","note":{"de":"Das Label Hanzom kehrt mit 303 für eine Labelnacht ins Flex zurück: energiegeladener, hart treibender Neurofunk mit schwerem Bass. Einzelne Acts sind weder beim Flex noch bei oeticket oder events.at angegeben. Einlass 23:00, Tickets limitiert – VVK 18,75 € über oeticket (zzgl. Servicegebühr) und Abendkasse.","en":"The Hanzom label returns to Flex with 303 for a label night: high-energy, hard-hitting neurofunk with heavy bass. No individual acts are listed by Flex, oeticket or events.at. Doors 23:00, limited tickets – presale €18.75 via oeticket (plus service fee) and box office."},"vok":1,"src":[["fx","https://flex.at/event/303-presents-hanzom-label-night/"],["ev","https://events.at/event/303-presents-hanzom-label-night"],["ot","https://www.oeticket.com/noapp/eventseries/303-presents-hanzom-label-night-4257591/?affiliate=A21"],["ot","https://www.oeticket.com/event/303-presents-hanzom-label-night-flex-22234345/"]],"floors":[{"f":"","a":["TBA"]}],"price":"18,75 € VVK (oeticket, zzgl. Gebühr) / Abendkasse","na":["e","age"],"chk":"2026-11-02","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:00","e":"06:00","title":"Cosmic BirthRave","venue":"Rhiz","coll":["Fader Friends","Cosmic Egg"],"genres":["Techno","Hardcore"],"floors":[{"f":"","a":["adrialin","Enoltra","The Bear","gåpe","wert","Luminoise","Nikø Nøx","Zer0Ton1n","RIETVELD"]}],"price":"5 €","age":"18+","tickets":"https://ra.co/events/2563381","src":[["ra","https://ra.co/events/2563381"],["vo","https://www.volume.at/events/cosmicbirthrave-2026-11-07/"]],"flyer":"https://images.ra.co/ee23bc79d4345b9147dcbbee7d85756141afbfdd.png","note":{"de":"Fader Friends tun sich mit Cosmic Egg zusammen und bringen deren Cosmic-Debütparty ins Rhiz – zugleich die Geburtstagsfeier des Cosmic-Egg-Gründers. Versprochen wird eine Reise, bei der der Bass schwerer, die BPM schneller und die Energie immer größer wird, mit Licht und Sound im Gleichklang. Das Lineup aus kuratierten lokalen Talenten führt durch mehrere Genres elektronischer Musik (RA: Techno, Hardcore): adrialin, Enoltra b2b The Bear, gåpe, wert, Luminoise, Nikø Nøx und Zer0Ton1n b2b RIETVELD. 23:00–06:00, 5 €, ab 18.","en":"Fader Friends team up with Cosmic Egg to bring their Cosmic debut party to Rhiz – also the birthday celebration of Cosmic Egg's founder. It promises a journey where the bass gets heavier, the BPM faster and the energy keeps growing, with lights and sound moving as one. The lineup of curated local talent guides through multiple genres of electronic music (RA: techno, hardcore): adrialin, Enoltra b2b The Bear, gåpe, wert, Luminoise, Nikø Nøx and Zer0Ton1n b2b RIETVELD. 23:00–06:00, €5, 18+."},"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:00","e":"05:00","title":"Cyclic Existence","venue":"SASS Music Club","coll":["Cyclic Existence"],"floors":[{"f":"","a":["Arne","André","Arni Jr.","Duplikate"]}],"genres":["House","Minimal","Techno","Progressive","Electro"],"price":"10–15 € (inkl. Welcome-Drink)","age":"18+","aw":1,"vok":1,"note":{"de":"Cyclic Existence bringt vier DJs für eine Nacht deeperen House ins SASS (23:00–05:00) – entspannt, langsam aufbauend, mit Fokus auf Groove und gemeinsamer Energie. Arne bewegt sich in fließenden, unaufgeregten Sets zwischen House, Minimal und Techno. André legt seit über zehn Jahren auf, lebt seit 2019 in Offenbach, gräbt nach House, Progressive und Minimal ab den frühen 2000ern und betreibt die Off-Location-Reihe Not From This Earth. Arni Jr. ist seit über zehn Jahren Vinyl-only-DJ in Wien (Come Closer, Vinyl Fetish) mit Electro, Techno, Progressive und Broken Sounds; Duplikate, seit zwei Jahren im SASS und Teil des Housetiere-Kollektivs, spielt Electro House mit schweren Basslines, eingängigen Vocals und Metal-Kante. Eintritt 10–15 € inkl. Welcome-Drink, ab 18, Awareness-Team vor Ort.","en":"Cyclic Existence brings four DJs to SASS for a night of deeper house (23:00–05:00) – relaxed, building gradually, focused on groove and shared energy. Arne moves between house, minimal and techno in flowing, unhurried sets. André has been DJing for over ten years, has lived in Offenbach since 2019, digs for house, progressive and minimal from the early 2000s onwards and runs the off-location series Not From This Earth. Arni Jr. has been a vinyl-only DJ in Vienna for over ten years (Come Closer, Vinyl Fetish) playing electro, techno, progressive and broken sounds; Duplikate, at SASS for two years and part of the Housetiere collective, plays electro house with heavy basslines, catchy vocals and a metal edge. Entry €10–15 incl. welcome drink, 18+, awareness team on site."},"src":[["sa","https://sassvienna.com/en/events/event/cyclic-existence-november"],["sa","https://sassvienna.com/en/events"]],"na":["flyer"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-07","s":"23:30","title":"Klub Halal pres. Klub Palestine","venue":"FLUCC Wanne","coll":["Klub Halal","Habibi Party"],"src":[["fl","https://flucc.at/events/ipjeCW-klub-halal/"],["ra","https://ra.co/events/2552786"]],"price":"12 € VVK (FLUCC) · RA: 10/15/18 € (gestaffelt), nur Vorverkauf","tickets":"https://www.tickettailor.com/events/klubhalal/2454809","vok":1,"e":"06:00","genres":["Club","Electronica"],"floors":[{"f":"","a":["MAH MOOD","Rakans","Sherine Falasteen","MODI","Sanadrilla"]}],"age":"18+","aw":1,"lgbtq":1,"zero":1,"note":{"de":"Klub Halal präsentiert Klub Palestine in der FLUCC Wanne – eine Nacht zu Ehren queerer palästinensischer Künstler*innen, mit Solidarität auch für Sudan, Kongo, Libanon und Iran. 100 % des Gewinns gehen an fünf queere und trans palästinensische Geflüchtete in Ägypten (Wohnen, Essen, dringende Lebenskosten). Es treten auf: Drag-Artist Sherine Falasteen (aus Jerusalem, zwischen Ramallah und Brüssel), Techno-Artist Rakans aus Nazareth (Gründer von Rawmantique), DJ und Producer MAH MOOD aus Haifa (Gründer der Reihe Makhlouta), Tabla-Spieler MODI (Klub-Halal-Mitglied, live zu den DJ-Sets) und Klub-Halal-Gründerin Sanadrilla mit Arab-Pop-Edits. Awareness-Team in pinken Westen, Consent- und Filmregeln (Filmen nur auf der Bühne), null Toleranz gegen Diskriminierung, Türpolitik; nur Vorverkauf, solidarisch ermäßigte Tickets für Menschen mit wenig Geld, keine Rückerstattung außer bei Absage.","en":"Klub Halal presents Klub Palestine at FLUCC Wanne – a night honouring queer Palestinian artists, with solidarity extending to Sudan, Congo, Lebanon and Iran. 100% of profits go to five queer and trans Palestinian refugees in Egypt (housing, food, urgent living costs). Performing are drag artist Sherine Falasteen (from Jerusalem, based between Ramallah and Brussels), techno artist Rakans from Nazareth (founder of Rawmantique), Haifa-based DJ and producer MAH MOOD (founder of the Makhlouta series), tabla player MODI (Klub Halal member, live during the DJ sets) and Klub Halal founder Sanadrilla with Arab pop edits. Awareness team in pink vests, consent and filming rules (filming only on stage), zero tolerance for discrimination, door policy; presale only, community-supported reduced tickets for those on low incomes, no refunds unless cancelled."},"flyer":"https://images.ra.co/0f42345c1bcd19a268bc9b9524f3983e4ba7e043.jpg","chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-08","s":"06:00","e":"11:00","title":"Morgengymnastik","venue":"SASS Music Club","floors":[{"f":"","a":["Thomas Grün","Ulfersson"]}],"price":"15 €","age":"18+","aw":1,"vok":1,"note":{"de":"Die Sonntags-Afterhour Morgengymnastik im SASS (06:00–11:00) steht diesmal unter dem Motto „Making House Great Again“: Zwei befreundete DJs spielen Vinyl-Sets, um den Sonntag in Gang zu bringen. Thomas Grün, bekannt aus dem Club Pompadour, kehrt nach einer kreativen Pause hinter die Decks zurück. Ulfersson betreibt Vibrant.vie und ist eine feste Größe der Wiener House-Szene. Eintritt 15 €, ab 18 mit Ausweiskontrolle, Awareness-Team vor Ort.","en":"SASS's Sunday afterhour Morgengymnastik (06:00–11:00) runs under the motto 'Making House Great Again' this time: two friends play vinyl sets to get Sunday going. Thomas Grün, known from Club Pompadour, returns behind the decks after a creative break. Ulfersson runs Vibrant.vie and is an established part of Vienna's house scene. Entry €15, 18+ with ID check, awareness team on site."},"src":[["sa","https://sassvienna.com/en/events/event/morgengymnastik-172"],["sa","https://sassvienna.com/en/events"]],"na":["flyer","genres"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-08","s":"20:00","e":"23:45","title":"Sonntag'sdisco Vol. 28 w/ The Res","venue":"FLUCC Deck","floors":[{"f":"Deck","a":["The Res","Drehli Robnik"]}],"note":{"de":"Die 28. Sonntag'sdisco auf dem FLUCC Deck bringt The Res live auf die Bühne. Davor und danach legt Drehli Robnik „viele seiner Platten“ auf. 20:00–23:45, nur Abendkasse, Preis noch nicht bekannt; eine Musikrichtung nennt das FLUCC nicht.","en":"The 28th Sonntag'sdisco on the FLUCC Deck brings The Res live on stage. Before and after, Drehli Robnik plays 'many of his records'. 20:00–23:45, door sales only, price not yet announced; FLUCC does not name a music style."},"src":[["fl","https://flucc.at/events/f9RAFs-sonntag-sdisco-081126/"]],"vok":1,"price":"tba (nur AK)","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/081126_Sonntagsdisco_28_FLUCC_Deck.max-2560x1440.jpg","head":["The Res"],"na":["genres","age"],"chk":"2026-10-29","srcChk":"2026-10-29"},
{"d":"2026-11-11","s":"21:00","e":"04:00","title":"Köstlich x Gürtelgroove","venue":"Club Lucia","coll":["Köstlich","Gürtelgroove"],"genres":["UK Garage","Hardgroove","Techno"],"floors":[{"f":"","a":["POSTSCRIPTUM","FESH","Adam19","Antone b2b Dudas","Chris Eru b2b Mahofsky"]}],"price":"free (Spenden willkommen)","flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/2026-11-11-guertelgroove_koestlich_1080-x-1350.jpeg","note":{"de":"Die Kollektive Köstlich und Gürtelgroove teilen sich einen Mittwochabend im Club Lucia, angekündigt als Nacht voller Groove und Rhythmus mit UKG, Hardgroove und Techno. Von Köstlich spielen POSTSCRIPTUM, FESH sowie Chris Eru b2b Mahofsky, von Gürtelgroove Antone b2b Dudas. Dazu kommt Adam19 vom Kollektiv FIFI. Der Eintritt ist frei, Spenden sind willkommen. Die Veranstalter halten fest: kein Platz für Rassismus, Sexismus, Faschismus oder andere Formen von Hass und Gewalt.","en":"The collectives Köstlich and Gürtelgroove share a Wednesday night at Club Lucia, billed as a night driven by groove and rhythm with UKG, hardgroove and techno. Köstlich brings POSTSCRIPTUM, FESH and Chris Eru b2b Mahofsky, Gürtelgroove brings Antone b2b Dudas. Adam19 of the FIFI collective joins them. Entry is free, donations welcome. The organisers state there is no room for racism, sexism, fascism or any other form of hate or violence."},"vok":1,"src":[["cl","https://www.clublucia.at/event/kostlich-x-gurtelgroove/"]],"chk":"2026-10-30"},
{"d":"2026-11-11","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Der wöchentliche Rave am Mittwoch (RAM) im Werk unter dem Motto „Recharge Wednesdays“ – laut Veranstalter jede Woche harte Beats und lange Nächte. Beginn 23 Uhr; der Eintritt erfolgt in den bisherigen Ausgaben gegen freiwillige Spende, ein Dresscode existiert nicht. Ein Awareness-Team ist vor Ort. Das Line-up dieser Ausgabe ist noch nicht veröffentlicht.","en":"The weekly Rave am Mittwoch (RAM) at Das Werk under the motto 'Recharge Wednesdays' – heavy beats and long nights every week, according to the organisers. Starts at 23:00; previous editions had free entry with a voluntary donation and no dress code. An awareness team is present. The line-up for this edition has not been published yet."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}],"na":["price","e","flyer","tickets"],"chk":"2026-10-31"},
{"d":"2026-11-12","s":"19:00","e":"23:00","title":"sama recordings pres. s c h w e b e n","venue":"kv.r.","coll":["sama recordings"],"genres":["Experimental","Electronica"],"floors":[{"f":"","a":["Philipp Otterbach","Adina Camhy","Andrea Ida"]}],"price":"16,95–22,60 € (Regular/Supporter)","age":"18+","tickets":"https://kupfticket.com/en/shops/samarecordings","note":{"de":"s c h w e b e n ist die seit 2020 laufende Reihe von sama recordings zwischen Avantgarde-Pop, elektronischer Clubmusik und Experiment. Der deutsche Produzent, DJ und Remixer Philipp Otterbach zeigt bei seiner Wien-Premiere ein neu entwickeltes Live-Set mit ambienten Klanglandschaften. Adina Camhy (AT) spielt live mit Field Recordings, Kirchenorgel-Improvisationen und Stimme zwischen Noise, Ambient, Drone und Industrial; ihr Album „krst“ erschien 2025 bei smallforms. Andrea Ida (AT), Musikerin und Moderatorin bei Noods Radio (Bristol), legt ein DJ-Set auf. Es gilt ein Verhaltenskodex gegen Diskriminierung, Belästigung kann per E-Mail oder beim Team vor Ort gemeldet werden; Tickets als Regular oder Supporter (Soli-Aufpreis).","en":"s c h w e b e n is sama recordings' series, running since 2020, between avant-pop, electronic club music and experimental sounds. German producer, DJ and remixer Philipp Otterbach makes his Vienna debut with a newly developed live set of ambient soundscapes. Adina Camhy (AT) performs live with field recordings, church organ improvisation and voice, spanning noise, ambient, drone and industrial; her album \"krst\" came out on smallforms in 2025. Andrea Ida (AT), musician and host on Noods Radio (Bristol), plays a DJ set. A code of conduct against discrimination applies, harassment can be reported by email or to the team on site; tickets come as Regular or Supporter (solidarity surcharge)."},"src":[["ra","https://ra.co/events/2564492"]],"aw":1,"flyer":"https://images.ra.co/d0f6f204ba374cf91e61477d0a014d2b9cbee36d.jpg","chk":"2026-10-30"},
{"d":"2026-11-12","s":"23:00","e":"06:00","title":"Donnerstag Nacht × Green Light Collective","venue":"SASS Music Club","floors":[{"f":"","a":["Grenco","Andreas","Ian Staraj","Andrija Mlacovic"]}],"vok":1,"note":{"de":"Donnerstag Nacht im SASS Music Club mit dem Green Light Collective, das zuvor bei Radio Rudina in Wien zu Gast ist und danach ins SASS weiterzieht. Es spielen Grenco, Andreas, Ian Staraj und Andrija Mlacovic. Der Eintritt beträgt regulär 10–15 € inklusive Willkommensgetränk, für Studierende 0–5 €. Wie alle SASS-Veranstaltungen wird der Abend von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Thursday night at SASS Music Club with the Green Light Collective, who first guest at Radio Rudina in Vienna and then move on to SASS. Grenco, Andreas, Ian Staraj and Andrija Mlacovic play. Regular entry is 10–15 € including a welcome drink, students 0–5 €. As at all SASS events, an awareness team is present; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/donnerstag-nacht-55"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/donnerstag-nacht-55","srcChk":"2026-10-30","price":"10–15 € / Studierende 0–5 €","age":"18+","coll":["Green Light Collective"],"chk":"2026-10-31"},
{"d":"2026-11-13","s":"19:00","e":"06:00","title":"Superego Records Labelnight + Vantan Record Release","venue":"Celeste","coll":["Superego Records"],"genres":["House","Disco"],"floors":[{"f":"","a":["Vantan","RUG","Marie Byrd Land","Soulspin","Dansmussen","Siili","Punzmann","Nava Hemyari"]}],"head":["Vantan"],"price":"18 €","age":"18+","flyer":"https://images.ra.co/8f3abea4590c9ef38c74095f7e8b764a1d486c34.jpg","note":{"de":"Das Wiener Label Superego Records übernimmt das Celeste für eine bunte Nacht aus Live-Musik und DJ-Sets und feiert dabei die Album-Release-Show von Vantan. Live spielen Vantan, RUG und Marie Byrd Land (letztere steht nur im Beschreibungstext, nicht im RA-Lineup). Danach legen die drei Crews auf: Soulspin (Club Désirée) mit Disco, Italo, Hi-NRG und Proto-House, Dansmussen (Club Désirée), Siili (nomind; im RA-Lineup „Silii“) mit Minimal und House sowie Punzmann (Superego Records); auch Nava Hemyari steht im Lineup. Einlass 19:00, DJs ab 22:00, Ende 06:00, 18 €, ab 18.","en":"Vienna label Superego Records takes over Celeste for a colourful night of live music and DJ sets, celebrating Vantan's album release show. Vantan, RUG and Marie Byrd Land play live (the latter appears only in the description, not in the RA lineup). Afterwards the three crews DJ: Soulspin (Club Désirée) with disco, Italo, hi-NRG and proto-house, Dansmussen (Club Désirée), Siili (nomind; 'Silii' in the RA lineup) with minimal and house, and Punzmann (Superego Records); Nava Hemyari is also on the lineup. Doors 19:00, DJs from 22:00, ends 06:00, €18, 18+."},"src":[["ra","https://ra.co/events/2570993"],["ta","https://www.technoairlines.com/event/superego-records-labelnight-celeste-2026-11-13"]],"na":["tickets"],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-11-13","s":"20:00","title":"Queertactics Festival Party","venue":"FLUCC Deck","coll":["Queertactics"],"lgbtq":1,"src":[["fl","https://flucc.at/events/H7HuvP-queertactics-festival-party/"]],"vok":1,"floors":[{"f":"","a":["TBA"]}],"note":{"de":"Party im Rahmen des Queertactics Festivals auf dem FLUCC Deck, Beginn 20:00. Die FLUCC-Seite nennt bisher weder Lineup noch Preis, Ende oder Flyer. Weitere Details sollen folgen.","en":"Party as part of the Queertactics Festival on the FLUCC Deck, starting 20:00. The FLUCC page does not yet list a lineup, price, end time or flyer. Further details are still to come."},"chk":"2026-11-02","na":["price","e","flyer","tickets"],"srcChk":"2026-11-02"},
{"d":"2026-11-13","s":"21:00","e":"02:00","title":"50 Herz / Sodomland","venue":"Kollektiv Kaorle","coll":["50 Herz"],"genres":["Electro","Industrial"],"floors":[{"f":"","a":["Sodomland","Kilroy","Gush Valley","Darina","Djinn Sylva","Xavior"]}],"price":"€15–20 (Soli €15 / Standard €18 / Supporter €20)","age":"18+","tickets":"https://shop.copilot.events/kaorle/events/ecc24459-e741-4ab7-9c18-851c22f5783c","note":{"de":"50 Herz feiert Freitag den 13. als „Doomsday“-Party mit lauter, basslastiger Elektronik im Kollektiv Kaorle am Otto-Wagner-Areal (Pavillon 21). Hauptact ist das Berliner Duo Sodomland. Kilroy eröffnet solo, danach folgen Gush Valley und Darina, außerdem präsentieren Darina & Djinn Sylva live ihre neue EP. Xavior spielt das Closing-Set. Beginn laut RA 20:00, laut Ticketshop der Location 21:00; Ende 02:00, Tickets 15–20 € (Soli/Standard/Supporter), ab 18.","en":"50 Herz marks Friday the 13th with a \"Doomsday\" party of loud, bass-heavy electronics at Kollektiv Kaorle on the Otto Wagner grounds (Pavilion 21). The main act is Berlin duo Sodomland. Kilroy opens solo, followed by Gush Valley and Darina, and Darina & Djinn Sylva premiere their new EP live. Xavior plays the closing set. Start is 20:00 per RA and 21:00 per the venue's ticket shop; ends 02:00, tickets €15–20 (solidarity/standard/supporter), 18+."},"src":[["ra","https://ra.co/events/2555979"],["ka","https://shop.copilot.events/kaorle/events/ecc24459-e741-4ab7-9c18-851c22f5783c"]],"vok":1,"head":["Sodomland"],"flyer":"https://images.ra.co/7e8053f2e7ac555f2bbd2875d19ed29851ceede6.jpg","chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","title":"Zuckerwatt w/ MIJA","venue":"Grelle Forelle","coll":["Zuckerwatt","Cybertribe"],"genres":["Hardgroove","House","Techno","Hardcore"],"floors":[{"f":"Mainfloor","a":["MIJA","PartyPauli","Who is Ela¿"]},{"f":"Kitchen (Cybertribe)","a":["DJ Backstage","ENJA","Spud Bencer","Voltmarie"]}],"tickets":"https://zuckerwatt.ticket.io/lrReXJvU/","note":{"de":"Zuckerwatt holt MIJA in die Grelle Forelle; die US-Künstlerin („Born to chill, forced to DJ“) ist eine vielseitige Multidisziplin-Artist und betreibt das DIY-Label Never B Alone, dessen Releases die Artists gemeinsam auswählen. Ihre EPs „Summer Groove“ und „Soft Groove“ verbinden Hardgroove mit House, Techno und Funk. Am Mainfloor spielen außerdem PartyPauli und Who is Ela¿. Die Kitchen wird von Cybertribe gehostet mit DJ Backstage, ENJA, Spud Bencer und Voltmarie. Einlass und Abendkassa ab 23:00, Vorverkauf über ticket.io.","en":"Zuckerwatt brings MIJA to Grelle Forelle; the US artist (\"Born to chill, forced to DJ\") is a versatile multidisciplinary artist who runs the DIY label Never B Alone, whose releases are chosen collectively by its artists. Her EPs \"Summer Groove\" and \"Soft Groove\" blend hardgroove with house, techno and funk. PartyPauli and Who is Ela¿ also play the main floor. The Kitchen is hosted by Cybertribe with DJ Backstage, ENJA, Spud Bencer and Voltmarie. Doors and box office from 23:00, presale via ticket.io."},"src":[["rg","https://www.regioactive.de/party/zuckerwatt-w-mija-grelle-forelle-wien-2026-11-13-By44sRL5ck"],["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/1311-zuckerwatt-w-mija/"]],"e":"06:00","vok":1,"flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/08/zuckerwatt_131126.jpg","head":["MIJA"],"na":["price"],"chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","title":"deep cut × Dark Pressure","venue":"FLUCC Wanne","coll":["deep cut","Dark Pressure"],"genres":["Hypnotic Techno","Deep Techno","Techno","Experimental"],"floors":[{"f":"Wanne","a":["23:00|Alex Maurer","00:45|Aura","02:15|Oxygeno","04:15|Melimeko"]}],"src":[["fl","https://flucc.at/events/PcWCsy-deep-cut/"],["ra","https://ra.co/events/2561302"],["fl","https://flucc.at/"],["ft","https://frey-tag.at/kalender/deep-cut?s=Rm19NuOSv"]],"e":"06:00","price":"15 € VVK / 18 € AK","tickets":"https://ra.co/events/2561302","vok":1,"age":"18+","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/13.11.2026_DeepCutDarkPressure_Wanne_MartinD.max-2560x1440.jpg","note":{"de":"deep cut und Dark Pressure präsentieren eine Nacht mit hypnotischem und deepem Techno in der FLUCC Wanne. Hauptgast ist Oxygeno aus Spanien, der rohe, emotionale Produktionen u. a. auf Mord, Axis, Semantica, Non Series und Soma veröffentlicht hat, das Label Lost Verses betreibt und international neben Jeff Mills, Oscar Mulero und Ø [Phase] spielte. Alex Maurer (Turbo) eröffnet um 23:00, um 00:45 feiert Aura Premiere, das dawless Live-Projekt von Dcascallana und pezel. Oxygeno spielt ab 02:15, Melimeko (RAW Session) schließt von 04:15 bis 06:00. Tickets 15 € im VVK, 18 € an der Abendkasse; Flyer-Artwork von Martin Daxinger. frey-tag.at führt das Event abweichend im Kramladen; flucc.at nennt die FLUCC Wanne.","en":"deep cut and Dark Pressure present a night of hypnotic and deep techno in the FLUCC Wanne. The main guest is Spain's Oxygeno, whose raw, emotional productions have appeared on Mord, Axis, Semantica, Non Series and Soma; he runs the label Lost Verses and has played internationally alongside Jeff Mills, Oscar Mulero and Ø [Phase]. Alex Maurer (Turbo) opens at 23:00, and at 00:45 Aura premieres, the dawless live project of Dcascallana and pezel. Oxygeno plays from 02:15, Melimeko (RAW Session) closes from 04:15 to 06:00. Tickets €15 presale, €18 at the door; flyer artwork by Martin Daxinger. frey-tag.at lists the event at Kramladen instead; flucc.at names FLUCC Wanne."},"chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","title":"Dystopia","venue":"Das Werk","coll":["Dystopia Rave"],"note":{"de":"Dystopia-Rave im Werk; Line-up noch nicht veröffentlicht.","en":"Dystopia rave at Das Werk; line-up not yet published."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}],"na":["price","e","flyer","tickets"],"chk":"2026-10-31"},
{"d":"2026-11-13","s":"23:00","e":"06:00","title":"Fatima Hajji","venue":"O der Klub","coll":["SIGNAL"],"genres":["Techno","Tribal Techno"],"floors":[{"f":"","a":["Fatima Hajji"]}],"price":"ab 12 €","tickets":"https://shop.o-klub.at/shop/registrations?event_id=bea6d6f5-42f5-44be-b50f-368093b3214a","flyer":"https://o-klub.at/wp-content/uploads/2026/09/Fatima_feed-web.jpg","note":{"de":"SIGNAL präsentiert die in Spanien geborene DJ Fatima Hajji mit arabischen Wurzeln, deren Sound kraftvolle Tribal-Grooves mit energiegeladenem modernem Techno verbindet. Sie legte mit 16 erstmals auf und spielte zu Spitzenzeiten über 120 Shows pro Jahr. Auftritte führten sie u. a. zu Awakenings, Verknipt, Monegros, Medusa und Time Warp Spain sowie in Clubs wie Tresor Berlin, Fabric London und Amnesia Ibiza. 2023 startete sie ihre Reihe „Fatima Hajji Invites“ mit einem ausverkauften All-Night-Long im Fabrik Madrid. Beginn 23:00, Tickets ab 12 €, Dresscode casual.","en":"SIGNAL presents Spanish-born DJ Fatima Hajji, of Arab heritage, whose sound fuses powerful tribal grooves with high-energy modern techno. She first played at 16 and at her peak played more than 120 shows a year. She has appeared at Awakenings, Verknipt, Monegros, Medusa and Time Warp Spain, and in clubs such as Tresor Berlin, Fabric London and Amnesia Ibiza. In 2023 she launched her series \"Fatima Hajji Invites\" with a sold-out all-night-long at Fabrik Madrid. Starts 23:00, tickets from €12, dress code casual."},"vok":1,"src":[["ok","https://o-klub.at/events/fatima-hajji/"],["ra","https://ra.co/events/2528245"]],"age":"18+","head":["Fatima Hajji"],"chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","title":"Rudebwoy Embassy meets Bassclub – 30 Years Jah Power Sound","venue":"The Loft","coll":["Bassclub","Rude Bwoy Embassy","Jah Power Sound"],"genres":["Drum & Bass","Dubstep","Grime","UK Bass","Breaks","Jungle","Reggae","Dancehall","Dub"],"floors":[{"f":"Oben (Bassclub)","a":["Pezo Fox b2b Mantis","Stoney Curtis b2b Zuzee","Scooby Duo"]},{"f":"Unten (Jah Power Sound / Rude Bwoy Embassy)","a":["Dicie Globie","Sparky Rugged","Astarr","Ijahson","Bandulu","Camel","DJ Smo","Baba Sound","Kings Crown Sound","Thr33lake","Jah Power Sound","Royal Marx Sound","G Spot Sound"]}],"price":"10 € bis 24:00, danach 15 € / Ladies free bis 24:00","flyer":"https://www.theloft.at/wp-content/uploads/2026/10/image00002-scaled.jpeg","note":{"de":"Rudebwoy Embassy und Bassclub feiern 30 Jahre Jah Power Sound und damit jamaikanische Soundsystem-Kultur in Österreich, mit 13 DJs und 6 Live-Acts auf zwei Floors. Oben übernimmt Bassclub mit Drum & Bass, Dubstep, Grime, UK Bass, Breaks, Jungle und HipHop: Pezo Fox b2b Mantis, Stoney Curtis b2b Zuzee, Scooby Duo und angekündigte Special Acts. Unten gehört die Bühne Jah Power Sound mit Reggae, Dancehall und Dub: live Dicie Globie, Sparky Rugged, Astarr, Ijahson, Bandulu und Camel. An den Decks unten stehen DJ Smo, Baba Sound, Kings Crown Sound, Thr33lake, Jah Power Sound, Royal Marx Sound und G Spot Sound. Beginn 23:00; 10 € bis Mitternacht, danach 15 €, Frauen bis Mitternacht gratis.","en":"Rudebwoy Embassy and Bassclub celebrate 30 years of Jah Power Sound and Jamaican sound-system culture in Austria, with 13 DJs and 6 live acts on two floors. Upstairs Bassclub plays drum & bass, dubstep, grime, UK bass, breaks, jungle and hip-hop: Pezo Fox b2b Mantis, Stoney Curtis b2b Zuzee, Scooby Duo and announced special acts. Downstairs belongs to Jah Power Sound with reggae, dancehall and dub: live acts Dicie Globie, Sparky Rugged, Astarr, Ijahson, Bandulu and Camel. On the decks downstairs are DJ Smo, Baba Sound, Kings Crown Sound, Thr33lake, Jah Power Sound, Royal Marx Sound and G Spot Sound. Starts 23:00; €10 until midnight, €15 after, ladies free until midnight."},"vok":1,"src":[["lo","https://www.theloft.at/rudebwoy-embassy-meets-bassclub-30-years-jah-power-sound/"]],"chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:00","e":"06:00","title":"HERZZZ","venue":"SASS Music Club","floors":[{"f":"","a":["Anni Herzer","Felix Rupprecht","Julani"]}],"vok":1,"price":"10–15 €","age":"18+","aw":1,"note":{"de":"HERZZZ im SASS Music Club (23:00–06:00 Uhr) mit Anni Herzer, Felix Rupprecht und Julani. Einen Beschreibungstext oder Set-Zeiten veröffentlicht der Club bisher nicht. Eintritt 10–15 € inkl. Welcome Drink, ab 18 mit Ausweiskontrolle; wie bei allen SASS-Events ist ein Awareness-Team vor Ort.","en":"HERZZZ at SASS Music Club (23:00–06:00) with Anni Herzer, Felix Rupprecht and Julani. The club has not yet published a description or set times. Entry €10–15 incl. welcome drink, 18+ with ID check; as at all SASS events an awareness team is present."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/herzzz-november"]],"na":["flyer","genres","tickets"],"chk":"2026-10-30","srcChk":"2026-10-30","coll":["HERZZZ"]},
{"d":"2026-11-13","s":"23:00","title":"TUFF vol. 2","venue":"Club Exil","coll":["TUFF"],"genres":["Bounce","Hardbounce"],"floors":[{"f":"","a":["Barbara Lago","KRL MX","NYRA","Pinklotion","Serafin"]}],"price":"Early Bird 11 €","tickets":"https://exil.ticket.io/nDYvo6wD/","note":{"de":"TUFF, nach eigener Beschreibung „Viennas bounce hub“, geht im Club Exil in die zweite Runde – Motto: „Hard. Fast. TUFF.“ Es spielen Barbara Lago, KRL MX, NYRA, Pinklotion und Serafin. Es gilt eine No-Photo-Policy.","en":"TUFF, self-described as Vienna's bounce hub, returns to Club Exil for its second edition under the motto 'Hard. Fast. TUFF.' Barbara Lago, KRL MX, NYRA, Pinklotion and Serafin play. A no-photo policy applies."},"nophoto":1,"vok":1,"na":["e","flyer","age"],"src":[["ex","https://club-exil.at/"],["exi","https://exil.ticket.io/nDYvo6wD/"]],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-13","s":"23:55","e":"05:00","title":"Drum & Bassick x Radiance","venue":"Club Lucia","coll":["Drum & Bassick","Radiance"],"genres":["Drum & Bass","Neurofunk","Liquid"],"floors":[{"f":"","a":["Dave & Bass b2b Cybercutz","Escapism","I-Jin","Synthesis","Vibrant"]}],"price":"10 € (AK)","flyer":"https://www.clublucia.at/wp-content/uploads/2026/10/Flyer_Lucia_11_2026_1_v009-scaled-e1792496286337.png","note":{"de":"Die Reihen Drum & Bassick und Radiance tun sich im Club Lucia zusammen, um das ganze Spektrum von Drum & Bass auf einen Floor zu bringen. Sechs lokale DJs decken alles von Neurofunk bis Liquid ab: Dave & Bass b2b Cybercutz, Escapism, I-Jin, Synthesis und Vibrant. Angekündigt ist außerdem ein B2B, das „no one’s ever done before“, Details verraten die Veranstalter nicht. Beginn 23:55, Ende 05:00, Eintritt 10 € an der Abendkasse.","en":"The Drum & Bassick and Radiance series join forces at Club Lucia to bring the whole spectrum of drum & bass to one floor. Six local DJs cover everything from neurofunk to liquid: Dave & Bass b2b Cybercutz, Escapism, I-Jin, Synthesis and Vibrant. A surprise b2b \"no one's ever done before\" is also announced, with no further details. Starts 23:55, ends 05:00, €10 at the door."},"vok":1,"src":[["cl","https://www.clublucia.at/event/drum-bassick-x-radiance/"]],"chk":"2026-10-30"},
{"d":"2026-11-13","s":"23:59","e":"07:59","title":"S.O.U.L. Utopia LVI – Wild Things","venue":"Secret Location","coll":["S.O.U.L."],"floors":[{"f":"","a":["TBA"]}],"sexpos":1,"tickets":"https://events.tickethead.io/en/tickethead/event/5834","note":{"de":"56. Ausgabe der sexpositiven Reihe S.O.U.L. Utopia unter dem Motto „Wild Things“: Laut Veranstalter eine Rückkehr zum Ursprünglichen, frei von auferlegten Normen, mit Fokus auf sinnliche, einvernehmliche Begegnungen, gemeinsames Tanzen und einer Sauna. Die genaue Adresse im 1. Bezirk steht erst auf dem Ticket. Dresscode verspielt, provokant oder kreativ passend zum Motto – etwa Lendenschurz, Feigenblatt, Blumenkranz oder (Kunst-)Fell. Von 23:59 bis 07:59; DJs, Preis und Mindestalter sind nicht angegeben.","en":"56th edition of the sex-positive S.O.U.L. Utopia series under the motto \"Wild Things\": according to the organisers a return to origins, free of imposed norms, focusing on sensual, consensual encounters, communal dancing and a sauna. The exact address in the 1st district is only printed on the ticket. Dress code playful, provocative or creative in line with the theme – e.g. loincloth, fig leaf, flower wreath or (faux) fur. From 23:59 to 07:59; DJs, price and minimum age are not given."},"src":[["sp","https://sexpositives.com/en/events/soul-utopia-wild-things-wien-2026-11-13/"],["th","https://events.tickethead.io/en/tickethead/event/5834"],["sp","https://sexpositives.com/en/wien/"]],"na":["price","flyer","lineup"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-14","s":"17:00","e":"06:00","title":"Once in a Blue Moon – Kiki Ball + Afterparty","venue":"Funkhaus","coll":["Kaisa Bodega","Pingpaya Fenty Savage"],"genres":["House","Ballroom"],"floors":[{"f":"","a":["Gawdesque","Amina Malounadou","Bellavie"]}],"age":"18+","tickets":"https://ra.co/events/2546333","src":[["ra","https://ra.co/events/2546333"]],"flyer":"https://images.ra.co/d202d6de45984699ab2ae40c9b678a7be40a87eb.png","note":{"de":"Kaisa Bodega und Pingpaya Fenty Savage präsentieren einen Kiki Ball mit anschließender Afterparty im Funkhaus. Angekündigt ist eine Ballroom-Nacht voller Glamour, Fantasie und Verwandlung, in der Gäste ihre seltensten Seiten zeigen sollen – etwas, das nur „once in a blue moon“ passiert. Genannt sind Gawdesque, Amina Malounadou und Bellavie; Kategorien, Hosts, Judges und Ablauf stehen noch nicht fest. Beginn 17:00, Ende 06:00, ab 18.","en":"Kaisa Bodega and Pingpaya Fenty Savage present a kiki ball followed by an afterparty at Funkhaus. It is billed as a ballroom night of glamour, fantasy and transformation where guests show their rarest sides, something that happens only once in a blue moon. Gawdesque, Amina Malounadou and Bellavie are listed; categories, hosts, judges and running order are not yet published. Starts 17:00, ends 06:00, 18+."},"chk":"2026-10-30","na":["price"]},
{"age":"18+","d":"2026-11-14","s":"19:00","title":"NTO live","venue":"O der Klub","genres":["Techno","Melodic Techno"],"floors":[{"f":"","a":["NTO"]}],"tickets":"https://wype.ticketlodge.de/14112026-NTOliveVienna/","src":[["ci","https://cityineurope.com/event/cmugr7bxv0036d8dvhfgizmtd"],["ok","https://o-klub.at/events/nto-live-in-concert/"],["ra","https://ra.co/events/2423044"]],"vok":1,"price":"ab 25 €","flyer":"https://o-klub.at/wp-content/uploads/2026/07/NTO_Tour_2026_Wien_14112026_PostingForADs_1080x1350px.jpg","e":"23:00","note":{"de":"Der französische Produzent NTO macht mit seiner neuen Live-Tour Station im O der Klub. Er spielt melodischen Techno mit emotionaler Tiefe, darunter neue, unveröffentlichte Tracks seines kommenden Albums. Die Show ist als Mischung aus Konzert und Club mit treibenden Beats und filmischen Klangflächen angelegt. Beginn 19:00, Tickets ab 25 € über ticketlodge; Support und Set-Zeiten sind nicht genannt.","en":"French producer NTO brings his new live tour to O der Klub. He plays melodic techno with emotional depth, including new unreleased tracks from his upcoming album. The show is pitched as a mix of concert and club night with driving beats and cinematic soundscapes. Starts 19:00, tickets from €25 via ticketlodge; support acts and set times are not announced."},"head":["NTO"],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"19:30","e":"23:30","title":"HEAVY LISTENING with Kobermann, MPU101 & Electric Indigo","venue":"Westbahn Studios","coll":["VLAN"],"genres":["Experimental","Dub Techno","Ambient"],"floors":[{"f":"","a":["20:00|Kobermann","21:00|MPU101","22:00|Electric Indigo"]}],"price":"15 €","age":"18+","note":{"de":"Dritte Ausgabe von HEAVY LISTENING, präsentiert von VLAN: eine Reihe, die Ambient, New Age, Dub, Downtempo, Tribal und experimentelle Elektronik als Gegenpol zu schnellen Rhythmen und Kurzvideo-Kultur ins Zentrum stellt. Kobermann (Johannes Piller, Wien), seit 2014 zwischen Lo-fi, Post-Punk und Dub aktiv und Betreiber von A.T.C. Records, eröffnet um 20:00 mit einem DJ-Set. Um 21:00 spielt MPU101 live, eng mit dem Münchner Label Ilian Tape verbunden und zuletzt mit Field Recordings aus abgelegenen Gegenden der USA beschäftigt. Ab 22:00 folgt Electric Indigo (Susanne Kirchmayr, Wien) live, seit 1989 international aktiv, Gründerin des Netzwerks female:pressure und Trägerin des Österreichischen Kunstpreises für Musik 2020. Einlass 19:30, Ende 23:30, 15 €, ab 18; Ort Westbahn Studios (genaue Adresse TBA), unterstützt von Stadt Wien/MA 7.","en":"Third edition of HEAVY LISTENING, presented by VLAN: a series that puts ambient, new age, dub, downtempo, tribal and experimental electronics at the centre as a counterweight to fast rhythms and short-video culture. Kobermann (Johannes Piller, Vienna), active since 2014 between lo-fi, post-punk and dub and running A.T.C. Records, opens with a DJ set at 20:00. At 21:00 MPU101 plays live, closely tied to Munich label Ilian Tape and lately working with field recordings from remote parts of the USA. From 22:00 Electric Indigo (Susanne Kirchmayr, Vienna) performs live, internationally active since 1989, founder of the female:pressure network and recipient of Austria's Art Prize for Music in 2020. Doors 19:30, ends 23:30, €15, 18+; venue Westbahn Studios (exact address TBA), supported by the City of Vienna/MA 7."},"src":[["ra","https://ra.co/events/2568237"]],"flyer":"https://images.ra.co/e3eba3bc39742ae417a9d1b8864d0251523fd505.jpg","chk":"2026-10-30"},
{"d":"2026-11-14","s":"20:00","e":"04:00","title":"STRICT! The Dark Circus","venue":"Libelle","coll":["STRICT!"],"sexpos":1,"src":[["sp","https://sexpositives.com/en/events/strict-dark-circus-wien-2026-11-14/"],["li","https://www.libelle.at/events/dark-circus-hosted-by-strict-3/"]],"nophoto":1,"aw":1,"note":{"de":"STRICT! lädt zur Play-Party „The Dark Circus“ in die Libelle; ausdrücklich keine Tanzparty oder Rave, sondern ein Abend mit Ringmasters, Dompteur*innen, Freaks, Dark Clowns, Akrobat*innen und Burlesque-Performances. Teilnahme nur mit Voranmeldung per E-Mail an submit@strict.events (Name laut Ausweis, Alter, Geschlechtsidentität, Bestätigung des Verhaltenskodex, Safeword und kurzes Motivationsschreiben), Eintritt 30 €, ab 21. Dresscode Fetisch/Theaterkostüm (Latex, Leder, Korsagen, Samt u. Ä.); keine Streetwear, Anzüge oder bloße Nacktheit, Straßenschuhe bleiben am Eingang, saubere Innenschuhe mitbringen. Es gelten Konsens, Drogenverbot und Safer-Sex-Regeln, ein Safeguarding-Team ist da, das Safeword „Elephant“ alarmiert sofort das Personal. Fotos, Filmen und Smart Glasses sind verboten, Handys nur im Eingangsbereich; Einlass 20–23 Uhr, Ende 04:00.","en":"STRICT! hosts the play party \"The Dark Circus\" at Libelle; explicitly not a dance party or rave, but a night with ringmasters, animal tamers, freaks, dark clowns, acrobats and burlesque performances. Entry only with prior registration by email to submit@strict.events (name as on ID, age, gender identity, confirmation of the code of conduct, safeword and a short motivation letter), €30, 21+. Dress code fetish/theatrical (latex, leather, corsets, velvet etc.); no streetwear, suits or plain nudity, street shoes stay at the entrance, bring clean indoor shoes. Consent, a no-drugs policy and safer-sex rules apply, a safeguarding team is present and the safeword \"Elephant\" alerts staff immediately. Photos, filming and smart glasses are banned, phones only in the entrance hall; admission 20:00–23:00, ends 04:00."},"price":"€30","age":"21+","vok":1,"flyer":"https://www.libelle.at/wp-content/uploads/2026/04/DC-Web-1-e1790883481870.jpg","na":["lineup","tickets"],"chk":"2026-11-02"},
{"d":"2026-11-14","s":"22:00","title":"RAVE ON XXL 4.0","venue":"Club Exil","coll":["Rave On Vienna"],"floors":[{"f":"","a":["Dune","Neophyte","Maissouille","Radze","Toge","Miss Pixie aka Tekniker","Genetek","Apocalypz","The Rave Bear","Klaut-G","Veneno","SYC","Gingertek","Auditore","Brandix","Se.Vero","Gosh","Fullip","Poison","Para2P3ctrum","Louisa India","Kandy","MATIVIO"]}],"head":["Dune","Neophyte"],"price":"34,90 € (Final Phase; günstigere Stufen ausverkauft)","tickets":"https://sunmoon.ticket.io/ObeGEC9z/","note":{"de":"Die vierte XXL-Ausgabe der Reihe Rave On, veranstaltet von Sun & Moon Event, belegt den Club Exil mit einem großen Line-up aus rund zwei Dutzend Acts, darunter Dune und Neophyte sowie u. a. Miss Pixie aka Tekniker, Apocalypz, Veneno und Mativio. Einlass ab 22:00. Alle günstigeren Ticketstufen sind bereits ausverkauft.","en":"The fourth XXL edition of the Rave On series, run by Sun & Moon Event, takes over Club Exil with a line-up of around two dozen acts, including Dune and Neophyte plus Miss Pixie aka Tekniker, Apocalypz, Veneno and Mativio among others. Doors at 22:00. All cheaper ticket tiers are already sold out."},"vok":1,"ook":1,"na":["e","flyer","genres","age"],"src":[["ex","https://club-exil.at/"],["smt","https://sunmoon.ticket.io/ObeGEC9z/"]],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-14","s":"22:00","e":"04:00","title":"AWSM. Leopoldi Afterparty","venue":"Stiftskeller Klosterneuburg","coll":["AWSM"],"genres":["Afro House"],"floors":[{"f":"","a":["TBA"]}],"price":"10–15 €","tickets":"https://events.tickethead.io/en/tickethead/event/5564","flyer":"https://images.ra.co/def9cac77d73718575cab899428fa111732e4d52.jpg","note":{"de":"Afterparty zum Leopoldi-Kirtag in Klosterneuburg: AWSM übernimmt den Stiftskeller unter dem Stiftsrestaurant Leopold – ein Gewölbekeller mit hohen Decken und Ziegelwänden – für eine Afro-House-Nacht. Das Lineup ist noch nicht bekannt. 22:00–04:00, Tickets 10 € bzw. 15 € ausschließlich über Tickethead, Mindestalter laut RA 19 Jahre.","en":"Afterparty for the Leopoldi fair in Klosterneuburg: AWSM takes over the Stiftskeller beneath Stiftsrestaurant Leopold – a vaulted cellar with high ceilings and brick walls – for an Afro house night. The lineup has not been announced. 22:00–04:00, tickets €10 or €15 exclusively via Tickethead, minimum age 19 according to RA."},"src":[["ra","https://ra.co/events/2547042"],["ta","https://www.technoairlines.com/event/awsm-leopoldi-afterparty-stiftskeller-klosterneuburg-2026-11-14"]],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-11-14","s":"22:00","e":"06:00","title":"Ausländer HAUS! Vol. 22","venue":"Celeste","coll":["Ausländer Haus"],"floors":[{"f":"","a":["DJ Scarf","Djane Stone","DJ Zidi","Lucy Bakanal"]}],"vok":1,"note":{"de":"Die Reihe Ausländer HAUS! geht im Celeste in die 22. Runde, von 22:00 bis 06:00. Laut Celeste-Programm legen DJ Scarf, Djane Stone, DJ Zidi und Lucy Bakanal auf. Frühere Ausgaben fanden im Celeste und im FLUCC statt. Preis, Genres und Flyer nennt das Celeste nicht.","en":"The Ausländer HAUS! series reaches its 22nd edition at Celeste, 22:00 to 06:00. According to Celeste's programme, DJ Scarf, Djane Stone, DJ Zidi and Lucy Bakanal play. Earlier editions took place at Celeste and FLUCC. Celeste lists no price, genres or flyer."},"src":[["ce","https://celeste.co.at/"]],"na":["price","tickets","flyer","genres"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-14","title":"Herzfrequenz: Herzi F2F Edition","venue":"Das Werk","coll":["Herzfrequenz"],"floors":[{"f":"","a":["Joey"]}],"src":[["ev","https://events.at/event/herzfrequenz-herzi-f2f-edition"],["dw","https://www.daswerk.org/program"],["ot","https://www.oeticket.com/noapp/eventseries/herzfrequenz-herzi-f2f-edition-4269996/"]],"s":"23:00","tickets":"https://www.oeticket.com/noapp/eventseries/herzfrequenz-herzi-f2f-edition-4269996/","note":{"de":"Herzfrequenz lädt zur „Herzi F2F Edition“ ins Werk. events.at nennt ein Lineup, Preise oder eine Erklärung von „F2F“ bisher nicht; Tickets gibt es über oeticket. Datum laut events.at und oeticket 14.11. (RA nannte zuvor 13.11.); events.at gibt 23:00–01:00 an, was für eine Clubnacht im Werk ungewöhnlich kurz ist.","en":"Herzfrequenz hosts its \"Herzi F2F Edition\" at Das Werk. events.at does not yet list a lineup, prices or what \"F2F\" stands for; tickets are sold via oeticket. Date per events.at and oeticket is 14 Nov (RA previously said 13 Nov); events.at gives 23:00–01:00, which is unusually short for a club night at Das Werk."},"vok":1,"chk":"2026-10-30","price":"ab 18,50 € (oeticket, inkl. Gebühr)"},
{"d":"2026-11-14","s":"23:00","e":"06:00","title":"Paradies Garten w/ Paraçek","venue":"Grelle Forelle","coll":["Paradies Garten"],"price":"ab 19 €","floors":[{"f":"Mainfloor","a":["Paraçek","MARØ","Vivienna"]},{"f":"Kitchen","a":["Felix Rupprecht","Mariephi","Manuel Correa b2b Sora"]}],"src":[["rg","https://www.regioactive.de/party/paradies-garten-w-paracek-grelle-forelle-wien-2026-11-14-JVJJnmCzgx"],["ft","https://frey-tag.at/kalender/paradies-garten?s=T6P9XH1YS"],["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/1411-paradies-garten-w-paracek/"],["ra","https://ra.co/events/2556704"]],"genres":["Bounce","Hard Dance","Trance","Acid","House"],"vok":1,"tickets":"https://shop.paylogic.com/59cda0d6cec840928ec3ce1afa3e8b22/","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/paradiesgarten_141126_web.jpg","note":{"de":"Paradies Garten kehrt nach dem Sommer in die Grelle Forelle zurück, mit einem durchgehend energiegeladenen Lineup. Headliner Paraçek aus Deutschland kommt aus der Free-Rave-Szene von Leipzig und Dresden und verbindet schnellen Hard Dance mit 90er-Trance und Acid-Rave, eingängigen Vocals, euphorischen Synths und kräftigen Basslines. Am Mainfloor spielen außerdem MARØ und Vivienna. In der Kitchen legen Felix Rupprecht, Mariephi sowie Manuel Correa b2b Sora auf. Einlass und Abendkassa ab 23:00, Vorverkauf über Paylogic; RA nennt 18+, Hausregel der Location ist 21+.","en":"Paradies Garten returns to Grelle Forelle after the summer with a high-energy lineup from start to finish. Headliner Paraçek from Germany comes out of the Leipzig and Dresden free-rave scene and blends fast hard dance with 90s trance and acid rave, catchy vocals, euphoric synths and heavy basslines. MARØ and Vivienna also play the main floor. In the Kitchen, Felix Rupprecht, Mariephi and Manuel Correa b2b Sora are on the decks. Doors and box office from 23:00, presale via Paylogic; RA says 18+, the venue's house rule is 21+."},"head":["Paraçek"],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"23:00","title":"Fifi x Schrödinger's Groove","venue":"FLUCC Wanne","coll":["Fifi","Schrödingers Groove"],"note":{"de":"Gemeinsame Clubnacht der Kollektive Fifi und Schrödinger's Groove in der FLUCC Wanne, Beginn 23:00. Die FLUCC-Seite nennt bisher weder Lineup noch Preis, Ende oder Flyer. Details sollen noch folgen.","en":"Joint club night by the collectives Fifi and Schrödinger's Groove in the FLUCC Wanne, starting 23:00. The FLUCC page does not yet list a lineup, price, end time or flyer. Details are still to come."},"vok":1,"src":[["fl","https://flucc.at/events/X3Fef2-fifi-x-schrodinger-s-groove/"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-11-02","na":["price","e","flyer","tickets"],"srcChk":"2026-11-02"},
{"d":"2026-11-14","s":"23:00","title":"The Hive","venue":"Flex","coll":["The Hive"],"note":{"de":"Neue Ausgabe der Drum-&-Bass-Reihe The Hive, gemeinsam veranstaltet von The Hive und Collapse im Flex. Ganz oben auf dem Lineup steht Ed Rush aus Großbritannien, dazu Waeys aus den Niederlanden und Wingz aus Österreich. Lokal ergänzen Inaya, Scapula & Weazl, Sinis b2b Mayez und 5HA5H. Einlass 23:00, ab 16; VVK über Tickethead (Early Bird 14 €, Phase 1 18 €, Phase 2 21 €), Abendkasse noch offen. Set-Zeiten und Ende nennt der Club nicht.","en":"New edition of the drum & bass series The Hive, co-hosted by The Hive and Collapse at Flex. Top of the bill is Ed Rush from the UK, joined by Waeys from the Netherlands and Wingz from Austria. Local support comes from Inaya, Scapula & Weazl, Sinis b2b Mayez and 5HA5H. Doors 23:00, 16+; presale via Tickethead (early bird €14, phase 1 €18, phase 2 €21), door price TBA. The club gives no set times or end time."},"vok":1,"src":[["fx","https://flex.at/"],["fx","https://flex.at/event/the-hive/"],["th","https://events.tickethead.io/de/tickethead/event/5864"]],"floors":[{"f":"","a":["Ed Rush","Waeys","Wingz","Inaya","Scapula & Weazl","Sinis b2b Mayez","5HA5H"]}],"genres":["Drum & Bass"],"head":["Ed Rush"],"price":"Early Bird 14 € / Phase 1 18 € / Phase 2 21 € (VVK), AK TBA","age":"16+","tickets":"https://events.tickethead.io/de/tickethead/event/5864","flyer":"https://flex.at/wp-content/uploads/2026/10/855693998_1776915100526113_1273349458521656650_n.jpg","na":["e"],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"23:00","e":"06:00","title":"Radio Rudina","venue":"PRST","coll":["Radio Rudina"],"genres":["House"],"floors":[{"f":"","a":["Andre Zimmer","Anni Herzer","Valentin Zelz"]}],"price":"13–14 € (Early Bird 13 €)","age":"20+","src":[["ra","https://ra.co/events/2564050"],["rr","https://radiorudina.ticket.io/sbEA0Me0/"],["rr","https://www.radiorudina.com"]],"tickets":"https://radiorudina.ticket.io/sbEA0Me0/","note":{"de":"Radio Rudina lädt in den PRST in der Praterstraße; laut radiorudina.com unter dem Motto „Radio Rudina invites Fiesta Frizzante“. Es spielen Andre Zimmer, Anni Herzer und Valentin Zelz (auf radiorudina.com „Valentin Zell“), RA taggt das Event als House. Beginn 23:00, Ende 06:00. Early-Bird-Tickets 13 € über ticket.io, RA nennt 14 €. RA gibt als Mindestalter 20+ an.","en":"Radio Rudina hosts a night at PRST on Praterstraße; per radiorudina.com it runs as \"Radio Rudina invites Fiesta Frizzante\". Andre Zimmer, Anni Herzer and Valentin Zelz (\"Valentin Zell\" on radiorudina.com) play, and RA tags the event as house. Starts 23:00, ends 06:00. Early-bird tickets €13 via ticket.io, RA lists €14. RA gives a minimum age of 20+."},"flyer":"https://images.ra.co/508efb6bbbbd164af042e032973d7cdc0ef9719f.jpg","chk":"2026-10-30"},
{"d":"2026-11-14","s":"23:00","e":"05:00","title":"Club Pompadour","venue":"SASS Music Club","floors":[{"f":"","a":["Veronika Amie","Paul Panther","Philipp Blecha"]}],"vok":1,"coll":["Club Pompadour"],"price":"10–15 €","age":"18+","aw":1,"note":{"de":"Club Pompadour im SASS Music Club (23:00–05:00 Uhr) mit Veronika Amie, Paul Panther und Philipp Blecha. Einen Beschreibungstext oder Set-Zeiten veröffentlicht der Club bisher nicht. Eintritt 10–15 € inkl. Welcome Drink, ab 18 mit Ausweiskontrolle; wie bei allen SASS-Events ist ein Awareness-Team vor Ort.","en":"Club Pompadour at SASS Music Club (23:00–05:00) with Veronika Amie, Paul Panther and Philipp Blecha. The club has not yet published a description or set times. Entry €10–15 incl. welcome drink, 18+ with ID check; as at all SASS events an awareness team is present."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/club-pompadour-november"]],"na":["flyer","genres","tickets"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-11-14","s":"23:00","e":"06:00","title":"VOYAGE with Carl H","venue":"PRST","genres":["House"],"floors":[{"f":"","a":["Carl H","Randalia"]}],"head":["Carl H"],"price":"17,61 €","age":"21+","flyer":"https://images.ra.co/57a6ddfb510e8033ba88f74c528404e102420d43.jpg","note":{"de":"Zweite Ausgabe von VOYAGE im PRST: eine Nacht mit ungewöhnlichen, psychedelischen Raritäten und progressiven Rhythmen. Headliner ist Carl H (Acid Operators), Labelchef von Animals on Psychedelics, der in Europa, Asien und Amerika aufgelegt hat; dazu spielt Randalia (Clem Vital). Erwartet werden progressive Kuriositäten, trance-inspirierte Fundstücke und genreübergreifende Dancefloor-Musik. RA taggt House. Beginn 23:00, Ende 06:00, 17,61 € (Tickets über Eventfrog), ab 21.","en":"Second edition of VOYAGE at PRST: a night of unusual psychedelic obscurities and progressive rhythms. Headliner is Carl H (Acid Operators), head of the Animals on Psychedelics label, who has played across Europe, Asia and the Americas; Randalia (Clem Vital) joins him. Expect progressive oddities, trance-inspired artefacts and genre-defying dancefloor music. RA tags it house. Starts 23:00, ends 06:00, €17.61 (tickets via Eventfrog), 21+."},"src":[["ra","https://ra.co/events/2573469"],["ta","https://www.technoairlines.com/event/voyage-with-carl-h-prst-2026-11-14"]],"na":["tickets"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-14","s":"23:30","e":"04:00","title":"Raqsouna invites Gaouta","venue":"Club Lucia","coll":["Raqsouna"],"floors":[{"f":"","a":["Gaouta","Qamareen","Abu Naima"]}],"head":["Gaouta"],"price":"10–15 € / Community-Ticket auf Anfrage","flyer":"https://images.ra.co/59190d1c480a7d942443d734aba112e8e240b98e.jpg","note":{"de":"Letzte Raqsouna-Ausgabe des Jahres im Club Lucia, unterstützt von Stadt Wien Kultur (MA7). Live spielt Gaouta, ein marokkanischer Musiker an Drums, Gitarre, Synths und Gesang, der Post-Punk, New Wave und 80er-Sounds mit Darija verbindet. Dazu legen die Residents auf: Qamareen (auch Luna Al-Mousli) mit SWANA-Pop, Indie und Elektronik sowie Abu Naima, der von Hip-Hop-Wurzeln und arabischer Musik der 1970er bis zu aktueller basslastiger Clubmusik spielt.","en":"Raqsouna's final edition of the year at Club Lucia, supported by Stadt Wien Kultur (MA7). Gaouta plays live – a Moroccan musician on drums, guitar, synths and vocals who blends post-punk, new wave and '80s sounds with Darija. Residents Qamareen (also Luna Al-Mousli), playing SWANA pop, indie and electronic music, and Abu Naima, ranging from hip-hop roots and 1970s Arabic music to current bassy club music, complete the night."},"src":[["ta","https://www.technoairlines.com/club/club-lucia-vienna"],["ta","https://www.technoairlines.com/event/raqsouna-invites-gaouta-club-lucia-2026-11-14"],["ra","https://ra.co/events/2561086"]],"na":["genres","age","tickets"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-14","s":"23:59","title":"Hot'n'Wet","venue":"FLUCC Deck","src":[["fl","https://flucc.at/events/WGVN6r-hotnwet/"],["ra","https://ra.co/events/2561330"]],"vok":1,"e":"06:00","coll":["MEIOSISS"],"genres":["Techno"],"floors":[{"f":"","a":["Jules Foe","Lila Gold","MEIOSISS"]}],"price":"10 €","age":"18+","note":{"de":"MEIOSISS veranstaltet am FLUCC Deck die sechste Ausgabe ihrer Flirt-Party, auf RA als „Hot & Flirty #6“ gelistet: Flirten soll statt per Dating-App wieder im echten Leben auf der Tanzfläche passieren. Markenzeichen sind Flirt-Armbänder, die anderen zeigen, worauf man Lust hat. Persönliche Grenzen und Einvernehmlichkeit sind Grundvoraussetzung („only YES means YES“). Es spielen Lila Gold, MEIOSISS und Jules Foe als Special Guest, RA taggt Techno. Beginn 23:59 (RA-Beschreibung: 00:00), Ende 06:00, 10 € für die ganze Nacht, ab 18.","en":"MEIOSISS hosts the sixth edition of its flirt party on the FLUCC Deck, listed on RA as \"Hot & Flirty #6\": flirting is meant to move off dating apps and back onto the dance floor. Its trademark is flirt wristbands that show others what you are up for. Personal boundaries and consent are a basic requirement (\"only YES means YES\"). Lila Gold, MEIOSISS and special guest Jules Foe play, RA tags it techno. Starts 23:59 (RA description says 00:00), ends 06:00, €10 for the whole night, 18+."},"aw":1,"head":["Jules Foe"],"flyer":"https://images.ra.co/df7ab4b63e3763d3a35fe9cf775fc3fdb452ce63.jpg","na":["tickets"],"chk":"2026-10-30"},
{"d":"2026-11-14","s":"23:59","title":"Derisch","venue":"Kramladen","coll":["Derisch"],"floors":[{"f":"","a":["HÄNSCH","AUGEN ZU b2b MØCK"]}],"flyer":"https://images.ra.co/f90a235c90adb0d6a90c51a9c12f2ed50403f2b0.png","note":{"de":"Die Crew Derisch will den grauen November erträglicher machen und kehrt laut Beschreibungstext in den Kramladen zurück – das RA-Venue-Feld nennt allerdings das Tagada, die Location ist also nicht eindeutig. Erstmals bei Derisch dabei sind HÄNSCH sowie AUGEN ZU, die back-to-back mit MØCK spielen; im RA-Lineup steht zusätzlich „KORKI“, ob als eigener Act, bleibt offen. Beginn um Mitternacht (RA: 23:59) bis Open End, Eintritt nur an der Tür, Preis nicht angegeben.","en":"The Derisch crew wants to make grey November more bearable and, according to the description, returns to Kramladen – RA's venue field, however, says Tagada, so the location is not entirely clear. Making their Derisch debut are HÄNSCH and AUGEN ZU, who play back-to-back with MØCK; the RA lineup also lists 'KORKI', unclear whether as a separate act. Starts at midnight (RA: 23:59) until open end, entry at the door only, price not stated."},"src":[["ra","https://ra.co/events/2563496"],["ta","https://www.technoairlines.com/event/derisch-tagada-2026-11-14"]],"na":["price","tickets","e","genres"],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-11-15","s":"06:00","e":"11:00","title":"Redivider","venue":"SASS Music Club","floors":[{"f":"","a":["Redivider"]}],"vok":1,"note":{"de":"Sonntags-Afterhour im SASS Music Club von 6 bis 11 Uhr mit Redivider (@redivideredivider). Weitere Details nennt der Club noch nicht. Der Eintritt beträgt 15 €. Alle SASS-Veranstaltungen werden von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Sunday-morning afterhour at SASS Music Club from 6 to 11 am with Redivider (@redivideredivider). The club has not announced further details yet. Entry is 15 €. All SASS events are accompanied by an awareness team; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/Redivider-173"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/Redivider-173","srcChk":"2026-10-30","price":"15 €","age":"18+","chk":"2026-10-31"},
{"d":"2026-11-15","s":"14:00","title":"FLUT x Callshop Radio – Week 46","venue":"FLUCC Deck","coll":["Callshop Radio"],"note":{"de":"FLUT ist die Radioschiene des FLUCC in Kooperation mit Callshop Radio, das auch in Düsseldorf, Leipzig und Paris sendet; die Session wird über Stream 2 auf callshopradio.com übertragen. Week 46 kuratieren Spumante Records aus Wien, das Lineup ist noch offen. Während des Streams hat die Deck Bar geöffnet, Gäste können den Sonntagnachmittag mit Live-DJs verbringen. Von 14:00 bis 20:00, Eintritt frei.","en":"FLUT is FLUCC's radio strand in cooperation with Callshop Radio, which also broadcasts from Düsseldorf, Leipzig and Paris; the session streams on Stream 2 at callshopradio.com. Week 46 is curated by Vienna's Spumante Records, lineup still TBA. The Deck bar is open during the stream, so guests can spend Sunday afternoon with live DJs. From 14:00 to 20:00, free entry."},"vok":1,"src":[["fl","https://flucc.at/events/fwStcm-flut-x-callshop-radio-week-46-26/"]],"floors":[{"f":"","a":["TBA"]}],"e":"20:00","price":"Eintritt frei","chk":"2026-11-02"},
{"d":"2026-11-18","s":"23:00","title":"Rave am Mittwoch","venue":"Das Werk","coll":["Rave am Mittwoch"],"note":{"de":"Der wöchentliche Rave am Mittwoch (RAM) im Werk unter dem Motto „Recharge Wednesdays“ – laut Veranstalter jede Woche harte Beats und lange Nächte. Beginn 23 Uhr; der Eintritt erfolgt in den bisherigen Ausgaben gegen freiwillige Spende, ein Dresscode existiert nicht. Ein Awareness-Team ist vor Ort. Das Line-up dieser Ausgabe ist noch nicht veröffentlicht.","en":"The weekly Rave am Mittwoch (RAM) at Das Werk under the motto 'Recharge Wednesdays' – heavy beats and long nights every week, according to the organisers. Starts at 23:00; previous editions had free entry with a voluntary donation and no dress code. An awareness team is present. The line-up for this edition has not been published yet."},"vok":1,"src":[["dw","https://www.daswerk.org/program"]],"floors":[{"f":"","a":["TBA"]}],"na":["price","e","flyer","tickets"],"chk":"2026-10-31"},
{"d":"2026-11-19","s":"20:00","e":"23:00","title":"HEAVY LISTENING with Tanja Turner, Mert Seger & Heap","venue":"Coco Bar","coll":["VLAN"],"genres":["Experimental","Dub Techno"],"floors":[{"f":"","a":["Tanja Turner","Mert Seger","Heap"]}],"price":"15 €","age":"18+","flyer":"https://images.ra.co/526dde82d049f1523f842e8521b66ac685c44172.jpg","note":{"de":"Weitere Ausgabe der Listening-Reihe HEAVY LISTENING (VLAN), diesmal in der Coco Bar in den Gürtelbögen. Tanja Turner, Wiener DJ und Kuratorin, spielt Sets zwischen introspektiv-düster und verspielt-energetisch. Mert Seger stellt das neue Album eines Produzenten aus Lyon vor: trüber, verschobener Industrial-Dub mit schwerem Bass und dunstigen Texturen. Heap aus Neubau steht für rohe, kantige, abstrakte Elektronik für den Dancefloor. RA taggt Experimental und Dub Techno; 20:00–23:00, 15 €, ab 18, gefördert von der Stadt Wien (MA 7).","en":"Another edition of the listening series HEAVY LISTENING (VLAN), this time at Coco Bar in the Gürtel arches. Tanja Turner, a Vienna-based DJ and curator, plays sets ranging from introspective and moody to playful and energetic. Mert Seger presents a new album by a Lyon-based producer: murky, offbeat industrial dub with heavy bass and hazy textures. Heap from Neubau stands for raw, rugged, abstract electronics for the dancefloor. RA tags experimental and dub techno; 20:00–23:00, €15, 18+, supported by the City of Vienna (MA 7)."},"src":[["ra","https://ra.co/events/2573316"],["ta","https://www.technoairlines.com/event/heavy-listening-with-tanja-turner-mert-seger-heap-coco-bar-vienna-2026-11-19"]],"na":["tickets"],"chk":"2026-11-02","srcChk":"2026-11-02"},
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
{"d":"2026-11-20","s":"23:00","e":"06:00","title":"Fish Market w/ Altinbas, Annika Stein, Gerald VDH","venue":"Grelle Forelle","coll":["Fish Market","Luv Affair"],"genres":["Techno"],"floors":[{"f":"Mainfloor","a":["Altinbas","Annika Stein","Gerald VDH"]},{"f":"Kitchen (hosted by LuvAffair)","a":["Lim Banda","Sabina","Ernst"]}],"head":["Altinbas"],"price":"20–25 €","tickets":"https://shop.eventjet.at/de/df7305d0-298a-4a10-935a-24b53aa7ece0/event/aa07fd51-263a-4c5b-a49e-ad991053dfce","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/fishmarket_201126.jpg","nophoto":1,"vok":1,"note":{"de":"Fish Market feiert in der Grelle Forelle fünf Jahre Annika Stein als Resident der Reihe MEAT MARKET – mit einem ihrer Closing-Sets. Headliner ist Ahmet Altinbas, türkisch-belgischer Artist, Resident und Label-Kurator im Brüsseler Club Fuse und eines der prägenden Talente im modernen Techno; dazu spielt Gerald VDH auf dem Mainfloor. Die Kitchen hostet LuvAffair mit Lim Banda, Sabina und Ernst. Einlass ab 23:00; Vorverkauf über Eventjet: VVK regulär 20 € (mit Newsletter) bzw. 22 €, Last Minute 25 € (ein Super Early Bird um 14 € ist gelistet), Abendkassa ab 23:00. Strikte Hausregeln gegen Homophobie, Rassismus und Sexismus; Foto- und Videoverbot, die Handykameras werden am Eingang abgeklebt.","en":"Fish Market celebrates five years of Annika Stein as resident of the MEAT MARKET series at Grelle Forelle – with one of her closing sets. The headliner is Ahmet Altinbas, a Turkish-Belgian artist, resident and label curator at Brussels club Fuse and one of the defining talents in modern techno; Gerald VDH also plays the main floor. LuvAffair hosts the Kitchen with Lim Banda, Sabina and Ernst. Doors 23:00; presale via Eventjet: regular €20 (with newsletter) or €22, last minute €25 (a super early bird at €14 is listed), box office from 23:00. Strict house rules against homophobia, racism and sexism; no photos or videos, phone cameras are taped at the entrance."},"src":[["gf","https://www.grelleforelle.com/project/2011-fish-market-feat-altinbas-annika-stein-gerald-vdh-luvaffair-floor/"],["gf","https://www.grelleforelle.com/programm/"],["ej","https://shop.eventjet.at/de/df7305d0-298a-4a10-935a-24b53aa7ece0/event/aa07fd51-263a-4c5b-a49e-ad991053dfce"],["ta","https://www.technoairlines.com/event/fish-market-altinbas-grelle-forelle-2026-11-20"]],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-11-20","s":"23:59","e":"06:00","title":"GLITCH Vienna 001","venue":"Rhiz","coll":["GLITCH"],"genres":["House"],"floors":[{"f":"","a":["KΛSKIN","TenFifty"]}],"tickets":"https://www.enter-glitch.com/events/glitch-vienna-001","note":{"de":"Auftakt der House-Residency von GLITCH im Rhiz. GLITCH ist eine 2025 gegründete House-Eventreihe (Verein GLITCH), ursprünglich mit kleinen Off-Location-Partys in Kärnten. Es spielen KΛSKIN, laut Veranstalter eines der ersten Indie-Dance-Projekte Österreichs (aus Villach, auch in Wien aktiv), und das GLITCH-Resident-Tech-House-Projekt TenFifty (Grafenauer & KΛSKIN, Wien-Margareten). Weitere Acts sind angekündigt.","en":"Opening night of GLITCH's house residency at Rhiz. GLITCH is a house event series founded in 2025 (Verein GLITCH) that started with small off-location parties in Carinthia. KΛSKIN, described as one of Austria's first indie-dance projects (from Villach, also active in Vienna), and GLITCH resident tech-house project TenFifty (Grafenauer & KΛSKIN, Vienna-Margareten) play; more acts are to be announced."},"ook":1,"na":["price","flyer","age"],"src":[["gl","https://www.enter-glitch.com/"],["gl","https://www.enter-glitch.com/events/glitch-vienna-001"]],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-11-21","s":"15:00","e":"21:00","title":"techNOage – ab fünfzehn Uhr Clubbing","venue":"FLUCC Deck","coll":["techNOage"],"genres":["Techno"],"price":"Freie Spende","flyer":"https://assets-flucc-at.fra1.digitaloceanspaces.com/flucc-at-uploads/images/technoage_Sept_2026.min-2560x1440.jpg","note":{"de":"Nachmittags-Clubbing 15–21 Uhr, Techno mit Spannungsbogen, Kaffee & Kuchen für guten Zweck, barrierefrei.","en":"Afternoon clubbing 3–9 pm, techno with a dramaturgic arc, coffee & cake for charity, step-free access."},"vok":1,"src":[["fl","https://flucc.at/events/5KV584-technoage-ab-funfzehn-uhr-clubbing-26-09/"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-11-21","s":"20:00","title":"Art Attech – Kunst küsst Techno","venue":"FLUCC Wanne","coll":["Art Attech"],"genres":["Techno"],"src":[["fl","https://flucc.at/events/WGyKgG-art-attech/"],["ra","https://ra.co/events/2568823"]],"vok":1,"e":"06:00","price":"VVK 14–18 €, AK 19 €","age":"18+","floors":[{"f":"","a":["Aleta","ARAS JE'TÄM","Krawallbarbie","OK CUTEE","Wal_Halla","DJ Parkverbot"]}],"chk":"2026-10-29"},
{"d":"2026-11-21","s":"20:00","e":"23:00","title":"Rooftop Series at Mariatrink","venue":"Jaz in the City","genres":["Progressive House"],"floors":[{"f":"","a":["Fede Frostl"]}],"price":"Eintritt frei","flyer":"https://images.ra.co/1638cba312dbad767a53e762e2c158339a58b91e.jpg","note":{"de":"Rooftop-Session in der Mariatrink, der Dachbar des Hotels Jaz in the City in der Windmühlgasse: DJ Fede Frostl spielt ab 20:00 ein Set mit Progressive House. Eintritt frei, Ende laut RA 23:00. Weitere Infos zu Mindestalter oder Dresscode gibt es nicht.","en":"Rooftop session at Mariatrink, the rooftop bar of the Jaz in the City hotel on Windmühlgasse: DJ Fede Frostl plays a progressive house set from 20:00. Free entry, ends at 23:00 according to RA. No details on age limit or dress code."},"src":[["ra","https://ra.co/events/2527346"],["ta","https://www.technoairlines.com/event/rooftop-series-at-mariatrink-jaz-in-the-city-2026-11-21"]],"na":["age"],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-11-21","s":"20:15","e":"06:00","title":"Mottosause // Boots, Beer & Beats","venue":"Weberknecht","floors":[{"f":"Floor 1","a":["Teppich Funk","Paul Galbur"]},{"f":"Down Under","a":["Romanova","Franky","Gomez & Nickfried"]}],"price":"Eintritt frei","flyer":"https://weberknecht.at/wp-content/uploads/2026/10/WhatsApp-Image-2026-10-13-at-04.21.25.jpeg","vok":1,"note":{"de":"Mottoparty im Gürtel Saloon des Weberknecht unter dem Dresscode „Boots, Beer & Beats“. Auf Floor 1 spielen Teppich Funk (aka Lee&Marvin) und Paul Galbur, im Down Under Romanova, Franky sowie Gomez & Nickfried. Beginn 20:15, Ende 06:00, Eintritt frei. Genres nennt das Weberknecht nicht.","en":"Theme party in Weberknecht's Gürtel Saloon with the dress code \"Boots, Beer & Beats\". Teppich Funk (aka Lee&Marvin) and Paul Galbur play Floor 1, while Romanova, Franky and Gomez & Nickfried take over Down Under. Starts 20:15, ends 06:00, free entry. Weberknecht does not name any genres."},"src":[["we","https://weberknecht.at/event/mottosause-boots-beer-beats/"]],"na":["tickets","genres","age"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-21","s":"21:00","title":"Wiener Blut","venue":"Ottakringer Brauerei","coll":["SubRosaDictum"],"sexpos":1,"nophoto":1,"zero":1,"price":"€78","tickets":"https://partyticket.de/SRD/WB26/","note":{"de":"Dresscode: Latex, Leder, Spitze, Abendgarderobe, Masken, Drag. Keine Streetwear. Bereiche: Mixed Dance Floor, Artists & Performance, Playground. Keine DJs/Genres veröffentlicht. Strenger Fetisch-Dresscode.","en":"Dress code: latex, leather, lace, evening wear, masks, drag. No streetwear. Areas: mixed dance floor, artists & performance, playground. No DJs/genres published. Strict fetish dress code."},"src":[["sp","https://sexpositives.com/en/events/subrosadictum-wiener-blut/"],["pt","https://partyticket.de/SRD/WB26/"],["fp","https://www.fetischparty.at/Events"],["srd","https://subrosadictum.de/events/wiener-blut/"]],"age":"18+","chk":"2026-10-29"},
{"d":"2026-11-21","s":"21:00","e":"06:00","title":"hosted by the zound partisans","venue":"Celeste","floors":[{"f":"","a":["STAATSEINDE","IVUR","missantroop","_ra_di_aa_ti_on_","finster"]}],"vok":1,"note":{"de":"Die zound partisans übernehmen das Celeste, Gastgeber*in ist ha:kuzaa. Live spielen STAATSEINDE und IVUR, an den Decks stehen missantroop, _ra_di_aa_ti_on_ und finster. Von 21:00 bis 06:00. Preis, Genres und Flyer sind auf der Seite des Celeste nicht angegeben.","en":"The zound partisans take over Celeste, hosted by ha:kuzaa. STAATSEINDE and IVUR perform live, with missantroop, _ra_di_aa_ti_on_ and finster on the decks. From 21:00 to 06:00. Price, genres and flyer are not given on Celeste's site."},"src":[["ce","https://celeste.co.at/"]],"na":["price","tickets","flyer","genres"],"chk":"2026-11-02","srcChk":"2026-11-02"},
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
{"d":"2026-11-27","s":"22:00","e":"06:00","title":"Like Minded.","venue":"Celeste","floors":[{"f":"","a":["Tomasz Guiddo","Flo Førg","B.visible"]}],"vok":1,"note":{"de":"Clubnacht „Like Minded.“ im Celeste von 22:00 bis 06:00 mit den DJs Tomasz Guiddo, Flo Førg und B.visible. Preis, Genres und Flyer nennt das Celeste nicht.","en":"Club night \"Like Minded.\" at Celeste from 22:00 to 06:00 with DJs Tomasz Guiddo, Flo Førg and B.visible. Celeste lists no price, genres or flyer."},"src":[["ce","https://celeste.co.at/"]],"na":["price","tickets","flyer","genres"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-27","s":"23:00","e":"06:00","title":"Flashback w/ Thomas Schumacher – Techno Classics","venue":"Grelle Forelle","coll":["Flashback","FactX"],"genres":["Techno","Acid","Trance"],"price":"ab 16 €","floors":[{"f":"Mainfloor","a":["Thomas Schumacher","Joro & Joabo","Rokis","Tom Snow","MC Mars","MC Spot"]},{"f":"Kitchen","a":["Martin Oelz","Peter Pan","Romen Est Omen","Hanneken","PA_olo"]}],"src":[["rg","https://www.regioactive.de/party/flashback-w-thomas-schumacher-grelle-forelle-techno-classics-elektrochemie-lk-wien-2026-11-27-B5h2WQx06l"],["gf","https://www.grelleforelle.com/programm/"],["ft","https://frey-tag.at/kalender/flashback?s=w_k-JY1v2"],["ft","https://frey-tag.at/kalender/flashback-techno-classics-1?s=eJPDz--_e"],["gf","https://www.grelleforelle.com/project/2711-flashback-w-thomas-schumacher-techno-classics-elektrochemie-lk/"],["ra","https://ra.co/events/2551280"]],"tickets":"https://flashback.ticket.io/2nf9fbhu/","vok":1,"flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/09/flashback_271126_web.jpg","note":{"de":"RA nennt 18+, Hausregel der Location ist 21+.","en":"RA states 18+, the venue's house rule is 21+."},"chk":"2026-10-29"},
{"d":"2026-11-27","s":"23:00","title":"Party Modern × PRST: Station Rose","venue":"PRST","coll":["Wien Modern"],"genres":["Electronic"],"floors":[{"f":"","a":["Stipo","Station Rose","Konman","Julia Goldfarb"]}],"src":[["wm","https://www.wienmodern.at/2026-club-praterstrasse-en-2026-237"],["fa","https://www.falter.at/location/42097/prst-praterstrasse"],["wm","https://www.wienmodern.at/event.php?lang=en&id=4567"]],"price":"€12–15 (€5 mit Festivalpass)","tickets":"https://ticket.wienmodern.at/en/buyingflow/tickets/16540/29099/","e":"06:00","note":{"de":"PRST-Produktion in Koproduktion mit Wien Modern. Zusätzlich gelistet: „Gunafa Clubbing // Nature Is Cool AI 1126 (UA)“. Nicht im PRST-Ticketshop.","en":"PRST production co-produced with Wien Modern. Also listed: \"Gunafa Clubbing // Nature Is Cool AI 1126 (UA)\". Not in PRST's ticket shop."},"chk":"2026-10-29"},
{"d":"2026-11-27","s":"23:00","title":"Resident Night: GOLPE // DETOXX","venue":"Das Werk","note":{"de":"Resident Night mit GOLPE und DETOXX.","en":"Resident night with GOLPE and DETOXX."},"vok":1,"src":[["dw","https://www.daswerk.org/program?page=2"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-11-27","s":"23:00","title":"Bassbussi Allstars – 3 Years Anniversary","venue":"The Loft","coll":["Bassbussi"],"note":{"de":"Bassbussi feiert den dritten Geburtstag im The Loft mit einem „BB-Allstars B2B Special“: drei Jahre Bass, Nächte am Dancefloor und gemeinsame Erinnerungen. Oben spielen Andrew Ahmed b2b Sluzy, PartyPauli b2b Maro und Arman Shadow b2b Leanne, unten Ave Maria b2b Christella, WO.IZZY b2b DJ Parkverbot, Aschenbrenner b2b Zeq und Anatol b2b Pinklotion – alle Sets als B2B. Start 23:00, Eintritt 15 €. Set-Zeiten, Ende und Mindestalter nennt die Location nicht.","en":"Bassbussi celebrates its third birthday at The Loft with a \"BB-Allstars B2B special\": three years of bass, dancefloor nights and shared memories. Upstairs: Andrew Ahmed b2b Sluzy, PartyPauli b2b Maro and Arman Shadow b2b Leanne; downstairs: Ave Maria b2b Christella, WO.IZZY b2b DJ Parkverbot, Aschenbrenner b2b Zeq and Anatol b2b Pinklotion – every set is a b2b. Starts 23:00, entry €15. The venue gives no set times, end time or age limit."},"vok":1,"src":[["lo","https://www.theloft.at/bassbussi-allstars-3-years-anniversary/"]],"floors":[{"f":"Oben","a":["Andrew Ahmed b2b Sluzy","PartyPauli b2b maro","Arman Shadow b2b Leanne"]},{"f":"Unten","a":["Ave Maria b2b Christella","WO.IZZY b2b DJ Parkverbot","Aschenbrenner b2b Zeq","Anatol b2b Pinklotion"]}],"price":"15 €","genres":["Trance"],"na":["e","flyer","tickets","age"],"chk":"2026-10-30"},
{"d":"2026-11-27","s":"23:00","e":"05:00","title":"AWSM. Skyscraper Edition (Extra Date)","venue":"Altia Skybar – DC Tower","coll":["AWSM"],"genres":["Afro House","Melodic House"],"floors":[{"f":"","a":["MAWU"]}],"price":"ab 20 €","age":"19+","tickets":"https://awsmevent.com/awsm-skyspracer-edition-extra-date/","note":{"de":"Im 58. Stock des DC Tower, Dresscode schick.","en":"On the 58th floor of DC Tower, dress code classy."},"src":[["ra","https://ra.co/events/2560557"],["vo","https://www.volume.at/events/awsm-skyscraper-edition-extra-date-2026-11-27/"],["awsm","https://awsmevent.com/awsm-skyspracer-edition-extra-date/"]],"chk":"2026-10-29"},
{"d":"2026-11-27","s":"23:00","e":"06:00","title":"Vivid – Frieden & Liebe","venue":"SASS Music Club","floors":[{"f":"","a":["Vivid"]}],"vok":1,"note":{"de":"Vivid, präsentiert von Frieden & Liebe (@friedenundliebe.vienna), im SASS Music Club von 23 bis 6 Uhr; ein detailliertes Line-up ist noch nicht veröffentlicht. Der Eintritt beträgt 10–15 €, ein Willkommensgetränk ist inklusive. Alle SASS-Veranstaltungen werden von einem Awareness-Team begleitet; Einlass ab 18 mit Ausweis- und Taschenkontrolle.","en":"Vivid, presented by Frieden & Liebe (@friedenundliebe.vienna), at SASS Music Club from 11 pm to 6 am; a detailed line-up has not been published yet. Entry is 10–15 € including a welcome drink. All SASS events are accompanied by an awareness team; entry 18+ with ID and bag check."},"src":[["sa","https://sassvienna.com/en/events"],["sa","https://sassvienna.com/en/events/event/vivid-frienden-liebe-november"]],"na":["flyer","genres","tickets"],"_detailUrl":"https://sassvienna.com/en/events/event/vivid-frienden-liebe-november","srcChk":"2026-10-30","price":"10–15 €","age":"18+","coll":["Frieden & Liebe"],"chk":"2026-10-31"},
{"d":"2026-11-27","s":"23:00","title":"High Voltage Fairies in the Pit – Metal x DnB","venue":"Flex","coll":["High Voltage Fairies"],"genres":["Drum & Bass","Metal"],"floors":[{"f":"","a":["AKOV b2b Van:Hill","Dave & Bass","Rosi","WNR","Fairy Mary"]}],"head":["AKOV b2b Van:Hill"],"tickets":"https://www.eventim-light.com/at/a/69f4c38de8b0edb43d1ba579/e/6adfd07eb6a71e455d87f9c0","flyer":"https://flex.at/wp-content/uploads/2026/10/Flex-Website-Flyer-1.png","note":{"de":"Der „Fairy Pit“ kehrt ins Flex zurück – laut Flex Wiens einzige Metal-&-Drum-&-Bass-Party, bei der Alt, Nu Metal und Metalcore auf Drum & Bass treffen. Im Zentrum steht ein Metal-x-DnB-Set von AKOV b2b Van:Hill mit Live-Metal-Gesang von AKOV, Frontmann der Band Aenygma. Special Guest ist Dave & Bass, die Residents Rosi, WNR und Fairy Mary liefern den „High Voltage“-Sound; dazu gibt es Live-Fairy-Dance-Performances auf der Bühne. Einlass 23:00; Tickets im VVK (Eventim Light, oeticket) und an der Abendkasse, Preise sind nicht angegeben.","en":"The \"Fairy Pit\" returns to Flex – according to the club Vienna's only metal & drum & bass party, where alt, nu metal and metalcore meet drum & bass. At its centre is a metal x DnB set by AKOV b2b Van:Hill with live metal vocals from AKOV, frontman of the band Aenygma. Special guest is Dave & Bass, while residents Rosi, WNR and Fairy Mary bring the \"High Voltage\" sound; there are also live fairy dance performances on stage. Doors 23:00; tickets in presale (Eventim Light, oeticket) and at the door, prices not stated."},"vok":1,"src":[["fx","https://flex.at/event/high-voltage-fairies-in-the-pit/"]],"na":["price","e","age"],"srcChk":"2026-10-30","chk":"2026-10-31"},
{"d":"2026-11-27","s":"23:00","title":"November-Transmission","venue":"O der Klub","genres":["Melodic House & Techno"],"floors":[{"f":"Core","a":["TBA"]},{"f":"Orbit","a":["TBA"]},{"f":"Konsulat","a":["TBA"]}],"price":"8–12 €","tickets":"https://shop.o-klub.at/shop/registrations?event_id=74daed79-ad6d-42fb-b7b4-2b82569df936","flyer":"https://o-klub.at/wp-content/uploads/2026/11/2711_feed-web.jpg","vok":1,"note":{"de":"Monatliche „Transmission“-Nacht im O – der Klub auf drei Floors unter der Oper, jeder mit eigenem Sound: Core mit Hits & Classics, Orbit mit Melodic House & Techno und das Konsulat mit Hip-Hop & Urban. Beginn 23:00, Tickets 8–12 €, Dresscode casual chic, Tischreservierung mit VIP-Eingang möglich; ab 18 laut Hausregel. Ein Lineup ist noch nicht genannt. Die Meta-Beschreibung der Seite verweist noch auf eine frühere Ausgabe („2. Jänner“, „Free entry“), der Eventtext nennt aber den 27.11. und Ticketpreise.","en":"Monthly \"Transmission\" night at O – der Klub across three floors beneath the opera, each with its own sound: Core with hits & classics, Orbit with melodic house & techno and the Konsulat with hip-hop & urban. Starts 23:00, tickets €8–12, dress code casual chic, table bookings with VIP entrance available; 18+ per house rules. No lineup has been announced yet. The page's meta description still refers to an earlier edition (\"2 January\", \"free entry\"), but the event text gives 27 Nov and ticket prices."},"src":[["ok","https://o-klub.at/events/november-transmission/"],["ok","https://o-klub.at/events/"]],"na":["e"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-28","s":"22:00","e":"06:00","title":"KÄLTE! das celeste wird 12+1+25","venue":"Celeste","floors":[{"f":"","a":["Rosa Nebel","Mitra","Lucia Kagramanyan","Heap","DJ Keshi"]}],"vok":1,"note":{"de":"Das Celeste feiert Geburtstag („wird 12+1+25“) mit der Nacht „KÄLTE!“. Live spielen Rosa Nebel und Mitra, als DJs sind Lucia Kagramanyan, Heap und DJ Keshi dabei. Von 22:00 bis 06:00. Preis, Genres und Flyer sind auf der Seite des Celeste nicht angegeben.","en":"Celeste celebrates its birthday (\"turns 12+1+25\") with the night \"KÄLTE!\". Rosa Nebel and Mitra perform live, with Lucia Kagramanyan, Heap and DJ Keshi on the decks. From 22:00 to 06:00. Price, genres and flyer are not given on Celeste's site."},"src":[["ce","https://celeste.co.at/"]],"na":["price","tickets","flyer","genres"],"chk":"2026-11-02","srcChk":"2026-11-02"},
{"d":"2026-11-28","s":"23:00","title":"Selected × Bassbussi w/ Cara Elizabeth & Frederic.","venue":"Grelle Forelle","coll":["Selected","Bassbussi"],"floors":[{"f":"Mainfloor","a":["Cara Elizabeth","Frederic.","Andrew Ahmed"]},{"f":"Kitchen (Bassbussi)","a":[]}],"src":[["rg","https://www.regioactive.de/party/selected-x-bassbussi-w-cara-elizabeth-frederic-wien-grelle-forelle-2026-11-28-WngXFFMqQ0"],["gf","https://www.grelleforelle.com/programm/"],["ev","https://events.at/fortgehen-wien"],["gf","https://www.grelleforelle.com/project/2811-selected-x-bassbussi-w-cara-elizabeth-frederic/"],["ev","https://events.at/event/selected-x-bassbussi-w-cara-elizabeth"]],"vok":1,"tickets":"https://www.eventim-light.com/at/a/69284c91e54d302ec82b2635/e/6ad74e2b69e1b51231fecc93","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/10/selected_281126_web.jpg","chk":"2026-10-29","na":["price"]},
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
{"d":"2026-12-05","s":"20:00","e":"23:00","title":"Rooftop Series at Mariatrink","venue":"Jaz in the City","genres":["Progressive House"],"floors":[{"f":"","a":["Fede Frostl"]}],"price":"Eintritt frei","flyer":"https://images.ra.co/959fc26fe583ab4598d6c8082948295c3ea932be.jpg","note":{"de":"Weitere Rooftop-Session in der Mariatrink, der Dachbar des Hotels Jaz in the City in der Windmühlgasse: DJ Fede Frostl spielt ab 20:00 Progressive House. Eintritt frei, Ende laut RA 23:00.","en":"Another rooftop session at Mariatrink, the rooftop bar of the Jaz in the City hotel on Windmühlgasse: DJ Fede Frostl plays progressive house from 20:00. Free entry, ends at 23:00 according to RA."},"src":[["ra","https://ra.co/events/2527349"],["ta","https://www.technoairlines.com/event/rooftop-series-at-mariatrink-jaz-in-the-city-2026-12-05"]],"na":["age"],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-12-05","s":"21:00","title":"Ungeniert Vol. 5","venue":"Libelle","sexpos":1,"src":[["sp","https://sexpositives.com/en/events/ungeniert-vol-5-wien-2026-12-05/"],["un","https://ungeniert.org/"],["un","https://ungeniert.org"],["li","https://www.libelle.at/events/ungeniert-vol-5/"]],"nophoto":1,"price":"€29","note":{"de":"Auf ungeniert.org ist Vol. 5 noch nicht angekündigt (letzter Stand: Vol. 4 am 16.10.). Ablauf laut Veranstalter: Fragebogen, Warteliste, Gästeliste. Dresscode sinnlich, Hausschuhe mitbringen. Einlass bis 00:00. Keine Abendkasse; Erstbesucher:innen füllen vorab einen Fragebogen aus. Keine DJs/Genres angegeben.","en":"Vol. 5 is not yet announced on ungeniert.org (latest: Vol. 4 on 16 Oct). Process per organiser: questionnaire, waiting list, guest list. Sensual dress code, bring slippers. Entry until 00:00. No box office; first-timers complete a questionnaire first. No DJs/genres listed."},"unconf":1,"tickets":"https://event.ungeniert.org/app/1-user-signup-first-step/set-language-68dc311688bd5a4f8ca56aee","vok":1,"chk":"2026-10-29"},
{"d":"2026-12-05","s":"22:00","title":"Panzerschokolade","venue":"FLUCC Deck","floors":[{"f":"","a":["TBA"]}],"note":{"de":"Panzerschokolade im FLUCC Deck. Die Location-Seite nennt bisher nur Titel, Datum und Beginn (22:00 Uhr); Lineup, Preis, Ende und Flyer sind noch nicht veröffentlicht.","en":"Panzerschokolade at FLUCC Deck. The venue page so far only lists title, date and start time (22:00); lineup, price, end time and flyer have not been published yet."},"vok":1,"src":[["fl","https://flucc.at/"],["fl","https://flucc.at/events/HkoXCz-panzerschokolade/"]],"na":["lineup","price","e","flyer","tickets","age","genres"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-05","s":"22:00","e":"06:00","title":"Noche d'Amore – A Dance Romance","venue":"Funkhaus","coll":["Tropical Thunder"],"genres":["Balearic","Breakbeat"],"floors":[{"f":"","a":["Sonya Hibiscus"]}],"price":"15 €","age":"18+","flyer":"https://images.ra.co/c4f0403db09341f2c87640c10133924391af318a.jpg","note":{"de":"Tropical Thunder lädt ins Funkhaus zu einer Mischung aus Slow-Dance-Abend und Tanzparty: Zwischen energiegeladenen Passagen gibt es langsame „La Boum“-Momente, bei denen man jemanden zum Tanzen auffordern und eng tanzen soll. Musikalisch geht es um Balearic-Sounds der 80er, 90er und frühen 2000er, Retro-Zouk, French Boogie, Indie Dance und NYC-Breaks der 70er. An den Decks steht Sonya Hibiscus (Grand Bal Zouk, Frankreich), dazu zeigen die Tropical Thunder Allstars Live-Tanzperformances. Die Nacht ist bell hooks' Büchern „All About Love“ und „The Will to Change“ gewidmet; das Format entstand 2025 für die „Republic of Love“ der Wiener Festwochen. 22:00–06:00, 15 € über KUPFticket, ab 18.","en":"Tropical Thunder invites you to Funkhaus for a mix of slow-dance evening and dance party: between high-energy stretches come slow 'La Boum' moments where you are encouraged to ask someone to dance and hold each other close. Musically it is about Balearic sounds of the 80s, 90s and early 2000s, retro zouk, French boogie, indie dance and 70s NYC breaks. Sonya Hibiscus (Grand Bal Zouk, France) plays, and the Tropical Thunder Allstars give live dance performances. The night is dedicated to bell hooks' books 'All About Love' and 'The Will to Change'; the format was created in 2025 for the Wiener Festwochen's 'Republic of Love'. 22:00–06:00, €15 via KUPFticket, 18+."},"src":[["ra","https://ra.co/events/2568201"],["ta","https://www.technoairlines.com/event/noche-damore-a-dance-romance-funkhaus-2026-12-05"]],"na":["tickets"],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-12-05","s":"23:00","e":"05:00","title":"Karotte im Wohnzimmer","venue":"SASS Music Club","floors":[{"f":"","a":["DJ Karotte","Crazy Sonic","Joro & Joabo"]}],"src":[["sa","https://sassvienna.com/en/events/event/dj-karotte-im-wohnzimmer"],["ra","https://ra.co/events/2558624"]],"price":"18 €","vok":1,"age":"18+","aw":1,"genres":["House","Tech House"],"chk":"2026-10-29"},
{"d":"2026-12-05","s":"23:00","title":"Bassbehörde","venue":"FLUCC Wanne","floors":[{"f":"","a":["TBA"]}],"note":{"de":"Bassbehörde im FLUCC Wanne. Die Location-Seite nennt bisher nur Titel, Datum und Beginn (23:00 Uhr); Lineup, Preis, Ende und Flyer sind noch nicht veröffentlicht.","en":"Bassbehörde at FLUCC Wanne. The venue page so far only lists title, date and start time (23:00); lineup, price, end time and flyer have not been published yet."},"vok":1,"src":[["fl","https://flucc.at/"],["fl","https://flucc.at/events/D8e6qM-bassbeh%C3%B6rde/"]],"na":["lineup","price","e","flyer","tickets","age","genres"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-06","s":"13:00","e":"18:30","title":"Untz Baby Untz – Nikolo im Funkhaus","venue":"Funkhaus","coll":["Untz Baby Untz"],"genres":["Techno","House"],"price":"13 €","tickets":"https://ra.co/events/2568943","note":{"de":"Day-Rave, erstes Indoor-Event; Early-Bird-Tickets ab 2. Nov 12:00. Line-up folgt. Untz Baby Untz ist eine familien-/kinderfreundliche Day-Rave-Reihe. Line-up noch TBA; Early Bird ab 2.11., 12:00.","en":"Day rave, first indoor edition; early-bird tickets from 2 Nov 12:00. Line-up TBA. Untz Baby Untz is a family/kid-friendly day-rave series. Lineup still TBA; early bird from 2 Nov, 12:00."},"src":[["ra","https://ra.co/events/2568943"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-12-07","title":"GLITCH Vienna pres. Stef Davidse","venue":"The Loft","coll":["GLITCH","Resonance Social Artists"],"genres":["House"],"floors":[{"f":"Oben","a":["Stef Davidse","TenFifty","LLo"]}],"head":["Stef Davidse"],"price":"7–15 €","tickets":"https://www.enter-glitch.com/","note":{"de":"Nach kleinen Off-Location-Partys in Kärnten bringt GLITCH sein bisher größtes Event nach Wien: Headliner ist der Niederländer Stef Davidse (Eastenderz). Dazu spielen GLITCH-Resident Tenfifty und LLo (IT) von Resonance Social Artists aus Mailand. Ein Raum, ein Dancefloor, House-Musik. Die Loft-Website nennt als Termin Montag, 7.12.2026, mit der offensichtlichen Platzhalter-Uhrzeit 00:23; Beginn und genaue Nacht sind daher noch unklar.","en":"After small off-location parties in Carinthia, GLITCH brings its biggest event yet to Vienna with Dutch headliner Stef Davidse (Eastenderz). GLITCH resident Tenfifty and LLo (IT) of Milan's Resonance Social Artists join him. One room, one dancefloor, house music. The Loft website lists Monday 7 Dec 2026 with an apparent placeholder time of 00:23, so the start time and exact night are still unclear."},"vok":1,"ook":1,"src":[["lo","https://www.theloft.at/programm/"],["lo","https://www.theloft.at/glitch-vienna-pres-stef-davidse/"]],"na":["e","flyer","age","s"],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-12-07","s":"21:00","e":"06:00","title":"FT — 12","venue":"Grelle Forelle","coll":["Feuchte Träume"],"price":"Early Bird 36,16 € (Member 28,93 €), danach 41,81 / 44,64 / 47,46 €","tickets":"https://tickets.feuchtetraeu.me/events/ft-12","nophoto":1,"sexpos":1,"note":{"de":"Nur mit angenommener Online-Bewerbung, keine Abendkasse; personalisierte Tickets, Outfit erwartet, Kameras abgeklebt, Awareness-Team. Line-up folgt. Nacht vor dem Feiertag.","en":"Entry only with accepted online application, no box office; personalised tickets, outfits expected, cameras covered, awareness team. Line-up TBA. Night before the public holiday."},"aw":1,"src":[["ftr","https://feuchtetraeu.me"],["ftr","https://tickets.feuchtetraeu.me/events/ft-12"]],"floors":[{"f":"","a":["TBA"]}],"chk":"2026-10-29"},
{"d":"2026-12-07","s":"23:00","e":"06:00","title":"Cybertribe 11 Years w/ DBBD","venue":"PRST","coll":["Cybertribe"],"genres":["Trance","Techno"],"floors":[{"f":"","a":["DBBD","Who is Ela¿","AVO2X","ENJA","Spud Bencer","DJ Backstage"]}],"head":["DBBD"],"price":"12 €","age":"18+","flyer":"https://images.ra.co/17c573fc2513db5892baa5ba564efe24ea1ca961.jpg","note":{"de":"Cybertribe feiert elf Jahre und kommt zum dritten Mal ins PRST – in der Nacht vor dem Feiertag (8. Dezember). Headliner ist der Berliner Produzent DBBD, ein Pionier des „Slut Bass“ mit dreckigen Basslines, eingängigen Synth-Melodien und oft frechen weiblichen Vocals; seine DJ-Sets mischen energiegeladen Techno mit eigenen Produktionen. Dazu spielen Who is Ela¿ (Resident bei Soundlabs) sowie die Cybertribe-Residents AVO2X, ENJA, Spud Bencer und DJ Backstage. RA nennt Trance und Techno, 23:00–06:00, Tickets 12 € (limitiert, über Universe), ab 18. Cybertribe versteht den Floor als sicheren, inklusiven Raum gegen Rassismus, Sexismus, Homo- und Transphobie, Antisemitismus, Ableismus und jede Diskriminierung.","en":"Cybertribe celebrates eleven years and returns to PRST for the third time – on the night before the public holiday (8 December). The headliner is Berlin producer DBBD, a pioneer of 'slut bass' with dirty basslines, catchy synth melodies and often cheeky female vocals; his DJ sets mix high-energy techno with his own productions. Also playing are Who is Ela¿ (Soundlabs resident) and Cybertribe residents AVO2X, ENJA, Spud Bencer and DJ Backstage. RA lists trance and techno, 23:00–06:00, tickets €12 (limited, via Universe), 18+. Cybertribe sees the floor as a safe, inclusive space against racism, sexism, homo- and transphobia, antisemitism, ableism and any discrimination."},"src":[["ra","https://ra.co/events/2561642"],["ta","https://www.technoairlines.com/event/cybertribe-11-years-with-dbbd-berlin-vienna-prst-2026-12-07"]],"na":["tickets"],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-12-11","s":"21:00","e":"06:00","title":"SIGNAL Festival w/ Eric Prydz","venue":"Pyramide Vösendorf","coll":["SIGNAL"],"genres":["Techno"],"floors":[{"f":"","a":["Eric Prydz","TBA"]}],"head":["Eric Prydz"],"age":"18+","tickets":"https://shop.o-klub.at/shop/","flyer":"https://warda.at/wp-content/uploads/2026/09/792717161_1165555019336613_1184285506877769689_n.jpg","note":{"de":"SIGNAL (Reihe von O der Klub) bringt Eric Prydz in die Glaspyramide Vösendorf, angekündigt als großangelegte „Transmission“. Der schwedische Produzent bewegte sich laut Ankündigung von melodischen, progressiven Sounds als Pryda hin zu dunklerem Techno als Cirez D; erwähnt werden sein Album OPUS und seine aufwendigen EPIC-Shows. Weitere Acts sind noch TBA. Es gibt reguläre Tickets, VIP-Stage-Tickets und VIP-Tische; Preise sind nicht angegeben. Einlass ab 18 Jahren.","en":"SIGNAL (a series by O der Klub) brings Eric Prydz to the glass pyramid in Vösendorf, billed as a full-scale \"transmission\". According to the announcement, the Swedish producer moved from melodic, progressive sounds as Pryda to darker techno as Cirez D; his album OPUS and his elaborate EPIC shows are mentioned. Further acts are TBA. Regular tickets, VIP stage tickets and VIP tables are available; prices not stated. Admission 18+."},"src":[["wa","https://warda.at/events/signal-festival-w-eric-prydz/"],["wa","https://warda.at/genre/techno/"]],"na":["price"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-11","s":"22:00","title":"Titti Titti Bang Bang","venue":"The Loft","coll":["Titti Queer Club"],"lgbtq":1,"floors":[{"f":"Oben","a":["TBA"]},{"f":"Unten","a":["TBA"]},{"f":"Wohnzimmer","a":["TBA"]}],"price":"10–15 €","age":"18+","note":{"de":"Titti ist eine queere Partyreihe in Wien, die seit rund sieben Jahren queeren Gästen einen sicheren Raum und queeren Künstler:innen eine offene Bühne bietet – diesmal als „Titti Titti Bang Bang“ auf drei Floors im The Loft mit Pop, gemischter Musik sowie Techno/House (welcher Floor was spielt, ist nicht angegeben). Das DJ-Lineup verweist auf die TTBB-Website. Um 01:00 gibt es unten eine Drag-Show, gehostet von Ryta Tale und Metamorkid mit Philisha Conditioner und Bloodsugar; von 00:00 bis 02:00 schenkt Horness Gratis-Shots aus. Eintritt 10/15 €, ab 18; alle Geschlechter willkommen, keine Toleranz für Sexismus, Homophobie, Rassismus, Body-Shaming oder andere Diskriminierung.","en":"Titti is a queer party series in Vienna that has offered queer guests a safe space and queer artists an open stage for around seven years – this time as \"Titti Titti Bang Bang\" across three floors at The Loft with pop, mixed music and techno/house (which floor plays what is not stated). For the DJ line-up the venue refers to the TTBB website. At 1 am there is a drag show downstairs hosted by Ryta Tale and Metamorkid with Philisha Conditioner and Bloodsugar; Horness serves free shots from midnight to 2 am. Entry €10/15, 18+; all genders welcome, no tolerance for sexism, homophobia, racism, body shaming or any other discrimination."},"vok":1,"src":[["lo","https://www.theloft.at/titti-titti-bang-bang-14/"]],"na":["lineup","e","tickets","flyer"],"srcChk":"2026-10-30","chk":"2026-10-31"},
{"d":"2026-12-11","s":"23:00","title":"Zuckerwatt w/ Ellen Allien","venue":"Grelle Forelle","coll":["Zuckerwatt"],"floors":[{"f":"Mainfloor","a":["Ellen Allien","TBA"]},{"f":"Kitchen","a":["TBA"]}],"head":["Ellen Allien"],"tickets":"https://zuckerwatt.ticket.io/8EYfX8ZC/","flyer":"https://www.grelleforelle.com/wp-content/uploads/2026/08/zuckerwatt_111226.jpg","note":{"de":"Die Reihe Zuckerwatt holt Ellen Allien in die Grelle Forelle. Die Location beschreibt sie als eine der prägendsten Künstlerinnen ihrer Generation, die den Kern des Techno verkörpert, als DJ in großen Clubs und auf Festivals weltweit gespielt hat und einen umfangreichen Katalog aus Soloalben, Singles, EPs und Remixen vorweisen kann. Weitere Acts für Mainfloor und Kitchen sind noch tba. Einlass 23:00, Vorverkauf über ticket.io; Preis und Ende sind noch nicht angegeben.","en":"The Zuckerwatt series brings Ellen Allien to Grelle Forelle. The venue describes her as one of the most iconic artists of her generation who embodies the core ethos of techno, has played major clubs and festivals worldwide and has an extensive catalogue of solo albums, singles, EPs and remixes. Further acts for Mainfloor and Kitchen are still tba. Doors 23:00, presale via ticket.io; price and end time not yet announced."},"vok":1,"src":[["gf","https://www.grelleforelle.com/programm/"],["gf","https://www.grelleforelle.com/project/1112-zuckerwatt-w-ellen-allien/"]],"na":["price","e","age","genres"],"chk":"2026-10-30","srcChk":"2026-10-30"},
{"d":"2026-12-11","s":"23:30","e":"05:00","title":"TAKTGEFÜHL Vol. 2","venue":"Club Lucia","coll":["Taktgefühl"],"genres":["Trance","Techno"],"floors":[{"f":"","a":["KWEEN BEE","Chiara Allnutt","L.O.S.S."]}],"price":"12–15 €","age":"18+","tickets":"https://events.eventjet.at/e/taktgefuehl-vol-2/","flyer":"https://images.ra.co/2917bb85cd0c900498f50062c379cb8ac5cbbc4c0.jpg","note":{"de":"Zweite Ausgabe der Reihe TAKTGEFÜHL im Club Lucia, zwischen Groove, Techno und Trance. KWEEN BEE spielt schnellen Techno mit funkigen Elementen, Chiara Allnutt groovigen, uptempo Techno. L.O.S.S. bringt eine Sammlung alter Trance-CDs mit.","en":"Second edition of the TAKTGEFÜHL series at Club Lucia, mixing groove, techno and trance. KWEEN BEE plays fast techno with funky elements, Chiara Allnutt groovy, upbeat techno, and L.O.S.S. brings a collection of old trance CDs."},"src":[["ta","https://www.technoairlines.com/event/taktgefuhl-vol-2-club-lucia-2026-12-11"],["ra","https://ra.co/events/2547316"]],"chk":"2026-10-31","srcChk":"2026-10-31"},
{"d":"2026-12-12","s":"06:00","e":"13:00","title":"Liminal Afterhour #3","venue":"The Loft","coll":["Liminal"],"genres":["Techno","House"],"floors":[{"f":"","a":["TBA"]}],"price":"10 €","age":"21+","flyer":"https://images.ra.co/6b31fdb48e98aed2d5e12b9f08cb420b8d5c5195.jpg","note":{"de":"Dritte Ausgabe der Liminal Afterhour im Loft am Samstagmorgen: auf zwei Floors soll es Techno, Tech House, House, Breakbeat und Disco geben, das Lineup ist noch nicht bekannt. 06:00–13:00, 10 €, ab 21.","en":"Third edition of the Liminal Afterhour at The Loft on Saturday morning: two floors of techno, tech house, house, breakbeat and disco are promised, the lineup has not been announced yet. 06:00–13:00, €10, 21+."},"src":[["ra","https://ra.co/events/2572845"],["ta","https://www.technoairlines.com/event/liminal-afterhour-at-theloft-the-loft-2026-12-12"]],"na":["tickets"],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-12-12","s":"22:00","e":"05:00","title":"KlangKuenstler","venue":"Multiversum Schwechat","genres":["Techno"],"floors":[{"f":"","a":["KlangKuenstler","SHDW","Svetec","Karolina"]}],"head":["KlangKuenstler"],"price":"55 €","age":"18+","tickets":"https://events.tickethead.io/de/tickethead/event/5541","flyer":"https://images.ra.co/6788ccf4d404c0c0bbc3c89897242eb8433f8905.png","note":{"de":"Der deutsche Techno-Produzent KlangKuenstler kehrt nach Wien zurück – angekündigt als „eine der prägenden Kräfte des modernen Techno“ – und spielt im Multiversum Schwechat. Dazu kommen SHDW, Svetec und Karolina. Veranstalter ist laut RA void.vienna. 22:00–05:00, RA nennt 55 € (Tickets über Tickethead), ab 18.","en":"German techno producer KlangKuenstler returns to Vienna – announced as 'one of the defining forces of modern techno' – playing Multiversum Schwechat. SHDW, Svetec and Karolina join him. According to RA, the promoter is void.vienna. 22:00–05:00, RA lists €55 (tickets via Tickethead), 18+."},"src":[["ra","https://ra.co/events/2540048"],["ta","https://www.technoairlines.com/event/klangkuenstler-multiversum-schwechat-2026-12-12"]],"chk":"2026-11-01","srcChk":"2026-11-01"},
{"d":"2026-12-19","s":"18:00","e":"03:00","title":"ZusammenKommen 16","venue":"Club Exil","coll":["hausgemacht"],"genres":["Techno"],"sexpos":1,"note":{"de":"Save the Date. Details folgen über den hausgemacht-Newsletter. Nur Vorverkauf nach Bewerbung, Einlass in Zeitslots bis 22:00. Line-up TBA. Nicht auf club-exil.at gelistet.","en":"Save the date. Details via the hausgemacht newsletter. Presale only after application, time-slot entry until 22:00. Lineup TBA. Not listed on club-exil.at."},"src":[["hg","https://www.hausgemacht.org/en/events/zusammenkommen-16"],["sp","https://sexpositives.com/en/events/zusammenkommen-16-wien-2026-12-19/"],["ex","https://club-exil.at/"]],"tickets":"https://app.hausgemacht.org/events/zk16","age":"18+","chk":"2026-10-29","na":["price"]}
];
