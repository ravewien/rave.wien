# Sonderlauf mit Liste: Artists bzw. Veranstalter aus Kalender UND Archiv

Diese Datei hat Vorrang vor dem Abschnitt „Wer ist dran“ in `sonderlauf-profile.md`. Alle anderen Regeln dort gelten weiter: Grundregeln („lieber leer als falsch“, man:1, img/logo nie ändern, Zugehörigkeit nur über die eigene Website des Veranstalters, Aliase), Quellen für Artists, Bild-Regeln, Bio-Regeln, Sets, Veranstalter-Felder.

## Deine Liste
Die Startnachricht nennt eine Datei `.github/agent/listen/<id>.txt`. Jede Zeile (außer der ersten) ist: `Name<TAB>fehlt<TAB>zuletzt gesucht<TAB>Auftritte/Events bei uns`.
- Bearbeite GENAU diese Namen, in der Reihenfolge der Datei (wichtigste zuerst). Keine anderen.
- „fehlt“: neu = noch kein Eintrag; sonst die fehlenden Felder (img, links, bio, from bzw. bei Veranstaltern text, links, logo).
- „zuletzt gesucht“: Steht dort ein Datum, wurde RA schon geprüft → RA überspringen und gleich andere Quellen nehmen.
- Die Spalte „Auftritte/Events bei uns“ hilft beim Identifizieren: Name UND Umfeld (Wien, diese Clubs/Veranstalter, Genre) müssen passen. Bei Namensgleichheit mit anderen Personen weglassen.
- Ist ein Name offensichtlich kein Artist (z. B. „Special Guest“, „Residents“, „Friends“, „Live Act“, „+ more“, Veranstaltungs- oder Floorname): KEINEN Eintrag anlegen, in der Abschluss-Nachricht unter „kein Artist“ nennen.

## Tempo (viele Einträge, meist kleine lokale Acts)
- Pro Artist normalerweise höchstens 3 Suchen und 2 Seitenabrufe:
  1. WebSearch „<Name> DJ“ mit allowed_domains ["ra.co"] (nur wenn „zuletzt gesucht“ leer ist) → bei passendem Treffer ra.co/dj/<slug> abrufen.
  2. WebSearch „<Name>“ mit allowed_domains ["soundcloud.com"] (Profil-Link, Avatar i1.sndcdn.com/avatars-…, Profiltext aus dem Treffer, Sets).
  3. WebSearch „<Name> DJ Wien“ ohne Domain-Filter (Instagram/Facebook-Kurztexte, Bandcamp, Discogs, Spotify, Festival-/Kollektiv-Seiten) → nur den vielversprechendsten Treffer abrufen.
- Mehr nur, wenn ein Treffer eindeutig weiterhilft (z. B. eigene Website mit Bio). Lieber zügig weiter als lange suchen.
- Budget: bis ca. 400 Seitenabrufe plus Suchen. Reicht es nicht für die ganze Liste, am Ende melden, ab welchem Namen nicht mehr bearbeitet wurde.
- Ohne jeden Treffer trotzdem eintragen: neuer AR-Eintrag (nur für echte Artists) mit `infoChk`, `noImg`, `noLinks` = heute. So wird er nicht ständig neu gesucht.

## Veranstalter-Listen (v01 … v07)
Felder und Quellen wie im Abschnitt „Veranstalter“ von `sonderlauf-profile.md`. Pro Veranstalter bis zu 4 Suchen und 3 Abrufe. Neue Veranstalter auch in `KC`. Danach `infoChk` = heute; ohne Logo `noLogo` = heute.

## Änderungen speichern – NUR über die Änderungsdatei (zwingend)
Parallel laufen bis zu zehn solcher Läufe. Damit sich niemand gegenseitig überschreibt, events.js NIE direkt bearbeiten, sondern:
1. Alle Ergebnisse dieses Laufs in EINER Datei `/home/claude/patch.json` sammeln (außerhalb des Repos), Format:
   `{"AR": {"<Name>": {Felder…}}, "CI": {"<Name>": {Felder…}}, "CG": {"<Veranstalter>": ["Genre"]}, "KC": ["Neuer Veranstalter"]}`
   Felder wie in events.js, z. B. AR: `img`, `links:{sc,mc,sp,ra,bc,ig,web}`, `bio:{de,en}`, `from:{de,en}`, `labels`, `genres`, `alias:[…]`, `sets:[{t,u}]`, `setsChecked`, `infoChk`, `noImg`, `noLinks`, `src:[…]`. Die Datei wächst über den ganzen Lauf (immer alles drin lassen).
2. Veröffentlichen etwa alle 15 bearbeiteten Einträge und am Ende – immer genau diese Befehlsfolge:
   ```
   cd /home/claude/rave.wien && git fetch --depth 1 origin main && git reset --hard origin/main \
   && node .github/scripts/apply-patch.js /home/claude/patch.json && node --check events.js \
   && git add events.js && git commit -m "Daten-Update JJJJ-MM-TT: Sonderlauf Liste <id> (<n>)" && git push origin HEAD:main
   ```
   Das Skript wendet die Änderungsdatei immer auf die neueste Version aus GitHub an und beachtet dabei man:1 und vorhandene img/logo. Wird der Push abgelehnt (anderer Lauf war schneller), die ganze Folge einfach wiederholen (bis zu 6-mal, dazwischen 20–60 Sekunden warten). „Änderungen: 0“ heißt nichts Neues → kein Commit nötig.
3. Vor dem Veröffentlichen per Skript prüfen, dass alle neuen Links/Bilder mit https:// beginnen und alias Listen sind.

## Abschluss-Nachricht (Deutsch, kurz)
Liste <id>; ob die Pushes geklappt haben (sonst genaue Meldung); Seitenabrufe; bearbeitet / neu angelegt / jetzt mit Bild / Links / Bio / Herkunft / Sets; ohne Treffer (Anzahl, Namen nur wenn ≤ 15); „kein Artist“-Namen; unsichere Fälle, die bewusst NICHT übernommen wurden (Name + Grund); falls nicht fertig: ab welchem Namen offen.
