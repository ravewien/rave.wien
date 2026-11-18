#!/usr/bin/env python3
"""rave.wien → Instagram: postet die vorbereiteten Tages-Posts von rave.wien/ig/queue.json.

Läuft auf dem Raspberry Pi alle 10 Minuten (cron). Zugangsdaten stehen nur lokal in
~/.rave-insta/config (IG_USER / IG_PASS), nie im Repository.

  python3 rave_insta.py            # normaler Lauf (cron): fällige Posts veröffentlichen
  python3 rave_insta.py login      # einmalig anmelden (fragt ggf. nach Sicherheitscode)
  python3 rave_insta.py status     # zeigt, was ansteht und was schon gepostet ist
  python3 rave_insta.py test       # lädt den nächsten Post herunter, postet aber NICHT
  python3 rave_insta.py jetzt DATUM  # postet den Post für DATUM (JJJJ-MM-TT) sofort
  python3 rave_insta.py pause | weiter   # automatisches Posten an/aus
  python3 rave_insta.py mailtest  # schickt eine Testmail (wenn Infomails eingerichtet sind)

Infomails (optional, in ~/.rave-insta/config): MAIL_TO, SMTP_USER, SMTP_TOKEN, ggf. SMTP_HOST/SMTP_PORT
(Standard: Proton, smtp.protonmail.ch:587 mit STARTTLS; der Token wird in Proton unter SMTP-Einstellungen erzeugt).
"""
import json, os, sys, time, random, logging, urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

BASE = os.environ.get("RW_BASE", "https://rave.wien/")
HOME = Path.home() / ".rave-insta"
STATE = HOME / "state.json"
SESSION = HOME / "session.json"
CONFIG = HOME / "config"
PAUSE = HOME / "PAUSE"
DL = HOME / "bilder"
MAX_VERSPAETUNG = timedelta(hours=6)   # was länger überfällig ist, wird nicht mehr nachgeholt
MAX_POSTS_24H = 4                      # Sicherheitsnetz: mehr wird an einem Tag nie automatisch gepostet

HOME.mkdir(parents=True, exist_ok=True)
try: HOME.chmod(0o700)
except OSError: pass
logging.basicConfig(filename=HOME / "log.txt", level=logging.INFO,
                    format="%(asctime)s %(levelname)s %(message)s")
log = logging.getLogger("rave")
def say(msg):
    print(msg); log.info(msg)

def load_config():
    cfg = {}
    if CONFIG.exists():
        for line in CONFIG.read_text().splitlines():
            if "=" in line and not line.strip().startswith("#"):
                k, v = line.split("=", 1); cfg[k.strip()] = v.strip().strip('"')
    return cfg

def mail(betreff, text):
    """Schickt eine Infomail, falls eingerichtet. Fehler beim Mailen stoppen nie das Posten."""
    cfg = load_config()
    to = cfg.get("MAIL_TO"); user = cfg.get("SMTP_USER") or to; token = cfg.get("SMTP_TOKEN")
    if not to or not token:
        return False
    import smtplib, ssl
    from email.message import EmailMessage
    from email.utils import formatdate, make_msgid
    m = EmailMessage()
    m["From"] = f"rave.wien Pi <{user}>"; m["To"] = to; m["Subject"] = betreff
    m["Date"] = formatdate(localtime=True); m["Message-ID"] = make_msgid(domain="rave.wien")
    m.set_content(text)
    try:
        with smtplib.SMTP(cfg.get("SMTP_HOST", "smtp.protonmail.ch"), int(cfg.get("SMTP_PORT", "587")), timeout=60) as sm:
            sm.starttls(context=ssl.create_default_context()); sm.login(user, token); sm.send_message(m)
        log.info(f"Infomail geschickt: {betreff}"); return True
    except Exception as e:
        log.error(f"Infomail fehlgeschlagen ({betreff}): {e}"); return False

TAGE = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
def tag(d):
    x = datetime.strptime(d, "%Y-%m-%d"); return f"{TAGE[x.weekday()]} {x.day}.{x.month}."

def problem_mail(state, key, betreff, text):
    """Problem-Mails nur einmal pro Post bzw. Problem – nicht bei jedem 10-Minuten-Lauf."""
    sent = state.setdefault("mails", {})
    if key in sent:
        return
    if mail(betreff, text):
        sent[key] = datetime.now(timezone.utc).isoformat()

def load_state():
    if STATE.exists():
        return json.loads(STATE.read_text())
    return {"gepostet": {}, "uebersprungen": {}, "start": datetime.now(timezone.utc).isoformat()}

def save_state(s):
    STATE.write_text(json.dumps(s, indent=1, ensure_ascii=False))

def fetch(url, binary=False):
    req = urllib.request.Request(url + ("&" if "?" in url else "?") + "t=" + str(int(time.time())),
                                 headers={"User-Agent": "rave.wien-pi"})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read()
    return data if binary else json.loads(data.decode("utf-8"))

