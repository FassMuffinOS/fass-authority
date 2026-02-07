import fs from "fs";
import crypto from "crypto";

export function enforceCanon() {
  const canon = fs.readFileSync("canon/CANON_v1.md","utf8");
  const expected = fs.readFileSync("canon/CANON_v1.hash","utf8").trim();

  const actual = crypto
    .createHash("sha256")
    .update(canon)
    .digest("hex");

  if (actual !== expected) {
    throw new Error("CANON_TAMPER_DETECTED");
  }
}
