import fs from "fs";
import crypto from "crypto";
import { execSync } from "child_process";

function hashCanonDirectory() {
  const output = execSync(
    "find docs/CANON -type f -print0 | sort -z | xargs -0 sha256sum | sha256sum",
    { encoding: "utf8" }
  );
  return output.trim().split(" ")[0];
}

export function enforceCanon() {
  const expected = fs.readFileSync("canon/CANON_v1.hash", "utf8").trim();
  const actual = hashCanonDirectory();

  if (actual !== expected) {
    throw new Error("CANON_TAMPER_DETECTED");
  }
}