def client(interactive=False):
    from instagrapi import Client
    from instagrapi.exceptions import LoginRequired
    cfg = load_config()
    if not cfg.get("IG_USER") or not cfg.get("IG_PASS"):
        sys.exit(f"Bitte IG_USER und IG_PASS in {CONFIG} eintragen.")
    cl = Client()
    cl.delay_range = [2, 5]
    if not interactive:
        cl.challenge_code_handler = lambda *a, **k: (_ for _ in ()).throw(
            RuntimeError("Instagram verlangt einen Sicherheitscode – bitte 'python3 rave_insta.py login' von Hand ausführen."))
    if SESSION.exists():
        cl.load_settings(SESSION)
        try:
            cl.login(cfg["IG_USER"], cfg["IG_PASS"])
            cl.get_timeline_feed()  # prüft, ob die Sitzung noch gilt
            cl.dump_settings(SESSION)
            return cl
        except LoginRequired:
            log.warning("Sitzung abgelaufen – neu anmelden")
            old = cl.get_settings(); cl = Client(); cl.delay_range = [2, 5]
            cl.set_uuids(old.get("uuids", {}))
    code = cfg.get("IG_2FA_CODE") or None
    cl.login(cfg["IG_USER"], cfg["IG_PASS"], verification_code=code or "")
    cl.dump_settings(SESSION)
    return cl

import re
BILD_OK = re.compile(r"^ig/\d{4}-\d{2}-\d{2}/\d{1,2}\.jpg$")
DATUM_OK = re.compile(r"^\d{4}-\d{2}-\d{2}$")

def pruefe(post):
    """Nimmt nur Posts an, die so aussehen, wie rave.wien sie erzeugt."""
    if not DATUM_OK.match(str(post.get("datum", ""))):
        raise ValueError("ungültiges Datum in der Warteschlange")
    bilder = post.get("bilder") or []
    if not bilder or len(bilder) > 10 or not all(isinstance(b, str) and BILD_OK.match(b) for b in bilder):
        raise ValueError("unerwartete Bildpfade in der Warteschlange")
    if not isinstance(post.get("text"), str) or len(post["text"]) > 2200:
        raise ValueError("Text fehlt oder ist zu lang")

def zu_viele(state, now):
    """True, wenn in den letzten 24 Stunden schon MAX_POSTS_24H Posts hinausgegangen sind."""
    zeiten = [datetime.fromisoformat(t) for t in state.get("zeiten", [])]
    return len([t for t in zeiten if now - t < timedelta(hours=24)]) >= MAX_POSTS_24H

def merke(state, now):
    zeiten = [t for t in state.get("zeiten", []) if now - datetime.fromisoformat(t) < timedelta(days=2)]
    state["zeiten"] = zeiten + [now.isoformat()]

def download(post):
    pruefe(post)
    folder = DL / post["datum"]; folder.mkdir(parents=True, exist_ok=True)
    paths = []
    for rel in post["bilder"]:
        p = folder / Path(rel).name
        p.write_bytes(fetch(BASE + rel, binary=True))
        paths.append(p)
    return paths

def publish(post, cl=None):
    paths = download(post)
    cl = cl or client()
    text = post["text"]
    if len(paths) == 1:
        media = cl.photo_upload(paths[0], text)
    else:
        media = cl.album_upload(paths[:10], text)
    return f"https://www.instagram.com/p/{media.code}/"

def gepostet_mail(p, url):
    n = len(p["bilder"])
    mail(f"📸 rave.wien hat gepostet: {tag(p['datum'])}",
         f"Auf Instagram ist gerade der Post für {tag(p['datum'])} erschienen ({p.get('events', '?')} Events, {n} Bild{'er' if n != 1 else ''}).\n\n"
         f"{url}\n\n——— Text des Posts ———\n\n{p['text']}")

def due_posts(queue, state, now):
    out = []
    start = datetime.fromisoformat(state.get("start"))
    for p in queue.get("posts", []):
        at = datetime.fromisoformat(p["posten_ab"])
        d = p["datum"]
        if d in state["gepostet"]:
            continue
        if d in state["uebersprungen"]:
            if p["posten_ab"] in state["uebersprungen"][d]:
                continue
            del state["uebersprungen"][d]   # Post wurde auf einen neuen Zeitpunkt gelegt → neue Chance
            say(f"{d}: neu angesetzt auf {p['posten_ab']}")
        if at > now:
            continue
        if at < start or now - at > MAX_VERSPAETUNG:
            state["uebersprungen"][d] = f"verpasst (fällig {p['posten_ab']})"
            say(f"{d}: übersprungen – war fällig {p['posten_ab']}")
            if at >= start:  # nur melden, wenn der Pi den Termin wirklich verpasst hat (nicht bei alten Posts nach der Einrichtung)
                problem_mail(state, f"verpasst {d} {p['posten_ab']}", f"⚠️ rave.wien: Post für {tag(d)} verpasst",
                             f"Der Instagram-Post für {tag(d)} war fällig um {p['posten_ab']} und ist mehr als 6 Stunden überfällig – er wird nicht mehr automatisch gepostet.\n"
                             f"War der Pi aus oder offline?\n\nVon Hand nachholen: ~/rave-insta/rave jetzt {d}")
            continue
        out.append(p)
    return out

