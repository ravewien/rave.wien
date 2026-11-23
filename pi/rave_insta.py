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
  python3 rave_insta.py passwort  # neues Instagram-Passwort eintragen und neu anmelden
  python3 rave_insta.py update    # sofort nach einer neuen Programmversion suchen
  python3 rave_insta.py abruf     # Event-Quellen jetzt abrufen (läuft sonst täglich ab ca. 05:25 von selbst)
  python3 rave_insta.py schluessel  # zeigt den Schlüssel, den du einmalig bei GitHub hinterlegst

Abruf (Hauptsuche): Täglich ab ca. 05:25 holt der Pi alle Quellseiten (Clubprogramme, Portale, Eventseiten, Veranstalter-Websites)
von deinem Heimanschluss aus – Seiten, die GitHub/Claude oft gesperrt bekommen. Schutzseiten (Captcha, Cloudflare) werden NICHT umgangen,
ra.co wird nicht abgerufen. Dazu lädt er ohne Anmeldung (ohne Cookies, NICHT mit dem rave.wien-Konto) ein paar Instagram-Profilbilder
von Veranstaltern ohne Bild herunter (höchstens 30 am Tag, mit Pausen). Das Ergebnis geht verschlüsselt in den GitHub-Branch „abruf-pi“.
Dafür braucht der Pi einmalig einen Schreib-Schlüssel bei GitHub (Deploy key) – siehe „schluessel“.

Story: Tagesposts gehen am Vortag um ca. 16 Uhr raus, ihre Story kurz nach Mitternacht am Veranstaltungstag (zufällig 00:02–00:20),
damit die Story am Tag des Programms läuft; Zwischenposts 10–45 Minuten nach dem Post. Geteilt wird bei Tagesposts mit allen
Event-Bildern (höchstens 4, im Abstand von einigen Minuten), bei Zwischenposts mit dem ersten Bild; angehängte Extra-Bilder
kommen nicht in die Story. Jede Story hat einen antippbaren Verweis auf den Post. Abschalten: STORY=nein in ~/.rave-insta/config.

Aktualisierung: Der normale Lauf prüft höchstens einmal pro Stunde, ob es auf rave.wien eine neue Version dieses
Programms gibt. Eine neue Version wird erst getestet (Selbsttest in eigenem Prozess) und nur dann übernommen;
die vorige Version bleibt als rave_insta.bak.py daneben liegen.

