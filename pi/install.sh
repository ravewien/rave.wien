#!/usr/bin/env bash
# Einrichtung auf dem Raspberry Pi:  curl -fsSL https://rave.wien/pi/install.sh | bash
set -e
DIR="$HOME/rave-insta"; CONF="$HOME/.rave-insta"
mkdir -p "$DIR" "$CONF"
chmod 700 "$CONF"
echo "→ Lade Programm …"
curl -fsSL "https://rave.wien/pi/rave_insta.py" -o "$DIR/rave_insta.py"
echo "→ Installiere Python-Umgebung (kann ein paar Minuten dauern) …"
command -v python3 >/dev/null || { echo "python3 fehlt: sudo apt install python3 python3-venv"; exit 1; }
python3 -m venv "$DIR/venv" || { echo "Bitte zuerst: sudo apt install python3-venv"; exit 1; }
"$DIR/venv/bin/pip" install -q --upgrade pip
"$DIR/venv/bin/pip" install -q instagrapi pillow
if [ ! -f "$CONF/config" ]; then
  read -rp "Instagram-Benutzername: " U </dev/tty
  read -rsp "Instagram-Passwort (wird nur auf diesem Pi gespeichert): " P </dev/tty; echo
  printf 'IG_USER=%s\nIG_PASS=%s\n' "$U" "$P" > "$CONF/config"; chmod 600 "$CONF/config"
fi
if ! grep -q '^MAIL_TO=' "$CONF/config"; then
  echo
  echo "Infomails: Der Pi kann dir eine Mail schicken, wenn etwas gepostet wurde (und wenn etwas schiefgeht)."
  read -rp "Deine Proton-Adresse (leer lassen = keine Mails): " M </dev/tty
  if [ -n "$M" ]; then
    echo "SMTP-Token: in Proton Mail unter Einstellungen → IMAP/SMTP → SMTP-Token erzeugen (Adresse: $M)."
    read -rsp "SMTP-Token (wird nur auf diesem Pi gespeichert): " T </dev/tty; echo
    printf 'MAIL_TO=%s\nSMTP_USER=%s\nSMTP_TOKEN=%s\n' "$M" "$M" "$T" >> "$CONF/config"
  else
    printf 'MAIL_TO=\n' >> "$CONF/config"
  fi
  chmod 600 "$CONF/config"
fi
cat > "$DIR/rave" <<EOS
#!/usr/bin/env bash
exec "$DIR/venv/bin/python" "$DIR/rave_insta.py" "\$@"
EOS
chmod +x "$DIR/rave"
echo "→ Anmelden bei Instagram …"
"$DIR/rave" login </dev/tty
# Lauf alle 10 Minuten (für Updates einfach dieses Skript nochmal ausführen)
# (grep -v liefert bei leerem Zeitplan Exit 1 – mit "|| true", sonst bricht set -e den Block ab und der Zeitplan bleibt leer)
{ crontab -l 2>/dev/null | grep -v 'rave-insta' || true; \
  echo "*/10 * * * * $DIR/rave >/dev/null 2>&1 # rave-insta"; } | crontab -
crontab -l 2>/dev/null | grep -q 'rave-insta' || { echo "FEHLER: Der Zeitplan (cron) konnte nicht eingetragen werden."; exit 1; }
echo
if grep -q '^SMTP_TOKEN=.' "$CONF/config"; then echo "→ Schicke Testmail …"; "$DIR/rave" mailtest || true; fi
echo "Fertig! Der Pi prüft jetzt alle 10 Minuten, ob ein Post fällig ist."
echo "Befehle:  $DIR/rave status | test | pause | weiter | jetzt JJJJ-MM-TT | mailtest"
echo "Protokoll: $CONF/log.txt"
