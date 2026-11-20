// Ver-/Entschlüsseln des Abruf-Pakets (AES-256-GCM, Schlüssel per RSA-OAEP).
//   node abruf-krypt.js zu   <datei.tar.gz> <public.pem>  <ausgabe.enc>
//   node abruf-krypt.js auf  <datei.enc>    <private.pem> <ausgabe.tar.gz>
const fs = require("fs"), crypto = require("crypto");
const [m, a, k, o] = process.argv.slice(2);
if (m === "zu") {
  const key = crypto.randomBytes(32), iv = crypto.randomBytes(12), c = crypto.createCipheriv("aes-256-gcm", key, iv);
  const enc = Buffer.concat([c.update(fs.readFileSync(a)), c.final()]), tag = c.getAuthTag();
  const ek = crypto.publicEncrypt({ key: fs.readFileSync(k), oaepHash: "sha256" }, key);
  const head = Buffer.alloc(2); head.writeUInt16BE(ek.length);
  fs.writeFileSync(o, Buffer.concat([Buffer.from("RWA1"), head, ek, iv, tag, enc]));
} else if (m === "auf") {
  const b = fs.readFileSync(a); if (b.slice(0, 4).toString() !== "RWA1") throw new Error("kein Abruf-Paket");
  const n = b.readUInt16BE(4); let p = 6; const ek = b.slice(p, p += n), iv = b.slice(p, p += 12), tag = b.slice(p, p += 16);
  const key = crypto.privateDecrypt({ key: fs.readFileSync(k), oaepHash: "sha256" }, ek);
  const d = crypto.createDecipheriv("aes-256-gcm", key, iv); d.setAuthTag(tag);
  fs.writeFileSync(o, Buffer.concat([d.update(b.slice(p)), d.final()]));
} else { console.error("Aufruf: zu|auf …"); process.exit(1); }