Infomails (optional, in ~/.rave-insta/config): MAIL_TO, SMTP_USER, SMTP_TOKEN, ggf. SMTP_HOST/SMTP_PORT
(Standard: Proton, smtp.protonmail.ch:587 mit STARTTLS; der Token wird in Proton unter SMTP-Einstellungen erzeugt).
"""
import json, os, sys, time, random, logging, urllib.request, urllib.error, hashlib, subprocess, re
from datetime import datetime, timezone, timedelta
from pathlib import Path

VERSION = "2026-11-23.1"
BASE = os.environ.get("RW_BASE", "https://rave.wien/")
SELF = Path(__file__).resolve()
UPDATE_ALLE = timedelta(hours=1)
HOME = Path.home() / ".rave-insta"
STATE = HOME / "state.json"
SESSION = HOME / "session.json"
CONFIG = HOME / "config"
PAUSE = HOME / "PAUSE"
DL = HOME / "bilder"
MAX_VERSPAETUNG = timedelta(hours=6)   # was länger überfällig ist, wird nicht mehr nachgeholt
MAX_POSTS_24H = 4                      # Sicherheitsnetz: mehr wird an einem Tag nie automatisch gepostet
STORY_NACH_MIN = (10, 45)              # Zwischenposts (und Tagesposts, deren Morgen schon vorbei ist): Story 10–45 Minuten nach dem Post
STORY_MORGEN = (0, 2, 18)              # Tagesposts: Story kurz nach Mitternacht am Veranstaltungstag (00:02–00:20 Wiener Zeit) – 24 h sichtbar = genau der Eventtag
STORY_AUFGEBEN = timedelta(hours=3)    # nach 3 Fehlversuchen oder so langer Überfälligkeit wird die Story aufgegeben
STORY_MAX_BILDER = 4                   # Tagesposts: höchstens so viele Event-Bilder als Story-Serie
STORY_ABSTAND_MIN = (2, 6)             # weitere Story-Bilder frühestens 2–6 Minuten nach dem vorigen (nächster Lauf)
# Fehler, bei denen Instagram bremst oder eine Bestätigung will: Story-Serie für den Tag sofort beenden, nicht weiter probieren
STORY_STOPP = ("ChallengeRequired", "FeedbackRequired", "PleaseWaitFewMinutes", "LoginRequired", "RateLimitError", "ClientThrottledError", "SentryBlock")
STREUUNG_MIN = 30                      # jeder Post erscheint zufällig bis zu 30 Minuten vor oder nach der geplanten Zeit

def wann(p):
    """Tatsächlicher Zeitpunkt: geplante Zeit ± bis zu STREUUNG_MIN Minuten, je Post fest ausgewürfelt (bleibt bei jedem Lauf gleich)."""
    at = datetime.fromisoformat(p["posten_ab"])
    h = int(hashlib.sha256((p["datum"] + p["posten_ab"]).encode()).hexdigest(), 16)
    return at + timedelta(minutes=h % (2 * STREUUNG_MIN + 1) - STREUUNG_MIN)

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

def mail(betreff, text, bilder=()):
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
    try:   # Bilder direkt in der Mail anzeigen (und als Anhang dabei)
        vorhanden = [Path(b) for b in bilder if Path(b).exists()][:10]
        if vorhanden:
            import html as _html
            cids = [make_msgid(domain="rave.wien") for _ in vorhanden]
            body = "<div style=\"font-family:sans-serif;font-size:15px;white-space:pre-wrap\">" + _html.escape(text) + "</div>" + "".join(
                f"<p><img src=\"cid:{c[1:-1]}\" style=\"max-width:420px;width:100%;height:auto;border-radius:8px\"></p>" for c in cids)
            m.add_alternative(body, subtype="html")
            for c, b in zip(cids, vorhanden):
                m.get_payload()[1].add_related(b.read_bytes(), "image", "jpeg", cid=c, filename=b.name)
    except Exception as e:
        log.error(f"Bilder konnten nicht an die Mail gehängt werden: {e}")
    try:
        with smtplib.SMTP(cfg.get("SMTP_HOST", "smtp.protonmail.ch"), int(cfg.get("SMTP_PORT", "587")), timeout=60) as sm:
            sm.starttls(context=ssl.create_default_context()); sm.login(user, token); sm.send_message(m)
        log.info(f"Infomail geschickt: {betreff}"); return True
    except Exception as e:
        log.error(f"Infomail fehlgeschlagen ({betreff}): {e}"); return False

TAGE = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"]
TITEL = {}   # Kennung → Titel der Zwischenposts (aus der Warteschlange)
def tag(d):
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", d):
        return TITEL.get(d, d)
    x = datetime.strptime(d, "%Y-%m-%d"); return f"{TAGE[x.weekday()]} {x.day}.{x.month}."

def problem_mail(state, key, betreff, text):
    """Problem-Mails nur einmal pro Post bzw. Problem – nicht bei jedem 10-Minuten-Lauf."""
    sent = state.setdefault("mails", {})
    for k in [k for k, t in sent.items() if datetime.now(timezone.utc) - datetime.fromisoformat(t) > timedelta(days=30)]:
        del sent[k]   # alte Einträge aufräumen
    if key in sent:
        return
    if mail(betreff, text):
        sent[key] = datetime.now(timezone.utc).isoformat()

def self_update(state, force=False):
    """Holt die aktuelle Programmversion von rave.wien. True = neue Version installiert (Prozess danach neu starten)."""
    now = datetime.now(timezone.utc); last = state.get("update_check")
    if not force and last and now - datetime.fromisoformat(last) < UPDATE_ALLE:
        return False
    state["update_check"] = now.isoformat(); save_state(state)
    neu = fetch(BASE + "pi/rave_insta.py", binary=True)
    if neu == SELF.read_bytes():
        return False
    h = hashlib.sha256(neu).hexdigest()[:12]
    def fehler(grund):
        say(f"Update {h} nicht übernommen: {grund}")
        problem_mail(state, f"update {h}", "⚠️ rave.wien Pi: Programm-Update nicht übernommen",
                     f"Auf rave.wien liegt eine neue Version des Pi-Programms, sie hat aber den Selbsttest nicht bestanden und wurde NICHT installiert. "
                     f"Die bisherige Version läuft weiter.\n\nGrund: {grund}")
        save_state(state); return False
    if len(neu) > 300_000 or "rave.wien → Instagram".encode() not in neu:
        return fehler("Datei sieht nicht wie das rave.wien-Programm aus")
    tmp = SELF.with_name("rave_insta.neu.py"); tmp.write_bytes(neu)
    try:
        r = subprocess.run([sys.executable, str(tmp), "selbsttest"], capture_output=True, text=True, timeout=180)
        ok = r.returncode == 0 and "SELBSTTEST OK" in r.stdout
        out = (r.stderr or r.stdout).strip()[-400:]
    except Exception as e:
        ok, out = False, str(e)
    if not ok:
        tmp.unlink(missing_ok=True); return fehler(out or "Selbsttest ohne Ergebnis")
    SELF.with_name("rave_insta.bak.py").write_bytes(SELF.read_bytes())
    os.replace(tmp, SELF)
    say(f"Programm aktualisiert (Version {h})"); return True

def neu_starten():
    os.execv(sys.executable, [sys.executable, str(SELF)] + sys.argv[1:])

def passwort_aendern():
    import getpass
    pw = getpass.getpass("Neues Instagram-Passwort: ")
    if not pw or pw != getpass.getpass("Nochmal zur Kontrolle: "):
        sys.exit("Passwörter leer oder nicht gleich – nichts geändert.")
    lines = CONFIG.read_text().splitlines() if CONFIG.exists() else []
    lines = [l for l in lines if not l.startswith("IG_PASS=")] + [f"IG_PASS={pw}"]
    CONFIG.write_text("\n".join(lines) + "\n"); CONFIG.chmod(0o600)
    say("Passwort gespeichert – melde neu an …")
    client(interactive=True); say("Anmeldung gespeichert.")

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
BILD_OK = re.compile(r"^ig/(\d{4}-\d{2}-\d{2}/\d{1,2}\.jpg|extra/[a-z0-9-]{1,40}/\d{1,2}\.(jpg|mp4))$")   # Videos nur als Extra (mit gleichnamigem .jpg als Vorschaubild)
DATUM_OK = re.compile(r"^(\d{4}-\d{2}-\d{2}|extra-[a-z0-9-]{1,40})$")   # Tagespost oder Zwischenpost (extra-…)

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
    for i, rel in enumerate(post["bilder"]):
        # angehängte Extra-Bilder heißen auch 1.jpg – eigener Name, damit sie kein Tagesbild überschreiben
        p = folder / (Path(rel).name if Path(rel).parent.name == post["datum"] or post["datum"].startswith("extra-") else f"anhang-{i + 1}{Path(rel).suffix}")
        p.write_bytes(fetch(BASE + rel, binary=True))
        if p.suffix == ".mp4":   # Vorschaubild = gleichnamiges .jpg; dient auch als Ersatz, falls das Video nicht hochgeht
            p.with_suffix(".jpg").write_bytes(fetch(BASE + rel[:-4] + ".jpg", binary=True))
        paths.append(p)
    return paths

def mp4_dauer(path):
    """Länge eines MP4 in Sekunden (aus dem mvhd-Block) – ohne moviepy/ffmpeg."""
    import struct
    b = Path(path).read_bytes(); i = b.find(b"mvhd")
    if i < 0: raise ValueError("kein mvhd im Video")
    if b[i + 4] == 1:
        ts, du = struct.unpack(">IQ", b[i + 24:i + 36])
    else:
        ts, du = struct.unpack(">II", b[i + 16:i + 24])
    return du / ts

def video_vorbereiten():
    """instagrapi braucht für Videos sonst moviepy; Maße und Länge kennen wir selbst (Vorschaubild = gleichnamiges .jpg)."""
    import instagrapi.mixins.video as V
    def analyze(path, thumbnail=None):
        from PIL import Image
        th = Path(thumbnail) if thumbnail else Path(path).with_suffix(".jpg")
        w, h = Image.open(th).size
        return w, h, mp4_dauer(path), th
    V.analyze_video = analyze

def hochladen(cl, paths, text):
    if any(p.suffix == ".mp4" for p in paths):
        try:
            video_vorbereiten()
            return cl.album_upload(paths[:10], text) if len(paths) > 1 else cl.video_upload(paths[0], text, thumbnail=paths[0].with_suffix(".jpg"))
        except Exception as e:
            if type(e).__name__ in STORY_STOPP:
                raise
            log.exception("Video-Upload fehlgeschlagen – poste stattdessen das Standbild")
            say(f"Video ging nicht hoch ({type(e).__name__}) – nehme das Standbild")
            paths = [p.with_suffix(".jpg") if p.suffix == ".mp4" else p for p in paths]
    return cl.photo_upload(paths[0], text) if len(paths) == 1 else cl.album_upload(paths[:10], text)

def publish(post, cl=None, state=None):
    paths = download(post)
    cl = cl or client()
    text = post["text"]
    media = hochladen(cl, paths, text)
    url = f"https://www.instagram.com/p/{media.code}/"
    if state is not None and story_an() and post.get("story") is not False:
        due = story_zeit(post["datum"], datetime.now(timezone.utc), post.get("story_nach_min"))
        # Tagesposts: alle Event-Bilder (ohne angehängte Extra-Bilder), Zwischenposts: nur das erste Bild
        paths = [pa.with_suffix(".jpg") for pa in paths]; bilder_rel = [r[:-4] + ".jpg" if r.endswith(".mp4") else r for r in post["bilder"]]   # Story nur mit Standbildern
        paare = [(str(pa), rel) for pa, rel in zip(paths, bilder_rel) if "/extra/" not in rel] or [(str(paths[0]), bilder_rel[0])]
        if post["datum"].startswith("extra-"):
            # Zwischenpost: nur das erste Bild – außer "story_alle": true (dann alle Bilder des Posts)
            paare = [(str(pa), rel) for pa, rel in zip(paths, bilder_rel)] if post.get("story_alle") is True else paare[:1]
        paare = paare[:STORY_MAX_BILDER]
        state.setdefault("stories", {})[post["datum"]] = {"pk": str(media.pk), "bild": paare[0][0], "bilder": [a for a, _ in paare],
                                                         "rel": [b for _, b in paare], "fertig": 0, "url": url,
                                                         "faellig": due.isoformat(), "status": "offen"}
    return url

def story_bild(src, ziel):
    """Story-Bild 1080×1920: Postbild groß in der Mitte, dahinter unscharf und abgedunkelt. Gibt die Lage des Postbilds zurück."""
    from PIL import Image, ImageFilter, ImageDraw
    W, H = 1080, 1920
    img = Image.open(src).convert("RGB")
    k = max(W / img.width, H / img.height)
    bg = img.resize((round(img.width * k), round(img.height * k)))
    bg = bg.crop(((bg.width - W) // 2, (bg.height - H) // 2, (bg.width - W) // 2 + W, (bg.height - H) // 2 + H))
    bg = bg.filter(ImageFilter.GaussianBlur(40))
    bg = Image.blend(bg, Image.new("RGB", (W, H), (8, 9, 11)), 0.6)
    fw = 920; fh = round(img.height * fw / img.width)
    if fh > 1500: fh = 1500; fw = round(img.width * fh / img.height)
    fg = img.resize((fw, fh))
    x, y = (W - fw) // 2, (H - fh) // 2
    schatten = Image.new("L", (W, H), 0); ImageDraw.Draw(schatten).rounded_rectangle((x, y + 14, x + fw, y + fh + 14), 30, fill=170)
    bg.paste(Image.new("RGB", (W, H), (0, 0, 0)), (0, 0), schatten.filter(ImageFilter.GaussianBlur(26)))
    maske = Image.new("L", (fw, fh), 0); ImageDraw.Draw(maske).rounded_rectangle((0, 0, fw - 1, fh - 1), 28, fill=255)
    bg.paste(fg, (x, y), maske)
    bg.save(ziel, quality=92)
    return (x + fw / 2) / W, (y + fh / 2) / H, fw / W, fh / H

def story_an():
    return load_config().get("STORY", "ja").lower() not in ("nein", "no", "0", "aus")

def story_zeit(datum, now, nach_min=None):
    """Wann die Story fällig ist: Tagespost → kurz nach Mitternacht am Veranstaltungstag (Wiener Zeit), sonst kurz nach dem Post.
    nach_min = [von, bis] Minuten nach dem Post (nur Zwischenposts, z. B. [170, 200] = rund 3 Stunden später)."""
    if nach_min and datum.startswith("extra-"):
        try:
            lo, hi = int(nach_min[0]), int(nach_min[1])
            if 1 <= lo <= hi <= 24 * 60:
                return now + timedelta(minutes=random.randint(lo, hi))
        except Exception:
            pass
    if DATUM_OK.match(datum) and not datum.startswith("extra-"):
        try:
            from zoneinfo import ZoneInfo
            tz = ZoneInfo("Europe/Vienna")
        except Exception:
            tz = now.astimezone().tzinfo
        try:
            y, m, d = (int(x) for x in datum.split("-"))
            ziel = datetime(y, m, d, STORY_MORGEN[0], STORY_MORGEN[1], tzinfo=tz) + timedelta(minutes=random.randint(0, STORY_MORGEN[2]))
            if ziel > now:
                return ziel.astimezone(timezone.utc)
        except Exception:
            pass
    return now + timedelta(minutes=random.randint(*STORY_NACH_MIN))

def stories_nachholen(state, now):
    """Posts für kommende Tage, die noch keine Story haben (z. B. vor Einführung der Story gepostet), bekommen eine."""
    if not story_an():
        return
    heute = now.astimezone().strftime("%Y-%m-%d")
    for d, url in state.get("gepostet", {}).items():
        if DATUM_OK.match(d) and not d.startswith("extra-") and d >= heute and d not in state.setdefault("stories", {}) and "/p/" in str(url):
            due = story_zeit(d, now)
            state["stories"][d] = {"code": url.split("/p/")[1].strip("/"), "bild": str(DL / d / "1.jpg"), "url": url,
                                   "faellig": due.isoformat(), "status": "offen"}
            say(f"{d}: Story wird nachgeholt (ca. {due.astimezone().strftime('%H:%M')})")

def story_abgelaufen(d, s, now):
    """Eine Story wird nur nachgeholt, solange ihr Tag noch läuft: Tagespost bis Ende des Veranstaltungstags (Wiener Zeit),
    Zwischenpost bis Ende des Tags, an dem sie fällig war. Danach wäre sie veraltet (z. B. Internet über Nacht aus)."""
    try:
        from zoneinfo import ZoneInfo
        tz = ZoneInfo("Europe/Vienna")
    except Exception:
        tz = timezone(timedelta(hours=1))
    heute = now.astimezone(tz).strftime("%Y-%m-%d")
    tag_der_story = d if DATUM_OK.match(d) and not d.startswith("extra-") else datetime.fromisoformat(s["faellig"]).astimezone(tz).strftime("%Y-%m-%d")
    return heute > tag_der_story

def stories_faellig(state, now):
    for d, s in state.get("stories", {}).items():
        if s.get("status") == "offen" and story_abgelaufen(d, s, now):
            s["status"] = "abgelaufen" if not s.get("rel") else "gepostet"
            say(f"{d}: Story nicht mehr nachgeholt – ihr Tag ist schon vorbei")
    return [(d, s) for d, s in state.get("stories", {}).items()
            if s.get("status") == "offen" and datetime.fromisoformat(s["faellig"]) <= now]

def story_posten(cl, d, s, state):
    """Postet das nächste Bild der Story-Serie (eines pro Lauf; das nächste ist frühestens 2–6 Minuten später fällig)."""
    from instagrapi.types import StoryMedia
    bilder = s.get("bilder") or [s["bild"]]
    rel = s.get("rel") or [f"ig/{d}/1.jpg"]
    i = s.get("fertig", 0)
    if datetime.now(timezone.utc) - datetime.fromisoformat(s["faellig"]) > STORY_AUFGEBEN or s.get("versuche", 0) >= 3:
        s["status"] = "aufgegeben" if i == 0 else "gepostet"; say(f"{d}: Story aufgegeben" + (f" nach {i} von {len(bilder)} Bildern" if i else "")); return
    s["versuche"] = s.get("versuche", 0) + 1
    try:
        src = Path(bilder[i])
        if not src.exists():  # Bild nicht mehr lokal → von rave.wien holen
            src.parent.mkdir(parents=True, exist_ok=True); src.write_bytes(fetch(BASE + rel[min(i, len(rel) - 1)], binary=True))
        ziel = src.with_name(f"story-{i + 1}.jpg")
        pk = int(s.get("pk") or cl.media_pk_from_code(s["code"]))
        cx, cy, w, h = story_bild(src, ziel)
        cl.photo_upload_to_story(ziel, medias=[StoryMedia(media_pk=pk, user_id=cl.user_id, x=cx, y=cy, width=w, height=h)])
        i += 1; s["fertig"] = i; s["versuche"] = 0
        jetzt = datetime.now(timezone.utc)
        if i < len(bilder):
            s["faellig"] = (jetzt + timedelta(minutes=random.randint(*STORY_ABSTAND_MIN))).isoformat()
            say(f"{d}: Story {i}/{len(bilder)} gepostet"); return
        s["status"] = "gepostet"; s["gepostet"] = jetzt.isoformat()
        say(f"{d}: Story gepostet" + (f" ({i} Bilder)" if i > 1 else ""))
        mail(f"📱 rave.wien hat die Story gepostet: {tag(d)}",
             f"Der Post für {tag(d)} wurde gerade zusätzlich als Story geteilt" + (f" – {i} Bilder" if i > 1 else "") +
             f".\n\nPost: {s.get('url')}\nStory: https://www.instagram.com/stories/{load_config().get('IG_USER', '')}/",
             [Path(b).with_name(f"story-{k + 1}.jpg") for k, b in enumerate(bilder)])
    except Exception as e:
        log.exception("Fehler bei der Story"); say(f"{d}: Story-FEHLER {e}")
        if type(e).__name__ in STORY_STOPP or any(x in str(e).lower() for x in ("challenge", "feedback_required", "please wait", "spam")):
            s["status"] = "gepostet" if i else "aufgegeben"; s["abbruch"] = type(e).__name__
            problem_mail(state, f"story {d}", f"⚠️ rave.wien: Story für {tag(d)} abgebrochen",
                         f"Instagram hat beim Teilen als Story gebremst oder will eine Bestätigung ({type(e).__name__}):\n\n{e}\n\n"
                         f"Deshalb hört der Pi für diesen Tag mit der Story auf ({i} von {len(bilder)} Bildern sind online). Der Post selbst bleibt online.\n"
                         "Falls Instagram eine Bestätigung will: in der Instagram-App anmelden und bestätigen, danach am Pi:  ~/rave-insta/rave login")
            return
        problem_mail(state, f"story {d}", f"⚠️ rave.wien: Story für {tag(d)} fehlgeschlagen",
                     f"Der Post ist online ({s.get('url')}), aber das Teilen als Story hat nicht geklappt:\n\n{e}\n\n"
                     f"Der Pi versucht es noch höchstens zweimal (alle 10 Minuten) und gibt die Story dann auf – der Post selbst bleibt online.")

def gepostet_mail(p, url):
    n = len(p["bilder"])
    mail(f"📸 rave.wien hat gepostet: {tag(p['datum'])}",
         (f"Auf Instagram ist gerade der {tag(p['datum'])} erschienen.\n\n" if p["datum"].startswith("extra-") else
          f"Auf Instagram ist gerade der Post für {tag(p['datum'])} erschienen ({p.get('events', '?')} Events, {n} Bild{'er' if n != 1 else ''}).\n\n")
         + f"{url}\n\n——— Text des Posts ———\n\n{p['text']}",
         sorted(x for x in (DL / p["datum"]).glob("*.jpg") if not x.name.startswith("story-"))[:10])

def due_posts(queue, state, now):
    out = []
    start = datetime.fromisoformat(state.get("start"))
    for p in queue.get("posts", []):
        at = datetime.fromisoformat(p["posten_ab"]); eff = wann(p)
        d = p["datum"]
        if d in state["gepostet"]:
            continue
        if d in state["uebersprungen"]:
            if p["posten_ab"] in state["uebersprungen"][d]:
                continue
            del state["uebersprungen"][d]   # Post wurde auf einen neuen Zeitpunkt gelegt → neue Chance
            say(f"{d}: neu angesetzt auf {p['posten_ab']}")
        if eff > now:
            continue
        if at < start or now - eff > MAX_VERSPAETUNG:
            state["uebersprungen"][d] = f"verpasst (fällig {p['posten_ab']})"
            say(f"{d}: übersprungen – war fällig {p['posten_ab']}")
            if at >= start:  # nur melden, wenn der Pi den Termin wirklich verpasst hat (nicht bei alten Posts nach der Einrichtung)
                problem_mail(state, f"verpasst {d} {p['posten_ab']}", f"⚠️ rave.wien: Post für {tag(d)} verpasst",
                             f"Der Instagram-Post für {tag(d)} war fällig um {p['posten_ab']} und ist mehr als 6 Stunden überfällig – er wird nicht mehr automatisch gepostet.\n"
                             f"War der Pi aus oder offline?\n\nVon Hand nachholen: ~/rave-insta/rave jetzt {d}")
            continue
        out.append(p)
    return out


# ---------------------------------------------------------------- Abruf (Hauptsuche vom Heimanschluss aus)
RAW = "https://raw.githubusercontent.com/ravewien/rave.wien/"
GIT_ZIEL = "git@github.com:ravewien/rave.wien.git"
DEPLOY_KEY = HOME / "github_key"
ABRUF_AB = (5, 25)                 # Wiener Zeit
ABRUF_BIS = 12                     # danach heute nicht mehr anfangen
ABRUF_LOCK = HOME / "abruf.lock"
IG_PRO_TAG = 30
IG_PAUSE_S = (25, 60)
UA_WEB = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
SCHUTZ = re.compile(r"just a moment|cf-chl|captcha|one moment, please|attention required", re.I)

def wien_jetzt():
    try:
        from zoneinfo import ZoneInfo
        return datetime.now(ZoneInfo("Europe/Vienna"))
    except Exception:
        return datetime.now()

def schluessel_anlegen():
    if not DEPLOY_KEY.exists():
        subprocess.run(["ssh-keygen", "-q", "-t", "ed25519", "-N", "", "-C", "rave.wien-pi", "-f", str(DEPLOY_KEY)], check=True)
        DEPLOY_KEY.chmod(0o600)
    return Path(str(DEPLOY_KEY) + ".pub").read_text().strip()

def schluessel_text(pub):
    return ("Damit der Pi seine Abrufe bei GitHub ablegen kann, braucht er einmalig einen Schreib-Schlüssel:\n\n"
            "1. https://github.com/ravewien/rave.wien/settings/keys/new öffnen\n"
            "2. Title: rave.wien Pi\n"
            "3. Key: diese Zeile komplett einfügen:\n\n" + pub + "\n\n"
            "4. Haken bei „Allow write access“ setzen → Add key.\n\n"
            "Der private Teil bleibt nur auf dem Pi (" + str(DEPLOY_KEY) + ").")

def abruf_starten(state, now):
    """Im normalen Lauf: Abruf einmal täglich im Hintergrund starten (blockiert das Posten nicht)."""
    w = wien_jetzt(); heute = w.strftime("%Y-%m-%d")
    if state.get("abruf_tag") == heute or (w.hour, w.minute) < ABRUF_AB or w.hour >= ABRUF_BIS:
        return
    state["abruf_tag"] = heute; save_state(state)
    subprocess.Popen([sys.executable, str(SELF), "abruf"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
                     stdin=subprocess.DEVNULL, start_new_session=True)
    say("Abruf im Hintergrund gestartet")

def _hole(url, timeout=25, binary=False):
    """Ein Abruf ohne Cookies (jedes Mal frisch, keine Anmeldung)."""
    req = urllib.request.Request(url, headers={"User-Agent": UA_WEB, "Accept": "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
                                               "Accept-Language": "de-AT,de;q=0.9,en;q=0.8"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            data = r.read(4_000_000); st = r.status; typ = r.headers.get("content-type", ""); final = r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, "", b"" if binary else "", url
    if binary:
        return st, typ, data, final
    cs = "utf-8"
    m = re.search(r"charset=([\w-]+)", typ)
    if m: cs = m.group(1)
    return st, typ, data.decode(cs, errors="replace"), final

def _slug(u):
    return re.sub(r"[^a-zA-Z0-9.-]+", "_", re.sub(r"^https?://", "", u))[:120]

def seiten_abrufen(urls, ordner):
    import threading
    from concurrent.futures import ThreadPoolExecutor
    from urllib.parse import urlparse
    (ordner / "seiten").mkdir(parents=True, exist_ok=True)
    letzt = {}; sperre = threading.Lock(); idx = []
    def eins(i_u):
        i, u = i_u; h = urlparse(u).netloc
        with sperre:
            t = max(time.time(), letzt.get(h, 0) + 1.5); letzt[h] = t
        if t > time.time(): time.sleep(t - time.time())
        st, typ, body, err = 0, "", "", ""
        try:
            st, typ, body, _ = _hole(u)
            if st >= 400: err = f"HTTP {st}"
            elif SCHUTZ.search(body[:20000]) and len(body) < 60000: err = "Schutzseite (Cloudflare/Captcha)"
            elif not body: err = "leer"
        except Exception as e:
            err = "Zeitüberschreitung" if "timed out" in str(e) else str(e)[:120]
        f = ""
        if not err:
            f = f"{i:04d}_{_slug(u)}.html"
            (ordner / "seiten" / f).write_text(f"ADRESSE: {u}\nABGERUFEN: {datetime.now(timezone.utc).isoformat()}\nTYP: {typ}\n\n{body}", encoding="utf-8")
        with sperre:
            idx.append([u, str(st), str(len(body)), f, err])
    with ThreadPoolExecutor(6) as ex:
        list(ex.map(eins, enumerate(urls, 1)))
    idx.sort(key=lambda r: (r[3], r[0]))
    (ordner / "index.tsv").write_text("adresse\tstatus\tzeichen\tdatei\tfehler\n" + "\n".join("\t".join(r) for r in idx) + "\n", encoding="utf-8")
    ok = sum(1 for r in idx if not r[4]); return ok, len(idx) - ok

def ig_bilder(liste, ordner, state):
    """Instagram-Profilbilder ohne Anmeldung (keine Cookies, nicht das rave.wien-Konto). Hört beim ersten Zeichen von Bremsen auf."""
    from PIL import Image
    import io
    erl = state.setdefault("ig_bilder", {}); heute = wien_jetzt().strftime("%Y-%m-%d")
    offen = [x for x in liste if x.get("h") and x["h"] not in erl][:IG_PRO_TAG]
    (ordner / "ig").mkdir(parents=True, exist_ok=True); n = 0; meta = {}
    for k, x in enumerate(offen):
        if k: time.sleep(random.uniform(*IG_PAUSE_S))
        h = x["h"]
        try:
            st, typ, html, final = _hole(f"https://www.instagram.com/{h}/")
        except Exception as e:
            say(f"Instagram {h}: {e} – für heute Schluss"); break
        if st in (429, 401, 403) or "/accounts/login" in final or "/challenge" in final:
            say(f"Instagram bremst (HTTP {st}) – für heute Schluss"); break
        if st == 404 or "Seite ist leider nicht verfügbar" in html or "Page Not Found" in html:
            erl[h] = heute + " fehlt"; continue
        m = re.search(r'<meta property="og:image" content="([^"]+)"', html)
        if not m:
            say(f"Instagram {h}: kein Profilbild in der Seite – für heute Schluss"); break
        bild = m.group(1).replace("&amp;", "&")
        try:
            st2, _, data, _ = _hole(bild, binary=True)
            im = Image.open(io.BytesIO(data)).convert("RGB")
            if min(im.size) < 100: raise ValueError("zu klein")
            im.thumbnail((320, 320)); im.save(ordner / "ig" / f"{h}.jpg", "JPEG", quality=88)
            t = re.search(r'<meta property="og:title" content="([^"]+)"', html)
            meta[h] = {"name": x.get("name"), "titel": t.group(1) if t else ""}
            erl[h] = heute; n += 1
        except Exception as e:
            erl[h] = heute + " fehler"; log.warning(f"Instagram-Bild {h}: {e}")
    (ordner / "ig" / "index.json").write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")
    save_state(state); return n

def verschluesseln(daten, pem):
    """Gleiches Format wie abruf-krypt.js (RWA1: RSA-OAEP-SHA256 + AES-256-GCM)."""
    from Cryptodome.PublicKey import RSA
    from Cryptodome.Cipher import PKCS1_OAEP, AES
    from Cryptodome.Hash import SHA256
    key = os.urandom(32); iv = os.urandom(12)
    c = AES.new(key, AES.MODE_GCM, nonce=iv); enc, tag = c.encrypt_and_digest(daten)
    ek = PKCS1_OAEP.new(RSA.import_key(pem), hashAlgo=SHA256).encrypt(key)
    return b"RWA1" + len(ek).to_bytes(2, "big") + ek + iv + tag + enc

def abruf(state):
    import tarfile, tempfile, shutil, io
    if ABRUF_LOCK.exists():
        try:
            os.kill(int(ABRUF_LOCK.read_text()), 0); say("Abruf läuft schon"); return
        except Exception:
            pass
    ABRUF_LOCK.write_text(str(os.getpid()))
    try:
        if not shutil.which("git"):
            problem_mail(state, "abruf git", "⚠️ rave.wien Pi: git fehlt", "Für den täglichen Abruf braucht der Pi das Programm git.\n\nBitte einmal am Pi ausführen:  sudo apt install -y git")
            return
        pub = schluessel_anlegen()
        auftrag = fetch(RAW + "abruf/adressen.json")
        pem = fetch(RAW + "main/.github/abruf/abruf-public.pem", binary=True)
        t0 = time.time()
        with tempfile.TemporaryDirectory() as td:
            td = Path(td); roh = td / "roh"; roh.mkdir()
            ok, fehler = seiten_abrufen(auftrag.get("urls", []), roh)
            ziel = td / "br"; ziel.mkdir()
            n_ig = ig_bilder(auftrag.get("ig", []), ziel, state)
            status = {"zeit": datetime.now(timezone.utc).isoformat(), "quelle": "Raspberry Pi", "version": VERSION,
                      "adressen": ok + fehler, "ok": ok, "fehler": fehler, "ig_bilder": n_ig, "dauer_s": int(time.time() - t0)}
            (roh / "status.json").write_text(json.dumps(status))
            buf = io.BytesIO()
            with tarfile.open(fileobj=buf, mode="w:gz") as tf:
                tf.add(roh, arcname=".")
            (ziel / "abruf.enc").write_bytes(verschluesseln(buf.getvalue(), pem))
            (ziel / "status.json").write_text(json.dumps(status, indent=1))
            g = lambda *a: subprocess.run(["git", *a], cwd=ziel, capture_output=True, text=True, timeout=300,
                                          env={**os.environ, "GIT_SSH_COMMAND": f"ssh -i {DEPLOY_KEY} -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"})
            g("init", "-q", "-b", "abruf-pi"); g("config", "user.name", "rave.wien Pi"); g("config", "user.email", "pi@rave.wien")
            g("add", "-A"); g("commit", "-q", "-m", f"Pi-Abruf {status['zeit'][:16]}")
            r = g("push", "-q", "-f", GIT_ZIEL, "HEAD:refs/heads/abruf-pi")
            if r.returncode != 0:
                say(f"Ablegen bei GitHub fehlgeschlagen: {r.stderr.strip()[-200:]}")
                if "denied" in r.stderr.lower() or "permission" in r.stderr.lower() or "publickey" in r.stderr.lower():
                    problem_mail(state, "abruf schluessel", "🔑 rave.wien Pi: einmalig Schlüssel bei GitHub eintragen", schluessel_text(pub))
                else:
                    problem_mail(state, "abruf push " + wien_jetzt().strftime("%Y-%m-%d"), "⚠️ rave.wien Pi: Abruf nicht abgelegt", r.stderr.strip()[-600:])
                return
        say(f"Abruf fertig: {ok} Seiten ok, {fehler} Fehler, {n_ig} Instagram-Bilder, {status['dauer_s']} s")
        state["abruf_ok"] = status["zeit"]
    finally:
        ABRUF_LOCK.unlink(missing_ok=True); save_state(state)

def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "lauf"
    if cmd == "selbsttest":   # wird vor einem Update mit der NEUEN Version aufgerufen
        import instagrapi, smtplib  # noqa: F401 – Abhängigkeiten vorhanden?
        from Cryptodome.Cipher import AES, PKCS1_OAEP  # noqa: F401 – für den verschlüsselten Abruf
        from PIL import Image  # noqa: F401
        load_config(); print("SELBSTTEST OK", VERSION); return
    state = load_state()
    now = datetime.now(timezone.utc)
    if state.get("version") != VERSION:
        if state.get("version"):
            mail(f"ℹ️ rave.wien Pi: Programm aktualisiert ({VERSION})",
                 f"Das Programm auf dem Raspberry Pi wurde automatisch auf Version {VERSION} aktualisiert (vorher {state['version']}).\n"
                 f"Die vorige Version liegt als Sicherung in {SELF.with_name('rave_insta.bak.py')}.")
        state["version"] = VERSION; save_state(state)
    if cmd in ("lauf", "update"):
        try:
            if self_update(state, force=(cmd == "update")):
                neu_starten()
        except Exception as e:
            log.error(f"Update-Prüfung fehlgeschlagen: {e}")
        if cmd == "update":
            print("Version", VERSION, "ist aktuell."); return
    if cmd == "passwort":
        passwort_aendern(); save_state(state); return
    if cmd == "login":
        client(interactive=True); say("Anmeldung gespeichert."); save_state(state); return
    if cmd == "abruf":
        abruf(state); return
    if cmd == "schluessel":
        print(schluessel_text(schluessel_anlegen())); return
    if cmd == "pause":
        PAUSE.touch(); say("Automatisches Posten pausiert."); return
    if cmd == "weiter":
        PAUSE.unlink(missing_ok=True); say("Automatisches Posten läuft wieder."); return
    if cmd == "lauf":
        try:
            abruf_starten(state, now)
        except Exception as e:
            log.error(f"Abruf-Start fehlgeschlagen: {e}")
    try:
        queue = fetch(BASE + "ig/queue.json")
        state["abruf_fehler"] = 0
        for p in queue.get("posts", []):
            if isinstance(p.get("titel"), str): TITEL[str(p.get("datum"))] = p["titel"][:80]
    except Exception as e:
        if cmd != "lauf":
            raise
        n = state.get("abruf_fehler", 0) + 1; state["abruf_fehler"] = n
        log.error(f"Warteschlange nicht abrufbar ({n}. Mal in Folge): {e}")
        if n >= 3:  # erst melden, wenn es 30 Minuten lang nicht geht – kurze Aussetzer sind normal
            problem_mail(state, "abruf " + now.strftime("%Y-%m-%d"), "⚠️ rave.wien Pi: rave.wien nicht erreichbar",
                         f"Der Pi kann seit mindestens 30 Minuten die Warteschlange von rave.wien nicht laden – solange wird nichts gepostet.\n\n"
                         f"Fehler: {e}\n\nMögliche Ursachen: Internet am Pi weg, Pi-hole blockiert rave.wien, oder rave.wien ist gerade nicht erreichbar.")
        save_state(state); return
    if cmd == "status":
        print("PAUSIERT" if PAUSE.exists() else "aktiv", "| Version:", VERSION, "| Start:", state["start"])
        for p in queue.get("posts", []):
            st = state["gepostet"].get(p["datum"]) or state["uebersprungen"].get(p["datum"]) or "offen"
            sto = state.get("stories", {}).get(p["datum"])
            if sto:
                nb = len(sto.get("bilder") or [1])
                st += f" | Story {sto['status']}" + (f" {sto.get('fertig', 0)}/{nb}" if nb > 1 else "") + (f" ab ca. {datetime.fromisoformat(sto['faellig']).astimezone().strftime('%a %H:%M')}" if sto["status"] == "offen" else "")
            t = wann(p).astimezone().strftime("%a %d.%m. %H:%M")
            print(f"  {p['datum']}  geplant {p['posten_ab'][:16].replace('T', ' ')}  → wirklich ca. {t}  {len(p['bilder'])} Bild(er)  → {st}")
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
        url = publish(p, state=state); state["gepostet"][d] = url; merke(state, now); save_state(state); say(f"{d}: gepostet → {url}")
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
    todo = due_posts(queue, state, now); stories_nachholen(state, now); save_state(state)
    stories = stories_faellig(state, now)
    if not todo and not stories:
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
    for d, sto in stories:
        story_posten(cl, d, sto, state); save_state(state)
    for p in todo:
        if zu_viele(state, datetime.now(timezone.utc)):
            say(f"{p['datum']}: nicht gepostet – schon {MAX_POSTS_24H} Posts in 24 Stunden (Sicherheitsnetz). Von Hand: rave jetzt {p['datum']}")
            problem_mail(state, f"limit {p['datum']}", f"⚠️ rave.wien: Post für {tag(p['datum'])} zurückgehalten",
                         f"Es sind schon {MAX_POSTS_24H} Posts in 24 Stunden hinausgegangen (Sicherheitsnetz), deshalb wurde der Post für {tag(p['datum'])} nicht automatisch veröffentlicht.\n\n"
                         f"Von Hand posten: ~/rave-insta/rave jetzt {p['datum']}")
            save_state(state); break
        try:
            url = publish(p, cl, state)
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
    try:
        main()
    except SystemExit:
        raise
    except Exception as e:
        log.exception("Unerwarteter Fehler")
        if len(sys.argv) <= 1:   # nur beim automatischen Lauf mailen – bei Befehlen von Hand siehst du den Fehler direkt
            try:
                st = load_state()
                problem_mail(st, f"absturz {datetime.now(timezone.utc):%Y-%m-%d} {type(e).__name__}",
                             "⚠️ rave.wien Pi: Programm abgestürzt",
                             f"Beim automatischen Lauf ist ein unerwarteter Fehler aufgetreten:\n\n{type(e).__name__}: {e}\n\n"
                             f"Details im Protokoll: {HOME / 'log.txt'}\n(Diese Mail kommt höchstens einmal pro Tag und Fehlerart.)")
                save_state(st)
            except Exception:
                log.exception("Konnte Absturz nicht melden")
        sys.exit(1)