def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "lauf"
    state = load_state()
    now = datetime.now(timezone.utc)
    if cmd == "login":
        client(interactive=True); say("Anmeldung gespeichert."); save_state(state); return
    if cmd == "pause":
        PAUSE.touch(); say("Automatisches Posten pausiert."); return
    if cmd == "weiter":
        PAUSE.unlink(missing_ok=True); say("Automatisches Posten läuft wieder."); return
    queue = fetch(BASE + "ig/queue.json")
    if cmd == "status":
        print("PAUSIERT" if PAUSE.exists() else "aktiv", "| Start:", state["start"])
        for p in queue.get("posts", []):
            st = state["gepostet"].get(p["datum"]) or state["uebersprungen"].get(p["datum"]) or "offen"
            print(f"  {p['datum']}  ab {p['posten_ab']}  {len(p['bilder'])} Bild(er)  → {st}")
        save_state(state); return
    if cmd == "test":
        nxt = [p for p in queue.get("posts", []) if p["datum"] not in state["gepostet"]]
        if not nxt: print("Nichts in der Warteschlange."); return
        p = nxt[0]; paths = download(p)
        print(f"Nächster Post: {p['datum']} ab {p['posten_ab']}\nBilder: {', '.join(map(str, paths))}\n\n{p['text']}")
        return
    if cmd == "jetzt":
        d = sys.argv[2]
        p = next((x for x in queue.get("posts", []) if x["datum"] == d), None)
        if not p: sys.exit(f"Kein Post für {d} in der Warteschlange.")
        url = publish(p); state["gepostet"][d] = url; merke(state, now); save_state(state); say(f"{d}: gepostet → {url}")
        gepostet_mail(p, url); return
    if cmd == "mailtest":
        cfg = load_config()
        if not cfg.get("MAIL_TO") or not cfg.get("SMTP_TOKEN"):
            sys.exit(f"Keine Infomails eingerichtet (MAIL_TO und SMTP_TOKEN in {CONFIG}).")
        ok = mail("✅ rave.wien Pi: Testmail", "Die Infomails vom Raspberry Pi funktionieren.\n\nDu bekommst ab jetzt eine Mail, wenn ein Post auf Instagram veröffentlicht wurde – und wenn etwas schiefgeht.")
        print("Testmail verschickt an " + cfg["MAIL_TO"] if ok else f"Testmail fehlgeschlagen – Details in {HOME / 'log.txt'}"); return
    # normaler Lauf
    if PAUSE.exists():
        return
    todo = due_posts(queue, state, now); save_state(state)
    if not todo:
        return
    time.sleep(random.randint(5, 120))  # nicht immer auf die Sekunde genau
    try:
        cl = client()
    except Exception as e:
        log.exception("Anmeldung fehlgeschlagen"); say(f"Anmeldung bei Instagram fehlgeschlagen: {e}")
        problem_mail(state, "login " + now.strftime("%Y-%m-%d"), "⚠️ rave.wien: Anmeldung bei Instagram fehlgeschlagen",
                     f"Der Pi konnte sich nicht bei Instagram anmelden, deshalb wird gerade nichts gepostet.\n\nFehler: {e}\n\n"
                     "Bitte am Pi ausführen:  ~/rave-insta/rave login\n(Instagram verlangt dann evtl. einen Sicherheitscode.)")
        save_state(state); return
    for p in todo:
        if zu_viele(state, datetime.now(timezone.utc)):
            say(f"{p['datum']}: nicht gepostet – schon {MAX_POSTS_24H} Posts in 24 Stunden (Sicherheitsnetz). Von Hand: rave jetzt {p['datum']}")
            problem_mail(state, f"limit {p['datum']}", f"⚠️ rave.wien: Post für {tag(p['datum'])} zurückgehalten",
                         f"Es sind schon {MAX_POSTS_24H} Posts in 24 Stunden hinausgegangen (Sicherheitsnetz), deshalb wurde der Post für {tag(p['datum'])} nicht automatisch veröffentlicht.\n\n"
                         f"Von Hand posten: ~/rave-insta/rave jetzt {p['datum']}")
            save_state(state); break
        try:
            url = publish(p, cl)
            state["gepostet"][p["datum"]] = url; merke(state, datetime.now(timezone.utc)); save_state(state)
            say(f"{p['datum']}: gepostet → {url}")
            gepostet_mail(p, url)
            time.sleep(random.randint(60, 180))
        except Exception as e:
            log.exception("Fehler beim Posten"); say(f"{p['datum']}: FEHLER {e}")
            problem_mail(state, f"fehler {p['datum']}", f"⚠️ rave.wien: Post für {tag(p['datum'])} fehlgeschlagen",
                         f"Beim Posten für {tag(p['datum'])} ist ein Fehler aufgetreten:\n\n{e}\n\n"
                         "Der Pi versucht es bei den nächsten Läufen (alle 10 Minuten) weiter, solange der Post nicht mehr als 6 Stunden überfällig ist.\n"
                         f"Protokoll: {HOME / 'log.txt'}")
            save_state(state); break

if __name__ == "__main__":
    main()
