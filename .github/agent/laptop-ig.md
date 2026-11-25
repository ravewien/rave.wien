# Laptop-Lauf: Instagram-Profilbilder für Veranstalter ohne Bild

Nach den gesperrten Seiten, nur wenn der Laptop-Browser erreichbar ist. Höchstens 20 Profile pro Lauf.

1. Liste: `curl -fsSL "https://raw.githubusercontent.com/ravewien/rave.wien/abruf/adressen.json?t=$(date +%s)" | node -e 'const a=JSON.parse(require("fs").readFileSync(0));const e=JSON.parse(require("fs").readFileSync(".github/agent/ig-erledigt.json"));console.log(a.ig.filter(x=>!e[x.h]).slice(0,20).map(x=>x.h).join(" "))'`
2. Je Handle im eingebauten Browser `navigate` auf `https://www.instagram.com/<handle>/` – NUR öffnen und lesen: nichts anklicken, nicht anmelden, nicht folgen/liken, keine Nachrichten, Cookie-Banner höchstens „Ablehnen“. Dann mit javascript_tool: `document.querySelector('meta[property="og:image"]')?.content || ""`. Zwischen zwei Profilen `computer` action `wait` 6 Sekunden.
3. Abbrechen (für heute fertig), sobald Instagram eine Anmeldeseite, „Konto bestätigen“/Challenge, Captcha oder „Versuche es später erneut“ zeigt. Nichts davon umgehen.
4. Ergebnis als JSON in `.github/agent/ig-bilder.json` schreiben: `{"handle": "Bildadresse", …}` – die Adresse EXAKT so, wie das Skript sie geliefert hat (vollständig, mit allen Parametern); bei Profilen ohne Bild oder „Seite nicht verfügbar“ einen leeren String. Danach `node -e 'JSON.parse(require("fs").readFileSync(".github/agent/ig-bilder.json"))'` (gültiges JSON?).
5. Commit NUR dieser Datei: „Laptop-Lauf: Instagram-Profilbilder JJJJ-MM-TT (<n>)“ (NICHT mit „Daten-Update“ beginnen), pushen (bei Ablehnung `git pull --rebase origin main`, bis 3-mal). Der Workflow „Instagram-Bilder (Laptop-Lauf) übernehmen“ lädt die Bilder sofort, legt sie auf rave.wien ab und trägt sie ein.
6. In der Abschluss-Nachricht: „Instagram-Profilbilder: <n> notiert, <m> ohne Bild“ bzw. warum abgebrochen.
