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

HOME.mkdir(parents=True, exist_ok=True)
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

def download(post):
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

def due_posts(queue, state, now):
    out = []
    start = datetime.fromisoformat(state.get("start"))
    for p in queue.get("posts", []):
        at = datetime.fromisoformat(p["posten_ab"])
        d = p["datum"]
        if d in state["gepostet"] or d in state["uebersprungen"]:
            continue
        if at > now:
            continue
        if at < start or now - at > MAX_VERSPAETUNG:
            state["uebersprungen"][d] = f"verpasst (fällig {p['posten_ab']})"
            say(f"{d}: übersprungen – war fällig {p['posten_ab']}")
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
        url = publish(p); state["gepostet"][d] = url; save_state(state); say(f"{d}: gepostet → {url}"); return
    # normaler Lauf
    if PAUSE.exists():
        return
    todo = due_posts(queue, state, now); save_state(state)
    if not todo:
        return
    time.sleep(random.randint(5, 120))  # nicht immer auf die Sekunde genau
    cl = client()
    for p in todo:
        try:
            url = publish(p, cl)
            state["gepostet"][p["datum"]] = url; save_state(state)
            say(f"{p['datum']}: gepostet → {url}")
            time.sleep(random.randint(60, 180))
        except Exception as e:
            log.exception("Fehler beim Posten"); say(f"{p['datum']}: FEHLER {e}")
            break

if __name__ == "__main__":
    main()
